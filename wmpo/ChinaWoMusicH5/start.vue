<template>
	<div class="app-view home-page">
		<section class="section-start">
			<img :src = "'H5/images/lele.png'" class="lele">
			<p>{{start}}%</p>
		</section>
	</div>

</template>

<style lang="sass">
.section-start{
	width: 100%;
	height: auto !important;
	// background: #fff;
	color: #000;
	padding-top: 20%;
	text-align: center;
}
.app-view.home-page {
	.section-start{
		background: #f0f0f0;
	}
}
@-webkit-keyframes leles{
	0%{
		transform: rotate(0deg)
	}
	25%{
		transform: rotate(30deg)
	}
	50%{
		transform: rotate(60deg)
	}
	75%{
		transform: rotate(30deg)
	}
	100%{
		transform: rotate(0deg)
	}         
}
 @-moz-keyframes  leles{
     0%{
		transform: rotate(0deg)
	}
	25%{
		transform: rotate(30deg)
	}
	50%{
		transform: rotate(60deg)
	}
	75%{
		transform: rotate(30deg)
	}
	100%{
		transform: rotate(0deg)
	}         
	 		
}
 @-o-keyframes leles{
     0%{
		transform: rotate(0deg)
	}
	25%{
		transform: rotate(30deg)
	}
	50%{
		transform: rotate(60deg)
	}
	75%{
		transform: rotate(30deg)
	}
	100%{
		transform: rotate(0deg)
	}               
}
@-ms-keyframes leles{
    0%{
		transform: rotate(0deg)
	}
	25%{
		transform: rotate(30deg)
	}
	50%{
		transform: rotate(60deg)
	}
	75%{
		transform: rotate(30deg)
	}
	100%{
		transform: rotate(0deg)
	}           	
}
.lele{
	 -webkit-animation:leles 1s linear infinite;
	-moz-animation:leles 2s linear infinite;
	-ms-animation:leles 2s linear infinite;
	-o-animation:leles 2s linear infinite;
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
				start:0
			}
		},

		ready() {
			if(this.start >=100){
				router.go('home');
			}
			progressListener = this.pl;
		},

		methods: {
			pl(p){
				this.start = p;
				if(this.start >=100){
				router.go('home');
				}
			}
		}
	}
</script>