<template>
	<div class="nochange-modal-title">
		<p  v-el:nochangecon :style="{'font-size':activityConfig.noChange.conSize,'color':activityConfig.noChange.conColor}">{{activityConfig.noChange.con}}</p>
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
