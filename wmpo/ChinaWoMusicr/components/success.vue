<template>
	<modal :show.sync="successShow" :bg="false">
		<div class="components-success">
			<div class="box" style="background-image: url('./r/images/modal-bg1.jpg'); background-size: 100% 100%;">
				<p class="title">领取成功</p>
				<!-- <div style="text-align: center; padding: 15px 0;">
					<img :src="'k/images/award-success.png'" style="vertical-align: middle;">
				</div> -->
				<p class="success-panel">{{tip1}}</p>
				<a style="background: url('./r/images/blue-btn-bg.png') center center no-repeat; display: inline-block; vertical-align: middle; width: 228px; background-size: 100%;" class="confirm-btn" @click="ring()">爱的铃音</a>
				<a style="background: url('./r/images/btn-bg.png') center center no-repeat; display: inline-block; vertical-align: middle; width: 228px; background-size: 100%;" class="confirm-btn" @click="success()">更多活动</a>
				<img class="close-img" :src="'r/images/close.png'" @click="successShow = false">
				
			</div>
		</div>
	</modal>
</template>

<script>
	import modal from './../modal/Modal.vue'
	import api from './../utils/serverapi.js'
	import {
		router
	} from './../index'
	export default{
		components: {
			modal
		},
		data(){
			return{
				tip:"",
				tip1:"奖品将在活动结束后15个工作日内发放，请留意客服电话回访。现在还可订购热门元宵铃音，酷炫铃声伴你庆团圆。",
				
			}
		},
		props: {
			successShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
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
			success(){
				var that = this;
				that.addOperLog('button','a-addSuccess');
				that.successShow = false;
				location.href = "http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=01000d81593d2bf801593f1bfdf60691&from=singlemessage&isappinstalled=1";
			},
			ring(){
				this.addOperLog('button','a-ring');
				this.successShow = false;
				router.go('bells');
			},
		}
	}
</script>

<style lang="sass">
	.components-success{
		width: 100%;
		
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			.title{
				font-size: 52px;
				line-height: 90px;
				text-align: center;
				font-weight: 600;
				
			}
			.success-panel{
			    line-height: 40px;
			    font-size: 30px;
			    display: inline-block;
			    width: 100%;
			    padding: 35px 35px 0 35px;
			    text-align: left;
			    vertical-align: middle;

			}
			
			
		}
	}
	
</style>