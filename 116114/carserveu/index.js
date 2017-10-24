import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource)

import App from './App.vue'
import Home from './Home.vue'
import Register from './Register.vue'
import Edit from './Edit.vue'
import Oam from './OAM.vue'
import Agreement from './Agreement'

export var router = new VueRouter();
router.map({
    '/home': {
        component: Home
    },
    '/register': {
        component: Register
    },
    '/edit': {
        component: Edit
    },
    '/oam': {
        component: Oam
    },
     '/agreement': {
        component: Agreement
    }
})
router.redirect({
    '*': '/home'
})
router.start(App, '#iframe');