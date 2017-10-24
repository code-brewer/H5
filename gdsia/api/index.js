export default {
    // 上传文件,支持图片、视频、音频（视频MP4格式、音频MP3格式）
    upload(context,body, fun) {
        context.$http.post(basePath + 'upload/upVideoOrFile', getCreds('2014', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    
	// 退出
	logout(context,body, fun) {
		context.$http.post(basePath + 'manager/logout', getCreds('5010', body), (back) => {
            if (fun)
                fun(back)
        })
	},
    //获取一级菜单
   getNavigationList(context,body, fun) {
        context.$http.post(basePath + 'bg/getNavigationList', getCreds('1', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //修改菜单
    editNavigation(context,body, fun) {
        context.$http.post(basePath + 'bg/editNavigation', getCreds('2', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    getArticleByColumnId(context,body, fun) {
        context.$http.post(basePath + 'bg/getArticleByColumnId', getCreds('5', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //添加文章
    addArticle(context,body, fun) {
        context.$http.post(basePath + 'bg/addArticle', getCreds('8', body), (back) => {
            if (fun)
                fun(back)
        })
    },
     //获取文章
    getArticleById(context,body, fun) {
        context.$http.post(basePath + 'bg/getArticleById', getCreds('6', body), (back) => {
            if (fun)
                fun(back)
        })
    },
     //编辑文章
    editArticle(context,body, fun) {
        context.$http.post(basePath + 'bg/editArticle', getCreds('3', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    
    //删除文章，栏目
    deleteNavigationOrArticle(context,body, fun) {
        context.$http.post(basePath + 'bg/deleteNavigationOrArticle', getCreds('4', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //添加子栏目
    addNavigation(context,body, fun) {
        context.$http.post(basePath + 'bg/addNavigation', getCreds('7', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //获取产品坑位列表
    getNavigationListByRank(context,body, fun) {
        context.$http.post(basePath + 'bg/getNavigationListByRank', getCreds('1000', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //编辑产品坑位
    editNavigationRank(context,body, fun) {
        context.$http.post(basePath + 'bg/editNavigationRank', getCreds('1000', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //获取banner
    getBannerListByRank(context,body, fun) {
        context.$http.post(basePath + 'bg/getBannerListByRank', getCreds('1000', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //编辑banner
    editBanner(context,body, fun) {
        context.$http.post(basePath + 'bg/editBanner', getCreds('1000', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //编辑banner
    deleteBannerResource(context,body, fun) {
        context.$http.post(basePath + 'bg/deleteBannerResource', getCreds('1000', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //获取浮动菜单
    getFloatBannerList(context,body, fun) {
        context.$http.post(basePath + 'bg/getFloatBannerList', getCreds('1000', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //编辑浮动菜单
    editFloatBanner(context,body, fun) {
        context.$http.post(basePath + 'bg/editFloatBanner', getCreds('1000', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //编辑浮动菜单
    getFriendLinkList(context,body, fun) {
        context.$http.post(basePath + 'bg/getFriendLinkList', getCreds('1000', body), (back) => {
            if (fun)
                fun(back)
        })
    },
    //编辑浮动菜单
    editFriendLink(context,body, fun) {
        context.$http.post(basePath + 'bg/editFriendLink', getCreds('1000', body), (back) => {
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


