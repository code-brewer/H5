<template>
    <div class="Coinchou main">
        <section class="lijiang">
            <!-- <h1>新年岂能无礼</h1>
            <h1>邀好友抽iPhone7大奖</h1>
            <p style="padding-bottom: 20px; color: #ffa300; font-size: 34px;">100%中奖，新年最紧要是开心！！！</p> -->
            <!-- <img :src="'images/welfarechou/head.png'"> -->
        </section>
        <section class="choujiangqu" >
            <div class="choujianpan" style="    margin: 187px auto 0px;">
                <img :src="'images/welfarechou/pan3.png'" class="lottery">
                <div class="lottery-highlight" v-show="showHighLight" :style="{transform: 'rotate('+rotate+'deg)','background-position': '0 ' + highLight + 'px'}"></div>
                <img :src="'images/welfarechou/pan3.png'" class="lotteryTemp" transition="lottery" v-show="showLotteryImg" style="position:absolute; z-index: 4">
                <!-- <img :src="'images/yinying.png'" class="shadow"> -->
                <!-- <img :src="'images/welfarechou/hb.png'" class="hb"> -->
                <div class="zhizhen" @click="lottery"></div>
            </div>
        </section>
        <section class="duijiang">
            <p>你有<span style="color: #000;">{{num}}</span>次抽奖机会</p>
            <div class="btns">
                <btn @click="link('/bbm/index1.jsp#!/newSignIn/plan')"} class = "btn">打卡有奖</btn>
                <btn v-link="{path: '/presentList'}" class = "btn">贝壳币商城</btn>
            </div>
            <a @click="tipModal.show = true">活动规则</a>
        </section>
        <welfare-rule :show.sync="tipModal.show"></welfare-rule>
        <success1 :show.sync="success1.show" :gift-name="giftName" :is-coin="success1.isCoin" :oid="success1.oid" :prize="prize"></success1>
        <notice1 :show.sync="notice1.show" :text="notice1.text"></notice1>
        <error2 :show.sync="error2.show"></error2>
        <error3 :show.sync="error3.show"></error3>
        <error4 :show.sync="error4.show" :flag="error4.flag"></error4>
    </div>
</template>
<script>
import jQuery from 'jquery'
import '../dist/jQueryRotate.js'
import WelfareRule from '../components/lotteryDraw/lottery2/rule1.vue'
import error2 from '../components/lotteryDraw/lottery2/error2.vue'
import error3 from '../components/lotteryDraw/lottery2/error3.vue'
import error4 from '../components/lotteryDraw/lottery2/error4.vue'
import success1 from '../components/lotteryDraw/lottery2/Success1.vue'
import notice1 from '../components/lotteryDraw/notice1.vue'
import api from '../api/index.js'
import btn from '../components/btn.vue'

export default {
    components: {
        WelfareRule,
        success1,
        error2,
        error3,
        error4,
        notice1,
        btn
    },
    data() {
        return {
            tipModal: {
                show: false
            },
            error2: {
                show: false
            },
            error3: {
                show: false
            },
            error4: {
                show: false,
                flag: ''
            },
            success1: {
                show: false,
                isCoin: true,
                oid: ''
            },
            notice1: {
                show: false,
                text: ''
            },
            rotateDisabled: true, //禁止重复点击抽奖
            // gifts: {
            //     "一等奖": {
            //         angle: 36,
            //         highLight: '-1983',
            //         name: 'iPhone 7 plus'
            //     },
            //     "五等奖": {
            //         angle: 108,
            //         highLight: '-1486',
            //         name: '50 贝壳币'
            //     },
            //     "二等奖": {
            //         angle: 252,
            //         highLight: '-495',
            //         name: 'iPad Mini2'
            //     },

            //     "三等奖": {
            //         angle: 180,
            //         highLight: '-992',
            //         name: '携程卡 1500 元'
            //     },

            //     "四等奖": {
            //         angle: 324,
            //         highLight: '0',
            //         name: '全棉时代纱巾'
            //     },

            // },
            gifts: {
                "一等奖": {
                    angle: 270,
                    highLight: '-1992',
                    name: '飞利浦 扫地机器人'
                },
                "五等奖": {
                    angle: 330,
                    highLight: '-1488',
                    name: '50元手机话费'
                },
                "二等奖": {
                    angle: 210,
                    highLight: '-2489',
                    name: '奥佳华 按摩坐垫'
                },

                "三等奖": {
                    angle:30,
                    highLight: '-494',
                    name: '睡眠博士 乳胶枕一对'
                },

                "四等奖": {
                    angle: 90,
                    highLight: '-993',
                    name: '德尔玛 家用加湿器'
                },
                "六等奖": {
                    angle: 150,
                    highLight: '4',
                    name: '50贝壳币'
                },

            },
            flag: '',
            num: '', //抽奖次数
            showLotteryImg: false, //控制遮层转盘
            giftName: '0', //抽中奖品
            prize:'',
            highLight: '0', //转盘高亮位置
            showHighLight: false, //转盘高亮位置
            rotate: 0 //转动角度
        }
    },
    created() {
        if(this.$route.params.id != 'GXZJ'){
            this.$router.replace({
                path: '/'
            });
        }
        this.$dispatch('loading');
        document.title = '花贝妈妈';
        // this.shareLotteryCount();
        //剩余的抽奖次数
        api.shareLotteryCount(this, {}, (data) => {
            if (data.resCode === '0') {
                var list = data.repBody.list[0];
                this.flag = list.flag;
                this.error4.flag = 10 - list.flag;
                this.num = list.num < 0 ? 0 : +list.num;
                if (this.num === 0) {
                    if (list.flag == '0') { //无抽奖资格
                        this.error2.show = true;
                    } else if (list.flag == '10') {
                        this.error3.show = true;
                    } else {
                        this.error4.show = true;
                    }
                } else {
                    this.rotateDisabled = false;
                }
                this.$dispatch('cancelLoading');
            }
        })
    },
    methods: {
        link(path) {
            window.location.href = path;
        },
        rotateFunc(list) {
            var $lotteryImg = jQuery('.lottery'),
                self = this;
            this.rotate = this.gifts[list.prize].angle;
            $lotteryImg.rotate({
                angle: 0,
                duration: 3000,
                animateTo: this.gifts[list.prize].angle + 2160,
                easing: function(e, f, a, h, g) {
                    return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
                },
                callback: () => {
                    this.showHighLight = true;
                    setTimeout(() => {
                        // this.giftName = this.gifts[list.prize].name;
                        this.giftName = this.gifts[list.prize].name;
                        this.success1.isCoin = this.giftName.indexOf('贝壳币') > -1 ? true : false;
                        this.prize = list.prize;
                        this.success1.oid = list.oid;
                        this.success1.show = true;
                        this.rotateDisabled = false;
                    }, 1000);
                }
            })
        },
        check() {
            this.num -= 1;
        },
        lottery() {
            //判断抽奖条件是否满足
            if (+this.flag <= 0 && this.num === 0) {
                this.error2.show = true;
            } else if (+this.flag >= 10) {
                this.error3.show = true;
            } else if (+this.num <= 0) {
                this.rotateDisabled = false;
                this.error4.show = true;
                return false;
            }
            if (!this.rotateDisabled) {
                this.rotateDisabled = true;
                this.showHighLight = false;
                this.showLotteryImg = true;
                jQuery('.lottery').rotate(0);
                var time = setTimeout(() => {
                    this.notice1.show = true;
                    this.notice1.text = '亲,正在抢修中～请稍候再试！';
                    this.showLotteryImg = false;
                    this.rotateDisabled = false;
                }, 10000);
                api.shareLottery(this, {}, (data) => {
                    if (data.resCode === '0') {
                        clearTimeout(time);
                        this.showLotteryImg = false;
                        var list = data.repBody.list[0];
                        if (list.prize.indexOf('抽奖次数已用完') > -1) {
                            this.error2.show = true;
                        } else {
                            this.check();
                            this.highLight = this.gifts[list.prize].highLight;
                            this.rotateFunc(list);
                            
                        }
                    }
                })
            }
        }

    },
    events: {
        setOverflow(val) {
            val ? this.$dispatch('hidden') : this.$dispatch('auto');
        }
    }
}
</script>
<style lang="scss" scoped>
.main {
    background: url(../images/welfarechou/zhanpan-yuandan-bg4.png);
        background-size: cover;
}

.btns {
    text-align: center;
    margin: 10px auto;
    div {
        margin: 0 40px;
        font-size: 26px;
    }
    .btn{
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
}

.Coinchou {
    .lijiang {
        position: relative;
        top: 76px;
        width: 100%;
        text-align: center;
        h1 {
            font-family: '黑体';
            font-size: 60px;
            color: #3da5af;
            text-align: center;
            line-height: 100px;
        }
        p {
            font-family: '黑体';
            font-size: 28px;
            color: #3da5af;
            text-align: center;
            line-height: 30px;
        }
        a {
            font-family: '黑体';
            font-size: 28px;
            color: #3da5af;
            text-align: center;
            line-height: 30px;
            width: 100%;
            position: absolute;
        }
    }
    .choujiangqu {
        position: relative;
        overflow: hidden;
        top: 100px;
        .choujianpan {
            width: 500px;
            height: 500px;
            img {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                z-index: 3;
            }
            .shadow {
                width: 360px;
                height: 28px;
                margin: -18px auto;
                z-index: 2;
            }
            .hb {
                position: relative;
                width: 162px;
                height: 184px;
                margin: -216px -38px;
                z-index: 0;
            }
            .lottery-highlight {
                background: url(../images/welfarechou/lottery-highlight7.png) no-repeat;
                -webkit-background-size: 100% auto;
                -moz-background-size: 100% auto;
                background-size: 100% auto;
                width: 100%;
                height: 100%;
                z-index: 4;
            }
            .zhizhen {
                width: 130px;
                height: 193px;
                background: url(../images/welfarechou/GO3.png) no-repeat;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -53px;
                margin-top: 27px;
                z-index: 10;
                background-size: 81% auto;
            }
        }
    }
    .duijiang {
        position: absolute;
        bottom: 50px;
        width: 100%;
        text-align: center;
        h1 {
            font-family: '黑体';
            font-size: 60px;
            color: #3da5af;
            text-align: center;
            line-height: 100px;
        }
        p {
            font-family: '黑体';
            font-size: 28px;
            // color: #676060;
            text-align: center;
            line-height: 59px;
            height: 59px;
            // background: url(../images/welfarechou/zhuanpan-duijiang-bg2.png) center no-repeat;
               text-shadow: #fff 3px 0 0,#fff 0 3px 0,#fff -3px 0 0,#fff 0 -3px 0;
    color: red;
        }
        a {
            font-family: '黑体';
            font-size: 28px;
            color: red;
            text-align: center;
            line-height: 30px;
            width: 100%;
            text-decoration: underline;
        }
    }
}
</style>
