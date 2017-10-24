$(document).ready(function(){
	var part1 = $("#part-1");
	var plan1 = $("#part-1 .plan1");
	var plan2 = $("#part-1 .plan2");
	var balloon = $("#part-1 .balloon");
	var windowWidth = $(window).width();
	var firstBalloon = true;
	var showFooter = false;

	var objArray = new Array();

	//调用滚动插件
	$("#box").fullpage({
		anchors: ['page1', 'page2', 'page3', 'page4']
	});

	setContainerHeight();
	fillObjArray();
	setImgSize();
	moveBalloon();

	movePlan1();
	movePlan2();

	setInterval(function(){movePlan1()}, 10000);
	setInterval(function(){movePlan2()}, 12000);
	var balloonTimer = setInterval(function(){moveBalloon()}, 800);

	//第一屏,鼠标移动事件
	$("#part-1").mousemove(function(e){
		moveDiv(e.pageX, e.pageY);
	});

	//点击向下三角
	$(".triangle-down").click(function(){
		$.fn.fullpage.moveSectionDown();
	})

	//点击向上三角
	$(".triangle-up").click(function(){
		// $.fn.fullpage.moveSectionUp();
	})

	$("#part-4").mousewheel(function(e, delta, deltaX, deltaY){
		if(showFooter){
			window.event? window.event.cancelBubble = true : e.stopPropagation();
		}

		if(deltaY < 0){
			$("#part-4").stop().animate({height:$(window).height() - 160},300,'linear',function(){})
			$("#footer").stop().animate({bottom:"0"},300,'linear',function(){})
			showFooter = true;
		}else{
			$("#footer").stop().animate({bottom:"-160px"},300,'linear',function(){});
			$("#part-4").stop().animate({height:$(window).height()},300,'linear',function(){})
			showFooter = false;
		}
        
	})

	$("#footer").mousewheel(function(e){
		window.event? window.event.cancelBubble = true : e.stopPropagation();
	});


	//宽口resize
	$(window).resize(function(){
		windowWidth = $(window).width();
		setContainerHeight();
		setImgSize();
	});

	balloon.hover(function(){
		balloonTimer = clearInterval(balloonTimer);
		balloon.css("transition","transform 0.3s linear");
		balloonTimer = setInterval(function(){moveBalloon()}, 300);
		
	},function(){
		balloonTimer = clearInterval(balloonTimer);
		balloon.css("transition","transform 1s linear");
		balloonTimer = setInterval(function(){moveBalloon()}, 800);
	})

	

	//填充动画数组
	function fillObjArray(){
		var frontCloudObj = $("#part-1 .frontCloud");
		var frontCloudX = {getX : function(){ return windowWidth * 0.5 - 2048 }};
		var frontCloudFactor = 0.2;
		var frontCloudMoveAct = true;
		var frontCloudArray = new Array();
		frontCloudArray.push(frontCloudObj, frontCloudX, frontCloudFactor, frontCloudMoveAct);
		objArray.push(frontCloudArray);

		var backCloudObj = $("#part-1 .backCloud");
		var backCloudX = {getX : function(){ return windowWidth * 0.5 - 1150 }};
		var backCloudFactor = 0.05;
		var backCloudMoveAct = true;
		var backCloudArray = new Array();
		backCloudArray.push(backCloudObj, backCloudX, backCloudFactor, backCloudMoveAct);
		objArray.push(backCloudArray);

		var backCloud2Obj = $("#part-1 .backCloud2");
		var backCloud2X = {getX : function(){ return windowWidth * 0.5 - 961 }};
		var backCloud2Factor = 0.00;
		var backCloud2MoveAct = true;
		var backCloud2Array = new Array();
		backCloud2Array.push(backCloud2Obj, backCloud2X, backCloud2Factor, backCloud2MoveAct);
		objArray.push(backCloud2Array);

		var treeObj = $("#part-1 .tree");
		var treeX = {getX : function(){ return windowWidth * 0.5 - 510 }};
		var treeFactor = 0.08;
		var treeMoveAct = true;
		var treeArray = new Array();
		treeArray.push(treeObj, treeX, treeFactor, treeMoveAct);
		objArray.push(treeArray);

		var mountainObj = $("#part-1 .mountain");
		var mountainX = {getX : function(){ return windowWidth * 0.5 - 560 }};
		var mountainFactor = 0.1;
		var mountainMoveAct = true;
		var mountainArray = new Array();
		mountainArray.push(mountainObj, mountainX, mountainFactor, mountainMoveAct);
		objArray.push(mountainArray);

		var rainbowObj = $("#part-1 .rainbow");
		var rainbowX = {getX : function(){ return windowWidth * 0.5 - 450 }};
		var rainbowFactor = 0.06;
		var rainbowMoveAct = true;
		var rainbowArray = new Array();
		rainbowArray.push(rainbowObj, rainbowX, rainbowFactor, rainbowMoveAct);
		objArray.push(rainbowArray);

		var floatCloudObj = $("#part-1 .floatCloud");
		var floatCloudX = {getX : function(){ return windowWidth * 0.5 - 854 }};
		var floatCloudFactor = 0.00;
		var floatCloudMoveAct = false;
		var floatCloudArray = new Array();
		floatCloudArray.push(floatCloudObj, floatCloudX, floatCloudFactor, floatCloudMoveAct);
		objArray.push(floatCloudArray);

		var floatCloud2Obj = $("#part-1 .floatCloud2");
		var floatCloud2X = {getX : function(){ return windowWidth * 0.5 - 626 }};
		var floatCloud2Factor = 0.03;
		var floatCloud2MoveAct = true;
		var floatCloud2Array = new Array();
		floatCloud2Array.push(floatCloud2Obj, floatCloud2X, floatCloud2Factor, floatCloud2MoveAct);
		objArray.push(floatCloud2Array);

		var balloonObj = $("#part-1 .balloon");
		var balloonX = {getX : function(){ return windowWidth * 0.5 - 130 + 400 }};
		var balloonFactor = 0.0;
		var balloonMoveAct = false;
		var balloonArray = new Array();
		balloonArray.push(balloonObj, balloonX, balloonFactor, balloonMoveAct);
		objArray.push(balloonArray);

		var plan1Obj = $("#part-1 .plan1");
		var plan1X = {getX : function(){ return windowWidth * 0.5 - 45 + 450 }};
		var plan1Factor = 0.0;
		var plan1MoveAct = false;
		var plan1Array = new Array();
		plan1Array.push(plan1Obj, plan1X, plan1Factor, plan1MoveAct);
		objArray.push(plan1Array);

		var plan2Obj = $("#part-1 .plan2");
		var plan2X = {getX : function(){ return windowWidth * 0.5 - 44 -620 }};
		var plan2Factor = 0.0;
		var plan2MoveAct = false;
		var plan2Array = new Array();
		plan2Array.push(plan2Obj, plan2X, plan2Factor, plan2MoveAct);
		objArray.push(plan2Array);

		var diaObj = $("#part-1 .dia");
		var diaX = {getX : function(){ return windowWidth * 0.5 - 241 }};
		var diaFactor = 0.00;
		var diaMoveAct = false;
		var diaArray = new Array();
		diaArray.push(diaObj, diaX, diaFactor, diaMoveAct);
		objArray.push(diaArray);

	}

	//动态设置容器高度
	function setContainerHeight(){
		// alert($(window).height())
		$("#container").height($(window).height());
	}

	//设置第一屏图片位置
	function setImgSize(){
		for(var i=0;i<objArray.length;i++){
			objArray[i][0].css("left", objArray[i][1].getX);
		}
		
	}

	//移动第一屏图片
	function moveDiv(tempXsent, tempYsent){
		for (var i=0;i<objArray.length;i++){
			if(objArray[i][3]){
				var yourDivPositionX = objArray[i][2] * (0.5 * windowWidth - tempXsent) + objArray[i][1].getX();
				objArray[i][0].css("left",yourDivPositionX + 'px');
			}
		}
	}

	//飞机1起飞
	function movePlan1(){
		plan1.animate({
			left: "0"
		},
			10000, 'linear', function() {
			plan1.css('left',"1830px")
		});
	}

	//飞机2起飞
	function movePlan2(){

		plan2.animate({
			left: "1920px"
		},
			12000, 'linear', function() {
			plan2.css('left',"0")
		});
	}

	function moveBalloon(){
		if(firstBalloon){
			balloon.css("transform","rotate(-5deg)");
			firstBalloon = false;
		}else{
			balloon.css("transform","rotate(5deg)");
			firstBalloon = true;
		}
		
	}
})