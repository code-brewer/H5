<template>
	<div class="app-view pass-page">
		<div class="content padding">
			<img :src="$route.params.status!=0?$root.activityBasePath+'/src/images/success.png':$root.activityBasePath+'/src/images/fail.png'" class="text-img">
			<h1 v-show="$route.params.status!=0">您已成功获得<span class="positive">{{$route.params.score}}</span>个积分</h1>
			<h1 v-show="$route.params.status==0" style="font-size: 36px;">您没有得到任何积分，继续加油哦！</h1>

			<div class="buttons">
				<a v-show="!passall" v-link="{path: '/game'}" class="button button-positive">再挑战一次</a>
				<a href="#" class="button button-positive">分享得积分</a>
			</div>
			<div class="links"><a v-link="{path: '/ranking'}" class="link">活动总排名</a>|<a v-link="{path: '/rankingtoday'}" class="link">当天排名</a></div>
		</div>
		<img :src="activityInfo.backgrounds.other"  class="bg">
	</div>

	
</template>

<script>
	export default {
		ready() {
			if(this.$route.params.status==0) this.$dispatch('title', '闯关失败');
			if(this.$route.params.status!=0) this.$dispatch('title', '闯关成功');

			this.activityInfo = JSON.parse(JSON.parse(localStorage.getItem('activity')).extbody);
			this.passall = (localStorage.getItem('pass_all') == 'true');
			
		},
		data() {
			return {
				activityInfo:{backgrounds:{other:''}},
				passall:false,
			}
		},
	}
</script>