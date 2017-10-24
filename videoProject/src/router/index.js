import Vue from 'vue'
import Router from 'vue-router'
import Flash from '@/view/Flash'
import Home from '@/view/Home'
import End from '@/view/End'
import Grade from '@/view/Grade'
import Lottery from '@/view/Lottery'
import ShareAfter from '@/view/ShareAfter'
import AllEnd from '@/view/AllEnd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/Home/Flash',
      name: 'Flash',
      component: Flash
    }, {
      path: '/Home/Flash/End',
      name: 'End',
      component: End
    }, {
      path: '/Home/Flash/End/Grade',
      name: 'Grade',
      component: Grade
    }, {
      path: '/Home/Flash/End/Grade/Lottery',
      name: 'Lottery',
      component: Lottery
    }, {
      path: '/AllEnd',
      name: 'AllEnd',
      component: AllEnd
    }, {
      path: '/ShareAfter',
      name: 'ShareAfter',
      component: ShareAfter
    }
  ]
})
