<template>
	<div class="wap-activity-box"
	     v-el:box
	     v-link="{path:'/prize'}"
		 @click="statistic"
	     :style="{'background-image':(activityConfig.box.imgUrl!=''?'url('+activityConfig.box.imgUrl+')':1),'height':activityConfig.box.imgH}">
	</div>
</template>
<script>
export default {
	props: {
		statistic: {
			type: Function,
			default: function () {

			}
		}
	},
	data() {
		var activityConfig = window.store.activityConfig;
		return {
			activityConfig,
		}
	}
}
</script>
<style lang="scss" src="./activity-box.scss"></style>