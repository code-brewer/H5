<template>
	<div class="app-view rule-page">
		 <section class="section-wrap">
	   		<div  class="rule-div" v-html="activityInfo"></div>
			<!-- <ul class="rule">
				<li>1.参与方式：所有微信用户;</li>
				<li>2.活动时间：2016年4月15号-2016年4月16号,2016年4月15号-2016年4月16号,2016年4月15号-2016年4月16号,2016年4月15号-2016年4月16号,</li>
				<li>3.游戏规则</li>
				<li>4.领奖方式；</li>
				<li>5.如出现违规作弊行为，进查实，取消参加活动资格</li>
				<li>6.活动最终解释权归XXX所有</li>
			</ul> -->
			<!-- 活动规则 -->
			<!-- {{activityInfo.ruleContent}} -->
        </section>
		 

 
		</div>
	 
</template>

<script>
	export default {
		ready() {
			this.$dispatch('title', '活动规则'); //微信头部
			console.log(localStorage.getItem('ruleContent'));
			this.activityInfo=localStorage.getItem('ruleContent');
		 	 
		},
		data() {
			return { 
				activityInfo:'',
			}
		},
	}
</script>