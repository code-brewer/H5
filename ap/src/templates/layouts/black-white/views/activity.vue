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

			<timer :show-hour="false" :show-min="true" :state.sync="timerState" :duration="activityConfig.duration"></timer>

		</div>
		<black-white-block :curr-td-num.sync="score" :state.sync="gameState"></black-white-block>
		</div>
</template>

<script>
	import timer from '../../../components/timer/timer'
	import blackWhiteBlock from '../../../components/black-white-block/black-white-block'

	import { router } from '../app'
	import api from '../../../service'

	export default {
		components: {
			timer,
			blackWhiteBlock
		},
		data() {
			var activityConfig = window.store.activityConfig

			return {
				activityConfig,

				timerState: '',
				gameState: '',

				score: 0
			}
		},
		watch: {
			gameState(val) {
				console.log(val)
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
		// created() {
		// 	if(this.activityConfig.counttime) {
		// 		this.duration = parseInt(this.activityConfig.counttime)
		// 	}
		// },

		methods: {
			endSend() {
				api.saveUserScore(this, { score: this.score }, function(back) {
					router.go({ name: 'success', params: { type: 1, score: this.score } })
				}.bind(this))
			}

		}
	}
</script>