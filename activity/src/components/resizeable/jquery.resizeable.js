import jQuery from 'jquery'

import './jquery.resizeable.css'

(function($) {
    $.resizeable = function(object, customOptions) {
         //默认插件设置
        var defaultOptions = {
            allowMove : true, //是否允许移动
            allowResize: true, //是否允许调整大小
            aspectRatio: false, //指定选取区域的纵横比
            displaySizeHint: false, //尺寸提示是否可见
            minSelect: [0,0], //最小选取范围
            minSize: [0,0], //指定选取区域最小大小
            maxSize: [0,0], //指定选取区域最大大小
            selectionPosition: [0,0], //区域位置
            selectionWidth: 0, //选取区域宽度
            selectionHeight: 0, //选取区域高度
            screenEl: $('.app-view'),
            onChange: function(){
            	
            }, //当改变时调用函数
            onSelect: function(){} //当选取时调用函数
        }
      
        var that=this;
        //设options为默认设置
        var options = defaultOptions;
        //并和customOptions合并
        setOptions(customOptions);
        //初始化元素
        var $el = $(object);
        options.selectionWidth = $el.width();
        options.selectionHeight = $el.height();
        options.selectionPosition[0] = getElementOffset($el)[0] - getElementOffset(options.screenEl)[0];
        options.selectionPosition[1] = getElementOffset($el)[1] - getElementOffset(options.screenEl)[1];
        options.aspectRatio =options.aspectRatio ?$el.width() / $el.height():false;

        //初始化固定器
        var $holder = $('<div class="resizeable-holder hideall" />');

        //固定器包裹住图片层
        $el.wrap($holder).css({position:'static', width: '100%', height: '100%'});

        var $selection = $el.parent();
        
        var $trigger = $('<div class="resizeable-trigger" />').css({
        	'z-index': 3,
        	'position': 'absolute',
        	'top': 0,
        	'left': 0,
        	'right': 0,
        	'bottom': 0,
        }).insertAfter($el)
		
		if(options.allowResize){
        //初始化一个西北位大小调整点并放在选取层上面
        var $nwResizeHandler = $('<div class="resizeable-resize-handler resizeable-nw-resize-handler" data-resize="nw" />')
            .css({
                position: 'absolute'
            })
            .insertAfter($el);

        //初始化一个北位大小调整点并放在选取层上面
        var $nResizeHandler = $('<div class="resizeable-resize-handler resizeable-n-resize-handler" data-resize="n" />')
            .css({
                position: 'absolute'
            })
            .insertAfter($el);

        //初始化一个东北位大小调整点并放在选取层上面
        var $neResizeHandler = $('<div class="resizeable-resize-handler resizeable-ne-resize-handler" data-resize="ne" />')
            .css({
                position: 'absolute'
            })
            .insertAfter($el);

        //初始化一个东位大小调整点并放在选取层上面
        var $eResizeHandler = $('<div class="resizeable-resize-handler resizeable-e-resize-handler" data-resize="e" />')
            .css({
                position: 'absolute'
            })
            .insertAfter($el);

        //初始化一个东南位大小调整点并放在选取层上面
        var $seResizeHandler = $('<div class="resizeable-resize-handler resizeable-se-resize-handler" data-resize="se" />')
            .css({
                position: 'absolute'
            })
            .insertAfter($el);

        //初始化一个南位大小调整点并放在选取层上面
        var $sResizeHandler = $('<div class="resizeable-resize-handler resizeable-s-resize-handler" data-resize="s" />')
            .css({
                position: 'absolute'
            })
            .insertAfter($el);

        //初始化一个西南位大小调整点并放在选取层上面
        var $swResizeHandler = $('<div class="resizeable-resize-handler resizeable-sw-resize-handler" data-resize="sw" />')
            .css({
                position: 'absolute'
            })
            .insertAfter($el);

        //初始化一个西位大小调整点并放在选取层上面
        var $wResizeHandler = $('<div class="resizeable-resize-handler resizeable-w-resize-handler" data-resize="w" />')
            .css({
                position: 'absolute'
            })
            .insertAfter($el);
		}
        //初始化全局变量
        var resizeHorizontally = true,
            resizeVertically = true,
            selectionExists, //选取层-是否存在
            selectionOffset = [0,0], //选取层-偏移坐标
            selectionOrigin = [options.selectionPosition[0],options.selectionPosition[1]]; //选取层-原点
        //检查选取尺寸大于最小区域
        //并设置相应的选取是否存在
        if(options.selectionWidth > options.minSelect[0] && options.selectionHeight > options.minSelect[1]){
            selectionExists = true;
        } else {
            selectionExists = false;
        }
        $selection.mouseenter(showResize);
        $selection.mouseleave(hideResize);
        if(options.allowMove){
            //绑定鼠标按下事件把柄到选取层
            $trigger.mousedown(pickSelection);
        }

        if(options.allowResize){
            //绑定鼠标按下事件把柄到调整点
            $el.parent().find('.resizeable-resize-handler').mousedown(pickResizeHandler);
        }

        updateInterface();

        function updateInterface() {
            $selection.css({
                left: options.selectionPosition[0],
                top: options.selectionPosition[1]
            })
            .width(options.selectionWidth)
            .height(options.selectionHeight);
           
        } 

        function pickSelection(event) {
        	
            event.preventDefault();
            event.stopPropagation();
            $(document).mousemove(moveSelection);
            $(document).mouseup(releaseSelection);

            var mousePosition = getMousePosition(event);

            selectionOffset[0] = mousePosition[0] - options.selectionPosition[0];
            selectionOffset[1] = mousePosition[1] - options.selectionPosition[1];

            updateInterface();
        }

        function showResize(event) {
            event.preventDefault();
            event.stopPropagation();

            $selection.removeClass('hideall');
        }

        function hideResize(event) {
            event.preventDefault();
            event.stopPropagation();

            $selection.addClass('hideall');
        }


        function resizeSelection(event) {
            event.preventDefault();
            event.stopPropagation();
            var mousePosition = getMousePosition(event);
            var height = mousePosition[1] - selectionOrigin[1],
                width = mousePosition[0] - selectionOrigin[0];


            if (Math.abs(width) < options.minSize[0]) {
                width = (width >= 0) ? options.minSize[0] : - options.minSize[0];
            }

            if (Math.abs(height) < options.minSize[1]) {
                height = (height >= 0) ? options.minSize[1] : - options.minSize[1];
            }

            // Test if the selection size exceeds the image bounds
            if (selectionOrigin[0] + width < 0 || selectionOrigin[0] + width > options.screenEl.width()) {
                width = - width;
            }

            if (selectionOrigin[1] + height < 0 || selectionOrigin[1] + height > options.screenEl.height()) {
                height = - height;
            }

            if (options.maxSize[0] > options.minSize[0] &&
                options.maxSize[1] > options.minSize[1]) {
                // Test if the selection size is bigger than the maximum size
                if (Math.abs(width) > options.maxSize[0]) {
                    width = (width >= 0) ? options.maxSize[0] : - options.maxSize[0];
                }

                if (Math.abs(height) > options.maxSize[1]) {
                    height = (height >= 0) ? options.maxSize[1] : - options.maxSize[1];
                }
            }

            if (resizeHorizontally) {
                options.selectionWidth = width;
            }

            if (resizeVertically) {
                options.selectionHeight = height;
            }

            if (options.aspectRatio) {

                if ((width > 0 && height > 0) || (width < 0 && height < 0)) {
                    if (resizeHorizontally) {
                        height = Math.round(width / options.aspectRatio);
                    }
                    else {
                        width = Math.round(height * options.aspectRatio);
                    }
                }
                else {
                    if (resizeHorizontally) {
                        height = - Math.round(width / options.aspectRatio);
                    }
                    else {
                        width = - Math.round(height * options.aspectRatio);
                    }
                }
 
                if (selectionOrigin[0] + width > options.screenEl.width()) {
                    width = options.screenEl.width() - selectionOrigin[0];
                    height = (height > 0) ? Math.round(width / options.aspectRatio) : - Math.round(width / options.aspectRatio);
                }

                if (selectionOrigin[1] + height < 0) {
                    height = - selectionOrigin[1];
                    width = (width > 0) ? - Math.round(height * options.aspectRatio) : Math.round(height * options.aspectRatio);
                }

                if (selectionOrigin[1] + height > options.screenEl.height()) {
                    height = options.screenEl.height() - selectionOrigin[1];
                    width = (width > 0) ? Math.round(height * options.aspectRatio) : - Math.round(height * options.aspectRatio);
                }

                // Set the selection size
                options.selectionWidth = width;
                options.selectionHeight = height;
            }

            if (options.selectionWidth < 0) {
                options.selectionWidth = Math.abs(options.selectionWidth);
                options.selectionPosition[0] = selectionOrigin[0] - options.selectionWidth;
            } else {
                options.selectionPosition[0] = selectionOrigin[0];
            }

            if (options.selectionHeight < 0) {
                options.selectionHeight = Math.abs(options.selectionHeight);
                options.selectionPosition[1] = selectionOrigin[1] - options.selectionHeight;
            } else {
                options.selectionPosition[1] = selectionOrigin[1];
            }
            updateInterface();
		    
        };
        function moveSelection(event) {

            event.preventDefault();
            event.stopPropagation();

            var mousePosition = getMousePosition(event);

            if (mousePosition[0] - selectionOffset[0] > 0) {
                if (mousePosition[0] - selectionOffset[0] + options.selectionWidth < options.screenEl.width()) {
                    options.selectionPosition[0] = mousePosition[0] - selectionOffset[0];
                }
                else {
                    options.selectionPosition[0] = options.screenEl.width() - options.selectionWidth;
                }
            }
            else {
                options.selectionPosition[0] = 0;
            }

        
            if (mousePosition[1] - selectionOffset[1] > 0) {
                if (mousePosition[1] - selectionOffset[1] + options.selectionHeight < options.screenEl.height()) {
                    options.selectionPosition[1] = mousePosition[1] - selectionOffset[1];
                }
                else {
                    options.selectionPosition[1] = options.screenEl.height() - options.selectionHeight;
                }
            }
            else {
                options.selectionPosition[1] = 0;
            }

            $selection[0].style.cursor = 'move';
            updateInterface();
        }

        function releaseSelection(event) {
            event.preventDefault();

            event.stopPropagation();

            $(document).unbind('mousemove');

            $(document).unbind('mouseup');

            selectionOrigin[0] = options.selectionPosition[0];
            selectionOrigin[1] = options.selectionPosition[1];

            $selection[0].style.cursor = 'default';
            if(that.vm.config){
            	that.vm.config.t=options.selectionPosition[1];
            	that.vm.config.l=options.selectionPosition[0];
            	that.vm.config.w=options.selectionWidth;
            	that.vm.config.h=options.selectionHeight;	
            }
            var data = { x:options.selectionPosition[0],
            			 y: options.selectionPosition[1],
            			 w:options.selectionWidth,
            			 h:options.selectionHeight
            			}
            if(options.onChange) {
            	options.onChange(data);
            }
        }
        function pickResizeHandler(event) {
        	resizeHorizontally=true;
        	resizeVertically=true;
            event.preventDefault();
            event.stopPropagation();
            switch(event.target.getAttribute('data-resize')) {
                case 'nw' :
                    selectionOrigin[0] += options.selectionWidth;
                    selectionOrigin[1] += options.selectionHeight;
                    options.selectionPosition[0] = selectionOrigin[0] - options.selectionWidth;
                    options.selectionPosition[1] = selectionOrigin[1] - options.selectionHeight;

                    break;
                case 'n' :
                    selectionOrigin[1] += options.selectionHeight;
                    options.selectionPosition[1] = selectionOrigin[1] - options.selectionHeight;

                    resizeHorizontally = false;

                    break;
                case 'ne' :
                    selectionOrigin[1] += options.selectionHeight;
                    options.selectionPosition[1] = selectionOrigin[1] - options.selectionHeight;

                    break;
                case 'w' :
                    selectionOrigin[0] += options.selectionWidth;
                    options.selectionPosition[0] = selectionOrigin[0] - options.selectionWidth;

                    resizeVertically = false;

                    break;
                case 'e' :
                    resizeVertically = false;

                    break;
                case 'sw' :
                    selectionOrigin[0] += options.selectionWidth;
                    options.selectionPosition[0] = selectionOrigin[0] - options.selectionWidth;

                    break;
                case 's' :
                    resizeHorizontally = false;

                    break;
            }

            $(document).mousemove(resizeSelection);
            $(document).mouseup(releaseSelection);

        }

        function setOptions(customOptions){
            options = $.extend(options,customOptions);
        }

        //获取当前元素偏移坐标
        function getElementOffset(object){
            var offset = $(object).offset();

            return [offset.left, offset.top];
        }

        //获取当前鼠标相对于屏幕元素的坐标
        function getMousePosition(event){
            var screenOffset = getElementOffset(options.screenEl);
            var x = event.pageX - screenOffset[0],
                y = event.pageY - screenOffset[1];
            x = (x < 0) ? 0 : (x > options.screenEl.width()) ? options.screenEl.width() : x;
            y = (y < 0) ? 0 : (y > options.screenEl.height()) ? options.screenEl.height() : y;
            return [x,y];
        }
    }

    $.fn.resizeable = function(customOptions){
    	const currentObject = this.el;
     	$.resizeable.call(this,currentObject, customOptions); 
        return this;
    }
})(jQuery)