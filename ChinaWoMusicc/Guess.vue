<template>

	<div class="app-view  guess-box" style="background-color: #43a4f7; background-size: auto 100%;overflow: hidden;">
	    <timemachine></timemachine>
		<img class="logo" :src="'c/images/logo.png'">
	</div>

</template>

<script>
	import Vue from 'vue'

	export default{
		components:{
			timemachine: require('./components/timemachine.vue')
		},

		data(){
			return{
				imgSeq: []
			}
		},

		ready() {
			// if(!this.$root.islogin){
			// 	this.$dispatch('login', window.location.search);
			// 	return;
			// }
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
		height: 100%;
		width: 100%;
		.music{
			position: absolute;
			right: 38px;
			top: 98px;
		}
	}

	

</style>