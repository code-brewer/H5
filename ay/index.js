import Vue from 'vue'

import VueResource from 'vue-resource'

Vue.use(VueResource)

var App = Vue.extend(require('./App.vue'))


// init = function() {
	
// }

startApp = function() {
	new App({
		el: 'app'
	})
};