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
			<a class="wap-button"  :style="btnStyle" v-link="{path: '/rank'}" >查看排名</a>
			<a v-link="{path: '/activity'}" class="wap-button" :style="btnStyle" v-if="!gamePass">继续闯关</a>
			<!--<a v-link="{path: '/home'}" class="wap-button" :style="btnStyle" v-if="gamePass">返回首页</a>
			<share-btn class="wap-button" :style="btnStyle"><span>分享得积分</span></share-btn>-->
		</div>
	</div>
</template>
<style lang="scss">
	@import './game-result.scss'
</style>
<script>
	import shareBtn from '../share-btn/share-btn'
	export default {
		components: {
			shareBtn
		},
		props: {
			success: {
				type: Boolean,
				default: false
			}
		},
		data() {
			var common = window.store.activityConfig.common;
			return {
				common,
				gamePass:false
			}
		},
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			},
			score() {
				return /^\d+$/.test(this.$route.params.score) ? this.$route.params.score : '0';
			}
		},
		ready(){
			if(localStorage['aus_game_pass']=="true")
				this.gamePass=true;
			else 
				this.gamePass=false;
		}
	}
</script>