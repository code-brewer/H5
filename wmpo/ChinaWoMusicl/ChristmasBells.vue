<template>
    <div class="app-view bells-page" style="background: url('l/images/bells_bg.jpg')no-repeat; position: relative !important; overflow: hidden; height: 106%;">
        <section class="section-bell">
            <!-- <div class="main-bg">
                <img :src="'l/images/bells_bg.jpg'">
            </div> -->
            <div class="logo">
                <img :src="'l/images/logo.png'">
            </div>
            <div class="top_img" style="text-align: center">
                <img :src="'l/images/top_img.png'" alt="头部图片">
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
                        <div class="LY" @click="setMusic(1)"><img :src="'l/images/LY.png'" alt=""></div>
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
                        <div class="LY" @click="setMusic(2)"><img :src="'l/images/LY.png'" alt=""></div>
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
                        <div class="LY" @click="setMusic(3)"><img :src="'l/images/LY.png'" alt=""></div>
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
                        <div class="LY" @click="setMusic(4)"><img :src="'l/images/LY.png'" alt=""></div>
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
                        <div class="LY" @click="setMusic(5)"><img :src="'l/images/LY.png'" alt=""></div>
                 </div>
            </div>
            <div class="btn-panel" style="text-align: center;">
                <a class="start-btn" style="width:280px" @click="openVipRightNow()">
                    <img :src="'l/images/trueVip.png'" v-if="this.$root.islogin && this.$root.cookieVip == '0000000000'" style="width: 270px;">
                    <img :src="'l/images/openVip.png'" v-else style="width: 270px;">
                </a>
            </div>

            <div class="title-panel">
                <p>单首炫铃￥2元/首，订购会员可免费使用</p>
                <p>炫铃功能和不限量更换炫铃，会员资费6元/月。</p>
            </div>
        </section>
        <!--提示开通炫铃弹框-->
        <!--<modal :show.sync="showTip" :bg="false" :backdrop="false">-->
            <!--<div class="prize-over-view" style="position: relative;">-->
                <!--<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left" style=" position: absolute;left: -4%;top: 81%;z-index: 100;">-->
                <!--<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right" style="position: absolute;right: -6%;top: 64%;z-index: 100;">-->
                <!--<div class="box" style="background: #fff;border-radius:30px;border: 8px solid #f7af49;">-->
                    <!--<p class="offers-title" style="color: #aa3b2d">提示</p>-->
                    <!--<div style="padding-bottom: 30px;">-->
                        <!--<p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">您还没有开通炫铃功能，是否开通？</p>-->
                        <!--<p class="offers-text">炫铃功能开通资费<span>5元</span></p>-->
                        <!--<div class="offers-url" style="padding-bottom: 50px">-->

                        <!--</div>-->
                        <!--<a class="btn" @click="qryUserBasInfo" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>-->
                    <!--</div>-->
                    <!--<div class="btn-close" style="position: absolute; top: -40px; right: -20px;"  @click="showTip = false"><img :src="'l/images/sp-close.png'" /></div>-->
                <!--</div>-->

            <!--</div>-->
        <!--</modal>-->
        <!--提示确认订购炫铃弹框-->
        <modal :show.sync="showTip1_1" :bg="false" :backdrop="false">
        <div class="prize-over-view" style="position: relative;">
            <img :src="$root.activityBasePath+'/images/modal-l.png'" style="position: absolute;left: -3%;top: 89%;z-index: 100;transform: rotate(-17deg);">
            <img :src="$root.activityBasePath+'/images/gg.png'" style="position: absolute;width: 20%;z-index: 100;top: 90%;left: 87%;transform: rotate(81deg);">
            <div class="box" style="background: #fff;border-radius:30px;border: 8px solid #f7af49;">
                <p class="offers-title" style="color: #f7af49">提示</p>
                <div style="padding-bottom: 30px;">
                    <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否订购此炫铃？</p>
                    <p class="offers-text"><span style="color:#aa3b2d">{{singer1}}&nbsp;-&nbsp;{{song1}}</span></p>
                    <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                    <div v-if="this.on==false" style="width:60%;height: 54px;margin: 60px auto 10px auto;">
                        <p  style="float:left;width:17%;height:50px;border: 3px solid #a72531;"><img :src="img"></p>
                        <p style="height: 52px;font-size: 27px;line-height: 55px;padding-left: 60px;color: #a72531">*同意开通炫铃功能</p>
                    </div>
                    <div v-else class="offers-url" style="padding-bottom: 20px">
                    </div>
                    <a v-if="this.on==false" class="btn" @click="btnclick(1)" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                    <a v-else class="btn" @click="buyXLtrue(1)" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                    <div class="offers-url" style="color:#aa3b2d;overflow:hidden;font-size: 24px;border-top:3px solid #ddd">
                        <p style="float: left">1.订购成功,炫铃使用有效期可到"个人中心"查看</p>
                        <p style="float: left">2.目前安徽,福建的4G用户需在会员套餐外另外收</p>
                        <p style="float: left">取炫铃功能费，敬请谅解。</p>
                        <p style="float: left">3.未开通炫铃的用户,订购炫铃后将默认开通此功</p>
                        <p style="float: left">能，资费5元/月。</p>
                    </div>
                </div>
                <div class="btn-close" style="position: absolute; top: -35px; right: -20px;"  @click="showTip1_1 = false"><img :src="'l/images/sp-close.png'" /></div>
            </div>
        </div>
    </modal>
        <modal :show.sync="showTip1_2" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" style="position: absolute;left: -3%;top: 89%;z-index: 100;transform: rotate(-17deg);">
                <img :src="$root.activityBasePath+'/images/gg.png'" style="position: absolute;width: 20%;z-index: 100;top: 90%;left: 87%;transform: rotate(81deg);">
                <div class="box" style="background: #fff;border-radius:30px;border: 8px solid #f7af49;">
                    <p class="offers-title" style="color: #f7af49">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否订购此炫铃？</p>
                        <p class="offers-text"><span style="color:#aa3b2d">{{singer2}}&nbsp;-&nbsp;{{song2}}</span></p>
                        <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                        <div v-if="this.on==false" style="width:60%;height: 54px;margin: 60px auto 10px auto;">
                            <p style="float:left;width:17%;height:50px;border: 3px solid #a72531;"><img :src="img"></p>
                            <p style="height: 52px;font-size: 27px;line-height: 55px;padding-left: 60px;color: #a72531">*同意开通炫铃功能</p>
                        </div>
                        <div v-else class="offers-url" style="padding-bottom: 20px">
                        </div>
                        <a v-if="this.on==false" class="btn" @click="btnclick(2)" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <a v-else class="btn" @click="buyXLtrue(2)" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <div class="offers-url" style="color:#aa3b2d;overflow:hidden;font-size: 24px;border-top:3px solid #ddd">
                            <p style="float: left">1.订购成功,炫铃使用有效期可到"个人中心"查看</p>
                            <p style="float: left">2.目前安徽,福建的4G用户需在会员套餐外另外收</p>
                            <p style="float: left">取炫铃功能费，敬请谅解。</p>
                            <p style="float: left">3.未开通炫铃的用户,订购炫铃后将默认开通此功</p>
                            <p style="float: left">能，资费5元/月。</p>
                        </div>
                    </div>
                    <div class="btn-close" style="position: absolute; top: -35px; right: -20px;"  @click="showTip1_2 = false"><img :src="'l/images/sp-close.png'" /></div>
                </div>
            </div>
        </modal>
        <modal :show.sync="showTip1_3" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" style="position: absolute;left: -3%;top: 89%;z-index: 100;transform: rotate(-17deg);">
                <img :src="$root.activityBasePath+'/images/gg.png'" style="position: absolute;width: 20%;z-index: 100;top: 90%;left: 87%;transform: rotate(81deg);">
                <div class="box" style="background: #fff;border-radius:30px;border: 8px solid #f7af49;">
                    <p class="offers-title" style="color: #f7af49">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否订购此炫铃？</p>
                        <p class="offers-text"><span style="color:#aa3b2d">{{singer3}}&nbsp;-&nbsp;{{song3}}</span></p>
                        <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                        <div v-if="this.on==false" style="width:60%;height: 54px;margin: 60px auto 10px auto;">
                            <p style="float:left;width:17%;height:50px;border: 3px solid #a72531;"><img :src="img"></p>
                            <p style="height: 52px;font-size: 27px;line-height: 55px;padding-left: 60px;color: #a72531">*同意开通炫铃功能</p>
                        </div>
                        <div v-else class="offers-url" style="padding-bottom: 20px">
                        </div>
                        <a v-if="this.on==false" class="btn" @click="btnclick(3)" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <a v-else class="btn" @click="buyXLtrue(3)" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <div class="offers-url" style="color:#aa3b2d;overflow:hidden;font-size: 24px;border-top:3px solid #ddd">
                            <p style="float: left">1.订购成功,炫铃使用有效期可到"个人中心"查看</p>
                            <p style="float: left">2.目前安徽,福建的4G用户需在会员套餐外另外收</p>
                            <p style="float: left">取炫铃功能费，敬请谅解。</p>
                            <p style="float: left">3.未开通炫铃的用户,订购炫铃后将默认开通此功</p>
                            <p style="float: left">能，资费5元/月。</p>
                        </div>
                    </div>
                    <div class="btn-close" style="position: absolute; top: -35px; right: -20px;"  @click="showTip1_3 = false"><img :src="'l/images/sp-close.png'" /></div>
                </div>
            </div>
        </modal>
        <modal :show.sync="showTip1_4" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" style="position: absolute;left: -3%;top: 89%;z-index: 100;transform: rotate(-17deg);">
                <img :src="$root.activityBasePath+'/images/gg.png'" style="position: absolute;width: 20%;z-index: 100;top: 90%;left: 87%;transform: rotate(81deg);">
                <div class="box" style="background: #fff;border-radius:30px;border: 8px solid #f7af49;">
                    <p class="offers-title" style="color: #f7af49">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否订购此炫铃？</p>
                        <p class="offers-text"><span style="color:#aa3b2d">{{singer4}}&nbsp;-&nbsp;{{song4}}</span></p>
                        <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                        <div v-if="this.on==false" style="width:60%;height: 54px;margin: 60px auto 10px auto;">
                            <p style="float:left;width:17%;height:50px;border: 3px solid #a72531;"><img :src="img"></p>
                            <p style="height: 52px;font-size: 27px;line-height: 55px;padding-left: 60px;color: #a72531">*同意开通炫铃功能</p>
                        </div>
                        <div v-else class="offers-url" style="padding-bottom: 20px">
                        </div>
                        <a v-if="this.on==false" class="btn" @click="btnclick(4)" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <a v-else class="btn" @click="buyXLtrue(4)" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <div class="offers-url" style="color:#aa3b2d;overflow:hidden;font-size: 24px;border-top:3px solid #ddd">
                            <p style="float: left">1.订购成功,炫铃使用有效期可到"个人中心"查看</p>
                            <p style="float: left">2.目前安徽,福建的4G用户需在会员套餐外另外收</p>
                            <p style="float: left">取炫铃功能费，敬请谅解。</p>
                            <p style="float: left">3.未开通炫铃的用户,订购炫铃后将默认开通此功</p>
                            <p style="float: left">能，资费5元/月。</p>
                        </div>
                    </div>
                    <div class="btn-close" style="position: absolute; top: -35px; right: -20px;"  @click="showTip1_4 = false"><img :src="'l/images/sp-close.png'" /></div>
                </div>
            </div>
        </modal>
        <modal :show.sync="showTip1_5" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" style="position: absolute;left: -3%;top: 89%;z-index: 100;transform: rotate(-17deg);">
                <img :src="$root.activityBasePath+'/images/gg.png'" style="position: absolute;width: 20%;z-index: 100;top: 90%;left: 87%;transform: rotate(81deg);">
                <div class="box" style="background: #fff;border-radius:30px;border: 8px solid #f7af49;">
                    <p class="offers-title" style="color: #f7af49">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px">是否订购此炫铃？</p>
                        <p class="offers-text"><span style="color:#aa3b2d">{{singer5}}&nbsp;-&nbsp;{{song5}}</span></p>
                        <p class="offers-text" style="margin-top: 30px">资费：2元/首 (沃音乐会员免费)</p>
                        <div v-if="this.on==false" style="width:60%;height: 54px;margin: 60px auto 10px auto;">
                            <p style="float:left;width:17%;height:50px;border: 3px solid #a72531;"><img :src="img"></p>
                            <p style="height: 52px;font-size: 27px;line-height: 55px;padding-left: 60px;color: #a72531">*同意开通炫铃功能</p>
                        </div>
                        <div v-else class="offers-url" style="padding-bottom: 20px">
                        </div>
                        <a v-if="this.on==false" class="btn" @click="btnclick(5)" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <a v-else class="btn" @click="buyXLtrue(5)" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">&nbsp;确&nbsp;定</a>
                        <div class="offers-url" style="color:#aa3b2d;overflow:hidden;font-size: 24px;border-top:3px solid #ddd">
                            <p style="float: left">1.订购成功,炫铃使用有效期可到"个人中心"查看</p>
                            <p style="float: left">2.目前安徽,福建的4G用户需在会员套餐外另外收</p>
                            <p style="float: left">取炫铃功能费，敬请谅解。</p>
                            <p style="float: left">3.未开通炫铃的用户,订购炫铃后将默认开通此功</p>
                            <p style="float: left">能，资费5元/月。</p>
                        </div>
                    </div>
                    <div class="btn-close" style="position: absolute; top: -35px; right: -20px;"  @click="showTip1_5 = false"><img :src="'l/images/sp-close.png'" /></div>
                </div>
            </div>
        </modal>
        <!--订购成功-->
        <modal :show.sync="showTip2" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left" style=" position: absolute;left: -4%;top: 81%;z-index: 100;">
                <img :src="$root.activityBasePath+'/images/modal-r.png'" class="right" style="position: absolute;right: -6%;top: 64%;z-index: 100;">
                <div class="box" style="background: #fff;border-radius:30px;border: 8px solid #f7af49;">
                    <p class="offers-title" style="color: #f7af49">提示</p>
                    <div style="padding-bottom: 30px;">
                        <p class="offers-text" style="margin-top: 30px;margin-bottom: 30px;font-size: 65px;
    font-weight: 700;">订购成功!</p>
                        <p class="offers-text"><span style="font-size: 25px;">（登录沃音乐官网"个人中心"可设置炫铃哦）</span></p>
                        <div class="offers-url" style="padding-bottom: 50px">

                        </div>
                        <a class="btn" @click="showTip2 = false" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
                    </div>
                    <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showTip2 = false"><img :src="'l/images/sp-close.png'" /></div>
                </div>

            </div>
        </modal>
        <!--订购失败-->
        <modal :show.sync="showTip3" :bg="false" :backdrop="false">
            <div class="prize-over-view" style="position: relative;">
                <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left" style=" position: absolute;left: -4%;top: 81%;z-index: 100;">
                <img :src="$root.activityBasePath+'/images/modal-r.png'" class="right" style="position: absolute;right: -6%;top: 64%;z-index: 100;">
                <div class="box" style="background: #fff;border-radius:30px;border: 8px solid #f7af49;">
                <div class="content-title content-title4">
                    <p style="color: #aa3b2d;font-size: 60px; font-weight: 600; line-height: 70px;">订购失败</p>
                </div>
                    <div style="overflow: hidden">
                <div style="padding: 50px 0;float: left">
                    <p class="offers-text" style="font-size: 45px;margin-bottom: 10px">请重试</p>
                    <p class="offers-text" style="margin-bottom: 10px">(如重试后订购失败，</p>
                    <p class="offers-text" style="margin-bottom: 10px">可关注沃音乐微信</p>
                    <p class="offers-text" style="color: #e43639;margin-bottom: 10px">womusic999留言，</p>
                    <p class="offers-text">联系小沃查询异常哦)</p>
                </div>
                    <img style="vertical-align: middle;float: right;margin-top: 80px" :src="'./l/images/lele.png'" alt="">
                    </div>
                <a class="btn" @click="showTip3 = false" style="margin-top: 0;background: url('./l/images/btn-bg.png') center center no-repeat; margin-left: 15px;">确定</a>
                <div class="btn-close" style="position: absolute; top: 10px; right: 10px;"  @click="showTip3 = false"><img :src="'l/images/sp-close.png'" /></div>
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
        margin-top: 30px;
        width: 91%;
        margin-left:4.5%;
        z-index:99;
        background-color:#fff;
        border:3px solid #ffcf4a;
        .row{
            width:90%;
            margin:0 auto;
            overflow:hidden;
            border-bottom: 2px dashed #ffcf4a;
            .musicLogo{
                background: url("images/music.png")no-repeat;
                background-size: 60px;
                width: 15%;
                height: 70px;
                margin-top: 15px;
                float: left;
                background-position: center;
                border-right: 2px solid #ffcf4a;
            }
            .musicText{
                width: 55%;
                height: 100px;
                float: left;
                p{
                    color: #ffcf4a;
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
                /*background: url("images/LY.png")no-repeat;*/
                /*background-size: 40px;*/
                background-position: center;
                width: 10%;
                height: 100px;
                float: left;
                img{
                    margin-top:31% ;
                }
            }
        }
    }

    .btn-panel {
        // position: absolute;
        // top: 86%;
        //margin-top: 20px;
        width: 100%;
        z-index:99;
    a {
        font-size: 36.7px;
        display: block;
        width: 380px;
        height: 100px;
        margin-top: 30px;
        margin-bottom: 15px;
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
        padding-top: 80px;
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
        color: #a3332a;
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
                default: 'l/images/listen.png'
            },
            musicBg1: {
                type: String,
                default: 'l/images/listen.png'
            },
            musicBg2: {
                type: String,
                default: 'l/images/listen.png'
            },
            musicBg3: {
                type: String,
                default: 'l/images/listen.png'
            },
            musicBg4: {
                type: String,
                default: 'l/images/listen.png'
            },

            musicSrc: {
                type: String,
                default: 'l/images/1.mp3'
            },
            musicSrc1: {
                type: String,
                default: 'l/images/2.mp3'
            },
            musicSrc2: {
                type: String,
                default: 'l/images/3.mp3'
            },
            musicSrc3: {
                type: String,
                default: 'l/images/4.mp3'
            },
            musicSrc4: {
                type: String,
                default: 'l/images/5.mp3'
            },

            musicStatus: {
                type: String,
                default: 'pause'
            }
        },
        data() {
            return {
                song1:'演员',
                singer1:'薛之谦',
                song2:'无能为力想你',
                singer2:'庄心妍',
                song3:'FLOW',
                singer3:'方大同+王力宏',
                song4:'当爱来敲门',
                singer4:'张碧晨',
                song5:'你在终点等我',
                singer5:'王菲',
                showTip:false,//提示开通炫铃弹框
                showTip1_1:false,//提示确认订购炫铃弹框1
                showTip1_2:false,//提示确认订购炫铃弹框2
                showTip1_3:false,//提示确认订购炫铃弹框3
                showTip1_4:false,//提示确认订购炫铃弹框4
                showTip1_5:false,//提示确认订购炫铃弹框5
                showTip2:false,//订购成功
                showTip3:false,//订购失败
                on:false,//未开通炫铃
                trueMe:true,//勾选开通炫铃功能
                img:'l/images/true-icon.png',
                interfacepos:0,//接口尝试当前次数
                interfacecount:3,// 接口尝试总次数
            }
        },

        ready() {
            console.log('是否开通vip',this.$root.cookieVip);
            this.haveYesOrNo();
            this.$root.$refs.music.sounddisable(true);
            this.$root.musicData.showMusic = false;
//            this.showTip1_1=true;
//            this.showTip1_2=true;
        },

        methods: {
            goOn(){
                if(this.img != ''){
                    this.img='';
                    this.trueMe=false;
                }
                else{
                    this.img='l/images/true-icon.png';
                    this.trueMe=true;
                }
            },
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
                    accessToken: this.$root.accesstoken,
                };
                sapi.findUserBasInfo(this,body,(back) => {
                    if (back.resCode == 10001 || back.resCode == '10001') {
                        var back = back.resMsg;
                        this.on = true;
                        this.$dispatch('loading', {text: '您已经开通炫铃功能,赶紧订购炫铃吧', show: true, duration: 1000});
                    }
                })
            },
            btnclick(number){
//                if (!this.$root.islogin) {
//                    sapi.netLogin(this,{},(back)=>{
//                        if(back.resCode!=0){
//                            this.$root.login = true;
//                        }else{
//                            this.$root.islogin = true;
//                            if(this.trueMe){
//                                this.qryUserBasInfo(this.num);
//                            }else{
//                                this.buyXLtrue(this.num);
//                            }
//                        }
//                    });
//                    return;
//                }
                if(this.trueMe){
                    this.qryUserBasInfo(number);
                }else{
                    this.buyXLtrue(number);
                }
            },
//            开通炫铃功能
            qryUserBasInfo(number){
                this.$dispatch('loading', {
                    name: 'qryUserBasInfo',
                    icon: true,
                    text: '请稍后...',
                    show: true,
                    duration: 70 * 1000
                });
                var body={
                    accessToken: this.$root.accesstoken,
                };
                this.interfacepos++;
                sapi.qryUserBasInfo(this,body,(back) =>{
                    this.$dispatch('cancelloading', 'qryUserBasInfo');
                    if(back.resCode == '0'|| back.resCode == '30001'){
                        this.interfacepos = 0;
//                        this.$dispatch('loading', {text: '炫铃功能开通成功！耶', show: true, duration: 1000});
                        this.buyXLtrue(number);
                    }
                    else{
                        if(this.interfacepos<this.interfacecount){
                            setTimeout(this.qryUserBasInfo(number),1000);
                        }else{
                            this.$dispatch('loading', {text: back.resMsg, show: true, duration: 1000});
                        }
                    }
                })
            },
//            设置炫铃
            setMusic(type){
                if (type == 1) {
                    if (!this.$root.islogin) {
                        sapi.netLogin(this,{},(back)=>{
                            if(back.resCode!=0){
                                this.$root.login = true;
                            }
                        });
                    }
                    else if (this.$root.islogin && this.$root.cookieVip == "0000000000") {
                        this.showTip1_1 = true;
                    }
                    else if (this.$root.islogin && this.on == false) {
                        this.showTip1_1 = true;
                    }
                    else if (this.$root.islogin && this.on == true) {
                        this.showTip1_1 = true;
                    }
                }
                if (type == 2) {
                    if (!this.$root.islogin) {
                        sapi.netLogin(this,{},(back)=>{
                            if(back.resCode!=0){
                                this.$root.login = true;
                            }
                        });
                    }
                    else if (this.$root.islogin && this.$root.cookieVip == "0000000000") {
                        this.showTip1_2 = true;
                    }
                    else if (this.$root.islogin && this.on == false) {
                        this.showTip1_2 = true;
                    }
                    else if (this.$root.islogin && this.on == true) {
                        this.showTip1_2 = true;
                    }
                }
                if (type == 3) {
                    if (!this.$root.islogin) {
                        sapi.netLogin(this,{},(back)=>{
                            if(back.resCode!=0){
                                this.$root.login = true;
                            }
                        });
                    }
                    else if (this.$root.islogin && this.$root.cookieVip == "0000000000") {
                        this.showTip1_3 = true;
                    }
                    else if (this.$root.islogin && this.on == false) {
                        this.showTip1_3 = true;
                    }
                    else if (this.$root.islogin && this.on == true) {
                        this.showTip1_3 = true;
                    }
                }
                if (type == 4) {
                    if (!this.$root.islogin) {
                        sapi.netLogin(this,{},(back)=>{
                            if(back.resCode!=0){
                                this.$root.login = true;
                            }
                        });
                    }
                    else if (this.$root.islogin && this.$root.cookieVip == "0000000000") {
                        this.showTip1_4 = true;
                    }
                    else if (this.$root.islogin && this.on == false) {
                        this.showTip1_4 = true;
                    }
                    else if (this.$root.islogin && this.on == true) {
                        this.showTip1_4 = true;
                    }
                }
                if (type == 5) {
                    if (!this.$root.islogin) {
                        sapi.netLogin(this,{},(back)=>{
                            if(back.resCode!=0){
                                this.$root.login = true;
                            }
                        });
                    }
                    else if (this.$root.islogin && this.$root.cookieVip == "0000000000") {
                        this.showTip1_5 = true;
                    }
                    else if (this.$root.islogin && this.on == false) {
                        this.showTip1_5 = true;
                    }
                    else if (this.$root.islogin && this.on == true) {
                        this.showTip1_5 = true;
                    }
                }

            },
//            确认订购炫铃
            buyXLtrue(number){
                if(this.on==false) {
                    if (number == 1) {
                        var body = {
                            accessToken: this.$root.accesstoken,
                            toneID: '9871600020160715376156',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                            source:source
                        };
                    }
                    else if(number == 2){
                        var body = {
                            accessToken: this.$root.accesstoken,
                            toneID: '9457000020161121406061',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                            source:source
                        };
                    }
                    else if(number == 3){
                        var body = {
                            accessToken: this.$root.accesstoken,
                            toneID: '9871600020160824392628',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                            source:source
                        };
                    }
                    else if(number == 4){
                        var body = {
                            accessToken: this.$root.accesstoken,
                            toneID: '9772000020161223410876',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                            source:source
                        };
                    }
                    else if(number == 5){
                        var body = {
                            accessToken: this.$root.accesstoken,
                            toneID: '9159100020160927396575',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                            source:source
                        };
                    }

                }
                else if(this.$root.cookieVip == "0000000000" && this.on==true){
                    if (number == 1) {
                        var body = {
                            accessToken: this.$root.accesstoken,
                            toneID: '9871600020160715375485',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                            source:source
                        };
                    }
                    else if(number == 2){
                        var body = {
                            accessToken: this.$root.accesstoken,
                            toneID: '9457000020161121406049',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                            source:source
                        };
                    }
                    else if(number == 3){
                        var body = {
                            accessToken: this.$root.accesstoken,
                            toneID: '9871600020160824392620',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                            source:source
                        };
                    }
                    else if(number == 4){
                        var body = {
                            accessToken: this.$root.accesstoken,
                            toneID: '9772000020161223410882',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                            source:source
                        };
                    }
                    else if(number == 5){
                        var body = {
                            accessToken: this.$root.accesstoken,
                            toneID: '9159100020160927396545',
                            mobile: sessionStorage.getItem('LoginMobile'),
                            aid: aid,
                            toneType: 1,
                            source:source
                        };
                    }
                }
                this.$dispatch('loading', {
                    name: 'buyTone',
                    icon: true,
                    text: '请稍后...',
                    show: true,
                    duration: 70 * 1000
                });
                this.interfacepos++;
                sapi.buyTone(this,body,(back) =>{
                    this.$dispatch('cancelloading', 'buyTone');
                    if(back.resCode == 0 || back.resCode == "0"){
                        this.interfacepos=0;
                        this.showTip2 = true;
                        this.showTip1_1 = false;
                        this.showTip1_2 = false;
                        this.showTip1_3 = false;
                        this.showTip1_4 = false;
                        this.showTip1_5 = false;
                    }else {
                        if(this.interfacepos<this.interfacecount){
                            setTimeout(this.buyXLtrue(number),1000);
                        }else{
                            this.$dispatch('handle_server_error', back);
                            this.showTip3 = true;
                            this.showTip1_1 = false;
                            this.showTip1_2 = false;
                            this.showTip1_3 = false;
                            this.showTip1_4 = false;
                            this.showTip1_5 = false;
                        }
                    }
                })
            },

//            开通会员
            openVipRightNow(){
                this.addOperLog('button','openMusicVIP');
                if(!this.$root.islogin){
                    sapi.netLogin(this,{},(back)=>{
                        if(back.resCode!=0){
                            this.$root.login = true;
                        }
                    });
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
                    this.musicBg = 'l/images/stop.png';
                    this.musicBg1 = 'l/images/listen.png';
                    this.musicBg2 = 'l/images/listen.png';
                    this.musicBg3 = 'l/images/listen.png';
                    this.musicBg4 = 'l/images/listen.png';
                    this.musicStatus = 'play';
                    audio.loop = true;
                    audio.play();
                    audio1.pause();
                    audio2.pause();
                    audio3.pause();
                    audio4.pause();
                }
                else{
                    this.musicBg = 'l/images/listen.png';
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
                    this.musicBg1 = 'l/images/stop.png';
                    this.musicBg = 'l/images/listen.png';
                    this.musicBg2 = 'l/images/listen.png';
                    this.musicBg3 = 'l/images/listen.png';
                    this.musicBg4 = 'l/images/listen.png';
                    this.musicStatus = 'play';
                    audio1.loop = true;
                    audio1.play();
                    audio.pause();
                    audio2.pause();
                    audio3.pause();
                    audio4.pause();

                }else{
                    this.musicBg1 = 'l/images/listen.png';
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
                    this.musicBg2 = 'l/images/stop.png';
                    this.musicBg1 = 'l/images/listen.png';
                    this.musicBg = 'l/images/listen.png';
                    this.musicBg3 = 'l/images/listen.png';
                    this.musicBg4 = 'l/images/listen.png';
                    this.musicStatus = 'play';
                    audio2.loop = true;
                    audio2.play();
                    audio1.pause();
                    audio.pause();
                    audio3.pause();
                    audio4.pause();

                }else{
                    this.musicBg2 = 'l/images/listen.png';
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
                    this.musicBg3 = 'l/images/stop.png';
                    this.musicBg1 = 'l/images/listen.png';
                    this.musicBg2 = 'l/images/listen.png';
                    this.musicBg = 'l/images/listen.png';
                    this.musicBg4 = 'l/images/listen.png';
                    this.musicStatus = 'play';
                    audio3.loop = true;
                    audio3.play();
                    audio1.pause();
                    audio.pause();
                    audio2.pause();
                    audio4.pause();

                }else{
                    this.musicBg3 = 'l/images/listen.png';
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
                    this.musicBg4 = 'l/images/stop.png';
                    this.musicBg1 = 'l/images/listen.png';
                    this.musicBg2 = 'l/images/listen.png';
                    this.musicBg3 = 'l/images/listen.png';
                    this.musicBg = 'l/images/listen.png';
                    this.musicStatus = 'play';
                    audio4.loop = true;
                    audio4.play();
                    audio1.pause();
                    audio.pause();
                    audio2.pause();
                    audio3.pause();

                }else{
                    this.musicBg4 = 'l/images/listen.png';
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