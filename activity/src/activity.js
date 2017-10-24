import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.filter('Between', function (value,attr, begin, end) {
	var arr=[];
	if(Object.prototype.toString.call(value).indexOf("Array")!=-1){
		 for(var i=0;i<value.length;i++)
		 {
		 	if(begin < value[i][attr] && value[i][attr] < end)	
		 	{
		 		arr.push(value[i]);
		 	}
		 }
	}
	this.pagerConfig.total=arr.length;
	this.pageList=arr;
	this.filterList = arr;
	return arr;
})
Vue.filter('GetfilterList', function (value,config,listName) {
	var arr=[];
	if(Object.prototype.toString.call(value).indexOf("Array")!=-1){
		 for(var i=0;i<value.length;i++)
		 {
		 	arr.push(value[i]);
		 }
	}
	this[config].total=arr.length;
	this[listName] = arr;
	return arr;
})
let Activity = Vue.extend(require('./Activity.vue'))

new Activity({
	el: 'app'
}) 
