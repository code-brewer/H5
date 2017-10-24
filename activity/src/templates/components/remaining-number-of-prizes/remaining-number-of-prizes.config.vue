<template>
	<div class="wap-remaining-number-of-prizes" v-show="activityConfig.atNum.show">
		<edit-btn :is-show="showEdit"></edit-btn>
		<p class="number-countent" v-el:number :style="{'color':activityConfig.atNum.text.color,'font-size':activityConfig.atNum.text.fontSize}">
			{{activityConfig.atNum.text.valueL}}
			<span v-el:count class="count" :style="{'color':activityConfig.atNum.num.color,'font-size':activityConfig.atNum.num.fontSize}">{{configData.gidcnt}}</span> {{activityConfig.atNum.text.valueR}}
		</p>
		<modal :show.sync="showForm" size="md">
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
								<i :style="{'background-color':activityConfig.atNum.text.color}" @click.stop="openColor(0)"></i>
								<div v-show="selectColor" class="components-wrap" @click.stop="">
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
					<div class="spane">
						<div class="label">
							奖品数量
						</div>
						<div class="nr">
							<p class="col">
								<span>
							颜色：
						</span>
								<i :style="{'background-color':activityConfig.atNum.num.color}" @click.stop="openColor(1)"></i>
							</p>
							<p class="col">
								<span>
							大小：
						</span>
								<slider max="3" min="1" step="0.1" style="width: 300px;" :value.sync="numSize"> </slider>
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
	import modal from '../../../components/bootstrap/Modal.vue'
	import radio from '../../../components/web-base/radio.vue'
	import slider from '../../../components/web-base/slider.vue'
	import editBtn from '../edit-btn.vue'
	import utils from '../../../utils/index.js'
	export default {
		components: {
			editBtn,
			modal,
			radio,
			slider,
			Sketch: vueColor.Sketch
		},
		data() {
			var activityConfig = window.store.activityConfig;
			var configData = window.store.configData;
			return {
				configData,
				colors: {
					a: 1,
					rgba: {
						a: 1,
						r: 0,
						g: 0,
						b: 0
					},
					hex: ''
				},
				numSize: 0,
				test: '',
				textSize: 0,
				isNum: false,
				showForm: false,
				activityConfig,
				selectColor: false,
				options: {
					allowMove: true, //是否允许移动
					allowResize: true, //是否允许调整大小
					aspectRatio: false, //指定选取区域的纵横比
				},
			}
		},
		watch: {
			'activityConfig.atNum.num.fontSize' (v) {
				this.numSize = +v.split("rem")[0];
			},
			'activityConfig.atNum.text.fontSize' (v) {
				this.textSize = +v.split("rem")[0];
			},
			textSize(v) {
				this.activityConfig.atNum.text.fontSize = v + "rem";
			},
			numSize(v) {
				this.activityConfig.atNum.num.fontSize = v + "rem";
			}
		},
		methods: {
			colseColor(e) {
				if(this.selectColor) {
					if(this.isNum)
						this.activityConfig.atNum.num.color = this.colors.hex;
					else
						this.activityConfig.atNum.text.color = this.colors.hex;
					this.selectColor = false;
				}
			},
			init() {
				var number_countent = document.defaultView.getComputedStyle(this.$els.number),
					count = document.defaultView.getComputedStyle(this.$els.count);
				this.activityConfig.atNum.num.color = count.color;
				this.activityConfig.atNum.text.color = number_countent.color;
				this.numSize = +utils.getRem(count.fontSize).split("rem")[0];
				this.textSize = +utils.getRem(number_countent.fontSize).split("rem")[0];
			},
			openColor(type) {
				if(!this.selectColor) {
					if(type == 1) {
						this.colors.hex = this.activityConfig.atNum.num.color;
						this.isNum = true;
					} else {
						this.colors.hex = this.activityConfig.atNum.text.color;
						this.isNum = false;
					}
					this.selectColor = true;
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