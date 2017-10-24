var App = getApp();
Page({
    data:{
        params: '',
        list: [],
        temp: [],
        current: 'all',
        isLoading: true,
        loadText: '',
        tipsText: '',
        tips: false,
        share: ''
    },
    onLoad: function(e) {
        this.setData({
            params: e
        })
    },
    onShow: function() {
        this.getData(this.data.params);
    },
    /**
     * [标签页切换]
     * @param  {object} e 所点击的标签的实例对象
     *
     */
    tabChange: function(e){
        var type = e.currentTarget ? e.currentTarget.dataset.testid : e,
            arr = [];
        if (type === 'all') {
            arr = this.data.temp;
        } else if (type === 'wait') {
            arr = this.data.temp.filter(item => {
                return item.stauts === 1;
            });
        }  else if (type === 'abate') {
            arr = this.data.temp.filter(item => {
                return item.stauts === 4;
            });
        } else if (type === 'already') {
            arr = this.data.temp.filter(item => {
                return item.stauts === 3;
            });
        }
        this.setData({
            current: type,
            list: arr
        })
    },
    /**
     * [下拉刷新]
     */
    onPullDownRefresh: function() {
        this.getData(this.data.params, function(){
            wx.stopPullDownRefresh();
        })
    },
    /**
     * [获取我的订单列表数据]
     * @param {object} e url参数
     * @param {function} callback 回调函数
     */
    getData: function(e, callback) {
        var self = this,
            share = '';
        if (e.agencyKey) {
            share = 'main';
        } else if (e.p) {
            share = 'index';
        } else {
            share = 'main';
        }
        this.setData({
            isLoading: false,
            loadText: '正在加载中',
            share: App.getShare(share, e),
            list: []
        });
        wx.login({
            success: function(login) {
                wx.request({
                    url: App.data.interfacePath + 'order/getlist',
                    method: 'POST',
                    data: {
                        base: {
                            proNo: '10001',
                            reqTime: ''
                        },
                        body: {
                            code: login.code,
                        }
                    },
                    success: function(res) {
                        if (res.data.resCode === '000000') {
                            res.data.repBody.sort(function(a,b){
                                return b.ctime - a.ctime;
                            })
                            res.data.repBody.forEach(item => {
                                item.policyJson = JSON.parse(item.policyJson);
                                item.payDisabled = false;
                                item.statusText = ['未付款', '已付款', '已付款', '已付款'][item.stauts - 1];
                                if (item.ctime) {
                                    item.ctime = new Date(item.ctime).format('yyyy-MM-dd HH:mm:ss');
                                }
                                if (item.singleTime) {
                                    item.singleTime = new Date(item.singleTime).format('yyyy-MM-dd HH:mm:ss');
                                }
                                if (item.payTime) {
                                    item.payTime = new Date(item.payTime).format('yyyy-MM-dd HH:mm:ss');
                                }
                                var effectiveDate = item.policyJson.body.policy.effectiveDate,
                                    expireDate = item.policyJson.body.policy.expireDate;
                                item.policyJson.body.policy.effectiveDate = self.format(effectiveDate);
                                item.policyJson.body.policy.expireDate = self.format(expireDate);

                                /** 校验当前是否超过起保时间，如果超过，未付款时的继续支付按钮置灰 **/
                                var now = (new Date()).getTime(),
                                    effectiveDate = (new Date(item.policyJson.body.policy.effectiveDate.replace(/-/g, '/'))).getTime();
                                if (now > effectiveDate) {
                                    item.payDisabled = true;
                                }

                                if (!item.policyJson.body.policy.smallPic) {
                                    item.policyJson.body.policy.smallPic = 'http://www.allianz.cn/images/wxApplet/' + item.policyJson.body.policy.productID + '/smallPic.jpg';
                                }
                            })
                            self.setData({
                                temp: res.data.repBody
                            })
                            self.tabChange(self.data.current);
                        } else {
                            self.openTip('获取信息失败，请稍候再试');
                        }
                    },
                    complete: function() {
                        self.setData({
                            isLoading: true
                        })
                        callback && callback();
                    }
                })
            }
        })
    },
    /**
     * 格式化时间 原始格式：年月日时分秒  格式化后：年-月-日 时:分:秒
     * @param  {string} data 原始格式的时间
     *
     * @return {string}      格式后的时间
     */
    format: function(data) {
        var data = data + '',
            year = data.substr(0, 4),
            month = data.substr(4, 2),
            day = data.substr(6, 2),
            hours = data.substr(8, 2),
            minutes = data.substr(10, 2),
            seconds = data.substr(12, 2)
        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    },
    /**
     * [弹窗温馨提示]
     */
    openTip: function(text) {
        var self = this;
        this.setData({
            tipsText: text,
            tips: true
        })
        setTimeout(function() {
            self.setData({
                tips: false
            })
        }, 3000)
    },
    /**
     * [记录所点击的订单并进行跳转]
     * @param  {object} e 所点击订单的实例对象
     *
     */
    link: function(e) {
        var self = this;
        wx.setStorage({
            key: 'orderDetail',
            data: this.data.list[e.currentTarget.dataset.index],
            success: function() {
                wx.navigateTo({
                    url: '../orderDetail/orderDetail' + App.getParamsStr(self.data.params)
                })
            }
        })
    },
    /**
     * [继续支付]
     * @param {object} e 继续支付按钮的实例对象
     */
    pay: function(e) {
        var index = e.currentTarget.dataset.index,
            data = this.data.list[index],
            self = this;
        if (data.payDisabled) {
            return;
        }
        this.setData({
            isLoading: false,
            loadText: '支付中'
        })
        wx.login({
            success: function(login) {
                wx.request({
                    url: App.data.interfacePath + 'order/initpay',
                    method: 'POST',
                    data: {
                        base: {
                            proNo: '10005'
                        },
                        body: {
                            code: login.code,
                            orid: data.orid,
                            planName: data.policyJson.body.policy.planName
                        }
                    },
                    success: function(res) {
                        self.setData({
                            isLoading: true
                        })
                        if (res.data.resCode == '000000' && res.data.repBody.requestHandler.allParameters) {
                            self.wxpay(data.policyRef, res.data.repBody.requestHandler.allParameters);
                        } else {
                            self.openTip('支付失败，请稍后再试');
                        }
                    },
                    fail: function() {
                        self.setData({
                            isLoading: true
                        })
                        self.openTip('支付失败，请稍后再试');
                    }
                })
            }
        })    
    },
    /**
     * [调起小程序支付API]
     * @param {string} policyRef 保单号
     * @param {object} options 支付API所需要传的参数集合
     */
    wxpay: function(policyRef, options) {
        var self = this;
        this.data.params.policyRef = policyRef;
        wx.requestPayment({
            timeStamp: options.timeStamp,
            nonceStr: options.nonceStr,
            package: options.package,
            signType: options.signType,
            paySign: options.paySign,
            success: function(data) {
                self.data.params.type = 'success';
                wx.redirectTo({
                    url: "../success/success" + App.getParamsStr(self.data.params)
                })
            },
            fail: function(e) {
                self.data.params.type = 'fail';
                wx.redirectTo({
                    url: "../success/success" + App.getParamsStr(self.data.params)
                })
            }
        })
    },
    /**
     * [返回首页]
     */
    linkIndex: function() {
        var delta = getCurrentPages().length;
        wx.navigateBack({
            delta: delta - 1
        });
    },
    /**
     * [自定义分享]
     */
    onShareAppMessage: function() {
        return {
            title: this.data.share.title,
            path: this.data.share.path
        }
    }
})