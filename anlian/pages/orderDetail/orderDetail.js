var App = getApp();
Page({
    data: {
        details: {
            product: '',
            plan: '',
            start: '',
            end: '',
            name: '',
            class: '',
            id: '',
            birday: '',
            phone: '',
            relative: '',
            sex: '',
            share: ''
        }
    },
    onLoad: function(e) {
        var self = this,
            share = '';
        if (e.agencyKey) {
            share = 'main';
        } else if (e.p) {
            share = 'index';
        } else {
            share = 'main';
        }
        this.setData({
            share: App.getShare(share, e)
        })
    },
    onShow: function() {
        this.getData();
    },
    /**
     * [获取订单信息]
     */
    getData: function() {
        var self = this;
        wx.getStorage({
            key: 'orderDetail',
            success: function(res) {
                var birthday = res.data.policyJson.body.policyHolder.pHBirthDate;
                res.data.policyJson.body.policyHolder.pHBirthDate = birthday.substr(0, 4) + '-' + birthday.substr(4, 2) + '-' + birthday.substr(6, 2);
                /** 证件类型的值转化中文 **/
                res.data.policyJson.body.policyHolder.pHIdType = ['身份证', '护照', '其他'][res.data.policyJson.body.policyHolder.pHIdType - 1];
                res.data.policyJson.body.insuredList.Insured.forEach(item => {
                    var date = item.birthDate;
                    item.birthDate = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2);
                    item.gender = item.gender === 'M' ? '男' : '女';
                    item.idType = ['身份证', '护照', '其他'][item.idType - 1];
                    item.policyholderInsuredRelation = ['', '本人', '父母', '子女', '配偶', '雇佣关系', '其他'][item.policyholderInsuredRelation.replace('0', '')];
                })
                self.setData({
                    details: res.data
                })
            }
        })
    },
    /**
     * [自定义分享]
     */
    onShareAppMessage: function() {
        return {
            title: this.data.share.title,
            path: this.data.share.path
        }
    }
})
