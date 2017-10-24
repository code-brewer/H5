z`
<template>
	<div class="activity-list">
		<a href="main.jsp" target="_blank" v-el:a style="display:none"></a>
		<modal :show.sync="showImpUser" size="md">
			<div class="modal-user-body">
				<div class="modal-title">
					<button type="button" class="close" @click="showImpUser=false"><span aria-hidden="true">&times;</span></button>
				</div>
			</div>
			<div class="modal-user-box">

				<div class="from-info">
					<label>选择文件：</label>
					<div class="fileUrl" @click="openFile">{{fileUrl}}</div>
					<file-upload :name="'file'" action="cms/motive/importUser" :auto="false" :form="addFileData" :uploadctrol.sync="uploadCtrol" class="upload-btn"></file-upload>
					<input type="text" hidden="hidden" v-model="addFileData.proNo" />
					<input type="text" hidden="hidden" v-model="addFileData.moid" />
				</div>
				<a class="submit" @click="uploadCtrol=true">上传</a>
				<a class="download-msg" href="http://img.easier.cn/fsd/wm/template/template.xlsx">下载示例表</a>
			</div>
		</modal>
		<qrcode :moid="moid" :show.sync="showQrcord"></qrcode>
		<div class="scroll-view">
			<scroll :bottom-height="btnHeight" :scroller.sync="scroller">
				<ul class="main-scroll">
					<li v-for="item in list" @mousemove="item.showDel=true" @mouseleave="item.showDel=false">
						<div class="left">
							<p class="name">
								<span v-show="!item.showEdit">{{item.tiltle}}</span>
								<input v-show="item.showEdit" type="text" class="form-control" v-model="item.tiltle" />
								<i @click="item.showEdit=true" v-show="!item.showEdit"></i>
								<button-ripple @click="saveActivity(item)" v-show="item.showEdit" color="button-danger" style="height: 24px;line-height: 24px;font-size: 12px;width: 80px;">保存</button-ripple>
							</p>
							<div class="bottom">
								<a class="user-list">签到人数<span>{{item.signnum}}</span></a>
								<a class="msg-list">上墙消息<span>{{item.newsnum}}</span></a>
							</div>
						</div>
						<div class="right">
							<div class="qrcode" @click="showQrcode(item.moid)">
								上墙二维码
							</div>

							<div class="imp-user" @click="openFileExc(item.moid)">
								导入用户
							</div>
							<div class="big-screen" @click="open(item.moid)">
								<a>
									进入大屏幕
								</a>
							</div>
							<div class="data-view">
								数据统计
							</div>
						</div>
						<more-fun v-if="item.showMore" transition="morefun" :item.sync="item">
						</more-fun>
						<div class="more-edit" @click="refreshHeight(item,$index)" :class="{'moreeditgo':item.showMore,'moreeditback':!item.showMore}">
							<p>活动功能</p>
						</div>
						<div class="deleted-acivity" transition="delActivity" v-show="item.showDel">
							<p>删除</p>
						</div>
					</li>
				</ul>
			</scroll>
		</div>
	</div>
</template>
<script>
	import moreFun from './more-fun.vue'
	import scroll from '../src/scroll.vue'
	import api from '../api/index.js'
	import qrcode from './qrcode.vue'
	import modal from '../../src/components/bootstrap/Modal'
	import buttonRipple from '../../src/components/web-base/button-ripple.vue'
	import fileUpload from '../../src/js/vue.file-upload.vue'
	export default {
		methods: {
			openFileExc(moid) {
				this.fileUrl = "";
				this.addFileData.moid = moid;
				this.showImpUser = true;

			},
			openFile() {
				this.$broadcast("click", 'file');
			},
			fileName() {
				this.fileUrl = this.$els.file.value;
			},
			//选中活动进入大屏幕
			open(id) {
				var url = this.$els.a.href;
				this.$els.a.href = url.indexOf("?") != -1 ? url.split("?")[0] + "?moid=" + id : url + "?moid=" + id
				api.enterBigScreen(this, {
					'moid': id
				}, (back) => {
					if(back.resCode = "000000") {
						this.$els.a.click();
					}
				})
			},
			//显示二维码
			showQrcode(moid) {
				this.showQrcord = true,
					this.moid = moid;
			},
			//保存主题内容
			saveActivity(item) {
				if(item.tiltle.length > 10) {
					this.$root.loadConfig.show = true;
					this.$root.loadConfig.msg = "主题名称不能超过10个字";
					return;
				}
				api.addOrEdit(this, {
					'moid': item.moid,
					'tiltle': item.tiltle
				}, (back) => {
					if(back.resCode == "000000") {
						item.showEdit = false;
					}
				})
			},
			//显示关闭更多功能跟刷新iscroll高度
			refreshHeight(item, i) {
				this.list[i].showMore = !item.showMore;
				setTimeout(() => {
					this.scroller.refresh();
				}, 400)
			},
			//获取主题列表
			listByAcct() {
				api.listByAcct(this, {}, (back) => {
					if(back.resCode == "000000") {
						var list = back.repBody;
						for(var i = 0; i < list.length; i++) {
							list[i].showMore = false;
							list[i].showEdit = false;
							list[i].showDel = false;
						}
						this.list = list;
						setTimeout(() => {
							this.scroller.refresh();
						}, 400)
					}
				})
			}
		},
		events: {
			//定义刷新主题参数
			refreshActivity() {
				this.listByAcct();
			},
			onFileChange(files) {
				this.fileUrl = files[0].name;
			},
			onFileUpload(files, res) {
				if(res.resCode == "000000") {
					this.$root.loadConfig.show = true;
					this.$root.loadConfig.msg = "上传成功";
					this.showImpUser = false;
				}
			},
			onFileError(files, res) {
				this.$root.loadConfig.show = true;
				this.$root.loadConfig.msg = "上传失败";
			}
		},
		components: {
			scroll,
			moreFun,
			buttonRipple,
			modal,
			fileUpload,
			qrcode
		},
		data() {
			return {
				uploadCtrol: false,
				addFileData: {
					moid: 0,
					reqTime: '',
					proNo: "20015"
				},
				btnHeight: '0',
				scroller: {},
				fileMoid: 0,
				moid: 0,
				showImpUser: false,
				fileUrl: "",
				showQrcord: false, //是否显示二维码
				qrcode: 'image/icon-qrcode.png', //二维码图片
				list: [{
					showMore: false,
					showDel: false,
				}]
			}
		},
		ready() {
			window.swaq = this;
			this.listByAcct();
		}
	}
</script>
<style lang="scss">
	.activity-list {
		.upload-btn {
			display: none;
		}
		.modal-dialog {
			width: 450px;
			border-radius: 5px;
			.modal-content {
				border-radius: 7px;
				.modal-user-body {
					position: relative;
					.modal-title {
						border-radius: 5px 5px 0px 0px;
						height: 40px;
						background-color: #419ce9;
						text-align: center;
						p {
							color: #fff;
							line-height: 40px;
						}
						button {
							margin: 10px 10px 0px 0px;
							color: #fff;
							opacity: .9;
						}
					}
				}
				.modal-user-box {
					height: 250px;
					width: 100%;
					background-color: white;
					border-radius: 0px 0px 5px 5px;
					text-align: center;
					.download-msg {
						display: block;
						cursor: pointer;
						width: initial;
						text-align: center;
						color: #0043bd;
						text-decoration: underline;
						margin: 20px auto 0px auto;
					}
					.submit {
						display: block;
						cursor: pointer;
						width: 90px;
						height: 30px;
						background-color: #419ce9;
						color: white;
						text-align: center;
						margin: 50px auto 0px auto;
						line-height: 30px;
						text-decoration: none;
					}
					.from-info {
						padding-top: 70px;
						text-align: center;
						position: relative;
						label {
							display: inline-block;
							line-height: 33px;
							vertical-align: top;
						}
						.fileUrl {
							height: 33px;
							border: 1px solid #d6d6d6;
							cursor: pointer;
							background-color: white;
							display: inline-block;
							width: 300px;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							padding: 0px 40px 0px 10px;
							line-height: 30px;
							text-align: left;
						}
						&::after {
							cursor: pointer;
							position: absolute;
							display: block;
							content: '';
							right: 40px;
							top: 75px;
							background: url(../image/file.png) no-repeat;
							width: 30px;
							height: 24px;
							pointer-events: none;
						}
					}
				}
			}
		}
	}
	
	.delActivity-transition {
		transition: all .3s ease;
		overflow: hidden;
		width: 48px
	}
	
	.delActivity-enter,
	.delActivity-leave {
		width: 0!important;
	}
	
	.morefun-transition {
		transition: all .3s ease;
		height: 445px!important;
		overflow: hidden;
	}
	
	.morefun-enter,
	.morefun-leave {
		height: 0!important;
	}
	
	.moreeditgo {
		top: 268px!important;
		&:after {
			transform: rotate(180deg);
			bottom: 7px!important;
		}
		&:before {
			transform: rotate(180deg);
			bottom: 14px!important;
		}
	}
	
	.moreeditback {
		top: 24px!important;
		&:after,
		&:before {
			transform: rotate(0deg);
		}
	}
	
	.activity-list {
		width: 100%;
		height: 100%;
		position: relative;
		.scroll-view {
			width: 100%;
			height: 100%;
			position: relative;
			.wrapper {
				overflow: inherit;
			}
			.main-scroll {
				width: 1152px;
				padding: 0px 100px;
				margin: 0 auto;
				li {
					position: relative;
					margin-bottom: 20px;
					font-size: 0;
					&:first-child {
						margin-top: 20px;
					}
					.deleted-acivity {
						cursor: pointer;
						font-size: 16px;
						width: 48px;
						height: 130px;
						border-radius: 0px 5px 5px 0px;
						position: absolute;
						background-color: rgba(0, 0, 0, 0.2);
						left: 948px;
						color: white;
						top: 24px;
						font-family: 'Glyphicons Halflings';
						font-style: normal;
						font-weight: normal;
						transition: all 0.3s;
						-webkit-font-smoothing: antialiased;
						p {
							width: 16px;
							height: 30px;
							line-height: 3;
							margin: 10px auto;
						}
					}
					.more-edit {
						cursor: pointer;
						font-size: 16px;
						width: 48px;
						height: 130px;
						border-radius: 5px 0px 0px 5px;
						position: absolute;
						background-color: rgba(0, 0, 0, 0.2);
						left: -48px;
						color: white;
						top: 24px;
						font-family: 'Glyphicons Halflings';
						font-style: normal;
						font-weight: normal;
						transition: all 0.3s;
						-webkit-font-smoothing: antialiased;
						p {
							width: 10px;
							height: 30px;
							line-height: 1.3;
							margin: 10px auto;
						}
						&:after,
						&:before {
							content: "\E259";
							position: absolute;
							display: inline-block;
							width: 16px;
							height: 16px;
							color: #fff;
							bottom: 25px;
							left: 19px;
							transition: all 0.3s;
						}
						&:after {
							bottom: 19px;
						}
					}
					.left {
						font-size: 12px;
						position: relative;
						display: inline-block;
						vertical-align: top;
						width: 757px;
						height: 190px;
						border-radius: 10px 0px 0px 10px;
						background-size: 100%;
						background: url(../image/activity-bg.png) no-repeat;
						background: -webkit-linear-gradient(left, #419ce9, #3981be);
						background: -o-linear-gradient(left, #419ce9, #3981be);
						background: -moz-linear-gradient(left, #419ce9, #3981be);
						background: linear-gradient(left, #419ce9, #3981be);
						.name {
							font-size: 24px;
							color: white;
							padding: 25px;
							input {
								display: inline-block;
								width: 150px;
								background-color: rgba(0, 0, 0, 0);
								border: 0px;
								border-bottom: 1px solid #ccc;
								color: white;
								vertical-align: text-bottom;
							}
							i {
								height: 21px;
								width: 18px;
								cursor: pointer;
								display: inline-block;
								margin-left: 5px;
								background: url(../image/icon-edit.png);
								background-repeat: no-repeat;
							}
						}
						.bottom {
							position: absolute;
							bottom: 13px;
							left: 25px;
							.msg-list {
								&:after {
									display: block;
									content: '';
									height: 15px;
									width: 22px;
									background: url(../image/icon-msg.png);
									position: absolute;
									background-repeat: no-repeat;
									top: 13px;
									left: -16px;
								}
							}
							.user-list {
								margin-left: 25px;
								&:after {
									display: block;
									content: '';
									height: 15px;
									width: 22px;
									position: absolute;
									top: 13px;
									left: -25px;
									background: url(../image/icon-userList.png);
									background-repeat: no-repeat;
								}
							}
							a {
								display: inline-block;
								position: relative;
								color: #92e7ff;
								text-decoration: none;
								cursor: pointer;
								font-size: 12px;
								margin-right: 46px;
								&:hover {
									color: #92e7ff;
									text-decoration: none;
								}
								span {
									font-size: 24px;
									color: white;
									margin-left: 10px;
								}
							}
						}
					}
					.right {
						font-size: 12px;
						width: 191px;
						height: 190px;
						display: inline-block;
						border-radius: 0px 10px 10px 0px;
						background-color: #fff;
						font-size: 0;
						padding: 0px 5px;
						.qrcode {
							&:after {
								background: url(../image/icon-qrcode.png);
								background-repeat: no-repeat;
							}
						}
						div {
							display: inline-block;
							cursor: pointer;
							height: 50%;
							width: 50%;
							position: relative;
							box-sizing: border-box;
							font-size: 12px;
							line-height: 12;
							text-align: center;
							a {
								text-decoration: none;
								display: block;
								width: 100%;
								height: 100%;
								color: #000000;
							}
							&:after {
								position: absolute;
								display: block;
								content: '';
								height: 44px;
								width: 46px;
								left: 50%;
								top: 15px;
								transform: translate(-50%);
							}
						}
						.big-screen {
							&:after {
								background: url(../image/screen.png);
								background-repeat: no-repeat;
							}
						}
						.imp-user {
							&:after {
								background: url(../image/imp-user.png);
								background-repeat: no-repeat;
							}
						}
						.data-view {
							&:after {
								background: url(../image/data-view.png);
								background-repeat: no-repeat;
							}
						}
					}
				}
			}
		}
	}
</style>