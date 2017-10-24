// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '././assets/css/Reset.css'
import '././assets/css/Default.css'
// import iView from 'iview'//全局加载
import 'iview/dist/styles/iview.css'
Vue.use(VueAxios, axios)
// Vue.use(iView);//全局加载
Vue.config.productionTip = false;
//全局配置请求前缀
Vue.axios.defaults.baseURL = basePath;//设置跨域请求的时候要注释掉 打包时要解开

/* eslint-disable no-new */
new Vue({el: '#app', router, template: '<App/>', components: {
    App
  }})
