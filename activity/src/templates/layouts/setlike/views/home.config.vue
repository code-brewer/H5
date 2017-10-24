<template>
	<div class="app-view view-home" :style="{background: (activityConfig.bg.imgUrl!=''?'url('+activityConfig.bg.imgUrl+')':1)}">
		<edit-btn @click="showForm=true"></edit-btn>
		<logo  v-show="activityConfig.logo.show"></logo>
		<activity-box></activity-box>
		<static-banner></static-banner>
		<number-of-participants></number-of-participants>
		<remaining-number-of-prizes></remaining-number-of-prizes>
		<start-button></start-button>
		<rule-link></rule-link>
		<modal :show.sync="showForm" size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close" @click="showForm=false">X</div>
				<upload :img-url.sync="activityConfig.bg.imgUrl" :config="uploadConfig"></upload>
			</div>
		</modal>
	</div>
</template>
<script>
	import editBtn from '../../../components/edit-btn.vue'
	import upload from '../../../../components/web/upload.vue'
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
						fileSize: 512000, // 上传文件的大小
						multiple: false, // 是否可以多个文件上传
						dragDrop: false, // 是否可以拖动上传文件
						tailor: true, // 是否可以裁剪图片
						del: true, // 是否可以删除文件
						finishDel: false, // 是否在上传文件完成后删除预览
					}
				}
			},
			components: {
				'logo': require('../../../components/logo/logo.config'),
				'static-banner': require('../../../components/static-banner/static-banner.config'),
				'remaining-number-of-prizes': require('../../../components/remaining-number-of-prizes/remaining-number-of-prizes.config'),
				'start-button': require('../../../components/button/start-button.config'),
				'rule-link': require('../../../components/rule-link/rule-link.config.vue'),
				'number-of-participants': require('../../../components/number-of-participants/number-of-participants.config'),
				'activity-box': require('../../../components/activity-box/activity-box.config'),
				'rank-link': require('../../../components/rank-link/rank-link.config.vue'),
				editBtn,
				upload,
				modal
			}
	}
</script>
<style lang="scss" src="../css/style.scss"></style>
<style lang="scss">
	@import '../../../../css/px2rem.scss';
	@import '../../../_base_config.scss'
</style>
