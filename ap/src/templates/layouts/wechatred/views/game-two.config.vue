<template>
	<div class="game-view-two wechatred-bg">
		<div class="title">抽奖记录</div>
		<div class="content-title">
			已派发20个红包，共160.00元
		</div>
		<ul class="list">
			<li>
				<div class="left">
					<img src="../images/1.jpg" />
					<div class="text-panel">
						<p class="name">小红帽</p>
						<p class="time">2016-12-16 22:58:11</p>
					</div>
				</div>
				<div class="right">
					<p>20元</p>
				</div>
			</li>
			<li>
				<div class="left">
					<img src="../images/1.jpg" />
					<div class="text-panel">
						<p class="name">小红帽</p>
						<p class="time">2016-12-16 22:58:11</p>
					</div>
				</div>
				<div class="right">
					<p>20元</p>
				</div>
			</li>
			<li>
				<div class="left">
					<img src="../images/1.jpg" />
					<div class="text-panel">
						<p class="name">小红帽</p>
						<p class="time">2016-12-16 22:58:11</p>
					</div>
				</div>
				<div class="right">
					<p>20元</p>
				</div>
			</li>
			<li>
				<div class="left">
					<img src="../images/1.jpg" />
					<div class="text-panel">
						<p class="name">小红帽</p>
						<p class="time">2016-12-16 22:58:11</p>
					</div>
				</div>
				<div class="right">
					<p>20元</p>
				</div>
			</li>
		</ul>
		<div>
			<p class="btn-back">返回</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				img: '../images/1.ipg'
			}
		},
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-two {
		.btn-back{
			width:px2rem(510px);
			height:px2rem(75px);
			background-color: #ef3031;
			font-size:px2rem(26px);
			color:#fff;
			border-radius:px2rem(5px);
			text-align:center;
			margin:px2rem(30px) auto;
			line-height:px2rem(75px);
		}
		background-image: url(../images/game-bg2.jpg);
		overflow: hidden;
		.title {
			margin-top: px2rem(88px);
			font-size: px2rem(40px);
			color: #ffd800;
			text-align: center;
		}
		.content-title {
			margin-top: px2rem(145px);
			font-size: px2rem(31.4px);
			color: #666666;
			text-align: center;
		}
		.list {
			margin-top: px2rem(50px);
			list-style: none;
			overflow-y: hidden;
			height: px2rem(450px);
			padding: 0;
			li {
				&:last-child {
					margin-bottom: px2rem(0px);
				}
				margin-bottom: px2rem(15px);
				padding:0 px2rem(45px);
				background-color: #fff;
				height: px2rem(100px);
				.left {
					display: inline-block;
					width: px2rem(340px);
					font-size: 0;
					vertical-align: top;
					margin-top: px2rem(13px);
					img {
						width: px2rem(75px);
						height: px2rem(75px);
						border-radius: px2rem(38px);
						display: inline-block;
						vertical-align: top;
					}
					.text-panel {
						display: inline-block;
						width: px2rem(265px);
						vertical-align: middle;
						padding-left: px2rem(8px);
						.name {
							font-size: px2rem(26px);
							color: #666666;
							margin-bottom: px2rem(15px);
						}
						.time {
							font-size: px2rem(22px);
							color: #999999;
							margin: 0;
						}
					}
				}
				.right {
					display: inline-block;
					width: px2rem(183px);
					font-size: px2rem(32px);
					color: #c61415;
					text-align: right;
					line-height: px2rem(100px);
				}
			}
		}
	}
</style>