<template>
	<div class="game-view-one guess-bg">
		<div class="game-panel">
			<a class="time">{{second}}S</a>
			<div class="img-panel">
				<img :src="item[selectItem].imgUrl">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			//			var imgItem = window.store.activityConfig.imgItem;
			return {
				imgItem: [],
				second: 10,
				selectItem: 0,
				item: [{
					imgUrl: 'http://www.soyu.cn/fsd/ap/20161107/88_01cf6d0d_1d4b_407b_9909_1a19e545d89c.png',
					title: ''
				}, {
					imgUrl: 'http://www.soyu.cn/fsd/ap/20161107/88_2e71b3a3_c776_4491_97a3_ea466a71c751.png',
					title: ''
				}, {
					imgUrl: 'http://www.soyu.cn/fsd/ap/20161107/88_5f404e07_62d3_4253_80eb_6516ed760adb.png',
					title: ''
				}, {
					imgUrl: 'http://www.soyu.cn/fsd/ap/20161107/88_a079ceff_7da8_459c_8ebf_c539a1d286e7.png',
					title: ''
				}]
			}
		},
		ready() {
			//			this.change();
		},
		methods: {
			change() {
				this.second -= 1;
				var i = Math.floor(Math.random() * this.imgItem.length);
				if(this.second != 10) {
					this.selectItem += 1;
					this.$root.item.push(this.imgItem[i]);
					this.item.push(this.imgItem[i]);
				} else {
					this.$root.item = [];
					this.item = [];
					this.$root.item.push(this.imgItem[i]);
					this.item.push(this.imgItem[i]);
				}
				setTimeout(() => {
					if(this.second > 1) this.change();
					else {
						this.second -= 1;
						console.log('时间到')
					}
				}, 1000)
			},
		}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-one {
		padding: px2rem(80px) px2rem(40px) 0 px2rem(40px);
		.game-panel {
			background-image: url(../images/img-bg.png);
			height: 100%;
			width: 100%;
			background-size: 100%;
			background-repeat: no-repeat;
			position: relative;
			.time {
				text-decoration: none;
				color: #fff;
				position: absolute;
				right: px2rem(30px);
				top: px2rem(45px);
				font-size: px2rem(72px);
			}
			.img-panel {
				position: absolute;
				width: px2rem(490px);
				height: px2rem(490px);
				top: px2rem(200px);
				left: 50%;
				margin-left: px2rem(-245px);
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>