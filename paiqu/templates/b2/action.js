(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.b2 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // text
    this.instance = new lib.Bitmap4();
    this.instance.setTransform(20.9,14.6);

    this.instance_1 = new lib.Bitmap5();
    this.instance_1.setTransform(20.9,14.6);

    this.instance_2 = new lib.Bitmap6();
    this.instance_2.setTransform(20.9,14.6);

    this.instance_3 = new lib.Bitmap7();
    this.instance_3.setTransform(20.9,14.6);

    this.instance_4 = new lib.Bitmap8();
    this.instance_4.setTransform(20.9,14.6);

    this.instance_5 = new lib.Bitmap9();
    this.instance_5.setTransform(20.9,14.6);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).wait(3));

    // head
    this.instance_6 = new lib._01();
    this.instance_6.setTransform(99.3,135,1.152,1.152,0,0,0,44.1,52.8);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).wait(9));

    // star
    this.instance_7 = new lib.Bitmap2();
    this.instance_7.setTransform(4.9,84.2);

    this.instance_8 = new lib.Bitmap3();
    this.instance_8.setTransform(-2.3,80.2);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7}]}).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_7}]},1).wait(1));

    // bg
    this.instance_9 = new lib.Bitmap1();

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9}]}).wait(9));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


// symbols:
(lib.bg = function() {
    this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,284,284);


(lib.Bitmap1 = function() {
    this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.Bitmap2 = function() {
    this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,188,102);


(lib.Bitmap3 = function() {
    this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,203,110);


(lib.Bitmap4 = function() {
    this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,30,34);


(lib.Bitmap5 = function() {
    this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,56,34);


(lib.Bitmap6 = function() {
    this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,82,34);


(lib.Bitmap7 = function() {
    this.initialize(img.Bitmap7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,108,34);


(lib.Bitmap8 = function() {
    this.initialize(img.Bitmap8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,134,34);


(lib.Bitmap9 = function() {
    this.initialize(img.Bitmap9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,160,34);


(lib.head = function() {
    this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
    this.initialize();

    // 图层 1
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#FFCCCC").s().p("AhIArQgfgSABgZQgBgYAfgSQAegSAqAAQArAAAeASQAeASABAYQgBAZgeASQgeASgrAAQgqAAgegSg");
    this.shape.setTransform(71.7,58.4);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#FFCCCC").s().p("AhIArQgfgSABgZQgBgYAfgSQAegSAqAAQArAAAeASQAeASABAYQgBAZgeASQgeASgrAAQgqAAgegSg");
    this.shape_1.setTransform(17.3,59.7);

    this.instance = new lib.head();
    this.instance.setTransform(-20,-22,0.53,0.53);

    this.addChild(this.instance,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,88.1,105.6);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;