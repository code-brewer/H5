import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import HomePage from './views/Home.vue'

let Home = Vue.extend(HomePage)

init = function() {
	new Home({
		el: 'app'
	})
}