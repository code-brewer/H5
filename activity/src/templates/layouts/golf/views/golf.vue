<template>
	<div class="golf">
		<div class="top-left">
			<div class="sum_div golf_el">
				<img class="scoring" v-for="item in scoringpath" :src="item" track-by="$index">
			</div>
			<div class="msg golf_el">
				已进{{sum}}球
			</div>
		</div>

		<div class="timebg golf_el">
			倒计时：{{countDown}}s
		</div>
		<div class="tee_div golf_el">
			<img class="ball_ready" id="g_ball" src="../images/ball_1.png" alt="">
			<img class="tee" src="../images/tee.png" alt="">
		</div>
		<img v-show="showball" class="ball_fly golf_el" id="g_ball_fly" src="../images/ball_1.png" alt="">
		<img v-show="showgolfclub1" class="gc1 golf_el" src="../images/golfclub_1.png" alt="">
		<img v-show="showgolfclub2" class="gc2 golf_el" src="../images/golfclub_2.png" alt="">
		<img v-show="showgolfclub3" class="gc3 golf_el" src="../images/golfclub_3.png" alt="">
		<img v-show="showgolfclub4" class="gc4 golf_el" src="../images/golfclub_4.png" alt="">
		<div class="cursor_div golf_el">
			<img class="cursor golf_el cursorrun" id="g_cursor" src="../images/ico44_1.png" alt="">
			<div v-show="showtarget" id="target"></div>
		</div>
		<span class="g_p_btn g_btn golf_el" id="g_press" ontouchstart="return false;">&nbsp;按住</span>
		<p class="golf_el palytip">松开即挥杆</p>
	</div>
</template>
<script>
	import api from '../../../service/index.js'
	export default {
		data() {
			return {
				imgSeq: [],
				showball: false,
				showgolfclub1: true,
				showgolfclub2: false,
				showgolfclub3: false,
				showgolfclub4: false,
				isflying: false,
				readyfly: false,
				showtarget: false,
				targetposarray: [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
				targetwidtharray: [30, 40, 50],
				targetpos: 50,
				targetwidth: 30,
				scoringpath: [
					"./templates/static/img/scoring_n.png",
					"./templates/static/img/scoring_n.png",
					"./templates/static/img/scoring_n.png",
					"./templates/static/img/scoring_n.png",
					"./templates/static/img/scoring_n.png"
				],
				sum: 0,
				answerData: {
					show: false,
					result: '',
					imgSrc: ''
				},
				afterSaveRecord: false,
				countDown: ~~window.store.activityConfig.gameTime,
				myInterval: 0,
				prizeInfo: {}
			}
		},
		ready() {
			var gp = document.getElementById("g_press");
			gp.addEventListener('touchstart', this.touchstart, false);
			gp.addEventListener('touchend', this.touchend, false);
			this.cursorgo(false);
			this.gamestart();
		},
		methods: {
			addscoring() {
				this.sum += 1;
				var pos = this.sum - 1;
				if(pos >= this.scoringpath.length) return;
				this.$set("scoringpath[" + pos + "]", "./templates/static/img/scoring_y.png")
			},
			roll() {
				var pr = Math.floor(Math.random() * this.targetposarray.length);
				if(pr == this.targetposarray.length) {
					pr = this.targetposarray.length - 1;
				}
				this.targetpos = (this.targetposarray[pr]) / 24;

				var wr = Math.floor(Math.random() * this.targetwidtharray.length);
				if(wr == this.targetwidtharray.length) {
					wr = this.targetwidtharray.length - 1;
				}
				this.targetwidth = this.targetwidtharray[wr] / 24;;
			},
			touchstart() {
				if(this.isflying) return;
				var gp = document.getElementById("g_press");
				gp.classList.add('g_btn_active');
				this.readyfly = true;
				this.roll();
				var gt = document.getElementById("target");
				gt.style.left = this.targetpos + "rem";
				gt.style.width = this.targetwidth + "rem";
				this.showtarget = true;
				this.cursorgo(true);

			},
			touchend() {
				if(!this.readyfly || this.myInterval == 0) return;
				this.readyfly = false;
				this.isflying = true;
				this.cursorgo(false);
				var gc = document.getElementById("g_cursor");
				var target = document.getElementById("target");
				var c = gc.offsetLeft + 10;
				var hit = 1;
				if(c > target.offsetLeft + target.offsetWidth) {
					hit = 3;
				} else if(c >= target.offsetLeft && c <= target.offsetLeft + target.offsetWidth) {
					hit = 2;
				}
				var gp = document.getElementById("g_press");
				gp.classList.remove('g_btn_active');
				this.golfgo(hit);
			},
			golfgo(hit) {
				var that = this;
				that.showgolfclub1 = false;
				that.showgolfclub2 = true;
				setTimeout(function() {
					that.showgolfclub2 = false;
					that.showgolfclub3 = true;
					setTimeout(function() {
						var gb = document.getElementById("g_ball");
						gb.style.visibility = "hidden";
						that.showgolfclub3 = false;
						that.showgolfclub4 = true;
						var gbf = document.getElementById("g_ball_fly");

						if(hit == 2) {
							gbf.style.marginLeft = "-31px";
							// gbf.style.animation = "golfflyhit 3s cubic-bezier(0.7,0.3,0.8,0.2) forwards";
							that.setanimation(gbf, "golfflyhit 3s cubic-bezier(0.7,0.3,0.8,0.2) forwards");
						} else if(hit == 3) {
							gbf.style.marginLeft = "31px";
							// gbf.style.animation = "golfflyright 3s ease-in forwards";
							that.setanimation(gbf, "golfflyright 3s ease-in forwards");
						} else {
							gbf.style.marginLeft = "-93px";
							// gbf.style.animation = "golfflyright 3s ease-in forwards";
							that.setanimation(gbf, "golfflyright 3s ease-in forwards");
						}
						that.showball = true;
						setTimeout(function() {
							var gp = document.getElementById("g_ball");
							gp.style.visibility = "visible";
							that.showgolfclub1 = true;
							that.showgolfclub2 = false;
							that.showgolfclub3 = false;
							that.showgolfclub4 = false;
							that.showball = false;
							that.isflying = false;
							if(hit == 2) {
								that.addscoring();
							} else {}
							if(that.sum == 5 || that.myInterval == 0) {
								that.gameover();
							}
						}, 4000);
					}, 500);
				}, 500);
			},
			cursorgo(go) {
				var gc = document.getElementById("g_cursor");
				if(go) {
					this.setanimation(gc, "cursor 2s linear infinite alternate forwards");
					gc.style.animationPlayState = "running";
				} else {
					this.setanimation(gc, "cursor 2s linear infinite alternate paused forwards");
					gc.style.animationPlayState = "paused";
				}

			},
			setanimation(el, animation) {
				el.style.WebkitAnimation = animation;
				el.style.MozAnimation = animation;
				el.style.MsAnimation = animation;
				el.style.OAnimation = animation;
				el.style.animation = animation;
			},
			addPubScore() {
				api.addPubScore(this, {
					"score": this.sum,
					"types": window.store.configData.types
				}, (back) => {
					if(back.resCode == "00000") { //00000表示保存成功
						this.$root.$router.go({
							name: 'success',
							params: {
								type: 0,
								score: back.resMsg
							}
						})
					}else{
						this.$root.$router.go({
							name: 'fail',
							params: {
								type: 0,
								score: back.resMsg
							}
						})
					}
				})
			},

			gamestart() {
				var that = this;
				that.myInterval = setInterval(function() {
					if(that.$route.path.indexOf('/game') != 0) {
						clearInterval(that.myInterval);
						that.myInterval = 0;
						return;
					}
					that.countDown--;
					if(that.countDown <= 0) {
						that.gameover();
						return;
					}
				}, 1000)
			},
			gameover() {
				var that = this;
				if(that.myInterval > 0) {
					clearInterval(that.myInterval);
					that.myInterval = 0;
				}
				this.addPubScore();
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	@keyframes showGameMsg {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
	
	.golf {
		overflow: hidden;
		display: block;
		span {}
		.top-left {
			.msg {
				font-size: px2rem(30.7px);
				color: #007630;
				top: px2rem(113px);
				left: px2rem(32px);
			}
			.sum_div {
				margin: px2rem(60px) px2rem(16px);
				width: px2rem(234px);
				background-color: rgba(0, 0, 0, 0.5);
				height: px2rem(42px);
				border: 1px solid #ffff00;
				border-radius: px2rem(42px);
				text-align: center;
				img {
					&:last-child {
						margin-right: px2rem(0px);
					}
					width: px2rem(30px);
					height: px2rem(30px);
					margin-right: px2rem(15px);
					vertical-align: text-top;
					margin-top: px2rem(4px);
				}
			}
		}
	}
	
	.timebg {
		font-size: px2rem(30.7px);
		color: #007630;
		right: px2rem(23px);
		top: px2rem(61px);
	}
	
	.golf_el {
		position: absolute;
	}
	
	.tee_div {
		img {
			display: block;
		}
		top: px2rem(584px);
		left: 50%;
		margin-left: px2rem(-57.5px);
		.tee {
			width: px2rem(115px);
			height: px2rem(80px);
		}
	}
	
	.ball_ready {
		margin: 0 auto;
		width: px2rem(87px);
		height: px2rem(87px);
	}
	
	.ball_fly {
		top: px2rem(350px);
		left: 50%;
		margin-left: px2rem(-50px);
		width: px2rem(100px);
		height: px2rem(100px);
		-webkit-animation: golfflyright 3s;
		-moz-animation: golfflyright 3s;
		-ms-animation: golfflyright 3s;
		-o-animation: golfflyright 3s;
		animation: golfflyright 3s;
	}
	
	.gc1 {
		top: px2rem(413px);
		right: 0;
		width: px2rem(300px);
		height: px2rem(300px);
	}
	
	.gc2 {
		top: px2rem(425px);
		right: 0;
		width: px2rem(335px);
		height: px2rem(554px);
	}
	
	.gc3 {
		top: px2rem(210px);
		right: 0;
		width: px2rem(468px);
		height: px2rem(479px);
	}
	
	.gc4 {
		top: px2rem(24px);
		right: 0;
		width: px2rem(351px);
		height: px2rem(218px);
	}
	
	.g_p_btn {
		top: px2rem(850px);
		left: 50%;
		margin-left: px2rem(-143px);
		width: px2rem(286px);
		height: px2rem(70px);
		background-color: #87fb32;
		color: #fff;
		font-size: px2rem(34.12px);
		text-align: center;
		line-height: 2.2;
		border-radius: px2rem(5px);
		text-decoration: none;
	}
	
	.cursor {
		top: px2rem(-37px);
		height: px2rem(37px);
	}
	
	.cursorpaus {
		-webkit-animation: cursor 2s linear infinite alternate paused forwards;
		-moz-animation: cursor 2s linear infinite alternate paused forwards;
		-ms-animation: cursor 2s linear infinite alternate paused forwards;
		-o-animation: cursor 2s linear infinite alternate paused forwards;
		animation: cursor 2s linear infinite alternate paused forwards;
	}
	
	.cursorrun {
		-webkit-animation: cursor 2s linear infinite alternate forwards;
		-moz-animation: cursor 2s linear infinite alternate forwards;
		-ms-animation: cursor 2s linear infinite alternate forwards;
		-o-animation: cursor 2s linear infinite alternate forwards;
		animation: cursor 2s linear infinite alternate forwards;
	}
	
	.cursor_div {
		width: px2rem(600px);
		height: px2rem(30px);
		top: px2rem(756px);
		left: 50%;
		margin-left: px2rem(-300px);
		background-color: rgba(255, 255, 255, .5);
		border: 2px solid #fff;
		border-radius: px2rem(15px);
	}
	
	#target {
		height: px2rem(26px);
		background-color: #fff;
		position: absolute;
	}
	
	.palytip {
		width: px2rem(286px);
		height: px2rem(70px);
		line-height: px2rem(70px);
		font-size: px2rem(26px);
		top: px2rem(929px);
		left: 50%;
		text-align: center;
		margin-left: px2rem(-143px);
		color: #fff;
		animation: showGameMsg 1s linear infinite alternate forwards;
	}
	
	@keyframes golfflyhit {
		0% {
			margin-top: -160px;
			width: px2rem(100px);
		}
		15% {
			margin-top: -165px;
		}
		35% {
			margin-top: -165px;
		}
		60% {
			margin-top: -62px;
			margin-left: px2rem(-30px);
			width: px2rem(60px);
			height: px2rem(60px);
		}
		65% {
			margin-top: -72px;
		}
		70% {
			margin-top: -77px;
		}
		75% {
			margin-top: -80px;
		}
		80% {
			margin-top: -77px;
		}
		85% {
			margin-top: -72px;
		}
		90% {
			margin-top: -62px;
		}
		95% {
			margin-top: -67px;
			opacity: 1;
		}
		100% {
			margin-top: -62px;
			opacity: 0;
			margin-left: px2rem(-30px);
			width: px2rem(60px);
			height: px2rem(60px);
		}
	}
	
	@keyframes golfflyright {
		0% {
			margin-top: -160px;
			width: px2rem(100px);
		}
		10% {
			margin-top: -170px;
		}
		15% {
			margin-top: -175px;
		}
		20% {
			margin-top: -170px;
		}
		60% {
			margin-top: -62px;
			width: px2rem(60px);
			height: px2rem(60px);
		}
		65% {
			margin-top: -72px;
		}
		70% {
			margin-top: -77px;
		}
		75% {
			margin-top: -80px;
		}
		80% {
			margin-top: -77px;
		}
		85% {
			margin-top: -72px;
		}
		90% {
			margin-top: -62px;
		}
		95% {
			margin-top: -67px;
		}
		100% {
			margin-top: -62px;
			width: px2rem(60px);
			height: px2rem(60px);
		}
	}
	
	@-webkit-keyframes cursor {
		0% {
			left: px2rem(0px);
		}
		100% {
			left: px2rem(580px);
		}
	}
	
	@-moz-keyframes cursor {
		0% {
			left: px2rem(0px);
		}
		100% {
			left: px2rem(580px);
		}
	}
	
	@-ms-keyframes cursor {
		0% {
			left: px2rem(0px);
		}
		100% {
			left: px2rem(580px);
		}
	}
	
	@-o-keyframes cursor {
		0% {
			left: px2rem(0px);
		}
		100% {
			left: px2rem(580px);
		}
	}
	
	@keyframes cursor {
		0% {
			left: px2rem(0px);
		}
		100% {
			left: px2rem(580px);
		}
	}
</style>