<template>
	<div class="app-view view-activity" style="overflow: hidden;
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;">
		<logo></logo>
		<div class="wap-topbar">
			<div>
				<span class="title">分数：</span> <span class="score">{{score}}</span>
			</div>
			<div>
				<span class="title">时间：</span>
				<timer :show-hour="false" :show-min="true" :state.sync="timerState" :duration="duration"></timer>
			</div>
		</div>
		<find-color :level.sync="levelNum" :colors="activityConfig.colors"></find-color>
		</div>
</template>

<script>
	import logo from '../../../components/logo/logo'
	import timer from '../../../components/timer/timer'
	import findColor from '../../../components/find-color/find-color'

	import { router } from '../app'
	import api from '../../../service'
	console.log(router)
	export default {
		components: {
			logo,
			timer,
			findColor
		},
		data() {
			var activityConfig = window.store.activityConfig

			return {
				activityConfig,

				timerState: '',
				levelNum: 1,
				duration: 60,

				score: 0
			}
		},
		watch: {
			levelNum(val) {
				this.score += val * 5
			},
			timerState(val) {
				// 倒计时结束
				if(val == 'end') {
					this.$dispatch('loading', { text: '时间到', icon: false, duration: 1500, name: 'gameend' });

					api.saveUserScore(this, { score: this.score }, function(back) {
						router.go({ name: 'success', params: { type: 1, score: this.score } })
					}.bind(this))

				}
			}
		},
		created() {
			if(this.activityConfig.counttime) {
				this.duration = parseInt(this.activityConfig.counttime)
			}
		},
		ready() {
			this.timerState = 'start'
		},

		methods: {

		}
	}
</script>