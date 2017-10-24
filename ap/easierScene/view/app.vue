<template>
	<div class="main">
		<main-header></main-header>
		<!--<a @click="closeSocket" style="display: block;height: 50px;width: 80px; background-color: coral;color: white;position: absolute;top: 0;left: 0;">关闭websocket</a>-->
		<div class="router-panel">
			<router-view></router-view>
		</div>
		<div class="barrage-panel" v-show="openDM">
			<barrage :is-open.sync="openDM"></barrage>
		</div>
	</div>
	<loading :show-msg.sync="loadConfig.show" :msg="loadConfig.msg">
	</loading>
	<menu-buttom></menu-buttom>
	<loadding-bar :sec.sync="sec"></loadding-bar>
</template>
<script>
	import loaddingBar from '../component/loadding-bar.vue'
	import menuButtom from '../component/menu-buttom.vue'
	import mainHeader from '../component/header.vue'
	import barrage from '../component/barrage.vue'
	import urls from '../utils/url.js'
	import loading from '../../src/components/web-base/loading.vue'
	import socket from '../utils/websocket.js'
	import {
		router
	} from '../build/index.js'
	import api from '../api/index.js'
	export default {
		data() {
				return {
					gamePlaying: false,
					scroller: {},
					openDM: false,
					sec: 3,
					isFirst: true,
					time: {},
					moid: 0,
					socket: {},
					router: {},
					info: {},
					activity: {
						aid: 0,
						nonum: 0
					},
					messageList: [],
					textMsgList: [],
					imgMsgList: [],
					loadConfig: {
						show: false,
						msg: ''
					},
					index: {
						msg: 0,
						image: 0,
					},
					socketRuning: false,
					connectCount: 40
				}
			},
			methods: {
				closeSocket() {
					this.socket.close();
				},
				initSocket() {
					var that = this;
					this.socket = socket.socket();
					this.socket.onerror = function(event) {
						that.connectCount--;
						that.socketRuning = false;
						console.log('websocket错误');
						if (that.connectCount > 0) {
							that.initSocket();
						}
						
					};
					this.socket.onclose = function(event) {
						that.connectCount--;
						console.log('websocket已关闭');
						if (that.connectCount > 0) {
							that.initSocket();
						}
					}
					this.socket.onmessage = (event) => {
						var data = JSON.parse(event.data);
						console.log(data);
						switch(data.type) {
							case 1:
								var obj = JSON.parse(event.data);
								obj.text = JSON.parse(obj.text);
								this.messageList.push(obj);
								this.textMsgList.push(obj);
								this.$broadcast('newmessage', obj);
								this.$broadcast('textMsg', obj);
								break;
							case 2:
								var obj = JSON.parse(event.data);
								obj.text = JSON.parse(obj.text);
								this.messageList.push(obj);
								this.imgMsgList.push(obj);
								this.$broadcast('imageMsg', obj);
								this.$broadcast('newmessage', obj);
								break;
							case 3:
								if(data.operat == 1)
									this.$broadcast('beigin')
								if(data.operat == 4)
									this.$broadcast('line', data)
								if(data.operat == 5)
									this.$broadcast('wcline', data)
								if(data.operat == 6)
									this.$broadcast('sign', data)
								break;
							case 4:
								this.reconnection(event.data);
								break;

						}
					}
				},
				reconnection(data) {
					var list = JSON.parse(data);
					list = JSON.parse(list.text);
					var i = this.messageList.length - 1,
						arr = [],
						img = [],
						txt = [];
					if(i >= 0) {
						var item = this.messageList[i];
						var flag = false;
						for(var j = 0; j < list.length; j++) {
							var obj = {
								fromName: list[j].uname,
								type: list[j].type,
								fromHeadimg: list[j].headimg,
								text: {
									id: list[j].id,
									messages: list[j].messages
								}
							};
							arr.push(obj);
							if(obj.type == 1) {
								txt.push(obj);
							} else if(obj.type == 2) {
								img.push(obj);
							}
							if(item.text.id == list[j].id) {
								flag = true;
								continue;
							}
							if(flag) {
								this.messageList.push(obj);
								if(obj.type == 1) {
									this.textMsgList.push(obj);
								} else if(obj.type == 2) {
									this.imgMsgList.push(obj);
								}
							}
						}
						if(!flag) {
							this.messageList = this.messageList.concat(arr);
							this.textMsgList = this.textMsgList.concat(txt);
							this.imgMsgList = this.imgMsgList.concat(img);
						}
					} else {
						for(var j = 0; j < list.length; j++) {
							var obj = {
								fromName: list[j].uname,
								type: list[j].type,
								fromHeadimg: list[j].headimg,
								text: {
									id: list[j].id,
									messages: list[j].messages
								}
							};
							arr.push(obj);
							if(obj.type == 1) {
								txt.push(obj);
							} else if(obj.type == 2) {
								img.push(obj);
							}
						}
						this.messageList = this.messageList.concat(arr);
						this.textMsgList = this.textMsgList.concat(txt);
						this.imgMsgList = this.imgMsgList.concat(img);
					}
					this.$broadcast('getFirst');
				},
				close() {
					this.socket.close();
				},
				gameEnd() {
					api.editActivityStauts(this, {
						'aid': this.activity.aid,
						"stauts": "3"
					}, (back) => {})
				},
				selectByMoid() {
					api.selectByMoid(this, {
						'moid': this.moid
					}, (back) => {
						if(back.resCode == "000000") {
							this.info = back.repBody;
							this.$broadcast('setPlugins');
						}
					})
				}
			},
			components: {
				menuButtom,
				mainHeader,
				loaddingBar,
				loading,
				barrage,
			}, ready() {
				this.router = router;
				setTimeout(() => {
					this.isFirst = false;
					this.$broadcast("start");
				}, this.sec * 1000)
				this.initSocket();
			},
			created() {
				if(urls.getArgsFromUrl("moid")) {
					this.moid = ~~urls.getArgsFromUrl("moid");
				}
				this.selectByMoid();
				window.onunload = () => {
					this.close();
					if(this.gamePlaying) {
						this.gameEnd();
					}
				}
			}
	}
</script>
<style lang="scss">
	* {
		font-family: "微软雅黑";
	}
	
	html,
	body {
		height: 100%;
		width: 100%;
		margin: 0;
		overflow: hidden;
		font-family: "微软雅黑";
	}
	
	.main {
		height: 100%;
		width: 100%;
		background-image: url(../image/main-bg.jpg);
		background-position: center;
		background-repeat: no-repeat;
		overflow: hidden;
		padding-bottom: 60px;
		box-sizing: border-box;
		position: relative;
		.barrage-panel {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1002;
			margin-top: -100px;
			padding-top: 100px;
			pointer-events: none;
			box-sizing: border-box;
		}
		.router-panel {
			width: 1230px;
			height: 100%;
			margin: 0 auto;
			padding-top: 80px;
			box-sizing: border-box;
			margin-top: -80px;
			padding-bottom: 20px;
		}
	}
</style>