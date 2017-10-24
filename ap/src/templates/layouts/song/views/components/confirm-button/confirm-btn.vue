<template>
	<div class="confirm-btn__container">
		<button class="confirm-btn"
		        type="button"
		        @click="submit"
		        :style="{'background-image': (activityConfig.game.confirmUrl!='' ? 'url('+activityConfig.game.confirmUrl+')' : 1)}">
			确定
		</button>
	</div>
</template>
<script>
import Statistics from '../../../statistics.js'
import utils from './../../../../../../utils'
import sapi from './../../../../../service'
export default {
	data() {
		var activityConfig = window.store.activityConfig
		return {
			activityConfig
		}
	},
	ready() {
		this.activityConfig.game.selected = '2' // 未选
	},
	methods: {
		submit() {
			this.$dispatch('stopMusic')
			switch (this.activityConfig.game.selected) {
				case 0:
					// 错误
					this.$root.$router.go({
						name: 'fail'
					})
					Statistics.failPage()
					sapi.pvLog(this, {
						gateModel: 'sure_fail',
						channelld: utils.getQueryStringByName('channle'),
						browserClient: window.navigator.userAgent
					}, (back) => {

					})
					break
				case 1:
					//　正确
					this.saveClearanceRecord();
					this.$root.$router.go({
						name: 'success'
					})
					Statistics.successPage()
					sapi.pvLog(this, {
						gateModel: 'sure_success',
						channelld: utils.getQueryStringByName('channle'),
						browserClient: window.navigator.userAgent
					}, (back) => {

					})
					break
				default:
					this.$dispatch('loading', { name: 'guess_save', icon: false, text: '请选择一个选项', show: true, duration: 2 * 1000 });
			}
			Statistics.musicSubmit()
			sapi.pvLog(this, {
				gateModel: 'sure',
				channelld: utils.getQueryStringByName('channle'),
				browserClient: window.navigator.userAgent
			}, (back) => {

			})
		},
		saveClearanceRecord() {
			var that = this;
			sapi.saveClearanceRecord(this, {}, (back) => {
				if (back.resCode == "0") {

				} else {
					that.$dispatch('handle_server_error', back);
				}
			})
		}
	}
}
</script>
<style lang="scss">
$ratio: 750/320;
@import './common.scss';
</style>