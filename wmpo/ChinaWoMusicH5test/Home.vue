<template>
	<div class="app-view home-page" style="overflow: hidden;">
		<audio id="audio1" :src="newItem.musicSrc" loop="loop">您的浏览器不支持 audio 标签.</audio>
		<div id="magazine">
		<section class=" select" :style="{'height':height+'px'}" v-el:eeee>
	        <div class="sec-intro" style="background: url('./H5/images/home-bg.jpg') center center no-repeat; height:100%;width:100%; overflow: hidden; color: #fff; ">
	        	<p class="text">所谓的<span>摆渡人，</span></p>
	            <p class="text">不过是爱而不得的牺牲品。 </p>
	            <p class="text">你曾是一段感情的落水者，</p>
	            <p class="text"> 还是不得已的摆渡人？</p>
	            <p class="text">也许你能在这些歌里，</p>
	            <p class="text">找到曾经的 </p>
	            <p class="text">自己。</p>
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	        </div>
            
            <!-- <span class="arrow-down"></span> -->
        </section>

        <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./H5/images/music-bg1.jpg') center center no-repeat; height:100%;width:100%; overflow: hidden; color: #fff; ">
	            <div class="room-content">
	               <img :src="$root.activityBasePath+'/images/m1-1.png'" class="animated" style="position: absolute; left: 80px; top: 68px;" :class="{display: !m1,bounceIn: m1}"/>
					<img :src="$root.activityBasePath+'/images/m1-2.png'" class="animated" style="position: absolute;top: 68px;right: 80px;" :class="{display: !m1, bounceIn: m1}"/>

	            </div>
	            <img :src="$root.activityBasePath+'/images/icon-try.png'" style="    position: absolute; top: 86%; left: 14%;" :class="{roll: $root.isSongRoll}" @click="playMusic(1)" />
	            <img :src="$root.activityBasePath+'/images/icon-buy.png'" style="position: absolute; top: 86%; right: 14%;"  @click="buyMusic(1)" />
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	            
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./H5/images/m-bg2.png') center center no-repeat; height:100%;width:100%; overflow: hidden; color: #fff; ">
	           
               <img :src="$root.activityBasePath+'/images/m2-1.png'" class="animated" style="position: absolute; right: 80px; top: 46%;" :class="{display: !m2,bounceIn: m2}"/>
				<img :src="$root.activityBasePath+'/images/m2-2.png'" class="animated" style="position: absolute; top: 19%;left: 66px;" :class="{display: !m2, bounceIn: m2}"/>

	           
	            <img :src="$root.activityBasePath+'/images/icon-try.png'" style="    position: absolute; top: 86%; left: 14%;" :class="{roll: $root.isSongRoll}" @click="playMusic(2)" />
	            <img :src="$root.activityBasePath+'/images/icon-buy.png'" style="    position: absolute; top: 86%; right: 14%;"@click="buyMusic(2)"/>
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./H5/images/m-bg3.png') center center no-repeat; height:100%;width:100%; overflow: hidden; color: #fff; ">
	           
               <img :src="$root.activityBasePath+'/images/m3-1.png'" class="animated" style=" position: absolute;left: 80px;top: 32%;" :class="{display: !m3,bounceIn: m3}"/>
				<img :src="$root.activityBasePath+'/images/m3-2.png'" class="animated" style="position: absolute; top: 10%; left: 90px;" :class="{display: !m3, bounceIn: m3}"/>

	            <img :src="$root.activityBasePath+'/images/icon-try.png'" style="    position: absolute; top: 86%; left: 14%;" :class="{roll: $root.isSongRoll}" @click="playMusic(3)" />
	            <img :src="$root.activityBasePath+'/images/icon-buy.png'" style="    position: absolute; top: 86%; right: 14%;" @click="buyMusic(3)"/>
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./H5/images/m-bg4.png') center center no-repeat; height:100%;width:100%; overflow: hidden; color: #fff; ">
	           
               <img :src="$root.activityBasePath+'/images/m4-1.png'" class="animated" style=" position: absolute;left: 50%;top: 41%; margin-left: -210px;" :class="{display: !m4,bounceIn: m4}"/>
				<img :src="$root.activityBasePath+'/images/m4-2.png'" class="animated" style="position: absolute;top: 8%; right: 50%;margin-right: -160px;" :class="{display: !m4, bounceIn: m4}"/>

	           
	            <img :src="$root.activityBasePath+'/images/icon-try.png'" style="    position: absolute; top: 86%; left: 14%;" :class="{roll: $root.isSongRoll}" @click="playMusic(4)" />
	            <img :src="$root.activityBasePath+'/images/icon-buy.png'" style="    position: absolute; top: 86%; right: 14%;" @click="buyMusic(4)"/>
	            <img class="arrow-down" :src="'H5/images/arrow-down.png'">
	        </div>
        </section>
         <section :style="{'height':height+'px'}">
        	<div class="sec-room" style="background: url('./H5/images/m-bg5.png') center center no-repeat; height:100%;width:100%; overflow: hidden; color: #fff; ">
	           <img :src="$root.activityBasePath+'/images/m5-1.png'" class="animated" style="position: absolute;right: 30px;top: 59%;" :class="{display: !m5,bounceIn: m5}"/>
					<img :src="$root.activityBasePath+'/images/m5-2.png'" class="animated" style="position: absolute;top: 52%;left: 60px;" :class="{display: !m5, bounceIn: m5}"/>
	            <img :src="$root.activityBasePath+'/images/icon-try.png'" style="    position: absolute; top: 86%; left: 14%;" :class="{roll: $root.isSongRoll}" @click="playMusic(5)" />
	            <img :src="$root.activityBasePath+'/images/icon-buy.png'" style="    position: absolute; top: 86%; right: 14%;" @click="buyMusic(5)"/>
	            
	        </div>
        </section>
        </div>
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
	.top {
	    transform: translate(0, -100%)!important;
	    -webkit-transform: translate(0, -100%)!important;
	}

	// .select {
	//     transform: translate(0, 0)!important;
	//     -webkit-transform: translate(0, 0)!important;
	//     z-index: 10;
	// }
	.display{
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
                  m1:false,
                  m2: false,
                  m3: false,
                  m4: false,
                  m5: false,
                  newItem: {
                  	musicBg:'H5/images/music.png',
					status: 'play',
                    musicSrc:'H5/images/m1.mp3',
					
				   },
				   listall: [{
						status: 'pause',
	                    musicSrc:'H5/images/m1.mp3',
						
					},{
						status: 'pause',
	                    musicSrc:'H5/images/m2.mp3',
						
					},
					{
						status: 'pause',
	                    musicSrc:'H5/images/m3.mp3',
						
					},
					{
						status: 'pause',
	                    musicSrc:'H5/images/m4.mp3',
						
					},
					{
						status: 'pause',
	                    musicSrc:'H5/images/m5.mp3',
						
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
			// // this.init();
           	// this.height = window.innerHeight;
           	this.addOperLog('button','signin');
   //         	// window.sss = this;
   //         	//音乐组件里的setSwitchListener方法
   			var that = this;
           	this.$root.$refs.music.setSwitchListener(this.backgroundMusicSwitch);
           	$(window).ready(function() {
				$('#magazine').turn({
									display: 'single',
									acceleration: true,
									gradients: !$.isTouch,
									elevation:50,
									when: {
										turned: function(e, page) {
											that.getSectionIndex(page-1);
											/*console.log('Current view: ', $(this).turn('view'));*/
										}
									}
								});
			});
			
			$(window).bind('keydown', function(e){
				if (e.keyCode==38)
					$('#magazine').turn('previous');
				else if (e.keyCode==40)
					$('#magazine').turn('next');
					
			});

		},
		methods: {
			backgroundMusicSwitch(e){
				if(e == "play"){
					var audio1 = document.querySelector("#audio1");
	 				audio1.pause();
	 				this.$root.isSongRoll = false;
				}
			},
			getSectionIndex(sectionIndex){
        		// for(var i=0;i<  document.getElementsByTagName("section").length;i++){
        		// 	var cc = document.getElementsByTagName("section")[i].getAttribute("class");
        		// 	console.log(cc)
        		// 	if(cc && cc.indexOf("select")!=-1){
    			 	 //  	console.log(cc.indexOf("select"));
    			 	 //  	this.$set("sectionIndex",i)
    			 	 var that = this;
    			 	 that.sectionIndex = sectionIndex;
    			 	  	if(that.sectionIndex == 1){
	    			 	 	var timeout=setTimeout(()=>{
								that.m1 = true;

				 			},1000);
				 			
        				}
        				if(that.sectionIndex == 2){
	    			 	 	var timeout=setTimeout(()=>{
								that.m2 = true;

				 			},1000);
				 			
        				}
        				if(that.sectionIndex == 3){
	    			 	 	var timeout=setTimeout(()=>{
								that.m3 = true;

				 			},1000);
				 			//clearInterval(timeout, 2000);
        				}
        				if(that.sectionIndex == 4){
	    			 	 	var timeout=setTimeout(()=>{
								that.m4 = true;

				 			},1000);
				 			//clearInterval(timeout, 2000);
        				}
        				if(that.sectionIndex == 5){
	    			 	 	var timeout=setTimeout(()=>{
								that.m5 = true;

				 			},1000);
				 			//clearInterval(timeout, 2000);
        				}
        			 	  
        			 	 
			     		
        		// 	 }
        		// }
        	},
   //          // init() {
   //          //     var item = document.querySelectorAll('section');
   //          //     console.log(item);
   //          //     var that = this;
   //          //     for (var i = 0; i < item.length; i++) {
   //          //         console.log(item[i]);
   //          //         //注册上滑事件
   //          //         Rhui.mobile.swipeUp(item[i],
   //          //             function(event) {
   //          //             	console.log(event)
   //          //                 var $el = event.currentTarget,
   //          //                     top = $el.previousElementSibling,
   //          //                     bottom = $el.nextElementSibling;
   //          //                 if (bottom) {
   //          //                     $el.setAttribute('class', 'top');
   //          //                     bottom.setAttribute('class', 'select');
   //          //                 }
   //          //                 that.getSectionIndex();
   //          //             });
   //          //         //注册下滑事件
   //          //         Rhui.mobile.swipeDown(item[i],
   //          //             function(event) {
   //          //                 var $el = event.currentTarget,
   //          //                     top = $el.previousElementSibling,
   //          //                     bottom = $el.nextElementSibling;
   //          //                 if (top) {
   //          //                     $el.setAttribute('class', '');
   //          //                     top.setAttribute('class', 'select');
   //          //                 }
   //          //                  that.getSectionIndex();
   //          //             });
   //          //     }
   //          // },
            playMusic(index){
            	var that = this;
            	var oldindex = this.musicIndex;
            	this.musicIndex = index;

            	this.newItem.musicSrc = this.listall[index-1].musicSrc;
				var audio1 = document.querySelector("#audio1");
				console.log('this.$root.isBaseMusic'+this.$root.isBaseMusic);
                if(audio1.paused){
                	this.$root.isSongRoll = true;
                	
                	//关掉背景音乐
            		this.$root.$refs.music.sounddisable(true);
					this.musicStatus = 'play';
	 				audio1.loop = true;
	 				// audio1.play();
	 				setTimeout(function(){
	 						audio1.play();
	 					},200);
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
					that.$root.buySong ='摆渡人的歌—周华健';
					that.$root.buySongId = '9194000020150811226893';
				}else if(index == 2){
					that.$root.buySong ='浪费—徐佳莹';
					that.$root.buySongId = '9772000020160318358301';
				}
				else if(index == 3){
					that.$root.buySong ='红豆—方大同';
					that.$root.buySongId = '9238900020150816263583';
				}
				else if(index == 4){
					that.$root.buySong ='Monica—古巨基';
					that.$root.buySongId = '9910300020160929397169';
				}
				else if(index == 5){
					that.$root.buySong ='你在终点等我—王菲';
					that.$root.buySongId = '9159100020160927396575';
				}
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
						that.$root.login = true;
						// that.$dispatch('handle_server_error', back);
						// setTimeout(function(){
	 				// 		that.$root.login = true;
	 				// 	},2000);
					}
				})
				
				
			},
			addOperLog(type,btnName) {
				sapi.addOperLog(this, {
					'aid':aid,
					'type':type,
					'button_name':btnName,
					'source':source
				}, (back) => {})
			},
			
					
			
		}
	}
</script>