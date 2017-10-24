<template>
	<div class="app-wrap" :class="direct">
		<banner-page v-show="activityConfig.bannerPage.enable"></banner-page>
		<router-view transition="slide"></router-view>
		<loading :duration="loading.duration" :icon="loading.icon" :text="loading.text" :name="loading.name" v-for="loading in loadings"></loading>
	</div>
</template>

<script>
	import api from '../../service'
	import { router } from './app.js'
	import routeList from './route'
	import wx from '../../utils/wx.js'
	export default {
		props: {
			id: {
				type: String
			}
		},
		data() {
			var activityConfig = window.store.activityConfig
			var configData = window.store.configData
			var common = window.store.activityConfig.common
			return {
				routeHistory: [],
				direct: 'right-left',
				activityConfig,
				configData,
				loadings: [],
				common,
				isLogin: false
			}
		},
		computed: {
			btnStyle: function() {
				var radius = this.common.btnStyle == "boxer" ? "0px" : this.common.btnStyle == "fillet" ? "500px" : "10px";
				if(this.common.btnEnable) {
					return {
						"border-radius": radius,
						"background-color": this.common.btnUrl == "" ? this.common.btnColor : "rgba(0, 0, 0, 0)",
						"background-image": "url(" + this.common.btnUrl + ")",
						"background-size": "100% 100%"
					}
				} else return {}
			}
		},
		created() {
			var that = this;
			api.obtainJssdk(this, { jsurl: location.href.replace(location.hash, '') }, (back) =>{
				console.log(back)
				if(back.resCode == '0') {
					var that = this,
						weixinShare = window.store.activityConfig.weixinShare;
					wx.config(back.repBody);
					wx.share(weixinShare.title, weixinShare.description, window.location.href, weixinShare.imgUrl, (name, type) => {
						if(type == "success") {
							api.sharePlusTime(that, {}, (back) => {
								console.log(back);
							})
						}
					})
				}
			})
			this.checkLogin()
		},
		ready() {
			// this.addLoading({text: '初始化中', name: 'init'})

		},
		methods: {
			// 检查是否登录
			checkLogin() {
				var that = this;
				api.getUserInfo(this, {}, function(back) {

					if(back.resCode == '0') {
						this.isLogin = true;
					} else {
						this.isLogin = false;
						this.addLoading({ text: 'token校验失败', icon: false, duration: 1500, name: 'login' })
						router.go({ path: '/' })
					}

					router.afterEach(function(transition) {
						var to = transition.to.path;
						for(var i = 0; i < routeList.length; i++) {
							if(transition.to.matched[0].handler.path == routeList[i].path) {
								document.title = (routeList[i].title || routeList[i].name)
							}
						};

						var index = that.routeHistory.indexOf(to);

						if(index > -1) {
							that.routeHistory = that.routeHistory.slice(0, index + 1);
							that.direct = 'left-right';
						} else {
							that.routeHistory.push(to);
							that.direct = 'right-left';
						}

						// 未登录阻止操作
						if(transition.to.matched[0].handler.path != '/' && !that.isLogin) {
							that.addLoading({ text: '请登录', icon: false, duration: 1500, name: 'islogin' })
							router.go({ path: '/' })
						}

					});
					// setTimeout(function() {
					// 	this.removeLoading('init')
					// }.bind(this), 100)
				}.bind(this))
				// if(localStorage['aus_user_info']) {
				// 	var obj = JSON.parse(localStorage['aus_user_info'])
				// 	if( obj.last_login_time && obj.last_login_time < new Date().getTime() ) {
				// 		localStorage.removeItem('aus_user_info')
				// 	}
				// 	else {
				// 		this.isLogin = true;
				// 		return;
				// 	}
				// }

			},
			addLoading(obj) {
				var addLoading = true;

				for(var i = 0; i < this.loadings.length; i++) {
					if(this.loadings[i].name = obj.name) {
						addLoading = false;
					}
				};
				if(addLoading) {
					// setTimeout(function() {
						this.loadings.push(obj)
					// }.bind(this), 50)

					document.querySelector('.app-wrap').classList.add('open');
				}
			},
			removeLoading(name) {
				for(var i = 0; i < this.loadings.length; i++) {
					if(this.loadings[i].name == name) {
						this.loadings.$remove(this.loadings[i])
						document.querySelector('.app-wrap').classList.remove('open');
					}
				};
			}
		},
		components: {
			'loading': require('../../components/loading/loading'),
			'banner-page': require('../../components/banner-page/banner-page.config.vue'),
		},
		events: {
			loading(obj) {
				if(obj) {
					this.addLoading(obj)

				}
			},
			cancelloading(name) {
				if(name) {
					this.removeLoading(name)
				}

			}
		}
	}
</script>

<style lang="scss" src="../../_base.scss"></style>
<style lang="scss" src="./css/style.scss"></style>
<style>
	body {
		background: #fff;
	}
</style>