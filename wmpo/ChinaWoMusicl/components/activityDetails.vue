<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel" style="background: #fff;  border-radius: 20px;">
			<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-m.png'" class="right">
			<div class="title" style="font-family: none; color:#f7af49;">
				活动规则
			</div>
			<dl style="height: 656px;overflow-y: auto;font-family: none;color: #f7af49">
				<dd>1.&nbsp;在规定时间内通关成功即可参与抽奖，每天闯关次数不限。</dd>
				<dd>2.&nbsp;普通用户每天可获得2次抽奖机会，会员用户每天获得6次抽奖机会。新用户开通会员后还可随机获得1-5元话费，次月15日前不取消会员，次月17日前即可获得话费。</dd>
				<dd>3.&nbsp;截止至1月10日，抽中Gopro HERO4（“购满即送”体验资格）的用户，在沃音乐门户移动端-票务窗口购买演出门票总价达到1280元，即可返回活动页面，在“我的奖品”中填写购票订单号，经工作人员核实后即可获得发奖资格。</dd>
				<dd>4.&nbsp;截止至1月10日，抽中JBL CLIP蓝牙音箱（“购满即送”体验资格）的用户，在沃音乐门户移动端-票务窗口购买演出门票总价达到480元，即可返回活动页面，在“我的奖品”中填写购票订单号，经工作人员核实后即可获得发奖资格。</dd>
				<dd>5.&nbsp;截止至1月10日，抽中小米手环1代（“购满即送”体验资格）的用户，在沃音乐门户移动端-票务窗口购买演出门票总价达到280元，即可返回活动页面，在“我的奖品”中填写购票订单号，经工作人员核实后即可获得发奖资格。</dd>
				<dd>6.&nbsp;截止至1月10日，抽中30元话费充值卡（“购满即送”体验资格）的用户，在沃音乐门户移动端-票务窗口购买演出门票总价达到180元，即可返回活动页面，在“我的奖品”中填写购票订单号，经工作人员核实后即可获得发奖资格。</dd>
				<dd>7.&nbsp;截止至1月10日，抽中50元大麦超级票（“购满即送”体验资格）的用户，在沃音乐门户移动端-票务窗口购买演出门票总价达到180元，即可返回活动页面，在“我的奖品”中填写购票订单号，经工作人员核实后即可获得发奖资格。</dd>
				<dd>8.&nbsp;超级票为大麦网全线通票，适用于所有在售项目，无论演出项目在哪个城市均可使用超级票进行抵扣。</dd>
				<dd>9.&nbsp;活动结束七天内客服将对中奖者进行回访，其中Gopro HERO4 中奖者须提交身份证照片给回访客服进行身份核实。</dd>
				<dd>10.&nbsp;活动结束后15个工作日内，除30元话费充值卡与50元大麦超级票以外的奖品将以快递形式进行派送，请用户务必在活动页面中填写可接收快递的地址。</dd>
				<dd>11.&nbsp;同一ID、姓名、手机号在同一活动仅有一次获奖机会，不重复获奖。</dd>
				<dd>12.&nbsp;如出现违规作弊行为，经查实，取消参加活动资格。</dd>
				<dd>13.&nbsp;本次活动最终解释权归联通沃音乐平台所有。</dd>
			</dl>
			<img class="close" :src="'l/images/sp-close.png'" @click="show=false" />
		</section>
	</modal>
</template>
<style lang="sass">
	.prize-panel {
		height: 900px;
		width: 560px;
		margin: auto;
		border: 8px solid #ffae00;
		padding-bottom: 10px;
		background-size: 560px 900px!important;
		.close {
			position: absolute;
			top: -25px;
			left: 55%;
			margin-left: 190px;
		}
		.right{
			position: absolute;
			right: -28px;
			top: 810px;
			z-index: 1000;
		}
		.left{
			position: absolute;
			left: -8px;
			top: 807px;
			z-index: 1000;
		}
		.title {
			margin: 0 auto;
			font-size: 38.84px;
			line-height: 3;
			color: #3a2207;
			width: 90%;
			text-align: left;
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