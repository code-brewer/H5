<template>
	<div class="giftDetails">
		<!-- <div class="t">商品详情</div>
		<img :src="'images/giftDetails-img1.jpg'" alt="">
		<div style="padding: 10px 20px;">
			<p>【三只松鼠_开口松子218gx2袋】零食坚果</p>
			<p>炒货东北红松子原味</p>
			<p class="p2 orange">踏青总动员 囤吃正当时 300款零食 3折开抢</p>
			<p class="p3">贝壳币：<span class="orange">{{score}}</span></p>
			<p class="p4">市场价：<span>￥80.00</span></p>
		</div>
		<img :src="'images/giftDetails-img2.png'" style="border: solid #f3f3f3; border-width: 3px 0;"> -->
		<div class="description">
			<div class="desTitle">商品介绍</div>
			<div class="con">{{{good.description}}}</div>
		</div>
		<div class="total clearfix">
			<div class="price">
				<p><span class="orange">{{good.price}}</span>贝壳币</p>
				<p>市场参考价：<span class="orange">￥{{good.referenceprice}}</span></p>
			</div>
			<div class="btn" :class="{disabled: isDisabled}" @click="exchange">确认兑换</div>
		</div>
		<snackbar :show-snack-bar.sync="snackbar.show" :text="snackbar.text" :auto="snackbar.auto"></snackbar>
	</div>
</template>
<script>
	import api from '../api/index1.js'
	import snackbar from '../components/snackbar.vue'
	export default {
		components: {
			snackbar
		},
		data() {
			return {
				snackbar: {
					show: false,
					text: '',
					auto: false
				},
				good: {},
				personScore: '', //个人贝壳币
			}
		},
		created() {
			this.getPersonalInfo();
			this.getGiftDetail();
		},
		computed: {
			score() {
				return this.$route.params.ConchCoin;
			},
			isDisabled() {
				return this.personScore == '' || !this.good.price || !((+this.personScore) >= (+this.good.price));
			}
		},
		methods: {
			/**
			 * 获取个人信息
			 */
			getPersonalInfo() {
				api.getPersonalInfo(this, {}, (data) => {
					if (data.resCode == "0") {
						this.personScore = data.repBody.list[0].v_score;
					}
				})
			},
			/**
			 * 获取礼品具体信息
			 */
			getGiftDetail() {
				api.getGiftDetail(this, {id: this.$route.params.gid}, back => {
					if (back.resCode == '0') {
						let bool = false;
						for(let i in this.gifttype){
							if (new RegExp('#'+back.repBody.list[0].gifttype+'#').test(i)) {
								back.repBody.list[0].gifttype = this.gifttype[i];
								bool = true;
							}
						}
						if (!bool) {
							back.repBody.list[0].gifttype = 'invented2';
						}
						this.good = back.repBody.list[0];
						console.log(this.good)
					}
				})
			},
			/**
			 * 兑换
			 */
			exchange() {
				if (this.isDisabled) {
					this.snackbar.auto = true;
					this.snackbar.text = '贝壳币不足~';
					this.snackbar.show = true;
					return false;
				}
				api.scoreExchangeGiftValidate(this, {gid: this.$route.params.gid}, back => {
					if (back.resCode == '0') {
						this.$router.go({path: '/presentForm/'+this.good.id});
					} else if (back.resCode == '2') {
						this.snackbar.auto = false;
						this.snackbar.text = '亲，这是打卡特权礼品哟，打卡达<span style="color: #f80;">'+back.resMsg+'</span>天才可兑换，先去<a href=index1.jsp"#!/newSignIn/plan" style="color: #f80; font-size: 24px; text-decoration: underline;">打卡</a>吧～';
						this.snackbar.show = true;
					} else {
						this.snackbar.auto = false;
						this.snackbar.text = back.resMsg;
						this.snackbar.show = true;
					}
				})
				//this.$router.go({path: '/Welfaretex1/'+this.good.id});
			}
		}
	}
</script>
<style lang="scss" scoped>
	$orange: #ff9945;
	.giftDetails {
		padding-bottom: 90px;
		font-size: 26px;
		p {
			color: #333;
			font-size: 26px;
			line-height: 1.7;
		}
		.orange {
			color: $orange;
		}
		.p2 {
			font-size: 20px;
		}
		.p3 {
			font-size: 30px;
		}
		.p4 {
			span {
				text-decoration: line-through;
			}
		}
		.t {
			height: 80px;
			line-height: 80px;
			text-align: center;
			background: #f3f3f3;
			-webkit-box-shadow: 0 20px 20px rgba(0,0,0,.3);
			-moz-box-shadow: 0 20px 20px rgba(0,0,0,.3);
			-o-box-shadow: 0 20px 20px rgba(0,0,0,.3);
		}
		.desTitle {
			margin: 30px 20px 10px 20px;
			padding-left: 15px;
			border-left: 3px solid $orange;
		}
		.con {
			padding: 20px;
			font-size: 24px;
			line-height: 36px;
			border-top: 1px solid #d6d6d6;
		}
		.total {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 80px;
			text-align: center;
			border-top: 1px solid #d6d6d6;
			background: white;
			div {
				float: left;
				width: 50%;
			}
			p {
				line-height: 40px;
			}
			.btn {
				font-size: 30px;
				line-height: 80px;
				color: white;
				background: #d42b2b;
				&.disabled {
					background: #aaa;
				}
			}
		}
	}
</style>