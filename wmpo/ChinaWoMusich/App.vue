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
				<div class="btn"><span class="rd" @click="shareModal=false;">关闭</span></div>
			</div>
		</modal>
		<activity-details :show.sync="showActivityD"></activity-details>
		<login :login-show.sync="login"></login>
		<success :success-show.sync="success" :tipdef="tipdef"></success>
	</div>

</template>

<script>
	import {
		router
	} from './index';
	import Loading from './components/Loading.vue'
	import urlUtil from './utils/url.js'
	import Modal from '../../src/components/Modal.vue'
	import login from './components/login.vue'
	import activityDetails from './components/activityDetails.vue'
	import music from './components/music.vue'
	import sapi from './utils/serverapi.js'
	import success from './components/success.vue'
	export default {
		components: {
			Loading,
			Modal,
			login,
			activityDetails,
			music,
			success
		},
		data() {
			return {
				barTitle: '跑马灯活动',
				basePath: basePath,
				activityBasePath: activityBasePath,
				loadingdata: {
					loadings: []
				},
				isLoading: false,
				shareModal: false,
				login: false,
				islogin: false,
				gameLevel: -1,
				goodlucky: false,
				success: false,
				tipdef: true,
				showActivityD: false,
				fmappurl: "http://fm.10155.com/s/acc/1/1",
				womusichomeurl: "http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=ff80808156576253015658cd9ba20484",
				songlisturl: "http://www.10155.com",
				wxlisten: {},
				musicData: {
					musicBg: 'b/images/music.png',
					showMusic: false,
					status: 'play'
				},
				activityConfig: {
					levels: [{
						"square": 2,
						"title": "四宫格",
						"isEdit": false,
						"time": {
							"mins": 0,
							"secounds": 10
						},
						"score": 5
					}, {
						"square": 3,
						"title": "九宫格",
						"isEdit": false,
						"time": {
							"mins": 2,
							"secounds": 0
						},
						"score": 15
					}],
					images: [activityBasePath + "/images/sp-img.jpg", activityBasePath + "/images/sp-img2.jpg", activityBasePath + "/images/sp-img3.jpg"],
					urls: ["http://imusic.wo.com.cn/Club/portal/zwzt/00_4798_th.jsp?cid=004798", "http://imusic.wo.com.cn/Club/portal/zwzt/00_4800_th.jsp?cid=004800", "http://imusic.wo.com.cn/Club/portal/zwzt/00_4801_th.jsp?cid=004801&unikey=00000000575423a10157550f835d020b"]
				}
			}
		},
		ready() {

			this.addOperLog();
			var that = this;
			wxback = function() {
				if(!that.islogin) return;
				sapi.shareSuccess(that, {}, (back) => {
					that.$broadcast("refshShareFun")
				})
			};
			if(checkLogin()) {
				this.islogin = true;
				// this.checktokentest();
			} else {
				if(window.location.href.indexOf('/home') < 0) {
					// router.go('home');
				}
				this.islogin = false;
				// this.login = true;
			}

			that.$on('title', (title) => {
				document.title = title;
				that.barTitle = title;
			});

			that.$on('loading', (loading) => {
				if(!loading.name) {
					loading.name = 'tip';
				}
				if(!loading.icon) {
					loading.icon = false;
				}
				for(var i = 0; i <= that.loadingdata.loadings.length - 1; i++) {
					var item = that.loadingdata.loadings[i];
					if(!item || !item.show) {
						that.loadingdata.loadings.splice(i, 1);
						i--;
					}
				};
				that.loadingdata.loadings.push(loading);
				that.isLoading = that.loadingdata.loadings.length > 0;
			});
			that.$on('cancelloading', (name) => {
				for(var i = 0; i <= that.loadingdata.loadings.length - 1; i++) {
					var item = that.loadingdata.loadings[i];
					if(item && item.name && item.name == name) {
						item.show = false;
						that.loadingdata.loadings.splice(i, 1);
						i--;
					}
				};
				that.isLoading = that.loadingdata.loadings.length > 0;
				if(!that.isLoading) {
					document.querySelector('.app-view').classList.remove('open');
				}

			});

			that.$on('login', (parameter) => {
				if(window.location.href.indexOf('/home') < 0) {
					// router.go('home');
				}
				this.islogin = false;
				this.login = true;

			});

			that.$on('handle_server_error', (parameter) => {
				if(parameter.resCode == "10003") {
					that.$dispatch('login', window.location.search);
				} else {
					if(SSD_DEBUG) {
						var msg = "";
						if(parameter.resMsg) {
							msg = parameter.resMsg;
						}
						that.$dispatch('loading', {
							text: msg,
							icon: false,
							show: true,
							duration: 2000
						});
					}
				}
			});
			that.$on('loginok', (parameter) => {
				this.islogin = true;
				if(this.gameLevel >= 0) {
					this.saveUserH5Info();
				} else if(this.goodlucky) {
					this.goodlucky = false;
				}
			});

			var path = this.$route.path;
			this.musicData.showMusic = true;

		},

		watch: {},
		methods: {
			addOperLog() {
				sapi.addOperLog(this, {
					'aid': aid,
					'type': 'signin',
					'source': source
				}, (back) => {})
			},
			saveUserH5Info() {
				var that = this;
				that.$dispatch('loading', {
					name: 'app_save',
					icon: true,
					text: '数据保存中...',
					show: true,
					duration: 20 * 1000
				});
				sapi.saveUserH5Info(that, {
					types: '拼歌单达人',
					scoreorg: that.gameLevel
				}, (back) => {
					that.gameLevel = -1;
					that.$dispatch('cancelloading', 'app_save');
					if(back.resCode == "0") {
						router.go({
							path: '/marquee'
						});
					} else {
						that.$dispatch('handle_server_error', back);
					}
				})
			},
			checktokentest() {
				var that = this;
				sapi.quePrizeDrawResult(this, {}, (back) => {
					if(back.resCode == "10003") {
						that.islogin = true;
					}
				});
			}
		}
	}

	function checkLogin() {
		var login = false;
		if(document.cookie.indexOf('wmpologinToken') < 0) {
			// location.href = basePath + 'login.jsp'+window.location.search;
		} else {
			login = true;
		}

		return login;
	}
</script>

<style lang="sass">
	@keyframes roll {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	
	.music-warp {
		position: absolute;
		right: 38px;
		top: 20px;
		font-size: 0;
		animation: roll 5s linear infinite;
		z-index: 9;
	}
</style>