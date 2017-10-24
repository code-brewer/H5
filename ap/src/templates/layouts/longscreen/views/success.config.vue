<template>
	<div class="app-view"
	     :style="{background: (activityConfig.success.bgUrl!=''?'url('+activityConfig.success.bgUrl+')':1), 'background-size':'100% 100%'}">
		<edit-btn @click="showForm=true"></edit-btn>
		<logo v-show="activityConfig.logo.show"></logo>
		<success-title></success-title>
		<div class="success-prize">
			<div v-if="!prize"
			     class="gift"
			     :style="{'background-image': 'url(http://157.255.23.23/images/fsd/ap/20170413/88_64898d61_d628_414a_ae29_d50a939fd7ae.png)'}"></div>
			<div v-else
			     class="gift"
			     :style="{'background-image': 'url('+ gift +')'}"></div>
			<number-of-dolucky></number-of-dolucky>
			<success-btn v-ref:edit></success-btn>
			<success-music-btn></success-music-btn>
		</div>
		<rule-link></rule-link>
		<modal :show.sync="showForm"
		       size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close"
				     @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.success.bgUrl"
				              :config="uploadConfig"
				              :default-image="'./templates/static/img/common-bg.587695a.jpg'">
				</upload-image>
			</div>
		</modal>
		<div class="bg"
		     v-if="showModal">
			<div class="nav">
				<a @click="editModal(1)"
				   :class="{act:dolucky == 1}">抽中</a>
				<a @click="editModal(2)"
				   :class="{act:dolucky == 2}">抽不中</a>
				<a @click="editModal(3)"
				   :class="{act:dolucky == 3}">没机会</a>
			</div>
			<img src="http://157.255.23.23/images/fsd/ap/20170414/88_43daa992_bdef_4ecc_bdf2_91c8bf8bdb34.png"
			     @click="closeModal"
			     class="close-img" />
			<div class="dolucky"
			     v-if="dolucky == 1">
				<div class="con">
					<modal-lucky-title></modal-lucky-title>
					<modal-lucky-con></modal-lucky-con>
					<modal-lucky-btn></modal-lucky-btn>
	
				</div>
			</div>
			<div class="dolucky"
			     v-if="dolucky == 2">
				<div class="con">
					<modal-unlucky-title></modal-unlucky-title>
					<modal-unlucky-con></modal-unlucky-con>
					<modal-unlucky-btn></modal-unlucky-btn>
				</div>
			</div>
			<div class="dolucky"
			     v-if="dolucky == 3">
				<div class="con">
					<modal-nochange-title></modal-nochange-title>
					<modal-nochange-con></modal-nochange-con>
					<modal-nochange-btn></modal-nochange-btn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import editBtn from '../../../components/edit-btn.vue'
import uploadImage from '../../../../components/web/uploadImage/uploadImage.vue'
import modal from '../../../../components/bootstrap/Modal.vue'
export default {
	data() {
		var activityConfig = window.store.activityConfig;
		return {
			showForm: false,
			showEdit: false,
			activityConfig,
			uploadConfig: {
				width: "100%", // 宽度
				height: "200px",
				onlyFile: true,
				fileSize: 5120000, // 上传文件的大小
				multiple: false, // 是否可以多个文件上传
				dragDrop: false, // 是否可以拖动上传文件
				tailor: true, // 是否可以裁剪图片
				del: true, // 是否可以删除文件
				finishDel: true, // 是否在上传文件完成后删除预览
			},
			dolucky: 0,
			showModal: false,

		}
	},
	components: {
		'logo': require('../../../components/logo-new/logo.config'),
		'rule-link': require('../../../components/success-new/rule-link-new.config.vue'),
		'success-title': require('../../../components/success-new/success-title.config.vue'),
		'success-btn': require('../../../components/success-new/success-btn.config.vue'),
		'success-music-btn': require('../../../components/success-new/success-music-btn.config.vue'),
		'number-of-dolucky': require('../../../components/success-new/number-of-dolucky.config.vue'),
		'modal-lucky-btn': require('../../../components/success-modal-lucky/success-modal-btn.config.vue'),
		'modal-lucky-title': require('../../../components/success-modal-lucky/success-modal-title.config.vue'),
		'modal-lucky-con': require('../../../components/success-modal-lucky/success-modal-con.config.vue'),
		'modal-unlucky-btn': require('../../../components/success-modal-unlucky/success-modal-btn.config.vue'),
		'modal-unlucky-title': require('../../../components/success-modal-unlucky/success-modal-title.config.vue'),
		'modal-unlucky-con': require('../../../components/success-modal-unlucky/success-modal-con.config.vue'),
		'modal-nochange-btn': require('../../../components/success-modal-noChange/success-modal-btn.config.vue'),
		'modal-nochange-title': require('../../../components/success-modal-noChange/success-modal-title.config.vue'),
		'modal-nochange-con': require('../../../components/success-modal-noChange/success-modal-con.config.vue'),
		editBtn,
		uploadImage,
		modal
	},
	methods: {
		editModal(type) {
			this.showModal = true;
			this.dolucky = type;
			if (type == '' || type == undefined) {
				this.dolucky = 1;
			}
		},
		closeModal() {
			this.showModal = false;
			this.dolucky = 0;
		}
	},
	ready() {
		this.$refs.edit.setClickListener(this.editModal);
	}
}
</script>
<style lang="scss" src="../css/style.scss"></style>
<style lang="scss">
@import '../../../../css/px2rem.scss';
@import '../../../_base_config.scss';
.app-view {
	background-size: 100% 100%;
}
</style>
