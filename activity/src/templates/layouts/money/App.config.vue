<template>
	<div class="app-wrap">
		<banner-page v-show="activityConfig.bannerPage.show"></banner-page>
		<router-view></router-view>
	</div>
</template>

<script>
	import utils from '../../../utils'

	import Vue from 'vue'

	export default {
		data() {
			var common = window.store.activityConfig.common;
			var activityConfig = window.store.activityConfig;
			return {
				common,
				activityConfig
			}
		},
		computed: {
			btnStyle: function() {
				var radius = this.common.btnStyle == "boxer" ? "0px" : this.common.btnStyle == "fillet" ? "500px" : "10px";
				if(this.common.btnEnable) {
					return {
						"border-radius": radius,
						"background-color": this.common.btnUrl == "" ? this.common.btnColor : "rgba(0, 0, 0, 0)",
						"background-image": "url(" + this.common.btnUrl + ")",
						"background-size": "100% 100%"
					}
				} else return {}
			}
		},
		components: {
			'banner-page': require('../../components/banner-page/banner-page.config.vue'),
		},
		created() {
			if(!window.store.activityConfig.isUpdate) {
				utils.extend(window.store.activityConfig, require('./extbody.js'), true)
			}
		},
		props: {
			id: {
				type: String
			}
		}
	}
</script>

<style lang="scss" src="./css/style.scss"></style>