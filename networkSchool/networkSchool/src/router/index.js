import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/Home'
import suggest from '@/views/suggest'//意见投诉
import getSuggest from '@/views/getSuggest'//意见投诉提交
import enroll from '@/views/enroll'//学堂报名
import forum from '@/views/forum'//学堂论坛
import forumpost from '@/views/forumpost'//学堂论坛
import forumDetail from '@/views/forumDetail'//学堂论坛
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: suggest
    },
    {
      path: '/getSuggest',
      name: 'getSuggest',
      component: getSuggest
    },
    {
      path: '/enroll',
      name: 'Enroll',
      component: enroll
    },
    {
      path: '/forum',
      name: 'forum',
      component: forum
    },
    {
      path: '/forumDetail/:forumId',
      name: 'forumDetail',
      component: forumDetail
    },
    {
      path: '/forumpost',
      name: 'forumpost',
      component: forumpost
    }
  ]
})
