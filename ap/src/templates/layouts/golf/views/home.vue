<template>
	<div class="app-view view-home" :style="{background: (activityConfig.bg.imgUrl!=''?'url('+activityConfig.bg.imgUrl+')':1)}">
		<logo></logo>
		<activity-box></activity-box>
		<static-banner></static-banner>
		<remaining-number-of-prizes></remaining-number-of-prizes>
		<number-of-participants></number-of-participants>
		<start-button></start-button>
		<rule-link></rule-link>
	</div>
</template>
<script>
	import sapi from '../../../service'
	import urlUtil from '../../../utils/url.js'
	export default {
		components: {
			'logo': require('../../../components/logo/logo'),
			'static-banner': require('../../../components/static-banner/static-banner'),
			'remaining-number-of-prizes': require('../../../components/remaining-number-of-prizes/remaining-number-of-prizes'),
			'start-button': require('./start-button'),
			'rule-link': require('../../../components/rule-link/rule-link'),
			'number-of-participants': require('../../../components/number-of-participants/number-of-participants'),
			'activity-box': require('../../../components/activity-box/activity-box'),
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
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				sapi.getUserInfo(this, {}, (back) => {
					console.log(back)
					if(back.resCode == "0") {
						this.usid = back.repBody[0].usid;
						// 获取路由里面的usid
						var router_usid = urlUtil.getArgsFromUrl("usid");

						if(router_usid && router_usid != this.usid) {
							this.visiteMode = 'share';
							this.activity_usid = router_usid;
						} else {
							this.activity_usid = this.usid;
						}
					} else {
						this.$dispatch('handle_server_error', back);
					}
				})
			},
		}
	}
</script>
<style lang="scss" src="../css/style.scss"></style>
<style lang="scss">
	@import '../../../../css/px2rem.scss';
	@import '../../../_base_config.scss'
</style>