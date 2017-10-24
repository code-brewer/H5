var wx_obj = '',
    App = getApp();
var obj = {
    /**
     * [初始化数据，并首次调用发起获取省份数据请求的函数]
     * @param  {object} self 表单页的实例对象
     *
     */
	init: function(self) {
		wx_obj = self;
		for (var i = 0; i < this.len; i++) {
            wx_obj.data.propertyMessage.provinceArr.push(propertyMessage.jsonData[i].name)
        }
        wx_obj.setData({
            propertyMessage: wx_obj.data.propertyMessage
        })
        this.getProvince();
	},
    /**
     * [发起获取省份数据请求]
     */
    getProvince: function() {
        var self = this;
        wx.request({
            url: App.data.interfacePath + 'area/getProvinces',
            method: 'POST',
            data: {
                base: {
                    proNo: '30001'
                }
            },
            success: function(res) {
                var data = res.data;
                if (data.resCode == '000000') {
                    var propertyMessage = wx_obj.data.propertyMessage;
                    propertyMessage.provinceArr = data.repBody;
                    wx_obj.setData({
                        propertyMessage: propertyMessage
                    })
                }
            }
        })
    },
    /**
     * [发起根据省份获取城市数据请求]
     */
    getCitys: function() {
        var self = this;
        wx.request({
            url: App.data.interfacePath + 'area/getCitys',
            method: 'POST',
            data: {
                base: {
                    proNo: '30002'
                },
                body: {
                    provinceCode: wx_obj.data.propertyMessage.provinceCode
                }
            },
            success: function(res) {
                var data = res.data;
                if (data.resCode == '000000') {
                    var propertyMessage = wx_obj.data.propertyMessage;
                    propertyMessage.cityArr = data.repBody;
                    wx_obj.setData({
                        propertyMessage: propertyMessage
                    })
                }
            }
        })
    },
    /**
     * [发起根据城市获取地区数据请求]
     */
    getAreas: function() {
        var self = this;
        wx.request({
            url: App.data.interfacePath + 'area/getAreas',
            method: 'POST',
            data: {
                base: {
                    proNo: '30003'
                },
                body: {
                    provinceCode: wx_obj.data.propertyMessage.provinceCode,
                    cityCode: wx_obj.data.propertyMessage.cityCode
                }
            },
            success: function(res) {
                var data = res.data;
                if (data.resCode == '000000') {
                    var propertyMessage = wx_obj.data.propertyMessage;
                    propertyMessage.areaArr = data.repBody;
                    wx_obj.setData({
                        propertyMessage: propertyMessage
                    })
                }
            }
        })
    },
    /**
     * [房屋所在省选择]
     * @param  {object} e 房屋所在省选项的实例对象
     *
     */
	propertyProvincechange: function(e) {
        var index = e.detail.value,
            m = wx_obj.data.propertyMessage;

        m.province = m.provinceArr[index].provinceNameZhs;
        m.provinceCode = m.provinceArr[index].provinceCode;
        m.city = '请选择';
        m.area = '请选择';
        wx_obj.setData({
            propertyMessage: m
        })
        this.getCitys();
    },
    /**
     * [房屋所在市选择]
     * @param  {object} e 房屋所在市选项的实例对象
     *
     */
    propertyCitychange: function(e) {
        var m = wx_obj.data.propertyMessage,
            index = e.detail.value,
            arr = m.cityArr[index];

        if (m.province === '请选择') {
            return;
        }

        m.city = arr.cityNameZhs;
        m.cityCode = arr.cityCode;
        m.area = '请选择';

        wx_obj.setData({
            propertyMessage: m
        })

        this.getAreas();
        
    },
    /**
     * [房屋所在区选择]
     * @param  {object} e 房屋所在区选项的实例对象
     *
     */
    propertyTownchange: function(e) {
        var m = wx_obj.data.propertyMessage,
            index = e.detail.value,
            arr = m.areaArr[index];

        if (m.city === '请选择') {
            return;
        }

        m.area = arr.areaNameZhs;
        m.areaCode = arr.areaCode;
        m.subCityCode = arr.subcityCode;

        wx_obj.setData({
            propertyMessage: m
        })
    },
    /**
     * [问卷选项选择]
     */
    changeDetail: function(index) {
        wx_obj.data.propertyMessage.detail[index] = !wx_obj.data.propertyMessage.detail[index];
        wx_obj.setData({
            propertyMessage: wx_obj.data.propertyMessage
        })
    },
    /**
     * [检测信息是否填写完整、邮政编码是否正确以及所选答案是否符合]
     *
     * @return {boolean}      true表示校验通过,false表示校验不通过
     */
    check: function() {
        var d = wx_obj.data.propertyMessage;
        if (d.province === '请选择' || d.city === '请选择' || d.town === '请选择' || !d.address || !d.code) {
            wx_obj.openTip('亲,请把信息填完整!');
            return false;
        }
        if (d.code.length != 6) {
            wx_obj.openTip('亲,请输入正确的邮政编码');
            return false;
        }
        var bool = true;
        d.detail.forEach(item => {
            item ? '' : bool = false;
        })
        if (!bool) {
            wx_obj.openTip('对不起，不符合以上任意一种情况均无法投保');
            return false;
        }

        return true;
    }
}
module.exports = obj;