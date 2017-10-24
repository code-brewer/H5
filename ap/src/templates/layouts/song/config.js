import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from '../../../utils'
import route from './route.js'
import jQuery from 'jquery'
import '../../../components/resizeable/jquery.resizeable'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

var store = {
  state: {
    showANum: true
  }
}
Vue.extend(store);

export var router = new VueRouter()
var newRoute = {},
	myRoute = {
	'/': {
		component: require('./views/home.config.vue')
	},
  	'/game': {
	    component: require('./views/game.config.vue')
  	}
	 ,'/success/:type/:score': {
		component: require('./views/success.config.vue')
	},
	 '/fail/:type/:score': {
		component: require('./views/fail.config.vue')
	},
	'receive/:g/:n': {
		name: 'receive',
		component: require('../../components/receive-new/receive.config.vue')
	},
	'receive-success/:g': {
		name: 'receive-success',
		component: require('../../components/receive-success/receive-success.config.vue')
	},
	'/prize': {
		component: require('../../components/my-prize-list-new/my-prize-list.config.vue')
	},
	'/unprize': {
		component: require('../../components/my-prize-list-new/my-unprize-list.config.vue')
	},
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
Vue.directive('resizeable', {
	data:{},
	bind(){
		Vue.nextTick(()=> {
			jQuery(this.el).resizeable.call(this,this.data);
		})
	},update(v){
		this.data=v;
	}
});
window.wap = output;
