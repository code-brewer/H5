<template>

	<div class="app-view">

		<div class="content">
			<canvas id="stage">
				您的浏览器不支持html5, 请换用支持html5的浏览器。
			</canvas>
			<!-- <div class="gameover">
				<div>
					
				</div>
				
			</div> -->
		</div>
		<!-- <Modal :show.sync="scoreModal" effect="zoom">
			<div class="modal-box award">
	      		<div class="modal-con">
			        <p>恭喜你获得 <span>{{score}}</span> 个会员积分</p>
			        <div class="btn"><img :src="$root.basePath+'src/img/new-activity.png'"></div>
			      
				</div>
				<img :src="$root.basePath+'src/img/close.png'" @click="scoreModal = false" class="close">
				<img :src="$root.basePath+'src/img/modal-bg.png'" class="modal-bg">
	      	</div>
		
		</Modal> -->
		
	</div>
</template>

<style scoped>
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
</style>

		<script>
			import {router} from './index'
			import sapi from './utils/serverapi.js'
			import Modal from './components/Modal.vue'

			export default {
				components: {
					Modal,
				
				},
				
				ready() {
					var gameVue = this;
					gameVue.activity = JSON.parse(localStorage.getItem('activity'));
					gameVue.activityInfo = JSON.parse(gameVue.activity.extbody);
					this.$dispatch('title', '数钱游戏!');
					
					
					
					


//--------------app-------------------



var TIME_LIMIT = parseInt(gameVue.activityInfo.time);
var QIPA_DEBUG = !1;
var IS_IOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1;
var IS_ANDROID = -1 < navigator.userAgent.indexOf("Android");
var pass_text;
var S_T = "\u0024 ";

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
qp_c, qp_d = 5,
qp_e = 3,
qp_f = qp_e,
qp_g = 420,
qp_h = 0,
qp_i = [],
qp_j = 20,
qp_k = 0,
qp_l,
qp_m = 0,
qp_n = 0,
qp_o = 0;
function qp_p() {
	TIME_LIMIT = parseInt(gameVue.activityInfo.time);
	qp_b = TIME_LIMIT;

	qipaStage.stage.arrow.visible = !0;
	qipaApp.score = 0;
	qp_n = qp_b;
	qp_m = -1;
	qipaStage.stage.num.txt.text = qp_n + '"';
	qp_k = 0;
	qp_o = 1;
	// qipaApp.onGameStarted()
}
// function qp_r() {
// 	qipaStage.stage.splash.visible = !0
// }
function qp_s() {
	qipaStage.stage.arrow.visible = !1;
	qp_m = 0
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
	qipaStage.stage.gameover.visible = !0;
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
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 2 != qp_o && 1 != qp_o || (c = a.localY, d = qipaStage.stage.player.m[qp_f].y)
	});
	a.on("pressmove",
	function(a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (1 == qp_o && (qp_s(), qp_o = 2), 2 == qp_o && (qipaStage.stage.player.m[qp_f].visible = !0, qipaStage.stage.player.m[qp_f].y += (a.localY - c) / 1.5))
	});
	var f = 0;
	a.on("pressup",
	function(a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 2 != qp_o || (50 < c - a.localY ? (a = (new Date).getTime(), 0 < qp_i.length && qp_i[qp_i.length - 1] + 50 > a ? qp_a("WARNING: Too fast! maybe engine error.") : (f = qp_y(a), f <= qp_j ? (qp_k++, qipaApp.score += 100, qipaStage.stage.player.playAnimation(qipaStage.stage.player.m[qp_f]), createjs.Sound.play("count", !0)) : (qp_i.length--, qp_a("WARN: " + f)))) : (qp_z(d), qipaStage.stage.player.m[qp_f].visible = !1))
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
			if(gameVue.$route.path.indexOf('/game') != 0){
				createjs.Ticker.removeEventListener("tick", updateview);
				return;
			}
			0 <= qp_m && (qp_m += a.delta, a = TIME_LIMIT - parseInt(qp_m / 1E3), a != qp_n && (qp_n = a, qipaStage.stage.num.txt.text = qp_n + '"'), 0 >= qp_n && (qp_m = -1, qp_t()));
			if (qipaStage.stage.num) {
				qipaStage.stage.num.sum.text = S_T + qipaApp.score;
			};
		}
	createjs.Ticker.addEventListener("tick",updateview);
}
function Qp_A() {
	this.initialize();
	this.mb = new createjs.Bitmap(qipaStage.queue.getResult("mb0"));
	this.mb.regX = this.mb.getBounds().width / 2;
	this.mb.regY = this.mb.getBounds().height / 2;
	this.mb.y = qp_g;
	this.x = W / 2;
	this.y = H / 2 - 150;
	this.addChild(this.mb);
	this.m = [];
	for (var a = 0; 3 >= a; a++) this.m[a] = new createjs.Bitmap(qipaStage.queue.getResult("m0")),
	this.m[a].regX = this.m[a].getBounds().width / 2,
	this.m[a].regY = this.m[a].getBounds().height / 2,
	this.m[a].y = qp_g,
	this.m[a].visible = !1,
	this.addChild(this.m[a]);
	for (a = 0; a <= qp_e; a++) this.m[a].image = qipaStage.queue.getResult("m0");
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
	0 < qp_f ? qp_f--:qp_f = qp_e
};
function genRandom(a) {
	return parseInt(Math.random() * a)
}
function qp_E(a) {
	return 10
}
var qp_F = 0;
function qp_D() {
	if(gameVue.$route.path.indexOf('/game') != 0){
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
	this.tmbg.x = (W - this.tmbg.getBounds().width) / 2;
	this.tmbg.y = 150;
	this.addChild(this.tmbg);
	this.sum = new createjs.Text(S_T + qipaApp.score, "bold 60px Arial", "white");
	this.sum.textAlign = "center";
	this.sum.textBaseline = "middle";
	this.sum.x = W / 2;
	this.sum.y = this.tmbg.y + this.tmbg.getBounds().height / 2;
	this.addChild(this.sum);
	this.tmbg1 = new createjs.Bitmap(qipaStage.queue.getResult("timebg"));
	// this.tmbg1.scaleX = 0.7;
	// this.tmbg1.x = (W - 0.7 * this.tmbg1.getBounds().width) -10;
	this.tmbg1.x = (W - this.tmbg1.getBounds().width) -10;
	this.tmbg1.y = 0;
	this.addChild(this.tmbg1);
	// this.tmicon = new createjs.Bitmap(qipaStage.queue.getResult("tmicon"));
	// this.tmicon.x = this.tmbg1.x + 14;
	// this.tmicon.y = this.tmbg1.y + 14;
	// this.addChild(this.tmicon);
	this.txt = new createjs.Text(qp_n + '"', "bold 48px Arial", "white");
	this.txt.textAlign = "center";
	this.txt.textBaseline = "middle";
	this.txt.x = this.tmbg1.x + this.tmbg1.getBounds().width / 2;
	this.txt.y = this.tmbg1.y + this.tmbg1.getBounds().height / 2;
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
	var title = "\u6570\u94b1\u6570\u5230\u624b\u62bd\u7b4b\uff01\u4f60\u662f\u6570\u94b1\u9ad8\u624b\u5417\uff1f";
	if (0 == qipaApp.score) pass_text = title;
	else {
		var a = parseInt(Math.sqrt(1E4 * qipaApp.score / 17E3));
		99 < a && (a = "99.9");
		if(qipaApp.score >= 13000){
			pass_text = "\u6211\u6570\u4e86" + S_T + qipaApp.score + "\uff0c\u6bd4" + a + "%\u7684\u4eba\u6709\u94b1\uff01\u6211\u662f" + "\u5bcc\u8c6a\uff0c\u9886\u53d6\u79ef\u5206" + "...";
		}else{
			pass_text = "\u6211\u6570\u4e86" + S_T + qipaApp.score + "\uff0c\u79bb\u5bcc\u8c6a\u5c31\u5dee\u4e00\u6b65\uff0c\u6211\u8981\u7ee7\u7eed\u6311\u6218" + "...";
		}
		
		gameVue.saveUserScore(qipaApp.score);
	}
	// dp_submitScore(qipaApp.score);
}
var _cfg = {
	startFunc: qp_v,
	img: {
		path: basePath + "src/img/",
		manifest: [{
			src: "m0.png",
			id: "m0"
		},
		{
			src: "timeexttip.png",
			id: "timeexttip"
		},
		{
			src: "mb0.png",
			id: "mb0"
		},
		{
			src: "d0.png",
			id: "d0"
		},
		{
			src: "starttip.png",
			id: "starttip"
		},
		{
			src: "sumbg.png",
			id: "sumbg"
		},
		{
			src: "timebg.png",
			id: "timebg"
		},
		{
			src: "start.png",
			id: "start"
		},
		{
			src: "rank.png",
			id: "rank"
		},
		{
			src: "share.png",
			id: "share"
		},
		{
			src: "dlgbg.png",
			id: "dlgbg"
		},
		{
			src: "bg.jpg",
			id: "bg"
		}]
	},
	audio: {
		path: basePath + "src/audio/",
		manifest: [{
			src: "count.mp3",
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
        		showText:false,

        	}
        },
        methods:{
        	//分享
        	showShare(){
        		share(sapi.shareUrl());
            },
            //保存分数
        	saveUserScore(score){
        		var that =  this;
                if(score >= 13000){
                	if(checkLogin()){
                		sapi.Operscore(this, 'pass', function(back){
	                		if(back.msgCode == 'MKM00000'){
	                			that.$root.score = back.data.scoreVal;
	                			that.$root.scoreModal = true;
	                		}

	                		else{
	                			that.$dispatch('handle_server_error', back);
	                		}
	                	})
                	}
                	else{
                		gologin();
                	}
                }
        
            },
           
            //查看积分
            checkIntegral(){
            	gointegral();
            }
            
        }
    }
</script>
