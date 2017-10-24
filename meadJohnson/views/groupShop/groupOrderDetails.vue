<template>
    <div class="group_order_details">
        <div class="lists">
            <div class="orderDetails" v-if="lists.activityType == 0">
                <img :src="lists.pictrueUrl">
                <span>
                <p class = "p1">{{lists.title}}</p>
                <p v-if="lists.coin != 0" style=" color: red;text-align: left;">
                            <img :src="'images/groupShop/hmtj.png'" style="margin: -10px 0px;height: auto;width: 30px;float: inherit;">花妈价：{{lists.coin}}贝壳币</br>
                            <span style="width: 50px;float: none; margin: 0px 145px; height: 30px;"> +{{lists.price}}元</span></p>
                <p v-else style=" color: red;text-align: left;">
                    <img :src="'images/groupShop/hmtj.png'" style="margin: -10px 0px;height: auto;width: 30px;float: inherit;">花妈价：{{lists.price}}元</p>
                <p style=" color: red;padding-left:75px"> 实付：{{lists.price}}元</p>
            </div>
            <div v-else class="orderDetails">
                <img :src="lists.pictrueUrl">
                <span>
                <p class = "p1">{{lists.title}}</p>
                <p style=" color: red;">团购价：{{lists.price}}元</p>
                <p style=" color: red;    padding-left: 25px;">实付：{{lists.price}}元</p>
                   <a class="btn" v-link="{path: '/groupDetails/' + lists.groupid}">查看团购详情</a>
                </span>
            </div>
        </div>
        <div class="con">
            <div style="    overflow: hidden;">
                <ul class="Left">
                    <li>订单状态：</li>
                    <li>订单金额:</li>
                    <li>收货地址：</li>
                    <li>收货人：</li>
                    <li>订单号：</li>
                    <li>下单时间：</li>
                </ul>
                <ul>
                    <li style=" color: red;">{{['','未付款','已失效','已付款','已发货','配送中','已完成','已退款','申请退款','退款中'][lists.status]}}</li>
                    <li style=" color: red;">{{lists.price}}元</li>
                    <li>{{lists.address}}</li>
                    <li>{{lists.name}}</li>
                    <li style="font-size: 22px;">{{lists.id}}</li>
                    <li>{{lists.createTime}}</li>
                </ul>
            </div>
            <div class="foot">
                <a v-if="lists.status == 4||lists.status == 5||lists.status == 6" v-link="{path: '/grouplogistics/'+lists.id}" class="btn">查看物流</a>
                <a v-else class="btn islogistics">查看物流</a>
                <a v-if="lists.status == 8||lists.status == 9" v-link="{path: '/grouprefund/' + lists.groupid}" class="btn refund">查看退款详情</a>
                <a class="btn" v-if="lists.status == 1" v-link="{path: '/groupMain/groupOrder/' + lists.id}">支付订单</a>
            </div>
        </div>
        <!-- 温馨提示弹窗 -->
        <snackbar :show-snack-bar.sync="show" :text="text"></snackbar>
        <!--     <modal v-show="detailsShow">
            <div class="detailsShow">
                <h2>您尚未付款</h2>
                <a class="gopay" v-link="{path: '/groupMain/groupOrder/' + lists.id}">前往付款</a>
                <a class="showclose" @click="ShowClose()">x</a>
            </div>
        </modal> -->
    </div>
</template>
<script>
import api from '../../api/index1.js'
import DateUtils from '../../utils/DateUtils.js'
import snackbar from '../../components/snackbar.vue'
// import modal from '../../components/Modal.vue'
export default {
    components: {
        snackbar,
        // modal
    },
    data() {
        return {
            isLose: false, //是否退款
            // islogistics: false, //是否有物流信息
            lists: {},
            groupOrderId: '',
            show: false, //提示弹窗
            text: '', //提示文字
            // detailsShow: false
        }
    },
    created() {
        // this.$dispatch('loading');
        this.groupOrderId = this.$route.params.id
        document.title = '订单详情';
        this.isGroup = true;
        // this.islogistics = true;
        this.getdetailOrderActivity();
      
    },
    ready() {

    },
    methods: {
        /*
        活动详情
        */
        getdetailOrderActivity() {
            api.detailOrderActivity(this, {
                groupOrderId: this.groupOrderId
            }, back => {
                this.lists = back.object;
                this.lists.createTime = DateUtils.formatDate(new Date(this.lists.createTime), 'yyyy-MM-dd HH:mm:ss');
                this.lists.coin = this.lists.groupPrice.split(',')[1];
                this.lists.price = this.lists.groupPrice.split(',')[0];
                  // this.getaddressFindActivity();
            });
        },
        /**
         * 查看组团详情
         */
        // getgrouopDetail(lists) {
        //     console.log(lists)
        //     this.$router.go({
        //         path: '/groupDetails/' + lists.groupid
        //     });
        // },
        /**
         *关闭弹窗
         */
        // ShowClose() {
        //     this.detailsShow = false;
        // },
        /*
        查看退款详情
        */
        getrefund(lists) {
            console.log(grouplist)
            this.$router.go({
                path: '/grouprefund/' + lists.groupid
            });
        },

    }
}
</script>
<style lang="scss" scoped>
.group_order_details {
    overflow: hidden;
    width: 100%;
    height: 1138px;
    font-family: '黑体';
    font-size: 30px;
    background: url(../../images/invitationCard/card-bj2.png) no-repeat !important;
}

.Left {
    float: left;
}

.btn {
    padding: 5px 20px 5px 20px;
    // text-align: center;
    color: #33838C;
    font-size: 24px;
    border-radius: 30px;
    background: #FFFC00;
}

.islogistics {
    background: #868686;
    color: #fff;
    display: none;
    // margin: 10px 100px;
}

.lists {
    width: 600px;
    margin: 0 auto;
    // text-align: center;
    /* margin-top: 30px; */
    /* padding: 0px 10px 0px 10px; */
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
    }
    p {
        font-size: 24px;
        font-family: 黑体;
        margin: 20px 0px;
        line-height: 30px;
        display: -webkit-box;
    }
    a {
        color: #33838C;
        float: right;
        margin: 30px 30px;
    }
    
        .p1{
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

.con {
    width: 560px;
    height: 480px;
    background: #fff;
    margin: 30px auto;
    border-radius: 15px;
    padding: 30px 0 0 30px;
    font-size: 26px;
    color: #5B5A44;
    li {
        display: -webkit-box;
        line-height: 50px;
    }
}

.orderDetails {
    background: #fff;
    overflow: hidden;
    margin: 20px auto 20px;
    // height: 208px;
    width: 580px;
    /* margin-top: 10px; */
    border: 10px solid #F4CE5D;
    border-radius: 5px;
}

.detailsShow {
    background: #fff;
    text-align: center;
    /* height: 300px; */
    padding-bottom: 20px;
    border-radius: 10px;
    h2 {
        color: red;
        font-size: 36px;
        /* text-align: center; */
        line-height: 60px;
        padding-top: 40px;
    }
    .gopay {
        border: 1px solid;
        border-radius: 10px;
        padding: 10px 20px 10px 20px;
        background: red;
        color: #fff;
        font-size: 30px;
        margin: 60px auto 0px;
        display: block;
        width: 200px;
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
.refund {
    color: #000;
    background: #FFFC00;
    border: 1px solid #FFFC00;
    padding: 10px;
    margin: 0px 10px;
}
.foot {
    margin: 20px 0px;
    display: -webkit-box;
    // display: -ms-flexbox;
    // display: flex; 
    -webkit-box-pack: center;
    // -ms-flex-pack: center;
    justify-content: center;
}
</style>
