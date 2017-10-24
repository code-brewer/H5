import utils from '../utils/DateUtils.js'

var api = {};

function putApi(name, url, code, method, contentType) {
	if(!method) {
		method = 'post';
	}
    api[name] = (context, body, fun) => {
        var data = contentType ? formData(body) : getCreds(code, body);
        context.$http[method](url, data , (back) => {
            if (fun)
                fun(back)
        }).error((err)=> {
            if(fun) {
                fun(err);
            }
        })

    }
}

function formData(data) {
    var arr = [];
    for(let i in data){
        arr.push(i + '=' + data[i]);
    }
    return arr.join('&');
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

// 签到
putApi('sign', basePath + 'sign', '1000');

// 获取签到记录
putApi('getSignLogs', basePath + 'signLogs', '1000');

// 获取签到天数
putApi('getSignDetail', basePath + 'signDetail', '1000');

// 抽奖
putApi('lottery', basePath + 'dolucky', '1000');

// 查询中奖用户和中奖信息（当月）
putApi('getLucyList', basePath + 'getLucyList', '1000');


// 查询我的奖品（当月）
putApi('getMyPrizeInfo', basePath + 'getMyPrizeInfo', '1000');

// 查询抽奖次数(当天)
putApi('getMyLuckyCnt', basePath + 'getMyLuckyCnt', '1000');

// 添加访问日志
putApi('addChannelLog', basePath + 'addChannelLog', '1000');

// 获取服务器时间
putApi('getDate', basePath + 'getDate', '1000');

// 获取活动配置信息
putApi('selectActivity', basePath + 'fmActivityCtrl/selectActivity', '1000');

// 获取活动配置信息
putApi('selectPrize', basePath + 'fmActivityCtrl/selectPrize', '1000');

export default api;