<template>
	<div class="game-view-one truck-bg">
		<div class="img-panel">
			<img :src="dataList.cardurl" />
			<p>
				你抽到了<span>{{dataList.cardname}}</span>
			</p>
		</div>
		<div class="game-btn" @click="goLink">
			<span>确定</span>
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
					activity_usid: '',
					activity: {},
					picList: [],
					userPicList: [],
					dataList: {},
				}
			},
			methods: {
				goLink() {
					console.log('林国顺');
					var aids = urlUtil.getArgsFromUrl("aid"),
						isMyself = (aids.indexOf("_") == -1 ? true : false);
					if(isMyself) {
						router.go({path: '/'});
					} else {
						router.go({
							name: 'game-one',
							params: {
								n:this.$root.helpUserName 
							}
						})
					}
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
							this.getUserAcumInfo();
						} else {
							this.$dispatch('handle_server_error', back);
						}
					})
				},
				addHelp() {
					sapi.addHelp(this, {
						userid: this.activity_usid
					}, (back) => {
						if(back.resCode == 0) {
							this.dataList = back.repBody[0];
						}
					})
				}, //用户当天是否助力
				getUserAcumInfo() {
					sapi.getUserAcumInfo(this, {
						userid: this.activity_usid
					}, (back) => {
						if(back.resCode == 0) {
							if(back.repBody[0].total != 0) {
								this.$dispatch('handle_server_error', '您已经集过卡了');
							} else {
								this.addHelp();
							}
						}
					})
				}
			},
			created() {
				this.getUserInfo();
			}
	}
</script>

<style lang="scss">
	@import '../../../../css/px2rem.scss';
	.game-view-one {
		text-align: center;
		.img-panel {
			img {
				margin: px2rem(109px) px2rem(74px) px2rem(0px) px2rem(74px);
				width: px2rem(305px);
			}
			p {
				text-align: center;
				margin-top: px2rem(20px);
				font-size: px2rem(30px);
				color: #000000;
				span {
					font-size: px2rem(30px);
					color: #ed6c00;
					text-decoration: underline;
				}
			}
		}
	}
</style>