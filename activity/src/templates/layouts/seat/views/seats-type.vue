<template>
    <div class="seats-container" :class="{'vip-seats': seatType == 2}">
        <ul>
            <li class="seat-item" v-for="item in seatsTotal">
                <span v-if="exceptsObj[$index]" class="seat hiden"></span>
                <span v-else class="seat"></span>
            </li>
        </ul>
    </div>
</template>
<script>
	export default {
        props: {
            seatType: {
                type: Number,
                default: 0
            }
        },
		data() {
            var activityConfig = window.store.activityConfig
			return {
                activityConfig,
                seatsTotal: 0,
                exceptsObj:{},
                excepts: [],
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
            this.setSeat(this.activityConfig.seattype)
	    },
        watch: {
            'activityConfig.seattype' (v, o){
                this.setSeat(v)
            }
        },
        methods:  {
            setSeat(v) {
                if(v == "normal") {
                    this.seatType = 0
                    this.seatsTotal = this.normal.seatsTotal
                    this.excepts = this.normal.excepts
                }else if(v == "imax") {
                    this.seatType = 1
                    this.seatsTotal = this.imax.seatsTotal
                    this.excepts = this.imax.excepts
                } else {
                    this.seatType = 2
                    this.seatsTotal = this.vip.seatsTotal
                    this.excepts = this.vip.excepts
                }

                this.exceptsObj = {}

                this.excepts.forEach((value,index) => {
                    if(!this.exceptsObj[value-1]) {
                        this.exceptsObj[value-1] = true
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
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
                    .seat {
                       
                    }
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
                    margin:0 auto;
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