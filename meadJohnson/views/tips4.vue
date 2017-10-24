<template>
	<div class="tips">
	<section>
			<a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIxMzU5NzA3MQ==&scene=123#wechat_redirect">链接地址为:https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIxMzU5NzA3MQ==&scene=123#wechat_redirect</a>
			
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