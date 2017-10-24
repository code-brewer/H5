var api = {};
// var basePath = 'vsu/'//打包时要注释掉
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
//保存视频数据
putApi('insert', basePath + 'vsdisinfo/insert',10001,'post',false);
//百分比
putApi('getAchievement', basePath + 'vsdisinfo/getAchievement',10001,'post',false);
//登录参与
putApi('login', basePath + 'login/index',10001,'post',false);
//获取视频列表
putApi('vsdisinfo', basePath + 'vsdisinfo/listVideo',10001,'post',false);
//判断是否联通号码
putApi('checkPhone', basePath + 'login/checkPhone',10001,'post',false);
//获取数字签名
putApi('obtainJssdk', basePath + 'start/obtainJssdk',10001,'post',false);
//获取100m流量
putApi('getPrize', basePath + 'registerInfo/getPrize',10001,'post',false);
//摇一摇抽500m流量
putApi('prize', basePath + 'prize/getPrize',10001,'post',false);
//华为评分接口
putApi('getPhpInfo', basePath + 'prize/getPhpInfo',10001,'post',false);
//保存用户评分接口
putApi('updateGrede', basePath + 'vsdisinfo/updateGrede',10001,'post',false);
//保存用户操作的其他数据
putApi('insertInfo', basePath + 'vsdisinfo/insertInfo',10001,'post',false);
// 调用方式示例
// var body = {
// 	"jsurl": location.href.split('#')[0]
// };
// api.insertInfo(_this, body, (res)=> {
//
// });
export default api;
