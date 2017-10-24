<template>
	<div class="golf">
		<div class="top-left">
			<div class="sum_div golf_el">
				<img class="scoring" v-for="item in scoringpath" :src="item" track-by="$index">
			</div>
			<div class="msg golf_el">
				已进1球
			</div>
		</div>

		<div class="timebg golf_el">
			倒计时：60s
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
	export default {
		data() {
			return {
				scoringpath: [
					"./templates/static/img/scoring_n.png",
					"./templates/static/img/scoring_n.png",
					"./templates/static/img/scoring_n.png",
					"./templates/static/img/scoring_n.png",
					"./templates/static/img/scoring_n.png"
				],
			}
		},
		ready() {
 
		},
	  
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
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
</style>