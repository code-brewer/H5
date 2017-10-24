(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.a8 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // head
    this.instance = new lib._01();
    this.instance.setTransform(69.5,73.6,1,1,0,0,0,45.5,54.6);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(3));

    // text
    this.instance_1 = new lib.Bitmap1();
    this.instance_1.setTransform(120.5,82.2,0.464,0.464);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{scaleX:0.464,scaleY:0.464,x:120.5,y:82.2}}]}).to({state:[{t:this.instance_1,p:{scaleX:1,scaleY:1,x:119.9,y:62.9}}]},1).wait(2));

    // hair
    this.instance_2 = new lib.Bitmap2();
    this.instance_2.setTransform(42.1,9.9);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).wait(3));

    // body
    this.instance_3 = new lib.bg();
    this.instance_3.setTransform(0,0,0.5,0.5);

    this.instance_4 = new lib.bg1();
    this.instance_4.setTransform(0,0,0.5,0.5);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).to({state:[{t:this.instance_4}]},1).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


// symbols:
(lib.bg = function() {
    this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.bg1 = function() {
    this.initialize(img.bg1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.Bitmap1 = function() {
    this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,74,74);


(lib.Bitmap2 = function() {
    this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,45,150);


(lib.head = function() {
    this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
    this.initialize();

    // 图层 1
    this.instance = new lib.head();
    this.instance.setTransform(-18,-18,0.51,0.51);

    this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,91,109.1);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;