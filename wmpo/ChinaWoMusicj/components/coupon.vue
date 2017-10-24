<template>
	<modal :show.sync="couponShow" :bg="false">
		<div class="components-coupon" style="margin-top: 170px;">
			<div class="box" style="background: #fffbf1; border-radius: 20px;">
				<p class="title"><span v-if="type == '100'">100元</span><span v-if="type == '50'">50元</span><span v-if="type == '5'">5元</span>优惠券</p>
				<div class="">
					<!-- <img :src="'i/images/lele.png'" style="display: inline-block; vertical-align: middle;"> -->
					<p style="width: 100%" class="success-panel">{{tip1}}</p>
					<p v-if="type == '100'" class="link">https://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=2687897927&activityId=c4e6cd6fbfee4c94ab158d9601610c25</p>
					<p v-if="type == '50'" class="link">https://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=2687897927&activityId=a46821ccdab54546a8ecc454560a5a34</p>
					<p v-if="type == '5'" class="link">https://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=2687897927&activityId=ee80252512a24ef4a21201efd820f61c</p>
				</div>
				
				
				<img class="close-img" :src="'i/images/sp-close.png'" @click="couponShow = false">
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
				tip1:"复制链接，使用手机浏览器访问，即可领取优惠券进入沃音乐商城使用",
				type:'',
				
			}
		},
		props: {
			couponShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			couponShow(value){
				if(value){
					this.type = sessionStorage.getItem('coupon');
					console.log('coupon'+ this.type)
				}
			},
			// type(val){
			// 	if(val){
			// 		this.type = sessionStorage.getItem('coupon');
			// 		console.log('coupon'+ this.type)
			// 	}

			// },
		},
		ready(){
			this.type = sessionStorage.getItem('coupon');
			
		},
		methods:{
			
		}
	}
</script>

<style lang="sass">
	.components-coupon{
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
		        padding: 30px 0 10px;
			    vertical-align: middle;
			    font-weight: 600;

			}
			.link{
		  		word-break: break-all;
		  		color: #e60012;
		  		font-size: 32px;
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