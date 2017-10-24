<template>
    <div class="app-view bells-page">
        <section class="section-bell" :style="{'height':height+'px'}">
            <div class="main-bg">
                <img :src="'o/images/game-bg.jpg'" :style="{'height':height+'px'}">
            </div>
            <div class="logo">
                <img :src="'k/images/logo.png'">
            </div>
             <div class="music_content">
                <div class="title">新春炫铃</div>
                 <div class="row" v-for="(index,item) in ringList">
                     <div class="musicLogo" style="background: url('./o/images/m.png') center center no-repeat;"></div>
                     <div class="musicText">
                         <p class="top_text">{{item.song}}</p>
                         <p class="bottom_text">{{item.singer}}</p>
                     </div>
                        <div class="play_or_stop">
                            <img :src="item.iconListen" alt="" @click="ToggleAudio(index,'play')" :class="{display:!item.iconListenD,}">
                            <img :src="item.iconMusic" alt="" @click="ToggleAudio(index,'pause')" :class="{display:item.iconListenD,}">
                            
                        </div>
                        <div class="LY" style="background: url('./o/images/ling.png') center center no-repeat;" @click="setMusic(index)"></div>
                 </div>
                <audio id="audios" :src="select.musicSrc"  loop="loop">您的浏览器不支持 audio 标签.</audio>
                <div class="title-panel">
                    <p>单首炫铃￥2元/首，订购会员可免费使用炫铃功能和不限量更换炫铃，会员资费￥6元/月。 </p>
                    <p class="more" @click="moreMusic">查看更多精彩铃音>></p>
                </div>
            </div>

            <div class="btn-panel" v-if="$root.cookieVip != '0000000000'" style="text-align: center;">
                 <a class="btn" @click="openvip"  style="margin-top: 0;background: url('./o/images/btn-bg.png') center center no-repeat; margin-left: 15px;">开通会员</a>
            </div>

            
        </section>
    
        <!--提示确认订购炫铃弹框-->
        <modal :show.sync="showBuyTone" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <div class="box text-center" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #f62a32; border-radius: 20px;">
                   <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否确认订购此炫铃？</p>
                        <p class="offers-text">{{buyToneMusic}}</p>
                        <p class="offers-text" style="margin-top: 30px"><span>资费：2元/首 (沃音乐会员免费)</span></p>
                        <img style="padding: 20px;" :src="'o/images/agree.png'" />
                        <a class="confirm-btn" @click="sureBuyLing()" style="margin-top: 0;background: url('./o/images/btn-bg.png') center center no-repeat; margin-left: 25%;">确定</a>
                        <div class="offers-url" style="overflow:hidden;font-size: 24px;border-top:3px solid #ddd; text-align: left; line-height: 40px; color: #8f1225;">
                            <p style="float: left">1、订购成功后，炫铃使用有效期可到沃音乐官网“个人中心”查看。</p>
                            <p> 2、4G用户免费开通，除广东、上海、吉林、甘肃以外的2/3G非炫铃功能用户，订购炫铃后将默认开通此功能，资费5元/月。</p>
                           
                        </div>
                    </div>
                    <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showBuyTone = false"><img :src="'o/images/close.png'" /></div>
                    <img class="bottom" :src="'o/images/wen-bottom1.png'" />
                </div>
            </div>
        </modal>
       <!--订购成功-->
        <modal :show.sync="showSuccess" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
               <div class="box text-center" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #f62a32; border-radius: 20px;">
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px;font-size: 65px;
    font-weight: 700;">订购成功!</p>
                        <p class="offers-text">歌曲已设置为默认炫铃，可登录沃音乐官网“个人中心”查看或更换</p>
                        <div class="offers-url" style="padding-bottom: 50px">

                        </div>
                        <a class="confirm-btn" @click="showSuccess = false" style="margin-top: 0;background: url('./o/images/btn-bg.png') center center no-repeat; margin-left: 25%;">确定</a>
                    </div>
                    <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showSuccess = false"><img :src="'o/images/close.png'" /></div>
                </div>

            </div>
        </modal>
    </div>

</template>

<style lang="sass">
    .display{
        display: none;
    }
   .prize-over-view{
        .box{
            color:#8f1225;
            .offers-text{
                color:#8f1225;
                span{
                    color:#636161;
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
        top: 8%;
        height: 74%;
        margin-top: 20px;
        width: 90%;
        margin-left:5%;
        z-index:99;
        background-color:rgba(255,248,238,.6);
        border-radius: 10px;
        border: 2px solid #b04f4b;
        color: #8f1225;
        .title{
            font-size: 45px;
            text-align: center;
            padding: 2%;
            color: #8f1225;

        }
        .row{
            width:90%;
            margin:0 5%;
            height: 13%;
            overflow:hidden;
            border-bottom: 2px dashed #b45e6c;

            .musicLogo{
                // background: url("images/music.png")no-repeat;
                background-size: 70px;
                width: 77px;
                height: 58px;
                margin-top: 3%;
                float: left;
                background-position: center;
                border-right: 2px solid #a33a4a;
            }
            .musicText{
                width: 55%;
                height: 100%;
                padding: 2% 0;
                line-height: 117%;
                float: left;
                p{
                    color: #8f1225;
                }
                    .top_text{
                        font-size: 30px;
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
                    width: 45%;
                    height: 45%;
                }
                /*background: url("images/listen.png")no-repeat;*/
                /*background-size: 40px;*/
                /*background-position: center;*/
                width: 20%;
                float: left;
                height: 100px;
                line-height: 125px;
                text-align: center;
            }
            .LY{
                // background: url("images/LY.png")no-repeat;
                background-size: 40px;
                background-position: center;
                width: 10%;
                height: 100px;
                float: left;
            }
        }
    }

    .btn-panel {
        position: absolute;
        top: 83%;
        margin-top: 20px;
        width: 100%;
        z-index:99;
    a {
        font-size: 36.7px;
        display: block;
        width: 235px;
        height: 90px;
        line-height: 90px;
        text-align: center;
        background-repeat: no-repeat;
        display: inline-block;
        color: #8f1225;
        text-decoration:none;
    }
    }
    .top_img{
        width: 100%;
        padding-top: 100px;
        z-index: 99;
    }
    .title-panel {
        // position: absolute;
        // top: 78%;
    // text-align: center;
        // margin-top: 20px;
        width: 100%;
        padding: 0 5%;
        text-align: left;
        // font-size: 0;
        p{
            color: #8f1225;
            font-size: 28px;
            width: 100%;
            line-height: 30px;
            // margin-bottom: 10px;
            // text-shadow: 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff;
        }
        .more{
            border-bottom: 1px solid #f22847;
            color: #f22847;
            font-size: 26px;
            text-align: center;
            width: 56%;
            margin-left: 22%;
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
                    song:'YES I DO',
                    singer:'陈乔恩',
                    iconListen:'o/images/open.png',
                    iconListenD:true,
                    iconMusic:'o/images/pause.png',
                    musicSrc:'o/images/m1.mp3',
                    toneId:'9772000020161223410878',
                    vipToneId:'9772000020161223410884'

                },
                {
                    song:'不想上班',
                    singer:'肖央',
                    iconListen:'o/images/open.png',
                    iconListenD:true,
                    iconMusic:'o/images/pause.png',
                    musicSrc:'o/images/m2.mp3',
                    toneId:'9045900020161228411000',
                    vipToneId:'9045900020161228411001'

                },
                {
                    song:'团员饭',
                    singer:'群星',
                    iconListen:'o/images/open.png',
                    iconListenD:true,
                    iconMusic:'o/images/pause.png',
                    musicSrc:'o/images/m3.mp3',
                     toneId:'9070700020161226410985',
                    vipToneId:'9070700020161226410986'

                },
                {
                    song:'中国味道',
                    singer:'凤凰传奇',
                    iconListen:'o/images/open.png',
                    iconListenD:true,
                    iconMusic:'o/images/pause.png',
                    musicSrc:'o/images/m4.mp3',
                     toneId:'9046200020121227541648',
                    vipToneId:'9046200020150811246727'

                },
                {
                    song:'桃花朵朵开',
                    singer:'阿牛',
                    iconListen:'o/images/open.png',
                    iconListenD:true,
                    iconMusic:'o/images/pause.png',
                    musicSrc:'o/images/m5.mp3',
                     toneId:'9194000020130122583199',
                    vipToneId:'9194000020150811226781'

                }
                ],
                select:{
                    musicSrc:'k/images/1.mp3',
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
            }
        },

        ready() {
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
               if(index == 0){
                    that.buyToneIndex = index;
                    that.buyToneMusic = 'YES I DO --陈乔恩';
                    if(this.$root.cookieVip == "0000000000"){
                        that.buyToneId = that.ringList[index].vipToneId;
                    }else{
                         that.buyToneId = that.ringList[index].toneId;
                    }
               }
               if(index == 1){
                    that.buyToneIndex = index;
                    that.buyToneMusic = '不想上班--肖央';
                    if(this.$root.cookieVip == "0000000000"){
                        that.buyToneId = that.ringList[index].vipToneId;
                    }else{
                         that.buyToneId = that.ringList[index].toneId;
                    }
               }
                if(index == 2){
                    that.buyToneIndex = index;
                    that.buyToneMusic = '团员饭--群星';
                    if(this.$root.cookieVip == "0000000000"){
                        that.buyToneId = that.ringList[index].vipToneId;
                    }else{
                         that.buyToneId = that.ringList[index].toneId;
                    }
               }
                if(index == 3){
                    that.buyToneIndex = index;
                    that.buyToneMusic = '中国味道--凤凰传奇';
                    if(this.$root.cookieVip == "0000000000"){
                        that.buyToneId = that.ringList[index].vipToneId;
                    }else{
                         that.buyToneId = that.ringList[index].toneId;
                    }
               }
               if(index == 4){
                    that.buyToneIndex = index;
                    that.buyToneMusic = '桃花朵朵开--阿牛';
                    if(this.$root.cookieVip == "0000000000"){
                        that.buyToneId = that.ringList[index].vipToneId;
                    }else{
                         that.buyToneId = that.ringList[index].toneId;
                    }
               }
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
                    mobile: sessionStorage.getItem('LoginMobile'),
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