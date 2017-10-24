<template>
	<modal :show.sync="vipsureShow" :bg="false">
		<div class="components-vipsure">
			<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
			<div class="box" style="background: #fff; border-radius: 20px; border: 10px solid #fbb03b;">
				<p class="title">提示</p>
				<div class="vipsure-panel">
					<p><span>{{$root.vipInfo.mobile}}</span> 您好，欢迎开通沃音乐会员，开通后立即享有会员权益。更有联通50M流量赠 送（72小时内到账），会员资费<span> {{$root.nums}}元/月</span>{{$root.vipDesc}}是否确认订购？</p>
				</div>

				<a v-if="!nohasclick"style="background: url('./m/images/sure-btn.png') center center no-repeat;" class="confirm-btn" @click="vipSure()"></a>
				<a v-if="nohasclick" style="background: url('./m/images/sure-btn.png') center center no-repeat;" class="confirm-btn"></a>
				<img class="close-img" :src="'m/images/close.png'" @click="vipsureShow = false">

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
						// that.saveUserH5Info();
					}
					else{
						if(that.interfacepos<that.interfacecount){
							setTimeout(that.openMemberByNet,1000);
						}else{
							that.$dispatch('handle_server_error', back);
							sessionStorage.setItem('failResMsg',back.resMsg);
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
		    
		    text-align: center;
		    color: #fbb03b;
			.title{
				font-size: 60px;
				line-height: 80px;
				color: #fbb03b;
				text-align: center;
				font-weight: 600;
				
			}
			.vipsure-panel{
			    font-size: 35px;
			    line-height: 50px;
			    
			    span{
			    	color:#e73433;
			    	font-weight: 600;
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
				color: #fbb03b;
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
	.modal.modal-transition .modal-dialog{
		margin: 250px 60px;
	}
</style>