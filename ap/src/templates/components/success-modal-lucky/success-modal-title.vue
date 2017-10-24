<template>
	<div class="lucky-modal-title">
		<p  v-el:luckytile :style="{'font-size':activityConfig.lucky.titleSize,'color':activityConfig.lucky.titleColor}">{{activityConfig.lucky.title}}</p>
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
