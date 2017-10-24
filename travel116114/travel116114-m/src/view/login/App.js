import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import axios from 'axios'
Vue.prototype.$ajax = axios
import VueBus from 'vue-bus';
// import axios from 'axios'
// Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.use(VueBus);

new Vue({
  el: '#app',
  render: h => h(App)
})
