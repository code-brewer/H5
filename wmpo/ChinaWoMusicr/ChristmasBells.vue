<template>
    <div class="app-view bells-page">
        <section class="section-bell" :style="{'height':height+'px'}">
            <div class="main-bg">
                <img :src="'r/images/ring-bg.jpg'" :style="{'height':height+'px'}">
            </div>
            <div class="logo">
                <img :src="'r/images/logo.png'">
            </div>
            <div class="music_content" style="background: url('./r/images/ring-con-bg.png') center center no-repeat; background-size: 100% 100%;">
                <!-- <div class="title">新春炫铃</div> -->
                <div class="music-con">
                    <div class="row" v-for="(index,item) in ringList">
                        <div class="musicLogo" style="background: url('./r/images/m.png') center center no-repeat;"></div>
                        <div class="musicText">
                            <p class="top_text">{{item.song}}</p>
                            <p class="bottom_text">{{item.singer}}</p>
                        </div>
                        <div class="play_or_stop">
                            <img :src="item.iconListen" alt="" @click="ToggleAudio(index,'play')" :class="{display:!item.iconListenD,}">
                            <img :src="item.iconMusic" alt="" @click="ToggleAudio(index,'pause')" :class="{display:item.iconListenD,}">
                        </div>
                        <div class="LY" style="background: url('./r/images/ling.png') center center no-repeat;" @click="setMusic(index)"></div>
                    </div>
                </div>
                <audio id="audios" :src="select.musicSrc"  loop="loop">您的浏览器不支持 audio 标签.</audio>
               
            </div>
             <p class="more" @click="moreMusic">查看更多精彩铃音>></p>
            <div class="btn-panel" v-if="$root.cookieVip != '0000000000'" style="text-align: center;">
                 <a class="btn" @click="openvip"  style="margin-top: 0;background: url('./r/images/open-vip-btn.png') center center no-repeat; margin-left: 15px;"></a>
            </div>
             <div class="title-panel">
                <p>单首炫铃￥2元/首，订购会员可免费使用炫铃功能和不限量 更换炫铃，会员资费￥6元/月。</p>
               
            </div>
        
        </section>
    
        <!--提示确认订购炫铃弹框-->
        <modal :show.sync="showBuyTone" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <div class="box text-center"  style="background: #ff99b3;">
                   <div style="padding: 20px; border: 1px solid #fff;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否确认订购此炫铃？</p>
                        <p class="offers-text"><span>{{buyToneMusic}}</span></p>
                        <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                        <!-- <img style="padding: 20px;" :src="'r/images/agree.png'" /> -->
                        <div class="agree">
                            <input type="checkbox" v-model="isCheck">
                            <p>同意开通炫铃功能</p>
                        </div>
                        <a class="confirm-btn" @click="sureBuyLing()" v-if="isCheck" style="margin-top: 0;background: url('./r/images/btn-bg.png') center center no-repeat; margin-left: 25%;">确定</a>
                         <a class="confirm-btn" v-if="!isCheck" style="margin-top: 0;background: url('./r/images/gray-btn.png') center center no-repeat; margin-left: 25%;">确定</a>
                        <div class="offers-url" style="overflow:hidden;font-size: 24px; text-align: left; line-height: 40px; color: #fff;">
                            <p style="float: left">1.正常使用炫铃需开通炫铃功能。全国4G用户和广东、上海、吉林、甘肃的2G/3G用户可免费开通，其余省的2G/3G未开通炫铃功能的用户确认领取后自动开通炫铃功能（5元/月）。</p>
                            <p> 2.铃音盒领取成功后，使用有效期可到沃音乐官网的“个人中心”查看。</p>
                           
                        </div>
                    </div>
                    <div class="close-img" @click="showBuyTone = false">   <img :src="'r/images/close.png'" />
                    </div>
                    
                </div>
            </div>
        </modal>
       <!--订购成功-->
        <modal :show.sync="showSuccess" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
               <div class="box text-center" style="background-image: url('./r/images/modal-bg1.jpg'); background-size: 100% 100%;">
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px;font-size: 65px;
    font-weight: 700; text-shadow: 3px 3px 3px #000;">订购成功!</p>
                        <p class="offers-text">歌曲已设置为默认炫铃，可登录沃音乐官网“个人中心”查看或更换</p>
                        <div class="offers-url" style="padding-bottom: 50px">

                        </div>
                        <a class="confirm-btn" @click="showSuccess = false" style="margin-top: 0;background: url('./r/images/btn-bg.png') center center no-repeat; margin-left: 25%;">确定</a>
                    </div>
                    <div class="close-img"  @click="showSuccess = false"><img :src="'r/images/close.png'" /></div>
                </div>

            </div>
        </modal>
    </div>

</template>

<style lang="sass">
    .display{
        display: none;
    }
    .agree{
        padding-bottom: 10px;
        input{
            width: 30px;
            height: 30px;
            vertical-align: middle;
        }
        p{
            vertical-align: middle;
            display: inline-block;

        }
    }
   .prize-over-view{
        .box{
            color:#fff;
            .offers-text{
                color:#fff;
                span{
                    color:#3766a7;
                }
            }
        }
    }
    .banner-panel {
        z-index: 12;
        position: absolute;
        text-align: center;
        width: 100%;
        top: 37%;
        font-size: 0;
    p {
        font-size: 28px;
        color: #ffcf4a;
        font-weight: bold;
    }
    }
    @media (device-height:480px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone4/4s */

        .banner-panel img{
            width:440px;
        }

    }



    @keyframes roll {
        0% {
            transform: rotate(0deg)
        }
        100% {
            transform: rotate(360deg)
        }
    }

    .section-bell {
        // height: 100%;
        background-size: auto 100%;
        background-repeat: no-repeat;
    .main-bg {
        position: absolute;
        width: 100%;
        height: 100%;
    img {
        width: 100%;
        height: 100%;
    }
    }
    .logo-panel {
        position: absolute;
        left: 75%;
        top: 2%;
    img {
        width: 100%;
    }
    }
    .music-panel {
        position: absolute;
        left: 85%;
        top: 20px;
        font-size: 0;
        animation: roll 5s linear infinite;
    img {
        width: 100%;
    }
    }

    .music_content{
        position: absolute;
        top: 15%;
        // height: 74%;
        margin-top: 20px;
        width: 96%;
        margin-left:2%;
        z-index:99;
        // background-color:rgba(255,255,255,.9);
        // border-radius: 10px;
        // border: 2px solid #b152c7;
        color: #fff;
        .music-con{
            padding: 10% 0;
        }
        .title{
            font-size: 45px;
            text-align: center;
            padding: 2%;
            color: #fff;

        }
        .row{
            width:83%;
            margin:0 9.5%;
            height: 13%;
            overflow:hidden;
            border-bottom: 2px dashed #fff;

            .musicLogo{
                // background: url("images/music.png")no-repeat;
                background-size: 70px;
                width: 77px;
                height: 58px;
                margin-top: 3%;
                float: left;
                background-position: center;
                border-right: 2px solid #fff;
            }
            .musicText{
                width: 52%;
                height: 100%;
                padding: 2% 0;
                line-height: 117%;
                float: left;
                p{
                    color: #fff;
                }
                    .top_text{
                        font-size: 28px;
                        padding: 1.5% 0;
                        text-align: left;
                        margin-left: 15px;
                        font-weight:bold;
                    }
                    .bottom_text{
                        padding: 1.5% 0;
                        text-align: left;
                        margin-left: 15px;
                    }
            }
            .play_or_stop{
                img{
                    // width: 45%;
                    // height: 45%;
                }
                /*background: url("images/listen.png")no-repeat;*/
                /*background-size: 40px;*/
                /*background-position: center;*/
                width: 18%;
                float: left;
                height: 90px;
                line-height: 105px;
                text-align: center;
            }
            .LY{
                // background: url("images/LY.png")no-repeat;
                background-size: 40px;
                background-position: center;
                width: 10%;
                height: 90px;
                float: left;
            }
        }
        .row:last-child{
            border-bottom: none;
        }
    }

    .btn-panel {
        position: absolute;
        bottom: 5%;
        margin-top: 20px;
        width: 100%;
        z-index:99;
        a {
            font-size: 36.7px;
            display: block;
            width: 249px;
            height: 92px;
            line-height: 92px;
            text-align: center;
            background-repeat: no-repeat;
            display: inline-block;
            color: #fff;
            text-decoration:none;
        }
    }
    .top_img{
        width: 100%;
        padding-top: 100px;
        z-index: 99;
    }
    .title-panel {
        position: absolute;
        bottom: 1%;
       // text-align: center;
        // margin-top: 20px;
        width: 100%;
        padding: 0 5%;
        text-align: left;
        // font-size: 0;
        p{
            color: #fff;
            font-size: 22px;
            width: 100%;
            line-height: 24px;
            // margin-bottom: 10px;
            // text-shadow: 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff;
        }
        
        .left {
            text-align: left;
            padding-left: 40px;
        }
        .right {
            text-align: right;
            padding-right: 40px;
            float: right;
        }
    }
    .more{
        border-bottom: 1px solid #fff;
        position: absolute;
        bottom: 16%;
        left: 37%;
        font-size: 20px;
        color: #fff;
        padding-top: 5px;
    }
    @function px2rem($px) {
        $return: #{($px / 8px / 2)}rem;
    @return $return;
    }
    .wap-button {
        height: px2rem(82px);
        line-height: px2rem(82px);
        width: auto;
        font-size: px2rem(32px);
        text-align: center;
        color: #262222;
        -webkit-border-radius: px2rem(41px);
        -moz-border-radius: px2rem(41px);
        border-radius: px2rem(41px);
        padding: 25px 60px;
    a {
        display: block;
        color: inherit;
        text-decoration: none;
    }
    &.disabled {
         opacity: .5;
     // background: #ccc !important;
     // color: #333 !important;
         pointer-events: none !important;
     }
    }
    .yellow {
        background: #ffb81d;
    }
    }
</style>
<script>
    import {
        router
    } from './index'
    import urlUtil from './utils/url.js'
    import api from './utils/serverapi.js'
    export default {
        components: {
            modal: require('./modal/Modal.vue'),
        },
        props: {
     
        },
        data() {
            return {
                ringList:[{
                    song:'成都',
                    singer:'赵雷',
                    songAndSinger:'成都-赵雷',
                    iconListen:'r/images/open.png',
                    iconListenD:true,
                    iconMusic:'r/images/pause.png',
                    musicSrc:'r/images/m1.mp3',
                    toneId:'9772000020170206415354',
                    vipToneId:'9772000020170206415370'

                },
                {
                    song:'凉凉',
                    singer:'杨宗纬+赵丽颖',
                    songAndSinger:'凉凉-杨宗纬+赵丽颖',
                    iconListen:'r/images/open.png',
                    iconListenD:true,
                    iconMusic:'r/images/pause.png',
                    musicSrc:'r/images/m2.mp3',
                    toneId:'9772000020170119413907',
                    vipToneId:'9772000020170119413908'

                },
                {
                    song:'三生三世',
                    singer:'张杰',
                    songAndSinger:'三生三世-张杰',
                    iconListen:'r/images/open.png',
                    iconListenD:true,
                    iconMusic:'r/images/pause.png',
                    musicSrc:'r/images/m3.mp3',
                     toneId:'9772000020170119413909',
                    vipToneId:'9772000020170119413912'

                },
                {
                    song:'认定',
                    singer:'金志文',
                    songAndSinger:'认定-金志文',
                    iconListen:'r/images/open.png',
                    iconListenD:true,
                    iconMusic:'r/images/pause.png',
                    musicSrc:'r/images/m4.mp3',
                     toneId:'9873400020170119413759',
                    vipToneId:'9873400020170119413769'

                },
                {
                    song:'分我一半的眼泪',
                    singer:'付辛博',
                    songAndSinger:'分我一半的眼泪-付辛博',
                    iconListen:'r/images/open.png',
                    iconListenD:true,
                    iconMusic:'r/images/pause.png',
                    musicSrc:'r/images/m5.mp3',
                     toneId:'9045900020170106412133',
                    vipToneId:'9045900020170106412134'

                }
                ],
                select:{
                    musicSrc:'r/images/m1.mp3',
                },
                buyToneIndex:null,
                buyToneMusic:'',
                buyToneId:'',
                showBuyTone:false,
                showSuccess:false,//订购成功
                showTip3:false,//订购失败
                on:false,//未开通炫铃
                interfacepos:0,//当前尝试接口次数
                interfacecount:3,//总共尝试接口次数
                height: 1008,
                isCheck:true,
            }
        },

        ready() {
            this.$root.musicData.status = 'pause';
            this.$root.$refs.music.sounddisable(true);
            this.$root.musicData.showMusic = false;
            this.height = window.innerHeight;
           
        },

        methods: {
            addOperLog(type,btnName) {
                api.addOperLog(this, {
                    'aid':aid,
                    'type':type,
                    'button_name':btnName,
                    'source':source
                }, (back) => {})
            },
           
            ToggleAudio(index, type){
                var that = this,
                 audio = document.querySelector("#audios");
                 console.log(audio);
                if(type == 'play'){
                    that.addOperLog('button','r-listen'+(index+1));
                    for(var i = 0, len = that.ringList.length; i<len; i++){
                        that.ringList[i].iconListenD = true;
                    }
                    that.ringList[index].iconListenD = false;
                    that.select.musicSrc = that.ringList[index].musicSrc;
                    audio.loop = true;
                    setTimeout(function(){
                        audio.play();
                    },200);
                
                }
                if(type == 'pause'){
                    for(var i = 0, len = that.ringList.length; i<len; i++){
                        that.ringList[i].iconListenD = true;
                    }
                    audio.pause();
                }
                
                
            },

            //设置炫铃
            setMusic(index){
                var that = this;
               // if(index == 0){
                    that.buyToneIndex = index;
                    that.buyToneMusic = that.ringList[index].songAndSinger;
                    if(this.$root.cookieVip == "0000000000"){
                        that.buyToneId = that.ringList[index].vipToneId;
                    }else{
                         that.buyToneId = that.ringList[index].toneId;
                    }
               // }
               // if(index == 1){
               //      that.buyToneIndex = index;
               //      that.buyToneMusic = '倍儿爽（Live版）-大张伟';
               //      if(this.$root.cookieVip == "0000000000"){
               //          that.buyToneId = that.ringList[index].vipToneId;
               //      }else{
               //           that.buyToneId = that.ringList[index].toneId;
               //      }
               // }
               //  if(index == 2){
               //      that.buyToneIndex = index;
               //      that.buyToneMusic = '贺新年-众星';
               //      if(this.$root.cookieVip == "0000000000"){
               //          that.buyToneId = that.ringList[index].vipToneId;
               //      }else{
               //           that.buyToneId = that.ringList[index].toneId;
               //      }
               // }
               //  if(index == 3){
               //      that.buyToneIndex = index;
               //      that.buyToneMusic = '月半小夜曲(Live版) -李易峰';
               //      if(this.$root.cookieVip == "0000000000"){
               //          that.buyToneId = that.ringList[index].vipToneId;
               //      }else{
               //           that.buyToneId = that.ringList[index].toneId;
               //      }
               // }
               // if(index == 4){
               //      that.buyToneIndex = index;
               //      that.buyToneMusic = '祝福(Live版) -杨钰莹';
               //      if(this.$root.cookieVip == "0000000000"){
               //          that.buyToneId = that.ringList[index].vipToneId;
               //      }else{
               //           that.buyToneId = that.ringList[index].toneId;
               //      }
               // }
               if(!that.$root.islogin){
                    that.$root.whereLogin= "r-login";
                    that.$root.login = true;
                }else{
                    that.addOperLog('button','r-set'+(index+1));
                    that.showBuyTone = true;
                }
              
            },
           //确认订购炫铃
            sureBuyLing(){
                var that = this;
                that.addOperLog('button','r-sure');
                that.$dispatch('loading', {
                    name: 'findUserBasInfoMarquee',
                    icon: true,
                    text: '请稍候...',
                    show: true,
                    duration: 30 * 1000
                });
                api.findUserBasInfo(that,{'accessToken':that.$root.accesstoken},(back)=>{
                    that.$dispatch('cancelloading', 'findUserBasInfoMarquee');
                    if(back.resCode=='0'){
                        //订购炫铃能力
                        that.qryUserBasInfo();
                    }else if(back.resCode=='10001'){
                        //订购炫铃
                        that.buyTone();
                    }else{
                        that.$dispatch('handle_server_error', back);
                    }
                })

                
            },
            qryUserBasInfo(){
                var that = this;
                //开通炫铃功能
                that.$dispatch('loading', {
                    name: 'qryUserBasInfoMarquee',
                    icon: true,
                    text: '请稍候...',
                    show: true,
                    duration: 30 * 1000
                });
                that.interfacepos++;
                api.qryUserBasInfo(that,{'accessToken':that.$root.accesstoken},(back)=>{
                    that.$dispatch('cancelloading', 'qryUserBasInfoMarquee');
                    if(back.resCode=='0' || back.resCode=='30001'){
                        that.interfacepos = 0;
                        that.buyTone();
                    }else{
                        if(that.interfacepos<that.interfacecount){
                            setTimeout(that.qryUserBasInfo,1000);
                        }else{
                            // that.$dispatch('handle_server_error', back);
                            sessionStorage.setItem('failResMsg',back.resMsg);
                            that.showBuyTone = false
                            that.$root.vipfail = true;
                            
                        }
                    }

                })
            },
            buyTone(){
                var that = this;
                that.$dispatch('loading', {
                    name: 'buyToneMarquee',
                    icon: true,
                    text: '请稍候...',
                    show: true,
                    duration: 30 * 1000
                });
                var body={
                    accessToken: that.$root.accesstoken,
                    toneID: that.buyToneId ,
                    mobile: localStorage.getItem('LoginMobile'),
                    aid: aid,
                    toneType:1,
                };
                that.interfacepos++;
                api.buyTone(that,body,(back) =>{
                    that.$dispatch('cancelloading', 'buyToneMarquee');
                    if(back.resCode=='0'){
                        that.showSuccess = true;
                        that.showBuyTone = false;
                    } else {
                        if(that.interfacepos<that.interfacecount){
                            setTimeout(that.buyTone,1000);
                        }else{
                            sessionStorage.setItem('failResMsg',back.resMsg);
                            that.showBuyTone = false;
                            that.$root.vipfail = true;
                        }
                    }
                })
            },
            //开通会员
            openvip(){
                this.addOperLog('button','r-openVip');
                if(!this.$root.islogin){
                    this.$root.login = true;
                }
                else{
                    this.$root.vipbenefit = true;
                }
               
            },
            moreMusic(){
                this.addOperLog('button','r-more');
                location.href = 'http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=01000d81593d2bf801593f1bfdf60691&from=singlemessage&isappinstalled=1';
            },  

        }
    }

</script>