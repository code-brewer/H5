<template>
	<div class="unlucky-modal-title">
		<p  v-el:unluckytitle :style="{'font-size':activityConfig.unlucky.titleSize,'color':activityConfig.unlucky.titleColor}">{{activityConfig.unlucky.title}}</p>
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
