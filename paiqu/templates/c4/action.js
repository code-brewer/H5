(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.c4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// head
	this.instance = new lib._01();
	this.instance.setTransform(99.8,120.8,1,1,-2.6,0,0,47.6,86.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({rotation:19,y:120.9},0).wait(1));

	// bg
	this.instance_1 = new lib.bg01();

	this.instance_2 = new lib.bg01();

	this.instance_3 = new lib.bg02();

	this.instance_4 = new lib.bg02();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1}]}).to({state:[{t:this.instance_4},{t:this.instance_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


// symbols:

(lib.bg01 = function() {
	this.initialize(img.bg01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.bg02 = function() {
	this.initialize(img.bg02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.head = function() {
	this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.head();
	this.instance.setTransform(-20,-20,0.55,0.55);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,97.2,116.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;