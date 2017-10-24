<template>
	<router-view></router-view>
	<loading :show-msg.sync="loadConfig.show" :msg="loadConfig.msg">
	</loading>
</template>
<style src="../../src/css/bootstrap.css"></style>
<script>
	import {
		router
	} from '../build/login.js'
	import loading from '../../src/components/web-base/loading.vue'
	export default {
		components: {
			loading
		},
		data() {
			return {
				// 是否登录
				isLogin: true,
				// 用户信息
				userinfo: {},
				router: {},
				loadConfig: {
					show: false,
					msg: ''
				},
				refreshActivity: false
			}
		},
		watch: {
			refreshActivity() {
				this.$broadcast("refreshActivity");
			}
		},
		ready() {
			this.router = router;
		},
		created() {
			if(localStorage.getItem("userinfo")) {
				this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
			}
		}
	}
</script>