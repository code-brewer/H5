<template>
	<div class="qr-code-view">
		<div class="upload-view">
			<div class="left" :style="{'background-image':(qeCode.imgUrl!=''?'url('+qeCode.imgUrl+')':1)}">
				<file-upload v-show="false" name="qeCodeUpload" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
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
				<input type="text" class="form-control" v-model="qeCode.title">
			</p>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			var qeCode = window.store.activityConfig.qeCode;
			return{
				qeCode,
				defaultImg : window.store.activityConfig.qeCode.imgUrl.toString()
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
				this.qeCode.imgUrl=this.defaultImg;
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
					if(file._id == "qeCodeUpload") {
						this.qeCode.imgUrl=res.repBody.fileUrl;
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
	.qr-code-view {
		width: 490px;
		height: 200px;
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