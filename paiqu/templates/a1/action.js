(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.a1 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // head
    this.instance = new lib._01();
    this.instance.setTransform(73.8,73.1,1,1,0,0,0,43.7,46.6);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:1.29,scaleY:1.29,x:66.9,y:63.1},0).wait(1));

    // z (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    mask.graphics.p("AvmPoIAA/OIfOAAIAAfOg");
    mask.setTransform(100,100);

    // bg
    this.instance_1 = new lib.bg();
    this.instance_1.setTransform(0,0,0.5,0.5);

    this.instance_1.mask = mask;

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{scaleX:0.5,scaleY:0.5,x:0,y:0}}]}).to({state:[{t:this.instance_1,p:{scaleX:0.59,scaleY:0.59,x:-17.9,y:-17.9}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


// symbols:
(lib.bg = function() {
    this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.head = function() {
    this.initialize(imgData);
    this.setTransform(0,0,200,200);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
    this.initialize();

    // 图层 1
    this.instance = new lib.head();
    this.instance.setTransform(-21,15,0.375,0.375,-25.6);

    this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,87.5,93.2);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;