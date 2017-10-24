<template>
	<div class="success-btn"
	     v-el:successbtn
	     :style="{'background-image':(activityConfig.success.btnImg!=''?'url('+activityConfig.success.btnImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.success.btnImgH}"
	     @click="editModal(1)">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.success.btnImg"
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
			clickListener: null,
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
		'activityConfig.success.btnImg'(v) {
			this.setImage.src = v;
		}

	},
	methods: {
		init() {
			var btn = document.defaultView.getComputedStyle(this.$els.successbtn);
			this.activityConfig.success.btnImg = btn.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.success.btnImg;
			this.setImage.onload = () => {
				var l = this.setImage.width / this.setImage.height;
				this.activityConfig.success.btnImgH = (this.$els.successbtn.offsetWidth / (l * 12)) + 'rem';
			}
		},
		//其他地方调此方法
		setClickListener(listener) {
			this.clickListener = listener;
		},
		editModal(type) {
			if (this.clickListener) {
				this.clickListener();
			}
		}
	}
}
</script>
