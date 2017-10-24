var u = navigator.userAgent,
    app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var isiOS = !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var WOW = u.toLocaleUpperCase(); 
var HOST = window.location.protocol + "//" + document.location.host;
//封装app交互js
var wbfJB = {
    shareToAll: function (title, content, url, picUrl) { //app分享
        if (WOW.match(/WOW_CAS/i) == "WOW_CAS") {//判断是否是沃百富app
            if (isAndroid) {
                window.wealth.shareToAll(title, content, url, picUrl);
                return;
            }
            if (isiOS) {
                var json = '{"title":"' + encodeURIComponent(title) + '","content":"' + encodeURIComponent(content) +
                    '","url":"' + encodeURIComponent(url) + '","picUrl":"' + encodeURIComponent(picUrl) + '"}';
                wbfJB.doCommand("shareToAll", json);
            }
        } else {
            //非沃百富客户端
            alert("请下载最新沃百富客户端");
        }
    },
    loadUrl: function (type, url) { //加载页面
        if (url.match(/tel:/i) == "tel:") {
            window.location.href = url;
            return;
        }
		/**
		*type 值：
		*0使用原生方法打开url
		*3通知客户端app新开页面
		*4通知客户端app当前页面打开
		*5通知客户端根据url定位是基础窗口页面还是新开窗口展现（app ver 2.5.0+）
		*/
        if (type == 0) {//type等于0 使用原生方法打开url
            window.location.href = url;
            return;
        }
        if (type == 3 || type == 4 || type == 5) {//加载页面
            if (WOW.match(/WOW_CAS/i) == "WOW_CAS") {//判断是否是沃百富app
	            if( typeof url === 'undefined' || url === ''){
				 alert("loadUrl:Parameter does not exist or error");
				 return;
				}
	            /**
				*判断url是否是绝对路径，沃百富客户端需要传入绝对路径
				**/
                if (url.substr(0, 7) == "http://") {
                    url = url;
                } else if (url.substr(0, 8) == "https://") {
                    url = url;
                } else {
                    url = HOST + url;
                }
                //android 客户端
                if (isAndroid) {
                    window.wealth.loadUrl(type, url);
                    return;
                }
                //ios 客户端
                if (isiOS) {
                    url = encodeURIComponent(url);
                    json = '{"Type":"' + type + '","Url":"' + url + '"}';
                    wbfJB.doCommand("loadUrl", json);
                    return;
                }
            } else {//非沃百富客户端
                window.location.href = url;
                return;
            }
        } else {
            alert("loadUrl:Parameter does not exist or error");
        }
 
    },
    close: function () { //关闭
        if (WOW.match(/WOW_CAS/i) == "WOW_CAS") {//判断是否是沃百富app
            if (isAndroid) {
                window.wealth.close();
            }
            if (isiOS) {
                json = '{"Type":1}';
                wbfJB.doCommand("close", json);
            }
        } else {
            window.close();
        }
    },
	doCommand:function(method, json) {
	window.location.href = "wealth:" + method + ":" + json;
	}
}
 function gointegral(){
 	if(iswowcas){
 		location.href = serverPath + "/m/memCenter_page";
 	}else{
 		var url=serverPath+"/wc/memCenter_page";
    	wbfJB.loadUrl(5,url);
 	}
    
  }
  function gonewactivity(){
    var url=serverPath+"/
    mhtml/#/markets";
    wbfJB.loadUrl(5,url);
  }