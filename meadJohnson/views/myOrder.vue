<template>
	<div class="myOrder main">
		<div v-show="orderShow">
			<p class="t" v-show="orderPShow">我的订单</p>
			<div class="order">
				<section v-for="value in list">
					<div>
						<p><span class="label">订单编号：</span><span class="text">{{value.oid}}</span></p>
						<p><span class="label">成交时间：</span><span class="text">{{value.ctime}}</span></p>
						<p><span class="label">数量：</span><span class="text">{{value.num}}</span></p>
						<p><span class="label">商品价格：</span><span class="text">{{value.price}}</span></p>
					</div>
					<div>
						<p><span class="label">订单状态：</span><span class="text orange">{{value.state}}</span></p>
						<p class="clearfix"><span class="label">订单来源：</span><span class="text orange">{{value.source}}</span><a @tap="this.$router.go({path: value.url})">查看详情></a></p>
					</div>
				</section>
			</div>
			<p class="pullUp" v-show="pullUp">正在加载中……</p>
		</div>
		<div class="none" v-show="!orderShow">
			<img :src="'images/my-order-img1.png'">
			<p>您还没有相关订单</p>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import api from '../api/index.js'
	import IScroll from '../dist/isscroll.js'
	import EventListener from '../components/utils/EventListener.js'

	export default {
		data() {
			return {
				list: [],
				pageConfig: {
					pageNum: 1,
					pageSize: 10,
					totalPage: 0
				},
				orderShow: true,
				orderPShow: false,
				pullUp: false,
				iscroll: null,
				initCount: 1,
				isRedraw: true
			}
		},
		created() {
			document.title = '个人中心';
			this.$dispatch('loading');
		},
		ready() {
			//this.scroll();
			this.getMyorderList();
		},
		methods: {
			scroll() {
				var time = null;
				window.onscroll = () => {
					clearTimeout(time);
					time = setTimeout(() => {
						var windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
							scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
							scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
						if (scrollTop + windowHeight == scrollHeight) {
							//this.showMoreText = true;
							this.pageConfig.pageNum++;
							if (this.pageConfig.pageNum > this.pageConfig.totalPage) {
								this.moreText = '没有更多数据了';
								return false;
							}
							this.getMyorderList();
						}
					},300);
				}
			},
			getMyorderList() {
				
				api.getMyorderList(this, {pageNum: this.pageConfig.pageNum, pageSize: this.pageConfig.pageSize}, (data) => {

					this.pullUp = false;
					if (data['resCode'] === '0') {
						if (data.repBody['total'] !== 0) {
							this.orderShow = this.orderPShow = true;
							var list = data.repBody.list;
							this.pageConfig.totalPage = Math.ceil(data.repBody.total/this.pageConfig.pageSize);
							list.forEach((value) => {
								value.url = '/orderDetail/' + value.oid + '/' + value.state;
								value.state = value.state === '1' ? '待发货' : '已发货';
								this.list.push(value);
							})
							this.scroll();
						} else {
							this.orderShow = false;
						}
						this.$dispatch('cancelLoading');
					} else {
						this.orderShow = false;
					}

				})

			},
			scroll() {//初始化滚动
				if (this.initCount){
					Vue.nextTick(() => {
						this.iscroll = new IScroll('.myOrder', {
							fadeScrollbars: false, //禁止滚动条淡入淡出
							tap: true
						});
						//alert(this.iscroll)
						this.iscroll.on('scrollStart', () => {
							if (this.isRedraw) {
								this.iscroll.maxScrollY -= 70;
							}
							this.isRedraw = false;
						})
						this.iscroll.on('scrollEnd', () => {
							if (this.iscroll.directionY && (this.iscroll.y === this.iscroll.maxScrollY)) {
								this.pageConfig.pageNum++;
								if (this.pageConfig.pageNum <= this.pageConfig.totalPage) {
									this.pullUp = true;
									this.getMyorderList();
								}
							}
						})
					})
					this.initCount -= 1;
				} else {
					Vue.nextTick(() => {
						this.iscroll.refresh();
						this.isRedraw = true;
					})
				}
					
			}
		}
	}
</script>
<style lang="scss">
	.myOrder {
		position: relative;
		height: 100%;
		padding-bottom: 40px;
		overflow: hidden;
	    .t {
	        padding: 20px 0 5px;
	        font-size: 40px;
	        color: #3da5af;
	        text-align: center;
	    }
	    .order {
	    	padding-bottom: 4%;
	        > section {
	            width: 80%;
	            padding: 30px;
	            padding-bottom: 0;
	            margin: 4% auto 0;
	            font-size: 26px;
	            line-height: 1.7;
	            color: #3da5af;
	            border-radius: 15px;
	            -webkit-box-shadow: 0 0 30px rgba(61,165,175,.4);
				box-shadow: 0 0 30px rgba(61,165,175,.4);
	            background: white;
	            > div {
	                padding-bottom: 20px;
	            }
	            p {
	            	min-height: 51px;
	                position: relative;
	                padding-left: 150px;
	                .label {
	                    position: absolute;
	                    top: 0;
	                    left: 0;
	                }
	                .orange {
	                    color: #ff9a46;
	                }
	                a {
	                    float: right;
	                    color: #3da5af;
	                    font-size: 26px;
	                }
	            }
	        }
	    }
	    .moreText,.pullUp {
	    	line-height: 70px;
	    	text-align: center;
	    	color: #3da5af;
	    	font-size: 24px;
	    }
	    .none {
	    	position: absolute;
	    	top: 50%;
	    	width: 100%;
	    	-webkit-transform: translate(0,-50%);
	    	-moz-transform: translate(0,-50%);
	    	transform: translate(0,-50%);
	    	text-align: center;
	    	img {
	    		width: 180px;
	    	}
	    	p {
	    		font-size: 40px;
	    		color: #43a3ad;
	    	}
	    }
	}
</style>