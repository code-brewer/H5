<template>
	<modal :show.sync="vipsureShow" :bg="false">
		<div class="components-vipsure">
			<div class="box" style="background: #fffbf1; border-radius: 20px;">
				<p class="title">提示</p>
				<div class="vipsure-panel">
					<p><span>{{$root.vipInfo.mobile}}</span>您好，欢迎开通沃音乐会员，开通后可参与抽奖，并获得5元话费及铂涛酒店60元优惠券，会员资费<span>{{$root.nums}}元/月</span>(含炫铃功能费)是否确认订购？</p>
				</div>

				<a style="background: url('./i/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipsureShow = false">取<span style="font-family: none;">&nbsp;&nbsp;</span>消</a>
				<a v-if="!nohasclick"style="background: url('./i/images/btn-bg-gray.png') center center no-repeat;" class="confirm-btn" @click="vipSure()">确<span style="font-family: none;">&nbsp;&nbsp;</span>认</a>
				<a v-if="nohasclick" style="background: url('./i/images/btn-bg-gray.png') center center no-repeat;" class="confirm-btn">确<span style="font-family: none;">&nbsp;&nbsp;</span>认</a>
				<img class="close-img" :src="'i/images/sp-close.png'" @click="vipsureShow = false">

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
				nohasclick: false,
				
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
		methods:{
			saveUserH5Info() {
				var that = this;
				that.$dispatch('loading', {
					name: 'app_save',
					icon: true,
					text: '正在加载中...',
					show: true,
					duration: 20 * 1000
				});
				api.saveUserH5Info(this, {
					types: '拼歌单达人',
					scoreorg: that.$root.gameLevel
				}, (back) => {
					that.$dispatch('cancelloading', 'app_save');
					that.$root.gameLevel = -1;
				})
			},
			vipSure(){
				var that = this;
				this.nohasclick = true;
				that.$dispatch('loading', {
					name: 'vip_save',
					icon: true,
					text: '正在加载中...',
					show: true,
					duration: 10 * 1000
				});
				if(this.nohasclick){
					api.openMember(this, that.$root.vipInfo, (back) => {
						that.$dispatch('cancelloading', 'vip_save');
						if(back.resCode=='0' || back.resCode==0){
							that.$root.vipsuccess = true;
							that.$root.vipsure = false;
							that.$root.vipInfo.verifyCode = '';
							that.saveUserH5Info();

						}
						else{
							// that.$dispatch('handle_server_error', back);
							that.$root.vipfail = true;
							that.$root.vipsure = false;
							
						}
					});
				}
				
			}
			
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
			color: #4e140c;
			.title{
				font-size: 38.84px;
				line-height: 46px;
				color: #4e140c;
				text-align: center;
				font-weight: 600;
				
			}
			.vipsure-panel{
			    font-size: 30px;
			    line-height: 45px;
			    padding: 20px;
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