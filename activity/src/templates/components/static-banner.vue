<template>
	<div class="wap-static-banner" >
		<edit-btn></edit-btn>
		<img :src="activityConfig.banner.imgUrl" style="width: 100%;height: 100%;">
		<modal :show.sync="showForm" size="md" >
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close" @click="showForm=false">X</div>
			    <upload :img-url.sync="activityConfig.banner.imgUrl" :config="uploadConfig"></upload>
			 </div>
		 </modal>
	</div>
</template>
<script>
import upload from '../../components/web/upload.vue'
import editBtn from './edit-btn.vue'
import modal from '../../components/bootstrap/Modal.vue'
export default {
		data(){
			 var activityConfig=window.store.activityConfig;
			return{
				activityConfig,
				showForm: false,
			 	uploadConfig:{
			 		width:"100%",                 // 宽度
					height:"185px",    
					onlyFile:true,
					fileSize         :   512000,                // 上传文件的大小
					multiple         :   false,                   // 是否可以多个文件上传
					dragDrop         :   false,                   // 是否可以拖动上传文件
					tailor           :   true,                    // 是否可以裁剪图片
					del              :   true,                    // 是否可以删除文件
					finishDel        :   true,  				  // 是否在上传文件完成后删除预览
			 	}
			}
		},
		components:{
			editBtn,
			modal,
			upload
		},
		ready() {
			this.$on('show-edit', () => {
				this.showForm = !this.showForm;
			})
		},
		methods: {
			
		}
	}
</script>