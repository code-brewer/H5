<template>
	<div class="app-view view-activity" style="overflow: hidden;
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;">
		
		<div class="wap-topbar">
			<div class="wap-score">
				<span class="title">分数：</span> <span class="score">{{score}}</span>
			</div>
		
			<timer :show-hour="false" :show-min="true" :duration="activityConfig.duration"></timer>
	
		</div>
		
		<black-white-block></black-white-block>
	</div>
</template>

<script>
	import timer from '../../../components/timer/timer.config'
	import blackWhiteBlock from '../../../components/black-white-block/black-white-block.config'
	export default {
		components: {
			timer,
			blackWhiteBlock
		},
		data(){
			var activityConfig = window.store.activityConfig

			return {
				activityConfig,

				score: 0
			}
		},
		
	}
</script>