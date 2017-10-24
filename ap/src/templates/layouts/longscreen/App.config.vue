<template>
	<div class="app-wrap">
		<router-view></router-view>
	</div>
</template>

<script>
import Vue from 'vue'
import utils from '../../../utils'
export default {
	data() {
		var activityConfig = window.store.activityConfig;
		var common = window.store.activityConfig.common;
		return {
			activityConfig,
			common
		}
	},
	created() {
		// if(!window.store.activityConfig.isUpdate) {
		// 	utils.extend(window.store.activityConfig, require('./extbody.js'),true)
		// 	utils.extend(window.store.configData, require('./extbodyconfig.js'),true)
		// }		
	},
	props: {
		id: {
			type: String
		}
	}
}
</script>

<style lang="scss" src="./css/style.scss"></style>
<style>
.app-wrap {
	height: 100%;
}
</style>