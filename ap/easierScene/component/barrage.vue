<template>
	<div class="barrage">
		<ul class="lbarrage-list" v-el:list>

		</ul>
	</div>
</template>
<style lang="scss">
	.barrage {
		position: relative;
		width: 100%;
		height: 100%;
		.lbarrage-list {
			height: 100%;
			width: 100%;
			list-style: none;
			margin: 0;
			padding: 0;
			li {
				position: absolute;
				right: 0;
				min-width: 100%;
				white-space: nowrap;
				transform: translateX(100%);
				span {
					color: #fff;
					padding: 10px;
					font-size: 30px;
					white-space: nowrap;
				}
			}
		}
	}
	
	@-webkit-keyframes barrage {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(-100%);
		}
	}
</style>
<script>
	export default {
		props: {
			isOpen: {
				default: false,
				Boolean,
			}
		},
		watch: {
			isOpen(v) { //是否开启
				if(v) {
					if(this.isFirst) {
						this.init();
					}
					this.play();
				} else {
					this.stop();
					this.removeLiEvent();
				}
			}
		},
		data() {
			return {
				count: 0,
				list: [], //弹幕列表
				animation: {
					animationEnd: '',
					transitionEnd: ''
				},
				height: 100,
				topList: [], //最近执行的弹幕位置
				time: {},
				isFirst: true,
			}
		},
		methods: {
			removeLiEvent() {
				var item = this.$els.list.children;
				for(var i = 0; i < item.length; i++) {
					item[i].removeEventListener(this.animation.animationEnd, this.fun);
					item[i].remove();
				}
			},
			fun(e) {
				e.target.removeEventListener(this.animation.animationEnd, this.fun);
				e.target.remove();
			},
			addBarrage(item, top) {
				var that = this;
				var li = document.createElement("li");
				li.setAttribute("id", "i_" + (this.count += 1));
				var span = document.createElement("span");
				span.innerHTML = item.text.messages;
				li.appendChild(span);
				li.addEventListener(this.animation.animationEnd, this.fun)
				this.$els.list.appendChild(li);
				var sec = item.text.messages.length > 8 ? (item.text.messages.length > 15 ? 5 : (10 - (item.text.messages.length - 8) / 2)) : 10;
				var domLi = document.querySelector("#i_" + this.count);
				var arr = [1, 2, 3],
					s = arr[Math.floor(Math.random() * arr.length)];
				domLi.setAttribute("style", "top:" + top + "px;animation: barrage  " + sec + "s linear " + s + "s;");
			},
			init() {
				var body = document.body || document.documentElement,
					style = body.style;
				this.animation.animationEnd = (function() {
					var animEndEventNames = {
						WebkitAnimation: 'webkitAnimationEnd',
						animation: 'animationend'
					}
					for(var name in animEndEventNames) {
						if(typeof style[name] === "string") {
							return animEndEventNames[name]
						}
					}
				})();
				this.animation.transitionEnd = (function() {
					var transEndEventNames = {
						WebkitTransition: 'webkitTransitionEnd',
						MozTransition: 'transitionend',
						OTransition: 'oTransitionEnd otransitionend',
						transition: 'transitionend'
					}
					for(var name in transEndEventNames) {
						if(typeof style[name] === "string") {
							return transEndEventNames[name]
						}
					}
				})();
				this.height = this.$els.list.offsetHeight;
			},
			play() {
				var top = 0,
					sec = 0;
				this.time = setInterval(() => {
					if(this.count < this.list.length) {
						top = this.getTop();
						this.addBarrage(this.list[this.count], top);
					}
				}, 300);
			},
			stop() {
				clearInterval(this.time);
			},
			getFirstList() {
				var list = [];
				for(var i = 0; i < this.$root.textMsgList.length; i++) {
					var obj = this.$root.textMsgList[i];
					obj.am = true;
					list.push(obj);
				}
				this.list = list.reverse();
			},
			getTop() {
				var flag = true,
					top = 0;
				while(flag) {
					var isNew = true;
					top = Math.floor(Math.random() * (this.height - 40));
					for(var i = 0; i < this.topList.length; i++) {
						if(this.topList[i] == ~~((top / this.height) + "").match(/.(\d{1})/)[1]) {
							isNew = false;
						}
					}
					if(isNew) {
						if(this.topList.length < 3) {
							this.topList.push(~~((top / this.height) + "").match(/.(\d{1})/)[1]);
						} else {
							this.topList.shift(0);
							this.topList.push(~~((top / this.height) + "").match(/.(\d{1})/)[1]);
						}
						flag = false;
					}
				}
				return top;

			}
		},
		ready() {
			this.getFirstList();
		},
		events: {
			newmessage(data) {

			},
			getFirst() {
				this.getFirstList();
			},
			textMsg(data) {
				var obj = data;
				obj.am = true;
				this.list.push(obj);
			}
		},
	}
</script>