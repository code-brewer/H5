<template>
	<!-- 兑换状态栏组件 -->
	<div class='exchange-toggle-view'>
		<ul class="exchange-toggle-box">
			<li class="chartist-toggle-item" @click="selectSort('all')" :class="{selected: exchangeData.all._selected}">全部</li>
			<li class="chartist-toggle-item" @click="selectSort('exchange')" :class="{selected: exchangeData.exchange._selected}">已兑换</li>
			<li class="chartist-toggle-item" @click="selectSort('noExchange')" :class="{selected: exchangeData.noExchange._selected}">未兑换</li>
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
						all: {
							_selected: true
						},
						exchange: {
							_selected: false
						},
						noExchange: {
							_selected: false
						}
					}	
				}
			},
			type: {
				type: String,
				default: 'all'
			}
		},
		methods: {
			selectSort(type){
				var i;
				for(i in this.exchangeData){
					this.exchangeData[i]._selected = false;
				}
				this.exchangeData[type]._selected=true;
				this.type = type;
			}
		}
	}
</script>
<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	.exchange-toggle-view {
		width: 100%;
		font-size: 0;
		ul {
			width: 242px;
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
				cursor:pointer;
				transition: background-color .4s ease-in-out, color .2s ease-in-out;
				&:last-child {
					border-right: 0;
				}
				&.selected {
					color:#fff;
					background-color:$brand-primary;
				}
			}
		}
	}
</style>