import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		visible: false,
		hasMenu: false
	},
	mutations: {
		'for-button-visible'(state) {
			console.log('v')
			state.hasMenu = true
		},
		'button-visible'(state) {
			state.visible = true
		},
		'button-hide'(state) {
			state.visible = false
		},
		'for-button-hide'(state) {
			console.log('h')
			state.hasMenu = false
		},
	},
	strict: true
})

export default store