import utils from '../utils'

var api = {};
// 发送登陆短信验证码
putApi('sendLoginCode', 'user/sendLoginCode', '2010');

// 铃音订购会员登陆/注册
putApi('login', 'tone/login', '2011');

// 发送开通短信验证码
putApi('sendVerifyCode', 'user/sendVerifyCode', '2012');

// 铃音订购开通会员
putApi('openMember', 'tone/openMember', '2013');

putApi('addChannelLog', 'statistical/addChannelLog', '2006');

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
            reqTime: utils.formatDate(),
            proNo: proNo,
        },
        body: body
    }
}

export default api;