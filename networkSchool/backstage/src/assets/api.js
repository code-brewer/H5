import utils from './DateUtils.js'

var api = {};

function putApi(name, url, code, method, contentType) {
	if(!method) {
		method = 'post';
	}
    api[name] = (context, options, fun) => {
        // var data = contentType ? formData(body) : getCreds(code, body);
        context.$http[method](url, options).then((res)=>{
            if (fun) {
                fun(res.data)
            }
        })
        // .error((err)=> {
        //     if(fun) {
        //         fun(err);
        //     }
        // })

    }
}
function putApi2(name, url, code, method, contentType) {
    if(!method) {
        method = 'post';
    }
    api[name] = (context, body, fun) => {
        var data =  getCreds( code,body) 
        context.$http[method](url, data ).then((res)=>{
            if (fun) {
                fun(res.data)
            }
        })
    }
}


function formData(data) {
    var arr = [];
    for(let i in data){
        arr.push(i + '=' + data[i]);
    }
    return arr.join('&');
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

// 打卡列表
// putApi1('signList', basePath + 'weixin/signList');
putApi('userList', basePath + 'page/list',1001) //获取用户列表
putApi2('delUser', basePath + 'lessonEnroll/delLessonEnroll',6005) //获取课程学堂已报名用户列表
putApi2('delOrSetGoodSuggest', basePath + 'suggest/delOrSetGoodSuggest',6005) //删除或置顶意见建议
putApi2('delOrSetGoodPost', basePath + 'post/delOrSetGoodPost',6005) //删除或设为精华帖子
putApi2('login', basePath + 'magUser/login',6005) //登录
putApi2('loginOut', basePath + 'magUser/loginOut',6005) //登录
putApi2('getAdvertisementList', basePath + 'advertisement/getAdvertisementList',6005) //网络学堂广告位列表
putApi2('AddOrUpdateAdvertisement', basePath + 'advertisement/AddOrUpdateAdvertisement',6005) //新增、修改广告位信息
putApi2('delAdvertisement', basePath + 'advertisement/delAdvertisement',6005) //删除广告位信息
putApi2('getLessonNetListM', basePath + 'lessonNet/getLessonNetListM',6005) //删除广告位信息
putApi2('delLessonNet', basePath + 'lessonNet/delLessonNet',6005) //删除视频或者ppt
export default api;