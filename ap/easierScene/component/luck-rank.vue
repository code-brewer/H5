<template>
	<div class="luck-rank" :class="{'chickenin':showAnimation==1,'chickenout':showAnimation==2}">
		<div class="left" @click="change">
			<span>{{showAnimation==1?'返回抽奖':'获奖用户'}}</span>
		</div>
		<div class="rank-panl">
			<div class="user" v-for="item in luckList">
				<i></i>
				<i></i>
				<i :style="{'background-position-x':'-'+($index*84+10)+'px'}"></i>
				<img :src="item.headimg">
				<p>{{item.uname}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '../api/index.js'
	import utils from '../utils/index.js'
	export default {
		props: {
			show: {
				Boolean,
				default: false
			},
			luckList: {
				Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				showAnimation: 0,
				item: {
					headimg: 'http://wx.qlogo.cn/mmopen/fmKoP7EsoQ4p4Dy4ia4kkHQsOxLX6SicbKEianfRRuxxCGvfoXKLiaY1GBiaEBuSOVWtDz80ThFRlU1v8JDl5nzYrEAk8h2ZWsynP/0'
				}
			}
		},
		watch: {
			showAnimation(v) {
				if(v == 2) {
					this.show = false;
				} else {
					this.show = true;
				}
			}
		},
		ready() {

		},
		methods: {
			change() {
				if(this.showAnimation != 1)
					this.showAnimation = 1
				else
					this.showAnimation = 2
			}
		}
	}
</script>
<style lang="scss">
	@keyframes chickenin {
		from {
			margin-left: -62px;
			transform: translateX(100%);
		}
		to {
			margin-left: 0px;
			transform: translateX(0%);
		}
	}
	
	@keyframes chickenout {
		from {
			margin-left: 0px;
			transform: translateX(0%);
		}
		to {
			margin-left: -62px;
			transform: translateX(100%);
		}
	}
	
	.chickenin {
		animation: chickenin 1s forwards;
	}
	
	.chickenout {
		animation: chickenout 1s forwards;
	}
	
	.luck-rank {
		width: 1230px;
		min-width: 100%;
		min-height: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		margin: 0 auto;
		position: absolute;
		margin-left: -62px;
		transform: translateX(100%);
		.left {
			width: 62px;
			height: 100%;
			background-color: rgba(255, 255, 255, 0.5);
			position: absolute;
			left: 0;
			top: 0;
			cursor: pointer;
			z-index: 9;
			box-sizing: border-box;
			span {
				position: absolute;
				top: 50%;
				width: 100%;
				padding: 20px;
				font-size: 20px;
				box-sizing: border-box;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
		.rank-panl {
			width: 100%;
			height: 100%;
			position: relative;
			padding-top: 20px;
			padding-left: 62px;
			.user {
				margin-top: 40px;
				margin-left: 45px;
				display: inline-block;
				vertical-align: top;
				width: 175px;
				height: 229px;
				background: url(../image/chicken.png) no-repeat;
				background-size: 100%;
				position: relative;
				i {
					position: absolute;
					display: block;
					background-size: 100%;
					&:nth-child(1) {
						width: 8px;
						height: 8px;
						top: 68px;
						left: 2px;
						background: url(../image/small.png) no-repeat;
					}
					&:nth-child(2) {
						width: 20px;
						height: 20px;
						top: 45px;
						left: -11px;
						background: url(../image/min.png) no-repeat;
					}
					&:nth-child(3) {
						width: 80px;
						height: 80px;
						top: -32px;
						left: -40px;
						background: url(../image/big.png) no-repeat;
						background-position: -15px -11px;
					}
				}
				img {
					display: block;
					width: 133px;
					height: 133px;
					margin: 0 auto;
					border-radius: 50%;
					position: absolute;
					top: 47px;
					left: 26px;
				}
				p {
					position: absolute;
					bottom: 2px;
					width: 120px;
					height: 30px;
					padding: 0;
					margin: 0;
					text-align: center;
					left: 50%;
					font-size: 20px;
					margin-left: -53px;
					line-height: 30px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>