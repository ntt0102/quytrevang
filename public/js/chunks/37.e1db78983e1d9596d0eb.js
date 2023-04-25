(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _store_modules_Admin_Trades__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/modules/Admin/Trades */ "./resources/js/store/modules/Admin/Trades.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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


var DURATION = 200;
var INTERVAL = 4; // 4ms

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      interval: null,
      change: {},
      doneFlag: false,
      week: 0,
      month: 0,
      quarter: 0,
      year: 0,
      all: 0
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.trades", _store_modules_Admin_Trades__WEBPACK_IMPORTED_MODULE_1__["default"]);
  },
  created: function created() {
    this.getSummary();
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Admin.trades");
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.trades", ["summary"])),
  watch: {
    summary: function summary(value) {
      var _this = this;

      if (this.$mf.isSet(value)) {
        this.calculateChange();

        if (!this.interval) {
          this.interval = setInterval(function () {
            _this.animatedNumber("week");

            _this.animatedNumber("month");

            _this.animatedNumber("quarter");

            _this.animatedNumber("year");

            _this.animatedNumber("all");

            if (_this.doneFlag) {
              clearInterval(_this.interval);
              _this.interval = null;
            }
          }, INTERVAL);
        }
      }
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.trades", ["getSummary", "resetState"])), {}, {
    viewDetail: function viewDetail(period) {
      this.$router.push({
        name: "trades",
        query: {
          period: period
        }
      });
    },
    animatedNumber: function animatedNumber(type) {
      if (Math.abs(this[type]) < Math.abs(this.summary[type] - this.change[type])) {
        this[type] += this.change[type];
        this.doneFlag = false;
      } else {
        this[type] = this.summary[type];
        this.doneFlag = true;
      }
    },
    calculateChange: function calculateChange() {
      var counterTimes = DURATION / INTERVAL;
      this.change.week = this.summary.week / counterTimes;
      this.change.month = this.summary.month / counterTimes;
      this.change.quarter = this.summary.quarter / counterTimes;
      this.change.year = this.summary.year / counterTimes;
      this.change.all = this.summary.all / counterTimes;
    }
  })
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".overview-trading {\n  display: flex;\n  justify-content: space-between;\n}\n.overview-trading > div {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.overview-trading > div .period {\n  color: #b3b3b3;\n  padding-right: 10px;\n}\n.overview-trading > div .quality {\n  font-size: 20px;\n}\n.overview-trading > div .good {\n  color: lime;\n}\n.overview-trading > div .bad {\n  color: red;\n}\nbody[screen-size=small] .overview-trading > div {\n  flex-direction: column;\n}\nbody[screen-size=small] .overview-trading > div .period {\n  padding-right: 0;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TradeSummary.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "overview-trading dx-card responsive-paddings content-block"
    },
    [
      _c(
        "div",
        {
          on: {
            click: function($event) {
              return _vm.viewDetail(1)
            }
          }
        },
        [
          _c("div", { staticClass: "period" }, [
            _vm._v(_vm._s(_vm.$t("admin.trades.selects.period.week")))
          ]),
          _vm._v(" "),
          _vm.$mf.isSet(_vm.summary)
            ? _c(
                "div",
                {
                  class: "quality " + (_vm.summary.week >= 0 ? "good" : "bad")
                },
                [
                  _c("i", {
                    class:
                      "far fa-long-arrow-alt-" +
                      (_vm.summary.week >= 0 ? "up" : "down")
                  }),
                  _vm._v(
                    "\n      " +
                      _vm._s(_vm._f("numberVnFormat")(_vm.week, 1)) +
                      "%\n    "
                  )
                ]
              )
            : _c("div", [_vm._v("-")])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          on: {
            click: function($event) {
              return _vm.viewDetail(4)
            }
          }
        },
        [
          _c("div", { staticClass: "period" }, [
            _vm._v(_vm._s(_vm.$t("admin.trades.selects.period.month")))
          ]),
          _vm._v(" "),
          _vm.$mf.isSet(_vm.summary)
            ? _c(
                "div",
                {
                  class: "quality " + (_vm.summary.month >= 0 ? "good" : "bad")
                },
                [
                  _c("i", {
                    class:
                      "far fa-long-arrow-alt-" +
                      (_vm.summary.month >= 0 ? "up" : "down")
                  }),
                  _vm._v(
                    "\n      " +
                      _vm._s(_vm._f("numberVnFormat")(_vm.month, 1)) +
                      "%\n    "
                  )
                ]
              )
            : _c("div", [_vm._v("-")])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          on: {
            click: function($event) {
              return _vm.viewDetail(13)
            }
          }
        },
        [
          _c("div", { staticClass: "period" }, [
            _vm._v(
              "\n      " +
                _vm._s(_vm.$t("admin.trades.selects.period.quarter")) +
                "\n    "
            )
          ]),
          _vm._v(" "),
          _vm.$mf.isSet(_vm.summary)
            ? _c(
                "div",
                {
                  class:
                    "quality " + (_vm.summary.quarter >= 0 ? "good" : "bad")
                },
                [
                  _c("i", {
                    class:
                      "far fa-long-arrow-alt-" +
                      (_vm.summary.quarter >= 0 ? "up" : "down")
                  }),
                  _vm._v(
                    "\n      " +
                      _vm._s(_vm._f("numberVnFormat")(_vm.quarter, 1)) +
                      "%\n    "
                  )
                ]
              )
            : _c("div", [_vm._v("-")])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          on: {
            click: function($event) {
              return _vm.viewDetail(52)
            }
          }
        },
        [
          _c("div", { staticClass: "period" }, [
            _vm._v(_vm._s(_vm.$t("admin.trades.selects.period.year")))
          ]),
          _vm._v(" "),
          _vm.$mf.isSet(_vm.summary)
            ? _c(
                "div",
                {
                  class: "quality " + (_vm.summary.year >= 0 ? "good" : "bad")
                },
                [
                  _c("i", {
                    class:
                      "far fa-long-arrow-alt-" +
                      (_vm.summary.year >= 0 ? "up" : "down")
                  }),
                  _vm._v(
                    "\n      " +
                      _vm._s(_vm._f("numberVnFormat")(_vm.year, 1)) +
                      "%\n    "
                  )
                ]
              )
            : _c("div", [_vm._v("-")])
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          on: {
            click: function($event) {
              return _vm.viewDetail(52)
            }
          }
        },
        [
          _c("div", { staticClass: "period" }, [
            _vm._v(_vm._s(_vm.$t("admin.trades.selects.period.all")))
          ]),
          _vm._v(" "),
          _vm.$mf.isSet(_vm.summary)
            ? _c(
                "div",
                { class: "quality " + (_vm.summary.all >= 0 ? "good" : "bad") },
                [
                  _c("i", {
                    class:
                      "far fa-long-arrow-alt-" +
                      (_vm.summary.all >= 0 ? "up" : "down")
                  }),
                  _vm._v(
                    "\n      " +
                      _vm._s(_vm._f("numberVnFormat")(_vm.all, 1)) +
                      "%\n    "
                  )
                ]
              )
            : _c("div", [_vm._v("-")])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/store/modules/Admin/Trades.js":
/*!****************************************************!*\
  !*** ./resources/js/store/modules/Admin/Trades.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function initialState() {
  return {
    charts: {
      page: 0
    },
    trades: [],
    summary: {},
    updatedAt: null
  };
}

var getters = {
  charts: function charts(state) {
    return state.charts;
  },
  trades: function trades(state) {
    return state.trades;
  },
  summary: function summary(state) {
    return state.summary;
  },
  period: function period(state) {
    return state.charts.period;
  },
  page: function page(state) {
    return state.charts.page;
  }
};
var actions = {
  fetch: function fetch(_ref, param) {
    var commit = _ref.commit,
        dispatch = _ref.dispatch,
        getters = _ref.getters,
        state = _ref.state,
        rootGetters = _ref.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("trades").then(function (response) {
        // console.log(response.data);
        commit("setState", response.data);
        resolve();
      });
    });
  },
  getChart: function getChart(_ref2, period) {
    var commit = _ref2.commit,
        dispatch = _ref2.dispatch,
        getters = _ref2.getters,
        state = _ref2.state,
        rootGetters = _ref2.rootGetters;
    if (moment().diff(state.updatedAt, "seconds") < 3) return false;
    return new Promise(function (resolve, reject) {
      axios.get("trades/chart?period=".concat(period, "&page=1")).then(function (response) {
        // console.log(response.data);
        response.data.data = response.data.data.reduce(function (carry, item) {
          item.accumulatedProfit = item.profit + (!!carry.length ? carry.at(-1).accumulatedProfit : 0);
          carry.push(item);
          return carry;
        }, []);
        commit("setChart", response.data);
        resolve();
      });
    });
  },
  lazyLoad: function lazyLoad(_ref3) {
    var commit = _ref3.commit,
        dispatch = _ref3.dispatch,
        getters = _ref3.getters,
        state = _ref3.state,
        rootGetters = _ref3.rootGetters;
    var page = state.charts.page + 1;
    return new Promise(function (resolve, reject) {
      axios.get("trades/chart?period=".concat(state.charts.period, "&page=").concat(page)).then(function (response) {
        // console.log(response.data);
        if (response.data.page > state.charts.page) {
          var chartData = [].concat(_toConsumableArray(response.data.data), _toConsumableArray(JSON.parse(JSON.stringify(state.charts.data))));
          response.data.data = chartData.reduce(function (carry, item) {
            item.accumulatedProfit = item.profit + (!!carry.length ? carry.at(-1).accumulatedProfit : 0);
            carry.push(item);
            return carry;
          }, []);
          commit("setChart", response.data);
        }

        resolve();
      });
    });
  },
  save: function save(_ref4, param) {
    var commit = _ref4.commit,
        dispatch = _ref4.dispatch,
        getters = _ref4.getters,
        state = _ref4.state,
        rootGetters = _ref4.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("trades", {
        changes: param.changes
      }).then(function (response) {
        // console.log(response.data);
        resolve();
        dispatch("fetch");
        dispatch("getChart", state.charts.period);
      });
    });
  },
  getSummary: function getSummary(_ref5, param) {
    var commit = _ref5.commit,
        dispatch = _ref5.dispatch,
        getters = _ref5.getters,
        state = _ref5.state,
        rootGetters = _ref5.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("trades/summary").then(function (response) {
        // console.log(response.data);
        commit("setSummary", response.data);
        resolve();
      });
    });
  },
  getShare: function getShare(_ref6, param) {
    var commit = _ref6.commit,
        dispatch = _ref6.dispatch,
        getters = _ref6.getters,
        state = _ref6.state,
        rootGetters = _ref6.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("trades/share", param).then(function (response) {
        // console.log(response.data);
        resolve(response.data);
      });
    });
  },
  getVn30f1m: function getVn30f1m(_ref7) {
    var commit = _ref7.commit,
        dispatch = _ref7.dispatch,
        getters = _ref7.getters,
        state = _ref7.state,
        rootGetters = _ref7.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("trades/vn30f1m").then(function (response) {
        // console.log(response.data);
        resolve(response.data);
      });
    });
  },
  getFlow: function getFlow(_ref8) {
    var commit = _ref8.commit,
        dispatch = _ref8.dispatch,
        getters = _ref8.getters,
        state = _ref8.state,
        rootGetters = _ref8.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("trades/flow").then(function (response) {
        // console.log(response.data);
        resolve(response.data);
      });
    });
  },
  saveFlow: function saveFlow(_ref9, param) {
    var commit = _ref9.commit,
        dispatch = _ref9.dispatch,
        getters = _ref9.getters,
        state = _ref9.state,
        rootGetters = _ref9.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("trades/flow/save", {
        data: param
      }).then(function (response) {
        // console.log(response.data);
        resolve();
      });
    });
  },
  resetState: function resetState(_ref10) {
    var commit = _ref10.commit;
    commit("resetState");
  }
};
var mutations = {
  setState: function setState(state, data) {
    state.trades = data;
  },
  setChart: function setChart(state, data) {
    state.charts = data;
    state.updatedAt = moment();
  },
  setSummary: function setSummary(state, data) {
    state.summary = data;
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

/***/ "./resources/js/views/user/Overview/TradeSummary.vue":
/*!***********************************************************!*\
  !*** ./resources/js/views/user/Overview/TradeSummary.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TradeSummary_vue_vue_type_template_id_d6f8ed1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TradeSummary.vue?vue&type=template&id=d6f8ed1a& */ "./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a&");
/* harmony import */ var _TradeSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TradeSummary.vue?vue&type=script&lang=js& */ "./resources/js/views/user/Overview/TradeSummary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _TradeSummary_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TradeSummary.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TradeSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TradeSummary_vue_vue_type_template_id_d6f8ed1a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TradeSummary_vue_vue_type_template_id_d6f8ed1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/user/Overview/TradeSummary.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/user/Overview/TradeSummary.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/TradeSummary.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TradeSummary.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TradeSummary.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a&":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_template_id_d6f8ed1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TradeSummary.vue?vue&type=template&id=d6f8ed1a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_template_id_d6f8ed1a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_template_id_d6f8ed1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);