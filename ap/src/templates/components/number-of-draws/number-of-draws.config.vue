<template>
	<div class="wap-number-of-draws">
		<p :style="{'color':common.secondColor}">今天可抽奖次数： <span :style="{'color':common.mainColor}">10</span> 次</p>
	</div>
</template>
<script>
	export default {
		data() {
			var common = window.store.activityConfig.common;
			return {
				common
			}
		}
	}
</script>