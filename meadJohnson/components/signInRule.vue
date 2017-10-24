<template>
	<modal :show.sync="show" :bg="false">
		<div class="sign-in-rule">
			<h2>签到规则</h2>
			<div class="sign-con">
				<div class="clearfix">
					<p>每日一签，轻松赚贝壳币，连续签到都有额外惊喜哦，到第七天有重磅彩蛋！</p>
				</div>
				<table>
					<thead>
						<tr>
							<th>签到时间</th>
							<th>贝壳币</th>
							<th>成长值</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>第一天</td>
							<td>5贝壳币</td>
							<td>5成长值</td>
						</tr>
						<tr>
							<td>第二天</td>
							<td>6贝壳币</td>
							<td>10成长值</td>
						</tr>
						<tr>
							<td>第三天</td>
							<td>7贝壳币</td>
							<td>15成长值</td>
						</tr>
						<tr>
							<td>第四天</td>
							<td>8贝壳币</td>
							<td>20成长值</td>
						</tr>
						<tr>
							<td>第五天</td>
							<td>9贝壳币</td>
							<td>25成长值</td>
						</tr>
						<tr>
							<td>第六天</td>
							<td>10贝壳币</td>
							<td>30成长值</td>
						</tr>
						<tr>
							<td>第七天</td>
							<td>15贝壳币</td>
							<td>35成长值</td>
						</tr>
					</tbody>
				</table>
				<div class="tips">
					<p>花妈Tips:</p>
					<div class="items">
						<p>①每七天一个周期，完成7天的连续签到，即可按照上表显示  获取贝壳币和成长值。第8天则重新开始一个周期。</p>
						<p>②连续签到期间，中间断了1天或者多天，则回归签到当日获取5贝壳币、5成长积分，重新开始新一轮的连续签到。</p>
					</div>
					<div class="items">
						<p>如有疑问，请在公众号对话框以“客服+你的问题”的格式将你的问题告诉花妈，花妈会争取尽快回复哒！</p>
					</div>
				</div>
			</div>
			<a href="javascript:;" class="close" @click="show = false"></a>
		</div>
	</modal>
</template>
<script>
	import Modal from './Modal.vue'

	export default {
		components: {
			Modal
		},
		props:{
			show: false
		}
	}
</script>
<style lang="scss">
	.sign-in-rule {
		border-radius: 15px;
		background: white;
		text-align: left;
		color: #35828a;
		h2 {
			padding: 20px 0;
			font-size: 30px;
			color: white;
			font-weight: 400;
			text-align: center;
			border-radius: 15px 15px 0 0;
			background: #43a4ae;
		}
		.sign-con {
			height: 500px;
			padding: 30px;
			border-radius: 0 0 15px 15px;
			overflow-y: auto;
			p {
				font-size: 28px;
			}
		}
		table {
			width: 100%;
			margin: 30px 0;
			font-size: 24px;
			tr {
				border-bottom: 1px solid #f1f1f1;
			}
			th {
				background: #f1f1f1;
			}
			th,td {
				padding: 10px 0;
				text-align: center;
			}
		}
		.tips {
			color: #787878;
			.items {
				padding: 10px 0;
				line-height: 1.5;
				border-bottom: 1px solid #f1f1f1;
				p {
					font-size: 24px;
				}
				&:last-child {
					border: 0;
				}
			}
		}
		.close {
			position: absolute;
			top: -15px;
			right: -15px;
			width: 46px;
			height: 46px;
			background: url(../images/member-rule-close.png) no-repeat;
		}
	}
</style>