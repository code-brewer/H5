<template>
	
	<div class="components-music">
		<img class="music" :src="musicBg" height="59" width="59" @click="toggleAudio">
		<audio id="audio" :src="musicSrc" autoplay="autoplay" loop="loop" preload="">您的浏览器不支持 audio 标签.</audio>
	</div>

</template>

<script>
	export default{
		props: {
			musicBg: {
				type: String,
				default: 'q/images/music.png'
			},
			musicSrc: {
            				type: String,
            				default: 'q/images/music.mp3'
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
			that.linaudio = document.querySelector("#audio");
			// alert("林泳改变了");
			window.linp = function(){
				if(that.musicStatus == 'play'){
					// alert("林泳开了");
					that.linaudio.setAttribute("src",that.musicSrc);
					that.linaudio.play();
				}
			};
			that.timeid = setInterval(function(){
				if(that.musicStatus == 'play'){
					// if(that.linaudio.paused){
					// 	that.linaudio.loop = true;
					// 	this.linaudio.setAttribute("src",this.musicSrc);
					// 	that.linaudio.play();
					// 	return;
					// }
					if(!that.ael){
						that.ael = document.querySelector("#audio");
					}
					if(that.ael.duration == 'Infinity' && that.ael.currentTime>140){
						that.ael.currentTime = 0;
					}
				}else{
					if(!that.ael){
                    	that.ael = document.querySelector("#audio");
                    }
                    if(that.ael.duration == 'Infinity' && that.ael.currentTime>140){
                    	that.ael.currentTime = 0;
                    }
					that.ael.pause();
				}
			},500);
		},

		methods: {
			// linl(){
			// 	alert("林泳准备了");
			// 	document.addEventListener("WeixinJSBridgeReady", function () {
			// 		alert("林泳要开始3了");
			// 		this.linp();  
			// 	}, false); 
			// },
			// linp(){
			// 	alert("林泳要开始了");
			// 	this.linaudio.setAttribute("src",this.musicSrc);
			// 	this.linaudio.play();
			// },
			toggleAudio() {
				var audio = document.querySelector("#audio");

	 			if(audio.paused){
	 				this.musicBg = 'q/images/music.png';
	 				this.musicStatus = 'play';
	 				audio.loop = true;
	 				audio.play();
	 				// audio.loop = true;
	 				
	 			}else{
	 				this.musicBg = 'q/images/ico_nomusic.png';
	 				this.musicStatus = 'pause';
	 				audio.pause();
	 				
	 			}
			},
			sounddisable(isdis){
				if(isdis){
					var audio = document.querySelector("#audio");
					// if(!audio.paused){
		 				setTimeout(function(){
		 					audio.pause();
		 				},200);
					// }
				}else{
					if(this.musicStatus == 'play'){
						var audio = document.querySelector("#audio");
						this.musicBg = 'q/images/music.png';
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