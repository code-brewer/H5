<template>
	<div class="game-result">
		<p class="msg" v-if="success" :style="{'color':common.secondColor}">恭喜!</p>
		<p class="msg" v-if="!success" :style="{'color':common.secondColor}">抱歉</p>
		<p class="success" v-if="success" :style="{'color':common.mainColor}">挑战成功</p>
		<p class="success" v-if="!success" :style="{'color':common.mainColor}">挑战失败</p>
		<p class="wap-get-score" v-if="success" :style="{'color':common.secondColor}">您的成绩为 : <span :style="{'color':common.mainColor}">5</span>分</p>
		<p class="wap-get-score" v-if="!success">&nbsp;
		</p> 
		<div class="wap-btns">
			<a class="wap-button" :style="btnStyle"  v-link="{path: '/home'}" >返回首页</a>
			<a v-link="{path: '/activity'}" class="wap-button" :style="btnStyle">再玩一次</a>
		
		</div>
	</div>
</template>
<style lang="scss">
	@import './game-result.scss'
</style>
<script>
	export default {
		props: {
			success: {
				type: Boolean,
				default: false
			}
		},
		data() {
			var common = window.store.activityConfig.common;
			return {
				common
			}
		},
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			}
		},
	}
</script>