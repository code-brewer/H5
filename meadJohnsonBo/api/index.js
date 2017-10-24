var api = {};
function getCreds(proNo, body) {
    return {
        base: {
            reqTime: now(),
            proNo: proNo,
        },
        body: body
    }
}

function now() {
    var date = new Date(),
        year = date.getFullYear(),
        months = (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1),
        days = (date.getDate() > 9 ? '' : '0') + date.getDate(),
        hours = (date.getHours() > 9 ? '' : '0') + date.getHours(),
        minutes = (date.getMinutes() > 9 ? '' : '0') + date.getMinutes(),
        secounds = (date.getSeconds() > 9 ? '' : '0') + date.getSeconds();


    return ('' + year + months + days + hours + minutes + secounds);
}
function putApi(name, proNo, url, method) {
	if(!method) {
		method = 'post';
	}
    
    api[name] = (context, body, fun) => {
        context.$http[method](url, getCreds(proNo, body), (back) => {
            if (fun)
                fun(back)
        }).error((err)=> {
            if(fun) {
                fun(err);
            }
        })

    }
}

//获取订单列表
putApi('getDakaList', '2014', basePath + 'admin/weixin/getUserList');

//获取用户打卡记录
putApi('getDakaRecord', '2014', basePath + 'admin/weixin/getUserSignRecord');

//审核页面获取用户列表
putApi('getUserList', '2014', basePath + 'admin/shop/getUserList');

//获取用户订单列表
putApi('getOrderList', '2014', basePath + 'admin/shop/getOrderList');

//获取用户订单列表
putApi('getUserOrder', '2014', basePath + 'admin/shop/getUserOrder');

//获取用户订单详情
putApi('getOrderDetail', '2014', basePath + 'admin/shop/getOrderDetail');

//获取用户订单详情
putApi('userOrderDetail', '2014', basePath + 'admin/shop/userOrderDetail');

//
putApi('examineOrder', '2014', basePath + 'admin/shop/examineOrder');

//打款
putApi('payOrder', '2014', basePath + 'admin/shop/payOrder');

//获取滚动信息
putApi('getRollList', '6001', basePath + 'rollinfo/getlist');

//创建、修改滚动信息
putApi('updateRollMes', '6002', basePath + 'rollinfo/add');

//删除滚动信息
putApi('deleteRollMes', '6003', basePath + 'rollinfo/del');

// //获取banner
// putApi('getBanner', '6101', basePath + 'banner/getlist');

// //新增banner
// putApi('addBanner', '6102', basePath + 'banner/add');

// //删除banner
// putApi('delBanner', '6103', basePath + 'banner/del');

// //排序banner
// putApi('moveBanner', '6104', basePath + 'banner/move');

//获取用户信息
putApi('getUserListUpgrade', '7001', basePath + 'admin/weixin/getUserListUpgrade');

//获取渠道  贝壳币和成长值来源  会员等级的下拉列表
putApi('getTypeList', '7002', basePath + 'admin/getTypeList');

//获取用户贝壳币和成长值列表
putApi('getScoreIntegralList', '7003', basePath + 'admin/weixin/getScoreIntegralList');

//获取用户贝壳币和成长值
putApi('queryUserInfo', '7004', basePath + 'admin/weixin/queryUserInfo');

//获取用户个人档案信息
putApi('queryUserFile', '7005', basePath + 'admin/weixin/queryUserFile');

//更新用户个人档案信息
putApi('updateUserFile', '7006', basePath + 'admin/weixin/updateUserFile');

//是否拉黑用户
putApi('updateUserLS', '7006', basePath + 'admin/weixin/updateUserLS');

//新增或者更新礼品信息
putApi('updateGift', '8001', basePath + 'gift/addOrUpdate');

//获取礼品列表
putApi('getGiftList', '8002', basePath + 'gift/getlist');

//排序礼品列表
putApi('moveGift', '8003', basePath + 'gift/move');

//删除礼品
putApi('delGift', '8004', basePath + 'gift/del');

//获取礼品类型下拉列表
putApi('getGiftType', '8005', basePath + 'giftType/typeList');

//获取礼品兑换订单列表
putApi('getExchangeList', '8006', basePath + 'gift/getExchangeList');

//更新礼品订单的地址和物流信息
putApi('updateAddrLogistics', '8007', basePath + 'gift/updateAddrLogistics');

//获取对应礼品类型的产品资源id下拉列表
putApi('getProductidList', '8010', basePath + 'giftType/productidList');

//打卡记录列表
putApi('cardsignlist', '7009', basePath + 'admin/weixin/cardsignlist');

//打卡记录某天详情
putApi('cardsigndetail', '7010', basePath + 'admin/weixin/cardsigndetail');

//满三抽奖详情
putApi('shareLotteryNum', '7011', basePath + 'admin/weixin/shareLotteryNum');

//用户邀请某天的好友列表
putApi('shareFriendDetailList', '7012', basePath + 'admin/weixin/shareFriendDetailList');

//用户某天抽奖列表
putApi('shareFriendLotteryDetailList', '7013', basePath + 'admin/weixin/shareFriendLotteryDetailList');

//添加内容
putApi('addpush', '10013', basePath_3 + 'cmc/add/cardModel');

//更新内容
putApi('updatepush', '10014', basePath_3 + 'cmc/update/cardModel');

//查找内容
putApi('findpush', '10002', basePath_3 + 'cmc/find/cardModel');

//查找模板
putApi('listpush', '10015', basePath_3 + 'cmc/list/cardModel');

//查询某月已有4套模板的日期
putApi('getmonth', '10016', basePath_3 + 'cmc/month/cardModel');

/**
 * 团购接口
 */
//添加活动
putApi('addActivity', '10001', basePath_3 + 'activity/add');

//更新活动
putApi('updateActivity', '10002', basePath_3 + 'activity/update');

//某一活动详情
putApi('findActivity', '10002', basePath_3 + 'activity/find');

//删除某一活动
putApi('deleteActivity', '10002', basePath_3 + 'activity/delete');

//分页获取活动列表
putApi('findPageActivity', '10006', basePath_3 + 'activity/find/page');

//分页获取可退款订单
putApi('orderRefund', '10003', basePath_3 + 'activity/find/order/refund');

//上传图片
putApi('uploadimage', '10003', basePath_3 + 'resource/upload/image');

//订单列表
putApi('findOrders', '10005', basePath_3 + 'activity/find/groupOrders');

//添加订单描述
putApi('addOrderRemark', '10005', basePath_3 + 'activity/add/orderRemark');

//查找订单描述
putApi('findOrderRemark', '10005', basePath_3 + 'activity/find/orderRemark');

//导出活动列表
putApi('excel', '', basePath_3 + 'activity/out/excel/activity');

//获取收货地址
putApi('findAddress', '10005', basePath_3 + 'activity/find/address');
//获取订单详情
putApi('orderDetail', '10005', basePath_3 + 'activity/order/detail');
//退款订单
putApi('orderRefund', '10003', basePath_3 + 'activity/create/refund');
//退款订单
putApi('auditRefund', '10005', basePath_3 + 'activity/audit/order/refund');

//退款订单
putApi('excelcheck', '10005', basePath_3 + 'activity/check/excel/orderNo');

/**
 * banner管理
 */
//添加banner
putApi('addBanner', '10005', basePath_3 + 'banners/add/banner');
//更新banner
putApi('updateBanner', '10005', basePath_3 + 'banners/update/banner');
//删除banner
putApi('delBanner', '10005', basePath_3 + 'banners/delete/banner');
//获取banner
putApi('getBanner', '10005', basePath_3 + 'banners/find/banner/date');
//查询某月已有3个banner的日期
putApi('findBanner', '10005', basePath_3 + 'banners/find/banner/month');

/**
 * banner素材库
 */
//分页获取素材
putApi('getBannerM', '10005', basePath_3 + 'materials/find/material/page');

//获取素材
putApi('findBannerM', '10005', basePath_3 + 'materials/find/material');

//删除素材
putApi('delBannerM', '10005', basePath_3 + 'materials/delete/material');

//更新素材
putApi('updateBannerM', '10005', basePath_3 + 'materials/update/material');

//添加素材
putApi('addBannerM', '10005', basePath_3 + 'materials/add/material');
export default api;