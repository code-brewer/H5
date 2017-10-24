<template>
	<modal :show.sync="openbellShow"
	       :bg="false">
		<div class="components-openbell">
			<div class="box"
			     style="background:#2b2a2a; border: 10px solid #ccaa4a;">
				<img class="music-icon"
				     src="../../images/music.png">
				<p class="title">提示</p>
				<div class="login-panel">
					<p>您还没开通炫铃功能，</p>
					<p> 是否开通？</p>
				</div>
				<a class="confirm-btn"
				   style="background-repeat: no-repeat; background-size: 100% 100%;"
				   @click="close">取消</a>
				<a class="confirm-btn"
				   style="background-repeat: no-repeat; background-size: 100% 100%;"
				   @click="openVip()">开通功能</a>
	
				<img class="close-img"
				     src="../../images/x.png"
				     @click="close">
			</div>
		</div>
	</modal>
</template>

<script>
import utils from '../../../../../utils'
import sapi from '../../../../service'
import modal from './modal/Modal.vue'
import Statistics from '../../statistics.js'
export default {
	components: {
		modal
	},
	data() {
		return {
			tip: "",
			timeflag: '获取验证码',
			codeing: false,

		}
	},
	props: {
		openbellShow: {
			type: Boolean,
			default: false
		},
		tipdef: {
			type: Boolean,
			default: true
		}
	},
	watch: {

	},
	ready() {

	},
	methods: {
		openVip() {
			var that = this;

			// 开通炫铃功能
			sapi.openRingAccount(this, {
				pe_appid: window.pe_appid,
				pe_appkey: window.pe_appkey
			}, (back) => {
				// 统计开通炫铃
				sapi.pvLog(this, {
					gateModel: 'part' + (this.$root.activeMusicid + 1) + '_open',
					channelld: utils.getQueryStringByName('channle'),
					browserClient: window.navigator.userAgent
				}, (back) => { })
				Statistics.openbellOpen(this.$root.activeMusicid)

				if (back.rescode == '0') {
					this.openbellShow = false

					// 修改本地cookie
					utils.addcookie('cn.easier.gsu.ring.member', 'true')

					// 显示订购炫铃
					this.$dispatch('showOrderbell')

				} else {
					this.$dispatch('handle_server_error', back);
				}
			})

		},
		close() {
			this.openbellShow = false
			// 关闭开通炫铃
			sapi.pvLog(this, {
				gateModel: 'part' + (this.$root.activeMusicid + 1) + '_close2',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => { })
			Statistics.openbellClose(this.$root.activeMusicid)
		},
		cancel() {
			this.openbellShow = false
			// 取消开通炫铃功能
			sapi.pvLog(this, {
				gateModel: 'part' + (this.$root.activeMusicid + 1) + '_cancel1',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => { })
			Statistics.openbellCancel(this.$root.activeMusicid)
		}
	}
}
</script>
