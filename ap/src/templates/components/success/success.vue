<template>
	<div class="app-view" :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		<game-result :success="true"></game-result>
	</div>
</template>

<script>
	import gameResult from '../game-result/game-result.vue'
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