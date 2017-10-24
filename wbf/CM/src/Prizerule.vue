<template>
	<div class="app-view prize-rule-page">
		<div class="content padding">
			<div class="prize-rule">
				<h3>利马救援奖品——</h3>
				<h4>（1）一年114汽车救援服务：</h4>
				<p>有效期至2017年7月4日</p>
				<P>救援服务仅限河南全省除郑州外各市县区使用</P>
				
				<h4>（2）汽车救援7月体验券一张：</h4>
				<p>有效期至2016年7月31日</p>
				<p>救援服务仅限河南全省除郑州外各市县区使用</p>

				<p>温馨提示：</p>
				<p>1、请记录并保存所获电子券码</p>
				<p>2、关注“利马救援”微信公众号，在微信号首页点击“114车主”，输入所获电子券码、手机号、车牌号即可使用</p>
				<p>3、如有疑问，欢迎咨询24小时热线4006080114或登录http://www.chejiuyuan.com了解相关信息</p>
				<img :src="$root.basePath+'activity/SliderMoney/src/img/prize-rule-wx.png'" />

				<h4>（3）价值558元的“埃尼润滑油”：</h4>
				<p>有效期至2016年8月31日</p>
				<p>仅限河南全省除郑州外各市县区使用</p>

				<p>温馨提示：</p>
				<p>1、获奖后会有专员电话联系</p>
				<p>2、适应以下品牌车辆或车型:</p>
				<p>奔驰 宝马 奥迪 法拉利 兰博基尼 玛萨拉蒂 宾利 雷克萨斯 英菲尼迪 丰田皇冠  沃尔沃  保时捷 林肯 凯迪拉克 克莱斯勒 大众途锐  别克昂科雷  吉普 讴歌、斯巴鲁等</p>
				<p>3、关注“利马救援”微信公众号了解更多详情</p>
				<p>4、如有疑问，欢迎咨询24小时热线4006080114或登录http://www.chejiuyuan.com了解相关信息</p>
				<img :src="$root.basePath+'activity/SliderMoney/src/img/prize-rule-wx.png'" />
			</div>
			<br/>
			<div class="prize-rule">
				<h3>小李补胎奖品——</h3>
				<h4>（1）千元大礼包一份：</h4>
				<p>有效期至2016年12月31日</p>
				<P>仅限郑州、洛阳门店使用</P>
				
				<h4>（2）蜜蜂救援卡一张+上门保养50元代金券一张：</h4>
				<p>有效期至2016年12月31日</p>
				<p>仅限郑州、洛阳门店使用</p>

				<h4>（3）50元到店保养机油代金券一张：</h4>
				<p>有效期至2016年12月31日</p>
				<p>仅限郑州、洛阳门店使用</p>

				<p>温馨提示：</p>
				<p>1、实物奖品请到小李补胎在郑州、洛阳门店领取消费</p>
				<p>2、请在领取、消费奖品时提供本页面及领奖手机号码</p>
				<p>3、如有疑问，欢迎咨询24小时热线400-001-6122或登录http://www.xiaolibutai.cn/了解相关信息</p>
				
				<br/>
				<h3>网厅手机优惠抵扣券：</h3>
				<p>有效期至2016年8月1日</p>
				<p>仅限河南部分地区使用</p>

				<p>温馨提示：</p>
				<p>1、请记录并保存所获电子券码</p>
				<p>2、用户凭电子券码即可在网厅购买手机时享受与电子代金券等价值的减免优惠</p>
				
				<br/>
				<h3>机票抵扣券：</h3>
				<p>有效期：2016.7.4-2016.10.4</p>
				<p>仅限单人单次使用，适用于国际、国内机票（不限航空公司）</p>

				<p>温馨提示：</p>
				<p>1、请记录并保存所获电子券码</p>
				<p>2、用户通过拨打114预定机票即可享受与电子代金券等价值的减免优惠</p>
			
				
			</div>
		</div>
		<img :src="activityInfo.backgrounds.rule"  class="bg">
	</div>
</template>

<script>

	export default {
		ready() {
			this.$dispatch('title', '奖品使用方法');
			this.activity = JSON.parse(localStorage.getItem('activity'));
			this.activityInfo = JSON.parse(this.activity.extbody);
		},
		data() {
			return {
				activity:{title:''},
				activityInfo:{ruleContent:'',backgrounds:{rule:''}},
			}
		},
	}
</script>