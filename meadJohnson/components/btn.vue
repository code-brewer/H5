<template>
	<div class="common-btn">
		<slot></slot>
	</div>
</template>
<script>
	export default {
	}
</script>
<style lang="scss">
	.common-btn {
		display: inline-block;
		width: 206px;
		height: 74px;
		line-height: 72px;
		text-align: center;
		color: white;
		font-size: 30px;
		background: url(../images/conch-coin-btn.png) no-repeat;
		-webkit-background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		background-size: 100% 100%;
	}
</style>