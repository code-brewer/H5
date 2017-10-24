<template>
	<modal :show.sync="loginShow" :bg="false">
		<div class="components-login">
			<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
			<div class="box" style="background: #fff; border-radius: 20px; border: 10px solid #fbb03b;">
				<p class="title">身份验证</p>
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
				<a class="confirm-btn" style="background: url('./m/images/login-btn.png') center center no-repeat;" @click="loginFun()"></a>
				<img class="close-img" :src="'m/images/close.png'" @click="loginShow = false">
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
		.right{
			position: absolute;
		    bottom: -35px;
		    right: -30px;
		    z-index: 10;

		}
		.left{
		    position: absolute;
		    left: -30px;
		    bottom: -40px;
		    z-index: 10;
		}
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #fbb03b;
			.title{
				font-size: 60px;
				line-height: 80px;
				color: #fbb03b;
				text-align: center;
				font-weight: 600;
			}
			.login-panel{
				margin-top: 60px;
				font-weight: 600;
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
						font-size: 28px;
						background-color: #e80000;
						border-radius: 6px;
						vertical-align: top;
						font-weight: 600;
						
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
    				border: 3px solid #fbb03b;
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
			
				
			}
			.close-img{
			    position: absolute;
			    right: -40px;
			    top: -35px;
			    max-width: 79px;
			    max-height: 78px;
			}
		}
	}
	// .modal.modal-transition .modal-dialog{
	// 	margin: 160px 60px;
	// }
</style>