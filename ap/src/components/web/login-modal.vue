<template>
	<modal :show.sync="show" size="md">
		<div class="modal-body">
			<button type="button" class="close" @click="show=false"><span aria-hidden="true">&times;</span></button>
			<form class="ams-login-box" @submit.prevent="login">
				<p class="login-text"></p>
				<!-- <p class="no-account">没有账号？
					<a href="#">点这里试试</a>
				</p> -->
				<label>
					<p>账号</p>
					<input type="text" class="form-control" placeholder="请输入您的账号" v-model="formData.userAccount" name="account">
				</label>
				<label>
					<p>密码</p>
					<input type="password" class="form-control" placeholder="请输入您的密码" v-model="formData.userPass" name="pass">
				</label>

				<button-ripple :color="ing?'disabled':'button-primary'">{{ing?'登录中..':'登录'}}</button-ripple>

				<!-- <p class="forget"><a href="#">忘记密码</a></p> -->
			</form>
		</div>
	</modal>

	<snackbar :show.sync="is_error" :message="error_msg" action-text="知道了"></snackbar>
</template>

<script>
	import modal from '../bootstrap/Modal'
	import buttonRipple from '../web-base/button-ripple'

	import snackbar from '../web-base/snackbar'

	import api from '../../api'
	import utils from '../../utils'

	export default {
		components: {
			modal,
			buttonRipple,
			snackbar
		},

		props: {
			flag:{
				type: Boolean,
				default: false
			},
			show: {
				require: true,
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				ing: false,
				formData: {
					userAccount: '',
					userPass: ''
				},
				is_error: false,
				error_msg: '账号或密码错误'
			}
		},

		methods: {
			login() {
				var self = this;
				this.ing = true;
		
				api.login(this, this.formData, (back)=> {
					self.ing = false;
					if(back.resCode == '0') {
						 sessionStorage.setItem('ams_v2_userinfo', JSON.stringify(back.repBody));

						this.$root.getUserinfo();

						self.show = false;
						this.flag = !this.flag;
					}
					else {
						self.is_error = true;
						this.error_msg = back.resMsg
					}
				}, (err) => {
					self.is_error = true;
					this.ing = false;
					this.error_msg = '网络错误!'
				})
		

			}
		}
	}
</script>

<style lang="scss">

	.ams-login-box {
		width: 490px;
		margin: 60px auto;
		p {
			display: block;
			margin-left: 20px;
			font-size: 12px;
			color: #000;
		}
		p.login-text {
			background: url('../../assets/icon-login-text.png') 0 0;
			width: 42px;
			height: 20px;
			margin-bottom: 20px;
		}
		p.no-account {
			margin-bottom: 40px;
		}

		p.forget {
			text-align: right;
			margin-top: 20px;
			a {
				color: #000;
			}
		}
		
		label {
			display: block;
			margin-top: 20px;
			input.form-control {
				width: 100%;
				height: 50px;
				background: #ececf5;
				border: none;
			}
		}

		.button-ripple {
			height: 50px;
			margin-top: 50px;
			border-radius: 0;
			-webkit-border-radius: 0;
			-moz-border-radius: 0;
			width: 100%;
		}

		.form-control {
			padding-left: 20px;
		}
	}
</style>