<template>
	<wap-button :config.sync="startBtn"
	            @click="goTo">
	
	</wap-button>
</template>
<script>
import Statistics from '../statistics.js'
export default {
	components: {
		'wap-button': require('../../../components/button-new/button.vue')
	},
	props: {
		dateCheck: {
			require: true,
			type: Boolean,
			default: true
		},
		endJump: {
			require: true,
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			startBtn: window.store.activityConfig.startBtn,
			isStop: false,
		}
	},
	methods: {
		goTo(evt) {
			// 播放歌曲
			this.$dispatch('playMusic')

			if (!this.dateCheck) return;
			let starttime = new Date(this.$root.configData.starttime).getTime();
			let endtime = new Date(this.$root.configData.endtime.substr(0, 16)).getTime();
			let now = new Date().getTime();
			let msg = '';
			this.isStop = false;
			// 判断活动是否开始
			if (now < starttime) {
				this.isStop = true;
				msg = '活动还没开始！';
			}
			// 判断活动是否结束
			else if (now > endtime) {
				this.isStop = true;
				msg = '活动已结束！';

			}
			if (this.isStop) {
				evt.preventDefault();
				this.$dispatch('loading', { text: msg, icon: false, duration: 1500, name: 'startbtn' });
				return;
			}

			Statistics.gamePage() // 统计答题页pv/uv

			this.$route.router.go({ path: 'game' });
			// 以后可能需要先打开首页，再微信授权
			// window.location.href='http://weixin.10155.com/wostar2/redirect/toIndex.do?appid=4730005&aid='+ aid +'&channle=' + channel
		}
	}
}
</script>
