<template>
	<div class="app-view" :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		 <game-result></game-result>
	</div>
</template>
<style lang="scss">
	@import '../../../css/px2rem.scss';
	.app-view {
		height: 100%;
		background-size: px2rem(640px);
	}
</style>
<script>
	import gameResult from '../game-result/game-result.config.vue'
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
