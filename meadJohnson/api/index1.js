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

//获取导航栏列表
putApi('getBannerList', basePath + 'banner/list', '4001');

//滚动信息列表
putApi('getRollInfoList', basePath + 'rollinfo/list', '4002');

//获取礼品列表
putApi('getGiftList', basePath + 'gift/list', '5001');

//获取礼品详情
putApi('getGiftDetail', basePath + 'gift/getById', '5002');

//获取礼品兑换
putApi('scoreExchangeGift', basePath + 'lottery/scoreExchangeGift', '5003');

//组团每个月的记录
putApi('getGroupRecordList', basePath + 'act/getGroupRecordList', '2005');

//某天的组团记录
putApi('getGroupTodayRecordList', basePath + 'act/getGroupTodayRecordList', '2006');

/*
礼品
 */
//获取礼品列表
putApi('listPage', basePath + 'gift/listPage', '5004');

//获取礼品类型下拉列表
putApi('giftTypeList', basePath + 'gift/giftTypeList', '5005');

//礼品兑换校验
putApi('scoreExchangeGiftValidate', basePath + 'lottery/scoreExchangeGiftValidate', '5006');


/*
打卡活动
 */
//更新用户是否参加21天打卡计划
putApi('updateCardStatus', basePath + 'cardAct/updateCardStatus', '6001');

//添加用户21天打卡计划记录
putApi('addCardSignin', basePath + 'cardAct/signin', '6002');

//获取参加21天打卡计划的人数
putApi('getCardCount', basePath + 'cardAct/count', '6003');

//获取每天打卡的前11位用户头像
putApi('getHeadurl', basePath + 'cardAct/headurl', '6004');

//获取用户21天打卡记录
putApi('userRecordList', basePath + 'cardAct/userRecordList', '6005');

//21天打卡好友列表
putApi('getFriendGradeList', basePath + 'cardAct/friendGradeList', '6006');

//获取用户个人打卡信息
putApi('ownGradeInfo', basePath + 'cardAct/ownGradeInfo', '6007');

//21天打卡总列表
putApi('getAllGradeList', basePath + 'cardAct/allGradeList', '6008');

//总排名中自己的排名
putApi('getAllOwnGradeInfo', basePath + 'cardAct/allOwnGradeInfo', '6009');

//获取用户是否参加打卡计划
putApi('cardStatus', basePath + 'cardAct/cardStatus', '6010');

//设置用户推送时间
putApi('sendSSAddMod', basePath + 'cardAct/sendSSAddMod', '6011');

//获取用户邀请卡信息
putApi('actCardInfo', basePath + 'cardAct/actCardInfo', '6012');

//获取用户推送时间
putApi('getSendStatus', basePath + 'cardAct/getSendStatus', '6013');

//获取用户推送时间
putApi('actCardQrcode', basePath + 'cardAct/actCardQrcode', '6014');

//21天补打卡
putApi('signinAdd', basePath + 'cardAct/signinAdd', '6015');

//获取最近5个好友的头像
putApi('headurl', basePath + 'friend/headurl', '6016');

//获取邀请好友的数量和贝壳币数
putApi('scoreAndNum', basePath + 'friend/scoreAndNum', '6017');

//获取每月每天邀请的好友数
putApi('monthNum', basePath + 'friend/monthNum', '6018');

//获取某天邀请好友的详情
putApi('dayDetail', basePath + 'friend/dayDetail', '6019');

/*
团购
*/
//添加活动
putApi('addActivity', basePath_2 + 'activity/add', '10001');

//某一活动详情
putApi('findActivity', basePath_2 + 'activity/find', '10002');

//更新活动
putApi('updateActivity', basePath_2 + 'activity/update', '10002');

//删除某一活动
putApi('deleteActivity', basePath_2 + 'activity/delete', '10002');

//分页获取活动列表
putApi('findPageActivity', basePath_2 + 'activity/find/page', '10006');

//添加收货地址
putApi('addAddressActivity', basePath_2 + 'activity/add/address', '10004');

//删除收货地址
putApi('addressDeleteActivity', basePath_2 + 'activity/delete/address', '10005');

//更新某收货地址
putApi('addressUpdateActivity', basePath_2 + 'activity/update/address', '10002');

//获取收货地址
putApi('addressFindActivity', basePath_2 + 'activity/find/address', '10005');

//开团
putApi('groupCreateActivity', basePath_2 + 'activity/create/group', '10007');

// //更新订单（订单完成支付后使用、例如微信回调）
// putApi('orderPayActivity', basePath_2 + 'activity/pay/order', '10008');

//我的订单
putApi('orderFindActivity', basePath_2 + 'activity/find/orders', '10009');

//订单详情
putApi('detailOrderActivity', basePath_2 + 'activity/order/detail', '10010');

//拼团详情
putApi('detailGroupActivity', basePath_2 + 'activity/group/detail', '10011');

//参加拼团
putApi('groupJoinActivity', basePath_2 + 'activity/join/group', '10011');

//获取优惠提醒
putApi('pushFindActivity', basePath_2 + 'activity/find/push', '10011');

//更新优惠提醒
putApi('pushUpdateActivity', basePath_2 + 'activity/update/push', '10012');

//调起微信支付
putApi('payCreateActivity', basePath_2 + 'activity/create/pay', '10005');



//申请退款
putApi('orderRefund', basePath_2 + 'activity/apply/order/refund', '10005');


//取消订单
putApi('orderclose', basePath_2 + 'activity/delete/order', '10005');

//pvuv
putApi('grouppvuv', basePath_2 + 'activity/add/visit', '10005');
/**
 * 打卡
 */

//打卡信息
putApi('isPlanCheck', basePath_2 + 'user/check/isPlan', '10005');

//晨起打卡
putApi('getplayCard', basePath_2 + 'user/playCard', '10005');

//获取banner
putApi('getbanner', basePath_2 + 'banners/find/banner/date', '10005');

//晨起打卡卡片模板信息
putApi('getImage', basePath_2 + 'user/findUserImage', '10005');
export default api;