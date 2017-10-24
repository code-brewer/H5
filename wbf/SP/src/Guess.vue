<template>
	<div class="app-view view-activity" :style="{background:'url('+$root.basePath+'src/images/sp-bg.jpg'+')',backgroundSize: '100%',backgroundRepeat:'no-repeat'}">
		<timer :state.sync="timerState" :duration="currLevel.allSecounds" style="background:url(src/images/sp-time-bg.png) center center no-repeat; background-size:100%;"></timer>
		<puzzle-slider :state.sync="puzzleState" :images="images" :level="levelNum" :squares="currLevel.square" :duration="currLevel.allSecounds" :track.sync="track" :glock="glock"></puzzle-slider>
		<div class="logo">
         	<img :src="$root.basePath+'src/images/logo.png'">
     	</div>
	</div>
</template>
<script> 
    import timer from './components/timer/timer.vue'
	import puzzleSlider from './components/puzzle-slider/puzzle-slider.vue'
	import {router} from './index'
	import api from './utils/serverapi.js'
	export default {
		components: {
			timer,
			puzzleSlider
		},
		data(){


			return {
				timerState: '',
				puzzleState: '',
				images: [],
				levelNum: 1,
				track: '',
                trackId: '',
                glock: '',
                
			}
		},
		computed: {
			currLevel() {
				var level = this.$root.activityConfig.levels[this.levelNum-1]
		
				level.allSecounds = this.getSeconds(level.time.mins, level.time.secounds)
				level.square = parseInt(level.square)
				return level;
			}
		},
		watch: {
			puzzleState(val) {
				console.log('val'+val);
				// console.log(val)

				// 当游戏开始之前
				if(val=='startBefore') {
					
				}
				// 当游戏开始之后
				else if(val=='startAfter') {
					this.timerState = 'start'
				}
				// 当游戏过关
				else if(val=='success') {

					this.timerState = 'setEnd'

					//router.go({name: 'success', params: {score: 1}});
					// this.$http.post(basePath+'game/end', getCreds(6020, {id: this.trackId, track: this.track}) ,(back)=> {
					// 	if(back.resCode == '0') {
							if(this.levelNum < this.$root.activityConfig.levels.length) {
								// localStorage['aus_game_level'] = parseInt(this.levelNum)+1;
								 sessionStorage['aus_game_level'] = parseInt(this.levelNum)+1;
							}
							if(this.levelNum == this.$root.activityConfig.levels.length){
								sessionStorage['pass'] = true;
								this.$root.gameLevel = 1;
								// //通关。请求接口
								// if(this.$root.islogin){
								// 	this.saveUserH5Info();
								// 	return;
								// }
							}
							setTimeout(function(){
								router.go({name: 'success', params: {score: 1}});
							}.bind(this), 200)
							
					// 	}
					// })
					

				}
			},
			timerState(val) {
				if(val=='end') {
					console.log('时间到')
					router.go({path: '/fail'});
				}
			},
			// imgp(val){
			// 	localStorage['aus_game_img'] = val;
			// },
			// urlp(val){
			// 	localStorage['aus_game_url'] = val;
			// }

		},
		created() {

			if(this.$root.activityConfig.images) {
				this.images = this.$root.activityConfig.images;
			}
			if(this.$root.activityConfig.urls) {
				this.urls = this.$root.activityConfig.urls;
			}
			if(sessionStorage['aus_game_level']) {
				this.levelNum = parseInt(sessionStorage['aus_game_level']);
				
			}
			
			sessionStorage['pass'] = false;
		
			
		},

		methods: {
			
			getSeconds(mins, secounds) {
				return (mins ? parseInt(mins) : 0)*60 + (secounds ? parseInt(secounds) : 0)
			},
			saveUserH5Info(){
				
			},

		}
	}
</script>
<style lang="sass">
	@function px2rem($px) {
		$return: #{($px / 8px / 2)}rem;

		@return $return;
	}
	.app-view.view-activity {
	   
	    width: px2rem(640px);
	    height: px2rem(1008px);
	    min-height: px2rem(1120px);

	    > .wap-timer {
	        width: px2rem(195px);
	        height: px2rem(125px);
	        margin: auto;
	       
	        padding: px2rem(120px) px2rem(58px) px2rem(40px);
	        .wap-timer-number {
                width: 120px;
			    /* height: 100%; */
			    height: 80px;
			    margin-top: -55px;
			    color: #254268;
			    font-size: 30px;
	            p {
	                display: inline-block;
	                
	            }
	        }
	        
	    }
	   
	}
</style>