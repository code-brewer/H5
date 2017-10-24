<template>
	<div class="errorText" v-show="show" transition="error">{{text}}</div>
</template>
<script>
	export default {
		props: {
			show: {
				default: false
			},
			text: {
				default: ''
			}
		},
		watch: {
			show(val) {
				val&&setTimeout(() => {
					this.show = false;
				},2000);
			}
		}
	}
</script>
<style lang="scss">
	.errorText {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 300px;
		padding: 20px 10px;
		line-height: 1.5;
		color: white;
		font-size: 24px;
		text-align: center;
		border-radius: 5px;
		background: rgba(0,0,0,.6);
		-webkit-transform: translate(-50%,-50%);
		-moz-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
		pointer-events: none;
		z-index: 10;
	}
	.error-transition {
		opacity: 1;
		transition: all .3s ease-out;
		-webkit-transform: translate(-50%,-50%);
		-moz-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
	}
	.error-enter,.error-leave {
		opacity: .3;
		-webkit-transform: translate(-50%,-100%);
		-moz-transform: translate(-50%,-100%);
		transform: translate(-50%,-100%);
	}
</style>