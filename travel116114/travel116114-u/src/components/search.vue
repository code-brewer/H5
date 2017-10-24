<template>
    <div class="searchBox">
       
       	<div class="left">
            <img src="./../images/114116.png"  height="25" alt="114116">
        </div>
        <div class="center">
            <i class="mintui mintui-search"></i>
            <input type="text" @input="restoreData(search)" v-model="search" @keyup.enter="searchPlace(search)"  placeholder="搜索目的地／景点">
        </div>
        <div class="right">
            <button class="circle" @click="showDestination">
                <img src="./../images/flag.png" width="20" alt="flag">
            </button>
        </div>
            <search-list v-show="showSearchList" :selected.sync="search" ></search-list>
    </div>
</template>
<script>
import searchList from './search-list.vue';
import { Indicator } from 'mint-ui';
export default {
	props : {
		
	},
    components: {
        searchList
    },

	mounted() {
        this.acceptBlurSearch()
        this.acceptSearchMessage()
        // this.loading()
	},

    data() {
            return {
            	ready : false,
                showSearchList : false,
                search : ''
            }
        },
    methods: {
        showDestination () {
            
            if(!this.showSearchList){
                this.showSearchList = true;
                this.$bus.emit('focusSearch')
            }else{
                this.showSearchList = false;
                this.$bus.emit('blurSearch')
            }
        },
        acceptBlurSearch(){
         this.$bus.on('blurSearch',()=>{
            this.showSearchList = false;
         })
          
       },
        blurSearch(){
            // this.showSearchList = false;
            // this.$bus.emit('blurSearch')
        },
        acceptSearchMessage (){
            this.$bus.on('emitSearch',(val)=>{
                this.search =val;
                
            })
        },
        searchPlace (name) {
            this.loading()
            var _this = this

            //http://域名:端口/tourism/index/selectInfoByName
                this.axios({
                    method: 'post',
                     url: basePath+'/index/selectInfoByName',
                     data: 'name='+name,
                   headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                }).then((res)=>{
                    this.closeLoading()
                    if (res.data.msg==="请求成功") {
                        _this.$bus.emit('saveLocaltionData')
                        _this.$bus.emit('handelData',res.data.data)

                    }
                })
        },
        loading(){
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            });
        },
        closeLoading(){
            Indicator.close();
        },
        restoreData(val) {
            if(!val) {
                this.$bus.emit('restoreData')
            }
        }
        

        

    },
}
</script>
<style lang="scss" scoped>
    .searchBox {
        position:relative;
        height: 50px;
        line-height: 50px;
        display: flex;
        background-color: #f5f5f9;
        .left {
            flex :2 ;
            float: left;
            text-align: center;

            img {
                vertical-align: middle;
            }
        }
        .center {
            flex : 5;
            float: left;
            position: relative;
            line-height : 50px;
            i {
                position : absolute;
                color: #ffcc1d;
                left: 6px;
                top: 3px;
                font-size: 20px;
                height : 70%;
            }
            input {
                vertical-align : middle;
                width: 100%;
                height : 70%;
                line-height: 35px;
                border-radius: 15px;
                padding-left: 25px;
                box-sizing: border-box;
                border: 1px solid #cccccc;
                font-size: 14px;
            }
        }
        .right {
            flex : 1;
            float: left;
            text-align: center;
            .circle {
                display: inline-block;
                vertical-align : middle;
                width: 30px;
                height:30px;
                box-sizing: border-box;
                background-color: #f5f5f9;
                border: 2px dashed #cccccc;
                border-radius : 20px;
                border-color:#cccccc #ffcc1d #cccccc #cccccc;
                position : relative;
                transform:rotate(-45deg);
                img {
                    // transform:rotate(45deg);
                    transform: translate(-50%,-50%) rotate(45deg);
                    position : absolute;
                    top: 50%;
                    left: 52%;

                }
            }
        }
        .left,.center,.right {
            box-sizing: border-box;
        }
    }
</style>
