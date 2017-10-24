<template>
	<div class="app-view" :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		<game-result :success="true"></game-result>
	</div>
</template>
<style lang="scss">
	@import '../../../css/px2rem.scss';
	.app-view {
		height: 100%;
		background-image: url('http://157.255.23.23/images/fsd/ap/20170615/88_34c77635_9c2c_4c84_b3a3_4b64601ac295.png');
		background-size: px2rem(640px);
	}
</style>
<script>
	import gameResult from '../game-result/game-result.config.vue'
	export default {
		components: {
			gameResult
		},
		data() {
			var common = window.store.activityConfig.common;
			return {
				common
			}
		},
	}
</script>