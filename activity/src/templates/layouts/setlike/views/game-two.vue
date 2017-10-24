<template>
	<div class="game-view-two setlike-bg">
		<div class="collection-pic-list">
			<div class="title">
				目前已有<span>{{cumNum}}</span>位好友祝福，加油！
			</div>
			<ul>
				<li v-for="item in list"><span>{{item.usernick}}</span>于{{item.ctime}}为<span>TA</span>祝福</li>
			</ul>
		</div>
		<div class="btn-panel">
			<div class="wap-button" @click="acAddHelp" :class="{'disabled':!hasLiked}">
				<a>给TA祝福</a>
			</div>
			<div class="wap-button" @click="goHome">
				<a>我也要祝福</a>
			</div>
		</div>
	</div>
</template>
<script>
	import sapi from '../../../service'
	import urlUtil from '../../../utils/url.js'
	import {
		router
	} from '../app.js'
	export default {
		data() {
				return {
					usid: '',
					list: [],
					activity_usid: '',
					activity: {},
					hasLiked: false,
					userName: '',
					cumNum: 0,
					shareInfo: {
						link: '',
						title: '',
						description: '',
						imgUrl: '',
					}

				}
			},
			methods: {
				goHome() {
					window.location.href = location.href.split("?")[0] + location.search.split("_")[0];
				},
				acGetUserAcumInfo() {
					sapi.acGetUserAcumInfo(this, {
						userid: this.activity_usid
					}, (back) => {
						if(back.resCode == 0) {
							if(back.repBody[0].total == 0) {
								this.hasLiked = true;
							} else {
								this.hasLiked = false;
							}
						}
					})
				},
				//自集或者帮忙集一次
				acAddHelp() {
					if(!this.hasLiked) return;
					sapi.acAddHelp(this, {
						userid: this.activity_usid
					}, (back) => {
						if(back.resCode == 0) {
							if(back.repBody[0]) {
								this.hasLiked = true;
								this.acGetUserAcumList();
								this.cumNum = ~~this.cumNum + 1;
								this.hasLiked = false;
							}
						}
					})
				},
				//获取集赞数
				acGetUserAcumNum() {
					sapi.acGetUserAcumNum(this, {
						userid: this.activity_usid
					}, (back) => {
						if(back.resCode == 0) {
							this.cumNum = back.repBody[0].total;
						}
					})
				},
				acGetUserAcumList() {
					var that = this;
					sapi.acGetUserAcumList(this, {
						pageNum: "1", //当前页
						pageSize: "10",
						userid: this.activity_usid
					}, (back) => {
						console.log(back)
						if(back.resCode == '0') {
							that.list = back.repBody.list;
						} else {
							this.$dispatch('handle_server_error', back);
						}
					})
				},
				getUserInfo() {
					sapi.getUserInfo(this, {}, (back) => {
						if(back.resCode == "0") {
							this.usid = back.repBody[0].usid;
							// 获取路由里面的usid
							var aids = urlUtil.getArgsFromUrl("aid");
							var router_usid = (aids.indexOf("_") == -1 ? "" : aids.split("_")[1]);
							if(router_usid && router_usid != this.usid) {
								this.visiteMode = 'share';
								this.activity_usid = router_usid;
							} else {
								this.activity_usid = this.usid;
							}
							this.acGetUserAcumList();
							this.acGetUserAcumInfo();
							this.acGetUserAcumNum();
						} else {
							this.$dispatch('handle_server_error', back);
						}
					})
				},
			},
			ready() {
				this.getUserInfo();
			}
	}
</script>
<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-two {
		overflow: hidden;
		span {}
		.btn-panel {
			width: 100%;
			text-align: center;
			font-size: 0;
			margin-top: px2rem(40px);
			.wap-button {
				margin: 0;
				margin-right: px2rem(60px);
				width: px2rem(275px);
				height: px2rem(70px);
				line-height: px2rem(70px);
				font-size: px2rem(30px);
				display: inline-block;
				a {
					text-decoration: none;
				}
				&:last-child {
					margin-right: 0;
				}
			}
			.disabled {
				background-color: #989898;
				opacity: 1;
			}
		}
		.collection-pic-list {
			ul {
				padding: 0;
				list-style: none;
				text-align: center;
				height: px2rem(240px);
				overflow-y: auto;
				li {
					font-size: px2rem(26px);
					color: #fff;
					span {
						color: #e5bd06;
					}
				}
			}
			width: px2rem(582px);
			height: px2rem(372px);
			border: 1px solid #e5bd06;
			border-radius: 5px;
			background-color: #5d3720;
			margin: px2rem(394px) auto 0 auto;
			.title {
				font-size: px2rem(30px);
				text-align: center;
				margin: px2rem(35px) 0;
				color: #e5bd06;
				span {
					color: #f11e08;
				}
			}
		}
	}
</style>