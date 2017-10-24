<template>
	<div class="app-view view-activity">
		<timer :state.sync="timerState" :duration="currLevel.allSecounds"></timer>
		<puzzle-slider :state.sync="puzzleState" :images="images" :level="levelNum" :squares="currLevel.square" :duration="currLevel.allSecounds" :track.sync="track" :glock="glock"></puzzle-slider>
	</div>
</template>

<script>
	import timer from '../../../components/timer/timer'
	import puzzleSlider from '../../../components/puzzle-slider/puzzle-slider'
	import { getCreds } from '../../../service'
	import { router } from '../app'
	export default {
		components: {
			timer,
			puzzleSlider
		},
		data() {
			return {
				timerState: '',
				puzzleState: '',
				images: [],
				levelNum: 1,
				track: '',
				trackId: '',
				glock: ''
			}
		},
		computed: {
			currLevel() {
				var level = this.$root.activityConfig.levels[this.levelNum - 1]
				level.allSecounds = this.getSeconds(level.time.mins, level.time.secounds)
				level.square = parseInt(level.square)
				return level;
			}
		},
		watch: {
			puzzleState(val) {
				// 当游戏开始之前
				if(val == 'startBefore') {

				}
				// 当游戏开始之后
				else if(val == 'startAfter') {
					this.timerState = 'start'
				}
				// 当游戏过关
				else if(val == 'success') {
					this.timerState = 'setEnd'
					this.$http.post(basePath + 'game/end', getCreds(6020, { id: this.trackId, track: this.track }), (back) => {
						if(back.resCode == '0') {
							if(this.levelNum < this.$root.activityConfig.levels.length) {
								localStorage['aus_game_level'] = parseInt(this.levelNum) + 1;
							} else {
								if(~~localStorage['aus_game_level'] == this.$root.activityConfig.levels.length) {
									localStorage['aus_game_pass'] = true;
								}
							}
							this.currLevel.score = back.repBody.scort;
							setTimeout(function() {
								router.go({ name: 'success', params: { type: 1, score: this.currLevel.score } });
							}.bind(this), 100)
						}
					})

				}
			},
			timerState(val) {
				if(val == 'end') {
					router.go({ name: 'fail', params: { type: 1, score: this.currLevel.score } });
				}
			}
		},
		created() {

			if(this.$root.activityConfig.images) {
				this.images = this.$root.activityConfig.images;
			}
			if(localStorage['aus_game_level']) {
				this.levelNum = parseInt(localStorage['aus_game_level']);
			}

			this.getGameInfo()

		},

		methods: {
			getGameInfo() {
				console.log("2222222");
				this.$http.post(basePath + 'game/start', getCreds(6019, { lv: this.levelNum }), (back) => {
					if(back.resCode == '0') {
						this.glock = back.repBody.glock
						this.trackId = back.repBody.id;
					} else if(back.resCode == '60002') {
						console.log(back.resMsg)
						var ln = parseInt(back.repBody.lv);
						if(ln >= this.$root.activityConfig.levels.length) {
							localStorage['aus_game_pass'] = true;
							router.go({ path: '/rank' });
							return;
						}
						this.levelNum = ln;
						localStorage['aus_game_level'] = back.repBody.lv;
						this.getGameInfo()
					} else {
						this.$dispatch('handleServerBack', back)
					}
				})
			},
			getSeconds(mins, secounds) {
				return(mins ? parseInt(mins) : 0) * 60 + (secounds ? parseInt(secounds) : 0)
			}

		}
	}
</script>