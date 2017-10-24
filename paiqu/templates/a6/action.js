(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.a6 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // text
    this.instance = new lib.Bitmap2();
    this.instance.setTransform(149.5,55.9);

    this.instance_1 = new lib.Bitmap3();
    this.instance_1.setTransform(149.5,55.9);

    this.instance_2 = new lib.Bitmap4();
    this.instance_2.setTransform(149.5,55.9);

    this.instance_3 = new lib.Bitmap5();
    this.instance_3.setTransform(149,55.9);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(3));

    // bg_text
    this.instance_4 = new lib.Bitmap1();
    this.instance_4.setTransform(125,41.7);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).wait(7));

    // head
    this.instance_5 = new lib._01();
    this.instance_5.setTransform(62.8,74.6,1,1,0,0,0,60.9,67.7);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).wait(7));

    // z (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    mask.graphics.p("AvmPoIAA/PIfNAAIAAfPg");
    mask.setTransform(100,100);

    // body
    this.instance_6 = new lib.bg();
    this.instance_6.setTransform(14,0,0.5,0.5);

    this.instance_6.mask = mask;

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).wait(7));

    // bg
    this.shape = new cjs.Shape();
    this.shape.graphics.f("#F6FEEE").s().p("A0NSRMAAAgkiMAocAAAMAAAAkig");
    this.shape.setTransform(100,100,0.772,0.855);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).wait(7));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,214,200);


// symbols:
(lib.bg = function() {
    this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.Bitmap1 = function() {
    this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,57,148);


(lib.Bitmap2 = function() {
    this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,20,23);


(lib.Bitmap3 = function() {
    this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,20,51);


(lib.Bitmap4 = function() {
    this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,20,84);


(lib.Bitmap5 = function() {
    this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,21,114);


(lib.head = function() {
    this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
    this.initialize();

    // 图层 1
    this.instance = new lib.head();
    this.instance.setTransform(-24,11,0.55,0.55,-14.7);

    this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,121.8,135.3);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;