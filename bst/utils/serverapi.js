var api = {};

// // 登录
// //mobile:"" //手机号码,必填
// putApi('login', 'user/login', '2001');
// 发送登陆短信验证码
// putApi('sendLoginCode', 'user/sendLoginCode', '2010');
//2005 查询榜单列表
//"repBody": [{ "imgurl": "http://www.soyu.cn/",  //奖品缩略图 "mobile": "186****5905",   //中奖手机号码 "pname": "小米平衡车"   //奖品名称} ],
putApi('quePrizeDrawResult', 'lucky/newQuePrizeDrawResult', '1003');
//2006 查询的我奖品
putApi('queMyPrizeDrawResult', 'lucky/newQueMyPrizeDrawResult ', '1003');

//抽奖次数
putApi('queEveryDay', 'lucky/newQueEveryDay', '1003');
//抽奖
putApi('doLucky', 'lucky/newDoLucky', '1003');
//分享
putApi('shareSuccess', 'lucky/shareSuccess', '1003');

//2003 保存用户完游戏记录（仅保存游戏通过）
putApi('saveClearanceRecord', 'lucky/saveClearanceRecord', '1003');

//2007 绑定奖品（领取）
putApi('bindPrizeMobile', 'lucky/newBindPrizeMobile', '1003');
//调查问卷
putApi('saveQuestion','lucky/saveQuestion','1003');
function putApi(name, url, code, method) {
    if(!method) {
        method = 'post';
    }

    api[name] = (context, body, fun) => {
        context.$http[method](basePath + url, getCreds(code, body), (back) => {
            if (fun)
                fun(back)
        })
        .error((err)=> {
            if(fun) {
                fun(err);
            }
        })

    }
}

function getCreds(proNo, body) {
    return {
        base: {
            reqTime: formatDate(),
            proNo: proNo,
        },
        body: body
    }
}
function formatDate(date, format) {

    if(!date) date = new Date();
    if(!format) format = 'yyyyMMddHHmmss';

    var year = date.getFullYear(),
    months = (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1),
    days = (date.getDate() > 9 ? '' : '0') + date.getDate(),
    hours = (date.getHours() > 9 ? '' : '0') + date.getHours(),
    minutes = (date.getMinutes() > 9 ? '' : '0') + date.getMinutes(),
    secounds = (date.getSeconds() > 9 ? '' : '0') + date.getSeconds();


    format = format.replace(/yyyy/, year);
    format = format.replace(/MM/, months);
    format = format.replace(/dd/, days);
    format = format.replace(/HH/, hours);
    format = format.replace(/mm/, minutes);
    format = format.replace(/ss/, secounds);

    return format;  
}

export default api;