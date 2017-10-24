<template>
	<div class="garden-rule main">
		<div class="resetFontSize clearfix">
			<p style="padding: 0 10px 20px;color: #43a4ae;">亲们~欢迎来到花妈的秘密花园，这里不玩虚套路，只玩真福利，怎么拿福利，往下看。</p>
		</div>
		<section class="level">
			<h2>粉丝等级</h2>
			<ul>
				<li><span>LV1</span><span>0~999成长值</span></li>
				<li><span>LV2</span><span>1000~2999成长值</span></li>
				<li><span>LV3</span><span>3000~7999成长值</span></li>
				<li><span>LV4</span><span>>8000成长值</span></li>
			</ul>
			<div class="resetFontSize clearfix">
				<p>等级越高，可兑换的礼品越丰富哦！还有一大波福利正在建设中，努力升级吧，花妈备足好礼等你拿。</p>
			</div>
		</section>
		<section class="section2">
			<div class="welfare">
				<h2>贝壳币福利</h2>
				<div class="resetFontSize clearfix">
					<p>花妈福利那么多，怎么拿？用贝壳币兑换！</p>
				</div>
				<div class="item clearfix">
					<img :src="'images/garden-rule-icon1.jpg'">
					<div>
						<p><span>幸运每天转{{dot}}</span></p>
						<p>5个贝壳币即可获得一次抽奖机会，<span class="orange">100%中奖</span>，每天3次机会！</p>
					</div>
				</div>
				<div class="item clearfix">
					<img :src="'images/garden-rule-icon2.jpg'">
					<div>
						<p><span>好礼随时兑{{dot}}</span></p>
						<p>精美玩具、育儿神器，丰富的豪华大礼等你来兑。</p>
					</div>
				</div>
				<p class="bule">福利那么多，想拿的心好强烈，那么问题来了</p>
			</div>
			<div class="how">
				<h2>贝壳币怎么赚？等级怎么升？</h2>
				<ul class="clearfix">
					<li>说明</li>
					<li>成长值</li>
					<li>贝壳币</li>
				</ul>
				<div class="item clearfix">
					<img :src="'images/garden-rule-icon3.jpg'">
					<div>
						<p><span>签到{{dot}}</span></p>
						<p><span class="text">每日一签，贝壳币轻松拿</span><span class="orange space">+1~15</span><span class="orange space">+1~35</span></p>
					</div>
				</div>
				<div class="item clearfix">
					<img :src="'images/garden-rule-icon4.jpg'">
					<div>
						<p><span>完善资料{{dot}}</span></p>
						<p><span class="text">留下名片，花妈额外奖励</span><span class="orange space">+10~100</span><span class="orange space">+10~100</span></p>
					</div>
				</div>
				<div class="item clearfix">
					<img :src="'images/garden-rule-icon5.jpg'">
					<div>
						<p><span>推荐好友{{dot}}</span></p>
						<p><span class="text">邀请更多妈妈一起来秘密花园玩，花妈用好礼迎接</span><span class="orange space">10/人</span><span class="orange space">100/人</span></p>
					</div>
				</div>
				<div class="item clearfix">
					<img :src="'images/garden-rule-icon6.jpg'">
					<div>
						<p><span>投稿{{dot}}</span></p>
						<p><span class="text">在公众号对话框跟花妈交流育儿心得，有奖励</span><span class="orange space">+50</span><span class="orange space">+50</span></p>
					</div>
				</div>
				<div class="item clearfix">
					<img :src="'images/garden-rule-icon7.jpg'">
					<div>
						<p><span>互动有礼{{dot}}</span></p>
						<p><span class="text">阅读“妈妈干货”文章有礼</span><span class="orange space">+3</span><span class="orange space">+5</span></p>
					</div>
				</div>
				<p>有了花妈这份玩转秘密花园的攻略，贝壳币天天赚，成长值节节升，玩具礼品任性兑！</p>
				<p class="last-p">每日获得贝壳币的上限为10000贝壳币，超过上限后将无法再增加<br/>迫不及待了，先去看看我的贝壳币吧！</p>
				<btn class="btn" v-link="{path: '/myConchCoin'}">我的贝壳币</btn>
			</div>
		</section>
	</div>
</template>
<script>
	import btn from '../components/btn.vue'

	export default {
		components: {
			btn
		},
		data() {
			return {
				dot: '...........................................................................'
			}
		},
		created() {
			document.title = '秘密花园规则';
			this.$dispatch('loading');
		},
		ready() {
			this.$dispatch('cancelLoading');
		}
	}
</script>
<style lang="scss">
	.garden-rule {
		padding: 30px 5% 50px;
		font-size: 26px;
		section {
			border-radius: 15px;
			-webkit-box-shadow: 0 0 30px rgba(61,165,175,.4);
			box-shadow: 0 0 30px rgba(61,165,175,.4);
		}
		p {
			line-height: 1.5;
		}
		h2 {
			padding-bottom: 10px;
			font-size: 30px;
			font-weight: 400;
			color:#35828a;
		}
		.level {
			padding: 30px;
			background: #eef9fb;
			color: #787878;
			li {
				height: 50px;
				line-height: 50px;
				padding: 8px 0;
				border-bottom: 1px solid #c0e5e5;
				span {
					&:first-child {
						float: left;
					}
					&:last-child {
						float: right;
					}
				}
				&:last-child {
					border: 0;
				}
			}
			p {

			}
		}
		.section2 {
			margin-top: 30px;
			border-radius: 15px;
			color: #787878;
			background: white;
			> div {
				padding: 30px 20px;
			}
			.item {
				position: relative;
				padding: 20px 0 25px 0;
				p {
					&:first-of-type {
						position: relative;
						height: 50px;
						line-height: 50px;
						padding-right: 30px;
						font-size: 30px;
						color: #43a4ae;
						&:after {
							content: "";
							position: absolute;
							top: 50%;
							right: 5px;
							width: 20px;
							height: 20px;
							border: 2px solid #43a4ae;
							border-bottom: 0;
							border-left: 0;
							-webkit-transform: translate(0,-50%) rotate(45deg);
							-moz-transform: translate(0,-50%) rotate(45deg);
							transform: translate(0,-50%) rotate(45deg);
						}
						span {
							display: block;
							width: 100%;
							white-space: nowrap;
							overflow: hidden;
						}
					}
					&:last-of-type {
						.orange {
							color: #ff9a46;
						}
					}
				}
			}
			.bule {
				color: #43a4ae;
			}
			.welfare {
				.item {
					padding-left: 26%;
					img {
						position: absolute;
						top: 20px;
						left: 0;
						width: 25%;
					}
					p {
						&:last-of-type {
							float: left;
						}
					}
				}
			}
			.how {
				background: url(../images/conch-coin-bg2.jpg) left top no-repeat;
				-webkit-background-size: 100% auto;
				background-size: 100% auto;
				.item {
					padding-left: 21%;
					img {
						position: absolute;
						top: 20px;
						left: 0;
						width: 20%;
					}
					.text {
						width: 50%;
					}
					p {
						&:last-of-type {
							display: -webkit-box;
						    display: -moz-box;
						    display: -ms-flexbox;
						    display: -webkit-flex;
						    display: -moz-flex;
						    display: flex;
						}
						.space {
							width: 110px;
							padding: 0 10px;
							text-align: center;
						}
					}
				}
				ul {
					height: 40px;
					line-height: 40px;
					padding: 5px 0 5px 20px;
					background: #f1f1f1;
					li {
						float: right;
						width: 100px;
						padding: 0 10px;
						text-align: center;
						&:first-child {
							float: left;
							width: 20%;
							padding: 0;
							text-align: left;
						}
					}
				}
				.last-p {
					padding: 50px 0 15px;
					text-align: center;
				}
			}
		}
		.btn {
			display: block;
			margin: 0 auto;
		}
	}
</style>