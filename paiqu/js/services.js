/*==========================
=            服务            =
==========================*/
angular.module('starter.services', ['ngResource'])


/*==========  传图片流生成gif文件  ==========*/
.factory('uploadGif', function($resource) {
    return $resource('upload.php', {}, {
        query: {
            method: 'post',
            isObject: true
        }
    });
})
/*==========  End of 传图片流生成gif文件  ==========*/

/*==========  微信图片上传  ==========*/
.factory('wxUpload', function($resource) {
    return $resource('wx_upload.php', {}, {
        query: {
            method: 'get',
            isObject: true
        }
    });
})
/*==========  End of 微信图片上传  ==========*/

/*==========  加载模板Json  ==========*/
.factory('loadTpl', function($resource) {
    return $resource('templates/:tplName/info.json', {}, {
        query: {
            method: 'GET',
            params: {
                tplName: ''
            },
            isArray: true
        }
    });
})
/*==========  End of 加载模板Json  ==========*/

/*-----  End of 服务  ------*/