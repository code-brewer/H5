<template>
	<div class="game-view-one truck-bg">
		<div class="img-panel">
			<img :src="collectionPic[0].picurl" />
			<p>
				你抽到了<span>{{collectionPic[0].picname}}</span>
			</p>
		</div>
		<div class="game-btn">
			<span>确定</span>
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
	.game-view-one {
		text-align: center;
		.img-panel {
			img {
				margin: px2rem(109px) px2rem(74px) px2rem(0px) px2rem(74px);
				width: px2rem(305px);
			}
			p {
				text-align: center;
				margin-top: px2rem(20px);
				font-size: px2rem(30px);
				color: #000000;
				span {
					font-size: px2rem(30px);
					color: #ed6c00;
					text-decoration: underline;
				}
			}
		}
	}
</style>