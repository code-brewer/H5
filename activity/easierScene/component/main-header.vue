<template>
	<div class="main-header">
		<div class="container">
			<div class="left">
				<img src="../image/title.jpg" />
			</div>
			<div class="right">
				<div class="right-buttons">
					<a class="nickName">你好，{{$root.userinfo.nick}} </a>
					<button-ripple id="ams-menu-button">
						<i class="glyphicon glyphicon-menu-down"></i>
					</button-ripple>
					<menu-clip for="ams-menu-button">
						<ul>
							<li class="menu-item">
								<a href="javascript:;">
									<button-ripple>项目1</button-ripple>
								</a>
							</li>
							<li class="menu-item">
								<a href="javascript:;">
									<button-ripple>项目2</button-ripple>
								</a>
							</li>
							<li class="menu-item">
								<a @click="logout">
									<button-ripple>注销</button-ripple>
								</a>
							</li>
						</ul>
					</menu-clip>
				</div>
				<div class="right-buttons no-auth">
					<button-ripple color="button-primary" @click="addOrEdit">创建新活动</button-ripple>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import buttonRipple from '../../src/components/web-base/button-ripple.vue'
	import menuClip from '../../src/components/web-base/menu-clip.vue'
	import api from '../api/index.js'
	export default {
		components: {
			buttonRipple,
			menuClip
		},
		methods: {
			logout() {
				api.logout(this, {}, (back) => {
					this.$root.router.go({
						'path': '/login'
					});
				})
			},
			addOrEdit() {
				api.addOrEdit(this, {
					'tiltle': '会议'
				}, (back) => {
					if(back.resCode == "000000") {
						this.$root.loadConfig.show = true;
						this.$root.loadConfig.msg = "创建成功";
						this.$root.refreshActivity = !this.$root.refreshActivity;
					}
				})
			}
		},
	}
</script>
<style lang="scss">
	.main-header {
		height: 64px;
		width: 100%;
		text-align: center;
		background-color: #fff;
		border-bottom: 1px solid #bfbfbf;
		position: absolute;
		z-index: 99;
		.container {
			height: 100%;
			width: 1230px;
			margin: 0 auto;
			.left {
				float: left;
				height: 100%;
				padding-top: 20px;
				box-sizing: border-box;
				img {
					width: 130px;
				}
			}
			.right {
				height: 100%;
				.right-buttons {
					width: 150px;
					float: right;
					height: 100%;
					padding-top: 18px;
					text-align: right;
					.nickName {
						height: 100%;
						text-decoration: none;
						cursor: pointer;
						position: relative;
						&:after {
							display: block;
							left: -25px;
							top: 0px;
							content: ' ';
							width: 20px;
							height: 20px;
							background: url(../image/user.png);
							position: absolute;
							background-repeat: no-repeat;
						}
						&:hover {
							color: #419ce9;
							;
						}
					}
					i {
						color: #419ce9;
					}
					.button-ripple {
						margin-top: -5px!important;
					}
				}
			}
		}
	}
</style>