<template>
    <div class="wap-turntable">
        <div class="pointer"></div>
        <div class="circle-table">
            <div class="prize-place-item" v-for="item in list">{{item.name}}</div>
        </div>
    </div>
</template>
<style src="./style.scss" lang="scss"></style>
<script>
export default {
    data() {
        return {
            // 奖品列表
            list: [{
                name: '谢谢参与',
                isprize: false
            }, {
                name: '一等奖',
                isprize: true
            }, {
                name: '谢谢参与',
                isprize: false
            }, {
                name: '二等奖',
                isprize: true
            }, {
                name: '谢谢参与',
                isprize: false
            }, {
                name: '三等奖',
                isprize: true
            }, ]
        }
    }

}
</script>
