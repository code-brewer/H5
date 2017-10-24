<template>
	<div class="game-view-one bargain-bg">
		<div class="btn-panel">
			<div class="wap-button" v-if="!showPrize" @click="acAddHelp" :class="{'disabled':!hasLiked}">
				<a>自砍一刀</a>
			</div>
			<div class="wap-button" v-if="showPrize" @click="addPrizeUserInfo">
				<span>去领奖</span>
			</div>
			<share-btn class="wap-button" :title="shareInfo.title " :link="shareInfo.link " :desc="shareInfo.description " :img-url="shareInfo.imgUrl " :func="showShare">
				<div class="wap-button">
					<span>邀请好友砍一刀</span>
				</div>
			</share-btn>
		</div>
		<div class="collection-pic-list">
			<div class="title">
				你已经凑够了{{cumNum}}刀，还剩下{{subTotal}}刀
			</div>
			<ul>
				<li v-for="item in list">{{item.usernick}}于{{item.ctime}}为TA砍了1刀</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import sapi from '../../../service'
	import urlUtil from '../../../utils/url.js'
	import shareBtn from '../../../components/share-btn/share-btn.vue'
	export default {
		components: {
			shareBtn,
		},
		data() {
			return {
				usid: '',
				list: [],
				activity_usid: '',
				activity: {},
				hasLiked: false,
				userName: '',
				cumNum: 0,
				subTotal:0,
				shareInfo: {
					link: '',
					title: '',
					description: '',
					imgUrl: '',
				},
				showPrize: false,
				gid: "0",
				pname: ''
			}
		},
		methods: {
			goBindPrize() {
				if(!this.showPrize) return;
				this.$root.$router.go({
					name: 'receive',
					params: {
						g: this.gid,
						n: this.pname
					}
				})
			},
			isPrizeByUsid() {
				sapi.isPrizeByUsid(this, {}, (back) => {
					if(back.resCode == "00000") {
						this.showPrize = true;
					} else {
						this.showPrize = false;
					}
				})
			},
			addPrizeUserInfo() {
				if(!this.showPrize) return;
				sapi.addPrizeUserInfo(this, {}, (back) => {
					if(back.resCode == "00000") {
						this.$root.$router.go({
							name: 'receive',
							params: {
								g: back.repBody[0].gid,
								n: back.repBody[0].pname
							}
						})
					}
				})
			},
			//分享
			showShare(type, status) {
				var that = this;
				if(status == 'success') {}
			},
			//用户当天是否助力
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
							this.isPrizeByUsid();
							this.hasLiked = true;
							this.acGetUserAcumList();
							this.cumNum = ~~this.cumNum + 1;
							this.subTotal = ~~this.subTotal - 1;
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
						this.subTotal = back.repBody[0].sub_total;
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
						this.isPrizeByUsid();
						this.shareInfo = eval("( " + window.store.configData.extbody + ") ").weixinShare;
						this.shareInfo.link = basePath + "login.jsp?aid=" + window.store.configData.aid + "_" + this.activity_usid + "_game-two";
					} else {
						this.$dispatch('handle_server_error', back);
					}
				})
			},

		},
		ready() {
			var weixinShare = window.store.activityConfig.weixinShare;
			this.shareInfo.title = weixinShare.title;
			this.shareInfo.description = weixinShare.description;
			this.shareInfo.imgUrl = weixinShare.imgUrl;
		},
		created() {
			this.userName = this.$route.params.n;
			this.$root.helpUserName = this.userName
			this.getUserInfo();
		}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-one {
		overflow: hidden;
		span {}
		.btn-panel {
			width: 100%;
			text-align: center;
			font-size: 0;
			margin-top: px2rem(550px);
			.wap-button {
				margin: 0;
				margin-right: px2rem(60px);
				width: px2rem(231px);
				height: px2rem(66px);
				line-height: px2rem(66px);
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
				text-align: left;
				height: px2rem(240px);
				overflow-y: auto;
				li {
					font-size: px2rem(22px);
					color: #533e00;
					span {
						color: #e5bd06;
					}
				}
			}
			width: px2rem(582px);
			height: px2rem(200px);
			margin: px2rem(85px) auto 0 auto;
			.title {
				font-size: px2rem(22px);
				text-align: left;
				color: #533e00;
				span {
					color: #f11e08;
				}
			}
		}
	}
</style>