import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource)

import App from './App.vue'
import Home from './Home.vue'
import Guess from './Guess.vue'
import Fail from './fail.vue'
import Data from './data.vue'



export var router = new VueRouter();

router.map({
    '/home': {
        component: Home
    },
    '/guess': {
        component: Guess
    },
    '/sign': {
        component: Fail
    },
    '/data': {
        component: Data
    },
})

router.redirect({
    '*': '/home'
})

// export var activityInfo;

router.start(App, '#iframe');
