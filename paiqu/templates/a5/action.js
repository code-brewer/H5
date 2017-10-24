(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.a5 = function(mode,startPosition,loop) {
    this.initialize(mode,startPosition,loop,{});

    // text
    this.instance = new lib.Bitmap4();
    this.instance.setTransform(127.8,5.4);

    this.instance_1 = new lib.Bitmap5();
    this.instance_1.setTransform(127.8,5.4);

    this.instance_2 = new lib.Bitmap6();
    this.instance_2.setTransform(127.8,5.4);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(3));

    // zzz
    this.instance_3 = new lib.Bitmap1();
    this.instance_3.setTransform(91.9,74.9);

    this.instance_4 = new lib.Bitmap2();
    this.instance_4.setTransform(75.5,55.9);

    this.instance_5 = new lib.Bitmap3();
    this.instance_5.setTransform(56.1,37.6);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5,p:{x:56.1,y:37.6}}]},1).to({state:[{t:this.instance_5,p:{x:40.1,y:22.6}}]},1).to({state:[{t:this.instance_5,p:{x:15.1,y:7.6}}]},1).wait(1));

    // head
    this.instance_6 = new lib._01();
    this.instance_6.setTransform(138.5,136.4,1,1,0,0,0,43.7,36.8);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).wait(6));

    // z (mask)
    var mask = new cjs.Shape();
    mask._off = true;
    mask.graphics.p("AvmPoIAA/OIfOAAIAAfOg");
    mask.setTransform(100,100);

    // bg_text
    this.shape = new cjs.Shape();
    this.shape.graphics.f().s("#231916").ss(1.6).p("ADXqUQBaECAAFrQAAFQgxDeQg5EFhyAWQgkAHgdAtQgOAXgGAVQgEgVgOgXQgcgugrgJQhwgZg4kEQgvjZAAlQQAAlsBakBQBZkBB9AAQB9AABaEBg");
    this.shape.setTransform(139.4,9.8,0.776,1);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#F7FDF6").s().p("AgSNgQgdgugpgJQhxgZg4kEQgvjZAAlQQABlsBZkBQBZkBB9AAQB+AABZEBQBaECAAFrQgBFQgwDeQg5EFhyAWQgkAHgdAtQgOAXgGAVQgEgVgOgXg");
    this.shape_1.setTransform(139.4,8.8,0.776,1);

    this.shape.mask = this.shape_1.mask = mask;

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(6));

    // body
    this.instance_7 = new lib.bg();
    this.instance_7.setTransform(0,0,0.357,0.357);

    this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7}]}).wait(6));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-82,200,282.1);


// symbols:
(lib.bg = function() {
    this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,560,560);


(lib.Bitmap1 = function() {
    this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,13,13);


(lib.Bitmap2 = function() {
    this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,29,32);


(lib.Bitmap3 = function() {
    this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,48,50);


(lib.Bitmap4 = function() {
    this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,20);


(lib.Bitmap5 = function() {
    this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,22,46);


(lib.Bitmap6 = function() {
    this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,23,77);


(lib.head = function() {
    this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib._01 = function() {
    this.initialize();

    // 图层 1
    this.instance = new lib.head();
    this.instance.setTransform(105,-18,0.45,0.45,88.7);

    this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,87.5,73.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;