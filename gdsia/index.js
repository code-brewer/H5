         
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import AdminPage from './views/Admin.vue'
import UserPage from './views/List.vue'  //用户管理
import UserPwdPage from './views/Edit.vue' //用户密码修改
import OneMenu from './views/One.vue'
import TwoMenu from './views/Two.vue'
import links from './views/links.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

export var router = new VueRouter()

router.map({
	
	'/list/:id':{
		name: 'list',
		component:UserPage
	},
	'/edit/:id':{
		name: 'edit',
		component:UserPwdPage
	},
	'/one-menu':{
		component:OneMenu
	},
	'/two-menu/:id':{
		name: 'two-menu',
		component:TwoMenu
	},
	'links': {
		component: links
	}

})

router.redirect({
	'*': '/one-menu'
})


router.start(AdminPage, '#ams');
