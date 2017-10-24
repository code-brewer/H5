<template>
	<div class="app-view view-receive-success"  :style="{'background-image':activityConfig.common.bgUrl?'url('+activityConfig.common.bgUrl+')':1,'background-color':activityConfig.common.bg}">
		<div class="content padding">
			<div class="prize-title">
				<p class="success-title" :style="{'color':activityConfig.common.secondColor}">恭喜您，领奖成功！</p>
				<p class="prize-code-title" :style="{'color':activityConfig.common.secondColor}">您的兑奖码为</p>
				<p class="prize-code" :style="{'color':activityConfig.common.mainColor}">123456789</p>
				<div class="qcode" :style="{'background-image':activityConfig.qeCode.imgUrl?'url('+activityConfig.qeCode.imgUrl+')':1}">
					
				</div>
				<p class="long-qcode" :style="{'color':activityConfig.common.secondColor}"> 长按二维码<br>关注我们了解更多精彩活动</p>
			</div>
			<div class="btn-wrap">
				<a href="#" class="wap-button" :style="btnStyle">返回首页</a>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import './receive-success.scss'
</style>
<script>
	export default {
		data(){
			var activityConfig = window.store.activityConfig
			return{
				activityConfig
			}
		},
		computed: {
			btnStyle: function() {
				return this.$root.btnStyle;
			}
		},
	}
</script>
