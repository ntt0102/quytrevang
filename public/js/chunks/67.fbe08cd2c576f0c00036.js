(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[67],{

/***/ "./node_modules/devextreme/esm/renovation/ui/scroll_view/common/consts.js":
/*!********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/scroll_view/common/consts.js ***!
  \********************************************************************************/
/*! exports provided: SCROLL_LINE_HEIGHT, DIRECTION_VERTICAL, DIRECTION_HORIZONTAL, DIRECTION_BOTH, SCROLLABLE_SIMULATED_CLASS, SCROLLABLE_CONTENT_CLASS, SCROLLABLE_WRAPPER_CLASS, SCROLLABLE_CONTAINER_CLASS, SCROLLABLE_DISABLED_CLASS, SCROLLABLE_SCROLLBAR_SIMULATED, SCROLLABLE_SCROLLBARS_HIDDEN, SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE, SCROLLABLE_SCROLLBAR_CLASS, SCROLLABLE_SCROLLBAR_ACTIVE_CLASS, SCROLLABLE_SCROLL_CLASS, SCROLLABLE_SCROLL_CONTENT_CLASS, HOVER_ENABLED_STATE, SCROLLVIEW_CONTENT_CLASS, SCROLLVIEW_TOP_POCKET_CLASS, SCROLLVIEW_PULLDOWN, SCROLLVIEW_PULLDOWN_LOADING_CLASS, SCROLLVIEW_PULLDOWN_READY_CLASS, SCROLLVIEW_PULLDOWN_IMAGE_CLASS, SCROLLVIEW_PULLDOWN_INDICATOR_CLASS, SCROLLVIEW_PULLDOWN_TEXT_CLASS, SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS, PULLDOWN_ICON_CLASS, SCROLLVIEW_BOTTOM_POCKET_CLASS, SCROLLVIEW_REACHBOTTOM_CLASS, SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS, SCROLLVIEW_REACHBOTTOM_TEXT_CLASS, TopPocketState, ShowScrollbarMode, KEY_CODES, VALIDATE_WHEEL_TIMEOUT, HIDE_SCROLLBAR_TIMEOUT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLL_LINE_HEIGHT", function() { return SCROLL_LINE_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTION_VERTICAL", function() { return DIRECTION_VERTICAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTION_HORIZONTAL", function() { return DIRECTION_HORIZONTAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTION_BOTH", function() { return DIRECTION_BOTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_SIMULATED_CLASS", function() { return SCROLLABLE_SIMULATED_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_CONTENT_CLASS", function() { return SCROLLABLE_CONTENT_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_WRAPPER_CLASS", function() { return SCROLLABLE_WRAPPER_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_CONTAINER_CLASS", function() { return SCROLLABLE_CONTAINER_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_DISABLED_CLASS", function() { return SCROLLABLE_DISABLED_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_SCROLLBAR_SIMULATED", function() { return SCROLLABLE_SCROLLBAR_SIMULATED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_SCROLLBARS_HIDDEN", function() { return SCROLLABLE_SCROLLBARS_HIDDEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE", function() { return SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_SCROLLBAR_CLASS", function() { return SCROLLABLE_SCROLLBAR_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_SCROLLBAR_ACTIVE_CLASS", function() { return SCROLLABLE_SCROLLBAR_ACTIVE_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_SCROLL_CLASS", function() { return SCROLLABLE_SCROLL_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLABLE_SCROLL_CONTENT_CLASS", function() { return SCROLLABLE_SCROLL_CONTENT_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOVER_ENABLED_STATE", function() { return HOVER_ENABLED_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_CONTENT_CLASS", function() { return SCROLLVIEW_CONTENT_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_TOP_POCKET_CLASS", function() { return SCROLLVIEW_TOP_POCKET_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_PULLDOWN", function() { return SCROLLVIEW_PULLDOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_PULLDOWN_LOADING_CLASS", function() { return SCROLLVIEW_PULLDOWN_LOADING_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_PULLDOWN_READY_CLASS", function() { return SCROLLVIEW_PULLDOWN_READY_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_PULLDOWN_IMAGE_CLASS", function() { return SCROLLVIEW_PULLDOWN_IMAGE_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_PULLDOWN_INDICATOR_CLASS", function() { return SCROLLVIEW_PULLDOWN_INDICATOR_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_PULLDOWN_TEXT_CLASS", function() { return SCROLLVIEW_PULLDOWN_TEXT_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS", function() { return SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PULLDOWN_ICON_CLASS", function() { return PULLDOWN_ICON_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_BOTTOM_POCKET_CLASS", function() { return SCROLLVIEW_BOTTOM_POCKET_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_REACHBOTTOM_CLASS", function() { return SCROLLVIEW_REACHBOTTOM_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS", function() { return SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLVIEW_REACHBOTTOM_TEXT_CLASS", function() { return SCROLLVIEW_REACHBOTTOM_TEXT_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopPocketState", function() { return TopPocketState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShowScrollbarMode", function() { return ShowScrollbarMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_CODES", function() { return KEY_CODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATE_WHEEL_TIMEOUT", function() { return VALIDATE_WHEEL_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIDE_SCROLLBAR_TIMEOUT", function() { return HIDE_SCROLLBAR_TIMEOUT; });
/**
 * DevExtreme (esm/renovation/ui/scroll_view/common/consts.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var SCROLL_LINE_HEIGHT = 40;
var DIRECTION_VERTICAL = "vertical";
var DIRECTION_HORIZONTAL = "horizontal";
var DIRECTION_BOTH = "both";
var SCROLLABLE_SIMULATED_CLASS = "dx-scrollable-simulated";
var SCROLLABLE_CONTENT_CLASS = "dx-scrollable-content";
var SCROLLABLE_WRAPPER_CLASS = "dx-scrollable-wrapper";
var SCROLLABLE_CONTAINER_CLASS = "dx-scrollable-container";
var SCROLLABLE_DISABLED_CLASS = "dx-scrollable-disabled";
var SCROLLABLE_SCROLLBAR_SIMULATED = "dx-scrollable-scrollbar-simulated";
var SCROLLABLE_SCROLLBARS_HIDDEN = "dx-scrollable-scrollbars-hidden";
var SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = "dx-scrollable-scrollbars-alwaysvisible";
var SCROLLABLE_SCROLLBAR_CLASS = "dx-scrollable-scrollbar";
var SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = "dx-scrollable-scrollbar-active";
var SCROLLABLE_SCROLL_CLASS = "dx-scrollable-scroll";
var SCROLLABLE_SCROLL_CONTENT_CLASS = "dx-scrollable-scroll-content";
var HOVER_ENABLED_STATE = "dx-scrollbar-hoverable";
var SCROLLVIEW_CONTENT_CLASS = "dx-scrollview-content";
var SCROLLVIEW_TOP_POCKET_CLASS = "dx-scrollview-top-pocket";
var SCROLLVIEW_PULLDOWN = "dx-scrollview-pull-down";
var SCROLLVIEW_PULLDOWN_LOADING_CLASS = "dx-scrollview-pull-down-loading";
var SCROLLVIEW_PULLDOWN_READY_CLASS = "dx-scrollview-pull-down-ready";
var SCROLLVIEW_PULLDOWN_IMAGE_CLASS = "dx-scrollview-pull-down-image";
var SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = "dx-scrollview-pull-down-indicator";
var SCROLLVIEW_PULLDOWN_TEXT_CLASS = "dx-scrollview-pull-down-text";
var SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = "dx-scrollview-pull-down-text-visible";
var PULLDOWN_ICON_CLASS = "dx-icon-pulldown";
var SCROLLVIEW_BOTTOM_POCKET_CLASS = "dx-scrollview-bottom-pocket";
var SCROLLVIEW_REACHBOTTOM_CLASS = "dx-scrollview-scrollbottom";
var SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = "dx-scrollview-scrollbottom-indicator";
var SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = "dx-scrollview-scrollbottom-text";
var TopPocketState = {
    STATE_RELEASED: 0,
    STATE_READY: 1,
    STATE_REFRESHING: 2,
    STATE_LOADING: 3,
    STATE_TOUCHED: 4,
    STATE_PULLED: 5
};
var ShowScrollbarMode = {
    HOVER: "onHover",
    ALWAYS: "always",
    NEVER: "never",
    SCROLL: "onScroll"
};
var KEY_CODES = {
    PAGE_UP: "pageUp",
    PAGE_DOWN: "pageDown",
    END: "end",
    HOME: "home",
    LEFT: "leftArrow",
    UP: "upArrow",
    RIGHT: "rightArrow",
    DOWN: "downArrow"
};
var VALIDATE_WHEEL_TIMEOUT = 500;
var HIDE_SCROLLBAR_TIMEOUT = 500;


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/scroll_view/utils/get_element_location_internal.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/scroll_view/utils/get_element_location_internal.js ***!
  \******************************************************************************************************/
/*! exports provided: getElementLocationInternal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementLocationInternal", function() { return getElementLocationInternal; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _core_utils_inflector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/utils/inflector */ "./node_modules/devextreme/esm/core/utils/inflector.js");
/* harmony import */ var _get_relative_offset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./get_relative_offset */ "./node_modules/devextreme/esm/renovation/ui/scroll_view/utils/get_relative_offset.js");
/* harmony import */ var _common_consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/consts */ "./node_modules/devextreme/esm/renovation/ui/scroll_view/common/consts.js");
/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/get_element_location_internal.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




function getElementLocationInternal(targetElement, direction, containerElement, scrollOffset, offset) {
    var additionalOffset = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }, offset);
    var isVertical = direction === _common_consts__WEBPACK_IMPORTED_MODULE_3__["DIRECTION_VERTICAL"];
    var prop = isVertical ? "top" : "left";
    var inverseProp = isVertical ? "bottom" : "right";
    var dimension = isVertical ? "height" : "width";
    var containerOffsetSize = containerElement["offset".concat(Object(_core_utils_inflector__WEBPACK_IMPORTED_MODULE_1__["titleize"])(dimension))];
    var containerClientSize = containerElement["client".concat(Object(_core_utils_inflector__WEBPACK_IMPORTED_MODULE_1__["titleize"])(dimension))];
    var containerSize = containerElement.getBoundingClientRect()[dimension];
    var elementSize = targetElement.getBoundingClientRect()[dimension];
    var scale = 1;
    if (Math.abs(containerSize - containerOffsetSize) > 1) {
        scale = containerSize / containerOffsetSize
    }
    var relativeElementOffset = Object(_get_relative_offset__WEBPACK_IMPORTED_MODULE_2__["getRelativeOffset"])(_common_consts__WEBPACK_IMPORTED_MODULE_3__["SCROLLABLE_CONTENT_CLASS"], targetElement)[prop] / scale;
    var containerScrollOffset = scrollOffset[prop];
    var relativeStartOffset = containerScrollOffset - relativeElementOffset + additionalOffset[prop];
    var relativeEndOffset = containerScrollOffset - relativeElementOffset - elementSize / scale + containerClientSize - additionalOffset[inverseProp];
    if (relativeStartOffset <= 0 && relativeEndOffset >= 0) {
        return containerScrollOffset
    }
    return containerScrollOffset - (Math.abs(relativeStartOffset) > Math.abs(relativeEndOffset) ? relativeEndOffset : relativeStartOffset)
}


/***/ }),

/***/ "./node_modules/devextreme/esm/renovation/ui/scroll_view/utils/get_relative_offset.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/renovation/ui/scroll_view/utils/get_relative_offset.js ***!
  \********************************************************************************************/
/*! exports provided: getRelativeOffset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRelativeOffset", function() { return getRelativeOffset; });
/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/get_relative_offset.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
function getRelativeOffset(targetElementClass, sourceElement) {
    var offset = {
        left: 0,
        top: 0
    };
    var element = sourceElement;
    while (null !== (_element = element) && void 0 !== _element && _element.offsetParent && !element.classList.contains(targetElementClass)) {
        var _element;
        var parentElement = element.offsetParent;
        var elementRect = element.getBoundingClientRect();
        var parentElementRect = parentElement.getBoundingClientRect();
        offset.left += elementRect.left - parentElementRect.left;
        offset.top += elementRect.top - parentElementRect.top;
        element = element.offsetParent
    }
    return offset
}


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view.js":
/*!*******************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scroll_view_ui_scroll_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll_view/ui.scroll_view */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.js");
/**
 * DevExtreme (esm/ui/scroll_view.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

/* harmony default export */ __webpack_exports__["default"] = (_scroll_view_ui_scroll_view__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view/animator.js":
/*!****************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view/animator.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _animation_frame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../animation/frame */ "./node_modules/devextreme/esm/animation/frame.js");
/**
 * DevExtreme (esm/ui/scroll_view/animator.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var abstract = _core_class__WEBPACK_IMPORTED_MODULE_1__["default"].abstract;

var Animator = _core_class__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    ctor: function() {
        this._finished = true;
        this._stopped = false;
        this._proxiedStepCore = this._stepCore.bind(this)
    },
    start: function() {
        this._stopped = false;
        this._finished = false;
        this._stepCore()
    },
    stop: function() {
        this._stopped = true;
        Object(_animation_frame__WEBPACK_IMPORTED_MODULE_2__["cancelAnimationFrame"])(this._stepAnimationFrame)
    },
    _stepCore: function() {
        if (this._isStopped()) {
            this._stop();
            return
        }
        if (this._isFinished()) {
            this._finished = true;
            this._complete();
            return
        }
        this._step();
        this._stepAnimationFrame = Object(_animation_frame__WEBPACK_IMPORTED_MODULE_2__["requestAnimationFrame"])(this._proxiedStepCore)
    },
    _step: abstract,
    _isFinished: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    _stop: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    _complete: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    _isStopped: function() {
        return this._stopped
    },
    inProgress: function() {
        return !(this._stopped || this._finished)
    }
});
/* harmony default export */ __webpack_exports__["default"] = (Animator);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _ui_scroll_view_native_pull_down__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui.scroll_view.native.pull_down */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.native.pull_down.js");
/* harmony import */ var _ui_scroll_view_native_swipe_down__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ui.scroll_view.native.swipe_down */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.native.swipe_down.js");
/* harmony import */ var _ui_scroll_view_simulated__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ui.scroll_view.simulated */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.simulated.js");
/* harmony import */ var _ui_scrollable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ui.scrollable */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.js");
/* harmony import */ var _load_indicator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../load_indicator */ "./node_modules/devextreme/esm/ui/load_indicator.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../themes */ "./node_modules/devextreme/esm/ui/themes.js");
/* harmony import */ var _load_panel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../load_panel */ "./node_modules/devextreme/esm/ui/load_panel.js");
/**
 * DevExtreme (esm/ui/scroll_view/ui.scroll_view.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */















var SCROLLVIEW_CLASS = "dx-scrollview";
var SCROLLVIEW_CONTENT_CLASS = SCROLLVIEW_CLASS + "-content";
var SCROLLVIEW_TOP_POCKET_CLASS = SCROLLVIEW_CLASS + "-top-pocket";
var SCROLLVIEW_BOTTOM_POCKET_CLASS = SCROLLVIEW_CLASS + "-bottom-pocket";
var SCROLLVIEW_PULLDOWN_CLASS = SCROLLVIEW_CLASS + "-pull-down";
var SCROLLVIEW_REACHBOTTOM_CLASS = SCROLLVIEW_CLASS + "-scrollbottom";
var SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS = SCROLLVIEW_REACHBOTTOM_CLASS + "-indicator";
var SCROLLVIEW_REACHBOTTOM_TEXT_CLASS = SCROLLVIEW_REACHBOTTOM_CLASS + "-text";
var SCROLLVIEW_LOADPANEL = SCROLLVIEW_CLASS + "-loadpanel";
var refreshStrategies = {
    pullDown: _ui_scroll_view_native_pull_down__WEBPACK_IMPORTED_MODULE_8__["default"],
    swipeDown: _ui_scroll_view_native_swipe_down__WEBPACK_IMPORTED_MODULE_9__["default"],
    simulated: _ui_scroll_view_simulated__WEBPACK_IMPORTED_MODULE_10__["default"]
};
var isServerSide = !Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["hasWindow"])();
var scrollViewServerConfig = {
    finishLoading: _core_utils_common__WEBPACK_IMPORTED_MODULE_7__["noop"],
    release: _core_utils_common__WEBPACK_IMPORTED_MODULE_7__["noop"],
    refresh: _core_utils_common__WEBPACK_IMPORTED_MODULE_7__["noop"],
    _optionChanged: function(args) {
        if ("onUpdated" !== args.name) {
            return this.callBase.apply(this, arguments)
        }
    }
};
var ScrollView = _ui_scrollable__WEBPACK_IMPORTED_MODULE_11__["default"].inherit(isServerSide ? scrollViewServerConfig : {
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_6__["extend"])(this.callBase(), {
            pullingDownText: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxScrollView-pullingDownText"),
            pulledDownText: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxScrollView-pulledDownText"),
            refreshingText: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxScrollView-refreshingText"),
            reachBottomText: _localization_message__WEBPACK_IMPORTED_MODULE_3__["default"].format("dxScrollView-reachBottomText"),
            onPullDown: null,
            onReachBottom: null,
            refreshStrategy: "pullDown"
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                var realDevice = _core_devices__WEBPACK_IMPORTED_MODULE_1__["default"].real();
                return "android" === realDevice.platform
            },
            options: {
                refreshStrategy: "swipeDown"
            }
        }, {
            device: function() {
                return Object(_themes__WEBPACK_IMPORTED_MODULE_13__["isMaterial"])()
            },
            options: {
                pullingDownText: "",
                pulledDownText: "",
                refreshingText: "",
                reachBottomText: ""
            }
        }])
    },
    _init: function() {
        this.callBase();
        this._loadingIndicatorEnabled = true
    },
    _initScrollableMarkup: function() {
        this.callBase();
        this.$element().addClass(SCROLLVIEW_CLASS);
        this._initContent();
        this._initTopPocket();
        this._initBottomPocket();
        this._initLoadPanel()
    },
    _initContent: function() {
        var $content = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_CONTENT_CLASS);
        this._$content.wrapInner($content)
    },
    _initTopPocket: function() {
        var $topPocket = this._$topPocket = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_TOP_POCKET_CLASS);
        var $pullDown = this._$pullDown = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_PULLDOWN_CLASS);
        $topPocket.append($pullDown);
        this._$content.prepend($topPocket)
    },
    _initBottomPocket: function() {
        var $bottomPocket = this._$bottomPocket = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_BOTTOM_POCKET_CLASS);
        var $reachBottom = this._$reachBottom = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_REACHBOTTOM_CLASS);
        var $loadContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS);
        var $loadIndicator = new _load_indicator__WEBPACK_IMPORTED_MODULE_12__["default"](Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>")).$element();
        var $text = this._$reachBottomText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_REACHBOTTOM_TEXT_CLASS);
        this._updateReachBottomText();
        $reachBottom.append($loadContainer.append($loadIndicator)).append($text);
        $bottomPocket.append($reachBottom);
        this._$content.append($bottomPocket)
    },
    _initLoadPanel: function() {
        var $loadPanelElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_LOADPANEL).appendTo(this.$element());
        var loadPanelOptions = {
            shading: false,
            delay: 400,
            message: this.option("refreshingText"),
            position: {
                of: this.$element()
            }
        };
        this._loadPanel = this._createComponent($loadPanelElement, _load_panel__WEBPACK_IMPORTED_MODULE_14__["default"], loadPanelOptions)
    },
    _updateReachBottomText: function() {
        this._$reachBottomText.text(this.option("reachBottomText"))
    },
    _createStrategy: function() {
        var strategyName = this.option("useNative") ? this.option("refreshStrategy") : "simulated";
        var strategyClass = refreshStrategies[strategyName];
        this._strategy = new strategyClass(this);
        this._strategy.pullDownCallbacks.add(this._pullDownHandler.bind(this));
        this._strategy.releaseCallbacks.add(this._releaseHandler.bind(this));
        this._strategy.reachBottomCallbacks.add(this._reachBottomHandler.bind(this))
    },
    _createActions: function() {
        this.callBase();
        this._pullDownAction = this._createActionByOption("onPullDown");
        this._reachBottomAction = this._createActionByOption("onReachBottom");
        this._tryRefreshPocketState()
    },
    _tryRefreshPocketState: function() {
        this._pullDownEnable(this.hasActionSubscription("onPullDown"));
        this._reachBottomEnable(this.hasActionSubscription("onReachBottom"))
    },
    on: function(eventName) {
        var result = this.callBase.apply(this, arguments);
        if ("pullDown" === eventName || "reachBottom" === eventName) {
            this._tryRefreshPocketState()
        }
        return result
    },
    _pullDownEnable: function(enabled) {
        if (0 === arguments.length) {
            return this._pullDownEnabled
        }
        if (this._$pullDown && this._strategy) {
            this._$pullDown.toggle(enabled);
            this._strategy.pullDownEnable(enabled);
            this._pullDownEnabled = enabled
        }
    },
    _reachBottomEnable: function(enabled) {
        if (0 === arguments.length) {
            return this._reachBottomEnabled
        }
        if (this._$reachBottom && this._strategy) {
            this._$reachBottom.toggle(enabled);
            this._strategy.reachBottomEnable(enabled);
            this._reachBottomEnabled = enabled
        }
    },
    _pullDownHandler: function() {
        this._loadingIndicator(false);
        this._pullDownLoading()
    },
    _loadingIndicator: function(value) {
        if (arguments.length < 1) {
            return this._loadingIndicatorEnabled
        }
        this._loadingIndicatorEnabled = value
    },
    _pullDownLoading: function() {
        this.startLoading();
        this._pullDownAction()
    },
    _reachBottomHandler: function() {
        this._loadingIndicator(false);
        this._reachBottomLoading()
    },
    _reachBottomLoading: function() {
        this.startLoading();
        this._reachBottomAction()
    },
    _releaseHandler: function() {
        this.finishLoading();
        this._loadingIndicator(true)
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "onPullDown":
            case "onReachBottom":
                this._createActions();
                break;
            case "pullingDownText":
            case "pulledDownText":
            case "refreshingText":
            case "refreshStrategy":
                this._invalidate();
                break;
            case "reachBottomText":
                this._updateReachBottomText();
                break;
            default:
                this.callBase(args)
        }
    },
    content: function() {
        return Object(_core_element__WEBPACK_IMPORTED_MODULE_5__["getPublicElement"])(this._$content.children().eq(1))
    },
    release: function(preventReachBottom) {
        if (void 0 !== preventReachBottom) {
            this.toggleLoading(!preventReachBottom)
        }
        return this._strategy.release()
    },
    toggleLoading: function(showOrHide) {
        this._reachBottomEnable(showOrHide)
    },
    refresh: function() {
        if (!this.hasActionSubscription("onPullDown")) {
            return
        }
        this._strategy.pendingRelease();
        this._pullDownLoading()
    },
    startLoading: function() {
        if (this._loadingIndicator() && this.$element().is(":visible")) {
            this._loadPanel.show()
        }
        this._lock()
    },
    finishLoading: function() {
        this._loadPanel.hide();
        this._unlock()
    },
    _dispose: function() {
        this._strategy.dispose();
        this.callBase();
        if (this._loadPanel) {
            this._loadPanel.$element().remove()
        }
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_4__["default"])("dxScrollView", ScrollView);
/* harmony default export */ __webpack_exports__["default"] = (ScrollView);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.native.pull_down.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.native.pull_down.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_callbacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js");
/* harmony import */ var _animation_translator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../animation/translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _ui_scrollable_native__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui.scrollable.native */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.native.js");
/* harmony import */ var _load_indicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../load_indicator */ "./node_modules/devextreme/esm/ui/load_indicator.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/ui/scroll_view/ui.scroll_view.native.pull_down.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = "dx-scrollview-pull-down-loading";
var SCROLLVIEW_PULLDOWN_READY_CLASS = "dx-scrollview-pull-down-ready";
var SCROLLVIEW_PULLDOWN_IMAGE_CLASS = "dx-scrollview-pull-down-image";
var SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = "dx-scrollview-pull-down-indicator";
var SCROLLVIEW_PULLDOWN_TEXT_CLASS = "dx-scrollview-pull-down-text";
var SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = "dx-scrollview-pull-down-text-visible";
var STATE_RELEASED = 0;
var STATE_READY = 1;
var STATE_REFRESHING = 2;
var STATE_LOADING = 3;
var PULLDOWN_RELEASE_TIME = 400;
var PullDownNativeScrollViewStrategy = _ui_scrollable_native__WEBPACK_IMPORTED_MODULE_3__["default"].inherit({
    _init: function(scrollView) {
        this.callBase(scrollView);
        this._$topPocket = scrollView._$topPocket;
        this._$pullDown = scrollView._$pullDown;
        this._$refreshingText = scrollView._$refreshingText;
        this._$scrollViewContent = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(scrollView.content());
        this._$container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(scrollView.container());
        this._initCallbacks()
    },
    _initCallbacks: function() {
        this.pullDownCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_1__["default"])();
        this.releaseCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_1__["default"])();
        this.reachBottomCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_1__["default"])()
    },
    render: function() {
        this.callBase();
        this._renderPullDown();
        this._releaseState()
    },
    _renderPullDown: function() {
        var $image = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_PULLDOWN_IMAGE_CLASS);
        var $loadContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_PULLDOWN_INDICATOR_CLASS);
        var $loadIndicator = new _load_indicator__WEBPACK_IMPORTED_MODULE_4__["default"](Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>")).$element();
        var $text = this._$pullDownText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLVIEW_PULLDOWN_TEXT_CLASS);
        this._$pullingDownText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").text(this.option("pullingDownText")).appendTo($text);
        this._$pulledDownText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").text(this.option("pulledDownText")).appendTo($text);
        this._$refreshingText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").text(this.option("refreshingText")).appendTo($text);
        this._$pullDown.empty().append($image).append($loadContainer.append($loadIndicator)).append($text)
    },
    _releaseState: function() {
        this._state = STATE_RELEASED;
        this._refreshPullDownText()
    },
    _refreshPullDownText: function() {
        var that = this;
        var pullDownTextItems = [{
            element: this._$pullingDownText,
            visibleState: STATE_RELEASED
        }, {
            element: this._$pulledDownText,
            visibleState: STATE_READY
        }, {
            element: this._$refreshingText,
            visibleState: STATE_REFRESHING
        }];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(pullDownTextItems, (function(_, item) {
            var action = that._state === item.visibleState ? "addClass" : "removeClass";
            item.element[action](SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS)
        }))
    },
    update: function() {
        this.callBase();
        this._setTopPocketOffset()
    },
    _updateDimensions: function() {
        this.callBase();
        this._topPocketSize = this._$topPocket.get(0).clientHeight;
        var contentEl = this._$scrollViewContent.get(0);
        var containerEl = this._$container.get(0);
        this._bottomBoundary = Math.max(contentEl.clientHeight - containerEl.clientHeight, 0)
    },
    _allowedDirections: function() {
        var allowedDirections = this.callBase();
        allowedDirections.vertical = allowedDirections.vertical || this._pullDownEnabled;
        return allowedDirections
    },
    _setTopPocketOffset: function() {
        this._$topPocket.css({
            top: -this._topPocketSize
        })
    },
    handleEnd: function() {
        this.callBase();
        this._complete()
    },
    handleStop: function() {
        this.callBase();
        this._complete()
    },
    _complete: function() {
        if (this._state === STATE_READY) {
            this._setPullDownOffset(this._topPocketSize);
            clearTimeout(this._pullDownRefreshTimeout);
            this._pullDownRefreshTimeout = setTimeout(function() {
                this._pullDownRefreshing()
            }.bind(this), 400)
        }
    },
    _setPullDownOffset: function(offset) {
        Object(_animation_translator__WEBPACK_IMPORTED_MODULE_2__["move"])(this._$topPocket, {
            top: offset
        });
        Object(_animation_translator__WEBPACK_IMPORTED_MODULE_2__["move"])(this._$scrollViewContent, {
            top: offset
        })
    },
    handleScroll: function(e) {
        this.callBase(e);
        if (this._state === STATE_REFRESHING) {
            return
        }
        var currentLocation = this.location().top;
        var scrollDelta = (this._location || 0) - currentLocation;
        this._location = currentLocation;
        if (this._isPullDown()) {
            this._pullDownReady()
        } else if (scrollDelta > 0 && this._isReachBottom()) {
            this._reachBottom()
        } else {
            this._stateReleased()
        }
    },
    _isPullDown: function() {
        return this._pullDownEnabled && this._location >= this._topPocketSize
    },
    _isReachBottom: function() {
        return this._reachBottomEnabled && Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1
    },
    _reachBottom: function() {
        if (this._state === STATE_LOADING) {
            return
        }
        this._state = STATE_LOADING;
        this.reachBottomCallbacks.fire()
    },
    _pullDownReady: function() {
        if (this._state === STATE_READY) {
            return
        }
        this._state = STATE_READY;
        this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
        this._refreshPullDownText()
    },
    _stateReleased: function() {
        if (this._state === STATE_RELEASED) {
            return
        }
        this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS).removeClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
        this._releaseState()
    },
    _pullDownRefreshing: function() {
        if (this._state === STATE_REFRESHING) {
            return
        }
        this._state = STATE_REFRESHING;
        this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS).removeClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
        this._refreshPullDownText();
        this.pullDownCallbacks.fire()
    },
    pullDownEnable: function(enabled) {
        if (enabled) {
            this._updateDimensions();
            this._setTopPocketOffset()
        }
        this._pullDownEnabled = enabled
    },
    reachBottomEnable: function(enabled) {
        this._reachBottomEnabled = enabled
    },
    pendingRelease: function() {
        this._state = STATE_READY
    },
    release: function() {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["Deferred"];
        this._updateDimensions();
        clearTimeout(this._releaseTimeout);
        if (this._state === STATE_LOADING) {
            this._state = STATE_RELEASED
        }
        this._releaseTimeout = setTimeout(function() {
            this._setPullDownOffset(0);
            this._stateReleased();
            this.releaseCallbacks.fire();
            this._updateAction();
            deferred.resolve()
        }.bind(this), PULLDOWN_RELEASE_TIME);
        return deferred.promise()
    },
    dispose: function() {
        clearTimeout(this._pullDownRefreshTimeout);
        clearTimeout(this._releaseTimeout);
        this.callBase()
    }
});
/* harmony default export */ __webpack_exports__["default"] = (PullDownNativeScrollViewStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.native.swipe_down.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.native.swipe_down.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js");
/* harmony import */ var _animation_translator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../animation/translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _ui_scrollable_native__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui.scrollable.native */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.native.js");
/* harmony import */ var _load_indicator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../load_indicator */ "./node_modules/devextreme/esm/ui/load_indicator.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/ui/scroll_view/ui.scroll_view.native.swipe_down.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */








var SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS = "dx-scrollview-pull-down-loading";
var SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = "dx-scrollview-pull-down-indicator";
var SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = "dx-scrollview-pull-down-refreshing";
var PULLDOWN_ICON_CLASS = "dx-icon-pulldown";
var STATE_RELEASED = 0;
var STATE_READY = 1;
var STATE_REFRESHING = 2;
var STATE_TOUCHED = 4;
var STATE_PULLED = 5;
var SwipeDownNativeScrollViewStrategy = _ui_scrollable_native__WEBPACK_IMPORTED_MODULE_5__["default"].inherit({
    _init: function(scrollView) {
        this.callBase(scrollView);
        this._$topPocket = scrollView._$topPocket;
        this._$pullDown = scrollView._$pullDown;
        this._$scrollViewContent = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollView.content());
        this._$container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollView.container());
        this._initCallbacks();
        this._location = 0
    },
    _initCallbacks: function() {
        this.pullDownCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])();
        this.releaseCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])();
        this.reachBottomCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])()
    },
    render: function() {
        this.callBase();
        this._renderPullDown();
        this._releaseState()
    },
    _renderPullDown: function() {
        var $loadContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(SCROLLVIEW_PULLDOWN_INDICATOR_CLASS);
        var $loadIndicator = new _load_indicator__WEBPACK_IMPORTED_MODULE_6__["default"](Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>")).$element();
        this._$icon = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(PULLDOWN_ICON_CLASS);
        this._$pullDown.empty().append(this._$icon).append($loadContainer.append($loadIndicator))
    },
    _releaseState: function() {
        this._state = STATE_RELEASED;
        this._releasePullDown();
        this._updateDimensions()
    },
    _releasePullDown: function() {
        this._$pullDown.css({
            opacity: 0
        })
    },
    _updateDimensions: function() {
        this.callBase();
        this._topPocketSize = this._$topPocket.get(0).clientHeight;
        var contentEl = this._$scrollViewContent.get(0);
        var containerEl = this._$container.get(0);
        this._bottomBoundary = Math.max(contentEl.clientHeight - containerEl.clientHeight, 0)
    },
    _allowedDirections: function() {
        var allowedDirections = this.callBase();
        allowedDirections.vertical = allowedDirections.vertical || this._pullDownEnabled;
        return allowedDirections
    },
    handleInit: function(e) {
        this.callBase(e);
        if (this._state === STATE_RELEASED && 0 === this._location) {
            this._startClientY = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_4__["eventData"])(e.originalEvent).y;
            this._state = STATE_TOUCHED
        }
    },
    handleMove: function(e) {
        this.callBase(e);
        this._deltaY = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_4__["eventData"])(e.originalEvent).y - this._startClientY;
        if (this._state === STATE_TOUCHED) {
            if (this._pullDownEnabled && this._deltaY > 0) {
                this._state = STATE_PULLED
            } else {
                this._complete()
            }
        }
        if (this._state === STATE_PULLED) {
            e.preventDefault();
            this._movePullDown()
        }
    },
    _movePullDown: function() {
        var pullDownHeight = this._getPullDownHeight();
        var top = Math.min(3 * pullDownHeight, this._deltaY + this._getPullDownStartPosition());
        var angle = 180 * top / pullDownHeight / 3;
        this._$pullDown.css({
            opacity: 1
        }).toggleClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS, top < pullDownHeight);
        Object(_animation_translator__WEBPACK_IMPORTED_MODULE_3__["move"])(this._$pullDown, {
            top: top
        });
        this._$icon.css({
            transform: "rotate(" + angle + "deg)"
        })
    },
    _isPullDown: function() {
        return this._pullDownEnabled && this._state === STATE_PULLED && this._deltaY >= this._getPullDownHeight() - this._getPullDownStartPosition()
    },
    _getPullDownHeight: function() {
        return Math.round(.05 * Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])(this._$element))
    },
    _getPullDownStartPosition: function() {
        return -Math.round(1.5 * Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])(this._$pullDown))
    },
    handleEnd: function() {
        if (this._isPullDown()) {
            this._pullDownRefreshing()
        }
        this._complete()
    },
    handleStop: function() {
        this._complete()
    },
    _complete: function() {
        if (this._state === STATE_TOUCHED || this._state === STATE_PULLED) {
            this._releaseState()
        }
    },
    handleScroll: function(e) {
        this.callBase(e);
        if (this._state === STATE_REFRESHING) {
            return
        }
        var currentLocation = this.location().top;
        var scrollDelta = this._location - currentLocation;
        this._location = currentLocation;
        if (scrollDelta > 0 && this._isReachBottom()) {
            this._reachBottom()
        } else {
            this._stateReleased()
        }
    },
    _isReachBottom: function() {
        return this._reachBottomEnabled && Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1
    },
    _reachBottom: function() {
        this.reachBottomCallbacks.fire()
    },
    _stateReleased: function() {
        if (this._state === STATE_RELEASED) {
            return
        }
        this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS);
        this._releaseState()
    },
    _pullDownRefreshing: function() {
        this._state = STATE_REFRESHING;
        this._pullDownRefreshHandler()
    },
    _pullDownRefreshHandler: function() {
        this._refreshPullDown();
        this.pullDownCallbacks.fire()
    },
    _refreshPullDown: function() {
        this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_DOWN_LOADING_CLASS);
        Object(_animation_translator__WEBPACK_IMPORTED_MODULE_3__["move"])(this._$pullDown, {
            top: this._getPullDownHeight()
        })
    },
    pullDownEnable: function(enabled) {
        this._$topPocket.toggle(enabled);
        this._pullDownEnabled = enabled
    },
    reachBottomEnable: function(enabled) {
        this._reachBottomEnabled = enabled
    },
    pendingRelease: function() {
        this._state = STATE_READY
    },
    release: function() {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_7__["Deferred"];
        this._updateDimensions();
        clearTimeout(this._releaseTimeout);
        this._releaseTimeout = setTimeout(function() {
            this._stateReleased();
            this.releaseCallbacks.fire();
            this._updateAction();
            deferred.resolve()
        }.bind(this), 800);
        return deferred.promise()
    },
    dispose: function() {
        clearTimeout(this._pullDownRefreshTimeout);
        clearTimeout(this._releaseTimeout);
        this.callBase()
    }
});
/* harmony default export */ __webpack_exports__["default"] = (SwipeDownNativeScrollViewStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.simulated.js":
/*!********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view/ui.scroll_view.simulated.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/callbacks */ "./node_modules/devextreme/esm/core/utils/callbacks.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _ui_scrollable_simulated__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui.scrollable.simulated */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.simulated.js");
/* harmony import */ var _load_indicator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../load_indicator */ "./node_modules/devextreme/esm/ui/load_indicator.js");
/**
 * DevExtreme (esm/ui/scroll_view/ui.scroll_view.simulated.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var math = Math;


var SCROLLVIEW_PULLDOWN_REFRESHING_CLASS = "dx-scrollview-pull-down-loading";
var SCROLLVIEW_PULLDOWN_READY_CLASS = "dx-scrollview-pull-down-ready";
var SCROLLVIEW_PULLDOWN_IMAGE_CLASS = "dx-scrollview-pull-down-image";
var SCROLLVIEW_PULLDOWN_INDICATOR_CLASS = "dx-scrollview-pull-down-indicator";
var SCROLLVIEW_PULLDOWN_TEXT_CLASS = "dx-scrollview-pull-down-text";
var SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS = "dx-scrollview-pull-down-text-visible";
var STATE_RELEASED = 0;
var STATE_READY = 1;
var STATE_REFRESHING = 2;
var STATE_LOADING = 3;
var ScrollViewScroller = _ui_scrollable_simulated__WEBPACK_IMPORTED_MODULE_6__["Scroller"].inherit({
    ctor: function() {
        this._topPocketSize = 0;
        this._bottomPocketSize = 0;
        this.callBase.apply(this, arguments);
        this._initCallbacks();
        this._releaseState()
    },
    _releaseState: function() {
        this._state = STATE_RELEASED;
        this._refreshPullDownText()
    },
    _refreshPullDownText: function() {
        var that = this;
        var pullDownTextItems = [{
            element: this._$pullingDownText,
            visibleState: STATE_RELEASED
        }, {
            element: this._$pulledDownText,
            visibleState: STATE_READY
        }, {
            element: this._$refreshingText,
            visibleState: STATE_REFRESHING
        }];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(pullDownTextItems, (function(_, item) {
            var action = that._state === item.visibleState ? "addClass" : "removeClass";
            item.element[action](SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS)
        }))
    },
    _initCallbacks: function() {
        this.pullDownCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])();
        this.releaseCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])();
        this.reachBottomCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])()
    },
    _updateBounds: function() {
        var considerPockets = "horizontal" !== this._direction;
        if (considerPockets) {
            this._topPocketSize = this._$topPocket.get(0).clientHeight;
            this._bottomPocketSize = this._$bottomPocket.get(0).clientHeight;
            var containerEl = this._$container.get(0);
            var contentEl = this._$content.get(0);
            var scrollTopMax = Math.max(contentEl.clientHeight - containerEl.clientHeight, 0);
            this._bottomBoundary = scrollTopMax - this._topPocketSize - this._bottomPocketSize
        }
        this.callBase()
    },
    _updateScrollbar: function() {
        this._scrollbar.option({
            containerSize: this._containerSize(),
            contentSize: this._contentSize() - this._topPocketSize - this._bottomPocketSize,
            scaleRatio: this._getScaleRatio()
        })
    },
    _moveContent: function() {
        this.callBase();
        if (this._isPullDown()) {
            this._pullDownReady()
        } else if (this._isReachBottom()) {
            this._reachBottomReady()
        } else if (this._state !== STATE_RELEASED) {
            this._stateReleased()
        }
    },
    _moveScrollbar: function() {
        this._scrollbar.moveTo(this._topPocketSize + this._location)
    },
    _isPullDown: function() {
        return this._pullDownEnabled && this._location >= 0
    },
    _isReachBottom: function() {
        var containerEl = this._$container.get(0);
        return this._reachBottomEnabled && Math.round(this._bottomBoundary - Math.ceil(containerEl.scrollTop)) <= 1
    },
    _scrollComplete: function() {
        if (this._inBounds() && this._state === STATE_READY) {
            this._pullDownRefreshing()
        } else if (this._inBounds() && this._state === STATE_LOADING) {
            this._reachBottomLoading()
        } else {
            this.callBase()
        }
    },
    _reachBottomReady: function() {
        if (this._state === STATE_LOADING) {
            return
        }
        this._state = STATE_LOADING;
        this._minOffset = this._getMinOffset()
    },
    _getMaxOffset: function() {
        return -this._topPocketSize
    },
    _getMinOffset: function() {
        return math.min(this.callBase(), -this._topPocketSize)
    },
    _reachBottomLoading: function() {
        this.reachBottomCallbacks.fire()
    },
    _pullDownReady: function() {
        if (this._state === STATE_READY) {
            return
        }
        this._state = STATE_READY;
        this._maxOffset = 0;
        this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
        this._refreshPullDownText()
    },
    _stateReleased: function() {
        if (this._state === STATE_RELEASED) {
            return
        }
        this._releaseState();
        this._updateBounds();
        this._$pullDown.removeClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS).removeClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
        this.releaseCallbacks.fire()
    },
    _pullDownRefreshing: function() {
        if (this._state === STATE_REFRESHING) {
            return
        }
        this._state = STATE_REFRESHING;
        this._$pullDown.addClass(SCROLLVIEW_PULLDOWN_REFRESHING_CLASS).removeClass(SCROLLVIEW_PULLDOWN_READY_CLASS);
        this._refreshPullDownText();
        this.pullDownCallbacks.fire()
    },
    _releaseHandler: function() {
        if (this._state === STATE_RELEASED) {
            this._moveToBounds()
        }
        this._update();
        if (this._releaseTask) {
            this._releaseTask.abort()
        }
        this._releaseTask = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["executeAsync"])(this._release.bind(this));
        return this._releaseTask.promise
    },
    _release: function() {
        this._stateReleased();
        this._scrollComplete()
    },
    _reachBottomEnablingHandler: function(enabled) {
        if (this._reachBottomEnabled === enabled) {
            return
        }
        this._reachBottomEnabled = enabled;
        this._updateBounds()
    },
    _pullDownEnablingHandler: function(enabled) {
        if (this._pullDownEnabled === enabled) {
            return
        }
        this._pullDownEnabled = enabled;
        this._considerTopPocketChange();
        this._updateHandler()
    },
    _considerTopPocketChange: function() {
        this._location -= Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this._$topPocket) || -this._topPocketSize;
        this._maxOffset = 0;
        this._move()
    },
    _pendingReleaseHandler: function() {
        this._state = STATE_READY
    },
    dispose: function() {
        if (this._releaseTask) {
            this._releaseTask.abort()
        }
        this.callBase()
    }
});
var SimulatedScrollViewStrategy = _ui_scrollable_simulated__WEBPACK_IMPORTED_MODULE_6__["SimulatedStrategy"].inherit({
    _init: function(scrollView) {
        this.callBase(scrollView);
        this._$pullDown = scrollView._$pullDown;
        this._$topPocket = scrollView._$topPocket;
        this._$bottomPocket = scrollView._$bottomPocket;
        this._initCallbacks()
    },
    _initCallbacks: function() {
        this.pullDownCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])();
        this.releaseCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])();
        this.reachBottomCallbacks = Object(_core_utils_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"])()
    },
    render: function() {
        this._renderPullDown();
        this.callBase()
    },
    _renderPullDown: function() {
        var $image = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(SCROLLVIEW_PULLDOWN_IMAGE_CLASS);
        var $loadContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(SCROLLVIEW_PULLDOWN_INDICATOR_CLASS);
        var $loadIndicator = new _load_indicator__WEBPACK_IMPORTED_MODULE_7__["default"](Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>")).$element();
        var $text = this._$pullDownText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(SCROLLVIEW_PULLDOWN_TEXT_CLASS);
        this._$pullingDownText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").text(this.option("pullingDownText")).appendTo($text);
        this._$pulledDownText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").text(this.option("pulledDownText")).appendTo($text);
        this._$refreshingText = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").text(this.option("refreshingText")).appendTo($text);
        this._$pullDown.empty().append($image).append($loadContainer.append($loadIndicator)).append($text)
    },
    pullDownEnable: function(enabled) {
        this._eventHandler("pullDownEnabling", enabled)
    },
    reachBottomEnable: function(enabled) {
        this._eventHandler("reachBottomEnabling", enabled)
    },
    _createScroller: function(direction) {
        var that = this;
        var scroller = that._scrollers[direction] = new ScrollViewScroller(that._scrollerOptions(direction));
        scroller.pullDownCallbacks.add((function() {
            that.pullDownCallbacks.fire()
        }));
        scroller.releaseCallbacks.add((function() {
            that.releaseCallbacks.fire()
        }));
        scroller.reachBottomCallbacks.add((function() {
            that.reachBottomCallbacks.fire()
        }))
    },
    _scrollerOptions: function(direction) {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])(this.callBase(direction), {
            $topPocket: this._$topPocket,
            $bottomPocket: this._$bottomPocket,
            $pullDown: this._$pullDown,
            $pullDownText: this._$pullDownText,
            $pullingDownText: this._$pullingDownText,
            $pulledDownText: this._$pulledDownText,
            $refreshingText: this._$refreshingText
        })
    },
    pendingRelease: function() {
        this._eventHandler("pendingRelease")
    },
    release: function() {
        return this._eventHandler("release").done(this._updateAction)
    },
    location: function() {
        var location = this.callBase();
        location.top += Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this._$topPocket);
        return location
    },
    dispose: function() {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this._scrollers, (function() {
            this.dispose()
        }));
        this.callBase()
    }
});
/* harmony default export */ __webpack_exports__["default"] = (SimulatedScrollViewStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.device.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.device.js ***!
  \****************************************************************************/
/*! exports provided: deviceDependentOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceDependentOptions", function() { return deviceDependentOptions; });
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_utils_support__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/support */ "./node_modules/devextreme/esm/core/utils/support.js");
/**
 * DevExtreme (esm/ui/scroll_view/ui.scrollable.device.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var deviceDependentOptions = function() {
    return [{
        device: function() {
            return !_core_utils_support__WEBPACK_IMPORTED_MODULE_1__["nativeScrolling"]
        },
        options: {
            useNative: false
        }
    }, {
        device: function(_device) {
            return !_core_devices__WEBPACK_IMPORTED_MODULE_0__["default"].isSimulator() && "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_0__["default"].real().deviceType && "generic" === _device.platform
        },
        options: {
            bounceEnabled: false,
            scrollByThumb: true,
            scrollByContent: _core_utils_support__WEBPACK_IMPORTED_MODULE_1__["touch"],
            showScrollbar: "onHover"
        }
    }]
};


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_support__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/support */ "./node_modules/devextreme/esm/core/utils/support.js");
/* harmony import */ var _core_utils_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/browser */ "./node_modules/devextreme/esm/core/utils/browser.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_dom_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/dom_component */ "./node_modules/devextreme/esm/core/dom_component.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../events/gesture/emitter.gesture.scroll */ "./node_modules/devextreme/esm/events/gesture/emitter.gesture.scroll.js");
/* harmony import */ var _ui_scrollable_simulated__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ui.scrollable.simulated */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.simulated.js");
/* harmony import */ var _ui_scrollable_native__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ui.scrollable.native */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.native.js");
/* harmony import */ var _ui_scrollable_device__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ui.scrollable.device */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.device.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _renovation_ui_scroll_view_utils_get_element_location_internal__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../renovation/ui/scroll_view/utils/get_element_location_internal */ "./node_modules/devextreme/esm/renovation/ui/scroll_view/utils/get_element_location_internal.js");
/**
 * DevExtreme (esm/ui/scroll_view/ui.scrollable.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




















var SCROLLABLE = "dxScrollable";
var SCROLLABLE_STRATEGY = "dxScrollableStrategy";
var SCROLLABLE_CLASS = "dx-scrollable";
var SCROLLABLE_DISABLED_CLASS = "dx-scrollable-disabled";
var SCROLLABLE_CONTAINER_CLASS = "dx-scrollable-container";
var SCROLLABLE_WRAPPER_CLASS = "dx-scrollable-wrapper";
var SCROLLABLE_CONTENT_CLASS = "dx-scrollable-content";
var VERTICAL = "vertical";
var HORIZONTAL = "horizontal";
var BOTH = "both";
var Scrollable = _core_dom_component__WEBPACK_IMPORTED_MODULE_12__["default"].inherit({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(this.callBase(), {
            disabled: false,
            onScroll: null,
            direction: VERTICAL,
            showScrollbar: "onScroll",
            useNative: true,
            bounceEnabled: true,
            scrollByContent: true,
            scrollByThumb: false,
            onUpdated: null,
            onStart: null,
            onEnd: null,
            onBounce: null,
            useSimulatedScrollbar: false,
            useKeyboard: true,
            inertiaEnabled: true,
            updateManually: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat(Object(_ui_scrollable_device__WEBPACK_IMPORTED_MODULE_17__["deviceDependentOptions"])(), [{
            device: function() {
                return _core_utils_support__WEBPACK_IMPORTED_MODULE_3__["nativeScrolling"] && "android" === _core_devices__WEBPACK_IMPORTED_MODULE_10__["default"].real().platform && !_core_utils_browser__WEBPACK_IMPORTED_MODULE_4__["default"].mozilla
            },
            options: {
                useSimulatedScrollbar: true
            }
        }])
    },
    _initOptions: function(options) {
        this.callBase(options);
        if (!("useSimulatedScrollbar" in options)) {
            this._setUseSimulatedScrollbar()
        }
    },
    _setUseSimulatedScrollbar: function() {
        if (!this.initialOption("useSimulatedScrollbar")) {
            this.option("useSimulatedScrollbar", !this.option("useNative"))
        }
    },
    _init: function() {
        this.callBase();
        this._initScrollableMarkup();
        this._locked = false
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this.update();
            this._updateRtlPosition();
            this._savedScrollOffset && this.scrollTo(this._savedScrollOffset);
            delete this._savedScrollOffset
        } else {
            this._savedScrollOffset = this.scrollOffset()
        }
    },
    _initScrollableMarkup: function() {
        var $element = this.$element().addClass(SCROLLABLE_CLASS);
        var $container = this._$container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(SCROLLABLE_CONTAINER_CLASS);
        var $wrapper = this._$wrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(SCROLLABLE_WRAPPER_CLASS);
        var $content = this._$content = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(SCROLLABLE_CONTENT_CLASS);
        $content.append($element.contents()).appendTo($container);
        $container.appendTo($wrapper);
        $wrapper.appendTo($element)
    },
    _dimensionChanged: function() {
        this.update();
        this._updateRtlPosition()
    },
    _initMarkup: function() {
        this.callBase();
        this._renderDirection()
    },
    _render: function() {
        this._renderStrategy();
        this._attachEventHandlers();
        this._renderDisabledState();
        this._createActions();
        this.update();
        this.callBase();
        this._updateRtlPosition(true)
    },
    _updateRtlPosition: function(needInitializeRtlConfig) {
        this._strategy.updateRtlPosition(needInitializeRtlConfig)
    },
    _getMaxOffset: function() {
        var {
            scrollWidth: scrollWidth,
            clientWidth: clientWidth,
            scrollHeight: scrollHeight,
            clientHeight: clientHeight
        } = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this.container()).get(0);
        return {
            left: scrollWidth - clientWidth,
            top: scrollHeight - clientHeight
        }
    },
    _attachEventHandlers: function() {
        var strategy = this._strategy;
        var initEventData = {
            getDirection: strategy.getDirection.bind(strategy),
            validate: this._validate.bind(this),
            isNative: this.option("useNative"),
            scrollTarget: this._$container
        };
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(this._$wrapper, "." + SCROLLABLE);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(this._$wrapper, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_14__["default"].init, SCROLLABLE), initEventData, this._initHandler.bind(this));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(this._$wrapper, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_14__["default"].start, SCROLLABLE), strategy.handleStart.bind(strategy));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(this._$wrapper, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_14__["default"].move, SCROLLABLE), strategy.handleMove.bind(strategy));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(this._$wrapper, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_14__["default"].end, SCROLLABLE), strategy.handleEnd.bind(strategy));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(this._$wrapper, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_14__["default"].cancel, SCROLLABLE), strategy.handleCancel.bind(strategy));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(this._$wrapper, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])(_events_gesture_emitter_gesture_scroll__WEBPACK_IMPORTED_MODULE_14__["default"].stop, SCROLLABLE), strategy.handleStop.bind(strategy));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(this._$container, "." + SCROLLABLE);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(this._$container, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])("scroll", SCROLLABLE), strategy.handleScroll.bind(strategy))
    },
    _validate: function(e) {
        if (this._isLocked()) {
            return false
        }
        this._updateIfNeed();
        return this._moveIsAllowed(e)
    },
    _moveIsAllowed(e) {
        return this._strategy.validate(e)
    },
    handleMove(e) {
        this._strategy.handleMove(e)
    },
    _prepareDirections(value) {
        this._strategy._prepareDirections(value)
    },
    _initHandler: function() {
        var strategy = this._strategy;
        strategy.handleInit.apply(strategy, arguments)
    },
    _renderDisabledState: function() {
        this.$element().toggleClass(SCROLLABLE_DISABLED_CLASS, this.option("disabled"));
        if (this.option("disabled")) {
            this._lock()
        } else {
            this._unlock()
        }
    },
    _renderDirection: function() {
        this.$element().removeClass("dx-scrollable-" + HORIZONTAL).removeClass("dx-scrollable-" + VERTICAL).removeClass("dx-scrollable-" + BOTH).addClass("dx-scrollable-" + this.option("direction"))
    },
    _renderStrategy: function() {
        this._createStrategy();
        this._strategy.render();
        this.$element().data(SCROLLABLE_STRATEGY, this._strategy)
    },
    _createStrategy: function() {
        this._strategy = this.option("useNative") ? new _ui_scrollable_native__WEBPACK_IMPORTED_MODULE_16__["default"](this) : new _ui_scrollable_simulated__WEBPACK_IMPORTED_MODULE_15__["SimulatedStrategy"](this)
    },
    _createActions: function() {
        this._strategy && this._strategy.createActions()
    },
    _clean: function() {
        this._strategy && this._strategy.dispose()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "onStart":
            case "onEnd":
            case "onUpdated":
            case "onScroll":
            case "onBounce":
                this._createActions();
                break;
            case "direction":
                this._resetInactiveDirection();
                this._invalidate();
                break;
            case "useNative":
                this._setUseSimulatedScrollbar();
                this._invalidate();
                break;
            case "inertiaEnabled":
            case "scrollByThumb":
            case "bounceEnabled":
            case "useKeyboard":
            case "showScrollbar":
            case "useSimulatedScrollbar":
                this._invalidate();
                break;
            case "disabled":
                this._renderDisabledState();
                this._strategy && this._strategy.disabledChanged();
                break;
            case "updateManually":
            case "scrollByContent":
                break;
            case "width":
                this.callBase(args);
                this._updateRtlPosition();
                break;
            default:
                this.callBase(args)
        }
    },
    _resetInactiveDirection: function() {
        var inactiveProp = this._getInactiveProp();
        if (!inactiveProp || !Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_9__["hasWindow"])()) {
            return
        }
        var scrollOffset = this.scrollOffset();
        scrollOffset[inactiveProp] = 0;
        this.scrollTo(scrollOffset)
    },
    _getInactiveProp: function() {
        var direction = this.option("direction");
        if (direction === VERTICAL) {
            return "left"
        }
        if (direction === HORIZONTAL) {
            return "top"
        }
    },
    _location: function() {
        return this._strategy.location()
    },
    _normalizeLocation: function(location) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isPlainObject"])(location)) {
            var left = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_5__["ensureDefined"])(location.left, location.x);
            var top = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_5__["ensureDefined"])(location.top, location.y);
            return {
                left: Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isDefined"])(left) ? -left : void 0,
                top: Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isDefined"])(top) ? -top : void 0
            }
        } else {
            var direction = this.option("direction");
            return {
                left: direction !== VERTICAL ? -location : void 0,
                top: direction !== HORIZONTAL ? -location : void 0
            }
        }
    },
    _isLocked: function() {
        return this._locked
    },
    _lock: function() {
        this._locked = true
    },
    _unlock: function() {
        if (!this.option("disabled")) {
            this._locked = false
        }
    },
    _isDirection: function(direction) {
        var current = this.option("direction");
        if (direction === VERTICAL) {
            return current !== HORIZONTAL
        }
        if (direction === HORIZONTAL) {
            return current !== VERTICAL
        }
        return current === direction
    },
    _updateAllowedDirection: function() {
        var allowedDirections = this._strategy._allowedDirections();
        if (this._isDirection(BOTH) && allowedDirections.vertical && allowedDirections.horizontal) {
            this._allowedDirectionValue = BOTH
        } else if (this._isDirection(HORIZONTAL) && allowedDirections.horizontal) {
            this._allowedDirectionValue = HORIZONTAL
        } else if (this._isDirection(VERTICAL) && allowedDirections.vertical) {
            this._allowedDirectionValue = VERTICAL
        } else {
            this._allowedDirectionValue = null
        }
    },
    _allowedDirection: function() {
        return this._allowedDirectionValue
    },
    $content: function() {
        return this._$content
    },
    content: function() {
        return Object(_core_element__WEBPACK_IMPORTED_MODULE_8__["getPublicElement"])(this._$content)
    },
    container: function() {
        return Object(_core_element__WEBPACK_IMPORTED_MODULE_8__["getPublicElement"])(this._$container)
    },
    scrollOffset: function() {
        return this._strategy._getScrollOffset()
    },
    _isRtlNativeStrategy: function() {
        var {
            useNative: useNative,
            rtlEnabled: rtlEnabled
        } = this.option();
        return useNative && rtlEnabled
    },
    scrollTop: function() {
        return this.scrollOffset().top
    },
    scrollLeft: function() {
        return this.scrollOffset().left
    },
    clientHeight: function() {
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this._$container)
    },
    scrollHeight: function() {
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])(this.$content())
    },
    clientWidth: function() {
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this._$container)
    },
    scrollWidth: function() {
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(this.$content())
    },
    update: function() {
        if (!this._strategy) {
            return
        }
        return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_18__["when"])(this._strategy.update()).done(function() {
            this._updateAllowedDirection()
        }.bind(this))
    },
    scrollBy: function(distance) {
        distance = this._normalizeLocation(distance);
        if (!distance.top && !distance.left) {
            return
        }
        this._updateIfNeed();
        this._strategy.scrollBy(distance)
    },
    scrollTo: function(targetLocation) {
        targetLocation = this._normalizeLocation(targetLocation);
        this._updateIfNeed();
        var location = this._location();
        if (!this.option("useNative")) {
            targetLocation = this._strategy._applyScaleRatio(targetLocation);
            location = this._strategy._applyScaleRatio(location)
        }
        if (this._isRtlNativeStrategy()) {
            location.left = location.left - this._getMaxOffset().left
        }
        var distance = this._normalizeLocation({
            left: location.left - Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_5__["ensureDefined"])(targetLocation.left, location.left),
            top: location.top - Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_5__["ensureDefined"])(targetLocation.top, location.top)
        });
        if (!distance.top && !distance.left) {
            return
        }
        this._strategy.scrollBy(distance)
    },
    scrollToElement: function(element, offset) {
        var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
        var elementInsideContent = this.$content().find(element).length;
        var elementIsInsideContent = $element.parents("." + SCROLLABLE_CLASS).length - $element.parents("." + SCROLLABLE_CONTENT_CLASS).length === 0;
        if (!elementInsideContent || !elementIsInsideContent) {
            return
        }
        var scrollPosition = {
            top: 0,
            left: 0
        };
        var direction = this.option("direction");
        if (direction !== VERTICAL) {
            scrollPosition.left = this.getScrollElementPosition($element, HORIZONTAL, offset)
        }
        if (direction !== HORIZONTAL) {
            scrollPosition.top = this.getScrollElementPosition($element, VERTICAL, offset)
        }
        this.scrollTo(scrollPosition)
    },
    getScrollElementPosition: function($element, direction, offset) {
        var scrollOffset = this.scrollOffset();
        return Object(_renovation_ui_scroll_view_utils_get_element_location_internal__WEBPACK_IMPORTED_MODULE_19__["getElementLocationInternal"])($element.get(0), direction, Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this.container()).get(0), scrollOffset, offset)
    },
    _updateIfNeed: function() {
        if (!this.option("updateManually")) {
            this.update()
        }
    },
    _useTemplates: function() {
        return false
    },
    isRenovated: function() {
        return !!Scrollable.IS_RENOVATED_WIDGET
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_11__["default"])(SCROLLABLE, Scrollable);
/* harmony default export */ __webpack_exports__["default"] = (Scrollable);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.native.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.native.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _ui_scrollbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui.scrollbar */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollbar.js");
/**
 * DevExtreme (esm/ui/scroll_view/ui.scrollable.native.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









var SCROLLABLE_NATIVE = "dxNativeScrollable";
var SCROLLABLE_NATIVE_CLASS = "dx-scrollable-native";
var SCROLLABLE_SCROLLBAR_SIMULATED = "dx-scrollable-scrollbar-simulated";
var SCROLLABLE_SCROLLBARS_HIDDEN = "dx-scrollable-scrollbars-hidden";
var VERTICAL = "vertical";
var HORIZONTAL = "horizontal";
var HIDE_SCROLLBAR_TIMEOUT = 500;
var NativeStrategy = _core_class__WEBPACK_IMPORTED_MODULE_7__["default"].inherit({
    ctor: function(scrollable) {
        this._init(scrollable)
    },
    _init: function(scrollable) {
        this._component = scrollable;
        this._$element = scrollable.$element();
        this._$container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollable.container());
        this._$content = scrollable.$content();
        this._direction = scrollable.option("direction");
        this._useSimulatedScrollbar = scrollable.option("useSimulatedScrollbar");
        this.option = scrollable.option.bind(scrollable);
        this._createActionByOption = scrollable._createActionByOption.bind(scrollable);
        this._isLocked = scrollable._isLocked.bind(scrollable);
        this._isDirection = scrollable._isDirection.bind(scrollable);
        this._allowedDirection = scrollable._allowedDirection.bind(scrollable);
        this._getMaxOffset = scrollable._getMaxOffset.bind(scrollable);
        this._isRtlNativeStrategy = scrollable._isRtlNativeStrategy.bind(scrollable)
    },
    render: function() {
        var device = _core_devices__WEBPACK_IMPORTED_MODULE_6__["default"].real();
        var deviceType = device.platform;
        this._$element.addClass(SCROLLABLE_NATIVE_CLASS).addClass(SCROLLABLE_NATIVE_CLASS + "-" + deviceType).toggleClass(SCROLLABLE_SCROLLBARS_HIDDEN, !this._isScrollbarVisible());
        if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
            this._renderScrollbars()
        }
    },
    updateRtlPosition: function(isFirstRender) {
        if (isFirstRender && this.option("rtlEnabled")) {
            if (this._isScrollbarVisible() && this._useSimulatedScrollbar) {
                this._moveScrollbars()
            }
        }
    },
    _renderScrollbars: function() {
        this._scrollbars = {};
        this._hideScrollbarTimeout = 0;
        this._$element.addClass(SCROLLABLE_SCROLLBAR_SIMULATED);
        this._renderScrollbar(VERTICAL);
        this._renderScrollbar(HORIZONTAL)
    },
    _renderScrollbar: function(direction) {
        if (!this._isDirection(direction)) {
            return
        }
        this._scrollbars[direction] = new _ui_scrollbar__WEBPACK_IMPORTED_MODULE_8__["default"](Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo(this._$element), {
            direction: direction,
            expandable: this._component.option("scrollByThumb")
        })
    },
    handleInit: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    handleStart: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    handleMove: function(e) {
        if (this._isLocked()) {
            e.cancel = true;
            return
        }
        if (this._allowedDirection()) {
            e.originalEvent.isScrollingEvent = true
        }
    },
    handleEnd: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    handleCancel: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    handleStop: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    _eachScrollbar: function(callback) {
        callback = callback.bind(this);
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(this._scrollbars || {}, (function(direction, scrollbar) {
            callback(scrollbar, direction)
        }))
    },
    createActions: function() {
        this._scrollAction = this._createActionByOption("onScroll");
        this._updateAction = this._createActionByOption("onUpdated")
    },
    _createActionArgs: function() {
        var {
            left: left,
            top: top
        } = this.location();
        return {
            event: this._eventForUserAction,
            scrollOffset: this._getScrollOffset(),
            reachedLeft: this._isRtlNativeStrategy() ? this._isReachedRight(-left) : this._isReachedLeft(left),
            reachedRight: this._isRtlNativeStrategy() ? this._isReachedLeft(-Math.abs(left)) : this._isReachedRight(left),
            reachedTop: this._isDirection(VERTICAL) ? Math.round(top) >= 0 : void 0,
            reachedBottom: this._isDirection(VERTICAL) ? Math.round(Math.abs(top) - this._getMaxOffset().top) >= 0 : void 0
        }
    },
    _getScrollOffset: function() {
        var {
            top: top,
            left: left
        } = this.location();
        return {
            top: -top,
            left: this._normalizeOffsetLeft(-left)
        }
    },
    _normalizeOffsetLeft(scrollLeft) {
        if (this._isRtlNativeStrategy()) {
            return this._getMaxOffset().left + scrollLeft
        }
        return scrollLeft
    },
    _isReachedLeft: function(left) {
        return this._isDirection(HORIZONTAL) ? Math.round(left) >= 0 : void 0
    },
    _isReachedRight: function(left) {
        return this._isDirection(HORIZONTAL) ? Math.round(Math.abs(left) - this._getMaxOffset().left) >= 0 : void 0
    },
    _isScrollbarVisible: function() {
        var {
            showScrollbar: showScrollbar
        } = this.option();
        return "never" !== showScrollbar && false !== showScrollbar
    },
    handleScroll: function(e) {
        this._eventForUserAction = e;
        this._moveScrollbars();
        this._scrollAction(this._createActionArgs())
    },
    _moveScrollbars: function() {
        var {
            top: top,
            left: left
        } = this._getScrollOffset();
        this._eachScrollbar((function(scrollbar) {
            scrollbar.moveTo({
                top: -top,
                left: -left
            });
            scrollbar.option("visible", true)
        }));
        this._hideScrollbars()
    },
    _hideScrollbars: function() {
        clearTimeout(this._hideScrollbarTimeout);
        this._hideScrollbarTimeout = setTimeout(function() {
            this._eachScrollbar((function(scrollbar) {
                scrollbar.option("visible", false)
            }))
        }.bind(this), HIDE_SCROLLBAR_TIMEOUT)
    },
    location: function() {
        return {
            left: -this._$container.scrollLeft(),
            top: -this._$container.scrollTop()
        }
    },
    disabledChanged: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    update: function() {
        this._update();
        this._updateAction(this._createActionArgs())
    },
    _update: function() {
        this._updateDimensions();
        this._updateScrollbars()
    },
    _updateDimensions: function() {
        this._containerSize = {
            height: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this._$container),
            width: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this._$container)
        };
        this._componentContentSize = {
            height: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this._component.$content()),
            width: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this._component.$content())
        };
        this._contentSize = {
            height: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this._$content),
            width: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this._$content)
        }
    },
    _updateScrollbars: function() {
        this._eachScrollbar((function(scrollbar, direction) {
            var dimension = direction === VERTICAL ? "height" : "width";
            scrollbar.option({
                containerSize: this._containerSize[dimension],
                contentSize: this._componentContentSize[dimension]
            });
            scrollbar.update()
        }))
    },
    _allowedDirections: function() {
        return {
            vertical: this._isDirection(VERTICAL) && this._contentSize.height > this._containerSize.height,
            horizontal: this._isDirection(HORIZONTAL) && this._contentSize.width > this._containerSize.width
        }
    },
    dispose: function() {
        var className = this._$element.get(0).className;
        var scrollableNativeRegexp = new RegExp(SCROLLABLE_NATIVE_CLASS + "\\S*", "g");
        if (scrollableNativeRegexp.test(className)) {
            this._$element.removeClass(className.match(scrollableNativeRegexp).join(" "))
        }
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(this._$element, "." + SCROLLABLE_NATIVE);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(this._$container, "." + SCROLLABLE_NATIVE);
        this._removeScrollbars();
        clearTimeout(this._hideScrollbarTimeout)
    },
    _removeScrollbars: function() {
        this._eachScrollbar((function(scrollbar) {
            scrollbar.$element().remove()
        }))
    },
    scrollBy: function(distance) {
        var location = this.location();
        this._$container.scrollTop(Math.round(-location.top - distance.top));
        this._$container.scrollLeft(Math.round(-location.left - distance.left))
    },
    validate: function(e) {
        if (this.option("disabled")) {
            return false
        }
        if (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_3__["isDxMouseWheelEvent"])(e) && this._isScrolledInMaxDirection(e)) {
            return false
        }
        return !!this._allowedDirection()
    },
    _isScrolledInMaxDirection(e) {
        var container = this._$container.get(0);
        var result;
        if (e.delta > 0) {
            result = e.shiftKey ? !container.scrollLeft : !container.scrollTop
        } else if (e.shiftKey) {
            result = container.scrollLeft >= this._getMaxOffset().left
        } else {
            result = container.scrollTop >= this._getMaxOffset().top
        }
        return result
    },
    getDirection: function() {
        return this._allowedDirection()
    }
});
/* harmony default export */ __webpack_exports__["default"] = (NativeStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.simulated.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.simulated.js ***!
  \*******************************************************************************/
/*! exports provided: Scroller, SimulatedStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scroller", function() { return Scroller; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimulatedStrategy", function() { return SimulatedStrategy; });
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_inflector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/inflector */ "./node_modules/devextreme/esm/core/utils/inflector.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/position */ "./node_modules/devextreme/esm/core/utils/position.js");
/* harmony import */ var _animation_translator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../animation/translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./animator */ "./node_modules/devextreme/esm/ui/scroll_view/animator.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _ui_scrollbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ui.scrollbar */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollbar.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/ui/scroll_view/ui.scrollable.simulated.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

















var SCROLLABLE_SIMULATED = "dxSimulatedScrollable";
var SCROLLABLE_STRATEGY = "dxScrollableStrategy";
var SCROLLABLE_SIMULATED_CURSOR = SCROLLABLE_SIMULATED + "Cursor";
var SCROLLABLE_SIMULATED_KEYBOARD = SCROLLABLE_SIMULATED + "Keyboard";
var SCROLLABLE_SIMULATED_CLASS = "dx-scrollable-simulated";
var SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE = "dx-scrollable-scrollbars-alwaysvisible";
var SCROLLABLE_SCROLLBAR_CLASS = "dx-scrollable-scrollbar";
var VERTICAL = "vertical";
var HORIZONTAL = "horizontal";
var ACCELERATION = .92;
var OUT_BOUNDS_ACCELERATION = .5;
var MIN_VELOCITY_LIMIT = 1;
var FRAME_DURATION = Math.round(1e3 / 60);
var SCROLL_LINE_HEIGHT = 40;
var VALIDATE_WHEEL_TIMEOUT = 500;
var BOUNCE_MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT / 5;
var BOUNCE_DURATION = 400;
var BOUNCE_FRAMES = BOUNCE_DURATION / FRAME_DURATION;
var BOUNCE_ACCELERATION_SUM = (1 - Math.pow(ACCELERATION, BOUNCE_FRAMES)) / (1 - ACCELERATION);
var KEY_CODES = {
    PAGE_UP: "pageUp",
    PAGE_DOWN: "pageDown",
    END: "end",
    HOME: "home",
    LEFT: "leftArrow",
    UP: "upArrow",
    RIGHT: "rightArrow",
    DOWN: "downArrow",
    TAB: "tab"
};
var InertiaAnimator = _animator__WEBPACK_IMPORTED_MODULE_12__["default"].inherit({
    ctor: function(scroller) {
        this.callBase();
        this.scroller = scroller
    },
    VELOCITY_LIMIT: MIN_VELOCITY_LIMIT,
    _isFinished: function() {
        return Math.abs(this.scroller._velocity) <= this.VELOCITY_LIMIT
    },
    _step: function() {
        this.scroller._scrollStep(this.scroller._velocity);
        this.scroller._velocity *= this._acceleration()
    },
    _acceleration: function() {
        return this.scroller._inBounds() ? ACCELERATION : OUT_BOUNDS_ACCELERATION
    },
    _complete: function() {
        this.scroller._scrollComplete()
    }
});
var BounceAnimator = InertiaAnimator.inherit({
    VELOCITY_LIMIT: BOUNCE_MIN_VELOCITY_LIMIT,
    _isFinished: function() {
        return this.scroller._crossBoundOnNextStep() || this.callBase()
    },
    _acceleration: function() {
        return ACCELERATION
    },
    _complete: function() {
        this.scroller._move(this.scroller._bounceLocation);
        this.callBase()
    }
});
var Scroller = _core_class__WEBPACK_IMPORTED_MODULE_11__["default"].inherit({
    ctor: function(options) {
        this._initOptions(options);
        this._initAnimators();
        this._initScrollbar()
    },
    _initOptions: function(options) {
        this._location = 0;
        this._topReached = false;
        this._bottomReached = false;
        this._axis = options.direction === HORIZONTAL ? "x" : "y";
        this._prop = options.direction === HORIZONTAL ? "left" : "top";
        this._dimension = options.direction === HORIZONTAL ? "width" : "height";
        this._scrollProp = options.direction === HORIZONTAL ? "scrollLeft" : "scrollTop";
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(options, (optionName, optionValue) => {
            this["_" + optionName] = optionValue
        })
    },
    _initAnimators: function() {
        this._inertiaAnimator = new InertiaAnimator(this);
        this._bounceAnimator = new BounceAnimator(this)
    },
    _initScrollbar: function() {
        this._scrollbar = new _ui_scrollbar__WEBPACK_IMPORTED_MODULE_15__["default"](Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo(this._$container), {
            direction: this._direction,
            visible: this._scrollByThumb,
            visibilityMode: this._visibilityModeNormalize(this._scrollbarVisible),
            expandable: this._scrollByThumb
        });
        this._$scrollbar = this._scrollbar.$element()
    },
    _visibilityModeNormalize: function(mode) {
        return true === mode ? "onScroll" : false === mode ? "never" : mode
    },
    _scrollStep: function(delta) {
        var prevLocation = this._location;
        this._location += delta;
        this._suppressBounce();
        this._move();
        if (Math.abs(prevLocation - this._location) < 1) {
            return
        }
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].triggerHandler(this._$container, {
            type: "scroll"
        })
    },
    _suppressBounce: function() {
        if (this._bounceEnabled || this._inBounds(this._location)) {
            return
        }
        this._velocity = 0;
        this._location = this._boundLocation()
    },
    _boundLocation: function(location) {
        location = void 0 !== location ? location : this._location;
        return Math.max(Math.min(location, this._maxOffset), this._minOffset)
    },
    _move: function(location) {
        this._location = void 0 !== location ? location * this._getScaleRatio() : this._location;
        this._moveContent();
        this._moveScrollbar()
    },
    _moveContent: function() {
        var location = this._location;
        this._$container[this._scrollProp](-location / this._getScaleRatio());
        this._moveContentByTranslator(location)
    },
    _getScaleRatio: function() {
        if (Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_6__["hasWindow"])() && !this._scaleRatio) {
            var element = this._$element.get(0);
            var realDimension = this._getRealDimension(element, this._dimension);
            var baseDimension = this._getBaseDimension(element, this._dimension);
            this._scaleRatio = Math.round(realDimension / baseDimension * 100) / 100
        }
        return this._scaleRatio || 1
    },
    _getRealDimension: function(element, dimension) {
        return Math.round(Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_9__["getBoundingRect"])(element)[dimension])
    },
    _getBaseDimension: function(element, dimension) {
        var dimensionName = "offset" + Object(_core_utils_inflector__WEBPACK_IMPORTED_MODULE_4__["titleize"])(dimension);
        return element[dimensionName]
    },
    _moveContentByTranslator: function(location) {
        var translateOffset;
        var minOffset = -this._maxScrollPropValue;
        if (location > 0) {
            translateOffset = location
        } else if (location <= minOffset) {
            translateOffset = location - minOffset
        } else {
            translateOffset = location % 1
        }
        if (this._translateOffset === translateOffset) {
            return
        }
        var targetLocation = {};
        targetLocation[this._prop] = translateOffset;
        this._translateOffset = translateOffset;
        if (0 === translateOffset) {
            Object(_animation_translator__WEBPACK_IMPORTED_MODULE_10__["resetPosition"])(this._$content);
            return
        }
        Object(_animation_translator__WEBPACK_IMPORTED_MODULE_10__["move"])(this._$content, targetLocation)
    },
    _moveScrollbar: function() {
        this._scrollbar.moveTo(this._location)
    },
    _scrollComplete: function() {
        if (this._inBounds()) {
            this._hideScrollbar();
            if (this._completeDeferred) {
                this._completeDeferred.resolve()
            }
        }
        this._scrollToBounds()
    },
    _scrollToBounds: function() {
        if (this._inBounds()) {
            return
        }
        this._bounceAction();
        this._setupBounce();
        this._bounceAnimator.start()
    },
    _setupBounce: function() {
        var boundLocation = this._bounceLocation = this._boundLocation();
        var bounceDistance = boundLocation - this._location;
        this._velocity = bounceDistance / BOUNCE_ACCELERATION_SUM
    },
    _inBounds: function(location) {
        location = void 0 !== location ? location : this._location;
        return this._boundLocation(location) === location
    },
    _crossBoundOnNextStep: function() {
        var location = this._location;
        var nextLocation = location + this._velocity;
        return location < this._minOffset && nextLocation >= this._minOffset || location > this._maxOffset && nextLocation <= this._maxOffset
    },
    _initHandler: function(e) {
        this._stopScrolling();
        this._prepareThumbScrolling(e)
    },
    _stopScrolling: Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferRenderer"])((function() {
        this._hideScrollbar();
        this._inertiaAnimator.stop();
        this._bounceAnimator.stop()
    })),
    _prepareThumbScrolling: function(e) {
        if (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["isDxMouseWheelEvent"])(e.originalEvent)) {
            return
        }
        var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.originalEvent.target);
        var scrollbarClicked = this._isScrollbar($target);
        if (scrollbarClicked) {
            this._moveToMouseLocation(e)
        }
        this._thumbScrolling = scrollbarClicked || this._isThumb($target);
        this._crossThumbScrolling = !this._thumbScrolling && this._isAnyThumbScrolling($target);
        if (this._thumbScrolling) {
            this._scrollbar.feedbackOn()
        }
    },
    _isThumbScrollingHandler: function($target) {
        return this._isThumb($target)
    },
    _moveToMouseLocation: function(e) {
        var mouseLocation = e["page" + this._axis.toUpperCase()] - this._$element.offset()[this._prop];
        var location = this._location + mouseLocation / this._containerToContentRatio() - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this._$container) / 2;
        this._scrollStep(-Math.round(location))
    },
    _startHandler: function() {
        this._showScrollbar()
    },
    _moveHandler: function(delta) {
        if (this._crossThumbScrolling) {
            return
        }
        if (this._thumbScrolling) {
            delta[this._axis] = -Math.round(delta[this._axis] / this._containerToContentRatio())
        }
        this._scrollBy(delta)
    },
    _scrollBy: function(delta) {
        delta = delta[this._axis];
        if (!this._inBounds()) {
            delta *= OUT_BOUNDS_ACCELERATION
        }
        this._scrollStep(delta)
    },
    _scrollByHandler: function(delta) {
        this._scrollBy(delta);
        this._scrollComplete()
    },
    _containerToContentRatio: function() {
        return this._scrollbar.containerToContentRatio()
    },
    _endHandler: function(velocity) {
        this._completeDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_16__["Deferred"];
        this._velocity = velocity[this._axis];
        this._inertiaHandler();
        this._resetThumbScrolling();
        return this._completeDeferred.promise()
    },
    _inertiaHandler: function() {
        this._suppressInertia();
        this._inertiaAnimator.start()
    },
    _suppressInertia: function() {
        if (!this._inertiaEnabled || this._thumbScrolling) {
            this._velocity = 0
        }
    },
    _resetThumbScrolling: function() {
        this._thumbScrolling = false;
        this._crossThumbScrolling = false
    },
    _stopHandler: function() {
        if (this._thumbScrolling) {
            this._scrollComplete()
        }
        this._resetThumbScrolling();
        this._scrollToBounds()
    },
    _disposeHandler: function() {
        this._stopScrolling();
        this._$scrollbar.remove()
    },
    _updateHandler: function() {
        this._update();
        this._moveToBounds()
    },
    _update: function() {
        this._stopScrolling();
        return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferUpdate"])(() => {
            this._resetScaleRatio();
            this._updateLocation();
            this._updateBounds();
            this._updateScrollbar();
            Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferRender"])(() => {
                this._moveScrollbar();
                this._scrollbar.update()
            })
        })
    },
    _resetScaleRatio: function() {
        this._scaleRatio = null
    },
    _updateLocation: function() {
        this._location = (Object(_animation_translator__WEBPACK_IMPORTED_MODULE_10__["locate"])(this._$content)[this._prop] - this._$container[this._scrollProp]()) * this._getScaleRatio()
    },
    _updateBounds: function() {
        this._maxOffset = this._getMaxOffset();
        this._minOffset = this._getMinOffset()
    },
    _getMaxOffset: function() {
        return 0
    },
    _getMinOffset: function() {
        this._maxScrollPropValue = Math.max(this._contentSize() - this._containerSize(), 0);
        return -this._maxScrollPropValue
    },
    _updateScrollbar: Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferUpdater"])((function() {
        var containerSize = this._containerSize();
        var contentSize = this._contentSize();
        var baseContainerSize = this._getBaseDimension(this._$container.get(0), this._dimension);
        var baseContentSize = this._getBaseDimension(this._$content.get(0), this._dimension);
        Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferRender"])(() => {
            this._scrollbar.option({
                containerSize: containerSize,
                contentSize: contentSize,
                baseContainerSize: baseContainerSize,
                baseContentSize: baseContentSize,
                scaleRatio: this._getScaleRatio()
            })
        })
    })),
    _moveToBounds: Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferRenderer"])(Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferUpdater"])(Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferRenderer"])((function() {
        var location = this._boundLocation();
        var locationChanged = location !== this._location;
        this._location = location;
        this._move();
        if (locationChanged) {
            this._scrollAction()
        }
    })))),
    _createActionsHandler: function(actions) {
        this._scrollAction = actions.scroll;
        this._bounceAction = actions.bounce
    },
    _showScrollbar: function() {
        this._scrollbar.option("visible", true)
    },
    _hideScrollbar: function() {
        this._scrollbar.option("visible", false)
    },
    _containerSize: function() {
        return this._getRealDimension(this._$container.get(0), this._dimension)
    },
    _contentSize: function() {
        var isOverflowHidden = "hidden" === this._$content.css("overflow" + this._axis.toUpperCase());
        var contentSize = this._getRealDimension(this._$content.get(0), this._dimension);
        if (!isOverflowHidden) {
            var containerScrollSize = this._$content[0]["scroll" + Object(_core_utils_inflector__WEBPACK_IMPORTED_MODULE_4__["titleize"])(this._dimension)] * this._getScaleRatio();
            contentSize = Math.max(containerScrollSize, contentSize)
        }
        return contentSize
    },
    _validateEvent: function(e) {
        var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.originalEvent.target);
        return this._isThumb($target) || this._isScrollbar($target)
    },
    _isThumb: function($element) {
        return this._scrollByThumb && this._scrollbar.isThumb($element)
    },
    _isScrollbar: function($element) {
        return this._scrollByThumb && $element && $element.is(this._$scrollbar)
    },
    _reachedMin: function() {
        return Math.round(this._location - this._minOffset) <= 0
    },
    _reachedMax: function() {
        return Math.round(this._location - this._maxOffset) >= 0
    },
    _cursorEnterHandler: function() {
        this._resetScaleRatio();
        this._updateScrollbar();
        this._scrollbar.cursorEnter()
    },
    _cursorLeaveHandler: function() {
        this._scrollbar.cursorLeave()
    },
    dispose: _core_utils_common__WEBPACK_IMPORTED_MODULE_14__["noop"]
});
var hoveredScrollable;
var activeScrollable;
var SimulatedStrategy = _core_class__WEBPACK_IMPORTED_MODULE_11__["default"].inherit({
    ctor: function(scrollable) {
        this._init(scrollable)
    },
    _init: function(scrollable) {
        this._component = scrollable;
        this._$element = scrollable.$element();
        this._$container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollable.container());
        this._$wrapper = scrollable._$wrapper;
        this._$content = scrollable.$content();
        this.option = scrollable.option.bind(scrollable);
        this._createActionByOption = scrollable._createActionByOption.bind(scrollable);
        this._isLocked = scrollable._isLocked.bind(scrollable);
        this._isDirection = scrollable._isDirection.bind(scrollable);
        this._allowedDirection = scrollable._allowedDirection.bind(scrollable);
        this._getMaxOffset = scrollable._getMaxOffset.bind(scrollable)
    },
    render: function() {
        this._$element.addClass(SCROLLABLE_SIMULATED_CLASS);
        this._createScrollers();
        if (this.option("useKeyboard")) {
            this._$container.prop("tabIndex", 0)
        }
        this._attachKeyboardHandler();
        this._attachCursorHandlers()
    },
    _createScrollers: function() {
        this._scrollers = {};
        if (this._isDirection(HORIZONTAL)) {
            this._createScroller(HORIZONTAL)
        }
        if (this._isDirection(VERTICAL)) {
            this._createScroller(VERTICAL)
        }
        this._$element.toggleClass(SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE, "always" === this.option("showScrollbar"))
    },
    _createScroller: function(direction) {
        this._scrollers[direction] = new Scroller(this._scrollerOptions(direction))
    },
    _scrollerOptions: function(direction) {
        return {
            direction: direction,
            $content: this._$content,
            $container: this._$container,
            $wrapper: this._$wrapper,
            $element: this._$element,
            scrollByThumb: this.option("scrollByThumb"),
            scrollbarVisible: this.option("showScrollbar"),
            bounceEnabled: this.option("bounceEnabled"),
            inertiaEnabled: this.option("inertiaEnabled"),
            isAnyThumbScrolling: this._isAnyThumbScrolling.bind(this)
        }
    },
    _applyScaleRatio: function(targetLocation) {
        for (var direction in this._scrollers) {
            var prop = this._getPropByDirection(direction);
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isDefined"])(targetLocation[prop])) {
                var scroller = this._scrollers[direction];
                targetLocation[prop] *= scroller._getScaleRatio()
            }
        }
        return targetLocation
    },
    _isAnyThumbScrolling: function($target) {
        var result = false;
        this._eventHandler("isThumbScrolling", $target).done((function(isThumbScrollingVertical, isThumbScrollingHorizontal) {
            result = isThumbScrollingVertical || isThumbScrollingHorizontal
        }));
        return result
    },
    handleInit: function(e) {
        this._suppressDirections(e);
        this._eventForUserAction = e;
        this._eventHandler("init", e)
    },
    _suppressDirections: function(e) {
        if (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["isDxMouseWheelEvent"])(e.originalEvent)) {
            this._prepareDirections(true);
            return
        }
        this._prepareDirections();
        this._eachScroller((function(scroller, direction) {
            var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.originalEvent.target);
            var isValid = scroller._validateEvent(e) || this.option("scrollByContent") && this._isContent($target);
            this._validDirections[direction] = isValid
        }))
    },
    _isContent: function($element) {
        return !!$element.closest(this._$element).length
    },
    _prepareDirections: function(value) {
        value = value || false;
        this._validDirections = {};
        this._validDirections[HORIZONTAL] = value;
        this._validDirections[VERTICAL] = value
    },
    _eachScroller: function(callback) {
        callback = callback.bind(this);
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(this._scrollers, (function(direction, scroller) {
            callback(scroller, direction)
        }))
    },
    handleStart: function(e) {
        this._eventForUserAction = e;
        this._eventHandler("start").done(this._startAction)
    },
    _saveActive: function() {
        activeScrollable = this
    },
    _resetActive: function() {
        if (activeScrollable === this) {
            activeScrollable = null
        }
    },
    handleMove: function(e) {
        if (this._isLocked()) {
            e.cancel = true;
            this._resetActive();
            return
        }
        this._saveActive();
        e.preventDefault && e.preventDefault();
        this._adjustDistance(e, e.delta);
        this._eventForUserAction = e;
        this._eventHandler("move", e.delta)
    },
    _adjustDistance: function(e, distance) {
        distance.x *= this._validDirections[HORIZONTAL];
        distance.y *= this._validDirections[VERTICAL];
        var devicePixelRatio = this._tryGetDevicePixelRatio();
        if (devicePixelRatio && Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["isDxMouseWheelEvent"])(e.originalEvent)) {
            distance.x = Math.round(distance.x / devicePixelRatio * 100) / 100;
            distance.y = Math.round(distance.y / devicePixelRatio * 100) / 100
        }
    },
    _tryGetDevicePixelRatio: function() {
        if (Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_6__["hasWindow"])()) {
            return Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_6__["getWindow"])().devicePixelRatio
        }
    },
    handleEnd: function(e) {
        this._resetActive();
        this._refreshCursorState(e.originalEvent && e.originalEvent.target);
        this._adjustDistance(e, e.velocity);
        this._eventForUserAction = e;
        return this._eventHandler("end", e.velocity).done(this._endAction)
    },
    handleCancel: function(e) {
        this._resetActive();
        this._eventForUserAction = e;
        return this._eventHandler("end", {
            x: 0,
            y: 0
        })
    },
    handleStop: function() {
        this._resetActive();
        this._eventHandler("stop")
    },
    handleScroll: function() {
        this._updateRtlConfig();
        this._scrollAction()
    },
    _attachKeyboardHandler: function() {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].off(this._$element, ".".concat(SCROLLABLE_SIMULATED_KEYBOARD));
        if (!this.option("disabled") && this.option("useKeyboard")) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].on(this._$element, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])("keydown", SCROLLABLE_SIMULATED_KEYBOARD), this._keyDownHandler.bind(this))
        }
    },
    _keyDownHandler: function(e) {
        clearTimeout(this._updateHandlerTimeout);
        this._updateHandlerTimeout = setTimeout(() => {
            if (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["normalizeKeyName"])(e) === KEY_CODES.TAB) {
                this._eachScroller(scroller => {
                    scroller._updateHandler()
                })
            }
        });
        if (!this._$container.is(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_2__["default"].getActiveElement())) {
            return
        }
        var handled = true;
        switch (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["normalizeKeyName"])(e)) {
            case KEY_CODES.DOWN:
                this._scrollByLine({
                    y: 1
                });
                break;
            case KEY_CODES.UP:
                this._scrollByLine({
                    y: -1
                });
                break;
            case KEY_CODES.RIGHT:
                this._scrollByLine({
                    x: 1
                });
                break;
            case KEY_CODES.LEFT:
                this._scrollByLine({
                    x: -1
                });
                break;
            case KEY_CODES.PAGE_DOWN:
                this._scrollByPage(1);
                break;
            case KEY_CODES.PAGE_UP:
                this._scrollByPage(-1);
                break;
            case KEY_CODES.HOME:
                this._scrollToHome();
                break;
            case KEY_CODES.END:
                this._scrollToEnd();
                break;
            default:
                handled = false
        }
        if (handled) {
            e.stopPropagation();
            e.preventDefault()
        }
    },
    _scrollByLine: function(lines) {
        var devicePixelRatio = this._tryGetDevicePixelRatio();
        var scrollOffset = SCROLL_LINE_HEIGHT;
        if (devicePixelRatio) {
            scrollOffset = Math.abs(scrollOffset / devicePixelRatio * 100) / 100
        }
        this.scrollBy({
            top: (lines.y || 0) * -scrollOffset,
            left: (lines.x || 0) * -scrollOffset
        })
    },
    _scrollByPage: function(page) {
        var prop = this._wheelProp();
        var dimension = this._dimensionByProp(prop);
        var distance = {};
        var getter = "width" === dimension ? _core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"] : _core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"];
        distance[prop] = page * -getter(this._$container);
        this.scrollBy(distance)
    },
    _dimensionByProp: function(prop) {
        return "left" === prop ? "width" : "height"
    },
    _getPropByDirection: function(direction) {
        return direction === HORIZONTAL ? "left" : "top"
    },
    _scrollToHome: function() {
        var prop = this._wheelProp();
        var distance = {};
        distance[prop] = 0;
        this._component.scrollTo(distance)
    },
    _scrollToEnd: function() {
        var prop = this._wheelProp();
        var dimension = this._dimensionByProp(prop);
        var distance = {};
        var getter = "width" === dimension ? _core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"] : _core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"];
        distance[prop] = getter(this._$content) - getter(this._$container);
        this._component.scrollTo(distance)
    },
    createActions: function() {
        this._startAction = this._createActionHandler("onStart");
        this._endAction = this._createActionHandler("onEnd");
        this._updateAction = this._createActionHandler("onUpdated");
        this._createScrollerActions()
    },
    _createScrollerActions: function() {
        this._scrollAction = this._createActionHandler("onScroll");
        this._bounceAction = this._createActionHandler("onBounce");
        this._eventHandler("createActions", {
            scroll: this._scrollAction,
            bounce: this._bounceAction
        })
    },
    _createActionHandler: function(optionName) {
        var actionHandler = this._createActionByOption(optionName);
        return () => {
            actionHandler(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])(this._createActionArgs(), arguments))
        }
    },
    _createActionArgs: function() {
        var {
            horizontal: scrollerX,
            vertical: scrollerY
        } = this._scrollers;
        var offset = this._getScrollOffset();
        this._scrollOffset = {
            top: scrollerY && offset.top,
            left: scrollerX && offset.left
        };
        return {
            event: this._eventForUserAction,
            scrollOffset: this._scrollOffset,
            reachedLeft: scrollerX && scrollerX._reachedMax(),
            reachedRight: scrollerX && scrollerX._reachedMin(),
            reachedTop: scrollerY && scrollerY._reachedMax(),
            reachedBottom: scrollerY && scrollerY._reachedMin()
        }
    },
    _getScrollOffset() {
        return {
            top: -this.location().top,
            left: -this.location().left
        }
    },
    _eventHandler: function(eventName) {
        var args = [].slice.call(arguments).slice(1);
        var deferreds = Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["map"])(this._scrollers, scroller => scroller["_" + eventName + "Handler"].apply(scroller, args));
        return _core_utils_deferred__WEBPACK_IMPORTED_MODULE_16__["when"].apply(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"], deferreds).promise()
    },
    location: function() {
        var location = Object(_animation_translator__WEBPACK_IMPORTED_MODULE_10__["locate"])(this._$content);
        location.top -= this._$container.scrollTop();
        location.left -= this._$container.scrollLeft();
        return location
    },
    disabledChanged: function() {
        this._attachCursorHandlers()
    },
    _attachCursorHandlers: function() {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].off(this._$element, ".".concat(SCROLLABLE_SIMULATED_CURSOR));
        if (!this.option("disabled") && this._isHoverMode()) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].on(this._$element, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])("mouseenter", SCROLLABLE_SIMULATED_CURSOR), this._cursorEnterHandler.bind(this));
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].on(this._$element, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["addNamespace"])("mouseleave", SCROLLABLE_SIMULATED_CURSOR), this._cursorLeaveHandler.bind(this))
        }
    },
    _isHoverMode: function() {
        return "onHover" === this.option("showScrollbar")
    },
    _cursorEnterHandler: function(e) {
        e = e || {};
        e.originalEvent = e.originalEvent || {};
        if (activeScrollable || e.originalEvent._hoverHandled) {
            return
        }
        if (hoveredScrollable) {
            hoveredScrollable._cursorLeaveHandler()
        }
        hoveredScrollable = this;
        this._eventHandler("cursorEnter");
        e.originalEvent._hoverHandled = true
    },
    _cursorLeaveHandler: function(e) {
        if (hoveredScrollable !== this || activeScrollable === hoveredScrollable) {
            return
        }
        this._eventHandler("cursorLeave");
        hoveredScrollable = null;
        this._refreshCursorState(e && e.relatedTarget)
    },
    _refreshCursorState: function(target) {
        if (!this._isHoverMode() && (!target || activeScrollable)) {
            return
        }
        var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(target);
        var $scrollable = $target.closest(".".concat(SCROLLABLE_SIMULATED_CLASS, ":not(.dx-state-disabled)"));
        var targetScrollable = $scrollable.length && $scrollable.data(SCROLLABLE_STRATEGY);
        if (hoveredScrollable && hoveredScrollable !== targetScrollable) {
            hoveredScrollable._cursorLeaveHandler()
        }
        if (targetScrollable) {
            targetScrollable._cursorEnterHandler()
        }
    },
    update: function() {
        var result = this._eventHandler("update").done(this._updateAction);
        return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_16__["when"])(result, Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferUpdate"])(() => {
            var allowedDirections = this._allowedDirections();
            Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferRender"])(() => {
                var touchDirection = allowedDirections.vertical ? "pan-x" : "";
                touchDirection = allowedDirections.horizontal ? "pan-y" : touchDirection;
                touchDirection = allowedDirections.vertical && allowedDirections.horizontal ? "none" : touchDirection;
                this._$container.css("touchAction", touchDirection)
            });
            return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_16__["when"])().promise()
        }))
    },
    _allowedDirections: function() {
        var bounceEnabled = this.option("bounceEnabled");
        var verticalScroller = this._scrollers[VERTICAL];
        var horizontalScroller = this._scrollers[HORIZONTAL];
        return {
            vertical: verticalScroller && (verticalScroller._minOffset < 0 || bounceEnabled),
            horizontal: horizontalScroller && (horizontalScroller._minOffset < 0 || bounceEnabled)
        }
    },
    _updateBounds: function() {
        this._scrollers[HORIZONTAL] && this._scrollers[HORIZONTAL]._updateBounds()
    },
    _isHorizontalAndRtlEnabled: function() {
        return this.option("rtlEnabled") && this.option("direction") !== VERTICAL
    },
    updateRtlPosition: function(needInitializeRtlConfig) {
        if (needInitializeRtlConfig) {
            this._rtlConfig = {
                scrollRight: 0,
                clientWidth: this._$container.get(0).clientWidth,
                windowPixelRatio: this._getWindowDevicePixelRatio()
            }
        }
        this._updateBounds();
        if (this._isHorizontalAndRtlEnabled()) {
            Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferUpdate"])(() => {
                var scrollLeft = this._getMaxOffset().left - this._rtlConfig.scrollRight;
                if (scrollLeft <= 0) {
                    scrollLeft = 0;
                    this._rtlConfig.scrollRight = this._getMaxOffset().left
                }
                Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_14__["deferRender"])(() => {
                    if (this._getScrollOffset().left !== scrollLeft) {
                        this._rtlConfig.skipUpdating = true;
                        this._component.scrollTo({
                            left: scrollLeft
                        });
                        this._rtlConfig.skipUpdating = false
                    }
                })
            })
        }
    },
    _updateRtlConfig: function() {
        if (this._isHorizontalAndRtlEnabled() && !this._rtlConfig.skipUpdating) {
            var {
                clientWidth: clientWidth,
                scrollLeft: scrollLeft
            } = this._$container.get(0);
            var windowPixelRatio = this._getWindowDevicePixelRatio();
            if (this._rtlConfig.windowPixelRatio === windowPixelRatio && this._rtlConfig.clientWidth === clientWidth) {
                this._rtlConfig.scrollRight = this._getMaxOffset().left - scrollLeft
            }
            this._rtlConfig.clientWidth = clientWidth;
            this._rtlConfig.windowPixelRatio = windowPixelRatio
        }
    },
    _getWindowDevicePixelRatio: function() {
        return Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_6__["hasWindow"])() ? Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_6__["getWindow"])().devicePixelRatio : 1
    },
    scrollBy: function(distance) {
        var verticalScroller = this._scrollers[VERTICAL];
        var horizontalScroller = this._scrollers[HORIZONTAL];
        if (verticalScroller) {
            distance.top = verticalScroller._boundLocation(distance.top + verticalScroller._location) - verticalScroller._location
        }
        if (horizontalScroller) {
            distance.left = horizontalScroller._boundLocation(distance.left + horizontalScroller._location) - horizontalScroller._location
        }
        this._prepareDirections(true);
        this._startAction();
        this._eventHandler("scrollBy", {
            x: distance.left,
            y: distance.top
        });
        this._endAction();
        this._updateRtlConfig()
    },
    validate: function(e) {
        if (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["isDxMouseWheelEvent"])(e) && Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["isCommandKeyPressed"])(e)) {
            return false
        }
        if (this.option("disabled")) {
            return false
        }
        if (this.option("bounceEnabled")) {
            return true
        }
        return Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["isDxMouseWheelEvent"])(e) ? this._validateWheel(e) : this._validateMove(e)
    },
    _validateWheel: function(e) {
        var scroller = this._scrollers[this._wheelDirection(e)];
        var reachedMin = scroller._reachedMin();
        var reachedMax = scroller._reachedMax();
        var contentGreaterThanContainer = !reachedMin || !reachedMax;
        var locatedNotAtBound = !reachedMin && !reachedMax;
        var scrollFromMin = reachedMin && e.delta > 0;
        var scrollFromMax = reachedMax && e.delta < 0;
        var validated = contentGreaterThanContainer && (locatedNotAtBound || scrollFromMin || scrollFromMax);
        validated = validated || void 0 !== this._validateWheelTimer;
        if (validated) {
            clearTimeout(this._validateWheelTimer);
            this._validateWheelTimer = setTimeout(() => {
                this._validateWheelTimer = void 0
            }, VALIDATE_WHEEL_TIMEOUT)
        }
        return validated
    },
    _validateMove: function(e) {
        if (!this.option("scrollByContent") && !Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target).closest(".".concat(SCROLLABLE_SCROLLBAR_CLASS)).length) {
            return false
        }
        return this._allowedDirection()
    },
    getDirection: function(e) {
        return Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_13__["isDxMouseWheelEvent"])(e) ? this._wheelDirection(e) : this._allowedDirection()
    },
    _wheelProp: function() {
        return this._wheelDirection() === HORIZONTAL ? "left" : "top"
    },
    _wheelDirection: function(e) {
        switch (this.option("direction")) {
            case HORIZONTAL:
                return HORIZONTAL;
            case VERTICAL:
                return VERTICAL;
            default:
                return e && e.shiftKey ? HORIZONTAL : VERTICAL
        }
    },
    dispose: function() {
        this._resetActive();
        if (hoveredScrollable === this) {
            hoveredScrollable = null
        }
        this._eventHandler("dispose");
        this._detachEventHandlers();
        this._$element.removeClass(SCROLLABLE_SIMULATED_CLASS);
        this._eventForUserAction = null;
        clearTimeout(this._validateWheelTimer);
        clearTimeout(this._updateHandlerTimeout)
    },
    _detachEventHandlers: function() {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].off(this._$element, ".".concat(SCROLLABLE_SIMULATED_CURSOR));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_3__["default"].off(this._$container, ".".concat(SCROLLABLE_SIMULATED_KEYBOARD))
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollbar.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/scroll_view/ui.scrollbar.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/ready_callbacks */ "./node_modules/devextreme/esm/core/utils/ready_callbacks.js");
/* harmony import */ var _animation_translator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../animation/translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../events/pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/**
 * DevExtreme (esm/ui/scroll_view/ui.scrollbar.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */











var SCROLLBAR = "dxScrollbar";
var SCROLLABLE_SCROLLBAR_CLASS = "dx-scrollable-scrollbar";
var SCROLLABLE_SCROLLBAR_ACTIVE_CLASS = "".concat(SCROLLABLE_SCROLLBAR_CLASS, "-active");
var SCROLLABLE_SCROLL_CLASS = "dx-scrollable-scroll";
var SCROLLABLE_SCROLL_CONTENT_CLASS = "dx-scrollable-scroll-content";
var HOVER_ENABLED_STATE = "dx-scrollbar-hoverable";
var HORIZONTAL = "horizontal";
var THUMB_MIN_SIZE = 15;
var SCROLLBAR_VISIBLE = {
    onScroll: "onScroll",
    onHover: "onHover",
    always: "always",
    never: "never"
};
var activeScrollbar = null;
var Scrollbar = _widget_ui_widget__WEBPACK_IMPORTED_MODULE_5__["default"].inherit({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this.callBase(), {
            direction: null,
            visible: false,
            activeStateEnabled: false,
            visibilityMode: SCROLLBAR_VISIBLE.onScroll,
            containerSize: 0,
            contentSize: 0,
            expandable: true,
            scaleRatio: 1
        })
    },
    _init: function() {
        this.callBase();
        this._isHovered = false
    },
    _initMarkup: function() {
        this._renderThumb();
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this._renderDirection();
        this._update();
        this._attachPointerDownHandler();
        this.option("hoverStateEnabled", this._isHoverMode());
        this.$element().toggleClass(HOVER_ENABLED_STATE, this.option("hoverStateEnabled"))
    },
    _renderThumb: function() {
        this._$thumb = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLABLE_SCROLL_CLASS);
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(SCROLLABLE_SCROLL_CONTENT_CLASS).appendTo(this._$thumb);
        this.$element().addClass(SCROLLABLE_SCROLLBAR_CLASS).append(this._$thumb)
    },
    isThumb: function($element) {
        return !!this.$element().find($element).length
    },
    _isHoverMode: function() {
        var visibilityMode = this.option("visibilityMode");
        return (visibilityMode === SCROLLBAR_VISIBLE.onHover || visibilityMode === SCROLLBAR_VISIBLE.always) && this.option("expandable")
    },
    _renderDirection: function() {
        var direction = this.option("direction");
        this.$element().addClass("dx-scrollbar-" + direction);
        this._dimension = direction === HORIZONTAL ? "width" : "height";
        this._prop = direction === HORIZONTAL ? "left" : "top"
    },
    _attachPointerDownHandler: function() {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(this._$thumb, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_6__["addNamespace"])(_events_pointer__WEBPACK_IMPORTED_MODULE_10__["default"].down, SCROLLBAR), this.feedbackOn.bind(this))
    },
    feedbackOn: function() {
        this.$element().addClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
        activeScrollbar = this
    },
    feedbackOff: function() {
        this.$element().removeClass(SCROLLABLE_SCROLLBAR_ACTIVE_CLASS);
        activeScrollbar = null
    },
    cursorEnter: function() {
        this._isHovered = true;
        if (this._needScrollbar()) {
            this.option("visible", true)
        }
    },
    cursorLeave: function() {
        this._isHovered = false;
        this.option("visible", false)
    },
    _renderDimensions: function() {
        this._$thumb.css({
            width: this.option("width"),
            height: this.option("height")
        })
    },
    _toggleVisibility: function(visible) {
        if (this.option("visibilityMode") === SCROLLBAR_VISIBLE.onScroll) {
            this._$thumb.css("opacity")
        }
        visible = this._adjustVisibility(visible);
        this.option().visible = visible;
        this._$thumb.toggleClass("dx-state-invisible", !visible)
    },
    _adjustVisibility: function(visible) {
        if (this._baseContainerToContentRatio && !this._needScrollbar()) {
            return false
        }
        switch (this.option("visibilityMode")) {
            case SCROLLBAR_VISIBLE.onScroll:
                break;
            case SCROLLBAR_VISIBLE.onHover:
                visible = visible || !!this._isHovered;
                break;
            case SCROLLBAR_VISIBLE.never:
                visible = false;
                break;
            case SCROLLBAR_VISIBLE.always:
                visible = true
        }
        return visible
    },
    moveTo: function(location) {
        if (this._isHidden()) {
            return
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isPlainObject"])(location)) {
            location = location[this._prop] || 0
        }
        var scrollBarLocation = {};
        scrollBarLocation[this._prop] = this._calculateScrollBarPosition(location);
        Object(_animation_translator__WEBPACK_IMPORTED_MODULE_4__["move"])(this._$thumb, scrollBarLocation)
    },
    _calculateScrollBarPosition: function(location) {
        return -location * this._thumbRatio
    },
    _update: function() {
        var containerSize = Math.round(this.option("containerSize"));
        var contentSize = Math.round(this.option("contentSize"));
        var baseContainerSize = Math.round(this.option("baseContainerSize"));
        var baseContentSize = Math.round(this.option("baseContentSize"));
        if (isNaN(baseContainerSize)) {
            baseContainerSize = containerSize;
            baseContentSize = contentSize
        }
        this._baseContainerToContentRatio = baseContentSize ? baseContainerSize / baseContentSize : baseContainerSize;
        this._realContainerToContentRatio = contentSize ? containerSize / contentSize : containerSize;
        var thumbSize = Math.round(Math.max(Math.round(containerSize * this._realContainerToContentRatio), THUMB_MIN_SIZE));
        this._thumbRatio = (containerSize - thumbSize) / (this.option("scaleRatio") * (contentSize - containerSize));
        this.option(this._dimension, thumbSize / this.option("scaleRatio"));
        this.$element().css("display", this._needScrollbar() ? "" : "none")
    },
    _isHidden: function() {
        return this.option("visibilityMode") === SCROLLBAR_VISIBLE.never
    },
    _needScrollbar: function() {
        return !this._isHidden() && this._baseContainerToContentRatio < 1
    },
    containerToContentRatio: function() {
        return this._realContainerToContentRatio
    },
    _normalizeSize: function(size) {
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isPlainObject"])(size) ? size[this._dimension] || 0 : size
    },
    _clean: function() {
        this.callBase();
        if (this === activeScrollbar) {
            activeScrollbar = null
        }
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(this._$thumb, "." + SCROLLBAR)
    },
    _optionChanged: function(args) {
        if (this._isHidden()) {
            return
        }
        switch (args.name) {
            case "containerSize":
            case "contentSize":
                this.option()[args.name] = this._normalizeSize(args.value);
                this._update();
                break;
            case "baseContentSize":
            case "baseContainerSize":
                this._update();
                break;
            case "visibilityMode":
            case "direction":
                this._invalidate();
                break;
            case "scaleRatio":
                this._update();
                break;
            default:
                this.callBase.apply(this, arguments)
        }
    },
    update: Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_7__["deferRenderer"])((function() {
        this._adjustVisibility() && this.option("visible", true)
    }))
});
_core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_3__["default"].add((function() {
    _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].subscribeGlobal(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getDocument(), Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_6__["addNamespace"])(_events_pointer__WEBPACK_IMPORTED_MODULE_10__["default"].up, SCROLLBAR), (function() {
        if (activeScrollbar) {
            activeScrollbar.feedbackOff()
        }
    }))
}));
/* harmony default export */ __webpack_exports__["default"] = (Scrollbar);


/***/ })

}]);