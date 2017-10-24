<template>
	<modal :show.sync="highgouShow" :bg="false">
		<div class="components-highhou">
			<div class="box" style="background: url('./p/images/modal-bg.png') center center no-repeat;  background-size: 100% 100%;">
				<p class="title">提示</p>
				<div class="con">
					<p>歌曲已设置为默认炫铃，可登录沃音乐官网“个人中心”查看或更换</p>
				</div>
				<a style="background: url('./p/images/btn-bg1.png') center center no-repeat;" class="confirm-btn" @click="submit">确定</a>
				<a style="background: url('./p/images/btn-bg2.png') center center no-repeat; margin-left: 50px;" class="confirm-btn" @click="personCenter">个人中心</a>
				<img class="close-img" :src="'p/images/close.png'" @click="highgouShow = false">
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
			submit() {
				this.$dispatch('addOperLog', 'button', 'CRBT-queren');
				this.highgouShow = false;
			},
			
			personCenter(){
				this.$dispatch('addOperLog', 'button', 'personCenter');
				location.href = 'http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=01000d81593d2bf801593f1bfdf60691&from=singlemessage&isappinstalled=1';
			}

			
		}
	}
</script>

<style lang="sass">
	.components-highhou{
		width: 100%;
		.box{
			position:relative;
			padding: 150px 80px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			width: 640px;
		    height: 680px;
		    text-align: center;
		    color: #fff;
			.title{
				font-size: 40px;
				line-height: 46px;
				color: #333;
				text-align: center;
				font-weight: 600;
				
			}
			.con{
			    font-size: 40px;
			    line-height: 1.5;
			    padding: 50px 0;
			    color: #ec3131;
			}
			.link{
		  		word-break: break-all;
		  		color: #e60012;
		  		font-size: 32px;
		  	}
		  	.confirm-btn{
				display: inline-block;
				width: 208px;
				height: 89px;
				margin: 75px auto 0 auto;
				line-height: 89px;
				font-size: 40px;
				text-align: center;
				color: #fff;
				background-color: #98ce2e;
				border-radius: 25px;
				font-weight: 600;
				
			}
			.close-img{
				position: absolute;
				right: 20px;
				top: 20px;
				max-width: 77px;
    			max-height: 77px;
			}
			
		}
	}
	// .modal.modal-transition .modal-dialog{
	// 	margin: 50px 30px !important;
	// }
</style>