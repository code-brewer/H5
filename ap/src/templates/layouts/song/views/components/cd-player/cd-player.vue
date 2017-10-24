<template>
	<div class="cd-player__container"
	     :class="{'playing': playing}">
		<!--<audio id="audio"
				       :src="activityConfig.game.musicUrl[activityConfig.game.fileType]">
					您的浏览器不支持 audio 标签。
				</audio>-->
		<div class="cd-player__mic"></div>
		<div class="cd-player__cd">
			<span class="cd"
			      @click="ctrlMusic"></span>
		</div>
	</div>
</template>
<script>
import Statistics from '../../../statistics.js'
import utils from '../../../../../../utils'
export default {
	components: {

	},
	data() {
		let activityConfig = window.store.activityConfig
		return {
			activityConfig,
			playing: true,
			playState: {
				'-webkit-animation-play-state': 'paused',
				'animation-play-state': 'paused'
			}
		}
	},
	ready() {
		// this.$dispatch('playMusic')
		this.$on('playEnd', () => {
			this.playing = false
		})
	},
	beforeDestroy() {
		this.$dispatch('stopMusic')
	},
	methods: {
		ctrlMusic() { // 重新播放音乐
			// this.statisticMusicReplay()
			this.playing = true
			this.$dispatch('playMusic')
		},
		statisticMusicReplay() {
			Statistics.musicRelay() // 统计重新播放
		}
	}
}
</script>
<style lang="scss">
$ratio: 750/320;
@import './common.scss';
@import './cd-player.scss';
</style>