<template>
	<modal :show.sync="openbellShow" :bg="false">
		<div class="components-openbell">
			<div class="box" style="background:#2b2a2a; border: 10px solid #ccaa4a;">
				<img class="music-icon" src="../../images/music.png">
				<p class="title">提示</p>
				<div class="login-panel">
					<p>您还没开通炫铃功能，</p>
					<p> 是否开通？</p>
				</div>
				<a class="confirm-btn" style="background-repeat: no-repeat; background-size: 100% 100%;" @click="openbellCancel">取消</a>
				<a class="confirm-btn" style="background-repeat: no-repeat; background-size: 100% 100%;"  @click="openVip()">开通功能</a>
				
				<img class="close-img" src="../../images/x.png" @click="openbellClose">
			</div>
		</div>
	</modal>
</template>
 
<script>
	import modal from './modal/Modal.vue'
	import sapi from '../../../../service/index'
	import Statistics from '../../statistics.js'
	import urlUtil from '../../../../utils/url.js'
	export default{
		components: {
			modal
		},
		data(){
			return{
				tip:"",
				
				
				timeflag:'获取验证码',
				codeing:false,
				sectionIndex:''
				
			}
		},
		props: {
			openbellShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
		watch:{
			 loginShow(value) {
                if(value){
                    this.sectionIndex = JSON.parse(sessionStorage.getItem('sectionIndex'));
                    console.log(this.sectionIndex);
                   
                }
            },
		},
		ready(){
			
		},
		methods:{
			openVip(){
				var that=this;
				that.$dispatch('loading', {
					name: 'openRing',
					icon: true,
					text: '请稍候...',
					show: true,
					duration: 30 * 1000
				});
					// 开通炫铃功能
				sapi.openRingAccount(this, {
					pe_appid: window.pe_appid,
					pe_appkey: window.pe_appkey
				}, (back) => {
					that.$dispatch('cancelloading','openRing');
					this.openbellShow = false
					if (back.rescode == '0') {
						
						// 修改本地cookie
						utils.addcookie('cn.easier.gsu.ring.member', 'true')

						// 显示订购炫铃
						this.$root.orderbell = true;

					} else {

						this.$dispatch('handle_server_error', back);
					}
				})

				this.pvLog('page'+this.sectionIndex+'_open');
				Statistics.homePage('page'+this.sectionIndex+'_open','click');
			},
			//取消
			openbellCancel(){
				this.pvLog('page'+this.sectionIndex+'_cancel1');
				Statistics.homePage('page'+this.sectionIndex+'_cancel1','click');
				this.openbellShow = false;

			},
			//关闭
			openbellClose(){
				this.pvLog('page'+this.sectionIndex+'_close2');
				Statistics.homePage('page'+this.sectionIndex+'_close2','click');
				this.openbellShow = false;
			},
			//数据统计
			pvLog(gateModel){
        		sapi.pvLog(this,{gateModel:gateModel,channelld:urlUtil.getArgsFromUrl('channle'),browserClient:window.navigator.userAgent},(back)=>{

        				})
        	}
		}
	}
</script>
