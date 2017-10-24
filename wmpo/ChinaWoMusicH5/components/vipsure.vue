<template>
	<modal :show.sync="vipsureShow" :bg="false">
		<div class="components-vipsure">
			<div class="box" style="background: url('./p/images/modal-bg.png') center center no-repeat;  background-size: 100% 100%;">
				<p class="title">提示</p>
				<div class="vipsure-panel">
					<p><span>{{$root.vipInfo.mobile}}</span>您好，欢迎开通沃音乐会员<span style="color: #ec3131;">（首月免费，次月正常收取费用），</span>开通后立即享有会员权益。开通后可立即享有会员权益。（未开通炫铃功能的用户将默认为您开通，4G用户免费，除广东、上海、吉林、甘肃以外的2/3G非炫铃用户开通时须额外收取5元炫铃功能费。）</p>
				</div>

				
				<img class="check" :src="'p/images/check.png'">
				<a v-if="!nohasclick"style="background: url('./p/images/btn-bg1.png') center center no-repeat;" class="confirm-btn" @click="vipSure()">确认</a>
				<a v-if="nohasclick" style="background: url('./p/images/btn-bg1.png') center center no-repeat;" class="confirm-btn">确认</a>
				<img class="close-img" :src="'p/images/close.png'" @click="vipsureShow = false">

			</div>
			
		</div>
	</modal>
</template>

<script>
	function getCookie(name)
	{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
	}
	import modal from './../../../src/components/Modal.vue'
	import api from './../utils/serverapi.js'
	export default{
		components: {
			modal
		},
		data(){
			return{
				tip:"",
				nohasclick: false,
				interfacepos:0,//当前尝试接口次数
				interfacecount:3,//总共尝试接口次数
			}
		},
		props: {
			vipsureShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			vipsureShow(value) {
				if(value){
					this.$root.vipInfo.mobile = sessionStorage.getItem('LoginMobile')? sessionStorage.getItem('LoginMobile') : '';
					console.log(this.$root.vipInfo.mobile);
				}
			}
		},
		ready(){
			this.$root.vipInfo.mobile = sessionStorage.getItem('LoginMobile')? sessionStorage.getItem('LoginMobile') : '';
			
			
		},
		methods:{
			vipSure(){
				var that = this;
				this.nohasclick = true;
				if(that.nohasclick){
					this.$dispatch('addOperLog', 'button', 'openvip-two');
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
							that.openMemberByNet();
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
						that.openMemberByNet();
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
			openMemberByNet(){
				var that = this;
				that.$dispatch('loading', {
					name: 'openMemberByNet',
					icon: true,
					text: '请稍候...',
					show: true,
					duration: 30 * 1000
				});
				that.interfacepos++;
				api.openMemberByNet(that, {'aid':aid,'source':source}, (back) => {
					that.$dispatch('cancelloading', 'openMemberByNet');
					if(back.resCode=='0' || back.resCode==0){
						that.interfacepos = 0;
						that.$root.vipsuccess = true;
						that.$root.vipsure = false;
						that.$root.vipInfo.verifyCode = '';
						that.$root.cookieVip =  getCookie('cn.easier.wmpo.tone.user');
						that.$root.vipInfo.productId = that.$root.cookieVip;
						// that.saveUserH5Info();
					}
					else{
						if(that.interfacepos<that.interfacecount){
							setTimeout(that.openMemberByNet,1000);
						}else{
							// that.$dispatch('handle_server_error', back);
							that.$root.vipfail = true;
							that.$root.vipsure = false;
						}
						// that.$dispatch('handle_server_error', back);
						
					}
				});
			},
			
		}
	}
</script>

<style lang="sass">
	.components-vipsure{
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
				padding: 30px 0 20px 0;
				font-size: 38.84px;
				line-height: 46px;
				color: #474545;
				text-align: center;
				font-weight: 600;
				
			}
			.vipsure-panel{
				padding-bottom: 20px;
			    font-size: 30px;
			    line-height: 1.5;
			    color: #474545;
			    span{
			    	color:#ffae00;
			    }
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
				margin: 44px auto 0 auto;
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
		margin: 160px auto !important;
	}
</style>