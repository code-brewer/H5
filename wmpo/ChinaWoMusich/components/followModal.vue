<template>
	<modal :show.sync="followShow" :bg="false">
		<div class="components-follow">
			<div class="box" style="background: #131620; border: 2px solid #3bbfe7;text-align: center;">
				<p class="title">提示</p>
				<img :src="'h/images/wyyQrcode.jpg'" style="margin-top: 30px;">
				<p class="follow-panel">长按二维码关注"沃音乐"<br>微信公众号参与活动</p>
				<img class="close-img" :src="'f/images/sp-close.png'" @click="followShow = false">
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from './../../../src/components/Modal.vue'
	import api from './../utils/serverapi.js'
	export default {
		components: {
			modal
		},
		props: {
			followShow: {
				type: Boolean,
				default: false
			}
		},
	}
</script>

<style lang="sass">
	.components-follow {
		width: 100%;
		.box {
			position: relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #fff;
			.title {
				font-size: 38.84px;
				line-height: 46px;
				color: #fff;
				text-align: center;
			}
			.follow-panel {
				line-height: 40px;
				padding: 30px 20px 20px;
				font-size: 30px;
			}
			.confirm-btn {
				display: block;
				width: 220px;
				height: 75px;
				margin: 35px auto;
				line-height: 75px;
				font-size: 30px;
				text-align: center;
				color: #fff;
				background-color: #98ce2e;
				border-radius: 25px;
			}
			.close-img {
				position: absolute;
				right: 20px;
				top: 20px;
				max-width: 56px;
				max-height: 50px;
			}
		}
	}
	
	.modal.modal-transition .modal-dialog {
		margin: 160px 30px;
	}
</style>