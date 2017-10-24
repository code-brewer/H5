<template>
	<modal :show.sync="loginShow" :bg="false">
		<div class="components-login">
			<div class="box" style="background: #111902; border: 5px solid #98cf2f;">
				<p class="title">身份验证</p>
				<div class="login-panel">
					<div class="phone">
						<span>手机号码：</span>
						<input type="text" v-model="login.mobile"  placeholder="请输入联通手机号码" maxlength="11" style="width: 384px;"/>
					</div>
					<div class="code">
						<span> &nbsp;&nbsp;验证码：</span>
						<input type="text" v-model="login.code" maxlength="6"  placeholder="请输入短信验证码" style="width: 230px;"/>
						<a  @click="getCode()" :class="{graycode:codeing}" >
							{{timeflag}}
						</a>
					</div>
				</div>
				<a class="confirm-btn" @click="loginFun()">确<span style="font-family: none;">&nbsp;&nbsp;</span>认</a>
				<img class="close-img" :src="$root.activityBasePath+'/images/sp-close.png'" @click="loginShow = false">
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from './../components/Modal.vue'
	import api from './../utils/serverapi.js'
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
				var reg_code = /^\d{6}$/;
				if(code != undefined && !reg_code.test(code)) {
					return "请输入正确的验证码!";
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
					api.sendLoginCode(this, {
						'mobile':that.login.mobile
					}, (back) => {
						if(back.resCode!='0'){
							that.$dispatch('handle_server_error', back);
						}
						else{
							that.$dispatch('loading', {text: '验证码已发送，请留意手机短信', show: true, duration: 1000});
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
					that.$dispatch('loading', {text: checkret , show: true, duration: 1000}); 
				}
			},loginFun(){
				var that=this,
				checkMsg = this.checkData(that.login.mobile,that.login.code);
				if(checkMsg === true) {
					api.login(this, {
						'mobile':that.login.mobile,
						'code':that.login.code,
						'types':'拼歌单达人',
						'source':source
					}, (back) => {
						if(back.resCode!='0'){
							that.$dispatch('handle_server_error', back);
						}
						else{
							that.$dispatch('loginok', back);
							that.loginShow=false;
							that.$dispatch('loading', {text: '验证成功！', show: true, duration: 2000});
							that.login.code = '';
						}
					});
				}else that.$dispatch('loading', {text: checkMsg , show: true, duration: 1000}); 
			}
		}
	}
</script>

<style lang="scss">
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
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #fff;
			.title{
				font-size: 38.84px;
				line-height: 46px;
				color: #fff;
				text-align: center;
				text-shadow: 0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000;
			}
			.login-panel{
				margin-top: 60px;
				.code{
					position: relative;
					text-align: left;
					margin-top: 35px;
					a{
						width: 146px;
						height: 60px;
						text-align: center;
						display: inline-block;
						line-height: 60px;
						color: white;
						font-size: 24px;
						background-color: #98ce2e;
						border-radius: 6px;
						vertical-align: middle;
						
					}
					input{
						width: 100px;
					}
				}
				input{
					outline: none;
					border: 0;
					background-size: 100% 100%!important;
					background-repeat: no-repeat!important;
					font-size: 24px;
					height: 60px;
					text-indent: 20px;
				}
			}
			.confirm-btn{
				display: block;
				width: 220px;
				height: 75px;
				margin: 35px auto;
				line-height: 75px;
				font-size: 30px;
				text-align: center;
				color: #fff;
				background-color: #98ce2e;
				border-radius: 25px;
				
			}
			.close-img{
				position: absolute;
				right: 20px;
				top: 20px;
				max-width: 56px;
				max-height: 50px;
			}
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 160px 30px;
	}
</style>