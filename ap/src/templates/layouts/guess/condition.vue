<template>
	<div class="label-inline">
		<span class="onse">拼图上传：</span>
		<div class="form-group pics-upload">
			<ul>
				<li class="pic-wrap" v-for="image in imgItem">
					<figure>
						<img :src="image.imgUrl" v-if="image">
						<span class="del-btn" @click="removePic(image)">
							<i class="fa fa-times-circle"></i></span>
					</figure>
				</li>
				<li class="upload-wrap">
					<file-upload name="pictureUpload" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		data() {
				var imgItem = window.store.activityConfig.imgItem;
				return {
					imgItem
				}
			},
			components: {
				'file-upload': require('../../../js/vue.file-upload.js')
			},
			methods: {
				removePic(image) {
					if(this.imgItem.length <= 4) return;
					this.imgItem.$remove(image)
				},
			},
			events: {
				onFileChange: function(file) {
					this.fileProgress = 0;
					this.allFilesUploaded = false;
				},
				beforeFileUpload: function(file) {
					this.$dispatch('progress', 1)
				},
				onFileProgress: function(progress) {
					console.log('onFileProgress', progress);
					this.fileProgress = progress.percent;
				},
				onFileUpload: function(file, res) {
					if(res.resCode == 0) {
						this.$dispatch('progress', 0)
						if(file._id == "pictureUpload") {
							this.imgItem.push({
								'imgUrl': res.repBody.fileUrl,
								'title': ''
							})
						}

					}
				},
				onFileError: function(file, res) {
					console.error('onFileError', file, res);
				},
				onAllFilesUploaded: function(files) {
					console.log('onAllFilesUploaded', files);
					this.allFilesUploaded = true;
				}
			}
	}
</script>
<style lang="scss">
	@import '../../../css/bootstrap/_variables.scss';
	#condition-config-content {
		.del-btn {
			display: inline-block;
			color: $brand-danger;
			margin-left: 10px;
			font-size: 18px;
			vertical-align: middle;
			cursor: pointer;
			&:hover {
				color: lighten($brand-danger, 3%);
			}
			&:active {
				color: darken($brand-danger, 6.5%);
			}
		}
		.add-btn {
			display: inline-block;
			color: $brand-success;
			margin-left: 10px;
			font-size: 18px;
			vertical-align: middle;
			cursor: pointer;
			&:hover {
				color: lighten($brand-success, 3%);
			}
			&:active {
				color: darken($brand-success, 6.5%);
			}
		}
		.form-group {
			margin-bottom: 5px;
			font-size: 12px;
			> div {
				display: inline-block;
				max-width: 100%;
			}
		}
		.short-input {
			display: inline-block;
			width: 55px;
			text-align: center;
		}
		div.pics-upload {
			overflow: hidden;
			ul {
				margin-top: -10px;
				margin-left: -10px;
				overflow: hidden;
				padding: 0;
				list-style: none;
				li {
					padding: 10px;
					float: left;
					> div,
					figure {
						width: 100px;
						height: 100px;
						position: relative;
						overflow: hidden;
						img {
							width: 100%;
							display: block;
						}
						span.del-btn {
							position: absolute;
							right: 3px;
							top: 3px;
							line-height: 18px;
							z-index: 3;
						}
					}
					&.upload-wrap {
						div.upload-btn {
							.btn {
								width: 100%;
								height: 100%;
								position: relative;
								z-index: 2;
								border: 3px dashed #eee;
							}
							input[type="file"] {
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								opacity: 0;
								position: absolute;
							}
						}
					}
					&.pic-wrap {
						text-align: center;
						.upload-btn {
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							position: absolute;
						}
						> span {
							display: inline-block;
							margin-top: 5px;
						}
						> small {
							display: block;
							color: $brand-danger;
						}
					}
					&.upload-wrap.pic-wrap {
						figure {
							height: 150px;
						}
						a {
							display: block;
							width: 100px;
							padding: 8px 0px;
							text-decoration: none;
							border: 1px solid #bad7e4;
							border-radius: 5px;
							margin-top: 5px;
						}
					}
				}
			}
		}
	}
</style>