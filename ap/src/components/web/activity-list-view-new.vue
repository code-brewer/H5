<template>
	<!-- 活动列表组件 -->
	<div class="activity-list-view-contaier">
		<!-- 平铺 -->
		<div v-if="viewModel == 'horizontal'"
		     class="activity-list-view-list horizontal">
			<ul>
				<li class='activity-list-view-item'
				    v-for="(index, list) in lists">
					<div class="activity-list-view-item-box">
						<div class="box-top"
						     :style="{'background-image':'url('+list.bgImgUrl+')','background-size': list.position ? '100%' :'100% 100%','background-position-y':list.position ? '-30px':'0', 'background-repeat': 'no-repeat'}">
							<div class="mask"></div>
							<!-- <img class="img" :src="list.url.split(';').length==2?list.url.split(';')[1]:list.url.split(';')[0]"> -->
							<!-- <img class="img" :src="list.bgImgUrl"> -->
						</div>
						<div class="box-bottom">
							<dl>
								<dt class="bottom-title">{{list.title}}</dt>
								<!--<dd class="bottom-text">浏览量（PV）：{{list.pvs}}</dd>
								<dd class="bottom-text">访客量（UV）：{{list.uvs}}</dd>-->
							</dl>
						</div>
						<div class="post-data">
							<div class="post-data-left">
							</div>
							<div class="post-data-right">
								<ul>
									<!--<li class="post-data-item" @click="doAction('share', list)">
																		<i></i>
																		<span>分享</span>
																	</li>-->
									<li class="post-data-item"
									    @click="doAction('status', list)">
										<i></i>
										<span>{{list.status == "3" ? "下线" : "上线"}}</span>
									</li>
									<li class="post-data-item"
									    @click="doAction('del', list),confirmShow=true">
										<i></i>
										<span>删除</span>
									</li>
								</ul>
							</div>
						</div>
						<div class='post-act'>
							<ul>
								<li title="编辑"
								    class="post-act-item"
								    @click="doAction('edit', list)"><i></i></li>
								<li title="复制URL"
								    class="post-act-item"
								    @click="doAction('url', list)"><i></i></li>
								<li title="活动数据"
								    class="post-act-item"
								    v-link="{name:'dataStatistics',params:{aid:list.aid, modaln:list.title, type:list.jspath}}"><i></i></li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<pager :pagenum.sync="selectActivityData.pageNum"
		       :pagesize="selectActivityData.pageSize"
		       :total.sync="selectActivityData.total"></pager>
		<modal :show.sync="urlData.show"
		       class="dia">
			<div class="modal-header">
				<p class="title">复制URL</p>
			</div>
			<div class="modal-body"
			     style="text-align: center;">
				<ul class="activity-url__lists">
					<li class="activity-url__list"
					    v-for="url in urlData.urls"
					    track-by="$index">
						<div class="activity-url">
							<p class="url-text">{{url}}</p>
						</div>
						<div class="activity-tools">
							<a @click="copys"
							   :data-clipboard-text="url"
							   class="copy">复制</a>
							<i class="qrcode-img"
							   @mouseover="toggleQrcode($index, true)"
							   @mouseout="toggleQrcode($index, false)"></i>
						</div>
						<img v-show="qrcodeShow[$index]"
						     track-by="$index"
						     class="code-img"
						     :src="createQrcode(url)"
						     transition="code-img">
					</li>
				</ul>
				<div class="activity-url__tips"><em style="color: red;">{{urlData.errMsg}}</em></div>
				<a class="act-btn"
				   @click="urlData.show = false">关闭</a>
			</div>
		</modal>
		<confirm :show.sync="confirmConfig.show"
		         :fun-name="confirmConfig.funName">
			<div slot="content">
				{{confirmConfig.msg}}
			</div>
		</confirm>
	</div>
</template>

<script>
import Vue from 'vue'
import confirm from '../web/confirm'
import api from './../../api/index.js'
import modal from '../bootstrap/Modal.vue'
import Pager from '../web-base/Pager'
export default {
	components: {
		modal,
		Pager,
		confirm
	},

	props: {
		lists: {
			type: Array,
			default: function () {
				return []
			}
		},
		viewModel: 'horizontal',
		//筛选
		selectedTitle: '',
		selectedType: '',
		selectedStatus: '',
		listChanged: false
	},

	data() {
		return {
			//需要删除的ID
			confirmConfig: {
				show: false,
				delId: 0,
				msg: '您确定要删除该奖品吗?',
				funName: ''
			},
			//查询活动列表
			selectActivityData: {
				endtime: "", //选填 活动结束时间
				pageNum: 1, //选填
				pageSize: 12, //选填
				starttime: "", //选填  活动开始时间
				status: "", //选填  活动状态
				title: "", //选填    活动主题
				types: "", //选填     活动类型
				total: 0,
			},
			updateActivityData: {
				aid: '',
				status: ''
			},
			urlData: {
				show: false,
				urls: [],
				errMsg: ''
			},
			qrcodeShow: []
		}
	},

	ready() {
		this.selectActivityList();
	},

	methods: {
		initCopy(el) {
			var that = this
			require(['../../js/clipboard/dist/clipboard.js'], (Clipboard) => {
				var clip = new Clipboard(el);

				this.urlData.errMsg = "复制完成后将自动关闭对话框";
				clip.on("success", function (event) {
					that.urlData.show = false;
				});
			})
			// require(['../../js/ZeroClipboard/ZeroClipboard.min.js'], (ZeroClipboard) => {
			// 	var clip = new ZeroClipboard(el);

			// 	clip.on("ready", function (readyEvent) {
			// 		that.urlData.errMsg = "复制完成后将自动关闭对话框";
			// 	});

			// 	clip.on("noflash", function (event) {
			// 		that.urlData.errMsg = "您的浏览器没有安装Flash,请手动复制链接";
			// 	});

			// 	clip.on("wrongflash", function (event) {
			// 		that.urlData.errMsg = "您的浏览器Flash版本低于10.0.0,请手动复制链接";
			// 	});

			// 	clip.on("aftercopy", function (event) {
			// 		that.urlData.show = false;
			// 	});
			// })
		},
		copys(e) {
			// if (window.netscape) {
			// 	that.urlData.errMsg = "您的浏览器不支持复制,请手动复制链接";
			// }
		},
		//查询活动列表
		selectActivityList() {
			var that = this;
			api.selectActivityList(this, that.selectActivityData, (back) => {
				if (back.resCode == "0") {
					that.selectActivityData.total = back.repBody.total;
					if (typeof back.repBody.list != "undefined") {
						var arr = [];
						for (var i = 0; i < back.repBody.list.length; i++) {
							back.repBody.list[i].showCodeimg = false;
							back.repBody.list[i].codeImgurl = '';
							if (back.repBody.list[i].jspath != 'shortscreen') {
								back.repBody.list[i].bgImgUrl = JSON.parse(back.repBody.list[i].extbody).bg.imgUrl ? JSON.parse(back.repBody.list[i].extbody).bg.imgUrl : back.repBody.list[i].url.split(';')[0];
								back.repBody.list[i].position = JSON.parse(back.repBody.list[i].extbody).bg.imgUrl ? true : false;
							} else {
								back.repBody.list[i].bgImgUrl = back.repBody.list[i].url.split(';')[0];
							}

							// if(back.repBody.list[i].url.split(';').length==2){
							// 	back.repBody.list[i].url.split(';')[1] = JSON.parse(back.repBody.list[i].extbody).bg.imgUrl;
							// 	console.log("0000000000" +back.repBody.list[i].url.split(';')[1]);
							console.log(back.repBody.list);

							// }else{
							// 	back.repBody.list[i].url.split(';')[0] = JSON.parse(back.repBody.list[i].extbody).bg.imgUrl;
							// }
							arr.push(back.repBody.list[i]);
						}
						that.lists = arr.slice(0, arr.length);
						arr = null;
					} else {
						that.lists = [];
					}
				}
			})
		},

		//更改活动状态
		updateActivityInfo() {
			var that = this;
			console.log(this.updateActivityData);
			api.updateActivityInfo(this, this.updateActivityData, (back) => {
				if (back.resCode == "0") {
					that.listChanged = !that.listChanged;
					that.selectActivityList();
				}
			})
		},

		//展示二维码
		createCode(index, item) {
			if (item.codeImgurl == "") {
				item.codeImgurl = this.createQrcode(item.aid);
			}

			for (var i = 0; i < this.lists.length; i++) {
				if (i == index) {
					this.lists[i].showCodeimg = !this.lists[i].showCodeimg;
				} else {
					this.lists[i].showCodeimg = false;
				}
			}
		},

		//获取活动url
		getActivityUrl(aid, auth, appkey) {
			let basepath = ''
			if (auth === true) {
				if(basePath_2.match(/gsm/)) { // 线上
					basepath = basePath_2.replace('gsm', 'gsu')
				}
				if(basePath_2.match(/apm/)) { // 本地开发环境
					basepath = basePath_2.replace('apm', 'apu')
				}
			} else {
				if(activityPath.match(/gsm/)) {
					basepath = activityPath.replace('gsm', 'gsu')
				}
				if(activityPath.match(/apm/)) { // 本地开发环境
					basepath = activityPath.replace('apm', 'apu')
				}
			}

			if (arguments[2]) {
				return basepath + '?aid=' + aid + '&channle=' + appkey;
			} else {
				// 兼容旧活动，不带渠道号；以后可能完全删除	
				return basepath + '?aid=' + aid
			}
		},
		//生成二维码图片
		createQrcode(url) {
			let formateurl = url.replace(/&/g, '%26')
			// return 'http://qr.liantu.com/api.php?w=320&text=' + url;
			return 'http://qr.topscan.com/api.php?text=' + formateurl
		},
		//干活
		doAction(_name, item) {
			var that = this
			if ("edit" == _name) {
				var pname = window.location.pathname.replace("template", "activity");
				var href = window.location.origin + pname + "?jspath=" + item.jspath + "&aid=" + item.aid + "#!/";
				window.open(href);
			} else if ("url" == _name) {
				if (item.type == "new") {
					// let channels = item.channel.split(';')
					// for (var i = 0; i < channels.length; i++) {
					// 	//复制url					
					// 	// this.urlData.urls.push(this.getActivityUrl(item.aid, channels[i]));
					// }
					let auth = true
					if(item.jspath.match(/^(shortscreen|longscreen)$/)) {
						auth = false
					}
					this.getAppid(item.aid, auth)
				} else {
					// 兼容旧活动，不带渠道号；以后可能完全删除			
					this.urlData.urls.push(this.getActivityUrl(item.aid))
					Vue.nextTick(function () {
						let $copybtns = document.querySelectorAll('.copy')
						for (var i = 0; i < $copybtns.length; i++) {
							that.initCopy($copybtns[i])
						}
					})
				}



				this.urlData.show = true;

			} else if ("data" == _name) {
				//活动数据

			} else if ("share" == _name) {
				//分享

			} else if ("status" == _name) {
				//上/下线
				if (item.status == "3") {
					//上线中
					this.updateActivityData.aid = item.aid;
					this.updateActivityData.status = "4";
					this.updateActivityInfo();

				} else if (item.status == "4" || item.status == "6") {
					//已下线, 未上线
					this.updateActivityData.aid = item.aid;
					this.updateActivityData.status = "3";
					this.updateActivityInfo();

				}

			} else if ("del" == _name) {
				//设置删除信息
				this.confirmConfig.delId = item.aid;
				this.confirmConfig.msg = "您确定要删除该模板吗?";
				this.confirmConfig.funName = "delM";
				this.confirmConfig.show = true;

			}
		},
		//确定删除
		delMFun(aid) {
			//删除
			this.updateActivityData.aid = aid;
			this.updateActivityData.status = "5";
			this.updateActivityInfo();
		},

		// 更改显示二维码
		toggleQrcode(index, state) {

			this.qrcodeShow.$set(index, state)
		},

		// 获取appinfo
		getAppid(aid, auth) {
			var that = this
			api.getAppid(this, { aid: aid }, (back) => {
				if (back.resCode == 0) {
					back.repBody.forEach((appinfo, i) => {
						this.urlData.urls.push(this.getActivityUrl(appinfo.aid, auth, appinfo.appkey))
					})
					Vue.nextTick(function () {
						let $copybtns = document.querySelectorAll('.copy')
						for (var i = 0; i < $copybtns.length; i++) {
							that.initCopy($copybtns[i])
						}
					})
				}
			})
		}
	},
	events: {
		//点击确定执行删除
		sure(funName) {
			if (funName == "delM") {
				this.delMFun(this.confirmConfig.delId);
			}
		}
	},
	watch: {
		selectedTitle(val) {
			this.selectActivityData.title = val;
			this.selectActivityList();
		},

		selectedType(val) {
			this.selectActivityData.types = val;
			this.selectActivityList();
		},

		selectedStatus(val) {
			this.selectActivityData.status = val;
			this.selectActivityList();
		},

		'selectActivityData.pageNum'(val) {
			console.log("val" + val);
			this.selectActivityList();

		},

		'urlData.show'(o, v) {
			if (!o) {
				this.urlData.urls = []
			} else {
				// 初始化
			}
		}
	}
}
</script>

<style lang="scss">
@import '../../css/bootstrap/_variables.scss';
.activity-list-view-contaier {
	width: 100%; // 平铺
	.activity-list-view-list.horizontal {
		font-size: 0;
		>ul {
			padding: 0;
			margin: 0;
			width: 100%;
		}
		.activity-list-view-item {
			display: inline-block;
			margin-bottom: 38px;
			font-size: 12px;
			margin-right: 20px;
			&:nth-child(4n+0) {
				margin-right: 0px;
			}
			.activity-list-view-item-box {
				position: relative;
				width: 100%;
				background: #fff;
				overflow: hidden;
				box-shadow: -2px 0 5px #e7e7e7, 0 2px 5px #e7e7e7, 2px 0 5px #e7e7e7, 0 -2px 5px #e7e7e7;
				.box-top {
					position: relative;
					transition: all .6s ease-in-out;
					.mask {
						position: absolute;
						bottom: 0;
						right: 90%;
						width: calc(100% * 1.7);
						height: 100%;
						transform: skew(-45deg);
						-ms-transform: skew(-45deg);
						-moz-transform: skew(-45deg);
						-webkit-transform: skew(-45deg);
						-o-transform: skew(-45deg);
						background-color: rgba(255, 255, 255, 0.1);
						z-index: 9;
						transition: all .6s ease-in-out;
					}
					.img {
						position: absolute;
						left: 50%;
						top: 0;
						transform: translate(-50%, 0);
						-ms-transform: translate(-50%, 0);
						-webkit-transform: translate(-50%, 0);
						-moz-transform: translate(-50%, 0);
						-o-transform: translate(-50%, 0);
						width: 100%;
						height: 100%; // width: 100%;
						// height: auto;
						clip: rect(0px 294px 203px 0px);
					}
					.code-img {
						position: absolute;
						left: 50%;
						top: 50%;
						width: auto;
						height: 80%;
						max-width: 100%;
						max-height: 100%;
						z-index: 99;
					}
					.code-img-transition {
						opacity: 1;
						transform: translate(-50%, -50%) scale(1);
						-ms-transform: translate(-50%, -50%) scale(1);
						-webkit-transform: translate(-50%, -50%) scale(1);
						-moz-transform: translate(-50%, -50%) scale(1);
						-o-transform: translate(-50%, -50%) scale(1);
						transition: all .5s ease-in-out;
					}
					.code-img-enter,
					.code-img-leave {
						transform: translate(-50%, -50%) scale(0);
						-ms-transform: translate(-50%, -50%) scale(0);
						-webkit-transform: translate(-50%, -50%) scale(0);
						-moz-transform: translate(-50%, -50%) scale(0);
						-o-transform: translate(-50%, -50%) scale(0);
						opacity: 0;
					}
				}
				.box-bottom {
					padding: 20px 5px;
					dl {
						width: 100%;
						margin: 0;
						text-align: center;
					}
				}
				.post-data {
					position: absolute;
					left: 0;
					bottom: -50px;
					display: block;
					width: 100%;
					height: 50px;
					opacity: 0;
					transition: all .3s ease-in-out;
					z-index: 999;
					.post-data-left {
						position: absolute;
						left: 8px;
						top: 50%;
						transform: translate(0, -50%);
						-ms-transform: translate(0, -50%);
						-moz-transform: translate(0, -50%);
						-webkit-transform: translate(0, -50%);
						-o-transform: translate(0, -50%);
						.code-img {
							display: block;
							width: 30px;
							height: 30px;
							background: url(../../assets/activity-list-icon.png) 0 0 no-repeat;
							cursor: pointer;
							&:hover {
								background: url(../../assets/activity-list-icon.png) 0 -31px no-repeat;
							}
							&.selected {
								background: url(../../assets/activity-list-icon.png) 0 -31px no-repeat;
							}
						}
					}
					.post-data-right {
						position: absolute;
						right: 8px;
						top: 50%;
						transform: translate(0, -50%);
						-ms-transform: translate(0, -50%);
						-moz-transform: translate(0, -50%);
						-webkit-transform: translate(0, -50%);
						-o-transform: translate(0, -50%);
						font-size: 0;
						ul {
							padding: 0;
							margin: 0;
						}
						.post-data-item {
							display: inline-block;
							width: 32px;
							height: 32px;
							line-height: 30px;
							font-size: 0;
							vertical-align: middle;
							text-align: center;
							cursor: pointer;
							margin-right: 4px;
							border-radius: 32px;
							border: 1px solid #cccccc;
							transition: all .3s ease-in-out;
							>i {
								display: inline-block;
								vertical-align: middle;
							}
							>span {
								display: inline-block;
								width: auto;
								height: 0;
								font-size: 12px;
								vertical-align: middle;
								overflow: hidden;
								color: #fff;
								transition: height .3s ease-in-out 0.3s;
							}
							/*&:nth-child(1) {
									i {
										width: 18px;
										height: 14px;
										background: url(../../assets/activity-list-icon.png) -31px 0 no-repeat;
									}
									&:hover i {
										background: url(../../assets/activity-list-icon.png) -31px -18px no-repeat;
									}
								}*/
							&:nth-child(1) {
								i {
									width: 12px;
									height: 16px;
									background: url(../../assets/activity-list-icon.png) -60px 0 no-repeat;
								}
								&:hover i {
									background: url(../../assets/activity-list-icon.png) -60px -18px no-repeat;
								}
							}
							/*// &:nth-child(2) i{
								// 	background: url(../../assets/activity-list-icon.png) -93px 0 no-repeat;
								// }*/
							&:nth-child(2) {
								i {
									width: 15px;
									height: 17px;
									background: url(../../assets/activity-list-icon.png) -73px 0 no-repeat;
								}
								&:hover i {
									background: url(../../assets/activity-list-icon.png) -73px -18px no-repeat;
								}
							}
							&:last-child {
								margin-right: 0;
							}
							&:hover {
								width: 70px;
								background-color: #f73666;
								border: 1px solid #f73666;
								span {
									width: auto;
									height: 30px;
									margin-left: 4px;
								}
							}
						}
					}
				}
				.post-act {
					position: absolute;
					top: 10px;
					right: -50px; // width: 50px;
					// height: 172px;
					background-color: rgba(219, 219, 219, 1);
					transition: all .3s ease-in-out;
					z-index: 99;
					ul {
						width: 26px;
						margin: 0 auto; // padding: 0;
					}
					li {
						list-style-type: none;
					}
					.post-act-item {
						position: relative; // width: 26px;
						// height: 56px;
						border-bottom: 2px solid #fff;
						cursor: pointer;
						&:last-child {
							border-bottom: none;
						}
						>i {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
							-ms-transform: translate(-50%, -50%);
							-moz-transform: translate(-50%, -50%);
							-webkit-transform: translate(-50%, -50%);
							-o-transform: translate(-50%, -50%);
						}
						&:nth-child(1) i {
							display: block;
							width: 22px;
							height: 22px;
							background: url(../../assets/activity-list-icon2.png) 0 -22px no-repeat;
						}
						&:nth-child(2) i {
							width: 31px;
							height: 13px;
							background: url(../../assets/activity-list-icon2.png) 0 -45px no-repeat;
						}
						&:nth-child(3) i {
							width: 22px;
							height: 22px;
							background: url(../../assets/activity-list-icon2.png) 0 0 no-repeat;
						}
					}
				}
				&:hover {
					.box-top {
						.mask {
							right: -160%;
						}
					}
					.post-data {
						bottom: 0;
						opacity: 1;
					}
					.post-act {
						right: 10px;
					}
					@media (max-width: $screen-lg-min) {
						.box-top {
							// height:142px;
						}
					}
					@media (min-width: $screen-lg-min) {
						.box-top {
							// height:204px;
						}
					}
				}
			}
			@media (max-width: $screen-lg-min) {
				width: 217.5px;
				.activity-list-view-item-box {
					height: 250px;
				}
				.box-top {
					// height:192px;
					height: 142px;
				}
				.box-bottom {
					.bottom-title {
						font-size: 16px;
						line-height: 25px;
					}
					.bottom-text {
						font-size: 12px;
						line-height: 18px;
					}
				}
				.post-act {
					width: 38px;
					height: 130px;
					ul {
						padding: 0 3px;
					}
					.post-act-item {
						width: 20px;
						height: 43px;
					}
				}
			}
			@media (min-width: $screen-lg-min) {
				width: 292.5px;
				.activity-list-view-item-box {
					height: 330px;
				}
				.box-top {
					// height:254px;
					height: 204px;
				}
				.box-bottom {
					.bottom-title {
						font-size: 16px;
						line-height: 35px;
					}
					.bottom-text {
						font-size: 12px;
						line-height: 20px;
					}
				}
				.post-act {
					width: 50px;
					height: 172px;
					ul {
						padding: 0;
					}
					.post-act-item {
						width: 26px;
						height: 56px;
					}
				}
			}
		}
	} //url
	.dia {
		.title {
			width: 100%;
			text-align: center;
		}
		.url-text {
			width: 100%;
			text-align: center;
		}
		.act-btn {
			display: inline-block;
			width: 70px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			border-radius: 3px;
			border: none;
			color: #fff;
			background-color: $brand-primary;
			cursor: pointer;
			&.copy {
				margin-right: 50px;
			}
		}
	}

	.activity-url__lists,
	.activity-url__tips {
		margin: 0 -10px;
		width: 713px;
		padding: 0;
	}

	.activity-url__tips {
		text-align: left;
	}

	.activity-url__list {
		position: relative;
		list-style: none;
		overflow: visible;
		&::before,
		&::after {
			content: ' ';
			display: block;
			clear: both;
		}

		.code-img {
			position: absolute;
			top: 40px;
			right: 10px;
			width: 120px;
			height: 120px;
			z-index: 100;
		}

		.activity-url {
			float: left;

			p {
				word-break: break-all;
				width: 580px;
				padding-top: 6px;
				padding-bottom: 5px;
				margin-bottom: 0;
				text-align: left;
			}
		}

		.activity-tools {
			margin-left: 600px;

			a {
				display: inline-block;
				float: left;
				line-height: 30px;

				&.copy {
					cursor: pointer;
				}
			}

			.qrcode-img {
				display: inline-block;
				width: 30px;
				height: 30px;
				background: url(../../assets/activity-list-icon.png) 0 0 no-repeat;
				cursor: pointer;
				&:hover {
					background: url(../../assets/activity-list-icon.png) 0 -31px no-repeat;
				}
				&.selected {
					background: url(../../assets/activity-list-icon.png) 0 -31px no-repeat;
				}
			}
		}
	}
}
</style>