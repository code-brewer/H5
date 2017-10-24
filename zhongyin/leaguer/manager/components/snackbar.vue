<template>
	<div class="snackbar" v-show="showSnackBar" transition="snackbar">{{{text}}}</div>
</template>
<script>
	export default {
		props: {
			text: '',
			showSnackBar: false,
			auto: {
				default: true
			}
		},
		watch: {
			showSnackBar(val) {
				if (val && this.auto) {
					setTimeout(() => {
						this.showSnackBar = false;
					},1500);
				}
			}
		}
	}
</script>
<style lang="scss">
	.snackbar {
		position: fixed;
		left: 50%;
		bottom: -100px;
		width: 40%;
		padding: 10px;
		line-height: 40px;
		text-align: center;
		font-size: 24px;
		color: white;
		border-radius: 10px;
		background: rgba(0,0,0,.6);
		transform: translate(-50%,0);
		z-index: 1001;
	}
	.snackbar-transition {
		transition: all .5s ease-out;
		bottom: 60px;
	}
	.snackbar-enter {
		bottom: -100px;
	}
	.snackbar-leave {
		bottom: -100px;
	}
</style>