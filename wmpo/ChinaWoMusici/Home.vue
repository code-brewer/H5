<template>
	<div class="app-view home-page">
		<section class="section-home">
			<div class="main-bg">
				<img :src="'i/images/home_bg.png'">
			</div>

			<div class="banner-panel">
				<img :src="'i/images/home_title.png'" style="width: 420px;">
			</div>
			<div class="btn-panel" style="text-align: center;">
				<a class="start-btn"  @click="start">
					<img :src="'i/images/home_btn .png'" style="width: 220px;">
				</a>
				<!--<a class="wx-btn" v-link="{path:'wxpage'}" @click="addOperLog('button','wx')" style="background-image: url(g/images/wx-btn.png);">微信参与</a>-->
			</div>
			<div class='flow-panel'>

					<a class="newer-btn"  @click="floatButton">
                          <img :src="'i/images/newer-prize.png'">
                     </a>



			</div>
			<div class="title-panel">
				<a @click="changeShowActivityD()" class="left">活动规则</a>
				<a @click="lucky()" class="right">我要抽奖</a>
			</div>
		</section>
		</login>

	</div>

</template>

<style lang="sass">
	@-webkit-keyframes change{
    		0%{
    			top:60%;
    			right:0;
    		}

    		25%{
    			top:40%;
    			left:50%;
    		}

    		50%{
    			top:60%;
    			left:0%;
    		}

    		75%{
    			top:40%;
                 left:50%;
    		}

    		100%{
    			top:60%;
    			right:0%;
    		}
    	}

   @-moz-keyframes  change{
       		0%{
       			top:60%;
       			right:0;
       		}

       		25%{
       			top:40%;
       			left:50%;
       		}

       		50%{
       			top:60%;
       			left:0%;
       		}

       		75%{
       			top:40%;
                    left:50%;
       		}

       		100%{
       			top:60%;
       			right:0%;
       		}
       	}
       @-o-keyframes change{
           		0%{
           			top:60%;
           			right:0;
           		}

           		25%{
           			top:40%;
           			left:50%;
           		}

           		50%{
           			top:60%;
           			left:0%;
           		}

           		75%{
           			top:40%;
                        left:50%;
           		}

           		100%{
           			top:60%;
           			right:0%;
           		}
           	}
	 @-ms-keyframes change{
               		0%{
               			top:60%;
               			right:0;
               		}

               		25%{
               			top:40%;
               			left:50%;
               		}

               		50%{
               			top:60%;
               			left:0%;
               		}

               		75%{
               			top:40%;
                            left:50%;
               		}

               		100%{
               			top:60%;
               			right:0%;
               		}
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
	.banner-panel {
		z-index: 12;
		position: absolute;
		text-align: center;
		width: 100%;
		top: 37%;
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
			top: 80%;
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
				timeFlag: 3
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
			changeShowActivityD() {
				this.$root.showActivityD = true;
			},
			floatButton(){
				this.addOperLog('button','floatbutton');
				location.href = 'http://t.10155.com/0fn';
			},
			start() {
				this.addOperLog('button','start');
				// if(this.$root.islogin){
				if(gameiconload < 100) {
					this.$dispatch('loading', {
						name: 'home_load_tip',
						text: '游戏资源加载中...',
						show: true,
						duration: 1000
					});
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
			showTimeOutPanel() {
				this.showTimeOut = true;
				this.showMsg = false;
				var that = this;
				var timeout = setInterval(() => {
					if(that.timeFlag == 0) {
						that.timeFlag = 3;
						clearInterval(timeout);
						that.showTimeOut = false;
						router.go('guess');
					} else {
						that.timeFlag -= 1;
					}
				}, 1000);

			},
			lucky() {
				if(!this.$root.islogin) {
					this.$root.goodlucky = true;
					this.$dispatch('login', window.location.search);
					return;
				}
				router.go({
					path: '/marquee'
				});
			}
		}
	}
</script>