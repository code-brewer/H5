<template>

	<div class="guess-box app-view" style="background:url(images/t-bg.jpg) center center; background-size: auto 100%;">
		
		<!-- <div transiton>
			<guess-game></guess-game>
		</div> -->

		<component :is="currentView" :img-seq.sync="imgSeq" :current-view.sync="currentView" transition-mode="out-in"></component>
		

		<!-- <img class="logo" :src="'images/t-logo.png'"> -->
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
				imgSeq: [
				{name:'发票', url:'images/bigfapiao.png',selectUrl:'images/fapiao.png',nowSelectUrl:'images/selectfapiao.png' ,type:'yes'},
				{name:'交费', url:'images/bigjiaofei.png',selectUrl:'images/jiaofei.png',nowSelectUrl:'images/selectjiaofei.png' , type:'yes'},
				{name:'假日', url:'images/bigjiari.png',selectUrl:'images/jiari.png',nowSelectUrl:'images/selectjiari.png' , type:'yes'},
				{name:'详单', url:'images/bigxiangdan.png',selectUrl:'images/xiangdan.png',nowSelectUrl:'images/selectjiaof.png' , type:'yes'}
				],
				indexs: [],//出现的顺序
			}
		},

		ready() {
			var that = this;
			this.$on('setAnswer', (second) => {
				// console.log(this.indexs)
				// console.log(second-1)
				// console.log(this.imgSeq)
				// if (second==1) return this.imgSeq[0].type = 'no'
				this.imgSeq[this.indexs[second-1]].type = 'no'
			});
			that.$on('setq', (parameter) => {//设置出现的过程
				that.indexs = parameter;
			});


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