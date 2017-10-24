<template>
    <div class="group_pay">
        <div class="head"><img :src="'images/groupShop/pay.png'" alt=""></div>
        <div class="foot">
            <a v-link="{path: '/groupMain/groupShop'}" class="btn btn_home">返回首页</a>
            <a v-link="{path: '/groupOrderDetails/'+id}" class="btn btn_ord">查看订单</a>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            id: '',
        }
    },
    ready() {
        this.id = this.$route.params.id;
    },
    methods: {
        
    }
}
</script>
<style lang="scss" scoped>
.group_pay {
    width: 100%;
    height: 1138px;
    font-family: '黑体';
    font-size: 30px;
    background: url(../../images/invitationCard/card-bj2.png) no-repeat !important;
}

.head {
    padding: 200px 0px 100px 0px;
    img {
        width: 100%;
    }
}

.foot {
    display: flex;
    justify-content: center;
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

.btn_ord {
    background: #FD2929;
    width: 278px;
    height: 72px;
    line-height: 72px;
}

.btn_home {
    background: #2E6CAF;
    width: 240px;
    height: 72px;
    line-height: 72px;
}
</style>
