<template>
	<modal :show.sync="ordersuccessShow"
	       :bg="false">
		<div class="components-ordersuccess">
			<div class="box"
			     style="background:#2b2a2a; border: 10px solid #ccaa4a;">
				<img class="music-icon"
				     src="../../images/music.png">
				<p class="title">提示</p>
				<div class="con">
					<p style="font-size: 28px;">订购成功</p>
					<p style="color:#ccaa4a;">（登陆沃音乐官网“个人中心”可设置炫铃哦） </p>
				</div>
				<a style="background-repeat: no-repeat; background-size: 100% 100%;"
				   class="confirm-btn"
				   @click="orderSuccessSure">确定</a>
				<a style="background-repeat: no-repeat; background-size: 100% 100%;"
				   class="confirm-btn"
				   @click="personCenter">个人中心</a>
				<img class="close-img"
				     src="../../images/x.png"
				     @click="orderSuccessClose">
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
			tip: ""
		}
	},
	props: {
		ordersuccessShow: {
			type: Boolean,
			default: false
		},
		tipdef: {
			type: Boolean,
			default: true
		}
	},
	ready() {
	},
	methods: {
		personCenter() {
			let url = 'http://box.10155.com/Club/portal/hindex.do?act=idx&unikey=01000d81593d2bf801593f1bfdf60691&from=singlemessage&isappinstalled=1'
			location.href = url;

			// 统计跳转个人中心
			sapi.pvLog(this, {
				gateModel: 'part' + (this.$root.activeMusicid + 1) + '_personal',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => { })
			Statistics.ordersuccessPersonal(this.$root.activeMusicid, url)
		},

		orderSuccessSure() {
			this.ordersuccessShow = false
			// 订购成功提示
			sapi.pvLog(this, {
				gateModel: 'part' + (this.$root.activeMusicid + 1) + '_sure',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => { })
			Statistics.ordersuccessSure(this.$root.activeMusicid)
		},

		orderSuccessClose() {
			this.ordersuccessShow = false
			// 订购成功关闭
			sapi.pvLog(this, {
				gateModel: 'part' + (this.$root.activeMusicid + 1) + '_close4',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => { })
			Statistics.ordersuccessClose(this.$root.activeMusicid)
		}


	}
}
</script>

