var api = {};

function putApi(name, url, code, method, contentType) {
    if (!method) {
        method = 'post';
    }
    api[name] = (context, body, fun) => {
        var data = getCreds(code, body);
        context.$http[method](url, data, (back) => {
            if (fun)
                fun(back)
        }).error((err) => {
            if (fun) {
                fun(err);
            }
        })

    }
}

function getCreds(proNo, body) {
    return {
        base: {
            reqTime: new Date().format('yyyyMMddHHmmss'),
            proNo: proNo,
        },
        body: body
    }
}



// 示例
// putApi('signList', basePath + 'weixin/signList', '10000');
// putApi('find', basePath + 'goods/find', '6101');
// putApi('findbypage', basePath + 'goods/findbypage', '6102');
// putApi('login', basePath + 'goods/login', '6103');
// putApi('discount', basePath + 'coupons/find', '6104');
// putApi('findbyname', basePath + 'goods/findbyname', '6105');
// putApi('userinsert', basePath + 'user/userinsert', '6106');
// putApi('verify', basePath + 'user/index', '6107');
// putApi('update', basePath + 'user/update', '6108');
// putApi('update1', basePath + 'user/update1', '6109');
// putApi('phoneLogin', basePath + 'user/in', '6110');



putApi('login', basePath + 'user/login', '10002'); //登录
putApi('addUser', basePath + 'user/insert', '10001'); //添加管理员
putApi('userUpdate', basePath + 'user/update', '10003'); //管理员修改
putApi('userList', basePath + 'user/select', '6001'); //管理员列表
putApi('searchMessage', basePath + 'batchinfo/findbyplace', '10016');
putApi('area', basePath + 'batchinfo/findbydisti', '10017'); //地区接口
putApi('findnumber', basePath + 'batchinfo/findbykey', '10015'); //搜索
putApi('cancel', basePath + 'vip/upate', '6024'); //销户
putApi('findbyphone', basePath + 'dateil/findbyphone', '6026'); //查看明细
putApi('mk', basePath + 'vip/mk', '6028'); //查看明细
putApi('online', basePath + 'memuser/today', '10011'); //查看明细
putApi('log', basePath + 'batch/findbyday', '10009'); //操作日志
putApi('findbyplace', basePath + 'batchinfo/dis', '10022'); //根据地区查询

putApi('findbyopid', basePath + 'batchinfo/findbyid', '6101'); //根据地区查询
putApi('down1', basePath + 'dateil/down', '6101'); //根据地区查询

putApi('aloneOpen', basePath + 'memuser/insert', '10004'); //单开
putApi('aloneCancel', basePath + 'memuser/update', '10005'); //单开
putApi('aloneTrans', basePath + 'memuser/tobe', '10013'); //单开
putApi('phoneDetail', basePath + 'batchinfo/findbyphone', '10018'); //单开

putApi('level', basePath + 'memuser/phone', '10012'); //根据手机号码查询级别
putApi('userLevList', basePath + 'memuser/userLevList', '10012'); //业务升级



putApi('detail2Prevent', basePath + 'vip/down', '6101', 'get'); //下载



export default api;
