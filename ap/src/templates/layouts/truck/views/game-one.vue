<template>
	<div class="game-view-two truck-bg">
		<div class="img-panel">
			<div class="scroll">
				<div class="img-cl" v-for="list in picList">
					<img :src="list.picurl" />
					<div :class="list.classs"></div>
				</div>
			</div>
		</div>

		<ul class="collection-pic-list">
			<li>好友<span>{{userName}}</span>邀请你协助TA集卡</li>
		</ul>
		<div class="btn-panel">
			<div class="game-btn" @click="goTo" v-if="hasLiked">
				<span>帮TA集卡</span>
			</div>
			<div class="game-btn-select" v-if="!hasLiked">
				<span>帮TA集卡</span>
			</div>
			<div class="game-btn" @click="goHome">
				<span>我也要集卡</span>
			</div>
		</div>
	</div>
</template>
<script>
	import sapi from '../../../service'
	import urlUtil from '../../../utils/url.js'
	export default {
		data() {
				return {
					usid: '',
					activity_usid: '',
					activity: {},
					picList: [],
					userPicList: [],
					hasLiked: false,
					userName:''
				}
			},
			methods: {
				goTo(evt) {
					if(!this.hasLiked) return;
					let starttime = new Date(this.$root.configData.starttime).getTime();
					let endtime = new Date(this.$root.configData.endtime.substr(0, 10)).getTime();
					let now = new Date().getTime();
					let msg = '';
					this.isStop = false;
					// 判断活动是否开始
					if(now < starttime) {
						this.isStop = true;
						msg = '活动还没开始！';
						return;
					}
					// 判断活动是否结束
					else if(now > endtime) {
						if(this.endJump) {
							this.$route.router.go({
								path: this.jumpPath
							});
						}
						this.isStop = true;
						msg = '活动已结束！';
						return;
					}
					if(this.isStop) {
						evt.preventDefault();
						this.$dispatch('loading', {
							text: msg,
							icon: false,
							duration: 1500,
							name: 'startbtn'
						});
						return;
					}
					this.$route.router.go({
						name: 'game-two'
					});
				},
				goHome() {
					window.location.href = location.href.split("?")[0] + location.search.split("_")[0];
				},
				//用户当天是否助力
				getUserAcumInfo() {
					sapi.getUserAcumInfo(this, {
						userid: this.activity_usid
					}, (back) => {
						if(back.resCode == 0) {
							if(back.repBody[0].total==0) {
								this.hasLiked = true;
							}else{
								this.hasLiked = false;
							}
						}
					})
				},
				getUserInfo() {
					sapi.getUserInfo(this, {}, (back) => {
						console.log(back)
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
							this.getCardList();
							this.getUserAcumInfo();
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
				},
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
	.game-view-two {
		.btn-panel {
			width: 100%;
			position: relative;
			padding-top: px2rem(116px);
			.game-btn,.game-btn-select {
				margin: 0;
				display: inline-block;
				width: px2rem(200px);
				height: px2rem(75px);
				line-height: px2rem(75px);
				font-size: px2rem(34px);
				position: relative;
			}
		}
		.collection-pic-list {
			list-style: none;
			padding: 0;
			padding-top: px2rem(89px);
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