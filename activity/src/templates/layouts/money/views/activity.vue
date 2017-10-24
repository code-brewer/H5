<template>
	<div class="app-view view-activity" style="overflow: hidden;
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;">

		<div class="wap-topbar">
			<div class="wap-score">
				${{score}}
			</div>

			<div class="arrow-up"></div>

			<timer :show-hour="false" :show-min="false" :state.sync="timerState" :duration="activityConfig.duration"></timer>

		</div>

		<slide-money :curr-num.sync="currNum" :state.sync="gameState"></slide-money>
		</div>
</template>

<script>
	import timer from '../../../components/timer/timer'
	import slideMoney from '../../../components/slide-money/slide-money'

	import { router } from '../app'
	import api from '../../../service'

	export default {
		components: {
			timer,
			slideMoney
		},
		data() {
			var activityConfig = window.store.activityConfig

			return {
				activityConfig,

				timerState: '',
				gameState: '',

				currNum: 0
			}
		},
		computed: {
			score() {
				return 100 * this.currNum
			}
		},
		watch: {
			gameState(val) {
				if(val == 'started') {
					this.timerState = 'start'
				}
				if(val == 'end') {
					this.$dispatch('loading', { text: '游戏结束', icon: false, duration: 1500, name: 'gameend' });
					this.endSend();
				}
			},
			timerState(val) {
				// 倒计时结束
				if(val == 'end') {
					this.$dispatch('loading', { text: '时间到', icon: false, duration: 1500, name: 'gameend' });

					this.endSend();
				}
			},

		},

		methods: {
			endSend() {
				api.saveUserScore(this, { score: this.score }, function(back) {
					router.go({ name: 'success', params: { type: 1, score: this.score } })
				}.bind(this))
			}

		}
	}
</script>