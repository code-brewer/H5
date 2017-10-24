<template>
	<div class="label-inline">
		<span class="onse">时间设置：</span>
		<input type="number" style=" text-align:center;border: 1px solid #D6D6D4;width: 70px;height: 33px;"  v-model="activityConfig.gameTime"/>秒
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		data() {
				var activityConfig = window.store.activityConfig;
				return {
					activityConfig
				}
			},
			ready() {
				console.dir(this)
			},
			methods: {

			},
			events: {

			}
	}
</script>