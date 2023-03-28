(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[63],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Smartorders.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Smartorders.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_modules_Admin_SmartOrders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/modules/Admin/SmartOrders */ "./resources/js/store/modules/Admin/SmartOrders.js");
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

 // import TransactionFinbookPopup from "../../components/Popups/TransactionFinbookPopup.vue";


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxDataGrid: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxDataGrid"],
    DxColumn: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxColumn"] // TransactionFinbookPopup

  },
  data: function data() {
    return {
      gridData: null,
      validationRules: {
        user: [{
          type: "required",
          message: this.$t("admin.smartorders.user") + this.$mt.validations.required
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
    this.$store.registerModule("Admin.smartorders", _store_modules_Admin_SmartOrders__WEBPACK_IMPORTED_MODULE_2__["default"]);
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
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.smartorders", ["fetch", "save", "resetState"])), {}, {
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
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Smartorders.vue?vue&type=template&id=1af2e91f&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Smartorders.vue?vue&type=template&id=1af2e91f& ***!
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
  return _c("div", { staticClass: "smartorders-page" }, [
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
                              icon: "far fa-envelope-open-dollar small",
                              hint: _vm.$t(
                                "admin.smartorders.createTransaction"
                              ),
                              text: _vm.$t(
                                "admin.smartorders.createTransaction"
                              ),
                              onClick: function() {
                                return _vm.$refs.transactionFinbookPopup.show(
                                  data.data
                                )
                              }
                            }
                          },
                          {
                            visible: data.data.balance == 0,
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
                dataType: "string",
                "header-filter": { allowSearch: true },
                caption: _vm.$t("admin.smartorders.deviceLimit"),
                "validation-rules": _vm.validationRules.deviceLimit
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
            })
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



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
    users: []
  };
}

var getters = {
  sos: function sos(state) {
    return state.sos;
  },
  users: function users(state) {
    return state.users;
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
        console.log(response.data);
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
      axios.post("so/manage", param).then(function (response) {
        // console.log(response.data);
        resolve();
        if (response.data.isOk) dispatch("fetch");
      });
    });
  },
  getFinbooksName: function getFinbooksName(_ref3) {
    var commit = _ref3.commit,
        dispatch = _ref3.dispatch,
        getters = _ref3.getters,
        state = _ref3.state,
        rootGetters = _ref3.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("finbooks/name", null, {
        noLoading: true
      }).then(function (response) {
        // console.log(response.data);
        resolve(response.data);
      });
    });
  },
  updateBalance: function updateBalance(_ref4, param) {
    var commit = _ref4.commit,
        dispatch = _ref4.dispatch,
        getters = _ref4.getters,
        state = _ref4.state,
        rootGetters = _ref4.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("finbooks/update-balance", param).then(function (response) {
        // console.log(response.data);
        resolve(response.data.isOk);
        if (response.data.isOk) dispatch("fetch");
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
    state.sos = data.sos;
    state.users = data.users;
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

/***/ "./resources/js/views/admin/Smartorders.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/admin/Smartorders.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Smartorders_vue_vue_type_template_id_1af2e91f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Smartorders.vue?vue&type=template&id=1af2e91f& */ "./resources/js/views/admin/Smartorders.vue?vue&type=template&id=1af2e91f&");
/* harmony import */ var _Smartorders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Smartorders.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Smartorders.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Smartorders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Smartorders_vue_vue_type_template_id_1af2e91f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Smartorders_vue_vue_type_template_id_1af2e91f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Smartorders.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Smartorders.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/admin/Smartorders.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Smartorders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Smartorders.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Smartorders.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Smartorders_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Smartorders.vue?vue&type=template&id=1af2e91f&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/admin/Smartorders.vue?vue&type=template&id=1af2e91f& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Smartorders_vue_vue_type_template_id_1af2e91f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Smartorders.vue?vue&type=template&id=1af2e91f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Smartorders.vue?vue&type=template&id=1af2e91f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Smartorders_vue_vue_type_template_id_1af2e91f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Smartorders_vue_vue_type_template_id_1af2e91f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);