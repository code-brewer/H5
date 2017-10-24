<template>
	<!-- 状态栏组件 -->
	<div class='chartist-toggle-sort'>
		<ul class="chartist-toggle-sort-box">
			<li class="chartist-toggle-sort-item"
			    @click="selectSort('yesterday')"
			    :class="{selected: chartistData.yesterday._selected}">昨天</li>
			<li class="chartist-toggle-sort-item"
			    @click="selectSort('today')"
			    :class="{selected: chartistData.today._selected}">今天</li>
			<li class="chartist-toggle-sort-item"
			    @click="selectSort('week')"
			    :class="{selected: chartistData.week._selected}">近7天</li>
			<li class="chartist-toggle-sort-item"
			    @click="selectSort('month')"
			    :class="{selected: chartistData.month._selected}">近30天</li>
			<li class="chartist-toggle-sort-item"
			    @click="selectSort('custom')"
			    :class="{selected: chartistData.custom._selected}">
				<datepicker v-ref:dp
				            :value.sync="chartistData.custom.begin"
				            :show-input="false"
				            format="yyyy/MM/dd"
				            :disabled-days-of-Week="disabled"
				            placeholder="年-月-日"
				            width="61px"></datepicker> -
				<datepicker v-ref:dp
				            :value.sync="chartistData.custom.end"
				            :show-input="false"
				            format="yyyy/MM/dd"
				            :disabled-days-of-Week="disabled"
				            placeholder="年-月-日"
				            width="61px"></datepicker>
			</li>
		</ul>
	</div>
</template>
<script>
import datepicker from '../bootstrap/Datepicker.vue'
import utils from '../../utils/index.js'
export default {
	components: {
		datepicker
	},
	data() {
		return {
			datePickerBegin: false,
			datePickerEnd: false
		}
	},
	props: {
		day: '',
		starttime: '',
		endtime: '',
		clickBack: {
			type: Function,
			default: function () {

			}
		},
		//图表数据
		chartistData: {
			type: Object,
			default: function () {
				return {
					//昨天
					yesterday: {
						_selected: false, //是否被选中
						_day: '-1'
					},
					//上线中
					today: {
						_selected: true,
						_day: '1'
					},
					//已下线
					week: {
						_selected: false,
						_day: '6'
					},
					//一个月
					month: {
						_selected: false,
						_day: '29'
					},
					//自定义
					custom: {
						_selected: false,
						_day: '0',
						begin: (function () {
							var d = new Date();
							var m = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1,
								day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
							return d.getFullYear() + "/" + m + "/" + day;
						})(),
						end: (function () {
							var d = new Date();
							var m = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1,
								day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
							return d.getFullYear() + "/" + m + "/" + day;
						})(),
					}
				}
			}
		}
	},
	methods: {
		selectSort(_name) {
			this.clickBack()
			var i;
			for (i in this.chartistData) {
				this.chartistData[i]._selected = false;
			}
			this.day = this.chartistData[_name]._day;
			this.starttime = this.endtime = '';
			if (_name == "custom") {
				this.datePickerBegin = true;
			} else {
				this.chartistData[_name]._selected = true;
				this.$dispatch('change-uv');
			}
		},
		checkTime() {
			var start = new Date(this.chartistData.custom.begin),
				end = new Date(this.chartistData.custom.end);
			if (start <= end) {
				this.starttime = utils.formatDate(start, 'yyyy-MM-dd');
				this.endtime = utils.formatDate(end, 'yyyy-MM-dd');
				this.$dispatch('change-uv');
			}
		}
	},
	watch: {
		'chartistData.custom.begin'(val) {
			this.checkTime();
		},
		'chartistData.custom.end'(val) {
			this.checkTime();
		}
	}
}
</script>

<style lang='scss'>
@import '../../css/bootstrap/_variables.scss';
.chartist-toggle-sort {
	width: 100%;
	text-align: right;
	text-align: -webkit-right;
	.chartist-toggle-sort-box {
		height: 26px;
		padding: 0;
		margin: 0;
		font-size: 0;
		box-sizing: border-box;
		float: right;
		.form-control {
			width: 70px;
			border: none;
			height: 13px!important;
			font-size: inherit;
			line-height: 1.42857;
			background-color: #fff;
			background-image: none;
			border: 0px;
			padding: 0px;
			border-radius: 0;
		}
		.chartist-toggle-sort-item {
			&:first-child {
				border-radius: 5px 0px 0px 5px;
			}
			&:last-child {
				border-right: 1px solid $brand-primary!important;
				border-radius: 0px 5px 5px 0px;
			}
			border-top: 1px solid $brand-primary;
			border-bottom: 1px solid $brand-primary;
			border-left: 1px solid $brand-primary;
			display: inline-block;
			width: 80px;
			height: 24px;
			line-height: 24px;
			font-size: 12px;
			text-align: center;
			cursor: pointer;
			transition: background-color .4s ease-in-out,
			color .2s ease-in-out;
			&:last-child {
				border-right: none;
				width: 180px;
			}
			&.selected {
				color: #fff;
				background-color: $brand-primary;
			}
		}
	}
}
</style>