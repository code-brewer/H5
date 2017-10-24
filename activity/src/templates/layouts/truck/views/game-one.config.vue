<template>
	<div class="game-view-two truck-bg">
		<div class="img-panel">
			<div class="scroll">
				<img v-for="list in collectionPic" v-if="$index<3" :src="list.picurl" />
			</div>
		</div>

		<ul class="collection-pic-list">
			<li>好友 <span>微信名</span>邀请你协助TA集卡</li>
		</ul>
		<div class="btn-panel">
			<div class="game-btn">
				<span>帮TA集卡</span>
			</div>
			<div class="game-btn">
				<span>我也要集卡</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				collectionPic: [{
					picname: '', //卡名
					origincnt: '0', //卡数
					odds: '1', //卡概率
					picurl: 'http://211.147.242.132:9008/fsd/ap/20160805/88_e125d1b6_d6f0_447b_9e91_22fbfa439226.jpg', //卡地址
					href: '',
					name: ''
				}, {
					picname: '', //卡名
					origincnt: '0', //卡数
					odds: '1', //卡概率
					picurl: 'http://211.147.242.132:9008/fsd/ap/20160805/88_e125d1b6_d6f0_447b_9e91_22fbfa439226.jpg', //卡地址
					href: '',
					name: ''
				}, {
					picname: '', //卡名
					origincnt: '0', //卡数
					odds: '1', //卡概率
					picurl: 'http://211.147.242.132:9008/fsd/ap/20160805/88_e125d1b6_d6f0_447b_9e91_22fbfa439226.jpg', //卡地址
					href: '',
					name: ''
				}]
			}
		},
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-two {
		.btn-panel {
			width: 100%;
			position: relative;
			padding-top: px2rem(116px);
			.game-btn {
				margin: 0;
				display: inline-block;
				width: px2rem(200px);
				height: px2rem(75px);
				line-height: px2rem(75px);
				font-size: px2rem(34px);
			}
		}
		.collection-pic-list {
			list-style: none;
			padding: 0;
			padding-top: px2rem(89px);
			li {
				span {
					color: #ed6c00;
				}
			}
		}
		text-align:center;
		.img-panel {
			position: relative;
			.scroll {
				white-space: nowrap;
				width: 100%;
				padding-top: px2rem(124px);
				img {
					width: px2rem(145px);
					margin-right: px2rem(10px);
					height: 100%;
				}
			}
		}
	}
</style>