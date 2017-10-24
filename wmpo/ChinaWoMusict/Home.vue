<template>
	<div class="app-view home-page" style="">
		<div class="main-bg">
			<img :src="'t/images/home-bg.jpg'" style="width: 100%; height:100%; ">
		</div>
		<!-- <div class="logo">
			<p>联通</p>
			<p>沃音乐</p>
		</div> -->
		<!-- <div class="text">
			<p>即日起至1月10日，在活动页面中开通沃音乐会员，首月会员资费 可免，还可领取50M流量！ </p>
		</div> -->
		<!-- <div class="text-t">
			<p>温馨提示：</p>
			<p>1、活动期间，新用户开通可享受首月免会员资费优惠。</p>
			<p>2、流量赠送仅限新开通会员用户，50M联通流量将在开通后72小时
   内到账</p>
			
			<p>3、如有疑问，可关注沃音乐微信<span>womusic999</span>留言。</p>
			 
		</div> -->
		
		<!-- <div class="logo">
			<p>联通</p>
			<p>沃音乐</p>
		</div> -->
		<div class="btn" @click="loginTrue">
			<img :src="'t/images/home-btn.png'" >
		</div>
	</div>

</template>

<style lang="sass">
	.app-view.home-page{
		background: #fff5e9;
		.main-bg{
			position: absolute;
			width: 100%;
			height: 100%;
		}
		.btn{
		    position: absolute;
		    // bottom: 3%;
		    top: 90%;
		    left: 50%;
		    margin-left: -152px;
		}
		.logo{
			color: #e16a0e;
		    font-size: 35px;
    		text-align: center;
    		top: 40px;
    		font-weight: 600;

		}
	}
	.text{
		// position: absolute;
		// top: 58%;
		// width: 90%;
		// left: 5%;
		// color: #a73124;
		// font-size: 28px;
		// font-weight: 600;
		    position: absolute;
    top: 68%;
    width: 90%;
    left: 5%;
    color: #a73124;
    font-size: 25px;
    font-weight: 600;
		p{
			line-height: 25px;
		}

	}
	.text-t{
	    // position: absolute;
	    // top: 66%;
	    // width: 90%;
	    // left: 5%;
	    // color: #a73124;
	    // font-size: 26px;
	    // font-weight: 600;
	        position: absolute;
    top: 74%;
    width: 90%;
    left: 5%;
    color: #a73124;
    font-size: 18px;
    font-weight: 600;
    span{
			color: #ff1a01;
		}
		p{
			line-height: 22px;
		}
	}
</style>
<script>
	import {
		router
	} from './index'
	import sapi from './utils/serverapi.js'
	export default {
		components: {},
		data() {
			return {
				
			}
		},
		 watch: {
          
          
        },
		ready() {
			// this.addOperLog('button','signin');
		},

		methods: {
			addOperLog(type,btnName) {
				sapi.addOperLog(this, {
					'aid':aid,
					'type':type,
					'button_name':btnName,
					'source':source
				}, (back) => {})
			},
			
			loginTrue(){
				this.addOperLog('button','home-vip');
				if(!this.$root.islogin){
					this.$root.login = true;
				}else{

					if(this.$root.cookieVip !='0000000000'){
						this.$root.openvip = true;	
					}else{
						this.$root.highgou = true;
					}
				}
			},
					
			
		}
	}
</script>