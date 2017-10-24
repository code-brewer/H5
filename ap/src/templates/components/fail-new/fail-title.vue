<template>
	<div class="fail-title" v-el:successtitle :style="{'background-image':(activityConfig.fail.titleImg!=''?'url('+activityConfig.fail.titleImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.fail.titleImgH}">
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
