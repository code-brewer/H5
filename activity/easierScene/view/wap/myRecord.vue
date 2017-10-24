<template>
	<div class="record">
		<a href="javascript:;" class="back-chat" v-link="{path: '/'}">返回聊天</a>
		<img src="../../image/wap/record-img1.png" class="title">
		<div class="list" v-el:scroll>
			<scroll :bottom-height="btnHeight" :scroller.sync="scroller" v-ref:scroll>
				<ul>
					<li v-for="item in list">
						<div class="date">
							<p>{{item.date}}</p>
							<p>{{item.time}}</p>
						</div>
						<div class="text">
							<p :class="{one: !item.score}">{{item.text}}</p>
							<p v-if="item.rn">{{item.rn}}</p>
							<p v-if="item.score" :class="{two: item.types === '抽奖'}">{{item.score}}</p>
						</div>
					</li>
				</ul>
				<div class="line"></div>
			</scroll>
		</div>
	</div>
</template>
<script>
	import api from '../../api/wapIndex.js'
	import scroll from '../../src/scroll.vue'
	export default {
		components: {
            scroll
        },
		data() {
			return {
				btnHeight: '0',
                scroller: {},
				list: []
			}
		},
		created() {
			this.getMyRecord();
		},
		ready() {
			this.$els.scroll.addEventListener('touchmove', function(e){
                e.preventDefault();
            }, false);
		},
		methods: {
			format(str) {
				return (str + '').length < 2 ? '0' + str : str;
			},
			/**
			 *  格式化时间
			 */
			formatTime(obj) {
				var date = new Date(obj.ctime);
				obj.date = (date.getMonth() + 1) + '.' + date.getDate();
	            obj.time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			},
			getMyRecord() {
				this.list = [];
				api.getMyRecord(this, {}, back => {
					if (back.resCode === '000000') {
						var signs = back.repBody.sign,
						    prizes = back.repBody.PrizeUser;
						this.formatTime(signs);
						signs.text = '参与签到';

						this.list.push(signs);

						prizes.forEach(item => {
							this.formatTime(item);
							if (item.types === '数钱') {
								item.text = item.title + '第' + (+item.lv + 1) + '轮';
								item.score !== '' && (item.score += '分');
								item.rn = '第' + item.rank + '名';
							} else if (item.types === '红包') {
								item.text = item.title + '的红包';
								item.score !== '' && (item.score += '元');
								item.rn = '第' + item.rank + '名';
							} else if (item.types === '抽奖') {
								item.text = '抽奖';
								item.score = item.title;
							}

							this.list.push(item);
						});
						this.$nextTick(() => {
							this.scroller.refresh();
						});
	                } else {
	                    this.$dispatch('showTip', back.resMsg, back.resCode);
	                }
				})
			}
		}
	}
</script>
<style lang="scss">
	.record {
		height: 100%;
		padding-top: 250px;
		background: url(../../image/wap/bg3.jpg) no-repeat;
		background-size: cover;
		box-sizing: border-box;
		.title {
			display: block;
			margin: 0 auto 50px;
			margin-top: -140px;
		}
		.list {
			position: relative;
			height: 100%;
			overflow: hidden;
			ul {
				width: 85%;
				margin: 0 auto 40px;
				box-sizing: border-box;
			}
			.line {
				position: absolute;
				top: 0;
				left: 100px;
				width: 2px;
				height: 120%;
				background: #18d7f4;
			}
			li {
				position: relative;
				margin-bottom: 20px;
				padding-left: 120px;
			}
			.date {
				position: absolute;
				top: 0;
				left: 0;
				width: 97px;
				height: 97px;
				border-radius: 50%;
				border: 3px solid #18d7f4;
				background: #0f9cc9;
				z-index: 2;
				p {
					color: white;
					text-align: center;
					&:first-child {
						padding-top: 15px;
						font-size: 28px;
						font-weight: 700;
					}
					&:last-child {
						font-size: 20px;
					}
				}
			}
			.text {
				display: table;
				width: 100%;
				height: 100px;
				font-size: 24px;
				color: white;
				border: 1px solid white;
				border-radius: 50px;
				background: rgba(255, 255, 255, .5);
				p {
					display: table-cell;
					color: white;
					padding: 0 5px;
					vertical-align: middle;
					&:nth-child(2) {
						width: 112px;
					}
					&:nth-child(2),&:last-child {
						text-align: center;
						border-left: 1px dashed white;
					}
					&:first-child {
						width: 190px;
						text-align: center;
						border: 0;
					}
					&.one {
						width: 100%;
						text-align: center;
						padding: 0;
					}
					&.two {
						width: 211px;
					}
				}
			}
		}
	}
</style>