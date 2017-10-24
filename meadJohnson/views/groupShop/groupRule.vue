<template>
    <div class="group_rule">
        <div class="group_con">
            <p class="items">我拍下后的产品什么时候发货？ </br>
            您好，花妈商城您参团并成功后除特殊商品外，花妈将在48小时内发货。 </p>
            </br>
			<p class="items">
            没有收到货/发错地址了怎么办？ </br>您可在已发货订单里查看物流单号，并点击查看物流，查看发货信息。物流信息不准确可以联系花妈小助手核实并要求处理。
            </p>
        </div>
    </div>
</template>
<script>
export default {
    components: {

    },
    props: {
        show: false
    },
    created() {
        document.title = '团购规则';
    },
}
</script>
<style lang="scss">
.group_rule {
    background: #E2E2E2;
    height: 1137px;
    padding-top: 100px;
    text-align: left;
}

.group_con {
    width: 520px;
    margin: 0px auto;
    /* padding-top: 100px; */
    background: #fff;
    font-size: 30px;
    border-radius: 15px;
    border: 10px solid #F4CE5D;
    padding: 25px;
}
</style>
