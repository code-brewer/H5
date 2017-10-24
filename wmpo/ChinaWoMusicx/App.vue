<template>
	<div class="app-views">
		<router-view transition="slide"></router-view>	
	</div>
	
</template>

<script>
	import {router} from './index';
	import urlUtil from './utils/url.js'
	import sapi from './utils/serverapi.js'
	export default {
		components: {
		
		},
		data() {
			return {
				
			}
		},
		ready() {
			
			
		 
		},

		watch: {
		},
		methods: {
			
			

		}
	}

</script>

<style lang="sass">
	
	.music-warp{
		position: absolute;
		right: 38px;
		top: 20px;
		font-size: 0;
		
		z-index: 20;
	}
</style>