<template>
	<div class="app-wrap">
		<banner-page v-show="activityConfig.bannerPage.show"></banner-page>
		<router-view></router-view>
	</div>
</template>

<script>
	import Vue from 'vue'
	import utils from '../../../utils'
	export default {
		data(){
			var activityConfig = window.store.activityConfig;
//			var collectionPic = window.store.configData.collectionPic
			var common = window.store.activityConfig.common;
			return{
				activityConfig,
				common
			}
		},
		components:{
			'banner-page': require('../../components/banner-page/banner-page.config.vue'),
		},
		created() {
			if(!window.store.activityConfig.isUpdate) {
				utils.extend(window.store.activityConfig, require('./extbody.js'),true)
				utils.extend(window.store.configData, require('./extbodyconfig.js'),true)
			}		
		},
		computed: {
			btnStyle: function() {
				var radius = this.common.btnStyle == "boxer" ? "0px" : this.common.btnStyle == "fillet" ? "500px" : "10px";
				if(this.common.btnEnable) {
					return {
						"border-radius": radius,
						"background-color": this.common.btnUrl==""?this.common.btnColor:"rgba(0, 0, 0, 0)",
						"background-image": "url(" + this.common.btnUrl + ")",
						"background-size": "100% 100%"
					}
				}else return {}
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
<style>
	.app-wrap {
		height: 100%;
	}
</style>