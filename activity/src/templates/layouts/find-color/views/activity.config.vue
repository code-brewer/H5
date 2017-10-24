<template>
	<div class="app-view view-activity">
		<logo></logo> 
		<div class="wap-topbar">
			<div>
				<span class="title">分数：</span> <span class="score">100</span>
			</div>
			<div>
				<span class="title">时间：</span><timer :show-hour="false" :show-min="true" :duration="60"></timer>
			</div>
		</div>
		<find-color></find-color>
	</div>
</template>

<script>
	import logo from '../../../components/logo/logo.config'
	import timer from '../../../components/timer/timer.config'
	import findColor from '../../../components/find-color/find-color.config'
	export default {
		components: {
			logo,
			timer,
			findColor,
		}
		
	}
</script>