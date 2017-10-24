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

function putApi1(name, url, code, method){
    putApi(name, url, code, method, 'form');
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

// 打卡列表
putApi1('signList', basePath + 'weixin/signList');

// 打卡
putApi1('sign', basePath + 'weixin/sign');

putApi('getUserScore', basePath + 'weixin/getUserScore');

//获取订单列表
putApi('orderList', basePath + 'shopping/order/orderList');

//查看订单详情
putApi1('orderDetail', basePath + 'shopping/order/detail');

//获取个人信息
putApi('getPersonalInfo', basePath + 'shellCoins/getPersonalInfo', '1006');

//添加或者更新我的档案
putApi('updateMyfile', basePath + 'shellCoins/updateMyfile', '1007');

//获取我的档案信息
putApi('getMyfileInfo', basePath + 'shellCoins/getMyfileInfo', '1008');

//贝壳币明细
putApi('getShellcoinsList', basePath + 'shellCoins/getShellcoinsList', '1009');

//我的订单列表
putApi('getMyorderList', basePath + 'personal/getMyorderList', '1010');

//订单详情
putApi('getMyorderDetail', basePath + 'personal/getMyorderDetail', '1011');

//贝壳币数和当日剩余的抽奖次数
putApi('getScoreAndLotteryCount', basePath + 'lottery/getScoreAndLotteryCount', '1012');

//抽奖
putApi('addLottery', basePath + 'lottery/addLottery', '1013');

//添加订单的地址
putApi('updateMyorderAddr', basePath + 'lottery/updateMyorderAddr', '1014');

//贝壳币兑换
putApi('scoreExchange', basePath + 'lottery/scoreExchange', '1015');

//阅读文章添加贝壳币和成长值
putApi('add', basePath + 'article/add', '1016');

//获取分享的js签名
putApi('getSign', basePath + 'personal/getSign', '1017');

//判读用户是否关注公众号
putApi('isAttetion', basePath + 'personal/isAttetion', '1018');

//获取组团详情
putApi('getActInfoById', basePath + 'act/getActInfoById', '2001');

//组团
putApi('addActInfo', basePath + 'act/addActInfo', '2002');

//组团领奖
putApi('getPrize', basePath + 'act/getPrize', '2003');

//获取组团模版列表
putApi('getActModeList', basePath + 'act/getActModeList', '2004');

//pv uv
putApi('addPvUv', basePath + 'statistics/addPvUv', '3001');

//推荐好友抽奖
putApi('shareLottery', basePath + 'lottery/shareLottery', '1010');

//推荐好友抽奖
putApi('shareLotteryCount', basePath + 'lottery/shareLotteryCount', '1019');

//pvuv
putApi('grouppvuv', basePath_2 + 'activity/add/visit', '10005');

// //获取导航栏列表
// putApi('getBannerList', basePath + 'banner/list', '4001');

// //滚动信息列表
// putApi('getRollInfoList', basePath + 'rollinfo/list', '4002');

export default api;