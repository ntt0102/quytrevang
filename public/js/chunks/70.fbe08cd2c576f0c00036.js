(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[70],{

/***/ "./node_modules/devextreme-vue/scroll-view.js":
/*!****************************************************!*\
  !*** ./node_modules/devextreme-vue/scroll-view.js ***!
  \****************************************************/
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
exports.DxScrollView = void 0;
var scroll_view_1 = __importDefault(__webpack_require__(/*! devextreme/ui/scroll_view */ "./node_modules/devextreme/esm/ui/scroll_view.js"));
var index_1 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var DxScrollView = index_1.createComponent({
    props: {
        bounceEnabled: Boolean,
        direction: String,
        disabled: Boolean,
        elementAttr: Object,
        height: [Function, Number, String],
        onDisposing: Function,
        onInitialized: Function,
        onOptionChanged: Function,
        onPullDown: Function,
        onReachBottom: Function,
        onScroll: Function,
        onUpdated: Function,
        pulledDownText: String,
        pullingDownText: String,
        reachBottomText: String,
        refreshingText: String,
        rtlEnabled: Boolean,
        scrollByContent: Boolean,
        scrollByThumb: Boolean,
        showScrollbar: String,
        useNative: Boolean,
        width: [Function, Number, String]
    },
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:bounceEnabled": null,
        "update:direction": null,
        "update:disabled": null,
        "update:elementAttr": null,
        "update:height": null,
        "update:onDisposing": null,
        "update:onInitialized": null,
        "update:onOptionChanged": null,
        "update:onPullDown": null,
        "update:onReachBottom": null,
        "update:onScroll": null,
        "update:onUpdated": null,
        "update:pulledDownText": null,
        "update:pullingDownText": null,
        "update:reachBottomText": null,
        "update:refreshingText": null,
        "update:rtlEnabled": null,
        "update:scrollByContent": null,
        "update:scrollByThumb": null,
        "update:showScrollbar": null,
        "update:useNative": null,
        "update:width": null,
    },
    computed: {
        instance: function () {
            return this.$_instance;
        }
    },
    beforeCreate: function () {
        this.$_WidgetClass = scroll_view_1.default;
        this.$_hasAsyncTemplate = true;
    }
});
exports.DxScrollView = DxScrollView;
exports.default = DxScrollView;


/***/ }),

/***/ "./node_modules/devextreme/esm/events/gesture/emitter.gesture.scroll.js":
/*!******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/gesture/emitter.gesture.scroll.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_gesture_emitter_gesture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/gesture/emitter.gesture */ "./node_modules/devextreme/esm/events/gesture/emitter.gesture.js");
/* harmony import */ var _events_core_emitter_registrator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/core/emitter_registrator */ "./node_modules/devextreme/esm/events/core/emitter_registrator.js");
/* harmony import */ var _animation_frame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../animation/frame */ "./node_modules/devextreme/esm/animation/frame.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_utils_version__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/version */ "./node_modules/devextreme/esm/core/utils/version.js");
/**
 * DevExtreme (esm/events/gesture/emitter.gesture.scroll.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var abstract = _core_class__WEBPACK_IMPORTED_MODULE_1__["default"].abstract;






var realDevice = _core_devices__WEBPACK_IMPORTED_MODULE_6__["default"].real();
var SCROLL_EVENT = "scroll";
var SCROLL_INIT_EVENT = "dxscrollinit";
var SCROLL_START_EVENT = "dxscrollstart";
var SCROLL_MOVE_EVENT = "dxscroll";
var SCROLL_END_EVENT = "dxscrollend";
var SCROLL_STOP_EVENT = "dxscrollstop";
var SCROLL_CANCEL_EVENT = "dxscrollcancel";
var Locker = _core_class__WEBPACK_IMPORTED_MODULE_1__["default"].inherit(function() {
    var NAMESPACED_SCROLL_EVENT = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["addNamespace"])(SCROLL_EVENT, "dxScrollEmitter");
    return {
        ctor: function(element) {
            this._element = element;
            this._locked = false;
            this._proxiedScroll = e => {
                if (!this._disposed) {
                    this._scroll(e)
                }
            };
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].on(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll)
        },
        _scroll: abstract,
        check: function(e, callback) {
            if (this._locked) {
                callback()
            }
        },
        dispose: function() {
            this._disposed = true;
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_0__["default"].off(this._element, NAMESPACED_SCROLL_EVENT, this._proxiedScroll)
        }
    }
}());
var TimeoutLocker = Locker.inherit({
    ctor: function(element, timeout) {
        this.callBase(element);
        this._timeout = timeout
    },
    _scroll: function() {
        this._prepare();
        this._forget()
    },
    _prepare: function() {
        if (this._timer) {
            this._clearTimer()
        }
        this._locked = true
    },
    _clearTimer: function() {
        clearTimeout(this._timer);
        this._locked = false;
        this._timer = null
    },
    _forget: function() {
        var that = this;
        this._timer = setTimeout((function() {
            that._clearTimer()
        }), this._timeout)
    },
    dispose: function() {
        this.callBase();
        this._clearTimer()
    }
});
var WheelLocker = TimeoutLocker.inherit({
    ctor: function(element) {
        this.callBase(element, 400);
        this._lastWheelDirection = null
    },
    check: function(e, callback) {
        this._checkDirectionChanged(e);
        this.callBase(e, callback)
    },
    _checkDirectionChanged: function(e) {
        if (!Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["isDxMouseWheelEvent"])(e)) {
            this._lastWheelDirection = null;
            return
        }
        var direction = e.shiftKey || false;
        var directionChange = null !== this._lastWheelDirection && direction !== this._lastWheelDirection;
        this._lastWheelDirection = direction;
        this._locked = this._locked && !directionChange
    }
});
var PointerLocker = TimeoutLocker.inherit({
    ctor: function(element) {
        this.callBase(element, 400)
    }
});
! function() {
    var ios8_greater = realDevice.ios && Object(_core_utils_version__WEBPACK_IMPORTED_MODULE_7__["compare"])(realDevice.version, [8]) >= 0;
    var android5_greater = realDevice.android && Object(_core_utils_version__WEBPACK_IMPORTED_MODULE_7__["compare"])(realDevice.version, [5]) >= 0;
    if (!(ios8_greater || android5_greater)) {
        return
    }
    PointerLocker = Locker.inherit({
        _scroll: function() {
            this._locked = true;
            var that = this;
            Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"])(this._scrollFrame);
            this._scrollFrame = Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["requestAnimationFrame"])((function() {
                that._locked = false
            }))
        },
        check: function(e, callback) {
            Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"])(this._scrollFrame);
            Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"])(this._checkFrame);
            var that = this;
            var callBase = this.callBase;
            this._checkFrame = Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["requestAnimationFrame"])((function() {
                callBase.call(that, e, callback);
                that._locked = false
            }))
        },
        dispose: function() {
            this.callBase();
            Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"])(this._scrollFrame);
            Object(_animation_frame__WEBPACK_IMPORTED_MODULE_5__["cancelAnimationFrame"])(this._checkFrame)
        }
    })
}();
var ScrollEmitter = _events_gesture_emitter_gesture__WEBPACK_IMPORTED_MODULE_3__["default"].inherit(function() {
    var FRAME_DURATION = Math.round(1e3 / 60);
    return {
        ctor: function(element) {
            this.callBase.apply(this, arguments);
            this.direction = "both";
            this._pointerLocker = new PointerLocker(element);
            this._wheelLocker = new WheelLocker(element)
        },
        validate: function() {
            return true
        },
        configure: function(data) {
            if (data.scrollTarget) {
                this._pointerLocker.dispose();
                this._wheelLocker.dispose();
                this._pointerLocker = new PointerLocker(data.scrollTarget);
                this._wheelLocker = new WheelLocker(data.scrollTarget)
            }
            this.callBase(data)
        },
        _init: function(e) {
            this._wheelLocker.check(e, function() {
                if (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["isDxMouseWheelEvent"])(e)) {
                    this._accept(e)
                }
            }.bind(this));
            this._pointerLocker.check(e, function() {
                var skipCheck = this.isNative && Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["isMouseEvent"])(e);
                if (!Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["isDxMouseWheelEvent"])(e) && !skipCheck) {
                    this._accept(e)
                }
            }.bind(this));
            this._fireEvent(SCROLL_INIT_EVENT, e);
            this._prevEventData = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e)
        },
        move: function(e) {
            this.callBase.apply(this, arguments);
            e.isScrollingEvent = this.isNative || e.isScrollingEvent
        },
        _start: function(e) {
            this._savedEventData = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e);
            this._fireEvent(SCROLL_START_EVENT, e);
            this._prevEventData = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e)
        },
        _move: function(e) {
            var currentEventData = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e);
            this._fireEvent(SCROLL_MOVE_EVENT, e, {
                delta: Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventDelta"])(this._prevEventData, currentEventData)
            });
            var delta = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventDelta"])(this._savedEventData, currentEventData);
            if (delta.time > 200) {
                this._savedEventData = this._prevEventData
            }
            this._prevEventData = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e)
        },
        _end: function(e) {
            var endEventDelta = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventDelta"])(this._prevEventData, Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventData"])(e));
            var velocity = {
                x: 0,
                y: 0
            };
            if (!Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["isDxMouseWheelEvent"])(e) && endEventDelta.time < 100) {
                var delta = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_2__["eventDelta"])(this._savedEventData, this._prevEventData);
                var velocityMultiplier = FRAME_DURATION / delta.time;
                velocity = {
                    x: delta.x * velocityMultiplier,
                    y: delta.y * velocityMultiplier
                }
            }
            this._fireEvent(SCROLL_END_EVENT, e, {
                velocity: velocity
            })
        },
        _stop: function(e) {
            this._fireEvent(SCROLL_STOP_EVENT, e)
        },
        cancel: function(e) {
            this.callBase.apply(this, arguments);
            this._fireEvent(SCROLL_CANCEL_EVENT, e)
        },
        dispose: function() {
            this.callBase.apply(this, arguments);
            this._pointerLocker.dispose();
            this._wheelLocker.dispose()
        },
        _clearSelection: function() {
            if (this.isNative) {
                return
            }
            return this.callBase.apply(this, arguments)
        },
        _toggleGestureCover: function() {
            if (this.isNative) {
                return
            }
            return this.callBase.apply(this, arguments)
        }
    }
}());
Object(_events_core_emitter_registrator__WEBPACK_IMPORTED_MODULE_4__["default"])({
    emitter: ScrollEmitter,
    events: [SCROLL_INIT_EVENT, SCROLL_START_EVENT, SCROLL_MOVE_EVENT, SCROLL_END_EVENT, SCROLL_STOP_EVENT, SCROLL_CANCEL_EVENT]
});
/* harmony default export */ __webpack_exports__["default"] = ({
    init: SCROLL_INIT_EVENT,
    start: SCROLL_START_EVENT,
    move: SCROLL_MOVE_EVENT,
    end: SCROLL_END_EVENT,
    stop: SCROLL_STOP_EVENT,
    cancel: SCROLL_CANCEL_EVENT,
    scroll: SCROLL_EVENT
});


/***/ })

}]);