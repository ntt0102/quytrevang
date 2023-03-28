(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=script&lang=js& ***!
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


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxDataGrid: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxDataGrid"],
    DxColumn: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxColumn"]
  },
  data: function data() {
    return {
      gridData: null,
      validationRules: {
        name: [{
          type: "required",
          message: this.$t("admin.smartorders.planName") + this.$mt.validations.required
        }],
        months: [{
          type: "required",
          message: this.$t("admin.smartorders.months") + this.$mt.validations.required
        }],
        price: [{
          type: "required",
          message: this.$t("admin.smartorders.planPrice") + this.$mt.validations.required
        }],
        renewalPrice: [{
          type: "required",
          message: this.$t("admin.smartorders.renewalPrice") + this.$mt.validations.required
        }],
        highestPrice: [{
          type: "required",
          message: this.$t("admin.smartorders.highestPrice") + this.$mt.validations.required
        }]
      }
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.smartorders", ["plans"])), {}, {
    popup: function popup() {
      return this.$refs.popup.instance;
    },
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    }
  }),
  watch: {
    plans: function plans() {
      this.gridData = this.$mf.cloneDeep(this.plans);
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.smartorders", ["getPlans", "savePlans"])), {}, {
    show: function show() {
      var _this = this;

      this.popup.show();
      this.getPlans(); // this.getPlans().then(() => {
      //     this.gridData = this.$mf.cloneDeep(this.plans);
      // });

      this.$mf.pushPopupToHistoryState(function () {
        return _this.popup.hide();
      });
    },
    onSave: function onSave(e) {
      var _this2 = this;

      setTimeout(function () {
        return _this2.$bus.emit("checkPin", function () {
          return _this2.savePlans({
            changes: e.changes
          });
        });
      }, 100);
    },
    onHiding: function onHiding() {
      this.gridData = null;
      this.$mf.popRouteHistoryState();
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/SmartOrders.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/SmartOrders.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Popups_PricePlansPopup_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Popups/PricePlansPopup.vue */ "./resources/js/components/Popups/PricePlansPopup.vue");
/* harmony import */ var _store_modules_Admin_SmartOrders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/modules/Admin/SmartOrders */ "./resources/js/store/modules/Admin/SmartOrders.js");
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




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxDataGrid: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxDataGrid"],
    DxColumn: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxColumn"],
    PricePlansPopup: _components_Popups_PricePlansPopup_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      gridData: null,
      validationRules: {
        user: [{
          type: "required",
          message: this.$t("admin.smartorders.user") + this.$mt.validations.required
        }, {
          type: "async",
          validationCallback: this.validateDuplicateUser,
          message: this.$t("admin.smartorders.user") + this.$mt.validations.duplicate
        }],
        balance: [{
          type: "periods",
          message: this.$t("admin.smartorders.periods") + this.$mt.validations.required
        }],
        lastTransaction: [{
          type: "deviceLimit",
          message: this.$t("admin.smartorders.deviceLimit") + this.$mt.validations.required
        }],
        startedAt: [{
          type: "required",
          message: this.$t("admin.smartorders.startedAt") + this.$mt.validations.required
        }]
      }
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.smartorders", _store_modules_Admin_SmartOrders__WEBPACK_IMPORTED_MODULE_3__["default"]);
  },
  created: function created() {
    this.fetch();
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Admin.smartorders");
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.smartorders", ["sos", "users"])), {}, {
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    }
  }),
  watch: {
    sos: function sos() {
      this.cloneDeepData();
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.smartorders", ["fetch", "validateDuplicateUser", "save"])), {}, {
    onSave: function onSave(e) {
      var _this = this;

      this.$bus.emit("checkPin", function () {
        return _this.save({
          changes: e.changes
        });
      });
    },
    cloneDeepData: function cloneDeepData() {
      this.gridData = this.$mf.cloneDeep(this.sos);
    },
    onInitNewRow: function onInitNewRow(e) {
      e.data.last_transaction = this.$t("admin.smartorders.openNewBook");
    },
    onToolbarPreparing: function onToolbarPreparing(e) {
      var _this2 = this;

      e.toolbarOptions.items.unshift({
        location: "before",
        widget: "dxButton",
        options: {
          icon: "far fa-tags small",
          hint: this.$t("admin.smartorders.pricePlans"),
          onClick: function onClick() {
            _this2.$refs.pricePlansPopup.show();
          }
        }
      });
    }
  })
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=style&index=0&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".price-plans-popup .dx-popup-content {\n  padding: 0;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=style&index=0&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./PricePlansPopup.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=template&id=47bd284e&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=template&id=47bd284e& ***!
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
    staticClass: "price-plans-popup",
    attrs: {
      showCloseButton: true,
      fullScreen: _vm.$devices.phone ? true : false,
      "show-title": true,
      title: _vm.$t("admin.smartorders.pricePlans")
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
                          allowAdding: true,
                          allowUpdating: true,
                          allowDeleting: true,
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
                          "data-field": "name",
                          "data-type": "string",
                          caption: _vm.$t("admin.smartorders.planName"),
                          "validation-rules": _vm.validationRules.name
                        }
                      }),
                      _vm._v(" "),
                      _c("DxColumn", {
                        attrs: {
                          "data-field": "months",
                          "data-type": "number",
                          caption: _vm.$t("admin.smartorders.months"),
                          "validation-rules": _vm.validationRules.months
                        }
                      }),
                      _vm._v(" "),
                      _c("DxColumn", {
                        attrs: {
                          "data-field": "price",
                          "data-type": "number",
                          format: "#,##0",
                          "editor-options": {
                            step: "1000",
                            format: "#,##0"
                          },
                          caption: _vm.$t("admin.smartorders.planPrice"),
                          "validation-rules": _vm.validationRules.price
                        }
                      }),
                      _vm._v(" "),
                      _c("DxColumn", {
                        attrs: {
                          "data-field": "renewal_price",
                          "data-type": "number",
                          format: "#,##0",
                          "editor-options": {
                            step: "1000",
                            format: "#,##0"
                          },
                          caption: _vm.$t("admin.smartorders.renewalPrice"),
                          "validation-rules": _vm.validationRules.renewalPrice
                        }
                      }),
                      _vm._v(" "),
                      _c("DxColumn", {
                        attrs: {
                          "data-field": "highest_price",
                          "data-type": "number",
                          format: "#,##0",
                          "editor-options": {
                            step: "1000",
                            format: "#,##0"
                          },
                          caption: _vm.$t("admin.smartorders.highestPrice"),
                          "validation-rules": _vm.validationRules.highestPrice
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/SmartOrders.vue?vue&type=template&id=dc767582&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/SmartOrders.vue?vue&type=template&id=dc767582& ***!
  \***************************************************************************************************************************************************************************************************************/
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
    { staticClass: "smartorders-page" },
    [
      _c("h2", { staticClass: "content-block" }, [
        _vm._v(
          "\n        " + _vm._s(_vm.$t("admin.smartorders.title")) + "\n    "
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "content-block dx-card responsive-paddings" },
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
                "column-chooser": {
                  enabled: true,
                  mode: "select",
                  allowSearch: true
                },
                "column-resizing-mode": "widget",
                paging: { pageSize: 10 },
                headerFilter: { visible: true },
                loadPanel: { enabled: true },
                selection: { mode: "single" },
                editing: {
                  allowAdding: true,
                  allowUpdating: true,
                  allowDeleting: true,
                  confirmDelete: false,
                  mode: "batch"
                }
              },
              on: {
                contentReady: function($event) {
                  return _vm.$mf.dataGridPreload(_vm.gridData, _vm.dataGrid)
                },
                "init-new-row": _vm.onInitNewRow,
                "toolbar-preparing": _vm.onToolbarPreparing,
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
                                icon: "far fa-empty-set small",
                                hint: _vm.$t("admin.smartorders.clearDevices"),
                                text: _vm.$t("admin.smartorders.clearDevices"),
                                onClick: function() {
                                  return _vm.dataGrid.cellValue(
                                    data.rowIndex,
                                    "devices",
                                    []
                                  )
                                }
                              }
                            },
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
                                  return _vm.dataGrid.deleteRow(data.rowIndex)
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
                  width: _vm.$devices.phone ? 35 : 70,
                  alignment: "center",
                  type: "buttons",
                  cssClass: "dx-datagrid-command-column",
                  "cell-template": "commandCellTemplate",
                  caption: _vm.$t(
                    "titles.commandHeaderTitle" +
                      (_vm.$devices.phone ? "Short" : "")
                  )
                }
              }),
              _vm._v(" "),
              _c("DxColumn", {
                attrs: {
                  "data-field": "user_code",
                  dataType: "number",
                  name: "userCode",
                  "header-filter": { allowSearch: true },
                  caption: _vm.$t("admin.smartorders.user"),
                  "validation-rules": _vm.validationRules.user,
                  lookup: {
                    dataSource: _vm.users,
                    displayExpr: "name",
                    valueExpr: "code",
                    searchEnabled: true,
                    searchExpr: ["code", "name"]
                  }
                }
              }),
              _vm._v(" "),
              _c("DxColumn", {
                attrs: {
                  "data-field": "started_at",
                  "data-type": "date",
                  "editor-options": {
                    dateSerializationFormat: _vm.$mc.DX_SERVER_DATE_FORMAT
                  },
                  caption: _vm.$t("admin.smartorders.startedAt")
                }
              }),
              _vm._v(" "),
              _c("DxColumn", {
                attrs: {
                  "data-field": "periods",
                  dataType: "string",
                  "header-filter": { allowSearch: true },
                  caption: _vm.$t("admin.smartorders.periods"),
                  "validation-rules": _vm.validationRules.periods
                }
              }),
              _vm._v(" "),
              _c("DxColumn", {
                attrs: {
                  "data-field": "device_limit",
                  dataType: "number",
                  "header-filter": { allowSearch: true },
                  caption: _vm.$t("admin.smartorders.deviceLimit"),
                  "validation-rules": _vm.validationRules.deviceLimit
                }
              }),
              _vm._v(" "),
              _c("DxColumn", {
                attrs: {
                  visible: false,
                  "data-field": "devices",
                  dataType: "string",
                  "header-filter": { allowSearch: true },
                  caption: _vm.$t("admin.smartorders.devices")
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("PricePlansPopup", { ref: "pricePlansPopup" })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Popups/PricePlansPopup.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/Popups/PricePlansPopup.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PricePlansPopup_vue_vue_type_template_id_47bd284e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PricePlansPopup.vue?vue&type=template&id=47bd284e& */ "./resources/js/components/Popups/PricePlansPopup.vue?vue&type=template&id=47bd284e&");
/* harmony import */ var _PricePlansPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PricePlansPopup.vue?vue&type=script&lang=js& */ "./resources/js/components/Popups/PricePlansPopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _PricePlansPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PricePlansPopup.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/components/Popups/PricePlansPopup.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PricePlansPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PricePlansPopup_vue_vue_type_template_id_47bd284e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PricePlansPopup_vue_vue_type_template_id_47bd284e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Popups/PricePlansPopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Popups/PricePlansPopup.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Popups/PricePlansPopup.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PricePlansPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PricePlansPopup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PricePlansPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Popups/PricePlansPopup.vue?vue&type=style&index=0&lang=scss&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/components/Popups/PricePlansPopup.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PricePlansPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./PricePlansPopup.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PricePlansPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PricePlansPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PricePlansPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PricePlansPopup_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Popups/PricePlansPopup.vue?vue&type=template&id=47bd284e&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Popups/PricePlansPopup.vue?vue&type=template&id=47bd284e& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PricePlansPopup_vue_vue_type_template_id_47bd284e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PricePlansPopup.vue?vue&type=template&id=47bd284e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PricePlansPopup.vue?vue&type=template&id=47bd284e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PricePlansPopup_vue_vue_type_template_id_47bd284e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PricePlansPopup_vue_vue_type_template_id_47bd284e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/store/modules/Admin/SmartOrders.js":
/*!*********************************************************!*\
  !*** ./resources/js/store/modules/Admin/SmartOrders.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_moment__WEBPACK_IMPORTED_MODULE_0__);


function initialState() {
  return {
    sos: [],
    users: [],
    plans: []
  };
}

var getters = {
  sos: function sos(state) {
    return state.sos;
  },
  users: function users(state) {
    return state.users;
  },
  plans: function plans(state) {
    return state.plans;
  }
};
var actions = {
  fetch: function fetch(_ref) {
    var commit = _ref.commit,
        dispatch = _ref.dispatch,
        getters = _ref.getters,
        state = _ref.state,
        rootGetters = _ref.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("so/manage").then(function (response) {
        // console.log(response.data);
        commit("setState", response.data);
        resolve();
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
  setPlans: function setPlans(state, data) {
    state.plans = data.plans;
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

/***/ "./resources/js/views/admin/SmartOrders.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/admin/SmartOrders.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SmartOrders_vue_vue_type_template_id_dc767582___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SmartOrders.vue?vue&type=template&id=dc767582& */ "./resources/js/views/admin/SmartOrders.vue?vue&type=template&id=dc767582&");
/* harmony import */ var _SmartOrders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SmartOrders.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/SmartOrders.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SmartOrders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SmartOrders_vue_vue_type_template_id_dc767582___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SmartOrders_vue_vue_type_template_id_dc767582___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/SmartOrders.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/SmartOrders.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/admin/SmartOrders.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SmartOrders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./SmartOrders.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/SmartOrders.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SmartOrders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/SmartOrders.vue?vue&type=template&id=dc767582&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/admin/SmartOrders.vue?vue&type=template&id=dc767582& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SmartOrders_vue_vue_type_template_id_dc767582___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./SmartOrders.vue?vue&type=template&id=dc767582& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/SmartOrders.vue?vue&type=template&id=dc767582&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SmartOrders_vue_vue_type_template_id_dc767582___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SmartOrders_vue_vue_type_template_id_dc767582___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);