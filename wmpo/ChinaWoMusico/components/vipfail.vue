<template>
	<modal :show.sync="vipfailShow" :bg="false">
		<div class="components-vipfail">
			
			<div class="box text-center" style="background-image: url('./o/images/wen.jpg'); background-repeat-y: repeat; border: 10px solid #f62a32; border-radius: 20px;">
				<p class="title">提示</p>
				<div style="padding: 50px 0;">
					<p class="text1" style="width:100%;">{{tip2}}</p>
					<p class="text1">（如重试后订购失败， 可关注沃音乐微信 <span> womusic999</span>留言， 联系小沃查询异常哦） </p>
					<!-- <p class="text1" v-if="ispass == 'false'">暂无抽奖机会，请先通关。</p> -->
					<img style="vertical-align: middle;" :src="'./o/images/lele-cry.png'" alt="">
				</div>
				<a style="background: url('./o/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipfailShow = false">确<span style="font-family: none;">&nbsp;</span>认</a>
				<img class="close-img" :src="'o/images/close.png'" @click="vipfailShow = false">
				<img class="bottom" :src="'o/images/wen-bottom1.png'" />
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
				tip1:"（如重试后订购失败，可关注沃音乐微信womusic999留言，联系小沃查询异常哦）",
				tip2:'',
				test:'',
			}
		},
		props: {
			vipfailShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			vipfailShow(value) {
				if(value){
					this.tip2 = sessionStorage.getItem('failResMsg')? sessionStorage.getItem('failResMsg') : '';
				}
			}
		},
		ready(){
			this.tip2 = sessionStorage.getItem('failResMsg');
		},
		methods:{
			
		}
	}
</script>

<style lang="sass">
	.components-vipfail{
		width: 100%;
		
		.box{
			position:relative;
			padding: 30px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			// width: 640px;
		    text-align: center;
		   
			.title{
				font-size: 60px;
				line-height: 80px;
				
				text-align: center;
				font-weight: 600;
				
			}
			.success-panel{
				line-height: 50px;
			    font-size: 38px;
			    display: inline-block;
			    width: 90%;
			    padding: 30px 0;
			    vertical-align: middle;

			}
			
			.text1{
				width: 50%;
				display: inline-block;
			    font-size: 35px;
			    vertical-align: middle;
			    font-weight: 600;
			    span{
			    	color: #b42828;
			    }
			}
			
		}
	}
	// .modal.modal-transition .modal-dialog{
	// 	margin: 160px 60px;
	// }
</style>