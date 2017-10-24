<template>
	<div class="banner-page-view">
		<div class="upload-view">
			<div class="left" :style="{'background-image':(bannerPage.imgUrl!=''?'url('+bannerPage.imgUrl+')':'url('+bannerPage.defaultImgUrl+')')}">
				<file-upload v-show="false" name="bannerUpload" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
			</div>
			<div class="right">
				<p class="msg">
					(图片格式jpg、png、gif，图片大小必须小于0.1M， 建议尺寸160 x 160)
				</p>
				<p>
					<a class="btn btn-primary" @click="clickInput">上传</a>
					<a class="btn btn-primary" @click="setDefaultImg">恢复默认</a>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			bannerPage: {
				default: function() {
					return {}
				}
			}
		},
		components: {
			'file-upload': require('../../js/vue.file-upload.js')
		},
		methods: {
			clickInput() {
				this.$broadcast("click");
			},
			setDefaultImg(){
				this.bannerPage.imgUrl = this.bannerPage.defaultImgUrl
			}
		},
		events: {
			onFileChange(file) {
				this.fileProgress = 0;
				this.allFilesUploaded = false;
			},
			beforeFileUpload(file) {
				this.$dispatch('progress', 1)
			},
			onFileProgress(progress) {
				console.log('onFileProgress', progress);
				this.fileProgress = progress.percent;
			},
			onFileUpload(file, res) {
				if(res.resCode == 0) {
					this.$dispatch('progress', 0)
					if(file._id == "bannerUpload") {
						this.bannerPage.imgUrl=res.repBody.fileUrl;
					}
				}
			},
			onFileError(file, res) {
				console.error('onFileError', file, res);
			},
			onAllFilesUploaded(files) {
				console.log('onAllFilesUploaded', files);
				this.allFilesUploaded = true;
			}
		}
	}
</script>
<style lang="scss">
	.banner-page-view {
		width: 490px;
		height: 120px;
		padding: 10px;
		border: 1px solid #d6d6d6;
		.upload-view {
			position: relative;
			width: 100%;
			font-size: 0;
			padding-bottom: 20px;
			.left {
				background-color: #e2e2e2;
				width: 100px;
				height: 100px;
				display: inline-block;
				background-size:100%;
				background-repeat: no-repeat;
			}
			.right {
				vertical-align: top;
				width: 360px;
				display: inline-block;
				padding: 22px 0px 0px 20px;
				.msg {
					font-size: 12px;
					color: #a6a6a6;
				}
				.btn {
					margin-right: 10px;
					font-size: 12px;
					color: width;
					width: 90px;
				}
			}
		}
	}
</style>