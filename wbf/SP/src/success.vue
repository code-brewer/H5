<template>
	<div class="app-view view-success" :style="{background:'url('+$root.basePath+'src/images/sp-bg.jpg'+')', backgroundRepeat:'no-repeat'}">
		<img v-if="pass == 'false'" :src="$root.basePath+'src/images/success.png'" class="wap-pic">
		<img v-if="pass == 'true'" :src="$root.basePath+'src/images/pass-all.png'" class="wap-pic">
		<p v-if="pass == 'true'" class="wap-get-score">您已成功获得<span>{{score}}</span>个积分</p>
		<!-- <p class="wap-surplus-chance">您还剩下 <span>8</span> 次拼图机会</p> -->

		<!-- <div class="wap-img">
			<img :src="img">
		</div> -->
		<div class="wap-button mt" @click="gonewactivity">新用户领取28888元体验理财金</div>
		<div class="wap-btns">
			<a v-link="{path: '/guess'}" class="wap-button green">继续挑战</a>
			<!-- <a v-if="pass == 'true'" @click="goodlucky" class="wap-button green">继续挑战</a> -->
			<a @click="share" class="wap-button yellow">分享</a>
		</div>

		<div class="logo">
         	<img :src="$root.basePath+'src/images/logo.png'">
     	</div>
	</div>
</template>

<script>

	import {router} from './index'
	import sapi from './utils/serverapi.js'
	export default {
		data(){
			return {
				img:'',
				pass:'',
				url:'',
				score:0
			}
		}, 
		created() {
			if(localStorage['aus_game_img']) {
				this.img = localStorage['aus_game_img'];
			}else{
				this.img = this.$root.activityBasePath+'/images/sp-img.jpg';
			}
			if(localStorage['aus_game_url']){
				this.url = localStorage['aus_game_url'];
			}
			
			this.pass = sessionStorage['pass'];
			// if(sessionStorage['score']){
			// 	this.score = sessionStorage['score'];
			// }
			if(this.pass == 'true'){
				
				this.Operscore();
			}
			alert(window.location.href);
			
			
		},
		computed: {
			// score() {
			// 	return /^\d+$/.test(this.$route.params.score) ? this.$route.params.score : '0';
			// }
		},
		components: {
			
		},
		methods:{
			// goodlucky(){
			// 	if(!this.$root.islogin){
			// 		this.$root.goodlucky = true;
			// 		this.$dispatch('login', window.location.search);
			// 		return;
			// 	}
				
			// }
			share(){
				share();
			},
			Operscore(){
				var that = this;
				if(checkLogin()){
            		sapi.Operscore(that, 'pass', function(back){
                		if(back.msgCode == 'MKM00000'){
                			alert(back.data.scoreVal);
                			that.score = back.data.scoreVal;
                			
                		}

                		else{
                			that.$dispatch('handle_server_error', back);
                		}
                	})
            	}
            	else{
            		gologin();
            	}
			},
			gonewactivity(){
				gonewactivity();
			}
			
		}
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
	        margin-top: px2rem(240px);
	        display: block;
	    }
	    .wap-img{
	    	text-align: center;
	    	margin-top: px2rem(30px);
	    	img{
	    		width: px2rem(460px);
	    		height:  px2rem(460px);
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
	        margin-top: px2rem(50px);
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
		    color: #fff;
		    -webkit-border-radius: px2rem(6px);
		    -moz-border-radius: px2rem(6px);
		    border-radius: px2rem(6px);
		     background: rgb(255,66,34); /* Old browsers */
   			
		    -webkit-text-shadow:#7f3119 2px 0 0,#7f3119 0 2px 0,#7f3119 -2px 0 0,#7f3119 0 -2px 0;  
		    -moz-text-shadow:#7f3119 2px 0 0,#7f3119 0 2px 0,#7f3119 -2px 0 0,#7f3119 0 -2px 0;  
		    text-shadow:#7f3119 2px 0 0,#7f3119 0 2px 0,#7f3119 -2px 0 0,#7f3119 0 -2px 0;   
		    *filter: Glow(Color=#7f3119, Strength=5);  
		    text-decoration: none;
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
			 background: rgb(255,66,34);
		}
		.green{
			 background: rgb(255,66,34);
		}
		.mt{
			margin-top: 200px;
		}
	}
</style>