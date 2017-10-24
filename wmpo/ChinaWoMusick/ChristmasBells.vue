<template>
    <div class="app-view bells-page" style="background: url('k/images/bells_bg.jpg'); position: relative !important; overflow: hidden; height: 112%;">
        <section class="section-bell">
            <!-- <div class="main-bg">
                <img :src="'k/images/bells_bg.jpg'">
            </div> -->
            <div class="logo">
                <img :src="'k/images/logo.png'">
            </div>
            <div class="top_img" style="text-align: center">
                <img :src="'k/images/top_img.jpg'" alt="头部图片">
            </div>
            <div class="music_content">
                 <div class="row">
                     <div class="musicLogo"></div>
                     <div class="musicText">
                         <p class="top_text">{{song1}}</p>
                         <p class="bottom_text">{{singer1}}</p>
                     </div>
                        <div class="play_or_stop">
                            <img :src="musicBg" alt="" @click="ToggleAudio">
                            <audio id="audioOne" :src="musicSrc"  loop="loop">您的浏览器不支持 audio 标签.</audio>
                        </div>
                        <div class="LY" @click="setMusic(1)"></div>
                 </div>
                <div class="row">
                     <div class="musicLogo"></div>
                     <div class="musicText">
                         <p class="top_text">{{song2}}</p>
                         <p class="bottom_text">{{singer2}}</p>
                     </div>
                        <div class="play_or_stop">
                            <img :src="musicBg1" alt="" @click="ToggleAudio1" >
                            <audio id="audio1" :src="musicSrc1"  loop="loop">您的浏览器不支持 audio 标签.</audio>
                        </div>
                        <div class="LY" @click="setMusic(2)"></div>
                 </div>
                <div class="row">
                     <div class="musicLogo"></div>
                     <div class="musicText">
                         <p class="top_text">{{song3}}</p>
                         <p class="bottom_text">{{singer3}}</p>
                     </div>
                        <div class="play_or_stop">
                            <img :src="musicBg2" alt="" @click="ToggleAudio2">
                            <audio id="audio2" :src="musicSrc2"  loop="loop">您的浏览器不支持 audio 标签.</audio>
                        </div>
                        <div class="LY" @click="setMusic(3)"></div>
                 </div>
                <div class="row">
                     <div class="musicLogo"></div>
                     <div class="musicText">
                         <p class="top_text">{{song4}}</p>
                         <p class="bottom_text">{{singer4}}</p>
                     </div>
                        <div class="play_or_stop">
                            <img :src="musicBg3" alt="" @click="ToggleAudio3">
                            <audio id="audio3" :src="musicSrc3"  loop="loop">您的浏览器不支持 audio 标签.</audio>
                        </div>
                        <div class="LY" @click="setMusic(4)"></div>
                 </div>
                <div class="row" style="border-bottom: none">
                     <div class="musicLogo"></div>
                     <div class="musicText">
                         <p class="top_text">{{song5}}</p>
                         <p class="bottom_text">{{singer5}}</p>
                     </div>
                        <div class="play_or_stop">
                            <img :src="musicBg4" alt="" @click="ToggleAudio4">
                            <audio id="audio4" :src="musicSrc4"  loop="loop">您的浏览器不支持 audio 标签.</audio>
                        </div>
                        <div class="LY" @click="setMusic(5)"></div>
                 </div>
            </div>
            <div class="btn-panel" style="text-align: center;">
                <a class="start-btn" @click="openVipRightNow()">
                    <img :src="'k/images/openVip.png'" style="width: 380px;">
                </a>
            </div>

            <div class="title-panel">
                <p>单首炫铃￥2元/首，订购会员可免费使用</p>
                <p>炫铃功能和不限量更换炫铃，会员资费6元/月。</p>
            </div>
        </section>
        <!--提示开通炫铃弹框-->
        <modal :show.sync="showTip" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
                <img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
                <div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:30px">
                    <p class="offers-title" style="color: #d51816">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">您还没有开通炫铃功能，是否开通？</p>
                        <p class="offers-text">炫铃功能开通资费<span>5元</span></p>
                        <div class="offers-url" style="padding-bottom: 50px">

                        </div>
                        <a class="btn" @click="qryUserBasInfo" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
                    </div>
                    <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showTip = false"><img :src="'k/images/sp-close.png'" /></div>
                </div>

            </div>
        </modal>
        <!--提示确认订购炫铃弹框-->
        <modal :show.sync="showTip1_1" :bg="false" :backdrop="false">
        <div class="prize-over-view" style="position: relative;">
            <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
            <img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
            <div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:30px">
                <p class="offers-title" style="color: #d51816">提示</p>
                <div style="padding-bottom: 30px;">
                    <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否订购此炫铃？</p>
                    <p class="offers-text"><span>{{singer1}}&nbsp;-&nbsp;{{song1}}</span></p>
                    <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                    <div class="offers-url" style="padding-bottom: 50px">

                    </div>
                    <a class="btn" @click="buyXLtrue(1)" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                    <div class="offers-url" style="overflow:hidden;font-size: 24px;border-top:3px solid #ddd">
                        <p style="float: left">1.订购成功,炫铃使用有效期可到"个人中心"查看</p>
                        <p style="float: left">2.目前安徽,福建的4G用户需在会员套餐外另外收</p>
                        <p style="float: left">取炫铃功能费，敬请谅解。</p>
                    </div>
                </div>
                <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showTip1_1 = false"><img :src="'k/images/sp-close.png'" /></div>
            </div>
        </div>
    </modal>
        <modal :show.sync="showTip1_2" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
                <img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
                <div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:30px">
                    <p class="offers-title" style="color: #d51816">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否订购此炫铃？</p>
                        <p class="offers-text"><span>{{singer2}}&nbsp;-&nbsp;{{song2}}</span></p>
                        <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                        <div class="offers-url" style="padding-bottom: 50px">

                        </div>
                        <a class="btn" @click="buyXLtrue(2)" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <div class="offers-url" style="overflow:hidden;font-size: 24px;border-top:3px solid #ddd">
                            <p style="float: left">1.订购成功,炫铃使用有效期可到"个人中心"查看</p>
                            <p style="float: left">2.目前安徽,福建的4G用户需在会员套餐外另外收</p>
                            <p style="float: left">取炫铃功能费，敬请谅解。</p>
                        </div>
                    </div>
                    <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showTip1_2 = false"><img :src="'k/images/sp-close.png'" /></div>
                </div>
            </div>
        </modal>
        <modal :show.sync="showTip1_3" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
                <img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
                <div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:30px">
                    <p class="offers-title" style="color: #d51816">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否订购此炫铃？</p>
                        <p class="offers-text"><span>{{singer3}}&nbsp;-&nbsp;{{song3}}</span></p>
                        <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                        <div class="offers-url" style="padding-bottom: 50px">

                        </div>
                        <a class="btn" @click="buyXLtrue(3)" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <div class="offers-url" style="overflow:hidden;font-size: 24px;border-top:3px solid #ddd">
                            <p style="float: left">1.订购成功,炫铃使用有效期可到"个人中心"查看</p>
                            <p style="float: left">2.目前安徽,福建的4G用户需在会员套餐外另外收</p>
                            <p style="float: left">取炫铃功能费，敬请谅解。</p>
                        </div>
                    </div>
                    <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showTip1_3 = false"><img :src="'k/images/sp-close.png'" /></div>
                </div>
            </div>
        </modal>
        <modal :show.sync="showTip1_4" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
                <img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
                <div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:30px">
                    <p class="offers-title" style="color: #d51816">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否订购此炫铃？</p>
                        <p class="offers-text"><span>{{singer4}}&nbsp;-&nbsp;{{song4}}</span></p>
                        <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                        <div class="offers-url" style="padding-bottom: 50px">

                        </div>
                        <a class="btn" @click="buyXLtrue(4)" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <div class="offers-url" style="overflow:hidden;font-size: 24px;border-top:3px solid #ddd">
                            <p style="float: left">1.订购成功,炫铃使用有效期可到"个人中心"查看</p>
                            <p style="float: left">2.目前安徽,福建的4G用户需在会员套餐外另外收</p>
                            <p style="float: left">取炫铃功能费，敬请谅解。</p>
                        </div>
                    </div>
                    <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showTip1_4 = false"><img :src="'k/images/sp-close.png'" /></div>
                </div>
            </div>
        </modal>
        <modal :show.sync="showTip1_5" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
                <img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
                <div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:30px">
                    <p class="offers-title" style="color: #d51816">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否订购此炫铃？</p>
                        <p class="offers-text"><span>{{singer5}}&nbsp;-&nbsp;{{song5}}</span></p>
                        <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                        <div class="offers-url" style="padding-bottom: 50px">

                        </div>
                        <a class="btn" @click="buyXLtrue(5)" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <div class="offers-url" style="overflow:hidden;font-size: 24px;border-top:3px solid #ddd">
                            <p style="float: left">1.订购成功,炫铃使用有效期可到"个人中心"查看</p>
                            <p style="float: left">2.目前安徽,福建的4G用户需在会员套餐外另外收</p>
                            <p style="float: left">取炫铃功能费，敬请谅解。</p>
                        </div>
                    </div>
                    <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showTip1_5 = false"><img :src="'k/images/sp-close.png'" /></div>
                </div>
            </div>
        </modal>
        <!--订购成功-->
        <modal :show.sync="showTip2" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
                <img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
                <div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:30px">
                    <p class="offers-title" style="color: #d51816">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px;font-size: 65px;
    font-weight: 700;">订购成功!</p>
                        <p class="offers-text"><span style="font-size: 25px;">（登录沃音乐官网"个人中心"可设置炫铃哦）</span></p>
                        <div class="offers-url" style="padding-bottom: 50px">

                        </div>
                        <a class="btn" @click="showTip2 = false" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
                    </div>
                    <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showTip2 = false"><img :src="'k/images/sp-close.png'" /></div>
                </div>

            </div>
        </modal>
        <!--订购失败-->
        <modal :show.sync="showTip3" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
                <img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
                <div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:30px">
                <div class="content-title content-title4">
                    <p style="color: #e73433;font-size: 60px; font-weight: 600; line-height: 70px;">订购失败</p>
                </div>
                    <div style="overflow: hidden">
                <div style="padding: 50px 0;float: left">
                    <p class="offers-text" style="font-size: 45px;margin-bottom: 10px">请重试</p>
                    <p class="offers-text" style="margin-bottom: 10px">(如重试后订购失败，</p>
                    <p class="offers-text" style="margin-bottom: 10px">可关注沃音乐微信</p>
                    <p class="offers-text" style="color: #e43639;margin-bottom: 10px">womusic999留言，</p>
                    <p class="offers-text">联系小沃查询异常哦)</p>
                </div>
                    <img style="vertical-align: middle;float: right;margin-top: 80px" :src="'./k/images/lele.png'" alt="">
                    </div>
                <a class="btn" @click="showTip3 = false" style="margin-top: 0;background: url('./k/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
                <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showTip3 = false"><img :src="'k/images/sp-close.png'" /></div>
            </div>
            </div>
        </modal>

    </div>

</template>

<style lang="sass">

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
        // position: absolute;
        // top: 18%;
        margin-top: 20px;
        width: 90%;
        margin-left:5%;
        z-index:99;
        background-color:#fff;
        .row{
            width:90%;
            margin:0 auto;
            overflow:hidden;
            border-bottom: 2px dashed #18725a;
            .musicLogo{
                background: url("images/music.png")no-repeat;
                background-size: 70px;
                width: 15%;
                height: 70px;
                margin-top: 15px;
                float: left;
                background-position: center;
                border-right: 2px solid #18725a;
            }
            .musicText{
                width: 55%;
                height: 100px;
                float: left;
                p{
                    color: #18725a;
                }
                    .top_text{
                        font-size: 30px;
                        height: 50px;
                        line-height: 65px;
                        text-align: left;
                        margin-left: 15px;
                    }
                    .bottom_text{
                        height: 50px;
                        line-height: 40px;
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
                background: url("images/LY.png")no-repeat;
                background-size: 40px;
                background-position: center;
                width: 10%;
                height: 100px;
                float: left;
            }
        }
    }

    .btn-panel {
        // position: absolute;
        // top: 86%;
        margin-top: 20px;
        width: 100%;
        z-index:99;
    a {
        font-size: 36.7px;
        display: block;
        width: 380px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-repeat: no-repeat;
        display: inline-block;
        color: #000;
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
        padding: 0 37px;
        text-align: left;
        // font-size: 0;
    p{
        color: #e43639;
        font-size: 30px;
        width: 100%;
        margin-bottom: 10px;
        text-shadow: 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff;
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
    import sapi from './utils/serverapi.js'
    export default {
        components: {
            modal: require('./modal/Modal.vue'),
        },
        props: {
            musicBg: {
                type: String,
                default: 'k/images/listen.png'
            },
            musicBg1: {
                type: String,
                default: 'k/images/listen.png'
            },
            musicBg2: {
                type: String,
                default: 'k/images/listen.png'
            },
            musicBg3: {
                type: String,
                default: 'k/images/listen.png'
            },
            musicBg4: {
                type: String,
                default: 'k/images/listen.png'
            },

            musicSrc: {
                type: String,
                default: 'k/images/1.mp3'
            },
            musicSrc1: {
                type: String,
                default: 'k/images/2.mp3'
            },
            musicSrc2: {
                type: String,
                default: 'k/images/3.mp3'
            },
            musicSrc3: {
                type: String,
                default: 'k/images/4.mp3'
            },
            musicSrc4: {
                type: String,
                default: 'k/images/5.mp3'
            },

            musicStatus: {
                type: String,
                default: 'pause'
            }
        },
        data() {
            return {
                song1:'圣诞结',
                singer1:'陈奕迅',
                song2:'圣诞快乐',
                singer2:'张凯麟',
                song3:'爱情废柴',
                singer3:'周杰伦',
                song4:'圣诞分手节',
                singer4:'吴克羣',
                song5:'Christmas with you',
                singer5:'Se7en',
                showTip:false,//提示开通炫铃弹框
                showTip1_1:false,//提示确认订购炫铃弹框1
                showTip1_2:false,//提示确认订购炫铃弹框2
                showTip1_3:false,//提示确认订购炫铃弹框3
                showTip1_4:false,//提示确认订购炫铃弹框4
                showTip1_5:false,//提示确认订购炫铃弹框5
                showTip2:false,//订购成功
                showTip3:false,//订购失败
                on:false,//未开通炫铃
            }
        },

        ready() {
            console.log('是否开通vip',this.$root.cookieVip);
            this.accesstoken = getCookie('cn.easier.wmpo.tone.accesstoken');
            this.haveYesOrNo();
            this.$root.$refs.music.sounddisable(true);
            this.$root.musicData.showMusic = false;
        },

        methods: {
            addOperLog(type,btnName) {
                sapi.addOperLog(this, {
                    'aid':aid,
                    'type':type,
                    'button_name':btnName,
                    'source':source
                }, (back) => {})
            },
//            是否开通炫铃功能
            haveYesOrNo(){
                var body={
//                    accessToken: this.$root.accesstoken,
                    accessToken: this.accesstoken,
                };
                sapi.qryUserBasInfo(this,body,(back) => {
                    if (back.resCode == 30001 || back.resCode == '30001') {
                        var back = back.resMsg;
                        this.on = true;
                        this.$dispatch('loading', {text: '您已经开通炫铃功能,赶紧订购炫铃吧', show: true, duration: 1000});
                    }
                })
            },
//            开通炫铃功能
            qryUserBasInfo(){
                var body={
//                    accessToken: this.$root.accesstoken,
                    accessToken: this.accesstoken,
                };
                sapi.qryUserBasInfo(this,body,(back) =>{
                    if(back.resCode == '0'|| back.resCode == 0){
                        this.showTip = false;
                        this.$dispatch('loading', {text: '炫铃功能开通成功！耶', show: true, duration: 1000});
                    }
                    else if(back.resCode == 30001 || back.resCode == '30001' ){
                        var back=back.resMsg;
                        this.on=true;
                        this.$dispatch('loading', {text: back, show: true, duration: 1000});
                    }
                    else{
                        var back1=back.resMsg;
                        this.$dispatch('loading', {text: back1, show: true, duration: 1000});
                    }
                })
            },
//            设置炫铃
            setMusic(type){
                if (type == 1) {
                    if (!this.$root.islogin) {
                        this.$root.login = true;
                    }
                    else if (this.$root.islogin && this.$root.cookieVip == "0000000000") {
                        this.showTip1_1 = true;
                    }
                    else if (this.$root.islogin && this.on == false) {
                        this.showTip = true;
                    }
                    else if (this.$root.islogin && this.on == true) {
                        this.showTip1_1 = true;
                    }
                }
                if (type == 2) {
                    if (!this.$root.islogin) {
                        this.$root.login = true;
                    }
                    else if (this.$root.islogin && this.$root.cookieVip == "0000000000") {
                        this.showTip1_2 = true;
                    }
                    else if (this.$root.islogin && this.on == false) {
                        this.showTip = true;
                    }
                    else if (this.$root.islogin && this.on == true) {
                        this.showTip1_2 = true;
                    }
                }
                if (type == 3) {
                    if (!this.$root.islogin) {
                        this.$root.login = true;
                    }
                    else if (this.$root.islogin && this.$root.cookieVip == "0000000000") {
                        this.showTip1_3 = true;
                    }
                    else if (this.$root.islogin && this.on == false) {
                        this.showTip = true;
                    }
                    else if (this.$root.islogin && this.on == true) {
                        this.showTip1_3 = true;
                    }
                }
                if (type == 4) {
                    if (!this.$root.islogin) {
                        this.$root.login = true;
                    }
                    else if (this.$root.islogin && this.$root.cookieVip == "0000000000") {
                        this.showTip1_4 = true;
                    }
                    else if (this.$root.islogin && this.on == false) {
                        this.showTip = true;
                    }
                    else if (this.$root.islogin && this.on == true) {
                        this.showTip1_4 = true;
                    }
                }
                if (type == 5) {
                    if (!this.$root.islogin) {
                        this.$root.login = true;
                    }
                    else if (this.$root.islogin && this.$root.cookieVip == "0000000000") {
                        this.showTip1_5 = true;
                    }
                    else if (this.$root.islogin && this.on == false) {
                        this.showTip = true;
                    }
                    else if (this.$root.islogin && this.on == true) {
                        this.showTip1_5 = true;
                    }
                }

            },
//            确认订购炫铃
            buyXLtrue(number){
                if(this.$root.cookieVip != "0000000000") {
                    if (number == 1) {
                        var body = {
//                    accessToken: this.$root.accesstoken,
                            accessToken: this.accesstoken,
                            toneID: '9070700020140808135495',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                        };
                    }
                    else if(number == 2){
                        var body = {
//                    accessToken: this.$root.accesstoken,
                            accessToken: this.accesstoken,
                            toneID: '9164500020161102403005',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                        };
                    }
                    else if(number == 3){
                        var body = {
//                    accessToken: this.$root.accesstoken,
                            accessToken: this.accesstoken,
                            toneID: '9090700020160627371715',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                        };
                    }
                    else if(number == 4){
                        var body = {
//                    accessToken: this.$root.accesstoken,
                            accessToken: this.accesstoken,
                            toneID: '9018100020090429000297',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                        };
                    }
                    else if(number == 5){
                        var body = {
//                    accessToken: this.$root.accesstoken,
                            accessToken: this.accesstoken,
                            toneID: '9067500020161123406468',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                        };
                    }

                }
                else if(this.$root.cookieVip == "0000000000"){
                    if (number == 1) {
                        var body = {
//                    accessToken: this.$root.accesstoken,
                            accessToken: this.accesstoken,
                            toneID: '9070700020150811238310',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                        };
                    }
                    else if(number == 2){
                        var body = {
//                    accessToken: this.$root.accesstoken,
                            accessToken: this.accesstoken,
                            toneID: '9164500020161102402904',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                        };
                    }
                    else if(number == 3){
                        var body = {
//                    accessToken: this.$root.accesstoken,
                            accessToken: this.accesstoken,
                            toneID: '9090700020160627371706',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                        };
                    }
                    else if(number == 4){
                        var body = {
//                    accessToken: this.$root.accesstoken,
                            accessToken: this.accesstoken,
                            toneID: '9018100020150811249835',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                        };
                    }
                    else if(number == 5){
                        var body = {
//                    accessToken: this.$root.accesstoken,
                            accessToken: this.accesstoken,
                            toneID: '9067500020161123406721',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                        };
                    }
                }
                console.log('type:',body.toneType);
                sapi.buyTone(this,body,(back) =>{
                    if(back.resCode == 0 || back.resCode == "0"){
                        this.showTip2 = true;

                    }else {
                        this.$dispatch('handle_server_error', back);
                        this.showTip3 = true;
                    }
                })
            },

//            开通会员
            openVipRightNow(){
                this.addOperLog('button','openMusicVIP');
                if(!this.$root.islogin){
                    this.$root.login = true;
                }
                else if(this.$root.islogin && this.$root.cookieVip != "0000000000"){
                    this.$root.openvip = true;
                }
                else if(this.$root.islogin && this.$root.cookieVip == "0000000000"){
                    this.$dispatch('loading', {text: '您已开通会员无需再开通！', show: true, duration: 1000});
                }
            },
//            开启或关闭试听
            ToggleAudio() {
                var audio = document.querySelector("#audioOne");
                var audio1 = document.querySelector("#audio1");
                var audio2 = document.querySelector("#audio2");
                var audio3 = document.querySelector("#audio3");
                var audio4 = document.querySelector("#audio4");
                if(audio.paused){
                    this.musicBg = 'k/images/stop.png';
                    this.musicBg1 = 'k/images/listen.png';
                    this.musicBg2 = 'k/images/listen.png';
                    this.musicBg3 = 'k/images/listen.png';
                    this.musicBg4 = 'k/images/listen.png';
                    this.musicStatus = 'play';
                    audio.loop = true;
                    audio.play();
                    audio1.pause();
                    audio2.pause();
                    audio3.pause();
                    audio4.pause();
                }
                else{
                    this.musicBg = 'k/images/listen.png';
                    this.musicStatus = 'pause';
                    audio.pause();
                }
            },
            ToggleAudio1() {
                var audio = document.querySelector("#audioOne");
                var audio1 = document.querySelector("#audio1");
                var audio2 = document.querySelector("#audio2");
                var audio3 = document.querySelector("#audio3");
                var audio4 = document.querySelector("#audio4");
                if(audio1.paused){
                    this.musicBg1 = 'k/images/stop.png';
                    this.musicBg = 'k/images/listen.png';
                    this.musicBg2 = 'k/images/listen.png';
                    this.musicBg3 = 'k/images/listen.png';
                    this.musicBg4 = 'k/images/listen.png';
                    this.musicStatus = 'play';
                    audio1.loop = true;
                    audio1.play();
                    audio.pause();
                    audio2.pause();
                    audio3.pause();
                    audio4.pause();

                }else{
                    this.musicBg1 = 'k/images/listen.png';
                    this.musicStatus = 'pause';
                    audio1.pause();

                }
            },
            ToggleAudio2() {
                var audio = document.querySelector("#audioOne");
                var audio1 = document.querySelector("#audio1");
                var audio2 = document.querySelector("#audio2");
                var audio3 = document.querySelector("#audio3");
                var audio4 = document.querySelector("#audio4");
                if(audio2.paused){
                    this.musicBg2 = 'k/images/stop.png';
                    this.musicBg1 = 'k/images/listen.png';
                    this.musicBg = 'k/images/listen.png';
                    this.musicBg3 = 'k/images/listen.png';
                    this.musicBg4 = 'k/images/listen.png';
                    this.musicStatus = 'play';
                    audio2.loop = true;
                    audio2.play();
                    audio1.pause();
                    audio.pause();
                    audio3.pause();
                    audio4.pause();

                }else{
                    this.musicBg2 = 'k/images/listen.png';
                    this.musicStatus = 'pause';
                    audio2.pause();

                }
            },
            ToggleAudio3() {
                var audio = document.querySelector("#audioOne");
                var audio1 = document.querySelector("#audio1");
                var audio2 = document.querySelector("#audio2");
                var audio3 = document.querySelector("#audio3");
                var audio4 = document.querySelector("#audio4");

                if(audio3.paused){
                    this.musicBg3 = 'k/images/stop.png';
                    this.musicBg1 = 'k/images/listen.png';
                    this.musicBg2 = 'k/images/listen.png';
                    this.musicBg = 'k/images/listen.png';
                    this.musicBg4 = 'k/images/listen.png';
                    this.musicStatus = 'play';
                    audio3.loop = true;
                    audio3.play();
                    audio1.pause();
                    audio.pause();
                    audio2.pause();
                    audio4.pause();

                }else{
                    this.musicBg3 = 'k/images/listen.png';
                    this.musicStatus = 'pause';
                    audio3.pause();

                }
            },
            ToggleAudio4() {
                var audio = document.querySelector("#audioOne");
                var audio1 = document.querySelector("#audio1");
                var audio2 = document.querySelector("#audio2");
                var audio3 = document.querySelector("#audio3");
                var audio4 = document.querySelector("#audio4");

                if(audio4.paused){
                    this.musicBg4 = 'k/images/stop.png';
                    this.musicBg1 = 'k/images/listen.png';
                    this.musicBg2 = 'k/images/listen.png';
                    this.musicBg3 = 'k/images/listen.png';
                    this.musicBg = 'k/images/listen.png';
                    this.musicStatus = 'play';
                    audio4.loop = true;
                    audio4.play();
                    audio1.pause();
                    audio.pause();
                    audio2.pause();
                    audio3.pause();

                }else{
                    this.musicBg4 = 'k/images/listen.png';
                    this.musicStatus = 'pause';
                    audio4.pause();

                }
            },
            getCookie(name){
                var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                if(arr=document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            }

        }
    }
    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
</script>