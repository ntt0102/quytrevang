(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/CreateAccount.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/auth/CreateAccount.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/form */ "./node_modules/devextreme-vue/form.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_recaptcha__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-recaptcha */ "./node_modules/vue-recaptcha/dist/vue-recaptcha.es.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxForm: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1___default.a,
    DxItem: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__["DxItem"],
    VueRecaptcha: vue_recaptcha__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      passwordMode: true,
      siteKey: "6LcjtyobAAAAAEEEa6vHHPQZU9Nf_SoaXBRsCRr5",
      isReCaptchaVerified: false,
      formData: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      validationRules: {
        name: [{
          type: "required",
          message: this.$t("models.user.name") + this.$mt.validations.required
        }, {
          type: "stringLength",
          max: 50,
          message: this.$t("models.user.validations.name")
        }],
        email: [{
          type: "required",
          message: this.$t("models.user.email") + this.$mt.validations.required
        }, {
          type: "email",
          message: this.$t("models.user.email") + this.$mt.validations.email
        }, {
          type: "async",
          validationCallback: this.validateDuplicateEmail,
          message: this.$t("models.user.email") + this.$mt.validations.duplicate
        }],
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
    var _this = this;
    setTimeout(function () {
      return _this.form.getEditor("name").focus();
    }, 500);
    this.$mf.includeScript("on", {
      src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
      id: "recaptcha"
    });
  },
  destroyed: function destroyed() {
    this.$mf.includeScript("off", "recaptcha");
  },
  computed: {
    form: function form() {
      return this.$refs.form.instance;
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Auth", ["createAccount", "validateDuplicateEmail"])), {}, {
    onSubmit: function onSubmit() {
      var _this2 = this;
      this.checkSpam(this.formData.email).then(function (isNotSpam) {
        if (isNotSpam) {
          if (_this2.isReCaptchaVerified) {
            _this2.createAccount(_this2.formData).then(function (isOk) {
              if (isOk) {
                _this2.$router.push({
                  name: _this2.$route.query.redirect || "overview"
                });
              }
            });
          } else _this2.$toasted.show(_this2.$t("messages.warning.unVerifiedReCaptcha"));
        }
      });
    },
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
    onVerify: function onVerify(response) {
      this.isReCaptchaVerified = true;
    },
    onExpired: function onExpired() {
      this.isReCaptchaVerified = false;
    },
    checkSpam: function checkSpam(email) {
      return new Promise(function (resolve, reject) {
        fetch("https://api.stopforumspam.org/api?email=".concat(email)).then(function (response) {
          return response.text();
        }).then(function (text) {
          var appears = text.substring(text.lastIndexOf("<appears>") + "<appears>".length, text.lastIndexOf("</appears>"));
          resolve(appears === "no");
        });
      });
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/CreateAccount.vue?vue&type=template&id=7d255f89&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/auth/CreateAccount.vue?vue&type=template&id=7d255f89& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("div", {
    staticClass: "header"
  }, [_c("div", {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t("auth.createAccount.title")))])]), _vm._v(" "), _c("form", {
    staticClass: "create-account-form",
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.onSubmit.apply(null, arguments);
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
      "data-field": "name",
      "editor-type": "dxTextBox",
      "validation-rules": _vm.validationRules.name,
      label: {
        text: _vm.$t("models.user.name")
      }
    }
  }), _vm._v(" "), _c("DxItem", {
    attrs: {
      "data-field": "email",
      "editor-type": "dxTextBox",
      "editor-options": {
        mode: "email"
      },
      "validation-rules": _vm.validationRules.email,
      label: {
        text: _vm.$t("models.user.email")
      }
    }
  }), _vm._v(" "), _c("DxItem", {
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
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn() {
        return [_c("div", {
          staticClass: "policy-info"
        }, [_vm._v("\n            " + _vm._s(_vm.$t("auth.createAccount.policy")) + "\n            "), _c("RouterLink", {
          attrs: {
            to: {
              name: "policy",
              hash: "#terms"
            }
          }
        }, [_vm._v(_vm._s(_vm.$t("policy.terms.title")))]), _vm._v(_vm._s(_vm.$t("auth.createAccount.and"))), _c("RouterLink", {
          attrs: {
            to: {
              name: "policy",
              hash: "#privacy"
            }
          }
        }, [_vm._v(_vm._s(_vm.$t("policy.privacy.title")))]), _vm._v(_vm._s(_vm.$t("auth.createAccount.our")) + "\n          ")], 1)];
      },
      proxy: true
    }])
  }), _vm._v(" "), _c("DxItem", {
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn() {
        return [_c("div", {
          staticClass: "recaptcha-container"
        }, [_c("VueRecaptcha", {
          ref: "recaptcha",
          attrs: {
            theme: "dark",
            size: "compact",
            sitekey: _vm.siteKey
          },
          on: {
            verify: _vm.onVerify,
            expired: _vm.onExpired
          }
        })], 1)];
      },
      proxy: true
    }])
  }), _vm._v(" "), _c("DxItem", {
    attrs: {
      "item-type": "button",
      "button-options": {
        width: "100%",
        type: "default",
        text: _vm.$t("auth.createAccount.submit"),
        useSubmitBehavior: true
      }
    }
  }), _vm._v(" "), _c("DxItem", {
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn() {
        return [_c("div", {
          staticClass: "login-link"
        }, [_vm._v("\n            " + _vm._s(_vm.$t("auth.createAccount.haveAccount")) + "\n            "), _c("RouterLink", {
          attrs: {
            to: {
              name: "login"
            }
          }
        }, [_vm._v(_vm._s(_vm.$t("auth.createAccount.login")))])], 1)];
      },
      proxy: true
    }])
  })], 1)], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/auth/CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".create-account-form .dx-field-item:not(.dx-field-item-has-group):not(.dx-field-item-has-tabs):not(.dx-first-row):not(.dx-label-v-align) {\n  padding-top: 10px;\n}\n.create-account-form .policy-info {\n  margin: 10px 0;\n  color: rgba(255, 255, 255, 0.7);\n  font-style: normal;\n  text-align: justify;\n}\n.create-account-form .policy-info a {\n  color: rgba(255, 255, 255, 0.7);\n}\n.create-account-form .login-link {\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 16px;\n  text-align: center;\n}\n.create-account-form .dx-button-text {\n  display: inline;\n  vertical-align: middle;\n}\n.create-account-form .dx-button-submit-input {\n  display: none;\n}\n.create-account-form .recaptcha-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.create-account-form .fa-eye {\n  font-size: 18px;\n}\n.create-account-form .fa-eye-slash {\n  font-size: 18px;\n}", ""]);

// exports
exports.locals = {
	"baseAccent": "#ff5722"
};

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/auth/CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss&");

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

/***/ "./resources/js/views/auth/CreateAccount.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/auth/CreateAccount.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CreateAccount_vue_vue_type_template_id_7d255f89___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateAccount.vue?vue&type=template&id=7d255f89& */ "./resources/js/views/auth/CreateAccount.vue?vue&type=template&id=7d255f89&");
/* harmony import */ var _CreateAccount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateAccount.vue?vue&type=script&lang=js& */ "./resources/js/views/auth/CreateAccount.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _CreateAccount_vue_vue_type_style_index_0_id_7d255f89_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss& */ "./resources/js/views/auth/CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CreateAccount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CreateAccount_vue_vue_type_template_id_7d255f89___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CreateAccount_vue_vue_type_template_id_7d255f89___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/auth/CreateAccount.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/auth/CreateAccount.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/auth/CreateAccount.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateAccount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CreateAccount.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/CreateAccount.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateAccount_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/auth/CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/auth/CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateAccount_vue_vue_type_style_index_0_id_7d255f89_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/CreateAccount.vue?vue&type=style&index=0&id=7d255f89&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateAccount_vue_vue_type_style_index_0_id_7d255f89_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateAccount_vue_vue_type_style_index_0_id_7d255f89_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateAccount_vue_vue_type_style_index_0_id_7d255f89_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateAccount_vue_vue_type_style_index_0_id_7d255f89_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/auth/CreateAccount.vue?vue&type=template&id=7d255f89&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/auth/CreateAccount.vue?vue&type=template&id=7d255f89& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateAccount_vue_vue_type_template_id_7d255f89___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./CreateAccount.vue?vue&type=template&id=7d255f89& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/auth/CreateAccount.vue?vue&type=template&id=7d255f89&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateAccount_vue_vue_type_template_id_7d255f89___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateAccount_vue_vue_type_template_id_7d255f89___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);