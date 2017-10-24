<template>
	<div class="wap-rule-link">
		<edit-btn></edit-btn>
		<a v-el:rule class="rule_text" @click="preview = true" v-link="{path: '/rule'}" :style="{'background-image':(activityConfig.rule.imgUrl?'url('+activityConfig.rule.imgUrl+')':1),'height':activityConfig.rule.imgH, 'background-size':'100% 100%'}"></a>
		<modal :show.sync="showForm" size="md" >
			<div class="modal-panel">
				<div class="title">编辑图片</div>
				<div class="close" @click="showForm=false">X</div>
				<upload-image :img-url.sync="activityConfig.rule.imgUrl" 
					:config="uploadConfig"
					:default-image="'http://157.255.23.23/images/fsd/ap/20170401/88_2b53593a_3c98_44c4_804d_d0ba6cd116d0.png'"
				>
				</upload-image>
			 </div>
		 </modal>
		 <div v-show="preview" class="rule-preview">
			 <div class="config-rule-text-new">
			 	<img src="http://157.255.23.23/images/fsd/ap/20170414/88_43daa992_bdef_4ecc_bdf2_91c8bf8bdb34.png"  @click="preview=false" class="close-img close-icon" />
			 	<div class="config-rule-con">
			 	{{{activityConfig.ruleCon.value}}}
			 	</div>
			 </div>
		 </div>
	</div>

</template>

<script>
	import editBtn from '../edit-btn.vue'
	import vueColor from '../../../components/vue-color/vue-color.js'
	import slider from '../../../components/web-base/slider.vue'
	import modal from '../../../components/bootstrap/Modal.vue'
	import utils from  '../../../utils/index.js'
	import ruleEdit from  './rule-edit.config.vue'
	import uploadImage from '../../../components/web/uploadImage/uploadImage.vue'
	export default {
		components:{
			editBtn,
			Sketch:vueColor.Sketch,
			slider,
			modal,
			ruleEdit,
			uploadImage
		},
		ready() {
			this.$on('show-edit', () => {
				this.showForm = !this.showForm;
			})
			this.init();
			console.log(this.edit+'-------------edit')
		},
		watch:{
			ruleSize(v){
			 	this.activityConfig.rule.fontSize = v + "rem";
			},
			'activityConfig.rule.fontSize'(v){
				this.ruleSize = + v.split("rem")[0];
			},

		},
		methods:{
			colseColor(){
				if(this.selectColor)
				{
					this.activityConfig.rule.color=this.colors.hex;
					this.selectColor=false;
				}
			},
			openColor(type){
				if(!this.selectColor)
					{
						this.selectColor = true;
						this.colors.hex = this.activityConfig.rule.color;
					}
			},
			init(){
 				var rule_text = document.defaultView.getComputedStyle(this.$els.rule);
				this.activityConfig.rule.color = rule_text.color;
				this.ruleSize = + utils.getRem(rule_text.fontSize).split("rem")[0]
			},
		},
		data(){
			 var activityConfig=window.store.activityConfig;
			return{
				colors: {
					hex: '#194d33',
					a: 1
				},
				selectColor:false,
				showForm:false,
				activityConfig,
				ruleSize:0,
				edit:false,
				preview: false,
				uploadConfig: {
					width: "100%", // 宽度
					height: "190px",
					onlyFile: true,
					fileSize: 5120000, // 上传文件的大小
					multiple: false, // 是否可以多个文件上传
					dragDrop: false, // 是否可以拖动上传文件
					tailor: true, // 是否可以裁剪图片
					del: false, // 是否可以删除文件
					finishDel:true,// 是否在上传文件完成后删除预览
				},

			}
		}
	}
</script>


<style>
	div.wap-rule-link {
		text-align: center;
	}
	.phone.iphone6 .app-view .rule-preview {
		padding: 10px;
		position: absolute;
		top: -458px;
		bottom: 0;
		left: 0;
		right: 0;
		width: 320px;
		height: 511px;
		background: rgba(0, 0, 0, .8);
		color: #fff;
		z-index: 1001;

	}
	.config-rule-text-new{
	    background: #ffe402;
	    color: #000;
	    height:450px;
	    overflow: auto;
	    padding: 6px;
	    border-radius: 6px;
	    
	}
	.config-rule-con{
	    height: 100%;
        padding:15px;
        border: 2px solid #aa89bd;
    } 
    .close-icon{
    	position: absolute;
    	top:0;
    	right: 0;
    } 
</style>
