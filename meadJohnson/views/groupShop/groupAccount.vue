<template>
    <div class="group_shop">
        <div class="shelter" v-show="fixed"></div>
        <div class="heard">
            <ul>
                <li v-link="{path: '/groupAddress'}">
                    <a href="javascript:;">收货地址</a>
                    <img :src="'images/groupShop/tiaozhuan.png'" alt=""></li>
                <li style="border-top: 1px solid #E6E6E6;">
                    <a href="javascript:;">优惠提醒</a>
                    <input type="checkbox" class="al-toggle-button" @click="getpushUpdate()" value="click" checked="{{this.isPush === 0}}">
                </li>
            </ul>
        </div>
        <div class="tab clearfix" :class="{fixed: fixed}">
            <!--  <div style="width:30%"><a href="javascript:;">订单列表</a></div> -->
            <div style="width:25%" :class="{active: active===1011}" @click="active = 1011,getorder()">全部</div>
            <div style="width:25%;border-left: 1px dashed #fff;" :class="{active: active===1012}" @click="active = 1012,getorder()">待付款</div>
            <div style="width:25%; border-left: 1px dashed #fff;" :class="{active: active===1013}" @click="active = 1013,getorder()">待收货</div>
            <div style="width:24%; border-left: 1px dashed #fff;" :class="{active: active===1014}" @click="active = 1014,getorder()">已完成</div>
        </div>
        <div class="lists">
            <div v-for="list in orderlists">
                <div class="orderDetails" v-if="list.activityType == 0">
                    <img :src="list.pictrue_url" @click="goDetails(list)">
                    <span @click="goDetails(list)">
                    <p class = "p2">{{list.title}}</p>
                    <p v-if="list.coin != 0" style=" color: red;text-align: left;">
                        <img :src="'images/groupShop/hmtj.png'" style="margin: -10px 0px;height: auto;width: 30px;    float: inherit;">花妈价：{{list.coin}}贝壳币</br>
                        <span style="width: 50px;float: none; margin: 0px 149px; height: 30px;"> +{{list.price}}元</span></p>
                    <p v-else style=" color: red;text-align: left;">
                        <img :src="'images/groupShop/hmtj.png'" style="margin: -10px 0px;height: auto;width: 30px;     float: inherit;">花妈价：{{list.price}}元</p>
                    <p style=" color: red; padding-left: 75px;"> 实付：{{list.price}}元</p>
                    </span>
                    <a v-if="list.isrefund == 1" @click="getrefund(list)">申请退款</a>
                    <!-- <a style="display: none;    background: #868686;color: #fff;border: 1px solid #868686;" v-else>申请退款</a> -->
                    <p class="p1">状态：{{['','未付款','已失效', '已付款', '已发货', '配送中', '已完成', '已退款', '申请退款', '退款中'][list.status]}}</p>
                </div>
                <div v-else class="orderDetails" >
                    <img :src="list.pictrue_url" @click="goDetails(list)">
                    <span @click="goDetails(list)"@click="goDetails(list)">
                    <p class = "p2">{{list.title}}</p>
                    <p style=" color: red;" >团购价：{{list.price}}元</p>
                    <p style=" color: red;padding-left: 25px;">实付：{{list.price}}元</p></span>
                    <a v-if="list.isrefund == 1" @click="getrefund(list)">申请退款</a>
                    <!-- <a style=" display: none;   background: #868686;color: #fff;border: 1px solid #868686;" v-else>申请退款</a> -->
                    <p class="p1">状态：{{['','未付款','已失效', '已付款', '已发货', '配送中', '已完成', '已退款', '申请退款', '退款中'][list.status]}}</p>
                </div>
            </div>
            <div v-show="!orderlists.length" style="text-align: center;font-size: 36px;">暂无数据</div>
        </div>
        <modal v-show="detailsShow">
            <div class="detailsShow">
                <h2>确定申请退款？</h2>
                <div style="    margin: 60px 0 10px;">
                    <a class="gorefund" @click="ShowClose()">取消</a>
                    <a class="gorefund" @click="Refund()">确定</a>
                </div>
                <a class="showclose" @click="ShowClose()">x</a>
            </div>
        </modal>
        <!-- 温馨提示弹窗 -->
        <snackbar :show-snack-bar.sync="show" :text="text"></snackbar>
    </div>
</template>
<script>
import api from '../../api/index1.js'
import modal from '../../components/Modal.vue'
import snackbar from '../../components/snackbar.vue'
import DateUtils from '../../utils/DateUtils.js'
export default {
    components: {
        modal,
        snackbar,
        DateUtils,
    },
    data() {
        return {
            active: 1011, //tab切换
            fixed: false, //计划和规则tab置顶
            detailsShow: false,
            isPush: '0', //优惠提示 (1开启， 0关闭)
            clickName: '',
            orderslist: {
                status: "1011",
                // payType: "1",
                current: 1
            },
            orderlists: [],
            // detailsShow: false,
            groupOrderId: '',
            show: false, //提示弹窗
            text: '', //提示文字
            // isRefund: false,

        }
    },
    created() {
        document.title = '我的订单';
        this.getorder();
        this.getpushFind();
    },
    ready() {
        window.onscroll = this.scroll;
    },
    beforeDestroy() {
        window.onscroll = null;
    },

    methods: {
        /**
         * 导航条置顶
         */
        scroll() {
            var top = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            // console.log(top)
            if (top >= 200) {
                this.fixed = true;
            } else {
                this.fixed = false;
            }
        },
        /**
         * 跳转我的订单详情
         */
        goDetails(list) {
            this.$router.go({
                path: '/groupOrderDetails/' + list.id
            });
        },
        /**
         * 获取我的订单
         */
        getorder(){
            var nowtime = DateUtils.formatDate(new Date(), 'yyyy-MM-dd');
            this.orderslist.status = this.active;
            api.orderFindActivity(this, this.orderslist, back => {
                    if (back.list) {
                        back.list.forEach(value => {
                            value.coin = value.money.split(',')[1];
                            value.price = value.money.split(',')[0];
                            value.time = DateUtils.formatDate(new Date(value.modifyTime + 604800000), 'yyyy-MM-dd');
                            value.modifyTime = DateUtils.formatDate(new Date(value.modifyTime), 'yyyy-MM-dd');
                            if (value.activityType == '0') {
                                if ((value.status == '3' || value.status == '6') && (nowtime <= value.time)) {
                                    value.isrefund = 1
                                } else {
                                    value.isrefund = 0
                                }
                            } else {
                                if (value.status == '6' && (nowtime <= value.time)) {
                                    value.isrefund = 1
                                } else {
                                    value.isrefund = 0
                                }
                            };
                        })
                        this.orderlists = back.list;
                        console.log(this.orderlists)
                    }
                
            })
    },
    /**
     * 获取优惠提醒
     */
    getpushFind() {
        api.pushFindActivity(this, {}, back => {
            if (back.success == 1 && back.object != '') {
                this.isPush = back.object[0].isPush;
            }

            // console.log(this.isPush)
        });
    },
    /**
     * 更新优惠提醒
     */
    getpushUpdate() {
        if (this.isPush != 1) {
            console.log(this.isPush)
            this.isPush = 1;
        } else {
            this.isPush = 0;
        };
        api.pushUpdateActivity(this, {
            isPush: this.isPush
        }, back => {
            if (back.success == 1 && back.object != '') {
                this.isPush = back.object.isPush;
                // this.getpus hFind();
            }
        });
    },
    /**
     * 申请退款
     */
    getrefund(list) {
        console.log(list)
        this.groupOrderId = list.id;
        this.detailsShow = true
    },
    /**
     * 确定退款
     */
    Refund() {
        console.log("!!!!!!!!!!!")
        this.detailsShow = false
        api.orderRefund(this, {
            groupOrderId: this.groupOrderId
        }, back => {
            if (back.success == 1) {
                this.$router.go({
                    path: '/grouprefund/' + this.groupOrderId
                });
            } else {
                this.show = true;
                this.text = back.remark;
            }
        });
    },
    /**
     *关闭弹窗
     */
    ShowClose() {
        this.detailsShow = false;
    },
}
}
</script>
<style lang="scss" scoped>
.group_shop {
    width: 640px;
    min-height: 1136px;
    background: #FEF4C8;
    font-size: 26px;
    padding-top: 30px;
}

.heard {
    height: 147px;
    line-height: 60px;
    background: #fff;
    width: 600px;
    margin: 0px auto 30px;
    border-radius: 15px;
    li {
        margin: 13px auto 0;
        width: 560px;
    }
    a {
        // padding: 0px 0 0px 30px;
        font-size: 26px;
    }
    img {
        position: relative;
        left: 397px;
        top: 11px;
    }
}

.al-toggle-button {
    -moz-appearance: none;
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    width: 100px;
    height: 45px;
    background: #FFFC00;
    border-radius: 23px;
    border: 1px solid #dfdfdf;
    outline: 0;
    box-sizing: border-box;
    left: 336px;
    top: 14px;
}

.al-toggle-button:checked {
    background-color: #dfdfdf;
}

.al-toggle-button:before,
.al-toggle-button:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 53px;
    height: 45px;
    border-radius: 27px;
    transition: transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    -webkit-transition: -webkit-transform 0.3s;
}

.al-toggle-button:after {
    width: 45px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

.al-toggle-button:checked:after {
    transform: translateX(-53px);
    -webkit-transform: translateX(-53px);
}

.tab {
    background: -webkit-linear-gradient(top, #3BA3D6, #2A5BA3) !important;
    width: 600px;
    font-size: 12px;
    z-index: 4;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin: 0 auto;
    > div {
        float: left;
        // width: 24%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        font-size: 2.4em;
        &.active {
            color: #FFFF00;
        }
    }
    &.fixed {
        position: fixed;
        top: 30px;
        left: 21px;
        width: 600px;
        margin: 0 auto;
        z-index: 100;
    }
    a {
        color: #fff;
        padding: 5px 20px 5px 20px;
        border: 1px solid #327DBB;
        border-radius: 10px;
        font-size: 30px;
        /* text-align: center; */
        background: -webkit-linear-gradient(top, #274F9B, #3CA9DA) !important;
    }
}

.lists {
    width: 600px;
    margin: 0 auto;
    // text-align: center;
    /* margin-top: 30px; */
    padding: 0px 10px 50px 10px;
    overflow: hidden;
    /* background: #F4CE5D; */
    background: #FEF4C8;
    border-bottom-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    img {
        float: left;
        padding: 10px;
        border-radius: 8px;
        width: 280px;
        height: 280px;
    }
    p {
        font-size: 24px;
        font-family: 黑体;
        margin: 20px 0px;
        line-height: 30px;
        display: -webkit-box;
    }
    .p1 {
        color: #33838C;
        float: right;
        margin: 5px 10px 15px 0;
    }
    .p2 {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
    a {
        border: 1px solid #FFFC00;
        border-radius: 30px;
        padding: 5px 10px;
        background: #FFFC00;
        color: #5B5A44;
    }
}

.shelter {
    width: 100%;
    height: 40px;
    background: #fef4c8;
    z-index: 20;
    position: fixed;
    top: 0;
    left: 0;
}

.orderDetails {
    background: #fff;
    overflow: hidden;
    margin: 0px auto 20px;
    // height: 208px;
    width: 580px;
    /* margin-top: 10px; */
    border: 10px solid #F4CE5D;
    border-radius: 5px;
}

.p1 {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.detailsShow {
    background: #fff;
    text-align: center;
    /* height: 300px; */
    padding-bottom: 20px;
    border-radius: 10px;
    h2 {
        // color: red;
        font-size: 36px;
        /* text-align: center; */
        line-height: 60px;
        padding-top: 40px;
    }
    .gorefund {
        border: 1px solid;
        border-radius: 10px;
        padding: 10px 20px 10px 20px;
        background: red;
        color: #fff;
        font-size: 26px;
        margin: 0 40px;
    }
    .showclose {
        position: absolute;
        top: 0px;
        right: -10px;
        width: 80px;
        height: 80px;
        font-size: 40px;
        // background: url(../../images/groupShop/close.png) no-repeat;
    }
}
</style>
