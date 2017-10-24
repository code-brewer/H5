<template>
	<modal :show.sync="vipsureShow" :bg="false">
		<div class="components-vipsure">
			<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
			<div class="box" style="background: #fff; border-radius: 20px;">
				<p class="title">提示</p>
				<div class="vipsure-panel">
					<p><span>{{$root.vipInfo.mobile}}</span>您好，欢迎您开通沃音乐会员，开通后可立即享有会员福利，并获得参与抽奖机会，会员资费<span>6元/月</span>(含炫铃功能费)是否确认订购？</p>
				</div>

				<!-- <a style="background: url('./l/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipsureShow = false">取<span style="font-family: none;">&nbsp;</span>消</a> -->
				<a style="background: url('./l/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipSure()">确<span style="font-family: none;">&nbsp;</span>认</a>
				<img class="close-img" :src="'l/images/sp-close.png'" @click="vipsureShow = false">

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
			
				
			}
		},
		props: {
			vipsureShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
		ready(){
			
			
		},
		methods:{
			
			vipSure(){
				var that = this;
				console.log(that.$root.vipInfo);
				api.openMember(this, that.$root.vipInfo, (back) => {
					if(back.resCode=='0' || back.resCode==0){
						that.$root.vipsuccess = true;
						that.$root.vipsure = false;
						that.$root.vipInfo.verifyCode = '';
					}
					else{
						that.$dispatch('handle_server_error', back);
						
					}
				});
			}
			
		}
	}
</script>

<style lang="sass">
	.components-vipsure{
		width: 100%;
		.right{
			position: absolute;
			right: -28px;
			top: 310px;
			z-index: 1000;
		}
		.left{
			position: absolute;
			left: -20px;
			top: 396px;
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
				line-height: 60px;
				color: #f7af49;
				text-align: center;
				font-weight: 600;
				
			}
			.vipsure-panel{
			    font-size: 30px;
			    line-height: 45px;
			    padding: 20px;
				text-align: left;
			    span{
			    	color:#f7af49;
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
		margin: 160px 30px;
	}
</style>