<template>
	<div class="app-view view-activity">
		<!-- <timer :state.sync="timerState" :duration="60" style="background:url(i/images/guess-timer-bg.png) center center no-repeat; background-size: auto 100%;margin-top:18%;"></timer>
		<div class="music_play">
            <div class='play_cd'>

            	<img class='img_center':class='{ "play_start":isPlay,"play_stop":!isPlay}' :src="'i/images/guess_cd.png'">

            </div>
            <div class='play_cd_r'>
                  <img  :src="'i/images/guess_cd_r.png'">
            </div>
        </div>
		<div class="question-list">
			 <div v-show="musicData.showMusic" class="music-warp" style="display:hidden">
                    <music :music-src.sync="newItem.musicSrc"   :music-status.sync="newItem.status"></music>
             </div>
			<div class="title">
				{{selectItem + 1}}、{{newItem.question}}
			</div>
			<ul>
				<li v-for="item in newItem.options">
					<div class="name">{{item.title}}</div>
					<div class="check-box">
						<checkbox :value="item.title" :checked.sycn="item.select"></checkbox>
					</div>
				</li>

			</ul>
		</div>
		<modal :show.sync="modalConfig.show" :bg="false" :backdrop="false">
			<div class="success-view">
				<div class="box" style="background: #fff; border: 2px solid #3bbfe7;border-radius:10px">
					<p class="title">提示</p>
					<div class="img-panel">
						<img :src="modalConfig.imgUrl">
					</div>
					<div class="btn-panel">
						<a class="blue" v-if="modalConfig.state==0" @click="isLogin">我要抽奖</a>
						<a class="blue" v-if="modalConfig.state!=0" v-link="{path:'home'}">不服再战</a>
						<a class="yellow" @click="getAnswer()" v-if="modalConfig.state!=0">查看答案</a>
					</div>
				</div>
			</div>
		</modal> -->
		<div class="logo">
				<img :src="'r/images/logo.png'">
		</div>
		<!-- <div class="time-wrap">
			<p class="time-bottom"><span class="time-top"  :style="{ width: timepro + '%' }"></span></p>
			<p></p>
		</div> -->
		<div class="tool">
			<img :src="'r/images/help-btn.png'" @click="activityRule()">
			<img :src="'r/images/pass.png'" @click="passKey()">
		</div>
		<canvas id="stage">
			您的浏览器不支持html5, 请换用支持html5的浏览器。
		</canvas>

		<section class="model" v-show="showMsg">
   			<div class="panel">
   				<div class="msg">
   					<div class="content" style="text-align: center; background: #ff99b3; padding: 20px;">
						<div class="div1">
							<div class="content-title">
								<div class="rule">
									<p class="title">游戏攻略</p>
									<img :src="$root.activityBasePath+'/images/rule1.png'">
									<p style="text-align: left;">点击偶像明信片，并向上迅速滑动屏幕以将情书寄出，20秒内将100封情书寄出即可通关抽奖。使用道具可以立即到达抽奖页，100%中奖哦</p>
								</div>
								<div class="prize">
									<p>通关即有机会获得以下奖品</p>
									<img :src="$root.activityBasePath+'/images/rule2.png'">
								</div>
								<div class="item">
									<img :src="$root.activityBasePath+'/images/game-rule.png'">
								
								</div>
							</div>
						</div>
						<div class="btn-close" @click="showTimeClick()"><img :src="'r/images/close.png'" /></div>
					</div>
   				</div>
   				
   			</div>
   			
   		</section>
   		<timemodal :show.sync="showTime" :bg="false" :backdrop="false">
   			<div class="panel">
   				<div class="msg" style="margin-left: -5%;">
   					<p class="timetext">{{timeTest}}</p>
   				</div>
   				
   			</div>
			
   		</timemodal>
   		<timemodal :show.sync="showTimeStartBtn" :bg="false" :backdrop="false">
   			<div class="panel" style="width: 100%;">
   				<div class="msg" style="text-align: center; margin-top: 60%;" @click="showTimeStart">
   					<img :src="'o/images/start-game.png'" />
   				</div>
   				
   			</div>
   			
   		</timemodal>
   		<!-- 挑战成功弹框 -->
   		<modal :show.sync="modalConfig.show" :bg="false" :backdrop="false">
			<div class="success-view" style="margin-top: -80px;">
				<div class="box" style="background-image: url('./r/images/modal-bg3.png'); background-size: 100% 100%; ">
					
					<p class="title">提示</p>
					<div style="margin-top: 80px;" v-if="modalConfig.result">
						<p class="text" style="padding: 30px;"  v-if="modalConfig.state!=1 && modalConfig.state!=0">很遗憾，闯关失败！使用通关道具可通关游戏，直接参与抽奖哦~</p>
						<p class="text" v-if="modalConfig.state==0">恭喜！闯关成功！</p>
						<p class="text" style="padding: 30px;" v-if="modalConfig.state==1">恭喜！通关成功！快来试试你的手气，幸运大奖等你开启~</p>
						<div class="img-panel" v-if="modalConfig.state!=1">
							<img :src="modalConfig.imgUrl">
						</div>
						<div class="text-center" v-if="modalConfig.state==1">
							<img :src="'r/images/gold.png'" v-if="!goldOpen">
							<img :src="'r/images/gold-open.png'"  v-if="goldOpen">
						</div>
						<div class="btn-panel">
							<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" v-if="modalConfig.state==0" @click="next">挑战下一关</a>
							
							<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" v-if="modalConfig.state!=0 && modalConfig.state!=1" @click="once('once')">重新挑战</a>
							<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" v-if="modalConfig.state!=0 && modalConfig.state!=1" @click="passKey()">使用道具</a>
							<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" @click="isLucky()" v-if="modalConfig.state==1">幸运开奖</a>
						</div>
					</div>
					<div v-if="modalConfig.prize">
						<p class="text" style="margin-top: 60px;">恭喜！领取到‘{{prizeObj.prizename}}’</p>
						<div class="text-center" style="background: url('./q/images/prize-bg.jpg') center center no-repeat; height: 170px;">
							<img :src="$root.activityBasePath+prizeObj.url">
						</div>
						<div class="btn-panel">
							<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" @click="goToPrize">去领奖</a>
						</div>
					</div>
				
				</div>
				
			</div>
		</modal>
		
   	
   		<modal :show.sync="showKeyObj.show" :bg="false" :backdrop="false">
			<div class="success-view">
	   			<div class="box" style="background-image: url('./r/images/modal-bg3.png'); background-size: 100% 100%;">
					<p class="title">提示</p>
						<p class="text" style="color: #fff; margin-top: 80px;">{{showKeyObj.test}}</p>
						<div class="text-center">
							<img :src="$root.activityBasePath+showKeyObj.url">
						</div>
						
						<div class="btn-panel">
							<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" @click="once(showKeyObj.status)">继续挑战</a>
							<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" @click="openVip" v-if="showKeyObj.status == 'novip'">开通使用</a>
							<a style="background: url('./r/images/btn-bg.png') center center no-repeat;" @click="usePassKey()" 
							v-if="showKeyObj.status == 'vip'" >开始使用</a>
						</div>
					</div>
					<!-- <div class="btn-close" @click="showTimeStarBtn"><img :src="'q/images/close.png'" /></div> -->
					
				</div>
	   		</div>	
   		</modal>
	</div>
</template>
<script>
	import timer from './components/timer/timer.vue'
	import checkbox from './components/checkbox.vue'
	import modal from './modal/Modal.vue'
	import api from './utils/serverapi.js'
	import urlUtil from './utils/url.js'
	import music from './components/music.vue'
	import timemodal from './modal/timeModal.vue'
	import {
		router
	} from './index'
	export default {
				components: {
					modal,
					timemodal
				
				},
				
				ready() {
					var gameVue = this;
                    this.$root.musicData.showMusic = true;
					this.$root.$refs.music.sounddisable(false);
					gameVue.activity = this.$root.activityinfostr;
					gameVue.activityInfo = JSON.parse(gameVue.activity.extbody);
					if(!sessionStorage.getItem("showMsgFlag")){
	 					sessionStorage.setItem("showMsgFlag",true);
	 					this.showMsg=true;
	 				}else{
	 					//this.showTimeCount();
	 					this.showTimeClick();
	 				}
					
					
					
					


//--------------app-------------------



var TIME_LIMIT = parseInt(gameVue.activityInfo.time);
var QIPA_DEBUG = !1;
var IS_IOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1;
var IS_ANDROID = -1 < navigator.userAgent.indexOf("Android");
var pass_text;
var S_T = "\u0058 ";

function qipaLog() {
	QIPA_DEBUG && console.log(arguments)
}
 (function(a,f) {
	a.onNewScore = function(b) {
		qipaLog(b);
	};
	a.score = 0;
})(window.qipaApp = window.qipaApp || {});


//-----------------stage---------------------

var W = window.innerWidth;
// var W = 640;
var H = 1E3;
var IS_TOUCH;
var SCREEN_SHOW_ALL = !0; 

(function(a,d) {
	function b() {
		var c = a.stage.canvas,
		k = window.innerWidth,
		b = window.innerHeight;
		// console.log("ssssss111w-"+W+"-H-"+H+"-K-"+k+"-b-"+b);
		if (SCREEN_SHOW_ALL) k / b > W / H ? k = W * b / H: b = H * k / W,
		c.style.marginTop = 0;
		else {
			var d = W * b / H;
			k >= d ? (k = d, stage.x = 0) : stage.x = (k - d) / 2
		}
		// console.log("w-"+W+"-H-"+H+"-K-"+k+"-b-"+b);
		c.width = W;
		c.height = H;
		c.style.width = k + "px";
		c.style.height = b + "px"
	}
	var l = null,
	f = null,
	g = null,
	e = null,
	h = null;
	a.stage = null;
	a.queue = null;
	a.init = function(c) {
		console.log("ssssss-----init");
		h = c;
		IS_ANDROID && (createjs.Sound.play = function(c, b) {
			var e = a.queue.getResult("sound");
			e.currentTime = this.soundSprite[c];
			e.play();
			b != d && !0 == b && (null != l && (clearTimeout(l), l = null), l = setTimeout(function() {
				createjs.Sound.play("silenttail")
			},
			1E3))
		},
		createjs.Sound.registMySound = function(a, c) {
			this.soundSprite || (this.soundSprite = {});
			this.soundSprite[a] = c
		});
		a.onload();
	};
	a.onload = function() {
		console.log("ssssss-----onload");
		// alert("ssssss-----onload");
		a.stage = new createjs.Stage("stage");
		a.queue = new createjs.LoadQueue(!1);
		a.queue.setMaxConnections(30);
		if (IS_TOUCH = createjs.Touch.isSupported()) {
			createjs.Touch.enable(a.stage, !0);
			a.stage.mouseEnabled = !1;
			var c = new createjs.Shape;
			c.graphics.f("white").r(0, 0, W, H);
			a.stage.addChild(c)
		}
		createjs.Ticker.setFPS(60);
		setTimeout(b, 100);
		createjs.Ticker.on("tick", a.stage);
		a.queue.on("complete", h.startFunc, null, !0);
		h.img && a.queue.loadManifest(h.img, !1);
		h.audio && (IS_ANDROID ? a.queue.loadFile({
			id: "sound",
			src: basePath + "src/audio/all.mp3"
		}) : (createjs.Sound.alternateExtensions = ["ogg"], a.queue.installPlugin(createjs.Sound), a.queue.loadManifest(h.audio, !1)));
		a.queue.load()
	};
	window.onload = a.onload;
	window.onresize = b;
	createjs.DisplayObject.prototype.do_cache = function() {
		var a = this.getBounds();
		this.cache(a.x, a.y, a.width, a.height)
	};
})(window.qipaStage = window.qipaStage || {});


//----------------main----------------

H = window.innerHeight;
// H = 960;
function qp_a(a) {console.log(a);}
var qp_b = TIME_LIMIT,
qp_c, qp_d = 1,
qp_e = 3,//每张图片准备几张
lw_c = 1,//礼物种类数
lw_s = [0,0,0,0,0,0],//每种礼物当前要用图片的下标组
qp_f = 0,//当前要用图片的下标
lw_score = 0,
qp_g = 420,
qp_h = 0,
qp_i = [],
qp_j = 20,
qp_k = 0,
qp_l,
qp_m = -1,
qp_n = 0,
qp_o = 0,
ee = false;
function qp_p() {
	TIME_LIMIT = parseInt(gameVue.activityInfo.time);
	qp_b = TIME_LIMIT;

	qipaStage.stage.arrow.visible = !0;
	qipaApp.score = 0;
	qp_n = qp_b;
	qp_m = -1;
	qipaStage.stage.num.txt.text = '00:' + qp_n;
	qp_k = 0;
	qp_o = 1;
	// qipaApp.onGameStarted()
}
window.restartsm = qp_p;
function countdown(){qp_m = 0;}
window.jystart = countdown;
function countStop(){qp_m = -1;}
window.jyend = countStop;
function scoreReset(){
	qipaApp.score = 0;
}
window.resetScore = scoreReset;

// function qp_r() {
// 	qipaStage.stage.splash.visible = !0
// }
function qp_s() {
	qipaStage.stage.arrow.visible = !1;
	// qp_m = 0
}
function qp_t() {
	qp_o = 3;
	qp_l = setTimeout(function() {
		window.clearTimeout(qp_l)
	},
	900);
	qp_u();
	qipaApp.onNewScore(qipaApp.score);
	// qipaApp.onGameOver();
	// qipaStage.stage.gameover.visible = !0;
	gameVue.gameFailsee(qipaApp.score);
	qipaStage.stage.gameover.refresh()
}
function qp_v(a) {
	IS_ANDROID && (createjs.Sound.registMySound("count", 0), createjs.Sound.registMySound("silenttail", 0.25));
	qp_w();
	qp_u();
}
// function Qp_x() {
// 	this.initialize();
// 	// this.bg = new createjs.Shape;
// 	// // this.bg.graphics.beginFill("#559966").drawRect(0, 0, W, H);
// 	// var sbg = qipaStage.queue.getResult("bg");
// 	// this.bg.graphics.bf(sbg).drawRect(0, 0, W, H);

// 	this.bg = new createjs.Bitmap(qipaStage.queue.getResult("bg"));
// 	this.bg.scaleY = H/this.bg.getBounds().height;
// 	this.bg.scaleX = W/this.bg.getBounds().width;

// 	this.addChild(this.bg);
// 	// this.label = new createjs.Bitmap(qipaStage.queue.getResult("splashtitle"));
// 	// this.label.x = (W - this.label.getBounds().width) / 2;
// 	// this.label.y = 100;
// 	// this.addChild(this.label);
// 	this.start = new createjs.Bitmap(qipaStage.queue.getResult("mb0"));
// 	this.start.y = H - 300;
// 	this.start.x = (W - this.start.getBounds().width) / 2;
// 	this.addChild(this.start);
// 	this.arrow = new createjs.Bitmap(qipaStage.queue.getResult("starttip"));
// 	this.arrow.y = H - 400;
// 	this.arrow.x = (W - this.arrow.getBounds().width) / 2;
// 	this.addChild(this.arrow);
// 	var a, b;
// 	this.start.on("mousedown",
// 	function(c) {
// 		0 == qp_o && (a = c.localY, b = H - 300)
// 	});
// 	this.start.on("pressmove",
// 	function(c) {
// 		0 == qp_o && SplashPressmoveEvent(c.localY - a, b)
// 	});
// 	this.start.on("pressup",
// 	function(b) {
// 		0 == qp_o && 30 > a - b.localY && (createjs.Sound.play("count", !0), createjs.Tween.get(qipaStage.stage.splash.start).to({
// 			y: -H
// 		},
// 		400).call(function(a) {
// 			qipaStage.stage.splash.arrow.visible = !1;
// 			qp_p();
// 			qipaStage.stage.splash.visible = !1
// 		}))
// 	})
// }
// Qp_x.prototype = new createjs.Container;
// function SplashPressmoveEvent(a, b) {
// 	qipaStage.stage.splash.start.y + a < b && (qipaStage.stage.splash.start.y += a)
// }
function qp_w() {
	console.log("ssssss-----qp_w");
	// alert("ssssss-----qp_w");
	// var a = new createjs.Shape;
	// // a.graphics.beginFill("#559966").drawRect(0, 0, W, H);
	// var sbg = qipaStage.queue.getResult("bg");
	// a.graphics.bf(sbg).drawRect(0, 0, W, H);

	var a = new createjs.Bitmap(qipaStage.queue.getResult("bg"));
	if(!a.getBounds()){
		return;
	}
	a.scaleY = H/a.getBounds().height;
	a.scaleX = W/a.getBounds().width;

	qipaStage.stage.addChild(a);

	var b = new createjs.Shape;
	b.graphics.beginFill("white").rect(0, 200, W, H);
	a.hitArea = b;
	var c = 0,
	d = 0;
	a.on("mousedown",
	function(a) {
		var index = genRandom(lw_c);
		if(index == lw_c)index = 0;
		lw_score = index;
		var ii = lw_s[index];
		++lw_s[index];
		if(lw_s[index]>=qp_e)lw_s[index]=0;
		qp_f = ii + index*qp_e;


		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 2 != qp_o && 1 != qp_o || (c = a.localY, d = qipaStage.stage.player.m[qp_f].y)
	});
	a.on("pressmove",
	function(a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (1 == qp_o && (qp_s(), qp_o = 2), 2 == qp_o && (qipaStage.stage.player.m[qp_f].visible = !0, qipaStage.stage.player.m[qp_f].y += (a.localY - c) / 1.5))
	});
	var f = 0;
	a.on("pressup",
	function(a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 2 != qp_o || (50 < c - a.localY ? (a = (new Date).getTime(), 0 < qp_i.length && qp_i[qp_i.length - 1] + 50 > a ? qp_a("WARNING: Too fast! maybe engine error.") : (f = qp_y(a), f <= qp_j ? (qp_k++, qipaApp.score+=1, qipaStage.stage.player.playAnimation(qipaStage.stage.player.m[qp_f]), createjs.Sound.play("count", !0)) : (qp_i.length--, qp_a("WARN: " + f)))) : (qp_z(d), qipaStage.stage.player.m[qp_f].visible = !1))
	});
	qp_c = [];
	for (a = 0; a <= qp_e; a++) for (qp_c[a] = [], b = 0; b < qp_d; b++) {
		var e = new createjs.Bitmap(qipaStage.queue.getResult("d0"));
		e.regX = e.getBounds().width / 2;
		e.regY = e.getBounds().height / 2;
		e.x = genRandom(W);
		e.y = -H / 2 + genRandom(H);
		e.visible = !1;
		qp_c[a].push(e);
		qipaStage.stage.addChild(qp_c[a][b])
	}
	qipaStage.stage.player = new Qp_A;
	qipaStage.stage.addChild(qipaStage.stage.player);
	qipaStage.stage.num = new Qp_B;
	qipaStage.stage.num.y = 10;
	qipaStage.stage.addChild(qipaStage.stage.num);
	qipaStage.stage.handl = new createjs.Bitmap(qipaStage.queue.getResult("handl"));
	qipaStage.stage.handl.x = (W - qipaStage.stage.handl.getBounds().width) / 5 - 80;
	qipaStage.stage.handl.y = 800;
	qipaStage.stage.handl.visible = !0;
	qipaStage.stage.addChild(qipaStage.stage.handl);
	qipaStage.stage.handr = new createjs.Bitmap(qipaStage.queue.getResult("handr"));
	qipaStage.stage.handr.x = (W - qipaStage.stage.handr.getBounds().width) / 2 + 220;
	qipaStage.stage.handr.y = 800;
	qipaStage.stage.handr.visible = !0;
	qipaStage.stage.addChild(qipaStage.stage.handr);
	qipaStage.stage.arrow = new createjs.Bitmap(qipaStage.queue.getResult("starttip"));
	qipaStage.stage.arrow.x = (W - qipaStage.stage.arrow.getBounds().width) / 2;
	qipaStage.stage.arrow.y = 590;
	qipaStage.stage.arrow.visible = !1;
	qipaStage.stage.addChild(qipaStage.stage.arrow);
	qipaStage.stage.gameover = new Qp_C;
	qipaStage.stage.gameover.x = 0;
	qipaStage.stage.gameover.y = 0;
	qipaStage.stage.gameover.visible = !1;
	qipaStage.stage.addChild(qipaStage.stage.gameover);
	// qipaStage.stage.splash = new Qp_x;
	// qipaStage.stage.addChild(qipaStage.stage.splash);
	qp_p();
	setTimeout(qp_D, 1E3);

	function updateview(a) {
			if(gameVue.$route.path.indexOf('/guess') != 0){
				createjs.Ticker.removeEventListener("tick", updateview);
				return;
			}
			0 <= qp_m && (qp_m += a.delta, a = TIME_LIMIT - parseInt(qp_m / 1E3), a != qp_n && (qp_n = a, qipaStage.stage.num.txt.text = '00:'+ qp_n), 0 >= qp_n && (qp_m = -1, qp_t()));
			gameVue.settimepro(qp_n);
			if (qipaStage.stage.num) {
				qipaStage.stage.num.sum.text = S_T + qipaApp.score;
			};
			if(qipaApp.score == 100){
				gameVue.gamesee(qipaApp.score);

			}
			
			// if(qipaApp.score==10 && ee== false){
			// 	ee = true;
			// 	gameVue.gamesee(qipaApp.score);
			// 	return;
			// }

		}

	createjs.Ticker.addEventListener("tick",updateview);
}
function Qp_A() {
	this.initialize();
	this.mb = new createjs.Bitmap(qipaStage.queue.getResult("mb0"));
	// this.mb.regX = this.mb.getBounds().width / 2;
	this.mb.regX = this.mb.getBounds().width / 2;
	// console.log('x'+this.mb.getBounds().width / 2);
	this.mb.regY = this.mb.getBounds().height / 2;
	// this.mb.scaleX = 0.85;
	// this.mb.scaleY = 0.85;
	// this.mb.ZIndex = 0;
	this.mb.y = qp_g;
	this.x = W / 2 ;
	this.y = H / 2 - 80;
	this.addChild(this.mb);
	this.m = [];
	for (var a = 0; a < lw_c*qp_e; a++) this.m[a] = new createjs.Bitmap(qipaStage.queue.getResult("m0"+(parseInt(a/3)+1))),
	this.m[a].regX = this.m[a].getBounds().width / 2,
	this.m[a].regY = this.m[a].getBounds().height / 2,
	this.m[a].y = qp_g,
	this.m[a].visible = !1,
	this.addChild(this.m[a]);
	for (a = 0; a < lw_c*qp_e; a++) this.m[a].image = qipaStage.queue.getResult("m0"+(parseInt(a/3)+1));
	for (a = 0; a < qp_c.length; a++) for (var b = 0; b < qp_c[a].length; b++) qp_c[a][b].image = qipaStage.queue.getResult("d0")
}
Qp_A.prototype = new createjs.Container;
Qp_A.prototype.playAnimation = function(a) {
	a.visible = !0;
	createjs.Tween.get(a).to({
		scaleX: 0.5,
		scaleY: 0.5,
		y: -H
	},
	300).to({
		visible: !1,
		y: qp_g,
		scaleX: 1,
		scaleY: 1
	},
	0);
	// 0 < qp_f ? qp_f--:qp_f = qp_e
};
function genRandom(a) {
	return parseInt(Math.random() * a)
}
function qp_E(a) {
	return 10
}
var qp_F = 0;
function qp_D() {
	if(gameVue.$route.path.indexOf('/guess') != 0){
		return;
	}
	for (var a = 0; a < qp_d; a++) qp_c[qp_F][a].visible = !0,
	createjs.Tween.get(qp_c[qp_F][a]).to({
		y: H + qp_c[qp_F][a].getBounds().height / 2 + 100,
		rotation: 720 + genRandom(400),
		x: genRandom(W)
	},
	1E3 + genRandom(800)).to({
		visible: !1
	},
	10).to({
		x: genRandom(W),
		y: -H / 2 + genRandom(H / 2),
		rotation: 0
	},
	10);
	qp_F < qp_e ? qp_F++:qp_F = 0;
	setTimeout(qp_D, 1E3);
}
function qp_z(a) {
	var b = Math.abs(qipaStage.stage.player.m[qp_f] - a);
	createjs.Tween.get(qipaStage.stage.player.m[qp_f]).to({
		y: a
	},
	20 * b)
}
function Qp_C() {
	this.initialize();
	// var a = new createjs.Shape
	// b = qipaStage.queue.getResult("dlgbg");
	// // var dbg = new createjs.Bitmap(qipaStage.queue.getResult("dlgbg"));
	// a.setBounds(60, 0, b.width-120, b.height);
	// a.graphics.bf(b).r(60, 0, b.width-120, b.height);
	// this.addChild(a);

	var sbg = new createjs.Shape;
	sbg.graphics.beginFill("rgba(0,0,0,.5)").drawRect(0, 0, W, H);
	this.addChild(sbg);

	var a = new createjs.Bitmap(qipaStage.queue.getResult("dlgbg"));
	a.x = 10;
	a.y = 260;
	// a.setBounds(60, 0, W-120, 400);
	this.addChild(a);
	var b;


	b = new createjs.Bitmap(qipaStage.queue.getResult("start"));
	b.x = 60;
	b.y = a.y + a.getBounds().height - 200;
	b.on("click",
	function(a) {
		qp_p();
		qipaStage.stage.gameover.visible = !1
	});
	var c = new createjs.Bitmap(qipaStage.queue.getResult("rank"));
	c.x = W / 2-10;
	c.y = b.y-23;
	c.regX = c.getBounds().width / 2;
	c.on("click",
	function(a) {
		// 查看积分
		gameVue.checkIntegral();
		
	});
	var d = new createjs.Bitmap(qipaStage.queue.getResult("share"));
	d.x = W - 40;
	d.y = b.y;
	d.regX = c.getBounds().width;
	d.on("click",
	function(a) {
		//点击分享
		gameVue.showShare();
	});
	this.addChild(b);
	this.addChild(c);
	this.addChild(d);
	this.scoreText = new createjs.Text("", "bold 60px Arial", "#fff");
	this.scoreText.textAlign = "center";
	this.scoreText.x = W / 2;
	this.scoreText.y = a.y + 70;
	this.addChild(this.scoreText);
	this.shareText = new createjs.Text("", "38px Arial", "#eee");
	this.shareText.textAlign = "center";
	this.shareText.x = W / 2;
	this.shareText.y = this.scoreText.y + 100;
	this.addChild(this.shareText);

	// this.shareTip = new createjs.Bitmap(qipaStage.queue.getResult("timeexttip"));
	// this.shareTip.x = W / 2 - 180;
	// this.shareTip.y = this.shareText.y + 150;
	// this.addChild(this.shareTip);
}
Qp_C.prototype = new createjs.Container;
Qp_C.prototype.refresh = function() {
	this.scoreText.text = S_T + qipaApp.score;
	this.shareText.text = 0 < qipaApp.score ? pass_text.replace("\u6bd4", "\n\u6bd4").replace("\u6211\u662f", "\n\u6211\u662f").replace("\u79bb", "\n\u79bb").replace("\u6211\u8981", "\n\u6211\u8981") : "";
};

function Qp_B() {
	this.initialize();
	this.tmbg = new createjs.Bitmap(qipaStage.queue.getResult("sumbg"));
	this.tmbg.x = (W - this.tmbg.getBounds().width)-10;
	this.tmbg.y = 180;
	this.addChild(this.tmbg);
	this.sum = new createjs.Text(S_T + qipaApp.score, "bold 45px Arial", "#fff");
	this.sum.textAlign = "center";
	this.sum.textBaseline = "middle";
	this.sum.x = W - 90;
	this.sum.y = this.tmbg.y + 60;
	this.addChild(this.sum);
	this.tmbg1 = new createjs.Bitmap(qipaStage.queue.getResult("timebg"));
	this.tmbg1.scaleX = 0.8;
	this.tmbg1.x = (W - 0.8 * this.tmbg1.getBounds().width);
	this.tmbg1.x = (W - this.tmbg1.getBounds().width) /2 + 30;
	this.tmbg1.y = 100;
	this.addChild(this.tmbg1);
	// this.tmicon = new createjs.Bitmap(qipaStage.queue.getResult("tmicon"));
	// this.tmicon.x = this.tmbg1.x + 14;
	// this.tmicon.y = this.tmbg1.y + 14;
	// this.addChild(this.tmicon);
	this.txt = new createjs.Text('00:'+qp_n, "bold 45px Arial", "#974832");
	this.txt.textAlign = "center";
	this.txt.textBaseline = "middle";
	this.txt.x = 320;
	this.txt.y = 160;
	// this.txt.x = this.tmbg1.x + this.tmbg1.getBounds().width / 2;
	// this.txt.y = this.tmbg1.y + this.tmbg1.getBounds().height / 2;
	this.addChild(this.txt)
}
Qp_B.prototype = new createjs.Container;
function qp_y(a) {
	var b = 0;
	if (0 != qp_i.length) {
		var c;
		for (c = 0; c < qp_i.length && !(qp_i[c] > a - 1E3); c++);
		for (var b = qp_i.length - c,
		d = c; d < qp_i.length; d++) qp_i[d - c] = qp_i[d];
		qp_i.length -= c
	}
	qp_i.push(a);
	return parseInt(b)
}
function qp_u() {
	var title = qipaApp.score >= 100 ? "\u606d\u559c" : "\u6311\u6218\u5931\u8d25";
	if (0 == qipaApp.score) pass_text = title;
	else {
		var a = parseInt(Math.sqrt(1E4 * qipaApp.score / 17E3));
		99 < a && (a = "99.9");
		if(qipaApp.score >= 100){
			pass_text = "\u6211\u6570\u4e86" + S_T + qipaApp.score + "\uff0c\u6bd4" + a + "%\u7684\u4eba\u6709\u94b1\uff01\u6211\u662f" + "\u5bcc\u8c6a\uff0c\u9886\u53d6\u79ef\u5206" + "...";
		}else{
			pass_text = "\u60a8\u672a\u6210\u529f\u54bb\u51fa\u0035\u4e2a\u793c\u7269\uff0c\u7ee7\u7eed\u52a0\u6cb9\uff01";
		}
		
		// gameVue.saveUserScore(qipaApp.score);
	}
	// dp_submitScore(qipaApp.score);
}
var _cfg = {
	startFunc: qp_v,
	img: {
		path: basePath + "r/images/",
		manifest: [{
			src: "letter.png",
			id: "m01"
		},
		// {
		// 	src: "gift-2.png",
		// 	id: "m02"
		// },
		// {
		// 	src: "gift-3.png",
		// 	id: "m03"
		// },
		// {
		// 	src: "gift-4.png",
		// 	id: "m04"
		// },
		// {
		// 	src: "gift-5.png",
		// 	id: "m05"
		// },
		// {
		// 	src: "gift-6.png",
		// 	id: "m06"
		// },
		{
			src: "time-bg.png",
			id: "timeexttip"
		},
		{
			src: "letter.png",
			id: "mb0"
		},
		{
			src: "letter2.png",
			id: "d0"
		},
		{
			src: "arrow.png",
			id: "starttip"
		},
		{
			src: "hand-left.png",
			id: "handl"
		},
		{
			src: "hand-right.png",
			id: "handr"
		},
		{
			src: "score-bg.png",
			id: "sumbg"
		},
		{
			src: "time-bg.png",
			id: "timebg"
		},
		{
			src: "letter2.png",
			id: "start"
		},
		{
			src: "letter2.png",
			id: "rank"
		},
		{
			src: "letter2.png",
			id: "share"
		},
		{
			src: "modal-bg.jpg",
			id: "dlgbg"
		},
		{
			src: "game-bg.jpg",
			id: "bg"
		}]
	},
	audio: {
		path: basePath + "src/audio/",
		manifest: [{
			src: "",
			id: "count"
		}]
	}
};
qipaStage.init(_cfg);

        },
        data() {
        	return {
        		activity:{mname:''},
        		activityInfo:{background:"",logo:"",levels:"",ruleContent:"",time:'0',timeext:'0'},
        		sharetip:false,
        		// showText:false,
        		showMsg: false,
        		// showGameSuccess: true,
        		// showGamefail: false,
        		timeTest: 3,
        		showTime: false,
        		timepro:100,
        		showTimeStartBtn:false,
        		guessType:'',
        		modalConfig: {
					state: 0,
					show: false,
					imgUrl: 'q/images/lele-smile.png',
					result:false,
					prize:false,
				},
				iclick:false,
        		times:'',
        		prizeObj:{
        			prizename:'',
        			url:'',
        			sid:null,
        		},
        		showKeyObj:{
        			show:false,
        			test:'',
        			url:'',
        			status:'',
        		},
        		ischeck:false,
        		ischeckTwo:false,
        		goldOpen: false,


        	}
        },
        methods:{
        	settimepro(p){
        		this.timepro = (p/30)*100;
        	},
        	
            gamesee(score){
				if(score == 100){
            		this.modalConfig.state = 1;
            		this.passResult();
            		window.jyend();
            	}
            	// window.resetScore();
            },
            gameFailsee(score){
            	if(score == 100){
            		return;
            	}else{
            		this.modalConfig.state = 2;
					this.modalConfig.imgUrl = "r/images/lele-cry.png";
					this.modalConfig.show = true;
					this.modalConfig.result = true;
					
            	}
            	window.resetScore();
            },
            // //显示可点击倒计时按钮
            showTimeClick(index){
            	// console.log('showTimeClick'+index)
            	this.showMsg = false;
				this.showTimeStartBtn = true;
				this.guessType = index;
				
            },
            //点击开始倒计时
            showTimeStart(){
            	// console.log('showTimeStart'+this.guessType);
            	this.showTimeCount(this.guessType);
            },
            showTimeCount(index){
            	this.timeTest = 3;
            	this.showMsg = false;
            	this.showTimeStartBtn = false;
            	this.showTime = true;
            	var timeout=setInterval(()=>{
	 				this.timeTest--;
	 				if(this.timeTest<1){
	 					this.showTime = false;
	 					window.jystart();
	 					if(index == 'reset'){
	 						window.restartsm();
	 						window.jystart();	
	 					}
	 					clearTimeout(timeout);
	 				}
	 			},1000);

            },

             //通关成功modal
			passResult() {
				var that = this;
				that.$root.gameLevel = 1;
				that.modalConfig.imgUrl = "q/images/lele-smile.png";
				setTimeout(function(){
					that.modalConfig.show = true;
				     that.modalConfig.result = true;
				 },500)
				
			},
			//通关道具
			passKey(){
				if(this.$route.path.indexOf('/guess') != 0){
					return;
				}
				var that = this;
				window.jyend();
				if(!that.$root.islogin){
					that.$root.login = true;
					that.$root.loginokcallback = this.lb;
					that.$root.$refs.login.setLoginCloseListen(this.once);
				}else{
					that.showKeyObj.show = true;
					if(that.$root.cookieVip == "0000000000"){
						that.showKeyObj.status = 'vip';
						that.showKeyObj.url = '/images/key.png';
						that.showKeyObj.test = '您已是沃音乐会员，可使用通关道具！（使用道具实现游戏通关，可立即参与抽奖）';
					}
					else{
						that.showKeyObj.status = 'novip';
						that.showKeyObj.url = '/images/lele-cry.png';
						that.showKeyObj.test = '抱歉，您还不是沃音乐会员，无法使用通关道具！开通会员即可使用，首月还可免会员资费！';
					}
					
				}
			},
			usePassKey(){
				this.showKeyObj.show = false;
				sessionStorage['pass'] = true;
				this.modalConfig.state = 1;
				window.jyend();
				this.passResult();
			},
			openVip(){
				this.showKeyObj.show = false;
				this.$root.vipbenefit = true;
				//开通完会员调this.passKey
				this.$root.$refs.openvip.setOpenvipListen(this.passKey);
			},
			//重新挑战
			once(type){
				var that = this;
				// that.guessType = 'reset';
				window.jyend();
				if(type == 'vip'){
					that.addOperLog('button','a-keyOnce');
				}
				else if(type == 'novip'){
					that.addOperLog('button','a-nokeyOnce');
				}else{
					that.addOperLog('button','a-failOnce');
				}
				that.showKeyObj.show = false;
				that.modalConfig.show = false;
				that.modalConfig.result = false;
				
				// location.reload();
				// that.init();
				that.showTimeClick('reset');
			},
			//下一关
			next(){
				this.addOperLog('button','a-sucessNext');
				this.modalConfig.show = false;
				this.modalConfig.result = false;
				// location.reload();
				//this.init();
				this.showTimeClick();
			},
			
			
			// //显示可点击倒计时按钮
			// showTimeStarBtn(){
			// 	this.showMsg = false;
			// 	this.showTime = false;
			// 	this.showTimeStartBtn = true;

			// },
			activityRule() {
				this.addOperLog('button','a-rule');
				this.$root.showActivityD = true;
			},	
			addOperLog(type, btnName) {
				api.addOperLog(this, {
					'aid': aid,
					'type': type,
					'button_name': btnName,
					'source': source
				}, (back) => {})
			},
			
			saveUserH5Info() {
				var that = this;
				if(!that.$root.islogin) return;
				that.$dispatch('loading', {
					name: 'guess_save',
					icon: true,
					text: '数据保存中...',
					show: true,
					duration: 20 * 1000
				});
				api.saveUserH5Info(this, {
					types: '拼歌单达人',
					scoreorg: that.$root.gameLevel
				}, (back) => {
					that.$dispatch('cancelloading', 'guess_save');
					that.$root.gameLevel = -1;
					if(back.resCode == "0") {
					
					} else {
						that.$dispatch('handle_server_error', back);
					}
				})
			},
			//点击翻牌
			isLucky() {
				this.addOperLog('button','a-successPrize');
				this.$root.gameLevel = 1;
				if(!this.$root.islogin){
					this.$root.login = true;
					this.$root.loginokcallback = this.timeb;
					this.$root.whereLogin= "a-login";
				}else{
					this.goldOpen = true;
					this.saveUserH5Info();
					this.isDoLucky();
					
				}
				
			},
			// 判断是否有机会
		    isDoLucky(){
		    	if(this.$root.cookieVip == "0000000000"){
		    		if(!this.iclick) {
						this.userDoLucky();
					} 
				
		    	}else{
		    		this.$root.openvip = true;
		    	}
				
			},
			//用户抽奖
			userDoLucky() {
				var that = this;
				that.iclick = true; //不能点击
				
				api.doLucky(this, {
					"types": "跑马灯"
				}, (back) => {
					that.getActUserTimes();
					if(back.resCode == '0') {
						var prize = back.repBody[0];
						that.prizeObj.prizename = prize.pname;
						that.prizeObj.url = prize.imgurl;
						that.prizeObj.sid = prize.sid ? prize.sid : '';
						sessionStorage.setItem('luckyId',prize.gid)
						sessionStorage.setItem('lingitem',JSON.stringify(prize));
						that.goldOpen = false;
						that.modalConfig.result = false;
						that.modalConfig.prize = true;
						localStorage.setItem('awardmobile',"false");
					}else if(back.resCode == '20001'){
						that.modalConfig.show = false;
						that.modalConfig.result = false;
						that.$root.alreadyprize = true;
						// var prize = back.repBody[0];
						// that.prizeObj.prizename = prize.pname;
						// that.prizeObj.url = prize.imgurl;
						// that.prizeObj.sid = prize.sid ? prize.sid : '';
						// sessionStorage.setItem('luckyId',prize.gid)
						// sessionStorage.setItem('lingitem',JSON.stringify(prize));
						// that.modalConfig.result = false;
						// that.modalConfig.prize = true;
						// localStorage.setItem('awardmobile',"true");
					}
					else {
						that.$dispatch('handle_server_error', back);
					}
					that.unPrize = back.resMsg;
					that.iclick = false;
				});
			},	
			//去领奖
			goToPrize(){
				var that = this;
				// if(!that.$root.islogin){
				// 	that.$root.login = true;
				// 	that.$root.loginokcallback = that.lb;
				// }else{
				if(that.$root.cookieVip == "0000000000"){
					if(that.prizeObj.sid == ''){
						that.addOperLog('button','a-nosidGoprize');
						that.modalConfig.show = false;
						that.modalConfig.prize = false;
						that.$root.showAddress = true;
					}else{
						that.addOperLog('button','a-sidGoprize');
						that.modalConfig.show = false;
						that.modalConfig.prize = false;
						that.$root.buytone = true;
					}
				}else{
					// that.modalConfig.show = false;
					// that.modalConfig.prize = false;
					that.$root.openvip = true;
					that.$root.$refs.openvip.setOpenvipListen(null);
				}
				// }
			},	
			// 获取剩下的次数    
			getActUserTimes() {
				var that = this;
				api.queEveryDay(this, {}, (back) => {
					if(back.resCode == 0 || back.resCode == "0") {
						that.times = parseInt(back.repBody[0].player);
					} else {
						that.$dispatch('handle_server_error', back);
					}
				})
			},
			lb(){
				this.getActUserTimes();
				this.passKey();
			},
			timeb(){
				this.getActUserTimes();
			},








   //          goMarquee(){
   //          	router.go('marquee');
   //          },
   //          //保存分数
   //      	saveUserScore(score){
   //      		var that =  this;
   //              that.saveUserH5Info(score);
        
   //          },
           
   //          //查看积分
   //          checkIntegral(){
            
   //          },
   //          gamefail(){
   //          	this.showGamefail = false;
   //          	this.timeTest = 3;
   //          	this.showTimeClick('reset');

            	
            	

   //          },
   //          saveUserH5Info(s) {
			// 	var that = this;
			// 	if(!that.$root.islogin) return;
			// 	that.$dispatch('loading', {
			// 		name: 'app_save',
			// 		icon: true,
			// 		text: '数据保存中...',
			// 		show: true,
			// 		duration: 20 * 1000
			// 	});
			// 	sapi.saveUserH5Info(this, {
			// 		types: '拼歌单达人',
			// 		scoreorg: s,
			// 	}, (back) => {
			// 		that.$dispatch('cancelloading', 'app_save');
			// 		that.$root.gameLevel = -1;
			// 	})
			// },
            
        }
	}
</script>
<style lang="sass">
	@function px2rem($px) {
		$return: #{($px / 8px / 2)}rem;
		@return $return;
	}
	.music_play{
            position:absolute;
            top:22%;
            left:0;
            width:100%;
            text-align:center;
            .img_center{
            	width:420px;
            	height:420px;
            	border-radius:50%;
            	overflow:hidden;
            }
			.play_cd_r{
				position:absolute;
				top:-10%;
				right:3%;
				img{
					
				}

			}
     }
     @-webkit-keyframes rotation{
             from {-webkit-transform: rotate(0deg);}
             to {-webkit-transform: rotate(360deg);}
     }
     .play_start{
             -webkit-transform: rotate(360deg);
             animation: rotation 3s linear infinite;
             -moz-animation: rotation 3s linear infinite;
             -webkit-animation: rotation 3s linear infinite;
             -o-animation: rotation 3s linear infinite;
         }
         .play_stop{
             -webkit-transform-origin:top right;
             -webkit-transform: rotate(0deg);
         }
        /* .play_start_r{
             -webkit-transform-origin:top right;
             -webkit-transform: rotate(17deg);
         }
         .play_stop_r{
             -webkit-transform: rotate(0deg);
     }*/
	.success-view {
		.box {
			position: relative;
			padding: 20px;
			margin: 0 auto;
			// text-align: center;
			box-sizing: border-box;
			color: #fff;
			.img-panel {
				width: 100%;
				text-align: center;
				margin: 30px 0px;
			}
			.text{
				font-size: 32px;
			}
			.btn-panel {
				width: 100%;
				text-align: center;
				a {
					font-size: 32px;
					display: inline-block;
					line-height: 90px;
					// border-radius: 78px;
					width: 243px;
					color: #fff;
					height: 90px;
				}
				.blue {
					background-color: #ffab00;
				}
				.yellow {
					background-color: #fd6751;
				}
			}
			.title {
				font-size: 50px;
				font-weight:bold;
				line-height: 46px;
				color: #fff;
				text-align: center;
				padding-top: 100px;

			}
		}
		.close-img {
			position: absolute;
			right: 20px;
			top: 20px;
			max-width: 56px;
			max-height: 50px;
		}
	}
	
	.app-view.view-activity {
		.question-list {
			position: absolute;
			color: white;
			top: 68%;
			width: 600px;
			height: 320px;
			border: 1px solid;
			margin-left: -300px;
			left: 50%;
			background-color: rgba(90, 28, 23, 0.9);
			border-color: #3683a2;
			padding: 20px;
			font-size: 28px;
			.title {
				border-bottom: 1px solid #3683a2;
				padding: 15px;
			}
			ul {
				li {
					width: 100%;
					font-size: 0;
					padding: 2% 5%;
					height: 60px;
					.name {
						width: 70%;
						display: inline-block;
						font-size: 28px;
					}
					.check-box {
						width: 30%;
						font-size: 28px;
						display: inline-block;
						text-align: right;
					}
				}
			}
		}
		width: px2rem(640px);
		// height: px2rem(1008px);
		// min-height: px2rem(1120px);
		> .wap-timer {
			width: px2rem(262px);
			height: px2rem(60px);
			margin: auto;
			.wap-timer-number {
				width: 100%;
				height: 100%;
				p {
					display: inline-block;
					margin: 0;
					width: px2rem(78px);
					height: px2rem(60px);
					color: #fff;
					font-size:3rem;
					float: left;
					margin-right:px2rem(13px);
					box-sizing:border-box;
					padding-left:px2rem(15px);
					&:last-child {
						margin-right: 0;
					}

				}
			}
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
				
			    .content {
				        width: 560px;
					    padding: 0 15px;
					    margin: 160px 40px 0 40px;
					    position: absolute;
					    font-size: 0px;
					   
				    .title{
				      color: #fff;
				      font-size: 50px;
				      line-height: 60px;
				    }
				    .rule{
			    	    color: #fff;
					    padding: 10px;
					    font-size: 23px;
					    text-align: left;
					    font-weight: 600;
					    line-height: 30px;
					    text-align: center;

				    }
				    .prize{
			    	    display: inline-block;
					    padding: 15px 10%;
					    color: #2c447a;
					    font-size: 30px;
					    font-weight: bold;
				    }
				    .item{
				    	a{
			    		    display: inline-block;
						    width: 50%;
						    height: 149px;
						    text-align: center;
				    	}
				    }
				     .right{
				          position: absolute;
				          right: -20px;
				          top: -112px;
				    }
				    
				    .left{
				        position: absolute;
				        left: -20px;
				        top: -112px;
				    }
				    .div1 {
				        border: 1px solid #fff;
				        padding: 10px;
				    }
				    .div2{
				    	min-height: 400px;
				    	.title{
			    		   
						    font-size: 60px;
						    font-weight: 600;
						    line-height: 110px;
				    	}
				    	.text{
						   
						    font-size: 30px;
						    font-weight: 600;
				    	}
				   //  		.confirm-btn{
							//     display: block;
							//     width: 220px;
							//     height: 75px;
							//     margin: 35px auto;
							//     line-height: 70px;
							//     font-size: 30px;
							//     text-align: center;
							//     color: #fff;
							//     font-weight: 600;
						 //        padding-left: 5%;
							
								
							// }
				    }
				  	.btn-close{
			  		    position: absolute;
					    top: -20px;
					    right: -10px;
				  	}
				    
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
	.timetext{
	    width: 200px;
	    height: 200px;
	    line-height: 170px;
	    margin: 0 auto;
	    color: #fff;
	    margin-top: 65%;
	    font-size: 180px;
	    border: 10px solid #fff;
	    border-radius: 50%;
	    text-align:center;
	}
	html,body,canvas {
		margin: 0px;
		padding: 0px;
		border:none;
		text-align: center;
		background-color: black;
	}
	canvas {
		background-color: white;
	}
	.modal-box{
		text-align: center;
	}
	.modal-bg{
		position: relative;
	}
	.modal-con{
		position: absolute;
		top: 50px;
	    left: 20%;
	    width: 60%;
	    text-align: center;
	    z-index: 100;
	}
	.modal-con p{
		color: #fff;
	    margin-top: 120px;
    	font-size: 30px;
	}
	.btn{
		margin-top: 80px;
	}
	.close{
	    position: absolute;
	    right: 10px;
	    top: 10px;
	    z-index: 101;
	}
	.time-wrap{
       position: absolute;
	    top: 124px;
	    left: 28%;
	    width: 100%;
	}
	.time-bottom{
	    width: 40%;
	    background: #e73433;
	    height: 20px;
	    border-radius: 20px;
	    position: relative;
	}
	.time-top{
	    width: 100%;
	    height: 100%;
	    display: inline-block;
	    background: #285f51;
	    border-radius: 20px;
	    text-align: left;
	    position: absolute;
	    left: 0;
	}
	.tool{
	    position: absolute;
	    top: 160px;
	    left: 15px;
	    img{
	    	display: block;
	    }
	}
</style>