<template>
	<div class="msg">
		<div class="show_big_img" v-show="showBigImgFlg" transition="show_big_img" @click="showBigImgFlg=false">
			<img :src="bigImgUrl" alt="" />
		</div>
		<scroll :bottom-height="btnHeight" :scroller.sync="scroller">
			<ul style="position: absolute;bottom: 0;width: 100%;height: auto;">
				<li v-for="item in items" track-by="$index" :class="{'fadeIn':item.am}">
					<div class="left">
						<img :src="item.fromHeadimg" alt="" />
						<div class="name">
							{{item.fromName}}
						</div>
					</div>
					<div class="right">
						<div class="content" v-if="item.type==1">
							{{{item.text.messages}}}
						</div>
						<div class="content-img" v-if="item.type==2">
							<img :src="filedownlodaurl+item.text.messages" v-if="item.type==2" alt="" @click="showBigImg(filedownlodaurl+item.text.messages)" />
						</div>
					</div>
				</li>
			</ul>
			<ul class="hide-ul">
				<li v-for="item in items" track-by="$index"></li>
			</ul>
		</scroll>
	</div>
</template>

<script>
	import scroll from '../src/scroll.vue'
	export default {
		components: {
			scroll
		},
		data() {
			return {
				btnHeight: '0',
				items: [],
				list: [],
				scroller: {},
				filedownlodaurl: '',
				time: {},
				bigImgUrl: '#',
				showBigImgFlg: false
			}
		},
		ready() {
			this.filedownlodaurl = filedownlodaurl;
			this.$broadcast('scroll-reset', 'container');
			this.$root.scroller = this.scroller;
		},
		created() {
			window.ssss = this;
			if(!this.$root.isFirst) {
				this.init();
				this.getFirstList();
			}
		},
		events: {
			start() {
				this.init();
			},
			getFirst() {
				this.getFirstList();
			},
			newmessage(data) {
				var obj = data;
				obj.am = true;
				this.list.push(obj);
			}
		},
		watch: {
			'items.length' () {
				this.$nextTick(() => {
					this.scroller.refresh();
				})
			}
		},
		beforeDestroy() {
			clearInterval(this.time);
		},
		methods: {
			//显示大图
			showBigImg(url) {
				this.showBigImgFlg = true;
				this.bigImgUrl = url;
			},
			//获取首次列表消息
			getFirstList() {
				var list = [];
				if(this.$root.index.msg <= 0) {
					this.items = JSON.parse(JSON.stringify(this.$root.messageList));
					this.list = JSON.parse(JSON.stringify(this.$root.messageList));
					this.$root.index.msg = this.items.length;
				} else {
					for(var i = 0; i < this.$root.messageList.length; i++) {
						var obj = this.$root.messageList[i];
						obj.am = true;
						if(this.$root.index.msg > i) {
							this.items.push(obj);
						}
						list.push(obj);
					}
					this.list = list;
				}
				this.$nextTick(() => {
					this.goBottom();
				});
			},
			//iscroll移动到最下
			goBottom() {
				if(this.items.length == 0) return;
				var el = document.querySelector('.scroller li:nth-child(' + (this.items.length) + ')');
				setTimeout(() => {
					this.scroller.scrollToElement(el, 600, null, null);
				}, 100)
			},
			init() {
				this.time = setInterval(() => {
					if(this.$root.index.msg < this.list.length) {
						this.items.push(this.list[this.$root.index.msg]);
						this.$root.index.msg += 1;
						this.$nextTick(() => {
							this.goBottom();
						});
					}
				}, 2000);
			},
		}
	}
</script>

<style lang="scss">
	.show_big_img {
		position: relative;
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		background-color: rgba(0, 0, 0, .7);
		img {
			position: absolute;
			left: 50%;
			top: 50%;
			height: 80%;
			width: auto;
			transform: translate(-50%, -50%);
		}
	}
	
	.show_big_img-transition {
		transition: all .3s ease;
	}
	/* .expand-enter 定义进入的开始状态 */
	/* .expand-leave 定义离开的结束状态 */
	
	.show_big_img-enter,
	.show_big_img-leave {
		opacity: 0;
	}
	
	.msg {
		position: relative;
		height: 100%;
		width: 100%;
		.hide-ul li {
			width: 965px;
			height: 177px;
			margin: 30px auto 30px auto;
			background: none;
		}
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			height: 100%;
			li {
				&:last-child {
					margin-bottom: 30px;
				}
				margin: 30px auto 30px auto;
				width: 965px;
				height: 177px;
				text-align: center;
				border-radius: 0px 80px 0px 80px;
				/*line-height: 50px;*/
				background-color: rgba(255, 255, 255, 0.5);
				.left {
					display: inline-block;
					width: 170px;
					height: 100%;
					text-align: center;
					img {
						margin-top: 20px;
						border-radius: 50%;
						height: 102px;
						width: 102px;
					}
					.name {
						margin-top: 15px;
						font-size: 18px;
					}
				}
				.right {
					width: 744px;
					display: inline-block;
					height: 100%;
					vertical-align: top;
					text-align: left;
					height: 177px;
					position: relative;
					.content {
						font-size: 40px;
						position: absolute;
						width: 744px;
						word-break: break-all;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						top: 50%;
						transform: translateY(-50%);
					}
					.content-img {
						img {
							cursor: pointer;
							height: 138px;
							position: absolute;
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}
			}
		}
		.scroller {
			min-height: 100%;
		}
		.btn {
			height: 48px;
			position: absolute;
			left: 0;
			width: 100%;
			bottom: 0;
			background: green;
			border: none;
		}
	}
	
	@-webkit-keyframes fadeIn {
		0% {
			height: 0px;
			/*width: 0%;*/
		}
		100% {
			height: 177px;
			/*width: 100%;*/
		}
	}
	
	@keyframes fadeIn {
		0% {
			height: 0px;
			/*width: 0%;*/
		}
		100% {
			height: 177px;
			/*width: 100%;*/
		}
	}
	
	.fadeIn {
		animation: .5s fadeIn;
	}
	
	.fadeInt {
		animation: .5s fadeIn;
	}
</style>