(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/form */ "./node_modules/devextreme-vue/form.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxForm: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1___default.a,
    DxItem: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__["DxItem"]
  },
  data: function data() {
    return {};
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Auth", ["email"])), {}, {
    popup: function popup() {
      return this.$refs.popup.instance;
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Auth", ["resendEmail"])), {}, {
    show: function show() {
      var _this = this;
      this.popup.show();
      this.$mf.pushPopupToHistoryState(function () {
        return _this.popup.hide();
      });
    },
    onSubmit: function onSubmit() {
      var _this2 = this;
      this.resendEmail().then(function () {
        _this2.popup.hide();
      });
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Contracts.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Contracts.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Popups_ContractDetailPopup_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Popups/ContractDetailPopup.vue */ "./resources/js/components/Popups/ContractDetailPopup.vue");
/* harmony import */ var _store_modules_User_Contract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store/modules/User/Contract */ "./resources/js/store/modules/User/Contract.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var DURATION = 100;
var INTERVAL = 4; // 4ms

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxDataGrid: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxDataGrid"],
    DxColumn: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxColumn"],
    ContractDetailPopup: _components_Popups_ContractDetailPopup_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      gridData: null,
      sum: {},
      interval: {},
      change: {},
      doneFlag: false,
      asset: null,
      principal: null,
      interest: null
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("User.contract", _store_modules_User_Contract__WEBPACK_IMPORTED_MODULE_3__["default"]);
  },
  created: function created() {
    var _this = this;
    this.fetch(false).then(function () {
      _this.gridData = _this.contracts;
      _this.calculateSummary();
    });
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("User.contract");
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("User.contract", ["contracts"])), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Auth", ["level"])), {}, {
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("User.contract", ["fetch", "resetState"])), {}, {
    onRowPrepared: function onRowPrepared(e) {
      if (e.rowType == "header") e.rowElement.style.display = "none";
    },
    getStatusClass: function getStatusClass(status) {
      return "status-".concat(status);
    },
    calculateSummary: function calculateSummary() {
      var _this2 = this;
      this.sum = this.gridData.reduce(function (sum, contract) {
        if ([2, 3].includes(contract.status)) {
          sum.principal += contract.principal;
          sum.interest += contract.interest;
          sum.asset += contract.total;
        }
        return sum;
      }, {
        principal: 0,
        interest: 0,
        asset: 0
      });
      this.calculateChange();
      this.interval = setInterval(function () {
        _this2.animatedNumber("principal");
        _this2.animatedNumber("interest");
        _this2.animatedNumber("asset");
        if (_this2.doneFlag) clearInterval(_this2.interval);
      }, INTERVAL);
    },
    calculateChange: function calculateChange() {
      var counterTimes = DURATION / INTERVAL;
      this.change = {
        principal: this.sum.principal / counterTimes,
        interest: this.sum.interest / counterTimes,
        asset: this.sum.asset / counterTimes
      };
    },
    animatedNumber: function animatedNumber(type) {
      if (this[type] < this.sum[type] - this.change[type]) {
        this[type] += this.change[type];
        this.doneFlag = false;
      } else {
        this[type] = this.sum[type];
        this.doneFlag = true;
      }
    }
  })
});

/***/ }),

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
/* harmony import */ var _store_modules_Trading_Finbooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store/modules/Trading/Finbooks */ "./resources/js/store/modules/Trading/Finbooks.js");
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
    this.$store.registerModule("Trading.finbooks", _store_modules_Trading_Finbooks__WEBPACK_IMPORTED_MODULE_3__["default"]);
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
    this.$store.unregisterModule("Trading.finbooks");
    this.$bus.off("toggleMenu");
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Trading.finbooks", ["finbooks"])), {}, {
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
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Trading.finbooks", ["fetch"])), {}, {
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Index.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _MonthTrade_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MonthTrade.vue */ "./resources/js/views/user/Overview/MonthTrade.vue");
/* harmony import */ var _TradeSummary_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TradeSummary.vue */ "./resources/js/views/user/Overview/TradeSummary.vue");
/* harmony import */ var _Finbook_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Finbook.vue */ "./resources/js/views/user/Overview/Finbook.vue");
/* harmony import */ var _Summary_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Summary.vue */ "./resources/js/views/user/Overview/Summary.vue");
/* harmony import */ var _LevelBar_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LevelBar.vue */ "./resources/js/views/user/Overview/LevelBar.vue");
/* harmony import */ var _Contracts_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Contracts.vue */ "./resources/js/views/user/Overview/Contracts.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    MonthTrade: _MonthTrade_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    TradeSummary: _TradeSummary_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    Finbook: _Finbook_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    Summary: _Summary_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    LevelBar: _LevelBar_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    Contracts: _Contracts_vue__WEBPACK_IMPORTED_MODULE_6__["default"]
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Auth", ["level", "permissions"]))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/LevelBar.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/LevelBar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_ui_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme/ui/dialog */ "./node_modules/devextreme/esm/ui/dialog.js");
/* harmony import */ var _components_Popups_ResendVerifyEmailPopup_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Popups/ResendVerifyEmailPopup.vue */ "./resources/js/components/Popups/ResendVerifyEmailPopup.vue");
/* harmony import */ var _Profile_EditProfilePopup_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Profile/EditProfilePopup.vue */ "./resources/js/views/user/Profile/EditProfilePopup.vue");
/* harmony import */ var _Profile_ChangePinPopup_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Profile/ChangePinPopup.vue */ "./resources/js/views/user/Profile/ChangePinPopup.vue");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ResendVerifyEmailPopup: _components_Popups_ResendVerifyEmailPopup_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    EditProfilePopup: _Profile_EditProfilePopup_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    ChangePinPopup: _Profile_ChangePinPopup_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Auth", ["level"])),
  methods: {
    onLevelClick: function onLevelClick(nextLevel) {
      switch (nextLevel) {
        case 2:
          this.$refs.resendVerifyEmailPopup.show();
          break;
        case 3:
          this.$refs.changePinPopup.show();
          break;
        case 4:
          this.$refs.editProfilePopup.show();
          break;
        case 5:
          Object(devextreme_ui_dialog__WEBPACK_IMPORTED_MODULE_1__["alert"])(this.$t("user.overview.signContractGuide"), this.$t("user.overview.levels.signContract"));
          break;
        case 6:
          this.$router.push({
            name: "contract",
            query: {
              redirect: this.$router.currentRoute.name
            }
          });
          break;
        default:
          break;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/chart */ "./node_modules/devextreme-vue/chart.js");
/* harmony import */ var devextreme_vue_chart__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_chart__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_modules_User_Trade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/modules/User/Trade */ "./resources/js/store/modules/User/Trade.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxChart: devextreme_vue_chart__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {};
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("User.trade", _store_modules_User_Trade__WEBPACK_IMPORTED_MODULE_2__["default"]);
  },
  created: function created() {
    var _this = this;
    this.getMonthChart();
    this.$bus.on("toggleMenu", function () {
      setTimeout(function () {
        return _this.chart.render();
      }, 300);
    });
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("User.trade");
    this.$bus.off("toggleMenu");
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("User.trade", ["charts", "copyRate"])), {}, {
    chart: function chart() {
      return this.$refs.chart.instance;
    }
  }),
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("User.trade", ["getMonthChart"]))
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Summary.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Summary.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_modules_Admin_Contracts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/modules/Admin/Contracts */ "./resources/js/store/modules/Admin/Contracts.js");
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
      gridData: null
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.contracts", _store_modules_Admin_Contracts__WEBPACK_IMPORTED_MODULE_2__["default"]);
  },
  created: function created() {
    var _this = this;
    this.getSummary().then(function (summary) {
      return _this.gridData = summary;
    });
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Admin.contracts");
  },
  computed: {
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.contracts", ["getSummary"])), {}, {
    onCellDblClick: function onCellDblClick(e) {
      if (e.rowType == "data") {
        if (e.columnIndex == 0) this.$router.push({
          name: "users",
          query: {
            code: e.data.code
          }
        });else this.$router.push({
          name: "contracts",
          query: {
            userCode: e.data.code
          }
        });
      }
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _store_modules_Trading_Trades__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../store/modules/Trading/Trades */ "./resources/js/store/modules/Trading/Trades.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var DURATION = 200;
var INTERVAL = 4; // 4ms

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},
  data: function data() {
    return {
      interval: null,
      change: {},
      doneFlag: false,
      day: 0,
      week: 0,
      month: 0,
      quarter: 0,
      year: 0,
      all: 0
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Trading.trades", _store_modules_Trading_Trades__WEBPACK_IMPORTED_MODULE_1__["default"]);
  },
  created: function created() {
    this.getSummary();
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Trading.trades");
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Trading.trades", ["summary"])),
  watch: {
    summary: function summary(value) {
      var _this = this;
      if (this.$mf.isSet(value)) {
        this.calculateChange();
        if (!this.interval) {
          this.interval = setInterval(function () {
            _this.animatedNumber("day");
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
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Trading.trades", ["getSummary", "resetState"])), {}, {
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
      this.change.day = this.summary.day / counterTimes;
      this.change.week = this.summary.week / counterTimes;
      this.change.month = this.summary.month / counterTimes;
      this.change.quarter = this.summary.quarter / counterTimes;
      this.change.year = this.summary.year / counterTimes;
      this.change.all = this.summary.all / counterTimes;
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=template&id=3e8cd09e&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=template&id=3e8cd09e& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("DxPopup", {
    ref: "popup",
    attrs: {
      width: 300,
      height: 270,
      showCloseButton: true,
      title: _vm.$t("components.resendVerifyEmail.title"),
      "show-title": true
    },
    on: {
      hiding: _vm.$mf.popRouteHistoryState
    },
    scopedSlots: _vm._u([{
      key: "content",
      fn: function fn() {
        return [_c("form", {
          staticClass: "resend-email-form",
          on: {
            submit: function submit($event) {
              $event.preventDefault();
              return _vm.onSubmit.apply(null, arguments);
            }
          }
        }, [_c("div", {
          staticClass: "description"
        }, [_vm._v("\n          " + _vm._s(_vm.$t("components.resendVerifyEmail.description").format(_vm.email)) + "\n        ")]), _vm._v(" "), _c("DxForm", [_c("DxItem", {
          attrs: {
            "item-type": "button",
            "button-options": {
              width: "100%",
              type: "default",
              text: _vm.$t("components.resendVerifyEmail.resend"),
              useSubmitBehavior: true
            }
          }
        })], 1)], 1)];
      },
      proxy: true
    }])
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Contracts.vue?vue&type=template&id=713c1c20&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Contracts.vue?vue&type=template&id=713c1c20& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "overview-contracts"
  }, [_c("div", {
    staticClass: "sum dx-card responsive-paddings content-block"
  }, [_c("div", [_c("div", {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t("user.overview.assetSum")))]), _vm._v(" "), _vm.asset != null ? _c("div", {
    staticClass: "currency"
  }, [_vm._v("\n        " + _vm._s(_vm._f("currency")(_vm.asset.toFixed(0))) + "\n      ")]) : _c("div", [_vm._v("-")])]), _vm._v(" "), _c("div", [_c("div", {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t("user.overview.principalSum")))]), _vm._v(" "), _vm.principal != null ? _c("div", {
    staticClass: "currency"
  }, [_vm._v("\n        " + _vm._s(_vm._f("currency")(_vm.principal.toFixed(0))) + "\n      ")]) : _c("div", [_vm._v("-")])]), _vm._v(" "), _c("div", [_c("div", {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t("user.overview.interestSum")))]), _vm._v(" "), _vm.interest != null ? _c("div", {
    staticClass: "currency interest"
  }, [_vm._v("\n        " + _vm._s(_vm._f("currency")(_vm.interest.toFixed(0), "+ ")) + "\n      ")]) : _c("div", [_vm._v("-")])])]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.level >= 6,
      expression: "level >= 6"
    }],
    staticClass: "list content-block"
  }, [_c("DxDataGrid", {
    ref: "dataGrid",
    attrs: {
      "data-source": _vm.gridData,
      "key-expr": "id",
      "show-borders": false,
      "column-auto-width": true,
      "allow-column-reordering": true,
      "allow-column-resizing": true,
      "column-resizing-mode": "widget",
      paging: {
        pageSize: 10
      },
      headerFilter: {
        visible: true
      },
      loadPanel: {
        enabled: true
      },
      editing: {
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false
      },
      "data-row-template": "dataRowTemplate"
    },
    on: {
      contentReady: function contentReady($event) {
        return _vm.$mf.dataGridPreload(_vm.gridData, _vm.dataGrid);
      },
      rowPrepared: _vm.onRowPrepared
    },
    scopedSlots: _vm._u([{
      key: "dataRowTemplate",
      fn: function fn(_ref) {
        var rowInfo = _ref.data;
        return [_c("tr", {
          staticClass: "item",
          attrs: {
            role: "cell"
          },
          on: {
            click: function click($event) {
              return _vm.$refs.contractDetailPopup.show(rowInfo.data);
            }
          }
        }, [_c("td", [_c("div", {
          staticClass: "responsive-paddings",
          staticStyle: {
            position: "relative"
          }
        }, [_c("div", {
          "class": ["status", _vm.getStatusClass(rowInfo.data.status)]
        }), _vm._v(" "), _c("div", {
          staticClass: "info"
        }, [_c("div", [_c("span", [_vm._v("#" + _vm._s(rowInfo.data.code))]), _vm._v(" "), _c("span", {
          staticClass: "interest-rate"
        }, [_vm._v("\n                    " + _vm._s(_vm._f("percentInterestRate")(rowInfo.data.interest_rate)) + "\n                  ")])]), _vm._v(" "), _c("div", {
          staticClass: "date"
        }, [_c("div", [_vm._v("\n                    " + _vm._s(_vm._f("formatDate")(rowInfo.data.paid_at)) + " ~\n                    " + _vm._s(_vm._f("formatDate")(rowInfo.data.withdrawn_at)) + "\n                     \n                  ")]), _vm._v(" "), _c("div", [_vm._v("(" + _vm._s(rowInfo.data.duration) + ")")])])]), _vm._v(" "), _c("div", {
          staticClass: "currency"
        }, [_c("div", {
          staticClass: "principal"
        }, [_vm._v("\n                  " + _vm._s(_vm._f("currency")(rowInfo.data.principal)) + "\n                ")]), _vm._v(" "), _c("div", {
          staticClass: "interest"
        }, [_vm._v("\n                  " + _vm._s(_vm._f("currency")(rowInfo.data.interest, "+ ")) + "\n                ")])])])])])];
      }
    }])
  }, [_c("DxColumn")], 1)], 1), _vm._v(" "), _c("ContractDetailPopup", {
    ref: "contractDetailPopup"
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Index.vue?vue&type=template&id=3c877e51&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Index.vue?vue&type=template&id=3c877e51& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "overview-page"
  }, [_c("h2", {
    staticClass: "content-block"
  }, [_vm._v("\n        " + _vm._s(_vm.$t("user.overview.title")) + "\n    ")]), _vm._v(" "), _vm.permissions.includes("trades@view") ? _c("TradeSummary") : _vm._e(), _vm._v(" "), _vm.level < 6 ? _c("LevelBar") : _vm._e(), _vm._v(" "), _vm.level > 1 ? _c("MonthTrade") : _vm._e(), _vm._v(" "), _vm.permissions.includes("finbooks@control") ? _c("Finbook") : _vm._e(), _vm._v(" "), _vm.permissions.includes("contracts@control") ? _c("Summary") : _vm._e(), _vm._v(" "), _vm.level >= 6 ? _c("Contracts") : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/LevelBar.vue?vue&type=template&id=031073c0&":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/LevelBar.vue?vue&type=template&id=031073c0& ***!
  \**************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "level-bar content-block"
  }, [_c("center", [_c("ul", {
    style: {
      counterReset: "levelNumber 0"
    }
  }, _vm._l(_vm.$mf.getAccountLevelList(), function (item) {
    return _c("li", {
      key: item.level,
      "class": {
        "is-active": item.level == _vm.level + 1,
        "guiding-step-1": item.level == 2,
        "guiding-step-2": item.level == 3,
        "guiding-step-3": item.level == 4
      },
      on: {
        click: function click($event) {
          item.level == _vm.level + 1 ? _vm.onLevelClick(item.level) : null;
        }
      }
    }, [_vm._v("\n                " + _vm._s(item.text) + "\n            ")]);
  }), 0)]), _vm._v(" "), _c("ResendVerifyEmailPopup", {
    ref: "resendVerifyEmailPopup"
  }), _vm._v(" "), _c("EditProfilePopup", {
    ref: "editProfilePopup"
  }), _vm._v(" "), _c("ChangePinPopup", {
    ref: "changePinPopup"
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=template&id=edfbc856&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=template&id=edfbc856& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "overview-week-trade dx-card responsive-paddings content-block"
  }, [_c("DxChart", {
    ref: "chart",
    attrs: {
      "data-source": _vm.charts,
      title: {
        text: _vm.$t("user.overview.monthTrade.title"),
        subtitle: {
          text: _vm.$t("user.overview.monthTrade.subtitle").replace("{copy}", _vm.copyRate)
        },
        horizontalAlignment: "center"
      },
      size: {
        width: "100%",
        height: 300
      },
      series: [{
        valueField: "accumulatedProfit",
        argumentField: "time",
        type: "spline",
        color: "lime"
      }],
      valueAxis: [{
        name: "accumulatedProfit",
        synchronizedValue: 0,
        label: {
          visible: false
        },
        tick: {
          visible: false
        },
        visible: false
      }],
      legend: {
        visible: false
      }
    }
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Summary.vue?vue&type=template&id=3f2fd536&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Summary.vue?vue&type=template&id=3f2fd536& ***!
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
    staticClass: "overview-summary content-block"
  }, [_c("DxDataGrid", {
    ref: "dataGrid",
    attrs: {
      "data-source": _vm.gridData,
      "key-expr": "code",
      "show-borders": false,
      "column-auto-width": true,
      "allow-column-reordering": true,
      "allow-column-resizing": true,
      "column-resizing-mode": "widget",
      paging: {
        pageSize: 10
      },
      headerFilter: {
        visible: true
      },
      loadPanel: {
        enabled: true
      },
      summary: {
        texts: {
          count: "{0} " + _vm.$t("user.overview.userName").toLowerCase(),
          sum: "{0}"
        },
        totalItems: [{
          column: "name",
          summaryType: "count"
        }, {
          column: "principal",
          summaryType: "sum",
          valueFormat: "#,##0 ₫"
        }]
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
      cellDblClick: _vm.onCellDblClick
    }
  }, [_c("DxColumn", {
    attrs: {
      "data-field": "name",
      "data-type": "string",
      "header-filter": {
        allowSearch: true
      },
      caption: _vm.$t("user.overview.userName")
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      "data-field": "principal",
      "data-type": "number",
      format: "#,##0 ₫",
      "header-filter": {
        allowSearch: true
      },
      caption: _vm.$t("user.overview.asset")
    }
  })], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "overview-trading dx-card responsive-paddings content-block"
  }, [_c("div", {
    on: {
      click: function click($event) {
        return _vm.viewDetail("day");
      }
    }
  }, [_c("div", {
    staticClass: "period"
  }, [_vm._v("\n            " + _vm._s(_vm.$t("trading.trades.selects.period.day")) + "\n        ")]), _vm._v(" "), _vm.$mf.isSet(_vm.summary) ? _c("div", {
    "class": "quality ".concat(_vm.summary.day >= 0 ? "good" : "bad")
  }, [!_vm.$devices.phone ? _c("i", {
    "class": "far fa-long-arrow-alt-".concat(_vm.summary.day >= 0 ? "up" : "down")
  }) : _vm._e(), _vm._v("\n            " + _vm._s(_vm._f("numberVnFormat")(_vm.day, 1)) + "%\n        ")]) : _c("div", [_vm._v("-")])]), _vm._v(" "), _c("div", {
    on: {
      click: function click($event) {
        return _vm.viewDetail("week");
      }
    }
  }, [_c("div", {
    staticClass: "period"
  }, [_vm._v("\n            " + _vm._s(_vm.$t("trading.trades.selects.period.week")) + "\n        ")]), _vm._v(" "), _vm.$mf.isSet(_vm.summary) ? _c("div", {
    "class": "quality ".concat(_vm.summary.week >= 0 ? "good" : "bad")
  }, [!_vm.$devices.phone ? _c("i", {
    "class": "far fa-long-arrow-alt-".concat(_vm.summary.week >= 0 ? "up" : "down")
  }) : _vm._e(), _vm._v("\n            " + _vm._s(_vm._f("numberVnFormat")(_vm.week, 1)) + "%\n        ")]) : _c("div", [_vm._v("-")])]), _vm._v(" "), _c("div", {
    on: {
      click: function click($event) {
        return _vm.viewDetail("month");
      }
    }
  }, [_c("div", {
    staticClass: "period"
  }, [_vm._v("\n            " + _vm._s(_vm.$t("trading.trades.selects.period.month")) + "\n        ")]), _vm._v(" "), _vm.$mf.isSet(_vm.summary) ? _c("div", {
    "class": "quality ".concat(_vm.summary.month >= 0 ? "good" : "bad")
  }, [!_vm.$devices.phone ? _c("i", {
    "class": "far fa-long-arrow-alt-".concat(_vm.summary.month >= 0 ? "up" : "down")
  }) : _vm._e(), _vm._v("\n            " + _vm._s(_vm._f("numberVnFormat")(_vm.month, 0)) + "%\n        ")]) : _c("div", [_vm._v("-")])]), _vm._v(" "), _c("div", {
    on: {
      click: function click($event) {
        return _vm.viewDetail("quater");
      }
    }
  }, [_c("div", {
    staticClass: "period"
  }, [_vm._v("\n            " + _vm._s(_vm.$t("trading.trades.selects.period.quarter")) + "\n        ")]), _vm._v(" "), _vm.$mf.isSet(_vm.summary) ? _c("div", {
    "class": "quality ".concat(_vm.summary.quarter >= 0 ? "good" : "bad")
  }, [!_vm.$devices.phone ? _c("i", {
    "class": "far fa-long-arrow-alt-".concat(_vm.summary.quarter >= 0 ? "up" : "down")
  }) : _vm._e(), _vm._v("\n            " + _vm._s(_vm._f("numberVnFormat")(_vm.quarter, 0)) + "%\n        ")]) : _c("div", [_vm._v("-")])]), _vm._v(" "), _c("div", {
    on: {
      click: function click($event) {
        return _vm.viewDetail("year");
      }
    }
  }, [_c("div", {
    staticClass: "period"
  }, [_vm._v("\n            " + _vm._s(_vm.$t("trading.trades.selects.period.year")) + "\n        ")]), _vm._v(" "), _vm.$mf.isSet(_vm.summary) ? _c("div", {
    "class": "quality ".concat(_vm.summary.year >= 0 ? "good" : "bad")
  }, [!_vm.$devices.phone ? _c("i", {
    "class": "far fa-long-arrow-alt-".concat(_vm.summary.year >= 0 ? "up" : "down")
  }) : _vm._e(), _vm._v("\n            " + _vm._s(_vm._f("numberVnFormat")(_vm.year, 0)) + "%\n        ")]) : _c("div", [_vm._v("-")])]), _vm._v(" "), _c("div", {
    on: {
      click: function click($event) {
        return _vm.viewDetail("year");
      }
    }
  }, [_c("div", {
    staticClass: "period"
  }, [_vm._v("\n            " + _vm._s(_vm.$t("trading.trades.selects.period.all")) + "\n        ")]), _vm._v(" "), _vm.$mf.isSet(_vm.summary) ? _c("div", {
    "class": "quality ".concat(_vm.summary.all >= 0 ? "good" : "bad")
  }, [!_vm.$devices.phone ? _c("i", {
    "class": "far fa-long-arrow-alt-".concat(_vm.summary.all >= 0 ? "up" : "down")
  }) : _vm._e(), _vm._v("\n            " + _vm._s(_vm._f("numberVnFormat")(_vm.all, 0)) + "%\n        ")]) : _c("div", [_vm._v("-")])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".description {\n  margin-bottom: 30px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".overview-contracts .sum {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n}\n.overview-contracts .sum > div {\n  text-align: center;\n  display: flex;\n  align-items: center;\n}\n.overview-contracts .sum > div .title {\n  margin-right: 10px;\n  color: #b3b3b3;\n}\n.overview-contracts .sum .currency {\n  font-size: 20px;\n}\n.overview-contracts .sum .currency.interest {\n  color: lime;\n}\n.overview-contracts .list .dx-datagrid-headers {\n  border-bottom: none;\n}\n.overview-contracts .list .item {\n  position: relative;\n}\n.overview-contracts .list .item td {\n  padding: 0;\n  cursor: pointer;\n  border-bottom: 5px #2a2a32 solid;\n}\n.overview-contracts .list .item .responsive-paddings {\n  padding: 10px 15px 10px 25px;\n}\n.overview-contracts .list .status {\n  position: absolute;\n  top: 8px;\n  bottom: 12px;\n  left: 8px;\n  width: 5px;\n  border-radius: 2px;\n}\n.overview-contracts .list .status.status-0, .overview-contracts .list .status.status-1 {\n  background: #adadad;\n}\n.overview-contracts .list .status.status-2 {\n  background: #86c285;\n}\n.overview-contracts .list .status.status-3 {\n  background: #edc578;\n}\n.overview-contracts .list .status.status-4 {\n  background: #ef7d59;\n}\n.overview-contracts .list .info {\n  display: flex;\n  justify-content: space-between;\n  color: #b3b3b3;\n}\n.overview-contracts .list .info .interest-rate {\n  margin-left: 20px;\n}\n.overview-contracts .list .info .date {\n  display: flex;\n  flex-wrap: wrap;\n}\n.overview-contracts .list .currency {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  margin-top: 10px;\n}\n.overview-contracts .list .currency > div:first-child {\n  margin-right: auto;\n}\n.overview-contracts .list .currency .interest {\n  color: lime;\n  font-size: 20px;\n}\n.overview-contracts .list .currency .principal {\n  font-size: 20px;\n  color: white;\n}\nbody[screen-size=small] .overview-contracts .sum > div {\n  width: 100%;\n  justify-content: space-between;\n}\nbody[screen-size=small] .overview-contracts .list .info {\n  flex-direction: column;\n}", ""]);

// exports
exports.locals = {
	"baseAccent": "#ff5722"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".overview-page .content-block:not(:last-child) {\n  margin-bottom: 20px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n.level-bar {\n  text-align: center;\n}\n.level-bar ul > li.is-active ~ li:before, .level-bar ul > li.is-active:before {\n  content: counter(levelNumber);\n  font-family: inherit;\n  font-weight: 700;\n}\n.level-bar ul > li.is-active ~ li:after, .level-bar ul > li.is-active:after {\n  background-color: #ededed;\n}\n.level-bar ul {\n  display: table;\n  table-layout: fixed;\n  list-style: none;\n  width: 100%;\n  margin-left: -40px;\n}\n.level-bar ul > li {\n  counter-increment: levelNumber;\n  text-align: center;\n  display: table-cell;\n  position: relative;\n  color: #ff5722;\n  cursor: pointer;\n}\n.level-bar ul > li:before {\n  content: \"\\2713\";\n  display: block;\n  margin: 0 auto 4px;\n  background-color: #ff5722;\n  color: #fff;\n  font-weight: bold;\n  width: 36px;\n  height: 36px;\n  line-height: 32px;\n  text-align: center;\n  font-weight: bold;\n  border-width: 3px;\n  border-style: solid;\n  border-color: #ff5722;\n  border-radius: 50%;\n}\n.level-bar ul > li:after {\n  content: \"\";\n  height: 5px;\n  width: calc(100% - 36px);\n  background-color: #ff5722;\n  position: absolute;\n  top: 16px;\n  left: calc(50% + 18px);\n}\n.level-bar ul > li:last-child:after {\n  display: none;\n}\n.level-bar ul > li.is-active:before {\n  background-color: #fff;\n  color: #ff5722;\n  border-color: #ff5722;\n}\n.level-bar ul > li.is-active:hover:before {\n  background-color: #ff5722;\n  color: #fff;\n}\n.level-bar ul > li.is-active ~ li {\n  color: #666666;\n}\n.level-bar ul > li.is-active ~ li:before {\n  color: #999999;\n  background-color: #ededed;\n  border-color: #ededed;\n}\nbody[screen-size=small] .level-bar ul {\n  width: 180px;\n  margin-left: 0px;\n}\nbody[screen-size=small] .level-bar ul > li {\n  display: list-item !important;\n  text-align: left !important;\n  margin-left: -40px;\n}\nbody[screen-size=small] .level-bar ul > li:not(:last-child) {\n  padding-bottom: 22px;\n}\nbody[screen-size=small] .level-bar ul > li:before {\n  display: inline-block;\n  margin-right: 20px;\n}\nbody[screen-size=small] .level-bar ul > li:after {\n  width: 5px;\n  height: calc(100% - 36px);\n  left: 16px;\n  top: calc(50% + 5px);\n}", ""]);

// exports
exports.locals = {
	"baseAccent": "#ff5722"
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".overview-week-trade {\n  min-height: 180px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".overview-summary {\n  margin-bottom: 20px;\n}\n.overview-summary .dx-datagrid-headers .dx-datagrid-table .dx-row > td {\n  font-size: 13px;\n}\n.overview-summary .dx-datagrid .dx-row > td {\n  font-size: 16px;\n}\n.overview-summary .dx-datagrid-rowsview .dx-row > td {\n  cursor: pointer;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".overview-trading {\n  display: flex;\n  justify-content: space-between;\n}\n.overview-trading > div {\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n}\n.overview-trading > div .period {\n  color: #b3b3b3;\n  padding-right: 10px;\n}\n.overview-trading > div .quality {\n  font-size: 20px;\n}\n.overview-trading > div .good {\n  color: lime;\n}\n.overview-trading > div .bad {\n  color: red;\n}\nbody[screen-size=small] .overview-trading > div {\n  flex-direction: column;\n}\nbody[screen-size=small] .overview-trading > div .period {\n  padding-right: 0;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss&");

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

/***/ "./resources/js/components/Popups/ResendVerifyEmailPopup.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Popups/ResendVerifyEmailPopup.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ResendVerifyEmailPopup_vue_vue_type_template_id_3e8cd09e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResendVerifyEmailPopup.vue?vue&type=template&id=3e8cd09e& */ "./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=template&id=3e8cd09e&");
/* harmony import */ var _ResendVerifyEmailPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResendVerifyEmailPopup.vue?vue&type=script&lang=js& */ "./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ResendVerifyEmailPopup_vue_vue_type_style_index_0_id_3e8cd09e_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss& */ "./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ResendVerifyEmailPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ResendVerifyEmailPopup_vue_vue_type_template_id_3e8cd09e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ResendVerifyEmailPopup_vue_vue_type_template_id_3e8cd09e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Popups/ResendVerifyEmailPopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResendVerifyEmailPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ResendVerifyEmailPopup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResendVerifyEmailPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ResendVerifyEmailPopup_vue_vue_type_style_index_0_id_3e8cd09e_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=style&index=0&id=3e8cd09e&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ResendVerifyEmailPopup_vue_vue_type_style_index_0_id_3e8cd09e_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ResendVerifyEmailPopup_vue_vue_type_style_index_0_id_3e8cd09e_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ResendVerifyEmailPopup_vue_vue_type_style_index_0_id_3e8cd09e_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ResendVerifyEmailPopup_vue_vue_type_style_index_0_id_3e8cd09e_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=template&id=3e8cd09e&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=template&id=3e8cd09e& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ResendVerifyEmailPopup_vue_vue_type_template_id_3e8cd09e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./ResendVerifyEmailPopup.vue?vue&type=template&id=3e8cd09e& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ResendVerifyEmailPopup.vue?vue&type=template&id=3e8cd09e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ResendVerifyEmailPopup_vue_vue_type_template_id_3e8cd09e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ResendVerifyEmailPopup_vue_vue_type_template_id_3e8cd09e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/store/modules/Admin/Contracts.js":
/*!*******************************************************!*\
  !*** ./resources/js/store/modules/Admin/Contracts.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function initialState() {
  return {
    contracts: [],
    users: [],
    interestRate: 0,
    principalMin: 0,
    isOld: false,
    updatedAt: null
  };
}
var getters = {
  contracts: function contracts(state) {
    return state.contracts;
  },
  users: function users(state) {
    return state.users;
  },
  interestRate: function interestRate(state) {
    return state.interestRate;
  },
  principalMin: function principalMin(state) {
    return state.principalMin;
  }
};
var actions = {
  fetch: function fetch(_ref, isOld) {
    var commit = _ref.commit,
      dispatch = _ref.dispatch,
      getters = _ref.getters,
      state = _ref.state,
      rootGetters = _ref.rootGetters;
    if (moment().diff(state.updatedAt, "seconds") < 3) return false;
    if (isOld == undefined) isOld = state.isOld;
    return new Promise(function (resolve, reject) {
      axios.get("contracts?isOld=" + isOld).then(function (response) {
        // console.log(response.data);
        response.data.isOld = isOld;
        commit("setState", response.data);
        resolve();
      });
    });
  },
  save: function save(_ref2, param) {
    var commit = _ref2.commit,
      dispatch = _ref2.dispatch,
      getters = _ref2.getters,
      state = _ref2.state,
      rootGetters = _ref2.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("contracts", param).then(function (response) {
        // console.log(response.data);
        resolve();
        if (response.data.isOk) {
          dispatch("fetch", state.isOld);
          dispatch("User.layout/initLayout", ["contracts"], {
            root: true
          });
          // dispatch("Auth/fetch", true, { root: true });
        }
      });
    });
  },
  paidContract: function paidContract(_ref3, param) {
    var commit = _ref3.commit,
      dispatch = _ref3.dispatch,
      getters = _ref3.getters,
      state = _ref3.state,
      rootGetters = _ref3.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("contracts/paid", param, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function (response) {
        // console.log(response.data);
        resolve(response.data.isOk);
        if (response.data.isOk) {
          dispatch("fetch", state.isOld);
          dispatch("User.layout/initLayout", ["contracts"], {
            root: true
          });
        }
      });
    });
  },
  withdrawnContract: function withdrawnContract(_ref4, param) {
    var commit = _ref4.commit,
      dispatch = _ref4.dispatch,
      getters = _ref4.getters,
      state = _ref4.state,
      rootGetters = _ref4.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("contracts/withdrawn", param, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function (response) {
        // console.log(response.data);
        resolve(response.data.isOk);
        if (response.data.isOk) {
          dispatch("fetch", state.isOld);
          dispatch("User.layout/initLayout", ["contracts"], {
            root: true
          });
        }
      });
    });
  },
  getSummary: function getSummary(_ref5) {
    var commit = _ref5.commit,
      dispatch = _ref5.dispatch,
      getters = _ref5.getters,
      state = _ref5.state,
      rootGetters = _ref5.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("contracts/summary").then(function (response) {
        // console.log(response.data);
        resolve(response.data);
      });
    });
  },
  getReceiptInfo: function getReceiptInfo(_ref6, userCode) {
    var commit = _ref6.commit,
      dispatch = _ref6.dispatch,
      getters = _ref6.getters,
      state = _ref6.state,
      rootGetters = _ref6.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("contracts/receipt-info?userCode=".concat(userCode), {
        noLoading: true
      }).then(function (response) {
        console.log(response.data);
        resolve(response.data);
      });
    });
  },
  resetState: function resetState(_ref7) {
    var commit = _ref7.commit;
    commit("resetState");
  }
};
var mutations = {
  setState: function setState(state, data) {
    state.contracts = data.contracts;
    state.users = data.users;
    state.interestRate = data.interestRate;
    state.principalMin = data.principalMin;
    state.isOld = data.isOld;
    state.updatedAt = moment();
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

/***/ "./resources/js/store/modules/Trading/Trades.js":
/*!******************************************************!*\
  !*** ./resources/js/store/modules/Trading/Trades.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
function createAccumulatedProfit(data) {
  return data.reduce(function (carry, item) {
    item.accumulatedProfit = item.profit + (!!carry.length ? carry.at(-1).accumulatedProfit : 0);
    carry.push(item);
    return carry;
  }, []);
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
      axios.get("trades", {
        crypto: true
      }).then(function (response) {
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
    // if (moment().diff(state.updatedAt, "seconds") < 3) return false;
    return new Promise(function (resolve, reject) {
      axios.post("trades/chart", {
        period: period,
        page: 1
      }, {
        crypto: true
      }).then(function (response) {
        response.data.data = createAccumulatedProfit(response.data.data);
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
    return new Promise(function (resolve, reject) {
      axios.post("trades/chart", {
        period: state.charts.period,
        page: state.charts.page + 1
      }, {
        crypto: true
      }).then(function (response) {
        if (response.data.page > state.charts.page) {
          var chartData = [].concat(_toConsumableArray(response.data.data), _toConsumableArray(JSON.parse(JSON.stringify(state.charts.data))));
          response.data.data = createAccumulatedProfit(chartData);
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
      }, {
        crypto: true
      }).then(function (response) {
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
      axios.get("trades/summary", {
        crypto: true
      }).then(function (response) {
        commit("setSummary", response.data);
        resolve();
      });
    });
  },
  resetState: function resetState(_ref6) {
    var commit = _ref6.commit;
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

/***/ "./resources/js/store/modules/User/Contract.js":
/*!*****************************************************!*\
  !*** ./resources/js/store/modules/User/Contract.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import _ from "lodash";

function initialState() {
  return {
    contracts: [],
    interestRate: 0,
    principalMin: 0,
    holdWeeksMin: 0,
    transferInfo: null,
    updatedAt: null
  };
}
var getters = {
  contracts: function contracts(state) {
    return state.contracts;
  },
  interestRate: function interestRate(state) {
    return state.interestRate;
  },
  principalMin: function principalMin(state) {
    return state.principalMin;
  },
  holdWeeksMin: function holdWeeksMin(state) {
    return state.holdWeeksMin;
  },
  transferInfo: function transferInfo(state) {
    return state.transferInfo;
  }
};
var actions = {
  fetch: function fetch(_ref) {
    var commit = _ref.commit,
      dispatch = _ref.dispatch,
      getters = _ref.getters,
      state = _ref.state,
      rootGetters = _ref.rootGetters;
    var isOld = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (moment().diff(state.updatedAt, "seconds") < 3) return false;
    return new Promise(function (resolve, reject) {
      axios.get("contract?isOld=" + isOld).then(function (response) {
        // console.log(response);
        commit("setState", response.data);
        resolve();
      });
    });
  },
  save: function save(_ref2, param) {
    var commit = _ref2.commit,
      dispatch = _ref2.dispatch,
      getters = _ref2.getters,
      state = _ref2.state,
      rootGetters = _ref2.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("contract", param).then(function (response) {
        // console.log(response.data);
        dispatch("fetch");
        dispatch("Auth/fetch", true, {
          root: true
        });
        resolve(response.data);
      });
    });
  },
  payingContract: function payingContract(_ref3, param) {
    var commit = _ref3.commit,
      dispatch = _ref3.dispatch,
      getters = _ref3.getters,
      state = _ref3.state,
      rootGetters = _ref3.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("contract/paying", param, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function (response) {
        // console.log(response.data);
        if (response.data.isOk) dispatch("fetch");
        resolve(response.data.isOk);
      });
    });
  },
  withdrawingContract: function withdrawingContract(_ref4, param) {
    var commit = _ref4.commit,
      dispatch = _ref4.dispatch,
      getters = _ref4.getters,
      state = _ref4.state;
    return new Promise(function (resolve, reject) {
      axios.post("contract/withdrawing", param).then(function (response) {
        // console.log(response.data);
        if (response.data.isOk) dispatch("fetch");
        resolve(response.data.isOk);
      });
    });
  },
  resetState: function resetState(_ref5) {
    var commit = _ref5.commit;
    commit("resetState");
  }
};
var mutations = {
  setState: function setState(state, data) {
    state.contracts = data.contracts;
    state.interestRate = data.interestRate;
    state.principalMin = data.principalMin;
    state.holdWeeksMin = data.holdWeeksMin;
    state.transferInfo = data.transferInfo;
    state.updatedAt = moment();
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

/***/ "./resources/js/store/modules/User/Trade.js":
/*!**************************************************!*\
  !*** ./resources/js/store/modules/User/Trade.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function initialState() {
  return {
    charts: {},
    copyRate: 0
  };
}
var getters = {
  charts: function charts(state) {
    return state.charts;
  },
  copyRate: function copyRate(state) {
    return state.copyRate;
  }
};
var actions = {
  getMonthChart: function getMonthChart(_ref) {
    var commit = _ref.commit,
      dispatch = _ref.dispatch,
      getters = _ref.getters,
      state = _ref.state,
      rootGetters = _ref.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("trade", {
        crypto: true
      }).then(function (response) {
        // console.log(response.data);
        commit("setState", response.data);
        resolve();
      });
    });
  }
};
var mutations = {
  setState: function setState(state, data) {
    state.charts = data.charts;
    state.copyRate = data.copyRate;
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

/***/ "./resources/js/views/user/Overview/Contracts.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/user/Overview/Contracts.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Contracts_vue_vue_type_template_id_713c1c20___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Contracts.vue?vue&type=template&id=713c1c20& */ "./resources/js/views/user/Overview/Contracts.vue?vue&type=template&id=713c1c20&");
/* harmony import */ var _Contracts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Contracts.vue?vue&type=script&lang=js& */ "./resources/js/views/user/Overview/Contracts.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Contracts_vue_vue_type_style_index_0_id_713c1c20_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss& */ "./resources/js/views/user/Overview/Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Contracts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Contracts_vue_vue_type_template_id_713c1c20___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Contracts_vue_vue_type_template_id_713c1c20___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/user/Overview/Contracts.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/user/Overview/Contracts.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Contracts.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contracts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Contracts.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Contracts.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Contracts_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/user/Overview/Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Contracts_vue_vue_type_style_index_0_id_713c1c20_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Contracts.vue?vue&type=style&index=0&id=713c1c20&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Contracts_vue_vue_type_style_index_0_id_713c1c20_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Contracts_vue_vue_type_style_index_0_id_713c1c20_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Contracts_vue_vue_type_style_index_0_id_713c1c20_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Contracts_vue_vue_type_style_index_0_id_713c1c20_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/user/Overview/Contracts.vue?vue&type=template&id=713c1c20&":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Contracts.vue?vue&type=template&id=713c1c20& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Contracts_vue_vue_type_template_id_713c1c20___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Contracts.vue?vue&type=template&id=713c1c20& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Contracts.vue?vue&type=template&id=713c1c20&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Contracts_vue_vue_type_template_id_713c1c20___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Contracts_vue_vue_type_template_id_713c1c20___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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



/***/ }),

/***/ "./resources/js/views/user/Overview/Index.vue":
/*!****************************************************!*\
  !*** ./resources/js/views/user/Overview/Index.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_3c877e51___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=3c877e51& */ "./resources/js/views/user/Overview/Index.vue?vue&type=template&id=3c877e51&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/views/user/Overview/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Index_vue_vue_type_style_index_0_id_3c877e51_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss& */ "./resources/js/views/user/Overview/Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_3c877e51___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_3c877e51___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/user/Overview/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/user/Overview/Index.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Index.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/user/Overview/Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_3c877e51_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Index.vue?vue&type=style&index=0&id=3c877e51&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_3c877e51_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_3c877e51_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_3c877e51_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_3c877e51_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/user/Overview/Index.vue?vue&type=template&id=3c877e51&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Index.vue?vue&type=template&id=3c877e51& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_3c877e51___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=3c877e51& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Index.vue?vue&type=template&id=3c877e51&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_3c877e51___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_3c877e51___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/user/Overview/LevelBar.vue":
/*!*******************************************************!*\
  !*** ./resources/js/views/user/Overview/LevelBar.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LevelBar_vue_vue_type_template_id_031073c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LevelBar.vue?vue&type=template&id=031073c0& */ "./resources/js/views/user/Overview/LevelBar.vue?vue&type=template&id=031073c0&");
/* harmony import */ var _LevelBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LevelBar.vue?vue&type=script&lang=js& */ "./resources/js/views/user/Overview/LevelBar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _LevelBar_vue_vue_type_style_index_0_id_031073c0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss& */ "./resources/js/views/user/Overview/LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _LevelBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LevelBar_vue_vue_type_template_id_031073c0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LevelBar_vue_vue_type_template_id_031073c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/user/Overview/LevelBar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/user/Overview/LevelBar.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/user/Overview/LevelBar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LevelBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./LevelBar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/LevelBar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LevelBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/user/Overview/LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LevelBar_vue_vue_type_style_index_0_id_031073c0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/LevelBar.vue?vue&type=style&index=0&id=031073c0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LevelBar_vue_vue_type_style_index_0_id_031073c0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LevelBar_vue_vue_type_style_index_0_id_031073c0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LevelBar_vue_vue_type_style_index_0_id_031073c0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_LevelBar_vue_vue_type_style_index_0_id_031073c0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/user/Overview/LevelBar.vue?vue&type=template&id=031073c0&":
/*!**************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/LevelBar.vue?vue&type=template&id=031073c0& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_LevelBar_vue_vue_type_template_id_031073c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./LevelBar.vue?vue&type=template&id=031073c0& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/LevelBar.vue?vue&type=template&id=031073c0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_LevelBar_vue_vue_type_template_id_031073c0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_LevelBar_vue_vue_type_template_id_031073c0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/user/Overview/MonthTrade.vue":
/*!*********************************************************!*\
  !*** ./resources/js/views/user/Overview/MonthTrade.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MonthTrade_vue_vue_type_template_id_edfbc856___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MonthTrade.vue?vue&type=template&id=edfbc856& */ "./resources/js/views/user/Overview/MonthTrade.vue?vue&type=template&id=edfbc856&");
/* harmony import */ var _MonthTrade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MonthTrade.vue?vue&type=script&lang=js& */ "./resources/js/views/user/Overview/MonthTrade.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _MonthTrade_vue_vue_type_style_index_0_id_edfbc856_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss& */ "./resources/js/views/user/Overview/MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MonthTrade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MonthTrade_vue_vue_type_template_id_edfbc856___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MonthTrade_vue_vue_type_template_id_edfbc856___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/user/Overview/MonthTrade.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/user/Overview/MonthTrade.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/user/Overview/MonthTrade.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MonthTrade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MonthTrade.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MonthTrade_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/user/Overview/MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MonthTrade_vue_vue_type_style_index_0_id_edfbc856_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=style&index=0&id=edfbc856&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MonthTrade_vue_vue_type_style_index_0_id_edfbc856_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MonthTrade_vue_vue_type_style_index_0_id_edfbc856_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MonthTrade_vue_vue_type_style_index_0_id_edfbc856_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MonthTrade_vue_vue_type_style_index_0_id_edfbc856_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/user/Overview/MonthTrade.vue?vue&type=template&id=edfbc856&":
/*!****************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/MonthTrade.vue?vue&type=template&id=edfbc856& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_MonthTrade_vue_vue_type_template_id_edfbc856___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MonthTrade.vue?vue&type=template&id=edfbc856& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/MonthTrade.vue?vue&type=template&id=edfbc856&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_MonthTrade_vue_vue_type_template_id_edfbc856___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_MonthTrade_vue_vue_type_template_id_edfbc856___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/user/Overview/Summary.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/user/Overview/Summary.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Summary_vue_vue_type_template_id_3f2fd536___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Summary.vue?vue&type=template&id=3f2fd536& */ "./resources/js/views/user/Overview/Summary.vue?vue&type=template&id=3f2fd536&");
/* harmony import */ var _Summary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Summary.vue?vue&type=script&lang=js& */ "./resources/js/views/user/Overview/Summary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Summary_vue_vue_type_style_index_0_id_3f2fd536_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss& */ "./resources/js/views/user/Overview/Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Summary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Summary_vue_vue_type_template_id_3f2fd536___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Summary_vue_vue_type_template_id_3f2fd536___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/user/Overview/Summary.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/user/Overview/Summary.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Summary.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Summary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Summary.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Summary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Summary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/user/Overview/Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Summary_vue_vue_type_style_index_0_id_3f2fd536_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Summary.vue?vue&type=style&index=0&id=3f2fd536&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Summary_vue_vue_type_style_index_0_id_3f2fd536_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Summary_vue_vue_type_style_index_0_id_3f2fd536_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Summary_vue_vue_type_style_index_0_id_3f2fd536_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Summary_vue_vue_type_style_index_0_id_3f2fd536_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/user/Overview/Summary.vue?vue&type=template&id=3f2fd536&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/Summary.vue?vue&type=template&id=3f2fd536& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Summary_vue_vue_type_template_id_3f2fd536___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Summary.vue?vue&type=template&id=3f2fd536& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/Summary.vue?vue&type=template&id=3f2fd536&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Summary_vue_vue_type_template_id_3f2fd536___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Summary_vue_vue_type_template_id_3f2fd536___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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
/* empty/unused harmony star reexport *//* harmony import */ var _TradeSummary_vue_vue_type_style_index_0_id_d6f8ed1a_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss& */ "./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss&");
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

/***/ "./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_style_index_0_id_d6f8ed1a_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=style&index=0&id=d6f8ed1a&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_style_index_0_id_d6f8ed1a_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_style_index_0_id_d6f8ed1a_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_style_index_0_id_d6f8ed1a_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_style_index_0_id_d6f8ed1a_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a&":
/*!******************************************************************************************!*\
  !*** ./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_template_id_d6f8ed1a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./TradeSummary.vue?vue&type=template&id=d6f8ed1a& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/Overview/TradeSummary.vue?vue&type=template&id=d6f8ed1a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_template_id_d6f8ed1a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TradeSummary_vue_vue_type_template_id_d6f8ed1a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);