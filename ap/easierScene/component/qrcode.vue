<template>
	<div class="code" transition="code" @click="show=false" v-show="show">
		<img :src="url" />
	</div>
</template>
<script>
	export default {
		data() {
				return {
					url: 'image/icon-qrcode.png'
				}
			},
			props: {
				moid: {
					Number,
					default: 0
				},
				show: {
					Boolean,
					default: false
				}
			},
			watch: {
				show(v) {
					if(v) {
						this.createQrcode();
					}
				}
			},
			methods: {
				createQrcode() {
					var url = location.href.split("/wm")[0] + "/wm/cms/motive/createQrcode?url=" + location.href.split("/wm")[0] + "/wm/wap-login.jsp?moid=" + this.moid;
					this.url = url;
				},
			}
	}
</script>
<style lang="scss">
	.code-transition {
		transition: all .3s ease;
	}
	.code {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		left: 0;
		top: 0;
		z-index: 99999;
		opacity: 1;
		img {
			position: absolute;
			width: 428px;
			height: 428px;
			top: 50%;
			left: 50%;
			margin: -214px 0px 0px -214px;
		}
	}
	.code-enter,
	.code-leave {
		opacity: 0;
	}
</style>