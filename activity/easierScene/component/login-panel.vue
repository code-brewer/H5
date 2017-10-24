<template>
	<div class="main">
		<div class="login-panel">
			<div class="title">
			</div>
			<div class="form-panel">
				<div class="form-input">
					<input type="text" v-model="user.name" />
				</div>
				<div class="form-input">
					<input type="password"  @keydown="keydowns($event)" v-model="user.pwd" />
				</div>
				<div class="login-btn">
					<a @click="loginFun">登录</a>
				</div>
			</div>
		</div>
		<loading :show-msg.sync="loadConfig.show" :msg="loadConfig.msg">
		</loading>
	</div>
</template>
<script>
	import loading from '../../src/components/web-base/loading.vue'
	import api from '../api/index.js'
	export default {
		components: {
			loading
		},
		methods: {
			keydowns(e) {
				if(e.keyCode==13){
					this.loginFun();
				}
			},
			loginFun() {
				api.login(this, {
					'acct': this.user.name,
					'pwd': this.user.pwd
				}, (back) => {
					if(back.resCode != "000000") {
						this.loadConfig.show = true;
						this.loadConfig.msg = back.resMsg;
					} else {
						this.$root.userinfo = back.repBody;
						localStorage.setItem("userinfo", JSON.stringify(back.repBody));
						this.$root.router.go({
							'path': '/main'
						});
					}
				});
			}
		},
		ready() {
 
		},
		data() {
			return {
				loadConfig: {
					show: false,
					msg: '密码错误'
				},
				user: {
					name: '',
					pwd: ''
				}
			}
		},

	}
</script>
<style lang="scss">
	html,
	body {
		height: 100%;
		width: 100%;
		margin: 0;
		overflow: hidden;
	}
	
	.main {
		height: 100%;
		width: 100%;
		background-image: url(../image/bg.jpg);
		background-size: cover;
		background-repeat: no-repeat;
		overflow: hidden;
		.login-panel {
			position: absolute;
			height: 413px;
			width: 379px;
			border-radius: 13px;
			background-color: white;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			.form-panel {
				.form-input {
					position: relative;
					text-align: center;
					margin-bottom: 35px;
					&::before {
						display: block;
						content: ' ';
						background-image: url(../image/icon-pwd.png);
						width: 22px;
						height: 25px;
						background-size: 100%;
						background-repeat: no-repeat;
						position: absolute;
						top: 50%;
						left: 65px;
						transform: translateY(-50%);
						z-index: 1;
					}
					input {
						width: 275px;
						height: 35px;
						border: 1px solid #c1c1c1;
						border-radius: 5px;
						outline: none;
						position: relative;
						padding-left: 40px;
						box-sizing: border-box;
					}
					&:first-child {
						margin-bottom: 20px;
						&::before {
							background-image: url(../image/icon-user.png);
						}
					}
				}
				.login-btn {
					text-align: center;
					a {
						margin: 0 auto;
						display: block;
						width: 275px;
						height: 44pxpx;
						border-radius: 5px;
						font-size: 14px;
						text-align: center;
						line-height: 44px;
						color: white;
						background-color: #419ce9;
						cursor: pointer;
						&:hover {
							text-decoration: none;
						}
					}
				}
			}
			.title {
				background-image: url(../image/title.jpg);
				background-size: 100%;
				height: 52px;
				width: 296px;
				text-align: center;
				margin: 52px auto;
				background-repeat: no-repeat;
			}
		}
	}
</style>