import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

import APP from '../view/app-login.vue'
import main from '../component/main.vue'
import login from '../component/login-panel.vue'

export var router = new VueRouter()

router.map({
	'/login': {
		component: login
	},
	'/main': {
		component: main
	},
})

router.redirect({
	'*': '/login'
})

router.start(APP, 'app')

