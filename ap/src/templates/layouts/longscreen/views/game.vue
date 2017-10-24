<template>
	<div class="game-view-one quest-bg app-view view-home" :style="{'background-image': (activityConfig.game.bgUrl!='' ? 'url('+activityConfig.game.bgUrl+')' : 1)}">
		<logo v-show="activityConfig.logo.show"></logo>
		<cd-player></cd-player>
		<music-options></music-options>
		<confirm-btn></confirm-btn>
	</div>
</template>
<script>
	import logo from '../../../components/logo/logo'
	import cdPlayer from './components/cd-player/cd-player.vue'
	import musicOptions from './components/music-options/music-options.vue'
	import confirmBtn from './components/confirm-button/confirm-btn.vue'
	export default {
		components: {
			logo,
			cdPlayer,
			musicOptions,
			confirmBtn
		},
		data() {
			var activityConfig = window.store.activityConfig
			return {
				activityConfig
			}
		},
		ready() {
			// 以后可能需要先打开首页，再微信授权
			// this.getUserInfo();
		},
		methods: {
			// getUserInfo() {
			// 	sapi.getUserInfo(this, {}, (back) => {
			// 		console.log(back)
			// 		if(back.resCode == "0") {
			// 			this.usid = back.repBody[0].usid;
			// 			window.openid = back.repBody[0].wx;
			// 			// 获取路由里面的usid
			// 			var router_usid = urlUtil.getArgsFromUrl("usid");

			// 			if(router_usid && router_usid != this.usid) {
			// 				this.visiteMode = 'share';
			// 				this.activity_usid = router_usid;
			// 			} else {
			// 				this.activity_usid = this.usid;
			// 			}
			// 		} else {
			// 			this.$dispatch('handle_server_error', back);
			// 		}
			// 	})
			// }
		},
		watch: {
			'activityConfig.game.bgUrl' (o, v) {
				console.log(o)
			}
		}
	}
</script>
<style lang="scss">
	@import '../../../../css/px2rem.scss';
	@import '../../../_base_config.scss';
	.game-view-one {
		&.quest-bg {
			height: 100% !important;
			background-size: cover;
			background-image: url(../images/game-bg.jpg);
		}
	}
</style>