<template>

	<div class="app-view home-page">

		<section class="section-home" v-show="!(showMsg || showTimeOut)">
	         <div class="main-bg">	
	         	<img :src="'images/m-bg.png'">
	         </div>
	         <div class="logo">
	         	<img :src="'images/liantong.png'">
	         	<!-- <p>手机营业厅</p> -->
	         </div>
	         <div class="myprize">
	         	<img :src="'images/m-myprize.png'" @click="sessionStorage.getItem('login') ? showMyPrize=true  :alertLogin = true">
	         	<!-- <img :src="'images/m-myprize.png'" @click="alertLogin = true"> -->
	         </div>
	         <!-- <div class="music-panel">	
	         	<img :src="musicBg" @click="stopMusic">
	         </div> -->
	         <!-- <p class="timer">2016年10月28日 - 2016年11月1日</p> -->
	         <p class="timer">已有{{playerAndPrize.player}}人参与活动</p>
	         <p class="timer" style="margin-top: 55px;">还有{{playerAndPrize.prize}}份奖品送出</p>
	         <div class="btn-panel">
	         	<img :src="'images/m-startGame.png'" @click="start()">
	         </div>
	         <div class="title-panel">
	         	<a @click="changeShowActivityD()">活动规则</a>
	         </div>
	         
   		</section>
   		<section v-show="showMsg || showTimeOut">
   			<div class="main-bg">	
	         	<img :src="'images/t-bg.jpg'">
	         </div>
   		</section>
   		<section class="model" v-show="showMsg" style="background: rgba(0,0,0,0.5)">
   			<div class="panel">
   				<div class="msg">
   					<div class="messagebg">
   						<h2>活动提示</h2>
   						<p style="margin-top: 30px;">请在6 秒内记住每一秒出现的图片<br>内容，6 秒后，准确猜中哪个图片<br>是联通手机营业厅的服务功能即可<br>获得领奖机会。</p>
   						<!-- <p>请在6秒内记住每一秒出现的图片内</p>
   						<p>容，6秒后，准确猜中哪个图片是联</p>
   						<p>通手机 营业厅的服务功能即可获得</p>
   						<p>领奖机会。</p> -->
   						<a class="btn"  @click="showTimeOutPanel()" style="background: url(images/btnbg.png)">
							确定
		   				</a>
		   				<img :src="'images/xx.png'" @click="showMsg = false" class="close">
   					</div>
   				</div>
   				
   			</div>
   			
   		</section>
   	<!-- 	<section class="model"  style="background: rgba(0,0,0,0.5)" v-if = "showMyPrize">
   			<div class="panel">
   				<div class="msg">
   					<div class="messagebg">
   						<h2>我的奖品</h2>
   						<ul>
   							<li><span class="rank">1</span><img src="images/liuliang30.png"></li>
   						</ul>
   						<p>我们将会在两个工作日内</p>
   						<p style="padding-bottom: 45px;">为您充值，请注意查收！</p>
		   				<img :src="'images/xx.png'" @click="showMyPrize = false" class="close">
   					</div>
   				</div>
   				
   			</div>
   			
   		</section> -->
   		<prize1 v-if = "showMyPrize" :show-my-prize.sync ="showMyPrize"></prize1>
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
	<address :show-address.sync="alertLogin" :show-my-prize.sync ="showMyPrize"></address>
 		
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
		// style="background:url(images/t-bg.jpg) center center; background-size: auto 100%;"
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
	    		.messagebg {
		    		p {
		    			line-height: 40px;
					    text-align: center;
					    padding: 0;
					    padding-bottom: 20px;
		    		}
		    		ul {
		    			padding-left: 40px;
		    		}
		    		li {
		    			position: relative;
		    			text-align: center;
		    			margin: 20px 0 ;
		    		}
		    		.rank {
		    			position: absolute;
		    			line-height: 30px;
		    			left: 0;
    					top: 0;
		    			font-size: 23px;
		    			text-align: center;
		    			width: 40px;
		    			height: 40px;
		    			border-radius: 20px;
		    			box-sizing: border-box;
		    			border: 5px solid #646363;


		    		}
		    	}
		    	position: absolute;
			    top: 20%;
			    text-align: center;
			    left: auto;
			    width: 100%;
			    div{
		    	   color: #000;
				    width: 90%;
				    position: absolute;
				    top: 18%;
				    left: 5%;
				    font-size: 32px;
				    background-color: #fed141;
				    // background-color: rgba(0,0,0,0.85);
				    border: 10px solid #fff;
				    border-radius: 40px;
				    text-align: left;
				    position: relative;
				    h2{
				    	padding: 20px 0 0 25px;
				    	font-size: 38px;
    					text-align: center;
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
			     height: 82px;
			    display: block;
			    width: 210px;
			    // background-size: 300px 106px !important;
			    color: white;
			    font-size: 87px;
			    text-align: center;
			    // line-height: 87px;
			        line-height: 71px;
			        font-size: 35px;
			    // text-shadow: 0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801;
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
		    top:68%;
		    margin-left: -142px;

		    img{
		  	 width: 284px;
		    }	
     }.title-panel{
     	position: absolute;
	    top: 90%;
	    text-align: center;
	    width: 100%;
		a{
			color: #fff;
		    // font-size: 40px;
		    font-size: 35px;
		    // font-weight: bold;
		    text-decoration: underline;
		    text-shadow: 0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000,0px 0px 5px #000;
		}
     }
     .timer{
     	    position: absolute;
		    top: 52%;
		    // left: 50%;

		    // margin-left: -122.5px;
		    width: 100%;
		    text-align: center;
		    color: #fff;
		    font-size: 32px;
		     // text-shadow: 0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89;
		     text-shadow: 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000, 0px 0px 5px #000,0px 0px 10px #004a89;
     }
	}
	.modal {
		.modal-content{
	    	overflow: inherit !important;
	    }
	}
	.myprize {
		    position: absolute;
		    right: 20px;
		    top: 25px;
	}
</style>
<script>

	import {router} from './index'
	import sapi from './utils/serverapi.js'
	export default {
		components:{
			address: require('./receive-address.vue'),
			prize1: require('./components/myPrize1.vue'),
		},
		props: {
			playerAndPrize: {
				type: Object,
			},
		},
	 	data(){
	 		return{
	 			showTimeOut:false,
	 			sessionStorage : window.sessionStorage,
	 			showMsg:false,
	 			timeFlag:3,
	 			musicBg: 'images/music.png',
	 			showMsgTime: false,
	 			alertLogin: false,//登录弹窗
	 			hasLogin : false,//有没有登录,有登录为true,直接显示我的奖品
	 			showMyPrize : false,
	 			// myprizeImg:[
     //            {"itemimg":"images/liuliang30.png","index":1,"seq":"二","title":"30M"},
     //            {"itemimg":"images/chadian.png","index":2,"seq":"不中奖选项","title":"还差一点就抽中啦","haveprize":true},
     //            {"itemimg":"images/shiyuan.png","index":4,"seq":"五","title":"10yuan"},
     //            {"itemimg":"images/liuliang50.png","index":7,"seq":"八","title":"50M"},
     //            {"itemimg":"images/wuyuan.png","index":7,"seq":"八","title":"5yuan"},
     //           ],
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
	 		// clickMyPrize () {
	 		// 	sessionStorage.getItem('login') ? showMyPrize=false  :alertLogin = true
	 		// },
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