<template>
	<!-- 导出数据 -->
	<div class="components-data-export">
		<button-ripple color="button-danger" @click="exportData">导出数据</button-ripple>
		<!-- <a v-show="false" href="activityData/previewStatisticalToExcel?aid=1" id="btn-export">导出</a> -->
		<a v-show="false" href="{{href}}" id="btn-export">导出</a>

	</div>
</template>

<script>
	import buttonRipple from '../web-base/button-ripple'

	export default{
		components: {
			buttonRipple
		},
		props: {
			href: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				// href: '',
			}
		},
		methods: {
			exportData() {
				document.getElementById('btn-export').click();
			}
		}
	}
</script>

<style lang="scss">
	.components-data-export{
		width: 100%;
	}
</style>