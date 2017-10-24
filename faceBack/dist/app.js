/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.router = undefined;

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(4);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _vueResource = __webpack_require__(5);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// var vConsole = require('vconsole');
	_vue2.default.use(_vueRouter2.default);
	_vue2.default.use(_vueResource2.default);

	//Vue.http.options.emulateJSON = true;

	var router = exports.router = new _vueRouter2.default({ hashbang: false, history: false });
	// export var router = new VueRouter()

	router.map({
	    '/': {
	        component: __webpack_require__(13)
	    },
	    '/home': {
	        component: __webpack_require__(30),
	        subRoutes: {
	            'spending': {
	                component: __webpack_require__(36)
	            },
	            'message': {
	                component: __webpack_require__(46)
	            },
	            'statistics': {
	                component: __webpack_require__(80)
	            },
	            'manage': {
	                component: __webpack_require__(85),
	                subRoutes: {
	                    'log': {
	                        component: __webpack_require__(89)
	                    },
	                    'log/:phone': {
	                        component: __webpack_require__(89)
	                    },
	                    'detail/:phone': {
	                        component: __webpack_require__(94)
	                    },
	                    'detail2/:phone': {
	                        component: __webpack_require__(99)
	                    },
	                    'detail1/:phone': {
	                        component: __webpack_require__(104)
	                    },
	                    'account': {
	                        component: __webpack_require__(109)
	                    }
	                }
	            }

	        }
	    },
	    '/login/': {
	        component: __webpack_require__(13)
	    }

	});

	router.redirect({
	    '*': '/'
	});

	router.beforeEach(function (_ref) {
	    var to = _ref.to,
	        next = _ref.next;

	    if (!window.sessionStorage.getItem('user')) {
	        if (to.path === '/' || to.path.indexOf('login') > 0) {
	            next();
	        }
	        return false;
	    } else {
	        next();
	    }
	});

	init = function init() {
	    router.start(__webpack_require__(119), 'app');
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Vue.js v1.0.28
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj._digest();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delimited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([^-])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && UA.indexOf('trident') > 0;
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/* istanbul ignore next */
	function isNative(Ctor) {
	  return (/native code/.test(Ctor.toString())
	  );
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc = undefined;

	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var noop = function noop() {};
	    timerFunc = function () {
	      p.then(nextTickHandler);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) setTimeout(noop);
	    };
	  } else if (typeof MutationObserver !== 'undefined') {
	    // use MutationObserver where native Promise is not available,
	    // e.g. IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = setTimeout;
	  }

	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	var _Set = undefined;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = function () {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;

	  var entry = this.get(key, true);
	  if (!entry) {
	    if (this.size === this.limit) {
	      removed = this.shift();
	    }
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var len;
	var index;
	var chr;
	var state;
	var startState = 0;
	var filterState = 1;
	var filterNameState = 2;
	var filterArgState = 3;

	var doubleChr = 0x22;
	var singleChr = 0x27;
	var pipeChr = 0x7C;
	var escapeChr = 0x5C;
	var spaceChr = 0x20;

	var expStartChr = { 0x5B: 1, 0x7B: 1, 0x28: 1 };
	var expChrPair = { 0x5B: 0x5D, 0x7B: 0x7D, 0x28: 0x29 };

	function peek() {
	  return str.charCodeAt(index + 1);
	}

	function next() {
	  return str.charCodeAt(++index);
	}

	function eof() {
	  return index >= len;
	}

	function eatSpace() {
	  while (peek() === spaceChr) {
	    next();
	  }
	}

	function isStringStart(chr) {
	  return chr === doubleChr || chr === singleChr;
	}

	function isExpStart(chr) {
	  return expStartChr[chr];
	}

	function isExpEnd(start, chr) {
	  return expChrPair[start] === chr;
	}

	function parseString() {
	  var stringQuote = next();
	  var chr;
	  while (!eof()) {
	    chr = next();
	    // escape char
	    if (chr === escapeChr) {
	      next();
	    } else if (chr === stringQuote) {
	      break;
	    }
	  }
	}

	function parseSpecialExp(chr) {
	  var inExp = 0;
	  var startChr = chr;

	  while (!eof()) {
	    chr = peek();
	    if (isStringStart(chr)) {
	      parseString();
	      continue;
	    }

	    if (startChr === chr) {
	      inExp++;
	    }
	    if (isExpEnd(startChr, chr)) {
	      inExp--;
	    }

	    next();

	    if (inExp === 0) {
	      break;
	    }
	  }
	}

	/**
	 * syntax:
	 * expression | filterName  [arg  arg [| filterName arg arg]]
	 */

	function parseExpression() {
	  var start = index;
	  while (!eof()) {
	    chr = peek();
	    if (isStringStart(chr)) {
	      parseString();
	    } else if (isExpStart(chr)) {
	      parseSpecialExp(chr);
	    } else if (chr === pipeChr) {
	      next();
	      chr = peek();
	      if (chr === pipeChr) {
	        next();
	      } else {
	        if (state === startState || state === filterArgState) {
	          state = filterState;
	        }
	        break;
	      }
	    } else if (chr === spaceChr && (state === filterNameState || state === filterArgState)) {
	      eatSpace();
	      break;
	    } else {
	      if (state === filterState) {
	        state = filterNameState;
	      }
	      next();
	    }
	  }

	  return str.slice(start + 1, index) || null;
	}

	function parseFilterList() {
	  var filters = [];
	  while (!eof()) {
	    filters.push(parseFilter());
	  }
	  return filters;
	}

	function parseFilter() {
	  var filter = {};
	  var args;

	  state = filterState;
	  filter.name = parseExpression().trim();

	  state = filterArgState;
	  args = parseFilterArguments();

	  if (args.length) {
	    filter.args = args;
	  }
	  return filter;
	}

	function parseFilterArguments() {
	  var args = [];
	  while (!eof() && state !== filterState) {
	    var arg = parseExpression();
	    if (!arg) {
	      break;
	    }
	    args.push(processFilterArg(arg));
	  }

	  return args;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  dir = {};
	  len = str.length;
	  index = -1;
	  chr = '';
	  state = startState;

	  var filters;

	  if (str.indexOf('|') < 0) {
	    dir.expression = str.trim();
	  } else {
	    dir.expression = parseExpression().trim();
	    filters = parseFilterList();
	    if (filters.length) {
	      dir.filters = filters;
	    }
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;
	var formatComponentName = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';

	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };

	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  if (!node) return false;
	  var doc = node.ownerDocument.documentElement;
	  var parent = node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;

	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        // Firefox returns unknown for some "Interactive elements."
	        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el, options);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el, options);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function getIsBinding(el, options) {
	  // dynamic syntax
	  var exp = el.getAttribute('is');
	  if (exp != null) {
	    if (resolveAsset(options, 'components', exp)) {
	      el.removeAttribute('is');
	      return { id: exp };
	    }
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  if (process.env.NODE_ENV !== 'production') {
	    if (child.propsData && !vm) {
	      warn('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child['extends']) {
	    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
	      parent = mergeOptions(parent, mixinOptions, vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */

	var shouldConvert = true;

	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE: isIE,
		isIE9: isIE9,
		isAndroid: isAndroid,
		isIOS: isIOS,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		get _Set () { return _Set; },
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to register itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initData().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression$1(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression$1(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\"']|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

	function noop() {}

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here because the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
	      } else {
	        warn('Invalid expression. ' + 'Generated function body: ' + body);
	      }
	    }
	    return noop;
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression$1(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat literal values as paths
	  !literalValueRE$1.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression$1,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue.length = 0;
	  userQueue.length = 0;
	  has = {};
	  circular = {};
	  waiting = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  var _again = true;

	  _function: while (_again) {
	    _again = false;

	    runBatcherQueue(queue);
	    runBatcherQueue(userQueue);
	    // user watchers triggered more watchers,
	    // keep flushing until it depletes
	    if (queue.length) {
	      _again = true;
	      continue _function;
	    }
	    // dev tool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	    resetBatcherState();
	  }
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	  queue.length = 0;
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression$1(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	var seenObjects = new _Set();
	function traverse(val, seen) {
	  var i = undefined,
	      keys = undefined;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = isArray(val);
	  var isO = isObject(val);
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) traverse(val[i], seen);
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]], seen);
	    }
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;
	var commentRE = /<!--/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	  var commentMatch = commentRE.test(templateString);

	  if (!tagMatch && !entityMatch && !commentMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment. However, iOS Safari has
	  // bug when using directly cloned template content with touch
	  // events and can cause crashes when the nodes are removed from DOM, so we
	  // have to treat template elements as string templates. (#2805)
	  /* istanbul ignore if */
	  if (isRealTemplate(node)) {
	    return stringToFragment(node.innerHTML);
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,
	  terminal: true,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('v-if')) {
	      warn('<' + this.el.tagName.toLowerCase() + ' v-for="' + this.expression + '" v-if="' + this.el.getAttribute('v-if') + '">: ' + 'Using v-if and v-for on the same element is not recommended - ' + 'consider filtering the source Array instead.', this.vm);
	    }

	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new instance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      var target = prevEl.nextSibling;
	      /* istanbul ignore if */
	      if (!target) {
	        // reset end anchor position in case the position was messed up
	        // by an external drag-n-drop library.
	        after(this.end, prevEl);
	        target = this.end;
	      }
	      frag.before(target);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = getTrackByKey(index, key, value, trackByKey);
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else if (Object.isExtensible(value)) {
	        def(value, id, frag);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * watcher's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	/**
	 * Get the track by key for an item.
	 *
	 * @param {Number} index
	 * @param {String} key
	 * @param {*} value
	 * @param {String} [trackByKey]
	 */

	function getTrackByKey(index, key, value, trackByKey) {
	  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	var vIf = {

	  priority: IF,
	  terminal: true,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    // #3029 only update when the value changes. This prevent
	    // browsers from overwriting values like selectionStart
	    value = _toString(value);
	    if (value !== this.el.value) this.el.value = value;
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var _this = this;

	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', function () {
	      nextTick(_this.forceUpdate);
	    });
	    if (!inDoc(el)) {
	      nextTick(this.forceUpdate);
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.get();
	      if (isArray(model)) {
	        var val = self.getValue();
	        var i = indexOf(model, val);
	        if (el.checked) {
	          if (i < 0) {
	            self.set(model.concat(val));
	          }
	        } else if (i > -1) {
	          self.set(model.slice(0, i).concat(model.slice(i + 1)));
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  if (camel !== 'filter' && camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;

	      if (el[attr] !== attrValue) {
	        el[attr] = attrValue;
	      }
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// logic control
	// two-way binding
	// event handling
	// attributes
	// ref & el
	// cloak
	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (!value) {
	      this.cleanup();
	    } else if (typeof value === 'string') {
	      this.setClass(value.trim().split(/\s+/));
	    } else {
	      this.setClass(normalize$1(value));
	    }
	  },

	  setClass: function setClass(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val) {
	        apply(this.el, val, addClass);
	      }
	    }
	    this.prevKeys = value;
	  },

	  cleanup: function cleanup(value) {
	    var prevKeys = this.prevKeys;
	    if (!prevKeys) return;
	    var i = prevKeys.length;
	    while (i--) {
	      var key = prevKeys[i];
	      if (!value || value.indexOf(key) < 0) {
	        apply(this.el, key, removeClass);
	      }
	    }
	  }
	};

	/**
	 * Normalize objects and arrays (potentially containing objects)
	 * into array of strings.
	 *
	 * @param {Object|Array<String|Object>} value
	 * @return {Array<String>}
	 */

	function normalize$1(value) {
	  var res = [];
	  if (isArray(value)) {
	    for (var i = 0, l = value.length; i < l; i++) {
	      var _key = value[i];
	      if (_key) {
	        if (typeof _key === 'string') {
	          res.push(_key);
	        } else {
	          for (var k in _key) {
	            if (_key[k]) res.push(k);
	          }
	        }
	      }
	    }
	  } else if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) res.push(key);
	    }
	  }
	  return res;
	}

	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */

	function apply(el, key, fn) {
	  key = key.trim();
	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }
	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      this.el.removeAttribute(':is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var propsData = vm.$options.propsData;
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (propsData && (value = propsData[name] || propsData[path]) !== null) {
	      // has propsData
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required && (!propsData || !(name in propsData) && !(path in propsData))) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var inlineProps = vm.$options.propsData;
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (inlineProps && hasOwn(inlineProps, path)) {
	        initProp(vm, prop, inlineProps[path]);
	      }if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */

	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value, vm);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}

	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */

	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */

	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value, vm) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  if (typeof coerce === 'function') {
	    return coerce(value);
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
	    return value;
	  }
	}

	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */

	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}

	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */

	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}

	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */

	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  var _this = this;

	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    oldId = oldId || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    removeClass(el, oldId + '-transition');
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  sortDirectives(dirs);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * sort directives by priority (stable sort)
	 *
	 * @param {Array} dirs
	 */
	function sortDirectives(dirs) {
	  if (dirs.length === 0) return;

	  var groupedMap = {};
	  var i, j, k, l;
	  var index = 0;
	  var priorities = [];
	  for (i = 0, j = dirs.length; i < j; i++) {
	    var dir = dirs[i];
	    var priority = dir.descriptor.def.priority || DEFAULT_PRIORITY;
	    var array = groupedMap[priority];
	    if (!array) {
	      array = groupedMap[priority] = [];
	      priorities.push(priority);
	    }
	    array.push(dir);
	  }

	  priorities.sort(function (a, b) {
	    return a > b ? -1 : a === b ? 0 : 1;
	  });
	  for (i = 0, j = priorities.length; i < j; i++) {
	    var group = groupedMap[priorities[i]];
	    for (k = 0, l = group.length; k < l; k++) {
	      dirs[index++] = group[k];
	    }
	  }
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;

	      var componentName = options.el.tagName.toLowerCase();
	      if (componentName === 'component' && options.name) {
	        componentName += ':' + options.name;
	      }

	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + componentName + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && !isScript(node)) {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    // a textarea which has v-pre attr should skip complie.
	    if (getAttr(el, 'v-pre') !== null) {
	      return skip;
	    }
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = _toString(value);
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }

	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          modifiers = parseModifiers(attr.name);
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }

	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for, v-if and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	function isScript(el) {
	  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    if (!replacer) {
	      return frag;
	    }
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    var nodes = content.childNodes;
	    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	      return;
	    }
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node, true);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key)) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, value, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        // force the expression into a statement so that
	        // it always dynamically resolves the method to call (#2670)
	        // kinda ugly hack, but does the job.
	        value = attrs[i].value;
	        if (isSimplePath(value)) {
	          value += '.apply(this, $arguments)';
	        }
	        handler = (vm._scope || vm._context).$eval(value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop$1() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop$1;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression$1(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // resolve slot distribution
	    resolveSlots(this, options._content);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data && this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    /* istanbul ignore if */
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression$1(exp);
	    if (res) {
	      if (asStatement) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression$1(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Order filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */

	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);

	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }

	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }

	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }

	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   * @param {Number} decimals Decimal places
	   */

	  currency: function currency(value, _currency, decimals) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    decimals = decimals != null ? decimals : 2;
	    var stringified = Math.abs(value).toFixed(decimals);
	    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = decimals ? stringified.slice(-1 - decimals) : '';
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    var length = args.length;
	    if (length > 1) {
	      var index = value % 10 - 1;
	      return index in args ? args[index] : args[length - 1];
	    } else {
	      return args[0] + (value === 1 ? '' : 's');
	    }
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          if (!definition.name) {
	            definition.name = id;
	          }
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.28';

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-router v0.7.13
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.VueRouter = factory();
	}(this, function () { 'use strict';

	  var babelHelpers = {};

	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	  function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	  }

	  Target.prototype = {
	    to: function to(target, callback) {
	      var delegate = this.delegate;

	      if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	      }

	      this.matcher.add(this.path, target);

	      if (callback) {
	        if (callback.length === 0) {
	          throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	      }
	      return this;
	    }
	  };

	  function Matcher(target) {
	    this.routes = {};
	    this.children = {};
	    this.target = target;
	  }

	  Matcher.prototype = {
	    add: function add(path, handler) {
	      this.routes[path] = handler;
	    },

	    addChild: function addChild(path, target, callback, delegate) {
	      var matcher = new Matcher(target);
	      this.children[path] = matcher;

	      var match = generateMatch(path, matcher, delegate);

	      if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	      }

	      callback(match);
	    }
	  };

	  function generateMatch(startingPath, matcher, delegate) {
	    return function (path, nestedCallback) {
	      var fullPath = startingPath + path;

	      if (nestedCallback) {
	        nestedCallback(generateMatch(fullPath, matcher, delegate));
	      } else {
	        return new Target(startingPath + path, matcher, delegate);
	      }
	    };
	  }

	  function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0, l = routeArray.length; i < l; i++) {
	      len += routeArray[i].path.length;
	    }

	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	  }

	  function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;

	    for (var path in routes) {
	      if (routes.hasOwnProperty(path)) {
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);

	        if (matcher.children[path]) {
	          eachRoute(routeArray, matcher.children[path], callback, binding);
	        } else {
	          callback.call(binding, routeArray);
	        }
	      }
	    }
	  }

	  function map (callback, addRouteCallback) {
	    var matcher = new Matcher();

	    callback(generateMatch("", matcher, this.delegate));

	    eachRoute([], matcher, function (route) {
	      if (addRouteCallback) {
	        addRouteCallback(this, route);
	      } else {
	        this.add(route);
	      }
	    }, this);
	  }

	  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

	  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

	  var noWarning = false;
	  function warn(msg) {
	    if (!noWarning && typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }

	  function tryDecode(uri, asComponent) {
	    try {
	      return asComponent ? decodeURIComponent(uri) : decodeURI(uri);
	    } catch (e) {
	      warn('malformed URI' + (asComponent ? ' component: ' : ': ') + uri);
	    }
	  }

	  function isArray(test) {
	    return Object.prototype.toString.call(test) === "[object Array]";
	  }

	  // A Segment represents a segment in the original route description.
	  // Each Segment type provides an `eachChar` and `regex` method.
	  //
	  // The `eachChar` method invokes the callback with one or more character
	  // specifications. A character specification consumes one or more input
	  // characters.
	  //
	  // The `regex` method returns a regex fragment for the segment. If the
	  // segment is a dynamic of star segment, the regex fragment also includes
	  // a capture.
	  //
	  // A character specification contains:
	  //
	  // * `validChars`: a String with a list of all valid characters, or
	  // * `invalidChars`: a String with a list of all invalid characters
	  // * `repeat`: true if the character specification can repeat

	  function StaticSegment(string) {
	    this.string = string;
	  }
	  StaticSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      var string = this.string,
	          ch;

	      for (var i = 0, l = string.length; i < l; i++) {
	        ch = string.charAt(i);
	        callback({ validChars: ch });
	      }
	    },

	    regex: function regex() {
	      return this.string.replace(escapeRegex, '\\$1');
	    },

	    generate: function generate() {
	      return this.string;
	    }
	  };

	  function DynamicSegment(name) {
	    this.name = name;
	  }
	  DynamicSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "/", repeat: true });
	    },

	    regex: function regex() {
	      return "([^/]+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function StarSegment(name) {
	    this.name = name;
	  }
	  StarSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "", repeat: true });
	    },

	    regex: function regex() {
	      return "(.+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function EpsilonSegment() {}
	  EpsilonSegment.prototype = {
	    eachChar: function eachChar() {},
	    regex: function regex() {
	      return "";
	    },
	    generate: function generate() {
	      return "";
	    }
	  };

	  function parse(route, names, specificity) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.charAt(0) === "/") {
	      route = route.substr(1);
	    }

	    var segments = route.split("/"),
	        results = [];

	    // A routes has specificity determined by the order that its different segments
	    // appear in. This system mirrors how the magnitude of numbers written as strings
	    // works.
	    // Consider a number written as: "abc". An example would be "200". Any other number written
	    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	    // leading symbol, "1".
	    // The rule is that symbols to the left carry more weight than symbols to the right
	    // when a number is written out as a string. In the above strings, the leading digit
	    // represents how many 100's are in the number, and it carries more weight than the middle
	    // number which represents how many 10's are in the number.
	    // This system of number magnitude works well for route specificity, too. A route written as
	    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	    // `x`, irrespective of the other parts.
	    // Because of this similarity, we assign each type of segment a number value written as a
	    // string. We can find the specificity of compound routes by concatenating these strings
	    // together, from left to right. After we have looped through all of the segments,
	    // we convert the string to a number.
	    specificity.val = '';

	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i],
	          match;

	      if (match = segment.match(/^:([^\/]+)$/)) {
	        results.push(new DynamicSegment(match[1]));
	        names.push(match[1]);
	        specificity.val += '3';
	      } else if (match = segment.match(/^\*([^\/]+)$/)) {
	        results.push(new StarSegment(match[1]));
	        specificity.val += '2';
	        names.push(match[1]);
	      } else if (segment === "") {
	        results.push(new EpsilonSegment());
	        specificity.val += '1';
	      } else {
	        results.push(new StaticSegment(segment));
	        specificity.val += '4';
	      }
	    }

	    specificity.val = +specificity.val;

	    return results;
	  }

	  // A State has a character specification and (`charSpec`) and a list of possible
	  // subsequent states (`nextStates`).
	  //
	  // If a State is an accepting state, it will also have several additional
	  // properties:
	  //
	  // * `regex`: A regular expression that is used to extract parameters from paths
	  //   that reached this accepting state.
	  // * `handlers`: Information on how to convert the list of captures into calls
	  //   to registered handlers with the specified parameters
	  // * `types`: How many static, dynamic or star segments in this route. Used to
	  //   decide which route to use if multiple registered routes match a path.
	  //
	  // Currently, State is implemented naively by looping over `nextStates` and
	  // comparing a character specification against a character. A more efficient
	  // implementation would use a hash of keys pointing at one or more next states.

	  function State(charSpec) {
	    this.charSpec = charSpec;
	    this.nextStates = [];
	  }

	  State.prototype = {
	    get: function get(charSpec) {
	      var nextStates = this.nextStates;

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        var child = nextStates[i];

	        var isEqual = child.charSpec.validChars === charSpec.validChars;
	        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

	        if (isEqual) {
	          return child;
	        }
	      }
	    },

	    put: function put(charSpec) {
	      var state;

	      // If the character specification already exists in a child of the current
	      // state, just return that state.
	      if (state = this.get(charSpec)) {
	        return state;
	      }

	      // Make a new state for the character spec
	      state = new State(charSpec);

	      // Insert the new state as a child of the current state
	      this.nextStates.push(state);

	      // If this character specification repeats, insert the new state as a child
	      // of itself. Note that this will not trigger an infinite loop because each
	      // transition during recognition consumes a character.
	      if (charSpec.repeat) {
	        state.nextStates.push(state);
	      }

	      // Return the new state
	      return state;
	    },

	    // Find a list of child states matching the next character
	    match: function match(ch) {
	      // DEBUG "Processing `" + ch + "`:"
	      var nextStates = this.nextStates,
	          child,
	          charSpec,
	          chars;

	      // DEBUG "  " + debugState(this)
	      var returned = [];

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        child = nextStates[i];

	        charSpec = child.charSpec;

	        if (typeof (chars = charSpec.validChars) !== 'undefined') {
	          if (chars.indexOf(ch) !== -1) {
	            returned.push(child);
	          }
	        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	          if (chars.indexOf(ch) === -1) {
	            returned.push(child);
	          }
	        }
	      }

	      return returned;
	    }

	    /** IF DEBUG
	    , debug: function() {
	      var charSpec = this.charSpec,
	          debug = "[",
	          chars = charSpec.validChars || charSpec.invalidChars;
	       if (charSpec.invalidChars) { debug += "^"; }
	      debug += chars;
	      debug += "]";
	       if (charSpec.repeat) { debug += "+"; }
	       return debug;
	    }
	    END IF **/
	  };

	  /** IF DEBUG
	  function debug(log) {
	    console.log(log);
	  }

	  function debugState(state) {
	    return state.nextStates.map(function(n) {
	      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	    }).join(", ")
	  }
	  END IF **/

	  // Sort the routes by specificity
	  function sortSolutions(states) {
	    return states.sort(function (a, b) {
	      return b.specificity.val - a.specificity.val;
	    });
	  }

	  function recognizeChar(states, ch) {
	    var nextStates = [];

	    for (var i = 0, l = states.length; i < l; i++) {
	      var state = states[i];

	      nextStates = nextStates.concat(state.match(ch));
	    }

	    return nextStates;
	  }

	  var oCreate = Object.create || function (proto) {
	    function F() {}
	    F.prototype = proto;
	    return new F();
	  };

	  function RecognizeResults(queryParams) {
	    this.queryParams = queryParams || {};
	  }
	  RecognizeResults.prototype = oCreate({
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    push: Array.prototype.push,
	    length: 0,
	    queryParams: null
	  });

	  function findHandler(state, path, queryParams) {
	    var handlers = state.handlers,
	        regex = state.regex;
	    var captures = path.match(regex),
	        currentCapture = 1;
	    var result = new RecognizeResults(queryParams);

	    for (var i = 0, l = handlers.length; i < l; i++) {
	      var handler = handlers[i],
	          names = handler.names,
	          params = {};

	      for (var j = 0, m = names.length; j < m; j++) {
	        params[names[j]] = captures[currentCapture++];
	      }

	      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	    }

	    return result;
	  }

	  function addSegment(currentState, segment) {
	    segment.eachChar(function (ch) {
	      var state;

	      currentState = currentState.put(ch);
	    });

	    return currentState;
	  }

	  function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, '%20');
	    return tryDecode(part, true);
	  }

	  // The main interface

	  var RouteRecognizer = function RouteRecognizer() {
	    this.rootState = new State();
	    this.names = {};
	  };

	  RouteRecognizer.prototype = {
	    add: function add(routes, options) {
	      var currentState = this.rootState,
	          regex = "^",
	          specificity = {},
	          handlers = [],
	          allSegments = [],
	          name;

	      var isEmpty = true;

	      for (var i = 0, l = routes.length; i < l; i++) {
	        var route = routes[i],
	            names = [];

	        var segments = parse(route.path, names, specificity);

	        allSegments = allSegments.concat(segments);

	        for (var j = 0, m = segments.length; j < m; j++) {
	          var segment = segments[j];

	          if (segment instanceof EpsilonSegment) {
	            continue;
	          }

	          isEmpty = false;

	          // Add a "/" for the new segment
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";

	          // Add a representation of the segment to the NFA and regex
	          currentState = addSegment(currentState, segment);
	          regex += segment.regex();
	        }

	        var handler = { handler: route.handler, names: names };
	        handlers.push(handler);
	      }

	      if (isEmpty) {
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	      }

	      currentState.handlers = handlers;
	      currentState.regex = new RegExp(regex + "$");
	      currentState.specificity = specificity;

	      if (name = options && options.as) {
	        this.names[name] = {
	          segments: allSegments,
	          handlers: handlers
	        };
	      }
	    },

	    handlersFor: function handlersFor(name) {
	      var route = this.names[name],
	          result = [];
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      for (var i = 0, l = route.handlers.length; i < l; i++) {
	        result.push(route.handlers[i]);
	      }

	      return result;
	    },

	    hasRoute: function hasRoute(name) {
	      return !!this.names[name];
	    },

	    generate: function generate(name, params) {
	      var route = this.names[name],
	          output = "";
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      var segments = route.segments;

	      for (var i = 0, l = segments.length; i < l; i++) {
	        var segment = segments[i];

	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }

	        output += "/";
	        output += segment.generate(params);
	      }

	      if (output.charAt(0) !== '/') {
	        output = '/' + output;
	      }

	      if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	      }

	      return output;
	    },

	    generateQueryString: function generateQueryString(params) {
	      var pairs = [];
	      var keys = [];
	      for (var key in params) {
	        if (params.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	      keys.sort();
	      for (var i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        var value = params[key];
	        if (value == null) {
	          continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray(value)) {
	          for (var j = 0, l = value.length; j < l; j++) {
	            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	            pairs.push(arrayPair);
	          }
	        } else {
	          pair += "=" + encodeURIComponent(value);
	          pairs.push(pair);
	        }
	      }

	      if (pairs.length === 0) {
	        return '';
	      }

	      return "?" + pairs.join("&");
	    },

	    parseQueryString: function parseQueryString(queryString) {
	      var pairs = queryString.split("&"),
	          queryParams = {};
	      for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split('='),
	            key = decodeQueryParamPart(pair[0]),
	            keyLength = key.length,
	            isArray = false,
	            value;
	        if (pair.length === 1) {
	          value = 'true';
	        } else {
	          //Handle arrays
	          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	            isArray = true;
	            key = key.slice(0, keyLength - 2);
	            if (!queryParams[key]) {
	              queryParams[key] = [];
	            }
	          }
	          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	        }
	        if (isArray) {
	          queryParams[key].push(value);
	        } else {
	          queryParams[key] = value;
	        }
	      }
	      return queryParams;
	    },

	    recognize: function recognize(path, silent) {
	      noWarning = silent;
	      var states = [this.rootState],
	          pathLen,
	          i,
	          l,
	          queryStart,
	          queryParams = {},
	          isSlashDropped = false;

	      queryStart = path.indexOf('?');
	      if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        if (queryString) {
	          queryParams = this.parseQueryString(queryString);
	        }
	      }

	      path = tryDecode(path);
	      if (!path) return;

	      // DEBUG GROUP path

	      if (path.charAt(0) !== "/") {
	        path = "/" + path;
	      }

	      pathLen = path.length;
	      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        isSlashDropped = true;
	      }

	      for (i = 0, l = path.length; i < l; i++) {
	        states = recognizeChar(states, path.charAt(i));
	        if (!states.length) {
	          break;
	        }
	      }

	      // END DEBUG GROUP

	      var solutions = [];
	      for (i = 0, l = states.length; i < l; i++) {
	        if (states[i].handlers) {
	          solutions.push(states[i]);
	        }
	      }

	      states = sortSolutions(solutions);

	      var state = solutions[0];

	      if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	          path = path + "/";
	        }
	        return findHandler(state, path, queryParams);
	      }
	    }
	  };

	  RouteRecognizer.prototype.map = map;

	  var genQuery = RouteRecognizer.prototype.generateQueryString;

	  // export default for holding the Vue reference
	  var exports$1 = {};
	  /**
	   * Warn stuff.
	   *
	   * @param {String} msg
	   */

	  function warn$1(msg) {
	    /* istanbul ignore next */
	    if (typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }

	  /**
	   * Resolve a relative path.
	   *
	   * @param {String} base
	   * @param {String} relative
	   * @param {Boolean} append
	   * @return {String}
	   */

	  function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	      query = query[1];
	      base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	      return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	      stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	      if (segment === '.') {
	        continue;
	      } else if (segment === '..') {
	        stack.pop();
	      } else {
	        stack.push(segment);
	      }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	      stack.unshift('');
	    }
	    return stack.join('/');
	  }

	  /**
	   * Forgiving check for a promise
	   *
	   * @param {Object} p
	   * @return {Boolean}
	   */

	  function isPromise(p) {
	    return p && typeof p.then === 'function';
	  }

	  /**
	   * Retrive a route config field from a component instance
	   * OR a component contructor.
	   *
	   * @param {Function|Vue} component
	   * @param {String} name
	   * @return {*}
	   */

	  function getRouteConfig(component, name) {
	    var options = component && (component.$options || component.options);
	    return options && options.route && options.route[name];
	  }

	  /**
	   * Resolve an async component factory. Have to do a dirty
	   * mock here because of Vue core's internal API depends on
	   * an ID check.
	   *
	   * @param {Object} handler
	   * @param {Function} cb
	   */

	  var resolver = undefined;

	  function resolveAsyncComponent(handler, cb) {
	    if (!resolver) {
	      resolver = {
	        resolve: exports$1.Vue.prototype._resolveComponent,
	        $options: {
	          components: {
	            _: handler.component
	          }
	        }
	      };
	    } else {
	      resolver.$options.components._ = handler.component;
	    }
	    resolver.resolve('_', function (Component) {
	      handler.component = Component;
	      cb(Component);
	    });
	  }

	  /**
	   * Map the dynamic segments in a path to params.
	   *
	   * @param {String} path
	   * @param {Object} params
	   * @param {Object} query
	   */

	  function mapParams(path, params, query) {
	    if (params === undefined) params = {};

	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	      var val = params[key];
	      /* istanbul ignore if */
	      if (!val) {
	        warn$1('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	      }
	      return val || '';
	    });
	    if (query) {
	      path += genQuery(query);
	    }
	    return path;
	  }

	  var hashRE = /#.*$/;

	  var HTML5History = (function () {
	    function HTML5History(_ref) {
	      var root = _ref.root;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HTML5History);

	      if (root && root !== '/') {
	        // make sure there's the starting slash
	        if (root.charAt(0) !== '/') {
	          root = '/' + root;
	        }
	        // remove trailing slash
	        this.root = root.replace(/\/$/, '');
	        this.rootRE = new RegExp('^\\' + this.root);
	      } else {
	        this.root = null;
	      }
	      this.onChange = onChange;
	      // check base tag
	      var baseEl = document.querySelector('base');
	      this.base = baseEl && baseEl.getAttribute('href');
	    }

	    HTML5History.prototype.start = function start() {
	      var _this = this;

	      this.listener = function (e) {
	        var url = location.pathname + location.search;
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '');
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    };

	    HTML5History.prototype.stop = function stop() {
	      window.removeEventListener('popstate', this.listener);
	    };

	    HTML5History.prototype.go = function go(path, replace, append) {
	      var url = this.formatPath(path, append);
	      if (replace) {
	        history.replaceState({}, '', url);
	      } else {
	        // record scroll position by replacing current state
	        history.replaceState({
	          pos: {
	            x: window.pageXOffset,
	            y: window.pageYOffset
	          }
	        }, '', location.href);
	        // then push new state
	        history.pushState({}, '', url);
	      }
	      var hashMatch = path.match(hashRE);
	      var hash = hashMatch && hashMatch[0];
	      path = url
	      // strip hash so it doesn't mess up params
	      .replace(hashRE, '')
	      // remove root before matching
	      .replace(this.rootRE, '');
	      this.onChange(path, null, hash);
	    };

	    HTML5History.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/'
	      // absolute path
	      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	    };

	    return HTML5History;
	  })();

	  var HashHistory = (function () {
	    function HashHistory(_ref) {
	      var hashbang = _ref.hashbang;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HashHistory);

	      this.hashbang = hashbang;
	      this.onChange = onChange;
	    }

	    HashHistory.prototype.start = function start() {
	      var self = this;
	      this.listener = function () {
	        var path = location.hash;
	        var raw = path.replace(/^#!?/, '');
	        // always
	        if (raw.charAt(0) !== '/') {
	          raw = '/' + raw;
	        }
	        var formattedPath = self.formatPath(raw);
	        if (formattedPath !== path) {
	          location.replace(formattedPath);
	          return;
	        }
	        // determine query
	        // note it's possible to have queries in both the actual URL
	        // and the hash fragment itself.
	        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	        self.onChange(path.replace(/^#!?/, '') + query);
	      };
	      window.addEventListener('hashchange', this.listener);
	      this.listener();
	    };

	    HashHistory.prototype.stop = function stop() {
	      window.removeEventListener('hashchange', this.listener);
	    };

	    HashHistory.prototype.go = function go(path, replace, append) {
	      path = this.formatPath(path, append);
	      if (replace) {
	        location.replace(path);
	      } else {
	        location.hash = path;
	      }
	    };

	    HashHistory.prototype.formatPath = function formatPath(path, append) {
	      var isAbsoloute = path.charAt(0) === '/';
	      var prefix = '#' + (this.hashbang ? '!' : '');
	      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	    };

	    return HashHistory;
	  })();

	  var AbstractHistory = (function () {
	    function AbstractHistory(_ref) {
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, AbstractHistory);

	      this.onChange = onChange;
	      this.currentPath = '/';
	    }

	    AbstractHistory.prototype.start = function start() {
	      this.onChange('/');
	    };

	    AbstractHistory.prototype.stop = function stop() {
	      // noop
	    };

	    AbstractHistory.prototype.go = function go(path, replace, append) {
	      path = this.currentPath = this.formatPath(path, append);
	      this.onChange(path);
	    };

	    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	    };

	    return AbstractHistory;
	  })();

	  /**
	   * Determine the reusability of an existing router view.
	   *
	   * @param {Directive} view
	   * @param {Object} handler
	   * @param {Transition} transition
	   */

	  function canReuse(view, handler, transition) {
	    var component = view.childVM;
	    if (!component || !handler) {
	      return false;
	    }
	    // important: check view.Component here because it may
	    // have been changed in activate hook
	    if (view.Component !== handler.component) {
	      return false;
	    }
	    var canReuseFn = getRouteConfig(component, 'canReuse');
	    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	      to: transition.to,
	      from: transition.from
	    }) : true; // defaults to true
	  }

	  /**
	   * Check if a component can deactivate.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canDeactivate(view, transition, next) {
	    var fromComponent = view.childVM;
	    var hook = getRouteConfig(fromComponent, 'canDeactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, fromComponent, next, {
	        expectBoolean: true
	      });
	    }
	  }

	  /**
	   * Check if a component can activate.
	   *
	   * @param {Object} handler
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canActivate(handler, transition, next) {
	    resolveAsyncComponent(handler, function (Component) {
	      // have to check due to async-ness
	      if (transition.aborted) {
	        return;
	      }
	      // determine if this component can be activated
	      var hook = getRouteConfig(Component, 'canActivate');
	      if (!hook) {
	        next();
	      } else {
	        transition.callHook(hook, null, next, {
	          expectBoolean: true
	        });
	      }
	    });
	  }

	  /**
	   * Call deactivate hooks for existing router-views.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function deactivate(view, transition, next) {
	    var component = view.childVM;
	    var hook = getRouteConfig(component, 'deactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHooks(hook, component, next);
	    }
	  }

	  /**
	   * Activate / switch component for a router-view.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Number} depth
	   * @param {Function} [cb]
	   */

	  function activate(view, transition, depth, cb, reuse) {
	    var handler = transition.activateQueue[depth];
	    if (!handler) {
	      saveChildView(view);
	      if (view._bound) {
	        view.setComponent(null);
	      }
	      cb && cb();
	      return;
	    }

	    var Component = view.Component = handler.component;
	    var activateHook = getRouteConfig(Component, 'activate');
	    var dataHook = getRouteConfig(Component, 'data');
	    var waitForData = getRouteConfig(Component, 'waitForData');

	    view.depth = depth;
	    view.activated = false;

	    var component = undefined;
	    var loading = !!(dataHook && !waitForData);

	    // "reuse" is a flag passed down when the parent view is
	    // either reused via keep-alive or as a child of a kept-alive view.
	    // of course we can only reuse if the current kept-alive instance
	    // is of the correct type.
	    reuse = reuse && view.childVM && view.childVM.constructor === Component;

	    if (reuse) {
	      // just reuse
	      component = view.childVM;
	      component.$loadingRouteData = loading;
	    } else {
	      saveChildView(view);

	      // unbuild current component. this step also destroys
	      // and removes all nested child views.
	      view.unbuild(true);

	      // build the new component. this will also create the
	      // direct child view of the current one. it will register
	      // itself as view.childView.
	      component = view.build({
	        _meta: {
	          $loadingRouteData: loading
	        },
	        created: function created() {
	          this._routerView = view;
	        }
	      });

	      // handle keep-alive.
	      // when a kept-alive child vm is restored, we need to
	      // add its cached child views into the router's view list,
	      // and also properly update current view's child view.
	      if (view.keepAlive) {
	        component.$loadingRouteData = loading;
	        var cachedChildView = component._keepAliveRouterView;
	        if (cachedChildView) {
	          view.childView = cachedChildView;
	          component._keepAliveRouterView = null;
	        }
	      }
	    }

	    // cleanup the component in case the transition is aborted
	    // before the component is ever inserted.
	    var cleanup = function cleanup() {
	      component.$destroy();
	    };

	    // actually insert the component and trigger transition
	    var insert = function insert() {
	      if (reuse) {
	        cb && cb();
	        return;
	      }
	      var router = transition.router;
	      if (router._rendered || router._transitionOnLoad) {
	        view.transition(component);
	      } else {
	        // no transition on first render, manual transition
	        /* istanbul ignore if */
	        if (view.setCurrent) {
	          // 0.12 compat
	          view.setCurrent(component);
	        } else {
	          // 1.0
	          view.childVM = component;
	        }
	        component.$before(view.anchor, null, false);
	      }
	      cb && cb();
	    };

	    var afterData = function afterData() {
	      // activate the child view
	      if (view.childView) {
	        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	      }
	      insert();
	    };

	    // called after activation hook is resolved
	    var afterActivate = function afterActivate() {
	      view.activated = true;
	      if (dataHook && waitForData) {
	        // wait until data loaded to insert
	        loadData(component, transition, dataHook, afterData, cleanup);
	      } else {
	        // load data and insert at the same time
	        if (dataHook) {
	          loadData(component, transition, dataHook);
	        }
	        afterData();
	      }
	    };

	    if (activateHook) {
	      transition.callHooks(activateHook, component, afterActivate, {
	        cleanup: cleanup,
	        postActivate: true
	      });
	    } else {
	      afterActivate();
	    }
	  }

	  /**
	   * Reuse a view, just reload data if necessary.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   */

	  function reuse(view, transition) {
	    var component = view.childVM;
	    var dataHook = getRouteConfig(component, 'data');
	    if (dataHook) {
	      loadData(component, transition, dataHook);
	    }
	  }

	  /**
	   * Asynchronously load and apply data to component.
	   *
	   * @param {Vue} component
	   * @param {Transition} transition
	   * @param {Function} hook
	   * @param {Function} cb
	   * @param {Function} cleanup
	   */

	  function loadData(component, transition, hook, cb, cleanup) {
	    component.$loadingRouteData = true;
	    transition.callHooks(hook, component, function () {
	      component.$loadingRouteData = false;
	      component.$emit('route-data-loaded', component);
	      cb && cb();
	    }, {
	      cleanup: cleanup,
	      postActivate: true,
	      processData: function processData(data) {
	        // handle promise sugar syntax
	        var promises = [];
	        if (isPlainObject(data)) {
	          Object.keys(data).forEach(function (key) {
	            var val = data[key];
	            if (isPromise(val)) {
	              promises.push(val.then(function (resolvedVal) {
	                component.$set(key, resolvedVal);
	              }));
	            } else {
	              component.$set(key, val);
	            }
	          });
	        }
	        if (promises.length) {
	          return promises[0].constructor.all(promises);
	        }
	      }
	    });
	  }

	  /**
	   * Save the child view for a kept-alive view so that
	   * we can restore it when it is switched back to.
	   *
	   * @param {Directive} view
	   */

	  function saveChildView(view) {
	    if (view.keepAlive && view.childVM && view.childView) {
	      view.childVM._keepAliveRouterView = view.childView;
	    }
	    view.childView = null;
	  }

	  /**
	   * Check plain object.
	   *
	   * @param {*} val
	   */

	  function isPlainObject(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  /**
	   * A RouteTransition object manages the pipeline of a
	   * router-view switching process. This is also the object
	   * passed into user route hooks.
	   *
	   * @param {Router} router
	   * @param {Route} to
	   * @param {Route} from
	   */

	  var RouteTransition = (function () {
	    function RouteTransition(router, to, from) {
	      babelHelpers.classCallCheck(this, RouteTransition);

	      this.router = router;
	      this.to = to;
	      this.from = from;
	      this.next = null;
	      this.aborted = false;
	      this.done = false;
	    }

	    /**
	     * Abort current transition and return to previous location.
	     */

	    RouteTransition.prototype.abort = function abort() {
	      if (!this.aborted) {
	        this.aborted = true;
	        // if the root path throws an error during validation
	        // on initial load, it gets caught in an infinite loop.
	        var abortingOnLoad = !this.from.path && this.to.path === '/';
	        if (!abortingOnLoad) {
	          this.router.replace(this.from.path || '/');
	        }
	      }
	    };

	    /**
	     * Abort current transition and redirect to a new location.
	     *
	     * @param {String} path
	     */

	    RouteTransition.prototype.redirect = function redirect(path) {
	      if (!this.aborted) {
	        this.aborted = true;
	        if (typeof path === 'string') {
	          path = mapParams(path, this.to.params, this.to.query);
	        } else {
	          path.params = path.params || this.to.params;
	          path.query = path.query || this.to.query;
	        }
	        this.router.replace(path);
	      }
	    };

	    /**
	     * A router view transition's pipeline can be described as
	     * follows, assuming we are transitioning from an existing
	     * <router-view> chain [Component A, Component B] to a new
	     * chain [Component A, Component C]:
	     *
	     *  A    A
	     *  | => |
	     *  B    C
	     *
	     * 1. Reusablity phase:
	     *   -> canReuse(A, A)
	     *   -> canReuse(B, C)
	     *   -> determine new queues:
	     *      - deactivation: [B]
	     *      - activation: [C]
	     *
	     * 2. Validation phase:
	     *   -> canDeactivate(B)
	     *   -> canActivate(C)
	     *
	     * 3. Activation phase:
	     *   -> deactivate(B)
	     *   -> activate(C)
	     *
	     * Each of these steps can be asynchronous, and any
	     * step can potentially abort the transition.
	     *
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.start = function start(cb) {
	      var transition = this;

	      // determine the queue of views to deactivate
	      var deactivateQueue = [];
	      var view = this.router._rootView;
	      while (view) {
	        deactivateQueue.unshift(view);
	        view = view.childView;
	      }
	      var reverseDeactivateQueue = deactivateQueue.slice().reverse();

	      // determine the queue of route handlers to activate
	      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
	        return match.handler;
	      });

	      // 1. Reusability phase
	      var i = undefined,
	          reuseQueue = undefined;
	      for (i = 0; i < reverseDeactivateQueue.length; i++) {
	        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
	          break;
	        }
	      }
	      if (i > 0) {
	        reuseQueue = reverseDeactivateQueue.slice(0, i);
	        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
	        activateQueue = activateQueue.slice(i);
	      }

	      // 2. Validation phase
	      transition.runQueue(deactivateQueue, canDeactivate, function () {
	        transition.runQueue(activateQueue, canActivate, function () {
	          transition.runQueue(deactivateQueue, deactivate, function () {
	            // 3. Activation phase

	            // Update router current route
	            transition.router._onTransitionValidated(transition);

	            // trigger reuse for all reused views
	            reuseQueue && reuseQueue.forEach(function (view) {
	              return reuse(view, transition);
	            });

	            // the root of the chain that needs to be replaced
	            // is the top-most non-reusable view.
	            if (deactivateQueue.length) {
	              var _view = deactivateQueue[deactivateQueue.length - 1];
	              var depth = reuseQueue ? reuseQueue.length : 0;
	              activate(_view, transition, depth, cb);
	            } else {
	              cb();
	            }
	          });
	        });
	      });
	    };

	    /**
	     * Asynchronously and sequentially apply a function to a
	     * queue.
	     *
	     * @param {Array} queue
	     * @param {Function} fn
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	      var transition = this;
	      step(0);
	      function step(index) {
	        if (index >= queue.length) {
	          cb();
	        } else {
	          fn(queue[index], transition, function () {
	            step(index + 1);
	          });
	        }
	      }
	    };

	    /**
	     * Call a user provided route transition hook and handle
	     * the response (e.g. if the user returns a promise).
	     *
	     * If the user neither expects an argument nor returns a
	     * promise, the hook is assumed to be synchronous.
	     *
	     * @param {Function} hook
	     * @param {*} [context]
	     * @param {Function} [cb]
	     * @param {Object} [options]
	     *                 - {Boolean} expectBoolean
	     *                 - {Boolean} postActive
	     *                 - {Function} processData
	     *                 - {Function} cleanup
	     */

	    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	      var _ref$expectBoolean = _ref.expectBoolean;
	      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	      var _ref$postActivate = _ref.postActivate;
	      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
	      var processData = _ref.processData;
	      var cleanup = _ref.cleanup;

	      var transition = this;
	      var nextCalled = false;

	      // abort the transition
	      var abort = function abort() {
	        cleanup && cleanup();
	        transition.abort();
	      };

	      // handle errors
	      var onError = function onError(err) {
	        postActivate ? next() : abort();
	        if (err && !transition.router._suppress) {
	          warn$1('Uncaught error during transition: ');
	          throw err instanceof Error ? err : new Error(err);
	        }
	      };

	      // since promise swallows errors, we have to
	      // throw it in the next tick...
	      var onPromiseError = function onPromiseError(err) {
	        try {
	          onError(err);
	        } catch (e) {
	          setTimeout(function () {
	            throw e;
	          }, 0);
	        }
	      };

	      // advance the transition to the next step
	      var next = function next() {
	        if (nextCalled) {
	          warn$1('transition.next() should be called only once.');
	          return;
	        }
	        nextCalled = true;
	        if (transition.aborted) {
	          cleanup && cleanup();
	          return;
	        }
	        cb && cb();
	      };

	      var nextWithBoolean = function nextWithBoolean(res) {
	        if (typeof res === 'boolean') {
	          res ? next() : abort();
	        } else if (isPromise(res)) {
	          res.then(function (ok) {
	            ok ? next() : abort();
	          }, onPromiseError);
	        } else if (!hook.length) {
	          next();
	        }
	      };

	      var nextWithData = function nextWithData(data) {
	        var res = undefined;
	        try {
	          res = processData(data);
	        } catch (err) {
	          return onError(err);
	        }
	        if (isPromise(res)) {
	          res.then(next, onPromiseError);
	        } else {
	          next();
	        }
	      };

	      // expose a clone of the transition object, so that each
	      // hook gets a clean copy and prevent the user from
	      // messing with the internals.
	      var exposed = {
	        to: transition.to,
	        from: transition.from,
	        abort: abort,
	        next: processData ? nextWithData : next,
	        redirect: function redirect() {
	          transition.redirect.apply(transition, arguments);
	        }
	      };

	      // actually call the hook
	      var res = undefined;
	      try {
	        res = hook.call(context, exposed);
	      } catch (err) {
	        return onError(err);
	      }

	      if (expectBoolean) {
	        // boolean hooks
	        nextWithBoolean(res);
	      } else if (isPromise(res)) {
	        // promise
	        if (processData) {
	          res.then(nextWithData, onPromiseError);
	        } else {
	          res.then(next, onPromiseError);
	        }
	      } else if (processData && isPlainOjbect(res)) {
	        // data promise sugar
	        nextWithData(res);
	      } else if (!hook.length) {
	        next();
	      }
	    };

	    /**
	     * Call a single hook or an array of async hooks in series.
	     *
	     * @param {Array} hooks
	     * @param {*} context
	     * @param {Function} cb
	     * @param {Object} [options]
	     */

	    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	      var _this = this;

	      if (Array.isArray(hooks)) {
	        this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, next, options);
	          }
	        }, cb);
	      } else {
	        this.callHook(hooks, context, cb, options);
	      }
	    };

	    return RouteTransition;
	  })();

	  function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  function toArray(val) {
	    return val ? Array.prototype.slice.call(val) : [];
	  }

	  var internalKeysRE = /^(component|subRoutes|fullPath)$/;

	  /**
	   * Route Context Object
	   *
	   * @param {String} path
	   * @param {Router} router
	   */

	  var Route = function Route(path, router) {
	    var _this = this;

	    babelHelpers.classCallCheck(this, Route);

	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	      // copy all custom fields from route configs
	      [].forEach.call(matched, function (match) {
	        for (var key in match.handler) {
	          if (!internalKeysRE.test(key)) {
	            _this[key] = match.handler[key];
	          }
	        }
	      });
	      // set query and params
	      this.query = matched.queryParams;
	      this.params = [].reduce.call(matched, function (prev, cur) {
	        if (cur.params) {
	          for (var key in cur.params) {
	            prev[key] = cur.params[key];
	          }
	        }
	        return prev;
	      }, {});
	    }
	    // expose path and router
	    this.path = path;
	    // for internal use
	    this.matched = matched || router._notFoundHandler;
	    // internal reference to router
	    Object.defineProperty(this, 'router', {
	      enumerable: false,
	      value: router
	    });
	    // Important: freeze self to prevent observation
	    Object.freeze(this);
	  };

	  function applyOverride (Vue) {
	    var _Vue$util = Vue.util;
	    var extend = _Vue$util.extend;
	    var isArray = _Vue$util.isArray;
	    var defineReactive = _Vue$util.defineReactive;

	    // override Vue's init and destroy process to keep track of router instances
	    var init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      options = options || {};
	      var root = options._parent || options.parent || this;
	      var router = root.$router;
	      var route = root.$route;
	      if (router) {
	        // expose router
	        this.$router = router;
	        router._children.push(this);
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          defineReactive(this, '$route', route);
	        }
	      }
	      init.call(this, options);
	    };

	    var destroy = Vue.prototype._destroy;
	    Vue.prototype._destroy = function () {
	      if (!this._isBeingDestroyed && this.$router) {
	        this.$router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    };

	    // 1.0 only: enable route mixins
	    var strats = Vue.config.optionMergeStrategies;
	    var hooksToMergeRE = /^(data|activate|deactivate)$/;

	    if (strats) {
	      strats.route = function (parentVal, childVal) {
	        if (!childVal) return parentVal;
	        if (!parentVal) return childVal;
	        var ret = {};
	        extend(ret, parentVal);
	        for (var key in childVal) {
	          var a = ret[key];
	          var b = childVal[key];
	          // for data, activate and deactivate, we need to merge them into
	          // arrays similar to lifecycle hooks.
	          if (a && hooksToMergeRE.test(key)) {
	            ret[key] = (isArray(a) ? a : [a]).concat(b);
	          } else {
	            ret[key] = b;
	          }
	        }
	        return ret;
	      };
	    }
	  }

	  function View (Vue) {

	    var _ = Vue.util;
	    var componentDef =
	    // 0.12
	    Vue.directive('_component') ||
	    // 1.0
	    Vue.internalDirectives.component;
	    // <router-view> extends the internal component directive
	    var viewDef = _.extend({}, componentDef);

	    // with some overrides
	    _.extend(viewDef, {

	      _isRouterView: true,

	      bind: function bind() {
	        var route = this.vm.$route;
	        /* istanbul ignore if */
	        if (!route) {
	          warn$1('<router-view> can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // force dynamic directive so v-component doesn't
	        // attempt to build right now
	        this._isDynamicLiteral = true;
	        // finally, init by delegating to v-component
	        componentDef.bind.call(this);

	        // locate the parent view
	        var parentView = undefined;
	        var parent = this.vm;
	        while (parent) {
	          if (parent._routerView) {
	            parentView = parent._routerView;
	            break;
	          }
	          parent = parent.$parent;
	        }
	        if (parentView) {
	          // register self as a child of the parent view,
	          // instead of activating now. This is so that the
	          // child's activate hook is called after the
	          // parent's has resolved.
	          this.parentView = parentView;
	          parentView.childView = this;
	        } else {
	          // this is the root view!
	          var router = route.router;
	          router._rootView = this;
	        }

	        // handle late-rendered view
	        // two possibilities:
	        // 1. root view rendered after transition has been
	        //    validated;
	        // 2. child view rendered after parent view has been
	        //    activated.
	        var transition = route.router._currentTransition;
	        if (!parentView && transition.done || parentView && parentView.activated) {
	          var depth = parentView ? parentView.depth + 1 : 0;
	          activate(this, transition, depth);
	        }
	      },

	      unbind: function unbind() {
	        if (this.parentView) {
	          this.parentView.childView = null;
	        }
	        componentDef.unbind.call(this);
	      }
	    });

	    Vue.elementDirective('router-view', viewDef);
	  }

	  var trailingSlashRE = /\/$/;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var queryStringRE = /\?.*$/;

	  // install v-link, which provides navigation support for
	  // HTML5 history mode
	  function Link (Vue) {
	    var _Vue$util = Vue.util;
	    var _bind = _Vue$util.bind;
	    var isObject = _Vue$util.isObject;
	    var addClass = _Vue$util.addClass;
	    var removeClass = _Vue$util.removeClass;

	    var onPriority = Vue.directive('on').priority;
	    var LINK_UPDATE = '__vue-router-link-update__';

	    var activeId = 0;

	    Vue.directive('link-active', {
	      priority: 9999,
	      bind: function bind() {
	        var _this = this;

	        var id = String(activeId++);
	        // collect v-links contained within this element.
	        // we need do this here before the parent-child relationship
	        // gets messed up by terminal directives (if, for, components)
	        var childLinks = this.el.querySelectorAll('[v-link]');
	        for (var i = 0, l = childLinks.length; i < l; i++) {
	          var link = childLinks[i];
	          var existingId = link.getAttribute(LINK_UPDATE);
	          var value = existingId ? existingId + ',' + id : id;
	          // leave a mark on the link element which can be persisted
	          // through fragment clones.
	          link.setAttribute(LINK_UPDATE, value);
	        }
	        this.vm.$on(LINK_UPDATE, this.cb = function (link, path) {
	          if (link.activeIds.indexOf(id) > -1) {
	            link.updateClasses(path, _this.el);
	          }
	        });
	      },
	      unbind: function unbind() {
	        this.vm.$off(LINK_UPDATE, this.cb);
	      }
	    });

	    Vue.directive('link', {
	      priority: onPriority - 2,

	      bind: function bind() {
	        var vm = this.vm;
	        /* istanbul ignore if */
	        if (!vm.$route) {
	          warn$1('v-link can only be used inside a router-enabled app.');
	          return;
	        }
	        this.router = vm.$route.router;
	        // update things when the route changes
	        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
	        // check v-link-active ids
	        var activeIds = this.el.getAttribute(LINK_UPDATE);
	        if (activeIds) {
	          this.el.removeAttribute(LINK_UPDATE);
	          this.activeIds = activeIds.split(',');
	        }
	        // no need to handle click if link expects to be opened
	        // in a new window/tab.
	        /* istanbul ignore if */
	        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	          return;
	        }
	        // handle click
	        this.handler = _bind(this.onClick, this);
	        this.el.addEventListener('click', this.handler);
	      },

	      update: function update(target) {
	        this.target = target;
	        if (isObject(target)) {
	          this.append = target.append;
	          this.exact = target.exact;
	          this.prevActiveClass = this.activeClass;
	          this.activeClass = target.activeClass;
	        }
	        this.onRouteUpdate(this.vm.$route);
	      },

	      onClick: function onClick(e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) return;

	        var target = this.target;
	        if (target) {
	          // v-link with expression, just go
	          e.preventDefault();
	          this.router.go(target);
	        } else {
	          // no expression, delegate for an <a> inside
	          var el = e.target;
	          while (el.tagName !== 'A' && el !== this.el) {
	            el = el.parentNode;
	          }
	          if (el.tagName === 'A' && sameOrigin(el)) {
	            e.preventDefault();
	            var path = el.pathname;
	            if (this.router.history.root) {
	              path = path.replace(this.router.history.rootRE, '');
	            }
	            this.router.go({
	              path: path,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      },

	      onRouteUpdate: function onRouteUpdate(route) {
	        // router.stringifyPath is dependent on current route
	        // and needs to be called again whenver route changes.
	        var newPath = this.router.stringifyPath(this.target);
	        if (this.path !== newPath) {
	          this.path = newPath;
	          this.updateActiveMatch();
	          this.updateHref();
	        }
	        if (this.activeIds) {
	          this.vm.$emit(LINK_UPDATE, this, route.path);
	        } else {
	          this.updateClasses(route.path, this.el);
	        }
	      },

	      updateActiveMatch: function updateActiveMatch() {
	        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      },

	      updateHref: function updateHref() {
	        if (this.el.tagName !== 'A') {
	          return;
	        }
	        var path = this.path;
	        var router = this.router;
	        var isAbsolute = path.charAt(0) === '/';
	        // do not format non-hash relative paths
	        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      },

	      updateClasses: function updateClasses(path, el) {
	        var activeClass = this.activeClass || this.router._linkActiveClass;
	        // clear old class
	        if (this.prevActiveClass && this.prevActiveClass !== activeClass) {
	          toggleClasses(el, this.prevActiveClass, removeClass);
	        }
	        // remove query string before matching
	        var dest = this.path.replace(queryStringRE, '');
	        path = path.replace(queryStringRE, '');
	        // add new class
	        if (this.exact) {
	          if (dest === path ||
	          // also allow additional trailing slash
	          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        } else {
	          if (this.activeRE && this.activeRE.test(path)) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        }
	      },

	      unbind: function unbind() {
	        this.el.removeEventListener('click', this.handler);
	        this.unwatch && this.unwatch();
	      }
	    });

	    function sameOrigin(link) {
	      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	    }

	    // this function is copied from v-bind:class implementation until
	    // we properly expose it...
	    function toggleClasses(el, key, fn) {
	      key = key.trim();
	      if (key.indexOf(' ') === -1) {
	        fn(el, key);
	        return;
	      }
	      var keys = key.split(/\s+/);
	      for (var i = 0, l = keys.length; i < l; i++) {
	        fn(el, keys[i]);
	      }
	    }
	  }

	  var historyBackends = {
	    abstract: AbstractHistory,
	    hash: HashHistory,
	    html5: HTML5History
	  };

	  // late bind during install
	  var Vue = undefined;

	  /**
	   * Router constructor
	   *
	   * @param {Object} [options]
	   */

	  var Router = (function () {
	    function Router() {
	      var _this = this;

	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var _ref$hashbang = _ref.hashbang;
	      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	      var _ref$abstract = _ref.abstract;
	      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	      var _ref$history = _ref.history;
	      var history = _ref$history === undefined ? false : _ref$history;
	      var _ref$saveScrollPosition = _ref.saveScrollPosition;
	      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	      var _ref$transitionOnLoad = _ref.transitionOnLoad;
	      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	      var _ref$suppressTransitionError = _ref.suppressTransitionError;
	      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	      var _ref$root = _ref.root;
	      var root = _ref$root === undefined ? null : _ref$root;
	      var _ref$linkActiveClass = _ref.linkActiveClass;
	      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	      babelHelpers.classCallCheck(this, Router);

	      /* istanbul ignore if */
	      if (!Router.installed) {
	        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	      }

	      // Vue instances
	      this.app = null;
	      this._children = [];

	      // route recognizer
	      this._recognizer = new RouteRecognizer();
	      this._guardRecognizer = new RouteRecognizer();

	      // state
	      this._started = false;
	      this._startCb = null;
	      this._currentRoute = {};
	      this._currentTransition = null;
	      this._previousTransition = null;
	      this._notFoundHandler = null;
	      this._notFoundRedirect = null;
	      this._beforeEachHooks = [];
	      this._afterEachHooks = [];

	      // trigger transition on initial render?
	      this._rendered = false;
	      this._transitionOnLoad = transitionOnLoad;

	      // history mode
	      this._root = root;
	      this._abstract = abstract;
	      this._hashbang = hashbang;

	      // check if HTML5 history is available
	      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	      this._history = history && hasPushState;
	      this._historyFallback = history && !hasPushState;

	      // create history object
	      var inBrowser = Vue.util.inBrowser;
	      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

	      var History = historyBackends[this.mode];
	      this.history = new History({
	        root: root,
	        hashbang: this._hashbang,
	        onChange: function onChange(path, state, anchor) {
	          _this._match(path, state, anchor);
	        }
	      });

	      // other options
	      this._saveScrollPosition = saveScrollPosition;
	      this._linkActiveClass = linkActiveClass;
	      this._suppress = suppressTransitionError;
	    }

	    /**
	     * Allow directly passing components to a route
	     * definition.
	     *
	     * @param {String} path
	     * @param {Object} handler
	     */

	    // API ===================================================

	    /**
	    * Register a map of top-level paths.
	    *
	    * @param {Object} map
	    */

	    Router.prototype.map = function map(_map) {
	      for (var route in _map) {
	        this.on(route, _map[route]);
	      }
	      return this;
	    };

	    /**
	     * Register a single root-level path
	     *
	     * @param {String} rootPath
	     * @param {Object} handler
	     *                 - {String} component
	     *                 - {Object} [subRoutes]
	     *                 - {Boolean} [forceRefresh]
	     *                 - {Function} [before]
	     *                 - {Function} [after]
	     */

	    Router.prototype.on = function on(rootPath, handler) {
	      if (rootPath === '*') {
	        this._notFound(handler);
	      } else {
	        this._addRoute(rootPath, handler, []);
	      }
	      return this;
	    };

	    /**
	     * Set redirects.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.redirect = function redirect(map) {
	      for (var path in map) {
	        this._addRedirect(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set aliases.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.alias = function alias(map) {
	      for (var path in map) {
	        this._addAlias(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set global before hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.beforeEach = function beforeEach(fn) {
	      this._beforeEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Set global after hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.afterEach = function afterEach(fn) {
	      this._afterEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Navigate to a given path.
	     * The path can be an object describing a named path in
	     * the format of { name: '...', params: {}, query: {}}
	     * The path is assumed to be already decoded, and will
	     * be resolved against root (if provided)
	     *
	     * @param {String|Object} path
	     * @param {Boolean} [replace]
	     */

	    Router.prototype.go = function go(path) {
	      var replace = false;
	      var append = false;
	      if (Vue.util.isObject(path)) {
	        replace = path.replace;
	        append = path.append;
	      }
	      path = this.stringifyPath(path);
	      if (path) {
	        this.history.go(path, replace, append);
	      }
	    };

	    /**
	     * Short hand for replacing current path
	     *
	     * @param {String} path
	     */

	    Router.prototype.replace = function replace(path) {
	      if (typeof path === 'string') {
	        path = { path: path };
	      }
	      path.replace = true;
	      this.go(path);
	    };

	    /**
	     * Start the router.
	     *
	     * @param {VueConstructor} App
	     * @param {String|Element} container
	     * @param {Function} [cb]
	     */

	    Router.prototype.start = function start(App, container, cb) {
	      /* istanbul ignore if */
	      if (this._started) {
	        warn$1('already started.');
	        return;
	      }
	      this._started = true;
	      this._startCb = cb;
	      if (!this.app) {
	        /* istanbul ignore if */
	        if (!App || !container) {
	          throw new Error('Must start vue-router with a component and a ' + 'root container.');
	        }
	        /* istanbul ignore if */
	        if (App instanceof Vue) {
	          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
	        }
	        this._appContainer = container;
	        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	        // give it a name for better debugging
	        Ctor.options.name = Ctor.options.name || 'RouterApp';
	      }

	      // handle history fallback in browsers that do not
	      // support HTML5 history API
	      if (this._historyFallback) {
	        var _location = window.location;
	        var _history = new HTML5History({ root: this._root });
	        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
	        if (path && path !== '/') {
	          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
	          return;
	        }
	      }

	      this.history.start();
	    };

	    /**
	     * Stop listening to route changes.
	     */

	    Router.prototype.stop = function stop() {
	      this.history.stop();
	      this._started = false;
	    };

	    /**
	     * Normalize named route object / string paths into
	     * a string.
	     *
	     * @param {Object|String|Number} path
	     * @return {String}
	     */

	    Router.prototype.stringifyPath = function stringifyPath(path) {
	      var generatedPath = '';
	      if (path && typeof path === 'object') {
	        if (path.name) {
	          var extend = Vue.util.extend;
	          var currentParams = this._currentTransition && this._currentTransition.to.params;
	          var targetParams = path.params || {};
	          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
	          generatedPath = encodeURI(this._recognizer.generate(path.name, params));
	        } else if (path.path) {
	          generatedPath = encodeURI(path.path);
	        }
	        if (path.query) {
	          // note: the generated query string is pre-URL-encoded by the recognizer
	          var query = this._recognizer.generateQueryString(path.query);
	          if (generatedPath.indexOf('?') > -1) {
	            generatedPath += '&' + query.slice(1);
	          } else {
	            generatedPath += query;
	          }
	        }
	      } else {
	        generatedPath = encodeURI(path ? path + '' : '');
	      }
	      return generatedPath;
	    };

	    // Internal methods ======================================

	    /**
	    * Add a route containing a list of segments to the internal
	    * route recognizer. Will be called recursively to add all
	    * possible sub-routes.
	    *
	    * @param {String} path
	    * @param {Object} handler
	    * @param {Array} segments
	    */

	    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	      guardComponent(path, handler);
	      handler.path = path;
	      handler.fullPath = (segments.reduce(function (path, segment) {
	        return path + segment.path;
	      }, '') + path).replace('//', '/');
	      segments.push({
	        path: path,
	        handler: handler
	      });
	      this._recognizer.add(segments, {
	        as: handler.name
	      });
	      // add sub routes
	      if (handler.subRoutes) {
	        for (var subPath in handler.subRoutes) {
	          // recursively walk all sub routes
	          this._addRoute(subPath, handler.subRoutes[subPath],
	          // pass a copy in recursion to avoid mutating
	          // across branches
	          segments.slice());
	        }
	      }
	    };

	    /**
	     * Set the notFound route handler.
	     *
	     * @param {Object} handler
	     */

	    Router.prototype._notFound = function _notFound(handler) {
	      guardComponent('*', handler);
	      this._notFoundHandler = [{ handler: handler }];
	    };

	    /**
	     * Add a redirect record.
	     *
	     * @param {String} path
	     * @param {String} redirectPath
	     */

	    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	      if (path === '*') {
	        this._notFoundRedirect = redirectPath;
	      } else {
	        this._addGuard(path, redirectPath, this.replace);
	      }
	    };

	    /**
	     * Add an alias record.
	     *
	     * @param {String} path
	     * @param {String} aliasPath
	     */

	    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	      this._addGuard(path, aliasPath, this._match);
	    };

	    /**
	     * Add a path guard.
	     *
	     * @param {String} path
	     * @param {String} mappedPath
	     * @param {Function} handler
	     */

	    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	      var _this2 = this;

	      this._guardRecognizer.add([{
	        path: path,
	        handler: function handler(match, query) {
	          var realPath = mapParams(mappedPath, match.params, query);
	          _handler.call(_this2, realPath);
	        }
	      }]);
	    };

	    /**
	     * Check if a path matches any redirect records.
	     *
	     * @param {String} path
	     * @return {Boolean} - if true, will skip normal match.
	     */

	    Router.prototype._checkGuard = function _checkGuard(path) {
	      var matched = this._guardRecognizer.recognize(path, true);
	      if (matched) {
	        matched[0].handler(matched[0], matched.queryParams);
	        return true;
	      } else if (this._notFoundRedirect) {
	        matched = this._recognizer.recognize(path);
	        if (!matched) {
	          this.replace(this._notFoundRedirect);
	          return true;
	        }
	      }
	    };

	    /**
	     * Match a URL path and set the route context on vm,
	     * triggering view updates.
	     *
	     * @param {String} path
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._match = function _match(path, state, anchor) {
	      var _this3 = this;

	      if (this._checkGuard(path)) {
	        return;
	      }

	      var currentRoute = this._currentRoute;
	      var currentTransition = this._currentTransition;

	      if (currentTransition) {
	        if (currentTransition.to.path === path) {
	          // do nothing if we have an active transition going to the same path
	          return;
	        } else if (currentRoute.path === path) {
	          // We are going to the same path, but we also have an ongoing but
	          // not-yet-validated transition. Abort that transition and reset to
	          // prev transition.
	          currentTransition.aborted = true;
	          this._currentTransition = this._prevTransition;
	          return;
	        } else {
	          // going to a totally different path. abort ongoing transition.
	          currentTransition.aborted = true;
	        }
	      }

	      // construct new route and transition context
	      var route = new Route(path, this);
	      var transition = new RouteTransition(this, route, currentRoute);

	      // current transition is updated right now.
	      // however, current route will only be updated after the transition has
	      // been validated.
	      this._prevTransition = currentTransition;
	      this._currentTransition = transition;

	      if (!this.app) {
	        (function () {
	          // initial render
	          var router = _this3;
	          _this3.app = new _this3._appConstructor({
	            el: _this3._appContainer,
	            created: function created() {
	              this.$router = router;
	            },
	            _meta: {
	              $route: route
	            }
	          });
	        })();
	      }

	      // check global before hook
	      var beforeHooks = this._beforeEachHooks;
	      var startTransition = function startTransition() {
	        transition.start(function () {
	          _this3._postTransition(route, state, anchor);
	        });
	      };

	      if (beforeHooks.length) {
	        transition.runQueue(beforeHooks, function (hook, _, next) {
	          if (transition === _this3._currentTransition) {
	            transition.callHook(hook, null, next, {
	              expectBoolean: true
	            });
	          }
	        }, startTransition);
	      } else {
	        startTransition();
	      }

	      if (!this._rendered && this._startCb) {
	        this._startCb.call(null);
	      }

	      // HACK:
	      // set rendered to true after the transition start, so
	      // that components that are acitvated synchronously know
	      // whether it is the initial render.
	      this._rendered = true;
	    };

	    /**
	     * Set current to the new transition.
	     * This is called by the transition object when the
	     * validation of a route has succeeded.
	     *
	     * @param {Transition} transition
	     */

	    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	      // set current route
	      var route = this._currentRoute = transition.to;
	      // update route context for all children
	      if (this.app.$route !== route) {
	        this.app.$route = route;
	        this._children.forEach(function (child) {
	          child.$route = route;
	        });
	      }
	      // call global after hook
	      if (this._afterEachHooks.length) {
	        this._afterEachHooks.forEach(function (hook) {
	          return hook.call(null, {
	            to: transition.to,
	            from: transition.from
	          });
	        });
	      }
	      this._currentTransition.done = true;
	    };

	    /**
	     * Handle stuff after the transition.
	     *
	     * @param {Route} route
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	      // handle scroll positions
	      // saved scroll positions take priority
	      // then we check if the path has an anchor
	      var pos = state && state.pos;
	      if (pos && this._saveScrollPosition) {
	        Vue.nextTick(function () {
	          window.scrollTo(pos.x, pos.y);
	        });
	      } else if (anchor) {
	        Vue.nextTick(function () {
	          var el = document.getElementById(anchor.slice(1));
	          if (el) {
	            window.scrollTo(window.scrollX, el.offsetTop);
	          }
	        });
	      }
	    };

	    return Router;
	  })();

	  function guardComponent(path, handler) {
	    var comp = handler.component;
	    if (Vue.util.isPlainObject(comp)) {
	      comp = handler.component = Vue.extend(comp);
	    }
	    /* istanbul ignore if */
	    if (typeof comp !== 'function') {
	      handler.component = null;
	      warn$1('invalid component for route "' + path + '".');
	    }
	  }

	  /* Installation */

	  Router.installed = false;

	  /**
	   * Installation interface.
	   * Install the necessary directives.
	   */

	  Router.install = function (externalVue) {
	    /* istanbul ignore if */
	    if (Router.installed) {
	      warn$1('already installed.');
	      return;
	    }
	    Vue = externalVue;
	    applyOverride(Vue);
	    View(Vue);
	    Link(Vue);
	    exports$1.Vue = Vue;
	    Router.installed = true;
	  };

	  // auto install
	  /* istanbul ignore if */
	  if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(Router);
	  }

	  return Router;

	}));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Install plugin.
	 */

	function install(Vue) {

	    var _ = __webpack_require__(6)(Vue);

	    Vue.url = __webpack_require__(7)(_);
	    Vue.http = __webpack_require__(8)(_);
	    Vue.resource = __webpack_require__(12)(_);

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function () {
	                return _.options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function () {
	                return _.options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        }

	    });
	}

	if (window.Vue) {
	    Vue.use(install);
	}

	module.exports = install;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Utility functions.
	 */

	module.exports = function (Vue) {

	    var _ = Vue.util.extend({}, Vue.util);

	    _.isString = function (value) {
	        return typeof value === 'string';
	    };

	    _.isFunction = function (value) {
	        return typeof value === 'function';
	    };

	    _.options = function (fn, obj, options) {

	        options = options || {};

	        if (_.isFunction(options)) {
	            options = options.call(obj);
	        }

	        return _.extend(fn.bind({vm: obj, options: options}), fn, {options: options});
	    };

	    _.each = function (obj, iterator) {

	        var i, key;

	        if (typeof obj.length == 'number') {
	            for (i = 0; i < obj.length; i++) {
	                iterator.call(obj[i], obj[i], i);
	            }
	        } else if (_.isObject(obj)) {
	            for (key in obj) {
	                if (obj.hasOwnProperty(key)) {
	                    iterator.call(obj[key], obj[key], key);
	                }
	            }
	        }

	        return obj;
	    };

	    _.extend = function (target) {

	        var array = [], args = array.slice.call(arguments, 1), deep;

	        if (typeof target == 'boolean') {
	            deep = target;
	            target = args.shift();
	        }

	        args.forEach(function (arg) {
	            extend(target, arg, deep);
	        });

	        return target;
	    };

	    function extend(target, source, deep) {
	        for (var key in source) {
	            if (deep && (_.isPlainObject(source[key]) || _.isArray(source[key]))) {
	                if (_.isPlainObject(source[key]) && !_.isPlainObject(target[key])) {
	                    target[key] = {};
	                }
	                if (_.isArray(source[key]) && !_.isArray(target[key])) {
	                    target[key] = [];
	                }
	                extend(target[key], source[key], deep);
	            } else if (source[key] !== undefined) {
	                target[key] = source[key];
	            }
	        }
	    }

	    return _;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Service for URL templating.
	 */

	var ie = document.documentMode;
	var el = document.createElement('a');

	module.exports = function (_) {

	    function Url(url, params) {

	        var urlParams = {}, queryParams = {}, options = url, query;

	        if (!_.isPlainObject(options)) {
	            options = {url: url, params: params};
	        }

	        options = _.extend(true, {},
	            Url.options, this.options, options
	        );

	        url = options.url.replace(/(\/?):([a-z]\w*)/gi, function (match, slash, name) {

	            if (options.params[name]) {
	                urlParams[name] = true;
	                return slash + encodeUriSegment(options.params[name]);
	            }

	            return '';
	        });

	        if (_.isString(options.root) && !url.match(/^(https?:)?\//)) {
	            url = options.root + '/' + url;
	        }

	        _.each(options.params, function (value, key) {
	            if (!urlParams[key]) {
	                queryParams[key] = value;
	            }
	        });

	        query = Url.params(queryParams);

	        if (query) {
	            url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	        }

	        return url;
	    }

	    /**
	     * Url options.
	     */

	    Url.options = {
	        url: '',
	        root: null,
	        params: {}
	    };

	    /**
	     * Encodes a Url parameter string.
	     *
	     * @param {Object} obj
	     */

	    Url.params = function (obj) {

	        var params = [];

	        params.add = function (key, value) {

	            if (_.isFunction (value)) {
	                value = value();
	            }

	            if (value === null) {
	                value = '';
	            }

	            this.push(encodeUriSegment(key) + '=' + encodeUriSegment(value));
	        };

	        serialize(params, obj);

	        return params.join('&');
	    };

	    /**
	     * Parse a URL and return its components.
	     *
	     * @param {String} url
	     */

	    Url.parse = function (url) {

	        if (ie) {
	            el.href = url;
	            url = el.href;
	        }

	        el.href = url;

	        return {
	            href: el.href,
	            protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	            port: el.port,
	            host: el.host,
	            hostname: el.hostname,
	            pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	            search: el.search ? el.search.replace(/^\?/, '') : '',
	            hash: el.hash ? el.hash.replace(/^#/, '') : ''
	        };
	    };

	    function serialize(params, obj, scope) {

	        var array = _.isArray(obj), plain = _.isPlainObject(obj), hash;

	        _.each(obj, function (value, key) {

	            hash = _.isObject(value) || _.isArray(value);

	            if (scope) {
	                key = scope + '[' + (plain || hash ? key : '') + ']';
	            }

	            if (!scope && array) {
	                params.add(value.name, value.value);
	            } else if (hash) {
	                serialize(params, value, key);
	            } else {
	                params.add(key, value);
	            }
	        });
	    }

	    function encodeUriSegment(value) {

	        return encodeUriQuery(value, true).
	            replace(/%26/gi, '&').
	            replace(/%3D/gi, '=').
	            replace(/%2B/gi, '+');
	    }

	    function encodeUriQuery(value, spaces) {

	        return encodeURIComponent(value).
	            replace(/%40/gi, '@').
	            replace(/%3A/gi, ':').
	            replace(/%24/g, '$').
	            replace(/%2C/gi, ',').
	            replace(/%20/g, (spaces ? '%20' : '+'));
	    }

	    return _.url = Url;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for sending network requests.
	 */

	var xhr = __webpack_require__(9);
	var jsonp = __webpack_require__(11);
	var Promise = __webpack_require__(10);

	module.exports = function (_) {

	    var originUrl = _.url.parse(location.href);
	    var jsonType = {'Content-Type': 'application/json;charset=utf-8'};

	    function Http(url, options) {

	        var promise;

	        if (_.isPlainObject(url)) {
	            options = url;
	            url = '';
	        }

	        options = _.extend({url: url}, options);
	        options = _.extend(true, {},
	            Http.options, this.options, options
	        );

	        if (options.crossOrigin === null) {
	            options.crossOrigin = crossOrigin(options.url);
	        }

	        options.method = options.method.toUpperCase();
	        options.headers = _.extend({}, Http.headers.common,
	            !options.crossOrigin ? Http.headers.custom : {},
	            Http.headers[options.method.toLowerCase()],
	            options.headers
	        );

	        if (_.isPlainObject(options.data) && /^(GET|JSONP)$/i.test(options.method)) {
	            _.extend(options.params, options.data);
	            delete options.data;
	        }

	        if (options.emulateHTTP && !options.crossOrigin && /^(PUT|PATCH|DELETE)$/i.test(options.method)) {
	            options.headers['X-HTTP-Method-Override'] = options.method;
	            options.method = 'POST';
	        }

	        if (options.emulateJSON && _.isPlainObject(options.data)) {
	            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	            options.data = _.url.params(options.data);
	        }

	        if (_.isObject(options.data) && /FormData/i.test(options.data.toString())) {
	            delete options.headers['Content-Type'];
	        }

	        if (_.isPlainObject(options.data)) {
	            options.data = JSON.stringify(options.data);
	        }

	        promise = (options.method == 'JSONP' ? jsonp : xhr).call(this.vm, _, options);
	        promise = extendPromise(promise.then(transformResponse, transformResponse), this.vm);

	        if (options.success) {
	            promise = promise.success(options.success);
	        }

	        if (options.error) {
	            promise = promise.error(options.error);
	        }

	        return promise;
	    }

	    function extendPromise(promise, vm) {

	        promise.success = function (fn) {

	            return extendPromise(promise.then(function (response) {
	                return fn.call(vm, response.data, response.status, response) || response;
	            }), vm);

	        };

	        promise.error = function (fn) {

	            return extendPromise(promise.then(undefined, function (response) {
	                return fn.call(vm, response.data, response.status, response) || response;
	            }), vm);

	        };

	        promise.always = function (fn) {

	            var cb = function (response) {
	                return fn.call(vm, response.data, response.status, response) || response;
	            };

	            return extendPromise(promise.then(cb, cb), vm);
	        };

	        return promise;
	    }

	    function transformResponse(response) {

	        try {
	            response.data = JSON.parse(response.responseText);
	        } catch (e) {
	            response.data = response.responseText;
	        }

	        return response.ok ? response : Promise.reject(response);
	    }

	    function crossOrigin(url) {

	        var requestUrl = _.url.parse(url);

	        return (requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host);
	    }

	    Http.options = {
	        method: 'get',
	        params: {},
	        data: '',
	        xhr: null,
	        jsonp: 'callback',
	        beforeSend: null,
	        crossOrigin: null,
	        emulateHTTP: false,
	        emulateJSON: false
	    };

	    Http.headers = {
	        put: jsonType,
	        post: jsonType,
	        patch: jsonType,
	        delete: jsonType,
	        common: {'Accept': 'application/json, text/plain, */*'},
	        custom: {'X-Requested-With': 'XMLHttpRequest'}
	    };

	    ['get', 'put', 'post', 'patch', 'delete', 'jsonp'].forEach(function (method) {

	        Http[method] = function (url, data, success, options) {

	            if (_.isFunction(data)) {
	                options = success;
	                success = data;
	                data = undefined;
	            }

	            return this(url, _.extend({method: method, data: data, success: success}, options));
	        };
	    });

	    return _.http = Http;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XMLHttp request.
	 */

	var Promise = __webpack_require__(10);
	var XDomain = window.XDomainRequest;

	module.exports = function (_, options) {

	    var request = new XMLHttpRequest(), promise;

	    if (XDomain && options.crossOrigin) {
	        request = new XDomainRequest(); options.headers = {};
	    }

	    if (_.isPlainObject(options.xhr)) {
	        _.extend(request, options.xhr);
	    }

	    if (_.isFunction(options.beforeSend)) {
	        options.beforeSend.call(this, request, options);
	    }

	    promise = new Promise(function (resolve, reject) {

	        request.open(options.method, _.url(options), true);

	        _.each(options.headers, function (value, header) {
	            request.setRequestHeader(header, value);
	        });

	        var handler = function (event) {

	            request.ok = event.type === 'load';

	            if (request.ok && request.status) {
	                request.ok = request.status >= 200 && request.status < 300;
	            }

	            (request.ok ? resolve : reject)(request);
	        };

	        request.onload = handler;
	        request.onabort = handler;
	        request.onerror = handler;

	        request.send(options.data);
	    });

	    return promise;
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Promises/A+ polyfill v1.1.0 (https://github.com/bramstein/promis)
	 */

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING  = 2;

	function Promise(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise.reject = function (r) {
	    return new Promise(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise.resolve = function (x) {
	    return new Promise(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise.all = function all(iterable) {
	    return new Promise(function (resolve, reject) {
	        var count = 0,
	            result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            iterable[i].then(resolver(i), reject);
	        }
	    });
	};

	Promise.race = function race(iterable) {
	    return new Promise(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            iterable[i].then(resolve, reject);
	        }
	    });
	};

	var p = Promise.prototype;

	p.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;

	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p.notify = function notify() {
	    var promise = this;

	    async(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	p.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	var queue = [];
	var async = function (callback) {
	    queue.push(callback);

	    if (queue.length === 1) {
	        async.async();
	    }
	};

	async.run = function () {
	    while (queue.length) {
	        queue[0]();
	        queue.shift();
	    }
	};

	if (window.MutationObserver) {
	    var el = document.createElement('div');
	    var mo = new MutationObserver(async.run);

	    mo.observe(el, {
	        attributes: true
	    });

	    async.async = function () {
	        el.setAttribute("x", 0);
	    };
	} else {
	    async.async = function () {
	        setTimeout(async.run);
	    };
	}

	module.exports = window.Promise || Promise;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP request.
	 */

	var Promise = __webpack_require__(10);

	module.exports = function (_, options) {

	    var callback = '_jsonp' + Math.random().toString(36).substr(2), response = {}, script, body;

	    options.params[options.jsonp] = callback;

	    if (_.isFunction(options.beforeSend)) {
	        options.beforeSend.call(this, {}, options);
	    }

	    return new Promise(function (resolve, reject) {

	        script = document.createElement('script');
	        script.src = _.url(options);
	        script.type = 'text/javascript';
	        script.async = true;

	        window[callback] = function (data) {
	            body = data;
	        };

	        var handler = function (event) {

	            delete window[callback];
	            document.body.removeChild(script);

	            if (event.type === 'load' && !body) {
	                event.type = 'error';
	            }

	            response.ok = event.type !== 'error';
	            response.status = response.ok ? 200 : 404;
	            response.responseText = body ? body : event.type;

	            (response.ok ? resolve : reject)(response);
	        };

	        script.onload = handler;
	        script.onerror = handler;

	        document.body.appendChild(script);
	    });

	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Service for interacting with RESTful services.
	 */

	module.exports = function (_) {

	    function Resource(url, params, actions, options) {

	        var self = this, resource = {};

	        actions = _.extend({},
	            Resource.actions,
	            actions
	        );

	        _.each(actions, function (action, name) {

	            action = _.extend(true, {url: url, params: params || {}}, options, action);

	            resource[name] = function () {
	                return (self.$http || _.http)(opts(action, arguments));
	            };
	        });

	        return resource;
	    }

	    function opts(action, args) {

	        var options = _.extend({}, action), params = {}, data, success, error;

	        switch (args.length) {

	            case 4:

	                error = args[3];
	                success = args[2];

	            case 3:
	            case 2:

	                if (_.isFunction(args[1])) {

	                    if (_.isFunction(args[0])) {

	                        success = args[0];
	                        error = args[1];

	                        break;
	                    }

	                    success = args[1];
	                    error = args[2];

	                } else {

	                    params = args[0];
	                    data = args[1];
	                    success = args[2];

	                    break;
	                }

	            case 1:

	                if (_.isFunction(args[0])) {
	                    success = args[0];
	                } else if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                    data = args[0];
	                } else {
	                    params = args[0];
	                }

	                break;

	            case 0:

	                break;

	            default:

	                throw 'Expected up to 4 arguments [params, data, success, error], got ' + args.length + ' arguments';
	        }

	        options.data = data;
	        options.params = _.extend({}, options.params, params);

	        if (success) {
	            options.success = success;
	        }

	        if (error) {
	            options.error = error;
	        }

	        return options;
	    }

	    Resource.actions = {

	        get: {method: 'GET'},
	        save: {method: 'POST'},
	        query: {method: 'GET'},
	        update: {method: 'PUT'},
	        remove: {method: 'DELETE'},
	        delete: {method: 'DELETE'}

	    };

	    return _.resource = Resource;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(14)
	__vue_script__ = __webpack_require__(19)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\login.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(27)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-2b098770/login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".box {\n  position: absolute;\n  left: 50%;\n  top: 100px;\n  margin-left: -212.5px;\n  -webkit-transform: translate(-50% -50%);\n          transform: translate(-50% -50%);\n  width: 425px;\n  height: 458px;\n  background: inherit;\n  background-color: rgba(255, 255, 255, 0);\n  box-sizing: border-box;\n  border-radius: 0px;\n  box-shadow: none;\n  text-align: center; }\n  .box .position {\n    -webkit-transform: translateX(-20px);\n            transform: translateX(-20px); }\n  .box .myID {\n    width: 70%;\n    display: inline-block; }\n  .box .logo {\n    height: 40%;\n    position: relative;\n    background: url(" + __webpack_require__(17) + ") no-repeat center;\n    background-size: 70%;\n    margin-bottom: 20px; }\n    .box .logo p {\n      position: absolute;\n      width: 100%;\n      bottom: 60px;\n      height: 42px;\n      font-size: 36px;\n      text-align: center; }\n      .box .logo p img {\n        vertical-align: bottom;\n        padding-right: 10px;\n        margin-left: 5px;\n        margin-top: 6px; }\n  .box .Id, .box .password {\n    position: relative;\n    text-align: center; }\n    .box .Id img, .box .password img {\n      position: absolute;\n      margin-top: 5px;\n      margin-left: 6px; }\n    .box .Id input, .box .password input {\n      width: 300px;\n      height: 36px;\n      font-family: 'Arial Normal', 'Arial';\n      font-weight: 400;\n      font-style: normal;\n      font-size: 13px;\n      text-decoration: none;\n      color: #000000;\n      color: #999999;\n      text-align: left;\n      border: 1px solid #ccc;\n      padding-left: 30px;\n      box-sizing: border-box; }\n  .box .password {\n    margin-top: 20px; }\n  .box button {\n    width: 236px;\n    height: 36px;\n    margin: 50px auto;\n    line-height: 6px; }\n", ""]);

	// exports


/***/ },
/* 16 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/juyouhui.a05ee93.png";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _top = __webpack_require__(20);

	var _top2 = _interopRequireDefault(_top);

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<div>
	// 		<top-logo></top-logo>
	// 		<div class="box">
	// 			<div class="logo">
	// 				 <!-- <p><img src="../images/u3.png">聚优惠</p> -->
	// 			</div>
	// 			<div class="login">
	// 				<!-- <div class="Id">
	// 					<img src="../images/u20.png">
	// 					<input type="text" name="">
	// 				</div> -->
	// 				<!-- <div class="password">
	// 					<img src="../images/u10.png">
	// 					<input type="passwords" name="">
	// 				</div> -->
	// 				 <div class="form-group position">
	// 				    <label for="exampleInputName2">账号：</label>
	// 				    <input  type="text" class="form-control myID" id="exampleInputName2"   v-el:account>
	// 				 </div>
	// 				  <div class="form-group position">
	// 				    <label for="exampleInputEmail2">密码：</label>
	// 				    <input type="password" class="form-control myID" id="exampleInputEmail2"   v-el:pw>
	// 				  </div>
	// 				<!-- <button @click="login">登录</button> -->
	// 				<button type="button" class="btn btn-primary btn-lg btn-block " :class="{disabled : islogining}" @click="login" :disabled="islogining"  @keyup.enter="login">登录</button>
	// 			</div>
	// 		</div>
	// 	</div>
	// </template>
	// <style lang="scss">
	//
	// 	.box {
	// 		    position: absolute;
	// 		    left: 50%;
	// 		    top: 100px;
	// 		    margin-left: -212.5px;
	//    		 	// margin-top: -229px;
	// 		    transform : translate( -50% -50%);
	// 		    width: 425px;
	// 		    height: 458px;
	// 		    background: inherit;
	// 		    background-color: rgba(255, 255, 255, 0);
	// 		    box-sizing: border-box;
	// 		    // border-width: 1px;
	// 		    // border-style: solid;
	// 		    // border-color: rgba(121, 121, 121, 1);
	// 		    border-radius: 0px;
	// 		    -moz-box-shadow: none;
	// 		    -webkit-box-shadow: none;
	// 		    box-shadow: none;
	// 		    text-align: center;
	// 		    .position {
	// 		    	transform: translateX(-20px);
	// 		    	// position: relative;
	// 		    	// label {
	// 		    	// 	position: absolute;
	// 		    	// 	left: 10px;
	// 		    	// 	top: 6px;
	// 		    	// }
	// 		    }
	// 		    .myID {
	// 		    	width: 70%;
	// 		    	display: inline-block;
	// 		    }
	// 		    .logo  {
	// 		    	height: 40%;
	// 		    	position: relative;
	// 		    	background: url(../images/juyouhui.png) no-repeat center;
	// 				background-size: 70%;
	// 				margin-bottom: 20px;
	// 		   //  	img {
	// 					// position: absolute;
	// 					// top: 5px;
	// 					// left: 5px;
	// 		   //  	}
	// 		    	p {
	// 		    		img {
	// 		    			vertical-align: bottom;
	// 		    			padding-right: 10px;
	// 		    			margin-left: 5px;
	//     					margin-top: 6px;
	// 		    		}
	// 		    		position: absolute;
	// 		    		width: 100%;
	// 		    		bottom:60px;
	// 				    height: 42px;
	// 				    font-size: 36px;
	// 		    		text-align: center;
	//
	// 		    	}
	// 		    }
	// 		    .Id,.password {
	// 		    	position: relative;
	// 		    	text-align: center;
	// 		    	img {
	// 					position: absolute;
	// 					margin-top: 5px;
	// 					margin-left: 6px;
	// 		    	}
	// 		    	input {
	// 				    width: 300px;
	// 				    height: 36px;
	// 				    font-family: 'Arial Normal', 'Arial';
	// 				    font-weight: 400;
	// 				    font-style: normal;
	// 				    font-size: 13px;
	// 				    text-decoration: none;
	// 				    color: #000000;
	// 				    color: rgb(153, 153, 153);
	// 				    text-align: left;
	// 				    border: 1px solid #ccc;
	// 				    padding-left: 30px;
	// 				    box-sizing: border-box;
	//
	// 		    	}
	//
	// 		    }
	// 		    .password {
	// 		    	margin-top: 20px;
	// 		    }
	// 		    button {
	// 		    	    width: 236px;
	//     				// word-wrap: break-word;
	//     				height: 36px;
	//     				// background-color: rgba(67, 67, 67, 1);
	// 				    // box-sizing: border-box;
	// 				    // border-width: 1px;
	// 				    // border-style: solid;
	// 				    // border-color: rgba(121, 121, 121, 1);
	// 				    // border-radius: 0px;
	// 				    // -moz-box-shadow: none;
	// 				    // -webkit-box-shadow: none;
	// 				    // box-shadow: none;
	// 				    // font-size: 20px;
	// 				    // color: #FFFFFF;
	// 				    margin: 50px auto;
	//     				line-height: 6px;
	// 		    }
	// 	}
	// </style>
	// <script type="text/javascript">
	exports.default = {
		components: {
			topLogo: _top2.default
		},
		data: function data() {
			return {
				islogining: false
			};
		},

		methods: {
			login: function login() {
				var _this = this;

				this.islogining = true;
				var account = this.$els.account.value;
				var pw = this.$els.pw.value;
				if (account.length === 0 || pw.length === 0) alert('请输入账号密码');
				_index2.default.login(this, {
					"name": account, //必填，用户名
					"psw": pw //必填，密码
				}, function (res) {
					_this.islogining = false;
					if (res.repBody === "登录成功") {
						_this.$dispatch('login', account);
					} else {
						window.alert(res.repBody);
					}
				});
			}
		}
	};
	// </script>

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(21)
	__vue_script__ = __webpack_require__(23)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] components\\top.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(24)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-fc0fe05c/top.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-fc0fe05c&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./top.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-fc0fe05c&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./top.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".top[_v-fc0fe05c] {\n  border-bottom: 1px solid #ddd;\n  font-size: 20px;\n  line-height: 61px;\n  position: relative;\n  background-color: #fff;\n  box-shadow: 1px 1px 2px #e6e2e2; }\n  .top img[_v-fc0fe05c] {\n    position: absolute;\n    top: 6px;\n    left: 15px;\n    height: 34px; }\n  .top p[_v-fc0fe05c] {\n    padding-left: 90px; }\n", ""]);

	// exports


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	// 	<h1 class="top">
	// 			<img src="../images/logo111.jpg"> <p>聚优惠&nbsp | &nbsp后台管理系统</p>
	// 			<slot></slot>	
	//
	// 	</h1>
	// </template>
	// <style lang="scss" scoped>
	// 	.top {
	// 		border-bottom: 1px solid #ddd;;
	// 		font-size: 20px;
	// 		line-height: 61px;
	// 		position: relative;
	// 		background-color: #fff;
	// 		box-shadow: 1px 1px 2px #e6e2e2;
	// 		img {
	// 			position: absolute;
	// 			top: 6px;
	// 			left: 15px;
	// 			height: 34px;
	//
	// 		}
	// 		p {
	// 			padding-left: 90px;
	// 		}
	// 	}
	// </style>
	// <script type="text/javascript">
	exports.default = {};
	// </script>

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<h1 class=\"top\" _v-fc0fe05c=\"\">\n\t\t<img src=\"" + __webpack_require__(25) + "\" _v-fc0fe05c=\"\"> <p _v-fc0fe05c=\"\">聚优惠&nbsp; | &nbsp;后台管理系统</p>\n\t\t<slot _v-fc0fe05c=\"\"></slot>\t\n\n</h1>\n";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/logo111.5f47c63.jpg";

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var api = {};

	function putApi(name, url, code, method, contentType) {
	    if (!method) {
	        method = 'post';
	    }
	    api[name] = function (context, body, fun) {
	        var data = getCreds(code, body);
	        context.$http[method](url, data, function (back) {
	            if (fun) fun(back);
	        }).error(function (err) {
	            if (fun) {
	                fun(err);
	            }
	        });
	    };
	}

	function getCreds(proNo, body) {
	    return {
	        base: {
	            reqTime: new Date().format('yyyyMMddHHmmss'),
	            proNo: proNo
	        },
	        body: body
	    };
	}

	// 示例
	// putApi('signList', basePath + 'weixin/signList', '10000');
	// putApi('find', basePath + 'goods/find', '6101');
	// putApi('findbypage', basePath + 'goods/findbypage', '6102');
	// putApi('login', basePath + 'goods/login', '6103');
	// putApi('discount', basePath + 'coupons/find', '6104');
	// putApi('findbyname', basePath + 'goods/findbyname', '6105');
	// putApi('userinsert', basePath + 'user/userinsert', '6106');
	// putApi('verify', basePath + 'user/index', '6107');
	// putApi('update', basePath + 'user/update', '6108');
	// putApi('update1', basePath + 'user/update1', '6109');
	// putApi('phoneLogin', basePath + 'user/in', '6110');


	putApi('login', basePath + 'admin/login', '6020'); //登录
	putApi('addUser', basePath + 'admin/insert', '6121'); //添加管理员
	putApi('userUpdate', basePath + 'admin/update', '6121');
	putApi('userList', basePath + 'admin/list', '6001');
	putApi('searchMessage', basePath + 'vip/findbypage', '6022');
	putApi('area', basePath + 'vip/disty', '6025'); //地区接口
	putApi('findnumber', basePath + 'vip/findnumber', '6024'); //搜索
	putApi('cancel', basePath + 'vip/upate', '6024'); //销户
	putApi('findbyphone', basePath + 'dateil/findbyphone', '6026'); //查看明细
	putApi('mk', basePath + 'vip/mk', '6028'); //查看明细
	putApi('online', basePath + 'vip/find', '6101'); //查看明细
	putApi('log', basePath + 'daily/find', '6101'); //操作日志
	putApi('findbyplace', basePath + 'vip/findbyplace', '6101'); //根据地区查询

	putApi('findbyopid', basePath + 'dateil/findbyopid', '6101'); //根据地区查询
	putApi('down1', basePath + 'dateil/down', '6101'); //根据地区查询


	putApi('detail2Prevent', basePath + 'vip/down', '6101', 'get'); //下载


	exports.default = api;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div>\n\t<top-logo></top-logo>\n\t<div class=\"box\">\n\t\t<div class=\"logo\">\n\t\t\t <!-- <p><img src=\"../images/u3.png\">聚优惠</p> -->\n\t\t</div>\n\t\t<div class=\"login\">\n\t\t\t<!-- <div class=\"Id\">\n\t\t\t\t<img src=\"" + __webpack_require__(28) + "\">\n\t\t\t\t<input type=\"text\" name=\"\">\n\t\t\t</div> -->\n\t\t\t<!-- <div class=\"password\">\n\t\t\t\t<img src=\"" + __webpack_require__(29) + "\">\n\t\t\t\t<input type=\"passwords\" name=\"\">\n\t\t\t</div> -->\n\t\t\t <div class=\"form-group position\">\n\t\t\t    <label for=\"exampleInputName2\">账号：</label>\n\t\t\t    <input  type=\"text\" class=\"form-control myID\" id=\"exampleInputName2\"   v-el:account>\n\t\t\t </div>\n\t\t\t  <div class=\"form-group position\">\n\t\t\t    <label for=\"exampleInputEmail2\">密码：</label>\n\t\t\t    <input type=\"password\" class=\"form-control myID\" id=\"exampleInputEmail2\"   v-el:pw>\n\t\t\t  </div>\n\t\t\t<!-- <button @click=\"login\">登录</button> -->\n\t\t\t<button type=\"button\" class=\"btn btn-primary btn-lg btn-block \" :class=\"{disabled : islogining}\" @click=\"login\" :disabled=\"islogining\"  @keyup.enter=\"login\">登录</button>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAJ1JREFUOMvN0z0Kg0AQhuG3F3/6BLyMbYgeQxQ8jzdKbqLbS7Rx0i2I7u5Em8x0H/OwMMzCpRJElZ0BFSPiacNzC/zjgjDuHw61E3yoiUlomHWgtmmrA7FNUx1IbJrpQGPTTgdmWlIyOhYd+HmtworBsGrARE9BBEBEQc/kAy9uuyu783aD/PCGczfwnf3VLZng+LAFZeBHDDz41/oC1MQC7RgWrj0AAAAASUVORK5CYII="

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAD/h4/MvwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAJtJREFUOMvN0EsKwjAUheE/rqGPPRVKfexKcClCcQfarThoq0gGSobHWUFsrxkU9d7RgfOFJDDDbGgIBE6sYuo7hPB4hNh+Pl1cKXA4Sm6IygYNohjSEnG0QcDjhrTgzsMG4vySWzQbWHNBE9uPPX26LkQ3dhl7fwz2JKTU8SABIIsHKQB5PKjJyDn80y9Fgd6st++gojPqJV+bJ0aI7tFLOLnyAAAAAElFTkSuQmCC"

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(31)
	__vue_script__ = __webpack_require__(33)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\home.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(34)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-61703450/home.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(32);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./home.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./home.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".quite {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 15px; }\n\n.barLeft {\n  width: 150px;\n  height: 100%;\n  padding-top: 62px;\n  background: inherit;\n  box-sizing: border-box;\n  border-radius: 0px;\n  -moz-box-shadow: none;\n  -webkit-box-shadow: none;\n  float: left; }\n  .barLeft .list-group {\n    padding-left: 5px; }\n  .barLeft button {\n    margin-top: 1px; }\n  .barLeft > div {\n    padding-left: 10px;\n    cursor: pointer;\n    line-height: 46px; }\n    .barLeft > div img {\n      vertical-align: middle; }\n  .barLeft > div.active {\n    background-color: #cccccc; }\n  .barLeft .manageChild button {\n    width: 100%;\n    display: block;\n    box-sizing: border-box; }\n  .barLeft .manageChild button.active {\n    background-color: #8bbeea;\n    border-color: #8bbeea;\n    z-index: 2;\n    color: #fff; }\n\n.content {\n  height: 100%;\n  padding-top: 62px;\n  box-sizing: border-box; }\n\n.name {\n  display: inline-block;\n  background: #fff;\n  border: 1px solid #ddd;\n  border-bottom: none;\n  -webkit-transform: translateY(1px);\n          transform: translateY(1px);\n  padding: 0 10px;\n  border-radius: 5px 5px 0 0; }\n", ""]);

	// exports


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _top = __webpack_require__(20);

	var _top2 = _interopRequireDefault(_top);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: {
			topLogo: _top2.default
		},
		watch: {
			manageChildIndex: function manageChildIndex(val) {
				val === 0 ? this.bar[3].path = '/home/manage/log' : this.bar[3].path = '/home/manage/account';
			}
		},
		ready: function ready() {

			//监听初始化路由
			var path = this.$router._currentRoute.path;
			switch (path) {
				case '/home/spending':
					this.activeIndex = 0;
					break;
				case '/home/message':
					this.activeIndex = 1;
					break;
				case '/home/statistics':
					this.activeIndex = 2;
					break;
				case '/home/manage/log':
					this.activeIndex = 3;
					this.manageChildIndex = 0;
					break;
				case '/home/manage/account':
					this.activeIndex = 3;
					this.manageChildIndex = 1;
					break;
			}
			if (path.indexOf('detail1') != -1) {
				this.activeIndex = 3;
				this.manageChildIndex = 0;
			} else if (path.indexOf('detail') != -1) {
				this.activeIndex = 1;
			}
		},
		data: function data() {
			return {
				bar: [{
					name: '开销户处理',
					path: '/home/spending',
					logo: 'glyphicon-folder-open'
				}, {
					name: '用户信息查询',
					path: '/home/message',
					logo: 'glyphicon-search'
				}, {
					name: '业务统计查询',
					path: '/home/statistics',
					logo: 'glyphicon-list-alt'
				}, {
					name: '系统管理',
					path: '/home/manage/log',
					logo: 'glyphicon-cog'
					// path : manageChildIndex === 0 ? '/home/manage/log' :'/home/manage/account'
				}],
				activeIndex: 0,
				manageChildIndex: 0,
				account: this.$root.user

			};
		},

		methods: {
			// clikcBar (index) {
			// 	this
			// }
			quite: function quite() {
				this.$dispatch('quite');
			}
		}
	};
	// </script>
	// <template>
	// 	<div style="height: 100%">
	// 		<top-logo style="position: absolute;width: 100%; z-index: 100;">
	// 			<div class="quite">
	// 				<span class="name">{{account}}</span> | <button style="border: none;border-bottom: 1px solid #ddd;height: 100%" type="button" class="btn btn-default" @click="quite">退出</button>
	// 			</div>
	// 		</top-logo>
	// 		<div class="barLeft">
	// 			<!-- <div v-for = "item in bar" @click = "activeIndex = $index" :class="{active : activeIndex===$index}">
	// 				<img src="../images/u54.png">
	// 				{{item.name}}
	// 			</div> -->
	// 			<div class="list-group">
	// 			  	<button type="button" class="list-group-item" v-link="{path:item.path}" v-for = "item in bar" @click = "activeIndex = $index" :class="{active : activeIndex===$index}">
	// 			  		<!-- <img src="../images/u54.png"> -->
	// 			  		<span class="glyphicon" :class="item.logo" aria-hidden="true"></span>
	// 					{{item.name}}
	// 				</button>
	// 			  	<div class="manageChild" v-if="activeIndex===3">
	// 					<button type="button" class="btn btn-default" v-link="{path:'/home/manage/log'}" :class="{active:manageChildIndex===0}" @click="manageChildIndex=0">操作日志</button>
	// 					<button type="button" class="btn btn-default" v-link="{path:'/home/manage/account'}" :class="{active:manageChildIndex===1}" @click="manageChildIndex=1">账号管理</button>
	// 				</div>
	// 			</div>
	//
	// 		</div>
	// 		<div class="content">
	// 			<router-view keep-alive></router-view>
	// 		</div>
	// 	</div>
	// </template>
	// <style lang="scss">
	// 	.quite {
	// 		position: absolute;
	// 		top: 0;
	// 		bottom: 0;
	// 		right: 15px;
	// 	}
	// 	.barLeft {
	// 	    width: 150px;
	// 	    height: 100%;
	// 	    padding-top: 62px;
	// 	    // margin-left: 5px;
	// 	    background: inherit;
	// 	    // background-color: rgba(255, 255, 255, 1);
	// 	    box-sizing: border-box;
	// 	    // border-width: 1px;
	// 	    // border-style: solid;
	// 	    // border-color: rgba(121, 121, 121, 1);
	// 	    border-radius: 0px;
	// 	    -moz-box-shadow: none;
	// 	    -webkit-box-shadow: none;
	// 	    // box-shadow: none;
	// 	    float: left;
	// 	    .list-group {
	// 	    	padding-left: 5px;
	// 	    }
	// 	     button {
	// 	    	margin-top: 1px;
	// 	    }
	// 	    >div {
	// 	    	padding-left: 10px;
	// 			cursor : pointer;
	// 	    	line-height: 46px;
	// 	    	// border-bottom: 1px solid;
	// 		    // border-color: rgba(121, 121, 121, 1);
	// 	    	img {
	// 	    		vertical-align: middle;
	// 	    	}
	// 	    } 
	// 	    >div.active {
	// 	    	background-color: rgba(204, 204, 204, 1);
	// 	    }
	// 	    .manageChild {
	// 	    	button {
	// 	    		width: 100%;
	// 	    		display: block;
	// 	    		box-sizing: border-box;
	// 	    	}
	// 	    	button.active {
	// 	    		    background-color: #8bbeea;
	//     				border-color: #8bbeea;
	//     				z-index: 2;
	//     				color: #fff;
	// 	    	}
	// 	    }
	// 	}
	// 	.content {
	// 		height: 100%;
	// 		padding-top: 62px;
	// 		box-sizing: border-box;
	// 	}
	// 	.name {
	// 		display: inline-block;
	// 	    background: #fff;
	// 	    border: 1px solid #ddd;
	// 	    border-bottom: none;
	// 	    transform: translateY(1px);
	// 	    padding: 0 10px;
	// 	    border-radius: 5px 5px 0 0;
	// 	}
	// </style>
	// <script type="text/javascript">

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div style=\"height: 100%\">\n\t<top-logo style=\"position: absolute;width: 100%; z-index: 100;\">\n\t\t<div class=\"quite\">\n\t\t\t<span class=\"name\">{{account}}</span> | <button style=\"border: none;border-bottom: 1px solid #ddd;height: 100%\" type=\"button\" class=\"btn btn-default\" @click=\"quite\">退出</button>\n\t\t</div>\n\t</top-logo>\n\t<div class=\"barLeft\">\n\t\t<!-- <div v-for = \"item in bar\" @click = \"activeIndex = $index\" :class=\"{active : activeIndex===$index}\">\n\t\t\t<img src=\"" + __webpack_require__(35) + "\">\n\t\t\t{{item.name}}\n\t\t</div> -->\n\t\t<div class=\"list-group\">\n\t\t  \t<button type=\"button\" class=\"list-group-item\" v-link=\"{path:item.path}\" v-for = \"item in bar\" @click = \"activeIndex = $index\" :class=\"{active : activeIndex===$index}\">\n\t\t  \t\t<!-- <img src=\"../images/u54.png\"> -->\n\t\t  \t\t<span class=\"glyphicon\" :class=\"item.logo\" aria-hidden=\"true\"></span>\n\t\t\t\t{{item.name}}\n\t\t\t</button>\n\t\t  \t<div class=\"manageChild\" v-if=\"activeIndex===3\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-default\" v-link=\"{path:'/home/manage/log'}\" :class=\"{active:manageChildIndex===0}\" @click=\"manageChildIndex=0\">操作日志</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-default\" v-link=\"{path:'/home/manage/account'}\" :class=\"{active:manageChildIndex===1}\" @click=\"manageChildIndex=1\">账号管理</button>\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\t<div class=\"content\">\n\t\t<router-view keep-alive></router-view>\n\t</div>\n</div>\n";

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFASURBVEhLvdYxqoNAFIXhG0t1CzZi4T4sBAWxcTGuwI2ICKK4JxsbGxdgHmcYgxrN3Ink/VUYw3zkOjB55Hn+pB9WFMVDILZtU5qm5DiOfHSvaZqormua51kgBhYBdF1HwzCIL90Je5RlSUEQyBUigeAXhGFITdPcgsZxFHtgL9/35apEEBaTJKG+77+CMKK2bSmKoh2AXgjyPE+MThda3wFGdATQDkEYnQ6kAtAbgrgQB0CnCFJBXABdIugK0gHQRwQdIV0AKRG0hXQBxEKQaZpkGAYty0KWZclVXixkOyLOqTumRI7vgHu8t31Erl6yLnSJqE6RDnSKcI8pF3pDuMAaB9ohuA90gDUV9ELwsKoqbWANUBzHpxefQDAiXL9nF45OruuKPY6QQDCi45X5bdgjyzIxurV/+UskP/4yoj+HQ/vvu/rWfwAAAABJRU5ErkJggg=="

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(37)
	__vue_script__ = __webpack_require__(39)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\spending.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(45)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-935fbb96/spending.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-935fbb96&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./spending.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-935fbb96&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./spending.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".box1[_v-935fbb96] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100%;\n  padding-left: 20px;\n  padding-top: 20px;\n  padding-right: 50px;\n  box-sizing: border-box; }\n  .box1 .open button[_v-935fbb96] {\n    float: right; }\n  .box1 .active[_v-935fbb96] {\n    background-color: #8bbeea;\n    color: #fff; }\n  .box1 .top[_v-935fbb96] {\n    box-sizing: border-box; }\n    .box1 .top ul[_v-935fbb96] {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      .box1 .top ul li[_v-935fbb96] {\n        display: inline-block;\n        -webkit-box-flex: 1;\n            -ms-flex: 1;\n                flex: 1; }\n      .box1 .top ul a[_v-935fbb96] {\n        display: inline-block; }\n    .box1 .top .topBox[_v-935fbb96] {\n      height: 100%;\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      font-size: 20px; }\n      .box1 .top .topBox .panel[_v-935fbb96] {\n        height: 98px; }\n      .box1 .top .topBox > div[_v-935fbb96] {\n        height: 70%;\n        width: 80%;\n        max-width: 240px;\n        max-height: 120px;\n        min-height: 77px;\n        position: relative;\n        text-align: center; }\n        .box1 .top .topBox > div p[_v-935fbb96] {\n          line-height: 21px;\n          font-size: 16px;\n          padding-left: 5px;\n          padding-top: 5px;\n          text-align: left;\n          padding-bottom: 15px; }\n  .box1 .middle[_v-935fbb96] {\n    height: 400px; }\n    .box1 .middle .middleBoxfile[_v-935fbb96] {\n      position: relative; }\n      .box1 .middle .middleBoxfile .middleBoxbtn[_v-935fbb96] {\n        position: absolute;\n        bottom: 20px;\n        left: 50%;\n        -webkit-transform: translateX(-50%);\n                transform: translateX(-50%); }\n    .box1 .middle .middleBox[_v-935fbb96] {\n      height: 100%;\n      box-sizing: border-box; }\n      .box1 .middle .middleBox .radio[_v-935fbb96] {\n        display: inline-block; }\n      .box1 .middle .middleBox .radioMess[_v-935fbb96] {\n        font-size: 14px;\n        font-weight: 700;\n        display: inline-block; }\n      .box1 .middle .middleBox .textareMess[_v-935fbb96] {\n        font-size: 14px;\n        font-weight: 700;\n        margin-bottom: 10px;\n        margin-top: 20px; }\n      .box1 .middle .middleBox > div[_v-935fbb96] {\n        height: 100%;\n        width: 100%;\n        max-width: 700px;\n        max-height: 500px; }\n        .box1 .middle .middleBox > div .panel[_v-935fbb96] {\n          height: 100%; }\n  .box1 .bottom th[_v-935fbb96], .box1 .bottom td[_v-935fbb96] {\n    text-align: center; }\n  .box1 .file[_v-935fbb96] {\n    position: relative;\n    display: inline-block;\n    background: #D0EEFF;\n    border: 1px solid #99D3F5;\n    border-radius: 4px;\n    padding: 4px 12px;\n    overflow: hidden;\n    color: #1E88C7;\n    text-decoration: none;\n    text-indent: 0;\n    line-height: 20px; }\n  .box1 .file input[_v-935fbb96] {\n    position: absolute;\n    font-size: 100px;\n    right: 0;\n    top: 0;\n    opacity: 0; }\n  .box1 .file[_v-935fbb96]:hover {\n    background: #AADFFD;\n    border-color: #78C3F3;\n    color: #004974;\n    text-decoration: none; }\n", ""]);

	// exports


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	var _pendingalet = __webpack_require__(40);

	var _pendingalet2 = _interopRequireDefault(_pendingalet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<div class="box1">
	// 		<div class="top">
	// 			<!-- <div class="topBox">
	//
	// 				<div class="panel panel-primary">
	// 			      <div class="panel-heading">
	// 			        <h3 class="panel-title">今日开户数</h3>
	// 			      </div>
	// 			      <div class="panel-body">
	// 			        50
	// 			      </div>
	// 			    </div>
	// 			</div>
	// 			<div class="topBox" style="text-align: center">
	//
	// 				<div class="panel panel-success" style="margin: 0 auto">
	// 			      <div class="panel-heading">
	// 			        <h3 class="panel-title">今日销户数</h3>
	// 			      </div>
	// 			      <div class="panel-body">
	// 			        60
	// 			      </div>
	// 			    </div>
	// 			</div>
	// 			<div class="topBox">
	// 				<div style="float: right">
	// 					<div class="panel panel-info" >
	// 				      <div class="panel-heading">
	// 				        <h3 class="panel-title">在网用户数</h3>
	// 				      </div>
	// 				      <div class="panel-body">
	// 				        6666（-10）
	// 				      </div>
	// 				    </div>
	// 				</div>
	// 			</div> -->
	// 			<ul class="nav nav-pills nav-pills-stacked-example">
	// 		      <li ><a class="bg-success navbtn">今日开户数</a><a class="navbtn">{{today.openUser}}</a></li>
	// 		      <li ><a class="bg-info navbtn">今日销户数</a><a class="navbtn">{{today.closeUser}}</a></li>
	// 		      <li ><a class="bg-danger navbtn">在网用户数</a><a class="navbtn">{{today.online}}（{{difference}}）</a></li>
	// 		    </ul>
	//
	// 		</div>
	// 		<div class="btn-group open" role="group" aria-label="Button group with nested dropdown" style="margin-top: 10px">
	// 		      <button type="button" class="btn btn-default" :class="{'btn-default' : !openAccount,'btn-primary' : openAccount}" @click="openAccount=true">开户</button>
	// 		      <button @click="openAccount=false" type="button" class="btn btn-default" style="margin-right: 10px" :class="{'btn-default' : openAccount,'btn-primary' : !openAccount}">销户</button>
	//     	</div>
	//
	//
	// 		<div class="middle">
	// 			<div class="middleBox" v-if="openAccount">
	//
	// 				<div style="float: left;" class="middleBoxfile">
	// 					<!-- <p>业务销户</p>
	// 					<p>手机号码 <input type="number" name=""></p> -->
	// 					<div class="panel panel-default">
	// 						<div class="page-header" style="border: none;margin: 20px 0 0px;">
	// 						  <h3 style="text-align: center">业务开户</h3>
	// 						</div>
	// 				      <div class="panel-body">
	// 				        <div class="input-group">
	//
	// 						  <span class="input-group-addon" id="basic-addon1">手机号码</span>
	// 						  <input type="text" class="form-control" v-model="inputData.phone" placeholder="Your Number" aria-describedby="basic-addon1">
	// 						</div>
	// 						<div class="form-group">
	// 					        <label for="exampleInputFile" style="margin-top: 20px">导入批销名单(.txt格式文件)</label>
	// 					        <input v-el:inputfile  type="file" id="exampleInputFile" accept=".txt" style="display: inline-block;margin-left: 20px">
	// 					        <!-- <p class="help-block">请上传.txt格式文件</p> -->
	// 					     </div>
	// 					     <p class="radioMess">是否需要发送短信</p>
	// 					    <div class="radio" style="margin-left: 40px">
	// 							  <label>
	// 							    <input type="radio" name="optionsRadios" id="optionsRadios1" value="1" v-model="inputData.isSend" disabled>
	// 							    是
	// 							  </label>
	// 						</div>
	// 						<div class="radio">
	// 							  <label>
	// 							    <input type="radio" name="optionsRadios" id="optionsRadios2" v-model="inputData.isSend" value="0" checked disabled>
	// 							    否
	// 							  </label>
	// 						</div>
	// 						<p class="textareMess">下行短信内容（为空则发送默认短信）</p>
	// 						<textarea style="resize: none;" class="form-control" rows="2" placeholder="尊敬的客户,您已经成功订购聚优惠业务,包月10月,详询请拨打客服热线10010。"></textarea>
	// 				      </div>
	// 				    </div>
	// 				      <button type="button" class="btn btn-primary middleBoxbtn"  :class="{'disabled' : isrequest}" :disabled="isrequest" @click="opneAccount">提交开户</button>
	// 				</div>
	// 			</div>
	// 			<div class="middleBox" v-else>
	// 				<div style="float: left;" class="middleBoxfile">
	// 					<!-- <p>业务销户</p>
	// 					<p>手机号码 <input type="number" name=""></p> -->
	// 					<div class="panel panel-default">
	// 						<div class="page-header" style="border: none;margin: 20px 0 0px;">
	// 						  <h3 style="text-align: center">业务销户</h3>
	// 						</div>
	// 				      <div class="panel-body">
	// 				        <div class="input-group">
	//
	// 						  <span class="input-group-addon" id="basic-addon1">手机号码</span>
	// 						  <input v-model="closeData.phone" type="text" class="form-control" placeholder="Your Number" aria-describedby="basic-addon1">
	// 						</div>
	// 						<div class="form-group">
	// 					        <label for="exampleInputFile" style="margin-top: 20px">导入批销名单(.txt格式文件)</label>
	// 					        <input type="file" v-el:closefile id="exampleInputFile"  accept=".txt" style="display: inline-block;margin-left: 20px">
	// 					        <!-- <p class="help-block">请上传.txt格式文件</p> -->
	// 					     </div>
	// 					     <p class="radioMess">是否需要发送短信</p>
	// 					    <div class="radio" style="margin-left: 40px">
	// 							  <label>
	// 							    <input type="radio" v-model="closeData.isSend" name="optionsRadios" id="optionsRadios1" value="1"  disabled>
	// 							    是
	// 							  </label>
	// 						</div>
	// 						<div class="radio">
	// 							  <label>
	// 							    <input type="radio" v-model="closeData.isSend" name="optionsRadios" id="optionsRadios2" value="0" disabled checked>
	// 							    否
	// 							  </label>
	// 						</div>
	// 						<p class="textareMess">下行短信内容（为空则发送默认短信）</p>
	// 						<textarea style="resize: none;" class="form-control" rows="3" placeholder="尊敬的客户,您已经取消聚优惠业务,服务已经中止,谢谢您的使用,如果有其他需求,请拨打客服热线10010。"></textarea>
	// 				      </div>
	// 				    </div>
	// 				    <button type="button" class="btn btn-primary middleBoxbtn" :class="{'disabled' : isrequest}" :disabled="isrequest" @click="closeAccount">提交销户</button>
	// 				</div>
	//
	// 			</div>
	// 			<!-- <div class="middleBox" >
	// 				<div style="float: right;">
	// 					<div class="panel panel-default">
	// 				      <div class="panel-body">
	// 				        Basic panel example
	// 				      </div>
	// 				    </div>
	// 				</div>
	// 			</div> -->
	// 		</div>
	// 		<div class="bottom">
	//
	// 		    <table class="table table-bordered" style="margin-top: 10px" v-if="table.sum || phoneOpen.isShow">
	// 		        <thead>
	// 		          <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
	// 		            <th>批号</th>
	// 		            <th>操作数</th>
	// 		            <th>成功数</th>
	// 		            <th>失败数</th> 
	// 		            <th>操作类型</th>
	// 		            <th>操作日期</th>
	// 		            <th>操作员</th>
	// 		            <th>操作结果</th>
	// 		          </tr>
	// 		        </thead>
	// 		        <tbody>
	// 		          <tr>
	// 		            <th scope="row">1</th>
	// 		            <td>{{table.sum}}</td>
	// 		            <td>{{table.success}}</td>
	// 		            <td>{{table.defeat}}</td>
	// 		            <td>{{table.type}}</td>
	// 		            <td>{{table.date}}</td>
	// 		            <td>{{table.user}}</td>
	// 		            <td><a style="cursor: pointer;" v-link="{path:'/home/manage/detail2/'+table.opid}" v-if="!phoneOpen.isShow">查看明细</a><a style="cursor: pointer;"  v-else>{{phoneOpen.res}}</a></td>
	// 		          </tr>
	// 		        </tbody>
	//       		</table>
	// 		</div>
	// 		<!-- <alert :show.sync="alert.isShow" :form-data="alert.list"></alert> -->
	// 	</div>
	// </template>
	// <style lang="scss" scoped>
	// 	.box1 {
	// 		display: flex;
	// 		flex-direction : column;
	// 		height: 100%;
	// 		padding-left: 20px;
	//     	padding-top: 20px;
	//     	padding-right:50px;
	//     	box-sizing: border-box;
	//     	.open {
	//     		button {
	//     			float: right;
	//     		}
	//     	}
	//     	.active {
	// 					background-color: #8bbeea;
	// 					color: #fff;
	// 				}
	// 		.top {
	// 			box-sizing: border-box;
	// 			ul {
	// 				// display: inline-block;
	// 				display: flex;
	// 				li {
	// 					display: inline-block;
	// 					flex : 1;
	// 				}
	// 				a {
	// 					display: inline-block;
	// 				}
	// 			}
	// 			.topBox {
	// 			    height: 100%;
	// 			    flex :1;
	// 			    font-size: 20px;
	// 			    .panel {
	// 			    	height: 98px;
	// 			    }
	// 			  	> div {
	// 			  		 //  border-width: 1px;
	// 				    // border-style: solid;
	// 				    // border-color: rgb(121, 121, 121);
	//
	// 				    height: 70%;
	// 				    width:80%;
	// 				    max-width: 240px;
	// 				    max-height: 120px;
	// 				    min-height: 77px;
	// 				    position: relative;
	// 				    text-align: center;
	//
	// 				    p {
	// 				    	line-height: 21px;
	// 				    	font-size: 16px;
	// 				    	padding-left: 5px;
	// 				    	padding-top:5px;
	// 				    	text-align: left;
	// 				    	padding-bottom: 15px;
	// 				    }
	//
	// 			  	}
	// 			}
	//
	// 		}
	// 		.middle {
	// 			height: 400px;
	// 			.middleBoxfile {
	// 				position: relative;
	// 				.middleBoxbtn {
	// 					position: absolute;
	// 					bottom: 20px;
	// 					left: 50%;
	// 					transform: translateX(-50%);
	// 				}
	// 			}
	// 			.middleBox {
	// 				height: 100%;
	// 				box-sizing: border-box;
	// 				.radio {
	// 					display: inline-block;
	// 				}
	// 				.radioMess {
	// 					font-size: 14px;
	// 				    font-weight: 700;
	// 				    display: inline-block;
	// 				}
	// 				.textareMess {
	// 					font-size: 14px;
	// 				    font-weight: 700;
	// 				    margin-bottom: 10px;
	// 				    margin-top: 20px;
	// 				}
	//
	// 				> div {
	// 					  // border-width: 1px;
	// 				   //  border-style: solid;
	// 				   //  border-color: rgb(121, 121, 121);
	// 				    height: 100%;
	// 				    width: 100%;
	// 				    max-width: 700px;
	// 					max-height: 500px;
	// 					.panel {
	// 						height: 100%;
	// 					}
	// 				}
	//
	// 			}
	// 		}
	// 		.bottom {
	// 			th,td {
	// 				text-align: center;
	// 			}
	//
	// 		}
	// 		.file {
	// 			    position: relative;
	// 			    display: inline-block;
	// 			    background: #D0EEFF;
	// 			    border: 1px solid #99D3F5;
	// 			    border-radius: 4px;
	// 			    padding: 4px 12px;
	// 			    overflow: hidden;
	// 			    color: #1E88C7;
	// 			    text-decoration: none;
	// 			    text-indent: 0;
	// 			    line-height: 20px;
	// 			}
	// 			.file input {
	// 			    position: absolute;
	// 			    font-size: 100px;
	// 			    right: 0;
	// 			    top: 0;
	// 			    opacity: 0;
	// 			}
	// 			.file:hover {
	// 			    background: #AADFFD;
	// 			    border-color: #78C3F3;
	// 			    color: #004974;
	// 			    text-decoration: none;
	// 			}
	//
	// 	}
	// </style>
	// <script type="text/javascript">
	exports.default = {
		components: {
			alert: _pendingalet2.default
		},
		data: function data() {
			return {
				isrequest: false,
				alert: {
					isShow: false,
					list: [{
						phone: '',
						res: '',
						type: '',
						dateTime: '',
						user: this.$root.user
					}]
				},
				openAccount: true, //开户/销户
				inputData: { //开户数据
					phone: '',
					isSend: ''
				},
				today: {
					openUser: 0,
					closeUser: 0,
					online: 0
				},

				closeData: { //销户数据
					phone: '',
					isSend: ''
				},
				phoneOpen: {
					isShow: false,
					res: '开户成功'
				},
				table: {
					sum: 0,
					defeat: 0,
					success: 0,
					type: 0,
					date: new Date().format('yyyy-MM-dd HH:mm:ss'),
					opid: '',
					user: this.$root.user
				}
			};
		},

		computed: {
			difference: function difference() {
				return this.today.openUser - this.today.closeUser;
			}
		},
		ready: function ready() {
			this.haveUser();
		},

		methods: {
			closeAccount: function closeAccount() {
				var _this = this;

				if (this.closeData.phone && this.closeData.phone.trim().length == 11) {
					this.isrequest = true;
					// if (this.$els.inputfile.files.length != 0) window.alert('单次只能单销或批销')
					_index2.default.cancel(this, {
						"phone": this.closeData.phone, //必填，手机号码
						"head": "easier", //必填，操作人员
						"type": "0" }, function (res) {
						_this.isrequest = false;
						if (res.resMsg === "success") {
							_this.phoneOpen.isShow = true;
							_this.phoneOpen.res = '销户成功';
							_this.table = {
								sum: 1,
								defeat: 0,
								success: 1,
								type: '销户',
								date: new Date().format('yyyy-MM-dd HH:mm:ss'),
								user: _this.$root.user
							};
							_this.haveUser();
							_this.$dispatch('refresh'); //刷新其他页面
							window.alert('操作成功');
						} else {
							if (res.resMsg === 'session失效') {
								window.alert('登录失效,请重新登录');
								_this.$router.go({ path: '/' });
							}
							_this.phoneOpen.isShow = true;
							_this.phoneOpen.res = '销户失败';
							_this.table = {
								sum: 1,
								defeat: 1,
								success: 0,
								type: '销户',
								date: new Date().format('yyyy-MM-dd HH:mm:ss'),
								user: _this.$root.user
							};
							_this.haveUser();
							_this.inputData.phone = '';
							window.alert('操作失败');
						}
					});
				} else if (this.$els.closefile.length != 0) {
					this.isrequest = true;
					var formDat = new FormData();
					formDat.append('files', this.$els.closefile.files[0]);
					this.upload('vip/de', this.$els.closefile.files[0], 0, function (res) {
						_this.isrequest = false;
						if (res.resMsg === "上传成功") {
							_this.phoneOpen.isShow = false;
							_this.$els.closefile.value = '';
							_this.table = {
								sum: res.repBody[0].count,
								defeat: res.repBody[0].fail,
								success: res.repBody[0].successnum,
								type: res.repBody[0].state,
								date: res.repBody[0].time,
								user: _this.$root.user,
								opid: res.repBody[0].opid
							};
							// var temp1 = res.repBody[0].phone1? res.repBody[0].phone1 : []
							// var temp2 = res.repBody[0].phone2? res.repBody[0].phone2 : []
							// var arr1 = [];
							// var arr2 = [];
							// for (var i = 0 ; i < temp1.length ; i ++ ) {
							// 	arr1.push({
							// 		phone : temp1[i],
							// 		res : '销户成功',
							// 		type : res.repBody[0].state,
							// 		dateTime : new Date().format('yyyy-MM-dd HH:mm:ss'),
							// 		opid : res.repBody[0].opid,
							// 		user : this.$root.user
							// 	})
							// }
							// for (var i = 0 ; i < temp2.length ; i ++ ) {
							// 	arr2.push({
							// 		phone : temp2[i],
							// 		res : '销户失败',
							// 		opid : res.repBody[0].opid,
							// 		type : res.repBody[0].state,
							// 		dateTime : new Date().format('yyyy-MM-dd HH:mm:ss'),
							// 		user : this.$root.user
							// 	})
							// }
							// this.alert.list = arr1.concat(arr2)
							_this.haveUser();
							_this.$dispatch('refresh'); //刷新其他页面
							window.alert('提交成功');
						}
						if (res.resMsg === 'session失效') {
							window.alert('登录失效,请重新登录');
							_this.$router.go({ path: '/' });
						}
					});
				}
			},
			opneAccount: function opneAccount() {
				var _this2 = this;

				if (this.inputData.phone && this.inputData.phone.trim().length == 11) {
					this.isrequest = true;
					// if (this.$els.inputfile.files.length != 0) window.alert('单次只能单开或批开')
					_index2.default.cancel(this, {
						"phone": this.inputData.phone, //必填，手机号码
						"head": "easier", //必填，操作人员
						"type": "1" }, function (res) {
						_this2.isrequest = false;
						if (res.resMsg === "success") {
							_this2.phoneOpen.isShow = true;
							_this2.table = {
								sum: 1,
								defeat: 0,
								success: 1,
								type: '开户',
								date: new Date().format('yyyy-MM-dd HH:mm:ss'),
								user: _this2.$root.user
							};
							_this2.haveUser();
							_this2.inputData.phone = '';
							_this2.$dispatch('refresh'); //刷新其他页面
							window.alert('操作成功');
						} else {
							if (res.resMsg === 'session失效') {
								window.alert('登录失效,请重新登录');
								_this2.$router.go({ path: '/' });
							}
							_this2.phoneOpen.isShow = true;
							_this2.phoneOpen.res = '销户失败';
							_this2.table = {
								sum: 1,
								defeat: 0,
								success: 1,
								type: '开户',
								date: new Date().format('yyyy-MM-dd HH:mm:ss'),
								user: _this2.$root.user
							};
							_this2.haveUser();
							window.alert('操作失败');
						}
					});
				} else if (this.$els.inputfile.files.length != 0) {
					this.isrequest = true;
					var formDat = new FormData();
					formDat.append('files', this.$els.inputfile.files[0]);
					this.upload('vip/mk', this.$els.inputfile.files[0], 1, function (res) {
						_this2.isrequest = false;
						if (res.resMsg === "上传成功") {
							_this2.phoneOpen.isShow = false;
							_this2.$els.inputfile.value = '';
							_this2.table = {
								sum: res.repBody[0].count,
								defeat: res.repBody[0].fail,
								success: res.repBody[0].successnum,
								type: res.repBody[0].state,
								date: res.repBody[0].time,
								user: _this2.$root.user,
								opid: res.repBody[0].opid
							};
							// 	var temp1 = res.repBody[0].phone1? res.repBody[0].phone1 : []
							// var temp2 = res.repBody[0].phone2? res.repBody[0].phone2 : []
							// var arr1 = [];
							// var arr2 = [];
							// for (var i = 0 ; i < temp1.length ; i ++ ) {
							// 	arr1.push({
							// 		phone : temp1[i],
							// 		res : '开户成功',
							// 		type : res.repBody[0].state,
							// 		dateTime : new Date().format('yyyy-MM-dd HH:mm:ss'),
							// 		user : this.$root.user
							// 	})
							// }
							// for (var i = 0 ; i < temp2.length ; i ++ ) {
							// 	arr2.push({
							// 		phone : temp2[i],
							// 		res : '开户失败',
							// 		type : res.repBody[0].state,
							// 		dateTime : new Date().format('yyyy-MM-dd HH:mm:ss'),
							// 		user : this.$root.user
							// 	})
							// }
							// this.alert.list = arr1.concat(arr2)
							_this2.haveUser();
							_this2.$dispatch('refresh'); //刷新其他页面
							window.alert('提交成功');
						}
						if (res.resMsg === 'session失效') {
							window.alert('登录失效,请重新登录');
							_this2.$router.go({ path: '/' });
						}
					});
				}
			},
			upload: function upload(path, file, type, callback) {
				var files = file;

				var form = new FormData(),
				    xhr = new XMLHttpRequest();
				// form.append('Content-Type', files.type || 'application/octet-stream');
				form.append('file', files);
				form.append('type', type);
				form.append('name', this.$root.user);
				xhr.open('POST', basePath + path, true);
				xhr.send(form);
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						var res = JSON.parse(xhr.responseText);
						if (callback) callback(res);
					}
				};
			},
			haveUser: function haveUser() {
				var _this3 = this;

				_index2.default.online(this, { //今日开户数
					createtime: new Date().format(),
					createtime1: new Date(new Date().setDate(new Date().getDate() + 1)).format(),
					deletetime: null,
					deletetime1: null,
					type: 1
				}, function (res) {
					if (res.resMsg === "success") {
						_this3.today.openUser = res.repBody;
					}
				});
				_index2.default.online(this, { //今日销户数
					createtime: null,
					createtime1: null,
					deletetime: new Date().format(),
					deletetime1: new Date(new Date().setDate(new Date().getDate() + 1)).format(),
					type: 0
				}, function (res) {
					if (res.resMsg === "success") {
						_this3.today.closeUser = res.repBody;
					}
				});
				_index2.default.online(this, { //今日在线数
					createtime: null,
					createtime1: null,
					deletetime: null,
					deletetime1: null,
					type: 1
				}, function (res) {
					if (res.resMsg === "success") {
						_this3.today.online = res.repBody;
					}
				});
			}
		}
	};
	// </script>

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(41)
	__vue_script__ = __webpack_require__(43)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] components\\pendingalet.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(44)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-ffb228a4/pendingalet.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(42);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./pendingalet.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./pendingalet.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".alert {\n  position: fixed;\n  top: 30%;\n  left: 50%;\n  background-color: #eee;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  z-index: 888; }\n  .alert h3 {\n    padding: 10px 0;\n    text-align: center; }\n  .alert table {\n    margin-bottom: 10px; }\n  .alert p {\n    text-align: center;\n    margin-bottom: 10px; }\n  .alert th, .alert td {\n    text-align: center; }\n", ""]);

	// exports


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    show: {
	      type: Boolean,
	      default: false
	    },
	    // phone : String,
	    formData: {
	      type: Array,
	      default: [{
	        phone: '',
	        res: '',
	        type: '',
	        dateTime: '',
	        user: ''
	      }]
	    }
	  },
	  data: function data() {
	    return {};
	  }
	}; // <template>
	// 	<div class="alert" v-if="show">
	// 		<button type="button" class="close" @click="show = false" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	// 		<h3 >操作结果</h3>
	// 		<table class="table table-bordered table-hover">
	//         <thead>
	//           <tr>
	//             <th>序号</th>
	//             <th>手机号码</th>
	//             <th>操作类型</th>
	//             <th>操作日期</th> 
	//             <th>操作结果</th>
	//             <th>操作人</th>
	//
	//           </tr>
	//         </thead>
	//         <tbody>
	//           <tr v-for = "item in formData">
	//             <th scope="row">{{$index}}</th>
	//             <td>{{item.phone}}</td>
	//             <td>{{item.type}}</td>
	//             <td>{{item.dateTime}}</td>
	//             <td>{{item.res}}</td>
	//             <td>{{item.user}}</td>
	//
	//           </tr>
	//           <!-- <tr>
	//             <th scope="row">2</th>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//
	//           </tr>
	//           <tr>
	//             <th scope="row">3</th>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//
	//           </tr> -->
	//         </tbody>
	//       </table>
	//       <!-- <p>共<span>6</span>条 当前第<span>1</span>/<span>2</span>页</p> -->
	//       <div class="clearfix">
	//       	<div style="float: right" >
	//      		<button type="button" class="btn btn-primary" @click="show = false">确定</button>
	//      		<!-- <button type="button" class="btn btn-success">下一页</button> -->
	//      	</div>
	//       </div>
	// 	</div>
	// </template>
	// <style lang="scss">
	// 	.alert {
	// 			position: fixed;
	// 			top: 30%;
	// 			left: 50%;
	// 			background-color: #eee;
	// 			transform: translateX(-50%);
	// 			z-index: 888;
	// 			h3 {
	// 				padding: 10px 0 ;
	// 				text-align: center;
	//
	// 			}
	// 			table {
	// 				margin-bottom: 10px;
	// 			}
	// 			p {
	// 				text-align: center;
	// 				margin-bottom: 10px;
	// 			}
	//       th,td {
	//         text-align: center;
	//       }
	//     	}
	//
	// </style>
	// <script type="text/javascript">

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"alert\" v-if=\"show\">\n\t\t<button type=\"button\" class=\"close\" @click=\"show = false\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t\t<h3 >操作结果</h3>\n\t\t<table class=\"table table-bordered table-hover\">\n        <thead>\n          <tr>\n            <th>序号</th>\n            <th>手机号码</th>\n            <th>操作类型</th>\n            <th>操作日期</th> \n            <th>操作结果</th>\n            <th>操作人</th>\n            \n          </tr>\n        </thead>\n        <tbody>\n          <tr v-for = \"item in formData\">\n            <th scope=\"row\">{{$index}}</th>\n            <td>{{item.phone}}</td>\n            <td>{{item.type}}</td>\n            <td>{{item.dateTime}}</td>\n            <td>{{item.res}}</td>\n            <td>{{item.user}}</td>\n            \n          </tr>\n          <!-- <tr>\n            <th scope=\"row\">2</th>\n            <td>Table cell</td>\n            <td>Table cell</td>\n            <td>Table cell</td>\n            <td>Table cell</td>\n           \n          </tr>\n          <tr>\n            <th scope=\"row\">3</th>\n            <td>Table cell</td>\n            <td>Table cell</td>\n            <td>Table cell</td>\n            <td>Table cell</td>\n           \n          </tr> -->\n        </tbody>\n      </table>\n      <!-- <p>共<span>6</span>条 当前第<span>1</span>/<span>2</span>页</p> -->\n      <div class=\"clearfix\">\n      \t<div style=\"float: right\" >\n     \t\t<button type=\"button\" class=\"btn btn-primary\" @click=\"show = false\">确定</button>\n     \t\t<!-- <button type=\"button\" class=\"btn btn-success\">下一页</button> -->\n     \t</div>\n      </div>\n\t</div>\n";

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"box1\" _v-935fbb96=\"\">\n\t\t<div class=\"top\" _v-935fbb96=\"\">\n\t\t\t<!-- <div class=\"topBox\">\n\t\t\t\t\n\t\t\t\t<div class=\"panel panel-primary\">\n\t\t\t      <div class=\"panel-heading\">\n\t\t\t        <h3 class=\"panel-title\">今日开户数</h3>\n\t\t\t      </div>\n\t\t\t      <div class=\"panel-body\">\n\t\t\t        50\n\t\t\t      </div>\n\t\t\t    </div>\n\t\t\t</div>\n\t\t\t<div class=\"topBox\" style=\"text-align: center\">\n\t\t\t\t\n\t\t\t\t<div class=\"panel panel-success\" style=\"margin: 0 auto\">\n\t\t\t      <div class=\"panel-heading\">\n\t\t\t        <h3 class=\"panel-title\">今日销户数</h3>\n\t\t\t      </div>\n\t\t\t      <div class=\"panel-body\">\n\t\t\t        60\n\t\t\t      </div>\n\t\t\t    </div>\n\t\t\t</div>\n\t\t\t<div class=\"topBox\">\n\t\t\t\t<div style=\"float: right\">\n\t\t\t\t\t<div class=\"panel panel-info\" >\n\t\t\t\t      <div class=\"panel-heading\">\n\t\t\t\t        <h3 class=\"panel-title\">在网用户数</h3>\n\t\t\t\t      </div>\n\t\t\t\t      <div class=\"panel-body\">\n\t\t\t\t        6666（-10）\n\t\t\t\t      </div>\n\t\t\t\t    </div>\n\t\t\t\t</div>\n\t\t\t</div> -->\n\t\t\t<ul class=\"nav nav-pills nav-pills-stacked-example\" _v-935fbb96=\"\">\n\t\t      <li _v-935fbb96=\"\"><a class=\"bg-success navbtn\" _v-935fbb96=\"\">今日开户数</a><a class=\"navbtn\" _v-935fbb96=\"\">{{today.openUser}}</a></li>\n\t\t      <li _v-935fbb96=\"\"><a class=\"bg-info navbtn\" _v-935fbb96=\"\">今日销户数</a><a class=\"navbtn\" _v-935fbb96=\"\">{{today.closeUser}}</a></li>\n\t\t      <li _v-935fbb96=\"\"><a class=\"bg-danger navbtn\" _v-935fbb96=\"\">在网用户数</a><a class=\"navbtn\" _v-935fbb96=\"\">{{today.online}}（{{difference}}）</a></li>\n\t\t    </ul>\n\t\t    \n\t\t</div>\n\t\t<div class=\"btn-group open\" role=\"group\" aria-label=\"Button group with nested dropdown\" style=\"margin-top: 10px\" _v-935fbb96=\"\">\n\t\t      <button type=\"button\" class=\"btn btn-default\" :class=\"{'btn-default' : !openAccount,'btn-primary' : openAccount}\" @click=\"openAccount=true\" _v-935fbb96=\"\">开户</button>\n\t\t      <button @click=\"openAccount=false\" type=\"button\" class=\"btn btn-default\" style=\"margin-right: 10px\" :class=\"{'btn-default' : openAccount,'btn-primary' : !openAccount}\" _v-935fbb96=\"\">销户</button>\n    \t</div>\n\n\n\t\t<div class=\"middle\" _v-935fbb96=\"\">\n\t\t\t<div class=\"middleBox\" v-if=\"openAccount\" _v-935fbb96=\"\">\n\t\t\t\t\n\t\t\t\t<div style=\"float: left;\" class=\"middleBoxfile\" _v-935fbb96=\"\">\n\t\t\t\t\t<!-- <p>业务销户</p>\n\t\t\t\t\t<p>手机号码 <input type=\"number\" name=\"\"></p> -->\n\t\t\t\t\t<div class=\"panel panel-default\" _v-935fbb96=\"\">\n\t\t\t\t\t\t<div class=\"page-header\" style=\"border: none;margin: 20px 0 0px;\" _v-935fbb96=\"\">\n\t\t\t\t\t\t  <h3 style=\"text-align: center\" _v-935fbb96=\"\">业务开户</h3>\n\t\t\t\t\t\t</div>\n\t\t\t\t      <div class=\"panel-body\" _v-935fbb96=\"\">\n\t\t\t\t        <div class=\"input-group\" _v-935fbb96=\"\">\n\n\t\t\t\t\t\t  <span class=\"input-group-addon\" id=\"basic-addon1\" _v-935fbb96=\"\">手机号码</span>\n\t\t\t\t\t\t  <input type=\"text\" class=\"form-control\" v-model=\"inputData.phone\" placeholder=\"Your Number\" aria-describedby=\"basic-addon1\" _v-935fbb96=\"\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"form-group\" _v-935fbb96=\"\">\n\t\t\t\t\t        <label for=\"exampleInputFile\" style=\"margin-top: 20px\" _v-935fbb96=\"\">导入批销名单(.txt格式文件)</label>\n\t\t\t\t\t        <input v-el:inputfile=\"\" type=\"file\" id=\"exampleInputFile\" accept=\".txt\" style=\"display: inline-block;margin-left: 20px\" _v-935fbb96=\"\">\n\t\t\t\t\t        <!-- <p class=\"help-block\">请上传.txt格式文件</p> -->\n\t\t\t\t\t     </div>\n\t\t\t\t\t     <p class=\"radioMess\" _v-935fbb96=\"\">是否需要发送短信</p>\n\t\t\t\t\t    <div class=\"radio\" style=\"margin-left: 40px\" _v-935fbb96=\"\">\n\t\t\t\t\t\t\t  <label _v-935fbb96=\"\">\n\t\t\t\t\t\t\t    <input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios1\" value=\"1\" v-model=\"inputData.isSend\" disabled=\"\" _v-935fbb96=\"\">\n\t\t\t\t\t\t\t    是\n\t\t\t\t\t\t\t  </label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"radio\" _v-935fbb96=\"\">\n\t\t\t\t\t\t\t  <label _v-935fbb96=\"\">\n\t\t\t\t\t\t\t    <input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios2\" v-model=\"inputData.isSend\" value=\"0\" checked=\"\" disabled=\"\" _v-935fbb96=\"\">\n\t\t\t\t\t\t\t    否\n\t\t\t\t\t\t\t  </label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p class=\"textareMess\" _v-935fbb96=\"\">下行短信内容（为空则发送默认短信）</p>\n\t\t\t\t\t\t<textarea style=\"resize: none;\" class=\"form-control\" rows=\"2\" placeholder=\"尊敬的客户,您已经成功订购聚优惠业务,包月10月,详询请拨打客服热线10010。\" _v-935fbb96=\"\"></textarea>\n\t\t\t\t      </div>\n\t\t\t\t    </div>\n\t\t\t\t      <button type=\"button\" class=\"btn btn-primary middleBoxbtn\" :class=\"{'disabled' : isrequest}\" :disabled=\"isrequest\" @click=\"opneAccount\" _v-935fbb96=\"\">提交开户</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"middleBox\" v-else=\"\" _v-935fbb96=\"\">\n\t\t\t\t<div style=\"float: left;\" class=\"middleBoxfile\" _v-935fbb96=\"\">\n\t\t\t\t\t<!-- <p>业务销户</p>\n\t\t\t\t\t<p>手机号码 <input type=\"number\" name=\"\"></p> -->\n\t\t\t\t\t<div class=\"panel panel-default\" _v-935fbb96=\"\">\n\t\t\t\t\t\t<div class=\"page-header\" style=\"border: none;margin: 20px 0 0px;\" _v-935fbb96=\"\">\n\t\t\t\t\t\t  <h3 style=\"text-align: center\" _v-935fbb96=\"\">业务销户</h3>\n\t\t\t\t\t\t</div>\n\t\t\t\t      <div class=\"panel-body\" _v-935fbb96=\"\">\n\t\t\t\t        <div class=\"input-group\" _v-935fbb96=\"\">\n\n\t\t\t\t\t\t  <span class=\"input-group-addon\" id=\"basic-addon1\" _v-935fbb96=\"\">手机号码</span>\n\t\t\t\t\t\t  <input v-model=\"closeData.phone\" type=\"text\" class=\"form-control\" placeholder=\"Your Number\" aria-describedby=\"basic-addon1\" _v-935fbb96=\"\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"form-group\" _v-935fbb96=\"\">\n\t\t\t\t\t        <label for=\"exampleInputFile\" style=\"margin-top: 20px\" _v-935fbb96=\"\">导入批销名单(.txt格式文件)</label>\n\t\t\t\t\t        <input type=\"file\" v-el:closefile=\"\" id=\"exampleInputFile\" accept=\".txt\" style=\"display: inline-block;margin-left: 20px\" _v-935fbb96=\"\">\n\t\t\t\t\t        <!-- <p class=\"help-block\">请上传.txt格式文件</p> -->\n\t\t\t\t\t     </div>\n\t\t\t\t\t     <p class=\"radioMess\" _v-935fbb96=\"\">是否需要发送短信</p>\n\t\t\t\t\t    <div class=\"radio\" style=\"margin-left: 40px\" _v-935fbb96=\"\">\n\t\t\t\t\t\t\t  <label _v-935fbb96=\"\">\n\t\t\t\t\t\t\t    <input type=\"radio\" v-model=\"closeData.isSend\" name=\"optionsRadios\" id=\"optionsRadios1\" value=\"1\" disabled=\"\" _v-935fbb96=\"\">\n\t\t\t\t\t\t\t    是\n\t\t\t\t\t\t\t  </label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"radio\" _v-935fbb96=\"\">\n\t\t\t\t\t\t\t  <label _v-935fbb96=\"\">\n\t\t\t\t\t\t\t    <input type=\"radio\" v-model=\"closeData.isSend\" name=\"optionsRadios\" id=\"optionsRadios2\" value=\"0\" disabled=\"\" checked=\"\" _v-935fbb96=\"\">\n\t\t\t\t\t\t\t    否\n\t\t\t\t\t\t\t  </label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p class=\"textareMess\" _v-935fbb96=\"\">下行短信内容（为空则发送默认短信）</p>\n\t\t\t\t\t\t<textarea style=\"resize: none;\" class=\"form-control\" rows=\"3\" placeholder=\"尊敬的客户,您已经取消聚优惠业务,服务已经中止,谢谢您的使用,如果有其他需求,请拨打客服热线10010。\" _v-935fbb96=\"\"></textarea>\n\t\t\t\t      </div>\n\t\t\t\t    </div>\n\t\t\t\t    <button type=\"button\" class=\"btn btn-primary middleBoxbtn\" :class=\"{'disabled' : isrequest}\" :disabled=\"isrequest\" @click=\"closeAccount\" _v-935fbb96=\"\">提交销户</button>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\t\t\t<!-- <div class=\"middleBox\" >\n\t\t\t\t<div style=\"float: right;\">\n\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t      <div class=\"panel-body\">\n\t\t\t\t        Basic panel example\n\t\t\t\t      </div>\n\t\t\t\t    </div>\n\t\t\t\t</div>\n\t\t\t</div> -->\n\t\t</div>\n\t\t<div class=\"bottom\" _v-935fbb96=\"\">\n\t\t\t\n\t\t    <table class=\"table table-bordered\" style=\"margin-top: 10px\" v-if=\"table.sum || phoneOpen.isShow\" _v-935fbb96=\"\">\n\t\t        <thead _v-935fbb96=\"\">\n\t\t          <tr style=\"background-color: #eff2f7;border-top: 1px solid #eaeefb;\" _v-935fbb96=\"\">\n\t\t            <th _v-935fbb96=\"\">批号</th>\n\t\t            <th _v-935fbb96=\"\">操作数</th>\n\t\t            <th _v-935fbb96=\"\">成功数</th>\n\t\t            <th _v-935fbb96=\"\">失败数</th> \n\t\t            <th _v-935fbb96=\"\">操作类型</th>\n\t\t            <th _v-935fbb96=\"\">操作日期</th>\n\t\t            <th _v-935fbb96=\"\">操作员</th>\n\t\t            <th _v-935fbb96=\"\">操作结果</th>\n\t\t          </tr>\n\t\t        </thead>\n\t\t        <tbody _v-935fbb96=\"\">\n\t\t          <tr _v-935fbb96=\"\">\n\t\t            <th scope=\"row\" _v-935fbb96=\"\">1</th>\n\t\t            <td _v-935fbb96=\"\">{{table.sum}}</td>\n\t\t            <td _v-935fbb96=\"\">{{table.success}}</td>\n\t\t            <td _v-935fbb96=\"\">{{table.defeat}}</td>\n\t\t            <td _v-935fbb96=\"\">{{table.type}}</td>\n\t\t            <td _v-935fbb96=\"\">{{table.date}}</td>\n\t\t            <td _v-935fbb96=\"\">{{table.user}}</td>\n\t\t            <td _v-935fbb96=\"\"><a style=\"cursor: pointer;\" v-link=\"{path:'/home/manage/detail2/'+table.opid}\" v-if=\"!phoneOpen.isShow\" _v-935fbb96=\"\">查看明细</a><a style=\"cursor: pointer;\" v-else=\"\" _v-935fbb96=\"\">{{phoneOpen.res}}</a></td>\n\t\t          </tr>\n\t\t        </tbody>\n      \t\t</table>\n\t\t</div>\n\t\t<!-- <alert :show.sync=\"alert.isShow\" :form-data=\"alert.list\"></alert> -->\n\t</div>\n";

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(47)
	__vue_script__ = __webpack_require__(49)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\message.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(79)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-15af8fb4/message.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(48);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-15af8fb4&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./message.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-15af8fb4&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./message.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".box1[_v-15af8fb4] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100%;\n  padding-left: 20px;\n  padding-top: 20px;\n  padding-right: 50px;\n  box-sizing: border-box; }\n  .box1 th[_v-15af8fb4], .box1 td[_v-15af8fb4] {\n    text-align: center; }\n  .box1 .top[_v-15af8fb4] {\n    min-width: 1100px; }\n  .box1 .middle[_v-15af8fb4] {\n    margin-top: 20px; }\n    .box1 .middle a[_v-15af8fb4] {\n      cursor: pointer; }\n    .box1 .middle th[_v-15af8fb4], .box1 .middle td[_v-15af8fb4] {\n      text-align: center; }\n  .box1 .bottom[_v-15af8fb4] {\n    text-align: center;\n    min-width: 1130px; }\n    .box1 .bottom ul[_v-15af8fb4] {\n      vertical-align: middle;\n      padding-left: 30px;\n      margin: 0;\n      margin-left: -50px; }\n", ""]);

	// exports


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _messageAlert = __webpack_require__(50);

	var _messageAlert2 = _interopRequireDefault(_messageAlert);

	var _load = __webpack_require__(55);

	var _load2 = _interopRequireDefault(_load);

	var _search_time = __webpack_require__(60);

	var _search_time2 = _interopRequireDefault(_search_time);

	var _cancelAlert = __webpack_require__(71);

	var _cancelAlert2 = _interopRequireDefault(_cancelAlert);

	var _page = __webpack_require__(74);

	var _page2 = _interopRequireDefault(_page);

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import Datepicker from '../components/Datepicker.vue';
	// <template>
	// <div class="box1">
	// 	<div class="top">
	//          <search-time :searchdate.sync="selectData.searchTime" :disabled="isPhone">
	//             <span style="padding-left: 20px">所属地区</span>
	//             <select class="form-control" v-model="selectData.area" :disabled="isPhone">
	//                 <option value="" selected>全部</option>
	//                 <!-- <option value="云南">云南</option>
	//                 <option value="湖南">湖南</option>
	//                 <option value="江西">江西</option>
	//                 <option value="贵州">贵州</option> -->
	//                  <option v-for="item in area" track-by="$index">{{item}}</option>
	//             </select>
	//             <span style="padding-left: 20px">用户状态</span> 
	//                 <select class="form-control " :disabled="isPhone"  v-model="selectData.state">
	//                     <option value="" selected>全部</option>
	//                     <option value="1">开户</option>
	//                     <option value="0">销户</option>
	//                 </select>
	//             <span style="padding-left: 20px">手机号码</span> <input v-el:phone class="form-control" type="text" name="" style="width: 115px" @input="inputPhone" placeholder="输入手机查询">
	//         </search-time>
	// 	</div>
	// 	<div class="middle">
	// 		<table class="table table-bordered table-hover">
	//         <thead>
	//           <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
	//             <th>序号</th>
	//             <th>手机号码</th>
	//             <th>用户状态</th>
	//             <th>首次开户时间</th> 
	//             <th>最近开户时间</th>
	//             <th>最近销户时间</th>
	//             <th>操作类型</th>
	//             <th>操作员</th>
	//             <th>下行短信请求</th>
	//             <th>操作</th>
	//           </tr>
	//         </thead>
	//         <tbody>
	//           <tr v-for="item in searchlist.list">
	//             <th scope="row">{{searchlist.list.length-$index+(searchlist.nowPage-1)*12}}</th>
	//             <td>{{item.phone}}</td>
	//             <td>{{!item.type?'销户':'开户'}}</td>
	//             <td>{{item.createtime?new Date(item.createtime).format():''}}</td>
	//             <td>{{item.updatetime?new Date(item.updatetime).format():''}}</td>
	//             <td>{{item.deletetime?new Date(item.deletetime).format():''}}</td>
	//             <td>{{item.state}}</td>
	//             <td>{{item.username}}</td>
	//             <td> <a @click="clickCheck(item.phone)">点击查看</a></td>
	//             <td><a @click="confirmCancel(item.phone)" v-if="item.type">销户</a><a @click="godetail(item.phone)" v-else>查看</a></td>
	//           </tr>
	//         </tbody>
	//       </table>
	//       <load :show="isLoad"></load>
	// 	</div>
	// 	<div class="bottom">
	// 		<!-- <div style="float: left">当前显示<span> {{searchlist.nowPage*12-11}} </span>到<span> {{searchlist.nowPage==allPage ?searchlist.all :searchlist.nowPage*12}} </span>条,共<span> {{searchlist.all }} </span>条记录</div>
	// 		<ul class="pagination" >
	// 	        <li :class="{disabled:searchlist.nowGroup===1}" @click="searchlist.nowGroup-=1"><a  aria-label="Previous"><span aria-hidden="true">«</span></a></li>
	// 	        <li @click="clickPage(item)" :class="{active: searchlist.nowPage===item+1+(searchlist.nowGroup-1)*5}" v-for="item in 5|showPage"><a >{{item+1+(searchlist.nowGroup-1)*5}} </a></li>
	//
	// 	        <li :class="{disabled:searchlist.nowGroup===group}" @click="searchlist.nowGroup+=1"><a   aria-label="Next"><span aria-hidden="true">»</span></a></li>
	//      	</ul>
	//         <div class="goPage">
	//             <span>到</span><input style="text-align: center" v-el:goto class="form-control" type="text" name=""><span>页</span><button type="button" class="btn btn-primary" @click="gotobtn">确定</button>
	//         </div>
	//
	// 	</div> -->
	// 	<page :searchlist.sync="searchlist">
	//      <div style="float: right">
	//             <button type="button" class="btn btn-primary" @click="down">当前页导出为.txt</button>
	//                     <a style="display: none" v-el:downLoadCurrent :href="downLoad.current" download="批次明细.txt" >导出当前</a>
	//             <button type="button" class="btn btn-success" @click="downAll">全部导出为.txt</button>
	//         </div>   
	//     </page>
	//     <alert   :show.sync="showAlert" :form-data="checkData"></alert>
	//     <!-- 弹框 -->
	//     <cancel :show.sync="confirm.isShow" :phone="confirm.userPhone"> </cancel>
	//
	//
	//
	// </div>
	//
	// </template>
	// <style lang="scss" scoped>
	// 	.box1 {
	// 		display: flex;
	// 		flex-direction : column;
	// 		height: 100%;
	// 		padding-left: 20px;
	//     	padding-top: 20px;
	//     	padding-right:50px;
	//     	box-sizing: border-box;
	//     	th,td {
	//     		text-align: center;
	//     	}
	//     	.top {
	//             min-width: 1100px;
	//     		// input,select {
	//     		// 	display: inline-block;
	//     		// 	width: 96px;
	//     		// 	// height: 22px;
	//     		// }
	//     		// span {
	//     		// 	margin-right: 5px;
	//     		// 	margin-left: 5px;
	//     		// }
	//     		// select {
	//     		// 	vertical-align: bottom;
	//     		// }
	//     		// button {
	//     		// 	font-size: 12px;
	//     		// 	margin-top: 3px;
	//     		// }
	//     	}
	//     	.middle {
	//     		margin-top: 20px;
	//     		a {
	//     			cursor: pointer;
	//     		}
	//     		th,td {
	//     			text-align: center;
	//     		}
	//     	}
	//     	.bottom {
	//     		text-align: center;
	//             min-width: 1130px;
	//     		ul {
	//     			vertical-align: middle;
	//     			padding-left: 30px;
	//     			margin: 0;
	//     			margin-left: -50px;
	//     		}
	//
	//     	}
	//         // .goPage {
	//         //     display: inline-block;
	//         //     input {
	//         //         display: inline-block;
	//         //         width: 30px;
	//         //         padding: 0;
	//         //     }
	//         //     span {
	//         //         padding: 0 10px;
	//         //     }
	//         // }
	//
	// 	}
	// </style>
	// <script type="text/javascript">
	exports.default = {
	    components: {
	        alert: _messageAlert2.default,
	        searchTime: _search_time2.default,
	        cancel: _cancelAlert2.default,
	        load: _load2.default,
	        page: _page2.default
	    },

	    data: function data() {
	        return {
	            showAlert: false,
	            isPhone: false, //是否通过手机查询
	            isLoad: false,
	            selectData: {
	                area: '',
	                state: '',
	                searchTime: {
	                    begin: new Date().format(),
	                    end: new Date(new Date().setDate(new Date().getDate() + 1)).format()
	                }
	            },
	            downLoad: {
	                current: '',
	                all: ''
	            },
	            area: [],
	            searchlist: {
	                list: [],
	                all: 0,
	                nowPage: 1,
	                nowGroup: 1
	            },
	            confirm: {
	                isShow: false,
	                userPhone: ''
	            }, //确定弹窗
	            checkData: {
	                phone: '',
	                content: '',
	                time: '',
	                type: ''
	            }
	        };
	    },
	    attached: function attached() {
	        if (this.$root.isRefresh.message) {
	            this.search();
	            this.$root.isRefresh.message = false;
	        }
	    },
	    ready: function ready() {
	        var _this2 = this;

	        this.isLoad = true;
	        this.search();
	        this.$on('cancel', function (phone) {
	            _this2.isLoad = true;
	            _this2.confirm.isShow = false;
	            _index2.default.cancel(_this2, {
	                "phone": phone, //必填，手机号码
	                "head": "easier", //必填，操作人员
	                "type": "0" }, function (res) {
	                _this2.isLoad = false;
	                if (res.resMsg === "success") {
	                    //成功之后刷新搜索结果
	                    //搜索过则再搜索一次,没搜索过则调初始化的搜索
	                    if (_this2.isPhone || _this2.selectData.searchTime.begin && _this2.selectData.searchTime.end) {
	                        _this2.search();
	                    } else {
	                        _this2.$dispatch('search'); //初始化搜索
	                    }
	                }
	            });
	        });

	        this.$on('clickPage', function (item) {
	            //点击分页页数的时候触发
	            this.searchlist.nowPage = item + 1 + (this.searchlist.nowGroup - 1) * 5;
	            this.searchlist.list = [];
	            this.isLoad = true;
	            this.search();
	        });

	        this.$on('gotobtn', function (val, allpage) {
	            //点击分页确定按钮时触发
	            if (val == _this2.searchlist.nowPage) return window.alert('已经是当前页');
	            if (val && !isNaN(val)) {
	                if (val > 0 && val <= allpage) {
	                    _this2.searchlist.nowPage = val;
	                    _this2.searchlist.list = [];
	                    _this2.isLoad = true;
	                    _this2.search();

	                    return;
	                }
	            }
	            window.alert('不在页数范围内');
	        });

	        this.$on('search', function () {
	            var _this3 = this;

	            //点击搜索  初始化搜索
	            if (this.isPhone) {
	                if (this.$els.phone.value.trim().length != 11) return window.alert('请输入正确手机号码');
	                this.isLoad = true;
	                this.searchlist.list = [];
	                this.searchlist.all = 0;
	                _index2.default.findnumber(this, {
	                    "phone": this.$els.phone.value.trim() //必填，手机号码
	                }, function (res) {
	                    _this3.isLoad = false;
	                    if (res.resMsg === "success") {
	                        _this3.searchlist.list = res.repBody;
	                        _this3.searchlist.all = res.repBody.length;
	                        _this3.searchlist.nowPage = 1;
	                    }
	                });
	            } else {
	                if (this.selectData.area.trim().length == 0 && this.selectData.state.trim().length == 0 && this.selectData.searchTime.begin.trim().length == 0 && this.selectData.searchTime.end.trim().length == 0) {
	                    window.alert('请把日期填完整');
	                    return;
	                } else {
	                    this.isLoad = true;
	                    this.searchlist.list = [];
	                    this.searchlist.all = 0;
	                    this.searchlist.nowPage = 1;
	                    this.search();
	                }
	            }
	        });

	        _index2.default.area(this, {}, function (res) {
	            //地区接口
	            if (res.resCode === "000000" && res.resMsg === "success") {
	                var _this = _this2;
	                res.repBody.forEach(function (item) {
	                    item ? _this.area.push(item) : '';
	                });
	            }
	        });
	    },

	    methods: {
	        searchMessage: function searchMessage(data, back) {
	            var _this4 = this;

	            // this.isLoad=true;
	            _index2.default.searchMessage(this, data, function (res) {
	                _this4.isLoad = false;
	                if (res.resMsg === "success") {
	                    back(res);
	                }
	            });
	        },
	        inputPhone: function inputPhone() {
	            this.$els.phone.value.trim().length > 0 ? this.isPhone = true : this.isPhone = false;
	        },
	        confirmCancel: function confirmCancel(phone) {
	            this.confirm.userPhone = phone;
	            this.confirm.isShow = true;
	        },
	        search: function search() {
	            var _this5 = this;

	            this.searchMessage({
	                "begin": this.searchlist.nowPage, //必填，页数
	                "end": "12", //必填，条数
	                "starttime": this.selectData.searchTime.begin, //必填，开始时间
	                "endtime": this.selectData.searchTime.end, //必填，结束时间
	                "place": this.selectData.area ? this.selectData.area : null, //不选传null
	                "type": this.selectData.state ? this.selectData.state : null
	            }, function (res) {
	                if (res.resMsg === "success") {
	                    _this5.searchlist.list = res.repBody;
	                    _this5.searchlist.all = res.resCode;
	                    // this.searchlist.nowPage = 1
	                }
	            });
	        },
	        godetail: function godetail(number) {
	            this.$router.go({ path: '/home/manage/detail/' + number });
	            this.$dispatch('changeNumber', number);
	        },
	        downAll: function downAll() {
	            var _this6 = this;

	            this.$http.get(basePath + 'vip/down', {
	                phone: this.$els.phone.value.trim(),
	                size1: 0,
	                size2: 0,
	                createtime1: this.selectData.searchTime.begin,
	                createtime2: this.selectData.searchTime.end,
	                place: this.selectData.area ? this.selectData.area : 0,
	                type: this.selectData.state ? this.selectData.state : 0
	            }).then(function (res) {
	                console.log(res);

	                if (res && res.ok == true) {

	                    var temp = basePath + JSON.parse(res.response).repBody.replace(/\\/g, "/");
	                    _this6.downLoad.current = temp.replace(/jyh/g, "");
	                    var _this = _this6;
	                    window.setTimeout(function () {
	                        console.log(_this.downLoad.current);
	                        _this.$els.downloadcurrent.click();
	                    }, 100);
	                }
	            }, function (res) {
	                window.alert('下载失败');
	            });
	        },
	        down: function down() {
	            var _this7 = this;

	            // api.down1(this,{
	            //        opid: this.phone ? this.phone : null,
	            //         start : this.searchlist.nowPage,
	            //         end : 12,
	            // },res=>{
	            //     console.log(res)
	            // })
	            this.$http.get(basePath + 'vip/down', {
	                size1: this.searchlist.nowPage,
	                size2: "12",
	                phone: this.$els.phone.value.trim(),
	                createtime1: this.selectData.searchTime.begin,
	                createtime2: this.selectData.searchTime.end,
	                place: this.selectData.area ? this.selectData.area : 0,
	                type: this.selectData.state ? this.selectData.state : 0
	            }).then(function (res) {
	                console.log(res);

	                if (res && res.ok == true) {

	                    var temp = basePath + JSON.parse(res.response).repBody.replace(/\\/g, "/");
	                    _this7.downLoad.current = temp.replace(/jyh/g, "");
	                    var _this = _this7;
	                    window.setTimeout(function () {
	                        console.log(_this.downLoad.current);
	                        _this.$els.downloadcurrent.click();
	                    }, 100);
	                }
	            }, function (res) {
	                window.alert('下载失败');
	            });
	        },
	        clickCheck: function clickCheck(phone) {
	            var _this8 = this;

	            this.showAlert = true;
	            _index2.default.findnumber(this, {
	                "phone": phone //必填，手机号码
	            }, function (res) {
	                if (res.resMsg === "success") {
	                    _this8.checkData.phone = res.repBody[0].phone;
	                    _this8.checkData.content = res.repBody[0].head_url;
	                    _this8.checkData.time = res.repBody[0].createtime;
	                    _this8.checkData.type = '注册';
	                }
	            });
	        }
	    }
	};
	// </script>

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(51)
	__vue_script__ = __webpack_require__(53)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] components\\messageAlert.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(54)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-fb370e30/messageAlert.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(52);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./messageAlert.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./messageAlert.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".alert {\n  position: fixed;\n  top: 30%;\n  left: 50%;\n  background-color: #eee;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  z-index: 888; }\n  .alert h3 {\n    padding: 10px 0;\n    text-align: center; }\n  .alert table {\n    margin-bottom: 10px; }\n  .alert p {\n    text-align: center;\n    margin-bottom: 10px; }\n  .alert th, .alert td {\n    text-align: center; }\n", ""]);

	// exports


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    show: {
	      type: Boolean,
	      default: false
	    },
	    // phone : String,
	    formData: {
	      type: Object,
	      default: {
	        phone: '',
	        content: '',
	        time: '',
	        type: ''
	      }
	    }
	  },
	  data: function data() {
	    return {};
	  }
	}; // <template>
	// 	<div class="alert" v-if="show">
	// 		<button type="button" class="close" @click="show = false" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	// 		<h3 >历史下行短信</h3>
	// 		<table class="table table-bordered table-hover">
	//         <thead>
	//           <tr>
	//             <!-- <th>序号</th> -->
	//             <th>手机号码</th>
	//             <th>内容</th>
	//             <th>下行时间</th> 
	//             <th>请求类型</th>
	//
	//           </tr>
	//         </thead>
	//         <tbody>
	//           <tr>
	//             <!-- <th scope="row">1</th> -->
	//             <td>{{formData.phone}}</td>
	//             <td>{{formData.content}}</td>
	//             <td>{{new Date(formData.time).format()}}</td>
	//             <td>{{formData.type}}</td>
	//
	//           </tr>
	//           <!-- <tr>
	//             <th scope="row">2</th>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//
	//           </tr>
	//           <tr>
	//             <th scope="row">3</th>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//             <td>Table cell</td>
	//
	//           </tr> -->
	//         </tbody>
	//       </table>
	//       <!-- <p>共<span>6</span>条 当前第<span>1</span>/<span>2</span>页</p> -->
	//       <div class="clearfix">
	//       	<div style="float: right" >
	//      		<button type="button" class="btn btn-primary" @click="show = false">确定</button>
	//      		<!-- <button type="button" class="btn btn-success">下一页</button> -->
	//      	</div>
	//       </div>
	// 	</div>
	// </template>
	// <style lang="scss">
	// 	.alert {
	// 			position: fixed;
	// 			top: 30%;
	// 			left: 50%;
	// 			background-color: #eee;
	// 			transform: translateX(-50%);
	// 			z-index: 888;
	// 			h3 {
	// 				padding: 10px 0 ;
	// 				text-align: center;
	//
	// 			}
	// 			table {
	// 				margin-bottom: 10px;
	// 			}
	// 			p {
	// 				text-align: center;
	// 				margin-bottom: 10px;
	// 			}
	//       th,td {
	//         text-align: center;
	//       }
	//     	}
	//
	// </style>
	// <script type="text/javascript">

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"alert\" v-if=\"show\">\n\t\t<button type=\"button\" class=\"close\" @click=\"show = false\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t\t<h3 >历史下行短信</h3>\n\t\t<table class=\"table table-bordered table-hover\">\n        <thead>\n          <tr>\n            <!-- <th>序号</th> -->\n            <th>手机号码</th>\n            <th>内容</th>\n            <th>下行时间</th> \n            <th>请求类型</th>\n            \n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <!-- <th scope=\"row\">1</th> -->\n            <td>{{formData.phone}}</td>\n            <td>{{formData.content}}</td>\n            <td>{{new Date(formData.time).format()}}</td>\n            <td>{{formData.type}}</td>\n            \n          </tr>\n          <!-- <tr>\n            <th scope=\"row\">2</th>\n            <td>Table cell</td>\n            <td>Table cell</td>\n            <td>Table cell</td>\n            <td>Table cell</td>\n           \n          </tr>\n          <tr>\n            <th scope=\"row\">3</th>\n            <td>Table cell</td>\n            <td>Table cell</td>\n            <td>Table cell</td>\n            <td>Table cell</td>\n           \n          </tr> -->\n        </tbody>\n      </table>\n      <!-- <p>共<span>6</span>条 当前第<span>1</span>/<span>2</span>页</p> -->\n      <div class=\"clearfix\">\n      \t<div style=\"float: right\" >\n     \t\t<button type=\"button\" class=\"btn btn-primary\" @click=\"show = false\">确定</button>\n     \t\t<!-- <button type=\"button\" class=\"btn btn-success\">下一页</button> -->\n     \t</div>\n      </div>\n\t</div>\n";

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(56)
	__vue_script__ = __webpack_require__(58)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] components\\load.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(59)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-674012b9/load.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(57);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-674012b9&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./load.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-674012b9&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./load.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".load[_v-674012b9] {\n  position: relative;\n  z-index: 999;\n  margin-top: 30px;\n  margin-bottom: 20px; }\n  .load .el-loading-spinner[_v-674012b9] {\n    margin-top: -21px;\n    text-align: center; }\n    .load .el-loading-spinner .circular[_v-674012b9] {\n      width: 42px;\n      height: 42px;\n      -webkit-animation: loading-rotate 2s linear infinite;\n              animation: loading-rotate 2s linear infinite;\n      -webkit-transform-origin: 50% 50% 0px;\n              transform-origin: 50% 50% 0px; }\n      .load .el-loading-spinner .circular .path[_v-674012b9] {\n        -webkit-animation: loading-dash 1.5s ease-in-out infinite;\n                animation: loading-dash 1.5s ease-in-out infinite;\n        stroke-dasharray: 90,150;\n        stroke-dashoffset: 0;\n        stroke-width: 2;\n        stroke: #20a0ff;\n        stroke-linecap: round;\n        cx: 50;\n        cy: 50;\n        r: 20;\n        fill: none;\n        -webkit-transform-origin: 0px 0px 0px;\n                transform-origin: 0px 0px 0px;\n        text-align: center; }\n\n@-webkit-keyframes loading-rotate {\n  -webkit-transform: rotate(1turn);\n          transform: rotate(1turn); }\n\n@keyframes loading-rotate {\n  -webkit-transform: rotate(1turn);\n          transform: rotate(1turn); }\n\n@-webkit-keyframes loading-dash {\n  0% {\n    stroke-dasharray: 1,200;\n    stroke-dashoffset: 0; }\n  50% {\n    stroke-dasharray: 90,150;\n    stroke-dashoffset: -40px; }\n  100% {\n    stroke-dasharray: 90,150;\n    stroke-dashoffset: -120px; } }\n\n@keyframes loading-dash {\n  0% {\n    stroke-dasharray: 1,200;\n    stroke-dashoffset: 0; }\n  50% {\n    stroke-dasharray: 90,150;\n    stroke-dashoffset: -40px; }\n  100% {\n    stroke-dasharray: 90,150;\n    stroke-dashoffset: -120px; } }\n", ""]);

	// exports


/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<div class="load" v-if="show">
	// 		<div class="el-loading-spinner">
	// 			<svg viewBox="25 25 50 50" class="circular">
	// 				<circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
	// 			</svg>
	// 		</div>
	// 	</div>
	// </template>
	// <script>
	exports.default = {
		props: {
			show: {
				type: Boolean,
				default: false
			}

		}
	};
	// </script>
	// <style lang="scss" scoped>
	// 	.load {
	// 		position: relative;
	// 		z-index: 999;
	// 		margin-top: 30px;
	// 		margin-bottom: 20px;
	// 		.el-loading-spinner {
	// 			    margin-top: -21px;
	// 			    text-align: center;
	// 			    .circular {
	// 		    	    width: 42px;
	// 				    height: 42px;
	// 				    animation: loading-rotate 2s linear infinite;
	// 				    transform-origin: 50% 50% 0px;
	// 				    .path {
	// 				    	animation: loading-dash 1.5s ease-in-out infinite;
	// 					    stroke-dasharray: 90,150;
	// 					    stroke-dashoffset: 0;
	// 					    stroke-width: 2;
	// 					    stroke: #20a0ff;
	// 					    stroke-linecap: round;
	// 					    cx: 50;
	// 					    cy: 50;
	// 					    r: 20;
	// 					    fill: none;
	// 					    transform-origin: 0px 0px 0px;
	// 					    text-align: center;
	// 				    }
	// 			    }
	// 		}
	//
	// 	}
	// 	@keyframes loading-rotate
	// 	{
	// 		    transform: rotate(1turn);
	// 	}
	// 	@keyframes loading-dash
	// 	{
	// 		    0% {
	// 			    stroke-dasharray: 1,200;
	// 			    stroke-dashoffset: 0;
	// 			}
	// 			50% {
	// 			    stroke-dasharray: 90,150;
	// 			    stroke-dashoffset: -40px;
	// 			}
	// 			100% {
	// 			    stroke-dasharray: 90,150;
	// 			    stroke-dashoffset: -120px;
	// 			}
	// 	}
	// </style>

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"load\" v-if=\"show\" _v-674012b9=\"\">\n\t<div class=\"el-loading-spinner\" _v-674012b9=\"\">\n\t\t<svg viewBox=\"25 25 50 50\" class=\"circular\" _v-674012b9=\"\">\n\t\t\t<circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" class=\"path\" _v-674012b9=\"\"></circle>\n\t\t</svg>\n\t</div>\n</div>\n";

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(61)
	__vue_script__ = __webpack_require__(63)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] components\\search_time.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(70)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-27679901/search_time.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(62);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./search_time.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./search_time.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".selectTime input, .selectTime select {\n  display: inline-block;\n  width: 96px; }\n\n.selectTime span {\n  margin-right: 5px;\n  margin-left: 5px; }\n\n.selectTime select {\n  vertical-align: bottom; }\n", ""]);

	// exports


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Datepicker = __webpack_require__(64);

	var _Datepicker2 = _interopRequireDefault(_Datepicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: {
			Datepicker: _Datepicker2.default
		},
		props: {
			searchdate: {
				type: Object,
				default: {
					begin: '',
					end: ''
				}
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			search: function search() {
				this.$dispatch('search');
			}
		}
	};
	// </script>
	// <template>
	// 	<div class="selectTime">
	// 		<span>查询时间段：</span> <span> 从 </span>
	// 	     <datepicker :value.sync="searchdate.begin" :format="'yyyy-MM-dd'" placeholder="年-月-日" width="100px" :disabled="disabled" ></datepicker>
	// 	     <span> 到 </span> 
	// 	     <datepicker :value.sync="searchdate.end"  :format="'yyyy-MM-dd'" placeholder="年-月-日" width="100px" :disabled="disabled"></datepicker>
	// 	     <slot></slot>
	// 	     <button class="btn btn-primary" style="margin-left: 80px;" @click="search">查询</button>
	// 	</div>
	// </template>
	// <style lang="scss">
	// 	.selectTime {
	// 		input,select {
	//     			display: inline-block;
	//     			width: 96px;
	//     			// height: 22px;
	//     		}
	//     		span {
	//     			margin-right: 5px;
	//     			margin-left: 5px;
	//     		}
	//     		select {
	//     			vertical-align: bottom;
	//     		}
	// 	}
	//
	// </style>
	// <script type="text/javascript">

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(65)
	__vue_script__ = __webpack_require__(67)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] components\\Datepicker.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(69)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-48c9e46f/Datepicker.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(66);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-48c9e46f&scoped=true!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Datepicker.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-48c9e46f&scoped=true!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./Datepicker.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.datepicker[_v-48c9e46f] {\n    position: relative;\n    display: inline-block;\n    /*top: -52px;\n    left: 261px;*/\n    font-size: 12px;\n}\n\n.datepicker-popup[_v-48c9e46f] {\n    position: absolute;\n    border-radius: 5px;\n    background: #fff;\n    margin-top: 2px;\n    z-index: 1000;\n    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n}\n\n.datepicker-inner[_v-48c9e46f] {\n    width: 230px;\n}\n\n.datepicker-body[_v-48c9e46f] {\n    /*padding: 10px 10px;*/\n}\n.datepicker-ctrl[_v-48c9e46f]{\n    background-color: #fe7eaf;\n    border-top-left-radius: 6px;\n    border-top-right-radius: 6px;\n    color: #fff;\n}\n.datepicker-ctrl p[_v-48c9e46f],\n.datepicker-ctrl span[_v-48c9e46f],\n.datepicker-body span[_v-48c9e46f] {\n    display: inline-block;\n    width: 28px;\n    line-height: 28px;\n    height: 28px;\n    border-radius: 4px;\n}\n\n.datepicker-ctrl p[_v-48c9e46f] {\n    width: 65%;\n}\n\n.datepicker-ctrl span[_v-48c9e46f] {\n    position: absolute;\n}\n\n.datepicker-body span[_v-48c9e46f] {\n    text-align: center;\n}\n\n.datepicker-mouthRange span[_v-48c9e46f] {\n    width: 48px;\n    height: 50px;\n    line-height: 45px;\n}\n\n.datepicker-item-disable[_v-48c9e46f] {\n    background-color: white!important;\n    cursor: not-allowed!important;\n}\n\n.decadeRange span[_v-48c9e46f]:first-child,\n.decadeRange span[_v-48c9e46f]:last-child,\n.datepicker-item-disable[_v-48c9e46f],\n.datepicker-item-gray[_v-48c9e46f] {\n    color: #999;\n}\n.datepicker-weekRange span[_v-48c9e46f],.datepicker-dateRange span[_v-48c9e46f],.datepicker-mouthRange span[_v-48c9e46f] {\n    border: 1px solid white;\n}\n.datepicker-dateRange-item-active[_v-48c9e46f]:hover,\n.datepicker-dateRange-item-active[_v-48c9e46f] {\n    /*background: rgb(50, 118, 177)!important;*/\n    color: #fe7eaf;\n    border-radius: 45px !important;\n    border: 1px solid #ccc;\n}\n\n.datepicker-mouthRange[_v-48c9e46f] {\n    margin: 27px 0;\n    text-align: center;\n}\n.datepicker-mouthRange span[_v-48c9e46f] { line-height: 50px; }\n.datepicker-mouthRange span[_v-48c9e46f],\n.datepicker-ctrl span[_v-48c9e46f],\n.datepicker-ctrl p[_v-48c9e46f],\n.datepicker-dateRange span[_v-48c9e46f] {\n    cursor: pointer;\n}\n\n.datepicker-mouthRange span[_v-48c9e46f]:hover,\n.datepicker-ctrl p[_v-48c9e46f]:hover,\n.datepicker-ctrl i[_v-48c9e46f]:hover,\n.datepicker-dateRange span[_v-48c9e46f]:hover,\n.datepicker-dateRange-item-hover[_v-48c9e46f] {\n    background-color: #eeeeee;\n    border-radius: 45px !important;\n    border: 1px solid #ccc;\n}\n\n.datepicker-weekRange[_v-48c9e46f]{\n    padding:0 10px;\n}\n.datepicker-weekRange span[_v-48c9e46f] {\n    font-weight: bold;\n}\n\n.datepicker-label[_v-48c9e46f] {\n    background-color: #f8f8f8;\n    font-weight: 700;\n    padding: 7px 0;\n    text-align: center;\n}\n\n.datepicker-ctrl[_v-48c9e46f] {\n    position: relative;\n    height: 30px;\n    line-height: 30px;\n    font-weight: bold;\n    text-align: center;\n}\n\n.month-btn[_v-48c9e46f] {\n    font-weight: bold;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.datepicker-preBtn[_v-48c9e46f] {\n    left: 2px;\n}\n\n.datepicker-nextBtn[_v-48c9e46f] {\n    right: 2px;\n}\n", ""]);

	// exports


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _EventListener = __webpack_require__(68);

	var _EventListener2 = _interopRequireDefault(_EventListener);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    props: {
	        value: {
	            type: String,
	            twoWay: true
	        },
	        format: {
	            default: 'MMMM/dd/yyyy'
	        },
	        disabledDaysOfWeek: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        width: {
	            type: String,
	            default: '200px'
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        // top: {
	        //     type: String,
	        //     default: '-52px'
	        // },
	        // left: {
	        //     type: String,
	        //     default: '261px'
	        // },
	        placeholder: {
	            type: String
	        }
	    },
	    data: function data() {
	        return {
	            weekRange: ['日', '一', '二', '三', '四', '五', '六'],
	            dateRange: [],
	            decadeRange: [],
	            currDate: new Date(),
	            displayDayView: false,
	            displayMouthView: false,
	            displayYearView: false,
	            mouthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
	        };
	    },

	    events: {
	        'selectTime': function selectTime() {
	            this.displayDayView = !this.displayDayView;
	        }
	    },
	    watch: {
	        currDate: function currDate() {
	            this.getDateRange();
	        }
	    },
	    methods: {
	        close: function close() {
	            this.displayDayView = this.displayMouthView = this.displayMouthView = false;
	        },
	        inputClick: function inputClick() {
	            this.$dispatch('dateClick');
	            if (this.displayMouthView || this.displayYearView) {
	                this.displayDayView = false;
	            } else {
	                this.displayDayView = !this.displayDayView;
	            }
	        },
	        preNextDecadeClick: function preNextDecadeClick(flag) {
	            var year = this.currDate.getFullYear();
	            var mouths = this.currDate.getMonth();
	            var date = this.currDate.getDate();

	            if (flag === 0) {
	                this.currDate = new Date(year - 10, mouths, date);
	            } else {
	                this.currDate = new Date(year + 10, mouths, date);
	            }
	        },
	        preNextMonthClick: function preNextMonthClick(flag) {
	            var year = this.currDate.getFullYear();
	            var month = this.currDate.getMonth();
	            var date = this.currDate.getDate();

	            if (flag === 0) {
	                var preMonth = this.getYearMonth(year, month - 1);
	                this.currDate = new Date(preMonth.year, preMonth.month, date);
	            } else {
	                var nextMonth = this.getYearMonth(year, month + 1);
	                this.currDate = new Date(nextMonth.year, nextMonth.month, date);
	            }
	        },
	        preNextYearClick: function preNextYearClick(flag) {
	            var year = this.currDate.getFullYear();
	            var mouths = this.currDate.getMonth();
	            var date = this.currDate.getDate();

	            if (flag === 0) {
	                this.currDate = new Date(year - 1, mouths, date);
	            } else {
	                this.currDate = new Date(year + 1, mouths, date);
	            }
	        },
	        yearSelect: function yearSelect(year) {
	            this.displayYearView = false;
	            this.displayMouthView = true;
	            this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate());
	        },
	        daySelect: function daySelect(date, el) {
	            if (el.$el.classList[0] === 'datepicker-item-disable') {
	                return false;
	            } else {
	                this.currDate = date;
	                this.value = this.stringify(this.currDate);
	                this.displayDayView = false;
	            }
	        },
	        switchMouthView: function switchMouthView() {
	            this.displayDayView = false;
	            this.displayMouthView = true;
	        },
	        switchDecadeView: function switchDecadeView() {
	            this.displayMouthView = false;
	            this.displayYearView = true;
	        },
	        mouthSelect: function mouthSelect(index) {
	            this.displayMouthView = false;
	            this.displayDayView = true;
	            this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate());
	        },
	        getYearMonth: function getYearMonth(year, month) {
	            if (month > 11) {
	                year++;
	                month = 0;
	            } else if (month < 0) {
	                year--;
	                month = 11;
	            }
	            return {
	                year: year,
	                month: month
	            };
	        },
	        stringifyDecadeHeader: function stringifyDecadeHeader(date) {
	            var yearStr = date.getFullYear().toString();
	            var firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0;
	            var lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10;
	            return firstYearOfDecade + '-' + lastYearOfDecade;
	        },
	        stringifyDayHeader: function stringifyDayHeader(date) {
	            return date.getFullYear() + '年 ' + this.mouthNames[date.getMonth()];
	        },
	        parseMouth: function parseMouth(date) {
	            return this.mouthNames[date.getMonth()];
	        },
	        stringifyYearHeader: function stringifyYearHeader(date) {
	            return date.getFullYear();
	        },
	        stringify: function stringify(date) {
	            var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.format;

	            var year = date.getFullYear();
	            var month = date.getMonth() + 1;
	            var day = date.getDate();
	            var mouthName = this.parseMouth(date);

	            return format.replace(/yyyy/g, year).replace(/MMMM/g, mouthName).replace(/MMM/g, mouthName.substring(0, 3)).replace(/MM/g, ('0' + month).slice(-2)).replace(/dd/g, ('0' + day).slice(-2)).replace(/yy/g, year).replace(/M(?!a)/g, month).replace(/d/g, day);
	        },
	        parse: function parse(str) {
	            var date = new Date(str);
	            return isNaN(date.getFullYear()) ? null : date;
	        },
	        getDayCount: function getDayCount(year, month) {
	            var dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	            if (month === 1) {
	                if (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) {
	                    return 29;
	                }
	                return 28;
	            }

	            return dict[month];
	        },
	        getDateRange: function getDateRange() {
	            var _this = this;

	            this.dateRange = [];
	            this.decadeRange = [];
	            var time = {
	                year: this.currDate.getFullYear(),
	                month: this.currDate.getMonth(),
	                day: this.currDate.getDate()
	            };
	            var yearStr = time.year.toString();
	            var firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0 - 1;
	            for (var i = 0; i < 12; i++) {
	                this.decadeRange.push({
	                    text: firstYearOfDecade + i
	                });
	            }

	            var currMonthFirstDay = new Date(time.year, time.month, 1);
	            var firstDayWeek = currMonthFirstDay.getDay() + 1;
	            if (firstDayWeek === 0) {
	                firstDayWeek = 7;
	            }
	            var dayCount = this.getDayCount(time.year, time.month);
	            if (firstDayWeek > 1) {
	                var preMonth = this.getYearMonth(time.year, time.month - 1);
	                var prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month);
	                for (var _i = 1; _i < firstDayWeek; _i++) {
	                    var dayText = prevMonthDayCount - firstDayWeek + _i + 1;
	                    this.dateRange.push({
	                        text: dayText,
	                        date: new Date(preMonth.year, preMonth.month, dayText),
	                        sclass: 'datepicker-item-gray'
	                    });
	                }
	            }

	            var _loop = function _loop(_i2) {
	                var date = new Date(time.year, time.month, _i2);
	                var week = date.getDay();
	                var sclass = '';
	                _this.disabledDaysOfWeek.forEach(function (el) {
	                    if (week === parseInt(el, 10)) sclass = 'datepicker-item-disable';
	                });

	                if (_i2 === time.day) {
	                    if (_this.value) {
	                        var valueDate = _this.parse(_this.value);
	                        if (valueDate) {
	                            if (valueDate.getFullYear() === time.year && valueDate.getMonth() === time.month) {
	                                sclass = 'datepicker-dateRange-item-active';
	                            }
	                        }
	                    }
	                }
	                _this.dateRange.push({
	                    text: _i2,
	                    date: date,
	                    sclass: sclass
	                });
	            };

	            for (var _i2 = 1; _i2 <= dayCount; _i2++) {
	                _loop(_i2);
	            }

	            if (this.dateRange.length < 42) {
	                var nextMonthNeed = 42 - this.dateRange.length;
	                var nextMonth = this.getYearMonth(time.year, time.month + 1);

	                for (var _i3 = 1; _i3 <= nextMonthNeed; _i3++) {
	                    this.dateRange.push({
	                        text: _i3,
	                        date: new Date(nextMonth.year, nextMonth.month, _i3),
	                        sclass: 'datepicker-item-gray'
	                    });
	                }
	            }
	        }
	    },
	    ready: function ready() {
	        var _this2 = this;

	        this.$dispatch('child-created', this);
	        this.currDate = this.parse(this.value) || this.parse(new Date());
	        this._closeEvent = _EventListener2.default.listen(window, 'click', function (e) {
	            if (!_this2.$el.contains(e.target)) _this2.close();
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        if (this._closeEvent) this._closeEvent.remove();
	    }
	};
	// </script>
	// <style scoped>
	// .datepicker {
	//     position: relative;
	//     display: inline-block;
	//     /*top: -52px;
	//     left: 261px;*/
	//     font-size: 12px;
	// }
	//
	// .datepicker-popup {
	//     position: absolute;
	//     border-radius: 5px;
	//     background: #fff;
	//     margin-top: 2px;
	//     z-index: 1000;
	//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
	//     border-top-left-radius: 6px;
	//     border-top-right-radius: 6px;
	// }
	//
	// .datepicker-inner {
	//     width: 230px;
	// }
	//
	// .datepicker-body {
	//     /*padding: 10px 10px;*/
	// }
	// .datepicker-ctrl{
	//     background-color: #fe7eaf;
	//     border-top-left-radius: 6px;
	//     border-top-right-radius: 6px;
	//     color: #fff;
	// }
	// .datepicker-ctrl p,
	// .datepicker-ctrl span,
	// .datepicker-body span {
	//     display: inline-block;
	//     width: 28px;
	//     line-height: 28px;
	//     height: 28px;
	//     border-radius: 4px;
	// }
	//
	// .datepicker-ctrl p {
	//     width: 65%;
	// }
	//
	// .datepicker-ctrl span {
	//     position: absolute;
	// }
	//
	// .datepicker-body span {
	//     text-align: center;
	// }
	//
	// .datepicker-mouthRange span {
	//     width: 48px;
	//     height: 50px;
	//     line-height: 45px;
	// }
	//
	// .datepicker-item-disable {
	//     background-color: white!important;
	//     cursor: not-allowed!important;
	// }
	//
	// .decadeRange span:first-child,
	// .decadeRange span:last-child,
	// .datepicker-item-disable,
	// .datepicker-item-gray {
	//     color: #999;
	// }
	// .datepicker-weekRange span,.datepicker-dateRange span,.datepicker-mouthRange span {
	//     border: 1px solid white;
	// }
	// .datepicker-dateRange-item-active:hover,
	// .datepicker-dateRange-item-active {
	//     /*background: rgb(50, 118, 177)!important;*/
	//     color: #fe7eaf;
	//     border-radius: 45px !important;
	//     border: 1px solid #ccc;
	// }
	//
	// .datepicker-mouthRange {
	//     margin: 27px 0;
	//     text-align: center;
	// }
	// .datepicker-mouthRange span { line-height: 50px; }
	// .datepicker-mouthRange span,
	// .datepicker-ctrl span,
	// .datepicker-ctrl p,
	// .datepicker-dateRange span {
	//     cursor: pointer;
	// }
	//
	// .datepicker-mouthRange span:hover,
	// .datepicker-ctrl p:hover,
	// .datepicker-ctrl i:hover,
	// .datepicker-dateRange span:hover,
	// .datepicker-dateRange-item-hover {
	//     background-color: #eeeeee;
	//     border-radius: 45px !important;
	//     border: 1px solid #ccc;
	// }
	//
	// .datepicker-weekRange{
	//     padding:0 10px;
	// }
	// .datepicker-weekRange span {
	//     font-weight: bold;
	// }
	//
	// .datepicker-label {
	//     background-color: #f8f8f8;
	//     font-weight: 700;
	//     padding: 7px 0;
	//     text-align: center;
	// }
	//
	// .datepicker-ctrl {
	//     position: relative;
	//     height: 30px;
	//     line-height: 30px;
	//     font-weight: bold;
	//     text-align: center;
	// }
	//
	// .month-btn {
	//     font-weight: bold;
	//     -webkit-user-select: none;
	//     -moz-user-select: none;
	//     -ms-user-select: none;
	//     user-select: none;
	// }
	//
	// .datepicker-preBtn {
	//     left: 2px;
	// }
	//
	// .datepicker-nextBtn {
	//     right: 2px;
	// }
	// </style>
	// <template>
	//     <div class="datepicker" ><!-- v-bind:style="{top: top, left: left}" -->
	//         <input class="form-control datepicker-input" type="text" v-bind:style="{width:width}" @click="inputClick" v-model="value" :placeholder="placeholder" style="padding-left:5px;box-sizing: border-box;" :disabled="disabled"/>
	//         <div class="datepicker-popup" v-show="displayDayView">
	//             <div class="datepicker-inner">
	//                 <div class="datepicker-body">
	//                     <div class="datepicker-ctrl">
	//                         <span class="month-btn datepicker-preBtn" @click="preNextMonthClick(0)">&lt;</span>
	//                         <span class="month-btn datepicker-nextBtn" @click="preNextMonthClick(1)">&gt;</span>
	//                         <p @click="switchMouthView">
	//                             {{stringifyDayHeader(currDate)}}
	//                         </p>
	//                     </div>
	//                     <div class="datepicker-weekRange">
	//                         <span v-for="w in weekRange">{{w}}</span>
	//                     </div>
	//                     <div class="datepicker-dateRange" style="padding:0 10px;">
	//                         <span v-for="d in dateRange" v-bind:class="d.sclass" @click="daySelect(d.date,this)">{{d.text}}</span>
	//                     </div>
	//                 </div>
	//             </div>
	//         </div>
	//         <div class="datepicker-popup" v-show="displayMouthView">
	//             <div class="datepicker-inner">
	//                 <div class="datepicker-body">
	//                     <div class="datepicker-ctrl">
	//                         <span class="month-btn datepicker-preBtn" @click="preNextYearClick(0)" >&lt;</span>
	//                         <span class="month-btn datepicker-nextBtn"  @click="preNextYearClick(1)">&gt;</span>
	//                         <p @click="switchDecadeView">
	//                             {{stringifyYearHeader(currDate)}}
	//                         </p>
	//                     </div>
	//                     <div class="datepicker-mouthRange">
	//                         <template v-for="m in mouthNames">
	//                             <span v-bind:class="{'datepicker-dateRange-item-active':
	//                           (this.mouthNames[this.parse(this.value)&&this.parse(this.value).getMonth()]  === m) &&
	//                           this.currDate.getFullYear() === this.parse(this.value).getFullYear()}" @click="mouthSelect($index)">
	//                         {{m.substr(0,3)}}
	//                       </span>
	//                         </template>
	//                     </div>
	//                 </div>
	//             </div>
	//         </div>
	//         <div class="datepicker-popup" v-show="displayYearView">
	//             <div class="datepicker-inner">
	//                 <div class="datepicker-body">
	//                     <div class="datepicker-ctrl">
	//                         <span class="month-btn datepicker-preBtn" @click="preNextDecadeClick(0)">&lt;</span>
	//                         <span class="month-btn datepicker-nextBtn" @click="preNextDecadeClick(1)">&gt;</span>
	//                         <p>
	//                             {{stringifyDecadeHeader(currDate)}}
	//                         </p>
	//                     </div>
	//                     <div class="datepicker-mouthRange decadeRange">
	//                         <template v-for="decade in decadeRange">
	//                             <span v-bind:class="{'datepicker-dateRange-item-active':
	//                         this.parse(this.value)&&this.parse(this.value).getFullYear() === decade.text}" @click.stop="yearSelect(decade.text)">
	//                         {{decade.text}}
	//                       </span>
	//                         </template>
	//                     </div>
	//                 </div>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	// <script>

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function remove() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function remove() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  }
	};

	exports.default = EventListener;

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"datepicker\" _v-48c9e46f=\"\"><!-- v-bind:style=\"{top: top, left: left}\" -->\n    <input class=\"form-control datepicker-input\" type=\"text\" v-bind:style=\"{width:width}\" @click=\"inputClick\" v-model=\"value\" :placeholder=\"placeholder\" style=\"padding-left:5px;box-sizing: border-box;\" :disabled=\"disabled\" _v-48c9e46f=\"\">\n    <div class=\"datepicker-popup\" v-show=\"displayDayView\" _v-48c9e46f=\"\">\n        <div class=\"datepicker-inner\" _v-48c9e46f=\"\">\n            <div class=\"datepicker-body\" _v-48c9e46f=\"\">\n                <div class=\"datepicker-ctrl\" _v-48c9e46f=\"\">\n                    <span class=\"month-btn datepicker-preBtn\" @click=\"preNextMonthClick(0)\" _v-48c9e46f=\"\">&lt;</span>\n                    <span class=\"month-btn datepicker-nextBtn\" @click=\"preNextMonthClick(1)\" _v-48c9e46f=\"\">&gt;</span>\n                    <p @click=\"switchMouthView\" _v-48c9e46f=\"\">\n                        {{stringifyDayHeader(currDate)}}\n                    </p>\n                </div>\n                <div class=\"datepicker-weekRange\" _v-48c9e46f=\"\">\n                    <span v-for=\"w in weekRange\" _v-48c9e46f=\"\">{{w}}</span>\n                </div>\n                <div class=\"datepicker-dateRange\" style=\"padding:0 10px;\" _v-48c9e46f=\"\">\n                    <span v-for=\"d in dateRange\" v-bind:class=\"d.sclass\" @click=\"daySelect(d.date,this)\" _v-48c9e46f=\"\">{{d.text}}</span>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"datepicker-popup\" v-show=\"displayMouthView\" _v-48c9e46f=\"\">\n        <div class=\"datepicker-inner\" _v-48c9e46f=\"\">\n            <div class=\"datepicker-body\" _v-48c9e46f=\"\">\n                <div class=\"datepicker-ctrl\" _v-48c9e46f=\"\">\n                    <span class=\"month-btn datepicker-preBtn\" @click=\"preNextYearClick(0)\" _v-48c9e46f=\"\">&lt;</span>\n                    <span class=\"month-btn datepicker-nextBtn\" @click=\"preNextYearClick(1)\" _v-48c9e46f=\"\">&gt;</span>\n                    <p @click=\"switchDecadeView\" _v-48c9e46f=\"\">\n                        {{stringifyYearHeader(currDate)}}\n                    </p>\n                </div>\n                <div class=\"datepicker-mouthRange\" _v-48c9e46f=\"\">\n                    <template v-for=\"m in mouthNames\">\n                        <span v-bind:class=\"{'datepicker-dateRange-item-active':\n                      (this.mouthNames[this.parse(this.value)&amp;&amp;this.parse(this.value).getMonth()]  === m) &amp;&amp;\n                      this.currDate.getFullYear() === this.parse(this.value).getFullYear()}\" @click=\"mouthSelect($index)\" _v-48c9e46f=\"\">\n                    {{m.substr(0,3)}}\n                  </span>\n                    </template>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"datepicker-popup\" v-show=\"displayYearView\" _v-48c9e46f=\"\">\n        <div class=\"datepicker-inner\" _v-48c9e46f=\"\">\n            <div class=\"datepicker-body\" _v-48c9e46f=\"\">\n                <div class=\"datepicker-ctrl\" _v-48c9e46f=\"\">\n                    <span class=\"month-btn datepicker-preBtn\" @click=\"preNextDecadeClick(0)\" _v-48c9e46f=\"\">&lt;</span>\n                    <span class=\"month-btn datepicker-nextBtn\" @click=\"preNextDecadeClick(1)\" _v-48c9e46f=\"\">&gt;</span>\n                    <p _v-48c9e46f=\"\">\n                        {{stringifyDecadeHeader(currDate)}}\n                    </p>\n                </div>\n                <div class=\"datepicker-mouthRange decadeRange\" _v-48c9e46f=\"\">\n                    <template v-for=\"decade in decadeRange\">\n                        <span v-bind:class=\"{'datepicker-dateRange-item-active':\n                    this.parse(this.value)&amp;&amp;this.parse(this.value).getFullYear() === decade.text}\" @click.stop=\"yearSelect(decade.text)\" _v-48c9e46f=\"\">\n                    {{decade.text}}\n                  </span>\n                    </template>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"selectTime\">\n\t<span>查询时间段：</span> <span> 从 </span>\n     <datepicker :value.sync=\"searchdate.begin\" :format=\"'yyyy-MM-dd'\" placeholder=\"年-月-日\" width=\"100px\" :disabled=\"disabled\" ></datepicker>\n     <span> 到 </span> \n     <datepicker :value.sync=\"searchdate.end\"  :format=\"'yyyy-MM-dd'\" placeholder=\"年-月-日\" width=\"100px\" :disabled=\"disabled\"></datepicker>\n     <slot></slot>\n     <button class=\"btn btn-primary\" style=\"margin-left: 80px;\" @click=\"search\">查询</button>\n</div>\n";

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(72)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] components\\cancelAlert.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(73)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3d1be1ff/cancelAlert.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			phone: String
		},
		methods: {
			cancel: function cancel() {
				this.$dispatch('cancel', this.phone);
			}
		}
	};
	// </script>
	// <template>
	// 	<div v-if="show">
	// 		<div class="modal show bs-example-modal-sm">
	// 		    <div class="modal-dialog">
	// 		        <div class="modal-content">
	// 		            <div class="modal-header">
	// 		                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	// 		                <h4 class="modal-title" >销户确认</h4>
	// 		            </div>
	// 		            <div class="modal-body">
	// 		                <p>确定要为用户{{phone}}进行销户吗?</p>
	// 		            </div>
	// 		            <div class="modal-footer">
	// 		                <button type="button" class="btn btn-default" data-dismiss="modal" @click="this.show=false">取消</button>
	// 		                <button type="button" class="btn btn-primary" @click="cancel">确定</button>
	// 		            </div>
	// 		        </div><!-- /.modal-content -->
	// 		    </div><!-- /.modal-dialog -->
	// 		</div><!-- /.modal -->
	// 	</div>
	// </template>
	// <script type="text/javascript">

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = "\n<div v-if=\"show\">\n\t<div class=\"modal show bs-example-modal-sm\">\n\t    <div class=\"modal-dialog\">\n\t        <div class=\"modal-content\">\n\t            <div class=\"modal-header\">\n\t                <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\n\t                <h4 class=\"modal-title\" >销户确认</h4>\n\t            </div>\n\t            <div class=\"modal-body\">\n\t                <p>确定要为用户{{phone}}进行销户吗?</p>\n\t            </div>\n\t            <div class=\"modal-footer\">\n\t                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" @click=\"this.show=false\">取消</button>\n\t                <button type=\"button\" class=\"btn btn-primary\" @click=\"cancel\">确定</button>\n\t            </div>\n\t        </div><!-- /.modal-content -->\n\t    </div><!-- /.modal-dialog -->\n\t</div><!-- /.modal -->\n</div>\n";

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(75)
	__vue_script__ = __webpack_require__(77)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] components\\page.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(78)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-2c78b3e2/page.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(76);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2c78b3e2&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./page.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-2c78b3e2&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./page.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".goPage[_v-2c78b3e2] {\n  display: inline-block; }\n  .goPage input[_v-2c78b3e2] {\n    display: inline-block;\n    width: 30px;\n    padding: 0; }\n  .goPage span[_v-2c78b3e2] {\n    padding: 0 10px; }\n\n.bottom[_v-2c78b3e2] {\n  text-align: center; }\n  .bottom ul[_v-2c78b3e2] {\n    vertical-align: middle;\n    padding-left: 30px;\n    margin: 0;\n    margin-left: -175px; }\n", ""]);

	// exports


/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	// 	<div class="bottom">
	// 		<div style="float: left">当前显示<span> {{searchlist.nowPage*12-11}} </span>到<span> {{searchlist.nowPage==allPage ?searchlist.all :searchlist.nowPage*12}} </span>条,共<span> {{searchlist.all }} </span>条记录</div>
	// 			<ul class="pagination" style="padding-left: 0px; ">
	// 		        <li :class="{disabled:searchlist.nowGroup<=1}" @click="searchlist.nowGroup<=1?'':searchlist.nowGroup-=1"><a  aria-label="Previous"><span aria-hidden="true">«</span></a></li>
	// 		        <li @click="clickPage(item)" :class="{active: searchlist.nowPage===item+1+(searchlist.nowGroup-1)*5}" v-for="item in 5|showPage"><a >{{item+1+(searchlist.nowGroup-1)*5}} </a></li>
	//
	// 		        <li :class="{disabled:searchlist.nowGroup>=group}" @click="searchlist.nowGroup>=group?'':searchlist.nowGroup+=1"><a   aria-label="Next"><span aria-hidden="true">»</span></a></li>
	// 	     	</ul>
	// 	        <div class="goPage">
	// 	            <span>到</span><input style="text-align: center" v-el:goto class="form-control" type="text" name=""><span>页</span><button type="button" class="btn btn-primary" @click="gotobtn">确定</button>
	// 	        </div>
	// 	     	<slot>
	//
	// 	     	</slot>
	// 		</div>
	// 	</div>
	// </template>
	// <script type="text/javascript">
	exports.default = {
	  props: {
	    searchlist: {
	      type: Object,
	      default: {
	        list: [],
	        all: 0,
	        nowPage: 1,
	        nowGroup: 1
	      }
	    }
	  },
	  ready: function ready() {},

	  computed: {

	    allPage: function allPage() {
	      //共多少页
	      // `this` 指向 vm 实例
	      return Math.ceil(this.searchlist.all / 12);
	    },
	    group: function group() {
	      //当前显示的组数,每组5页
	      return Math.ceil(Math.ceil(this.searchlist.all / 12) / 5);
	    }
	  },
	  filters: {
	    showPage: function showPage(val, item) {
	      if (this.allPage == 0) return 1;
	      for (var i = 0; i < val; i++) {
	        if (i + 1 + (this.searchlist.nowGroup - 1) * 5 == this.allPage) return i + 1;
	      }
	      return i;
	    }
	  },
	  methods: {
	    clickPage: function clickPage(item) {
	      this.$dispatch('clickPage', item);
	    },
	    gotobtn: function gotobtn() {
	      var val = parseInt(this.$els.goto.value / 1);
	      this.$dispatch('gotobtn', val, this.allPage);
	    }
	  }
	};
	// </script>
	// <style lang="scss" scoped>
	// 	  .goPage {
	//             display: inline-block;
	//             input {
	//                 display: inline-block;
	//                 width: 30px;
	//                 padding: 0;
	//             }
	//             span {
	//                 padding: 0 10px;
	//             }
	//         }
	//         .bottom {
	//     		text-align: center;
	//     		ul {
	//     			vertical-align: middle;
	//     			padding-left: 30px;
	//     			margin: 0;
	//                 // margin-left: -50px;
	//     			margin-left: -175px;
	//     		}
	//
	//     	}
	// </style>
	//

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"bottom\" _v-2c78b3e2=\"\">\n\t<div style=\"float: left\" _v-2c78b3e2=\"\">当前显示<span _v-2c78b3e2=\"\"> {{searchlist.nowPage*12-11}} </span>到<span _v-2c78b3e2=\"\"> {{searchlist.nowPage==allPage ?searchlist.all :searchlist.nowPage*12}} </span>条,共<span _v-2c78b3e2=\"\"> {{searchlist.all }} </span>条记录</div>\n\t\t<ul class=\"pagination\" style=\"padding-left: 0px; \" _v-2c78b3e2=\"\">\n\t        <li :class=\"{disabled:searchlist.nowGroup<=1}\" @click=\"searchlist.nowGroup<=1?'':searchlist.nowGroup-=1\" _v-2c78b3e2=\"\"><a aria-label=\"Previous\" _v-2c78b3e2=\"\"><span aria-hidden=\"true\" _v-2c78b3e2=\"\">«</span></a></li>\n\t        <li @click=\"clickPage(item)\" :class=\"{active: searchlist.nowPage===item+1+(searchlist.nowGroup-1)*5}\" v-for=\"item in 5|showPage\" _v-2c78b3e2=\"\"><a _v-2c78b3e2=\"\">{{item+1+(searchlist.nowGroup-1)*5}} </a></li>\n\t        \n\t        <li :class=\"{disabled:searchlist.nowGroup>=group}\" @click=\"searchlist.nowGroup>=group?'':searchlist.nowGroup+=1\" _v-2c78b3e2=\"\"><a aria-label=\"Next\" _v-2c78b3e2=\"\"><span aria-hidden=\"true\" _v-2c78b3e2=\"\">»</span></a></li>\n     \t</ul>\n        <div class=\"goPage\" _v-2c78b3e2=\"\">\n            <span _v-2c78b3e2=\"\">到</span><input style=\"text-align: center\" v-el:goto=\"\" class=\"form-control\" type=\"text\" name=\"\" _v-2c78b3e2=\"\"><span _v-2c78b3e2=\"\">页</span><button type=\"button\" class=\"btn btn-primary\" @click=\"gotobtn\" _v-2c78b3e2=\"\">确定</button>\n        </div>\n     \t<slot _v-2c78b3e2=\"\">\n     \t\t\n     \t</slot>\n\t</div>\n\n";

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"box1\" _v-15af8fb4=\"\">\n\t<div class=\"top\" _v-15af8fb4=\"\">\n         <search-time :searchdate.sync=\"selectData.searchTime\" :disabled=\"isPhone\" _v-15af8fb4=\"\">\n            <span style=\"padding-left: 20px\" _v-15af8fb4=\"\">所属地区</span>\n            <select class=\"form-control\" v-model=\"selectData.area\" :disabled=\"isPhone\" _v-15af8fb4=\"\">\n                <option value=\"\" selected=\"\" _v-15af8fb4=\"\">全部</option>\n                <!-- <option value=\"云南\">云南</option>\n                <option value=\"湖南\">湖南</option>\n                <option value=\"江西\">江西</option>\n                <option value=\"贵州\">贵州</option> -->\n                 <option v-for=\"item in area\" track-by=\"$index\" _v-15af8fb4=\"\">{{item}}</option>\n            </select>\n            <span style=\"padding-left: 20px\" _v-15af8fb4=\"\">用户状态</span> \n                <select class=\"form-control \" :disabled=\"isPhone\" v-model=\"selectData.state\" _v-15af8fb4=\"\">\n                    <option value=\"\" selected=\"\" _v-15af8fb4=\"\">全部</option>\n                    <option value=\"1\" _v-15af8fb4=\"\">开户</option>\n                    <option value=\"0\" _v-15af8fb4=\"\">销户</option>\n                </select>\n            <span style=\"padding-left: 20px\" _v-15af8fb4=\"\">手机号码</span> <input v-el:phone=\"\" class=\"form-control\" type=\"text\" name=\"\" style=\"width: 115px\" @input=\"inputPhone\" placeholder=\"输入手机查询\" _v-15af8fb4=\"\">\n        </search-time>\n\t</div>\n\t<div class=\"middle\" _v-15af8fb4=\"\">\n\t\t<table class=\"table table-bordered table-hover\" _v-15af8fb4=\"\">\n        <thead _v-15af8fb4=\"\">\n          <tr style=\"background-color: #eff2f7;border-top: 1px solid #eaeefb;\" _v-15af8fb4=\"\">\n            <th _v-15af8fb4=\"\">序号</th>\n            <th _v-15af8fb4=\"\">手机号码</th>\n            <th _v-15af8fb4=\"\">用户状态</th>\n            <th _v-15af8fb4=\"\">首次开户时间</th> \n            <th _v-15af8fb4=\"\">最近开户时间</th>\n            <th _v-15af8fb4=\"\">最近销户时间</th>\n            <th _v-15af8fb4=\"\">操作类型</th>\n            <th _v-15af8fb4=\"\">操作员</th>\n            <th _v-15af8fb4=\"\">下行短信请求</th>\n            <th _v-15af8fb4=\"\">操作</th>\n          </tr>\n        </thead>\n        <tbody _v-15af8fb4=\"\">\n          <tr v-for=\"item in searchlist.list\" _v-15af8fb4=\"\">\n            <th scope=\"row\" _v-15af8fb4=\"\">{{searchlist.list.length-$index+(searchlist.nowPage-1)*12}}</th>\n            <td _v-15af8fb4=\"\">{{item.phone}}</td>\n            <td _v-15af8fb4=\"\">{{!item.type?'销户':'开户'}}</td>\n            <td _v-15af8fb4=\"\">{{item.createtime?new Date(item.createtime).format():''}}</td>\n            <td _v-15af8fb4=\"\">{{item.updatetime?new Date(item.updatetime).format():''}}</td>\n            <td _v-15af8fb4=\"\">{{item.deletetime?new Date(item.deletetime).format():''}}</td>\n            <td _v-15af8fb4=\"\">{{item.state}}</td>\n            <td _v-15af8fb4=\"\">{{item.username}}</td>\n            <td _v-15af8fb4=\"\"> <a @click=\"clickCheck(item.phone)\" _v-15af8fb4=\"\">点击查看</a></td>\n            <td _v-15af8fb4=\"\"><a @click=\"confirmCancel(item.phone)\" v-if=\"item.type\" _v-15af8fb4=\"\">销户</a><a @click=\"godetail(item.phone)\" v-else=\"\" _v-15af8fb4=\"\">查看</a></td>\n          </tr>\n        </tbody>\n      </table>\n      <load :show=\"isLoad\" _v-15af8fb4=\"\"></load>\n\t</div>\n\t<div class=\"bottom\" _v-15af8fb4=\"\">\n\t\t<!-- <div style=\"float: left\">当前显示<span> {{searchlist.nowPage*12-11}} </span>到<span> {{searchlist.nowPage==allPage ?searchlist.all :searchlist.nowPage*12}} </span>条,共<span> {{searchlist.all }} </span>条记录</div>\n\t\t<ul class=\"pagination\" >\n\t        <li :class=\"{disabled:searchlist.nowGroup===1}\" @click=\"searchlist.nowGroup-=1\"><a  aria-label=\"Previous\"><span aria-hidden=\"true\">«</span></a></li>\n\t        <li @click=\"clickPage(item)\" :class=\"{active: searchlist.nowPage===item+1+(searchlist.nowGroup-1)*5}\" v-for=\"item in 5|showPage\"><a >{{item+1+(searchlist.nowGroup-1)*5}} </a></li>\n\t        \n\t        <li :class=\"{disabled:searchlist.nowGroup===group}\" @click=\"searchlist.nowGroup+=1\"><a   aria-label=\"Next\"><span aria-hidden=\"true\">»</span></a></li>\n     \t</ul>\n        <div class=\"goPage\">\n            <span>到</span><input style=\"text-align: center\" v-el:goto class=\"form-control\" type=\"text\" name=\"\"><span>页</span><button type=\"button\" class=\"btn btn-primary\" @click=\"gotobtn\">确定</button>\n        </div>\n     \t\n\t</div> -->\n\t<page :searchlist.sync=\"searchlist\" _v-15af8fb4=\"\">\n     <div style=\"float: right\" _v-15af8fb4=\"\">\n            <button type=\"button\" class=\"btn btn-primary\" @click=\"down\" _v-15af8fb4=\"\">当前页导出为.txt</button>\n                    <a style=\"display: none\" v-el:downloadcurrent=\"\" :href=\"downLoad.current\" download=\"批次明细.txt\" _v-15af8fb4=\"\">导出当前</a>\n            <button type=\"button\" class=\"btn btn-success\" @click=\"downAll\" _v-15af8fb4=\"\">全部导出为.txt</button>\n        </div>   \n    </page>\n    <alert :show.sync=\"showAlert\" :form-data=\"checkData\" _v-15af8fb4=\"\"></alert>\n    <!-- 弹框 -->\n    <cancel :show.sync=\"confirm.isShow\" :phone=\"confirm.userPhone\" _v-15af8fb4=\"\"> </cancel>\n\n\n\n</div>\n\t\n</div>";

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(81)
	__vue_script__ = __webpack_require__(83)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\statistics.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(84)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3ec7c7d4/statistics.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(82);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3ec7c7d4&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./statistics.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-3ec7c7d4&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./statistics.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".box1[_v-3ec7c7d4] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  height: 100%;\n  padding-left: 20px;\n  padding-top: 20px;\n  padding-right: 50px;\n  box-sizing: border-box; }\n  .box1 .top[_v-3ec7c7d4] {\n    min-width: 800px; }\n    .box1 .top a[_v-3ec7c7d4] {\n      margin-left: 20px;\n      cursor: pointer; }\n    .box1 .top a.active[_v-3ec7c7d4] {\n      color: red; }\n    .box1 .top button[_v-3ec7c7d4] {\n      font-size: 12px;\n      height: 20px;\n      line-height: 8px;\n      margin-left: 100px; }\n    .box1 .top span[_v-3ec7c7d4] {\n      margin-right: 5px;\n      margin-left: 5px; }\n    .box1 .top input[_v-3ec7c7d4], .box1 .top select[_v-3ec7c7d4] {\n      display: inline-block;\n      width: 96px;\n      height: 22px; }\n    .box1 .top select[_v-3ec7c7d4] {\n      vertical-align: bottom; }\n  .box1 .middle[_v-3ec7c7d4] {\n    margin-top: 20px; }\n    .box1 .middle a[_v-3ec7c7d4] {\n      cursor: pointer; }\n    .box1 .middle th[_v-3ec7c7d4], .box1 .middle td[_v-3ec7c7d4] {\n      text-align: center; }\n", ""]);

	// exports


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _search_time = __webpack_require__(60);

	var _search_time2 = _interopRequireDefault(_search_time);

	var _page = __webpack_require__(74);

	var _page2 = _interopRequireDefault(_page);

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	var _load = __webpack_require__(55);

	var _load2 = _interopRequireDefault(_load);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<div class="box1">
	// 		<div class="top">
	// 			<!-- <span>查询时间段：</span> <span> 从 </span> <input class="form-control" type="text" name=""> <span> 到 </span> <input class="form-control" type="text" name=""> 
	// 			<button class="btn btn-default" >查询</button> -->
	//             <search-time :searchdate="selectData.searchTime">
	//                 <a @click="clickTime('本周')" :class="{active:activeTime==='本周'}">本周</a>
	//                 <a @click="clickTime('上周')" :class="{active:activeTime==='上周'}">上周</a>
	//                 <a @click="clickTime('本月')" :class="{active:activeTime==='本月'}">本月</a>
	//                 <a @click="clickTime('上月')" :class="{active:activeTime==='上月'}">上月</a>
	//                 <a @click="clickTime('所有')" :class="{active:activeTime==='所有'}">所有</a>
	//             </search-time>
	// 		</div>
	// 		<div class="middle">
	//     		<table class="table table-bordered table-hover">
	//             <thead>
	//               <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
	//                 <th>所属地区</th>
	//                 <th>起始日期</th>
	//                 <th>截止日期</th>
	//                 <th>开户数</th> 
	//                 <th>销户数</th>
	//                 <th>净增长数</th>
	//
	//               </tr>
	//             </thead>
	//             <tbody>
	//               <tr v-for = "item in searchlist.list ">
	//                 <!-- <th scope="row">1</th> -->
	//                 <td>{{item.place}}</td>
	//                 <td>{{item.beginDate}}</td>
	//                 <td>{{item.endDate}}</td>
	//                 <td>{{item.openUser}}</td>
	//                 <td>{{item.deleteUser}}</td>
	//                 <td>{{item.openUser-item.deleteUser}}</td>
	//
	//               </tr>
	//
	//             </tbody>
	//           </table>
	//           <load :show="isLoad"></load>
	// 	   </div>
	//       <!--  <div class="bottom">
	//             <page :searchlist.sync="searchlist">
	//                 <div style="float: right">
	//                     <button type="button" class="btn btn-primary">当前页导出为.txt</button>
	//                     <button type="button" class="btn btn-success">全部导出为.txt</button>
	//                 </div>
	//             </page>
	//         </div> -->
	// 	</div>
	// </template>
	// <style lang="scss" scoped>
	// 	.box1 {
	// 		display: flex;
	// 		flex-direction : column;
	// 		height: 100%;
	// 		padding-left: 20px;
	//     	padding-top: 20px;
	//     	padding-right:50px;
	//     	box-sizing: border-box;
	//     	.top {
	//             min-width: 800px;
	//     		a {
	//     			margin-left: 20px;
	//                 cursor: pointer;
	//     		}
	//             a.active {
	//                 color: red;
	//             }
	//     		button {
	//     			font-size: 12px;
	//     			height: 20px;
	//     			line-height: 8px;
	//     			margin-left: 100px;
	//     		}
	//     		span {
	//     			margin-right: 5px;
	//     			margin-left: 5px;
	//     		}
	//     		input,select {
	//     			display: inline-block;
	//     			width: 96px;
	//     			height: 22px;
	//     		}
	//     		select {
	//     			vertical-align: bottom;
	//     		}
	//     	}
	//     	.middle {
	//     		margin-top: 20px;
	//     		a {
	//     			cursor: pointer;
	//     		}
	//     		th,td {
	//     			text-align: center;
	//     		}
	//     	}
	// 	}
	// </style>
	// <script type="text/javascript">
	exports.default = {
	    components: {
	        searchTime: _search_time2.default,
	        page: _page2.default,
	        load: _load2.default
	    },
	    ready: function ready() {
	        this.switchTime(this.activeTime);
	        this.list();
	        this.$on('dateClick', function () {
	            this.activeTime = '';
	        });
	        this.$on('search', function () {
	            //点击搜索
	            this.list();
	        });
	    },

	    //  attached () {
	    //    this.switchTime(this.activeTime)
	    //     this.list()
	    // },
	    attached: function attached() {
	        if (this.$root.isRefresh.statistics) {
	            this.switchTime(this.activeTime);
	            this.list();
	            this.$root.isRefresh.statistics = false;
	        }
	    },

	    watch: {},
	    filters: {},
	    computed: {
	        getWeekStartDate: function getWeekStartDate() {
	            //本周开始时间
	            var now = this.now;
	            var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
	            return weekStartDate.format();
	        },
	        getWeekEndDate: function getWeekEndDate() {
	            //本周结束时间
	            var now = this.now;
	            var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay()));
	            return weekEndDate.format();
	        },
	        getLastWeekStart: function getLastWeekStart() {
	            //上周开始时间
	            var now = this.now;
	            var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 7);
	            return weekStartDate.format();
	        },
	        getLastWeekEnd: function getLastWeekEnd() {
	            //上周结束时间
	            var now = this.now;
	            var weekEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay() - 7));
	            return weekEndDate.format();
	        },
	        getMonthStartDate: function getMonthStartDate() {
	            //本月开始时间
	            var now = this.now;
	            var monthStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
	            return monthStartDate.format();
	        },
	        getMonthEndDate: function getMonthEndDate() {
	            //本月结束时间
	            var now = this.now;
	            var monthEndDate = new Date(now.getFullYear(), now.getMonth(), this.getMonthDays(now.getMonth()));
	            return monthEndDate.format();
	        },
	        getLastMonthStartDate: function getLastMonthStartDate() {
	            //上月开始时间
	            var now = this.now;
	            var lastMonthStartDate = new Date(now.getFullYear(), this.lastDate().getMonth(), 1);
	            return lastMonthStartDate.format();
	        },
	        getLastMonthEndDate: function getLastMonthEndDate() {
	            //上月结束时间
	            var now = this.now;
	            var lastMonthStartDate = new Date(now.getFullYear(), this.lastDate().getMonth(), this.getMonthDays(this.lastDate().getMonth()));
	            return lastMonthStartDate.format();
	        }
	    },
	    data: function data() {
	        return {
	            activeTime: '',
	            isLoad: false,
	            selectData: {
	                searchTime: {
	                    begin: new Date().format(),
	                    end: new Date(new Date().setDate(new Date().getDate() + 1)).format()
	                }
	            },
	            now: new Date(),
	            searchlist: {
	                list: [
	                    // {
	                    //     place : '',
	                    //     beginDate : '',
	                    //     endDate : '',
	                    //     openUser : '',
	                    //     deleteUser : '',
	                    // }
	                ],
	                all: 0,
	                nowPage: 1,
	                nowGroup: 1
	            }
	        };
	    },

	    methods: {
	        getMonthDays: function getMonthDays(myMonth) {
	            var now = this.now;
	            var monthStartDate = new Date(now.getFullYear(), myMonth, 1);
	            var monthEndDate = new Date(now.getFullYear(), myMonth + 1, 1);
	            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
	            return days;
	        },
	        lastDate: function lastDate() {
	            //上月日期  
	            var lastMonthDate = new Date();
	            lastMonthDate.setDate(1);
	            lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	            return lastMonthDate;
	        },
	        clickTime: function clickTime(val) {
	            //点击时间段
	            this.activeTime = val;
	            this.switchTime(val);
	            this.list();
	        },
	        switchTime: function switchTime(val) {
	            switch (val) {
	                case '本周':
	                    this.selectData.searchTime.begin = this.getWeekStartDate;
	                    this.selectData.searchTime.end = this.getWeekEndDate;
	                    break;
	                case '上周':
	                    this.selectData.searchTime.begin = this.getLastWeekStart;
	                    this.selectData.searchTime.end = this.getLastWeekEnd;
	                    break;
	                case '本月':
	                    this.selectData.searchTime.begin = this.getMonthStartDate;
	                    this.selectData.searchTime.end = this.getMonthEndDate;
	                    break;
	                case '上月':
	                    this.selectData.searchTime.begin = this.getLastMonthStartDate;
	                    this.selectData.searchTime.end = this.getLastMonthEndDate;
	                    break;
	                case '所有':
	                    this.selectData.searchTime.begin = '';
	                    this.selectData.searchTime.end = '';
	                    break;
	                // default:
	                //   n 与 case 1 和 case 2 不同时执行的代码
	            }
	        },
	        list: function list() {
	            var _this = this;

	            this.searchlist.list = [];
	            this.searchlist.all = 0;
	            this.isLoad = true;
	            _index2.default.findbyplace(this, {
	                createtime: this.selectData.searchTime.begin,
	                createtime1: this.selectData.searchTime.end,
	                type: 1
	            }, function (res) {
	                _this.searchlist.list = [];
	                _this.searchlist.all = 0;
	                _this.isLoad = false;
	                if (res && res.resMsg === "success") {
	                    // this.searchlist.list= res.repBody
	                    // this.searchlist.all = 0;
	                    for (var i = 0; i < res.repBody.length; i++) {
	                        _this.searchlist.all = res.resCode;
	                        if (res.repBody[i].place) {
	                            _this.searchlist.list.push({
	                                place: res.repBody[i].place,
	                                openUser: res.repBody[i].num1,
	                                beginDate: _this.selectData.searchTime.begin,
	                                endDate: _this.selectData.searchTime.end,
	                                deleteUser: res.repBody[i].num2
	                            });
	                        }
	                    }
	                }
	            });
	        }
	    }
	};
	// </script>

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"box1\" _v-3ec7c7d4=\"\">\n\t\t<div class=\"top\" _v-3ec7c7d4=\"\">\n\t\t\t<!-- <span>查询时间段：</span> <span> 从 </span> <input class=\"form-control\" type=\"text\" name=\"\"> <span> 到 </span> <input class=\"form-control\" type=\"text\" name=\"\"> \n\t\t\t<button class=\"btn btn-default\" >查询</button> -->\n            <search-time :searchdate=\"selectData.searchTime\" _v-3ec7c7d4=\"\">\n                <a @click=\"clickTime('本周')\" :class=\"{active:activeTime==='本周'}\" _v-3ec7c7d4=\"\">本周</a>\n                <a @click=\"clickTime('上周')\" :class=\"{active:activeTime==='上周'}\" _v-3ec7c7d4=\"\">上周</a>\n                <a @click=\"clickTime('本月')\" :class=\"{active:activeTime==='本月'}\" _v-3ec7c7d4=\"\">本月</a>\n                <a @click=\"clickTime('上月')\" :class=\"{active:activeTime==='上月'}\" _v-3ec7c7d4=\"\">上月</a>\n                <a @click=\"clickTime('所有')\" :class=\"{active:activeTime==='所有'}\" _v-3ec7c7d4=\"\">所有</a>\n            </search-time>\n\t\t</div>\n\t\t<div class=\"middle\" _v-3ec7c7d4=\"\">\n    \t\t<table class=\"table table-bordered table-hover\" _v-3ec7c7d4=\"\">\n            <thead _v-3ec7c7d4=\"\">\n              <tr style=\"background-color: #eff2f7;border-top: 1px solid #eaeefb;\" _v-3ec7c7d4=\"\">\n                <th _v-3ec7c7d4=\"\">所属地区</th>\n                <th _v-3ec7c7d4=\"\">起始日期</th>\n                <th _v-3ec7c7d4=\"\">截止日期</th>\n                <th _v-3ec7c7d4=\"\">开户数</th> \n                <th _v-3ec7c7d4=\"\">销户数</th>\n                <th _v-3ec7c7d4=\"\">净增长数</th>\n                \n              </tr>\n            </thead>\n            <tbody _v-3ec7c7d4=\"\">\n              <tr v-for=\"item in searchlist.list \" _v-3ec7c7d4=\"\">\n                <!-- <th scope=\"row\">1</th> -->\n                <td _v-3ec7c7d4=\"\">{{item.place}}</td>\n                <td _v-3ec7c7d4=\"\">{{item.beginDate}}</td>\n                <td _v-3ec7c7d4=\"\">{{item.endDate}}</td>\n                <td _v-3ec7c7d4=\"\">{{item.openUser}}</td>\n                <td _v-3ec7c7d4=\"\">{{item.deleteUser}}</td>\n                <td _v-3ec7c7d4=\"\">{{item.openUser-item.deleteUser}}</td>\n                \n              </tr>\n           \n            </tbody>\n          </table>\n          <load :show=\"isLoad\" _v-3ec7c7d4=\"\"></load>\n\t   </div>\n      <!--  <div class=\"bottom\">\n            <page :searchlist.sync=\"searchlist\">\n                <div style=\"float: right\">\n                    <button type=\"button\" class=\"btn btn-primary\">当前页导出为.txt</button>\n                    <button type=\"button\" class=\"btn btn-success\">全部导出为.txt</button>\n                </div>\n            </page>\n        </div> -->\n\t</div>\n";

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(86)
	__vue_template__ = __webpack_require__(88)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-64627796/manage.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(87);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./manage.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./manage.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n", ""]);

	// exports


/***/ },
/* 88 */
/***/ function(module, exports) {

	module.exports = "\n<router-view keep-alive></router-view>\n\n";

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(90)
	__vue_script__ = __webpack_require__(92)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\log.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(93)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-d77edf3a/log.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(91);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-d77edf3a&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./log.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-d77edf3a&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./log.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".box1[_v-d77edf3a] {\n  height: 100%;\n  padding-left: 30px;\n  padding-top: 20px;\n  padding-right: 50px;\n  box-sizing: border-box; }\n  .box1 .top[_v-d77edf3a] {\n    padding-left: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n  .box1 .middle[_v-d77edf3a] {\n    margin-top: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding-left: 20px; }\n    .box1 .middle a[_v-d77edf3a] {\n      cursor: pointer; }\n    .box1 .middle th[_v-d77edf3a], .box1 .middle td[_v-d77edf3a] {\n      text-align: center; }\n\n.bottom .pagination[_v-d77edf3a] {\n  padding-left: 0px;\n  margin-left: -50px; }\n", ""]);

	// exports


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _search_time = __webpack_require__(60);

	var _search_time2 = _interopRequireDefault(_search_time);

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	var _page = __webpack_require__(74);

	var _page2 = _interopRequireDefault(_page);

	var _load = __webpack_require__(55);

	var _load2 = _interopRequireDefault(_load);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<div class="box1">
	// 		<div class="top" style="min-width: 800px">
	//         	<search-time :searchdate="selectData.searchTime">
	//                <span style="padding-left: 20px"> 操作类型 </span>
	// 			 	<select class="form-control" v-model="selectData.type" style="width: 110px">
	// 	          		<option value="" selected="">全部</option> 	
	//                     <option value="开户">开户</option>   
	// 	          		<option value="批量开户">批量开户</option> 	
	//                     <option value="销户">销户</option>   
	// 	          		<option value="批量销户">批量销户</option> 	
	// 	        	</select>
	//             </search-time>
	// 		</div>
	// 		<div class="middle">
	// 			<table class="table table-bordered table-hover">
	// 	        <thead>
	// 	          <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
	// 	            <th>批号</th>
	// 	            <th>操作数</th>
	// 	            <th>成功数</th>
	// 	            <th>失败数</th> 
	// 	            <th>操作类型</th>
	//                 <th>操作日期</th>
	//                 <th>操作员</th>
	// 	            <th>操作结果</th>
	// 	          </tr>
	// 	        </thead>
	// 	        <tbody>
	// 	          <tr v-for ="item in searchlist.list">
	// 	            <th scope="row">{{item.opid}}</th>
	// 	            <td>{{item.usetime}}</td>
	// 	           <td>{{item.success}}</td>
	//                 <td>{{item.fail}}</td>
	//                 <td>{{item.type}}</td>
	// 	           <td>{{new Date(item.date).format('yyyy-MM-dd HH:mm:ss')}}</td>
	//                 <td>{{item.username}}</td>
	// 	            <td><a style="cursor: pointer;" v-link="{path:'/home/manage/detail1/'+item.opid}">查看明细</a></td>
	//
	// 	          </tr>
	// 	        </tbody>
	// 	      </table>
	// 		</div>
	//          <load :show="isLoad"></load>
	// 		<div class="bottom1" style="padding-left: 150px;">
	//               <page :searchlist.sync="searchlist" >
	//                 <!-- <div style="float: right">
	//                     <button type="button" class="btn btn-primary">当前页导出为.txt</button>
	//                     <button type="button" class="btn btn-success">全部导出为.txt</button>
	//                 </div> -->
	//             </page>
	//         </div>
	// 	</div>
	// </template>
	// <style lang="scss" scoped>
	// .box1 {
	// 		height: 100%;
	// 		padding-left: 30px;
	//     	padding-top: 20px;
	//     	padding-right:50px;
	//     	box-sizing: border-box;
	//     	.top {
	//     		padding-left: 20px;
	//     		display: flex;
	//     	}
	//     	.middle {
	//     		margin-top: 20px;
	//     		display: flex;
	//     		padding-left: 20px;
	//     		a {
	//     			cursor: pointer;
	//     		}
	//     		th,td {
	//     			text-align: center;
	//     		}
	//     	}
	// 	}
	// .bottom .pagination {
	//         padding-left: 0px;
	//         margin-left: -50px;
	//
	// }
	// </style>
	// <script type="text/javascript">
	exports.default = {
	    components: {
	        searchTime: _search_time2.default,
	        page: _page2.default,
	        load: _load2.default
	    },
	    attached: function attached() {
	        if (this.$root.isRefresh.log) {
	            this.log();
	            this.$root.isRefresh.log = false;
	        }
	    },
	    ready: function ready() {
	        var _this = this;

	        this.log();
	        // api.log(this,{
	        // 	      date1:this.selectData.searchTime.begin,
	        //            date2:this.selectData.searchTime.end,
	        //            size1:this.searchlist.nowPage,
	        //            size2:'12',
	        //            type:this.selectData.type ? this.selectData.type : null
	        // },res=>{
	        // 	if (res.resMsg==="success") {
	        // 		this.searchlist.list = res.repBody
	        // 		this.searchlist.all = res.resCode


	        // 	}
	        // })


	        this.$on('clickPage', function (item) {

	            this.searchlist.nowPage = item + 1 + (this.searchlist.nowGroup - 1) * 5;
	            this.searchlist.list = [];
	            this.log();
	        });

	        this.$on('gotobtn', function (val, allpage) {
	            //点击分页确定按钮时触发
	            if (val == _this.searchlist.nowPage) return window.alert('已经是当前页');
	            if (val && !isNaN(val)) {
	                if (val > 0 && val <= allpage) {
	                    _this.searchlist.nowPage = val;
	                    _this.searchlist.list = [];
	                    _this.log();
	                    return;
	                }
	            }
	            window.alert('不在页数范围内');
	        });

	        this.$on('search', function () {
	            //点击搜索
	            console.log('查询了');
	            this.log();
	        });
	    },
	    data: function data() {
	        return {
	            isLoad: false,
	            searchlist: {
	                list: [],
	                all: 0,
	                nowPage: 1,
	                nowGroup: 1
	            },
	            phoneOpen: {
	                isShow: false,
	                res: ''
	            },
	            selectData: {
	                searchTime: {
	                    begin: new Date().format(),
	                    end: new Date(new Date().setDate(new Date().getDate() + 1)).format()
	                },
	                type: null
	            }
	        };
	    },

	    methods: {
	        log: function log() {
	            var _this2 = this;

	            this.isLoad = true;
	            this.searchlist.list = [];
	            this.searchlist.all = 0;
	            _index2.default.log(this, {
	                date1: this.selectData.searchTime.begin,
	                date2: this.selectData.searchTime.end,
	                size1: this.searchlist.nowPage,
	                size2: '12',
	                type: this.selectData.type ? this.selectData.type : null
	            }, function (res) {
	                _this2.searchlist.list = [];
	                _this2.searchlist.all = 0;
	                _this2.isLoad = false;
	                if (res.resMsg === "success") {
	                    _this2.searchlist.list = res.repBody;
	                    _this2.searchlist.all = res.resCode;
	                } else {
	                    window.alert(res.resMsg);
	                }
	            });
	        }
	    }
	};
	// </script>

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"box1\" _v-d77edf3a=\"\">\n\t\t<div class=\"top\" style=\"min-width: 800px\" _v-d77edf3a=\"\">\n        \t<search-time :searchdate=\"selectData.searchTime\" _v-d77edf3a=\"\">\n               <span style=\"padding-left: 20px\" _v-d77edf3a=\"\"> 操作类型 </span>\n\t\t\t \t<select class=\"form-control\" v-model=\"selectData.type\" style=\"width: 110px\" _v-d77edf3a=\"\">\n\t          \t\t<option value=\"\" selected=\"\" _v-d77edf3a=\"\">全部</option> \t\n                    <option value=\"开户\" _v-d77edf3a=\"\">开户</option>   \n\t          \t\t<option value=\"批量开户\" _v-d77edf3a=\"\">批量开户</option> \t\n                    <option value=\"销户\" _v-d77edf3a=\"\">销户</option>   \n\t          \t\t<option value=\"批量销户\" _v-d77edf3a=\"\">批量销户</option> \t\n\t        \t</select>\n            </search-time>\n\t\t</div>\n\t\t<div class=\"middle\" _v-d77edf3a=\"\">\n\t\t\t<table class=\"table table-bordered table-hover\" _v-d77edf3a=\"\">\n\t        <thead _v-d77edf3a=\"\">\n\t          <tr style=\"background-color: #eff2f7;border-top: 1px solid #eaeefb;\" _v-d77edf3a=\"\">\n\t            <th _v-d77edf3a=\"\">批号</th>\n\t            <th _v-d77edf3a=\"\">操作数</th>\n\t            <th _v-d77edf3a=\"\">成功数</th>\n\t            <th _v-d77edf3a=\"\">失败数</th> \n\t            <th _v-d77edf3a=\"\">操作类型</th>\n                <th _v-d77edf3a=\"\">操作日期</th>\n                <th _v-d77edf3a=\"\">操作员</th>\n\t            <th _v-d77edf3a=\"\">操作结果</th>\n\t          </tr>\n\t        </thead>\n\t        <tbody _v-d77edf3a=\"\">\n\t          <tr v-for=\"item in searchlist.list\" _v-d77edf3a=\"\">\n\t            <th scope=\"row\" _v-d77edf3a=\"\">{{item.opid}}</th>\n\t            <td _v-d77edf3a=\"\">{{item.usetime}}</td>\n\t           <td _v-d77edf3a=\"\">{{item.success}}</td>\n                <td _v-d77edf3a=\"\">{{item.fail}}</td>\n                <td _v-d77edf3a=\"\">{{item.type}}</td>\n\t           <td _v-d77edf3a=\"\">{{new Date(item.date).format('yyyy-MM-dd HH:mm:ss')}}</td>\n                <td _v-d77edf3a=\"\">{{item.username}}</td>\n\t            <td _v-d77edf3a=\"\"><a style=\"cursor: pointer;\" v-link=\"{path:'/home/manage/detail1/'+item.opid}\" _v-d77edf3a=\"\">查看明细</a></td>\n\t            \n\t          </tr>\n\t        </tbody>\n\t      </table>\n\t\t</div>\n         <load :show=\"isLoad\" _v-d77edf3a=\"\"></load>\n\t\t<div class=\"bottom1\" style=\"padding-left: 150px;\" _v-d77edf3a=\"\">\n              <page :searchlist.sync=\"searchlist\" _v-d77edf3a=\"\">\n                <!-- <div style=\"float: right\">\n                    <button type=\"button\" class=\"btn btn-primary\">当前页导出为.txt</button>\n                    <button type=\"button\" class=\"btn btn-success\">全部导出为.txt</button>\n                </div> -->\n            </page>\n        </div>\n\t</div>\n";

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(95)
	__vue_script__ = __webpack_require__(97)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\detail.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(98)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-dc1ac6fc/detail.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(96);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-dc1ac6fc&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./detail.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-dc1ac6fc&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./detail.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".box1[_v-dc1ac6fc] {\n  height: 100%;\n  padding-left: 30px;\n  padding-top: 20px;\n  padding-right: 50px;\n  box-sizing: border-box; }\n  .box1 .state[_v-dc1ac6fc] {\n    display: inline-block;\n    width: 80px;\n    margin-left: 10px; }\n  .box1 .top[_v-dc1ac6fc] {\n    padding-left: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    position: relative; }\n    .box1 .top button.goback[_v-dc1ac6fc] {\n      position: absolute;\n      right: 10px; }\n  .box1 .middle[_v-dc1ac6fc] {\n    margin-top: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding-left: 20px; }\n    .box1 .middle a[_v-dc1ac6fc] {\n      cursor: pointer; }\n    .box1 .middle th[_v-dc1ac6fc], .box1 .middle td[_v-dc1ac6fc] {\n      text-align: center; }\n", ""]);

	// exports


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _search_time = __webpack_require__(60);

	var _search_time2 = _interopRequireDefault(_search_time);

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	var _page = __webpack_require__(74);

	var _page2 = _interopRequireDefault(_page);

	var _load = __webpack_require__(55);

	var _load2 = _interopRequireDefault(_load);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<div class="box1">
	// 		<div class="top">
	//             <span style="padding-left: 20px;line-height: 34px; margin-right: 10px;">手机号码 :</span> <input v-el:phone class="form-control" v-model="phone"  type="text" name="" style="width: 115px" placeholder="手机查询">
	//              <!-- <span style="padding-left: 30px;line-height: 34px">操作结果 :</span> 
	//                 <select class="form-control state"  v-model="state">
	//                     <option value="" selected>全部</option>
	//                     <option value="1">成功</option>
	//                     <option value="0">失败</option>
	//                 </select> -->
	//             <button class="btn btn-primary goback"  v-link='{path : "/home/message"}'>返回</button>
	// 		</div>
	// 		<div class="middle">
	// 			<table class="table table-bordered table-hover">
	// 	        <thead>
	// 	          <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
	// 	            <th>序号</th>
	// 	            <th>手机号</th>
	// 	            <th>操作类型</th>
	// 	            <th>操作日期</th> 
	// 	            <th>操作结果</th>
	// 	            <th>操作人</th>
	// 	          </tr>
	// 	        </thead>
	// 	        <tbody>
	// 	          <tr v-for ="item in searchlist.list">
	// 	             <th scope="row">{{searchlist.list.length-$index+(searchlist.nowPage-1)*12}}</th>
	// 	            <td>{{item.phone}}</td>
	// 	           <td>{{item.type}}</td>
	// 	           <td>{{item.usetime ? new Date(item.usetime).format() : ''}}</td>
	// 	            <td>{{item.result}}</td>
	// 	            <td>{{item.username}}</td>
	//
	// 	          </tr>
	// 	        </tbody>
	// 	      </table>
	//
	// 		</div>
	//         <load :show="isLoad"></load>
	// 		<div class="bottom1" style="padding-left: 150px;">
	//               <page :searchlist.sync="searchlist">
	//                 <div style="float: right">
	//                    <!--  <button type="button" class="btn btn-primary">当前页导出为.txt</button>
	//                     <button type="button" class="btn btn-success">全部导出为.txt</button> -->
	//                 </div>
	//             </page>
	//         </div>
	// 	</div>
	// </template>
	// <style lang="scss" scoped>
	// .box1 {
	// 		height: 100%;
	// 		padding-left: 30px;
	//     	padding-top: 20px;
	//     	padding-right:50px;
	//     	box-sizing: border-box;
	//         .state {
	//                 display: inline-block;
	//                 width: 80px;
	//                 margin-left: 10px;
	//         }
	//     	.top {
	//     		padding-left: 20px;
	//     		display: flex;
	//             position: relative;
	//             button.goback {
	//                 position: absolute;
	//                 right: 10px;
	//             }
	//     	}
	//     	.middle {
	//     		margin-top: 20px;
	//     		display: flex;
	//     		padding-left: 20px;
	//     		a {
	//     			cursor: pointer;
	//     		}
	//     		th,td {
	//     			text-align: center;
	//     		}
	//     	}
	// 	}
	//
	// </style>
	// <script type="text/javascript">
	exports.default = {
	    components: {
	        searchTime: _search_time2.default,
	        page: _page2.default,
	        load: _load2.default
	    },

	    ready: function ready() {
	        var _this = this;

	        this.phone = this.$route.params.phone;
	        // this.pid = this.$route.params.phone;
	        this.search();

	        this.$on('clickPage', function (item) {

	            this.searchlist.nowPage = item + 1 + (this.searchlist.nowGroup - 1) * 5;
	            this.searchlist.list = [];
	            this.isLoad = true;
	            this.search();
	        });
	        this.$on('changeNumber', function (number) {
	            console.log('监听到');
	            _this.phone = number;
	        });
	        this.$on('gotobtn', function (val, allpage) {
	            //点击分页确定按钮时触发
	            console.log('点击确定');
	            if (val == _this.searchlist.nowPage) return window.alert('已经是当前页');
	            if (val && !isNaN(val)) {
	                if (val > 0 && val <= allpage) {
	                    _this.searchlist.nowPage = val;
	                    _this.searchlist.list = [];
	                    _this.isLoad = true;
	                    _this.search();
	                    return;
	                }
	            }
	            window.alert('不在页数范围内');
	        });
	    },
	    attached: function attached() {
	        this.phone = this.$route.params.phone;
	        this.search();
	    },
	    data: function data() {
	        return {
	            phone: '',
	            state: '',
	            pid: '',
	            isLoad: false,
	            searchlist: {
	                list: [],
	                all: 0,
	                nowPage: 1,
	                nowGroup: 1
	            }

	        };
	    },

	    methods: {
	        search: function search() {
	            var _this2 = this;

	            this.searchlist.list = [];
	            this.searchlist.all = 0;
	            this.isLoad = true;
	            _index2.default.findbyphone(this, {
	                phone: this.phone ? this.phone : null,

	                start: this.searchlist.nowPage, //必填，页数
	                end: 12 }, function (res) {
	                _this2.searchlist.list = [];
	                _this2.searchlist.all = 0;
	                _this2.isLoad = false;
	                if (res.resMsg === 'success') {
	                    _this2.searchlist.list = res.repBody;
	                    _this2.searchlist.all = res.resCode;
	                } else {
	                    window.alert('请求异常');
	                }
	            });
	        }
	    }
	};
	// </script>

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"box1\" _v-dc1ac6fc=\"\">\n\t\t<div class=\"top\" _v-dc1ac6fc=\"\">\n            <span style=\"padding-left: 20px;line-height: 34px; margin-right: 10px;\" _v-dc1ac6fc=\"\">手机号码 :</span> <input v-el:phone=\"\" class=\"form-control\" v-model=\"phone\" type=\"text\" name=\"\" style=\"width: 115px\" placeholder=\"手机查询\" _v-dc1ac6fc=\"\">\n             <!-- <span style=\"padding-left: 30px;line-height: 34px\">操作结果 :</span> \n                <select class=\"form-control state\"  v-model=\"state\">\n                    <option value=\"\" selected>全部</option>\n                    <option value=\"1\">成功</option>\n                    <option value=\"0\">失败</option>\n                </select> -->\n            <button class=\"btn btn-primary goback\" v-link=\"{path : &quot;/home/message&quot;}\" _v-dc1ac6fc=\"\">返回</button>\n\t\t</div>\n\t\t<div class=\"middle\" _v-dc1ac6fc=\"\">\n\t\t\t<table class=\"table table-bordered table-hover\" _v-dc1ac6fc=\"\">\n\t        <thead _v-dc1ac6fc=\"\">\n\t          <tr style=\"background-color: #eff2f7;border-top: 1px solid #eaeefb;\" _v-dc1ac6fc=\"\">\n\t            <th _v-dc1ac6fc=\"\">序号</th>\n\t            <th _v-dc1ac6fc=\"\">手机号</th>\n\t            <th _v-dc1ac6fc=\"\">操作类型</th>\n\t            <th _v-dc1ac6fc=\"\">操作日期</th> \n\t            <th _v-dc1ac6fc=\"\">操作结果</th>\n\t            <th _v-dc1ac6fc=\"\">操作人</th>\n\t          </tr>\n\t        </thead>\n\t        <tbody _v-dc1ac6fc=\"\">\n\t          <tr v-for=\"item in searchlist.list\" _v-dc1ac6fc=\"\">\n\t             <th scope=\"row\" _v-dc1ac6fc=\"\">{{searchlist.list.length-$index+(searchlist.nowPage-1)*12}}</th>\n\t            <td _v-dc1ac6fc=\"\">{{item.phone}}</td>\n\t           <td _v-dc1ac6fc=\"\">{{item.type}}</td>\n\t           <td _v-dc1ac6fc=\"\">{{item.usetime ? new Date(item.usetime).format() : ''}}</td>\n\t            <td _v-dc1ac6fc=\"\">{{item.result}}</td>\n\t            <td _v-dc1ac6fc=\"\">{{item.username}}</td>\n\t            \n\t          </tr>\n\t        </tbody>\n\t      </table>\n\t      \n\t\t</div>\n        <load :show=\"isLoad\" _v-dc1ac6fc=\"\"></load>\n\t\t<div class=\"bottom1\" style=\"padding-left: 150px;\" _v-dc1ac6fc=\"\">\n              <page :searchlist.sync=\"searchlist\" _v-dc1ac6fc=\"\">\n                <div style=\"float: right\" _v-dc1ac6fc=\"\">\n                   <!--  <button type=\"button\" class=\"btn btn-primary\">当前页导出为.txt</button>\n                    <button type=\"button\" class=\"btn btn-success\">全部导出为.txt</button> -->\n                </div>\n            </page>\n        </div>\n\t</div>\n";

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(100)
	__vue_script__ = __webpack_require__(102)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\detail2.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(103)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-a70ec5c0/detail2.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(101);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a70ec5c0&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./detail2.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a70ec5c0&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./detail2.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".box1[_v-a70ec5c0] {\n  height: 100%;\n  padding-left: 30px;\n  padding-top: 20px;\n  padding-right: 50px;\n  box-sizing: border-box; }\n  .box1 .state[_v-a70ec5c0] {\n    display: inline-block;\n    width: 80px;\n    margin-left: 10px; }\n  .box1 .top[_v-a70ec5c0] {\n    padding-left: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    position: relative; }\n    .box1 .top button.goback[_v-a70ec5c0] {\n      position: absolute;\n      right: 10px; }\n  .box1 .middle[_v-a70ec5c0] {\n    margin-top: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding-left: 20px; }\n    .box1 .middle a[_v-a70ec5c0] {\n      cursor: pointer; }\n    .box1 .middle th[_v-a70ec5c0], .box1 .middle td[_v-a70ec5c0] {\n      text-align: center; }\n", ""]);

	// exports


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _search_time = __webpack_require__(60);

	var _search_time2 = _interopRequireDefault(_search_time);

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	var _page = __webpack_require__(74);

	var _page2 = _interopRequireDefault(_page);

	var _load = __webpack_require__(55);

	var _load2 = _interopRequireDefault(_load);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<div class="box1">
	// 		<div class="top">
	//             <span style="padding-left: 20px;line-height: 34px; margin-right: 10px;">手机号码 :</span> <input v-el:phone class="form-control" v-model="phone"  type="text" name="" style="width: 115px" placeholder="手机查询">
	//              <span style="padding-left: 30px;line-height: 34px">操作结果 :</span> 
	//                 <select class="form-control state"  v-model="state" >
	//                     <option value="" selected>全部</option>
	//                     <option value="成功">成功</option>
	//                     <option value="失败">失败</option>
	//                 </select>
	//                 <button class="btn btn-primary" style="margin-left: 50px" @click="search">查询</button>
	//             <button class="btn btn-primary goback"  v-link='{path : "/home/spending"}'>返回</button>
	// 		</div>
	// 		<div class="middle">
	// 			<table class="table table-bordered table-hover">
	// 	        <thead>
	// 	          <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
	// 	            <th>序号</th>
	// 	            <th>手机号</th>
	// 	            <th>操作类型</th>
	// 	            <th>操作日期</th> 
	// 	            <th>操作结果</th>
	// 	            <th>操作人</th>
	// 	          </tr>
	// 	        </thead>
	// 	        <tbody>
	// 	          <tr v-for ="item in searchlist.list">
	// 	             <th scope="row">{{searchlist.list.length-$index+(searchlist.nowPage-1)*12}}</th>
	// 	            <td>{{item.phone}}</td>
	// 	           <td>{{item.type}}</td>
	// 	           <td>{{item.usetime ? new Date(item.usetime).format() : ''}}</td>
	// 	            <td>{{item.result}}</td>
	//                 <td>{{item.username}}</td>
	//
	// 	          </tr>
	// 	        </tbody>
	// 	      </table>
	//
	// 		</div>
	//         <load :show="isLoad"></load>
	// 		<div class="bottom1" style="padding-left: 150px;">
	//               <page :searchlist.sync="searchlist">
	//                 <div style="float: right">
	//                 <!-- v-link="{path : basePath}" -->
	//                     <button type="button" class="btn btn-primary" @click="downLoadCurrent">当前页导出为.txt</button>
	//                     <a style="display: none" v-el:downLoadCurrent :href="downLoad.current" download="批次明细.txt" >导出当前</a>
	//                     <button type="button" class="btn btn-success" @click="downAll">全部导出为.txt</button>
	//
	//                 </div>
	//             </page>
	//         </div>
	// 	</div>
	// </template>
	// <style lang="scss" scoped>
	// .box1 {
	// 		height: 100%;
	// 		padding-left: 30px;
	//     	padding-top: 20px;
	//     	padding-right:50px;
	//     	box-sizing: border-box;
	//         .state {
	//                 display: inline-block;
	//                 width: 80px;
	//                 margin-left: 10px;
	//         }
	//     	.top {
	//     		padding-left: 20px;
	//     		display: flex;
	//             position: relative;
	//             button.goback {
	//                 position: absolute;
	//                 right: 10px;
	//             }
	//     	}
	//     	.middle {
	//     		margin-top: 20px;
	//     		display: flex;
	//     		padding-left: 20px;
	//     		a {
	//     			cursor: pointer;
	//     		}
	//     		th,td {
	//     			text-align: center;
	//     		}
	//     	}
	// 	}
	//
	// </style>
	// <script type="text/javascript">
	exports.default = {
	    components: {
	        searchTime: _search_time2.default,
	        page: _page2.default,
	        load: _load2.default
	    },
	    attached: function attached() {
	        this.pid = this.$route.params.phone;
	        this.search();
	    },

	    // activate: function (done) { //执行这个参数时，才会切换组件
	    //   var self = this;
	    //   $.get("/test", function (data) { //这个ajax我手动在服务器端设置延迟为2000ms，因此需要等待2秒后才会切换
	    //   self.hello = data;
	    //   done(); //ajax执行成功，切换组件
	    //   })
	    //  }
	    ready: function ready() {
	        var _this2 = this;

	        // this.phone = this.$route.params.phone;
	        this.pid = this.$route.params.phone;
	        this.search();

	        this.$on('clickPage', function (item) {
	            this.searchlist.nowPage = item + 1 + (this.searchlist.nowGroup - 1) * 5;
	            this.searchlist.list = [];

	            this.search();
	        });

	        this.$on('gotobtn', function (val, allpage) {
	            //点击分页确定按钮时触发
	            if (val == _this2.searchlist.nowPage) return window.alert('已经是当前页');
	            if (val && !isNaN(val)) {
	                if (val > 0 && val <= allpage) {
	                    _this2.searchlist.nowPage = val;
	                    _this2.searchlist.list = [];

	                    _this2.search();
	                    return;
	                }
	            }
	            window.alert('不在页数范围内');
	        });
	    },
	    data: function data() {
	        return {
	            phone: '',
	            pid: '',
	            state: '',
	            downLoad: {
	                current: '',
	                all: ''
	            },
	            isLoad: false,
	            searchlist: {
	                list: [],
	                all: 0,
	                nowPage: 1,
	                nowGroup: 1
	            }

	        };
	    },

	    methods: {
	        search: function search() {
	            var _this3 = this;

	            this.isLoad = true;
	            this.searchlist.list = [];
	            this.searchlist.all = 0;
	            _index2.default.findbyopid(this, {
	                opid: this.pid ? this.pid : null,
	                phone: this.phone ? this.phone : null,
	                start: this.searchlist.nowPage, //必填，页数
	                end: 12, //必填，条数
	                result: this.state ? this.state : null
	            }, function (res) {
	                _this3.isLoad = false;
	                _this3.searchlist.list = [];
	                _this3.searchlist.all = 0;
	                if (res.resMsg === 'success') {
	                    _this3.searchlist.list = res.repBody;
	                    _this3.searchlist.all = res.resCode;
	                } else {
	                    window.alert('请求异常');
	                }
	            });
	        },

	        // changeSelect () {
	        //     this.search()
	        // },
	        downAll: function downAll() {
	            var _this4 = this;

	            this.$http.get(basePath + 'dateil/down', {
	                opid: this.pid ? this.pid : 0,
	                phone: this.phone ? this.phone : 0,
	                // start : this.searchlist.nowPage,
	                start: 0,
	                end: 0

	            }).then(function (res) {
	                if (res && res.ok == true) {
	                    var temp = basePath + JSON.parse(res.response).repBody.replace(/\\/g, "/");
	                    _this4.downLoad.current = temp.replace(/jyh/g, "");
	                    var _this = _this4;
	                    window.setTimeout(function () {
	                        console.log(_this.downLoad.current);
	                        _this.$els.downloadcurrent.click();
	                    }, 100);
	                }
	            }, function (res) {
	                window.alert('下载失败');
	            });
	        },
	        downLoadCurrent: function downLoadCurrent() {
	            var _this5 = this;

	            // api.down1(this,{
	            //        opid: this.phone ? this.phone : null,
	            //         start : this.searchlist.nowPage,
	            //         end : 12,
	            // },res=>{
	            //     console.log(res)
	            // })
	            this.$http.get(basePath + 'dateil/down', {
	                opid: this.pid ? this.pid : 0,
	                phone: this.phone ? this.phone : 0,
	                start: this.searchlist.nowPage,
	                end: 12

	            }).then(function (res) {
	                console.log(res);

	                if (res && res.ok == true) {
	                    var temp = basePath + JSON.parse(res.response).repBody.replace(/\\/g, "/");
	                    _this5.downLoad.current = temp.replace(/jyh/g, "");
	                    // this.downLoad.current =basePath + temp.replace(/\\/g, "/")

	                    var _this = _this5;
	                    window.setTimeout(function () {
	                        console.log(_this.downLoad.current);
	                        _this.$els.downloadcurrent.click();
	                    }, 100);
	                }
	            }, function (res) {
	                window.alert('下载失败');
	            });
	        }
	    }
	};
	// </script>

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"box1\" _v-a70ec5c0=\"\">\n\t\t<div class=\"top\" _v-a70ec5c0=\"\">\n            <span style=\"padding-left: 20px;line-height: 34px; margin-right: 10px;\" _v-a70ec5c0=\"\">手机号码 :</span> <input v-el:phone=\"\" class=\"form-control\" v-model=\"phone\" type=\"text\" name=\"\" style=\"width: 115px\" placeholder=\"手机查询\" _v-a70ec5c0=\"\">\n             <span style=\"padding-left: 30px;line-height: 34px\" _v-a70ec5c0=\"\">操作结果 :</span> \n                <select class=\"form-control state\" v-model=\"state\" _v-a70ec5c0=\"\">\n                    <option value=\"\" selected=\"\" _v-a70ec5c0=\"\">全部</option>\n                    <option value=\"成功\" _v-a70ec5c0=\"\">成功</option>\n                    <option value=\"失败\" _v-a70ec5c0=\"\">失败</option>\n                </select>\n                <button class=\"btn btn-primary\" style=\"margin-left: 50px\" @click=\"search\" _v-a70ec5c0=\"\">查询</button>\n            <button class=\"btn btn-primary goback\" v-link=\"{path : &quot;/home/spending&quot;}\" _v-a70ec5c0=\"\">返回</button>\n\t\t</div>\n\t\t<div class=\"middle\" _v-a70ec5c0=\"\">\n\t\t\t<table class=\"table table-bordered table-hover\" _v-a70ec5c0=\"\">\n\t        <thead _v-a70ec5c0=\"\">\n\t          <tr style=\"background-color: #eff2f7;border-top: 1px solid #eaeefb;\" _v-a70ec5c0=\"\">\n\t            <th _v-a70ec5c0=\"\">序号</th>\n\t            <th _v-a70ec5c0=\"\">手机号</th>\n\t            <th _v-a70ec5c0=\"\">操作类型</th>\n\t            <th _v-a70ec5c0=\"\">操作日期</th> \n\t            <th _v-a70ec5c0=\"\">操作结果</th>\n\t            <th _v-a70ec5c0=\"\">操作人</th>\n\t          </tr>\n\t        </thead>\n\t        <tbody _v-a70ec5c0=\"\">\n\t          <tr v-for=\"item in searchlist.list\" _v-a70ec5c0=\"\">\n\t             <th scope=\"row\" _v-a70ec5c0=\"\">{{searchlist.list.length-$index+(searchlist.nowPage-1)*12}}</th>\n\t            <td _v-a70ec5c0=\"\">{{item.phone}}</td>\n\t           <td _v-a70ec5c0=\"\">{{item.type}}</td>\n\t           <td _v-a70ec5c0=\"\">{{item.usetime ? new Date(item.usetime).format() : ''}}</td>\n\t            <td _v-a70ec5c0=\"\">{{item.result}}</td>\n                <td _v-a70ec5c0=\"\">{{item.username}}</td>\n\t            \n\t          </tr>\n\t        </tbody>\n\t      </table>\n\t      \n\t\t</div>\n        <load :show=\"isLoad\" _v-a70ec5c0=\"\"></load>\n\t\t<div class=\"bottom1\" style=\"padding-left: 150px;\" _v-a70ec5c0=\"\">\n              <page :searchlist.sync=\"searchlist\" _v-a70ec5c0=\"\">\n                <div style=\"float: right\" _v-a70ec5c0=\"\">\n                <!-- v-link=\"{path : basePath}\" -->\n                    <button type=\"button\" class=\"btn btn-primary\" @click=\"downLoadCurrent\" _v-a70ec5c0=\"\">当前页导出为.txt</button>\n                    <a style=\"display: none\" v-el:downloadcurrent=\"\" :href=\"downLoad.current\" download=\"批次明细.txt\" _v-a70ec5c0=\"\">导出当前</a>\n                    <button type=\"button\" class=\"btn btn-success\" @click=\"downAll\" _v-a70ec5c0=\"\">全部导出为.txt</button>\n\n                </div>\n            </page>\n        </div>\n\t</div>\n";

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(105)
	__vue_script__ = __webpack_require__(107)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\detail1.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(108)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-a72af4c2/detail1.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(106);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a72af4c2&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./detail1.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a72af4c2&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./detail1.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".box1[_v-a72af4c2] {\n  height: 100%;\n  padding-left: 30px;\n  padding-top: 20px;\n  padding-right: 50px;\n  box-sizing: border-box; }\n  .box1 .state[_v-a72af4c2] {\n    display: inline-block;\n    width: 80px;\n    margin-left: 10px; }\n  .box1 .top[_v-a72af4c2] {\n    padding-left: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    position: relative; }\n    .box1 .top button.goback[_v-a72af4c2] {\n      position: absolute;\n      right: 10px; }\n  .box1 .middle[_v-a72af4c2] {\n    margin-top: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding-left: 20px; }\n    .box1 .middle a[_v-a72af4c2] {\n      cursor: pointer; }\n    .box1 .middle th[_v-a72af4c2], .box1 .middle td[_v-a72af4c2] {\n      text-align: center; }\n", ""]);

	// exports


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _search_time = __webpack_require__(60);

	var _search_time2 = _interopRequireDefault(_search_time);

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	var _page = __webpack_require__(74);

	var _page2 = _interopRequireDefault(_page);

	var _load = __webpack_require__(55);

	var _load2 = _interopRequireDefault(_load);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// 	<div class="box1">
	// 		<div class="top">
	//             <span style="padding-left: 20px;line-height: 34px; margin-right: 10px;">手机号码 :</span> <input v-el:phone class="form-control" v-model="phone"  type="text" name="" style="width: 115px" placeholder="手机查询">
	//              <span style="padding-left: 30px;line-height: 34px">操作结果 :</span> 
	//                 <select class="form-control state"  v-model="state" >
	//                     <option value="" selected>全部</option>
	//                     <option value="成功">成功</option>
	//                     <option value="失败">失败</option>
	//                 </select>
	//                 <button class="btn btn-primary" style="margin-left: 50px" @click="search">查询</button>
	//             <button class="btn btn-primary goback"  v-link='{path : "/home/manage/log"}'>返回</button>
	// 		</div>
	// 		<div class="middle">
	// 			<table class="table table-bordered table-hover">
	// 	        <thead>
	// 	          <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
	// 	            <th>序号</th>
	// 	            <th>手机号</th>
	// 	            <th>操作类型</th>
	// 	            <th>操作日期</th> 
	// 	            <th>操作结果</th>
	// 	            <th>操作人</th>
	// 	          </tr>
	// 	        </thead>
	// 	        <tbody>
	// 	          <tr v-for ="item in searchlist.list">
	// 	             <th scope="row">{{searchlist.list.length-$index+(searchlist.nowPage-1)*12}}</th>
	// 	            <td>{{item.phone}}</td>
	// 	           <td>{{item.type}}</td>
	// 	           <td>{{item.usetime ? new Date(item.usetime).format() : ''}}</td>
	// 	            <td>{{item.result}}</td>
	// 	            <td>{{item.username}}</td>
	//
	// 	          </tr>
	// 	        </tbody>
	// 	      </table>
	//
	// 		</div>
	//         <load :show="isLoad"></load>
	// 		<div class="bottom1" style="padding-left: 150px;">
	//               <page :searchlist.sync="searchlist">
	//                 <div style="float: right">
	//                 <!-- v-link="{path : basePath}" -->
	//                     <button type="button" class="btn btn-primary" @click="downLoadCurrent">当前页导出为.txt</button>
	//                     <a style="display: none" v-el:downLoadCurrent :href="downLoad.current" download="批次明细.txt" >导出当前</a>
	//                     <button type="button" class="btn btn-success" @click="downAll">全部导出为.txt</button>
	//
	//                 </div>
	//             </page>
	//         </div>
	// 	</div>
	// </template>
	// <style lang="scss" scoped>
	// .box1 {
	// 		height: 100%;
	// 		padding-left: 30px;
	//     	padding-top: 20px;
	//     	padding-right:50px;
	//     	box-sizing: border-box;
	//         .state {
	//                 display: inline-block;
	//                 width: 80px;
	//                 margin-left: 10px;
	//         }
	//     	.top {
	//     		padding-left: 20px;
	//     		display: flex;
	//             position: relative;
	//             button.goback {
	//                 position: absolute;
	//                 right: 10px;
	//             }
	//     	}
	//     	.middle {
	//     		margin-top: 20px;
	//     		display: flex;
	//     		padding-left: 20px;
	//     		a {
	//     			cursor: pointer;
	//     		}
	//     		th,td {
	//     			text-align: center;
	//     		}
	//     	}
	// 	}
	//
	// </style>
	// <script type="text/javascript">
	exports.default = {
	    components: {
	        searchTime: _search_time2.default,
	        page: _page2.default,
	        load: _load2.default
	    },
	    attached: function attached() {
	        this.pid = this.$route.params.phone;
	        this.search();
	    },

	    // activate: function (done) { //执行这个参数时，才会切换组件
	    //   var self = this;
	    //   $.get("/test", function (data) { //这个ajax我手动在服务器端设置延迟为2000ms，因此需要等待2秒后才会切换
	    //   self.hello = data;
	    //   done(); //ajax执行成功，切换组件
	    //   })
	    //  }
	    ready: function ready() {
	        var _this2 = this;

	        // this.phone = this.$route.params.phone;
	        this.pid = this.$route.params.phone;
	        this.search();

	        this.$on('clickPage', function (item) {
	            this.searchlist.nowPage = item + 1 + (this.searchlist.nowGroup - 1) * 5;
	            this.searchlist.list = [];

	            this.search();
	        });

	        this.$on('gotobtn', function (val, allpage) {
	            //点击分页确定按钮时触发
	            if (val == _this2.searchlist.nowPage) return window.alert('已经是当前页');
	            if (val && !isNaN(val)) {
	                if (val > 0 && val <= allpage) {
	                    _this2.searchlist.nowPage = val;
	                    _this2.searchlist.list = [];

	                    _this2.search();
	                    return;
	                }
	            }
	            window.alert('不在页数范围内');
	        });
	    },
	    data: function data() {
	        return {
	            phone: '',
	            pid: '',
	            state: '',
	            downLoad: {
	                current: '',
	                all: ''
	            },
	            isLoad: false,
	            searchlist: {
	                list: [],
	                all: 0,
	                nowPage: 1,
	                nowGroup: 1
	            }

	        };
	    },

	    methods: {
	        search: function search() {
	            var _this3 = this;

	            this.isLoad = true;
	            this.searchlist.list = [];
	            this.searchlist.all = 0;
	            _index2.default.findbyopid(this, {
	                opid: this.pid ? this.pid : null,
	                phone: this.phone ? this.phone : null,
	                start: this.searchlist.nowPage, //必填，页数
	                end: 12, //必填，条数
	                result: this.state ? this.state : null
	            }, function (res) {
	                _this3.isLoad = false;
	                _this3.searchlist.list = [];
	                _this3.searchlist.all = 0;
	                if (res.resMsg === 'success') {
	                    _this3.searchlist.list = res.repBody;
	                    _this3.searchlist.all = res.resCode;
	                } else {
	                    window.alert('请求异常');
	                }
	            });
	        },

	        // changeSelect () {
	        //     this.search()
	        // },
	        downAll: function downAll() {
	            var _this4 = this;

	            this.$http.get(basePath + 'dateil/down', {
	                opid: this.pid ? this.pid : 0,
	                phone: this.phone ? this.phone : 0,
	                // start : this.searchlist.nowPage,
	                start: 0,
	                end: 0

	            }).then(function (res) {
	                if (res && res.ok == true) {
	                    var temp = basePath + JSON.parse(res.response).repBody.replace(/\\/g, "/");
	                    _this4.downLoad.current = temp.replace(/jyh/g, "");
	                    var _this = _this4;
	                    window.setTimeout(function () {
	                        console.log(_this.downLoad.current);
	                        _this.$els.downloadcurrent.click();
	                    }, 100);
	                }
	            }, function (res) {
	                window.alert('下载失败');
	            });
	        },
	        downLoadCurrent: function downLoadCurrent() {
	            var _this5 = this;

	            // api.down1(this,{
	            //        opid: this.phone ? this.phone : null,
	            //         start : this.searchlist.nowPage,
	            //         end : 12,
	            // },res=>{
	            //     console.log(res)
	            // })
	            this.$http.get(basePath + 'dateil/down', {
	                opid: this.pid ? this.pid : 0,
	                phone: this.phone ? this.phone : 0,
	                start: this.searchlist.nowPage,
	                end: 12

	            }).then(function (res) {
	                console.log(res);

	                if (res && res.ok == true) {
	                    var temp = basePath + JSON.parse(res.response).repBody.replace(/\\/g, "/");
	                    _this5.downLoad.current = temp.replace(/jyh/g, "");
	                    // this.downLoad.current =basePath + temp.replace(/\\/g, "/")

	                    var _this = _this5;
	                    window.setTimeout(function () {
	                        console.log(_this.downLoad.current);
	                        _this.$els.downloadcurrent.click();
	                    }, 100);
	                }
	            }, function (res) {
	                window.alert('下载失败');
	            });
	        }
	    }
	};
	// </script>

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"box1\" _v-a72af4c2=\"\">\n\t\t<div class=\"top\" _v-a72af4c2=\"\">\n            <span style=\"padding-left: 20px;line-height: 34px; margin-right: 10px;\" _v-a72af4c2=\"\">手机号码 :</span> <input v-el:phone=\"\" class=\"form-control\" v-model=\"phone\" type=\"text\" name=\"\" style=\"width: 115px\" placeholder=\"手机查询\" _v-a72af4c2=\"\">\n             <span style=\"padding-left: 30px;line-height: 34px\" _v-a72af4c2=\"\">操作结果 :</span> \n                <select class=\"form-control state\" v-model=\"state\" _v-a72af4c2=\"\">\n                    <option value=\"\" selected=\"\" _v-a72af4c2=\"\">全部</option>\n                    <option value=\"成功\" _v-a72af4c2=\"\">成功</option>\n                    <option value=\"失败\" _v-a72af4c2=\"\">失败</option>\n                </select>\n                <button class=\"btn btn-primary\" style=\"margin-left: 50px\" @click=\"search\" _v-a72af4c2=\"\">查询</button>\n            <button class=\"btn btn-primary goback\" v-link=\"{path : &quot;/home/manage/log&quot;}\" _v-a72af4c2=\"\">返回</button>\n\t\t</div>\n\t\t<div class=\"middle\" _v-a72af4c2=\"\">\n\t\t\t<table class=\"table table-bordered table-hover\" _v-a72af4c2=\"\">\n\t        <thead _v-a72af4c2=\"\">\n\t          <tr style=\"background-color: #eff2f7;border-top: 1px solid #eaeefb;\" _v-a72af4c2=\"\">\n\t            <th _v-a72af4c2=\"\">序号</th>\n\t            <th _v-a72af4c2=\"\">手机号</th>\n\t            <th _v-a72af4c2=\"\">操作类型</th>\n\t            <th _v-a72af4c2=\"\">操作日期</th> \n\t            <th _v-a72af4c2=\"\">操作结果</th>\n\t            <th _v-a72af4c2=\"\">操作人</th>\n\t          </tr>\n\t        </thead>\n\t        <tbody _v-a72af4c2=\"\">\n\t          <tr v-for=\"item in searchlist.list\" _v-a72af4c2=\"\">\n\t             <th scope=\"row\" _v-a72af4c2=\"\">{{searchlist.list.length-$index+(searchlist.nowPage-1)*12}}</th>\n\t            <td _v-a72af4c2=\"\">{{item.phone}}</td>\n\t           <td _v-a72af4c2=\"\">{{item.type}}</td>\n\t           <td _v-a72af4c2=\"\">{{item.usetime ? new Date(item.usetime).format() : ''}}</td>\n\t            <td _v-a72af4c2=\"\">{{item.result}}</td>\n\t            <td _v-a72af4c2=\"\">{{item.username}}</td>\n\t            \n\t          </tr>\n\t        </tbody>\n\t      </table>\n\t      \n\t\t</div>\n        <load :show=\"isLoad\" _v-a72af4c2=\"\"></load>\n\t\t<div class=\"bottom1\" style=\"padding-left: 150px;\" _v-a72af4c2=\"\">\n              <page :searchlist.sync=\"searchlist\" _v-a72af4c2=\"\">\n                <div style=\"float: right\" _v-a72af4c2=\"\">\n                <!-- v-link=\"{path : basePath}\" -->\n                    <button type=\"button\" class=\"btn btn-primary\" @click=\"downLoadCurrent\" _v-a72af4c2=\"\">当前页导出为.txt</button>\n                    <a style=\"display: none\" v-el:downloadcurrent=\"\" :href=\"downLoad.current\" download=\"批次明细.txt\" _v-a72af4c2=\"\">导出当前</a>\n                    <button type=\"button\" class=\"btn btn-success\" @click=\"downAll\" _v-a72af4c2=\"\">全部导出为.txt</button>\n\n                </div>\n            </page>\n        </div>\n\t</div>\n";

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(110)
	__vue_script__ = __webpack_require__(112)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\account.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(118)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5cd33f4c/account.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(111);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5cd33f4c&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./account.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5cd33f4c&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./account.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".box1[_v-5cd33f4c] {\n  height: 100%;\n  padding-left: 30px;\n  padding-top: 20px;\n  padding-right: 50px;\n  box-sizing: border-box; }\n  .box1 .top[_v-5cd33f4c] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse; }\n    .box1 .top a[_v-5cd33f4c] {\n      margin-left: 20px; }\n    .box1 .top input[_v-5cd33f4c], .box1 .top select[_v-5cd33f4c] {\n      display: inline-block;\n      width: 96px;\n      height: 19px; }\n    .box1 .top select[_v-5cd33f4c] {\n      vertical-align: bottom; }\n  .box1 .middle[_v-5cd33f4c] {\n    margin-top: 20px;\n    padding-left: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; }\n    .box1 .middle a[_v-5cd33f4c] {\n      cursor: pointer; }\n    .box1 .middle th[_v-5cd33f4c], .box1 .middle td[_v-5cd33f4c] {\n      text-align: center; }\n", ""]);

	// exports


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _accountAlert = __webpack_require__(113);

	var _accountAlert2 = _interopRequireDefault(_accountAlert);

	var _index = __webpack_require__(26);

	var _index2 = _interopRequireDefault(_index);

	var _load = __webpack_require__(55);

	var _load2 = _interopRequireDefault(_load);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: {
			alert: _accountAlert2.default,
			load: _load2.default
		},
		data: function data() {
			return {
				isLoad: false,
				addUser: {
					showAlert: false,
					type: '增加角色',
					data: {
						name: '',
						company: '',
						department: '',
						roles: '',
						psw: '',
						checkPsw: ''
					}
				},
				edit: {
					showAlert: false,
					type: '编辑',
					data: {
						name: '',
						company: '',
						department: '',
						roles: '',
						psw: '',
						checkPsw: '',
						oldusername: ''
					}
				},
				userList: []
			};
		},
		ready: function ready() {
			var _this = this;

			this.$on('addUser', function (formData) {
				if (formData.psw !== formData.checkPsw) return window.alert('两次密码一致');
				_index2.default.addUser(_this, {
					"name": formData.name, //必填，用户名
					"company": formData.company, //必填，公司
					"department": formData.department, //必填，部门
					"roles": formData.roles, //必填，角色
					"psw": formData.psw
				}, function (res) {
					console.log(res);
					if (res.resCode === "000000" && res.resMsg === "success" && res.repBody === "添加成功") {
						_this.addUser.showAlert = false;
						var mes = {
							username: formData.name,
							company: formData.company,
							department: formData.department,
							roles: formData.roles

						};
						_this.userList.push(mes);
					}
					if (res.resMsg === 'session失效') {
						window.alert('登录失效,请重新登录');
						_this.router.go({ path: '/' });
					}
					_this.addUser.data = { //清空数据
						name: '',
						company: '',
						department: '',
						roles: '',
						psw: '',
						checkPsw: ''
					};
				});
			});
			this.$on('edit', function (formData) {
				_index2.default.userUpdate(_this, {
					"username": formData.name, //必填，用户名
					"company": formData.company, //必填，公司
					"department": formData.department, //必填，部门
					"roles": formData.roles, //必填，角色
					"password": formData.psw,
					"username1": formData.oldusername
				}, function (res) {
					if (res.repBody === '更新成功' && res.resCode === '000000' && res.resMsg === 'success') {
						_this.edit.showAlert = false;
						_this.getList();
						//              	this.userList.forEach(item =>{
						//              		console.log(item)
						//              		if (formData.oldusername===item.data.name){

						//              			item =  formData
						//              		}
						// })
					} else {
						window.alert('修改失败');
					}
				});
			});

			this.getList();
		},

		methods: {
			showEdit: function showEdit(item) {
				this.edit.showAlert = true;
				this.edit.data = {
					name: item.username,
					company: item.company,
					department: item.department,
					roles: item.roles,
					psw: '',
					checkPsw: '',
					oldusername: item.username
				};
			},
			getList: function getList() {
				var _this2 = this;

				this.isLoad = true;
				_index2.default.userList(this, {}, function (res) {
					if (res.resCode === "000000" && res.resMsg === "success") {
						_this2.userList = res.repBody;
						_this2.isLoad = false;
					}
				});
			}
		}
	};
	// </script>
	// <template>
	// 	<div class="box1">
	// 		<div class="top">
	// 			<button type="button" class="btn btn-info" style="line-height: 20px" @click="addUser.showAlert=true">增加角色</button>
	// 		</div>
	// 		<div class="middle">
	// 			<table class="table table-bordered table-hover">
	// 	        <thead>
	// 	          <tr style="background-color: #eff2f7;border-top: 1px solid #eaeefb;">
	// 	            <th>账号名</th>
	// 	            <th>所属单位</th>
	// 	            <th>所属部门</th>
	// 	            <th>角色描述</th> 
	// 	            <th>编辑信息</th>
	// 	          </tr>
	// 	        </thead>
	// 	        <tbody>
	// 	          <tr v-for="item in userList" track-by="$index">
	// 	            <td>{{item.username}}</td>
	// 	            <td>{{item.company}}</td>
	// 	            <td>{{item.department}}</td>
	// 	            <td>{{item.roles}}</td>
	// 	            <td><span class="glyphicon glyphicon-pencil" aria-hidden="true" @click="showEdit(item)">
	//
	// 	            </span></td>
	//
	// 	          </tr>
	// 	        </tbody>
	// 	      </table>
	//
	// 		</div>
	// 		 <load :show="isLoad"></load>
	// 		<alert :show.sync="addUser.showAlert" :mytype="addUser.type" :my-form = "addUser.data"></alert>
	// 		<alert :show.sync="edit.showAlert" :mytype="edit.type" :my-form.sync = "edit.data"></alert>
	// 	</div>
	// </template>
	// <style lang="scss" scoped>
	// .box1 {
	// 		height: 100%;
	// 		padding-left: 30px;
	//     	padding-top: 20px;
	//     	padding-right:50px;
	//     	box-sizing: border-box;
	//     	.top {
	//     		display: flex;
	//     		flex-direction : row-reverse;
	//     		a {
	//     			margin-left: 20px;
	//     		}
	//     		button {
	//
	//     		}
	//     		input,select {
	//     			display: inline-block;
	//     			width: 96px;
	//     			height: 19px;
	//     		}
	//     		select {
	//     			vertical-align: bottom;
	//     		}
	//     	}
	//     	.middle {
	//     		margin-top: 20px;
	//     		padding-left: 20px;
	//     		display: flex;
	//     		a {
	//     			cursor: pointer;
	//     		}
	//     		th,td {
	//     			text-align: center;
	//     		}
	//     	}
	//
	// 	}
	//
	// </style>
	// <script type="text/javascript">

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(114)
	__vue_script__ = __webpack_require__(116)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] components\\accountAlert.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(117)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-605df982/accountAlert.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(115);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-605df982&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./accountAlert.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=_v-605df982&scoped=true!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./accountAlert.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".alert[_v-605df982] {\n  position: fixed;\n  top: 30%;\n  left: 50%;\n  background-color: #eee;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  width: 360px;\n  z-index: 888; }\n  .alert h3[_v-605df982] {\n    padding: 10px 0;\n    text-align: center; }\n  .alert .form-group[_v-605df982] {\n    text-align: center; }\n    .alert .form-group input[_v-605df982] {\n      display: inline-block;\n      width: 70%;\n      height: 25px;\n      margin-top: 5px; }\n  .alert p[_v-605df982] {\n    text-align: center;\n    margin-bottom: 10px; }\n", ""]);

	// exports


/***/ },
/* 116 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<div class="alert" v-if="show">
	// 		<button type="button" class="close" @click="show = false" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	// 		<h3 >{{mytype}}</h3>
	// 		<div class="form-group position"> 
	//       <label for="exampleInputName2">&nbsp账&nbsp&nbsp&nbsp&nbsp号&nbsp：</label> <input type="text" class="form-control myID" id="exampleInputName2" placeholder="easier" v-model="myForm.name"> 
	//       <label for="exampleInputName2">所属单位：</label> <input type="text" class="form-control myID" id="exampleInputName2" v-model="myForm.company" placeholder="广州易杰"> 
	//       <label for="exampleInputName2">所属部门：</label> <input type="text" class="form-control myID" id="exampleInputName2" v-model="myForm.department" placeholder="客服部"> 
	//       <label for="exampleInputName2">角色描述：</label> <input type="text" class="form-control myID" id="exampleInputName2" v-model="myForm.roles"  placeholder="管理员"> 
	//       <div v-if="mytype ==='增加角色'">
	//       	<label for="exampleInputName2">设置密码：</label> <input type="password" class="form-control myID" id="exampleInputName2" v-model="myForm.psw" placeholder="Jane Doe"> 
	//       <label for="exampleInputName2">确认密码：</label> <input type="password" class="form-control myID" id="exampleInputName2" v-model="myForm.checkPsw" placeholder="Jane Doe"> 
	//       </div>
	//       <div v-else>
	//       	<label for="exampleInputName2">设置密码：</label> <input type="password" class="form-control myID" id="exampleInputName2" v-model="myForm.psw" placeholder="如需要修改密码,则填写"> 
	//       <label for="exampleInputName2">确认密码：</label> <input type="password" class="form-control myID" id="exampleInputName2" v-model="myForm.checkPsw" placeholder="如需要修改密码,则填写"> 
	//       </div>
	//       </div>
	//       <div class="clearfix">
	//       	<div style="float: right" >
	//      		<button type="button" class="btn btn-primary" @click="show=false">取消</button>
	//      		<button type="button" class="btn btn-success" @click="confirm">确定</button>
	//      	</div>
	//       </div>
	// 	</div>
	// </template>
	// <style lang="scss" scoped>
	// 	.alert {
	// 			position: fixed;
	// 			top: 30%;
	// 			left: 50%;
	// 			background-color: #eee;
	// 			transform: translateX(-50%);
	//       width: 360px;
	// 			z-index: 888;
	// 			h3 {
	// 				padding: 10px 0 ;
	// 				text-align: center;
	//
	// 			}
	// 		  .form-group {
	//         text-align: center;
	//         input {
	//           display: inline-block;
	//           width: 70%;
	//           height: 25px;
	//           margin-top: 5px;
	//         }
	//       }
	// 			p {
	// 				text-align: center;
	// 				margin-bottom: 10px;
	// 			}
	//     	}
	// </style>
	// <script type="text/javascript">
	exports.default = {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			mytype: {
				type: String,
				required: true
			},
			myForm: {
				type: Object,
				default: {
					name: '',
					company: '',
					department: '',
					roles: '',
					psw: '',
					checkPsw: ''
				}
			}
		},
		data: function data() {
			return {};
		},
		ready: function ready() {},

		methods: {
			confirm: function confirm() {
				if (this.mytype === '增加角色') {
					if (this.myForm.name.trim().length == 0 || this.myForm.company.trim().length == 0 || this.myForm.department.trim().length == 0 || this.myForm.roles.trim().length == 0 || this.myForm.psw.trim().length == 0 || this.myForm.checkPsw.trim().length == 0) return window.alert('请把信息填完整');
					this.$dispatch('addUser', this.myForm);
				} else {
					if (this.myForm.name.trim().length == 0 || this.myForm.company.trim().length == 0 || this.myForm.department.trim().length == 0 || this.myForm.roles.trim().length == 0) return window.alert('请把信息填完整');
					console.log(this.myForm.psw);

					this.myForm.psw.trim() === this.myForm.checkPsw.trim() ? this.$dispatch('edit', this.myForm) : alert('两次密码不一致');
				}
			}
		}

	};
	// </script>

/***/ },
/* 117 */
/***/ function(module, exports) {

	module.exports = "\n\t<div class=\"alert\" v-if=\"show\" _v-605df982=\"\">\n\t\t<button type=\"button\" class=\"close\" @click=\"show = false\" aria-label=\"Close\" _v-605df982=\"\"><span aria-hidden=\"true\" _v-605df982=\"\">×</span></button>\n\t\t<h3 _v-605df982=\"\">{{mytype}}</h3>\n\t\t<div class=\"form-group position\" _v-605df982=\"\"> \n      <label for=\"exampleInputName2\" _v-605df982=\"\">&nbsp;账&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;：</label> <input type=\"text\" class=\"form-control myID\" id=\"exampleInputName2\" placeholder=\"easier\" v-model=\"myForm.name\" _v-605df982=\"\"> \n      <label for=\"exampleInputName2\" _v-605df982=\"\">所属单位：</label> <input type=\"text\" class=\"form-control myID\" id=\"exampleInputName2\" v-model=\"myForm.company\" placeholder=\"广州易杰\" _v-605df982=\"\"> \n      <label for=\"exampleInputName2\" _v-605df982=\"\">所属部门：</label> <input type=\"text\" class=\"form-control myID\" id=\"exampleInputName2\" v-model=\"myForm.department\" placeholder=\"客服部\" _v-605df982=\"\"> \n      <label for=\"exampleInputName2\" _v-605df982=\"\">角色描述：</label> <input type=\"text\" class=\"form-control myID\" id=\"exampleInputName2\" v-model=\"myForm.roles\" placeholder=\"管理员\" _v-605df982=\"\"> \n      <div v-if=\"mytype ==='增加角色'\" _v-605df982=\"\">\n      \t<label for=\"exampleInputName2\" _v-605df982=\"\">设置密码：</label> <input type=\"password\" class=\"form-control myID\" id=\"exampleInputName2\" v-model=\"myForm.psw\" placeholder=\"Jane Doe\" _v-605df982=\"\"> \n      <label for=\"exampleInputName2\" _v-605df982=\"\">确认密码：</label> <input type=\"password\" class=\"form-control myID\" id=\"exampleInputName2\" v-model=\"myForm.checkPsw\" placeholder=\"Jane Doe\" _v-605df982=\"\"> \n      </div>\n      <div v-else=\"\" _v-605df982=\"\">\n      \t<label for=\"exampleInputName2\" _v-605df982=\"\">设置密码：</label> <input type=\"password\" class=\"form-control myID\" id=\"exampleInputName2\" v-model=\"myForm.psw\" placeholder=\"如需要修改密码,则填写\" _v-605df982=\"\"> \n      <label for=\"exampleInputName2\" _v-605df982=\"\">确认密码：</label> <input type=\"password\" class=\"form-control myID\" id=\"exampleInputName2\" v-model=\"myForm.checkPsw\" placeholder=\"如需要修改密码,则填写\" _v-605df982=\"\"> \n      </div>\n      </div>\n      <div class=\"clearfix\" _v-605df982=\"\">\n      \t<div style=\"float: right\" _v-605df982=\"\">\n     \t\t<button type=\"button\" class=\"btn btn-primary\" @click=\"show=false\" _v-605df982=\"\">取消</button>\n     \t\t<button type=\"button\" class=\"btn btn-success\" @click=\"confirm\" _v-605df982=\"\">确定</button>\n     \t</div>\n      </div>\n\t</div>\n";

/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"box1\" _v-5cd33f4c=\"\">\n\t<div class=\"top\" _v-5cd33f4c=\"\">\n\t\t<button type=\"button\" class=\"btn btn-info\" style=\"line-height: 20px\" @click=\"addUser.showAlert=true\" _v-5cd33f4c=\"\">增加角色</button>\n\t</div>\n\t<div class=\"middle\" _v-5cd33f4c=\"\">\n\t\t<table class=\"table table-bordered table-hover\" _v-5cd33f4c=\"\">\n        <thead _v-5cd33f4c=\"\">\n          <tr style=\"background-color: #eff2f7;border-top: 1px solid #eaeefb;\" _v-5cd33f4c=\"\">\n            <th _v-5cd33f4c=\"\">账号名</th>\n            <th _v-5cd33f4c=\"\">所属单位</th>\n            <th _v-5cd33f4c=\"\">所属部门</th>\n            <th _v-5cd33f4c=\"\">角色描述</th> \n            <th _v-5cd33f4c=\"\">编辑信息</th>\n          </tr>\n        </thead>\n        <tbody _v-5cd33f4c=\"\">\n          <tr v-for=\"item in userList\" track-by=\"$index\" _v-5cd33f4c=\"\">\n            <td _v-5cd33f4c=\"\">{{item.username}}</td>\n            <td _v-5cd33f4c=\"\">{{item.company}}</td>\n            <td _v-5cd33f4c=\"\">{{item.department}}</td>\n            <td _v-5cd33f4c=\"\">{{item.roles}}</td>\n            <td _v-5cd33f4c=\"\"><span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\" @click=\"showEdit(item)\" _v-5cd33f4c=\"\">\n            \t\n            </span></td>\n            \n          </tr>\n        </tbody>\n      </table>\n     \n\t</div>\n\t <load :show=\"isLoad\" _v-5cd33f4c=\"\"></load>\n\t<alert :show.sync=\"addUser.showAlert\" :mytype=\"addUser.type\" :my-form=\"addUser.data\" _v-5cd33f4c=\"\"></alert>\n\t<alert :show.sync=\"edit.showAlert\" :mytype=\"edit.type\" :my-form.sync=\"edit.data\" _v-5cd33f4c=\"\"></alert>\n</div>\n";

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(120)
	__vue_script__ = __webpack_require__(122)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] views\\App.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(126)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-986f6ec0/App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(121);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "html, body {\n  width: 100%;\n  height: 100%; }\n\ninput {\n  text-align: center; }\n", ""]);

	// exports


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _reset = __webpack_require__(123);

	var _reset2 = _interopRequireDefault(_reset);

	var _load = __webpack_require__(55);

	var _load2 = _interopRequireDefault(_load);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <router-view></router-view>
	//
	// </template>
	// <style lang="scss">
	//     html ,body {
	//         width: 100%;
	//         height: 100%;
	//     }
	//     input {
	//     	text-align: center;
	//     }
	// </style>
	// <script type="text/javascript">
	exports.default = {
	    components: {
	        load: _load2.default
	    },
	    watch: {
	        '$route': function $route(to, from) {
	            if (this.login === false) {
	                this.$router.go({ path: '/login/' });
	            }
	        }
	    },
	    data: function data() {
	        return {
	            login: false,
	            user: '',
	            isRefresh: { //判断下面三个页面是否进去时要刷新
	                message: false,
	                statistics: false,
	                log: false
	            }

	        };
	    },
	    ready: function ready() {
	        var _this = this;

	        this.$on('login', function (res) {
	            //登录事件监听
	            _this.login = true;
	            _this.user = res;
	            window.sessionStorage.setItem('user', res);
	            _this.$router.go({ path: '/home/spending' });
	        });
	        this.$on('quite', function () {
	            _this.login = false;
	            _this.user = '';
	            window.sessionStorage.removeItem('user');
	            _this.$router.go({ path: '/login/' });
	        });
	        this.$on('refresh', function () {
	            _this.isRefresh = { //判断下面三个页面是否进去时要刷新
	                message: true,
	                statistics: true,
	                log: true
	            };
	        });
	        if (window.sessionStorage.getItem('user')) {
	            this.login = true;
	            this.user = window.sessionStorage.getItem('user');
	            // this.$router.go({path :'/login/'})
	        }
	    }
	};
	// </script>

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(124);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(125)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./reset.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./reset.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, "@charset \"utf-8\";\n\n/* 禁用iPhone中Safari的字号自动调整 */\nhtml {\n\t-webkit-text-size-adjust: 100%;\n\t-ms-text-size-adjust: 100%;\n}\n\n/* 取消链接高亮  */\nbody, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button, form, table, th, tr, td, tbody, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n/* 设置HTML5元素为块 */\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nul, ol, li {\n\tlist-style: none;\n}\n\n/* 图片自适应 */\nimg {\n\tmax-width: 100%;\n\theight: auto;\n}\n\n/* 初始化 */\nbody, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button, form, table, th, tr, td, tbody, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n\t/*font-family: 'Microsoft YaHei', Arial;*/\n\tfont-family: 'Arial Normal', 'Arial';\n\tmargin: 0;\n\tpadding: 0;\n\tborder: none;\n}\nem, i {\n\tfont-style: normal;\n}\n.clearfix:after {\n\tcontent: \"\";\n\tdisplay: block;\n\tvisibility: hidden;\n\theight: 0;\n\tclear: both;\n}\n.clearfix {\n\tzoom: 1;\n}\na {\n\ttext-decoration: none;\n}\na:hover {\n\ttext-decoration: none;\n}\n.fr {\n\t\t\tfloat: right;\n\t\t}\n.fl {\n\tfloat: left;\n}", ""]);

	// exports


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = "\n<router-view></router-view>\n\n";

/***/ }
/******/ ]);