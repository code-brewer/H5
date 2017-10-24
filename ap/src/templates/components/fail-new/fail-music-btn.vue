<template>
	<div class="fail-music-btn"
	     v-el:musicbtn
	     :style="{'background-image':(activityConfig.fail.completeMusicImg!=''?'url('+activityConfig.fail.completeMusicImg+')':1), 'background-size':'100%', 'background-repeat':'no-repeat', 'height':activityConfig.fail.completeMusicImgH}"
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
			// Statistics.errorUrl(this.activityConfig.fail.completeLink); // 统计答案错误页外链pv/uv 
			Statistics.wrongJump(this.activityConfig.fail.completeLink); // 统计查看答案
			if (this.activityConfig.fail.completeLink != "") {
				setTimeout(function(){
					location.href = that.activityConfig.fail.completeLink;
				}, 300)
			}
		}
	}
}
</script>
