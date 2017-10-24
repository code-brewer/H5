(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.a2 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // text
    this.instance = new lib.Bitmap2();
    this.instance.setTransform(160.3,41.4);

    this.instance_1 = new lib.Bitmap3();
    this.instance_1.setTransform(160.3,41.4);

    this.instance_2 = new lib.Bitmap4();
    this.instance_2.setTransform(160.3,41.4);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(3));

    // head
    this.instance_3 = new lib._01();
    this.instance_3.setTransform(107.7,96.1,1,1,0,0,0,32.9,39.5);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).wait(6));

    // bg_text
    this.instance_4 = new lib.Bitmap1();
    this.instance_4.setTransform(144.6,25.8);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).wait(6));

    // bg
    this.instance_5 = new lib.bg();
    this.instance_5.setTransform(0,0,0.5,0.5);

    this.instance_6 = new lib.bg1();
    this.instance_6.setTransform(0,0,0.5,0.5);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.instance_6}]},4).wait(2));

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
p.nominalBounds = new cjs.Rectangle(0,0,45,122);


(lib.Bitmap2 = function() {
    this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,21,23);


(lib.Bitmap3 = function() {
    this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,55);


(lib.Bitmap4 = function() {
    this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,88);


(lib.head = function() {
    this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
    this.initialize();

    // 图层 1
    this.instance = new lib.head();
    this.instance.setTransform(-16,-17,0.41,0.41);

    this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,65.8,78.9);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;