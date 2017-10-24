webpackJsonp([1],{

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(48)
	__vue_script__ = __webpack_require__(50)
	if (Object.keys(__vue_script__).some(function (key) { return key !== "default" && key !== "__esModule" })) {
	  console.warn("[vue-loader] components\\hotBox.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(51)
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
	  var id = "_v-2fd286f5/hotBox.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(49);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(45)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./hotBox.vue", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js!../node_modules/sass-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=style&index=0!./hotBox.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports


	// module
	exports.push([module.id, ".box {\n  height: 430px;\n  width: 290px;\n  box-sizing: border-box;\n  border-radius: 12px;\n  box-shadow: 10px 10px 15px #f1efef;\n  overflow: hidden; }\n  .box p {\n    padding: 0 10px; }\n  .box .image {\n    height: 290px;\n    background-position: bottom center;\n    margin-bottom: 20px; }\n  .box .name {\n    text-align: center;\n    font-size: 24px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    margin-bottom: 5px; }\n  .box .price {\n    font-size: 30px;\n    color: #f30000; }\n    .box .price span {\n      float: right;\n      margin-right: 10px;\n      color: #000;\n      font-size: 18px;\n      line-height: 41px; }\n", ""]);

	// exports


/***/ },

/***/ 50:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<div class="box">
	// 		<div class="image"></div>
	// 		<p class="name">{{product.name}}</p>
	// 		<p class="price">{{product.price}}<span>{{product.store}}</span></p>
	// 	</div> 
	// </template>
	// <script>
	exports.default = {
		props: {
			product: {
				type: Object
			}
		},
		attached: function attached() {
			this.$el.firstElementChild.style.backgroundImage = 'url(' + this.product.imgUrl + ')';
		}
	};
	// </script>
	// <style lang="scss" scope>
	// 	.box {
	// 		height: 430px;
	// 		width: 290px;
	// 		box-sizing: border-box;
	// 		border-radius: 12px;
	// 		box-shadow: 10px 10px 15px #f1efef;
	// 		overflow: hidden;
	// 		p {
	// 			padding: 0 10px;
	// 		}
	// 		.image {
	// 			height: 290px;
	// 			// background-image: url(../images/hotPicture/hotBox1.png);
	// 			background-position: bottom center;
	// 			margin-bottom: 20px;
	// 		}
	// 		.name {
	// 			text-align: center;
	// 			font-size: 24px;
	// 			white-space: nowrap;
	// 			overflow: hidden;
	// 			text-overflow: ellipsis;
	// 			margin-bottom: 5px;
	// 		}
	// 		.price {
	// 			font-size: 30px;
	// 			color: #f30000;
	// 			span {
	// 				float: right;
	// 				margin-right: 10px;
	// 				color: #000;
	// 				font-size: 18px;
	// 				line-height: 41px;
	// 			}
	// 		}
	// 	}
	// </style>

/***/ },

/***/ 51:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"box\">\n\t<div class=\"image\"></div>\n\t<p class=\"name\">{{product.name}}</p>\n\t<p class=\"price\">{{product.price}}<span>{{product.store}}</span></p>\n</div> \n";

/***/ }

});