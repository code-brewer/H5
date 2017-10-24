<template>
	<div class="number-of-dolucky">
		<p v-el:prizenumber :style="{'color':activityConfig.success.text.color,'font-size':activityConfig.success.text.fontSize}" >
		{{activityConfig.success.text.valueL}} 
		<span v-el:prizecount class="count" :style="{'color':activityConfig.success.num.color,'font-size':activityConfig.success.num.fontSize}" >{{times}}</span> 
		{{activityConfig.success.text.valueR}}	
	</p>
	</div>
</template>
<style lang="scss">
	.number-of-dolucky {
		position: relative;
		text-align: right;
		font-size: 2.6rem;
		position: relative;
		span {
			color: #ffb81d;
			text-decoration: underline;
		}
		p{
			margin: 0 0 10px;
		}
	}
</style>
<script>
	import sapi from '../../service'
	export default {
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
			}
		},
		props: {
			times: {
				String,
				default: "0",
			}
		},
		ready(){
			// this.getActivityUv();
		},
		methods:{
			// //获取活动参与人数
			// getActivityUv(){
			// 	sapi.getActivityUv(this, {}, (back)=> {
			// 		if(back.resCode =="0"){
			// 			this.activityConfig.participant.addValue = parseInt(this.activityConfig.participant.addValue) + parseInt(back.repBody.msg);
			// 		}
                	
			// 	});
			// }
		}
	}
</script>
