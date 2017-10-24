<template>
	<modal :show.sync="vipsuccessShow" :bg="false">
		<div class="components-vipsuccess">
				<div class="box" style="background: url('./H5/images/modal-bg.png') center center no-repeat;  background-size: 100% 100%;">
				<p class="title">提示</p>
				<div class="">
					<!-- <img :src="'i/images/lele.png'" style="display: inline-block; vertical-align: middle;"> -->
					<p style="width: 100%" class="success-panel">{{tip1}}</p>
				</div>
				<a style="background: url('./H5/images/tape1.png') center center no-repeat;" class="confirm-btn" @click="receiveOffers">确定</a>
				<img class="close-img" :src="'H5/images/close.png'" @click="vipsuccessShow = false">
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
				tip1:"会员开通成功，您已享有沃音乐会员权益。马上将您喜爱的音乐设置为炫铃！",
				
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
			receiveOffers(){
				//领取优惠
				this.addOperLog('button','receiveOffers');
				location.href = "http://m.7daysinn.cn/maserati/ext/TemplateCoupon/goDynamicCouponPhonePage/9CAA4E2C64EE7AC8A9C14796000F5681";
			}
		}
	}
</script>

<style lang="sass">
	.components-vipsuccess{
		width: 100%;
		.box{
			position:relative;
			padding: 150px 80px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			width: 640px;
		    height: 680px;
		    text-align: center;
		    color: #fff;
			.title{
				font-size: 38.84px;
				line-height: 46px;
				color: #fff;
				text-align: center;
				font-weight: 600;
				
			}
			.success-panel{
				 line-height: 40px;
			    font-size: 30px;
			    display: inline-block;
			    width: 60%;
			    padding: 30px 20px;
			    vertical-align: middle;

			}
			.confirm-btn{
				display: inline-block;
				width: 254px;
				height: 89px;
				margin: 125px auto 0 auto;
				line-height: 89px;
				font-size: 40px;
				text-align: center;
				color: #000;
				background-color: #98ce2e;
				border-radius: 25px;
				font-weight: 600;
				
			}
			.close-img{
				position: absolute;
				right: 20px;
				top: 20px;
				max-width: 77px;
    			max-height: 77px;
			}
			
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 160px 60px;
	}
</style>