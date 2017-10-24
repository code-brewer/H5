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
			//��ҳ
			'/activity': {
				component: require('./views/activity.vue')
			},
			//��༭
			'/activityMag/:aid': {
				name:'activityMag',
				component: require('./views/activityMag.vue')
			},
			//��б�
			'/topic': {
				component: require('./views/topic.vue')
			},
			
			//�޸�����
			'/system': {
				component: require('./views/system.vue')
			},
			//�����
			'/actdata/:aid': {
				name:'actdata',
				component: require('./views/actdata.vue')
			},
			
			
		}

	},
	//��¼
	'/login': {
		component: require('./views/login.vue')
	}
})

router.redirect({
	'*': '/',
	'/':'/activity'
})

router.start(require('./views/App.vue'), '#app')