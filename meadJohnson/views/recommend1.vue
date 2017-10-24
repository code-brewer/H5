<template>
    <div class="recommend ">
        <!-- <p class="p1">相约3位好友关注
            <br/>赢四月花漾大礼</p>
        <p class="p2">每邀请一位好友加入，你都能获得20贝壳币，
            <br/>本月每成功邀请3位好友首次关注花妈，
            <br/>即可获得1次抽奖机会</p> -->
        <!-- <img class="img1" :src="'images/recommend/rec1_title.png'"> -->
        <!-- <img class="img1" :src="'images/recommend/recommend-img9.png'"> -->
        <div style="position: absolute;top: 620px;    width: 100%;">
            <div class="find-des">找好友套路在这里</div>
            <p class="p3">一键找好友，最贴心的妈妈赞礼就是你的！</p>
            <btn @click="isShare=true" class="btn">马上找好友</btn>
            <!-- <p class="p3">套路二：扫码求好友，迪士尼门票是我的</p>
        <img class="img3" :src="'images/recommend/recommend-img5.png'"> -->
            <div class="div1">
                <span class="rule" @click="isRule = true">活动规则</span>
                <!-- <img class="img1" :src="'images/recommend/rec1_rule.png'"> -->
                <p class="p2">如有疑问，请通过后台联系花妈：客服+问题
                    <br/>或者添加花妈小助手微信：hbmm_001，
                    <br/>我们会尽快回复哒！</p>
            </div>
        </div>
        <div class="share-open" v-show="isShare" @click="isShare=false">
            <!-- <img :src="'images/recommend/recommend-img4.png'" alt=""> -->
            <img :src="'images/teams-img1.png'" alt="">
            <!-- <p>赶快分享给好友关注花妈吧~
            <br/>本月成功邀请3位好友首次关注，即可获得一次抽取新年大礼的机会哦！</p> -->
            <p>最贴心的礼物，献给最美的妈妈们。
                <br/>分享给你的好友，一起拿奖吧！
            </p>
        </div>
        <welfare-rule :show.sync="isRule"></welfare-rule>
        <!-- <recommend-rule :show.sync="isRule"></recommend-rule> -->
    </div>
</template>
<script>
import btn from '../components/btn.vue'
import recommendRule from '../components/recommendRule.vue'
import WelfareRule from '../components/lotteryDraw/lottery2/rule1.vue'
export default {
    components: {
        btn,
        recommendRule,
        WelfareRule
    },
    data() {
        return {
            isShare: false,
            isRule: false
        }
    },
    created() {
        document.title = '邀请好友';
        this.groupaddPvUv({type: '7'});
    },
    ready() {
        // this.getSign();
    },
    methods: {
        /**
         * 重新更新分享文案
         */
        // getSign() {
        //     this.$dispatch('updateShare', {
        //         title: '女神节，花妈任性派海蓝之谜面霜、sk-II神仙水等大牌礼品。',
        //         sharetext: '我要拿花妈的女神专属大礼，男神女神点进来，助攻我赢奖吧！',
        //         sharehref: 'recommend3/' + openId,
        //         shareicon: location.href.split('#')[0] + "images/logo.png"
        //     });
        // }
        groupaddPvUv(options) {
            this.$dispatch('statistics', options);
        },
    }
}
</script>
<style lang="scss" scoped>
.recommend {
    background: url(../images/recommend/recommend1_bg2.png) no-repeat;
    position: relative;
    text-align: center;
    min-height: 1137px;
    p {
        line-height: 1.3;
    }
    .p1 {
        font-size: 50px;
    }
    .p1,
    .p2,
    .p3 {
        padding-top: 100px;
        // color: red;
        font-family: cursive;
    }
    .p2 {
        font-size: 25px;
        padding: 20px 0;
        // color: #5FA794;
        color: #000;
    }
    .p3 {
        padding: 20px 0;
        font-size: 30px;
    }
    .img1 {
        width: 100%;
        // margin-top: 30px;
    }
    .find-des {
        color: #B8183A;
        width: 350px;
        height: 87px;
        margin: 20px auto;
        font-size: 36px;
        font-family: '微软雅黑';
        line-height: 74px;
        // color: #348790;
        text-align: center;
        background: url(../images/find-des-img3.png) center no-repeat;
    }
    .img3 {
        width: 342px;
    }
    .div1 {
        position: relative;
        // padding-bottom: 124px;
        width: 100%;
        margin: 0 auto;
        color: #fff;
        ext-align: center;
        p {
            position: absolute;
            left: 0;
            bottom: -100px;
            width: 100%;
            font-size: 24px;
            font-family: 黑体;
        }
    }
    .rule {
        display: inline-block;
        padding: 30px 0;
        font-size: 36px;
        // color: #348790;
        color: red;
        text-decoration:underline // i {
        //  display: block;
        //  height: 5px;
        //  margin-top: 5px;
        //  border: solid #348790;
        //  border-width: 1px 0;
        // }
    }
}

.share-open {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    z-index: 10;
    p {
        padding: 0 20px;
        color: white;
        font-size: 36px;
    }
}

.btn {
    display: inline-block;
    /* width: 206px; */
    /* height: 74px; */
    line-height: 72px;
    text-align: center;
    color: white;
    // padding: 0px 50px;
    background: red;
    border-radius: 57px;
    font-family: 黑体;
    font-size: 30px;
    /* background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAABZCAYAAAD4plJDAAAAGXRFW…Q044lZYopMcFFusXaJQnGakt3GpU8Q42SzVLtEoYgM/i/AAHRjKKbKZOuVAAAAAElFTkSuQmCC) no-repeat; */
    /* background-size: 100% 100%; */
}
</style>
