import utils from '../utils/index.js'

var api = {};

/*
查询当前登录用户信息
 */
putApi('getUserInfo', 'web/user/getUserInfo', '50003');

/*
获取微信数字签名
 */
putApi('obtainJssdk', 'web/user/obtainJssdk', '50004');

/*
查询主题插件
 */
putApi('selectPluByMoid', 'web/act/selectPluByMoid', '60001');

/*
根据aid查询活动详情
 */
putApi('selectInfoByAid', 'web/act/selectInfoByAid', '60002');

/*
根据aid查询活动详情
 */
putApi('openredpack', 'web/act/openredpack', '60003');

/*
根据微信mediaId上传图片
 */
putApi('uploadFileByMediaId', 'web/upload/uploadFileByMediaId', '50000');

/*
查询游戏榜单
 */
putApi('getRankList', 'web/act/rankList', '60004');

/*
查询用户参与纪录
 */
putApi('getMyRecord', 'web/act/myRecord', '60005');



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