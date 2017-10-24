<template>
	<div class="success-btn" v-el:successbtn :style="{'background-image':(activityConfig.success.btnImg!=''?'url('+activityConfig.success.btnImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.success.btnImgH}" @click="dolucky">
	</div>
</template>

<script>
	export default {
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
				doluckyListener:null
			}
		},
		methods:{
			//其他地方调此方法
			setDoluckyListener(listener){
				this.doluckyListener = listener;
			},
			dolucky(){
				if(this.doluckyListener){
 					this.doluckyListener();
 				}
			}
		}
	}
</script>
