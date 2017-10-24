<template>
	<div class="app-view game-page">
		<section class="section-wrap">
            <div class="activity-num-div">
                <!-- <a class="mrule" @click="$root.showActivityD=true" >活动规则</a> -->
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
                    
                 </tr>
                 <tr>
                     <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[7].index}"  :style="'background:url('+lottery[7].img+') center center no-repeat;'">
                        <img :src="lottery[7].itemimg"/>
                    </td>
                    <td rowspan="1" colspan="1"  :class="{grayImg: iclick}" @click="isClick" :style="'background:url(images/t-marquee-btn.png) 50% 50% no-repeat;'">
                        
                    </td>
                     <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[3].index}" :style="'background:url('+lottery[3].img+') center center no-repeat;'">
                         <img :src="lottery[3].itemimg"/>
                     </td>
                   
                </tr>
              
                <tr>
                   
                   
                    <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[6].index}"  :style="'background:url('+lottery[6].img+') center center no-repeat;'">
                        <img :src="lottery[6].itemimg"/>
                    </td>
                     <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[5].index}"  :style="'background:url('+lottery[5].img+') center center no-repeat;'">
                        <img :src="lottery[5].itemimg"/>
                    </td>
                       <td class="lottery-unit" :class="{active: lotteryObj.currIndex==lottery[4].index}"  :style="'background:url('+lottery[4].img+') center center no-repeat;'">
                        <img :src="lottery[4].itemimg"/>
                    </td>

                </tr>
            </table>
        </div>
        <div class="question-text" @click="question()">
            <p>这里还有一份特殊礼物等您领取，请点击这里</p>
        </div>
        <div class="award-wrap">
             <prizelist :change-prize="refreshRank" :show-add.sync="alertTip.showAddress" :gid.sync="lucky.id"></prizelist>
            
        </div>


    </section>



    <!-- 遮罩层  -->
    <section class="bg-section"  v-if="alertTip.rootTip" >

        <div class="content">
            <div class="div1" v-if="alertTip.Atip">
                <div class="content-title">
                    <img :src="$root.activityBasePath+'/css/img/t-draw-result.png'" style="width: 100%;">
                    <p>恭喜您抽中{{lotteryObj.prizename}}</p>
                   <!--  <img :src="$root.activityBasePath+lotteryObj.url" style="width: 210px;height: 180px;" /> -->
                    

                </div>
                <a class="btn" @click="addr()" style="margin-top: 0;" >
                    <img :src="$root.activityBasePath+'/css/img/t-award-btn.png'">
                </a>
               
            </div>
            <div class="div2" v-if="alertTip.Btip">
               <div class="content-title3">
                  <img :src="$root.activityBasePath+'/css/img/t-undraw.png'">
                   <img :src="$root.activityBasePath+'/images/t-wechat.jpg'">
                   <p>关注114号百微信公众号</p>
               </div>
               <a class="btn" @click="hideAlertTip()" > <img :src="$root.activityBasePath+'/css/img/t-continue-draw-btn.png'"></a>
              
           </div>
            <div class="div3" v-if="alertTip.Ctip">
                <div class="content-title">
                    <p class="success">领取成功!</p>

                </div>
            </div>
            <div class="div4" v-if="alertTip.Dtip">
                 <div class="content-title3">
                    <p class="success"><img :src="$root.activityBasePath+'/images/t-question.png'"><span>114号码百事通问卷调查</span></p>
                    <p>亲爱的朋友们：</p>
                    <p>谢谢您抽出宝贵时间参与此次调查，本问卷主要针对
                        114号码百事通微信公众号满意程度及改良建议而
                        提出，您的协助将使114号码百事通更有价值！</p>
                    <div class="text1">
                        <p>1、你使用过114号码百事通哪项查询服务<span>*(多选题)</span></p>
                        <div class="row">
                            <input type="checkbox" value="查号码" v-model="checkedNames">
                            <span>查号码</span>
                        </div>
                        <div class="row">
                            <input type="checkbox" value="查公交" v-model="checkedNames">
                            <span>查公交</span>
                        </div>
                        <div class="row">
                            <input type="checkbox" value="查违章" v-model="checkedNames">
                            <span>查违章</span>
                        </div>
                        <div class="row">
                            <input type="checkbox" value="查积分" v-model="checkedNames">
                            <span>查积分</span>
                        </div>
                    </div> 
                     <div class="text1">
                        <p>2、你最希望114号码百事通提供哪项查询服务？</p>
                        <div class="row">
                            <input type="radio" name="0" value="查栏目" v-model="picked">
                            <span>查栏目</span>
                        </div>
                        <div class="row">
                            <input type="radio" name="0" value="查天气" v-model="picked">
                            <span>查天气</span>
                        </div>
                        <div class="row">
                            <input type="radio" name="0" value="查景点" v-model="picked">
                            <span>查景点</span>
                        </div>
                        <div class="row">
                            <input type="radio" name="0" value="其他" v-model="picked">
                            <span>查其他</span>
                        </div>
                    </div>  
                     <div class="text2">
                        <p>3、你对114号码百事通微信公众号服务打几分？</p>
                        <div class="row">
                            <input type="radio" name="1" value="1分" v-model="score">
                            <span>1分</span>
                        </div>
                        <div class="row">
                            <input type="radio" name="1" value="2分" v-model="score">
                            <span>2分</span>
                        </div>
                        <div class="row">
                            <input type="radio" name="1" value="3分" v-model="score">
                            <span>3分</span>
                        </div>
                        <div class="row">
                            <input type="radio" name="1" value="4分" v-model="score">
                            <span>4分</span>
                        </div>
                        <div class="row">
                            <input type="radio" name="1" value="5分" v-model="score">
                            <span>5分</span>
                        </div>
                    </div> 
                    <div style="text-align: center;" @click="referForm()">
                        <img :src="$root.activityBasePath+'/images/t-refer.png'">
                    </div>
                </div>
                 
            </div>  
            <div class="div4" v-if="alertTip.Ftip">
                <div class="content-title4">
                    <p>恭喜您获得神秘大奖的参与资格，我们会在活动结束后公布中奖名单，感谢您的参与！</p>
                    <img :src="$root.activityBasePath+'/images/t-wechat.jpg'">
                    <p style="font-size: 28px;">关注114号码百事通微信公众号</p>
                </div>
                 
            </div>
             <div class="btn-close" @click="hideAlertTip()"><img :src="$root.activityBasePath+'/images/t-close.png'"/></div>
         </div>
        
</section>
<address :show-address.sync="alertTip.showAddress" :gid="lucky.id" ></address>
<img :src="$root.activityBasePath+'/css/img/bg.jpg'"  class="bg">
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
    margin: 5px auto 0 auto;
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
.question-text{
    width: 94%;
    height: 80px;
    line-height: 80px;
    border-radius: 30px;
    color: #fff;
    font-size: 28px;
    margin-left: 3%;
    text-align: center;

background: #363839; /* Old browsers */
background: -moz-linear-gradient(top,  #363839 0%, #707172 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  #363839 0%,#707172 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  #363839 0%,#707172 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#363839', endColorstr='#707172',GradientType=0 ); /* IE6-9 */

}
.award-wrap{
    a{

        // display: inline-block;
        // width: 49%;
        text-align: left;
        margin-top: 30px;
       
    }
}
.div4{
    background: rgba(0,0,0,0.7);
    border: 10px solid #fff;
    border-radius: 10px;
    position: relative;
    max-height: 850px;
    overflow: scroll;
    .btn-close{
        position: absolute;
        top: -20px;
        right: 20px;
    }
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
            count: 7,
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
                    Ctip:false, //领取成功的弹框
                    Dtip:false,//问题答卷弹框
                    Ftip:false,//提交问题答卷弹框
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
                {"img":"images/t-item-bg.png","itemimg":"images/t-marquee-2.png","index":0,"seq":"不中奖选项","title":"还差一点就抽中啦","haveprize":false},
                {"img":"images/t-item-bg.png","itemimg":"images/t-marquee-1.png","index":1,"seq":"二","title":"三等奖","haveprize":true},
                {"img":"images/t-item-bg.png","itemimg":"images/t-marquee-2.png","index":2,"seq":"不中奖选项","title":"还差一点就抽中啦","haveprize":true},
                {"img":"images/t-item-bg.png","itemimg":"images/t-marquee-3.png","index":3,"seq":"四","title":"二等奖","haveprize":true},
                {"img":"images/t-item-bg.png","itemimg":"images/t-marquee-4.png","index":4,"seq":"五","title":"一等奖","haveprize":true},
                {"img":"images/t-item-bg.png","itemimg":"images/t-marquee-2.png","index":5,"seq":"不中奖选项","title":"还差一点就抽中啦","haveprize":false},
                {"img":"images/t-item-bg.png","itemimg":"images/t-marquee-1.png","index":6,"seq":"七","title":"三等奖","haveprize":false},
                {"img":"images/t-item-bg.png","itemimg":"images/t-marquee-3.png","index":7,"seq":"八","title":"二等奖","haveprize":false},
               ],
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
                 checkedNames:[],
                 picked:'',
                 score:'',
                 
             }
         },
         ready() {
            this.$root.wxlisten = {that:this,shareupdate:this.getActUserTimes};
            // this.$root.musicData.showMusic = false;
            // document.querySelector("#audio").pause();
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
                console.log( this.lotteryObj.count);
                // 如果当前滚动的索引大于总格数 就归零
                if(this.lotteryObj.currIndex > this.lotteryObj.count) {
                    this.lotteryObj.currIndex = 0;
                }

                //请求失败停止
                if(this.lotteryObj.prize == -2){
                    this.lotteryObj.prize = -1;
                    this.lotteryObj.currIndex = 0;
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
                    this.alertTip.Dtip=false;
                    this.alertTip.Ftip=false;
                }else{
                    this.alertTip.rootTip=true;
                    this.alertTip.Btip=true;
                    this.alertTip.Atip=false;
                    this.alertTip.Ctip=false;
                    this.alertTip.Dtip=false;
                    this.alertTip.Ftip=false;

                }
            },
            // 隐藏弹框
            hideAlertTip(){
                this.alertTip.rootTip=false;
                this.alertTip.Atip=false;
                this.alertTip.Btip=false;
                this.alertTip.Ctip=false;
                this.alertTip.Dtip=false;
                this.alertTip.Ftip=false;
            },

            showAlertTip(){
                this.alertTip.rootTip=true;
                this.alertTip.Atip=false;
                this.alertTip.Btip=false;
                this.alertTip.Ctip=true;
                this.alertTip.Dtip=false;
                this.alertTip.Ftip=false;
            },
            question(){
                this.alertTip.rootTip=true;
                this.alertTip.Atip=false;
                this.alertTip.Btip=false;
                this.alertTip.Ctip=false;
                this.alertTip.Dtip=true;
                this.alertTip.Ftip=false;
            },
            addr(){
                this.alertTip.rootTip=false;
                this.alertTip.showAddress=true;
            },

            //用户抽奖
            userDoLucky(){
                var that = this;
                that.lotteryObj.prize = -1;
                sapi.doLucky(this,{},(back)=>{
                    that.getActUserTimes();
                    var prize = back.repBody[0];
                    that.lotteryObj.prize = 2;
                     that.lotteryObj.prizename = prize.pname;
                     that.lotteryObj.url = "";
                    if(back.resCode == "0"){
                         that.isPrize=true;
                         that.lucky.id=back.repBody[0].gid;
                        if(prize.pid == "28"){
                            that.lotteryObj.prize = 4;
                            that.lotteryObj.url = that.lottery[4].itemimg;
                        }
                         if(prize.pid == "29"){
                            that.lotteryObj.prize = 3;
                            that.lotteryObj.url = that.lottery[3].itemimg;
                        }
                         if(prize.pid == "30"){
                            that.lotteryObj.prize = 1;
                            that.lotteryObj.url = that.lottery[1].itemimg;
                        }
                    }else if(back.resCode=='1006'){
                        that.isPrize=false;
                        that.lotteryObj.prize = 2;
                        that.lotteryObj.url = that.lottery[5].itemimg;
                    }else{
                        that.isPrize=false;
                        that.lotteryObj.prize = -2;
                        that.isClick='0';
                        that.$dispatch('handle_server_error', back);
                    }
                //     that.getActUserTimes();

                //     if(back.resCode=='0'){
                //      that.isPrize=true;
                //      var prize = back.repBody[0];
                //      that.lotteryObj.prize = parseInt(prize.pooltitle);
                //      that.lotteryObj.prizename = prize.pname;
                //      that.lotteryObj.url = prize.imgurl;
                //      that.lucky.id=back.repBody[0].gid;
                //  }
                //  else if(back.resCode=='1006'){
                //     that.isPrize=false;
                //     var count = 3;
                //     var tprize = Math.floor(Math.random()*count);
                //     if(tprize == count){
                //         tprize = count - 1;
                //     }
                //     var cprize = 0;

                //     for (var i = 0; i < that.lottery.length; i++) {
                //         if(!that.lottery[i].haveprize){
                //             if(cprize == tprize){
                //                 that.lotteryObj.prize = i;
                //                 break;
                //             }
                //             cprize++;
                //         }

                //     };
                //     if(that.lotteryObj.prize < 0){
                //         that.lotteryObj.prize = 0;
                //     }

                // }
                // else{
                //     that.isPrize=false;
                //     that.lotteryObj.prize = -2;
                //     that.isClick='0';
                //     that.$dispatch('handle_server_error', back);
                // }
                // that.unPrize=back.resMsg;
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
            //提交调查问卷
            referForm(){
                console.log(this.checkedNames)
                console.log(this.picked)
                console.log(this.score)
                var that = this;
                var body = {
                    question_one: this.checkedNames,
                    question_two: this.picked,
                    question_three: this.score
                }
                sapi.saveQuestion(this,body,(back)=>{
                    console.log(back)
                    if(back.resCode=="0"){
                         this.alertTip.rootTip=true;
                        this.alertTip.Atip=false;
                        this.alertTip.Btip=false;
                        this.alertTip.Ctip=false;
                        this.alertTip.Dtip=false;
                        this.alertTip.Ftip=true;
                    }else{
                         that.$dispatch('handle_server_error', back);
                    }
                   
                })
                
            }

        },


    }

</script>


