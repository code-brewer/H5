<template>
	<modal :show.sync="orderfailShow"
	       :bg="false">
		<div class="components-orderfail">
			<div class="box"
			     style="background:#2b2a2a; border: 10px solid #ccaa4a;">
				<img class="music-icon"
				     src="../../images/music.png">
				<p class="title">提示</p>
				<div class="con">
					<p class="success-panel">{{failMessage}}</p>
				</div>
	
				<a style="background-repeat: no-repeat; background-size: 100% 100%;"
				   class="confirm-btn"
				   @click="orderFailSure">确定</a>
				<img class="close-img"
				     src="../../images/x.png"
				     @click="orderFailClose">
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
		}
	},
	watch: {
	},
	props: {
		orderfailShow: {
			type: Boolean,
			default: false
		},
		tipdef: {
			type: Boolean,
			default: true
		},
		failMessage: {
			type: String,
			default: ''
		}
	},
	ready() {

	},
	methods: {
		orderFailSure() {
			this.orderfailShow = false
			// 订购失败提示
			sapi.pvLog(this, {
				gateModel: 'part' + (this.$root.activeMusicid + 1) + 'sure1',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => { })
			Statistics.orderfailSure(this.$root.activeMusicid)
		},

		orderFailClose() {
			this.orderfailShow = false
			// 订购失败提示
			sapi.pvLog(this, {
				gateModel: 'part' + (this.$root.activeMusicid + 1) + '_close5',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => { })
			Statistics.orderfailClose(this.$root.activeMusicid)
		}
	}
}
</script>
