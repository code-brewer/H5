<template>
	<div class="app-views">
		<div v-show="musicData.showMusic" class="music-warp">
			<!-- <music :music-bg.sync="musicData.musicBg" :music-status.sync="musicData.status"></music> -->
		</div>
		<router-view transition="slide" :player-and-prize="playerAndPrize"></router-view>
		<!-- <router-view :player-and-prize="playerAndPrize"></router-view> -->
		
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

		<!-- <div style="display:none">
			<img class="baby-img" :src="'a/images/icon1.png'">
			<img class="baby-img" :src="'a/images/icon2.png'">
			<img class="baby-img" :src="'a/images/icon3.png'">
			<img class="baby-img" :src="'a/images/icon4.png'">
			<img class="baby-img" :src="'a/images/icon5.png'">
		</div> -->

	</div>
	
</template>

<script>
	import {router} from './index';
	import Loading from './components/Loading.vue'
	import urlUtil from './utils/url.js'
	import modal from './src/Modal.vue'
	// import login from './components/login.vue'
	import activityDetails from './components/activityDetails.vue'
	// import music from './components/music.vue'
	import sapi from './utils/serverapi.js'

	export default {
		components: {
			Loading,
			modal,
			activityDetails,
			
		},
		data() {
			return {
				barTitle: '跑马灯动',
				basePath: basePath,
				activityBasePath:basePath,
				loadingdata: {loadings:[]},
				isLoading:false,
				shareModal: false,
				login:false,
				islogin:false,	 			
				showActivityD:false,




				playerAndPrize : {},
				fmappurl:"http://fm.10155.com/s/acc/1/1",
				wxlisten:{},
				musicData: {
					musicBg: 'images/music.png',
					showMusic: false,
					status: 'play'
				},
				afterSaveRecord:false,
				hadPass:false
			}
		},
		ready() {
				sapi.getPlayerAndPrizeCnt(this,{},(back)=>{
					if(back){
						if  (back.resCode==='0'&&back.resMsg==='success') {
							this.playerAndPrize = back.repBody[0]
						}
					}
				})

				// sapi.login(this,{
				// 	mobile : '13286504466',
				// 	code : ''
				// },(back)=>{
				// 	if(back){
				// 		console.log(back)
				// 	}
				// })
				if ( window.sessionStorage.getItem('login')){
					this.islogin = true;
				}

			console.log(this.activityBasePath);
			var that = this;
			wxback = function(){
				sapi.shareSuccess(that,{},(back)=>{
					if(back){
						if(back.resCode==0 || back.resCode=="0"){
							alert(vthat.wxlisten.that);
							if(that.wxlisten.that){
								that.wxlisten.shareupdate();
							}
						}else{
							that.$dispatch('handle_server_error', back);
						}
					}
				})
			};

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
				if(window.location.href.indexOf('/home') < 0){
					router.go('home');
				}
				this.islogin = false;
				this.login = true;

			});

			that.$on('handle_server_error', (parameter) => {
				if (parameter.resCode=="10003") {
					console.log('重新加载')
					// location.reload();
				}else{
					if(SSD_DEBUG){
						var msg = "";
						if(parameter.resMsg){
							msg = parameter.resMsg;
						}
						that.$dispatch('loading', {text: msg, icon: false, show: true, duration: 1000});
					}
				}
			});
			that.$on('loginok', (parameter) => {
				this.islogin = true;
				if(that.hadPass){
					that.saveUserH5Info();
				}else if(that.wxlisten.that){
					that.wxlisten.shareupdate();
				}
			});
			that.$on('gamepass', (parameter) => {
				this.hadPass = true;
				if(that.islogin){
					that.saveUserH5Info();
				}
			});

			var path = this.$route.path;
			
			// if(path.indexOf("home") != -1 || path.indexOf("guess") != -1){
			// 	this.musicData.showMusic = true;
			// }
		},

		// watch: {
		// 	  '$route' (to, from) {
  //             // to.path  /phoneLogin/.test(to.path) ? console.log('打开') : '';
  //             // if (/phoneLogin/.test(to.path)||to.path==='/') {
  //             //   this.isShow = false;
  //             // }else {
  //             //    this.isShow = true;
  //             // }
  //             // if (/home/.test(to.path)&&/phoneLogin/.test(from.path)) {
  //             //   this.clickBar(this.barList[0],0)
  //             // }
  //             console.log(to)
  //             console.log(from)
  //             if (to.path==="/marquee" && from.path==="/home") this.$router.go({path : '/home'});
  //           }
		// },

		methods: {
			checktokentest(){
				var that = this;
				sapi.quePrizeDrawResult(this, {}, (back) => {
				 	if(back.resCode == "10003"){
						that.islogin = true;
				    }
				});
			},
			saveUserH5Info(){ //给用户抽奖次数
                 var that = this;
                sapi.saveClearanceRecord(this, {}, (back)=>{
                    if(back.resCode == "0"){
                        // that.afterSaveRecord = true;
                        that.hadPass = false;
                        if(that.wxlisten.that){
                        	that.wxlisten.shareupdate();
                        }
                    }else{
                        that.$dispatch('handle_server_error', back);
                    }
                })
            },
		}
	}
	// function checkLogin() {
	// 	var login = false;
	// 	if (document.cookie.indexOf('session_user_id') < 0) {
	// 		// location.href = basePath + 'login.jsp'+window.location.search;
	// 	}
	// 	else {
	// 		login = true;
	// 	}

	// 	return login;
	// }
</script>

<style lang="sass">
	@keyframes roll{
		0%{transform: rotate(0deg);}
		100%{transform: rotate(360deg);}
	}
	.music-warp{
		position: absolute;
		right: 38px;
		top: 98px;
		font-size: 0;
		animation: roll 5s linear infinite;
		z-index: 9;
	}
</style>