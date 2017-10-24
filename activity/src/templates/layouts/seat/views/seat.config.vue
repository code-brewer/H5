<template>
	<div class="seat">
		<div class="top-text">
			<div class="time">{{activityConfig.gameTime}}<span>S</span></div>
			<div class="selected-seats">已抢到<span>X</span>个座位</div>
		</div>
		<seats-type :seat-type="seatsType"></seats-type>
		<div class="seats-level">
			<img v-show="seatsType==0" class="normal_seat" src="../images/normal_seat.png" alt="">
			<img v-show="seatsType==1" class="normal_seat" src="../images/imax_seat.png" alt="">
			<img v-show="seatsType==2" class="normal_seat" src="../images/vip_seat.png" alt="">
		</div>
	</div>
</template>
<script>
	export default {
		components: {
			'seatsType': require('./seats-type')
		},
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
				seatsType: 0
			}
		},
		ready() {
			// console.log('seat config ready')
			this.setSeattype(this.activityConfig.seattype)
		},
		methods: {
			setSeattype(v) {
				switch (v) {
					case 'normal': 
						this.seatsType = 0
						break
					case 'imax':
						this.seatsType = 1
						break
					default:
						this.seatsType = 2
				}
			}
		},
		watch: {
			'activityConfig.seattype' (v, o) {
				this.setSeattype(v)
			},
			'activityConfig.gameTime' (v, o) {
				console.log(v, 1111)
			}
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
					padding:0 5px;
					font-size: px2rem(40px);
					color: #ffb532;
					text-decoration: underline;
				}
			}
		}
	}
</style>