<template>
	<!-- 数据总览 -->
	<div class="component-data-overview">
		<div class="component-data-overview-title">
			活动累计
		</div>
		<div class="component-data-overview-box">
			<div class="component-data-overview-item col-md-2">
				<div class="icon"></div>
				<p class="data-qty">{{overviewData.pv.qty}}</p>
				<dl>
					<dd>浏览量(PV)</dd>
				</dl>
			</div>
			<div class="component-data-overview-item col-md-2">
				<div class="icon"></div>
				<p class="data-qty">{{overviewData.uv.qty}}</p>
				<dl>
					<dd>访客量(UV)</dd>
				</dl>
			</div>
			<div class="component-data-overview-item col-md-2">
				<div class="icon"></div>
				<p class="data-qty">{{overviewData.uv.qty}}</p>
				<dl>
					<dd>参与人数</dd>
				</dl>
			</div>
			<div class="component-data-overview-item col-md-2">
				<div class="icon"></div>
				<p class="data-qty">{{overviewData.prize.qty}}</p>
				<dl>
					<dd>中奖人数</dd>
				</dl>
			</div>
			<div class="component-data-overview-item col-md-2">
				<div class="icon"></div>
				<p class="data-qty">{{overviewData.share.qty}}</p>
				<dl>
					<dd>分享数</dd>
				</dl>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../../api/index.js'

	export default {
		props: {
			overviewData: {
				type: Object,
				default: function() {
					return {
						//访问量
						pv: {
							qty: 0,
							yesterday: 0,
							today: 0
						},
						//访问量
						uv: {
							qty: 0,
							yesterday: 0,
							today: 0
						},
						//中奖人数
						prize: {
							qty: 0,
							yesterday: 0,
							today: 0
						},
						//分享数
						share: {
							qty: 0,
							yesterday: 0,
							today: 0
						}
					}
				}
			}
		},
		created() {
			this.$dispatch('refresh', this.getData);
//			this.getData();
		},
		methods: {
			getData() {
				//获取数据总览
				api.searchActivityDataDetail(this, {
					'aid': this.$route.params.aid
				}, (data) => {
					if(+data.resCode) {
						return;
					}
					var list = data.repBody.list,
						that = this;

					function setData(obj, type) {
						var i;
						for(i in obj) {
							if(i === 'day') {
								continue;
							}
							that.overviewData[i][type] = obj[i];
						}
					}
					list.forEach((value) => {
						switch(value.day) {
							case '今天':
								setData(value, 'today');
								break;
							case '昨天':
								setData(value, 'yesterday');
								break;
							case '累计':
								setData(value, 'qty');
								break;
							default:
								break;
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	.component-data-overview {
		width: 100%;
		.component-data-overview-title {
			width: 10%;
			float: left;
			line-height: 9;
		}
		.component-data-overview-box {
			text-align: center;
			font-size: 0;
			.component-data-overview-item {
				display: inline-block;
				font-size: 12px;
				text-align: center;
				box-sizing: border-box;
				vertical-align: center;
				.icon {
					width: 120px;
					height: 97px;
					margin: 0 auto;
				}
				&:nth-child(1) .icon {
					background: url(../../assets/data-overview-icon.png) 0 0 no-repeat;
				}
				&:nth-child(2) .icon {
					background: url(../../assets/data-overview-icon.png) -121px 0 no-repeat;
				}
				&:nth-child(3) .icon {
					background: url(../../assets/join-icon.png) no-repeat;
				}
				&:nth-child(4) .icon {
					background: url(../../assets/data-overview-icon.png) -242px 0 no-repeat;
				}
				&:nth-child(5) .icon {
					background: url(../../assets/data-overview-icon.png) -362.5px 0 no-repeat;
				}
				.data-qty {
					width: 100%;
					margin: 0;
					font-size: 30px;
					line-height: 36px;
					font-weight: 900;
					color: $brand-primary;
					text-align: center;
				}
				dt {
					width: 70px;
					height: 32px;
					line-height: 26px;
					margin: 0 auto 15px auto;
					font-weight: normal;
					border-bottom: 1px solid #e8e8e8;
				}
				dd {
					line-height: 24px;
				}
			}
		}
	}
</style>