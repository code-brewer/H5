<template>
	<div class="wap-logo">
		<edit-btn></edit-btn>
		<img :src="activityConfig.logo.imgUrl" v-show="activityConfig.logo.isText=='false'" style="width: 100%;">
		<div v-show="activityConfig.logo.isText=='true'">
			<span :style="{'color': activityConfig.logo.text.color,'font-size':activityConfig.logo.text.fontSize+'px'}"> {{activityConfig.logo.text.value}}</span>
		</div>
		<modal :show.sync="showForm" size="md" >
			<div class="modal-panel" @click="colseColor">
				<div class="title">编辑图片</div>
				<div class="close" @click="showForm=false">X</div>
			   	  <div class="content">
			    	<div class="spane">
			    		<div class="label">
			    				文字设置
			    			</div>
			    		<div class="nr">
				    		<p class="check-box">
				    			<radio name="logoCheck" :model.sync="activityConfig.logo.isText"  :checked="radioCheck" value="true">文字</radio>
								<radio name="logoCheck" :model.sync="activityConfig.logo.isText"  :checked="!radioCheck" style="margin-left: 30px;" value="false">图片</radio>
				    		</p>
				    		<div class="text-panel" v-show="activityConfig.logo.isText=='true'">
				    			<p>
				    				<span>文字：</span>
				    				<input type="text" class="form-control" v-model="activityConfig.logo.text.value" style="margin-left: 24px; display: inline-block;width: 200px;"/>
				    			</p>
				    			<p>
				    			 	<span>颜色：</span>
					    			<i :style="{'background-color':activityConfig.logo.text.color}" @click.stop="openColor"></i>
				    			  	<div v-show="selectColor" class="components-wrap"  @click.stop>
								        <Sketch :colors.sync="colors"></Sketch>
								    </div>
				    			 </p>
				    			<p>
				    			 	<span> 大小： </span>
				    			 	 <slider max="30" min="0" style="width: 300px;" :value.sync="activityConfig.logo.text.fontSize"></slider>
				    			</p>
				    		</div>
				    		<div class="img-panel" v-show="activityConfig.logo.isText=='false'">
				    			<upload :config="uploadConfig" :img-url.sync="activityConfig.logo.imgUrl">
				    				
				    			</upload>
				    		</div>
			    		</div>
			    	</div>
			    </div>
			 
			 </div>
		 </modal>
	</div>
</template>
<script>
	import vueColor from '../../components/vue-color/vue-color.js'
	import slider from '../../components/web-base/slider.vue'
	import radio from '../../components/web-base/radio.vue'
	import upload from '../../components/web/upload.vue'
	import modal from '../../components/bootstrap/Modal.vue'
	import editBtn from './edit-btn.vue'
	export default {
		components:{
			editBtn,
		 	upload,
		 	modal,
		 	slider,
		 	Sketch:vueColor.Sketch,
		 	radio
		},
		data(){
			 var activityConfig=window.store.activityConfig;
			 return{
			 	uploadConfig:{
			 		width:"100%",                 // 宽度
					height:"190px",    
					onlyFile:true,
					fileSize         :   512000,                // 上传文件的大小
					multiple         :   false,                   // 是否可以多个文件上传
					dragDrop         :   false,                   // 是否可以拖动上传文件
					tailor           :   true,                    // 是否可以裁剪图片
					del              :   false,                    // 是否可以删除文件
					finishDel        :   true,  				  // 是否在上传文件完成后删除预览
			 	},
			 	radioCheck:activityConfig.logo.isText=="true"?true:false,
			 	showForm: false,
			 	selectColor:false,
			 	colors: {
					hex: '#194d33',
					a: 1
				},
				activityConfig,
			 	logo:{
			 		text:'',
			 		fontSize:14,
			 		color:"#fff",
			 		imgUrl:''
			 	},
			 	uploadConfig:{
			 		width:"400px",                 // 宽度
					height:"100%",    
					onlyFile:true,
					fileSize         :   512000,                // 上传文件的大小
					multiple         :   false,                   // 是否可以多个文件上传
					dragDrop         :   false,                   // 是否可以拖动上传文件
					tailor           :   true,                    // 是否可以裁剪图片
					del              :   true,                    // 是否可以删除文件
					finishDel        :   false,  				  // 是否在上传文件完成后删除预览
			 	},
			 }
		},
		watch:{
			isText(v){
				console.log(v)
			}
		},
		methods:{
			colseColor(){
				if(this.selectColor)
				{
					this.activityConfig.logo.text.color=this.colors.hex;
					this.selectColor=false;
				}
			},
			openColor(){
				if(!this.selectColor)
				 	this.selectColor=true;
			}
		},
		ready() {
			this.$on('show-edit', () => {
				this.showForm = !this.showForm;
			})
		}
	}
</script>

<style lang="scss">
	@import '../../css/px2rem.scss';
	.wap-logo {
		    width:10rem;
		    height: 3rem;
		    top:.8rem;
		    left: 1rem;
		    position: absolute;
		.upload{
			height: 190px;
			margin-left: -9px;
			.upload_preview{
				border-top: 0;
			}
		}
		img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

</style>