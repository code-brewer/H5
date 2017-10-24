<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel" style="background: #fff;  border-radius: 20px;">
			<div class="title" style="font-family: none; color: #3a2207; font-weight: 600">
				活动规则
			</div>
			<dl style="height: 656px;overflow-y: auto;font-family: none;">
				<dd>1.抽奖仅限沃音乐会员用户参与，每天可获得<span>三次抽奖机会</span>。</span>。
				</dd>
				<dd>2.活动期间，开通会员的新用户可获得<span>5元话费</span>返还及铂涛酒店<span>60元优惠券</span>（次月15日前未取消会员，次月17日前即可获得话费返还资格）。
				</dd>
				<dd>3.活动结束10个工作日内，工作人员将对中奖者进行回访发奖，其中<span>Gopro</span>中奖用户需提交身份证照片给工作人员，实物奖品将通过快递寄发，话费及券类奖品将通过短信派发，请中奖者及时填写正确的领奖信息。。
				</dd>
				<dd>
					4、铂涛集团<span>60元优惠券</span>可于铂涛旗下七天、七天优品、派酒店、IU酒店全国门店订房使用。
				</dd>
				<dd>5. 如出现违规作弊行为，经查实，取消参加活动资格。
				</dd>
				<dd>6.本次活动最终解释权归联通沃音乐平台所有。
				</dd>
				<!-- <dd>6.如出现违规作弊行为，经查实，取消参加活动资格。</dd>
				<dd>7.本次活动最终解释权归联通沃音乐平台所有。</dd> -->
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