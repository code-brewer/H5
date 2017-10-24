<template>
	<!-- 用户列表筛选栏 -->
	<div class="components-sort-user-list">
		<div class="box">
			<div class="box-item">
				账号: <input type="text" class="input-user" placeholder="请输入账号进行搜索" v-model="searchData.username"/>
			</div>
			<div class="box-item">
				账号: 
				<div class="select-data">
					<p @click="showSelectUl = !showSelectUl">{{selectedData}}</p>
					<ul v-show="showSelectUl" transition="select-ul" >
						<li v-if="!item._selected" class="select-item" v-for="(index, item) in selectList" @click="selectData(index)">{{item.title}}</li>
					</ul>
				</div>
			</div>
			<div class="box-item" style="width:90px;">
				<!-- <a class="search">搜索</a> -->
				<button-ripple color="button-primary" @click="">导出数据</button-ripple>
			</div>
		</div>
	</div>

</template>

<script>
	import buttonRipple from '../web-base/button-ripple'

	export default{
		components: {
			buttonRipple
		},

		props: {
			selectList: {
				type: Object,
				default: function(){
					return	[{title: '全部', _data: '', _selected: true},
						{title: '超级管理员', _data: 'super', _selected: false}, 
						{title: '普通用户', _data: 'user', _selected: false}
					]
				}
			},

			searchData: {
				type: Object,
				default: function(){
					return {
						username: '',
						role: ''
					}
				}
			}

		},

		data(){
			return{
				showSelectUl: false,
				selectedData: '全部'
			}
		},

		methods: {
			selectData(index){
				for(var i=0;i<this.selectList.length;i++){
					if(i == index){
						this.selectList[i]._selected = true;
						this.searchData.role = this.selectList[i]._data;
						this.selectedData = this.selectList[i].title;
					}else{
						this.selectList[i]._selected = false;
					}
				}
				this.showSelectUl = false;
			}
		},

		filters: {
			
		}
	}

</script>

<style lang="scss">
	@import '../../css/bootstrap/_variables.scss';

	.components-sort-user-list{
		width: 100%;

		.box{

			.box-item{
				display: inline-block;
				margin-right: 50px;
				line-height: 30px;
				vertical-align: middle;

				&:last-child{
					margin-right: 0;
				}

				.input-user{
					width: 306px;
					height: 30px;
					padding-left: 10px;
					border: 1px solid #d6d6d6;
					background-color: #f3f3f3;
					border-radius: 4px;
				}

				.select-data{
					display: inline-block;
					width: 102px;
					height: 30px;
					background-color: #f3f3f3;
					vertical-align: middle;
					border-radius: 4px;
					border: 1px solid #d6d6d6;

					p{
						position: relative;
						height: 100%;
						width: 100%;
						margin: 0;
						padding-left: 10px;
						cursor: pointer;


						&:after{
							content: '';
							position: absolute;
							top: 50%;
							right: 10px;
							display: block;
							width: 6px;
							height: 6px;
							margin-top: -4px;
							border-left: 1px solid #141414;
							border-bottom: 1px solid #141414;
							transform: rotate(-45deg);
							-ms-transform: rotate(-45deg);
							-o-transform: rotate(-45deg);
							-webkit-transform: rotate(-45deg);
							-moz-transform: rotate(-45deg);
						}
					}

					>ul{
						width: 100%;
						margin: 0;
						padding: 0;
					}

					.select-ul-transition{
						opacity: 1;
						transition: all .3s ease-in-out;
					}

					.select-ul-enter,
					.select-ul-leave{
						height: 0;
						opacity: 0;
					}

					.select-item{
						width: 100%;
						height: 30px;
						line-height: 30px;
						padding-left: 10px;
						list-style-type: none;
						cursor: pointer;

						&:hover{
							background-color: $brand-primary;
						}
					}

				}

				.search{
					display: block;
					width: 90px;
					height: 30px;
					text-align: center;
					color: #fff;
					background-color: $brand-primary;
					border-radius: 4px;
					text-decoration: none;
					cursor: pointer;
				}
			}
		}
	}
</style>