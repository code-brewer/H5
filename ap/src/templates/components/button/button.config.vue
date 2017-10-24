<template>
<div class="wap-button-view">
	<div class="wap-button" v-el:bg  :style="{'background-color':config.bg.color,'background-image': (config.bg.imgUrl?'url('+config.bg.imgUrl+')':1),'height':config.bg.imgH,'line-height':config.bg.imgH}">
		<edit-btn></edit-btn>
		<span class="button_text" v-el:button :style="{'font-size':config.text.fontSize,'color':config.text.color}" >
			<slot></slot>
		</span>
	</div>
	<modal :show.sync="showForm" size="md" >
	<div class="modal-panel" @click="colseColor">
		<div class="title">编辑文字</div>
		<div class="close" @click="showForm=false">X</div>
		<div class="content">
			<div class="spane">
				<div class="label">
					文字设置
				</div>
				<div class="nr">
					<!--<p class="check-box">
							<radio name="hello" :model.sync="test"  :checked="true">默认</radio>
								<radio name="hello" :model.sync="test" style="margin-left: 30px;" value="false">自定义</radio>
					</p>-->
					<p class="col" style="line-height: 1.8;">
						<span>
							文字：
						</span>
						<input type="text" class="form-control" v-model="config.text.value" style="margin-left: 24px; display: inline-block;width: 200px;"/>
					</p>
					<p class="col">
						<span>
							颜色：
						</span>
						<i :style="{'background-color':config.text.color}" @click.stop="openColor(0)"></i>
						<div v-show="selectColor" class="components-wrap"  @click.stop>
							<Sketch :colors.sync="colors"></Sketch>
						</div>
					</p>
					<p class="col">
						<span>
							大小：
						</span>
						<slider max="3" min="0" step="0.1" style="width: 300px;" :value.sync="fontSize"></slider>
					</p>
				</div>
			</div>
			<div class="spane" style="margin-bottom: 0;">
				<div class="label">
					背景
				</div>
				<div class="nr">
					<p class="col" style="line-height: 1.8;">
						<span>
							颜色：
						</span>
						<i :style="{'background-color':config.bg.color}" @click.stop="openColor(1)"></i>
					</p>
					<p class="col">
						<span style="line-height: 4;">
							图片：
						</span>
						<upload :config="uploadConfig" :is-center="false" :img-url.sync="config.bg.imgUrl" ></upload>
					</p>
				</div>
			</div>
		</div>
	</div>
	</modal>
</div>
</template>
<script>
import vueColor from '../../../components/vue-color/vue-color.js'
import slider from '../../../components/web-base/slider.vue'
import modal from '../../../components/bootstrap/Modal.vue'
import radio from '../../../components/web-base/radio.vue'
import editBtn from '../edit-btn.vue'
import upload from '../../../components/web/upload.vue'
import utils from  '../../../utils/index.js'
	export default {
		props: {
			config: {
				type: Object,
				twoWay: true,
				default: {
					bg: {},
					text: {}
				}
			}
		},
		components:{
			editBtn,
			modal,
			radio,
			upload,
			slider,
			Sketch:vueColor.Sketch
		},
		watch:{
			fontSize(v){
			 	this.config.text.fontSize = v + "rem";
			},
			'config.text.fontSize'(v){
				this.fontSize = + v.split("rem")[0];
			},
			'config.bg.imgUrl' (v) {
          	  this.setImage.src = v;
      		},
		},
		data(){
			return{
				colors: {
					hex: '#194d33',
					a: 1
				},
				setImage: null,
				fontSize:0,
				isColor:false,
				selectColor:false,
				showForm:false,
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
		methods:{
			colseColor(){
				if(this.selectColor)
				{
					if(this.isColor)
						this.config.bg.color=this.colors.hex;
					else
						this.config.text.color=this.colors.hex;
					this.selectColor=false;
				}
			},
			openColor(type){
				if(!this.selectColor)
				{
					if(type==1)
					{
						this.isColor = true;
						this.colors.hex = this.config.bg.color;
					}
						
					else
					{
						this.isColor = false;
						this.colors.hex = this.config.text.color;
					}
					this.selectColor=true;
				}
			},
			init(){
 				var button = document.defaultView.getComputedStyle(this.$els.button),
 					bg = document.defaultView.getComputedStyle(this.$els.bg);
				this.config.text.color = button.color;
				this.config.bg.color = bg.backgroundColor;
				this.fontSize = +utils.getRem(button.fontSize).split("rem")[0];
			    this.config.bg.imgUrl = bg.backgroundImage.split('"')[1];
	            this.setImage = new Image();
	            this.setImage.src =  this.config.bg.imgUrl;
	            this.setImage.onload = () => {
	                var l = this.setImage.width / this.setImage.height;
	                 this.config.bg.imgH = (this.$els.bg.offsetWidth / (l * 12)) + 'rem';
	            }
			},
		},
		ready() {
			this.$on('show-edit', () => {
				this.showForm = !this.showForm;
			}),
			this.init();
		}
	}
</script>
<style lang="scss">
	@import '../../../css/px2rem.scss';
	.wap-button-view{
		.wap-button {
			position: relative;
		}
		.upload{
			height: 190px;
			margin-left: 47px;
			.upload_preview{
				border-top: 0;
			}
		}
	}
</style>
