<template>
	<div class="app-view view-activity" style="overflow: hidden;
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;      
    height: 100%;">
		

		<number-of-draws></number-of-draws>
		<activity-box></activity-box> 

		<turntable></turntable>

		<div class="wap-winning-box">
			<div class="title-icon"></div>
			<div class="wap-winning-list">
				<div class="winning-item">2016-10-15  8:30       XXX于抽到一等奖</div>
				<div class="winning-item">2016-10-15  8:30       XXX于抽到一等奖</div>
				<div class="winning-item">2016-10-15  8:30       XXX于抽到一等奖</div>
				<div class="winning-item">2016-10-15  8:30       XXX于抽到一等奖</div>
				<div class="winning-item">2016-10-15  8:30       XXX于抽到一等奖</div>
			</div>
		</div>
	</div>
</template>

<script>
	import timer from '../../../components/timer/timer.config'
	import turntable from '../../../components/turntable/turntable.config'
	import numberOfDraws from '../../../components/number-of-draws/number-of-draws.config'

	export default {
		components: {
			timer,
			turntable,
			numberOfDraws,
			'activity-box': require('../../../components/activity-box/activity-box.config')
		}

		
	}
</script>