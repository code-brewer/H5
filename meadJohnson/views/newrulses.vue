<template>
    <div class="happy-bg" style="padding-top:46px;box-sizing: border-box;background-attachment: fixed;
    overflow-y: scroll;">
        <a class="dingdanbtn" style="width:390px;height:86px;background:url(images/diandanbtn.png) no-repeat;margin:0 auto;display:block;" href="#!/apply"></a>
        <a class="checkbtn" style="width:390px;height:86px;background:url(images/checkbtn.png) no-repeat;margin:20px auto;display:block;" href="#!/audit"></a>
        <div style="padding-left:30px;padding-right:30px;box-sizing:border-box;padding-bottom:40px;">
            <span class="shuoming" style="line-height:78px;">活动说明</span>
            <p class="contentP">1、提交在京东商城/天猫美赞臣官方旗舰店，一次性购买荷兰版2段/3段产品满299元的“订单截图”；或提交在苏宁易购美赞臣旗旗舰店购买(除爆款商品外)满299元的"订单截图",爆款商品包括:</p>
            <p class="contentP item"><i>*</i>美赞臣安儿宝A+ 960*2 晨意礼盒装；</p>
            <p class="contentP item"><i>*</i>美赞臣2段(6-12月龄较大婴儿适用)安婴宝A+600克X3组合装奶粉；</p>
            <p class="contentP item"><i>*</i>美赞臣2段(6-12月龄较大婴儿适用)安婴宝A+900克罐装奶粉；</p>
            <p class="contentP item"><i>*</i>美赞臣3段(12-36个月)安儿宝A+600克X3组合装奶粉；</p>
            <p class="contentP item"><i>*</i>美赞臣3段(12-36个月)安儿宝A+900克罐装奶粉；</p>
            <p class="contentP item"><i>*</i>美赞臣4段(3岁或以上儿童适用)安儿健A+400克X3组合装奶粉；</p>
            <p class="contentP">2、当“订单截图”通过审核后，提交购买7天后的“好评截图”；</p>
            <p class="contentP">3、2个截图都通过审核后，我们将在1个工作日内为您发送返现红包；</p>
            <p class="contentP">4、截图必须完整、清晰、未PS过，内容必须包含对应订单号、订单日期、购物清单，截图审核的时间为2个工作日；</p>
            <p class="contentP">5、<span style="color:#ff1915;">每个微信号和订单号仅限使用一次。</span></p>
        </div>
</template>
<style scope>
.shuoming {
    font-size: 34px;
    text-align: center;
    color: #6f6f6f;
    display: block;
    line-height: 45px;
}

.contentP {
    font-size: 26px;
    text-align: left;
    color: #6f6f6f;
    line-height: 45px;
}

.item {
    position: relative;
    padding-left: 30px;
}

.item i {
    font-style: normal;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
<script>
import api from '../api'
import Modal from '../components/Modal.vue'


export default {

    components: {
        Modal
    },

    data() {
        return {
            uploadForm: {
                p: basePath + 'shopping/upload/upVideoOrFile',
            }

        }
    },

    ready() {
    },

    methods: {


        closeModal() {
            if (!this.uploadStatus.errorShow && this.photoData.photo_times >= 2) {
                router.go({
                    path: '/audit'
                })
            }

        }

    }

}
</script>
