<template>
    <div class="group_user_address">
        <div class="head"><img :src="'images/groupShop/wl.png'" alt=""></div>
        <h2>物流详情</h2>
        <div class="con">
            <ul v-for = "list in lists.Traces">
                <li><p>{{list.AcceptStation}}</p><p>{{
                list.AcceptTime}}</p></li>
            </ul>
        </div>

        <span>物流小哥裸奔ing...</span>
    </div>
</template>
<script>
import api from '../../api/index1.js'
export default {
    components: {},
    data() {
        return {
            lists:{},
        }
    },
    created() {
        // this.$dispatch('loading');
        document.title = '收货地址';
        this.getdetail();
    },
    ready() {},
    methods: {
        /*
        活动详情
        */
        getdetail() {
            api.detailOrderActivity(this, {
                groupOrderId: this.$route.params.id
            }, back => {
                if(back.object.logisticsContent){
                     this.lists = JSON.parse(back.object.logisticsContent);
                }
               
            });
        },
    }
}
</script>
<style lang="scss" scoped>
.group_user_address {
    background: #E2E2E2;
    height: 1137px;
}

h2 {
    margin: 0 0px 0 67px;
    border: 1px solid #FFFC00;
    width: 126px;
    font-size: 26px;
    padding: 6px 6px 6px 24px;
    border-bottom: 1px solid #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: #FFFC00;
    color: #818181;
}

.head {
    img {
        margin: 100px auto 50px;
    }
}

.con {
    width: 600px;
    height: 522px;
    background: #fff;
    margin: 0 auto;
        border-radius: 15px;
    overflow-y: auto;
    li {
    border-bottom: 1px solid #818181;
    /* height: 60px; */
    padding: 10px 0 10px 10px;
    width: 90%;
    margin: 0 auto;
    color: #818181;
    font-size: 26px;

    p{
        margin: 10px 0px 0px 0px;
    }
    }
}
span{
        position: absolute;
    /* top: 100px; */
    bottom: 10px;
    left: 210px;
    color: red;
    font-size: 26px;

}
</style>
