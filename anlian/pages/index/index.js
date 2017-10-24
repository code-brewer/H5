//index.js
//获取应用实例
var App = getApp();
Page({
    data: {
        params: '', //url参数
        product: '', //产品数据集合
        themeColor: '', //产品线色系
        showAgencyCode: false, //长按尾部是否显示渠道代码 true-显示 false-不显示
        share: '',
        isLoading: true,
        loadText: '',
        tips: false,
        tipsText: '',
        tempParams: '', //保存产品计划、渠道代码、配置文件名、用户名等参数
        indexActive: false,  //是否锁定导航栏首页为当前页 true-是 false-否
        tabs: '',
        Character: ''
    },
    onLoad: function(e) {
        this.setData({
            params: e
        })
    },
    onShow: function(){
        var self = this;
        // 特定渠道用户离首次进入页面一天后将恢复default商城模式
        wx.getStorage({
            key: 'agencyUser',
            complete: function(res) {
                /** 若有url参数为渠道信息，证明是单产品渠道模式，锁定导航栏首页为当前页 **/
                if (self.data.params.agencyKey) {
                    self.setData({
                        indexActive: true
                    })
                } else {
                    self.setData({
                        indexActive: false
                    })
                }
                self.initData(self.data.params, res.data);
            }
        })
    },
    /**
     * [初始化数据]
     * @param  {Object} e [实际的url参数--产品代码列表和渠道代码和配置文件名]
     *
     */
    initData: function(e, storage) {
        var self = this;
        this.setData({
            isLoading: false,
            loadText: '数据加载中'
        })
        if (e.agencyKey) {
            wx.request({
                url: App.data.jsPath + 'agencyConfig.js',
                success: function(res) {
                    if (res.statusCode === 200) {
                        var data = res.data[e.agencyKey];
                        var tempParams = App.getParamsObj(data.path);
                        tempParams.p = tempParams.p.split(',')[0];

                        /** 已有缓存渠道信息，更新信息 **/
                        if (storage) {
                            var time = '';
                            /** url渠道参数跟缓存的渠道参数不一致，证明打开新的渠道；渠道参数一致，但没有path值为index，表示缓存的是商城渠道，渠道模式不一致，以上情况都要重新计算首次时间 **/
                            if (e.agencyKey != storage.agencyKey || storage.path != 'index') {
                                time = (new Date()).getTime();
                            } else {
                                time = storage.time || (new Date()).getTime();
                            }
                            wx.setStorageSync('agencyUser', {
                                agencyKey: e.agencyKey,
                                time: time,
                                path: 'index',
                                defaultHours: data.defaultHours
                            })
                        } 
                        /** 记录新渠道信息 **/
                        else {
                            wx.setStorageSync('agencyUser', {
                                agencyKey: e.agencyKey,
                                time: (new Date()).getTime(),
                                path: 'index',
                                defaultHours: data.defaultHours
                            })
                        }

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
        } else {
            self.getConfig(e);
        }
    },
    /**
     * [获取配置文件]
     * @param  {Object} e [实际的url参数--产品代码列表和渠道代码和配置文件名]
     *
     */
    getConfig: function(e) {
        App.getProduct(e, (e, product, isRefresh) => {
            this.setData({
                isLoading: true,
                share: App.getShare('index', e),
                tempParams: e
            })
            if (isRefresh) {
                var path = "../index/index" + App.getParamsStr(this.data.params);
                wx.redirectTo({
                    url: path
                })
                return false;
            }
            var tabs = {},
                Character = {};
            if (product.TypeEn === 'jc' && product.Character.tese) {
                tabs.tese = {
                    title: '产品特色'
                }
                Character.width = '50%';
                Character.current = 'tese';
            } else {
                Character.width = '100%';
                Character.current = 'anlian';
            }
            tabs.anlian = {
                title: '关于安联'
            }
            this.setData({
                product: product,
                tabs: tabs,
                Character: Character,
                themeColor: App.getStyle(product.TypeEn)
            });
        })
    },
    /**
     * [切换产品卖点标签页]
     */
    changeTab: function(e) {
        this.data.Character.current = e.currentTarget.dataset.current;
        this.setData({
            Character: this.data.Character
        })
    },
    /**
     * [自定义分享]
     */
    onShareAppMessage: function() {
        return {
            title: this.data.share.title,
            path: this.data.share.path
        }
    },
    /**
     * [立即购买按钮点击事件]
     */
    buyDetail: function() {
        wx.navigateTo({
            url: './../detail/detail' + App.getParamsStr(this.data.tempParams)
        });
    },
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
    linkMain: function() {
        var delta = getCurrentPages().length,
            self = this;
        if (!this.data.indexActive) {
            if (delta === 1) {
                wx.redirectTo({
                    url: './../main/main' + App.getParamsStr(this.data.params)
                });
            } else {
                wx.navigateBack({
                    delta: delta - 1
                });
            }
        }  
    },
    linkOwn: function() {
        wx.navigateTo({
            url: './../orderList/orderList' + App.getParamsStr(this.data.tempParams)
        });
    },
    /**
     * 温馨提示
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
