Page({
	data: {
		buyNum: 1,
		allPrice: '',
		allSave: ''
	},
	onLoad: function() {
		var self = this;
		wx.getStorage({
			key: 'productMes',
			success: function(res) {
				var data = res.data;
				self.setData({
					data: data,
					allPrice: data.saveCost,
					allSave: (+data.originalCost) - (+data.saveCost)
				});
			}
		})
	},
	setNum: function(e) {
		var type = e.target.dataset.type,
			num = this.data.buyNum;
		if (type === 'sub') {
			if (num < 2) {
				return false;
			}
			num--;
		} else if (type === 'add') {
			if (num > 99) {
				return false;
			}
			num++;
		}
		this.setData({
			buyNum: num,
			allPrice: (+this.data.data.saveCost)*num,
			allSave: ((+this.data.data.originalCost)*num) - ((+this.data.data.saveCost)*num)
		});
	},
	submit: function() {
		wx.showToast({
		  title: '提交订单成功',
		  icon: 'success',
		  duration: 2000
		})
	}
})