<template>
	<div class="lucky-modal-btn" :style="{'background-image':(activityConfig.lucky.btnImg!=''?'url('+activityConfig.lucky.btnImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.lucky.btnImgH}" @click="closeModal">
	</div>
</template>

<script>
	export default {
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
				luckyListener:null,
			}
		},
		methods:{
			//其他地方调此方法
			setLuckyListener(listener){
				var that = this;
				that.luckyListener = listener;
			},
			closeModal(){
				var that = this;
				if(that.luckyListener){
					that.luckyListener();
 				}
			}
		}
	}
</script>
