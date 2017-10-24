<template>
	
	<div class="app-view view-home">
		<activity-box></activity-box>
		<static-banner></static-banner>
		<logo></logo> 
		<remaining-number-of-prizes></remaining-number-of-prizes>
		<number-of-participants></number-of-participants>
		<start-button :end-jump="true"></start-button>
		<rule-link></rule-link>
	</div>
</template>
<script>
	export default {
		components: {
			'logo': require('../../../components/logo/logo'),
			'static-banner': require('../../../components/static-banner/static-banner'),
			'remaining-number-of-prizes': require('../../../components/remaining-number-of-prizes/remaining-number-of-prizes'),
			'start-button': require('../../../components/button/start-button'),
			'rule-link': require('../../../components/rule-link/rule-link'),
			'activity-box': require('../../../components/activity-box/activity-box'),
			'number-of-participants': require('../../../components/number-of-participants/number-of-participants'),
		}
	}
</script>
