(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.b6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// flower
	this.instance = new lib.Bitmap1();
	this.instance.setTransform(92.5,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{rotation:0,x:92.5,y:1}}]}).to({state:[{t:this.instance,p:{rotation:21,x:103.8,y:4.9}}]},2).wait(1));

	// head
	this.instance_1 = new lib._01();
	this.instance_1.setTransform(100.8,70.5,1.259,1.259,0,0,0,44.7,53.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({regY:53.5,y:75.2},0).wait(1));

	// text
	this.instance_2 = new lib.Bitmap2();
	this.instance_2.setTransform(165.1,18.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2,p:{y:18.3}}]}).to({state:[{t:this.instance_2,p:{y:38.3}}]},2).wait(1));

	// bg
	this.instance_3 = new lib.bg1();
	this.instance_3.setTransform(16.5,30.5,0.84,0.84);

	this.instance_4 = new lib.bg2();
	this.instance_4.setTransform(16.5,30.5,0.84,0.84);

	this.instance_5 = new lib.bg3();
	this.instance_5.setTransform(16.5,30.5,0.84,0.84);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AwlQGMAAAggKMAhLAAAMAAAAgKg");
	this.shape.setTransform(100,100,0.941,0.971);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).wait(3));

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


(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,20,29);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,48);


(lib.head = function() {
	this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.head();
	this.instance.setTransform(-19,-22,0.53,0.53);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,89.4,107.1);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;