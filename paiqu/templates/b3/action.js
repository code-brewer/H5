(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.b3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// head
	this.instance = new lib._01();
	this.instance.setTransform(77.6,76.1,1.211,1.211,0,0,0,62.8,70.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:73.7,regY:123.2,rotation:16,x:90.9,y:140.1},0).wait(1));

	// body
	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(0,-0.9,0.833,0.833);

	this.instance_2 = new lib.bg2();
	this.instance_2.setTransform(0,-0.9,0.833,0.833);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).wait(1));

	// bg
    this.instance_3 = new cjs.Shape();
    this.instance_3.graphics.f("#FFFFFF").s().p("AvnPnIAA/OIfOAAIAAfOg");
    this.instance_3.setTransform(100,100);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(2));

	

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9.2,200,208.3);



(lib.bg1 = function() {
	this.initialize(img.bg1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,240);


(lib.bg2 = function() {
	this.initialize(img.bg2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,240);


(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,240,240);


(lib.head = function() {
	this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FEEDD2").s().p("AgEAOQgGgCgCgGQgDgGACgEQACgFAGgDQAFgDAFACQAGACACAGQADAFgCAEQgCAHgGACIgGACIgEgBg");
	this.shape.setTransform(30.9,60.8,2.856,2.856,-12.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AgaAbQgLgMAAgPQAAgOALgLQALgMAPAAQAPAAAMALQALALAAAPQAAAQgLALQgLALgQAAQgOAAgMgLg");
	this.shape_1.setTransform(81.6,56.2,2.856,2.856,-12.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AhRgdICOghIAVBaIiOAig");
	this.shape_2.setTransform(93.5,43.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AhGgfIB4gcIAVBaIh4Adg");
	this.shape_3.setTransform(22.8,59.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AhOgQICMghIARBBIiNAig");
	this.shape_4.setTransform(62.4,61);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AhbCTQg9gmgQhGQgRhFAng9QAng9BFgQQBEgQA9AlQA9AnASBFQAQBGgmA9QgnA9hHAQQgVAFgSAAQgvAAgrgbg");
	this.shape_5.setTransform(81.5,56.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCCCCC").s().p("Ag4BdQgogYgKgtQgKgqAYgmQAZgoArgKQArgKAnAYQAnAZAKAsQAKArgYAmQgZAmgsAKQgOADgKAAQgeAAgagQg");
	this.shape_6.setTransform(41,65.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("AhbCTQg9gmgQhGQgQhFAlg9QAng+BGgPQBFgQA9AlQA9AnAQBFQAQBFglA9QgnA+hGAQQgVAFgSAAQgwAAgrgbg");
	this.shape_7.setTransform(41,65.1);

	this.instance = new lib.head();
	this.instance.setTransform(-25,0,0.58,0.58,-12.9);

	this.addChild(this.instance,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,125.6,140.7);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;