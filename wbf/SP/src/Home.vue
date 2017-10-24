<template>
	<div class="app-view home-page">
		<section class="section-home">
	         <div class="main-bg">	
	         	<img :src="$root.basePath+'/src/images/sp-home-bg.jpg'">
	         </div>
	         <div class="logo">
	         	<img :src="$root.basePath+'src/images/logo.png'">
	         </div>
	         <!-- <div class="music-panel">	
	         	<img :src="musicBg" @click="stopMusic">
	         </div> -->
	         <div class="btn-panel">
	         	<a @click="start()" class="wap-button yellow">拼图赢大礼</a>
	         </div>
	         <div class="title-panel">
	         	<a @click="changeShowActivityD()" class="left">活动规则</a>
	         	
	         </div>
	         
   		</section>
   		
 		
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
	.logo{
	    position: absolute;
	    top: 20px;
	    left: 20px;
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
	    text-align: center;
		a{
			color: #f17b00;
		    font-size: 30px;
		    width: 50%;
		    display: inline;
		    text-decoration: underline;
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
		    color: #fff;
		    -webkit-border-radius: px2rem(6px);
		    -moz-border-radius: px2rem(6px);
		    border-radius: px2rem(6px);
		    padding: 25px 60px;

		    background: rgb(255,66,34); /* Old browsers */
   			
		    -webkit-text-shadow:#7f3119 2px 0 0,#7f3119 0 2px 0,#7f3119 -2px 0 0,#7f3119 0 -2px 0;  
		    -moz-text-shadow:#7f3119 2px 0 0,#7f3119 0 2px 0,#7f3119 -2px 0 0,#7f3119 0 -2px 0;  
		    text-shadow:#7f3119 2px 0 0,#7f3119 0 2px 0,#7f3119 -2px 0 0,#7f3119 0 -2px 0;   
		    *filter: Glow(Color=#7f3119, Strength=5);  
		    text-decoration: none;
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
			background: rgb(255,66,34); /* Old browsers */
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
			
		},

	 	methods:{
	 		addOperLog(){
	 			sapi.addOperLog(this,{"acceptid":acceptid,oper:'start'},(back)=>{
				})
	 		},
	 		changeShowActivityD(){
	 			 // this.$root.showActivityD=true;
	 			 alert(sessionStorage['pass']);
	 		},
	 		start(){
	 			
	 				router.go('guess');
	 				
	 		},
	 		
	 		
	 	}
	}
</script>