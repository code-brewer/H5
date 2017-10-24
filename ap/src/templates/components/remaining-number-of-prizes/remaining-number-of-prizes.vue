<template>
	<div class="wap-remaining-number-of-prizes"   v-show="activityConfig.atNum.show">
		<p class="number-countent" :style="{'color':activityConfig.atNum.text.color,'font-size': activityConfig.atNum.text.fontSize}">
			{{activityConfig.atNum.text.valueL}} <span class="count" :style="{'color':activityConfig.atNum.num.color,'font-size': activityConfig.atNum.num.fontSize}">{{activityConfig.atNum.num.value}}</span> {{activityConfig.atNum.text.valueR}}
		</p>

	</div>
</template>
<style lang="scss">
	.wap-remaining-number-of-prizes {
		p {
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
			ready() {
				this.getSurPlusPrize();
			},
			methods:{
				//获取活动剩余奖品数量
				getSurPlusPrize(){
					sapi.getSurPlusPrize(this, {}, (back)=> {
						if(back.resCode =="0"){
							this.activityConfig.atNum.num.value = back.repBody.msg;
						}
	                	
					});
				}
			}
	}
</script>