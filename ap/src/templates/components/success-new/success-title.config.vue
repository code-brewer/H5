<template>
	<div class="success-title"
	     v-el:successtitle
	     :style="{'background-image':(activityConfig.success.titleImg!=''?'url('+activityConfig.success.titleImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.success.titleImgH}">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.success.titleImg"
				              :config="uploadConfig"
				              :default-image="defaultImg">
				</upload-image>
			</div>
		</modal>
	</div>
</template>
<script>
import uploadImage from '../../../components/web/uploadImage/uploadImage.vue'
import editBtn from '../edit-btn.vue'
import modal from '../../../components/bootstrap/Modal.vue'
export default {
	data() {
		var activityConfig = window.store.activityConfig;
		return {
			activityConfig,
			showForm: false,
			uploadConfig: {
				setImage: null,
				width: "100%",                 // 宽度
				height: "185px",
				onlyFile: true,
				fileSize: 5120000,                // 上传文件的大小
				multiple: false,                   // 是否可以多个文件上传
				dragDrop: false,                   // 是否可以拖动上传文件
				tailor: true,                    // 是否可以裁剪图片
				del: true,                    // 是否可以删除文件
				finishDel: true,  				  // 是否在上传文件完成后删除预览
			},
			defaultImg: 'data:image/png;base64,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'
		}
	},
	components: {
		editBtn,
		modal,
		uploadImage
	},
	ready() {
		this.$on('show-edit', () => {
			this.showForm = !this.showForm;
		})
		this.init();
	},
	watch: {
		'activityConfig.success.titleImg'(v) {
			this.setImage.src = v;
		}

	},
	methods: {
		init() {
			var title = document.defaultView.getComputedStyle(this.$els.successtitle);
			this.activityConfig.success.titleImg = title.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.success.titleImg;
			this.setImage.onload = () => {
				var l = this.setImage.width / this.setImage.height;
				this.activityConfig.success.titleImgH = (this.$els.successtitle.offsetWidth / (l * 12)) + 'rem';
			}
		}
	}
}
</script>
