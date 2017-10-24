<template>
	<div class="confirm-btn__container">
		<button class="receive-title" type="button" :style="{'background-image': (activityConfig.receive.titleUrl!='' ? 'url('+activityConfig.receive.titleUrl+')' : 1)}">信息填写</button>
	</div>
</template>
<script>
	export default {
		components: {
		},
		data() {
			var activityConfig = window.store.activityConfig
			return {
				activityConfig
			}
		},
		ready() {
		},
		methods: {
			
		},
		watch: {
			
		}
	}
</script>
<style lang="scss">
    $ratio: 750/320;
	@import './common.scss';
</style>