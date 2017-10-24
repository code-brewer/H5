import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import HomePage from './views/Music.vue'

let Music = Vue.extend(HomePage)

init = function() {
	new Music({
		el: 'app'
	})
}