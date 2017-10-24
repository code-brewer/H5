var imgData = '';
var lib, images, createjs;

angular.module('starter.controllers', [])
// 第一步
// 
.controller('HomeCtrl', function($scope, $state) {

    var fileEl = document.getElementById('fileInput');
    fileEl.addEventListener('change', function(e) {
        var file = e.target.files[0];
        console.log(file);

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
    $scope.text = 'Hello';

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

    var images = images || {};
    var manifest = [{
        src: 'img/headimg.png',
        id: 'headimg'
    }];

    var loader = new createjs.LoadQueue(true);
    loader.addEventListener("fileload", handleFileLoad);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);

    function handleFileLoad(evt) {
        if (evt.item.type == "image") {
            images[evt.item.id] = evt.result;
        }
    }


    function handleComplete() {
        var stage = new createjs.Stage(canvas);

        var shape = new createjs.Shape();
        shape.graphics.f("#000000").s().p("AmeMDQi0jYhTlLIgBAAQgzAEgrhEQgrhGgJhjQgKhvAPhBQAQhLAxgDQAPgBAQAFQAXlxDQjCQC+iwEugBQEvABC+CwQDQDCAXFxQAQgFAPABQAxADAQBLQAPBBgKBvQgJBjgrBGQgrBEgzgEIgCAAQhSFLi0DYQi/DkjgAAQjfAAi/jkg");

        shape.regX = -120;
        shape.regY = -142;
        stage.addChild(shape);

        var bitmap = new createjs.Bitmap(imgData);
        bitmap.mask = shape;
        bitmap.regX = imgData.width / 2;
        bitmap.regY = imgData.height / 2;
        bitmap.x = centerX;
        bitmap.y = centerY;


        // bitmap.addEventListener('mousedown', function(e) {
        //     console.log('e', e.nativeEvent);
        //     console.log('screenX', e.nativeEvent.touches[0].screenX);

        //     var beginX = e.nativeEvent.touches[0].screenX,
        //         beginY = e.nativeEvent.touches[0].screenY;

        //     bitmap.addEventListener('pressmove', function(ev) {
        //         var diffX = beginX - ev.nativeEvent.touches[0].screenX,
        //             diffY = beginY - ev.nativeEvent.touches[0].screenY;
        //         console.log(ev);

        //         if (ev.nativeEvent.touches.length >= 2) {

        //             var touch1 = ev.nativeEvent.touches[0].screenX,
        //                 touch2 = ev.nativeEvent.touches[1].screenX;
        //             var min = Math.min(touch1, touch2),
        //                 max = Math.max(touch1, touch2);

        //             scaleRatio = (max - min) / 100;

        //             bitmap.setTransform(false, false, scaleRatio, scaleRatio);
        //             bitmap.regX = imgData.width / 2;
        //             bitmap.regY = imgData.height / 2;

        //         } else {
        //             bitmap.x = ev.stageX;
        //             bitmap.y = ev.stageY;
        //         }


        //     });
        // });

        bitmap.addEventListener('mousedown', function(e) {
            bitmap.addEventListener('pressmove', function(ev) {
                var relativeX = ev.nativeEvent.touches[0].screenX,
                    relativeY = ev.nativeEvent.touches[0].screenY;
                // var diffX = beginX - ev.nativeEvent.touches[0].screenX,
                //     diffY = beginY - ev.nativeEvent.touches[0].screenY;
                console.log(relativeX);

                if (ev.nativeEvent.touches.length >= 2) {

                } else {
                    // var relativeX = e.targetTouches[0].pageX - this.canvas.getBoundingClientRect().left;
                    // var relativeY = e.targetTouches[0].pageY - this.canvas.getBoundingClientRect().top;                
                    doMove(relativeX, relativeY);
                }


            });
        });

        stage.addChild(bitmap);

        createjs.Touch.enable(stage);
        stage.enableMouseOver();
        createjs.Ticker.setFPS(30);
        stage.update();



        createjs.Ticker.addEventListener('tick', function() {
            // bitmap.x = stage.mouseX - 75;
            // bitmap.y = stage.mouseY - 75;
            stage.update();
        });
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

    $scope.tplName = 'test';

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

        createjs.Ticker.setFPS($scope.json['count']);
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
            encoder.setDelay(800);
            encoder.start();
            for (var i = 0; i < 4; i++) {
                exportRoot = new lib[$scope.tplName](false, i);

                stage = new createjs.Stage(canvas);
                stage.addChild(exportRoot);
                stage.update();
                encoder.addFrame(ctx);
                if (i == 3) {
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