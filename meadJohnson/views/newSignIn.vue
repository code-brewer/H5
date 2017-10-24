<template>
	<div class="new-sign-in">
		<router-view></router-view>
		<!-- <div class="btnGroup">
			<div v-for="item in 3" :class="[{active: active[$index]}, 'button'+($index+1)]" @click="click($index)"></div>
		</div> -->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				active: [!1, !1, !1]
			}
		},
		route: {
			data(transition) {
				this.active = [!1, !1, !1];
				this.active.$set(({'plan':'0', 'template': '1', 'rankingList': '2'})[transition.to.path.split('/')[2]], !0);
			}
		},
		created() {
			let path = location.href.split('/');
			let index = ['/plan', '/template', '/rankingList'].indexOf('/'+path[path.length-1]);
			this.active = [!1, !1, !1];
			this.active.$set(index, !0);
		},
		methods: {
			click(index) {
				if (!this.active[index]) {
					this.active = [!1, !1, !1];
					this.active.$set(index, !0);
					this.$router.go({path: ['/newSignIn/plan/'+openId, '/newSignIn/template', '/newSignIn/rankingList'][index]});
				}
			}
		}
	}
</script>
<style lang="sass" scoped>
	.new-sign-in {
		padding-bottom: 111px;
	}
	.btnGroup {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 5px 0;
		text-align: center;
		border-top: 1px solid #e1e1e1;
		background: white;
		z-index: 10;
		// background-image: linear-gradient(top, #a7f8ff, transparent 15%);
		div {
			position: relative;
			display: inline-block;
			width: 98px;
			height: 98px;
			background: url(../images/signIn/icon1.png) 0 -98px no-repeat;
			&:after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: url(../images/signIn/icon1.png) no-repeat;
			}
			&.button2 {
				margin: 0 60px;
			}
			&.button1:after {
				background-position: 0 0;
			}
			&.button2:after {
				background-position: -98px 0;
			}
			&.button3:after {
				background-position: -196px 0;
			}
			&.active {
				background-position: -196px -98px;
			}
			&.active:active {
				background-position: -98px -98px;
			}
		}
	}
</style>
<style lang="scss">
	.plan-sum {
		color: #686868;
		line-height: 2;
		font-size: 24px;
		span {
			color: #ff9945;
		}
	}
	.new-sign-in {
		.load2 {
			padding: 10px 0;
			text-align: center;
		}
		.modal {
			.btnGroups {
				padding-top: 30px;
				> div {
					display: inline-block;
					width: 40%;
					height: 60px;
					margin: 0 4%;
					line-height: 60px;
					text-align: center;
					border-radius: 8px;
					font-size: 26px;
					color: white;
					&.yes {
						box-shadow: 0 5px 0 rgba(255, 136, 0, .5);
						&:active {
							transform: translate(0, 10px);
							box-shadow: none;
						}
					}
					&.no {
						box-shadow: 0 5px 0 rgba(153, 153, 153, .5);
						&:active {
							transform: translate(0, 10px);
							box-shadow: none;
						}
					}
				}
			}
			.close {
				background: url(../images/member-rule-close.png) no-repeat;
			}
		}
	}
</style>