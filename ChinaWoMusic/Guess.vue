<template>

	<div class="guess-box" style="background:url(a/images/bg.jpg) center center; background-size: auto 100%;">
		
		<!-- <div transiton>
			<guess-game></guess-game>
		</div> -->

		<component :is="currentView" :img-seq.sync="imgSeq" :current-view.sync="currentView" transition-mode="out-in"></component>
		

		<img class="logo" :src="'a/images/logo.png'">
		<!-- <img class="music" :src="'a/images/music.png'" height="65" width="69"> -->
	</div>

</template>

<script>
	import Vue from 'vue'
	import guessGame from './Guess-game.vue'
	import guessQuestion from './Guess-question.vue'

	Vue.component('guessGame', guessGame);
	Vue.component('guessQuestion', guessQuestion);

	export default{
		components:{
			// guessGame
		},

		data(){
			return{
				currentView: 'guessGame',
				imgSeq: []
			}
		},

		ready() {
			if(!this.$root.islogin){
				this.$dispatch('login', window.location.search);
				return;
			}
			this.$root.musicData.showMusic = true;
			if(this.$root.musicData.status == 'play'){
				document.querySelector("#audio").play();
			}else{
				document.querySelector("#audio").pause();
			}
		}
	}
	
</script>

<style lang="sass">
	.guess-box{
		position:relative;
		height: 100%;
		width: 100%;
		min-height: 1100px;

		.music{
			position: absolute;
			right: 38px;
			top: 98px;
		}
	}

	

</style>