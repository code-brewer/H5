<template>
	<div class="app-view" :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		 <game-result></game-result>
	</div>
</template>
<style lang="scss">
	@import '../../../css/px2rem.scss';
	.app-view {
		height: 100%;
		background-image: url('http://www.soyu.cn/fsd/ap/20160819/88_8c7ceb3b_4750_40f3_ad52_06c77e1fe9a0.png');
		background-size: px2rem(640px);
	}
</style>
<script>
	import gameResult from '../game-result/game-result.vue'
	export default {
		components:{
			gameResult
		},
		data(){
			var common = window.store.activityConfig.common;
			return {
				common
			}
		}, 
	
	}
</script>
