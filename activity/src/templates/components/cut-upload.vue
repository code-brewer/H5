<template>
	<modal :show.sync="show" size="md" >
		<div class="modal-panel">
			<div class="title">编辑图片</div>
			<div class="close" @click="show=false">X</div>
			<div class="editForm editImg">
				<div class="con">
			 		<div class="uploadBtn">
							上传图片
					<input type="file" class="file" @change="change">
					</div>
						<div class="submitBtn" @click="cut" v-show="showcut">确定</div>
					</div>
			</div>
			<div class="preview">
				<img :src="src" class="target" style="width: auto;">
			</div>
			<canvas class="canvas" v-show="false"></canvas>
		</div>
	</modal>
</template>
<style lang="scss">
	.preview {
			padding: 10px 0;
			text-align: center;
			.jcrop-holder {
				margin: 0 auto!important;
			}
	}
	.editImg {
		text-align: center;
		.con {
			padding: 25px 0;
			> span, .img, .uploadBtn, .submitBtn {
				display: inline-block;
			}
			> span {
				width: 60px;
				line-height: 60px;
			}
			.img {
				position: relative;
				width: 60px;
				height: 60px;
				margin: 0 40px 0 20px;
				border: 1px dashed #d7d7d7;
				background: #e8e8e8;
				vertical-align: top;
				img {
					position: absolute;
					top: 50%;
					width: 100%;
					-webkit-transform: translate(0,-50%);
					transform: translate(0,-50%);
				}
			}
			.uploadBtn, .submitBtn {
				position: relative;
				width: 90px;
				height: 40px;
				margin-right: 20px;
				line-height: 40px;
				text-align: center;
				border-radius: 5px;
				color: white;
				font-size: 14px;
				background: #1c96e3;
				input {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					filter: alpha(opacity=0);
				}
			}
		}
		
	}
</style>
<script>
 	import Vue from 'vue'
 	import modal from '../../components/bootstrap/Modal.vue'
 	import jQuery from 'jquery'
    import jcorp from '../../js/jquery.Jcrop.js'
	export default {
		components:{
			modal,
		},
 		props:{
 			src:{
 				String,
 				default:function(){
 					return '';
 				},
 				required: true
 			},
 			show:{
 				Boolean,
 				default:false,
 				required: true
 			}
 		},
		data(){
			return{
				src:"",
				ops:{},
				img:{},
				showcut:false
			}
		},watch:{
			show(v){
				if(v&&this.img.setImage){
					this.img.setImage(this.src);
				}
			}
		}, 
		ready(){
			console.log(2212);
			var that=this;
			if(that.src!=""){
				var img = new Image();
					img.onload = () => {
						jQuery(that.$el.parentElement).find(".target").Jcrop({
						onChange(data){that.ops=data; }},
						function(){ that.img=this;});
					}
				img.src=that.src;
				that.showcut=true;
			}
		},
		methods: {
			cut(){
				console.log(21231);
				var that=this,
				canvas =jQuery(that.$el.parentElement).find(".canvas")[0],
				img=jQuery(that.$el.parentElement).find(".target")[0],
				ctx = canvas.getContext('2d');
				ctx.clearRect(0,0,img.width,img.height);
				if(that.ops.w){
					canvas.width = that.ops.w;
					canvas.height =that.ops.h;
					ctx.drawImage(img, that.ops.x, that.ops.y, that.ops.w, that.ops.h, 0, 0, that.ops.w, that.ops.h);
					this.src = canvas.toDataURL();
				}else{
					canvas.width = img.width;
					canvas.height = img.height;
					ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
					this.src = canvas.toDataURL();
				}
				this.$dispatch("getSrc",this.src);
				that.show=false;
			},change(ele){
				var that=this,
				 	reader = new FileReader(),
				    file = (ele.target || ele.srcElement).files[0];
					reader.readAsDataURL(file);
					that.ops={};
					that.showcut=true;
					reader.onload = (e) => {
						if(!that.img.setImage){
					    	var img = new Image();
							img.onload = () => {
							jQuery(that.$el.parentElement).find(".target").Jcrop({
								onChange(data){that.ops=data; }},
								function(){ that.img=this;});
					 		}
							img.src=e.target.result;
					    }else that.img.setImage(e.target.result);
						this.src=e.target.result;
					}						
				}
		}
	}
</script>