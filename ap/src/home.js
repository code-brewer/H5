import Vue from 'vue'

var Home = Vue.extend(require('./Home.vue'))

import VueResource from 'vue-resource'

Vue.use(VueResource)

new Home({
	el: 'app'
})