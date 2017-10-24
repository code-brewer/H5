<template>
	
	<div class="components-music">
		<img class="music" :src="musicBg"  @click="toggleAudio" :class="{isturn:isPlay}">
		<audio id="audio" :src="musicSrc" autoplay="autoplay" loop="loop">您的浏览器不支持 audio 标签.</audio>
	</div>

</template>

<script>
	export default{
		props: {
			musicBg: {
				type: String,
				default: 'H5/images/music.png'
			},
			musicSrc: {
            				type: String,
            				default: 'H5/images/music.mp3'
            			},

			musicStatus: {
				type: String,
				default: 'pause'
			}
		},
		data(){
			return{
				timeid:0,
				isPlay:true,
				switchListener:null,
			}
		},
		watch: {
          
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
				this.isPlay = !this.isPlay;
				this.$root.isBaseMusic = !this.$root.isBaseMusic;
				var audio = document.querySelector("#audio");

	 			if(audio.paused){
	 				this.musicBg = 'H5/images/music.png';
	 				this.musicStatus = 'play';
	 				audio.loop = true;
	 				audio.play();
	 				// var audio1 = document.querySelector("#audio1");
	 				// audio1.pause();
	 				// this.$root.isSongRoll = false;
	 				// audio.loop = true;
	 				//监听
	 				if(this.switchListener){
	 					this.switchListener("play");
	 				}
	 			}else{
	 				this.musicBg = 'H5/images/music.png';
	 				this.musicStatus = 'pause';
	 				audio.pause();
	 				if(this.switchListener){
	 					this.switchListener("pause");
	 				}
	 			}
			},
			//其他地方调此方法
			setSwitchListener(listener){
				this.switchListener = listener;
			},
			sounddisable(isdis){
				if(isdis){
					this.isPlay = false;
					var audio = document.querySelector("#audio");
					if(!audio.paused){
						this.$root.isBaseMusic = false;
		 				audio.pause();
					}
				}else{
					this.isPlay = true;
					this.$root.isBaseMusic = true;
					if(this.musicStatus == 'play'){
						var audio = document.querySelector("#audio");
						this.musicBg = 'H5/images/music.png';
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
	

	
	.isturn{
		animation: roll 5s linear infinite;
	}

	@keyframes roll{
		0%{transform: rotate(0deg);}
		100%{transform: rotate(360deg);}
	}
</style>