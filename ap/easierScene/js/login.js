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
/******/ 	__webpack_require__.p = "./js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(177);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , hide      = __webpack_require__(11)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 21 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ },
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Install plugin.
	 */

	function install(Vue) {

	    var _ = __webpack_require__(25)(Vue);

	    Vue.url = __webpack_require__(26)(_);
	    Vue.http = __webpack_require__(27)(_);
	    Vue.resource = __webpack_require__(31)(_);

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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Service for sending network requests.
	 */

	var xhr = __webpack_require__(28);
	var jsonp = __webpack_require__(30);
	var Promise = __webpack_require__(29);

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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * XMLHttp request.
	 */

	var Promise = __webpack_require__(29);
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
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * JSONP request.
	 */

	var Promise = __webpack_require__(29);

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
/* 31 */
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
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
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
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
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
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(81)
	__vue_script__ = __webpack_require__(83)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] easierScene\\src\\scroll.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(111)
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
	  var id = "_v-3e14c3d6/scroll.vue"
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
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./scroll.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./scroll.vue");
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

	exports = module.exports = __webpack_require__(38)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.wrapper {\n\tposition: absolute;\n\tz-index: 1;\n\ttop: 0;\n\tleft: 0;\n\t//bottom: 48px;\n\twidth: 100%;\n\toverflow: hidden;\n}\n\n.scroller {\n\tposition: absolute;\n\twidth: 100%;\n}\n\n.vue-iscroll-pulldown-container,\n.vue-iscroll-pullup-container {\n\tmargin-top: 0;\n\tbackground: #fff;\n\t-webkit-transition: all linear 250ms;\n\ttransition: all linear 250ms;\n}\n\n.vue-iscroll-pulldown-up {\n\tmargin-top: -60px;\n}\n\n.vue-iscroll-pulldown-down {\n\t-webkit-transition: none;\n\ttransition: none;\n}\n\n.vue-iscroll-pulldown-loading {\n\t-webkit-transition: none;\n\ttransition: none;\n}\n/* pullup */\n\n.vue-iscroll-pullup-loading {}\n\n.vue-iscroll-pullup-down {}\n\n.vue-iscroll-pullup-up {}\n", ""]);

	// exports


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _assign = __webpack_require__(84);

	var _assign2 = _interopRequireDefault(_assign);

	var _pull = __webpack_require__(106);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var iScroll = __webpack_require__(110);

	var pullThreshold = 5;
	var pulldownDefaultConfig = function pulldownDefaultConfig() {
		return {
			content: 'Pull Down To Refresh',
			height: 60,
			autoRefresh: false,
			upContent: 'Pull Down To Refresh',
			downContent: 'Release To Refresh',
			loadingContent: 'Loading...',
			clsPrefix: 'vue-iscroll-pulldown-'
		};
	};
	var pullupDefaultConfig = function pullupDefaultConfig() {
		return {
			content: 'Pull Up To Refresh',
			pullUpHeight: 60,
			height: 40,
			autoRefresh: false,
			upContent: 'Release To Refresh',
			downContent: 'Pull Up To Refresh',
			loadingContent: 'Loading...',
			clsPrefix: 'vue-iscroll-pullup-'
		};
	};
	exports.default = {
		name: "vue-iscroller",
		props: {
			bottomHeight: {
				type: String,
				default: '0'
			},
			scroller: {
				type: Object,
				default: function _default() {}
			},
			usePulldown: {
				type: Boolean,
				default: false
			},
			usePullup: {
				type: Boolean,
				default: false
			},
			pulldownConfig: {
				type: Object,
				default: function _default() {}
			},
			pullupConfig: {
				type: Object,
				default: function _default() {}
			}
		},
		compiled: function compiled() {
			this.uuid = Math.random().toString(36).substring(3, 8);
		},
		ready: function ready() {
			var _this = this;

			this.$el.setAttribute('id', 'scroller-' + this.uuid);
			var content = null;
			var slotChildren = this.$el.querySelector('.scroller').childNodes;
			for (var i = 0; i < slotChildren.length; i++) {
				if (slotChildren[i].nodeType === 1) {
					content = slotChildren[i];
					break;
				}
			}
			if (!content) {
				throw new Error('no content is found');
			}

			this.scroller = new iScroll('.wrapper', {
				probeType: 2,
				bounceTime: 250,
				bounceEasing: 'quadratic',
				mouseWheel: false,
				scrollbars: true,
				fadeScrollbars: true,
				interactiveScrollbars: false
			});
			if (this.usePulldown) {
				var config = (0, _assign2.default)(pulldownDefaultConfig(), this.pulldownConfig);
				config.container = this.$el.querySelector('.scroller');

				if (!config.container) {
					throw new Error('pulldown has no container');
				}

				var pulldown = this.pulldown = new _pull.Pulldown(config);
				pulldown.on('loading', function () {
					_this.$dispatch('pulldown:loading', _this.uuid);
				});
				var pulldownOffset = pulldown.element.offsetHeight;
			}

			if (this.usePullup) {
				var _config = (0, _assign2.default)(pullupDefaultConfig(), this.pullupConfig);
				_config.container = this.$el.querySelector('.scroller');

				if (!_config.container) {
					throw new Error('pullup has no container');
				}

				var pullup = this.pullup = new _pull.Pullup(_config);
				pullup.on('loading', function () {
					_this.$dispatch('pullup:loading', _this.uuid);
				});
				pullup.on('complete', function () {
					_this.$dispatch('pullup:complete', _this.uuid);
				});
				var pullupOffset = pullup.element.offsetHeight;
			}

			var startPos = null;
			this.scroller.on('scrollStart', function () {
				startPos = this.y;
			});

			var that = this;

			that.scroller.on('scroll', function () {
				if (that.usePulldown || that.usePullup) {
					this.hasVerticalScroll = true;
					startPos = -1000;
				} else if (startPos === -1000 && (!that.usePullup && this.y < 0 || !that.usePulldown && this.y > 0)) {
					this.hasVerticalScroll = false;
					startPos = 0;
					this.scrollBy(0, -this.y, 0);
				}

				if (that.usePulldown) {
					if (this.y > pulldownOffset + pullThreshold && !(0, _pull.containClass)(pulldown.element, 'vue-iscroll-pulldown-down')) {
						pulldown.release();
						console.log('call release');
						this.scrollBy(0, -pulldownOffset, 0);
					} else if (this.y < 0 && (0, _pull.containClass)(pulldown.element, 'vue-iscroll-pulldown-down')) {
						pulldown.pull();
						this.scrollBy(0, pulldownOffset, 0);
					}
				}

				if (that.usePullup) {

					if (this.y < this.maxScrollY - pullupOffset + pullThreshold && !(0, _pull.containClass)(pullup.element, 'vue-iscroll-pullup-up')) {
						pullup.release();
					} else if (this.y > this.maxScrollY - pullupOffset + pullThreshold && (0, _pull.containClass)(pullup.element, 'vue-iscroll-pullup-up')) {
						pullup.push();
					}
				}
			});

			that.scroller.on('scrollEnd', function () {
				if (pulldown && (0, _pull.containClass)(pulldown.element, 'vue-iscroll-pulldown-down')) {
					console.log('scroll end');
					pulldown.loading();
				}

				if (pullup && (0, _pull.containClass)(pullup.element, 'vue-iscroll-pullup-up')) {
					console.log('scroll end');
					console.log(this);

					pullup.loading();
				}

				if (startPos === -1000) {
					this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
				}
			});
		},


		methods: {
			reset: function reset() {
				var _this2 = this;

				var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

				console.log('reset');
				console.log(this.scroller);
				this.scroller && setTimeout(function () {
					console.log('refresh');
					_this2.scroller.refresh();
				}, timeout);
			},
			complete: function complete() {
				this.pullup = null;
				delete this.pullup;
				this.usePullup = false;
			}
		},
		events: {
			'scroll-reset': function scrollReset(uuid) {
				console.log('reset event');
				this.reset();
			},

			'pulldown:reset': function pulldownReset(uuid) {
				var _this3 = this;

				if (uuid === this.uuid) {
					this.pulldown.reset(function () {
						_this3.reset(1000);
					});
				}
			},

			'pullup:reset': function pullupReset(uuid) {
				var _this4 = this;

				if (uuid === this.uuid) {
					this.pullup.reset(function () {
						_this4.reset(1000);
					});
				}
			},

			'pullup:done': function pullupDone() {
				var _this5 = this;

				if (true) {
					this.pullup.complete(function () {
						_this5.reset(1000);
					});

					this.complete();
				}
			}
		},
		beforeDestroy: function beforeDestroy() {
			this.scroller.destroy();
		}
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	module.exports = __webpack_require__(8).Object.assign;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(6);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(87)});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(88)
	  , gOPS     = __webpack_require__(103)
	  , pIE      = __webpack_require__(104)
	  , toObject = __webpack_require__(105)
	  , IObject  = __webpack_require__(92)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(17)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(89)
	  , enumBugKeys = __webpack_require__(102);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(90)
	  , toIObject    = __webpack_require__(91)
	  , arrayIndexOf = __webpack_require__(95)(false)
	  , IE_PROTO     = __webpack_require__(99)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(92)
	  , defined = __webpack_require__(94);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(93);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 94 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(91)
	  , toLength  = __webpack_require__(96)
	  , toIndex   = __webpack_require__(98);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(97)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 97 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(97)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(100)('keys')
	  , uid    = __webpack_require__(101);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(7)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 102 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 103 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 104 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(94);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.containClass = exports.removeClass = exports.addClass = exports.Pullup = exports.Pulldown = undefined;

	var _classCallCheck2 = __webpack_require__(107);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(108);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _tinyEmitter = __webpack_require__(109);

	var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addClass(element, className) {
		element.classList.add(className);
	}
	function removeClass(element, className) {
		element.classList.remove(className);
	}
	function containClass(element, className) {
		return element.classList.contains(className);
	}

	var Pulldown = function () {
		function Pulldown(cfg) {
			(0, _classCallCheck3.default)(this, Pulldown);

			if (this.__isRender) return;
			this.__isRender = true;
			this.cfg = cfg;
			this.render(cfg);
			this.emitter = new _tinyEmitter2.default();
			return this;
		}

		(0, _createClass3.default)(Pulldown, [{
			key: "render",
			value: function render(cfg) {
				var containerCls = cfg.clsPrefix + "container";
				var height = cfg.height || 60;
				var pulldown = this.pulldown = this.element = document.createElement("div");
				pulldown.className = containerCls;
				pulldown.style.width = "100%";
				pulldown.style.height = height + "px";
				pulldown.style.lineHeight = height + "px";
				pulldown.style.textAlign = "center";
				addClass(pulldown, cfg.clsPrefix + 'up');
				this.status = 'up';
				cfg.container.insertBefore(pulldown, cfg.container.firstChild);
				pulldown.innerHTML = cfg["content"];
			}
		}, {
			key: "_changeStatus",
			value: function _changeStatus(status) {
				var prevVal = this.status;
				this.status = status;
				removeClass(this.pulldown, this.cfg.clsPrefix + prevVal);
				addClass(this.pulldown, this.cfg.clsPrefix + status);

				this.pulldown.innerHTML = this.cfg[this.status + "Content"] || this.cfg.content;
			}
		}, {
			key: "pull",
			value: function pull() {
				var status = 'up';
				this._changeStatus(status);
			}
		}, {
			key: "release",
			value: function release() {
				var status = 'down';
				this._changeStatus(status);
			}
		}, {
			key: "loading",
			value: function loading() {
				var status = 'loading';
				this.pulldown.style.marginTop = '';
				this.pulldown.style.transitionDuration = '';
				this._changeStatus(status);

				this.emitter.emit('loading');
			}
		}, {
			key: "reset",
			value: function reset(callback) {
				this.pull();
				if (callback) callback();
			}
		}, {
			key: "on",
			value: function on(event, callback) {
				this.emitter.on(event, callback);
			}
		}]);
		return Pulldown;
	}();

	var Pullup = function () {
		function Pullup(cfg) {
			(0, _classCallCheck3.default)(this, Pullup);

			if (this.__isRender) return;
			this.__isRender = true;
			this.cfg = cfg;
			this.render(cfg);

			this.emitter = new _tinyEmitter2.default();
			return this;
		}

		(0, _createClass3.default)(Pullup, [{
			key: "render",
			value: function render(cfg) {
				var containerCls = cfg.clsPrefix + "container";
				var height = cfg.height || 60;
				var pullup = this.pullup = this.element = document.createElement("div");
				pullup.className = containerCls;

				pullup.style.width = "100%";
				pullup.style.height = height + "px";
				pullup.style.lineHeight = height + "px";
				pullup.style.textAlign = "center";
				cfg.container.appendChild(pullup);
				this.status = 'down';
				addClass(pullup, cfg.clsPrefix + this.status);
				cfg.container.appendChild(pullup);
				pullup.innerHTML = cfg["content"];
			}
		}, {
			key: "_changeStatus",
			value: function _changeStatus(status) {
				var prevVal = this.status;
				this.status = status;
				removeClass(this.pullup, this.cfg.clsPrefix + prevVal);
				addClass(this.pullup, this.cfg.clsPrefix + status);

				this.pullup.innerHTML = this.cfg[this.status + "Content"] || this.cfg.content;
			}
		}, {
			key: "reset",
			value: function reset(callback) {
				this.push();
				if (callback) callback();
			}
		}, {
			key: "push",
			value: function push() {
				var status = 'down';
				this._changeStatus(status);
			}
		}, {
			key: "release",
			value: function release() {
				var status = 'up';
				this._changeStatus(status);
			}
		}, {
			key: "loading",
			value: function loading() {
				var status = 'loading';
				this.pullup.style.transitionDuration = '';
				this._changeStatus(status);

				this.emitter.emit('loading');
			}
		}, {
			key: "complete",
			value: function complete() {
				var statue = 'complete';
				this.pullup.remove();
				this.emitter.emit('complete');
			}
		}, {
			key: "on",
			value: function on(event, callback) {
				this.emitter.on(event, callback);
			}
		}]);
		return Pullup;
	}();

	exports.Pulldown = Pulldown;
	exports.Pullup = Pullup;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.containClass = containClass;

/***/ },
/* 107 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(3);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 109 */
/***/ function(module, exports) {

	function E () {
	  // Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E.prototype = {
	  on: function (name, callback, ctx) {
	    var e = this.e || (this.e = {});

	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });

	    return this;
	  },

	  once: function (name, callback, ctx) {
	    var self = this;
	    function listener () {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    };

	    listener._ = callback
	    return this.on(name, listener, ctx);
	  },

	  emit: function (name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;

	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }

	    return this;
	  },

	  off: function (name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];

	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	          liveEvents.push(evts[i]);
	      }
	    }

	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	    (liveEvents.length)
	      ? e[name] = liveEvents
	      : delete e[name];

	    return this;
	  }
	};

	module.exports = E;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
	(function (window, document, Math) {
	var rAF = window.requestAnimationFrame	||
		window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function (callback) { window.setTimeout(callback, 1000 / 60); };

	var utils = (function () {
		var me = {};

		var _elementStyle = document.createElement('div').style;
		var _vendor = (function () {
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform,
				i = 0,
				l = vendors.length;

			for ( ; i < l; i++ ) {
				transform = vendors[i] + 'ransform';
				if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
			}

			return false;
		})();

		function _prefixStyle (style) {
			if ( _vendor === false ) return false;
			if ( _vendor === '' ) return style;
			return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
		}

		me.getTime = Date.now || function getTime () { return new Date().getTime(); };

		me.extend = function (target, obj) {
			for ( var i in obj ) {
				target[i] = obj[i];
			}
		};

		me.addEvent = function (el, type, fn, capture) {
			el.addEventListener(type, fn, !!capture);
		};

		me.removeEvent = function (el, type, fn, capture) {
			el.removeEventListener(type, fn, !!capture);
		};

		me.prefixPointerEvent = function (pointerEvent) {
			return window.MSPointerEvent ?
				'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8):
				pointerEvent;
		};

		me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
			var distance = current - start,
				speed = Math.abs(distance) / time,
				destination,
				duration;

			deceleration = deceleration === undefined ? 0.0006 : deceleration;

			destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
			duration = speed / deceleration;

			if ( destination < lowerMargin ) {
				destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if ( destination > 0 ) {
				destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}

			return {
				destination: Math.round(destination),
				duration: duration
			};
		};

		var _transform = _prefixStyle('transform');

		me.extend(me, {
			hasTransform: _transform !== false,
			hasPerspective: _prefixStyle('perspective') in _elementStyle,
			hasTouch: 'ontouchstart' in window,
			hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
			hasTransition: _prefixStyle('transition') in _elementStyle
		});

		/*
		This should find all Android browsers lower than build 535.19 (both stock browser and webview)
		- galaxy S2 is ok
	    - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
	    - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S3 is badAndroid (stock brower, webview)
	     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S4 is badAndroid (stock brower, webview)
	     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
	   - galaxy S5 is OK
	     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
	   - galaxy S6 is OK
	     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
	  */
		me.isBadAndroid = (function() {
			var appVersion = window.navigator.appVersion;
			// Android browser is not a chrome browser.
			if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
				var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
				if(safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
					return parseFloat(safariVersion[1]) < 535.19;
				} else {
					return true;
				}
			} else {
				return false;
			}
		})();

		me.extend(me.style = {}, {
			transform: _transform,
			transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
			transitionDuration: _prefixStyle('transitionDuration'),
			transitionDelay: _prefixStyle('transitionDelay'),
			transformOrigin: _prefixStyle('transformOrigin')
		});

		me.hasClass = function (e, c) {
			var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
			return re.test(e.className);
		};

		me.addClass = function (e, c) {
			if ( me.hasClass(e, c) ) {
				return;
			}

			var newclass = e.className.split(' ');
			newclass.push(c);
			e.className = newclass.join(' ');
		};

		me.removeClass = function (e, c) {
			if ( !me.hasClass(e, c) ) {
				return;
			}

			var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
			e.className = e.className.replace(re, ' ');
		};

		me.offset = function (el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;

			// jshint -W084
			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}
			// jshint +W084

			return {
				left: left,
				top: top
			};
		};

		me.preventDefaultException = function (el, exceptions) {
			for ( var i in exceptions ) {
				if ( exceptions[i].test(el[i]) ) {
					return true;
				}
			}

			return false;
		};

		me.extend(me.eventType = {}, {
			touchstart: 1,
			touchmove: 1,
			touchend: 1,

			mousedown: 2,
			mousemove: 2,
			mouseup: 2,

			pointerdown: 3,
			pointermove: 3,
			pointerup: 3,

			MSPointerDown: 3,
			MSPointerMove: 3,
			MSPointerUp: 3
		});

		me.extend(me.ease = {}, {
			quadratic: {
				style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				fn: function (k) {
					return k * ( 2 - k );
				}
			},
			circular: {
				style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
				fn: function (k) {
					return Math.sqrt( 1 - ( --k * k ) );
				}
			},
			back: {
				style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				fn: function (k) {
					var b = 4;
					return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
				}
			},
			bounce: {
				style: '',
				fn: function (k) {
					if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
						return 7.5625 * k * k;
					} else if ( k < ( 2 / 2.75 ) ) {
						return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
					} else if ( k < ( 2.5 / 2.75 ) ) {
						return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
					} else {
						return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
					}
				}
			},
			elastic: {
				style: '',
				fn: function (k) {
					var f = 0.22,
						e = 0.4;

					if ( k === 0 ) { return 0; }
					if ( k == 1 ) { return 1; }

					return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
				}
			}
		});

		me.tap = function (e, eventName) {
			var ev = document.createEvent('Event');
			ev.initEvent(eventName, true, true);
			ev.pageX = e.pageX;
			ev.pageY = e.pageY;
			e.target.dispatchEvent(ev);
		};

		me.click = function (e) {
			var target = e.target,
				ev;

			if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
				ev = document.createEvent('MouseEvents');
				ev.initMouseEvent('click', true, true, e.view, 1,
					target.screenX, target.screenY, target.clientX, target.clientY,
					e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
					0, null);

				ev._constructed = true;
				target.dispatchEvent(ev);
			}
		};

		return me;
	})();
	function IScroll (el, options) {
		this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
		this.scroller = this.wrapper.children[0];
		this.scrollerStyle = this.scroller.style;		// cache style for better performance

		this.options = {

			resizeScrollbars: true,

			mouseWheelSpeed: 20,

			snapThreshold: 0.334,

	// INSERT POINT: OPTIONS
			disablePointer : !utils.hasPointer,
			disableTouch : utils.hasPointer || !utils.hasTouch,
			disableMouse : utils.hasPointer || utils.hasTouch,
			startX: 0,
			startY: 0,
			scrollY: true,
			directionLockThreshold: 5,
			momentum: true,

			bounce: true,
			bounceTime: 600,
			bounceEasing: '',

			preventDefault: true,
			preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

			HWCompositing: true,
			useTransition: true,
			useTransform: true,
			bindToWrapper: typeof window.onmousedown === "undefined"
		};

		for ( var i in options ) {
			this.options[i] = options[i];
		}

		// Normalize options
		this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

		this.options.useTransition = utils.hasTransition && this.options.useTransition;
		this.options.useTransform = utils.hasTransform && this.options.useTransform;

		this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
		this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

		// If you want eventPassthrough I have to lock one of the axes
		this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
		this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

		// With eventPassthrough we also need lockDirection mechanism
		this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
		this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

		this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

		this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

		if ( this.options.tap === true ) {
			this.options.tap = 'tap';
		}

		if ( this.options.shrinkScrollbars == 'scale' ) {
			this.options.useTransition = false;
		}

		this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

		if ( this.options.probeType == 3 ) {
			this.options.useTransition = false;	}

	// INSERT POINT: NORMALIZATION

		// Some defaults
		this.x = 0;
		this.y = 0;
		this.directionX = 0;
		this.directionY = 0;
		this._events = {};

	// INSERT POINT: DEFAULTS

		this._init();
		this.refresh();

		this.scrollTo(this.options.startX, this.options.startY);
		this.enable();
	}

	IScroll.prototype = {
		version: '5.2.0',

		_init: function () {
			this._initEvents();

			if ( this.options.scrollbars || this.options.indicators ) {
				this._initIndicators();
			}

			if ( this.options.mouseWheel ) {
				this._initWheel();
			}

			if ( this.options.snap ) {
				this._initSnap();
			}

			if ( this.options.keyBindings ) {
				this._initKeys();
			}

	// INSERT POINT: _init

		},

		destroy: function () {
			this._initEvents(true);
			clearTimeout(this.resizeTimeout);
	 		this.resizeTimeout = null;
			this._execEvent('destroy');
		},

		_transitionEnd: function (e) {
			if ( e.target != this.scroller || !this.isInTransition ) {
				return;
			}

			this._transitionTime();
			if ( !this.resetPosition(this.options.bounceTime) ) {
				this.isInTransition = false;
				this._execEvent('scrollEnd');
			}
		},

		_start: function (e) {
			// React to left mouse button only
			if ( utils.eventType[e.type] != 1 ) {
			  // for button property
			  // http://unixpapa.com/js/mouse.html
			  var button;
		    if (!e.which) {
		      /* IE case */
		      button = (e.button < 2) ? 0 :
		               ((e.button == 4) ? 1 : 2);
		    } else {
		      /* All others */
		      button = e.button;
		    }
				if ( button !== 0 ) {
					return;
				}
			}

			if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
				return;
			}

			if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
				e.preventDefault();
			}

			var point = e.touches ? e.touches[0] : e,
				pos;

			this.initiated	= utils.eventType[e.type];
			this.moved		= false;
			this.distX		= 0;
			this.distY		= 0;
			this.directionX = 0;
			this.directionY = 0;
			this.directionLocked = 0;

			this.startTime = utils.getTime();

			if ( this.options.useTransition && this.isInTransition ) {
				this._transitionTime();
				this.isInTransition = false;
				pos = this.getComputedPosition();
				this._translate(Math.round(pos.x), Math.round(pos.y));
				this._execEvent('scrollEnd');
			} else if ( !this.options.useTransition && this.isAnimating ) {
				this.isAnimating = false;
				this._execEvent('scrollEnd');
			}

			this.startX    = this.x;
			this.startY    = this.y;
			this.absStartX = this.x;
			this.absStartY = this.y;
			this.pointX    = point.pageX;
			this.pointY    = point.pageY;

			this._execEvent('beforeScrollStart');
		},

		_move: function (e) {
			if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
				return;
			}

			if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
				e.preventDefault();
			}

			var point		= e.touches ? e.touches[0] : e,
				deltaX		= point.pageX - this.pointX,
				deltaY		= point.pageY - this.pointY,
				timestamp	= utils.getTime(),
				newX, newY,
				absDistX, absDistY;

			this.pointX		= point.pageX;
			this.pointY		= point.pageY;

			this.distX		+= deltaX;
			this.distY		+= deltaY;
			absDistX		= Math.abs(this.distX);
			absDistY		= Math.abs(this.distY);

			// We need to move at least 10 pixels for the scrolling to initiate
			if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
				return;
			}

			// If you are scrolling in one direction lock the other
			if ( !this.directionLocked && !this.options.freeScroll ) {
				if ( absDistX > absDistY + this.options.directionLockThreshold ) {
					this.directionLocked = 'h';		// lock horizontally
				} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
					this.directionLocked = 'v';		// lock vertically
				} else {
					this.directionLocked = 'n';		// no lock
				}
			}

			if ( this.directionLocked == 'h' ) {
				if ( this.options.eventPassthrough == 'vertical' ) {
					e.preventDefault();
				} else if ( this.options.eventPassthrough == 'horizontal' ) {
					this.initiated = false;
					return;
				}

				deltaY = 0;
			} else if ( this.directionLocked == 'v' ) {
				if ( this.options.eventPassthrough == 'horizontal' ) {
					e.preventDefault();
				} else if ( this.options.eventPassthrough == 'vertical' ) {
					this.initiated = false;
					return;
				}

				deltaX = 0;
			}

			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;

			newX = this.x + deltaX;
			newY = this.y + deltaY;

			// Slow down if outside of the boundaries
			if ( newX > 0 || newX < this.maxScrollX ) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
			}
			if ( newY > 0 || newY < this.maxScrollY ) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			}

			this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
			this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

			if ( !this.moved ) {
				this._execEvent('scrollStart');
			}

			this.moved = true;

			this._translate(newX, newY);

	/* REPLACE START: _move */
			if ( timestamp - this.startTime > 300 ) {
				this.startTime = timestamp;
				this.startX = this.x;
				this.startY = this.y;

				if ( this.options.probeType == 1 ) {
					this._execEvent('scroll');
				}
			}

			if ( this.options.probeType > 1 ) {
				this._execEvent('scroll');
			}
	/* REPLACE END: _move */

		},

		_end: function (e) {
			if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
				return;
			}

			if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
				e.preventDefault();
			}

			var point = e.changedTouches ? e.changedTouches[0] : e,
				momentumX,
				momentumY,
				duration = utils.getTime() - this.startTime,
				newX = Math.round(this.x),
				newY = Math.round(this.y),
				distanceX = Math.abs(newX - this.startX),
				distanceY = Math.abs(newY - this.startY),
				time = 0,
				easing = '';

			this.isInTransition = 0;
			this.initiated = 0;
			this.endTime = utils.getTime();

			// reset if we are outside of the boundaries
			if ( this.resetPosition(this.options.bounceTime) ) {
				return;
			}

			this.scrollTo(newX, newY);	// ensures that the last position is rounded

			// we scrolled less than 10 pixels
			if ( !this.moved ) {
				if ( this.options.tap ) {
					utils.tap(e, this.options.tap);
				}

				if ( this.options.click ) {
					utils.click(e);
				}

				this._execEvent('scrollCancel');
				return;
			}

			if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
				this._execEvent('flick');
				return;
			}

			// start momentum animation if needed
			if ( this.options.momentum && duration < 300 ) {
				momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
				momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = 1;
			}


			if ( this.options.snap ) {
				var snap = this._nearestSnap(newX, newY);
				this.currentPage = snap;
				time = this.options.snapSpeed || Math.max(
						Math.max(
							Math.min(Math.abs(newX - snap.x), 1000),
							Math.min(Math.abs(newY - snap.y), 1000)
						), 300);
				newX = snap.x;
				newY = snap.y;

				this.directionX = 0;
				this.directionY = 0;
				easing = this.options.bounceEasing;
			}

	// INSERT POINT: _end

			if ( newX != this.x || newY != this.y ) {
				// change easing function when scroller goes out of the boundaries
				if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
					easing = utils.ease.quadratic;
				}

				this.scrollTo(newX, newY, time, easing);
				return;
			}

			this._execEvent('scrollEnd');
		},

		_resize: function () {
			var that = this;

			clearTimeout(this.resizeTimeout);

			this.resizeTimeout = setTimeout(function () {
				that.refresh();
			}, this.options.resizePolling);
		},

		resetPosition: function (time) {
			var x = this.x,
				y = this.y;

			time = time || 0;

			if ( !this.hasHorizontalScroll || this.x > 0 ) {
				x = 0;
			} else if ( this.x < this.maxScrollX ) {
				x = this.maxScrollX;
			}

			if ( !this.hasVerticalScroll || this.y > 0 ) {
				y = 0;
			} else if ( this.y < this.maxScrollY ) {
				y = this.maxScrollY;
			}

			if ( x == this.x && y == this.y ) {
				return false;
			}

			this.scrollTo(x, y, time, this.options.bounceEasing);

			return true;
		},

		disable: function () {
			this.enabled = false;
		},

		enable: function () {
			this.enabled = true;
		},

		refresh: function () {
			var rf = this.wrapper.offsetHeight;		// Force reflow

			this.wrapperWidth	= this.wrapper.clientWidth;
			this.wrapperHeight	= this.wrapper.clientHeight;

	/* REPLACE START: refresh */

			this.scrollerWidth	= this.scroller.offsetWidth;
			this.scrollerHeight	= this.scroller.offsetHeight;

			this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
			this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

	/* REPLACE END: refresh */

			this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

			if ( !this.hasHorizontalScroll ) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}

			if ( !this.hasVerticalScroll ) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}

			this.endTime = 0;
			this.directionX = 0;
			this.directionY = 0;

			this.wrapperOffset = utils.offset(this.wrapper);

			this._execEvent('refresh');

			this.resetPosition();

	// INSERT POINT: _refresh

		},

		on: function (type, fn) {
			if ( !this._events[type] ) {
				this._events[type] = [];
			}

			this._events[type].push(fn);
		},

		off: function (type, fn) {
			if ( !this._events[type] ) {
				return;
			}

			var index = this._events[type].indexOf(fn);

			if ( index > -1 ) {
				this._events[type].splice(index, 1);
			}
		},

		_execEvent: function (type) {
			if ( !this._events[type] ) {
				return;
			}

			var i = 0,
				l = this._events[type].length;

			if ( !l ) {
				return;
			}

			for ( ; i < l; i++ ) {
				this._events[type][i].apply(this, [].slice.call(arguments, 1));
			}
		},

		scrollBy: function (x, y, time, easing) {
			x = this.x + x;
			y = this.y + y;
			time = time || 0;

			this.scrollTo(x, y, time, easing);
		},

		scrollTo: function (x, y, time, easing) {
			easing = easing || utils.ease.circular;

			this.isInTransition = this.options.useTransition && time > 0;
			var transitionType = this.options.useTransition && easing.style;
			if ( !time || transitionType ) {
					if(transitionType) {
						this._transitionTimingFunction(easing.style);
						this._transitionTime(time);
					}
				this._translate(x, y);
			} else {
				this._animate(x, y, time, easing.fn);
			}
		},

		scrollToElement: function (el, time, offsetX, offsetY, easing) {
			el = el.nodeType ? el : this.scroller.querySelector(el);

			if ( !el ) {
				return;
			}

			var pos = utils.offset(el);

			pos.left -= this.wrapperOffset.left;
			pos.top  -= this.wrapperOffset.top;

			// if offsetX/Y are true we center the element to the screen
			if ( offsetX === true ) {
				offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
			}
			if ( offsetY === true ) {
				offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
			}

			pos.left -= offsetX || 0;
			pos.top  -= offsetY || 0;

			pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
			pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

			time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

			this.scrollTo(pos.left, pos.top, time, easing);
		},

		_transitionTime: function (time) {
			time = time || 0;

			var durationProp = utils.style.transitionDuration;
			this.scrollerStyle[durationProp] = time + 'ms';

			if ( !time && utils.isBadAndroid ) {
				this.scrollerStyle[durationProp] = '0.0001ms';
				// remove 0.0001ms
				var self = this;
				rAF(function() {
					if(self.scrollerStyle[durationProp] === '0.0001ms') {
						self.scrollerStyle[durationProp] = '0s';
					}
				});
			}


			if ( this.indicators ) {
				for ( var i = this.indicators.length; i--; ) {
					this.indicators[i].transitionTime(time);
				}
			}


	// INSERT POINT: _transitionTime

		},

		_transitionTimingFunction: function (easing) {
			this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


			if ( this.indicators ) {
				for ( var i = this.indicators.length; i--; ) {
					this.indicators[i].transitionTimingFunction(easing);
				}
			}


	// INSERT POINT: _transitionTimingFunction

		},

		_translate: function (x, y) {
			if ( this.options.useTransform ) {

	/* REPLACE START: _translate */

				this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

	/* REPLACE END: _translate */

			} else {
				x = Math.round(x);
				y = Math.round(y);
				this.scrollerStyle.left = x + 'px';
				this.scrollerStyle.top = y + 'px';
			}

			this.x = x;
			this.y = y;


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].updatePosition();
			}
		}


	// INSERT POINT: _translate

		},

		_initEvents: function (remove) {
			var eventType = remove ? utils.removeEvent : utils.addEvent,
				target = this.options.bindToWrapper ? this.wrapper : window;

			eventType(window, 'orientationchange', this);
			eventType(window, 'resize', this);

			if ( this.options.click ) {
				eventType(this.wrapper, 'click', this, true);
			}

			if ( !this.options.disableMouse ) {
				eventType(this.wrapper, 'mousedown', this);
				eventType(target, 'mousemove', this);
				eventType(target, 'mousecancel', this);
				eventType(target, 'mouseup', this);
			}

			if ( utils.hasPointer && !this.options.disablePointer ) {
				eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
				eventType(target, utils.prefixPointerEvent('pointermove'), this);
				eventType(target, utils.prefixPointerEvent('pointercancel'), this);
				eventType(target, utils.prefixPointerEvent('pointerup'), this);
			}

			if ( utils.hasTouch && !this.options.disableTouch ) {
				eventType(this.wrapper, 'touchstart', this);
				eventType(target, 'touchmove', this);
				eventType(target, 'touchcancel', this);
				eventType(target, 'touchend', this);
			}

			eventType(this.scroller, 'transitionend', this);
			eventType(this.scroller, 'webkitTransitionEnd', this);
			eventType(this.scroller, 'oTransitionEnd', this);
			eventType(this.scroller, 'MSTransitionEnd', this);
		},

		getComputedPosition: function () {
			var matrix = window.getComputedStyle(this.scroller, null),
				x, y;

			if ( this.options.useTransform ) {
				matrix = matrix[utils.style.transform].split(')')[0].split(', ');
				x = +(matrix[12] || matrix[4]);
				y = +(matrix[13] || matrix[5]);
			} else {
				x = +matrix.left.replace(/[^-\d.]/g, '');
				y = +matrix.top.replace(/[^-\d.]/g, '');
			}

			return { x: x, y: y };
		},
		_initIndicators: function () {
			var interactive = this.options.interactiveScrollbars,
				customStyle = typeof this.options.scrollbars != 'string',
				indicators = [],
				indicator;

			var that = this;

			this.indicators = [];

			if ( this.options.scrollbars ) {
				// Vertical scrollbar
				if ( this.options.scrollY ) {
					indicator = {
						el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenX: false
					};

					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator);
				}

				// Horizontal scrollbar
				if ( this.options.scrollX ) {
					indicator = {
						el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
						interactive: interactive,
						defaultScrollbars: true,
						customStyle: customStyle,
						resize: this.options.resizeScrollbars,
						shrink: this.options.shrinkScrollbars,
						fade: this.options.fadeScrollbars,
						listenY: false
					};

					this.wrapper.appendChild(indicator.el);
					indicators.push(indicator);
				}
			}

			if ( this.options.indicators ) {
				// TODO: check concat compatibility
				indicators = indicators.concat(this.options.indicators);
			}

			for ( var i = indicators.length; i--; ) {
				this.indicators.push( new Indicator(this, indicators[i]) );
			}

			// TODO: check if we can use array.map (wide compatibility and performance issues)
			function _indicatorsMap (fn) {
				if (that.indicators) {
					for ( var i = that.indicators.length; i--; ) {
						fn.call(that.indicators[i]);
					}
				}
			}

			if ( this.options.fadeScrollbars ) {
				this.on('scrollEnd', function () {
					_indicatorsMap(function () {
						this.fade();
					});
				});

				this.on('scrollCancel', function () {
					_indicatorsMap(function () {
						this.fade();
					});
				});

				this.on('scrollStart', function () {
					_indicatorsMap(function () {
						this.fade(1);
					});
				});

				this.on('beforeScrollStart', function () {
					_indicatorsMap(function () {
						this.fade(1, true);
					});
				});
			}


			this.on('refresh', function () {
				_indicatorsMap(function () {
					this.refresh();
				});
			});

			this.on('destroy', function () {
				_indicatorsMap(function () {
					this.destroy();
				});

				delete this.indicators;
			});
		},

		_initWheel: function () {
			utils.addEvent(this.wrapper, 'wheel', this);
			utils.addEvent(this.wrapper, 'mousewheel', this);
			utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

			this.on('destroy', function () {
				clearTimeout(this.wheelTimeout);
				this.wheelTimeout = null;
				utils.removeEvent(this.wrapper, 'wheel', this);
				utils.removeEvent(this.wrapper, 'mousewheel', this);
				utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
			});
		},

		_wheel: function (e) {
			if ( !this.enabled ) {
				return;
			}

			e.preventDefault();

			var wheelDeltaX, wheelDeltaY,
				newX, newY,
				that = this;

			if ( this.wheelTimeout === undefined ) {
				that._execEvent('scrollStart');
			}

			// Execute the scrollEnd event after 400ms the wheel stopped scrolling
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = setTimeout(function () {
				if(!that.options.snap) {
					that._execEvent('scrollEnd');
				}
				that.wheelTimeout = undefined;
			}, 400);

			if ( 'deltaX' in e ) {
				if (e.deltaMode === 1) {
					wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
					wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
				} else {
					wheelDeltaX = -e.deltaX;
					wheelDeltaY = -e.deltaY;
				}
			} else if ( 'wheelDeltaX' in e ) {
				wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
				wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
			} else if ( 'wheelDelta' in e ) {
				wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
			} else if ( 'detail' in e ) {
				wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
			} else {
				return;
			}

			wheelDeltaX *= this.options.invertWheelDirection;
			wheelDeltaY *= this.options.invertWheelDirection;

			if ( !this.hasVerticalScroll ) {
				wheelDeltaX = wheelDeltaY;
				wheelDeltaY = 0;
			}

			if ( this.options.snap ) {
				newX = this.currentPage.pageX;
				newY = this.currentPage.pageY;

				if ( wheelDeltaX > 0 ) {
					newX--;
				} else if ( wheelDeltaX < 0 ) {
					newX++;
				}

				if ( wheelDeltaY > 0 ) {
					newY--;
				} else if ( wheelDeltaY < 0 ) {
					newY++;
				}

				this.goToPage(newX, newY);

				return;
			}

			newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
			newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

			this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
			this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

			if ( newX > 0 ) {
				newX = 0;
			} else if ( newX < this.maxScrollX ) {
				newX = this.maxScrollX;
			}

			if ( newY > 0 ) {
				newY = 0;
			} else if ( newY < this.maxScrollY ) {
				newY = this.maxScrollY;
			}

			this.scrollTo(newX, newY, 0);

			if ( this.options.probeType > 1 ) {
				this._execEvent('scroll');
			}

	// INSERT POINT: _wheel
		},

		_initSnap: function () {
			this.currentPage = {};

			if ( typeof this.options.snap == 'string' ) {
				this.options.snap = this.scroller.querySelectorAll(this.options.snap);
			}

			this.on('refresh', function () {
				var i = 0, l,
					m = 0, n,
					cx, cy,
					x = 0, y,
					stepX = this.options.snapStepX || this.wrapperWidth,
					stepY = this.options.snapStepY || this.wrapperHeight,
					el;

				this.pages = [];

				if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
					return;
				}

				if ( this.options.snap === true ) {
					cx = Math.round( stepX / 2 );
					cy = Math.round( stepY / 2 );

					while ( x > -this.scrollerWidth ) {
						this.pages[i] = [];
						l = 0;
						y = 0;

						while ( y > -this.scrollerHeight ) {
							this.pages[i][l] = {
								x: Math.max(x, this.maxScrollX),
								y: Math.max(y, this.maxScrollY),
								width: stepX,
								height: stepY,
								cx: x - cx,
								cy: y - cy
							};

							y -= stepY;
							l++;
						}

						x -= stepX;
						i++;
					}
				} else {
					el = this.options.snap;
					l = el.length;
					n = -1;

					for ( ; i < l; i++ ) {
						if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
							m = 0;
							n++;
						}

						if ( !this.pages[m] ) {
							this.pages[m] = [];
						}

						x = Math.max(-el[i].offsetLeft, this.maxScrollX);
						y = Math.max(-el[i].offsetTop, this.maxScrollY);
						cx = x - Math.round(el[i].offsetWidth / 2);
						cy = y - Math.round(el[i].offsetHeight / 2);

						this.pages[m][n] = {
							x: x,
							y: y,
							width: el[i].offsetWidth,
							height: el[i].offsetHeight,
							cx: cx,
							cy: cy
						};

						if ( x > this.maxScrollX ) {
							m++;
						}
					}
				}

				this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

				// Update snap threshold if needed
				if ( this.options.snapThreshold % 1 === 0 ) {
					this.snapThresholdX = this.options.snapThreshold;
					this.snapThresholdY = this.options.snapThreshold;
				} else {
					this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
					this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
				}
			});

			this.on('flick', function () {
				var time = this.options.snapSpeed || Math.max(
						Math.max(
							Math.min(Math.abs(this.x - this.startX), 1000),
							Math.min(Math.abs(this.y - this.startY), 1000)
						), 300);

				this.goToPage(
					this.currentPage.pageX + this.directionX,
					this.currentPage.pageY + this.directionY,
					time
				);
			});
		},

		_nearestSnap: function (x, y) {
			if ( !this.pages.length ) {
				return { x: 0, y: 0, pageX: 0, pageY: 0 };
			}

			var i = 0,
				l = this.pages.length,
				m = 0;

			// Check if we exceeded the snap threshold
			if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
				Math.abs(y - this.absStartY) < this.snapThresholdY ) {
				return this.currentPage;
			}

			if ( x > 0 ) {
				x = 0;
			} else if ( x < this.maxScrollX ) {
				x = this.maxScrollX;
			}

			if ( y > 0 ) {
				y = 0;
			} else if ( y < this.maxScrollY ) {
				y = this.maxScrollY;
			}

			for ( ; i < l; i++ ) {
				if ( x >= this.pages[i][0].cx ) {
					x = this.pages[i][0].x;
					break;
				}
			}

			l = this.pages[i].length;

			for ( ; m < l; m++ ) {
				if ( y >= this.pages[0][m].cy ) {
					y = this.pages[0][m].y;
					break;
				}
			}

			if ( i == this.currentPage.pageX ) {
				i += this.directionX;

				if ( i < 0 ) {
					i = 0;
				} else if ( i >= this.pages.length ) {
					i = this.pages.length - 1;
				}

				x = this.pages[i][0].x;
			}

			if ( m == this.currentPage.pageY ) {
				m += this.directionY;

				if ( m < 0 ) {
					m = 0;
				} else if ( m >= this.pages[0].length ) {
					m = this.pages[0].length - 1;
				}

				y = this.pages[0][m].y;
			}

			return {
				x: x,
				y: y,
				pageX: i,
				pageY: m
			};
		},

		goToPage: function (x, y, time, easing) {
			easing = easing || this.options.bounceEasing;

			if ( x >= this.pages.length ) {
				x = this.pages.length - 1;
			} else if ( x < 0 ) {
				x = 0;
			}

			if ( y >= this.pages[x].length ) {
				y = this.pages[x].length - 1;
			} else if ( y < 0 ) {
				y = 0;
			}

			var posX = this.pages[x][y].x,
				posY = this.pages[x][y].y;

			time = time === undefined ? this.options.snapSpeed || Math.max(
				Math.max(
					Math.min(Math.abs(posX - this.x), 1000),
					Math.min(Math.abs(posY - this.y), 1000)
				), 300) : time;

			this.currentPage = {
				x: posX,
				y: posY,
				pageX: x,
				pageY: y
			};

			this.scrollTo(posX, posY, time, easing);
		},

		next: function (time, easing) {
			var x = this.currentPage.pageX,
				y = this.currentPage.pageY;

			x++;

			if ( x >= this.pages.length && this.hasVerticalScroll ) {
				x = 0;
				y++;
			}

			this.goToPage(x, y, time, easing);
		},

		prev: function (time, easing) {
			var x = this.currentPage.pageX,
				y = this.currentPage.pageY;

			x--;

			if ( x < 0 && this.hasVerticalScroll ) {
				x = 0;
				y--;
			}

			this.goToPage(x, y, time, easing);
		},

		_initKeys: function (e) {
			// default key bindings
			var keys = {
				pageUp: 33,
				pageDown: 34,
				end: 35,
				home: 36,
				left: 37,
				up: 38,
				right: 39,
				down: 40
			};
			var i;

			// if you give me characters I give you keycode
			if ( typeof this.options.keyBindings == 'object' ) {
				for ( i in this.options.keyBindings ) {
					if ( typeof this.options.keyBindings[i] == 'string' ) {
						this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
					}
				}
			} else {
				this.options.keyBindings = {};
			}

			for ( i in keys ) {
				this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
			}

			utils.addEvent(window, 'keydown', this);

			this.on('destroy', function () {
				utils.removeEvent(window, 'keydown', this);
			});
		},

		_key: function (e) {
			if ( !this.enabled ) {
				return;
			}

			var snap = this.options.snap,	// we are using this alot, better to cache it
				newX = snap ? this.currentPage.pageX : this.x,
				newY = snap ? this.currentPage.pageY : this.y,
				now = utils.getTime(),
				prevTime = this.keyTime || 0,
				acceleration = 0.250,
				pos;

			if ( this.options.useTransition && this.isInTransition ) {
				pos = this.getComputedPosition();

				this._translate(Math.round(pos.x), Math.round(pos.y));
				this.isInTransition = false;
			}

			this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

			switch ( e.keyCode ) {
				case this.options.keyBindings.pageUp:
					if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
						newX += snap ? 1 : this.wrapperWidth;
					} else {
						newY += snap ? 1 : this.wrapperHeight;
					}
					break;
				case this.options.keyBindings.pageDown:
					if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
						newX -= snap ? 1 : this.wrapperWidth;
					} else {
						newY -= snap ? 1 : this.wrapperHeight;
					}
					break;
				case this.options.keyBindings.end:
					newX = snap ? this.pages.length-1 : this.maxScrollX;
					newY = snap ? this.pages[0].length-1 : this.maxScrollY;
					break;
				case this.options.keyBindings.home:
					newX = 0;
					newY = 0;
					break;
				case this.options.keyBindings.left:
					newX += snap ? -1 : 5 + this.keyAcceleration>>0;
					break;
				case this.options.keyBindings.up:
					newY += snap ? 1 : 5 + this.keyAcceleration>>0;
					break;
				case this.options.keyBindings.right:
					newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
					break;
				case this.options.keyBindings.down:
					newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
					break;
				default:
					return;
			}

			if ( snap ) {
				this.goToPage(newX, newY);
				return;
			}

			if ( newX > 0 ) {
				newX = 0;
				this.keyAcceleration = 0;
			} else if ( newX < this.maxScrollX ) {
				newX = this.maxScrollX;
				this.keyAcceleration = 0;
			}

			if ( newY > 0 ) {
				newY = 0;
				this.keyAcceleration = 0;
			} else if ( newY < this.maxScrollY ) {
				newY = this.maxScrollY;
				this.keyAcceleration = 0;
			}

			this.scrollTo(newX, newY, 0);

			this.keyTime = now;
		},

		_animate: function (destX, destY, duration, easingFn) {
			var that = this,
				startX = this.x,
				startY = this.y,
				startTime = utils.getTime(),
				destTime = startTime + duration;

			function step () {
				var now = utils.getTime(),
					newX, newY,
					easing;

				if ( now >= destTime ) {
					that.isAnimating = false;
					that._translate(destX, destY);
					
					if ( !that.resetPosition(that.options.bounceTime) ) {
						that._execEvent('scrollEnd');
					}

					return;
				}

				now = ( now - startTime ) / duration;
				easing = easingFn(now);
				newX = ( destX - startX ) * easing + startX;
				newY = ( destY - startY ) * easing + startY;
				that._translate(newX, newY);

				if ( that.isAnimating ) {
					rAF(step);
				}

				if ( that.options.probeType == 3 ) {
					that._execEvent('scroll');
				}
			}

			this.isAnimating = true;
			step();
		},

		handleEvent: function (e) {
			switch ( e.type ) {
				case 'touchstart':
				case 'pointerdown':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'pointermove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'pointerup':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'pointercancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
				case 'orientationchange':
				case 'resize':
					this._resize();
					break;
				case 'transitionend':
				case 'webkitTransitionEnd':
				case 'oTransitionEnd':
				case 'MSTransitionEnd':
					this._transitionEnd(e);
					break;
				case 'wheel':
				case 'DOMMouseScroll':
				case 'mousewheel':
					this._wheel(e);
					break;
				case 'keydown':
					this._key(e);
					break;
				case 'click':
					if ( this.enabled && !e._constructed ) {
						e.preventDefault();
						e.stopPropagation();
					}
					break;
			}
		}
	};
	function createDefaultScrollbar (direction, interactive, type) {
		var scrollbar = document.createElement('div'),
			indicator = document.createElement('div');

		if ( type === true ) {
			scrollbar.style.cssText = 'position:absolute;z-index:9999';
			indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
		}

		indicator.className = 'iScrollIndicator';

		if ( direction == 'h' ) {
			if ( type === true ) {
				scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
				indicator.style.height = '100%';
			}
			scrollbar.className = 'iScrollHorizontalScrollbar';
		} else {
			if ( type === true ) {
				scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
				indicator.style.width = '100%';
			}
			scrollbar.className = 'iScrollVerticalScrollbar';
		}

		scrollbar.style.cssText += ';overflow:hidden';

		if ( !interactive ) {
			scrollbar.style.pointerEvents = 'none';
		}

		scrollbar.appendChild(indicator);

		return scrollbar;
	}

	function Indicator (scroller, options) {
		this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;

		this.options = {
			listenX: true,
			listenY: true,
			interactive: false,
			resize: true,
			defaultScrollbars: false,
			shrink: false,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		};

		for ( var i in options ) {
			this.options[i] = options[i];
		}

		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;

		if ( this.options.interactive ) {
			if ( !this.options.disableTouch ) {
				utils.addEvent(this.indicator, 'touchstart', this);
				utils.addEvent(window, 'touchend', this);
			}
			if ( !this.options.disablePointer ) {
				utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
			}
			if ( !this.options.disableMouse ) {
				utils.addEvent(this.indicator, 'mousedown', this);
				utils.addEvent(window, 'mouseup', this);
			}
		}

		if ( this.options.fade ) {
			this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
			var durationProp = utils.style.transitionDuration;
			this.wrapperStyle[durationProp] = utils.isBadAndroid ? '0.0001ms' : '0ms';
			// remove 0.0001ms
			var self = this;
			if(utils.isBadAndroid) {
				rAF(function() {
					if(self.wrapperStyle[durationProp] === '0.0001ms') {
						self.wrapperStyle[durationProp] = '0s';
					}
				});
			}
			this.wrapperStyle.opacity = '0';
		}
	}

	Indicator.prototype = {
		handleEvent: function (e) {
			switch ( e.type ) {
				case 'touchstart':
				case 'pointerdown':
				case 'MSPointerDown':
				case 'mousedown':
					this._start(e);
					break;
				case 'touchmove':
				case 'pointermove':
				case 'MSPointerMove':
				case 'mousemove':
					this._move(e);
					break;
				case 'touchend':
				case 'pointerup':
				case 'MSPointerUp':
				case 'mouseup':
				case 'touchcancel':
				case 'pointercancel':
				case 'MSPointerCancel':
				case 'mousecancel':
					this._end(e);
					break;
			}
		},

		destroy: function () {
			if ( this.options.fadeScrollbars ) {
				clearTimeout(this.fadeTimeout);
				this.fadeTimeout = null;
			}
			if ( this.options.interactive ) {
				utils.removeEvent(this.indicator, 'touchstart', this);
				utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
				utils.removeEvent(this.indicator, 'mousedown', this);

				utils.removeEvent(window, 'touchmove', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
				utils.removeEvent(window, 'mousemove', this);

				utils.removeEvent(window, 'touchend', this);
				utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
				utils.removeEvent(window, 'mouseup', this);
			}

			if ( this.options.defaultScrollbars ) {
				this.wrapper.parentNode.removeChild(this.wrapper);
			}
		},

		_start: function (e) {
			var point = e.touches ? e.touches[0] : e;

			e.preventDefault();
			e.stopPropagation();

			this.transitionTime();

			this.initiated = true;
			this.moved = false;
			this.lastPointX	= point.pageX;
			this.lastPointY	= point.pageY;

			this.startTime	= utils.getTime();

			if ( !this.options.disableTouch ) {
				utils.addEvent(window, 'touchmove', this);
			}
			if ( !this.options.disablePointer ) {
				utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
			}
			if ( !this.options.disableMouse ) {
				utils.addEvent(window, 'mousemove', this);
			}

			this.scroller._execEvent('beforeScrollStart');
		},

		_move: function (e) {
			var point = e.touches ? e.touches[0] : e,
				deltaX, deltaY,
				newX, newY,
				timestamp = utils.getTime();

			if ( !this.moved ) {
				this.scroller._execEvent('scrollStart');
			}

			this.moved = true;

			deltaX = point.pageX - this.lastPointX;
			this.lastPointX = point.pageX;

			deltaY = point.pageY - this.lastPointY;
			this.lastPointY = point.pageY;

			newX = this.x + deltaX;
			newY = this.y + deltaY;

			this._pos(newX, newY);


			if ( this.scroller.options.probeType == 1 && timestamp - this.startTime > 300 ) {
				this.startTime = timestamp;
				this.scroller._execEvent('scroll');
			} else if ( this.scroller.options.probeType > 1 ) {
				this.scroller._execEvent('scroll');
			}


	// INSERT POINT: indicator._move

			e.preventDefault();
			e.stopPropagation();
		},

		_end: function (e) {
			if ( !this.initiated ) {
				return;
			}

			this.initiated = false;

			e.preventDefault();
			e.stopPropagation();

			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
			utils.removeEvent(window, 'mousemove', this);

			if ( this.scroller.options.snap ) {
				var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

				var time = this.options.snapSpeed || Math.max(
						Math.max(
							Math.min(Math.abs(this.scroller.x - snap.x), 1000),
							Math.min(Math.abs(this.scroller.y - snap.y), 1000)
						), 300);

				if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
					this.scroller.directionX = 0;
					this.scroller.directionY = 0;
					this.scroller.currentPage = snap;
					this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
				}
			}

			if ( this.moved ) {
				this.scroller._execEvent('scrollEnd');
			}
		},

		transitionTime: function (time) {
			time = time || 0;
			var durationProp = utils.style.transitionDuration;
			this.indicatorStyle[durationProp] = time + 'ms';

			if ( !time && utils.isBadAndroid ) {
				this.indicatorStyle[durationProp] = '0.0001ms';
				// remove 0.0001ms
				var self = this;
				rAF(function() {
					if(self.indicatorStyle[durationProp] === '0.0001ms') {
						self.indicatorStyle[durationProp] = '0s';
					}
				});
			}
		},

		transitionTimingFunction: function (easing) {
			this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
		},

		refresh: function () {
			this.transitionTime();

			if ( this.options.listenX && !this.options.listenY ) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
			} else if ( this.options.listenY && !this.options.listenX ) {
				this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
			} else {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
			}

			if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
				utils.addClass(this.wrapper, 'iScrollBothScrollbars');
				utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

				if ( this.options.defaultScrollbars && this.options.customStyle ) {
					if ( this.options.listenX ) {
						this.wrapper.style.right = '8px';
					} else {
						this.wrapper.style.bottom = '8px';
					}
				}
			} else {
				utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
				utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

				if ( this.options.defaultScrollbars && this.options.customStyle ) {
					if ( this.options.listenX ) {
						this.wrapper.style.right = '2px';
					} else {
						this.wrapper.style.bottom = '2px';
					}
				}
			}

			var r = this.wrapper.offsetHeight;	// force refresh

			if ( this.options.listenX ) {
				this.wrapperWidth = this.wrapper.clientWidth;
				if ( this.options.resize ) {
					this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
					this.indicatorStyle.width = this.indicatorWidth + 'px';
				} else {
					this.indicatorWidth = this.indicator.clientWidth;
				}

				this.maxPosX = this.wrapperWidth - this.indicatorWidth;

				if ( this.options.shrink == 'clip' ) {
					this.minBoundaryX = -this.indicatorWidth + 8;
					this.maxBoundaryX = this.wrapperWidth - 8;
				} else {
					this.minBoundaryX = 0;
					this.maxBoundaryX = this.maxPosX;
				}

				this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
			}

			if ( this.options.listenY ) {
				this.wrapperHeight = this.wrapper.clientHeight;
				if ( this.options.resize ) {
					this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
					this.indicatorStyle.height = this.indicatorHeight + 'px';
				} else {
					this.indicatorHeight = this.indicator.clientHeight;
				}

				this.maxPosY = this.wrapperHeight - this.indicatorHeight;

				if ( this.options.shrink == 'clip' ) {
					this.minBoundaryY = -this.indicatorHeight + 8;
					this.maxBoundaryY = this.wrapperHeight - 8;
				} else {
					this.minBoundaryY = 0;
					this.maxBoundaryY = this.maxPosY;
				}

				this.maxPosY = this.wrapperHeight - this.indicatorHeight;
				this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
			}

			this.updatePosition();
		},

		updatePosition: function () {
			var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

			if ( !this.options.ignoreBoundaries ) {
				if ( x < this.minBoundaryX ) {
					if ( this.options.shrink == 'scale' ) {
						this.width = Math.max(this.indicatorWidth + x, 8);
						this.indicatorStyle.width = this.width + 'px';
					}
					x = this.minBoundaryX;
				} else if ( x > this.maxBoundaryX ) {
					if ( this.options.shrink == 'scale' ) {
						this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
						this.indicatorStyle.width = this.width + 'px';
						x = this.maxPosX + this.indicatorWidth - this.width;
					} else {
						x = this.maxBoundaryX;
					}
				} else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
					this.width = this.indicatorWidth;
					this.indicatorStyle.width = this.width + 'px';
				}

				if ( y < this.minBoundaryY ) {
					if ( this.options.shrink == 'scale' ) {
						this.height = Math.max(this.indicatorHeight + y * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
					}
					y = this.minBoundaryY;
				} else if ( y > this.maxBoundaryY ) {
					if ( this.options.shrink == 'scale' ) {
						this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
						this.indicatorStyle.height = this.height + 'px';
						y = this.maxPosY + this.indicatorHeight - this.height;
					} else {
						y = this.maxBoundaryY;
					}
				} else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
					this.height = this.indicatorHeight;
					this.indicatorStyle.height = this.height + 'px';
				}
			}

			this.x = x;
			this.y = y;

			if ( this.scroller.options.useTransform ) {
				this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
			} else {
				this.indicatorStyle.left = x + 'px';
				this.indicatorStyle.top = y + 'px';
			}
		},

		_pos: function (x, y) {
			if ( x < 0 ) {
				x = 0;
			} else if ( x > this.maxPosX ) {
				x = this.maxPosX;
			}

			if ( y < 0 ) {
				y = 0;
			} else if ( y > this.maxPosY ) {
				y = this.maxPosY;
			}

			x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
			y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

			this.scroller.scrollTo(x, y);
		},

		fade: function (val, hold) {
			if ( hold && !this.visible ) {
				return;
			}

			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;

			var time = val ? 250 : 500,
				delay = val ? 0 : 300;

			val = val ? '1' : '0';

			this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

			this.fadeTimeout = setTimeout((function (val) {
				this.wrapperStyle.opacity = val;
				this.visible = +val;
			}).bind(this, val), delay);
		}
	};

	IScroll.utils = utils;

	if ( typeof module != 'undefined' && module.exports ) {
		module.exports = IScroll;
	} else if ( true ) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return IScroll; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.IScroll = IScroll;
	}

	})(window, document, Math);


/***/ },
/* 111 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"wrapper\" :style=\"{bottom: bottomHeight}\">\n\t<div class=\"scroller\">\n\t\t<slot></slot>\n\t\t<slot name=\"pulldown\"></slot>\n\t\t<slot name=\"pullup\"></slot>\n\t</div>\n</div>\n";

/***/ },
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(138)
	__vue_script__ = __webpack_require__(140)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] easierScene\\component\\main.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(176)
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
	  var id = "_v-227e13f0/main.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(139);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./main.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./main.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports


	// module
	exports.push([module.id, ".activity-main {\n  position: relative;\n  height: 100%;\n  width: 100%; }\n  .activity-main .container-content {\n    background-color: #e9e9e9;\n    height: 100%;\n    position: relative;\n    padding-top: 65px;\n    padding-bottom: 0px;\n    box-sizing: border-box; }\n    .activity-main .container-content ul {\n      list-style: none;\n      margin: 0;\n      padding: 0; }\n", ""]);

	// exports


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _activityList = __webpack_require__(141);

	var _activityList2 = _interopRequireDefault(_activityList);

	var _mainHeader = __webpack_require__(164);

	var _mainHeader2 = _interopRequireDefault(_mainHeader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: {
			activityList: _activityList2.default,
			mainHeader: _mainHeader2.default
		},
		data: function data() {
			return {
				btnHeight: '0',
				scroller: {}
			};
		},
		ready: function ready() {},
		created: function created() {},

		methods: {}
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(142)
	__vue_script__ = __webpack_require__(149)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] easierScene\\component\\activity-list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(163)
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
	  var id = "_v-43457e46/activity-list.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(143);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./activity-list.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./activity-list.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports


	// module
	exports.push([module.id, ".morefun-transition {\n  -webkit-transition: all .3s ease;\n  transition: all .3s ease;\n  height: 445px !important;\n  overflow: hidden; }\n\n.morefun-enter,\n.morefun-leave {\n  height: 0 !important; }\n\n.moreeditgo {\n  top: 268px !important; }\n  .moreeditgo:after {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n    bottom: 7px !important; }\n  .moreeditgo:before {\n    -webkit-transform: rotate(180deg);\n            transform: rotate(180deg);\n    bottom: 14px !important; }\n\n.moreeditback {\n  top: 24px !important; }\n  .moreeditback:after, .moreeditback:before {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n\n.activity-list {\n  width: 1152px;\n  height: 100%;\n  padding: 0px 100px;\n  position: relative;\n  margin: 0 auto; }\n  .activity-list .scroll-view {\n    width: 100%;\n    height: 100%;\n    position: relative; }\n    .activity-list .scroll-view .wrapper {\n      overflow: inherit; }\n    .activity-list .scroll-view ul li {\n      position: relative;\n      margin-top: 15px;\n      font-size: 0; }\n      .activity-list .scroll-view ul li .more-edit {\n        font-size: 16px;\n        width: 48px;\n        height: 130px;\n        border-radius: 5px 0px 0px 5px;\n        position: absolute;\n        background-color: rgba(0, 0, 0, 0.2);\n        left: -48px;\n        color: white;\n        top: 24px;\n        font-family: 'Glyphicons Halflings';\n        font-style: normal;\n        font-weight: normal;\n        -webkit-transition: all 0.3s;\n        transition: all 0.3s;\n        -webkit-font-smoothing: antialiased; }\n        .activity-list .scroll-view ul li .more-edit p {\n          width: 10px;\n          height: 30px;\n          line-height: 1.3;\n          margin: 10px auto; }\n        .activity-list .scroll-view ul li .more-edit:after, .activity-list .scroll-view ul li .more-edit:before {\n          content: \"\\E259\";\n          position: absolute;\n          display: inline-block;\n          width: 16px;\n          height: 16px;\n          color: #fff;\n          bottom: 25px;\n          left: 19px;\n          -webkit-transition: all 0.3s;\n          transition: all 0.3s; }\n        .activity-list .scroll-view ul li .more-edit:after {\n          bottom: 19px; }\n      .activity-list .scroll-view ul li .left {\n        font-size: 12px;\n        position: relative;\n        display: inline-block;\n        vertical-align: top;\n        width: 757px;\n        height: 190px;\n        border-radius: 10px 0px 0px 10px;\n        background: -webkit-linear-gradient(left, #419ce9, #3981be);\n        background: linear-gradient(left, #419ce9, #3981be); }\n        .activity-list .scroll-view ul li .left .name {\n          font-size: 24px;\n          color: white;\n          padding: 25px; }\n          .activity-list .scroll-view ul li .left .name i {\n            height: 21px;\n            width: 18px;\n            display: inline-block;\n            margin-left: 5px;\n            background: url(" + __webpack_require__(144) + ");\n            background-repeat: no-repeat; }\n        .activity-list .scroll-view ul li .left .bottom {\n          position: absolute;\n          bottom: 13px;\n          left: 25px; }\n          .activity-list .scroll-view ul li .left .bottom .msg-list:after {\n            display: block;\n            content: '';\n            height: 15px;\n            width: 22px;\n            background: url(" + __webpack_require__(145) + ");\n            position: absolute;\n            background-repeat: no-repeat;\n            top: 13px;\n            left: -16px; }\n          .activity-list .scroll-view ul li .left .bottom .user-list {\n            margin-left: 25px; }\n            .activity-list .scroll-view ul li .left .bottom .user-list:after {\n              display: block;\n              content: '';\n              height: 15px;\n              width: 22px;\n              position: absolute;\n              top: 13px;\n              left: -25px;\n              background: url(" + __webpack_require__(146) + ");\n              background-repeat: no-repeat; }\n          .activity-list .scroll-view ul li .left .bottom a {\n            display: inline-block;\n            position: relative;\n            color: #92e7ff;\n            text-decoration: none;\n            cursor: pointer;\n            font-size: 12px;\n            margin-right: 46px; }\n            .activity-list .scroll-view ul li .left .bottom a:hover {\n              color: #92e7ff;\n              text-decoration: none; }\n            .activity-list .scroll-view ul li .left .bottom a span {\n              font-size: 24px;\n              color: white;\n              margin-left: 10px; }\n      .activity-list .scroll-view ul li .right {\n        font-size: 12px;\n        width: 191px;\n        height: 190px;\n        display: inline-block;\n        border-radius: 0px 10px 10px 0px;\n        background-color: #fff; }\n        .activity-list .scroll-view ul li .right .qrcode:after {\n          background: url(" + __webpack_require__(147) + "); }\n        .activity-list .scroll-view ul li .right div {\n          cursor: pointer;\n          height: 50%;\n          width: 100%;\n          position: relative;\n          box-sizing: border-box;\n          padding-top: 62px;\n          text-align: center; }\n          .activity-list .scroll-view ul li .right div a {\n            text-decoration: none;\n            display: block;\n            width: 100%;\n            height: 100%;\n            color: #000000; }\n          .activity-list .scroll-view ul li .right div:after {\n            position: absolute;\n            display: block;\n            content: '';\n            background-repeat: no-repeat;\n            height: 40px;\n            width: 40px;\n            left: 50%;\n            top: 15px;\n            -webkit-transform: translate(-50%);\n                    transform: translate(-50%); }\n        .activity-list .scroll-view ul li .right .big-screen:after {\n          background: url(" + __webpack_require__(148) + "); }\n", ""]);

	// exports


/***/ },
/* 144 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAAHzZY3hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZDNmYjEwNi1kMGJkLWFmNDEtYjNkNC1mZDViN2Q5YWZhNmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjZGQUZBOUZDN0YxMTFFNkI2RjhENEE1NTlEMjMzMkMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjZGQUZBOUVDN0YxMTFFNkI2RjhENEE1NTlEMjMzMkMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNzMwMTI4YS0zYmZiLWQ2NDQtOTk3NC1iZGMxNzI1MjcyOWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5MjJjZmMzNi00NDEzLTExZTYtYTY1MS1kY2RhNGQwZTVkY2UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz56w0A+AAABZklEQVR42mKc9Pw/AwgwMUDAfxBDDYgZAQKIEV0KwQAIILgUFITDZKYDsSAQrwQIIHQVDSxInP/Ihv2GmQkSaAdikEpGmIp9MA4IAAQQuqEM6Gay4JJAtgMG3iNJotiJrEsNKvGXAUnlZShbAIhvoVm3DCCA8DmyCIj7mBhwg15YDKADd6ibxEBWoHvTGoh3QNlbgdgM2QQtID4CZZ8ASSJ70xiIr0LZd4DYEj2qmaH0UyBWRbYTpCAEiE8CsToQy6C7GOTIDOTYw6bAGS2CkAEjQIDhC0lsgA2Ia4G4BpYYmUjQXAbE9UA8CYh/QcUyiTHACeqFTiCuAuJX0GQMChRGFjwajYD4NHKugoJDoOyCHEjoQB6a7NjQxM9DDWVAjydkMBeIH6BpfgjE3Ng0IxvABfWnDTROD0HFQRGvAMTf8MUzA9SvMAOnALEfEH8kJmpgBmgzkAlABkwDYkU8qQ0X2AvKlQBgUEeC/r2/5gAAAABJRU5ErkJggg=="

/***/ },
/* 145 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAAGjE87iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZDNmYjEwNi1kMGJkLWFmNDEtYjNkNC1mZDViN2Q5YWZhNmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTc3RkFBMTZDN0YxMTFFNkIxQzE5MTUxOEQ0MEM1MDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTc3RkFBMTVDN0YxMTFFNkIxQzE5MTUxOEQ0MEM1MDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNzMwMTI4YS0zYmZiLWQ2NDQtOTk3NC1iZGMxNzI1MjcyOWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5MjJjZmMzNi00NDEzLTExZTYtYTY1MS1kY2RhNGQwZTVkY2UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz65aONMAAABnUlEQVR42mL4//8/w6Tn/1uYGCCgGiCAQLwLIFGQiP7kFwz/AQKIESjyAsgRAeJaIN7MlCvBIAFk8ANxGxALAAQQSA8PEP+C6WsB4hyQXhYgIx9qdApIHyOQ8RyI5wAEEMhUkImvGVDBK6AicZAZu5Ak7wDxYyAWA5ppyAiyBWQ4UKAOiB8A8U0g3g3EfAwgSWwYaJ0lQADBdDYDVRYD8X0gNgDa9xtkB8hB/xkwAQtQwV9Y8KRAvQwChUC8B2iaGQtUoByIOaHsIpAfgfgkSOcxIFYFYhmopCwQdwPxL5DOYCC+DMTZQPwN5A4ofQ7sWhAA2lEFpFphLgIHIw4/uoJogACD+dMMqHgDEEsyYAf3gNgdaNodmAATUNNMkKvxaAIBJSC+DVRbA9cIxOFQtgo0mn+AkgaU/R9EQ9kgYAPU7AvE30ChngwNK2IABxBPBOJ0UGKaC2QIg0zHoRiUZLygtoL8mA5zKgiIAjEoIfACMTsQ9wPxYiDeAsRCQLwNmsRAkXYKiHng8YENABULgdMfxDUZQFwBilSg7dMAiG6v+CVmhFkAAAAASUVORK5CYII="

/***/ },
/* 146 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAOCAYAAAFcNtxbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZDNmYjEwNi1kMGJkLWFmNDEtYjNkNC1mZDViN2Q5YWZhNmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDFFRTdFQjFDN0YxMTFFNkJBRDhGRjIxOTMyNkY0MzUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDFFRTdFQjBDN0YxMTFFNkJBRDhGRjIxOTMyNkY0MzUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNzMwMTI4YS0zYmZiLWQ2NDQtOTk3NC1iZGMxNzI1MjcyOWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5MjJjZmMzNi00NDEzLTExZTYtYTY1MS1kY2RhNGQwZTVkY2UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4uX489AAAB10lEQVR42mKc9Pw/AwjkSjAwMDFAwKfJLxj+AwQQA0gGiB3////PwAIUBasDypgBBBAjVA+I2A/EjlD9jCxQ/Yww1TAAEEAwHSAwAYgLYLYlQlXmgxSBbAUJNgGxH1R1BbJ2uBkgywACCNnMQiDuB+K7QKwEFWMF4nAg3gpU/IEJyTFqUFoZiB2grv0D5cuBJGBuABnvAqVB+AAS+xQQXwQ5GCCAkJ0BAzpAnAXF4ICFAZgzBIE4Gsq+DMSZSMFbiK74HRAvQbPhDlRDH1ADKAwZYEGvD8QBSNFgD8QHofzpQKfMh5lsCvIAEDdC3Qnz4G8gDgbiDKDJj2GBD/OhFhBfY8AE14FYE4ibkUPjExDzoqsExRyMDRBg2IIOHdghuR8GkoF4HnrQ4kpuIlDniUD57UBcBcT/oAGEDkDJphyIW6D8NyCvAS16gxwlICCBZCgIOEFpRWiUwcAvIDaAJjF/JHERqBkMyNEHAlegAa0BxH+B+BlU/C00ajmBmBmIvyPJpQKxAtSBN4CuvY5sMMim52iWREIzwmkC4Q8KihdAvBCaOhmgPpEEGZYETQ7/oWHZDjW0kYEw6ATi+VAzCpDMSMKVKlqBWAa9YMEW+dAwTwMGA4paAPa7i1dXiyq+AAAAAElFTkSuQmCC"

/***/ },
/* 147 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAAHfZzBgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZDNmYjEwNi1kMGJkLWFmNDEtYjNkNC1mZDViN2Q5YWZhNmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUZEMzEyMjdDN0Y0MTFFNjk1NjBCRUYzMzBCRkNGOEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUZEMzEyMjZDN0Y0MTFFNjk1NjBCRUYzMzBCRkNGOEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNzMwMTI4YS0zYmZiLWQ2NDQtOTk3NC1iZGMxNzI1MjcyOWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5MjJjZmMzNi00NDEzLTExZTYtYTY1MS1kY2RhNGQwZTVkY2UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5w1GEFAAAFwElEQVR42mJ0nPNSjIGB4Q4DKjjOAiTigJgXTcKNCUiwMGABOCVAgj/QxP7CdKwD4s9I+BsQXwMIIEagqz5BVfIB8SeYMTZAbAiT2JcsxgBS+R8qwAjE/2HmogCgSkaQdn0g1oWpdpr76g9I8AhUYClUJQtAAIHMLAGypyC5+z+S+Ywgi0EAaMJ/mF1qDEQAkHU9aGKMaDTcwSCTQc7QQxL/j0T/B1kPcwYs4O/hsBlkuiyULQMQQMjBCwPPQXELxJfRo5QXGgcwDPJoLowPdCeI5mXC4kaYAeJQtxqhRw0jNncCTTzHgJSS/qMp4AfiF1Bfw8OUEYevk6FhCVf4H4uiFUAcATXRHEidZMHivv/QIGJADmdcvmaA+Rrq1r+4fP0PmsLkQckOSCuyQHPBJ7SYmQfEHEB8FRrwVwECCBSFVUBGKxGpDmTjcpgnCSXPX1A2KKtcwqLmP5rLQEACiF8iBzUsVWLNjLDkC8QeRLgenMyBWAndpTDwEE9yQg5oBpgrkbMwSjgBw1QRSN+GuvofFkNYgfguEKuAYg2IHyCXZ2g+BDnyKIh4B41VUNi+QQqS/9BYFYFaCgP3gfg7WtCFAV18GRgMoER/B2RoKhALQHP1ExxhDAvfQlDawqKGE0qLAnE8sm1CaBFlgidMQQVaI5L4SVjMM+CoEBih3v6BJ8LqoEHQgC2iWJAMvkhEEhJHqkq+Q5MUuIhFTqcAAQSK/aNI9QMuoA3Ej4H4OhBLE8pNVkS4rhaI04BYg5BC9FIEHcNi8zWSul/IakBehnpbHVfWRAZqaDGNL5cpYjPQCykJEQJxyFUaNi8zQHMPseAjoTAEgVNI4UMIbARiZliywWUgOniIJSP8x5KLQOApPoXoQAiJzYasFlYxIrvwFJT9B1pUIWMYaEVzMU61IBeakxARCliaYxg5ZT0QO0Nj+AdShIDCB6SaHdRwgdaMm4DYAIi/wNQBvcwENFQdSIPEN4AMDIAawIvHZV1AnAHEvnjUSIJKekJZD9a0+kxEcPwjJtnAYvcHEQY+xGagCRFZ7x+05N6JVmdfx2agNBEuASWZBmhkoiedfyxYshMTARd+hdIzQRhbssHXPLmHJYuyItV8QkDvfgMa+h5ICwL5XExYmijIGBa7Ikjq2KF0JbQanolUsDxhgVbsEgTCbQKUfgatGWGNgM/QxgNMThwgQGtWEwpRFIVf8/wMamoWNhZsLGRhp5SsLFjaUGM5lJIYCxZK+VmJSBaIBSkLezZ2UoqFnWxsLGQjLB4N+TmX79bpdN+bM2/m1GmmN7f7vnvvd875zh1TpKbpy5JXHptjtXsZ/UbJVuHQTivYnoQiOAzTptgzvt0pB31fFfMaBraSj0SR5yBE87qsTYB8drDWvnibKc/QJIj46+EgEwogpm5ewIcUnYDWxsivCNAleUYrS1y2QL5P3gHfRT9Tqpk5NpDp2skPCehAFCe9AnrzAUfqk6+Rr5cBZBb5eRhXG7N07EfFgJSBtAX3FGO/FR2RNRNI8y5OyrEukItQnb4iCuvFMx7dvFb7OIFAUkzqG9SdJgmyRgzqK+EYnxxdr+V+Ju6kJpnz6pqGvPlU5slaLNKs/tYxxofOT0BHBIp5TZmrw7wB0eGOH/cLAJqmIq9cZJIV3TBK3PDLO02eBA2q6be83ckcorYcNslq8iY0ota6CNQ5AJr+59jVtVq7xo5qjjvF7j490S9WFbnAD3kVGxXdgyH8clmLlY+wR0GfYuwnrBNygZQ70ItrSiuvTiPG+jFL5B9V6JjvXXfAhSqOATUheuXtIrnmIVvwBfWTywqTiVsWc5Bt40gJO+QzMQLqDWnFKqMT8sYCFUoN0urLlRi8kqnoS8i4ICoFFQLZjbJUqTjCZvEszb7XCQGcZlVo1Pv/o+Lb9MD0uUdgsyxHntFHJxb99x9IUrxotYQ8yYXue8RmpBBYvkPFG2vgKfAXphqiKlrCnXMAAAAASUVORK5CYII="

/***/ },
/* 148 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAFpg2qXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZDNmYjEwNi1kMGJkLWFmNDEtYjNkNC1mZDViN2Q5YWZhNmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTJFM0QzNUFDN0Y0MTFFNkI4NThDQjJBMTMwQTU1NjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTJFM0QzNTlDN0Y0MTFFNkI4NThDQjJBMTMwQTU1NjkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNzMwMTI4YS0zYmZiLWQ2NDQtOTk3NC1iZGMxNzI1MjcyOWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5MjJjZmMzNi00NDEzLTExZTYtYTY1MS1kY2RhNGQwZTVkY2UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4sm51QAAAEU0lEQVR42mJ0nPPyKQMDAy8DGmCCCvLB8L5kMRDNy4Km8L/T3FdwHcjgOxBzoUswA7EoEP8AGQmz4z8Q/wHir0A7QOxygABiBLrqE7qLWKAugQOgagxLW7G5pBpdkBfqbrBn/kOd9RmIGUFmAgQQzHY+BhwApAgEgCb8Z2IgAeBTfAdqIjeyf3GBm1B3gwAjLsX/oZLeyG4GAYAAwhq8ODwKjqTHyAkBHUMTRgfMg8SECBsDkQoZiAkNkEcvA4NuDiHFX2HBBdXUiM8ZX0mJQTGoif+BocGIL1J4kWItCZQEgXQPLsU1oMwAZc9DSnV6IGdowKwE4gAkhejgIkAAwaKbHYjvIoUAuUAEhEH+hDn5HhBrkWMScqIEeqsBSNWTnDKolQHxgenQcH4EdKUNNQyeAjUwExofckAcDCpPKDU4HoivoYnVUsPFFtBIdkYS+0xqTsUGrqJlylpoFoKBjUD8jFiDtwGxJ5oYzLCPwPDlB9If0ORnwTLITyCeiia5G4iPQl1mCMQXCKVjaFr+BaTWgQzG51qQ4S7kpEeAACK6BCcBZAN9sZgFWkRdp0I58RuIdYGYFTnytMg1Da2s+E9plqZZWTFqMBiAismH0IzTTy2DE4D4MDQLdwNxAbYikxyD54PKASDWB+IyWNoHGl5AicGwplw6lpZFFiUGM+MQ/wvE/ygx+AuU5kAT5wHib5QY/A9LoyoEaoYbpTUII1JLiAGpufQGvRIgJx2DNE6CsYGGJiPJZQDxIWJdjN7FAlWe75FKNGT5ZUCLPhPr4k9oGAT4cckDLTpJjIvN0CpPGCiEYgbkWhpo6HIgFYFscAMWQ0Fik0mtlmAGg+q8/ziSFjNSg76BmBoEqRaxIlRL/yez1LwOEGC4XDzYAKjmnwaLu89ILQAtersEPYqQogrUF2qGcn9gK4IYB1mostC1ih5ybYpRBw+Qg0H5RA2IlcnNM/RwcA1Slf4POuB1B8oGjdyBcMpgcLAw1JHNSH1tRjTcC5WbDXU400A6+BxStSkBxC1Y1JQAsSAS//BAOZgPGsIM0FGNlwS6m5+QhqgGxMH/kcxmJkItI5FqaeZgUHW/FcrWhHZ+cIFEpFbsarKqPyqBUGgzDzRY2AnFa6FJhBlavIUgqe8FtisqB9LBsMYvCKdAe3/BUAwDR4B4LtChC3CUMgzoTXvYIBAoSm5Ao4+WoAipKAMNOG/E1VqjZQg3gXr9eORvAbEJUumBEoLAspcHWpnw4ospoMf6qJXp0qCWsUPHQ54A8VMofoFWpIE6rHehNd1HpFLiORTD9IHMeAw1F4S7gR7jQw/hH2Q4FpShxJFy+zIC6qdAMXID/itSDKA34kEZdxU0YP2AeAnyhJEBUp2PD8NythhSZ+85EY4lpzcCKuaOQbmTYCGcAR0h+UdEegeltYNQfiRy5xCIZzBAB0dJAbDpVjy1IBuULQhU20qod4sLcEAdL0jn5ulzAMkSRPTWXPw5AAAAAElFTkSuQmCC"

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _moreFun = __webpack_require__(150);

	var _moreFun2 = _interopRequireDefault(_moreFun);

	var _scroll = __webpack_require__(80);

	var _scroll2 = _interopRequireDefault(_scroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		methods: {
			open: function open() {
				window.location.href = 'index.html';
			},
			refreshHeight: function refreshHeight(item, i) {
				var _this = this;

				this.list[i].showMore = !item.showMore;
				setTimeout(function () {
					_this.scroller.refresh();
				}, 400);
			}
		},
		components: {
			scroll: _scroll2.default,
			moreFun: _moreFun2.default
		},
		data: function data() {
			return {
				btnHeight: '0',
				scroller: {},
				list: [{
					showMore: false
				}, {
					showMore: false
				}, {
					showMore: false
				}, {
					showMore: false
				}, {
					showMore: false
				}, {
					showMore: false
				}]
			};
		}
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(151)
	__vue_script__ = __webpack_require__(156)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] easierScene\\component\\more-fun.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(162)
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
	  var id = "_v-2e739e54/more-fun.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(152);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./more-fun.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./more-fun.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports


	// module
	exports.push([module.id, ".more-fun {\n  height: 445px;\n  width: 757px;\n  overflow: hidden; }\n  .more-fun .more-content {\n    height: 380px;\n    background-color: #f0f3f4;\n    border: 1px solid #d6d6d6;\n    border-radius: 10px; }\n    .more-fun .more-content .right-content {\n      width: 368px;\n      height: 100%;\n      display: inline-block; }\n      .more-fun .more-content .right-content .fun-content {\n        padding: 20px;\n        height: 100%;\n        position: relative; }\n        .more-fun .more-content .right-content .fun-content .fun-btn {\n          position: absolute;\n          bottom: 10px;\n          left: 20px; }\n        .more-fun .more-content .right-content .fun-content p {\n          font-size: 12px;\n          color: #000;\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          line-height: 35px;\n          margin-bottom: 15px; }\n          .more-fun .more-content .right-content .fun-content p input {\n            background-color: white;\n            height: 35px;\n            width: 60px;\n            line-height: 35px;\n            margin: 0px 10px; }\n        .more-fun .more-content .right-content .fun-content .title {\n          width: 320px;\n          height: 28px;\n          line-height: 28px;\n          -webkit-box-pack: center;\n              -ms-flex-pack: center;\n                  justify-content: center;\n          color: white;\n          background-color: #419ce9; }\n    .more-fun .more-content .left-tbs {\n      width: 139px;\n      height: 100%;\n      display: inline-block;\n      border-right: 1px solid #d6d6d6;\n      vertical-align: top; }\n      .more-fun .more-content .left-tbs ul .select {\n        color: white; }\n      .more-fun .more-content .left-tbs ul .luck.select {\n        background-color: #f8571e; }\n      .more-fun .more-content .left-tbs ul .wechatred.select {\n        background-color: #ef372e; }\n      .more-fun .more-content .left-tbs ul .momey.select {\n        background-color: #bdab51; }\n      .more-fun .more-content .left-tbs ul li {\n        margin: 0;\n        position: relative;\n        cursor: pointer;\n        width: 100%;\n        height: 40px;\n        border-bottom: 1px solid #d6d6d6;\n        border-radius: 0px;\n        background-color: #f0f3f4;\n        padding-left: 37px;\n        line-height: 40px;\n        font-size: 12px; }\n        .more-fun .more-content .left-tbs ul li:first-child {\n          border-radius: 10px 0px 0px 0px; }\n        .more-fun .more-content .left-tbs ul li:after {\n          display: block;\n          content: '';\n          background: url(" + __webpack_require__(153) + ");\n          height: 21px;\n          width: 21px;\n          background-repeat: no-repeat;\n          position: absolute;\n          top: 9px;\n          left: 13px;\n          border-radius: 4px; }\n      .more-fun .more-content .left-tbs ul .luck:after {\n        background-color: #f8571e;\n        background-position: -3.5px -78.5px; }\n      .more-fun .more-content .left-tbs ul .wechatred:after {\n        background-color: #ef372e;\n        background-position: -3px -36px; }\n      .more-fun .more-content .left-tbs ul .momey:after {\n        background-color: #bdab51;\n        background-position: -4px 2px; }\n  .more-fun .icon-items {\n    background-color: white;\n    width: 100%;\n    height: 67px;\n    border-radius: 10px; }\n    .more-fun .icon-items ul {\n      list-style: none;\n      width: 100%;\n      padding-left: 15px; }\n      .more-fun .icon-items ul .dm {\n        background-position: 0px 0px; }\n      .more-fun .icon-items ul .xx {\n        background-position: -45px 0px; }\n      .more-fun .icon-items ul .tp {\n        background-position: -89px 0px; }\n      .more-fun .icon-items ul .qd {\n        background-position: -132px 0px; }\n      .more-fun .icon-items ul .sq {\n        background-position: -176px 0px; }\n      .more-fun .icon-items ul .hb {\n        background-position: -234px 0px; }\n      .more-fun .icon-items ul .cj {\n        background-position: -292px 0px; }\n      .more-fun .icon-items ul li {\n        width: 42px;\n        height: 35px;\n        display: inline-block;\n        background-repeat: no-repeat;\n        position: relative;\n        margin-left: 5px;\n        background: url(" + __webpack_require__(154) + "); }\n        .more-fun .icon-items ul li i {\n          height: 15px;\n          width: 15px;\n          background: url(" + __webpack_require__(155) + ");\n          background-repeat: no-repeat;\n          position: absolute;\n          right: -5px;\n          top: -7px;\n          cursor: pointer;\n          z-index: 1; }\n", ""]);

	// exports


/***/ },
/* 153 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAABqCAYAAAHYcQHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA39pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZDNmYjEwNi1kMGJkLWFmNDEtYjNkNC1mZDViN2Q5YWZhNmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjdBODgyQzhDODE1MTFFNjgzQTZEMTU1MEYzNUNGNEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjdBODgyQzdDODE1MTFFNjgzQTZEMTU1MEYzNUNGNEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmZjZTY3ZjYzLTFlZjktN2U0Ni05OGM0LThkNWEyYmIwNjY1MyIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjkyMmNmYzM2LTQ0MTMtMTFlNi1hNjUxLWRjZGE0ZDBlNWRjZSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmhHNEAAAARaSURBVHjaYvz//z8DMmCC0vdhAoy4VBAWmAHEHWAWyAwgPgDErCA2BYZiCIgAcS5xLgUIIBQVMFkHIN6CVQY3pwOZo47TaCI5hfgNAAggZBlRIHYD4tdAbAvEtcgqQYJcQGwEksAaInhDhyzJu/jCmAWI10DZAXRyEF5JeVBahGIGgg4CCCCiXTsNiHVx6TwAxN+A+C8Q+6Lr/ADEl2ASgyGESJNkQWK3AjEz1CvayLkeGWfA2OjGvgLiX9js3AjEh4DYamiGENGS96HJchY2yX4g1gHi63ARpDAFgTQozYC1dKWOawECCK+xQGAIxHFAfAqIlxMy9RGUVgFiBSAuBmJrID6CK3kha1wLxJeh2Xk9EAcCcQkpTiUvAEY1UlFjGBBfAOKpQBwDxJuB+CSGKixFyAEo7QfEv6HsJHR12GwUhNKbgDgSyn5BaiIfjcdBodEViJ9A2bcI1UzwxITEDgFiVagYIyEbFZDYwsTUhTDwDog/Q9m/kNgDnOQAAogmNmpAs9VKrLJYMnIWEP+CsqdB6XQgVkdWh66pAogZoeyNUHoFEE8A4l58JcALaL0RAG2SrYfybwMxNz4/XoJGujMQ8wHxUyD+AcRCQNxLKFTFoE3xb1DNoNr9/GiZM6pxxGnEVjw+AOIVSPx/QCwNxPGEbATlQT0gvgHNvF5AvIeYMqcOi9hVYhoP35HoGCRXEBU4oG7RJ2ibh+jAeQXtMyYA8XaoGC8xRQeoNyoFxH+gBjNCnfx5tMwZ1TiqkRKNz4DYHdqF2ESsRiZoNxfUNw4F4nvENpBgYP1/VICiDlvRUQAtS29Cx05AJcFVUmxchsRuIqZ4RC7BsbFxlnKgwBCFlqufcZWro4UVHgAQYGQHDjVrcnwgANoOloB2EECt7hogFgfibgbIsHUxXhOwpFRkHAPEq4A4CNp50IT2CVyh8jLQvkIKlC8GxLuBeA0uMwnFBTu0yZEJ7RqAhuUigPgMtD/hB8T+QPwcmv88oLnhGblBKgy1FNTVLQdiAeiAIcji4wyIwWceaEeHC9qQekZJogHFz0KoQVeg2fIbtKPHBO3ohUBHbUDq3g6qVMrEQGcwauGohaMWjlo4DC0ktsbvA2JNAmpAff4caNeW7BofhF8DcT4R6sKA+CEhdcRUT6D2O2i+9isDZIpdCYgNoNFxEdqUPYdUdy6m1IegmY5SKJsDiG8BsRkQq0DZvEizH7sImUdqq+03tFZfDR1i6UMaBKFJM/E/tPEECuIf0OAkqclATByC4gQ0kzwDSewz1CI+JLEoIL4D7a+NtmlGLRy1cNTCUQtHLRyOFvJC++6gdYWgJTingXgdtM8vwwBZpdFOrRp/MtRQTiBeBq1kr0MrYV6oxfrQ4RJ5aEVMUQUMmiL6w4AYjQTNhmwB4rNAXI/UxGCEDrGoUepDSwbIvD8yuMYAWbikgyZeRY045MPRevuLY+SKYgtZcCQiDiIdN9qIGrVwiFkIACihYk1SatiRAAAAAElFTkSuQmCC"

/***/ },
/* 154 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUwAAAAjCAIAAAEH3pSlAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAABr5SURBVHjaYvz//7/T3FcMMLAvWYyBgQEu0urKbynH7r3o9fff/0lSwMDAcPzRz+rdH5EF//1nYGJE6N2XLMb4//9/BlTgNPcV3Ag48Fv8usqB30KWDVkBmsrJxz/nWvIi64pb81aCh/nM01/IzmJgYFh79RsbM6OvBifj////IY5Csx5NEFkKTsYbcccbciMrCF/xZmWECJquwKVvPv74B7e+aNuHaH2upRe/9XkJQK2v2f0hVIfLUIoNl+8ZGBjq9nwU4WbKs+RFdgRctuvQpzI7Pkxd4Sve/PrLgGy909xXlfZ87Qc/YQ/8449+WsqxQ9hffv3nYWMkVQGmFFxL/Jq3C0OEIYLxa94CAAAA//9iRE56EAeSkdDgCtrd+M1l2eG+hDA4WRm3xomiCTIwMGDxOmZkr4oUCVv+psCK10+TEzN54oopBgaGsh0fGBgYujwE0MT/MzAwYrXbf8nrjTGiDAwM7Qc/VdrzQVyKGc3IdudY8E458TnVlCdSjwvZqIcf/sgLsKCZX7TtAwMDAzTFVez8wM7C2OjMD5ELWvZmXZQIAwNDzub3U3wFnea+YmVm7PcSePjhr6caB9yIu+/+KAuxQOwW52HWFGWpc+JnIALAPcMYt/oNcvzD2VRPfZgAAAAA//9i/P///7ff/7lYsWiAi/sser0FlliwAjIU/Pzzn52FkXgTiAGYhuDxGuGUDokjVmbGnQkohvYc/lxiy4uc8k4+/mUuy7b+2vdZp7/8/PMfuVRFTqlBS98YSbPtu/sDM+3uuPXj4Yc/6WY8EMGPP/7xczDhcRUPG2Obm0DelvdWcuwtrvy48pzzvFf//zNU2PN1HPwkwMkESc9Qn2MtypHt4GVnhGQ+OIDkQqyFPma+RM6U6qKsN1//RnMiREHTvo+ffv5XEWbJMOPZfOP78ovfloUL44mSU09+Vez8sC9ZLHDpm/XRIrh8DnESpEiHxwexcY61bMEU+fHn/8pL3xae/8rAwLAyQkSUmwlZAa66B38RiQu4zX/Nz8HIxMjw7z/Dr7//N8aI4vd5sQ1v75HPcJ8DAAAA//9i/P//f9G2Dxee/0JTbSDJ1uclgNkwgQPkmoKmCjDTI3KlBgeQ+g6zHMflNaLinIoFGxzkbXk/yUeQoAkl2z90eQgg+xxra4kMQJHP0VLX7DNfll/8ZizF1u0psPzSt0g9LvzJD7OOhoO2A5+qHPgYGBjClr9ZFYniT9/FrzfHih68/3Prze+INhxGcwHNunwr3onHPicaccfCWp2M////T1z7bn6wEJpqr4Wvt8WLorU78Pjcae6rHk8BHjampRe/Hn7wE4/HIN7u8hAwkWZDUxC09M26aBFIUyZu9dtFocLuC16j1Sku817tSRK7+fp35qb3iUbcd979OfzgJ54youPgp333fv75B41gJkaGPUmwfJ624d2sAHSfQ4IWzn3z7Z8IFxMaG9nd/Uc/F1rzotVGWMvC1ZEiWZveQVIssoKMje9m+EOd0bTvo5IQS4wBN67StGzHB0g8b77x3VeDE0+EL7nw9dyz3wwMDP///2dkZPzx5/80P0EyfY6/kMdVjUPAgnNfF53/itzchivI3PhOmp9FTZhl843vFrLsDAwM2RY8+H0etvzNm2//CFYKyE31eEPueCNuhM9n+gv9/f+/ef+nP/8YWl35MX3+6MNfOQFmgj7/959h1eVvq658q7Lnw0zM/ktef/75H0/QVO764KLMseryt9tv/+DqEKDFOfGtZSw+J6lUO/rw5/ZbP1pc+bE668LzX3POfL326jf+Aoz4ahyXz198+Zu7+T1ccHWkCJE+b3Dmt1NgJ9bnuHoC8N4CHRTgESGju8LAwAAAAAD//4L6PG7N20UhwsRrw+xXHX/0U1eCjXi7v/z6f/nFL2Q/DFETHrz/oyPO+v8/AyNuTScf/9QWp8hhWAF5sUZRQ4bCdjfB3gAcbL35ffWVb48+/GVgYNgYI8LLzkSqCWhtWVwlLBm+SFn/bk6gEP4oh4+10DQ8IV2ZEB3ONFMeSBvQVoEdbXgSpXxbfvHbisvfRLmYCCZAfUlWeO8UzYmXX/7O3/Jemo/5H+6E9PzzX6z1FXI/Fi6oJsISqcctwcOkLMzCwoQ+SEJ8hCGbaSbD1uEuQKQJN17/nnvm69lnv7o9BIyl2SB9/b1JYsgjw5tiCUSnx4LXO2Dt0Nwt7yf7CGJVFrr8DbyKoiQLOc195arCAYkjzPIYEeVpG97N8BeCdImQBxggQIaPeVGoMNa2HbJ9/ktezw0SFsGbbuDjGbiC23X+Kw4WxoUhwkKcTAT9RjDKt9363nP4s6Igy48//59//os2+I7LBHg7+sef/1Er366LFmFgYJh28ou5DJuxNNvUE1+OPPy5PFyYgYHBee6rvUS0IOG2QAY24cOjV17+dlPhYGVmROsokRTl7gte//6LyGTwARi0iRR8Uc7AwDDx2OdXX/9dfP7rG1L/HzLEQkyUhyx78+77P0i6sZZnb3bhd5r7am6QkKIgC8Eov/76d/am98hl7+ZYUW42RgYGhtVXvoXqcBEf5Q17Px568BM5+bqpcFQgFVF4olxFiFVZmCVQi5OBgWHV5W8zT3/ZmyQ2/eQXUW6mr7//77r9Y2mYMJFxg6wGuc3tNPdVtD43HwdjqA4XZD5mfTSZuTx8xRtGWNWSbc4z9cQXeMc6QpcrQIsTX5SvvPwtVIdr7hmYnv8MriocCoIsuHpwyE70W/x6XjCBXN5x8FMF3ijHWszAU+vnn/+zNr1bHCpM/NggxJwALc48jIoNlwkRK99qibIwMTJysjLKCzC/+fbvyMOfS0KFp574Ii/AfPD+zyh9AjNhBKP84Yc/G65933n7h7sqR74VL4VRjhxWaLkc3j9Dj/KU9e8q7fmEOJlYmBj+/GNgRoq1v/8Q7B9//setebs7UQxPYYvpIOT4E+ZigtRYuIL7++//3oteMzAwSPIym8uyGUqyaYmxCsOS0crL38S4mRyVOAhGefam91P9BClpQkatfGsoxSrGzXzr7Z+33/7GGXJbYbSiSY1ytLp84/Xv/rCZOvisFnWjPNaQOxEzynFNv+AC33//50RVj3/49M8/huxN72aiDvl4L3q9FUkLGTNLg9AE8kanyTOWvFhD5HKsg/FYAfLkAzI49uhny/5PP/4Q7vVxsDDWOvJh9juHhwlYAY2MJSPWAAAAAP//7Jt7UFRVHMd/9+5lX7AL+wBFthIlfIRvpNIaHkYjUtoo4CNUGEqzPypzspfp2GhOY2YyNY2TiPnCNAoxFFEZTBmyQFOEUEEHjQ32wS532b37vLc/7rKu7LJ7ubuoOf3+3Dl77r3nc8895/f7fo8Ted1ty6Ya3FOp8QxBCLIuxfsNBf7SPBo9BIuN32BHDaEoKvCiVVDqd//FHmhNkMWFmLSn1SyvmlYgpUaEoigWKw1zMwbzdej+9FBxjWhR29c8JwrKPXjuaYKy6DJpz5qa04EWYK10SOOmzl7WTPzSQnhWFQYVKqNj0SEtAHg6xgKPgebi0IUngrJmorDOUJkXyeUgJ2+YP/8VP5Uf5Z550X95SJHXtltKmwh68eNjSFaC8JXxAqkAZX3d8+2W9aedBpS92TKFmDPYHv5S29ZW6o8tjQwcVWIM1/P3HjOZHsfPShCyQ9BNkGuO64sXSNOKVEdz5RvO4F/OifCagt5FnlakipNhJOnrMigKrVq7D1k0rUglF6J0+dAzEASUuCM5lrdhYHfkyrLuG1r73cXyWVGMmPNEBCcqjAMALxarqvIHjbyhw/pepd5r9dFvFNYZ7vQ4GjqsVfmRGIpsrzXEy7HMMYIgzk5XeLWrMOxn3yVj6mi+QsyhZQ5X6dq9guIFOZOxWPKD9uBCmQ/kg6pLeMb+P43ZE4QZe9TVBVFaE9mitjV22S4pre7vQc4E4Rt9xki/4SAhvVgFAIkxXE+Du4/VdMtZvLbdabnRmsjNNTi9kVYZHR+c7Nk9X8oO+Wc1+Ok2MwAkKbiLJgpb1PbDV016ggSAHZmSCcNDWCBPL1YJQxDahgEAexbI8kq1zlmKwFPDQnZkSnwhzynRvDVD5PoM9psZtP1s6JAbrdTCQxrCTrmrVe6hxB3bag3bMiKYDw0AHM2Vz9uvAYBYCVbkj9as3arSxfIIAQoAWQc1RxbLETe1SWV0fHHOsHRyKHM8Xh+fpKCq1RwnxeJkzmJ27hHt/mwZC+T9Kp57s2XLjmjdMzS6qsNyljNE7rJOqY0kbXZ1bXCYWGGelGE7PdxZaUWqzDGCKdEhSoMjd3Iok3FZf7rnfLtlR6bk7QodApA6iv/OTJHfxObNcp3BQu7rG/3ttYYZj/Oe7js4szIprFVrf2msYFJgyMuaCVrtuNplSxgWAgCrynXfzpWwQL6qXCfoc8iTFPVxSrh7wVURznl3psg/cq/CRnVBFEPkaUWqimWRt/X2VeW66oKoLWfxU61mv+c8XJ3MjuevfV4MAB9W6S/csdLtGztto2XY7obeJAUvScFlOC5SATpvnKD4opH5Qr6irHuEiHOly0ZXvK922TZW9xxeJEcQyC7RFEwLO9VmLpgWOj4qIOTVN831HdbK62Z3cuyQn2+3fP1brzN3oKivMiWrjzv3LiRJHb5Xgx+qWR7Ibn/NCX1KLO/lsYK1lXp69Z0ygtvYaavKj6T3ONszIyL4qN9bPXDZWFRvdH9xl0wSvpbofxOwukIXLeIQdoqwUSMlmJiHtmptH6WIMRRZ/qM2OZavxB0LEgTjIgNCTt+VRIC+nhg2O54fCPIT181bz+EDfdj76ZP9kZ+9ZUmO5ZU2mboJ594dAXAfpvuAfHMNnjc1dHWFTmO6J3/YmyVThHOY52k5JZpv5koXHtIAgIiHbpwlnhzN6Nvw/km9mIfaSQpDkWgRh8uBVq19XaoYQ5G8Uu0zj/GUuOOTVPFAiQnDxy+sM9TcsiSP5KXH8ekPxoNBXlhnWDE9bFd9r9roHO4QDrIuRXw/kWfsUZ/osw1pTOSVTmuzytbYabvhMz/0jDnfq5dPDd35ey8ATIvhbmVsBgaAjdU9YVwUAMbIsVs6u9pIfvpC+LEW4sIdK23vDUqS1k/efQDIf3pVjiLgIAFB7h6PoShwGdkQBOYf0PgY9001eHWbuf+P6eE/NxENSqeosGu+dJQE842KVpymK7iJMdyJw7nxMsxlJmSI3PPYw2Dju/ref3DHKCmmMpImG2VzUK7jmsFCfqbNPGs0P/C8vOIaQR/AGhzyoau+9TvRwDz+xh1NXbaLSusfHVY9QQ6qllJy2bR4UpCrqkGJnBKNS/miT9W5KgHbMiLGRrLJyztwx1I3xu55uXfkQRHwfSsBnrZOT0EicEnjYeghKLIKk25ZUwuaeMpOH3z0egik2aDaBySeQpA8G/9bJHzEUHTLjtq/7F15dFTVHb7v3Zl5bybzZiaTdSABggTDWlzYoaJQBQQFRKhLLXVBpS0uHK1LT11Oz/FUW1s9p9oKRVACioCERQkUjxoEEwgQA4GEEANZyOzbe2/evLV/vDi8zJbMkiFafv9l3uTOd+67311+y3d7VKusr6W+bGEemai/YbAmoYmo12mttoNde5ScNRx/8IbevWYDAcZVDBnAsOE4NWcErgxkx5d5+FGMnAEItUe24+LR2pnDMNBvVtUa/LQhEH/SGggwrmLIGIbqNramnf39VH3IIYAkO+Cfr/TOvxa/4gO4j4t8Jl/uZZJnJrMp9YLzDMBIEYONFBodfIONa3TwU4o1y8bpMo9Btk8bApvrKCctAgBmlWCRql0ZwNCrPV7hevcHEY1UVvK+VINmYABnrJG+/8pVkieJIcBJTU7+rJ07beVO2TilZxAAMCJHNSZffbyTbfMKsipOJkn+XRf34gEPxfY4ub06xzhjKDYASS6LAoX+TDprNE4F/9Z6et0xihcT0FGIFXHNDMk3naTW11JaNaJTI05aLDLCjXflIAh4+4h/Z0MAAFCgh1ZSKMtTvxM7ItMLyTeeoHacpkN5VKkYpkJuvxb/3RQiOZIfuhDcUEu1uPlUAMwbiYfVmyY0uC/5hY/r6bpL3AVPOIzxheoHrssana/GVVFGZn0X98TebiHCzJC8qjX40kFv5OfZWnTbvblIf2I40clKANgo8UAz4w+KBXo4qUiz+2yADEqvzzPFSSdWFl6mYrG8z0/sddd3cYl25oIP7HlZMDLCFdknScxK8Tv2nWpy2yl68/KcQj0MzYOugGgh4HkXX7kiLxSxn73eZsLR7TF6Lx7JH9jmbPcKaZzCl5Q7PD+oBidE8scqXE0O/qnpRHx1s/jmpMXHKlzOnkJhCQ3uJ/a4663ca7ea3AHx9SqfhYC5OrSLFFwBUYiW/p2vh4MNcLABWgi46SQV4KQ1M4ixBeowKd30kvyiR1AGzgYZoJUUQvDCqsvTgqGui1tfS+IqpFAPpxRrpg7Bmp38C/s9d4zShiUlHm1n/1DpiTXZhekLJm23vm+XU6bCbPUe9ykrd/+ErFF5qkEGmJ8FY0WrWEGykmKXX2h0cOtrqeHZqnVLzGmZfPvYiJMWRQk4aeHJvR4DhqyeRphwVALAy4hvVPkhCuaV4lOHYBIAkgR2nKa/bg0+dGPW3FKtBEAcgb4oJF+509Xs5P/7YL7ydPTPb8ljHewrs41DTHDVLreTFsI0pCQAUATMGBpFfGj5Rw6ak+QKj4RIvvBDO8VKn9yTm6NDU+nT17/27TvHJE3yE53sms89Kyfq/ay4pY7uNbnDFxSdtGinRDslWEnRTgkNNq7NKxhxNCQPkV6SP1fpqWnvjtbMKsFuLNL87ZA/9IIgCiruz4vqwk0IQ10XV9XK1HdxuBoZk69eNForSmDVLvfYfPWrc3qw97EKV6dPeG+xObQWyfafY1R5HRVS3QstR7FS1xOyWHI9Tlq0kkKxUdXq4ZscXKOdP23jZL0gpeXo0LEF6pG56rJc1bBslYMWdWpksAFmjORRVThC9vJs47gC9V2bHXG+E0tYua8k7/QJLW5+2hAMRUCHT7BTAuzpBpU3LSVmVWToNmmSywqYW+/JzU2N5Mpc6uQIJvdJ9773hxKG+FbfxZ2xc3eO1mIQaXTwj1e45o/UhtTM00VyX1BctMmhfM3vVpOfnKJDn5TmqFZcnxVLmSAhDM/u87S6+Tdvz47cez/9meeMjdt4tzk/6/KjLXX0hyeph27ManLwHkYcbICSBKrb2Gd/TigTTtN18o/VjhyvTmK7PsgA31tkHiAkf3Ia8TOL+jfbXf1IcqXDqbqdHV+oNmvRCx6+wRb9tFxkhOMK1Gkn+aaT1Ibj1LQh2Eu3GCEKvIy4eo+73Sf86WbjTSWYfIZ/+aC32Kh6e4EpJP6YOsl3nw38/Rs/6CkPqNwQTinG7lWk2PmDolwHJUvtba2n/1VDPjPToLyzInWSt7r5B3d0v/WFZdqnphNLNjtkFyACgFmHYirkkl8IFVmlSPLVe9xdfuGmErzqQvCOMu29ESmFJy+xT3/mWTVZH6qblaPBk4o1gghKslVWUtjTyKyZQShX8v4muVwFoXwk69/PHIbJeavytLh6KqGUSFtc7igkYGSi8RXxricXWUye5N+2sRtPUHeO0s4txXc2BL5uDUb9geFm+MhEPQaR9JK8wcZ99B09fSh2W2k3W9YdIy96hJUT9UVGCABo9wnv1ZDFJvjwDfpQv6ROck6QFpU7Apx0/4QsZTqEcp98yzX4H2cZ9jczeTpUVoIL2YsHvEcuBtcuNss30aSF5B5GXFLevYZvWZ5jxNH5G+2RX4tfQ58Qhif3ur2MNMGi9jCiBiKnrNzMYdjCMm3lOea8i9epkSIjhAioPMesW2KWX/071eSh1uCcETgrSEYc9TLiwfPMU9MJpYRa5kku24FmRi7YU95McGVJLmtBRP2XNTOIcQUapdtFaVFLsJMneRL2E9iuy16J7afpUCBKrmSN1cLSsbpVk/UKn5BNkEDYyTNFkr+w3/NtG2shYPmynC/OM3/+8nKNiglHC/To2ALNb6foU1lSwp6u2O4kg9Lsa3A7JUAU8TBijhadVKSxkmKTk9NAZHyhmmKl3WcDIZKvPUrub2aus2hMWnR8obrFxW84Tj070zC3zzua/iC5jRIqmxgEAXsbGZoTl43T8QK4eTiuvGLhipA8rNZIac/fZBiVr1bWoSgtqmO1ryTnRenW9+0AgPJlOZgKWRr73B+1DDxFks/bYA8K0t4H8rSp5f3947B/15lAiiR/5FPXeRf/+Yo8DCKvfeXzMqIrILoDopOOLrBiIeCmu3MQBLS4+Yd3uCL3+amQXGa1vK14Zp+ntqNHjjREwXM/NyjrndJCcgDAG1W+s3b+2lwVzUmyq3V4tsrPSvJCnY2jrR6+uo39YKlZDvNsPE59cIKaOQwrJOBtpXhJNIdl5kl++GLw5YNeCQBR7HYYy4feBWXa/xeS/3qbsy2tIbT7tjodtCgXAiZE8o/r6X/XkNladOkYnRqCqLkMEgAaiEwq0siOUFaQDjQzJCshoPsY02Djvvo+aMLRHSl4tilWWvihXQORv8w1WQg0Twfjn5F4EbgDogSk/Cwo1wU+Okm/vGfqW9Ik/+r74CtfeN+cb5pg0Ry5GOz0Cxc9QoCTsrXotKFYQnoWyWF4+4i/uo0dmaviBHBNjopmJV6UCAw1a9FzTm5fE/OLEXiLm5ckMHckftcYXXoPqIm2I0+CUR/dvcXhjHEJ0+JyR6EeDaXi/dRI/sV55s1v/JgKMWCoBFLKh0EAEuAlb0C8b4JOjp0mkfFWb+XavUIcJO1e4aPvaNn5tPtswELA+yZcHlh6DTq5SIP1TFZJYnC3uPlDrcEOn9DmFTp8gj8YcwEfbIBFRmghoIWAZi269ihZ18VFCjwlRzA5nrfrV3kJXZSUXpKHnKDfXAjeVqqtaQ+qITK5WDN/pDbtGFJvRz6s/XWeyUKE+yYK9BBFQGQ4zcuIq3a5oxaH9SvJK84E3jrsT4Lky8fpHk3oTN6v1n9prW1e4cUDnnZvL7l+6fJsx7IgLzlp0UGLVlK45Bc6fYIrIF4/SPPLCNHQ5DDUtLMTizRIRl7HABkSGW4nA78Sp5HaDvatw35XIHwJeXoGUZarXrkzPISGImBBWfctWb2T/GoV2lUMAxBD3+1HhPaKVaGB/q5xPUbOKhkA9eR9g3EVw4AaEn20HxHaTEL93wBc74ZYUiBSywAAAABJRU5ErkJggg=="

/***/ },
/* 155 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y0RTUxOUM4MkIxMUU2QTA0RUIxOTc1NjlDRjVFRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCN0Y0RTUxQUM4MkIxMUU2QTA0RUIxOTc1NjlDRjVFRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkI3RjRFNTE3QzgyQjExRTZBMDRFQjE5NzU2OUNGNUVGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI3RjRFNTE4QzgyQjExRTZBMDRFQjE5NzU2OUNGNUVGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+gONt7AAAAOdJREFUeNpidJzzkgEJiABxERD7ALEaVOwGEG8C4klA/AamkAVJUzAQzwVifgZUoA/F+UCcBMRrQYJMSJpWY9GEDPigaoJhGkWBeB4QMzIQBoxQtWIgjblQ04gFILUFII1+DKQDH1DgaCCLrA4XZhDmYUZRdePFL4asrR+QhdRZ0I3af/s7hvGff/5HF/rFAo0nfZjItHPfiHHqPSZo5JIKtoI0TgHiTyRoAqmdANL4Cpoi/hOh6T9U7StYygElozBQOODRBJILRU9yILAGiJWAuB2IrwDxbyD+CsTngbgFKrcWphggwAB7CDIJNRYuMgAAAABJRU5ErkJggg=="

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _buttonRipple = __webpack_require__(157);

	var _buttonRipple2 = _interopRequireDefault(_buttonRipple);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: {
			buttonRipple: _buttonRipple2.default
		},
		data: function data() {
			return {
				tbsIndex: 0
			};
		}
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(158)
	__vue_script__ = __webpack_require__(160)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\web-base\\button-ripple.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(161)
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
	  var id = "_v-ad4b5054/button-ripple.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(159);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./button-ripple.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./button-ripple.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports


	// module
	exports.push([module.id, ".button-ripple {\n  background: 0 0;\n  border: none;\n  border-radius: 2px;\n  color: #000;\n  position: relative;\n  height: 36px;\n  width: auto;\n  margin: 0;\n  display: inline-block;\n  font-family: \"Roboto\",\"Helvetica\",\"Arial\",sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0;\n  overflow: hidden;\n  will-change: box-shadow;\n  -webkit-transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  outline: none;\n  cursor: pointer;\n  text-decoration: none;\n  text-align: center;\n  line-height: 36px;\n  vertical-align: middle; }\n  .button-ripple:hover {\n    background-color: rgba(158, 158, 158, 0.2); }\n  .button-ripple.button-primary {\n    background-color: #419ce9;\n    color: #fff; }\n    .button-ripple.button-primary:hover {\n      background-color: #238de6; }\n  .button-ripple.button-success {\n    background-color: #53c843;\n    color: #fff; }\n    .button-ripple.button-success:hover {\n      background-color: #44b535; }\n  .button-ripple.button-warning {\n    background-color: #ffb848;\n    color: #fff; }\n    .button-ripple.button-warning:hover {\n      background-color: #ffab27; }\n  .button-ripple.button-info {\n    background-color: #50cee7;\n    color: #fff; }\n    .button-ripple.button-info:hover {\n      background-color: #33c6e3; }\n  .button-ripple.button-danger {\n    background-color: #f73666;\n    color: #fff; }\n    .button-ripple.button-danger:hover {\n      background-color: #f6164e; }\n  .button-ripple.disabled {\n    pointer-events: none !important;\n    background-color: rgba(158, 158, 158, 0.2); }\n  .button-ripple .slot {\n    z-index: 2;\n    position: relative; }\n    .button-ripple .slot a {\n      text-decoration: none; }\n  .button-ripple .button-ripple-container {\n    display: block;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    z-index: 0;\n    overflow: hidden;\n    -webkit-mask-image: -webkit-radial-gradient(circle, #fff, #000); }\n    .button-ripple .button-ripple-container .ripple {\n      background: #000;\n      border-radius: 50%;\n      height: 50px;\n      left: 0;\n      opacity: 0;\n      pointer-events: none;\n      position: absolute;\n      top: 0;\n      -webkit-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n      width: 50px;\n      overflow: hidden; }\n      .button-ripple .button-ripple-container .ripple.animating {\n        -webkit-transition: width 0.3s cubic-bezier(0, 0, 0.2, 1), height 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0, 0, 0.2, 1);\n        transition: width 0.3s cubic-bezier(0, 0, 0.2, 1), height 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0, 0, 0.2, 1);\n        transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1), width 0.3s cubic-bezier(0, 0, 0.2, 1), height 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1);\n        transition: transform 0.3s cubic-bezier(0, 0, 0.2, 1), width 0.3s cubic-bezier(0, 0, 0.2, 1), height 0.3s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0, 0, 0.2, 1); }\n      .button-ripple .button-ripple-container .ripple.visible {\n        opacity: .3; }\n  .button-ripple .menu-container {\n    display: block;\n    margin: 0;\n    padding: 0;\n    border: none;\n    position: absolute;\n    overflow: visible;\n    height: 0;\n    width: 0;\n    visibility: hidden;\n    z-index: -1; }\n    .button-ripple .menu-container .menu-outline {\n      display: block;\n      background: #fff;\n      margin: 0;\n      padding: 0;\n      border: none;\n      border-radius: 2px;\n      position: absolute;\n      top: 0;\n      left: 0;\n      overflow: hidden;\n      opacity: 0;\n      -webkit-transform: scale(0);\n      transform: scale(0);\n      -webkit-transform-origin: 0 0;\n      transform-origin: 0 0;\n      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n      will-change: transform;\n      -webkit-transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n      transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n      z-index: -1; }\n", ""]);

	// exports


/***/ },
/* 160 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	var Constant = {
		INITIAL_SCALE: 'scale(0.0001, 0.0001)',
		INITIAL_SIZE: '1px',
		INITIAL_OPACITY: '0.4',
		FINAL_OPACITY: '0',
		FINAL_SCALE: ''
	};

	exports.default = {
		props: {
			id: {
				type: String
			},
			color: {
				type: String
			},
			tag: {
				type: String,
				require: true,
				default: 'button'
			}
		},
		data: function data() {
			return {
				boundHeight: '',
				boundWidth: '',
				rippleSize: 0,

				IS_VISIBLE: false,
				IS_ANIMATING: false,
				frameCount: 0,
				x: 0,
				y: 0,
				ignoringMouseDown: false,

				recentering: false
			};
		},
		created: function created() {
			var beforeReplace = this.$options.template;
			beforeReplace = beforeReplace.replace('<custom', '<' + this.tag);
			beforeReplace = beforeReplace.replace('/custom', '/' + this.tag);
			this.$options.template = beforeReplace;
		},


		methods: {
			downHandler: function downHandler(evt) {
				var $ripple = this.$els.ripple;

				if (!$ripple.style.width && !$ripple.style.height) {
					var rect = $ripple.getBoundingClientRect();
					this.boundHeight = rect.height;
					this.boundWidth = rect.width;
					this.rippleSize = Math.sqrt(rect.width * rect.width + rect.height * rect.height) * 2 + 2;
					$ripple.style.width = this.rippleSize + 'px';
					$ripple.style.height = this.rippleSize + 'px';
				}

				this.IS_VISIBLE = true;
				this.IS_ANIMATING = true;

				if (evt.type === 'mousedown' && this.ignoringMouseDown) {
					this.ignoringMouseDown = false;
				} else {
					if (evt.type === 'touchstart') {
						this.ignoringMouseDown = true;
					}
					var frameCount = this.getFrameCount();
					if (frameCount > 0) {
						return;
					}
					this.setFrameCount(1);
					var bound = evt.currentTarget.getBoundingClientRect();
					var x;
					var y;

					if (evt.clientX === 0 && evt.clientY === 0) {
						x = Math.round(bound.width / 2);
						y = Math.round(bound.height / 2);
					} else {
						var clientX = evt.clientX ? evt.clientX : evt.touches[0].clientX;
						var clientY = evt.clientY ? evt.clientY : evt.touches[0].clientY;
						x = Math.round(clientX - bound.left);
						y = Math.round(clientY - bound.top);
					}
					this.setRippleXY(x, y);
					this.setRippleStyles(true);
					window.requestAnimationFrame(this.animFrameHandler.bind(this));
				}
			},
			upHandler: function upHandler(evt) {
				var self = this;

				if (evt && evt.detail !== 2) {
					window.setTimeout(function () {
						self.IS_VISIBLE = false;
					}, 0);
				}
			},
			animFrameHandler: function animFrameHandler() {
				if (this.frameCount-- > 0) {
					window.requestAnimationFrame(this.animFrameHandler.bind(this));
				} else {
					this.setRippleStyles(false);
				}
			},
			getFrameCount: function getFrameCount() {
				return this.frameCount;
			},
			setFrameCount: function setFrameCount(fC) {
				this.frameCount = fC;
			},
			setRippleXY: function setRippleXY(newX, newY) {
				this.x = newX;
				this.y = newY;
			},
			setRippleStyles: function setRippleStyles(start) {
				if (this.$els.ripple !== null) {
					var transformString;
					var scale;
					var size;
					var offset = 'translate(' + this.x + 'px, ' + this.y + 'px)';
					if (start) {
						scale = Constant.INITIAL_SCALE;
						size = Constant.INITIAL_SIZE;
					} else {
						scale = Constant.FINAL_SCALE;
						size = this.rippleSize + 'px';
						if (this.recentering) {
							offset = 'translate(' + this.boundWidth / 2 + 'px, ' + this.boundHeight / 2 + 'px)';
						}
					}

					transformString = 'translate(-50%, -50%) ' + offset + scale;

					this.$els.ripple.style.webkitTransform = transformString;
					this.$els.ripple.style.msTransform = transformString;
					this.$els.ripple.style.transform = transformString;

					if (start) {
						this.IS_ANIMATING = false;
					} else {
						this.IS_ANIMATING = true;
					}
				}
			}
		}
	};

/***/ },
/* 161 */
/***/ function(module, exports) {

	module.exports = "\n\n<custom class=\"button-ripple\" :class=\"color\" \n\t:id=\"id\" @mousedown=\"downHandler\" @mouseup=\"upHandler\" @mouseleave=\"upHandler\" @blur=\"upHandler\">\n\t<div class=\"slot\"><slot></slot></div>\n\t<div class=\"button-ripple-container\">\n\t\t<span class=\"ripple\" :class=\"{visible: IS_VISIBLE, animating: IS_ANIMATING}\" v-el:ripple></span>\n\t</div>\n</custom>\n\n\n";

/***/ },
/* 162 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"more-fun\">\n\t<div class=\"icon-items\">\n\t\t<ul>\n\t\t\t<li class=\"dm\"></li>\n\t\t\t<li class=\"xx\"></li>\n\t\t\t<li class=\"tp\"></li>\n\t\t\t<li class=\"qd\"></li>\n\t\t\t<li class=\"sq\">\n\t\t\t\t<i></i>\n\t\t\t</li>\n\t\t\t<li class=\"hb\">\n\t\t\t\t<i></i>\n\t\t\t</li>\n\t\t\t<li class=\"cj\">\n\t\t\t\t<i></i>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n\t<div class=\"more-content\">\n\t\t<div class=\"left-tbs\">\n\t\t\t<ul>\n\t\t\t\t<li class=\"momey\" @click=\"tbsIndex=0\" :class=\"{'select':tbsIndex==0}\">数钱</li>\n\t\t\t\t<li class=\"wechatred\" @click=\"tbsIndex=1\" :class=\"{'select':tbsIndex==1}\">微信红包</li>\n\t\t\t\t<li class=\"luck\" @click=\"tbsIndex=2\" :class=\"{'select':tbsIndex==2}\">抽奖</li>\n\t\t\t</ul>\n\t\t</div>\n\t\t<div class=\"right-content\">\n\t\t\t<div class=\"fun-content momey-content\" v-if=\"tbsIndex==0\">\n\t\t\t\t<p class=\"title\">基础配置</p>\n\t\t\t\t<p>\n\t\t\t\t\t<span>活动名称</span>\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" style=\"width: 250px;\" placeholder=\"活动名称\" />\n\n\t\t\t\t</p>\n\t\t\t\t<p>\n\t\t\t\t\t<span>游戏结果显示</span>\n\t\t\t\t\t<input type=\"number\" class=\"form-control\" placeholder=\"\" />\n\t\t\t\t\t<span>名</label>\n\t\t\t\t</p>\n\t\t\t\t<p class=\"title\">条件配置</p>\n\t\t\t\t<p>\n\t\t\t\t\t<span>时间设置</span>\n\t\t\t\t\t<input type=\"number\" class=\"form-control\" placeholder=\"\" />\n\t\t\t\t\t<span>秒</label>\n\t\t\t\t</p>\n\t\t\t\t<p>\n\t\t\t\t\t<span>进行轮数</span>\n\t\t\t\t\t<input type=\"number\" class=\"form-control\" placeholder=\"\" />\n\t\t\t\t\t<span>轮</label>\n\t\t\t\t</p>\n\t\t\t\t<p class=\"fun-btn\">\n\t\t\t\t\t <button-ripple color=\"button-danger\" style=\"height: 24px;line-height: 24px;font-size: 12px;width: 100px;\">添加</button-ripple>\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t\t<div class=\"fun-content wechatred-content\"  v-if=\"tbsIndex==1\">\n\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class=\"fun-content luck-content\"  v-if=\"tbsIndex==2\">\n\t\t\t\t<p class=\"title\">基础配置</p>\n\t\t\t\t<p>\n\t\t\t\t\t<span>活动名称</span>\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" style=\"width: 250px;\" placeholder=\"活动名称\" />\n\n\t\t\t\t</p>\n\t\t\t\t<p>\n\t\t\t\t\t<span>奖项名称</span>\n\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"\" />\n\n\t\t\t\t</p>\n\t\t\t\t<p>\n\t\t\t\t\t<span>奖品数量</span>\n\t\t\t\t\t<input type=\"number\" class=\"form-control\" placeholder=\"\" />\n\t\t\t\t\t<span>份</label>\n\t\t\t\t</p>\n\t\t\t\t<p>\n\t\t\t\t\t<span>每次抽取</span>\n\t\t\t\t\t<input type=\"number\" class=\"form-control\" placeholder=\"\" />\n\t\t\t\t\t<span>人</label>\n\t\t\t\t</p>\n\t\t\t\t<p class=\"fun-btn\">\n\t\t\t\t\t <button-ripple color=\"button-danger\" style=\"height: 24px;line-height: 24px;font-size: 12px;width: 100px;\">添加</button-ripple>\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ },
/* 163 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"activity-list\">\n\t<div class=\"scroll-view\">\n\t\t<scroll :bottom-height=\"btnHeight\" :scroller.sync=\"scroller\">\n\t\t\t<ul>\n\t\t\t\t<li v-for=\"item in list\">\n\t\t\t\t\t<div class=\"left\">\n\t\t\t\t\t\t<p class=\"name\">会议<i></i></p>\n\t\t\t\t\t\t<div class=\"bottom\">\n\t\t\t\t\t\t\t<a class=\"user-list\">签到人数<span>1</span></a>\n\t\t\t\t\t\t\t<a class=\"msg-list\">上墙消息<span>1</span></a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"right\">\n\t\t\t\t\t\t<div class=\"qrcode\">\n\t\t\t\t\t\t\t上墙二维码\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"big-screen\" @click=\"open\">\n\t\t\t\t\t\t\t<a>\n\t\t\t\t\t\t\t\t进入大屏幕\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<more-fun v-if=\"item.showMore\" transition=\"morefun\"></more-fun>\n\t\t\t\t\t<div class=\"more-edit\" @click=\"refreshHeight(item,$index)\" :class=\"{'moreeditgo':item.showMore,'moreeditback':!item.showMore}\">\n\t\t\t\t\t\t<p>活动功能</p>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</scroll>\n\t</div>\n</div>\n";

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(165)
	__vue_script__ = __webpack_require__(168)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] easierScene\\component\\main-header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(174)
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
	  var id = "_v-2158f122/main-header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(166);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./main-header.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./main-header.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports


	// module
	exports.push([module.id, ".main-header {\n  height: 64px;\n  width: 100%;\n  text-align: center;\n  background-color: #fff;\n  border-bottom: 1px solid #bfbfbf;\n  position: absolute;\n  z-index: 99; }\n  .main-header .container {\n    height: 100%;\n    width: 1230px;\n    margin: 0 auto; }\n    .main-header .container .left {\n      float: left;\n      height: 100%;\n      padding-top: 20px;\n      box-sizing: border-box; }\n      .main-header .container .left img {\n        width: 130px; }\n    .main-header .container .right {\n      height: 100%; }\n      .main-header .container .right .right-buttons {\n        width: 150px;\n        float: right;\n        height: 100%;\n        line-height: 64px;\n        text-align: right; }\n        .main-header .container .right .right-buttons .nickName {\n          height: 100%;\n          text-decoration: none;\n          cursor: pointer;\n          position: relative; }\n          .main-header .container .right .right-buttons .nickName:after {\n            display: block;\n            left: -25px;\n            top: 0px;\n            content: ' ';\n            width: 20px;\n            height: 20px;\n            background: url(" + __webpack_require__(167) + ");\n            position: absolute;\n            background-repeat: no-repeat; }\n          .main-header .container .right .right-buttons .nickName:hover {\n            color: #419ce9; }\n        .main-header .container .right .right-buttons i {\n          color: #419ce9; }\n        .main-header .container .right .right-buttons .button-ripple {\n          margin-top: -5px !important; }\n", ""]);

	// exports


/***/ },
/* 167 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAFRk36sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZDNmYjEwNi1kMGJkLWFmNDEtYjNkNC1mZDViN2Q5YWZhNmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E2RkUyQTBDNzUzMTFFNjhCQkJGNTMwNDUyNEQxOEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0E2RkUyOUZDNzUzMTFFNjhCQkJGNTMwNDUyNEQxOEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpmNzMwMTI4YS0zYmZiLWQ2NDQtOTk3NC1iZGMxNzI1MjcyOWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5MjJjZmMzNi00NDEzLTExZTYtYTY1MS1kY2RhNGQwZTVkY2UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4xGOLcAAABcElEQVR42mL4//8/g+Ocl0uZGCCgDyCAQDxWkChI5D1ICCCAGEA8GAbKcjI5zX3FwYAA3wACCCZzF0SDGE+hAq6MIAZQOciwCyCRdTCDAAIIpocJiM8gmf4fRLNATT63L1nMAMmmQpBRMDO9gAIToVgEiOuBihnhRqBjoHgwQACBdYIAUHcvkAoDYhugrodwbyLrBrInALEKLDBAYBLMJUBdBUDqNogNk9RgwAJgkq+BdnpC7b4AdimSZDQQOwIlsoD0DyBdDhbF5hWgWCYQG4B0rkC3C2jsdCB1HiDA4P6E2qcFpK4AMcjOHSArgNgFiHmAOBKoCWEQkjXduEISKn8aiK/A+ExIrogDRRQDbpAMxJpAV4kihwBMoh8ooY1D40Ugng507msQB92PzEDqDw6NFkBNJ2EcWPLxA7I3AvFCkM1ABX/RdQHVFIJzBANDF1C+nBHo4alAThYs9ggBoAHngZQEyI/+0FgmFoCS5lcAM18GoBqG+xQAAAAASUVORK5CYII="

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _buttonRipple = __webpack_require__(157);

	var _buttonRipple2 = _interopRequireDefault(_buttonRipple);

	var _menuClip = __webpack_require__(169);

	var _menuClip2 = _interopRequireDefault(_menuClip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: {
			buttonRipple: _buttonRipple2.default,
			menuClip: _menuClip2.default
		}
	};

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(170)
	__vue_script__ = __webpack_require__(172)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\web-base\\menu-clip.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(173)
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
	  var id = "_v-69a84da9/menu-clip.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(171);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./menu-clip.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/sass-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./menu-clip.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports


	// module
	exports.push([module.id, ".menu-clip-container {\n  display: block;\n  margin: 0;\n  padding: 0;\n  border: none;\n  position: absolute;\n  overflow: visible;\n  height: 0;\n  width: 0;\n  visibility: hidden;\n  z-index: -1; }\n  .menu-clip-container .menu-outline {\n    display: block;\n    background: #fff;\n    margin: 0;\n    padding: 0;\n    border: none;\n    border-radius: 2px;\n    position: absolute;\n    top: 0;\n    left: 0;\n    overflow: hidden;\n    opacity: 0;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    -webkit-transform-origin: 0 0;\n    transform-origin: 0 0;\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n    will-change: transform;\n    -webkit-transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n    z-index: -1; }\n    .menu-clip-container .menu-outline.menu-outline-right {\n      -webkit-transform-origin: 100% 0;\n      transform-origin: 100% 0; }\n      .menu-clip-container .menu-outline.menu-outline-right .menu {\n        left: auto;\n        right: 0; }\n  .menu-clip-container .menu {\n    position: absolute;\n    list-style: none;\n    top: 0;\n    left: 0;\n    height: auto;\n    width: 100%;\n    min-width: 124px;\n    padding: 8px 0;\n    margin: 0;\n    opacity: 0;\n    clip: rect(0 0 0 0);\n    z-index: -1; }\n    .menu-clip-container .menu > ul {\n      padding: 0; }\n    .menu-clip-container .menu .menu-item {\n      display: block;\n      border: none;\n      color: rgba(0, 0, 0, 0.87);\n      background-color: transparent;\n      text-align: left;\n      margin: 0;\n      outline-color: #bdbdbd;\n      position: relative;\n      overflow: hidden;\n      font-size: 14px;\n      font-weight: 400;\n      letter-spacing: 0;\n      text-decoration: none;\n      cursor: pointer;\n      height: 48px;\n      line-height: 48px;\n      white-space: nowrap;\n      opacity: 0;\n      -webkit-transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n      transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none; }\n      .menu-clip-container .menu .menu-item .button-ripple {\n        width: 100%; }\n  .menu-clip-container.visible {\n    z-index: 999;\n    visibility: visible; }\n    .menu-clip-container.visible .menu-outline {\n      opacity: 1;\n      -webkit-transform: scale(1);\n      transform: scale(1);\n      z-index: 999; }\n    .menu-clip-container.visible .menu {\n      opacity: 1;\n      z-index: 999; }\n    .menu-clip-container.visible .menu-item {\n      opacity: 1; }\n", ""]);

	// exports


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _buttonRipple = __webpack_require__(157);

	var _buttonRipple2 = _interopRequireDefault(_buttonRipple);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Constant = {
		TRANSITION_DURATION_SECONDS: 0.3,
		TRANSITION_DURATION_FRACTION: 0.8,
		CLOSE_TIMEOUT: 150
	};

	exports.default = {
		components: {
			buttonRipple: _buttonRipple2.default
		},
		props: {
			for: {
				type: String
			}
		},
		data: function data() {
			return {
				IS_UPGRADED: false,
				IS_VISIBLE: false,
				IS_ANIMATING: false,
				UNALIGNED: false,

				forElement: null,
				element: null,
				container: null
			};
		},
		ready: function ready() {
			this.IS_UPGRADED = true;
			this.UNALIGNED = true;

			if (this.for) {
				this.forElement = document.getElementById(this.for);
				this.forElement.addEventListener('click', this.handleForClick.bind(this));

				this.element = this.forElement.parentElement;

				this.container = this.$els.menu;

				this.outline = this.$els.outline;
			}
		},


		methods: {
			handleForClick: function handleForClick(evt) {
				if (this.element && this.forElement) {
					var rect = this.forElement.getBoundingClientRect();
					var forRect = this.forElement.parentElement.getBoundingClientRect();

					if (this.UNALIGNED) {} else {
						this.container.style.right = forRect.right - rect.right + 'px';
						this.container.style.top = this.forElement.offsetTop + this.forElement.offsetHeight + 'px';
					}

					this.toggle(evt);
				}
			},
			show: function show(evt) {
				if (this.element && this.container && this.outline) {
					var height = this.$els.list.getBoundingClientRect().height;
					var width = this.element.getBoundingClientRect().width;

					this.container.style.width = width + 'px';
					this.container.style.height = height + 'px';
					this.outline.style.width = width + 'px';
					this.outline.style.height = height + 'px';

					var transitionDuration = Constant.TRANSITION_DURATION_SECONDS * Constant.TRANSITION_DURATION_FRACTION;

					var items = this.element.querySelectorAll('.' + 'menu-item');
					for (var i = 0; i < items.length; i++) {
						var itemDelay = null;
						itemDelay = (height - items[i].offsetTop - items[i].offsetHeight) / height * transitionDuration + 's';
						items[i].style.transitionDelay = itemDelay;
					}

					this.applyClip(height, width);

					window.requestAnimationFrame(function () {
						this.IS_ANIMATING = true;

						this.element.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
						this.$els.list.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';

						this.IS_VISIBLE = true;
					}.bind(this));

					this.addAnimationEndListener();

					var callback = function (e) {
						if (e !== evt && !this.closing_ && e.target.parentNode !== this.element) {
							document.removeEventListener('click', callback);
							this.hide();
						}
					}.bind(this);
					document.addEventListener('click', callback);
				}
			},
			hide: function hide() {
				if (this.element && this.container && this.outline) {
					var items = this.element.querySelectorAll('.' + 'menu-item');

					for (var i = 0; i < items.length; i++) {
						items[i].style.removeProperty('transition-delay');
					}

					var rect = this.element.getBoundingClientRect();
					var height = rect.height;
					var width = rect.width;

					this.IS_ANIMATING = true;
					this.applyClip(height, width);
					this.IS_VISIBLE = false;

					this.addAnimationEndListener();
				}
			},
			toggle: function toggle(evt) {
				if (this.IS_VISIBLE) {
					this.hide();
				} else {
					this.show(evt);
				}
			},
			applyClip: function applyClip(height, width) {
				if (this.UNALIGNED) {
					this.element.style.clip = '';
					this.$els.list.style.clip = '';
				} else {
					this.element.style.clip = 'rect(' + height + 'px ' + width + 'px ' + height + 'px ' + width + 'px)';

					this.$els.list.style.clip = 'rect(' + height + 'px ' + width + 'px ' + height + 'px ' + width + 'px)';
				}
			},
			addAnimationEndListener: function addAnimationEndListener() {
				this.element.addEventListener('transitionend', this.removeAnimationEndListener);
				this.element.addEventListener('webkitTransitionEnd', this.removeAnimationEndListener);
			},
			removeAnimationEndListener: function removeAnimationEndListener(evt) {
				this.IS_ANIMATING = false;
			}
		}
	};

/***/ },
/* 173 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"menu-clip-container\" :class=\"{upgraded: IS_UPGRADED, animating: IS_ANIMATING, visible: IS_VISIBLE}\" v-el:menu>\n\t<div class=\"menu-outline menu-outline-right\" v-el:outline></div>\n\t\n\t<div class=\"menu\" v-el:list>\n\t\t<slot></slot>\n\t</div>\n</div>\n";

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "\n<div class=\"main-header\">\n\t<div class=\"container\">\n\t\t<div class=\"left\">\n\t\t\t<img src=\"" + __webpack_require__(175) + "\" alt=\"\" />\n\t\t</div>\n\t\t<div class=\"right\">\n\n\t\t\t<div class=\"right-buttons\">\n\t\t\t\t<a class=\"nickName\">你好，{{$root.userinfo.nick}} </a>\n\t\t\t\t<button-ripple id=\"ams-menu-button\">\n\t\t\t\t\t<i class=\"glyphicon glyphicon-menu-down\"></i>\n\t\t\t\t</button-ripple>\n\t\t\t\t<menu-clip for=\"ams-menu-button\">\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li class=\"menu-item\">\n\t\t\t\t\t\t\t<a href=\"javascript:;\">\n\t\t\t\t\t\t\t\t<button-ripple>项目1</button-ripple>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"menu-item\">\n\t\t\t\t\t\t\t<a href=\"javascript:;\">\n\t\t\t\t\t\t\t\t<button-ripple>项目2</button-ripple>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"menu-item\">\n\t\t\t\t\t\t\t<a href=\"javascript:;\">\n\t\t\t\t\t\t\t\t<button-ripple>项目3</button-ripple>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</menu-clip>\n\n\t\t\t</div>\n\t\t\t<div class=\"right-buttons no-auth\">\n\t\t\t\t<button-ripple color=\"button-primary\">创建新活动</button-ripple>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n</div>\n";

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/title.5514e16.jpg";

/***/ },
/* 176 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"activity-main\">\n\t<main-header></main-header>\n\t<div class=\"container-content\">\n\t\t<activity-list></activity-list>\n\t</div>\n\n</div>\n";

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.router = undefined;

	var _vue = __webpack_require__(21);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(23);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _vueResource = __webpack_require__(24);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	var _appLogin = __webpack_require__(178);

	var _appLogin2 = _interopRequireDefault(_appLogin);

	var _main = __webpack_require__(137);

	var _main2 = _interopRequireDefault(_main);

	var _loginPanel = __webpack_require__(188);

	var _loginPanel2 = _interopRequireDefault(_loginPanel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);
	_vue2.default.use(_vueResource2.default);

	var router = exports.router = new _vueRouter2.default();

	router.map({
		'/login': {
			component: _loginPanel2.default
		},
		'/main': {
			component: _main2.default
		}
	});

	router.redirect({
		'*': '/login'
	});

	router.start(_appLogin2.default, 'app');

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(179)
	__vue_script__ = __webpack_require__(186)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] easierScene\\view\\app-login.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(187)
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
	  var id = "_v-39690616/app-login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(180);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./bootstrap.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./bootstrap.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\r\n/*!\r\n * Bootstrap v3.3.6 (http://getbootstrap.com)\r\n * Copyright 2011-2015 Twitter, Inc.\r\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\r\n */\r\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\r\nhtml {\r\n  font-family: sans-serif;\r\n  -ms-text-size-adjust: 100%;\r\n  -webkit-text-size-adjust: 100%; }\r\n\r\nbody {\r\n  margin: 0; }\r\n\r\narticle,\r\naside,\r\ndetails,\r\nfigcaption,\r\nfigure,\r\nfooter,\r\nheader,\r\nhgroup,\r\nmain,\r\nmenu,\r\nnav,\r\nsection,\r\nsummary {\r\n  display: block; }\r\n\r\naudio,\r\ncanvas,\r\nprogress,\r\nvideo {\r\n  display: inline-block;\r\n  vertical-align: baseline; }\r\n\r\naudio:not([controls]) {\r\n  display: none;\r\n  height: 0; }\r\n\r\n[hidden],\r\ntemplate {\r\n  display: none; }\r\n\r\na {\r\n  background-color: transparent; }\r\n\r\na:active,\r\na:hover {\r\n  outline: 0; }\r\n\r\nabbr[title] {\r\n  border-bottom: 1px dotted; }\r\n\r\nb,\r\nstrong {\r\n  font-weight: bold; }\r\n\r\ndfn {\r\n  font-style: italic; }\r\n\r\nh1 {\r\n  font-size: 2em;\r\n  margin: 0.67em 0; }\r\n\r\nmark {\r\n  background: #ff0;\r\n  color: #000; }\r\n\r\nsmall {\r\n  font-size: 80%; }\r\n\r\nsub,\r\nsup {\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  position: relative;\r\n  vertical-align: baseline; }\r\n\r\nsup {\r\n  top: -0.5em; }\r\n\r\nsub {\r\n  bottom: -0.25em; }\r\n\r\nimg {\r\n  border: 0; }\r\n\r\nsvg:not(:root) {\r\n  overflow: hidden; }\r\n\r\nfigure {\r\n  margin: 1em 40px; }\r\n\r\nhr {\r\n  box-sizing: content-box;\r\n  height: 0; }\r\n\r\npre {\r\n  overflow: auto; }\r\n\r\ncode,\r\nkbd,\r\npre,\r\nsamp {\r\n  font-family: monospace, monospace;\r\n  font-size: 1em; }\r\n\r\nbutton,\r\ninput,\r\noptgroup,\r\nselect,\r\ntextarea {\r\n  color: inherit;\r\n  font: inherit;\r\n  margin: 0; }\r\n\r\nbutton {\r\n  overflow: visible; }\r\n\r\nbutton,\r\nselect {\r\n  text-transform: none; }\r\n\r\nbutton,\r\nhtml input[type=\"button\"],\r\ninput[type=\"reset\"],\r\ninput[type=\"submit\"] {\r\n  -webkit-appearance: button;\r\n  cursor: pointer; }\r\n\r\nbutton[disabled],\r\nhtml input[disabled] {\r\n  cursor: default; }\r\n\r\nbutton::-moz-focus-inner,\r\ninput::-moz-focus-inner {\r\n  border: 0;\r\n  padding: 0; }\r\n\r\ninput {\r\n  line-height: normal; }\r\n\r\ninput[type=\"checkbox\"],\r\ninput[type=\"radio\"] {\r\n  box-sizing: border-box;\r\n  padding: 0; }\r\n\r\ninput[type=\"number\"]::-webkit-inner-spin-button,\r\ninput[type=\"number\"]::-webkit-outer-spin-button {\r\n  height: auto; }\r\n\r\ninput[type=\"search\"] {\r\n  -webkit-appearance: textfield;\r\n  box-sizing: content-box; }\r\n\r\ninput[type=\"search\"]::-webkit-search-cancel-button,\r\ninput[type=\"search\"]::-webkit-search-decoration {\r\n  -webkit-appearance: none; }\r\n\r\nfieldset {\r\n  border: 1px solid #c0c0c0;\r\n  margin: 0 2px;\r\n  padding: 0.35em 0.625em 0.75em; }\r\n\r\nlegend {\r\n  border: 0;\r\n  padding: 0; }\r\n\r\ntextarea {\r\n  overflow: auto; }\r\n\r\noptgroup {\r\n  font-weight: bold; }\r\n\r\ntable {\r\n  border-collapse: collapse;\r\n  border-spacing: 0; }\r\n\r\ntd,\r\nth {\r\n  padding: 0; }\r\n\r\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\r\n@media print {\r\n  *,\r\n  *:before,\r\n  *:after {\r\n    background: transparent !important;\r\n    color: #000 !important;\r\n    box-shadow: none !important;\r\n    text-shadow: none !important; }\r\n\r\n  a,\r\n  a:visited {\r\n    text-decoration: underline; }\r\n\r\n  a[href]:after {\r\n    content: \" (\" attr(href) \")\"; }\r\n\r\n  abbr[title]:after {\r\n    content: \" (\" attr(title) \")\"; }\r\n\r\n  a[href^=\"#\"]:after,\r\n  a[href^=\"javascript:\"]:after {\r\n    content: \"\"; }\r\n\r\n  pre,\r\n  blockquote {\r\n    border: 1px solid #999;\r\n    page-break-inside: avoid; }\r\n\r\n  thead {\r\n    display: table-header-group; }\r\n\r\n  tr,\r\n  img {\r\n    page-break-inside: avoid; }\r\n\r\n  img {\r\n    max-width: 100% !important; }\r\n\r\n  p,\r\n  h2,\r\n  h3 {\r\n    orphans: 3;\r\n    widows: 3; }\r\n\r\n  h2,\r\n  h3 {\r\n    page-break-after: avoid; }\r\n\r\n  .navbar {\r\n    display: none; }\r\n\r\n  .btn > .caret,\r\n  .dropup > .btn > .caret {\r\n    border-top-color: #000 !important; }\r\n\r\n  .label {\r\n    border: 1px solid #000; }\r\n\r\n  .table {\r\n    border-collapse: collapse !important; }\r\n    .table td,\r\n    .table th {\r\n      background-color: #fff !important; }\r\n\r\n  .table-bordered th,\r\n  .table-bordered td {\r\n    border: 1px solid #ddd !important; } }\r\n@font-face {\r\n  font-family: 'Glyphicons Halflings';\r\n  src: url(" + __webpack_require__(181) + ");\r\n  src: url(" + __webpack_require__(181) + "?#iefix) format(\"embedded-opentype\"), url(" + __webpack_require__(182) + ") format(\"woff2\"), url(" + __webpack_require__(183) + ") format(\"woff\"), url(" + __webpack_require__(184) + ") format(\"truetype\"), url(" + __webpack_require__(185) + "#glyphicons_halflingsregular) format(\"svg\"); }\r\n.glyphicon {\r\n  position: relative;\r\n  top: 1px;\r\n  display: inline-block;\r\n  font-family: 'Glyphicons Halflings';\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale; }\r\n\r\n.glyphicon-asterisk:before {\r\n  content: \"*\"; }\r\n\r\n.glyphicon-plus:before {\r\n  content: \"+\"; }\r\n\r\n.glyphicon-euro:before,\r\n.glyphicon-eur:before {\r\n  content: \"\\20AC\"; }\r\n\r\n.glyphicon-minus:before {\r\n  content: \"\\2212\"; }\r\n\r\n.glyphicon-cloud:before {\r\n  content: \"\\2601\"; }\r\n\r\n.glyphicon-envelope:before {\r\n  content: \"\\2709\"; }\r\n\r\n.glyphicon-pencil:before {\r\n  content: \"\\270F\"; }\r\n\r\n.glyphicon-glass:before {\r\n  content: \"\\E001\"; }\r\n\r\n.glyphicon-music:before {\r\n  content: \"\\E002\"; }\r\n\r\n.glyphicon-search:before {\r\n  content: \"\\E003\"; }\r\n\r\n.glyphicon-heart:before {\r\n  content: \"\\E005\"; }\r\n\r\n.glyphicon-star:before {\r\n  content: \"\\E006\"; }\r\n\r\n.glyphicon-star-empty:before {\r\n  content: \"\\E007\"; }\r\n\r\n.glyphicon-user:before {\r\n  content: \"\\E008\"; }\r\n\r\n.glyphicon-film:before {\r\n  content: \"\\E009\"; }\r\n\r\n.glyphicon-th-large:before {\r\n  content: \"\\E010\"; }\r\n\r\n.glyphicon-th:before {\r\n  content: \"\\E011\"; }\r\n\r\n.glyphicon-th-list:before {\r\n  content: \"\\E012\"; }\r\n\r\n.glyphicon-ok:before {\r\n  content: \"\\E013\"; }\r\n\r\n.glyphicon-remove:before {\r\n  content: \"\\E014\"; }\r\n\r\n.glyphicon-zoom-in:before {\r\n  content: \"\\E015\"; }\r\n\r\n.glyphicon-zoom-out:before {\r\n  content: \"\\E016\"; }\r\n\r\n.glyphicon-off:before {\r\n  content: \"\\E017\"; }\r\n\r\n.glyphicon-signal:before {\r\n  content: \"\\E018\"; }\r\n\r\n.glyphicon-cog:before {\r\n  content: \"\\E019\"; }\r\n\r\n.glyphicon-trash:before {\r\n  content: \"\\E020\"; }\r\n\r\n.glyphicon-home:before {\r\n  content: \"\\E021\"; }\r\n\r\n.glyphicon-file:before {\r\n  content: \"\\E022\"; }\r\n\r\n.glyphicon-time:before {\r\n  content: \"\\E023\"; }\r\n\r\n.glyphicon-road:before {\r\n  content: \"\\E024\"; }\r\n\r\n.glyphicon-download-alt:before {\r\n  content: \"\\E025\"; }\r\n\r\n.glyphicon-download:before {\r\n  content: \"\\E026\"; }\r\n\r\n.glyphicon-upload:before {\r\n  content: \"\\E027\"; }\r\n\r\n.glyphicon-inbox:before {\r\n  content: \"\\E028\"; }\r\n\r\n.glyphicon-play-circle:before {\r\n  content: \"\\E029\"; }\r\n\r\n.glyphicon-repeat:before {\r\n  content: \"\\E030\"; }\r\n\r\n.glyphicon-refresh:before {\r\n  content: \"\\E031\"; }\r\n\r\n.glyphicon-list-alt:before {\r\n  content: \"\\E032\"; }\r\n\r\n.glyphicon-lock:before {\r\n  content: \"\\E033\"; }\r\n\r\n.glyphicon-flag:before {\r\n  content: \"\\E034\"; }\r\n\r\n.glyphicon-headphones:before {\r\n  content: \"\\E035\"; }\r\n\r\n.glyphicon-volume-off:before {\r\n  content: \"\\E036\"; }\r\n\r\n.glyphicon-volume-down:before {\r\n  content: \"\\E037\"; }\r\n\r\n.glyphicon-volume-up:before {\r\n  content: \"\\E038\"; }\r\n\r\n.glyphicon-qrcode:before {\r\n  content: \"\\E039\"; }\r\n\r\n.glyphicon-barcode:before {\r\n  content: \"\\E040\"; }\r\n\r\n.glyphicon-tag:before {\r\n  content: \"\\E041\"; }\r\n\r\n.glyphicon-tags:before {\r\n  content: \"\\E042\"; }\r\n\r\n.glyphicon-book:before {\r\n  content: \"\\E043\"; }\r\n\r\n.glyphicon-bookmark:before {\r\n  content: \"\\E044\"; }\r\n\r\n.glyphicon-print:before {\r\n  content: \"\\E045\"; }\r\n\r\n.glyphicon-camera:before {\r\n  content: \"\\E046\"; }\r\n\r\n.glyphicon-font:before {\r\n  content: \"\\E047\"; }\r\n\r\n.glyphicon-bold:before {\r\n  content: \"\\E048\"; }\r\n\r\n.glyphicon-italic:before {\r\n  content: \"\\E049\"; }\r\n\r\n.glyphicon-text-height:before {\r\n  content: \"\\E050\"; }\r\n\r\n.glyphicon-text-width:before {\r\n  content: \"\\E051\"; }\r\n\r\n.glyphicon-align-left:before {\r\n  content: \"\\E052\"; }\r\n\r\n.glyphicon-align-center:before {\r\n  content: \"\\E053\"; }\r\n\r\n.glyphicon-align-right:before {\r\n  content: \"\\E054\"; }\r\n\r\n.glyphicon-align-justify:before {\r\n  content: \"\\E055\"; }\r\n\r\n.glyphicon-list:before {\r\n  content: \"\\E056\"; }\r\n\r\n.glyphicon-indent-left:before {\r\n  content: \"\\E057\"; }\r\n\r\n.glyphicon-indent-right:before {\r\n  content: \"\\E058\"; }\r\n\r\n.glyphicon-facetime-video:before {\r\n  content: \"\\E059\"; }\r\n\r\n.glyphicon-picture:before {\r\n  content: \"\\E060\"; }\r\n\r\n.glyphicon-map-marker:before {\r\n  content: \"\\E062\"; }\r\n\r\n.glyphicon-adjust:before {\r\n  content: \"\\E063\"; }\r\n\r\n.glyphicon-tint:before {\r\n  content: \"\\E064\"; }\r\n\r\n.glyphicon-edit:before {\r\n  content: \"\\E065\"; }\r\n\r\n.glyphicon-share:before {\r\n  content: \"\\E066\"; }\r\n\r\n.glyphicon-check:before {\r\n  content: \"\\E067\"; }\r\n\r\n.glyphicon-move:before {\r\n  content: \"\\E068\"; }\r\n\r\n.glyphicon-step-backward:before {\r\n  content: \"\\E069\"; }\r\n\r\n.glyphicon-fast-backward:before {\r\n  content: \"\\E070\"; }\r\n\r\n.glyphicon-backward:before {\r\n  content: \"\\E071\"; }\r\n\r\n.glyphicon-play:before {\r\n  content: \"\\E072\"; }\r\n\r\n.glyphicon-pause:before {\r\n  content: \"\\E073\"; }\r\n\r\n.glyphicon-stop:before {\r\n  content: \"\\E074\"; }\r\n\r\n.glyphicon-forward:before {\r\n  content: \"\\E075\"; }\r\n\r\n.glyphicon-fast-forward:before {\r\n  content: \"\\E076\"; }\r\n\r\n.glyphicon-step-forward:before {\r\n  content: \"\\E077\"; }\r\n\r\n.glyphicon-eject:before {\r\n  content: \"\\E078\"; }\r\n\r\n.glyphicon-chevron-left:before {\r\n  content: \"\\E079\"; }\r\n\r\n.glyphicon-chevron-right:before {\r\n  content: \"\\E080\"; }\r\n\r\n.glyphicon-plus-sign:before {\r\n  content: \"\\E081\"; }\r\n\r\n.glyphicon-minus-sign:before {\r\n  content: \"\\E082\"; }\r\n\r\n.glyphicon-remove-sign:before {\r\n  content: \"\\E083\"; }\r\n\r\n.glyphicon-ok-sign:before {\r\n  content: \"\\E084\"; }\r\n\r\n.glyphicon-question-sign:before {\r\n  content: \"\\E085\"; }\r\n\r\n.glyphicon-info-sign:before {\r\n  content: \"\\E086\"; }\r\n\r\n.glyphicon-screenshot:before {\r\n  content: \"\\E087\"; }\r\n\r\n.glyphicon-remove-circle:before {\r\n  content: \"\\E088\"; }\r\n\r\n.glyphicon-ok-circle:before {\r\n  content: \"\\E089\"; }\r\n\r\n.glyphicon-ban-circle:before {\r\n  content: \"\\E090\"; }\r\n\r\n.glyphicon-arrow-left:before {\r\n  content: \"\\E091\"; }\r\n\r\n.glyphicon-arrow-right:before {\r\n  content: \"\\E092\"; }\r\n\r\n.glyphicon-arrow-up:before {\r\n  content: \"\\E093\"; }\r\n\r\n.glyphicon-arrow-down:before {\r\n  content: \"\\E094\"; }\r\n\r\n.glyphicon-share-alt:before {\r\n  content: \"\\E095\"; }\r\n\r\n.glyphicon-resize-full:before {\r\n  content: \"\\E096\"; }\r\n\r\n.glyphicon-resize-small:before {\r\n  content: \"\\E097\"; }\r\n\r\n.glyphicon-exclamation-sign:before {\r\n  content: \"\\E101\"; }\r\n\r\n.glyphicon-gift:before {\r\n  content: \"\\E102\"; }\r\n\r\n.glyphicon-leaf:before {\r\n  content: \"\\E103\"; }\r\n\r\n.glyphicon-fire:before {\r\n  content: \"\\E104\"; }\r\n\r\n.glyphicon-eye-open:before {\r\n  content: \"\\E105\"; }\r\n\r\n.glyphicon-eye-close:before {\r\n  content: \"\\E106\"; }\r\n\r\n.glyphicon-warning-sign:before {\r\n  content: \"\\E107\"; }\r\n\r\n.glyphicon-plane:before {\r\n  content: \"\\E108\"; }\r\n\r\n.glyphicon-calendar:before {\r\n  content: \"\\E109\"; }\r\n\r\n.glyphicon-random:before {\r\n  content: \"\\E110\"; }\r\n\r\n.glyphicon-comment:before {\r\n  content: \"\\E111\"; }\r\n\r\n.glyphicon-magnet:before {\r\n  content: \"\\E112\"; }\r\n\r\n.glyphicon-chevron-up:before {\r\n  content: \"\\E113\"; }\r\n\r\n.glyphicon-chevron-down:before {\r\n  content: \"\\E114\"; }\r\n\r\n.glyphicon-retweet:before {\r\n  content: \"\\E115\"; }\r\n\r\n.glyphicon-shopping-cart:before {\r\n  content: \"\\E116\"; }\r\n\r\n.glyphicon-folder-close:before {\r\n  content: \"\\E117\"; }\r\n\r\n.glyphicon-folder-open:before {\r\n  content: \"\\E118\"; }\r\n\r\n.glyphicon-resize-vertical:before {\r\n  content: \"\\E119\"; }\r\n\r\n.glyphicon-resize-horizontal:before {\r\n  content: \"\\E120\"; }\r\n\r\n.glyphicon-hdd:before {\r\n  content: \"\\E121\"; }\r\n\r\n.glyphicon-bullhorn:before {\r\n  content: \"\\E122\"; }\r\n\r\n.glyphicon-bell:before {\r\n  content: \"\\E123\"; }\r\n\r\n.glyphicon-certificate:before {\r\n  content: \"\\E124\"; }\r\n\r\n.glyphicon-thumbs-up:before {\r\n  content: \"\\E125\"; }\r\n\r\n.glyphicon-thumbs-down:before {\r\n  content: \"\\E126\"; }\r\n\r\n.glyphicon-hand-right:before {\r\n  content: \"\\E127\"; }\r\n\r\n.glyphicon-hand-left:before {\r\n  content: \"\\E128\"; }\r\n\r\n.glyphicon-hand-up:before {\r\n  content: \"\\E129\"; }\r\n\r\n.glyphicon-hand-down:before {\r\n  content: \"\\E130\"; }\r\n\r\n.glyphicon-circle-arrow-right:before {\r\n  content: \"\\E131\"; }\r\n\r\n.glyphicon-circle-arrow-left:before {\r\n  content: \"\\E132\"; }\r\n\r\n.glyphicon-circle-arrow-up:before {\r\n  content: \"\\E133\"; }\r\n\r\n.glyphicon-circle-arrow-down:before {\r\n  content: \"\\E134\"; }\r\n\r\n.glyphicon-globe:before {\r\n  content: \"\\E135\"; }\r\n\r\n.glyphicon-wrench:before {\r\n  content: \"\\E136\"; }\r\n\r\n.glyphicon-tasks:before {\r\n  content: \"\\E137\"; }\r\n\r\n.glyphicon-filter:before {\r\n  content: \"\\E138\"; }\r\n\r\n.glyphicon-briefcase:before {\r\n  content: \"\\E139\"; }\r\n\r\n.glyphicon-fullscreen:before {\r\n  content: \"\\E140\"; }\r\n\r\n.glyphicon-dashboard:before {\r\n  content: \"\\E141\"; }\r\n\r\n.glyphicon-paperclip:before {\r\n  content: \"\\E142\"; }\r\n\r\n.glyphicon-heart-empty:before {\r\n  content: \"\\E143\"; }\r\n\r\n.glyphicon-link:before {\r\n  content: \"\\E144\"; }\r\n\r\n.glyphicon-phone:before {\r\n  content: \"\\E145\"; }\r\n\r\n.glyphicon-pushpin:before {\r\n  content: \"\\E146\"; }\r\n\r\n.glyphicon-usd:before {\r\n  content: \"\\E148\"; }\r\n\r\n.glyphicon-gbp:before {\r\n  content: \"\\E149\"; }\r\n\r\n.glyphicon-sort:before {\r\n  content: \"\\E150\"; }\r\n\r\n.glyphicon-sort-by-alphabet:before {\r\n  content: \"\\E151\"; }\r\n\r\n.glyphicon-sort-by-alphabet-alt:before {\r\n  content: \"\\E152\"; }\r\n\r\n.glyphicon-sort-by-order:before {\r\n  content: \"\\E153\"; }\r\n\r\n.glyphicon-sort-by-order-alt:before {\r\n  content: \"\\E154\"; }\r\n\r\n.glyphicon-sort-by-attributes:before {\r\n  content: \"\\E155\"; }\r\n\r\n.glyphicon-sort-by-attributes-alt:before {\r\n  content: \"\\E156\"; }\r\n\r\n.glyphicon-unchecked:before {\r\n  content: \"\\E157\"; }\r\n\r\n.glyphicon-expand:before {\r\n  content: \"\\E158\"; }\r\n\r\n.glyphicon-collapse-down:before {\r\n  content: \"\\E159\"; }\r\n\r\n.glyphicon-collapse-up:before {\r\n  content: \"\\E160\"; }\r\n\r\n.glyphicon-log-in:before {\r\n  content: \"\\E161\"; }\r\n\r\n.glyphicon-flash:before {\r\n  content: \"\\E162\"; }\r\n\r\n.glyphicon-log-out:before {\r\n  content: \"\\E163\"; }\r\n\r\n.glyphicon-new-window:before {\r\n  content: \"\\E164\"; }\r\n\r\n.glyphicon-record:before {\r\n  content: \"\\E165\"; }\r\n\r\n.glyphicon-save:before {\r\n  content: \"\\E166\"; }\r\n\r\n.glyphicon-open:before {\r\n  content: \"\\E167\"; }\r\n\r\n.glyphicon-saved:before {\r\n  content: \"\\E168\"; }\r\n\r\n.glyphicon-import:before {\r\n  content: \"\\E169\"; }\r\n\r\n.glyphicon-export:before {\r\n  content: \"\\E170\"; }\r\n\r\n.glyphicon-send:before {\r\n  content: \"\\E171\"; }\r\n\r\n.glyphicon-floppy-disk:before {\r\n  content: \"\\E172\"; }\r\n\r\n.glyphicon-floppy-saved:before {\r\n  content: \"\\E173\"; }\r\n\r\n.glyphicon-floppy-remove:before {\r\n  content: \"\\E174\"; }\r\n\r\n.glyphicon-floppy-save:before {\r\n  content: \"\\E175\"; }\r\n\r\n.glyphicon-floppy-open:before {\r\n  content: \"\\E176\"; }\r\n\r\n.glyphicon-credit-card:before {\r\n  content: \"\\E177\"; }\r\n\r\n.glyphicon-transfer:before {\r\n  content: \"\\E178\"; }\r\n\r\n.glyphicon-cutlery:before {\r\n  content: \"\\E179\"; }\r\n\r\n.glyphicon-header:before {\r\n  content: \"\\E180\"; }\r\n\r\n.glyphicon-compressed:before {\r\n  content: \"\\E181\"; }\r\n\r\n.glyphicon-earphone:before {\r\n  content: \"\\E182\"; }\r\n\r\n.glyphicon-phone-alt:before {\r\n  content: \"\\E183\"; }\r\n\r\n.glyphicon-tower:before {\r\n  content: \"\\E184\"; }\r\n\r\n.glyphicon-stats:before {\r\n  content: \"\\E185\"; }\r\n\r\n.glyphicon-sd-video:before {\r\n  content: \"\\E186\"; }\r\n\r\n.glyphicon-hd-video:before {\r\n  content: \"\\E187\"; }\r\n\r\n.glyphicon-subtitles:before {\r\n  content: \"\\E188\"; }\r\n\r\n.glyphicon-sound-stereo:before {\r\n  content: \"\\E189\"; }\r\n\r\n.glyphicon-sound-dolby:before {\r\n  content: \"\\E190\"; }\r\n\r\n.glyphicon-sound-5-1:before {\r\n  content: \"\\E191\"; }\r\n\r\n.glyphicon-sound-6-1:before {\r\n  content: \"\\E192\"; }\r\n\r\n.glyphicon-sound-7-1:before {\r\n  content: \"\\E193\"; }\r\n\r\n.glyphicon-copyright-mark:before {\r\n  content: \"\\E194\"; }\r\n\r\n.glyphicon-registration-mark:before {\r\n  content: \"\\E195\"; }\r\n\r\n.glyphicon-cloud-download:before {\r\n  content: \"\\E197\"; }\r\n\r\n.glyphicon-cloud-upload:before {\r\n  content: \"\\E198\"; }\r\n\r\n.glyphicon-tree-conifer:before {\r\n  content: \"\\E199\"; }\r\n\r\n.glyphicon-tree-deciduous:before {\r\n  content: \"\\E200\"; }\r\n\r\n.glyphicon-cd:before {\r\n  content: \"\\E201\"; }\r\n\r\n.glyphicon-save-file:before {\r\n  content: \"\\E202\"; }\r\n\r\n.glyphicon-open-file:before {\r\n  content: \"\\E203\"; }\r\n\r\n.glyphicon-level-up:before {\r\n  content: \"\\E204\"; }\r\n\r\n.glyphicon-copy:before {\r\n  content: \"\\E205\"; }\r\n\r\n.glyphicon-paste:before {\r\n  content: \"\\E206\"; }\r\n\r\n.glyphicon-alert:before {\r\n  content: \"\\E209\"; }\r\n\r\n.glyphicon-equalizer:before {\r\n  content: \"\\E210\"; }\r\n\r\n.glyphicon-king:before {\r\n  content: \"\\E211\"; }\r\n\r\n.glyphicon-queen:before {\r\n  content: \"\\E212\"; }\r\n\r\n.glyphicon-pawn:before {\r\n  content: \"\\E213\"; }\r\n\r\n.glyphicon-bishop:before {\r\n  content: \"\\E214\"; }\r\n\r\n.glyphicon-knight:before {\r\n  content: \"\\E215\"; }\r\n\r\n.glyphicon-baby-formula:before {\r\n  content: \"\\E216\"; }\r\n\r\n.glyphicon-tent:before {\r\n  content: \"\\26FA\"; }\r\n\r\n.glyphicon-blackboard:before {\r\n  content: \"\\E218\"; }\r\n\r\n.glyphicon-bed:before {\r\n  content: \"\\E219\"; }\r\n\r\n.glyphicon-apple:before {\r\n  content: \"\\F8FF\"; }\r\n\r\n.glyphicon-erase:before {\r\n  content: \"\\E221\"; }\r\n\r\n.glyphicon-hourglass:before {\r\n  content: \"\\231B\"; }\r\n\r\n.glyphicon-lamp:before {\r\n  content: \"\\E223\"; }\r\n\r\n.glyphicon-duplicate:before {\r\n  content: \"\\E224\"; }\r\n\r\n.glyphicon-piggy-bank:before {\r\n  content: \"\\E225\"; }\r\n\r\n.glyphicon-scissors:before {\r\n  content: \"\\E226\"; }\r\n\r\n.glyphicon-bitcoin:before {\r\n  content: \"\\E227\"; }\r\n\r\n.glyphicon-btc:before {\r\n  content: \"\\E227\"; }\r\n\r\n.glyphicon-xbt:before {\r\n  content: \"\\E227\"; }\r\n\r\n.glyphicon-yen:before {\r\n  content: \"\\A5\"; }\r\n\r\n.glyphicon-jpy:before {\r\n  content: \"\\A5\"; }\r\n\r\n.glyphicon-ruble:before {\r\n  content: \"\\20BD\"; }\r\n\r\n.glyphicon-rub:before {\r\n  content: \"\\20BD\"; }\r\n\r\n.glyphicon-scale:before {\r\n  content: \"\\E230\"; }\r\n\r\n.glyphicon-ice-lolly:before {\r\n  content: \"\\E231\"; }\r\n\r\n.glyphicon-ice-lolly-tasted:before {\r\n  content: \"\\E232\"; }\r\n\r\n.glyphicon-education:before {\r\n  content: \"\\E233\"; }\r\n\r\n.glyphicon-option-horizontal:before {\r\n  content: \"\\E234\"; }\r\n\r\n.glyphicon-option-vertical:before {\r\n  content: \"\\E235\"; }\r\n\r\n.glyphicon-menu-hamburger:before {\r\n  content: \"\\E236\"; }\r\n\r\n.glyphicon-modal-window:before {\r\n  content: \"\\E237\"; }\r\n\r\n.glyphicon-oil:before {\r\n  content: \"\\E238\"; }\r\n\r\n.glyphicon-grain:before {\r\n  content: \"\\E239\"; }\r\n\r\n.glyphicon-sunglasses:before {\r\n  content: \"\\E240\"; }\r\n\r\n.glyphicon-text-size:before {\r\n  content: \"\\E241\"; }\r\n\r\n.glyphicon-text-color:before {\r\n  content: \"\\E242\"; }\r\n\r\n.glyphicon-text-background:before {\r\n  content: \"\\E243\"; }\r\n\r\n.glyphicon-object-align-top:before {\r\n  content: \"\\E244\"; }\r\n\r\n.glyphicon-object-align-bottom:before {\r\n  content: \"\\E245\"; }\r\n\r\n.glyphicon-object-align-horizontal:before {\r\n  content: \"\\E246\"; }\r\n\r\n.glyphicon-object-align-left:before {\r\n  content: \"\\E247\"; }\r\n\r\n.glyphicon-object-align-vertical:before {\r\n  content: \"\\E248\"; }\r\n\r\n.glyphicon-object-align-right:before {\r\n  content: \"\\E249\"; }\r\n\r\n.glyphicon-triangle-right:before {\r\n  content: \"\\E250\"; }\r\n\r\n.glyphicon-triangle-left:before {\r\n  content: \"\\E251\"; }\r\n\r\n.glyphicon-triangle-bottom:before {\r\n  content: \"\\E252\"; }\r\n\r\n.glyphicon-triangle-top:before {\r\n  content: \"\\E253\"; }\r\n\r\n.glyphicon-console:before {\r\n  content: \"\\E254\"; }\r\n\r\n.glyphicon-superscript:before {\r\n  content: \"\\E255\"; }\r\n\r\n.glyphicon-subscript:before {\r\n  content: \"\\E256\"; }\r\n\r\n.glyphicon-menu-left:before {\r\n  content: \"\\E257\"; }\r\n\r\n.glyphicon-menu-right:before {\r\n  content: \"\\E258\"; }\r\n\r\n.glyphicon-menu-down:before {\r\n  content: \"\\E259\"; }\r\n\r\n.glyphicon-menu-up:before {\r\n  content: \"\\E260\"; }\r\n\r\n* {\r\n  box-sizing: border-box; }\r\n\r\n*:before,\r\n*:after {\r\n  box-sizing: border-box; }\r\n\r\nhtml {\r\n  font-size: 10px;\r\n  -webkit-tap-highlight-color: transparent; }\r\n\r\nbody {\r\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  line-height: 1.42857;\r\n  color: #333333;\r\n  background-color: #fff; }\r\n\r\ninput,\r\nbutton,\r\nselect,\r\ntextarea {\r\n  font-family: inherit;\r\n  font-size: inherit;\r\n  line-height: inherit; }\r\n\r\na {\r\n  color: #419ce9;\r\n  text-decoration: none; }\r\n  a:hover, a:focus {\r\n    color: #1776c7;\r\n    text-decoration: underline; }\r\n  a:focus {\r\n    outline: thin dotted;\r\n    outline: 5px auto -webkit-focus-ring-color;\r\n    outline-offset: -2px; }\r\n\r\nfigure {\r\n  margin: 0; }\r\n\r\nimg {\r\n  vertical-align: middle; }\r\n\r\n.img-responsive {\r\n  display: block;\r\n  max-width: 100%;\r\n  height: auto; }\r\n\r\n.img-rounded {\r\n  border-radius: 4px; }\r\n\r\n.img-thumbnail {\r\n  padding: 4px;\r\n  line-height: 1.42857;\r\n  background-color: #fff;\r\n  border: 1px solid #ddd;\r\n  border-radius: 0;\r\n  -webkit-transition: all 0.2s ease-in-out;\r\n  transition: all 0.2s ease-in-out;\r\n  display: inline-block;\r\n  max-width: 100%;\r\n  height: auto; }\r\n\r\n.img-circle {\r\n  border-radius: 50%; }\r\n\r\nhr {\r\n  margin-top: 20px;\r\n  margin-bottom: 20px;\r\n  border: 0;\r\n  border-top: 1px solid #eeeeee; }\r\n\r\n.sr-only {\r\n  position: absolute;\r\n  width: 1px;\r\n  height: 1px;\r\n  margin: -1px;\r\n  padding: 0;\r\n  overflow: hidden;\r\n  clip: rect(0, 0, 0, 0);\r\n  border: 0; }\r\n\r\n.sr-only-focusable:active, .sr-only-focusable:focus {\r\n  position: static;\r\n  width: auto;\r\n  height: auto;\r\n  margin: 0;\r\n  overflow: visible;\r\n  clip: auto; }\r\n\r\n[role=\"button\"] {\r\n  cursor: pointer; }\r\n\r\nh1, h2, h3, h4, h5, h6,\r\n.h1, .h2, .h3, .h4, .h5, .h6 {\r\n  font-family: inherit;\r\n  font-weight: 500;\r\n  line-height: 1.1;\r\n  color: inherit; }\r\n  h1 small,\r\n  h1 .small, h2 small,\r\n  h2 .small, h3 small,\r\n  h3 .small, h4 small,\r\n  h4 .small, h5 small,\r\n  h5 .small, h6 small,\r\n  h6 .small,\r\n  .h1 small,\r\n  .h1 .small, .h2 small,\r\n  .h2 .small, .h3 small,\r\n  .h3 .small, .h4 small,\r\n  .h4 .small, .h5 small,\r\n  .h5 .small, .h6 small,\r\n  .h6 .small {\r\n    font-weight: normal;\r\n    line-height: 1;\r\n    color: #777777; }\r\n\r\nh1, .h1,\r\nh2, .h2,\r\nh3, .h3 {\r\n  margin-top: 20px;\r\n  margin-bottom: 10px; }\r\n  h1 small,\r\n  h1 .small, .h1 small,\r\n  .h1 .small,\r\n  h2 small,\r\n  h2 .small, .h2 small,\r\n  .h2 .small,\r\n  h3 small,\r\n  h3 .small, .h3 small,\r\n  .h3 .small {\r\n    font-size: 65%; }\r\n\r\nh4, .h4,\r\nh5, .h5,\r\nh6, .h6 {\r\n  margin-top: 10px;\r\n  margin-bottom: 10px; }\r\n  h4 small,\r\n  h4 .small, .h4 small,\r\n  .h4 .small,\r\n  h5 small,\r\n  h5 .small, .h5 small,\r\n  .h5 .small,\r\n  h6 small,\r\n  h6 .small, .h6 small,\r\n  .h6 .small {\r\n    font-size: 75%; }\r\n\r\nh1, .h1 {\r\n  font-size: 36px; }\r\n\r\nh2, .h2 {\r\n  font-size: 30px; }\r\n\r\nh3, .h3 {\r\n  font-size: 24px; }\r\n\r\nh4, .h4 {\r\n  font-size: 18px; }\r\n\r\nh5, .h5 {\r\n  font-size: 14px; }\r\n\r\nh6, .h6 {\r\n  font-size: 12px; }\r\n\r\np {\r\n  margin: 0 0 10px; }\r\n\r\n.lead {\r\n  margin-bottom: 20px;\r\n  font-size: 16px;\r\n  font-weight: 300;\r\n  line-height: 1.4; }\r\n  @media (min-width: 0px) {\r\n    .lead {\r\n      font-size: 21px; } }\r\n\r\nsmall,\r\n.small {\r\n  font-size: 85%; }\r\n\r\nmark,\r\n.mark {\r\n  background-color: #fcf8e3;\r\n  padding: .2em; }\r\n\r\n.text-left {\r\n  text-align: left; }\r\n\r\n.text-right {\r\n  text-align: right; }\r\n\r\n.text-center {\r\n  text-align: center; }\r\n\r\n.text-justify {\r\n  text-align: justify; }\r\n\r\n.text-nowrap {\r\n  white-space: nowrap; }\r\n\r\n.text-lowercase {\r\n  text-transform: lowercase; }\r\n\r\n.text-uppercase, .initialism {\r\n  text-transform: uppercase; }\r\n\r\n.text-capitalize {\r\n  text-transform: capitalize; }\r\n\r\n.text-muted {\r\n  color: #777777; }\r\n\r\n.text-primary {\r\n  color: #419ce9; }\r\n\r\na.text-primary:hover,\r\na.text-primary:focus {\r\n  color: #1a84dd; }\r\n\r\n.text-success {\r\n  color: #3c763d; }\r\n\r\na.text-success:hover,\r\na.text-success:focus {\r\n  color: #2b542c; }\r\n\r\n.text-info {\r\n  color: #31708f; }\r\n\r\na.text-info:hover,\r\na.text-info:focus {\r\n  color: #245269; }\r\n\r\n.text-warning {\r\n  color: #8a6d3b; }\r\n\r\na.text-warning:hover,\r\na.text-warning:focus {\r\n  color: #66512c; }\r\n\r\n.text-danger {\r\n  color: #a94442; }\r\n\r\na.text-danger:hover,\r\na.text-danger:focus {\r\n  color: #843534; }\r\n\r\n.bg-primary {\r\n  color: #fff; }\r\n\r\n.bg-primary {\r\n  background-color: #419ce9; }\r\n\r\na.bg-primary:hover,\r\na.bg-primary:focus {\r\n  background-color: #1a84dd; }\r\n\r\n.bg-success {\r\n  background-color: #dff0d8; }\r\n\r\na.bg-success:hover,\r\na.bg-success:focus {\r\n  background-color: #c1e2b3; }\r\n\r\n.bg-info {\r\n  background-color: #d9edf7; }\r\n\r\na.bg-info:hover,\r\na.bg-info:focus {\r\n  background-color: #afd9ee; }\r\n\r\n.bg-warning {\r\n  background-color: #fcf8e3; }\r\n\r\na.bg-warning:hover,\r\na.bg-warning:focus {\r\n  background-color: #f7ecb5; }\r\n\r\n.bg-danger {\r\n  background-color: #f2dede; }\r\n\r\na.bg-danger:hover,\r\na.bg-danger:focus {\r\n  background-color: #e4b9b9; }\r\n\r\n.page-header {\r\n  padding-bottom: 9px;\r\n  margin: 40px 0 20px;\r\n  border-bottom: 1px solid #eeeeee; }\r\n\r\nul,\r\nol {\r\n  margin-top: 0;\r\n  margin-bottom: 10px; }\r\n  ul ul,\r\n  ul ol,\r\n  ol ul,\r\n  ol ol {\r\n    margin-bottom: 0; }\r\n\r\n.list-unstyled {\r\n  padding-left: 0;\r\n  list-style: none; }\r\n\r\n.list-inline {\r\n  padding-left: 0;\r\n  list-style: none;\r\n  margin-left: -5px; }\r\n  .list-inline > li {\r\n    display: inline-block;\r\n    padding-left: 5px;\r\n    padding-right: 5px; }\r\n\r\ndl {\r\n  margin-top: 0;\r\n  margin-bottom: 20px; }\r\n\r\ndt,\r\ndd {\r\n  line-height: 1.42857; }\r\n\r\ndt {\r\n  font-weight: bold; }\r\n\r\ndd {\r\n  margin-left: 0; }\r\n\r\n.dl-horizontal dd:before, .dl-horizontal dd:after {\r\n  content: \" \";\r\n  display: table; }\r\n.dl-horizontal dd:after {\r\n  clear: both; }\r\n@media (min-width: 0px) {\r\n  .dl-horizontal dt {\r\n    float: left;\r\n    width: 160px;\r\n    clear: left;\r\n    text-align: right;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap; }\r\n  .dl-horizontal dd {\r\n    margin-left: 180px; } }\r\n\r\nabbr[title],\r\nabbr[data-original-title] {\r\n  cursor: help;\r\n  border-bottom: 1px dotted #777777; }\r\n\r\n.initialism {\r\n  font-size: 90%; }\r\n\r\nblockquote {\r\n  padding: 10px 20px;\r\n  margin: 0 0 20px;\r\n  font-size: 17.5px;\r\n  border-left: 5px solid #eeeeee; }\r\n  blockquote p:last-child,\r\n  blockquote ul:last-child,\r\n  blockquote ol:last-child {\r\n    margin-bottom: 0; }\r\n  blockquote footer,\r\n  blockquote small,\r\n  blockquote .small {\r\n    display: block;\r\n    font-size: 80%;\r\n    line-height: 1.42857;\r\n    color: #777777; }\r\n    blockquote footer:before,\r\n    blockquote small:before,\r\n    blockquote .small:before {\r\n      content: '\\2014   \\A0'; }\r\n\r\n.blockquote-reverse,\r\nblockquote.pull-right {\r\n  padding-right: 15px;\r\n  padding-left: 0;\r\n  border-right: 5px solid #eeeeee;\r\n  border-left: 0;\r\n  text-align: right; }\r\n  .blockquote-reverse footer:before,\r\n  .blockquote-reverse small:before,\r\n  .blockquote-reverse .small:before,\r\n  blockquote.pull-right footer:before,\r\n  blockquote.pull-right small:before,\r\n  blockquote.pull-right .small:before {\r\n    content: ''; }\r\n  .blockquote-reverse footer:after,\r\n  .blockquote-reverse small:after,\r\n  .blockquote-reverse .small:after,\r\n  blockquote.pull-right footer:after,\r\n  blockquote.pull-right small:after,\r\n  blockquote.pull-right .small:after {\r\n    content: '\\A0   \\2014'; }\r\n\r\naddress {\r\n  margin-bottom: 20px;\r\n  font-style: normal;\r\n  line-height: 1.42857; }\r\n\r\ncode,\r\nkbd,\r\npre,\r\nsamp {\r\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace; }\r\n\r\ncode {\r\n  padding: 2px 4px;\r\n  font-size: 90%;\r\n  color: #c7254e;\r\n  background-color: #f9f2f4;\r\n  border-radius: 0; }\r\n\r\nkbd {\r\n  padding: 2px 4px;\r\n  font-size: 90%;\r\n  color: #fff;\r\n  background-color: #333;\r\n  border-radius: 2px;\r\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25); }\r\n  kbd kbd {\r\n    padding: 0;\r\n    font-size: 100%;\r\n    font-weight: bold;\r\n    box-shadow: none; }\r\n\r\npre {\r\n  display: block;\r\n  padding: 9.5px;\r\n  margin: 0 0 10px;\r\n  font-size: 13px;\r\n  line-height: 1.42857;\r\n  word-break: break-all;\r\n  word-wrap: break-word;\r\n  color: #333333;\r\n  background-color: #f5f5f5;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0; }\r\n  pre code {\r\n    padding: 0;\r\n    font-size: inherit;\r\n    color: inherit;\r\n    white-space: pre-wrap;\r\n    background-color: transparent;\r\n    border-radius: 0; }\r\n\r\n.pre-scrollable {\r\n  max-height: 340px;\r\n  overflow-y: scroll; }\r\n\r\n.container {\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n  padding-left: 10px;\r\n  padding-right: 10px; }\r\n  .container:before, .container:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .container:after {\r\n    clear: both; }\r\n  @media (max-width: 1300px) {\r\n    .container {\r\n      width: 950px; } }\r\n  @media (min-width: 1300px) {\r\n    .container {\r\n      width: 1250px; } }\r\n\r\n.container-fluid {\r\n  margin-right: auto;\r\n  margin-left: auto;\r\n  padding-left: 10px;\r\n  padding-right: 10px; }\r\n  .container-fluid:before, .container-fluid:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .container-fluid:after {\r\n    clear: both; }\r\n\r\n.row {\r\n  margin-left: -10px;\r\n  margin-right: -10px; }\r\n  .row:before, .row:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .row:after {\r\n    clear: both; }\r\n\r\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\r\n  position: relative;\r\n  min-height: 1px;\r\n  padding-left: 10px;\r\n  padding-right: 10px; }\r\n\r\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\r\n  float: left; }\r\n\r\n.col-xs-1 {\r\n  width: 8.33333%; }\r\n\r\n.col-xs-2 {\r\n  width: 16.66667%; }\r\n\r\n.col-xs-3 {\r\n  width: 25%; }\r\n\r\n.col-xs-4 {\r\n  width: 33.33333%; }\r\n\r\n.col-xs-5 {\r\n  width: 41.66667%; }\r\n\r\n.col-xs-6 {\r\n  width: 50%; }\r\n\r\n.col-xs-7 {\r\n  width: 58.33333%; }\r\n\r\n.col-xs-8 {\r\n  width: 66.66667%; }\r\n\r\n.col-xs-9 {\r\n  width: 75%; }\r\n\r\n.col-xs-10 {\r\n  width: 83.33333%; }\r\n\r\n.col-xs-11 {\r\n  width: 91.66667%; }\r\n\r\n.col-xs-12 {\r\n  width: 100%; }\r\n\r\n.col-xs-pull-0 {\r\n  right: auto; }\r\n\r\n.col-xs-pull-1 {\r\n  right: 8.33333%; }\r\n\r\n.col-xs-pull-2 {\r\n  right: 16.66667%; }\r\n\r\n.col-xs-pull-3 {\r\n  right: 25%; }\r\n\r\n.col-xs-pull-4 {\r\n  right: 33.33333%; }\r\n\r\n.col-xs-pull-5 {\r\n  right: 41.66667%; }\r\n\r\n.col-xs-pull-6 {\r\n  right: 50%; }\r\n\r\n.col-xs-pull-7 {\r\n  right: 58.33333%; }\r\n\r\n.col-xs-pull-8 {\r\n  right: 66.66667%; }\r\n\r\n.col-xs-pull-9 {\r\n  right: 75%; }\r\n\r\n.col-xs-pull-10 {\r\n  right: 83.33333%; }\r\n\r\n.col-xs-pull-11 {\r\n  right: 91.66667%; }\r\n\r\n.col-xs-pull-12 {\r\n  right: 100%; }\r\n\r\n.col-xs-push-0 {\r\n  left: auto; }\r\n\r\n.col-xs-push-1 {\r\n  left: 8.33333%; }\r\n\r\n.col-xs-push-2 {\r\n  left: 16.66667%; }\r\n\r\n.col-xs-push-3 {\r\n  left: 25%; }\r\n\r\n.col-xs-push-4 {\r\n  left: 33.33333%; }\r\n\r\n.col-xs-push-5 {\r\n  left: 41.66667%; }\r\n\r\n.col-xs-push-6 {\r\n  left: 50%; }\r\n\r\n.col-xs-push-7 {\r\n  left: 58.33333%; }\r\n\r\n.col-xs-push-8 {\r\n  left: 66.66667%; }\r\n\r\n.col-xs-push-9 {\r\n  left: 75%; }\r\n\r\n.col-xs-push-10 {\r\n  left: 83.33333%; }\r\n\r\n.col-xs-push-11 {\r\n  left: 91.66667%; }\r\n\r\n.col-xs-push-12 {\r\n  left: 100%; }\r\n\r\n.col-xs-offset-0 {\r\n  margin-left: 0%; }\r\n\r\n.col-xs-offset-1 {\r\n  margin-left: 8.33333%; }\r\n\r\n.col-xs-offset-2 {\r\n  margin-left: 16.66667%; }\r\n\r\n.col-xs-offset-3 {\r\n  margin-left: 25%; }\r\n\r\n.col-xs-offset-4 {\r\n  margin-left: 33.33333%; }\r\n\r\n.col-xs-offset-5 {\r\n  margin-left: 41.66667%; }\r\n\r\n.col-xs-offset-6 {\r\n  margin-left: 50%; }\r\n\r\n.col-xs-offset-7 {\r\n  margin-left: 58.33333%; }\r\n\r\n.col-xs-offset-8 {\r\n  margin-left: 66.66667%; }\r\n\r\n.col-xs-offset-9 {\r\n  margin-left: 75%; }\r\n\r\n.col-xs-offset-10 {\r\n  margin-left: 83.33333%; }\r\n\r\n.col-xs-offset-11 {\r\n  margin-left: 91.66667%; }\r\n\r\n.col-xs-offset-12 {\r\n  margin-left: 100%; }\r\n\r\n@media (min-width: 0px) {\r\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\r\n    float: left; }\r\n\r\n  .col-sm-1 {\r\n    width: 8.33333%; }\r\n\r\n  .col-sm-2 {\r\n    width: 16.66667%; }\r\n\r\n  .col-sm-3 {\r\n    width: 25%; }\r\n\r\n  .col-sm-4 {\r\n    width: 33.33333%; }\r\n\r\n  .col-sm-5 {\r\n    width: 41.66667%; }\r\n\r\n  .col-sm-6 {\r\n    width: 50%; }\r\n\r\n  .col-sm-7 {\r\n    width: 58.33333%; }\r\n\r\n  .col-sm-8 {\r\n    width: 66.66667%; }\r\n\r\n  .col-sm-9 {\r\n    width: 75%; }\r\n\r\n  .col-sm-10 {\r\n    width: 83.33333%; }\r\n\r\n  .col-sm-11 {\r\n    width: 91.66667%; }\r\n\r\n  .col-sm-12 {\r\n    width: 100%; }\r\n\r\n  .col-sm-pull-0 {\r\n    right: auto; }\r\n\r\n  .col-sm-pull-1 {\r\n    right: 8.33333%; }\r\n\r\n  .col-sm-pull-2 {\r\n    right: 16.66667%; }\r\n\r\n  .col-sm-pull-3 {\r\n    right: 25%; }\r\n\r\n  .col-sm-pull-4 {\r\n    right: 33.33333%; }\r\n\r\n  .col-sm-pull-5 {\r\n    right: 41.66667%; }\r\n\r\n  .col-sm-pull-6 {\r\n    right: 50%; }\r\n\r\n  .col-sm-pull-7 {\r\n    right: 58.33333%; }\r\n\r\n  .col-sm-pull-8 {\r\n    right: 66.66667%; }\r\n\r\n  .col-sm-pull-9 {\r\n    right: 75%; }\r\n\r\n  .col-sm-pull-10 {\r\n    right: 83.33333%; }\r\n\r\n  .col-sm-pull-11 {\r\n    right: 91.66667%; }\r\n\r\n  .col-sm-pull-12 {\r\n    right: 100%; }\r\n\r\n  .col-sm-push-0 {\r\n    left: auto; }\r\n\r\n  .col-sm-push-1 {\r\n    left: 8.33333%; }\r\n\r\n  .col-sm-push-2 {\r\n    left: 16.66667%; }\r\n\r\n  .col-sm-push-3 {\r\n    left: 25%; }\r\n\r\n  .col-sm-push-4 {\r\n    left: 33.33333%; }\r\n\r\n  .col-sm-push-5 {\r\n    left: 41.66667%; }\r\n\r\n  .col-sm-push-6 {\r\n    left: 50%; }\r\n\r\n  .col-sm-push-7 {\r\n    left: 58.33333%; }\r\n\r\n  .col-sm-push-8 {\r\n    left: 66.66667%; }\r\n\r\n  .col-sm-push-9 {\r\n    left: 75%; }\r\n\r\n  .col-sm-push-10 {\r\n    left: 83.33333%; }\r\n\r\n  .col-sm-push-11 {\r\n    left: 91.66667%; }\r\n\r\n  .col-sm-push-12 {\r\n    left: 100%; }\r\n\r\n  .col-sm-offset-0 {\r\n    margin-left: 0%; }\r\n\r\n  .col-sm-offset-1 {\r\n    margin-left: 8.33333%; }\r\n\r\n  .col-sm-offset-2 {\r\n    margin-left: 16.66667%; }\r\n\r\n  .col-sm-offset-3 {\r\n    margin-left: 25%; }\r\n\r\n  .col-sm-offset-4 {\r\n    margin-left: 33.33333%; }\r\n\r\n  .col-sm-offset-5 {\r\n    margin-left: 41.66667%; }\r\n\r\n  .col-sm-offset-6 {\r\n    margin-left: 50%; }\r\n\r\n  .col-sm-offset-7 {\r\n    margin-left: 58.33333%; }\r\n\r\n  .col-sm-offset-8 {\r\n    margin-left: 66.66667%; }\r\n\r\n  .col-sm-offset-9 {\r\n    margin-left: 75%; }\r\n\r\n  .col-sm-offset-10 {\r\n    margin-left: 83.33333%; }\r\n\r\n  .col-sm-offset-11 {\r\n    margin-left: 91.66667%; }\r\n\r\n  .col-sm-offset-12 {\r\n    margin-left: 100%; } }\r\n@media (min-width: 992px) {\r\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\r\n    float: left; }\r\n\r\n  .col-md-1 {\r\n    width: 8.33333%; }\r\n\r\n  .col-md-2 {\r\n    width: 16.66667%; }\r\n\r\n  .col-md-3 {\r\n    width: 25%; }\r\n\r\n  .col-md-4 {\r\n    width: 33.33333%; }\r\n\r\n  .col-md-5 {\r\n    width: 41.66667%; }\r\n\r\n  .col-md-6 {\r\n    width: 50%; }\r\n\r\n  .col-md-7 {\r\n    width: 58.33333%; }\r\n\r\n  .col-md-8 {\r\n    width: 66.66667%; }\r\n\r\n  .col-md-9 {\r\n    width: 75%; }\r\n\r\n  .col-md-10 {\r\n    width: 83.33333%; }\r\n\r\n  .col-md-11 {\r\n    width: 91.66667%; }\r\n\r\n  .col-md-12 {\r\n    width: 100%; }\r\n\r\n  .col-md-pull-0 {\r\n    right: auto; }\r\n\r\n  .col-md-pull-1 {\r\n    right: 8.33333%; }\r\n\r\n  .col-md-pull-2 {\r\n    right: 16.66667%; }\r\n\r\n  .col-md-pull-3 {\r\n    right: 25%; }\r\n\r\n  .col-md-pull-4 {\r\n    right: 33.33333%; }\r\n\r\n  .col-md-pull-5 {\r\n    right: 41.66667%; }\r\n\r\n  .col-md-pull-6 {\r\n    right: 50%; }\r\n\r\n  .col-md-pull-7 {\r\n    right: 58.33333%; }\r\n\r\n  .col-md-pull-8 {\r\n    right: 66.66667%; }\r\n\r\n  .col-md-pull-9 {\r\n    right: 75%; }\r\n\r\n  .col-md-pull-10 {\r\n    right: 83.33333%; }\r\n\r\n  .col-md-pull-11 {\r\n    right: 91.66667%; }\r\n\r\n  .col-md-pull-12 {\r\n    right: 100%; }\r\n\r\n  .col-md-push-0 {\r\n    left: auto; }\r\n\r\n  .col-md-push-1 {\r\n    left: 8.33333%; }\r\n\r\n  .col-md-push-2 {\r\n    left: 16.66667%; }\r\n\r\n  .col-md-push-3 {\r\n    left: 25%; }\r\n\r\n  .col-md-push-4 {\r\n    left: 33.33333%; }\r\n\r\n  .col-md-push-5 {\r\n    left: 41.66667%; }\r\n\r\n  .col-md-push-6 {\r\n    left: 50%; }\r\n\r\n  .col-md-push-7 {\r\n    left: 58.33333%; }\r\n\r\n  .col-md-push-8 {\r\n    left: 66.66667%; }\r\n\r\n  .col-md-push-9 {\r\n    left: 75%; }\r\n\r\n  .col-md-push-10 {\r\n    left: 83.33333%; }\r\n\r\n  .col-md-push-11 {\r\n    left: 91.66667%; }\r\n\r\n  .col-md-push-12 {\r\n    left: 100%; }\r\n\r\n  .col-md-offset-0 {\r\n    margin-left: 0%; }\r\n\r\n  .col-md-offset-1 {\r\n    margin-left: 8.33333%; }\r\n\r\n  .col-md-offset-2 {\r\n    margin-left: 16.66667%; }\r\n\r\n  .col-md-offset-3 {\r\n    margin-left: 25%; }\r\n\r\n  .col-md-offset-4 {\r\n    margin-left: 33.33333%; }\r\n\r\n  .col-md-offset-5 {\r\n    margin-left: 41.66667%; }\r\n\r\n  .col-md-offset-6 {\r\n    margin-left: 50%; }\r\n\r\n  .col-md-offset-7 {\r\n    margin-left: 58.33333%; }\r\n\r\n  .col-md-offset-8 {\r\n    margin-left: 66.66667%; }\r\n\r\n  .col-md-offset-9 {\r\n    margin-left: 75%; }\r\n\r\n  .col-md-offset-10 {\r\n    margin-left: 83.33333%; }\r\n\r\n  .col-md-offset-11 {\r\n    margin-left: 91.66667%; }\r\n\r\n  .col-md-offset-12 {\r\n    margin-left: 100%; } }\r\n@media (min-width: 1300px) {\r\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\r\n    float: left; }\r\n\r\n  .col-lg-1 {\r\n    width: 8.33333%; }\r\n\r\n  .col-lg-2 {\r\n    width: 16.66667%; }\r\n\r\n  .col-lg-3 {\r\n    width: 25%; }\r\n\r\n  .col-lg-4 {\r\n    width: 33.33333%; }\r\n\r\n  .col-lg-5 {\r\n    width: 41.66667%; }\r\n\r\n  .col-lg-6 {\r\n    width: 50%; }\r\n\r\n  .col-lg-7 {\r\n    width: 58.33333%; }\r\n\r\n  .col-lg-8 {\r\n    width: 66.66667%; }\r\n\r\n  .col-lg-9 {\r\n    width: 75%; }\r\n\r\n  .col-lg-10 {\r\n    width: 83.33333%; }\r\n\r\n  .col-lg-11 {\r\n    width: 91.66667%; }\r\n\r\n  .col-lg-12 {\r\n    width: 100%; }\r\n\r\n  .col-lg-pull-0 {\r\n    right: auto; }\r\n\r\n  .col-lg-pull-1 {\r\n    right: 8.33333%; }\r\n\r\n  .col-lg-pull-2 {\r\n    right: 16.66667%; }\r\n\r\n  .col-lg-pull-3 {\r\n    right: 25%; }\r\n\r\n  .col-lg-pull-4 {\r\n    right: 33.33333%; }\r\n\r\n  .col-lg-pull-5 {\r\n    right: 41.66667%; }\r\n\r\n  .col-lg-pull-6 {\r\n    right: 50%; }\r\n\r\n  .col-lg-pull-7 {\r\n    right: 58.33333%; }\r\n\r\n  .col-lg-pull-8 {\r\n    right: 66.66667%; }\r\n\r\n  .col-lg-pull-9 {\r\n    right: 75%; }\r\n\r\n  .col-lg-pull-10 {\r\n    right: 83.33333%; }\r\n\r\n  .col-lg-pull-11 {\r\n    right: 91.66667%; }\r\n\r\n  .col-lg-pull-12 {\r\n    right: 100%; }\r\n\r\n  .col-lg-push-0 {\r\n    left: auto; }\r\n\r\n  .col-lg-push-1 {\r\n    left: 8.33333%; }\r\n\r\n  .col-lg-push-2 {\r\n    left: 16.66667%; }\r\n\r\n  .col-lg-push-3 {\r\n    left: 25%; }\r\n\r\n  .col-lg-push-4 {\r\n    left: 33.33333%; }\r\n\r\n  .col-lg-push-5 {\r\n    left: 41.66667%; }\r\n\r\n  .col-lg-push-6 {\r\n    left: 50%; }\r\n\r\n  .col-lg-push-7 {\r\n    left: 58.33333%; }\r\n\r\n  .col-lg-push-8 {\r\n    left: 66.66667%; }\r\n\r\n  .col-lg-push-9 {\r\n    left: 75%; }\r\n\r\n  .col-lg-push-10 {\r\n    left: 83.33333%; }\r\n\r\n  .col-lg-push-11 {\r\n    left: 91.66667%; }\r\n\r\n  .col-lg-push-12 {\r\n    left: 100%; }\r\n\r\n  .col-lg-offset-0 {\r\n    margin-left: 0%; }\r\n\r\n  .col-lg-offset-1 {\r\n    margin-left: 8.33333%; }\r\n\r\n  .col-lg-offset-2 {\r\n    margin-left: 16.66667%; }\r\n\r\n  .col-lg-offset-3 {\r\n    margin-left: 25%; }\r\n\r\n  .col-lg-offset-4 {\r\n    margin-left: 33.33333%; }\r\n\r\n  .col-lg-offset-5 {\r\n    margin-left: 41.66667%; }\r\n\r\n  .col-lg-offset-6 {\r\n    margin-left: 50%; }\r\n\r\n  .col-lg-offset-7 {\r\n    margin-left: 58.33333%; }\r\n\r\n  .col-lg-offset-8 {\r\n    margin-left: 66.66667%; }\r\n\r\n  .col-lg-offset-9 {\r\n    margin-left: 75%; }\r\n\r\n  .col-lg-offset-10 {\r\n    margin-left: 83.33333%; }\r\n\r\n  .col-lg-offset-11 {\r\n    margin-left: 91.66667%; }\r\n\r\n  .col-lg-offset-12 {\r\n    margin-left: 100%; } }\r\n.alpha {\r\n  padding-left: 0; }\r\n\r\n.omega {\r\n  padding-right: 0; }\r\n\r\ntable {\r\n  background-color: transparent; }\r\n\r\ncaption {\r\n  padding-top: 8px;\r\n  padding-bottom: 8px;\r\n  color: #777777;\r\n  text-align: left; }\r\n\r\nth {\r\n  text-align: left; }\r\n\r\n.table {\r\n  width: 100%;\r\n  max-width: 100%;\r\n  margin-bottom: 20px; }\r\n  .table > thead > tr > th,\r\n  .table > thead > tr > td,\r\n  .table > tbody > tr > th,\r\n  .table > tbody > tr > td,\r\n  .table > tfoot > tr > th,\r\n  .table > tfoot > tr > td {\r\n    padding: 8px;\r\n    line-height: 1.42857;\r\n    vertical-align: top;\r\n    border-top: 1px solid #ddd; }\r\n  .table > thead > tr > th {\r\n    vertical-align: bottom;\r\n    border-bottom: 2px solid #ddd; }\r\n  .table > caption + thead > tr:first-child > th,\r\n  .table > caption + thead > tr:first-child > td,\r\n  .table > colgroup + thead > tr:first-child > th,\r\n  .table > colgroup + thead > tr:first-child > td,\r\n  .table > thead:first-child > tr:first-child > th,\r\n  .table > thead:first-child > tr:first-child > td {\r\n    border-top: 0; }\r\n  .table > tbody + tbody {\r\n    border-top: 2px solid #ddd; }\r\n  .table .table {\r\n    background-color: #fff; }\r\n\r\n.table-condensed > thead > tr > th,\r\n.table-condensed > thead > tr > td,\r\n.table-condensed > tbody > tr > th,\r\n.table-condensed > tbody > tr > td,\r\n.table-condensed > tfoot > tr > th,\r\n.table-condensed > tfoot > tr > td {\r\n  padding: 5px; }\r\n\r\n.table-bordered {\r\n  border: 1px solid #ddd; }\r\n  .table-bordered > thead > tr > th,\r\n  .table-bordered > thead > tr > td,\r\n  .table-bordered > tbody > tr > th,\r\n  .table-bordered > tbody > tr > td,\r\n  .table-bordered > tfoot > tr > th,\r\n  .table-bordered > tfoot > tr > td {\r\n    border: 1px solid #ddd; }\r\n  .table-bordered > thead > tr > th,\r\n  .table-bordered > thead > tr > td {\r\n    border-bottom-width: 2px; }\r\n\r\n.table-striped > tbody > tr:nth-of-type(odd) {\r\n  background-color: #f9f9f9; }\r\n\r\n.table-hover > tbody > tr:hover {\r\n  background-color: #f5f5f5; }\r\n\r\ntable col[class*=\"col-\"] {\r\n  position: static;\r\n  float: none;\r\n  display: table-column; }\r\n\r\ntable td[class*=\"col-\"],\r\ntable th[class*=\"col-\"] {\r\n  position: static;\r\n  float: none;\r\n  display: table-cell; }\r\n\r\n.table > thead > tr > td.active,\r\n.table > thead > tr > th.active, .table > thead > tr.active > td, .table > thead > tr.active > th,\r\n.table > tbody > tr > td.active,\r\n.table > tbody > tr > th.active,\r\n.table > tbody > tr.active > td,\r\n.table > tbody > tr.active > th,\r\n.table > tfoot > tr > td.active,\r\n.table > tfoot > tr > th.active,\r\n.table > tfoot > tr.active > td,\r\n.table > tfoot > tr.active > th {\r\n  background-color: #f5f5f5; }\r\n\r\n.table-hover > tbody > tr > td.active:hover,\r\n.table-hover > tbody > tr > th.active:hover, .table-hover > tbody > tr.active:hover > td, .table-hover > tbody > tr:hover > .active, .table-hover > tbody > tr.active:hover > th {\r\n  background-color: #e8e8e8; }\r\n\r\n.table > thead > tr > td.success,\r\n.table > thead > tr > th.success, .table > thead > tr.success > td, .table > thead > tr.success > th,\r\n.table > tbody > tr > td.success,\r\n.table > tbody > tr > th.success,\r\n.table > tbody > tr.success > td,\r\n.table > tbody > tr.success > th,\r\n.table > tfoot > tr > td.success,\r\n.table > tfoot > tr > th.success,\r\n.table > tfoot > tr.success > td,\r\n.table > tfoot > tr.success > th {\r\n  background-color: #dff0d8; }\r\n\r\n.table-hover > tbody > tr > td.success:hover,\r\n.table-hover > tbody > tr > th.success:hover, .table-hover > tbody > tr.success:hover > td, .table-hover > tbody > tr:hover > .success, .table-hover > tbody > tr.success:hover > th {\r\n  background-color: #d0e9c6; }\r\n\r\n.table > thead > tr > td.info,\r\n.table > thead > tr > th.info, .table > thead > tr.info > td, .table > thead > tr.info > th,\r\n.table > tbody > tr > td.info,\r\n.table > tbody > tr > th.info,\r\n.table > tbody > tr.info > td,\r\n.table > tbody > tr.info > th,\r\n.table > tfoot > tr > td.info,\r\n.table > tfoot > tr > th.info,\r\n.table > tfoot > tr.info > td,\r\n.table > tfoot > tr.info > th {\r\n  background-color: #d9edf7; }\r\n\r\n.table-hover > tbody > tr > td.info:hover,\r\n.table-hover > tbody > tr > th.info:hover, .table-hover > tbody > tr.info:hover > td, .table-hover > tbody > tr:hover > .info, .table-hover > tbody > tr.info:hover > th {\r\n  background-color: #c4e3f3; }\r\n\r\n.table > thead > tr > td.warning,\r\n.table > thead > tr > th.warning, .table > thead > tr.warning > td, .table > thead > tr.warning > th,\r\n.table > tbody > tr > td.warning,\r\n.table > tbody > tr > th.warning,\r\n.table > tbody > tr.warning > td,\r\n.table > tbody > tr.warning > th,\r\n.table > tfoot > tr > td.warning,\r\n.table > tfoot > tr > th.warning,\r\n.table > tfoot > tr.warning > td,\r\n.table > tfoot > tr.warning > th {\r\n  background-color: #fcf8e3; }\r\n\r\n.table-hover > tbody > tr > td.warning:hover,\r\n.table-hover > tbody > tr > th.warning:hover, .table-hover > tbody > tr.warning:hover > td, .table-hover > tbody > tr:hover > .warning, .table-hover > tbody > tr.warning:hover > th {\r\n  background-color: #faf2cc; }\r\n\r\n.table > thead > tr > td.danger,\r\n.table > thead > tr > th.danger, .table > thead > tr.danger > td, .table > thead > tr.danger > th,\r\n.table > tbody > tr > td.danger,\r\n.table > tbody > tr > th.danger,\r\n.table > tbody > tr.danger > td,\r\n.table > tbody > tr.danger > th,\r\n.table > tfoot > tr > td.danger,\r\n.table > tfoot > tr > th.danger,\r\n.table > tfoot > tr.danger > td,\r\n.table > tfoot > tr.danger > th {\r\n  background-color: #f2dede; }\r\n\r\n.table-hover > tbody > tr > td.danger:hover,\r\n.table-hover > tbody > tr > th.danger:hover, .table-hover > tbody > tr.danger:hover > td, .table-hover > tbody > tr:hover > .danger, .table-hover > tbody > tr.danger:hover > th {\r\n  background-color: #ebcccc; }\r\n\r\n.table-responsive {\r\n  overflow-x: auto;\r\n  min-height: 0.01%; }\r\n  @media screen and (max-width: -1px) {\r\n    .table-responsive {\r\n      width: 100%;\r\n      margin-bottom: 15px;\r\n      overflow-y: hidden;\r\n      -ms-overflow-style: -ms-autohiding-scrollbar;\r\n      border: 1px solid #ddd; }\r\n      .table-responsive > .table {\r\n        margin-bottom: 0; }\r\n        .table-responsive > .table > thead > tr > th,\r\n        .table-responsive > .table > thead > tr > td,\r\n        .table-responsive > .table > tbody > tr > th,\r\n        .table-responsive > .table > tbody > tr > td,\r\n        .table-responsive > .table > tfoot > tr > th,\r\n        .table-responsive > .table > tfoot > tr > td {\r\n          white-space: nowrap; }\r\n      .table-responsive > .table-bordered {\r\n        border: 0; }\r\n        .table-responsive > .table-bordered > thead > tr > th:first-child,\r\n        .table-responsive > .table-bordered > thead > tr > td:first-child,\r\n        .table-responsive > .table-bordered > tbody > tr > th:first-child,\r\n        .table-responsive > .table-bordered > tbody > tr > td:first-child,\r\n        .table-responsive > .table-bordered > tfoot > tr > th:first-child,\r\n        .table-responsive > .table-bordered > tfoot > tr > td:first-child {\r\n          border-left: 0; }\r\n        .table-responsive > .table-bordered > thead > tr > th:last-child,\r\n        .table-responsive > .table-bordered > thead > tr > td:last-child,\r\n        .table-responsive > .table-bordered > tbody > tr > th:last-child,\r\n        .table-responsive > .table-bordered > tbody > tr > td:last-child,\r\n        .table-responsive > .table-bordered > tfoot > tr > th:last-child,\r\n        .table-responsive > .table-bordered > tfoot > tr > td:last-child {\r\n          border-right: 0; }\r\n        .table-responsive > .table-bordered > tbody > tr:last-child > th,\r\n        .table-responsive > .table-bordered > tbody > tr:last-child > td,\r\n        .table-responsive > .table-bordered > tfoot > tr:last-child > th,\r\n        .table-responsive > .table-bordered > tfoot > tr:last-child > td {\r\n          border-bottom: 0; } }\r\n\r\nfieldset {\r\n  padding: 0;\r\n  margin: 0;\r\n  border: 0;\r\n  min-width: 0; }\r\n\r\nlegend {\r\n  display: block;\r\n  width: 100%;\r\n  padding: 0;\r\n  margin-bottom: 20px;\r\n  font-size: 21px;\r\n  line-height: inherit;\r\n  color: #333333;\r\n  border: 0;\r\n  border-bottom: 1px solid #e5e5e5; }\r\n\r\nlabel {\r\n  display: inline-block;\r\n  max-width: 100%; }\r\n\r\ninput[type=\"search\"] {\r\n  box-sizing: border-box; }\r\n\r\ninput[type=\"radio\"],\r\ninput[type=\"checkbox\"] {\r\n  margin-top: 1px \\9;\r\n  line-height: normal; }\r\n\r\ninput[type=\"file\"] {\r\n  display: block; }\r\n\r\ninput[type=\"range\"] {\r\n  display: block;\r\n  width: 100%; }\r\n\r\nselect[multiple],\r\nselect[size] {\r\n  height: auto; }\r\n\r\ninput[type=\"file\"]:focus,\r\ninput[type=\"radio\"]:focus,\r\ninput[type=\"checkbox\"]:focus {\r\n  outline: thin dotted;\r\n  outline: 5px auto -webkit-focus-ring-color;\r\n  outline-offset: -2px; }\r\n\r\noutput {\r\n  display: block;\r\n  padding-top: 7px;\r\n  font-size: 14px;\r\n  line-height: 1.42857;\r\n  color: #222222; }\r\n\r\n.form-control {\r\n  display: block;\r\n  width: 100%;\r\n  height: 34px;\r\n  padding: 6px 12px;\r\n  font-size: 14px;\r\n  line-height: 1.42857;\r\n  color: #222222;\r\n  background-color: #f3f3f3;\r\n  background-image: none;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0; }\r\n  .form-control:focus {\r\n    border-color: #66afe9;\r\n    outline: 0; }\r\n  .form-control::-moz-placeholder {\r\n    color: #999;\r\n    opacity: 1; }\r\n  .form-control:-ms-input-placeholder {\r\n    color: #999; }\r\n  .form-control::-webkit-input-placeholder {\r\n    color: #999; }\r\n  .form-control::-ms-expand {\r\n    border: 0;\r\n    background-color: transparent; }\r\n  .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {\r\n    background-color: #eeeeee;\r\n    opacity: 1; }\r\n  .form-control[disabled], fieldset[disabled] .form-control {\r\n    cursor: not-allowed; }\r\n\r\ntextarea.form-control {\r\n  height: auto; }\r\n\r\ninput[type=\"search\"] {\r\n  -webkit-appearance: none; }\r\n\r\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\r\n  input[type=\"date\"].form-control,\r\n  input[type=\"time\"].form-control,\r\n  input[type=\"datetime-local\"].form-control,\r\n  input[type=\"month\"].form-control {\r\n    line-height: 34px; }\r\n  input[type=\"date\"].input-sm, .input-group-sm > input[type=\"date\"].form-control,\r\n  .input-group-sm > input[type=\"date\"].input-group-addon,\r\n  .input-group-sm > .input-group-btn > input[type=\"date\"].btn, .input-group-sm input[type=\"date\"],\r\n  input[type=\"time\"].input-sm,\r\n  .input-group-sm > input[type=\"time\"].form-control,\r\n  .input-group-sm > input[type=\"time\"].input-group-addon,\r\n  .input-group-sm > .input-group-btn > input[type=\"time\"].btn, .input-group-sm\r\n  input[type=\"time\"],\r\n  input[type=\"datetime-local\"].input-sm,\r\n  .input-group-sm > input[type=\"datetime-local\"].form-control,\r\n  .input-group-sm > input[type=\"datetime-local\"].input-group-addon,\r\n  .input-group-sm > .input-group-btn > input[type=\"datetime-local\"].btn, .input-group-sm\r\n  input[type=\"datetime-local\"],\r\n  input[type=\"month\"].input-sm,\r\n  .input-group-sm > input[type=\"month\"].form-control,\r\n  .input-group-sm > input[type=\"month\"].input-group-addon,\r\n  .input-group-sm > .input-group-btn > input[type=\"month\"].btn, .input-group-sm\r\n  input[type=\"month\"] {\r\n    line-height: 30px; }\r\n  input[type=\"date\"].input-lg, .input-group-lg > input[type=\"date\"].form-control,\r\n  .input-group-lg > input[type=\"date\"].input-group-addon,\r\n  .input-group-lg > .input-group-btn > input[type=\"date\"].btn, .input-group-lg input[type=\"date\"],\r\n  input[type=\"time\"].input-lg,\r\n  .input-group-lg > input[type=\"time\"].form-control,\r\n  .input-group-lg > input[type=\"time\"].input-group-addon,\r\n  .input-group-lg > .input-group-btn > input[type=\"time\"].btn, .input-group-lg\r\n  input[type=\"time\"],\r\n  input[type=\"datetime-local\"].input-lg,\r\n  .input-group-lg > input[type=\"datetime-local\"].form-control,\r\n  .input-group-lg > input[type=\"datetime-local\"].input-group-addon,\r\n  .input-group-lg > .input-group-btn > input[type=\"datetime-local\"].btn, .input-group-lg\r\n  input[type=\"datetime-local\"],\r\n  input[type=\"month\"].input-lg,\r\n  .input-group-lg > input[type=\"month\"].form-control,\r\n  .input-group-lg > input[type=\"month\"].input-group-addon,\r\n  .input-group-lg > .input-group-btn > input[type=\"month\"].btn, .input-group-lg\r\n  input[type=\"month\"] {\r\n    line-height: 45px; } }\r\n.form-group {\r\n  margin-bottom: 15px; }\r\n\r\n.radio,\r\n.checkbox {\r\n  position: relative;\r\n  display: block;\r\n  margin-top: 10px;\r\n  margin-bottom: 10px; }\r\n  .radio label,\r\n  .checkbox label {\r\n    min-height: 20px;\r\n    padding-left: 20px;\r\n    margin-bottom: 0;\r\n    font-weight: normal;\r\n    cursor: pointer; }\r\n\r\n.radio input[type=\"radio\"],\r\n.radio-inline input[type=\"radio\"],\r\n.checkbox input[type=\"checkbox\"],\r\n.checkbox-inline input[type=\"checkbox\"] {\r\n  position: absolute;\r\n  margin-left: -20px;\r\n  margin-top: 4px \\9; }\r\n\r\n.radio + .radio,\r\n.checkbox + .checkbox {\r\n  margin-top: -5px; }\r\n\r\n.radio-inline,\r\n.checkbox-inline {\r\n  position: relative;\r\n  display: inline-block;\r\n  padding-left: 20px;\r\n  margin-bottom: 0;\r\n  vertical-align: middle;\r\n  font-weight: normal;\r\n  cursor: pointer; }\r\n\r\n.radio-inline + .radio-inline,\r\n.checkbox-inline + .checkbox-inline {\r\n  margin-top: 0;\r\n  margin-left: 10px; }\r\n\r\ninput[type=\"radio\"][disabled], input[type=\"radio\"].disabled, fieldset[disabled] input[type=\"radio\"],\r\ninput[type=\"checkbox\"][disabled],\r\ninput[type=\"checkbox\"].disabled, fieldset[disabled]\r\ninput[type=\"checkbox\"] {\r\n  cursor: not-allowed; }\r\n\r\n.radio-inline.disabled, fieldset[disabled] .radio-inline,\r\n.checkbox-inline.disabled, fieldset[disabled]\r\n.checkbox-inline {\r\n  cursor: not-allowed; }\r\n\r\n.radio.disabled label, fieldset[disabled] .radio label,\r\n.checkbox.disabled label, fieldset[disabled]\r\n.checkbox label {\r\n  cursor: not-allowed; }\r\n\r\n.form-control-static {\r\n  padding-top: 7px;\r\n  padding-bottom: 7px;\r\n  margin-bottom: 0;\r\n  min-height: 34px; }\r\n  .form-control-static.input-lg, .input-group-lg > .form-control-static.form-control,\r\n  .input-group-lg > .form-control-static.input-group-addon,\r\n  .input-group-lg > .input-group-btn > .form-control-static.btn, .form-control-static.input-sm, .input-group-sm > .form-control-static.form-control,\r\n  .input-group-sm > .form-control-static.input-group-addon,\r\n  .input-group-sm > .input-group-btn > .form-control-static.btn {\r\n    padding-left: 0;\r\n    padding-right: 0; }\r\n\r\n.input-sm, .input-group-sm > .form-control,\r\n.input-group-sm > .input-group-addon,\r\n.input-group-sm > .input-group-btn > .btn {\r\n  height: 30px;\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 2px; }\r\n\r\nselect.input-sm, .input-group-sm > select.form-control,\r\n.input-group-sm > select.input-group-addon,\r\n.input-group-sm > .input-group-btn > select.btn {\r\n  height: 30px;\r\n  line-height: 30px; }\r\n\r\ntextarea.input-sm, .input-group-sm > textarea.form-control,\r\n.input-group-sm > textarea.input-group-addon,\r\n.input-group-sm > .input-group-btn > textarea.btn,\r\nselect[multiple].input-sm,\r\n.input-group-sm > select[multiple].form-control,\r\n.input-group-sm > select[multiple].input-group-addon,\r\n.input-group-sm > .input-group-btn > select[multiple].btn {\r\n  height: auto; }\r\n\r\n.form-group-sm .form-control {\r\n  height: 30px;\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 2px; }\r\n.form-group-sm select.form-control {\r\n  height: 30px;\r\n  line-height: 30px; }\r\n.form-group-sm textarea.form-control,\r\n.form-group-sm select[multiple].form-control {\r\n  height: auto; }\r\n.form-group-sm .form-control-static {\r\n  height: 30px;\r\n  min-height: 32px;\r\n  padding: 6px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5; }\r\n\r\n.input-lg, .input-group-lg > .form-control,\r\n.input-group-lg > .input-group-addon,\r\n.input-group-lg > .input-group-btn > .btn {\r\n  height: 45px;\r\n  padding: 10px 16px;\r\n  font-size: 17px;\r\n  line-height: 1.33333;\r\n  border-radius: 4px; }\r\n\r\nselect.input-lg, .input-group-lg > select.form-control,\r\n.input-group-lg > select.input-group-addon,\r\n.input-group-lg > .input-group-btn > select.btn {\r\n  height: 45px;\r\n  line-height: 45px; }\r\n\r\ntextarea.input-lg, .input-group-lg > textarea.form-control,\r\n.input-group-lg > textarea.input-group-addon,\r\n.input-group-lg > .input-group-btn > textarea.btn,\r\nselect[multiple].input-lg,\r\n.input-group-lg > select[multiple].form-control,\r\n.input-group-lg > select[multiple].input-group-addon,\r\n.input-group-lg > .input-group-btn > select[multiple].btn {\r\n  height: auto; }\r\n\r\n.form-group-lg .form-control {\r\n  height: 45px;\r\n  padding: 10px 16px;\r\n  font-size: 17px;\r\n  line-height: 1.33333;\r\n  border-radius: 4px; }\r\n.form-group-lg select.form-control {\r\n  height: 45px;\r\n  line-height: 45px; }\r\n.form-group-lg textarea.form-control,\r\n.form-group-lg select[multiple].form-control {\r\n  height: auto; }\r\n.form-group-lg .form-control-static {\r\n  height: 45px;\r\n  min-height: 37px;\r\n  padding: 11px 16px;\r\n  font-size: 17px;\r\n  line-height: 1.33333; }\r\n\r\n.has-feedback {\r\n  position: relative; }\r\n  .has-feedback .form-control {\r\n    padding-right: 42.5px; }\r\n\r\n.form-control-feedback {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  z-index: 2;\r\n  display: block;\r\n  width: 34px;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  text-align: center;\r\n  pointer-events: none; }\r\n\r\n.input-lg + .form-control-feedback, .input-group-lg > .form-control + .form-control-feedback,\r\n.input-group-lg > .input-group-addon + .form-control-feedback,\r\n.input-group-lg > .input-group-btn > .btn + .form-control-feedback,\r\n.input-group-lg + .form-control-feedback,\r\n.form-group-lg .form-control + .form-control-feedback {\r\n  width: 45px;\r\n  height: 45px;\r\n  line-height: 45px; }\r\n\r\n.input-sm + .form-control-feedback, .input-group-sm > .form-control + .form-control-feedback,\r\n.input-group-sm > .input-group-addon + .form-control-feedback,\r\n.input-group-sm > .input-group-btn > .btn + .form-control-feedback,\r\n.input-group-sm + .form-control-feedback,\r\n.form-group-sm .form-control + .form-control-feedback {\r\n  width: 30px;\r\n  height: 30px;\r\n  line-height: 30px; }\r\n\r\n.has-success .help-block,\r\n.has-success .control-label,\r\n.has-success .radio,\r\n.has-success .checkbox,\r\n.has-success .radio-inline,\r\n.has-success .checkbox-inline, .has-success.radio label, .has-success.checkbox label, .has-success.radio-inline label, .has-success.checkbox-inline label {\r\n  color: #3c763d; }\r\n.has-success .form-control {\r\n  border-color: #3c763d;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\r\n  .has-success .form-control:focus {\r\n    border-color: #2b542c;\r\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168; }\r\n.has-success .input-group-addon {\r\n  color: #3c763d;\r\n  border-color: #3c763d;\r\n  background-color: #dff0d8; }\r\n.has-success .form-control-feedback {\r\n  color: #3c763d; }\r\n\r\n.has-warning .help-block,\r\n.has-warning .control-label,\r\n.has-warning .radio,\r\n.has-warning .checkbox,\r\n.has-warning .radio-inline,\r\n.has-warning .checkbox-inline, .has-warning.radio label, .has-warning.checkbox label, .has-warning.radio-inline label, .has-warning.checkbox-inline label {\r\n  color: #8a6d3b; }\r\n.has-warning .form-control {\r\n  border-color: #8a6d3b;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\r\n  .has-warning .form-control:focus {\r\n    border-color: #66512c;\r\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b; }\r\n.has-warning .input-group-addon {\r\n  color: #8a6d3b;\r\n  border-color: #8a6d3b;\r\n  background-color: #fcf8e3; }\r\n.has-warning .form-control-feedback {\r\n  color: #8a6d3b; }\r\n\r\n.has-error .help-block,\r\n.has-error .control-label,\r\n.has-error .radio,\r\n.has-error .checkbox,\r\n.has-error .radio-inline,\r\n.has-error .checkbox-inline, .has-error.radio label, .has-error.checkbox label, .has-error.radio-inline label, .has-error.checkbox-inline label {\r\n  color: #a94442; }\r\n.has-error .form-control {\r\n  border-color: #a94442;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\r\n  .has-error .form-control:focus {\r\n    border-color: #843534;\r\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483; }\r\n.has-error .input-group-addon {\r\n  color: #a94442;\r\n  border-color: #a94442;\r\n  background-color: #f2dede; }\r\n.has-error .form-control-feedback {\r\n  color: #a94442; }\r\n\r\n.has-feedback label ~ .form-control-feedback {\r\n  top: 25px; }\r\n.has-feedback label.sr-only ~ .form-control-feedback {\r\n  top: 0; }\r\n\r\n.help-block {\r\n  display: block;\r\n  margin-top: 5px;\r\n  margin-bottom: 10px;\r\n  color: #737373; }\r\n\r\n@media (min-width: 0px) {\r\n  .form-inline .form-group {\r\n    display: inline-block;\r\n    margin-bottom: 0;\r\n    vertical-align: middle; }\r\n  .form-inline .form-control {\r\n    display: inline-block;\r\n    width: auto;\r\n    vertical-align: middle; }\r\n  .form-inline .form-control-static {\r\n    display: inline-block; }\r\n  .form-inline .input-group {\r\n    display: inline-table;\r\n    vertical-align: middle; }\r\n    .form-inline .input-group .input-group-addon,\r\n    .form-inline .input-group .input-group-btn,\r\n    .form-inline .input-group .form-control {\r\n      width: auto; }\r\n  .form-inline .input-group > .form-control {\r\n    width: 100%; }\r\n  .form-inline .control-label {\r\n    margin-bottom: 0;\r\n    vertical-align: middle; }\r\n  .form-inline .radio,\r\n  .form-inline .checkbox {\r\n    display: inline-block;\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    vertical-align: middle; }\r\n    .form-inline .radio label,\r\n    .form-inline .checkbox label {\r\n      padding-left: 0; }\r\n  .form-inline .radio input[type=\"radio\"],\r\n  .form-inline .checkbox input[type=\"checkbox\"] {\r\n    position: relative;\r\n    margin-left: 0; }\r\n  .form-inline .has-feedback .form-control-feedback {\r\n    top: 0; } }\r\n\r\n.form-horizontal .radio,\r\n.form-horizontal .checkbox,\r\n.form-horizontal .radio-inline,\r\n.form-horizontal .checkbox-inline {\r\n  margin-top: 0;\r\n  margin-bottom: 0;\r\n  padding-top: 7px; }\r\n.form-horizontal .radio,\r\n.form-horizontal .checkbox {\r\n  min-height: 27px; }\r\n.form-horizontal .form-group {\r\n  margin-left: -10px;\r\n  margin-right: -10px; }\r\n  .form-horizontal .form-group:before, .form-horizontal .form-group:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .form-horizontal .form-group:after {\r\n    clear: both; }\r\n@media (min-width: 0px) {\r\n  .form-horizontal .control-label {\r\n    text-align: right;\r\n    margin-bottom: 0;\r\n    padding-top: 7px; } }\r\n.form-horizontal .has-feedback .form-control-feedback {\r\n  right: 10px; }\r\n@media (min-width: 0px) {\r\n  .form-horizontal .form-group-lg .control-label {\r\n    padding-top: 11px;\r\n    font-size: 17px; } }\r\n@media (min-width: 0px) {\r\n  .form-horizontal .form-group-sm .control-label {\r\n    padding-top: 6px;\r\n    font-size: 12px; } }\r\n\r\n.btn {\r\n  display: inline-block;\r\n  margin-bottom: 0;\r\n  font-weight: normal;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n  -ms-touch-action: manipulation;\r\n      touch-action: manipulation;\r\n  cursor: pointer;\r\n  background-image: none;\r\n  border: 1px solid transparent;\r\n  white-space: nowrap;\r\n  padding: 6px 12px;\r\n  font-size: 14px;\r\n  line-height: 1.42857;\r\n  border-radius: 0;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none; }\r\n  .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {\r\n    outline: thin dotted;\r\n    outline: 5px auto -webkit-focus-ring-color;\r\n    outline-offset: -2px; }\r\n  .btn:hover, .btn:focus, .btn.focus {\r\n    color: #5d6d84;\r\n    text-decoration: none; }\r\n  .btn:active, .btn.active {\r\n    outline: 0;\r\n    background-image: none;\r\n    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\r\n  .btn.disabled, .btn[disabled], fieldset[disabled] .btn {\r\n    cursor: not-allowed;\r\n    opacity: 0.65;\r\n    filter: alpha(opacity=65);\r\n    box-shadow: none; }\r\n\r\na.btn.disabled, fieldset[disabled] a.btn {\r\n  pointer-events: none; }\r\n\r\n.btn-default {\r\n  color: #5d6d84;\r\n  background-color: #f7f7f7;\r\n  border-color: #d4d4d4; }\r\n  .btn-default:focus, .btn-default.focus {\r\n    color: #5d6d84;\r\n    background-color: #dedede;\r\n    border-color: #949494; }\r\n  .btn-default:hover {\r\n    color: #5d6d84;\r\n    background-color: #dedede;\r\n    border-color: #b5b5b5; }\r\n  .btn-default:active, .btn-default.active, .open > .btn-default.dropdown-toggle {\r\n    color: #5d6d84;\r\n    background-color: #dedede;\r\n    border-color: #b5b5b5; }\r\n    .btn-default:active:hover, .btn-default:active:focus, .btn-default:active.focus, .btn-default.active:hover, .btn-default.active:focus, .btn-default.active.focus, .open > .btn-default.dropdown-toggle:hover, .open > .btn-default.dropdown-toggle:focus, .open > .btn-default.dropdown-toggle.focus {\r\n      color: #5d6d84;\r\n      background-color: #cccccc;\r\n      border-color: #949494; }\r\n  .btn-default:active, .btn-default.active, .open > .btn-default.dropdown-toggle {\r\n    background-image: none; }\r\n  .btn-default.disabled:hover, .btn-default.disabled:focus, .btn-default.disabled.focus, .btn-default[disabled]:hover, .btn-default[disabled]:focus, .btn-default[disabled].focus, fieldset[disabled] .btn-default:hover, fieldset[disabled] .btn-default:focus, fieldset[disabled] .btn-default.focus {\r\n    background-color: #f7f7f7;\r\n    border-color: #d4d4d4; }\r\n  .btn-default .badge {\r\n    color: #f7f7f7;\r\n    background-color: #5d6d84; }\r\n\r\n.btn-primary {\r\n  color: #fff;\r\n  background-color: #419ce9;\r\n  border-color: #2a90e6; }\r\n  .btn-primary:focus, .btn-primary.focus {\r\n    color: #fff;\r\n    background-color: #1a84dd;\r\n    border-color: #0f4d82; }\r\n  .btn-primary:hover {\r\n    color: #fff;\r\n    background-color: #1a84dd;\r\n    border-color: #1671bd; }\r\n  .btn-primary:active, .btn-primary.active, .open > .btn-primary.dropdown-toggle {\r\n    color: #fff;\r\n    background-color: #1a84dd;\r\n    border-color: #1671bd; }\r\n    .btn-primary:active:hover, .btn-primary:active:focus, .btn-primary:active.focus, .btn-primary.active:hover, .btn-primary.active:focus, .btn-primary.active.focus, .open > .btn-primary.dropdown-toggle:hover, .open > .btn-primary.dropdown-toggle:focus, .open > .btn-primary.dropdown-toggle.focus {\r\n      color: #fff;\r\n      background-color: #1671bd;\r\n      border-color: #0f4d82; }\r\n  .btn-primary:active, .btn-primary.active, .open > .btn-primary.dropdown-toggle {\r\n    background-image: none; }\r\n  .btn-primary.disabled:hover, .btn-primary.disabled:focus, .btn-primary.disabled.focus, .btn-primary[disabled]:hover, .btn-primary[disabled]:focus, .btn-primary[disabled].focus, fieldset[disabled] .btn-primary:hover, fieldset[disabled] .btn-primary:focus, fieldset[disabled] .btn-primary.focus {\r\n    background-color: #419ce9;\r\n    border-color: #2a90e6; }\r\n  .btn-primary .badge {\r\n    color: #419ce9;\r\n    background-color: #fff; }\r\n\r\n.btn-success {\r\n  color: #fff;\r\n  background-color: #53c843;\r\n  border-color: #47bb37; }\r\n  .btn-success:focus, .btn-success.focus {\r\n    color: #fff;\r\n    background-color: #3fa731;\r\n    border-color: #21581a; }\r\n  .btn-success:hover {\r\n    color: #fff;\r\n    background-color: #3fa731;\r\n    border-color: #358b29; }\r\n  .btn-success:active, .btn-success.active, .open > .btn-success.dropdown-toggle {\r\n    color: #fff;\r\n    background-color: #3fa731;\r\n    border-color: #358b29; }\r\n    .btn-success:active:hover, .btn-success:active:focus, .btn-success:active.focus, .btn-success.active:hover, .btn-success.active:focus, .btn-success.active.focus, .open > .btn-success.dropdown-toggle:hover, .open > .btn-success.dropdown-toggle:focus, .open > .btn-success.dropdown-toggle.focus {\r\n      color: #fff;\r\n      background-color: #358b29;\r\n      border-color: #21581a; }\r\n  .btn-success:active, .btn-success.active, .open > .btn-success.dropdown-toggle {\r\n    background-image: none; }\r\n  .btn-success.disabled:hover, .btn-success.disabled:focus, .btn-success.disabled.focus, .btn-success[disabled]:hover, .btn-success[disabled]:focus, .btn-success[disabled].focus, fieldset[disabled] .btn-success:hover, fieldset[disabled] .btn-success:focus, fieldset[disabled] .btn-success.focus {\r\n    background-color: #53c843;\r\n    border-color: #47bb37; }\r\n  .btn-success .badge {\r\n    color: #53c843;\r\n    background-color: #fff; }\r\n\r\n.btn-info {\r\n  color: #fff;\r\n  background-color: #50cee7;\r\n  border-color: #3ac8e4; }\r\n  .btn-info:focus, .btn-info.focus {\r\n    color: #fff;\r\n    background-color: #23c1e1;\r\n    border-color: #13778b; }\r\n  .btn-info:hover {\r\n    color: #fff;\r\n    background-color: #23c1e1;\r\n    border-color: #1ba9c5; }\r\n  .btn-info:active, .btn-info.active, .open > .btn-info.dropdown-toggle {\r\n    color: #fff;\r\n    background-color: #23c1e1;\r\n    border-color: #1ba9c5; }\r\n    .btn-info:active:hover, .btn-info:active:focus, .btn-info:active.focus, .btn-info.active:hover, .btn-info.active:focus, .btn-info.active.focus, .open > .btn-info.dropdown-toggle:hover, .open > .btn-info.dropdown-toggle:focus, .open > .btn-info.dropdown-toggle.focus {\r\n      color: #fff;\r\n      background-color: #1ba9c5;\r\n      border-color: #13778b; }\r\n  .btn-info:active, .btn-info.active, .open > .btn-info.dropdown-toggle {\r\n    background-image: none; }\r\n  .btn-info.disabled:hover, .btn-info.disabled:focus, .btn-info.disabled.focus, .btn-info[disabled]:hover, .btn-info[disabled]:focus, .btn-info[disabled].focus, fieldset[disabled] .btn-info:hover, fieldset[disabled] .btn-info:focus, fieldset[disabled] .btn-info.focus {\r\n    background-color: #50cee7;\r\n    border-color: #3ac8e4; }\r\n  .btn-info .badge {\r\n    color: #50cee7;\r\n    background-color: #fff; }\r\n\r\n.btn-warning {\r\n  color: #fff;\r\n  background-color: #ffb848;\r\n  border-color: #ffae2f; }\r\n  .btn-warning:focus, .btn-warning.focus {\r\n    color: #fff;\r\n    background-color: #ffa415;\r\n    border-color: #ae6a00; }\r\n  .btn-warning:hover {\r\n    color: #fff;\r\n    background-color: #ffa415;\r\n    border-color: #f09300; }\r\n  .btn-warning:active, .btn-warning.active, .open > .btn-warning.dropdown-toggle {\r\n    color: #fff;\r\n    background-color: #ffa415;\r\n    border-color: #f09300; }\r\n    .btn-warning:active:hover, .btn-warning:active:focus, .btn-warning:active.focus, .btn-warning.active:hover, .btn-warning.active:focus, .btn-warning.active.focus, .open > .btn-warning.dropdown-toggle:hover, .open > .btn-warning.dropdown-toggle:focus, .open > .btn-warning.dropdown-toggle.focus {\r\n      color: #fff;\r\n      background-color: #f09300;\r\n      border-color: #ae6a00; }\r\n  .btn-warning:active, .btn-warning.active, .open > .btn-warning.dropdown-toggle {\r\n    background-image: none; }\r\n  .btn-warning.disabled:hover, .btn-warning.disabled:focus, .btn-warning.disabled.focus, .btn-warning[disabled]:hover, .btn-warning[disabled]:focus, .btn-warning[disabled].focus, fieldset[disabled] .btn-warning:hover, fieldset[disabled] .btn-warning:focus, fieldset[disabled] .btn-warning.focus {\r\n    background-color: #ffb848;\r\n    border-color: #ffae2f; }\r\n  .btn-warning .badge {\r\n    color: #ffb848;\r\n    background-color: #fff; }\r\n\r\n.btn-danger {\r\n  color: #fff;\r\n  background-color: #f73666;\r\n  border-color: #f61d53; }\r\n  .btn-danger:focus, .btn-danger.focus {\r\n    color: #fff;\r\n    background-color: #f00a43;\r\n    border-color: #8e0628; }\r\n  .btn-danger:hover {\r\n    color: #fff;\r\n    background-color: #f00a43;\r\n    border-color: #ce0839; }\r\n  .btn-danger:active, .btn-danger.active, .open > .btn-danger.dropdown-toggle {\r\n    color: #fff;\r\n    background-color: #f00a43;\r\n    border-color: #ce0839; }\r\n    .btn-danger:active:hover, .btn-danger:active:focus, .btn-danger:active.focus, .btn-danger.active:hover, .btn-danger.active:focus, .btn-danger.active.focus, .open > .btn-danger.dropdown-toggle:hover, .open > .btn-danger.dropdown-toggle:focus, .open > .btn-danger.dropdown-toggle.focus {\r\n      color: #fff;\r\n      background-color: #ce0839;\r\n      border-color: #8e0628; }\r\n  .btn-danger:active, .btn-danger.active, .open > .btn-danger.dropdown-toggle {\r\n    background-image: none; }\r\n  .btn-danger.disabled:hover, .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger[disabled]:hover, .btn-danger[disabled]:focus, .btn-danger[disabled].focus, fieldset[disabled] .btn-danger:hover, fieldset[disabled] .btn-danger:focus, fieldset[disabled] .btn-danger.focus {\r\n    background-color: #f73666;\r\n    border-color: #f61d53; }\r\n  .btn-danger .badge {\r\n    color: #f73666;\r\n    background-color: #fff; }\r\n\r\n.btn-link {\r\n  color: #419ce9;\r\n  font-weight: normal;\r\n  border-radius: 0; }\r\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link[disabled], fieldset[disabled] .btn-link {\r\n    background-color: transparent;\r\n    box-shadow: none; }\r\n  .btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {\r\n    border-color: transparent; }\r\n  .btn-link:hover, .btn-link:focus {\r\n    color: #1776c7;\r\n    text-decoration: underline;\r\n    background-color: transparent; }\r\n  .btn-link[disabled]:hover, .btn-link[disabled]:focus, fieldset[disabled] .btn-link:hover, fieldset[disabled] .btn-link:focus {\r\n    color: #777777;\r\n    text-decoration: none; }\r\n\r\n.btn-lg, .btn-group-lg > .btn {\r\n  padding: 10px 30px;\r\n  font-size: 17px;\r\n  line-height: 1.33333;\r\n  border-radius: 4px; }\r\n\r\n.btn-sm, .btn-group-sm > .btn {\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 2px; }\r\n\r\n.btn-xs, .btn-group-xs > .btn {\r\n  padding: 1px 5px;\r\n  font-size: 12px;\r\n  line-height: 1.5;\r\n  border-radius: 2px; }\r\n\r\n.btn-block {\r\n  display: block;\r\n  width: 100%; }\r\n\r\n.btn-block + .btn-block {\r\n  margin-top: 5px; }\r\n\r\ninput[type=\"submit\"].btn-block,\r\ninput[type=\"reset\"].btn-block,\r\ninput[type=\"button\"].btn-block {\r\n  width: 100%; }\r\n\r\n.fade {\r\n  opacity: 0;\r\n  -webkit-transition: opacity 0.15s linear;\r\n  transition: opacity 0.15s linear; }\r\n  .fade.in {\r\n    opacity: 1; }\r\n\r\n.collapse {\r\n  display: none; }\r\n  .collapse.in {\r\n    display: block; }\r\n\r\ntr.collapse.in {\r\n  display: table-row; }\r\n\r\ntbody.collapse.in {\r\n  display: table-row-group; }\r\n\r\n.collapsing {\r\n  position: relative;\r\n  height: 0;\r\n  overflow: hidden;\r\n  -webkit-transition-property: height, visibility;\r\n  transition-property: height, visibility;\r\n  -webkit-transition-duration: 0.35s;\r\n  transition-duration: 0.35s;\r\n  -webkit-transition-timing-function: ease;\r\n  transition-timing-function: ease; }\r\n\r\n.caret {\r\n  display: inline-block;\r\n  width: 0;\r\n  height: 0;\r\n  margin-left: 2px;\r\n  vertical-align: middle;\r\n  border-top: 4px dashed;\r\n  border-top: 4px solid \\9;\r\n  border-right: 4px solid transparent;\r\n  border-left: 4px solid transparent; }\r\n\r\n.dropup,\r\n.dropdown {\r\n  position: relative; }\r\n\r\n.dropdown-toggle:focus {\r\n  outline: 0; }\r\n\r\n.dropdown-menu {\r\n  position: absolute;\r\n  top: 100%;\r\n  left: 0;\r\n  z-index: 1000;\r\n  display: none;\r\n  float: left;\r\n  min-width: 160px;\r\n  padding: 5px 0;\r\n  margin: 2px 0 0;\r\n  list-style: none;\r\n  font-size: 14px;\r\n  text-align: left;\r\n  background-color: #fff;\r\n  border: 1px solid #ccc;\r\n  border: 1px solid rgba(0, 0, 0, 0.15);\r\n  border-radius: 0;\r\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);\r\n  background-clip: padding-box; }\r\n  .dropdown-menu.pull-right {\r\n    right: 0;\r\n    left: auto; }\r\n  .dropdown-menu .divider {\r\n    height: 1px;\r\n    margin: 9px 0;\r\n    overflow: hidden;\r\n    background-color: #e5e5e5; }\r\n  .dropdown-menu > li > a {\r\n    display: block;\r\n    padding: 3px 20px;\r\n    clear: both;\r\n    font-weight: normal;\r\n    line-height: 1.42857;\r\n    color: #333333;\r\n    white-space: nowrap; }\r\n\r\n.dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {\r\n  text-decoration: none;\r\n  color: #262626;\r\n  background-color: #f5f5f5; }\r\n\r\n.dropdown-menu > .active > a, .dropdown-menu > .active > a:hover, .dropdown-menu > .active > a:focus {\r\n  color: #fff;\r\n  text-decoration: none;\r\n  outline: 0;\r\n  background-color: #419ce9; }\r\n\r\n.dropdown-menu > .disabled > a, .dropdown-menu > .disabled > a:hover, .dropdown-menu > .disabled > a:focus {\r\n  color: #777777; }\r\n.dropdown-menu > .disabled > a:hover, .dropdown-menu > .disabled > a:focus {\r\n  text-decoration: none;\r\n  background-color: transparent;\r\n  background-image: none;\r\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\r\n  cursor: not-allowed; }\r\n\r\n.open > .dropdown-menu {\r\n  display: block; }\r\n.open > a {\r\n  outline: 0; }\r\n\r\n.dropdown-menu-right {\r\n  left: auto;\r\n  right: 0; }\r\n\r\n.dropdown-menu-left {\r\n  left: 0;\r\n  right: auto; }\r\n\r\n.dropdown-header {\r\n  display: block;\r\n  padding: 3px 20px;\r\n  font-size: 12px;\r\n  line-height: 1.42857;\r\n  color: #777777;\r\n  white-space: nowrap; }\r\n\r\n.dropdown-backdrop {\r\n  position: fixed;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  top: 0;\r\n  z-index: 990; }\r\n\r\n.pull-right > .dropdown-menu {\r\n  right: 0;\r\n  left: auto; }\r\n\r\n.dropup .caret,\r\n.navbar-fixed-bottom .dropdown .caret {\r\n  border-top: 0;\r\n  border-bottom: 4px dashed;\r\n  border-bottom: 4px solid \\9;\r\n  content: \"\"; }\r\n.dropup .dropdown-menu,\r\n.navbar-fixed-bottom .dropdown .dropdown-menu {\r\n  top: auto;\r\n  bottom: 100%;\r\n  margin-bottom: 2px; }\r\n\r\n@media (min-width: 0px) {\r\n  .navbar-right .dropdown-menu {\r\n    right: 0;\r\n    left: auto; }\r\n  .navbar-right .dropdown-menu-left {\r\n    left: 0;\r\n    right: auto; } }\r\n.btn-group,\r\n.btn-group-vertical {\r\n  position: relative;\r\n  display: inline-block;\r\n  vertical-align: middle; }\r\n  .btn-group > .btn,\r\n  .btn-group-vertical > .btn {\r\n    position: relative;\r\n    float: left; }\r\n    .btn-group > .btn:hover, .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\r\n    .btn-group-vertical > .btn:hover,\r\n    .btn-group-vertical > .btn:focus,\r\n    .btn-group-vertical > .btn:active,\r\n    .btn-group-vertical > .btn.active {\r\n      z-index: 2; }\r\n\r\n.btn-group .btn + .btn,\r\n.btn-group .btn + .btn-group,\r\n.btn-group .btn-group + .btn,\r\n.btn-group .btn-group + .btn-group {\r\n  margin-left: -1px; }\r\n\r\n.btn-toolbar {\r\n  margin-left: -5px; }\r\n  .btn-toolbar:before, .btn-toolbar:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .btn-toolbar:after {\r\n    clear: both; }\r\n  .btn-toolbar .btn,\r\n  .btn-toolbar .btn-group,\r\n  .btn-toolbar .input-group {\r\n    float: left; }\r\n  .btn-toolbar > .btn,\r\n  .btn-toolbar > .btn-group,\r\n  .btn-toolbar > .input-group {\r\n    margin-left: 5px; }\r\n\r\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\r\n  border-radius: 0; }\r\n\r\n.btn-group > .btn:first-child {\r\n  margin-left: 0; }\r\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\r\n    border-bottom-right-radius: 0;\r\n    border-top-right-radius: 0; }\r\n\r\n.btn-group > .btn:last-child:not(:first-child),\r\n.btn-group > .dropdown-toggle:not(:first-child) {\r\n  border-bottom-left-radius: 0;\r\n  border-top-left-radius: 0; }\r\n\r\n.btn-group > .btn-group {\r\n  float: left; }\r\n\r\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\r\n  border-radius: 0; }\r\n\r\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\r\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\r\n  border-bottom-right-radius: 0;\r\n  border-top-right-radius: 0; }\r\n\r\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\r\n  border-bottom-left-radius: 0;\r\n  border-top-left-radius: 0; }\r\n\r\n.btn-group .dropdown-toggle:active,\r\n.btn-group.open .dropdown-toggle {\r\n  outline: 0; }\r\n\r\n.btn-group > .btn + .dropdown-toggle {\r\n  padding-left: 8px;\r\n  padding-right: 8px; }\r\n\r\n.btn-group > .btn-lg + .dropdown-toggle, .btn-group-lg.btn-group > .btn + .dropdown-toggle {\r\n  padding-left: 12px;\r\n  padding-right: 12px; }\r\n\r\n.btn-group.open .dropdown-toggle {\r\n  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\r\n  .btn-group.open .dropdown-toggle.btn-link {\r\n    box-shadow: none; }\r\n\r\n.btn .caret {\r\n  margin-left: 0; }\r\n\r\n.btn-lg .caret, .btn-group-lg > .btn .caret {\r\n  border-width: 5px 5px 0;\r\n  border-bottom-width: 0; }\r\n\r\n.dropup .btn-lg .caret, .dropup .btn-group-lg > .btn .caret {\r\n  border-width: 0 5px 5px; }\r\n\r\n.btn-group-vertical > .btn,\r\n.btn-group-vertical > .btn-group,\r\n.btn-group-vertical > .btn-group > .btn {\r\n  display: block;\r\n  float: none;\r\n  width: 100%;\r\n  max-width: 100%; }\r\n.btn-group-vertical > .btn-group:before, .btn-group-vertical > .btn-group:after {\r\n  content: \" \";\r\n  display: table; }\r\n.btn-group-vertical > .btn-group:after {\r\n  clear: both; }\r\n.btn-group-vertical > .btn-group > .btn {\r\n  float: none; }\r\n.btn-group-vertical > .btn + .btn,\r\n.btn-group-vertical > .btn + .btn-group,\r\n.btn-group-vertical > .btn-group + .btn,\r\n.btn-group-vertical > .btn-group + .btn-group {\r\n  margin-top: -1px;\r\n  margin-left: 0; }\r\n\r\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\r\n  border-radius: 0; }\r\n.btn-group-vertical > .btn:first-child:not(:last-child) {\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0;\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0; }\r\n.btn-group-vertical > .btn:last-child:not(:first-child) {\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0;\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0; }\r\n\r\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\r\n  border-radius: 0; }\r\n\r\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\r\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0; }\r\n\r\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0; }\r\n\r\n.btn-group-justified {\r\n  display: table;\r\n  width: 100%;\r\n  table-layout: fixed;\r\n  border-collapse: separate; }\r\n  .btn-group-justified > .btn,\r\n  .btn-group-justified > .btn-group {\r\n    float: none;\r\n    display: table-cell;\r\n    width: 1%; }\r\n  .btn-group-justified > .btn-group .btn {\r\n    width: 100%; }\r\n  .btn-group-justified > .btn-group .dropdown-menu {\r\n    left: auto; }\r\n\r\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\r\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\r\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\r\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\r\n  position: absolute;\r\n  clip: rect(0, 0, 0, 0);\r\n  pointer-events: none; }\r\n\r\n.input-group {\r\n  position: relative;\r\n  display: table;\r\n  border-collapse: separate; }\r\n  .input-group[class*=\"col-\"] {\r\n    float: none;\r\n    padding-left: 0;\r\n    padding-right: 0; }\r\n  .input-group .form-control {\r\n    position: relative;\r\n    z-index: 2;\r\n    float: left;\r\n    width: 100%;\r\n    margin-bottom: 0; }\r\n    .input-group .form-control:focus {\r\n      z-index: 3; }\r\n\r\n.input-group-addon,\r\n.input-group-btn,\r\n.input-group .form-control {\r\n  display: table-cell; }\r\n  .input-group-addon:not(:first-child):not(:last-child),\r\n  .input-group-btn:not(:first-child):not(:last-child),\r\n  .input-group .form-control:not(:first-child):not(:last-child) {\r\n    border-radius: 0; }\r\n\r\n.input-group-addon,\r\n.input-group-btn {\r\n  width: 1%;\r\n  white-space: nowrap;\r\n  vertical-align: middle; }\r\n\r\n.input-group-addon {\r\n  padding: 6px 12px;\r\n  font-size: 14px;\r\n  font-weight: normal;\r\n  line-height: 1;\r\n  color: #222222;\r\n  text-align: center;\r\n  background-color: #eeeeee;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0; }\r\n  .input-group-addon.input-sm,\r\n  .input-group-sm > .input-group-addon,\r\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\r\n    padding: 5px 10px;\r\n    font-size: 12px;\r\n    border-radius: 2px; }\r\n  .input-group-addon.input-lg,\r\n  .input-group-lg > .input-group-addon,\r\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\r\n    padding: 10px 16px;\r\n    font-size: 17px;\r\n    border-radius: 4px; }\r\n  .input-group-addon input[type=\"radio\"],\r\n  .input-group-addon input[type=\"checkbox\"] {\r\n    margin-top: 0; }\r\n\r\n.input-group .form-control:first-child,\r\n.input-group-addon:first-child,\r\n.input-group-btn:first-child > .btn,\r\n.input-group-btn:first-child > .btn-group > .btn,\r\n.input-group-btn:first-child > .dropdown-toggle,\r\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\r\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\r\n  border-bottom-right-radius: 0;\r\n  border-top-right-radius: 0; }\r\n\r\n.input-group-addon:first-child {\r\n  border-right: 0; }\r\n\r\n.input-group .form-control:last-child,\r\n.input-group-addon:last-child,\r\n.input-group-btn:last-child > .btn,\r\n.input-group-btn:last-child > .btn-group > .btn,\r\n.input-group-btn:last-child > .dropdown-toggle,\r\n.input-group-btn:first-child > .btn:not(:first-child),\r\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\r\n  border-bottom-left-radius: 0;\r\n  border-top-left-radius: 0; }\r\n\r\n.input-group-addon:last-child {\r\n  border-left: 0; }\r\n\r\n.input-group-btn {\r\n  position: relative;\r\n  font-size: 0;\r\n  white-space: nowrap; }\r\n  .input-group-btn > .btn {\r\n    position: relative; }\r\n    .input-group-btn > .btn + .btn {\r\n      margin-left: -1px; }\r\n    .input-group-btn > .btn:hover, .input-group-btn > .btn:focus, .input-group-btn > .btn:active {\r\n      z-index: 2; }\r\n  .input-group-btn:first-child > .btn,\r\n  .input-group-btn:first-child > .btn-group {\r\n    margin-right: -1px; }\r\n  .input-group-btn:last-child > .btn,\r\n  .input-group-btn:last-child > .btn-group {\r\n    z-index: 2;\r\n    margin-left: -1px; }\r\n\r\n.nav {\r\n  margin-bottom: 0;\r\n  padding-left: 0;\r\n  list-style: none; }\r\n  .nav:before, .nav:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .nav:after {\r\n    clear: both; }\r\n  .nav > li {\r\n    position: relative;\r\n    display: block; }\r\n    .nav > li > a {\r\n      position: relative;\r\n      display: block;\r\n      padding: 10px 15px; }\r\n      .nav > li > a:hover, .nav > li > a:focus {\r\n        text-decoration: none;\r\n        background-color: #eeeeee; }\r\n    .nav > li.disabled > a {\r\n      color: #777777; }\r\n      .nav > li.disabled > a:hover, .nav > li.disabled > a:focus {\r\n        color: #777777;\r\n        text-decoration: none;\r\n        background-color: transparent;\r\n        cursor: not-allowed; }\r\n  .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {\r\n    background-color: #eeeeee;\r\n    border-color: #419ce9; }\r\n  .nav .nav-divider {\r\n    height: 1px;\r\n    margin: 9px 0;\r\n    overflow: hidden;\r\n    background-color: #e5e5e5; }\r\n  .nav > li > a > img {\r\n    max-width: none; }\r\n\r\n.nav-tabs {\r\n  border-bottom: 1px solid #ddd; }\r\n  .nav-tabs > li {\r\n    float: left;\r\n    margin-bottom: -1px;\r\n    width: 50%;\r\n    text-align: center; }\r\n    .nav-tabs > li > a {\r\n      line-height: 1.42857;\r\n      border: 1px solid transparent;\r\n      border-bottom-color: #7ea0b0;\r\n      background-color: #d0e0ee;\r\n      color: #555555;\r\n      border-bottom: 1px solid; }\r\n    .nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {\r\n      color: #555555;\r\n      background-color: #f6f6f6;\r\n      border: 1px solid #7ea0b0;\r\n      border-bottom-color: transparent;\r\n      cursor: default; }\r\n    .nav-tabs > li:hover a, .nav-tabs > li:focus a {\r\n      background: #b8d0e5; }\r\n\r\n.tab-pane {\r\n  border: 1px solid #7ea0b0;\r\n  border-top-color: transparent; }\r\n\r\n.nav-pills > li {\r\n  float: left; }\r\n  .nav-pills > li > a {\r\n    border-radius: 0; }\r\n  .nav-pills > li + li {\r\n    margin-left: 2px; }\r\n  .nav-pills > li.active > a, .nav-pills > li.active > a:hover, .nav-pills > li.active > a:focus {\r\n    color: #fff;\r\n    background-color: #419ce9; }\r\n\r\n.nav-stacked > li {\r\n  float: none; }\r\n  .nav-stacked > li + li {\r\n    margin-top: 2px;\r\n    margin-left: 0; }\r\n\r\n.nav-justified, .nav-tabs.nav-justified {\r\n  width: 100%; }\r\n  .nav-justified > li, .nav-tabs.nav-justified > li {\r\n    float: none; }\r\n    .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\r\n      text-align: center;\r\n      margin-bottom: 5px; }\r\n  .nav-justified > .dropdown .dropdown-menu {\r\n    top: auto;\r\n    left: auto; }\r\n  @media (min-width: 0px) {\r\n    .nav-justified > li, .nav-tabs.nav-justified > li {\r\n      display: table-cell;\r\n      width: 1%; }\r\n      .nav-justified > li > a, .nav-tabs.nav-justified > li > a {\r\n        margin-bottom: 0; } }\r\n\r\n.nav-tabs-justified, .nav-tabs.nav-justified {\r\n  border-bottom: 0; }\r\n  .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\r\n    margin-right: 0;\r\n    border-radius: 0; }\r\n  .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\r\n  .nav-tabs-justified > .active > a:hover,\r\n  .nav-tabs.nav-justified > .active > a:hover,\r\n  .nav-tabs-justified > .active > a:focus,\r\n  .nav-tabs.nav-justified > .active > a:focus {\r\n    border: 1px solid #ddd; }\r\n  @media (min-width: 0px) {\r\n    .nav-tabs-justified > li > a, .nav-tabs.nav-justified > li > a {\r\n      border-bottom: 1px solid #ddd;\r\n      border-radius: 0 0 0 0; }\r\n    .nav-tabs-justified > .active > a, .nav-tabs.nav-justified > .active > a,\r\n    .nav-tabs-justified > .active > a:hover,\r\n    .nav-tabs.nav-justified > .active > a:hover,\r\n    .nav-tabs-justified > .active > a:focus,\r\n    .nav-tabs.nav-justified > .active > a:focus {\r\n      border-bottom-color: #fff; } }\r\n\r\n.tab-content > .tab-pane {\r\n  display: none; }\r\n.tab-content > .active {\r\n  display: block; }\r\n\r\n.nav-tabs .dropdown-menu {\r\n  margin-top: -1px;\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0; }\r\n\r\n.navbar {\r\n  position: relative;\r\n  min-height: 50px;\r\n  margin-bottom: 20px;\r\n  border: 1px solid transparent; }\r\n  .navbar:before, .navbar:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .navbar:after {\r\n    clear: both; }\r\n  @media (min-width: 0px) {\r\n    .navbar {\r\n      border-radius: 0; } }\r\n\r\n.navbar-header:before, .navbar-header:after {\r\n  content: \" \";\r\n  display: table; }\r\n.navbar-header:after {\r\n  clear: both; }\r\n@media (min-width: 0px) {\r\n  .navbar-header {\r\n    float: left; } }\r\n\r\n.navbar-collapse {\r\n  overflow-x: visible;\r\n  padding-right: 10px;\r\n  padding-left: 10px;\r\n  border-top: 1px solid transparent;\r\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\r\n  -webkit-overflow-scrolling: touch; }\r\n  .navbar-collapse:before, .navbar-collapse:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .navbar-collapse:after {\r\n    clear: both; }\r\n  .navbar-collapse.in {\r\n    overflow-y: auto; }\r\n  @media (min-width: 0px) {\r\n    .navbar-collapse {\r\n      width: auto;\r\n      border-top: 0;\r\n      box-shadow: none; }\r\n      .navbar-collapse.collapse {\r\n        display: block !important;\r\n        height: auto !important;\r\n        padding-bottom: 0;\r\n        overflow: visible !important; }\r\n      .navbar-collapse.in {\r\n        overflow-y: visible; }\r\n      .navbar-fixed-top .navbar-collapse, .navbar-static-top .navbar-collapse, .navbar-fixed-bottom .navbar-collapse {\r\n        padding-left: 0;\r\n        padding-right: 0; } }\r\n\r\n.navbar-fixed-top .navbar-collapse,\r\n.navbar-fixed-bottom .navbar-collapse {\r\n  max-height: 340px; }\r\n  @media (max-device-width: 480px) and (orientation: landscape) {\r\n    .navbar-fixed-top .navbar-collapse,\r\n    .navbar-fixed-bottom .navbar-collapse {\r\n      max-height: 200px; } }\r\n\r\n.container > .navbar-header,\r\n.container > .navbar-collapse,\r\n.container-fluid > .navbar-header,\r\n.container-fluid > .navbar-collapse {\r\n  margin-right: -10px;\r\n  margin-left: -10px; }\r\n  @media (min-width: 0px) {\r\n    .container > .navbar-header,\r\n    .container > .navbar-collapse,\r\n    .container-fluid > .navbar-header,\r\n    .container-fluid > .navbar-collapse {\r\n      margin-right: 0;\r\n      margin-left: 0; } }\r\n\r\n.navbar-static-top {\r\n  z-index: 1000;\r\n  border-width: 0 0 1px; }\r\n  @media (min-width: 0px) {\r\n    .navbar-static-top {\r\n      border-radius: 0; } }\r\n\r\n.navbar-fixed-top,\r\n.navbar-fixed-bottom {\r\n  position: fixed;\r\n  right: 0;\r\n  left: 0;\r\n  z-index: 1030; }\r\n  @media (min-width: 0px) {\r\n    .navbar-fixed-top,\r\n    .navbar-fixed-bottom {\r\n      border-radius: 0; } }\r\n\r\n.navbar-fixed-top {\r\n  top: 0;\r\n  border-width: 0 0 1px; }\r\n\r\n.navbar-fixed-bottom {\r\n  bottom: 0;\r\n  margin-bottom: 0;\r\n  border-width: 1px 0 0; }\r\n\r\n.navbar-brand {\r\n  float: left;\r\n  padding: 15px 10px;\r\n  font-size: 17px;\r\n  line-height: 20px;\r\n  height: 50px; }\r\n  .navbar-brand:hover, .navbar-brand:focus {\r\n    text-decoration: none; }\r\n  .navbar-brand > img {\r\n    display: block; }\r\n  @media (min-width: 0px) {\r\n    .navbar > .container .navbar-brand, .navbar > .container-fluid .navbar-brand {\r\n      margin-left: -10px; } }\r\n\r\n.navbar-toggle {\r\n  position: relative;\r\n  float: right;\r\n  margin-right: 10px;\r\n  padding: 9px 10px;\r\n  margin-top: 8px;\r\n  margin-bottom: 8px;\r\n  background-color: transparent;\r\n  background-image: none;\r\n  border: 1px solid transparent;\r\n  border-radius: 0; }\r\n  .navbar-toggle:focus {\r\n    outline: 0; }\r\n  .navbar-toggle .icon-bar {\r\n    display: block;\r\n    width: 22px;\r\n    height: 2px;\r\n    border-radius: 1px; }\r\n  .navbar-toggle .icon-bar + .icon-bar {\r\n    margin-top: 4px; }\r\n  @media (min-width: 0px) {\r\n    .navbar-toggle {\r\n      display: none; } }\r\n\r\n.navbar-nav {\r\n  margin: 7.5px -10px; }\r\n  .navbar-nav > li > a {\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    line-height: 20px; }\r\n  @media (max-width: -1px) {\r\n    .navbar-nav .open .dropdown-menu {\r\n      position: static;\r\n      float: none;\r\n      width: auto;\r\n      margin-top: 0;\r\n      background-color: transparent;\r\n      border: 0;\r\n      box-shadow: none; }\r\n      .navbar-nav .open .dropdown-menu > li > a,\r\n      .navbar-nav .open .dropdown-menu .dropdown-header {\r\n        padding: 5px 15px 5px 25px; }\r\n      .navbar-nav .open .dropdown-menu > li > a {\r\n        line-height: 20px; }\r\n        .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-nav .open .dropdown-menu > li > a:focus {\r\n          background-image: none; } }\r\n  @media (min-width: 0px) {\r\n    .navbar-nav {\r\n      float: left;\r\n      margin: 0; }\r\n      .navbar-nav > li {\r\n        float: left; }\r\n        .navbar-nav > li > a {\r\n          padding-top: 15px;\r\n          padding-bottom: 15px; } }\r\n\r\n.navbar-form {\r\n  margin-left: -10px;\r\n  margin-right: -10px;\r\n  padding: 10px 10px;\r\n  border-top: 1px solid transparent;\r\n  border-bottom: 1px solid transparent;\r\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\r\n  margin-top: 8px;\r\n  margin-bottom: 8px; }\r\n  @media (min-width: 0px) {\r\n    .navbar-form .form-group {\r\n      display: inline-block;\r\n      margin-bottom: 0;\r\n      vertical-align: middle; }\r\n    .navbar-form .form-control {\r\n      display: inline-block;\r\n      width: auto;\r\n      vertical-align: middle; }\r\n    .navbar-form .form-control-static {\r\n      display: inline-block; }\r\n    .navbar-form .input-group {\r\n      display: inline-table;\r\n      vertical-align: middle; }\r\n      .navbar-form .input-group .input-group-addon,\r\n      .navbar-form .input-group .input-group-btn,\r\n      .navbar-form .input-group .form-control {\r\n        width: auto; }\r\n    .navbar-form .input-group > .form-control {\r\n      width: 100%; }\r\n    .navbar-form .control-label {\r\n      margin-bottom: 0;\r\n      vertical-align: middle; }\r\n    .navbar-form .radio,\r\n    .navbar-form .checkbox {\r\n      display: inline-block;\r\n      margin-top: 0;\r\n      margin-bottom: 0;\r\n      vertical-align: middle; }\r\n      .navbar-form .radio label,\r\n      .navbar-form .checkbox label {\r\n        padding-left: 0; }\r\n    .navbar-form .radio input[type=\"radio\"],\r\n    .navbar-form .checkbox input[type=\"checkbox\"] {\r\n      position: relative;\r\n      margin-left: 0; }\r\n    .navbar-form .has-feedback .form-control-feedback {\r\n      top: 0; } }\r\n  @media (max-width: -1px) {\r\n    .navbar-form .form-group {\r\n      margin-bottom: 5px; }\r\n      .navbar-form .form-group:last-child {\r\n        margin-bottom: 0; } }\r\n  @media (min-width: 0px) {\r\n    .navbar-form {\r\n      width: auto;\r\n      border: 0;\r\n      margin-left: 0;\r\n      margin-right: 0;\r\n      padding-top: 0;\r\n      padding-bottom: 0;\r\n      box-shadow: none; } }\r\n\r\n.navbar-nav > li > .dropdown-menu {\r\n  margin-top: 0;\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0; }\r\n\r\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\r\n  margin-bottom: 0;\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0;\r\n  border-bottom-right-radius: 0;\r\n  border-bottom-left-radius: 0; }\r\n\r\n.navbar-btn {\r\n  margin-top: 8px;\r\n  margin-bottom: 8px; }\r\n  .navbar-btn.btn-sm, .btn-group-sm > .navbar-btn.btn {\r\n    margin-top: 10px;\r\n    margin-bottom: 10px; }\r\n  .navbar-btn.btn-xs, .btn-group-xs > .navbar-btn.btn {\r\n    margin-top: 14px;\r\n    margin-bottom: 14px; }\r\n\r\n.navbar-text {\r\n  margin-top: 15px;\r\n  margin-bottom: 15px; }\r\n  @media (min-width: 0px) {\r\n    .navbar-text {\r\n      float: left;\r\n      margin-left: 10px;\r\n      margin-right: 10px; } }\r\n\r\n@media (min-width: 0px) {\r\n  .navbar-left {\r\n    float: left !important; }\r\n\r\n  .navbar-right {\r\n    float: right !important;\r\n    margin-right: -10px; }\r\n    .navbar-right ~ .navbar-right {\r\n      margin-right: 0; } }\r\n.navbar-default {\r\n  background-color: #f8f8f8;\r\n  border-color: #e7e7e7; }\r\n  .navbar-default .navbar-brand {\r\n    color: #777; }\r\n    .navbar-default .navbar-brand:hover, .navbar-default .navbar-brand:focus {\r\n      color: #5e5e5e;\r\n      background-color: transparent; }\r\n  .navbar-default .navbar-text {\r\n    color: #777; }\r\n  .navbar-default .navbar-nav > li > a {\r\n    color: #777; }\r\n    .navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus {\r\n      color: #333;\r\n      background-color: transparent; }\r\n  .navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus {\r\n    color: #555;\r\n    background-color: #e7e7e7; }\r\n  .navbar-default .navbar-nav > .disabled > a, .navbar-default .navbar-nav > .disabled > a:hover, .navbar-default .navbar-nav > .disabled > a:focus {\r\n    color: #ccc;\r\n    background-color: transparent; }\r\n  .navbar-default .navbar-toggle {\r\n    border-color: #ddd; }\r\n    .navbar-default .navbar-toggle:hover, .navbar-default .navbar-toggle:focus {\r\n      background-color: #ddd; }\r\n    .navbar-default .navbar-toggle .icon-bar {\r\n      background-color: #888; }\r\n  .navbar-default .navbar-collapse,\r\n  .navbar-default .navbar-form {\r\n    border-color: #e7e7e7; }\r\n  .navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:hover, .navbar-default .navbar-nav > .open > a:focus {\r\n    background-color: #e7e7e7;\r\n    color: #555; }\r\n  @media (max-width: -1px) {\r\n    .navbar-default .navbar-nav .open .dropdown-menu > li > a {\r\n      color: #777; }\r\n      .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\r\n        color: #333;\r\n        background-color: transparent; }\r\n    .navbar-default .navbar-nav .open .dropdown-menu > .active > a, .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\r\n      color: #555;\r\n      background-color: #e7e7e7; }\r\n    .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\r\n      color: #ccc;\r\n      background-color: transparent; } }\r\n  .navbar-default .navbar-link {\r\n    color: #777; }\r\n    .navbar-default .navbar-link:hover {\r\n      color: #333; }\r\n  .navbar-default .btn-link {\r\n    color: #777; }\r\n    .navbar-default .btn-link:hover, .navbar-default .btn-link:focus {\r\n      color: #333; }\r\n    .navbar-default .btn-link[disabled]:hover, .navbar-default .btn-link[disabled]:focus, fieldset[disabled] .navbar-default .btn-link:hover, fieldset[disabled] .navbar-default .btn-link:focus {\r\n      color: #ccc; }\r\n\r\n.navbar-inverse {\r\n  background-color: #222;\r\n  border-color: #090909; }\r\n  .navbar-inverse .navbar-brand {\r\n    color: #9d9d9d; }\r\n    .navbar-inverse .navbar-brand:hover, .navbar-inverse .navbar-brand:focus {\r\n      color: #fff;\r\n      background-color: transparent; }\r\n  .navbar-inverse .navbar-text {\r\n    color: #9d9d9d; }\r\n  .navbar-inverse .navbar-nav > li > a {\r\n    color: #9d9d9d; }\r\n    .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {\r\n      color: #fff;\r\n      background-color: transparent; }\r\n  .navbar-inverse .navbar-nav > .active > a, .navbar-inverse .navbar-nav > .active > a:hover, .navbar-inverse .navbar-nav > .active > a:focus {\r\n    color: #fff;\r\n    background-color: #090909; }\r\n  .navbar-inverse .navbar-nav > .disabled > a, .navbar-inverse .navbar-nav > .disabled > a:hover, .navbar-inverse .navbar-nav > .disabled > a:focus {\r\n    color: #444;\r\n    background-color: transparent; }\r\n  .navbar-inverse .navbar-toggle {\r\n    border-color: #333; }\r\n    .navbar-inverse .navbar-toggle:hover, .navbar-inverse .navbar-toggle:focus {\r\n      background-color: #333; }\r\n    .navbar-inverse .navbar-toggle .icon-bar {\r\n      background-color: #fff; }\r\n  .navbar-inverse .navbar-collapse,\r\n  .navbar-inverse .navbar-form {\r\n    border-color: #101010; }\r\n  .navbar-inverse .navbar-nav > .open > a, .navbar-inverse .navbar-nav > .open > a:hover, .navbar-inverse .navbar-nav > .open > a:focus {\r\n    background-color: #090909;\r\n    color: #fff; }\r\n  @media (max-width: -1px) {\r\n    .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\r\n      border-color: #090909; }\r\n    .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\r\n      background-color: #090909; }\r\n    .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\r\n      color: #9d9d9d; }\r\n      .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\r\n        color: #fff;\r\n        background-color: transparent; }\r\n    .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\r\n      color: #fff;\r\n      background-color: #090909; }\r\n    .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\r\n      color: #444;\r\n      background-color: transparent; } }\r\n  .navbar-inverse .navbar-link {\r\n    color: #9d9d9d; }\r\n    .navbar-inverse .navbar-link:hover {\r\n      color: #fff; }\r\n  .navbar-inverse .btn-link {\r\n    color: #9d9d9d; }\r\n    .navbar-inverse .btn-link:hover, .navbar-inverse .btn-link:focus {\r\n      color: #fff; }\r\n    .navbar-inverse .btn-link[disabled]:hover, .navbar-inverse .btn-link[disabled]:focus, fieldset[disabled] .navbar-inverse .btn-link:hover, fieldset[disabled] .navbar-inverse .btn-link:focus {\r\n      color: #444; }\r\n\r\n.breadcrumb {\r\n  padding: 11px 15px;\r\n  margin-bottom: 20px;\r\n  list-style: none;\r\n  background-color: #f5f5f5;\r\n  border-radius: 0; }\r\n  .breadcrumb > li {\r\n    display: inline-block; }\r\n    .breadcrumb > li + li:before {\r\n      content: \"/\\A0\";\r\n      padding: 0 5px;\r\n      color: #ccc; }\r\n  .breadcrumb > .active {\r\n    color: #777777; }\r\n\r\n.pagination {\r\n  display: inline-block;\r\n  padding-left: 0;\r\n  margin: 20px 0;\r\n  border-radius: 0; }\r\n  .pagination > li {\r\n    display: inline; }\r\n    .pagination > li > a,\r\n    .pagination > li > span {\r\n      position: relative;\r\n      float: left;\r\n      padding: 6px 12px;\r\n      line-height: 1.42857;\r\n      text-decoration: none;\r\n      color: #999; }\r\n    .pagination > li:last-child > a,\r\n    .pagination > li:last-child > span, .pagination > li:first-child > a,\r\n    .pagination > li:first-child > span {\r\n      color: #fff;\r\n      background-color: #99d7ff;\r\n      margin-left: -1px; }\r\n  .pagination > li > a:hover, .pagination > li > a:focus,\r\n  .pagination > li > span:hover,\r\n  .pagination > li > span:focus {\r\n    z-index: 2;\r\n    color: #000; }\r\n  .pagination > li:first-child > a:hover, .pagination > li:first-child > a:focus,\r\n  .pagination > li:first-child > span:hover,\r\n  .pagination > li:first-child > span:focus,\r\n  .pagination > li:last-child > a:hover,\r\n  .pagination > li:last-child > a:focus,\r\n  .pagination > li:last-child > span:hover,\r\n  .pagination > li:last-child > span:focus {\r\n    z-index: 2;\r\n    color: #fff;\r\n    background-color: #78caff;\r\n    border-color: #ddd; }\r\n  .pagination > .active > a, .pagination > .active > a:hover, .pagination > .active > a:focus,\r\n  .pagination > .active > span,\r\n  .pagination > .active > span:hover,\r\n  .pagination > .active > span:focus {\r\n    z-index: 3;\r\n    color: #000; }\r\n  .pagination > .disabled > span,\r\n  .pagination > .disabled > span:hover,\r\n  .pagination > .disabled > span:focus,\r\n  .pagination > .disabled > a,\r\n  .pagination > .disabled > a:hover,\r\n  .pagination > .disabled > a:focus {\r\n    color: #777777 !important;\r\n    background-color: #c9c9c9 !important;\r\n    border-color: #ddd !important;\r\n    cursor: not-allowed !important; }\r\n\r\n.pagination-lg > li > a,\r\n.pagination-lg > li > span {\r\n  padding: 10px 16px;\r\n  font-size: 17px;\r\n  line-height: 1.33333; }\r\n.pagination-lg > li:first-child > a,\r\n.pagination-lg > li:first-child > span {\r\n  border-bottom-left-radius: 4px;\r\n  border-top-left-radius: 4px; }\r\n.pagination-lg > li:last-child > a,\r\n.pagination-lg > li:last-child > span {\r\n  border-bottom-right-radius: 4px;\r\n  border-top-right-radius: 4px; }\r\n\r\n.pagination-sm > li > a,\r\n.pagination-sm > li > span {\r\n  padding: 5px 10px;\r\n  font-size: 12px;\r\n  line-height: 1.5; }\r\n.pagination-sm > li:first-child > a,\r\n.pagination-sm > li:first-child > span {\r\n  border-bottom-left-radius: 2px;\r\n  border-top-left-radius: 2px; }\r\n.pagination-sm > li:last-child > a,\r\n.pagination-sm > li:last-child > span {\r\n  border-bottom-right-radius: 2px;\r\n  border-top-right-radius: 2px; }\r\n\r\n.pager {\r\n  padding-left: 0;\r\n  margin: 20px 0;\r\n  list-style: none;\r\n  text-align: center; }\r\n  .pager:before, .pager:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .pager:after {\r\n    clear: both; }\r\n  .pager li {\r\n    display: inline; }\r\n    .pager li > a,\r\n    .pager li > span {\r\n      display: inline-block;\r\n      padding: 5px 14px;\r\n      background-color: #99d7ff;\r\n      border: 1px solid #ddd;\r\n      border-radius: 15px; }\r\n    .pager li > a:hover,\r\n    .pager li > a:focus {\r\n      text-decoration: none;\r\n      background-color: #78caff; }\r\n  .pager .next > a,\r\n  .pager .next > span {\r\n    float: right; }\r\n  .pager .previous > a,\r\n  .pager .previous > span {\r\n    float: left; }\r\n  .pager .disabled > a,\r\n  .pager .disabled > a:hover,\r\n  .pager .disabled > a:focus,\r\n  .pager .disabled > span {\r\n    color: #777777;\r\n    background-color: #99d7ff;\r\n    cursor: not-allowed; }\r\n\r\n.label {\r\n  display: inline;\r\n  padding: .2em .6em .3em;\r\n  font-size: 75%;\r\n  font-weight: bold;\r\n  line-height: 1;\r\n  color: #fff;\r\n  text-align: center;\r\n  white-space: nowrap;\r\n  vertical-align: baseline;\r\n  border-radius: .25em; }\r\n  .label:empty {\r\n    display: none; }\r\n  .btn .label {\r\n    position: relative;\r\n    top: -1px; }\r\n\r\na.label:hover, a.label:focus {\r\n  color: #fff;\r\n  text-decoration: none;\r\n  cursor: pointer; }\r\n\r\n.label-default {\r\n  background-color: #777777; }\r\n  .label-default[href]:hover, .label-default[href]:focus {\r\n    background-color: #5e5e5e; }\r\n\r\n.label-primary {\r\n  background-color: #419ce9; }\r\n  .label-primary[href]:hover, .label-primary[href]:focus {\r\n    background-color: #1a84dd; }\r\n\r\n.label-success {\r\n  background-color: #53c843; }\r\n  .label-success[href]:hover, .label-success[href]:focus {\r\n    background-color: #3fa731; }\r\n\r\n.label-info {\r\n  background-color: #50cee7; }\r\n  .label-info[href]:hover, .label-info[href]:focus {\r\n    background-color: #23c1e1; }\r\n\r\n.label-warning {\r\n  background-color: #ffb848; }\r\n  .label-warning[href]:hover, .label-warning[href]:focus {\r\n    background-color: #ffa415; }\r\n\r\n.label-danger {\r\n  background-color: #f73666; }\r\n  .label-danger[href]:hover, .label-danger[href]:focus {\r\n    background-color: #f00a43; }\r\n\r\n.badge {\r\n  display: inline-block;\r\n  min-width: 10px;\r\n  padding: 3px 7px;\r\n  font-size: 12px;\r\n  font-weight: bold;\r\n  color: #fff;\r\n  line-height: 1;\r\n  vertical-align: middle;\r\n  white-space: nowrap;\r\n  text-align: center;\r\n  background-color: #777777; }\r\n  .badge:empty {\r\n    display: none; }\r\n  .btn .badge {\r\n    position: relative;\r\n    top: -1px; }\r\n  .btn-xs .badge, .btn-group-xs > .btn .badge, .btn-group-xs > .btn .badge {\r\n    top: 0;\r\n    padding: 1px 5px; }\r\n  .list-group-item.active > .badge, .nav-pills > .active > a > .badge {\r\n    color: #419ce9;\r\n    background-color: #fff; }\r\n  .list-group-item > .badge {\r\n    float: right; }\r\n  .list-group-item > .badge + .badge {\r\n    margin-right: 5px; }\r\n  .nav-pills > li > a > .badge {\r\n    margin-left: 3px; }\r\n  .badge.badge-primary {\r\n    background: #1776c7; }\r\n  .badge.badge-success {\r\n    background: #38932b; }\r\n  .badge.badge-info {\r\n    background: #1cb1ce; }\r\n  .badge.badge-warning {\r\n    background: #fb9900; }\r\n  .badge.badge-danger {\r\n    background: #d8093c; }\r\n\r\na.badge:hover, a.badge:focus {\r\n  color: #fff;\r\n  text-decoration: none;\r\n  cursor: pointer; }\r\n\r\n.jumbotron {\r\n  padding-top: 30px;\r\n  padding-bottom: 30px;\r\n  margin-bottom: 30px;\r\n  color: inherit;\r\n  background-color: #eeeeee; }\r\n  .jumbotron h1,\r\n  .jumbotron .h1 {\r\n    color: inherit; }\r\n  .jumbotron p {\r\n    margin-bottom: 15px;\r\n    font-size: 21px;\r\n    font-weight: 200; }\r\n  .jumbotron > hr {\r\n    border-top-color: #d5d5d5; }\r\n  .container .jumbotron, .container-fluid .jumbotron {\r\n    border-radius: 4px;\r\n    padding-left: 10px;\r\n    padding-right: 10px; }\r\n  .jumbotron .container {\r\n    max-width: 100%; }\r\n  @media screen and (min-width: 0px) {\r\n    .jumbotron {\r\n      padding-top: 48px;\r\n      padding-bottom: 48px; }\r\n      .container .jumbotron, .container-fluid .jumbotron {\r\n        padding-left: 60px;\r\n        padding-right: 60px; }\r\n      .jumbotron h1,\r\n      .jumbotron .h1 {\r\n        font-size: 63px; } }\r\n\r\n.thumbnail {\r\n  display: block;\r\n  padding: 4px;\r\n  margin-bottom: 20px;\r\n  line-height: 1.42857;\r\n  background-color: #fff;\r\n  border: 1px solid #ddd;\r\n  border-radius: 0;\r\n  -webkit-transition: border 0.2s ease-in-out;\r\n  transition: border 0.2s ease-in-out; }\r\n  .thumbnail > img,\r\n  .thumbnail a > img {\r\n    display: block;\r\n    max-width: 100%;\r\n    height: auto;\r\n    margin-left: auto;\r\n    margin-right: auto; }\r\n  .thumbnail .caption {\r\n    padding: 9px;\r\n    color: #333333; }\r\n\r\na.thumbnail:hover,\r\na.thumbnail:focus,\r\na.thumbnail.active {\r\n  border-color: #419ce9; }\r\n\r\n.alert {\r\n  padding: 15px;\r\n  margin-bottom: 20px;\r\n  border: 1px solid transparent;\r\n  border-radius: 0; }\r\n  .alert h4 {\r\n    margin-top: 0;\r\n    color: inherit; }\r\n  .alert .alert-link {\r\n    font-weight: bold; }\r\n  .alert > p,\r\n  .alert > ul {\r\n    margin-bottom: 0; }\r\n  .alert > p + p {\r\n    margin-top: 5px; }\r\n\r\n.alert-dismissable,\r\n.alert-dismissible {\r\n  padding-right: 35px; }\r\n  .alert-dismissable .close,\r\n  .alert-dismissible .close {\r\n    position: relative;\r\n    top: -2px;\r\n    right: -21px;\r\n    color: inherit; }\r\n\r\n.alert-success {\r\n  background-color: #dff0d8;\r\n  border-color: #d6e9c6;\r\n  color: #3c763d; }\r\n  .alert-success hr {\r\n    border-top-color: #c9e2b3; }\r\n  .alert-success .alert-link {\r\n    color: #2b542c; }\r\n\r\n.alert-info {\r\n  background-color: #d9edf7;\r\n  border-color: #bce8f1;\r\n  color: #31708f; }\r\n  .alert-info hr {\r\n    border-top-color: #a6e1ec; }\r\n  .alert-info .alert-link {\r\n    color: #245269; }\r\n\r\n.alert-warning {\r\n  background-color: #fcf8e3;\r\n  border-color: #faebcc;\r\n  color: #8a6d3b; }\r\n  .alert-warning hr {\r\n    border-top-color: #f7e1b5; }\r\n  .alert-warning .alert-link {\r\n    color: #66512c; }\r\n\r\n.alert-danger {\r\n  background-color: #f2dede;\r\n  border-color: #ebccd1;\r\n  color: #a94442; }\r\n  .alert-danger hr {\r\n    border-top-color: #e4b9c0; }\r\n  .alert-danger .alert-link {\r\n    color: #843534; }\r\n\r\n@-webkit-keyframes progress-bar-stripes {\r\n  from {\r\n    background-position: 40px 0; }\r\n  to {\r\n    background-position: 0 0; } }\r\n@keyframes progress-bar-stripes {\r\n  from {\r\n    background-position: 40px 0; }\r\n  to {\r\n    background-position: 0 0; } }\r\n.progress {\r\n  overflow: hidden;\r\n  height: 20px;\r\n  margin-bottom: 20px;\r\n  background-color: #f5f5f5;\r\n  border-radius: 0;\r\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); }\r\n\r\n.progress-bar {\r\n  float: left;\r\n  width: 0%;\r\n  height: 100%;\r\n  font-size: 12px;\r\n  line-height: 20px;\r\n  color: #fff;\r\n  text-align: center;\r\n  background-color: #419ce9;\r\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\r\n  -webkit-transition: width 0.6s ease;\r\n  transition: width 0.6s ease; }\r\n\r\n.progress-striped .progress-bar,\r\n.progress-bar-striped {\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n  background-size: 40px 40px; }\r\n\r\n.progress.active .progress-bar,\r\n.progress-bar.active {\r\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\r\n  animation: progress-bar-stripes 2s linear infinite; }\r\n\r\n.progress-bar-success {\r\n  background-color: #53c843; }\r\n  .progress-striped .progress-bar-success {\r\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\r\n\r\n.progress-bar-info {\r\n  background-color: #50cee7; }\r\n  .progress-striped .progress-bar-info {\r\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\r\n\r\n.progress-bar-warning {\r\n  background-color: #ffb848; }\r\n  .progress-striped .progress-bar-warning {\r\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\r\n\r\n.progress-bar-danger {\r\n  background-color: #f73666; }\r\n  .progress-striped .progress-bar-danger {\r\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\r\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\r\n\r\n.media {\r\n  margin-top: 15px; }\r\n  .media:first-child {\r\n    margin-top: 0; }\r\n\r\n.media,\r\n.media-body {\r\n  zoom: 1;\r\n  overflow: hidden; }\r\n\r\n.media-body {\r\n  width: 10000px; }\r\n\r\n.media-object {\r\n  display: block; }\r\n  .media-object.img-thumbnail {\r\n    max-width: none; }\r\n\r\n.media-right,\r\n.media > .pull-right {\r\n  padding-left: 10px; }\r\n\r\n.media-left,\r\n.media > .pull-left {\r\n  padding-right: 10px; }\r\n\r\n.media-left,\r\n.media-right,\r\n.media-body {\r\n  display: table-cell;\r\n  vertical-align: top; }\r\n\r\n.media-middle {\r\n  vertical-align: middle; }\r\n\r\n.media-bottom {\r\n  vertical-align: bottom; }\r\n\r\n.media-heading {\r\n  margin-top: 0;\r\n  margin-bottom: 5px; }\r\n\r\n.media-list {\r\n  padding-left: 0;\r\n  list-style: none; }\r\n\r\n.list-group {\r\n  margin-bottom: 20px;\r\n  padding-left: 0; }\r\n\r\n.list-group-item {\r\n  position: relative;\r\n  display: block;\r\n  padding: 10px 15px;\r\n  margin-bottom: -1px;\r\n  background-color: #fff;\r\n  border: 1px solid #ddd; }\r\n  .list-group-item:first-child {\r\n    border-top-right-radius: 0;\r\n    border-top-left-radius: 0; }\r\n  .list-group-item:last-child {\r\n    margin-bottom: 0;\r\n    border-bottom-right-radius: 0;\r\n    border-bottom-left-radius: 0; }\r\n\r\na.list-group-item,\r\nbutton.list-group-item {\r\n  color: #555; }\r\n  a.list-group-item .list-group-item-heading,\r\n  button.list-group-item .list-group-item-heading {\r\n    color: #333; }\r\n  a.list-group-item:hover, a.list-group-item:focus,\r\n  button.list-group-item:hover,\r\n  button.list-group-item:focus {\r\n    text-decoration: none;\r\n    color: #555;\r\n    background-color: #f5f5f5; }\r\n\r\nbutton.list-group-item {\r\n  width: 100%;\r\n  text-align: left; }\r\n\r\n.list-group-item.disabled, .list-group-item.disabled:hover, .list-group-item.disabled:focus {\r\n  background-color: #eeeeee;\r\n  color: #777777;\r\n  cursor: not-allowed; }\r\n  .list-group-item.disabled .list-group-item-heading, .list-group-item.disabled:hover .list-group-item-heading, .list-group-item.disabled:focus .list-group-item-heading {\r\n    color: inherit; }\r\n  .list-group-item.disabled .list-group-item-text, .list-group-item.disabled:hover .list-group-item-text, .list-group-item.disabled:focus .list-group-item-text {\r\n    color: #777777; }\r\n.list-group-item.active, .list-group-item.active:hover, .list-group-item.active:focus {\r\n  z-index: 2;\r\n  color: #fff;\r\n  background-color: #419ce9;\r\n  border-color: #419ce9; }\r\n  .list-group-item.active .list-group-item-heading,\r\n  .list-group-item.active .list-group-item-heading > small,\r\n  .list-group-item.active .list-group-item-heading > .small, .list-group-item.active:hover .list-group-item-heading,\r\n  .list-group-item.active:hover .list-group-item-heading > small,\r\n  .list-group-item.active:hover .list-group-item-heading > .small, .list-group-item.active:focus .list-group-item-heading,\r\n  .list-group-item.active:focus .list-group-item-heading > small,\r\n  .list-group-item.active:focus .list-group-item-heading > .small {\r\n    color: inherit; }\r\n  .list-group-item.active .list-group-item-text, .list-group-item.active:hover .list-group-item-text, .list-group-item.active:focus .list-group-item-text {\r\n    color: #f8fbfe; }\r\n\r\n.list-group-item-success {\r\n  color: #3c763d;\r\n  background-color: #dff0d8; }\r\n\r\na.list-group-item-success,\r\nbutton.list-group-item-success {\r\n  color: #3c763d; }\r\n  a.list-group-item-success .list-group-item-heading,\r\n  button.list-group-item-success .list-group-item-heading {\r\n    color: inherit; }\r\n  a.list-group-item-success:hover, a.list-group-item-success:focus,\r\n  button.list-group-item-success:hover,\r\n  button.list-group-item-success:focus {\r\n    color: #3c763d;\r\n    background-color: #d0e9c6; }\r\n  a.list-group-item-success.active, a.list-group-item-success.active:hover, a.list-group-item-success.active:focus,\r\n  button.list-group-item-success.active,\r\n  button.list-group-item-success.active:hover,\r\n  button.list-group-item-success.active:focus {\r\n    color: #fff;\r\n    background-color: #3c763d;\r\n    border-color: #3c763d; }\r\n\r\n.list-group-item-info {\r\n  color: #31708f;\r\n  background-color: #d9edf7; }\r\n\r\na.list-group-item-info,\r\nbutton.list-group-item-info {\r\n  color: #31708f; }\r\n  a.list-group-item-info .list-group-item-heading,\r\n  button.list-group-item-info .list-group-item-heading {\r\n    color: inherit; }\r\n  a.list-group-item-info:hover, a.list-group-item-info:focus,\r\n  button.list-group-item-info:hover,\r\n  button.list-group-item-info:focus {\r\n    color: #31708f;\r\n    background-color: #c4e3f3; }\r\n  a.list-group-item-info.active, a.list-group-item-info.active:hover, a.list-group-item-info.active:focus,\r\n  button.list-group-item-info.active,\r\n  button.list-group-item-info.active:hover,\r\n  button.list-group-item-info.active:focus {\r\n    color: #fff;\r\n    background-color: #31708f;\r\n    border-color: #31708f; }\r\n\r\n.list-group-item-warning {\r\n  color: #8a6d3b;\r\n  background-color: #fcf8e3; }\r\n\r\na.list-group-item-warning,\r\nbutton.list-group-item-warning {\r\n  color: #8a6d3b; }\r\n  a.list-group-item-warning .list-group-item-heading,\r\n  button.list-group-item-warning .list-group-item-heading {\r\n    color: inherit; }\r\n  a.list-group-item-warning:hover, a.list-group-item-warning:focus,\r\n  button.list-group-item-warning:hover,\r\n  button.list-group-item-warning:focus {\r\n    color: #8a6d3b;\r\n    background-color: #faf2cc; }\r\n  a.list-group-item-warning.active, a.list-group-item-warning.active:hover, a.list-group-item-warning.active:focus,\r\n  button.list-group-item-warning.active,\r\n  button.list-group-item-warning.active:hover,\r\n  button.list-group-item-warning.active:focus {\r\n    color: #fff;\r\n    background-color: #8a6d3b;\r\n    border-color: #8a6d3b; }\r\n\r\n.list-group-item-danger {\r\n  color: #a94442;\r\n  background-color: #f2dede; }\r\n\r\na.list-group-item-danger,\r\nbutton.list-group-item-danger {\r\n  color: #a94442; }\r\n  a.list-group-item-danger .list-group-item-heading,\r\n  button.list-group-item-danger .list-group-item-heading {\r\n    color: inherit; }\r\n  a.list-group-item-danger:hover, a.list-group-item-danger:focus,\r\n  button.list-group-item-danger:hover,\r\n  button.list-group-item-danger:focus {\r\n    color: #a94442;\r\n    background-color: #ebcccc; }\r\n  a.list-group-item-danger.active, a.list-group-item-danger.active:hover, a.list-group-item-danger.active:focus,\r\n  button.list-group-item-danger.active,\r\n  button.list-group-item-danger.active:hover,\r\n  button.list-group-item-danger.active:focus {\r\n    color: #fff;\r\n    background-color: #a94442;\r\n    border-color: #a94442; }\r\n\r\n.list-group-item-heading {\r\n  margin-top: 0;\r\n  margin-bottom: 5px; }\r\n\r\n.list-group-item-text {\r\n  margin-bottom: 0;\r\n  line-height: 1.3; }\r\n\r\n.panel {\r\n  margin-bottom: 20px;\r\n  background-color: #fff;\r\n  border: 1px solid transparent;\r\n  border-radius: 0;\r\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); }\r\n\r\n.panel-body {\r\n  padding: 15px; }\r\n  .panel-body:before, .panel-body:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .panel-body:after {\r\n    clear: both; }\r\n\r\n.panel-heading {\r\n  padding: 10px 15px;\r\n  border-bottom: 1px solid transparent;\r\n  border-top-right-radius: -1;\r\n  border-top-left-radius: -1; }\r\n  .panel-heading > .dropdown .dropdown-toggle {\r\n    color: inherit; }\r\n\r\n.panel-title {\r\n  margin-top: 0;\r\n  margin-bottom: 0;\r\n  font-size: 16px;\r\n  color: inherit; }\r\n  .panel-title > a,\r\n  .panel-title > small,\r\n  .panel-title > .small,\r\n  .panel-title > small > a,\r\n  .panel-title > .small > a {\r\n    color: inherit; }\r\n\r\n.panel-footer {\r\n  padding: 10px 15px;\r\n  background-color: #f5f5f5;\r\n  border-top: 1px solid #ddd;\r\n  border-bottom-right-radius: -1;\r\n  border-bottom-left-radius: -1; }\r\n\r\n.panel > .list-group,\r\n.panel > .panel-collapse > .list-group {\r\n  margin-bottom: 0; }\r\n  .panel > .list-group .list-group-item,\r\n  .panel > .panel-collapse > .list-group .list-group-item {\r\n    border-width: 1px 0;\r\n    border-radius: 0; }\r\n  .panel > .list-group:first-child .list-group-item:first-child,\r\n  .panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\r\n    border-top: 0;\r\n    border-top-right-radius: -1;\r\n    border-top-left-radius: -1; }\r\n  .panel > .list-group:last-child .list-group-item:last-child,\r\n  .panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\r\n    border-bottom: 0;\r\n    border-bottom-right-radius: -1;\r\n    border-bottom-left-radius: -1; }\r\n.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {\r\n  border-top-right-radius: 0;\r\n  border-top-left-radius: 0; }\r\n\r\n.panel-heading + .list-group .list-group-item:first-child {\r\n  border-top-width: 0; }\r\n\r\n.list-group + .panel-footer {\r\n  border-top-width: 0; }\r\n\r\n.panel > .table,\r\n.panel > .table-responsive > .table,\r\n.panel > .panel-collapse > .table {\r\n  margin-bottom: 0; }\r\n  .panel > .table caption,\r\n  .panel > .table-responsive > .table caption,\r\n  .panel > .panel-collapse > .table caption {\r\n    padding-left: 15px;\r\n    padding-right: 15px; }\r\n.panel > .table:first-child,\r\n.panel > .table-responsive:first-child > .table:first-child {\r\n  border-top-right-radius: -1;\r\n  border-top-left-radius: -1; }\r\n  .panel > .table:first-child > thead:first-child > tr:first-child,\r\n  .panel > .table:first-child > tbody:first-child > tr:first-child,\r\n  .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\r\n  .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\r\n    border-top-left-radius: -1;\r\n    border-top-right-radius: -1; }\r\n    .panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\r\n    .panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\r\n    .panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\r\n    .panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\r\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\r\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\r\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\r\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\r\n      border-top-left-radius: -1; }\r\n    .panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\r\n    .panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\r\n    .panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\r\n    .panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\r\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\r\n    .panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\r\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\r\n    .panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\r\n      border-top-right-radius: -1; }\r\n.panel > .table:last-child,\r\n.panel > .table-responsive:last-child > .table:last-child {\r\n  border-bottom-right-radius: -1;\r\n  border-bottom-left-radius: -1; }\r\n  .panel > .table:last-child > tbody:last-child > tr:last-child,\r\n  .panel > .table:last-child > tfoot:last-child > tr:last-child,\r\n  .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\r\n  .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\r\n    border-bottom-left-radius: -1;\r\n    border-bottom-right-radius: -1; }\r\n    .panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\r\n    .panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\r\n    .panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\r\n    .panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\r\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\r\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\r\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\r\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\r\n      border-bottom-left-radius: -1; }\r\n    .panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\r\n    .panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\r\n    .panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\r\n    .panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\r\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\r\n    .panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\r\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\r\n    .panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\r\n      border-bottom-right-radius: -1; }\r\n.panel > .panel-body + .table,\r\n.panel > .panel-body + .table-responsive,\r\n.panel > .table + .panel-body,\r\n.panel > .table-responsive + .panel-body {\r\n  border-top: 1px solid #ddd; }\r\n.panel > .table > tbody:first-child > tr:first-child th,\r\n.panel > .table > tbody:first-child > tr:first-child td {\r\n  border-top: 0; }\r\n.panel > .table-bordered,\r\n.panel > .table-responsive > .table-bordered {\r\n  border: 0; }\r\n  .panel > .table-bordered > thead > tr > th:first-child,\r\n  .panel > .table-bordered > thead > tr > td:first-child,\r\n  .panel > .table-bordered > tbody > tr > th:first-child,\r\n  .panel > .table-bordered > tbody > tr > td:first-child,\r\n  .panel > .table-bordered > tfoot > tr > th:first-child,\r\n  .panel > .table-bordered > tfoot > tr > td:first-child,\r\n  .panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\r\n  .panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\r\n  .panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\r\n  .panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\r\n  .panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\r\n  .panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\r\n    border-left: 0; }\r\n  .panel > .table-bordered > thead > tr > th:last-child,\r\n  .panel > .table-bordered > thead > tr > td:last-child,\r\n  .panel > .table-bordered > tbody > tr > th:last-child,\r\n  .panel > .table-bordered > tbody > tr > td:last-child,\r\n  .panel > .table-bordered > tfoot > tr > th:last-child,\r\n  .panel > .table-bordered > tfoot > tr > td:last-child,\r\n  .panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\r\n  .panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\r\n  .panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\r\n  .panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\r\n  .panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\r\n  .panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\r\n    border-right: 0; }\r\n  .panel > .table-bordered > thead > tr:first-child > td,\r\n  .panel > .table-bordered > thead > tr:first-child > th,\r\n  .panel > .table-bordered > tbody > tr:first-child > td,\r\n  .panel > .table-bordered > tbody > tr:first-child > th,\r\n  .panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\r\n  .panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\r\n  .panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\r\n  .panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\r\n    border-bottom: 0; }\r\n  .panel > .table-bordered > tbody > tr:last-child > td,\r\n  .panel > .table-bordered > tbody > tr:last-child > th,\r\n  .panel > .table-bordered > tfoot > tr:last-child > td,\r\n  .panel > .table-bordered > tfoot > tr:last-child > th,\r\n  .panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\r\n  .panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\r\n  .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\r\n  .panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\r\n    border-bottom: 0; }\r\n.panel > .table-responsive {\r\n  border: 0;\r\n  margin-bottom: 0; }\r\n\r\n.panel-group {\r\n  margin-bottom: 20px; }\r\n  .panel-group .panel {\r\n    margin-bottom: 0;\r\n    border-radius: 0; }\r\n    .panel-group .panel + .panel {\r\n      margin-top: 5px; }\r\n  .panel-group .panel-heading {\r\n    border-bottom: 0; }\r\n    .panel-group .panel-heading + .panel-collapse > .panel-body,\r\n    .panel-group .panel-heading + .panel-collapse > .list-group {\r\n      border-top: 1px solid #ddd; }\r\n  .panel-group .panel-footer {\r\n    border-top: 0; }\r\n    .panel-group .panel-footer + .panel-collapse .panel-body {\r\n      border-bottom: 1px solid #ddd; }\r\n\r\n.panel-default {\r\n  border-color: #ddd; }\r\n  .panel-default > .panel-heading {\r\n    color: #333333;\r\n    background-color: #f5f5f5;\r\n    border-color: #ddd; }\r\n    .panel-default > .panel-heading + .panel-collapse > .panel-body {\r\n      border-top-color: #ddd; }\r\n    .panel-default > .panel-heading .badge {\r\n      color: #f5f5f5;\r\n      background-color: #333333; }\r\n  .panel-default > .panel-footer + .panel-collapse > .panel-body {\r\n    border-bottom-color: #ddd; }\r\n\r\n.panel-primary {\r\n  border-color: #419ce9; }\r\n  .panel-primary > .panel-heading {\r\n    color: #fff;\r\n    background-color: #419ce9;\r\n    border-color: #419ce9; }\r\n    .panel-primary > .panel-heading + .panel-collapse > .panel-body {\r\n      border-top-color: #419ce9; }\r\n    .panel-primary > .panel-heading .badge {\r\n      color: #419ce9;\r\n      background-color: #fff; }\r\n  .panel-primary > .panel-footer + .panel-collapse > .panel-body {\r\n    border-bottom-color: #419ce9; }\r\n\r\n.panel-success {\r\n  border-color: #d6e9c6; }\r\n  .panel-success > .panel-heading {\r\n    color: #3c763d;\r\n    background-color: #dff0d8;\r\n    border-color: #d6e9c6; }\r\n    .panel-success > .panel-heading + .panel-collapse > .panel-body {\r\n      border-top-color: #d6e9c6; }\r\n    .panel-success > .panel-heading .badge {\r\n      color: #dff0d8;\r\n      background-color: #3c763d; }\r\n  .panel-success > .panel-footer + .panel-collapse > .panel-body {\r\n    border-bottom-color: #d6e9c6; }\r\n\r\n.panel-info {\r\n  border-color: #bce8f1; }\r\n  .panel-info > .panel-heading {\r\n    color: #31708f;\r\n    background-color: #d9edf7;\r\n    border-color: #bce8f1; }\r\n    .panel-info > .panel-heading + .panel-collapse > .panel-body {\r\n      border-top-color: #bce8f1; }\r\n    .panel-info > .panel-heading .badge {\r\n      color: #d9edf7;\r\n      background-color: #31708f; }\r\n  .panel-info > .panel-footer + .panel-collapse > .panel-body {\r\n    border-bottom-color: #bce8f1; }\r\n\r\n.panel-warning {\r\n  border-color: #faebcc; }\r\n  .panel-warning > .panel-heading {\r\n    color: #8a6d3b;\r\n    background-color: #fcf8e3;\r\n    border-color: #faebcc; }\r\n    .panel-warning > .panel-heading + .panel-collapse > .panel-body {\r\n      border-top-color: #faebcc; }\r\n    .panel-warning > .panel-heading .badge {\r\n      color: #fcf8e3;\r\n      background-color: #8a6d3b; }\r\n  .panel-warning > .panel-footer + .panel-collapse > .panel-body {\r\n    border-bottom-color: #faebcc; }\r\n\r\n.panel-danger {\r\n  border-color: #ebccd1; }\r\n  .panel-danger > .panel-heading {\r\n    color: #a94442;\r\n    background-color: #f2dede;\r\n    border-color: #ebccd1; }\r\n    .panel-danger > .panel-heading + .panel-collapse > .panel-body {\r\n      border-top-color: #ebccd1; }\r\n    .panel-danger > .panel-heading .badge {\r\n      color: #f2dede;\r\n      background-color: #a94442; }\r\n  .panel-danger > .panel-footer + .panel-collapse > .panel-body {\r\n    border-bottom-color: #ebccd1; }\r\n\r\n.embed-responsive {\r\n  position: relative;\r\n  display: block;\r\n  height: 0;\r\n  padding: 0;\r\n  overflow: hidden; }\r\n  .embed-responsive .embed-responsive-item,\r\n  .embed-responsive iframe,\r\n  .embed-responsive embed,\r\n  .embed-responsive object,\r\n  .embed-responsive video {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    bottom: 0;\r\n    height: 100%;\r\n    width: 100%;\r\n    border: 0; }\r\n\r\n.embed-responsive-16by9 {\r\n  padding-bottom: 56.25%; }\r\n\r\n.embed-responsive-4by3 {\r\n  padding-bottom: 75%; }\r\n\r\n.well {\r\n  min-height: 20px;\r\n  padding: 19px;\r\n  margin-bottom: 20px;\r\n  background-color: #f5f5f5;\r\n  border: 1px solid #e3e3e3;\r\n  border-radius: 0;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\r\n  .well blockquote {\r\n    border-color: #ddd;\r\n    border-color: rgba(0, 0, 0, 0.15); }\r\n\r\n.well-lg {\r\n  padding: 24px;\r\n  border-radius: 4px; }\r\n\r\n.well-sm {\r\n  padding: 9px;\r\n  border-radius: 2px; }\r\n\r\n.close {\r\n  float: right;\r\n  font-size: 21px;\r\n  font-weight: bold;\r\n  line-height: 1;\r\n  color: #000;\r\n  text-shadow: 0 1px 0 #fff;\r\n  opacity: 0.2;\r\n  filter: alpha(opacity=20); }\r\n  .close:hover, .close:focus {\r\n    color: #000;\r\n    text-decoration: none;\r\n    cursor: pointer;\r\n    opacity: 0.5;\r\n    filter: alpha(opacity=50); }\r\n\r\nbutton.close {\r\n  padding: 0;\r\n  cursor: pointer;\r\n  background: transparent;\r\n  border: 0;\r\n  -webkit-appearance: none; }\r\n\r\n.modal-open {\r\n  overflow: hidden; }\r\n\r\n.modal {\r\n  display: none;\r\n  overflow: hidden;\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 1050;\r\n  -webkit-overflow-scrolling: touch;\r\n  outline: 0; }\r\n  .modal.fade .modal-dialog {\r\n    -webkit-transform: translate(0, -25%);\r\n    transform: translate(0, -25%);\r\n    -webkit-transition: -webkit-transform 0.3s ease-out;\r\n    transition: -webkit-transform 0.3s ease-out;\r\n    transition: transform 0.3s ease-out;\r\n    transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out; }\r\n  .modal.in .modal-dialog {\r\n    -webkit-transform: translate(0, 0);\r\n    transform: translate(0, 0); }\r\n\r\n.modal-open .modal {\r\n  overflow-x: hidden;\r\n  overflow-y: auto; }\r\n\r\n.modal-dialog {\r\n  position: relative;\r\n  width: auto;\r\n  margin: 10px; }\r\n\r\n.modal-content {\r\n  position: relative;\r\n  background-color: #fff;\r\n  border: 1px solid #999;\r\n  border: 1px solid rgba(0, 0, 0, 0.2);\r\n  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.3);\r\n  background-clip: padding-box;\r\n  outline: 0; }\r\n\r\n.modal-backdrop {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  z-index: 1040;\r\n  background-color: #000; }\r\n  .modal-backdrop.fade {\r\n    opacity: 0;\r\n    filter: alpha(opacity=0); }\r\n  .modal-backdrop.in {\r\n    opacity: 0.3;\r\n    filter: alpha(opacity=30); }\r\n\r\n.modal-header {\r\n  padding: 10px 20px;\r\n  border-bottom: 1px solid #e5e5e5; }\r\n  .modal-header:before, .modal-header:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .modal-header:after {\r\n    clear: both; }\r\n\r\n.modal-header .close {\r\n  margin-top: -2px; }\r\n\r\n.modal-title {\r\n  margin: 0;\r\n  line-height: 1.42857;\r\n  color: #419ce9; }\r\n\r\n.modal-body {\r\n  position: relative;\r\n  padding: 10px 20px; }\r\n\r\n.modal-footer {\r\n  padding: 10px 20px;\r\n  text-align: center;\r\n  border-top: 1px solid #e5e5e5;\r\n  background: #f7f7f7; }\r\n  .modal-footer:before, .modal-footer:after {\r\n    content: \" \";\r\n    display: table; }\r\n  .modal-footer:after {\r\n    clear: both; }\r\n  .modal-footer .btn + .btn {\r\n    margin-left: 5px;\r\n    margin-bottom: 0; }\r\n  .modal-footer .btn-group .btn + .btn {\r\n    margin-left: -1px; }\r\n  .modal-footer .btn-block + .btn-block {\r\n    margin-left: 0; }\r\n\r\n.modal-scrollbar-measure {\r\n  position: absolute;\r\n  top: -9999px;\r\n  width: 50px;\r\n  height: 50px;\r\n  overflow: scroll; }\r\n\r\n@media (min-width: 0px) {\r\n  .modal-dialog {\r\n    width: 715px;\r\n    margin: 30px auto; }\r\n\r\n  .modal-content {\r\n    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2); }\r\n\r\n  .modal-sm {\r\n    width: 300px; } }\r\n@media (min-width: 992px) {\r\n  .modal-lg {\r\n    width: 900px; } }\r\n.tooltip {\r\n  position: absolute;\r\n  z-index: 1070;\r\n  display: block;\r\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  letter-spacing: normal;\r\n  line-break: auto;\r\n  line-height: 1.42857;\r\n  text-align: left;\r\n  text-align: start;\r\n  text-decoration: none;\r\n  text-shadow: none;\r\n  text-transform: none;\r\n  white-space: normal;\r\n  word-break: normal;\r\n  word-spacing: normal;\r\n  word-wrap: normal;\r\n  font-size: 12px;\r\n  opacity: 0;\r\n  filter: alpha(opacity=0); }\r\n  .tooltip.in {\r\n    opacity: 0.9;\r\n    filter: alpha(opacity=90); }\r\n  .tooltip.top {\r\n    margin-top: -3px;\r\n    padding: 5px 0; }\r\n  .tooltip.right {\r\n    margin-left: 3px;\r\n    padding: 0 5px; }\r\n  .tooltip.bottom {\r\n    margin-top: 3px;\r\n    padding: 5px 0; }\r\n  .tooltip.left {\r\n    margin-left: -3px;\r\n    padding: 0 5px; }\r\n\r\n.tooltip-inner {\r\n  max-width: 200px;\r\n  padding: 3px 8px;\r\n  color: #fff;\r\n  text-align: center;\r\n  background-color: #000;\r\n  border-radius: 0; }\r\n\r\n.tooltip-arrow {\r\n  position: absolute;\r\n  width: 0;\r\n  height: 0;\r\n  border-color: transparent;\r\n  border-style: solid; }\r\n\r\n.tooltip.top .tooltip-arrow {\r\n  bottom: 0;\r\n  left: 50%;\r\n  margin-left: -5px;\r\n  border-width: 5px 5px 0;\r\n  border-top-color: #000; }\r\n.tooltip.top-left .tooltip-arrow {\r\n  bottom: 0;\r\n  right: 5px;\r\n  margin-bottom: -5px;\r\n  border-width: 5px 5px 0;\r\n  border-top-color: #000; }\r\n.tooltip.top-right .tooltip-arrow {\r\n  bottom: 0;\r\n  left: 5px;\r\n  margin-bottom: -5px;\r\n  border-width: 5px 5px 0;\r\n  border-top-color: #000; }\r\n.tooltip.right .tooltip-arrow {\r\n  top: 50%;\r\n  left: 0;\r\n  margin-top: -5px;\r\n  border-width: 5px 5px 5px 0;\r\n  border-right-color: #000; }\r\n.tooltip.left .tooltip-arrow {\r\n  top: 50%;\r\n  right: 0;\r\n  margin-top: -5px;\r\n  border-width: 5px 0 5px 5px;\r\n  border-left-color: #000; }\r\n.tooltip.bottom .tooltip-arrow {\r\n  top: 0;\r\n  left: 50%;\r\n  margin-left: -5px;\r\n  border-width: 0 5px 5px;\r\n  border-bottom-color: #000; }\r\n.tooltip.bottom-left .tooltip-arrow {\r\n  top: 0;\r\n  right: 5px;\r\n  margin-top: -5px;\r\n  border-width: 0 5px 5px;\r\n  border-bottom-color: #000; }\r\n.tooltip.bottom-right .tooltip-arrow {\r\n  top: 0;\r\n  left: 5px;\r\n  margin-top: -5px;\r\n  border-width: 0 5px 5px;\r\n  border-bottom-color: #000; }\r\n\r\n.popover {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 1060;\r\n  display: none;\r\n  max-width: 276px;\r\n  padding: 1px;\r\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  font-style: normal;\r\n  font-weight: normal;\r\n  letter-spacing: normal;\r\n  line-break: auto;\r\n  line-height: 1.42857;\r\n  text-align: left;\r\n  text-align: start;\r\n  text-decoration: none;\r\n  text-shadow: none;\r\n  text-transform: none;\r\n  white-space: normal;\r\n  word-break: normal;\r\n  word-spacing: normal;\r\n  word-wrap: normal;\r\n  font-size: 14px;\r\n  background-color: #fff;\r\n  background-clip: padding-box;\r\n  border: 1px solid #ccc;\r\n  border: 1px solid rgba(0, 0, 0, 0.2);\r\n  border-radius: 4px;\r\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); }\r\n  .popover.top {\r\n    margin-top: -10px; }\r\n  .popover.right {\r\n    margin-left: 10px; }\r\n  .popover.bottom {\r\n    margin-top: 10px; }\r\n  .popover.left {\r\n    margin-left: -10px; }\r\n\r\n.popover-title {\r\n  margin: 0;\r\n  padding: 8px 14px;\r\n  font-size: 14px;\r\n  background-color: #f7f7f7;\r\n  border-bottom: 1px solid #ebebeb;\r\n  border-radius: 3px 3px 0 0; }\r\n\r\n.popover-content {\r\n  padding: 9px 14px; }\r\n\r\n.popover > .arrow, .popover > .arrow:after {\r\n  position: absolute;\r\n  display: block;\r\n  width: 0;\r\n  height: 0;\r\n  border-color: transparent;\r\n  border-style: solid; }\r\n\r\n.popover > .arrow {\r\n  border-width: 11px; }\r\n\r\n.popover > .arrow:after {\r\n  border-width: 10px;\r\n  content: \"\"; }\r\n\r\n.popover.top > .arrow {\r\n  left: 50%;\r\n  margin-left: -11px;\r\n  border-bottom-width: 0;\r\n  border-top-color: #999999;\r\n  border-top-color: rgba(0, 0, 0, 0.25);\r\n  bottom: -11px; }\r\n  .popover.top > .arrow:after {\r\n    content: \" \";\r\n    bottom: 1px;\r\n    margin-left: -10px;\r\n    border-bottom-width: 0;\r\n    border-top-color: #fff; }\r\n.popover.right > .arrow {\r\n  top: 50%;\r\n  left: -11px;\r\n  margin-top: -11px;\r\n  border-left-width: 0;\r\n  border-right-color: #999999;\r\n  border-right-color: rgba(0, 0, 0, 0.25); }\r\n  .popover.right > .arrow:after {\r\n    content: \" \";\r\n    left: 1px;\r\n    bottom: -10px;\r\n    border-left-width: 0;\r\n    border-right-color: #fff; }\r\n.popover.bottom > .arrow {\r\n  left: 50%;\r\n  margin-left: -11px;\r\n  border-top-width: 0;\r\n  border-bottom-color: #999999;\r\n  border-bottom-color: rgba(0, 0, 0, 0.25);\r\n  top: -11px; }\r\n  .popover.bottom > .arrow:after {\r\n    content: \" \";\r\n    top: 1px;\r\n    margin-left: -10px;\r\n    border-top-width: 0;\r\n    border-bottom-color: #fff; }\r\n.popover.left > .arrow {\r\n  top: 50%;\r\n  right: -11px;\r\n  margin-top: -11px;\r\n  border-right-width: 0;\r\n  border-left-color: #999999;\r\n  border-left-color: rgba(0, 0, 0, 0.25); }\r\n  .popover.left > .arrow:after {\r\n    content: \" \";\r\n    right: 1px;\r\n    border-right-width: 0;\r\n    border-left-color: #fff;\r\n    bottom: -10px; }\r\n\r\n.carousel {\r\n  position: relative; }\r\n\r\n.carousel-inner {\r\n  position: relative;\r\n  overflow: hidden;\r\n  width: 100%; }\r\n  .carousel-inner > .item {\r\n    display: none;\r\n    position: relative;\r\n    -webkit-transition: 0.6s ease-in-out left;\r\n    transition: 0.6s ease-in-out left; }\r\n    .carousel-inner > .item > img,\r\n    .carousel-inner > .item > a > img {\r\n      display: block;\r\n      max-width: 100%;\r\n      height: auto;\r\n      line-height: 1; }\r\n    @media all and (transform-3d), (-webkit-transform-3d) {\r\n      .carousel-inner > .item {\r\n        -webkit-transition: -webkit-transform 0.6s ease-in-out;\r\n        transition: -webkit-transform 0.6s ease-in-out;\r\n        transition: transform 0.6s ease-in-out;\r\n        transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;\r\n        -webkit-backface-visibility: hidden;\r\n        backface-visibility: hidden;\r\n        -webkit-perspective: 1000px;\r\n        perspective: 1000px; }\r\n        .carousel-inner > .item.next, .carousel-inner > .item.active.right {\r\n          -webkit-transform: translate3d(100%, 0, 0);\r\n          transform: translate3d(100%, 0, 0);\r\n          left: 0; }\r\n        .carousel-inner > .item.prev, .carousel-inner > .item.active.left {\r\n          -webkit-transform: translate3d(-100%, 0, 0);\r\n          transform: translate3d(-100%, 0, 0);\r\n          left: 0; }\r\n        .carousel-inner > .item.next.left, .carousel-inner > .item.prev.right, .carousel-inner > .item.active {\r\n          -webkit-transform: translate3d(0, 0, 0);\r\n          transform: translate3d(0, 0, 0);\r\n          left: 0; } }\r\n  .carousel-inner > .active,\r\n  .carousel-inner > .next,\r\n  .carousel-inner > .prev {\r\n    display: block; }\r\n  .carousel-inner > .active {\r\n    left: 0; }\r\n  .carousel-inner > .next,\r\n  .carousel-inner > .prev {\r\n    position: absolute;\r\n    top: 0;\r\n    width: 100%; }\r\n  .carousel-inner > .next {\r\n    left: 100%; }\r\n  .carousel-inner > .prev {\r\n    left: -100%; }\r\n  .carousel-inner > .next.left,\r\n  .carousel-inner > .prev.right {\r\n    left: 0; }\r\n  .carousel-inner > .active.left {\r\n    left: -100%; }\r\n  .carousel-inner > .active.right {\r\n    left: 100%; }\r\n\r\n.carousel-control {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  width: 15%;\r\n  opacity: 0.5;\r\n  filter: alpha(opacity=50);\r\n  font-size: 20px;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\r\n  background-color: transparent; }\r\n  .carousel-control.left {\r\n    background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\r\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\r\n    background-repeat: repeat-x;\r\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1); }\r\n  .carousel-control.right {\r\n    left: auto;\r\n    right: 0;\r\n    background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\r\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\r\n    background-repeat: repeat-x;\r\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1); }\r\n  .carousel-control:hover, .carousel-control:focus {\r\n    outline: 0;\r\n    color: #fff;\r\n    text-decoration: none;\r\n    opacity: 0.9;\r\n    filter: alpha(opacity=90); }\r\n  .carousel-control .icon-prev,\r\n  .carousel-control .icon-next,\r\n  .carousel-control .glyphicon-chevron-left,\r\n  .carousel-control .glyphicon-chevron-right {\r\n    position: absolute;\r\n    top: 50%;\r\n    margin-top: -10px;\r\n    z-index: 5;\r\n    display: inline-block; }\r\n  .carousel-control .icon-prev,\r\n  .carousel-control .glyphicon-chevron-left {\r\n    left: 50%;\r\n    margin-left: -10px; }\r\n  .carousel-control .icon-next,\r\n  .carousel-control .glyphicon-chevron-right {\r\n    right: 50%;\r\n    margin-right: -10px; }\r\n  .carousel-control .icon-prev,\r\n  .carousel-control .icon-next {\r\n    width: 20px;\r\n    height: 20px;\r\n    line-height: 1;\r\n    font-family: serif; }\r\n  .carousel-control .icon-prev:before {\r\n    content: '\\2039'; }\r\n  .carousel-control .icon-next:before {\r\n    content: '\\203A'; }\r\n\r\n.carousel-indicators {\r\n  position: absolute;\r\n  bottom: 10px;\r\n  left: 50%;\r\n  z-index: 15;\r\n  width: 60%;\r\n  margin-left: -30%;\r\n  padding-left: 0;\r\n  list-style: none;\r\n  text-align: center; }\r\n  .carousel-indicators li {\r\n    display: inline-block;\r\n    width: 10px;\r\n    height: 10px;\r\n    margin: 1px;\r\n    text-indent: -999px;\r\n    border: 1px solid #fff;\r\n    border-radius: 10px;\r\n    cursor: pointer;\r\n    background-color: #000 \\9;\r\n    background-color: transparent; }\r\n  .carousel-indicators .active {\r\n    margin: 0;\r\n    width: 12px;\r\n    height: 12px;\r\n    background-color: #fff; }\r\n\r\n.carousel-caption {\r\n  position: absolute;\r\n  left: 15%;\r\n  right: 15%;\r\n  bottom: 20px;\r\n  z-index: 10;\r\n  padding-top: 20px;\r\n  padding-bottom: 20px;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); }\r\n  .carousel-caption .btn {\r\n    text-shadow: none; }\r\n\r\n@media screen and (min-width: 0px) {\r\n  .carousel-control .glyphicon-chevron-left,\r\n  .carousel-control .glyphicon-chevron-right,\r\n  .carousel-control .icon-prev,\r\n  .carousel-control .icon-next {\r\n    width: 30px;\r\n    height: 30px;\r\n    margin-top: -10px;\r\n    font-size: 30px; }\r\n  .carousel-control .glyphicon-chevron-left,\r\n  .carousel-control .icon-prev {\r\n    margin-left: -10px; }\r\n  .carousel-control .glyphicon-chevron-right,\r\n  .carousel-control .icon-next {\r\n    margin-right: -10px; }\r\n\r\n  .carousel-caption {\r\n    left: 20%;\r\n    right: 20%;\r\n    padding-bottom: 30px; }\r\n\r\n  .carousel-indicators {\r\n    bottom: 20px; } }\r\n.clearfix:before, .clearfix:after {\r\n  content: \" \";\r\n  display: table; }\r\n.clearfix:after {\r\n  clear: both; }\r\n\r\n.center-block {\r\n  display: block;\r\n  margin-left: auto;\r\n  margin-right: auto; }\r\n\r\n.pull-right {\r\n  float: right !important; }\r\n\r\n.pull-left {\r\n  float: left !important; }\r\n\r\n.hide {\r\n  display: none !important; }\r\n\r\n.show {\r\n  display: block !important; }\r\n\r\n.invisible {\r\n  visibility: hidden; }\r\n\r\n.text-hide {\r\n  font: 0/0 a;\r\n  color: transparent;\r\n  text-shadow: none;\r\n  background-color: transparent;\r\n  border: 0; }\r\n\r\n.hidden {\r\n  display: none !important; }\r\n\r\n.affix {\r\n  position: fixed; }\r\n\r\n@-ms-viewport {\r\n  width: device-width; }\r\n.visible-xs {\r\n  display: none !important; }\r\n\r\n.visible-sm {\r\n  display: none !important; }\r\n\r\n.visible-md {\r\n  display: none !important; }\r\n\r\n.visible-lg {\r\n  display: none !important; }\r\n\r\n.visible-xs-block,\r\n.visible-xs-inline,\r\n.visible-xs-inline-block,\r\n.visible-sm-block,\r\n.visible-sm-inline,\r\n.visible-sm-inline-block,\r\n.visible-md-block,\r\n.visible-md-inline,\r\n.visible-md-inline-block,\r\n.visible-lg-block,\r\n.visible-lg-inline,\r\n.visible-lg-inline-block {\r\n  display: none !important; }\r\n\r\n@media (max-width: -1px) {\r\n  .visible-xs {\r\n    display: block !important; }\r\n\r\n  table.visible-xs {\r\n    display: table !important; }\r\n\r\n  tr.visible-xs {\r\n    display: table-row !important; }\r\n\r\n  th.visible-xs,\r\n  td.visible-xs {\r\n    display: table-cell !important; } }\r\n@media (max-width: -1px) {\r\n  .visible-xs-block {\r\n    display: block !important; } }\r\n\r\n@media (max-width: -1px) {\r\n  .visible-xs-inline {\r\n    display: inline !important; } }\r\n\r\n@media (max-width: -1px) {\r\n  .visible-xs-inline-block {\r\n    display: inline-block !important; } }\r\n\r\n@media (min-width: 0px) and (max-width: 991px) {\r\n  .visible-sm {\r\n    display: block !important; }\r\n\r\n  table.visible-sm {\r\n    display: table !important; }\r\n\r\n  tr.visible-sm {\r\n    display: table-row !important; }\r\n\r\n  th.visible-sm,\r\n  td.visible-sm {\r\n    display: table-cell !important; } }\r\n@media (min-width: 0px) and (max-width: 991px) {\r\n  .visible-sm-block {\r\n    display: block !important; } }\r\n\r\n@media (min-width: 0px) and (max-width: 991px) {\r\n  .visible-sm-inline {\r\n    display: inline !important; } }\r\n\r\n@media (min-width: 0px) and (max-width: 991px) {\r\n  .visible-sm-inline-block {\r\n    display: inline-block !important; } }\r\n\r\n@media (min-width: 992px) and (max-width: 1299px) {\r\n  .visible-md {\r\n    display: block !important; }\r\n\r\n  table.visible-md {\r\n    display: table !important; }\r\n\r\n  tr.visible-md {\r\n    display: table-row !important; }\r\n\r\n  th.visible-md,\r\n  td.visible-md {\r\n    display: table-cell !important; } }\r\n@media (min-width: 992px) and (max-width: 1299px) {\r\n  .visible-md-block {\r\n    display: block !important; } }\r\n\r\n@media (min-width: 992px) and (max-width: 1299px) {\r\n  .visible-md-inline {\r\n    display: inline !important; } }\r\n\r\n@media (min-width: 992px) and (max-width: 1299px) {\r\n  .visible-md-inline-block {\r\n    display: inline-block !important; } }\r\n\r\n@media (min-width: 1300px) {\r\n  .visible-lg {\r\n    display: block !important; }\r\n\r\n  table.visible-lg {\r\n    display: table !important; }\r\n\r\n  tr.visible-lg {\r\n    display: table-row !important; }\r\n\r\n  th.visible-lg,\r\n  td.visible-lg {\r\n    display: table-cell !important; } }\r\n@media (min-width: 1300px) {\r\n  .visible-lg-block {\r\n    display: block !important; } }\r\n\r\n@media (min-width: 1300px) {\r\n  .visible-lg-inline {\r\n    display: inline !important; } }\r\n\r\n@media (min-width: 1300px) {\r\n  .visible-lg-inline-block {\r\n    display: inline-block !important; } }\r\n\r\n@media (max-width: -1px) {\r\n  .hidden-xs {\r\n    display: none !important; } }\r\n@media (min-width: 0px) and (max-width: 991px) {\r\n  .hidden-sm {\r\n    display: none !important; } }\r\n@media (min-width: 992px) and (max-width: 1299px) {\r\n  .hidden-md {\r\n    display: none !important; } }\r\n@media (min-width: 1300px) {\r\n  .hidden-lg {\r\n    display: none !important; } }\r\n.visible-print {\r\n  display: none !important; }\r\n\r\n@media print {\r\n  .visible-print {\r\n    display: block !important; }\r\n\r\n  table.visible-print {\r\n    display: table !important; }\r\n\r\n  tr.visible-print {\r\n    display: table-row !important; }\r\n\r\n  th.visible-print,\r\n  td.visible-print {\r\n    display: table-cell !important; } }\r\n.visible-print-block {\r\n  display: none !important; }\r\n  @media print {\r\n    .visible-print-block {\r\n      display: block !important; } }\r\n\r\n.visible-print-inline {\r\n  display: none !important; }\r\n  @media print {\r\n    .visible-print-inline {\r\n      display: inline !important; } }\r\n\r\n.visible-print-inline-block {\r\n  display: none !important; }\r\n  @media print {\r\n    .visible-print-inline-block {\r\n      display: inline-block !important; } }\r\n\r\n@media print {\r\n  .hidden-print {\r\n    display: none !important; } }\r\n", ""]);

	// exports


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/fonts/glyphicons-halflings-regular.f4769f9.eot";

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/fonts/glyphicons-halflings-regular.448c34a.woff2";

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/fonts/glyphicons-halflings-regular.fa27723.woff";

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/fonts/glyphicons-halflings-regular.e18bbf6.ttf";

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/glyphicons-halflings-regular.8988968.svg";

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _login = __webpack_require__(177);

	exports.default = {
		components: {},
		data: function data() {
			return {
				isLogin: true,

				userinfo: {
					nick: '昵称'
				},
				router: {}
			};
		},
		ready: function ready() {
			this.router = _login.router;
		}
	};

/***/ },
/* 187 */
/***/ function(module, exports) {

	module.exports = "\n<router-view></router-view>\n";

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(189)
	__vue_script__ = __webpack_require__(194)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] easierScene\\component\\login-panel.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(200)
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
	  var id = "_v-0edf1f21/login-panel.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(190);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login-panel.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/sass-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./login-panel.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports


	// module
	exports.push([module.id, "html,\nbody {\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  overflow: hidden; }\n\n.main {\n  height: 100%;\n  width: 100%;\n  background-image: url(" + __webpack_require__(191) + ");\n  background-size: 100%;\n  background-repeat: no-repeat;\n  overflow: hidden; }\n  .main .login-panel {\n    position: absolute;\n    height: 413px;\n    width: 379px;\n    border-radius: 13px;\n    background-color: white;\n    left: 50%;\n    top: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n    .main .login-panel .form-panel .form-input {\n      position: relative;\n      text-align: center;\n      margin-bottom: 35px; }\n      .main .login-panel .form-panel .form-input::before {\n        display: block;\n        content: ' ';\n        background-image: url(" + __webpack_require__(192) + ");\n        width: 22px;\n        height: 25px;\n        background-size: 100%;\n        background-repeat: no-repeat;\n        position: absolute;\n        top: 50%;\n        left: 65px;\n        -webkit-transform: translateY(-50%);\n                transform: translateY(-50%);\n        z-index: 1; }\n      .main .login-panel .form-panel .form-input input {\n        width: 275px;\n        height: 35px;\n        border: 1px solid #c1c1c1;\n        border-radius: 5px;\n        outline: none;\n        position: relative;\n        padding-left: 40px;\n        box-sizing: border-box; }\n      .main .login-panel .form-panel .form-input:first-child {\n        margin-bottom: 20px; }\n        .main .login-panel .form-panel .form-input:first-child::before {\n          background-image: url(" + __webpack_require__(193) + "); }\n    .main .login-panel .form-panel .login-btn {\n      text-align: center; }\n      .main .login-panel .form-panel .login-btn a {\n        margin: 0 auto;\n        display: block;\n        width: 275px;\n        height: 44pxpx;\n        border-radius: 5px;\n        font-size: 14px;\n        text-align: center;\n        line-height: 44px;\n        color: white;\n        background-color: #419ce9;\n        cursor: pointer; }\n        .main .login-panel .form-panel .login-btn a:hover {\n          text-decoration: none; }\n    .main .login-panel .title {\n      background-image: url(" + __webpack_require__(175) + ");\n      background-size: 100%;\n      height: 52px;\n      width: 296px;\n      text-align: center;\n      margin: 52px auto;\n      background-repeat: no-repeat; }\n", ""]);

	// exports


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/bg.f25f7a1.jpg";

/***/ },
/* 192 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAZCAYAAADe1WXtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowM0JERDUyRTFBMENFNjExOTg3NjhFRjEzN0ZCQTRERCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTlEMkQ5QUMyN0ExMUU2QjY2NEVGMDM0NTExQzRCOCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTlEMkQ5OUMyN0ExMUU2QjY2NEVGMDM0NTExQzRCOCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyZTRlNDYyLTJjOWYtMmQ0ZC1iNDNhLTZjYzVkZTRkNDY2NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowM0JERDUyRTFBMENFNjExOTg3NjhFRjEzN0ZCQTRERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pni1bgMAAAG5SURBVHjarJVPKARRHMdn7MgWuUkWJe5aUlJMe1muymkvShFxEDk4cOGOHDhKbW5yZXMwc1jl5kShrJZiSTlgt9b4/uo39Rozs2/WfOvT+83Mm+/83p/fG9UwDMVHNWAExEEz+AJXgF7KUQdd1/+8pPkYToNV0OrxPA2mwLfzgeqR6T4Y5/gNHIMH0AD6wAA/y4Mksr2uZLoF5jneBCvg09FnDGyDGCiAdhgXxTkTNSgYzoFFF0PSIejhoTeBPedCiFrnNgt2FH+9gFGOU6ZptrmZ1oMhjpcVOZ2AG46H3Uw7QARY4EKR1yW3cTfTPLe0F4sBTI/AM8g492kC9AsfSoGSy5y7SeUt2Ih5pTnOkukBm9iK8r1qVdAEw3vwytlFAhpZ3HbTFiPTD0qdyzITNC2x9jH8WzRdlNUP36tTQpK4ELU+/dbAEyVDmVRYNKnVTfBp1cLFsREkUy+9O64fwzClipng+BQshWFqVw3pzOPUqso0xm2nTGdN0vQOzIJzWVOV45xPPzoHdiX8SrZplG9Mgl7hI1JCFYmX9BcoazzxVE0zYVUUmSbBAv8prX940QjLdPT9CjAA0nxd7rVLXO4AAAAASUVORK5CYII="

/***/ },
/* 193 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAZCAYAAADaILXQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowM0JERDUyRTFBMENFNjExOTg3NjhFRjEzN0ZCQTRERCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRTVFMzVDMkMyN0IxMUU2QjNCMzkzQjE1QkVGNTJDNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRTVFMzVDMUMyN0IxMUU2QjNCMzkzQjE1QkVGNTJDNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyZTRlNDYyLTJjOWYtMmQ0ZC1iNDNhLTZjYzVkZTRkNDY2NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowM0JERDUyRTFBMENFNjExOTg3NjhFRjEzN0ZCQTRERCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph1IWMMAAAIeSURBVHjarJVPSFRRFIefUy4qoyHCoBBp0agIgmC0yAYXEYIboSIV0U0IKU5RUTApCEokFiRYKxUsgtokKLhScCZ047RSFyVShGaSKIoRiFDfifPgMrx5f9QDH+fN3Hd/99x7zzkvK5FIWD6sDC5BESzCNEzJQDQazTjpsIfoNXgMpQ5jC9ANA5kmZ7lE/gzu6/MnGIMVOAVXoVzHXhN9YxDxGPTCNjTAsMM7V2AQ8qCHBR76EZfIfsEu5MMPl2M7At91ToQFFszBkMOEu+pveQiL/YEb+vwkfdBJvEWjHvKTRkQ7qTu9nkwmj7uJn4UwpKxgNq6+wE08R/1aQPEN9UfdxH+qLw4oXqR+1U18U3P6HJwIIF4B6/DF60LtW3/lR5VLfCopDZ1c7l8v8Q/wDergjoe2vPMIfkOfn1S0q0/shVbnxbTxEk3Vt/b7RL3rt3FJ58uFeahW5LK24BicMYroAsLzTiKZIo9AG5w0/jsN5w1hu/xjnHuZX/Gb8Fmb1yHo18gLtchkgSo9MjmKJphhgZhX42qGl3YrhQ746nKhspu4BiLWxRG1O0VeYQi3QqOH8P+iQUwyqkZ/t7GD+nRx8SP6/MAprTya13tcrf58wwJhU1xWl442Cs+tPRgLvDN23mWKx9XftvZn9+y7I/rskLZJ+ZLMwvJ+lIl+R7+10g4uh4xqTFkHY1PqK0MasVTfxwMSn4AlmPsnwAAAtoPekjVbbgAAAABJRU5ErkJggg=="

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _loading = __webpack_require__(195);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: {
			loading: _loading2.default
		},
		methods: {
			loginFun: function loginFun() {
				var _this = this;

				if (this.user.name == "test" && this.user.pwd == "test") {
					this.loadConfig.show = true;
					this.loadConfig.msg = "登录中...";
					setTimeout(function () {
						_this.$root.router.go({
							'path': '/main'
						});
					}, 500);
				} else {
					this.loadConfig.show = true;
					this.loadConfig.msg = "密码错误";
				}
			}
		},
		data: function data() {
			return {
				loadConfig: {
					show: false,
					msg: '密码错误'
				},
				user: {
					name: '',
					pwd: ''
				}
			};
		}
	};

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(196)
	__vue_script__ = __webpack_require__(198)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\web-base\\loading.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(199)
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
	  var id = "_v-4cd554b2/loading.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(197);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(48)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./loading.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./loading.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(38)();
	// imports


	// module
	exports.push([module.id, "\n\n\n\n.msg-ts {\n\tposition: fixed;\n\tz-index: 10;\n\tcolor: #fff;\n\tbackground-color: rgba(0, 0, 0, 0.48);\n\tmin-width: 120px;\n\tmin-height: 100px;\n\tborder-radius: 5px;\n\ttop: 50%;\n\tleft: 50%;\n\t-webkit-transform: translate(-50%, -50%);\n\t        transform: translate(-50%, -50%);\n\ttext-align: center;\n\tline-height: 100px;\n\tz-index: 99999;\n}\n", ""]);

	// exports


/***/ },
/* 198 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		props: {
			showMsg: {
				Boolean: Boolean,
				default: false
			},
			msg: {
				String: String,
				default: ''
			}
		},
		watch: {
			showMsg: function showMsg(v) {
				var _this = this;

				console.log(223333);
				if (v) {
					setTimeout(function () {
						_this.showMsg = false;
					}, 2000);
				}
			}
		}
	};

/***/ },
/* 199 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"msg-ts\" v-show=\"showMsg\">{{{msg}}}</div>\n";

/***/ },
/* 200 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"main\">\n\t<div class=\"login-panel\">\n\t\t<div class=\"title\">\n\n\t\t</div>\n\t\t<div class=\"form-panel\">\n\t\t\t<div class=\"form-input\">\n\t\t\t\t<input type=\"text\" v-model=\"user.name\" />\n\t\t\t</div>\n\t\t\t<div class=\"form-input\">\n\t\t\t\t<input type=\"password\" v-model=\"user.pwd\" />\n\t\t\t</div>\n\t\t\t<div class=\"login-btn\">\n\t\t\t\t<a @click=\"loginFun\">登录</a>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<loading :show-msg.sync=\"loadConfig.show\" :msg=\"loadConfig.msg\">\n\t</loading>\n\t<!--<snackbar :show.sync=\"loadConfig.show\" :message=\"loadConfig.msg\">\n\t\t\n\t</snackbar>-->\n</div>\n";

/***/ }
/******/ ]);