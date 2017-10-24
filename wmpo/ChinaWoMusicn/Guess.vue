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
				<img :src="'g/images/logo.png'">
		</div>
		<div class="time-wrap">
			<p class="time-bottom"><span class="time-top"  :style="{ width: timepro + '%' }"></span></p>
			<p></p>
		</div>
		<canvas id="stage">
			您的浏览器不支持html5, 请换用支持html5的浏览器。
		</canvas>

		<section class="model" v-show="showMsg">
   			<div class="panel">
   				<div class="msg">
   					<div class="content" style="text-align: center;">
						<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
						<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
						<div class="div1">
							<div class="content-title">
								<img :src="$root.activityBasePath+'/images/game-rule-1.png'" style="padding-top: 5%;">
								<div class="rule">
									<p>游戏规则：</p>
									<p>圣诞老人的包裹被卡住啦！快动动你的手指拯救礼物，还有机会救出幸运礼物哦！</p>
								</div>
								<p class="prize">活动奖品</p>
								<div class="item">
									<a><img :src="$root.activityBasePath+'/images/game-rule-2.png'"></a>
									<a><img :src="$root.activityBasePath+'/images/game-rule-3.png'"></a>
									<a><img :src="$root.activityBasePath+'/images/game-rule-4.png'"></a>
									<a><img :src="$root.activityBasePath+'/images/game-rule-5.png'"></a>
									
								</div>
							</div>
						</div>
						<div class="btn-close" @click="showTimeCount()"><img :src="'k/images/sp-close.png'" /></div>
					</div>
   				</div>
   				
   			</div>
   			
   		</section>
   		<section class="model" v-show="showTime">
   			<div class="panel">
   				<div class="msg">
   					<p class="timetext">{{timeTest}}</p>
   				</div>
   				
   			</div>
   			
   		</section>
   		<!-- 挑战成功弹框 -->
   		<section class="model" v-show="showGameSuccess">
   			<div class="panel">
   				<div class="msg">
   					<div class="content" style="text-align: center;">
						<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
						<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
						<div class="div2">
							<div class="content-title">
								<p class="title">恭喜</p>
								<div class="item">
									<a><img :src="$root.activityBasePath+'/images/game-success.png'"></a>
								</div>
								<p class="text">你已成功咻出5个幸运礼物！</p>
								<a class="confirm-btn" style="background: url('./k/images/btn-bg.png') center center no-repeat;" @click="goMarquee()">去抽奖</a>
							</div>
						</div>
						<!-- <div class="btn-close" @click="showGameSuccess = false"><img :src="'k/images/sp-close.png'" /></div> -->
					</div>
   				</div>
   				
   			</div>
   			
   		</section>
   		<!-- 挑战失败弹框 -->
   		<section class="model" v-show="showGamefail">
   			<div class="panel">
   				<div class="msg">
   					<div class="content" style="text-align: center;">
						<img :src="$root.activityBasePath+'/images/modal-l.png'" class="left">
						<img :src="$root.activityBasePath+'/images/modal-r.png'" class="right">
						<div class="div2">
							<div class="content-title">
								<p class="title" style="margin-top: 50px;">挑战失败</p>
								<p class="text" style="line-height: 50px;padding-top: 50px;padding-bottom: 20px;">您未成功咻出5个礼物，继续加油！</p>
								<a class="confirm-btn" style="background: url('./k/images/btn-bg.png') center center no-repeat;" @click="gamefail">重新挑战</a>
							</div>
						</div>
						<!--<div class="btn-close" @click="showGamefail = false"><img :src="'k/images/sp-close.png'" /></div>-->
					</div>
   				</div>
   				
   			</div>
   			
   		</section>
	</div>
</template>
<script>
	import timer from './components/timer/timer.vue'
	import checkbox from './components/checkbox.vue'
	import modal from './modal/Modal.vue'
	import sapi from './utils/serverapi.js'
	import urlUtil from './utils/url.js'
	import music from './components/music.vue'
	import {
		router
	} from './index'
	export default {
				components: {
					modal,
				
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
	 					this.showTimeCount();
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
lw_c = 6,//礼物种类数
lw_s = [0,0,0,0,0,0],//每种礼物当前要用图片的下标组
qp_f = 0,//当前要用图片的下标
lw_score = 0,
qp_g = 420,
qp_h = 0,
qp_i = [],
qp_j = 20,
qp_k = 0,
qp_l,
qp_m = 0,
qp_n = 0,
qp_o = 0,
ee = false;
function qp_p() {
	TIME_LIMIT = parseInt(gameVue.activityInfo.time);
	qp_b = TIME_LIMIT;

	qipaStage.stage.arrow.visible = !0;
	qipaApp.score = 0;
	qp_n = qp_b;
	qp_m = 0;
	qipaStage.stage.num.txt.text = '倒数:' + qp_n + '"';
	qp_k = 0;
	qp_o = 1;
	// qipaApp.onGameStarted()
}
window.restartsm = qp_p;
function countdown(){qp_m = 0;}
window.jystart = countdown;
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
	gameVue.gamesee(qipaApp.score);
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
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 2 != qp_o || (50 < c - a.localY ? (a = (new Date).getTime(), 0 < qp_i.length && qp_i[qp_i.length - 1] + 50 > a ? qp_a("WARNING: Too fast! maybe engine error.") : (f = qp_y(a), f <= qp_j ? (qp_k++, qipaApp.score+=(lw_score==2?1:0), qipaStage.stage.player.playAnimation(qipaStage.stage.player.m[qp_f]), createjs.Sound.play("count", !0)) : (qp_i.length--, qp_a("WARN: " + f)))) : (qp_z(d), qipaStage.stage.player.m[qp_f].visible = !1))
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
	qipaStage.stage.tong = new createjs.Bitmap(qipaStage.queue.getResult("tong"));
	qipaStage.stage.tong.x = (W - qipaStage.stage.tong.getBounds().width) / 5;
	qipaStage.stage.tong.y = 700;
	qipaStage.stage.tong.visible = !0;
	qipaStage.stage.addChild(qipaStage.stage.tong);
	qipaStage.stage.arrow = new createjs.Bitmap(qipaStage.queue.getResult("starttip"));
	qipaStage.stage.arrow.x = (W - qipaStage.stage.arrow.getBounds().width) / 2;
	qipaStage.stage.arrow.y = 290;
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
			0 <= qp_m && (qp_m += a.delta, a = TIME_LIMIT - parseInt(qp_m / 1E3), a != qp_n && (qp_n = a, qipaStage.stage.num.txt.text = '倒数:'+ qp_n + '"'), 0 >= qp_n && (qp_m = -1, qp_t()));
			gameVue.settimepro(qp_n);
			if (qipaStage.stage.num) {
				qipaStage.stage.num.sum.text = S_T + qipaApp.score;
			};
			if(qipaApp.score>=5){
				gameVue.gamesee(qipaApp.score);
			}
			
			if(qipaApp.score==5 && ee== false){
				ee = true;
				gameVue.saveUserScore(qipaApp.score);
				return;
			}

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
	// this.mb.ZIndex = 0;
	this.mb.y = qp_g;
	this.x = W / 2 + 50;
	this.y = H / 2 - 250;
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
	this.tmbg.x = (W - this.tmbg.getBounds().width)-100;
	this.tmbg.y = 60;
	this.addChild(this.tmbg);
	this.sum = new createjs.Text(S_T + qipaApp.score, "bold 48px Arial", "#285f51");
	this.sum.textAlign = "center";
	this.sum.textBaseline = "middle";
	this.sum.x = W - 60;
	this.sum.y = this.tmbg.y + 80;
	this.addChild(this.sum);
	// this.tmbg1 = new createjs.Bitmap(qipaStage.queue.getResult("timebg"));
	// this.tmbg1.scaleX = 0.7;
	// this.tmbg1.x = (W - 0.7 * this.tmbg1.getBounds().width) -10;
	// this.tmbg1.x = (W - this.tmbg1.getBounds().width) /2;
	// this.tmbg1.y = 0;
	// this.addChild(this.tmbg1);
	// this.tmicon = new createjs.Bitmap(qipaStage.queue.getResult("tmicon"));
	// this.tmicon.x = this.tmbg1.x + 14;
	// this.tmicon.y = this.tmbg1.y + 14;
	// this.addChild(this.tmicon);
	this.txt = new createjs.Text(qp_n + '"', "bold 35px Arial", "#285f51");
	this.txt.textAlign = "center";
	this.txt.textBaseline = "middle";
	this.txt.x = 320;
	this.txt.y = 180;
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
	var title = qipaApp.score >= 5 ? "\u606d\u559c" : "\u6311\u6218\u5931\u8d25";
	if (0 == qipaApp.score) pass_text = title;
	else {
		var a = parseInt(Math.sqrt(1E4 * qipaApp.score / 17E3));
		99 < a && (a = "99.9");
		if(qipaApp.score >= 5){
			pass_text = "\u6211\u6570\u4e86" + S_T + qipaApp.score + "\uff0c\u6bd4" + a + "%\u7684\u4eba\u6709\u94b1\uff01\u6211\u662f" + "\u5bcc\u8c6a\uff0c\u9886\u53d6\u79ef\u5206" + "...";
		}else{
			pass_text = "\u60a8\u672a\u6210\u529f\u54bb\u51fa\u0035\u4e2a\u793c\u7269\uff0c\u7ee7\u7eed\u52a0\u6cb9\uff01";
		}
		
		gameVue.saveUserScore(qipaApp.score);
	}
	// dp_submitScore(qipaApp.score);
}
var _cfg = {
	startFunc: qp_v,
	img: {
		path: basePath + "k/images/",
		manifest: [{
			src: "gift-1.png",
			id: "m01"
		},
		{
			src: "gift-2.png",
			id: "m02"
		},
		{
			src: "gift-3.png",
			id: "m03"
		},
		{
			src: "gift-4.png",
			id: "m04"
		},
		{
			src: "gift-5.png",
			id: "m05"
		},
		{
			src: "gift-6.png",
			id: "m06"
		},
		{
			src: "gift-3.png",
			id: "timeexttip"
		},
		{
			src: "gift-1.png",
			id: "mb0"
		},
		{
			src: "gift-9.png",
			id: "d0"
		},
		{
			src: "gift-1.png",
			id: "starttip"
		},
		{
			src: "tong.png",
			id: "tong"
		},
		{
			src: "gift-logo.png",
			id: "sumbg"
		},
		// {
		// 	src: "gift-1.png",
		// 	id: "timebg"
		// },
		{
			src: "return-game.png",
			id: "start"
		},
		{
			src: "go-prize.png",
			id: "rank"
		},
		{
			src: "gift-1.png",
			id: "share"
		},
		{
			src: "game-modal-bg.png",
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
        		showGameSuccess: false,
        		showGamefail: false,
        		timeTest: 3,
        		showTime: false,
        		timepro:100

        	}
        },
        methods:{
        	settimepro(p){
        		this.timepro = (p/30)*100;
        	},
        	//分享
        	showShare(){
        		share(sapi.shareUrl());
            },
            gamesee(score){
            	if(score >= 5){
            		this.showGameSuccess = true;
            	}else{
            		this.showGamefail = true;
            	}
            },
            showTimeCount(index){
            	this.showMsg = false;
            	this.showTime = true;
            	var timeout=setInterval(()=>{
	 				this.timeTest--;
	 				if(this.timeTest<1){
	 					this.showTime = false;
	 					clearTimeout(timeout);
	 					window.jystart();
	 					if(index == 'reset'){
	 						window.restartsm();
	 					}
	 				}
	 			},1000);

            },
            goMarquee(){
            	router.go('marquee');
            },
            //保存分数
        	saveUserScore(score){
        		var that =  this;
                that.saveUserH5Info(score);
        
            },
           
            //查看积分
            checkIntegral(){
            
            },
            gamefail(){
            	this.showGamefail = false;
            	this.timeTest = 3;
            	this.showTimeCount('reset');

            	
            	

            },
            saveUserH5Info(s) {
				var that = this;
				if(!that.$root.islogin) return;
				that.$dispatch('loading', {
					name: 'app_save',
					icon: true,
					text: '数据保存中...',
					show: true,
					duration: 20 * 1000
				});
				sapi.saveUserH5Info(this, {
					types: '拼歌单达人',
					scoreorg: s,
				}, (back) => {
					that.$dispatch('cancelloading', 'app_save');
					that.$root.gameLevel = -1;
				})
			},
            
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
			.btn-panel {
				width: 100%;
				text-align: center;
				a {
					font-size: 32px;
					display: inline-block;
					line-height: 78px;
					border-radius: 78px;
					width: 243px;
					color: #4e140c;
					height: 78px;
				}
				.blue {
					background-color: #ffab00;
				}
				.yellow {
					background-color: #fd6751;
				}
			}
			.title {
				font-size: 38.84px;
				font-weight:bold;
				line-height: 46px;
				color: #000;
				text-align: center;

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
				.timetext{
				    // width: 200px;
				    // height: 200px;
				    // line-height: 170px;
				    margin: 0 auto;
				    color: #fff;
				    font-size: 180px;
				    margin-top: 50%;
				    // border: 10px solid #fff;
				    // border-radius: 50%;
				}
			    .content {
				        width: 500px;
					    padding: 0 15px;
					    margin: 160px 70px 0 70px;
					    position: absolute;
					    font-size: 0px;
					    background: #fff;
					    border-radius: 20px;
				    .title{
				      color: #e73433;
				      font-size: 50px;
				    }
				    .rule{
			    	    color: #e73433;
					    padding: 20px;
					    font-size: 23px;
					    text-align: left;
					    font-weight: 600;
					    line-height: 30px;
				    }
				    .prize{
			    	    display: inline-block;
					    background: #357f6c;
					    padding: 15px 10%;
					    border-radius: 40px;
					    color: #fff;
					    font-size: 26px;
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
				      height: 770px;
				    }
				    .div2{
				    	min-height: 400px;
				    	.title{
			    		    color: #e73433;
						    font-size: 60px;
						    font-weight: 600;
						    line-height: 110px;
				    	}
				    	.text{
						    color: #285f51;
						    font-size: 30px;
						    font-weight: 600;
				    	}
				    		.confirm-btn{
							    display: block;
							    width: 220px;
							    height: 75px;
							    margin: 35px auto;
							    line-height: 70px;
							    font-size: 30px;
							    text-align: center;
							    color: #fff;
							    font-weight: 600;
						        padding-left: 5%;
							
								
							}
				    }
				    .btn-close {
				      	position: absolute;
				      	top: 10px;
				      	right: 10px;
				      	img {
				        	width: 61px;
				        	height: 61px;
				      	}
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
</style>