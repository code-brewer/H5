<template>
	<modal :show.sync="ordersuccessShow" :bg="false">
		<div class="components-ordersuccess">
			<div class="box" style="background:#2b2a2a; border: 10px solid #ccaa4a;">	
				<img class="music-icon" src="../../images/music.png">
				<p class="title">提示</p>
				<div class="con">
					<p style="font-size: 28px;">订购成功</p>
					<p style="color:#ccaa4a;">（登陆沃音乐官网“个人中心”可设置炫铃哦） </p>
				</div>
				<a style="background-repeat: no-repeat; background-size: 100% 100%;" class="confirm-btn" @click="ordersuccessSure">确定</a>
				<a style="background-repeat: no-repeat; background-size: 100% 100%;" class="confirm-btn" @click="personCenter">个人中心</a>
				<img class="close-img" src="../../images/x.png" @click="ordersuccessClose">
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
				sectionIndex:''
				
			}
		},
		props: {
			ordersuccessShow: {
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
			ordersuccessShow(value) {
                if(value){
                    this.sectionIndex = JSON.parse(sessionStorage.getItem('sectionIndex'));
                    console.log(this.sectionIndex);
                   
                }
            },
		},
		methods:{
			//个人中心
			personCenter(){
				this.pvLog('page'+this.sectionIndex+'_personal');
				Statistics.homePage('page'+this.sectionIndex+'_personal','click');
				location.href = 'http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=01000d81593d2bf801593f1bfdf60691&from=singlemessage&isappinstalled=1';
				
			},
			//确定
			ordersuccessSure(){
				this.pvLog('page'+this.sectionIndex+'_sure1');
				Statistics.homePage('page'+this.sectionIndex+'_sure1','click');
				this.ordersuccessShow = false;

			},
			//关闭
			ordersuccessClose(){
				this.pvLog('page'+this.sectionIndex+'_close4');
				Statistics.homePage('page'+this.sectionIndex+'_close4','click');
				this.ordersuccessShow = false;
			},
			//数据统计
			pvLog(gateModel){
        		sapi.pvLog(this,{gateModel:gateModel,channelld:urlUtil.getArgsFromUrl('channle'),browserClient:window.navigator.userAgent},(back)=>{

        				})
        	}

			
		}
	}
</script>

