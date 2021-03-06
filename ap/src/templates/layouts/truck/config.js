import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from '../../../utils'
import route from './route.js'
import jQuery from 'jquery'
import '../../../components/resizeable/jquery.resizeable'

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
	 '/game-one': {
	 	component: require('./views/game-one.config.vue')
	 },
	 '/game-two': {
	 	component: require('./views/game-two.config.vue')
	 },
	 '/game-three': {
	 		component: require('./views/game-three.config.vue')
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