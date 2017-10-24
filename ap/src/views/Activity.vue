<template>
	<div class="view view-template" style="min-height: 1000px;">
        <div class="container">
            <category-filter :lists="categorys" :selected-type.sync="selectedType" :selected-motive.sync="selectedTitle"></category-filter>
            <div class="where-bar">
            	<view-toggle :view-model.sync="viewModel" :vertical="false"></view-toggle>
            	<div style="position: absolute;left: 50%;transform: translate(-50%,0);-ms-transform: translate(-50%,0);-webkit-transform: translate(-50%,0);-moz-transform: translate(-50%,0);-o-transform: translate(-50%,0);">
					<status-toggle :selected-status.sync="selectedStatus" :list-changed.sync="listChanged"></status-toggle>
				</div>
				<!-- <sort :sort-model.sync="sortModel"></sort> -->
            </div>
            <activity-list-view :lists="list" :view-model.sync="viewModel" :selected-title.sync="selectedTitle" :selected-type.sync="selectedType" :sort-model.sync="sortModel" :selected-status.sync="selectedStatus" :list-changed.sync="listChanged"></activity-list-view>
        </div>
   </div>
</template>

<script>
	import categoryFilter from '../components/web/category-filter'
	import viewToggle from '../components/web/view-toggle'
	import sort from '../components/web/sort'
	import activityListView from '../components/web/activity-list-view-new'
	import statusToggle from '../components/web/status-toggle.vue'

	export default{
		components: {
	        categoryFilter,
	        viewToggle,
	        sort,
	        activityListView,
	        statusToggle
	    },
	    data(){
	    	return {
	            list: [],
	            categorys: [
	            	{title: '活动形式', //类别主题
                	categorys: [ //可选的类目
                        {
                            title: '全部', //类别名称
                            _selected: true //类别是否被选中
                        }, {
                            title: '拼图',
                            _selected: false
                        }, {
                            title: '数钱',
                            _selected: false
                        }, {
                            title: '跑马灯',
                            _selected: false
                        }, {
                            title: '幸运大转盘',
                            _selected: false
                        }, {
                            title: '集攒',
                            _selected: false
                        }, {
                            title: '砍价',
                            _selected: false
                        }
                    ]
                    }, 
                    {
                        title: '活动主题',
                        categorys: [
	                        {
	                            title: '全部',
	                            _selected: false
	                        }, {
	                            title: '欧洲杯',
	                            _selected: true
	                        }
                        ]
                	}
                ],

	            viewModel: 'horizontal',
	            //选中的形式
	            selectedType: '',
	            //选中的主题
            	selectedTitle: '',
            	//筛选方式
		        sortModel: '新',
		        //选中的状态
		        selectedStatus: '',
		        //活动列表是否有更新
		        listChanged: false
	        }
	    },

	    watch: {
	    	viewModel(val){
	    		if('horizontal' != val){
	    			this.viewModel = 'horizontal';
	    		}
	    	}
	    }
	}

</script>

<style lang="scss">
	.where-bar{
		position: relative;
		min-width: 960px;
	}
</style>