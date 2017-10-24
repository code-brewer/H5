<template>
	<modal :show.sync="openvipShow" :bg="false">
		<div class="components-openvip">
			<div class="box text-center" style="background-image: url('./r/images/modal-bg1.jpg'); background-size: 100% 100%;">
				<p class="title">提示</p>
				<p style="padding: 30px;">沃音乐会员才有资格领奖噢！</p>
				<a style="background: url('./r/images/btn-bg.png') center center no-repeat; " class="confirm-btn" @click="openVipRightNow()">马上开通</a>
				<img class="close-img" :src="'r/images/close.png'" @click="openvipShow = false">
				
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
				
				
				timeflag:'获取验证码',
				codeing:false,
				
			}
		},
		props: {
			openvipShow: {
				type: Boolean,
				default: false
			},
			tipdef: {
				type: Boolean,
				default: true
			}
		},
        watch: {
            openvipShow(value) {
                if(value){
                    this.$root.vipInfo.mobile = localStorage.getItem('LoginMobile')? localStorage.getItem('LoginMobile') : '';
                    console.log(this.$root.vipInfo.mobile);
                }
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
			openVipRightNow(){
				this.addOperLog('button','a-vipOpen');
				this.openvipShow = false;
				this.$root.vipbenefit = true; 
			}
		}
	}
</script>

<style lang="sass">
	.graycode{
			-webkit-filter: grayscale(100%);
			-moz-filter: grayscale(100%);
			-ms-filter: grayscale(100%);
			-o-filter: grayscale(100%);

			filter: grayscale(100%);

			filter: gray;
			font-size: 40px!important;	
			// line-height: 2!important;
		}
	.components-openvip{
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
			color: #fff;
			.title{
				font-size: 52px;
				line-height: 46px;
				text-align: center;
				font-weight: 600;
			    padding: 25px;
    			// border-bottom: 2px solid #ffae00;
				
			}
		
			
		}
	}
	
</style>