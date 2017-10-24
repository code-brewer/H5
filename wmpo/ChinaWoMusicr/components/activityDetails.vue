<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel box" style="background: #ff99b3;">
			<div class="con">
				<div class="title" style="font-family: none;">
					活动规则
				</div>
				<dl style="height: 656px;overflow-y: auto;font-family: none;">
					<dd>1、本次活动为沃音乐会员用户回馈活动，仅限会员用户参与抽奖，100%中奖。</dd>
					<dd>2、在规定时间内通关成功即有机会随机获得奖品，每天闯关次数不限。</dd>
					<dd>3、活动期间新用户首次开通会员首月免会员资费，次月正常收取。4G用户免费送炫铃功能，除广东、上海、吉林、甘肃以外的2/3G非炫铃用户开通时须额外收取5元炫铃功能费。
					</dd>
					<dd>4、活动结束七天内客服将对中奖者进行回访，其中大麦代金券1000元中奖者须提交身份证照片给回访客服进行身份核实。</dd>
					<dd>5、活动结束后15个工作日内，小米手环将以快递形式进行派送，请中奖用户务必在活动页面中填写可接收快递的地址。大超级麦票等奖品将通过其他形式派送。</dd>
					<dd>6、如出现违规作弊行为，经查实，取消参加活动资格。</dd>
					<dd>7、本次活动最终解释权归联通沃音乐平台所有。</dd>
				</dl>
				<img class="close-img" :src="'r/images/close.png'" @click="show=false" />
			</div>
		</section>
	</modal>
</template>
<style lang="sass">
	.prize-panel {
		// height: 900px;
		width: 550px;
		margin: auto;
		padding-bottom: 10px;
		padding-top: 10px;

		// background-size: 560px 900px!important;
		.con{
		    width: 96%;
		    margin-left: 2%;
    		border: 1px solid #fff;
		}
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
			color: #fff;
			text-align: center;
			font-weight: 600;
			
		}
		dl {
			font-size: 22px;
			padding: 0 30px 87px 30px;
			color: #fff;
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