<template>
	<div class="app-view game-page">
        <div class="logo">
        <img :src="$root.activityBasePath+'/images/sp-logo.png'">
        </div>
		<section class="section-wrap">
            <div class="activity-num-div">
                
                <div class="activity-num">
                    剩余<i class="num">{{times1}}</i>次抽奖机会 
                </div>
                <!-- <a class="gamemark" @click="mark" ></a> -->
            </div>    

            <div class="prize-wrap" id="lottery">
                <div class="turntable_bg">
                <div class="turntable" v-el:ele>
                    <!-- <div v-for="item in lottery" class="prize_div" :style="{transform: 'rotateZ('+item.deg+'deg)'}">
                        <img v-if="item.itemimg" :src="item.itemimg" alt="">
                        <p :style="{fontSize:item.itemimg?'18px':'20px',marginTop:item.itemimg?'0':'20px'}">{{item.title}}</p>
                    </div > -->
                </div>
                <div class="turntable_arrow" @click="isClick">
                    
                </div>
            </div>
        </div>



        <div class="downdiv">
            <!-- <member></member>
            <p class="tip1" style="margin-bottom: 40px;">微信分享活动到朋友圈即可额外获得一次抽奖机会</p> -->
            <!-- <p class="tip2">资费：6元/月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2G/3G炫铃用户仅需1元/月)</p> -->
            <prizelist :change-prize="refreshRank" :show-add.sync="alertTip.showAddress" :gid.sync="lucky.id"></prizelist>
            <!-- <p class="tip3" style="white-space: pre;">中国联通<span style="font-family: none;">&nbsp;&nbsp;&nbsp;&nbsp;</span>沃音乐<br/>wap.10155.com<br/>活动解释权归中国联通沃音乐所有</p> -->
        </div>



    </section>



    <!-- 遮罩层  -->
    <section class="bg-section" v-if="alertTip.rootTip">

        <div class="content">
            <div class="div1" v-if="alertTip.Atip">
                <div class="content-title">
                    <p>恭喜</p>
                    <p>抽中了“{{lotteryObj.prizename}}”</p>
                    <img :src="lotteryObj.url" style="width: 336px;margin-top: 48px;" />
                    

                </div>
                <a class="btn green" @click="addr()" style="" >马上领奖</a>
                <a class="btn yellow" :href="songlisturl" style="float: right;" >领取歌单</a>
            </div>
            <div class="div2" v-if="alertTip.Btip">
               <div class="content-title2">
                   <p>谢谢参与</p>
                   <img style="margin-top: 30px;width: 304px;height: 304px;padding: 20px;background: #fff;" :src="lotteryObj.url" alt="">
               </div>
               <a class="btn green" @click="hideAlertTip()" >继续抽奖</a>
               <a class="btn yellow" :href="songlisturl" style="float: right;" >领取歌单</a>
           </div>

           <div class="div3" v-if="alertTip.Ctip">
            <div class="content-title">
                <p class="success">领取成功!</p>

            </div>
        </div>    
        <div class="btn-close" @click="hideAlertTip()"><img :src="$root.activityBasePath+'/images/sp-close.png'"/></div>
    </div>
</section>
<address :show-address.sync="alertTip.showAddress" :gid="lucky.id" ></address>
<img :src="$root.activityBasePath+'/images/sp-bg.jpg'"  class="bg">
<div v-if="sharetip" @click="hideShare()" class="sharebg"></div>
<img v-if="sharetip" @click="hideShare()" :src="$root.activityBasePath+'/src/css/img/sharetip.png'" class="sharetip" />

</div>


</template>

<style lang="sass">
    .tip1{
       color: #000;
       font-size: 28px;
       text-shadow: 0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff;
       margin: 40px 44px;
   }
   // .tip2{
   //     color: white;
   //     font-size: 28px;
   //     text-shadow: 0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326,0px 0px 5px #b14326;
   //     margin: 0 0 40px 44px;
   // }
   .tip3{
       color: #000;
       font-size: 22px;
       text-shadow: 0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff,0px 0px 5px #fff;
       margin: 10px 0 0 0;
       text-align: center;
   }
   .woad{
    color: #550000;
    font-size: 22px;
    margin: 30px auto 0 auto;
    width: 200px;
    text-align: center;
    display: block;
    text-decoration: underline;
}
.mrule{
    position: absolute;
    left: 40px;
    text-decoration: underline;
    font-size: 24px;
    color: #000;
    padding-top: 20px;
}
.yellow{
    background: #ffb81d;
}
.green{
    background: #98cf2f;
}
</style>

<script>
	import {router} from './index'
	import sapi from './utils/serverapi.js'
	import urlUtil from './utils/url.js'

    // require(['./js/zepto.min.js'])   


    

    function initLottery() {
        return {
            currIndex: 0,
            count: 6,
            cycle: 7,
            speed: 16,
            timerId: null,
            prize: -1
        };
    }

    export default {
        components: {
            prizelist: require('./components/prizeList.vue'),
            address: require('./receive-address.vue'),
            member: require('./Join-member.vue')
        },
        data() {
         return {
            songlisturl:"",
            activity:{},
            activityextbody:{},
            iclick:false,
            refreshRank:true,
            ismark:false,
                //中奖的弹框
                alertTip:{
                    rootTip:false,
                    showAddress:false,
                    Atip:false, //抽中的弹框
                    Btip:false, //没抽中的弹框
                    Ctip:false //领取成功的弹框
                },
                sharetip:false,
                //中奖的奖品(需要领奖的json)
                lucky:{
                    mobile:'',
                    id:'',//奖品id
                    content:'',//验证码
                    
                },  

                list:[],
                lottery:[
                {"itemimg":activityBasePath+"/images/marquee_1.png","title":"京东券10元","haveprize":true,deg:30},
                {"itemimg":activityBasePath+"/images/marquee_5.png","title":"极米3D无屏电视","haveprize":true,deg:90},
                {"itemimg":activityBasePath+"/images/marquee_3.png","title":"京东券5元","haveprize":true,deg:150},
                {"itemimg":activityBasePath+"/images/marquee_4.png","title":"京东券50元","haveprize":true,deg:210},
                {"title":"谢谢参与","haveprize":false,deg:270},
                {"itemimg":activityBasePath+"/images/marquee_6.png","title":"电影券10元","haveprize":true,deg:330}],
                lotterys:[],
                 times1:'',//剩下的次数
                 doLuckyResult:[],
                 isPrize:false,//是否中奖
                 unPrize:'',              //没有抽中的提示语


                 
                 lotteryObj: {
                    currIndex: -1,
                    count: null,
                    cycle: null,
                    speed: null,
                    timerId: null,
                    prize: null,
                    url:'',
                    prizename:''
                },
                pcount:6,
                rotateCircle:0,
                 // 抽奖后弹框显示样式
                 dialog:[],
                 zcodeurl:basePath+'randomValidate/obtainValidateCode',
                 
             }
         },
         ready() {
            // window.ssssdddd = this;
            // this.lotteryObj.url = "/images/marquee_1.png";
            // this.lotteryObj.prizename = "京东券10元";
            // this.isPrize = true;
            // this.showRetTip();
            // return;
            this.$root.wxlisten = {that:this,shareupdate:this.getActUserTimes};
            // this.$root.musicData.showMusic = false;
            this.times1 = 0;
            // this.activity = JSON.parse(localStorage.getItem('activity'));
            // this.activityextbody = JSON.parse(this.activity.extbody);
            this.hideShare();
            var aid = urlUtil.getArgsFromUrl("aid");
            this.getuserSignInfo();

            this.getActUserTimes();//剩下的次数
            
            
            this.lotteryObj = initLottery();

            this.dialogFn();//弹框样式

            var ele = this.$els.ele;
            if(!ele) return;
            var that = this;
            // ele.addEventListener("webkitAnimationIteration", function(){
            //     that.animationIteration();
            // }, false);
            ele.addEventListener("webkitAnimationEnd", function(){
                setTimeout(that.showRetTip, 1000);
            }, false);

            this.songlisturl = this.$root.activityConfig.urls[0];

        },
        methods: {
            //设置弹框的样式
            dialogFn(){
                // this.dialog= JSON.parse(JSON.parse(localStorage.getItem('activity')).extbody).dialog;
                // console.log("弹框样式设置");
                // console.log(this.dialog);
                // console.log(this.dialog.fail.btnName);
                
            },
        	// 中奖榜单
        	getPrizeList(){
                this.refreshRank =!this.refreshRank;
        	},
            // 获取剩下的次数    
            getActUserTimes(){
                var that=this;
                sapi.queEveryDay(this,{},(back)=>{
                    if(back.resCode==0 || back.resCode=="0"){
                        that.times1=parseInt(back.repBody[0].player);

                        // if(back.repBody[0].player=='0'){
                        //     that.iclick=true;
                        // } 
                    }
                    else{
                        that.$dispatch('handle_server_error', back);
                    }
                })
            },
            showRetTip(){
                console.log(3333);
                this.getPrizeList();//获取获奖榜单
                this.iclick=false;
                // if(this.times1<=0){
                //     this.iclick=true;
                // }
                if(this.isPrize){
                    this.alertTip.rootTip=true;
                    this.alertTip.Atip=true;
                    this.alertTip.Btip=false;
                    this.alertTip.Ctip=false;
                }else{
                    this.alertTip.rootTip=true;
                    this.alertTip.Btip=true;
                    this.alertTip.Atip=false;
                    this.alertTip.Ctip=false;
                }
                this.vertigoctrl(false);
            },
            // 隐藏弹框
            hideAlertTip(){
                this.alertTip.rootTip=false;
                this.alertTip.Atip=false;
                this.alertTip.Btip=false;
                this.alertTip.Ctip=false;
            },

            showAlertTip(){
                this.alertTip.rootTip=true;
                this.alertTip.Atip=false;
                this.alertTip.Btip=false;
                this.alertTip.Ctip=true;
            },
            addr(){
                this.alertTip.rootTip=false;
                this.alertTip.showAddress=true;
            },

            //用户抽奖
            userDoLucky(){
                var that = this;
                that.lotteryObj.prize = -1;
                that.$dispatch('loading', {name:'doLucky', icon: true, text: '请稍候...', show: true, duration: 20*1000});
                sapi.doLucky(this,{"types": "跑马灯"},(back)=>{
                    that.$dispatch('cancelloading', 'doLucky');
                    that.getActUserTimes();

                    // that.isPrize=true;
                    // that.lotteryObj.prize = 1;
                    // that.lotteryObj.prizename = "极米3D无屏电视";
                    // that.lotteryObj.url = "/images/marquee_5_d.png";
                    // that.lucky.id="401";
                    // that.vertigo("vertigo"+that.lotteryObj.prize,4);
                    // that.isPrize=false;
                    // that.lotteryObj.prize = 2;
                    // that.lotteryObj.url = that.$root.activityConfig.images[0];
                    // that.vertigo("vertigo"+that.lotteryObj.prize,4);

                    if(back.resCode=='0'){
                         that.isPrize=true;
                         var prize = back.repBody[0];
                         that.lotteryObj.prize = 2;
                         that.lotteryObj.prizename = prize.pname;
                         that.lotteryObj.url = "";
                         if(prize.pid == "32"){
                            that.lotteryObj.prize = 1;
                            that.lotteryObj.url = that.lottery[5].itemimg;
                         }else if(prize.pid == "29"){
                            that.lotteryObj.prize = 3;
                            that.lotteryObj.url = that.lottery[3].itemimg;
                         }else if(prize.pid == "31"){
                            that.lotteryObj.prize = 4;
                            that.lotteryObj.url = that.lottery[2].itemimg;
                         }else if(prize.pid == "28"){
                            that.lotteryObj.prize = 5;
                            that.lotteryObj.url = that.$root.activityBasePath+"/images/marquee_5_d.png";
                         }else if(prize.pid == "30"){
                            that.lotteryObj.prize = 6;
                            that.lotteryObj.url = that.lottery[0].itemimg;
                         }else{

                         }
                         that.lucky.id=prize.gid;
                         that.vertigo("vertigo"+that.lotteryObj.prize,8);
                     }
                     else if(back.resCode=='1006'){
                         that.isPrize=false;
                         that.lotteryObj.prize = 2;
                         that.vertigo("vertigo2",8);
                         var urlindex = Math.floor(Math.random()*that.$root.activityConfig.images.length);
                         if(urlindex == that.$root.activityConfig.images.length){
                            urlindex = 0;
                         }
                         that.lotteryObj.url = that.$root.activityConfig.images[urlindex];
                         that.songlisturl = that.$root.activityConfig.urls[urlindex];
                     }
                     else{
                        that.isPrize=false;
                        that.lotteryObj.prize = -2;
                        that.isClick='0';
                        that.$dispatch('handle_server_error', back);
                    }
                    that.unPrize=back.resMsg;
                });
            },
            isClick(){
                // if(this.iclick){
                //     this.lotteryObj.prize = Math.floor(Math.random()*5)+1;
                //     this.lotteryObj.prize = 5;
                // }else{
                //     // this.lotteryObj.prize = -1;
                //     // this.vertigoctrl(true);
                //     // this.iclick = !this.iclick;

                //     this.sdtest("vertigo6",6);
                // }
                // this.vertigo("vertigo2",8);
                // return;

                if(!this.iclick && this.times1>0){
                    var currIndex = this.lotteryObj.currIndex;
                    this.lotteryObj = initLottery();
                    this.lotteryObj.currIndex = currIndex;
                    this.userDoLucky();
                }else if(this.times1=='0'){
                    this.$dispatch('loading', {text: '暂无抽奖机会', show: true, duration: 2000});
                }
                else{

                }
            },
            vertigoctrl(go){
                var ele = this.$els.ele;
                if(!ele) return;
                if(go){
                    // this.setanimation(ele,"vertigo 2s linear infinite");
                    // ele.style.animationPlayState = "running";
                }else
                {
                    this.setanimation(ele,"");
                }

            },
            setanimation(el,animation){
                el.style.WebkitAnimation = animation;
                el.style.MozAnimation = animation;
                el.style.MsAnimation = animation;
                el.style.OAnimation = animation;
                el.style.animation = animation;
            },
            // animationIteration(){
            //     console.log(3);
            //     if(this.lotteryObj.prize>=0){
            //         // this.times1 = this.lotteryObj.prize;
            //         this.vertigoctrl(false);
            //         var index = this.lotteryObj.prize+1;
            //         this.sdtest("vertigo"+index,6);
            //     }
            // },
            vertigo(n,t){
                var ele = this.$els.ele;
                if(!ele) return;
                this.setanimation(ele,n+" "+t+"s ease-out forwards");
                ele.style.animationPlayState = "running";
            },
            hideShare(){
                this.sharetip = false;
            },
            shareWx(){
            },
            getuserSignInfo(){
                // var that = this;
                // sapi.getuserSignInfo(this,{},(back)=>{
                //     if(back.resCode=="0") {
                //         if(back.repBody.length>0 && back.repBody[0].types == "1"){
                //             that.ismark = true;
                //         }
                //     }
                //     else{
                //         that.$dispatch('handle_server_error', back);
                //     }
                // });
            },
            userSign(){
                // var that = this;
                // that.$dispatch('loading', {name:'game_userSign', text: '加载中...', icon: true, show: true, duration: 10*1000});
                // sapi.userSign(this,{},(back)=>{
                //     that.$dispatch('cancelloading', 'game_userSign');
                //     if(back.resCode=="0") {
                //         that.getActUserTimes();//剩下的次数
                //         that.$dispatch('loading', {name:'game_mark_tip', text: '恭喜您，签到成功！抽奖机会+'+that.activity.color, icon: false, show: true, duration: 2*1000});
                //         that.ismark = true;
                //     }
                //     else{
                //         that.$dispatch('handle_server_error', back);
                //     }
                // });
            },
            mark(){
                // this.userSign();
            },
            refreshzcode(){
                this.zcodeurl = basePath+'randomValidate/obtainValidateCode?'+Math.random();
            },

        },


    }

</script>


