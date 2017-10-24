<template>
	<!-- 兑换状态栏组件 -->
	<div class='backlist-toggle-view'>
		<ul class="backlist-toggle-box">
			<li class="chartist-toggle-item" @click="selectSort('black')" :class="{selected: exchangeData.black._selected}">白名单</li>
			<li class="chartist-toggle-item" @click="selectSort('white')" :class="{selected: exchangeData.white._selected}">黑名单</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: {
			exchangeData: {
				type: Object,
				default() {
					return {
						black: {
							_selected: true
						},
						white: {
							_selected: false
						}
					}
				}
			},
			type: {
				type: String,
				default: 'black'
			}
		},
		methods: {
			selectSort(type) {
				var i;
				for(i in this.exchangeData) {
					this.exchangeData[i]._selected = false;
				}
				this.exchangeData[type]._selected = true;
				this.type = type;
			}
		}
	}
</script>
<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	.backlist-toggle-view {
		width: 100%;
		font-size: 0;
		ul {
			width: 162px;
			height: 26px;
			margin: 0;
			padding: 0;
			font-size: 0;
			vertical-align: top;
			li {
				&:first-child {
					border-radius: 5px 0px 0px 5px;
				}
				&:last-child {
					border-right: 1px solid $brand-primary!important;
					border-radius: 0px 5px 5px 0px;
				}
				border-top: 1px solid $brand-primary;
				border-bottom: 1px solid $brand-primary;
				border-left: 1px solid $brand-primary;
				display: inline-block;
				width: 80px;
				height: 24px;
				line-height: 24px;
				font-size: 12px;
				text-align: center;
				border-right: 1px solid $brand-primary;
				cursor: pointer;
				transition: background-color .4s ease-in-out,
				color .2s ease-in-out;
				&:last-child {
					border-right: 0;
				}
				&.selected {
					color: #fff;
					background-color: $brand-primary;
				}
			}
		}
	}
</style>