<template>
	<div class="game-view-one seat-bg">
		<seat></seat>
	 </div>
</template>
<script>
	export default {
		components: {
			seat: require('./seat.config.vue')
		},
		data() {
			return {
					 
			}
		},
		ready() {
			
		}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
</style>