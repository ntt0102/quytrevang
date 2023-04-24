(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Parameters.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Settings/Parameters.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_modules_Admin_Settings_Parameters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../store/modules/Admin/Settings/Parameters */ "./resources/js/store/modules/Admin/Settings/Parameters.js");
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



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxDataGrid: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxDataGrid"],
    DxColumn: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxColumn"]
  },
  data: function data() {
    return {
      gridData: null,
      validationRules: {
        value: [{
          type: "required",
          message: this.$t("admin.settings.parameters.value") + this.$mt.validations.required
        }]
      }
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.settings.parameters", _store_modules_Admin_Settings_Parameters__WEBPACK_IMPORTED_MODULE_2__["default"]);
  },
  created: function created() {
    this.fetch();
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Admin.settings.parameters");
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.settings.parameters", ["parameters"])), {}, {
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    }
  }),
  watch: {
    parameters: function parameters() {
      this.cloneDeepData();
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.settings.parameters", ["fetch", "save", "resetState"])), {}, {
    onSave: function onSave(formData) {
      var _this = this;

      this.$bus.emit("checkPin", function () {
        return _this.save(formData);
      });
    },
    cloneDeepData: function cloneDeepData() {
      this.gridData = this.$mf.cloneDeep(this.parameters);
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Parameters.vue?vue&type=template&id=290e4da7&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Settings/Parameters.vue?vue&type=template&id=290e4da7& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
          allowAdding: false,
          allowUpdating: true,
          allowDeleting: false,
          mode: "batch",
          startEditAction: "dblClick"
        }
      },
      on: {
        contentReady: function($event) {
          return _vm.$mf.dataGridPreload(_vm.gridData, _vm.dataGrid)
        },
        saved: _vm.onSave
      }
    },
    [
      _c("DxColumn", {
        attrs: {
          "allow-editing": false,
          "data-field": "description",
          "header-filter": { allowSearch: true },
          caption: _vm.$t("admin.settings.parameters.description")
        }
      }),
      _vm._v(" "),
      _c("DxColumn", {
        attrs: {
          "data-field": "value",
          caption: _vm.$t("admin.settings.parameters.value"),
          "validation-rules": _vm.validationRules.value
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/store/modules/Admin/Settings/Parameters.js":
/*!*****************************************************************!*\
  !*** ./resources/js/store/modules/Admin/Settings/Parameters.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function initialState() {
  return {
    parameters: []
  };
}

var getters = {
  parameters: function parameters(state) {
    return state.parameters;
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
      axios.get("settings/parameters").then(function (response) {
        // console.log(response.data);
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
      axios.post("settings/parameters", {
        changes: param.changes
      }).then(function (response) {
        // console.log(response.data);
        resolve();
        dispatch("fetch");
      });
    });
  },
  resetState: function resetState(_ref3) {
    var commit = _ref3.commit;
    commit("resetState");
  }
};
var mutations = {
  setState: function setState(state, data) {
    state.parameters = data;
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

/***/ "./resources/js/views/admin/Settings/Parameters.vue":
/*!**********************************************************!*\
  !*** ./resources/js/views/admin/Settings/Parameters.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Parameters_vue_vue_type_template_id_290e4da7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Parameters.vue?vue&type=template&id=290e4da7& */ "./resources/js/views/admin/Settings/Parameters.vue?vue&type=template&id=290e4da7&");
/* harmony import */ var _Parameters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Parameters.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Settings/Parameters.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Parameters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Parameters_vue_vue_type_template_id_290e4da7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Parameters_vue_vue_type_template_id_290e4da7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Settings/Parameters.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Settings/Parameters.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/admin/Settings/Parameters.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Parameters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Parameters.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Parameters.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Parameters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Settings/Parameters.vue?vue&type=template&id=290e4da7&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/admin/Settings/Parameters.vue?vue&type=template&id=290e4da7& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Parameters_vue_vue_type_template_id_290e4da7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Parameters.vue?vue&type=template&id=290e4da7& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings/Parameters.vue?vue&type=template&id=290e4da7&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Parameters_vue_vue_type_template_id_290e4da7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Parameters_vue_vue_type_template_id_290e4da7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);