<template>
	<div class="wap-logo">
		<edit-btn></edit-btn>
		<div class="logo"
		     v-el:logo
		     v-show="activityConfig.logo.isText=='false'"
		     :style="{'background-image':(activityConfig.logo.imgUrl?'url('+activityConfig.logo.imgUrl+')':1),'height':activityConfig.logo.imgH}"></div>
		<div v-show="activityConfig.logo.isText=='true'">
			<span v-el:text
			      class="logo_text"
			      :style="{'color': activityConfig.logo.text.color,'position': 'relative','z-index': '10','font-size':activityConfig.logo.text.fontSize}"> {{activityConfig.logo.text.value}}</span>
		</div>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.logo.imgUrl"
				              :config="uploadConfig"
				              :default-image="'http://157.255.23.23/images/fsd/ap/20170421/88_fa919723_7497_46dc_974f_df625edbf639.png'">
				</upload-image>
			</div>
		</modal>
	</div>
</template>
<script>
import vueColor from '../../../components/vue-color/vue-color.js'
import slider from '../../../components/web-base/slider.vue'
import radio from '../../../components/web-base/radio.vue'
import uploadImage from '../../../components/web/uploadImage/uploadImage.vue'
import modal from '../../../components/bootstrap/Modal.vue'
import editBtn from '../edit-btn.vue'
import utils from '../../../utils/index.js'
export default {
	components: {
		editBtn,
		uploadImage,
		modal,
		slider,
		Sketch: vueColor.Sketch,
		radio
	},
	data() {
		var activityConfig = window.store.activityConfig;
		return {
			radioCheck: activityConfig.logo.isText == "true" ? true : false,
			showForm: false,
			logoSize: 0,
			selectColor: false,
			setImage: null,
			colors: {
				hex: '#194d33',
				a: 1
			},
			activityConfig,
			uploadConfig: {
				width: "400px", // 宽度
				height: "90%",
				onlyFile: true,
				fileSize: 5120000, // 上传文件的大小
				multiple: false, // 是否可以多个文件上传
				dragDrop: false, // 是否可以拖动上传文件
				tailor: true, // 是否可以裁剪图片
				del: true, // 是否可以删除文件
				finishDel: true // 是否在上传文件完成后删除预览
			},
		}
	},
	watch: {
		logoSize(v) {
			this.activityConfig.logo.text.fontSize = v + "rem";
		},
		'activityConfig.logo.text.fontSize'(v) {
			this.logoSize = +v.split("rem")[0];
		},
		'activityConfig.logo.imgUrl'(v) {
			this.setImage.src = v;
		},
	},
	methods: {
		init() {
			var logo_text = document.defaultView.getComputedStyle(this.$els.text),
				logo = document.defaultView.getComputedStyle(this.$els.logo);
			this.activityConfig.logo.text.color = logo_text.color;
			this.logoSize = +utils.getRem(logo_text.fontSize).split("rem")[0];
			this.activityConfig.logo.imgUrl = logo.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.logo.imgUrl;
			this.setImage.onload = () => {
				var l = this.setImage.width / this.setImage.height;
				this.activityConfig.logo.imgH = (this.$els.logo.offsetWidth / (l * 12)) + 'rem';
			}
		},
		colseColor() {
			if (this.selectColor) {
				this.activityConfig.logo.text.color = this.colors.hex;
				this.selectColor = false;
			}
		},
		openColor() {
			if (!this.selectColor) {
				this.selectColor = true;
				this.colors.hex = this.activityConfig.logo.text.color;
			}

		}
	},
	ready() {
		this.$on('show-edit', () => {
			this.showForm = !this.showForm;
		})
		this.init();
	}
}
</script>
<style lang="scss" src="./logo.scss"></style>
<style lang="scss">
.wap-logo .upload {
	height: 190px;
	margin: 0 auto !important;
	.upload_preview {
		border-top: 0;
	}
}
</style>
