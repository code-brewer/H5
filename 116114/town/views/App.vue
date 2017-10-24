<template>
    <!-- <div class="app-views"> -->
    <router-view></router-view>  
    <div v-if="isLoading">
        <loading :text="loading.text" :show.sync="loading.show" :icon="loading.icon" :duration="loading.duration" :name="loading.name" v-for="loading in loadingdata.loadings"></loading>
    </div>
    <!-- </div> -->
</template>

<style lang="scss" src="../css/style.css"></style>
<script>
	import api from '../api/serverapi.js'
    import getArgs from '../utils/url.js'
    // import Loading from '../components/Loading.vue'
    import Loading from '../components/newloading/Loading.vue'
    import wxUtil from '../js/wx.js'
	export default{
        components: {
            Loading,
        },
		data() {
        return {
            person: {
                nickName: '昵称',
                headImg:'',
                isLoading:false,
                
            },
            loadingdata: {
                    loadings:[]
            },
            isLoading:false,
            gettype:'wgs84',
            share: {
                href: location.href.split('#')[0],
                title: '',
                sharetext: '',
                shareicon: ''
            }

        }
    },
    ready() {
        var that = this;
        this.url = window.location.href.split('#')[0]
        console.log(this.url)
        this.activityId = getArgs.getArgsFromUrl('tid'); 
        this.isSet();
        
        //统计浏览量
        this.$on('ChannelLog',(channelLogdata)=>{
            api.addbrowse(this,channelLogdata,(back)=>{

            })
        })

        this.$on('loading', (loading) => {
                if(!loading.name){
                    loading.name = 'tip';
                }
                if(!loading.icon){
                    loading.icon = false;
                }
                for (var i = 0; i <= that.loadingdata.loadings.length - 1; i++) {
                    var item = that.loadingdata.loadings[i];
                    if(!item || !item.show){
                        that.loadingdata.loadings.splice(i, 1);
                        i--;
                    }
                };
                that.loadingdata.loadings.push(loading);
                that.isLoading = that.loadingdata.loadings.length>0;
            });
        this.$on('cancelloading', (name) => {
            for (var i = 0; i <= that.loadingdata.loadings.length - 1; i++) {
                var item = that.loadingdata.loadings[i];
                console.log(item.name)
                console.log(name)
                if(item && item.name && item.name == name){
                    item.show = false;
                    that.loadingdata.loadings.splice(i, 1);
                    i--;
                }
            };
            that.isLoading = that.loadingdata.loadings.length>0;
            if(!that.isLoading){
                document.querySelector('.app-view').classList.remove('open');
            }

        });

        this.$on('handle_server_error', (parameter) => {
            
                // if(SSD_DEBUG){
                    var msg = "";
                    if(parameter.resMsg){
                        msg = parameter.resMsg;
                    }
                    that.$dispatch('loading', {text: msg, icon: false, show: true, duration: 2000});
                // }
            
        });
    },
    methods: {
        //获取我的个人信息
        myselfInfo(){
        	var that = this;
            api.personInfo(this,{},(back)=>{
                if(back.resCode == '000000'){
                    var str = window.JSON.stringify(back.repBody)
                    window.localStorage.setItem('personInfo',str)
                }
                
            })
        },
        //获取主题信息
        getactivity() {
            var that = this;
            api.activitiesInfo(this, {
                id: this.activityId
            }, (back) => {
                if (back.resCode == '000000') {

                    var act = window.JSON.stringify(back.repBody)
                    window.localStorage.setItem('actInfo',act)
                    this.share.title = back.repBody.title
                    this.share.sharetext = back.repBody.introduction
                    this.share.shareicon = back.repBody.small_imgurl
                }

            })
        },
        wxconfig(){
            var that = this;
            if(iswx){
                if(typeof wx != "undefined"){
                    wxUtil.config(that.ssdddata, true, () => {
                        wxUtil.share(this.share.title, this.share.sharetext, this.share.href, this.share.shareicon, (type,state)=>{
                            
                        });    
                    });
                }else{
                    console.log("no wx");
                    setTimeout(that.wxconfig,500);
                }
            }
        },
        getJsSign(){
            var that =  this;
            api.getJsSign(this, {url:this.url}, (back)=> {

                    if(back && back.code=="0") {
                        that.ssdddata = back.data;
                        that.wxconfig();
                    }

                });
        },
        isSet(){
            api.exist(this,{
                id:this.activityId
            },(back)=>{
                if(back.resCode == '000000'){
                    this.myselfInfo();
                    this.getactivity();
                    this.getJsSign();
                }else{
                    this.$route.router.go({
                            path: "/noexist"
                    });
                }
            })
        }
        

    }
}
</script>
