<template>
	<div class="app-view view-home">
		<logo></logo> 
		<activity-box></activity-box> 
		<remaining-number-of-prizes></remaining-number-of-prizes>
		<number-of-participants></number-of-participants>
		<start-button></start-button>
		<rule-link></rule-link>
	</div>
</template>

<script>
	export default {
		components: {
			'logo': require('../../../components/logo/logo'),
			'activity-box': require('../../../components/activity-box/activity-box'),
			'remaining-number-of-prizes': require('../../../components/remaining-number-of-prizes/remaining-number-of-prizes'),
			'number-of-participants': require('../../../components/number-of-participants/number-of-participants'),
			'start-button': require('../../../components/button/start-button'),
			'rule-link': require('../../../components/rule-link/rule-link')
		}
	}
</script>
