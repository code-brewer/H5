<template>
	<modal :show.sync="show" :bg="false">
		<section class="prize-panel" style="background: #131620; border: 2px solid #3bbfe7;">
			<div class="title" style="font-family: none; color: #fff;">
				活动规则
			</div>
			<dl style="height: 656px;overflow-y: auto;font-family: none;">
				<dd>1.点击“揭开面具”参与活动，在规定时间内全<span>答对5首歌曲</span>，即可<span>参与大转盘抽奖，每天不限答题次数。
		 		 	</span>
				</dd>
				<dd>2.<span>普通用户</span>每天可获得<span>1次抽奖机会</span>，<span>会员用户</span>每天获得
					<span>3次抽奖机会</span>。
				</dd>
				<dd>3. 活动结束后客服将对中奖者进行回访，<span>奖品将在10个工作日内发放。实物奖品将通过快递寄出，电影券将通过短信下发。</span>
				</dd>
				<dd>4.<span>蜘蛛网电影10元抵用券有效期至2016年12月31日，</span> 仅限兑换在蜘蛛网PC/APP端 显示 “抵” 标识的场次， 具体参考蜘蛛网抵用券使用说明。
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
		height: 800px;
		width: 560px;
		margin: auto;
		padding-bottom: 10px;
		background-size: 800px 560px!important;
		background-size: 560px 800px!important;
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
		}
		dl {
			font-size: 22px;
			padding: 0 30px;
			color: #fff;
			line-height: 2;
			dd {
				span {
					color: #ffb81d;
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