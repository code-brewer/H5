<template>
	<div class="wap-my-rank-info">
		<div class="title" :style="{'color':common.secondColor}">排行榜<div>
		<div class="my-integral">
			<div class="left" :style="{'color':common.secondColor}">
				我的最高积分：<span :style="{'color':common.mainColor}">2500</span>
			</div>
			<div class="right" :style="{'color':common.secondColor}">
				第<span :style="{'color':common.mainColor}">27</span>名
			</div>
		</div>
		<!--<p :style="{'color':common.secondColor}">我的积分:<span :style="{'color':common.mainColor}">100</span></p>
		<p :style="{'color':common.secondColor}" >第<span :style="{'color':common.mainColor}">1</span>名</p>-->
	</div>
</template>
<style lang="scss">
	@import '../../../css/px2rem.scss';
	.wap-my-rank-info {
		text-align: center;
	    color: #fff;
	    margin-top: 2.5rem;
	    width: 100%;
	    font-weight: bolder;
		.title {
			font-size: px2rem(50px);
		}
		.my-integral {
			margin-top:px2rem(50px);
			width: 100%;
			font-size: 0;
			.left {
				width: 70%;
				display: inline-block;
				font-size: px2rem(28px);
			}
			.right {
				font-size: px2rem(26px);
				width: 30%;
				display: inline-block;
				text-align: left;
			}
		}
	}
</style>
<script>
	export default {
		props: {
			date: {
				type: String
			}
		},
		data(){
			var common = window.store.activityConfig.common;
			return{
				common
			}
		}
	}
</script>
