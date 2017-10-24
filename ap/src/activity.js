import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.filter('Between', function (value, attr, begin, end) {
  var arr = [];
  if (Object.prototype.toString.call(value).indexOf("Array") != -1) {
    for (var i = 0; i < value.length; i++) {
      if (begin < value[i][attr] && value[i][attr] < end) {
        arr.push(value[i]);
      }
    }
  }
  this.pagerConfig.total = arr.length;
  this.pageList = arr;
  this.filterList = arr;
  return arr;
})

Vue.filter('GetfilterList', function (value, config, listName) {
  var arr = [];
  if (Object.prototype.toString.call(value).indexOf("Array") != -1) {
    for (var i = 0; i < value.length; i++) {
      arr.push(value[i]);
    }
  }
  this[config].total = arr.length;
  this[listName] = arr;
  return arr;
})

window.getParams = function () {
  if (window.location.search.length == 0) return {};
  var param = window.location.search.substring(1),
    newObj = {};
  if (param.length != 0) {
    var item = param.split("&");
    for (var i = 0; i < item.length; i++) {
      var key = item[i].substring(0, item[i].indexOf("=")),
        value = decodeURIComponent(item[i].substring(item[i].indexOf("=") + 1));
      newObj[key] = value;
    }
  }
  return newObj;
}

let Activity = ''
switch (window.getParams().jspath) {
  case 'song': // 猜歌配置;
    // window.store = gb
    require.ensure([], (require) => {
      window.store = require('./globals/song').default
      Activity = Vue.extend(require('./Activity.vue'))
      new Activity({
        el: 'app'
      })
    })
    break
  case 'longscreen': // 歌单长屏配置
    require.ensure([], (require) => {
      window.store = require('./globals/longscreen').default
      Activity = Vue.extend(require('./Activity.vue'))
      new Activity({
        el: 'app'
      })
    })
    break
   case 'shortscreen': // 歌单短屏配置
    require.ensure([], (require) => {
      window.store = require('./globals/shortscreen').default
      Activity = Vue.extend(require('./Activity.vue'))
      new Activity({
        el: 'app'
      })
    })
    break
  default: // 活动默认配置
    require.ensure([], (require) => {
      window.store = require('./globals/common').default
      Activity = Vue.extend(require('./Activity.vue'))
      new Activity({
        el: 'app'
      })
    })
}
