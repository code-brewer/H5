<template>
	<div class="ams-header-bar" :class="{fixed: isFixed}">
		<div class="inner">
			<div class="container">
				<img src="../../assets/logo.png" alt="logo" class="logo" @click="goHome">
				<nav>
					<ul class="menu">
						<li :class="{active: item.name==currItem.name}" @click="setCurr(item)" v-for="item in navItems">
							<a href="{{item.url}}">{{item.name}}</a>
						</li>
					</ul>
				</nav>
				<div class="right-buttons" v-if="$root.isLogin">
					<a href="#">欢迎您，{{$root.userinfo.nick}}</a>

					<button-ripple id="ams-menu-button">
						<i class="glyphicon glyphicon-menu-down"></i>
					</button-ripple>

					<menu-clip for="ams-menu-button">
						<ul>
							<!--
                            	作者：909559682@qq.com
                            	时间：2017-02-17
                            	描述：是否home登录页
                            -->
							<li class="menu-item" v-if="!isHome">
								<a v-link="{path: '/activity' }">
									<button-ripple>我的活动</button-ripple>
								</a>
							</li>
							<li class="menu-item" v-if="!isHome">
								<a v-link="{name: 'prizeList' }">
									<button-ripple>我的奖品</button-ripple>
								</a>
							</li>
							<li class="menu-item" v-if="!isHome">
								<a v-link="{path: '/user' }">
									<button-ripple>账户信息</button-ripple>
								</a>
							</li>
							<li class="menu-item" v-if="!isHome">
								<a v-link="{path: '/userList' }">
									<button-ripple>用户管理</button-ripple>
								</a>
							</li>
							<!--
                            	作者：909559682@qq.com
                            	时间：2017-02-17
                            	描述：结束
                            -->
							<li class="menu-item" v-if="isHome">
								<a href="#" @click="goTemplate('activity')">
									<button-ripple>我的活动</button-ripple>
								</a>
							</li>
							<li class="menu-item" v-if="isHome">
								<a href="#" @click="goTemplate('prizeList')">
									<button-ripple>我的奖品</button-ripple>
								</a>
							</li>
							<li class="menu-item" v-if="isHome">
								<a href="#" @click="goTemplate('user')">
									<button-ripple>账户信息</button-ripple>
								</a>
							</li>
							<li class="menu-item" v-if="isHome">
								<a href="#" @click="goTemplate('userList')">
									<button-ripple>用户管理</button-ripple>
								</a>
							</li>
							<li class="menu-item" @click="logout">
								<button-ripple>退出</button-ripple>
							</li>
						</ul>
					</menu-clip>
				</div>

				<div class="right-buttons no-auth" v-if="!$root.isLogin">
					<button-ripple color="button-danger" @click="loginModalShow=true">登录</button-ripple>
				</div>
			</div>
		</div>
	</div>
	<login-modal :show.sync="loginModalShow"></login-modal>
</template>

<script>
	import buttonRipple from '../web-base/button-ripple'
	import menuClip from '../web-base/menu-clip'
	import LoginModal from './login-modal'

	import api from '../../api'

	export default {
		props: {
			isHome: {
				Boolean,
				default: false
			}
		},
		components: {
			buttonRipple,
			menuClip,
			LoginModal
		},
		data() {
			return {
				isFixed: false,

				navItems: [{
					name: '模板商城',
					url: 'template.jsp'
				}, {
					name: '品牌案例',
					url: '#'
				}, {
					name: '活动排行',
					url: '#'
				}, {
					name: '活动专题',
					url: '#'
				}, ],
				currItem: {},

				loginModalShow: false
			}
		},
		ready() {
			var self = this;

			document.addEventListener('scroll', () => {
				if(document.querySelector('.ams-header-bar').getBoundingClientRect().top < 0) {
					self.isFixed = true;
				} else {
					self.isFixed = false;
				}
			})
		},
		methods: {
			setCurr(item) {
				this.currItem = item;
			},
			goTemplate(url) {
				var uri = (location.origin + location.pathname).split("index")[0];
				uri += "/template.jsp#!/" + url;
				window.location.href = uri;
			},
			logout() {
				api.logout(this, {});

				localStorage.removeItem('ams_v2_userinfo');

				this.$root.isLogin = false;
			},
			goHome(){
				var uri = (location.origin + location.pathname).split("template")[0];
				window.location.href = uri;
			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	.ams-header-bar {
		height: $header-bar-height;
		position: relative;
		z-index: 999;
		>.inner {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: $header-bar-height;
			background: #fff;
			width: 100%;
			transition-duration: .2s;
			transition-timing-function: cubic-bezier(.4, 0, .2, 1);
			transition-property: box-shadow;
		}
		&.fixed>.inner {
			// position: fixed;
			// border-bottom: 1px solid #ccc;
			box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
		}
		.container {
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			z-index: 3;
			height: 100%;
			align-items: center;
			justify-content: space-between;
		}
		img.logo {
			order: -1;
		}
		nav {
			order: -1;
			>ul {
				padding: 0;
				li {
					float: left;
					padding: 10px 20px;
					list-style-type: none;
					a {
						padding-bottom: 10px;
						text-decoration: none;
						color: #414A52;
						position: relative;
						&::before {
							position: absolute;
							bottom: 0;
							left: 0;
							visibility: hidden;
							width: 100%;
							height: 2px;
							content: '';
							-webkit-transition: all .3s ease-in-out 0s;
							transition: all .3s ease-in-out 0s;
							-webkit-transform: scaleX(0);
							transform: scaleX(0);
							background-color: $brand-primary;
						}
					}
					&:hover a,
					&.active a {
						-webkit-transition-timing-function: ease;
						transition-timing-function: ease;
						-webkit-transition-duration: 200ms;
						transition-duration: 200ms;
						color: $brand-primary;
						&::before {
							-webkit-transform: scaleX(1);
							transform: scaleX(1);
							visibility: visible;
						}
					}
				}
			}
		}
		.right-buttons {
			order: 1;
			width: 200px;
			text-align: right;
			a {
				color: #000;
			}
			>a {
				white-space: nowrap;
				max-width: 150px;
				text-overflow: ellipsis;
				display: inline-block;
				overflow: hidden;
				margin-right: 5px;
				vertical-align: middle;
			}
			>#ams-menu-button.button-ripple {
				color: $brand-primary;
				width: 36px;
				border-radius: 50%;
				.button-ripple-container {
					border-radius: 50%;
				}
			}
			&.no-auth {
				.button-ripple {
					font-size: 12px;
					padding: 0 15px;
					width: auto;
				}
			}
		}
	}
</style>