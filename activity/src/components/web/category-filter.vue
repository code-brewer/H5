<template>
	<!-- 类别筛选栏组件 -->
	<div class="component-category-filter-container">
		<div class="component-category-filter" v-for="(index, item) in lists">
			<div class="category-filter-title">{{item.title}}:</div>
			<div class="category-filter-list">
				<ul>
					<li v-for="(dataIndex, dataItem) in item.categorys" class="category-filter-item" :class="{_selected: dataItem._selected}" @click="_selectedItem(index, dataIndex)">{{dataItem.title}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import api from './../../api/index.js'

	export default {

		props: {
			lists: {
				type: Array,
				default: function() {
					return [{
						title: '活动形式', //类别主题
						categorys: [ //可选的类目
							{
								title: '全部', //类别名称
								_selected: true //类别是否被选中
							}
						]
					}, {
						title: '活动主题',
						categorys: [{
							title: '全部',
							_selected: false
						}]
					}]
				}
			},
			//选中的形式
			selectedType: {
				type: String,
				default: ''
			},
			//选中的主题
			selectedMotive: {
				type: String,
				default: ''
			}
		},

		data() {
			return {

			}
		},

		ready() {
			this.getTitle();
			this.getTypes();
		},

		methods: {
			//获取活动形式
			getTypes() {
				var that = this;
				api.prizeTypes(this, {
					types: 2
				}, (back) => {
					if(back.resCode == "0") {
						var obj = {
							title: '全部',
							tid: '',
							_selected: true
						}

						var categorys = [];

						for(var i = 0; i < back.repBody.length; i++) {
							back.repBody[i]._selected = false;
							categorys.push(back.repBody[i]);
						};

						categorys.unshift(obj);
						that.lists[0].categorys = categorys;
					}
				});
			},

			getTitle() {
				var that = this;
				api.prizeTypes(this, {
					types: 3
				}, (back) => {
					if(back.resCode == "0") {
						var obj = {
							title: '全部',
							tid: '',
							_selected: true
						}

						var categorys = [];

						for(var i = 0; i < back.repBody.length; i++) {
							back.repBody[i]._selected = false;
							categorys.push(back.repBody[i]);
						}

						categorys.unshift(obj);
						that.lists[1].categorys = categorys;

					}
				})

			},

			_selectedItem(index, dataIndex) {
				for(var i = 0; i < this.lists.length; i++) {
					if(index == i) {
						for(var j = 0; j < this.lists[i].categorys.length; j++) {
							if(j == dataIndex) {
								this.lists[i].categorys[j]._selected = true;
								if(i == 0) {
									//形式
									this.selectedType = this.lists[i].categorys[j].tid;
								} else if(i == 1) {
									//主题
									this.selectedMotive = this.lists[i].categorys[j].tid;
								}
							} else {
								this.lists[i].categorys[j]._selected = false;
							}
						}
						break;
					}
				}
			}
		}

	}
</script>
<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';
	.component-category-filter-container {
		width: 100%;
		max-width: 1220px;
		font-size: 0;
		background-color: #fff;
		.component-category-filter {
			margin-bottom: 10px;
			&:last-child {
				margin-bottom: 0;
			}
			.category-filter-title {
				display: inline-block;
				width: 100px;
				font-size: 12px;
			}
			.category-filter-list {
				display: inline-block;
				margin-left: 5px;
				font-size: 0;
				> ul {
					padding: 0;
					margin: 0;
				}
				@media (max-width: $screen-lg-min) {
					.category-filter-item {
						padding: 0 13px!important;
					}
				}
				.category-filter-item {
					display: inline-block;
					font-size: 12px;
					height: 100%;
					line-height: 24px;
					padding: 0 20px;
					margin-right: 10px;
					border-radius: 5px;
					cursor: pointer;
					&._selected {
						color: #fff;
						background-color: $brand-primary;
					}
					&:last-child {
						margin-right: 0;
					}
					&:hover {
						color: #fff;
						background-color: $brand-primary;
					}
				}
			}
		}
	}
</style>