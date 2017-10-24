<template>
	<modal :show.sync="vipfailShow" :bg="false">
		<div class="components-vipfail">
			<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
			<div class="box" style="background: #fff; border-radius: 20px; border: 10px solid #fbb03b;">
				<p class="title">提示</p>
				<div class="">
					<p class="success-panel">{{tip2}}{{tip1}}</p>
				</div>
				
				<a style="background: url('./m/images/sure-btn.png') center center no-repeat;" class="confirm-btn" @click="vipfailShow = false"></a>
				<img class="close-img" :src="'m/images/close.png'" @click="vipfailShow = false">
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
					console.log(this.tip2);
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
		    color: #fbb03b;
			.title{
				font-size: 60px;
				line-height: 80px;
				color: #fbb03b;
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
			.confirm-btn{
				display: block;
				width: 254px;
				height: 89px;
				margin: 25px auto 0 auto;
				line-height: 89px;
				font-size: 30px;
				text-align: center;
				color: #000;
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
	// 	margin: 160px 60px;
	// }
</style>