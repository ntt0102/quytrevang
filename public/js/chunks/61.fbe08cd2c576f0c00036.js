(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[61],{

/***/ "./node_modules/devextreme/esm/animation/easing.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/animation/easing.js ***!
  \*********************************************************/
/*! exports provided: convertTransitionTimingFuncToEasing, setEasing, getEasing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertTransitionTimingFuncToEasing", function() { return convertTransitionTimingFuncToEasing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEasing", function() { return setEasing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEasing", function() { return getEasing; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/animation/easing.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var CSS_TRANSITION_EASING_REGEX = /cubic-bezier\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/;
var TransitionTimingFuncMap = {
    linear: "cubic-bezier(0, 0, 1, 1)",
    swing: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
    "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
    "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)"
};
var polynomBezier = function(x1, y1, x2, y2) {
    var Cx = 3 * x1;
    var Bx = 3 * (x2 - x1) - Cx;
    var Ax = 1 - Cx - Bx;
    var Cy = 3 * y1;
    var By = 3 * (y2 - y1) - Cy;
    var Ay = 1 - Cy - By;
    var bezierX = function(t) {
        return t * (Cx + t * (Bx + t * Ax))
    };
    var derivativeX = function(t) {
        return Cx + t * (2 * Bx + 3 * t * Ax)
    };
    return function(t) {
        return function(t) {
            return t * (Cy + t * (By + t * Ay))
        }(function(t) {
            var x = t;
            var i = 0;
            var z;
            while (i < 14) {
                z = bezierX(x) - t;
                if (Math.abs(z) < .001) {
                    break
                }
                x -= z / derivativeX(x);
                i++
            }
            return x
        }(t))
    }
};
var easing = {};
var convertTransitionTimingFuncToEasing = function(cssTransitionEasing) {
    cssTransitionEasing = TransitionTimingFuncMap[cssTransitionEasing] || cssTransitionEasing;
    var coeffs = cssTransitionEasing.match(CSS_TRANSITION_EASING_REGEX);
    var forceName;
    if (!coeffs) {
        forceName = "linear";
        coeffs = TransitionTimingFuncMap[forceName].match(CSS_TRANSITION_EASING_REGEX)
    }
    coeffs = coeffs.slice(1, 5);
    for (var i = 0; i < coeffs.length; i++) {
        coeffs[i] = parseFloat(coeffs[i])
    }
    var easingName = forceName || "cubicbezier_" + coeffs.join("_").replace(/\./g, "p");
    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(easing[easingName])) {
        easing[easingName] = function(x, t, b, c, d) {
            return c * polynomBezier(coeffs[0], coeffs[1], coeffs[2], coeffs[3])(t / d) + b
        }
    }
    return easingName
};
function setEasing(value) {
    easing = value
}
function getEasing(name) {
    return easing[name]
}


/***/ }),

/***/ "./node_modules/devextreme/esm/animation/fx.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/animation/fx.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/errors */ "./node_modules/devextreme/esm/core/errors.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _translator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./easing */ "./node_modules/devextreme/esm/animation/easing.js");
/* harmony import */ var _frame__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./frame */ "./node_modules/devextreme/esm/animation/frame.js");
/* harmony import */ var _core_utils_support__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/utils/support */ "./node_modules/devextreme/esm/core/utils/support.js");
/* harmony import */ var _position__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./position */ "./node_modules/devextreme/esm/animation/position.js");
/* harmony import */ var _events_remove__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../events/remove */ "./node_modules/devextreme/esm/events/remove.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/animation/fx.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_1__["getWindow"])();














var removeEventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_14__["addNamespace"])(_events_remove__WEBPACK_IMPORTED_MODULE_13__["removeEvent"], "dxFX");

var RELATIVE_VALUE_REGEX = /^([+-])=(.*)/i;
var ANIM_DATA_KEY = "dxAnimData";
var ANIM_QUEUE_KEY = "dxAnimQueue";
var TRANSFORM_PROP = "transform";
var TransitionAnimationStrategy = {
    initAnimation: function($element, config) {
        $element.css({
            transitionProperty: "none"
        });
        if ("string" === typeof config.from) {
            $element.addClass(config.from)
        } else {
            setProps($element, config.from)
        }
        var that = this;
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"];
        var cleanupWhen = config.cleanupWhen;
        config.transitionAnimation = {
            deferred: deferred,
            finish: function() {
                that._finishTransition($element);
                if (cleanupWhen) {
                    Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["when"])(deferred, cleanupWhen).always((function() {
                        that._cleanup($element, config)
                    }))
                } else {
                    that._cleanup($element, config)
                }
                deferred.resolveWith($element, [config, $element])
            }
        };
        this._completeAnimationCallback($element, config).done((function() {
            config.transitionAnimation.finish()
        })).fail((function() {
            deferred.rejectWith($element, [config, $element])
        }));
        if (!config.duration) {
            config.transitionAnimation.finish()
        }
        $element.css("transform")
    },
    animate: function($element, config) {
        this._startAnimation($element, config);
        return config.transitionAnimation.deferred.promise()
    },
    _completeAnimationCallback: function($element, config) {
        var that = this;
        var startTime = Date.now() + config.delay;
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"];
        var transitionEndFired = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"];
        var simulatedTransitionEndFired = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"];
        var simulatedEndEventTimer;
        var transitionEndEventFullName = Object(_core_utils_support__WEBPACK_IMPORTED_MODULE_11__["transitionEndEventName"])() + ".dxFX";
        config.transitionAnimation.cleanup = function() {
            clearTimeout(simulatedEndEventTimer);
            clearTimeout(waitForJSCompleteTimer);
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off($element, transitionEndEventFullName);
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off($element, removeEventName)
        };
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].one($element, transitionEndEventFullName, (function() {
            if (Date.now() - startTime >= config.duration) {
                transitionEndFired.reject()
            }
        }));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off($element, removeEventName);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on($element, removeEventName, (function() {
            that.stop($element, config);
            deferred.reject()
        }));
        var waitForJSCompleteTimer = setTimeout((function() {
            simulatedEndEventTimer = setTimeout((function() {
                simulatedTransitionEndFired.reject()
            }), config.duration + config.delay + fx._simulatedTransitionEndDelay);
            Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["when"])(transitionEndFired, simulatedTransitionEndFired).fail(function() {
                deferred.resolve()
            }.bind(this))
        }));
        return deferred.promise()
    },
    _startAnimation: function($element, config) {
        $element.css({
            transitionProperty: "all",
            transitionDelay: config.delay + "ms",
            transitionDuration: config.duration + "ms",
            transitionTimingFunction: config.easing
        });
        if ("string" === typeof config.to) {
            $element[0].className += " " + config.to
        } else if (config.to) {
            setProps($element, config.to)
        }
    },
    _finishTransition: function($element) {
        $element.css("transition", "none")
    },
    _cleanup: function($element, config) {
        config.transitionAnimation.cleanup();
        if ("string" === typeof config.from) {
            $element.removeClass(config.from);
            $element.removeClass(config.to)
        }
    },
    stop: function($element, config, jumpToEnd) {
        if (!config) {
            return
        }
        if (jumpToEnd) {
            config.transitionAnimation.finish()
        } else {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isPlainObject"])(config.to)) {
                Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(config.to, (function(key) {
                    $element.css(key, $element.css(key))
                }))
            }
            this._finishTransition($element);
            this._cleanup($element, config)
        }
    }
};
var FrameAnimationStrategy = {
    initAnimation: function($element, config) {
        setProps($element, config.from)
    },
    animate: function($element, config) {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"];
        var that = this;
        if (!config) {
            return deferred.reject().promise()
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(config.to, (function(prop) {
            if (void 0 === config.from[prop]) {
                config.from[prop] = that._normalizeValue($element.css(prop))
            }
        }));
        if (config.to[TRANSFORM_PROP]) {
            config.from[TRANSFORM_PROP] = that._parseTransform(config.from[TRANSFORM_PROP]);
            config.to[TRANSFORM_PROP] = that._parseTransform(config.to[TRANSFORM_PROP])
        }
        config.frameAnimation = {
            to: config.to,
            from: config.from,
            currentValue: config.from,
            easing: Object(_easing__WEBPACK_IMPORTED_MODULE_9__["convertTransitionTimingFuncToEasing"])(config.easing),
            duration: config.duration,
            startTime: (new Date).valueOf(),
            finish: function() {
                this.currentValue = this.to;
                this.draw();
                Object(_frame__WEBPACK_IMPORTED_MODULE_10__["cancelAnimationFrame"])(config.frameAnimation.animationFrameId);
                deferred.resolve()
            },
            draw: function() {
                if (config.draw) {
                    config.draw(this.currentValue);
                    return
                }
                var currentValue = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])({}, this.currentValue);
                if (currentValue[TRANSFORM_PROP]) {
                    currentValue[TRANSFORM_PROP] = Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["map"])(currentValue[TRANSFORM_PROP], (function(value, prop) {
                        if ("translate" === prop) {
                            return Object(_translator__WEBPACK_IMPORTED_MODULE_8__["getTranslateCss"])(value)
                        } else if ("scale" === prop) {
                            return "scale(" + value + ")"
                        } else if ("rotate" === prop.substr(0, prop.length - 1)) {
                            return prop + "(" + value + "deg)"
                        }
                    })).join(" ")
                }
                $element.css(currentValue)
            }
        };
        if (config.delay) {
            config.frameAnimation.startTime += config.delay;
            config.frameAnimation.delayTimeout = setTimeout((function() {
                that._startAnimation($element, config)
            }), config.delay)
        } else {
            that._startAnimation($element, config)
        }
        return deferred.promise()
    },
    _startAnimation: function($element, config) {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off($element, removeEventName);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on($element, removeEventName, (function() {
            if (config.frameAnimation) {
                Object(_frame__WEBPACK_IMPORTED_MODULE_10__["cancelAnimationFrame"])(config.frameAnimation.animationFrameId)
            }
        }));
        this._animationStep($element, config)
    },
    _parseTransform: function(transformString) {
        var result = {};
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(transformString.match(/\w+\d*\w*\([^)]*\)\s*/g), (function(i, part) {
            var translateData = Object(_translator__WEBPACK_IMPORTED_MODULE_8__["parseTranslate"])(part);
            var scaleData = part.match(/scale\((.+?)\)/);
            var rotateData = part.match(/(rotate.)\((.+)deg\)/);
            if (translateData) {
                result.translate = translateData
            }
            if (scaleData && scaleData[1]) {
                result.scale = parseFloat(scaleData[1])
            }
            if (rotateData && rotateData[1]) {
                result[rotateData[1]] = parseFloat(rotateData[2])
            }
        }));
        return result
    },
    stop: function($element, config, jumpToEnd) {
        var frameAnimation = config && config.frameAnimation;
        if (!frameAnimation) {
            return
        }
        Object(_frame__WEBPACK_IMPORTED_MODULE_10__["cancelAnimationFrame"])(frameAnimation.animationFrameId);
        clearTimeout(frameAnimation.delayTimeout);
        if (jumpToEnd) {
            frameAnimation.finish()
        }
        delete config.frameAnimation
    },
    _animationStep: function($element, config) {
        var frameAnimation = config && config.frameAnimation;
        if (!frameAnimation) {
            return
        }
        var now = (new Date).valueOf();
        if (now >= frameAnimation.startTime + frameAnimation.duration) {
            frameAnimation.finish();
            return
        }
        frameAnimation.currentValue = this._calcStepValue(frameAnimation, now - frameAnimation.startTime);
        frameAnimation.draw();
        var that = this;
        frameAnimation.animationFrameId = Object(_frame__WEBPACK_IMPORTED_MODULE_10__["requestAnimationFrame"])((function() {
            that._animationStep($element, config)
        }))
    },
    _calcStepValue: function(frameAnimation, currentDuration) {
        return function calcValueRecursively(from, to) {
            var result = Array.isArray(to) ? [] : {};
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(to, (function(propName, endPropValue) {
                if ("string" === typeof endPropValue && false === parseFloat(endPropValue, 10)) {
                    return true
                }
                result[propName] = "object" === typeof endPropValue ? calcValueRecursively(from[propName], endPropValue) : function(propName) {
                    var x = currentDuration / frameAnimation.duration;
                    var t = currentDuration;
                    var b = 1 * from[propName];
                    var c = to[propName] - from[propName];
                    var d = frameAnimation.duration;
                    return Object(_easing__WEBPACK_IMPORTED_MODULE_9__["getEasing"])(frameAnimation.easing)(x, t, b, c, d)
                }(propName)
            }));
            return result
        }(frameAnimation.from, frameAnimation.to)
    },
    _normalizeValue: function(value) {
        var numericValue = parseFloat(value, 10);
        if (false === numericValue) {
            return value
        }
        return numericValue
    }
};
var FallbackToNoAnimationStrategy = {
    initAnimation: function() {},
    animate: function() {
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"]).resolve().promise()
    },
    stop: _core_utils_common__WEBPACK_IMPORTED_MODULE_16__["noop"],
    isSynchronous: true
};
var getAnimationStrategy = function(config) {
    config = config || {};
    var animationStrategies = {
        transition: Object(_core_utils_support__WEBPACK_IMPORTED_MODULE_11__["transition"])() ? TransitionAnimationStrategy : FrameAnimationStrategy,
        frame: FrameAnimationStrategy,
        noAnimation: FallbackToNoAnimationStrategy
    };
    var strategy = config.strategy || "transition";
    if ("css" === config.type && !Object(_core_utils_support__WEBPACK_IMPORTED_MODULE_11__["transition"])()) {
        strategy = "noAnimation"
    }
    return animationStrategies[strategy]
};
var baseConfigValidator = function(config, animationType, validate, typeMessage) {
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(["from", "to"], (function() {
        if (!validate(config[this])) {
            throw _core_errors__WEBPACK_IMPORTED_MODULE_3__["default"].Error("E0010", animationType, this, typeMessage)
        }
    }))
};
var isObjectConfigValidator = function(config, animationType) {
    return baseConfigValidator(config, animationType, (function(target) {
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isPlainObject"])(target)
    }), "a plain object")
};
var isStringConfigValidator = function(config, animationType) {
    return baseConfigValidator(config, animationType, (function(target) {
        return "string" === typeof target
    }), "a string")
};
var CustomAnimationConfigurator = {
    setup: function() {}
};
var CssAnimationConfigurator = {
    validateConfig: function(config) {
        isStringConfigValidator(config, "css")
    },
    setup: function() {}
};
var positionAliases = {
    top: {
        my: "bottom center",
        at: "top center"
    },
    bottom: {
        my: "top center",
        at: "bottom center"
    },
    right: {
        my: "left center",
        at: "right center"
    },
    left: {
        my: "right center",
        at: "left center"
    }
};
var SlideAnimationConfigurator = {
    validateConfig: function(config) {
        isObjectConfigValidator(config, "slide")
    },
    setup: function($element, config) {
        var location = Object(_translator__WEBPACK_IMPORTED_MODULE_8__["locate"])($element);
        if ("slide" !== config.type) {
            var positioningConfig = "slideIn" === config.type ? config.from : config.to;
            positioningConfig.position = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])({
                of: window
            }, positionAliases[config.direction]);
            setupPosition($element, positioningConfig)
        }
        this._setUpConfig(location, config.from);
        this._setUpConfig(location, config.to);
        Object(_translator__WEBPACK_IMPORTED_MODULE_8__["clearCache"])($element)
    },
    _setUpConfig: function(location, config) {
        config.left = "left" in config ? config.left : "+=0";
        config.top = "top" in config ? config.top : "+=0";
        this._initNewPosition(location, config)
    },
    _initNewPosition: function(location, config) {
        var position = {
            left: config.left,
            top: config.top
        };
        delete config.left;
        delete config.top;
        var relativeValue = this._getRelativeValue(position.left);
        if (void 0 !== relativeValue) {
            position.left = relativeValue + location.left
        } else {
            config.left = 0
        }
        relativeValue = this._getRelativeValue(position.top);
        if (void 0 !== relativeValue) {
            position.top = relativeValue + location.top
        } else {
            config.top = 0
        }
        config[TRANSFORM_PROP] = Object(_translator__WEBPACK_IMPORTED_MODULE_8__["getTranslateCss"])({
            x: position.left,
            y: position.top
        })
    },
    _getRelativeValue: function(value) {
        var relativeValue;
        if ("string" === typeof value && (relativeValue = RELATIVE_VALUE_REGEX.exec(value))) {
            return parseInt(relativeValue[1] + "1") * relativeValue[2]
        }
    }
};
var FadeAnimationConfigurator = {
    setup: function($element, config) {
        var _from$opacity, _to$opacity;
        var from = config.from;
        var to = config.to;
        var defaultFromOpacity = "fadeOut" === config.type ? 1 : 0;
        var defaultToOpacity = "fadeOut" === config.type ? 0 : 1;
        var fromOpacity = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isPlainObject"])(from) ? String(null !== (_from$opacity = from.opacity) && void 0 !== _from$opacity ? _from$opacity : defaultFromOpacity) : String(from);
        var toOpacity = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isPlainObject"])(to) ? String(null !== (_to$opacity = to.opacity) && void 0 !== _to$opacity ? _to$opacity : defaultToOpacity) : String(to);
        if (!config.skipElementInitialStyles) {
            fromOpacity = $element.css("opacity")
        }
        switch (config.type) {
            case "fadeIn":
                toOpacity = 1;
                break;
            case "fadeOut":
                toOpacity = 0
        }
        config.from = {
            visibility: "visible",
            opacity: fromOpacity
        };
        config.to = {
            opacity: toOpacity
        }
    }
};
var PopAnimationConfigurator = {
    validateConfig: function(config) {
        isObjectConfigValidator(config, "pop")
    },
    setup: function($element, config) {
        var from = config.from;
        var to = config.to;
        var fromOpacity = "opacity" in from ? from.opacity : $element.css("opacity");
        var toOpacity = "opacity" in to ? to.opacity : 1;
        var fromScale = "scale" in from ? from.scale : 0;
        var toScale = "scale" in to ? to.scale : 1;
        config.from = {
            opacity: fromOpacity
        };
        var translate = Object(_translator__WEBPACK_IMPORTED_MODULE_8__["getTranslate"])($element);
        config.from[TRANSFORM_PROP] = this._getCssTransform(translate, fromScale);
        config.to = {
            opacity: toOpacity
        };
        config.to[TRANSFORM_PROP] = this._getCssTransform(translate, toScale)
    },
    _getCssTransform: function(translate, scale) {
        return Object(_translator__WEBPACK_IMPORTED_MODULE_8__["getTranslateCss"])(translate) + "scale(" + scale + ")"
    }
};
var animationConfigurators = {
    custom: CustomAnimationConfigurator,
    slide: SlideAnimationConfigurator,
    slideIn: SlideAnimationConfigurator,
    slideOut: SlideAnimationConfigurator,
    fade: FadeAnimationConfigurator,
    fadeIn: FadeAnimationConfigurator,
    fadeOut: FadeAnimationConfigurator,
    pop: PopAnimationConfigurator,
    css: CssAnimationConfigurator
};
var getAnimationConfigurator = function(config) {
    var result = animationConfigurators[config.type];
    if (!result) {
        throw _core_errors__WEBPACK_IMPORTED_MODULE_3__["default"].Error("E0011", config.type)
    }
    return result
};
var defaultJSConfig = {
    type: "custom",
    from: {},
    to: {},
    duration: 400,
    start: _core_utils_common__WEBPACK_IMPORTED_MODULE_16__["noop"],
    complete: _core_utils_common__WEBPACK_IMPORTED_MODULE_16__["noop"],
    easing: "ease",
    delay: 0
};
var defaultCssConfig = {
    duration: 400,
    easing: "ease",
    delay: 0
};

function setupAnimationOnElement() {
    var $element = this.element;
    var config = this.config;
    setupPosition($element, config.from);
    setupPosition($element, config.to);
    this.configurator.setup($element, config);
    $element.data(ANIM_DATA_KEY, this);
    if (fx.off) {
        config.duration = 0;
        config.delay = 0
    }
    this.strategy.initAnimation($element, config);
    if (config.start) {
        var element = Object(_core_element__WEBPACK_IMPORTED_MODULE_4__["getPublicElement"])($element);
        config.start.apply(this, [element, config])
    }
}
var onElementAnimationComplete = function(animation) {
    var $element = animation.element;
    var config = animation.config;
    $element.removeData(ANIM_DATA_KEY);
    if (config.complete) {
        var element = Object(_core_element__WEBPACK_IMPORTED_MODULE_4__["getPublicElement"])($element);
        config.complete.apply(this, [element, config])
    }
    animation.deferred.resolveWith(this, [$element, config])
};
var startAnimationOnElement = function() {
    var animation = this;
    var $element = animation.element;
    var config = animation.config;
    animation.isStarted = true;
    return animation.strategy.animate($element, config).done((function() {
        onElementAnimationComplete(animation)
    })).fail((function() {
        animation.deferred.rejectWith(this, [$element, config])
    }))
};
var stopAnimationOnElement = function(jumpToEnd) {
    var $element = this.element;
    var config = this.config;
    clearTimeout(this.startTimeout);
    if (!this.isStarted) {
        this.start()
    }
    this.strategy.stop($element, config, jumpToEnd)
};
var scopedRemoveEvent = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_14__["addNamespace"])(_events_remove__WEBPACK_IMPORTED_MODULE_13__["removeEvent"], "dxFXStartAnimation");
var subscribeToRemoveEvent = function(animation) {
    _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(animation.element, scopedRemoveEvent);
    _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(animation.element, scopedRemoveEvent, (function() {
        fx.stop(animation.element)
    }));
    animation.deferred.always((function() {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(animation.element, scopedRemoveEvent)
    }))
};
var createAnimation = function(element, initialConfig) {
    var defaultConfig = "css" === initialConfig.type ? defaultCssConfig : defaultJSConfig;
    var config = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])(true, {}, defaultConfig, initialConfig);
    var configurator = getAnimationConfigurator(config);
    var strategy = getAnimationStrategy(config);
    var animation = {
        element: Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
        config: config,
        configurator: configurator,
        strategy: strategy,
        isSynchronous: strategy.isSynchronous,
        setup: setupAnimationOnElement,
        start: startAnimationOnElement,
        stop: stopAnimationOnElement,
        deferred: new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"]
    };
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isFunction"])(configurator.validateConfig)) {
        configurator.validateConfig(config)
    }
    subscribeToRemoveEvent(animation);
    return animation
};
var animate = function(element, config) {
    var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
    if (!$element.length) {
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_15__["Deferred"]).resolve().promise()
    }
    var animation = createAnimation($element, config);
    pushInAnimationQueue($element, animation);
    return animation.deferred.promise()
};

function pushInAnimationQueue($element, animation) {
    var queueData = getAnimQueueData($element);
    writeAnimQueueData($element, queueData);
    queueData.push(animation);
    if (!isAnimating($element)) {
        shiftFromAnimationQueue($element, queueData)
    }
}

function getAnimQueueData($element) {
    return $element.data(ANIM_QUEUE_KEY) || []
}

function writeAnimQueueData($element, queueData) {
    $element.data(ANIM_QUEUE_KEY, queueData)
}
var destroyAnimQueueData = function($element) {
    $element.removeData(ANIM_QUEUE_KEY)
};

function isAnimating($element) {
    return !!$element.data(ANIM_DATA_KEY)
}

function shiftFromAnimationQueue($element, queueData) {
    queueData = getAnimQueueData($element);
    if (!queueData.length) {
        return
    }
    var animation = queueData.shift();
    if (0 === queueData.length) {
        destroyAnimQueueData($element)
    }
    executeAnimation(animation).done((function() {
        if (!isAnimating($element)) {
            shiftFromAnimationQueue($element)
        }
    }))
}

function executeAnimation(animation) {
    animation.setup();
    if (fx.off || animation.isSynchronous) {
        animation.start()
    } else {
        animation.startTimeout = setTimeout((function() {
            animation.start()
        }))
    }
    return animation.deferred.promise()
}

function setupPosition($element, config) {
    if (!config || !config.position) {
        return
    }
    var win = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(window);
    var left = 0;
    var top = 0;
    var position = _position__WEBPACK_IMPORTED_MODULE_12__["default"].calculate($element, config.position);
    var offset = $element.offset();
    var currentPosition = $element.position();
    if (currentPosition.top > offset.top) {
        top = win.scrollTop()
    }
    if (currentPosition.left > offset.left) {
        left = win.scrollLeft()
    }
    Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_5__["extend"])(config, {
        left: position.h.location - offset.left + currentPosition.left - left,
        top: position.v.location - offset.top + currentPosition.top - top
    });
    delete config.position
}

function setProps($element, props) {
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(props, (function(key, value) {
        try {
            $element.css(key, Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isFunction"])(value) ? value() : value)
        } catch (e) {}
    }))
}
var stop = function(element, jumpToEnd) {
    var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
    var queueData = getAnimQueueData($element);
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(queueData, (function(_, animation) {
        animation.config.delay = 0;
        animation.config.duration = 0;
        animation.isSynchronous = true
    }));
    if (!isAnimating($element)) {
        shiftFromAnimationQueue($element, queueData)
    }
    var animation = $element.data(ANIM_DATA_KEY);
    if (animation) {
        animation.stop(jumpToEnd)
    }
    $element.removeData(ANIM_DATA_KEY);
    destroyAnimQueueData($element)
};
var fx = {
    off: false,
    animationTypes: animationConfigurators,
    animate: animate,
    createAnimation: createAnimation,
    isAnimating: isAnimating,
    stop: stop,
    _simulatedTransitionEndDelay: 100
};
/* harmony default export */ __webpack_exports__["default"] = (fx);


/***/ }),

/***/ "./node_modules/devextreme/esm/animation/position.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/animation/position.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_position__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/utils/position */ "./node_modules/devextreme/esm/core/utils/position.js");
/* harmony import */ var _core_utils_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/utils/browser */ "./node_modules/devextreme/esm/core/utils/browser.js");
/* harmony import */ var _translator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _core_utils_support__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/utils/support */ "./node_modules/devextreme/esm/core/utils/support.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/**
 * DevExtreme (esm/animation/position.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_4__["getWindow"])();








var horzRe = /left|right/;
var vertRe = /top|bottom/;
var collisionRe = /fit|flip|none/;
var scaleRe = /scale\(.+?\)/;
var IS_SAFARI = _core_utils_browser__WEBPACK_IMPORTED_MODULE_9__["default"].safari;
var normalizeAlign = function(raw) {
    var result = {
        h: "center",
        v: "center"
    };
    var pair = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_2__["splitPair"])(raw);
    if (pair) {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(pair, (function() {
            var w = String(this).toLowerCase();
            if (horzRe.test(w)) {
                result.h = w
            } else if (vertRe.test(w)) {
                result.v = w
            }
        }))
    }
    return result
};
var normalizeOffset = function(raw) {
    return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_2__["pairToObject"])(raw)
};
var normalizeCollision = function(raw) {
    var pair = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_2__["splitPair"])(raw);
    var h = String(pair && pair[0]).toLowerCase();
    var v = String(pair && pair[1]).toLowerCase();
    if (!collisionRe.test(h)) {
        h = "none"
    }
    if (!collisionRe.test(v)) {
        v = h
    }
    return {
        h: h,
        v: v
    }
};
var getAlignFactor = function(align) {
    switch (align) {
        case "center":
            return .5;
        case "right":
        case "bottom":
            return 1;
        default:
            return 0
    }
};
var inverseAlign = function(align) {
    switch (align) {
        case "left":
            return "right";
        case "right":
            return "left";
        case "top":
            return "bottom";
        case "bottom":
            return "top";
        default:
            return align
    }
};
var calculateOversize = function(data, bounds) {
    var oversize = 0;
    if (data.myLocation < bounds.min) {
        oversize += bounds.min - data.myLocation
    }
    if (data.myLocation > bounds.max) {
        oversize += data.myLocation - bounds.max
    }
    return oversize
};
var collisionSide = function(direction, data, bounds) {
    if (data.myLocation < bounds.min) {
        return "h" === direction ? "left" : "top"
    }
    if (data.myLocation > bounds.max) {
        return "h" === direction ? "right" : "bottom"
    }
    return "none"
};
var initMyLocation = function(data) {
    data.myLocation = data.atLocation + getAlignFactor(data.atAlign) * data.atSize - getAlignFactor(data.myAlign) * data.mySize + data.offset
};
var collisionResolvers = {
    fit: function(data, bounds) {
        var result = false;
        if (data.myLocation > bounds.max) {
            data.myLocation = bounds.max;
            result = true
        }
        if (data.myLocation < bounds.min) {
            data.myLocation = bounds.min;
            result = true
        }
        data.fit = result
    },
    flip: function(data, bounds) {
        data.flip = false;
        if ("center" === data.myAlign && "center" === data.atAlign) {
            return
        }
        if (data.myLocation < bounds.min || data.myLocation > bounds.max) {
            var inverseData = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])({}, data, {
                myAlign: inverseAlign(data.myAlign),
                atAlign: inverseAlign(data.atAlign),
                offset: -data.offset
            });
            initMyLocation(inverseData);
            inverseData.oversize = calculateOversize(inverseData, bounds);
            if (inverseData.myLocation >= bounds.min && inverseData.myLocation <= bounds.max || data.oversize > inverseData.oversize) {
                data.myLocation = inverseData.myLocation;
                data.oversize = inverseData.oversize;
                data.flip = true
            }
        }
    },
    flipfit: function(data, bounds) {
        this.flip(data, bounds);
        this.fit(data, bounds)
    },
    none: function(data) {
        data.oversize = 0
    }
};
var scrollbarWidth;
var calculateScrollbarWidth = function() {
    var $scrollDiv = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").css({
        width: 100,
        height: 100,
        overflow: "scroll",
        position: "absolute",
        top: -9999
    }).appendTo(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("body"));
    var result = $scrollDiv.get(0).offsetWidth - $scrollDiv.get(0).clientWidth;
    $scrollDiv.remove();
    scrollbarWidth = result
};
var defaultPositionResult = {
    h: {
        location: 0,
        flip: false,
        fit: false,
        oversize: 0
    },
    v: {
        location: 0,
        flip: false,
        fit: false,
        oversize: 0
    }
};
var calculatePosition = function(what, options) {
    var $what = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(what);
    var currentOffset = $what.offset();
    var result = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(true, {}, defaultPositionResult, {
        h: {
            location: currentOffset.left
        },
        v: {
            location: currentOffset.top
        }
    });
    if (!options) {
        return result
    }
    var my = normalizeAlign(options.my);
    var at = normalizeAlign(options.at);
    var of = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(options.of).length && options.of || window;
    var offset = normalizeOffset(options.offset);
    var collision = normalizeCollision(options.collision);
    var boundary = options.boundary;
    var boundaryOffset = normalizeOffset(options.boundaryOffset);
    var h = {
        mySize: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])($what),
        myAlign: my.h,
        atAlign: at.h,
        offset: offset.h,
        collision: collision.h,
        boundaryOffset: boundaryOffset.h
    };
    var v = {
        mySize: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($what),
        myAlign: my.v,
        atAlign: at.v,
        offset: offset.v,
        collision: collision.v,
        boundaryOffset: boundaryOffset.v
    };
    if ( of .preventDefault) {
        h.atLocation = of .pageX;
        v.atLocation = of .pageY;
        h.atSize = 0;
        v.atSize = 0
    } else {
        of = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])( of );
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isWindow"])( of [0])) {
            h.atLocation = of .scrollLeft();
            v.atLocation = of .scrollTop();
            if ("phone" === _core_devices__WEBPACK_IMPORTED_MODULE_12__["default"].real().deviceType && of [0].visualViewport) {
                h.atLocation = Math.max(h.atLocation, of [0].visualViewport.offsetLeft);
                v.atLocation = Math.max(v.atLocation, of [0].visualViewport.offsetTop);
                h.atSize = of [0].visualViewport.width;
                v.atSize = of [0].visualViewport.height
            } else {
                h.atSize = of [0].innerWidth > of [0].outerWidth ? of [0].innerWidth : Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])( of );
                v.atSize = of [0].innerHeight > of [0].outerHeight || IS_SAFARI ? of [0].innerHeight : Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])( of )
            }
        } else if (9 === of [0].nodeType) {
            h.atLocation = 0;
            v.atLocation = 0;
            h.atSize = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])( of );
            v.atSize = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])( of )
        } else {
            var ofRect = Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_8__["getBoundingRect"])( of .get(0));
            var o = getOffsetWithoutScale( of );
            h.atLocation = o.left;
            v.atLocation = o.top;
            h.atSize = Math.max(ofRect.width, Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])( of ));
            v.atSize = Math.max(ofRect.height, Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])( of ))
        }
    }
    initMyLocation(h);
    initMyLocation(v);
    var bounds = function() {
        var win = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(window);
        var windowWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(win);
        var windowHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(win);
        var left = win.scrollLeft();
        var top = win.scrollTop();
        var documentElement = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_5__["default"].getDocumentElement();
        var hZoomLevel = _core_utils_support__WEBPACK_IMPORTED_MODULE_11__["touch"] ? documentElement.clientWidth / windowWidth : 1;
        var vZoomLevel = _core_utils_support__WEBPACK_IMPORTED_MODULE_11__["touch"] ? documentElement.clientHeight / windowHeight : 1;
        if (void 0 === scrollbarWidth) {
            calculateScrollbarWidth()
        }
        var boundaryWidth = windowWidth;
        var boundaryHeight = windowHeight;
        if (boundary) {
            var $boundary = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(boundary);
            var boundaryPosition = $boundary.offset();
            left = boundaryPosition.left;
            top = boundaryPosition.top;
            boundaryWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])($boundary);
            boundaryHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])($boundary)
        }
        return {
            h: {
                min: left + h.boundaryOffset,
                max: left + boundaryWidth / hZoomLevel - h.mySize - h.boundaryOffset
            },
            v: {
                min: top + v.boundaryOffset,
                max: top + boundaryHeight / vZoomLevel - v.mySize - v.boundaryOffset
            }
        }
    }();
    h.oversize = calculateOversize(h, bounds.h);
    v.oversize = calculateOversize(v, bounds.v);
    h.collisionSide = collisionSide("h", h, bounds.h);
    v.collisionSide = collisionSide("v", v, bounds.v);
    if (collisionResolvers[h.collision]) {
        collisionResolvers[h.collision](h, bounds.h)
    }
    if (collisionResolvers[v.collision]) {
        collisionResolvers[v.collision](v, bounds.v)
    }
    var preciser = function(number) {
        return options.precise ? number : Math.round(number)
    };
    Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(true, result, {
        h: {
            location: preciser(h.myLocation),
            oversize: preciser(h.oversize),
            fit: h.fit,
            flip: h.flip,
            collisionSide: h.collisionSide
        },
        v: {
            location: preciser(v.myLocation),
            oversize: preciser(v.oversize),
            fit: v.fit,
            flip: v.flip,
            collisionSide: v.collisionSide
        },
        precise: options.precise
    });
    return result
};
var setScaleProperty = function(element, scale, transformProp, styleAttr, isEmpty) {
    var stylePropIsValid = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isDefined"])(element.style) && !_core_dom_adapter__WEBPACK_IMPORTED_MODULE_5__["default"].isNode(element.style);
    if (stylePropIsValid) {
        element.style.transform = isEmpty ? transformProp.replace(scale, "") : transformProp
    } else {
        element.setAttribute("style", isEmpty ? styleAttr.replace(scale, "") : styleAttr)
    }
};
var getOffsetWithoutScale = function getOffsetWithoutScale($startElement) {
    var _currentElement$getAt, _currentElement$style, _style$match;
    var $currentElement = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : $startElement;
    var currentElement = $currentElement.get(0);
    if (!currentElement) {
        return $startElement.offset()
    }
    var style = (null === (_currentElement$getAt = currentElement.getAttribute) || void 0 === _currentElement$getAt ? void 0 : _currentElement$getAt.call(currentElement, "style")) || "";
    var transform = null === (_currentElement$style = currentElement.style) || void 0 === _currentElement$style ? void 0 : _currentElement$style.transform;
    var scale = null === (_style$match = style.match(scaleRe)) || void 0 === _style$match ? void 0 : _style$match[0];
    var offset;
    if (scale) {
        setScaleProperty(currentElement, scale, transform, style, true);
        offset = getOffsetWithoutScale($startElement, $currentElement.parent());
        setScaleProperty(currentElement, scale, transform, style, false)
    } else {
        offset = getOffsetWithoutScale($startElement, $currentElement.parent())
    }
    return offset
};
var position = function(what, options) {
    var $what = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(what);
    if (!options) {
        return $what.offset()
    }
    Object(_translator__WEBPACK_IMPORTED_MODULE_10__["resetPosition"])($what, true);
    var offset = getOffsetWithoutScale($what);
    var targetPosition = options.h && options.v ? options : calculatePosition($what, options);
    var preciser = function(number) {
        return options.precise ? number : Math.round(number)
    };
    Object(_translator__WEBPACK_IMPORTED_MODULE_10__["move"])($what, {
        left: targetPosition.h.location - preciser(offset.left),
        top: targetPosition.v.location - preciser(offset.top)
    });
    return targetPosition
};
var offset = function(element) {
    element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element).get(0);
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isWindow"])(element)) {
        return null
    } else if (element && "pageY" in element && "pageX" in element) {
        return {
            top: element.pageY,
            left: element.pageX
        }
    }
    return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element).offset()
};
if (!position.inverseAlign) {
    position.inverseAlign = inverseAlign
}
if (!position.normalizeAlign) {
    position.normalizeAlign = normalizeAlign
}
/* harmony default export */ __webpack_exports__["default"] = ({
    calculateScrollbarWidth: calculateScrollbarWidth,
    calculate: calculatePosition,
    setup: position,
    offset: offset
});


/***/ }),

/***/ "./node_modules/devextreme/esm/animation/translator.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/animation/translator.js ***!
  \*************************************************************/
/*! exports provided: locate, clearCache, getTranslateCss, getTranslate, move, resetPosition, parseTranslate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locate", function() { return locate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCache", function() { return clearCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslateCss", function() { return getTranslateCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslate", function() { return getTranslate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "move", function() { return move; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetPosition", function() { return resetPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTranslate", function() { return parseTranslate; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_element_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/animation/translator.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var TRANSLATOR_DATA_KEY = "dxTranslator";
var TRANSFORM_MATRIX_REGEX = /matrix(3d)?\((.+?)\)/;
var TRANSLATE_REGEX = /translate(?:3d)?\((.+?)\)/;
var locate = function($element) {
    $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])($element);
    var translate = getTranslate($element);
    return {
        left: translate.x,
        top: translate.y
    }
};

function isPercentValue(value) {
    return "string" === Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["type"])(value) && "%" === value[value.length - 1]
}

function cacheTranslate($element, translate) {
    if ($element.length) {
        Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["data"])($element.get(0), TRANSLATOR_DATA_KEY, translate)
    }
}
var clearCache = function($element) {
    if ($element.length) {
        Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["removeData"])($element.get(0), TRANSLATOR_DATA_KEY)
    }
};
var getTranslateCss = function(translate) {
    translate.x = translate.x || 0;
    translate.y = translate.y || 0;
    var xValueString = isPercentValue(translate.x) ? translate.x : translate.x + "px";
    var yValueString = isPercentValue(translate.y) ? translate.y : translate.y + "px";
    return "translate(" + xValueString + ", " + yValueString + ")"
};
var getTranslate = function($element) {
    var result = $element.length ? Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["data"])($element.get(0), TRANSLATOR_DATA_KEY) : null;
    if (!result) {
        var transformValue = $element.css("transform") || getTranslateCss({
            x: 0,
            y: 0
        });
        var matrix = transformValue.match(TRANSFORM_MATRIX_REGEX);
        var is3D = matrix && matrix[1];
        if (matrix) {
            matrix = matrix[2].split(",");
            if ("3d" === is3D) {
                matrix = matrix.slice(12, 15)
            } else {
                matrix.push(0);
                matrix = matrix.slice(4, 7)
            }
        } else {
            matrix = [0, 0, 0]
        }
        result = {
            x: parseFloat(matrix[0]),
            y: parseFloat(matrix[1]),
            z: parseFloat(matrix[2])
        };
        cacheTranslate($element, result)
    }
    return result
};
var move = function($element, position) {
    $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])($element);
    var left = position.left;
    var top = position.top;
    var translate;
    if (void 0 === left) {
        translate = getTranslate($element);
        translate.y = top || 0
    } else if (void 0 === top) {
        translate = getTranslate($element);
        translate.x = left || 0
    } else {
        translate = {
            x: left || 0,
            y: top || 0,
            z: 0
        };
        cacheTranslate($element, translate)
    }
    $element.css({
        transform: getTranslateCss(translate)
    });
    if (isPercentValue(left) || isPercentValue(top)) {
        clearCache($element)
    }
};
var resetPosition = function($element, finishTransition) {
    $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])($element);
    var originalTransition;
    var stylesConfig = {
        left: 0,
        top: 0,
        transform: "none"
    };
    if (finishTransition) {
        originalTransition = $element.css("transition");
        stylesConfig.transition = "none"
    }
    $element.css(stylesConfig);
    clearCache($element);
    if (finishTransition) {
        $element.get(0).offsetHeight;
        $element.css("transition", originalTransition)
    }
};
var parseTranslate = function(translateString) {
    var result = translateString.match(TRANSLATE_REGEX);
    if (!result || !result[1]) {
        return
    }
    result = result[1].split(",");
    result = {
        x: parseFloat(result[0]),
        y: parseFloat(result[1]),
        z: parseFloat(result[2])
    };
    return result
};


/***/ }),

/***/ "./node_modules/devextreme/esm/core/resize_observer.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/resize_observer.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _utils_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/**
 * DevExtreme (esm/core/resize_observer.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var window = Object(_utils_window__WEBPACK_IMPORTED_MODULE_1__["getWindow"])();
var ResizeObserverMock = {
    observe: _utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    unobserve: _utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    disconnect: _utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"]
};
class ResizeObserverSingleton {
    constructor() {
        if (!Object(_utils_window__WEBPACK_IMPORTED_MODULE_1__["hasWindow"])() || !window.ResizeObserver) {
            return ResizeObserverMock
        }
        this._callbacksMap = new Map;
        this._observer = new window.ResizeObserver(entries => {
            entries.forEach(entry => {
                var _this$_callbacksMap$g;
                null === (_this$_callbacksMap$g = this._callbacksMap.get(entry.target)) || void 0 === _this$_callbacksMap$g ? void 0 : _this$_callbacksMap$g(entry)
            })
        })
    }
    observe(element, callback) {
        this._callbacksMap.set(element, callback);
        this._observer.observe(element)
    }
    unobserve(element) {
        this._callbacksMap.delete(element);
        this._observer.unobserve(element)
    }
    disconnect() {
        this._callbacksMap.clear();
        this._observer.disconnect()
    }
}
var resizeObserverSingleton = new ResizeObserverSingleton;
/* harmony default export */ __webpack_exports__["default"] = (resizeObserverSingleton);


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/position.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/position.js ***!
  \************************************************************/
/*! exports provided: getBoundingRect, getDefaultAlignment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBoundingRect", function() { return getBoundingRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultAlignment", function() { return getDefaultAlignment; });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./node_modules/devextreme/esm/core/config.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/core/utils/position.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var getDefaultAlignment = isRtlEnabled => {
    var rtlEnabled = null !== isRtlEnabled && void 0 !== isRtlEnabled ? isRtlEnabled : Object(_config__WEBPACK_IMPORTED_MODULE_0__["default"])().rtlEnabled;
    return rtlEnabled ? "right" : "left"
};
var getBoundingRect = element => {
    if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isWindow"])(element)) {
        return {
            width: element.outerWidth,
            height: element.outerHeight
        }
    }
    return element.getBoundingClientRect()
};



/***/ }),

/***/ "./node_modules/devextreme/esm/events/core/emitter.feedback.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/events/core/emitter.feedback.js ***!
  \*********************************************************************/
/*! exports provided: lock, active, inactive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lock", function() { return lock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "active", function() { return ACTIVE_EVENT_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inactive", function() { return INACTIVE_EVENT_NAME; });
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _pointer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./emitter */ "./node_modules/devextreme/esm/events/core/emitter.js");
/* harmony import */ var _emitter_registrator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./emitter_registrator */ "./node_modules/devextreme/esm/events/core/emitter_registrator.js");
/**
 * DevExtreme (esm/events/core/emitter.feedback.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */








var ACTIVE_EVENT_NAME = "dxactive";
var INACTIVE_EVENT_NAME = "dxinactive";
var ACTIVE_TIMEOUT = 30;
var INACTIVE_TIMEOUT = 400;
var FeedbackEvent = _core_class__WEBPACK_IMPORTED_MODULE_0__["default"].inherit({
    ctor: function(timeout, fire) {
        this._timeout = timeout;
        this._fire = fire
    },
    start: function() {
        var that = this;
        this._schedule((function() {
            that.force()
        }))
    },
    _schedule: function(fn) {
        this.stop();
        this._timer = setTimeout(fn, this._timeout)
    },
    stop: function() {
        clearTimeout(this._timer)
    },
    force: function() {
        if (this._fired) {
            return
        }
        this.stop();
        this._fire();
        this._fired = true
    },
    fired: function() {
        return this._fired
    }
});
var activeFeedback;
var FeedbackEmitter = _emitter__WEBPACK_IMPORTED_MODULE_6__["default"].inherit({
    ctor: function() {
        this.callBase.apply(this, arguments);
        this._active = new FeedbackEvent(0, _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"]);
        this._inactive = new FeedbackEvent(0, _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"])
    },
    configure: function(data, eventName) {
        switch (eventName) {
            case ACTIVE_EVENT_NAME:
                data.activeTimeout = data.timeout;
                break;
            case INACTIVE_EVENT_NAME:
                data.inactiveTimeout = data.timeout
        }
        this.callBase(data)
    },
    start: function(e) {
        if (activeFeedback) {
            var activeChildExists = Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_2__["contains"])(this.getElement().get(0), activeFeedback.getElement().get(0));
            var childJustActivated = !activeFeedback._active.fired();
            if (activeChildExists && childJustActivated) {
                this._cancel();
                return
            }
            activeFeedback._inactive.force()
        }
        activeFeedback = this;
        this._initEvents(e);
        this._active.start()
    },
    _initEvents: function(e) {
        var that = this;
        var eventTarget = this._getEmitterTarget(e);
        var mouseEvent = Object(_utils_index__WEBPACK_IMPORTED_MODULE_4__["isMouseEvent"])(e);
        var isSimulator = _core_devices__WEBPACK_IMPORTED_MODULE_3__["default"].isSimulator();
        var deferFeedback = isSimulator || !mouseEvent;
        var activeTimeout = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_1__["ensureDefined"])(this.activeTimeout, ACTIVE_TIMEOUT);
        var inactiveTimeout = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_1__["ensureDefined"])(this.inactiveTimeout, INACTIVE_TIMEOUT);
        this._active = new FeedbackEvent(deferFeedback ? activeTimeout : 0, (function() {
            that._fireEvent(ACTIVE_EVENT_NAME, e, {
                target: eventTarget
            })
        }));
        this._inactive = new FeedbackEvent(deferFeedback ? inactiveTimeout : 0, (function() {
            that._fireEvent(INACTIVE_EVENT_NAME, e, {
                target: eventTarget
            });
            activeFeedback = null
        }))
    },
    cancel: function(e) {
        this.end(e)
    },
    end: function(e) {
        var skipTimers = e.type !== _pointer__WEBPACK_IMPORTED_MODULE_5__["default"].up;
        if (skipTimers) {
            this._active.stop()
        } else {
            this._active.force()
        }
        this._inactive.start();
        if (skipTimers) {
            this._inactive.force()
        }
    },
    dispose: function() {
        this._active.stop();
        this._inactive.stop();
        if (activeFeedback === this) {
            activeFeedback = null
        }
        this.callBase()
    },
    lockInactive: function() {
        this._active.force();
        this._inactive.stop();
        activeFeedback = null;
        this._cancel();
        return this._inactive.force.bind(this._inactive)
    }
});
FeedbackEmitter.lock = function(deferred) {
    var lockInactive = activeFeedback ? activeFeedback.lockInactive() : _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"];
    deferred.done(lockInactive)
};
Object(_emitter_registrator__WEBPACK_IMPORTED_MODULE_7__["default"])({
    emitter: FeedbackEmitter,
    events: [ACTIVE_EVENT_NAME, INACTIVE_EVENT_NAME]
});
var lock = FeedbackEmitter.lock;



/***/ }),

/***/ "./node_modules/devextreme/esm/events/drag.js":
/*!****************************************************!*\
  !*** ./node_modules/devextreme/esm/events/drag.js ***!
  \****************************************************/
/*! exports provided: move, start, end, enter, leave, drop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "move", function() { return DRAG_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return DRAG_START_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "end", function() { return DRAG_END_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enter", function() { return DRAG_ENTER_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leave", function() { return DRAG_LEAVE_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drop", function() { return DROP_EVENT; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_element_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/element_data */ "./node_modules/devextreme/esm/core/element_data.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _core_event_registrator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/event_registrator */ "./node_modules/devextreme/esm/events/core/event_registrator.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _gesture_emitter_gesture__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./gesture/emitter.gesture */ "./node_modules/devextreme/esm/events/gesture/emitter.gesture.js");
/* harmony import */ var _core_emitter_registrator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/emitter_registrator */ "./node_modules/devextreme/esm/events/core/emitter_registrator.js");
/**
 * DevExtreme (esm/events/drag.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









var DRAG_START_EVENT = "dxdragstart";
var DRAG_EVENT = "dxdrag";
var DRAG_END_EVENT = "dxdragend";
var DRAG_ENTER_EVENT = "dxdragenter";
var DRAG_LEAVE_EVENT = "dxdragleave";
var DROP_EVENT = "dxdrop";
var DX_DRAG_EVENTS_COUNT_KEY = "dxDragEventsCount";
var knownDropTargets = [];
var knownDropTargetSelectors = [];
var knownDropTargetConfigs = [];
var dropTargetRegistration = {
    setup: function(element, data) {
        var knownDropTarget = -1 !== Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(element, knownDropTargets);
        if (!knownDropTarget) {
            knownDropTargets.push(element);
            knownDropTargetSelectors.push([]);
            knownDropTargetConfigs.push(data || {})
        }
    },
    add: function(element, handleObj) {
        var index = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(element, knownDropTargets);
        this.updateEventsCounter(element, handleObj.type, 1);
        var selector = handleObj.selector;
        if (-1 === Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(selector, knownDropTargetSelectors[index])) {
            knownDropTargetSelectors[index].push(selector)
        }
    },
    updateEventsCounter: function(element, event, value) {
        if ([DRAG_ENTER_EVENT, DRAG_LEAVE_EVENT, DROP_EVENT].indexOf(event) > -1) {
            var eventsCount = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["data"])(element, DX_DRAG_EVENTS_COUNT_KEY) || 0;
            Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["data"])(element, DX_DRAG_EVENTS_COUNT_KEY, Math.max(0, eventsCount + value))
        }
    },
    remove: function(element, handleObj) {
        this.updateEventsCounter(element, handleObj.type, -1)
    },
    teardown: function(element) {
        var handlersCount = Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["data"])(element, DX_DRAG_EVENTS_COUNT_KEY);
        if (!handlersCount) {
            var index = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(element, knownDropTargets);
            knownDropTargets.splice(index, 1);
            knownDropTargetSelectors.splice(index, 1);
            knownDropTargetConfigs.splice(index, 1);
            Object(_core_element_data__WEBPACK_IMPORTED_MODULE_1__["removeData"])(element, DX_DRAG_EVENTS_COUNT_KEY)
        }
    }
};
Object(_core_event_registrator__WEBPACK_IMPORTED_MODULE_5__["default"])(DRAG_ENTER_EVENT, dropTargetRegistration);
Object(_core_event_registrator__WEBPACK_IMPORTED_MODULE_5__["default"])(DRAG_LEAVE_EVENT, dropTargetRegistration);
Object(_core_event_registrator__WEBPACK_IMPORTED_MODULE_5__["default"])(DROP_EVENT, dropTargetRegistration);
var getItemDelegatedTargets = function($element) {
    var dropTargetIndex = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])($element.get(0), knownDropTargets);
    var dropTargetSelectors = knownDropTargetSelectors[dropTargetIndex].filter(selector => selector);
    var $delegatedTargets = $element.find(dropTargetSelectors.join(", "));
    if (-1 !== Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])(void 0, knownDropTargetSelectors[dropTargetIndex])) {
        $delegatedTargets = $delegatedTargets.add($element)
    }
    return $delegatedTargets
};
var getItemConfig = function($element) {
    var dropTargetIndex = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["inArray"])($element.get(0), knownDropTargets);
    return knownDropTargetConfigs[dropTargetIndex]
};
var getItemPosition = function(dropTargetConfig, $element) {
    if (dropTargetConfig.itemPositionFunc) {
        return dropTargetConfig.itemPositionFunc($element)
    } else {
        return $element.offset()
    }
};
var getItemSize = function(dropTargetConfig, $element) {
    if (dropTargetConfig.itemSizeFunc) {
        return dropTargetConfig.itemSizeFunc($element)
    }
    return {
        width: $element.get(0).getBoundingClientRect().width,
        height: $element.get(0).getBoundingClientRect().height
    }
};
var DragEmitter = _gesture_emitter_gesture__WEBPACK_IMPORTED_MODULE_7__["default"].inherit({
    ctor: function(element) {
        this.callBase(element);
        this.direction = "both"
    },
    _init: function(e) {
        this._initEvent = e
    },
    _start: function(e) {
        e = this._fireEvent(DRAG_START_EVENT, this._initEvent);
        this._maxLeftOffset = e.maxLeftOffset;
        this._maxRightOffset = e.maxRightOffset;
        this._maxTopOffset = e.maxTopOffset;
        this._maxBottomOffset = e.maxBottomOffset;
        var dropTargets = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["wrapToArray"])(e.targetElements || (null === e.targetElements ? [] : knownDropTargets));
        this._dropTargets = _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["map"](dropTargets, (function(element) {
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element).get(0)
        }))
    },
    _move: function(e) {
        var eventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["eventData"])(e);
        var dragOffset = this._calculateOffset(eventData);
        e = this._fireEvent(DRAG_EVENT, e, {
            offset: dragOffset
        });
        this._processDropTargets(e);
        if (!e._cancelPreventDefault) {
            e.preventDefault()
        }
    },
    _calculateOffset: function(eventData) {
        return {
            x: this._calculateXOffset(eventData),
            y: this._calculateYOffset(eventData)
        }
    },
    _calculateXOffset: function(eventData) {
        if ("vertical" !== this.direction) {
            var offset = eventData.x - this._startEventData.x;
            return this._fitOffset(offset, this._maxLeftOffset, this._maxRightOffset)
        }
        return 0
    },
    _calculateYOffset: function(eventData) {
        if ("horizontal" !== this.direction) {
            var offset = eventData.y - this._startEventData.y;
            return this._fitOffset(offset, this._maxTopOffset, this._maxBottomOffset)
        }
        return 0
    },
    _fitOffset: function(offset, minOffset, maxOffset) {
        if (null != minOffset) {
            offset = Math.max(offset, -minOffset)
        }
        if (null != maxOffset) {
            offset = Math.min(offset, maxOffset)
        }
        return offset
    },
    _processDropTargets: function(e) {
        var target = this._findDropTarget(e);
        var sameTarget = target === this._currentDropTarget;
        if (!sameTarget) {
            this._fireDropTargetEvent(e, DRAG_LEAVE_EVENT);
            this._currentDropTarget = target;
            this._fireDropTargetEvent(e, DRAG_ENTER_EVENT)
        }
    },
    _fireDropTargetEvent: function(event, eventName) {
        if (!this._currentDropTarget) {
            return
        }
        var eventData = {
            type: eventName,
            originalEvent: event,
            draggingElement: this._$element.get(0),
            target: this._currentDropTarget
        };
        Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["fireEvent"])(eventData)
    },
    _findDropTarget: function(e) {
        var that = this;
        var result;
        _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"](knownDropTargets, (function(_, target) {
            if (!that._checkDropTargetActive(target)) {
                return
            }
            var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(target);
            _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"](getItemDelegatedTargets($target), (function(_, delegatedTarget) {
                var $delegatedTarget = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(delegatedTarget);
                if (that._checkDropTarget(getItemConfig($target), $delegatedTarget, Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(result), e)) {
                    result = delegatedTarget
                }
            }))
        }));
        return result
    },
    _checkDropTargetActive: function(target) {
        var active = false;
        _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"](this._dropTargets, (function(_, activeTarget) {
            active = active || activeTarget === target || Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_4__["contains"])(activeTarget, target);
            return !active
        }));
        return active
    },
    _checkDropTarget: function(config, $target, $prevTarget, e) {
        var isDraggingElement = $target.get(0) === Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target).get(0);
        if (isDraggingElement) {
            return false
        }
        var targetPosition = getItemPosition(config, $target);
        if (e.pageX < targetPosition.left) {
            return false
        }
        if (e.pageY < targetPosition.top) {
            return false
        }
        var targetSize = getItemSize(config, $target);
        if (e.pageX > targetPosition.left + targetSize.width) {
            return false
        }
        if (e.pageY > targetPosition.top + targetSize.height) {
            return false
        }
        if ($prevTarget.length && $prevTarget.closest($target).length) {
            return false
        }
        if (config.checkDropTarget && !config.checkDropTarget($target, e)) {
            return false
        }
        return $target
    },
    _end: function(e) {
        var eventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["eventData"])(e);
        this._fireEvent(DRAG_END_EVENT, e, {
            offset: this._calculateOffset(eventData)
        });
        this._fireDropTargetEvent(e, DROP_EVENT);
        delete this._currentDropTarget
    }
});
Object(_core_emitter_registrator__WEBPACK_IMPORTED_MODULE_8__["default"])({
    emitter: DragEmitter,
    events: [DRAG_START_EVENT, DRAG_EVENT, DRAG_END_EVENT]
});



/***/ }),

/***/ "./node_modules/devextreme/esm/mobile/hide_callback.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/mobile/hide_callback.js ***!
  \*************************************************************/
/*! exports provided: hideCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideCallback", function() { return hideCallback; });
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/**
 * DevExtreme (esm/mobile/hide_callback.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var hideCallback = function() {
    var callbacks = [];
    return {
        add: function(callback) {
            var indexOfCallback = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_0__["inArray"])(callback, callbacks);
            if (-1 === indexOfCallback) {
                callbacks.push(callback)
            }
        },
        remove: function(callback) {
            var indexOfCallback = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_0__["inArray"])(callback, callbacks);
            if (-1 !== indexOfCallback) {
                callbacks.splice(indexOfCallback, 1)
            }
        },
        fire: function() {
            var callback = callbacks.pop();
            var result = !!callback;
            if (result) {
                callback()
            }
            return result
        },
        hasCallback: function() {
            return callbacks.length > 0
        }
    }
}();


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/overlay/overlay_drag.js":
/*!****************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/overlay/overlay_drag.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation_translator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../animation/translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _events_drag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../events/drag */ "./node_modules/devextreme/esm/events/drag.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/**
 * DevExtreme (esm/ui/overlay/overlay_drag.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */








var KEYBOARD_DRAG_STEP = 5;
class OverlayDrag {
    constructor(config) {
        this.init(config)
    }
    init(_ref) {
        var {
            dragEnabled: dragEnabled,
            handle: handle,
            draggableElement: draggableElement,
            positionController: positionController
        } = _ref;
        this._positionController = positionController;
        this._draggableElement = draggableElement;
        this._handle = handle;
        this._dragEnabled = dragEnabled;
        this.unsubscribe();
        if (!dragEnabled) {
            return
        }
        this.subscribe()
    }
    moveDown(e) {
        this._moveTo(KEYBOARD_DRAG_STEP, 0, e)
    }
    moveUp(e) {
        this._moveTo(-KEYBOARD_DRAG_STEP, 0, e)
    }
    moveLeft(e) {
        this._moveTo(0, -KEYBOARD_DRAG_STEP, e)
    }
    moveRight(e) {
        this._moveTo(0, KEYBOARD_DRAG_STEP, e)
    }
    subscribe() {
        var eventNames = this._getEventNames();
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__["default"].on(this._handle, eventNames.startEventName, e => {
            this._dragStartHandler(e)
        });
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__["default"].on(this._handle, eventNames.updateEventName, e => {
            this._dragUpdateHandler(e)
        });
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__["default"].on(this._handle, eventNames.endEventName, e => {
            this._dragEndHandler(e)
        })
    }
    unsubscribe() {
        var eventNames = this._getEventNames();
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__["default"].off(this._handle, eventNames.startEventName);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__["default"].off(this._handle, eventNames.updateEventName);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_5__["default"].off(this._handle, eventNames.endEventName)
    }
    _getEventNames() {
        var startEventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_7__["addNamespace"])(_events_drag__WEBPACK_IMPORTED_MODULE_6__["start"], "overlayDrag");
        var updateEventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_7__["addNamespace"])(_events_drag__WEBPACK_IMPORTED_MODULE_6__["move"], "overlayDrag");
        var endEventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_7__["addNamespace"])(_events_drag__WEBPACK_IMPORTED_MODULE_6__["end"], "overlayDrag");
        return {
            startEventName: startEventName,
            updateEventName: updateEventName,
            endEventName: endEventName
        }
    }
    _dragStartHandler(e) {
        var allowedOffsets = this._getAllowedOffsets();
        this._prevOffset = {
            x: 0,
            y: 0
        };
        e.targetElements = [];
        e.maxTopOffset = allowedOffsets.top;
        e.maxBottomOffset = allowedOffsets.bottom;
        e.maxLeftOffset = allowedOffsets.left;
        e.maxRightOffset = allowedOffsets.right
    }
    _dragUpdateHandler(e) {
        var targetOffset = {
            top: e.offset.y - this._prevOffset.y,
            left: e.offset.x - this._prevOffset.x
        };
        this._moveByOffset(targetOffset);
        this._prevOffset = e.offset
    }
    _dragEndHandler(event) {
        this._positionController.dragHandled();
        this._positionController.detectVisualPositionChange(event)
    }
    _moveTo(top, left, e) {
        if (!this._dragEnabled) {
            return
        }
        e.preventDefault();
        e.stopPropagation();
        var offset = this._fitOffsetIntoAllowedRange(top, left);
        this._moveByOffset(offset);
        this._dragEndHandler(e)
    }
    _fitOffsetIntoAllowedRange(top, left) {
        var allowedOffsets = this._getAllowedOffsets();
        return {
            top: Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["fitIntoRange"])(top, -allowedOffsets.top, allowedOffsets.bottom),
            left: Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_3__["fitIntoRange"])(left, -allowedOffsets.left, allowedOffsets.right)
        }
    }
    _getContainerDimensions() {
        var document = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getDocument();
        var container = this._positionController.$dragResizeContainer.get(0);
        var containerWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getOuterWidth"])(container);
        var containerHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getOuterHeight"])(container);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isWindow"])(container)) {
            containerHeight = Math.max(document.body.clientHeight, containerHeight);
            containerWidth = Math.max(document.body.clientWidth, containerWidth)
        }
        return {
            width: containerWidth,
            height: containerHeight
        }
    }
    _getContainerPosition() {
        var container = this._positionController.$dragResizeContainer.get(0);
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isWindow"])(container) ? {
            top: 0,
            left: 0
        } : Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getOffset"])(container)
    }
    _getElementPosition() {
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_2__["getOffset"])(this._draggableElement)
    }
    _getInnerDelta() {
        var containerDimensions = this._getContainerDimensions();
        var elementDimensions = this._getElementDimensions();
        return {
            x: containerDimensions.width - elementDimensions.width,
            y: containerDimensions.height - elementDimensions.height
        }
    }
    _getOuterDelta() {
        var {
            width: width,
            height: height
        } = this._getElementDimensions();
        var outsideDragFactor = this._positionController.outsideDragFactor;
        return {
            x: width * outsideDragFactor,
            y: height * outsideDragFactor
        }
    }
    _getFullDelta() {
        var fullDelta = this._getInnerDelta();
        var outerDelta = this._getOuterDelta();
        return {
            x: fullDelta.x + outerDelta.x,
            y: fullDelta.y + outerDelta.y
        }
    }
    _getElementDimensions() {
        return {
            width: this._draggableElement.offsetWidth,
            height: this._draggableElement.offsetHeight
        }
    }
    _getAllowedOffsets() {
        var fullDelta = this._getFullDelta();
        var isDragAllowed = fullDelta.y >= 0 && fullDelta.x >= 0;
        if (!isDragAllowed) {
            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        }
        var elementPosition = this._getElementPosition();
        var containerPosition = this._getContainerPosition();
        var outerDelta = this._getOuterDelta();
        return {
            top: elementPosition.top - containerPosition.top + outerDelta.y,
            bottom: -elementPosition.top + containerPosition.top + fullDelta.y,
            left: elementPosition.left - containerPosition.left + outerDelta.x,
            right: -elementPosition.left + containerPosition.left + fullDelta.x
        }
    }
    _moveByOffset(offset) {
        var currentPosition = Object(_animation_translator__WEBPACK_IMPORTED_MODULE_0__["locate"])(this._draggableElement);
        var newPosition = {
            left: currentPosition.left + offset.left,
            top: currentPosition.top + offset.top
        };
        Object(_animation_translator__WEBPACK_IMPORTED_MODULE_0__["move"])(this._draggableElement, newPosition)
    }
}
/* harmony default export */ __webpack_exports__["default"] = (OverlayDrag);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/overlay/overlay_position_controller.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/overlay/overlay_position_controller.js ***!
  \*******************************************************************************/
/*! exports provided: OVERLAY_POSITION_ALIASES, OverlayPositionController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OVERLAY_POSITION_ALIASES", function() { return OVERLAY_POSITION_ALIASES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverlayPositionController", function() { return OverlayPositionController; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _animation_position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../animation/position */ "./node_modules/devextreme/esm/animation/position.js");
/* harmony import */ var _animation_translator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../animation/translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_view_port__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/view_port */ "./node_modules/devextreme/esm/core/utils/view_port.js");
/**
 * DevExtreme (esm/ui/overlay/overlay_position_controller.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_5__["getWindow"])();
var OVERLAY_POSITION_ALIASES = {
    top: {
        my: "top center",
        at: "top center"
    },
    bottom: {
        my: "bottom center",
        at: "bottom center"
    },
    right: {
        my: "right center",
        at: "right center"
    },
    left: {
        my: "left center",
        at: "left center"
    },
    center: {
        my: "center",
        at: "center"
    },
    "right bottom": {
        my: "right bottom",
        at: "right bottom"
    },
    "right top": {
        my: "right top",
        at: "right top"
    },
    "left bottom": {
        my: "left bottom",
        at: "left bottom"
    },
    "left top": {
        my: "left top",
        at: "left top"
    }
};
var OVERLAY_DEFAULT_BOUNDARY_OFFSET = {
    h: 0,
    v: 0
};
class OverlayPositionController {
    constructor(_ref) {
        var {
            position: position,
            target: target,
            container: container,
            $root: $root,
            $content: $content,
            $wrapper: $wrapper,
            onPositioned: onPositioned,
            onVisualPositionChanged: onVisualPositionChanged,
            dragOutsideBoundary: dragOutsideBoundary,
            dragAndResizeArea: dragAndResizeArea,
            outsideDragFactor: outsideDragFactor,
            restorePosition: restorePosition,
            _fixWrapperPosition: _fixWrapperPosition
        } = _ref;
        this._props = {
            position: position,
            target: target,
            container: container,
            dragOutsideBoundary: dragOutsideBoundary,
            dragAndResizeArea: dragAndResizeArea,
            outsideDragFactor: outsideDragFactor,
            restorePosition: restorePosition,
            onPositioned: onPositioned,
            onVisualPositionChanged: onVisualPositionChanged,
            _fixWrapperPosition: _fixWrapperPosition
        };
        this._$root = $root;
        this._$content = $content;
        this._$wrapper = $wrapper;
        this._$markupContainer = void 0;
        this._$wrapperCoveredElement = void 0;
        this._shouldRenderContentInitialPosition = true;
        this._visualPosition = void 0;
        this._initialPosition = void 0;
        this._previousVisualPosition = void 0;
        this._$dragResizeContainer = void 0;
        this._outsideDragFactor = void 0;
        this.updateContainer(container);
        this.updatePosition(position, target);
        this._updateDragResizeContainer();
        this._updateOutsideDragFactor()
    }
    get $container() {
        return this._$markupContainer
    }
    get $dragResizeContainer() {
        return this._$dragResizeContainer
    }
    get outsideDragFactor() {
        return this._outsideDragFactor
    }
    set fixWrapperPosition(fixWrapperPosition) {
        this._props._fixWrapperPosition = fixWrapperPosition;
        this.styleWrapperPosition()
    }
    set dragAndResizeArea(dragAndResizeArea) {
        this._props.dragAndResizeArea = dragAndResizeArea;
        this._updateDragResizeContainer()
    }
    set dragOutsideBoundary(dragOutsideBoundary) {
        this._props.dragOutsideBoundary = dragOutsideBoundary;
        this._updateDragResizeContainer();
        this._updateOutsideDragFactor()
    }
    set outsideDragFactor(outsideDragFactor) {
        this._props.outsideDragFactor = outsideDragFactor;
        this._updateOutsideDragFactor()
    }
    set restorePosition(restorePosition) {
        this._props.restorePosition = restorePosition
    }
    restorePositionOnNextRender(value) {
        this._shouldRenderContentInitialPosition = value || !this._visualPosition
    }
    openingHandled() {
        var shouldRestorePosition = this._props.restorePosition;
        this.restorePositionOnNextRender(shouldRestorePosition)
    }
    dragHandled() {
        this.restorePositionOnNextRender(false)
    }
    resizeHandled() {
        this.restorePositionOnNextRender(false)
    }
    updateTarget(target) {
        this._props.target = target;
        this.updatePosition(this._props.position, target)
    }
    updatePosition(positionProp) {
        var targetProp = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._props.target;
        this._props.position = positionProp;
        this._position = this._normalizePosition(positionProp, targetProp);
        this._updateWrapperCoveredElement()
    }
    updateContainer(containerProp) {
        this._props.container = containerProp;
        var container = null !== containerProp && void 0 !== containerProp ? containerProp : Object(_core_utils_view_port__WEBPACK_IMPORTED_MODULE_6__["value"])();
        var $container = this._$root.closest(container);
        if (!$container.length) {
            $container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(container).first()
        }
        this._$markupContainer = $container.length ? $container : this._$root.parent();
        this._updateWrapperCoveredElement();
        this._updateDragResizeContainer()
    }
    detectVisualPositionChange(event) {
        this._updateVisualPositionValue();
        this._raisePositionedEvents(event)
    }
    positionContent() {
        if (this._shouldRenderContentInitialPosition) {
            this._renderContentInitialPosition()
        } else {
            Object(_animation_translator__WEBPACK_IMPORTED_MODULE_4__["move"])(this._$content, this._visualPosition);
            this.detectVisualPositionChange()
        }
    }
    positionWrapper() {
        if (this._$wrapperCoveredElement) {
            _animation_position__WEBPACK_IMPORTED_MODULE_3__["default"].setup(this._$wrapper, {
                my: "top left",
                at: "top left",
                of: this._$wrapperCoveredElement
            })
        }
    }
    isAllWindowCoveredByWrapper() {
        return !this._$wrapperCoveredElement || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isWindow"])(this._$wrapperCoveredElement.get(0))
    }
    styleWrapperPosition() {
        var useFixed = this.isAllWindowCoveredByWrapper() || this._props._fixWrapperPosition;
        var positionStyle = useFixed ? "fixed" : "absolute";
        this._$wrapper.css("position", positionStyle)
    }
    _updateVisualPositionValue() {
        this._previousVisualPosition = this._visualPosition;
        this._visualPosition = Object(_animation_translator__WEBPACK_IMPORTED_MODULE_4__["locate"])(this._$content)
    }
    _renderContentInitialPosition() {
        this._renderBoundaryOffset();
        Object(_animation_translator__WEBPACK_IMPORTED_MODULE_4__["resetPosition"])(this._$content);
        var wrapperOverflow = this._$wrapper.css("overflow");
        this._$wrapper.css("overflow", "hidden");
        var resultPosition = _animation_position__WEBPACK_IMPORTED_MODULE_3__["default"].setup(this._$content, this._position);
        this._$wrapper.css("overflow", wrapperOverflow);
        this._initialPosition = resultPosition;
        this.detectVisualPositionChange()
    }
    _raisePositionedEvents(event) {
        var previousPosition = this._previousVisualPosition;
        var newPosition = this._visualPosition;
        var isVisualPositionChanged = (null === previousPosition || void 0 === previousPosition ? void 0 : previousPosition.top) !== newPosition.top || (null === previousPosition || void 0 === previousPosition ? void 0 : previousPosition.left) !== newPosition.left;
        if (isVisualPositionChanged) {
            this._props.onVisualPositionChanged({
                previousPosition: previousPosition,
                position: newPosition,
                event: event
            })
        }
        this._props.onPositioned({
            position: this._initialPosition
        })
    }
    _updateOutsideDragFactor() {
        this._outsideDragFactor = this._getOutsideDragFactor()
    }
    _getOutsideDragFactor() {
        if (this._props.dragOutsideBoundary) {
            return 1
        }
        return this._props.outsideDragFactor
    }
    _updateDragResizeContainer() {
        this._$dragResizeContainer = this._getDragResizeContainer()
    }
    _getDragResizeContainer() {
        if (this._props.dragOutsideBoundary) {
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(window)
        }
        if (this._props.dragAndResizeArea) {
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(this._props.dragAndResizeArea)
        }
        var isContainerDefined = Object(_core_utils_view_port__WEBPACK_IMPORTED_MODULE_6__["originalViewPort"])().get(0) || this._props.container;
        return isContainerDefined ? this._$markupContainer : Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(window)
    }
    _updateWrapperCoveredElement() {
        this._$wrapperCoveredElement = this._getWrapperCoveredElement()
    }
    _renderBoundaryOffset() {
        var _this$_position;
        var boundaryOffset = null !== (_this$_position = this._position) && void 0 !== _this$_position ? _this$_position : {
            boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
        };
        this._$content.css("margin", "".concat(boundaryOffset.v, "px ").concat(boundaryOffset.h, "px"))
    }
    _getWrapperCoveredElement() {
        var containerProp = this._props.container;
        if (containerProp) {
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(containerProp)
        }
        if (this._position) {
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isEvent"])(this._position.of) ? window : this._position.of || window)
        }
    }
    _normalizePosition(positionProp, targetProp) {
        var defaultPositionConfig = {
            of: targetProp,
            boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
        };
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(positionProp)) {
            return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, defaultPositionConfig, this._positionToObject(positionProp))
        } else {
            return defaultPositionConfig
        }
    }
    _positionToObject(position) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isString"])(position)) {
            return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, OVERLAY_POSITION_ALIASES[position])
        }
        return position
    }
}



/***/ }),

/***/ "./node_modules/devextreme/esm/ui/overlay/ui.overlay.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/overlay/ui.overlay.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _animation_fx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../animation/fx */ "./node_modules/devextreme/esm/animation/fx.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_templates_empty_template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/templates/empty_template */ "./node_modules/devextreme/esm/core/templates/empty_template.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../core/utils/ready_callbacks */ "./node_modules/devextreme/esm/core/utils/ready_callbacks.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_view_port__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../core/utils/view_port */ "./node_modules/devextreme/esm/core/utils/view_port.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_errors__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../core/errors */ "./node_modules/devextreme/esm/core/errors.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _events_drag__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../events/drag */ "./node_modules/devextreme/esm/events/drag.js");
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../events/pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/* harmony import */ var _events_short__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../events/short */ "./node_modules/devextreme/esm/events/short.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_visibility_change__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../events/visibility_change */ "./node_modules/devextreme/esm/events/visibility_change.js");
/* harmony import */ var _mobile_hide_callback__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../mobile/hide_callback */ "./node_modules/devextreme/esm/mobile/hide_callback.js");
/* harmony import */ var _resizable__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../resizable */ "./node_modules/devextreme/esm/ui/resizable.js");
/* harmony import */ var _overlay_drag__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./overlay_drag */ "./node_modules/devextreme/esm/ui/overlay/overlay_drag.js");
/* harmony import */ var _widget_selectors__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../widget/selectors */ "./node_modules/devextreme/esm/ui/widget/selectors.js");
/* harmony import */ var _widget_swatch_container__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../widget/swatch_container */ "./node_modules/devextreme/esm/ui/widget/swatch_container.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _core_utils_browser__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../core/utils/browser */ "./node_modules/devextreme/esm/core/utils/browser.js");
/* harmony import */ var _z_index__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./z_index */ "./node_modules/devextreme/esm/ui/overlay/z_index.js");
/* harmony import */ var _core_resize_observer__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../../core/resize_observer */ "./node_modules/devextreme/esm/core/resize_observer.js");
/* harmony import */ var _overlay_position_controller__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./overlay_position_controller */ "./node_modules/devextreme/esm/ui/overlay/overlay_position_controller.js");
/**
 * DevExtreme (esm/ui/overlay/ui.overlay.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



































var ready = _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_14__["default"].add;
var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_17__["getWindow"])();
var viewPortChanged = _core_utils_view_port__WEBPACK_IMPORTED_MODULE_16__["changeCallback"];
var OVERLAY_CLASS = "dx-overlay";
var OVERLAY_WRAPPER_CLASS = "dx-overlay-wrapper";
var OVERLAY_CONTENT_CLASS = "dx-overlay-content";
var OVERLAY_SHADER_CLASS = "dx-overlay-shader";
var OVERLAY_MODAL_CLASS = "dx-overlay-modal";
var INNER_OVERLAY_CLASS = "dx-inner-overlay";
var INVISIBLE_STATE_CLASS = "dx-state-invisible";
var ANONYMOUS_TEMPLATE_NAME = "content";
var RTL_DIRECTION_CLASS = "dx-rtl";
var ACTIONS = ["onShowing", "onShown", "onHiding", "onHidden", "onPositioned", "onResizeStart", "onResize", "onResizeEnd", "onVisualPositionChanged"];
var OVERLAY_STACK = [];
var PREVENT_SAFARI_SCROLLING_CLASS = "dx-prevent-safari-scrolling";
var TAB_KEY = "tab";
ready(() => {
    _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__["default"].subscribeGlobal(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__["default"].getDocument(), _events_pointer__WEBPACK_IMPORTED_MODULE_21__["default"].down, e => {
        for (var i = OVERLAY_STACK.length - 1; i >= 0; i--) {
            if (!OVERLAY_STACK[i]._proxiedDocumentDownHandler(e)) {
                return
            }
        }
    })
});
var Overlay = _widget_ui_widget__WEBPACK_IMPORTED_MODULE_30__["default"].inherit({
    _supportedKeys: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_12__["extend"])(this.callBase(), {
            escape: function() {
                this.hide()
            },
            upArrow: e => {
                this._drag.moveUp(e)
            },
            downArrow: e => {
                this._drag.moveDown(e)
            },
            leftArrow: e => {
                this._drag.moveLeft(e)
            },
            rightArrow: e => {
                this._drag.moveRight(e)
            }
        })
    },
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_12__["extend"])(this.callBase(), {
            activeStateEnabled: false,
            visible: false,
            deferRendering: true,
            shading: true,
            shadingColor: "",
            wrapperAttr: {},
            position: Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_12__["extend"])({}, _overlay_position_controller__WEBPACK_IMPORTED_MODULE_34__["OVERLAY_POSITION_ALIASES"].center),
            width: "80vw",
            minWidth: null,
            maxWidth: null,
            height: "80vh",
            minHeight: null,
            maxHeight: null,
            animation: {
                show: {
                    type: "pop",
                    duration: 300,
                    from: {
                        scale: .55
                    }
                },
                hide: {
                    type: "pop",
                    duration: 300,
                    to: {
                        opacity: 0,
                        scale: .55
                    },
                    from: {
                        opacity: 1,
                        scale: 1
                    }
                }
            },
            dragOutsideBoundary: false,
            closeOnOutsideClick: false,
            copyRootClassesToWrapper: false,
            _ignoreCopyRootClassesToWrapperDeprecation: false,
            onShowing: null,
            onShown: null,
            onHiding: null,
            onHidden: null,
            contentTemplate: "content",
            dragEnabled: false,
            dragAndResizeArea: void 0,
            outsideDragFactor: 0,
            resizeEnabled: false,
            onResizeStart: null,
            onResize: null,
            onResizeEnd: null,
            innerOverlay: false,
            restorePosition: true,
            target: void 0,
            container: void 0,
            hideTopOverlayHandler: () => {
                this.hide()
            },
            hideOnParentScroll: false,
            onPositioned: null,
            propagateOutsideClick: false,
            ignoreChildEvents: true,
            _checkParentVisibility: true,
            _fixWrapperPosition: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return !Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_17__["hasWindow"])()
            },
            options: {
                width: null,
                height: null,
                animation: null,
                _checkParentVisibility: false
            }
        }])
    },
    _setOptionsByReference: function() {
        this.callBase();
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_12__["extend"])(this._optionsByReference, {
            animation: true
        })
    },
    $wrapper: function() {
        return this._$wrapper
    },
    _eventBindingTarget: function() {
        return this._$content
    },
    _setDeprecatedOptions() {
        this.callBase();
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_12__["extend"])(this._deprecatedOptions, {
            elementAttr: {
                since: "21.2",
                message: 'Use the "wrapperAttr" option instead'
            }
        })
    },
    ctor: function(element, options) {
        this.callBase(element, options);
        if (options && options.copyRootClassesToWrapper && !options._ignoreCopyRootClassesToWrapperDeprecation) {
            _core_errors__WEBPACK_IMPORTED_MODULE_18__["default"].log("W0001", this.NAME, "copyRootClassesToWrapper", "21.2", 'Use the "wrapperAttr" option instead')
        }
    },
    _init: function() {
        this.callBase();
        this._initActions();
        this._initCloseOnOutsideClickHandler();
        this._initTabTerminatorHandler();
        this._customWrapperClass = null;
        this._$wrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_6__["default"])("<div>").addClass(OVERLAY_WRAPPER_CLASS);
        this._$content = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_6__["default"])("<div>").addClass(OVERLAY_CONTENT_CLASS);
        this._initInnerOverlayClass();
        var $element = this.$element();
        if (this.option("copyRootClassesToWrapper")) {
            this._$wrapper.addClass($element.attr("class"))
        }
        $element.addClass(OVERLAY_CLASS);
        this._$wrapper.attr("data-bind", "dxControlsDescendantBindings: true");
        this._toggleViewPortSubscription(true);
        this._initHideTopOverlayHandler(this.option("hideTopOverlayHandler"));
        this._parentsScrollSubscriptionInfo = {
            handler: e => {
                this._hideOnParentsScrollHandler(e)
            }
        };
        this._updateResizeCallbackSkipCondition();
        this.warnPositionAsFunction()
    },
    warnPositionAsFunction() {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_15__["isFunction"])(this.option("position"))) {
            _core_errors__WEBPACK_IMPORTED_MODULE_18__["default"].log("W0018")
        }
    },
    _initOptions: function(options) {
        this._setAnimationTarget(options.target);
        this.callBase(options)
    },
    _initInnerOverlayClass: function() {
        this._$content.toggleClass(INNER_OVERLAY_CLASS, this.option("innerOverlay"))
    },
    _setAnimationTarget: function(target) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_15__["isDefined"])(target)) {
            return
        }
        var options = this.option();
        ["animation.show.from.position.of", "animation.show.to.position.of", "animation.hide.from.position.of", "animation.hide.to.position.of"].forEach(path => {
            var pathParts = path.split(".");
            var option = options;
            while (option) {
                if (1 === pathParts.length) {
                    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_15__["isPlainObject"])(option)) {
                        option[pathParts.shift()] = target
                    }
                    break
                } else {
                    option = option[pathParts.shift()]
                }
            }
        })
    },
    _initHideTopOverlayHandler: function(handler) {
        this._hideTopOverlayHandler = handler
    },
    _initActions: function() {
        this._actions = {};
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_13__["each"])(ACTIONS, (_, action) => {
            this._actions[action] = this._createActionByOption(action, {
                excludeValidators: ["disabled", "readOnly"]
            }) || _core_utils_common__WEBPACK_IMPORTED_MODULE_9__["noop"]
        })
    },
    _initCloseOnOutsideClickHandler: function() {
        var _this = this;
        this._proxiedDocumentDownHandler = function() {
            return _this._documentDownHandler(...arguments)
        }
    },
    _areContentDimensionsRendered: function(entry) {
        var _entry$contentBoxSize, _this$_renderedDimens3, _this$_renderedDimens4;
        var contentBox = null === (_entry$contentBoxSize = entry.contentBoxSize) || void 0 === _entry$contentBoxSize ? void 0 : _entry$contentBoxSize[0];
        if (contentBox) {
            var _this$_renderedDimens, _this$_renderedDimens2;
            return parseInt(contentBox.inlineSize, 10) === (null === (_this$_renderedDimens = this._renderedDimensions) || void 0 === _this$_renderedDimens ? void 0 : _this$_renderedDimens.width) && parseInt(contentBox.blockSize, 10) === (null === (_this$_renderedDimens2 = this._renderedDimensions) || void 0 === _this$_renderedDimens2 ? void 0 : _this$_renderedDimens2.height)
        }
        var contentRect = entry.contentRect;
        return parseInt(contentRect.width, 10) === (null === (_this$_renderedDimens3 = this._renderedDimensions) || void 0 === _this$_renderedDimens3 ? void 0 : _this$_renderedDimens3.width) && parseInt(contentRect.height, 10) === (null === (_this$_renderedDimens4 = this._renderedDimensions) || void 0 === _this$_renderedDimens4 ? void 0 : _this$_renderedDimens4.height)
    },
    _contentResizeHandler: function(entry) {
        if (!this._shouldSkipContentResize(entry)) {
            this._renderGeometry({
                shouldOnlyReposition: true
            })
        }
    },
    _updateResizeCallbackSkipCondition() {
        var doesShowAnimationChangeDimensions = this._doesShowAnimationChangeDimensions();
        this._shouldSkipContentResize = entry => doesShowAnimationChangeDimensions && this._showAnimationProcessing || this._areContentDimensionsRendered(entry)
    },
    _doesShowAnimationChangeDimensions: function() {
        var animation = this.option("animation");
        return ["to", "from"].some(prop => {
            var _animation$show;
            var config = null === animation || void 0 === animation ? void 0 : null === (_animation$show = animation.show) || void 0 === _animation$show ? void 0 : _animation$show[prop];
            return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_15__["isObject"])(config) && ("width" in config || "height" in config)
        })
    },
    _observeContentResize: function(shouldObserve) {
        if (!this.option("useResizeObserver")) {
            return
        }
        var contentElement = this._$content.get(0);
        if (shouldObserve) {
            _core_resize_observer__WEBPACK_IMPORTED_MODULE_33__["default"].observe(contentElement, entry => {
                this._contentResizeHandler(entry)
            })
        } else {
            _core_resize_observer__WEBPACK_IMPORTED_MODULE_33__["default"].unobserve(contentElement)
        }
    },
    _initMarkup() {
        this.callBase();
        this._renderWrapperAttributes();
        this._initPositionController()
    },
    _documentDownHandler: function(e) {
        if (this._showAnimationProcessing) {
            this._stopAnimation()
        }
        var closeOnOutsideClick = this.option("closeOnOutsideClick");
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_15__["isFunction"])(closeOnOutsideClick)) {
            closeOnOutsideClick = closeOnOutsideClick(e)
        }
        var isAttachedTarget = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_6__["default"])(window.document).is(e.target) || Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_11__["contains"])(window.document, e.target);
        var isInnerOverlay = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_6__["default"])(e.target).closest(".".concat(INNER_OVERLAY_CLASS)).length;
        var outsideClick = isAttachedTarget && !isInnerOverlay && !(this._$content.is(e.target) || Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_11__["contains"])(this._$content.get(0), e.target));
        if (outsideClick && closeOnOutsideClick) {
            this._outsideClickHandler(e)
        }
        return this.option("propagateOutsideClick")
    },
    _outsideClickHandler(e) {
        if (this.option("shading")) {
            e.preventDefault()
        }
        this.hide()
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates({
            content: new _core_templates_empty_template__WEBPACK_IMPORTED_MODULE_7__["EmptyTemplate"]
        });
        this.callBase()
    },
    _isTopOverlay: function() {
        var overlayStack = this._overlayStack();
        for (var i = overlayStack.length - 1; i >= 0; i--) {
            var tabbableElements = overlayStack[i]._findTabbableBounds();
            if (tabbableElements.first || tabbableElements.last) {
                return overlayStack[i] === this
            }
        }
        return false
    },
    _overlayStack: function() {
        return OVERLAY_STACK
    },
    _zIndexInitValue: function() {
        return Overlay.baseZIndex()
    },
    _toggleViewPortSubscription: function(toggle) {
        var _this2 = this;
        viewPortChanged.remove(this._viewPortChangeHandle);
        if (toggle) {
            this._viewPortChangeHandle = function() {
                _this2._viewPortChangeHandler(...arguments)
            };
            viewPortChanged.add(this._viewPortChangeHandle)
        }
    },
    _viewPortChangeHandler: function() {
        this._positionController.updateContainer(this.option("container"));
        this._refresh()
    },
    _renderWrapperAttributes() {
        var {
            wrapperAttr: wrapperAttr
        } = this.option();
        var attributes = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_12__["extend"])({}, wrapperAttr);
        var classNames = attributes.class;
        delete attributes.class;
        this.$wrapper().attr(attributes).removeClass(this._customWrapperClass).addClass(classNames);
        this._customWrapperClass = classNames
    },
    _renderVisibilityAnimate: function(visible) {
        this._observeContentResize(visible);
        this._stopAnimation();
        return visible ? this._show() : this._hide()
    },
    _getAnimationConfig: function() {
        return this._getOptionValue("animation", this)
    },
    _animateShowing: function() {
        var _this$_getAnimationCo, _showAnimation$start, _showAnimation$comple, _this3 = this;
        var animation = null !== (_this$_getAnimationCo = this._getAnimationConfig()) && void 0 !== _this$_getAnimationCo ? _this$_getAnimationCo : {};
        var showAnimation = this._normalizeAnimation(animation.show, "to");
        var startShowAnimation = null !== (_showAnimation$start = null === showAnimation || void 0 === showAnimation ? void 0 : showAnimation.start) && void 0 !== _showAnimation$start ? _showAnimation$start : _core_utils_common__WEBPACK_IMPORTED_MODULE_9__["noop"];
        var completeShowAnimation = null !== (_showAnimation$comple = null === showAnimation || void 0 === showAnimation ? void 0 : showAnimation.complete) && void 0 !== _showAnimation$comple ? _showAnimation$comple : _core_utils_common__WEBPACK_IMPORTED_MODULE_9__["noop"];
        this._animate(showAnimation, (function() {
            if (_this3._isAnimationPaused) {
                return
            }
            if (_this3.option("focusStateEnabled")) {
                _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__["default"].trigger(_this3._focusTarget(), "focus")
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key]
            }
            completeShowAnimation.call(_this3, ...args);
            _this3._showAnimationProcessing = false;
            _this3._isHidden = false;
            _this3._actions.onShown();
            _this3._toggleSafariScrolling();
            _this3._showingDeferred.resolve()
        }), (function() {
            if (_this3._isAnimationPaused) {
                return
            }
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2]
            }
            startShowAnimation.call(_this3, ...args);
            _this3._showAnimationProcessing = true
        }))
    },
    _show: function() {
        this._showingDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["Deferred"];
        this._parentHidden = this._isParentHidden();
        this._showingDeferred.done(() => {
            delete this._parentHidden
        });
        if (this._parentHidden) {
            this._isHidden = true;
            return this._showingDeferred.resolve()
        }
        if (this._currentVisible) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["Deferred"]).resolve().promise()
        }
        this._currentVisible = true;
        if (this._isHidingActionCanceled) {
            delete this._isHidingActionCanceled;
            this._showingDeferred.resolve()
        } else {
            var show = () => {
                this._renderVisibility(true);
                if (this._isShowingActionCanceled) {
                    delete this._isShowingActionCanceled;
                    this._showingDeferred.resolve();
                    return
                }
                this._animateShowing()
            };
            if (this.option("templatesRenderAsynchronously")) {
                this._stopShowTimer();
                this._asyncShowTimeout = setTimeout(show)
            } else {
                show()
            }
        }
        return this._showingDeferred.promise()
    },
    _normalizeAnimation: function(animation, prop) {
        if (animation) {
            animation = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_12__["extend"])({
                type: "slide",
                skipElementInitialStyles: true
            }, animation);
            if (animation[prop] && "object" === typeof animation[prop]) {
                Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_12__["extend"])(animation[prop], {
                    position: this._positionController._position
                })
            }
        }
        return animation
    },
    _animateHiding: function() {
        var _this$_getAnimationCo2, _hideAnimation$start, _hideAnimation$comple, _this4 = this;
        var animation = null !== (_this$_getAnimationCo2 = this._getAnimationConfig()) && void 0 !== _this$_getAnimationCo2 ? _this$_getAnimationCo2 : {};
        var hideAnimation = this._normalizeAnimation(animation.hide, "from");
        var startHideAnimation = null !== (_hideAnimation$start = null === hideAnimation || void 0 === hideAnimation ? void 0 : hideAnimation.start) && void 0 !== _hideAnimation$start ? _hideAnimation$start : _core_utils_common__WEBPACK_IMPORTED_MODULE_9__["noop"];
        var completeHideAnimation = null !== (_hideAnimation$comple = null === hideAnimation || void 0 === hideAnimation ? void 0 : hideAnimation.complete) && void 0 !== _hideAnimation$comple ? _hideAnimation$comple : _core_utils_common__WEBPACK_IMPORTED_MODULE_9__["noop"];
        this._animate(hideAnimation, (function() {
            var _this4$_actions;
            _this4._$content.css("pointerEvents", "");
            _this4._renderVisibility(false);
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3]
            }
            completeHideAnimation.call(_this4, ...args);
            _this4._hideAnimationProcessing = false;
            null === (_this4$_actions = _this4._actions) || void 0 === _this4$_actions ? void 0 : _this4$_actions.onHidden();
            _this4._hidingDeferred.resolve()
        }), (function() {
            _this4._$content.css("pointerEvents", "none");
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4]
            }
            startHideAnimation.call(_this4, ...args);
            _this4._hideAnimationProcessing = true
        }))
    },
    _hide: function() {
        if (!this._currentVisible) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["Deferred"]).resolve().promise()
        }
        this._currentVisible = false;
        this._hidingDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["Deferred"];
        var hidingArgs = {
            cancel: false
        };
        if (this._isShowingActionCanceled) {
            this._hidingDeferred.resolve()
        } else {
            this._actions.onHiding(hidingArgs);
            this._toggleSafariScrolling();
            if (hidingArgs.cancel) {
                this._isHidingActionCanceled = true;
                this.option("visible", true);
                this._hidingDeferred.resolve()
            } else {
                this._forceFocusLost();
                this._toggleShading(false);
                this._toggleSubscriptions(false);
                this._stopShowTimer();
                this._animateHiding()
            }
        }
        return this._hidingDeferred.promise()
    },
    _forceFocusLost: function() {
        var activeElement = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__["default"].getActiveElement();
        var shouldResetActiveElement = !!this._$content.find(activeElement).length;
        if (shouldResetActiveElement) {
            Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_11__["resetActiveElement"])()
        }
    },
    _animate: function(animation, completeCallback, startCallback) {
        if (animation) {
            startCallback = startCallback || animation.start || _core_utils_common__WEBPACK_IMPORTED_MODULE_9__["noop"];
            _animation_fx__WEBPACK_IMPORTED_MODULE_1__["default"].animate(this._$content, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_12__["extend"])({}, animation, {
                start: startCallback,
                complete: completeCallback
            }))
        } else {
            completeCallback()
        }
    },
    _stopAnimation: function() {
        _animation_fx__WEBPACK_IMPORTED_MODULE_1__["default"].stop(this._$content, true)
    },
    _renderVisibility: function(visible) {
        if (visible && this._isParentHidden()) {
            return
        }
        this._currentVisible = visible;
        this._stopAnimation();
        if (!visible) {
            Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_24__["triggerHidingEvent"])(this._$content)
        }
        this._toggleVisibility(visible);
        this._$content.toggleClass(INVISIBLE_STATE_CLASS, !visible);
        this._updateZIndexStackPosition(visible);
        if (visible) {
            this._positionController.openingHandled();
            this._renderContent();
            var showingArgs = {
                cancel: false
            };
            this._actions.onShowing(showingArgs);
            if (showingArgs.cancel) {
                this._toggleVisibility(false);
                this._$content.toggleClass(INVISIBLE_STATE_CLASS, true);
                this._updateZIndexStackPosition(false);
                this._moveFromContainer();
                this._isShowingActionCanceled = true;
                this.option("visible", false);
                return
            }
            this._moveToContainer();
            this._renderGeometry();
            Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_24__["triggerShownEvent"])(this._$content);
            Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_24__["triggerResizeEvent"])(this._$content)
        } else {
            this._moveFromContainer()
        }
        this._toggleShading(visible);
        this._toggleSubscriptions(visible)
    },
    _updateZIndexStackPosition: function(pushToStack) {
        var overlayStack = this._overlayStack();
        var index = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_8__["inArray"])(this, overlayStack);
        if (pushToStack) {
            if (-1 === index) {
                this._zIndex = _z_index__WEBPACK_IMPORTED_MODULE_32__["create"](this._zIndexInitValue());
                overlayStack.push(this)
            }
            this._$wrapper.css("zIndex", this._zIndex);
            this._$content.css("zIndex", this._zIndex)
        } else if (-1 !== index) {
            overlayStack.splice(index, 1);
            _z_index__WEBPACK_IMPORTED_MODULE_32__["remove"](this._zIndex)
        }
    },
    _toggleShading: function(visible) {
        this._$wrapper.toggleClass(OVERLAY_MODAL_CLASS, this.option("shading") && !this.option("container"));
        this._$wrapper.toggleClass(OVERLAY_SHADER_CLASS, visible && this.option("shading"));
        this._$wrapper.css("backgroundColor", this.option("shading") ? this.option("shadingColor") : "");
        this._toggleTabTerminator(visible && this.option("shading"))
    },
    _initTabTerminatorHandler: function() {
        var _this5 = this;
        this._proxiedTabTerminatorHandler = function() {
            _this5._tabKeyHandler(...arguments)
        }
    },
    _toggleTabTerminator: function(enabled) {
        var eventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_23__["addNamespace"])("keydown", this.NAME);
        if (enabled) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__["default"].on(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__["default"].getDocument(), eventName, this._proxiedTabTerminatorHandler)
        } else {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__["default"].off(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__["default"].getDocument(), eventName, this._proxiedTabTerminatorHandler)
        }
    },
    _findTabbableBounds: function() {
        var $elements = this._$wrapper.find("*");
        var elementsCount = $elements.length - 1;
        var result = {
            first: null,
            last: null
        };
        for (var i = 0; i <= elementsCount; i++) {
            if (!result.first && $elements.eq(i).is(_widget_selectors__WEBPACK_IMPORTED_MODULE_28__["tabbable"])) {
                result.first = $elements.eq(i)
            }
            if (!result.last && $elements.eq(elementsCount - i).is(_widget_selectors__WEBPACK_IMPORTED_MODULE_28__["tabbable"])) {
                result.last = $elements.eq(elementsCount - i)
            }
            if (result.first && result.last) {
                break
            }
        }
        return result
    },
    _tabKeyHandler: function(e) {
        if (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_23__["normalizeKeyName"])(e) !== TAB_KEY || !this._isTopOverlay()) {
            return
        }
        var tabbableElements = this._findTabbableBounds();
        var $firstTabbable = tabbableElements.first;
        var $lastTabbable = tabbableElements.last;
        var isTabOnLast = !e.shiftKey && e.target === $lastTabbable.get(0);
        var isShiftTabOnFirst = e.shiftKey && e.target === $firstTabbable.get(0);
        var isEmptyTabList = 0 === tabbableElements.length;
        var isOutsideTarget = !Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_11__["contains"])(this._$wrapper.get(0), e.target);
        if (isTabOnLast || isShiftTabOnFirst || isEmptyTabList || isOutsideTarget) {
            e.preventDefault();
            var $focusElement = e.shiftKey ? $lastTabbable : $firstTabbable;
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__["default"].trigger($focusElement, "focusin");
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__["default"].trigger($focusElement, "focus")
        }
    },
    _toggleSubscriptions: function(enabled) {
        if (Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_17__["hasWindow"])()) {
            this._toggleHideTopOverlayCallback(enabled);
            this._toggleHideOnParentsScrollSubscription(enabled)
        }
    },
    _toggleHideTopOverlayCallback: function(subscribe) {
        if (!this._hideTopOverlayHandler) {
            return
        }
        if (subscribe) {
            _mobile_hide_callback__WEBPACK_IMPORTED_MODULE_25__["hideCallback"].add(this._hideTopOverlayHandler)
        } else {
            _mobile_hide_callback__WEBPACK_IMPORTED_MODULE_25__["hideCallback"].remove(this._hideTopOverlayHandler)
        }
    },
    _toggleHideOnParentsScrollSubscription: function(needSubscribe) {
        var _this$_parentsScrollS;
        var scrollEvent = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_23__["addNamespace"])("scroll", this.NAME);
        var {
            prevTargets: prevTargets,
            handler: handler
        } = null !== (_this$_parentsScrollS = this._parentsScrollSubscriptionInfo) && void 0 !== _this$_parentsScrollS ? _this$_parentsScrollS : {};
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__["default"].off(prevTargets, scrollEvent, handler);
        var closeOnScroll = this.option("hideOnParentScroll");
        if (needSubscribe && closeOnScroll) {
            var $parents = this._hideOnParentScrollTarget().parents();
            if ("desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_3__["default"].real().deviceType) {
                $parents = $parents.add(window)
            }
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__["default"].on($parents, scrollEvent, handler);
            this._parentsScrollSubscriptionInfo.prevTargets = $parents
        }
    },
    _hideOnParentsScrollHandler: function(e) {
        var closeHandled = false;
        var closeOnScroll = this.option("hideOnParentScroll");
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_15__["isFunction"])(closeOnScroll)) {
            closeHandled = closeOnScroll(e)
        }
        if (!closeHandled && !this._showAnimationProcessing) {
            this.hide()
        }
    },
    _hideOnParentScrollTarget: function() {
        return this._$wrapper
    },
    _render: function() {
        this.callBase();
        this._appendContentToElement();
        this._renderVisibilityAnimate(this.option("visible"))
    },
    _appendContentToElement: function() {
        if (!this._$content.parent().is(this.$element())) {
            this._$content.appendTo(this.$element())
        }
    },
    _renderContent: function() {
        var shouldDeferRendering = !this._currentVisible && this.option("deferRendering");
        var isParentHidden = this.option("visible") && this._isParentHidden();
        if (isParentHidden) {
            this._isHidden = true;
            return
        }
        if (this._contentAlreadyRendered || shouldDeferRendering) {
            return
        }
        this._contentAlreadyRendered = true;
        this._appendContentToElement();
        this.callBase()
    },
    _isParentHidden: function() {
        if (!this.option("_checkParentVisibility")) {
            return false
        }
        if (void 0 !== this._parentHidden) {
            return this._parentHidden
        }
        var $parent = this.$element().parent();
        if ($parent.is(":visible")) {
            return false
        }
        var isHidden = false;
        $parent.add($parent.parents()).each((function() {
            var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_6__["default"])(this);
            if ("none" === $element.css("display")) {
                isHidden = true;
                return false
            }
        }));
        return isHidden || !_core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__["default"].getBody().contains($parent.get(0))
    },
    _renderContentImpl: function() {
        var whenContentRendered = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["Deferred"];
        var contentTemplateOption = this.option("contentTemplate");
        var contentTemplate = this._getTemplate(contentTemplateOption);
        var transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
        contentTemplate && contentTemplate.render({
            container: Object(_core_element__WEBPACK_IMPORTED_MODULE_5__["getPublicElement"])(this.$content()),
            noModel: true,
            transclude: transclude,
            onRendered: () => {
                whenContentRendered.resolve()
            }
        });
        this._renderDrag();
        this._renderResize();
        this._renderScrollTerminator();
        whenContentRendered.done(() => {
            if (this.option("visible")) {
                this._moveToContainer()
            }
        });
        return whenContentRendered.promise()
    },
    _getPositionControllerConfig() {
        var {
            target: target,
            container: container,
            dragAndResizeArea: dragAndResizeArea,
            dragOutsideBoundary: dragOutsideBoundary,
            outsideDragFactor: outsideDragFactor,
            _fixWrapperPosition: _fixWrapperPosition,
            restorePosition: restorePosition
        } = this.option();
        return {
            target: target,
            container: container,
            $root: this.$element(),
            $content: this._$content,
            $wrapper: this._$wrapper,
            onPositioned: this._actions.onPositioned,
            onVisualPositionChanged: this._actions.onVisualPositionChanged,
            restorePosition: restorePosition,
            dragAndResizeArea: dragAndResizeArea,
            dragOutsideBoundary: dragOutsideBoundary,
            outsideDragFactor: outsideDragFactor,
            _fixWrapperPosition: _fixWrapperPosition
        }
    },
    _initPositionController() {
        this._positionController = new _overlay_position_controller__WEBPACK_IMPORTED_MODULE_34__["OverlayPositionController"](this._getPositionControllerConfig())
    },
    _renderDrag: function() {
        var $dragTarget = this._getDragTarget();
        if (!$dragTarget) {
            return
        }
        var config = {
            dragEnabled: this.option("dragEnabled"),
            handle: $dragTarget.get(0),
            draggableElement: this._$content.get(0),
            positionController: this._positionController
        };
        if (this._drag) {
            this._drag.init(config)
        } else {
            this._drag = new _overlay_drag__WEBPACK_IMPORTED_MODULE_27__["default"](config)
        }
    },
    _renderResize: function() {
        this._resizable = this._createComponent(this._$content, _resizable__WEBPACK_IMPORTED_MODULE_26__["default"], {
            handles: this.option("resizeEnabled") ? "all" : "none",
            onResizeEnd: e => {
                this._resizeEndHandler(e);
                this._observeContentResize(true)
            },
            onResize: e => {
                this._actions.onResize(e)
            },
            onResizeStart: e => {
                this._observeContentResize(false);
                this._actions.onResizeStart(e)
            },
            minHeight: 100,
            minWidth: 100,
            area: this._positionController.$dragResizeContainer
        })
    },
    _resizeEndHandler: function(e) {
        var width = this._resizable.option("width");
        var height = this._resizable.option("height");
        width && this._setOptionWithoutOptionChange("width", width);
        height && this._setOptionWithoutOptionChange("height", height);
        this._cacheDimensions();
        this._positionController.resizeHandled();
        this._positionController.detectVisualPositionChange(e.event);
        this._actions.onResizeEnd(e)
    },
    _renderScrollTerminator: function() {
        var $scrollTerminator = this._$wrapper;
        var terminatorEventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_23__["addNamespace"])(_events_drag__WEBPACK_IMPORTED_MODULE_20__["move"], this.NAME);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__["default"].off($scrollTerminator, terminatorEventName);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_19__["default"].on($scrollTerminator, terminatorEventName, {
            validate: function() {
                return true
            },
            getDirection: function() {
                return "both"
            },
            _toggleGestureCover: function(toggle) {
                if (!toggle) {
                    this._toggleGestureCoverImpl(toggle)
                }
            },
            _clearSelection: _core_utils_common__WEBPACK_IMPORTED_MODULE_9__["noop"],
            isNative: true
        }, e => {
            var originalEvent = e.originalEvent.originalEvent;
            var {
                type: type
            } = originalEvent || {};
            var isWheel = "wheel" === type;
            var isMouseMove = "mousemove" === type;
            var isScrollByWheel = isWheel && !Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_23__["isCommandKeyPressed"])(e);
            e._cancelPreventDefault = true;
            if (originalEvent && false !== e.cancelable && (!isMouseMove && !isWheel || isScrollByWheel)) {
                e.preventDefault()
            }
        })
    },
    _getDragTarget: function() {
        return this.$content()
    },
    _moveFromContainer: function() {
        this._$content.appendTo(this.$element());
        this._detachWrapperToContainer()
    },
    _detachWrapperToContainer: function() {
        this._$wrapper.detach()
    },
    _moveToContainer: function() {
        this._attachWrapperToContainer();
        this._$content.appendTo(this._$wrapper)
    },
    _attachWrapperToContainer: function() {
        var $element = this.$element();
        var containerDefined = void 0 !== this.option("container");
        var renderContainer = containerDefined ? this._positionController.$container : _widget_swatch_container__WEBPACK_IMPORTED_MODULE_29__["default"].getSwatchContainer($element);
        if (renderContainer && renderContainer[0] === $element.parent()[0]) {
            renderContainer = $element
        }
        this._$wrapper.appendTo(renderContainer)
    },
    _renderGeometry: function(options) {
        var {
            visible: visible,
            useResizeObserver: useResizeObserver
        } = this.option();
        if (visible && Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_17__["hasWindow"])()) {
            var isAnimated = this._showAnimationProcessing;
            var shouldRepeatAnimation = isAnimated && !(null !== options && void 0 !== options && options.forceStopAnimation) && useResizeObserver;
            this._isAnimationPaused = shouldRepeatAnimation || void 0;
            this._stopAnimation();
            if (null !== options && void 0 !== options && options.shouldOnlyReposition) {
                this._positionController.positionContent()
            } else {
                this._renderGeometryImpl()
            }
            if (shouldRepeatAnimation) {
                this._animateShowing();
                this._isAnimationPaused = void 0
            }
        }
    },
    _cacheDimensions: function() {
        if (!this.option("useResizeObserver")) {
            return
        }
        this._renderedDimensions = {
            width: parseInt(Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this._$content), 10),
            height: parseInt(Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this._$content), 10)
        }
    },
    _renderGeometryImpl: function() {
        this._positionController.updatePosition(this._getOptionValue("position"));
        this._renderWrapper();
        this._renderDimensions();
        this._renderPosition();
        this._cacheDimensions()
    },
    _renderPosition() {
        this._positionController.positionContent()
    },
    _isAllWindowCovered: function() {
        return this._positionController.isAllWindowCoveredByWrapper() && this.option("shading")
    },
    _toggleSafariScrolling: function() {
        var visible = this.option("visible");
        var $body = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_6__["default"])(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__["default"].getBody());
        var isIosSafari = "ios" === _core_devices__WEBPACK_IMPORTED_MODULE_3__["default"].real().platform && _core_utils_browser__WEBPACK_IMPORTED_MODULE_31__["default"].safari;
        var isAllWindowCovered = this._isAllWindowCovered();
        var isScrollingPrevented = $body.hasClass(PREVENT_SAFARI_SCROLLING_CLASS);
        var shouldPreventScrolling = !isScrollingPrevented && visible && isAllWindowCovered;
        var shouldEnableScrolling = isScrollingPrevented && (!visible || !isAllWindowCovered || this._disposed);
        if (isIosSafari) {
            if (shouldEnableScrolling) {
                $body.removeClass(PREVENT_SAFARI_SCROLLING_CLASS);
                window.scrollTo(0, this._cachedBodyScrollTop);
                this._cachedBodyScrollTop = void 0
            } else if (shouldPreventScrolling) {
                this._cachedBodyScrollTop = window.pageYOffset;
                $body.addClass(PREVENT_SAFARI_SCROLLING_CLASS)
            }
        }
    },
    _renderWrapper: function() {
        this._positionController.styleWrapperPosition();
        this._renderWrapperDimensions();
        this._positionController.positionWrapper()
    },
    _renderWrapperDimensions: function() {
        var wrapperWidth;
        var wrapperHeight;
        var $container = this._positionController._$wrapperCoveredElement;
        if (!$container) {
            return
        }
        var isWindow = this._positionController.isAllWindowCoveredByWrapper();
        var documentElement = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_4__["default"].getDocumentElement();
        wrapperWidth = isWindow ? documentElement.clientWidth : Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])($container), wrapperHeight = isWindow ? window.innerHeight : Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($container);
        this._$wrapper.css({
            width: wrapperWidth,
            height: wrapperHeight
        })
    },
    _renderDimensions: function() {
        var content = this._$content.get(0);
        this._$content.css({
            minWidth: this._getOptionValue("minWidth", content),
            maxWidth: this._getOptionValue("maxWidth", content),
            minHeight: this._getOptionValue("minHeight", content),
            maxHeight: this._getOptionValue("maxHeight", content),
            width: this._getOptionValue("width", content),
            height: this._getOptionValue("height", content)
        })
    },
    _focusTarget: function() {
        return this._$content
    },
    _attachKeyboardEvents: function() {
        this._keyboardListenerId = _events_short__WEBPACK_IMPORTED_MODULE_22__["keyboard"].on(this._$content, null, opts => this._keyboardHandler(opts))
    },
    _keyboardHandler: function(options) {
        var e = options.originalEvent;
        var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_6__["default"])(e.target);
        if ($target.is(this._$content) || !this.option("ignoreChildEvents")) {
            this.callBase(...arguments)
        }
    },
    _isVisible: function() {
        return this.option("visible")
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            if (this.option("visible")) {
                this._renderVisibilityAnimate(visible)
            }
        } else {
            this._renderVisibilityAnimate(visible)
        }
    },
    _dimensionChanged: function() {
        this._renderGeometry()
    },
    _clean: function() {
        if (!this._contentAlreadyRendered) {
            this.$content().empty()
        }
        this._renderVisibility(false);
        this._stopShowTimer();
        this._observeContentResize(false);
        this._cleanFocusState()
    },
    _stopShowTimer() {
        if (this._asyncShowTimeout) {
            clearTimeout(this._asyncShowTimeout)
        }
        this._asyncShowTimeout = null
    },
    _dispose: function() {
        _animation_fx__WEBPACK_IMPORTED_MODULE_1__["default"].stop(this._$content, false);
        clearTimeout(this._deferShowTimer);
        this._toggleViewPortSubscription(false);
        this._toggleSubscriptions(false);
        this._updateZIndexStackPosition(false);
        this._toggleTabTerminator(false);
        this._actions = null;
        this._parentsScrollSubscriptionInfo = null;
        this.callBase();
        this._toggleSafariScrolling();
        this.option("visible") && _z_index__WEBPACK_IMPORTED_MODULE_32__["remove"](this._zIndex);
        this._$wrapper.remove();
        this._$content.remove()
    },
    _toggleRTLDirection: function(rtl) {
        this._$content.toggleClass(RTL_DIRECTION_CLASS, rtl)
    },
    _optionChanged: function(args) {
        var _this$_resizable;
        var value = args.value;
        if (Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_8__["inArray"])(args.name, ACTIONS) > -1) {
            this._initActions();
            return
        }
        switch (args.name) {
            case "dragEnabled":
                this._renderDrag();
                this._renderGeometry();
                break;
            case "resizeEnabled":
                this._renderResize();
                this._renderGeometry();
                break;
            case "shading":
                this._toggleShading(this.option("visible"));
                this._toggleSafariScrolling();
                break;
            case "shadingColor":
                this._toggleShading(this.option("visible"));
                break;
            case "width":
            case "height":
                this._renderGeometry();
                null === (_this$_resizable = this._resizable) || void 0 === _this$_resizable ? void 0 : _this$_resizable.option(args.name, args.value);
                break;
            case "minWidth":
            case "maxWidth":
            case "minHeight":
            case "maxHeight":
                this._renderGeometry();
                break;
            case "position":
                this._positionController.updatePosition(this.option("position"));
                this._positionController.restorePositionOnNextRender(true);
                this._renderGeometry();
                this._toggleSafariScrolling();
                break;
            case "visible":
                this._renderVisibilityAnimate(value).done(() => {
                    if (!this._animateDeferred) {
                        return
                    }
                    this._animateDeferred.resolveWith(this)
                });
                break;
            case "target":
                this._positionController.updateTarget(value);
                this._setAnimationTarget(value);
                this._invalidate();
                break;
            case "container":
                this._positionController.updateContainer(value);
                this._invalidate();
                this._toggleSafariScrolling();
                if (this.option("resizeEnabled")) {
                    var _this$_resizable2;
                    null === (_this$_resizable2 = this._resizable) || void 0 === _this$_resizable2 ? void 0 : _this$_resizable2.option("area", this._positionController.$dragResizeContainer)
                }
                break;
            case "innerOverlay":
                this._initInnerOverlayClass();
                break;
            case "deferRendering":
            case "contentTemplate":
                this._contentAlreadyRendered = false;
                this._clean();
                this._invalidate();
                break;
            case "hideTopOverlayHandler":
                this._toggleHideTopOverlayCallback(false);
                this._initHideTopOverlayHandler(args.value);
                this._toggleHideTopOverlayCallback(this.option("visible"));
                break;
            case "hideOnParentScroll":
                this._toggleHideOnParentsScrollSubscription(this.option("visible"));
                break;
            case "closeOnOutsideClick":
            case "propagateOutsideClick":
                break;
            case "animation":
                this._updateResizeCallbackSkipCondition();
                break;
            case "rtlEnabled":
                this._contentAlreadyRendered = false;
                this.callBase(args);
                break;
            case "_fixWrapperPosition":
                this._positionController.fixWrapperPosition = value;
                break;
            case "wrapperAttr":
                this._renderWrapperAttributes();
                break;
            case "dragAndResizeArea":
                this._positionController.dragAndResizeArea = value;
                if (this.option("resizeEnabled")) {
                    this._resizable.option("area", this._positionController.$dragResizeContainer)
                }
                this._positionController.positionContent();
                break;
            case "dragOutsideBoundary":
                this._positionController.dragOutsideBoundary = value;
                if (this.option("resizeEnabled")) {
                    this._resizable.option("area", this._positionController.$dragResizeContainer)
                }
                break;
            case "outsideDragFactor":
                this._positionController.outsideDragFactor = value;
                break;
            case "restorePosition":
                this._positionController.restorePosition = args.value;
                break;
            default:
                this.callBase(args)
        }
    },
    toggle: function(showing) {
        showing = void 0 === showing ? !this.option("visible") : showing;
        var result = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["Deferred"];
        if (showing === this.option("visible")) {
            return result.resolveWith(this, [showing]).promise()
        }
        var animateDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_10__["Deferred"];
        this._animateDeferred = animateDeferred;
        this.option("visible", showing);
        animateDeferred.promise().done(() => {
            delete this._animateDeferred;
            result.resolveWith(this, [this.option("visible")])
        });
        return result.promise()
    },
    $content: function() {
        return this._$content
    },
    show: function() {
        return this.toggle(true)
    },
    hide: function() {
        return this.toggle(false)
    },
    content: function() {
        return Object(_core_element__WEBPACK_IMPORTED_MODULE_5__["getPublicElement"])(this._$content)
    },
    repaint: function() {
        if (this._contentAlreadyRendered) {
            this._positionController.restorePositionOnNextRender(true);
            this._renderGeometry({
                forceStopAnimation: true
            });
            Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_24__["triggerResizeEvent"])(this._$content)
        } else {
            this.callBase()
        }
    }
});
Overlay.baseZIndex = zIndex => _z_index__WEBPACK_IMPORTED_MODULE_32__["base"](zIndex);
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_2__["default"])("dxOverlay", Overlay);
/* harmony default export */ __webpack_exports__["default"] = (Overlay);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/overlay/z_index.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/overlay/z_index.js ***!
  \***********************************************************/
/*! exports provided: base, create, remove, clearStack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base", function() { return base; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearStack", function() { return clearStack; });
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/ui/overlay/z_index.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var baseZIndex = 1500;
var zIndexStack = [];
var base = ZIndex => {
    baseZIndex = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_0__["ensureDefined"])(ZIndex, baseZIndex);
    return baseZIndex
};
var create = function() {
    var baseIndex = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : baseZIndex;
    var length = zIndexStack.length;
    var index = (length ? zIndexStack[length - 1] : baseIndex) + 1;
    zIndexStack.push(index);
    return index
};
var remove = zIndex => {
    var position = zIndexStack.indexOf(zIndex);
    if (position >= 0) {
        zIndexStack.splice(position, 1)
    }
};
var clearStack = () => {
    zIndexStack = []
};


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/resizable.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/resizable.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _animation_translator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation/translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_dom_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/dom_component */ "./node_modules/devextreme/esm/core/dom_component.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _events_drag__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../events/drag */ "./node_modules/devextreme/esm/events/drag.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_visibility_change__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../events/visibility_change */ "./node_modules/devextreme/esm/events/visibility_change.js");
/**
 * DevExtreme (esm/ui/resizable.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

















var RESIZABLE = "dxResizable";
var RESIZABLE_CLASS = "dx-resizable";
var RESIZABLE_RESIZING_CLASS = "dx-resizable-resizing";
var RESIZABLE_HANDLE_CLASS = "dx-resizable-handle";
var RESIZABLE_HANDLE_TOP_CLASS = "dx-resizable-handle-top";
var RESIZABLE_HANDLE_BOTTOM_CLASS = "dx-resizable-handle-bottom";
var RESIZABLE_HANDLE_LEFT_CLASS = "dx-resizable-handle-left";
var RESIZABLE_HANDLE_RIGHT_CLASS = "dx-resizable-handle-right";
var RESIZABLE_HANDLE_CORNER_CLASS = "dx-resizable-handle-corner";
var DRAGSTART_START_EVENT_NAME = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_15__["addNamespace"])(_events_drag__WEBPACK_IMPORTED_MODULE_14__["start"], RESIZABLE);
var DRAGSTART_EVENT_NAME = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_15__["addNamespace"])(_events_drag__WEBPACK_IMPORTED_MODULE_14__["move"], RESIZABLE);
var DRAGSTART_END_EVENT_NAME = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_15__["addNamespace"])(_events_drag__WEBPACK_IMPORTED_MODULE_14__["end"], RESIZABLE);
var SIDE_BORDER_WIDTH_STYLES = {
    left: "borderLeftWidth",
    top: "borderTopWidth",
    right: "borderRightWidth",
    bottom: "borderBottomWidth"
};
var Resizable = _core_dom_component__WEBPACK_IMPORTED_MODULE_4__["default"].inherit({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_8__["extend"])(this.callBase(), {
            handles: "all",
            step: "1",
            stepPrecision: "simple",
            area: void 0,
            minWidth: 30,
            maxWidth: 1 / 0,
            minHeight: 30,
            maxHeight: 1 / 0,
            onResizeStart: null,
            onResize: null,
            onResizeEnd: null,
            roundStepValue: true,
            _keepAspectRatio: false
        })
    },
    _init: function() {
        this.callBase();
        this.$element().addClass(RESIZABLE_CLASS)
    },
    _initMarkup: function() {
        this.callBase();
        this._renderHandles()
    },
    _render: function() {
        this.callBase();
        this._renderActions()
    },
    _renderActions: function() {
        this._resizeStartAction = this._createActionByOption("onResizeStart");
        this._resizeEndAction = this._createActionByOption("onResizeEnd");
        this._resizeAction = this._createActionByOption("onResize")
    },
    _renderHandles: function() {
        this._handles = [];
        var handles = this.option("handles");
        if ("none" === handles) {
            return
        }
        var directions = "all" === handles ? ["top", "bottom", "left", "right"] : handles.split(" ");
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_9__["each"])(directions, (index, handleName) => {
            this._renderHandle(handleName)
        });
        Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_6__["inArray"])("bottom", directions) + 1 && Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_6__["inArray"])("right", directions) + 1 && this._renderHandle("corner-bottom-right");
        Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_6__["inArray"])("bottom", directions) + 1 && Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_6__["inArray"])("left", directions) + 1 && this._renderHandle("corner-bottom-left");
        Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_6__["inArray"])("top", directions) + 1 && Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_6__["inArray"])("right", directions) + 1 && this._renderHandle("corner-top-right");
        Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_6__["inArray"])("top", directions) + 1 && Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_6__["inArray"])("left", directions) + 1 && this._renderHandle("corner-top-left");
        this._attachEventHandlers()
    },
    _renderHandle: function(handleName) {
        var $handle = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])("<div>").addClass(RESIZABLE_HANDLE_CLASS).addClass(RESIZABLE_HANDLE_CLASS + "-" + handleName).appendTo(this.$element());
        this._handles.push($handle)
    },
    _attachEventHandlers: function() {
        if (this.option("disabled")) {
            return
        }
        var handlers = {};
        handlers[DRAGSTART_START_EVENT_NAME] = this._dragStartHandler.bind(this);
        handlers[DRAGSTART_EVENT_NAME] = this._dragHandler.bind(this);
        handlers[DRAGSTART_END_EVENT_NAME] = this._dragEndHandler.bind(this);
        this._handles.forEach(handleElement => {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_13__["default"].on(handleElement, handlers, {
                direction: "both",
                immediate: true
            })
        })
    },
    _detachEventHandlers: function() {
        this._handles.forEach(handleElement => {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_13__["default"].off(handleElement)
        })
    },
    _toggleEventHandlers: function(shouldAttachEvents) {
        shouldAttachEvents ? this._attachEventHandlers() : this._detachEventHandlers()
    },
    _getElementSize: function() {
        var $element = this.$element();
        return "border-box" === $element.css("boxSizing") ? {
            width: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getOuterWidth"])($element),
            height: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getOuterHeight"])($element)
        } : {
            width: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getWidth"])($element),
            height: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getHeight"])($element)
        }
    },
    _dragStartHandler: function(e) {
        var $element = this.$element();
        if ($element.is(".dx-state-disabled, .dx-state-disabled *")) {
            e.cancel = true;
            return
        }
        this._toggleResizingClass(true);
        this._movingSides = this._getMovingSides(e);
        this._elementLocation = Object(_animation_translator__WEBPACK_IMPORTED_MODULE_2__["locate"])($element);
        this._elementSize = this._getElementSize();
        this._renderDragOffsets(e);
        this._resizeStartAction({
            event: e,
            width: this._elementSize.width,
            height: this._elementSize.height,
            handles: this._movingSides
        });
        e.targetElements = null
    },
    _toggleResizingClass: function(value) {
        this.$element().toggleClass(RESIZABLE_RESIZING_CLASS, value)
    },
    _renderDragOffsets: function(e) {
        var area = this._getArea();
        if (!area) {
            return
        }
        var $handle = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])(e.target).closest("." + RESIZABLE_HANDLE_CLASS);
        var handleWidth = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getOuterWidth"])($handle);
        var handleHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getOuterHeight"])($handle);
        var handleOffset = $handle.offset();
        var areaOffset = area.offset;
        var scrollOffset = this._getAreaScrollOffset();
        e.maxLeftOffset = this._leftMaxOffset = handleOffset.left - areaOffset.left - scrollOffset.scrollX;
        e.maxRightOffset = this._rightMaxOffset = areaOffset.left + area.width - handleOffset.left - handleWidth + scrollOffset.scrollX;
        e.maxTopOffset = this._topMaxOffset = handleOffset.top - areaOffset.top - scrollOffset.scrollY;
        e.maxBottomOffset = this._bottomMaxOffset = areaOffset.top + area.height - handleOffset.top - handleHeight + scrollOffset.scrollY
    },
    _getBorderWidth: function($element, direction) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isWindow"])($element.get(0))) {
            return 0
        }
        var borderWidth = $element.css(SIDE_BORDER_WIDTH_STYLES[direction]);
        return parseInt(borderWidth) || 0
    },
    _proportionate: function(direction, value) {
        var size = this._elementSize;
        var factor = "x" === direction ? size.width / size.height : size.height / size.width;
        return value * factor
    },
    _getProportionalDelta: function(_ref) {
        var {
            x: x,
            y: y
        } = _ref;
        var proportionalY = this._proportionate("y", x);
        if (proportionalY >= y) {
            return {
                x: x,
                y: proportionalY
            }
        }
        var proportionalX = this._proportionate("x", y);
        if (proportionalX >= x) {
            return {
                x: proportionalX,
                y: y
            }
        }
        return {
            x: 0,
            y: 0
        }
    },
    _getDirectionName: function(axis) {
        var sides = this._movingSides;
        if ("x" === axis) {
            return sides.left ? "left" : "right"
        } else {
            return sides.top ? "top" : "bottom"
        }
    },
    _fitIntoArea: function(axis, value) {
        var _this$;
        var directionName = this._getDirectionName(axis);
        return Math.min(value, null !== (_this$ = this["_".concat(directionName, "MaxOffset")]) && void 0 !== _this$ ? _this$ : 1 / 0)
    },
    _fitDeltaProportionally: function(delta) {
        var fittedDelta = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, delta);
        var size = this._elementSize;
        var {
            minWidth: minWidth,
            minHeight: minHeight,
            maxWidth: maxWidth,
            maxHeight: maxHeight
        } = this.option();
        var getWidth = () => size.width + fittedDelta.x;
        var getHeight = () => size.height + fittedDelta.y;
        var isInArea = axis => fittedDelta[axis] === this._fitIntoArea(axis, fittedDelta[axis]);
        var isFittedX = () => Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_10__["inRange"])(getWidth(), minWidth, maxWidth) && isInArea("x");
        var isFittedY = () => Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_10__["inRange"])(getHeight(), minHeight, maxHeight) && isInArea("y");
        if (!isFittedX()) {
            var x = this._fitIntoArea("x", Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_10__["fitIntoRange"])(getWidth(), minWidth, maxWidth) - size.width);
            fittedDelta = {
                x: x,
                y: this._proportionate("y", x)
            }
        }
        if (!isFittedY()) {
            var y = this._fitIntoArea("y", Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_10__["fitIntoRange"])(getHeight(), minHeight, maxHeight) - size.height);
            fittedDelta = {
                x: this._proportionate("x", y),
                y: y
            }
        }
        return isFittedX() && isFittedY() ? fittedDelta : {
            x: 0,
            y: 0
        }
    },
    _fitDelta: function(_ref2) {
        var {
            x: x,
            y: y
        } = _ref2;
        var size = this._elementSize;
        var {
            minWidth: minWidth,
            minHeight: minHeight,
            maxWidth: maxWidth,
            maxHeight: maxHeight
        } = this.option();
        return {
            x: Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_10__["fitIntoRange"])(size.width + x, minWidth, maxWidth) - size.width,
            y: Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_10__["fitIntoRange"])(size.height + y, minHeight, maxHeight) - size.height
        }
    },
    _getDeltaByOffset: function(offset) {
        var sides = this._movingSides;
        var shouldKeepAspectRatio = this._isCornerHandler(sides) && this.option("_keepAspectRatio");
        var delta = {
            x: offset.x * (sides.left ? -1 : 1),
            y: offset.y * (sides.top ? -1 : 1)
        };
        if (shouldKeepAspectRatio) {
            var proportionalDelta = this._getProportionalDelta(delta);
            var fittedProportionalDelta = this._fitDeltaProportionally(proportionalDelta);
            delta = fittedProportionalDelta
        } else {
            var fittedDelta = this._fitDelta(delta);
            var roundedFittedDelta = this._roundByStep(fittedDelta);
            delta = roundedFittedDelta
        }
        return delta
    },
    _updatePosition: function(delta, _ref3) {
        var {
            width: width,
            height: height
        } = _ref3;
        var location = this._elementLocation;
        var sides = this._movingSides;
        var $element = this.$element();
        var elementRect = this._getElementSize();
        var offsetTop = delta.y * (sides.top ? -1 : 1) - ((elementRect.height || height) - height);
        var offsetLeft = delta.x * (sides.left ? -1 : 1) - ((elementRect.width || width) - width);
        Object(_animation_translator__WEBPACK_IMPORTED_MODULE_2__["move"])($element, {
            top: location.top + (sides.top ? offsetTop : 0),
            left: location.left + (sides.left ? offsetLeft : 0)
        })
    },
    _dragHandler: function(e) {
        var offset = this._getOffset(e);
        var delta = this._getDeltaByOffset(offset);
        var dimensions = this._updateDimensions(delta);
        this._updatePosition(delta, dimensions);
        this._triggerResizeAction(e, dimensions)
    },
    _updateDimensions: function(delta) {
        var isAbsoluteSize = size => "px" === size.substring(size.length - 2);
        var isStepPrecisionStrict = "strict" === this.option("stepPrecision");
        var size = this._elementSize;
        var width = size.width + delta.x;
        var height = size.height + delta.y;
        var elementStyle = this.$element().get(0).style;
        var shouldRenderWidth = delta.x || isStepPrecisionStrict || isAbsoluteSize(elementStyle.width);
        var shouldRenderHeight = delta.y || isStepPrecisionStrict || isAbsoluteSize(elementStyle.height);
        if (shouldRenderWidth) {
            this.option({
                width: width
            })
        }
        if (shouldRenderHeight) {
            this.option({
                height: height
            })
        }
        return {
            width: shouldRenderWidth ? width : size.width,
            height: shouldRenderHeight ? height : size.height
        }
    },
    _triggerResizeAction: function(e, _ref4) {
        var {
            width: width,
            height: height
        } = _ref4;
        this._resizeAction({
            event: e,
            width: this.option("width") || width,
            height: this.option("height") || height,
            handles: this._movingSides
        });
        Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_16__["triggerResizeEvent"])(this.$element())
    },
    _isCornerHandler: sides => 0 === Object.values(sides).reduce((xor, value) => xor ^ value, 0),
    _getOffset: function(e) {
        var offset = e.offset;
        var sides = this._movingSides;
        if (!sides.left && !sides.right) {
            offset.x = 0
        }
        if (!sides.top && !sides.bottom) {
            offset.y = 0
        }
        return offset
    },
    _roundByStep: function(delta) {
        return "strict" === this.option("stepPrecision") ? this._roundStrict(delta) : this._roundNotStrict(delta)
    },
    _getSteps: function() {
        return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_7__["pairToObject"])(this.option("step"), !this.option("roundStepValue"))
    },
    _roundNotStrict: function(delta) {
        var steps = this._getSteps();
        return {
            x: delta.x - delta.x % steps.h,
            y: delta.y - delta.y % steps.v
        }
    },
    _roundStrict: function(delta) {
        var sides = this._movingSides;
        var offset = {
            x: delta.x * (sides.left ? -1 : 1),
            y: delta.y * (sides.top ? -1 : 1)
        };
        var steps = this._getSteps();
        var location = this._elementLocation;
        var size = this._elementSize;
        var xPos = sides.left ? location.left : location.left + size.width;
        var yPos = sides.top ? location.top : location.top + size.height;
        var newXShift = (xPos + offset.x) % steps.h;
        var newYShift = (yPos + offset.y) % steps.v;
        var sign = Math.sign || (x => {
            x = +x;
            if (0 === x || isNaN(x)) {
                return x
            }
            return x > 0 ? 1 : -1
        });
        var separatorOffset = (steps, offset) => (1 + .2 * sign(offset)) % 1 * steps;
        var isSmallOffset = (offset, steps) => Math.abs(offset) < .2 * steps;
        var newOffsetX = offset.x - newXShift;
        var newOffsetY = offset.y - newYShift;
        if (newXShift > separatorOffset(steps.h, offset.x)) {
            newOffsetX += steps.h
        }
        if (newYShift > separatorOffset(steps.v, offset.y)) {
            newOffsetY += steps.v
        }
        var roundedOffset_x = (sides.left || sides.right) && !isSmallOffset(offset.x, steps.h) ? newOffsetX : 0,
            roundedOffset_y = (sides.top || sides.bottom) && !isSmallOffset(offset.y, steps.v) ? newOffsetY : 0;
        return {
            x: roundedOffset_x * (sides.left ? -1 : 1),
            y: roundedOffset_y * (sides.top ? -1 : 1)
        }
    },
    _getMovingSides: function(e) {
        var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])(e.target);
        var hasCornerTopLeftClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + "-top-left");
        var hasCornerTopRightClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + "-top-right");
        var hasCornerBottomLeftClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + "-bottom-left");
        var hasCornerBottomRightClass = $target.hasClass(RESIZABLE_HANDLE_CORNER_CLASS + "-bottom-right");
        return {
            top: $target.hasClass(RESIZABLE_HANDLE_TOP_CLASS) || hasCornerTopLeftClass || hasCornerTopRightClass,
            left: $target.hasClass(RESIZABLE_HANDLE_LEFT_CLASS) || hasCornerTopLeftClass || hasCornerBottomLeftClass,
            bottom: $target.hasClass(RESIZABLE_HANDLE_BOTTOM_CLASS) || hasCornerBottomLeftClass || hasCornerBottomRightClass,
            right: $target.hasClass(RESIZABLE_HANDLE_RIGHT_CLASS) || hasCornerTopRightClass || hasCornerBottomRightClass
        }
    },
    _getArea: function() {
        var area = this.option("area");
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isFunction"])(area)) {
            area = area.call(this)
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isPlainObject"])(area)) {
            return this._getAreaFromObject(area)
        }
        return this._getAreaFromElement(area)
    },
    _getAreaScrollOffset: function() {
        var area = this.option("area");
        var isElement = !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isFunction"])(area) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isPlainObject"])(area);
        var scrollOffset = {
            scrollY: 0,
            scrollX: 0
        };
        if (isElement) {
            var areaElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])(area)[0];
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isWindow"])(areaElement)) {
                scrollOffset.scrollX = areaElement.pageXOffset;
                scrollOffset.scrollY = areaElement.pageYOffset
            }
        }
        return scrollOffset
    },
    _getAreaFromObject: function(area) {
        var result = {
            width: area.right - area.left,
            height: area.bottom - area.top,
            offset: {
                left: area.left,
                top: area.top
            }
        };
        this._correctAreaGeometry(result);
        return result
    },
    _getAreaFromElement: function(area) {
        var $area = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])(area);
        var result;
        if ($area.length) {
            result = {
                width: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getInnerWidth"])($area),
                height: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getInnerHeight"])($area),
                offset: Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_8__["extend"])({
                    top: 0,
                    left: 0
                }, Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_11__["isWindow"])($area[0]) ? {} : $area.offset())
            };
            this._correctAreaGeometry(result, $area)
        }
        return result
    },
    _correctAreaGeometry: function(result, $area) {
        var areaBorderLeft = $area ? this._getBorderWidth($area, "left") : 0;
        var areaBorderTop = $area ? this._getBorderWidth($area, "top") : 0;
        result.offset.left += areaBorderLeft + this._getBorderWidth(this.$element(), "left");
        result.offset.top += areaBorderTop + this._getBorderWidth(this.$element(), "top");
        result.width -= Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getOuterWidth"])(this.$element()) - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getInnerWidth"])(this.$element());
        result.height -= Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getOuterHeight"])(this.$element()) - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getInnerHeight"])(this.$element())
    },
    _dragEndHandler: function(e) {
        var $element = this.$element();
        this._resizeEndAction({
            event: e,
            width: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getOuterWidth"])($element),
            height: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getOuterHeight"])($element),
            handles: this._movingSides
        });
        this._toggleResizingClass(false)
    },
    _renderWidth: function(width) {
        this.option("width", Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_10__["fitIntoRange"])(width, this.option("minWidth"), this.option("maxWidth")))
    },
    _renderHeight: function(height) {
        this.option("height", Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_10__["fitIntoRange"])(height, this.option("minHeight"), this.option("maxHeight")))
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "disabled":
                this._toggleEventHandlers(!args.value);
                this.callBase(args);
                break;
            case "handles":
                this._invalidate();
                break;
            case "minWidth":
            case "maxWidth":
                Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_12__["hasWindow"])() && this._renderWidth(Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getOuterWidth"])(this.$element()));
                break;
            case "minHeight":
            case "maxHeight":
                Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_12__["hasWindow"])() && this._renderHeight(Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_1__["getOuterHeight"])(this.$element()));
                break;
            case "onResize":
            case "onResizeStart":
            case "onResizeEnd":
                this._renderActions();
                break;
            case "area":
            case "stepPrecision":
            case "step":
            case "roundStepValue":
            case "_keepAspectRatio":
                break;
            default:
                this.callBase(args)
        }
    },
    _clean: function() {
        this.$element().find("." + RESIZABLE_HANDLE_CLASS).remove()
    },
    _useTemplates: function() {
        return false
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_3__["default"])(RESIZABLE, Resizable);
/* harmony default export */ __webpack_exports__["default"] = (Resizable);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/widget/swatch_container.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/widget/swatch_container.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_view_port__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/view_port */ "./node_modules/devextreme/esm/core/utils/view_port.js");
/**
 * DevExtreme (esm/ui/widget/swatch_container.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var SWATCH_CONTAINER_CLASS_PREFIX = "dx-swatch-";
var getSwatchContainer = element => {
    var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
    var swatchContainer = $element.closest('[class^="'.concat(SWATCH_CONTAINER_CLASS_PREFIX, '"], [class*=" ').concat(SWATCH_CONTAINER_CLASS_PREFIX, '"]'));
    var viewport = Object(_core_utils_view_port__WEBPACK_IMPORTED_MODULE_1__["value"])();
    if (!swatchContainer.length) {
        return viewport
    }
    var swatchClassRegex = new RegExp("(\\s|^)(".concat(SWATCH_CONTAINER_CLASS_PREFIX, ".*?)(\\s|$)"));
    var swatchClass = swatchContainer[0].className.match(swatchClassRegex)[2];
    var viewportSwatchContainer = viewport.children("." + swatchClass);
    if (!viewportSwatchContainer.length) {
        viewportSwatchContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(swatchClass).appendTo(viewport)
    }
    return viewportSwatchContainer
};
/* harmony default export */ __webpack_exports__["default"] = ({
    getSwatchContainer: getSwatchContainer
});


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/widget/ui.widget.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/widget/ui.widget.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/action */ "./node_modules/devextreme/esm/core/action.js");
/* harmony import */ var _core_dom_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/dom_component */ "./node_modules/devextreme/esm/core/dom_component.js");
/* harmony import */ var _events_short__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/short */ "./node_modules/devextreme/esm/events/short.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./selectors */ "./node_modules/devextreme/esm/ui/widget/selectors.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_utils_version__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/utils/version */ "./node_modules/devextreme/esm/core/utils/version.js");
/* harmony import */ var _events_click__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../events/click */ "./node_modules/devextreme/esm/events/click.js");
/* harmony import */ var _events_core_emitter_feedback__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../events/core/emitter.feedback */ "./node_modules/devextreme/esm/events/core/emitter.feedback.js");
/* harmony import */ var _events_hover__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../events/hover */ "./node_modules/devextreme/esm/events/hover.js");
/**
 * DevExtreme (esm/ui/widget/ui.widget.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
















function setAttribute(name, value, target) {
    name = "role" === name || "id" === name ? name : "aria-".concat(name);
    value = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(value) ? value.toString() : null;
    target.attr(name, value)
}
var Widget = _core_dom_component__WEBPACK_IMPORTED_MODULE_2__["default"].inherit({
    _feedbackHideTimeout: 400,
    _feedbackShowTimeout: 30,
    _supportedKeys: () => ({}),
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_6__["extend"])(this.callBase(), {
            hoveredElement: null,
            isActive: false,
            disabled: false,
            visible: true,
            hint: void 0,
            activeStateEnabled: false,
            onContentReady: null,
            hoverStateEnabled: false,
            focusStateEnabled: false,
            tabIndex: 0,
            accessKey: void 0,
            onFocusIn: null,
            onFocusOut: null,
            onKeyboardHandled: null,
            ignoreParentReadOnly: false,
            useResizeObserver: true
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                var device = _core_devices__WEBPACK_IMPORTED_MODULE_10__["default"].real();
                var platform = device.platform;
                var version = device.version;
                return "ios" === platform && Object(_core_utils_version__WEBPACK_IMPORTED_MODULE_11__["compare"])(version, "13.3") <= 0 || "android" === platform && Object(_core_utils_version__WEBPACK_IMPORTED_MODULE_11__["compare"])(version, "4.4.4") <= 0
            },
            options: {
                useResizeObserver: false
            }
        }])
    },
    _init() {
        this.callBase();
        this._initContentReadyAction()
    },
    _innerWidgetOptionChanged: function(innerWidget, args) {
        var options = Widget.getOptionsFromContainer(args);
        innerWidget && innerWidget.option(options);
        this._options.cache(args.name, options)
    },
    _bindInnerWidgetOptions(innerWidget, optionsContainer) {
        var syncOptions = () => this._options.silent(optionsContainer, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_6__["extend"])({}, innerWidget.option()));
        syncOptions();
        innerWidget.on("optionChanged", syncOptions)
    },
    _getAriaTarget() {
        return this._focusTarget()
    },
    _initContentReadyAction() {
        this._contentReadyAction = this._createActionByOption("onContentReady", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _initMarkup() {
        var {
            disabled: disabled,
            visible: visible
        } = this.option();
        this.$element().addClass("dx-widget");
        this._toggleDisabledState(disabled);
        this._toggleVisibility(visible);
        this._renderHint();
        this._isFocusable() && this._renderFocusTarget();
        this.callBase()
    },
    _render() {
        this.callBase();
        this._renderContent();
        this._renderFocusState();
        this._attachFeedbackEvents();
        this._attachHoverEvents();
        this._toggleIndependentState()
    },
    _renderHint() {
        var {
            hint: hint
        } = this.option();
        this.$element().attr("title", hint || null)
    },
    _renderContent() {
        Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["deferRender"])(() => !this._disposed ? this._renderContentImpl() : void 0).done(() => !this._disposed ? this._fireContentReadyAction() : void 0)
    },
    _renderContentImpl: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    _fireContentReadyAction: Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_4__["deferRenderer"])((function() {
        return this._contentReadyAction()
    })),
    _dispose() {
        this._contentReadyAction = null;
        this._detachKeyboardEvents();
        this.callBase()
    },
    _resetActiveState() {
        this._toggleActiveState(this._eventBindingTarget(), false)
    },
    _clean() {
        this._cleanFocusState();
        this._resetActiveState();
        this.callBase();
        this.$element().empty()
    },
    _toggleVisibility(visible) {
        this.$element().toggleClass("dx-state-invisible", !visible);
        this.setAria("hidden", !visible || void 0)
    },
    _renderFocusState() {
        this._attachKeyboardEvents();
        if (this._isFocusable()) {
            this._renderFocusTarget();
            this._attachFocusEvents();
            this._renderAccessKey()
        }
    },
    _renderAccessKey() {
        var $el = this._focusTarget();
        var {
            accessKey: accessKey
        } = this.option();
        $el.attr("accesskey", accessKey)
    },
    _isFocusable() {
        var {
            focusStateEnabled: focusStateEnabled,
            disabled: disabled
        } = this.option();
        return focusStateEnabled && !disabled
    },
    _eventBindingTarget() {
        return this.$element()
    },
    _focusTarget() {
        return this._getActiveElement()
    },
    _getActiveElement() {
        var activeElement = this._eventBindingTarget();
        if (this._activeStateUnit) {
            return activeElement.find(this._activeStateUnit).not(".dx-state-disabled")
        }
        return activeElement
    },
    _renderFocusTarget() {
        var {
            tabIndex: tabIndex
        } = this.option();
        this._focusTarget().attr("tabIndex", tabIndex)
    },
    _keyboardEventBindingTarget() {
        return this._eventBindingTarget()
    },
    _refreshFocusEvent() {
        this._detachFocusEvents();
        this._attachFocusEvents()
    },
    _focusEventTarget() {
        return this._focusTarget()
    },
    _focusInHandler(event) {
        if (!event.isDefaultPrevented()) {
            this._createActionByOption("onFocusIn", {
                beforeExecute: () => this._updateFocusState(event, true),
                excludeValidators: ["readOnly"]
            })({
                event: event
            })
        }
    },
    _focusOutHandler(event) {
        if (!event.isDefaultPrevented()) {
            this._createActionByOption("onFocusOut", {
                beforeExecute: () => this._updateFocusState(event, false),
                excludeValidators: ["readOnly", "disabled"]
            })({
                event: event
            })
        }
    },
    _updateFocusState(_ref, isFocused) {
        var {
            target: target
        } = _ref;
        if (-1 !== Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_8__["inArray"])(target, this._focusTarget())) {
            this._toggleFocusClass(isFocused, Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(target))
        }
    },
    _toggleFocusClass(isFocused, $element) {
        var $focusTarget = $element && $element.length ? $element : this._focusTarget();
        $focusTarget.toggleClass("dx-state-focused", isFocused)
    },
    _hasFocusClass(element) {
        var $focusTarget = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element || this._focusTarget());
        return $focusTarget.hasClass("dx-state-focused")
    },
    _isFocused() {
        return this._hasFocusClass()
    },
    _getKeyboardListeners: () => [],
    _attachKeyboardEvents() {
        this._detachKeyboardEvents();
        var {
            focusStateEnabled: focusStateEnabled,
            onKeyboardHandled: onKeyboardHandled
        } = this.option();
        var hasChildListeners = this._getKeyboardListeners().length;
        var hasKeyboardEventHandler = !!onKeyboardHandled;
        var shouldAttach = focusStateEnabled || hasChildListeners || hasKeyboardEventHandler;
        if (shouldAttach) {
            this._keyboardListenerId = _events_short__WEBPACK_IMPORTED_MODULE_3__["keyboard"].on(this._keyboardEventBindingTarget(), this._focusTarget(), opts => this._keyboardHandler(opts))
        }
    },
    _keyboardHandler(options, onlyChildProcessing) {
        if (!onlyChildProcessing) {
            var {
                originalEvent: originalEvent,
                keyName: keyName,
                which: which
            } = options;
            var keys = this._supportedKeys(originalEvent);
            var func = keys[keyName] || keys[which];
            if (void 0 !== func) {
                var handler = func.bind(this);
                var result = handler(originalEvent, options);
                if (!result) {
                    return false
                }
            }
        }
        var keyboardListeners = this._getKeyboardListeners();
        var {
            onKeyboardHandled: onKeyboardHandled
        } = this.option();
        keyboardListeners.forEach(listener => listener && listener._keyboardHandler(options));
        onKeyboardHandled && onKeyboardHandled(options);
        return true
    },
    _refreshFocusState() {
        this._cleanFocusState();
        this._renderFocusState()
    },
    _cleanFocusState() {
        var $element = this._focusTarget();
        $element.removeAttr("tabIndex");
        this._toggleFocusClass(false);
        this._detachFocusEvents();
        this._detachKeyboardEvents()
    },
    _detachKeyboardEvents() {
        _events_short__WEBPACK_IMPORTED_MODULE_3__["keyboard"].off(this._keyboardListenerId);
        this._keyboardListenerId = null
    },
    _attachHoverEvents() {
        var {
            hoverStateEnabled: hoverStateEnabled
        } = this.option();
        var selector = this._activeStateUnit;
        var $el = this._eventBindingTarget();
        _events_short__WEBPACK_IMPORTED_MODULE_3__["hover"].off($el, {
            selector: selector,
            namespace: "UIFeedback"
        });
        if (hoverStateEnabled) {
            _events_short__WEBPACK_IMPORTED_MODULE_3__["hover"].on($el, new _core_action__WEBPACK_IMPORTED_MODULE_1__["default"](_ref2 => {
                var {
                    event: event,
                    element: element
                } = _ref2;
                this._hoverStartHandler(event);
                this.option("hoveredElement", Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element))
            }, {
                excludeValidators: ["readOnly"]
            }), event => {
                this.option("hoveredElement", null);
                this._hoverEndHandler(event)
            }, {
                selector: selector,
                namespace: "UIFeedback"
            })
        }
    },
    _attachFeedbackEvents() {
        var {
            activeStateEnabled: activeStateEnabled
        } = this.option();
        var selector = this._activeStateUnit;
        var $el = this._eventBindingTarget();
        _events_short__WEBPACK_IMPORTED_MODULE_3__["active"].off($el, {
            namespace: "UIFeedback",
            selector: selector
        });
        if (activeStateEnabled) {
            _events_short__WEBPACK_IMPORTED_MODULE_3__["active"].on($el, new _core_action__WEBPACK_IMPORTED_MODULE_1__["default"](_ref3 => {
                var {
                    event: event,
                    element: element
                } = _ref3;
                return this._toggleActiveState(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element), true, event)
            }), new _core_action__WEBPACK_IMPORTED_MODULE_1__["default"](_ref4 => {
                var {
                    event: event,
                    element: element
                } = _ref4;
                return this._toggleActiveState(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element), false, event)
            }, {
                excludeValidators: ["disabled", "readOnly"]
            }), {
                showTimeout: this._feedbackShowTimeout,
                hideTimeout: this._feedbackHideTimeout,
                selector: selector,
                namespace: "UIFeedback"
            })
        }
    },
    _detachFocusEvents() {
        var $el = this._focusEventTarget();
        _events_short__WEBPACK_IMPORTED_MODULE_3__["focus"].off($el, {
            namespace: "".concat(this.NAME, "Focus")
        })
    },
    _attachFocusEvents() {
        var $el = this._focusEventTarget();
        _events_short__WEBPACK_IMPORTED_MODULE_3__["focus"].on($el, e => this._focusInHandler(e), e => this._focusOutHandler(e), {
            namespace: "".concat(this.NAME, "Focus"),
            isFocusable: (index, el) => Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(el).is(_selectors__WEBPACK_IMPORTED_MODULE_7__["focusable"])
        })
    },
    _hoverStartHandler: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    _hoverEndHandler: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
    _toggleActiveState($element, value) {
        this.option("isActive", value);
        $element.toggleClass("dx-state-active", value)
    },
    _updatedHover() {
        var hoveredElement = this._options.silent("hoveredElement");
        this._hover(hoveredElement, hoveredElement)
    },
    _findHoverTarget($el) {
        return $el && $el.closest(this._activeStateUnit || this._eventBindingTarget())
    },
    _hover($el, $previous) {
        var {
            hoverStateEnabled: hoverStateEnabled,
            disabled: disabled,
            isActive: isActive
        } = this.option();
        $previous = this._findHoverTarget($previous);
        $previous && $previous.toggleClass("dx-state-hover", false);
        if ($el && hoverStateEnabled && !disabled && !isActive) {
            var newHoveredElement = this._findHoverTarget($el);
            newHoveredElement && newHoveredElement.toggleClass("dx-state-hover", true)
        }
    },
    _toggleDisabledState(value) {
        this.$element().toggleClass("dx-state-disabled", Boolean(value));
        this.setAria("disabled", value || void 0)
    },
    _toggleIndependentState() {
        this.$element().toggleClass("dx-state-independent", this.option("ignoreParentReadOnly"))
    },
    _setWidgetOption(widgetName, args) {
        if (!this[widgetName]) {
            return
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isPlainObject"])(args[0])) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(args[0], (option, value) => this._setWidgetOption(widgetName, [option, value]));
            return
        }
        var optionName = args[0];
        var value = args[1];
        if (1 === args.length) {
            value = this.option(optionName)
        }
        var widgetOptionMap = this["".concat(widgetName, "OptionMap")];
        this[widgetName].option(widgetOptionMap ? widgetOptionMap(optionName) : optionName, value)
    },
    _optionChanged(args) {
        var {
            name: name,
            value: value,
            previousValue: previousValue
        } = args;
        switch (name) {
            case "disabled":
                this._toggleDisabledState(value);
                this._updatedHover();
                this._refreshFocusState();
                break;
            case "hint":
                this._renderHint();
                break;
            case "ignoreParentReadOnly":
                this._toggleIndependentState();
                break;
            case "activeStateEnabled":
                this._attachFeedbackEvents();
                break;
            case "hoverStateEnabled":
                this._attachHoverEvents();
                this._updatedHover();
                break;
            case "tabIndex":
            case "focusStateEnabled":
                this._refreshFocusState();
                break;
            case "onFocusIn":
            case "onFocusOut":
            case "useResizeObserver":
                break;
            case "accessKey":
                this._renderAccessKey();
                break;
            case "hoveredElement":
                this._hover(value, previousValue);
                break;
            case "isActive":
                this._updatedHover();
                break;
            case "visible":
                this._toggleVisibility(value);
                if (this._isVisibilityChangeSupported()) {
                    this._checkVisibilityChanged(value ? "shown" : "hiding")
                }
                break;
            case "onKeyboardHandled":
                this._attachKeyboardEvents();
                break;
            case "onContentReady":
                this._initContentReadyAction();
                break;
            default:
                this.callBase(args)
        }
    },
    _isVisible() {
        var {
            visible: visible
        } = this.option();
        return this.callBase() && visible
    },
    beginUpdate() {
        this._ready(false);
        this.callBase()
    },
    endUpdate() {
        this.callBase();
        if (this._initialized) {
            this._ready(true)
        }
    },
    _ready(value) {
        if (0 === arguments.length) {
            return this._isReady
        }
        this._isReady = value
    },
    setAria() {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isPlainObject"])(arguments.length <= 0 ? void 0 : arguments[0])) {
            setAttribute(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1], (arguments.length <= 2 ? void 0 : arguments[2]) || this._getAriaTarget())
        } else {
            var target = (arguments.length <= 1 ? void 0 : arguments[1]) || this._getAriaTarget();
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(arguments.length <= 0 ? void 0 : arguments[0], (name, value) => setAttribute(name, value, target))
        }
    },
    isReady() {
        return this._ready()
    },
    repaint() {
        this._refresh()
    },
    focus() {
        _events_short__WEBPACK_IMPORTED_MODULE_3__["focus"].trigger(this._focusTarget())
    },
    registerKeyHandler(key, handler) {
        var currentKeys = this._supportedKeys();
        this._supportedKeys = () => Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_6__["extend"])(currentKeys, {
            [key]: handler
        })
    }
});
Widget.getOptionsFromContainer = _ref5 => {
    var {
        name: name,
        fullName: fullName,
        value: value
    } = _ref5;
    var options = {};
    if (name === fullName) {
        options = value
    } else {
        var option = fullName.split(".").pop();
        options[option] = value
    }
    return options
};
/* harmony default export */ __webpack_exports__["default"] = (Widget);


/***/ })

}]);