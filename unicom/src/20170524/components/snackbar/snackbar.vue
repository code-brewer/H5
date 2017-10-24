<template>
	<div v-show="options.show">
		<p class="snackbar">{{options.text}}</p>
	</div>
</template>
<script>
	export default {
		props: {
			options: {
				type: Object,
				default: null
			}
		},
		watch: {
			'options.show'(val) {
				if (val) {
					setTimeout(() => {
						this.options.show = false;
					}, 2000);
				}
			}
		}
	}
</script>
<style scoped>
	div {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(255, 255, 255, 0);
		z-index: 1001;
	}
	.snackbar {
		position: fixed;
		top: 50%;
		left: 50%;
		max-width: 640px;
		padding: 30px;
		font-size: 28px;
		color: white;
		transform: translate(-50%, -50%);
		border-radius: 30px;
		font-weight: 700;
		background: rgba(0, 0, 0, .8);
		white-space: nowrap;
	}
</style>