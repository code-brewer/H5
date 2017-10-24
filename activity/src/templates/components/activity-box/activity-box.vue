<template>
	<div class="wap-activity-box" v-el:box v-link="{path:'/prize'}" :style="{'background-image':(activityConfig.box.imgUrl!=''?'url('+activityConfig.box.imgUrl+')':1),'height':activityConfig.box.imgH}">
	</div>
</template>
<script>
export default {
		data(){
			 var activityConfig = window.store.activityConfig;
			return{
				activityConfig,
			}
		}
	}
</script>
<style lang="scss" src="./activity-box.scss"></style>