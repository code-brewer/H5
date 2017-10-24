<template>
	<modal :show.sync="loginShow" :bg="false">
		<div class="components-login">
			<div class="box login-box">
				<p class="title">请登录</p>
				<div class="login-panel">
					<div class="phone">
						<input type="text" v-model="login.mobile"  placeholder="请输入手机号码" maxlength="11" />
					</div>
					<div class="code">
						<input type="text" v-model="login.code" maxlength="6"  placeholder="请输入验证码" />
						<a  @click="getCode()" :class="{graycode:codeing}" >
							{{timeflag}}
						</a>
					</div>
				</div>
				<a class="close-img" @click="loginShow = false">取<span style="font-family: none;">&nbsp;&nbsp;</span>消</a>
				<a class="confirm-btn" @click="loginFun()">登<span style="font-family: none;">&nbsp;&nbsp;</span>录</a>
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from './../components/Modal.vue'
	import sapi from './../utils/serverapi.js'
	export default{
		components: {
			modal
		},
		data(){
			return{
				timeflag:'获取验证码',
				codeing:false,
				login:{
					mobile:'',
					code:''
				}
			}
		},
		props: {
			loginShow: {
				type: Boolean,
				default: false
			}
		},
		methods:{
			//校验信息
			checkData(mobile, code) {
				var reg = /^1\d{10}$/;
				if(!reg.test(mobile)) {
					return "请输入正确的手机号码!";
				}
				// var reg_code = /^\d{6}$/;
				// if(code != undefined && !reg_code.test(code)) {
				// 	return "请输入正确的验证码!";
				// }
				if(code != undefined && code.length==0) {
					return "请输入验证码!";
				}
				return true;
			},
			getCode(){
				var that=this;
				if(that.codeing){
					return;
				}
				var checkret = this.checkData(that.login.mobile,"111111");
				if(checkret === true){
					that.timeflag = '60s';
					that.codeing=true;
					sapi.msgCode(this, "?phone="+that.login.mobile, (back) => {
						if(back.code!='0'){
							that.$dispatch('handle_server_error', back);
						}
						else{
							that.$dispatch('loading', {text: '验证码已发送，请留意手机短信', show: true, duration: 2000});
						}
					});
					var	time = setInterval(function() {
						if(that.timeflag == '0s') {
							that.codeing=false;
							clearInterval(time);
							that.timeflag = '获取验证码';
						} else {
							var newTime =that.timeflag;
							newTime = newTime.substring(0, newTime.length - 1);
							that.timeflag = (parseInt(newTime) - 1) + 's';
						}
					}, 1000);
				}
				else{
					that.$dispatch('loading', {text: checkret , show: true, duration: 2000}); 
				}
			},
			loginFun(){
				var that=this,
				checkMsg = this.checkData(that.login.mobile,that.login.code);
				if(checkMsg === true) {
					sapi.login(this, {
						'phone':that.login.mobile,
						'code':that.login.code
					}, (back) => {
						if(back.code!='0'){
							that.$dispatch('handle_server_error', back);
						}
						else{
							// that.$dispatch('loginok', back);
							// that.loginShow=false;
							// that.$dispatch('loading', {text: '验证成功！', show: true, duration: 2000});
							// that.login.code = '';
							that.isGuideFun();
						}
					});
				}else that.$dispatch('loading', {text: checkMsg , show: true, duration: 2000}); 
			},
			isGuideFun(){
				var that=this;
				sapi.isGuide(this, "", (back) => {
					// if(back.code!='0'){
					// 	that.$dispatch('handle_server_error', back);
					// }
					// else{
						that.$dispatch('loginok', back);
						that.loginShow=false;
						// that.$dispatch('loading', {text: '验证成功！', show: true, duration: 2000});
						that.login.code = '';
					// }
				});
			}
		}
	}
</script>

<style lang="scss">
@import '../css/design2develop.scss';
	.graycode{
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);

		filter: grayscale(100%);

		filter: gray;
		font-size: 40px!important;	
		// line-height: 2!important;
	}
	.components-login{
		width: 100%;
		margin-top: 120px;
		.login-box{
			background: #fff;
			width: des2devrem(508px);
			height: des2devrem(440px);
		}
		.box{
			position:relative;
			padding: des2devrem(20px);
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #fff;
			.title{
				font-size: des2devrem(30px);
				line-height: des2devrem(80px);
				color: #ed6c00;
				text-align: center;
			}
			.login-panel{
				margin-top: 20px;
				margin-bottom: 40px;
				.phone{
					border: 1px solid #dedede;
					width: des2devrem(468px);
					height: des2devrem(90px);
					text-align: center;
					line-height: des2devrem(90px);
					padding: 0 des2devrem(20px);
				}
				.code{
					position: relative;
					text-align: left;
					border: 1px solid #dedede;
					width: des2devrem(468px);
					height: des2devrem(90px);
					text-align: center;
					line-height: des2devrem(90px);
					padding: 0 des2devrem(20px);
					a{
						width: des2devrem(136px);
						height: 60px;
						text-align: center;
						display: inline-block;
						line-height: 60px;
						color: #484848;
						font-size: des2devrem(24px);
						background-color: #fff;
						border-radius: 8px;
						vertical-align: middle;
						border: 1px solid #a6a3a3;
						
					}
					input{
						width: des2devrem(276px);
					}
				}
				input{
					width: des2devrem(428px);
					outline: none;
					background-color: #eeeeee;
					border: 0;
					font-size: 24px;
					height: des2devrem(60px);
					text-indent: 20px;
					border-radius: 8px;
				}
			}
			.confirm-btn{
				display: inline-block;
				width: des2devrem(220px);
				height: des2devrem(50px);
				line-height: des2devrem(50px);
				font-size: des2devrem(24px);
				text-align: center;
				color: #fff;
				background-color: #ff7f00;
				border-radius: 8px;
				border: 1px solid #c36618;
				
			}
			.close-img{
				display: inline-block;
				width: des2devrem(220px);
				height: des2devrem(50px);
				line-height: des2devrem(50px);
				font-size: des2devrem(24px);
				text-align: center;
				color: #484848;
				background-color: #fff;
				border-radius: 8px;
				border: 1px solid #a6a3a3;
			}
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 160px 30px;
	}
</style>