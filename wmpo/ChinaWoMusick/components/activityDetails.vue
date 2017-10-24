<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel" style="background: #fff;  border-radius: 20px;">
			<div class="title" style="font-family: none; color: #366759;">
				活动规则
			</div>
			<dl style="height: 656px;overflow-y: auto;font-family: none;color: #366759">
				<dd>（1）用户在规定时间内，咻出5个被卡住的幸运礼物，即有机会获得幸运大奖。</dd>
				<dd>（2）参与用户可在活动页面中领取圣诞优惠券，终极抽奖仅限会员用户参与，每天共有三次抽奖机会。</dd>
				<dd>（3）新用户开通会员后还可随机获得1-5元话费，次月15日前不取消会员，次月17日前即可获得话费。</dd>
				<dd>（4）活动结束七天内客服将对中奖者进行回访，其中Kindle中奖者须提交身份证照片给回访客服进行身份核实。</dd>
				<dd>（5）活动结束后10个工作日内，实物奖品将以快递形式进行派送，虚拟奖品通过短信派发，请用户务必在活动期间在页面填写正确的收件信息。</dd>
				<dd>（6）如出现违规作弊行为，经查实，取消参加活动资格。</dd>
				<dd>（7）本次活动最终解释权归联通沃音乐平台所有。</dd>
			</dl>
			<img class="close" :src="'k/images/sp-close.png'" @click="show=false" />
		</section>
	</modal>
</template>
<style lang="sass">
	.prize-panel {
		height: 900px;
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
			color: #3a2207;
			text-align: center;
		}
		dl {
			font-size: 22px;
			padding: 0 30px;
			color: #3a2207;
			line-height: 2;
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