var api = {};

// 登录
//mobile:"" //手机号码,必填
putApi('login', '/html/loginForH5', '2014');
// 发送登陆短信验证码
putApi('sendLoginCode', 'html/sendLoginCode', '2010');

//分享
putApi('addShareLog', 'statistical/addShareLog', '3007');

putApi('addOperLog', 'statistical/addChannelLog', '3012');

//开通会员
putApi('openMemberByNet', '/html/openMemberByNet', '2014'); 
//判断是否有炫铃能力
putApi('findUserBasInfo', '/html/findUserBasInfo', '2014'); 
//开通炫铃能力
putApi('qryUserBasInfo', '/html/qryUserBasInfo', '2014'); 
// //存储开通会员成功话费
// putApi('insertBill', '/tone/insertBill', '2014'); 
function putApi(name, url, code, method) {
    if(!method) {
        method = 'post';
    }

    api[name] = (context, body, fun) => {
        if(body){
            body.isWx = "false";
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