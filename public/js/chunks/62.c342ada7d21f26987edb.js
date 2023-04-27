(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[62],{

/***/ "./node_modules/devextreme/esm/renovation/ui/resizable/utils.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/resizable/utils.js ***!
  \**********************************************************************/
/*! exports provided: borderWidthStyles, getAreaFromElement, getAreaFromObject, getMovingSides, getDragOffsets, filterOffsets */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "borderWidthStyles", function() { return borderWidthStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAreaFromElement", function() { return getAreaFromElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAreaFromObject", function() { return getAreaFromObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMovingSides", function() { return getMovingSides; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDragOffsets", function() { return getDragOffsets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterOffsets", function() { return filterOffsets; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/**
 * DevExtreme (esm/renovation/ui/resizable/utils.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var borderWidthStyles = {
    left: "borderLeftWidth",
    top: "borderTopWidth",
    right: "borderRightWidth",
    bottom: "borderBottomWidth"
};

function getBorderWidth(el, direction) {
    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isWindow"])(el)) {
        var borderWidth = el.style[borderWidthStyles[direction]];
        return parseInt(borderWidth, 10) || 0
    }
    return 0
}
var correctGeometry = function(area, mainEl) {
    var el = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
    var {
        height: height,
        offset: offset,
        width: width
    } = area;
    var {
        left: left,
        top: top
    } = offset;
    var areaBorderLeft = el ? getBorderWidth(el, "left") : 0;
    var areaBorderTop = el ? getBorderWidth(el, "top") : 0;
    return {
        width: width - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getOuterWidth"])(mainEl) - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getInnerWidth"])(mainEl),
        height: height - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getOuterHeight"])(mainEl) - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getInnerHeight"])(mainEl),
        offset: {
            left: left + areaBorderLeft + getBorderWidth(mainEl, "left"),
            top: top + areaBorderTop + getBorderWidth(mainEl, "top")
        }
    }
};
var getAreaFromElement = (el, mainEl) => correctGeometry({
    width: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getInnerWidth"])(el),
    height: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getInnerHeight"])(el),
    offset: Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({
        top: 0,
        left: 0
    }, Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isWindow"])(el) ? {} : Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getOffset"])(el))
}, mainEl, el);
var getAreaFromObject = (_ref, mainEl) => {
    var {
        bottom: bottom,
        left: left,
        right: right,
        top: top
    } = _ref;
    return correctGeometry({
        width: right - left,
        height: bottom - top,
        offset: {
            left: left,
            top: top
        }
    }, mainEl)
};
var getMovingSides = el => {
    var {
        className: className
    } = el;
    var hasCornerTopLeftClass = className.includes("dx-resizable-handle-corner-top-left");
    var hasCornerTopRightClass = className.includes("dx-resizable-handle-corner-top-right");
    var hasCornerBottomLeftClass = className.includes("dx-resizable-handle-corner-bottom-left");
    var hasCornerBottomRightClass = className.includes("dx-resizable-handle-corner-bottom-right");
    return {
        top: className.includes("dx-resizable-handle-top") || hasCornerTopLeftClass || hasCornerTopRightClass,
        left: className.includes("dx-resizable-handle-left") || hasCornerTopLeftClass || hasCornerBottomLeftClass,
        bottom: className.includes("dx-resizable-handle-bottom") || hasCornerBottomLeftClass || hasCornerBottomRightClass,
        right: className.includes("dx-resizable-handle-right") || hasCornerTopRightClass || hasCornerBottomRightClass
    }
};
function getDragOffsets(area, handleEl, areaProp) {
    var hWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getOuterWidth"])(handleEl);
    var hHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getOuterHeight"])(handleEl);
    var hOffset = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getOffset"])(handleEl);
    var areaOffset = area.offset;
    var isAreaWindow = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isWindow"])(areaProp);
    var scrollOffset_scrollX = isAreaWindow ? areaProp.pageXOffset : 0,
        scrollOffset_scrollY = isAreaWindow ? areaProp.pageYOffset : 0;
    return {
        maxLeftOffset: hOffset.left - areaOffset.left - scrollOffset_scrollX,
        maxRightOffset: areaOffset.left + area.width - hOffset.left - hWidth + scrollOffset_scrollX,
        maxTopOffset: hOffset.top - areaOffset.top - scrollOffset_scrollY,
        maxBottomOffset: areaOffset.top + area.height - hOffset.top - hHeight + scrollOffset_scrollY
    }
}
var filterOffsets = (offset, handleEl) => {
    var sides = getMovingSides(handleEl);
    var offsetX = !sides.left && !sides.right ? 0 : offset.x;
    var offsetY = !sides.top && !sides.bottom ? 0 : offset.y;
    return {
        x: offsetX,
        y: offsetY
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/drop_down_menu.js":
/*!**********************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/drop_down_menu.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./button */ "./node_modules/devextreme/esm/ui/button.js");
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./popover */ "./node_modules/devextreme/esm/ui/popover.js");
/* harmony import */ var _data_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../data_helper */ "./node_modules/devextreme/esm/data_helper.js");
/* harmony import */ var _list_light__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./list_light */ "./node_modules/devextreme/esm/ui/list_light.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./themes */ "./node_modules/devextreme/esm/ui/themes.js");
/* harmony import */ var _core_templates_child_default_template__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/templates/child_default_template */ "./node_modules/devextreme/esm/core/templates/child_default_template.js");
/* harmony import */ var _toolbar_ui_toolbar_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./toolbar/ui.toolbar.utils */ "./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.utils.js");
/**
 * DevExtreme (esm/ui/drop_down_menu.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["getWindow"])();











var DROP_DOWN_MENU_CLASS = "dx-dropdownmenu";
var DROP_DOWN_MENU_POPUP_CLASS = "dx-dropdownmenu-popup";
var DROP_DOWN_MENU_POPUP_WRAPPER_CLASS = "dx-dropdownmenu-popup-wrapper";
var DROP_DOWN_MENU_LIST_CLASS = "dx-dropdownmenu-list";
var DROP_DOWN_MENU_BUTTON_CLASS = "dx-dropdownmenu-button";
var POPUP_OPTION_MAP = {
    popupWidth: "width",
    popupHeight: "height",
    popupMaxHeight: "maxHeight",
    popupAutoResizeEnabled: "autoResizeEnabled"
};
var BUTTON_OPTION_MAP = {
    buttonIcon: "icon",
    buttonText: "text",
    buttonWidth: "width",
    buttonHeight: "height",
    buttonTemplate: "template"
};
var DropDownMenu = _widget_ui_widget__WEBPACK_IMPORTED_MODULE_6__["default"].inherit({
    _supportedKeys: function() {
        var extension = {};
        if (!this.option("opened") || !this._list.option("focusedElement")) {
            extension = this._button._supportedKeys()
        }
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])(this.callBase(), extension, {
            tab: function() {
                this._popup && this._popup.hide()
            }
        })
    },
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])(this.callBase(), {
            items: [],
            onItemClick: null,
            dataSource: null,
            itemTemplate: "item",
            buttonText: "",
            buttonIcon: "overflow",
            buttonWidth: void 0,
            buttonHeight: void 0,
            buttonTemplate: "content",
            onButtonClick: null,
            usePopover: false,
            popupWidth: "auto",
            popupHeight: "auto",
            activeStateEnabled: true,
            hoverStateEnabled: true,
            opened: false,
            selectionMode: "none",
            selectedItemKeys: [],
            deferRendering: false,
            popupPosition: {
                my: "top center",
                at: "bottom center",
                collision: "fit flip",
                offset: {
                    v: 1
                }
            },
            popupAnimation: void 0,
            onItemRendered: null,
            menuWidget: _list_light__WEBPACK_IMPORTED_MODULE_10__["default"],
            popupMaxHeight: void 0,
            closeOnClick: true,
            useInkRipple: false,
            container: void 0,
            popupAutoResizeEnabled: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "ios"
            },
            options: {
                usePopover: true
            }
        }, {
            device: {
                platform: "generic"
            },
            options: {
                popupPosition: {
                    offset: {
                        v: 4
                    }
                }
            }
        }, {
            device: function() {
                return "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_3__["default"].real().deviceType && !_core_devices__WEBPACK_IMPORTED_MODULE_3__["default"].isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: {
                platform: "android"
            },
            options: {
                popupPosition: {
                    my: "top " + (this.option("rtlEnabled") ? "left" : "right"),
                    at: "top " + (this.option("rtlEnabled") ? "left" : "right"),
                    collision: "flipfit"
                },
                popupAnimation: {
                    show: {
                        type: "pop",
                        duration: 200,
                        from: {
                            scale: 0
                        },
                        to: {
                            scale: 1
                        }
                    },
                    hide: {
                        type: "pop",
                        duration: 200,
                        from: {
                            scale: 1
                        },
                        to: {
                            scale: 0
                        }
                    }
                }
            }
        }, {
            device: function() {
                return Object(_themes__WEBPACK_IMPORTED_MODULE_11__["isMaterial"])()
            },
            options: {
                useInkRipple: true
            }
        }])
    },
    _initOptions: function(options) {
        if ("android" === _core_devices__WEBPACK_IMPORTED_MODULE_3__["default"].current().platform) {
            if (!options.popupPosition) {
                options.popupPosition = {
                    at: (options.usePopover ? "bottom " : "top ") + (options.rtlEnabled ? "left" : "right")
                }
            }
        }
        this.callBase(options)
    },
    _dataSourceOptions: function() {
        return {
            paginate: false
        }
    },
    _init: function() {
        this.callBase();
        this.$element().addClass(DROP_DOWN_MENU_CLASS);
        this._initDataSource();
        this._initItemClickAction();
        this._initButtonClickAction()
    },
    _initItemClickAction: function() {
        this._itemClickAction = this._createActionByOption("onItemClick")
    },
    _initButtonClickAction: function() {
        this._buttonClickAction = this._createActionByOption("onButtonClick")
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates({
            content: new _core_templates_child_default_template__WEBPACK_IMPORTED_MODULE_12__["ChildDefaultTemplate"]("content")
        });
        this.callBase()
    },
    _initMarkup: function() {
        this._renderButton();
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this.setAria({
            role: "menubar",
            haspopup: true,
            expanded: this.option("opened")
        })
    },
    _renderContentImpl: function() {
        if (this.option("opened")) {
            this._renderPopup()
        }
    },
    _clean: function() {
        this._cleanFocusState();
        if (this._popup) {
            this._popup.$element().remove();
            delete this._$popup
        }
    },
    _renderButton: function() {
        var $button = this.$element().addClass(DROP_DOWN_MENU_BUTTON_CLASS);
        var config = this._buttonOptions();
        this._button = this._createComponent($button, _button__WEBPACK_IMPORTED_MODULE_7__["default"], config)
    },
    _toggleActiveState: function($element, value, e) {
        this._button._toggleActiveState($element, value, e)
    },
    _buttonOptions: function() {
        return {
            text: this.option("buttonText"),
            icon: this.option("buttonIcon"),
            width: this.option("buttonWidth"),
            height: this.option("buttonHeight"),
            useInkRipple: this.option("useInkRipple"),
            template: this.option("buttonTemplate"),
            hoverStateEnabled: false,
            focusStateEnabled: false,
            onClick: function(e) {
                this.option("opened", !this.option("opened"));
                this._buttonClickAction(e)
            }.bind(this)
        }
    },
    _toggleMenuVisibility: function(opened) {
        var state = void 0 === opened ? !this._popup.option("visible") : opened;
        if (opened) {
            this._renderPopup()
        }
        this._popup.toggle(state);
        this.setAria("expanded", state)
    },
    _renderPopup: function() {
        if (this._$popup) {
            return
        }
        var $popup = this._$popup = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo(this.$element());
        var config = this._popupOptions();
        this._popup = this._createComponent($popup, _popover__WEBPACK_IMPORTED_MODULE_8__["default"], config)
    },
    _popupOptions: function() {
        var usePopup = !this.option("usePopover");
        return {
            onInitialized: function(args) {
                args.component.$wrapper().addClass(DROP_DOWN_MENU_POPUP_WRAPPER_CLASS).toggleClass(DROP_DOWN_MENU_POPUP_CLASS, usePopup)
            },
            deferRendering: false,
            contentTemplate: function(contentElement) {
                this._renderList(contentElement)
            }.bind(this),
            position: this.option("popupPosition"),
            animation: this.option("popupAnimation"),
            onOptionChanged: function(args) {
                if ("visible" === args.name) {
                    this.option("opened", args.value)
                }
            }.bind(this),
            target: this.$element(),
            height: this.option("popupHeight"),
            width: this.option("popupWidth"),
            maxHeight: this.option("popupMaxHeight"),
            container: this.option("container"),
            autoResizeEnabled: this.option("popupAutoResizeEnabled")
        }
    },
    _renderList: function(contentElement) {
        var $content = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(contentElement);
        var listConfig = this._listOptions();
        $content.addClass(DROP_DOWN_MENU_LIST_CLASS);
        this._list = this._createComponent($content, this.option("menuWidget"), listConfig);
        this._list._getAriaTarget = function() {
            return this.$element()
        }.bind(this);
        this._setListDataSource();
        var listMaxHeight = .5 * Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(window);
        if (Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])($content) > listMaxHeight) {
            Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["setHeight"])($content, listMaxHeight)
        }
    },
    _itemOptionChanged: function(item, property, value) {
        var _this$_list;
        null === (_this$_list = this._list) || void 0 === _this$_list ? void 0 : _this$_list._itemOptionChanged(item, property, value);
        Object(_toolbar_ui_toolbar_utils__WEBPACK_IMPORTED_MODULE_13__["toggleItemFocusableElementTabIndex"])(this._list, item)
    },
    _listOptions: function() {
        return {
            pageLoadMode: "scrollBottom",
            indicateLoading: false,
            noDataText: "",
            selectionMode: this.option("selectionMode"),
            selectedItemKeys: this.option("selectedItemKeys"),
            itemTemplate: this.option("itemTemplate"),
            onItemClick: function(e) {
                if (this.option("closeOnClick")) {
                    this.option("opened", false)
                }
                this._itemClickAction(e)
            }.bind(this),
            tabIndex: -1,
            focusStateEnabled: this.option("focusStateEnabled"),
            activeStateEnabled: this.option("activeStateEnabled"),
            onItemRendered: this.option("onItemRendered"),
            _itemAttributes: {
                role: "menuitem"
            }
        }
    },
    _setListDataSource: function() {
        if (this._list) {
            this._list.option("dataSource", this._dataSource || this.option("items"))
        }
        delete this._deferRendering
    },
    _getKeyboardListeners() {
        return this.callBase().concat([this._list])
    },
    _toggleVisibility: function(visible) {
        this.callBase(visible);
        this._button.option("visible", visible)
    },
    _optionChanged: function(args) {
        var name = args.name;
        var value = args.value;
        switch (name) {
            case "items":
            case "dataSource":
                if (this.option("deferRendering") && !this.option("opened")) {
                    this._deferRendering = true
                } else {
                    this._refreshDataSource();
                    this._setListDataSource()
                }
                break;
            case "itemTemplate":
                if (this._list) {
                    this._list.option(name, this._getTemplate(value))
                }
                break;
            case "onItemClick":
                this._initItemClickAction();
                break;
            case "onButtonClick":
                this._buttonClickAction();
                break;
            case "buttonIcon":
            case "buttonText":
            case "buttonWidth":
            case "buttonHeight":
            case "buttonTemplate":
                this._button.option(BUTTON_OPTION_MAP[name], value);
                this._renderPopup();
                break;
            case "popupWidth":
            case "popupHeight":
            case "popupMaxHeight":
            case "popupAutoResizeEnabled":
                this._popup.option(POPUP_OPTION_MAP[name], value);
                break;
            case "usePopover":
            case "menuWidget":
            case "useInkRipple":
                this._invalidate();
                break;
            case "focusStateEnabled":
            case "activeStateEnabled":
                if (this._list) {
                    this._list.option(name, value)
                }
                this.callBase(args);
                break;
            case "selectionMode":
            case "selectedItemKeys":
            case "onItemRendered":
                if (this._list) {
                    this._list.option(name, value)
                }
                break;
            case "opened":
                if (this._deferRendering) {
                    this._refreshDataSource();
                    this._setListDataSource()
                }
                this._toggleMenuVisibility(value);
                this._updateFocusableItemsTabIndex();
                break;
            case "deferRendering":
            case "popupPosition":
            case "closeOnClick":
                break;
            case "container":
                this._popup && this._popup.option(args.name, args.value);
                break;
            case "disabled":
                if (this._list) {
                    this._updateFocusableItemsTabIndex()
                }
                break;
            default:
                this.callBase(args)
        }
    },
    _updateFocusableItemsTabIndex() {
        this.option("items").forEach(item => Object(_toolbar_ui_toolbar_utils__WEBPACK_IMPORTED_MODULE_13__["toggleItemFocusableElementTabIndex"])(this._list, item))
    },
    open: function() {
        this.option("opened", true)
    },
    close: function() {
        this.option("opened", false)
    }
}).include(_data_helper__WEBPACK_IMPORTED_MODULE_9__["default"]);
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_4__["default"])("dxDropDownMenu", DropDownMenu);
/* harmony default export */ __webpack_exports__["default"] = (DropDownMenu);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/popover.js":
/*!***************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/popover.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popover_ui_popover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popover/ui.popover */ "./node_modules/devextreme/esm/ui/popover/ui.popover.js");
/**
 * DevExtreme (esm/ui/popover.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

/* harmony default export */ __webpack_exports__["default"] = (_popover_ui_popover__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/popover/popover_position_controller.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/popover/popover_position_controller.js ***!
  \*******************************************************************************/
/*! exports provided: PopoverPositionController, POPOVER_POSITION_ALIASES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverPositionController", function() { return PopoverPositionController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POPOVER_POSITION_ALIASES", function() { return POPOVER_POSITION_ALIASES; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _animation_position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../animation/position */ "./node_modules/devextreme/esm/animation/position.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _renovation_ui_resizable_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../renovation/ui/resizable/utils */ "./node_modules/devextreme/esm/renovation/ui/resizable/utils.js");
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _overlay_overlay_position_controller__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../overlay/overlay_position_controller */ "./node_modules/devextreme/esm/ui/overlay/overlay_position_controller.js");
/**
 * DevExtreme (esm/ui/popover/popover_position_controller.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["shading", "$arrow"];







var WEIGHT_OF_SIDES = {
    left: -1,
    top: -1,
    center: 0,
    right: 1,
    bottom: 1
};
var POPOVER_POSITION_ALIASES = {
    top: {
        my: "bottom center",
        at: "top center",
        collision: "fit flip"
    },
    bottom: {
        my: "top center",
        at: "bottom center",
        collision: "fit flip"
    },
    right: {
        my: "left center",
        at: "right center",
        collision: "flip fit"
    },
    left: {
        my: "right center",
        at: "left center",
        collision: "flip fit"
    }
};
var POPOVER_DEFAULT_BOUNDARY_OFFSET = {
    h: 10,
    v: 10
};
class PopoverPositionController extends _overlay_overlay_position_controller__WEBPACK_IMPORTED_MODULE_8__["OverlayPositionController"] {
    constructor(_ref) {
        var {
            shading: shading,
            $arrow: $arrow
        } = _ref, args = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
        super(args);
        this._props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this._props, {
            shading: shading
        });
        this._$arrow = $arrow;
        this._positionSide = void 0
    }
    positionWrapper() {
        if (this._props.shading) {
            this._$wrapper.css({
                top: 0,
                left: 0
            })
        }
    }
    _renderBoundaryOffset() {}
    _getContainerPosition() {
        var offset = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_5__["pairToObject"])(this._position.offset || "");
        var {
            h: hOffset,
            v: vOffset
        } = offset;
        var isVerticalSide = this._isVerticalSide();
        var isHorizontalSide = this._isHorizontalSide();
        if (isVerticalSide || isHorizontalSide) {
            var isPopoverInside = this._isPopoverInside();
            var sign = (isPopoverInside ? -1 : 1) * WEIGHT_OF_SIDES[this._positionSide];
            var arrowSize = isVerticalSide ? Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_7__["getHeight"])(this._$arrow) : Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_7__["getWidth"])(this._$arrow);
            var arrowSizeCorrection = this._getContentBorderWidth(this._positionSide);
            var arrowOffset = sign * (arrowSize - arrowSizeCorrection);
            isVerticalSide ? vOffset += arrowOffset : hOffset += arrowOffset
        }
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({}, this._position, {
            offset: hOffset + " " + vOffset
        })
    }
    _getContentBorderWidth(side) {
        var borderWidth = this._$content.css(_renovation_ui_resizable_utils__WEBPACK_IMPORTED_MODULE_6__["borderWidthStyles"][side]);
        return parseInt(borderWidth) || 0
    }
    _isPopoverInside() {
        var my = _animation_position__WEBPACK_IMPORTED_MODULE_4__["default"].setup.normalizeAlign(this._position.my);
        var at = _animation_position__WEBPACK_IMPORTED_MODULE_4__["default"].setup.normalizeAlign(this._position.at);
        return my.h === at.h && my.v === at.v
    }
    _isVerticalSide() {
        var side = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._positionSide;
        return "top" === side || "bottom" === side
    }
    _isHorizontalSide() {
        var side = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._positionSide;
        return "left" === side || "right" === side
    }
    _getDisplaySide(position) {
        var my = _animation_position__WEBPACK_IMPORTED_MODULE_4__["default"].setup.normalizeAlign(position.my);
        var at = _animation_position__WEBPACK_IMPORTED_MODULE_4__["default"].setup.normalizeAlign(position.at);
        var weightSign = WEIGHT_OF_SIDES[my.h] === WEIGHT_OF_SIDES[at.h] && WEIGHT_OF_SIDES[my.v] === WEIGHT_OF_SIDES[at.v] ? -1 : 1;
        var horizontalWeight = Math.abs(WEIGHT_OF_SIDES[my.h] - weightSign * WEIGHT_OF_SIDES[at.h]);
        var verticalWeight = Math.abs(WEIGHT_OF_SIDES[my.v] - weightSign * WEIGHT_OF_SIDES[at.v]);
        return horizontalWeight > verticalWeight ? at.h : at.v
    }
    _normalizePosition(positionProp, targetProp) {
        var defaultPositionConfig = {
            of: targetProp,
            boundaryOffset: POPOVER_DEFAULT_BOUNDARY_OFFSET
        };
        var resultPosition;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(positionProp)) {
            resultPosition = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(true, {}, defaultPositionConfig, this._positionToObject(positionProp))
        } else {
            resultPosition = defaultPositionConfig
        }
        this._positionSide = this._getDisplaySide(resultPosition);
        return resultPosition
    }
    _positionToObject(positionProp) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isString"])(positionProp)) {
            return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({}, POPOVER_POSITION_ALIASES[positionProp])
        }
        return positionProp
    }
}



/***/ }),

/***/ "./node_modules/devextreme/esm/ui/popover/ui.popover.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/popover/ui.popover.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _animation_translator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../animation/translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _animation_position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../animation/position */ "./node_modules/devextreme/esm/animation/position.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _widget_ui_errors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../popup */ "./node_modules/devextreme/esm/ui/popup.js");
/* harmony import */ var _core_utils_position__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../core/utils/position */ "./node_modules/devextreme/esm/core/utils/position.js");
/* harmony import */ var _popover_position_controller__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./popover_position_controller */ "./node_modules/devextreme/esm/ui/popover/popover_position_controller.js");
/**
 * DevExtreme (esm/ui/popover/ui.popover.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

















var POPOVER_CLASS = "dx-popover";
var POPOVER_WRAPPER_CLASS = "dx-popover-wrapper";
var POPOVER_ARROW_CLASS = "dx-popover-arrow";
var POPOVER_WITHOUT_TITLE_CLASS = "dx-popover-without-title";
var POSITION_FLIP_MAP = {
    left: "right",
    top: "bottom",
    right: "left",
    bottom: "top",
    center: "center"
};
var getEventNameByOption = function(optionValue) {
    return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_10__["isObject"])(optionValue) ? optionValue.name : optionValue
};
var getEventName = function(that, optionName) {
    var optionValue = that.option(optionName);
    return getEventNameByOption(optionValue)
};
var getEventDelay = function(that, optionName) {
    var optionValue = that.option(optionName);
    return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_10__["isObject"])(optionValue) && optionValue.delay
};
var attachEvent = function(that, name) {
    var {
        target: target,
        shading: shading,
        disabled: disabled,
        hideEvent: hideEvent
    } = that.option();
    var isSelector = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_10__["isString"])(target);
    var shouldIgnoreHideEvent = shading && "hide" === name;
    var event = shouldIgnoreHideEvent ? null : getEventName(that, "".concat(name, "Event"));
    if (shouldIgnoreHideEvent && hideEvent) {
        _widget_ui_errors__WEBPACK_IMPORTED_MODULE_13__["default"].log("W1020")
    }
    if (!event || disabled) {
        return
    }
    var eventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_12__["addNamespace"])(event, that.NAME);
    var action = that._createAction(function() {
        var delay = getEventDelay(that, name + "Event");
        this._clearEventsTimeouts();
        if (delay) {
            this._timeouts[name] = setTimeout((function() {
                that[name]()
            }), delay)
        } else {
            that[name]()
        }
    }.bind(that), {
        validatingTargetName: "target"
    });
    var handler = function(e) {
        action({
            event: e,
            target: Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.currentTarget)
        })
    };
    var EVENT_HANDLER_NAME = "_" + name + "EventHandler";
    if (isSelector) {
        that[EVENT_HANDLER_NAME] = handler;
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__["default"].on(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__["default"].getDocument(), eventName, target, handler)
    } else {
        var targetElement = Object(_core_element__WEBPACK_IMPORTED_MODULE_3__["getPublicElement"])(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(target));
        that[EVENT_HANDLER_NAME] = void 0;
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__["default"].on(targetElement, eventName, handler)
    }
};
var detachEvent = function(that, target, name, event) {
    var eventName = event || getEventName(that, name + "Event");
    if (!eventName) {
        return
    }
    eventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_12__["addNamespace"])(eventName, that.NAME);
    var EVENT_HANDLER_NAME = "_" + name + "EventHandler";
    if (that[EVENT_HANDLER_NAME]) {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__["default"].off(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__["default"].getDocument(), eventName, target, that[EVENT_HANDLER_NAME])
    } else {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__["default"].off(Object(_core_element__WEBPACK_IMPORTED_MODULE_3__["getPublicElement"])(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(target)), eventName)
    }
};
var Popover = _popup__WEBPACK_IMPORTED_MODULE_14__["default"].inherit({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(this.callBase(), {
            target: void 0,
            shading: false,
            position: Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])({}, _popover_position_controller__WEBPACK_IMPORTED_MODULE_16__["POPOVER_POSITION_ALIASES"].bottom),
            closeOnOutsideClick: true,
            animation: {
                show: {
                    type: "fade",
                    from: 0,
                    to: 1
                },
                hide: {
                    type: "fade",
                    from: 1,
                    to: 0
                }
            },
            showTitle: false,
            width: "auto",
            height: "auto",
            dragEnabled: false,
            resizeEnabled: false,
            fullScreen: false,
            hideOnParentScroll: true,
            arrowPosition: "",
            arrowOffset: 0,
            _fixWrapperPosition: true
        })
    },
    _defaultOptionsRules: function() {
        return [{
            device: {
                platform: "ios"
            },
            options: {
                arrowPosition: {
                    boundaryOffset: {
                        h: 20,
                        v: -10
                    },
                    collision: "fit"
                }
            }
        }, {
            device: function() {
                return !Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["hasWindow"])()
            },
            options: {
                animation: null
            }
        }]
    },
    _init: function() {
        this.callBase();
        this._renderArrow();
        this._timeouts = {};
        this.$element().addClass(POPOVER_CLASS);
        this.$wrapper().addClass(POPOVER_WRAPPER_CLASS)
    },
    _render: function() {
        this.callBase.apply(this, arguments);
        this._detachEvents(this.option("target"));
        this._attachEvents()
    },
    _detachEvents: function(target) {
        detachEvent(this, target, "show");
        detachEvent(this, target, "hide")
    },
    _attachEvents: function() {
        attachEvent(this, "show");
        attachEvent(this, "hide")
    },
    _renderArrow: function() {
        this._$arrow = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(POPOVER_ARROW_CLASS).prependTo(this.$overlayContent())
    },
    _documentDownHandler: function(e) {
        if (this._isOutsideClick(e)) {
            return this.callBase(e)
        }
        return true
    },
    _isOutsideClick: function(e) {
        return !Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).closest(this.option("target")).length
    },
    _animate: function(animation) {
        if (animation && animation.to && "object" === typeof animation.to) {
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(animation.to, {
                position: this._getContainerPosition()
            })
        }
        this.callBase.apply(this, arguments)
    },
    _stopAnimation: function() {
        this.callBase.apply(this, arguments)
    },
    _renderTitle: function() {
        this.$wrapper().toggleClass(POPOVER_WITHOUT_TITLE_CLASS, !this.option("showTitle"));
        this.callBase()
    },
    _renderPosition: function() {
        var shouldUpdateDimensions = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : true;
        this.callBase();
        this._renderOverlayPosition(shouldUpdateDimensions);
        this._actions.onPositioned()
    },
    _renderOverlayPosition: function(shouldUpdateDimensions) {
        this._resetOverlayPosition(shouldUpdateDimensions);
        this._updateContentSize(shouldUpdateDimensions);
        var contentPosition = this._getContainerPosition();
        var resultLocation = _animation_position__WEBPACK_IMPORTED_MODULE_9__["default"].setup(this.$overlayContent(), contentPosition);
        var positionSide = this._getSideByLocation(resultLocation);
        this._togglePositionClass("dx-position-" + positionSide);
        this._toggleFlippedClass(resultLocation.h.flip, resultLocation.v.flip);
        var isArrowVisible = this._isHorizontalSide() || this._isVerticalSide();
        if (isArrowVisible) {
            this._renderArrowPosition(positionSide)
        }
    },
    _resetOverlayPosition: function(shouldUpdateDimensions) {
        this._setContentHeight(shouldUpdateDimensions);
        this._togglePositionClass("dx-position-" + this._positionController._positionSide);
        Object(_animation_translator__WEBPACK_IMPORTED_MODULE_8__["move"])(this.$overlayContent(), {
            left: 0,
            top: 0
        });
        this._$arrow.css({
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        })
    },
    _updateContentSize: function(shouldUpdateDimensions) {
        if (!this.$content() || !shouldUpdateDimensions) {
            return
        }
        var containerLocation = _animation_position__WEBPACK_IMPORTED_MODULE_9__["default"].calculate(this.$overlayContent(), this._getContainerPosition());
        if (containerLocation.h.oversize > 0 && this._isHorizontalSide() && !containerLocation.h.fit) {
            var newContainerWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this.$overlayContent()) - containerLocation.h.oversize;
            Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["setWidth"])(this.$overlayContent(), newContainerWidth)
        }
        if (containerLocation.v.oversize > 0 && this._isVerticalSide() && !containerLocation.v.fit) {
            var newOverlayContentHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this.$overlayContent()) - containerLocation.v.oversize;
            var newPopupContentHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this.$content()) - containerLocation.v.oversize;
            Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["setHeight"])(this.$overlayContent(), newOverlayContentHeight);
            Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["setHeight"])(this.$content(), newPopupContentHeight)
        }
    },
    _getContainerPosition: function() {
        return this._positionController._getContainerPosition()
    },
    _hideOnParentScrollTarget: function() {
        return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._positionController._position.of || this.callBase())
    },
    _getSideByLocation: function(location) {
        var isFlippedByVertical = location.v.flip;
        var isFlippedByHorizontal = location.h.flip;
        return this._isVerticalSide() && isFlippedByVertical || this._isHorizontalSide() && isFlippedByHorizontal || this._isPopoverInside() ? POSITION_FLIP_MAP[this._positionController._positionSide] : this._positionController._positionSide
    },
    _togglePositionClass: function(positionClass) {
        this.$wrapper().removeClass("dx-position-left dx-position-right dx-position-top dx-position-bottom").addClass(positionClass)
    },
    _toggleFlippedClass: function(isFlippedHorizontal, isFlippedVertical) {
        this.$wrapper().toggleClass("dx-popover-flipped-horizontal", isFlippedHorizontal).toggleClass("dx-popover-flipped-vertical", isFlippedVertical)
    },
    _renderArrowPosition: function(side) {
        var arrowRect = Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_15__["getBoundingRect"])(this._$arrow.get(0));
        var arrowFlip = -(this._isVerticalSide(side) ? arrowRect.height : arrowRect.width);
        this._$arrow.css(POSITION_FLIP_MAP[side], arrowFlip);
        var axis = this._isVerticalSide(side) ? "left" : "top";
        var sizeProperty = this._isVerticalSide(side) ? "width" : "height";
        var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._positionController._position.of);
        var targetOffset = _animation_position__WEBPACK_IMPORTED_MODULE_9__["default"].offset($target) || {
            top: 0,
            left: 0
        };
        var contentOffset = _animation_position__WEBPACK_IMPORTED_MODULE_9__["default"].offset(this.$overlayContent());
        var arrowSize = arrowRect[sizeProperty];
        var contentLocation = contentOffset[axis];
        var contentSize = Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_15__["getBoundingRect"])(this.$overlayContent().get(0))[sizeProperty];
        var targetLocation = targetOffset[axis];
        var targetElement = $target.get(0);
        var targetSize = targetElement && !targetElement.preventDefault ? Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_15__["getBoundingRect"])(targetElement)[sizeProperty] : 0;
        var min = Math.max(contentLocation, targetLocation);
        var max = Math.min(contentLocation + contentSize, targetLocation + targetSize);
        var arrowLocation;
        if ("start" === this.option("arrowPosition")) {
            arrowLocation = min - contentLocation
        } else if ("end" === this.option("arrowPosition")) {
            arrowLocation = max - contentLocation - arrowSize
        } else {
            arrowLocation = (min + max) / 2 - contentLocation - arrowSize / 2
        }
        var borderWidth = this._positionController._getContentBorderWidth(side);
        var finalArrowLocation = Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_11__["fitIntoRange"])(arrowLocation - borderWidth + this.option("arrowOffset"), borderWidth, contentSize - arrowSize - 2 * borderWidth);
        this._$arrow.css(axis, finalArrowLocation)
    },
    _isPopoverInside: function() {
        return this._positionController._isPopoverInside()
    },
    _setContentHeight: function(fullUpdate) {
        if (fullUpdate) {
            this.callBase()
        }
    },
    _getPositionControllerConfig() {
        var {
            shading: shading
        } = this.option();
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])({}, this.callBase(), {
            shading: shading,
            $arrow: this._$arrow
        })
    },
    _initPositionController() {
        this._positionController = new _popover_position_controller__WEBPACK_IMPORTED_MODULE_16__["PopoverPositionController"](this._getPositionControllerConfig())
    },
    _renderWrapperDimensions: function() {
        if (this.option("shading")) {
            this.$wrapper().css({
                width: "100%",
                height: "100%"
            })
        }
    },
    _isVerticalSide: function(side) {
        return this._positionController._isVerticalSide(side)
    },
    _isHorizontalSide: function(side) {
        return this._positionController._isHorizontalSide(side)
    },
    _clearEventTimeout: function(name) {
        clearTimeout(this._timeouts[name])
    },
    _clearEventsTimeouts: function() {
        this._clearEventTimeout("show");
        this._clearEventTimeout("hide")
    },
    _clean: function() {
        this._detachEvents(this.option("target"));
        this.callBase.apply(this, arguments)
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "arrowPosition":
            case "arrowOffset":
                this._renderGeometry();
                break;
            case "fullScreen":
                if (args.value) {
                    this.option("fullScreen", false)
                }
                break;
            case "target":
                args.previousValue && this._detachEvents(args.previousValue);
                this.callBase(args);
                break;
            case "showEvent":
            case "hideEvent":
                var name = args.name.substring(0, 4);
                var event = getEventNameByOption(args.previousValue);
                this.hide();
                detachEvent(this, this.option("target"), name, event);
                attachEvent(this, name);
                break;
            case "visible":
                this._clearEventTimeout(args.value ? "show" : "hide");
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    },
    show: function(target) {
        if (target) {
            this.option("target", target)
        }
        return this.callBase()
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_6__["default"])("dxPopover", Popover);
/* harmony default export */ __webpack_exports__["default"] = (Popover);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/toolbar.js":
/*!***************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/toolbar.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _toolbar_ui_toolbar_drop_down_menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./toolbar/ui.toolbar.drop_down_menu */ "./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.drop_down_menu.js");
/* harmony import */ var _toolbar_ui_toolbar_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./toolbar/ui.toolbar.base */ "./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.base.js");
/* harmony import */ var _core_templates_child_default_template__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/templates/child_default_template */ "./node_modules/devextreme/esm/core/templates/child_default_template.js");
/* harmony import */ var _toolbar_ui_toolbar_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./toolbar/ui.toolbar.utils */ "./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.utils.js");
/**
 * DevExtreme (esm/ui/toolbar.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */











var TOOLBAR_AUTO_HIDE_ITEM_CLASS = "dx-toolbar-item-auto-hide";
var TOOLBAR_AUTO_HIDE_TEXT_CLASS = "dx-toolbar-text-auto-hide";
var TOOLBAR_HIDDEN_ITEM = "dx-toolbar-item-invisible";
var Toolbar = _toolbar_ui_toolbar_base__WEBPACK_IMPORTED_MODULE_8__["default"].inherit({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])(this.callBase(), {
            menuItemTemplate: "menuItem",
            menuContainer: void 0,
            overflowMenuVisible: false
        })
    },
    updateDimensions: function() {
        this._dimensionChanged()
    },
    _dimensionChanged: function(dimension) {
        if ("height" === dimension) {
            return
        }
        this.callBase();
        this._menu.renderMenuItems()
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            actionSheetItem: new _core_templates_child_default_template__WEBPACK_IMPORTED_MODULE_9__["ChildDefaultTemplate"]("item")
        })
    },
    _initMarkup: function() {
        this.callBase();
        this._updateFocusableItemsTabIndex();
        this._renderMenu()
    },
    _postProcessRenderItems: function() {
        this._hideOverflowItems();
        this._menu._updateMenuVisibility();
        this.callBase();
        Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_3__["deferRender"])(() => {
            this._menu.renderMenuItems()
        })
    },
    _renderItem: function(index, item, itemContainer, $after) {
        var itemElement = this.callBase(index, item, itemContainer, $after);
        if ("auto" === item.locateInMenu) {
            itemElement.addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS)
        }
        if ("dxButton" === item.widget && "inMenu" === item.showText) {
            itemElement.toggleClass(TOOLBAR_AUTO_HIDE_TEXT_CLASS)
        }
        return itemElement
    },
    _getItemsWidth: function() {
        return this._getSummaryItemsWidth([this._$beforeSection, this._$centerSection, this._$afterSection])
    },
    _hideOverflowItems: function(elementWidth) {
        var overflowItems = this.$element().find("." + TOOLBAR_AUTO_HIDE_ITEM_CLASS);
        if (!overflowItems.length) {
            return
        }
        elementWidth = elementWidth || Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this.$element());
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(overflowItems).removeClass(TOOLBAR_HIDDEN_ITEM);
        var itemsWidth = this._getItemsWidth();
        while (overflowItems.length && elementWidth < itemsWidth) {
            var $item = overflowItems.eq(-1);
            itemsWidth -= Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])($item);
            $item.addClass(TOOLBAR_HIDDEN_ITEM);
            overflowItems.splice(-1, 1)
        }
    },
    _getMenuItems: function() {
        var that = this;
        var menuItems = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_3__["grep"])(this.option("items") || [], (function(item) {
            return that._isMenuItem(item)
        }));
        var $hiddenItems = this._itemContainer().children("." + TOOLBAR_AUTO_HIDE_ITEM_CLASS + "." + TOOLBAR_HIDDEN_ITEM).not(".dx-state-invisible");
        this._restoreItems = this._restoreItems || [];
        var overflowItems = [].slice.call($hiddenItems).map(item => {
            var itemData = that._getItemData(item);
            var $itemContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(item);
            var $itemMarkup = $itemContainer.children();
            return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({
                menuItemTemplate: function() {
                    that._restoreItems.push({
                        container: $itemContainer,
                        item: $itemMarkup
                    });
                    var $container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(TOOLBAR_AUTO_HIDE_ITEM_CLASS);
                    return $container.append($itemMarkup)
                }
            }, itemData)
        });
        return Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_5__["merge"])(overflowItems, menuItems)
    },
    _getToolbarItems: function() {
        var that = this;
        return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_3__["grep"])(this.option("items") || [], (function(item) {
            return !that._isMenuItem(item)
        }))
    },
    _renderMenu: function() {
        this._renderMenuStrategy();
        Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_3__["deferRender"])(() => {
            this._menu.render()
        })
    },
    _renderMenuStrategy: function() {
        if (!this._menu) {
            this._menu = new _toolbar_ui_toolbar_drop_down_menu__WEBPACK_IMPORTED_MODULE_7__["default"](this)
        }
    },
    _arrangeItems: function() {
        if (this.$element().is(":hidden")) {
            return
        }
        this._$centerSection.css({
            margin: "0 auto",
            float: "none"
        });
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_6__["each"])(this._restoreItems || [], (function(_, obj) {
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(obj.container).append(obj.item)
        }));
        this._restoreItems = [];
        var elementWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this.$element());
        this._hideOverflowItems(elementWidth);
        this.callBase(elementWidth)
    },
    _itemOptionChanged: function(item, property, value) {
        if (this._isMenuItem(item)) {
            this._menu.itemOption(item, property, value)
        } else if (this._isToolbarItem(item)) {
            this.callBase(item, property, value)
        } else {
            this.callBase(item, property, value);
            this._menu.renderMenuItems()
        }
        if ("disabled" === property || "options.disabled" === property) {
            Object(_toolbar_ui_toolbar_utils__WEBPACK_IMPORTED_MODULE_10__["toggleItemFocusableElementTabIndex"])(this, item)
        }
        if ("location" === property) {
            this.repaint()
        }
    },
    _updateFocusableItemsTabIndex() {
        this._getToolbarItems().forEach(item => Object(_toolbar_ui_toolbar_utils__WEBPACK_IMPORTED_MODULE_10__["toggleItemFocusableElementTabIndex"])(this, item))
    },
    _isMenuItem: function(itemData) {
        return "menu" === itemData.location || "always" === itemData.locateInMenu
    },
    _isToolbarItem: function(itemData) {
        return void 0 === itemData.location || "never" === itemData.locateInMenu
    },
    _optionChanged: function(args) {
        var {
            name: name,
            value: value
        } = args;
        switch (name) {
            case "menuItemTemplate":
                this._changeMenuOption("itemTemplate", this._getTemplate(value));
                break;
            case "onItemClick":
                this._changeMenuOption(name, value);
                this.callBase.apply(this, arguments);
                break;
            case "menuContainer":
                this._changeMenuOption("container", value);
                break;
            case "overflowMenuVisible":
                this._changeMenuOption("opened", value);
                break;
            case "disabled":
                this._changeMenuOption("disabled", value);
                this.callBase.apply(this, arguments);
                this._updateFocusableItemsTabIndex();
                break;
            default:
                this.callBase.apply(this, arguments)
        }
    },
    _changeMenuOption: function(name, value) {
        this._menu.widgetOption(name, value)
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_2__["default"])("dxToolbar", Toolbar);
/* harmony default export */ __webpack_exports__["default"] = (Toolbar);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.drop_down_menu.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.drop_down_menu.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _ui_toolbar_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui.toolbar.menu */ "./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.menu.js");
/* harmony import */ var _drop_down_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../drop_down_menu */ "./node_modules/devextreme/esm/ui/drop_down_menu.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/**
 * DevExtreme (esm/ui/toolbar/ui.toolbar.drop_down_menu.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var MENU_INVISIBLE_CLASS = "dx-state-invisible";
var TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS = "dx-toolbar-menu-container";
var POPOVER_BOUNDARY_OFFSET = 10;
class ToolbarDropDownMenu {
    constructor(toolbar) {
        this._toolbar = toolbar
    }
    render() {
        if (!this._hasVisibleMenuItems()) {
            return
        }
        this._renderMenuButtonContainer();
        var $menu = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo(this._dropDownMenuContainer());
        this._dropDownMenu = this._toolbar._createComponent($menu, _drop_down_menu__WEBPACK_IMPORTED_MODULE_3__["default"], this._dropDownMenuOptions());
        this.renderMenuItems()
    }
    renderMenuItems() {
        if (!this._dropDownMenu) {
            this.render()
        }
        this._dropDownMenu && this._dropDownMenu.option("items", this._getMenuItems());
        if (this._dropDownMenu && !this._dropDownMenu.option("items").length) {
            this._dropDownMenu.close()
        }
    }
    _renderMenuButtonContainer() {
        var $afterSection = this._toolbar._$afterSection;
        this._$menuButtonContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo($afterSection).addClass(this._toolbar._buttonClass()).addClass(TOOLBAR_DROP_DOWN_MENU_CONTAINER_CLASS)
    }
    _getMenuItemTemplate() {
        return this._toolbar._getTemplateByOption("menuItemTemplate")
    }
    _dropDownMenuOptions() {
        var itemClickAction = this._toolbar._createActionByOption("onItemClick");
        var topAndBottomOffset = 2 * POPOVER_BOUNDARY_OFFSET;
        return {
            disabled: this._toolbar.option("disabled"),
            itemTemplate: this._getMenuItemTemplate.bind(this),
            onItemClick: function(e) {
                itemClickAction(e)
            }.bind(this),
            deferRendering: true,
            container: this._toolbar.option("menuContainer"),
            popupMaxHeight: "android" === _core_devices__WEBPACK_IMPORTED_MODULE_4__["default"].current().platform ? _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getDocumentElement().clientHeight - topAndBottomOffset : void 0,
            menuWidget: _ui_toolbar_menu__WEBPACK_IMPORTED_MODULE_2__["default"],
            onOptionChanged: _ref => {
                var {
                    name: name,
                    value: value
                } = _ref;
                if ("opened" === name) {
                    this._toolbar.option("overflowMenuVisible", value)
                }
                if ("items" === name) {
                    this._updateMenuVisibility(value)
                }
            },
            popupPosition: {
                at: "bottom right",
                my: "top right"
            }
        }
    }
    _updateMenuVisibility(menuItems) {
        var items = menuItems || this._getMenuItems();
        var isMenuVisible = items.length && this._hasVisibleMenuItems(items);
        this._toggleMenuVisibility(isMenuVisible)
    }
    _getMenuItems() {
        return this._toolbar._getMenuItems()
    }
    _hasVisibleMenuItems(items) {
        var menuItems = items || this._toolbar.option("items");
        var result = false;
        var optionGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_6__["compileGetter"])("visible");
        var overflowGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_6__["compileGetter"])("locateInMenu");
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(menuItems, (function(index, item) {
            var itemVisible = optionGetter(item, {
                functionsAsIs: true
            });
            var itemOverflow = overflowGetter(item, {
                functionsAsIs: true
            });
            if (false !== itemVisible && ("auto" === itemOverflow || "always" === itemOverflow) || "menu" === item.location) {
                result = true
            }
        }));
        return result
    }
    _toggleMenuVisibility(value) {
        if (!this._dropDownMenuContainer()) {
            return
        }
        this._dropDownMenuContainer().toggleClass(MENU_INVISIBLE_CLASS, !value)
    }
    _dropDownMenuContainer() {
        return this._$menuButtonContainer
    }
    widgetOption(name, value) {
        this._dropDownMenu && this._dropDownMenu.option(name, value)
    }
    itemOption(item, property, value) {
        if ("disabled" === property || "options.disabled" === property) {
            var _this$_dropDownMenu;
            null === (_this$_dropDownMenu = this._dropDownMenu) || void 0 === _this$_dropDownMenu ? void 0 : _this$_dropDownMenu._itemOptionChanged(item, property, value)
        } else {
            this.renderMenuItems()
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (ToolbarDropDownMenu);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.menu.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.menu.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _list_ui_list_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../list/ui.list.base */ "./node_modules/devextreme/esm/ui/list/ui.list.base.js");
/**
 * DevExtreme (esm/ui/toolbar/ui.toolbar.menu.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var TOOLBAR_MENU_ACTION_CLASS = "dx-toolbar-menu-action";
var TOOLBAR_HIDDEN_BUTTON_CLASS = "dx-toolbar-hidden-button";
var TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS = "dx-toolbar-hidden-button-group";
var TOOLBAR_MENU_SECTION_CLASS = "dx-toolbar-menu-section";
var TOOLBAR_MENU_LAST_SECTION_CLASS = "dx-toolbar-menu-last-section";
var ToolbarMenu = _list_ui_list_base__WEBPACK_IMPORTED_MODULE_3__["ListBase"].inherit({
    _activeStateUnit: "." + TOOLBAR_MENU_ACTION_CLASS,
    _initMarkup: function() {
        this._renderSections();
        this.callBase()
    },
    _getSections: function() {
        return this._itemContainer().children()
    },
    _itemElements: function() {
        return this._getSections().children(this._itemSelector())
    },
    _renderSections: function() {
        var that = this;
        var $container = this._itemContainer();
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(["before", "center", "after", "menu"], (function() {
            var sectionName = "_$" + this + "Section";
            var $section = that[sectionName];
            if (!$section) {
                that[sectionName] = $section = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(TOOLBAR_MENU_SECTION_CLASS)
            }
            $section.appendTo($container)
        }))
    },
    _renderItems: function() {
        this.callBase.apply(this, arguments);
        this._updateSections()
    },
    _updateSections: function() {
        var $sections = this.$element().find("." + TOOLBAR_MENU_SECTION_CLASS);
        $sections.removeClass(TOOLBAR_MENU_LAST_SECTION_CLASS);
        $sections.not(":empty").eq(-1).addClass(TOOLBAR_MENU_LAST_SECTION_CLASS)
    },
    _renderItem: function(index, item, itemContainer, $after) {
        var location = item.location || "menu";
        var $container = this["_$" + location + "Section"];
        var itemElement = this.callBase(index, item, $container, $after);
        if (this._getItemTemplateName({
                itemData: item
            })) {
            itemElement.addClass("dx-toolbar-menu-custom")
        }
        if ("menu" === location || "dxButton" === item.widget || "dxButtonGroup" === item.widget || item.isAction) {
            itemElement.addClass(TOOLBAR_MENU_ACTION_CLASS)
        }
        if ("dxButton" === item.widget) {
            itemElement.addClass(TOOLBAR_HIDDEN_BUTTON_CLASS)
        }
        if ("dxButtonGroup" === item.widget) {
            itemElement.addClass(TOOLBAR_HIDDEN_BUTTON_GROUP_CLASS)
        }
        itemElement.addClass(item.cssClass);
        return itemElement
    },
    _getItemTemplateName: function(args) {
        var template = this.callBase(args);
        var data = args.itemData;
        var menuTemplate = data && data.menuItemTemplate;
        return menuTemplate || template
    },
    _itemClickHandler: function(e, args, config) {
        if (Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target).closest("." + TOOLBAR_MENU_ACTION_CLASS).length) {
            this.callBase(e, args, config)
        }
    },
    _clean: function() {
        this._getSections().empty();
        this.callBase()
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_1__["default"])("dxToolbarMenu", ToolbarMenu);
/* harmony default export */ __webpack_exports__["default"] = (ToolbarMenu);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.utils.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.utils.js ***!
  \********************************************************************/
/*! exports provided: toggleItemFocusableElementTabIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleItemFocusableElementTabIndex", function() { return toggleItemFocusableElementTabIndex; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/**
 * DevExtreme (esm/ui/toolbar/ui.toolbar.utils.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var BUTTON_GROUP_CLASS = "dx-buttongroup";
var TOOLBAR_ITEMS = ["dxAutocomplete", "dxButton", "dxCheckBox", "dxDateBox", "dxMenu", "dxSelectBox", "dxTabs", "dxTextBox", "dxButtonGroup", "dxDropDownButton"];
var getItemInstance = function($element) {
    var itemData = $element.data && $element.data();
    var dxComponents = itemData && itemData.dxComponents;
    var widgetName = dxComponents && dxComponents[0];
    return widgetName && itemData[widgetName]
};
function toggleItemFocusableElementTabIndex(context, item) {
    var _itemData$options;
    if (!context) {
        return
    }
    var $item = context._findItemElementByItem(item);
    if (!$item.length) {
        return
    }
    var itemData = context._getItemData($item);
    var isItemNotFocusable = !!(null !== (_itemData$options = itemData.options) && void 0 !== _itemData$options && _itemData$options.disabled || itemData.disabled || context.option("disabled"));
    var {
        widget: widget
    } = itemData;
    if (widget && -1 !== TOOLBAR_ITEMS.indexOf(widget)) {
        var $widget = $item.find(widget.toLowerCase().replace("dx", ".dx-"));
        if ($widget.length) {
            var _itemInstance$_focusT, _itemData$options2;
            var itemInstance = getItemInstance($widget);
            var $focusTarget = "dxDropDownButton" === widget ? itemInstance._focusTarget().find(".".concat(BUTTON_GROUP_CLASS)) : (null === itemInstance || void 0 === itemInstance ? void 0 : null === (_itemInstance$_focusT = itemInstance._focusTarget) || void 0 === _itemInstance$_focusT ? void 0 : _itemInstance$_focusT.call(itemInstance)) || Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(itemInstance.element());
            var tabIndex = null === (_itemData$options2 = itemData.options) || void 0 === _itemData$options2 ? void 0 : _itemData$options2.tabIndex;
            if (isItemNotFocusable) {
                $focusTarget.attr("tabIndex", -1)
            } else {
                $focusTarget.attr("tabIndex", tabIndex ? tabIndex : 0)
            }
        }
    }
}


/***/ })

}]);