<template>
	<div class="data-statistics-view"> 
	 <div class="container">
	 	<div class="nemu-title">
			<a v-link="{name:'activity'}">我的活动</a> / 活动数据
		</div>
		<div class="content">
			<div class="col-md-2">
		 		<div class="menu" >
				    <activity-menu>		
					</activity-menu>
			 	</div>
		 	</div>
		 	<div class="col-md-10">
		 		<router-view></router-view>
		 	</div>
		</div>
	</div>
</div>
</template>
<style lang="scss">
	.data-statistics-view{
		width: 100%;
		background-color: #f1f4f5;
		.container{
			.nemu-title{
				height: 86px;
				font-size: 12px;
				text-indent: 10px;
				line-height: 11;
			}
			.menu{
				width: 100%;
			}
		}
}
</style>
<script>
    import activityMenu from '../components/web/activity-menu.vue'
    export default{
    	components:{
    		activityMenu,
    	},
    	data() {
    		return {
    			height: ''
    		}
    	}
    }
</script>