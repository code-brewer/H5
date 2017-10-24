
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
putApi('find', basePath + 'goods/find', '6101');
putApi('findbypage', basePath + 'goods/findbypage', '6102');
putApi('login', basePath + 'goods/login', '6103');
putApi('discount', basePath + 'coupons/find', '6104');
putApi('findbyname', basePath + 'goods/findbyname', '6105');
putApi('userinsert', basePath + 'user/userinsert', '6106');
putApi('verify', basePath + 'user/index', '6107');
putApi('update', basePath + 'user/update', '6108');
putApi('update1', basePath + 'user/update1', '6109');
putApi('phoneLogin', basePath + 'user/in', '6110');

export default api;