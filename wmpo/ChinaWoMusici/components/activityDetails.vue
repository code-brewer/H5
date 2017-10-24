<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel" style="background: #fff;  border-radius: 20px;">
			<div class="title" style="font-family: none; color: #3a2207;">
				活动规则
			</div>
			<dl style="height: 656px;overflow-y: auto;font-family: none;">
				<dd>1.在规定的时间内通关成功即可参加抽奖,每天闯关<span>次数不限</span>。
				</dd>
				<dd>2.<span>普通用户</span>每天可获得<span>3次抽奖机会</span>，<span>会员用户</span>每天获得
					<span>5次抽奖机会</span>。
				</dd>
				<dd>抽中30元大麦代金券的用户，截止至11月15日，在沃音乐门户（移动端）购满总额280以上演出门票，购票后用户进入“我的奖品”填写购票订单号，工作人员核实信息后，即发送<span>30元大麦代金券和100元京东券</span>。
				</dd>
				<dd>4. 活动结束后七天内客服将对中奖者进行回访。活动结束后10个工作日内，除京东券、蜘蛛网电影券和大麦超级票(电子券)以外的奖品将
					以快递形式进行派送，请用户务必在活动中填写可接受快递的地址。其中，大张伟演唱会北京站门票将在11月16日以<span>快递形式寄出。</span>
				</dd>
				<dd>5.同一ID、姓名、手机号在同一活动仅有一次获奖机会，不重复获奖。
				</dd>
				<dd>6.如出现违规作弊行为，经查实，取消参加活动资格。</dd>
				<dd>7.本次活动最终解释权归联通沃音乐平台所有。</dd>
			</dl>
			<img class="close" :src="'f/images/sp-close.png'" @click="show=false" />
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
	import modal from './../../../src/components/Modal.vue'
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