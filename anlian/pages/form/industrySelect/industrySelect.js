var wx_obj = '',
	App = getApp();
var obj = {
	professionalList: '',
	jobList: [],
	/**
	 * [初始化数据，并首次调用发起获取行业数据请求函数]
	 */
	init: function(self) {
		wx_obj = self;
		this.getProfessional(0);
	},
	/**
	 * [发起获取行业数据请求]
	 */
	getProfessional: function(index) {
		var self = this;
		wx.request({
			url: App.data.interfacePath + 'jobCode/getIndustry',
			method: 'POST',
			data: {
				base: {
					proNo: '20001'
				}
			},
			success: function(res) {
				var data = res.data;
				if (data.resCode == '000000') {
					wx_obj.data.other[index].industryArr = data.repBody;
					wx_obj.setData({
						other: wx_obj.data.other
					})
				}
			}
		})
	},
	/**
	 * [发起获取职业类别和职业名称请求]
	 */
	getClasses: function(index) {
		var self = this;
		wx.request({
			url: App.data.interfacePath + 'jobCode/getJobs',
			method: 'POST',
			data: {
				base: {
					proNo: '20001'
				},
				body: {
					industry: wx_obj.data.other[index].industry
				}
			},
			success: function(res) {
				var data = res.data;
				if (data.resCode == '000000') {
					var arr = [];
					data.repBody.forEach(item => {
						if (arr.indexOf(item.jobType) === -1) {
							arr.push(item.jobType)
						}
					})
					wx_obj.data.other[index].classesArr = arr;
					self.jobList = data.repBody;
					wx_obj.setData({
						other: wx_obj.data.other
					})
				}
			}
		})
	},
	/**
	 * [选择行业]
	 * @param  {object} e 行业选项的实例对象
	 *
	 */
	changeProfessional: function(e) {
		var index = e.currentTarget.dataset.i,
			other = wx_obj.data.other[index];

        other.industry = other.industryArr[e.detail.value].industry;
        other.classes = '请选择';
        other.profession = '请选择';

        wx_obj.setData({
            other: wx_obj.data.other
        })

        this.getClasses(index);
        
    },
	/**
	 * [选择类别]
	 * @param  {object} e 职业类别选项的实例对象
	 *
	 */
    changeClasses: function(e) {
    	var index = e.currentTarget.dataset.i,
    		other = wx_obj.data.other[index];
    	if (other.industry === '请选择') {
    		return;
    	}

        other.classes = other.classesArr[e.detail.value];
        other.profession = '请选择';
        other.professionArr = this.jobList.filter(item => {
        	return item.jobType === other.classes;
        })

        wx_obj.setData({
            other: wx_obj.data.other
        })
    },
    /**
	 * [选择职业名称]
	 */
	/**
	 * [选择职业名称]
	 * @param  {object} e 职业名称选项的实例对象
	 *
	 */
    changeProfession: function(e) {
    	var index = e.currentTarget.dataset.i,
    		other = wx_obj.data.other[index];
    	if (other.classes === '请选择') {
    		return;
    	}
    	var arr = other.professionArr[e.detail.value];

        other.profession = arr.jobName;
        other.industryCode = arr.jobCode;
        other.jobClassif = arr.jobClassif;
        wx_obj.setData({
            other: wx_obj.data.other
        })
    },
    /**
     * [检测信息是否填写完整以及所选职业是否在保障范围内]
     * @param  {number} e 第几个被保险人 0代表第一个
     */
    check: function(index) {
    	var d = wx_obj.data.other[index],
    		obj = wx_obj.data.product.Job;
    	if (d.industry == '请选择' || d.classes == '请选择' || d.profession == '请选择') {
    		wx_obj.openTip('亲,请把信息填完整!');
    		return false;
    	}
    	var bool = false;
    	if (obj.indexOf(d.jobClassif) === -1) {
    		wx_obj.openTip('亲,该职业不在保障范围内');
    		return false;
    	}
    	return true;
    }
}
module.exports = obj;