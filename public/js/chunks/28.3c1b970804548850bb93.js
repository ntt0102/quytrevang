(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ListTagBox.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ListTagBox.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
var DxTagBox = function DxTagBox() {
  return __webpack_require__.e(/*! import() */ 55).then(__webpack_require__.t.bind(null, /*! devextreme-vue/tag-box */ "./node_modules/devextreme-vue/tag-box.js", 7));
};

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxTagBox: DxTagBox
  },
  props: {
    width: {
      type: Number,
      "default": function _default() {
        return 300;
      }
    },
    height: {
      type: Number,
      "default": function _default() {
        return 400;
      }
    },
    value: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    onValueChanged: {
      type: Function,
      "default": function _default() {
        return function () {};
      }
    },
    dataSource: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    dataGridComponent: {
      type: Object,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      currentValue: this.value
    };
  },
  methods: {
    onSelectionChanged: function onSelectionChanged() {
      this.dataGridComponent.updateDimensions();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Roles.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Settings/Roles.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_ListTagBox_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/ListTagBox.vue */ "./resources/js/components/ListTagBox.vue");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_modules_Admin_Settings_Roles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../store/modules/Admin/Settings/Roles */ "./resources/js/store/modules/Admin/Settings/Roles.js");
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




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ListTagBox: _components_ListTagBox_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    DxDataGrid: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_2__["DxDataGrid"],
    DxColumn: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_2__["DxColumn"]
  },
  data: function data() {
    return {
      gridData: null,
      calculateFilterExpression: function calculateFilterExpression(filterValue, selectedFilterOperation, target) {
        if (target === "search" && typeof filterValue === "string") {
          return [this.dataField, "contains", filterValue];
        }

        return function (data) {
          return (data.permissions || []).indexOf(filterValue) !== -1;
        };
      },
      validationRules: {
        name: [{
          type: "required",
          message: this.$t("admin.settings.roles.name") + this.$mt.validations.required
        }, {
          type: "async",
          validationCallback: this.validateDuplicateName,
          message: this.$t("admin.settings.roles.name") + this.$mt.validations.duplicate
        }],
        permissions: [{
          type: "required",
          message: this.$t("admin.settings.roles.permission") + this.$mt.validations.required
        }]
      }
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.settings.roles", _store_modules_Admin_Settings_Roles__WEBPACK_IMPORTED_MODULE_3__["default"]);
  },
  created: function created() {
    this.fetch();
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Admin.settings.roles");
  },
  watch: {
    roles: function roles() {
      this.cloneDeepData();
    }
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.settings.roles", ["roles", "permissions"])), {}, {
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.settings.roles", ["fetch", "save", "validateDuplicateName", "resetState"])), {}, {
    onSave: function onSave(formData) {
      var _this = this;

      this.$bus.emit("checkPin", function () {
        return _this.save(formData);
      });
    },
    cloneDeepData: function cloneDeepData() {
      this.gridData = this.$mf.cloneDeep(this.roles);
    },
    cellTemplate: function cellTemplate(container, options) {
      var noBreakSpace = "\xA0",
          text = (options.value || []).map(function (element) {
        return options.column.lookup.calculateCellValue(element);
      }).join(", ");
      container.textContent = text || noBreakSpace;
      container.title = text;
    },
    onValueChanged: function onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true& ***!
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
  return _c("DxTagBox", {
    attrs: {
      "data-source": _vm.dataSource,
      value: _vm.currentValue,
      "show-selection-controls": true,
      "max-displayed-tags": 3,
      "show-multi-tag-only": false,
      "on-value-changed": function(e) {
        return _vm.onValueChanged(e.value)
      },
      "on-selection-changed": _vm.onSelectionChanged,
      "search-enabled": true,
      dropDownOptions: { width: _vm.width, height: _vm.height }
    }
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Roles.vue?vue&type=template&id=7a908ce0&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Settings/Roles.vue?vue&type=template&id=7a908ce0&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
          key: "tagBoxEditor",
          fn: function(ref) {
            var cellInfo = ref.data
            return [
              _c("ListTagBox", {
                attrs: {
                  width: 300,
                  height: 400,
                  value: cellInfo.value,
                  "on-value-changed": function(value) {
                    return _vm.onValueChanged(value, cellInfo)
                  },
                  "data-source": _vm.permissions,
                  "data-grid-component": cellInfo.component
                }
              })
            ]
          }
        },
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
          caption: _vm.$t("admin.settings.roles.name"),
          "validation-rules": _vm.validationRules.name
        }
      }),
      _vm._v(" "),
      _c("DxColumn", {
        attrs: {
          "allow-sorting": false,
          "data-field": "permissions",
          "cell-template": _vm.cellTemplate,
          "calculate-filter-expression": _vm.calculateFilterExpression,
          "header-filter": { allowSearch: true },
          "edit-cell-template": "tagBoxEditor",
          caption: _vm.$t("admin.settings.roles.permission"),
          "validation-rules": _vm.validationRules.permissions,
          lookup: {
            dataSource: _vm.permissions
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/ListTagBox.vue":
/*!************************************************!*\
  !*** ./resources/js/components/ListTagBox.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ListTagBox_vue_vue_type_template_id_1e87233a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true& */ "./resources/js/components/ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true&");
/* harmony import */ var _ListTagBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListTagBox.vue?vue&type=script&lang=js& */ "./resources/js/components/ListTagBox.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ListTagBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ListTagBox_vue_vue_type_template_id_1e87233a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ListTagBox_vue_vue_type_template_id_1e87233a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1e87233a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ListTagBox.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ListTagBox.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/ListTagBox.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTagBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ListTagBox.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ListTagBox.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTagBox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTagBox_vue_vue_type_template_id_1e87233a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTagBox_vue_vue_type_template_id_1e87233a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTagBox_vue_vue_type_template_id_1e87233a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/store/modules/Admin/Settings/Roles.js":
/*!************************************************************!*\
  !*** ./resources/js/store/modules/Admin/Settings/Roles.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);


function initialState() {
  return {
    roles: [],
    permissions: []
  };
}

var getters = {
  roles: function roles(state) {
    return state.roles;
  },
  permissions: function permissions(state) {
    return state.permissions;
  }
};
var actions = {
  validateDuplicateName: function validateDuplicateName(_ref, param) {
    var state = _ref.state,
        rootGetters = _ref.rootGetters;
    var oldRole = state.roles.find(function (x) {
      return x.id === param.data.id;
    });
    if (!!oldRole && param.value == oldRole.name) return Promise.resolve(true);
    return new Promise(function (resolve, reject) {
      axios.post("settings/roles/validate-duplicate-name", {
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
      axios.get("settings/roles").then(function (response) {
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
      axios.post("settings/roles", {
        changes: param.changes
      }).then(function (response) {
        // console.log(response.data);
        resolve();
        dispatch("fetch");
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
    state.roles = data.roles;
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

/***/ "./resources/js/views/admin/Settings/Roles.vue":
/*!*****************************************************!*\
  !*** ./resources/js/views/admin/Settings/Roles.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Roles_vue_vue_type_template_id_7a908ce0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Roles.vue?vue&type=template&id=7a908ce0&scoped=true& */ "./resources/js/views/admin/Settings/Roles.vue?vue&type=template&id=7a908ce0&scoped=true&");
/* harmony import */ var _Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Roles.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Settings/Roles.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Roles_vue_vue_type_template_id_7a908ce0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Roles_vue_vue_type_template_id_7a908ce0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7a908ce0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Settings/Roles.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Settings/Roles.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/admin/Settings/Roles.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Roles.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Roles.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Settings/Roles.vue?vue&type=template&id=7a908ce0&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/js/views/admin/Settings/Roles.vue?vue&type=template&id=7a908ce0&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_template_id_7a908ce0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Roles.vue?vue&type=template&id=7a908ce0&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Roles.vue?vue&type=template&id=7a908ce0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_template_id_7a908ce0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_template_id_7a908ce0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},0,[55]]);