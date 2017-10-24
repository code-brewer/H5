<template>
    <div class="Card">
        <div id="banner" class="banner" style=" top: 0px;position: inherit;">
            <div class="hd" style="bottom: 823px;    display: none;">
                <ul>
                    <li class="on">&nbsp;</li>
                </ul>
            </div>
            <div class="bd" @click="groupaddPvUv({type: '23'}, $event, 'banner')">
                <ul>
                    <!-- <li>
                        <a :href="banner1Url">
                            <img :id="id1" :src="banner1">
                        </a>:href="banner2Url"
                    </li> -->
                    <li>
                        <a >
                            <img :id="2" :src="banner2">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="notice">
            <img :src="'images/invitationCard/yqgz.png'" alt="">
        </div>
        <div class="data" v-show="!week">
            <ul style="float: left;">
                <li class="name">本月邀请赚币数</li>
                <li class="num">{{invitation.score}}贝壳币</li>
            </ul>
            <ul style="float: right;">
                <li class="name">本月邀请好友数</li>
                <li class="num">{{invitation.num}}人</li>
            </ul>
        </div>
        <div class="data" v-show="week">
            <ul style="float: left;">
                <li class="name">本周邀请赚币数</li>
                <li class="num">{{invitation.score}}贝壳币</li>
            </ul>
            <ul style="float: right;">
                <li class="name">本周邀请好友数</li>
                <li class="num">{{invitation.num}}人</li>
            </ul>
        </div>
        <div class="yqk"><span class="on-off" :class="isWeek ? 'on' : 'off'" @click="isWeek = !isWeek"><span class="text"></span>
            <label></label>
            </span>
            <a href="#!/date">邀请记录 <img :src="'images/invitationCard/rl.png'" alt=""></a>
        </div>
        <div class="friend" v-else>
            <p class="">最新加入好友</p>
            <div>
                <ul class="clearfix">
                    <li v-for="item in headUrls">
                        <img :src="item.head_img">
                    </li>
                </ul>
            </div>
        </div>
        <div class="div1">
            <!-- <btn @click="isShare=true">马上找好友</btn> -->
            <a @click="isShare=true"><img :src="'images/invitationCard/btn.png'" class="lp"></a>
        </div>
        <div class="div2">
            <span class="rule" @click="isRule = true">邀请规则</span></div>
        <div class="share-open" v-show="isShare" @click="isShare=false">
            <img :src="'images/recommend-img4.png'" alt="">
            <p>赶快在朋友圈分享给好友吧~
                <br/>每成功邀请一位好友关注，即可获得20个贝壳币呦！</p>
        </div>
        <invitation-card-rule :show.sync="isRule"></invitation-card-rule>
</template>
<script>
import api from '../../api/index1.js'
import modal from '../../components/Modal.vue'
import btn from '../../components/btn.vue'
import invitationCardRule from '../../components/invitationCardRule.vue'
import DateUtils from '../../utils/DateUtils.js'
import {
    TouchSlide
} from '../../dist/TouchSlide.1.1.js'
export default {
    components: {
        modal,
        btn,
        invitationCardRule,
    },
    data() {
        return {
            isWeek: true,
            isShare: false,
            isRule: false,
            week: false,
            headUrls: [], //打卡总列表
            invitation: [], //邀请数据
            beginDate: '', //开始时间

        }
    },
    created() {
        this.bannerlist();
        this.scoreAndNum();
        // this.$dispatch('loading');
        document.title = '花贝妈妈';
        this.headurl();
        this.groupaddPvUv({type:'25'})
    },
    ready() {
        //banner
        // TouchSlide({
        //     slideCell: "#banner",
        //     titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
        //     mainCell: ".bd ul",
        //     effect: "leftLoop",
        //     autoPlay: true, //自动播放
        //     autoPage: true, //自动分页
        //     delayTime: 200,
        //     interTime: 3500,

        // });

    },
    watch: {
        isWeek(val) {
            this.week = !this.week;
            this.scoreAndNum();
        }
    },
    methods: {
        /**
         * 派发数据统计事件
         */
        // sendStatistics(options, event, trigerName) {

        //     if ('banner' == trigerName) {
        //         options.key = event.target.id;
        //     }
        //     this.$dispatch('statistics', options);
        // },
         groupaddPvUv(options, event, trigerName) {
            if ('banner' == trigerName) {
                options.tab = event.target.id;
            }
            console.log(options)
            this.$dispatch('statistics', options);
        },
        /**
         * banner列表
         */
        bannerlist() {
            var now = new Date().getDate()
                // this.banner1Url = '#!/tips'
                // this.banner1 = 'images/signIn/banner/banner1.png'
                // this.id1 = 'banner1'
            this.banner2Url = '#!/recommend1'
            this.banner2 = 'images/signIn/banner/1.png'
            this.id2 = 'banner'
        },
        /**
         * 获取5人头像
         */
        headurl() {
            api.headurl(this, {}, back => {
                if (back.resCode === '0') {
                    this.headUrls = back.repBody.list || [];
                    // this.moreHeadUrl = this.headUrls.length >= 11 ? !0 : !1;
                    this.isNone = !this.headUrls.length;
                }
            })
        },
        scoreAndNum() {
            var date = new Date();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var currentdate = date.getFullYear() + '-' + month + '-' + (strDate+1);
            var currentdate2 = date.getFullYear() + '-' + month + '-' + '1';

            var week = new Date().getDay();
            if(week == '0'){
                week = 7;
            }
            var date2 =Math.ceil((date - (week-1)*24*60*60*1000) )
            var currentdate3 = DateUtils.formatDate(new Date(date2), 'yyyy-MM-dd')
            if (this.isWeek) {
                this.beginDate = currentdate2;
            } else {
                this.beginDate = currentdate3;
            }
            api.scoreAndNum(this, {
                beginDate: this.beginDate,
                endDate: currentdate
            }, back => {
                if (back.resCode === '0') {
                    this.invitation = back.repBody.list[0] || [];
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.Card {
    background: url(../../images/invitationCard/card-bj2.png) no-repeat !important;
    width: 100%;
    height: 1138px;
    color: #90340D;
    font-family: '黑体';
    // padding-top: 100px;
}

.notice {
    margin: 10px auto 25px;
}

.yqk {
    position: relative;
    width: 100%;
    height: 48px;
    margin: 27px auto;
    a {
        position: relative;
        float: right;
        line-height: 55px;
        color: #90340D;
        padding-right: 20px;
    }
}

.data {
    width: 95%;
    position: relative;
    margin: 10px auto;
    text-align: center;
    font-size: 26px;
    height: 147px;
}

.name {
    background: -webkit-linear-gradient(top, #3DADDC, #274F9B);
    color: #fff;
    width: 290px;
    height: 67px;
    line-height: 67px;
    border-radius: 10px 10px 0px 0px;
}

.num {
    color: #882400;
    background: -webkit-linear-gradient(top, #FFDA02, #FF9603);
    width: 290px;
    height: 80px;
    line-height: 80px;
    border-radius: 0px 0px 10px 10px;
}

.on-off {
    position: absolute;
    top: 0px;
    left: 18px;
    width: 222px;
    height: 48px;
    border-radius: 24px;
    background-color: #F5D16E;
    box-shadow: 2px 3px 2px #999 inset;
    &.off {
        .text:after {
            content: "本月";
            right: 24px;
        }
        label:after {
            left: 1px;
            content: "本周"
        }
    }
    &.on {
        .text:after {
            content: "本周";
            left: 24px;
        }
        label:after {
            right: 1px;
            content: "本月";
        }
    }
    .text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &:after {
            position: absolute;
            top: 0;
            font-size: 24px;
            line-height: 48px;
            color: #90340D;
            font-weight: 700;
        }
    }
    label {
        &:after {
            position: absolute;
            top: 1px;
            width: 111px;
            height: 48px;
            border-radius: 24px;
            background: -webkit-linear-gradient(top, #3DADDC, #274F9B);
            color: #fff;
            line-height: 48px;
            font-size: 24px;
            text-align: center;
        }
    }
}

.friend {
    position: relative;
    padding: 3px 20px;
    p {
        font-size: 26px;
        color: #90340D;
    }
    div {
        position: relative;
        padding-top: 20px;
    }
    li {
        img {
            float: left;
            width: 60px;
            height: 60px;
            margin-right: 15px;
            border-radius: 50%;
            // background: #f2f2f2;
            border: 5px #399BCB solid;
        }
    }
    a {
        position: absolute;
        top: 50%;
        right: -6px;
        margin-top: -8px;
        font-size: 20px;
        color: #7B7B7B;
        z-index: 6;
    }
}

.div1 {
        width: 50%;
    margin: 30px auto;
    color: #fff;
    text-align: center;
    // height: 63px;
    // a {
    //         border: 3px solid #e9d700;
    // padding: 19px 88px;
    // background: -webkit-linear-gradient(top,#fff,#ffc300)!important;
    // color: #000;
    // font-family: FZLTCHJW;
    // border-radius: 15px;
    // box-shadow: 4px 6px 6px #802700;
    // font-weight: 700;
    // font-size: 30px;
    // }
}

.lp {
    width: 280px;

}

.div2 {
    /* position: absolute; */
    /* bottom: 35px; */
    width: 20%;
    margin: 0 auto;
    text-align: center;
}

.rule {
    display: inline-block;
    font-size: 24px;
    text-decoration: underline
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
        text-align: center;
    }
}
</style>
