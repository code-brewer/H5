<template>
	<div class="view view-activity">
		<div class="top-header">
			<div class="container">
				<!--<a class="back" href="#"><i class="icon-arrow-left-big"></i><span>返回活动</span></a>-->
				<button-ripple color="button-danger" :class="{'disabled':disabled}" @click="save">{{disabled?'保存中':'保存'}}</button-ripple>
			</div>
		</div>
		<!-- end .top-header -->

		<div class="main container">
			<div class="col-lg-2 col-md-12 alpha">
				<!-- 视图盒子 -->
				<views-box :views="configs.template.route"></views-box>
			</div>
			<div class="col-lg-4 col-md-5 col-sm-5">
				<!-- 模拟器 -->
				<phone-handler></phone-handler>
			</div>
			<div class="col-lg-6 col-md-7 col-sm-7 omega">
				<!-- 配置 -->
				<configs :disabled.sync="disabled"></configs>
			</div>
		</div>
	</div>
</template>

<script>
	import api from './api'
	import Vue from 'vue'
	import {
		gb
	} from './global'
	import buttonRipple from './components/web-base/button-ripple'
	import viewsBox from './components/web/activity/views-box'
	import phoneHandler from './components/web/activity/phone-handler'
	import configs from './components/web/activity/configs'
	export default {
		components: {
			buttonRipple,
			viewsBox,
			phoneHandler,
			configs
		},
		created() {
			document.querySelector('html').style.fontSize = '12px';
		},
		data() {
			var activityConfig = window.store.activityConfig
			return {
				configs: {
					template: {},
					activityConfig,
				},
				disabled: false
			}
		},
		methods: {
			save() {
				if(this.disabled) return;
				this.disabled = true;
				this.$broadcast("save");
			}
		}
	}
</script>

<style src="./css/bootstrap.css"></style>
<style src="./css/font-awesome/css/font-awesome.min.css"></style>

<style lang="scss">
	body {
		background: url('./assets/cloud-float-5.png') 50% -50px no-repeat;
	}
	
	.view-activity {
		.top-header {
			height: 90px;
			> .container {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.disabled {
					background-color: #858383;
				}
			}
			a.back {
				order: -1;
				.icon-arrow-left-big {
					display: inline-block;
					width: 22px;
					height: 24px;
					background: url('./assets/icon-arrow-left-big.png') 0 0 no-repeat;
					margin-right: 5px;
				}
				span {
					color: #000;
					font-size: 14px;
				}
				.icon-arrow-left-big,
				span {
					vertical-align: middle;
				}
			}
			.button-ripple {
				order: 1;
				width: 90px;
			}
		}
	}
	
	.modal-panel {
		position: relative;
		.title {
			text-align: center;
			padding: 10px 0;
			font-size: 14px;
			border-bottom: 1px solid #ccc;
			color: #000;
		}
		.close {
			position: absolute;
			top: 20px;
			right: 15px;
			color: #666;
			font-size: 14px;
			&:hover {
				color: #333;
			}
		}
	}
</style>