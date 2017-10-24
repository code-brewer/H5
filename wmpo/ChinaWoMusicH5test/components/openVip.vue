<template>
	<modal :show.sync="openvipShow" :bg="false">
		<div class="components-openvip">
			<div class="box" style="background: url('./H5/images/modal-bg.png') center center no-repeat;  background-size: 100% 100%;">
				<img class="vip" :src="'H5/images/vip.png'">
				<p class="title">提示</p>
				<div class="login-panel">
					<p>开通沃音乐会员可免费订购炫铃，</p>
					<p>首月免费开通，是否开通？</p>
				</div>
				<a class="confirm-btn" style="background: url('./H5/images/tape.png') center center no-repeat;" @click="openVip()">开通会员</a>
				
				<img class="close-img" :src="'H5/images/close.png'" @click="openvipShow = false">
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
				tip:"",
				
				
				timeflag:'获取验证码',
				codeing:false,
				
			}
		},
		props: {
			openvipShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			
		},
		ready(){
			
		},
		methods:{
			//校验信息
			// checkData(mobile, code) {
			// 	var reg = /^1\d{10}$/;
			// 	if(!reg.test(mobile)) {
			// 		return "请输入正确的手机号码!";
			// 	}
			// 	var reg_code = /^\d{6}$/;
			// 	if(code != undefined && !reg_code.test(code)) {
			// 		return "请输入正确的验证码!";
			// 	}
			// 	return true;
			// },
			// getCode(){
			// 	var that=this;
			// 	if(that.codeing){
			// 		return;
			// 	}
			// 	var checkret = this.checkData(that.$root.vipInfo.mobile,"111111");
			// 	if(checkret === true){
			// 		that.timeflag = '60s';
			// 		that.codeing=true;
			// 		api.sendVerifyCode(this, {
			// 			'mobile':that.$root.vipInfo.mobile,
			// 			'product_id': that.$root.cookieVip
			// 		}, (back) => {
			// 			if(back.resCode!='0'){
			// 				that.$dispatch('handle_server_error', back);
			// 			}
			// 			else{
			// 				that.$dispatch('loading', {text: '验证码已发送，请留意手机短信', show: true, duration: 1000});
			// 			}
			// 		});
			// 		var	time = setInterval(function() {
			// 			if(that.timeflag == '0s') {
			// 				that.codeing=false;
			// 				clearInterval(time);
			// 				that.timeflag = '获取验证码';
			// 			} else {
			// 				var newTime =that.timeflag;
			// 				newTime = newTime.substring(0, newTime.length - 1);
			// 				that.timeflag = (parseInt(newTime) - 1) + 's';
			// 			}
			// 		}, 1000);
			// 	}
			// 	else{
			// 		that.$dispatch('loading', {text: checkret , show: true, duration: 1000}); 
			// 	}
			// },
			openVip(){
				var that=this;
				// checkMsg = this.checkData(that.$root.vipInfo.mobile,that.$root.vipInfo.verifyCode);
				// if(checkMsg === true) {
					// api.openMember(this, that.vip, (back) => {
					// 	if(back.resCode!='0'){
					// 		that.$dispatch('handle_server_error', back);
					// 	}
					// 	else{
							that.$root.vipsure = true;
							that.$root.openvip = false;
							
					// 	}
					// });
				// }else that.$dispatch('loading', {text: checkMsg , show: true, duration: 1000}); 
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
	.components-openvip{
		width: 100%;
		.box{
			position:relative;
			padding: 120px 80px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			width: 640px;
		    height: 900px;
		    text-align: center;
		    color: #fff;
		    .vip{
		    	width: 80%;
		    }
			.title{
				font-size: 38.84px;
				line-height: 46px;
				color: #fff;
				text-align: center;
				font-weight: 600;
			    padding: 15px;
    			
				
			}
			.login-panel{
				// margin-top: 60px;
			    padding-bottom: 20px;
			    line-height: 44px;
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
						background-color: #ffae00;
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
				}
			}
			.openvip-panel{
			    padding: 20px;
    			font-size: 20px;
    			.title1{
    				line-height: 40px;
    				font-size: 30px;
    				font-weight: 600;
    			}
			}
			.success-panel{
				 line-height: 40px;
			    font-size: 30px;
			    display: inline-block;
			    width: 60%;
			    padding: 30px 0;
			    vertical-align: middle;

			}
			.confirm-btn{
				display: block;
			    width: 254px;
    			height: 89px;
				margin: 30px auto 0 auto;
				line-height: 89px;
				font-size: 36px;
				text-align: center;
				color: #000;
				background-color: #98ce2e;
				border-radius: 25px;
				font-weight: 600;
				
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
	// .modal.modal-transition .modal-dialog{
	// 	margin: 100px 30px !important;
	// }
</style>