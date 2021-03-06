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
	'/activity': {
		component: require('./views/activity.vue')
	},
	'/success/:type/:score': {
		name: 'success',
		component: require('../../components/success/success-base.vue')
	},
	'/rank': {
		name:"rank",
		component: require('../../components/rank/rank.vue')
	},
	'receive/:g/:n': {
		name: 'receive',
		component: require('../../components/receive/receive.vue')
	},
	'receive-success/:g': {
		name: 'receive-success',
		component: require('../../components/receive-success/receive-success.vue')
	},
	'/prize': {
		component: require('../../components/my-prize-list/my-prize-list.vue')
	},
};

let output =  {
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
	init = ()=> {
		output.start()
	}
}
