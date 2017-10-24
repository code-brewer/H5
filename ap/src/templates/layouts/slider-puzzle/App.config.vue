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
		created() {
			if(!window.store.activityConfig.isUpdate) {
				utils.extend(window.store.activityConfig, require('./extbody.js'),true)
			}
			Date.prototype.Format = function (fmt) {
				var o = {
					"M+": this.getMonth() + 1,
					"d+": this.getDate(),
					"h+": this.getHours(),
					"m+": this.getMinutes(),
					"s+": this.getSeconds(),
					"q+": Math.floor((this.getMonth() + 3) / 3),
					"S": this.getMilliseconds()
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			}
		},
		props: {
			id: {
				type: String
			}
		},
		components:{
			'banner-page': require('../../components/banner-page/banner-page.config.vue'),
		},
		data(){
			var common = window.store.activityConfig.common;
			var activityConfig=window.store.activityConfig;
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
						"background-color": this.common.btnUrl==""?this.common.btnColor:"rgba(0, 0, 0, 0)",
						"background-image": "url(" + this.common.btnUrl + ")",
						"background-size": "100% 100%"
					}
				}else return {}
			}
		}
	}
</script>

<style lang="scss" src="./css/style.scss"></style>
<style>
	.app-wrap {
		background: #333;
		height: 100%;
	}
</style>