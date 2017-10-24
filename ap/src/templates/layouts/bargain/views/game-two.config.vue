<template>
	<div class="game-view-two bargain-bg">

		<div class="btn-panel">
			<div class="wap-button">
				<a>砍TA一刀</a>
			</div>
			<div class="wap-button">
				<a>我也要发起活动</a>
			</div>
		</div>
		<div class="collection-pic-list">
			<div class="title">
				你已经凑够了10刀，还剩下X刀
			</div>
			<ul>
				<li>微信名于2016-02-25 12:20:52为您砍了一刀</li>
				<li>微信名于2016-02-25 12:20:52为您砍了一刀</li>
				<li>微信名于2016-02-25 12:20:52为您砍了一刀</li>
				<li>微信名于2016-02-25 12:20:52为您砍了一刀</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-two {
		overflow: hidden;
		span {}
		.btn-panel {
			width: 100%;
			text-align: center;
			font-size: 0;
			margin-top: px2rem(550px);
			.wap-button {
				margin: 0;
				margin-right: px2rem(60px);
				width: px2rem(231px);
				height: px2rem(66px);
				line-height: px2rem(66px);
				font-size: px2rem(30px);
				display: inline-block;
				a {
					text-decoration: none;
				}
				&:last-child {
					margin-right: 0;
				}
			}
		}
		.collection-pic-list {
			ul {
				padding: 0;
				list-style: none;
				text-align: left;
				height: px2rem(240px);
				overflow-y: auto;
				li {
					font-size: px2rem(22px);
					color: #533e00;
					span {
						color: #e5bd06;
					}
				}
			}
			width: px2rem(582px);
			height: px2rem(200px);
			margin: px2rem(85px) auto 0 auto;
			.title {
				font-size: px2rem(22px);
				text-align: left;
				color: #533e00;
				span {
					color: #f11e08;
				}
			}
		}
	}
</style>