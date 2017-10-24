<template>
	<div class="selectTime" >
		<span >查询时间段：</span> 
		<div style="display: inline-block">
			<span> 从 </span>
		     <datepicker :value.sync="searchdate.begin" :format="'yyyy-MM-dd'" placeholder="年-月-日" width="100px" :disabled="disabled" ></datepicker>
		     <span> 到 </span> 
		     <datepicker :value.sync="searchdate.end"  :format="'yyyy-MM-dd'" placeholder="年-月-日" width="100px" :disabled="disabled"></datepicker>
		</div>
	     <!-- <div style="display: inline-block"> -->
	     	<slot></slot>
	     	
	     <!-- </div> -->
	     <button class="btn btn-primary" style="float: right" @click="search">查询</button>
	     
	</div>
</template>
<style lang="scss">
	.selectTime {
		input,select {
    			display: inline-block;
    			width: 96px;
    			// height: 22px;
    		}
    		span {
    			margin-right: 5px;
    			margin-left: 5px;
    		}
    		select {
    			vertical-align: bottom;
    		}
	}
	
</style>
<script type="text/javascript">
	import Datepicker from './Datepicker.vue';
	export default {
		components :{
			Datepicker
		},
		props : {
			searchdate : {
				type : Object,
				default :{
					begin : '',
					end : '',
				},
			},
			disabled : {
				type : Boolean,
				default : false,
			}
		} ,
		methods : {
			search () {
				this.$dispatch('search')
			},
			
		}
	}
</script>