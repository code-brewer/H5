<template>
	<div class="data-right data-right-new">
		<div class="record-view">
			<p class="title">数据统计</p>
			<div class="export">
				<!--<div class="right">
								<data-export></data-export>
							</div>-->
			</div>
			<div class="toggle">
				<div class="col-md-10">
					<chartist-toggle :day.sync="day"
					                 :starttime.sync="starttime"
					                 :endtime.sync="endtime"></chartist-toggle>
				</div>
				<div class="col-md-2">
					<data-export :href='toExcel'></data-export>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div class="over-table">
				<ul>
					<li class="title">
						<span>日期</span>
						<span>总抽奖次数</span>
					</li>
					<li class="content">
						<span>{{date}}</span>
						<span>{{total}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
#chart-line {
	height: 100%;
}

.data-right {

	.record-view {
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

		.over-table {
			width: 100%;
			ul {
				list-style: none;
				width: 100%;
				li {
					padding-bottom: 0;
					font-size: 0;
					text-align: center;
					border-bottom: 0;
					span {
						color: #419ce9;
						font-size: 12px;
						display: inline-block;
						line-height: 34px;
						width: 200px;
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
import dataOverview from '../../components/web/data-overview-new.vue'
import dataExport from '../../components/web/data-export.vue'
import chartistLine from '../../components/web/chartist-line.vue'
import chartistToggle from '../../components/web/chartist-toggle.vue'
import api from '../../api/index.js'
import checkbox from '../../components/web-base/checkbox.vue'
import utils from '../../utils/index.js'
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
			name: this.$route.params.modaln,
			day: '1',
			date: '今天',
			starttime: '',
			endtime: '',
			total: '0',
			stime: '',
			etime: '',
			toExcel: 'acceptLog/getPrizeCountToExcel?proNo=10009&reqTime=2016-12-08&aid=13&starttime=2016-11-24&endtime=2016-11-25',
		}
	},
	watch: {
		'starttime'(v) {
			console.log(v)
			if (v.length == 0 || v == "") return;
			this.stime = this.starttime;
			this.selectLuckDrawCount();
		},
		'endtime'(v) {
			if (v.length == 0 || v == "") return;
			this.etime = this.endtime;
			this.selectLuckDrawCount();
		},
		'day'(v) {
			console.log(v)
			if (v.length == 0 || v == "") return;
			this.selectLuckDrawCount();
		},

	},
	created() {
		this.$root.fun = [];
		//this.$dispatch('refresh', this.getUv);
		this.selectLuckDrawCount();
	},
	methods: {
		begin() {
			var d = new Date();
			if (this.day == -1) {
				return this.end();
			}
			var m = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1,
				day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
			return (d.getFullYear() + "/" + m + "/" + day).replace(/\//g, '-');
		},
		end() {
			var d = new Date();
			if (this.day == 1) {
				return this.begin();
			}
			var temp = d - Math.abs(this.day * 60 * 60 * 24 * 1000);
			d = new Date(temp)
			var m = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1,
				day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
			return (d.getFullYear() + "/" + m + "/" + day).replace(/\//g, '-');
		},
		selectLuckDrawCount() {
			if (this.day != 0) {
				this.stime = this.end();
				this.etime = this.begin();
				switch (this.day) {
					case '-1':
						this.date = this.stime
						break
					case '1':
						this.date = this.stime
						break
					default:
						this.date = this.stime + '至' + this.etime
				}
			}else {
				this.date = this.stime + '至' + this.etime
			}
			this.toExcel = 'acceptLog/getPrizeCountToExcel?proNo=10009&reqTime=20160314173903&aid=' + this.$route.params.aid + '&starttime=' + this.stime + '&endtime=' + this.etime;
			api.selectLuckDrawCount(this, {
				aid: this.$route.params.aid, //活动id,必传
				starttime: this.stime,
				endtime: this.etime,
			}, (data) => {
				if (!data || !data.repBody) return;
				this.total = data.repBody[0].total;
			})
		}
	}
}
</script>