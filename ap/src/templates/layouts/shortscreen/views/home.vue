<template>
	<div class="app-view home-page" style="overflow: hidden; height: 100%">
		<audio id="audio1" :src="musicSrc" loop="loop" autoplay="autoplay">您的浏览器不支持 audio 标签.</audio>
		<section style="height: 100%" :class="{select:$index == 0}" v-for="item in activityConfig.shortScreen">
	        <div class="sec-intro" :style="{'background': 'url('+item.imgUrl+') center center no-repeat','background-size': '100% 100%', 'height':'100%','width':'100%', 'overflow':' hidden',' color': '#fff'}">
	        	<img class="arrow-down arrow-left" src="../images/arrow-left.png" v-if="activityConfig.switchtype == 'heng'">
	        	<img class="arrow-down" src="../images/arrow-down.png" v-if="activityConfig.switchtype == 'shu'">
	        	<div class="player">
					<p class="text">{{item.song}}</p>
					<p class="img">
						<img src="../images/ling-icon.png" @click="order(item)">
						<img :src=" $root.basePath +toggleIcon" @click="toggleAudio">
					</p>
				</div>
	        </div>
        </section>
</template>
<script>
	import utils from '../../../../utils'
	import Statistics from '../statistics.js'
	import sapi from '../../../service'
	import urlUtil from '../../../utils/url.js'
	import swipe from '../../../../js/swipe.js'
	export default {
		components: {
			swipe
		},
		data() {
			var activityConfig = window.store.activityConfig;
			return {
				activityConfig,
				usid: '',
				activity_usid: '',
				activity: {},
				picList: [],
				userPicList: [],
				hasLiked:false,
				musicSrc:'',
				sectionIndex:null,
				toggleIcon:'templates/static/img/pause-icon.png'
			}
		},
		created(){
			// this.getUserInfo();

		},
		ready(){
			//试听地址添加渠道和内容id
			for(var i = 0, len = this.activityConfig.shortScreen.length; i< len; i++){
				this.activityConfig.shortScreen[i].url = this.activityConfig.shortScreen[i].url +'?user=null&channelID=' + urlUtil.getArgsFromUrl('channle') + '&contentid=' + this.activityConfig.shortScreen[i].musicId;

			}
			console.log(this.activityConfig.shortScreen);
			this.init();
			this.getSectionIndex();
			var audio = document.querySelector("#audio1");
			document.addEventListener("WeixinJSBridgeReady", function () {
				audio.play();
			}, false);
			
			document.addEventListener("touchstart", this.touch, false);
			// Statistics.homePage(); // 统计首页pv/uv
		},
		methods: {
			touch(){
				var audio = document.querySelector("#audio1");
				audio.play();
				document.removeEventListener("touchstart", this.touch, false); 
			},
			getUserInfo() {
				sapi.getUserInfo(this, {}, (back) => {
					console.log(back)
					if(back.resCode == "0") {
						this.usid = back.repBody[0].usid;
						window.openid = back.repBody[0].wx;
						// 获取路由里面的usid
						var router_usid = urlUtil.getArgsFromUrl("usid");

						if(router_usid && router_usid != this.usid) {
							this.visiteMode = 'share';
							this.activity_usid = router_usid;
						} else {
							this.activity_usid = this.usid;
						}
					} else {
						this.$dispatch('handle_server_error', back);
					}
				})
			},
			/**
			 * [order 订购铃音]
			 * @param  {[type]} item [具体铃音]
			 * @return {[type]}      [description]
			 */
			order(item){
				this.pvLog('page'+this.sectionIndex+'_order1');
				Statistics.homePage('page'+this.sectionIndex+'_order1','click');
				this.$root.buySong = item.song;
				//判断是否为会员，buySongId赋不同值
				if(utils.getcookie('cn.easier.gsu.tone.user') == 'true'){
					this.$root.buySongId = item.musicVipId;
				}else{
					this.$root.buySongId = item.musicId;
				}
				//判断是否登录
				if(!!utils.getcookie('shortscreen_logined')){
					//判断是否有炫铃功能
					if(utils.getcookie('cn.easier.gsu.ring.member') == 'true'){
						this.$root.orderbell = true;
					}else{
						this.$root.openbell = true;
					}
					
				}else{
					this.$root.login = true;
				}
				
			},
			/**
			 * [toggleAudio 播放暂停音乐切换]
			 * @param  {[type]} index [页面index]
			 * @return {[type]}       [description]
			 */
			toggleAudio(index){
				var audio = document.querySelector("#audio1");
				if(audio.paused){
					audio.loop = true;
					this.toggleIcon = 'templates/static/img/pause-icon.png';
	 				audio.play();

				}else{
					this.toggleIcon = 'templates/static/img/open-icon.png';
					audio.pause();
				}
				this.pvLog('page'+this.sectionIndex+'_listen');
				Statistics.homePage('page'+this.sectionIndex+'_listen','click');
			},
			init() {
	            var item = document.querySelectorAll('section');
	            console.log(item);
	            var that = this;
	            for (var i = 0; i < item.length; i++) {
	                console.log(item[i]);
	                if(that.activityConfig.switchtype == "heng"){
	                	item[i].style.transform ="translate(100%, 0)";
	                	 //注册左滑事件
	                	if(i!=item.length-1){
		                Rhui.mobile.swipeLeft(item[i],
		                    function(event) {
		                    	console.log(event)
		                        var $el = event.currentTarget,
		                            top = $el.previousElementSibling,
		                            bottom = $el.nextElementSibling;
		                        if (bottom) {
		                            $el.setAttribute('class', 'left');
		                            bottom.setAttribute('class', 'select');
		                        }
		                         that.getSectionIndex();
		                    });
		                }
		                //注册右滑事件
		                if(i!=0){
		                	 Rhui.mobile.swipeRight(item[i],
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
	                }else{
	                	item[i].style.transform ="translate(0, 100%)";
	                	 //注册上滑事件
	                	 if(i!=item.length-1){
		                Rhui.mobile.swipeUp(item[i],
		                    function(event) {
		                    	console.log(event)
		                        var $el = event.currentTarget,
		                            top = $el.previousElementSibling,
		                            bottom = $el.nextElementSibling;
		                        if (bottom) {
		                            $el.setAttribute('class', 'top');
		                            bottom.setAttribute('class', 'select');
		                        }
		                         that.getSectionIndex();
		                    });
		            	}
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
	               
	               
	            }
            },
            //每切换页面调用
            getSectionIndex(){
        		for(var i=0,len =  document.getElementsByTagName("section").length;i<len ;i++){
        			var cc = document.getElementsByTagName("section")[i].getAttribute("class");
        			
        			if(cc && cc.indexOf("select")!=-1){
        				this.$set("sectionIndex",i+1);
        				sessionStorage.setItem('sectionIndex',i+1);
        				//设置播放音乐
    			 	  	var audio = document.querySelector("#audio1");
    			 	  	this.musicSrc = this.activityConfig.shortScreen[i].url;
    			 	  	audio.currentTime = 1;
    			 	  	audio.loop = true;
    			 	  	this.toggleIcon = 'templates/static/img/pause-icon.png';
			 	  		var timeout=setTimeout(()=>{
							audio.play();
			 			},200);
			 			this.pvLog('page'+(i+1));
        				Statistics.homePage('page'+(i+1),'page'+(i+1));
        				// submitStatInfo(pathUrl,pathUrl,pathUrl,"page"+(i+1),"","","wap",urlUtil.getArgsFromUrl('channle'), window.openid || '',"");
        			 }
        		}
        	},
        	/**
        	 * [pvLog 数据打点]
        	 * @param  {[type]} gateModel [传参数gateModel]
        	 * @return {[type]}           [description]
        	 */
        	pvLog(gateModel){
        		sapi.pvLog(this,{gateModel:gateModel,channelld:urlUtil.getArgsFromUrl('channle'),browserClient:window.navigator.userAgent},(back)=>{

        				})
        	}
		}
	}
</script>
<style lang="scss" src="../css/style.scss"></style>
<style src="../../../../../node_modules/swiper/dist/css/swiper.min.css"></style>
<style lang="scss">
	@import '../../../../css/px2rem.scss';
	@import '../../../_base_config.scss';
	.top {
	    transform: translate(0, -100%)!important;
	    -webkit-transform: translate(0, -100%)!important;
	}
	.left {
	    transform: translate(-100%, 0)!important;
	    -webkit-transform: translate(-100%, 0)!important;
	}

	.select {
	    transform: translate(0, 0)!important;
	    -webkit-transform: translate(0, 0)!important;
	    z-index: 10;
	}
	section{
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    background: #EAEAEA;
	    transition: all .5s ease;
	    // transform: translate(0, 100%);
	}
	.sectop{
		transform: translate(0, 100%);
	}
	.secleft{
		transform: translate(100%, 0);
	}
</style>
