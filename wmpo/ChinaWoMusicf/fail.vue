<template>
	<div class="app-view view-success" style="background:url(f/images/sp-bg.jpg) center center; background-size: auto 100%;">
		<img :src="'f/images/sp-fail.png'" class="wap-pic">
		<!-- <p class="wap-surplus-chance">您还剩下 <span>8</span> 次拼图机会</p> -->
		<div class="wap-img">
			<img :src="img">
		</div>
		<div class="wap-btns">
			<a v-link="{path: '/guess'}" class="wap-button green">重新挑战</a>
			<a :href="url" class="wap-button yellow">领取歌单</a>
		</div>
	 	<div class="logo">
         	<img :src="'f/images/sp-logo.png'">
     	</div>
	</div>
</template>

<script>

	export default {
		data(){
			return {
				img:'',
			}
		}, 
		created() {
			if(localStorage['aus_game_img']) {
				this.img = localStorage['aus_game_img'];
				console.log(this.img);
			}else{
				this.img = this.$root.activityBasePath+'/images/sp-img.jpg';
			}
			if(localStorage['aus_game_url']){
				this.url = localStorage['aus_game_url'];
			}
			
		},
		
	}
</script>
<style lang="sass">
	@function px2rem($px) {
		$return: #{($px / 8px / 2)}rem;

		@return $return;
	}
	.app-view.view-success {
	    width: px2rem(640px);
	    height: px2rem(1008px);
	    min-height: px2rem(1120px);
	    padding: 0 px2rem(40px);
	    p {
	        color: #fff;
	        text-align: center;
	        
	        margin: 0;
	        span {
	            color: #ffb81d;
	        }
	    }
	    .wap-pic {
	        width: px2rem(385px);
	        height: px2rem(212px);
	        margin: auto;
	        margin-top: px2rem(100px);
	        display: block;
	    }
	    .wap-img{
	    	text-align: center;
	    	margin-top: px2rem(30px);
	    	img{
	    		border: px2rem(20px) solid #fff;
	    	}
	    }
	    .wap-get-score {
	        font-size: px2rem(48px);
	        text-align: center;
	        margin-top: px2rem(12px);
	        
	    }
	    .wap-surplus-chance {
	        margin-top: px2rem(48px);
	        font-size: px2rem(32px);
	    }

	    .wap-btns {
	        margin-top: px2rem(30px);
	        display: flex;
	        justify-content: space-between;
	        a {
	            display: block;
	            text-decoration: none;
	            width: 46%;
	        }

	    }
	    .wap-links {
	        color: #fff;
	        margin-top: px2rem(80px);
	        text-align: center;
	    }
	    .wap-button {
		    
		    height: px2rem(82px);
		    line-height: px2rem(82px);
		    width: auto;
		    font-size: px2rem(32px);
		    text-align: center;
		    color: #262222;
		    -webkit-border-radius: px2rem(41px);
		    -moz-border-radius: px2rem(41px);
		    border-radius: px2rem(41px);
		    a {
		        display: block;
		        color: inherit;
		        text-decoration: none;
		    }
		    &.disabled {
		        opacity: .5;
		        // background: #ccc !important;
		        // color: #333 !important;
		        pointer-events: none !important;
		    }
		}
		.yellow{
			background: #ffb81d;
		}
		.green{
			background: #98cf2f;
		}

	}
</style>