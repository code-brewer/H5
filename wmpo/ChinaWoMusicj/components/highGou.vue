<template>
	<modal :show.sync="highgouShow" :bg="false">
		<div class="components-highhou">
			<div class="box" style="background: #fffbf1; border-radius: 20px;">
				<img class="high-shop" style="padding-top: 40px;" :src="'j/images/high-shop1.png'">
				<img class="high-shop" @click="jdHighGou" :src="'j/images/high-shop3.jpg'">
				<img class="high-shop" :src="'j/images/high-shop2.png'">
				<img class="high-shop" :src="'j/images/coupon1.png'" @click="coupon(100)">
				<img class="high-shop" :src="'j/images/coupon2.png'" @click="coupon(50)">
				<img class="high-shop" :src="'j/images/coupon3.png'" @click="coupon(5)">
				<img class="close-img" :src="'j/images/sp-close.png'" @click="highgouShow = false">

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
			addOperLog(type,btnName) {
				api.addOperLog(this, {
					'aid':aid,
					'type':type,
					'button_name':btnName,
					'source':source
				}, (back) => {})
			},
			coupon(index){
				if(index == 100){
					this.addOperLog('button','coupon100');
					sessionStorage.setItem("coupon",100);
					this.$root.coupon = true;
				}
				else if(index == 50){
					this.addOperLog('button','coupon50');
					sessionStorage.setItem("coupon",50);
					this.$root.coupon = true;
				}
				else if(index == 5){
					this.addOperLog('button','coupon5');
					sessionStorage.setItem("coupon",5);
					this.$root.coupon = true;
				}
			},
			jdHighGou(){
				this.addOperLog('button','jdHighGou');
				location.href = 'http://wq.jd.com/mshop/jdpromotion?shopid=604162&key=41082691jnsosoechode0&venderid=611204&pTag=7136.1.1';
			}

			
		}
	}
</script>

<style lang="sass">
	.components-highhou{
		width: 100%;
		.box{
			position:relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #4e140c;
			text-align: center; 
			.high-shop{
				max-width: 100%;
				padding : 10px 0;
			}
			.close-img{
				position: absolute;
				right: 10px;
				top: 10px;
				max-width: 56px;
				max-height: 50px;
			}
			
		}
	}
	.modal.modal-transition .modal-dialog{
		margin: 50px 30px !important;
	}
</style>