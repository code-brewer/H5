<template>
	<modal :show.sync="orderbellShow" :bg="false">
		<div class="components-orderbell">
			<div class="box" style="background:#2b2a2a; border: 10px solid #ccaa4a;">	
				<img class="music-icon" src="../../images/music.png">
				<p class="title">提示</p>
				<div class="con">
					<p>是否确认订购此炫铃？</p>
					<p style="color:#ccaa4a;">{{$root.buySong}}</p>
					<p>资费：2元/首（会员免费）</p>
				</div>
				<a class="confirm-btn" style="background-repeat: no-repeat; background-size: 100% 100%;" @click="orderbellCancel">取消</a>
				<a class="confirm-btn" style="background-repeat: no-repeat; background-size: 100% 100%;" @click="sureBuyLing">订购</a>
				<img class="close-img" src="../../images/x.png" @click="orderbellClose">
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
				tip1:"复制链接，使用手机浏览器访问，即可领取优惠券进入沃音乐商城使用",
				type:'',
				sectionIndex:''
				
			}
		},
		props: {
			orderbellShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			 loginShow(value) {
                if(value){
                    this.sectionIndex = JSON.parse(sessionStorage.getItem('sectionIndex'));
                    console.log(this.sectionIndex);
                   
                }
            },
		},
		ready(){
			this.type = sessionStorage.getItem('coupon');
			
		},
		methods:{
			//订购铃音
			sureBuyLing(){
				var that = this;
				that.$dispatch('loading', {
					name: 'buyTone',
					icon: true,
					text: '请稍候...',
					show: true,
					duration: 30 * 1000
				});
				var body = {
					toneId: that.$root.buySongId,
					toneType: 1,
					pe_appid: window.pe_appid,
					pe_appkey: window.pe_appkey
				};

				sapi.buyTone(this, body, (back) => {
					that.$dispatch('cancelloading','buyTone');
					if (back.resCode == '0') {  
						that.$root.orderbell = false;
						that.$root.ordersuccess = true;
					} else { 
						that.$root.orderbell = false;
						that.$root.orderfail = true;
						sessionStorage.setItem('failReason',back.resMsg);
					}
				})
				that.pvLog('page'+that.sectionIndex+'_order2');
				Statistics.homePage('page'+that.sectionIndex+'_order2','click',that.$root.buySongId);
			},
			//取消
			orderbellCancel(){
				this.pvLog('page'+this.sectionIndex+'_cancel2');
				Statistics.homePage('page'+this.sectionIndex+'_cancel2','click');
				this.orderbellShow = false;

			},
			//关闭
			orderbellClose(){
				this.pvLog('page'+this.sectionIndex+'_close3');
				Statistics.homePage('page'+this.sectionIndex+'_close3','click');
				this.orderbellShow = false;
			},
			//数据统计
			pvLog(gateModel){
        		sapi.pvLog(this,{gateModel:gateModel,channelld:urlUtil.getArgsFromUrl('channle'),browserClient:window.navigator.userAgent},(back)=>{

        				})
        	}
		}
	}
</script>
