<template>
	<modal :show.sync="successShow" :bg="false">
		<div class="components-success">
			<div class="box" style="background: #fffbf1; border-radius: 20px;">
				<p class="title">提交成功</p>
				<div class="">
					<img :src="'i/images/lele.png'" style="display: inline-block; vertical-align: middle;">
					<p class="success-panel">{{tip1}}</p>
				</div>
				<a style="background: url('./i/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="successShow = false">确<span style="font-family: none;">&nbsp;&nbsp;</span>认</a>
				<img class="close-img" :src="'i/images/sp-close.png'" @click="successShow = false">
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
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #4e140c;
			.title{
				font-size: 38.84px;
				line-height: 46px;
				color: #4e140c;
				text-align: center;
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
				width: 220px;
				height: 75px;
				margin: 35px auto;
				line-height: 75px;
				font-size: 30px;
				text-align: center;
				color: #4e140c;
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