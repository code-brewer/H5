<template>
	<div class="loadding-bar-view " v-show="start">
		<div class="loadding-bar" :class="{'start':start}">
			<div class="bar">
				<div class="bar-inline" :style="{'width':bar+'%','transition': 'width '+sec+'s ease-in'}"></div>
				<i class="first"></i>
				<i class="second"></i>
				<i class="last"></i>
			</div>
			<div class="round">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			sec: {
				Number,
				default: 5
			}
		},
		data() {
			return {
				bar: 5,
				time: {},
				start: true
			}
		},
		methods: {
			chage() {
				this.time = setInterval(() => {
					if(this.bar >= 100) {
						clearInterval(this.time);
						return;
					}
					this.bar += 5;
				}, 100)
			}
		},
		ready() {
			setTimeout(() => {
				this.bar = 100;
			}, 300)
			setTimeout(() => {
				this.start = false;
			}, (this.sec + 1) * 1000)
		} 
	}
</script>
<style lang="scss">
	.loadding-bar-view {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: white;
		z-index: 9999;
		top: 0;
		.loadding-bar {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.bar {
				width: 760px;
				height: 90px;
				box-sizing: border-box;
				border-radius: 45px 0px 0px 45px;
				background-color: #419ce9;
				padding: 10px;
				position: relative;
				.bar-inline {
					border-radius: 40px 0px 0px 40px;
					height: 100%;
					background-color: #3981be;
				}
				i {
					background: url(../image/loading/icon-leaf.png);
					position: absolute;
					width: 60px;
					height: 25px;
					background-repeat: no-repeat;
					right: -5%;
					top: 50%;
					margin-top: -13.5px;
				}
			}
			.round {
				height: 133px;
				width: 133px;
				background: url(../image/loading/icon-load.png);
				background-repeat: no-repeat;
				background-size: 100%;
				position: absolute;
				right: -109.5px;
				top: -24px;
				transition: all 1s;
			}
		}
		.loadding-bar.start {
			.round {
				animation: 1s rounds infinite linear;
			}
			i.first {
				animation: 3s leaf infinite linear;
			}
			i.second {
				animation: 3s leaf .5s infinite linear;
			}
			i.last {
				animation: 3s leaf 2s infinite linear;
			}
		}
	}
	
	@-webkit-keyframes rounds {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	@-webkit-keyframes leaf {
		0% {
			right: -5%;
			transform: rotate(0deg);
		}
		20% {
			transform: rotate(180deg);
		}
		40% {
			transform: rotate(360deg);
		}
		60% {
			transform: rotate(540deg);
		}
		80% {
			transform: rotate(720deg);
		}
		100% {
			right: 90%;
			transform: rotate(900deg);
		}
	}
</style>