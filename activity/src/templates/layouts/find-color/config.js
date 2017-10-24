import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from '../../../utils'
import route from './route.js'
import jQuery from 'jquery'

Vue.use(VueRouter)

export var router = new VueRouter()
var newRoute = {},
	myRoute = {
	'/': {
		component: require('./views/home.config.vue')
	},
	'/activity': {
		component: require('./views/activity.config.vue')
	},
	'/success/:type/:score': {
		name: 'success',
		component: require('../../components/success/success-base.config.vue')
	},
	'/rank': {
		component: require('../../components/rank/rank.config.vue')
	},
	'/rank': {
		component: require('../../components/rank/rank.config.vue')
	},
	'receive/:g/:n': {
		name: 'receive',
		component: require('../../components/receive/receive.config.vue')
	},
	'receive-success/:g': {
		name: 'receive-success',
		component: require('../../components/receive-success/receive-success.config.vue')
	},
	'/prize': {
		component: require('../../components/my-prize-list/my-prize-list.config.vue')
	}
};

for (var key = 0; key < route.length; key++) {
	for (var k in myRoute) {
		if(key===k) {
			newRoute[k] = {
				name: route[key].name,
				component: myRoute[k].component
			}
		}
	}
}

router.map(myRoute)

router.redirect({
	'*': '/'
})

let output =  {
	start: function() {
		router.start(require('./App.config.vue'), '#wap')
	},
	route: route,
	condition: require('./condition.vue')
	
}

let init = init || {}

if(typeof init === 'function') {
	output.start()
}


module.exports = output;

window.wap = output;