<template>
	<div class="confirm_view" tabindex="0" v-show="show" @mousewheel.prevent="true" @keyup.esc="show=false">
		<div class="confirm_mask" @click="show=false"></div>
		<div class="confirm_panel" transition="expand" v-show="show">
			<div class="confirm_header">
				<slot name="title">消息提示</slot>
			</div>
			<div class="confirm_content">
				<slot name="content">自定义弹窗内容，居左对齐显示，告知需要确认的信息等</slot>
			</div>
			<div class="confirm_btn">
				<ul>
					<li @click="sure">确认</li>
					<li @click="show=false">取消</li>
				</ul>
			</div>
		</div>
</template>
<style lang="scss">
	.confirm_view {
		.confirm_mask {
			position: fixed;
			height: 100%;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 10000;
			top: 0%;
			left: 0%;
		}
		.expand-transition {
			transition: all .3s ease;
			opacity: 1;
		}
		.expand-enter,
		.expand-leave {
			opacity: 0;
		}
		.confirm_panel {
			width: 300px;
			background-color: white;
			position: fixed;
			z-index: 10001;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.confirm_header {
				height: 40px;
				background-color: #419ce9;
				text-align: center;
				color: #fff;
				line-height: 40px;
			}
			.confirm_content {
				padding: 25px 30px;
			}
			.confirm_btn {
				ul {
					list-style: none;
					width: 100%;
					font-size: 0;
					margin: 0;
					padding: 0;
					height: 37px;
					border-top: 1px solid #ccc;
					line-height: 36px;
					li {
						display: inline-block;
						width: 50%;
						text-align: center;
						cursor: pointer;
						font-size: 14px;
						box-sizing: border-box;
						&:first-child {
							border-right: 1px solid #ccc;
						}
					}
				}
			}
		}
	}
</style>
<script>
	import modal from '../bootstrap/Modal'
	export default {
		components: {
			modal
		},
		props: {
			funName: {
				String,
				default: ""
			},
			header: {
				require: true,
				type: Boolean,
				default: true
			},
			show: {
				require: true,
				type: Boolean,
				default: false
			}
		},
		methods: {
			sure() {
				this.show = false;
				this.$dispatch("sure", this.funName);
			}
		},
		watch: {
			'show' (v, o){
				if(v == true) {
					document.querySelector(".confirm_view").focus() // confirm_view获得焦点才能监听keyup事件
				}
			}
		}
	}
</script>