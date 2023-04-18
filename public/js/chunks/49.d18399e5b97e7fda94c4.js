(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Permissions.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Settings/Permissions.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_modules_Admin_Settings_Permissions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/modules/Admin/Settings/Permissions */ "./resources/js/store/modules/Admin/Settings/Permissions.js");
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
          message: this.$t("admin.settings.permissions.name") + this.$mt.validations.required
        }, {
          type: "async",
          validationCallback: this.validateDuplicateName,
          message: this.$t("admin.settings.permissions.name") + this.$mt.validations.duplicate
        }]
      }
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.settings.permissions", _store_modules_Admin_Settings_Permissions__WEBPACK_IMPORTED_MODULE_2__["default"]);
  },
  created: function created() {
    this.fetch();
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Admin.settings.permissions");
  },
  watch: {
    permissions: function permissions() {
      this.cloneDeepData();
    }
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.settings.permissions", ["permissions"])), {}, {
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.settings.permissions", ["fetch", "save", "validateDuplicateName", "resetState"])), {}, {
    onSave: function onSave(formData) {
      var _this = this;

      this.$bus.emit("checkPin", function () {
        return _this.save(formData);
      });
    },
    cloneDeepData: function cloneDeepData() {
      this.gridData = this.$mf.cloneDeep(this.permissions);
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Permissions.vue?vue&type=template&id=4ca8ab97&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Settings/Permissions.vue?vue&type=template&id=4ca8ab97&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
          mode: "batch",
          startEditAction: "dblClick"
        }
      },
      on: {
        contentReady: function($event) {
          return _vm.$mf.dataGridPreload(_vm.gridData, _vm.dataGrid)
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
          "header-filter": { allowSearch: true },
          caption: _vm.$t("admin.settings.permissions.name"),
          "validation-rules": _vm.validationRules.name
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/store/modules/Admin/Settings/Permissions.js":
/*!******************************************************************!*\
  !*** ./resources/js/store/modules/Admin/Settings/Permissions.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function initialState() {
  return {
    permissions: []
  };
}

var getters = {
  permissions: function permissions(state) {
    return state.permissions;
  }
};
var actions = {
  validateDuplicateName: function validateDuplicateName(_ref, param) {
    var state = _ref.state,
        rootGetters = _ref.rootGetters;
    var oldPermission = state.permissions.find(function (x) {
      return x.id === param.data.id;
    });
    if (!!oldPermission && param.value == oldPermission.name) return Promise.resolve(true);
    return new Promise(function (resolve, reject) {
      axios.post("settings/permissions/validate-duplicate-name", {
        name: param.value
      }, {
        noLoading: true
      }).then(function (response) {
        // console.log(response);
        resolve(response.data);
      });
    });
  },
  fetch: function fetch(_ref2) {
    var commit = _ref2.commit,
        dispatch = _ref2.dispatch,
        getters = _ref2.getters,
        state = _ref2.state,
        rootGetters = _ref2.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("settings/permissions").then(function (response) {
        // console.log(response.data);
        commit("setState", response.data);
        resolve();
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
      axios.post("settings/permissions", {
        changes: param.changes
      }).then(function (response) {
        // console.log(response.data);
        resolve();
        dispatch("fetch"); // dispatch("Admin.roles/fetch", null, { root: true });
      });
    });
  },
  resetState: function resetState(_ref4) {
    var commit = _ref4.commit;
    commit("resetState");
  }
};
var mutations = {
  setState: function setState(state, data) {
    state.permissions = data.permissions;
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

/***/ "./resources/js/views/admin/Settings/Permissions.vue":
/*!***********************************************************!*\
  !*** ./resources/js/views/admin/Settings/Permissions.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Permissions_vue_vue_type_template_id_4ca8ab97_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Permissions.vue?vue&type=template&id=4ca8ab97&scoped=true& */ "./resources/js/views/admin/Settings/Permissions.vue?vue&type=template&id=4ca8ab97&scoped=true&");
/* harmony import */ var _Permissions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Permissions.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Settings/Permissions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Permissions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Permissions_vue_vue_type_template_id_4ca8ab97_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Permissions_vue_vue_type_template_id_4ca8ab97_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4ca8ab97",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Settings/Permissions.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Settings/Permissions.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/admin/Settings/Permissions.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Permissions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Permissions.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Permissions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Permissions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Settings/Permissions.vue?vue&type=template&id=4ca8ab97&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/views/admin/Settings/Permissions.vue?vue&type=template&id=4ca8ab97&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Permissions_vue_vue_type_template_id_4ca8ab97_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Permissions.vue?vue&type=template&id=4ca8ab97&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Permissions.vue?vue&type=template&id=4ca8ab97&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Permissions_vue_vue_type_template_id_4ca8ab97_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Permissions_vue_vue_type_template_id_4ca8ab97_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);