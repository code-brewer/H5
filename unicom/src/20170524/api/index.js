var api = {};

/**
 * 通用字段值说明
 * aid: 页面ID
 * source: 渠道标识
 */

/**
 * 登录接口
 * params:
 *     mobile: '', //*手机号码
 *     code: '', //*验证码
 *     types: '' //H5游戏标题
 *     source: ''
 */
putApi('login', 'tone/loginForH5', '2014');
/**
 * 发送登录短信验证码
 * params:
 *     mobile: '', //*手机号码
 */
putApi('sendLoginCode', 'user/sendLoginCode', '2010');
/**
 * 查询我的奖品
 */
putApi('getMyPrizeDrawResult', 'lucky/newQueMyPrizeDrawResult', '2006');
/**
 * 查询所有奖品
 */
putApi('getPrizeDrawResult', 'lucky/newQuePrizeDrawResult', '2005');
/**
 * 判断是否有炫铃能力
 * params:
 *     accessToken: '', //*accessToken
 */
putApi('findUserBasInfo', 'tone/findUserBasInfo', '2014');
/**
 * 开通会员
 * params:
 *     aid: '',
 *     source: ''
 */
putApi('openMemberByNet', 'tone/openMemberByNet', '2014');
/**
 * 判断是否有炫铃能力
 * params:
 *     accessToken: ''
 */
putApi('findUserBasInfo', 'tone/findUserBasInfo', '2014');
/**
 * 开通炫铃能力
 * params:
 *     accessToken: ''
 */
putApi('qryUserBasInfo', 'tone/qryUserBasInfo', '2014');
/**
 * 订购炫铃
 * params:
 *     aid: '',
 *     toneID: '',
 *     toneType: '',
 *     source: '',
 *     accessToken: ''
 * 返回数据:
 *     resCode: 状态值 //0: 未开通; 10001: 已开通;
 */
putApi('buyTone', 'tone/buyTone', '2014');
/**
 * 抽奖
 */
putApi('doLucky', 'lucky/newDoLucky', '2014');
/**
 * 获取抽奖机会
 */
putApi('queEveryDay', 'lucky/newQueEveryDay', '2004');
/**
 * 增加抽奖机会
 */
putApi('saveClearanceRecord', 'olympic/saveClearanceRecord', '2014');
/**
 * 获取收货地址
 */
putApi('getMyAddr', 'lucky/myAddr', '2014');
/**
 * 修改收货地址
 * params:
 *     gid: '', //奖品ID
 *     cusid: '', //未知
 *     addr: '', //地址
 *     username: '', //姓名
 *     mobile: '' //手机号码
 */
putApi('editMyAddr', 'lucky/editMyAddr', '2014');
/**
 * 数据统计
 * params:
 *     aid: '',
 *     type: '', //sign: 统计PV,UV; button: 统计按钮点击
 *     button_name: '', //当type是button时，传按钮名称
 *     source: ''
 */
putApi('addOperLog', 'statistical/addChannelLog', '3012');



function putApi(name, url, code, method) {
    if (!method) {
        method = 'post';
    }
    api[name] = (context, body, fun) => {
        let _root = context;
        while (_root.$el.id != 'wrap') {
            _root = _root.$parent;
        };

        context.$http[method](basePath + url, getCreds(code, body)).then((back) => {
            if (typeof fun === 'function') {
                fun.call(context, back.data);
            }
        }, (err) => {
            let errorText = '';
            switch (err.status) {
                case 404:
                    errorText = '找不到方法';
                    break;
            }
            if (errorText) {
                _root.$emit('showError', errorText);
            }
        })
    }
}

function getCreds(proNo, body) {
    return {
        base: {
            reqTime: '',
            proNo: proNo,
        },
        body: body
    }
}

export default api;
