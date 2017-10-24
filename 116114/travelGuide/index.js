import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource)

import App from './App.vue'
import Home from './Home.vue'
import Edit from './Edit.vue'
import ActivityMag from './ActivityMag.vue'
import List from './List.vue'
import Vote from './Vote.vue'
import Join from './Join.vue'

export var router = new VueRouter();
router.map({
    '/home': {
        component: Home
    },
    '/edit': {
        component: Edit
    },
    '/activityMag': {
        component: ActivityMag
    },
    '/list/:id': {
        component: List
    },
    '/vote/:id': {
        name: 'vote',
        component: Vote
    },
    '/join/:id': {
        name: 'join',
        component: Join
    }
})
router.redirect({
    '*': '/home'
})
router.start(App, '#iframe');