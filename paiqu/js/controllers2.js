var imgData = '';
var lib, images, createjs;
var faceppData = {};

angular.module('starter.controllers', [])
// 第一步
// 
.controller('HomeCtrl', function($scope, $state) {
    var fileEl = document.getElementById('fileInput');
    fileEl.addEventListener('change', function(e) {
        var file = e.target.files[0];

        // if(!window.FileReader) {
        //     alert('你的浏览器或太旧不支持该功能');
        //     return;
        // }

        var reader = new FileReader();

        reader.onload = (function(theFile) {
            return function(e) {
                var pic = new Image();
                pic.src = e.target.result;

                imgData = pic;

                if (pic) {
                    $state.go('select-head');
                }
            }
        })(file);
        reader.readAsDataURL(file)
    })

})

// 第二步
// 
.controller('SelectHeadCtrl', function($scope, $state) {
    var canvas = document.getElementById('choose-head-c'),
        ctx = canvas.getContext('2d');
    winW = window.innerWidth,
    winH = window.innerHeight;

    canvas.width = 240;
    canvas.height = 284;

    canvas.style.marginLeft = -240 / 2 + 'px';
    canvas.style.marginTop = -284 / 2 + 'px';

    var centerX = canvas.width / 2,
        centerY = canvas.height / 2;
 
    var position = {
        x: 0,
        y: 0
    };

    var scale = {
        x: 0.5,
        y: 0.5
    }

    var imgTexture = imgData;

    var lastZoomScale = null,
        lastX = null,
        lastY = null;

    var isInit = false;

    var desktop = true;

    var mdown = false;

    var path = new Path2D('M196.961,115.5c-1.006-0.086-2.078,0.076-3.171,0.414C190.556,64.376,158.763,42,119.995,42s-70.559,22.376-73.794,73.913 c-1.092-0.338-2.162-0.499-3.166-0.413c-7.008,0.6-8.362,11.813-7.145,25.398c1.219,13.585,7.886,24.116,14.896,23.517 c0.048-0.004,0.094-0.021,0.143-0.026C61.683,206.893,88.548,242,119.994,242c31.444,0,58.309-35.107,69.065-77.608 c0.052,0.004,0.097,0.021,0.148,0.026c7.01,0.599,13.682-9.932,14.899-23.519C205.327,127.313,203.972,116.101,196.961,115.5z');

    ctx.clip(path);

    checkRequestAnimationFrame();
    requestAnimationFrame(animate);
    setEventListeners();


    function animate() {
        if (!isInit) {
            if (imgTexture.width) {
                var scaleRatio = null;
                if (canvas.clientWidth > canvas.clientHeight) {
                    scaleRatio = canvas.clientWidth / imgTexture.width;
                } else {
                    scaleRatio = canvas.clientHeight / imgTexture.height;
                }
                scale.x = scaleRatio;
                scale.y = scaleRatio;

                isInit = true;
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            imgTexture,
            position.x, position.y,
            scale.x * imgTexture.width,
            scale.y * imgTexture.height
        )

        

        requestAnimationFrame(animate);
    }



    function gesturePinchZoom(e) {
        var zoom = false;

        if (e.targetTouches.length >= 2) {
            var p1 = e.targetTouches[0],
                p2 = e.targetTouches[1],
                zoomScale = Math.sqrt(Math.pow(p2.pageX - p1.pageX, 2) + Math.pow(p2.pageY - p1.pageY, 2));

            if (lastZoomScale) {
                zoom = zoomScale - lastZoomScale;
            }

            lastZoomScale = zoomScale;
        }

        return zoom;
    }

    function doZoom(zoom) {
        if (!zoom) return;


        var currentScale = scale.x,
            newScale = scale.x + zoom / 100;

        var deltaScale = newScale - currentScale,
            currentWidth = (imgTexture.width * scale.x),
            currentHeight = (imgTexture.height * scale.y),
            deltaWidth = (imgTexture.width * deltaScale),
            deltaHeight = (imgTexture.height * deltaScale);

        var canvasmiddleX = canvas.width / 2,
            canvasmiddleY = canvas.height / 2,
            xonmap = (-position.x) + canvasmiddleX,
            yonmap = (-position.y) + canvasmiddleY,
            coefX = -xonmap / (currentWidth),
            coefY = -yonmap / (currentHeight),
            newPosX = position.x + deltaWidth * coefX,
            newPosY = position.y + deltaHeight * coefY;

        var newWidth = currentWidth + deltaWidth,
            newHeight = currentHeight + deltaHeight;

        if (newWidth < canvas.clientWidth) return;
        if (newPosX > 0)
            newPosX = 0;
        if (newPosX + newWidth < canvas.clientWidth)
            newPosX = canvas.clientWidth - newWidth;

        if (newHeight < canvas.clientHeight) return;
        if (newPosY > 0)
            newPosY = 0;
        if (newPosY + newHeight < canvas.clientHeight)
            newPosY = canvas.clientHeight - newHeight;

        scale.x = newScale;
        scale.y = newScale;
        position.x = newPosX;
        position.y = newPosY;
    }

    function doMove(x, y) {

        if (lastX && lastY) {
            var deltaX = x - lastX,
                deltaY = y - lastY,
                currentWidth = (imgTexture.width * scale.x),
                currentHeight = (imgTexture.height * scale.y);

            position.x += deltaX;
            position.y += deltaY;

            if (position.x > canvas.clientWidth - 50) {
                position.x = 0;
            } else if (position.x + currentWidth < canvas.clientWidth) {
                position.x = canvas.clientWidth - currentWidth;
            }

            if (position.y > canvas.clientHeight - 50) {
                position.y = 0;
            } else if (position.y + currentHeight < canvas.clientHeight) {
                position.y = canvas.clientHeight - currentHeight;
            }

        }

        lastX = x;
        lastY = y;
    }

    function setEventListeners() {
        canvas.addEventListener('touchstart', function(e) {
            lastX = null;
            lastY = null;
            lastZoomScale = null;
        });

        canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
            if (e.targetTouches.length == 2) {
                doZoom(gesturePinchZoom(e));
            } else if (e.targetTouches.length == 1) {
                var relativeX = e.targetTouches[0].pageX - canvas.getBoundingClientRect().left,
                    relativeY = e.targetTouches[0].pageY - canvas.getBoundingClientRect().top;
                doMove(relativeX, relativeY);
            }
        });

        if (desktop) {
            window.addEventListener('keyup', function(e) {
                if (e.keyCode == 187 || e.keyCode == 61) { //+
                    doZoom(5);
                } else if (e.keyCode == 189) { //-
                    doZoom(-5);
                }
            });
        }
    }

    function checkRequestAnimationFrame() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    }



    $scope.gotoNext = function() {

        imgData = canvas.toDataURL();
        $state.go('build');

    }
})

// 第三步
// 
.controller('BuildCtrl', function($scope, $ionicLoading, $state, uploadGif, loadTpl) {
    var canvas = document.getElementById('build-c'),
        ctx = canvas.getContext('2d');

    winW = window.innerWidth;
    winH = window.innerHeight;

    canvas.width = 200;
    canvas.height = 200;

    var centerX = canvas.width / 2,
        centerY = canvas.height / 2;

    $scope.tplName = 'learnMusic';

    $scope.json = '';

    $scope.loadTpl = function() {
        loadTpl.query({
            tplName: $scope.tplName
        }, function(back) {
            $scope.json = back[0];

            var manifest = $scope.json["srcs"];

            var loader = new createjs.LoadQueue(false);
            loader.addEventListener("fileload", handleFileLoad);
            loader.addEventListener("complete", handleComplete);
            loader.loadManifest(manifest);
        });
    }
    $scope.loadTpl();

    function handleFileLoad(evt) {
        if (evt.item.type == "image") {
            images[evt.item.id] = evt.result;
        }
    }

    function handleComplete() {
        exportRoot = new lib[$scope.tplName](false, 0);

        stage = new createjs.Stage(canvas);

        stage.addChild(exportRoot);
        stage.update();

        createjs.Ticker.setFPS($scope.json['count'] / 2);
        createjs.Ticker.addEventListener("tick", stage);

        stage.addEventListener('tick', function(e) {})

    }

    // 切换模板
    // 
    $scope.changeTemp = function(tpl) {
        $scope.tplName = tpl;
        $scope.loadTpl();
    }

    // 生成
    // 
    $scope.build = function() {
        $ionicLoading.show({
            template: '生成中..'
        });
        setTimeout(function() {
            var encoder = new GIFEncoder();
            encoder.setRepeat(0);
            encoder.setDelay(300);
            encoder.start();
            for (var i = 0; i <= $scope.json.count; i++) {
                exportRoot = new lib[$scope.tplName](false, i);

                stage = new createjs.Stage(canvas);
                stage.addChild(exportRoot);
                stage.update();
                encoder.addFrame(ctx);
                if (i == $scope.json.count) {
                    encoder.finish();
                    var uri = encode64(encoder.stream().getData());
                    // document.getElementById('image').src = 'data:image/gif;base64,' + uri;
                    $ionicLoading.show({
                        template: '生成成功!',
                        duration: 1000
                    });
                    uploadGif.query({
                        gif_stream: uri
                    }, function(back) {
                        if (back) {
                            $state.go('end', {
                                src: back.name
                            });
                        }
                    });
                }
            }
        }, 300);

    }
})

.controller('EndCtrl', function($scope, $stateParams, $ionicLoading) {
    console.log($stateParams)
    $scope.gifSrc = $stateParams.src;
});