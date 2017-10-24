<template>
	<div class="wap-static-banner"
	     v-el:banner
	     :style="{'background-image':(activityConfig.banner.imgUrl?'url('+activityConfig.banner.imgUrl+')':1),'height':activityConfig.banner.imgH}" v-show="activityConfig.banner.show">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.banner.imgUrl"
				              :config="uploadConfig"
				              :default-image="'./templates/static/img/banner.91c21e4.png'">
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
			}
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
		'activityConfig.banner.imgUrl'(v) {
			this.setImage.src = v;
		}

	},
	methods: {
		init() {
			var banner = document.defaultView.getComputedStyle(this.$els.banner);
			this.activityConfig.banner.imgUrl = banner.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.banner.imgUrl;
			this.setImage.onload = () => {
				var l = this.setImage.width / this.setImage.height;
				this.activityConfig.banner.imgH = (this.$els.banner.offsetWidth / (l * 12)) + 'rem';
			}
		}
	}
}
</script>