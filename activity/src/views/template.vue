<template>
    <div class="view view-template" style="min-height: 1000px;">
        <div class="container">
            <category-filter :lists="categorys" :selected-type.sync="selectedType" :selected-motive.sync="selectedMotive"></category-filter>
            <div class="where-bar">
            	<view-toggle :view-model.sync="viewModel"></view-toggle>
				<sort :sort-model.sync="sortModel"></sort>
            </div>
            <model-list-view :list="list" :view-model.sync="viewModel" :selected-type.sync="selectedType" :selected-motive.sync="selectedMotive" :sort-model.sync="sortModel"></model-list-view>
        </div>
    </div>
</template>
<script>
	import categoryFilter from '../components/web/category-filter'
	import viewToggle from '../components/web/view-toggle'
	import sort from '../components/web/sort'
	import modelListView from '../components/web/model-list-view'
	export default {
	    components: {
	        categoryFilter,
	        viewToggle,
	        sort,
	        modelListView
	    },
	    data() {
	        return {
	            list: [],

	            viewModel: 'horizontal',
	            //选中的形式
	            selectedType: '',
	            //选中的主题
            	selectedMotive: '',
            	//筛选方式
		        sortModel: '新'

	        }
	    },
	    ready() {

	    },
	    watch: {
	    	
	    }
	}
</script>

<style lang="scss">
	.view-template {
	    background: #50cee7 url('../assets/main-bg.png') center top no-repeat;
	    .component-category-filter-container {
	    	margin-top: 60px;
	    }
	    .where-bar {
	    	min-width: 930px;
	    	display: flex;
	    	align-items: center;
	    	justify-content: space-between;
	    	margin-top: 25px;
	    	padding: 20px 0;
	    	border-top: 1px solid #e6e6e6;
	    }
	}
</style>
