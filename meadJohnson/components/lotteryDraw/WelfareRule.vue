<template>
	<modal :show.sync="show" :bg="false">
		<div class="choujiang-rule">
			<h2>抽奖规则</h2>
			<div class="con">
				<div class="items">
					<p>花妈特地为大家开辟了一个100%中奖的幸运转盘，贝壳币、实物奖，统统拿走不谢~！</p>
					<p>抽奖前先看看花妈的几个规则：</p>
				</div>
				<div class="items">
					<p>1、大转盘开放日当天，每人有3次抽奖机会。</p>
					<p>2、每次抽奖消耗5个贝壳币，点击转盘中心按钮进行抽奖时，系统会自动扣除5个贝壳币。</p>
					<p>3、抽中贝壳币奖励者，系统会自动发放贝壳币，可在<a>【我的贝壳币】</a>中查询贝壳币明细。</p>
					<p>4、抽中实物奖者，花妈会在两周内安排礼品寄出，可随时在公众号菜单栏<a>【个人中心-我的订单】</a>中查询订单详情。</p>
					<p>5、大转盘将会不定期开放！大家及时关注花妈的推送哟！</p> 
				</div>
				
				<div class="items">
					<p>规则如果疑问,请在公众号对话框以"客服+你的问题"的格式将你的问题告诉花妈,或者添加花妈小助手微信号咨询：hbmm_001，花妈会争取尽快回复哒。</p>
				</div>
				
			
			</div>
			<a href="javascript:;" class="close" @click="show = false"></a>
		</div>
	</modal>
</template>
<script>
	import Modal from '../Modal.vue'

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
<style lang="scss" scoped>
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
			background: #B8183A;
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
			background: url(../../images/recommend/recommend_close.png) no-repeat;
		}
	}
	.modal {
		.modal-content {
			overflow: initial;
		}
	}
</style>