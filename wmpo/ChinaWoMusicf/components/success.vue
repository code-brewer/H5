<template>
	<modal :show.sync="successShow" :bg="false">
		<div class="components-success">
			<div class="box" style="background: #111902; border: 5px solid #98cf2f;">
				<p class="title">领取成功</p>
				<p class="success-panel">奖品将在活动结束后10个工作日内发放，请留意客服电话回访</p>
				<a class="confirm-btn" @click="successShow = false">确<span style="font-family: none;">&nbsp;&nbsp;</span>认</a>
				<img class="close-img" :src="'f/images/sp-close.png'" @click="successShow = false">
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
				
			}
		},
		props: {
			successShow: {
				type: Boolean,
				default: false
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="sass">
	.components-success{
		width: 100%;
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #fff;
			.title{
				font-size: 38.84px;
				line-height: 46px;
				color: #fff;
				text-align: center;
				
			}
			.success-panel{
				line-height: 40px;
			    padding: 30px 20px 20px;
    			font-size: 30px;
			}
			.confirm-btn{
				display: block;
				width: 220px;
				height: 75px;
				margin: 35px auto;
				line-height: 75px;
				font-size: 30px;
				text-align: center;
				color: #fff;
				background-color: #98ce2e;
				border-radius: 25px;
				
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
		margin: 160px 30px;
	}
</style>