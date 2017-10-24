<template>
	<div class="app-views">
		<!-- <div v-show="musicData.showMusic" class="music-warp">
			<music :music-bg.sync="musicData.musicBg" :music-status.sync="musicData.status"></music>
		</div> -->
		<router-view transition="slide"></router-view>
		
		<div v-if="isLoading">
			<loading :text="loading.text" :show.sync="loading.show" :icon="loading.icon" :duration="loading.duration" :name="loading.name" v-for="loading in loadingdata.loadings"></loading>
		</div>

		<!-- <modal :show.sync="preventModal" :box="false">
			<div class="modal-body modal-share">
				<p style="font-size: 30px;">没有导游权限还想操作活动，做梦了吧你！</p>
			</div>
		</modal> -->
		<p style="font-size: 30px;position: absolute;width: 100%;height: 100%;z-index: 1999;text-align: center;padding: 200px 20px;background-color: #eee;" v-if="preventModal">没有导游权限还想操作投票活动，做梦了吧你！</p>
		<login :login-show.sync="login"></login>
	</div>
	
</template>

<script>
	import {router} from './index';
	import Loading from './components/Loading.vue'
	import urlUtil from './utils/url.js'
	import Modal from './components/Modal.vue'
	import login from './components/login.vue'
	import sapi from './utils/serverapi.js'
	import wxUtil from './components/utils/wx.js'

	export default {
		components: {
			Loading,
			Modal,
			login
		},
		data() {
			return {
				barTitle: '导游中心',
				basePath: basePath,
				activityBasePath:activityBasePath,
				loadingdata: {loadings:[]},
				isLoading:false,
				preventModal: false,
				login:false,
				islogin:false,
				isGuide:isGuide,
				wxlisten:{},
				share: {
					href: location.href.split('#')[0],
					title: '沃周末旅游',
					sharetext: '美好周末，wo如约而至。',
					sharehref: '',
					// shareicon: location.href.split('#')[0] + "images/shareIcon.png",
					shareicon: activityBasePath + "/images/shareIcon.png",
					shareBasePath: '',
					id:''
				}
			}
		},
		ready() {
			var that = this;
			if(checkLogin()) {
				this.islogin = true;
			}
			else{
				// if(window.location.href.indexOf('/register') < 0){
				// 	router.go('register');
				// }
				// this.islogin = false;
				// this.login = true;
			}

			this.$router.afterEach(function(){
				// console.log("dgewh")
				that.updateHref();
			})

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
				this.islogin = false;
				this.login = true;
			});

			that.$on('handle_server_error', (parameter) => {
				if (parameter.code=="7") {
					that.$dispatch('login', window.location.search);
				}else{
					if(SSD_DEBUG){
						var msg = "";
						if(parameter.description){
							msg = parameter.description;
						}
						that.$dispatch('loading', {text: msg, icon: false, show: true, duration: 2000});
					}
				}
			});
			that.$on('loginok', (parameter) => {
				if(parameter && parameter.data){
					isGuide = true;
					this.isGuide = true;
				}else{
					if(this.$route.path.indexOf("/vote") != 0 && this.$route.path.indexOf("/join") != 0){
						this.preventModal = true;
					}
				}
				if(this.loginlisten){
					this.loginlisten();
				}
				this.islogin = true;
				isLogin = true;
			});
			that.getJsSign();
		},

		watch: {
		},

		methods: {
			getJsSign(){

        		sapi.getJsSign(this, "?url="+this.share.href, (back)=> {

					if(back.code=="0") {
						wxUtil.config(back.data, true, () => {
							this.updateHref();
						});

					}

        		});
			},
			updateHref(share) {
				
					share = this.share;
					let href = location.href;
					if (href.indexOf('vote') > -1) {
						share.title = '沃周末投票活动';
						share.sharetext = '我正在参加广东联通116114沃周末旅游活动。美好周末，wo如约而至。';
						share.sharehref = location.href;
						
					}
					 else {
					 	 share.title ='沃周末旅游';
						share.sharetext = '美好周末，wo如约而至。';
						share.sharehref = location.href;
					 }
				
				wxUtil.share(share.title, share.sharetext, share.sharehref, share.shareicon, (type,state)=>{
					
				});
			}
		}
	}

	function checkLogin() {
		return isLogin;
	}
</script>
<style lang="scss" src="./css/style.scss"></style>
<style lang="scss">
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