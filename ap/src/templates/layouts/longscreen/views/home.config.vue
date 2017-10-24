<template>
	<div class="app-view view-home"
	     v-el:appview
	     :style="{'background-color': activityConfig.common.bg}">
		<img :src="activityConfig.common.bgUrl"
		     alt=""
		     class="longscreen-bg">
		<history-activity></history-activity>
		<music v-for="music in activityConfig.musics"
		       track-by="$index"
		       :pos-y.sync="music.posY"
		       :music-title.sync="music.musicTitle"
		       :music-id.sync="music.musicId"
		       :music-member-songid.sync="music.musicMemberSongid"
		       :music-songid.sync="music.musicSongid"
		       :music-index="music.musicIndex"
		       :music-url.sync="music.musicUrl"></music>
	</div>
</template>
<script>
import HistoryActivity from './components/HistoryActivity/HistoryActivity.config'
import Music from './components/Music/Music.config'

export default {
	components: {
		HistoryActivity,
		Music
	},
	data() {
		var activityConfig = window.store.activityConfig
		return {
			activityConfig,
			showEdit: false,
			hasHistory: false,
		}
	},
	ready() {
		this.$els.appview.addEventListener('mouseover', (e) => {
			this.activityConfig.musicPos = e.offsetY - 20
			this.activityConfig.enterPhone = true
		})
		this.$els.appview.addEventListener('mouseout', () => {
			this.activityConfig.enterPhone = false
		})
	},
	watch: {

	}
}
</script>
<style lang="scss" src="../css/style.scss"></style>
<style lang="scss">
@import '../../../../css/px2rem.scss';
@import '../../../_base_config.scss';
.app-view {
	background-size: 100% 100%;
	overflow: auto !important;

	.longscreen-bg {
		width: 100%;
	}
}
</style>
