<template>
    <div class="group_refund">
        <div class="refund">
            <ul>
                <li>
                    <img :src="'images/groupShop/refund1.png'" style="float: left; margin: 0 20px 0 34px;">
                    <p>退款申请已申请，等待处理</p>
                </li>
                <li><img :src="'images/groupShop/refund4.png'" v-if="issuccess">
                    <img :src="'images/groupShop/refund2.png'" v-else>
                </li>
                <li>
                    <img :src="'images/groupShop/refund5.png'" style="float: left; margin: 0 20px 0 34px;" v-if="issuccess">
                    <img :src="'images/groupShop/refund3.png'" style="float: left; margin: 0 20px 0 34px;" v-else>
                    <p>到账(预计2个工作日)</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import api from '../../api/index1.js'
export default {
    components: {},
    data() {
        return {
            groupOrderId: '',
            issuccess: false,
            list: {}, //订单详情
        }
    },
    created() {
        document.title = '退款详情';
        this.groupOrderId = this.$route.params.id;

        this.getOrderdetail();
    },

    methods: {
        getOrderdetail() {
            api.detailOrderActivity(this, {
                groupOrderId: this.$route.params.id,
            }, back => {
                this.list = back.object;
                if (this.list.status == 7) {
                    this.issuccess = true
                } else {
                    this.issuccess = false
                }
            });
        }

    }
}
</script>
<style lang="scss" scoped>
.group_refund {
    min-height: 1137px;
    background: #E2E2E2;
    color: #7A7A7A;
}

.refund {
    width: 600px;
    margin: 0px auto;
    background: #fff;
    position: relative;
    top: 100px;
    border-radius: 15px;
    li {
        overflow: hidden;
        padding: 10px 0px;
        p {
            line-height: 62px;
            /* display: block; */
            height: 60px;
            font-size: 26px;
        }
    }
}
</style>
