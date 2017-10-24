<template>
	<div class="form">
		<div class="row">
			<span><span>姓名</span></span>
			<div>
				<input type="text" :readonly="options.name.disabled" v-model="options.name.value" @input="setActive" :placeholder="showPlaceHolder&&'请输入您的姓名'||''">
			</div>
		</div>
		<div class="row">
			<span><span>电话</span></span>
			<div>
				<input type="text" :readonly="options.mobile.disabled" v-model="options.mobile.value" @input="setActive" :placeholder="showPlaceHolder&&'请输入您的电话'||''" @focus="options.mobile.showError = false">
				<p class="error-text" v-show="options.mobile.showError">电话格式不正确</p>
			</div>
		</div>
		<div class="row">
			<span><span>地址</span></span>
			<div>
				<input type="text" :readonly="options.addr.disabled" v-model="options.addr.value" @input="setActive" :placeholder="showPlaceHolder&&'请输入您的地址'||''">
			</div>
		</div>
		<div class="row">
			<span>宝宝性别</span>
			<div class="sexDiv">
				<input type="radio" name="sex" :disabled="options.babygender.disabled" :checked="options.babygender.value==='1'?true:false" id="male" value="1" v-model="options.babygender.value"><label for="male"></label><span>男</span>
				<input type="radio" name="sex" :disabled="options.babygender.disabled" :checked="options.babygender.value==='2'?true:false" value="2" v-model="options.babygender.value" id="female"><label for="female"></label><span>女</span>
			</div>
		</div>
		<div class="row">
			<span>宝宝生日</span>
			<div>
				<input type="text" v-model="options.babybirthday.value" class="birthday" @input="setActive" :placeholder="showPlaceHolder&&'请输入您宝宝的生日'||''">
			</div>
		</div>
		<div class="row">
			<span>我的职业</span>
			<div>
				<input type="text" :readonly="options.job.disabled" v-model="options.job.value" @input="setActive" :placeholder="showPlaceHolder&&'请输入您的职业'||''">
			</div>
		</div>
		<div class="agree" v-if="options.agree.show">
			<input type="checkbox" :checked="options.agree.checked" v-model="options.agree.checked" id="agree"><label for="agree"></label>
			<span @click="tipModal.show = true">同意加入美赞臣A+妈妈会并接受美赞臣公司发出的育儿知识和优惠资讯。</span>
		</div>
		<div class="btn" v-if="options.btn.show">
			<a href="javascript:;" :class="{active: active}" @click="check">提交</a>
		</div>
	</div>
	<conch-coin-rule :show.sync="tipModal.show"></conch-coin-rule>
	<snackbar :text="'请同意协议'" :show-snack-bar.sync="showSnack"></snackbar>
</template>
<script>
	import ConchCoinRule from './ConchCoinRule.vue'
	import utils from '../utils/index.js'
	import jQuery from 'jquery'
	import '../dist/mobiscroll.custom-2.6.2.min.js'
	import snackbar from './snackbar.vue'

	export default {
		components: {
			ConchCoinRule,
			snackbar
		},
		props: {
			showPlaceHolder: false,
			forbiddenTime: false,
			options: {
				name: {
					type: Object,
					default() {
						return {
							value: '',
							disabled: false
						}
					}
				},
				mobile: {
					type: Object,
					default() {
						return {
							value: '',
							disabled: false,
							showError: false
						}
					}
				},
				addr: {
					type: Object,
					default() {
						return {
							value: '',
							disabled: false
						}
					}
				},
				babygender: {
					type: Object,
					default() {
						return {
							value: '',
							disabled: false
						}
					}
				},
				babybirthday: {
					type: Object,
					default() {
						return {
							value: '',
							disabled: false
						}
					}
				},
				job: {
					type: Object,
					default() {
						return {
							value: '',
							disabled: false
						}
					}
				},
				agree: {
					type: Object,
					default() {
						return {
							checked: false,
							show: true
						}
					}
				},
				btn: {
					type: Object,
					default() {
						return {
							show: true
						}
					}
				}
			}
		},
		data() {
			return {
				tipModal: {
					show: false
				},
				active: false,
				showSnack: false
			}
		},
		ready() {
			!this.forbiddenTime&&jQuery(this.$el.nextSibling).find(".birthday").scroller('destroy').scroller({
				preset: 'date',
				theme: 'android-ics light',
				mode: 'scroller',
				display: 'bottom',
				lang: 'zh',
				dateFormat: 'yyyy-mm-dd',
				dateOrder: 'yymmdd'
			});
			this.$on('checkActive', () => {
				this.setActive();
			})
		},
		methods: {
			setActive() {
				console.log(1)
				var bool = false;
				for(let i in this.options){
					if (!i.match(/babygender|agree|btn/)) {
						this.options[i].value !== '' && (bool = true);
					}
				}
				bool ? this.active = true : this.active = false;
			},
			check(e) {
				var self = e.target || e.srcElement;
				if (self.className.indexOf('active') == -1) {
					return false;
				}
				var bool = true,
					options = {};
				for(let i in this.options){
					if (i === 'btn') {continue;}
					if (i === 'agree') {
						if (!this.options.agree.checked) {
							this.showSnack = true;
							bool = false;
							break;
						}
					} else {
						if (i === 'mobile') {
							if (this.options[i].value !== '') {
								if (!utils.validate.isMob(this.options[i].value)) {
									this.options.mobile.showError = true;
									bool = false;
									break;
								}
							}
						}
						options[i] = this.options[i].value;
					}
				}
				if (!bool) {
					return false;
				}
				this.$dispatch('updateMyfile', options);
			}
		},
		watch: {
			'tipModal.show'(val) {
				val ? this.$dispatch('hidden') : this.$dispatch('auto');
			}
		}
	}
</script>
<style lang="scss">
	.form {
		.row {
			position: relative;
			height: 52px;
			padding: 15px 0 15px 160px;
			font-size: 26px;
			> div {
				position: relative;
			}
			.error-text {
				position: absolute;
				top: 100%;
				left: 0;
				width: 100%;
				margin-top: 15px;
				padding: 10px 0;
				line-height: 40px;
				font-size: 26px;
				color: white;
				border-radius: 10px;
				background: rgba(0,0,0,.6);
				z-index: 100;
				&:before {
					content: "";
					position: absolute;
					top: -30px;
					left: 20px;
					width: 0;
					height: 0;
					border: 15px solid transparent;
					border-bottom-color: rgba(0,0,0,.6);
				}
			}
			> span {
				position: absolute;
				top: 15px;
				left: 0;
				width: 140px;
				color: white;
				line-height: 52px;
				border-radius: 10px;
				background: #43a4ae;
				> span {
					display: inline-block;
					width: 190px;
					letter-spacing: 50px;
					pointer-events: none;
				}
			}
			input[type='text'] {
				display: block;
				width: 97%;
				height: 50px;
				padding-left: 3%;
				line-height: 50px;
				font-size: 26px;
				border: 1px solid #43a4ae;
				border-radius: 10px;
				color: #43a4ae;
				outline: none;
			}
			input[type='radio'] {
				float: left;
				opacity: 0;
				filter: alpha(opacity=0);
				&:checked+label {
					background: #43a4ae;
				}
			}
			.sexDiv {
				vertical-align: middle;
				text-align: left;
				line-height: 50px;
				label {
					display: inline-block;
					width: 24px;
					height: 24px;
					border: 1px solid #43a4ae;
					border-radius: 3px;
					vertical-align: middle;
				}
				span {
					padding-left: 15px;
					color: #43a4ae;
					vertical-align: middle;
					&:first-of-type {
						margin-right: 90px;
					}
				}
			}
		}
		.agree {
			position: relative;
			padding: 30px 0 30px 50px;
			vertical-align: middle;
			text-align: left;
			input[type='checkbox'] {
				position: absolute;
				opacity: 0;
				filter: alpha(opacity=0);
				&:checked+label {
					background: #43a4ae;
				}
			}
			label {
				position: absolute;
				top: 38px;
				left: 0;
				width: 24px;
				height: 24px;
				border: 1px solid #43a4ae;
				border-radius: 3px;
				vertical-align: middle;
			}
			span {
				color: #43a4ae;
				font-size: 26px;
				line-height: 1.5;
				text-decoration: underline;
			}
		}
		.btn {
			a {
				display: block;
				width: 148px;
				height: 84px;
				margin: 0 auto;
				line-height: 75px;
				text-align: center;
				color: white;
				font-size: 32px;
				background: url(../images/btn2.png) 0 0 no-repeat;
				&.active {
					background: url(../images/btn2.png) 0 -84px no-repeat;
				}
			}
		}
	}
</style>