(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_FileManager_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/FileManager.vue */ "./resources/js/components/FileManager.vue");

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    FileManager: _components_FileManager_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      clientPath: "",
      callback: null,
      emitData: null
    };
  },
  computed: {
    popup: function popup() {
      return this.$refs.popup.instance;
    }
  },
  methods: {
    show: function show(_ref) {
      var _this = this;
      var clientPath = _ref.clientPath,
        callback = _ref.callback;
      this.clientPath = clientPath;
      this.callback = callback;
      this.popup.show();
      this.$mf.pushPopupToHistoryState(function () {
        return _this.popup.hide();
      });
    },
    onHiding: function onHiding() {
      if (typeof this.callback === "function") this.callback(this.emitData);
      this.$mf.popRouteHistoryState();
    },
    onCopiedUrl: function onCopiedUrl(copiedUrl) {
      this.emitData = copiedUrl;
      this.popup.hide();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Notification.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Settings/Notification.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/form */ "./node_modules/devextreme-vue/form.js");
/* harmony import */ var devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_form__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Popups_PickImagePopup_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Popups/PickImagePopup.vue */ "./resources/js/components/Popups/PickImagePopup.vue");
/* harmony import */ var _store_modules_Settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/modules/Settings */ "./resources/js/store/modules/Settings/index.js");
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
    PickImagePopup: _components_Popups_PickImagePopup_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      formData: {
        receiver: null,
        title: null,
        body: null,
        image: null,
        actions: [""]
      },
      actionOptions: null,
      addActionOptions: null,
      validationRules: {
        receiver: [{
          type: "required",
          message: this.$t("settings.notification.receiver") + this.$mt.validations.required
        }],
        title: [{
          type: "required",
          message: this.$t("settings.notification.notificationTitle") + this.$mt.validations.required
        }],
        body: [{
          type: "required",
          message: this.$t("settings.notification.body") + this.$mt.validations.required
        }]
      }
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Settings", _store_modules_Settings__WEBPACK_IMPORTED_MODULE_3__["default"]);
  },
  created: function created() {
    var _this = this;
    this.actionOptions = this.getActionsOptions(this.formData.actions);
    this.addActionOptions = {
      icon: "add",
      text: this.$t("buttons.add"),
      onClick: function onClick() {
        _this.formData.actions.push("");
        _this.actionOptions = _this.getActionsOptions(_this.formData.actions);
      }
    };
  },
  mounted: function mounted() {
    var _this2 = this;
    this.formData.receiver = this.$route.query.codes || null;
    setTimeout(function () {
      return _this2.form.getEditor("receiver").focus();
    }, 1000);
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Settings");
  },
  computed: {
    toolbar: function toolbar() {
      return this.$refs.toolbar.instance;
    },
    form: function form() {
      return this.$refs.form.instance;
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Settings", ["sendNotification"])), {}, {
    onSubmit: function onSubmit() {
      var _this3 = this;
      this.$bus.emit("checkPin", function () {
        _this3.sendNotification(_this3.formData);
      });
    },
    getActionsOptions: function getActionsOptions(actions) {
      var options = [];
      for (var i = 0; i < actions.length; i++) {
        options.push(this.generateNewActionOptions(i));
      }
      return options;
    },
    generateNewActionOptions: function generateNewActionOptions(index) {
      var _this4 = this;
      return {
        placeholder: this.$t("settings.notification.action.placeholder"),
        buttons: [{
          name: "trash",
          location: "after",
          options: {
            stylingMode: "text",
            icon: "trash",
            onClick: function onClick() {
              _this4.formData.actions.splice(index, 1);
              _this4.actionOptions = _this4.getActionsOptions(_this4.formData.actions);
            }
          }
        }]
      };
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("DxPopup", {
    ref: "popup",
    attrs: {
      showCloseButton: true,
      fullScreen: _vm.$devices.phone ? true : false,
      "show-title": true,
      title: _vm.$t("components.pickImage.title")
    },
    on: {
      hiding: _vm.onHiding
    },
    scopedSlots: _vm._u([{
      key: "content",
      fn: function fn() {
        return [_c("DxScrollView", [_c("FileManager", {
          attrs: {
            clientPath: _vm.clientPath
          },
          on: {
            copiedUrl: _vm.onCopiedUrl
          }
        })], 1)];
      },
      proxy: true
    }])
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Notification.vue?vue&type=template&id=45e72468&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Settings/Notification.vue?vue&type=template&id=45e72468&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "settings-page"
  }, [_c("h2", {
    staticClass: "content-block"
  }, [_vm._v("\n        " + _vm._s(_vm.$t("settings.notification.title")) + "\n    ")]), _vm._v(" "), _c("div", {
    staticClass: "content-block dx-card responsive-paddings"
  }, [_c("div", [_c("form", {
    staticClass: "setting-notification-tab",
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
      "label-location": _vm.$devices.phone ? "top" : "left",
      "scrolling-enabled": true
    }
  }, [_c("DxItem", {
    attrs: {
      "item-type": "group"
    }
  }, [_c("DxItem", {
    attrs: {
      "data-field": "receiver",
      "editor-type": "dxTextBox",
      "editor-options": {
        placeholder: _vm.$t("settings.notification.receiverPlaceholder"),
        buttons: [{
          options: {
            icon: "far fa-user",
            onClick: function onClick() {
              return _vm.$router.push({
                name: "users",
                query: {
                  selected: _vm.formData.receiver
                }
              });
            }
          },
          name: "selectUsers",
          location: "after"
        }]
      },
      "validation-rules": _vm.validationRules.receiver,
      label: {
        text: _vm.$t("settings.notification.receiver")
      }
    }
  }), _vm._v(" "), _c("DxItem", {
    attrs: {
      "data-field": "title",
      "validation-rules": _vm.validationRules.title,
      label: {
        text: _vm.$t("settings.notification.notificationTitle")
      }
    }
  }), _vm._v(" "), _c("DxItem", {
    attrs: {
      "data-field": "body",
      "validation-rules": _vm.validationRules.body,
      label: {
        text: _vm.$t("settings.notification.body")
      }
    }
  }), _vm._v(" "), _c("DxItem", {
    attrs: {
      "data-field": "image",
      "editor-type": "dxTextBox",
      "editor-options": {
        buttons: [{
          options: {
            icon: "far fa-image",
            onClick: function onClick() {
              return _vm.$refs.pickImagePopup.show({
                clientPath: "notifications",
                callback: function callback(url) {
                  return _vm.formData.image = url;
                }
              });
            }
          },
          name: "pickImage",
          location: "after"
        }]
      },
      label: {
        text: _vm.$t("settings.notification.image")
      }
    }
  })], 1), _vm._v(" "), _c("DxItem", {
    attrs: {
      "item-type": "group",
      caption: _vm.$t("settings.notification.action.title"),
      name: "actions-container"
    }
  }, [_c("DxItem", {
    attrs: {
      "item-type": "group",
      name: "actions"
    }
  }, _vm._l(_vm.actionOptions, function (action, index) {
    return _c("DxItem", {
      key: "action" + (index + 1),
      attrs: {
        "data-field": "actions[" + index + "]",
        "editor-options": action,
        label: {
          text: _vm.$t("settings.notification.action.title") + " " + (index + 1)
        }
      }
    });
  }), 1), _vm._v(" "), _c("DxItem", {
    attrs: {
      "item-type": "button",
      "button-options": _vm.addActionOptions,
      "horizontal-alignment": "left"
    }
  })], 1), _vm._v(" "), _c("DxItem", {
    attrs: {
      "item-type": "button",
      "button-options": {
        width: 100,
        left: 0,
        type: "default",
        icon: "far fa-paper-plane",
        text: _vm.$t("buttons.send"),
        useSubmitBehavior: true
      }
    }
  })], 1)], 1), _vm._v(" "), _c("PickImagePopup", {
    ref: "pickImagePopup"
  })], 1)])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Settings/Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".setting-notification-tab[data-v-45e72468] {\n  margin-top: 20px;\n  margin-left: 20px;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Settings/Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true&");

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

/***/ "./resources/js/components/Popups/PickImagePopup.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/Popups/PickImagePopup.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PickImagePopup.vue?vue&type=template&id=74bfbac2& */ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&");
/* harmony import */ var _PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PickImagePopup.vue?vue&type=script&lang=js& */ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Popups/PickImagePopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PickImagePopup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./PickImagePopup.vue?vue&type=template&id=74bfbac2& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/store/modules/Settings/index.js":
/*!******************************************************!*\
  !*** ./resources/js/store/modules/Settings/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function initialState() {
  return {};
}
var getters = {};
var actions = {
  backupDatabase: function backupDatabase(_ref, param) {
    var commit = _ref.commit,
      dispatch = _ref.dispatch,
      getters = _ref.getters,
      state = _ref.state,
      rootGetters = _ref.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("settings/database/backup", param).then(function (response) {
        // console.log(response.data);
        if (response.data.isOk == false) resolve(false);else {
          if (param.download) {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            var filename = response.headers["content-disposition"].split("=").pop();
            fileLink.setAttribute("download", filename);
            document.body.appendChild(fileLink);
            fileLink.click();
          }
          resolve(true);
        }
      });
    });
  },
  restoreDatabase: function restoreDatabase(_ref2, param) {
    var commit = _ref2.commit,
      dispatch = _ref2.dispatch,
      getters = _ref2.getters,
      state = _ref2.state,
      rootGetters = _ref2.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("settings/database/restore", param, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function (response) {
        // console.log(response.data);
        resolve(response.data.isOk);
        if (response.data.isOk) dispatch("Auth/fetch", true, {
          root: true
        });
      });
    });
  },
  runCommand: function runCommand(_ref3, param) {
    var commit = _ref3.commit,
      dispatch = _ref3.dispatch,
      getters = _ref3.getters,
      state = _ref3.state,
      rootGetters = _ref3.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("settings/command/run", {
        commands: param
      }).then(function (response) {
        // console.log(response.data);
        resolve(response.data);
        if (response.data.isOk) dispatch("Auth/fetch", true, {
          root: true
        });
      });
    });
  },
  sendNotification: function sendNotification(_ref4, param) {
    var commit = _ref4.commit,
      dispatch = _ref4.dispatch,
      getters = _ref4.getters,
      state = _ref4.state,
      rootGetters = _ref4.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("settings/notification/send", param).then(function (response) {
        // console.log(response.data);
        resolve();
      });
    });
  },
  fetchLog: function fetchLog(_ref5, param) {
    var commit = _ref5.commit,
      dispatch = _ref5.dispatch,
      getters = _ref5.getters,
      state = _ref5.state,
      rootGetters = _ref5.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("settings/log").then(function (response) {
        // console.log(response.data);
        resolve(response.data);
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
    state.parameters = data.parameters;
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

/***/ "./resources/js/views/Settings/Notification.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/Settings/Notification.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Notification_vue_vue_type_template_id_45e72468_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Notification.vue?vue&type=template&id=45e72468&scoped=true& */ "./resources/js/views/Settings/Notification.vue?vue&type=template&id=45e72468&scoped=true&");
/* harmony import */ var _Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Notification.vue?vue&type=script&lang=js& */ "./resources/js/views/Settings/Notification.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Notification_vue_vue_type_style_index_0_id_45e72468_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true& */ "./resources/js/views/Settings/Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Notification_vue_vue_type_template_id_45e72468_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Notification_vue_vue_type_template_id_45e72468_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "45e72468",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Settings/Notification.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/Settings/Notification.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Settings/Notification.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Notification.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Notification.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Settings/Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/views/Settings/Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_style_index_0_id_45e72468_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Notification.vue?vue&type=style&index=0&id=45e72468&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_style_index_0_id_45e72468_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_style_index_0_id_45e72468_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_style_index_0_id_45e72468_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_style_index_0_id_45e72468_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/Settings/Notification.vue?vue&type=template&id=45e72468&scoped=true&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/views/Settings/Notification.vue?vue&type=template&id=45e72468&scoped=true& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_template_id_45e72468_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./Notification.vue?vue&type=template&id=45e72468&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Notification.vue?vue&type=template&id=45e72468&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_template_id_45e72468_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Notification_vue_vue_type_template_id_45e72468_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);