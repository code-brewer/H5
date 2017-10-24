import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
// var vConsole = require('vconsole');
Vue.use(VueRouter)
Vue.use(VueResource)

//Vue.http.options.emulateJSON = true;

export var router = new VueRouter({hashbang: false,history: false})
// export var router = new VueRouter()

router.map({
    '/': {
        component: require('./views/login.vue')
    },
    '/home': {
    	component: require('./views/home.vue'),
        subRoutes : {
            'spending' : {
                component: require('./views/spending.vue'),
            },
            'message' : {
                component: require('./views/message.vue'),
            },
            'statistics' : {
                component: require('./views/statistics.vue'),
            },
            'manage' : {
                component: require('./views/manage.vue'),
                subRoutes : {
                    'log' : {
                        component: require('./views/log.vue'),
                    },
                    'log/:phone' : {
                        component: require('./views/log.vue'),
                    },
                     'detail/:phone' : {
                        component: require('./views/detail.vue'),
                    },
                     'detail2/:phone' : {
                        component: require('./views/detail2.vue'),
                    },
                     'detail1/:phone' : {
                        component: require('./views/detail1.vue'),
                    },
                    'account' : {
                        component: require('./views/account.vue'),
                    }
                }
            },

        }
    },
    '/login/' : {
        component: require('./views/login.vue')
    }
    
})

router.redirect({
    '*': '/'
})

router.beforeEach(function ({ to, next }) {
  if (!window.sessionStorage.getItem('user')) {
    if (to.path==='/'||to.path.indexOf('login')>0) {
        next()
    }
    return false
  } else {
    next()
  }
})


init = function() {
    router.start(require('./views/App.vue'), 'app')
}
