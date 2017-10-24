<template>
	<div class="wap-rule-link-title">
		<edit-btn></edit-btn>
		<p>规则标题：</p>
		<a  v-el:ruletile class="rule_text" :style="{'font-size':activityConfig.ruleTitle.fontSize,'color':activityConfig.ruleTitle.color}">{{activityConfig.ruleTitle.value}}</a>
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
			    				<input type="text" class="form-control" v-model="activityConfig.ruleTitle.value" style="margin-left: 24px; display: inline-block;width: 200px;"/>
			    			</p>
			    			 <p class="col">
			    			 	<span>
			    			 		颜色：
			    			 	</span>
				    			<i :style="{'background-color':activityConfig.ruleTitle.color}" @click.stop="openColor"></i>
			    			  	<div v-show="selectColor" class="components-wrap"  @click.stop>
							        <Sketch :colors.sync="colors"></Sketch>
							    </div>
			    			 </p>
			    			 <p class="col">
			    			 	<span>
			    			 		大小：
			    			 	</span>
			    			 	  <slider max="3" min="0" step="0.1" style="width: 300px;" :value.sync="ruleTitleSize"></slider>
			    			 </p>
			    		</div>
			    	</div>
			    </div>
			</div>
		</modal>

	</div>

</template>

<script>
	import editBtn from '../edit-btn.vue'
	import vueColor from '../../../components/vue-color/vue-color.js'
	import slider from '../../../components/web-base/slider.vue'
	import modal from '../../../components/bootstrap/Modal.vue'
	import utils from  '../../../utils/index.js'
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
			this.init();
		},
		watch:{
			ruleTitleSize(v){
			 	this.activityConfig.ruleTitle.fontSize = v + "rem";
			},
			'activityConfig.ruleTitle.fontSize'(v){
				this.ruleTitleSize = + v.split("rem")[0];
			},

		},
		methods:{
			colseColor(){
				if(this.selectColor)
				{
					this.activityConfig.ruleTitle.color=this.colors.hex;
					this.selectColor=false;
					console.log('colro'+this.activityConfig.ruleTitle.color);
				}
			},
			openColor(type){
				if(!this.selectColor)
					{
						this.selectColor = true;
						this.colors.hex = this.activityConfig.ruleTitle.color;
					}
			},
			init(){
 				var rule_text = document.defaultView.getComputedStyle(this.$els.ruletile);
				this.activityConfig.ruleTitle.color = rule_text.color;
				this.ruleTitleSize = + utils.getRem(rule_text.fontSize).split("rem")[0]
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
				ruleTitleSize:0,

			}
		}
	}
</script>


<style>
	div.wap-rule-link-title {
		text-align: center;
	}
</style>
