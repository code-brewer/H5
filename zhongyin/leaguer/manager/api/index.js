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

// 登录
putApi('get', basePath + 'manager/get', '5012');

// 修改账号信息
putApi('modpwd', basePath + 'manager/modpwd', '3012');
// 查看活动列表
putApi('selectActivityList', basePath + 'memberCtrl/selectActivityList', '6004');
// 查看中奖用户
putApi('getLuckyData', basePath + 'memberCtrl/getLuckyData', '7000');

// 活动数据
putApi('getActivityData', basePath + 'memberCtrl/getActivityData', '7002');
// 订购失败
putApi('getFailedData', basePath + 'memberCtrl/getFailedData', '7002');
// 会员领取
putApi('getMemberData', basePath + 'memberCtrl/getMemberData', '7002');
// 中奖流程
putApi('getPrizeData', basePath + 'memberCtrl/getPrizeData', '7002');
// 开通会员
putApi('getOperData', basePath + 'memberCtrl/getOperData', '7002');
// 获取活动详情
putApi('selectActivityById', basePath + 'memberCtrl/selectActivityById', '7002');
// 保存分享设置
putApi('shareActicity', basePath + 'memberCtrl/shareActicity ', '7002');


// 导出
// putApi('selectPrize', basePath + 'fmActivityCtrl/getLuckyDataExcel', '7000');

export default api;