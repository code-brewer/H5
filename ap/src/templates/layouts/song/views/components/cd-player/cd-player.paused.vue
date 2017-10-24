<template>
	<div class="cd-player__container playing">
		<audio crossOrigin="anonymous" id="audio" src="./templates/static/yryjz.mp3">
			您的浏览器不支持 audio 标签。
		</audio>
		<div class="cd-player__mic"></div>
        <div class="cd-player__cd">
            <span class="cd" :style="playState" @click="ctrlMusic"></span>
        </div>
	</div>
</template>
<script>
	const running = {
		'-webkit-animation-play-state': 'running',
		'animation-play-state': 'running'
	}
	const paused = {
		'-webkit-animation-play-state': 'paused',
		'animation-play-state': 'paused'
	}
	export default {
		components: {
			
		},
		data() {
			let activityConfig = window.store.activityConfig
			return {
				activityConfig,
				playing: false,
				playState: {
					'-webkit-animation-play-state': 'paused',
					'animation-play-state': 'paused'
				}
			}
		},
		ready() {
			this.initMusic()
		},
		methods: {
			initMusic() { // 
				this.playMusic()
				document.querySelector('#audio').addEventListener('ended', ()=>{
					this.pausedMusic()
				})
			},
			ctrlMusic() { // 播放/暂停音乐
				this.playing = !this.playing
				if(this.playing) {
					this.playMusic()
				}else{
					this.pausedMusic()
				}
			},
			pausedMusic() {
				this.playing = false
				this.playState = paused
				document.querySelector('#audio').pause()
			},
			playMusic() {
				this.playing = true
				this.playState = running
				document.querySelector('#audio').play()
			}
		}
	}
</script>
<style lang="scss">
	$ratio: 750/320;
	@import './common.scss';
	@import './cd-player.scss';
</style>