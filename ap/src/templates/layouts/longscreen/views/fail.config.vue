<template>
	<div class="app-view" :style="{background: (activityConfig.fail.bgUrl!=''?'url('+activityConfig.fail.bgUrl+')':1), 'background-size':'100% 100%'}">
		<edit-btn @click="showForm=true"></edit-btn>
		<logo v-show="activityConfig.logo.show"></logo>
		<fail-title></fail-title>
		<fail-btn></fail-btn>
		<fail-music-btn></fail-music-btn>
		<modal :show.sync="showForm" size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close" @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.fail.bgUrl" 
					:config="uploadConfig"
					:default-image="'./templates/static/img/common-bg.587695a.jpg'"
				>
				</upload-image>
			</div>
		</modal>
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
					}
				}
			},
			components: {
				'logo': require('../../../components/logo-new/logo.config'),
			    'fail-title': require('../../../components/fail-new/fail-title.config.vue'),
				'fail-btn': require('../../../components/fail-new/fail-btn.config.vue'),
				'fail-music-btn': require('../../../components/fail-new/fail-music-btn.config.vue'),
				
				editBtn,
				uploadImage,
				modal
			}
	}
</script>
<style lang="scss" src="../css/style.scss"></style>
<style lang="scss">
	@import '../../../../css/px2rem.scss';
	@import '../../../_base_config.scss';
	.app-view{
		background-size: 100% 100%;
	}
</style>
