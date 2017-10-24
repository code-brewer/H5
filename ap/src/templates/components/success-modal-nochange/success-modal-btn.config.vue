<template>
	<div class="nochange-modal-btn"
	     v-el:nochangebtn
	     :style="{'background-image':(activityConfig.noChange.btnImg!=''?'url('+activityConfig.noChange.btnImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.noChange.btnImgH}">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.noChange.btnImg"
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
			defaultImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAToAAABvCAMAAABLqPyeAAABg1BMVEUAAABqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdrIidqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdrISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISdqISf8xURqISdqISdqISf2vkL8xERqISdqISfutUD7w0PNkDryuUHanj3Ehjn6wkPwuEF7NCrzu0JwKChqISforkDipz/bnz2bWDDmrD/SlTu2djaPSi6mZDPepD75wUPKjTrorkCsajTHiTn1vUJ7NCqdWjGEPiy0dDaiYDLWmjyZVTC7fDf/rQhiHRX/rgr/sxj/sBD/vDD/tyP+xkTYiQuxZQ6JQRL/rwz/uSf/tR3+xEH/vjT/tiH/shX/sRL/wTv/vzj/uy7/uyzrmwqAOBP1pAlsJhTEdw3OgAzhkgqTShF2LxO6bg6nXA+dUxAY0TKlAAAAXnRSTlMAAwcPGiZHc1w2jMm42aMKFxNDDTNYJR01TD0hLSojUnZrhFsvsqqYfnFnORVjX8Shifuek2/58NS9qf7h+Ozs6ejOwLWknpRyLPnz6tza2djOycfAtqOhnm1PSz8z5KosrgAAB9lJREFUeNrs1rtO40AYBeBNYtczYweb3BuqJVC4seQqKFIuHUKi4Batb0XG47vfX/uPNw6bxSQsDUie8wifzvlnfoiIfKu0RFqfQ2uLQP4LcKeGkKqqnUYHABDa+X3UDYEZIVMMkRobDJkSAoKo0jsFhxCw4afl/a1p+I2OYd7eL58w8CF0Aq+EUzsEvyxmPkuz0G14wixl/mzxgklHLfGOygHc2jJY5haUUq/hAYLCzZhhrQHviB3IIZVgaWWyMKdeFAR24xMEkUfzkJkrCRMVgV29XFm5geWnOY2ALU4Sp+FJkhj4IpqnvjWA4lV2dXLSes7Cwgvs2HG22+2vhgcIHCe2A68I2XwtVXY1clNdnjOXRgDH2TYiG84HeBF12VzWp6VdrZxmgVxgJwLuEC+xA7CztMruzVp1beWHIOcIuH/xHLAL/ZWmv9ks/EpUImnPZlpEQq7eLipS81mTiAp/lMPSETwe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'
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
		'activityConfig.noChange.btnImg'(v) {
			this.setImage.src = v;
		}

	},
	methods: {
		init() {
			var btn = document.defaultView.getComputedStyle(this.$els.nochangebtn);
			this.activityConfig.noChange.btnImg = btn.backgroundImage.split('"')[1];
			this.setImage = new Image();
			this.setImage.src = this.activityConfig.noChange.btnImg;
			this.setImage.onload = () => {
				var l = this.setImage.width / this.setImage.height;
				this.activityConfig.noChange.btnImgH = (this.$els.nochangebtn.offsetWidth / (l * 12)) + 'rem';
			}
		},

	}
}
</script>
