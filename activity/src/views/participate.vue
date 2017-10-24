<template>
	<div class="data-right">
		<div class="record-view container">
			<p class="title">参与用户</p>
			<div class="export-panel">
				<div class="left">
					{{name}}
				</div>
				<div class="right">
					<data-export :href='toExcel'></data-export>
				</div>
			</div>
			<div class="toggle row">
				<div class="left">
					<p>兑换状态</p>
					<blacklist-state-toggle :type.sync="exchangeType"></blacklist-state-toggle>
				</div>
				<div class="right">
					<chartist-toggle :day.sync="day" :starttime.sync="starttime" :endtime.sync="endtime"></chartist-toggle>
				</div>
			</div>
			<div class="table-content">
				<table class="table table-bordered table-striped" v-show='tableShow'>
					<thead>
						<tr>
							<th>微信昵称</th>
							<th>手机号码</th>
							<th>参与时间</th>
							<th>奖品查询</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="list in awradList">
							<td>{{list.usernick}}</td>
							<td>{{list.mobile}}</td>
							<td>{{list.ctime}}</td>
							<td>
								<a @click="displaySelectPrize(list)">查看奖品</a>
							</td>
							<td>{{list.pname}}</td>
						</tr>
					</tbody>
				</table>
				<table class="table table-bordered table-striped" v-show='!tableShow'>
					<thead>
						<tr>
							<th>微信昵称</th>
							<th>获奖时间</th>
							<th>奖品名称</th>
							<th>兑换码</th>
							<th>兑换状态</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="list in selectPrizeData">
							<td>{{list.usernick}}</td>
							<td>{{list.rectime}}</td>
							<td>{{list.pname}}</td>
							<td>{{list.sid}}</td>
							<td>{{list.status}}</td>
						</tr>
					</tbody>
				</table>
				<button class="btn btn-primary btn-sm" v-show='!tableShow' @click="tableShow=!tableShow">返回</button>
			</div>
			<div class="page">
				<pager :total="pagerConfig.total" :pagenum.sync="pagerConfig.pageNum"></pager>
			</div>
		</div>
	</div>
</template>
<script>
	import dataExport from '../components/web/data-export.vue'
	import blacklistStateToggle from '../components/web/blacklist-state-toggle.vue'
	import chartistToggle from '../components/web/chartist-toggle.vue'
	import Pager from '../components/web-base/Pager.vue'
	import api from '../api/index.js'
	export default {
		components: {
			blacklistStateToggle,
			chartistToggle,
			Pager,
			dataExport
		},
		data() {
			return {
				pagerConfig: {
					pageNum: 1,
					pageSize: 10,
					total: 0
				},
				exchangeType: 'black',
				awradList: [],
				name: '你拼图，我送票',
				day: '1',
				starttime: '',
				endtime: '',
				toExcel: 'acceptLog/partUsersExportToExcel?proNo=10007&reqTime=2016-12-09&aid=13&starttime=2016-11-24&endtime=2016-11-25',
				tableShow: true,
				selectPrizeData: '',
			}
		},
		ready() {
			this.$root.fun = [];
			this.getList();
		},
		watch: {
			'pagerConfig.pageNum' () {
				this.getList();
			},
			exchangeType() {
				this.getList();
			},
			starttime(v) {
			 if(v.length == 0 || v == "") return;
				this.stime = this.starttime;
				this.getList();
			},
			endtime(v) {
				if(v.length == 0 || v == "") return;
				this.etime = this.endtime;
				this.getList();
			},
			day(v) {
				if(v.length == 0 || v == "") return;
				this.getList();
			},
		},
		methods: {
			getList() {
				if(this.day != 0) {
					this.stime = this.end();
					this.etime = this.begin();
				};
				this.toExcel = 'acceptLog/partUsersExportToExcel?proNo=10007&reqTime=2016-12-09&aid=' + this.$route.params.aid + '&starttime=' + this.stime + '&endtime=' +  this.etime;
				api.partUsers(this, {
					aid: this.$route.params.aid, //活动id,必传
					// aid:"13",
					starttime: this.stime,
					endtime: this.etime,
					pageNum: this.pagerConfig.pageNum, //当前页
					pageSize: this.pagerConfig.pageSize, //一页显示条数
				}, (data) => {
					if(data.repBody.total == 0 || !data.repBody.list) {
						this.awradList = [];
						this.pagerConfig.total = 0;
						this.pagerConfig.pageNum = 1;
						return;
					}
					this.awradList = data.repBody.list;
					this.pagerConfig.total = this.awradList.length;
				})
				},
				selectPrizeNameByUsid(user) {
						console.log(user.usid)
						api.selectPrizeNameByUsid(this, {
									aid: this.$route.params.aid,//活动id,必传
					// aid:"13",
					usid: user.usid, //用户id
					// usid:"1"    //用户id
				}, (data) => {

					if(data.resMsg !== "success") return;
					this.selectPrizeData = data.repBody;
				})
			},
			displaySelectPrize(user) {
				this.tableShow = !this.tableShow;
				if(!user) return;
				this.selectPrizeNameByUsid(user);
			},
			begin() {
				var d = new Date();
				var m = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1,
					day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
				return(d.getFullYear() + "/" + m + "/" + day).replace(/\//g, '-');
			},
			end() {
				var d = new Date();
				if(this.day == 1) {
					return this.begin();
				}
				var temp = d - Math.abs(this.day * 60 * 60 * 24 * 1000);
				d = new Date(temp)
				var m = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1,
					day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
				return(d.getFullYear() + "/" + m + "/" + day).replace(/\//g, '-');
			},

		}
	}
</script>
<style lang="scss">
	.data-right {
		.record-view {
			box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
			width: 100%;
			background-color: white;
			padding: 43px 60px 43px 60px;
			.export-panel {
				width: 100%;
				height: 70px;
				line-height: 80px;
				.left {
					float: left;
					width: 300px;
				}
				.right {
					text-align: right;
					float: right;
					width: 200px;
				}
			}
			.title {
				color: #419ce9;
				font-size: 14px;
				border-bottom: 1px solid #e8e8e8;
				margin: 0;
				padding-bottom: 22px;
			}
			.toggle {
				margin: 0;
				padding: 20px 0;
				>div {
					margin: 10px 0;
				}
				.left {
					float: left;
					position: relative;
					padding: 0 0 0 70px;
					min-width: 317px;
					>p {
						position: absolute;
						top: 0;
						left: 0;
						margin: 0;
						line-height: 26px;
					}
				}
				.right {
					float: right;
					padding: 0;
				}
			}
			.table-content {
				.table>tbody>tr>td {
					line-height: 2 !important;
					text-align: center;
				}
				th {
					text-align: center;
				}
			}
			.page {
				text-align: right;
			}
		}
	}
	
	@media (max-width: 1300px) {
		.toggle {
			.right {
				width: 100%;
			}
		}
		.chartist-toggle-sort {
			.chartist-toggle-sort-box {
				float: left;
			}
		}
	}
</style>