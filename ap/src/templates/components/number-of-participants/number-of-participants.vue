<template>
	<div class="wap-number-of-participants" v-show="activityConfig.participant.show">
		<p v-el:number :style="{'color':activityConfig.participant.text.color,'font-size':activityConfig.participant.text.fontSize}">
			{{activityConfig.participant.text.valueL}}
			<span v-el:count class="count" :style="{'color':activityConfig.participant.num.color,'font-size':activityConfig.participant.num.fontSize}">{{activityConfig.participant.addValue}}</span> {{activityConfig.participant.text.valueR}}
		</p>
	</div>
</template>
<style lang="scss">
	.wap-number-of-participants {
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
			this.getActivityUv();
		},
		methods:{
			//获取活动参与人数
			getActivityUv(){
				sapi.getActivityUv(this, {}, (back)=> {
					if(back.resCode =="0"){
						this.activityConfig.participant.addValue = parseInt(this.activityConfig.participant.addValue) + parseInt(back.repBody.msg);
					}
                	
				});
			}
		}
	}
</script>
