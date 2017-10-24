import iScroll from './iscroll.js'
import $ from '../../zepto.js'
window.Miscroll=function Miscroll(options) {
    var options = this.options = $.extend({
        el: null,
        pullUp: false,
        pullUpFun: function () { },
        pullDown: false,
        pullDownFun: function () { },
        contentEL: '.is-content',
        Lazyload: false,
        ScrollMove: null,
        upLoad: false,
        upFun: function () { },
        downFun: function () { },
        bounce: true
    }, options);
    this.upLoad = options.upLoad;
    this.Lazyload = options.Lazyload;
    this.El = options.el;
    this.IspullDown = false;
    this.IspullUp = false;
    this.$El = $(options.el);
    this.myScroll;
    this.bounce = options.bounce;
    this.topFun = true;
    this.upFun = options.upFun;
    this.downFun = options.downFun;
    this.iscrolltoph = 0;
    this.ScrollMove = options.ScrollMove;
    this.pullUp = options.pullUp;
    this.pullDown = options.pullDown;
    this.pullUpFun = options.pullUpFun;
    this.pullDownFun = options.pullDownFun;
    this.$pullDownEl = null;
    this.pullDownOffset = null;
    this.$pullUpEl = null;
    this.pullUpOffset = null;
    this.isFirstLoadUpFun = true;
    this.initialize();
    this.topY = 0;
    this.Ycont = 0;
    this.$content = this.$El.find(options.contentEL)[0];
    this.creat();
    if (this.Lazyload) this.creatLazyload();
}
window.Miscroll.prototype = {
    on: function () {
        return this.$el.on.apply(this.$el, arguments);
    },
    initialize: function () {
        var that = this;
        var Phtml = '';
        if (this.pullDown) {
            Phtml = ' <div class="pullDown "><span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新...</span></div>';
            this.$El.find('.scroller').prepend(Phtml);
            this.$pullDownEl = this.$El.find('.pullDown')[0];
            this.pullDownOffset = $(this.$pullDownEl).height();
        }
        if (this.pullUp) {
            Phtml = '<div class="pullUp"><span class="pullUpIcon"></span><span class="pullUpLabel">上拉刷新...</span></div>';
            if (!this.upLoad) {
                Phtml = '<div class="pullUp" style="height:60px;text-align: center;border-bottom:0px;"><div style="width:100%;float:left;height:58px;"><img style=" margin-top: 15px;" src="img/load.gif"/></div></div>';
            }
            this.$El.find('.scroller').append(Phtml);
            this.$pullUpEl = this.$El.find('.pullUp')[0];
            this.pullUpOffset = $(this.$pullUpEl).height();
        }
    },
    creat: function () {
        var that = this;
        var topset = 0;
        if (that.pullDown) topset = that.pullDownOffset;
        this.myScroll = new iScroll.iScroll(that.El, {
            useTransition: false,
            topOffset: topset,
            hScroll: false,
            bounce: that.bounce,
            onScrolling: $.proxy(function () {
                //执行top方法
                if (this.topY == 0) this.topY = that.myScroll.y;
                if (this.Ycont == 5) {
                    if (that.myScroll.scrollerH > that.myScroll.wrapperH) {
                        var i = this.topY - that.myScroll.y;
                        if (i >= 5 && -that.myScroll.y > 44) {
                            if (this.topFun) {
                                this.upFun();
                                this.topFun = false;
                            }
                        }
                        else if (i <= -5 && this.topY > that.myScroll.maxScrollY) {
                            if (!this.topFun) {
                                this.downFun();
                                this.topFun = true;
                            }
                        }
                    }
                    this.topY = that.myScroll.y;
                    this.Ycont = 0;
                }
                else this.Ycont += 1;
                ///执行免上拉刷现
                if (!this.upLoad && this.isFirstLoadUpFun) {
                    if (that.myScroll.y < (that.myScroll.maxScrollY + 80)) {
                        if (that.pullUp) {
                            this.isFirstLoadUpFun = false;
                            that.pullUpAction();
                            this.isFirstLoadUpFun = true;
                        }
                    }
                    return;
                }
                if (typeof that.ScrollMove == "function") {
                    if (that.iscrolltoph == 0) {
                        that.ScrollMove();
                        that.iscrolltoph = (-that.myScroll.y);
                    } else {
                        var ih = (-that.myScroll.y) - that.iscrolltoph;
                        if (ih > 100 || ih < -100) {
                            that.iscrolltoph = (-that.myScroll.y);
                            that.ScrollMove();
                        }
                    }
                }
            }, this),
            onScrollMove: function () {
                if (that.pullDown) {
                    if (this.y > 5 && !that.$pullDownEl.className.match('flip')) {
                        $(that.$pullDownEl).addClass('flip');
                        that.$pullDownEl.querySelector('.pullDownLabel').innerHTML = '放开刷新...';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && that.$pullDownEl.className.match('flip')) {
                        $(that.$pullDownEl).removeClass('flip');
                        that.$pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                        this.minScrollY = -that.pullDownOffset;
                    }
                }
                if (that.pullUp&&that.upLoad) {
                    if (this.y < (this.maxScrollY - 5) && !that.$pullUpEl.className.match('flip')) {
                        $(that.$pullUpEl).addClass('flip');
                        that.$pullUpEl.querySelector('.pullUpLabel').innerHTML = '放开刷新...';
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && that.$pullUpEl.className.match('flip')) {
                        $(that.$pullUpEl).removeClass('flip');
                        that.$pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉刷新...';
                        this.maxScrollY = that.pullUpOffset;
                    }
                }

            },
            onScrollEnd: function () {
                if (that.pullDown) {
                    if (that.$pullDownEl.className.match('flip')) {
                        $(that.$pullDownEl).removeClass('flip').addClass('loading');
                        that.$pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                        that.pullDownAction();
                    }
                }
                if (that.pullUp) {
                    if (that.$pullUpEl.className.match('flip')) {
                        $(that.$pullUpEl).removeClass('flip').addClass('loading');
                        that.$pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                        that.pullUpAction();
                    }
                }
            }
        });
        setTimeout(function () { that.$El[0].style.left = '0'; }, 800);
        setTimeout($.proxy(function () {
            this.myScroll.refresh();
        }, this), 100);
    },
    onRefresh: function () {
        if (!this.upLoad) {
            return;
        }
        var that = this;
        if (that.pullDown) {
            if (that.$pullDownEl.className.match('loading')) {
                $(that.$pullDownEl).removeClass('loading');
                that.$pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                that.myScroll.refresh();
            }
        }

        if (that.pullUp) {
            if (that.$pullUpEl.className.match('loading')) {
                $(that.$pullUpEl).removeClass('loading');
                that.$pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉刷新...';
                that.myScroll.refresh();
            }
        }
        if (typeof that.ScrollMove == "function") that.ScrollMove();
    },
    setOverData: function () {
        this.pullUp = false;
        this.$pullUpEl.querySelector('.pullUpLabel').innerHTML = '数据已加载完';
    },
    setBeginData: function () {
        this.pullUp = true;
        this.$pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉刷新...';
    },
    pullUpAction: function () {
        if (this.IspullUp) return;
        this.IspullUp = true;
        setTimeout($.proxy(function () {
            this.pullUpFun();
            this.onRefresh();
            this.IspullUp = false;
        }, this), 1000);

    },
    pullDownAction: function () {
        if (this.IspullDown) return;
        this.IspullDown = true;
        setTimeout($.proxy(function () {
            this.pullDownFun();
            this.onRefresh();
            this.IspullDown = false;
        }, this), 1000);
    },
    creatLazyload: function () {
        var that = this;
        that.ScrollMove = function () {
            if (this.resetImg) {
                var imged = that.$El.find(".lazyloaded").removeClass("lazyloaded").addClass("lazyload");
                imged.attr("src", "images/grey.gif");
            }
            var img = that.$El.find(".lazyload");
            for (var i = 0; i < img.length; i++) {
                var obj = img[i];
                var scrolltoph = (-that.myScroll.y) - 100;
                var t = document.documentElement.clientHeight + (-that.myScroll.y) + 100;
                var h = that.getH(obj);
                if (scrolltoph < h && h < t) {
                    setTimeout(that.changeimg(obj), 100);
                }
            }
        }
    },
    //获得对象距离页面顶端的距离
    getH: function (obj) {
        var h = 0;
        while (obj) {
            h += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return h;
    },
    changeimg: function (obj) {
        if (obj.dataset) {
            var src = obj.dataset.src;
        } else {
            var src = obj.getAttribute('data-src');
        }
        $(obj).removeClass("lazyload");
        $(obj).addClass("lazyloaded");
        $(obj).attr("src", src);
    },
    checkContentChanges: function () {
        var oldHeight = this.myScroll.scrollerH;
        if (this.$pullDownEl) oldHeight += this.$pullDownEl.offsetHeight;
        if (this.myScroll.moved || this.myScroll.zoomed || this.myScroll.animating ||
            (this.myScroll.scrollerW == this.myScroll.scroller.offsetWidth * this.myScroll.scale && oldHeight == this.myScroll.scroller.offsetHeight * this.myScroll.scale)) return;
        console.log("重计算高度....");
        this.myScroll.refresh();
    },
    allimglazyload: function () {
        var imged = this.$El.find(".lazyloaded").removeClass("lazyloaded").addClass("lazyload");
        imged.attr("src", "images/grey.gif");
    },
    hidePullUp: function (f, g) {
        var cls = this.$El.find(".pullUp").attr("class");
        if (cls.indexOf("hide") > -1 && !f) {
            this.$El.find(".pullUp").removeClass("hide");
            this.IspullUp = false;
            this.dataNull(false);
            this.dataEnd(false);
        } else if (f) {
            if (cls.indexOf("hide") == -1) {
                this.$El.find(".pullUp").addClass("hide");
                this.IspullUp = true;
            }
            if (g) this.dataNull(true);
            else this.dataEnd(true);
        }
    },
    dataNull: function (f) {
        var Nhtml = '<li style=" height: 50px;text-align: center;border-top: 1px solid #ccc;" class="data_null"> <p>抱歉,未找到数据</p></li>';
        var content = $(this.$content);
        if (content.find(".data_null").length == 0 && f) {
            content.append(Nhtml);
        } else if (content.find(".data_null").length != 0 && !f) {
            content.find(".data_null").remove();
        }
    },
    dataEnd: function (f) {
        var content = $(this.$content);
        var ehtml = '<li class="data_end" style="border:0px;">数据加载完成. </li>';
        if (content.find(".data_end").length == 0 && f) {
            content.append(ehtml);
        } else if (content.find(".data_end").length != 0 && !f) {
            content.find(".data_end").remove();
        }

    }
}