import utils from "../utils";

var api = {};

// 登录
putApi('login', 'manager/get', '5012');

//根据gids查询奖品详情列表
putApi('listByGids', 'prize/listByGids', '3017');

// 上传
putApi('upload', 'upload/upVideoOrFile', '2014');

// 3003奖品添加
putApi('storagePrize', 'prize/storage', '3003');

// 删除奖品库存和批量删除
putApi('bathDelPrize', 'prize/delPrize', '3007');

// 3002删除奖项奖品
putApi('delPrize', 'prize/del', '3002');

// 3008 查询奖品详情
putApi('getPrizeByPid', 'prize/getPrizeByPid', '3008');

// 3006 获取奖品列表
putApi('getPrizeList', 'prize/prizeList', '3006');

// 3009 修改奖品
putApi('updatePrize', 'prize/updatePrize', '3009');

// 3001 获取奖品列表
putApi('addOrUpdatePrize', 'prize/addOrUpdatePrize', '3005');

//  3001 获取奖品列表
putApi('prizeList', 'prize/list', '3001');

// 查询模版列表
putApi('selectModelsList', 'models/selectModelsList', '5005');

  // 创建活动 // 修改活动
putApi('addOrUpdActivity', 'activityCtrl/addOrUpdSpActivity', '5013');

// 活动详情
putApi('selectActivityById', 'activityCtrl/selectActivityById', '5003');

// 活动状态修改
putApi('updateActivityInfo', 'activityCtrl/updateActivityInfo', '5002');

  // 获取活动列表
putApi('selectActivityList', 'activityCtrl/selectActivityList', '5001');

// 退出
putApi('logout', 'manager/logout', '5010');

// 获取模板详情
putApi('selectModelsByMid', 'models/selectModelsByMid', '5014');

// 活动曲线图
putApi('activityCurve', 'activityCurve', '3033');

// 导出中奖榜单
putApi('exportWinningInfoToExcel', 'exportWinningInfoToExcel', '3032');

// 中奖榜单
putApi('selectWinningListByAid', 'selectActivityDataWinningList', '3031');

// 删除奖项
putApi('delPrizePoolByPid', 'prizePool/delPrizePoolByPid', '4002');

// 获取活动奖项
putApi('queryPrizePoolByAid', 'prizePool/queryPrizePoolByAid', '4001');

// 添加活动奖项
putApi('addOrUpdPrizePool', 'prizePool/addOrUpdPrizePool', '5006');

// 上传
putApi('createQrcode', 'activityCtrl/createQrcode', '5008');

// 查询活动数据统计详情奖项
putApi('selectActivityDataPrize', 'selectActivityDataPrize', '3023');

// 上传
putApi('selectActivityData', 'selectActivityData', '3022');

// 3014修改账号状态（删除、禁用、启用
putApi('modUserStatus', 'manager/modUserStatus', '3014');
// 查询用户信息
putApi('queUsers', 'manager/queUsers', '3013');

// 修改用户密码
putApi('updateUserPwd', 'manager/modpwd', '3012');

// 更新用户信息
putApi('updateUserInfo', 'manager/modUserInfo', '3011');

// 查询用户信息
putApi('userInfo', 'manager/userinfo', '3010');

// 导出活动数据统计
putApi('activityDataExportToExcel', 'exportToExcel', '3021');

// 活动数据统计列表
putApi('selectActivityDataList', 'list', '3020');

// 3004查询某奖项奖品列表
putApi('getPrizeListByPid', 'prize/getPrizeListByPid', '3004');

// 获取奖品类型
putApi('prizeTypes', 'activityCtrl/getTypes', '5015');

//获取用户各个状态的活动数
putApi('activityStatusCount', 'activity/activityStatusCount', '5016');



//活动id生成URL
putApi('createActivityUrl', 'activityCtrl/createActivityUrl', '5011');

//创建二维码
putApi('createQrcode', 'activityCtrl/createQrcode', '5008');

//获取活动数据总览统计
putApi('searchActivityDataDetail', 'previewStatistical', '3034');

//获取uv曲线图数据
putApi('getUvByTimeSlot', 'getUvByTimeSlot', '3035');

//获取活动数据统计中奖榜单
putApi('getWinningList', 'selectActivityDataWinningList', '3031');

//6001 查询题库列表
putApi('questList', 'quest/questList', '6001');

//保存头像
putApi('saveUserLogo', 'manager/saveUserLogo', '3020');

//10001 活动数据统计分析
putApi('actData','acceptLog/actData','10001');

//10002 导出分析数据到excel
putApi('actDataExportToExcel','acceptLog/exportToExcel?proNo=10002&reqTime=2016-12-08&aid=13&starttime=2016-11-24&endtime=2016-11-25','10002','get');

//10003 活动领奖榜单
putApi('selectWinerPrize','acceptLog/selectWinerPrize','10003');

//10005 参与活动的用户列表
putApi('partUsers','acceptLog/partUsers','10005');

//10006 根据活动id查询用户获奖记录
putApi('selectPrizeNameByUsid','acceptLog/selectPrizeNameByUsid','10006');



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
