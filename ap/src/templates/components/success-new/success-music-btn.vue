<template>
	<div class="success-music-btn"
	     v-el:musicbtn
	     :style="{'background-image':(activityConfig.success.completeMusicImg!=''?'url('+activityConfig.success.completeMusicImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.success.completeMusicImgH}"
	     @click="goLink">
	</div>
</template>

<script>
import Statistics from '../../../templates/layouts/song/statistics.js'
export default {
	data() {
		var activityConfig = window.store.activityConfig;
		return {
			activityConfig
		}
	},
	methods: {
		goLink() {
			var that = this
			// Statistics.correctUrl(this.activityConfig.success.completeLink); // 统计答案正确页外链pv/uv 
			Statistics.rightJump(this.activityConfig.success.completeLink); // 统计查看完整歌曲
			if (this.activityConfig.fail.completeLink != "") {
				setTimeout(function () {
					location.href = that.activityConfig.success.completeLink;
				}, 300)
			}
		}
	}
}
</script>
