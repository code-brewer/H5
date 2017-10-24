<template>
	<modal :show.sync="loginShow" :bg="false">
		<div class="components-login">
			<div class="box" style="background: url('./r/images/modal-bg.jpg') 100% 100% no-repeat; background-size: 100% 100%;">
				<p class="title">身份验证</p>
				<div class="login-panel">
					<div class="phone">
						<span>手机号码：</span>
						<input type="text" v-model="login.mobile"  placeholder="请输入联通手机号" maxlength="11" style="width: 320px;"/>
					</div>
					<div class="code">
						<span>&nbsp;验证码：</span>
						<input type="text" v-model="login.code" maxlength="6"  placeholder="" style="width: 160px;"/>
						<a  @click="getCode()" :class="{graycode:codeing}" >
							{{timeflag}}
						</a>
					</div>
				</div>
				<a class="confirm-btn" style="background: url('./r/images/btn-bg.png') center center no-repeat; margin: 20px auto; padding-bottom: 10px;" @click="loginFun()">登 录</a>
				<img class="close-img" :src="'r/images/close.png'" @click="loginClose">
				
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from './../modal/Modal.vue'
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
				},
				loginCloseListen:null,
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
				that.addOperLog('button',that.$root.whereLogin);
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
							localStorage.setItem('LoginMobile',that.login.mobile);
							that.$dispatch('loginok', back);
							that.loginShow=false;
							that.$dispatch('loading', {text: '验证成功！', show: true, duration: 2000});
							that.login.code = '';
						}
					});
				}else that.$dispatch('loading', {text: checkMsg , show: true, duration: 1000}); 
			},
			addOperLog(type,btnName) {
				api.addOperLog(this, {
					'aid':aid,
					'type':type,
					'button_name':btnName,
					'source':source
				}, (back) => {})
			},
			loginClose(){
				this.loginShow = false;
				if(this.loginCloseListen){
 					this.loginCloseListen();
 					this.loginCloseListen = null;
 				}

			},
			//其他地方调此方法
			setLoginCloseListen(listener){
				this.loginCloseListen = listener;
			},
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
		  	padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			
			.title{
				font-size: 55px;
				line-height: 120px;
				text-align: center;
				font-weight: 600;
			}
			.login-panel{
			    margin-top: 20px;
    			text-align: left;
			    margin-left: 8%;
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
						background-color: #2792dd;
						border-radius: 6px;
						vertical-align: top;
						
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
				    border-radius: 30px;
				    background: #fff5f5;
					// border: 1px solid #ffea00;
				}
			}
			
			
			
		}
		.right{
			    position: absolute;
			    right: -20px;
			    top: -112px;
		}
		.left{
		    position: absolute;
		    left: -20px;
		    top: -112px;
		}
	}
	
</style>