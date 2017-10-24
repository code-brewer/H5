import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

//Vue.http.options.emulateJSON = true;

export var router = new VueRouter()

// router.map({
// 	'/': {
// 		component: require('./views/home.vue')
// 	}
// })

router.map({
	
	'/': {
		component: require('./views/home.vue'),
		subRoutes:{
			//首页
			'/activity': {
				component: require('./views/activity.vue')
			},
			//活动编辑
			'/activityMag/:aid': {
				name:'activityMag',
				component: require('./views/activityMag.vue')
			},
			//活动列表
			'/topic': {
				component: require('./views/topic.vue')
			},
			
			//修改密码
			'/system': {
				component: require('./views/system.vue')
			},
			//活动管理
			'/actdata/:aid': {
				name:'actdata',
				component: require('./views/actdata.vue')
			},
			
			
		}

	},
	//登录
	'/login': {
		component: require('./views/login.vue')
	}
})

router.redirect({
	'*': '/',
	'/':'/activity'
})

router.start(require('./views/App.vue'), '#app')