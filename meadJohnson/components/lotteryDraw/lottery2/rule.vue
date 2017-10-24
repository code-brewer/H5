<template>
	<modal :show.sync="show" :bg="false">
		<div class="choujiang-rule">
			<h2>活动详情</h2>
			<div class="con">
				<div class="items">
					<p>本月首次成功邀请3位好友关注花妈，即可获得一次抽奖机会。</p>
				</div>
				<div class="items">
					<p>活动时间：</p>
					<p>2016年12月1日-2016年12月31日</p>
				</div>
				<div class="items">
					<p>活动奖品：</p>
					<p>一等奖：迪士尼套票（等值金额携程卡1500元）1份</p>
					<p>二等奖：九阳JYL-C18D多功能料理机便携式榨汁机 3份</p>
					<p>三等奖：全棉时代盒装水洗纱布手帕 10份</p>
					<p>四等奖：滴露消毒液750ml&洗手液200g套装 20份</p>
					<p>五等奖：30贝壳币</p>
					<p>六等奖：20贝壳币</p>
					<p>七等奖：10贝壳币</p>
					<p>八等奖：5贝壳币</p>
				</div>
				<div class="items">
					<p>活动规则</p>
					<p>1、每位用户首次成功邀请3位好友关注花贝妈妈公众号，即可获得一次免费抽奖机会；</p>
					<p>2、当月抽奖机会不可累积到下月，每月仅有一次抽奖机会；</p>
					<p>3、一等奖获得者，花贝妈妈会在七个工作日内将中奖串码发送给用户 ，用户可根据短信内兑换方式自行进行奖品兑换；</p>
					<p>4、实物奖获得者，花贝妈妈会在十五个工作日内安排奖品寄送，可随时在公众号菜单栏<a>【我的贝壳币-我的订单】</a>中查询奖品信息；</p>
					<p>5、贝壳币获得者，系统会自动发放贝壳币，可在<a>【我的贝壳币】</a>中查询贝壳币明细。</p>
				</div>
				<div class="items">
					<p>规则如有疑问，请通过后台联系花妈:客服+问题或者添加花妈小助手微信：hbmm_001，我们会尽快回复哒。</p>
				</div>
				<div class="items" style="padding:20px 0px 10px;">
					<p>*本活动最终解释权归花贝妈妈公众号所有。</p>
				</div>
			</div>
			<a href="javascript:;" class="close" @click="show = false"></a>
		</div>
	</modal>
</template>
<script>
	import Modal from '../../Modal.vue'

	export default {
		components: {
			Modal
		},
		props:{
			show: false
		},
		watch: {
			show(val) {
				this.$dispatch('setOverflow', val);
			}
		}
	}
</script>
<style lang="scss">
	.choujiang-rule {
		border-radius: 15px;
		background: white;
		text-align: left;
		h2 {
			padding: 20px 0;
			font-size: 30px;
			color: white;
			font-weight: 400;
			text-align: center;
			border-radius: 15px 15px 0 0;
			background: #43a4ae;
		}
		.con {
			height: 600px;
			padding: 0 30px;
			border-radius: 0 0 15px 15px;
			overflow-y: auto;
		}
		.items {
			padding: 10px 0;
			font-size: 24px;
			line-height: 2;
			strong {
				font-weight: 400;
				color: #43a4ae;
			}
			p {
				color: #787878;
				line-height: 1.7;
				padding: 5px 0;
			}
			a {
				color:#f88431;
				word-break: break-all;
				font-size: 24px;
			}
		}
		.close {
			position: absolute;
			top: -15px;
			right: -15px;
			width: 46px;
			height: 46px;
			background: url(../../../images/member-rule-close.png) no-repeat;
		}
	}
	.modal {
		.modal-content {
			overflow: initial;
		}
	}
</style>
<style lang="scss">
	.choujiang-rule {
		.close {
			position: absolute;
			top: -15px;
			right: -15px;
			width: 46px;
			height: 46px;
			background: url(../../../images/member-rule-close.png) no-repeat;
		}
	}
</style>