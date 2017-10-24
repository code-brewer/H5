<template>
	<a href="javascript:;" class="btn" :class="[bg]"><slot></slot></a>
</template>
<script>
	export default {
		props: {
			bg: {
				default: 'green-bg'
			}
		}
	}
</script>
<style scoped>
	.btn {
		display: block;
		width: 220px;
		height: 80px;
		line-height: 80px;
		text-align: center;
		margin: 40px auto;
		border-radius: 20px;
		color: white;
		font-size: 36px;
		font-weight: 700;
		font-style: italic;
	}
	.btn.orange-bg:active {
		background: #ff5200;
	}
	.btn.green-bg:active {
		background: #00d5a5;
	}
	.green-bg {
		background: url(../images/green-btn.png) 0 0 / 100% 100% no-repeat;
	}
	.orange-bg {
		background: url(../images/orange-btn.png) 0 0 / 100% 100% no-repeat;
	}
</style>