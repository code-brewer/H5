<template>
	<div class="app-view home-page" style="overflow: hidden;">
		<audio id="audio1" :src="newItem.musicSrc" loop="loop">您的浏览器不支持 audio 标签.</audio>
		<section class=" select" :style="{'height':height+'px'}" v-el:eeee>
	        <div class="sec-intro" style="background: url('./p/images/home-bg.jpg') center center no-repeat; background-size: 100% 100%; height:100%;width:100%; overflow: hidden; color: #fff; ">
	        	<div class="room-content">
	               <img :src="$root.activityBasePath+'/images/m1.png'" class="animated home" style="position: absolute; left: 50%; top: 50%; margin: -302px 0 0 -280px;" :class="{hide: !home,bounceIn: home}"/>
	            </div>
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	        </div>
            
            <!-- <span class="arrow-down"></span> -->
        </section>

        <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./p/images/music-bg1.jpg') center center no-repeat;  background-size: 100% 100%; height:100%;width:100%; overflow: hidden; color: #fff; ">
	            <div class="room-content">
	               <img :src="$root.activityBasePath+'/images/m2.png?v1'" class="animated" style="position: absolute; right: 40px; top: 365px;" :class="{hide: !m1,bounceIn: m1}"/>
					<img :src="$root.activityBasePath+'/images/m3.png'" class="animated" style="position: absolute;top: 465px;right: 120px;" :class="{hide: !m1, bounceIn: m1}"/>
					<img :src="$root.activityBasePath+'/images/m4.png'" class="animated" style="position: absolute;top: 470px;left: 40px;" :class="{hide: !m1, bounceIn: m1}"/>

	            </div>
	            <img :src="'H5/images/icon-try.png'" style="position: absolute; top: 86%; left: 14%; z-index: 10;" :class="{roll: $root.isSongRoll}" @click="playMusic(1)"/>
	    		<img :src="'H5/images/icon-buy.png'" style="position: absolute; top: 86%; right: 14%; z-index: 10;" @click="buyMusic(1)"/>
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./p/images/music-bg2.jpg') center center no-repeat;  background-size: 100% 100%; height:100%;width:100%; overflow: hidden; color: #fff; ">
	           
                <img :src="$root.activityBasePath+'/images/m5.png'" class="animated" style="position: absolute; top: 80px; left: 50%; margin-left: -143.5px;" :class="{hide: !m2,bounceIn: m2}"/>
				<img :src="$root.activityBasePath+'/images/m6.png'" class="animated" style="position: absolute; bottom: 60px;left: 50%; margin-left: -278px;" :class="{hide: !m2, bounceIn: m2}"/>
				
				<img :src="'H5/images/icon-try.png'" style="position: absolute; top: 86%; left: 14%; z-index: 10;" :class="{roll: $root.isSongRoll}" @click="playMusic(2)"/>
	    		<img :src="'H5/images/icon-buy.png'" style="position: absolute; top: 86%; right: 14%; z-index: 10;" @click="buyMusic(2)"/>
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./p/images/music-bg3.jpg') center center no-repeat;  background-size: 100% 100%; height:100%;width:100%; overflow: hidden; color: #fff; ">
	           
                <img :src="$root.activityBasePath+'/images/m7.png'" class="animated" style=" position: absolute;left: 60px;top: 10%;" :class="{hide: !m3,bounceIn: m3}"/>
				<img :src="$root.activityBasePath+'/images/m8.png'" class="animated" style="position: absolute; top: 50%; left: 170px;" :class="{hide: !m3, bounceIn: m3}"/>
				
				<img :src="'H5/images/icon-try.png'" style="position: absolute; top: 86%; left: 14%; z-index: 10;" :class="{roll: $root.isSongRoll}" @click="playMusic(3)"/>
	    		<img :src="'H5/images/icon-buy.png'" style="position: absolute; top: 86%; right: 14%; z-index: 10;" @click="buyMusic(3)"/>
	            
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./p/images/music-bg4.jpg') center center no-repeat;  background-size: 100% 100%; height:100%;width:100%; overflow: hidden; color: #fff; ">
	           
                <img :src="$root.activityBasePath+'/images/m9.png'" class="animated" style=" position: absolute;left: 50%;top: 10%; margin-left: -310px;" :class="{hide: !m4,bounceIn: m4}"/>
				<img :src="$root.activityBasePath+'/images/m10.png'" class="animated" style="position: absolute;top: 52%; right: 50%;margin-right: -203px;" :class="{hide: !m4, bounceIn: m4}"/>
				
				<img :src="'H5/images/icon-try.png'" style="position: absolute; top: 86%; left: 14%; z-index: 10;" :class="{roll: $root.isSongRoll}" @click="playMusic(4)"/>
	    		<img :src="'H5/images/icon-buy.png'" style="position: absolute; top: 86%; right: 14%; z-index: 10;" @click="buyMusic(4)"/>
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./p/images/music-bg5.jpg') center center no-repeat;  background-size: 100% 100%; height:100%;width:100%; overflow: hidden; color: #fff; ">
	            <img :src="$root.activityBasePath+'/images/m11.png'" class="animated" style="position: absolute;right: 50%;top: 7%; margin-right: -185px;" :class="{hide: !m5,bounceIn: m5}"/>
				<img :src="$root.activityBasePath+'/images/m12.png'" class="animated" style="position: absolute;bottom: 200px;left: 100px;" :class="{hide: !m5, bounceIn: m5}"/>
	            
	            <img :src="'H5/images/icon-try.png'" style="position: absolute; top: 86%; left: 14%; z-index: 10;" :class="{roll: $root.isSongRoll}" @click="playMusic(5)"/>
	    		<img :src="'H5/images/icon-buy.png'" style="position: absolute; top: 86%; right: 14%; z-index: 10;" @click="buyMusic(5)"/>
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./p/images/end.jpg') center center no-repeat;  background-size: 100% 100%; height:100%;width:100%; overflow: hidden; color: #fff; ">
	            <img :src="$root.activityBasePath+'/images/m13.png'" class="animated" style="position: absolute;left: 50%;top: 20%;margin-left: -240px;" :class="{hide: !end,bounceIn: end}"/>
	        </div>
        </section>
	</div>

</template>

<style lang="sass">
	.section-home{
		width: 100%;
		height: 100%;
	}
	.test{
		width: 100%;
		height: 100%;
		
	}
	.home {
		animation-delay: 1s;
	}
	.top {
	    transform: translate(0, -100%)!important;
	    -webkit-transform: translate(0, -100%)!important;
	}

	.select {
	    transform: translate(0, 0)!important;
	    -webkit-transform: translate(0, 0)!important;
	    z-index: 10;
	}
	.hide{
		display: none;
	}
	@keyframes rolls{
		0%{transform: rotate(0deg);}
		100%{transform: rotate(360deg);}
	}
	.roll{
		animation: rolls 5s linear infinite;
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
				 charCurrIndex: 0,
                 sectionIndex:0,
                  height:0,
                  home: true,
                  m1:false,
                  m2: false,
                  m3: false,
                  m4: false,
                  m5: false,
                  end: false,
                  newItem: {
                  	musicBg:'p/images/music.png',
					status: 'play',
                    musicSrc:'p/images/m1.mp3',
					
				   },
				   listall: [{
						status: 'pause',
	                    musicSrc:'p/images/m1.mp3',
						
					},{
						status: 'pause',
	                    musicSrc:'p/images/m2.mp3',
						
					},
					{
						status: 'pause',
	                    musicSrc:'p/images/m3.mp3',
						
					},
					{
						status: 'pause',
	                    musicSrc:'p/images/m4.mp3',
						
					},
					{
						status: 'pause',
	                    musicSrc:'p/images/m5.mp3',
						
					}],
					isroll:false,
					isroll2:false,
					musicIndex: 0,
			}
		},
		 watch: {
           sectionIndex(v){
            	if(v!=1){
            	  // clearInterval(timeout);
            	  this.m1 = true;
            	}
           },
           musicIndex(i){
           		this.newItem.musicSrc = this.listall[i-1].musicSrc;
            	
           },
          
        },
		ready() {
			this.init();
           	this.height = window.innerHeight;
           	this.$dispatch('addOperLog', 'button','signin');
            // window.sss = this;
           	//音乐组件里的setSwitchListener方法
           	this.$root.$refs.music.setSwitchListener(this.backgroundMusicSwitch);

		},

		methods: {
			backgroundMusicSwitch(e){
				if(e == "play"){
					var audio1 = document.querySelector("#audio1");
	 				audio1.pause();
	 				this.$root.isSongRoll = false;
				}
			},
			getSectionIndex(){
        		for(var i=0;i<  document.getElementsByTagName("section").length;i++){
        			var cc = document.getElementsByTagName("section")[i].getAttribute("class");
        			if(cc && cc.indexOf("select")!=-1){
    			 	  	this.$set("sectionIndex",i)
    			 	  	if(this.sectionIndex == 1){
	    			 	 	var timeout=setTimeout(()=>{
								this.m1 = true;

				 			},1000);
				 			
        				}
        				if(this.sectionIndex == 2){
	    			 	 	var timeout=setTimeout(()=>{
								this.m2 = true;

				 			},1000);
				 			
        				}
        				if(this.sectionIndex == 3){
	    			 	 	var timeout=setTimeout(()=>{
								this.m3 = true;

				 			},1000);
				 			//clearInterval(timeout, 2000);
        				}
        				if(this.sectionIndex == 4){
	    			 	 	var timeout=setTimeout(()=>{
								this.m4 = true;

				 			},1000);
				 			//clearInterval(timeout, 2000);
        				}
        				if(this.sectionIndex == 5){
	    			 	 	var timeout=setTimeout(()=>{
								this.m5 = true;

				 			},1000);
				 			//clearInterval(timeout, 2000);
        				}
        			 	if(this.sectionIndex == 6){
	    			 	 	var timeout=setTimeout(()=>{
								this.end = true;

				 			},1000);
				 			//clearInterval(timeout, 2000);
        				}
        			 	 
			     		
        			 }
        		}
        	},
            init() {
                var item = document.querySelectorAll('section');
                console.log(item);
                var that = this;

                for (var i = 0; i < item.length; i++) {
                    console.log(item[i]);
                    //注册上滑事件
                    Rhui.mobile.swipeUp(item[i],
                        function(event) {
                            var $el = event.currentTarget,
                                top = $el.previousElementSibling,
                                bottom = $el.nextElementSibling;
                            if (bottom) {
                                $el.setAttribute('class', 'top');
                                bottom.setAttribute('class', 'select');
                            }
                            that.getSectionIndex();
                        });
                    //注册下滑事件
                    if(i!=0){
                    	 Rhui.mobile.swipeDown(item[i],
                    	function(event) {
                            var $el = event.currentTarget,
                                top = $el.previousElementSibling,
                                bottom = $el.nextElementSibling;
                                 
                            if (top) {
                                $el.setAttribute('class', '');
                                top.setAttribute('class', 'select');
                            }
                             that.getSectionIndex();
                        });
                    }
                   
                }
            },
            playMusic(index){
            	var that = this;
            	var oldindex = this.musicIndex;
            	this.musicIndex = index;

            	this.newItem.musicSrc = this.listall[index-1].musicSrc;
				var audio1 = document.querySelector("#audio1");
                if(audio1.paused){
                	this.$dispatch('addOperLog', 'button','playMusic'+index);
                	this.$root.isSongRoll = true;
                	//关掉背景音乐
            		this.$root.$refs.music.sounddisable(true);
					this.musicStatus = 'play';
	 				audio1.loop = true;
	 				// audio1.play();
	 				// setTimeout(function(){
	 				audio1.play();
	 					// },200);
	 				// audio.loop = true;
	 				
	 			}else{
	 				this.$root.isSongRoll = false;
	 				this.musicStatus = 'pause';
	 				audio1.pause();
	 				// this.$root.$refs.music.sounddisable(false);
	 				if(oldindex != index){
	 					audio1.currentTime = 0;
	 					setTimeout(function(){
	 						that.playMusic(index)
	 					},200);
	 				}
	 			}
			},
			buyMusic(index){
				var that = this;
				if(index == 1){
					that.$root.buySong ='不想上班-肖央';
					that.$root.buySongId = '9045900020161228411001';
				}else if(index == 2){
					that.$root.buySong ='YES I DO-陈乔恩';
					that.$root.buySongId = '9772000020161223410884';
				}
				else if(index == 3){
					that.$root.buySong ='因为爱情-齐秦、齐豫';
					that.$root.buySongId = '9238900020150825292702';
				}
				else if(index == 4){
					that.$root.buySong ='团圆饭-英皇群星';
					that.$root.buySongId = '9070700020161226410986';
				}
				else if(index == 5){
					that.$root.buySong ='中国味道-凤凰传奇';
					that.$root.buySongId = '9046200020150811246727';
				}
				this.$dispatch('addOperLog', 'button','buyMusic'+index);
				console.log(that.$root.buySong);
				if(!that.$root.islogin){
					that.netLoginForH5();
				}else{
					if(this.$root.cookieVip !='0000000000'){
						this.$root.openvip = true;	
					}else{
						this.$root.coupon = true;
					}
				}
				
			},
			netLoginForH5(){
				var that = this;
				sapi.netLoginForH5(that,{},(back)=>{
					if(back.resCode == '0'){
						that.$root.vipInfo.mobile = back.repBody.mobile;
						that.$dispatch('loginok', back);
						sessionStorage.setItem('LoginMobile',back.repBody.mobile);
						
					}else{
						// that.$dispatch('handle_server_error', back);
						that.$root.login = true;
					}
				})
				
				
			}
		}
	}
</script>