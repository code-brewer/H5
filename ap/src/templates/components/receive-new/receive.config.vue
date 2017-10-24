<template>
	<div class="app-view view-receive view-home"
		:style="{'background-image': (activityConfig.receive.bgUrl!='' ? 'url('+activityConfig.receive.bgUrl+')' : 1)}">
		<edit-btn @click="showForm=true"></edit-btn>
		<logo v-show="activityConfig.logo.show"></logo>
		<receive-title-config></receive-title-config>
		<p class="view-receive-tips">请填写姓名和电话，方便工作人员联系</p>
		<!-- <img src="./images/tips.png" alt="" class="view-receive__tips"> -->
		<div class="view-receive__content padding">
			<div class="phone-wrap">
				<input type="text" class="input-phone" autocomplete="off" v-model="username" placeholder="请输入姓名" />
				<input type="text" class="input-phone" autocomplete="off"  v-model="userphone" placeholder="请输入手机号码" />
			</div>
		</div>
		<confirm-btn-config></confirm-btn-config>
		<modal :show.sync="showForm" size="md">
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close" @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.receive.bgUrl" 
					:config="uploadConfig"
					:default-image="'./templates/static/img/game-bg.ea0233d.jpg'"
				>
				</upload-image>
			</div>
		</modal>
	</div>
</template>
<script>
	import editBtn from '../../components/edit-btn.vue'
	import uploadImage from '../../../components/web/uploadImage/uploadImage.vue'
	import modal from '../../../components/bootstrap/Modal.vue'
	import logo from '../../components/logo/logo.config'
	import receiveTitleConfig from './components/receive-title/receive-title.config.vue'
	import confirmBtnConfig from './components/confirm-button/confirm-btn.config.vue'
	export default {
		components: {
			editBtn,
			uploadImage,
			modal,
			logo,
			receiveTitleConfig,
			confirmBtnConfig
		},
		data(){
			let activityConfig = window.store.activityConfig
			let common = activityConfig.common
			return {
				common,
				activityConfig,
				tiptext:' ',
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
				showForm: false,
				username: '',
				userphone: ''
			}
		},
		watch:{
			'common.btnStyle'(v){
				console.log(v)
			}
		},
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			}
		},
		methods:{
			inputmobiletip(){
				if(this.mobile == '输入手机号'){
					this.mobile = '';
				}
				this.tiptext = "";
			},
			inputcodetip(){
				if(this.zcode == '输入验证码'){
					this.zcode = '';
				}
				this.tiptext = "";
			}
        }
	}
</script>
<style lang="scss">
	@import '../../../css/px2rem.scss';
	@import '../../_base_config.scss';
	@import './common.scss';
</style>