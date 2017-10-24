<template>
	<modal :show.sync="vipfailShow" :bg="false">
		<div class="components-vipfail">
			<div class="box" style="background: #fffbf1; border-radius: 20px;">
				<p class="title">提示</p>
				<div class="">
					<img :src="'i/images/lele.png'" style="display: inline-block; vertical-align: middle;">
					<p class="success-panel">{{tip1}}</p>
				</div>
				
				<a style="background: url('./i/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipfailShow = false">确定</a>
				<img class="close-img" :src="'i/images/sp-close.png'" @click="vipfailShow = false">
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
				tip1:"订购失败，请重试（如重试后订购失败，可关注沃音乐微信womusic999留言，联系小沃查询异常哦）",
				
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
		ready(){
			
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
			.success-panel{
				 line-height: 40px;
			    font-size: 30px;
			    display: inline-block;
			    width: 60%;
			    padding: 30px 0;
			    vertical-align: middle;

			}
			.confirm-btn{
				display: block;
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