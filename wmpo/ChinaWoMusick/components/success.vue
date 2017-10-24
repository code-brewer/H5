<template>
	<modal :show.sync="successShow" :bg="false">
		<div class="components-success">
			<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
			<div class="box" style="background: #fff; border-radius: 20px;">
				<p class="title">领取成功</p>
				<div style="text-align: center; padding: 15px 0;">
					<img :src="'k/images/award-success.png'" style="vertical-align: middle;">
				</div>
				<p class="success-panel">{{tip1}}</p>
				
				<a style="background: url('./k/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="successShow = false">确<span style="font-family: none;">&nbsp;</span>认</a>
				<img class="close-img" :src="'k/images/sp-close.png'" @click="successShow = false">
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
				tip1:"工作人员核实信息后，将在活动结束后10个工作日内发放奖品，请留意客服电话回访。",
				
			}
		},
		props: {
			successShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="sass">
	.components-success{
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
			color: #285f51;
			.title{
				font-size: 52px;
				line-height: 90px;
				color: #e73433;
				text-align: center;
				font-weight: 600;
				
			}
			.success-panel{
			    line-height: 40px;
			    font-size: 30px;
			    display: inline-block;
			    width: 100%;
			    padding: 35px 35px 0 35px;
			    text-align: left;
			    vertical-align: middle;

			}
			.confirm-btn{
				display: block;
				width: 220px;
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
		margin: 160px 30px;
	}
</style>