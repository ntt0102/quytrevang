(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_Partials_AppFooter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Partials/AppFooter */ "./resources/js/components/Partials/AppFooter.vue");
/* harmony import */ var _Policy_Terms_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Policy/Terms.vue */ "./resources/js/views/Policy/Terms.vue");
/* harmony import */ var _Policy_Privacy_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Policy/Privacy.vue */ "./resources/js/views/Policy/Privacy.vue");
/* harmony import */ var _Policy_Faq_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Policy/Faq.vue */ "./resources/js/views/Policy/Faq.vue");
/* harmony import */ var _store_modules_Policy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store/modules/Policy */ "./resources/js/store/modules/Policy.js");
/* harmony import */ var devextreme_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! devextreme/ui/button */ "./node_modules/devextreme/esm/ui/button.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AppFooter: _components_Partials_AppFooter__WEBPACK_IMPORTED_MODULE_1__["default"],
    Terms: _Policy_Terms_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    Privacy: _Policy_Privacy_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    Faq: _Policy_Faq_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  data: function data() {
    return {
      activeBlock: null,
      prevScrollTop: 0,
      scrollElement: null
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Policy", _store_modules_Policy__WEBPACK_IMPORTED_MODULE_5__["default"]);
  },
  created: function created() {
    this.fetch();
  },
  mounted: function mounted() {
    this.$mf.removePreload();
    this.activeBlock = this.$route.hash || "#terms";
    this.scrollHandle(false);
    this.scrollElement = document.getElementById("scrollPolicy");
    this.prevScrollTop = this.scrollElement.scrollTop;
    this.scrollElement.addEventListener("scroll", this.onScroll);
    window.addEventListener("popstate", this.popstateHandler);
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Policy");
    this.scrollElement.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("popstate", this.popstateHandler);
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Policy", ["fetch", "resetState"])), {}, {
    onScroll: function onScroll(e) {
      var _this = this;
      var HEADER_OFFSET = 56;
      var viewportHeight = this.scrollElement.clientHeight;
      var currentScrollTop = this.scrollElement.scrollTop;
      var direction = currentScrollTop - this.prevScrollTop;
      document.querySelectorAll(".policy-page .scroll>section").forEach(function (el) {
        var position = el.getBoundingClientRect();
        if (direction > 0 && position.top > HEADER_OFFSET && position.top < 0.8 * viewportHeight + HEADER_OFFSET || direction < 0 && position.bottom > 0.2 * viewportHeight + HEADER_OFFSET && position.bottom < viewportHeight + HEADER_OFFSET) _this.activeBlock = "#".concat(el.id);
      });
      this.prevScrollTop = currentScrollTop;
    },
    scrollHandle: function scrollHandle() {
      var withSmooth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var options = {};
      if (withSmooth) options.behavior = "smooth";
      document.querySelector(this.activeBlock).scrollIntoView(options);
    },
    itemClick: function itemClick(hash) {
      this.activeBlock = hash;
      history.pushState(null, null, this.activeBlock);
      this.scrollHandle();
    },
    popstateHandler: function popstateHandler(e) {
      this.activeBlock = this.$route.hash;
      this.scrollHandle();
    },
    onContentReady: function onContentReady(e) {
      var buttonElement = e.element.querySelector(".dx-toolbar-menu-container .dx-dropdownmenu-button");
      var buttonInstance = devextreme_ui_button__WEBPACK_IMPORTED_MODULE_6__["default"].getInstance(buttonElement);
      buttonInstance.option("icon", "menu");
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Faq.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy/Faq.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxDataGrid: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxDataGrid"],
    DxColumn: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxColumn"]
  },
  data: function data() {
    return {
      selectedId: null,
      gridData: null,
      searchValue: null
    };
  },
  created: function created() {
    if (this.$route.query.search) this.searchValue = this.$route.query.search;
    if (!!this.faqs) this.cloneDeepData();
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Policy", ["faqs"])), {}, {
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    }
  }),
  watch: {
    faqs: function faqs() {
      var _this = this;
      this.cloneDeepData();
      this.selectedId = this.faqs.reduce(function (id, item) {
        return item.question == _this.searchValue ? item.id : id;
      }, 0);
    }
  },
  methods: {
    onItemClick: function onItemClick(e) {
      this.selectedId = this.selectedId != e.data.id ? e.data.id : null;
    },
    cloneDeepData: function cloneDeepData() {
      this.gridData = this.$mf.cloneDeep(this.faqs);
    },
    onRowPrepared: function onRowPrepared(e) {
      if (e.rowType == "header") e.rowElement.style.display = "none";
    },
    onClick: function onClick(e) {
      console.log(e);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Privacy.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy/Privacy.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_Popups_SendCommentPopup_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Popups/SendCommentPopup.vue */ "./resources/js/components/Popups/SendCommentPopup.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    SendCommentPopup: _components_Popups_SendCommentPopup_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {};
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Policy", ["interestRate"])),
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Terms.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy/Terms.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_Popups_SendCommentPopup_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Popups/SendCommentPopup.vue */ "./resources/js/components/Popups/SendCommentPopup.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    SendCommentPopup: _components_Popups_SendCommentPopup_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {};
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Policy", ["interestRate", "principalMin", "holdWeeksMin"])),
  methods: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy.vue?vue&type=template&id=15787611&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy.vue?vue&type=template&id=15787611& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _this = this;
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "policy-page"
  }, [_c("DxToolbar", {
    staticClass: "navbar",
    attrs: {
      items: [{
        location: "before",
        widget: "dxButton",
        cssClass: "logo",
        options: {
          type: "normal",
          icon: "../../images/android-chrome-512x512.png",
          text: _vm.$appName,
          onClick: function onClick() {
            return _this.$router.push({
              name: "overview"
            });
          }
        }
      }, {
        locateInMenu: "auto",
        location: "after",
        widget: "dxButton",
        options: {
          type: _vm.activeBlock == "#terms" ? "default" : "normal",
          text: _vm.$t("policy.terms.title"),
          onClick: function onClick() {
            return _vm.itemClick("#terms");
          }
        }
      }, {
        locateInMenu: "auto",
        location: "after",
        widget: "dxButton",
        options: {
          type: _vm.activeBlock == "#privacy" ? "default" : "normal",
          text: _vm.$t("policy.privacy.title"),
          onClick: function onClick() {
            return _vm.itemClick("#privacy");
          }
        }
      }, {
        locateInMenu: "auto",
        location: "after",
        widget: "dxButton",
        options: {
          type: _vm.activeBlock == "#faq" ? "default" : "normal",
          text: _vm.$t("policy.faq.title"),
          onClick: function onClick() {
            return _vm.itemClick("#faq");
          }
        }
      }]
    },
    on: {
      contentReady: _vm.onContentReady
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "scroll",
    attrs: {
      id: "scrollPolicy"
    }
  }, [_c("Terms", {
    attrs: {
      id: "terms"
    }
  }), _vm._v(" "), _c("Privacy", {
    attrs: {
      id: "privacy"
    }
  }), _vm._v(" "), _c("Faq", {
    attrs: {
      id: "faq"
    }
  }), _vm._v(" "), _c("AppFooter")], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Faq.vue?vue&type=template&id=7491f678&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy/Faq.vue?vue&type=template&id=7491f678& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("section", {
    staticClass: "faqs"
  }, [_c("h5", {
    staticClass: "uppercase center"
  }, [_c("b", [_vm._v(_vm._s(_vm.$t("policy.faq.title")))])]), _vm._v(" "), _c("DxDataGrid", {
    ref: "dataGrid",
    attrs: {
      "data-source": _vm.gridData,
      "show-borders": false,
      "column-auto-width": true,
      paging: {
        pageSize: 10
      },
      loadPanel: {
        enabled: true
      },
      searchPanel: {
        visible: true,
        text: _vm.searchValue
      },
      editing: {
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false
      }
    },
    on: {
      contentReady: function contentReady($event) {
        return _vm.$mf.dataGridPreload(_vm.gridData, _vm.dataGrid);
      },
      rowPrepared: _vm.onRowPrepared
    },
    scopedSlots: _vm._u([{
      key: "dataCellTemplate",
      fn: function fn(_ref) {
        var data = _ref.data;
        return [_c("div", {
          staticClass: "item"
        }, [_c("div", {
          staticClass: "question",
          on: {
            click: function click($event) {
              return _vm.onItemClick(data);
            }
          }
        }, [_vm._v("\n          " + _vm._s(data.data.question) + "\n        ")]), _vm._v(" "), _c("div", {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: data.data.id == _vm.selectedId,
            expression: "data.data.id == selectedId"
          }],
          staticClass: "answer",
          domProps: {
            innerHTML: _vm._s(data.data.answer)
          }
        })])];
      }
    }, {
      key: "groupCellTemplate",
      fn: function fn(_ref2) {
        var data = _ref2.data;
        return [_c("div", {
          on: {
            click: function click($event) {
              return _vm.onClick(data);
            }
          }
        }, [_vm._v(_vm._s(data.text))])];
      }
    }])
  }, [_c("DxColumn", {
    attrs: {
      "group-index": 0,
      "data-field": "topic",
      dataType: "string",
      groupCellTemplate: "groupCellTemplate"
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      dataType: "string",
      "cell-template": "dataCellTemplate"
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      "data-field": "question",
      dataType: "string",
      visible: false
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      "data-field": "answer",
      dataType: "string",
      visible: false
    }
  })], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Privacy.vue?vue&type=template&id=7fd910ea&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy/Privacy.vue?vue&type=template&id=7fd910ea& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("section", {
    staticClass: "privacy"
  }, [_c("h5", {
    staticClass: "uppercase center"
  }, [_c("b", [_vm._v(_vm._s(_vm.$t("policy.privacy.title")))])]), _vm._v(" "), _c("ul", {
    staticClass: "title"
  }, [_c("li", {
    staticClass: "short",
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v("Giới thiệu")]), _vm._v(" "), _c("ul", [_c("li", [_vm._v("\n        Chào mừng quý khách đến với kênh đầu tư " + _vm._s(_vm.$appName) + " (“" + _vm._s(_vm.$appName) + "”) qua giao diện website (“Trang " + _vm._s(_vm.$appName) + "”).\n        " + _vm._s(_vm.$appName) + " nghiêm túc thực hiện trách nhiệm của mình liên quan đến\n        bảo mật thông tin theo các quy định về bảo vệ bí mật thông tin cá nhân\n        của pháp luật Việt Nam (“Luật riêng tư”) và cam kết tôn trọng quyền\n        riêng tư và sự quan tâm của tất cả người dùng đối với hệ thống\n        " + _vm._s(_vm.$appName) + ' (“Hệ thống”). Chúng tôi nhận biết tầm quan trọng của dữ\n        liệu cá nhân mà quý khách đã tin tưởng giao cho chúng tôi và tin rằng\n        chúng tôi có trách nhiệm quản lý, bảo vệ và xử lý dữ liệu cá nhân của\n        quý khách một cách thích hợp. Chính sách bảo mật này ("Chính sách bảo\n        mật" hay "Chính sách") được thiết kế để giúp quý khách hiểu được cách\n        thức chúng tôi thu thập, sử dụng và/hoặc xử lý dữ liệu cá nhân mà quý\n        khách đã cung cấp cho chúng tôi và/hoặc lưu giữ về quý khách, cho dù\n        là hiện nay hoặc trong tương lai, cũng như để giúp quý khách đưa ra\n        quyết định sáng suốt trước khi cung cấp cho chúng tôi bất kỳ dữ liệu\n        cá nhân nào của quý khách.\n      ')]), _vm._v(" "), _c("li", [_vm._v('\n        "Dữ Liệu Cá Nhân" hay "dữ liệu cá nhân" có nghĩa là dữ liệu về một cá\n        nhân mà thông qua đó có thể xác định được danh tính, hoặc từ dữ liệu\n        đó và thông tin khác mà một cá nhân hay tổ chức có hoặc có khả năng\n        tiếp cận. Các ví dụ thường gặp về dữ liệu cá nhân có thể gồm có tên,\n        số chứng minh nhân dân và thông tin liên hệ.\n      ')]), _vm._v(" "), _c("li", [_vm._v("\n        Bằng việc sử dụng Dịch Vụ, đăng ký một tài khoản trên Trang\n        " + _vm._s(_vm.$appName) + ", quý khách xác nhận và đồng ý rằng quý khách chấp nhận\n        các phương pháp, yêu cầu, và/hoặc chính sách được mô tả trong Chính\n        sách bảo mật này, và theo đây quý khách đồng ý cho phép chúng tôi thu\n        thập, sử dụng và/hoặc xử lý dữ liệu cá nhân của quý khách như mô tả\n        trong đây. NẾU QUÝ KHÁCH KHÔNG ĐỒNG Ý CHO PHÉP XỬ LÝ DỮ LIỆU CÁ NHÂN\n        CỦA QUÝ KHÁCH NHƯ MÔ TẢ TRONG CHÍNH SÁCH NÀY, VUI LÒNG KHÔNG SỬ DỤNG\n        CÁC DỊCH VỤ CỦA CHÚNG TÔI HAY TRUY CẬP TRANG WEB CỦA CHÚNG TÔI.\n      ")])])]), _vm._v(" "), _c("ul", {
    staticClass: "title",
    style: {
      counterReset: "index 1"
    }
  }, [_c("li", {
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v("\n      Khi nào " + _vm._s(_vm.$appName) + " sẽ thu thập dữ liệu cá nhân?\n    ")]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c("ul", {
    staticClass: "title",
    style: {
      counterReset: "index 2"
    }
  }, [_c("li", {
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v(_vm._s(_vm.$appName) + " sẽ thu thập những dữ liệu gì?")]), _vm._v(" "), _c("ul", [_c("li", [_c("div", [_c("div", [_vm._v("\n            Dữ liệu cá nhân mà " + _vm._s(_vm.$appName) + " có thể thu thập bao gồm:\n          ")]), _vm._v(" "), _c("div", [_vm._v("a. họ và tên;")]), _vm._v(" "), _c("div", [_vm._v("b. giới tính;")]), _vm._v(" "), _c("div", [_vm._v("c. ngày sinh;")]), _vm._v(" "), _c("div", [_vm._v("d. địa chỉ liên lạc;")]), _vm._v(" "), _c("div", [_vm._v("e. số điện thoại;")]), _vm._v(" "), _c("div", [_vm._v("f. địa chỉ email;")]), _vm._v(" "), _c("div", [_vm._v("g. thông tin giấy tờ tùy thân (CCCD);")]), _vm._v(" "), _c("div", [_vm._v("h. tài khoản ngân hàng và thông tin thanh toán;")]), _vm._v(" "), _c("div", [_vm._v("\n            i. bất kỳ thông tin nào khác về người dùng khi người dùng đăng\n            nhập để sử dụng Dịch Vụ;\n          ")]), _vm._v(" "), _c("div", [_vm._v("j. dữ liệu tổng hợp về nội dung người dùng sử dụng.")])])]), _vm._v(" "), _c("li", [_vm._v("\n        Quý khách đồng ý không cung cấp cho chúng tôi bất cứ thông tin nào\n        không chính xác hoặc gây hiểu nhầm và quý khách đồng ý sẽ thông báo\n        cho chúng tôi về bất cứ thông tin nào không chính xác hoặc khi có sự\n        thay đổi thông tin.\n      ")])])]), _vm._v(" "), _c("ul", {
    staticClass: "title",
    style: {
      counterReset: "index 3"
    }
  }, [_c("li", {
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v("\n      Chúng tôi sử dụng thông tin quý khách cung cấp cho chúng tôi như thế\n      nào?\n    ")]), _vm._v(" "), _vm._m(1)]), _vm._v(" "), _c("ul", {
    staticClass: "title",
    style: {
      counterReset: "index 4"
    }
  }, [_c("li", {
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$appName) + " bảo vệ và lưu trữ thông tin khách hàng bằng cách nào?\n    ")]), _vm._v(" "), _vm._m(2)]), _vm._v(" "), _c("ul", {
    style: {
      counterReset: "index 5"
    }
  }, [_c("li", {
    attrs: {
      "data-suffix": "."
    }
  }, [_c("div", [_c("div", {
    staticClass: "title uppercase"
  }, [_vm._v("\n          Thắc mắc, quan ngại hoặc khiếu nại? Liên hệ với chúng tôi\n        ")]), _vm._v(" "), _c("div", [_vm._v("\n          Nếu quý khách có bất kỳ thắc mắc hoặc khiếu nại nào về các phương\n          pháp bảo vệ quyền riêng tư của chúng tôi vui lòng liên hệ với chúng\n          tôi\n          "), _c("span", {
    staticClass: "link",
    on: {
      click: function click($event) {
        return _vm.$refs.sendCommentPopup.show();
      }
    }
  }, [_vm._v("tại đây")]), _vm._v(".\n        ")])])])]), _vm._v(" "), _c("SendCommentPopup", {
    ref: "sendCommentPopup"
  })], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("ul", [_c("li", [_c("div", [_c("div", [_vm._v("\n            Chúng tôi sẽ/có thể thu thập dữ liệu cá nhân về quý khách:\n          ")]), _vm._v(" "), _c("div", [_vm._v("a. khi quý khách đăng ký mở một tài khoản với chúng tôi;")]), _vm._v(" "), _c("div", [_vm._v("\n            b. khi quý khách ký kết bất kỳ thỏa thuận nào hoặc cung cấp các\n            tài liệu hoặc thông tin khác liên quan đến tương tác giữa quý\n            khách với chúng tôi;\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            c. khi quý khách tương tác với chúng tôi, chẳng hạn như thông qua\n            các cuộc gọi điện thoại, tin nhắn, gặp gỡ trực tiếp, các nền ứng\n            dụng truyền thông xã hội và email;\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            d. khi quý khách thực hiện các giao dịch chuyển khoản với chúng\n            tôi;\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            e. khi quý khách cung cấp ý kiến phản hồi hoặc gửi khiếu nại cho\n            chúng tôi;\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            f. khi quý khách gửi dữ liệu cá nhân của quý khách cho chúng tôi\n            vì bất kỳ lý do gì.\n          ")])])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("ul", [_c("li", [_c("div", [_c("div", [_vm._v("\n            Chúng tôi có thể thu thập, sử dụng và/hoặc xử lý dữ liệu cá nhân\n            của quý khách cho các mục đích sau đây:\n          ")]), _vm._v(" "), _c("div", [_vm._v("a. để nhận dạng và/hoặc xác minh;")]), _vm._v(" "), _c("div", [_vm._v("\n            a. để đáp ứng các thủ tục pháp lý hoặc để tuân thủ theo quy định\n            của pháp luật hiện hành, và các yêu cầu của cơ quan nhà nước có\n            thẩm quyền;\n          ")]), _vm._v(" "), _c("div", [_vm._v("a. để cho phép chúng tôi liên lạc với quý khách;")]), _vm._v(" "), _c("div", [_vm._v("a. để quản lý, điều hành dịch vụ quý khách sử dụng;")]), _vm._v(" "), _c("div", [_vm._v("\n            a. để ngăn chặn hoặc điều tra bất kỳ hoạt động gian lận, phi pháp,\n            thiếu sót hay hành vi sai trái nào, cho dù đã diễn ra hay chưa, có\n            liên quan đến việc quý khách sử dụng Các Dịch Vụ của chúng tôi hay\n            không hay bất kỳ vấn đề nào phát sinh từ quan hệ của quý khách với\n            chúng tôi;\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            a. để lập số liệu thống kê và nghiên cứu đáp ứng yêu cầu báo cáo\n            và/hoặc duy trì sổ sách nội bộ;\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            a. để lưu trữ, lập máy chủ, sao lưu (cho dù là vì mục đích khôi\n            phục sau thảm họa hoặc mục đích khác) đối với dữ liệu cá nhân của\n            quý khách;\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            a. bất kỳ mục đích nào mà chúng tôi thông báo cho quý khách tại\n            thời điểm xin sự cho phép của quý khách.\n          ")]), _vm._v(" "), _c("div", [_vm._v("(gọi chung là “Các Mục Đích”).")])])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("ul", [_c("li", [_vm._v("\n        Chúng tôi thực hiện các biện pháp bảo mật khác nhau và luôn nỗ lực để\n        đảm bảo sự an toàn cho dữ liệu cá nhân của quý khách trên các hệ thống\n        của chúng tôi. Dữ liệu cá nhân của người dùng được lưu trữ đằng sau\n        các mạng bảo mật và chỉ có thể được truy cập bởi một số quản trị viên\n        có quyền truy cập đặc biệt đến các hệ thống của chúng tôi.\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        Chúng tôi sẽ duy trì dữ liệu cá nhân tuân theo các quy định của pháp\n        luật về bảo vệ bí mật thông tin cá nhân và/hoặc các điều luật hiện\n        hành khác. Có nghĩa là, chúng tôi sẽ hủy hoặc xóa thông tin nhận dạng\n        ra khỏi dữ liệu cá nhân của quý khách khi chúng tôi có lý do hợp lý để\n        xác định rằng (i) việc lưu giữ dữ liệu cá nhân đó không còn phục vụ\n        mục đích thu thập dữ liệu cá nhân đó nữa; (ii) việc lưu giữ không còn\n        cần thiết cho bất kỳ mục đích hợp pháp hay mục đích đầu tư nào và\n        (iii) không còn các lợi ích hợp pháp nào khác để tiếp tục lưu giữ các\n        dữ liệu cá nhân này. Nếu quý khách tạm thời ngưng sử dụng Dịch vụ của\n        chúng tôi, hoặc quyền của quý khách được sử dụng Dịch Vụ bị chấm dứt\n        hoặc hủy bỏ, chúng tôi có thể tiếp tục lưu, sử dụng dữ liệu cá nhân\n        của quý khách tuân theo Chính sách bảo mật này và các nghĩa vụ của\n        chúng tôi theo các quy định của pháp luật về bảo vệ bí mật thông tin\n        cá nhân. Tùy thuộc vào quy định của pháp luật, chúng tôi có thể tiêu\n        hủy dữ liệu cá nhân của quý khách một cách an toàn mà không cần thông\n        báo trước cho quý khách. Nếu quý khách yêu cầu xóa Tài khoản, chúng\n        tôi sẽ tiêu huỷ toàn bộ dữ liệu cá nhân của quý khách sau khi đã xác\n        nhận quý khách không còn sử dụng bất cứ Dịch vụ nào của chúng tôi nữa.\n      ")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Terms.vue?vue&type=template&id=19636c2e&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy/Terms.vue?vue&type=template&id=19636c2e& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("section", {
    staticClass: "terms"
  }, [_c("h5", {
    staticClass: "uppercase center"
  }, [_c("b", [_vm._v(_vm._s(_vm.$t("policy.terms.title")))])]), _vm._v(" "), _c("ul", {
    staticClass: "title"
  }, [_c("li", {
    staticClass: "short",
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v("Giới thiệu")]), _vm._v(" "), _c("ul", [_c("li", [_vm._v("\n        Chào mừng quý khách đến với kênh đầu tư " + _vm._s(_vm.$appName) + " (“" + _vm._s(_vm.$appName) + "”) qua giao diện website (“Trang " + _vm._s(_vm.$appName) + "”). Bất kỳ tính năng\n        mới nào được bổ sung hoặc mở rộng đối với (a) Dịch vụ được cung cấp\n        bởi Trang " + _vm._s(_vm.$appName) + " (“Dịch Vụ”) và (b) tất cả các thông tin,\n        đường dẫn, tính năng, dữ liệu, văn bản, hình ảnh, tin nhắn, tags, nội\n        dung hoặc các dịch vụ liên quan đến Trang " + _vm._s(_vm.$appName) + " (“Nội Dung”)\n        đều thuộc phạm vi điều chỉnh của Điều Khoản Dịch Vụ này.\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        Dịch Vụ bao gồm dịch vụ hợp tác đầu tư dưới dạng gửi tiền tiết kiệm\n        được thực hiện giữa những người có nhu cầu (“Người Sử Dụng”) với\n        " + _vm._s(_vm.$appName) + ".\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        Trước khi sử dụng Trang " + _vm._s(_vm.$appName) + " hoặc đăng ký tài khoản\n        " + _vm._s(_vm.$appName) + " (“Tài Khoản”), quý khách cần đọc kỹ và chấp nhận mọi\n        điều khoản và điều kiện được quy định trong và/hoặc dẫn chiếu đến Điều\n        Khoản Dịch Vụ này và Chính Sách Bảo Mật được dẫn chiếu theo đây để\n        hiểu rõ quyền lợi và nghĩa vụ hợp pháp của mình đối với\n        " + _vm._s(_vm.$appName) + ".\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        " + _vm._s(_vm.$appName) + " bảo lưu quyền thay đổi, chỉnh sửa, tạm ngưng hoặc chấm\n        dứt tất cả hoặc bất kỳ phần nào của Trang " + _vm._s(_vm.$appName) + " hoặc Dịch Vụ\n        vào bất cứ thời điểm nào theo quy định pháp luật. Phiên bản thử nghiệm\n        của Dịch Vụ hoặc tính năng của Dịch Vụ có thể không hoàn toàn giống\n        với phiên bản cuối cùng.\n      ")])])]), _vm._v(" "), _c("ul", {
    staticClass: "title",
    style: {
      counterReset: "index 1"
    }
  }, [_c("li", {
    staticClass: "short",
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v("Cách thức đầu tư")]), _vm._v(" "), _c("ul", [_c("li", [_vm._v("\n        Người Sử Dụng sẽ bàn giao tiền vốn bằng cách tạo Hợp đồng trên Trang\n        " + _vm._s(_vm.$appName) + " (Tiền vốn tối thiểu mỗi Hợp đồng là\n        " + _vm._s(_vm._f("currency")(_vm.principalMin)) + ") và chuyển khoản cho " + _vm._s(_vm.$appName) + ".\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        " + _vm._s(_vm.$appName) + " sẽ tiếp nhận tiền vốn từ Người Sử Dụng và thực hiện\n        việc đầu tư trên sàn Chứng khoán Việt Nam.\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        Khi Người Sử Dụng đóng Hợp đồng (Thời gian nắm giữ tối thiểu là\n        " + _vm._s(_vm.holdWeeksMin) + " tuần), " + _vm._s(_vm.$appName) + " sẽ ngừng thực hiện việc đầu\n        tư trên số vốn tại Điều khoản 2.1 và hoàn trả cả tiền vốn lẫn tiền lãi\n        cho Người Sử Dụng.\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        Mọi biên lai hoặc bằng chứng xác minh giao dịch tiền sẽ được đăng tải\n        trên trang web " + _vm._s(_vm.$appName) + " mà Người Sử Dụng có thể giám sát.\n      ")])])]), _vm._v(" "), _c("ul", {
    staticClass: "title",
    style: {
      counterReset: "index 2"
    }
  }, [_c("li", {
    staticClass: "short",
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v("Chia lãi từ hoạt động đầu tư")]), _vm._v(" "), _c("ul", [_c("li", [_c("div", [_c("div", {
    staticClass: "title"
  }, [_vm._v("Công thức tính lãi")]), _vm._v(" "), _c("div", {
    staticClass: "formula"
  }, [_c("img", {
    attrs: {
      src: __webpack_require__(/*! ../../../images/interest-formula.gif */ "./resources/images/interest-formula.gif"),
      alt: _vm.$appName
    }
  })]), _vm._v(" "), _c("div", [_vm._v("\n            trong đó, I: là tiền lãi, P: là tiền gốc, i: là lãi suất theo tuần\n            (" + _vm._s(_vm._f("percentInterestRate")(_vm.interestRate)) + "), n: là số tuần nắm giữ\n          ")])])]), _vm._v(" "), _c("li", [_c("div", [_c("div", {
    staticClass: "title"
  }, [_vm._v("Phân chia kết quả đầu tư")]), _vm._v(" "), _c("div", [_vm._v("\n            Người Sử Dụng sẽ luôn được chia tiền lãi căn cứ theo số vốn tại\n            Điều khoản 2.1 và được tính theo công thức tại Điều khoản 3.1.\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            " + _vm._s(_vm.$appName) + " sẽ nhận phần còn lại sau khi chia cho Người sử\n            dụng. Trong trường hợp kết quả đầu tư lỗ, " + _vm._s(_vm.$appName) + " sẽ chịu\n            hoàn toàn khoản lỗ đó.\n          ")])])])])]), _vm._v(" "), _c("ul", {
    staticClass: "title",
    style: {
      counterReset: "index 3"
    }
  }, [_c("li", {
    staticClass: "short",
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v("Phí và thanh toán")]), _vm._v(" "), _c("ul", [_c("li", [_vm._v("\n        Phí chuyển khoản do bên chuyển chi trả. Nội dung chuyển khoản theo cú\n        pháp: QTV <Mã hợp đồng>.\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        " + _vm._s(_vm.$appName) + " sẽ không yêu cầu Người Sử Dụng phải nộp bất kỳ khoản\n        phí nào trong quá trình đầu tư.\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        Ngày mở Hợp đồng được tính là ngày Người Sử Dụng chuyển khoản cho\n        " + _vm._s(_vm.$appName) + ".\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        Ngày đóng Hợp đồng được tính là ngày Người Sử Dụng gửi yêu cầu rút\n        tiền. " + _vm._s(_vm.$appName) + " sẽ chuyển khoản cho Người Sử Dụng trong vòng 24\n        giờ làm việc.\n      ")])])]), _vm._v(" "), _c("ul", {
    staticClass: "title",
    style: {
      counterReset: "index 4"
    }
  }, [_c("li", {
    staticClass: "short",
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v("Giới hạn quyền và nghĩa vụ")]), _vm._v(" "), _c("ul", [_vm._m(0), _vm._v(" "), _c("li", [_c("div", [_c("div", {
    staticClass: "title"
  }, [_vm._v("Quyền và nghĩa vụ của " + _vm._s(_vm.$appName))]), _vm._v(" "), _c("div", [_vm._v("\n            " + _vm._s(_vm.$appName) + " có quyền được tự do thực hiện việc đầu tư mà không\n            phải chịu sự giám sát của bất kỳ bên nào.\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            " + _vm._s(_vm.$appName) + " có nghĩa vụ bảo mật các thông tin của Người sử\n            dụng, nhanh chóng xử lý yêu cầu của Người Sử Dụng.\n          ")])])])])]), _vm._v(" "), _c("ul", {
    staticClass: "title",
    style: {
      counterReset: "index 5"
    }
  }, [_c("li", {
    staticClass: "short",
    attrs: {
      "data-suffix": "."
    }
  }, [_vm._v("Điều khoản chung")]), _vm._v(" "), _c("ul", [_c("li", [_vm._v("\n        Trong quá trình hợp tác đầu tư, nếu gặp vấn đề thì phải báo cho bên\n        kia để cùng nhau giải quyết.\n      ")]), _vm._v(" "), _c("li", [_vm._v("\n        Quý khách đồng ý tuân thủ mọi quy định pháp luật hiện hành liên quan\n        đến chống tham nhũng và chống hối lộ.\n      ")]), _vm._v(" "), _c("li", [_c("div", [_vm._v("\n          Nếu quý khách có bất kỳ câu hỏi hay thắc mắc nào liên quan đến Điều\n          Khoản Dịch Vụ hoặc các vấn đề phát sinh liên quan đến Điều Khoản\n          Dịch Vụ trên Trang " + _vm._s(_vm.$appName) + ", vui lòng liên hệ " + _vm._s(_vm.$appName) + "\n          "), _c("span", {
    staticClass: "link",
    on: {
      click: function click($event) {
        return _vm.$refs.sendCommentPopup.show();
      }
    }
  }, [_vm._v("tại đây")]), _vm._v(".\n        ")])])])]), _vm._v(" "), _c("div", {
    staticClass: "confirm"
  }, [_vm._v("\n    Tôi đã đọc các điều khoản dịch vụ này và đồng ý với tất cả các điều khoản\n    như trên cũng như bất kỳ điều khoản nào được chỉnh sửa sau này. bằng cách\n    bấm nút “đăng ký”, tôi hiểu rằng tôi đang tạo chữ ký điện tử mà nó có giá\n    trị và hiệu lực tương tự như chữ ký tôi ký bằng tay.\n  ")]), _vm._v(" "), _c("SendCommentPopup", {
    ref: "sendCommentPopup"
  })], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("li", [_c("div", [_c("div", {
    staticClass: "title"
  }, [_vm._v("Quyền và nghĩa vụ của Người Sử Dụng")]), _vm._v(" "), _c("div", [_vm._v("\n            Người Sử Dụng có quyền được tùy chọn thời điểm kết thúc Hợp đồng.\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            Người Sử Dụng không có quyền giám sát các hoạt động đầu tư.\n          ")]), _vm._v(" "), _c("div", [_vm._v("\n            Người Sử Dụng có nghĩa vụ chuyển khoản đúng số tiền trong Hợp đồng\n            đã tạo.\n          ")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy.vue?vue&type=style&index=0&id=15787611&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy.vue?vue&type=style&index=0&id=15787611&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".policy-page {\n  width: 100vw;\n  height: 100vh;\n}\n.policy-page .navbar {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n  background-color: #2f2f38;\n}\n.policy-page .scroll {\n  position: absolute;\n  top: 56px;\n  left: 0;\n  height: calc(100vh - 56px);\n  width: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.policy-page .scroll::-webkit-scrollbar {\n  width: 10px;\n}\n.policy-page .scroll::-webkit-scrollbar-thumb {\n  border-radius: 10px;\n  background-color: #464653;\n}\n.policy-page .scroll::-webkit-scrollbar-track {\n  border-radius: 10px;\n  background-color: #5e5e6f;\n}\n.policy-page .scroll section {\n  padding: 5rem 5rem;\n  line-height: 25px;\n  text-align: justify;\n  font-size: 16px;\n  font-family: \"B Koodak\", \"X Koodak\", Koodak, Arial;\n}\n.policy-page .scroll section:nth-child(even) {\n  background-color: #42424e;\n  color: #fff;\n}\n.policy-page .scroll section:nth-child(odd) {\n  background-color: #4d4d5c;\n}\n.policy-page .scroll section#faq {\n  background: #363640;\n}\n.policy-page .scroll section ul {\n  counter-reset: index;\n  padding: 0;\n}\n.policy-page .scroll section ul.title > li {\n  font-weight: bold;\n  text-transform: uppercase;\n  margin-bottom: 15px;\n  text-align: left;\n}\n.policy-page .scroll section ul.title > li.short {\n  height: 20px;\n}\n.policy-page .scroll section ul li {\n  counter-increment: index;\n  display: flex;\n  margin-bottom: 10px;\n}\n.policy-page .scroll section ul li::before {\n  content: attr(data-prefix) counters(index, \".\") attr(data-suffix);\n  text-align: left;\n  min-width: 30px;\n}\n.policy-page .scroll section ul li div.title {\n  font-weight: bold;\n  text-align: left;\n}\n.policy-page .scroll section ul li div.title.uppercase {\n  text-transform: uppercase;\n}\nbody[screen-size=small] .policy-page .scroll::-webkit-scrollbar {\n  width: 0px;\n}\nbody[screen-size=small] .policy-page .scroll section {\n  padding: 3rem 1rem;\n}", ""]);

// exports
exports.locals = {
	"baseAccent": "#ff5722"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy/Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".faqs {\n  min-height: 500px;\n}\n.faqs .dx-toolbar-item-content > .dx-texteditor {\n  width: 100%;\n  margin-left: 0px;\n}\n.faqs .item {\n  white-space: pre-line;\n}\n.faqs .item .question {\n  font-weight: bold;\n  cursor: pointer;\n  margin-top: -20px;\n}\n.faqs .item .answer {\n  padding-top: 20px;\n  color: #b3b3b3;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy/Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".terms .formula {\n  text-align: center;\n}\n.terms .formula img {\n  background: white;\n  padding: 10px;\n}\n.terms .confirm {\n  text-transform: uppercase;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy.vue?vue&type=style&index=0&id=15787611&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy.vue?vue&type=style&index=0&id=15787611&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./Policy.vue?vue&type=style&index=0&id=15787611&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy.vue?vue&type=style&index=0&id=15787611&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy/Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Policy/Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./resources/images/interest-formula.gif":
/*!***********************************************!*\
  !*** ./resources/images/interest-formula.gif ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/images/interest-formula.gif?8febabcb8f5e7b47e3a108e04e61b967";

/***/ }),

/***/ "./resources/js/store/modules/Policy.js":
/*!**********************************************!*\
  !*** ./resources/js/store/modules/Policy.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function initialState() {
  return {
    data: {},
    isLoaded: false
  };
}
var getters = {
  interestRate: function interestRate(state) {
    return state.data.interestRate;
  },
  principalMin: function principalMin(state) {
    return state.data.principalMin;
  },
  holdWeeksMin: function holdWeeksMin(state) {
    return state.data.holdWeeksMin;
  },
  faqs: function faqs(state) {
    return state.data.faqs;
  }
};
var actions = {
  fetch: function fetch(_ref, param) {
    var commit = _ref.commit,
      dispatch = _ref.dispatch,
      getters = _ref.getters,
      state = _ref.state,
      rootGetters = _ref.rootGetters;
    if (state.isLoaded) return Promise.resolve(true);
    return new Promise(function (resolve, reject) {
      axios.get("policy-params").then(function (response) {
        commit("setState", response.data);
        resolve(response.data);
      });
    });
  },
  resetState: function resetState(_ref2) {
    var commit = _ref2.commit;
    commit("resetState");
  }
};
var mutations = {
  setState: function setState(state, data) {
    state.data = data;
    state.isLoaded = true;
  },
  resetState: function resetState(state) {
    state = Object.assign(state, initialState());
  }
};
/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state: initialState,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),

/***/ "./resources/js/views/Policy.vue":
/*!***************************************!*\
  !*** ./resources/js/views/Policy.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Policy_vue_vue_type_template_id_15787611___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Policy.vue?vue&type=template&id=15787611& */ "./resources/js/views/Policy.vue?vue&type=template&id=15787611&");
/* harmony import */ var _Policy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Policy.vue?vue&type=script&lang=js& */ "./resources/js/views/Policy.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Policy_vue_vue_type_style_index_0_id_15787611_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Policy.vue?vue&type=style&index=0&id=15787611&lang=scss& */ "./resources/js/views/Policy.vue?vue&type=style&index=0&id=15787611&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Policy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Policy_vue_vue_type_template_id_15787611___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Policy_vue_vue_type_template_id_15787611___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Policy.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Policy.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./resources/js/views/Policy.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Policy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Policy.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Policy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Policy.vue?vue&type=style&index=0&id=15787611&lang=scss&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/Policy.vue?vue&type=style&index=0&id=15787611&lang=scss& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Policy_vue_vue_type_style_index_0_id_15787611_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--7-2!../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/lib??vue-loader-options!./Policy.vue?vue&type=style&index=0&id=15787611&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy.vue?vue&type=style&index=0&id=15787611&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Policy_vue_vue_type_style_index_0_id_15787611_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Policy_vue_vue_type_style_index_0_id_15787611_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Policy_vue_vue_type_style_index_0_id_15787611_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Policy_vue_vue_type_style_index_0_id_15787611_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/Policy.vue?vue&type=template&id=15787611&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Policy.vue?vue&type=template&id=15787611& ***!
  \**********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Policy_vue_vue_type_template_id_15787611___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/vue-loader/lib??vue-loader-options!./Policy.vue?vue&type=template&id=15787611& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy.vue?vue&type=template&id=15787611&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Policy_vue_vue_type_template_id_15787611___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Policy_vue_vue_type_template_id_15787611___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Policy/Faq.vue":
/*!*******************************************!*\
  !*** ./resources/js/views/Policy/Faq.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Faq_vue_vue_type_template_id_7491f678___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Faq.vue?vue&type=template&id=7491f678& */ "./resources/js/views/Policy/Faq.vue?vue&type=template&id=7491f678&");
/* harmony import */ var _Faq_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Faq.vue?vue&type=script&lang=js& */ "./resources/js/views/Policy/Faq.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Faq_vue_vue_type_style_index_0_id_7491f678_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss& */ "./resources/js/views/Policy/Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Faq_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Faq_vue_vue_type_template_id_7491f678___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Faq_vue_vue_type_template_id_7491f678___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Policy/Faq.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Policy/Faq.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./resources/js/views/Policy/Faq.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Faq.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Faq.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Policy/Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/Policy/Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_style_index_0_id_7491f678_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Faq.vue?vue&type=style&index=0&id=7491f678&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_style_index_0_id_7491f678_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_style_index_0_id_7491f678_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_style_index_0_id_7491f678_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_style_index_0_id_7491f678_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/Policy/Faq.vue?vue&type=template&id=7491f678&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/Policy/Faq.vue?vue&type=template&id=7491f678& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_template_id_7491f678___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./Faq.vue?vue&type=template&id=7491f678& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Faq.vue?vue&type=template&id=7491f678&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_template_id_7491f678___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Faq_vue_vue_type_template_id_7491f678___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Policy/Privacy.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/Policy/Privacy.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Privacy_vue_vue_type_template_id_7fd910ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Privacy.vue?vue&type=template&id=7fd910ea& */ "./resources/js/views/Policy/Privacy.vue?vue&type=template&id=7fd910ea&");
/* harmony import */ var _Privacy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Privacy.vue?vue&type=script&lang=js& */ "./resources/js/views/Policy/Privacy.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Privacy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Privacy_vue_vue_type_template_id_7fd910ea___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Privacy_vue_vue_type_template_id_7fd910ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Policy/Privacy.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Policy/Privacy.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/Policy/Privacy.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Privacy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Privacy.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Privacy.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Privacy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Policy/Privacy.vue?vue&type=template&id=7fd910ea&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/Policy/Privacy.vue?vue&type=template&id=7fd910ea& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Privacy_vue_vue_type_template_id_7fd910ea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./Privacy.vue?vue&type=template&id=7fd910ea& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Privacy.vue?vue&type=template&id=7fd910ea&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Privacy_vue_vue_type_template_id_7fd910ea___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Privacy_vue_vue_type_template_id_7fd910ea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/Policy/Terms.vue":
/*!*********************************************!*\
  !*** ./resources/js/views/Policy/Terms.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Terms_vue_vue_type_template_id_19636c2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Terms.vue?vue&type=template&id=19636c2e& */ "./resources/js/views/Policy/Terms.vue?vue&type=template&id=19636c2e&");
/* harmony import */ var _Terms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Terms.vue?vue&type=script&lang=js& */ "./resources/js/views/Policy/Terms.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Terms_vue_vue_type_style_index_0_id_19636c2e_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss& */ "./resources/js/views/Policy/Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Terms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Terms_vue_vue_type_template_id_19636c2e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Terms_vue_vue_type_template_id_19636c2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Policy/Terms.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Policy/Terms.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Policy/Terms.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Terms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Terms.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Terms.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Terms_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Policy/Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/Policy/Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Terms_vue_vue_type_style_index_0_id_19636c2e_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Terms.vue?vue&type=style&index=0&id=19636c2e&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Terms_vue_vue_type_style_index_0_id_19636c2e_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Terms_vue_vue_type_style_index_0_id_19636c2e_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Terms_vue_vue_type_style_index_0_id_19636c2e_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Terms_vue_vue_type_style_index_0_id_19636c2e_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/Policy/Terms.vue?vue&type=template&id=19636c2e&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/Policy/Terms.vue?vue&type=template&id=19636c2e& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Terms_vue_vue_type_template_id_19636c2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./Terms.vue?vue&type=template&id=19636c2e& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Policy/Terms.vue?vue&type=template&id=19636c2e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Terms_vue_vue_type_template_id_19636c2e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Terms_vue_vue_type_template_id_19636c2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);