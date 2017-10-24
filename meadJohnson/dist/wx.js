export default {
    //注册
    config(data, showmenu, fun) {
            wx.config({
                debug: false,
                appId: data.appid, //公众号名称，由商户传入
                timestamp: data.timestamp, //时间戳，自1970年以来的秒数
                nonceStr: data.noncestr, //随机串
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
                    'chooseImage'
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
        }, 
        //支付
        // pay(data) {
        //     wx.chooseWXPay( {
        //         appId: data.appId,
        //         timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        //         nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        //         package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        //         signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        //         paySign: data.paySign, // 支付签名
        //         success: function(res) {
        //             this.$router.go({
        //                 path: '/groupPay'
        //             });
        //         },
        //         cancel: function(res) {
        //             this.$router.go({
        //                 path: '/groupMain/groupShop'
        //             });
        //         },
        //         fail:function(res) {
        //             alert(window.JSON.stringify(res));
        //             this.$router.go({
        //                 path: '/groupMain/groupShop'
        //             });
        //         },
        //     })
        // },
}
// export var wxapi = wx;
