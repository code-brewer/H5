import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource)

import App from './App.vue'
import Home from './Home.vue'
import Marquee from './Marquee.vue'
import wxpage from './wxpage.vue'
import start from './start.vue'



export var router = new VueRouter();

router.map({
    '/home': {
        component: Home
    },
     '/start': {
        component: start
    },
    '/marquee': {
        component: Marquee
    },
    '/wxpage': {
        component: wxpage
    }
})

router.redirect({
    '*': '/start'
})

// export var activityInfo;

router.start(App, '#iframe');
