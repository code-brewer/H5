<template>
	<div class="data-right">
		<div class="over-view">
			<p class="title">数据统计</p>
			<div class="export">
				<div class="left">
					{{name}}
				</div>
				<!--<div class="right">
						<data-export></data-export>
					</div>-->
			</div>
			<div class="over-view-data">
				<data-overview :overview-data.sync="overviewData"></data-overview>
			</div>
		</div>
		<div class="chartist-view">
			<div class="toggle">
				<div class="col-md-10">
					<chartist-toggle :day.sync="day" :starttime.sync="starttime" :endtime.sync="endtime"></chartist-toggle>
				</div>
				<div class="col-md-2">
					<data-export :href='toExcel'></data-export>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div class="over-table">
				<ul>
					<li class="title">
						<span>浏览量PV</span>
						<span>访问量UV</span>
						<span>参与人数</span>
						<span>获奖人数</span>
						<span>分享次数</span>
					</li>
					<li class="content">
						<span>{{total.pv}}</span>
						<span>{{total.uv}}</span>
						<span>{{total.join}}</span>
						<span>{{total.win}}</span>
						<span>{{total.share}}</span>
					</li>
				</ul>
			</div>
			<div class="chartist-view-line">
				<div style="text-align: right;">
					<checkbox :model.sync="showConfig.pv" style="color: #ffc868;margin-right: 25px;">PV</checkbox>
					<checkbox :model.sync="showConfig.uv" style="color: #fc2f4c;margin-right: 25px;">UV</checkbox>
					<checkbox :model.sync="showConfig.join" style="color: #5774ed;margin-right:
					;">参与人数</checkbox>
						<checkbox :model.sync="showConfig.win" style="color: #57ed57;margin-right: 25px;">获奖人数</checkbox>
						<checkbox :model.sync="showConfig.share" style="color: #000000;margin-right: 25px;">分享次数</checkbox>
				</div>
				<chartist-line :data='lines' id-chart="chart-line" ratio="ct-chart"></chartist-line>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	#chart-line {
		height: 100%;
	}
	
	.data-right {
		.over-table {
			width: 100%;
			margin-top: 45px;
			ul {
				list-style: none;
				width: 100%;
				li {
					font-size: 0;
					text-align: center;
					span {
						color: #419ce9;
						font-size: 12px;
						display: inline-block;
						line-height: 34px;
						width: 161px;
						height: 34px;
						border-top: 1px solid #ccc;
						border-bottom: 1px solid #ccc;
						border-left: 1px solid #ccc;
						&:last-child {
							border-right: 1px solid #ccc;
						}
					}
					&:first-child span {
						color: #000000;
						border-bottom: 0px;
					}
				}
			}
		}
		.chartist-view {
			margin-top: 20px;
			box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
			width: 100%;
			height: 678px;
			background-color: white;
			padding: 43px 60px 43px 60px;
			.toggle {
				width: 100%;
				.chartist-toggle-sort-box {
					float: left;
				}
			}
			.chartist-view-line {
				padding-top: 50px;
				#chart-line {
					height: 329px;
					.pv .ct-bar,
					.pv .ct-line,
					.pv .ct-point,
					.pv .ct-slice-donut {
						stroke: #ffc868;
					}
					.uv .ct-bar,
					.uv .ct-line,
					.uv .ct-point,
					.uv .ct-slice-donut {
						stroke: #fc2f4c;
					}
					.join .ct-bar,
					.join .ct-line,
					.join .ct-point,
					.join .ct-slice-donut {
						stroke: #5774ed;
					}
					.win .ct-bar,
					.win .ct-line,
					.win .ct-point,
					.win .ct-slice-donut {
						stroke: #57ed57;
					}
					.share .ct-bar,
					.share .ct-line,
					.share .ct-point,
					.share .ct-slice-donut {
						stroke: #000000;
					}
				}
			}
		}
		.over-view {
			box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.2);
			width: 100%;
			height: 380px;
			background-color: white;
			padding: 43px 60px 43px 60px;
			.title {
				color: #419ce9;
				font-size: 14px;
				border-bottom: 1px solid #e8e8e8;
				padding-bottom: 22px;
			}
			.export {
				width: 100%;
				overflow: hidden;
				.left {
					display: inline-block;
					float: left;
					width: 100px;
					font-size: 14px;
					line-height: 39px;
				}
				.right {
					display: inline-block;
					width: 100px;
					height: 50px;
					float: right;
				}
			}
			.over-view-data {
				margin-top: 25px;
			}
		}
	}
</style>
<script>
	import dataOverview from '../components/web/data-overview.vue'
	import dataExport from '../components/web/data-export.vue'
	import chartistLine from '../components/web/chartist-line.vue'
	import chartistToggle from '../components/web/chartist-toggle.vue'
	import api from '../api/index.js'
	import checkbox from '../components/web-base/checkbox.vue'
	import utils from '../utils/index.js'
	//  import {router} from '../main.js'
	export default {
		components: {
			dataOverview,
			dataExport,
			chartistLine,
			chartistToggle,
			checkbox,

		},
		data() {
			return {
				showConfig: {
					pv: true,
					uv: true,
					join: true,
					win: true,
					share: true
				},
				name: this.$route.params.modaln,
				day: '1',
				starttime: '',
				endtime: '',
				lines: {
					labels: ['1', '2', '3', '4', '5', '6'],
					series: [{
						name: 'pv',
						className: "pv",
						data: [0, 0, 0, 0, 0, 0, 0]
					}, {
						name: 'uv',
						className: "uv",
						data: [0, 0, 0, 0, 0, 0]
					}, {
						name: 'join',
						className: "join",
						data: [0, 0, 0, 0, 0, 0]
					}, {
						name: 'win',
						className: "win",
						data: [0, 0, 0, 0, 0, 0]
					}, {
						name: 'share',
						className: "share",
						data: [0, 0, 0, 0, 0, 0]
					}]
				},
				data: {
					labels: ['1', '2', '3', '4', '5', '6'],
					series: [{
						name: 'pv',
						className: "pv",
						data: [0, 0, 0, 0, 0, 0, 0]
					}, {
						name: 'uv',
						className: "uv",
						data: [0, 0, 0, 0, 0, 0]
					}, {
						name: 'join',
						className: "join",
						data: [0, 0, 0, 0, 0, 0]
					}, {
						name: 'win',
						className: "win",
						data: [0, 0, 0, 0, 0, 0]
					}, {
						name: 'share',
						className: "share",
						data: [0, 0, 0, 0, 0, 0]
					}]
				},
				overviewData: {
					pv: {
						qty: 0,
						yesterday: 0,
						today: 0
					},
					//访问量
					uv: {
						qty: 0,
						yesterday: 0,
						today: 0
					},
					//中奖人数
					prize: {
						qty: 0,
						yesterday: 0,
						today: 0
					},
					//分享数
					share: {
						qty: 0,
						yesterday: 0,
						today: 0
					}
				},
				total: {
					join: "0",
					pv: "0",
					uv: "0",
					share: "0",
					win: "0"
				},
				stime: '',
				etime: '',
				toExcel: 'acceptLog/exportToExcel?proNo=10002&reqTime=2016-12-08&aid=13&starttime=2016-11-24&endtime=2016-11-25',
			}
		},
		watch: {
			'showConfig.pv' (v) {
				this.changeDate();
			},
			'showConfig.uv' (v) {
				this.changeDate();
			},
			'showConfig.join' (v) {
				this.changeDate();
			},
			'showConfig.win' (v) {
				this.changeDate();
			},
			'showConfig.share' (v) {
				this.changeDate();
			},
			'starttime' (v) {
				if(v.length == 0 || v == "") return;
				this.stime = this.starttime;
				this.actData();
			},
			'endtime' (v) {
				if(v.length == 0 || v == "") return;
				this.etime = this.endtime;
				this.actData();
			},
			'day' (v) {
				if(v.length == 0 || v == "") return;
				this.actData();

			},

		},
		created() {
			this.$root.fun = [];
			//this.$dispatch('refresh', this.getUv);
			this.changeDate();
			this.actData();
			this.getOverviewData();
		},
		methods: {
			changeDate() {
				var obj = JSON.parse(JSON.stringify(this.data));
				this.lines.labels = obj.labels;
				this.lines.series = [];
				for(var i = 0; i < obj.series.length; i++) {
					if((this.showConfig.pv && obj.series[i].name == "pv") || (this.showConfig.uv && obj.series[i].name == "uv") ||
						(this.showConfig.join && obj.series[i].name == "join") || (this.showConfig.win && obj.series[i].name == "win") ||
						(this.showConfig.share && obj.series[i].name == "share")) {
						this.lines.series.push({
							name: obj.series[i].name,
							className: obj.series[i].name,
							data: obj.series[i].data
						})
					}
				}
				this.$broadcast('changeEvent');
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
			actData() {
				if(this.day != 0) {
					this.stime = this.end();
					this.etime = this.begin();
				};
				this.toExcel = 'acceptLog/exportToExcel?proNo=10007&reqTime=2016-12-09&aid=' + this.$route.params.aid + '&starttime=' + this.stime + '&endtime=' +  this.etime;
				api.actData(this, {
					aid: this.$route.params.aid, //活动id,必传
					//	 aid :'13',
					starttime: this.stime,
					endtime: this.etime,
				}, (data) => {
					if(!data || !data.repBody || data.repBody.lables.length == 0 || data.repBody.series.length == 0) return;
					this.total = data.repBody.total;
					this.lines.labels = data.repBody.lables;
					this.lines.series = data.repBody.series;
					this.data.labels = data.repBody.lables;
					this.data.series = data.repBody.series;
				})
			},

			getOverviewData() {
				api.actData(this, {
					aid: this.$route.params.aid, //活动id,必传
					// aid :'13',

				}, (data) => {
					if(!data || !data.repBody || data.repBody.lables.length == 0 || data.repBody.series.length == 0) return;
					this.overviewData.pv.qty = data.repBody.total.pv;
					this.overviewData.uv.qty = data.repBody.total.uv;
					this.overviewData.prize.qty = data.repBody.total.win;
					this.overviewData.share.qty = data.repBody.total.share;

				})
			}
			// getUv() {
			// 	api.getUvByTimeSlot(this, {
			// 		'day': this.day,
			// 		'aid': this.$route.params.aid,
			// 		'starttime': this.starttime,
			// 		'endtime': this.endtime
			// 	}, (data) => {
			// 		if(+data.resCode) {
			// 			return;
			// 		}
			// 		var list = data.repBody.list;
			// 		this.lines.labels = [];
			// 		this.lines.series[0].data = [];
			// 		list.forEach((value) => {
			// 			this.lines.labels.push(utils.formatDate(new Date(value.date), 'MM-dd'));
			// 			this.lines.series[0].data.push(value.uv);
			// 		})
			// 	})
			// }
		}
	}
</script>