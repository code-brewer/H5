<template>
	<modal :show.sync="vipbenefitShow" :bg="false">
		<div class="components-vipbenefit">
		<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
		<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
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
					<a style="background: url('./k/images/btn-bg.png') center center no-repeat; padding-left: 20px;" class="confirm-btn" @click="openVipRightNow()">马上开通</a>
				</div>
				<div class="openvip-panel">
					<p class="title1">温馨提示：</p>
					<p>开通会员可获得1-5元话费，还可参与终极抽奖。</p>

				</div>
				
				<img class="close-img" :src="'k/images/sp-close.png'" @click="vipbenefitShow = false">
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
				this.$root.openvip = true;
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
			color: #276856;
			.title{
				font-size: 52px;
				line-height: 46px;
				color: #e73433;
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
    			color:#e73433;
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