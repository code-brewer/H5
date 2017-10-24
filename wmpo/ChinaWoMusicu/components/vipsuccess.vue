<template>
	<modal :show.sync="vipsuccessShow" :bg="false">
		<div class="components-vipsuccess">
			<div class="box" style="background: #ffed7d; border-radius: 20px; border: 10px solid #fc842a;">
				<p class="title">提示</p>
				<div class="">
					<!-- <img :src="'i/images/lele.png'" style="display: inline-block; vertical-align: middle;"> -->
					<p style="width: 100%" class="success-panel">开通会员成功，你已享有沃音乐会员权益，50M联通流量于三个工作日内到账！</p>
					
				</div>
				<a style="background: url('./u/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipsuccessShow = false">确定</a>
				<img class="close-img" :src="'u/images/close.png'" @click="vipsuccessShow = false">
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
				tip1:"开通会员成功，你已享有沃音乐会员权益， 获得联通50M流量，流量72小时内可到账！",
				
			}
		},
		props: {
			vipsuccessShow: {
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
			addOperLog(type,btnName) {
				api.addOperLog(this, {
					'aid':aid,
					'type':type,
					'button_name':btnName,
					'source':source
				}, (back) => {})
			},
			
		}
	}
</script>

<style lang="sass">
	.components-vipsuccess{
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
		    // height: 680px;
		    text-align: center;
		    color: #8f1225;
			.title{
				font-size: 60px;
				line-height: 80px;
				color: #8f1225;
				text-align: center;
				font-weight: 600;
				
			}
			.success-panel{
				 line-height: 50px;
			    font-size: 38px;
			    display: inline-block;
			    width: 60%;
			    padding: 20px 0;
			    vertical-align: middle;
			    span{
			    	color:#8f1225;
			    }

			}
			.confirm-btn{
				display: inline-block;
				width: 273px;
				height: 89px;
				margin: 25px auto 0 auto;
				line-height: 89px;
				font-size: 45px;
				text-align: center;
				color: #fff;
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
	// 	margin: 160px 60px;
	// }
</style>