<template>
	<div class="fail-btn" v-el:successbtn :style="{'background-image':(activityConfig.fail.btnImg!=''?'url('+activityConfig.fail.btnImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.fail.btnImgH}" @click="once">
	</div>
</template>

<script>
	export default {
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig
			}
		},
		methods:{
			once(){
				this.$route.router.go({path: 'home'});
			}
		}
	}
</script>
