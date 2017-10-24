import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

//Vue.http.options.emulateJSON = true;

export var router = new VueRouter()

router.map({
	'/': {
		component: require('./views/sign.vue')
	},
	'/lottery': {
		component: require('./views/lottery.vue')
	},
	'/list': {
		component: require('./views/list.vue')
	},
	'/share': {
		component: require('./views/share.vue')
	}
})

router.redirect({
	'*': '/'
	// '/': '/sign'
})

router.start(require('./views/App.vue'), 'app')