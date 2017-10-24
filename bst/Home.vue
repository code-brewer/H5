<template>
	<div class="app-view home-page">
		<section class="section-home">
	         <div class="main-bg">	
	         	<img :src="'images/t-home-bg.jpg'">
	         </div>
	         <div class="logo">
	         	<img :src="'images/t-logo.png'">
	         </div>
	         <!-- <div class="music-panel">	
	         	<img :src="musicBg" @click="stopMusic">
	         </div> -->
	         <p class="timer">2016年10月28日 - 2016年11月1日</p>
	         <div class="btn-panel">
	         	<img :src="'images/t-start-btn.png'" @click="start()">
	         </div>
	         <div class="title-panel">
	         	<a @click="changeShowActivityD()">游戏攻略</a>
	         </div>
	         
   		</section>
   		<section class="model" v-show="showMsg">
   			<div class="panel">
   				<div class="msg">
   					<div>
   						<h2>活动提示：</h2>
   						<p>请在10秒内记住每1秒出现的图片内容， 10秒过后，准确猜中哪项查询功能在以上图片中是没有出现的，即可获得抽奖机会！分享可增加一次抽奖机会哟！</p>
   						<a class="btn"  @click="showTimeOutPanel()" style="background: url(images/t-start-btn.png)">
							
		   				</a>
		   				<img :src="'images/t-close.png'" @click="showMsg = false" class="close">
   					</div>
   				</div>
   				
   			</div>
   			
   		</section>
   		<section class="model" v-show="showMsgTime" style="background: rgba(0,0,0,0.5)">
   			<div class="panel">
   				<div class="msg" style="height: 300px; line-height: 200px; ">
   					<div style="text-align: center;">
   						<h2>活动已结束</h2>
   						
		   				<img :src="'images/t-close.png'" @click="showMsgTime = false" class="close">
   					</div>
   				</div>
   				
   			</div>
   			
   		</section>
   		<section class="model" style="background-color: rgba(0,0,0,0.7);" v-show="showTimeOut">
			<div class="timeout-panel">
			 		<div class="msg" style="background: url(images/timeout-bg.png);">
						{{timeFlag}}
					</div>
			</div>			
 	   </section>
 		</login>
 		
	</div>

</template>

<style lang="sass">
	.model{
	    width: 100%;
	    height: 100%;
	    position: fixed;
	    top: 0;
	    // background-color: rgba(0,0,0,0.7);
	    z-index: 99;

	    .timeout-panel{
	    	text-align: center;
		    position: absolute;
		    width: 100%;
		    top: 340px;
	    	.msg{
	    	    background-repeat: no-repeat!important;
			    background-position-x: 50%!important;
			    background-position-y: 50%!important;
	    		width: 100%;
			    position: absolute;
			    top: 50%;
			    padding: 43px 0;
				font-size: 207px;
			    margin-top: -120px;
			    color: #000;
			    font-weight: bold;
			    text-shadow: 0px 0px 10px #000,0px 0px 10px #000,0px 0px 10px #000,0px 0px 10px #000,0px 0px 10px #000,0px 0px 10px #000,0px 0px 10px #000,0px 0px 10px #000,0px 0px 10px #000,0px 0px 10px #000,0px 0px 10px #000;
	    		
	    	}
	    }
	    .panel{
	    	.msg{
		    	position: absolute;
			    top: 20%;
			    text-align: center;
			    left: auto;
			    width: 100%;
			    div{
		    	   color: #fff;
				    width: 90%;
				    position: absolute;
				    top: 18%;
				    left: 5%;
				    font-size: 32px;
				    background-color: rgba(0,0,0,0.85);
				    border: 10px solid #fff;
				    border-radius: 15px;
				    text-align: left;
				    position: relative;
				    h2{
				    	padding: 20px 0 0 25px;
				    }
				    .close{
				    	position: absolute;
				    	top:-30px;
				    	right: -20px;
				    }
				}
				p{
				    background-size: 100% 100%!important;
				    padding: 5%;
				    line-height: 50px;

	    		}
		    }.btn{
			     height: 106px;
			    display: block;
			    width: 300px;
			    background-size: 300px 106px !important;
			    color: white;
			    font-size: 87px;
			    text-align: center;
			    line-height: 87px;
			    text-shadow: 0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801;
			    background-repeat: no-repeat!important;
			    margin: 30px auto;
		    }

	    }
	}
	@keyframes roll{
		0%{transform: rotate(0deg)}
		100%{transform: rotate(360deg)}
	}
	.section-home{
	 height: 100%;
	 background-size: auto 100%;
     background-repeat: no-repeat;
     .main-bg{
     	 position: absolute;
     	 width: 100%;
     	 height: 100%;
     	img{
     		width: 100%;
     		height: 100%;
     	}
     }.logo-panel{
     	    position: absolute;
		    left: 75%;
		    top: 2%;
		    img{
		    	width: 100%;
		    }
     }.music-panel{
     	    position: absolute;
		    left: 80%;
		    top: 8%;
		    font-size: 0;
		    animation: roll 5s linear infinite;
		    img{
		    width: 100%;	
		}
     }.btn-panel{
     	    position: absolute;
		    left: 50%;
		    top: 55%;
		    margin-left: -160px;

		    img{
		  	 width: 320px;
		    }	
     }.title-panel{
     	position: absolute;
	    top: 92%;
	    text-align: center;
	    width: 100%;
		a{
			color: #fff;
		    font-size: 40px;
		    font-weight: bold;
		    text-decoration: underline;
		    text-shadow: 0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000;
		}
     }
     .timer{
     	    position: absolute;
		    top: 50%;
		    left: 50%;
		    margin-left: -225px;
		    color: #fff;
		    font-size: 30px;
		     text-shadow: 0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89;
     }
	}
	.modal {
		.modal-content{
	    	overflow: inherit !important;
	    }
	}
</style>
<script>

	import {router} from './index'
	import sapi from './utils/serverapi.js'
	export default {
		components:{
		},
	 	data(){
	 		return{
	 			showTimeOut:false,
	 			showMsg:false,
	 			timeFlag:3,
	 			musicBg: 'images/music.png',
	 			showMsgTime: true,

	 		}
	 	},

	 	ready() {
		
		},

	 	methods:{
	 		changeShowActivityD(){
	 			console.log( this.$root.showActivityD);
	 			 this.$root.showActivityD=true;
	 		},
	 		start(){

 				if(!sessionStorage.getItem("showMsgFlag")){
 					sessionStorage.setItem("showMsgFlag",true);
 					this.showMsg=true;
 				}else{
 					this.showTimeOutPanel();
 				}
	 			
	 		},
	 		showTimeOutPanel(){
	 			this.showTimeOut=true;
	 			this.showMsg=false;
	 			var that=this;
	 			var timeout=setInterval(()=>{
	 				if(that.timeFlag==0){
	 					that.timeFlag=50;
	 					clearInterval(timeout);
	 					that.showTimeOut=false;
	 					router.go('guess');
	 				}else{
	 					that.timeFlag-=1;
	 				}
	 			},1000);
	 			
	 		}
	 	}
	}
</script>