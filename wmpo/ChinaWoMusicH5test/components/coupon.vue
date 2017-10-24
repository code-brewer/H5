<template>
	<modal :show.sync="couponShow" :bg="false">
		<div class="components-coupon">
			<div class="box" style="background: url('./H5/images/modal-bg.png') center center no-repeat;  background-size: 100% 100%;">
				<p class="title">提示</p>
				<div class="con">
					<p>是否确认订购此炫铃？</p>
					<p>{{$root.buySong}}</p>
				</div>
				
				<a style="background: url('./H5/images/tape1.png') center center no-repeat;" class="confirm-btn" @click="sureBuyLing">确定</a>
				<img class="close-img" :src="'H5/images/close.png'" @click="couponShow = false">
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
			sureBuyLing(){
				var body={
					aid:aid,
					toneID:this.$root.buySongId,
					toneType:1,
					source:source,
					accessToken:this.$root.accesstoken
				};
				api.buyTone(this, body, (back)=>{
					if(back.resCode == '0'){
						this.$root.coupon = false;
						this.$root.highgou = true;

					}else{
						this.$root.coupon = false;
						this.$root.vipfail = true;
					}
				})
			}
		}
	}
</script>

<style lang="sass">
	.components-coupon{
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
			.con{
			    font-size: 40px;
			    line-height: 60px;
			    padding: 50px 0;
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
		  	.confirm-btn{
				display: block;
				width: 254px;
				height: 89px;
				margin: 135px auto 0 auto;
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
		margin: 160px 30px;
	}
</style>