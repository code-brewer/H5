import Vue from 'vue'
import jQuery from 'jquery'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
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
	this.pagerConfig.total = arr.length;
	this.filterList = arr;
	return arr;
});
import App from './App'
import User from './views/User'

export var router = new VueRouter()

router.map({
	'/': {
		component: require('./views/Template.vue')
	},
	'/activity':{
		name:'activity',
		component: require('./views/Activity.vue')
	},
	'/update': {
        name: 'update',
        component: require('./components/web/upload.vue'),
   },
	'/user': {
        name: 'user',
        component: User
   },
   '/userList': {
        name: 'userList',
        component: require('./views/userList.vue'),
   },
    '/prizeList': {
        name: 'prizeList',
        component: require('./views/prize-list.vue'),
   },
    '/activitydata': {
    	component: require('./views/activity-data.vue'),
	    subRoutes: {
	      '/visitor/:aid/:modaln': {
	      	name:'visitor',
	        component: require('./views/visitor.vue')
	      },
	      '/dataStatistics/:aid/:type/:modaln': {
	      	name: 'dataStatistics',
	        component: require('./views/dataStatistics/dataStatistics.vue')
	      },
	      '/awardList/:aid/:type/:modaln': {
	      	name:'awardList',
	        component: require('./views/awardList/awardList.vue')
	      },
	      '/phoneuserList/:aid/:type/:modaln': {
	      	name:'phoneuserList',
	        component: require('./views/phoneuserList.vue')
	      },
	       '/participate/:aid/:modaln': {
	      	name:'participate',
	        component: require('./views/participate.vue')
	      },
	       '/buyToneFail/:aid/:type/:modaln': {
	      	name:'buyToneFail',
	        component: require('./views/buyToneFail.vue')
	      },
	       '/openBellFail/:aid/:type/:modaln': {
	      	name:'openBellFail',
	        component: require('./views/openBellFail.vue')
	      }
  	  },

  }
})

router.redirect({
	'*': '/'
})

router.start(App, 'app')
