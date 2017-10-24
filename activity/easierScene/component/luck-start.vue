<template>
	<div class="luck-start">
		<luck-rank :show.sync="showRank" :luck-list="luckList"></luck-rank>
		<div class="hide-list" v-show="false">
			<img v-for="item in list " :src="item.headimg" alt="" />
		</div>
		<div class="main-panl" :style="{'transform':showRank?'translateX(-100%)':'translateX(0%)'}">
			<p class="luck-name">{{$root.activity.title}}</p>
			<div class="luck-info">
				<img :src="list[index].headimg" alt="" />
				<p>{{list[index].uname}}</p>
			</div>
			<div class="start-btn" @click="start" :class="{'game-over':surplussize<=0}">
				{{state?'结束':'开启'}}
			</div>
		</div>
		<div class="show-win" transition="showin" v-show="showWin" @click="showWin=false">
			<div class="mask"></div>
			<div class="info">
				<img class="tx" :src="winInfo.headimg" alt="" />
				<p class="nick">{{winInfo.uname}}</p>
				<div class="light-bg">
					<i class="light" v-for="i in 18" :style="{'transform':'rotate('+$index * 20+'deg)'}"></i>
				</div>
				<div class="star-bg">
					<i class="star" v-for="i in 12" :class="$index%2==0?'big':'small'"></i>
				</div>
				<div class="ribbon-bg">
					<i class="ribbon" v-for="i in 4"></i>
				</div>
				<div class="sp-bg"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '../api/index.js'
	import utils from '../utils/index.js'
	import luckRank from './luck-rank.vue'
	export default {
		components: {
			luckRank
		},
		data() {
			return {
				showRank: false,
				surplussize: 0,
				newList: [],
				list: [{
					'headimg': '',
					'nick': '昵称',
					'uname': ''
				}],
				luckList: [],
				winInfo: {
					'headimg': './image/tx.jpg',
					'nick': '昵称',
					'uname': ''
				},
				temp: {
					info: {},
					index: 0
				},
				success: false, //是否抽奖请求成功
				showWin: false,
				index: 0,
				count: 0,
				isgame: true,
				sec: 1300,
				time: {},
				state: false,
				runing: false,
			}
		},
		watch: {
			state(v) {
				this.count = 0;
			},
			showRank(b) {
				console.log(b);
			}
		},
		ready() {
			this.init();
		},
		beforeDestroy() {
			clearInterval(this.time);
		},
		route: {
			data() {
				this.init();
			}
		},
		methods: {
			init() {
				this.$root.activity.aid = this.$route.params.id;
				this.signList();
				this.selectActivityByAid();
				this.selectSurplusSize();
			},
			getLuckList() {
				api.winList(this, {
					'aid': this.$root.activity.aid,
					'types': this.$root.activity.type
				}, (back) => {
					if(back.resCode == "000000") {
						this.luckList = back.repBody;
					}
				})
			},
			selectSurplusSize() {
				api.selectSurplusSize(this, {
					'aid': this.$root.activity.aid
				}, (back) => {
					if(back.resCode == "000000") {
						this.surplussize = back.repBody.surplussize;
					}
				})
			},
			selectActivityByAid() {
				api.selectActivityByAid(this, {
					'aid': this.$root.activity.aid
				}, (back) => {
					if(back.resCode == "000000") {
						this.$root.activity = back.repBody;
						this.getLuckList();
					}
				})
			},
			doLuck() {
				api.doLuck(this, {
					'moid': this.$root.moid,
					'aid': this.$route.params.id
				}, (back) => {
					this.state = false;
					this.runing = false;
					this.sec = 100;
					if(back.resCode == "000000") {
						this.surplussize -= 1;
						if(back.repBody.length == 0)
							return;
						this.temp.info = back.repBody[0];
						this.success = true;
						this.luckList.push(back.repBody[0]);
						for(var i = 0; i < this.list.length; i++) {
							if(this.temp.info.headimg == this.list[i].headimg) {
								this.temp.index = i;
								this.index = this.temp.index;
								this.winInfo = this.temp.info;
								setTimeout(() => {
									this.showWin = true;
								}, 50)
								return;
							}
						}

					} else {
						this.success = false;
						this.temp.info = this.winInfo;
						this.$root.loadConfig.show = true;
						this.$root.loadConfig.msg = back.resMsg;
					}
				})
			},
			signList() {
				api.signList(this, {
					'moid': this.$root.moid
				}, (back) => {
					this.list = back.repBody;
				})
			},
			setTime() {
				setTimeout(() => {
					this.count += 1;
					if(this.state) {
						if(this.sec >= 300) {
							this.sec -= (this.count * 80);
						}
						this.index = Math.ceil(Math.random() * (this.list.length)) - 1;
						this.setTime();
					} else {
						return;
					}
				}, this.sec)
			},
			start() {
				if(this.surplussize <= 0) return;
				if(!this.runing && !this.state) {
					this.state = true;
					this.runing = true;
					this.sec = 100;
					this.setTime();
				} else if(this.state && this.runing) {
					this.doLuck();

				}
			},
		}
	}
</script>
<style lang="scss">
	/* 必需 */
	
	.showin-transition {
		opacity: 1;
	}
	/* .expand-enter 定义进入的开始状态 */
	/* .expand-leave 定义离开的结束状态 */
	
	.showin-enter,
	.showin-leave {
		opacity: 0;
	}
	
	@keyframes light {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	@keyframes star {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	.luck-start {
		width: 1230px;
		height: 100%;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		font-size: 0;
		.show-win {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 999999;
			.mask {
				background-color: rgba(0, 0, 0, 0.7);
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			.info {
				position: absolute;
				width: 550px;
				height: 550px;
				margin: 0 auto;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				.nick {
					font-size: 51.24px;
					color: white;
					text-align: center;
					width: 100%;
					position: absolute;
					bottom: 10px;
				}
				.sp-bg {
					height: 324px;
					width: 521px;
					position: absolute;
					background-repeat: no-repeat;
					background-size: 100%;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					background-image: url(../image/luck-sp.png);
				}
				.ribbon-bg {
					height: 100%;
					width: 100%;
					position: absolute;
					top: 0;
					left: 0;
					.ribbon {
						background-repeat: no-repeat;
						background-size: 100%;
						position: absolute;
					}
					.ribbon:nth-child(4) {
						background-image: url(../image/ribbon3.png);
						height: 40px;
						width: 62px;
						right: 33px;
						bottom: 85px;
					}
					.ribbon:nth-child(1) {
						background-image: url(../image/ribbon1.png);
						top: 143px;
						left: 50px;
						height: 31px;
						width: 20px;
						transform: rotate(-43deg);
					}
					.ribbon:nth-child(2) {
						background-image: url(../image/ribbon.png);
						height: 11px;
						width: 16px;
						top: 275px;
						left: 20px;
					}
					.ribbon:nth-child(3) {
						background-image: url(../image/ribbon2.png);
						right: 71px;
						top: 75px;
						width: 57px;
						height: 37px;
					}
				}
				.star-bg {
					height: 100%;
					width: 100%;
					position: absolute;
					top: 0;
					left: 0;
					.small {
						animation: star 400ms 200ms linear infinite;
					}
					.big {
						animation: star 400ms 0s linear infinite;
					}
					.star {
						background-image: url(../image/xx.png);
						background-repeat: no-repeat;
						background-size: 100%;
						height: 50px;
						width: 50px;
						position: absolute;
					}
					i:nth-child(1) {
						left: 100px;
						top: 80px;
						transform: scale(1.5);
						opacity: 0.9;
					}
					i:nth-child(2) {
						left: 200px;
					}
					i:nth-child(3) {
						left: 0px;
						transform: scale(0.5);
					}
					i:nth-child(4) {
						left: 338px;
						top: 40px;
						transform: scale(0.7);
					}
					i:nth-child(5) {
						left: 450px;
						top: 35px;
						transform: scale(1.5);
					}
					i:nth-child(6) {
						left: 0px;
						top: 200px;
						transform: scale(0.5);
					}
					i:nth-child(7) {
						left: 50px;
						top: 280px;
						transform: scale(0.5);
					}
					i:nth-child(8) {
						left: 100px;
						top: 400px;
					}
					i:nth-child(9) {
						left: 0px;
						top: 430px;
					}
					i:nth-child(10) {
						left: 470px;
						top: 230px;
						transform: scale(0.6);
					}
					i:nth-child(11) {
						left: 500px;
						top: 400px;
						transform: scale(1.7);
					}
					i:nth-child(12) {
						left: 400px;
						top: 460px;
					}
				}
				.tx {
					height: 296px;
					width: 296px;
					border-radius: 50%;
					margin: 0 auto;
					top: 50%;
					left: 50%;
					position: absolute;
					z-index: 1;
					transform: translate(-50%, -50%);
				}
				.light-bg {
					text-align: center;
					width: 550px;
					animation: light 10s linear infinite;
					height: 550px;
					.light {
						background-image: url(../image/wid.png);
						background-repeat: no-repeat;
						background-size: 100%;
						height: 274px;
						width: 45px;
						transform-origin: bottom;
						position: absolute;
						margin-left: -30px;
					}
				}
			}
		}
		.start-list {
			width: 300px;
			background-color: rgba(255, 255, 255, 0.7);
			height: 100%;
			vertical-align: top;
			display: inline-block;
			p {
				font-size: 24px;
				text-align: center;
				margin: 0;
				padding: 0;
				margin-top: 19px;
				color: #666666;
			}
			.win-info {
				width: 115px;
				height: 110px;
				position: relative;
				text-align: center;
				margin: 20px auto 0px auto;
				img {
					width: 100px;
					height: 100px;
					margin: 0 auto;
					border-radius: 50%;
				}
				span {
					padding: 0;
					margin: 0;
					width: 115px;
					height: 21px;
					border-radius: 3px;
					position: absolute;
					bottom: 0;
					background-color: #FFFFFF;
					color: #666666;
					font-size: 10px;
					line-height: 21px;
					left: 50%;
					margin-left: -57.5px;
					text-align: center;
				}
			}
		}
		.main-panl {
			width: 1168px;
			height: 100%;
			display: inline-block;
			background-color: rgba(255, 255, 255, 0.5);
			position: relative;
			overflow: hidden;
			transition: all 1s;
			.start-btn {
				background-image: url(../image/luck-btn.png);
				background-size: 100%;
				background-repeat: no-repeat;
				width: 210px;
				height: 65px;
				cursor: pointer;
				color: white;
				line-height: 56px;
				font-size: 28px;
				text-align: center;
				margin: 37px auto 0px auto;
			}
			.game-over {
				background-image: url(../image/luck-btn-select.png);
			}
			.luck-info {
				width: 368px;
				height: 50%;
				position: relative;
				text-align: center;
				margin: 100px auto 0px auto;
				img {
					height: 100%;
					border-radius: 50%;
				}
				p {
					padding: 0;
					margin: 0;
					width: 336px;
					height: 65px;
					border-radius: 7px;
					position: absolute;
					bottom: 0;
					background-color: #FFFFFF;
					color: #666666;
					font-size: 29.47px;
					line-height: 65px;
					left: 50%;
					margin-left: -168px;
					text-align: center;
				}
			}
			.luck-name {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				text-align: center;
				font-size: 48px;
				color: #ff0000;
				margin: 30px 0px 0px 0px;
				padding: 0;
			}
		}
	}
</style>