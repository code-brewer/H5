<template>
	<modal :show.sync="show" size="md">
			<div class="components-add-user">
				<p class="add-user-title">添加用户
					<i class="close-btn" @click="closeDia()">+</i>
				</p>
				<form class="add-user-form-data" @submit="addUser()">
					<table>
						<tr>
							<td>账号:</td>
							<td>
								<input v-model="user.username" type="text" placeholder="请输入账号进行搜索" debounce='500'/>
							</td>
							<td class="errorMsg">{{errorMsg.usernameText}}</td>
						</tr>
						<tr>
							<td>角色:</td>
							<td>
								<label>
									<input v-model="user.role" type="checkbox" />
									普通用户
								</label>
							</td>
							<td class="errorMsg">{{errorMsg.roleText}}</td>
						</tr>
						<tr>
							<td>手机号码:</td>
							<td>
								<input v-model="user.phone" type="number" @blur="checkData('phone')"/>
							</td>
							<td class="errorMsg">{{errorMsg.phoneText}}</td>
						</tr>
						<tr>
							<td>邮箱:</td>
							<td>
								<input v-model="user.email" type="email" @blur="checkData('email')"/>
							</td>
							<td class="errorMsg">{{errorMsg.emailText}}</td>
						</tr>
						<tr>
							<td style="padding-top: 10px;"></td>
							<td style="padding-top: 10px;">
								<input type="submit" value="保存" />
							</td>
							<td style="padding-top: 10px;"></td>
						</tr>
					</table>
				</form>
		</div>
	</modal>
</template>

<script>
	import modal from '../bootstrap/Modal'
	import buttonRipple from '../web-base/button-ripple'

	export default{
		components: {
			modal,
			buttonRipple
		},

		props: {
			show: {
				type: Boolean,
				default: false
			}
		},

		data(){
			return {
				user: {
					username: '',
					role: '',
					phone: '',
					email: ''
				},
				errorMsg: {
					usernameText: '',
					roleText: '',
					phoneText: '',
					emailText: ''
				}
			}
		},

		watch: {
			'user.username'(val){
				this.checkUsername(val);
			}
		},

		methods: {
			//添加用户
			addUser(){
				if(this.user.username === ""){
					this.errorMsg.usernameText = "用户名不能为空";
					return;
				}

				if(this.user.role == ""){

					// return;
				}

				if(this.user.phone == ""){
					this.errorMsg.phoneText = "手机号不能为空";
					return;
				}

				if(this.user.email == ""){
					this.errorMsg.emailText = "邮箱不能为空";
					return;
				}

				if(this.errorMsg.usernameText != "" || 
					this.errorMsg.roleText != "" || 
					this.errorMsg.phoneText != "" || 
					this.errorMsg.emailText != ""){
					return;
				}
				
				//调用接口,添加用户
				
			},

			//检查用户名是否重复
			checkUsername(username){

			},

			//检查输入数据
			checkData(checkName){
				var reg;
				if('phone' == checkName){
					reg = /^[1-9]{1}\d{10}$/;
					if(reg.test(this.user.phone)){
						console.log("ok")
						this.errorMsg.phoneText = "";
					}else{
						this.errorMsg.phoneText = "请输入正确的手机号码";
					}

				}else if('email' == checkName){
					reg = /^\w+@\w+$/;
					if(reg.test(this.user.checkName)){
						this.errorMsg.emailText = "";
					}else{
						this.errorMsg.emailText = "请输入正确的邮箱地址";
					}

				}
			},

			//关闭对话框
			closeDia(){
				this.show = false;

				this.user = {
					username: '',
					role: '',
					phone: '',
					email: ''
				};

				this.errorMsg = {
					usernameText: '',
					roleText: '',
					phoneText: '',
					emailText: ''
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';

	.components-add-user{
		width: 100%;
		height: 418px;
		
		.add-user-title{
			position: relative;
			width: 100%;
			height: 40px;
			line-height: 40px;
			color: #fff;
			background-color: $brand-primary;
			text-align: center;

			.close-btn{
				position: absolute;
				right: 16px;
				top: 50%;
				font-size: 40px;
				font-style: normal;
				line-height: 0;
				color: #fff;
				transform: rotate(-45deg)  translate(0, -50%);
				-ms-transform: rotate(-45deg)  translate(0, -50%);
				-moz-transform: rotate(-45deg)  translate(0, -50%);
				-webkit-transform: rotate(-45deg) translate(0, -50%);
				-o-transform: rotate(-45deg)  translate(0, -50%);
				cursor: pointer;
			}
		}

		.add-user-form-data{
			width: 100%;
			margin-top: 40px;

			>table{
				// margin: 0 auto;
				margin-left: 120px;

				tr{

					>td{
						border: 10px solid #fff;
						height: 30px;

						&:first-child{
							padding-right: 10px;
							text-align: right;
						}

						>input[type='text'], 
						input[type='number'], 
						input[type='email']{
							width: 306px;
							height: 30px;
							padding-left: 10px;
							background-color: #f3f3f3;
							border-radius: 3px;
							border: 1px solid #d6d6d6;
						}

						input[type='checkbox']{
							vertical-align: middle;
						}

						input[type='submit']{
							width: 92px;
							height: 32px;
							line-height: 32px;
							text-align: center;
							color: #fff;
							background-color: #53c843;
							border: none;
							border-radius: 4px;
						}
						
						&.errorMsg{
							color: #ffb848;
						}
					}
				}
			}
		}
	}
</style>