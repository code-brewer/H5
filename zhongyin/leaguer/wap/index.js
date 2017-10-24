import store from './init.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

//Vue.http.options.emulateJSON = true;

export var router = new VueRouter()

router.map({
    '/': {
        component: require('./views/home.vue')
    },
    '/home': {
    	component: require('./views/home.vue')
    },
    '/hyjs': {
    	component: require('./views/introduce.vue')
    },
    '/kthy': {
    	component: require('./views/openvip.vue')
    },
    '/hdzb': {
    	component: require('./views/live.vue')
    },
    '/wyy': {
    	component: require('./views/home.vue')
    }
})

router.redirect({
    '*': '/home'
})

init = function() {
    window.memberinfo = store
    router.start(require('./views/App.vue'), 'app')
}
