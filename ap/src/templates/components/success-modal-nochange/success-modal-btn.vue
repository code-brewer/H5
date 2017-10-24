<template>
	<div class="nochange-modal-btn" :style="{'background-image':(activityConfig.noChange.btnImg!=''?'url('+activityConfig.noChange.btnImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.noChange.btnImgH}" @click="closeNochange">
	</div>
</template>

<script>
	export default {
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
				nochangeListener:null
			}
		},
		methods:{
			//其他地方调此方法
			setNochangeListener(listener){
				var that = this;
				that.nochangeListener = listener;
			},
			closeNochange(){
				var that = this;
				if(that.nochangeListener){
					that.nochangeListener();
 				}
			}
		}
	}
</script>
