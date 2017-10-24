<template>
	<div class="unlucky-modal-btn" :style="{'background-image':(activityConfig.unlucky.btnImg!=''?'url('+activityConfig.unlucky.btnImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.unlucky.btnImgH}" @click="closeUnlucky">
	</div>
</template>

<script>
	export default {
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
				unluckyListener:null,
			}
		},
		methods:{
			//其他地方调此方法
			setUnluckyListener(listener){

				var that = this;
				that.unluckyListener = listener;
			},
			closeUnlucky(){
				var that = this;
				if(that.unluckyListener){
					that.unluckyListener();
 				}
			}
		}
	}
</script>
