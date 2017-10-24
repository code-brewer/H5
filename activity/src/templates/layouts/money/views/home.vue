<template>
	<div class="app-view view-home">
		<logo></logo>
		<activity-box></activity-box>
		<activity-date></activity-date>
		<remaining-number-of-prizes></remaining-number-of-prizes>
		<number-of-participants></number-of-participants>
		<start-button></start-button>
		<rule-link></rule-link>
		<!-- <rank-link></rank-link> -->
	</div>
</template>

<script>
	export default {
		components: {
			'logo': require('../../../components/logo/logo'),
			'activity-box': require('../../../components/activity-box/activity-box'),
			'activity-date': require('../../../components/activity-date/activity-date'),
			'remaining-number-of-prizes': require('../../../components/remaining-number-of-prizes/remaining-number-of-prizes'),
			'start-button': require('../../../components/button/start-button'),
			'number-of-participants': require('../../../components/number-of-participants/number-of-participants'),
			'rule-link': require('../../../components/rule-link/rule-link'),
			// 'rank-link': require('../../../components/rank-link/rank-link')
		}
	}
</script>