<template>
	<div class="ranking">
		<a href="javascript:;" class="back-chat" v-link="{path: '/'}">返回聊天</a>
		<a href="javascript:;" class="back-chat" style="left: inherit; right: 20px;" v-link="{path: '/weChatRed'}">下一轮</a>
		<img src="../../../image/wap/ranking-list-img1.png">
		<div class="list">
			<div class="t clearfix">
				<div>排名</div>
				<div>用户</div>
				<div>金额</div>
			</div>
			<div class="scroll" v-show="isHas">
				<scroll :bottom-height="btnHeight" :scroller.sync="scroller">
					<ul class="own clearfix" v-show="own.rank">
						<li>
							<div>{{own.rank}}</div>
							<div class="user">
								<img :src="own.headimg">
								<p>{{own.nick}}</p>
							</div>
							<div class="price">¥{{own.price}}</div>
						</li>
					</ul>
					<ul class="clearfix">
						<li v-for="item in list">
							<div :class="[['first', 'second', 'third'][$index]]">{{item.rank}}</div>
							<div class="user">
								<img :src="item.headimg">
								<p>{{item.nick}}</p>
							</div>
							<div class="price">¥{{item.price}}</div>
						</li>
					</ul>
				</scroll>
			</div>
			
		</div>
	</div>
</template>
<script>
	import scroll from '../../../src/scroll.vue'
	import api from '../../../api/wapIndex.js'
	export default {
		components: {
			scroll
		},
		data() {
			return {
				btnHeight: '0',
				scroller: {},
				isHas: false,
				own: {},
				list: []
			}
		},
		ready() {
			document.querySelector('.scroll').addEventListener('touchmove', e => { e.preventDefault(); }, false);
			this.getRankList();
		},
		methods: {
			getRankList() {
				this.list = [];
				this.own = {};
                api.getRankList(this, {
                    aid: this.$route.params.aid,
                    lv: 1,
                    size: '1000',
                    types: '红包'
                }, back => {
                    if (back.resCode === '000000') {
                    	if (back.repBody && back.repBody.length < 1) {
                    		return;
                    	}
                    	this.isHas = true;
                        this.list = back.repBody;
                        this.own = this.list.filter(item => {
                            return item.usid === +uid;
                        })[0];
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
<style lang="scss" scoped>
	.ranking {
		height: 100%;
		.list {
			position: relative;
			height: 100%;
			margin-top: -222px;
			padding-top: 282px;
			box-sizing: border-box;
			.t {
				position: absolute;
				top: 222px;
				left: 0;
				width: 100%;
				background: #ff8300;
				div {
					float: left;
					line-height: 60px;
					font-size: 28px;
					color: white;
					text-align: center;
					width: 33.2%;
				}
			}
			.scroll {
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			.own {
				background: #ff982a;
			}
			li {
				height: 90px;
				line-height: 90px;
				> div {
					float: left;
					width: 33.2%;
					font-size: 26px;
					text-align: center;
				}
				.user {
					position: relative;
					padding-left: 100px;
					text-align: left;
					box-sizing: border-box;
					img {
						position: absolute;
						top: 10px;
						left: 20px;
						width: 70px;
						height: 70px;
						border-radius: 50%;
					}
					p {
						width: 100%;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
				.price {
					color: #e33424;
				}
				&:nth-child(even) {
					background: #efefef;
				}
				.first, .second, .third {
					position: relative;
					font-size: 0;
					&:before {
						content: '';
						position: absolute;
						top: 50%;
						left: 50%;
						width: 31px;
						height: 45px;
						margin: -22.5px 0 0 -15.5px;
						background: url(../../../image/wap/icon2.png) 0 0 no-repeat;
					}
				}
				.second:before {
					background-position: -31px 0;
				}
				.third:before {
					background-position: -62px 0;
				}
			}
		}
	}
</style>