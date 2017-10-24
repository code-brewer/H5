<template>
	<Modal :show="show" @close="close">
		<div class="login" slot="content">
			<h3>亲，登记信息才可以通知你领奖哦～</h3>
			<div class="row">
				<div class="label">手机号码：</div>
				<input type="text" v-model="mobile">
			</div>
			<div class="row row2">
				<div class="label">验<span>证</span>码：</div>
				<input type="text" v-model="code">
				<a href="javascript:;" class="get-code" :style="{background: disabled ? '#999' : 'blue'}" @click="getCode">{{ disabled ? time + 's' : '获取'}}</a>
			</div>
			<div class="center">
				<btn @click.native="login" :style="loginStyle">登录</btn>
			</div>
		</div>
	</Modal>
</template>
<script>
	import utils from '../utils.js'
	import btn from '../../button/button.vue'
	import api from '../../../api/'
	import { validate, ajaxHandler } from '../../../utils/'
	export default {
		mixins: [utils],
		components: {
			btn
		},
		data() {
			return {
				mobile: '',
				code: '',
				disabled: false,
				time: 60,
				loginDisabled: false
			}
		},
		computed: {
			loginStyle() {
				return this.loginDisabled ? {'background': '#999'} : '';
			}
		},
		methods: {
			/**
			 * 获取手机验证码
			 */
			getCode() {
				if (this.disabled) {
					return;
				}
				if (!this.mobile) {
					this.$parent.$emit('showSnackbar', '请输入手机号码');
					return;
				} else if (!validate.isMob(this.mobile)) {
					this.$parent.$emit('showSnackbar', '请输入正确的手机号码格式');
					return;
				}

				this.disabled = true;
				let timer = null;

				/** 60s倒计时 */
				timer = setInterval(() => {
					if (this.time === 0) {
						clearInterval(timer);
						this.time = 60;
						this.disabled = false;
						return;
					}
					this.time--;
				}, 1000);

				/** 发送短信验证码 */
				api.sendLoginCode(this, {mobile: this.mobile}, back => {
					ajaxHandler.call(this, back);
				})
			},
			/**
			 * [登录]
			 */
			login() {
				let error;
				if ( this.loginDisabled ) {
					return;
				}
				if (!this.mobile) {
					error = '请输入手机号码';
				} else if (!validate.isMob(this.mobile)) {
					error = '请输入正确的手机号码格式';
				}
				if (!this.code) {
					error = '请输入验证码';
				}
				if ( error ) {
					this.$parent.$emit('showError', error);
					return;
				}
				
				this.$parent.$emit('showLoading');
				this.loginDisabled = true;
				this.$parent.loginMobile = this.mobile;
				window.localStorage.setItem('loginMobile', this.mobile);
				api.login(this, {
					mobile: this.mobile,
					code: this.code,
					source: source
				}, back => {
					this.$parent.$emit('hideLoading');
					this.loginDisabled = false;
					ajaxHandler.call(this, back, () => {
						this.close(false);
						this.$parent.$emit('loginSuccess');
						if ( this.options.source === 'myPrize' ) {
							this.$parent.$emit('showMyPrize');
						}
						if ( this.options.source === 'lottery' ) {
							this.$parent.$emit('showSnackbar', '您可以开始抽奖了哦～');
						}
					});
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.login {
		h3 {
			font-size: 36px;
		}
		.row {
			position: relative;
			width: 90%;
			margin: 0 auto;
			padding: 20px 0 20px 170px;
			font-size: 34px;
			box-sizing: border-box;
			.label {
				position: absolute;
				top: 20px;
				left: 0;
				line-height: 70px;
				span {
					padding: 0 17px;
				}
			}
			input {
				width: 100%;
				padding-left: 20px;
				line-height: 66px;
				border: 2px solid black;
				box-sizing: border-box;
				outline: none;
				font-size: inherit;
				box-sizing: border-box;
				background: #eeede8;
			}
		}
		.get-code {
			position: absolute;
			top: -2px;
			right: 0;
			display: inline-block;
			margin: 20px auto;
			padding: 3px 50px;
			color: white;
			font-size: 34px;
			font-weight: 700;
			text-align: center;
			line-height: 60px;
			border-radius: 40px;
			background: blue;
			box-shadow: 0 6px 0 black;
			transition: all .1s linear;
			&:active {
				transform: translate(0, 6px) translateZ(0);
				box-shadow: none;
			}
		}
		.row2 {
			padding-right: 180px;
		}
	}
</style>