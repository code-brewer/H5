<template>
	<!-- 状态栏组件 -->
	<div class='status-toggle-sort'>
		<ul class="status-toggle-sort-box" >
			<li class="status-toggle-sort-item" @click="selectSort('myActivity')" :class="{selected: activityData.myActivity._selected}">我的活动: {{activityData.myActivity.qty}}</li>
			<li class="status-toggle-sort-item" @click="selectSort('online')" :class="{selected: activityData.online._selected}">上线中: {{activityData.online.qty}}</li>
			<li class="status-toggle-sort-item" @click="selectSort('offline')" :class="{selected: activityData.offline._selected}">已下线: {{activityData.offline.qty}}</li>
			<li class="status-toggle-sort-item" @click="selectSort('notOnline')" :class="{selected: activityData.notOnline._selected}">未上线: {{activityData.notOnline.qty}}</li>
		</ul>
	</div>

</template>

<script>
	import api from './../../api/index.js'

	export default{
		props: {
			//活动数据
			activityData: {
				type: Object,
				default: function(){
					return {
						//我的活动
						myActivity: {
							status: '',
							qty: 0, 			//数量
							_selected: true		//是否被选中
						},
						//上线中
						online: {
							status: '3',
							qty: 0,
							_selected: false
						},
						//已下线
						offline: {
							status: '4',
							qty: 0,
							_selected: false
						},
						//未上线
						notOnline: {
							status: '6',
							qty: 0,
							_selected: false
						}
					}
				}
			},
			selectedStatus: '',
			listChanged: ''
		},

		data(){
			return {

			}
		},

		ready(){
			this.getStatusCount();
		},

		watch: {
			listChanged(val){
				this.getStatusCount();
			}
		},

		methods: {
			getStatusCount(){
				var that = this;

				api.activityStatusCount(this, {}, (back)=>{
					if(back.resMsg == "success"){
						that.activityData.myActivity.qty = back.repBody[0].allcount;
						that.activityData.online.qty = back.repBody[0].online;
						that.activityData.offline.qty = back.repBody[0].offline;
						that.activityData.notOnline.qty = back.repBody[0].noonline;
					}
				})
			},

			selectSort(_name){
				if(_name == "myActivity"){
					this.activityData.myActivity._selected = true;
					this.activityData.online._selected = false;
					this.activityData.offline._selected = false;
					this.activityData.notOnline._selected = false;

					this.selectedStatus = this.activityData.myActivity.status;

				}else if(_name == "online"){
					this.activityData.myActivity._selected = false;
					this.activityData.online._selected = true;
					this.activityData.offline._selected = false;
					this.activityData.notOnline._selected = false;

					this.selectedStatus = this.activityData.online.status;

				}else if(_name == "offline"){
					this.activityData.myActivity._selected = false;
					this.activityData.online._selected = false;
					this.activityData.offline._selected = true;
					this.activityData.notOnline._selected = false;

					this.selectedStatus = this.activityData.offline.status;

				}else if(_name == "notOnline"){
					this.activityData.myActivity._selected = false;
					this.activityData.online._selected = false;
					this.activityData.offline._selected = false;
					this.activityData.notOnline._selected = true;

					this.selectedStatus = this.activityData.notOnline.status;

				}
			}
		}
	}
</script>

<style lang='scss'>
	@import '../../css/bootstrap/_variables.scss';

	.status-toggle-sort{
		width:100%;
		/* max-width:234px; */

		.status-toggle-sort-box{
			width: 474px;
			height: 26px;
			padding: 0;
			margin: 0;
			font-size: 0;
			border: 1px solid $brand-primary;
			box-sizing: border-box;
			border-radius: 5px;

			.status-toggle-sort-item{
				display:inline-block;
				width:118px;
				height:100%;
				line-height:24px;
				font-size:12px;
				text-align:center;
				border-right: 1px solid $brand-primary;
				cursor:pointer;
				transition: background-color .4s ease-in-out, color .2s ease-in-out;

				&:last-child{
					border-right: none;
				}

				&.selected{
					color:#fff;
					background-color:$brand-primary;
				}
			}
		}
	}

</style>
