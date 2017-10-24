<template>
	<div class="wap-slide-money" v-gesture:swipeUp="swipe($event)">
		<div class="moneys">
			<div class="arrow"></div>
			<div class="money" transition="swipe-up" v-for="item in list"></div>
			<div class="money-bg"></div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import VueGesture from 'vue-gesture'
	Vue.use(VueGesture)

	export default {
		props: {
			// 张数
			currNum: {
				type: Number,
				default: 0
			},
			state: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				list: []
			}
		},
		created() {
			var list = []
			for (var i = 0; i < 15; i++) {
				list.push({num: i})
			};
			this.list = list
			SoundMixer.init()
		},
		methods: {
			swipe(e, item) {
				e.stopPropagation()
				e.preventDefault()

				if(!this.currNum) {
					this.state = 'started'
				}

				SoundMixer.reset(SoundMixer.coinSound)

				// this.list.$remove(item)

				
				this.list.splice(0, 1)

				this.currNum++;

				this.list.push({num: this.currNum+this.list.length})
				// setTimeout(function() {
				// 	this.isShow = false
				// }.bind(this), 50)
			}
		}
	}
	var SoundMixer = {
		init() {
			this.coinSound = new Audio()
			this.coinSound.src = 'http://www.soyu.cn/fsd/ap/20161110/88_73eae241_4865_41fc_aedf_d5842bfdaa40.mp3'
			this.coinSound.playbackRate = 2

		},

		play(sound) {
			sound.play()
		},

		pause(sound) {
			sound.pause()
		},

		reset(sound) {
			sound.currentTime = 0
			this.play(sound);
		}
	}
</script>

