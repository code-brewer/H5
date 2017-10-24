<template>
	<div class="game-view-two setlike-bg">
		<!--<div class="img-panel">
			<div class="scroll">
				<img v-for="list in collectionPic" v-if="$index < 3" :src="list.picurl" />
			</div>
		</div>
		<div class="btn-panel">
			<div class="game-btn">
				<span>去领奖</span>
			</div>
		</div>-->

		<div class="collection-pic-list">
			<div class="title">
				目前已有<span>2</span>位好友祝福，加油！
			</div>
			<ul>
				<li><span>微信名</span>于2016-02-25 12:20:52为<span>TA</span>祝福</li>
				<li><span>微信名</span>于2016-02-25 12:20:52为<span>TA</span>祝福</li>
				<li><span>微信名</span>于2016-02-25 12:20:52为<span>TA</span>祝福</li>
				<li><span>微信名</span>于2016-02-25 12:20:52为<span>TA</span>祝福</li>
				<li><span>微信名</span>于2016-02-25 12:20:52为<span>TA</span>祝福</li>
				<li><span>微信名</span>于2016-02-25 12:20:52为<span>TA</span>祝福</li>
			</ul>
		</div>
		<div class="btn-panel">
			<div class="wap-button">
				<a>给TA祝福</a>
			</div>
			<div class="wap-button">
				<a>我也要祝福</a>
			</div>
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
			margin-top:px2rem(40px) ;
			.wap-button {
				margin: 0;
				margin-right: px2rem(60px);
				width: px2rem(275px);
				height: px2rem(70px);
				line-height: px2rem(70px);
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
				text-align: center;
				height: px2rem(240px);
				overflow-y: auto;
				li {
					font-size: px2rem(26px);
					color: #fff;
					span {
						color: #e5bd06;
					}
				}
			}
			width: px2rem(582px);
			height: px2rem(372px);
			border: 1px solid #e5bd06;
			border-radius: 5px;
			background-color: #5d3720;
			margin: px2rem(394px) auto 0 auto;
			.title {
				font-size: px2rem(30px);
				text-align: center;
				margin: px2rem(35px) 0;
				color: #e5bd06;
				span {
					color: #f11e08;
				}
			}
		}
	}
</style>