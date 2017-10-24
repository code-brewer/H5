<template>
	<div class="game-view-one quest-bg">
		<div class="score-panel">
			<div class="tx" :style="{'background-image': 'url('+tx+')'}"></div>
			<div class="score">0分</div>
		</div>
		<div class="quest-info">
			<div class="number">{{selectItem+1}}</div>
			<div class="title">
				{{{newItem.question}}}
			</div>
			<ul>
				<li v-for="item in newItem.options">
					<div class="check-box">
						<checkbox :value="item.title" :checked.sycn="item.select" :answer="newItem.answer" :index="$index"></checkbox>
					</div>
					<div class="name">{{item.title}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import checkbox from './checkbox.vue'
	import barrage from '../../../components/barrage/barrage.vue'
	export default {
		components: {
			checkbox,
			barrage
		},
		data() {
			return {
				tx: './images/tx.png',
				newItem: {
					question: '中秋归来（打一词牌名）',
					options: [{
						'title': "八归",
						'select': false
					}, {
						'title': "当归",
						'select': false
					}, {
						'title': "三七",
						'select': false
					}, {
						'title': "田七",
						'select': false
					}],
					answer: 2
				},
				selectItem: 0,
			}
		},
		ready() {
			this.replaceTitle()
		},
		methods: {
			replaceTitle() {
				var title = this.newItem.question;
				this.newItem.question = title.replace(/(.)/g, '<span>$1</span>')
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-one {
		.quest-info {
			width: 100%;
			margin-top: px2rem(56px);
			height: px2rem(621px);
			background-image: url(../images/quest-bg.jpg);
			background-repeat: no-repeat;
			background-size: 100%;
			padding: 0 px2rem(40px);
			position: relative;
			ul {
				height: px2rem(370px);
				width: 100%;
				position: absolute;
				bottom: 0;
				left: 0;
				list-style: none;
				text-align: left;
				padding-left: px2rem(40px);
				li {
					margin-bottom: px2rem(42px);
					width: 100%;
					font-size: 0;
					.check-box {
						width: 20%;
						display: inline-block;
						vertical-align: middle;
					}
					.name {
						vertical-align: middle;
						width: 80%;
						font-size: px2rem(24px);
						;
						display: inline-block;
						color: #521500;
					}
				}
			}
			.title {
				font-size: px2rem(24px);
				color: #521500;
				text-align: left;
				span {
					border-bottom: 1px dashed #000;
				}
			}
			.number {
				padding: px2rem(26px);
				text-align: center;
				font-size: px2rem(24px);
				color: #521500;
			}
		}
		.score-panel {
			margin-left: px2rem(-50px);
			padding-top: px2rem(30px);
			text-align: left;
			.tx {
				width: px2rem(108px);
				height: px2rem(108px);
				background-repeat: no-repeat;
				background-size: 100%;
				border-radius: px2rem(54px);
				display: inline-block;
				vertical-align: middle;
			}
			.score {
				display: inline-block;
				color: white;
				text-indent: px2rem(10px);
				font-size: px2rem(36px);
				width: px2rem(100px);
			}
		}
	}
</style>