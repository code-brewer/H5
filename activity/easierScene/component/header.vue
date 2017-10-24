<template>
	<div class="header">
		<qrcode :moid="moid" :show.sync="showQrcord"></qrcode>
		<div class="left">
			{{$root.info.tiltle}}
		</div>
		<div class="right">
			<span>{{$root.messageList.length}}条消息</span>
			<img :src="qrcode"  @click="createQrcode">
		</div>
	</div>
</template>
<script>
	import qrcode from './qrcode.vue'
	export default {
		components: {
			qrcode
		},
		data() {
			return {
				qrcode: '../image/qrcode.jpg',
				moid: 0,
				showQrcord:false,
			}
		},
		methods: {
			createQrcode() {
				this.showQrcord = true;
			}
		},
		created() {
			this.moid = this.$root.moid;
			var url = location.href.split("/wm")[0] + "/wm/cms/motive/createQrcode?url=" + location.href.split("/wm")[0] + "/wm/wap-login.jsp?moid=" + this.moid;
			this.qrcode = url;
		}
	}
</script>
<style lang="scss">
	.header {
		height: 80px;
		width: 1230px;
		margin: 0 auto;
		color: white;
		.left {
			font-size: 36px;
			float: left;
			line-height: 80px;
		}
		.right {
			line-height: 80px;
			font-size: 18px;
			img {
				vertical-align: middle;
				width: 58px;
				height: 58px;
			}
			float: right;
		}
	}
</style>