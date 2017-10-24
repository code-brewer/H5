export var checkTel = function(val) {
    var flag = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(val);
    return flag;
}



export var checkPw = function(val) {
    var flag = /^[\S]{6,16}$/.test(val);
    return flag;
}

export var checkVerify = function(val) {
    var flag = /^[\d]{6,6}$/.test(val);
    return flag;
}

export var getScrollTop = function() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
export var getScrollHeight = function() {
    var scrollHeight = 0;
    if (document.documentElement && document.documentElement.scrollHeight) {
        scrollHeight = document.documentElement.scrollHeight;
    } else if (document.body) {
        scrollHeight = document.body.scrollHeight;
    }
    return scrollHeight;
}
