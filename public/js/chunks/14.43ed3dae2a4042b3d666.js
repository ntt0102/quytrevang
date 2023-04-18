(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/EditProfilePopup.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/EditProfilePopup.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/form */ "./node_modules/devextreme-vue/form.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! devextreme-vue/text-area */ "./node_modules/devextreme-vue/text-area.js");
/* harmony import */ var devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_2__);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    DxForm: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__["DxForm"],
    DxItem: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__["DxItem"],
    DxTextArea: devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_2___default.a
  },
  data: function data() {
    return {
      isLoading: false,
      formData: null,
      banks: [],
      validationRules: {
        name: [{
          type: "required",
          message: this.$t("models.user.name") + this.$mt.validations.required
        }, {
          type: "stringLength",
          max: 50,
          message: this.$t("models.user.validations.name")
        }],
        sex: [{
          type: "required",
          message: this.$t("models.user.sex") + this.$mt.validations.required
        }],
        birthday: [{
          type: "required",
          message: this.$t("models.user.birthday") + this.$mt.validations.required
        }, {
          type: "custom",
          validationCallback: this.validateBirthday,
          message: this.$t("models.user.validations.birthday")
        }],
        idNumber: [{
          type: "required",
          message: this.$t("models.user.idNumber") + this.$mt.validations.required
        }, {
          type: "async",
          validationCallback: this.validateDuplicateIdNumber,
          message: this.$t("models.user.idNumber") + this.$mt.validations.duplicate
        }],
        idIssuedOn: [{
          type: "required",
          message: this.$t("models.user.idIssuedOn") + this.$mt.validations.required
        }, {
          type: "custom",
          validationCallback: this.validateIdIssuedOn,
          message: this.$t("models.user.validations.idIssuedOn")
        }],
        phone: [{
          type: "required",
          message: this.$t("models.user.phone") + this.$mt.validations.required
        }, {
          type: "async",
          validationCallback: this.validateDuplicatePhone,
          message: this.$t("models.user.phone") + this.$mt.validations.duplicate
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
        address: [{
          type: "required",
          message: this.$t("models.user.address") + this.$mt.validations.required
        }, {
          type: "stringLength",
          max: 100,
          message: this.$t("models.user.validations.address")
        }],
        bankAccount: {
          bankName: [{
            type: "required",
            message: this.$t("models.user.bankName") + this.$mt.validations.required
          }],
          accountName: [{
            type: "required",
            message: this.$t("models.user.accountName") + this.$mt.validations.required
          }],
          accountNumber: [{
            type: "required",
            message: this.$t("models.user.accountNumber") + this.$mt.validations.required
          }, {
            type: "numeric",
            message: this.$t("models.user.accountNumber") + this.$mt.validations.numeric
          }]
        }
      }
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("User.profile", ["profile"])), {}, {
    popup: function popup() {
      return this.$refs.popup.instance;
    },
    form: function form() {
      return this.$refs.form.instance;
    }
  }),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("User.profile", ["fetch", "save", "validateDuplicateEmail", "validateDuplicateIdNumber", "validateDuplicatePhone"])), {}, {
    show: function show() {
      var _this = this;

      this.isLoading = true;
      this.popup.show();
      this.fetch().then(function () {
        _this.formData = _this.$mf.cloneDeep(_this.profile);
        setTimeout(function () {
          return _this.form.getEditor("name").focus();
        }, 500);

        _this.$mf.getBanks().then(function (banks) {
          return _this.banks = banks;
        });

        _this.isLoading = false;
      });
      this.$mf.pushPopupToHistoryState(function () {
        return _this.popup.hide();
      });
    },
    onSubmit: function onSubmit() {
      var _this2 = this;

      this.$bus.emit("checkPin", function () {
        _this2.save(_this2.formData).then(function (isOk) {
          if (isOk) _this2.popup.hide();
        });
      });
    },
    validateBirthday: function validateBirthday(e) {
      return moment(e.value).isBefore(moment().subtract(18, "years"));
    },
    validateIdIssuedOn: function validateIdIssuedOn(e) {
      return moment(e.value).isBefore(moment().subtract(1, "day"));
    },
    saveClick: function saveClick() {
      this.form.getButton("submit").element().click();
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/EditProfilePopup.vue?vue&type=template&id=0cec707a&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/EditProfilePopup.vue?vue&type=template&id=0cec707a& ***!
  \**************************************************************************************************************************************************************************************************************************/
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
    [
      _c("DxPopup", {
        ref: "popup",
        attrs: {
          showCloseButton: true,
          fullScreen: _vm.$devices.phone ? true : false,
          "show-title": true,
          title: _vm.$t("components.editProfile.title"),
          toolbarItems: [
            {
              toolbar: "bottom",
              location: "after",
              widget: "dxButton",
              options: {
                text: _vm.$t("buttons.save"),
                onClick: function() {
                  return _vm.form
                    .getButton("submit")
                    .element()
                    .click()
                }
              }
            },
            {
              toolbar: "bottom",
              location: "after",
              widget: "dxButton",
              options: {
                text: _vm.$t("buttons.cancel"),
                onClick: function() {
                  return _vm.popup.hide()
                }
              }
            }
          ]
        },
        on: { hiding: _vm.$mf.popRouteHistoryState },
        scopedSlots: _vm._u([
          {
            key: "content",
            fn: function() {
              return [
                _c(
                  "form",
                  {
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        return _vm.onSubmit.apply(null, arguments)
                      }
                    }
                  },
                  [
                    _c("button", {
                      ref: "submit",
                      staticClass: "display-none"
                    }),
                    _vm._v(" "),
                    _c(
                      "DxForm",
                      {
                        ref: "form",
                        staticClass: "profile-form",
                        attrs: {
                          "form-data": _vm.formData,
                          labelMode: "floating",
                          "col-count": 2,
                          "label-location": _vm.$devices.phone ? "top" : "left",
                          "scrolling-enabled": true
                        }
                      },
                      [
                        _c(
                          "DxItem",
                          {
                            attrs: {
                              "item-type": "group",
                              caption: _vm.$t("models.user.groups.personalInfo")
                            }
                          },
                          [
                            _c("DxItem", {
                              attrs: {
                                "data-field": "name",
                                "validation-rules": _vm.validationRules.name,
                                label: { text: _vm.$t("models.user.name") }
                              }
                            }),
                            _vm._v(" "),
                            _c("DxItem", {
                              attrs: {
                                "data-field": "sex",
                                "editor-type": "dxSelectBox",
                                "editor-options": {
                                  searchEnabled: false,
                                  items: _vm.$mf.getSexList(),
                                  displayExpr: "name",
                                  valueExpr: "value",
                                  placeholder: _vm.$t(
                                    "titles.dxSelectPlacehoder"
                                  )
                                },
                                "validation-rules": _vm.validationRules.sex,
                                label: { text: _vm.$t("models.user.sex") }
                              }
                            }),
                            _vm._v(" "),
                            _c("DxItem", {
                              attrs: {
                                "data-field": "birthday",
                                "editor-type": "dxDateBox",
                                "editor-options": {
                                  dateSerializationFormat:
                                    _vm.$mc.DX_SERVER_DATE_FORMAT,
                                  showClearButton: "true",
                                  useMaskBehavior: "true"
                                },
                                "validation-rules":
                                  _vm.validationRules.birthday,
                                label: { text: _vm.$t("models.user.birthday") }
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "DxItem",
                          {
                            attrs: {
                              "item-type": "group",
                              caption: _vm.$t("models.user.groups.idInfo")
                            }
                          },
                          [
                            _c("DxItem", {
                              attrs: {
                                "data-field": "identity.number",
                                editorOptions: {
                                  mask: "000000000000"
                                },
                                "validation-rules":
                                  _vm.validationRules.idNumber,
                                label: { text: _vm.$t("models.user.idNumber") }
                              }
                            }),
                            _vm._v(" "),
                            _c("DxItem", {
                              attrs: {
                                "data-field": "identity.issued_on",
                                "editor-type": "dxDateBox",
                                "editor-options": {
                                  dateSerializationFormat:
                                    _vm.$mc.DX_SERVER_DATE_FORMAT,
                                  showClearButton: "true",
                                  useMaskBehavior: "true"
                                },
                                "validation-rules":
                                  _vm.validationRules.idIssuedOn,
                                label: {
                                  text: _vm.$t("models.user.idIssuedOn")
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("DxItem", {
                              attrs: {
                                "data-field": "",
                                editorOptions: {
                                  value: _vm.$mt.idIssuedAtValue,
                                  readOnly: true
                                },
                                label: {
                                  text: _vm.$t("models.user.idIssuedAt")
                                }
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "DxItem",
                          {
                            attrs: {
                              "item-type": "group",
                              "col-span": 2,
                              "col-count": 2,
                              caption: _vm.$t("models.user.groups.contactInfo")
                            }
                          },
                          [
                            _c("DxItem", {
                              attrs: {
                                "data-field": "phone",
                                editorOptions: {
                                  mask: "0000.000.000"
                                },
                                "validation-rules": _vm.validationRules.phone,
                                label: { text: _vm.$t("models.user.phone") }
                              }
                            }),
                            _vm._v(" "),
                            _c("DxItem", {
                              attrs: {
                                "data-field": "email",
                                "validation-rules": _vm.validationRules.email,
                                label: { text: _vm.$t("models.user.email") }
                              }
                            }),
                            _vm._v(" "),
                            _c("DxItem", {
                              attrs: {
                                "col-span": 2,
                                "data-field": "address",
                                "editor-type": "dxTextArea",
                                "validation-rules": _vm.validationRules.address,
                                label: { text: _vm.$t("models.user.address") }
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "DxItem",
                          {
                            attrs: {
                              "item-type": "group",
                              "col-span": 2,
                              "col-count": 2,
                              caption: _vm.$t("models.user.groups.bankInfo")
                            }
                          },
                          [
                            _c("DxItem", {
                              attrs: {
                                "data-field": "bank_account.bank_name",
                                "editor-type": "dxSelectBox",
                                "editor-options": {
                                  searchEnabled: true,
                                  items: _vm.banks,
                                  displayExpr: "short_name",
                                  searchExpr: "short_name",
                                  valueExpr: "short_name",
                                  placeholder: _vm.$t(
                                    "titles.dxSelectPlacehoder"
                                  )
                                },
                                "validation-rules":
                                  _vm.validationRules.bankAccount.bankName,
                                label: { text: _vm.$t("models.user.bankName") }
                              }
                            }),
                            _vm._v(" "),
                            _c("DxItem", {
                              attrs: {
                                "data-field": "bank_account.account_number",
                                "validation-rules":
                                  _vm.validationRules.bankAccount.accountNumber,
                                label: {
                                  text: _vm.$t("models.user.accountNumber")
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("DxItem", {
                              attrs: {
                                "data-field": "bank_account.account_name",
                                "editor-type": "dxTextBox",
                                "editor-options": {
                                  inputAttr: {
                                    style: "text-transform: uppercase"
                                  }
                                },
                                "validation-rules":
                                  _vm.validationRules.bankAccount.accountName,
                                label: {
                                  text: _vm.$t("models.user.accountName")
                                }
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("DxItem", {
                          attrs: {
                            name: "submit",
                            cssClass: "display-none",
                            "item-type": "button",
                            "button-options": {
                              useSubmitBehavior: true
                            }
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("DxLoadPanel", {
                      attrs: {
                        position: { of: ".profile-form" },
                        visible: _vm.isLoading,
                        shading: false
                      }
                    })
                  ],
                  1
                )
              ]
            },
            proxy: true
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Popups/EditProfilePopup.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/Popups/EditProfilePopup.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditProfilePopup_vue_vue_type_template_id_0cec707a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditProfilePopup.vue?vue&type=template&id=0cec707a& */ "./resources/js/components/Popups/EditProfilePopup.vue?vue&type=template&id=0cec707a&");
/* harmony import */ var _EditProfilePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditProfilePopup.vue?vue&type=script&lang=js& */ "./resources/js/components/Popups/EditProfilePopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditProfilePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditProfilePopup_vue_vue_type_template_id_0cec707a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditProfilePopup_vue_vue_type_template_id_0cec707a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Popups/EditProfilePopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Popups/EditProfilePopup.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/Popups/EditProfilePopup.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProfilePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditProfilePopup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/EditProfilePopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProfilePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Popups/EditProfilePopup.vue?vue&type=template&id=0cec707a&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/Popups/EditProfilePopup.vue?vue&type=template&id=0cec707a& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProfilePopup_vue_vue_type_template_id_0cec707a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditProfilePopup.vue?vue&type=template&id=0cec707a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/EditProfilePopup.vue?vue&type=template&id=0cec707a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProfilePopup_vue_vue_type_template_id_0cec707a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditProfilePopup_vue_vue_type_template_id_0cec707a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);