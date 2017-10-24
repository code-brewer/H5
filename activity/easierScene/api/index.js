import utils from '../utils/index.js'

var api = {};

// 登录
putApi('login', 'cms/admin/get', '10002');

// 注销
putApi('logout', 'cms/admin/logout', '10003');

//  生成二维码
putApi('createQrcode', 'cms/motive/createQrcode', '10004');

// 保存主题基本信息
putApi('addOrEdit', 'cms/motive/addOrEdit', '20001');

// 查询主题列表
putApi('listByAcct', 'cms/motive/listByAcct', '20002');

//根据moid查询插件列表（未开始）
putApi('pluginsByMoid', 'cms/motive/pluginsByMoid', '20003');

//查询插件模板列表
putApi('modelsList', 'cms/motive/modelsList', '20004');

//新增主题插件（即活动）
putApi('addActivity', 'cms/motive/addActivity', '20005');

//根据moid查询消息列表
putApi('newsList', 'cms/motive/newsList', '20006');

//根据moid查询签到列表
putApi('signList', 'cms/motive/signList', '20007');

//根据aid查询榜单列表
putApi('winList', 'cms/motive/winList', '20008');

//修改插件（活动）状态
putApi('editActivityStauts', 'cms/motive/editActivityStauts', '20009');

//进入大屏幕
putApi('enterBigScreen', 'cms/motive/enterBigScreen', '20010');

//20011 根据moid查询主题详情
putApi('selectByMoid', 'cms/motive/selectByMoid', '20011');

//20012 抽奖
putApi('doLuck', 'cms/motive/doLuck', '20012');

//20013 根据aid查询插件（即活动）详情
putApi('selectActivityByAid', 'cms/motive/selectActivityByAid', '20013');

//20014 根据aid查询抽奖剩余奖品数量
putApi('selectSurplusSize', 'cms/motive/selectSurplusSize', '20014');


function putApi(name, url, code, method) {
    if(!method) {
        method = 'post';
    }

    api[name] = (context, body, fun) => {
        context.$http[method](url, getCreds(code, body), (back) => {
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