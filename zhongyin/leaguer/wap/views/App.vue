<template>
	<div class="app-container">
		<router-view></router-view>
		<footbar></footbar>
	</div>
</template>
<style src="../css/reset.css"></style>
<script>
	import api from '../api/index.js'
	import weixin from '../utils/wx.js'
	import utils from '../utils/index.js'

    export default {
		components: {
			footbar: require('./footbar.vue')
		},
		ready() {
			console.log(utils.getcookie('memberinfo'))
			if(utils.getcookie('memberinfo')) {
				let cookie_memberinfo = window.JSON.parse(utils.getcookie('memberinfo'))
				window.memberinfo = Object.assign({}, window.memberinfo, cookie_memberinfo)
			}
		},
		created() {
			// 获取活动信息
			api.selectActivityById(this, {}, (back)=>{
				if(back.resCode == "0") {
					let data = back.repBody[0]
					let title = data.sharetitle
					let desc = data.sharedes
					let thumb = data.shareimgurl
					window.memberinfo.aid = data.aid
					
					// 获取微信接口信息
					api.obtainJssdk(this, { jsurl: location.href.replace(location.hash, ''), channle: window.channle }, (msg) => {
						if(msg.resCode == '0') {
							var that = this
							let appmsg = window.JSON.parse(msg.repBody).result
							weixin.config(appmsg)
							weixin.share(title, desc, window.location.href, thumb, (name, type) => {
								if(type == "success") {
									// alert('success')
								}
							})
						}
					})

					// 添加访问日志
					api.addAcceptLog(this, {type: 'signin', source: 'home'}, (back)=>{})
					submitStatInfo(base_url, base_url, base_url, 'load', '', '', 'wap', window.channle, 'Phone', base_url, '', 'aid=1')
				}
			})
		}
	}
</script>
<style lang="scss">
	
</style>