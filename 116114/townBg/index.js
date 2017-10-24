import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

//Vue.http.options.emulateJSON = true;

export var router = new VueRouter()

router.map({
	
	'/': {
		// component: require('./views/Admin.vue'),
		component: require('./views/admin1.vue'),
		subRoutes:{
			//修改主题
			'/creatviews/:id': {
				component: require('./views/creatviews.vue')
			},
			//创建主题
			'/creatviews': {
				component: require('./views/creatviews.vue')
			},
			// //审帖列表
			'/postlist': {
				component: require('./views/postlist.vue')
			},
			// //审帖详情
			'detail/:id': {
				component: require('./views/detail.vue')
			},
			 //审帖列表
			'postdetail': {
				component: require('./views/postdetail.vue')
			}
			 //审帖列表
			// 'AccountMag': {
			// 	component: require('./views/AccountMag.vue')
			// }
		}

	},
	//登录
	'/login': {
		component: require('./views/login.vue')
	}
})

router.redirect({
	'*': '/'
})

init = function() {
	router.start(require('./views/Manager.vue'), 'app')
}