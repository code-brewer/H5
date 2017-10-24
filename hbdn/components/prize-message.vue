<template>
    <section class="model" style="position: absolute;box-sizing: border-box;" v-if="isShow">
            <div class="panel">
                <div class="msg">
                    <div class="messagebg">
                        <h2 style="padding-bottom: 5%">恭喜您</h2>
                        <p style="text-align: center;padding: 0 50px;line-height: 60px;">获得VR体验劵</p>
                        <p style="text-align: center;padding: 0 50px;line-height: 60px;">兑换码：<span style="font-size:40px;font-weight: 600">HC2345</span></p>
                        <p style="text-align: center;padding: 0 50px;line-height: 60px;">赶紧去体验吧</p>
                        <a class="btn" style="background: url(images/btnbg.png);font-size: 32px;display: inline-block;margin-left: 60px;" @click="isShowVideo=true">
                        播放VR视频
                        </a>
                          <a class="btn" v-link="{path: '/home'}" style="background: url(images/btnbg.png);font-size: 32px;display: inline-block;">
                        返回首页
                        </a>
                        <div class="vrRule">
                            <a @click="isShowVideoMes=true">VR体验劵使用规则</a>
                        </div>
                    <!-- <img :src="'images/xx.png'" @click="answerData.show = false" class="close"> -->
                    </div>
                </div>
                
            </div>
            
    </section>
    <vr-video :is-show-video.sync="isShowVideo"></vr-video>
    <vr-rule :is-show.sync="isShowVideoMes"></vr-rule>
</template>
<script>
export default {
    components: {
        vrVideo: require('./vr.vue'),
        vrRule: require('./vr-rule.vue'),
    },
    props: {
        isShow: {
            Boolean,
            default: false,
        }
    },
    methods: {
        closeMsg() {
            this.isShow = false;
        }
    },
    data(){
        return {
            isShowVideo : false,
            isShowVideoMes : false
        }
    },
    
}
</script>
<style lang="sass" scoped>
video {
    width: 100%;
}
</style>
