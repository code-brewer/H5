<template>
	<modal :show.sync="orderbellShow"
	       :bg="false">
		<div class="components-orderbell">
			<div class="box"
			     style="background:#2b2a2a; border: 10px solid #ccaa4a;">
				<img class="music-icon"
				     src="../../images/music.png">
				<p class="title">提示</p>
				<div class="con">
					<p>是否确认订购此炫铃？</p>
					<p style="color:#ccaa4a;">{{$root.buySong}}</p>
					<p>资费：2元/首（会员免费）</p>
				</div>
				<a class="confirm-btn"
				   style="background-repeat: no-repeat; background-size: 100% 100%;"
				   @click="cancel">取消</a>
				<a class="confirm-btn"
				   style="background-repeat: no-repeat; background-size: 100% 100%;"
				   @click="sureBuyLing">订购</a>
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

		}
	},
	props: {
		orderbellShow: {
			type: Boolean,
			default: false
		}
	},
	watch: {

	},
	ready() {
	},
	methods: {
		sureBuyLing() {
			this.$dispatch('loading', {
				name: 'buyTone',
				icon: true,
				text: '请稍候...',
				show: true,
				duration: 30 * 1000
			});

			let songid = ''
			if (utils.getcookie('cn.easier.gsu.tone.user') == 'false') {
				songid = this.$root.buySongId
			} else {
				songid = this.$root.buyMemberSongId
			}

			var body = {
				toneId: songid,
				toneType: 1,
				pe_appid: window.pe_appid,
				pe_appkey: window.pe_appkey
			};

			sapi.buyTone(this, body, (back) => {
				this.$dispatch('cancelloading', 'buyTone');
				this.orderbellShow = false
				// 统计订购炫铃
				sapi.pvLog(this, {
					gateModel: 'part' + (this.$root.activeMusicid + 1) + '_order2',
					channelld: utils.getQueryStringByName('channle'),
					browserClient: window.navigator.userAgent
				}, (back) => { })
				Statistics.orderbellOrder(this.$root.activeMusicid, songid)

				if (back.resCode == '0') {
					this.$dispatch('showOrdersuccess') // 订购成功
				} else {
					this.$dispatch('showOrderfail', back.resMsg) // 订购失败
				}
			})
		},
		cancel() {
			this.orderbellShow = false
			// 取消订购炫铃
			sapi.pvLog(this, {
				gateModel: 'part' + (this.$root.activeMusicid + 1) + '_cancel2',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => { })
			Statistics.orderbellCancel(this.$root.activeMusicid)
		},
		close() {
			this.orderbellShow = false
			// 关闭订购炫铃
			sapi.pvLog(this, {
				gateModel: 'part' + (this.$root.activeMusicid + 1) + '_close3',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => { })
			Statistics.orderbellClose(this.$root.activeMusicid)
		}
	}
}
</script>
