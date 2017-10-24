<template>
	<div class="Coinchou main">
		<section class="lijiang">
			<h1>幸运每天转</h1>
			<p>每花5个贝壳币换一次抽奖机会,100%中奖哦!</p>
			<div class="Cointime">
				<div class="CointimeL">
					<p class="CointimeLtop">我的贝壳币</p>
					<p class="CointimeLbtm">{{score}}</p>
				</div>
				<div class="CointimeR">
					<p class="CointimeLtop" style="width:190px;margin:0 auto;">今天还剩余抽奖次数</p>
					<p class="CointimeLbtm">{{num}}次</p>
				</div>
			</div>

		</section>
		<section class="choujiangqu">
			<div class="choujianpan">
				<img :src="'images/pan.png'" class="lottery">
				<div class="lottery-highlight" v-show="showHighLight" :style="{transform: 'rotate('+rotate+'deg)','background-position': '0 ' + highLight + 'px'}"></div>
				<img :src="'images/pan.png'" class="lotteryTemp" transition="lottery" v-show="showLotteryImg">
				<div class="zhizhen" @click="lottery"></div>
			</div>
			<a class="guiZe" @click="tipModal.show = true">抽奖规则</a>
			<div class="shangjian"></div>
		</section>
		<section class="shoptitle">
			<h2>贝壳币商城</h2>
			<div class="huiyuanTex" v-if="gifts.LV1.length == 0 ? false : true">
				<div class="huiyuanTop">
					<i class="huaduo"></i>全部会员兑换区<i class="hudie"></i>
				</div>
				<div class="con active clearfix">
					<div v-for="list in gifts.LV1" v-link="{path: '/presentDetails/'+list.id+'/1/'+list.price}">
						<img :src="list.picurl">
						<span>{{list.name}}</span>
					</div>
					<!-- <div v-link="{path: '/goodsDetail/5/1/500'}">
						<img :src="'images/lv1_1.jpg'">
						<span>500贝壳币</span>
					</div>
					<div v-link="{path: '/goodsDetail/1/1/1000'}">
						<img :src="'images/lv1_2.jpg'">
						<span>1000贝壳币</span>
					</div>
					<div v-link="{path: '/goodsDetail/7/1/1000'}">
						<img :src="'images/lv1_3.jpg'">
						<span>1000贝壳币</span>
					</div>
					<div v-link="{path: '/goodsDetail/4/1/1000'}">
						<img :src="'images/lv1_4.jpg'">
						<span>1000贝壳币</span>
					</div> -->
				</div>
			</div>
			<div class="zhuanqu" v-if="gifts.LV2.length == 0 ? false : true">
				<div class="huiyuanTop">
					<i class="huaduo" style="left:102px;"></i>LV2、LV3、LV4专区<i class="hudie" style="right:110px;"></i>
				</div>
				<div class="con clearfix">
					<div v-for="list in gifts.LV2" v-link="{path: '/presentDetails/'+list.id+'/2/'+list.price}">
						<img :src="list.picurl">
						<span>{{list.name}}</span>
					</div>
					<!-- <div v-link="{path: '/goodsDetail/8/2/1000'}">
						<img :src="'images/lv2_1.jpg'">
						<span>1000贝壳币</span>
					</div>
					<div v-link="{path: '/goodsDetail/6/2/2000'}">
						<img :src="'images/lv2_2.jpg'">
						<span>2000贝壳币</span>
					</div> -->
				</div>
			</div>
			<div class="zhuanqu" v-if="gifts.LV3.length == 0 ? false : true">
				<div class="huiyuanTop">
					<i class="huaduo" style="left:145px;"></i>LV3、LV4专区<i class="hudie" style="right:150px;"></i>
				</div>
				<div class="con clearfix">
					<div v-for="list in gifts.LV3" v-link="{path: '/presentDetails/'+list.id+'/3/'+list.price}">
						<img :src="list.picurl">
						<span>{{list.name}}</span>
					</div>
					<!-- <div v-link="{path: '/goodsDetail/2/3/2700'}">
						<img :src="'images/lv3_1.jpg'">
						<span>2700贝壳币</span>
					</div>
					<div v-link="{path: '/goodsDetail/9/3/4500'}">
						<img :src="'images/lv3_2.jpg'">
						<span>4500贝壳币</span>
					</div> -->
				</div>
			</div>
			<div class="zhuanqu" v-if="gifts.LV4.length == 0 ? false : true">
				<div class="huiyuanTop">
					<i class="huaduo" style="left:187px;"></i>LV4专区<i class="hudie" style="right:190px;"></i>
				</div>
				<div class="con clearfix">
					<div v-for="list in gifts.LV4" v-link="{path: '/presentDetails/'+list.id+'/4/'+list.price}">
						<img :src="list.picurl">
						<span>{{list.name}}</span>
					</div>
					<!-- <div v-link="{path: '/goodsDetail/3/4/7000'}">
						<img :src="'images/lv4_1.jpg'">
						<span>7000贝壳币</span>
					</div>
					<div v-link="{path: '/goodsDetail/10/4/10000'}">
						<img :src="'images/lv4_2.jpg'">
						<span>10000贝壳币</span>
					</div> -->
				</div>
			</div>
		</section>
		<welfare-rule :show.sync="tipModal.show"></welfare-rule>
		<faile-tip :show.sync="faileModal.show"></faile-tip>
		<success-tip :show.sync="successModal.show" :gift-name="giftName"></success-tip>
		<no-enough-tip :show.sync="noEnough.show"></no-enough-tip>
		<success-dui :show.sync="successDui.show" :gift-name="giftName"></success-dui>
		<no-times :show.sync="noTimes.show"></no-times>
		<notice :show.sync="notice.show" :text="notice.text"></notice>
	</div>

</template>
<script>
import vue from 'vue'
import jQuery from 'jquery'
import '../dist/jQueryRotate.js'
import WelfareRule from '../components/lotteryDraw/WelfareRule.vue'
import FaileTip from '../components/lotteryDraw/FaileModal.vue'
import SuccessTip from '../components/lotteryDraw/SuccessModal.vue'
import NoEnoughTip from '../components/lotteryDraw/NoEnough.vue'
import SuccessDui from '../components/lotteryDraw/SuccessDui.vue'
import NoTimes from '../components/lotteryDraw/NoTimes.vue'
import notice from '../components/lotteryDraw/notice.vue'
import api from '../api/index1.js'

	export default {
		components: {
			WelfareRule,
			FaileTip,
			SuccessTip,
			NoEnoughTip,
			SuccessDui,
			NoTimes,
			notice
		},
		data() {
			return {
				tipModal: {
					show: false
				},
				faileModal: {
					show: false
				},
				successModal: {
					show: false
				},
				noEnough: {
					show: false
				},
				successDui: {
					show: false
				},
				noTimes:{
					show: false
				},
				notice: {
					show: false,
					text: ''
				},
				rotateDisabled: false, //禁止重复点击抽奖
				gifts: {
					"0": {
						angle: 23,
						highLight: '-3500'
					},
					"100": {
						angle: 68,
						highLight: '-3000'
					},
					"50": {
						angle: 113,
						highLight: '-2500'
					},
					"30": {
						angle: 158,
						highLight: '-2000'
					},
					"20": {
						angle: 203,
						highLight: '-1500'
					},
					"10": {
						angle: 248,
						highLight: '-1000'
					},
					"5": {
						angle: 293,
						highLight: '-500'
					},
					"2": {
						angle: 340,
						highLight: '0'
					}
				},
				num: '0', //抽奖次数
				score: '0', //我的贝壳币
				showLotteryImg: false, //控制遮层转盘
				giftName: '0', //抽中奖品
				highLight: '0', //转盘高亮位置
				showHighLight: false, //转盘高亮位置
				rotate: 0, //转动角度
				gifts: {}
			}
		},
		created() {
			this.$dispatch('loading');
			document.title = '秘密花园';
			//贝壳币数和当日剩余的抽奖次数
			api.getScoreAndLotteryCount(this, {}, (data) => {
				if (data.resCode === '0') {
					var list = data.repBody.list[0];
					this.num = list.num < 0 ? 0 : list.num;
					this.score = list.score;
					this.$dispatch('cancelLoading');
				}
			})
			this.getGiftList();
		},
		ready() {
			this.goLotteryOrShop(this.$route.params.type);
		},
		methods: {
			/**
			 * [定位到锚点位置]
			 * @param  {string} type [锚点]
			 */
			goLotteryOrShop(type) {
				setTimeout(() => {
					if (type == 'shop') {
						var height = jQuery('.shoptitle').offset().top;
						jQuery('body').animate({'scrollTop': height+'px'}, 'fast');
					} else {
						jQuery('body').animate({'scrollTop': 0}, 'fast');
					}
				},500);
			},
			/**
			 * [转盘转动]
			 * @param  {Object} list [后台返回的数据]
			 */
			rotateFunc(list) {
				var $lotteryImg = jQuery('.lottery'),
					self = this;
				this.rotate = this.gifts[list.score].angle;
				$lotteryImg.rotate({
					angle: 0,
					duration: 3000,
					animateTo: this.gifts[list.score].angle + 2160,
					easing: function(e, f, a, h, g) {return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a },
					callback: () => {
						this.showHighLight = true;
						setTimeout(() => {
							if (+list.score > 0) {
								this.giftName = list.score;
								this.score += +list.score;
								this.successDui.show = true;
							} else {
								this.giftName = list.prize;
								this.successModal.show = true;
							}
							this.rotateDisabled = false;
						},1000);
					}
				})
			},
			check() {
				this.num -= 1;
				this.score -= 5;
			},
			/**
			 * [调取抽奖接口]
			 */
			lottery() {
				if (!this.rotateDisabled) {
					this.rotateDisabled = true;

					//判断抽奖条件是否满足
					if (+this.num <= 0) {
						this.noTimes.show = true;
						this.rotateDisabled = false;
						return false;
					}
					if (+this.score < 5) {
						this.faileModal.show = true;
						this.rotateDisabled = false;
						return false;
					}
					
					this.showHighLight = false;
					this.showLotteryImg = true;
					jQuery('.lottery').rotate(0);
					var time = setTimeout(() => {
						this.notice.show = true;
						this.notice.text = '亲,正在抢修中～请稍候再试！';
						this.showLotteryImg = false;
					},7000);
					api.addLottery(this, {}, (data) => {
						if (data.resCode === '0') {
							clearTimeout(time);
							this.showLotteryImg = false;
							var list = data.repBody.list[0];
							if (list.prize.indexOf('抽奖次数已用完') > -1) {
								this.noTimes.show = true;
							} else if (list.prize.indexOf('贝壳币数不足') > -1) {
								this.faileModal.show = true;
							} else if (list.flag == "1") {
								this.notice.show = true;
								this.notice.text = '矮油！您今天赚的贝壳币都装不下啦（每日上限300贝壳币），明天再来玩呗~';
								this.check();
								this.rotateDisabled = false;

							} else {
								this.check();
								this.highLight = this.gifts[list.score].highLight;
								this.rotateFunc(list);
							}
						}
					})
				}
			},
			getGiftList() {
				api.getGiftList(this, {}, back => {
					if (back.resCode == '0') {
						this.gifts = back.repBody;
					}
				})
			}
		},
		events: {
			goShop() {
				this.goLotteryOrShop('shop');
			},
			setOverflow(val) {
				val ? this.$dispatch('hidden') : this.$dispatch('auto');
			}
		}
	}
</script>
<style lang="scss">
	.Coinchou {
		padding-bottom: 76px;
		.section1 {
			width: 90%;
			border-radius: 15px;
			-webkit-box-shadow: 0 53px 40px rgba(61,165,175,.4);
			box-shadow: 0 53px 40px rgba(61,165,175,.4);
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
		}
		.section1 {
			height: 365px;
			padding-top:0;
			margin:0 auto;
			font-size: 0;
			text-align: center;
			background: #fff;
			.secTop{
				width:100%;
				height:70px;
				background:#3ea4b0;
				border-top-left-radius:17px;
				border-top-right-radius:17px;
				box-sizing: border-box;
				color:#fff;
				font-size:32px;
				line-height: 70px;
				text-align: center;

			}
			.texBi{
				width: 120px;
				font-size: 32px;
				color: #3ea4b0;
				display: inline-block;
    			margin: 0 auto;
			}
		}
		
		.lijiang{
			h1{
				font-family: '黑体';
				font-size: 60px;
				color: #3da5af;
				text-align: center;
				line-height:100px;
			}
			p{
				font-family: '黑体';
				font-size: 28px;
				color: #3da5af;
				text-align: center;
				line-height:30px;
			}
			.Cointime{
				margin: 20px 5%;
    			padding: 40px 20px 50px;
    			text-align: center;
    			border-radius: 15px;
    			
    			background:url(../images/fenge.png) 60% 50% no-repeat ;
    			background-color:#fff;
    			-webkit-box-shadow: 0 0px 20px rgba(61,165,175,.4);
				box-shadow: 0 0px 20px rgba(61,165,175,.4);
				display: flex;
				.CointimeL{
					flex:1;
					.CointimeLtop{
						font-size: 32px;
						color: #ff9a46;
						line-height: 35px;
					}
					.CointimeLbtm{
						font-size: 56px;
						color: #ff9a46;
						padding-top:50px;
						font-weight: bold;

					}
				}
				.CointimeR{
					flex:1;
					.CointimeLtop{
						font-size: 32px;
						color: #ff9a46;
						line-height: 35px;
					}
					.CointimeLbtm{
						font-size: 56px;
						color: #ff9a46;
						padding-top:20px;
						font-weight: bold;
					}
				}
			}

		}
		.choujiangqu{
			position:relative;
			overflow: hidden;
			.choujianpan{
				position: relative;
				width: 500px;
				height: 500px;
				margin: 0 auto;
				img {
					display: block;
					width: 100%;
				}
				.lottery-gift,.lottery-highlight,.lotteryTemp {
					position: absolute;
					top: 0;
					left: 0;
				}
				.lottery-gift {
					z-index: 5;
				}
				.lottery-highlight {
					width: 100%;
					height: 100%;
					background: url(../images/lottery-highlight.png) no-repeat;
					background-size: 100% auto;
					z-index: 3;
				}
				.lottery-enter {
					animation: rotate 40s linear infinite;
					-webkit-animation: rotate 40s linear infinite;
				}
				.zhizhen{
					width: 130px;
					height: 193px;
					background: url(../images/GO.png) no-repeat;
				    position: absolute;
    				top: 50%;
    				left: 50%;
    				margin-left: -63px;
    				margin-top: -105px;
    				z-index: 10;
    				background-size: 100% auto;
				}
			}
			.guiZe{
				font-size: 34px;
				color: #3ca5b0;
				position:absolute;
				right: 30px;
				bottom:18px;
				text-decoration: underline;
			}
			.shangjian{
				width: 37px;
				height: 23px;
				background:url(../images/shangla.png) no-repeat;
				margin:0 auto;
			}
		}
		.shoptitle{
			h2{
				font-family: '黑体';
				font-size: 60px;
				color: #3da5af;
				text-align: center;
				line-height:100px;
			}
			.con {
				img {
					display: block;
					width: 172px;
					height: 147px;
					border-radius: 10px;
					margin: 25px auto 15px;
					-webkit-box-shadow: 5px 5px 20px rgba(0,0,0,.3);
					-moz-box-shadow: 5px 5px 20px rgba(0,0,0,.3);
					box-shadow: 5px 5px 20px rgba(0,0,0,.3);
				}
				span {
					display: block;
					font-size: 27px;
					color: #3ea4b0;
				}
				&.active {
					span {
						color: #3ea4b0;
					}
				}
			}
			.huiyuanTop{
				width:100%;
				height:70px;
				background:#3ea4b0;
				border-top-left-radius:15px;
				border-top-right-radius:15px;
				box-sizing: border-box;
				color:#fff;
				font-size:32px;
				line-height: 70px;
				text-align: center;
				position:relative;
				.huaduo{
					width: 37px;
					height: 39px;
					background:url(../images/huaduo.png) no-repeat;
				    position: absolute;
					left: 134px;
					top: 11px;
				}
				.hudie{
					width: 33px;
					height: 19px;
					background:url(../images/hudie.png) no-repeat;
				    position: absolute;
					right: 143px;
					top: 8px;
				}
			}
			.huiyuanTex,.zhuanqu {
				width: 90%;
				margin:20px auto 0px;
				border-radius: 15px;
				text-align: center;
				-webkit-box-shadow: 0 10px 30px rgba(61,165,175,.4);
				box-shadow: 0 10px 30px rgba(61,165,175,.4);
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				.con {
					padding-bottom: 10px;
					border-radius: 0 0 15px 15px;
					background-color: white;
					> div {
						float: left;
						width: 50%;
						height: 235px;
						&:nth-child(even) {
							background: white url(../images/fenge.png) left center no-repeat ;
						}
					}
				}
			}
			.huiyuanTex{
				font-size: 0;
				.con{
					position:relative;
					//height: 490px;
					border-radius: 0 0 15px 15px;
					// background: white url(../images/huiyuan.png) no-repeat;
					// -webkit-background-size: 100% auto;
					// background-size: 100% auto;
				}
			}
		}

	}
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(36000deg);
		}
	}
	@-webkit-keyframes rotate {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(36000deg);
		}
	}
</style>