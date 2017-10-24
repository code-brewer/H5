import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

//Vue.http.options.emulateJSON = true;

export var router = new VueRouter()

router.map({
	
	'/': {
		component: require('./views/Admin.vue'),
		subRoutes:{
			//开户管理
			'/accountMag': {
				component: require('./views/AccountMag.vue')
			},
			//销户管理
			'/accountCancel': {
				component: require('./views/AccountCancel.vue')
			},
			
			//会员管理
			'/member': {
				component: require('./views/Member.vue')
			},
			//违章查询
			'/illegalQuery': {
				component: require('./views/IllegalQuery.vue')
			},
			//短信查询
			'message': {
				component: require('./views/Message.vue')
			},
			//数据查询
			'/data': {
				component: require('./views/Data.vue')
			},
			//4g
			'/accountFour': {
				component: require('./views/accountFour.vue')
			},
			//开销户结果管理
			'/accountResult': {
				component: require('./views/accountResult.vue')
			},
			//二次营销
			'/secondaryMarketing': {
				component: require('./views/secondaryMarketing.vue')
			},
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