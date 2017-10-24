<template>
	<div>
		<img :src="imgSrc" v-if="showImg" style="display: block; width: 100%;">
		<div class="load2">
			<load2 :show.sync="isLoad"></load2>
		</div>
	</div>
</template>
<script>
	import api from '../../api/index1.js'
	import load2 from '../../components/load/load2.vue'
	export default {
		components: {
			load2
		},
		created() {
			this.getActCardQrcode();
		},
		data() {
			return {
				isLoad: false,
				imgSrc: '',
				showImg: false
			}
		},
		methods: {
			/**
			 * 获取个人信息
			 */
			getActCardQrcode() {
				var self = this;
				this.isLoad = true;
				api.actCardQrcode(this, {openid: this.$route.params.id}, back => {
					if (back.resCode === '0') {
						var canvas = document.createElement('canvas'),
							ctx = canvas.getContext('2d'),
							bg = new Image(),
							qrcode = new Image();
						bg.src = 'images/template/bg4-1.jpg?v2';

						canvas.width = 640;
						canvas.height = 1027;

						bg.onload = function() {
							ctx.drawImage(bg, 0, 0);
							qrcode.src = back.repBody.qrcodePath;
							qrcode.onload = function() {
								ctx.drawImage(qrcode, 0, 0, qrcode.width, qrcode.height, 205, 700, 230, 230);
								self.isLoad = false;
								self.imgSrc = canvas.toDataURL('image/png');
								self.showImg = true;
							}
						}

					}
				})
			}
		}
	}
</script>
<style>
	.load2 {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>