import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import HomePage from './views/Vip.vue'

let Vip = Vue.extend(HomePage)

init = function() {
	new Vip({
		el: 'app'
	})
}