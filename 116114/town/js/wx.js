export default {
    //注册
    config(data, showmenu, fun) {
            // console.log('aaaaappppid-'+appid);
            // alert(data.appid+"-----"+data.timestamp+"----"+data.nonceStr+"----"+data.signature);
            wx.config({
                debug: false,
                appId: data.appid,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
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
                    'openCard'
                ]
            });

            // 默认隐藏右上角
            wx.ready(function() {
                if (showmenu) {
                    wx.showOptionMenu();
                } else {
                    wx.hideOptionMenu();
                }
                fun();

            });
        },
        //隐藏分享
        hideShare() {
            wx.hideOptionMenu();
        },
        showShare() {
            wx.showOptionMenu();
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
                        wx.hideOptionMenu();
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
                        wx.hideOptionMenu();
                        if (fun)
                            fun('ShareAppMessage', 'complete')
                    }
                });
            });
        },
        //获取地理位置
        getAddress(type,fun) {
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function(res) {
                    console.log(res)
                    if(fun){
                        fun(res,'success')
                    }
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                }
            });
        }
}
// export var wxapi = wx;
