(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.c1 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // head
    this.instance = new lib._01();
    this.instance.setTransform(92.3,103.5,1,1,0,0,0,61.4,69.4);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:68.4,regY:110.3,rotation:20.9,x:99.4,y:144.4},0).wait(1));

    // bg
    this.instance_1 = new lib._1buy();
    this.instance_1.setTransform(0,0,0.667,0.667);

    this.instance_2 = new lib._2buy();
    this.instance_2.setTransform(0,0,0.667,0.667);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).wait(1));

    // bg
    this.instance_3 = new cjs.Shape();
    this.instance_3.graphics.f("#FFFFFF").s().p("AvnPnIAA/OIfOAAIAAfOg");
    this.instance_3.setTransform(100,100);
    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


// symbols:
(lib._1buy = function() {
    this.initialize(img._1buy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib._2buy = function() {
    this.initialize(img._2buy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.head = function() {
    this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
    this.initialize();

    // 图层 1
    this.instance = new lib.head();
    this.instance.setTransform(-24,-2,0.59,0.59,-10.9);

    this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,122.8,138.7);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;