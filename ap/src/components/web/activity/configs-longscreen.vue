<template>
	<div class="ams-configs">
		<div class="config-contents"
		     @click="editConfig">
			<!-- 信息编辑 -->
			<div class="content">
				<div>
					<div class="label-inline">
						<span class="onse onse-has-red">活动名称：</span>
						<input type="text"
						       class="form-control"
						       v-model="configData.title">
					</div>
					<div class="label-inline"
					     v-bind:class="{'edit-disabled': isOnline}">
						<span class="onse onse-has-red">上传背景图片</span>
					</div>
					<div class="label-inline"
					     style="margin-top: 10px">
						<upload-image name="longscreen-image"
						              :img-url.sync="activityConfig.common.bgUrl"></upload-image>
						<span>图片格式jpg,png,gif,jpeg,图片大小必须小于3M,建议宽度640px</span>
					</div>
					<div class="label-inline">
						<span class="onse">播放组件<em>(将下方组件拖到左边页面需要插入的位置，编辑配置即可)</em></span>
					</div>
					<div class="label-inline"
					     style="margin-top: 10px">
						<div class="music-play__component"
						     v-el:musicplay>
							<span class="music-play__btn"><i class="glyphicon glyphicon-play"></i></span>
							<span class="music-play__btn"><i class="buy">订购</i></span>
							<span class="music-play__title">歌名</span>
						</div>
						<div v-if="draging"
						     v-el:dragmusicplay
						     class="music-play__component drag-music-play">
							<span class="music-play__btn"><i class="glyphicon glyphicon-play"></i></span>
							<span class="music-play__btn"><i class="buy">订购</i></span>
							<span class="music-play__title">歌名</span>
						</div>
					</div>
					<div class="label-inline">
						<span class="onse onse-has-red"
						      style="align-self:flex-start; margin-top: 10px;">渠道号：</span>
						<app-info-list :appinfos.sync="configData.channel"></app-info-list>
					</div>
					<div class="label-inline"
					     style="align-items: flex-start;">
						<span class="onse">微信分享：</span>
						<weixin-share :weixin-share.sync="activityConfig.weixinShare"> </weixin-share>
					</div>
				</div>
				<div class="history-activity__container">
					<h4>往期回顾</h4>
					<div class="history-activity__item">
						<span class="title pull-left">图片一</span>
						<div class="upload-thumb">
							<div class="media">
								<div class="media-left">
									<img class="media-object"
									     :src="activityConfig.history_a.imgUrl ? activityConfig.history_a.imgUrl : activityConfig.defaultImgUrl"
									     alt="">
								</div>
								<div class="media-body">
									<upload-image name="longscreen-image1"
									              :reset-able="true"
									              :default-img-url="activityConfig.history_a.defaultImgUrl"
									              :img-url.sync="activityConfig.history_a.imgUrl">
									</upload-image>
								</div>
							</div>
						</div>
					</div>
					<div class="history-activity__item">
						<span class="title pull-left">链接一</span>
						<div class="media">
							<input type="text"
							       class="form-control"
							       placeholder="请填写跳转url"
							       v-model="activityConfig.history_a.href">
						</div>
					</div>
					<div class="history-activity__item">
						<span class="title pull-left">图片二</span>
						<div class="upload-thumb">
							<div class="media">
								<div class="media-left">
									<img class="media-object"
									     :src="activityConfig.history_b.imgUrl ? activityConfig.history_b.imgUrl : activityConfig.defaultImgUrl"
									     alt="">
								</div>
								<div class="media-body">
									<upload-image name="longscreen-image2"
									              :reset-able="true"
									              :default-img-url="activityConfig.history_b.defaultImgUrl"
									              :img-url.sync="activityConfig.history_b.imgUrl">
									</upload-image>
								</div>
							</div>
						</div>
					</div>
					<div class="history-activity__item">
						<span class="title pull-left">链接二</span>
						<div class="media">
							<input type="text"
							       class="form-control"
							       placeholder="请填写跳转url"
							       v-model="activityConfig.history_b.href">
						</div>
					</div>
					<div class="history-activity__item">
						<span class="title pull-left">查看更多</span>
						<div class="media">
							<input type="text"
							       class="form-control"
							       placeholder="请填写跳转url"
							       v-model="activityConfig.more">
						</div>
					</div>
				</div>
				<div id="condition"
				     v-bind:class="{'edit-disabled': isOnline}"></div>
			</div>
		</div>
		<snackbar :show.sync="snackbar_active"
		          :message="snackbar_msg"
		          action-text="知道了"></snackbar>
	</div>
</template>

<script>
import Vue from 'vue'
import api from '../../../api/index.js'
import jquery from 'jquery'
import utils from '../../../utils'
import weixinShare from '../../web/weixin-share.vue'
import AppInfoList from '../../web-base/AppInfoList/AppInfoList.vue'
import snackbar from '../../web-base/snackbar'
import ResetuploadThumb from '../../web-base/ResetuploadThumb'
import UploadImage from '../../web-base/UploadImage'
export default {
	components: {
		weixinShare,
		snackbar,
		AppInfoList,
		ResetuploadThumb,
		UploadImage
	},
	props: {
		disabled: {
			Boolean,
			default: false
		}
	},
	data() {
		var activityConfig = window.store.activityConfig;
		var configData = window.store.configData;
		return {
			showQuestionBank: false,
			configData,
			addNum: false,
			configsTabs: [],
			selectList: window.store.selectList,
			currTabHas: '',
			snackbar_active: false,
			moreConfig: false,
			snackbar_msg: '',
			joinuser: '',
			activityConfig,
			changeList: [],
			currentView: "",
			showQuest: false,
			isMobile: '',
			isOnline: false,
			isPrizeRule: false,
			appinfos: [],
			draging: false,
			mouseup: false,
			musicType: 'song'
		}
	},
	methods: {
		init() {
			var params = window.getParams();
			if (params.aid) {
				api.selectActivityById(this, {
					aid: params.aid
				}, function (back) {
					if (back.resCode == "0") {
						var configData = back.repBody[0];
						configData.channel = back.repBody[1]; // 渠道号
						this.isMobile = configData.is_mobile;
						configData.starttime = configData.starttime.split(' ')[0];
						configData.endtime = configData.endtime.split(' ')[0];
						if (configData.status == "3") { // 活动已上线
							this.$set("isOnline", true)
						}
						if (configData.player) {
							configData.player = configData.player.split(',');
							this.configData.player = configData.player;
							this.$set("activityConfig.playerNum", this.configData.player);
						}
						if (configData.isfollow) {
							configData.isfollow = configData.isfollow.split(',');
							this.configData.isfollow = configData.isfollow;
						}
						if (configData.isshare == "false") {
							configData.isshare = false;
						} else {
							configData.isshare = true;
						}
						utils.extend(this.configData, configData, true);
						this.setPrizeType();
						if (this.configData.prizeJson.length > 0) {
							this.$nextTick(() => {
								this.$broadcast("changeSelectList", this.configData.prizeJson)
							})
						}
						utils.extend(this.activityConfig, eval("(" + back.repBody[0].extbody + ")"), true);
						window.store.activityConfig.isUpdate = true;
						this.configData.firstGidcnt = this.configData.gidcnt;
						if (window.store.configData.types == "节日") this.showQuest = true;
					}
				}.bind(this));

			} else {
				this.getTemplateInfo()
			}
		},
		copySelectList() {
			var newList = JSON.stringify(this.selectList);
			newList = JSON.parse(newList);
			for (var i = 0; i < newList.length; i++) {
				var prizeList = newList[i].prizeList;
				for (var j = 0; j < prizeList.length; j++) {
					var gids = prizeList[j].gids;
					for (var k = 0; k < gids.length; k++) {
						var gid = newList[i].prizeList[j].gids[k].gid;
						newList[i].prizeList[j].gids[k] = gid
					}
				}
			}
			return newList;
		},
		changeSelectList(list) {
			this.selectList = list;
			for (var i = 0; i < this.selectList.length; i++) {
				var prizeList = this.selectList[i].prizeList;
				for (var j = 0; j < prizeList.length; j++) {
					var gids = this.selectList[i].prizeList[j].gids;
					if (gids.length != 0) {
						this.listByGids(gids, i, j);
					}
				}
			}
		},
		listByGids(list, i, j) {
			var gids = []
			api.listByGids(this, {
				'gids': list.join(",")
			}, (data) => {
				if (data.resCode == "0") {
					this.selectList[i].prizeList[j].gids = data.repBody;
				}
			});
			return gids;
		},
		getTemplateInfo() {
			var params = window.getParams()

			if (params.mid) {
				api.selectModelsByMid(this, {
					mid: params.mid
				}, function (back) {
					if (back.resCode == '0') {
						utils.extend(this.configData, back.repBody[0]);
						this.isMobile = back.repBody[0].is_mobile;
						if (window.store.configData.types == "节日") this.showQuest = true;
						this.setPrizeType();
						this.$nextTick(() => {
							this.$broadcast("setPirzeList");
						})
					}
				}.bind(this));
			}
		},
		setPrizeType() {
			if (this.configData.mprizeway) {
				if (this.configData.mprizeway.indexOf('ranking') > -1) {
					this.currentView = "setPrizeDate";
				} else if (this.configData.mprizeway.indexOf('timely') > -1) {
					this.currentView = "setPrizeImmediate";
				} else if (this.configData.mprizeway.indexOf('redpack') > -1) {
					this.currentView = "setPrizeWechatred";
				} else if (this.configData.mprizeway.indexOf('luckdraw') > -1) {
					this.currentView = "setPrizeLuck";
				}
			} else {
				this.currentView = "";
			}

		},
		editConfig(event) {
			let $target = jquery(event.target);
			if ($target.hasClass('edit-disabled') || ($target.is('.awards-list, .datepicker, .label-inline') && $target.parents('.edit-disabled').length)) {
				this.snackbar_active = true;
				this.snackbar_msg = "活动上线中，无法修改此选项";
			}
		}
	},
	ready() {
		this.$on("save", () => {
			// 活动名称为空
			if (this.configData.title.trim() == "") {
				this.snackbar_active = true;
				this.snackbar_msg = "活动名称不能为空";
				this.disabled = false;
				return;
			}

			// 渠道号为空
			if (!this.configData.channel.length) {
				this.snackbar_active = true;
				this.snackbar_msg = "渠道号不能为空";
				this.disabled = false;
				return;
			}

			let musicEmpty = false
			this.activityConfig.musics.forEach((music) => {
				if (music.musicId == '') {
					return musicEmpty = true
				}
			});

			if (musicEmpty) {
				this.snackbar_active = true;
				this.snackbar_msg = "您有未配置歌曲的播放组件，请重新配置或删除";
				this.disabled = false;
				return
			}

			this.$broadcast("saveSelectedList");
			var configData = JSON.parse(JSON.stringify(this.configData));
			configData.player = configData.player.join(',');
			configData.isfollow = configData.isfollow.join(',');
			configData.extbody = JSON.stringify(this.activityConfig);
			configData.isshare = configData.isshare.toString();
			configData.endtime = configData.endtime + " 23:59:00"

			api.newAddOrUpdSpActivity(this, configData, (data) => {
				console.log(data)
				this.disabled = false;
				if (data.resCode == "0") {
					this.configData.aid = data.resMsg;
					this.snackbar_active = true;
					this.snackbar_msg = "保存成功!";
					this.$broadcast("changePlayer");
				} else {
					this.snackbar_active = true;
					this.snackbar_msg = data.resMsg;
				}
			});
		});

		this.$on('showSnacker', (resMsg) => {
			this.snackbar_active = true;
			this.snackbar_msg = resMsg;
		})

		this.init();

		// 开始拖动组件
		this.$els.musicplay.addEventListener('mousedown', () => {
			this.draging = true
			Vue.nextTick(() => {
				// DOM 更新了
				this.$els.dragmusicplay.addEventListener('mouseup', () => {
					this.draging = false
					this.mouseup = true
				})
			})
		})

		// 取消创建组件
		this.$els.musicplay.addEventListener('mouseout', () => {
			this.mouseup = false
		})

		// 拖动组件
		document.body.addEventListener('mousemove', (e) => {
			if (this.draging) {
				this.$els.dragmusicplay.style.opacity = 0.75
				this.$els.dragmusicplay.style.top = parseInt(document.defaultView.getComputedStyle(this.$els.dragmusicplay).top, 10) + e.movementY + 'px'
				this.$els.dragmusicplay.style.left = parseInt(document.defaultView.getComputedStyle(this.$els.dragmusicplay).left, 10) + e.movementX + 'px'
			}
		})
	},

	watch: {
		'activityConfig.enterPhone'(v, o) {
			if (v && this.mouseup) { // 新增音乐播放组件
				let len = this.activityConfig.musics.length
				this.mouseup = false
				this.activityConfig.musics.push({
					musicIndex: len ? this.activityConfig.musics[len - 1].musicIndex + 1 : 0,
					// posY: len ? this.activityConfig.musics[len - 1].posY + 40 : 40,
					posY: this.activityConfig.musicPos,
					musicTitle: '新增歌曲',
					musicId: '',
					musicUrl: ''
				})
			}
		}
	},
	created() {
		let that = this;
		this.configsTabs = [{
			name: '信息编辑',
			url: '#info-config-content'
		}, {
			name: '条件设置',
			url: '#condition-config-content'
		}];
		that.currTabHas = this.configsTabs[0].url;
	}
}
</script>

<style lang="scss">
@import '../../../css/bootstrap/_variables.scss';
@import '../../../css/bootstrap/_mixins.scss';
.music-play__component {
	margin-left: 10px;
	padding: 5px 10px;
	width: 300px;
	border: 1px solid #ccc;
	overflow: hidden;
	cursor: move;
	cursor: -webkit-grab;

	&.drag-music-play {
		position: absolute;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 1000;
	}

	.music-play__title {
		line-height: 30px;
	}

	.music-play__btn {
		position: relative;
		float: right;
		margin-left: 10px;
		display: block;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 30px;

		.buy {
			font-style: normal;
		}
	}
}

.history-activity__container {
	margin-top: 40px;
	margin-left: 10px;

	h4 {
		font-size: 14px;
		font-weight: bold;
	}
}

.history-activity__item {
	margin-bottom: 10px;

	.title {
		display: block;
		width: 100px;
		text-align: center;
		line-height: 40px;
	}

	.media {
		margin-left: 110px;

		.media-object {
			border: 1px solid #ccc;
			max-height: 80px;
		}
	}
}

.label-inline {
	display: flex;
	align-items: center;
	margin-top: 20px;
	font-size: 12px;
	position: relative;
	&:first-child {
		margin-top: 0;
	}
	.onse {
		min-width: 120px;
		padding-left: 10px;
		font-weight: bold;

		em {
			font-weight: normal;
			font-style: normal;
		}

		&.onse-has-red::before {
			content: '*';
			color: red;
			position: absolute;
			left: 0;
		}
	}
	a.onse {
		text-decoration: none;
	}
	.red {
		color: red;
	}
	.gray {
		color: #ccc;
		margin-left: 15px;
	}
	textarea {
		resize: none;
		min-height: 100px;
	}
	.color-picker-cube {
		width: 32px;
		height: 32px;
		display: inline-block;
		border: 1px solid #d6d6d6;
		cursor: pointer;
	}
	.table-middle {
		td {
			vertical-align: middle
		}
	}
}

.ams-configs {
	width: 100%;
	.question {
		margin-left: 10px;
		color: white;
		background-color: #838383;
		border-radius: 10px;
		width: 20px;
		font-size: 13px;
		text-align: center;
		line-height: 20px;
	}
	.config-tabs {
		width: 100%;
		overflow-x: hidden;
		margin-bottom: 35px;
		.tab {
			display: block;
			width: 25%;
			height: 28px;
			background: #f3f3f3;
			text-align: center;
			line-height: 28px;
			float: left;
			font-size: 12px;
			color: #010101;
			text-decoration: none;
			&.tab-active {
				background: $brand-primary;
				color: #fff;
			}
		}
	}
	.config-contents {
		width: 100%;
	}
}

.edit-disabled {
	input,
	label,
	.awards-item {
		pointer-events: none;
	}
}

.rule-content {
	width: 100%;
	height: 480px;

	.rule-tabs {
		margin-bottom: 10px;
		border-bottom: 1px solid #ccc;

		a {
			padding: 5px 10px;
			display: inline-block;
			border-bottom: 2px solid transparent;
			text-decoration: none;
			color: #333333;

			&.active {
				border-color: #007AFF;
				color: #007AFF;
			}
		}
	}
}
</style>