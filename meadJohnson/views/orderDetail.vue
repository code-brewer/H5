<template>
	<div class="orderDetail main">
		<section class="section1">
			<p class="t">订单详情</p>
			<div v-if="state == '2'">
				<p><span class="label">物流公司：</span><span class="text">{{details.logisticsname || '——'}}</span></p>
				<p><span class="label">物流编号：</span><span class="text">{{details.logisticsno || '——'}}</span></p>
			</div>
			<div v-else>
				<p><span class="label">待发货</span></p>
			</div>
		</section>
		<section class="section2">
			<div class="mes">
				<h3>收货信息</h3>
				<div class="con">
					<p><span class="label">收货人姓名：</span><span class="text">{{details.username}}</span></p>
					<p><span class="label">手机号码：</span><span class="text">{{details.mobile}}</span></p>
					<p><span class="label">收货地址：</span><span class="text">{{details.addr}}</span></p>
				</div>
			</div>
			<div class="detail">
				<h3>产品详情</h3>
				<div class="con">
					<p v-if="!details.exchangecode?false:true">券码：{{details.exchangecode}}</p>
					<div>
						<!-- <img :src="img" alt=""> -->
						<div class="text">
							<p>{{details.name}}</p>
						</div>
						<div class="count">
							<p>数量</p>
							<p>x{{details.num}}</p>
						</div>
						<div class="coin">
							<p>贝壳币</p>
							<p class="orange">{{details.price}}</p>
						</div>
					</div>
				</div>
			</div>
			<p class="notice" v-if="show" style="color:#43a4ae;">如有疑问，请在公众号对话框以“客服+你的问题”的格式，将你的问题告诉花妈，花妈会争取尽快回复哒！</p>
			<p class="notice orange" v-else style="color:#43a4ae;"><!-- 请凭此兑换码，在公众号对话框以“兑奖+兑换码”的格式，兑奖可使用的券码，我们将在2个工作日内处理~ -->
			如有疑问，请在公众号对话框以“客服+你的问题”的格式，将你的问题告诉花妈，花妈会争取尽快回复哒！
			</p>
		</section>
	</div>
</template>
<script>
	import api from '../api/index.js'

	export default {
		data() {
			return {
				img: 'images/order-detail-img.jpg',
				details: {
					addr: '',
					logisticsname: '',
					logisticsno: '',
					mobile: '',
					num: '',
					price: '',
					username: '',
					name: ''
				},
				state: '',
				show: true
			}
		},
		created() {
			document.title = '个人中心';
			this.$dispatch('loading');
			this.state = this.$route.params.state;
		},
		ready() {
			this.getMyorderDetail();
		},
		methods: {
			getMyorderDetail() {
				api.getMyorderDetail(this, {oid: this.$route.params.oid}, (data) => {
					if (data.resCode == "0") {
						var list = data.repBody.list[0];
						this.details = list;
						if (list.gid < 1 || list.gid > 6) {
							this.show = true;
						} else {
							this.show = false;
						}
						this.$dispatch('cancelLoading');
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.orderDetail {
		height: 100%;
		.section1 {
			background: #f2f8f8;
			-webkit-box-shadow: 0 0 30px rgba(61,165,175,.4);
			box-shadow: 0 0 30px rgba(61,165,175,.4);
			.t {
				padding: 20px 0;
				font-size: 80px;
				text-align: center;
				color: #3da5af;
			}
			> div {
				padding: 20px 10%;
				color: #3da5af;
				line-height: 1.5;
				font-size: 30px;
				p {
					position: relative;
					min-height: 45px;
					padding-left: 150px;
					.label {
						position: absolute;
						top: 0;
						left: 0;
					}
					.text {
						color: #ff9a46;
					}
				}
			}
		}
		.section2 {
			padding: 30px 5% 50px;
			background: -webkit-linear-gradient(top, #e1f3f4, #c2e9e9);
			background: -moz-linear-gradient(top, #e1f3f4, #c2e9e9);
			background: linear-gradient(top, #e1f3f4, #c2e9e9);
			> div {
				padding-bottom: 20px;
			}
			h3 {
				padding-left: 5%;
				color: #3da5af;
				font-size:42px;
				line-height: 2;
				font-weight: 400;
			}
			.con {
				padding: 30px;
				border-radius: 15px;
				background: white;
				-webkit-box-shadow: 0 0 30px rgba(61,165,175,.4);
				box-shadow: 0 0 30px rgba(61,165,175,.4);
				color: #3da5af;
				font-size: 26px;
			}
			.mes {
				.con {
					p {
						position: relative;
						padding-left: 150px;
						line-height: 50px;
						height: 50px;
						.label {
							position: absolute;
							top: 0;
							left: 0;
						}
					}
				}
			}
			.detail {
				.con {
					
					> div {
						display: -webkit-box;
					    display: -moz-box;
					    display: -ms-flexbox;
					    display: -webkit-flex;
					    display: -moz-flex;
					    display: flex;
							
						> div {
							padding-right: 30px;
							&:last-child {
								padding: 0;
							}
						}
					}
					img {
						width: 60px;
						height: 60px;
						margin-right: 30px;
					}
					.text {
						min-width: 300px;
						-webkit-box-flex: 1;
						-moz-box-flex: 1;
						box-flex: 1;
					}
					.count, .coin {
						text-align: center;
						white-space: nowrap;
					}
					.orange {
						color: #ff9a46;
					}
					> p {
						padding: 0 0 30px 0;
						color: #3da5af;
						font-size: 30px;
						word-break: break-all;
					}
				}
			}
			.notice {
				padding: 10px 3%;
				color: #3da5af;
				font-size: 22px;
				line-height: 1.5;
				&.orange {
					color: #ff9a46;
				}
			}
		}
	}
</style>