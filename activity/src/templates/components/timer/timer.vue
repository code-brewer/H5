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
	var timeId = null;

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
		},
		watch: {
			state(state) {
				if(state=='start') {
					this.start()
				}
				else if(state=='setEnd') {
					this.end()
				}
			}
		},
		methods: {
			start() {},
			end() {
				clearTimeout(timeId);
				this.secounds = 0;
				this.showTimer = [0,0,0,0,0,0];
			},
		},
		created() {
			var that = this;
			this.start = function() {
				if(this.state=='ing') return;

				this.secounds = this.duration;
				timer();
				this.state = 'ing';
			}
			function timer() {
				that.secounds--;

				that.showTimer = getTimeArr(that.secounds);

				if (that.secounds <= 0) {
					that.state = 'end';
					that.end()
					return false;
				}

				timeId = setTimeout(timer, 1000);
			}
		}
	}
	
	function getTimeArr(seconds) {
		var hour = Math.floor(seconds / 60 / 60),
			min = Math.floor(seconds / 60),
			second = seconds % 60;

		if (hour < 10) {
			hour = '0' + hour;
		}

		if(hour) {
			min = min - (hour*60)
		}

		if (min < 10) {
			min = '0' + min;
		}
		if (second < 10) {
			second = '0' + second;
		}
		var arr = (hour + '' + min + '' + second).split('');
		return arr;
	}

</script>