<template>
	<!-- 排序栏组件 -->
	<div class='component-sort'>
		<ul class="component-sort-box" :style="{width: lists.length * 58 + 2 + 'px'}" >
			<li class="component-sort-item" v-for="(index, item) in lists" @click="selectSort(index)" :class="{selected: item._selected}">{{item.title}}</li>
		</ul>
	</div>

</template>

<script>
	export default{
		props: {
			//筛选列表的方式
			lists: {
				type: Object,
				default: function(){
					return [
							{title:'最新',  //显示名称
							flag:'新',
							_selected: true //是否被选中
							}, 
							{title:'最热', flag:'热', _selected: false}
						]
				}
			},

			sortModel:{
				type: String,
				default: '新'
			}
		},

		methods: {
			selectSort(index){
				for(var i=0;i<this.lists.length;i++){
					if(index == i){
						this.lists[i]._selected = true;
						this.sortModel = this.lists[i].flag;
					}else{
						this.lists[i]._selected = false;
					}
				}
			}
		}
	}
</script>

<style lang='scss'>
	@import '../../css/bootstrap/_variables.scss';

	.component-sort{
		display: inline-block;

		.component-sort-box {
			/* max-width:234px; */
			height:26px;
			padding:0;
			margin:0;
			font-size:0;
			border:1px solid $brand-primary;
			box-sizing:border-box;
			border-radius:5px;

			.component-sort-item {
				display:inline-block;
				width:58px;
				height:24px;
				line-height:24px;
				font-size:12px;
				text-align:center;
				cursor:pointer;

				&.selected {
					color:#fff;
					background-color:$brand-primary;
				}
			}
		}
	}

</style>