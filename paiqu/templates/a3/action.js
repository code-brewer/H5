(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.a3 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // text
    this.instance = new lib.Bitmap2();
    this.instance.setTransform(164.6,48.8);

    this.instance_1 = new lib.Bitmap3();
    this.instance_1.setTransform(164.6,48.8);

    this.instance_2 = new lib.Bitmap4();
    this.instance_2.setTransform(164.6,48.8);

    this.instance_3 = new lib.Bitmap5();
    this.instance_3.setTransform(164.6,48.8);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(2));

    // bg_text
    this.instance_4 = new lib.Bitmap1();
    this.instance_4.setTransform(145.1,34.3);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).wait(6));

    // head
    this.instance_5 = new lib._01();
    this.instance_5.setTransform(102.1,113.5,1,1,0,0,0,40.6,48.6);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).wait(6));

    // bg
    this.instance_6 = new lib.bg1();
    this.instance_6.setTransform(0,0,0.5,0.5);

    this.instance_7 = new lib.bg2();
    this.instance_7.setTransform(0,0,0.5,0.5);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


// symbols:
(lib.bg1 = function() {
    this.initialize(img.bg1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.bg2 = function() {
    this.initialize(img.bg2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.Bitmap1 = function() {
    this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,51,144);


(lib.Bitmap2 = function() {
    this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,20,22);


(lib.Bitmap3 = function() {
    this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,53);


(lib.Bitmap4 = function() {
    this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,83);


(lib.Bitmap5 = function() {
    this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,114);


(lib.head = function() {
    this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
    this.initialize();

    // 图层 1
    this.instance = new lib.head();
    this.instance.setTransform(-16,-17,0.46,0.46);

    this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,81.2,97.4);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;