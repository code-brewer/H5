<template>
	<div class="nochange-modal-title">
		<edit-btn></edit-btn>
		<p  v-el:nochangecon :style="{'font-size':activityConfig.noChange.conSize,'color':activityConfig.noChange.conColor}">{{activityConfig.noChange.con}}</p>
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
			    				<input type="text" class="form-control" v-model="activityConfig.noChange.con" style="margin-left: 24px; display: inline-block;width: 200px;"/>
			    			</p>
			    			 <p class="col">
			    			 	<span>
			    			 		颜色：
			    			 	</span>
				    			<i :style="{'background-color':activityConfig.noChange.conColor}" @click.stop="openColor"></i>
			    			  	<div v-show="selectColor" class="components-wrap"  @click.stop>
							        <Sketch :colors.sync="colors"></Sketch>
							    </div>
			    			 </p>
			    			 <p class="col">
			    			 	<span>
			    			 		大小：
			    			 	</span>
			    			 	  <slider max="3" min="0" step="0.1" style="width: 300px;" :value.sync="titleSize"></slider>
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
			titleSize(v){
			 	this.activityConfig.noChange.conSize = v + "rem";
			},
			'activityConfig.noChange.conSize'(v){
				this.titleSize = + v.split("rem")[0];
			},

		},
		methods:{
			colseColor(){
				if(this.selectColor)
				{
					this.activityConfig.noChange.conColor=this.colors.hex;
					this.selectColor=false;
					
				}
			},
			openColor(type){
				if(!this.selectColor)
					{
						this.selectColor = true;
						this.colors.hex = this.activityConfig.noChange.conColor;
					}
			},
			init(){
 				var rule_text = document.defaultView.getComputedStyle(this.$els.nochangecon);
				this.activityConfig.noChange.conColor = rule_text.color;
				this.titleSize = + utils.getRem(rule_text.fontSize).split("rem")[0]
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
				titleSize:0,

			}
		}
	}
</script>
