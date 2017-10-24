<template>
	<div class="time-panel" v-show="show">
		<div class="time">
			<i :class="'sz'+time"></i>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
				return {
					time: 5,
				}
			},
			props: {
				show: {
					type: Boolean,
					default: false
				}
			},
			watch: {
				show(v) {
					if(v) {
						this.time = 5;
						this.init();
					}
				}
			},
			methods: {
				init() {
					this.$root.time = setInterval(() => {
						if(this.time == 1) {
							this.show = false;
							clearTimeout(this.$root.time);
							return;
						} else {
							this.time -= 1;
						}
					}, 1000)
				}
			}
	}
</script>
<style lang="scss">
	.time-panel {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		.time {
			height: 504px;
			width: 504px;
			margin: 0 auto;
			background-color: rgba(0, 0, 0, 0.8);
			border-radius: 50%;
			margin-top: 20px;
			position: relative;
			i {
				background-image: url(../image/shuzi.png);
				background-repeat: no-repeat;
				display: block;
				height: 270px;
				width: 200px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
			.sz1 {
				background-position: 13px;
			}
			.sz2 {
				background-position: -188px;
			}
			.sz3 {
				background-position: -387px;
			}
			.sz4 {
				background-position: -586px;
			}
			.sz5 {
				background-position: -777px;
			}
		}
	}
</style>