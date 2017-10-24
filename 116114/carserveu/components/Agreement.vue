<template>
	<div class="agreement-page-wap-view">
		<input type="checkbox" v-model="confirm" />
		<span>我已经阅读并同意</span>
		<a href="#" v-link="{path:'agreement'}">《授权协议》</a>
	</div>
</template>
<script>
	export default {
		props: {
	        confirm: {
	            require: true,
		        type: Boolean,
		        twoWay: true
	        }
	    },
		data() {
			return {
			}
		}
	}
</script>
<style lang="scss">
	@import '../css/design2develop.scss';
	.agreement-page-wap-view {
		width: 100%;
		text-align: center;
		color: #000;
		font-size: des2devrem(28px);
		input{
			width: des2devrem(28px);
			height: des2devrem(28px);
			vertical-align: middle;
		}
		span{
			vertical-align: middle;
		}
		a{
			color: #157efb;
			vertical-align: middle;
		}
	}
</style>