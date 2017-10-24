<template>
	<div class="app-view view-rank" :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		<div class="inner-content">
			<my-rank-info></my-rank-info>
			<rank-list></rank-list>
			<div class="wap-btns" style="padding-top: 20px;">
				<a href="#" class="wap-button" :style="btnStyle">继续闯关</a>
				<a href="#" class="wap-button" :style="btnStyle">去领奖</a>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import "./rank.scss"
</style>
<script>
	import rankList from '../rank-list/rank-list.config'
	import myRankInfo from '../my-rank-info/my-rank-info.config'
	export default {
		components: {
			rankList,
			myRankInfo
		},
		data(){
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
		methods: {
			
		}
	}
</script>
