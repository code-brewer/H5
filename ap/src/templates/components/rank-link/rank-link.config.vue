<template>
	<div class="wap-rank-link">
		<edit-btn></edit-btn>
		<a  v-el:rank class="rank_text" v-link="{path: '/rank'}" :style="{'font-size':activityConfig.rank.fontSize,'color':activityConfig.rank.color}">{{activityConfig.rank.value}}</a>
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
			    			<p class="col" style="line-height: 1.8;">
			    				<span>
			    					文字：
			    				</span>
			    				<input type="text" class="form-control" v-model="activityConfig.rank.value" style="margin-left: 24px; display: inline-block;width: 200px;"/>
			    			</p>
			    			 <p class="col">
			    			 	<span>
			    			 		颜色：
			    			 	</span>
				    			<i :style="{'background-color':activityConfig.rank.color}" @click.stop="openColor"></i>
			    			  	<div v-show="selectColor" class="components-wrap"  @click.stop>
							        <Sketch :colors.sync="colors"></Sketch>
							    </div>
			    			 </p>
			    			 <p class="col"> 
			    			 	<span>
			    			 		大小：
			    			 	</span>
			    			 	  <slider max="3" min="0" step="0.1" style="width: 300px;" :value.sync="rankSize"></slider>
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
			rankSize(v){
			 	this.activityConfig.rank.fontSize = v + "rem";
			},
			'activityConfig.rank.fontSize'(v){
				this.rankSize = + v.split("rem")[0];
			},
			
		},
		methods:{
			colseColor(){
				if(this.selectColor)
				{
					this.activityConfig.rank.color=this.colors.hex;
					this.selectColor=false;
				}
			},
			openColor(type){
				if(!this.selectColor)
					{
						this.colors.hex = this.activityConfig.rank.color;
						this.selectColor=true;
					}
			},
			init(){
 				var rank_text = document.defaultView.getComputedStyle(this.$els.rank);
				this.activityConfig.rank.color = rank_text.color;
				this.rankSize = + utils.getRem(rank_text.fontSize).split("rem")[0]
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
				rankSize:0,
				
			}
		}
	}
</script>


<style>
	.wap-rank-link {
		position: relative;
		text-align: center;
	}
</style>