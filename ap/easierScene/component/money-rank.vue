<template>
	<div class="money-rank">
		<div class="main-panl">
			<div class="next-game" @click="goNext">
				<i></i>
				<p>下一轮</p>
			</div>
			<div class="user" v-for="item in newList" track-by="$index" :class="item.cls" :style="{'transform':'scale('+item.scale+')','top':item.h+'px','left':item.w+'px'}">
				<img :src="item.headimg">
				<div><span>{{$index+1}}</span><span>{{item.uname}}</span></div>
				<p class="price">{{item.score}}金币</p>
			</div>
		</div>
	</div>
</template>
<script>
	import api from '../api/index.js'
	import utils from '../utils/index.js'
	export default {
		data() {
				return {
					newList: [],
					list: [],
					index: 0,
					arr: [0, 1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19],
					wz: [],
					time: {},
					config: {
						w: 0,
						h: 0
					},
					winItem: []
				}
			},
			ready() {
				this.init();
				this.gameEnd();
			},
			beforeDestroy() {
				clearInterval(this.time);
			},
			methods: {
				gameEnd() {
					api.editActivityStauts(this, {
						'aid': this.$root.activity.aid,
						"stauts": "3"
					}, (back) => {
						if(back.resCode == "000000") {
							this.winList();
							this.$root.gamePlaying = false;
						}
					})
				},
				winList() {
					api.winList(this, {
						'aid': this.$root.activity.aid,
						'lv': this.$root.activity.nonum + 1,
						'types': this.$root.activity.type
					}, (back) => {
						if(back.resCode == "000000") {
							this.list = back.repBody;
							this.win();
						}
					})
				},
				goNext() {
					this.$root.router.go({
						name: "money",
						params: {
							id: this.$root.activity.aid
						}
					})
				},
				win() {
					this.time = setInterval(() => {
						if(this.index >= this.list.length) {
							clearInterval(this.time);
							return
						}
						var obj = this.winItem[this.index];
						var cls = this.index == 0 ? "win1" : this.index == 1 ? "win2" : "win3";
						var w = obj.w;
						var h = obj.h;
						obj.w = Math.floor(Math.random() * (w - (obj.w - this.config.w)) + (obj.w - this.config.w))
						obj.h = Math.floor(Math.random() * (h - (obj.h - this.config.h)) + (obj.h - this.config.h))
						obj.cls = cls;
						utils.extend(obj, this.list[this.index], true);
						this.newList.push(obj);
						this.index += 1;
						if(this.index == 3) {
							this.index = 0;
							clearInterval(this.time);
							this.rankElse();
						}
					}, 1500)
				},
				rankElse() {
					this.time = setInterval(() => {
						if(this.index + 2 >= (this.list.length - 1) || this.index == 17) {
							clearInterval(this.time);
							return
						}
						var i = Math.ceil(Math.random() * (this.arr.length - 1));
						var j = 0.5 + Math.ceil(Math.random() * 5) * 0.1;
						var arr_value = this.arr[i],
							obj = this.wz[this.arr[i]];
						obj.cls = "else else" + arr_value;
						var w = obj.w - (100 * j);
						var h = obj.h - (100 * j);
						obj.w = Math.floor(Math.random() * (w - (obj.w - this.config.w)) + (obj.w - this.config.w))
						obj.h = Math.floor(Math.random() * (h - (obj.h - this.config.h)) + (obj.h - this.config.h))
						switch(arr_value) {
							case 5:
								obj.w = 255;
								break;
							case 6:
								obj.w = 250;
								break;
							case 9:
								obj.w = 260;
								obj.h = 400;
								break;
							case 10:
								obj.w = 540;
								break;
							case 14:
								obj.w = 800;
								break;
						}
						obj.scale = j;
						this.index += 1;
						utils.extend(obj, this.list[this.index + 2], true);
						this.newList.push(obj);
						this.arr.splice(i, 1);
					}, 300)
				},
				init() {
					this.config.w = this.$el.offsetWidth / 5;
					this.config.h = this.$el.offsetHeight / 4;
					var obj = {};
					for(var i = 1; i < 6; i++) {
						for(var j = 1; j < 5; j++) {
							obj = {
								w: i * this.config.w,
								h: this.config.h * j
							}
							this.wz.push(obj);
						}
					}
					this.winItem.push(this.wz[8]);
					this.winItem.push(this.wz[7]);
					this.winItem.push(this.wz[13]);
				}
			}
	}
</script>
<style lang="scss">
	.money-rank {
		width: 1230px;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.5);
		margin: 0 auto;
		position: relative;
		text-align: center;
		.main-panl {
			width: 100%;
			height: 100%;
			position: relative;
			.next-game {
				position: absolute;
				right: 15px;
				top: 25px;
				z-index: 5;
				cursor: pointer;
				i {
					display: block;
					height: 56px;
					width: 56px;
					background-image: url(../image/next-game.png);
					background-position: center;
					background-size: 100%;
					background-repeat: no-repeat;
				}
				p {
					font-size: 12px;
					color: white;
					text-align: center;
				}
			}
			.user {
				position: absolute;
				width: 100px;
				opacity: 0;
				img {
					display: block;
					width: 90px;
					height: 90px;
					margin: 0 auto;
					border-radius: 50%;
				}
				div {
					position: relative;
					height: 30px;
					line-height: 30px;
					margin-top: -10px;
					border-radius: 50px;
					text-align: center;
					vertical-align: middle;
					background: white;
					span {
						display: inline-block;
						vertical-align: middle;
						&:first-child {
							width: 20px;
							height: 20px;
							color: white;
							text-align: center;
							line-height: 20px;
							border-radius: 50%;
							font-size: 12px;
							background: red;
						}
						&:last-child{
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							max-width: 60px;
						}
					}
				}
				p {
					width: 60%;
					margin: 0 auto;
					height: 20px;
					line-height: 20px;
					font-size: 12px;
					color: white;
					text-align: center;
					border-radius: 30px;
					background: #ffc33d;
				}
			}
		}
	}
	
	ul,
	li {
		margin: 0;
		padding: 0;
	}
	
	.line {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		li {
			float: left;
			width: 20%;
			height: 25%;
			border: 1px solid white;
			box-sizing: border-box;
			list-style: none;
		}
	}
	
	.else {
		opacity: 1!important;
		transition: all 500s!important;
	}
	
	.win1,
	.win2,
	.win3 {
		&:before {
			content: "";
			position: absolute;
			left: 50%;
			transform: translate(-50%, 0);
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
	}
	
	.win1 {
		opacity: 0;
		top: 70px!important;
		left: 550px!important;
		animation: rankwin1 cubic-bezier(0.55, 0.06, 0.68, 0.19) 1s forwards;
		z-index: 3;
		&:before {
			top: -40px;
			width: 80px;
			height: 52px;
			background-image: url(../image/crown-img1.png);
		}
	}
	
	@keyframes rankwin1 {
		0% {
			opacity: 0;
			transform: scale(0);
		}
		50% {
			opacity: 1;
			transform: scale(2.5);
		}
		100% {
			opacity: 1;
			transform: scale(1.9);
		}
	}
	
	.win2 {
		opacity: 0;
		top: 210px!important;
		left: 400px!important;
		animation: rankwin2 cubic-bezier(0.55, 0.06, 0.68, 0.19) 1s forwards;
		z-index: 3;
		&:before {
			top: -20px;
			width: 50px;
			height: 32px;
			background-image: url(../image/crown-img2.png);
		}
	}
	
	@keyframes rankwin2 {
		0% {
			opacity: 0;
			transform: scale(0);
		}
		50% {
			opacity: 1;
			transform: scale(2.5);
		}
		100% {
			opacity: 1;
			transform: scale(1.7);
		}
	}
	
	.win3 {
		opacity: 0;
		top: 250px!important;
		left: 690px!important;
		animation: rankwin3 cubic-bezier(0.55, 0.06, 0.68, 0.19) 1s forwards;
		z-index: 3;
		&:before {
			top: -20px;
			width: 50px;
			height: 32px;
			background-image: url(../image/crown-img3.png);
		}
	}
	
	@keyframes rankwin3 {
		0% {
			opacity: 0;
			transform: scale(0);
		}
		50% {
			opacity: 1;
			transform: scale(2.5);
		}
		100% {
			opacity: 1;
			transform: scale(1.6);
		}
	}
</style>