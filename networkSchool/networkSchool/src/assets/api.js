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
// putApi2('delUser', basePath + 'lessonEnroll/delLessonEnroll',6005) //获取课程学堂已报名用户列表
putApi2('addLessonEnroll', basePath + 'lessonEnroll/addLessonEnroll',6005) //获取课程学堂已报名用户列表
putApi2('addSuggest', basePath + 'suggest/addSuggest',6005) //意见建议列表
putApi2('getLessonNetList', basePath + 'lessonNet/getLessonNetList',6005) //网络学堂列表
putApi2('getModuleList', basePath + 'module/getModuleList',6005) //帖子模块列表
putApi2('addPostLog', basePath + 'postLog/addPostLog',6005) //插入帖子浏览量
putApi2('addPost', basePath + 'post/addPost',6005) //发帖
putApi2('getAdvertisementList', basePath + 'advertisement/getAdvertisementList',6005) //广告位接口
// putApi2('list', basePath + 'page/list',6005) //帖子列表
putApi('list', basePath + 'page/list');//帖子列表
putApi2('getGoodPostList', basePath + 'post/getGoodPostList');//帖子列表
putApi2('likePost', basePath + 'post/likePost');//点赞
putApi2('likeList', basePath + 'like/getUserLikeList');//点赞列表
putApi2('rspPost', basePath + 'postRsp/rspPost');//回帖


export default api;