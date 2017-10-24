//app.js
App({
    data: {
        // interfacePath: 'https://eservice.allianz.cn/miniapp/',
        interfacePath: 'https://eservice.allianz.cn/al/',
        jsPath: 'https://eservice.allianz.cn/mini/test/'
    },
    /**
     * [根据产品类型不同定义不同色系]
     * @param  {string} type 产品类型  jc-家财险; yw_jk-意外健康险; yw_njk-意外非健康险; yw_njk-所有意外险; ly-旅游险
     *
     * @return {string}      产品线色系
     */
    getStyle: function(type) {
        var color = '';
        switch(type) {
            case 'jc': //家财险
                color = 'yellow';
                break;
            case 'yw_jk': //意外险（与健康有关）
                color = 'pink';
                break;
            case 'yw_njk': //意外险（与健康无关）
                color = 'pink';
                break;
            case 'yw': //意外险（与健康无关）
                color = 'pink';
                break;
            case 'ly': //旅游险
                color = 'green';
                break;
            default:
                color = 'orange';
        }
        return color;
    },
    /**
     * [序列化url参数]
     * @param  {object} obj [url参数]
     *
     * @return {string}     [序列化后的url参数]
     */
    getParamsStr: function(obj) {
        var params = [];
        for (var i in obj) {
            params.push(i + '=' + obj[i]);
        }
        return (params.length ? '?' : '') + params.join('&');
    },
    /**
     * [反序列化url参数]
     * @param  {string} str [url参数]
     *
     * @return {obj}     [反序列化后的url参数]
     */
    getParamsObj: function(str) {
        var arr = str && str.split('&') || '';
        if (arr.length) {
            var json = {},
                temp = [];
            arr.forEach(item => {
                temp = item.split('=');
                json[temp[0]] = temp[1];
            })
            return json;
        }
        return '';
    },
    /**
     * [获取分享文案]
     * @param  {string} path [页面路径]
     * @param  {Object} options [参数对象－键值包含params和productId]
     *
     * @return {Object}      [返回分享文案对象]
     */
    getShare: function(path, options) {
        if (path === 'main') {
            return {
                title: '我的安联保险',
                path: '/pages/main/main' + this.getParamsStr(options)
            }
        } else {
            try {
                var res = wx.getStorageSync('product');
                if (res) {
                    var product = res.data[options.p] || {},
                        params = this.getParamsStr(options);
                    return {
                        title: '我的安联保险',
                        path: '/pages/index/index'+params
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    /**
     * [获取配置文件]
     * @param  {object}   e        url参数
     * @param  {Function} callback 处理配置文件内容的回调函数
     * @param  {string}   type     页面标识符 main-商城页 index-非商城页
     *
     */
    getProduct: function(e, callback, type) {
        var self = this;
        e = e || {};
        /** 获取本地缓存的配置产品信息 **/
        wx.getStorage({
            key: 'product',
            complete: function(res) {
                var version = '',
                    pageVersion = '',
                    config = e.config || 'config';
                if (res.data) {

                    var data = res.data;
                    e.defaultAgencyCode = data.defaultAgencyCode;
                    e.defaultAgencyUser = data.defaultAgencyUser;
                    if (e.p && type != 'main') {
                        data = data.data[e.p] || {};
                    }

                    version = res.data.version;
                    pageVersion = res.data.pageVersion;

                    var storageConfig = '',
                        isUpdate = false;
                    try {
                        storageConfig = wx.getStorageSync('config');
                        /** 当获取到的文件名和缓存的文件名一致，执行回调 **/
                        if (storageConfig == config) {
                            callback(e, data)
                        } else {
                            isUpdate = true;
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
                /** 发起获取配置产品信息的请求 **/
                wx.request({
                    url: self.data.jsPath +config+'.js',
                    success: function(res) {
                        if (res.statusCode === 200) {
                            var data = res.data,
                                isRefresh = false;
                            if (e.p && type != 'main') {
                                data = data.data[e.p] || {};
                            }
                            /** 当获取到的版本号跟缓存的版本号不一致时，重新执行回调 **/
                            if ((data.version && data.version != version) || !version) {
                                isUpdate = true;
                            }
                            /** 当获取到的页面版本号跟缓存的页面版本号不一致时，重新执行回调，并通知刷新页面 **/
                            if ((data.pageVersion && data.pageVersion != pageVersion) || !pageVersion) {
                                isRefresh = isUpdate = true;
                            }
                            /** 记录获取到的配置产品信息 **/
                            wx.setStorageSync('config', config);
                            wx.setStorage({
                                key: 'product',
                                data: res.data,
                                success: function() {
                                    isUpdate && (e.defaultAgencyCode = res.data.defaultAgencyCode,e.defaultAgencyUser = data.defaultAgencyUser);
                                    isUpdate && callback(e, data, isRefresh);
                                }
                            })
                        }
                    }
                })
            }
        })
    },
    /** 扩展Date对象方法 **/
    onLaunch: function() {
        Date.prototype.add = function(obj) {
            for(var i in obj) {
                switch(i) {
                    case 'year': 
                        this.setFullYear(+obj[i] + this.getFullYear());
                        break;
                    case 'month': 
                        this.setMonth(+obj[i] + this.getMonth() + 1);
                        break;
                    case 'day':
                        this.setDate(+obj[i] + this.getDate());
                        break;
                    case 'hours':
                        this.setHours(+obj[i]);
                        break;
                    case 'minutes':
                        this.setMinutes(+obj[i]);
                        break;
                    case 'seconds':
                        this.setSeconds(+obj[i]);
                        break;
                }
            }
            return this;
        };
        Date.prototype.format = function(format) {
            if (!format) {
                format = 'yyyy-MM-dd';
            }
            var month = this.getMonth() + 1,
                date = this.getDate(),
                hours = this.getHours(),
                minutes = this.getMinutes(),
                seconds = this.getSeconds(),
                str = format
                .replace(/yyyy/, this.getFullYear())
                .replace(/MM/, (month > 9 ? '' : '0') + month)
                .replace(/dd/, (date > 9 ? '' : '0') + date)
                .replace(/HH/, (hours > 9 ? '' : '0') + hours)
                .replace(/mm/, (minutes > 9 ? '' : '0') + minutes)
                .replace(/ss/, (seconds > 9 ? '' : '0') + seconds);
            return str;
        };
    }
})
