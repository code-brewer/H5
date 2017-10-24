<template>
	<div class="upload-image__container">
		<div class="upload-view">
			<file-upload v-show="false"
			             :name="name"
			             action="upload/upVideoOrFile"
			             :auto="true"
			             class="upload-btn"></file-upload>
			<a class="btn btn-primary"
			   @click="clickInput">上传</a>
			<a v-show="resetAble"
			   class="btn btn-primary"
			   @click="setDefaultImg">恢复默认</a>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		imgUrl: {
			type: String,
			default: ''
		},
		defaultImgUrl: {
			type: String,
			default: 'http://157.255.23.23/images/fsd/ap/20170510/88_48a97045_7d13_4af8_9a98_9e32f16100a1.png'
		},
		name: {
			type: String,
			default: ''
		},
		resetAble: {
			type: Boolean,
			default: false
		}
	},
	components: {
		'file-upload': require('../../../js/vue.file-upload.js')
	},
	methods: {
		clickInput() {
			this.$broadcast("click");
		},
		setDefaultImg() {
			this.imgUrl = this.defaultImgUrl;
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
			if (res.resCode == 0) {
				this.$dispatch('progress', 0)
				if (file._id == this.name) {
					this.imgUrl = res.repBody.fileUrl;
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
<style lang="scss" src='./UploadImage.scss'></style>