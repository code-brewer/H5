<template>
	<div class="app-view view-activity">
		<timer></timer>
		<puzzle-slider></puzzle-slider>
	</div>
</template>

<script>
	import timer from '../../../components/timer/timer.config'
	import puzzleSlider from '../../../components/puzzle-slider/puzzle-slider.config'

	export default {
		components: {
			timer,
			puzzleSlider,
		}
		
	}
</script>