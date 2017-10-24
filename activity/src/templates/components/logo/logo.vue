<template>
	<div class="wap-logo" v-show="activityConfig.logo.show">
		<div class="logo" v-el:logo v-show="activityConfig.logo.isText=='false'" :style="{'background-image':(activityConfig.logo.imgUrl?'url('+activityConfig.logo.imgUrl+')':1),'height':activityConfig.logo.imgH,'background-repeat':'no-repeat'}"></div>
		<div v-show="activityConfig.logo.isText=='true'">
			<span v-el:text class="logo_text" :style="{'color': activityConfig.logo.text.color,'font-size':activityConfig.logo.text.fontSize}"> {{activityConfig.logo.text.value}}</span>
		</div>
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

<style lang="scss" src="./logo.scss"></style>