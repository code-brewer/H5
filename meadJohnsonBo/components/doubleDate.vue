<template>
	<div class="double-data" v-show="display">
		<div class="clearfix">
			<div class="time-range">
				<span>从</span><span class="start-time">{{startTime}}</span><span>到</span><span class="end-time">{{endTime}}</span>
			</div>
			<div class="btns">
				<a href="javascript:;" @click="display=false">取消</a>
				<a href="javascript:;" @click="submit">确定</a>
			</div>
		</div>
		<div class="clearfix">
			<div class="date">
				<datepicker :display-day-view="true" format="yyyy-MM-dd" :value.sync="startTime"></datepicker>
			</div>
			<div class="date">
				<datepicker :display-day-view="true" format="yyyy-MM-dd" :value.sync="endTime"></datepicker>
			</div>
		</div>
	</div>
</template>
<script>
	import datepicker from './Date.vue'

	export default {
		components: {
			datepicker
		},
		props: {
			value: '',
			display: {
				default: false
			}
		},
		data() {
			return {
				startTime: '',
				endTime: ''
			}
		},
		methods: {
			submit() {
				if (this.startTime == '' || this.endTime == '' || new Date(this.startTime) > new Date(this.endTime)) {
					return false;
				}
				this.value = this.startTime + '-' + this.endTime;
				this.display = false;
			}
		}
	}
</script>
<style lang="scss">
	.double-data {
		position: absolute;
		top: 30px;
		left: 0;
		width: 500px;
		padding: 10px;
		border-radius: 10px;
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
		background: white;
		.time-range,.btns {
			height: 26px;
		}
		.time-range {
			float: left;
			padding-left: 10px;
			line-height: 26px;
			span {
				display: inline-block;
				*display: inline;
				*zoom: 1;
				vertical-align: middle;
			}
			.start-time,.end-time {
				width: 100px;
				height: 24px;
				margin: 0 5px;
				text-align: center;
				border: 1px solid #ccc;
				border-radius: 5px;
				background: #f2f2f2;
			}
		}
		.btns {
			float: right;
			padding-right: 10px;
			text-align: center;
			a {
				display: inline-block;
				*display: inline;
				*zoom: 1;
				width: 60px;
				margin-left: 5px;
				line-height: 24px;
				border: 1px solid #d6d6d6;
				border-radius: 5px;
				color: #333;
				vertical-align: top;
				&:last-child {
					border: 1px solid #fe7eaf;
					color: white;
					background: #fe7eaf;
				}
			}
		}
		.date {
			position: relative;
			float: left;
			width: 230px;
			height: 240px;
			margin: 10px;
		}
	}
</style>