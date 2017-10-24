<template>
	<wap-button :config.sync="startBtn">{{startBtn.text.value}}</wap-button>
</template>
<script>
	import button from './button.config.vue'
	export default {
		components: {
			'wap-button': button
		},
		data(){
			var activityConfig = window.store.activityConfig;
			return {
				startBtn: activityConfig.startBtn
			}
		}
	}
</script>
