<template>
	<div class="app-view view-activity" style="overflow: hidden;
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;">
		
		<div class="wap-topbar">
			<div class="wap-score">
				$1000
			</div>

			<div class="arrow-up"></div>
		
			<timer :show-hour="false" :show-min="false" :duration="activityConfig.duration"></timer>
		</div>
		
		<slide-money></slide-money>
	</div>
</template>

<script>
	import timer from '../../../components/timer/timer.config'
	import slideMoney from '../../../components/slide-money/slide-money.config'

	export default {
		components: {
			timer,
			slideMoney
		},
		data(){
			var activityConfig = window.store.activityConfig

			return {
				activityConfig
			}
		}
		
	}

	
</script>