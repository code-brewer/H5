<template>
	<div class="wap-edit-con">
		<edit-btn></edit-btn>
		<p>规则内容：</p>
		<div  v-el:rulecon :style="{'font-size':activityConfig.ruleCon.fontSize,'color':activityConfig.ruleCon.color}">
			<a v-for="item in conData" class="rule_text">{{item}}</a>
		</div>
		<modal :show.sync="showForm" size="md" >
			<div class="modal-panel" @click="colseColor">
				<div class="title">编辑文字</div>
				<div class="close" @click="showForm=false">X</div>
			    <div class="content">
			    	<div class="spane">
			    		<textarea rows="10" class="form-control" v-model="activityConfig.ruleCon.value" style="margin-left: 24px; display: inline-block;width: 80%;"></textarea>
			    	</div>
			    	<!-- <div class="spane">
			    		<div class="label">
			    				文字设置
			    			</div>
			    		<div class="nr">
			    			<p class="col" style="line-height: 1.8;">
			    				<span>
			    					文字：
			    				</span>
			    				<input type="text" class="form-control" v-model="activityConfig.rule.value" style="margin-left: 24px; display: inline-block;width: 200px;"/>
			    			</p>
			    			 <p class="col">
			    			 	<span>
			    			 		颜色：
			    			 	</span>
				    			<i :style="{'background-color':activityConfig.rule.color}" @click.stop="openColor"></i>
			    			  	<div v-show="selectColor" class="components-wrap"  @click.stop>
							        <Sketch :colors.sync="colors"></Sketch>
							    </div>
			    			 </p>
			    			 <p class="col">
			    			 	<span>
			    			 		大小：
			    			 	</span>
			    			 	  <slider max="3" min="0" step="0.1" style="width: 300px;" :value.sync="ruleSize"></slider>
			    			 </p>
			    		</div>
			    	</div> -->
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
			ruleSize(v){
			 	this.activityConfig.ruleCon.fontSize = v + "rem";
			},
			'activityConfig.rule.fontSize'(v){
				this.ruleSize = + v.split("rem")[0];
			},

		},
		methods:{
			colseColor(){
				if(this.selectColor)
				{
					this.activityConfig.ruleCon.color=this.colors.hex;
					this.selectColor=false;
				}
			},
			openColor(type){
				if(!this.selectColor)
					{
						this.selectColor = true;
						this.colors.hex = this.activityConfig.ruleCon.color;
					}
			},
			init(){
				this.conData = this.activityConfig.ruleCon.value.split('\n');
				console.log(this.conData);
 				var rule_text = document.defaultView.getComputedStyle(this.$els.rulecon);
				this.activityConfig.ruleCon.color = rule_text.color;
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
				conData:[],

			}
		}
	}
</script>


<style>
	div.wap-edit-con {
		text-align: center;
	}
</style>
