import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

export var router = new VueRouter()

router.map({
	'/': {
		component: require('./views/Home.vue')
	},
	'/result/:word': {
		name: 'result',
		component: require('./views/Result.vue')
	},
	'/result-shoptypefather/:fid/:name': {
		name: 'result-shoptypefather',
		component: require('./views/Result.vue')
	},
	'/result-shoptype/:id/:name': {
		name: 'result-shoptype',
		component: require('./views/Result.vue')
	},
	'/list': {
		component: require('./views/List.vue')
	},
	'/location': {
		name: 'location',
		component: require('./views/Location.vue')
	}
})

router.redirect({
	'*': '/'
})

init = function() {
	router.start(require('./views/App.vue'), 'app')
}