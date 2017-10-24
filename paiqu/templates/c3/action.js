(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.c3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// head
	this.instance = new lib.headd("synched",0);
	this.instance.setTransform(103.4,123.3,1,1,0,0,0,46.5,87.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:7.5},2).wait(1));

	// bg
	this.instance_1 = new lib.bg1();

	this.instance_2 = new lib.bg2();

	this.instance_3 = new lib.bg2();

	this.instance_4 = new lib.bg3();

	this.instance_5 = new lib.bg3();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_3},{t:this.instance_2}]},1).to({state:[{t:this.instance_5},{t:this.instance_4}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


// symbols:
(lib.bg1 = function() {
	this.initialize(img.bg1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.bg2 = function() {
	this.initialize(img.bg2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.bg3 = function() {
	this.initialize(img.bg3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.head = function() {
	this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib.headd = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.head();
	this.instance.setTransform(-22,-10,0.47,0.47,-5.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,85,98.7);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;