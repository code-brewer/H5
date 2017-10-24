var api = {};

function putApi(name, url, method) {
    if (!method) {
        method = 'post';
    }
    api[name] = (context, body, fun) => {
        var obj = proxy(body, url);

        context.$http[method](basePath+'http/proxy', obj, (back) => {
            if (fun)
                fun(back)
        }).error((err) => {
            if (fun) {
                fun(err);
            }
        })

    }
}

// 获取热门分类
putApi('gethotshoptype', 'http://61.158.237.34/WoLife-MobileInterface/mobile/query/gethotshoptypebyarea.do');

// 获取商家分类
putApi('getShopTypeList', 'http://61.158.237.34/WoLife-MobileInterface/mobile/query/getShopTypeList.do');

// 号码查询
putApi('searchShopInfo', 'http://61.158.237.34/WoLife-MobileInterface/mobile/query/searchShopInfo.do');

// 获取商家电话
putApi('toShopInfoTel', 'http://61.158.237.34/WoLife-MobileInterface/mobile/query/toShopInfoTel.do');

// 获取地市列表接口（18地市列表）
putApi('getarea', 'http://61.158.237.34/WoLife-MobileInterface/mobile/main/getarea.do');

putApi('getaddressbylngb', 'http://lbs.juhe.cn/api/getaddressbylngb');


function proxy(body, url) {
    let obj = { 
        "method": "GET", 
        "pramslist": JSON.stringify(body),
        // "requrl": "http://61.158.237.34/WoLife-MobileInterface/mobile/query1/getShopTypeList.do" 
        "requrl": url
    }

    return obj;

}

export default api;
