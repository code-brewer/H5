var api = {};
var basePath = 'vsu/'//打包时要注释掉
function putApi(name, url, code, method, contentType) {
	if(!method) {
		method = 'post';
	}
    api[name] = (context, body, fun) => {
        context.axios[method](url, getCreds(code, body))
				.then((back)=>{
					if (fun)
							fun(back)
				})
				.catch((err)=> {
            if(fun) {
                fun(err);
            }
        })
    }
}

function getCreds(proNo, body) {
    return {
        base: {
            proNo: proNo,
            reqTime: new Date().valueOf()
        },
        body: body
    }
}

//获取微信openID
putApi('start', basePath + 'start/returnMessage',10001,'post',false);




// 调用方式示例
// var body = {
// 	"jsurl": location.href.split('#')[0]
// };
// api.obtainJssdk(_this, body, (res)=> {
//
// });
export default api;
