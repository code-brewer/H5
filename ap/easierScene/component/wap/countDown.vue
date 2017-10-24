<template>
	<div class="count-down" :style="style" v-show="show">
		<h3 :class="{scale: isScale}">{{count}}</h3>
	</div>
</template>
<script>
	export default {
		props: {
			style: {
				default: ''
			},
			isScale: {
				default: false
			},
			count: {
				default: 5
			},
			show: {
				default: false
			}
		},
		watch: {
			show(val) {
				console.log(val)
				if (val) {
					this.countDown();
				}
			}
		},
		methods: {
			/**
			 * 倒计时
			 */
			countDown() {
				this.isScale = true;
				this.timer = setTimeout(() => {
					if (this.count == 0) {
						this.show = false;
						clearTimeout(this.timer);
						this.isScale = false;
						this.$dispatch('countDownEnd');
						return;
					}
					
					this.count--;

					setTimeout(() => {
						this.isScale = false;
						this.countDown();
					},0)
				}, 1000);
			}
		}
	}
</script>
<style lang="scss">
	@keyframes scale {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(3);
		}
	}
	.count-down {
		position: absolute;
		top: 50%;
		left: 15%;
		width: 70%;
		height: 200px;
		margin-top: -100px;
		padding: 30px 0;
		text-align: center;
		color: white;
		border-radius: 10px;
		background: #ff7800;
		z-index: 101;
		h3 {
			font-size: 200px;
			color: white;
			line-height: 200px;
			font-weight: 400;
		}
		.scale {
			animation: scale 1s infinite;
		}
	}
</style>