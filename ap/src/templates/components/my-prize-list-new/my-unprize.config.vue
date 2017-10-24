<template>
	<div class="my-unprize"
	     v-el:unprize
	     :style="{'background-image':(activityConfig.prizeList.unprizeImgUrl!=''?'url('+activityConfig.prizeList.unprizeImgUrl+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.prizeList.unprizeImgH}">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.prizeList.unprizeImgUrl"
				              :config="uploadConfig"
				              :default-image="'http://157.255.23.23/images/fsd/ap/20170406/88_48935cbd_d8c0_4c30_ab6d_c5bf5e3f5903.png'">
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
		'activityConfig.prizeList.unprizeImgUrl'(v) {
			this.setImage.src = v;
		}

	},
	methods: {
		init() {
			var unprize = document.defaultView.getComputedStyle(this.$els.unprize);
			this.activityConfig.prizeList.unprizeImgUrl = unprize.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.prizeList.unprizeImgUrl;
			this.setImage.onload = () => {
				var l = this.setImage.width / this.setImage.height;
				this.activityConfig.prizeList.unprizeImgH = (this.$els.unprize.offsetWidth / (l * 12)) + 'rem';
			}
		}
	}
}
</script>
