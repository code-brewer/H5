<template>
	<div class="wap-activity-box" v-el:box :style="{'background-image':(activityConfig.box.imgUrl!=''?'url('+activityConfig.box.imgUrl+')':1),'height':activityConfig.box.imgH}">
		<edit-btn></edit-btn>
		<modal :show.sync="showForm" size="md" >
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close" @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.box.imgUrl" 
					:config="uploadConfig"
					:default-image="'http://157.255.23.23/images/fsd/ap/20170425/88_161d53f4_8d68_41d9_9905_fab153c3acca.png'"
				>
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
		data(){
			 var activityConfig = window.store.activityConfig;
			return{
				activityConfig,
				showForm: false,
			 	uploadConfig:{
			 		setImage:null,
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
			uploadImage
		},
		ready() {
			this.$on('show-edit', () => {
				this.showForm = !this.showForm;
			})
			this.init();
		},
		watch:{
			'activityConfig.box.imgUrl'(v){
				this.setImage.src = v;
			}

		},
		methods: {
			init(){
				var box = document.defaultView.getComputedStyle(this.$els.box);
			    this.activityConfig.box.imgUrl = box.backgroundImage.split('"')[1];
				this.setImage = new Image();
				this.setImage.src = this.activityConfig.box.imgUrl;
				this.setImage.onload=()=>{
					var l = this.setImage.width/this.setImage.height;
					this.activityConfig.box.imgH = (this.$els.box.offsetWidth /(l*12))+'rem';
				}
			}
		}
	}
</script>
<style lang="scss" src="./activity-box.scss"></style>