<template>
	<div class="ams-configs">
		<nav class="config-tabs">
			<a href="javascript:;" class="tab" :class="{'tab-active': currTabHas == tab.url}" v-for="tab in configsTabs" @click="currTabHas=tab.url">{{tab.name}}</a>
		</nav>
		<div class="config-contents" @click="editConfig">
			<!-- 信息编辑 -->
			<div class="content" v-show="currTabHas==configsTabs[0].url">
				<tabs :header="pageConfig.header" :content="pageConfig.content" :width="100" style="margin-top: -30px;">
					<div slot="basic">
						<div class="label-inline">
							<span class="onse onse-has-red">活动名称：</span>
							<input type="text" class="form-control" v-model="configData.title">
						</div>
						<div class="label-inline" v-bind:class="{'edit-disabled': isOnline}">
							<span class="onse onse-has-red">活动日期：</span>
							<datepicker v-ref:dp :value.sync="configData.starttime" :show-input="false" format="yyyy-MM-dd" placeholder="年-月-日" width="120px"></datepicker>
							<span style="width: 50px; text-align: center;">至</span>
							<datepicker v-ref:dp :value.sync="configData.endtime" :show-input="false" format="yyyy-MM-dd" placeholder="年-月-日" width="120px"></datepicker>
						</div>
						<div class="label-inline" style="margin-top: 5px;">
							<span class="onse"></span>
							<small class="red">(活动时间不小于2天，默认最后1天为领奖日，不进行游戏)</small>
						</div>
						<div class="label-inline">
							<span class="onse">参与人数：</span>
							<checkbox :model.sync="activityConfig.participant.show" :disabled="activityConfig.participant.disabled">显示</checkbox>
						</div>
						<div class="label-inline" style="margin-top: 0;" v-show="activityConfig.participant.show">
							<span class="onse"></span>
							<span>在实际参与人数上增加</span>
							<input type="text" class="form-control" v-model="activityConfig.participant.addValue" style="width: 80px;margin: 0 10px;" min="0">
							<span>人</span><small class="gray">(只展示不计入统计)</small></div>
						<div class="label-inline">
							<span class="onse">奖品数量：</span>
							<checkbox :model.sync="activityConfig.atNum.show" :disabled="activityConfig.atNum.disabled">显示</checkbox>
							<small class="gray">(显示剩余的奖品数量)</small>
						</div>
						<div class="label-inline" v-show="activityConfig.atNum.show">
							<span class="onse"></span>
							<input type="text" class="form-control" v-model="activityConfig.atNum.text.valueL" style="width: 80px;text-align: center; margin: 0px 10px;">
							<p style="width: 50px;margin: 0; text-align:center;">{{configData.gidcnt}}</p>
							<question>奖品数量不可手动更改，为设置的奖品数</question>
							<input type="text" class="form-control" v-model="activityConfig.atNum.text.valueR">
						</div>
						<div class="label-inline"><span class="onse">活动说明：</span>
							<textarea class="form-control" v-model="configData.des"></textarea>
						</div>
						<div class="label-inline">
							<span class="onse">活动logo：</span>
							<checkbox :checked.sync="true" :model.sync="activityConfig.logo.show">显示</checkbox>
						</div>
					</div>
					<div slot="share">
						<div class="label-inline" style="align-items: flex-start;">
							<span class="onse">微信分享：</span>
							<weixin-share :weixin-share.sync="activityConfig.weixinShare"> </weixin-share>
						</div>
					</div>
					<div slot="more">
						<div class="label-inline" style="align-items: flex-start;">
							<span class="onse">广告页：</span>
							<checkbox :checked="false" :model.sync="activityConfig.bannerPage.enable">使用</checkbox>
							<checkbox :checked="false" :model.sync="activityConfig.bannerPage.show" style="margin-left: 20px;">预览</checkbox>
						</div>
						<div class="label-inline" style="align-items: flex-start;">
							<span class="onse"></span>
							<banner-page :banner-page.sync="activityConfig.bannerPage"></banner-page>
						</div>
						<div class="label-inline" style="align-items: flex-start;">
							<span class="onse">二维码：</span>
							<qr-code :qe-code.sync="activityConfig.qeCode"></qr-code>
						</div>
					</div>
				</tabs>
				<!--<div class="label-inline" style="margin-top: 40px;">
					<a href="javascript:;" class="onse" id="more-info-config">
						<span v-show="!moreConfig">高级配置 <i class="glyphicon glyphicon-menu-right"></i></span>
						<span v-show="moreConfig">收起配置 <i class="glyphicon glyphicon-menu-down"></i></span>
					</a>
				</div>
				<accordion for="more-info-config" :action.sync="moreConfig">
				</accordion>-->
			</div>
			<!-- 条件设置 -->
			<div class="content" id="condition-config-content" v-show="currTabHas==configsTabs[1].url">
				<div class="label-inline" v-bind:class="{'edit-disabled': isOnline}">
					<span class="onse">参与对象：</span>
					<checkbox :model.sync="configData.player" value="W">微信号</checkbox>
					<checkbox :model.sync="configData.player" value="M" v-if="isMobile != 'false'" style="margin-left: 10px">手机号</checkbox>
					<question>此功能需要到账户信息绑定微信公众号即可使用</question>
				</div>
				<div class="label-inline" v-bind:class="{'edit-disabled': isOnline}" v-show="configData.player.join('').indexOf('W')!=-1">
					<span class="onse">关注公众号：</span>
					<!-- <checkbox :model.sync="configData.isfollow" value="see_rank" :disabled="true">查看排名</checkbox> -->
					<checkbox :model.sync="configData.isfollow" value="play_game" :disabled="true">参与活动</checkbox>
					<question>此功能需要到账户信息绑定微信公众号即可使用</question>
				</div>
				<div class="label-inline" v-bind:class="{'edit-disabled': isOnline}">
					<span class="onse">领奖验证码：</span>
					<radio name="verificationcodestyle" :model.sync="configData.verificationcodestyle" value="picture" :style="{'pointer-events':isOnline ? 'none' : 'auto'}">图形验证码</radio>
					<!-- <radio name="verificationcodestyle" :model.sync="configData.verificationcodestyle" :disabled='true' value="sms" style="margin-left: 10px;">短信验证码</radio>
					<radio name="verificationcodestyle" :model.sync="configData.verificationcodestyle" :disabled='true' value="null" style="margin-left: 10px;">无</radio>
					<question>使用短信验证码功能需接入短信验证码发送功能</question> -->
				</div>
				<!-- <div class="label-inline">
					<span class="onse">分享配置：</span>
					<checkbox :model.sync="configData.isshare"  :disabled="true"> 分享活动获得额外积分</checkbox>
					<question>该功能程序猿正在努力完善中...</question>
				</div>
				<div class="label-inline" v-show="configData.isshare">
					<span class="onse"></span>
					<p style="width: 80px;">每天可分享加</p>
					<input type="text" style="width: 80px;" class="form-control" v-model="configData.sharecnt">
					<p>次积分</p>
				</div>
				<div class="label-inline" v-show="configData.isshare">
					<span class="onse"></span>
					<p style="width: 80px;">分享最少得</p>
					<input type="text" style="width: 80px;" class="form-control" v-model="configData.leastscore">
					<p>分</p>
				</div>
				<div class="label-inline" v-show="configData.isshare">
					<span class="onse"></span>
					<p style="width: 80px;">分享最高得</p>
					<input style="width: 80px;" type="text" class="form-control" v-model="configData.tiptopscore">
					<p>分</p>
				</div> -->
				<div class="label-inline" v-bind:class="{'edit-disabled': isOnline}" v-show="showQuest">
					<a class="btn btn-primary" @click="showQuestionBank=true">我的题目</a>
					<question-bank :show-question.sync="showQuestionBank"></question-bank>
				</div>
				<div id="condition" v-bind:class="{'edit-disabled': isOnline}"></div>
			</div>

			<!-- 奖品配置 -->
			<div class="content" v-bind:class="{'edit-disabled': isOnline}" id="prize-config-content" v-show="currTabHas==configsTabs[2].url">
				<component :is="currentView"></component>
			</div>
			<!-- 高级配置 -->
			<div class="content" v-show="currTabHas==configsTabs[3].url">
				<advanced-config-content :common="activityConfig.common"></advanced-config-content>
			</div>
		</div>

		<snackbar :show.sync="snackbar_active" :message="snackbar_msg" action-text="知道了"></snackbar>
	</div>
</template>

<script>
	import tabs from '../../web-base/tabs.vue'
	import bannerPage from '../../web/banner-page.vue'
	import setPrizeDate from '../../web/set-prize-date.vue'
	import checkbox from '../../web-base/checkbox'
	import radio from '../../web-base/radio'
	import snackbar from '../../web-base/snackbar'
	import accordion from '../../web-base/accordion'
	import buttonRipple from '../../web-base/button-ripple'
	import question from '../../web-base/question'
	import api from '../../../api/index.js'
	import datepicker from '../../bootstrap/Datepicker.vue'
	import jquery from 'jquery'
	import utils from '../../../utils'
	import weixinShare from '../../web/weixin-share.vue'
	import qrCode from '../../web/qr-code.vue'
	import advancedConfigContent from './advanced-config-content.vue'
	import setPrizeImmediate from '../../web/set-prize-immediate.vue'
	import setPrizeWechatred from '../../web/set-prize-wechatred.vue'
	import setPrizeLuck from '../../web/set-prize-luck.vue'
	import questionBank from '../../web/question-bank.vue'
	export default {
		components: {
			questionBank,
			setPrizeImmediate,
			setPrizeWechatred,
			weixinShare,
			checkbox,
			radio,
			snackbar,
			accordion,
			question,
			buttonRipple,
			datepicker,
			setPrizeDate,
			setPrizeLuck,
			bannerPage,
			tabs,
			qrCode,
			advancedConfigContent
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
				pageConfig: {
					header: ["基础信息", "分享配置", "更多功能"],
					content: ["basic", "share", "more"]
				},
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
				isMobile:'',
				isOnline: false
			}
		},
		methods: {
			init() {
				var params = window.getParams();
				if(params.aid) {
					api.selectActivityById(this, {
						aid: params.aid
					}, function(back) {
						if(back.resCode == "0") {
							var configData = back.repBody[0];
							this.isMobile = configData.is_mobile;
							configData.starttime = configData.starttime.split(' ')[0];
							configData.endtime = configData.endtime.split(' ')[0];
							if(configData.status == "3") { // 活动已上线
								this.$set("isOnline", true)
							}
							if(configData.player) {
								configData.player = configData.player.split(',');
								this.configData.player = configData.player;
							}
							if(configData.isfollow) {
								configData.isfollow = configData.isfollow.split(',');
								this.configData.isfollow = configData.isfollow;
							}
							if(configData.isshare == "false") {
								configData.isshare = false;
							} else {
								configData.isshare = true;
							}
							utils.extend(this.configData, configData, true);
							this.setPrizeType();
							if(this.configData.prizeJson.length > 0) {
								this.$nextTick(() => {
									this.$broadcast("changeSelectList", this.configData.prizeJson)
								})
							}
							utils.extend(this.activityConfig, eval("(" + back.repBody[0].extbody + ")"), true);
							window.store.activityConfig.isUpdate = true;
							this.configData.firstGidcnt = this.configData.gidcnt;
							if(window.store.configData.types == "节日") this.showQuest = true;
						}
					}.bind(this));

				} else {
					this.getTemplateInfo()
				}
			},
			copySelectList() {
				var newList = JSON.stringify(this.selectList);
				newList = JSON.parse(newList);
				for(var i = 0; i < newList.length; i++) {
					var prizeList = newList[i].prizeList;
					for(var j = 0; j < prizeList.length; j++) {
						var gids = prizeList[j].gids;
						for(var k = 0; k < gids.length; k++) {
							var gid = newList[i].prizeList[j].gids[k].gid;
							newList[i].prizeList[j].gids[k] = gid
						}
					}
				}
				return newList;
			},
			changeSelectList(list) {
				this.selectList = list;
				for(var i = 0; i < this.selectList.length; i++) {
					var prizeList = this.selectList[i].prizeList;
					for(var j = 0; j < prizeList.length; j++) {
						var gids = this.selectList[i].prizeList[j].gids;
						if(gids.length != 0) {
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
					if(data.resCode == "0") {
						this.selectList[i].prizeList[j].gids = data.repBody;
					}
				});
				return gids;
			},
			getTemplateInfo() {
				var params = window.getParams()

				if(params.mid) {
					api.selectModelsByMid(this, {
						mid: params.mid
					}, function(back) {
						if(back.resCode == '0') {
							utils.extend(this.configData, back.repBody[0]);
							this.isMobile = back.repBody[0].is_mobile;
							if(window.store.configData.types == "节日") this.showQuest = true;
							this.setPrizeType();
							this.$nextTick(() => {
								this.$broadcast("setPirzeList");
							})
						}
					}.bind(this));
				}
			},
			setPrizeType() {
				if(this.configData.mprizeway) {
					if(this.configData.mprizeway.indexOf('ranking') > -1) {
						this.currentView = "setPrizeDate";
					} else if(this.configData.mprizeway.indexOf('timely') > -1) {
						this.currentView = "setPrizeImmediate";
					} else if(this.configData.mprizeway.indexOf('redpack') > -1) {
						this.currentView = "setPrizeWechatred";
					} else if(this.configData.mprizeway.indexOf('luckdraw') > -1) {
						this.currentView = "setPrizeLuck";
					}
				} else {
					this.currentView = "";
				}

			},
			editConfig(event) {
				let $target = jquery(event.target);
				if($target.hasClass('edit-disabled') || ($target.is('.awards-list, .datepicker, .label-inline')&&$target.parents('.edit-disabled').length)) {
					this.snackbar_active = true;
					this.snackbar_msg = "活动上线中，无法修改此选项";
				}
			}
		},
		ready() {
			this.$on("save", () => {
				// 如果参与对象没勾选
				if(this.configData.player.length <= 0) {
					this.snackbar_active = true;
					this.snackbar_msg = "参与对象不能为空";
					this.disabled = false;
					return;
				}
				this.$broadcast("saveSelectedList");
				var configData = JSON.parse(JSON.stringify(this.configData));
				configData.player = configData.player.join(',');
				configData.isfollow = configData.isfollow.join(',');
				configData.extbody = JSON.stringify(this.activityConfig);
				configData.isshare = configData.isshare.toString();
				api.addOrUpdActivity(this, configData, (data) => {
					this.disabled = false;
					if(data.resCode == "0") {
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
			this.init();
		},

		watch: {
			'configData.endtime' (v, o) {
				this.configData.endtime = v.split(" ")[0];
				var newDate = new Date(v);
				newDate.setDate(newDate.getDate() - 1);
				if(utils.formatDate(newDate, "yyyy-MM-dd") < this.configData.starttime || v < utils.formatDate(new Date(), "yyyy-MM-dd")) {
					this.snackbar_active = true;
					this.snackbar_msg = '活动天数必须大于2天,并且活动结束日期不能小于开始日期和当前日期.';
					this.configData.endtime = o;
				}
			},
			'configData.starttime' (v, o) {
				this.configData.starttime = v.split(" ")[0];
				var newDate = new Date(this.configData.endtime);
				newDate.setDate(newDate.getDate() - 1);
				if(utils.formatDate(newDate, "yyyy-MM-dd") < v || this.configData.endtime < utils.formatDate(new Date(), "yyyy-MM-dd")) {
					this.snackbar_active = true;
					this.snackbar_msg = '活动天数必须大于2天,并且活动结束日期不能小于开始日期和当前日期.';
					this.configData.starttime = o;
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
			}, {
				name: '奖品配置',
				url: '#prize-config-content'
			}, {
				name: '高级配置',
				url: '#advanced-config-content'
			}];
			that.currTabHas = this.configsTabs[0].url;

		}
	}
</script>

<style lang="scss">
	@import '../../../css/bootstrap/_variables.scss';
	@import '../../../css/bootstrap/_mixins.scss';
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
			// .content {
			// 	display: none;
			// 	&:target {
			// 		display: block;
			// 	}
			// }
		}
	}

	.edit-disabled {
		input, 
		label,
		.awards-item {
			pointer-events: none;
		}
	}
</style>