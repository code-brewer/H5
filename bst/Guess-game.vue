<template>
	<p class="server-title">以下是114号码百事通的查询服务</p>
	<div class="game" style="background: url(images/t-img-bg.png) center center no-repeat; background-size: 90% auto;">

 		<section class="section">
 			<div class="timer">
 				{{showData.countDown}}<small style="font-size:60px;">s</small>
 			</div>
 		</section>
		<section class="section">
			<div class="guess-img" >
				<img class="img" :src="showData.imgSrc" transition="scale-img">
				<!-- <img v-show="!showData.show" class="img" :src="showData.imgSrc" transition="scale-img"> -->
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
				images:[
				{name:'查快递', url:'images/t-img1.png', type:'yes'},
				{name:'查号码', url:'images/t-img2.png', type:'yes'},
				{name:'查违章', url:'images/t-img3.png', type:'yes'},
				{name:'查公交', url:'images/t-img5.png', type:'yes'}],
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
				that.showData.countDown = "GO";
				that.imgSeq = [];
				that.indexs  = [];
				that.showData.imgSrc = that.images[1].url;
				var timer = setInterval(function(){
					
					seconds++;
					if(seconds > 10){
						that.currentView = 'guessQuestion';
						return;
					}
					// that.showData.show = !that.showData.show;
					that.showData.countDown = seconds;
					var random = parseInt(Math.random()*4);
					for(var i = 0; i<that.indexs.length; i++){
						if(random == that.indexs[i]){
							random = parseInt(Math.random()*4);

						}
					}
					that.indexs.push(random);
					that.imgSeq = that.images;
					that.showData.imgSrc = that.images[random].url;
					
				}, 1100)
				
			}
		}
	}
</script>

<style lang="sass">
	.game{
		margin-top: 30px;
		position: relative;
		.section{
			padding-top: 14px;

			.timer{
				position: absolute;
				top:25px;
				right: 12%;
				font-size: 60px;
				color: #fff;
			}

			.guess-img{
				// position: relative;
				width: 100%;
				height: 660px;
				margin: 0 auto;

				.img{
					position: absolute;
					left: 50%;
					top: 152px;
					transform: translate(-50%, 0);
					width: auto;
					max-width: 85%;
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
	.server-title{
	    text-align: center;
	    margin-top: 200px;
	    color: #fff;
	    font-size: 35px;
	     text-shadow: 0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89,0px 0px 10px #004a89;
	}
	
</style>