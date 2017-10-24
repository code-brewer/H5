<template>
	<div class="app-wrap"
	     :class="direct">
		<router-view transition="slide"></router-view>
		<loading :duration="loading.duration"
		         :icon="loading.icon"
		         :text="loading.text"
		         :name="loading.name"
		         v-for="loading in loadings"></loading>
	</div>
</template>

<script>
import api from '../../service'
import wx from '../../utils/wx.js'
import { router } from './app.js'
import routeList from './route'
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
			buySongId: '',
			buyMemberSongId: '',
			buySong: '',
			activeMusicid: '',
			isLogin: false,
			common
		}
	},
	computed: {

	},
	created() {
		// if (this.checkLogin()) {
		// 	this.setrouter()
		// }
		// else {
		// 	this.relogin(window.location.search);
		// }
		Date.prototype.Format = function (fmt) {
			var o = {
				"M+": this.getMonth() + 1,
				"d+": this.getDate(),
				"h+": this.getHours(),
				"m+": this.getMinutes(),
				"s+": this.getSeconds(),
				"q+": Math.floor((this.getMonth() + 3) / 3),
				"S": this.getMilliseconds()
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		}


		api.wmObtainJssdk(this, { jsurl: location.href.replace(location.hash, '') }, (back) => {
			console.log(back)
			if (back.resCode == '0') {
				var that = this,
					weixinShare = window.store.activityConfig.weixinShare;
				wx.config(back.repBody, '', () => {
					wx.share(weixinShare.title, weixinShare.description, "http://weixin.10155.com/wostar2/redirect/toIndex.do?appid=4730005&aid=" + aid + "&channle=" + channel, weixinShare.imgUrl, (name, type) => {
						if (type == "success") {
							api.sharePlusTime(that, {}, (back) => {
								console.log(back);
							})
						}
					})
				});

			}
		})
	},
	ready() {
		localStorage['aus_game_pass'] = "";
		localStorage['aus_game_pass'] = "";
	},
	methods: {
		setrouter() {
			var that = this;
			router.afterEach(function (transition) {
				var to = transition.to.path;
				// for (var i = 0; i < routeList.length; i++) {
				// 	if(transition.to.matched[0].handler.path == routeList[i].path) {
				// 		document.title = (routeList[i].title || routeList[i].name)
				// 	}
				// };

				var index = that.routeHistory.indexOf(to);

				if (index > -1) {
					that.routeHistory = that.routeHistory.slice(0, index + 1);
					that.direct = 'left-right';
				}
				else {
					that.routeHistory.push(to);
					that.direct = 'right-left';
				}
			});
		},
		// 检查是否登录
		checkLogin() {
			if (isW == "true") {
				return document.cookie.indexOf('easier_gsu_wx_user_token') >= 0;
			} else {
				return document.cookie.indexOf('easier_aus_user_token') >= 0;
			}
		},
		addLoading(loading) {
			if (!loading.name) {
				loading.name = (new Date()).valueOf() + '';
			}
			if (!loading.icon) {
				loading.icon = false;
			}
			var addLoading = true;
			for (var i = 0; i < this.loadings.length; i++) {
				var item = this.loadings[i];
				if (!item || !item.show) {
					this.loadings.$remove(item);
					i--;
				} else if (this.loadings[i].name = loading.name) {
					addLoading = false;
				}
			};
			if (addLoading) {
				this.loadings.push(loading);
				document.querySelector('.app-wrap').classList.add('open');
			}
		},
		removeLoading(name) {
			for (var i = 0; i < this.loadings.length; i++) {
				if (this.loadings[i].name == name) {
					this.loadings.$remove(this.loadings[i]);
				}
			};
			if (this.loadings.length == 0) {
				document.querySelector('.app-wrap').classList.remove('open');
			}
		},
		relogin(parameter) {
			location.href = basePath + 'login.jsp' + parameter;
		},
		handleServerError(parameter) {
			if (parameter.resCode == "10003") {
				this.relogin(window.location.search);
			} else {
				if (SSD_DEBUG) {
					this.addLoading({ text: parameter.resMsg, icon: false, show: true, duration: 2000 });
				}
			}
		}
	},
	components: {
		'loading': require('../../components/loading/loading')
	},
	events: {
		handle_server_error(parameter) {

			this.addLoading({ text: parameter.resMsg ? parameter.resMsg : parameter, icon: false, show: true, duration: 1000 });
		},
		loading(obj) {
			if (obj) {
				this.addLoading(obj);
			}
		},
		cancelloading(name) {
			if (name) {
				this.removeLoading(name);
			}
		},
		login(parameter) {
			this.relogin(parameter);
		},
		handleServerBack(parameter) {
			this.handleServerError(parameter);
		}
	}
}
</script>

<style lang="scss" src="../../_base.scss"></style>
<style lang="scss" src="./css/style.scss"></style>