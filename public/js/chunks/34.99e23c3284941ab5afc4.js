(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/user/OrderChart.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/user/OrderChart.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _store_modules_Admin_OrderChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/modules/Admin/OrderChart */ "./resources/js/store/modules/Admin/OrderChart.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
        whitespace: [],
        price: []
      },
      order: {
        entry: {},
        tp: {},
        sl: {}
      },
      lines: [],
      ruler: {
        start: {},
        end: {},
        point: 0
      },
      crosshair: {},
      spinnerShow: false,
      chartDate: moment().format("YYYY-MM-DD"),
      clockInterval: null,
      clock: null,
      isFullscreen: false
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("User.orderChart", _store_modules_Admin_OrderChart__WEBPACK_IMPORTED_MODULE_1__["default"]);
  },
  created: function created() {
    var _this = this;

    this.getChartData(true);
    this.clockInterval = setInterval(function () {
      _this.clock = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      }).format();
    }, 1000);
  },
  mounted: function mounted() {
    var _this2 = this;

    if (document.getElementById("orderChartJs")) return;
    var scriptTag = document.createElement("script");
    scriptTag.src = "/js/order-chart.min.js";
    scriptTag.id = "orderChartJs";
    document.getElementsByTagName("head")[0].appendChild(scriptTag); //

    setTimeout(function () {
      _this2.chart = LightweightCharts.createChart(_this2.$refs.orderChart, chartOptions);

      _this2.chart.subscribeCrosshairMove(function (e) {
        return _this2.eventChartCrosshairMove(e, _this2);
      });

      _this2.chart.subscribeCustomPriceLineDragged(function (e) {
        return _this2.eventPriceLineDrag(e, _this2);
      });

      _this2.series.whitespace = _this2.chart.addLineSeries({
        priceScaleId: "whitespace",
        visible: false
      });
      _this2.series.price = _this2.chart.addLineSeries({
        color: "#CCCCCC",
        priceFormat: {
          minMove: 0.1
        }
      });
      new ResizeObserver(_this2.eventChartResize).observe(_this2.$refs.chartContainer);
      window.addEventListener("keydown", _this2.eventKeyPress);
      document.addEventListener("fullscreenchange", function () {
        return _this2.isFullscreen = document.fullscreenElement;
      });
    }, 1000);
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("User.orderChart");
    clearInterval(this.interval);
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("User.orderChart", ["config"])),
  methods: {
    // ...mapActions("User.orderChart", ["getChartData", "getConfig"]),
    eventChartCrosshairMove: function eventChartCrosshairMove(e, self) {// if (e.time) {
      //     var price = e.seriesPrices.get(self.series.price);
      //     var volume = e.seriesPrices.get(self.series.volume);
      //     if (!!price && self.chartType != "line") price = price.close;
      //     self.updateLegend(price, volume);
      //     self.hasCrosshair = true;
      //     self.crosshair.time = e.time;
      //     self.crosshair.price = price;
      // } else {
      //     self.hasCrosshair = false;
      //     if (!self.global.isMobile) {
      //         self.crosshair.time = null;
      //         self.crosshair.price = null;
      //     }
      // }
      // if (e.point != undefined) {
      //     self.crosshair.x = e.point.x;
      //     self.crosshair.y = e.point.y;
      // }
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
    eventChartResize: function eventChartResize() {
      var el = this.$refs.chartContainer;
      this.chart.resize(el.offsetWidth, el.offsetHeight);
    },
    eventKeyPress: function eventKeyPress(e) {
      if (e.ctrlKey || e.metaKey) {
        switch (e.keyCode) {
          case 38:
            this.chart.timeScale().applyOptions({
              barSpacing: this.chart.options().timeScale.barSpacing + 0.05
            });
            break;

          case 40:
            this.chart.timeScale().applyOptions({
              barSpacing: this.chart.options().timeScale.barSpacing - 0.05
            });
            break;

          case 37:
            this.chart.timeScale().scrollToPosition(this.chart.timeScale().scrollPosition() - 10);
            break;

          case 39:
            this.chart.timeScale().scrollToPosition(this.chart.timeScale().scrollPosition() + 10);
            break;

          case 96:
            self.drawAlertButton.click();
            break;

          case 97:
            self.drawMarkerButton.click();
            break;

          case 98:
            this.getChartData();
            break;

          case 99:
            this.toggleFullscreen();
            break;
        }
      }
    },
    toggleFullscreen: function toggleFullscreen() {
      if (document.fullscreenElement) document.exitFullscreen();else this.$refs.chartContainer.requestFullscreen();
    },
    getChartData: function getChartData() {
      var _this3 = this;

      var loadWhitespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.spinnerShow = true;
      axios.post("order-chart", {
        date: this.chartDate
      }, {
        noLoading: true
      }).then(function (response) {
        // console.log(response.data);
        if (loadWhitespace) {
          _this3.data.whitespace = _this3.mergeChartData(_this3.data.whitespace, _this3.createWhitespaceData());

          _this3.series.whitespace.setData(_this3.data.whitespace);
        }

        _this3.data.price = _this3.mergeChartData(response.data, _this3.data.price);

        _this3.series.price.setData(_this3.data.price); //


        _this3.spinnerShow = false;
      });
    },
    createWhitespaceData: function createWhitespaceData() {
      var date = this.chartDate;
      var amStart = moment("".concat(date, " 09:00:00")).unix();
      var amEnd = moment("".concat(date, " 11:30:00")).unix();
      var pmStart = moment("".concat(date, " 13:00:00")).unix();
      var pmEnd = moment("".concat(date, " 14:30:00")).unix();
      var data = [],
          sec;

      for (sec = amStart; sec <= amEnd; sec++) {
        data.push({
          time: sec + 7 * 60 * 60
        });
      }

      for (sec = pmStart; sec <= pmEnd; sec++) {
        data.push({
          time: sec + 7 * 60 * 60
        });
      }

      return data;
    },
    mergeChartData: function mergeChartData(data1, data2) {
      var ids = new Set(data1.map(function (d) {
        return d.time;
      }));
      return [].concat(_toConsumableArray(data1), _toConsumableArray(data2.filter(function (d) {
        return !ids.has(d.time);
      }))).sort(function (a, b) {
        return a.time - b.time;
      });
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
exports.push([module.i, ".order-chart-container[data-v-cb468136] {\n  position: relative;\n  height: 350px;\n  background: #131722;\n  border: none;\n}\n.order-chart-container .chart-wrapper[data-v-cb468136] {\n  height: 100%;\n}\n.order-chart-container .area[data-v-cb468136] {\n  position: absolute;\n  display: flex;\n  justify-content: space-between;\n  font-size: 17px;\n  background: #131722;\n  border: solid 2px #2a2e39;\n  border-radius: 5px;\n  z-index: 3;\n}\n.order-chart-container .area#dataAreaDiv[data-v-cb468136] {\n  top: 0px;\n  left: 30px;\n}\n.order-chart-container .area#dataAreaDiv .command[data-v-cb468136]:not(:first-child) {\n  border-left: solid 2px #2a2e39 !important;\n}\n.order-chart-container .area#dataAreaDiv #timeFrameSelect[data-v-cb468136] {\n  width: 75px;\n}\n.order-chart-container .area#dataAreaDiv #chartTypeSelect[data-v-cb468136] {\n  width: 77px;\n}\n.order-chart-container .area#dataAreaDiv #dateInput[data-v-cb468136] {\n  width: 125px;\n}\n.order-chart-container .area#dataAreaDiv #spinnerImg[data-v-cb468136] {\n  width: 30px;\n  height: 30px;\n}\n.order-chart-container .area#toolAreaDiv[data-v-cb468136] {\n  top: 0px;\n  left: 0px;\n  flex-direction: column;\n}\n.order-chart-container .area#toolAreaDiv .command[data-v-cb468136]:not(:first-child) {\n  border-top: solid 2px #2a2e39 !important;\n}\n.order-chart-container .command[data-v-cb468136] {\n  width: 30px;\n  height: 30px;\n  flex: 1 1 auto;\n  text-align: center;\n  color: #bbbbbb;\n  background: transparent !important;\n  line-height: 30px;\n  font-size: 16px;\n  border: none;\n  cursor: pointer;\n  z-index: 3;\n}\n.order-chart-container .command[data-v-cb468136]:hover {\n  background: #2a2e39 !important;\n}\n.order-chart-container .clock[data-v-cb468136] {\n  width: 80px;\n}", ""]);

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
        _c(
          "div",
          { ref: "chartContainer", staticClass: "order-chart-container" },
          [
            _c("div", { ref: "orderChart", staticClass: "chart-wrapper" }),
            _vm._v(" "),
            _c("div", { staticClass: "area", attrs: { id: "dataAreaDiv" } }, [
              _c("div", { staticClass: "command clock" }, [
                _vm._v(_vm._s(_vm.clock))
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.chartDate,
                    expression: "chartDate"
                  }
                ],
                staticClass: "command",
                attrs: {
                  type: "date",
                  id: "dateInput",
                  title: _vm.$t("user.orderChart.dateTitle")
                },
                domProps: { value: _vm.chartDate },
                on: {
                  change: function() {
                    return _vm.getChartData()
                  },
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.chartDate = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _vm.spinnerShow
                ? _c("img", { attrs: { id: "spinnerImg", src: "spinner.gif" } })
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "area", attrs: { id: "toolAreaDiv" } }, [
              _c("div", {
                class:
                  "command far fa-" +
                  (_vm.isFullscreen ? "compress" : "expand"),
                on: {
                  click: function() {
                    return _vm.toggleFullscreen()
                  }
                }
              }),
              _vm._v(" "),
              _c("div", {
                staticClass: "command far fa-sync-alt",
                on: {
                  click: function() {
                    return _vm.getChartData()
                  }
                }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "command far fa-minus" }),
              _vm._v(" "),
              _c("div", { staticClass: "command far fa-arrows-v" })
            ])
          ]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/store/modules/Admin/OrderChart.js":
/*!********************************************************!*\
  !*** ./resources/js/store/modules/Admin/OrderChart.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_moment__WEBPACK_IMPORTED_MODULE_0__);


function initialState() {
  return {
    config: {},
    original: [],
    whitespace: [],
    price: []
  };
}

var getters = {
  config: function config(state) {
    return state.config;
  },
  original: function original(state) {
    return state.original;
  },
  whitespace: function whitespace(state) {
    return state.whitespace;
  },
  price: function price(state) {
    return state.price;
  }
};
var actions = {
  getChartData: function getChartData(_ref, chartDate) {
    var commit = _ref.commit,
        dispatch = _ref.dispatch,
        getters = _ref.getters,
        state = _ref.state,
        rootGetters = _ref.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("order-chart", {
        date: chartDate
      }, {
        noLoading: true
      }).then(function (response) {
        // console.log(response.data);
        // commit("setChartData", response.data);
        resolve(response.data);
      });
    });
  },
  validateDuplicateUser: function validateDuplicateUser(_ref2, param) {
    var state = _ref2.state,
        rootGetters = _ref2.rootGetters;
    var oldSo = state.sos.find(function (x) {
      return x.id === param.data.id;
    });
    if (!!oldSo && param.value == oldSo.user_code) return Promise.resolve(true);
    return new Promise(function (resolve, reject) {
      axios.post("so/manage/validate-user", {
        userCode: param.value
      }, {
        noLoading: true
      }).then(function (response) {
        // console.log(response);
        resolve(response.data);
      });
    });
  },
  save: function save(_ref3, param) {
    var commit = _ref3.commit,
        dispatch = _ref3.dispatch,
        getters = _ref3.getters,
        state = _ref3.state,
        rootGetters = _ref3.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("so/manage", param).then(function (response) {
        // console.log(response.data);
        resolve();
        if (response.data.isOk) dispatch("fetch");
      });
    });
  },
  getPlans: function getPlans(_ref4) {
    var commit = _ref4.commit,
        dispatch = _ref4.dispatch,
        getters = _ref4.getters,
        state = _ref4.state,
        rootGetters = _ref4.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("so/plans").then(function (response) {
        // console.log(response.data);
        commit("setPlans", response.data);
        resolve();
      });
    });
  },
  savePlans: function savePlans(_ref5, param) {
    var commit = _ref5.commit,
        dispatch = _ref5.dispatch,
        getters = _ref5.getters,
        state = _ref5.state,
        rootGetters = _ref5.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("so/plans", param).then(function (response) {
        // console.log(response.data);
        resolve();
        if (response.data.isOk) dispatch("getPlans");
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
    state.sos = data.sos;
    state.users = data.users;
  },
  setConfig: function setConfig(state, data) {
    state.config = data;
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