<template>
	<div class="game-result">
		<p class="msg" v-if="success" :style="{'color':common.secondColor}">恭喜!</p>
		<p class="msg" v-if="!success" :style="{'color':common.secondColor}">抱歉</p>
		<p class="success" v-if="success" :style="{'color':common.mainColor}">挑战成功</p>
		<p class="success" v-if="!success" :style="{'color':common.mainColor}">挑战失败</p>
		<p class="wap-get-score" v-if="success" :style="{'color':common.secondColor}">您的成绩为 : <span :style="{'color':common.mainColor}">5</span>分</p>
		<p class="count" :style="{'color':common.secondColor}">总成绩为 : <span :style="{'color':common.mainColor}">5</span>分</p>
		<p class="wap-get-score" v-if="!success">&nbsp;
		</p> 
		<div class="wap-btns">
			<a class="wap-button" :style="btnStyle"  v-link="{path: '/rank'}" >查看排名</a>
			<a v-link="{path: '/activity'}" class="wap-button" :style="btnStyle">继续闯关</a>
		
		</div>
		<!--<div class="wap-links">
			<a href="javascript:;" class="wap-button" :style="btnStyle">活动排名</a>
		</div>-->
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