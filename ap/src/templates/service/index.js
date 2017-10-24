import utils from '../../utils'

var api = {};

// 奖品绑定领奖手机号
putApi('bindPrizeMobile', 'sms/bindPrizeMobile', '5004');

// 奖品绑定领奖手机号
putApi('newBindPrizeMobile', 'sms/newBindPrizeMobile', '2014');

// 登录
putApi('login', 'stat/login', '6002');

// 获取微信数字签名
putApi('obtainJssdk', 'stat/obtainJssdk', '6021');

// 获取微信数字签名 中音
putApi('wmObtainJssdk', 'stat/wmObtainJssdk', '6021');

// 当前用户活动得分排名
putApi('prizeScoreRankCursuser', 'activityCtrl/prizeScoreRankCursuser', '6008');

// 抽奖结果列表
putApi('prizeDrawResult', 'lucky/prizeDrawResult', '6006');

// 用户跑马灯抽奖
putApi('doLucky', 'lucky/doLucky', '6016');

// 查询用户参与记录
putApi('queryPartInfo', 'money/queryPartInfo', '7001');

// 分享加时
putApi('sharePlusTime', 'money/sharePlusTime', '7002');

// 保存积分
putApi('saveUserScore', 'money/saveUserScore', '7004');

// 查询某用户获奖情况（排名，积分）
putApi('getUserPrizeInfo', 'money/getUserPrizeInfo', '7005');

// 用户按日或总排名情况列表（昵称，排名，积分）
putApi('prizeScoreRank', 'money/awardRanking', '7007');

// 查询用户当天还可参与次数
putApi('getActUserTimes', 'stat/getActUserTimes', '8001');

// 查询抽奖奖项列表
putApi('getPrizeListByAid', 'lucky/getPrizeListByAid', '8003');

// 获取用户信息
putApi('getUserInfo', 'stat/getUserInfo', '7008');

// 校验用户领奖资格
putApi('isPrizeByUsid', 'accumulate/isPrizeByUsid', '9005');

// 查询用户绑定奖品信息
putApi('querySidByGid', 'stat/querySidByGid', '6023');

// 我的奖品列表
putApi('getLuckyUserPrizeInfo', 'stat/getLuckyUserPrizeInfo', '6017');

//10001集卡（自己集或者帮别人集)
putApi('addHelp', 'collectionCard/addHelp', '10001');

//10002用户当天是否助力
putApi('getUserAcumInfo', 'collectionCard/getUserAcumInfo', '10002');

//10003最近集卡列表
putApi('getUserAcumList', 'collectionCard/getUserAcumList', '10003');

//10004 校验用户领奖资格
putApi('isCardPrizeByUsid', 'collectionCard/isPrizeByUsid', '10004');

//10004 集卡领奖
putApi('addCardPrizeUserInfo', 'collectionCard/addPrizeUserInfo', '10005');

// 获取活动图片列表和用户已经获得的图片列表
putApi('getCardList', 'collectionCard/getCardList', '10006');

//9001集赞（助力或砍一刀）
putApi('acAddHelp', 'accumulate/addHelp', '9001');

//9002用户集赞数
putApi('acGetUserAcumNum', 'accumulate/getUserAcumNum', '9002');

//9003用户当天是否助力
putApi('acGetUserAcumInfo', 'accumulate/getUserAcumInfo', '9003');

//9004最近集赞列表
putApi('acGetUserAcumList', 'accumulate/getUserAcumList', '9004');

//9006 领奖
putApi('addPrizeUserInfo', 'accumulate/addPrizeUserInfo', '9006');

//9007 查询剩余集赞(或助力或砍价)数量
putApi('getUserAcumInfo', 'accumulate/getUserAcumInfo', '9007');

//20002 保存答题
putApi('saveQuest', 'quest/saveQuest', '20002');

//20001 查询题目列表
putApi('getQuestList', 'quest/getList', '20001');

//30001得分模板查询用户是否有领奖资格
putApi('pubScoreIsPrizeByUsid', 'stat/pubScoreIsPrizeByUsid', '30001');

//30002得分模板领奖(去领奖按钮)
putApi('pubScoreGetPrizeInfo', 'stat/pubScoreGetPrizeInfo', '30002');

//30003保存得分（仅限前端算分数并且不进行排名的模板使用）
putApi('addPubScore', 'stat/addPubScore', '30003');

//40001 拆红包
putApi('open', 'redpack/open', '40001');

//40002 已抢到红包人数
putApi('grabNum', 'redpack/grabNum', '40002');

//40003 查询抢中红包用户列表
putApi('grabUserList', 'redpack/grabUserList', '40003');

//查看活动当前剩余奖品
putApi('getSurPlusPrize', '/lucky/getSurPlusPrize', '70007');

//获取活动参与人数
putApi('getActivityUv', '/accumulate/getActivityUv', '70006');

//新抽奖接口
putApi('doLucky', 'lucky/newDoLucky', '70005');

//查询用户剩余抽奖次数（每天）
putApi('queEveryDay', 'lucky/newQueEveryDay', '70004');

//猜歌活动保存通关记录
putApi('saveClearanceRecord', 'olympic/saveClearanceRecord', '9005');

//猜歌活动获取领奖信息
putApi('luckyGetUserPrizeInfo', 'lucky/getUserPrizeInfo', '7005');

// 发送手机短信(验证码,或者其他短信内容) pe平台
putApi('sendPeVerifyCode', 'sms/sendPeVerifyCode', '70003');
putApi('sendLoginVerifyCode', 'sms/sendLoginVerifyCode', '5005');

// 手机登录
putApi('mobileLogin', 'user/mobileLogin', '70001')

/**
 * 用户登录记录
 */
putApi('loginLog', 'user/loginLog', '70002')

/**
 * 统计 
 * @param {gateModel} 按钮名称
 * @param {channelld} 渠道号
 * @param {browserClient} 浏览器代理 
 */
putApi('pvLog', 'acceptLog/pvLog', '70008')

// 新模板接口
// 是否会员cookie = cn.easier.gsu.tone.user
// 是否具有炫铃功能cookie = cn.easier.gsu.ring.member

/**
 * 用户订购铃音盒（pe平台） 
 * @param {toneType} // 1是单条铃音，2是另铃音盒
 * @param {toneId} 产品id
 * @param {pe_appid} xxxx 
 * @param {pe_appkey} xxxx 
 */
putApi('buyTone', 'song/buyTone', '60001')

/**
 * 用户开通炫铃能力（pe平台） 
 * @param {pe_appid} xxxx 
 * @param {pe_appkey} xxxx 
 */
putApi('openRingAccount', 'song/openRingAccount', '60002')

export function putApi(name, url, code, method) {
    if(!method) {
        method = 'post';
    }

    api[name] = (context, body, fun) => {
        if(body){
            body.isWx = isW;
        }
        context.$http[method](basePath + url, getCreds(code, body), (back) => {
            if (fun)
                fun(back)
        })
        .error((err)=> {
            if(fun) {
                var obj = {
                    resCode: '500',
                    resMsg: '网络错误'
                }
                fun(obj);
            }
        })

    }
}

export var getCreds = function(proNo, body) {
	return {
        base: {
            reqTime: utils.formatDate(),
            proNo: proNo,
        },
        body: body
    }
}

export default api;