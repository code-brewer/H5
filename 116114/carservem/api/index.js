export default {


    //登录接口
    login(context,body, fun) {
        context.$http.post(basePath + 'manager/login', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })

    },
    //短信,发送短信接口
    send(context,body, fun) {
        context.$http.post(basePath + 'message/send', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //短信,添加模板接口
    add(context,body, fun) {
        context.$http.post(basePath + 'message/add', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    
    //短信,上传接口
    // import(context,body, fun) {
    //     context.$http.post(basePath + '/file/import', getCreds('1111',body), (back) => {
    //         if (fun)
    //             fun(back)
    //     })
    // },
      //短息，读取模板接口
    
    //违章查询,查询
    search(context,body, fun) {
        context.$http.post(basePath + 'car/search', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //违章查询,查看
    find(context,body, fun) {
        context.$http.post(basePath + 'car/find', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //数据查询
    loaddata(context,body, fun) {
        context.$http.post(basePath + 'log/load', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },

    
    //开户管理,获取汽车信息
    getCarsByUser(context,body, fun) {
        context.$http.post(basePath + 'account/getCarsByUser', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //添加用户车辆
    save(context,body, fun) {
        context.$http.post(basePath + 'car/save', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //单个开户
    register(context,body, fun) {
        context.$http.post(basePath + 'account/register', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //单个销户
    cancle(context,body, fun) {
        context.$http.post(basePath + 'account/cancle', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //批量开户
    registerAll(context,body, fun) {
        context.$http.post(basePath + 'account/registerAll', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //批量销户
    cancleAll(context,body, fun) {
        context.$http.post(basePath + 'account/cancleAll', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //会员管理
    select(context,body, fun) {
        context.$http.post(basePath + 'car/select', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
     //上传excel
    import(context,body, fun) {
        context.$http.post(basePath + 'file/import', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
     //查看付费情况
    loadAgentlog(context,body, fun) {
        context.$http.post(basePath + 'log/loadAgentlog', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
     //查看订购情况
    loadServelog(context,body, fun) {
        context.$http.post(basePath + 'log/loadServelog', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
     //4g用户车辆保存
    registerfour(context,body, fun) {
        context.$http.post(basePath + 'account/register4G', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
     //筛选日志文件
    logfileSelect(context,body, fun) {
        context.$http.post(basePath + 'logfile/select', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
     //筛选开户信息
    getAccountUsers(context,body, fun) {
        context.$http.post(basePath + 'user/getAccountUsers', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },







    //开户管理,发送短信
    sendCode(context,body, fun) {
        context.$http.get(basePath + 'message/sendCode', body, (back) => {
            if (fun)
                fun(back)
        })
    },

    //短信,删除模板接口
    del(context,body, fun) {
        context.$http.get(basePath + 'message/del',body, (back) => {
            if (fun)
                fun(back)
        })
    }, 
    load(context,body, fun) {
        context.$http.get(basePath + 'message/load',body, (back) => {
            if (fun)
                fun(back)
        })
    },
    //下载日志
    download(context,body, fun) {
        context.$http.get(basePath + 'logfile/download',body, (back) => {
            if (fun)
                fun(back)
        })
    },
     //导出用户开户状态表
    getExport(context,body, fun) {
        context.$http.get(basePath + 'user/export', getCreds('1111',body), (back) => {
            if (fun)
                fun(back)
        })
    },
  
    
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

