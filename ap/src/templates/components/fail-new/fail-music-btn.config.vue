<template>
	<div class="fail-music-btn"
	     v-el:failmusicbtn
	     :style="{'background-image':(activityConfig.fail.completeMusicImg!=''?'url('+activityConfig.fail.completeMusicImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.fail.completeMusicImgH}">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.fail.completeMusicImg"
				              :config="uploadConfig"
				              :default-image="defaultImg">
				</upload-image>
				<div class="nr">
					<p class="col"
					   style="line-height: 1.8;">
						<span>
		    					跳转链接：
		    				</span>
						<input type="text"
						       class="form-control"
						       v-model="activityConfig.fail.completeLink"
						       style="margin-left: 24px; display: inline-block; width: 300px; margin-top: -50px;" />
					</p>
				</div>
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
			defaultImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXwAAABvCAMAAADYDIt5AAABgFBMVEUAAABqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdrIidqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISf8xERqISdqISdqISdqISdqISdqISdqISdqISdvJyhqISdsIydqISdqISf7w0NqISdqISdqISfutUBqISf3wEPXmzzGiDnzu0JqISfvtkFsIyf0vELyuUHPkjt/OSvorkCycjXmrD+2djaPSi6mZDPepD5+NyvKjTp4MSqsajTHiTn1vULYnD2dWjHttEHWmjy0dDbgpT6iYDLWmjyZVTD/rQhiHRX/sBD/sxj/rgr/vDD/tyP9xkSMQxK2ag7Vhwv/rguBOhLgkAtsJxTAcw31own/rw3/uSehVxCrYA/qmgp3MBP/tR3/shX+w0D/vjT/uy7/tiH/wDiWTRHLfQz+xUP/uir/tBv+xEH+wTzXQLzZAAAAW3RSTlMAAg8JGiZHXHM2yYyj2bgHBBgTCxYiM1g1L0NlLFJLPA2Bd2qIHvyfmHFvRTkVXynAs6k/7bWTTql79+/r49PDrfz43aGeMPnq3NrZ0c7Kx8C2oqGHd21sT0s/1CkjzwAADGdJREFUeNrslTtvo0AURtcE6iwDdh7r2G5MEzsugrQokkXl9Inytni5oGIa3hJg//WdmV1Mso6sxEB3z08499O5PwAA+I8O0ACHaP9JOGYcAQdxzKAev3ECKp4ql6TRiANqMRpJEj0DPcDXNk/FcxxCU1kWS3jgG4glsjxFiOPIASr/e0dPzCMkvj7czVVlBdRCUed3D68iOYC0Xz9zz9TLtws1CzdpZAM1idJNmKmLW5np32N/q15TwtSOc4wdoCYY57Gdhoq21b/HPZL5ZzWMYuwkflGYQE2Kwk8cHEeh+szLqLL/iXsOiV0t28Q48U0zCAygNkFgmn6C4zTTuiLiKvu77vmZvo5yxzeJeM9zGRZwEC7D88gBTN/Jo7U+4yv7O+6nvKCvbZyYATFvWUugASzL84j+BNtrXeCnlf0d9xpx75uG54L6JvW7nmH6xL72mf1OhzVHeMyiv+5BfaP8sx9ljwIrT6fzYfhH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'
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
		'activityConfig.fail.completeMusicImg'(v) {
			this.setImage.src = v;
		}

	},
	methods: {
		init() {
			var btn = document.defaultView.getComputedStyle(this.$els.failmusicbtn);
			this.activityConfig.fail.completeMusicImg = btn.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.fail.completeMusicImg;
			this.setImage.onload = () => {
				var l = this.setImage.width / this.setImage.height;
				this.activityConfig.fail.completeMusicImgH = (this.$els.failmusicbtn.offsetWidth / (l * 12)) + 'rem';
			}
		}
	}
}
</script>
