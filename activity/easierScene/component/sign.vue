<template>
	<div class="sign">
		<scroll :bottom-height="btnHeight" :scroller.sync="scroller">
			<ul>
				<li v-for="item in items" :class="{'twidth':item.am&&$index==0,'linewidth':$index%10==0}">
					<img :src="item.headimg" v-show="item.show" />
					<p v-show="item.show">{{item.uname}}</p>
				</li>
			</ul>
		</scroll>
		<div class="main-info hidSign" v-show="mainInfo.show">
			<img :src="mainInfo.headimg" />
			<p>{{mainInfo.uname}}</p>
		</div>
	</div>
</template>
<script>
	import scroll from '../src/scroll.vue'
	import api from '../api/index.js'
	export default {
		components: {
			scroll
		},
		data() {
			return {
				btnHeight: '0',
				items: [],
				list: [],
				time: {},
				scrollTime: {},
				mainInfo: {
					show: false,
					headimg: '',
					uname: ''
				},
				scroller: {},
				index: 0
			}
		},
		watch: {
			'mainInfo.show' (v) {
				if(v) {
					setTimeout(() => {
						this.mainInfo.show = false;
					}, 1000)
				}
			},
			'items.length' (v) {
				this.$nextTick(() => {
					this.scroller.refresh();
				});
			}
		},
		events: {
			sign(data) {
				var data = JSON.parse(data.text);
				data = data[0];
				data.am = true;
				data.show = false;
				this.list.push(data);
			}
		},
		ready() {
			this.$broadcast('scroll-reset', 'container');
			this.$root.scroller = this.scroller;
			this.scrollTime = setInterval(() => {
				this.scroller.refresh();
			},1000);
			this.signList();
			this.init();
		},
		beforeDestroy() {
			clearInterval(this.time);
			clearInterval(this.scrollTime);
		},
		methods: {
			signList() {
				api.signList(this, {
					'moid': this.$root.moid
				}, (back) => {
					var list = back.repBody;
					for(var i = 0; i < list.length; i++) {
						list[i].am = true;
						list[i].show = true;
					}
					this.items = list;
				})
			},
			init() {
				this.time = setInterval(() => {
					if(this.index < this.list.length) {
						this.items.unshift(this.list[this.index]);
						this.mainInfo.show = true;
						this.mainInfo.headimg = this.list[this.index].headimg;
						this.mainInfo.nick = this.list[this.index].nick;
						var obj = this.list[this.index];
						this.index += 1;
						this.$nextTick(() => {
							this.scroller.refresh();
							setTimeout(() => {
								obj.show = true;
							}, 1000);
						});
					}
				}, 1500);
			},
		}
	}
</script>
<style lang="scss">
	@-webkit-keyframes hidSign {
		100% {
			width: 80px;
			height: 80px;
			left: 20px;
			top: 20px;
			transform: translate(0, 0);
			font-size: 16px;
		}
	}
	
	@keyframes hidSign {
		100% {
			width: 80px;
			height: 80px;
			left: 20px;
			top: 20px;
			transform: translate(0, 0);
			font-size: 16px;
		}
	}
	
	@-webkit-keyframes twidth {
		0% {
			width: 0px;
		}
		100% {
			width: 80px;
		}
	}
	
	@keyframes twidth {
		0% {
			width: 0px;
		}
		100% {
			width: 80px;
		}
	}
	
	.hidSign {
		animation: 1s hidSign cubic-bezier(0.4, 0, 1, 1);
	}
	
	.twidth {
		animation: 1s twidth;
	}
	
	.linewidth {
		animation: 1s twidth;
	}
	
	.sign {
		width: 965px;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		margin: 0 auto;
		position: relative;
		.main-info {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 300px;
			height: 300px;
			transform: translate(-50%, -50%);
			font-size: 26px;
			z-index: 1;
			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
			p {
				overflow: hidden;
				height: 30px;
				margin: 0;
				margin-top: 10px;
				text-align: center;
			}
		}
		ul {
			margin: 22px;
			list-style: none;
			padding: 10px;
			font-size: 0;
			li {
				vertical-align: top;
				height: 120px;
				width: 80px;
				transition: 1s all initial;
				display: inline-block;
				text-align: center;
				margin-right: 10px;
				font-size: 16px;
				img {
					border-radius: 40px;
					height: 80px;
					width: 80px;
				}
				p {
					overflow: hidden;
					height: 25px;
					margin: 0;
					text-align: center;
					margin-top: 10px;
				}
			}
		}
	}
</style>