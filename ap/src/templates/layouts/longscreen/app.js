import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import utils from '../../../utils'
import route from './route.js'

Vue.use(VueRouter)
Vue.use(VueResource)

export var router = new VueRouter()

var myRoute = {
	'/': {
		component: require('./views/home.vue')
	}
};

let output = {
	start: function() {
		router.start(require('./App.vue'), '#wap')
	},
	route: route
}

router.map(myRoute)

router.redirect({
	'*': '/'
})

window.store.activityConfig = JSON.parse(window.store.configData.extbody)

if(typeof init === 'function') {
	init = () => {
		output.start()
	}
}
