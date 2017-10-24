var App = getApp();
Page({
    data: {
        products: '',
        params: '',
        bannerList: [],
        bannerOffset: 0,
        bannerCurrent: '0',
        bannerTimer: '',
        current: 'ly',
        tabWidth: '',
        lyList: [],
        ywList: [],
        jcList: [],
        showly: false,
        showyw: false,
        showjc: false,
        showList: [],
        timer: '',
        themeColor: '',
        showAgencyCode: false,
        share: '',
        isLoading: true,
        loadText: '',
        tips: false,
        tipsText: '',
        tempParams: {},
        firstLoad: true
    },
    /**
     * [监听页面加载，初始化数据以及获取渠道信息做相应处理]
     * @param  {object} e url参数
     *
     */
    onLoad: function(e) {
        /** 设置url参数和分享参数 **/
        this.setData({
            params: e,
            share: App.getShare('main', e),
            isLoading: false,
            loadText: '数据加载中',
            tempParams: {}
        })

        var self = this;
        // 获取渠道信息
        wx.getStorage({
            key: 'agencyUser',
            success: function(res) {
                var now = (new Date()).getTime(),
                    before = res.data.time,
                    times = now - before;
                /** 定制渠道的首次进入时间已超过定义的时间或者默认24小时 **/
                if (!self.data.params.agencyKey && Math.floor(times / 1000 / 60 / 60) >= (res.data.defaultHours || 24)) {
                    self.setData({
                        params: {},
                        share: App.getShare('main', App.getParamsStr({}))
                    })
                } else if (self.data.params.agencyKey) {
                    self.setData({
                        params: {
                            agencyKey: self.data.params.agencyKey
                        }
                    })
                } else if (res.data.path === 'index') { /** 渠道信息为单产品首页 **/
                    wx.redirectTo({
                        url: '../index/index?agencyKey='+res.data.agencyKey
                    })
                    return;
                } else {
                    self.setData({
                        params: {
                            agencyKey: res.data.agencyKey
                        }
                    })
                }
                self.initData(self.data.params);
            },
            fail: function(res) {  
                self.initData(self.data.params);
            },
            complete: function() {
                setTimeout(function(){
                    self.setData({
                        firstLoad: false
                    })
                }, 1000)
            }
        })
    },
    /**
     * [调用发起获取渠道配置文件请求的函数]
     */
    onShow: function() {
        var self = this;
        if (!this.data.firstLoad) {
            self.initData(self.data.params);
        }
    },
    initData: function(e) {
        var self = this;
        /** 根据渠道参数读取渠道配置文件数据 **/
        if (e.agencyKey) {
            wx.request({
                url: App.data.jsPath + 'agencyConfig.js',
                success: function(res) {
                    if (res.statusCode === 200) {
                        var data = res.data[e.agencyKey];

                        var tempParams = App.getParamsObj(data.path);
                        self.setData({
                            tempParams: tempParams
                        })
                        /** 记录渠道信息 **/
                        wx.getStorage({
                            key: 'agencyUser',
                            success: function(obj) {
                                var time = '';
                                /** url渠道参数跟缓存的渠道参数不一致，证明打开新的渠道；渠道参数一致，但没有path值为index，表示缓存的是商城渠道，渠道模式不一致，以上情况都要重新计算首次时间 **/
                                if (e.agencyKey && e.agencyKey != obj.data.agencyKey) {
                                    time = (new Date()).getTime();
                                } else {
                                    time = obj.data.time || (new Date()).getTime();
                                }
                                wx.setStorageSync('agencyUser', {
                                    agencyKey: e.agencyKey,
                                    time: time,
                                    defaultHours: data.defaultHours
                                })
                            },
                            fail: function(obj) {
                                wx.setStorageSync('agencyUser', {
                                    agencyKey: e.agencyKey,
                                    time: (new Date()).getTime(),
                                    defaultHours: data.defaultHours
                                })
                            }
                        });
                        self.getConfig(tempParams);
                    }  
                },
                complete: function(res) {
                    if (res.statusCode != 200) {
                        self.setData({
                            isLoading: true
                        })
                        self.openTip('加载失败，请稍后再试')
                    }
                }
            })
        } else { //渠道参数为空
            self.getConfig(e);
        }
    },
    /**
     * [获取配置文件]
     * @param  {Object} e [实际的url参数--产品代码列表和渠道代码和配置文件名]
     *
     */
    getConfig: function(e) {
        App.getProduct(e, (e, products, isRefresh) => {
            /** 页面刷新 **/
            if (isRefresh) {
                var path = "../main/main" + App.getParamsStr(this.data.params);
                wx.redirectTo({
                    url: path
                })
                return false;
            }
            /** 隐藏正在加载弹窗 **/
            this.setData({
                isLoading: true
            })
            /** 清空旅游险、意外险、家财险产品列表数据 **/
            this.data.lyList.length = this.data.ywList.length = this.data.jcList.length = 0;

            /** 解析参数p，初始化产品线和产品 **/
            if (e && e.p) {
                var productArr = e.p.split(','),
                    json = {};
                for (var i in products.data) {
                    if (productArr.indexOf(i) > -1) {
                        json[i] = products.data[i];
                    }
                }
                products.data = json;
            }
            /** default模式，显示Template字段值为default的产品 **/
            if (!e.p) {
                var json = {};
                for (var i in products.data) {
                    if (products.data[i].Template == 'default') {
                        json[i] = products.data[i];
                    }
                }
                products.data = json;
            }

            var arr = [];
            /** 产品按旅游险－意外险－家财险分类 **/
            for (var i in products.data) {
                if (i === "version") {
                    continue;
                }
                if ((products.data[i].TypeEn + '').indexOf('yw') > -1) {
                    this.data.ywList.push(products.data[i]);
                    if (arr.indexOf('yw') === -1) {
                        arr.push('yw');
                    }
                } else {
                    var type = products.data[i].TypeEn;
                    this.data[type+'List'].push(products.data[i]);
                    if (arr.indexOf(type) === -1) {
                        arr.push(type);
                    }
                }
            }
            /** 按顺序默认显示第一个产品列表数据 **/
            var current = '',
                showly = !!this.data.lyList.length,
                showyw = !!this.data.ywList.length,
                showjc = !!this.data.jcList.length;
            if (showly) {
                current = 'ly';
            } else if (showyw) {
                current = 'yw';
            } else {
                current = 'jc';
            }
            this.setData({
                products: products,
                showList: this.data[current+"List"],
                tabWidth: (100 / arr.length) + '%',
                showly: showly,
                showyw: showyw,
                showjc: showjc,
                current: current,
                bannerList: products.bannerList,
                themeColor: App.getStyle(current)
            });
            this.bannerScroll();
        }, 'main')
    },
    /**
     * [长按显示渠道代码]
     */
    longtap: function(e) {
        this.setData({
            showAgencyCode: true
        })
        setTimeout(() => {
            this.setData({
                showAgencyCode: false
            })
        }, 2000)
    },
    /**
     * [轮播图]
     */
    bannerScroll: function(){
        var num = this.data.bannerList.length;
        clearInterval(this.data.timer);
        this.data.timer = setInterval(() => {
            var offset = this.data.bannerOffset;
            offset -= 100;
            if (offset === (-num * 100)) {
                offset = 0;
            }
            this.setData({
                bannerOffset: offset
            })
        }, 3000);
        this.setData({
            timer: this.data.timer
        })
    },
    /**
     * [切换标签页]
     * @param  {Object} e [按钮自身对象]
     *
     */
    changeTab: function(e) {
        var current = e.currentTarget.dataset.current;
        this.setData({
            current: current,
            showList: this.data[current+"List"],
            themeColor: App.getStyle(current)
        })
    },
    /**
     * [分享]
     */
    onShareAppMessage: function() {
        return {
            title: this.data.share.title,
            path: this.data.share.path
        }
    },
    /**
     * [轮播图和了解详情按钮点击事件]
     * @param  {Object} e [轮播图或者了解详情按钮的实例对象]
     *
     */
    buyDetail: function(e) {
        var productId = e.currentTarget.dataset.code,
            type = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: './../index/index?p=' + productId + '&c=' + (this.data.tempParams.c || this.data.products.defaultAgencyCode) + '&config=' + (this.data.tempParams.config || '') + '&user=' + (this.data.tempParams.user || this.data.products.defaultAgencyUser)
        });
    },
    /**
     * [导航栏－－我的]
     */
    linkOwn: function() {
        wx.navigateTo({
            url: './../orderList/orderList' + App.getParamsStr(this.data.params)
        });
    },
    /**
     * [温馨提示]
     * @param {object} text 弹窗显示的文本
     */
    openTip: function(text) {
        var self = this;
        this.setData({
            tips: true,
            tipsText: text
        })
        setTimeout(function() {
            self.setData({
                tips: false
            })
        }, 3000)
    }
})