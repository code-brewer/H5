<template>
	<div class="fail-title"
	     v-el:failtitle
	     :style="{'background-image':(activityConfig.fail.titleImg!=''?'url('+activityConfig.fail.titleImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.fail.titleImgH}">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.fail.titleImg"
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
		'activityConfig.fail.titleImg'(v) {
			this.setImage.src = v;
		}

	},
	methods: {
		init() {
			var title = document.defaultView.getComputedStyle(this.$els.failtitle);
			this.activityConfig.fail.titleImg = title.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.fail.titleImg;
			this.setImage.onload = () => {
				var l = this.setImage.width / this.setImage.height;
				this.activityConfig.fail.titleImgH = (this.$els.failtitle.offsetWidth / (l * 12)) + 'rem';
			}
		}
	}
}
</script>
