<template>
	<div class="app-view" :style="{background: (activityConfig.fail.bgUrl!=''?'url('+activityConfig.fail.bgUrl+')':1), 'background-size':'100% 100%'}">
		<logo></logo>
		<fail-title></fail-title>
		<fail-btn></fail-btn>
		<fail-music-btn></fail-music-btn>
		
	</div>
</template>
<script>
	import Statistics from '../statistics.js'
	import sapi from '../../../service'
	import urlUtil from '../../../utils/url.js'
	export default {
		components: {
			'logo': require('../../../components/logo-new/logo'),
		 	'fail-title': require('../../../components/fail-new/fail-title.vue'),
			'fail-btn': require('../../../components/fail-new/fail-btn.vue'),
			'fail-music-btn': require('../../../components/fail-new/fail-music-btn.vue'),
			
		},
		ready() {
			Statistics.failPage(); // 统计答题失败页面pv/uv 
		},
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
				usid: '',
				activity_usid: '',
				activity: {},
				picList: [],
				userPicList: [],
				hasLiked:false
			}
		},
		created(){
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" src="../css/style.scss"></style>
<style lang="scss">
	@import '../../../../css/px2rem.scss';
	@import '../../../_base_config.scss'
</style>
