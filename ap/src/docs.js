import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import AwesomeSwiper from 'vue-awesome-swiper'
 

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(AwesomeSwiper)

require('prismjs')
require('../src/js/showLanguage')
require('../src/js/directive')



import Doc from './Doc'
import Intro from './views/docs/Intro.vue'
import Component from './views/docs/Component.vue'
import OtherComponent from './views/docs/OtherComponent.vue'
import wapComponent from './views/docs/wapComponent.vue'
import criterion from './views/docs/criterion.vue'
export var router = new VueRouter()

router.map({
	'/': {
		component: Intro
	},
	'/component/': {
		component: Component
	},
	'/other-component': {
		component: OtherComponent
	},
	'/wap-component': {
		component: wapComponent
	},
	'/criterion': {
		component: criterion
	}
})

router.redirect({
	'*': '/'
})

router.start(Doc, 'app')
