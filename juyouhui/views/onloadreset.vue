<template>
	<div class="phoneLogin">
		<div class="logo">
		</div>
		<div class="inputText">
			<input type="text" name="" id="pw" placeholder="请输入密码" v-el:oldpw @blur="blurOldPw" v-model="oldPw" debounce="500" @focus="focuspw">
			<label for="pw">旧密码</label>
			<div class="x" v-show = "oldPw.trim()" @click="oldPw = ''" style="right: 100px">
				<img src="../images/x.png">
			</div>
			<div class="eye" @click="clickEye1"><img :src="isOldWatch?'./images/form/watch.png':'./images/form/nowatch.png'" ></div>
			<p class="tips" v-if="oldPwTips">{{oldPwTips}}</p>
		</div>
		<div class="inputText">
			<input type="text" name="" id="pw" placeholder="请输入密码" v-el:pw @blur="blurPw" v-model="pw" debounce="500" @focus="focuspw">
			<label for="pw">新密码</label>
			<div class="x" v-show = "pw.trim()" @click="pw = ''" style="right: 100px">
				<img src="../images/x.png">
			</div>
			<div class="eye" @click="clickEye"><img :src="isWatch?'./images/form/watch.png':'./images/form/nowatch.png'" ></div>
			<p class="tips" v-if="pwTips">{{pwTips}}</p>
		</div>
		<!-- <div class="inputText">
			<input type="text" name="" id="verify" placeholder="请输入验证码" v-model="verify" debounce="500">
			<label for="verify">验证码</label>
			<div class="gain" :class="{ active: checkTel(Tel)&&!isGainVerify}" @click="gainVerify" v-el="time">{{isGainVerify? times+'s': '获取验证码'}}</div>
			<p class="tips" v-if="verifyTips">{{verifyTips}}</p>
		</div> -->
		<div class="inputText clearfix">
			<button class="register" :class="{ active:checkPw(oldPw)&&checkPw(pw) }" @click="clickRegister">重设密码</button>
		</div>
	</div>
</template>
<script type="text/javascript">
import api from '../api/index.js'
import commonMethods from '../utils/commonMethods.js'
	export default {
		created () {
			this.$dispatch('closeShow')
			var _this = this
			setTimeout(function(){
				_this.$el.style.height = document.body.clientHeight+'px'
			},100)

		},
		activated() {
			this.$dispatch('closeShow')
		},
		// activated () {
		// 	this.$els.pw.type = 'password'
		// },
		data  () {
			return {
				oldPw : '',
				oldPwTips : '',
				pw : '',
				pwTips : '',
				// verify : '',
				// verifyTips : '',
				// isGainVerify:false,
				isWatch : false,
				isOldWatch : false,
				barTitle : '',
				pwIsOk : false,
				oldPwISOk :false,
				times : 30,
				touchEye: false,//用于清除浏览器自动填充账号密码的标记
			}
		},
		methods : {
			checkTel:function(val) {
				var flag = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(val);
				return flag;
			},
			checkPw  (val){
				var flag = /^[\S]{6,16}$/.test(val);
				return flag;
			},
			clickEye () {
				this.isWatch ? this.isWatch = false: this.isWatch = true ;
				this.isWatch ? this.$els.pw.type = 'text': this.$els.pw.type = 'password' ;
				this.touchEye? '' :	this.touchEye = true;
			},
			clickEye1 () {
				this.isOldWatch ? this.isOldWatch = false: this.isOldWatch = true ;
				this.isOldWatch ? this.$els.oldpw.type = 'text': this.$els.oldpw.type = 'password' ;
				this.touchEye? '' :	this.touchEye = true;
			},
			blurPw () {
				this.checkPw(this.pw) ? this.pwTips = '' : this.pwTips = '*仅支持6~16位数字/字母/符号，区分大小写'
				// this.pwTips ? this.pwIsOk = false : this.pwIsOk = true;
			},
			blurOldPw () {
				this.checkPw(this.oldPw) ? this.oldPwTips = '' : this.oldPwTips = '*仅支持6~16位数字/字母/符号，区分大小写'
				// this.oldPwTips ? this.oldPwISOk = false : this.oldPwISOk = true;
			},
			focuspw () {
				this.touchEye? '' :	this.$els.pw.type = 'password';
				this.touchEye? '' :	this.$els.oldpw.type = 'password';
			},
			clickRegister () {
				if (!(this.checkPw(this.oldPw)&&this.checkPw(this.pw))) return
				api.update(this,{
					"phone": commonMethods.getNumber1(), //必填
					"password":this.oldPw, //必填，旧密码,
        			"npassword":this.pw //必填，新密码
				},res=>{
                    if(res.repBody === '密码错误') {
                    	this.oldPwTips = '密码错误'
                    } else if (res.repBody === '修改密码成功') {
                    	commonMethods.delCookie("ID")
                    	this.$router.go({path : '/phoneLogin/'})
                    }
            	})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.phoneLogin {
		height: 100%;
		background-color: #fff;
	}
	.logo {
		height: 400px;
		background: url(../images/center/juyouhui.png) no-repeat center;
		background-size: 70%;
		margin-bottom: 20px;

	}
	
	.inputText {
		max-width: 640px;
		margin: 0 auto;
		position: relative;
		#phone {
		width: 563px;
		height: 70px;
		font-size: 25px;
		display: block;
		margin:  0 auto;
		box-sizing: border-box;
		border-bottom: 1px solid #929292;
		padding-left: 110px;
		border-radius: 5px;
		background-color: #fff;
		outline: none
		}
		.eye,.x,.gain {
			position: absolute;
			right: 40px;
			width: 60px;
			top: 50%;
			height: 100%;
			transform: translateY(-50%);
			img {
				position: absolute;
				top: 50%;
				right: 20px;
				transform: translateY(-50%);
			}
		}
		.gain {
			width: 150px;
			background-color: #bfbfbf;
			color: #fff;
			font-size: 25px;
			line-height: 68px;
			text-align: center;
		}
		.gain.active {
			background-color: #ec5252;
		}
		#pw,#verify {
			width: 563px;
			height: 70px;
			font-size: 25px;
			display: block;
			margin:  0 auto;
			box-sizing: border-box;
			border-bottom: 1px solid #929292;
			padding-left: 110px;
			margin-top: 48px;
			border-radius: 5px;
			background-color: #fff;
			outline: none
		}
		label {
			font-size: 25px;
			color: #000;
			position: absolute;
			top: 20px;
			left: 55px;
		}
		input {
			letter-spacing: 0.1em;
		}
		.tips {
			position: absolute;
			left: 45px;
			color: red;
			margin-top: 10px;
			font-size: 24px;
		}
		.register {
			height: 70px;
			width: 563px;
			font-size: 25px;
			line-height: 70px;
			color: #fff;
			display: block;
			margin:  0 auto;
			margin-top: 80px;
			background-color: #bfbfbf;
			letter-spacing: 0.5em;
		}
		.register.active {
			background-color: #ec5252;
		} 
		
	}
	#login {
		background-color: #ec5252;
		// width: 480px;
		width: 40%;
    	// float: left;
		height: 70px;
		font-size: 25px;
		color: #fff;
		border-radius: 5px;
		text-shadow: 1px 1px 1px #333;
		margin: 100px 45px 10px 0;
    	float: right;
    	line-height: 70px;

	}
	
	#newUser {
		width: 40%;
		height: 70px;
		box-sizing: border-box;
		border: 2px solid #ccc;
		font-size: 25px;
		border-radius: 5px;
		margin: 100px 20px 10px 45px;
		border-color: #ec5252;
		background-color: #fff;
		color: #ec5252;
		line-height: 70px;
	}
	button {
		letter-spacing: 0.1em;
	}
	input:-webkit-autofill{-webkit-box-shadow: 0 0 0px 1000px white inset;}
</style>