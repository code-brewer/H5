
var api = {};

function putApi(name, url, code, method, contentType) {
	if(!method) {
		method = 'post';
	}
    api[name] = (context, body, fun) => {
        var data = getCreds(code, body);
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



putApi('login', basePath + 'admin/login', '6020');//登录
putApi('addUser', basePath + 'admin/insert', '6121');//添加管理员
putApi('userUpdate', basePath + 'admin/update', '6121');
putApi('userList', basePath + 'admin/list', '6001');
putApi('searchMessage', basePath + 'vip/findbypage', '6022');
putApi('area', basePath + 'vip/disty', '6025');//地区接口
putApi('findnumber', basePath + 'vip/findnumber', '6024');//搜索
putApi('cancel', basePath + 'vip/upate', '6024');//销户
putApi('findbyphone', basePath + 'dateil/findbyphone', '6026');//查看明细
putApi('mk', basePath + 'vip/mk', '6028');//查看明细
putApi('online', basePath + 'vip/find', '6101');//查看明细
putApi('log', basePath + 'daily/find', '6101');//操作日志
putApi('findbyplace', basePath + 'vip/findbyplace', '6101');//根据地区查询

putApi('findbyopid', basePath + 'dateil/findbyopid', '6101');//根据地区查询
putApi('down1', basePath + 'dateil/down', '6101');//根据地区查询



putApi('detail2Prevent', basePath + 'vip/down', '6101','get');//下载


export default api;