(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Settings.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_tab_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/tab-panel */ "./node_modules/devextreme-vue/tab-panel.js");
/* harmony import */ var devextreme_vue_tab_panel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_tab_panel__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_modules_Admin_Settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/modules/Admin/Settings */ "./resources/js/store/modules/Admin/Settings.js");
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



var Parameters = function Parameters() {
  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(49)]).then(__webpack_require__.bind(null, /*! ./Settings/Parameters.vue */ "./resources/js/views/admin/Settings/Parameters.vue"));
};

var Faqs = function Faqs() {
  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(28), __webpack_require__.e(51), __webpack_require__.e(5), __webpack_require__.e(22)]).then(__webpack_require__.bind(null, /*! ./Settings/Faqs.vue */ "./resources/js/views/admin/Settings/Faqs.vue"));
};

var Database = function Database() {
  return Promise.all(/*! import() */[__webpack_require__.e(7), __webpack_require__.e(41)]).then(__webpack_require__.bind(null, /*! ./Settings/Database.vue */ "./resources/js/views/admin/Settings/Database.vue"));
};

var Command = function Command() {
  return Promise.all(/*! import() */[__webpack_require__.e(16), __webpack_require__.e(40)]).then(__webpack_require__.bind(null, /*! ./Settings/Command.vue */ "./resources/js/views/admin/Settings/Command.vue"));
};

var Notification = function Notification() {
  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(28), __webpack_require__.e(5), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! ./Settings/Notification.vue */ "./resources/js/views/admin/Settings/Notification.vue"));
};

var Log = function Log() {
  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(42)]).then(__webpack_require__.bind(null, /*! ./Settings/Log.vue */ "./resources/js/views/admin/Settings/Log.vue"));
};

var Files = function Files() {
  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(28), __webpack_require__.e(5), __webpack_require__.e(31)]).then(__webpack_require__.bind(null, /*! ./Settings/Files.vue */ "./resources/js/views/admin/Settings/Files.vue"));
};

var Roles = function Roles() {
  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(29)]).then(__webpack_require__.bind(null, /*! ./Settings/Roles.vue */ "./resources/js/views/admin/Settings/Roles.vue"));
};

var Permissions = function Permissions() {
  return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(50)]).then(__webpack_require__.bind(null, /*! ./Settings/Permissions.vue */ "./resources/js/views/admin/Settings/Permissions.vue"));
};


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxTabPanel: devextreme_vue_tab_panel__WEBPACK_IMPORTED_MODULE_1__["DxTabPanel"],
    DxItem: devextreme_vue_tab_panel__WEBPACK_IMPORTED_MODULE_1__["DxItem"],
    Parameters: Parameters,
    Faqs: Faqs,
    Database: Database,
    Command: Command,
    Notification: Notification,
    Log: Log,
    Files: Files,
    Roles: Roles,
    Permissions: Permissions
  },
  data: function data() {
    return {
      selectedTabText: null
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.settings", _store_modules_Admin_Settings__WEBPACK_IMPORTED_MODULE_2__["default"]);
  },
  mounted: function mounted() {
    this.setSelectedTab();
    window.addEventListener("popstate", this.setSelectedTab);
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Admin.settings");
    window.removeEventListener("popstate", this.setSelectedTab);
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Auth", ["permissions"])), {}, {
    tabPanel: function tabPanel() {
      return this.$refs.tabPanel.instance;
    }
  }),
  methods: {
    onTitleClick: function onTitleClick(e) {
      if (e.itemData.text != this.selectedTabText) {
        history.pushState(null, null, e.itemData.text);
        this.selectedTabText = e.itemData.text;
      }
    },
    setSelectedTab: function setSelectedTab() {
      var _this = this;

      this.selectedTabText = this.$route.hash;
      var tabs = this.tabPanel.option("items");
      var selectedTabIndex = tabs.findIndex(function (item) {
        return item.text === _this.selectedTabText;
      });

      if (selectedTabIndex == -1) {
        selectedTabIndex = 0;
        this.selectedTabText = tabs[0].text;
      }

      this.tabPanel.option("selectedIndex", selectedTabIndex);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Settings.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".settings-page .dx-field-button-item {\n  text-align: left !important;\n}\n.settings-page .dx-field-item:not(.dx-field-item-has-group):not(.dx-field-item-has-tabs):not(.dx-first-row):not(.dx-label-v-align) {\n  padding-top: 0;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/devextreme-vue/tab-panel.js":
/*!**************************************************!*\
  !*** ./node_modules/devextreme-vue/tab-panel.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * devextreme-vue
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-vue
 */


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DxItem = exports.DxTabPanel = void 0;
var tab_panel_1 = __importDefault(__webpack_require__(/*! devextreme/ui/tab_panel */ "./node_modules/devextreme/esm/ui/tab_panel.js"));
var index_1 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var index_2 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var DxTabPanel = index_1.createComponent({
    props: {
        accessKey: String,
        activeStateEnabled: Boolean,
        animationEnabled: Boolean,
        dataSource: [Array, Object, String],
        deferRendering: Boolean,
        disabled: Boolean,
        elementAttr: Object,
        focusStateEnabled: Boolean,
        height: [Function, Number, String],
        hint: String,
        hoverStateEnabled: Boolean,
        itemHoldTimeout: Number,
        items: Array,
        itemTemplate: {},
        itemTitleTemplate: {},
        loop: Boolean,
        noDataText: String,
        onContentReady: Function,
        onDisposing: Function,
        onInitialized: Function,
        onItemClick: Function,
        onItemContextMenu: Function,
        onItemHold: Function,
        onItemRendered: Function,
        onOptionChanged: Function,
        onSelectionChanged: Function,
        onTitleClick: Function,
        onTitleHold: Function,
        onTitleRendered: Function,
        repaintChangesOnly: Boolean,
        rtlEnabled: Boolean,
        scrollByContent: Boolean,
        scrollingEnabled: Boolean,
        selectedIndex: Number,
        selectedItem: {},
        showNavButtons: Boolean,
        swipeEnabled: Boolean,
        tabIndex: Number,
        visible: Boolean,
        width: [Function, Number, String]
    },
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:accessKey": null,
        "update:activeStateEnabled": null,
        "update:animationEnabled": null,
        "update:dataSource": null,
        "update:deferRendering": null,
        "update:disabled": null,
        "update:elementAttr": null,
        "update:focusStateEnabled": null,
        "update:height": null,
        "update:hint": null,
        "update:hoverStateEnabled": null,
        "update:itemHoldTimeout": null,
        "update:items": null,
        "update:itemTemplate": null,
        "update:itemTitleTemplate": null,
        "update:loop": null,
        "update:noDataText": null,
        "update:onContentReady": null,
        "update:onDisposing": null,
        "update:onInitialized": null,
        "update:onItemClick": null,
        "update:onItemContextMenu": null,
        "update:onItemHold": null,
        "update:onItemRendered": null,
        "update:onOptionChanged": null,
        "update:onSelectionChanged": null,
        "update:onTitleClick": null,
        "update:onTitleHold": null,
        "update:onTitleRendered": null,
        "update:repaintChangesOnly": null,
        "update:rtlEnabled": null,
        "update:scrollByContent": null,
        "update:scrollingEnabled": null,
        "update:selectedIndex": null,
        "update:selectedItem": null,
        "update:showNavButtons": null,
        "update:swipeEnabled": null,
        "update:tabIndex": null,
        "update:visible": null,
        "update:width": null,
    },
    computed: {
        instance: function () {
            return this.$_instance;
        }
    },
    beforeCreate: function () {
        this.$_WidgetClass = tab_panel_1.default;
        this.$_hasAsyncTemplate = true;
        this.$_expectedChildren = {
            item: { isCollectionItem: true, optionName: "items" }
        };
    }
});
exports.DxTabPanel = DxTabPanel;
var DxItem = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:badge": null,
        "update:disabled": null,
        "update:html": null,
        "update:icon": null,
        "update:tabTemplate": null,
        "update:template": null,
        "update:text": null,
        "update:title": null,
        "update:visible": null,
    },
    props: {
        badge: String,
        disabled: Boolean,
        html: String,
        icon: String,
        tabTemplate: {},
        template: {},
        text: String,
        title: String,
        visible: Boolean
    }
});
exports.DxItem = DxItem;
DxItem.$_optionName = "items";
DxItem.$_isCollectionItem = true;
exports.default = DxTabPanel;


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings.vue?vue&type=style&index=0&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Settings.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings.vue?vue&type=style&index=0&lang=scss&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings.vue?vue&type=template&id=850f577c&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Settings.vue?vue&type=template&id=850f577c& ***!
  \************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "settings-page" }, [
    _c("h2", { staticClass: "content-block" }, [
      _vm._v("\n    " + _vm._s(_vm.$t("admin.settings.title")) + "\n  ")
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "content-block dx-card responsive-paddings" },
      [
        _c(
          "DxTabPanel",
          {
            ref: "tabPanel",
            attrs: {
              loop: false,
              "animation-enabled": true,
              "swipe-enabled": false,
              showNavButtons: true
            },
            on: { titleClick: _vm.onTitleClick }
          },
          [
            _vm.permissions.includes("setting.command@control")
              ? _c("DxItem", {
                  attrs: {
                    title: _vm.$t("admin.settings.commands.title"),
                    text: "#commands"
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function() {
                          return [_c("Command")]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    2690716548
                  )
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.permissions.includes("setting.notification@control")
              ? _c("DxItem", {
                  attrs: {
                    title: _vm.$t("admin.settings.notification.title"),
                    text: "#notification"
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function() {
                          return [_c("Notification")]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    3359698830
                  )
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.permissions.includes("setting.files@control")
              ? _c("DxItem", {
                  attrs: {
                    title: _vm.$t("admin.settings.files.title"),
                    text: "#files"
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function() {
                          return [_c("Files")]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    3291371670
                  )
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.permissions.includes("setting.log@control")
              ? _c("DxItem", {
                  attrs: {
                    title: _vm.$t("admin.settings.log.title"),
                    text: "#log"
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function() {
                          return [_c("Log")]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    507718023
                  )
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.permissions.includes("setting.faqs@control")
              ? _c("DxItem", {
                  attrs: {
                    title: _vm.$t("admin.settings.faqs.title"),
                    text: "#faqs"
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function() {
                          return [_c("Faqs")]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    3695640614
                  )
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.permissions.includes("setting.parameters@control")
              ? _c("DxItem", {
                  attrs: {
                    title: _vm.$t("admin.settings.parameters.title"),
                    text: "#parameters"
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function() {
                          return [_c("Parameters")]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    2813874105
                  )
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.permissions.includes("setting.database@control")
              ? _c("DxItem", {
                  attrs: {
                    title: _vm.$t("admin.settings.database.title"),
                    text: "#database"
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function() {
                          return [_c("Database")]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    1708234214
                  )
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.permissions.includes("setting.roles@control")
              ? _c("DxItem", {
                  attrs: {
                    title: _vm.$t("admin.settings.roles.title"),
                    text: "#roles"
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function() {
                          return [_c("Roles")]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    3088463492
                  )
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.permissions.includes("setting.permissions@control")
              ? _c("DxItem", {
                  attrs: {
                    title: _vm.$t("admin.settings.permissions.title"),
                    text: "#permissions"
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function() {
                          return [_c("Permissions")]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    2431020923
                  )
                })
              : _vm._e()
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

/***/ "./resources/js/store/modules/Admin/Settings.js":
/*!******************************************************!*\
  !*** ./resources/js/store/modules/Admin/Settings.js ***!
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

/***/ "./resources/js/views/admin/Settings.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/admin/Settings.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Settings_vue_vue_type_template_id_850f577c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.vue?vue&type=template&id=850f577c& */ "./resources/js/views/admin/Settings.vue?vue&type=template&id=850f577c&");
/* harmony import */ var _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Settings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Settings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Settings.vue?vue&type=style&index=0&lang=scss& */ "./resources/js/views/admin/Settings.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Settings_vue_vue_type_template_id_850f577c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Settings_vue_vue_type_template_id_850f577c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Settings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Settings.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/admin/Settings.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Settings.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/admin/Settings.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--7-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/admin/Settings.vue?vue&type=template&id=850f577c&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/admin/Settings.vue?vue&type=template&id=850f577c& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_850f577c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=template&id=850f577c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Settings.vue?vue&type=template&id=850f577c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_850f577c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_850f577c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},0,[0,1,2,3,28,51,5,22,4,31,29,42,49,50,16,40,7,41]]);