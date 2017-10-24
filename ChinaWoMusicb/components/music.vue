<template>
	
	<div class="components-music">
		<img class="music" :src="musicBg" height="65" width="69" @click="toggleAudio">
		<audio id="audio" :src="'b/images/music.mp3'" autoplay="autoplay" loop="loop">您的浏览器不支持 audio 标签.</audio>
	</div>

</template>

<script>
	export default{
		props: {
			musicBg: {
				type: String,
				default: 'b/images/music.png'
			},

			musicStatus: {
				type: String,
				default: ''
			}
		},
		data(){
			return{
				timeid:0
			}
		},
		ready(){
			var that = this;
			that.timeid = setInterval(function(){
				if(that.musicStatus == 'play'){
					if(!that.ael){
						that.ael = document.querySelector("#audio");
					}
					if(that.ael.duration == 'Infinity' && that.ael.currentTime>30){
						that.ael.currentTime = 0;
					}
				}
			},500);
		},

		methods: {
			toggleAudio() {
				var audio = document.querySelector("#audio");

	 			if(audio.paused){
	 				this.musicBg = 'b/images/music.png';
	 				this.musicStatus = 'play';
	 				audio.loop = true;
	 				audio.play();
	 				// audio.loop = true;
	 				
	 			}else{
	 				this.musicBg = 'b/images/ico_nomusic.png';
	 				this.musicStatus = 'pause';
	 				audio.pause();
	 				
	 			}
			}
		}
	}
</script>

<style style="sass">
	

	.components-music{

		

		.music{
			
		}


	}
</style>