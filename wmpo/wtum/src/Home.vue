<template>
	<div class="app-view home-page"style="background: #fff;">
		<section class="section-home">
	         <div class="box">
				
				<div class="login-panel">
					<div class="phone">
						<span>手机号码：</span>
						<input type="text" v-model="login.mobile"  placeholder="请输入联通手机号码" maxlength="11" style="width: 384px;"/>
					</div>
					<div class="code">
						<span>&nbsp;验证码：</span>
						<input type="text" v-model="login.code" maxlength="6"  placeholder="请输入短信验证码" style="width: 230px;"/>
						<a  @click="getCode()" :class="{graycode:codeing}" >
							{{timeflag}}
						</a>
					</div>
				</div>
				<a class="confirm-btn" @click="loginFun()">登 录</a>
				
			</div>
	         
   		</section>
   </div>

</template>

<style lang="sass">
	
	.section-home{
	 height: 100%;
	 background-size: auto 100%;
     background-repeat: no-repeat;
     	.box{
			position:relative;
			padding:160px 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #337c69;
			.title{
				font-size: 55px;
				line-height: 60px;
				color: #e73433;
				text-align: center;
				font-weight: 600;
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
						background-color: #337c69;
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
				    // border-radius: 40px;
					border: 2px solid #337c69;
				}
			}
			.confirm-btn{
			    display: block;
			    width: 220px;
			    height: 75px;
			    margin: 35px auto;
			    line-height: 70px;
			    font-size: 35px;
			    text-align: center;
			    color: #fff;
			    font-weight: 600;
			    background: #337c69;
			
				
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
</style>
<script>
	import {router} from './index'
	import api from './utils/serverapi.js'
	export default {
		data(){
			return{
				timeflag:'获取验证码',
				codeing:false,
				login:{
					mobile:'',
					code:''
				},
				t:'',
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
					this.t = time;
				}
				else{
					that.$dispatch('loading', {text: checkret , show: true, duration: 1000}); 
				}
			},
			openFun(){
				var that = this;
				api.openMemberByFake(that,{},(back) => {
					that.$dispatch('loading', {text: '登录成功！', show: true, duration: 3000});
					that.timeflag = '获取验证码';
					that.login.code = '';
					that.login.mobile = '';
					that.codeing=false;
					clearInterval(this.t);
				})
				// that.$dispatch('loginok', back);
				
				
			},
			loginFun(){
				var that=this,
				checkMsg = this.checkData(that.login.mobile,that.login.code);
				if(checkMsg === true) {
					api.login(this, {
						'mobile':that.login.mobile,
						'code':that.login.code,
						'types':'拼歌单达人',
					}, (back) => {
						if(back.resCode!='0'){
							that.$dispatch('handle_server_error', back);
						}
						else{
							this.openFun();
						}
					});
				}else that.$dispatch('loading', {text: checkMsg , show: true, duration: 1000}); 
			},
			
		}
	}
</script>