<template>
    <div class="tips">
        <section>
            <p>链接（淘口令）：来来来~美赞臣喊你一起省钱过大年！使用￥美赞中国年￥抢先预览（长按复制整段文案，打开手机淘宝即可进入活动内容）</p>
        </section>
    </div>
</template>
<script>
export default {
    data() {
            return {

            }
        },
        ready() {
            this.$dispatch('title', '提示');
        },
        methods: {

        }
}
</script>
<style scoped>
.tips {
    position: absolute;
    top: 300px;
}

p {
    font-size: 24px;
    text-align: left;
    font-family: 微软雅黑;
    margin: 0 auto;
    width: 80%;
}
</style>
