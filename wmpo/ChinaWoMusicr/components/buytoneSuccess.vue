<template>
	<modal :show.sync="buytoneSuccessShow" :bg="false">
		<div class="components-vipsuccess">
			<div class="box text-center" style="background-image: url('./r/images/modal-bg1.jpg'); background-size: 100% 100%;">
				<p class="title">提示</p>
				<div class="">
					<!-- <img :src="'i/images/lele.png'" style="display: inline-block; vertical-align: middle;"> -->
					<p class="success-panel">歌曲已设置为默认炫铃，可登录沃音乐官网“个人中心”查看或更换</p>
				</div>
				<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="buytoneSuccess">确<span style="font-family: none;">&nbsp;</span>认</a>
				<img class="close-img" :src="'r/images/close.png'" @click="buytoneSuccessShow = false">
				
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
            return {
                tip: "1",
                tip1: "5",
            }
        },
        props: {
            buytoneSuccessShow: {
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
        	addOperLog(type, btnName) {
				api.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source': source
				}, (back) => {})
			},
            buytoneSuccess(){
            	var that = this;
            	that.addOperLog('button','a-buySuccess');
            	router.go('home');
            	that.buytoneSuccessShow = false;
            }
        }
    }
</script>

<style lang="sass">
	.components-vipsuccess{
		width: 100%;
		
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			
			.title{
				font-size: 52px;
				line-height: 60px;
				
				text-align: center;
				font-weight: 600;
				
			}
			.success-panel{
				 line-height: 40px;
			    font-size: 30px;
			    display: inline-block;
			    width: 100%;
			    padding: 30px 0;
			    vertical-align: middle;

			}
			
			
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 160px 30px !important;
	}
</style>