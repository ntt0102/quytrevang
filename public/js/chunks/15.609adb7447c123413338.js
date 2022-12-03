(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/UserDetailPopup.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/UserDetailPopup.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! devextreme-vue/form */ "./node_modules/devextreme-vue/form.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_form__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/text-area */ "./node_modules/devextreme-vue/text-area.js");
/* harmony import */ var devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    DxForm: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_0__["DxForm"],
    DxItem: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_0__["DxItem"],
    DxTab: devextreme_vue_form__WEBPACK_IMPORTED_MODULE_0__["DxTab"],
    DxTextArea: devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_1___default.a
  },
  data: function data() {
    return {
      isLoading: false,
      formData: {
        url_documents: []
      }
    };
  },
  computed: {
    popup: function popup() {
      return this.$refs.popup.instance;
    },
    hasConfirmedDocs: function hasConfirmedDocs() {
      return this.formData.url_documents.length > 0;
    }
  },
  methods: {
    show: function show(_ref) {
      var _this = this;

      var user = _ref.user,
          getUser = _ref.getUser;

      if (!user) {
        this.popup.option("title", this.$t("admin.users.detailUser"));
        this.popup.show();
        this.isLoading = true;
        getUser().then(function (data) {
          _this.formData = data;
          _this.isLoading = false;
        });
      } else {
        this.popup.option("title", "".concat(this.$t("admin.users.detailUser"), " #").concat(user.code));
        this.formData = user;
        this.popup.show();
      }

      this.$mf.pushPopupToHistoryState(function () {
        return _this.popup.hide();
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/UserDetailPopup.vue?vue&type=template&id=55e21d5a&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/UserDetailPopup.vue?vue&type=template&id=55e21d5a& ***!
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
    attrs: {
      showCloseButton: true,
      fullScreen: _vm.$devices.phone ? true : false,
      "show-title": true
    },
    on: { hiding: _vm.$mf.popRouteHistoryState },
    scopedSlots: _vm._u([
      {
        key: "content",
        fn: function() {
          return [
            _c(
              "div",
              [
                _c(
                  "DxForm",
                  {
                    ref: "form",
                    staticClass: "user-detail-form",
                    attrs: {
                      "form-data": _vm.formData,
                      "col-count": 2,
                      "read-only": true,
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
                            label: { text: _vm.$t("models.user.name") }
                          }
                        }),
                        _vm._v(" "),
                        _c("DxItem", {
                          attrs: {
                            "data-field": "sex",
                            "editor-type": "dxSelectBox",
                            "editor-options": {
                              items: _vm.$mf.getSexList(),
                              displayExpr: "name",
                              valueExpr: "value"
                            },
                            label: { text: _vm.$t("models.user.sex") }
                          }
                        }),
                        _vm._v(" "),
                        _c("DxItem", {
                          attrs: {
                            "data-field": "birthday",
                            "editor-type": "dxDateBox",
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
                            label: { text: _vm.$t("models.user.idNumber") }
                          }
                        }),
                        _vm._v(" "),
                        _c("DxItem", {
                          attrs: {
                            "data-field": "identity.issued_on",
                            "editor-type": "dxDateBox",
                            label: { text: _vm.$t("models.user.idIssuedOn") }
                          }
                        }),
                        _vm._v(" "),
                        _c("DxItem", {
                          attrs: {
                            "data-field": "",
                            editorOptions: {
                              value: _vm.$mt.idIssuedAtValue
                            },
                            label: { text: _vm.$t("models.user.idIssuedAt") }
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
                              mask: !!_vm.formData.phone ? "0000.000.000" : null
                            },
                            label: { text: _vm.$t("models.user.phone") }
                          }
                        }),
                        _vm._v(" "),
                        _c("DxItem", {
                          attrs: {
                            "data-field": "email",
                            label: { text: _vm.$t("models.user.email") }
                          }
                        }),
                        _vm._v(" "),
                        _c("DxItem", {
                          attrs: {
                            "col-span": 2,
                            "data-field": "address",
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
                          caption: _vm.$t("models.user.groups.bankInfo")
                        }
                      },
                      [
                        _c("DxItem", {
                          attrs: {
                            "data-field": "bank_account.bank_name",
                            label: { text: _vm.$t("models.user.bankName") }
                          }
                        }),
                        _vm._v(" "),
                        _c("DxItem", {
                          attrs: {
                            "data-field": "bank_account.account_number",
                            label: { text: _vm.$t("models.user.accountNumber") }
                          }
                        }),
                        _vm._v(" "),
                        _c("DxItem", {
                          attrs: {
                            "data-field": "bank_account.account_name",
                            label: { text: _vm.$t("models.user.accountName") }
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
                          visible: _vm.hasConfirmedDocs,
                          "item-type": "group",
                          "col-span": 2,
                          caption: _vm.$t("models.user.groups.confirmDocuments")
                        }
                      },
                      [
                        _c("DxItem", {
                          scopedSlots: _vm._u([
                            {
                              key: "default",
                              fn: function() {
                                return [
                                  _c(
                                    "Photoswipe",
                                    {
                                      on: {
                                        opened:
                                          _vm.$mf.pushPhotoswipeToHistoryState,
                                        close: _vm.$mf.popRouteHistoryState
                                      }
                                    },
                                    _vm._l(_vm.formData.url_documents, function(
                                      image,
                                      index
                                    ) {
                                      return _c("div", { key: index }, [
                                        _c("img", {
                                          directives: [
                                            {
                                              name: "pswp",
                                              rawName: "v-pswp",
                                              value: image.file,
                                              expression: "image.file"
                                            }
                                          ],
                                          attrs: {
                                            src: image.file,
                                            alt: _vm.$appName
                                          }
                                        })
                                      ])
                                    }),
                                    0
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
                  ],
                  1
                ),
                _vm._v(" "),
                _c("DxLoadPanel", {
                  attrs: {
                    position: { of: ".user-detail-form" },
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Popups/UserDetailPopup.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/Popups/UserDetailPopup.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserDetailPopup_vue_vue_type_template_id_55e21d5a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserDetailPopup.vue?vue&type=template&id=55e21d5a& */ "./resources/js/components/Popups/UserDetailPopup.vue?vue&type=template&id=55e21d5a&");
/* harmony import */ var _UserDetailPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserDetailPopup.vue?vue&type=script&lang=js& */ "./resources/js/components/Popups/UserDetailPopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserDetailPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserDetailPopup_vue_vue_type_template_id_55e21d5a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserDetailPopup_vue_vue_type_template_id_55e21d5a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Popups/UserDetailPopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Popups/UserDetailPopup.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Popups/UserDetailPopup.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetailPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserDetailPopup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/UserDetailPopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetailPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Popups/UserDetailPopup.vue?vue&type=template&id=55e21d5a&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Popups/UserDetailPopup.vue?vue&type=template&id=55e21d5a& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetailPopup_vue_vue_type_template_id_55e21d5a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserDetailPopup.vue?vue&type=template&id=55e21d5a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/UserDetailPopup.vue?vue&type=template&id=55e21d5a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetailPopup_vue_vue_type_template_id_55e21d5a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetailPopup_vue_vue_type_template_id_55e21d5a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);