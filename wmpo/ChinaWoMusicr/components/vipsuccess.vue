<template>
	<modal :show.sync="vipsuccessShow" :bg="false">
		<div class="components-vipsuccess">
			<div class="box text-center" style="background-image: url('./r/images/modal-bg1.jpg'); background-size: 100% 100%;">
				<p class="title">提示</p>
				<div class="">
					<!-- <img :src="'i/images/lele.png'" style="display: inline-block; vertical-align: middle;"> -->
					<p class="success-panel">开通会员成功，你已享有沃音乐会员权益，可以使用通关道具和幸运抽奖，丰富奖品等你拿，继续游戏吧~</p>
				</div>
				<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" class="confirm-btn" @click="vipsuccess">确<span style="font-family: none;">&nbsp;</span>认</a>
				<!-- <img class="close-img" :src="'o/images/close.png'" @click="vipsuccessShow = false"> -->
				
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
                openvipListen:null,
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
            var rom = Math.round(Math.random());
            console.log('随机数：', rom)
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
			vipsuccess(){
				if(this.openvipListen){
 					this.openvipListen();
 					this.openvipListen = null;
 				}
				this.addOperLog('button','a-vipSuccess');
				this.vipsuccessShow = false;
			},
			//其他地方调此方法
			setOpenvipListen(listener){
				this.openvipListen = listener;
			},
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
	
</style>