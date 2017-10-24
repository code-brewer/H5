<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #f62a32; border-radius: 20px;">
			<div class="title" style="font-family: none; color: #9d2e3e;">
				活动规则
			</div>
			<dl style="height: 656px;overflow-y: auto;font-family: none;color: #9d2e3e">
				<dd>1.本次活动为回馈沃音乐会员福利，仅限会员用户参与获得奖品。</dd>
				<dd>2.在规定时间内通关成功即有机会随机获得奖品，每天闯关次数不限。</dd>
				<dd>3、活动期间新用户首次开通会员首月免会员资费，次月正常收取。4G用户免费送炫铃功能，除广东、上海、吉林、甘肃以外的2/3G非炫铃用户开通时须额外收取5元炫铃功能费。
				</dd>
				<dd>4.活动结束七天内客服将对中奖者进行回访，其中ipad mini2、小米平衡车中奖者须提交身份证照片给回访客服进行身份核实。</dd>
				<dd>5、活动结束后15个工作日内，实物奖品将以快递形式进行派送，虚拟奖品通过短信派发，请用户务必在活动期间在页面填写正确的收件信息。</dd>
				<dd>6.如出现违规作弊行为，经查实，取消参加活动资格。</dd>
				<dd>7.本次活动最终解释权归联通沃音乐平台所有。</dd>
			</dl>
			<img class="close" :src="'o/images/close.png'" @click="show=false" />
			<img class="bottom" :src="'o/images/wen-bottom1.png'" />
		</section>
	</modal>
</template>
<style lang="sass">
	.prize-panel {
		// height: 900px;
		width: 550px;
		margin: auto;
		padding-bottom: 10px;

		// background-size: 560px 900px!important;
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
			color: #9d2e3e;
			text-align: center;
		}
		dl {
			font-size: 22px;
			padding: 0 30px 87px 30px;
			color: #9d2e3e;
			line-height: 2;
			text-align:left;
			dd {
				span {
					color: #ffae00;
				}
			}
		}
		.bottom{
			position: absolute;
			bottom: 10px;
			left: 10px;
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