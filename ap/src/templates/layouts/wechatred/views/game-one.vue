<template>
	<div class="game-view-one wechatred-bg">
		<div class="prizeList">
			<a v-link="{path:'game-two'}">已有{{num}}人抢到</a>
		</div>
		<div class="game-btn" @click="open">抢红包</div>
		<div class="win-panel" v-show="showWin">
			<div class="content">
				<span class="win-close" @click="showWin=false"></span>
				<div class="win-content">
					<p class="pic">{{money}}元</p>
					<p class="msg">现金</p>
				</div>
				<div class="win-msg">
					恭喜您，获得{{money}}元现金红包！
				</div>
			</div>
		</div>
		<div class="nwin-panel" v-show="showNoWin">
			<div class="content">
				<span class="win-close" @click="showNoWin=false"></span>
				<div class="win-msg">
					还差一点就抢到了！
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '../../../service/index.js'
	export default {
		data() {
				return {
					num: 0,
					money: 0,
					showWin: false,
					showNoWin: false
				}
			},
			ready() {
				this.grabNum();
			},
			methods: {
				grabNum() {
					api.grabNum(this, {}, (back) => {
						if(back.resCode == "00000") {
							this.num = back.repBody[0].total;
							
						}
					})
				},
				open() {
					api.open(this, {}, (back) => {
						if(back.resCode == "00000") {
							this.money = back.resMsg;
							this.showWin = true;
						} else {
							this.showNoWin = true;
						}
					})
				}
			}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-one {
		overflow: hidden;
		span {}
		.win-panel {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			background-color: rgba(0, 0, 0, 0.5);
			.content {
				background-image: url(../images/win.png);
				background-size: 100%;
				height: px2rem(420px);
				width: 100%;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				.win-content {
					width: 100%;
					text-align: center;
					.pic {
						margin-top: px2rem(125px);
						font-size: px2rem(40px);
						color: #ec4d35;
					}
					.msg {
						margin-top: px2rem(35px);
						font-size: px2rem(30px);
						color: #ec4d35;
					}
				}
				.win-msg {
					width: 100%;
					text-align: center;
					color: #d97c00;
					font-size: px2rem(24px);
					position: absolute;
					bottom: px2rem(25px);
				}
				.win-close {
					display: block;
					width: px2rem(36px);
					height: px2rem(36px);
					position: absolute;
					right: px2rem(74px);
					background-image: url(../images/close.png);
					background-size: 100%;
				}
			}
		}
		.nwin-panel {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			background-color: rgba(0, 0, 0, 0.5);
			.content {
				background-image: url(../images/nWin.png);
				background-size: 100%;
				height: px2rem(420px);
				width: 100%;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
			.win-msg {
				width: 100%;
				text-align: center;
				color: #d97c00;
				font-size: px2rem(24px);
				position: absolute;
				bottom: px2rem(30px);
			}
			.win-close {
				display: block;
				width: px2rem(36px);
				height: px2rem(36px);
				position: absolute;
				right: px2rem(74px);
				background-image: url(../images/close.png);
				background-size: 100%;
			}
		}
		.prizeList {
			width: 100%;
			padding: px2rem(84px) px2rem(55px);
			text-align: right;
			a {
				color: #fff;
				text-decoration: underline;
				font-size: px2rem(30px);
			}
		}
		.game-btn {
			display: block;
			width: px2rem(180px);
			height: px2rem(180px);
			border-radius: px2rem(90px);
			font-size: px2rem(40px);
			line-height: px2rem(180px);
			text-align: center;
			color: #3d3d3c;
			position: absolute;
			top: px2rem(408px);
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>