var api = {};

//获取个人信息
putApi('personInfo', 'personal/get', '30001');

//获取主题信息
putApi('activitiesInfo', 'index/get', '10004');

//获取帖子列表
putApi('getpostList', 'issue/page', '40004');


//发帖
putApi('addissue', 'issue/add', '40001');

//帖字详情
putApi('getissue', 'issue/get', '40002');

//添加评论
putApi('addComment', 'comments/add', '500011');

//对评论点赞
putApi('addpraise', 'praise/add', '70001');

//我的发帖
putApi('getmypost', 'personal/mypost1', '80001');

//删除我的帖子
putApi('delmypost', 'issue/update', '40003');

//我的参与
putApi('myparticipate', 'personal/myparticipate1', '80003');

//我的信息
putApi('mymessage', 'personal/mymessage1', '80002');

//統計浏览量
putApi('addbrowse', 'browse/add', '90001');

//删除评论
putApi('delcomment', 'comments/delete', '500013');

//添加帖子点赞 和 添加评论点赞
putApi('addtimes', 'issues/add', '500012');

//微信签名
putApi('getJsSign', 'getJsSign', '000000','get');

//只查看楼主
putApi('gethost', 'issue/gethost', '40007');

//查看主题是否存在
putApi('exist', 'issue/exist', '40008');

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
    if (proNo === '000000'){
        return body;
    }
    return {
        base: {
            reqTime: formatDate(),
            proNo: proNo,
        },
        body: body
    }
}
function formatDate(date, format) {

    if(!date) date = new Date();
    if(!format) format = 'yyyyMMddHHmmss';

    var year = date.getFullYear(),
    months = (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1),
    days = (date.getDate() > 9 ? '' : '0') + date.getDate(),
    hours = (date.getHours() > 9 ? '' : '0') + date.getHours(),
    minutes = (date.getMinutes() > 9 ? '' : '0') + date.getMinutes(),
    secounds = (date.getSeconds() > 9 ? '' : '0') + date.getSeconds();


    format = format.replace(/yyyy/, year);
    format = format.replace(/MM/, months);
    format = format.replace(/dd/, days);
    format = format.replace(/HH/, hours);
    format = format.replace(/mm/, minutes);
    format = format.replace(/ss/, secounds);

    return format;  
}

export default api;