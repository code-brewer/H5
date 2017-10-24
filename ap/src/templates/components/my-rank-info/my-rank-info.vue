<template>
	<div class="wap-my-rank-info">
		<div class="title" :style="{'color':common.secondColor}">排行榜<div>
		<div class="my-integral">
			<div class="left" :style="{'color':common.secondColor}">
				<slot>我的最高积分</slot>：<span :style="{'color':common.mainColor}">{{info.score}}</span>
			</div>
			<div class="right" :style="{'color':common.secondColor}">
				第<span :style="{'color':common.mainColor}">{{info.rn}}</span>名
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import '../../../css/px2rem.scss';
	.wap-my-rank-info {
		text-align: center;
	    color: #fff;
	    width: 100%;
	    font-weight: bold;
		.title {
			font-size: px2rem(50px);
		}
		.my-integral {
			margin-top:px2rem(50px);
			width: 100%;
			font-size: 0;
			.left {
				width: 70%;
				display: inline-block;
				font-size: px2rem(28px);
			}
			.right {
				font-size: px2rem(26px);
				width: 30%;
				display: inline-block;
				text-align: left;
			}
		}
	}
</style>
<script>
	import api from '../../service'
	export default {
		props: {
			autoQuery: {
				require: true,
				type: Boolean,
				default: true
			}
		},
		data() {
			var common = window.store.activityConfig.common;
			return {
				common,
				info: {score:0,rn:0},
				intf:{dataCallback:null}
			}
		},
		created() {
			if(this.autoQuery) {
				this.getRankInfo('')
			}
		},
		methods: {
			getRankInfo(date) {
				var form = {'date':date};
				api.getUserPrizeInfo(this, form, function(back) {
					if(back.resCode=='0') {
						if(back.repBody.length>0){
							this.setData(back.repBody[0]);
							if(this.intf.dataCallback){
								this.intf.dataCallback(back.repBody[0]);
							}
						}
					}else{
						this.$dispatch('handleServerBack', back);
					}
				}.bind(this))
			},
			setData(data){
				this.info = data;
			},
			updateData(date){
				this.info = {score:0,rn:0};
				var newdate = '';
				if(date){
					newdate = date;
					if(newdate.length>10){
						newdate = newdate.slice(0,10);
					}
				}
				this.getRankInfo(newdate);
			},
			setDataCallback(fun){
				this.intf.dataCallback = fun;
			}
		}
	
	}
</script>
