(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[64],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/OrderChart.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/OrderChart.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
!(function webpackMissingModule() { var e = new Error("Cannot find module '../../store/modules/User/OrderChart'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var UP_COLOR = "48,161,101";
var DOWN_COLOR = "236,63,63";
var chartOptions = {
  localization: {
    dateFormat: "dd/MM/yyyy",
    locale: "vi-VN"
  },
  rightPriceScale: {
    visible: true,
    scaleMargins: {
      top: 0.2,
      bottom: 0.1
    }
  },
  leftPriceScale: {
    visible: false
  },
  layout: {
    backgroundColor: "#000000",
    textColor: "#CCCCCC"
  },
  grid: {
    vertLines: {
      color: "#1B1E27",
      style: 2
    },
    horzLines: {
      color: "#1B1E27",
      style: 2
    }
  },
  crosshair: {
    mode: 0
  },
  timeScale: {
    timeVisible: true,
    rightOffset: 20,
    minBarSpacing: 0.05
  }
};
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      chart: {},
      series: {},
      data: {
        original: [],
        price: [],
        volume: [],
        whitespace: []
      },
      order: {
        entry: {},
        tp: {},
        sl: {}
      },
      lines: [],
      makers: [],
      ruler: {
        start: {},
        end: {},
        point: 0
      },
      alerts: [],
      crosshair: {}
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (document.getElementById("orderChartJs")) return;
    var scriptTag = document.createElement("script");
    scriptTag.src = "/js/order-chart.min.js";
    scriptTag.id = "orderChartJs";
    document.getElementsByTagName("head")[0].appendChild(scriptTag); //

    setTimeout(function () {
      // console.log(window.LightweightCharts.LineStyle.Dashed);
      console.log(_this.$refs.orderChart);
      _this.chart = LightweightCharts.createChart(_this.$refs.orderChart, chartOptions);

      _this.chart.subscribeCrosshairMove(function (e) {
        return _this.eventChartCrosshairMove(e, _this);
      });

      _this.chart.subscribeCustomPriceLineDragged(function (e) {
        return _this.eventPriceLineDrag(e, _this);
      });

      _this.series.whitespace = _this.chart.addLineSeries({
        priceScaleId: "whitespace",
        visible: false
      });
      _this.series.volume = _this.chart.addHistogramSeries({
        priceScaleId: "volume",
        priceFormat: {
          type: "volume"
        },
        scaleMargins: {
          top: 0.8,
          bottom: 0
        },
        visible: _this.global.isVolume
      });

      _this.createPriceSeries();
    }, 1000);
  },
  methods: {
    eventChartCrosshairMove: function eventChartCrosshairMove(e, self) {
      if (e.time) {
        var price = e.seriesPrices.get(self.series.price);
        var volume = e.seriesPrices.get(self.series.volume);
        if (!!price && self.chartType != "line") price = price.close;
        self.updateLegend(price, volume);
        self.hasCrosshair = true;
        self.crosshair.time = e.time;
        self.crosshair.price = price;
      } else {
        self.hasCrosshair = false;

        if (!self.global.isMobile) {
          self.crosshair.time = null;
          self.crosshair.price = null;
        }
      }

      if (e.point != undefined) {
        self.crosshair.x = e.point.x;
        self.crosshair.y = e.point.y;
      }
    },
    eventPriceLineDrag: function eventPriceLineDrag(e, self) {
      var line = e.customPriceLine;
      var lineOptions = line.options();
      lineOptions.price = self.formatPrice(lineOptions.price);
      var oldPrice = +e.fromPriceString;
      var newPrice = lineOptions.price;

      switch (lineOptions.lineType) {
        case "order":
          if (newPrice != oldPrice) {
            var isChanged = false;
            var position = self.callback.getOrderPositionCallback();

            if (lineOptions.kind == "entry") {
              if (!position) {
                isChanged = true;
                self.order[lineOptions.kind].price = newPrice;
                self.callback.orderEntryPriceCallback(self.order, true);
                self.drawOrderLine(lineOptions.kind);
              }
            } else {
              if (self.order.side * position > 0) {
                isChanged = true;
                self.order[lineOptions.kind].price = newPrice;
                if (lineOptions.kind == "tp") self.callback.orderTpPriceCallback(self.order, true);else self.callback.orderSlPriceCallback(self.order, true);
                self.drawOrderLine(lineOptions.kind);
              }
            } //


            if (!isChanged) {
              line.applyOptions({
                price: oldPrice
              });
              self.global.alert.warning("Không được thay đổi.");
            }
          }

          break;

        case "line":
          self.global.store.set("line", {
            price: oldPrice,
            removed: true
          });
          self.global.store.set("line", lineOptions);
          self.drawLineButton.classList.remove("selected");
          break;

        case "ruler":
          if (lineOptions.point == 1) {
            self.global.store.set("ruler", lineOptions);

            if (self.ruler.point == 2) {
              var distance = +self.ruler.end.options().title;
              var endPrice = +(newPrice + distance).toFixed(1);
              self.ruler.end.applyOptions({
                price: endPrice
              });
              self.global.store.set("ruler", self.ruler.end.options());
            }
          } else {
            var startPrice = +self.ruler.start.options().price;

            var _distance = (newPrice - startPrice).toFixed(1);

            line.applyOptions({
              title: _distance
            });
            self.global.store.set("ruler", line.options());
          }

          break;

        case "alert":
          self.alertAudio.pause();
          self.global.store.set("alert", {
            price: oldPrice,
            removed: true
          });
          var currentPrice = self.data.price.slice(-1)[0].value;
          var title = newPrice >= currentPrice ? ">" : "<";
          line.applyOptions({
            title: title
          });
          self.global.store.set("alert", line.options());
          self.drawAlertButton.classList.remove("selected");
          break;
      }
    },
    createPriceSeries: function createPriceSeries() {
      switch (this.chartType) {
        case "candlestick":
          this.series.price = this.chart.addCandlestickSeries({
            upColor: "rgb(".concat(UP_COLOR, ")"),
            downColor: "rgb(".concat(DOWN_COLOR, ")"),
            borderVisible: false,
            priceFormat: {
              minMove: 0.1
            }
          });
          break;

        case "line":
          this.series.price = this.chart.addLineSeries({
            color: "#CCCCCC",
            priceFormat: {
              minMove: 0.1
            }
          });
          break;

        case "bar":
          this.series.price = this.chart.addBarSeries({
            upColor: "rgb(".concat(UP_COLOR, ")"),
            downColor: "rgb(".concat(DOWN_COLOR, ")"),
            thinBars: false,
            priceFormat: {
              minMove: 0.1
            }
          });
          break;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".order-chart-container[data-v-cb468136] {\n  height: calc(100vh - 56px - 109px - 200px);\n}\n.order-chart-container .chart-wrapper[data-v-cb468136] {\n  height: 100%;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/OrderChart.vue?vue&type=template&id=cb468136&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/OrderChart.vue?vue&type=template&id=cb468136&scoped=true& ***!
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
  return _c("div", { staticClass: "order-chart-page" }, [
    _c("h2", { staticClass: "content-block" }, [
      _vm._v("\n        " + _vm._s(_vm.$t("user.orderChart.title")) + "\n    ")
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
                location: "before",
                widget: "dxButton",
                options: {
                  icon: "far fa-arrow-left small",
                  hint: _vm.$t("buttons.back"),
                  onClick: function() {
                    _vm.$router.push({ name: _vm.$route.query.redirect })
                  }
                }
              }
            ]
          }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "order-chart-container" }, [
          _c("div", { ref: "orderChart", staticClass: "chart-wrapper" })
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/user/OrderChart.vue":
/*!************************************************!*\
  !*** ./resources/js/views/user/OrderChart.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderChart_vue_vue_type_template_id_cb468136_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderChart.vue?vue&type=template&id=cb468136&scoped=true& */ "./resources/js/views/user/OrderChart.vue?vue&type=template&id=cb468136&scoped=true&");
/* harmony import */ var _OrderChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderChart.vue?vue&type=script&lang=js& */ "./resources/js/views/user/OrderChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _OrderChart_vue_vue_type_style_index_0_id_cb468136_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true& */ "./resources/js/views/user/OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _OrderChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderChart_vue_vue_type_template_id_cb468136_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OrderChart_vue_vue_type_template_id_cb468136_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "cb468136",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/user/OrderChart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/user/OrderChart.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/user/OrderChart.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderChart.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/OrderChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/user/OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/views/user/OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderChart_vue_vue_type_style_index_0_id_cb468136_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/OrderChart.vue?vue&type=style&index=0&id=cb468136&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderChart_vue_vue_type_style_index_0_id_cb468136_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderChart_vue_vue_type_style_index_0_id_cb468136_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderChart_vue_vue_type_style_index_0_id_cb468136_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderChart_vue_vue_type_style_index_0_id_cb468136_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/user/OrderChart.vue?vue&type=template&id=cb468136&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/views/user/OrderChart.vue?vue&type=template&id=cb468136&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderChart_vue_vue_type_template_id_cb468136_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderChart.vue?vue&type=template&id=cb468136&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/OrderChart.vue?vue&type=template&id=cb468136&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderChart_vue_vue_type_template_id_cb468136_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderChart_vue_vue_type_template_id_cb468136_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);