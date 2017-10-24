<template>

	<div class="game">
		<section class="section">
			<div class="timer" style="background: url(a/images/timer.png) center center no-repeat; background-size: auto 100%;">
				{{showData.countDown}}<small style="font-size:30px;">s</small>
			</div>
		</section>

		<section class="section">
			<div class="guess-img" >
				<img v-show="showData.show" class="img" :src="showData.imgSrc" transition="scale-img">
				<img v-show="!showData.show" class="img" :src="showData.imgSrc" transition="scale-img">
			</div>
		</section>

		<section class="section">
			<div class="bottom-section">
				<img class="bottom-img" :src="'a/images/bottom-bg.png'">
				<img class="baby-img" :src="'a/images/baby1.png'">
			</div>
		</section>
	</div>

</template>

<script>
	
	export default{
		props: {
			imgSeq: {
				type: Array,
				default: function(){return []}
			},
			currentView: String
		},

		data(){
			return{
				images: ['a/images/icon1.png','a/images/icon2.png','a/images/icon3.png','a/images/icon4.png','a/images/icon5.png'],
				showData: {
					imgSrc: '',
					countDown: 10,
					show: false,
				}

			}
		},

		ready(){
			this.startGame();

		},

		methods: {
			startGame(){
				var seconds = 0;
				var that = this;
				that.showData.countDown = "准备";
				that.imgSeq = [];
				var timer = setInterval(function(){
					
					seconds++;
					if(seconds > 10){
						that.currentView = 'guessQuestion';
						return;
					}
					that.showData.show = !that.showData.show;
					that.showData.countDown = seconds;
					var random = parseInt(Math.random()*5);
					that.imgSeq.push(random);
					that.showData.imgSrc = that.images[random];
				}, 1100)
				
			}
		}
	}
</script>

<style lang="sass">
	.game{

		.section{
			padding-top: 14px;

			.timer{
				// width: 174px;
				width: 100%;
				height: 150px;
				margin: 0 auto;
				line-height: 150px;
				text-align: center;
				font-size: 100px;
				font-weight: 600;
				color: #5b2e06;
			}

			.guess-img{
				position: relative;
				width: 100%;
				height: 560px;
				margin: 0 auto;

				.img{
					position: absolute;
					left: 50%;
					transform: translate(-50%, 0);
					width: auto;
					max-width: 90%;
					height: 100%;
					transform-origin: 0% 50%;
				}

				.scale-img-transition{
					transform: scale(1) translate(-50%, 0);
					opacity: 1;
					transition: transform 0.3s;
				}

				.scale-img-enter,
				.scale-img-leave{
					opacity: 0;
					transform: scale(0) translate(-50%, 0);
				}
			}

			.bottom-section{
				position: absolute;
				bottom: 0;
				width: 100%;

				.bottom-img{
				    position: absolute;
				    bottom: 0;
				    width: 100%;
				}

				.baby-img{
				    position: absolute;
				    bottom: 0;
				    right: 10px;
				}
			}

		}
	}
	
	
</style>