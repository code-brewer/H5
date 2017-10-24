<template>
	<div class="game-view-three truck-bg">
		<div class="img-panel">
			<div class="scroll">
				<img v-for="list in collectionPic" v-if="$index < 3" :src="list.picurl" />
			</div>
		</div>
		<div class="btn-panel">
			<div class="game-btn">
				<span>去领奖</span>
			</div>
		</div>
		<ul class="collection-pic-list">
			<li v-for="i in 3">好友微信名为你抽到了海报名称1</li>
		</ul>

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
	.game-view-three {
		.btn-panel {
			width: 100%;
			position: relative;
			padding-top: px2rem(55px);
			.game-btn {
				margin: 0;
				display: inline-block;
				width: px2rem(235px);
				height: px2rem(90px);
				line-height: px2rem(90px);
				font-size: px2rem(34px);
			}
		}
		.collection-pic-list {
			list-style: none;
			padding: 0;
			padding-top: px2rem(64px);
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