<template>
	<div class="user-container">
		<div class="container">
			<img class="left_img" src="../assets/left.png" alt="">
			<img class="right_img" src="../assets/right.png" alt="">
			<img class="left_img_1" src="../assets/left-1.png" alt="">
			<img class="right_img_1" src="../assets/right-1.png" alt="">
			<div class="user-information col-md-10">
				<p class="user-header">账户信息</p>
				<div class="user-panel">
					<div class="user-panel-heading">
						<h4 class="user-panel-title">
			          <span style="width: 16.8%;display: inline-block;">用户级别：</span>
			          <span >{{user.level=='1'?'超级用户':user.level=='2'?'高级用户':user.level=='3'?'普通用户':'未登录'}}</span>
			        </h4>
					</div>
				</div>
				<div class="info">
					<panel class="avatar-panel" header="头像：">
						<img slot="header" class="upload_img" :src="user.logo_url" alt=""></img>
						<div>
							<file-upload v-show="false" name="userImg" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
							<img style="width: 100px;height: 100px;" :src="uploadImg" class="upload_img" alt="">
							<div style="width: 100px;display: inline-block;vertical-align: bottom;margin-left: 40px;">
								<a class="avatar-btn avatar-update-btn" href="javascript:" @click="clickInput">上传</a>
								<a class="avatar-btn avatar-save-btn" style="background-color: #53c843;margin-top: 10px;" href="javascript:" @click="saveUserLogo">保存</a>
							</div>
						</div>
					</panel>
					<panel header="邮箱：" :is-open.sync="showPanel.email">
						<div>
							<p>
								<label>邮箱:</label>
								<input type="text" v-model="email" class="form-control" />
							</p>
							<a @click="saveEmail" class="avatar-btn avatar-save-btn" style="background-color: #53c843;margin-top: 10px;" href="javascript:">保存</a>
						</div>
						<span slot="header">{{user.email}}</span>
					</panel>
					<panel header="手机号码：" :is-open.sync="showPanel.tel">
						<div>
							<p>
								<label>手机号:</label>
								<input type="text" v-model="tal" maxlength="11" class="form-control" />
							</p>
							<a @click="saveTel" class="avatar-btn avatar-save-btn" style="background-color: #53c843;margin-top: 10px;" href="javascript:">保存</a>
						</div>
						<span slot="header">{{user.tal}}</span>
					</panel>
					<panel header="密码：" :is-open.sync="showPanel.pass">
						<div>
							<p>
								<label>当前密码:</label>
								<input type="password" v-model="pass.oldpass" class="form-control" />
							</p>
							<p>
								<label>新密码:</label>
								<input type="password" v-model="pass.newpass" class="form-control" />
							</p>
							<p>
								<label>确认密码:</label>
								<input type="password" v-model="pass.qpass" class="form-control" />
							</p>
							<a @click="savePass" class="avatar-btn avatar-save-btn" style="background-color: #53c843;margin-top: 10px;" href="javascript:">保存</a>
						</div>
						<span slot="header">********</span>
					</panel>
					<panel header="公众号绑定:" :is-open.sync="showPanel.wxInfo">
						<div>
							<p>
								<label>公众号名称:</label>
								<input type="text" v-model="pubname" class="form-control" />
							</p>
							<p>
								<label>AppID:</label>
								<input type="text" v-model="user.appid" class="form-control" />
							</p>
							<p>
								<label>AppSecret:</label>
								<input type="text" v-model="user.appsecret" class="form-control" />
							</p>
							<div class="txt-info">
								<label>上传文件:</label>
								<span @click="clickWxFile" class="form-control">{{user.wxfile}}</span>
								<file-upload v-show="false" name="wxFile" action="upload/uploadWxFile" :auto="true" class="upload-btn"></file-upload>
							</div>
							<div class="qrcode-container">
								<label>二维码:</label>
								<div class="qrcode">
									<file-upload v-show="false" name="qrcodeImg" action="upload/upVideoOrFile" :auto="true" class="upload-btn"></file-upload>
									<img style="width: 100px;height: 100px;" :src="user.qrcodeurl" class="upload_img" alt="">
									<div style="width: 100px;display: inline-block;vertical-align: bottom;margin-left: 40px;">
										<a class="avatar-btn avatar-update-btn" href="javascript:" @click="clickQRInput">上传</a>
									</div>
								</div>
							</div>
							<a @click="saveWxInfo" class="avatar-btn avatar-save-btn" style="background-color: #53c843;margin-top: 10px;" href="javascript:">保存</a>
						</div>
						<span slot="header">{{user.pubname ? user.pubname : '无公众号名称'}}</span>
					</panel>
				</div>
			</div>
		</div>
	</div>

	<snackbar :show.sync="is_error" :message="err_msg" action-text="知道了"></snackbar>
</template>

<script>
	import snackbar from '../components/web-base/snackbar'
	import api from '../api/index.js'
	import tools from '../utils/index.js'
	export default {
		//user-information里的top需要换成导航栏高度(需要定义公共变量)
		components: {
			'file-upload': require('../js/vue.file-upload.js'),
			snackbar,
			// headerBar: require('../components/web/header-bar.vue')
			panel: require('../components/web/user-panel.vue')
		},
		watch: {
			is_error(v) {
				console.log(v);
			}
		},
		data() {
			return {
				is_error: false,
				err_msg: "",
				showPanel: {
					email: false,
					tel: false,
					pass: false,
					wxInfo: false,
				},
				header: "我是一个",
				pass: {
					oldpass: '',
					newpass: '',
					qpass: '',
				},
				tal: '',
				uploadImg: '',
				email: '',
				pubname: "", 
				user: {
					balance: 0, //余额
					email: "", //邮箱
					nick: "", //昵称
					realname: "", //真实名称
					tal: "", //电话
					acct: "", //账号
					pubname: "", //公众号名称
					qrcodeurl: "", //公众号二维码
					logo_url: '',
					id: 0, //用户id
					level: "",
					appid: "", // 公众号appid
					appsecret: "", // 公众号appsecret
					wxfile: "" // 公众号txt文件
				},
			}
		},
		ready() {
			this.$root.fun = [];
			this.$dispatch('reFresh', this.getUserInfo);
			this.getUserInfo();
		},
		events: {
			onFileUpload(file, res) {
				if(res.resCode == 0) {
					if(file._id == "userImg") {
						this.uploadImg = res.repBody.fileUrl;
					} else if(file._id == "qrcodeImg") {
						this.$set("user.qrcodeurl", res.repBody.fileUrl);
					} else if(file._id == "wxFile") {
						let filename =  res.repBody.fileUrl.substring(res.repBody.fileUrl.lastIndexOf('/')+1);
						this.$set("user.wxfile", filename);
						tools.addcookie('wxfile', filename);
					}
				}
			},
		},
		methods: {
			clickInput() {
				this.$broadcast("click", "userImg");
			},
			clickQRInput() {
				this.$broadcast("click", "qrcodeImg");
			},
			clickWxFile() {
				this.$broadcast("click", "wxFile");
			},
			saveUserLogo() {
				api.saveUserLogo(this, { 'logo_url': this.uploadImg }, (back) => {
					if(back.resCode == 0)
					this.$set("user.logo_url", this.uploadImg);
					this.err_msg = back.resMsg;
					this.is_error = true;
				});
			},
			getUserInfo() {
				var that = this;
				api.userInfo(this, {}, (back) => {
					if(back.resCode == 0) {
						that.user = back.repBody[0];
						that.uploadImg = !!that.user.logo_url ? that.user.logo_url : "";
						if(!!that.user.pubname) {
							that.$set("pubname", that.user.pubname);
						}
						if(!!tools.getcookie("wxfile")) {
							that.$set("user.wxfile", tools.getcookie("wxfile"));
						}	
					} else {
						this.err_msg = back.resMsg;
						this.is_error = true;
					}
				});
			},
			saveTel() {
				var reg = /^1[3|4|5|7|8]\d{9}$/;
				if(!reg.test(this.tal)) {
					this.is_error = true;
					this.err_msg = "请输入正确的手机号";
					return;
				}
				var that = this;
				api.updateUserInfo(this, { "oper": '1', "modacct": that.user.acct, "tal": that.tal }, (back) => {
					if(back.resCode != 0)
						that.err_msg = back.resMsg;
					else {
						that.err_msg = "修改成功";
						that.user.tal = that.tal;
						that.showPanel.tel = false;
					}
					this.is_error = true;
				});
			},
			saveEmail() {
				var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
				if(!reg.test(this.email)) {
					this.is_error = true;
					this.err_msg = "请输入正确的邮箱";
					return;
				}
				var that = this;
				api.updateUserInfo(this, { "oper": '1', "modacct": that.user.acct, "email": that.email }, (back) => {
					if(back.resCode != 0)
						that.err_msg = back.resMsg;
					else {
						that.err_msg = "修改成功";
						that.user.email = that.email;
						that.showPanel.email = false;
					}
					that.is_error = true;
				});
			},
			savePass() {
				var reg = /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,17}/;
				if(!reg.test(this.pass.oldpass) || !reg.test(this.pass.newpass) || !reg.test(this.pass.qpass)) {
					this.is_error = true;
					this.err_msg = "密码长度必须在6位数到17位数间";
					return;
				}
				if(this.pass.newpass !== this.pass.qpass) {
					this.is_error = true;
					this.err_msg = "新密码跟确认密码不一致";
					return;
				}
				var that = this;
				api.updateUserPwd(this, { "oldpwd": that.pass.oldpass, "newpwd": that.pass.newpass }, (back) => {
					if(back.resCode != 0)
						this.err_msg = back.resMsg;
					else {
						that.pass.oldpass = "";
						that.pass.newpass = "";
						that.pass.qpass = "";
						that.showPanel.pass = false;
						this.err_msg = "修改成功";
					}
					this.is_error = true;
				});
			},
			saveWxInfo() {
				if(this.pubname.length == 0 || this.pubname.replace(/\s/g, '').length == 0) {
					this.is_error = true;
					this.err_msg = "请填写公众号名称";
					return;
				}

				if(this.user.appid.length == 0 || this.user.appid.replace(/\s/g, '') == 0) {
					this.is_error = true;
					this.err_msg = "请填写AppId";
					return;
				}

				if(this.user.appsecret.length == 0 || this.user.appsecret.replace(/\s/g, '') == 0) {
					this.is_error = true;
					this.err_msg = "请填写AppSecret";
					return;
				}

				var that = this;
				api.updateUserAppid(this, { "appid": that.user.appid, "appsecret": that.user.appsecret, "qrcodeurl": that.user.qrcodeurl, "pubname": that.pubname }, (back) => {
					if (back.resCode != 0) {
						that.err_msg = back.resMsg;
					}
					else {
						that.err_msg = "修改成功";
						that.user.pubname = that.pubname;
						that.showPanel.wxInfo = false;
					}
					that.is_error = true;
				});
			}
		},
	}
</script>

<style src="../css/bootstrap.css"></style>
<style lang="scss">
	@import '../css/bootstrap/_variables.scss';
	.container {
		position: relative;
	}
	
	.info {
		width: 100%;
		p,
		.txt-info,
		.qrcode-container {
			label {
				width: 80px;
				font-size: 14px;
			}
			input,
			.qrcode {
				width: 300px;
				display: inline-block!important;
			}
		}
		.qrcode-container {
			margin-bottom: 10px;
			label {
				float: left;
			}
			.qrcode {
				margin-left: 3px;
				.avatar-btn {
					margin-left: 66px;
				}
			}
		}
		.avatar-btn {
			margin-left: 83px
		}
		.upload_img {
			width: 120px;
			height: 120px;
			border-radius: 50%;
		}
		.txt-info {
			position: relative;
			margin-bottom: 7px;

			label {
				float: left;
				margin-top: 8px;
				width: 84px;
			}

			.form-control {
				position: relative;
				display: inline-block!important;
				width: 300px;
				padding-right: 35px;

				&::after {
					cursor: pointer;
					content: ' ';
					position: absolute;
					right: 0;
					top: 4px;
					display: block;
					width: 30px;
					height: 24px;
					text-indent: -9999rem;
					background: url(../images/file.png) no-repeat;
					background-size: contain;
					pointer-events: none;
				}
			}
		}
	}
	
	.user-container {
		.left_img {
			top: 268px;
			left: -195px;
			position: absolute;
		}
		.left_img_1 {
			top: 318px;
			margin-left: -13px;
			position: absolute;
			z-index: 2;
		}
		.right_img {
			top: 268px;
			right: -140px;
			position: absolute;
		}
		.right_img_1 {
			position: absolute;
			right: 28px;
			top: 381px;
			z-index: 2;
		}
		background: url("../assets/user_bg.jpg");
		width: 100%;
		height: 1120px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-color: #51cfe8;
	}
	
	.user_s_bg {
		width: 100%;
		margin-top: 276px;
	}
	
	.user_s_bg_1 {
		width: 100%;
		position: absolute;
		top: 414px;
		z-index: 2;
	}
	
	.user_s_bg_2 {
		width: 100%;
		position: absolute;
		top: 456px;
		z-index: 2;
	}
	
	.user-information {
		margin: 0 8.666%;
		z-index: 1;
		top: $header-bar-height;
		height: 1000px;
		background-color: #fff;
		padding-left: 100px;
		padding-right: 100px;
		box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
		.user-header {
			color: $brand-primary;
			font-size: 20px;
			text-align: center;
			margin-top: 34px;
		}
	}
	
	.avatar-panel {
		h4 {
			line-height: 60px;
			.user-arrow {
				margin-top: 26px;
			}
		}
	}
	
	.avatar-btn {
		width: 92px;
		height: 30px;
		color: #fff;
		background-color: $brand-primary;
		display: inline-block;
		text-align: center;
		line-height: 30px;
		border-radius: 4px;
	}
</style>