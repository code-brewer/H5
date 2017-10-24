<template>
	<div class="app-view view-rank" :style="{'background-image':common.bgUrl?'url('+common.bgUrl+')':1,'background-color':common.bg}">
		<div class="inner-content">
			<my-rank-info :auto-query="false" v-ref:rankinfo>{{checked?'总积分':'我的最高积分'}}</my-rank-info>
			<rank-list  v-ref:ranklist :checked.sync="checked" :date.sync="date"></rank-list>
			<div class="wap-btns" style="padding-top: 20px;">
				<a  v-link="{path: '/home'}"  class="wap-button" :style="btnStyle" v-if="!gamePass">继续闯关</a>
				<a  v-link="{path: '/home'}"  class="wap-button" :style="btnStyle" v-if="gamePass">返回首页</a>
				<receive-button :date="date" :auto-query="false" :style="btnStyle" v-ref:receivebtn></receive-button>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import "./rank.scss";
</style>
<script>
	import rankList from '../rank-list/rank-list'
	import myRankInfo from '../my-rank-info/my-rank-info'
	import receiveButton from '../button/receive-button'
	export default {
		components: {
			rankList,
			myRankInfo,
			receiveButton
		},
		data(){
			var common = window.store.activityConfig.common;
			return {
				common,
				checked:false,
				gamePass:false,
				date:""
			}
		}, 
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			}
		},
		created() {
		},
		ready(){
			this.$refs.rankinfo.setDataCallback(this.updateData);
			this.refreshData(this.$refs.ranklist.getCurrDate());
			this.$refs.ranklist.setDateCallback(this.refreshData);
			if(localStorage['aus_game_pass']=="true")
				this.gamePass=true;
			else 
				this.gamePass=false;
		},
		methods: {
			updateData(data){
				this.$refs.receivebtn.setData(data);
			},
			refreshData(date){
				this.$refs.rankinfo.updateData(date);
			}
		}
	}
</script>
