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

// 新增编辑活动
putApi('updateActivity', basePath + 'fmActivityCtrl/updateActivity', '6001');

// 新增编辑奖品
putApi('updatePrize', basePath + 'fmActivityCtrl/updatePrize', '6003');

// 查看活动列表
putApi('selectActivityList', basePath + 'fmActivityCtrl/selectActivityList', '6004');

// 查看活动数据
putApi('getActivityData', basePath + 'fmActivityCtrl/getActivityData', '7002');

// 查看中奖用户
putApi('getLuckyData', basePath + 'fmActivityCtrl/getLuckyData', '7000');

// 查看签到数据
putApi('getSignData', basePath + 'fmActivityCtrl/getSignData', '7001');

// 查看分享数据
putApi('getShareData', basePath + 'fmActivityCtrl/getShareData', '7003');

// 查看活动信息
putApi('selectActivity', basePath + 'fmActivityCtrl/selectActivity', '6000');

// 查看奖品信息
putApi('selectPrize', basePath + 'fmActivityCtrl/selectPrize', '6002');

// 导出
// putApi('selectPrize', basePath + 'fmActivityCtrl/getLuckyDataExcel', '7000');

export default api;