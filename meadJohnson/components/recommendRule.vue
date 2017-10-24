<template>
	<modal :show.sync="show" :bg="false">
		<div class="recommend-rule">
			<h2></h2>
			<div class="con clearfix">
				<p class="items">本月每成功邀请3位好友首次关注花妈，即可获得1次抽奖机会，每月限10次！</p>
				<p class="items"><i>1.</i>每成功邀请一位好友关注花贝妈妈，即可获得20贝壳币。</p>
				<p class="items"><i>2.</i>好友通过长按或扫描你分享的二维码，首次关注花贝妈妈，视为成功邀请，可获得相应贝壳币。取关后再次关注视为无效邀请，不能重复获得贝壳币。</p>
				<p class="items"><i>3.</i>每位粉丝每日通过邀请好友奖励400贝壳币上限；每月（30天内）奖励1000贝壳币上限；超出邀请好友部分不给予贝壳币奖励。</p>
				<p class="items"><i>4.</i>被邀请的好友，首次成功关注花贝妈妈，即可获100贝壳币。</p>
				<p class="items"><i>5.</i>通过邀请好友赚取的贝壳币，即时到账，可在<a v-link="{path: '/myConchCoin'}">【我的贝壳币】</a>中查询。</p>
				<p class="items">注：</p>
				<p class="items"><i>1.</i>活动期间，每位参加者只能通过一个微信账号参与活动，若参加者利用不同的手机号码、QQ号码等开通若干个微信账号参与活动将视为违规，主办方有权取消其参加活动的资格。 </p>
				<p class="items"><i>2.</i>活动主办方不对因参与者网络传输、网络欠费等原因而导致参加者邀请好友失败承担任何责任。</p>
				<p class="items"><i>3.</i>花贝妈妈公众号有权对邀请好友的奖励额度适时做出调整，调整前将发出公告。</p>
				<p class="items">*本活动的最终解释权归花贝妈妈所有</p>
			</div>
			<a href="javascript:;" class="close" @click="show = false"></a>
		</div>
	</modal>
</template>
<script>
	import Modal from './Modal.vue'

	export default {
		components: {
			Modal
		},
		props:{
			show: false
		}
	}
</script>
<style lang="scss" scoped>
	.recommend-rule {
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
			    background: #5BD5C8;
			height: 40px;
		}
		.con {
			height: 570px;
			padding: 0 30px;
			border-radius: 0 0 15px 15px;
			overflow-y: auto;
		}
		.items {
			position: relative;
			float: left;
			padding: 10px 0 10px 20px;
			font-size: 24px;
			line-height: 1.5;
		
			    color: #4F4F4F;
			i {
				position: absolute;
				top: 10px;
				left: 0;
				font-style: normal;
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
			 background: url(../images/recommend/recommend_close.png) no-repeat;
		}
	}
	.modal {
		.modal-content {
			overflow: initial;
		}
	}
</style>