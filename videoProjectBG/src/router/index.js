import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import PriceList from '@/components/PriceList'

// import CanvasList1 from '@/components/canvas/list1'
// import CanvasList2 from '@/components/canvas/list2'
// import CanvasList3 from '@/components/canvas/list3'

import join100 from '@/components/list/join100'
import join500 from '@/components/list/join500'
import success100 from '@/components/list/success100'
import success500 from '@/components/list/success500'
import pv from '@/components/list/pv'
import uv from '@/components/list/uv'

import UserChangePwd from '@/components/user/changepwd'
import UserProfile from '@/components/user/profile'
import Ulist1 from '@/components/user/list1'
import Ulist2 from '@/components/user/list2'
import Ulist3 from '@/components/user/list3'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
// mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      component: Home,
      name: '数据管理',
      menuShow: true,
      iconCls: 'iconfont icon-home',
      children: [
        {path: '/dashboard', component: Dashboard, name: '参与情况表', menuShow: true},
        {path: '/PriceList', component: PriceList, name: '领取奖品明细表', menuShow: true},
        {path: '/list', id:"second", name: '渠道明细表', menuShow: true},
        {path: '/list/join100', component: join100},
        {path: '/list/join500', component: join500},
        {path: '/list/success100', component: success100},
        {path: '/list/success500', component: success500},
        {path: '/list/pv', component: pv},
        {path: '/list/uv', component: uv}
      ],
      team:[
        {path: '/list/join100', component: join100, name: '参与领取100m情况', menuShow: true},
        {path: '/list/join500', component: join500, name: '参与领取500m情况', menuShow: true},
        {path: '/list/success100', component: success100, name: '成功领取100m情况', menuShow: true},
        {path: '/list/success500', component: success500, name: '成功领取500m情况', menuShow: true},
        {path: '/list/pv', component: pv, name: '(pv)', menuShow: true},
        {path: '/list/uv', component: uv, name: '(uv)', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '系统管理',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/user/profile', component: UserProfile, name: '人员管理', menuShow: true},
        {path: '/user', id:'secondOther', name: '日志管理', menuShow: true},
        {path: '/user/Ulist1', component: Ulist1, name: '操作日志'},
        {path: '/user/Ulist2', component: Ulist2, name: '登录日志'},
        {path: '/user/Ulist3', component: Ulist3, name: '异常日志'}
      ],
      teamOther:[
        {path: '/user/Ulist1', component: Ulist1, name: '操作日志', menuShow: true},
        {path: '/user/Ulist2', component: Ulist2, name: '登录日志', menuShow: true},
        {path: '/user/Ulist3', component: Ulist3, name: '异常日志', menuShow: true}
      ]
    },
    // 示咧⬇️
    // {
    //   path: '/',
    //   name: '参与情况表',
    //   component: Home,//根组件
    //   redirect: '/dashboard',
    //   leaf: true, // 只有一个节点
    //   menuShow: true,
    //   iconCls: 'iconfont icon-home', // 图标样式class
    //   children: [
    //     {path: '/dashboard', component: Dashboard, name: '参与情况表', menuShow: true}
    //   ]
    // },
    // {
    //   path: '/',
    //   component: Home,
    //   name: '渠道明细表',
    //   menuShow: true,
    //   iconCls: 'iconfont icon-books',
    //   children: [
    //     {path: '/canvas/list1', component: CanvasList1, name: '基本绘制', menuShow: true},
    //     {path: '/canvas/list2', component: CanvasList2, name: '简单动画', menuShow: true},
    //     {path: '/canvas/list3', component: CanvasList3, name: '贪吃蛇', menuShow: true}
    //   ]
    // },
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.sessionStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
