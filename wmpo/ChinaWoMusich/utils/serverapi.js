var api = {};

// 登录
//mobile:"" //手机号码,必填
putApi('login', 'user/login', '2001');
// 发送登陆短信验证码
putApi('sendLoginCode', 'user/sendLoginCode', '2010');
//2005 查询榜单列表
//"repBody": [{ "imgurl": "http://www.soyu.cn/",  //奖品缩略图 "mobile": "186****5905",   //中奖手机号码 "pname": "小米平衡车"   //奖品名称} ],
putApi('quePrizeDrawResult', 'lucky/newQuePrizeDrawResult', '2005');
//2006 查询的我奖品
putApi('queMyPrizeDrawResult', 'lucky/newQueMyPrizeDrawResult', '2006');

//抽奖次数
putApi('queEveryDay', 'lucky/newQueEveryDay', '2004');
//抽奖
putApi('doLucky', 'lucky/newDoLucky', '2008');
//分享
putApi('addShareLog', 'statistical/addShareLog', '3007');

//2003 保存用户完游戏记录（仅保存游戏通过）
putApi('saveUserH5Info', 'olympic/saveClearanceRecord', '2003');

//2007 绑定奖品（领取）
putApi('bindPrizeMobile', 'lucky/newBindPrizeMobile', '2007');

putApi('addOperLog', 'statistical/addChannelLog', '3012');

putApi('isFollow', '/user/isFollow', '2005');

putApi('shareSuccess', '/olympic/shareSuccess', '2005');

function putApi(name, url, code, method) {
    if(!method) {
        method = 'post';
    }

    api[name] = (context, body, fun) => {
        if(body){
            body.isWx = "true";
        }
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