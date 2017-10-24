import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import commonMethods from './utils/commonMethods.js'
// var vConsole = require('vconsole');
Vue.use(VueRouter)
Vue.use(VueResource)

//Vue.http.options.emulateJSON = true;

export var router = new VueRouter()

router.map({
    '/': {
       component: require('./views/phoneLogin.vue')
    },
    '/home/': {
    	component: require('./views/home.vue')
    },
    '/search/:id' : {
    	component: require('./views/search.vue')
    },
    '/compare/' : {
        component: require('./views/compare.vue')
    },
     '/discount/' : {
        component: require('./views/discount.vue')
    },
    '/searchResult/:id' : {
         component: require('./views/searchResult.vue')
    },
    '/login/' : {
         component: require('./views/login.vue')
    },
     '/phoneLogin': {
        component: require('./views/phoneLogin.vue'),
    },
    '/phoneLogin/register': {
                component: require('./views/register.vue')
    },
    '/phoneLogin/reset': {
                component: require('./views/reset.vue')
    },
    '/phoneLogin/onloadreset': {
                component: require('./views/onloadreset.vue')
    },

    '/allDiscount/:id' : {
         component: require('./views/allDiscount.vue')
    },
    '/myCenter/' : {
         component: require('./views/myCenter.vue')
    },
   
})

router.redirect({
    '*': '/'
})

router.beforeEach(function ({ to, next }) {
  if (to.path=='/'||to.path.indexOf('/phoneLogin')=== -1) {
    if(commonMethods.getId()&&commonMethods.getNumber1()||to.path=='/'){
        return true;
    }else {
        return  false;
    }
  } else {
    next()
  }
})



init = function() {
    router.start(require('./views/App.vue'), 'app')
}
