<template>
	<modal :show.sync="alreadyprizeShow" :bg="false">
		<div class="components-already-prize">
			<div class="box" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #f62a32; border-radius: 20px;">
				<p class="title">提示</p>
				<!-- <div style="text-align: center; padding: 15px 0;">
					<img :src="'k/images/award-success.png'" style="vertical-align: middle;">
				</div> -->
				<p class="success-panel">{{tip1}}</p>
				
				<a style="background: url('./o/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="alreadyPrize">返回首页</a>
				<img class="close-img" :src="'o/images/close.png'" @click="alreadyprizeShow = false">
				<img class="bottom" :src="'o/images/wen-bottom1.png'" />
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
				tip1:"亲，你已拿过奖品啦~它藏在首页【我的奖品】里，快去带走吧~",
				
			}
		},
		props: {
			alreadyprizeShow: {
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
			alreadyPrize(){
				var that = this;
				that.addOperLog('button','a-returnHome');
				router.go('home');
				that.alreadyprizeShow = false;
			}
		}
	}
</script>

<style lang="sass">
	.components-already-prize{
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
	.modal.modal-transition .modal-dialog{
		margin: 160px 30px;
	}
</style>