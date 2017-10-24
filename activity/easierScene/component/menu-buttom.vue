<template>
	<div class="menu-bottom hide" @mousemove="show=true" @mouseleave="show=false">
		<div class="menu-bottom" v-show="show" transition="menu">
			<ul>
				<li class="dm" :class="{'select':$root.openDM}" @click="$root.openDM=!$root.openDM">
					<span>弹幕</span>
				</li>
				<li class="xx" :class="{'select':selectIndex==0}" @click="goPath('/msg')">
					<span>消息</span>
				</li>
				<li class="tp" :class="{'select':selectIndex==1}" @click="goPath('/img')">
					<span>图片</span>
				</li>
				<li class="qd" :class="{'select':selectIndex==2}" @click="goPath('/sign')">
					<span>签到</span>
				</li>
				<li class="sq" v-show="showConfig.sq.show" :class="{'select':selectIndex==3}" @mouseleave="mouseleave" @mousemove="mousemove(1,$event)">
					<span>数钱</span>
					<i>{{showConfig.sq.num}}</i>
				</li>
				<li class="hb" v-show="showConfig.hb.show" :class="{'select':selectIndex==4}" @mouseleave="mouseleave" @mousemove="mousemove(2,$event)" @click="selectIndex=4">
					<span>红包</span>
					<i>{{showConfig.hb.num}}</i>
				</li>
				<li class="cj" v-show="showConfig.cj.show" :class="{'select':selectIndex==5}" @mouseleave="mouseleave" @mousemove="mousemove(3,$event)" @click="selectIndex=5">
					<span>抽奖</span>
					<i>{{showConfig.cj.num}}</i>
				</li>
				<li class="qp" @click="isOverScreen=!isOverScreen">
					<span>全屏</span>
				</li>
				<div class="show-panel" :style="{'left':left+'px'}" @mousemove="showFun=true" @mouseleave="showFun=false" v-show="showFun">
					<div class="show-fun-view">
						<div class="item" v-for="l in list | filterBy type in 'mid'">
							<p>{{((count=($index+1))*0)+l.aid+'.'+l.title}}</p>
							<span @click.stop="goIn(l.aid)">进入</span>
						</div>
					</div>
				</div>
			</ul>
		</div>
	</div>
</template>
<script>
	import {
		router
	} from '../build/index.js'
	import api from '../api/index.js'
	export default {
		data() {
				return {
					show: false,
					isOverScreen: false,
					selectIndex: 0, //选中下标
					showFun: false,
					left: 0, //显示插件的位置坐标
					type: '', //1:数钱 2:红包 3:抽奖
					list: [],
					showConfig: {
						hb: {
							show: false,
							num: 0
						},
						sq: {
							show: false,
							num: 0
						},
						cj: {
							show: false,
							num: 0
						}
					},
				}
			},
			ready() {

			},
			watch: {
				//全屏刷新高度
				isOverScreen(v) {
					if(v) {
						this.fullScreen();
						this.$root.scroller.refresh()
					} else {
						this.exitFullScreen();
						this.$root.scroller.refresh()
					}
				}
			},
			created() {
				this.pluginsByMoid();
			},
			events: {
				setPlugins() {
					if(this.$root.info.plugins.indexOf(";") != -1) {
						var js = this.$root.info.plugins.substring(0, this.$root.info.plugins.length - 1);
						var item = js.split(";");
						for(var i = 0; i < item.length; i++) {
							var id = item[i].split("_")[1] == "红包" ? "hb" : item[i].split("_")[1] == "数钱" ? "sq" : "cj";
							this.showConfig[id].show = true;
							this.showConfig[id].num = item[i].split("_")[0];
						}
					} else {
						this.showConfig.hb.show = false;
						this.showConfig.sq.show = false;
						this.showConfig.cj.show = false;
					}
				},
			},
			methods: {
				goIn(id) {
					this.selectIndex = 2 + this.type;
					var name = this.type == 1 ? 'money' : this.type == 2 ? 'wechatred' : 'luck'
					this.$root.router.go({
						name: name,
						params: {
							id: id
						}
					})
				},
				mousemove(type,e) {
					this.showFun = true;
					this.type = type;
					this.left = e.target.offsetLeft - 113;
				},
				mouseleave() {
					this.showFun = false;
				},
				//根据moid查出插件
				pluginsByMoid() {
					api.pluginsByMoid(this, {
						'moid': this.$root.moid
					}, (back) => {
						this.list = back.repBody;
					})
				},
				//清空定时器并跳转路由
				goPath(url) {
					if(url.indexOf("msg") != -1)
						this.selectIndex = 0;
					if(url.indexOf("img") != -1)
						this.selectIndex = 1;
					if(url.indexOf("sign") != -1)
						this.selectIndex = 2;
					if(url.indexOf("money") != -1)
						this.selectIndex = 3;
					if(router._currentRoute.path == url) return;
					typeof this.$root.time == "number" ? clearInterval(this.$root.time) : ''
					this.$root.time = {};
					router.go({
						'path': url
					})
				},
				//全屏
				fullScreen() {
					var el = document.documentElement,
						rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
						wscript;

					if(typeof rfs != "undefined" && rfs) {
						rfs.call(el);
						return;
					}

					if(typeof window.ActiveXObject != "undefined") {
						wscript = new ActiveXObject("WScript.Shell");
						if(wscript) {
							wscript.SendKeys("{F11}");
						}
					}
				},
				//退出全屏
				exitFullScreen() {
					var el = document,
						cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
						wscript;

					if(typeof cfs != "undefined" && cfs) {
						cfs.call(el);
						return;
					}

					if(typeof window.ActiveXObject != "undefined") {
						wscript = new ActiveXObject("WScript.Shell");
						if(wscript != null) {
							wscript.SendKeys("{F11}");
						}
					}
				},
			}
	}
</script>
<style lang="scss">
	.menu-bottom.hide {
		background: rgba(0, 0, 0, 0)!important;
		z-index: 9;
		cursor: pointer;
	}
	
	.menu-transition {
		transition: all .3s ease;
	}
	
	.menu-enter,
	.menu-leave {
		height: 0px!important;
	}
	
	.menu-bottom {
		height: 60px;
		width: 100%;
		background-color: white;
		position: absolute;
		bottom: 0;
		.show-panel {
			padding-bottom: 10px;
			position: absolute;
			border-radius: 8px;
			bottom: 100%;
		}
		.show-fun-view {
			width: 226px;
			padding: 20px;
			background-color: white;
			border: 1px solid #b7b7b7;
			border-radius: 8px;
			bottom: 100%;
			position: relative;
			margin-bottom: 20px;
			&:after {
				display: block;
				content: '';
				position: absolute;
				top: 100%;
				left: 50%;
				margin-top: -7px;
				margin-left: -7px;
				height: 14px;
				width: 14px;
				background-color: white;
				border-bottom: 1px solid #b7b7b7;
				border-right: 1px solid #b7b7b7;
				transform: rotate(45deg);
			}
			.item {
				font-size: 12px;
				p {
					width: 154px;
					display: inline-block;
					margin: 5px 0px;
					vertical-align: middle;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				span {
					display: inline-block;
					width: 52px;
					height: 20px;
					background-color: #b4b4b4;
					color: white;
					line-height: 20px;
					text-align: center;
					border-radius: 2px;
					vertical-align: middle;
					cursor: pointer;
					&:hover{
						background-color: #ff3d3d;
					}
				}
			}
		}
		ul {
			list-style: none;
			width: 1230px;
			height: 100%;
			margin: 8px auto;
			padding: 0;
			position: relative;
			.qp {
				background-image: url(../image/icon-item-select.png);
				background-position: -331px 0px;
				width: 43px;
				opacity: 1;
				position: absolute;
				right: 0px;
			}
			li {
				position: relative;
				cursor: pointer;
				width: 32px;
				height: 100%;
				margin-right: 18px;
				display: inline-block;
				background-image: url(../image/icon-item-select.png);
				background-repeat: no-repeat;
				text-align: center;
				line-height: 77px;
				background-size: 370px;
				font-size: 12px;
				opacity: 0.5;
				i {
					position: absolute;
					pointer-events: none;
					height: 12px;
					width: 12px;
					background-color: #e4cc46;
					border-radius: 6px;
					line-height: 12px;
					color: white;
					font-size: 8px;
					font-style: normal;
					text-align: center;
					top: 14px;
					right: -3px;
				}
				span {
					pointer-events: none;
				}
			}
			.select {
				opacity: 1;
			}
			.dm {
				background-position: 0px 0px;
			}
			.xx {
				background-position: -50px 0px;
			}
			.tp {
				background-position: -96px 0px;
			}
			.qd {
				background-position: -144px 0px;
			}
			.sq {
				background-position: -191px 0px;
			}
			.hb {
				background-position: -240px 0px;
			}
			.cj {
				background-position: -288px 0px;
			}
		}
	}
</style>