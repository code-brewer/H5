(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.b1 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // head
    this.instance = new lib.head();
    this.instance.setTransform(62.1,106.5,1,1,0,0,0,50.6,58.6);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).wait(2));

    // bg
    this.instance_1 = new lib._2();
    this.instance_1.setTransform(0,0,0.455,0.455);

    this.instance_2 = new lib._1();
    this.instance_2.setTransform(0,0,0.455,0.455);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


// symbols:
(lib._1 = function() {
    this.initialize(img._1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,440);


(lib._2 = function() {
    this.initialize(img._2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,440);


(lib.head1 = function() {
    this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib.head = function() {
    this.initialize();

    // 图层 1
    this.instance = new lib.head1();
    this.instance.setTransform(-21,-14,0.54,0.54,-5.9);

    this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,101.2,117.2);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;