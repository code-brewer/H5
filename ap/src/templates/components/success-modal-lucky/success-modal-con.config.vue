<template>
<div class="lucky-modal-con">
	<edit-btn :is-show="showEdit"></edit-btn>
	<p v-el:prizenumber :style="{'color':activityConfig.lucky.con.color,'font-size':activityConfig.lucky.con.fontSize}" >
		{{activityConfig.lucky.con.valueL}} 
		<span v-el:prizecount class="count">*****</span> 
		{{activityConfig.lucky.con.valueR}}	
	</p>
	<modal :show.sync="showForm" size="md" >
	<div class="modal-panel" @click="colseColor">
		<div class="title">编辑文字</div>
		<div class="close" @click="showForm=false">X</div>
		<div class="content">
			<div class="spane">
				<div class="label">
					常规文字
				</div>
				<div class="nr">
					<p class="col">
						<span>
							颜色：
						</span>
						<i :style="{'background-color':activityConfig.lucky.con.color}" @click.stop="openColor(0)"></i>
						<div v-show="selectColor" class="components-wrap"  @click.stop="">
							<Sketch :colors.sync="colors"></Sketch>
						</div>
					</p>
					<p class="col">
						<span>
							大小：
						</span>
						<slider max="3" min="1" step="0.1" style="width: 300px;" :value.sync="textSize"></slider>
					</p>
				</div>
			</div>
			
		</div>
	</div>
	</modal>
</div>
</template>
<style lang="scss">
	.number-of-dolucky{
		position:relative;
		text-align: right;
		font-size:1.6rem;
		color: #FFFFFF;
        position: relative;
        span {
            color: #ffb81d;
            text-decoration: underline;
        }
	}
</style>
<script>
	import vueColor from '../../../components/vue-color/vue-color.js'
	import modal from '../../../components/bootstrap/Modal.vue'
	import radio from '../../../components/web-base/radio.vue'
	import slider from '../../../components/web-base/slider.vue'
	import editBtn from '../edit-btn.vue'
	import utils from  '../../../utils/index.js'
	export default {
		components:{
			editBtn,
			modal,
			radio,
			slider,
			Sketch:vueColor.Sketch
		},
		data(){
			var activityConfig=window.store.activityConfig;
			return {
					colors: {
						hex: '#194d33',
						a: 1
					},
					numSize:0,
					test:'',
					textSize:0,
					isNum:false,
					showForm:false,
					activityConfig,
					selectColor:false,
					options:{
					allowMove : true, //是否允许移动
					allowResize: true, //是否允许调整大小
					aspectRatio: false, //指定选取区域的纵横比
				},
			}
		},
		watch:{
			'activityConfig.lucky.con.fontSize'(v){
				this.textSize = + v.split("rem")[0];
			},
			textSize(v){
				this.activityConfig.lucky.con.fontSize = v+"rem";
			},
			
		},
		methods:{
			colseColor(e){
				if(this.selectColor)
				{
					this.activityConfig.lucky.con.color = this.colors.hex;
					this.selectColor = false;
				}
			},
			init(){
 				var number_countent = document.defaultView.getComputedStyle(this.$els.prizenumber);
				
				this.activityConfig.lucky.con.color = number_countent.color;
				this.textSize = + utils.getRem(number_countent.fontSize).split("rem")[0];
			},
			openColor(type){
				if(!this.selectColor)
				{
					
					this.isNum=false;	
					this.colors.hex = this.activityConfig.lucky.con.color;
					this.selectColor=true;
				}
			}
		},
		ready() {
			this.$on('show-edit', () => {
				this.showForm = !this.showForm;
			})
			this.init();
		}
	}
</script>