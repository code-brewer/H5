<template>
	<div class="login">
		<div class="logo">
			
		</div>
		<button class="wxLogin">微信登录</button>
		<button class="phoneLogin" v-link="{path: '/phoneLogin/'}">手机号登录</button>
		<p class="text">登录即表示您同意聚优惠的使用条款和隐私政策</p>
	</div>
</template>
<script type="text/javascript">
	
</script>
<style lang="scss" scoped>
	
	.logo {
		height: 400px;
		background: url(../images/center/juyouhui.png) no-repeat center;
		background-size: 70%;
		margin-bottom: 20px;

	}
	.wxLogin {
			background-color: #22ad38;
			display: block;
			margin: 30px auto;
			
		}
	.phoneLogin {
		background-color: #00a8cc;
		display: block;
		margin: 0 auto;
	}	
	button {
		width: 270px;
		height: 70px;
		font-size: 25px;
		color: #fff;
		border-radius: 5px;
		text-shadow: 1px 1px 1px #333;
	}
	.text {
		margin-top:  200px;
		font-size: 24px;
		text-align: center;
		padding-bottom: 130px;
	}
</style>