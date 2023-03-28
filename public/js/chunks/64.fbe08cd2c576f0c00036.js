(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[64],{

/***/ "./node_modules/devextreme/esm/core/utils/icon.js":
/*!********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/icon.js ***!
  \********************************************************/
/*! exports provided: getImageSourceType, getImageContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getImageSourceType", function() { return getImageSourceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getImageContainer", function() { return getImageContainer; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/**
 * DevExtreme (esm/core/utils/icon.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var ICON_CLASS = "dx-icon";
var SVG_ICON_CLASS = "dx-svg-icon";
var getImageSourceType = source => {
    if (!source || "string" !== typeof source) {
        return false
    }
    if (/^\s*<svg[^>]*>(.|\r?\n)*?<\/svg>\s*$/i.test(source)) {
        return "svg"
    }
    if (/data:.*base64|\.|[^<\s]\//.test(source)) {
        return "image"
    }
    if (/^[\w-_]+$/.test(source)) {
        return "dxIcon"
    }
    if (/^\s?([\w-_]\s?)+$/.test(source)) {
        return "fontIcon"
    }
    return false
};
var getImageContainer = source => {
    switch (getImageSourceType(source)) {
        case "image":
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<img>").attr("src", source).addClass(ICON_CLASS);
        case "fontIcon":
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<i>").addClass("".concat(ICON_CLASS, " ").concat(source));
        case "dxIcon":
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<i>").addClass("".concat(ICON_CLASS, " ").concat(ICON_CLASS, "-").concat(source));
        case "svg":
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<i>").addClass("".concat(ICON_CLASS, " ").concat(SVG_ICON_CLASS)).append(source);
        default:
            return null
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/component_wrapper/button.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/component_wrapper/button.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ButtonWrapper; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _ui_validation_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui/validation_engine */ "./node_modules/devextreme/esm/ui/validation_engine.js");
/* harmony import */ var _common_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/component */ "./node_modules/devextreme/esm/renovation/component_wrapper/common/component.js");
/* harmony import */ var _core_utils_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/icon */ "./node_modules/devextreme/esm/core/utils/icon.js");
/**
 * DevExtreme (esm/renovation/component_wrapper/button.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




class ButtonWrapper extends _common_component__WEBPACK_IMPORTED_MODULE_2__["default"] {
    get _validationGroupConfig() {
        return _ui_validation_engine__WEBPACK_IMPORTED_MODULE_1__["default"].getGroupConfig(this._findGroup())
    }
    getDefaultTemplateNames() {
        return ["content"]
    }
    getSupportedKeyNames() {
        return ["space", "enter"]
    }
    getProps() {
        var props = super.getProps();
        props.onClick = _ref => {
            var {
                event: event
            } = _ref;
            this._clickAction({
                event: event,
                validationGroup: this._validationGroupConfig
            })
        };
        var iconType = Object(_core_utils_icon__WEBPACK_IMPORTED_MODULE_3__["getImageSourceType"])(props.icon);
        if ("svg" === iconType) {
            props.iconTemplate = this._createTemplateComponent(() => props.icon)
        }
        return props
    }
    get _templatesInfo() {
        return {
            template: "content"
        }
    }
    _toggleActiveState(_, value) {
        var button = this.viewRef;
        value ? button.activate() : button.deactivate()
    }
    _getSubmitAction() {
        var needValidate = true;
        var validationStatus = "valid";
        return this._createAction(_ref2 => {
            var {
                event: event,
                submitInput: submitInput
            } = _ref2;
            if (needValidate) {
                var validationGroup = this._validationGroupConfig;
                if (void 0 !== validationGroup && "" !== validationGroup) {
                    var validationResult = validationGroup.validate();
                    validationStatus = validationResult.status;
                    if ("pending" === validationResult.status) {
                        needValidate = false;
                        this.option("disabled", true);
                        validationResult.complete.then(_ref3 => {
                            var {
                                status: status
                            } = _ref3;
                            this.option("disabled", false);
                            validationStatus = status;
                            "valid" === validationStatus && submitInput.click();
                            needValidate = true
                        })
                    }
                }
            }
            "valid" !== validationStatus && event.preventDefault();
            event.stopPropagation()
        })
    }
    _initializeComponent() {
        super._initializeComponent();
        this._addAction("onSubmit", this._getSubmitAction());
        this._clickAction = this._createClickAction()
    }
    _initMarkup() {
        super._initMarkup();
        var $content = this.$element().find(".dx-button-content");
        var $template = $content.children().filter(".dx-template-wrapper");
        var $input = $content.children().filter(".dx-button-submit-input");
        if ($template.length) {
            $template.addClass("dx-button-content");
            $template.append($input);
            $content.replaceWith($template)
        }
    }
    _patchOptionValues(options) {
        return super._patchOptionValues(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, options, {
            templateData: options._templateData
        }))
    }
    _findGroup() {
        var $element = this.$element();
        var validationGroup = this.option("validationGroup");
        return void 0 !== validationGroup && "" !== validationGroup ? validationGroup : _ui_validation_engine__WEBPACK_IMPORTED_MODULE_1__["default"].findGroup($element, this._modelByElement($element))
    }
    _createClickAction() {
        return this._createActionByOption("onClick", {
            excludeValidators: ["readOnly"]
        })
    }
    _optionChanged(option) {
        switch (option.name) {
            case "onClick":
                this._clickAction = this._createClickAction()
        }
        super._optionChanged(option)
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/button.j.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/button.j.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Button; });
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _component_wrapper_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component_wrapper/button */ "./node_modules/devextreme/esm/renovation/component_wrapper/button.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./button */ "./node_modules/devextreme/esm/renovation/ui/button.js");
/**
 * DevExtreme (esm/renovation/ui/button.j.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



class Button extends _component_wrapper_button__WEBPACK_IMPORTED_MODULE_1__["default"] {
    getProps() {
        var props = super.getProps();
        props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
        return props
    }
    focus() {
        var _this$viewRef;
        return null === (_this$viewRef = this.viewRef) || void 0 === _this$viewRef ? void 0 : _this$viewRef.focus(...arguments)
    }
    activate() {
        var _this$viewRef2;
        return null === (_this$viewRef2 = this.viewRef) || void 0 === _this$viewRef2 ? void 0 : _this$viewRef2.activate(...arguments)
    }
    deactivate() {
        var _this$viewRef3;
        return null === (_this$viewRef3 = this.viewRef) || void 0 === _this$viewRef3 ? void 0 : _this$viewRef3.deactivate(...arguments)
    }
    _getActionConfigs() {
        return {
            onClick: {
                excludeValidators: ["readOnly"]
            },
            onSubmit: {}
        }
    }
    get _propsInfo() {
        return {
            twoWay: [],
            allowNull: [],
            elements: ["onSubmit"],
            templates: ["template", "iconTemplate"],
            props: ["activeStateEnabled", "hoverStateEnabled", "icon", "iconPosition", "onClick", "onSubmit", "pressed", "stylingMode", "template", "iconTemplate", "text", "type", "useInkRipple", "useSubmitBehavior", "templateData", "className", "accessKey", "disabled", "focusStateEnabled", "height", "hint", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width"]
        }
    }
    get _viewComponent() {
        return _button__WEBPACK_IMPORTED_MODULE_2__["Button"]
    }
}
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_0__["default"])("dxButton", Button);
Button.defaultOptions = _button__WEBPACK_IMPORTED_MODULE_2__["defaultOptions"];


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/button.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/button.js ***!
  \*************************************************************/
/*! exports provided: viewFunction, ButtonProps, defaultOptionRules, Button, defaultOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewFunction", function() { return viewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonProps", function() { return ButtonProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptionRules", function() { return defaultOptionRules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return defaultOptions; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var _core_options_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/options/utils */ "./node_modules/devextreme/esm/core/options/utils.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _ui_themes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ui/themes */ "./node_modules/devextreme/esm/ui/themes.js");
/* harmony import */ var _events_short__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../events/short */ "./node_modules/devextreme/esm/events/short.js");
/* harmony import */ var _utils_combine_classes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/combine_classes */ "./node_modules/devextreme/esm/renovation/utils/combine_classes.js");
/* harmony import */ var _core_utils_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/icon */ "./node_modules/devextreme/esm/core/utils/icon.js");
/* harmony import */ var _common_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./common/icon */ "./node_modules/devextreme/esm/renovation/ui/common/icon.js");
/* harmony import */ var _common_ink_ripple__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./common/ink_ripple */ "./node_modules/devextreme/esm/renovation/ui/common/ink_ripple.js");
/* harmony import */ var _common_widget__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common/widget */ "./node_modules/devextreme/esm/renovation/ui/common/widget.js");
/* harmony import */ var _common_base_props__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./common/base_props */ "./node_modules/devextreme/esm/renovation/ui/common/base_props.js");
/**
 * DevExtreme (esm/renovation/ui/button.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["accessKey", "activeStateEnabled", "children", "className", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "icon", "iconPosition", "iconTemplate", "onClick", "onKeyDown", "onSubmit", "pressed", "rtlEnabled", "stylingMode", "tabIndex", "template", "templateData", "text", "type", "useInkRipple", "useSubmitBehavior", "visible", "width"];












var stylingModes = ["outlined", "text", "contained"];
var getCssClasses = model => {
    var {
        icon: icon,
        iconPosition: iconPosition,
        stylingMode: stylingMode,
        text: text,
        type: type
    } = model;
    var isValidStylingMode = stylingMode && stylingModes.includes(stylingMode);
    var classesMap = {
        "dx-button": true,
        ["dx-button-mode-".concat(isValidStylingMode ? stylingMode : "contained")]: true,
        ["dx-button-".concat(null !== type && void 0 !== type ? type : "normal")]: true,
        "dx-button-has-text": !!text,
        "dx-button-has-icon": !!icon,
        "dx-button-icon-right": "left" !== iconPosition
    };
    return Object(_utils_combine_classes__WEBPACK_IMPORTED_MODULE_8__["combineClasses"])(classesMap)
};
var viewFunction = viewModel => {
    var {
        children: children,
        iconPosition: iconPosition,
        iconTemplate: IconTemplate,
        template: ButtonTemplate,
        text: text
    } = viewModel.props;
    var renderText = !viewModel.props.template && !children && "" !== text;
    var isIconLeft = "left" === iconPosition;
    var iconComponent = !viewModel.props.template && !children && (viewModel.iconSource || viewModel.props.iconTemplate) && Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, _common_icon__WEBPACK_IMPORTED_MODULE_10__["Icon"], {
        source: viewModel.iconSource,
        position: iconPosition,
        iconTemplate: IconTemplate
    });
    return Object(inferno__WEBPACK_IMPORTED_MODULE_2__["normalizeProps"])(Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, _common_widget__WEBPACK_IMPORTED_MODULE_12__["Widget"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
        accessKey: viewModel.props.accessKey,
        activeStateEnabled: viewModel.props.activeStateEnabled,
        aria: viewModel.aria,
        className: viewModel.props.className,
        classes: viewModel.cssClasses,
        disabled: viewModel.props.disabled,
        focusStateEnabled: viewModel.props.focusStateEnabled,
        height: viewModel.props.height,
        hint: viewModel.props.hint,
        hoverStateEnabled: viewModel.props.hoverStateEnabled,
        onActive: viewModel.onActive,
        onClick: viewModel.onWidgetClick,
        onInactive: viewModel.onInactive,
        onKeyDown: viewModel.keyDown,
        rtlEnabled: viewModel.props.rtlEnabled,
        tabIndex: viewModel.props.tabIndex,
        visible: viewModel.props.visible,
        width: viewModel.props.width
    }, viewModel.restAttributes, {
        children: Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "div", "dx-button-content", [viewModel.props.template && ButtonTemplate({
            data: viewModel.buttonTemplateData
        }), !viewModel.props.template && children, isIconLeft && iconComponent, renderText && Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "span", "dx-button-text", text, 0), !isIconLeft && iconComponent, viewModel.props.useSubmitBehavior && Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(64, "input", "dx-button-submit-input", null, 1, {
            type: "submit",
            tabIndex: -1
        }, null, viewModel.submitInputRef), viewModel.props.useInkRipple && Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, _common_ink_ripple__WEBPACK_IMPORTED_MODULE_11__["InkRipple"], {
            config: viewModel.inkRippleConfig
        }, null, viewModel.inkRippleRef)], 0, null, null, viewModel.contentRef)
    }), null, viewModel.widgetRef))
};
var ButtonProps = Object.create(Object.prototype, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.getOwnPropertyDescriptors(_common_base_props__WEBPACK_IMPORTED_MODULE_13__["BaseWidgetProps"]), Object.getOwnPropertyDescriptors({
    activeStateEnabled: true,
    hoverStateEnabled: true,
    icon: "",
    iconPosition: "left",
    stylingMode: "contained",
    text: "",
    type: "normal",
    useInkRipple: false,
    useSubmitBehavior: false,
    get templateData() {
        return {}
    }
})));
var defaultOptionRules = Object(_core_options_utils__WEBPACK_IMPORTED_MODULE_4__["createDefaultOptionRules"])([{
    device: () => "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_5__["default"].real().deviceType && !_core_devices__WEBPACK_IMPORTED_MODULE_5__["default"].isSimulator(),
    options: {
        focusStateEnabled: true
    }
}, {
    device: () => Object(_ui_themes__WEBPACK_IMPORTED_MODULE_6__["isMaterial"])(Object(_ui_themes__WEBPACK_IMPORTED_MODULE_6__["current"])()),
    options: {
        useInkRipple: true
    }
}]);


var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => Object(inferno__WEBPACK_IMPORTED_MODULE_2__["normalizeProps"])(Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, TemplateProp, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props))) : TemplateProp);
class Button extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoWrapperComponent"] {
    constructor(props) {
        super(props);
        this.state = {};
        this.contentRef = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        this.inkRippleRef = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        this.submitInputRef = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        this.widgetRef = Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createRef"])();
        this.__getterCache = {};
        this.focus = this.focus.bind(this);
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);
        this.submitEffect = this.submitEffect.bind(this);
        this.onActive = this.onActive.bind(this);
        this.onInactive = this.onInactive.bind(this);
        this.onWidgetClick = this.onWidgetClick.bind(this);
        this.keyDown = this.keyDown.bind(this)
    }
    createEffects() {
        return [new _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["InfernoEffect"](this.submitEffect, [this.props.onSubmit, this.props.useSubmitBehavior]), Object(_devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["createReRenderEffect"])()]
    }
    updateEffects() {
        var _this$_effects$;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ ? void 0 : _this$_effects$.update([this.props.onSubmit, this.props.useSubmitBehavior])
    }
    submitEffect() {
        var {
            onSubmit: onSubmit,
            useSubmitBehavior: useSubmitBehavior
        } = this.props;
        if (useSubmitBehavior && onSubmit) {
            _events_short__WEBPACK_IMPORTED_MODULE_7__["click"].on(this.submitInputRef.current, event => onSubmit({
                event: event,
                submitInput: this.submitInputRef.current
            }), {
                namespace: "UIFeedback"
            });
            return () => _events_short__WEBPACK_IMPORTED_MODULE_7__["click"].off(this.submitInputRef.current, {
                namespace: "UIFeedback"
            })
        }
        return
    }
    onActive(event) {
        var {
            useInkRipple: useInkRipple
        } = this.props;
        useInkRipple && this.inkRippleRef.current.showWave({
            element: this.contentRef.current,
            event: event
        })
    }
    onInactive(event) {
        var {
            useInkRipple: useInkRipple
        } = this.props;
        useInkRipple && this.inkRippleRef.current.hideWave({
            element: this.contentRef.current,
            event: event
        })
    }
    onWidgetClick(event) {
        var {
            onClick: onClick,
            useSubmitBehavior: useSubmitBehavior
        } = this.props;
        null === onClick || void 0 === onClick ? void 0 : onClick({
            event: event
        });
        useSubmitBehavior && this.submitInputRef.current.click()
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
        if ("space" === keyName || "space" === which || "enter" === keyName || "enter" === which) {
            originalEvent.preventDefault();
            this.onWidgetClick(originalEvent)
        }
        return
    }
    get aria() {
        var {
            icon: icon,
            text: text
        } = this.props;
        var label = (null !== text && void 0 !== text ? text : "") || icon;
        if (!text && icon && "image" === Object(_core_utils_icon__WEBPACK_IMPORTED_MODULE_9__["getImageSourceType"])(icon)) {
            label = !icon.includes("base64") ? icon.replace(/.+\/([^.]+)\..+$/, "$1") : "Base64"
        }
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
            role: "button"
        }, label ? {
            label: label
        } : {})
    }
    get cssClasses() {
        return getCssClasses(this.props)
    }
    get iconSource() {
        var {
            icon: icon,
            type: type
        } = this.props;
        if (icon || "back" === type) {
            return (null !== icon && void 0 !== icon ? icon : "") || "back"
        }
        return ""
    }
    get inkRippleConfig() {
        if (void 0 !== this.__getterCache.inkRippleConfig) {
            return this.__getterCache.inkRippleConfig
        }
        return this.__getterCache.inkRippleConfig = (() => {
            var {
                icon: icon,
                text: text,
                type: type
            } = this.props;
            return !text && icon || "back" === type ? {
                isCentered: true,
                useHoldAnimation: false,
                waveSizeCoefficient: 1
            } : {}
        })()
    }
    get buttonTemplateData() {
        var {
            icon: icon,
            templateData: templateData,
            text: text
        } = this.props;
        return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
            icon: icon,
            text: text
        }, templateData)
    }
    get restAttributes() {
        var _this$props = this.props,
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, _excluded);
        return restProps
    }
    focus() {
        this.widgetRef.current.focus()
    }
    activate() {
        this.widgetRef.current.activate()
    }
    deactivate() {
        this.widgetRef.current.deactivate()
    }
    componentWillUpdate(nextProps, nextState, context) {
        super.componentWillUpdate();
        if (this.props.icon !== nextProps.icon || this.props.text !== nextProps.text || this.props.type !== nextProps.type) {
            this.__getterCache.inkRippleConfig = void 0
        }
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
                template: getTemplate(props.template),
                iconTemplate: getTemplate(props.iconTemplate)
            }),
            contentRef: this.contentRef,
            submitInputRef: this.submitInputRef,
            inkRippleRef: this.inkRippleRef,
            widgetRef: this.widgetRef,
            onActive: this.onActive,
            onInactive: this.onInactive,
            onWidgetClick: this.onWidgetClick,
            keyDown: this.keyDown,
            aria: this.aria,
            cssClasses: this.cssClasses,
            iconSource: this.iconSource,
            inkRippleConfig: this.inkRippleConfig,
            buttonTemplateData: this.buttonTemplateData,
            restAttributes: this.restAttributes
        })
    }
}
Button.defaultProps = Object.create(Object.prototype, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.getOwnPropertyDescriptors(ButtonProps), Object.getOwnPropertyDescriptors(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, Object(_core_options_utils__WEBPACK_IMPORTED_MODULE_4__["convertRulesToOptions"])(defaultOptionRules)))));
var __defaultOptionRules = [];
function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    Button.defaultProps = Object.create(Object.prototype, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])(Object.getOwnPropertyDescriptors(Button.defaultProps), Object.getOwnPropertyDescriptors(Object(_core_options_utils__WEBPACK_IMPORTED_MODULE_4__["convertRulesToOptions"])(defaultOptionRules)), Object.getOwnPropertyDescriptors(Object(_core_options_utils__WEBPACK_IMPORTED_MODULE_4__["convertRulesToOptions"])(__defaultOptionRules))))
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/common/icon.js":
/*!******************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/common/icon.js ***!
  \******************************************************************/
/*! exports provided: viewFunction, IconProps, Icon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewFunction", function() { return viewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconProps", function() { return IconProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return Icon; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var _core_utils_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/utils/icon */ "./node_modules/devextreme/esm/core/utils/icon.js");
/* harmony import */ var _utils_combine_classes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/combine_classes */ "./node_modules/devextreme/esm/renovation/utils/combine_classes.js");
/**
 * DevExtreme (esm/renovation/ui/common/icon.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["iconTemplate", "position", "source"];





var viewFunction = _ref => {
    var {
        iconClassName: iconClassName,
        props: {
            iconTemplate: IconTemplate,
            source: source
        },
        sourceType: sourceType
    } = _ref;
    return Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createFragment"])(["dxIcon" === sourceType && Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "i", iconClassName), "fontIcon" === sourceType && Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "i", iconClassName), "image" === sourceType && Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "img", iconClassName, null, 1, {
        alt: "",
        src: source
    }), IconTemplate && Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "i", iconClassName, IconTemplate({}), 0)], 0)
};
var IconProps = {
    position: "left",
    source: ""
};
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => Object(inferno__WEBPACK_IMPORTED_MODULE_2__["normalizeProps"])(Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createComponentVNode"])(2, TemplateProp, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props))) : TemplateProp);
class Icon extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["BaseInfernoComponent"] {
    constructor(props) {
        super(props);
        this.state = {}
    }
    get sourceType() {
        return Object(_core_utils_icon__WEBPACK_IMPORTED_MODULE_4__["getImageSourceType"])(this.props.source)
    }
    get cssClass() {
        return "left" !== this.props.position ? "dx-icon-right" : ""
    }
    get iconClassName() {
        var generalClasses = {
            "dx-icon": true,
            [this.cssClass]: !!this.cssClass
        };
        var {
            source: source
        } = this.props;
        if ("dxIcon" === this.sourceType) {
            return Object(_utils_combine_classes__WEBPACK_IMPORTED_MODULE_5__["combineClasses"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, generalClasses, {
                ["dx-icon-".concat(source)]: true
            }))
        }
        if ("fontIcon" === this.sourceType) {
            return Object(_utils_combine_classes__WEBPACK_IMPORTED_MODULE_5__["combineClasses"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, generalClasses, {
                [String(source)]: !!source
            }))
        }
        if ("image" === this.sourceType) {
            return Object(_utils_combine_classes__WEBPACK_IMPORTED_MODULE_5__["combineClasses"])(generalClasses)
        }
        if ("svg" === this.sourceType) {
            return Object(_utils_combine_classes__WEBPACK_IMPORTED_MODULE_5__["combineClasses"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, generalClasses, {
                "dx-svg-icon": true
            }))
        }
        return ""
    }
    get restAttributes() {
        var _this$props = this.props,
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, _excluded);
        return restProps
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
                iconTemplate: getTemplate(props.iconTemplate)
            }),
            sourceType: this.sourceType,
            cssClass: this.cssClass,
            iconClassName: this.iconClassName,
            restAttributes: this.restAttributes
        })
    }
}
Icon.defaultProps = IconProps;


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/common/ink_ripple.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/common/ink_ripple.js ***!
  \************************************************************************/
/*! exports provided: viewFunction, InkRippleProps, InkRipple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewFunction", function() { return viewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InkRippleProps", function() { return InkRippleProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InkRipple", function() { return InkRipple; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var inferno__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inferno */ "./node_modules/inferno/index.esm.js");
/* harmony import */ var _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devextreme/runtime/inferno */ "./node_modules/@devextreme/runtime/esm/inferno/index.js");
/* harmony import */ var _ui_widget_utils_ink_ripple__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../ui/widget/utils.ink_ripple */ "./node_modules/devextreme/esm/ui/widget/utils.ink_ripple.js");
/**
 * DevExtreme (esm/renovation/ui/common/ink_ripple.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["config"];



var viewFunction = model => Object(inferno__WEBPACK_IMPORTED_MODULE_2__["normalizeProps"])(Object(inferno__WEBPACK_IMPORTED_MODULE_2__["createVNode"])(1, "div", "dx-inkripple", null, 1, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, model.restAttributes)));
var InkRippleProps = {
    get config() {
        return {}
    }
};
class InkRipple extends _devextreme_runtime_inferno__WEBPACK_IMPORTED_MODULE_3__["BaseInfernoComponent"] {
    constructor(props) {
        super(props);
        this.state = {};
        this.__getterCache = {};
        this.hideWave = this.hideWave.bind(this);
        this.showWave = this.showWave.bind(this)
    }
    get getConfig() {
        if (void 0 !== this.__getterCache.getConfig) {
            return this.__getterCache.getConfig
        }
        return this.__getterCache.getConfig = (() => {
            var {
                config: config
            } = this.props;
            return Object(_ui_widget_utils_ink_ripple__WEBPACK_IMPORTED_MODULE_4__["initConfig"])(config)
        })()
    }
    get restAttributes() {
        var _this$props = this.props,
            restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, _excluded);
        return restProps
    }
    hideWave(opts) {
        Object(_ui_widget_utils_ink_ripple__WEBPACK_IMPORTED_MODULE_4__["hideWave"])(this.getConfig, opts)
    }
    showWave(opts) {
        Object(_ui_widget_utils_ink_ripple__WEBPACK_IMPORTED_MODULE_4__["showWave"])(this.getConfig, opts)
    }
    componentWillUpdate(nextProps, nextState, context) {
        if (this.props.config !== nextProps.config) {
            this.__getterCache.getConfig = void 0
        }
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props),
            getConfig: this.getConfig,
            restAttributes: this.restAttributes
        })
    }
}
InkRipple.defaultProps = InkRippleProps;


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/button.js":
/*!**************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/button.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renovation_ui_button_j__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renovation/ui/button.j */ "./node_modules/devextreme/esm/renovation/ui/button.j.js");
/**
 * DevExtreme (esm/ui/button.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

/* harmony default export */ __webpack_exports__["default"] = (_renovation_ui_button_j__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/widget/utils.ink_ripple.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/widget/utils.ink_ripple.js ***!
  \*******************************************************************/
/*! exports provided: initConfig, render, showWave, hideWave */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initConfig", function() { return initConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showWave", function() { return showWave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideWave", function() { return hideWave; });
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/**
 * DevExtreme (esm/ui/widget/utils.ink_ripple.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var INKRIPPLE_CLASS = "dx-inkripple";
var INKRIPPLE_WAVE_CLASS = "dx-inkripple-wave";
var INKRIPPLE_SHOWING_CLASS = "dx-inkripple-showing";
var INKRIPPLE_HIDING_CLASS = "dx-inkripple-hiding";
var DEFAULT_WAVE_SIZE_COEFFICIENT = 2;
var MAX_WAVE_SIZE = 4e3;
var ANIMATION_DURATION = 300;
var HOLD_ANIMATION_DURATION = 1e3;
var DEFAULT_WAVE_INDEX = 0;
var initConfig = function() {
    var config = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    var {
        useHoldAnimation: useHoldAnimation,
        waveSizeCoefficient: waveSizeCoefficient,
        isCentered: isCentered,
        wavesNumber: wavesNumber
    } = config;
    return {
        waveSizeCoefficient: waveSizeCoefficient || DEFAULT_WAVE_SIZE_COEFFICIENT,
        isCentered: isCentered || false,
        wavesNumber: wavesNumber || 1,
        durations: getDurations(null !== useHoldAnimation && void 0 !== useHoldAnimation ? useHoldAnimation : true)
    }
};
var render = function(args) {
    var config = initConfig(args);
    return {
        showWave: showWave.bind(this, config),
        hideWave: hideWave.bind(this, config)
    }
};
var getInkRipple = function(element) {
    var result = element.children("." + INKRIPPLE_CLASS);
    if (0 === result.length) {
        result = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(INKRIPPLE_CLASS).appendTo(element)
    }
    return result
};
var getWaves = function(element, wavesNumber) {
    var inkRipple = getInkRipple(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element));
    var result = inkRipple.children("." + INKRIPPLE_WAVE_CLASS).toArray();
    for (var i = result.length; i < wavesNumber; i++) {
        var $currentWave = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo(inkRipple).addClass(INKRIPPLE_WAVE_CLASS);
        result.push($currentWave[0])
    }
    return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(result)
};
var getWaveStyleConfig = function(args, config) {
    var element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(config.element);
    var elementWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(element);
    var elementHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])(element);
    var elementDiagonal = parseInt(Math.sqrt(elementWidth * elementWidth + elementHeight * elementHeight));
    var waveSize = Math.min(MAX_WAVE_SIZE, parseInt(elementDiagonal * args.waveSizeCoefficient));
    var left;
    var top;
    if (args.isCentered) {
        left = (elementWidth - waveSize) / 2;
        top = (elementHeight - waveSize) / 2
    } else {
        var event = config.event;
        var position = element.offset();
        var x = event.pageX - position.left;
        var y = event.pageY - position.top;
        left = x - waveSize / 2;
        top = y - waveSize / 2
    }
    return {
        left: left,
        top: top,
        height: waveSize,
        width: waveSize
    }
};
function showWave(args, config) {
    var $wave = getWaves(config.element, args.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
    args.hidingTimeout && clearTimeout(args.hidingTimeout);
    hideSelectedWave($wave);
    $wave.css(getWaveStyleConfig(args, config));
    args.showingTimeout = setTimeout(showingWaveHandler.bind(this, args, $wave), 0)
}

function showingWaveHandler(args, $wave) {
    var durationCss = args.durations.showingScale + "ms";
    $wave.addClass(INKRIPPLE_SHOWING_CLASS).css("transitionDuration", durationCss)
}

function getDurations(useHoldAnimation) {
    return {
        showingScale: useHoldAnimation ? HOLD_ANIMATION_DURATION : ANIMATION_DURATION,
        hidingScale: ANIMATION_DURATION,
        hidingOpacity: ANIMATION_DURATION
    }
}

function hideSelectedWave($wave) {
    $wave.removeClass(INKRIPPLE_HIDING_CLASS).css("transitionDuration", "")
}
function hideWave(args, config) {
    args.showingTimeout && clearTimeout(args.showingTimeout);
    var $wave = getWaves(config.element, config.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
    var durations = args.durations;
    var durationCss = durations.hidingScale + "ms, " + durations.hidingOpacity + "ms";
    $wave.addClass(INKRIPPLE_HIDING_CLASS).removeClass(INKRIPPLE_SHOWING_CLASS).css("transitionDuration", durationCss);
    var animationDuration = Math.max(durations.hidingScale, durations.hidingOpacity);
    args.hidingTimeout = setTimeout(hideSelectedWave.bind(this, $wave), animationDuration)
}


/***/ })

}]);