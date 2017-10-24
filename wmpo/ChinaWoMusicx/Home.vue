<template>
	<div class="app-view home-page">
		<div class="main-bg">
			<img :src="'x/images/home.jpg'" style="width: 100%; height:100%; ">
			<div class="text" style="background: url('./x/images/text.png') 100% 100% no-repeat; ">
				<img :src="'x/images/link.png'" class="link" @click="goLink">
			</div>
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
		.text{
		    background-size: 100% 100%;
		    width: 100%;
		    height: 742px;
		    position: absolute;
		    top: 48%;
		}
		.link{
			position:absolute;
			top: 28.5%;
			left: 11%;
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
		ready() {
			this.addOperLog('signin','');
			
		 
		},

		watch: {
		},
		methods: {
			addOperLog(type, btnName) {
				sapi.addOperLog(this, {
					'aid':aid,
					'type':type,
					'button_name': btnName,
					'source':source
				}, (back) => {})
			},
			goLink(){
				this.addOperLog('button','linkButton');
				location.href = "http://imusic.wo.com.cn/Club/portal/zwzt/00_5160_th.jsp?unikey=010006005af04f90015af05a3ad800bb";
			}
			

		}
	}
</script>