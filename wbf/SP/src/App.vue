<template>
	<div class="app-views">
		<!-- <div v-show="musicData.showMusic" class="music-warp">
			<music :music-bg.sync="musicData.musicBg" :music-status.sync="musicData.status"></music>
		</div> -->
		<router-view transition="slide"></router-view>
		
		<div v-if="isLoading">
			<loading :text="loading.text" :show.sync="loading.show" :icon="loading.icon" :duration="loading.duration" :name="loading.name" v-for="loading in loadingdata.loadings"></loading>
		</div>

		<modal :show.sync="shareModal" :box="false">
			<div class="modal-body modal-share">
				<p style="font-size: 30px;">哈哈</p>
				<div class="btn" ><span class="rd" @click="shareModal=false;">关闭</span></div>
			</div>
		</modal>
		<activity-details :show.sync="showActivityD"></activity-details>
		<!-- <login :login-show.sync="login"></login> -->
		<!-- <success :success-show.sync="success"></success> -->
	</div>
	
</template>

<script>
	import {router} from './index';
	import Loading from './components/Loading.vue'
	import urlUtil from './utils/url.js'
	import Modal from '../src/components/Modal.vue'
	// import login from './components/login.vue'
	import activityDetails from './components/activityDetails.vue'
	import music from './components/music.vue'
	import sapi from './utils/serverapi.js'
	// import success from './components/success.vue'

	export default {
		components: {
			Loading,
			Modal,
			
			activityDetails,
			music,
			
		},
		data() {
			return {
				barTitle: '跑马灯活动',
				basePath: basePath,
				activityBasePath:activityBasePath,
				loadingdata: {loadings:[]},
				isLoading:false,
				shareModal: false,
				login:false,
				islogin:false,
				gameLevel:-1,
				goodlucky:false,
				success:false,
				showActivityD:false,
				fmappurl:"http://fm.10155.com/s/acc/1/1",
				womusichomeurl:"http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=ff80808156576253015658cd9ba20484",
				songlisturl:"http://www.10155.com",
				wxlisten:{},
				musicData: {
					musicBg: 'b/images/music.png',
					showMusic: false,
					status: 'play'
				},
				activityConfig:{
					levels:[{"square":2,"title":"四宫格","isEdit":false,"time":{"mins":0,"secounds":10},"score":5},{"square":3,"title":"九宫格","isEdit":false,"time":{"mins":2,"secounds":0},"score":15}],
					images:[activityBasePath+"src/images/sp-img1.jpg",activityBasePath+"src/images/sp-img2.jpg",activityBasePath+"src/images/sp-img3.jpg",activityBasePath+"src/images/sp-img4.jpg",activityBasePath+"src/images/sp-img5.jpg"],
					
				}
			}
		},
		ready() {
			if(typeof window.requestAnimationFrame == "undefined"){
				window.requestAnimationFrame = function(fun){
					setTimeout(fun,60);
				}
			}
			var that = this;
			// wxback = function(){
			// 	if(!that.islogin)return;
			// 	sapi.addShareLog(that,{"types":"0"},(back)=>{
			// 		if(back){
			// 			if(back.resCode==0 || back.resCode=="0"){
			// 				if(that.wxlisten.that){
			// 					that.wxlisten.shareupdate();
			// 				}
			// 			}else{
			// 				that.$dispatch('handle_server_error', back);
			// 			}
			// 		}
			// 	})
			// };
			if(this.checklogin()) {
				// this.userInfo = eval('('+localStorage.getItem('ams_user_info')+')');
			}

			that.$on('title', (title) => {
				document.title = title;
				that.barTitle = title;
			});

			that.$on('loading', (loading) => {
				if(!loading.name){
					loading.name = 'tip';
				}
				if(!loading.icon){
					loading.icon = false;
				}
				for (var i = 0; i <= that.loadingdata.loadings.length - 1; i++) {
					var item = that.loadingdata.loadings[i];
					if(!item || !item.show){
						that.loadingdata.loadings.splice(i, 1);
						i--;
					}
				};
				that.loadingdata.loadings.push(loading);
				that.isLoading = that.loadingdata.loadings.length>0;
			});
			that.$on('cancelloading', (name) => {
				for (var i = 0; i <= that.loadingdata.loadings.length - 1; i++) {
					var item = that.loadingdata.loadings[i];
					if(item && item.name && item.name == name){
						item.show = false;
						that.loadingdata.loadings.splice(i, 1);
						i--;
					}
				};
				that.isLoading = that.loadingdata.loadings.length>0;
				if(!that.isLoading){
					document.querySelector('.app-view').classList.remove('open');
				}

			});

			that.$on('login', (parameter) => {
				gologin();

			});

			this.$on('handle_server_error', (parameter) => {
				// if (parameter.resCode=="10003") {
				// 	that.$dispatch('login', window.location.search);
				// }else{
				var msgInfo = parameter.msgInfo != "" ? parameter.msgInfo : parameter.msgCode;
					if(SSD_DEBUG){
						that.$dispatch('loading', {text: msgInfo, icon: false, show: true, duration: 2000});
					}
				// }
			});

			// that.$on('loginok', (parameter) => {
			// 	this.islogin = true;
			// 	if(this.gameLevel>=0){
			// 		this.saveUserH5Info();
			// 	}else if(this.goodlucky){
			// 		this.goodlucky = false;
			// 		router.go({path: '/marquee'});
			// 	}
			// });

			var path = this.$route.path;
			
			if(path.indexOf("home") != -1 || path.indexOf("guess") != -1){
				this.musicData.showMusic = true;
			}
		},

		watch: {
		},

		methods: {
			 checklogin(){
            	var that = this;
            	var lo = getArgsFromUrl("loginok");
			    var m = getArgsFromUrl("mbl_no");
			    var at = getArgsFromUrl("auth_token");
      			window.auttok = at;
      			alert('window.auttok'+window.auttok);
			    if(m == ""){
			      if(lo != "" && typeof(window.mbl_no) == "undefined"){
			        that.$dispatch('loading', {name: "qryUserInfo",text: "请稍候...", icon: true, show: true, duration: 20*1000});
            		sapi.qryUserInfo(this, function(back){
            			alert('qryUserInfo'+ back);
            			that.$dispatch('cancelloading',"qryUserInfo"); 
            			if(back.msgCode == 'MKM00000'){
            				alert('back.data.mblNo' + back.data.mblNo);
            				if(back.data.mblNo.length>0){
            					alert('saveUserScore');
            					window.mbl_no = back.data.mblNo;
            					sessionStorage['pass'] = true;
            					router.go({name: 'success', params: {score: 1}});
            					// that.saveUserScore();
            				}
                		}else{
                			that.$dispatch('handle_server_error', back);
                		}
                	})
			      }else if(typeof(window.mbl_no) != "undefined"){
			        delete window.mbl_no;
			      }
			    }else{
			      window.mbl_no = m;
			    }
            	if(typeof(window.uuid) == "undefined"){
            		var nus = navigator.userAgent.split('_');
            		window.uuid = nus[nus.length-1];
            	}
            	
            },
     //        saveUserScore(){
     //    		var that =  this;
     //    		 that.$dispatch('loading', {name: "score",text: "请稍候...", icon: true, show: true, duration: 20*1000});
     //            sapi.Operscore(this, 'pass', function(back){
     //            	alert('saveUserScore'+ JSON.stringify(back));
     //            	that.$dispatch('cancelloading',"score"); 
     //        		if(back.msgCode == 'MKM00000'){
     //        			sessionStorage['score'] = back.data.scoreVal;
     //        			router.go({name: 'success', params: {score: back.data.scoreVal}});
            			
     //        		}
					// else{
     //        			that.$dispatch('handle_server_error', back);
     //        		}
     //        	})
     //        }
		}
	}
	function checkLogin() {
		var login = false;
		if (document.cookie.indexOf('cn.easier.wmpo.user') < 0) {
			// location.href = basePath + 'login.jsp'+window.location.search;
		}
		else {
			login = true;
		}

		return login;
	}
</script>

<style lang="sass">
	@keyframes roll{
		0%{transform: rotate(0deg);}
		100%{transform: rotate(360deg);}
	}
	.music-warp{
		position: absolute;
		right: 38px;
		top: 80px;
		font-size: 0;
		animation: roll 5s linear infinite;
		z-index: 9;
	}
</style>