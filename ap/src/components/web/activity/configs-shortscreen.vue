<template>
	<div class="ams-configs">
		<nav class="config-tabs">
			<a href="javascript:;"
			   class="tab"
			   :class="{'tab-active': currTabHas == tab.url}"
			   v-for="tab in configsTabs"
			   @click="currTabHas=tab.url">{{tab.name}}</a>
		</nav>
		<div class="config-contents"
		     @click="editConfig">
			<!-- 信息编辑 -->
			<div class="content"
			     v-show="currTabHas==configsTabs[0].url">
				<tabs :header="pageConfig.header"
				      :content="pageConfig.content"
				      :width="100"
				      style="margin-top: -30px;">
					<div slot="basic">
						<div class="label-inline">
							<span class="onse onse-has-red">活动名称：</span>
							<input type="text"
							       class="form-control"
							       v-model="configData.title">
						</div>
						<div class="label-inline">
							<span class="onse onse-has-red"
							      style="align-self:flex-start; margin-top: 10px;">渠道号：</span>
							<app-info-list :appinfos.sync="configData.channel"></app-info-list>
						</div>
						<div class="label-inline"
						     style="padding: 10px 0">
							<span class="onse onse-has-red"
							      style="align-self:flex-start; margin-top: 10px;">页面切换：</span>
							<radio name="switchtype"
							       :model.sync="activityConfig.switchtype"
							       value="heng">横向</radio>
							<radio name="switchtype"
							       :model.sync="activityConfig.switchtype"
							       value="shu"
							       :style="{'margin-left': '10px'}">竖向</radio>
						</div>
						<div style="height: 560px; overflow: auto">
							<table class="table table-bordered table-awards table-middle"
							       style="text-align: center;background: #fff;width: 100%;margin-bottom: 0px;">
								<tbody>
									<tr>
										<td>
											<span>序号</span>
										</td>
										<td>
											<span>背景图片</span>
										</td>
										<td>
											<span>音频文件</span>
										</td>
										<td>
											<span>音频类型</span>
										</td>
										<td>
											<span>搜索</span>
										</td>
										<td>
											<span>操作</span>
										</td>
									</tr>
									<tr v-for="item in shortScreen">
										<td><span>{{$index+1}}</span></td>
										<td>
											<upload-thumb :img-url.sync="item.imgUrl"
											              :config="uploadConfig"></upload-thumb>
										</td>
										<td style="padding-left:0;padding-right:0;">
											<span style="color: red">*</span>版权ID <input type="text" v-model="item.toneId">
											<p>歌曲:{{item.song}}</p>
										</td>
										<td>
											<radio :name="'ring'+$index"
											       :model.sync="item.ringType"
											       value="song"
											       >整曲</radio>
											<radio :name="'ring'+$index"
											       :model.sync="item.ringType"
											       value="ring_tone"
											       :style="{'margin-left': '10px'}">铃声</radio>
										</td>
										<td class="pointer" @click="searchItem($index,item)">搜索</td>
										<td class="pointer" @click="deleteItem($index)">删除</td>
									</tr>
								</tbody>
							</table>
						</div>

						<p>(请保存活动后查看效果)</p>
						<div class="col-md-12 more"
						     @click="addItem">+<span style=" font-size: 20px; vertical-align: middle;">添加图片，总数不能超过15张</span></div>
					</div>
					<div slot="share">
						<div class="label-inline"
						     style="align-items: flex-start;">
							<span class="onse">微信分享：</span>
							<weixin-share :weixin-share.sync="activityConfig.weixinShare"> </weixin-share>
						</div>
					</div>
				</tabs>
			</div>
			<div id="condition"
			     v-bind:class="{'edit-disabled': isOnline}">
			</div>
		</div>
	</div>
	<snackbar :show.sync="snackbar_active"
	          :message="snackbar_msg"
	          action-text="知道了"></snackbar>
	  	<confirm :show.sync="confirmConfig.show"
                 :fun-name="confirmConfig.funName">
            <div slot="content">
                {{confirmConfig.msg}}
            </div>
        </confirm>
	</div>
</template>

<script>
import tabs from '../../web-base/tabs.vue'
import setPrizeDate from '../../web/set-prize-date.vue'
import checkbox from '../../web-base/checkbox'
import radio from '../../web-base/radio'
import snackbar from '../../web-base/snackbar'
import accordion from '../../web-base/accordion'
import buttonRipple from '../../web-base/button-ripple'
import question from '../../web-base/question'
import api from '../../../api/index.js'

import jquery from 'jquery'
import utils from '../../../utils'
import weixinShare from '../../web/weixin-share.vue'
import AppInfoList from '../../web-base/AppInfoList/AppInfoList.vue'
import uploadThumb from '../../web-base/uploadThumb'
import confirm from '../../web/confirm'
export default {
	components: {
		weixinShare,
		checkbox,
		radio,
		snackbar,
		accordion,
		question,
		buttonRipple,
		tabs,
		AppInfoList,
		uploadThumb,
		confirm
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
		var shortScreen=[];
		return {
			pageConfig: {
				header: ["基础信息", "分享配置"],
				content: ["basic", "share"]
			},
			configData,
			configsTabs: [],
			currTabHas: '',
			snackbar_active: false,
			moreConfig: false,
			snackbar_msg: '',
			joinuser: '',
			activityConfig,
			shortScreen,
			currentView: "",
			showQuest: false,
			isMobile: '',
			isOnline: false,
			isPrizeRule: false,
			appinfos: [],
			uploadConfig: {
				width: "100%", // 宽度
				height: "200px",
				onlyFile: true,
				fileSize: 5120000, // 上传文件的大小
				multiple: false, // 是否可以多个文件上传
				dragDrop: false, // 是否可以拖动上传文件
				tailor: true, // 是否可以裁剪图片
				del: true, // 是否可以删除文件
				finishDel: false, // 是否在上传文件完成后删除预览
			},
			currentIndex: 0,
			confirmConfig: {
                show: false,
                msg: '',
                funName: ''
            },
		}
	},
	methods: {
		init() {
			var params = window.getParams();
			this.shortScreen = JSON.parse(JSON.stringify(this.activityConfig.shortScreen));
			if (params.aid) {
				api.selectActivityById(this, {
					aid: params.aid
				}, function (back) {
					if (back.resCode == "0") {
						var configData = back.repBody[0];
						var extb = configData.extbody;
						configData.channel = back.repBody[1]; // 渠道号
						this.isMobile = configData.is_mobile;
						utils.extend(this.configData, configData, true);
						//把默认值删除后push接口拿回数据
						var ss = JSON.parse(extb).shortScreen;
						this.shortScreen.splice(0,this.shortScreen.length);
						for (var i = 0; i < ss.length; i++) {
							this.shortScreen.push(ss[i]);
						}
						this.shortScreen = JSON.parse(extb).shortScreen;
						console.log(this.configData);
						utils.extend(this.activityConfig, eval("(" + extb + ")"), true);
						// this.activityConfig.shortScreen = JSON.parse(extb).shortScreen;
						if (configData.status == "3") { // 活动已上线
							this.$set("isOnline", true)
						}
						if (configData.player) {
							configData.player = configData.player.split(',');
							this.configData.player = configData.player;

						}
						if (configData.isshare == "false") {
							configData.isshare = false;
						} else {
							configData.isshare = true;
						}
						// utils.extend(this.configData, configData, true);

						// this.setPrizeType();

						
						window.store.activityConfig.isUpdate = true;



					}
				}.bind(this));

			} else {
				this.getTemplateInfo()
			}
		},
		addItem() {
			var that = this;
			//添加一个图片
			if (that.shortScreen.length >= 15) {
				// alert('最多只能15张图片哦！');
				this.confirmConfig.msg = "最多只能15张图片哦！";
                this.confirmConfig.funName = "alert";
                this.confirmConfig.show = true;
			} else {
				
				var cartItem = { toneId: '', imgUrl: '', song: '',url: '', ringType: 'ring_tone', musicId:'', musicVipId:''};
			
				that.shortScreen.push(cartItem);
				
				
			}

		},
		deleteItem(index) {
			var that = this;
			if (that.shortScreen.length <= 1) {
				this.confirmConfig.msg = "至少要1张图片哦！";
                this.confirmConfig.funName = "alert";
                this.confirmConfig.show = true;
			} else {
				this.confirmConfig.msg = "确定删除此图片？";
                this.confirmConfig.funName = "del";
                this.confirmConfig.show = true;
                this.currentIndex = index;
				// if (confirm("确定删除此图片？")) {
				// 	that.shortScreen.splice(index, 1);
					
					
				// }
			}
		},
		del(){
			this.shortScreen.splice(this.currentIndex, 1);
		},
		searchItem(index,item){
			var that = this;
			api.getSongUrlByContentId(this, { contentId: item.toneId, type:item.ringType}, (back) => {
				if (back.resCode == '0') {
					if(back.repBody.song_url && back.repBody.song_url != ''){
						that.shortScreen[index].url = 'http://a.10155.com/' + back.repBody.song_url;
						that.shortScreen[index].song = back.repBody.song_name;
						that.shortScreen[index].musicId = back.repBody.song_id;
						that.shortScreen[index].musicVipId = back.repBody.member_song_id;
					
						
					}else{
						that.snackbar_active = true;
						that.snackbar_msg = "歌曲ID无效，请检查!";
						that.shortScreen[index].toneId = '';
						that.shortScreen[index].song = '';
					}
					
				}
			})
		},
		getTemplateInfo() {
			var params = window.getParams()
			if (params.mid) {
				api.selectModelsByMid(this, {
					mid: params.mid
				}, function (back) {
					if (back.resCode == '0') {
						utils.extend(this.configData, back.repBody[0]);
						this.activityConfig.shortScreen = JSON.parse(JSON.stringify(this.shortScreen));
						this.isMobile = back.repBody[0].is_mobile;
					}
				}.bind(this));
			}
		},

		editConfig(event) {
			let $target = jquery(event.target);
			if ($target.hasClass('edit-disabled') || ($target.is('.awards-list, .datepicker, .label-inline') && $target.parents('.edit-disabled').length)) {
				this.snackbar_active = true;
				this.snackbar_msg = "活动上线中，无法修改此选项";
			}
		},
		// getSong() {
		// 	if (this.currentIndex >= this.songList.length) {
		// 		utils.extend(this.activityConfig.shortScreen, this.songList, true);
		// 		var configData = JSON.parse(JSON.stringify(this.configData));
		// 		configData.player = configData.player.join(',');
		// 		configData.isfollow = configData.isfollow.join(',');
		// 		configData.extbody = JSON.stringify(this.activityConfig);
		// 		configData.isshare = configData.isshare.toString();
		// 		api.newAddOrUpdSpActivity(this, configData, (data) => {
		// 			console.log(data)
		// 			this.disabled = false;
		// 			if (data.resCode == "0") {
		// 				this.configData.aid = data.resMsg;
		// 				this.snackbar_active = true;
		// 				this.snackbar_msg = "保存成功!";
		// 				this.$broadcast("changePlayer");
		// 			} else {
		// 				this.snackbar_active = true;
		// 				this.snackbar_msg = data.resMsg;
		// 			}
		// 		});
		// 		return;
		// 	}
		// 	api.getSongUrlByContentId(this, { contentId: this.songList[this.currentIndex].toneId, type:this.songList[this.currentIndex].ringType}, (back) => {
		// 		if (back.resCode == '0') {
		// 			if(back.repBody.song_url && back.repBody.song_url != ''){
		// 				// var has = false;
		// 				// for(var a in back.repBody){
		// 				// 	has = true;
		// 				// 	break;
		// 				// }
		// 				// if(has){

		// 				// }
		// 				this.songList[this.currentIndex].url = 'http://a.10155.com/' + back.repBody.song_url;
		// 				this.songList[this.currentIndex].song = back.repBody.song_name;
		// 				this.songList[this.currentIndex].musicId = back.repBody.song_id;
		// 				this.songList[this.currentIndex].musicVipId = back.repBody.member_song_id;
		// 				this.currentIndex++;
		// 				this.getSong();
		// 			}else{
		// 				this.disabled = false;
		// 				this.snackbar_active = true;
		// 				this.snackbar_msg = "第"+(this.currentIndex+1)+"歌曲ID无效，请检查!";
		// 			}
					
		// 		}
		// 	})

		// }
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
			// this.getSong();
			for(var i = 0, len = this.activityConfig.shortScreen.length; i<len; i++){
				if(this.activityConfig.shortScreen[i].url =='' || this.activityConfig.shortScreen[i].musicId == '' || this.activityConfig.shortScreen[i].musicVipId ==''){
					this.snackbar_active = true;
					this.snackbar_msg = "第"+(i+1)+'首歌曲id无效，请检查';
					this.disabled = false;
					return;
				}else if(this.activityConfig.shortScreen[i].imgUrl == ''){
					this.snackbar_active = true;
					this.snackbar_msg = "第"+(i+1)+'张图片不能为空';
					this.disabled = false;
					return;
				}else if(this.activityConfig.shortScreen[i].toneId == ''){
					this.snackbar_active = true;
					this.snackbar_msg = "第"+(i+1)+'个版权ID不能为空';
					this.disabled = false;
					return;
				}
			}
			var configData = JSON.parse(JSON.stringify(this.configData));
			configData.player = configData.player.join(',');
			configData.isfollow = configData.isfollow.join(',');
			configData.extbody = JSON.stringify(this.activityConfig);
			configData.isshare = configData.isshare.toString();
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
			// this.$broadcast("saveSelectedList");


		});

		this.$on('showSnacker', (resMsg) => {
			this.snackbar_active = true;
			this.snackbar_msg = resMsg;
		})

		this.init();
	},

	watch: {
		shortScreen:{
			handler(old,val){
				console.log(val+"213");
				this.activityConfig.shortScreen=JSON.parse(JSON.stringify(val));
			},
			deep: true
		}
		
	},
	events: {
        sure(funName) {
            if (funName == "del") {
                this.del();
            }
        }
    },
	created() {
		let that = this;
		this.configsTabs = [{
			name: '信息编辑',
			url: '#info-config-content'
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
		width: 100%; // .content {
		// 	display: none;
		// 	&:target {
		// 		display: block;
		// 	}
		// }
		.table-middle {
			td {
				vertical-align: middle;
				width: 18%;
			}
			.pointer{
				cursor: pointer;
			}
		}
		.more {
			font-size: 50px;
		    cursor: pointer;
		}
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