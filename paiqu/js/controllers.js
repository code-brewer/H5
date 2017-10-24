var imgData = '',
    imgBaseData = '';
var lib, images, createjs;
var faceppData = {};
var ss = 0;
var position = {
    x: 0,
    y: 0
};

var scale = {
    x: 0.5,
    y: 0.5
}


var rotation = 0,
    rotateDirection = null; // left or right

angular.module('starter.controllers', [])

.run(function($rootScope) {
    // 分享接口
    // 
    $rootScope.share = function() {

    }
})

// 第一步
// 
.controller('HomeCtrl', function($scope, $state) {
    var fileEl2 = document.getElementById('fileInput2');
    fileEl2.addEventListener('click', function(e) {
        ss = 0;
        position.x = 0;
        position.y = 0;
        scale.x = 0.5;
        scale.y = 0.5;
        rotation = 0;
        rotateDirection = null;
        console.log("g0");
        var rr = linjs.gogogo("2");
        if (rr != null) {
            var pic = new Image();
            console.log("rr",rr);
            pic.src = rr;
            imgBaseData = pic;
            $state.go('build-text');
        }
    })
    var fileEl = document.getElementById('fileInput');
    // fileEl.addEventListener('click', function(e) {
    //     ss = 0;
    //     position.x = 0;ß
    //     position.y = 0;
    //     scale.x = 0.5;
    //     scale.y = 0.5;
    //     rotation = 0;
    //     rotateDirection = null;
    //     console.log("g0");
    //     var rr = linjs.gogogo("1");
    //     if(rr != null){
    //         var pic = new Image();
    //         pic.src = rr;
    //         imgBaseData = pic;
    //         $state.go('select-head');
    //     }
    // })
    fileEl.addEventListener('change', function(e) {
        // console.log(e)
        var file = e.target.files[0];

        if (!window.FileReader) {
            alert('你的浏览器或太旧不支持该功能');
            document.write('你的浏览器或太旧不支持该功能');
            return;
        }
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                // var pic = new Image();
                // pic.src = e.target.result;
                // imgBaseData = pic;
                // console.log(e.target.result)
                // window.localStorage.setItem('pic', e.target.result)

                // if (pic) {
                //     $state.go('build-text');
                // }
                // console.log(window.json_val.imgPath);
                // window.localStorage.setItem('pic', window.json_val.imgPath);
                // imgBaseData = window.json_val.imgPath;
            }
        })(file);
        reader.readAsDataURL(file)
    });

    // $scope.tackPicture = function() {
    //     wx.chooseImage({
    //         count: 1, // 默认9
    //         sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //         sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
    //         success: function(res) {
    //             var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    //             var pic = new Image();
    //             pic.src = localIds[0];
    //             imgBaseData = pic;

    //             if (pic) {
    //                 $state.go('select-head');
    //             }
    //             // wx.uploadImage({
    //             //     localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
    //             //     isShowProgressTips: 1, // 默认为1，显示进度提示
    //             //     success: function(r) {
    //             //         alert(JSON.stringify(r));
    //             //         var serverId = r.serverId; // 返回图片的服务器端ID
    //             //     }
    //             // });
    //         }
    //     });
    // }

})

// 第二步
// 
.controller('SelectHeadCtrl', function($scope, $state) {
    // if(ss>0){
    //     return;
    // }

    var canvas = document.getElementById('choose-head-c'),

        winW = window.innerWidth,
        winH = window.innerHeight;

    canvas.width = 240;
    canvas.height = 284;


    var centerX = canvas.width / 2,
        centerY = canvas.height / 2;

    // var wrapBounds = document.querySelector('.top-section').getBoundingClientRect();

    // canvas.width = wrapBounds.width;
    // canvas.height = wrapBounds.height;

    canvas.style.marginLeft = -centerX + 'px';
    canvas.style.marginTop = -centerY + 'px';

    if (ss == 0) {
        position.x = centerX;
        position.y = centerY;
    }

    // var position = {
    //     x: centerX,
    //     y: centerY
    // };

    // var scale = {
    //     x: 0.5,
    //     y: 0.5
    // }


    // var rotation = 0,
    //     rotateDirection = null; // left or right

    var lastZoomScale = null,
        lastX = null,
        lastY = null;

    var isInit = false;

    var desktop = true;

    var mdown = false;

    var stage = new createjs.Stage(canvas);

    $scope.sex = "man";

    var sexShapes = {
        "man": "Am7LFQhFhrgqh9QglhtAAhDQgWgNgfgtQgigwgUg0Qg4iLBUgoQgHgIgGgjQgHghABgQIgXACQgNACgBAFQgBgQAEhAQAFhGAGgRQgTAFgQAbQgIAOgEAMQgIgbAFgrQALhWBHhOQgWgCgYAHIgTAHQAPgXAXgdQAvg7AugfQgSgGgZAHIgXAIQAAgTAYgeQAwg9B3g6QgRgGgeAJIgbAKIAJgNQAMgOASgOQA6gsBdgQQgJgQgUgMIgRgJIBKgFQBRgDAkAEQgCgNgrgYIgsgWIBMAGQBXAKAzAWQAAgigcg2IBAAIQBPARBTAuQgGgTgqggIgogcIAZgBQAhABAiAJQBsAeBTBnQAIghgDgiIApAeQAtAqAVA+QAogHAwAJQA8ANAhAjQgPAAgWACIgTACIAjASQAkAVAEAPQgHACgUACIgUABIAaAMQAfASAcAYQBbBOAYB2Ig3ghIAeA3QAgA/ADApQgIgHgLgGIgJgEIAKBGQAJBKgFAXIgvgQIAIAGQAHAJADAMQAGAng0A3QBEA8goB2QgSA2gqA4QgcAmgXATQAABugsB6QgsB7hOBnQi2DwjzAAQkEAAi5kig",
        // "man": "AmeMDQi0jYhTlLIgBAAQgzAEgrhEQgrhGgJhjQgKhvAPhBQAQhLAxgDQAPgBAQAFQAXlxDQjCQC+iwEugBQEvABC+CwQDQDCAXFxQAQgFAPABQAxADAQBLQAPBBgKBvQgJBjgrBGQgrBEgzgEIgCAAQhSFLi0DYQi/DkjgAAQjfAAi/jkg",
        "woman": "An0R1QivguhKi+QAJBJARAoQAIAVAHAFQgfgDgggZQhAgxgEhrQgLACgOgSQgPgTgJgiQgXhcApiMQANguA7h7QA1htAgiMQAQhEAOiKQATixAKhGQAylECTjoQCbjzDYgkQBKgNBAAPQA3AMAKARQBKgSBYAsQBWAqBSBaQC0DEA5EPQAqDKARDOQARDXASBfQALA5AqCKQApCHAOBKQAtD5iHCSQAghKAAgpQgFg0gBgwIgMBJQgHAtgIAaQgYBNhBAaQgjAkg/AFQg7AEgpgXQgzAQhBgWQhTgdgZgBQAHgFA0gOQAugOAHgLQAFgJhMgFQhUgFgLgWQAigWAigrQA2hEAVhXQgwBhhGBAQhuBkiRAAQiKAAhzh5Qg1g4grhPQAEAMAIAmQAJAlAMAbQAmBRBXAZQgJAXgkAQQghAQgagCQANAGAkAUQAbAPAFAAQgCAOhKAPQhFAOgegDQAYAQAPATQAIAJACAGQgdAGggAAQgvAAg0gNg"
    }


    var shape = new createjs.Shape();
    shape.graphics.f("#000000").s().p(sexShapes[$scope.sex]);


    shape.regX = -centerX;
    shape.regY = -centerY;


    // 贴图
    var bitmap = new createjs.Bitmap(imgBaseData);
    var bitmapBounds = null;

    bitmap.mask = shape;

    stage.addChild(bitmap);

    stage.update();

    createjs.Touch.enable(stage);
    stage.enableMouseOver();
    createjs.Ticker.setFPS(30);
    ++ss;
    var sl = ss;
    var cc = 0;


    createjs.Ticker.addEventListener('tick', function() {
        if (sl != ss) {
            return;
        }
        // 初始化
        if (!isInit) {
            if (bitmap) {

                bitmapBounds = bitmap.getTransformedBounds();
                if (sl == 1) {
                    var scaleRatio = null;
                    // 计算画布比例
                    if (canvas.clientWidth > canvas.clientHeight) {
                        scaleRatio = canvas.clientWidth / bitmapBounds.width;
                    } else {
                        scaleRatio = canvas.clientHeight / bitmapBounds.height;
                    }

                    scale.x = scaleRatio;
                    scale.y = scaleRatio;
                }

                isInit = true;
            }
        }
        // console.log("sssssss: " + sl);
        if (cc == 0) {
            console.log("00000");
            bitmap.setTransform(position.x + 10000, position.y + 10000, scale.x, scale.y, rotation);
            ++cc;
            stage.update();
        } else if (cc > 15) {
            if (isInit) {
                bitmap.setTransform(position.x, position.y, scale.x, scale.y, rotation);
                bitmap.regX = bitmapBounds.width / 2;
                bitmap.regY = bitmapBounds.height / 2;

                if (rotateDirection) {
                    if (rotateDirection == 'left') {
                        rotation--;
                    } else if (rotateDirection == 'right') {
                        rotation++;
                    }
                }

                stage.update();
            }

        } else {
            ++cc;
            console.log(cc);
        }

        // bitmap.setTransform(position.x, position.y, scale.x, scale.y, rotation);

        // bitmap.regX = bitmapBounds.width / 2;
        // bitmap.regY = bitmapBounds.height / 2;

        // if (rotateDirection) {
        //     if (rotateDirection == 'left') {
        //         rotation--;
        //     } else if (rotateDirection == 'right') {
        //         rotation++;
        //     }
        // }

        // stage.update();
    });

    setEventListeners();

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
            currentWidth = (bitmapBounds.width * scale.x),
            currentHeight = (bitmapBounds.height * scale.y),
            deltaWidth = (bitmapBounds.width * deltaScale),
            deltaHeight = (bitmapBounds.height * deltaScale);

        var canvasmiddleX = canvas.width / 2,
            canvasmiddleY = canvas.height / 2,
            xonmap = (-position.x) + canvasmiddleX,
            yonmap = (-position.y) + canvasmiddleY,
            coefX = -xonmap / (currentWidth),
            coefY = -yonmap / (currentHeight),
            newPosX = position.x + deltaWidth * coefX,
            newPosY = position.y + deltaHeight * coefY;

        // var newWidth = currentWidth + deltaWidth,
        //     newHeight = currentHeight + deltaHeight;

        // if (newWidth < canvas.clientWidth) return;
        // if (newPosX > 0)
        //     newPosX = 0;
        // if (newPosX + newWidth < canvas.clientWidth)
        //     newPosX = canvas.clientWidth - newWidth;

        // if (newHeight < canvas.clientHeight) return;
        // if (newPosY > 0)
        //     newPosY = 0;
        // if (newPosY + newHeight < canvas.clientHeight)
        //     newPosY = canvas.clientHeight - newHeight;

        scale.x = newScale;
        scale.y = newScale;
        position.x = newPosX;
        position.y = newPosY;
    }

    function doMove(x, y) {

        if (lastX && lastY) {
            var deltaX = x - lastX,
                deltaY = y - lastY,
                currentWidth = (bitmapBounds.width * scale.x),
                currentHeight = (bitmapBounds.height * scale.y);

            position.x += deltaX;
            position.y += deltaY;

            // if (position.x > canvas.clientWidth - 50) {
            //     position.x = 0;
            // } else if (position.x + currentWidth < canvas.clientWidth) {
            //     position.x = canvas.clientWidth - currentWidth;
            // }

            // if (position.y > canvas.clientHeight - 50) {
            //     position.y = 0;
            // } else if (position.y + currentHeight < canvas.clientHeight) {
            //     position.y = canvas.clientHeight - currentHeight;
            // }

        }

        lastX = x;
        lastY = y;
    }

    function setEventListeners() {
        canvas.addEventListener('touchstart', function(e) {
            lastX = null;
            lastY = null;
            lastZoomScale = null;
            lastRotation = null;
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

        var $rotateLeft = document.getElementById('rotate-left'),
            $rotateRight = document.getElementById('rotate-right');

        $rotateLeft.addEventListener('touchstart', function(e) {
            e.preventDefault();
        });
        $rotateLeft.addEventListener('touchend', function(e) {
            rotateDirection = null;
        });
        $rotateRight.addEventListener('touchstart', function(e) {
            e.preventDefault();
        });
        $rotateRight.addEventListener('touchend', function(e) {
            rotateDirection = null;
        });

    }

    $scope.rotate = function(direction) {
        if (!direction) return;

        rotateDirection = direction;
    }
    $scope.rotate90 = function(direction) {
        if (!direction) return;

        if (direction == 'left') {
            rotation -= 90;
        } else if (direction == 'right') {
            rotation += 90;
        }
    }


    // 切换头像
    // 
    $scope.changeSex = function(sex) {
        $scope.sex = sex;
        shape.graphics.f("#000000").s().p(sexShapes[$scope.sex]);
    }

    $scope.gotoNext = function() {
        imgData = canvas.toDataURL();

        $state.go('build');

    }
})

// 文字表情模块
.controller('BuildTextCtrl', function($scope, $ionicLoading, $state, uploadGif, loadTpl) {
    $scope.selectEmoji = false;
    $scope.selectFont = false;

    $scope.rotate = 0;
    $scope.showSuccess = true;
    $scope.isLabel = false;
    $scope.isText = false;

    /*这是添加文本的获取input的值*/
    $scope.Text_input = '';
    /*图片旋转*/
    var current = 0;


    var canvas = document.getElementById('build-c');
    // ctx = canvas.getContext('2d');

    canvas.width = parseInt(window.getComputedStyle(canvas).width);
    canvas.height = parseInt(window.getComputedStyle(canvas).height);

    var stage = new createjs.Stage(canvas);

    imgBaseData = json_val.imgPath[0];
    // window.localStorage.getItem('pic')

    var bitmap = new createjs.Bitmap(imgBaseData),
        scale = canvas.height / bitmap.getBounds().height,
        width = Math.round(bitmap.getBounds().width * scale),
        margin = canvas.width - width,
        x = margin > 0 ? margin / 2 : 0;
    canvas.width = width;
    canvas.style.width = width + 'px'

    bitmap.scaleX = bitmap.scaleY = canvas.height / bitmap.getBounds().height;

    createjs.Ticker.addEventListener("tick", handleTicker);

    function handleTicker() {
        stage.update();
    }

    // bitmap.x = x;

    stage.addChild(bitmap);

    // stage.update();

    $scope.currType = 'Emoji表情';
    $scope.types = [{
            text: 'Emoji表情',
            handle: 'emoji'
        }, {
            text: '添加标签',
            handle: 'addLabel'
        }, {
            text: '添加文本',
            handle: 'addText'
        },
        //  {
        //     text: '背景虚化',
        //     handle: 'addGlass'
        // },
        {
            text: '旋转',
            handle: 'rotate'
        }
    ];
    $scope.emoji = [];
    $scope.obj = {
        emojiContainer: [],
        currentEmoji: '',
        init: function() {
            var self = this;
            this.emoji();
            this.fonticon();

            stage.addEventListener('click', function(e) {
                self.emojiContainer.forEach(item => {
                    stage.removeChild(item.rect);
                    stage.removeChild(item.closeIcon);
                    stage.removeChild(item.scaleIcon);
                    item.createRect = false;
                })
            }, false);

            window.addEventListener('keyup', function(e) {
                if (e.keyCode == 187 || e.keyCode == 61) { //+
                    doZoom(5);
                } else if (e.keyCode == 189) { //-
                    doZoom(-5);
                }
            });



        },
        /**
         * 初始化所有emoji表情
         * 
         */
        emoji: function() {
            $scope.emoji = [];
            for (var i = 1; i < 31; i++) {
                $scope.emoji.push('img/emoji/emoji' + i + '.png');
            }
        },
        /**
         * 添加emoji表情图
         * @param {string} value 图片路径
         */
        addEmoji: function(value) {
            // var bitmap1 = new createjs.Bitmap(location.href.split('#')[0] + value);
            var bitmap1 = new createjs.Bitmap(location.href.split('index.html')[0] + value);
            bitmap1.scaleX = bitmap1.scaleY = .05;
            bitmap1.x = canvas.width / 2 - (bitmap1.getTransformedBounds().width * .3 / 2)
            bitmap1.y = canvas.height / 2 - (bitmap1.getTransformedBounds().height * .3 / 2)
            this.emojiContainer.push(bitmap1);
            bitmap1.index = this.emojiContainer.length - 1;
            bitmap1.scale = .05;
            stage.addChild(bitmap1);
            // stage.update();
            this.move(bitmap1).click(bitmap1);
            // this.emojiContainer.addChild(bitmap1);
        },
        /**
         * 拖动图片
         * @param  {object} obj 图片对象
         *
         */
        move: function(obj) {
            // console.log(obj);
            (function() {
                var oldX;
                var oldY;
                createjs.Touch.enable(stage, true, false);
                obj.addEventListener("mousedown", function(e) {
                    oldX = e.stageX;
                    oldY = e.stageY;
                });
                obj.addEventListener("pressmove", dragmove);

                function dragmove(e) {
                    e.target.x += e.stageX - oldX;
                    e.target.y += e.stageY - oldY;
                    if (obj.rect) {
                        obj.rect.x += e.stageX - oldX;
                        obj.rect.y += e.stageY - oldY;
                        obj.closeIcon.x += e.stageX - oldX;
                        obj.closeIcon.y += e.stageY - oldY;
                        obj.scaleIcon.x += e.stageX - oldX;
                        obj.scaleIcon.y += e.stageY - oldY;
                    }
                    oldX = e.stageX;
                    oldY = e.stageY;

                    stage.update();
                }
            }(obj));
            return this;
        },
        /**
         * 监听点击事件
         * @param  {object} obj 被操作的对象
         *
         */
        click: function(obj) {
            var self = this;
            obj.addEventListener('click', function(e) {
                e.stopPropagation();
                self.emojiContainer.forEach(item => {
                    stage.removeChild(item.rect);
                    stage.removeChild(item.closeIcon);
                    stage.removeChild(item.scaleIcon);
                    item.createRect = false;
                });
                self.currentEmoji = obj;
                if (!obj.createRect) {
                    var bounds = obj.getTransformedBounds();
                    var shape = new createjs.Shape(),
                        /*bitmap1 = new createjs.Bitmap(location.href.split('#')[0] + 'img/close_icon.png'),
                            bitmap2 = new createjs.Bitmap(location.href.split('#')[0] + 'img/scale_icon.png'); */
                        bitmap1 = new createjs.Bitmap(location.href.split('index.html')[0] + 'img/close_icon.png'),
                        bitmap2 = new createjs.Bitmap(location.href.split('index.html')[0] + 'img/scale_icon.png');
                    shape.graphics.s('#ff927c').drawRect(bounds.x - 5, bounds.y - 5, bounds.width + 10, bounds.height + 10);
                    stage.addChild(shape);
                    // stage.update();
                    obj.createRect = true;
                    obj.rect = shape;

                    bitmap1.scaleX = bitmap1.scaleY = .4;
                    bitmap2.scaleX = bitmap2.scaleY = .5;
                    bitmap1.x = bounds.x - 10;
                    bitmap1.y = bounds.y - 10;
                    bitmap2.x = bounds.x + bounds.width - 4;
                    bitmap2.y = bounds.y + bounds.height - 4;
                    obj.closeIcon = bitmap1;
                    obj.scaleIcon = bitmap2;
                    stage.addChild(bitmap1);
                    stage.addChild(bitmap2);
                    bitmap1.addEventListener('click', function(e) {
                        var obj1 = self.emojiContainer[obj.index];
                        stage.removeChild(obj);
                        stage.removeChild(obj1.rect);
                        stage.removeChild(obj1.closeIcon);
                        stage.removeChild(obj1.scaleIcon);
                    }, false);
                    var oldX, oldY;
                    bitmap2.addEventListener("mousedown", function(e) {
                        oldX = e.stageX;
                        oldY = e.stageY;
                    });
                    bitmap2.addEventListener("pressmove", function(e) {
                        self.doZoom('emoji', obj, e.stageX - oldX, e.stageY - oldY);
                        oldX = e.stageX;
                        oldY = e.stageY;
                    });
                }
            }, false);
            return this;
        },
        remove_emoji: function(type) {

        },
        /**
         * 缩放动作
         * @param  {number} zoom 缩放比例
         *
         */
        doZoom: function(type, obj, scaleX, scaleY) {
            if (type === 'emoji') {
                obj.scaleX += (scaleX / 1000);
                obj.scaleY += (scaleY / 1000);
                var bounds = obj.getTransformedBounds(),
                    closeIcon = obj.closeIcon;
                obj.scaleIcon.x = bounds.x + bounds.width - 4;
                obj.scaleIcon.y = bounds.y + bounds.height - 4;
                stage.removeChild(obj.rect);
                stage.removeChild(obj.closeIcon);
                var shape = new createjs.Shape();
                shape.graphics.s('#ff927c').drawRect(bounds.x - 5, bounds.y - 5, bounds.width + 10, bounds.height + 10);
                stage.addChild(shape);
                stage.addChild(closeIcon);
                obj.rect = shape;
            }
        },
        /**
         * 旋转背景图
         */

        rotate: function() {
            current = (current + 90) % 360;
            document.getElementById('has-header').style.transform = 'rotate(' + current + 'deg)';
        },
        addLabel: function() {
            $scope.isLabel = true;
            var $input = document.querySelectorAll('.label input')[0],
                $label = document.querySelectorAll('.label label')[0];
            setTimeout(function() {
                $input.focus();
            }, 0);

        },
        addGlass: function() {


        },

        /**
                   以下是添加文本和文本标签
                   初始化所有字体按钮
                 * 
                 */
        fonticon: function() {

            $scope.fonticon = [];
            for (var i = 1; i <= 8; i++) {
                $scope.fonticon.push('img/font/font_icon' + i + '.png');
            }
            // console.log($scope.fonticon)

            /*初始化文本编辑框*/
            /*初始化colorpicker*/
            var _slider = document.getElementById("you"),
                srs_bubble = document.querySelector('.srs-bubble'),
                arr = ["ccff33", "#ccff33", "#66cc33", "#009900", "#00cc99", "#00f4cf", "#00b3ef", "#087ff0", "#037be9", "#003abc", "#00248e", "#484fff", "#9b55ff", "#d27fff", "#ff9cff", "#fa7092", "#e83f54", "#ba0500", "#f13c33", "#ff6e3f", "#ffb12e", "#fbff2f", "#fffca1", "#5d5e94", "#989a99", "#3b3d3c", "#000100", "#feffff"],
                width = parseInt(window.getComputedStyle(_slider, null).width);
            _slider.addEventListener("input", function() {
                var node = document.getElementById("viewColor");
                $scope.isText_color = node.style.backgroundColor = arr[_slider.value];
                colorfontSet($scope.isText_color, null);
            });
            var startX = 0,
                min = 14,
                max = width;
            _slider.addEventListener('touchstart', function(e) {
                // console.log(e.touches[0].clientX)
                startX = e.touches[0].clientX;
                srs_bubble.style.left = (startX - 15) + 'px';
            }, false)
            _slider.addEventListener('touchmove', function(e) {
                e.stopPropagation();
                // console.log(e.touches[0].clientX)
                var offset = (startX - 15 + (e.touches[0].clientX - startX));
                if (offset > min && offset < max) {
                    srs_bubble.style.left = offset + 'px';
                }
            }, false)
            _slider.addEventListener('touchend', function(e) {
                // console.log(e.changedTouches[0].clientX)
            }, false)

        },

        // 添加文本
        addText: function() {
            $scope.isText = true;
            var $input = document.querySelectorAll('.text input')[0],
                $label = document.querySelectorAll('.text label')[0];
            setTimeout(function() {
                $input.focus();
            }, 0);
        },
        change: function(val) {

            // alert(val.split('/')[2]);
            var fontVal = "";
            var n = val.split('/')[2]
            switch (n) {
                case "font_icon1.png":
                    fontVal = "DFPSHAONVW5";
                    break;
                case "font_icon2.png":
                    fontVal = "FZMWFONT_0";
                    break;
                case "font_icon3.png":
                    fontVal = "FZKTH";
                    break;
                case "font_icon4.png":
                    fontVal = "HKWWT";
                    break;
                case "font_icon5.png":
                    fontVal = "MNJCQ";
                    break;
                case "font_icon6.png":
                    fontVal = "MNJKT";
                    break;
                case "font_icon7.png":
                    fontVal = "SSZHJT";
                    break;
                case "font_icon8.png":
                    fontVal = "ZZGF";
                    break;
            }
            // arr = ["ccff33", "#ccff33", "#66cc33", "#009900", "#00cc99", "#00f4cf",],


            colorfontSet(null, fontVal);

        }
    }
    $scope.obj.init();

    $scope.labelClick = function() {

        /**
         * 标签是由三段组成，头尾是png图片，中部是canvas矩形渲染
         */

        var $input = document.querySelectorAll('.label input')[0];

        $scope.isLabel = false;
        var canvasView = new createjs.Container(); //容器

        //绘制文字
        var text = new createjs.Text($input.value, '15px "Microsoft Yahei",Arial', '#fff');
        text.y = 16;
        text.x = 60;

        /*标签头尾*/
        var img_group = {
            "img_1": 'img/label_head.png',
            "img_2": 'img/label_tail.png',
            "img_b": 'img/labelbb.png',
        }
        if (!$input.value) {
            console.log("fff")
            var rect_w = 16
        } else {
            console.log("ttt")
            bounds = text.getBounds();
            var rect_w = bounds.width; /*标签长度*/
        }
        /*绘制标签中部的长度*/
        var bitmap_0 = new createjs.Bitmap(img_group.img_1);
        var rect = new createjs.Shape();
        rect.graphics.beginFill("rgba(0,0,0,.7)").drawRect(62, 0, rect_w, 55);
        var bitmap_1 = new createjs.Bitmap(img_group.img_2);
        bitmap_1.x = rect_w + 62;
        var bitmap_b = new createjs.Bitmap(img_group.img_b);
        bitmap_b.scaleX = rect_w / 6;
        bitmap_b.x = 62;

        canvasView.x = canvas.width / 2;
        canvasView.y = canvas.height / 2;
        canvasView.scaleX = canvasView.scaleY = .6;
        canvasView.addChild(bitmap_0, bitmap_1, bitmap_b, text);
        stage.addChild(canvasView);
        var label_direction = "left"

        canvasView.on('click', function() {
            if (label_direction == 'left') {
                text.y = 40;
                text.x = rect_w + 60;
                text.rotation = 180;
                // canvasView.regX = 0;
                canvasView.regY = 55;
                canvasView.rotation = 180;
                label_direction = "right";

            } else {
                text.y = 16;
                text.x = 60;
                text.rotation = 360;
                // canvasView.regX = 0;
                canvasView.regY = 0;
                canvasView.rotation = 360;
                label_direction = "left";
            }

        });

        label_move(canvasView);

    }

    function label_direction() {
        console.log(cyc);
        text.y = 40;
        text.x = rect_w + 60;
        text.rotation = 180;
        // canvasView.regX = 0;
        canvasView.regY = 55;
        canvasView.rotation = 180;
    }
    //标签拖拽
    function label_move(obj) {

        (function() {
            var oldX;
            var oldY;
            createjs.Touch.enable(stage, true, false);
            obj.addEventListener("mousedown", function(e) {
                oldX = e.stageX;
                oldY = e.stageY;
            });
            obj.addEventListener("pressmove", dragmove);
            function dragmove(e) {
                obj.x += e.stageX - oldX;
                obj.y += e.stageY - oldY;
                oldX = e.stageX;
                oldY = e.stageY;
            }
        }(obj));
        return this;
    }

    // 输入文本点击确认
    /**/
    $scope.textClick = function() {
        console.log("点击确定");
        $scope.isText = false;
        $scope.selectFont = !$scope.selectFont;
        $scope.Text_input = document.querySelectorAll('.text input')[0];
        var textView = new createjs.Container(); //容器
        $scope.Text_input.mbm = new createjs.Text($scope.Text_input.value, '15px "微软雅黑"', "#FFF");
        //绘制文字
        $scope.Text_input.mbm.y = 16;
        $scope.Text_input.mbm.x = 60;
        textView.x = canvas.width / 2;
        textView.y = canvas.height / 2;
        textView.scaleX = textView.scaleY = 1;
        textView.addChild($scope.Text_input.mbm);

        /*调用编辑*/
        $scope.obj.emojiContainer.push(textView);
        textView.index = $scope.obj.emojiContainer.length - 1;
        textView.on("click", function() {
            $scope.obj.click(textView);
        });
        stage.addChild(textView);
        label_move(textView);

    }

    

    // 修改字体&颜色
    var colorfontSet = (colorVal, fontVal) => {
        // console.log("gaibian");
        // console.log(colorVal, fontVal);
        if (!colorVal) {
            // console.log("no color")
            $scope.Text_input.mbm.font = "15px " + fontVal;
        }
        if (!fontVal) {
            // console.log("no font")
            $scope.Text_input.mbm.color = colorVal
        }
        $scope.Text_input.mbm.text = $scope.Text_input.value;
    }

    /**
                以上是添加文本和文本标签
             * 
             */












    // 切换类型
    //
    $scope.changeType = function(type) {

        $scope.currType = type;


        if (type === 'emoji') {
            $scope.selectEmoji = !$scope.selectEmoji;
        }
        // if (type === 'addText') {
        //     $scope.selectFont = !$scope.selectFont;
        //     $scope.isText = !$scope.isText;
        // }
        $scope.obj[type]();
    }

    $scope.changeTemp = function(type) {
        $scope.currType = type;
        obj[type]();
    }

    $scope.build = function() {
        console.log(1)
    }
})

// 第三步
//
.controller('BuildCtrl', function($scope, $ionicLoading, $state, uploadGif, loadTpl) {
    $scope.currType = '贺年';

    $scope.types = ['贺年', '搞怪', '无节操'];

    $scope.templates = [{
        name: 'a1',
        type: '无节操'
    }, {
        name: 'a2',
        type: '无节操'
    }, {
        name: 'a3',
        type: '无节操'
    }, {
        name: 'a4',
        type: '无节操'
    }, {
        name: 'a5',
        type: '无节操'
    }, {
        name: 'a6',
        type: '无节操'
    }, {
        name: 'a7',
        type: '无节操'
    }, {
        name: 'a8',
        type: '无节操'
    }, {
        name: 'b1',
        type: '搞怪'
    }, {
        name: 'b2',
        type: '搞怪'
    }, {
        name: 'b3',
        type: '搞怪'
    }, {
        name: 'b4',
        type: '搞怪'
    }, {
        name: 'b5',
        type: '搞怪'
    }, {
        name: 'b6',
        type: '搞怪'
    }, {
        name: 'b7',
        type: '搞怪'
    }, {
        name: 'c1',
        type: '贺年'
    }, {
        name: 'c2',
        type: '贺年'
    }, {
        name: 'c3',
        type: '贺年'
    }, {
        name: 'c4',
        type: '贺年'
    }, {
        name: 'c5',
        type: '贺年'
    }, {
        name: 'c6',
        type: '贺年'
    }, {
        name: 'c7',
        type: '贺年'
    }, {
        name: 'c8',
        type: '贺年'
    }];


    $ionicLoading.show({
        template: '初始化中..'
    });
    // uploadGif.query({
    //     png_stream: imgData.replace('data:image/png;base64,', '')
    // }, function(back) {
    //     if (back) {
    //         imgData = back.name;
    //         $ionicLoading.show({
    //             template: '正在加载模板..'
    //         });

    //     }
    // });



    var canvas = document.getElementById('build-c'),
        ctx = canvas.getContext('2d');

    winW = window.innerWidth;
    winH = window.innerHeight;

    canvas.width = 200;
    canvas.height = 200;

    var centerX = canvas.width / 2,
        centerY = canvas.height / 2;

    $scope.tplName = $scope.templates[5].name;

    $scope.json = '';

    $scope.loadTpl = function() {

        loadTpl.query({
            tplName: $scope.tplName
        }, function(back) {
            $scope.json = back[0];
            // $scope.json.srcs.push({
            //     src: imgData,
            //     id: 'head'
            // });
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

        $ionicLoading.hide();
    }

    // 切换类型
    //
    $scope.changeType = function(type) {
        $scope.currType = type;
    }

    // 切换模板
    //
    $scope.changeTemp = function(tpl) {
        $ionicLoading.show({
            template: '正在加载模板..'
        });
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
                if (i == 0) {
                    linjs.saveimg(canvas.toDataURL());
                }
                if (i == $scope.json.count) {
                    encoder.finish();
                    var uri = encode64(encoder.stream().getData());
                    // document.getElementById('image').src = 'data:image/gif;base64,' + uri;
                    linjs.goimg(uri);
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
    $scope.gifSrc = $stateParams.src;
    $scope.isShared = false;
    if (!imgData) {
        $scope.isShared = true;
    }
    setTimeout(function() {
        if (wx) {
            var link = 'http://epigif.duapp.com/app/'
            wx.onMenuShareAppMessage({
                title: '拍趣，制作你专属的表情包', // 分享标题
                desc: '我在拍趣制作了专属动态贴图，，你还在等什么，赶紧猛戳以下链接自己动手做一个吧~', // 分享描述
                link: location.href, // 分享链接
                imgUrl: link + $stateParams.src, // 分享图标
                success: function() {
                    alert('分享成功');
                },
                cancel: function() {}
            });

            wx.onMenuShareTimeline({
                title: '我在拍趣制作了专属动态贴图，你还在等什么，赶紧猛戳', // 分享标题
                link: location.href, // 分享链接
                imgUrl: link + $stateParams.src, // 分享图标
                success: function() {
                    alert('分享成功');
                },
                cancel: function() {

                }
            });
        }
    }, 300)


});
