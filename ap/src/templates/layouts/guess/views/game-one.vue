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
			var imgItem = window.store.activityConfig.imgItem;
			return {
				imgItem,
				second: 11,
				selectItem: 0,
				item:[]
			}
		},
		created() {
			this.change();
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
					this.$root.item= [];
					this.item= [];
					this.$root.item.push(this.imgItem[i]);
					this.item.push(this.imgItem[i]);
				}
				setTimeout(() => {
					if(this.second > 1) this.change();
					else {
						this.second -= 1;
						this.$route.router.go({path:'game-two'});
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
				right: 0.15rem;
				top: px2rem(45px);
				font-size: px2rem(72px);
				display: block;
			    width: 7rem;
			    text-align: center;
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