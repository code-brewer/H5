<template>
	<div class="app-view home-page">
		<div class="main-bg">
			<img :src="'v/images/you-bg.png'" style="max-width: 100%; height:100%; ">
		</div>
		
	</div>

</template>

<style lang="sass">
	.app-view.home-page{
		position: absolute;
	    top: 0;
	    right: 0;
	    left: 0;
	    bottom: 0;
		.main-bg{
			text-align: center;
		}
		
	}
</style>
<script>
	import {
		router
	} from './index'
	import sapi from './utils/serverapi.js'
	export default {
		components: {},
		data() {
			return {
				
			}
		},
		 watch: {
          
          
        },
		ready() {
			this.addOperLog();
		},

		methods: {
			addOperLog() {
				sapi.addOperLog(this, {
					'aid':aid,
					'type':'signin',
					'source':source
				}, (back) => {})
			},
		}
	}
</script>