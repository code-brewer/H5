<template>
	<modal :show.sync="openvipShow" :bg="false">
		<div class="components-openvip">
		<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
		<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
			<div class="box" style="background: #fff; border-radius: 20px;">
				<p class="title">开通沃音乐会员</p>
				<div class="login-panel">
					<div class="phone">
						<span>手机号码：</span>
						<input type="text" v-model="$root.vipInfo.mobile"  placeholder="请输入联通手机号码" maxlength="11" style="width: 384px;"/>
					</div>
					<div class="code">
						<span>&nbsp;验证码：</span>
						<input type="text" v-model="$root.vipInfo.verifyCode" maxlength="6"  placeholder="请输入短信验证码" style="width: 230px;"/>
						<a @click="getCode()" :class="{graycode:codeing}" >
							{{timeflag}}
						</a>
					</div>
					<a style="background: url('./l/images/openNow.png') center center no-repeat;" class="confirm-btn" @click="openVip()"></a>
				</div>
				<div class="openvip-panel">
					<!--<p class="title1">温馨提示：</p>-->
					<!--<p>开通会员即可领取幸运大礼包及随机1-5元话费，还可参与终极抽奖，有机会获得Kindle voyage、照片打印机和蓝牙运动耳机哦。</p>-->
					<p><img :src="'l/images/vipText.jpg'" alt="" style="width:100%;"></p>
				</div>
				
				<img class="close-img" :src="'l/images/sp-close.png'" @click="openvipShow = false">
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
				default: false//
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
        watch: {
            openvipShow(value) {
                if(value){
                    this.$root.vipInfo.mobile = sessionStorage.getItem('LoginMobile')? sessionStorage.getItem('LoginMobile') : '';
                    console.log(this.$root.vipInfo.mobile);
                }
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
				var checkret = this.checkData(that.$root.vipInfo.mobile,"111111");
				if(checkret === true){
					that.timeflag = '60s';
					that.codeing=true;
					api.sendVerifyCode(this, {
						'mobile':that.$root.vipInfo.mobile,
						'product_id': that.$root.cookieVip
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
			openVip(){
				var that=this,
				checkMsg = this.checkData(that.$root.vipInfo.mobile,that.$root.vipInfo.verifyCode);
				if(checkMsg === true) {
					// api.openMember(this, that.vip, (back) => {
					// 	if(back.resCode!='0'){
					// 		that.$dispatch('handle_server_error', back);
					// 	}
					// 	else{
							that.$root.vipsure = true;
							that.$root.openvip = false;
							
					// 	}
					// });
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
	.components-openvip{
		width: 100%;
		.right{
			position: absolute;
			right: -5%;
			top: 77%;
			z-index: 1000;
		}
		.left{
			position: absolute;
			left: -4%;
			top: 87%;
			z-index: 1000;
		}
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			border: 8px solid #f7af49;
			color: #f7af49;
			.title{
				font-size: 52px;
				line-height: 46px;
				color: #f7af49;
				text-align: center;
				font-weight: 600;
			    padding: 25px;
    			// border-bottom: 2px solid #ffae00;
				
			}
			.login-panel{
				margin-top: 60px;
			    padding-bottom: 20px;
    			border-bottom: 5px solid #f7af49;
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
						background-color: #e80000;
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
					border-radius: 40px;
					border: 2px solid #f7af49;
				}
			}
			.openvip-panel{
			    padding: 20px;
    			font-size: 20px;
    			color:#a72531;
    			text-align: left;
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
				margin: 35px auto;
				line-height: 83px;
				font-size: 30px;
				text-align: center;
				color: #fff;
				background-color: #f7af49;
				border-radius: 25px;
				font-weight: 600;
				
			}
			.close-img{
				position: absolute;
				right: -20px;
				top: -25px;
				max-width: 56px;
				max-height: 50px;
			}
			
		}
	}
	.modal.modal-transition .modal-dialog{
		// margin: 100px 30px !important;
	}
</style>