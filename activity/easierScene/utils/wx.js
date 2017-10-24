export default {
    //注册
    config(data, fun) {
        wx.config({
            debug: false,
            appId: data.appid,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard',
                'chooseImage',
                'previewImage',
                'uploadImage'
            ]
        });

        // 默认隐藏右上角
        wx.ready(function() {
            if (fun) { fun() }
        });
    },
    hide() {
        wx.hideOptionMenu();
    },
    //分享
    share(title, desc, link, imgurl, fun) {
        // 显示右上角
        wx.showOptionMenu();
        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgurl,
                success: function(res) {
                    // alert('已分享');
                    if (fun)
                        fun('ShareTimeline', 'success')
                },
                cancel: function(res) {
                    // alert('已取消');
                    if (fun)
                        fun('ShareTimeline', 'cancel')
                },
                complete: function() {
                    //wx.hideOptionMenu();
                    if (fun)
                        fun('ShareTimeline', 'complete')
                }
            });

            wx.onMenuShareAppMessage({
                title: title,
                desc: desc,
                link: link,
                imgUrl: imgurl,
                success: function(res) {
                    // alert('已分享');
                    if (fun)
                        fun('ShareAppMessage', 'success')
                },
                cancel: function(res) {
                    // alert('已取消');
                    if (fun)
                        fun('ShareAppMessage', 'cancel')
                },
                complete: function() {
                    //wx.hideOptionMenu();
                    if (fun)
                        fun('ShareAppMessage', 'complete')
                }
            });
        });
    }
}
