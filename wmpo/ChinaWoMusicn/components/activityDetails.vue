<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel" style="background: #fff;  border-radius: 20px;">
			<div class="title" style="font-family: none; color: #c25252;">
				活动规则
			</div>
			<dl style="height: 656px;overflow-y: auto;font-family: none;color: #c25252">
				<dd>① 本次活动为沃音乐会员用户回馈活动，仅限会员用户
   参与抽奖，每天可获得2次抽奖机会，100%中奖。</dd>
				<dd>② 非会员用户可在活动页面中开通会员，将可享受首月
   免资费优惠。（原会员资费6元/月）</dd>
				<dd>③ 活动结束七天内客服将对中奖者进行回访，其中
    Kindle中奖者须提交身份证照片给回访客服进行身份
    核实。</dd>
				<dd>④ 活动结束后10个工作日内，实物奖品将以快递形式进
   行派送，虚拟奖品通过短信派发，请用户务必在活动
   期间在页面填写正确的收件信息。</dd>
				<dd>⑤ 如出现违规作弊行为，经查实，取消参加活动资格.</dd>
				<dd>⑥ 本次活动最终解释权归联通沃音乐平台所有。</dd>
			</dl>
			<img class="close" :src="'n/images/close.png'" @click="show=false" />
		</section>
	</modal>
</template>
<style lang="sass">
	.prize-panel {
		// height: 900px;
		width: 560px;
		margin: auto;
		padding-bottom: 10px;

		background-size: 560px 900px!important;
		.close {
			position: absolute;
			top: 30px;
			left: 50%;
			margin-left: 190px;
		}
		.title {
			margin: 0 auto;
			font-size: 38.84px;
			line-height: 3;
			color: #c25252;
			text-align: center;
		}
		dl {
			font-size: 22px;
			padding: 0 30px;
			color: #c25252;
			line-height: 1.5;
			text-align:left;
			dd {
				span {
					color: #ffae00;
				}
			}
		}
	}
	
	.modal .modal-dialog {
		margin: 160px 30px;
	}
</style>
<script>
	import modal from './../modal/Modal.vue'
	export default {
		components: {
			modal
		},
		props: {
			show: {
				Boolean,
				default: false
			}
		},
		ready() {}

	}
</script>