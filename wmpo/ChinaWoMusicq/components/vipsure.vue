<template>
	<modal :show.sync="vipsureShow" :bg="false">
		<div class="components-vipsure">
			<div class="box text-center" style="background-image: url('./q/images/wen.jpg'); background-repeat-y: repeat;">
				<p class="title">提示</p>
				<div class="vipsure-panel">
					<p>{{$root.vipInfo.mobile}}您好，欢迎开通沃音乐会员（6元/月，开通当月首月免费，次月正常收取费用），开通后可立即享有会员权益。</p>
				</div>
				<img :src="'q/images/agree.png'" />
				<p style="padding: 20px 20px 0 20px;">（未开通炫铃功能的用户将默认为您开通，4G用户免费，除广东、上海、吉林、甘肃以外的2/3G非炫铃用户开通时须额外收取5元炫铃功能费。）</p>
				<!-- <a style="background: url('./k/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipsureShow = false">取<span style="font-family: none;">&nbsp;</span>消</a> -->
				<a style="background: url('./q/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipSure()">确<span style="font-family: none;">&nbsp;</span>认</a>
				<img class="close-img" :src="'q/images/close.png'" @click="vipsureShow = false">
				<img class="bottom" :src="'q/images/wen-bottom.png'" />

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
                    this.$root.vipInfo.mobile = localStorage.getItem('LoginMobile')? localStorage.getItem('LoginMobile') : '';
                   
                }
            }
        },
		ready(){
			
			
		},
		methods:{
			addOperLog(type, btnName) {
				api.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source': source
				}, (back) => {})
			},
			vipSure(){
				var that = this;
				that.addOperLog('button','a-vipSure');
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
							sessionStorage.setItem('failResMsg',back.resMsg);
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
					that.nohasclick = false;
					if(back.resCode =='0'){
						that.interfacepos = 0;
						that.$root.checkVip = true;
						that.$root.vipsuccess = true;
						that.$root.vipsure = false;
						
					}
					else{
						if(that.interfacepos<that.interfacecount){
							setTimeout(that.openMemberByNet,1000);
						}else{
							// that.$dispatch('handle_server_error', back);
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
		
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #8f1225;
			.title{
				font-size: 52px;
				line-height: 60px;
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
			.close-img{
				right: -20px;
			}
			
			
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 160px 30px;
	}
</style>