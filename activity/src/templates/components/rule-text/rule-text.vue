<template>
	<div class="wap-rule-text">
		<p>1. 参与对象: <span>{{store.configData.player.indexOf('M')!=-1?'手机用户；':''}}{{store.configData.player.indexOf('W')!=-1?'微信用户；':''}}</span></p>
		<p>2. 活动时间: <span>{{startDate}}-{{endDate}}；</span></p>
		<p>3. 游戏规则: 每天每个用户不限拼图机会，成功通关获得相应积分，每天分享活动可获随机积分奖励。</p>
		<p>4. 奖品设置: </p>
		<ul>
			<li>1-10名：电影大礼包</li>
			<li>11-20名：免费电影票</li>
			<li>21-30名：随机小礼包</li>
		</ul>
		<p>5. 活动说明: {{store.activityConfig.rule.content}}</p>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				store: window.store
			}
		},
		computed: {
			startDate() {
				return getDateString(this.store.configData.starttime)
			},
			endDate() {
				return getDateString(this.store.configData.endtime)
			},
		},
		ready() {
			if(window.store.configData.des)
				window.store.activityConfig.rule.content = window.store.configData.des;
		}
	}

	function getDateString(date) {
		var currDate = new Date(date)
		return currDate.getFullYear() + '年' + (currDate.getMonth() + 1) + '月' + currDate.getDate() + '日'
	}
</script>

<style>
	.wap-rule-text {
		line-height: 1.5rem;
	}
	
	.wap-rule-text ul {
		padding-left: 2.5rem;
	}
</style>