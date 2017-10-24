<template>
	
	<modal :show.sync="showAddress" :bg="false" :backdrop = "backdrop">
		<div class="components-receive-address">
			<div class="box">
				<p class="title">领奖号码</p>
				<ul style="padding-top: 30px;">
					<li class="input-item">
						<span class="input-name" >手机号</span> : <input class="input-text" type="text"  v-model="prizeData.mobile" @blur="checkInput('mobile')" />
					</li>
					<li class="input-item" style="margin-bottom: 60px;">
						<span class="input-name" >验证码</span> : <div class="codeBox"> <input class="input-text" type="text"  v-model="prizeData.validateCode" @blur="checkInput('validateCode')" style="width: 140px" /> <img :src="zcodeurl" @click="zcodeurl=basePath+'randomValidate/obtainValidateCode?'+Math.random()"></div>
					</li>
				</ul>
				<p v-show="errMsg != ''" style="color: red; width: 100%; text-align: center;">{{errMsg}}</p>
				<a class="confirm-btn" style="background: url(images/btnbg.png) center center; background-size: 100% 100%;" @click="userLogin()">确定</a>
				<!-- <a class="confirm-btn" style="background: url(images/t-sure-btn.png) center center; background-size: 100% 100%;" @click="getPrize()"></a> -->
				<!-- <img class="close-img" :src="'images/t-close.png'" @click="showAddress = false"> -->
			</div>
		</div>
	</modal>

</template>

<script>
	import modal from './src/Modal.vue'
	import sapi from './utils/serverapi.js'

	export default{
		components: {
			modal
		},

		props: {
			showAddress: {
				type: Boolean,
				default: false
			},
			showMyPrize: {
				type: Boolean,
				default: false
			},
			backdrop : {
				type : Boolean,
				default : true,
			}
		},
		data(){
			return {
				errMsg: '',
				basePath : basePath,
				zcodeurl : basePath+'randomValidate/obtainValidateCode?'+Math.random(),//验证码

				prizeData: {
					// gid: "",  //奖品id,必填--此值需要由调用组件传来
					mobile: "",   //收货手机号码,必填
					validateCode: ""   //验证码
				}
			}
		},
		ready () {
		
		},
		watch: {
			gid(val){
				this.prizeData.gid = val;
			},
			showAddress (val) {
				console.log(val)
				if (val) {
					this.errMsg = '';
					this.prizeData.mobile = '';
					this.prizeData.validateCode = '';
				}
				// if (this.$router._currentRoute.path ==="/marquee"&&!val) { //如果是抽奖页则调用
				// 	this.$parent.saveUserH5Info()
				// 	this.$parent.getActUserTimes()
				// }
			},
		},

		methods: {

			checkInput(_name){

				if("mobile" == _name && !(/^1\d{10}$/.test(this.prizeData.mobile))){
					this.errMsg = '请输入正确的手机号码';
					return false;
				}
				if("validateCode" == _name && !(/^[\S]{4,4}$/.test(this.prizeData.validateCode))){
					this.errMsg = '请输入正确4位数验证码';
					return false;
				}

				this.errMsg = '';
				return true;
			},


			userLogin () {
				var that = this;
				if (this.checkInput('mobile')&&this.checkInput('validateCode')) {
						sapi.login(this,{
						mobile : this.prizeData.mobile,
						code : this.prizeData.validateCode,
					},(back)=>{
						if (back.resCode==="0"&&back.resMsg==="success") {
							this.showAddress = false;
							sessionStorage.setItem("login",true);
							console.log(this.$router)
							if (this.$router._currentRoute.path==="/home") {
								console.log(this)
								this.showMyPrize = true;
								this.hasLogin = true;
							}
							that.$dispatch('loginok', {});


						}else {
							this.errMsg = back.resMsg;
						}
					})
				}
				
			},

			// //绑定奖品
			// getPrize() {
			// 	var that = this;

			// 	// if(this.prizeData.gid == ""){
			// 	// 	this.errMsg = '请按正常程序来';
			// 	// 	return;
			// 	// }

			// 	if(this.prizeData.addr == ""){
			// 		this.errMsg = '验证码';
			// 		return;
			// 	}

			// 	if(!(/^1\d{10}$/.test(this.prizeData.mobile))){
			// 		this.errMsg = '请输入正确的手机号码';
			// 		return;
			// 	}
			// 	this.showAddress = false;

			// 	// if(this.prizeData.addr == ""){
			// 	// 	this.errMsg = '请输入收货地址';
			// 	// 	return;
			// 	// }

			// 	// api.bindPrizeMobile(this, this.prizeData, (back)=>{
			// 	// 	if(back.resCode == "0"){
			// 	// 		that.showAddress = false;
			// 	// 		that.$dispatch('loading', {text: '领取成功', show: true, duration: 2000});
			// 	// 	}else{
			// 	// 		that.$dispatch('handle_server_error', back);
			// 	// 	}
			// 	// })
			// }
		}
	}
</script>

<style lang="sass">
	.codeBox {
		width: 300px;
		height: 50px;
		display: inline-block;
		box-sizing: border-box;
		position: relative;
		vertical-align: middle;
		input,img {
			position: absolute;
		}
		input {
			left: 0;
			top: 0;
		}
		img {
			height: 50px;
			top: 0;
		}

	}
	.components-receive-address{
		margin-top: 250px;
		width: 100%;
		
		.box{
			// width: 568px;
			// height: 511px;
			position:relative;
			width: 568px;
			height: 475px;
			padding: 40px;
			margin: 0 auto;
			text-align: center;
			box-sizing: border-box;
			background-color: #fed141;
			border: 10px solid #fff;
			border-radius: 40px;
			color: #000;
			.title{
				font-size: 38px;
				line-height: 38px;
				margin-bottom: 20px;
				color: #000;
				text-align: center;
				
			}
			
			.input-item{
				margin-bottom: 45px;
				font-size: 24px;

				.input-name{
					display: inline-block;
					vertical-align: middle;
				}

				.input-text{
					display: inline-block;
					width: 300px;
					height: 50px;
					padding-left: 10px;
					font-size: 28px;
					border: none;
					vertical-align: middle;
				    outline: none;
				    background-color: #fed141;
				    box-sizing: border-box;
				    border: 2px solid #fff;
				}
			}

			.confirm-btn{
				display: inline-block;
				// width: 252px;
				// height: 129px;
				// margin: 20px auto 0 auto;
				width: 210px;
				height: 82px;
				line-height: 74px;
				font-size: 36px;
				text-align: center;
				color: #fff;
				
			}

			.close-img{
				position: absolute;
				right: -20px;
				top: -35px;
				max-width: 70px;
				max-height: 70px;
			}
		}
	}
</style>