<template>
	<modal :show.sync="vipbenefitShow" :bg="false">
		<div class="components-vipbenefit">
			<div class="box text-center" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #f62a32; border-radius: 20px;">
				<p class="title">沃音乐会员权益</p>
				<div class="login-panel">
					<div class='vip-policy-list'>
						<img :src="'o/images/benefit.png'">
                                
					</div>
					<a style="background: url('./o/images/btn-bg.png') center center no-repeat; margin: 10px auto;" class="confirm-btn" @click="openVipRightNow()">马上开通</a>
				</div>
				<div class="openvip-panel">
					<p class="title1">温馨提示：</p>
					<p>1、活动期间，新用户首次开通可享受首月免会员资费优惠。</p>
					<p>2、全国4G用户沃音乐会员6元/月，免费送炫铃功能；2/3G炫铃用户沃音乐会员1元/月；</p>
					<p>3、2/3G非炫铃用户可开通1元沃音乐特惠会员+5元炫铃功能。</p>

				</div>
				
				<img class="close-img" :src="'o/images/close.png'" @click="vipbenefitShow = false">
				<img class="bottom" :src="'o/images/wen-bottom1.png'" />
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
			vipbenefitShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
		methods:{
			addOperLog(type, btnName) {
				api.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source': source
				}, (back) => {})
			},
			openVipRightNow(){
				this.addOperLog('button','a-benefitOpen');
				this.$root.vipbenefit = false;
				this.$root.vipsure = true;
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
	.components-vipbenefit{
		width: 100%;
		
		.box{
			position:relative;
			padding: 20px 20px 87px 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #8f1225;

			.title{
				font-size: 52px;
				line-height: 46px;
				text-align: center;
				font-weight: 600;
			    padding: 15px;
    			// border-bottom: 2px solid #ffae00;
				
			}
			.login-panel{
				// margin-top: 60px;
			    // padding-bottom: 20px;
    			// border-bottom: 2px solid #589b8a;
    			.vip-policy-list{
    			 	ul li{
    			 		display: inline-block;
    			 		width: 48.5%;
			 		    padding: 10px 0;
    			 	}
    			}
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
						background-color: #276856;
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
					border: 2px solid #337c69;
				}
			}
			.openvip-panel{
			    padding: 0 20px;
    			font-size: 20px;
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
			
			
		}
	}
	.modal.modal-transition .modal-dialog{
		// margin: 100px 30px !important;
	}
</style>