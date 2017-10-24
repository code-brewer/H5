<template>
    <div class="group_order">
        <div class="head">
            <p class="time"><span>支付剩余时间</span><span>{{time}}</span></p>
            <hr style="height:1px;border:none;border-top:1px solid #858585;width: 560px;" />
            <div v-if="isaddress == false">
                <a @click="addaAddress" class="btn btn_address">新增收货地址</a>
            </div>
            <div v-else>
                <ul>
                    <li style="float: left;border-right: 1px solid #858585;padding: 32px;width: 60px;">收货地址
                    </li>
                    <li>
                        <p>{{address.name}}</p>
                        <p>{{address.address}}</p>
                    </li>
                    <li class="tiaozhuan" @click="updateaddress">
                        <a>{{address.tab = 1 ? '公司':'家庭'}}</a>
                        <img :src="'images/groupShop/tiaozhuan.png'" style="46px" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <div class="con">
            <div class="lists">
                <ul>
                    <li>
                        <img :src="lists.pictrueUrl">
                    </li>
                    <li><span v-if="lists.activityType == 0">
                        <p class = "p1">{{lists.title}}</p>
                        <p v-if="lists.coin != 0" style=" color: red;text-align: left;">
                            <img :src="'images/groupShop/hmtj.png'" style="margin: -5px 0px;height: auto;width: 30px;">花妈价：{{lists.coin}}贝壳币</br>
                            <span style="width: 50px;float: none; margin: 0px 145px; height: 30px;"> +{{lists.price}}元</span></p>
                        <p v-else style=" color: red;text-align: left;">
                            <img :src="'images/groupShop/hmtj.png'" style="margin: -5px 0px;height: auto;width: 30px;">花妈价：{{lists.price}}元</p>
                        </span>
                        <span v-else>
                                <p class = "p1">{{lists.title}}</p>
                                <p style=" color: red;text-align: left;line-height: 60px;">团购价：{{lists.price}}元</p>
                            </span>
                    </li>
                </ul>
            </div>
            <div class="youh">
                <img :src="'images/groupShop/youh.png'">
                <select>
                    <option value="0">无</option>
                </select>
                <div class="price">
                    <span>快递:0.00</span>&nbsp;<span>优惠:<a class="red">{{lists.price}}元</a></span>&nbsp;
                    <span>需支付:<a class="red">{{lists.price}}元</a></span>
                </div>
            </div>
        </div>
        <div class="foot">
            <a class="btn btn_play" @click="payActivity()">立即支付</a>
            <a class="btn btn_play" style="background: #858585;" @click="closeOrder()">取消订单</a>
        </div>
        <!-- 温馨提示弹窗 -->
        <snackbar :show-snack-bar.sync="show" :text="text"></snackbar>
        <!--  弹窗 -->
        <modal :show.sync="detailsShow">
            <div>
                <a href="javascript:;" class="showclose" @click="ShowClose()"></a>
            </div>
        </modal>
    </div>
</template>
<script>
import api from '../../api/index1.js'
import modal from '../../components/Modal.vue'
import snackbar from '../../components/snackbar.vue'
import DateUtils from '../../utils/DateUtils.js'
import wxUtil from '../../dist/wx'
export default {
    components: {
        modal,
        DateUtils,
        snackbar
    },
    data() {
        return {
            detailsShow: false,
            show: false, //提示弹窗
            text: '', //提示文字
            isaddress: false, //是否已有地址
            time: '00:00:00', //倒计时
            address: [], //默认地址
            timer: '',
            // groupOrderId: '',
            grouplist: {},
            pay: {},
            pay1: {},
            lists: [],
            href: location.href.split('#')[0],
            groupOrderId: '',
        }
    },
    created() {
        this.groupOrderId = '';
        this.groupOrderId = this.$route.params.id;
    },
    ready() {
        document.title = '订单详情';
        this.getdetailOrderActivity();   
        },
    methods: {
        /*
        set时间
        */
        setlist() {
            var ctime = DateUtils.formatDate(new Date(this.lists.createTime), 'yyyy-MM-dd HH:mm:ss');
            var time = ctime.split(/[- :]/);
            this.getTime(new Date(time[0], time[1] - 1, time[2], time[3], time[4], time[5]));
        },
        /*
            倒计时
            */
        checkTime(time) {
            return time < 10 ? '0' + time : time;
        },
        countDown(time) {
            this.timer = setTimeout(() => {
                var h = parseInt(time / 1000 / 60 / 60 % 24),
                    m = parseInt(time / 1000 / 60 % 60),
                    s = parseInt(time / 1000 % 60);
                this.time = this.checkTime(h) + ':' + this.checkTime(m) + ':' + this.checkTime(s);
                if (time < 1000) {
                    clearTimeout(this.timer);
                    return false;
                }
                this.countDown(time - 1000);
            }, 1000);
        },
        getTime(createTime) {
            var afterTime = createTime.setMinutes(createTime.getMinutes() + 15),
                time = afterTime - new Date();
            time > 0 ? this.countDown(afterTime - new Date()) : (this.time = '00:00:00', this.payActivity());
        },
        /**
         *关闭弹窗
         */
        ShowClose() {
            this.detailsShow = false;
        },
        /*
        获取地址
        */
        getaddressFindActivity() {
            api.addressFindActivity(this, {}, back => {
                if (back.object == '') {} else {
                    this.address = back.object[0];
                    this.isaddress = true;
                }
            });
        },
        /**
         * 新增地址
         * @return {[type]} [description]
         */
        addaAddress() {
            window.sessionStorage.setItem('groupOrderId', this.groupOrderId);
            this.$router.replace({
                path: '/groupAddress'
            });
        },
        /**
         * 更改地址
         * @return {[type]} [description]
         */
        updateaddress() {
            window.sessionStorage.setItem('groupOrderId', this.groupOrderId);
            this.$router.replace({
                path: '/groupAddress/' + this.groupOrderId
            });
        },
        /*
        活动详情
        */
        getdetailOrderActivity() {
            api.detailOrderActivity(this, {
                groupOrderId: this.groupOrderId,
            }, back => {
                this.lists = back.object;
                this.lists.createTime = DateUtils.formatDate(new Date(this.lists.createTime), 'yyyy-MM-dd HH:mm:ss');
                this.lists.coin = this.lists.groupPrice.split(',')[1];
                this.lists.price = this.lists.groupPrice.split(',')[0];
                this.setlist();
                // if (back.object.address) {
                //     this.address.address = back.object.address;
                //     this.address.name = back.object.name;
                //     this.isaddress = true;
                // } 
                this.getaddressFindActivity();
                // console.log(this.lists.pictrueUrl)
            });
            // console.log(this.lists)
        },
        /*
        取消订单
        */
        closeOrder() {
            api.orderclose(this, {
                groupOrderId: this.$route.params.id,
            }, back => {
                if (back.success == '1') {
                    this.$router.go({
                        path: '/groupMain/groupShop'
                    });
                }
            });
        },
        /*
        提交订单
        */
        payActivity() {
            if (this.address == '') {
                this.show = true;
                this.text = '请添加地址'
            }
            api.payCreateActivity(this, {
                groupOrderId: this.$route.params.id,
                addressId: this.address.id
            }, back => {
                function onBridgeReady() {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": back.allParameters.appId, //公众号名称，由商户传入     
                            "timeStamp": back.allParameters.timeStamp, //时间戳，自1970年以来的秒数     
                            "nonceStr": back.allParameters.nonceStr, //随机串     
                            "package": back.allParameters.package,
                            "signType": back.allParameters.signType, //微信签名方式：     
                            "paySign": back.allParameters.paySign //微信签名 
                        },
                        function(res) {
                            // alert("支付返回"+window.JSON.stringify(res));
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                window.location.href = 'http://www.huabeimama.cn/bbm/#!/groupPay/'+this.groupOrderId;
                                // window.sessionStorage.setItem('id', this.lists.id);
                            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                alert("您取消了支付");
                            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                                alert("支付失败");
                            }
                        }
                    );
                }
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.group_order {
    overflow: hidden;
    width: 100%;
    /* min-height: 1138px; */
    font-family: '\9ED1\4F53';
    font-size: 30px;
    background-size: contain;
    background: url(../../images/invitationCard/card-bj2.png);
}

.head {
    background: #fff;
    color: #7D7D7D;
    width: 604px;
    height: 374px;
    margin: 30px auto 0px;
    border-radius: 10px;
    box-shadow: 0px 2px 5px #888888;
    .time {
        line-height: 1.5;
        text-align: center;
        color: #3C8890;
        padding: 30px 0 0 0;
        span {
            display: block;
            // padding: 30px 0 0 0;
            &:first-child {
                font-size: 1em;
            }
            &:last-child {
                font-size: 2em;
                font-weight: 700;
                color: #ff6100;
            }
        }
    }
    li {
        display: table;
        p {
            margin: 20px 20px;
            width: 300px;
        }
    }
}

.tiaozhuan {
    position: absolute;
    left: 466px;
    top: 325px;
    line-height: 52px;
    a {
        border: 1px solid;
        border-radius: 26px;
        background: #FFFC00;
        color: #7C7C7C;
        width: 70px;
        font-size: 24px;
        text-align: center;
        line-height: 32px;
        padding: 10px 22px;
        box-shadow: 0px -1px 5px #888888;
    }
}

.con {
    background: #F4CE5D;
    border-radius: 10px;
    width: 604px;
    margin: 30px auto;
    // height: 400px;
    box-shadow: 0px 2px 5px #888888;
}

.lists {
    width: 100%;
    margin: 0 auto;
    // text-align: center;
    margin-top: 10px;
    overflow: hidden;
    img {
        float: left;
        padding: 10px;
        border-radius: 8px;
        width: 245px;
        height: 245px;
    }
    span {
        background: #fff;
        width: 316px;
        float: right;
        margin: 10px 10px 0px 0px;
        height: 245px;
        ;
        border-radius: 5px;
    }
    p {
        font-size: 24px;
        font-family: 黑体;
        margin: 2px 1px 1px 2px;
        line-height: 40px;
    }
    .p1 {
        font-size: 22px;
        font-family: 黑体;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: 30px;
    }
}

.youh {
    margin: 15px 22px 36px 60px;
    select {
        width: 314px;
        height: 52px;
        font-size: 1em;
        margin-top: 13px;
        border-radius: 5px;
        /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
        border: solid 1px #7D7D7D;
        /*很关键：将默认的select选择框样式清除*/
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        /*在选择框的最右侧中间显示小箭头图片*/
        background: url("../../images/groupShop/select.png") no-repeat scroll right center;
        /*为下拉小箭头留出一点位置，避免被文字覆盖*/
        padding-right: 49px;
        box-shadow: 1px 1px 2px #7D7D7D inset;
        option {
            width: 300px;
            font-size: 0.5em;
        }
    }
    /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
    select::-ms-expand {
        display: none;
    }
}

.price {
    overflow: hidden;
    display: flex;
    justify-content: center;
    margin: 40px auto;
}

.foot {
    display: flex;
    justify-content: center;
    padding-bottom: 65px;
}

.btn {
    position: relative;
    display: block;
    margin: 15px auto;
    text-align: center;
    color: white;
    font-size: 36px;
    border-radius: 10px;
    box-shadow: 0px 2px 5px #888888;
}

.btn_address {
    background: #FD2929;
    width: 278px;
    height: 72px;
    line-height: 72px;
    position: absolute;
    top: 245px;
    left: 180px;
}

.btn_play {
    background: #2E6CAF;
    width: 240px;
    height: 72px;
    line-height: 72px;
}

.red {
    color: red;
    font-size: 26px;
}

.showclose {
    position: absolute;
    top: -22px;
    right: -55px;
    width: 81px;
    height: 81px;
    background: url(../../images/groupShop/close.png) no-repeat;
}
</style>
