<template>
	<div class="app-view view-home">
		<logo></logo> 
		<remaining-number-of-prizes></remaining-number-of-prizes>
		<start-button></start-button>
		<rule-link></rule-link>
	</div>
</template>

<script>

	export default {
		components: {
			'logo': require('../../../components/logo/logo'),
			'remaining-number-of-prizes': require('../../../components/remaining-number-of-prizes/remaining-number-of-prizes'),
			'start-button': require('../../../components/button/start-button'),
			'rule-link': require('../../../components/rule-link/rule-link')
		}
	}
</script>
