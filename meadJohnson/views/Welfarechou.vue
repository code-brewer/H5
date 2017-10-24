<template>
	<div class="Coinchou main">
		<section class="lijiang">
			<!-- <h1>幸运每天转</h1> -->
			<h1>幸运大转盘</h1>
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
				<img :src="'images/welfarechou/pan.png'" class="lottery">
				<div class="lottery-highlight" v-show="showHighLight" :style="{transform: 'rotate('+rotate+'deg)','background-position': '0 ' + highLight + 'px'}"></div>
				<img :src="'images/welfarechou/pan.png'" class="lotteryTemp" transition="lottery" v-show="showLotteryImg">
				<div class="zhizhen" @click="lottery"></div>
			</div>
			
			<!-- <div class="shangjian"></div> -->
		</section>
		<section class="choujiangguiZe">
			<a class="guiZe" @click="tipModal.show = true">大转盘规则</a>
		</section>
		<!-- <section class="shoptitle">
			<h2>贝壳币商城</h2>
			<div class="huiyuanTex">
				<div class="huiyuanTop">
					<i class="huaduo"></i>全部会员兑换区<i class="hudie"></i>
				</div>
				<div class="con active">
					<div @click="notice1">
						<img class="img" :src="'images/lv1_1.jpg'">
						<span>500贝壳币</span>
					</div>
					<div @click="notice1">
						<img class="img" :src="'images/lv1_2.jpg'">
						<span>1000贝壳币</span>
					</div>
					<div @click="notice1">
						<img class="img" :src="'images/lv1_3.jpg'">
						<span>1000贝壳币</span>
					</div>
					<div @click="notice1">
						<img class="img" :src="'images/lv1_4.jpg'">
						<span>1000贝壳币</span>
					</div>
				</div>
			</div>
			<div class="zhuanqu">
				<div class="huiyuanTop">
					<i class="huaduo" style="left:102px;"></i>LV2、LV3、LV4专区<i class="hudie" style="right:110px;"></i>
				</div>
				<div class="con">
					<div @click="notice1">
						<img class="img" :src="'images/lv2_1.jpg'">
						<span>1000贝壳币</span>
					</div>
					<div @click="notice1">
						<img class="img" :src="'images/lv2_2.jpg'">
						<span>2000贝壳币</span>
					</div>
				</div>
			</div>
			<div class="zhuanqu">
				<div class="huiyuanTop">
					<i class="huaduo" style="left:145px;"></i>LV3、LV4专区<i class="hudie" style="right:150px;"></i>
				</div>
				<div class="con">
					<div @click="notice1">
						<img class="img" :src="'images/lv3_1.jpg'">
						<span>2700贝壳币</span>
					</div>
					<div @click="notice1">
						<img class="img" :src="'images/lv3_2.jpg'">
						<span>4500贝壳币</span>
					</div>
				</div>
			</div>
			<div class="zhuanqu lv4">
				<div class="huiyuanTop">
					<i class="huaduo" style="left:187px;"></i>LV4专区<i class="hudie" style="right:190px;"></i>
				</div>
				<div class="con clearfix">
					<div v-for="list in LV4" @click="notice1" class="item1">
						<div class="img"><img :src="list.img" :class="{imgFull: (list.score == '10000' || list.score == '7000') ? true : false}"></div>
						<span>{{list.score}}贝壳币</span>
					</div>
				</div>
			</div>
		</section> -->
		<welfare-rule :show.sync="tipModal.show"></welfare-rule>
		<faile-tip :show.sync="faileModal.show"></faile-tip>
		<success-tip :show.sync="successModal.show" :gift-name="giftName"></success-tip>
		<no-enough-tip :show.sync="noEnough.show"></no-enough-tip>
		<success-dui :show.sync="successDui.show" :gift-name="giftName"></success-dui>
		<no-times :show.sync="noTimes.show"></no-times>
		<notice :show.sync="notice.show" :text="notice.text"></notice>
		<snackbar :show-snack-bar.sync="snackbarShow" :text="snackbarText"></snackbar>
	</div>

</template>
<script>
import jQuery from 'jquery'
import '../dist/jQueryRotate.js'
import WelfareRule from '../components/lotteryDraw/WelfareRule.vue'
import FaileTip from '../components/lotteryDraw/FaileModal.vue'
import SuccessTip from '../components/lotteryDraw/SuccessModal.vue'
import NoEnoughTip from '../components/lotteryDraw/NoEnough.vue'
import SuccessDui from '../components/lotteryDraw/SuccessDui.vue'
import NoTimes from '../components/lotteryDraw/NoTimes.vue'
import notice from '../components/lotteryDraw/notice.vue'
import snackbar from '../components/snackbar.vue'
import api from '../api/index.js'

	export default {
		components: {
			WelfareRule,
			FaileTip,
			SuccessTip,
			NoEnoughTip,
			SuccessDui,
			NoTimes,
			notice,
			snackbar
		},
		data() {
			return {
				snackbarShow: false,
				snackbarText: '',
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
				rotate: 0 ,//转动角度
				// LV4: [{
				// 		path: '/11/4',
				// 		img: 'images/lv4_34.png',
				// 		score: '519900'
				// 	},
				// 	{
				// 		path: '/12/4',
				// 		img: 'images/lv4_35.png',
				// 		score: '179800'
				// 	},
				// 	{
				// 		path: '/13/4',
				// 		img: 'images/lv4_10.png',
				// 		score: '69000'
				// 	},
				// 	{
				// 		path: '/14/4',
				// 		img: 'images/lv4_22.png',
				// 		score: '43300'
				// 	},
				// 	{
				// 		path: '/15/4',
				// 		img: 'images/lv4_9.png',
				// 		score: '39900'
				// 	},
				// 	{
				// 		path: '/16/4',
				// 		img: 'images/lv4_21.png',
				// 		score: '32900'
				// 	},
				// 	{
				// 		path: '/17/4',
				// 		img: 'images/lv4_27.png',
				// 		score: '32900'
				// 	},
				// 	{
				// 		path: '/18/4',
				// 		img: 'images/lv4_40.png',
				// 		score: '31000'
				// 	},
				// 	{
				// 		path: '/19/4',
				// 		img: 'images/lv4_16.png',
				// 		score: '29900'
				// 	},
				// 	{
				// 		path: '/20/4',
				// 		img: 'images/lv4_26.png',
				// 		score: '29900'
				// 	},
				// 	{
				// 		path: '/21/4',
				// 		img: 'images/lv4_8.png',
				// 		score: '19900'
				// 	},
				// 	{
				// 		path: '/22/4',
				// 		img: 'images/lv4_17.png',
				// 		score: '19900'
				// 	},
				// 	{
				// 		path: '/23/4',
				// 		img: 'images/lv4_28.png',
				// 		score: '15900'
				// 	},
				// 	{
				// 		path: '/24/4',
				// 		img: 'images/lv4_25.png',
				// 		score: '14900'
				// 	},
				// 	{
				// 		path: '/25/4',
				// 		img: 'images/lv4_33.png',
				// 		score: '13800'
				// 	},
				// 	{
				// 		path: '/26/4',
				// 		img: 'images/lv4_23.png',
				// 		score: '12800'
				// 	},
				// 	{
				// 		path: '/27/4',
				// 		img: 'images/lv4_32.png',
				// 		score: '11100'
				// 	},
				// 	{
				// 		path: '/10/4',
				// 		img: 'images/lv4_2.jpg',
				// 		score: '10000'
				// 	},
				// 	{
				// 		path: '/28/4',
				// 		img: 'images/lv4_18.png',
				// 		score: '8900'
				// 	},
				// 	{
				// 		path: '/29/4',
				// 		img: 'images/lv4_24.png',
				// 		score: '7900'
				// 	},
				// 	{
				// 		path: '/30/4',
				// 		img: 'images/lv4_14.png',
				// 		score: '7800'
				// 	},
				// 	{
				// 		path: '/3/4',
				// 		img: 'images/lv4_1.jpg',
				// 		score: '7000'
				// 	},
				// 	{
				// 		path: '/31/4',
				// 		img: 'images/lv4_13.png',
				// 		score: '6000'
				// 	},
				// 	{
				// 		path: '/32/4',
				// 		img: 'images/lv4_19.png',
				// 		score: '5800'
				// 	},
				// 	{
				// 		path: '/33/4',
				// 		img: 'images/lv4_2.png',
				// 		score: '4300'
				// 	},
				// 	{
				// 		path: '/34/4',
				// 		img: 'images/lv4_31.png',
				// 		score: '4000'
				// 	},
				// 	{
				// 		path: '/35/4',
				// 		img: 'images/lv4_3.png',
				// 		score: '3600'
				// 	}
				// ]
				showMenu:false
			}
		},
		created() {
			this.$dispatch('loading');
			document.title = '秘密花园';
			/**
			 * 获取用户贝壳币和剩余抽奖次数
			 */
			api.getScoreAndLotteryCount(this, {}, (data) => {
				if (data.resCode === '0') {
					var list = data.repBody.list[0];
					this.num = list.num < 0 ? 0 : list.num;
					this.score = list.score;
					this.$dispatch('cancelLoading');
				}
				if(data.resCode === '1'){
					this.notice.show = true;
					this.notice.text = '不在活动时间内';
				}
			})
		},
		ready() {
			// this.goLotteryOrShop(this.$route.params.type);
		},
		methods: {
			notice1(){
				this.snackbarShow = true;
				this.snackbarText = '礼品兑换改版升级中，敬请期待';
			},
			/**
			 * 根据锚点类型定位到转盘或者商城
			 * @param  {string} type 锚点类型
			 *
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
			 * 根据返回数据控制转盘停止的角度和弹窗
			 * @param  {object} list 抽奖接口返回的数据
			 *
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
			/**
			 * 抽奖接口调用成功后减少一次抽奖机会和5个贝壳币
			 */
			check() {
				this.num -= 1;
				this.score -= 5;
			},
			/**
			 * 抽奖入口--判断是否满足抽奖条件以及调用抽奖接口
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
						this.rotateDisabled = false;
					},10000);
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
			}
		},
		events: {
			// goShop() {
			// 	this.goLotteryOrShop('shop');
			// },
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
					height: 100%;
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
					background: url(../images/welfarechou/lottery-highlight.png) no-repeat;
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
					background: url(../images/welfarechou/GO.png) no-repeat;
				    position: absolute;
    				top: 50%;
    				left: 50%;
    				margin-left: -63px;
    				margin-top: -105px;
    				z-index: 10;
    				background-size: 100% auto;
				}
			}
			// .guiZe{
			// 	font-size: 34px;
			// 	color: #3ca5b0;
			// 	position:absolute;
			// 	right: 30px;
			// 	bottom:18px;
			// 	text-decoration: underline;
			// }
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
				.img {
					width: 172px;
					height: 147px;
					position: relative;
					border-radius: 10px;
					margin: 25px auto 15px;
					-webkit-box-shadow: 5px 5px 20px rgba(0,0,0,.3);
					-moz-box-shadow: 5px 5px 20px rgba(0,0,0,.3);
					box-shadow: 5px 5px 20px rgba(0,0,0,.3);
					img {
						position: absolute;
						top: 50%;
						left: 50%;
						max-width: 90%;
						max-height: 90%;
						border-radius: 10px;
						-webkit-transform: translate(-50%, -50%);
						-moz-transform: translate(-50%, -50%);
						-o-transform: translate(-50%, -50%);
					}
					img.imgFull {
						max-width: 100%;
						max-height: 100%;
					}
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
			.huiyuanTex{
				width: 90%;
				border-radius: 15px;
				-webkit-box-shadow: 0 10px 30px rgba(61,165,175,.4);
				box-shadow: 0 10px 30px rgba(61,165,175,.4);
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				height: 560px;
				margin:20px auto 0px;
				font-size: 0;
				text-align: center;
				.con{
					position:relative;
					min-height: 490px;
					border-radius: 0 0 15px 15px;
					background: white url(../images/huiyuan.png) no-repeat;
					-webkit-background-size: 100% auto;
					background-size: 100% auto;
					> div {
						float: left;
						width:50%;
						height:50%;
						text-align:center;
						min-height: 245px;
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
			.zhuanqu{
				width: 90%;
				border-radius: 15px;
				-webkit-box-shadow: 0 10px 30px rgba(61,165,175,.4);
				box-shadow: 0 10px 30px rgba(61,165,175,.4);
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				min-height: 315px;
				margin:20px auto 0px;
				text-align: center;
				background:url(../images/fenge.png) 60% 70% no-repeat ;
				background-color: #fff;
				margin-top: 30px;
				.con {
					> div {
						min-height: 245px;
						float: left;
						width: 50%;
					}
				}
			}
			.lv4 {
				background: none;
				background: white;
				.item1:nth-child(even) {
					background:url(../images/fenge.png) left center no-repeat ;
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
	.choujiangguiZe{ 
		.guiZe{
			font-size: 34px; 
			color: #3ca5b0; 
			position: absolute; 
			bottom: 30px; 
			width: 100%; 
			text-decoration: underline; 
			text-align: center; 
			} 
		}

</style>