<template>
	<modal :show.sync="couponShow" :bg="false">
		<div class="components-coupon">
			<div class="box" style="background: url('./p/images/modal-bg.png') center center no-repeat;  background-size: 100% 100%;">
				<p class="title">提示</p>
				<div class="con">
					<p>是否确认订购此炫铃？</p>
					<p>{{$root.buySong}}</p>
					<img class="check" :src="'p/images/check.png'">
				</div>
				<div class="mes">
					<p>1、订购成功后，炫铃使用有效期可到沃音乐官网“个人中心”查看。</p>
					<p>2、目前2G、3G用户需在会员套餐外另收取炫铃功能费用，4G用户免费（安徽、福建地区除外），敬请谅解。</p>
					<p>3、未开通炫铃功能的用户，订购炫铃后将默认开通此功能，资费5元/月。</p>
				</div>
				
				<a style="background: url('./p/images/btn-bg1.png') center center no-repeat;" class="confirm-btn" @click="checkCRBT">确定</a>
				<img class="close-img" :src="'p/images/close.png'" @click="couponShow = false">
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
				nohasclick: false,
				interfacepos: 0,
				interfacecount: 3
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
			checkCRBT(){
				var that = this;
				this.nohasclick = true;
				if(that.nohasclick){
					this.$dispatch('addOperLog', 'button','buyCRBT');
					//判断是否有炫铃功能
					that.$dispatch('loading', {
						name: 'findUserBasInfo',
						icon: true,
						text: '请稍候...',
						show: true,
						duration: 30 * 1000
					});
					api.findUserBasInfo(that,{'accessToken':that.$root.accesstoken},(back)=>{
						that.$dispatch('cancelloading', 'findUserBasInfo');
						if(back.resCode=='0'){
							//订购炫铃能力
							that.qryUserBasInfo();
						}else if(back.resCode=='10001'){
							//开通会员
							that.sureBuyLing();
						}else{
							that.$dispatch('handle_server_error', back);
						}
					})
					
				}
				
			},
			qryUserBasInfo(){
				var that = this;
				//开通炫铃功能
				that.$dispatch('loading', {
					name: 'qryUserBasInfo',
					icon: true,
					text: '请稍候...',
					show: true,
					duration: 30 * 1000
				});
				that.interfacepos++;
				api.qryUserBasInfo(that,{'accessToken':that.$root.accesstoken},(back)=>{
					that.$dispatch('cancelloading', 'qryUserBasInfo');
					if(back.resCode=='0' || back.resCode=='30001'){
						that.interfacepos = 0;
						that.sureBuyLing();
					}else{
						if(that.interfacepos<that.interfacecount){
							setTimeout(that.qryUserBasInfo,1000);
						}else{
							// that.$dispatch('handle_server_error', back);
							that.$root.vipfail = true;
							that.$root.vipsure = false;
						}
					}

				})
			},
			sureBuyLing(){
				var that = this;
				that.$dispatch('loading', {
					name: 'buyTone',
					icon: true,
					text: '请稍候...',
					show: true,
					duration: 30 * 1000
				});
				var body={
					aid:aid,
					toneID:that.$root.buySongId,
					toneType:1,
					source:source,
					accessToken:that.$root.accesstoken
				};
				api.buyTone(that, body, (back)=>{
					that.$dispatch('cancelloading', 'buyTone');
					if(back.resCode == '0'){
						that.$root.coupon = false;
						that.$root.highgou = true;

					}else{
						that.$root.coupon = false;
						sessionStorage.setItem('failReason',back.resMsg);
						that.$root.vipfail = true;
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
		    height: 850px;
		    text-align: center;
		    color: #fff;
			.title{
				padding-top: 20px;
				font-size: 36px;
				line-height: 46px;
				color: #333;
				text-align: center;
				font-weight: 600;
				
			}
			.con{
			    font-size: 36px;
			    line-height: 1.5;
			    padding: 30px 0;
			    color: #ec3131;
			}
			.mes {
				font-size: 28px;
				color: #333;
				line-height: 1.5;
				text-align: left;
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
				margin: 20px auto 0 auto;
				line-height: 89px;
				font-size: 40px;
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
				max-width: 77px;
    			max-height: 77px;
			}
			
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 160px auto;
	}
</style>