<template>
	<modal :show.sync="openvipShow" :bg="false">
		<div class="components-openvip">
			<div class="box" style="background: url('./p/images/modal-bg2.png') center center no-repeat;  background-size: 100% 100%;">
				<p class="title">沃音乐会员权益</p>
				<div class="login-panel">
					<p>温馨提示：</p>
					<p style="color: #ec3131;">1、活动期间，新用户首次开通可享受首月免会员资费优惠。</p>
					<p>2、全国4G用户沃音乐会员6元/月，免费送炫铃功能；2/3G炫铃用户沃音乐会员1元/月；</p>
					<p>3、2/3G非炫铃用户可开通1元沃音乐特惠会员+5元炫铃功能。</p>
				</div>
				<a class="confirm-btn" style="background: url('./p/images/btn-bg2.png') center center no-repeat;" @click="openVip()">开通会员</a>
				
				<img class="close-img" :src="'p/images/close.png'" @click="openvipShow = false">
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
				this.$root.vipsure = true;
				this.$root.openvip = false;
				this.$dispatch('addOperLog', 'button', 'openvip-one');
			}
		}
	}
</script>

<style lang="sass">
	// .modal.modal-transition .modal-dialog {
	// 	top: 50%;
	// 	margin: 0 60px !important;
	// 	transform: translate(0, -50%);
	// }
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
		position: relative;
		width: 100%;
		.box{
			position:relative;
			padding: 120px 40px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			width: 640px;
		    height: 995px;
		    text-align: center;
		    color: #fff;
		    .vip{
		    	width: 80%;
		    }
			.title{
				margin-top: -50px;
				font-size: 38.84px;
				line-height: 46px;
				color: #ec3131;
				text-align: center;
			    padding: 15px;
			}
			.login-panel{
				padding-top: 460px;
			    p {
			    	text-align: left;
			    	line-height: 1.5;
			    	color: #333;
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
				margin: 10px auto 0;
				line-height: 89px;
				font-size: 36px;
				text-align: center;
				color: #fff;
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
	.modal.modal-transition .modal-dialog{
		margin: 50px auto !important;
	}
</style>