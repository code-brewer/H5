<template>
	<modal :show.sync="vipsureShow" :bg="false">
		<div class="components-vipsure">
			<div class="box" style="background: #fff; border-radius: 20px;">
				<p class="title">提示</p>
				<div class="vipsure-panel">
					<p><span>{{$root.vipInfo.mobile}}</span>您好，欢迎开通沃音乐会员（ 首月免费 ），开通后立即享有会员权益。未开通炫铃功能时将默认为您开通，2G/3G用户资 费5元/月，4G用户免费开通，是否确认订购？</p>
					    
				</div>

				<!-- <a style="background: url('./k/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipsureShow = false">取<span style="font-family: none;">&nbsp;</span>消</a> -->
				<a v-if="nohasclick" style="background: url('./n/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipSure()">确<span style="font-family: none;">&nbsp;</span>认</a>
				<a v-if="!nohasclick"style="background: url('./n/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipSure()">确认</a>
				
				<img class="close-img" :src="'n/images/close.png'" @click="vipsureShow = false">

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
		ready(){
			
			
		},
		 watch: {
            vipsureShow(value) {
                if(value){
                    this.$root.vipInfo.mobile = sessionStorage.getItem('LoginMobile')? sessionStorage.getItem('LoginMobile') : '';
                   
                }
            }
        },
		methods:{
			
			vipSure(){
				var that = this;
				if(!that.nohasclick){
					that.$dispatch('loading', {
						name: 'findUserBasInfo',
						icon: true,
						text: '请稍候...',
						show: true,
						duration: 30 * 1000
					});
					this.nohasclick = true;
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
							that.nohasclick = false;
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
					if(back.resCode =='0'){
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
							// that.$dispatch('handle_server_error', back);
							that.$root.vipfail = true;
							that.$root.vipsure = false;
							that.nohasclick = false;
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
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #ffc000;
			.title{
				font-size: 52px;
				line-height: 60px;
				color: #b42828;
				text-align: center;
				font-weight: 600;
				
			}
			.vipsure-panel{
			    font-size: 30px;
			    line-height: 45px;
			    padding: 20px;
			    span{
			    	color:#e73433;
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
			    display: block;
				width: 254px;
				height: 89px;
				margin: 35px auto;
				line-height: 83px;
				font-size: 30px;
				text-align: center;
				color: #fff;
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