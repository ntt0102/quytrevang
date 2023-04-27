(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    [30],
    {
        /***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&":
            /*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _components_FileManager_vue__WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! ../../components/FileManager.vue */ "./resources/js/components/FileManager.vue"
                    );

                /* harmony default export */ __webpack_exports__["default"] = {
                    components: {
                        FileManager:
                            _components_FileManager_vue__WEBPACK_IMPORTED_MODULE_0__[
                                "default"
                            ],
                    },
                    data: function data() {
                        return {
                            clientPath: "",
                            callback: null,
                            emitData: null,
                        };
                    },
                    computed: {
                        popup: function popup() {
                            return this.$refs.popup.instance;
                        },
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
                            if (typeof this.callback === "function")
                                this.callback(this.emitData);
                            this.$mf.popRouteHistoryState();
                        },
                        onCopiedUrl: function onCopiedUrl(copiedUrl) {
                            this.emitData = copiedUrl;
                            this.popup.hide();
                        },
                    },
                };

                /***/
            },

        /***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Faqs.vue?vue&type=script&lang=js&":
            /*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Settings/Faqs.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! vuex */ "./node_modules/vuex/dist/vuex.esm.js"
                    );
                /* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__ =
                    __webpack_require__(
                        /*! devextreme-vue/data-grid */ "./node_modules/devextreme-vue/data-grid.js"
                    );
                /* harmony import */ var devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1___default =
                    /*#__PURE__*/ __webpack_require__.n(
                        devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__
                    );
                /* harmony import */ var devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_2__ =
                    __webpack_require__(
                        /*! devextreme-vue/text-area */ "./node_modules/devextreme-vue/text-area.js"
                    );
                /* harmony import */ var devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_2___default =
                    /*#__PURE__*/ __webpack_require__.n(
                        devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_2__
                    );
                /* harmony import */ var devextreme_vue_html_editor__WEBPACK_IMPORTED_MODULE_3__ =
                    __webpack_require__(
                        /*! devextreme-vue/html-editor */ "./node_modules/devextreme-vue/html-editor.js"
                    );
                /* harmony import */ var devextreme_vue_html_editor__WEBPACK_IMPORTED_MODULE_3___default =
                    /*#__PURE__*/ __webpack_require__.n(
                        devextreme_vue_html_editor__WEBPACK_IMPORTED_MODULE_3__
                    );
                /* harmony import */ var _components_Popups_PickImagePopup_vue__WEBPACK_IMPORTED_MODULE_4__ =
                    __webpack_require__(
                        /*! ../../components/Popups/PickImagePopup.vue */ "./resources/js/components/Popups/PickImagePopup.vue"
                    );
                /* harmony import */ var _store_modules_Admin_Settings_Faqs__WEBPACK_IMPORTED_MODULE_5__ =
                    __webpack_require__(
                        /*! ../../store/modules/Admin/Settings/Faqs */ "./resources/js/store/modules/Admin/Settings/Faqs.js"
                    );
                function _typeof(obj) {
                    "@babel/helpers - typeof";
                    return (
                        (_typeof =
                            "function" == typeof Symbol &&
                            "symbol" == typeof Symbol.iterator
                                ? function (obj) {
                                      return typeof obj;
                                  }
                                : function (obj) {
                                      return obj &&
                                          "function" == typeof Symbol &&
                                          obj.constructor === Symbol &&
                                          obj !== Symbol.prototype
                                          ? "symbol"
                                          : typeof obj;
                                  }),
                        _typeof(obj)
                    );
                }
                function ownKeys(object, enumerableOnly) {
                    var keys = Object.keys(object);
                    if (Object.getOwnPropertySymbols) {
                        var symbols = Object.getOwnPropertySymbols(object);
                        enumerableOnly &&
                            (symbols = symbols.filter(function (sym) {
                                return Object.getOwnPropertyDescriptor(
                                    object,
                                    sym
                                ).enumerable;
                            })),
                            keys.push.apply(keys, symbols);
                    }
                    return keys;
                }
                function _objectSpread(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = null != arguments[i] ? arguments[i] : {};
                        i % 2
                            ? ownKeys(Object(source), !0).forEach(function (
                                  key
                              ) {
                                  _defineProperty(target, key, source[key]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(
                                  target,
                                  Object.getOwnPropertyDescriptors(source)
                              )
                            : ownKeys(Object(source)).forEach(function (key) {
                                  Object.defineProperty(
                                      target,
                                      key,
                                      Object.getOwnPropertyDescriptor(
                                          source,
                                          key
                                      )
                                  );
                              });
                    }
                    return target;
                }
                function _defineProperty(obj, key, value) {
                    key = _toPropertyKey(key);
                    if (key in obj) {
                        Object.defineProperty(obj, key, {
                            value: value,
                            enumerable: true,
                            configurable: true,
                            writable: true,
                        });
                    } else {
                        obj[key] = value;
                    }
                    return obj;
                }
                function _toPropertyKey(arg) {
                    var key = _toPrimitive(arg, "string");
                    return _typeof(key) === "symbol" ? key : String(key);
                }
                function _toPrimitive(input, hint) {
                    if (_typeof(input) !== "object" || input === null)
                        return input;
                    var prim = input[Symbol.toPrimitive];
                    if (prim !== undefined) {
                        var res = prim.call(input, hint || "default");
                        if (_typeof(res) !== "object") return res;
                        throw new TypeError(
                            "@@toPrimitive must return a primitive value."
                        );
                    }
                    return (hint === "string" ? String : Number)(input);
                }

                /* harmony default export */ __webpack_exports__["default"] = {
                    components: {
                        DxDataGrid:
                            devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__[
                                "DxDataGrid"
                            ],
                        DxColumn:
                            devextreme_vue_data_grid__WEBPACK_IMPORTED_MODULE_1__[
                                "DxColumn"
                            ],
                        DxTextArea:
                            devextreme_vue_text_area__WEBPACK_IMPORTED_MODULE_2___default.a,
                        DxHtmlEditor:
                            devextreme_vue_html_editor__WEBPACK_IMPORTED_MODULE_3___default.a,
                        PickImagePopup:
                            _components_Popups_PickImagePopup_vue__WEBPACK_IMPORTED_MODULE_4__[
                                "default"
                            ],
                    },
                    data: function data() {
                        return {
                            gridData: null,
                            validationRules: {
                                topic: [
                                    {
                                        type: "required",
                                        message:
                                            this.$t("settings.faqs.topic") +
                                            this.$mt.validations.required,
                                    },
                                ],
                                question: [
                                    {
                                        type: "required",
                                        message:
                                            this.$t("settings.faqs.question") +
                                            this.$mt.validations.required,
                                    },
                                ],
                                answer: [
                                    {
                                        type: "required",
                                        message:
                                            this.$t("settings.faqs.answer") +
                                            this.$mt.validations.required,
                                    },
                                ],
                            },
                        };
                    },
                    beforeCreate: function beforeCreate() {
                        this.$store.registerModule(
                            "Admin.settings.faqs",
                            _store_modules_Admin_Settings_Faqs__WEBPACK_IMPORTED_MODULE_5__[
                                "default"
                            ]
                        );
                    },
                    created: function created() {
                        this.fetch();
                    },
                    destroyed: function destroyed() {
                        this.$store.unregisterModule("Admin.settings.faqs");
                    },
                    computed: _objectSpread(
                        _objectSpread(
                            {},
                            Object(
                                vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"]
                            )("Admin.settings.faqs", ["faqs"])
                        ),
                        {},
                        {
                            dataGrid: function dataGrid() {
                                return this.$refs.dataGrid.instance;
                            },
                        }
                    ),
                    watch: {
                        faqs: function faqs() {
                            this.cloneDeepData();
                        },
                    },
                    methods: _objectSpread(
                        _objectSpread(
                            {},
                            Object(
                                vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"]
                            )("Admin.settings.faqs", [
                                "fetch",
                                "save",
                                "resetState",
                            ])
                        ),
                        {},
                        {
                            onSave: function onSave(formData) {
                                this.save(formData);
                            },
                            cloneDeepData: function cloneDeepData() {
                                this.gridData = this.$mf.cloneDeep(this.faqs);
                            },
                            onUseHtmlChange: function onUseHtmlChange(e) {
                                this.dataGrid.option(
                                    "editing.form.items[2].editorOptions.value",
                                    e.value
                                );
                                this.dataGrid.option(
                                    "editing.form.items[3].visible",
                                    !e.value
                                );
                                this.dataGrid.option(
                                    "editing.form.items[4].visible",
                                    e.value
                                );
                            },
                            onInitNewRow: function onInitNewRow(e) {
                                this.dataGrid.option(
                                    "editing.popup.title",
                                    this.$t("settings.faqs.popup.create")
                                );
                            },
                            onEditingStart: function onEditingStart(e) {
                                var isUseHtml = /<\/?[a-z][\s\S]*>/i.test(
                                    e.data.answer
                                );
                                this.onUseHtmlChange({
                                    value: isUseHtml,
                                });
                                this.dataGrid.option(
                                    "editing.popup.title",
                                    this.$t("settings.faqs.popup.edit")
                                );
                            },
                            onShown: function onShown(e) {
                                var _this = this;
                                this.$mf.checkPinDataGrid(e, this);
                                var items = e.component.option("toolbarItems");
                                items.push({
                                    toolbar: "bottom",
                                    location: "before",
                                    widget: "dxButton",
                                    options: {
                                        icon: "image",
                                        text: this.$t("titles.chooseImage"),
                                        onClick: function onClick() {
                                            return _this.$refs.pickImagePopup.show(
                                                {
                                                    clientPath: "faqs",
                                                }
                                            );
                                        },
                                    },
                                });
                                e.component.option("toolbarItems", items);
                                this.$mf.pushPopupToHistoryState(function () {
                                    return _this.dataGrid.cancelEditData();
                                });
                            },
                        }
                    ),
                };

                /***/
            },

        /***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&":
            /*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2& ***!
  \******************************************************************************************************************************************************************************************************************************************************/
            /*! exports provided: render, staticRenderFns */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    "render",
                    function () {
                        return render;
                    }
                );
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    "staticRenderFns",
                    function () {
                        return staticRenderFns;
                    }
                );
                var render = function render() {
                    var _vm = this,
                        _c = _vm._self._c;
                    return _c("DxPopup", {
                        ref: "popup",
                        attrs: {
                            showCloseButton: true,
                            fullScreen: _vm.$devices.phone ? true : false,
                            "show-title": true,
                            title: _vm.$t("components.pickImage.title"),
                        },
                        on: {
                            hiding: _vm.onHiding,
                        },
                        scopedSlots: _vm._u([
                            {
                                key: "content",
                                fn: function fn() {
                                    return [
                                        _c(
                                            "DxScrollView",
                                            [
                                                _c("FileManager", {
                                                    attrs: {
                                                        clientPath:
                                                            _vm.clientPath,
                                                    },
                                                    on: {
                                                        copiedUrl:
                                                            _vm.onCopiedUrl,
                                                    },
                                                }),
                                            ],
                                            1
                                        ),
                                    ];
                                },
                                proxy: true,
                            },
                        ]),
                    });
                };
                var staticRenderFns = [];
                render._withStripped = true;

                /***/
            },

        /***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Faqs.vue?vue&type=template&id=2c4e80cc&scoped=true&":
            /*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/Settings/Faqs.vue?vue&type=template&id=2c4e80cc&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
            /*! exports provided: render, staticRenderFns */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    "render",
                    function () {
                        return render;
                    }
                );
                /* harmony export (binding) */ __webpack_require__.d(
                    __webpack_exports__,
                    "staticRenderFns",
                    function () {
                        return staticRenderFns;
                    }
                );
                var render = function render() {
                    var _vm = this,
                        _c = _vm._self._c;
                    return _c(
                        "div",
                        {
                            staticClass: "settings-page",
                        },
                        [
                            _c(
                                "h2",
                                {
                                    staticClass: "content-block",
                                },
                                [
                                    _vm._v(
                                        "\n        " +
                                            _vm._s(
                                                _vm.$t("settings.faqs.title")
                                            ) +
                                            "\n    "
                                    ),
                                ]
                            ),
                            _vm._v(" "),
                            _c(
                                "div",
                                {
                                    staticClass:
                                        "content-block dx-card responsive-paddings",
                                },
                                [
                                    _c(
                                        "div",
                                        [
                                            _c(
                                                "DxDataGrid",
                                                {
                                                    ref: "dataGrid",
                                                    attrs: {
                                                        "data-source":
                                                            _vm.gridData,
                                                        "key-expr": "id",
                                                        "show-borders": true,
                                                        "column-auto-width": true,
                                                        "allow-column-reordering": true,
                                                        "allow-column-resizing": true,
                                                        "column-resizing-mode":
                                                            "widget",
                                                        paging: {
                                                            pageSize: 10,
                                                        },
                                                        headerFilter: {
                                                            visible: true,
                                                        },
                                                        loadPanel: {
                                                            enabled: true,
                                                        },
                                                        selection: {
                                                            mode: "single",
                                                        },
                                                        editing: {
                                                            allowAdding: true,
                                                            allowUpdating: true,
                                                            allowDeleting: true,
                                                            confirmDelete: false,
                                                            mode: "popup",
                                                            popup: {
                                                                showTitle: true,
                                                                onShown:
                                                                    _vm.onShown,
                                                                onHiding:
                                                                    _vm.$mf
                                                                        .popRouteHistoryState,
                                                            },
                                                            form: {
                                                                labelLocation:
                                                                    _vm.$devices
                                                                        .phone
                                                                        ? "top"
                                                                        : "left",
                                                                items: [
                                                                    {
                                                                        dataField:
                                                                            "topic",
                                                                        colSpan: 2,
                                                                    },
                                                                    {
                                                                        dataField:
                                                                            "question",
                                                                        colSpan: 2,
                                                                    },
                                                                    {
                                                                        editorType:
                                                                            "dxCheckBox",
                                                                        colSpan: 2,
                                                                        editorOptions:
                                                                            {
                                                                                value: false,
                                                                                onValueChanged:
                                                                                    _vm.onUseHtmlChange,
                                                                            },
                                                                        label: {
                                                                            text: _vm.$t(
                                                                                "settings.faqs.useHtml"
                                                                            ),
                                                                        },
                                                                    },
                                                                    {
                                                                        visible: true,
                                                                        colSpan: 2,
                                                                        dataField:
                                                                            "answer",
                                                                        editorType:
                                                                            "dxTextArea",
                                                                        editorOptions:
                                                                            {
                                                                                stylingMode:
                                                                                    "filled",
                                                                                height: 150,
                                                                            },
                                                                    },
                                                                    {
                                                                        visible: false,
                                                                        dataField:
                                                                            "answer",
                                                                        colSpan: 2,
                                                                        editorType:
                                                                            "dxHtmlEditor",
                                                                        editorOptions:
                                                                            {
                                                                                mediaResizing:
                                                                                    {
                                                                                        enabled: true,
                                                                                    },
                                                                                toolbar:
                                                                                    {
                                                                                        items: [
                                                                                            "undo",
                                                                                            "redo",
                                                                                            "separator",
                                                                                            "bold",
                                                                                            "italic",
                                                                                            "strike",
                                                                                            "underline",
                                                                                            "separator",
                                                                                            "alignLeft",
                                                                                            "alignCenter",
                                                                                            "alignRight",
                                                                                            "alignJustify",
                                                                                            "separator",
                                                                                            "orderedList",
                                                                                            "bulletList",
                                                                                            "separator",
                                                                                            "color",
                                                                                            "background",
                                                                                            "separator",
                                                                                            "link",
                                                                                            "image",
                                                                                            "separator",
                                                                                            "clear",
                                                                                            "insertTable",
                                                                                        ],
                                                                                    },
                                                                            },
                                                                    },
                                                                ],
                                                            },
                                                            startEditAction:
                                                                "dblClick",
                                                        },
                                                    },
                                                    on: {
                                                        contentReady:
                                                            function contentReady(
                                                                $event
                                                            ) {
                                                                return _vm.$mf.dataGridPreload(
                                                                    _vm.gridData,
                                                                    _vm.dataGrid
                                                                );
                                                            },
                                                        "init-new-row":
                                                            _vm.onInitNewRow,
                                                        "editing-start":
                                                            _vm.onEditingStart,
                                                        saved: _vm.onSave,
                                                    },
                                                    scopedSlots: _vm._u([
                                                        {
                                                            key: "commandCellTemplate",
                                                            fn: function fn(
                                                                _ref
                                                            ) {
                                                                var data =
                                                                    _ref.data;
                                                                return [
                                                                    _c(
                                                                        "DxToolbar",
                                                                        {
                                                                            attrs: {
                                                                                items: [
                                                                                    {
                                                                                        visible:
                                                                                            data
                                                                                                .data
                                                                                                .status !=
                                                                                            4,
                                                                                        locateInMenu:
                                                                                            "auto",
                                                                                        showText:
                                                                                            "inMenu",
                                                                                        location:
                                                                                            "center",
                                                                                        widget: "dxButton",
                                                                                        options:
                                                                                            {
                                                                                                type: "default",
                                                                                                icon: "edit",
                                                                                                hint: _vm.$t(
                                                                                                    "buttons.edit"
                                                                                                ),
                                                                                                text: _vm.$t(
                                                                                                    "buttons.edit"
                                                                                                ),
                                                                                                onClick:
                                                                                                    function onClick() {
                                                                                                        _vm.dataGrid.editRow(
                                                                                                            data.rowIndex
                                                                                                        );
                                                                                                    },
                                                                                            },
                                                                                    },
                                                                                    {
                                                                                        locateInMenu:
                                                                                            "auto",
                                                                                        showText:
                                                                                            "inMenu",
                                                                                        location:
                                                                                            "center",
                                                                                        widget: "dxButton",
                                                                                        options:
                                                                                            {
                                                                                                type: "default",
                                                                                                icon: "trash",
                                                                                                hint: _vm.$t(
                                                                                                    "buttons.delete"
                                                                                                ),
                                                                                                text: _vm.$t(
                                                                                                    "buttons.delete"
                                                                                                ),
                                                                                                onClick:
                                                                                                    function onClick() {
                                                                                                        return _vm.$bus.emit(
                                                                                                            "checkPin",
                                                                                                            function () {
                                                                                                                return _vm.dataGrid.deleteRow(
                                                                                                                    data.rowIndex
                                                                                                                );
                                                                                                            }
                                                                                                        );
                                                                                                    },
                                                                                            },
                                                                                    },
                                                                                ],
                                                                            },
                                                                        }
                                                                    ),
                                                                ];
                                                            },
                                                        },
                                                    ]),
                                                },
                                                [
                                                    _c("DxColumn", {
                                                        attrs: {
                                                            fixed: true,
                                                            width: _vm.$devices
                                                                .phone
                                                                ? 35
                                                                : 65,
                                                            type: "buttons",
                                                            cssClass:
                                                                "dx-datagrid-command-column",
                                                            "cell-template":
                                                                "commandCellTemplate",
                                                            caption: _vm.$t(
                                                                "titles.commandHeaderTitle".concat(
                                                                    _vm.$devices
                                                                        .phone
                                                                        ? "Short"
                                                                        : ""
                                                                )
                                                            ),
                                                        },
                                                    }),
                                                    _vm._v(" "),
                                                    _c("DxColumn", {
                                                        attrs: {
                                                            "data-field":
                                                                "topic",
                                                            "header-filter": {
                                                                allowSearch: true,
                                                            },
                                                            caption: _vm.$t(
                                                                "settings.faqs.topic"
                                                            ),
                                                            "validation-rules":
                                                                _vm
                                                                    .validationRules
                                                                    .topic,
                                                        },
                                                    }),
                                                    _vm._v(" "),
                                                    _c("DxColumn", {
                                                        attrs: {
                                                            "data-field":
                                                                "question",
                                                            "header-filter": {
                                                                allowSearch: true,
                                                            },
                                                            caption: _vm.$t(
                                                                "settings.faqs.question"
                                                            ),
                                                            "validation-rules":
                                                                _vm
                                                                    .validationRules
                                                                    .question,
                                                        },
                                                    }),
                                                    _vm._v(" "),
                                                    _c("DxColumn", {
                                                        attrs: {
                                                            visible: false,
                                                            "data-field":
                                                                "answer",
                                                            "header-filter": {
                                                                allowSearch: true,
                                                            },
                                                            caption: _vm.$t(
                                                                "settings.faqs.answer"
                                                            ),
                                                            "validation-rules":
                                                                _vm
                                                                    .validationRules
                                                                    .answer,
                                                        },
                                                    }),
                                                ],
                                                1
                                            ),
                                            _vm._v(" "),
                                            _c("PickImagePopup", {
                                                ref: "pickImagePopup",
                                            }),
                                        ],
                                        1
                                    ),
                                ]
                            ),
                        ]
                    );
                };
                var staticRenderFns = [];
                render._withStripped = true;

                /***/
            },

        /***/ "./resources/js/components/Popups/PickImagePopup.vue":
            /*!***********************************************************!*\
  !*** ./resources/js/components/Popups/PickImagePopup.vue ***!
  \***********************************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! ./PickImagePopup.vue?vue&type=template&id=74bfbac2& */ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&"
                    );
                /* harmony import */ var _PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ =
                    __webpack_require__(
                        /*! ./PickImagePopup.vue?vue&type=script&lang=js& */ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&"
                    );
                /* empty/unused harmony star reexport */ /* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ =
                    __webpack_require__(
                        /*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js"
                    );

                /* normalize component */

                var component = Object(
                    _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[
                        "default"
                    ]
                )(
                    _PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[
                        "default"
                    ],
                    _PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__[
                        "render"
                    ],
                    _PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__[
                        "staticRenderFns"
                    ],
                    false,
                    null,
                    null,
                    null
                );

                /* hot reload */
                if (false) {
                    var api;
                }
                component.options.__file =
                    "resources/js/components/Popups/PickImagePopup.vue";
                /* harmony default export */ __webpack_exports__["default"] =
                    component.exports;

                /***/
            },

        /***/ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&":
            /*!************************************************************************************!*\
  !*** ./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PickImagePopup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=script&lang=js&"
                    );
                /* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[
                    "default"
                ] =
                    _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[
                        "default"
                    ];

                /***/
            },

        /***/ "./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&":
            /*!******************************************************************************************!*\
  !*** ./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2& ***!
  \******************************************************************************************/
            /*! exports provided: render, staticRenderFns */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./PickImagePopup.vue?vue&type=template&id=74bfbac2& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Popups/PickImagePopup.vue?vue&type=template&id=74bfbac2&"
                    );
                /* harmony reexport (safe) */ __webpack_require__.d(
                    __webpack_exports__,
                    "render",
                    function () {
                        return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__[
                            "render"
                        ];
                    }
                );

                /* harmony reexport (safe) */ __webpack_require__.d(
                    __webpack_exports__,
                    "staticRenderFns",
                    function () {
                        return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_PickImagePopup_vue_vue_type_template_id_74bfbac2___WEBPACK_IMPORTED_MODULE_0__[
                            "staticRenderFns"
                        ];
                    }
                );

                /***/
            },

        /***/ "./resources/js/store/modules/Admin/Settings/Faqs.js":
            /*!***********************************************************!*\
  !*** ./resources/js/store/modules/Admin/Settings/Faqs.js ***!
  \***********************************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                function initialState() {
                    return {
                        faqs: [],
                    };
                }
                var getters = {
                    faqs: function faqs(state) {
                        return state.faqs;
                    },
                };
                var actions = {
                    fetch: function fetch(_ref) {
                        var commit = _ref.commit,
                            dispatch = _ref.dispatch,
                            getters = _ref.getters,
                            state = _ref.state,
                            rootGetters = _ref.rootGetters;
                        return new Promise(function (resolve, reject) {
                            axios
                                .get("settings/faqs")
                                .then(function (response) {
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
                            axios
                                .post("settings/faqs", {
                                    changes: param.changes,
                                })
                                .then(function (response) {
                                    // console.log(response.data);
                                    resolve();
                                    dispatch("fetch");
                                });
                        });
                    },
                    resetState: function resetState(_ref3) {
                        var commit = _ref3.commit;
                        commit("resetState");
                    },
                };
                var mutations = {
                    setState: function setState(state, data) {
                        state.faqs = data;
                    },
                    resetState: function resetState(state) {
                        state = Object.assign(state, initialState());
                    },
                };
                /* harmony default export */ __webpack_exports__["default"] = {
                    namespaced: true,
                    state: initialState,
                    getters: getters,
                    actions: actions,
                    mutations: mutations,
                };

                /***/
            },

        /***/ "./resources/js/views/Settings/Faqs.vue":
            /*!**********************************************!*\
  !*** ./resources/js/views/Settings/Faqs.vue ***!
  \**********************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _Faqs_vue_vue_type_template_id_2c4e80cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! ./Faqs.vue?vue&type=template&id=2c4e80cc&scoped=true& */ "./resources/js/views/Settings/Faqs.vue?vue&type=template&id=2c4e80cc&scoped=true&"
                    );
                /* harmony import */ var _Faqs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ =
                    __webpack_require__(
                        /*! ./Faqs.vue?vue&type=script&lang=js& */ "./resources/js/views/Settings/Faqs.vue?vue&type=script&lang=js&"
                    );
                /* empty/unused harmony star reexport */ /* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ =
                    __webpack_require__(
                        /*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js"
                    );

                /* normalize component */

                var component = Object(
                    _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[
                        "default"
                    ]
                )(
                    _Faqs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[
                        "default"
                    ],
                    _Faqs_vue_vue_type_template_id_2c4e80cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__[
                        "render"
                    ],
                    _Faqs_vue_vue_type_template_id_2c4e80cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__[
                        "staticRenderFns"
                    ],
                    false,
                    null,
                    "2c4e80cc",
                    null
                );

                /* hot reload */
                if (false) {
                    var api;
                }
                component.options.__file =
                    "resources/js/views/Settings/Faqs.vue";
                /* harmony default export */ __webpack_exports__["default"] =
                    component.exports;

                /***/
            },

        /***/ "./resources/js/views/Settings/Faqs.vue?vue&type=script&lang=js&":
            /*!***********************************************************************!*\
  !*** ./resources/js/views/Settings/Faqs.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
            /*! exports provided: default */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Faqs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Faqs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Faqs.vue?vue&type=script&lang=js&"
                    );
                /* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[
                    "default"
                ] =
                    _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Faqs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[
                        "default"
                    ];

                /***/
            },

        /***/ "./resources/js/views/Settings/Faqs.vue?vue&type=template&id=2c4e80cc&scoped=true&":
            /*!*****************************************************************************************!*\
  !*** ./resources/js/views/Settings/Faqs.vue?vue&type=template&id=2c4e80cc&scoped=true& ***!
  \*****************************************************************************************/
            /*! exports provided: render, staticRenderFns */
            /***/ function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Faqs_vue_vue_type_template_id_2c4e80cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ =
                    __webpack_require__(
                        /*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./Faqs.vue?vue&type=template&id=2c4e80cc&scoped=true& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/Settings/Faqs.vue?vue&type=template&id=2c4e80cc&scoped=true&"
                    );
                /* harmony reexport (safe) */ __webpack_require__.d(
                    __webpack_exports__,
                    "render",
                    function () {
                        return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Faqs_vue_vue_type_template_id_2c4e80cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__[
                            "render"
                        ];
                    }
                );

                /* harmony reexport (safe) */ __webpack_require__.d(
                    __webpack_exports__,
                    "staticRenderFns",
                    function () {
                        return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Faqs_vue_vue_type_template_id_2c4e80cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__[
                            "staticRenderFns"
                        ];
                    }
                );

                /***/
            },
    },
]);
