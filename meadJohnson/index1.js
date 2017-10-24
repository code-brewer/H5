import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

//Vue.http.options.emulateJSON = true;

export var router = new VueRouter()

router.map({
    '/': {
        component: require('./views/newSignIn.vue')
    },
    /*
    打卡活动
     */
    '/newSignIn': {
        component: require('./views/newSignIn.vue'),
        subRoutes: {
            '/plan': {
                component: require('./views/signIn/plan.vue')
            },
            '/plan/:id': {
                component: require('./views/signIn/plan.vue')
            },
            '/rankingList': {
                component: require('./views/signIn/rankingList.vue')
            }
        }
    },
    '/newSignIn/setUp/:day': {
        component: require('./views/signIn/setUp.vue')
    },
    '/newSignIn/notConcerned/:id': {
        component: require('./views/signIn/notConcerned.vue')
    },
    
})

router.redirect({
    '*': '/'
})

init = function() {
    router.start(require('./views/App.vue'), 'app')
}
