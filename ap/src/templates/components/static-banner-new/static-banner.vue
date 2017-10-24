<template>
	<div class="wap-static-banner" v-el:banner :style="{'background-image':(activityConfig.banner.imgUrl?'url('+activityConfig.banner.imgUrl+')':1),'height':activityConfig.banner.imgH}" v-show="activityConfig.banner.show">
	</div>
</template>

<script>
	export default {
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig
			}
		}
	}
</script>