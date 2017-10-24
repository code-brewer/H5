<template>
	<div class="nochange-modal-title">
		<p  v-el:nochangetitle :style="{'font-size':activityConfig.noChange.titleSize,'color':activityConfig.noChange.titleColor}">{{activityConfig.noChange.title}}</p>
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
