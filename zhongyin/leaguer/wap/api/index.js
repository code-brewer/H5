import utils from '../utils/utils'
// require('../utils/mock.js')
var api = {};

function putApi(name, url, code, method, contentType) {
	if(!method) {
		method = 'post';
	}
    api[name] = (context, body, fun) => {
        var data = getCreds(code, body);
        context.$http[method]('/mgu'+url, data , (back) => {
            if (fun)
                fun(back)
        }).error((err)=> {
            if(fun) {
                fun(err);
            }
        })

    }
}

function getCreds(proNo, body) {
    return {
        base: {
            reqTime: new Date().format('yyyyMMddHHmmss'),
            proNo: proNo,
        },
        body: body
    }
}

// 获取活动信息
putApi('selectActivityById', '/activity/selectActivityById', '2011');

// 登录
putApi('loginForH5', '/tone/loginForH5', '2011');

// 获取我的奖品
putApi('myPrizeDrawResult', '/lucky/myPrizeDrawResult', '2011')

// 查询是否领奖
putApi('bindPrizeMobile', '/lucky/bindPrizeMobile', '2011')

// 获取验证码
putApi('sendLoginCode', '/user/sendLoginCode', '2010');

// 开通音乐会员
putApi('openMemberByNet', '/tone/openMemberByNet', '2010');

// 抽奖
putApi('newDoLucky', '/tone/newDoLucky', '2010');

// 获取奖品列表
putApi('newQuePrizeDrawResult', '/lucky/newQuePrizeDrawResult', '2006')

// 添加访问日志
putApi('addAcceptLog', '/activity/addAcceptLog', '2006')

// 获取微信数字签名
putApi('obtainJssdk', '/tone/obtainJssdk', '6021');

// 添加领奖地址
putApi('getPrize', '/lucky/getPrize', '6021');

// 判断能否抽奖
putApi('newQueEveryDay', '/tone/newQueEveryDay', '6021');

// 获取订购的产品
putApi('getUserProductId', '/tone/getUserProductId', '6021');

export default api;