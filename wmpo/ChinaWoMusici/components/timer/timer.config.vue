<template>
	<div class="wap-timer">
		<div class="wap-timer-number">
			<p class="hour" v-if="showHour">
				<span>{{showTimer[0]}}</span>
				<span>{{showTimer[1]}}</span>
			</p>
			<p class="min" v-if="showMin">
				<span>{{showTimer[2]}}</span>
				<span>{{showTimer[3]}}</span>
			</p>
			<p class="second">
				<span>{{showTimer[4]}}</span>
				<span>{{showTimer[5]}}</span>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			state: {
				require: true,
				type: String,
				twoWay: true,
				default: ''
			},
			duration: {
				require: true,
				type: Number,
				default: 10
			},
			showHour: {
				type: Boolean,
				default: true
			},
			showMin: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				secounds: 10,
				showTimer: [0,0,0,0,0,0],
			}
		}
		
	}
	

</script>