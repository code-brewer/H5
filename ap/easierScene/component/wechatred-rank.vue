<template>
	<div class="wechatred-rank">
		<div class="main-panl">
			<!--<p class="toall">已抢<span>10000.00元</span>，还剩<span>200.00元</span></p>-->
			<div class="game-over" @click="gameEnd">
				<i></i>
				<p>结束</p>
			</div>
			<div class="user" v-for="item in newList" track-by="$index" :style="{'transform':'scale(1)','top':item.h+'px','left':item.w+'px'}">
				<img :src="item.headimg">
				<div><span>{{item.uname}}</span></div>
				<p class="price">{{item.score}}</p>
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
					time: {},
					config: {
						w: 0,
						h: 0
					},
				}
			},
			ready() {
				this.init();
			},
			beforeDestroy() {
				clearInterval(this.time);
			},
			events:{
				wcline(data) {
					var data = JSON.parse(data.text);
					this.list.push(data[0]);
				}
			},
			methods: {
				gameEnd() {
					api.editActivityStauts(this, {
						'aid': this.$root.activity.aid,
						"stauts": "3"
					}, (back) => {
						if(back.resCode == "000000") {
					 		this.$root.loadConfig.show = true;
							this.$root.loadConfig.msg = "结束成功";
						}
					})
				},
				rankList() {
					api.winList(this, {
						'aid': this.$root.activity.aid,
						'types': this.$root.activity.type
					}, (back) => {
						if(back.resCode == "000000") {
							this.list = this.list.concat(back.repBody);
						}
					})
				},
				rank() {
					this.time = setInterval(() => {
						if(this.list.length <= this.index) {
							return;
						}
						var obj = {};
						obj.w = Math.floor(Math.random() * (this.$el.offsetWidth - 100));
						obj.h = Math.floor(Math.random() * (this.$el.offsetHeight - 200) + 70);
						utils.extend(this.list[this.index], obj, true);
						this.newList.push(this.list[this.index]);
						this.index += 1;
					}, 1000)
				},
				init() {
					this.$root.activity.aid = this.$route.params.id;
					this.rankList();
					this.rank();
				}
			}
	}
</script>
<style lang="scss">
	@keyframes userShow {
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
			transform: scale(1);
		}
	}
	
	.wechatred-rank {
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
			.toall{
				position: absolute;
				height: 64px;
				width: 100%;
				font-size: 36px;
				text-align: center;
				margin: 0;
				padding-top: 26px;
				span{
					color: #ff3939;
				}
			}
			.game-over {
				position: absolute;
				right: 15px;
				top: 25px;
				z-index: 5;
				cursor: pointer;
				i {
					display: block;
					height: 56px;
					width: 56px;
					background-image: url(../image/game-over.png);
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
				animation: userShow cubic-bezier(0.55, 0.06, 0.68, 0.19) 1s forwards;
				position: absolute;
				width: 100px;
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
</style>