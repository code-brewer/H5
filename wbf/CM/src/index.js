import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource)

import App from './App.vue'
import Home from './Home.vue'
import Rule from './Rule.vue'
import Game from './Game.vue'

export var router = new VueRouter();

router.map({
    '/home': {
        component: Home
    },
    '/rule': {
        component: Rule
    },
    '/game': {
        name:'game',
        component: Game
    }
})

router.redirect({
    '*': '/home'
})

// export var activityInfo;

router.start(App, '#iframe');
