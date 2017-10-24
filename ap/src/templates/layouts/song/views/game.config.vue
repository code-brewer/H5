<template>
	<div class="game-view-one quest-bg app-view view-home" :style="{'background-image': (activityConfig.game.bgUrl!='' ? 'url('+activityConfig.game.bgUrl+')' : 1)}">
		<edit-btn @click="showForm=true"></edit-btn>
		<logo v-show="activityConfig.logo.show"></logo>
		<cd-player-config></cd-player-config>
		<music-options-config></music-options-config>
		<confirm-btn-config></confirm-btn-config>
		<modal :show.sync="showForm" size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close" @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.game.bgUrl" 
					:config="uploadConfig"
					:default-image="'./templates/static/img/game-bg.ea0233d.jpg'"
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
	import logo from '../../../components/logo-new/logo.config'
	import cdPlayerConfig from './components/cd-player/cd-player.config.vue'
	import musicOptionsConfig from './components/music-options/music-options.config.vue'
	import confirmBtnConfig from './components/confirm-button/confirm-btn.config.vue'
	export default {
		components: {
			editBtn,
			uploadImage,
			modal,
			logo,
			cdPlayerConfig,
			musicOptionsConfig,
			confirmBtnConfig
		},
		data() {
			var activityConfig = window.store.activityConfig
			return {
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
				showForm: false
			}
		},
		ready() {
		},
		methods: {
			
		},
		watch: {
			'activityConfig.game.bgUrl' (o, v) {
				console.log(o)
			}
		}
	}
</script>
<style lang="scss">
	@import '../../../../css/px2rem.scss';
	@import '../../../_base_config.scss';
	.game-view-one {
		&.quest-bg {
			height: 100% !important;
			background-size: cover;
			background-image: url(../images/game-bg.jpg);
		}
	}
</style>