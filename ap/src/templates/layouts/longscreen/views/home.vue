<template>
	<div class="app-view view-home"
	     v-el:appview
	     :style="{'background-color': activityConfig.common.bg}">
		<img :src="activityConfig.common.bgUrl"
		     alt=""
		     class="longscreen-bg">
		<history-activity></history-activity>
		<music v-for="music in activityConfig.musics"
		       :pos-y="music.posY"
		       :music-title="music.musicTitle"
		       :music-id="music.musicId"
		       :music-member-songid.sync="music.musicMemberSongid"
		       :music-songid.sync="music.musicSongid"
		       :music-index="music.musicIndex"
		       :music-url="music.musicUrl"></music>
		<login :login-show.sync="showLogin"></login>
		<open-bell :openbell-show.sync="showOpenbell"></open-bell>
		<order-bell :orderbell-show.sync="showOrderbell"></order-bell>
		<order-fail :orderfail-show.sync="showOrderfail" :fail-message='failMessage'></order-fail>
		<order-success :ordersuccess-show.sync="showOrdersuccess"></order-success>
	</div>
</template>
<script>
import Statistics from '../statistics.js'
import sapi from '../../../service'
import utils from '../../../../utils'
import HistoryActivity from './components/HistoryActivity/HistoryActivity'
import Music from './components/Music/Music'
import Login from './components/login'
import OpenBell from './components/openBell'
import OrderBell from './components/orderBell'
import OrderFail from './components/orderFail'
import OrderSuccess from './components/orderSuccess'
export default {
	components: {
		HistoryActivity,
		Music,
		Login,
		OrderBell,
		OpenBell,
		OrderFail,
		OrderSuccess
	},
	data() {
		var activityConfig = window.store.activityConfig;
		return {
			activityConfig,
			usid: '',
			activity_usid: '',
			currentComponent: '',
			showLogin: false,
			showOpenbell: false,
			showOrderbell: false,
			showOrderfail: false,
			showOrdersuccess: false,
			failMessage: ''
		}
	},
	created() {
		// this.getUserInfo();
	},
	ready() {
		// 统计首页pv/uv
		sapi.pvLog(this, {
			gateModel: 'home',
			channelld: utils.getQueryStringByName('channle'),
			browserClient: window.navigator.userAgent
		}, (back) => { })
		Statistics.homePage()
	},
	methods: {
		getUserInfo() {
			sapi.getUserInfo(this, {}, (back) => {
				console.log(back)
				if (back.resCode == "0") {
					this.usid = back.repBody[0].usid;
					window.openid = back.repBody[0].wx;
					// 获取路由里面的usid
					var router_usid = utils.getQueryStringByName("usid");

					if (router_usid && router_usid != this.usid) {
						this.visiteMode = 'share';
						this.activity_usid = router_usid;
					} else {
						this.activity_usid = this.usid;
					}
				} else {
					this.$dispatch('handle_server_error', back);
				}
			})
		}
	},
	events: {
		showLogin() {
			this.showLogin = true
		},
		showOpenbell() { // 提示开通炫铃功能
			this.showOpenbell = true
		},
		showOrderbell() { // 提示订购炫铃
			this.showOrderbell = true
		},
		showOrderfail(message) { // 订购失败
			this.failMessage = message
			this.showOrderfail = true
		},
		showOrdersuccess() { // 订购成功
			this.showOrdersuccess = true
		}
	}
}
</script>
<style lang="scss">
@import '../../../../css/px2rem.scss';
.pull-right {
	float: right;
}

.app-view.view-home {
	overflow: auto;

	.longscreen-bg {
		width: 100%;
	}
}
</style>
