<template>
	<div class="seat">
		<div class="top-text">
			<div class="time">{{time}}<span>S</span></div>
			<div class="selected-seats">已抢到<span>{{selected}}</span>个座位</div>
		</div>
		<div class="seats-container" :class="{'vip-seats': seatType == 2}">
			<ul class="seat_ul">
				<li class="seat-item" v-for="item in seatsTotal">
					<span v-if="exceptsObj[$index]" class="seat hiden"></span>
					<span v-else class="seat" v-tap="selectSeat($index, $event)"></span>
				</li>
			</ul>
		</div>
		<div class="seats-level">
			<img v-show="seatType==0" class="normal_seat" src="../images/normal_seat.png" alt="">
			<img v-show="seatType==1" class="normal_seat" src="../images/imax_seat.png" alt="">
			<img v-show="seatType==2" class="normal_seat" src="../images/vip_seat.png" alt="">
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import api from '../../../service/index.js'
	import vueTap from 'v-tap'
	Vue.use(vueTap)
	export default {
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
				seatType: 0,
				seatsTotal: 0,
				exceptsObj: {},
				excepts: [],
				selected: 0,
				selectable: true,
				awardSeat: 99,
				selectAwards: [],
				time: 0,
				normal: {
					seatsTotal: 49,
					excepts: [29, 35, 36, 42]
				},
				imax: {
					seatsTotal: 49,
					excepts: [1, 8, 15, 16, 17, 24, 31, 38]
				},
				vip: {
					seatsTotal: 24,
					excepts: [3, 9, 15]
				}
			}
		},
		ready() {
			this.time = this.activityConfig.gameTime

			if(this.activityConfig.seattype == "normal") {
				this.seatType = 0
				this.seatsTotal = this.normal.seatsTotal
				this.excepts = this.normal.excepts
			} else if(this.activityConfig.seattype == "imax") {
				this.seatType = 1
				this.seatsTotal = this.imax.seatsTotal
				this.excepts = this.imax.excepts
			} else {
				this.seatType = 2
				this.seatsTotal = this.vip.seatsTotal
				this.excepts = this.vip.excepts
			}
			this.exceptsObj = {}
			this.excepts.forEach((value, index) => {
				if(!this.exceptsObj[value - 1]) {
					this.exceptsObj[value - 1] = true
				}
			})
		},
		init() {
			// 倒计时
			var timer = setInterval(() => {
				if(!this.time) {
					this.selectable = false
					clearInterval(timer)

					this.addPubScore();
					return
				}
				this.time--
			}, 1000)

			// 出现座位
			var seatTimer = setInterval(() => {
				if(!this.selectable) {
					clearInterval(seatTimer)
				}
				this.randomSeat()
			}, 1000)
		},
		methods: {
			selectSeat(index, e) {
				if(this.selectable) {
					if(e.target.className.indexOf('active') != -1) {
						e.target.className = e.target.className.replace('active', '')
						this.selectAwards.push(index)
						this.selected = this.selectAwards.length;
					}
				}
			},
			randomSeat() {
				var $seatItems = document.querySelectorAll(".seat_ul li");
				var $active = document.querySelector(".seat_ul .active");
				$active ? (function() {
					$active.className = $active.className.replace('active', '')
				})() : ''
				var that = this;
				var fun = function() {
					var flag = true;
					var t = Math.floor(that.seatsTotal * Math.random())
					for(let i = 0; i < that.excepts.length; i++) {
						if((t + 1) == that.excepts[i])
							flag = false;
					}
					if(flag == true) return t + 1;
					else return fun();
				}
				var randomSeat = fun();
				this.awardSeat = randomSeat;
				$seatItems[randomSeat - 1].querySelector('span').className += ' active'
			},
			addPubScore() {
				api.addPubScore(this, {
					"score": this.selected,
					"types": window.store.configData.types
				}, (back) => {
					if(back.resCode == "00000") { //00000表示保存成功
						this.$root.$router.go({
							name: 'success',
							params: {
								type: 0,
								score: back.resMsg
							}
						})
					} else {
						this.$root.$router.go({
							name: 'fail',
							params: {
								type: 0,
								score: back.resMsg
							}
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.seat {
		overflow: hidden;
		display: block;
		.top-text {
			position: absolute;
			top: 1rem;
			left: 50%;
			transform: translateX(-50%);
			width: px2rem(600px);
			height: px2rem(274px);
			background: url(../images/top_text.png) no-repeat 0 0;
			background-size: contain;
			color: #fff;
			.time {
				position: absolute;
				top: 4.5rem;
				left: 50%;
				transform: translateX(-50%);
				font-size: px2rem(72px);
				span {
					font-size: px2rem(48px);
				}
			}
			.selected-seats {
				position: absolute;
				top: 8.6rem;
				left: 50%;
				transform: translateX(-50%);
				font-size: px2rem(30px);
				span {
					padding: 0 5px;
					font-size: px2rem(40px);
					color: #ffb532;
					text-decoration: underline;
				}
			}
		}
	}
	
	.seats-container {
		margin: px2rem(317px) auto 0;
		padding: px2rem(24px) px2rem(24px) px2rem(6px);
		width: px2rem(600px);
		border: 3px solid #ffb532;
		background: #ffe3b1;
		border-radius: 20px;
		&.vip-seats {
			padding: px2rem(24px) px2rem(58px) px2rem(6px);
			ul {
				margin-top: -2.95833rem;
				li,
				.seat-item {
					width: 16.66%;
					margin-top: px2rem(71px);
					.seat {}
				}
			}
		}
		ul {
			margin: 0;
			padding: 0;
			overflow: hidden;
			li,
			.seat-item {
				display: inline-block;
				width: 14.28%;
				.seat {
					margin: 0 auto;
					display: block;
					width: px2rem(70px);
					height: px2rem(71px);
					background: url(../images/seat_normal.png) no-repeat top left;
					background-size: contain;
					&.hiden {
						opacity: 0;
					}
					&.active {
						background-image: url(../images/seat_selected.png);
					}
				}
			}
		}
	}
	
	.seats-level {
		margin-top: px2rem(30px);
		text-align: center;
		.normal_seat {
			width: px2rem(209px);
			height: px2rem(29px);
		}
	}
</style>