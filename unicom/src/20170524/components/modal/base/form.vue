<template>
	<Modal :show="show" @close="close">
		<div class="members form" slot="content">
			<h3>领奖信息登记</h3>
			<div class="row">
				<div class="label"><span>姓</span>名：</div>
				<input type="text" v-model="userName">
			</div>
			<div class="row">
				<div class="label"><span>地</span>址：</div>
				<input type="text" v-model="address">
			</div>
			<div class="row">
				<div class="label">手机号码：</div>
				<input type="text" maxLength="11" v-model="mobile" disabled>
			</div>
			<div class="notice">
				<div class="title">领奖须知：</div>
				<p>奖品将于活动结束10个工作日内统一派发给中奖者，活动期间请务必在页面填写正确领奖信息。</p>
			</div>
			<div class="center">
				<btn @click.native="handleClick" :style="style">{{btnText}}</btn>
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
				username: '',
				addr: '',
				mobile: '',
				disabled: false
			}
		},
		computed: {
			style() {
				return this.disabled ? {'background': '#999'} : '';
			},
			btnText() {
				return this.disabled ? '提交中' : '提交信息';
			}
		},
		methods: {
			submitForm(path) {
				if ( this.disabled ) {
					return;
				}
				let error = '';
				if ( !this.userName ) {
					error = '请输入姓名';
				}
				if ( !this.address ) {
					error = '请输入地址';
				}
				if ( !this.mobile ) {
					error = '请输入手机号码';
				} else if ( !validate.isMob(this.mobile) ) {
					error = '请输入正确的手机号码格式';
				}
				if ( error ) {
					this.$parent.$emit('showError', error);
					return;
				}
				/** 禁止重复提交 */
				this.disabled = true;
				this.$parent.$emit('showLoading');
				api.editMyAddr(this, {
					gid: this.options.gid,
					username: this.userName,
					addr: this.address,
					mobile: this.mobile
				}, back => {
					this.disabled = false;
					this.$parent.$emit('hideLoading');
					ajaxHandler.call(this, back, () => {
						this.$emit('showModal', path);
					})
				})
			}
		},
		mounted() {
			let mobile = window.localStorage.getItem('loginMobile');
			if ( mobile ) {
				this.mobile = mobile;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.form {
		padding: 0 30px;
		.row {
			position: relative;
			padding: 20px 0 20px 170px;
			font-size: 34px;
			.label {
				position: absolute;
				top: 20px;
				left: 0;
				line-height: 70px;
				span {
					padding-right: 70px;
				}
			}
			input {
				width: 100%;
				padding-left: 20px;
				line-height: 66px;
				border: 2px solid black;
				box-sizing: border-box;
				outline: none;
				box-sizing: border-box;
				font-size: inherit;
				background: #eeede8;
			}
		}
		.notice {
			padding-top: 30px;
			font-size: 26px;
			color: #000be2;
			.title {
				font-size: 28px;
			}
		}
	}
</style>