<template>
	<modal :show.sync="vipsuccessShow" :bg="false">
		<div class="components-vipsuccess">
			<div class="box" style="background: #fffbf1; border-radius: 20px;">
				<p class="title">提示</p>
				<div class="">
					<!-- <img :src="'i/images/lele.png'" style="display: inline-block; vertical-align: middle;"> -->
					<p style="width: 100%" class="success-panel">{{tip1}}</p>
				</div>
				<a style="background: url('./i/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="receiveOffers">领取优惠</a>
				<a style="background: url('./i/images/btn-bg-gray.png') center center no-repeat;" class="confirm-btn" @click="vipsuccessShow = false">去抽奖</a>
				<img class="close-img" :src="'i/images/sp-close.png'" @click="vipsuccessShow = false">
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
				tip1:"开通会员成功，恭喜获得5元话费及铂涛酒店60元优惠券，次月15日前未取消会员，次月17日前话费即可到账！",
				
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
				display: inline-block;
				width: 254px;
				height: 89px;
				margin: 35px auto;
				line-height: 89px;
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