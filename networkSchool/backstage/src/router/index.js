import Vue from 'vue';
import Router from 'vue-router';
import VueBus from 'vue-bus';
Vue.use(Router);
Vue.use(VueBus);
var router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/learnSchool',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/LearnSchool.vue'], resolve)
                },
                // {
                //     path: '/signin',
                //     component: resolve => require(['../components/page/SignIn.vue'], resolve)
                // },
                {
                    path: '/video',
                    component: resolve => require(['../components/page/Video.vue'], resolve)
                },
                {
                    path: '/ppt',
                    component: resolve => require(['../components/page/PPT.vue'], resolve)
                },
                {
                    path: '/questionnaireSurvey',
                    component: resolve => require(['../components/page/QuestionnaireSurvey.vue'], resolve)
                },
                {
                    path: '/feedback',
                    component: resolve => require(['../components/page/Feedback.vue'], resolve)
                },
                {
                    path: '/interaction',
                    component: resolve => require(['../components/page/Interaction.vue'], resolve)
                }
                
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
router.beforeEach((to, from, next) => {
    if (to.fullPath==='/login'){
        next()
    }
    else {
        var login =  window.sessionStorage.getItem('ms_username')
        if (login) next()
        else  window.location.href = '/login'
    }
})


export default router