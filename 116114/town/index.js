import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.filter('dateFormat', function (value) {
	console.log(value)
  return new Date(value).format('yyyy-MM-dd HH:mm');
})


//Vue.http.options.emulateJSON = true;

export var router = new VueRouter()

router.map({
	//首页
	'/': {
		component: require('./views/index.vue')
	},
	'/detail/:id': {
		component: require('./views/detail.vue')
	},
	'/personalcenter': {
		component: require('./views/personalcenter.vue')
	},
	'/fatie': {
		component: require('./views/fatie.vue')
	},
	'/noexist': {
		component: require('./views/noexist.vue')
	}
})

router.redirect({
	'*': '/'
})


router.start(require('./views/App.vue'), 'app')
