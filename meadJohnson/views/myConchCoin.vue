<template>
	<div class="myConchCoin main">
		<section class="section1">
			<div>
				<img :src="person.head_img">
				<p>{{person.nick}}</p>
			</div>
			<div>
				<div>
					<div class="level"><span>{{person.v_grade}}</span></div>
					<span>成长值：{{person.v_integral}}</span>
				</div>
				<a v-link="{path: path}">我的档案</a>
			</div>
		</section>
		<section class="section2">
			<p>我的贝壳币</p>
			<p>{{person.v_score}}</p>
			<div class="btnGroup">
				<btn v-link="{path: '/invitationCard'}">去赚贝壳币</btn>
				<btn v-link="{path: '/presentList'}">去兑换好礼</btn>
			</div>
			<div class="detail">
				<h2>贝壳币明细</h2>
				<table>
					<thead>
						<tr>
							<th>日期</th>
							<th><p>说明</p></th>
							<th>贝壳币</th>
							<th>成长值</th>
						</tr>
					</thead>
				</table>
				<div class="moreTable">
					<table>
						<tbody>
							<tr v-for="value in list">
								<td>{{value.ctime}}</td>
								<td><p>{{value.org}}</p></td>
								<td>{{value.score}}</td>
								<td>{{value.integral}}</td>
							</tr>
						</tbody>
					</table>
					<p class="moreText" @click="getMoreData" :style="{'line-height': lineHeight}">{{moreText}}</p>
				</div>
			</div>
		</section>
		<div class="guize">
       		<!-- <div><a v-link="{path: '/gardenRule'}">秘密花园规则></a></div> -->
    		<div>如有疑问，请在公众号对话框以“客服+你的问题”的格式将你的问题告诉花妈，花妈会争取尽快回复哒！</div>
    	</div>
	</div>
</template>
<script>
	import api from '../api/index.js'
	import utils from '../utils/index.js'
	import btn from '../components/btn.vue'

	export default {
		components: {
			btn
		},
		data() {
			return {
				path: '/ConchCoinEditForm',
				list: [],
				moreText: '点击加载更多',
				count: 0,
				pageConfig: {
					pageNum: 1,
					pageSize: 7,
					totalPage: 0
				},
				person: {
					head_img: '',
					nick: '',
					v_grade: '',
					v_integral: '0',
					v_score: '0'
				},
				lineHeight: '45px',
				Await: {
					show: false
				}
			}
		},
		created() {
			document.title = '我的贝壳币';
			this.$dispatch('loading');
			api.getPersonalInfo(this, {}, (data) => {
				if (data.resMsg === 'success') {
					this.person = data.repBody.list[0];
					this.showImg = true;
				}
			})
			//获取我的档案
			api.getMyfileInfo(this, {}, (data) => {
				if (data.resCode == "0") {
					if (!utils.isEmptyObject(data.repBody.list[0])) {
						this.path = '/ConchCoinCheckForm';
					}
					this.$dispatch('cancelLoading');
				}
			})
			this.getShellcoinsList();
			
		},
		methods: {
			getMoreData() {
				this.pageConfig.pageNum++;
				if (this.pageConfig.pageNum > this.pageConfig.totalPage) {
					this.moreText = '没有更多数据了';
					return false;
				}
				this.getShellcoinsList();
			},
			getShellcoinsList() {
				//贝壳币明细
				this.moreText = '数据加载中';
				this.lineHeight = '45px';
				api.getShellcoinsList(this, {pageNum: this.pageConfig.pageNum, pageSize: this.pageConfig.pageSize}, (data) => {

					if (data['resCode'] === '0') {
						if (data.repBody['total'] !== 0) {
							var list = data.repBody.list;
							this.pageConfig.totalPage = Math.ceil(+list[0].total/this.pageConfig.pageSize);
							if (this.pageConfig.pageNum + 1 > this.pageConfig.totalPage) {
								this.moreText = '没有更多数据了';
							} else {
								this.moreText = '点击加载更多';
							}
							list.forEach((value) => {
								this.list.push(value);
							})
						} else {
							this.moreText = '没有更多数据了';
							this.lineHeight = '270px';
						}
					} else {
						this.moreText = '数据加载失败,请重新加载';
					}

				})
			}
		}
	}
</script>
<style lang="scss">
	.myConchCoin {
		padding: 20px 0 100px;
		.section1, .section2 {
			width: 90%;
			margin: 0 auto;
			margin-bottom: 30px;
			border-radius: 15px;
			-webkit-box-shadow: 0 0 30px rgba(61,165,175,.4);
			box-shadow: 0 0 30px rgba(61,165,175,.4);
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
		}
		.section1 {
			padding: 50px 0;
			font-size: 0;
			text-align: center;
			background: #edf9fb;
			> div {
				display: inline-block;
				vertical-align: top;
				&:first-child {
					img {
						width: 103px;
						margin: 25px;
						border-radius: 50%;
					}
					p {
						font-size: 30px;
						color: #48a3ac;
					}
				}
				&:last-child {
					padding: 45px 0 0 30px;
					> div {
						margin-bottom: 30px;
						font-size: 0;
						> span {
							padding-left: 10px;
							font-size: 30px;
							color: #48a3ac;
							vertical-align: bottom;
						}
					}
					.level {
						display: inline-block;
						width: 93px;
						height: 37px;
						font-size: 22px;
						text-align: right;
						background: url(../images/conch-coin-icon1.png) no-repeat;
						span {
							padding-right: 10px;
							color: white;
							font-size: 22px;
							line-height: 42px;
						}
					}
					a {
						position: relative;
						display: block;
						width: 130px;
						height: 37px;
						line-height: 37px;
						font-size: 22px;
						color: white;
						border-radius: 10px;
						background: #48a3ac;
						&:before {
							content: "";
							position: absolute;
							top: -10px;
							right: 10px;
							width: 13px;
							height: 10px;
							background: url(../images/conch-coin-icon2.png) no-repeat;
						}
					}
				}
			}
		}
		.section2 {
			padding: 20px;
			text-align: center;
			background: white url(../images/conch-coin-bg1.jpg) top center no-repeat;
			> p {
				color: #48a3ac;
				font-size: 50px;
				line-height: 1.42;
				&:first-child {
					font-size: 30px;
				}
			}
			.btnGroup {
				div {
					margin: 20px;
				}
			}
			.detail {
				color: #48a3ac;
				background: url(../images/conch-coin-bg2.jpg) left top no-repeat;
				-webkit-background-size: 100% auto;
				background-size: 100% auto;
				h2 {
					padding: 20px 0;
					font-size: 34px;
				}
				.moreTable {
					position: relative;
					height: 270px;
					overflow-y: auto;
					-webkit-overflow-scrolling: touch;
					> p {
						height: 45px;
						line-height: 45px;
						text-align: center;
						color: #48a3ac;
						font-size: 20px;
					}
				}
				table {
					width: 100%;
					font-size: 20px;
					text-align: left;
					tr {
						border-bottom: 1px solid #f1f1f1;
						&:last-child {
							border: 0;
						}
					}
					th, td {
						min-width: 68px;
						padding: 10px 5px;
					}
					th {
						background: #f1f1f1;
						&:nth-child(1) {
							width: 140px;
						}
					}
					td {
						&:nth-child(1) {
							width: 140px;
						}
					}
					p {
						width: 200px;
						height: 24px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>