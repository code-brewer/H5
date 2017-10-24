import Vue from 'vue'
import iscroll from './iscroller/js/scrollerM.js'
import $ from './zepto.js'
Vue.directive('iscroll', {
	scrollConfig:{},
	bind: function () {
 		Vue.nextTick(()=>{
   			var s =new Miscroll(this.scrollConfig);
   			this.scrollConfig.scroll=s;
   			console.log(this.scrollConfig)
 		})
	    // 准备工作
	    // 例如，添加事件处理器或只需要运行一次的高耗任务
	},
	update: function (newValue) {
		  this.scrollConfig=$.extend(newValue,{el:this.el})
	},
	unbind: function () {
	}
})

