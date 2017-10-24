<template>
	<modal :show.sync="openvipShow" :bg="false">
		<div class="components-openvip">
			<div class="box" style="background: #fff; border-radius: 20px;">
				<p class="title">提示</p>
				<div class="login-panel">
					<div class="openvip-panel">
						<p>您还不是沃音乐会员</p>
						<p> 是否开通? </p>
					</div>
					<a style="background: url('./n/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="openVip()">确<span style="font-family: none;">&nbsp;</span>认</a>
				</div>
				
				<img class="close-img" :src="'n/images/close.png'" @click="openvipShow = false">
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
		methods:{
			
		
			openVip(){
				var that= this;
				that.$root.vipbenefit = true;
				that.$root.openvip = false;
				
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
			    padding: 25px;
    			// border-bottom: 2px solid #ffae00;
				
			}
			.login-panel{
				margin-top: 60px;
			    padding-bottom: 20px;
    			
			}
			.openvip-panel{
			    text-align: center;
			    font-size: 50px;
			    color: #ffaf03;
				font-weight: 600;
    			
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