<template>
	<div class="game-view-three truck-bg">
		<div class="img-panel">
			<div class="scroll">
				<div class="img-cl" v-for="list in picList">
					<img :src="list.picurl" />
					<div :class="list.classs"></div>
				</div>
			</div>
		</div>
		<div class="btn-panel">
			<div class="game-btn" v-if="isPrize==10005 ||isPrize==00000" @click="addCardPrizeUserInfo">
				<span>去领奖</span>
			</div>
			<div class="game-btn-select" v-if="isPrize==10004">
				<span>已领奖</span>
			</div>
			<div class="game-btn-select" v-if="isPrize==10006||isPrize==10007 ">
				<span>已领完</span>
			</div>
			<div class="game-btn-select" v-if="isPrize==10009">
				<span>已结束</span>
			</div>
			<share-btn v-if="isPrize==10008" :title="shareInfo.title" :link="shareInfo.link" :desc="shareInfo.description" :img-url="shareInfo.imgUrl" :func="showShare">
				<div class="game-btn">
					<span>邀请好友协助</span>
				</div>
			</share-btn>
		</div>
		<ul class="collection-pic-list">
			<li v-for="i in list">好友{{i.usernick}}为你抽到了{{i.cardname}}</li>
		</ul>
	</div>
</template>
<script>
	import sapi from '../../../service'
	import urlUtil from '../../../utils/url.js'
	import shareBtn from '../../../components/share-btn/share-btn.vue'
	import wx from '../../../utils/wx.js'
	import {
		router
	} from '../app.js'
	export default {
		components: {
			shareBtn,
		},
		data() {
			return {
				usid: '',
				activity_usid: '',
				activity: {},
				picList: [],
				userPicList: [],
				list: [],
				isPrize: "-1",
				nick: '',
				shareInfo: {
					link: '',
					title: '',
					description: '',
					imgUrl: '',
				},
			}
		},
		methods: {
			//分享
			showShare(type, status) {
				var that = this;
				// wxUtil.share(sharetext,basePath+"login.jsp?aid="+that.activityInfo.aid,shareicon, (type,status)=>{
				if(status == 'success') {
					 
				}
			},
			addCardPrizeUserInfo() {
				sapi.addCardPrizeUserInfo(this, {}, (back) => {
					if(back.resCode == "00000") {
						router.go({
							name: 'receive',
							params: {
								g: back.repBody[0].gid,
								n: back.repBody[0].pname
							}
						})
					}
				})
			},
			getUserInfo() {
				sapi.getUserInfo(this, {}, (back) => {
					if(back.resCode == "0") {
						this.usid = back.repBody[0].usid;
						this.nick = back.repBody[0].nick;
						// 获取路由里面的usid
						var aids = urlUtil.getArgsFromUrl("aid");
						var router_usid = (aids.indexOf("_") == -1 ? "" : aids.split("_")[1]);
						if(router_usid && router_usid != this.usid) {
							this.visiteMode = 'share';
							this.activity_usid = router_usid;
						} else {
							this.activity_usid = this.usid;
						}
						this.getCardList();
						this.getUserAcumList();
						this.isCardPrizeByUsid();
						this.shareInfo = eval("(" + window.store.configData.extbody + ")").weixinShare;
						this.shareInfo.link = basePath + "login.jsp?aid=" + window.store.configData.aid + "_" + this.activity_usid + "_game-one/" + this.nick;
					} else {
						this.$dispatch('handle_server_error', back);
					}
				})
			},
			getUserAcumList() {
				var that = this;
				sapi.getUserAcumList(this, {
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
			isCardPrizeByUsid() {
				var that = this;
				sapi.isCardPrizeByUsid(this, {}, (back) => {
					console.log(back)
					if(back.resCode == '0') {
						//返回状态吗
						that.isPrize = back.repBody.code;
					} else {
						this.$dispatch('handle_server_error', back);
					}
				})
			},
			//获取活动集卡列表
			getCardList() {
				var that = this;
				var isTrue = true;
				sapi.getCardList(this, {
					userid: this.activity_usid
				}, (back) => {
					console.log(back)
					if(back.resCode == '0') {
						that.picList = back.repBody.picList;
						that.userPicList = back.repBody.userPicList;
						for(var i = 0, length = that.picList.length; i < length; i++) {
							isTrue = true;
							for(var j = 0; j < that.userPicList.length; j++) {
								if(that.userPicList[j].cardid == that.picList[i].id) {
									isTrue = false
								}
							}
							that.picList[i].classs = {
								'card-list-bg': isTrue
							};
						}
					} else {
						this.$dispatch('handle_server_error', back);
					}
				})
			}
		},
		ready() {
			var weixinShare = window.store.activityConfig.weixinShare;
			this.shareInfo.title = weixinShare.title;
			this.shareInfo.description = weixinShare.description;
			this.shareInfo.imgUrl = weixinShare.imgUrl;
		},
		created() {
			this.getUserInfo();
		}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-three {
		.btn-panel {
			width: 100%;
			position: relative;
			padding-top: px2rem(55px);
			.game-btn,
			.game-btn-select {
				margin: 0;
				display: inline-block;
				width: px2rem(235px);
				height: px2rem(90px);
				line-height: px2rem(90px);
				font-size: px2rem(34px);
			}
		}
		.collection-pic-list {
			list-style: none;
			padding: 0;
			padding-top: px2rem(64px);
			li {
				span {
					color: #ed6c00;
				}
			}
		}
		text-align:center;
		.img-panel {
			position: relative;
			.scroll {
				white-space: nowrap;
				width: 100%;
				padding-top: px2rem(124px);
				overflow: auto;
				.img-cl {
					display: inline-block;
					position: relative;
					width: px2rem(145px);
					height: 100%;
					margin-right: px2rem(10px);
					img {
						width: 100%;
					}
					.card-list-bg {
						position: absolute;
						top: 0;
						left: 0;
						background-color: rgba(220, 220, 220, 0.7);
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>