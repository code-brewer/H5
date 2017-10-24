(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.a4 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // text
    this.instance = new lib.Bitmap2();
    this.instance.setTransform(20.1,34.4);

    this.instance_1 = new lib.Bitmap3();
    this.instance_1.setTransform(20.1,34.4);

    this.instance_2 = new lib.Bitmap4();
    this.instance_2.setTransform(18.3,34.4);

    this.instance_3 = new lib.Bitmap5();
    this.instance_3.setTransform(18.3,34.4);

    this.instance_4 = new lib.Bitmap6();
    this.instance_4.setTransform(18.3,34.4);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).wait(3));

    // head
    this.instance_5 = new lib._01();
    this.instance_5.setTransform(92.5,121.8,1,1,0,0,0,34.9,41.8);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).wait(8));

    // bg
    this.instance_6 = new lib.Bitmap1();

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).wait(8));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


// symbols:
(lib.bg = function() {
    this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.Bitmap1 = function() {
    this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.Bitmap2 = function() {
    this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,19,22);


(lib.Bitmap3 = function() {
    this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,19,52);


(lib.Bitmap4 = function() {
    this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,81);


(lib.Bitmap5 = function() {
    this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,113);


(lib.Bitmap6 = function() {
    this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,140);


(lib.head = function() {
    this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
    this.initialize();

    // 图层 1
    this.instance = new lib.head();
    this.instance.setTransform(-20,-25,0.46,0.46);

    this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,69.8,83.7);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;