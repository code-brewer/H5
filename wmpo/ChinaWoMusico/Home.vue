<template>
	<div class="app-view home-page">
		<section class="section-home">
			<div class="main-bg">
				<img :src="'o/images/home-bg.jpg'">
			</div>
			<div class="logo">
				<img :src="'o/images/logo.png'">
			</div>
			<p @click="morePrize" class="link text-center">更多福利点击领取>></p>
			<div class="btn-panel" style="text-align: center;">
				<a class="start-btn"  @click="start">
					<img :src="'o/images/home-btn.png'">

				</a>
				
			</div>
			
			<div class="title-panel">
				<a @click="changeShowActivityD()" class="left">活动规则</a>
				<a @click="lucky()" class="right">我的奖品</a>
			</div>
		</section>
		<my-prize :show.sync="show">
		</my-prize>
		

	</div>

</template>

<style lang="sass">

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
		.link{
		    position: absolute;
		    top: 78%;
		    left: 33%;
		    color: #bf1d20;
		    border-bottom: 2px solid #bf1d20;
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
			top: 82%;
			width: 100%;
			z-index: 99;

	a {
		font-size: 36.7px;
		display: block;
		width: 380px;
		height: 100px;
		line-height: 100px;
		text-align: center;
		background-repeat: no-repeat;
		display: inline-block;
		color: #000;
		text-decoration: none;
	}

	}
	.title-panel1 {
		position: absolute;
		top: 46%;
	// text-align: center;
		width: 100%;
		font-size: 0;
	p{
		color: #fff;
		font-size: 35px;
		width: 50%;
		display: inline-block;
		font-weight: bold;
		// text-shadow: 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff;
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
		.title-panel {
			position: absolute;
			top: 93%;
			// text-align: center;
			width: 100%;
			font-size: 0;
			a {
				color: #fff;
				font-size: 30px;
				width: 50%;
				display: inline-block;
				text-decoration: underline;
				font-weight: bold;
				// text-shadow: 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff, 0px 0px 10px #fff;
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
	import api from './utils/serverapi.js'
	import myPrize from './components/myPrize.vue'
	export default {
		components: {
			myPrize
		},
		data() {
			return {
				showTimeOut: false,
				showMsg: false,
				timeFlag: 3,
				show: false,
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
			this.showMsg=true;
            this.$root.musicData.showMusic = true;
			this.$root.$refs.music.sounddisable(false);
		},

		methods: {
			addOperLog(type,btnName) {
				api.addOperLog(this, {
					'aid':aid,
					'type':type,
					'button_name':btnName,
					'source':source
				}, (back) => {})
			},
			changeShowActivityD() {
				this.addOperLog('button','h-rule');
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
					this.$root.whereLogin= "h-myPLogin";
					this.$dispatch('login', window.location.search);
					return;
				}
				this.addOperLog('button','h-myprize');
				this.show = true;
			},
			morePrize(){
				this.addOperLog('button','h-more');
				location.href = 'http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=01000d81593d2bf801593f1bfdf60691&from=singlemessage&isappinstalled=1';
			}
		}
	}
</script>