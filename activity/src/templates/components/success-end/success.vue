<template>
	<div class="app-view" :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		<div class="game-result">
			<div class="wap-get-score-only" :style="{'color':common.secondColor}"><p>您的成绩为</p>  <p><span :style="{'color':common.mainColor}">{{score}}</span>分</p></div>

			<div class="wap-btns">
				<a class="wap-button" :style="btnStyle"  v-link="{path: '/rank'}" >查看排名</a>
				<a v-link="{path: '/activity'}" class="wap-button" :style="btnStyle">再玩一次</a>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@import '../game-result/game-result.scss';
</style>

<script>
	
	export default {
		data() {
			var common = window.store.activityConfig.common;
			return {
				common,
				score: 0,
			}
		},
		ready() {
			this.score = this.$route.params.score;
		}
		
	}
</script>