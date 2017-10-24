var api = {};

// 登录
//mobile:"" //手机号码,必填
putApi('login', 'tone/loginByFake', '2014');
// 发送登陆短信验证码
putApi('sendLoginCode', 'user/sendLoginCode', '2010');

putApi('openMemberByFake', '/tone/openMemberByFake', '2014');
//购买炫铃
putApi('buyToneByFake', '/tone/buyToneByFake', '2014');
//数据
putApi('getFakeInfo', '/tone/getFakeInfo', '2014');
//搜索
putApi('getFakeInfoByCondition','/tone/getFakeInfoByCondition','2014');
function putApi(name, url, code, method) {
    if(!method) {
        method = 'post';
    }

    api[name] = (context, body, fun) => {
        if(body){
            body.isWx = "false";
        }
        context.$http[method](serverapiPath + url, getCreds(code, body), (back) => {
            if (fun)
                fun(back)
        })
        .error((err)=> {
            if(fun) {
                fun({resCode:"500",resMsg:"出错啦"});
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