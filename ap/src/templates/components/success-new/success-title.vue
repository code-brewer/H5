<template>
	<div class="success-title" v-el:successtitle :style="{'background-image':(activityConfig.success.titleImg!=''?'url('+activityConfig.success.titleImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.success.titleImgH}">
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
	}
</script>
