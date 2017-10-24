<template>
	<div class="my-prize-btn"
	     v-el:prizebtn
	     :style="{'background-image':(activityConfig.prizeList.btnImgUrl!=''?'url('+activityConfig.prizeList.btnImgUrl+')':1), 'background-size':'100%'}">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.prizeList.btnImgUrl"
				              :config="uploadConfig"
				              :default-image="'http://157.255.23.23/images/fsd/ap/20170406/88_9e4cf8f2_9fbb_4836_ab44_63ea44492f3b.png'">
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
		'activityConfig.box.imgUrl'(v) {
			this.setImage.src = v;
		}

	},
	methods: {
		init() {
			var box = document.defaultView.getComputedStyle(this.$els.prizebtn);
			this.activityConfig.prizeList.btnImgUrl = box.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.prizeList.btnImgUrl;

		}
	}
}
</script>
