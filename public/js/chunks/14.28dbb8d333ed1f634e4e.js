(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/form */ "./node_modules/devextreme-vue/form.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxForm: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1___default.a,
    DxItem: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__["DxItem"]
  },
  data: function data() {
    return {
      passwordMode: true,
      formData: {
        password: "",
        password_confirmation: ""
      },
      validationRules: {
        password: [{
          type: "required",
          message: this.$t("models.user.password") + this.$mt.validations.required
        }],
        confirmPassword: [{
          type: "required",
          message: this.$t("models.user.password") + this.$mt.validations.required
        }, {
          type: "compare",
          comparisonTarget: this.passwordComparison,
          message: this.$t("models.user.password") + this.$mt.validations.match
        }]
      }
    };
  },
  mounted: function mounted() {
    this.setFocus();
  },
  computed: {
    form: function form() {
      return this.$refs.form.instance;
    }
  },
  methods: {
    passwordComparison: function passwordComparison() {
      return this.formData.password;
    },
    viewPasswordClick: function viewPasswordClick() {
      this.form.itemOption("password", {
        editorOptions: {
          mode: this.passwordMode ? "text" : "password",
          buttons: [{
            options: {
              icon: this.passwordMode ? "far fa-eye-slash" : "far fa-eye",
              onClick: this.viewPasswordClick
            },
            name: "btPw",
            location: "after"
          }]
        }
      });
      this.form.itemOption("password_confirmation", {
        editorOptions: {
          mode: this.passwordMode ? "text" : "password"
        }
      });
      this.passwordMode = !this.passwordMode;
    },
    setFocus: function setFocus() {
      var _this = this;
      setTimeout(function () {
        return _this.form.getEditor("password").focus();
      }, 500);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=template&id=559e63ba&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=template&id=559e63ba& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("form", {
    staticClass: "change-password",
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.$emit("onSubmit", _vm.formData);
      }
    }
  }, [_c("DxForm", {
    ref: "form",
    attrs: {
      "form-data": _vm.formData,
      labelMode: "floating"
    }
  }, [_c("DxItem", {
    attrs: {
      name: "password",
      "data-field": "password",
      "editor-type": "dxTextBox",
      "editor-options": {
        mode: "password",
        buttons: [{
          options: {
            icon: "far fa-eye",
            onClick: _vm.viewPasswordClick
          },
          name: "password",
          location: "after"
        }]
      },
      "validation-rules": _vm.validationRules.password,
      label: {
        text: _vm.$t("models.user.password")
      }
    }
  }), _vm._v(" "), _c("DxItem", {
    attrs: {
      name: "password_confirmation",
      "data-field": "password_confirmation",
      "editor-type": "dxTextBox",
      "editor-options": {
        mode: "password"
      },
      "validation-rules": _vm.validationRules.confirmPassword,
      label: {
        text: _vm.$t("models.user.confirmPassword")
      }
    }
  }), _vm._v(" "), _c("DxItem", {
    attrs: {
      "item-type": "button",
      "button-options": {
        width: "100%",
        type: "default",
        text: _vm.$t("components.changePassword.submit"),
        useSubmitBehavior: true
      }
    }
  })], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".change-password .fa-eye {\n  font-size: 18px;\n}\n.change-password .fa-eye-slash {\n  font-size: 18px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss&");

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

/***/ "./resources/js/components/Forms/ChangePasswordForm.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/Forms/ChangePasswordForm.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChangePasswordForm_vue_vue_type_template_id_559e63ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChangePasswordForm.vue?vue&type=template&id=559e63ba& */ "./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=template&id=559e63ba&");
/* harmony import */ var _ChangePasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChangePasswordForm.vue?vue&type=script&lang=js& */ "./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _ChangePasswordForm_vue_vue_type_style_index_0_id_559e63ba_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss& */ "./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ChangePasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ChangePasswordForm_vue_vue_type_template_id_559e63ba___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ChangePasswordForm_vue_vue_type_template_id_559e63ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Forms/ChangePasswordForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangePasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ChangePasswordForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangePasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangePasswordForm_vue_vue_type_style_index_0_id_559e63ba_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=style&index=0&id=559e63ba&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangePasswordForm_vue_vue_type_style_index_0_id_559e63ba_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangePasswordForm_vue_vue_type_style_index_0_id_559e63ba_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangePasswordForm_vue_vue_type_style_index_0_id_559e63ba_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangePasswordForm_vue_vue_type_style_index_0_id_559e63ba_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=template&id=559e63ba&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=template&id=559e63ba& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangePasswordForm_vue_vue_type_template_id_559e63ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./ChangePasswordForm.vue?vue&type=template&id=559e63ba& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Forms/ChangePasswordForm.vue?vue&type=template&id=559e63ba&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangePasswordForm_vue_vue_type_template_id_559e63ba___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangePasswordForm_vue_vue_type_template_id_559e63ba___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);