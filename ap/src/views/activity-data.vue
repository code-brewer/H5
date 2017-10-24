<template>
	<div class="data-statistics-view"> 
	 <div class="container">
	 	<div class="nemu-title">
			<a v-link="{name:'activity'}">我的活动</a> / 活动数据
		</div>
		<div class="content">
			<div class="col-md-2">
		 		<div class="menu" >
					<component :is="currentView"></component>
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
    import activityMenuNew from '../components/web/activityDataMenu/activity-menu-new'
	import activityMenuOld from '../components/web/activityDataMenu/activity-menu'
	import activityMenuLongscreen from '../components/web/activityDataMenu/activity-menu-longscreen'
    export default{
    	components:{
    		activityMenuOld,
			activityMenuNew,
			activityMenuLongscreen
    	},
    	data() {
    		return {
    			height: '',
				type: this.$route.params.type,
				currentView: ''
    		}
    	},
        created() {
            switch(this.type) {
                case 'song':
                    this.currentView = 'activity-menu-new'
                    break
                case 'longscreen': 
				case 'shortscreen': 
                    this.currentView = 'activity-menu-longscreen'
                    break
                default: 
                    this.currentView = 'activity-menu-old'
            }
        }
    }
</script>