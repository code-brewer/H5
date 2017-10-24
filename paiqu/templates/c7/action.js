(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.c7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// text
	this.text = new cjs.Text("红包呢", "26px Arial", "#FFFF00");
	this.text.lineHeight = 28;
	this.text.setTransform(106.7,163.6,1,1,-24.6);
	this.text.shadow = new cjs.Shadow("rgba(255,255,255,1)",0,0,4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text,p:{rotation:-24.6,x:106.7,y:163.6}}]}).to({state:[{t:this.text,p:{rotation:27,x:18.9,y:123.6}}]},1).wait(1));

	// head
	this.instance = new lib._3();
	this.instance.setTransform(0,0,0.373,0.423);

	this.instance_1 = new lib._01();
	this.instance_1.setTransform(87.1,134.5,1.185,1.185,0,0,0,51.6,106.9);

	this.instance_2 = new lib._1();
	this.instance_2.setTransform(-6.9,66.6,0.42,0.42);

	this.instance_3 = new lib._4();
	this.instance_3.setTransform(78.3,0,0.373,0.423);

	this.instance_4 = new lib._2();
	this.instance_4.setTransform(48.3,66.6,0.42,0.42);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1,p:{x:87.1,y:134.5}},{t:this.instance}]}).to({state:[{t:this.instance_4},{t:this.instance_1,p:{x:114.4,y:132}},{t:this.instance_3}]},1).wait(1));

	// bg
	this.instance_5 = new lib.bg();
	this.instance_5.setTransform(0,0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.instance_5}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.9,0,207,234.8);


// symbols:
(lib._1 = function() {
	this.initialize(img._1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,361,400);


(lib._2 = function() {
	this.initialize(img._2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,361,400);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,313,388);


(lib._4 = function() {
	this.initialize(img._4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,313,388);


(lib.bg = function() {
	this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.head = function() {
	this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib.Bitmap6 = function() {
	this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.Bitmap7 = function() {
	this.initialize(img.Bitmap7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,700,700);


(lib.newyear1 = function() {
	this.initialize(img.newyear1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.newyear2 = function() {
	this.initialize(img.newyear2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.newyear3 = function() {
	this.initialize(img.newyear3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.newyear4 = function() {
	this.initialize(img.newyear4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib._01 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.head();
	this.instance.setTransform(-25,-20,0.62,0.62);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,104,124.7);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;