<template>
	<div class="rule">
		<h2>{{text}}</h2>
		<p v-for="item in ruledetail" v-if="item">{{item}}</p>
		<!-- <p>满足每档任务签到条件后，每天签到均可获得1次抽奖机会（抽奖机会限当日使用，次日清零）；</p>
		<p>每满足一个签到任务，抽奖可得奖品增加一种，签到天数越多，可获得的奖品越丰富；</p>
		<p>在完成签到任务中如果漏签视为任务失败，需重新连续签到任务天数才能获奖；</p>
		<p>每个任务每月只能完成一次，已获得的奖励不能重复获奖；</p>
		<p>活动期间如发现恶意刷奖用户，活动方有权取消其获奖资格。</p> -->
	</div>
</template>
<style lang="scss" scoped>
	.rule {
		position: relative;
		// margin-top: 80px;
		margin-top:50px;
		padding: 80px 20px 40px 20px;
		background: linear-gradient(left, #852ba0, #9a389d, #852ba0);
		h2 {
			position: absolute;
			top: -35px;
			left: 50%;
			padding: 10px 30px;
			border-radius: 30px;
			font-size: 40px;
			color: white;
			font-style: italic;
			text-align: center;
			line-height: 80px;
			background: rgba(139, 47, 157, .8);
			transform: translate(-50%, 0);
		}
		p {
			min-height: 25px;
			padding: 0 0 10px 22px;
			color: white;
			font-size: 26px;
			line-height: 1.5;
			background: url(../images/star.png) left 10px no-repeat;
		}
	}
</style>

<script>	
	export default {
		props: {
			text:'',
			// ruledetail:''
			ruledetail:{
				default: ''
			}
		},
		data() {
			return {

			}
		},
		watch: {
			ruledetail(val) {
				// console.log("sssssss")
				// console.log(val)
			}
		}
	}
</script>