var api = {};

function putApi(name, url, method) {
	if(!method) {
		method = 'get';
	}
    api[name] = (context, body, fun) => {
        context.$http[method](url, body, (back) => {
            if (fun)
                fun(back)
        }).error((err)=> {
            if(fun) {
                fun(err);
            }
        })

    }
}

// 登录
putApi('priceLogin', basePath + 'order!priceLogin', 'get');

// 获取验证码
putApi('getMsgCode', basePath + 'member!getMsgCodeCOde');

// 抽奖
putApi('getPrize', basePath + 'order!getPrize');

// 获取抽奖次数
putApi('getUserCount', basePath + 'order!getUserCount');

export default api;