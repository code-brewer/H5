<template>
	<div class="app-view" :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		<div class="game-result">
			<p class="msg" v-if="success==0" :style="{'color':common.secondColor}">恭喜!</p>
			<p class="msg" v-if="success!=0" :style="{'color':common.secondColor}">抱歉</p>
			<p class="success" v-if="success==0" :style="{'color':common.mainColor}">挑战成功</p>
			<p class="success" v-if="success!=0" :style="{'color':common.mainColor}">挑战失败</p>
			<p class="wap-get-score" v-if="success==0" :style="{'color':common.secondColor}">您的成绩为 : <span :style="{'color':common.mainColor}">{{score}}</span>分</p>
			<p class="wap-get-score" v-if="success!=0">&nbsp;</p>
			<div class="wap-btns">
				<a class="wap-button" :style="btnStyle" v-link="{path: '/home'}">返回首页</a>
				<a v-link="{path: '/activity'}" class="wap-button" :style="btnStyle">再玩一次</a>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import './game-result.scss'
</style>
<script>
	export default {
		data() {
				var common = window.store.activityConfig.common;
				return {
					common,
					type: 0,//0：成功领奖（没有总排行）
					success: 0,
					score:5,
					count:15
				}
			},
			computed: {
				btnStyle: function() {
					return this.$root.btnStyle;
				}
			},
			ready() {
				this.type = this.$route.params.type;
				this.success = this.$route.params.success;
				this.score = this.$route.params.score;
			}
	}
</script>