<template>
	<modal :show.sync="vipsuccessShow" :bg="false">
		<div class="components-vipsuccess">
			<!-- <img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
			<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right"> -->
			<div class="box" style="background: #fff; border-radius: 20px;">
				<p class="title">提示</p>
				<div class="">
					<!-- <img :src="'i/images/lele.png'" style="display: inline-block; vertical-align: middle;"> -->
					<p class="success-panel">开通会员成功，你已享有沃音乐会员权益， 现在还可参与会员新年福利抽奖哦！</p>
				</div>
				<a style="background: url('./n/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="saveMsg()">去抽奖</a>
				<img class="close-img" :src="'n/images/close.png'" @click="vipsuccessShow = false">
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
            return {
                tip: "1",
                tip1: "5",
            }
        },
        props: {
            vipsuccessShow: {
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
        methods: {
            saveMsg(){
                this.vipsuccessShow = false;
            },
        }
    }
</script>

<style lang="sass">
	.components-vipsuccess{
		width: 100%;
		.right{
			    position: absolute;
			    right: -20px;
			    top: -112px;
		}
		.left{
		    position: absolute;
		    left: -20px;
		    top: -112px;
		}
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #ffaf03;
			.title{
				font-size: 52px;
				line-height: 60px;
				color: #b42828;
				text-align: center;
				font-weight: 600;
				
			}
			.success-panel{
				 line-height: 40px;
			    font-size: 32px;
			    display: inline-block;
			    width: 90%;
			    padding: 30px 0;
		        margin-left: 5%;
			    vertical-align: middle;

			}
			.confirm-btn{
				display: block;
				width: 254px;
				height: 89px;
				margin: 35px auto;
				line-height: 83px;
				font-size: 30px;
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
				max-width: 56px;
				max-height: 50px;
			}
			
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 160px 30px;
	}
</style>