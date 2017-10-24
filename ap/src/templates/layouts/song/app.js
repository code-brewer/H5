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
	},
	'/game': {
		name: 'game',
		component: require('./views/game.vue')
	},
	'/success': {
		name: 'success',
		component: require('./views/success.vue')
	},
	'/fail': {
		name: 'fail',
		component: require('./views/fail.vue')
	},
	'receive/:gid': {
		name: 'receive',
		component: require('../../components/receive-new/receive.vue')
	},
	'receive-success/:g': {
		name: 'receive-success',
		component: require('../../components/receive-success/receive-success.vue')
	},
	'/prize': {
		name: 'prize',
		component: require('../../components/my-prize-list-new/my-prize-list.vue')
	},
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
