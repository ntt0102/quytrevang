(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[62],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ListTagBox.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ListTagBox.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var DxTagBox = function DxTagBox() {
  return __webpack_require__.e(/*! import() */ 54).then(__webpack_require__.t.bind(null, /*! devextreme-vue/tag-box */ "./node_modules/devextreme-vue/tag-box.js", 7));
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxDataGrid: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxDataGrid"],
    DxColumn: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxColumn"]
  },
  data: function data() {
    return {
      gridData: null
    };
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.users", ["deletedUsers"])), {}, {
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    },
    popup: function popup() {
      return this.$refs.popup.instance;
    }
  }),
  watch: {
    deletedUsers: function deletedUsers() {
      this.cloneDeepData();
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.users", ["save"])), {}, {
    show: function show() {
      var _this = this;
      this.popup.show();
      this.cloneDeepData();
      this.$mf.pushPopupToHistoryState(function () {
        return _this.popup.hide();
      });
    },
    onSavedDeletedUser: function onSavedDeletedUser(e) {
      var _this2 = this;
      this.$bus.emit("checkPin", function () {
        e.isDeleted = true;
        _this2.save(e);
      });
    },
    cloneDeepData: function cloneDeepData() {
      this.gridData = this.$mf.cloneDeep(this.deletedUsers);
    },
    isRowRestored: function isRowRestored(key) {
      var change = this.dataGrid.option("editing.changes").find(function (c) {
        return c.type == "update" && c.key == key;
      });
      return this.$mf.isSet(change);
    },
    unrestore: function unrestore(key) {
      var changes = this.dataGrid.option("editing.changes");
      changes = changes.filter(function (c) {
        return !(c.type == "update" && c.key == key);
      });
      this.dataGrid.option("editing.changes", changes);
    },
    isRowDeleted: function isRowDeleted(key) {
      var change = this.dataGrid.option("editing.changes").find(function (c) {
        return c.type == "remove" && c.key == key;
      });
      return this.$mf.isSet(change);
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/Index.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/User/Index.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js");
/* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ListTagBox_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/ListTagBox.vue */ "./resources/js/components/ListTagBox.vue");
/* harmony import */ var _DeletedUsersPopup_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DeletedUsersPopup.vue */ "./resources/js/views/admin/User/DeletedUsersPopup.vue");
/* harmony import */ var _components_Popups_ConfirmUserPopup_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/Popups/ConfirmUserPopup.vue */ "./resources/js/components/Popups/ConfirmUserPopup.vue");
/* harmony import */ var _components_Popups_UserDetailPopup_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/Popups/UserDetailPopup.vue */ "./resources/js/components/Popups/UserDetailPopup.vue");
/* harmony import */ var _store_modules_Admin_Users__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../store/modules/Admin/Users */ "./resources/js/store/modules/Admin/Users.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DxDataGrid: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxDataGrid"],
    DxColumn: devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__["DxColumn"],
    ListTagBox: _components_ListTagBox_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    DeletedUsersPopup: _DeletedUsersPopup_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    ConfirmUserPopup: _components_Popups_ConfirmUserPopup_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    UserDetailPopup: _components_Popups_UserDetailPopup_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  data: function data() {
    return {
      gridData: null,
      banks: [],
      rolesCalculateFilterExpression: function rolesCalculateFilterExpression(filterValue, selectedFilterOperation, target) {
        if (target === "search" && typeof filterValue === "string") {
          return [this.dataField, "contains", filterValue];
        }
        return function (data) {
          return (data.roles || []).indexOf(filterValue) !== -1;
        };
      },
      permissionsCalculateFilterExpression: function permissionsCalculateFilterExpression(filterValue, selectedFilterOperation, target) {
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
        role: [{
          type: "required",
          message: this.$t("models.user.roles") + this.$mt.validations.required
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
        }]
      }
    };
  },
  beforeCreate: function beforeCreate() {
    this.$store.registerModule("Admin.users", _store_modules_Admin_Users__WEBPACK_IMPORTED_MODULE_6__["default"]);
  },
  created: function created() {
    var _this = this;
    this.fetch().then(function () {
      return _this.$mf.getBanks();
    }).then(function (banks) {
      return _this.banks = banks;
    });
  },
  destroyed: function destroyed() {
    this.$store.unregisterModule("Admin.users");
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Auth", ["permissions", "code"])), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])("Admin.users", ["users", "allRolesName", "allPermissionsName"])), {}, {
    dataGrid: function dataGrid() {
      return this.$refs.dataGrid.instance;
    },
    contextMenu: function contextMenu() {
      return this.$refs.contextMenu.instance;
    }
  }),
  watch: {
    users: function users() {
      this.cloneDeepData();
    }
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("Admin.users", ["fetch", "save", "validateDuplicateEmail", "validateDuplicateIdNumber", "validateDuplicatePhone", "resetState"])), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])("User.layout", ["initLayout"])), {}, {
    onSaved: function onSaved(e) {
      e.isDeleted = false;
      this.save(e);
    },
    onToolbarPreparing: function onToolbarPreparing(e) {
      var _this2 = this;
      e.toolbarOptions.items.unshift({
        visible: this.$mf.isSet(this.$route.query),
        location: "before",
        widget: "dxButton",
        options: {
          icon: "far fa-arrow-left small",
          hint: this.$t("buttons.back"),
          onClick: function onClick() {
            _this2.$router.go(-1);
          }
        }
      }, {
        locateInMenu: "auto",
        showText: "inMenu",
        location: "before",
        widget: "dxButton",
        options: {
          icon: "far fa-share-square small",
          hint: this.$t("admin.users.buttons.sendNotification"),
          text: this.$t("admin.users.buttons.sendNotification"),
          onClick: function onClick() {
            var selectedRowKeys = _this2.dataGrid.getSelectedRowKeys();
            if (selectedRowKeys.length > 0) {
              _this2.$router.push({
                name: "settings",
                hash: "#notification",
                query: {
                  codes: _this2.dataGrid.getSelectedRowKeys().join(",")
                }
              });
            } else _this2.$toasted.show(_this2.$t("messages.info.noSelectedRow"));
          }
        }
      }, {
        locateInMenu: "auto",
        showText: "inMenu",
        location: "before",
        widget: "dxButton",
        options: {
          icon: "far fa-trash small",
          hint: this.$t("admin.users.buttons.selectedDelete"),
          text: this.$t("admin.users.buttons.selectedDelete"),
          onClick: function onClick() {
            var selectedRowKeys = _this2.dataGrid.getSelectedRowKeys();
            if (selectedRowKeys.length > 0) {
              _this2.$bus.emit("checkPin", function () {
                _this2.dataGrid.option("editing.mode", "batch");
                selectedRowKeys.forEach(function (key) {
                  _this2.dataGrid.deleteRow(_this2.dataGrid.getRowIndexByKey(key));
                });
                _this2.dataGrid.saveEditData();
              });
              _this2.dataGrid.option("editing.mode", "popup");
            } else _this2.$toasted.show(_this2.$t("messages.info.noSelectedRow"));
          }
        }
      }, {
        locateInMenu: "auto",
        showText: "inMenu",
        location: "before",
        widget: "dxButton",
        options: {
          icon: "far fa-user-times small",
          hint: this.$t("admin.users.deletedUsers"),
          text: this.$t("admin.users.deletedUsers"),
          onClick: function onClick() {
            return _this2.$refs.deletedUsersPopup.show();
          }
        }
      });
    },
    tagBoxCellTemplate: function tagBoxCellTemplate(container, options) {
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
    },
    validateBirthday: function validateBirthday(e) {
      return moment(e.value).isBefore(moment().subtract(18, "years"));
    },
    validateIdIssuedOn: function validateIdIssuedOn(e) {
      return moment(e.value).isBefore(moment().subtract(1, "day"));
    },
    onInitNewRow: function onInitNewRow(e) {
      e.data.roles = ["user"];
      e.data.bank_account = {};
      this.dataGrid.option("editing.popup.title", this.$t("models.user.popup.create"));
    },
    onEditingStart: function onEditingStart(e) {
      this.dataGrid.option("editing.popup.title", "".concat(this.$t("models.user.popup.edit"), " #").concat(e.data.code));
    },
    cloneDeepData: function cloneDeepData() {
      var _this3 = this;
      this.gridData = this.$mf.cloneDeep(this.users);
      if (!!this.$route.query.code) {
        this.dataGrid.columnOption("code", "filterValues", [+this.$route.query.code]);
      }
      if (!!this.$route.query.selected) {
        setTimeout(function () {
          return _this3.dataGrid.selectRows(_this3.$route.query.selected.split(","), true);
        }, 0);
      }
    },
    onShown: function onShown(e) {
      var _this4 = this;
      this.$mf.checkPinDataGrid(e, this);
      this.$mf.pushPopupToHistoryState(function () {
        return _this4.dataGrid.cancelEditData();
      });
    },
    onCellPrepared: function onCellPrepared(e) {
      if (e.rowType === "data") {
        if (e.column.dataField === "level") {
          var color;
          if (e.value < 4) color = "#adadad";else if (e.value == 4) color = "#edc578";else color = "#86c285";
          e.cellElement.style.color = color;
        }
        if (e.column.dataField === "phone") e.cellElement.innerHTML = this.$options.filters.phone(e.value);
      }
    },
    onCellDblClick: function onCellDblClick(e) {
      if (e.rowType == "data" && e.columnIndex == 5) this.$mf.openLink("https://zalo.me/".concat(e.data.phone));
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("DxTagBox", {
    attrs: {
      "data-source": _vm.dataSource,
      value: _vm.currentValue,
      "show-selection-controls": true,
      "max-displayed-tags": 3,
      "show-multi-tag-only": false,
      "on-value-changed": function onValueChanged(e) {
        return _vm.onValueChanged(e.value);
      },
      "on-selection-changed": _vm.onSelectionChanged,
      "search-enabled": true,
      dropDownOptions: {
        width: _vm.width,
        height: _vm.height
      }
    }
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/UserDetailPopup.vue?vue&type=template&id=55e21d5a&":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/UserDetailPopup.vue?vue&type=template&id=55e21d5a& ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
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
      "show-title": true
    },
    on: {
      hiding: _vm.$mf.popRouteHistoryState
    },
    scopedSlots: _vm._u([{
      key: "content",
      fn: function fn() {
        return [_c("div", [_c("DxForm", {
          ref: "form",
          staticClass: "user-detail-form",
          attrs: {
            "form-data": _vm.formData,
            "col-count": 2,
            "read-only": true,
            "label-location": _vm.$devices.phone ? "top" : "left",
            "scrolling-enabled": true
          }
        }, [_c("DxItem", {
          attrs: {
            "item-type": "group",
            caption: _vm.$t("models.user.groups.personalInfo")
          }
        }, [_c("DxItem", {
          attrs: {
            "data-field": "name",
            label: {
              text: _vm.$t("models.user.name")
            }
          }
        }), _vm._v(" "), _c("DxItem", {
          attrs: {
            "data-field": "sex",
            "editor-type": "dxSelectBox",
            "editor-options": {
              items: _vm.$mf.getSexList(),
              displayExpr: "name",
              valueExpr: "value"
            },
            label: {
              text: _vm.$t("models.user.sex")
            }
          }
        }), _vm._v(" "), _c("DxItem", {
          attrs: {
            "data-field": "birthday",
            "editor-type": "dxDateBox",
            label: {
              text: _vm.$t("models.user.birthday")
            }
          }
        })], 1), _vm._v(" "), _c("DxItem", {
          attrs: {
            "item-type": "group",
            caption: _vm.$t("models.user.groups.idInfo")
          }
        }, [_c("DxItem", {
          attrs: {
            "data-field": "identity.number",
            label: {
              text: _vm.$t("models.user.idNumber")
            }
          }
        }), _vm._v(" "), _c("DxItem", {
          attrs: {
            "data-field": "identity.issued_on",
            "editor-type": "dxDateBox",
            label: {
              text: _vm.$t("models.user.idIssuedOn")
            }
          }
        }), _vm._v(" "), _c("DxItem", {
          attrs: {
            "data-field": "",
            editorOptions: {
              value: _vm.$mt.idIssuedAtValue
            },
            label: {
              text: _vm.$t("models.user.idIssuedAt")
            }
          }
        })], 1), _vm._v(" "), _c("DxItem", {
          attrs: {
            "item-type": "group",
            "col-span": 2,
            "col-count": 2,
            caption: _vm.$t("models.user.groups.contactInfo")
          }
        }, [_c("DxItem", {
          attrs: {
            "data-field": "phone",
            editorOptions: {
              mask: !!_vm.formData.phone ? "0000.000.000" : null
            },
            label: {
              text: _vm.$t("models.user.phone")
            }
          }
        }), _vm._v(" "), _c("DxItem", {
          attrs: {
            "data-field": "email",
            label: {
              text: _vm.$t("models.user.email")
            }
          }
        }), _vm._v(" "), _c("DxItem", {
          attrs: {
            "col-span": 2,
            "data-field": "address",
            label: {
              text: _vm.$t("models.user.address")
            }
          }
        })], 1), _vm._v(" "), _c("DxItem", {
          attrs: {
            "item-type": "group",
            "col-span": 2,
            caption: _vm.$t("models.user.groups.bankInfo")
          }
        }, [_c("DxItem", {
          attrs: {
            "data-field": "bank_account.bank_name",
            label: {
              text: _vm.$t("models.user.bankName")
            }
          }
        }), _vm._v(" "), _c("DxItem", {
          attrs: {
            "data-field": "bank_account.account_number",
            label: {
              text: _vm.$t("models.user.accountNumber")
            }
          }
        }), _vm._v(" "), _c("DxItem", {
          attrs: {
            "data-field": "bank_account.account_name",
            label: {
              text: _vm.$t("models.user.accountName")
            }
          }
        })], 1), _vm._v(" "), _c("DxItem", {
          attrs: {
            visible: _vm.hasConfirmedDocs,
            "item-type": "group",
            "col-span": 2,
            caption: _vm.$t("models.user.groups.confirmDocuments")
          }
        }, [_c("DxItem", {
          scopedSlots: _vm._u([{
            key: "default",
            fn: function fn() {
              return [_c("Photoswipe", {
                on: {
                  opened: _vm.$mf.pushPhotoswipeToHistoryState,
                  close: _vm.$mf.popRouteHistoryState
                }
              }, _vm._l(_vm.formData.url_documents, function (image, index) {
                return _c("div", {
                  key: index
                }, [_c("img", {
                  directives: [{
                    name: "pswp",
                    rawName: "v-pswp",
                    value: image.file,
                    expression: "image.file"
                  }],
                  attrs: {
                    src: image.file,
                    alt: _vm.$appName
                  }
                })]);
              }), 0)];
            },
            proxy: true
          }])
        })], 1)], 1), _vm._v(" "), _c("DxLoadPanel", {
          attrs: {
            position: {
              of: ".user-detail-form"
            },
            visible: _vm.isLoading,
            shading: false
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=template&id=dce18010&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=template&id=dce18010& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
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
      title: _vm.$t("admin.users.deletedUsers")
    },
    on: {
      hiding: _vm.$mf.popRouteHistoryState
    },
    scopedSlots: _vm._u([{
      key: "content",
      fn: function fn() {
        return [_c("DxDataGrid", {
          ref: "dataGrid",
          attrs: {
            "data-source": _vm.gridData,
            "key-expr": "id",
            "show-borders": true,
            "column-auto-width": true,
            "allow-column-reordering": true,
            "allow-column-resizing": true,
            "column-resizing-mode": "widget",
            paging: {
              pageSize: 10
            },
            headerFilter: {
              visible: true
            },
            loadPanel: {
              enabled: true
            },
            editing: {
              allowUpdating: true,
              allowDeleting: true,
              confirmDelete: false,
              mode: "batch"
            }
          },
          on: {
            contentReady: function contentReady($event) {
              return _vm.$mf.dataGridPreload(_vm.gridData, _vm.dataGrid);
            },
            saved: _vm.onSavedDeletedUser
          },
          scopedSlots: _vm._u([{
            key: "commandCellTemplate",
            fn: function fn(_ref) {
              var data = _ref.data;
              return [_c("DxToolbar", {
                attrs: {
                  items: [{
                    locateInMenu: "auto",
                    showText: "inMenu",
                    location: "before",
                    widget: "dxButton",
                    options: {
                      disabled: _vm.isRowDeleted(data.key),
                      type: "default",
                      icon: _vm.isRowRestored(data.key) ? "undo" : "repeat",
                      hint: _vm.$t("admin.users.buttons.revert"),
                      text: _vm.$t("admin.users.buttons.revert"),
                      onClick: function onClick() {
                        if (_vm.isRowRestored(data.key)) _vm.unrestore(data.key);else _vm.dataGrid.cellValue(data.rowIndex, "deleted_at", null);
                        _vm.dataGrid.repaintRows(data.rowIndex);
                      }
                    }
                  }, {
                    locateInMenu: "auto",
                    showText: "inMenu",
                    location: "before",
                    widget: "dxButton",
                    options: {
                      type: "default",
                      icon: _vm.isRowDeleted(data.key) ? "undo" : "clearsquare",
                      hint: _vm.$t("admin.users.buttons.remove"),
                      text: _vm.$t("admin.users.buttons.remove"),
                      onClick: function onClick() {
                        if (_vm.isRowDeleted(data.key)) _vm.dataGrid.undeleteRow(data.rowIndex);else _vm.dataGrid.deleteRow(data.rowIndex);
                      }
                    }
                  }]
                }
              })];
            }
          }])
        }, [_c("DxColumn", {
          attrs: {
            fixed: true,
            width: _vm.$devices.phone ? 35 : 75,
            type: "buttons",
            cssClass: "dx-datagrid-command-column",
            "cell-template": "commandCellTemplate",
            caption: _vm.$t("titles.commandHeaderTitle".concat(_vm.$devices.phone ? "Short" : ""))
          }
        }), _vm._v(" "), _c("DxColumn", {
          attrs: {
            "allow-editing": false,
            "data-field": "code",
            "data-type": "string",
            caption: _vm.$t("models.user.codeShort")
          }
        }), _vm._v(" "), _c("DxColumn", {
          attrs: {
            "allow-editing": false,
            "data-field": "name",
            caption: _vm.$t("models.user.name")
          }
        }), _vm._v(" "), _c("DxColumn", {
          attrs: {
            "allow-editing": false,
            "data-field": "phone",
            caption: _vm.$t("models.user.phone")
          }
        }), _vm._v(" "), _c("DxColumn", {
          attrs: {
            "allow-editing": false,
            visible: false,
            "data-field": "deleted_at"
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/Index.vue?vue&type=template&id=713c0b66&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/User/Index.vue?vue&type=template&id=713c0b66& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "users-page"
  }, [_c("h2", {
    staticClass: "content-block"
  }, [_vm._v("\n        " + _vm._s(_vm.$t("admin.users.title")) + "\n    ")]), _vm._v(" "), _c("div", {
    staticClass: "content-block dx-card responsive-paddings"
  }, [_c("DxDataGrid", {
    ref: "dataGrid",
    attrs: {
      "data-source": _vm.gridData,
      "key-expr": "code",
      "show-borders": true,
      "column-auto-width": true,
      "allow-column-reordering": true,
      "allow-column-resizing": true,
      "column-resizing-mode": "widget",
      "column-chooser": {
        enabled: true,
        mode: "select",
        allowSearch: true
      },
      paging: {
        pageSize: 10
      },
      headerFilter: {
        visible: true
      },
      loadPanel: {
        enabled: true
      },
      selection: {
        mode: "multiple",
        showCheckBoxesMode: "always"
      },
      editing: {
        allowAdding: true,
        allowUpdating: true,
        allowDeleting: true,
        confirmDelete: false,
        mode: "popup",
        popup: {
          showTitle: true,
          onShown: _vm.onShown,
          onHiding: _vm.$mf.popRouteHistoryState
        },
        form: {
          colCount: 2,
          labelLocation: _vm.$devices.phone ? "top" : "left",
          items: [{
            itemType: "group",
            caption: _vm.$t("models.user.groups.personalInfo"),
            items: [{
              dataField: "name"
            }, {
              dataField: "sex"
            }, {
              dataField: "birthday"
            }]
          }, {
            itemType: "group",
            caption: _vm.$t("models.user.groups.idInfo"),
            items: [{
              dataField: "identity.number"
            }, {
              dataField: "identity.issued_on"
            }, {
              dataField: "",
              editorOptions: {
                value: _vm.$mt.idIssuedAtValue,
                readOnly: true
              },
              label: {
                text: _vm.$t("models.user.idIssuedAt")
              }
            }]
          }, {
            colCount: 2,
            colSpan: 2,
            itemType: "group",
            caption: _vm.$t("models.user.groups.contactInfo"),
            items: [{
              dataField: "phone"
            }, {
              dataField: "email"
            }, {
              dataField: "address",
              colSpan: 2
            }]
          }, {
            colCount: 2,
            colSpan: 2,
            itemType: "group",
            caption: _vm.$t("models.user.groups.bankInfo"),
            items: [{
              dataField: "bank_account.bank_name"
            }, {
              dataField: "bank_account.account_name"
            }, {
              dataField: "bank_account.account_number"
            }]
          }, {
            visible: _vm.permissions.includes("system@control"),
            colCount: 2,
            colSpan: 2,
            itemType: "group",
            caption: _vm.$t("models.user.groups.permission"),
            items: [{
              dataField: "roles",
              colSpan: 2
            }, {
              dataField: "permissions",
              colSpan: 2
            }]
          }]
        }
      }
    },
    on: {
      "cell-prepared": _vm.onCellPrepared,
      contentReady: function contentReady($event) {
        return _vm.$mf.dataGridPreload(_vm.gridData, _vm.dataGrid);
      },
      "toolbar-preparing": _vm.onToolbarPreparing,
      "init-new-row": _vm.onInitNewRow,
      "editing-start": _vm.onEditingStart,
      cellDblClick: _vm.onCellDblClick,
      saved: _vm.onSaved
    },
    scopedSlots: _vm._u([{
      key: "avatarCellTemplate",
      fn: function fn(_ref) {
        var data = _ref.data;
        return [_c("Photoswipe", {
          on: {
            opened: _vm.$mf.pushPhotoswipeToHistoryState,
            close: _vm.$mf.popRouteHistoryState
          }
        }, [_c("img", {
          directives: [{
            name: "pswp",
            rawName: "v-pswp",
            value: data.value,
            expression: "data.value"
          }],
          staticStyle: {
            "border-radius": "50%"
          },
          attrs: {
            src: data.value,
            width: "40",
            alt: _vm.$appName
          }
        })])];
      }
    }, {
      key: "roleTagBoxEditor",
      fn: function fn(_ref2) {
        var cellInfo = _ref2.data;
        return [_c("ListTagBox", {
          attrs: {
            value: cellInfo.value,
            "on-value-changed": function onValueChanged(value) {
              return _vm.onValueChanged(value, cellInfo);
            },
            "data-source": _vm.allRolesName,
            "data-grid-component": cellInfo.component
          }
        })];
      }
    }, {
      key: "permissionTagBoxEditor",
      fn: function fn(_ref3) {
        var cellInfo = _ref3.data;
        return [_c("ListTagBox", {
          attrs: {
            value: cellInfo.value,
            "on-value-changed": function onValueChanged(value) {
              return _vm.onValueChanged(value, cellInfo);
            },
            "data-source": _vm.allPermissionsName,
            "data-grid-component": cellInfo.component
          }
        })];
      }
    }, {
      key: "commandCellTemplate",
      fn: function fn(_ref4) {
        var data = _ref4.data;
        return [_c("DxToolbar", {
          attrs: {
            items: [{
              visible: [4, 5].includes(data.data.level) || _vm.permissions.includes("system@control") && data.data.level > 5,
              locateInMenu: "auto",
              showText: "inMenu",
              location: "center",
              widget: "dxButton",
              options: {
                type: "default",
                icon: "far fa-".concat(data.data.level == 4 ? "check" : "file-check", " small"),
                hint: _vm.$t("components.confirmUser.".concat(data.data.level == 4 ? "title" : "confirmedTitle")),
                text: _vm.$t("components.confirmUser.".concat(data.data.level == 4 ? "title" : "confirmedTitle")),
                onClick: function onClick() {
                  return _vm.$refs.confirmUserPopup.show({
                    user: data.data
                  });
                }
              }
            }, {
              visible: data.data.level >= 6,
              locateInMenu: "auto",
              showText: "inMenu",
              location: "center",
              widget: "dxButton",
              options: {
                type: "default",
                icon: "far fa-usd-circle small",
                hint: _vm.$t("admin.users.buttons.viewContract"),
                text: _vm.$t("admin.users.buttons.viewContract"),
                onClick: function onClick() {
                  return _vm.$router.push({
                    name: "contracts",
                    query: {
                      userCode: data.data.code
                    }
                  });
                }
              }
            }, {
              visible: !data.data.permissions.includes("system@control") || _vm.permissions.includes("system@control"),
              locateInMenu: "auto",
              showText: "inMenu",
              location: "center",
              widget: "dxButton",
              options: {
                type: "default",
                icon: "edit",
                hint: _vm.$t("buttons.edit"),
                text: _vm.$t("buttons.edit"),
                onClick: function onClick() {
                  return _vm.dataGrid.editRow(data.rowIndex);
                }
              }
            }, {
              visible: data.data.level <= 6 && data.data.code != _vm.code && !data.data.permissions.includes("system@control"),
              locateInMenu: "auto",
              showText: "inMenu",
              location: "center",
              widget: "dxButton",
              options: {
                type: "default",
                icon: "trash",
                hint: _vm.$t("buttons.delete"),
                text: _vm.$t("buttons.delete"),
                onClick: function onClick() {
                  return _vm.$bus.emit("checkPin", function () {
                    return _vm.dataGrid.deleteRow(data.rowIndex);
                  });
                }
              }
            }, {
              locateInMenu: "auto",
              showText: "inMenu",
              location: "center",
              widget: "dxButton",
              options: {
                type: "default",
                icon: "info",
                hint: _vm.$t("admin.users.detailUser"),
                text: _vm.$t("admin.users.detailUser"),
                onClick: function onClick() {
                  return _vm.$refs.userDetailPopup.show({
                    user: data.data
                  });
                }
              }
            }]
          }
        })];
      }
    }])
  }, [_c("DxColumn", {
    attrs: {
      fixed: true,
      width: _vm.$devices.phone ? 35 : 125,
      type: "buttons",
      cssClass: "dx-datagrid-command-column",
      "cell-template": "commandCellTemplate",
      caption: _vm.$t("titles.commandHeaderTitle".concat(_vm.$devices.phone ? "Short" : ""))
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      width: 60,
      "allow-sorting": false,
      allowFiltering: false,
      "data-field": "url_avatar",
      "cell-template": "avatarCellTemplate",
      cssClass: "avatar-column",
      caption: _vm.$t("models.user.avatar")
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      "allow-editing": false,
      "data-field": "code",
      "data-type": "string",
      "header-filter": {
        allowSearch: true
      },
      name: "code",
      caption: _vm.$t("models.user.codeShort")
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      "allow-editing": false,
      "data-field": "level",
      dataType: "number",
      caption: _vm.$t("models.user.status"),
      lookup: {
        dataSource: _vm.$mf.getUserLevelList(),
        displayExpr: "name",
        valueExpr: "value"
      }
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      "data-field": "name",
      "data-type": "string",
      "header-filter": {
        allowSearch: true
      },
      caption: _vm.$t("models.user.name"),
      "validation-rules": _vm.validationRules.name
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      visible: false,
      "data-field": "sex",
      "data-type": "number",
      caption: _vm.$t("models.user.sex"),
      "validation-rules": _vm.validationRules.sex,
      lookup: {
        dataSource: _vm.$mf.getSexList(),
        displayExpr: "name",
        valueExpr: "value"
      }
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      visible: false,
      "data-field": "birthday",
      "data-type": "date",
      "editor-options": {
        dateSerializationFormat: _vm.$mc.DX_SERVER_DATE_FORMAT,
        showClearButton: "true",
        useMaskBehavior: "true"
      },
      caption: _vm.$t("models.user.birthday"),
      "validation-rules": _vm.validationRules.birthday
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      visible: false,
      "data-field": "identity.number",
      "data-type": "string",
      "editor-options": {
        mask: "000000000000"
      },
      "header-filter": {
        allowSearch: true
      },
      caption: _vm.$t("models.user.idNumber"),
      "validation-rules": _vm.validationRules.idNumber
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      visible: false,
      "data-field": "identity.issued_on",
      "data-type": "date",
      "editor-options": {
        dateSerializationFormat: _vm.$mc.DX_SERVER_DATE_FORMAT,
        showClearButton: "true",
        useMaskBehavior: "true"
      },
      caption: _vm.$t("models.user.idIssuedOn"),
      "validation-rules": _vm.validationRules.idIssuedOn
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      "data-field": "phone",
      "data-type": "string",
      "editor-options": {
        mask: "0000.000.000"
      },
      "header-filter": {
        allowSearch: true
      },
      caption: _vm.$t("models.user.phone"),
      "validation-rules": _vm.validationRules.phone
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      visible: false,
      "data-field": "email",
      "data-type": "string",
      name: "email",
      "header-filter": {
        allowSearch: true
      },
      caption: _vm.$t("models.user.email"),
      "validation-rules": _vm.validationRules.email
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      visible: false,
      "data-field": "address",
      "data-type": "string",
      "header-filter": {
        allowSearch: true
      },
      caption: _vm.$t("models.user.address"),
      "validation-rules": _vm.validationRules.address
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      visible: false,
      "data-field": "bank_account.bank_name",
      "data-type": "string",
      lookup: {
        dataSource: _vm.banks,
        displayExpr: "short_name",
        valueExpr: "short_name",
        allowClearing: true
      },
      "header-filter": {
        allowSearch: true
      },
      caption: _vm.$t("models.user.bankName")
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      visible: false,
      "data-field": "bank_account.account_name",
      "data-type": "string",
      "header-filter": {
        allowSearch: true
      },
      caption: _vm.$t("models.user.accountName")
    }
  }), _vm._v(" "), _c("DxColumn", {
    attrs: {
      visible: false,
      "data-field": "bank_account.account_number",
      "data-type": "string",
      "header-filter": {
        allowSearch: true
      },
      caption: _vm.$t("models.user.accountNumber")
    }
  }), _vm._v(" "), _vm.permissions.includes("system@control") ? _c("DxColumn", {
    attrs: {
      visible: false,
      "allow-sorting": false,
      "data-field": "roles",
      "data-type": "string",
      "cell-template": _vm.tagBoxCellTemplate,
      "calculate-filter-expression": _vm.rolesCalculateFilterExpression,
      caption: _vm.$t("models.user.roles"),
      "edit-cell-template": "roleTagBoxEditor",
      "validation-rules": _vm.validationRules.role,
      lookup: {
        dataSource: _vm.allRolesName
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm.permissions.includes("system@control") ? _c("DxColumn", {
    attrs: {
      visible: false,
      "allow-sorting": false,
      "data-field": "permissions",
      "data-type": "string",
      "cell-template": _vm.tagBoxCellTemplate,
      "calculate-filter-expression": _vm.permissionsCalculateFilterExpression,
      caption: _vm.$t("models.user.permissions"),
      "edit-cell-template": "permissionTagBoxEditor",
      lookup: {
        dataSource: _vm.allPermissionsName
      }
    }
  }) : _vm._e()], 1)], 1), _vm._v(" "), _c("DeletedUsersPopup", {
    ref: "deletedUsersPopup"
  }), _vm._v(" "), _c("ConfirmUserPopup", {
    ref: "confirmUserPopup"
  }), _vm._v(" "), _c("UserDetailPopup", {
    ref: "userDetailPopup"
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/User/Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".users-page .avatar-column[role=gridcell] {\n  padding: 0 !important;\n}", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/User/Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss& */ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTagBox_vue_vue_type_template_id_1e87233a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../node_modules/vue-loader/lib??vue-loader-options!./ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ListTagBox.vue?vue&type=template&id=1e87233a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTagBox_vue_vue_type_template_id_1e87233a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_ListTagBox_vue_vue_type_template_id_1e87233a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/Popups/ConfirmUserPopup.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/Popups/ConfirmUserPopup.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/vue-loader/lib/index.js):\nError: ENOENT: no such file or directory, open 'C:\\xampp\\htdocs\\quytrevang\\resources\\js\\components\\Popups\\ConfirmUserPopup.vue'");

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
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetailPopup_vue_vue_type_template_id_55e21d5a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./UserDetailPopup.vue?vue&type=template&id=55e21d5a& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/UserDetailPopup.vue?vue&type=template&id=55e21d5a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetailPopup_vue_vue_type_template_id_55e21d5a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_UserDetailPopup_vue_vue_type_template_id_55e21d5a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/store/modules/Admin/Users.js":
/*!***************************************************!*\
  !*** ./resources/js/store/modules/Admin/Users.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function initialState() {
  return {
    users: [],
    deletedUsers: [],
    allRolesName: [],
    allPermissionsName: [],
    updatedAt: null
  };
}
var getters = {
  users: function users(state) {
    return state.users;
  },
  deletedUsers: function deletedUsers(state) {
    return state.deletedUsers;
  },
  allRolesName: function allRolesName(state) {
    return state.allRolesName;
  },
  allPermissionsName: function allPermissionsName(state) {
    return state.allPermissionsName;
  }
};
var actions = {
  validateDuplicateEmail: function validateDuplicateEmail(_ref, param) {
    var state = _ref.state,
      rootGetters = _ref.rootGetters;
    var oldUser = state.users.find(function (x) {
      return x.id === param.data.id;
    });
    if (!!oldUser && param.value == oldUser.email) return Promise.resolve(true);
    return new Promise(function (resolve, reject) {
      axios.post("users/validate-duplicate", {
        field: "email",
        email: param.value
      }, {
        noLoading: true
      }).then(function (response) {
        // console.log(response);
        resolve(response.data);
      });
    });
  },
  validateDuplicateIdNumber: function validateDuplicateIdNumber(_ref2, param) {
    var state = _ref2.state,
      rootGetters = _ref2.rootGetters;
    // console.log("validateDuplicateIdNumber", param);
    var oldUser = state.users.find(function (x) {
      return x.id === param.data.id;
    });
    if (!!oldUser && param.value == oldUser.identity.number) return Promise.resolve(true);
    return new Promise(function (resolve, reject) {
      axios.post("users/validate-duplicate", {
        field: "id_number",
        id_number: param.value
      }, {
        noLoading: true
      }).then(function (response) {
        // console.log(response);
        resolve(response.data);
      });
    });
  },
  validateDuplicatePhone: function validateDuplicatePhone(_ref3, param) {
    var state = _ref3.state,
      rootGetters = _ref3.rootGetters;
    var oldUser = state.users.find(function (x) {
      return x.id === param.data.id;
    });
    if (!!oldUser && param.value == oldUser.phone) return Promise.resolve(true);
    return new Promise(function (resolve, reject) {
      axios.post("users/validate-duplicate", {
        field: "phone",
        phone: param.value
      }, {
        noLoading: true
      }).then(function (response) {
        // console.log(response);
        resolve(response.data);
      });
    });
  },
  fetch: function fetch(_ref4) {
    var commit = _ref4.commit,
      dispatch = _ref4.dispatch,
      getters = _ref4.getters,
      state = _ref4.state,
      rootGetters = _ref4.rootGetters;
    if (moment().diff(state.updatedAt, "seconds") < 3) return false;
    return new Promise(function (resolve, reject) {
      axios.get("users").then(function (response) {
        // console.log(response.data);
        commit("setState", response.data);
        resolve();
      });
    });
  },
  save: function save(_ref5, param) {
    var commit = _ref5.commit,
      dispatch = _ref5.dispatch,
      getters = _ref5.getters,
      state = _ref5.state,
      rootGetters = _ref5.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("users" + (param.isDeleted ? "/deleted" : ""), {
        changes: param.changes
      }).then(function (response) {
        // console.log(response.data);
        resolve();
        dispatch("fetch");
        dispatch("User.layout/initLayout", ["users"], {
          root: true
        });
      });
    });
  },
  uploadDocuments: function uploadDocuments(_ref6, param) {
    var commit = _ref6.commit,
      dispatch = _ref6.dispatch,
      getters = _ref6.getters,
      state = _ref6.state,
      rootGetters = _ref6.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.post("users/documents", param, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function (response) {
        // console.log(response.data);
        resolve(response.data.isOk);
        dispatch("fetch");
        dispatch("User.layout/initLayout", ["users"], {
          root: true
        });
      });
    });
  },
  getContractInfo: function getContractInfo(_ref7) {
    var commit = _ref7.commit,
      dispatch = _ref7.dispatch,
      getters = _ref7.getters,
      state = _ref7.state,
      rootGetters = _ref7.rootGetters;
    return new Promise(function (resolve, reject) {
      axios.get("users/contract-info", {
        noLoading: true
      }).then(function (response) {
        console.log(response.data);
        resolve(response.data);
      });
    });
  },
  resetState: function resetState(_ref8) {
    var commit = _ref8.commit;
    commit("resetState");
  }
};
var mutations = {
  setState: function setState(state, data) {
    state.users = data.users;
    state.deletedUsers = data.deletedUsers;
    state.allRolesName = data.allRolesName;
    state.allPermissionsName = data.allPermissionsName;
    state.updatedAt = moment();
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

/***/ "./resources/js/views/admin/User/DeletedUsersPopup.vue":
/*!*************************************************************!*\
  !*** ./resources/js/views/admin/User/DeletedUsersPopup.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DeletedUsersPopup_vue_vue_type_template_id_dce18010___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DeletedUsersPopup.vue?vue&type=template&id=dce18010& */ "./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=template&id=dce18010&");
/* harmony import */ var _DeletedUsersPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DeletedUsersPopup.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DeletedUsersPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DeletedUsersPopup_vue_vue_type_template_id_dce18010___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DeletedUsersPopup_vue_vue_type_template_id_dce18010___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/User/DeletedUsersPopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeletedUsersPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DeletedUsersPopup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DeletedUsersPopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=template&id=dce18010&":
/*!********************************************************************************************!*\
  !*** ./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=template&id=dce18010& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_DeletedUsersPopup_vue_vue_type_template_id_dce18010___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DeletedUsersPopup.vue?vue&type=template&id=dce18010& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/DeletedUsersPopup.vue?vue&type=template&id=dce18010&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_DeletedUsersPopup_vue_vue_type_template_id_dce18010___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_DeletedUsersPopup_vue_vue_type_template_id_dce18010___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/admin/User/Index.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/admin/User/Index.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_713c0b66___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=713c0b66& */ "./resources/js/views/admin/User/Index.vue?vue&type=template&id=713c0b66&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/User/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Index_vue_vue_type_style_index_0_id_713c0b66_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss& */ "./resources/js/views/admin/User/Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_713c0b66___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_713c0b66___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/User/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/User/Index.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/views/admin/User/Index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/User/Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/views/admin/User/Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_713c0b66_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/Index.vue?vue&type=style&index=0&id=713c0b66&lang=scss&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_713c0b66_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_713c0b66_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_713c0b66_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_713c0b66_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/views/admin/User/Index.vue?vue&type=template&id=713c0b66&":
/*!********************************************************************************!*\
  !*** ./resources/js/views/admin/User/Index.vue?vue&type=template&id=713c0b66& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_713c0b66___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=713c0b66& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/User/Index.vue?vue&type=template&id=713c0b66&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_713c0b66___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_713c0b66___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},0,[54]]);