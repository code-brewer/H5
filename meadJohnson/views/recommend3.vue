<template>
    <div class="recommend3">
        <!-- <p class="p1">我的四月花漾大礼
            <br/>就差你来助攻了</p>
        <p class="p2">长按二维码，关注得100贝壳币
            <br/>兑换精致好礼</p> -->
        <!-- <img class="img1" :src="'images/recommend/rec3_title.png'"> -->
        <!-- <img :src="'images/recommend/recommend-img9.png'" style="width:100%"> -->
        <div style="position: absolute;top: 674px;
    left: 46px;">
            <img class="img5" :src="imgSrc">
            <div class="div2"><span @click="isRule = true" class="rule p2">活动规则<i></i></span></div>
        </div>
        <welfare-rule :show.sync="isRule"></welfare-rule>
        <!-- <recommend-rule :show.sync="isRule"></recommend-rule> -->
    </div>
</template>
<script>
import recommendRule from '../components/recommendRule.vue'
import api from '../api/index1.js'
import WelfareRule from '../components/lotteryDraw/lottery2/rule1.vue'
export default {
    components: {
        recommendRule,
        WelfareRule
    },
    created() {
        document.title = '推荐好友';
        if (this.$route.params.id) {
            this.getActCardQrcode();
        };
        this.groupaddPvUv({type: '8'})
    },
    data() {
        return {
            isShare: false,
            isRule: false,
            imgSrc: 'images/recommend/recommend-img5.png'
        }
    },
    methods: {
        /**
         * 获取个人信息
         */
        getActCardQrcode() {
            var self = this;
            api.actCardQrcode(this, {
                openid: this.$route.params.id
            }, back => {
                if (back.resCode === '0') {
                    this.imgSrc = back.repBody.msqrcodePath;
                }
            })
        },
        groupaddPvUv(options) {
            this.$dispatch('statistics', options);
        },
    }
}
</script>
<style lang="scss" scoped>
.recommend3 {
    background: url(../images/recommend/recommend2_bg2.png) no-repeat;
    position: relative;
    min-height: 1137px;
    text-align: center;
    .img5 {
        width: 235px;
    }
    .div2 {
        width: 531px;
        margin-top: 60px;
    }
    .div2 {
        // margin: 0 auto;
        // text-align: right;
    }
    .rule {
        display: inline-block;
        // padding: 30px 0;
        font-size: 26px;
        text-decoration: underline
    }
    .img1 {
        width: 100%;
        margin: 130px 0 30px;
    }
    .p2 {
        color: red;
    }
}
</style>
