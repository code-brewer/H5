var api = {};
putApi('msgCode', 'message/msgCode', '1111','get');
putApi('login', 'user/login', '1111');
putApi('carBind', 'car/bind', '1111');
putApi('getCarsByUser', 'car/getCarsByUser', '1111');
putApi('carSearch', 'car/search', '1111');
putApi('carSaveInf', 'car/saveInf', '1111');
putApi('checkphone', 'phone/checkphone', '1111','get');
putApi('account', 'user/account', '1111');
putApi('carDel', 'car/del', '1111','get');
putApi('clickAdd', 'click/add', '1111','get');
putApi('carHandle', 'car/handle', '1111');



function putApi(name, url, code, method) {
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
                        resCode: '500',
                        resMsg: '网络错误'
                    }
                    fun(obj);
                }
            })
        }else{
            context.$http[method](basePath + url, getCreds(code, body), (back) => {
                if (fun)
                    fun(back)
            })
            .error((err)=> {
                if(fun) {
                    var obj = {
                        resCode: '500',
                        resMsg: '网络错误'
                    }
                    fun(obj);
                }
            })
        }
        

    }
}

function getCreds(proNo, body) {
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