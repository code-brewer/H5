<template>
	<div class="app-view rule-page">
		<div class="content padding">
<!-- 			<p>1、活动参与方式：116114客户端或微信客户端(关注116114微信公众号获得积分)</p>
			<img :src="'src/images/qrtest.png'" alt="二维码" style="width: 100%;margin-bottom: 20px;">
			<p>2、活动时间：<span>3月15日到3月18日，</span>其中3月18日为总排名领奖日；过期无效。</p>
			<p>3、游戏规则：每天每个用户不限拼海报的机会，<span>每次成功拼海报一次即可获得5个积分，</span>以此类推，当天<span>分享一次</span>可获得<span>当天积分的双倍</span>（分享超过第二次以上不计积分）；<span>当天积分排名前100的用户即可获得免费电影票一张；</span>活动总计4天；第4天选出排名总结果；4天中<span>总排名前3位用户可以获得翻倍电影大礼包一份。</span></p>
			<p>4、领奖方式： 中奖的用户可以通过116114客户端或者关注微信116114公众号"我的订单-电影票订单"中查看。 </p>
			<p>5、如出现违规作弊行为，经查实，取消参加活动的资格。</p>
			<p>6、活动最终解释权归116114平台所有。</p> -->
			{{{activityInfo.ruleContent}}}
		</div>
		<img :src="activityInfo.backgrounds.rule"  class="bg">
	</div>
</template>

<script>

	export default {
		ready() {
			this.$dispatch('title', '活动规则');
			this.activity = JSON.parse(localStorage.getItem('activity'));
			this.activityInfo = JSON.parse(this.activity.extbody);
		},
		data() {
			return {
				activity:{title:''},
				activityInfo:{ruleContent:'',backgrounds:{rule:''}},
			}
		},
	}
</script>