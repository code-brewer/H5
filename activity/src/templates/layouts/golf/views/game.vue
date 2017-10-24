 <template>
	<div class="game-view-one golf-bg">
		<golf></golf>
	 </div>
</template>
<script>
	export default {
		components: {
			golf: require('./golf.vue')
		}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
</style>