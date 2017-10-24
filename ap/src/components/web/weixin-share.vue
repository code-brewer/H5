<template>
	<div class="wx-share-view">
		<div class="upload-view">
			<div class="left" :style="{'background-image':(weixinShare.imgUrl!=''?'url('+weixinShare.imgUrl+')':1)}">
				<file-upload v-show="false" name="weixinShareUpload" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
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
		<div class="info-view">
			<p>
				<span class="title">主题：</span>
				<input type="text" class="form-control" v-model="weixinShare.title">
			</p>
			<p>
				<span class="title">摘要：</span>
				<input type="text" class="form-control" v-model="weixinShare.description">
			</p>
		</div>
		<p style="padding: 20px 0;">此功能需要到账户信息绑定微信公众号即可使用</p>
	</div>

</template>
<script>
	export default {
		props: {
			weixinShare: {
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
			setDefaultImg() {
				this.weixinShare.imgUrl = this.weixinShare.defaultImgUrl;
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
					if(file._id == "weixinShareUpload") {
						this.weixinShare.imgUrl = res.repBody.fileUrl;
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
	@import '../../css/bootstrap/_variables.scss';
	@media (max-width: $screen-lg-min) {
		.upload-view {
			.right {
				width: 290px!important;
			}
		}
		.info-view {
			p {
				input {
					width: 296px!important;
				}
			}
		}
	}
	
	.wx-share-view {
		width: 490px;
		height: 250px;
		padding: 10px;
		border: 1px solid #d6d6d6;
		.info-view {
			padding-top: 10px;
			p {
				position: relative;
				.title {
					display: inline-block;
					color: #000;
					font-size: 12px;
					width: 90px;
				}
				input {
					display: inline-block;
					width: 368px;
					font-size: 12px;
					color: #000;
				}
			}
		}
		.upload-view {
			position: relative;
			width: 100%;
			font-size: 0;
			padding-bottom: 20px;
			border-bottom: 1px dashed #a6a6a6;
			.left {
				background-color: #e2e2e2;
				width: 100px;
				height: 100px;
				display: inline-block;
				background-size: 100%;
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