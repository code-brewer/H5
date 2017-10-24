<template>
	<div class="label-inline" style="align-items: flex-start;">
		<span class="onse">通用背景：</span>
		<div class="bg-style-panel">
			<div>
				<div class="img" :style="{'background-image':bgUrl?'url('+common.bgUrl+')':1}"></div>
				<div class="upload-panel">
					<p>(图片格式jpg、png、gif，图片大小必须小于0.1M)</p>
					<span class="btn btn-primary btn-sm" @click="clickInput" style="margin-top: 20px; margin-bottom: 5px;">上传图片</span>
					<span class="btn btn-primary btn-sm" @click="setDefaultBgUrl" style="margin-top: 20px; margin-bottom: 5px;">恢复默认</span>
					<file-upload v-show="false" name="bgStyleUpload" action="upload/upVideoOrFile" :auto="true"></file-upload>
				</div>
			</div>
		</div>
	</div>
	<div class="label-inline" style="align-items: flex-start;">
		<set-senior-color></set-senior-color>
	</div>
	<div class="label-inline" style="align-items: flex-start;">
		<span class="onse">按钮样式：</span>
		<checkbox :checked="false" :model.sync="common.btnEnable">使用</checkbox>
	</div>
	<div class="label-inline" style="align-items: flex-start;">
		<span class="onse"></span>
		<div class="button-style-panel">
			<div class="top">
				<ul>
					<li>
						<span class="button-style button-style-default"></span>
						<radio name="buttonStyle" :model.sync="common.btnStyle" value="boxer"></radio>
					</li>
					<li>
						<span class="button-style button-style-circle"></span>
						<radio name="buttonStyle" :model.sync="common.btnStyle" value="fillet"></radio>
					</li>
					<li>
						<span class="button-style button-style-radius"></span>
						<radio name="buttonStyle" :model.sync="common.btnStyle" value="halfFillet"></radio>
					</li>
				</ul>
				<div class="button-color-picker">
					<span>按钮颜色：</span>
					<span class="color-picker-cube" @click="show=true" :style="{'background-color':common.btnColor}"></span>
					<Photoshop :colors.sync="colors" v-show="show" style="position: absolute;z-index: 2;right: -28px;"></Photoshop>
				</div>
			</div>
			<div class="bottom">
				<img :src="common.btnUrl">
				<p>(图片格式jpg、png、gif，图片大小必须小于0.1M)</p>
				<file-upload v-show="false" name="buttonStyleUpload" action="upload/upVideoOrFile" :auto="true"></file-upload>
				<span class="btn btn-primary btn-sm" @click="clickBtnInput">上传</span>
			</div>
		</div>
	</div>
	<div class="label-inline" style="align-items: flex-start;">
		<span class="onse">实时缩列图：</span>
		<div class="shrink-img">
			<div class="item" :style="{'background-color':common.bg}">
				<i style="width:20px;height: 10px;" :style="{'background-color': common.secondColor}"></i></br>
				<i style="width:56px;height: 17px;" :style="{'background-color': common.mainColor}"></i></br>
				<i style="width:25px;height: 5px;" :style="{'background-color': common.secondColor}"></i>
				<i style="width:12px;height: 10px;" :style="{'background-color': common.mainColor}"> </i>
				<i style="width:10px;height: 5px;" :style="{'background-color': common.secondColor}"></i> </br>
				<i style="width:35px;height: 12px;" :style="{'background-color': common.mainColor}"></i>
				<i style="width:35px;height: 12px;" :style="{'background-color': common.mainColor}"></i></br>
				<i style="width:25px;height: 10px;" :style="{'background-color': common.mainColor}"></i>
			</div>
			<div class="item" :style="{'background-color':common.bg}">
				<i style="width:20px;height: 10px;" :style="{'background-color': common.secondColor}"></i></br>
				<i style="width:20px;height: 5px;" :style="{'background-color': common.secondColor}"></i>
				<i style="width:20px;height: 5px;" :style="{'background-color': common.mainColor}"></i>
				<i style="width:20px;height: 5px;" :style="{'background-color': common.secondColor}"></i></br>
				<i class="circle"></i><i class="circle-left" :style="{'background-color': common.secondColor}"></i><i class="circle-right" :style="{'background-color': common.secondColor}"></i></br>
				<i class="circle"></i><i class="circle-left" :style="{'background-color': common.secondColor}"></i><i class="circle-right" :style="{'background-color': common.secondColor}"></i></br>
				<i class="circle"></i><i class="circle-left" :style="{'background-color': common.secondColor}"></i><i class="circle-right" :style="{'background-color': common.secondColor}"></i></br>
				<i class="circle"></i><i class="circle-left" :style="{'background-color': common.secondColor}"></i><i class="circle-right" :style="{'background-color': common.secondColor}"></i></br>
				<i style="width:35px;height: 12px;" :style="{'background-color': common.mainColor}"></i>
				<i style="width:35px;height: 12px;" :style="{'background-color': common.mainColor}"></i></br>
			</div>
			<div class="item" :style="{'background-color':common.bg}">
				<i style="width:50px;height: 10px;" :style="{'background-color': common.secondColor}"></i></br>
				<i style="width:10px;height: 5px;" :style="{'background-color': common.mainColor}"></i></br>
				<i style="width:80px;height: 12px;background-color: #ccc;"></i></br>
				<i style="width:38px;height: 12px;background-color: #ccc;"></i>
				<i style="width:38px;height: 12px;background-color: #ccc;"></i></br>
				<i style="width:35px;height: 12px;" :style="{'background-color': common.mainColor}"></i></br>
			</div>
			<div class="item" :style="{'background-color':common.bg}">
				<i style="width:60px;height: 10px;" :style="{'background-color': common.secondColor}"></i></br>
				<i style="width:20px;height: 2px;" :style="{'background-color': common.secondColor}"></i></br>
				<i style="width:25px;height: 4px;" :style="{'background-color': common.mainColor}"></i></br>
				<i style="width:40px;height: 45px;background-color: #ccc;"></i></br>
				<i style="width:15px;height: 2px;" :style="{'background-color': common.secondColor}"></i></br>
				<i style="width:40px;height: 4px;" :style="{'background-color': common.secondColor}"></i></br>
				<i style="width:30px;height: 8px;" :style="{'background-color': common.mainColor}"></i></br>
			</div>
		</div>
	</div>
</template>

<script>
	import radio from '../../web-base/radio'
	import setSeniorColor from './set-senior-color.vue'
	import checkbox from '../../web-base/checkbox'
	import vueColor from '../../vue-color/vue-color.js'
	export default {
		components: {
			radio,
			'file-upload': require('../../../js/vue.file-upload.js'),
			setSeniorColor,
			checkbox,
			Photoshop: vueColor.Photoshop
		},
		data() {
			var common = window.store.activityConfig.common;
			return {
				bgUrl: false,
				common,
				colors: {
					hex: '#194d33',
					a: 1
				},
				show: false,
			}
		},
		watch: {
			'common.bgUrl' (v) {
				if(v != "")
					this.bgUrl = true;
				else
					this.bgUrl = false;
			}
		},
		methods: {
			clickInput() {
				this.$broadcast("click", "bgStyleUpload");
			},
			clickBtnInput() {
				this.$broadcast("click", "buttonStyleUpload");
			},
			setDefaultBgUrl() {
				this.common.bgUrl = this.common.defaultBgUrl;
			}
		},
		ready() {
			if(this.common.bgUrl.length > 0) {
				this.bgUrl = true
			}
		},
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			}
		},
		events: {
			colorAccept() {
				this.common.btnColor = this.colors.hex;
				this.show = false;
			},
			colorCancel() {
				this.show = false;
			},
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
					if(file._id == "bgStyleUpload") {
						this.common.bgUrl = res.repBody.fileUrl;
					} else if(file._id == "buttonStyleUpload") {
						this.common.btnUrl = res.repBody.fileUrl;
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
	@import '../../../css/bootstrap/_variables.scss';
	@import '../../../css/bootstrap/_mixins.scss';
	.shrink-img {
		font-size: 0;
		.item {
			width: 90px;
			height: 160px;
			background: #e3e3e3;
			margin-right: 41px;
			display: inline-block;
			text-align: center;
			vertical-align: top;
			padding-top: 20px;
			.circle {
				width: 10px;
				height: 10px;
				background-color: white;
				border-radius: 5px;
				background-color: #ccc;
			}
			.circle-left {
				width: 20px;
				height: 10px;
				background-color: white;
			}
			.circle-right {
				width: 20px;
				height: 8px;
				background-color: white;
				margin-left: 15px;
			}
			i {
				display: inline-block;
				margin: 5px 3px 0px 3px;
			}
		}
		@media (max-width: $screen-lg-min) {
			.item {
				margin-right: 17px;
			}
		}
		.item:last-child {
			margin-right: 0px;
		}
	}
	
	.bg-style-panel {
		height: 160px;
		width: 100%;
		display: flex;
		> div {
			height: 100%;
			position: relative;
			> img,
			.img {
				display: inline-block;
				width: 90px;
				height: 160px;
				background: #e3e3e3;
				background-repeat: no-repeat;
				background-size: 100%;
				.bg-color {
					background: #333;
					position: absolute;
					z-index: 3;
					height: 20px;
					bottom: 0;
					left: 0;
					width: 100%;
					cursor: pointer;
				}
			}
			.upload-panel {
				display: inline-block;
				vertical-align: bottom;
				margin-left: 5px;
				p {
					color: #a6a6a6;
					font-size: 12px;
					margin-bottom: 0;
				}
			}
		}
	}
	
	.button-style-panel {
		border: 1px solid #d6d6d6;
		width: 100%;
		> div.top {
			background: #f3f3f3;
			padding: 15px;
			display: flex;
			justify-content: space-between;
			> ul {
				padding: 0;
				margin-bottom: 0;
				list-style-type: none;
				display: inline-block;
				li {
					display: inline-block;
					width: 105px;
					text-align: center;
					margin-right: 10px;
					.button-style {
						width: 100%;
						height: 34px;
						background: #ffb81d;
						display: inline-block;
						&.button-style-circle {
							@include border-radius(34px);
						}
						&.button-style-radius {
							@include border-radius(10px);
						}
					}
				}
			}
			.button-color-picker {
				display: inline-block;
				> span {
					vertical-align: middle;
				}
				.color-picker-cube {
					width: 24px;
					height: 24px;
				}
			}
		}
		> div.bottom {
			border-top: 1px dashed #a6a6a6;
			padding: 15px;
			padding-left: 90px;
			position: relative;
			p {
				color: #a6a6a6;
			}
			img {
				position: absolute;
				top: 15px;
				left: 15px;
				;
				width: 60px;
				height: 60px;
			}
		}
	}
</style>