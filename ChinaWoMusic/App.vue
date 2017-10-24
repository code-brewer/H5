<template>
	<div class="app-views">
		<div v-show="musicData.showMusic" class="music-warp">
			<music :music-bg.sync="musicData.musicBg" :music-status.sync="musicData.status"></music>
		</div>
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
		<login :login-show.sync="login"></login>

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
	import Modal from '../src/components/Modal.vue'
	import login from './components/login.vue'
	import activityDetails from './components/activityDetails.vue'
	import music from './components/music.vue'
	import sapi from './utils/serverapi.js'

	export default {
		components: {
			Loading,
			Modal,
			login,
			activityDetails,
			music
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
				showActivityD:false,
				fmappurl:"http://fm.10155.com/s/acc/1/1",
				wxlisten:{},
				musicData: {
					musicBg: 'a/images/music.png',
					showMusic: false,
					status: 'play'
				}
			}
		},
		ready() {
			var that = this;
			wxback = function(){
				sapi.addShareLog(that,{"types":"0"},(back)=>{
					if(back){
						if(back.resCode==0 || back.resCode=="0"){
							if(that.wxlisten.that){
								that.wxlisten.shareupdate();
							}
						}else{
							that.$dispatch('handle_server_error', back);
						}
					}
				})
			};
			if(checkLogin()) {
				this.islogin = true;
				this.checktokentest();
			}
			else{
				if(window.location.href.indexOf('/home') < 0){
					router.go('home');
				}
				this.islogin = false;
				// this.login = true;
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
				if(window.location.href.indexOf('/home') < 0){
					router.go('home');
				}
				this.islogin = false;
				this.login = true;

			});

			that.$on('handle_server_error', (parameter) => {
				if (parameter.resCode=="10003") {
					that.$dispatch('login', window.location.search);
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
			});

			var path = this.$route.path;
			
			if(path.indexOf("home") != -1 || path.indexOf("guess") != -1){
				this.musicData.showMusic = true;
			}
		},

		watch: {
		},

		methods: {
			checktokentest(){
				var that = this;
				sapi.quePrizeDrawResult(this, {}, (back) => {
				 	if(back.resCode == "10003"){
						that.islogin = true;
				    }
				});
			}
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
		top: 98px;
		font-size: 0;
		animation: roll 5s linear infinite;
		z-index: 9;
	}
</style>