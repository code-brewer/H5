<template>
	<div class="view view-music" @click="openWindow">
		<div class="cd-bar">
			<div class="cd">
				<img :src="'images/33.png'" alt="">
			</div>
		</div>
		<div class="title-bar">
			<h3>童话里不是骗人的</h3>
			<p>爱我别走</p>
		</div>
		<div class="progress-bar">
			<div class="progress" :style="{width: progress_width+'%'}"></div>
		</div>

		<div class="time-bar">
			<div class="curr-time">{{curr_duration | timer}}</div>
			<div class="total-time">{{total_duration | timer}}</div>
		</div>
	</div>
</template>

<script>
	import api from '../api'

	var instance;
	var positionInterval;
	var seeking = false;
	
	export default {
		data() {
			return {
				total_duration: 0,
				curr_duration: 0,
				progress_width: 0
			}
		},
		created() {

		},
		ready() {
			this.addChannel('music.jsp')

			createjs.Sound.addEventListener("fileload", createjs.proxy(this.handleLoadComplete, this));

			createjs.Sound.registerSound('audio/music.mp3');
			


			// console.log(myInstance)
			// console.log(myInstance._duration)


		},

		methods: {
			handleLoadComplete(e) {
				instance =  createjs.Sound.play('audio/music.mp3');

				this.trackTime();
				console.log(instance)

				this.total_duration = instance._duration;
				instance.addEventListener('complete', function(e) {
					console.log(e)
				})
				// createjs.Sound.addEventListener("progress", createjs.proxy(this.handleLoadComplete, this));
			},
			trackTime() {
				positionInterval = setInterval(function (event) {
					if (seeking) {
						return;
					}
					this.curr_duration = instance.getPosition();
					this.progress_width = instance.getPosition() / instance.getDuration() * 100
				}.bind(this), 1000);
			},
			openWindow() {
				window.open('vip.jsp')
			},
			addChannel(name,type) {
				var obj = {
					aid: 9,
					type: 'signin'
				}
				if(type) {
					obj.type = 'button'
					obj.button_name = name;
				}
				

				api.addChannelLog(this, obj);
			},
		},
		filters: {
			timer(val) {
				if(val || val==0) {
					var min = Math.floor(val / 1000 / 60)
					var secounds = Math.floor(val / 1000 % 60)
					if(min < 10) {
						min = '0'+min
					}
					if(secounds < 10) {
						secounds = '0'+secounds
					}

					return min + ':' + secounds
				}
			}
		}
	}


	

</script>