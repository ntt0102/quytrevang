(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[69],{

/***/ "./node_modules/devextreme-vue/check-box.js":
/*!**************************************************!*\
  !*** ./node_modules/devextreme-vue/check-box.js ***!
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
exports.DxCheckBox = void 0;
var check_box_1 = __importDefault(__webpack_require__(/*! devextreme/ui/check_box */ "./node_modules/devextreme/esm/ui/check_box.js"));
var index_1 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var DxCheckBox = index_1.createComponent({
    props: {
        accessKey: String,
        activeStateEnabled: Boolean,
        disabled: Boolean,
        elementAttr: Object,
        focusStateEnabled: Boolean,
        height: [Function, Number, String],
        hint: String,
        hoverStateEnabled: Boolean,
        iconSize: [Number, String],
        isValid: Boolean,
        name: String,
        onContentReady: Function,
        onDisposing: Function,
        onInitialized: Function,
        onOptionChanged: Function,
        onValueChanged: Function,
        readOnly: Boolean,
        rtlEnabled: Boolean,
        tabIndex: Number,
        text: String,
        validationError: {},
        validationErrors: Array,
        validationMessageMode: String,
        validationStatus: String,
        value: {},
        visible: Boolean,
        width: [Function, Number, String]
    },
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:accessKey": null,
        "update:activeStateEnabled": null,
        "update:disabled": null,
        "update:elementAttr": null,
        "update:focusStateEnabled": null,
        "update:height": null,
        "update:hint": null,
        "update:hoverStateEnabled": null,
        "update:iconSize": null,
        "update:isValid": null,
        "update:name": null,
        "update:onContentReady": null,
        "update:onDisposing": null,
        "update:onInitialized": null,
        "update:onOptionChanged": null,
        "update:onValueChanged": null,
        "update:readOnly": null,
        "update:rtlEnabled": null,
        "update:tabIndex": null,
        "update:text": null,
        "update:validationError": null,
        "update:validationErrors": null,
        "update:validationMessageMode": null,
        "update:validationStatus": null,
        "update:value": null,
        "update:visible": null,
        "update:width": null,
    },
    model: { prop: "value", event: "update:value" },
    computed: {
        instance: function () {
            return this.$_instance;
        }
    },
    beforeCreate: function () {
        this.$_WidgetClass = check_box_1.default;
        this.$_hasAsyncTemplate = true;
    }
});
exports.DxCheckBox = DxCheckBox;
exports.default = DxCheckBox;


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/component_wrapper/editors/check_box.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/component_wrapper/editors/check_box.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckBox; });
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor */ "./node_modules/devextreme/esm/renovation/component_wrapper/editors/editor.js");
/**
 * DevExtreme (esm/renovation/component_wrapper/editors/check_box.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

class CheckBox extends _editor__WEBPACK_IMPORTED_MODULE_0__["default"] {
    _useTemplates() {
        return false
    }
    _isFocused() {
        var focusTarget = this.$element()[0];
        return focusTarget.classList.contains("dx-state-focused")
    }
    getSupportedKeyNames() {
        return ["space"]
    }
    getProps() {
        var props = super.getProps();
        if (null !== props.value) {
            props.value = Boolean(props.value)
        }
        return props
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/component_wrapper/editors/editor.js":
/*!************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/component_wrapper/editors/editor.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Editor; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _common_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/component */ "./node_modules/devextreme/esm/renovation/component_wrapper/common/component.js");
/* harmony import */ var _ui_validation_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../ui/validation_engine */ "./node_modules/devextreme/esm/ui/validation_engine.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_element_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _core_utils_callbacks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core/utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js");
/* harmony import */ var _ui_editor_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../ui/editor/editor */ "./node_modules/devextreme/esm/ui/editor/editor.js");
/**
 * DevExtreme (esm/renovation/component_wrapper/editors/editor.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */








var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var VALIDATION_TARGET = "dx-validation-target";
class Editor extends _common_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
    getProps() {
        var props = super.getProps();
        props.onFocusIn = () => {
            var isValidationMessageShownOnFocus = "auto" === this.option("validationMessageMode");
            if (isValidationMessageShownOnFocus) {
                var $validationMessageWrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_4__["default"])(".dx-invalid-message.dx-overlay-wrapper");
                null === $validationMessageWrapper || void 0 === $validationMessageWrapper ? void 0 : $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
                if (this.showValidationMessageTimeout) {
                    clearTimeout(this.showValidationMessageTimeout)
                }
                this.showValidationMessageTimeout = setTimeout(() => {
                    null === $validationMessageWrapper || void 0 === $validationMessageWrapper ? void 0 : $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO)
                }, 150)
            }
        };
        props.saveValueChangeEvent = e => {
            this._valueChangeEventInstance = e
        };
        return props
    }
    _createElement(element) {
        super._createElement(element);
        this.showValidationMessageTimeout = void 0;
        this.validationRequest = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_6__["default"])();
        Object(_core_element_data__WEBPACK_IMPORTED_MODULE_5__["data"])(this.$element()[0], VALIDATION_TARGET, this)
    }
    _render() {
        var _this$option;
        null === (_this$option = this.option("_onMarkupRendered")) || void 0 === _this$option ? void 0 : _this$option()
    }
    _initializeComponent() {
        super._initializeComponent();
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })
    }
    _initOptions(options) {
        super._initOptions(options);
        this.option(_ui_validation_engine__WEBPACK_IMPORTED_MODULE_2__["default"].initValidationOptions(options))
    }
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(super._getDefaultOptions(), {
            validationMessageOffset: {
                h: 0,
                v: 0
            },
            validationTooltipOptions: {}
        })
    }
    _bindInnerWidgetOptions(innerWidget, optionsContainer) {
        var innerWidgetOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({}, innerWidget.option());
        var syncOptions = () => this._silent(optionsContainer, innerWidgetOptions);
        syncOptions();
        innerWidget.on("optionChanged", syncOptions)
    }
    _raiseValidation(value, previousValue) {
        var areValuesEmpty = !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(previousValue);
        if (value !== previousValue && !areValuesEmpty) {
            this.validationRequest.fire({
                value: value,
                editor: this
            })
        }
    }
    _raiseValueChangeAction(value, previousValue) {
        var _this$_valueChangeAct;
        null === (_this$_valueChangeAct = this._valueChangeAction) || void 0 === _this$_valueChangeAct ? void 0 : _this$_valueChangeAct.call(this, {
            element: this.$element(),
            previousValue: previousValue,
            value: value,
            event: this._valueChangeEventInstance
        });
        this._valueChangeEventInstance = void 0
    }
    _optionChanged(option) {
        var {
            name: name,
            previousValue: previousValue,
            value: value
        } = option;
        if (name && void 0 !== this._getActionConfigs()[name]) {
            this._addAction(name)
        }
        switch (name) {
            case "value":
                this._raiseValidation(value, previousValue);
                this._raiseValueChangeAction(value, previousValue);
                break;
            case "onValueChanged":
                this._valueChangeAction = this._createActionByOption("onValueChanged", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                break;
            case "isValid":
            case "validationError":
            case "validationErrors":
            case "validationStatus":
                this.option(_ui_validation_engine__WEBPACK_IMPORTED_MODULE_2__["default"].synchronizeValidationOptions(option, this.option()))
        }
        super._optionChanged(option)
    }
    reset() {
        var {
            value: value
        } = this._getDefaultOptions();
        this.option({
            value: value
        })
    }
    _dispose() {
        super._dispose();
        Object(_core_element_data__WEBPACK_IMPORTED_MODULE_5__["data"])(this.element(), VALIDATION_TARGET, null);
        if (this.showValidationMessageTimeout) {
            clearTimeout(this.showValidationMessageTimeout)
        }
    }
}
var prevIsEditor = _ui_editor_editor__WEBPACK_IMPORTED_MODULE_7__["default"].isEditor;
var newIsEditor = instance => prevIsEditor(instance) || instance instanceof Editor;
Editor.isEditor = newIsEditor;
_ui_editor_editor__WEBPACK_IMPORTED_MODULE_7__["default"].isEditor = newIsEditor;


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/common/dom_component_wrapper.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/common/dom_component_wrapper.js ***!
  \***********************************************************************************/
/*! exports provided: viewFunction, DomComponentWrapperProps, DomComponentWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewFunction", function() { return viewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomComponentWrapperProps", function() { return DomComponentWrapperProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomComponentWrapper", function() { return DomComponentWrapper; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var _common_config_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/config_context */ "./node_modules/devextreme/esm/renovation/common/config_context.js");
/* harmony import */ var _utils_get_updated_options__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/get_updated_options */ "./node_modules/devextreme/esm/renovation/ui/common/utils/get_updated_options.js");
/**
 * DevExtreme (esm/renovation/ui/common/dom_component_wrapper.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["valueChange"],
    _excluded2 = ["componentProps", "componentType", "rootElementRef", "templateNames"];





var viewFunction = _ref => {
    var {
        props: {
            componentProps: {
                className: className
            }
        },
        restAttributes: restAttributes,
        widgetRef: widgetRef
    } = _ref;
    return Object(inferno__WEBPACK_IMPORTED_MODULE_2__["normalizeProps"])(Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "div", className, null, 1, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, restAttributes), null, widgetRef))
};
var DomComponentWrapperProps = {};

class DomComponentWrapper extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoComponent"] {
    constructor(props) {
        super(props);
        this.state = {};
        this.widgetRef = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        this.getInstance = this.getInstance.bind(this);
        this.setupWidget = this.setupWidget.bind(this);
        this.setRootElementRef = this.setRootElementRef.bind(this);
        this.updateWidget = this.updateWidget.bind(this)
    }
    get config() {
        if ("ConfigContext" in this.context) {
            return this.context.ConfigContext
        }
        return _common_config_context__WEBPACK_IMPORTED_MODULE_4__["ConfigContext"]
    }
    createEffects() {
        return [new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.setupWidget, []), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.setRootElementRef, []), new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.updateWidget, [this.props.componentProps, this.config, this.props.templateNames])]
    }
    updateEffects() {
        var _this$_effects$;
        null === (_this$_effects$ = this._effects[2]) || void 0 === _this$_effects$ ? void 0 : _this$_effects$.update([this.props.componentProps, this.config, this.props.templateNames])
    }
    setupWidget() {
        var componentInstance = new this.props.componentType(this.widgetRef.current, this.properties);
        this.instance = componentInstance;
        return () => {
            componentInstance.dispose();
            this.instance = null
        }
    }
    setRootElementRef() {
        var {
            rootElementRef: rootElementRef
        } = this.props;
        if (rootElementRef) {
            rootElementRef.current = this.widgetRef.current
        }
    }
    updateWidget() {
        var instance = this.getInstance();
        if (!instance) {
            return
        }
        var updatedOptions = Object(_utils_get_updated_options__WEBPACK_IMPORTED_MODULE_5__["getUpdatedOptions"])(this.prevProps || {}, this.properties);
        if (updatedOptions.length) {
            instance.beginUpdate();
            updatedOptions.forEach(_ref2 => {
                var {
                    path: path,
                    value: value
                } = _ref2;
                instance.option(path, value)
            });
            instance.endUpdate()
        }
        this.prevProps = this.properties
    }
    get properties() {
        var _this$config;
        var _this$props$component = this.props.componentProps,
            {
                valueChange: valueChange
            } = _this$props$component,
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props$component, _excluded);
        var properties = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
            rtlEnabled: !!(null !== (_this$config = this.config) && void 0 !== _this$config && _this$config.rtlEnabled)
        }, restProps);
        if (valueChange) {
            properties.onValueChanged = _ref3 => {
                var {
                    value: value
                } = _ref3;
                return valueChange(value)
            }
        }
        var templates = this.props.templateNames;
        templates.forEach(name => {
            if (Object(_devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["hasTemplate"])(name, properties, this)) {
                properties[name] = (item, index, container) => {
                    Object(_devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["renderTemplate"])(this.props.componentProps[name], {
                        item: item,
                        index: index,
                        container: container
                    }, this)
                }
            }
        });
        return properties
    }
    get restAttributes() {
        var _this$props = this.props,
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, _excluded2);
        return restProps
    }
    getInstance() {
        return this.instance
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props),
            widgetRef: this.widgetRef,
            config: this.config,
            properties: this.properties,
            restAttributes: this.restAttributes
        })
    }
}
DomComponentWrapper.defaultProps = DomComponentWrapperProps;


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/common/utils/get_updated_options.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/common/utils/get_updated_options.js ***!
  \***************************************************************************************/
/*! exports provided: getUpdatedOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUpdatedOptions", function() { return getUpdatedOptions; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/renovation/ui/common/utils/get_updated_options.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var defaultNotDeepCopyArrays = ["dataSource", "selectedRowKeys"];
var propsToIgnore = {
    integrationOptions: true
};

function getDiffItem(key, value, previousValue) {
    return {
        path: key,
        value: value,
        previousValue: previousValue
    }
}

function compare(resultPaths, item1, item2, key, fullPropName, notDeepCopyArrays) {
    if (propsToIgnore[key]) {
        return
    }
    var type1 = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["type"])(item1);
    var type2 = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["type"])(item2);
    if (item1 === item2) {
        return
    }
    if (type1 !== type2) {
        resultPaths.push(getDiffItem(key, item2, item1))
    } else if ("object" === type1) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(item2)) {
            resultPaths.push(getDiffItem(key, item2, item1))
        } else {
            var diffPaths = objectDiffs(item1, item2, fullPropName, notDeepCopyArrays);
            resultPaths.push(...diffPaths.map(item => Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, item, {
                path: "".concat(key, ".").concat(item.path)
            })))
        }
    } else if ("array" === type1) {
        var notDeepCopy = notDeepCopyArrays.some(prop => fullPropName.includes(prop));
        if (notDeepCopy && item1 !== item2) {
            resultPaths.push(getDiffItem(key, item2, item1))
        } else if (item1.length !== item2.length) {
            resultPaths.push(getDiffItem(key, item2, item1))
        } else {
            var _diffPaths = objectDiffs(item1, item2, fullPropName, notDeepCopyArrays);
            [].push.apply(resultPaths, _diffPaths.map(item => Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, item, {
                path: "".concat(key).concat(item.path)
            })))
        }
    } else {
        resultPaths.push(getDiffItem(key, item2, item1))
    }
}
var objectDiffsFiltered = propsEnumerator => (oldProps, props, fullPropName, notDeepCopyArrays) => {
    var resultPaths = [];
    var processItem = !Array.isArray(oldProps) ? propName => {
        compare(resultPaths, oldProps[propName], props[propName], propName, "".concat(fullPropName, ".").concat(propName), notDeepCopyArrays)
    } : propName => {
        compare(resultPaths, oldProps[propName], props[propName], "[".concat(propName, "]"), "".concat(fullPropName, ".").concat(propName), notDeepCopyArrays)
    };
    propsEnumerator(oldProps).forEach(processItem);
    Object.keys(props).filter(propName => !Object.prototype.hasOwnProperty.call(oldProps, propName) && oldProps[propName] !== props[propName]).forEach(propName => {
        resultPaths.push({
            path: propName,
            value: props[propName],
            previousValue: oldProps[propName]
        })
    });
    return resultPaths
};
var objectDiffs = objectDiffsFiltered(oldProps => Object.keys(oldProps));
var reactProps = {
    key: true,
    ref: true,
    children: true,
    style: true
};
var objectDiffsWithoutReactProps = objectDiffsFiltered(prop => Object.keys(prop).filter(p => !reactProps[p]));
function getUpdatedOptions(oldProps, props) {
    var notDeepCopyArrays = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : defaultNotDeepCopyArrays;
    return objectDiffsWithoutReactProps(oldProps, props, "", notDeepCopyArrays)
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/editors/check_box/check_box.j.js":
/*!************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/editors/check_box/check_box.j.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckBox; });
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _component_wrapper_editors_check_box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../component_wrapper/editors/check_box */ "./node_modules/devextreme/esm/renovation/component_wrapper/editors/check_box.js");
/* harmony import */ var _check_box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./check_box */ "./node_modules/devextreme/esm/renovation/ui/editors/check_box/check_box.js");
/**
 * DevExtreme (esm/renovation/ui/editors/check_box/check_box.j.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



class CheckBox extends _component_wrapper_editors_check_box__WEBPACK_IMPORTED_MODULE_1__["default"] {
    getProps() {
        var props = super.getProps();
        props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
        return props
    }
    focus() {
        var _this$viewRef;
        return null === (_this$viewRef = this.viewRef) || void 0 === _this$viewRef ? void 0 : _this$viewRef.focus(...arguments)
    }
    blur() {
        var _this$viewRef2;
        return null === (_this$viewRef2 = this.viewRef) || void 0 === _this$viewRef2 ? void 0 : _this$viewRef2.blur(...arguments)
    }
    _getActionConfigs() {
        return {
            onFocusIn: {},
            onClick: {}
        }
    }
    get _propsInfo() {
        return {
            twoWay: [
                ["value", "defaultValue", "valueChange"]
            ],
            allowNull: ["defaultValue", "validationError", "validationErrors", "value"],
            elements: [],
            templates: [],
            props: ["text", "iconSize", "activeStateEnabled", "hoverStateEnabled", "saveValueChangeEvent", "defaultValue", "valueChange", "readOnly", "name", "validationError", "validationErrors", "validationMessageMode", "validationStatus", "isValid", "onFocusIn", "className", "accessKey", "disabled", "focusStateEnabled", "height", "hint", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width", "aria", "value"]
        }
    }
    get _viewComponent() {
        return _check_box__WEBPACK_IMPORTED_MODULE_2__["CheckBox"]
    }
}
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_0__["default"])("dxCheckBox", CheckBox);
CheckBox.defaultOptions = _check_box__WEBPACK_IMPORTED_MODULE_2__["defaultOptions"];


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/editors/check_box/check_box.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/editors/check_box/check_box.js ***!
  \**********************************************************************************/
/*! exports provided: viewFunction, CheckBoxProps, CheckBoxPropsType, defaultOptionRules, CheckBox, defaultOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewFunction", function() { return viewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckBoxProps", function() { return CheckBoxProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckBoxPropsType", function() { return CheckBoxPropsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptionRules", function() { return defaultOptionRules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckBox", function() { return CheckBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return defaultOptions; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var _core_options_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../core/options/utils */ "./node_modules/devextreme/esm/core/options/utils.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _internal_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../internal/editor */ "./node_modules/devextreme/esm/renovation/ui/editors/internal/editor.js");
/* harmony import */ var _utils_combine_classes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/combine_classes */ "./node_modules/devextreme/esm/renovation/utils/combine_classes.js");
/* harmony import */ var _check_box_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./check_box_icon */ "./node_modules/devextreme/esm/renovation/ui/editors/check_box/check_box_icon.js");
/* harmony import */ var _common_widget__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/widget */ "./node_modules/devextreme/esm/renovation/ui/common/widget.js");
/**
 * DevExtreme (esm/renovation/ui/editors/check_box/check_box.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["accessKey", "activeStateEnabled", "aria", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "iconSize", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "saveValueChangeEvent", "tabIndex", "text", "validationError", "validationErrors", "validationMessageMode", "validationStatus", "value", "valueChange", "visible", "width"];









var getCssClasses = model => {
    var {
        text: text,
        value: value
    } = model;
    var checked = value;
    var indeterminate = null === checked;
    var classesMap = {
        "dx-checkbox": true,
        "dx-checkbox-checked": true === checked,
        "dx-checkbox-has-text": !!text,
        "dx-checkbox-indeterminate": indeterminate
    };
    return Object(_utils_combine_classes__WEBPACK_IMPORTED_MODULE_7__["combineClasses"])(classesMap)
};
var viewFunction = viewModel => {
    var {
        aria: aria,
        cssClasses: classes,
        editorRef: editorRef,
        keyDown: onKeyDown,
        onWidgetClick: onClick,
        props: {
            accessKey: accessKey,
            activeStateEnabled: activeStateEnabled,
            className: className,
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            height: height,
            hint: hint,
            hoverStateEnabled: hoverStateEnabled,
            iconSize: iconSize,
            isValid: isValid,
            name: name,
            onFocusIn: onFocusIn,
            readOnly: readOnly,
            rtlEnabled: rtlEnabled,
            tabIndex: tabIndex,
            text: text,
            validationError: validationError,
            validationErrors: validationErrors,
            validationMessageMode: validationMessageMode,
            validationStatus: validationStatus,
            value: value,
            visible: visible,
            width: width
        },
        restAttributes: restAttributes
    } = viewModel;
    return Object(inferno__WEBPACK_IMPORTED_MODULE_2__["normalizeProps"])(Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, _internal_editor__WEBPACK_IMPORTED_MODULE_6__["Editor"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
        aria: aria,
        classes: classes,
        onClick: onClick,
        onKeyDown: onKeyDown,
        accessKey: accessKey,
        activeStateEnabled: activeStateEnabled,
        focusStateEnabled: focusStateEnabled,
        hoverStateEnabled: hoverStateEnabled,
        className: className,
        disabled: disabled,
        readOnly: readOnly,
        hint: hint,
        height: height,
        width: width,
        rtlEnabled: rtlEnabled,
        tabIndex: tabIndex,
        visible: visible,
        validationError: validationError,
        validationErrors: validationErrors,
        validationMessageMode: validationMessageMode,
        validationStatus: validationStatus,
        isValid: isValid,
        onFocusIn: onFocusIn
    }, restAttributes, {
        children: Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createFragment"])([Object(inferno__WEBPACK_IMPORTED_MODULE_2__["normalizeProps"])(Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(64, "input", null, null, 1, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
            type: "hidden",
            value: "".concat(value)
        }, name && {
            name: name
        }))), Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "div", "dx-checkbox-container", [Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, _check_box_icon__WEBPACK_IMPORTED_MODULE_8__["CheckBoxIcon"], {
            size: iconSize,
            isChecked: true === value
        }), text && Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "span", "dx-checkbox-text", text, 0)], 0)], 4)
    }), null, editorRef))
};
var CheckBoxProps = Object.create(Object.prototype, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.getOwnPropertyDescriptors(_internal_editor__WEBPACK_IMPORTED_MODULE_6__["EditorProps"]), Object.getOwnPropertyDescriptors({
    text: "",
    activeStateEnabled: true,
    hoverStateEnabled: true,
    defaultValue: false,
    valueChange: () => {}
})));
var CheckBoxPropsType = {
    get text() {
        return CheckBoxProps.text
    },
    get activeStateEnabled() {
        return CheckBoxProps.activeStateEnabled
    },
    get hoverStateEnabled() {
        return CheckBoxProps.hoverStateEnabled
    },
    get defaultValue() {
        return CheckBoxProps.defaultValue
    },
    get valueChange() {
        return CheckBoxProps.valueChange
    },
    get readOnly() {
        return CheckBoxProps.readOnly
    },
    get name() {
        return CheckBoxProps.name
    },
    get validationError() {
        return CheckBoxProps.validationError
    },
    get validationErrors() {
        return CheckBoxProps.validationErrors
    },
    get validationMessageMode() {
        return CheckBoxProps.validationMessageMode
    },
    get validationStatus() {
        return CheckBoxProps.validationStatus
    },
    get isValid() {
        return CheckBoxProps.isValid
    },
    get className() {
        return CheckBoxProps.className
    },
    get disabled() {
        return CheckBoxProps.disabled
    },
    get focusStateEnabled() {
        return CheckBoxProps.focusStateEnabled
    },
    get rtlEnabled() {
        return CheckBoxProps.rtlEnabled
    },
    get tabIndex() {
        return CheckBoxProps.tabIndex
    },
    get visible() {
        return CheckBoxProps.visible
    },
    get aria() {
        return _common_widget__WEBPACK_IMPORTED_MODULE_9__["WidgetProps"].aria
    }
};
var defaultOptionRules = Object(_core_options_utils__WEBPACK_IMPORTED_MODULE_4__["createDefaultOptionRules"])([{
    device: () => "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_5__["default"].real().deviceType && !_core_devices__WEBPACK_IMPORTED_MODULE_5__["default"].isSimulator(),
    options: {
        focusStateEnabled: true
    }
}]);


class CheckBox extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoWrapperComponent"] {
    constructor(props) {
        super(props);
        this.editorRef = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        this.state = {
            value: void 0 !== this.props.value ? this.props.value : this.props.defaultValue
        };
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.onWidgetClick = this.onWidgetClick.bind(this);
        this.keyDown = this.keyDown.bind(this)
    }
    createEffects() {
        return [Object(_devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["createReRenderEffect"])()]
    }
    onWidgetClick(event) {
        var _ref;
        var {
            readOnly: readOnly,
            saveValueChangeEvent: saveValueChangeEvent
        } = this.props;
        var value = null !== (_ref = void 0 !== this.props.value ? this.props.value : this.state.value) && void 0 !== _ref ? _ref : false;
        if (!readOnly) {
            null === saveValueChangeEvent || void 0 === saveValueChangeEvent ? void 0 : saveValueChangeEvent(event);
            var __newValue;
            this.setState(__state_argument => {
                __newValue = !value;
                return {
                    value: __newValue
                }
            });
            this.props.valueChange(__newValue)
        }
    }
    keyDown(e) {
        var {
            onKeyDown: onKeyDown
        } = this.props;
        var {
            keyName: keyName,
            originalEvent: originalEvent,
            which: which
        } = e;
        var result = null === onKeyDown || void 0 === onKeyDown ? void 0 : onKeyDown(e);
        if (null !== result && void 0 !== result && result.cancel) {
            return result
        }
        if ("space" === keyName || "space" === which) {
            originalEvent.preventDefault();
            this.onWidgetClick(originalEvent)
        }
        return
    }
    get cssClasses() {
        return getCssClasses(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, this.props, {
            value: void 0 !== this.props.value ? this.props.value : this.state.value
        }))
    }
    get aria() {
        var checked = true === (void 0 !== this.props.value ? this.props.value : this.state.value);
        var indeterminate = null === (void 0 !== this.props.value ? this.props.value : this.state.value);
        var result = {
            role: "checkbox",
            checked: indeterminate ? "mixed" : "".concat(checked)
        };
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, result, this.props.aria)
    }
    get restAttributes() {
        var _this$props$value = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, this.props, {
                value: void 0 !== this.props.value ? this.props.value : this.state.value
            }),
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props$value, _excluded);
        return restProps
    }
    focus() {
        this.editorRef.current.focus()
    }
    blur() {
        this.editorRef.current.blur()
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
                value: void 0 !== this.props.value ? this.props.value : this.state.value
            }),
            editorRef: this.editorRef,
            onWidgetClick: this.onWidgetClick,
            keyDown: this.keyDown,
            cssClasses: this.cssClasses,
            aria: this.aria,
            restAttributes: this.restAttributes
        })
    }
}

function __processTwoWayProps(defaultProps) {
    var twoWayProps = ["value"];
    return Object.keys(defaultProps).reduce((props, propName) => {
        var propValue = defaultProps[propName];
        var defaultPropName = twoWayProps.some(p => p === propName) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
        props[defaultPropName] = propValue;
        return props
    }, {})
}
CheckBox.defaultProps = Object.create(Object.prototype, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.getOwnPropertyDescriptors(CheckBoxPropsType), Object.getOwnPropertyDescriptors(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, __processTwoWayProps(Object(_core_options_utils__WEBPACK_IMPORTED_MODULE_4__["convertRulesToOptions"])(defaultOptionRules))))));
var __defaultOptionRules = [];
function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    CheckBox.defaultProps = Object.create(Object.prototype, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.getOwnPropertyDescriptors(CheckBox.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps(Object(_core_options_utils__WEBPACK_IMPORTED_MODULE_4__["convertRulesToOptions"])(defaultOptionRules))), Object.getOwnPropertyDescriptors(__processTwoWayProps(Object(_core_options_utils__WEBPACK_IMPORTED_MODULE_4__["convertRulesToOptions"])(__defaultOptionRules)))))
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/editors/check_box/check_box_icon.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/editors/check_box/check_box_icon.js ***!
  \***************************************************************************************/
/*! exports provided: viewFunction, CheckBoxIconProps, CheckBoxIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewFunction", function() { return viewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckBoxIconProps", function() { return CheckBoxIconProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckBoxIcon", function() { return CheckBoxIcon; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var _utils_get_computed_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/get_computed_style */ "./node_modules/devextreme/esm/renovation/utils/get_computed_style.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../core/utils/style */ "./node_modules/devextreme/esm/core/utils/style.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/renovation/ui/editors/check_box/utils.js");
/**
 * DevExtreme (esm/renovation/ui/editors/check_box/check_box_icon.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["isChecked", "size"];







var viewFunction = viewModel => {
    var {
        cssStyles: cssStyles,
        elementRef: elementRef
    } = viewModel;
    return Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "span", "dx-checkbox-icon", null, 1, {
        style: Object(_devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["normalizeStyles"])(cssStyles)
    }, null, elementRef)
};
var CheckBoxIconProps = {
    isChecked: false
};

class CheckBoxIcon extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoComponent"] {
    constructor(props) {
        super(props);
        this.state = {};
        this.elementRef = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        this.__getterCache = {};
        this.updateFontSize = this.updateFontSize.bind(this);
        this.setIconFontSize = this.setIconFontSize.bind(this);
        this.getIconSize = this.getIconSize.bind(this);
        this.getComputedIconSize = this.getComputedIconSize.bind(this)
    }
    createEffects() {
        return [new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.updateFontSize, [this.props.isChecked, this.props.size])]
    }
    updateEffects() {
        var _this$_effects$;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ ? void 0 : _this$_effects$.update([this.props.isChecked, this.props.size])
    }
    updateFontSize() {
        var {
            isChecked: isChecked,
            size: size
        } = this.props;
        if (Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_5__["hasWindow"])() && size) {
            var newIconSize = this.getIconSize(size);
            var newFontSize = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["getFontSizeByIconSize"])(newIconSize, isChecked);
            this.setIconFontSize(newFontSize)
        }
    }
    setIconFontSize(fontSize) {
        var element = this.elementRef.current;
        element.style.fontSize = "".concat(fontSize, "px")
    }
    getIconSize(size) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isNumeric"])(size)) {
            return size
        }
        if (size.endsWith("px")) {
            return parseInt(size, 10)
        }
        return this.getComputedIconSize()
    }
    getComputedIconSize() {
        var element = this.elementRef.current;
        var iconComputedStyle = Object(_utils_get_computed_style__WEBPACK_IMPORTED_MODULE_4__["default"])(element);
        var computedIconSize = parseInt(null === iconComputedStyle || void 0 === iconComputedStyle ? void 0 : iconComputedStyle.width, 10);
        return computedIconSize
    }
    get cssStyles() {
        if (void 0 !== this.__getterCache.cssStyles) {
            return this.__getterCache.cssStyles
        }
        return this.__getterCache.cssStyles = (() => {
            var {
                size: size
            } = this.props;
            var width = Object(_core_utils_style__WEBPACK_IMPORTED_MODULE_6__["normalizeStyleProp"])("width", size);
            var height = Object(_core_utils_style__WEBPACK_IMPORTED_MODULE_6__["normalizeStyleProp"])("height", size);
            return {
                height: height,
                width: width
            }
        })()
    }
    get restAttributes() {
        var _this$props = this.props,
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_this$props, _excluded);
        return restProps
    }
    componentWillUpdate(nextProps, nextState, context) {
        super.componentWillUpdate();
        if (this.props.size !== nextProps.size) {
            this.__getterCache.cssStyles = void 0
        }
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props),
            elementRef: this.elementRef,
            setIconFontSize: this.setIconFontSize,
            getIconSize: this.getIconSize,
            getComputedIconSize: this.getComputedIconSize,
            cssStyles: this.cssStyles,
            restAttributes: this.restAttributes
        })
    }
}
CheckBoxIcon.defaultProps = CheckBoxIconProps;


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/editors/check_box/utils.js":
/*!******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/editors/check_box/utils.js ***!
  \******************************************************************************/
/*! exports provided: getDefaultFontSize, getDefaultIconSize, getFontSizeByIconSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultFontSize", function() { return getDefaultFontSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultIconSize", function() { return getDefaultIconSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFontSizeByIconSize", function() { return getFontSizeByIconSize; });
/* harmony import */ var _ui_themes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../ui/themes */ "./node_modules/devextreme/esm/ui/themes.js");
/**
 * DevExtreme (esm/renovation/ui/editors/check_box/utils.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var defaultIconSizes = [
    [22, 16],
    [18, 16]
];
var defaultFontSizes = [
    [
        [12, 8],
        [20, 18]
    ],
    [
        [16, 10],
        [16, 14]
    ]
];

function getThemeType() {
    var theme = Object(_ui_themes__WEBPACK_IMPORTED_MODULE_0__["current"])();
    return {
        isMaterialTheme: Object(_ui_themes__WEBPACK_IMPORTED_MODULE_0__["isMaterial"])(theme),
        isCompactTheme: Object(_ui_themes__WEBPACK_IMPORTED_MODULE_0__["isCompact"])(theme)
    }
}

function getDefaultIconSize() {
    var {
        isCompactTheme: isCompactTheme,
        isMaterialTheme: isMaterialTheme
    } = getThemeType();
    return defaultIconSizes[+isMaterialTheme][+isCompactTheme]
}

function getDefaultFontSize(isChecked) {
    var {
        isCompactTheme: isCompactTheme,
        isMaterialTheme: isMaterialTheme
    } = getThemeType();
    return defaultFontSizes[+isChecked][+isMaterialTheme][+isCompactTheme]
}

function getFontSizeByIconSize(iconSize, isChecked) {
    var defaultFontSize = getDefaultFontSize(isChecked);
    var defaultIconSize = getDefaultIconSize();
    var fontToIconSizeRatio = defaultFontSize / defaultIconSize;
    return Math.ceil(fontToIconSizeRatio * iconSize)
}



/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/editors/internal/editor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/editors/internal/editor.js ***!
  \******************************************************************************/
/*! exports provided: viewFunction, EditorProps, EditorPropsType, Editor, defaultOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewFunction", function() { return viewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorProps", function() { return EditorProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorPropsType", function() { return EditorPropsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Editor", function() { return Editor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return defaultOptions; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var _core_guid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../core/guid */ "./node_modules/devextreme/esm/core/guid.js");
/* harmony import */ var _common_widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../common/widget */ "./node_modules/devextreme/esm/renovation/ui/common/widget.js");
/* harmony import */ var _common_base_props__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../common/base_props */ "./node_modules/devextreme/esm/renovation/ui/common/base_props.js");
/* harmony import */ var _utils_combine_classes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/combine_classes */ "./node_modules/devextreme/esm/renovation/utils/combine_classes.js");
/* harmony import */ var _overlays_validation_message__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../overlays/validation_message */ "./node_modules/devextreme/esm/renovation/ui/overlays/validation_message.js");
/* harmony import */ var _core_options_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../core/options/utils */ "./node_modules/devextreme/esm/core/options/utils.js");
/**
 * DevExtreme (esm/renovation/ui/editors/internal/editor.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["accessKey", "activeStateEnabled", "aria", "children", "className", "classes", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationStatus", "value", "valueChange", "visible", "width"];








var getCssClasses = model => {
    var {
        classes: classes,
        isValid: isValid,
        readOnly: readOnly
    } = model;
    var classesMap = {
        "dx-state-readonly": !!readOnly,
        "dx-invalid": !isValid,
        ["".concat(classes)]: !!classes
    };
    return Object(_utils_combine_classes__WEBPACK_IMPORTED_MODULE_7__["combineClasses"])(classesMap)
};
var viewFunction = viewModel => {
    var {
        aria: aria,
        cssClasses: classes,
        isValidationMessageVisible: isValidationMessageVisible,
        onFocusIn: onFocusIn,
        props: {
            accessKey: accessKey,
            activeStateEnabled: activeStateEnabled,
            children: children,
            className: className,
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            height: height,
            hint: hint,
            hoverStateEnabled: hoverStateEnabled,
            onClick: onClick,
            onKeyDown: onKeyDown,
            rtlEnabled: rtlEnabled,
            tabIndex: tabIndex,
            validationMessageMode: validationMessageMode,
            visible: visible,
            width: width
        },
        restAttributes: restAttributes,
        rootElementRef: rootElementRef,
        validationErrors: validationErrors,
        validationMessageGuid: validationMessageGuid,
        validationMessageTarget: validationMessageTarget,
        widgetRef: widgetRef
    } = viewModel;
    return Object(inferno__WEBPACK_IMPORTED_MODULE_2__["normalizeProps"])(Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, _common_widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
        rootElementRef: rootElementRef,
        aria: aria,
        classes: classes,
        activeStateEnabled: activeStateEnabled,
        focusStateEnabled: focusStateEnabled,
        hoverStateEnabled: hoverStateEnabled,
        accessKey: accessKey,
        className: className,
        rtlEnabled: rtlEnabled,
        hint: hint,
        disabled: disabled,
        height: height,
        width: width,
        onFocusIn: onFocusIn,
        onClick: onClick,
        onKeyDown: onKeyDown,
        tabIndex: tabIndex,
        visible: visible
    }, restAttributes, {
        children: Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createFragment"])([children, isValidationMessageVisible && Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, _overlays_validation_message__WEBPACK_IMPORTED_MODULE_8__["ValidationMessage"], {
            validationErrors: validationErrors,
            mode: validationMessageMode,
            positionRequest: "below",
            rtlEnabled: rtlEnabled,
            target: validationMessageTarget,
            boundary: validationMessageTarget,
            container: validationMessageTarget,
            contentId: validationMessageGuid
        })], 0)
    }), null, widgetRef))
};
var EditorProps = Object.create(Object.prototype, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.getOwnPropertyDescriptors(_common_base_props__WEBPACK_IMPORTED_MODULE_6__["BaseWidgetProps"]), Object.getOwnPropertyDescriptors({
    readOnly: false,
    name: "",
    validationError: null,
    validationErrors: null,
    validationMessageMode: "auto",
    validationStatus: "valid",
    isValid: true,
    defaultValue: null,
    valueChange: () => {}
})));
var EditorPropsType = {
    get readOnly() {
        return EditorProps.readOnly
    },
    get name() {
        return EditorProps.name
    },
    get validationError() {
        return EditorProps.validationError
    },
    get validationErrors() {
        return EditorProps.validationErrors
    },
    get validationMessageMode() {
        return EditorProps.validationMessageMode
    },
    get validationStatus() {
        return EditorProps.validationStatus
    },
    get isValid() {
        return EditorProps.isValid
    },
    get defaultValue() {
        return EditorProps.defaultValue
    },
    get valueChange() {
        return EditorProps.valueChange
    },
    get className() {
        return EditorProps.className
    },
    get activeStateEnabled() {
        return EditorProps.activeStateEnabled
    },
    get disabled() {
        return EditorProps.disabled
    },
    get focusStateEnabled() {
        return EditorProps.focusStateEnabled
    },
    get hoverStateEnabled() {
        return EditorProps.hoverStateEnabled
    },
    get rtlEnabled() {
        return EditorProps.rtlEnabled
    },
    get tabIndex() {
        return EditorProps.tabIndex
    },
    get visible() {
        return EditorProps.visible
    },
    get aria() {
        return _common_widget__WEBPACK_IMPORTED_MODULE_5__["WidgetProps"].aria
    },
    get classes() {
        return _common_widget__WEBPACK_IMPORTED_MODULE_5__["WidgetProps"].classes
    }
};



class Editor extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoWrapperComponent"] {
    constructor(props) {
        super(props);
        this.widgetRef = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        this.rootElementRef = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        this.__getterCache = {};
        this.state = {
            validationMessageGuid: "dx-".concat(new _core_guid__WEBPACK_IMPORTED_MODULE_4__["default"]),
            isValidationMessageVisible: false,
            value: void 0 !== this.props.value ? this.props.value : this.props.defaultValue
        };
        this.updateValidationMessageVisibility = this.updateValidationMessageVisibility.bind(this);
        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.onFocusIn = this.onFocusIn.bind(this)
    }
    createEffects() {
        return [new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.updateValidationMessageVisibility, [this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]), Object(_devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["createReRenderEffect"])()]
    }
    updateEffects() {
        var _this$_effects$;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ ? void 0 : _this$_effects$.update([this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors])
    }
    updateValidationMessageVisibility() {
        this.setState(__state_argument => ({
            isValidationMessageVisible: this.shouldShowValidationMessage
        }))
    }
    onFocusIn(event) {
        var {
            onFocusIn: onFocusIn
        } = this.props;
        null === onFocusIn || void 0 === onFocusIn ? void 0 : onFocusIn(event)
    }
    get cssClasses() {
        return "".concat(getCssClasses(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, this.props, {
            value: void 0 !== this.props.value ? this.props.value : this.state.value
        })))
    }
    get shouldShowValidationMessage() {
        var _this$validationError;
        var {
            isValid: isValid,
            validationStatus: validationStatus
        } = this.props;
        var validationErrors = null !== (_this$validationError = this.validationErrors) && void 0 !== _this$validationError ? _this$validationError : [];
        var isEditorValid = isValid && "invalid" !== validationStatus;
        return !isEditorValid && validationErrors.length > 0
    }
    get aria() {
        var {
            isValid: isValid,
            readOnly: readOnly
        } = this.props;
        var result = {
            readonly: readOnly ? "true" : "false",
            invalid: !isValid ? "true" : "false"
        };
        if (this.shouldShowValidationMessage) {
            result.describedBy = this.state.validationMessageGuid
        }
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, result, this.props.aria)
    }
    get validationErrors() {
        if (void 0 !== this.__getterCache.validationErrors) {
            return this.__getterCache.validationErrors
        }
        return this.__getterCache.validationErrors = (() => {
            var {
                validationError: validationError,
                validationErrors: validationErrors
            } = this.props;
            var allValidationErrors = validationErrors && [...validationErrors];
            if (!allValidationErrors && validationError) {
                allValidationErrors = [Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, validationError)]
            }
            return allValidationErrors
        })()
    }
    get validationMessageTarget() {
        var _this$rootElementRef;
        return null === (_this$rootElementRef = this.rootElementRef) || void 0 === _this$rootElementRef ? void 0 : _this$rootElementRef.current
    }
    get restAttributes() {
        var _this$props$value = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, this.props, {
                value: void 0 !== this.props.value ? this.props.value : this.state.value
            }),
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props$value, _excluded);
        return restProps
    }
    focus() {
        this.widgetRef.current.focus()
    }
    blur() {
        this.widgetRef.current.blur()
    }
    componentWillUpdate(nextProps, nextState, context) {
        super.componentWillUpdate();
        if (this.props.validationError !== nextProps.validationError || this.props.validationErrors !== nextProps.validationErrors) {
            this.__getterCache.validationErrors = void 0
        }
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
                value: void 0 !== this.props.value ? this.props.value : this.state.value
            }),
            validationMessageGuid: this.state.validationMessageGuid,
            isValidationMessageVisible: this.state.isValidationMessageVisible,
            rootElementRef: this.rootElementRef,
            widgetRef: this.widgetRef,
            onFocusIn: this.onFocusIn,
            cssClasses: this.cssClasses,
            shouldShowValidationMessage: this.shouldShowValidationMessage,
            aria: this.aria,
            validationErrors: this.validationErrors,
            validationMessageTarget: this.validationMessageTarget,
            restAttributes: this.restAttributes
        })
    }
}

function __processTwoWayProps(defaultProps) {
    var twoWayProps = ["value"];
    return Object.keys(defaultProps).reduce((props, propName) => {
        var propValue = defaultProps[propName];
        var defaultPropName = twoWayProps.some(p => p === propName) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
        props[defaultPropName] = propValue;
        return props
    }, {})
}
Editor.defaultProps = EditorPropsType;
var __defaultOptionRules = [];
function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    Editor.defaultProps = Object.create(Object.prototype, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.getOwnPropertyDescriptors(Editor.defaultProps), Object.getOwnPropertyDescriptors(__processTwoWayProps(Object(_core_options_utils__WEBPACK_IMPORTED_MODULE_9__["convertRulesToOptions"])(__defaultOptionRules)))))
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/overlays/validation_message.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/overlays/validation_message.js ***!
  \**********************************************************************************/
/*! exports provided: viewFunction, ValidationMessageProps, ValidationMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewFunction", function() { return viewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationMessageProps", function() { return ValidationMessageProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationMessage", function() { return ValidationMessage; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var _ui_validation_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ui/validation_message */ "./node_modules/devextreme/esm/ui/validation_message.js");
/* harmony import */ var _common_dom_component_wrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/dom_component_wrapper */ "./node_modules/devextreme/esm/renovation/ui/common/dom_component_wrapper.js");
/* harmony import */ var _common_base_props__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/base_props */ "./node_modules/devextreme/esm/renovation/ui/common/base_props.js");
/**
 * DevExtreme (esm/renovation/ui/overlays/validation_message.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["accessKey", "activeStateEnabled", "boundary", "className", "container", "contentId", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "mode", "offset", "onClick", "onKeyDown", "positionRequest", "rtlEnabled", "tabIndex", "target", "validationErrors", "visible", "width"];





var viewFunction = _ref => {
    var {
        props: props,
        restAttributes: restAttributes
    } = _ref;
    return Object(inferno__WEBPACK_IMPORTED_MODULE_2__["normalizeProps"])(Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, _common_dom_component_wrapper__WEBPACK_IMPORTED_MODULE_5__["DomComponentWrapper"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
        componentType: _ui_validation_message__WEBPACK_IMPORTED_MODULE_4__["default"],
        componentProps: props,
        templateNames: []
    }, restAttributes)))
};
var ValidationMessageProps = Object.create(Object.prototype, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.getOwnPropertyDescriptors(_common_base_props__WEBPACK_IMPORTED_MODULE_6__["BaseWidgetProps"]), Object.getOwnPropertyDescriptors({
    mode: "auto",
    get offset() {
        return {
            h: 0,
            v: 0
        }
    },
    isReactComponentWrapper: true
})));
class ValidationMessage extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["BaseInfernoComponent"] {
    constructor(props) {
        super(props);
        this.state = {}
    }
    get restAttributes() {
        var _this$props = this.props,
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, _excluded);
        return restProps
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props),
            restAttributes: this.restAttributes
        })
    }
}
ValidationMessage.defaultProps = ValidationMessageProps;


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/utils/get_computed_style.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/utils/get_computed_style.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getElementComputedStyle; });
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/**
 * DevExtreme (esm/renovation/utils/get_computed_style.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_0__["getWindow"])();
function getElementComputedStyle(el) {
    var _window$getComputedSt;
    return el ? null === (_window$getComputedSt = window.getComputedStyle) || void 0 === _window$getComputedSt ? void 0 : _window$getComputedSt.call(window, el) : null
}


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/check_box.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/check_box.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renovation_ui_editors_check_box_check_box_j__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renovation/ui/editors/check_box/check_box.j */ "./node_modules/devextreme/esm/renovation/ui/editors/check_box/check_box.j.js");
/**
 * DevExtreme (esm/ui/check_box.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

/* harmony default export */ __webpack_exports__["default"] = (_renovation_ui_editors_check_box_check_box_j__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/editor/editor.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/editor/editor.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_element_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _validation_engine__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../validation_engine */ "./node_modules/devextreme/esm/ui/validation_engine.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _validation_message__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../validation_message */ "./node_modules/devextreme/esm/ui/validation_message.js");
/* harmony import */ var _core_guid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/guid */ "./node_modules/devextreme/esm/core/guid.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/**
 * DevExtreme (esm/ui/editor/editor.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */













var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var READONLY_STATE_CLASS = "dx-state-readonly";
var INVALID_CLASS = "dx-invalid";
var DX_INVALID_BADGE_CLASS = "dx-show-invalid-badge";
var VALIDATION_TARGET = "dx-validation-target";
var VALIDATION_STATUS_VALID = "valid";
var VALIDATION_STATUS_INVALID = "invalid";
var READONLY_NAMESPACE = "editorReadOnly";
var ALLOWED_STYLING_MODES = ["outlined", "filled", "underlined"];
var VALIDATION_MESSAGE_KEYS_MAP = {
    validationMessageMode: "mode",
    validationMessageOffset: "offset",
    validationBoundary: "boundary"
};
var Editor = _widget_ui_widget__WEBPACK_IMPORTED_MODULE_6__["default"].inherit({
    ctor: function() {
        this.showValidationMessageTimeout = null;
        this.validationRequest = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])();
        this.callBase.apply(this, arguments)
    },
    _createElement: function(element) {
        this.callBase(element);
        var $element = this.$element();
        if ($element) {
            Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["data"])($element[0], VALIDATION_TARGET, this)
        }
    },
    _initOptions: function(options) {
        this.callBase.apply(this, arguments);
        this.option(_validation_engine__WEBPACK_IMPORTED_MODULE_7__["default"].initValidationOptions(options))
    },
    _init: function() {
        this.callBase();
        this._options.cache("validationTooltipOptions", this.option("validationTooltipOptions"));
        var $element = this.$element();
        $element.addClass(DX_INVALID_BADGE_CLASS)
    },
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])(this.callBase(), {
            value: null,
            name: "",
            onValueChanged: null,
            readOnly: false,
            isValid: true,
            validationError: null,
            validationErrors: null,
            validationStatus: VALIDATION_STATUS_VALID,
            validationMessageMode: "auto",
            validationBoundary: void 0,
            validationMessageOffset: {
                h: 0,
                v: 0
            },
            validationTooltipOptions: {}
        })
    },
    _attachKeyboardEvents: function() {
        if (!this.option("readOnly")) {
            this.callBase()
        }
    },
    _setOptionsByReference: function() {
        this.callBase();
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])(this._optionsByReference, {
            validationError: true
        })
    },
    _createValueChangeAction: function() {
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _suppressValueChangeAction: function() {
        this._valueChangeActionSuppressed = true
    },
    _resumeValueChangeAction: function() {
        this._valueChangeActionSuppressed = false
    },
    _initMarkup: function() {
        var _this$option;
        this._toggleReadOnlyState();
        this._setSubmitElementName(this.option("name"));
        this.callBase();
        this._renderValidationState();
        null === (_this$option = this.option("_onMarkupRendered")) || void 0 === _this$option ? void 0 : _this$option()
    },
    _raiseValueChangeAction: function(value, previousValue) {
        if (!this._valueChangeAction) {
            this._createValueChangeAction()
        }
        this._valueChangeAction(this._valueChangeArgs(value, previousValue))
    },
    _valueChangeArgs: function(value, previousValue) {
        return {
            value: value,
            previousValue: previousValue,
            event: this._valueChangeEventInstance
        }
    },
    _saveValueChangeEvent: function(e) {
        this._valueChangeEventInstance = e
    },
    _focusInHandler: function(e) {
        var isValidationMessageShownOnFocus = "auto" === this.option("validationMessageMode");
        if (this._canValueBeChangedByClick() && isValidationMessageShownOnFocus) {
            var _this$_validationMess;
            var $validationMessageWrapper = null === (_this$_validationMess = this._validationMessage) || void 0 === _this$_validationMess ? void 0 : _this$_validationMess.$wrapper();
            null === $validationMessageWrapper || void 0 === $validationMessageWrapper ? void 0 : $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO);
            clearTimeout(this.showValidationMessageTimeout);
            this.showValidationMessageTimeout = setTimeout(() => null === $validationMessageWrapper || void 0 === $validationMessageWrapper ? void 0 : $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO), 150)
        }
        return this.callBase(e)
    },
    _canValueBeChangedByClick: function() {
        return false
    },
    _getStylingModePrefix: function() {
        return "dx-editor-"
    },
    _renderStylingMode: function() {
        var optionValue = this.option("stylingMode");
        var prefix = this._getStylingModePrefix();
        var allowedStylingClasses = ALLOWED_STYLING_MODES.map(mode => prefix + mode);
        allowedStylingClasses.forEach(className => this.$element().removeClass(className));
        var stylingModeClass = prefix + optionValue;
        if (-1 === allowedStylingClasses.indexOf(stylingModeClass)) {
            var defaultOptionValue = this._getDefaultOptions().stylingMode;
            var platformOptionValue = this._convertRulesToOptions(this._defaultOptionsRules()).stylingMode;
            stylingModeClass = prefix + (platformOptionValue || defaultOptionValue)
        }
        this.$element().addClass(stylingModeClass)
    },
    _getValidationErrors: function() {
        var validationErrors = this.option("validationErrors");
        if (!validationErrors && this.option("validationError")) {
            validationErrors = [this.option("validationError")]
        }
        return validationErrors
    },
    _disposeValidationMessage: function() {
        if (this._$validationMessage) {
            this._$validationMessage.remove();
            this.setAria("describedby", null);
            this._$validationMessage = void 0;
            this._validationMessage = void 0
        }
    },
    _toggleValidationClasses: function(isInvalid) {
        this.$element().toggleClass(INVALID_CLASS, isInvalid);
        this.setAria(VALIDATION_STATUS_INVALID, isInvalid || void 0)
    },
    _renderValidationState: function() {
        var isValid = this.option("isValid") && this.option("validationStatus") !== VALIDATION_STATUS_INVALID;
        var validationErrors = this._getValidationErrors();
        var $element = this.$element();
        this._toggleValidationClasses(!isValid);
        if (!Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_3__["hasWindow"])()) {
            return
        }
        this._disposeValidationMessage();
        if (!isValid && validationErrors) {
            var {
                validationMessageMode: validationMessageMode,
                validationMessageOffset: validationMessageOffset,
                validationBoundary: validationBoundary,
                rtlEnabled: rtlEnabled
            } = this.option();
            this._$validationMessage = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo($element);
            var validationMessageContentId = "dx-".concat(new _core_guid__WEBPACK_IMPORTED_MODULE_10__["default"]);
            this.setAria("describedby", validationMessageContentId);
            this._validationMessage = new _validation_message__WEBPACK_IMPORTED_MODULE_9__["default"](this._$validationMessage, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])({
                validationErrors: validationErrors,
                rtlEnabled: rtlEnabled,
                target: this._getValidationMessageTarget(),
                container: $element,
                mode: validationMessageMode,
                positionRequest: "below",
                offset: validationMessageOffset,
                boundary: validationBoundary,
                contentId: validationMessageContentId
            }, this._options.cache("validationTooltipOptions")));
            this._bindInnerWidgetOptions(this._validationMessage, "validationTooltipOptions")
        }
    },
    _getValidationMessageTarget: function() {
        return this.$element()
    },
    _toggleReadOnlyState: function() {
        var readOnly = this.option("readOnly");
        this._toggleBackspaceHandler(readOnly);
        this.$element().toggleClass(READONLY_STATE_CLASS, !!readOnly);
        this.setAria("readonly", readOnly || void 0)
    },
    _toggleBackspaceHandler: function(isReadOnly) {
        var $eventTarget = this._keyboardEventBindingTarget();
        var eventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_4__["addNamespace"])("keydown", READONLY_NAMESPACE);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_8__["default"].off($eventTarget, eventName);
        if (isReadOnly) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_8__["default"].on($eventTarget, eventName, e => {
                if ("backspace" === Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_4__["normalizeKeyName"])(e)) {
                    e.preventDefault()
                }
            })
        }
    },
    _dispose: function() {
        var element = this.$element()[0];
        Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["data"])(element, VALIDATION_TARGET, null);
        clearTimeout(this.showValidationMessageTimeout);
        this._disposeValidationMessage();
        this.callBase()
    },
    _setSubmitElementName: function(name) {
        var $submitElement = this._getSubmitElement();
        if (!$submitElement) {
            return
        }
        if (name.length > 0) {
            $submitElement.attr("name", name)
        } else {
            $submitElement.removeAttr("name")
        }
    },
    _getSubmitElement: function() {
        return null
    },
    _setValidationMessageOption: function(_ref) {
        var _this$_validationMess2;
        var {
            name: name,
            value: value
        } = _ref;
        var optionKey = VALIDATION_MESSAGE_KEYS_MAP[name] ? VALIDATION_MESSAGE_KEYS_MAP[name] : name;
        null === (_this$_validationMess2 = this._validationMessage) || void 0 === _this$_validationMess2 ? void 0 : _this$_validationMess2.option(optionKey, value)
    },
    _hasActiveElement: _core_utils_common__WEBPACK_IMPORTED_MODULE_11__["noop"],
    _optionChanged: function(args) {
        var _this$_validationMess3;
        switch (args.name) {
            case "onValueChanged":
                this._createValueChangeAction();
                break;
            case "readOnly":
                this._toggleReadOnlyState();
                this._refreshFocusState();
                break;
            case "value":
                if (args.value != args.previousValue) {
                    this.validationRequest.fire({
                        value: args.value,
                        editor: this
                    })
                }
                if (!this._valueChangeActionSuppressed) {
                    this._raiseValueChangeAction(args.value, args.previousValue);
                    this._saveValueChangeEvent(void 0)
                }
                break;
            case "width":
                this.callBase(args);
                null === (_this$_validationMess3 = this._validationMessage) || void 0 === _this$_validationMess3 ? void 0 : _this$_validationMess3.updateMaxWidth();
                break;
            case "name":
                this._setSubmitElementName(args.value);
                break;
            case "isValid":
            case "validationError":
            case "validationErrors":
            case "validationStatus":
                this.option(_validation_engine__WEBPACK_IMPORTED_MODULE_7__["default"].synchronizeValidationOptions(args, this.option()));
                this._renderValidationState();
                break;
            case "validationBoundary":
            case "validationMessageMode":
            case "validationMessageOffset":
                this._setValidationMessageOption(args);
                break;
            case "rtlEnabled":
                this._setValidationMessageOption(args);
                this.callBase(args);
                break;
            case "validationTooltipOptions":
                this._innerWidgetOptionChanged(this._validationMessage, args);
                break;
            default:
                this.callBase(args)
        }
    },
    blur: function() {
        if (this._hasActiveElement()) {
            Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_12__["resetActiveElement"])()
        }
    },
    reset: function() {
        var defaultOptions = this._getDefaultOptions();
        this.option("value", defaultOptions.value)
    }
});
Editor.isEditor = instance => instance instanceof Editor;
/* harmony default export */ __webpack_exports__["default"] = (Editor);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/validation_message.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/validation_message.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _overlay_ui_overlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/ui.overlay */ "./node_modules/devextreme/esm/ui/overlay/ui.overlay.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/string */ "./node_modules/devextreme/esm/core/utils/string.js");
/* harmony import */ var _core_utils_position__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/position */ "./node_modules/devextreme/esm/core/utils/position.js");
/**
 * DevExtreme (esm/ui/validation_message.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var INVALID_MESSAGE = "dx-invalid-message";
var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var INVALID_MESSAGE_ALWAYS = "dx-invalid-message-always";
var INVALID_MESSAGE_CONTENT = "dx-invalid-message-content";
var VALIDATION_MESSAGE_MIN_WIDTH = 100;
var ValidationMessage = _overlay_ui_overlay__WEBPACK_IMPORTED_MODULE_3__["default"].inherit({
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])(this.callBase(), {
            integrationOptions: {},
            templatesRenderAsynchronously: false,
            shading: false,
            width: "auto",
            height: "auto",
            closeOnOutsideClick: false,
            animation: null,
            visible: true,
            propagateOutsideClick: true,
            _checkParentVisibility: false,
            rtlEnabled: false,
            contentTemplate: this._renderInnerHtml,
            maxWidth: "100%",
            mode: "auto",
            validationErrors: void 0,
            positionRequest: void 0,
            boundary: void 0,
            offset: {
                h: 0,
                v: 0
            },
            contentId: void 0
        })
    },
    _init() {
        this.callBase();
        this.updateMaxWidth();
        this._updatePosition()
    },
    _initMarkup() {
        this.callBase();
        this._ensureMessageNotEmpty();
        this._toggleModeClass();
        this._updateContentId()
    },
    _ensureMessageNotEmpty: function() {
        this._textMarkup = this._getTextMarkup();
        var shouldShowMessage = this.option("visible") && this._textMarkup;
        this._toggleVisibilityClasses(shouldShowMessage)
    },
    _toggleVisibilityClasses: function(visible) {
        if (visible) {
            this.$element().addClass(INVALID_MESSAGE);
            this.$wrapper().addClass(INVALID_MESSAGE)
        } else {
            this.$element().removeClass(INVALID_MESSAGE);
            this.$wrapper().removeClass(INVALID_MESSAGE)
        }
    },
    _updateContentId() {
        var {
            container: container,
            contentId: contentId
        } = this.option();
        var id = null !== contentId && void 0 !== contentId ? contentId : Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(container).attr("aria-describedby");
        this.$content().addClass(INVALID_MESSAGE_CONTENT).attr("id", id)
    },
    _renderInnerHtml(element) {
        var $element = element && Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
        null === $element || void 0 === $element ? void 0 : $element.html(this._textMarkup)
    },
    _getTextMarkup() {
        var _this$option;
        var validationErrors = null !== (_this$option = this.option("validationErrors")) && void 0 !== _this$option ? _this$option : [];
        var validationErrorMessage = "";
        validationErrors.forEach(err => {
            var _err$message;
            var separator = validationErrorMessage ? "<br />" : "";
            validationErrorMessage += separator + Object(_core_utils_string__WEBPACK_IMPORTED_MODULE_5__["encodeHtml"])(null !== (_err$message = null === err || void 0 === err ? void 0 : err.message) && void 0 !== _err$message ? _err$message : "")
        });
        return validationErrorMessage
    },
    _toggleModeClass() {
        var mode = this.option("mode");
        this.$wrapper().toggleClass(INVALID_MESSAGE_AUTO, "auto" === mode).toggleClass(INVALID_MESSAGE_ALWAYS, "always" === mode)
    },
    updateMaxWidth() {
        var target = this.option("target");
        var targetWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(target);
        var maxWidth = "100%";
        if (targetWidth) {
            maxWidth = Math.max(targetWidth, VALIDATION_MESSAGE_MIN_WIDTH)
        }
        this.option({
            maxWidth: maxWidth
        })
    },
    _updatePosition: function() {
        var {
            positionRequest: positionRequest,
            rtlEnabled: rtlEnabled,
            offset: offset,
            boundary: boundary
        } = this.option();
        var positionSide = Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_6__["getDefaultAlignment"])(rtlEnabled);
        var verticalPositions = "below" === positionRequest ? [" top", " bottom"] : [" bottom", " top"];
        if (rtlEnabled) {
            offset.h = -offset.h
        }
        if ("below" !== positionRequest) {
            offset.v = -offset.v
        }
        this.option("position", {
            offset: offset,
            boundary: boundary,
            my: positionSide + verticalPositions[0],
            at: positionSide + verticalPositions[1],
            collision: "none flip"
        })
    },
    _optionChanged(args) {
        var {
            name: name,
            value: value
        } = args;
        switch (name) {
            case "target":
                this.updateMaxWidth();
                this.callBase(args);
                break;
            case "boundary":
                this.option("position.boundary", value);
                break;
            case "mode":
                this._toggleModeClass(value);
                break;
            case "rtlEnabled":
            case "offset":
            case "positionRequest":
                this._updatePosition();
                break;
            case "container":
                this._updateContentId();
                this.callBase(args);
                break;
            case "contentId":
                this._updateContentId();
                break;
            case "validationErrors":
                this._ensureMessageNotEmpty();
                this._renderInnerHtml(this.$content());
                break;
            default:
                this.callBase(args)
        }
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_2__["default"])("dxValidationMessage", ValidationMessage);
/* harmony default export */ __webpack_exports__["default"] = (ValidationMessage);


/***/ })

}]);