<template>

	<div class="app-view  guess-box" style="background-color: #6aae2f; background-size: auto 100%;overflow-x: hidden;">
	    <golf></golf>
		<img class="logo" :src="'b/images/logo.png'">
	</div>

</template>

<script>
	import Vue from 'vue'

	export default{
		components:{
			golf: require('./components/golf.vue')
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