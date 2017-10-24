<template>
	<div class="wap-activity-date">
		<p>活动时间：<span>{{startDate}}</span>-<span>{{endDate}}</span></p>

	</div>
</template>

<script>
	import utils from '../../../utils'

	export default {
		data() {
			var configData = window.store.configData;
			return {
				configData
			}
		},
		computed: {
			// 活动开始时间
			startDate() {
				return utils.formatDate(new Date(this.configData.starttime), 'yyyy年MM月dd日')
			},
			endDate() {
				return utils.formatDate(new Date(this.configData.endtime), 'MM月dd日')
			}
		}
	}
</script>