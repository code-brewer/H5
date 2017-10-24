var App = getApp();
Page({
	data: {
        share: '',
        params: ''
	},
	onLoad: function(e) {
        var share = '';
        if (e.agencyKey) {
            share = 'main';
        } else {
            share = 'index';
        }
		this.setData({
            params: e,
            share: App.getShare(share, e)
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
     * [跳转到我的订单列表]
     */
    linkOrder: function() {
    	wx.redirectTo({
            url: '../orderList/orderList' + App.getParamsStr(this.data.params)
        });
    },
    /**
     * [返回首页]
     */
    linkIndex: function() {
        var delta = getCurrentPages().length;
        wx.navigateBack({
            delta: delta - 1
        });
    }
})