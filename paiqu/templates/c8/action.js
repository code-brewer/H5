(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.c8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// text
	this.text = new cjs.Text("恭", "26px Arial", "#FFFF00");
	this.text.lineHeight = 28;
	this.text.setTransform(19.4,156.5,1,1,-0.2);
	this.text.shadow = new cjs.Shadow("rgba(255,255,255,1)",0,0,4);

	this.text_1 = new cjs.Text("恭", "26px Arial", "#FFFF00");
	this.text_1.lineHeight = 28;
	this.text_1.setTransform(13.9,156.5,1,1,-0.2);
	this.text_1.shadow = new cjs.Shadow("rgba(255,255,255,1)",0,0,4);

	this.text_2 = new cjs.Text("恭", "26px Arial", "#FFFF00");
	this.text_2.lineHeight = 28;
	this.text_2.setTransform(13.9,156.5,1,1,-0.2);
	this.text_2.shadow = new cjs.Shadow("rgba(255,255,255,1)",0,0,4);

	this.text_3 = new cjs.Text("恭", "26px Arial", "#FFFF00");
	this.text_3.lineHeight = 28;
	this.text_3.setTransform(13.9,156.5,1,1,-0.2);
	this.text_3.shadow = new cjs.Shadow("rgba(255,255,255,1)",0,0,4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text,p:{x:19.4,text:"恭"}}]}).to({state:[{t:this.text_1,p:{x:13.9,text:"恭"}},{t:this.text,p:{x:49.3,text:"喜"}}]},1).to({state:[{t:this.text_2,p:{x:13.9,text:"恭"}},{t:this.text_1,p:{x:49.3,text:"喜"}},{t:this.text,p:{x:109.7,text:"发"}}]},1).to({state:[{t:this.text_3},{t:this.text_2,p:{x:49.3,text:"喜"}},{t:this.text_1,p:{x:109.7,text:"发"}},{t:this.text,p:{x:145.1,text:"财"}}]},1).wait(1));

	// 图层 2
	this.instance = new lib._9();
	this.instance.setTransform(9.2,122,0.402,0.402);

	this.instance_1 = new lib.pngg2();
	this.instance_1.setTransform(140.9,124,0.343,0.343);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).wait(1));

	// hand 1
	this.instance_2 = new lib._7();
	this.instance_2.setTransform(55.9,135.7,0.535,0.535);

	this.instance_3 = new lib._6();
	this.instance_3.setTransform(55.9,149.7,0.535,0.351);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));

	// mouth
	this.instance_4 = new lib._8();
	this.instance_4.setTransform(65.3,122,0.455,0.455);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).wait(1));

	// head
	this.instance_5 = new lib._01();
	this.instance_5.setTransform(98.3,133.2,0.941,0.961,0,0,0,51.6,107);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(4));

	// bg
	this.instance_6 = new lib._5();
	this.instance_6.setTransform(0.2,0.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.2,0.3,200,200);


// symbols:
(lib._10 = function() {
	this.initialize(img._10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,130,118);


(lib.pngg = function() {
	this.initialize(img.pngg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,130,118);


(lib.pngg2 = function() {
	this.initialize(img.pngg2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,130,118);


(lib._5 = function() {
	this.initialize(img._5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib._6 = function() {
	this.initialize(img._6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,168,76);


(lib._7 = function() {
	this.initialize(img._7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,168,88);


(lib._8 = function() {
	this.initialize(img._8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,149,44);


(lib._9 = function() {
	this.initialize(img._9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,127,127);


(lib._9pngcopy = function() {
	this.initialize(img._9pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,127,127);


(lib.bg = function() {
	this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.head = function() {
	this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.head();
	this.instance.setTransform(-25,-15,0.64,0.64);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,104,124.7);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;