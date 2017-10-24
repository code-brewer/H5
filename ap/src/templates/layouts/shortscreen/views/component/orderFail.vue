<template>
	<modal :show.sync="orderfailShow" :bg="false">
		<div class="components-orderfail">
			<div class="box" style="background:#2b2a2a; border: 10px solid #ccaa4a;">	
				<img class="music-icon" src="../../images/music.png">
				<p class="title">提示</p>
				<div class="con">
					<p class="success-panel">{{test}}{{tip1}}</p>
				</div>
				
				<a style="background-repeat: no-repeat; background-size: 100% 100%;" class="confirm-btn" @click="orderfailSure">确定</a>
				<img class="close-img" src="../../images/x.png" @click="orderfailClose">
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
				tip1:"请重试（如重试后订购失败，可关注沃音乐微信womusic999留言，联系小沃查询异常哦）",
				test:'',
				sectionIndex:''
				
			}
		},
		watch: {
			orderfailShow(value) {
				if(value){
					this.test = sessionStorage.getItem('failReason')? sessionStorage.getItem('failReason') : '';
					this.sectionIndex = JSON.parse(sessionStorage.getItem('sectionIndex'));
				}
			}
		},
		props: {
			orderfailShow: {
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
			//订购失败
			orderfailSure(){
				this.pvLog('page'+this.sectionIndex+'_sure2');
				Statistics.homePage('page'+this.sectionIndex+'_sure2','click');
				this.orderfailShow = false;

			},
			//关闭
			orderfailClose(){
				this.pvLog('page'+this.sectionIndex+'_close5');
				Statistics.homePage('page'+this.sectionIndex+'_close5','click');
				this.orderfailShow = false;
			},
			//数据统计
			pvLog(gateModel){
        		sapi.pvLog(this,{gateModel:gateModel,channelld:urlUtil.getArgsFromUrl('channle'),browserClient:window.navigator.userAgent},(back)=>{

        				})
        	}
		}
	}
</script>
