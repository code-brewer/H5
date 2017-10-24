<template>
	<div class="reset-upload-thumb">
		<div class="upload-view">
			<div class="left"
			     :style="{'background-image':(weixinShare.imgUrl!=''?'url('+weixinShare.imgUrl+')':1)}">
				<file-upload v-show="false"
				             :name="name"
				             action="upload/upVideoOrFile"
				             :auto="true"
				             class="upload-btn"></file-upload>
			</div>
			<div class="right">
				<p>
					<a class="btn btn-primary"
					   @click="clickInput">上传</a>
					<a class="btn btn-primary"
					   @click="setDefaultImg">恢复默认</a>
				</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		weixinShare: {
			default: function () {
				return {}
			}
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
			if (res.resCode == 0) {
				this.$dispatch('progress', 0)
				if (file._id == "weixinShareUpload") {
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
<style lang="scss" src='./ResetuploadThumb.scss'></style>