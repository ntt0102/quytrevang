(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

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
        date: [{
          type: "required",
          message: this.$t("admin.trades.date") + this.$mt.validations.required
        }, {
          type: "custom",
          validationCallback: this.validatedate,
          message: this.$t("admin.trades.validations.date")
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
    validatedate: function validatedate(e) {
      return moment(e.value).day() === 1;
    },
    onHiding: function onHiding() {
      this.gridData = null;
      this.$mf.popRouteHistoryState();
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Trading/Trades.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Trading/Trades.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/chart */ "./node_modules/devextreme-vue/chart.js");
/* harmony import */ var devextreme_vue_chart__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_chart__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Popups_TrackTradePopup_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Popups/TrackTradePopup.vue */ "./resources/js/components/Popups/TrackTradePopup.vue");
/* harmony import */ var _store_modules_Admin_Trades__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/modules/Admin/Trades */ "./resources/js/store/modules/Admin/Trades.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxChart: devextreme_vue_chart__WEBPACK_IMPORTED_MODULE_1___default.a,
    TrackTradePopup: _components_Popups_TrackTradePopup_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      principalTargetThreshold: {
        day: 1,
        week: 5,
        month: 22,
        quarter: 65,
        year: 260
      },
      feesTargetThreshold: 5,
      visibleSeries: {
        money: true,
        profitPerPrincipal: false,
        profitPerFees: false,
        accumulatedProfit: false
      }
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.trades", _store_modules_Admin_Trades__WEBPACK_IMPORTED_MODULE_3__["default"]);
  },
  created: function created() {
    var _this$$route$query$pe,
      _this = this;
    this.getChart((_this$$route$query$pe = this.$route.query.period) !== null && _this$$route$query$pe !== void 0 ? _this$$route$query$pe : "day");
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
  computed: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Auth", ["permissions"])), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.trades", ["charts", "page", "period"])), {}, {
    chart: function chart() {
      return this.$refs.chart.instance;
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.trades", ["getChart", "lazyLoad", "resetState"])), {}, {
    customizePoint: function customizePoint(_ref) {
      var value = _ref.value,
        series = _ref.series;
      if (series.tag === "profitPerPrincipal" && value >= this.principalTargetThreshold[this.charts.period]) return {
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
        html: "<div class='trade-chart-tooltip'>\n                <div class='tooltip-header'>\n                  ".concat(pointInfo.argumentText, "\n                </div>\n                <div class='tooltip-body'>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.principalAvg"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.currency(pointInfo.point.data.principal), "\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.revenueSum"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.currency(pointInfo.point.data.revenue), "\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.lossSum"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.currency(pointInfo.point.data.loss), "\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.feesSum"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.currency(pointInfo.point.data.fees), "\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.profitSum"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value' style='font-weight: bold; color:").concat(pointInfo.point.data.profit >= 0 ? "green" : "red", "'>\n                      ").concat(this.$options.filters.currency(pointInfo.point.data.profit), "\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='top-series-name'>\n                      ").concat(this.$t("admin.trades.profitPerPrincipal"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='top-series-value'>\n                      ").concat(this.$options.filters.numberVnFormat(pointInfo.point.data.profitPerPrincipal, 1), "%\n                      (").concat((100 * pointInfo.point.data.profitPerPrincipal / this.principalTargetThreshold[this.charts.period]).toFixed(0), "%\n                      ").concat(this.$t("admin.trades.kpi"), ")\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.profitPerFees"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.numberVnFormat(pointInfo.point.data.profitPerFees, 1), "\n                      (").concat((100 * pointInfo.point.data.profitPerFees / this.feesTargetThreshold).toFixed(0), "%\n                      ").concat(this.$t("admin.trades.kpi"), ")\n                    </span>\n                  </div>\n                  <div class='series-name'>\n                    <span class='bottom-series-name'>\n                      ").concat(this.$t("admin.trades.accumulatedProfit"), "\n                    </span>:\n                  </div>\n                  <div class='value-text'>\n                    <span class='bottom-series-value'>\n                      ").concat(this.$options.filters.currency(accumulatedProfit), "\n                    </span>\n                  </div>\n                </div>\n              </div>")
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("DxPopup", {
    ref: "popup",
    staticClass: "trade-popup",
    attrs: {
      showCloseButton: true,
      fullScreen: _vm.$devices.phone ? true : false,
      "show-title": true,
      title: _vm.$t("admin.trades.buttons.addData")
    },
    on: {
      hiding: _vm.onHiding
    },
    scopedSlots: _vm._u([{
      key: "content",
      fn: function fn() {
        return [_c("DxScrollView", [_c("div", [_c("DxDataGrid", {
          ref: "dataGrid",
          attrs: {
            "data-source": _vm.gridData,
            "key-expr": "id",
            "show-borders": true,
            "column-auto-width": true,
            "allow-column-reordering": true,
            "allow-column-resizing": true,
            "column-resizing-mode": "widget",
            paging: {
              pageSize: 8
            },
            headerFilter: {
              visible: true
            },
            loadPanel: {
              enabled: true
            },
            selection: {
              mode: "single"
            },
            editing: {
              allowAdding: _vm.permissions.includes(_vm.editPermission),
              allowUpdating: _vm.permissions.includes(_vm.editPermission),
              allowDeleting: _vm.permissions.includes(_vm.editPermission),
              mode: "batch",
              startEditAction: "dblClick"
            }
          },
          on: {
            contentReady: function contentReady($event) {
              return _vm.$mf.dataGridPreload(_vm.gridData, _vm.dataGrid);
            },
            saved: _vm.onSave
          },
          scopedSlots: _vm._u([{
            key: "commandCellTemplate",
            fn: function fn(_ref) {
              var data = _ref.data;
              return [_c("DxToolbar", {
                attrs: {
                  items: [{
                    locateInMenu: "auto",
                    showText: "inMenu",
                    location: "center",
                    widget: "dxButton",
                    options: {
                      type: "default",
                      icon: "trash",
                      hint: _vm.$t("buttons.delete"),
                      text: _vm.$t("buttons.delete"),
                      onClick: function onClick() {
                        _vm.dataGrid.deleteRow(data.rowIndex);
                      }
                    }
                  }]
                }
              })];
            }
          }])
        }, [_c("DxColumn", {
          attrs: {
            fixed: true,
            visible: _vm.permissions.includes(_vm.editPermission),
            width: 35,
            type: "buttons",
            cssClass: "dx-datagrid-command-column",
            "cell-template": "commandCellTemplate",
            caption: _vm.$t("titles.commandHeaderTitleShort")
          }
        }), _vm._v(" "), _c("DxColumn", {
          attrs: {
            "data-field": "date",
            "data-type": "date",
            "editor-options": {
              dateSerializationFormat: _vm.$mc.DX_SERVER_DATE_FORMAT,
              showClearButton: "true",
              useMaskBehavior: "true",
              applyValueMode: "useButtons"
            },
            caption: _vm.$t("admin.trades.date"),
            "validation-rules": _vm.validationRules.date
          }
        }), _vm._v(" "), _c("DxColumn", {
          attrs: {
            "data-field": "amount",
            "data-type": "number",
            width: 100,
            caption: _vm.$t("admin.trades.amount"),
            "validation-rules": _vm.validationRules.amount
          }
        }), _vm._v(" "), _c("DxColumn", {
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
        }), _vm._v(" "), _c("DxColumn", {
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
        }), _vm._v(" "), _c("DxColumn", {
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
        }), _vm._v(" "), _c("DxColumn", {
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
        })], 1)], 1)])];
      },
      proxy: true
    }])
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Trading/Trades.vue?vue&type=template&id=4c9ef8bc&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Trading/Trades.vue?vue&type=template&id=4c9ef8bc& ***!
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
  return _c("div", {
    staticClass: "trades-page"
  }, [_c("h2", {
    staticClass: "content-block"
  }, [_vm._v("\n        " + _vm._s(_vm.$t("admin.trades.title")) + "\n    ")]), _vm._v(" "), _c("div", {
    staticClass: "content-block dx-card responsive-paddings"
  }, [_c("DxToolbar", {
    attrs: {
      items: [{
        visible: _vm.$mf.isSet(_vm.$route.query),
        location: "before",
        widget: "dxButton",
        options: {
          icon: "far fa-arrow-left small",
          hint: _vm.$t("buttons.back"),
          onClick: function onClick() {
            return _vm.$router.go(-1);
          }
        }
      }, {
        location: "before",
        cssClass: "page-button",
        widget: "dxButton",
        options: {
          icon: "far fa-backward small",
          hint: _vm.$t("admin.trades.buttons.more"),
          elementAttr: {
            "data-page": _vm.page
          },
          onClick: function onClick() {
            return _vm.lazyLoad();
          }
        }
      }, {
        location: "before",
        widget: "dxButton",
        options: {
          icon: "far fa-database small",
          hint: _vm.$t("admin.trades.buttons.addData"),
          onClick: function onClick() {
            return _vm.$refs.trackTradePopup.show();
          }
        }
      }, {
        location: "after",
        widget: "dxSelectBox",
        options: {
          width: 80,
          items: _vm.$mf.getChartPeriodList(),
          displayExpr: "name",
          valueExpr: "value",
          value: _vm.charts.period,
          onValueChanged: function onValueChanged(e) {
            return _vm.getChart(e.value);
          }
        }
      }]
    }
  }), _vm._v(" "), _c("DxChart", {
    ref: "chart",
    attrs: {
      "data-source": _vm.charts.data,
      "customize-point": _vm.customizePoint,
      title: {
        text: _vm.$t("admin.trades.charTitle"),
        horizontalAlignment: "center"
      },
      size: {
        width: "100%"
      },
      zoomAndPan: {
        argumentAxis: "both"
      },
      loadingIndicator: {
        enabled: true,
        show: true,
        text: _vm.$t("titles.loadingText")
      },
      "export": {
        enabled: true,
        formats: ["PNG"],
        fileName: "chart",
        printingEnabled: false
      },
      commonSeriesSettings: {
        argumentField: "time",
        barPadding: 0
      },
      series: [{
        name: _vm.$t("admin.trades.profitSum"),
        tag: "money",
        valueField: "s3",
        axis: "money",
        type: "stackedbar",
        stack: "money",
        color: "DarkGreen",
        visible: _vm.visibleSeries.money
      }, {
        name: _vm.$t("admin.trades.lossSum"),
        valueField: "s4",
        axis: "money",
        type: "stackedbar",
        stack: "money",
        color: "FireBrick",
        showInLegend: false,
        visible: _vm.visibleSeries.money
      }, {
        name: _vm.$t("admin.trades.feesSum"),
        valueField: "s5",
        axis: "money",
        type: "stackedbar",
        stack: "money",
        color: "DarkOrange",
        showInLegend: false,
        visible: _vm.visibleSeries.money
      }, {
        name: _vm.$t("admin.trades.feesSum"),
        valueField: "s2",
        axis: "money",
        type: "stackedbar",
        stack: "money",
        color: "DarkOrange",
        showInLegend: false,
        visible: _vm.visibleSeries.money
      }, {
        name: _vm.$t("admin.trades.lossSum"),
        valueField: "s1",
        axis: "money",
        type: "stackedbar",
        stack: "money",
        color: "FireBrick",
        showInLegend: false,
        visible: _vm.visibleSeries.money
      }, {
        name: _vm.$t("admin.trades.profitPerPrincipal"),
        tag: "profitPerPrincipal",
        valueField: "profitPerPrincipal",
        axis: "profitPerPrincipal",
        type: "stackedbar",
        stack: "profitPerPrincipal",
        color: "Teal",
        visible: _vm.visibleSeries.profitPerPrincipal
      }, {
        name: _vm.$t("admin.trades.profitPerFees"),
        tag: "profitPerFees",
        valueField: "profitPerFees",
        axis: "profitPerFees",
        type: "stackedbar",
        stack: "profitPerFees",
        color: "Purple",
        visible: _vm.visibleSeries.profitPerFees
      }, {
        name: _vm.$t("admin.trades.accumulatedProfit"),
        tag: "accumulatedProfit",
        valueField: "accumulatedProfit",
        axis: "accumulatedProfit",
        type: "spline",
        color: "White",
        visible: _vm.visibleSeries.accumulatedProfit
      }],
      valueAxis: [{
        name: "money",
        synchronizedValue: 0,
        label: {
          customizeText: _vm.customizeText
        }
      }, {
        name: "profitPerPrincipal",
        synchronizedValue: 0,
        label: {
          visible: false
        },
        tick: {
          visible: false
        },
        grid: {
          visible: false
        },
        visible: false
      }, {
        name: "profitPerFees",
        synchronizedValue: 0,
        label: {
          visible: false
        },
        tick: {
          visible: false
        },
        grid: {
          visible: false
        },
        visible: false
      }, {
        name: "accumulatedProfit",
        label: {
          visible: false
        },
        tick: {
          visible: false
        },
        grid: {
          visible: false
        },
        visible: false
      }],
      tooltip: {
        enabled: true,
        shared: false,
        customizeTooltip: _vm.customizeTooltip
      },
      legend: {
        verticalAlignment: "top",
        horizontalAlignment: "center",
        hoverMode: "none",
        markerTemplate: "markerTemplate"
      },
      argumentAxis: {
        constantLines: [{
          width: 2,
          color: "white",
          dashStyle: "dot",
          value: null
        }]
      }
    },
    on: {
      pointClick: _vm.onPointClick,
      legendClick: _vm.onLegendClick
    },
    scopedSlots: _vm._u([{
      key: "markerTemplate",
      fn: function fn(_ref) {
        var data = _ref.data;
        return [_c("g", [data.series.tag === "accumulatedProfit" ? _c("g", [_c("rect", {
          attrs: {
            x: -10,
            y: -1.5,
            width: 30,
            height: 2.5,
            fill: data.marker.fill
          }
        }), _vm._v(" "), _c("path", {
          attrs: {
            d: "M0,0a5,5 0 1,0 10,0a5,5 0 1,0 -10,0",
            fill: data.marker.fill
          }
        })]) : data.series.tag === "money" ? _c("g", [_c("rect", {
          attrs: {
            x: 0,
            y: 0,
            width: 10,
            height: 10,
            fill: "DarkGreen"
          }
        }), _vm._v(" "), _c("rect", {
          attrs: {
            x: 10,
            y: 0,
            width: 7,
            height: 10,
            fill: "FireBrick"
          }
        }), _vm._v(" "), _c("rect", {
          attrs: {
            x: 17,
            y: 0,
            width: 3,
            height: 10,
            fill: "DarkOrange"
          }
        })]) : _c("g", [_c("rect", {
          attrs: {
            x: 0,
            y: 0,
            width: 20,
            height: 10,
            fill: data.marker.fill
          }
        })])])];
      }
    }])
  })], 1), _vm._v(" "), _c("TrackTradePopup", {
    ref: "trackTradePopup"
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".trade-popup .dx-popup-content {\n  padding: 0;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Trading/Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Trading/Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".page-button .dx-button {\n  position: relative;\n}\n.page-button .dx-button:not([data-page=\"0\"]):after {\n  position: absolute;\n  content: attr(data-page);\n  top: 2px;\n  right: 5px;\n  padding: 1px 4px 0px 4px;\n  background: red;\n  border-radius: 10px;\n  color: #fff;\n  font-size: 13px;\n  font-weight: bold;\n  pointer-events: none;\n}\n.trades-page .dx-toolbar .dx-selectbox .dx-texteditor-input {\n  text-align: center;\n}\n.trade-chart-tooltip .tooltip-header {\n  margin-bottom: 5px;\n  font-size: 16px;\n  font-weight: 500;\n  padding-bottom: 5px;\n  border-bottom: 1px solid #c5c5c5;\n}\n.trade-chart-tooltip .tooltip-body {\n  width: 240px;\n}\n.trade-chart-tooltip .tooltip-body .series-name {\n  font-weight: normal;\n  opacity: 0.6;\n  display: inline-block;\n  line-height: 1.5;\n  padding-right: 10px;\n  width: 120px;\n}\n.trade-chart-tooltip .tooltip-body .value-text {\n  display: inline-block;\n  line-height: 1.5;\n  width: 110px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Trading/Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Trading/Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Trading/Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss&");

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
/* empty/unused harmony star reexport *//* harmony import */ var _TrackTradePopup_vue_vue_type_style_index_0_id_05d25f16_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss& */ "./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss&");
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

/***/ "./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_style_index_0_id_05d25f16_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=style&index=0&id=05d25f16&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_style_index_0_id_05d25f16_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_style_index_0_id_05d25f16_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_style_index_0_id_05d25f16_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_style_index_0_id_05d25f16_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_template_id_05d25f16___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./TrackTradePopup.vue?vue&type=template&id=05d25f16& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/TrackTradePopup.vue?vue&type=template&id=05d25f16&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_template_id_05d25f16___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_TrackTradePopup_vue_vue_type_template_id_05d25f16___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/store/modules/Admin/Trades.js":
/*!****************************************************!*\
  !*** ./resources/js/store/modules/Admin/Trades.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open 'C:\\xampp\\htdocs\\quytrevang\\resources\\js\\store\\modules\\Admin\\Trades.js'");

/***/ }),

/***/ "./resources/js/views/Trading/Trades.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/Trading/Trades.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Trades_vue_vue_type_template_id_4c9ef8bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Trades.vue?vue&type=template&id=4c9ef8bc& */ "./resources/js/views/Trading/Trades.vue?vue&type=template&id=4c9ef8bc&");
/* harmony import */ var _Trades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Trades.vue?vue&type=script&lang=js& */ "./resources/js/views/Trading/Trades.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Trades_vue_vue_type_style_index_0_id_4c9ef8bc_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss& */ "./resources/js/views/Trading/Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Trades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Trades_vue_vue_type_template_id_4c9ef8bc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Trades_vue_vue_type_template_id_4c9ef8bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Trading/Trades.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Trading/Trades.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/Trading/Trades.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Trades.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Trading/Trades.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Trading/Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/views/Trading/Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_style_index_0_id_4c9ef8bc_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Trading/Trades.vue?vue&type=style&index=0&id=4c9ef8bc&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_style_index_0_id_4c9ef8bc_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_style_index_0_id_4c9ef8bc_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_style_index_0_id_4c9ef8bc_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_style_index_0_id_4c9ef8bc_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/Trading/Trades.vue?vue&type=template&id=4c9ef8bc&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/Trading/Trades.vue?vue&type=template&id=4c9ef8bc& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_template_id_4c9ef8bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./Trades.vue?vue&type=template&id=4c9ef8bc& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Trading/Trades.vue?vue&type=template&id=4c9ef8bc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_template_id_4c9ef8bc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Trades_vue_vue_type_template_id_4c9ef8bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);