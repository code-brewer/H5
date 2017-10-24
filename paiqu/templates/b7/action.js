(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.b7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// head
	this.instance = new lib._01();
	this.instance.setTransform(101.7,99.6,1,1,0,0,0,48.7,55.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:44.7,regY:92.9,rotation:-7,x:97.7,y:136.6},0).wait(1));

	// z (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AvmPnIAA/OIfOAAIAAfOg");
	mask.setTransform(100,100);

	// bg
	this.instance_1 = new lib.bg1();
	this.instance_1.setTransform(-21.9,-33.9);

	this.instance_2 = new lib.bg2();
	this.instance_2.setTransform(-22.4,-33.9);

	this.instance_1.mask = this.instance_2.mask = mask;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).wait(1));

	// bg
    this.instance_3 = new cjs.Shape();
    this.instance_3.graphics.f("#FFFFFF").s().p("AvnPnIAA/OIfOAAIAAfOg");
    this.instance_3.setTransform(100,100);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.9,-33.9,240,240);


// symbols:
(lib._02 = function() {
	this.initialize(img._02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,81,40);


(lib.bg1 = function() {
	this.initialize(img.bg1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,240);


(lib.bg2 = function() {
	this.initialize(img.bg2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,240);


(lib.head = function() {
	this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib._02();
	this.instance.setTransform(9.7,36.4);

	this.instance_1 = new lib.head();
	this.instance_1.setTransform(-2,-25,0.51,0.51,7.7);

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,97.4,111.8);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;