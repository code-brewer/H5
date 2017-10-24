<template>
	<div class="app-view" :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		<div class="game-result">
			<p class="msg" :style="{'color':common.secondColor}">恭喜!</p>
			<p class="success" :style="{'color':common.mainColor}">挑战成功</p>
			<p class="wap-get-score" :style="{'color':common.secondColor}">您的成绩为 : <span :style="{'color':common.mainColor}">{{score}}</span>分</p>
			<p class="wap-get-score">&nbsp;</p>
			<div class="wap-btns">
				<a class="wap-button" v-if="type==0" :style="btnStyle" v-link="{path: '/home'}">返回首页</a>
				<a v-link="{path: '/activity'}" v-if="type==0" class="wap-button" :style="btnStyle">再玩一次</a>
				<a class="wap-button" v-if="type==1" :style="btnStyle" v-link="{path: '/rank'}">查看排行</a>
				<a v-link="{path: '/activity'}" v-if="type==1" class="wap-button" :style="btnStyle">继续闯关</a>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import '../game-result/game-result.scss'
</style>
<script>
	export default {
		data() {
			var common = window.store.activityConfig.common;
			return {
				common,
				type: 0, //0：成功领奖（没有总排行）
				score: 5,
				count: 15
			}
		},
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			}
		},
		ready() {
			this.type = this.$route.params.type;
			this.score = this.$route.params.score;
		}
	}
</script>