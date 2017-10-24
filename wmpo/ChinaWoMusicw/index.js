import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource)

import App from './App.vue'
import Home from './Home.vue'
import You from './you.vue'




export var router = new VueRouter();

router.map({
    '/home': {
        component: Home
    },
     '/you': {
        component: You
    },
   
})

router.redirect({
    '*': '/home'
})

// export var activityInfo;

router.start(App, '#iframe');
