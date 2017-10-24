import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueBus from 'vue-bus';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(MintUI)
Vue.use(Router)
Vue.use(VueBus);

Date.prototype.format = function(format) {
        if (!format) {
            format = 'yyyy-MM-dd';
        }
        var month = this.getMonth() + 1,
            date = this.getDate(),
            hours = this.getHours(),
            minutes = this.getMinutes(),
            seconds = this.getSeconds(),
            str = format
            .replace(/yyyy/, this.getFullYear())
            .replace(/MM/, (month > 9 ? '' : '0') + month)
            .replace(/dd/, (date > 9 ? '' : '0') + date)
            .replace(/HH/, (hours > 9 ? '' : '0') + hours)
            .replace(/mm/, (minutes > 9 ? '' : '0') + minutes)
            .replace(/ss/, (seconds > 9 ? '' : '0') + seconds);
        return str;
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
