<template>
	<div class="tips">
	<section>
			<p>【粉丝趴】http://c.b1za.com/h.2gFIqR?cv=Plbd7cnaAb&sm=0ced95 点击链接，再选择浏览器打开；或复制这条信息，打开手机淘宝￥Plbd7cnaAb￥</p>
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
.tips{
	position: absolute;
	top:300px;
}

p{
	
    font-size: 24px;
    text-align: left;
    font-family: 微软雅黑;
    margin: 0 auto;
    width: 80%;
}
</style>