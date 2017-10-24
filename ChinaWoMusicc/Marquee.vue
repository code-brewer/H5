<template>
	<div class="app-view game-page">
		<section class="section-wrap">
            <div class="activity-num-div">
                <a class="mrule" @click="$root.showActivityD=true" >活动规则</a>
                <div class="activity-num">
                    还有<i class="num">{{times1}}</i>次机会 
                </div>
                <!-- <a class="gamemark" @click="mark" ></a> -->
            </div>    

            <div class="prize-wrap" id="lottery">
                <table class="prize-box" border="0" cellspacing="4" cellpadding="0">
                    <tr>
                        <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[0].index}" :style="'background:url('+lottery[0].img+') center center no-repeat;'">
                            <img :src="lottery[0].itemimg"/>
                        </td>
                        <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[1].index}"  :style="'background:url('+lottery[1].img+') center center no-repeat;'">
                            <img :src="lottery[1].itemimg"/>
                        </td>
                        <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[2].index}" :style="'background:url('+lottery[2].img+') center center no-repeat;'">
                         <img :src="lottery[2].itemimg"/>
                     </td>
                     <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[3].index}" :style="'background:url('+lottery[3].img+') center center no-repeat;'">
                         <img :src="lottery[3].itemimg"/>
                     </td>
                 </tr>
                 <tr>
                    <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[11].index}"  :style="'background:url('+lottery[11].img+') center center no-repeat;'">
                        <img :src="lottery[11].itemimg"/>
                    </td>
                    <td rowspan="2" colspan="2">
                        <div class="btn-td" :class="{grayImg: iclick}" @click="isClick" >
                        </div>
                    </td>

                    <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[4].index}"  :style="'background:url('+lottery[4].img+') center center no-repeat;'">
                        <img :src="lottery[4].itemimg"/>
                    </td>
                </tr>
                <tr>
                    <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[10].index}"  :style="'background:url('+lottery[10].img+') center center no-repeat;'">
                        <img :src="lottery[10].itemimg"/>
                    </td>
                    <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[5].index}"  :style="'background:url('+lottery[5].img+') center center no-repeat;'">
                        <img :src="lottery[5].itemimg"/>
                    </td>
                </tr>
                <tr>
                    <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[9].index}"  :style="'background:url('+lottery[9].img+') center center no-repeat;'">
                        <img :src="lottery[9].itemimg"/>
                    </td>
                    <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[8].index}"  :style="'background:url('+lottery[8].img+') center center no-repeat;'">
                        <img :src="lottery[8].itemimg"/>
                    </td>
                    <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[7].index}"  :style="'background:url('+lottery[7].img+') center center no-repeat;'">
                        <img :src="lottery[7].itemimg"/>
                    </td>
                    <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[6].index}"  :style="'background:url('+lottery[6].img+') center center no-repeat;'">
                        <img :src="lottery[6].itemimg"/>
                    </td>

                </tr>
            </table>
        </div>



        <div class="downdiv">
            <member></member>
            <p class="tip1" style="margin-bottom: 40px;">微信分享活动到朋友圈即可额外获得一次抽奖机会</p>
            <!-- <p class="tip2">资费：6元/月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2G/3G炫铃用户仅需1元/月)</p> -->
            <prizelist :change-prize="refreshRank" :show-add.sync="alertTip.showAddress" :gid.sync="lucky.id"></prizelist>
            <p class="tip3" style="white-space: pre;">中国联通<span style="font-family: none;">&nbsp;&nbsp;&nbsp;&nbsp;</span>沃音乐<br/>wap.10155.com<br/>活动解释权归中国联通沃音乐所有</p>
        </div>



    </section>



    <!-- 遮罩层  -->
    <section class="bg-section" v-if="alertTip.rootTip">

        <div class="content">
            <div class="div1" v-if="alertTip.Atip">
                <div class="content-title">
                    <p>恭喜您</p>
                    <p>抽中了{{lotteryObj.prizename}}</p>
                    <img :src="$root.activityBasePath+lotteryObj.url" style="width: 210px;height: 180px;margin-top: 20px;" />
                    

                </div>
                <a class="btn" @click="addr()" style="" >去领奖</a>
                <a class="woad"  :href="$root.fmappurl" >下载饭盟APP</a>
            </div>
            <div class="div2" v-if="alertTip.Btip">
               <div class="content-title2">
                   <p>还差一点就抽中啦!</p>
                   <img style="margin-top: 30px;" :src="$root.activityBasePath+'/css/img/llfail.png'" alt="">
               </div>
               <a class="btn" @click="hideAlertTip()" >继续抽奖</a>
               <a class="woad" :href="$root.fmappurl" >下载饭盟APP</a>
           </div>

           <div class="div3" v-if="alertTip.Ctip">
            <div class="content-title">
                <p class="success">领取成功!</p>

            </div>
        </div>    
        <div class="btn-close" @click="hideAlertTip()"><img :src="$root.activityBasePath+'/images/close-2.png'"/></div>
    </div>
</section>
<address :show-address.sync="alertTip.showAddress" :gid="lucky.id" ></address>
<img :src="$root.activityBasePath+'/css/img/marquee_bg.png'"  class="bg">
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
</style>

<script>
	import {router} from './index'
	import sapi from './utils/serverapi.js'
	import urlUtil from './utils/url.js'

    // require(['./js/zepto.min.js'])   


    

    function initLottery() {
        return {
            currIndex: 0,
            count: 11,
            cycle: 50,
            speed: 200,
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
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_1.png","index":0,"seq":"不中奖选项","title":"还差一点就抽中啦","haveprize":false},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_2.png","index":1,"seq":"二","title":"一等奖","haveprize":true},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_3.png","index":2,"seq":"不中奖选项","title":"还差一点就抽中啦","haveprize":true},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_4.png","index":3,"seq":"四","title":"三等奖","haveprize":true},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_5.png","index":4,"seq":"不中奖选项","title":"还差一点就抽中啦","haveprize":true},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_1.png","index":5,"seq":"六","title":"三等奖","haveprize":false},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_7.png","index":6,"seq":"不中奖选项","title":"还差一点就抽中啦","haveprize":true},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_8.png","index":7,"seq":"八","title":"二等奖","haveprize":true},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_1.png","index":8,"seq":"不中奖选项","title":"还差一点就抽中啦","haveprize":false},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_10.png","index":9,"seq":"十","title":"二等奖","haveprize":true},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_11.png","index":10,"seq":"不中奖选项","title":"还差一点就抽中啦","haveprize":true},
                {"img":activityBasePath+"/images/marquee_item_bg.png","itemimg":activityBasePath+"/images/marquee_12.png","index":11,"seq":"十二","title":"三等奖","haveprize":true}],
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

                 // 抽奖后弹框显示样式
                 dialog:[],
                 zcodeurl:basePath+'randomValidate/obtainValidateCode',
                 
             }
         },
         ready() {
            // this.lotteryObj.url = "/images/marquee_12.png";
            // this.lotteryObj.prizename = "还差一点就抽中啦还差一点就抽中啦";
            // this.isPrize = true;
            // this.showRetTip();
            // return;
            this.$root.wxlisten = {that:this,shareupdate:this.getActUserTimes};
            this.$root.musicData.showMusic = false;
            document.querySelector("#audio").pause();
            this.times1 = 1;
            // this.activity = JSON.parse(localStorage.getItem('activity'));
            // this.activityextbody = JSON.parse(this.activity.extbody);
            this.hideShare();
            var aid = urlUtil.getArgsFromUrl("aid");
            this.getuserSignInfo();

            this.getActUserTimes();//剩下的次数
            
            
            this.lotteryObj = initLottery();

            this.dialogFn();//弹框样式

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
                this.refreshRank = !this.refreshRank;
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



            //跑马灯
            roll() {
                this.iclick=true;//不能点击
                
                this.lotteryObj.currIndex++;
                this.lotteryObj.cycle--;

                // 如果当前滚动的索引大于总格数 就归零
                if(this.lotteryObj.currIndex > this.lotteryObj.count) {
                    this.lotteryObj.currIndex = 0;
                }

                //请求失败停止
                if(this.lotteryObj.prize == -2){
                    this.lotteryObj.prize = -1;
                    this.lotteryObj.currIndex = 0;
                    this.iclick=false;
                    return;
                }

                //如果请求还没有回来就再跑两圈
                if(this.lotteryObj.cycle <= this.lotteryObj.count+2 && this.lotteryObj.prize<0){
                    this.lotteryObj.cycle = 32;
                }

                // 如果滚动次数小于总格数就开始注意有木有中奖
                if(this.lotteryObj.cycle <= this.lotteryObj.count) {

                    if(this.lotteryObj.speed<400){
                        this.lotteryObj.speed += 100;
                    }else{
                        this.lotteryObj.speed += 50;
                    }

                    // 当前索引指定中奖位置
                    if(this.lotteryObj.currIndex==this.lotteryObj.prize) {
                        this.clearTimer();
                        setTimeout(this.showRetTip, 1000);
                        return;
                    }

                    // 如果没有滚动次数结束 默认停止
                    if(this.lotteryObj.cycle<=0) {
                        this.lotteryObj = initLottery();

                        this.clearTimer();
                        return;
                    }
                }

                

                // 最后三圈前，速度在大于40毫秒每次循环递减10毫秒，直到小于40毫秒
                if(this.lotteryObj.speed > 40 && this.lotteryObj.cycle >= this.lotteryObj.count*3) {
                    this.lotteryObj.speed -= 10;
                }

                // 最后两圈前，速度在小于80毫秒每次循环递增10毫秒
                if(this.lotteryObj.speed < 80 && this.lotteryObj.cycle < this.lotteryObj.count*3 && this.lotteryObj.cycle > this.lotteryObj.count*2) {
                    this.lotteryObj.speed += 10;
                }
                // 最后两圈，速度在小于200毫秒每次循环递增10毫秒
                if(this.lotteryObj.speed < 200 && this.lotteryObj.cycle <= this.lotteryObj.count*2) {
                    this.lotteryObj.speed += 10;
                }
                // console.log(this.lotteryObj.speed);

                this.lotteryObj.timerId = setTimeout(this.roll, this.lotteryObj.speed);
            },

            clearTimer() {
                clearTimeout(this.lotteryObj.timerId);
            },
            showRetTip(){
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
                sapi.doLucky(this,{"types": "跑马灯"},(back)=>{
                    that.getActUserTimes();

                    if(back.resCode=='0'){
                     that.isPrize=true;
                     var prize = back.repBody[0];
                     that.lotteryObj.prize = parseInt(prize.pooltitle);
                     that.lotteryObj.prizename = prize.pname;
                     that.lotteryObj.url = prize.imgurl;
                     that.lucky.id=back.repBody[0].gid;
                 }
                 else if(back.resCode=='1006'){
                    that.isPrize=false;
                    var count = 3;
                    var tprize = Math.floor(Math.random()*count);
                    if(tprize == count){
                        tprize = count - 1;
                    }
                    var cprize = 0;

                    for (var i = 0; i < that.lottery.length; i++) {
                        if(!that.lottery[i].haveprize){
                            if(cprize == tprize){
                                that.lotteryObj.prize = i;
                                break;
                            }
                            cprize++;
                        }

                    };
                    if(that.lotteryObj.prize < 0){
                        that.lotteryObj.prize = 0;
                    }

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

                if(!this.iclick && this.times1>0){
                    var currIndex = this.lotteryObj.currIndex;
                    this.lotteryObj = initLottery();
                    this.lotteryObj.currIndex = currIndex;
                    this.userDoLucky();
                    this.roll();
                }else if(this.times1=='0'){
                    this.$dispatch('loading', {text: '请明天再来挑战', show: true, duration: 1000});
                }
                else{

                }
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


