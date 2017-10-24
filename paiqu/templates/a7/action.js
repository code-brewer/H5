(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.a7 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // text
    this.instance = new lib.Bitmap1();
    this.instance.setTransform(149.5,130.5);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).wait(3));

    // bg_text
    this.shape = new cjs.Shape();
    this.shape.graphics.f().s("#231916").ss(1.5).p("AGJF9QiPCfjLAAQizAAiJiCQiIiAgejBQgDgSgvgmIgughQAYgWAZgcQAyg5AGgbQApiwCDhyQCFhzCoAAQDLAACPCfQCQCdAADfQAADfiQCeg");
    this.shape.setTransform(170.9,153.5,0.38,0.408);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#F7FDF6").s().p("AkQGaQiIiAgdjBQgDgSgvglIgvgiQAZgWAZgcQAxg4AGgcQAqiwCDhxQCFh0CoAAQDKAACQCfQCPCeAADeQAADfiPCfQiQCdjKAAQizABiKiCg");
    this.shape_1.setTransform(171,153.5,0.38,0.408);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[]},1).wait(3));

    // head
    this.instance_1 = new lib._01();
    this.instance_1.setTransform(110.8,107.4,1,1,0,0,0,44.6,53.5);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).wait(4));

    // bg
    this.instance_2 = new lib.bg1();
    this.instance_2.setTransform(0,0,0.5,0.5);

    this.instance_3 = new lib.bg();
    this.instance_3.setTransform(0,0,0.5,0.5);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));

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
p.nominalBounds = new cjs.Rectangle(0,0,43,46);


(lib.head = function() {
    this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
    this.initialize();

    // 图层 1
    this.instance = new lib.head();
    this.instance.setTransform(-19,-17,0.51,0.505);

    this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,89.2,106.9);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;