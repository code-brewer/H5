<template>
	<modal :show.sync="vipbenefitShow" :bg="false">
		<div class="components-vipbenefit">
			<div class="box" style="background: #fff; border-radius: 20px;">
				<p class="title">沃音乐会员权益</p>
				<div class="login-panel">
					<div class='vip-policy-list'>
						<ul>
							<li>
								<a>
									<img :src="'k/images/vip-1.png'">
									<!-- <span>海量歌曲MV免费下载</span> -->
								</a>
							</li>
							<li>
                                <a>
                                   <img :src="'k/images/vip-2.png'">
                                   <!-- <span>沃音乐专享铃音盒</span> -->
                                </a>
                            </li>
                            <li>
                                <a>
                                   <img :src="'k/images/vip-3.png'">
                                   <!-- <span>沃音乐掌上流量全免</span> -->
                                </a>
                            </li>
                            <li>
                                <a>
                                   <img :src="'k/images/vip-4.png'">
                                   <!-- <span>明星见面会特权福利</span> -->
                                </a>
                            </li>
						</ul>
					</div>
					<a style="background: url('./n/images/btn-bg.png') center center no-repeat; padding-left: 20px;" class="confirm-btn" @click="openVipRightNow()">马上开通</a>
				</div>
				<div class="openvip-panel">
					<p class="title1">温馨提示：</p>
					<p>活动期间，新用户开通可享受首月免会员资费优惠。（沃音乐高级会员
价值6元/月，2、3G非炫铃用户开通时须在会员套餐费外收取5元炫铃功
能费，4G用户可全免。）开通后还可参与福利抽奖。</p>

				</div>
				
				<img class="close-img" :src="'n/images/close.png'" @click="vipbenefitShow = false">
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
			openVipRightNow(){
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
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #b42828;
			.title{
				font-size: 52px;
				line-height: 46px;
				color: #b42828;
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
			 		    text-align: center;
    			 	}
    			}
				
			}
			.openvip-panel{
			    padding: 0 20px;
    			font-size: 20px;
    			color:#b42828;
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
				margin: 10px auto;
				line-height: 83px;
				font-size: 30px;
				text-align: center;
				color: #fff;
				background-color: #98ce2e;
				border-radius: 25px;
				font-weight: 600;
				
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
	.modal.modal-transition .modal-dialog{
		// margin: 100px 30px !important;
	}
</style>