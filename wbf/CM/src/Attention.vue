<template>
	<div class="app-view rule-page attention-page">
		<div class="content padding">
			<h2>请关注后查看排名</h2>
			<p style="margin-top: 20px;">安卓请长按，IOS请点击</p>
			<div class="img">
				<img @click="isIosWx" class="zcode" :src="$root.basePath+'activity/SliderMoney/src/img/wechat.jpg'" alt="">
			</div>
		</div>
		<img :src="activityInfo.backgrounds.rule"  class="bg">
	</div>
</template>

<script>

	export default {
		ready() {
			this.$dispatch('title', '关注公众号');
			this.activity = JSON.parse(localStorage.getItem('activity'));
			this.activityInfo = JSON.parse(this.activity.extbody);
		},
		data() {
			return {
				activity:{title:''},
				activityInfo:{ruleContent:'',backgrounds:{rule:''}},
			}
		},
		methods:{
			isIosWx(){
			}
		}
	}
</script>