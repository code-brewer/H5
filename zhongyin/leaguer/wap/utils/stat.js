/**
 * Created by Administrator on 2016/11/30.
 */

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "";

    var uuid = s.join("");
    var new_uuid = "01000f" + uuid.substring(6);
    return new_uuid;
}


function setParament(visitPageCode, gatePageCode, gateModel, operate, contentId, account, portal, channel_id) {
    var data = getBroswerParameter();
    data.visitPageCode = visitPageCode || '';
    data.gatePageCode = gatePageCode || '';
    data.gateModel = gateModel || '';
    data.operate = operate || '';
    data.contentId = contentId || '';
    data.account = account || '';
    data.portal = portal || '';
    data.channelId = channel_id || '';
    return data;
}

function getBroswerParameter() {
    var bdata = {};
    bdata.cookie = document.cookie || '';
    bdata.url = document.URL || '';
    bdata.title = document.title || '';
    bdata.domain = document.domain || '';
    bdata.referer = document.referrer || '';
    bdata.clientTime = new Date().getTime();

    if (navigator) {
        bdata.language = navigator.language || '';
    }
    return bdata;
}


function submitStatInfo(visitPageCode, gatePageCode, gateModel, operate, contentId, account, portal, channel_id) {
    var req_pram = setParament(visitPageCode, gatePageCode, gateModel, operate, contentId, account, portal, channel_id);

    // req_pram.data = JSON.stringify(setParament(channel_id,clickType,clickName,phone));
//    var url = "http://127.0.0.1:8080/stationmaster/statInfo.do";
    var url = "http://58.254.132.61/stationmaster/statInfo.do";
    $.ajax({
        url: url,
        type: "POST",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data: req_pram,
        dataType: 'JSONP',
        success: function (res) {
            if (getCookie("zystationsmaster") == null || getCookie("zystationsmaster") == "") {
                if ("zystationsmaster" in res) {
                    setCookie("zystationsmaster", res["zystationsmaster"]);
                }
            }
        }
    });
}


function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return ""
}
