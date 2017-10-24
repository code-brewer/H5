<template>
	
	<div class="components-music">
		<img class="music" :src="musicBg" height="65" width="69" @click="toggleAudio">
		<audio id="audio" :src="musicSrc" autoplay="autoplay" loop="loop">您的浏览器不支持 audio 标签.</audio>
	</div>

</template>

<script>
	export default{
		props: {
			musicBg: {
				type: String,
				default: 'k/images/music.png'
			},
			musicSrc: {
            				type: String,
            				default: 'k/images/music.mp3'
            			},

			musicStatus: {
				type: String,
				default: 'pause'
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
					if(that.ael.duration == 'Infinity' && that.ael.currentTime>58){
						that.ael.currentTime = 0;
					}
				}else{
					if(!that.ael){
                    	that.ael = document.querySelector("#audio");
                    }
                    if(that.ael.duration == 'Infinity' && that.ael.currentTime>58){
                    	that.ael.currentTime = 0;
                    }
					that.ael.pause();
				}
			},500);
		},

		methods: {
			toggleAudio() {
				var audio = document.querySelector("#audio");

	 			if(audio.paused){
	 				this.musicBg = 'k/images/music.png';
	 				this.musicStatus = 'play';
	 				audio.loop = true;
	 				audio.play();
	 				// audio.loop = true;
	 				
	 			}else{
	 				this.musicBg = 'k/images/ico_nomusic.png';
	 				this.musicStatus = 'pause';
	 				audio.pause();
	 				
	 			}
			},
			sounddisable(isdis){
				if(isdis){
					var audio = document.querySelector("#audio");
					if(!audio.paused){
		 				audio.pause();
					}
				}else{
					if(this.musicStatus == 'play'){
						var audio = document.querySelector("#audio");
						this.musicBg = 'k/images/music.png';
						if(audio.paused){
							audio.loop = true;
							audio.play();
						}
					}
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