var api = {};
putApi('msgCode', 'code/send','get');
putApi('login', 'user/waplogin');
putApi('isGuide', 'guide/isGuide','get');
putApi('getCategory', 'category/getCategory','get');
putApi('getActivity', 'activity/getActivity','get');
putApi('getGroup', 'group/getGroupByGuide','get');
putApi('getVotes', 'vote/getVotes','get');
putApi('delVote', 'vote/delVote','get');
putApi('getVoteitems', 'vote/getVoteitems','get');
putApi('saveVote', 'vote/saveVote');
putApi('getVoteDetail', 'vote/getVoteDetail','get');
putApi('getActivityByGroup', 'activity/getActivityByGroup','get');
putApi('addBallot', 'ballot/addBallot','get');
putApi('createVoteitem', 'vote/createVoteitem');
putApi('isCanJoin', 'vote/isCanJoin','get');
putApi('getJsSign', 'wechat/getJsSign','get');


function putApi(name, url, method) {
    if(!method) {
        method = 'post';
    }

    api[name] = (context, body, fun) => {
        if(method == 'get'){
            context.$http[method](basePath + url + body, (back) => {
                if (fun)
                    fun(back)
            })
            .error((err)=> {
                if(fun) {
                    var obj = {
                        code: '500',
                        description: '出错啦'
                    }
                    fun(obj);
                }
            })
        }else{
            context.$http[method](basePath + url,body, (back) => {
                if (fun)
                    fun(back)
            })
            .error((err)=> {
                if(fun) {
                    var obj = {
                        code: '500',
                        description: '出错啦'
                    }
                    fun(obj);
                }
            })
        }
        

    }
}

// function getCreds(proNo, body) {
//     return {
//         base: {
//             reqTime: formatDate(),
//             proNo: proNo,
//         },
//         body: body
//     }
// }
// function formatDate(date, format) {

//     if(!date) date = new Date();
//     if(!format) format = 'yyyyMMddHHmmss';

//     var year = date.getFullYear(),
//     months = (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1),
//     days = (date.getDate() > 9 ? '' : '0') + date.getDate(),
//     hours = (date.getHours() > 9 ? '' : '0') + date.getHours(),
//     minutes = (date.getMinutes() > 9 ? '' : '0') + date.getMinutes(),
//     secounds = (date.getSeconds() > 9 ? '' : '0') + date.getSeconds();


//     format = format.replace(/yyyy/, year);
//     format = format.replace(/MM/, months);
//     format = format.replace(/dd/, days);
//     format = format.replace(/HH/, hours);
//     format = format.replace(/mm/, minutes);
//     format = format.replace(/ss/, secounds);

//     return format;  
// }

export default api;