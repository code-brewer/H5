<template>
	<div class="fail-btn"
	     v-el:failbtn
	     :style="{'background-image':(activityConfig.fail.btnImg!=''?'url('+activityConfig.fail.btnImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.fail.btnImgH}">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.fail.btnImg"
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
			defaultImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXwAAABvCAMAAADYDIt5AAABdFBMVEUAAABqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdrIidqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISf8xUT2vkL7w0NsIydqISdqISdqISdqISfutUD7w0Pzu0JqISfvtkGnZTPyuUHanj3JjDrPkjupZzN7NCrJizlsIydqISfbnz3mrD/SlTu/gTi2djaPSi7epD71vULhpz97NCrYnD2dWjGEPizvtkHttEG0dDaiYDLWmjyZVTD/rQhiHRX/rgr/tyP/sxj9xkT/vDD/sBC2ag6MQxLVhwv/sBH/rw3/vTP/tR7/sxn/shP+xEJ3MBPAcw31own/uSahVxD+wz7/wDj/uy6BOhKrYA/qmgr/uShsJxT/uir/tBvLfQzgkAuWTRFaN2o3AAAAWHRSTlMAAwcPGiZcR3M2jKPJ2bgYChNDDTMVI1g1PXBULSphhnZrIYAvHptnTzm1xKlJ+/ntsZaSTL2p/uPSwy747Ord0c7HrHty+fPr6tzZtqajoqGelYdtT0s/SjVmqwAACgpJREFUeNrs1k9vokAYx/FtwV6ZEbFtqnswNVkPpRwaYvTsrU2T/o8DeBiGgQMBDgZe/j7Yptg1cbeLc3u+L+HDLw/zA8OwPzrCDtD/sR9jB+lbn+DDnRDTNDWsVUBIyMcX+Fd5AuqUWpbxmY59o8bNsiiFb0Aa//30hAC88fJ4O3VsH2uV7UxvH18MSjVC/sK/oTc1as0fHD/LciECrFVC5FnmOw9zi2rmhn+vvUaNuWtneVCUacqwlqVpWQR5Zrtzg2p79MGemNTSF04iijVjUVVJ6WEtkrKqIsbWhUichW5RkzT6O/Yw+5Gb5EAfSS+OOecrrEUAGMeejIA/T9wRjL/R37XX57NElCzyYr4KwyXWujBc8diLWCmS2Vxv9HfsLb0D9utIxryWf8MOUO3PYxmtQb+jW43+jr2biDTyeLhE+sNV7597USoSt9HfuTmdBewe7HH1B+5dH7a/6OxeHnhjmlTvvzp5ifaQIv0yd177OjXhxfl1+NTo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'
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
		'activityConfig.fail.btnImg'(v) {
			this.setImage.src = v;
		}

	},
	methods: {
		init() {
			var btn = document.defaultView.getComputedStyle(this.$els.failbtn);
			this.activityConfig.fail.btnImg = btn.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.fail.btnImg;
			this.setImage.onload = () => {
				var l = this.setImage.width / this.setImage.height;
				this.activityConfig.fail.btnImgH = (this.$els.failbtn.offsetWidth / (l * 12)) + 'rem';
			}
		}
	}
}
</script>
