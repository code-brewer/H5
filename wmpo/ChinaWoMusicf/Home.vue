<template>
	<div class="app-view home-page">
		<section class="section-home">
	         <div class="main-bg">	
	         	<img :src="'f/images/sp-home-bg.jpg'">
	         </div>
	         <div class="logo">
	         	<img :src="'f/images/logo.png'">
	         </div>
	         <!-- <div class="music-panel">	
	         	<img :src="musicBg" @click="stopMusic">
	         </div> -->
	         <div class="btn-panel">
	         	<a @click="start()" class="wap-button yellow">我要拼歌单</a>
	         </div>
	         <div class="title-panel">
	         	<a @click="changeShowActivityD()" class="left">活动规则</a>
	         	<a @click="lucky()" class="right">去抽奖</a>
	         </div>
	         
   		</section>
   		<!-- <section class="model" v-show="showMsg">
   			<div class="panel">
   				<div class="msg">
   					<div>	
   						<p style="background: url(c/images/msg-border.png);">请在20秒内控制左右往前穿越，经过21届、11届、1届时即有机会获得宝藏，快开启夺宝之旅吧~</p>
   						<a class="btn"  @click="showTimeOutPanel()" style="background: url(c/images/btn-1.png);font-family: none;">START</a>
   					</div>
   				</div>
   				
   			</div>
   			
   		</section>
   		<section class="model" v-show="showTimeOut">
			<div class="timeout-panel">
			 		<div class="msg" style="background: url(c/images/timeout-bg.png);">
						{{timeFlag}}
					</div>
			</div>			
 	   </section> -->
 		</login>
 		
	</div>

</template>

<style lang="sass">
	.model{
	    width: 100%;
	    height: 100%;
	    position: fixed;
	    top: 0;
	    background-color: rgba(0,0,0,0.7);
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
	    		height: 322px;
	    		line-height: 322px;
			    position: absolute;
			    top: 50%;
			    font-size: 207px;
			    margin-top: -120px;
			    color: #e17227;
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
			    padding-left: 0;
			    background-size: 300px 106px !important;
			    color: white;
			    font-size: 76px;
			    text-align: center;
			    line-height: 106px;
			    text-shadow: 0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801,0px 0px 10px #8b3801;
			    background-repeat: no-repeat!important;
			    margin: 65px auto;
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
		    top: 75%;
		    margin-left: -140px;

		    img{
		  	 width: 320px;
		    }	
     }.title-panel{
     	position: absolute;
	    top: 90%;
	    // text-align: center;
	    width: 100%;
	    font-size: 0;
		a{
			color: #fff;
		    font-size: 30px;
		    width: 50%;
		    display: inline;
		    text-decoration: underline;
		}
		.left{
			text-align: left;
			padding-left: 40px;
		}
		.right{
			text-align: right;
			padding-right: 40px;
			float: right;
		}
     }

 	@function px2rem($px) {
		$return: #{($px / 8px / 2)}rem;

		@return $return;
	}
     .wap-button {
		    
		    height: px2rem(82px);
		    line-height: px2rem(82px);
		    width: auto;
		    font-size: px2rem(32px);
		    text-align: center;
		    color: #262222;
		    -webkit-border-radius: px2rem(41px);
		    -moz-border-radius: px2rem(41px);
		    border-radius: px2rem(41px);
		    padding: 25px 60px;
		    a {
		        display: block;
		        color: inherit;
		        text-decoration: none;
		    }
		    &.disabled {
		        opacity: .5;
		        // background: #ccc !important;
		        // color: #333 !important;
		        pointer-events: none !important;
		    }
		}
		.yellow{
			background: #ffb81d;
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
	 			musicBg: 'c/images/music.png'
	 		}
	 	},

	 	ready() {
			// this.$root.musicData.showMusic = true;
			// if(this.$root.musicData.status == 'play'){
			// 	document.querySelector("#audio").play();
			// }else{
			// 	document.querySelector("#audio").pause();
			// }
		},

	 	methods:{
	 		addOperLog(){
	 			sapi.addOperLog(this,{"acceptid":acceptid,oper:'start'},(back)=>{
				})
	 		},
	 		changeShowActivityD(){
	 			 this.$root.showActivityD=true;
	 		},
	 		start(){
	 			this.addOperLog();
	 			// if(this.$root.islogin){
	 				if(gameiconload<100){
	 					this.$dispatch('loading', {name:'home_load_tip', text: '游戏资源加载中...', show: true, duration: 1000});
	 					return;
	 				}
	 				router.go('guess');
	 				// if(!sessionStorage.getItem("showMsgFlag")){
	 				// 	sessionStorage.setItem("showMsgFlag",true);
	 				// 	this.showMsg=true;
	 				// }else{
	 				// 	this.showTimeOutPanel();
	 				// }
	 			// }
	 			// else{
	 			// 	this.$dispatch('login', window.location.search);
	 			// }
	 		},
	 		showTimeOutPanel(){
	 			this.showTimeOut=true;
	 			this.showMsg=false;
	 			var that=this;
	 			var timeout=setInterval(()=>{
	 				if(that.timeFlag==0){
	 					that.timeFlag=3;
	 					clearInterval(timeout);
	 					that.showTimeOut=false;
	 					router.go('guess');
	 				}else{
	 					that.timeFlag-=1;
	 				}
	 			},1000);
	 			
	 		},
	 		lucky(){
	 			if(!this.$root.islogin){
					this.$root.goodlucky = true;
					this.$dispatch('login', window.location.search);
					return;
				}
				router.go({path: '/marquee'});
	 		}
	 	}
	}
</script>