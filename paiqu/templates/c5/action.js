(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.c5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// head
	this.instance = new lib._01();
	this.instance.setTransform(33.6,0,0.232,0.232);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{rotation:0,x:33.6,y:0}}]}).to({state:[{t:this.instance,p:{rotation:15.9,x:71.1,y:-11.4}}]},2).wait(1));

	// bg
	this.instance_1 = new lib._1();
	this.instance_1.setTransform(-19.9,-28.9);

	this.instance_2 = new lib._2();
	this.instance_2.setTransform(-19.9,-28.9);

	this.instance_3 = new lib._3();
	this.instance_3.setTransform(-19.9,-28.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));

	// bgg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AvrPnIAA/OIfXAAIAAfOg");
	this.shape.setTransform(100,100);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.9,-28.9,240,240);


// symbols:
(lib._1 = function() {
	this.initialize(img._1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,240);


(lib._2 = function() {
	this.initialize(img._2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,240);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,240);


(lib.head = function() {
	this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);

(lib._01 = function() {
	this.initialize();

	this.instance = new lib.head();
	this.instance.setTransform(-90,-90,3,3);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,97.2,116.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;