<template>
	<div class="phone iphone6">
		<div class="statusbar"></div>
		<div class="bar-header">
			<h3 class="title">{{configData.title}}</h3>
		</div>
		<div class="iframe" id="iframe">
			<!-- <component :is="currentView" :bar-title="currTemplate.title" :curr-temp.sync="currTemplate" :currsect="currSection" :currdia.sync="currDialog" :show-btn-shape.sync="showBtnShape"></component> -->
			<div id="wap"></div>
			<!-- <iframe src="http://192.168.1.101/demos/dianyingpiao/" frameborder="0"></iframe> -->
		</div>
		<p>{{jspath}}</p>
	</div>
</template>

<script>
	import Vue from 'vue'

	// import jQuery from 'jquery'
	// import '../../resizeable/jquery.resizeable'

	export default {
		data() {
			var configData = window.store.configData;
			return {
				currentView: '',
				configData
			}
		},
		watch: {
			'configData.jspath'(jspath) {
				var script = document.createElement('script');
				script.src = './templates/' + jspath + '.js'
				script.id = jspath;
				script.onload = function() {
					window.wap.start()
					this.$root.configs.template = window.wap;
					let Condition = Vue.extend(window.wap.condition)
					new Condition({
						el: '#condition'
					})
					setTimeout(function() {
						var myScroll = new window.IScroll('.ams-views-box .content', {
							scrollbars: true,
							fadeScrollbars: true,
							scrollX: true,
							scrollY: true,
							resize: false
						});
					}.bind(this), 500)

				}.bind(this)
				document.head.appendChild(script)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../css/bootstrap/_variables.scss';
	.phone.iphone6 {
		.bar-header {
			background-color: #000;
			color: #fff;
			height: 49px;
			margin: 0;
			text-align: center;
			h3 {
				margin: 0;
				line-height: 49px;
			}
		}
		position: absolute;
		background: #f7f7f7;
		border-radius: 55px;
		box-shadow: 0px 0px 0px 2px #c5c5c5;
		width: 370px;
		height: 778px;
		padding: 105px 25px;
		top: -20px;
		@media (max-width: $screen-lg-min) {
			top: 0;
		}
		&::before {
			content: '';
			width: 60px;
			height: 10px;
			border-radius: 10px;
			position: absolute;
			left: 50%;
			margin-left: -30px;
			background: #9f9f9f;
			top: 50px;
		}
		&::after {
			content: '';
			position: absolute;
			width: 60px;
			height: 60px;
			left: 50%;
			margin-left: -30px;
			bottom: 20px;
			border-radius: 100%;
			box-sizing: border-box;
			border: 3px solid #9f9f9f;
		}
		.statusbar {
			width: 320px;
			height: 20px;
			background: url('../../../assets/status-bar.png');
			left: 50%;
			top: 100px;
			-webkit-background-size: 100% auto;
			background-size: 100% auto;
			z-index: 2;
		}
		iframe,
		.iframe {
			width: 100%;
			height:511px;
			overflow: hidden;
			position: relative;
			background: #000;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			-webkit-text-size-adjust: 100%;
			-ms-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%;
		}
		.app-wrap {
			overflow-y: hidden;
			height: 100%;
		}
		.app-view {
			position: relative;
			top: 0;
			overflow: hidden;
			cursor: url('../../../images/finger.png'), auto;
			.modal {
				cursor: auto;
			}
			.edit-btn {
				cursor: pointer;
			}
		}
	}
</style>