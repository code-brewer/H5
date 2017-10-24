(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.b4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// angry
	this.instance = new lib.Bitmap1();
	this.instance.setTransform(126.4,16.8);

	this.instance_1 = new lib.Bitmap2();
	this.instance_1.setTransform(128.8,11.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	// head
	this.instance_2 = new lib._01();
	this.instance_2.setTransform(96.6,73.5,1.36,1.36,0,0,0,44.6,53.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regY:105,rotation:10.7,x:93.7,y:142},0).wait(1));

	// text
	this.instance_3 = new lib.Bitmap3();
	this.instance_3.setTransform(17.3,57.8);

	this.instance_4 = new lib.Bitmap4();
	this.instance_4.setTransform(7.2,35.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).to({state:[{t:this.instance_4}]},1).wait(1));

	// body
	this.instance_5 = new lib.ha1();
	this.instance_5.setTransform(32.9,67.6,0.663,0.663);

	this.instance_6 = new lib.ha2();
	this.instance_6.setTransform(32.9,67.6,0.663,0.663);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.instance_6}]},1).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AxyPHIAA+NMAjlAAAIAAeNg");
	this.shape.setTransform(100,100,0.877,1.034);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,200,200.3);


// symbols:
(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,25,22);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,37,32);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,172,74);


(lib.Bitmap4 = function() {
	this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,189,111);


(lib.ha1 = function() {
	this.initialize(img.ha1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.ha2 = function() {
	this.initialize(img.ha2);
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
	this.instance.setTransform(-15,-15,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,89.3,107.1);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
