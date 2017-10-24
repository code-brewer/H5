<template>
	<modal :show.sync="loginShow" :bg="false">
		<div class="components-login">
			<div class="box" style="background: url('./p/images/modal-bg.png') center center no-repeat;  background-size: 100% 100%;">
				<p class="title">沃音乐登录</p>
				<div class="login-panel">
					<div class="phone">
						<span>手机号码</span>
						<input type="text" v-model="login.mobile"  placeholder="请输入联通手机号码" maxlength="11"/>
					</div>
					<div class="code">
						<span>&nbsp;验证码</span>
						<input type="text" v-model="login.code" maxlength="6"  placeholder="短信验证码" style="width: 180px;"/>
						<a  @click="getCode()" :class="{graycode:codeing}" >
							{{timeflag}}
						</a>
					</div>
				</div>
				<a class="confirm-btn" style="background: url('./p/images/btn-bg1.png') center center no-repeat;" @click="loginFun()">登录</a>
				<img class="close-img" :src="'p/images/close.png'" @click="loginShow = false">
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from './../../../src/components/Modal.vue'
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
			},
			loginFun(){
				var that=this,
				checkMsg = this.checkData(that.login.mobile,that.login.code);
				if(checkMsg === true) {
					this.$dispatch('addOperLog', 'button','login');
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
							that.$root.vipInfo.mobile = that.login.mobile;
							
							sessionStorage.setItem('LoginMobile',that.login.mobile);

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

<style lang="sass">
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
			padding: 150px 70px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			width: 640px;
		    height: 850px;
		    text-align: center;
		    color: #333;
			.title{
				padding-top: 100px;
				font-size: 40px;
				line-height: 46px;
				color: #ec3131;
				text-align: center;
			}
			.login-panel{
				margin-top: 60px;
				text-align: left;
				> div {
					position: relative;
					padding-left: 160px;
				}
				.code{
					position: relative;
					margin-top: 35px;
					a{
						width: 152px;
						height: 80px;
						text-align: center;
						display: inline-block;
						line-height: 80px;
						color: white;
						font-size: 28px;
						background-color: #ffae00;
						// border-radius: 6px;
						vertical-align: top;
						background-color: rgba(236, 49, 49, .6);
						
					}
				}
				span {
					position: absolute;
					top: 0;
					left: 0;
					text-align: right;
					font-size: 38px;
					line-height: 80px;
					color: #ec3131;
				}
				input{
					width: 100%;
					outline: none;
					border: 1px solid #d6d6d6;
					background-size: 100% 100%!important;
					background-repeat: no-repeat!important;
					font-size: 28px;
					height: 80px;
					text-indent: 20px;
					color: #333;
				    background-color: #fdfbf8;
				}
			}
			.confirm-btn{
				display: block;
				width: 220px;
				height: 75px;
				margin: 140px auto 0 auto;
				line-height: 75px;
				font-size: 40px;
				text-align: center;
				color: #fff;
				
			}
			.close-img{
				position: absolute;
				right: 20px;
				top: 20px;
			    max-width: 77px;
    			max-height: 77px;
			}
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 160px auto;
	}
</style>