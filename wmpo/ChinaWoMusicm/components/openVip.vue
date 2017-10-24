<template>
	<modal :show.sync="openvipShow" :bg="false">
		<div class="components-openvip">
			<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
			<div class="box" style="background: #fff; border-radius: 20px; border: 10px solid #fbb03b;">
				<p class="title">提示</p>
				<div class="login-panel">
					<p>还不是沃音乐会员，  </p>
					<p>是否开通？</p>
				</div>
				<a class="confirm-btn" style="background: url('./m/images/openvip-btn.png') center center no-repeat;" @click="openVip()"></a>
				
				<img class="close-img" :src="'m/images/close.png'" @click="openvipShow = false">
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
			padding: 30px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			width: 640px;
		    // height: 900px;
		    text-align: center;
		    color: #fbb03b;
		    .vip{
		    	width: 80%;
		    }
			.title{
				font-size: 60px;
				line-height: 80px;
				color: #fbb03b;
				text-align: center;
				font-weight: 600;
			    padding: 15px;
    			
				
			}
			.login-panel{
			    padding-bottom: 20px;
			    line-height: 77px;
			    font-size: 50px;
			    font-weight: bold;
    			
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
			    right: -40px;
			    top: -35px;
			    max-width: 79px;
			    max-height: 78px;
			}
			
		}
	}
	// .modal.modal-transition .modal-dialog{
	// 	margin: 100px 30px !important;
	// }
</style>