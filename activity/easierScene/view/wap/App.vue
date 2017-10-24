<template>
	<div style="height: 100%;">
		<router-view></router-view>
		<snackbar :show.sync="show" :text="text"></snackbar>
	</div>
</template>
<script>
	import snackbar from '../../component/wap/snackbar.vue'
	import wxUtil from '../../utils/wx.js'
	import api from '../../api/wapIndex.js'
	export default {
		components: {
			snackbar
		},
		data() {
			return {
				show: false,
				text: '',
				isClosed: true,
				socket: null
			}
		},
		ready() {
			this.$on('showTip', (text, code) => {
				this.show = true;
				if ( code === '100100' ) {
					window.location.href = "wap-login.jsp?moid=" + moid;
				 	// text = '请重新扫码登录';
				}
				this.text = text;
			})
			this.obtainJssdk();
		},
		methods: {
			/**
             * 微信签名
             */
            obtainJssdk() {
                api.obtainJssdk(this, {jsurl: basePath + 'wap.jsp'}, back => {
                    if (back.resCode === '000000') {
                        wxUtil.config(back.repBody, () => {
                            wxUtil.share('微现场', '微现场', basePath + 'wap-login.jsp?moid=' + moid, basePath + 'image/wap/login-img1.png');
                        });
                    }
                })
            }
		}
	}
</script>
<style lang="scss">
	html,body {
		height: 100%;
	}
	a,button,div {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	.back-chat {
		position: absolute;
		top: 20px;
		left: 20px;
		padding: 10px;
		color: white;
		font-size: 28px;
		border: 2px solid white;
		border-radius: 8px;
		z-index: 102;
	}
	.vue-iscroll-pullup-container {
		font-size: 28px;
		color: white;
		background: none !important;
	}
</style>