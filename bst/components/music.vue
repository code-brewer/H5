<template>
	
	<div class="components-music">
		<img class="music" :src="musicBg" height="65" width="69" @click="toggleAudio">
		<audio id="audio" :src="'a/images/music.mp3'" autoplay="autoplay" loop="loop">您的浏览器不支持 audio 标签.</audio>
	</div>

</template>

<script>
	export default{
		props: {
			musicBg: {
				type: String,
				default: 'a/images/music.png'
			},

			musicStatus: {
				type: String,
				default: ''
			}
		},

		methods: {
			toggleAudio() {
				var audio = document.querySelector("#audio");

	 			if(audio.paused){
	 				this.musicBg = 'a/images/music.png';
	 				this.musicStatus = 'play';
	 				audio.play();
	 				
	 			}else{
	 				this.musicBg = 'a/images/ico_nomusic.png';
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