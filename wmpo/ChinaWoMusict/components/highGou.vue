<template>
	<modal :show.sync="highgouShow" :bg="false">
		<div class="components-highhou">
		 	<div class="box" style="background: #ffed7d; border-radius: 20px; border: 10px solid #fc842a;">
				<p class="title">提示</p>
				<div class="con">
					<p>您已是沃音乐会员，</p>
					<p>无法参与本次活动。</p>
				</div>
				<a style="background: url('./t/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="highgouShow = false">关闭</a>
				
				<img class="close-img" :src="'t/images/close.png'" @click="highgouShow = false">
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
			
				
			}
		},
		props: {
			highgouShow: {
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
			addOperLog(type,btnName) {
				api.addOperLog(this, {
					'aid':aid,
					'type':type,
					'button_name':btnName,
					'source':source
				}, (back) => {})
			},
			
			// personCenter(){
			// 	this.addOperLog('button','personCenter');
			// 	location.href = 'http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=01000d81593d2bf801593f1bfdf60691&from=singlemessage&isappinstalled=1';
			// }

			
		}
	}
</script>

<style lang="sass">
	.components-highhou{
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
		    color: #8f1225;
			.title{
				font-size: 60px;
				line-height: 80px;
				color: #8f1225;
				text-align: center;
				font-weight: 600;
				
			}
			.con{
			    font-size: 50px;
			    line-height: 60px;
			    padding: 50px 0;
			}
			.success-panel{
				line-height: 50px;
			    font-size: 38px;
			    display: inline-block;
			    width: 60%;
		        padding: 30px 0 10px;
			    vertical-align: middle;
			    font-weight: 600;

			}
			.link{
		  		word-break: break-all;
		  		color: #e60012;
		  		font-size: 32px;
		  	}
		  	.confirm-btn{
				display: inline-block;
				width: 273px;
				height: 89px;
				margin: 25px auto 0 auto;
				line-height: 89px;
				font-size: 45px;
				text-align: center;
				color: #fff;
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
	// .modal.modal-transition .modal-dialog{
	// 	margin: 50px 30px !important;
	// }
</style>