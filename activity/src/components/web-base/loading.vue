<template>
	<div class="msg-ts" v-show="showMsg">{{{msg}}}</div>
</template>
<style>
	.msg-ts {
		position: fixed;
		z-index: 10;
		color: #fff;
		padding: 0px 10px;
		background-color: rgba(0, 0, 0, 0.48);
		min-width: 120px;
		min-height: 100px;
		border-radius: 5px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		line-height: 100px;
		z-index: 99999;
	}
</style>
<script>
	export default {
		props: {
			showMsg: {
				Boolean,
				default: false
			},
			msg: {
				String,
				default: ''
			}
		},
		watch: {
			showMsg(v) {
				console.log(223333)
				if(v) {
					setTimeout(() => {
						this.showMsg = false;
					}, 2000)
				}
			}
		}
	}
</script>