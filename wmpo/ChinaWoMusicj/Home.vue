<template>
	<div class="app-view home-page" @click="openletterBtn">
		<section class="section-home">
			<!-- 背景 -->
				
				<!-- 信封头 -->
				<img :src="'j/images/letter-1.png'" class="animated letter1" :class="{fadeOutUpBig: openLetter, delayhalf: openLetter, display: displaynone}">
				<!-- 信封内容 -->
				<section class="letter-con" :class="{letterConMax: displaynone, display: letterDisplay}" id="changeLetter">
					<img :src = "'j/images/letter-bg.jpg'" style="
    height: 100%; width: 100%;">
    				<img :src = "'j/images/logo.png'" style="position: absolute;top: 10px;
    				left:10px;">
					<img :src = "'j/images/light.png'" class="light">
					<div class="main-con">
						<img :src = "'j/images/letter-title.png'" class="letter-title">
						<div style="padding-left: 40px;">
							<img :src = "'j/images/letter-info1.png'" class="animated " :class="{display:display, bounceInLeft: displaynone}" >
							<img :src = "'j/images/letter-info2.png'"class="animated " :class="{display:display,bounceInLeft: displaynone}">
							<img :src = "'j/images/letter-info3.png'"class="animated " :class="{display:display,bounceInLeft: displaynone}">
						</div>
						
						<img :src = "'j/images/down.png'"class="animated down" :class="{display:display,bounceInLeft: displaynone}">
					</div>
				</section>
				<!-- 入场 -->
				<section :class="{display: meetingPlace}" style=" width: 100%;
    height: 100%;
    overflow: hidden; position: relative;">
					<img :src="'j/images/scale-title.png'" class="scale-title">
					<img :src="'j/images/scale-con.png'" class="scale-con" :class="{play: letterDisplay}">
					<img :src="'j/images/hand-letter.png'" class="hand-letter">
				</section>
				<!-- 主会场 -->
				<section style="height: 100%;" :class="{display: mianMeeting}">
					<img :src = "'j/images/meetting-bg.jpg'" style="height: 100%; width: 100%;">
					<img :src = "'j/images/logo.png'" style="position: absolute;top: 10px;
    				left:10px;">
					<div class="gift">
						<div class="gift1" @click="Jump(1)">
							<img :src = "'j/images/gift1.png'">
							<img :src = "'j/images/click-icon.png'" class="click-icon1">
						</div>
						
						<div class="gift2" @click="Jump(2)">
							<img :src = "'j/images/gift2.png'">
							<img :src = "'j/images/click-icon.png'" class="click-icon2">
						</div>

						<div class="gift3" @click="Jump(3)">
							<img :src = "'j/images/gift3.png'">
							<img :src = "'j/images/click-icon.png'" class="click-icon3">
						</div>

						<a class="gowechat" @click="gowechat">朋友圈GO</a>
					</div>
					<div class="wxshare" v-if="wxShareTip" @click="wxShareTip=false">
						<img :src="'j/images/wx-share-tip.png'" >
					</div>
					
				</section>
				<!-- <img :src="'j/images/letter-con.jpg'" > -->
				<!-- 信封底面 -->
				<img :src="'j/images/letter2-1.png'" class="animated letter2-1" :class="{fadeOutDownBig: openLetter, delayOne: openLetter, display: displaynone}">
				<!-- 信封封面 -->
				<img :src="'j/images/letter2.png'" class="animated letter2" :class="{fadeOutDownBig: openLetter, delayOne: openLetter, display: displaynone}">
			<!-- </div> -->
			<!-- logo -->
			<img :src="'j/images/j-logo.png'" style="width: 220px;" class="logo-img animated bounceIn" :class="{fadeOutUpBig: openLetter, display: displaynone}">
			<!-- 活动标题 -->
			<div class="banner-panel animated" :class="{fadeOutDownBig: openLetter, delayOne: openLetter, display: displaynone}">
				<img :src="'j/images/j-title.png'" class="animated flip " >
			</div>
			<!-- 邀请函 -->
			<div class="btn-panel"  style="text-align: center;" >
				<img :src="'j/images/j-show.png'" class="animated bounceInDown" id="ss" :class="{fadeOutDownBig: openLetter, delayOne: openLetter, display: displaynone}">
			</div>
			<p class="animated bounceIn" :class="{fadeOutDownBig: openLetter, delayOne: openLetter, clickBegin: !openLetter, display: openLetter}">点击开启</p>
		</section>
		</login>

	</div>

</template>

<style lang="sass">
.wxshare{
    width: 100%;
    position: absolute;
    top: 0;
    height: 100%;
    background: rgba(0,0,0, 0.5);
    img{
    	max-width: 100%;
    	padding-top: 50px;
    }
}
.click-icon1{
    position: absolute;
    top: 63%;
    left: 43%;
    -webkit-animation:fun 2s linear infinite;
	-moz-animation:fun 2s linear infinite;
	-ms-animation:fun 2s linear infinite;
	-o-animation:fun 2s linear infinite;

}
.click-icon2{
    position: absolute;
    top: 63%;
    right: 35%;
    -webkit-animation:fun 2s linear infinite;
	-moz-animation:fun 2s linear infinite;
	-ms-animation:fun 2s linear infinite;
	-o-animation:fun 2s linear infinite;
}
.click-icon3{
    position: absolute;
    top:70%;
    right: 38%;
    -webkit-animation:fun 2s linear infinite;
	-moz-animation:fun 2s linear infinite;
	-ms-animation:fun 2s linear infinite;
	-o-animation:fun 2s linear infinite;
}
.gowechat{
    display: inline-block;
    padding: 2% 5%;
    border: 1px solid #e60012;
    border-radius: 10px;
    position: absolute;
    top: 93%;
    left: 50%;
    margin-left: -11%;
    color: #e60012;
}
.gift3{
    width: 45%;
    height: 230px;
    position: absolute;
    top: 70%;
    left: 28%;

}
.gift2{
    width: 45%;
    height: 230px;
    position: absolute;
    top: 48%;
    right: 3%;
    
}
.gift1{
    width: 45%;
    height: 230px;
    position: absolute;
    top: 48%;
    left: 3%;
    
}
@-webkit-keyframes plays{
	 0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1);
		 top: 3%;
		
	}
	100%{
		-moz-transform:scale(2.3); 
		-webkit-transform:scale(2.3); 
		-o-transform:scale(2.3); 
		top: 52%;
		
	}
	    
}
 @-moz-keyframes  plays{
    0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1);
		top: 3%;
	}
	100%{
		-moz-transform:scale(3.5); 
		-webkit-transform:scale(3.5); 
		-o-transform:scale(3.5); 
		top: 99%;
	}
}
 @-o-keyframes plays{
   0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1);
		top: 3%;
	}
	100%{
		-moz-transform:scale(3.5); 
		-webkit-transform:scale(3.5); 
		-o-transform:scale(3.5); 
		top: 99%;
	}
}
@-ms-keyframes plays{
     0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1);
		top: 3%;
	}
	100%{
		-moz-transform:scale(3.5); 
		-webkit-transform:scale(3.5); 
		-o-transform:scale(3.5); 
		top: 99%;
	}
}
.play{
	-webkit-animation:plays 6s linear;
	-moz-animation:plays 6s linear;
	-ms-animation:plays 6s linear;
	-o-animation:plays 6s linear;
	animation-fill-mode: forwards;
}
.scale-title{
    position: absolute;
    top: 0;
    width: 100%;
}
.scale-con{
  	position: absolute;
    top: 3%;
    height: 97%;
    width: 100%;
    overflow: hidden;
    left: 0;
    
}
.hand-letter{
    position: absolute;
    // top: 63%;
    top: 76%;
    left: 50%;
    margin-left: -235px;
}
//信封
@media (device-height:480px) and (-webkit-min-device-pixel-ratio:2){
	.down{
		margin-top: 0;
	}
}
.down{
	 -webkit-animation:fun 2s linear infinite;
	-moz-animation:fun 2s linear infinite;
	-ms-animation:fun 2s linear infinite;
	-o-animation:fun 2s linear infinite;
	margin-top: 3%;
	margin-left: 45%;
}
@-webkit-keyframes Ltitle{
	 0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(2,2); 
		-webkit-transform:scale(2,2); 
		-o-transform:scale(2,2); 
	}
	100{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}      
}
 @-moz-keyframes  Ltitle{
    0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(2,2); 
		-webkit-transform:scale(2,2); 
		-o-transform:scale(2,2);
	}
	100{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}      
}
 @-o-keyframes Ltitle{
   0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(2,2); 
		-webkit-transform:scale(2,2); 
		-o-transform:scale(2,2);
	}
	100{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}      	
}
@-ms-keyframes Ltitle{
     0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(2,2); 
		-webkit-transform:scale(2,2); 
		-o-transform:scale(2,2);
	}
	100{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}          	
}

.letter-title{
	width: 100%;
 }	
.light{
	position: absolute;
	top: 0;
	left: 0;
	-webkit-animation:Ltitle 1s linear infinite;
	-moz-animation:Ltitle 1s linear infinite;
	-ms-animation:Ltitle 1s linear infinite;
	-o-animation:Ltitle 1s linear infinite;

}
.display{
	display: none;
}
.delayhalf{
	 animation-delay:0.5s;
	-webkit-animation-delay:0.5s; /* Safari 和 Chrome */
}
.delayOne{
	 animation-delay:1s;
	-webkit-animation-delay:1s; /* Safari 和 Chrome */
}
.delaySecond{
	 animation-delay:3s;
	-webkit-animation-delay:3s; /* Safari 和 Chrome */
}
.delaySecond8{
	 animation-delay:3.5s;
	-webkit-animation-delay:3.5s; /* Safari 和 Chrome */
}
.delayThird{
	 animation-delay:4s;
	-webkit-animation-delay:4s; /* Safari 和 Chrome */
}
.letter2-1{
	position: absolute;
	top:-32px;
}
.letterConMax{
	-webkit-animation:conmax 0.5s linear forwards ;
	-moz-animation:conmax 0.5s linear forwards ;
	-ms-animation:conmax 0.5s linear forwards ;
	-o-animation:conmax 0.5s linear forwards ;
	animation-fill-mode: forwards;
    // height: 100%;
}
@-webkit-keyframes conmax{
	 0%{
	    top: 10%;
	    left: 50%;
	    margin-left: -256px;
	    width: 80%;
	    height: 80%;
	    
	}
	
	100%{
		top: 0%;
	    left: 0%;
	    margin-left: 0px;
	    width: 100%;
	    height: 100%;
	}      
}
 @-moz-keyframes  conmax{
    0%{
	    top: 10%;
	    left: 50%;
	    margin-left: -256px;
	    width: 80%;
	    
	}
	
	100%{
		top: 0%;
	    left: 0%;
	    margin-left: 0px;
	    width: 100%;
	}      
}
 @-o-keyframes conmax{
    0%{ 
	    top: 10%;
	    left: 50%;
	    margin-left: -256px;
	    width: 80%;
	    
	}
	
	100%{
		top: 0%;
	    left: 0%;
	    margin-left: 0px;
	    width: 100%;
	}        	
}
@-ms-keyframes conmax{
     0%{
	    top: 10%;
	    left: 50%;
	    margin-left: -256px;
	    width: 80%;
	    
	}
	
	100%{
		top: 0%;
	    left: 0%;
	    margin-left: 0px;
	    width: 100%;
	}          	
}
.letter-con{
    position: absolute;
    top: 10%;
    left: 50%;
    margin-left: -256px;
    z-index: 1;
    width: 80%;
    overflow: hidden;
    
    .main-con{
    	width: 90%;
    	position: absolute;
	    top: 20px;
	    left: 50%;
	    margin-left: -46%;
	    img{
    		max-width: 100%;
    	}
    }

}
@-webkit-keyframes fun{
	 0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(1.5,1.5); 
		-webkit-transform:scale(1.5,1.5); 
		-o-transform:scale(1.5,1.5); 
	}
	100%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}         
}
 @-moz-keyframes  fun{
    0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(1.5,1.5); 
		-webkit-transform:scale(1.5,1.5); 
		-o-transform:scale(1.5,1.5); 
	}
	100%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}         ransform:scale(1.5,1.5);  
	 		
}
 @-o-keyframes fun{
   0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(1.5,1.5); 
		-webkit-transform:scale(1.5,1.5); 
		-o-transform:scale(1.5,1.5); 
	}
	100%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}         
}
@-ms-keyframes fun{
     0%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}
	50%{
		-moz-transform:scale(1.5,1.5); 
		-webkit-transform:scale(1.5,1.5); 
		-o-transform:scale(1.5,1.5); 
	}
	100%{
		-moz-transform:scale(1,1); 
		-webkit-transform:scale(1,1); 
		-o-transform:scale(1,1); 
	}         	
}

.clickBegin{
    position: absolute;
    top: 83%;
    font-size: 22px;
    z-index: 2;
    color: #c7b628;
    left: 50%;
    margin-left: -6%;
    -webkit-animation:fun 2s linear infinite;
	-moz-animation:fun 2s linear infinite;
	-ms-animation:fun 2s linear infinite;
	-o-animation:fun 2s linear infinite;
}
.logo-img{
	position: absolute;
	top: 150px;
	left: 50%;
	margin-left: -110px;
	z-index:2;
}
.letter1{
	width: 100%;
	position: absolute;
	top: 0;
	z-index: 2;
}
.letter2{
    position: absolute;
    top: 68px;
    z-index: 1;
    height: 94%;
    width: 100%;
}
	
	.flow-panel{
		z-index:100;
		width:50%;
		position:absolute;
		top:50%;
		-webkit-animation:change 10s linear infinite;
		-moz-animation:change 10s linear infinite;
		-ms-animation:change 10s linear infinite;
		-o-animation:change 10s linear infinite;
		.newer-btn{
			display:inline-block;
			img{
				width:230px;
			}

		}

	}
	#ss,.ss{
	    animation-delay:1s;
		-webkit-animation-delay:1s; /* Safari 和 Chrome */
	}
	.banner-panel {
		z-index: 12;
		position: absolute;
		text-align: center;
		width: 100%;
		top: 40%;
		font-size: 0;
		p {
			font-size: 28px;
			color: #ffcf4a;
			font-weight: bold;
		}
	}
	@media (device-height:480px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone4/4s */

                .banner-panel img{
                	width:440px;
                }

            }
	.model {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 99;
		.timeout-panel {
			text-align: center;
			position: absolute;
			width: 100%;
			top: 340px;
			.msg {
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
				text-shadow: 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000, 0px 0px 10px #000;
			}
		}
		.panel {
			.msg {
				position: absolute;
				top: 20%;
				text-align: center;
				left: auto;
				width: 100%;
				div {
					color: #fff;
					width: 90%;
					position: absolute;
					top: 18%;
					left: 5%;
					font-size: 32px;
				}
				p {
					background-size: 100% 100%!important;
					padding: 5%;
					line-height: 50px;
				}
			}
			.btn {
				height: 106px;
				display: block;
				width: 300px;
				padding-left: 0;
				background-size: 300px 106px !important;
				color: white;
				font-size: 76px;
				text-align: center;
				line-height: 106px;
				text-shadow: 0px 0px 10px #8b3801, 0px 0px 10px #8b3801, 0px 0px 10px #8b3801, 0px 0px 10px #8b3801, 0px 0px 10px #8b3801, 0px 0px 10px #8b3801, 0px 0px 10px #8b3801;
				background-repeat: no-repeat!important;
				margin: 65px auto;
			}
		}
	}
	
	@keyframes roll {
		0% {
			transform: rotate(0deg)
		}
		100% {
			transform: rotate(360deg)
		}
	}
	
	.section-home {
		height: 100%;
		background-size: auto 100%;
		background-repeat: no-repeat;
		.main-bg {
			position: absolute;
			width: 100%;
			height: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.logo-panel {
			position: absolute;
			left: 75%;
			top: 2%;
			img {
				width: 100%;
			}
		}
		.music-panel {
			position: absolute;
			left: 85%;
			top: 20px;
			font-size: 0;
			animation: roll 5s linear infinite;
			img {
				width: 100%;
			}
		}

		.btn-panel {
			position: absolute;
			top: 65%;
			width: 100%;
			z-index:99;
			a {
				font-size: 36.7px;
				display: block;
				width: 300px;
				height: 100px;
				line-height: 100px;
				text-align: center;
				background-repeat: no-repeat;
				display: inline-block;
				color: #000;
				text-decoration:none;
			}
		}
		.title-panel {
			position: absolute;
			top: 93%;
			// text-align: center;
			width: 100%;
			font-size: 0;
			a {
				color: #ffea00;
				font-size: 30px;
				width: 50%;
				display: inline;
				text-decoration: underline;
			}
			.left {
				text-align: left;
				padding-left: 40px;
			}
			.right {
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
		.yellow {
			background: #ffb81d;
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
				showTimeOut: false,
				showMsg: false,
				timeFlag: 3,
				openLetter:false, //打开信封
				clickBegin: true, 
				displaynone: false,//隐藏信封
				display: true, //显示箭头
				letterDisplay: false,//隐藏信封内容
				meetingPlace: true,//一开始隐藏入场内容
                mianMeeting: true,//一开始隐藏主会场内容
				wxShareTip: false, 
				/*musicBg: 'c/images/music.png'*/
			}
		},

		ready() {
			// this.$root.musicData.showMusic = true;
			// if(this.$root.musicData.status == 'play'){
			// 	document.querySelector("#audio").play();
			// }else{
			// 	document.querySelector("#audio").pause();
			// }
			if(!this.letterDisplay){
				var gp = document.getElementById("changeLetter");
				gp.addEventListener('touchstart',this.touchstart,false);
				gp.addEventListener('touchmove',this.touchmove,false);
				gp.addEventListener('touchend',this.touchend,false);
				
			}
			if(this.$root.isShowAnimate)
			{
				this.displaynone = false;
			}
			else{
				this.displaynone = true;
				this.letterDisplay = true;
				this.meetingPlace = true;
				this.openLetter = true;
				this.mianMeeting = false;
			}	
			// this.saveUserH5Info();
			
		},

		methods: {
			
			openletterBtn(){
				this.openLetter = true;
				this.addOperLog('button','start');
				// this.$root.musicSrc = 'j/images/other.mp3';
				if(this.$root.musicData.status == 'play'){
					document.querySelector("#audio").play();
				}else{
					document.querySelector("#audio").pause();
				}
				var timeout=setInterval(()=>{
	 				this.displaynone = true;
	 				this.display = false;
	 			},2000);
			},
			changeLetter(){
				this.letterDisplay = true;
				this.meetingPlace = false;
				var timeout=setInterval(()=>{
					this.mianMeeting = false;
	 				this.meetingPlace = true;

	 			},4000);
			},
			addOperLog(type,btnName) {
				sapi.addOperLog(this, {
					'aid':aid,
					'type':type,
					'button_name':btnName,
					'source':source
				}, (back) => {})
			},
			Jump(index){
				if(index == 1){
					this.addOperLog('button','marquee');
					router.go('marquee');

				}else if(index == 2){
					this.addOperLog('button','highgou');
					this.$root.highgou = true;
					console.log(this.$root.highgou);
				}else if(index == 3){
					//一键购买
					this.addOperLog('button','oneclickBuy');
					location.href = "http://10155.com/damai/index.jsp";
				}

			},
			
			touchstart(){
				// this.letterDisplay = true;
				// this.meetingPlace = false;
				// var timeout=setInterval(()=>{
				// 	this.mianMeeting = false;
	 		// 		this.meetingPlace = true;

	 		// 	},4000);
			},
			touchmove(event){
				event.preventDefault();
				this.letterDisplay = true;
				this.meetingPlace = false;
				var timeout=setInterval(()=>{
					this.mianMeeting = false;
	 				this.meetingPlace = true;

	 			},4000);
			},
			touchend(){
				// this.letterDisplay = true;
				// this.meetingPlace = false;
				// var timeout=setInterval(()=>{
				// 	this.mianMeeting = false;
	 		// 		this.meetingPlace = true;

	 		// 	},4000);
	 			
			},
			gowechat(){
				this.wxShareTip = true;
			},
			
		}
	}
</script>