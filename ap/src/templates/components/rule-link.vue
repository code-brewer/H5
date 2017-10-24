<template>
	<div class="wap-rule-link">
		<edit-btn></edit-btn>
		<a v-link="{path: '/rule'}" :style="{'font-size':activityConfig.rule.fontSize+'px','color':activityConfig.rule.color}">{{activityConfig.rule.value}}</a>
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
			    			<p style="line-height: 1.8;">
			    				<span>
			    					文字：
			    				</span>
			    				<input type="text" class="form-control" v-model="activityConfig.rule.value" style="margin-left: 24px; display: inline-block;width: 200px;"/>
			    			</p>
			    			 <p>
			    			 	<span>
			    			 		颜色：
			    			 	</span>
				    			<i :style="{'background-color':activityConfig.rule.color}" @click.stop="openColor"></i>
			    			  	<div v-show="selectColor" class="components-wrap"  @click.stop>
							        <Sketch :colors.sync="colors"></Sketch>
							    </div>
			    			 </p>
			    			 <p>
			    			 	<span>
			    			 		大小：
			    			 	</span>
			    			 	  <slider max="30" min="0" style="width: 300px;" :value.sync="activityConfig.rule.fontSize"></slider>
			    			 </p>
			    		</div>
			    	</div>
			    </div>
			 </div>
		 </modal>
	
	</div>
	
</template>

<script>
	import editBtn from './edit-btn.vue'
	import vueColor from '../../components/vue-color/vue-color.js'
	import slider from '../../components/web-base/slider.vue'
	import modal from '../../components/bootstrap/Modal.vue'
	export default {
		components:{
			editBtn,
			Sketch:vueColor.Sketch,
			slider,
			modal
		},
		ready() {
			this.$on('show-edit', () => {
				this.showForm = !this.showForm;
			})
			
		},
		methods:{
			colseColor(){
				if(this.selectColor)
				{
					this.activityConfig.rule.color=this.colors.hex;
					console.log(this.activityConfig.rule.fontSize);
					this.selectColor=false;
				}
			},
			openColor(type){
				if(!this.selectColor)
					this.selectColor=true;
			}
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
				activityConfig
			}
		}
	}
</script>


<style>
	.wap-rule-link {
		text-align: center;
	}
</style>