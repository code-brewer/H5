export default {

    //post请求
    //登录接口
    login(context,body, fun) {
        context.$http.post(basePath + 'manager/login', getCreds('20001',body), (back) => {
            if (fun)
                fun(back)
        })

    },
    //退出接口
    loginout(context,body, fun) {
        context.$http.post(basePath + 'manager/logout', getCreds('20002',body), (back) => {
            if (fun)
                fun(back)
        })

    },
    // 标题搜索接口
    search(context,body, fun) {
        context.$http.post(basePath + 'index/search', getCreds('10006',body), (back) => {
            if (fun)
                fun(back)
        })
      },
    //首页的删除和修改，上线下线
    domore(context,body, fun) {
        context.$http.post(basePath + 'index/update', getCreds('10003',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //首页分页查询
    page_search(context,body, fun) {
        context.$http.post(basePath + 'index/page', getCreds('10005',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //首页的添加景点
    home_add(context,body, fun) {
        context.$http.post(basePath + 'index/add', getCreds('10002',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //审贴 查询
    issue(context,body, fun) {
        context.$http.post(basePath + 'issue/search', getCreds('40005',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //帖子详情修改删除
    update(context,body, fun) {
        context.$http.post(basePath + 'issue/update', getCreds('40006',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //40006 后台查看单个帖子详情
    getback(context,body, fun) {
        context.$http.post(basePath + 'issue/getback', getCreds('40006',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //10007 上下线
    online(context,body, fun) {
        context.$http.post(basePath + 'index/online', getCreds('10007',body), (back) => {
            if (fun)
                fun(back)
        })
    }











};


function getCreds(proNo, body) {
	return {
        base: {
            reqTime: now(),
            proNo: proNo,
        },
        body: body
    }
}

function now() {
    var date = new Date(),
    	year = date.getFullYear(),
    	months = (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1),
    	days = (date.getDate() > 9 ? '' : '0') + date.getDate(),
    	hours = (date.getHours() > 9 ? '' : '0') + date.getHours(),
    	minutes = (date.getMinutes() > 9 ? '' : '0') + date.getMinutes(),
    	secounds = (date.getSeconds() > 9 ? '' : '0') + date.getSeconds();


    return ('' + year + months + days + hours + minutes + secounds);
}
