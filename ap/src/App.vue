<template>
	<!-- <router-view></router-view> -->
	<header-bar></header-bar>
	<router-view></router-view>
	<!-- <footer-bar></footer-bar> -->
</template>
<script>
	export default {
		components: {
			headerBar: require('./components/web/header-bar.vue'),
			footerBar: require('./components/web/footer-bar.vue'),
		},

		data() {
			return {
				// 是否登录
				isLogin: false,
				// 用户信息
				userinfo: {},
				fun: []
			}
		},

		created() {
			this.getUserinfo();
			this.$on('refresh', (fun) => {
				this.fun.push(fun);
			})
		},

		methods: {
			getUserinfo() {
				// 格式化localStorage的用户信息
				if(sessionStorage.getItem('ams_v2_userinfo')) {
					var obj = JSON.parse(sessionStorage.getItem('ams_v2_userinfo'));

					if(typeof obj == "object") {
						if(obj.authorization) {
							// 判断是否登录过
							this.isLogin = true;
							this.fun.forEach((fun) => {
								/*fixed 判断fun是否为function, 在统计页面重新登录弹出网络错误信息，登录页面不关闭*/
								if(typeof fun === 'function') {
									fun();
								}
							})
							this.userinfo = obj;
							return obj;
						}
					}
				}

				return false;
			}
		}
	}
</script>

<style src="./css/bootstrap.css"></style>

<style>
	html {
		width: 100%;
		height: 100%;
		-ms-touch-action: manipulation;
		touch-action: manipulation;
	}
	
	body {
		width: 100%;
		min-height: 100%;
	}
</style>