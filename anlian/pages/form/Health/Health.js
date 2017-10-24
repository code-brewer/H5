var obj = {
	/**
	 * 健康问卷选项点击
	 * @param  {object} self 表单页实例对象
	 * @param  {object} data 健康问卷所点击的当前对象
	 *
	 */
	changeHealth: function(self, data) {
		self.data.other[data.i].healthStatement[(+data.index)-1] = !!(+data.bool);

		self.setData({
			other: self.data.other
		})
	},
	/**
	 * [校验健康问卷所选答案是否符合]
	 * @param  {object} self  表单页实例对象
	 * @param  {number} index 第几个被保人,0代表第一个
	 *
	 * @return {boolean}      true表示校验通过,false表示校验不通过
	 */
	check: function(self, index) {
		var bool = true;
		self.data.other[index].healthStatement.forEach((item, i) => {
			if (item != (self.data.product.HealthList[i+1] && (+self.data.product.HealthList[i+1].validate))) {
				bool = false;
			}
		})
		if (!bool) {
			self.openTip(self.data.product.HealthTips || '对不起，有符合以上任意一种情况均无法投保');
            return false;
		}
		return true;
	}
}
module.exports = obj;