<template>
	<div class="app-view view-prizes" :style="{'background-image':activityConfig.common.bgUrl?'url('+activityConfig.common.bgUrl+')':1,'background-color':activityConfig.common.bg}">
		<div class="content padding">
			<div class="prize-title">
				<p :style="{'color':activityConfig.common.secondColor}">我的奖品</p>
			</div>
			<div class="rows cashed" v-for="list in lists" :class="{'cashed':list.state==1,'cash':list.state==0}">
				<p  class="prize-name">奖品名：<span>{{list.pname}}</span></p>
				<p>兑奖码：<span>{{list.sid}}</span></p>
				<p>兑奖时间：<span>{{list.startenabled.substr(0,10)}}</span>至<span>{{list.endenabled.substr(0,10)}}</span></p>
			</div>
		</div>
</template>
<style lang="scss">
	@import "./my-prize-list.scss"
</style>
<script>
	export default {
		components: {},
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
				lists: [{
					"endenabled": "2016-08-31 00:00:00",
					"pname": "无人机",
					"sid": "WHD21473232094569971",
					"startenabled": "2016-08-01 00:00:00",
					"state":0
				}, {
					"endenabled": "2016-08-31 00:00:00",
					"pname": "小米平衡车",
					"sid": "WHD21473232094569971",
					"startenabled": "2016-08-01 00:00:00",
					"state":1
				}]
			}
		}
	}
</script>