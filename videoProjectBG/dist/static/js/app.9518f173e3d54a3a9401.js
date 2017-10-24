webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Login__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Login___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Login__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Home__);





__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Login',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Login___default.a
  }, {
    path: '/Home',
    name: 'Home',
    component: __WEBPACK_IMPORTED_MODULE_3__components_Home___default.a
  }]
}));

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(12)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(17),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      columns5: [{
        title: '序号',
        key: 'num',
        sortable: true
      }, {
        title: '测试时间',
        key: 'time',
        sortable: true
      }, {
        title: 'IP地址',
        key: 'ip'
      }, {
        title: '视频源位置',
        key: 'place'
      }, {
        title: '视频大小/时长',
        key: 'size',
        sortable: true
      }, {
        title: '测试浏览器',
        key: 'browser'
      }, {
        title: '测试得分',
        key: 'code',
        sortable: true
      }],
      data5: [{
        num: '1',
        time: "2017.6.23  15:39:12",
        ip: '192.11.6.01',
        place: '广州天河',
        size: '30M/130s',
        browser: 'chrome',
        code: '50'
      }, {
        num: '2',
        time: "2017.6.24  15:39:12",
        ip: '192.11.1.01',
        place: '广州天河',
        size: '30M/130s',
        browser: 'IE',
        code: '80'
      }, {
        num: '2',
        time: "2017.6.24  15:39:12",
        ip: '192.11.1.01',
        place: '广州天河',
        size: '50M/130s',
        browser: 'IE',
        code: '80'
      }, {
        num: '2',
        time: "2017.6.24  15:39:12",
        ip: '192.11.1.01',
        place: '广州天河',
        size: '30M/130s',
        browser: 'IE',
        code: '80'
      }, {
        num: '2',
        time: "2017.6.24  15:39:12",
        ip: '192.11.1.01',
        place: '广州天河',
        size: '30M/130s',
        browser: 'IE',
        code: '80'
      }, {
        num: '2',
        time: "2017.6.24  15:39:12",
        ip: '192.11.1.01',
        place: '广州天河',
        size: '30M/130s',
        browser: 'IE',
        code: '80'
      }],
      formItem: {
        number1: '',
        number2: '',
        browser: '',
        ip: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date1: '',
        date2: '',
        slider: [20, 50],
        textarea: ''
      },
      spanLeft: 4,
      spanRight: 20
    };
  },
  computed: {
    iconSize() {
      return this.spanLeft === 4 ? 14 : 24;
    }
  },
  methods: {
    toggleClick() {
      if (this.spanLeft === 4) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 4;
        this.spanRight = 20;
      }
    }
  }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [{
          required: true,
          message: '请填写用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请填写密码',
          trigger: 'blur'
        }, {
          type: 'string',
          min: 6,
          message: '密码长度不能小于6位',
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('登录成功!');
          this.$router.push({
            path: '/Home'
          });
        } else {
          this.$Message.error('表单验证失败!');
        }
      });
    }
  }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iview__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_iview__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_iview_dist_styles_iview_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_iview_dist_styles_iview_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_iview_dist_styles_iview_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_css_reset_css__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__assets_css_reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__assets_css_reset_css__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.






__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_iview___default.a);
/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(11)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(16),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-784a74da",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(13)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(18),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a22de604",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "layout",
    class: {
      'layout-hide-text': _vm.spanLeft < 4
    }
  }, [_vm._m(0), _vm._v(" "), _c('Row', {
    attrs: {
      "type": "flex"
    }
  }, [_c('i-col', {
    staticClass: "layout-menu-left",
    attrs: {
      "span": _vm.spanLeft
    }
  }, [_c('Menu', {
    attrs: {
      "active-name": "1",
      "theme": "dark",
      "width": "auto"
    }
  }, [_c('Menu-item', {
    attrs: {
      "name": "1"
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-navigate",
      "size": _vm.iconSize
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "layout-text"
  }, [_vm._v("数据管理")])], 1)], 1)], 1), _vm._v(" "), _c('i-col', {
    attrs: {
      "span": _vm.spanRight
    }
  }, [_c('div', {
    staticClass: "layout-header",
    staticStyle: {
      "float": "left",
      "height": "45px",
      "margin-left": "15px"
    }
  }, [_c('i-button', {
    attrs: {
      "type": "text"
    },
    on: {
      "click": _vm.toggleClick
    }
  }, [_c('Icon', {
    attrs: {
      "type": "navicon",
      "size": "32"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "layout-breadcrumb",
    staticStyle: {
      "text-align": "left",
      "margin-left": "70px"
    }
  }, [_c('Breadcrumb', [_c('Breadcrumb-item', {
    attrs: {
      "href": ""
    }
  }, [_vm._v("首页")]), _vm._v(" "), _c('Breadcrumb-item', {
    attrs: {
      "href": ""
    }
  }, [_vm._v("数据管理")])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "layout-content"
  }, [_c('div', {
    staticClass: "layout-content-main"
  }, [_c('Form', {
    attrs: {
      "model": _vm.formItem,
      "label-width": 80
    }
  }, [_c('Form-item', {
    attrs: {
      "label": "测试时间:"
    }
  }, [_c('Row', [_c('Col', {
    attrs: {
      "span": "5"
    }
  }, [_c('Date-picker', {
    attrs: {
      "type": "date",
      "placeholder": "选择日期"
    },
    model: {
      value: (_vm.formItem.date1),
      callback: function($$v) {
        _vm.formItem.date1 = $$v
      },
      expression: "formItem.date1"
    }
  })], 1), _vm._v(" "), _c('Col', {
    staticStyle: {
      "text-align": "right",
      "padding-right": "10px"
    },
    attrs: {
      "span": "4"
    }
  }, [_vm._v(" 测试浏览器:\n                ")]), _vm._v(" "), _c('Col', {
    attrs: {
      "span": "5"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "请输入"
    },
    model: {
      value: (_vm.formItem.browser),
      callback: function($$v) {
        _vm.formItem.browser = $$v
      },
      expression: "formItem.browser"
    }
  })], 1), _vm._v(" "), _c('Col', {
    staticStyle: {
      "text-align": "right",
      "padding-right": "10px"
    },
    attrs: {
      "span": "3"
    }
  }, [_vm._v(" IP地址:\n                ")]), _vm._v(" "), _c('Col', {
    attrs: {
      "span": "5"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "请输入"
    },
    model: {
      value: (_vm.formItem.ip),
      callback: function($$v) {
        _vm.formItem.ip = $$v
      },
      expression: "formItem.ip"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('Form-item', {
    attrs: {
      "label": "测试得分:"
    }
  }, [_c('Row', [_c('Col', {
    attrs: {
      "span": "5"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "请输入"
    },
    model: {
      value: (_vm.formItem.number1),
      callback: function($$v) {
        _vm.formItem.number1 = $$v
      },
      expression: "formItem.number1"
    }
  })], 1), _vm._v(" "), _c('Col', {
    staticStyle: {
      "text-align": "center"
    },
    attrs: {
      "span": "2"
    }
  }, [_vm._v("-")]), _vm._v(" "), _c('Col', {
    attrs: {
      "span": "5"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "请输入"
    },
    model: {
      value: (_vm.formItem.number2),
      callback: function($$v) {
        _vm.formItem.number2 = $$v
      },
      expression: "formItem.number2"
    }
  })], 1), _vm._v(" "), _c('Col', {
    attrs: {
      "span": "5"
    }
  }, [_c('Button', {
    attrs: {
      "type": "primary"
    }
  }, [_vm._v("搜索")])], 1)], 1)], 1)], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding-bottom": "0"
    }
  }, [_c('Table', {
    attrs: {
      "border": "",
      "columns": _vm.columns5,
      "data": _vm.data5
    }
  })], 1), _vm._v(" "), _c('Page', {
    staticStyle: {
      "margin-top": "50px",
      "padding-bottom": "20px"
    },
    attrs: {
      "total": 100,
      "show-total": ""
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "layout-copy"
  }, [_vm._v("\n        Copyright©1999-2017 中国联通 版权所有\n      ")])])], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bg"
  }, [_c('h2', {
    staticStyle: {
      "width": "20%",
      "float": "left"
    }
  }, [_vm._v("H5网络视频测试后台")]), _vm._v(" "), _c('p', {
    staticStyle: {
      "width": "80%",
      "float": "left",
      "text-align": "right",
      "font-size": "15px"
    }
  }, [_c('span', {
    staticStyle: {
      "margin-right": "30px",
      "font-weight": "700"
    }
  }, [_vm._v("user_name")]), _vm._v(" "), _c('a', {
    staticStyle: {
      "margin-right": "30px",
      "font-weight": "700"
    }
  }, [_vm._v("退出")])])])
}]}

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "40%",
      "height": "300px",
      "margin": "0 auto",
      "box-shadow": "3px 3px 20px #ddd",
      "border-radius": "10px"
    }
  }, [_c('Form', {
    ref: "formInline",
    staticStyle: {
      "width": "50%",
      "margin": "0 auto",
      "margin-top": "80px",
      "padding-top": "35px"
    },
    attrs: {
      "model": _vm.formInline,
      "rules": _vm.ruleInline,
      "block": ""
    }
  }, [_c('div', {
    staticStyle: {
      "margin-bottom": "45px"
    }
  }, [_c('h1', [_vm._v("H5网络视频测试后台")])]), _vm._v(" "), _c('Form-item', {
    staticStyle: {
      "width": "90%",
      "margin-left": "10px"
    },
    attrs: {
      "prop": "user"
    }
  }, [_c('Input', {
    attrs: {
      "type": "text",
      "placeholder": "Username"
    },
    model: {
      value: (_vm.formInline.user),
      callback: function($$v) {
        _vm.formInline.user = $$v
      },
      expression: "formInline.user"
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-person-outline"
    },
    slot: "prepend"
  })], 1)], 1), _vm._v(" "), _c('Form-item', {
    staticStyle: {
      "width": "90%",
      "margin-left": "10px"
    },
    attrs: {
      "prop": "password"
    }
  }, [_c('Input', {
    attrs: {
      "type": "password",
      "placeholder": "Password"
    },
    model: {
      value: (_vm.formInline.password),
      callback: function($$v) {
        _vm.formInline.password = $$v
      },
      expression: "formInline.password"
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-locked-outline"
    },
    slot: "prepend"
  })], 1)], 1), _vm._v(" "), _c('Form-item', [_c('Button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.handleSubmit('formInline')
      }
    }
  }, [_vm._v("登录")])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ })
],[10]);