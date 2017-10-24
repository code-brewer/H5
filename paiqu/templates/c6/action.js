(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.c6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// text
	this.text = new cjs.Text("哇~\n猴\n赛\n雷", "26px Arial", "#CC0000");
	this.text.lineHeight = 28;
	this.text.setTransform(156,44.4);
	this.text.shadow = new cjs.Shadow("rgba(255,255,255,1)",0,0,10);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text,p:{scaleX:1,scaleY:1,x:156,y:44.4}}]}).to({state:[{t:this.text,p:{scaleX:1.555,scaleY:1.555,x:153.6,y:8.9}}]},1).to({state:[{t:this.text,p:{scaleX:1,scaleY:1,x:157,y:44.4}}]},1).to({state:[{t:this.text,p:{scaleX:1.555,scaleY:1.555,x:153.6,y:8.9}}]},1).wait(1));

	// head
	this.instance = new lib._01();
	this.instance.setTransform(87.1,140.9,1.185,1.185,0,0,0,51.6,106.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:51.5,regY:107,rotation:-26,x:85.5},0).wait(1).to({regX:51.6,regY:106.9,rotation:0,x:85.9},0).wait(1).to({regX:51.5,regY:107,rotation:20.9,y:141},0).wait(1));

	// body
	this.instance_1 = new lib.newyear1();
	this.instance_1.setTransform(46,100.2,0.519,0.519);

	this.instance_2 = new lib.newyear2();
	this.instance_2.setTransform(46,100.2,0.519,0.519);

	this.instance_3 = new lib.newyear3();
	this.instance_3.setTransform(40.2,100.2,0.519,0.519);

	this.instance_4 = new lib.newyear4();
	this.instance_4.setTransform(39.2,100.2,0.519,0.519);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).wait(1));

	// line
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#000066","#1DB7C2"],[0.059,0.941],12,-2.8,-12.2,1.9).s().p("AAODkIgVg1QAwAOAuADQAuACAigKIAWA0QgqAMgpAAIgDABQg0AAglgVgAgtBWIgWg0QAyANArADQAvACAigKIAWA1QgsALgoABQg0AAgmgVgAhqg2IgWg0QBpAdBFgUIAWA0QgrAMgmAAIgDAAQg0AAgmgVgAimjDIgWg1QBqAdBFgUIAVA0QgtANgoAAQgzAAgmgVg");
	this.shape.setTransform(115.6,-3.9,0.428,0.428);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#CBA6E0","#380A70"],[0,1],18.7,34.7,-20.4,-32.6).s().p("AgEFxIgWg1QBOA9BFg/QAbgaANgkQAMgjgIgbIAWA0QALAagPAhQgOAggfAYQgpAhgoAAQggAAgdgVgAgJC1QA9gkA1hhIAWA1QgUBKhfA7gAhFAoQA+gkAzhfIAWA0QgTBJheA6gAiChjQA/glA1hgIAUA0QgJAqgmAnQgcAdgmAXgAi+jyQAOgqAwguQAvgrAtgQIAWA1Qg+AcgmAqQgMAOgqA/g");
	this.shape_1.setTransform(115.7,-4.2,0.428,0.428);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EE7AA4").s().p("AgFAjQgOgEgHgNQgIgMADgNQADgPALgIQAMgIALAEQAOADAHANQAHANgCANQgDAOgMAIQgHAGgJAAIgGgBg");
	this.shape_2.setTransform(171.8,21.3,0.428,0.428);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C1E888").s().p("AgdAiQgKgIABgQQACgQAMgOQANgPAOgEQAQgDALAJQAKAIgBARQgCAOgMAPQgNAPgOAEIgJABQgKAAgIgHg");
	this.shape_3.setTransform(31.2,3.8,0.428,0.428);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C1E888").s().p("AgJAzQgUgFgKgTQgLgTAFgTQAEgVARgMQARgLARAFQATAFALATQALASgFAUQgEAVgRAMQgMAIgNAAIgJgCg");
	this.shape_4.setTransform(165.7,35.7,0.428,0.428);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#15679B").s().p("AgJASQgHgGgBgIQgCgGAFgIQAEgHAIgCQAGgCAGAFQAHAEABAIQACAHgFAIQgEAHgIACIgDABQgFAAgEgDg");
	this.shape_5.setTransform(160.1,72.8,0.428,0.428);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#15679B").s().p("AgbAuQgRgMgEgWQgDgUALgTQAMgTAVgGQARgFASAMQARAMADAWQAEAUgMATQgMATgTAGIgKABQgOAAgMgIg");
	this.shape_6.setTransform(162.7,85.6,0.428,0.428);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F9D63A").s().p("AADAzQgSgFgQgTQgQgTgCgTQgBgWAOgKQANgMAVAFQASAFAQATQAQASACAUQABAVgNAMQgKAIgNAAIgMgCg");
	this.shape_7.setTransform(187,69.9,0.428,0.428);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.lf(["#FFE96E","#F2C103","#F5C400"],[0.02,0.663,0.98],19.7,-4.4,-20,4.6).s().p("ABNC4QgBgnAXgyQAQgmAaglIAfAcQgrA+gVBmgAgEBqQgBgmAUgzQARgjAagmIAfAcQgsA8gVBngAhYAdQAAhDBBhgIAcAcQgpA/gVBlgAirgvQAAgmAWgzQAQgmAaglIAfAcQgsA+gUBng");
	this.shape_8.setTransform(21,194.2,0.428,0.428);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.lf(["#FF0000","#FF0101","#FF7979","#FF7F7F"],[0.122,0.498,0.706,0.878],-7,20.9,3.3,-20.3).s().p("ABNC8QBBgdAQgKQAvgdAug1IAfAdQgeAng0AlQg2AmgmAHgAgEBuQAfggAhgWQAtgdAkgEIAfAdQhfAig0A1gAhXAhQAhggAhgUQArgdAkgEIAfAcQhbAgg3A2gAiqgrQAhggAhgWQAtgdAkgEIAdAdQhdAig1A1gAkYgvQgHhHBKg9QAfgZAegIQAfgJAPAOIAfAcQgRgMghAHQggAGgeAWQhNA3APBTg");
	this.shape_9.setTransform(21,194.1,0.428,0.428);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.lf(["#000066","#1DB7C2"],[0.039,0.961],12.1,1.1,-12.8,-0.8).s().p("AgvD8QAohDBrgfIAHA5QgiAJgnAaQglAZglAmgAhDBhQAXgmAtgbQAkgVArgLIAIA4QgjAKgnAZQglAagkAlgAhXg4QAXglAvgcQAigVArgLIAIA5QgjAJglAaQgnAZgkAkgAhqjTQAWglAwgcQAjgUAqgMIAHA5QgjAJglAaQgmAZglAmg");
	this.shape_10.setTransform(193.5,108.1,0.428,0.428);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.lf(["#80C912","#BAF069","#D5FF96"],[0.098,0.718,0.898],-16.6,1.8,15.4,0).s().p("ABGFtQhBgOghgeIgHg5QBBAhAUAGQA2ARBFgHIAHA5QgSAEgVAAQggAAgngJgAAeC0QgqgPgkAAIgHg5QAtABAmALQA1AOAfAfIAHA5QgtgbgsgPgAhDALIgIg3QAuAAAlALQA1APAfAdIAIA5Qhfg5hIAAgAgHh/QgsgPgkAAIgHg5QAtABAnALQAzAOAfAfIAIA5QgtgbgqgPgAAYkkQgbgYglgIQhdgVgnBeIgHg5QAlhMBfANQAnAFAbAUQAeAWAEAcIAHA5QgHgcgdgZg");
	this.shape_11.setTransform(192.9,107.6,0.428,0.428);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.lf(["#9554BA","#9454BA","#401177","#380A70"],[0.071,0.259,0.541,0.929],-1.7,-34.1,6.8,33.9).s().p("AClFuQhTgRgdg0QgphMAUhjQAUhhBEg/QgbgWgWgJQgigOgsABQgoABgoAMQgNAEgRAIQATATAKAPQAeApgFAzQgEAyglApQgYAbgdAMQgoAPg1gXQgygVgQgfQgagzAjhBQAnhFBMglQgkghgqgQQgfAlgpATQgwAVg1gGQgXgCgbgKQgfgKgLgNQgNgPAUgTQANgMAWgLQBBggBeARQA6hNhOg6QhZhCivAsIgBAAQgiAJgQAWQgPAXALAaIADgBQAXgGAMgSQAGgKgCgIQgCgGgIgKIBHAWQAJALACAHQADAJgHALQgMASgXAHIgCAAQgVAGgugPQghgKgPgHQgbgNgFgRQgIgZAQgWQAQgWAhgIIACgBQBagWBeAMQBaALBOAnQCQBHhCBgQAzAUAsAgQBGgYBXAQQBJANBFAlQAsgkA0gRQA6gSA8AJQAmgjBQgGQBIgFA7ATQB7AmAdBVIhIgYQgYhGgpgNQgmgMg8ALQg8ALgeAYQATAJASAKQAZAPAPAUQARAXgHASQgIAVgjADQg6AFgvgmQgugoANgqQhSAVg4A1QBFA6AaBWQARA7gKA2QgMA+gwAoQgaAWgdAAQgIAAgIgCgABlCqQgTBtA5A0QALgEAPgLQAQgLALgOQAdglAGgyQAFgvgQgzQgOgyghgtQg0BAgQBfgAjrAxQgjA/AfA9QAggEAfgjQAigmAGguQAHgwgZgnQgyAhgfA1gAGSgnQADAUAOASQARgGAFgNQAFgOgJgRQgIgPgQgNQgNASACAWgAmdiDQgaAMgRAPQgIAIgDAHQAkgEAcgPQAZgNAYgYQgfACgcAMg");
	this.shape_12.setTransform(157.6,171.9,0.428,0.428);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.lf(["#BF0046","#BF0046","#FA649B"],[0.004,0.376,0.89],-31.7,79.8,35.9,-75.9).s().p("AhBNnQh4AAhIhvQgegtgJhDQgJg9AKg5QglgQggggQghgigSgqQgxh0Bih3QgXgaALghQAPgzBXg3QA3ggA9gLQAmgGBFABQBLAAAigHQA6gNAkgqQAggmAEgxQAEgsgSgxQgxgKg4ggQhKgrADgpQAEg7A+gIQApgFAzA6QAsAyAUA4QAaAGAXgBQAdgBALgPQAGgHAGgOQAXgwgihVQgcAMghADQgrACgwgZQgugZgigqQgdglgFgjQgHg2AogiQAkggAsAKQA2AMA7BFQAzA9AfBJQAQgUANgtQAQg1gQg3QgOgxglgvQgbAYgFAEQgVANgTgLQgNgIgGgUQgGgVAHgNQAPgXAVgMQAYgNAXAGQAcAJAPATQAqAyAQA0QATA8gQA5QgVBFgxAoQAgBUgXAxQgLAXgOAPQgXAageARQgaAQggACQARBZg6BFQhDBOhOAYQgtAPhcgBQhCgBggAFQg3AGgoAZQgjAXgKAdQgIAaAPAXQAwgrAvgOQAUgGASAAQAqABAXAYQAtAvg6AmQgsAdgrAEIAAAAQglADghgHQgggHgWgPQgaArgGAsQgGA0AVAxQAcBCA9AoQANgcAcgcQARgRAhgZQAzgoAmgOQAzgRAWAhQAVAigyA3QgWAYgwAkQgmAdgVAKQgjAQgigEQgDByAtBFQA+BfBnANQBZAMBUg0QBDgpAshJQAvhMALhbQADgdgJgfQgJgfgTgWQgPgSgSgIQgUgKgQAGIgDACQgMAJgBAeQgBAKAEAOQAHAbARAPIgCgHIAugiQAEAQgBAHQgCAPgPAOQgZAagYAGQgQAEgPgRQgNgPgHgXQgEgOABgLQACgsA4gqIAVgOIAQgIQAVgIAVAIQAVAIASAVQATAXAKAfQAJAggDAeQgNBpg+BZQg1BMhTA3QhkBCheAAIgBAAgAh7FpQgbAHghAYQgaASgSAeQgRAbgFAcQAlARAbgFQAXgEAfgXQAggZAOgQQAdgkgRgaQgLgSgWAAQgIAAgJACgAk+CLQAYAYAoAIQAfAGAkgDQAcgBAAgCQADgagRgSQgXgXgnAAIgBAAQguAAgkAjgABQl9QAUAOAoAUQgWgggYgXQgcgbgagJQADAdAlAcgABaq1QgHAXALAeQAJAXASAYQAkAsAwAYQAwAYAtgEQghhGgvg2Qg3g/g0gMIgGgBQgLAAgEAMgAEtsgQAJAFAPgDQgTgYgYgIQAFAWAOAIg");
	this.shape_13.setTransform(32,128.9,0.428,0.428);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.lf(["#FF0000","#FF0101","#FF7979","#FF7F7F"],[0.169,0.498,0.678,0.831],13.4,1.9,-13.1,-1.8).s().p("AiDB4IAVgmQBEAyALA6IgVAmQghhNgugfgAhMARIAVglQBCAxALA5IgVAnQgfhNgugfgAgUhWIAUglQAZATAUAZQAaAfAGAhIgVAkQgghKgsghgAAhi9IAUgmQBEAyALA6IgVAnQghhMgtghg");
	this.shape_14.setTransform(83.9,214.4,0.428,0.428);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.lf(["#BF0046","#FFA3C5"],[0.039,0.961],9.2,-27.1,-8.1,29.8).s().p("AiJD0QgwgHgegTIATgmQAvAXArACQAPABA5gFIgVAmQgUAHgbAAQgQAAgTgCgAiFCCIATgmQAfgNApADQAfADAeAMIgTAmQg0gUhRAPgAhPAbIAUgkQA2gYBOAcIgUAkQg1gThPAPgAgYhLIAUgmQAcgNApAEQAfACAgAMIgUAmQgzgThRAOgAB7jTQgcgEgbAKQgbAJgMASIAUgmQALgTAagHQAZgHAeAHQBGAQAFBAIgUAmQgChNhHgKg");
	this.shape_15.setTransform(84,213.9,0.428,0.428);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FCD5E6").s().p("AASB+IgSh+IAOhvQAgAVAVAoIhDAyIBVgFQALAsgKAjIhWhKIBGBqQgKAMgNAFQgKADgKAAIgJAAgAhCA0IBCg0IgOBwQgegTgWgpgAhVhIIBVBIIhUAGQgLgqAKgkgAhFhpQALgMAMgFQAMgEARABIARB9g");
	this.shape_16.setTransform(23.5,20.3,0.428,0.428);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C60C50").s().p("AgUBsQglgcgTgzQgUgxAJgtQAJgsAggNQAggMAjAbQAlAcATAzQAUAxgJAtQgJAsggANQgKAEgLAAQgXAAgXgTg");
	this.shape_17.setTransform(23.5,20.3,0.428,0.428);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FBCCE0").s().p("AFHJKQg6gOg6g2Qgwgsgng+QhRA8g4gQQhOgVgog6Qgng3AFhQQi/gShQivQgjhMgChbQgBhcAghVQAuh4BghMQBchKCAgZIAwA0QiAAahcBJQhfBMgtB3QgdBLgIBOQgKBeAbA8QAdBBBOAkQBMAkBGgNQAOhLATguQASgrAUgXQAhgpAeAWQA4ApgEAyQgBAagLAdQgKAdgOAVQglAzg/AMQgLA9AFAjQAJA3AwANQAgAIAngQQAmgPAoghQgnhmAjhhQAPgrAWgaQAdgiAmgCQAcgBAZAXQAUASAPAdQAVAqgbBHIgBAAQgIAWgPAZQgqBGhBA3QAUAyAiAjQAmAnAwAMQAzAMAtgVQAygZgDg0QgEgNgSAIQgSAIgBAOIgwg6QAUgIAfABQAiABAMAMQASARALAXQAMAZAAAXQABA1gzAYQgcANgfAAQgTAAgTgFgACQC1QgeBEAIBHQAtgsAhg3QAQgaAHgUIAAAAQARgqgCgkQg7ADgjBRgAhNB2QgIATgFAWQASgPAOgSQAdgnAIg3QggAZgYA9g");
	this.shape_18.setTransform(33.8,27.4,0.428,0.428);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18,p:{scaleX:0.428,scaleY:0.428,x:33.8,y:27.4}},{t:this.shape_17,p:{scaleX:0.428,scaleY:0.428,x:23.5,y:20.3}},{t:this.shape_16,p:{scaleX:0.428,scaleY:0.428,x:23.5,y:20.3}},{t:this.shape_15,p:{scaleX:0.428,scaleY:0.428,x:84,y:213.9}},{t:this.shape_14,p:{scaleX:0.428,scaleY:0.428,x:83.9,y:214.4}},{t:this.shape_13,p:{scaleX:0.428,scaleY:0.428,rotation:0,x:32,y:128.9}},{t:this.shape_12,p:{scaleX:0.428,scaleY:0.428,rotation:0,x:157.6,y:171.9}},{t:this.shape_11,p:{scaleX:0.428,scaleY:0.428,x:192.9,y:107.6}},{t:this.shape_10,p:{scaleX:0.428,scaleY:0.428,x:193.5,y:108.1}},{t:this.shape_9,p:{scaleX:0.428,scaleY:0.428,x:21,y:194.1}},{t:this.shape_8,p:{scaleX:0.428,scaleY:0.428,x:21,y:194.2}},{t:this.shape_7,p:{scaleX:0.428,scaleY:0.428,x:187,y:69.9}},{t:this.shape_6,p:{scaleX:0.428,scaleY:0.428,x:162.7,y:85.6}},{t:this.shape_5,p:{scaleX:0.428,scaleY:0.428,x:160.1,y:72.8}},{t:this.shape_4,p:{scaleX:0.428,scaleY:0.428,x:165.7,y:35.7}},{t:this.shape_3,p:{scaleX:0.428,scaleY:0.428,x:31.2,y:3.8}},{t:this.shape_2,p:{scaleX:0.428,scaleY:0.428,x:171.8,y:21.3}},{t:this.shape_1,p:{scaleX:0.428,scaleY:0.428,rotation:0,x:115.7,y:-4.2}},{t:this.shape,p:{scaleX:0.428,scaleY:0.428,rotation:0,x:115.6,y:-3.9}}]}).to({state:[{t:this.shape_18,p:{scaleX:0.512,scaleY:0.512,x:22.8,y:12.8}},{t:this.shape_17,p:{scaleX:0.512,scaleY:0.512,x:10.7,y:4.1}},{t:this.shape_16,p:{scaleX:0.512,scaleY:0.512,x:10.7,y:4.1}},{t:this.shape_15,p:{scaleX:0.512,scaleY:0.512,x:83,y:235.5}},{t:this.shape_14,p:{scaleX:0.512,scaleY:0.512,x:82.9,y:236.1}},{t:this.shape_13,p:{scaleX:0.512,scaleY:0.512,rotation:-46.8,x:-20.4,y:110.7}},{t:this.shape_12,p:{scaleX:0.512,scaleY:0.512,rotation:11.5,x:161.9,y:204.1}},{t:this.shape_11,p:{scaleX:0.512,scaleY:0.512,x:213.2,y:108.5}},{t:this.shape_10,p:{scaleX:0.512,scaleY:0.512,x:213.8,y:109.1}},{t:this.shape_9,p:{scaleX:0.512,scaleY:0.512,x:7.7,y:211.8}},{t:this.shape_8,p:{scaleX:0.512,scaleY:0.512,x:7.7,y:212}},{t:this.shape_7,p:{scaleX:0.512,scaleY:0.512,x:206,y:63.7}},{t:this.shape_6,p:{scaleX:0.512,scaleY:0.512,x:177,y:82.4}},{t:this.shape_5,p:{scaleX:0.512,scaleY:0.512,x:173.8,y:67.2}},{t:this.shape_4,p:{scaleX:0.512,scaleY:0.512,x:180.5,y:22.8}},{t:this.shape_3,p:{scaleX:0.512,scaleY:0.512,x:19.7,y:-15.2}},{t:this.shape_2,p:{scaleX:0.512,scaleY:0.512,x:187.9,y:5.6}},{t:this.shape_1,p:{scaleX:0.512,scaleY:0.512,rotation:24.2,x:120.7,y:-25.3}},{t:this.shape,p:{scaleX:0.512,scaleY:0.512,rotation:24.2,x:120.5,y:-25.1}}]},1).to({state:[{t:this.shape_18,p:{scaleX:0.428,scaleY:0.428,x:33.8,y:27.4}},{t:this.shape_17,p:{scaleX:0.428,scaleY:0.428,x:23.5,y:20.3}},{t:this.shape_16,p:{scaleX:0.428,scaleY:0.428,x:23.5,y:20.3}},{t:this.shape_15,p:{scaleX:0.428,scaleY:0.428,x:84,y:213.9}},{t:this.shape_14,p:{scaleX:0.428,scaleY:0.428,x:83.9,y:214.4}},{t:this.shape_13,p:{scaleX:0.428,scaleY:0.428,rotation:95.6,x:-2.4,y:109.3}},{t:this.shape_12,p:{scaleX:0.428,scaleY:0.428,rotation:0,x:163.2,y:193.4}},{t:this.shape_11,p:{scaleX:0.428,scaleY:0.428,x:192.9,y:107.6}},{t:this.shape_10,p:{scaleX:0.428,scaleY:0.428,x:193.5,y:108.1}},{t:this.shape_9,p:{scaleX:0.428,scaleY:0.428,x:21,y:194.1}},{t:this.shape_8,p:{scaleX:0.428,scaleY:0.428,x:21,y:194.2}},{t:this.shape_7,p:{scaleX:0.428,scaleY:0.428,x:187,y:69.9}},{t:this.shape_6,p:{scaleX:0.428,scaleY:0.428,x:162.7,y:85.6}},{t:this.shape_5,p:{scaleX:0.428,scaleY:0.428,x:160.1,y:72.8}},{t:this.shape_4,p:{scaleX:0.428,scaleY:0.428,x:165.7,y:35.7}},{t:this.shape_3,p:{scaleX:0.428,scaleY:0.428,x:31.2,y:3.8}},{t:this.shape_2,p:{scaleX:0.428,scaleY:0.428,x:171.8,y:21.3}},{t:this.shape_1,p:{scaleX:0.428,scaleY:0.428,rotation:0,x:115.7,y:-4.2}},{t:this.shape,p:{scaleX:0.428,scaleY:0.428,rotation:0,x:115.6,y:-3.9}}]},1).to({state:[{t:this.shape_18,p:{scaleX:0.512,scaleY:0.512,x:22.8,y:12.8}},{t:this.shape_17,p:{scaleX:0.512,scaleY:0.512,x:10.7,y:4.1}},{t:this.shape_16,p:{scaleX:0.512,scaleY:0.512,x:10.7,y:4.1}},{t:this.shape_15,p:{scaleX:0.512,scaleY:0.512,x:83,y:235.5}},{t:this.shape_14,p:{scaleX:0.512,scaleY:0.512,x:82.9,y:236.1}},{t:this.shape_13,p:{scaleX:0.512,scaleY:0.512,rotation:-46.8,x:-20.4,y:110.7}},{t:this.shape_12,p:{scaleX:0.512,scaleY:0.512,rotation:11.5,x:161.9,y:204.1}},{t:this.shape_11,p:{scaleX:0.512,scaleY:0.512,x:213.2,y:108.5}},{t:this.shape_10,p:{scaleX:0.512,scaleY:0.512,x:213.8,y:109.1}},{t:this.shape_9,p:{scaleX:0.512,scaleY:0.512,x:7.7,y:211.8}},{t:this.shape_8,p:{scaleX:0.512,scaleY:0.512,x:7.7,y:212}},{t:this.shape_7,p:{scaleX:0.512,scaleY:0.512,x:206,y:63.7}},{t:this.shape_6,p:{scaleX:0.512,scaleY:0.512,x:177,y:82.4}},{t:this.shape_5,p:{scaleX:0.512,scaleY:0.512,x:173.8,y:67.2}},{t:this.shape_4,p:{scaleX:0.512,scaleY:0.512,x:180.5,y:22.8}},{t:this.shape_3,p:{scaleX:0.512,scaleY:0.512,x:19.7,y:-15.2}},{t:this.shape_2,p:{scaleX:0.512,scaleY:0.512,x:187.9,y:5.6}},{t:this.shape_1,p:{scaleX:0.512,scaleY:0.512,rotation:24.2,x:120.7,y:-25.3}},{t:this.shape,p:{scaleX:0.512,scaleY:0.512,rotation:24.2,x:120.5,y:-25.1}}]},1).wait(1));

	// bg
	this.instance_5 = new lib.Bitmap7();
	this.instance_5.setTransform(0,0,0.286,0.286);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5,p:{scaleX:0.286,scaleY:0.286,x:0,y:0}}]}).to({state:[{t:this.instance_5,p:{scaleX:0.356,scaleY:0.356,x:-24.4,y:-24.4}}]},1).to({state:[{t:this.instance_5,p:{scaleX:0.286,scaleY:0.286,x:0,y:0}}]},1).to({state:[{t:this.instance_5,p:{scaleX:0.356,scaleY:0.356,x:-24.4,y:-24.4}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-20.9,201.4,245.5);


// symbols:
(lib.head = function() {
	this.initialize(imgData);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,533,639);


(lib.Bitmap6 = function() {
	this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.Bitmap7 = function() {
	this.initialize(img.Bitmap7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,700,700);


(lib.newyear1 = function() {
	this.initialize(img.newyear1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.newyear2 = function() {
	this.initialize(img.newyear2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.newyear3 = function() {
	this.initialize(img.newyear3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib.newyear4 = function() {
	this.initialize(img.newyear4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,200);


(lib._01 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.head();
	this.instance.setTransform(-15,-10,0.55,0.55);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,104,124.7);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;