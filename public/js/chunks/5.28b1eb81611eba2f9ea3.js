(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_FileManager_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/FileManager.vue */ "./resources/js/components/FileManager.vue");
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
  components: {
    FileManager: _components_FileManager_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      clientPath: "",
      callback: null,
      emitData: null
    };
  },
  computed: {
    popup: function popup() {
      return this.$refs.popup.instance;
    }
  },
  methods: {
    show: function show(_ref) {
      var _this = this;

      var clientPath = _ref.clientPath,
          callback = _ref.callback;
      this.clientPath = clientPath;
      this.callback = callback;
      this.popup.show();
      this.$mf.pushPopupToHistoryState(function () {
        return _this.popup.hide();
      });
    },
    onHiding: function onHiding() {
      if (typeof this.callback === "function") this.callback(this.emitData);
      this.$mf.popRouteHistoryState();
    },
    onCopiedUrl: function onCopiedUrl(copiedUrl) {
      this.emitData = copiedUrl;
      this.popup.hide();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\xampp\\htdocs\\quytrevang\\resources\\js\\components\\Popups\\ShareChartPopup.vue: Unexpected token, expected \",\" (56:26)\n\n\u001b[0m \u001b[90m 54 | \u001b[39m                \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mchart \u001b[33m=\u001b[39m createChart(\u001b[0m\n\u001b[0m \u001b[90m 55 | \u001b[39m                    \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mpopup\u001b[33m.\u001b[39mcontent()\u001b[33m.\u001b[39mquerySelector(\u001b[32m\".lightweight\"\u001b[39m)\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 56 | \u001b[39m                    (width\u001b[33m:\u001b[39m \u001b[32m\"100%\"\u001b[39m)\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m                          \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 57 | \u001b[39m                )\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 58 | \u001b[39m                \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mpriceSeries \u001b[33m=\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mchart\u001b[33m.\u001b[39maddLineSeries()\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 59 | \u001b[39m                \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mforeignSeries \u001b[33m=\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mchart\u001b[33m.\u001b[39maddLineSeries()\u001b[33m;\u001b[39m\u001b[0m\n    at Parser._raise (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:748:17)\n    at Parser.raiseWithData (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:741:17)\n    at Parser.raise (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:735:17)\n    at Parser.unexpected (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9101:16)\n    at Parser.expect (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9087:28)\n    at Parser.parseParenAndDistinguishExpression (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10736:14)\n    at Parser.parseExprAtom (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10470:21)\n    at Parser.parseExprSubscripts (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10150:23)\n    at Parser.parseUpdate (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10130:21)\n    at Parser.parseMaybeUnary (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10119:17)\n    at Parser.parseExprOps (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9989:23)\n    at Parser.parseMaybeConditional (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9963:23)\n    at Parser.parseMaybeAssign (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9926:21)\n    at C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9893:39\n    at Parser.allowInAnd (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:11547:12)\n    at Parser.parseMaybeAssignAllowIn (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9893:17)\n    at Parser.parseExprListItem (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:11309:18)\n    at Parser.parseCallExpressionArguments (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10350:22)\n    at Parser.parseCoverCallAndAsyncArrowHead (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10258:29)\n    at Parser.parseSubscript (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10194:19)\n    at Parser.parseSubscripts (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10167:19)\n    at Parser.parseExprSubscripts (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10156:17)\n    at Parser.parseUpdate (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10130:21)\n    at Parser.parseMaybeUnary (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:10119:17)\n    at Parser.parseExprOps (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9989:23)\n    at Parser.parseMaybeConditional (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9963:23)\n    at Parser.parseMaybeAssign (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9926:21)\n    at Parser.parseMaybeAssign (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9950:25)\n    at Parser.parseExpressionBase (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9871:23)\n    at C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9865:39\n    at Parser.allowInAnd (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:11547:12)\n    at Parser.parseExpression (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:9865:17)\n    at Parser.parseStatementContent (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:11807:23)\n    at Parser.parseStatement (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:11676:17)\n    at Parser.parseBlockOrModuleBlockBody (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:12258:25)\n    at Parser.parseBlockBody (C:\\xampp\\htdocs\\quytrevang\\node_modules\\@babel\\parser\\lib\\index.js:12249:10)");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__);
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
  components: {
    DxDataGrid: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxDataGrid"],
    DxColumn: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxColumn"]
  },
  data: function data() {
    return {
      gridData: null,
      editPermission: "trades@edit",
      validationRules: {
        amount: [{
          type: "required",
          message: this.$t("admin.trades.amount") + this.$mt.validations.required
        }],
        scores: [{
          type: "required",
          message: this.$t("admin.trades.scores") + this.$mt.validations.required
        }],
        revenue: [{
          type: "required",
          message: this.$t("admin.trades.revenue") + this.$mt.validations.required
        }],
        loss: [{
          type: "required",
          message: this.$t("admin.trades.loss") + this.$mt.validations.required
        }],
        fees: [{
          type: "required",
          message: this.$t("admin.trades.fees") + this.$mt.validations.required
        }],
        monday: [{
          type: "required",
          message: this.$t("admin.trades.monday") + this.$mt.validations.required
        }, {
          type: "custom",
          validationCallback: this.validateMonday,
          message: this.$t("admin.trades.validations.monday")
        }]
      }
    };
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Auth", ["permissions"])), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.trades", ["chart", "trades"])), {}, {
    popup: function popup() {
      return this.$refs.popup.instance;
    },
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    }
  }),
  watch: {
    trades: function trades() {
      this.gridData = this.$mf.cloneDeep(this.trades);
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.trades", ["fetch", "save"])), {}, {
    show: function show() {
      var _this = this;

      this.popup.show();
      this.fetch().then(function () {
        _this.gridData = _this.$mf.cloneDeep(_this.trades);
      });
      this.$mf.pushPopupToHistoryState(function () {
        return _this.popup.hide();
      });
    },
    onSave: function onSave(formData) {
      var _this2 = this;

      setTimeout(function () {
        return _this2.$bus.emit("checkPin", function () {
          return _this2.save(formData);
        });
      }, 100);
    },
    validateMonday: function validateMonday(e) {
      return moment(e.value).day() === 1;
    },
    onHiding: function onHiding() {
      this.gridData = null;
      this.$mf.popRouteHistoryState();
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Trades.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Trades.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_Popups_TrackTradePopup_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Popups/TrackTradePopup.vue */ "./resources/js/components/Popups/TrackTradePopup.vue");
/* harmony import */ var _components_Popups_PickImagePopup_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Popups/PickImagePopup.vue */ "./resources/js/components/Popups/PickImagePopup.vue");
/* harmony import */ var _components_Popups_ShareChartPopup_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/Popups/ShareChartPopup.vue */ "./resources/js/components/Popups/ShareChartPopup.vue");
/* harmony import */ var _store_modules_Admin_Trades__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../store/modules/Admin/Trades */ "./resources/js/store/modules/Admin/Trades.js");
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


var DxChart = function DxChart() {
  return Promise.all(/*! import() */[__webpack_require__.e(8), __webpack_require__.e(11)]).then(__webpack_require__.t.bind(null, /*! devextreme-vue/chart */ "./node_modules/devextreme-vue/chart.js", 7));
};





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxChart: DxChart,
    TrackTradePopup: _components_Popups_TrackTradePopup_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    PickImagePopup: _components_Popups_PickImagePopup_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    ShareChartPopup: _components_Popups_ShareChartPopup_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      principalTargetThreshold: 5,
      feesTargetThreshold: 5,
      visibleSeries: {
        revenue: true,
        loss: true,
        fees: true,
        profitPerPrincipal: false,
        profitPerFees: false,
        accumulatedProfit: false
      }
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.trades", _store_modules_Admin_Trades__WEBPACK_IMPORTED_MODULE_4__["default"]);
  },
  created: function created() {
    var _this = this;

    this.getChart(this.$route.query.period || 1);
    this.$bus.on("toggleMenu", function () {
      setTimeout(function () {
        return _this.chart.render();
      }, 300);
    });
  },
  mounted: function mounted() {
    if (this.$route.hash == "#data") this.$refs.trackTradePopup.show();
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Admin.trades");
    this.$bus.off("toggleMenu");
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Auth", ["permissions"])), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.trades", ["charts", "page"])), {}, {
    chart: function chart() {
      return this.$refs.chart.instance;
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.trades", ["getChart", "lazyLoad", "resetState"])), {}, {
    customizePoint: function customizePoint(_ref) {
      var value = _ref.value,
          series = _ref.series;
      if (series.tag === "profitPerPrincipal" && value >= this.principalTargetThreshold * this.charts.period) return {
        color: "Aqua",
        hoverStyle: {
          color: "Aqua"
        }
      };else if (series.tag === "profitPerFees" && value >= this.feesTargetThreshold) return {
        color: "Fuchsia",
        hoverStyle: {
          color: "Fuchsia"
        }
      };else return {
        color: series.color,
        hoverStyle: {
          color: series.color
        }
      };
    },
    customizeText: function customizeText(_ref2) {
      var valueText = _ref2.valueText;
      return "".concat(valueText.replace(",0", "").replace("M", " Tr"));
    },
    customizeTooltip: function customizeTooltip(pointInfo) {
      var accumulatedProfit = pointInfo.point.data.accumulatedProfit;
      var referenceTime = this.getReferenceTime();

      if (referenceTime !== null) {
        var referenceAccumulatedProfit = this.charts.data.find(function (c) {
          return c.time === referenceTime;
        }).accumulatedProfit;
        accumulatedProfit = accumulatedProfit - referenceAccumulatedProfit;
      }

      return {
        html: "<div class='trade-chart-tooltip'>\n                <div class='tooltip-header'>\n                  ".concat(pointInfo.argumentText, "\n                </div>\n                <div class='tooltip-body'>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.principalAvg"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.currency(pointInfo.point.data.principal), "\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.revenueSum"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.currency(pointInfo.point.data.revenue), "\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.lossSum"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.currency(-pointInfo.point.data.loss), "\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.feesSum"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.currency(-pointInfo.point.data.fees), "\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.profitSum"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value' style='font-weight: bold; color:").concat(pointInfo.point.data.profit >= 0 ? "green" : "red", "'>\n                      ").concat(this.$options.filters.currency(pointInfo.point.data.profit), "\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='top-series-name'>\n                      ").concat(this.$t("admin.trades.profitPerPrincipal"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='top-series-value'>\n                      ").concat(this.$options.filters.numberVnFormat(pointInfo.point.data.profitPerPrincipal, 1), "%\n                      (").concat((100 * pointInfo.point.data.profitPerPrincipal / (this.principalTargetThreshold * this.charts.period)).toFixed(0), "%\n                      ").concat(this.$t("admin.trades.kpi"), ")\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.profitPerFees"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.numberVnFormat(pointInfo.point.data.profitPerFees, 1), "\n                      (").concat((100 * pointInfo.point.data.profitPerFees / this.feesTargetThreshold).toFixed(0), "%\n                      ").concat(this.$t("admin.trades.kpi"), ")\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.accumulatedProfit"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.currency(accumulatedProfit), "\n                    </span>\n                  </div>\n                </div>\n              </div>")
      };
    },
    onPointClick: function onPointClick(_ref3) {
      var target = _ref3.target;
      var referenceTime = this.getReferenceTime() === target.argument ? null : target.argument;
      this.setReferenceTime(referenceTime);
    },
    onLegendClick: function onLegendClick(e) {
      var _this2 = this;

      var series = e.target;
      var referenceTime = this.getReferenceTime();

      if (series.isVisible()) {
        series.hide();
        this.visibleSeries[series.tag] = false;
      } else {
        series.show();
        this.visibleSeries[series.tag] = true;
      }

      setTimeout(function () {
        return _this2.setReferenceTime(referenceTime);
      }, 0);
    },
    getReferenceTime: function getReferenceTime() {
      return this.chart.option("argumentAxis.constantLines[0].value");
    },
    setReferenceTime: function setReferenceTime(value) {
      return this.chart.option("argumentAxis.constantLines[0].value", value);
    }
  })
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".lightweight {\n  width: 100%;\n  height: 400px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".trade-popup .dx-popup-content {\n  padding: 0;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Trades.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Trades.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".page-button .dx-button {\n  position: relative;\n}\n.page-button .dx-button:not([data-page=\"0\"]):after {\n  position: absolute;\n  content: attr(data-page);\n  top: 2px;\n  right: 5px;\n  padding: 1px 4px 0px 4px;\n  background: red;\n  border-radius: 10px;\n  color: #fff;\n  font-size: 13px;\n  font-weight: bold;\n  pointer-events: none;\n}\n.trades-page .dx-toolbar .dx-selectbox .dx-texteditor-input {\n  text-align: center;\n}\n.trade-chart-tooltip .tooltip-header {\n  margin-bottom: 5px;\n  font-size: 16px;\n  font-weight: 500;\n  padding-bottom: 5px;\n  border-bottom: 1px solid #c5c5c5;\n}\n.trade-chart-tooltip .tooltip-body {\n  width: 240px;\n}\n.trade-chart-tooltip .tooltip-body .series-name {\n  font-weight: normal;\n  opacity: 0.6;\n  display: inline-block;\n  line-height: 1.5;\n  padding-right: 10px;\n  width: 120px;\n}\n.trade-chart-tooltip .tooltip-body .value-text {\n  display: inline-block;\n  line-height: 1.5;\n  width: 110px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShareChartPopup.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./TrackTradePopup.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Trades.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Trades.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Trades.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Trades.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2& ***!
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
  return _c("DxPopup", {
    ref: "popup",
    attrs: {
      showCloseButton: true,
      fullScreen: _vm.$devices.phone ? true : false,
      "show-title": true,
      title: _vm.$t("components.pickImage.title")
    },
    on: { hiding: _vm.onHiding },
    scopedSlots: _vm._u([
      {
        key: "content",
        fn: function() {
          return [
            _c(
              "DxScrollView",
              [
                _c("FileManager", {
                  attrs: { clientPath: _vm.clientPath },
                  on: { copiedUrl: _vm.onCopiedUrl }
                })
              ],
              1
            )
          ]
        },
        proxy: true
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=template&id=6a592520&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=template&id=6a592520& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
  return _c("DxPopup", {
    ref: "popup",
    staticClass: "share-chart-popup",
    attrs: {
      showCloseButton: true,
      fullScreen: true,
      "show-title": true,
      title: _vm.$t("admin.trades.buttons.shareChart")
    },
    on: { shown: _vm.onShown, hiding: _vm.$mf.popRouteHistoryState },
    scopedSlots: _vm._u([
      {
        key: "content",
        fn: function() {
          return [
            _c(
              "DxScrollView",
              [
                _c("DxSelectBox", {
                  attrs: { items: _vm.symbols, value: _vm.symbols[0] },
                  on: { "value-changed": _vm.onSymbolChanged }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "lightweight" })
              ],
              1
            )
          ]
        },
        proxy: true
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
  return _c("DxPopup", {
    ref: "popup",
    staticClass: "trade-popup",
    attrs: {
      showCloseButton: true,
      fullScreen: _vm.$devices.phone ? true : false,
      "show-title": true,
      title: _vm.$t("admin.trades.buttons.addData")
    },
    on: { hiding: _vm.onHiding },
    scopedSlots: _vm._u([
      {
        key: "content",
        fn: function() {
          return [
            _c("DxScrollView", [
              _c(
                "div",
                [
                  _c(
                    "DxDataGrid",
                    {
                      ref: "dataGrid",
                      attrs: {
                        "data-source": _vm.gridData,
                        "key-expr": "id",
                        "show-borders": true,
                        "column-auto-width": true,
                        "allow-column-reordering": true,
                        "allow-column-resizing": true,
                        "column-resizing-mode": "widget",
                        paging: { pageSize: 8 },
                        headerFilter: { visible: true },
                        loadPanel: { enabled: true },
                        selection: { mode: "single" },
                        editing: {
                          allowAdding: _vm.permissions.includes(
                            _vm.editPermission
                          ),
                          allowUpdating: _vm.permissions.includes(
                            _vm.editPermission
                          ),
                          allowDeleting: _vm.permissions.includes(
                            _vm.editPermission
                          ),
                          mode: "batch",
                          startEditAction: "dblClick"
                        }
                      },
                      on: {
                        contentReady: function($event) {
                          return _vm.$mf.dataGridPreload(
                            _vm.gridData,
                            _vm.dataGrid
                          )
                        },
                        saved: _vm.onSave
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "commandCellTemplate",
                          fn: function(ref) {
                            var data = ref.data
                            return [
                              _c("DxToolbar", {
                                attrs: {
                                  items: [
                                    {
                                      locateInMenu: "auto",
                                      showText: "inMenu",
                                      location: "center",
                                      widget: "dxButton",
                                      options: {
                                        type: "default",
                                        icon: "trash",
                                        hint: _vm.$t("buttons.delete"),
                                        text: _vm.$t("buttons.delete"),
                                        onClick: function() {
                                          _vm.dataGrid.deleteRow(data.rowIndex)
                                        }
                                      }
                                    }
                                  ]
                                }
                              })
                            ]
                          }
                        }
                      ])
                    },
                    [
                      _c("DxColumn", {
                        attrs: {
                          fixed: true,
                          visible: _vm.permissions.includes(_vm.editPermission),
                          width: 35,
                          type: "buttons",
                          cssClass: "dx-datagrid-command-column",
                          "cell-template": "commandCellTemplate",
                          caption: _vm.$t("titles.commandHeaderTitleShort")
                        }
                      }),
                      _vm._v(" "),
                      _c("DxColumn", {
                        attrs: {
                          "data-field": "monday",
                          "data-type": "date",
                          "editor-options": {
                            dateSerializationFormat:
                              _vm.$mc.DX_SERVER_DATE_FORMAT,
                            showClearButton: "true",
                            useMaskBehavior: "true",
                            applyValueMode: "useButtons"
                          },
                          caption: _vm.$t("admin.trades.monday"),
                          "validation-rules": _vm.validationRules.monday
                        }
                      }),
                      _vm._v(" "),
                      _c("DxColumn", {
                        attrs: {
                          "data-field": "amount",
                          "data-type": "number",
                          width: 100,
                          caption: _vm.$t("admin.trades.amount"),
                          "validation-rules": _vm.validationRules.amount
                        }
                      }),
                      _vm._v(" "),
                      _c("DxColumn", {
                        attrs: {
                          "data-field": "scores",
                          "data-type": "number",
                          format: "#0.#",
                          "editor-options": {
                            step: "0.1",
                            format: "#0.#"
                          },
                          caption: _vm.$t("admin.trades.scores"),
                          "validation-rules": _vm.validationRules.scores
                        }
                      }),
                      _vm._v(" "),
                      _c("DxColumn", {
                        attrs: {
                          "data-field": "revenue",
                          "data-type": "number",
                          format: "#,##0",
                          "editor-options": {
                            step: "1",
                            format: "#,##0"
                          },
                          caption: _vm.$t("admin.trades.revenue"),
                          "validation-rules": _vm.validationRules.revenue
                        }
                      }),
                      _vm._v(" "),
                      _c("DxColumn", {
                        attrs: {
                          "data-field": "loss",
                          "data-type": "number",
                          format: "#,##0",
                          "editor-options": {
                            step: "1",
                            format: "#,##0"
                          },
                          caption: _vm.$t("admin.trades.loss"),
                          "validation-rules": _vm.validationRules.loss
                        }
                      }),
                      _vm._v(" "),
                      _c("DxColumn", {
                        attrs: {
                          "data-field": "fees",
                          "data-type": "number",
                          format: "#,##0",
                          "editor-options": {
                            step: "1",
                            format: "#,##0"
                          },
                          caption: _vm.$t("admin.trades.fees"),
                          "validation-rules": _vm.validationRules.fees
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ])
          ]
        },
        proxy: true
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Trades.vue?vue&type=template&id=5ad4536e&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Trades.vue?vue&type=template&id=5ad4536e& ***!
  \**********************************************************************************************************************************************************************************************************/
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
    { staticClass: "trades-page" },
    [
      _c("h2", { staticClass: "content-block" }, [
        _vm._v("\n    " + _vm._s(_vm.$t("admin.trades.title")) + "\n  ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "content-block dx-card responsive-paddings" },
        [
          _c("DxToolbar", {
            attrs: {
              items: [
                {
                  visible: _vm.$mf.isSet(_vm.$route.query),
                  location: "before",
                  widget: "dxButton",
                  options: {
                    icon: "far fa-arrow-left small",
                    hint: _vm.$t("buttons.back"),
                    onClick: function() {
                      return _vm.$router.go(-1)
                    }
                  }
                },
                {
                  location: "before",
                  cssClass: "page-button",
                  widget: "dxButton",
                  options: {
                    icon: "far fa-backward small",
                    hint: _vm.$t("admin.trades.buttons.more"),
                    elementAttr: { "data-page": _vm.page },
                    onClick: function() {
                      return _vm.lazyLoad()
                    }
                  }
                },
                {
                  location: "before",
                  widget: "dxButton",
                  options: {
                    icon: "far fa-database small",
                    hint: _vm.$t("admin.trades.buttons.addData"),
                    onClick: function() {
                      return _vm.$refs.trackTradePopup.show()
                    }
                  }
                },
                {
                  visible: _vm.permissions.includes("trades@edit"),
                  location: "before",
                  widget: "dxButton",
                  options: {
                    icon: "far fa-image small",
                    hint: _vm.$t("admin.trades.buttons.pickImage"),
                    onClick: function() {
                      return _vm.$refs.pickImagePopup.show({
                        clientPath: "vps"
                      })
                    }
                  }
                },
                {
                  visible: _vm.permissions.includes("trades@edit"),
                  location: "before",
                  widget: "dxButton",
                  options: {
                    icon: "far fa-chart-line small",
                    hint: _vm.$t("admin.trades.buttons.shareChart"),
                    onClick: function() {
                      return _vm.$refs.shareChartPopup.show()
                    }
                  }
                },
                {
                  location: "after",
                  widget: "dxSelectBox",
                  options: {
                    width: 80,
                    items: _vm.$mf.getChartPeriodList(),
                    displayExpr: "name",
                    valueExpr: "value",
                    value: _vm.charts.period,
                    onValueChanged: function(e) {
                      return _vm.getChart(e.value)
                    }
                  }
                }
              ]
            }
          }),
          _vm._v(" "),
          _c("DxChart", {
            ref: "chart",
            attrs: {
              "data-source": _vm.charts.data,
              "customize-point": _vm.customizePoint,
              title: _vm.$t("admin.trades.charTitle"),
              size: { width: "100%" },
              zoomAndPan: { argumentAxis: "both" },
              loadingIndicator: {
                enabled: true,
                show: true,
                text: _vm.$t("titles.loadingText")
              },
              export: {
                enabled: true,
                formats: ["PNG"],
                fileName: "chart",
                printingEnabled: false
              },
              commonSeriesSettings: { argumentField: "time", barPadding: 0 },
              series: [
                {
                  name: _vm.$t("admin.trades.revenueSum"),
                  tag: "revenue",
                  valueField: "revenue",
                  axis: "money",
                  type: "stackedbar",
                  stack: "money",
                  color: "DarkGreen",
                  visible: _vm.visibleSeries.revenue
                },
                {
                  name: _vm.$t("admin.trades.lossSum"),
                  tag: "loss",
                  valueField: "loss",
                  axis: "money",
                  type: "stackedbar",
                  stack: "money",
                  color: "FireBrick",
                  visible: _vm.visibleSeries.loss
                },
                {
                  name: _vm.$t("admin.trades.feesSum"),
                  tag: "fees",
                  valueField: "fees",
                  axis: "money",
                  type: "stackedbar",
                  stack: "money",
                  color: "DarkOrange",
                  visible: _vm.visibleSeries.fees
                },
                {
                  name: _vm.$t("admin.trades.profitPerPrincipal"),
                  tag: "profitPerPrincipal",
                  valueField: "profitPerPrincipal",
                  axis: "profitPerPrincipal",
                  type: "stackedbar",
                  stack: "profitPerPrincipal",
                  color: "Teal",
                  visible: _vm.visibleSeries.profitPerPrincipal
                },
                {
                  name: _vm.$t("admin.trades.profitPerFees"),
                  tag: "profitPerFees",
                  valueField: "profitPerFees",
                  axis: "profitPerFees",
                  type: "stackedbar",
                  stack: "profitPerFees",
                  color: "Purple",
                  visible: _vm.visibleSeries.profitPerFees
                },
                {
                  name: _vm.$t("admin.trades.accumulatedProfit"),
                  tag: "accumulatedProfit",
                  valueField: "accumulatedProfit",
                  axis: "accumulatedProfit",
                  type: "spline",
                  color: "White",
                  visible: _vm.visibleSeries.accumulatedProfit
                }
              ],
              valueAxis: [
                {
                  name: "money",
                  synchronizedValue: 0,
                  label: { customizeText: _vm.customizeText },
                  constantLines: [
                    {
                      value: 0,
                      color: "Gray",
                      label: { visible: false },
                      displayBehindSeries: true
                    }
                  ]
                },
                {
                  name: "profitPerPrincipal",
                  synchronizedValue: 0,
                  label: { visible: false },
                  tick: { visible: false },
                  grid: { visible: false },
                  visible: false
                },
                {
                  name: "profitPerFees",
                  synchronizedValue: 0,
                  label: { visible: false },
                  tick: { visible: false },
                  grid: { visible: false },
                  visible: false
                },
                {
                  name: "accumulatedProfit",
                  label: { visible: false },
                  tick: { visible: false },
                  grid: { visible: false },
                  visible: false
                }
              ],
              tooltip: {
                enabled: true,
                shared: false,
                customizeTooltip: _vm.customizeTooltip
              },
              legend: {
                verticalAlignment: "top",
                horizontalAlignment: "center",
                markerTemplate: "markerTemplate"
              },
              argumentAxis: {
                constantLines: [
                  {
                    value: null,
                    width: 2,
                    color: "white",
                    dashStyle: "dot"
                  }
                ]
              }
            },
            on: {
              pointClick: _vm.onPointClick,
              legendClick: _vm.onLegendClick
            },
            scopedSlots: _vm._u([
              {
                key: "markerTemplate",
                fn: function(ref) {
                  var data = ref.data
                  return [
                    _c("g", [
                      data.series.type === "spline"
                        ? _c("g", [
                            _c("rect", {
                              attrs: {
                                x: -10,
                                y: -1.5,
                                width: 30,
                                height: 2.5,
                                fill: data.marker.fill
                              }
                            }),
                            _vm._v(" "),
                            _c("path", {
                              attrs: {
                                d: "M0,0a5,5 0 1,0 10,0a5,5 0 1,0 -10,0",
                                fill: data.marker.fill
                              }
                            })
                          ])
                        : _c("g", [
                            _c("rect", {
                              attrs: {
                                x: 0,
                                y: 0,
                                width: 20,
                                height: 10,
                                fill: data.marker.fill
                              }
                            })
                          ])
                    ])
                  ]
                }
              }
            ])
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("TrackTradePopup", { ref: "trackTradePopup" }),
      _vm._v(" "),
      _c("PickImagePopup", { ref: "pickImagePopup" }),
      _vm._v(" "),
      _c("ShareChartPopup", { ref: "shareChartPopup" })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Popups/PickImagePopup.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/Popups/PickImagePopup.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PickImagePopup.vue?vue&type=template&id=74bfbac2& */ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&");
/* harmony import */ var _PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PickImagePopup.vue?vue&type=script&lang=js& */ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Popups/PickImagePopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PickImagePopup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PickImagePopup.vue?vue&type=template&id=74bfbac2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Popups/ShareChartPopup.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/Popups/ShareChartPopup.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ShareChartPopup_vue_vue_type_template_id_6a592520___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShareChartPopup.vue?vue&type=template&id=6a592520& */ "./resources/js/components/Popups/ShareChartPopup.vue?vue&type=template&id=6a592520&");
/* harmony import */ var _ShareChartPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShareChartPopup.vue?vue&type=script&lang=js& */ "./resources/js/components/Popups/ShareChartPopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ShareChartPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShareChartPopup.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/Popups/ShareChartPopup.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ShareChartPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ShareChartPopup_vue_vue_type_template_id_6a592520___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ShareChartPopup_vue_vue_type_template_id_6a592520___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Popups/ShareChartPopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Popups/ShareChartPopup.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Popups/ShareChartPopup.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareChartPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShareChartPopup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareChartPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Popups/ShareChartPopup.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Popups/ShareChartPopup.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareChartPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShareChartPopup.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareChartPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareChartPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareChartPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareChartPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Popups/ShareChartPopup.vue?vue&type=template&id=6a592520&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Popups/ShareChartPopup.vue?vue&type=template&id=6a592520& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareChartPopup_vue_vue_type_template_id_6a592520___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ShareChartPopup.vue?vue&type=template&id=6a592520& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/ShareChartPopup.vue?vue&type=template&id=6a592520&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareChartPopup_vue_vue_type_template_id_6a592520___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ShareChartPopup_vue_vue_type_template_id_6a592520___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Popups/TrackTradePopup.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/Popups/TrackTradePopup.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TrackTradePopup_vue_vue_type_template_id_05d25f16___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrackTradePopup.vue?vue&type=template&id=05d25f16& */ "./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16&");
/* harmony import */ var _TrackTradePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TrackTradePopup.vue?vue&type=script&lang=js& */ "./resources/js/components/Popups/TrackTradePopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _TrackTradePopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TrackTradePopup.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _TrackTradePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TrackTradePopup_vue_vue_type_template_id_05d25f16___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TrackTradePopup_vue_vue_type_template_id_05d25f16___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Popups/TrackTradePopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Popups/TrackTradePopup.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Popups/TrackTradePopup.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TrackTradePopup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./TrackTradePopup.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_template_id_05d25f16___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./TrackTradePopup.vue?vue&type=template&id=05d25f16& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_template_id_05d25f16___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_template_id_05d25f16___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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
  getSymbol: function getSymbol(_ref6) {
    var commit = _ref6.commit,
        dispatch = _ref6.dispatch,
        getters = _ref6.getters,
        state = _ref6.state,
        rootGetters = _ref6.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("trades/symbol").then(function (response) {
        console.log(response.data);
        resolve(response.data);
      });
    });
  },
  getShare: function getShare(_ref7, symbol) {
    var commit = _ref7.commit,
        dispatch = _ref7.dispatch,
        getters = _ref7.getters,
        state = _ref7.state,
        rootGetters = _ref7.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("trades/share", {
        symbol: symbol
      }).then(function (response) {
        console.log(response.data);
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

/***/ "./resources/js/views/admin/Trades.vue":
/*!*********************************************!*\
  !*** ./resources/js/views/admin/Trades.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Trades_vue_vue_type_template_id_5ad4536e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Trades.vue?vue&type=template&id=5ad4536e& */ "./resources/js/views/admin/Trades.vue?vue&type=template&id=5ad4536e&");
/* harmony import */ var _Trades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Trades.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Trades.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Trades_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Trades.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/views/admin/Trades.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Trades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Trades_vue_vue_type_template_id_5ad4536e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Trades_vue_vue_type_template_id_5ad4536e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Trades.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Trades.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/admin/Trades.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Trades.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Trades.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Trades.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/admin/Trades.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Trades.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Trades.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/admin/Trades.vue?vue&type=template&id=5ad4536e&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/admin/Trades.vue?vue&type=template&id=5ad4536e& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_template_id_5ad4536e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Trades.vue?vue&type=template&id=5ad4536e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Trades.vue?vue&type=template&id=5ad4536e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_template_id_5ad4536e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_template_id_5ad4536e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},0,[8,11]]);