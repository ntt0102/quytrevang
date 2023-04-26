(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[62],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Finbook.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Finbook.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_pie_chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/pie-chart */ "./node_modules/devextreme-vue/pie-chart.js");
/* harmony import */ var devextreme_vue_pie_chart__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_pie_chart__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Popups_TransactionFinbookPopup_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Popups/TransactionFinbookPopup.vue */ "./resources/js/components/Popups/TransactionFinbookPopup.vue");
/* harmony import */ var _store_modules_Admin_Finbooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store/modules/Admin/Finbooks */ "./resources/js/store/modules/Admin/Finbooks.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxPieChart: devextreme_vue_pie_chart__WEBPACK_IMPORTED_MODULE_1___default.a,
    TransactionFinbookPopup: _components_Popups_TransactionFinbookPopup_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      sum: 0
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.finbooks", _store_modules_Admin_Finbooks__WEBPACK_IMPORTED_MODULE_3__["default"]);
  },
  created: function created() {
    var _this = this;
    this.fetch();
    this.$bus.on("toggleMenu", function () {
      setTimeout(function () {
        return _this.pie.render();
      }, 300);
    });
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Admin.finbooks");
    this.$bus.off("toggleMenu");
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.finbooks", ["finbooks"])), {}, {
    pie: function pie() {
      return this.$refs.pie.instance;
    }
  }),
  watch: {
    finbooks: function finbooks() {
      var _this2 = this;
      this.sum = this.finbooks.reduce(function (accumulator, object) {
        return accumulator + object.balance;
      }, 0);
      setTimeout(function () {
        return _this2.pie.option("title.subtitle.text", "".concat(_this2.$t("user.overview.finbook.subtitle"), ": ").concat(_this2.$options.filters.currency(_this2.sum)));
      }, 0);
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.finbooks", ["fetch"])), {}, {
    pointClickHandler: function pointClickHandler(_ref) {
      var data = _ref.target.data;
      this.$refs.transactionFinbookPopup.show(data);
    },
    legendClickHandler: function legendClickHandler(e) {
      var arg = e.target;
      var item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];
      if (item.isVisible()) item.hide();else item.show();
    },
    toggleVisibility: function toggleVisibility(item) {
      item.isVisible() ? item.hide() : item.show();
    },
    customizeLabel: function customizeLabel(pointInfo) {
      return "".concat(this.$options.filters.currency(pointInfo.valueText), " (").concat((pointInfo.valueText / this.sum * 100).toFixed(1), "%)");
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Finbook.vue?vue&type=template&id=4cb6bf9a&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Finbook.vue?vue&type=template&id=4cb6bf9a& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "finbook-chart dx-card responsive-paddings content-block"
  }, [_c("DxPieChart", {
    ref: "pie",
    attrs: {
      "data-source": _vm.finbooks,
      "resolve-label-overlapping": "shift",
      palette: "Bright",
      title: {
        text: _vm.$t("user.overview.finbook.title"),
        subtitle: {
          text: null
        }
      },
      legend: {
        horizontalAlignment: _vm.$devices.phone ? "center" : "right",
        itemTextPosition: "right"
      },
      series: {
        argumentField: "name",
        valueField: "balance",
        label: {
          visible: true,
          customizeText: _vm.customizeLabel,
          connector: {
            visible: true,
            width: 1
          }
        }
      },
      size: {
        width: "100%",
        height: 450
      },
      "export": {
        enabled: false
      }
    },
    on: {
      "point-click": _vm.pointClickHandler,
      "legend-click": _vm.legendClickHandler
    }
  }), _vm._v(" "), _c("TransactionFinbookPopup", {
    ref: "transactionFinbookPopup"
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/views/user/Overview/Finbook.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/user/Overview/Finbook.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Finbook_vue_vue_type_template_id_4cb6bf9a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Finbook.vue?vue&type=template&id=4cb6bf9a& */ "./resources/js/views/user/Overview/Finbook.vue?vue&type=template&id=4cb6bf9a&");
/* harmony import */ var _Finbook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Finbook.vue?vue&type=script&lang=js& */ "./resources/js/views/user/Overview/Finbook.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Finbook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Finbook_vue_vue_type_template_id_4cb6bf9a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Finbook_vue_vue_type_template_id_4cb6bf9a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/user/Overview/Finbook.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/user/Overview/Finbook.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Finbook.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Finbook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Finbook.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Finbook.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Finbook_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/user/Overview/Finbook.vue?vue&type=template&id=4cb6bf9a&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Finbook.vue?vue&type=template&id=4cb6bf9a& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Finbook_vue_vue_type_template_id_4cb6bf9a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Finbook.vue?vue&type=template&id=4cb6bf9a& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Finbook.vue?vue&type=template&id=4cb6bf9a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Finbook_vue_vue_type_template_id_4cb6bf9a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Finbook_vue_vue_type_template_id_4cb6bf9a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);