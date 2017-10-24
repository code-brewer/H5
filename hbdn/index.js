import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource)

import App from './App.vue'
import Home from './Home.vue'
import Marquee from './Marquee.vue'
import Guess from './Guess.vue'




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
    }
})

router.redirect({
    '*': '/home'
})

// export var activityInfo;
// router.beforeEach(function ({ to, next }) {
//     console.log(to)
//     console.log('---------------')
//     console.log(next)

// })

router.start(App, 'app');
