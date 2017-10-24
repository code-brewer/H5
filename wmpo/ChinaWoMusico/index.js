import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource)

import App from './App.vue'
import Home from './Home.vue'
import Marquee from './Marquee.vue'
import Guess from './Guess.vue'
import wxpage from './wxpage.vue'
import ChristmasBells from './ChristmasBells.vue'



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
    '/wxpage': {
        component: wxpage
    },
    '/bells': {
        component: ChristmasBells
    },
})

router.redirect({
    '*': '/home'
})

// export var activityInfo;

router.start(App, '#iframe');
