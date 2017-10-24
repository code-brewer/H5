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
		background-color: green;
		.lbarrage-list {
			height: 100%;
			width: 100%;
			list-style: none;
			margin: 0;
			li {
				position: absolute;
				right: 0;
				min-width: 100%;
				white-space: nowrap;
				transform: translateX(100%);
				span {
					color: #fff;
					padding: 10px;
					font-size: 18px;
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
		data() {
				return {
					count: 0,
					list: [],
					animation: {
						animationEnd: '',
						transitionEnd: ''
					},
					height: 100,
					secItem: [4, 5, 6, 7],
					topList: []
				}
			},
			methods: {
				addBarrage(item, top) {
					var that = this;
					var li = document.createElement("li");
					li.setAttribute("id", "i_" + (this.count += 1));
					var span = document.createElement("span");
					var fun = function(e) {
						e.target.removeEventListener(that.animation.animationEnd, fun);
						e.target.remove();
					}
					span.innerHTML = item.info;
					li.appendChild(span);
					li.addEventListener(this.animation.animationEnd, fun)
					this.$els.list.appendChild(li);
					var sec = item.info.length > 8 ? (item.info.length > 15 ? 5 : (10 - (item.info.length - 8) / 2)) : 10;
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
					setInterval(() => {
						if(this.count < this.list.length) {
							top = this.getTop();
							this.addBarrage(this.list[this.count], top);
						}
					}, 300);
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
				this.init();
				this.play();
			},
			created() {

				for(var i = 0; i < 100; i++) {
					var msg = "",
						k = 0
					k = Math.floor(Math.random() * 20);
					for(var p = 0; p < k; p++) {
						msg += "哈";
					}
					this.list.push({
						info: '哈' + msg
					})
				}
				window.hh = this;
			}
	}
</script>