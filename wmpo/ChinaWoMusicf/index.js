import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource)

import App from './App.vue'
import Home from './Home.vue'
import Marquee from './Marquee.vue'
import Guess from './Guess.vue'
import Success from './Success.vue'
import Fail from './fail.vue'



export var router = new VueRouter();

router.map({
    '/home': {
        component: Home
    },
    '/guess': {
        component: Guess
    },
    '/marquee': {
        component: Marquee
    },
    '/success/:score': {
        name: 'success',
        component: Success
    },
    '/fail': {
        component: Fail
    },
})

router.redirect({
    '*': '/home'
})

// export var activityInfo;

router.start(App, '#iframe');
