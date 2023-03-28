(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[66],{

/***/ "./node_modules/devextreme/esm/core/http_request.js":
/*!**********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/http_request.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _utils_dependency_injector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/dependency_injector */ "./node_modules/devextreme/esm/core/utils/dependency_injector.js");
/**
 * DevExtreme (esm/core/http_request.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var window = Object(_utils_window__WEBPACK_IMPORTED_MODULE_0__["getWindow"])();

var nativeXMLHttpRequest = {
    getXhr: function() {
        return new window.XMLHttpRequest
    }
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_dependency_injector__WEBPACK_IMPORTED_MODULE_1__["default"])(nativeXMLHttpRequest));


/***/ }),

/***/ "./node_modules/devextreme/esm/core/templates/bindable_template.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/templates/bindable_template.js ***!
  \*************************************************************************/
/*! exports provided: BindableTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BindableTemplate", function() { return BindableTemplate; });
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _template_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template_base */ "./node_modules/devextreme/esm/core/templates/template_base.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _events_remove__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/remove */ "./node_modules/devextreme/esm/events/remove.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/core/templates/bindable_template.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var watchChanges = function(rawData, watchMethod, fields, fieldsMap, callback) {
    var fieldsDispose;
    var globalDispose = ((data, watchMethod, callback) => watchMethod(() => data, callback))(rawData, watchMethod, (function(dataWithRawFields) {
        fieldsDispose && fieldsDispose();
        if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_4__["isPrimitive"])(dataWithRawFields)) {
            callback(dataWithRawFields);
            return
        }
        fieldsDispose = function(data, watchMethod, fields, fieldsMap, callback) {
            var resolvedData = {};
            var missedFields = fields.slice();
            var watchHandlers = fields.map((function(name) {
                var fieldGetter = fieldsMap[name];
                return watchMethod(fieldGetter ? () => fieldGetter(data) : () => data[name], (function(value) {
                    resolvedData[name] = value;
                    if (missedFields.length) {
                        var index = missedFields.indexOf(name);
                        if (index >= 0) {
                            missedFields.splice(index, 1)
                        }
                    }
                    if (!missedFields.length) {
                        callback(resolvedData)
                    }
                }))
            }));
            return function() {
                watchHandlers.forEach(dispose => dispose())
            }
        }(dataWithRawFields, watchMethod, fields, fieldsMap, callback)
    }));
    return function() {
        fieldsDispose && fieldsDispose();
        globalDispose && globalDispose()
    }
};
class BindableTemplate extends _template_base__WEBPACK_IMPORTED_MODULE_1__["TemplateBase"] {
    constructor(render, fields, watchMethod, fieldsMap) {
        super();
        this._render = render;
        this._fields = fields;
        this._fieldsMap = fieldsMap || {};
        this._watchMethod = watchMethod
    }
    _renderCore(options) {
        var $container = Object(_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(options.container);
        var dispose = watchChanges(options.model, this._watchMethod, this._fields, this._fieldsMap, data => {
            $container.empty();
            this._render($container, data, options.model)
        });
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on($container, _events_remove__WEBPACK_IMPORTED_MODULE_3__["removeEvent"], dispose);
        return $container.contents()
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/ajax.js":
/*!********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/ajax.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deferred__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_http_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/http_request */ "./node_modules/devextreme/esm/core/http_request.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _polyfills_promise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../polyfills/promise */ "./node_modules/devextreme/esm/core/polyfills/promise.js");
/* harmony import */ var _dependency_injector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dependency_injector */ "./node_modules/devextreme/esm/core/utils/dependency_injector.js");
/**
 * DevExtreme (esm/core/utils/ajax.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_3__["getWindow"])();




var SUCCESS = "success";
var ERROR = "error";
var TIMEOUT = "timeout";
var NO_CONTENT = "nocontent";
var PARSER_ERROR = "parsererror";
var isStatusSuccess = function(status) {
    return 200 <= status && status < 300
};
var hasContent = function(status) {
    return 204 !== status
};
var paramsConvert = function(params) {
    var result = [];
    for (var name in params) {
        var value = params[name];
        if (void 0 === value) {
            continue
        }
        if (null === value) {
            value = ""
        }
        if ("function" === typeof value) {
            value = value()
        }
        result.push(encodeURIComponent(name) + "=" + encodeURIComponent(value))
    }
    return result.join("&")
};
var createScript = function(options) {
    var script = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("script");
    for (var name in options) {
        script[name] = options[name]
    }
    return script
};
var removeScript = function(scriptNode) {
    scriptNode.parentNode.removeChild(scriptNode)
};
var appendToHead = function(element) {
    return _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getHead().appendChild(element)
};
var evalScript = function(code) {
    var script = createScript({
        text: code
    });
    appendToHead(script);
    removeScript(script)
};
var evalCrossDomainScript = function(url) {
    var script = createScript({
        src: url
    });
    return new _polyfills_promise__WEBPACK_IMPORTED_MODULE_6__["default"]((function(resolve, reject) {
        var events = {
            load: resolve,
            error: reject
        };
        var loadHandler = function(e) {
            events[e.type]();
            removeScript(script)
        };
        for (var event in events) {
            _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].listen(script, event, loadHandler)
        }
        appendToHead(script)
    }))
};
var getAcceptHeader = function(options) {
    var dataType = options.dataType || "*";
    var scriptAccept = "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript";
    var accepts = {
        "*": "*/*",
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript",
        jsonp: scriptAccept,
        script: scriptAccept
    };
    Object(_extend__WEBPACK_IMPORTED_MODULE_4__["extendFromObject"])(accepts, options.accepts, true);
    return accepts[dataType] ? accepts[dataType] + ("*" !== dataType ? ", */*; q=0.01" : "") : accepts["*"]
};
var getContentTypeHeader = function(options) {
    var defaultContentType;
    if (options.data && !options.upload && "GET" !== getMethod(options)) {
        defaultContentType = "application/x-www-form-urlencoded;charset=utf-8"
    }
    return options.contentType || defaultContentType
};
var getDataFromResponse = function(xhr) {
    return xhr.responseType && "text" !== xhr.responseType || "string" !== typeof xhr.responseText ? xhr.response : xhr.responseText
};
var postProcess = function(deferred, xhr, dataType) {
    var data = getDataFromResponse(xhr);
    switch (dataType) {
        case "jsonp":
            evalScript(data);
            break;
        case "script":
            evalScript(data);
            deferred.resolve(data, SUCCESS, xhr);
            break;
        case "json":
            try {
                deferred.resolve(JSON.parse(data), SUCCESS, xhr)
            } catch (e) {
                deferred.reject(xhr, PARSER_ERROR, e)
            }
            break;
        default:
            deferred.resolve(data, SUCCESS, xhr)
    }
};
var isCrossDomain = function(url) {
    if (!Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_3__["hasWindow"])()) {
        return true
    }
    var crossDomain = false;
    var originAnchor = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("a");
    var urlAnchor = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("a");
    originAnchor.href = window.location.href;
    try {
        urlAnchor.href = url;
        urlAnchor.href = urlAnchor.href;
        crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host
    } catch (e) {
        crossDomain = true
    }
    return crossDomain
};
var setHttpTimeout = function(timeout, xhr) {
    return timeout && setTimeout((function() {
        xhr.customStatus = TIMEOUT;
        xhr.abort()
    }), timeout)
};
var getJsonpOptions = function(options) {
    if ("jsonp" === options.dataType) {
        var random = Math.random().toString().replace(/\D/g, "");
        var callbackName = options.jsonpCallback || "dxCallback" + Date.now() + "_" + random;
        var callbackParameter = options.jsonp || "callback";
        options.data = options.data || {};
        options.data[callbackParameter] = callbackName;
        return callbackName
    }
};
var getRequestOptions = function(options, headers) {
    var params = options.data;
    var paramsAlreadyString = "string" === typeof params;
    var url = options.url || window.location.href;
    if (!paramsAlreadyString && !options.cache) {
        params = params || {};
        params._ = Date.now()
    }
    if (params && !options.upload) {
        if (!paramsAlreadyString) {
            params = paramsConvert(params)
        }
        if ("GET" === getMethod(options)) {
            if ("" !== params) {
                url += (url.indexOf("?") > -1 ? "&" : "?") + params
            }
            params = null
        } else if (headers["Content-Type"] && headers["Content-Type"].indexOf("application/x-www-form-urlencoded") > -1) {
            params = params.replace(/%20/g, "+")
        }
    }
    return {
        url: url,
        parameters: params
    }
};

function getMethod(options) {
    return (options.method || "GET").toUpperCase()
}
var getRequestHeaders = function(options) {
    var headers = options.headers || {};
    headers["Content-Type"] = headers["Content-Type"] || getContentTypeHeader(options);
    headers.Accept = headers.Accept || getAcceptHeader(options);
    if (!options.crossDomain && !headers["X-Requested-With"]) {
        headers["X-Requested-With"] = "XMLHttpRequest"
    }
    return headers
};
var sendRequest = function(options) {
    var xhr = _core_http_request__WEBPACK_IMPORTED_MODULE_2__["default"].getXhr();
    var d = new _deferred__WEBPACK_IMPORTED_MODULE_0__["Deferred"];
    var result = d.promise();
    var async = Object(_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(options.async) ? options.async : true;
    var dataType = options.dataType;
    var timeout = options.timeout || 0;
    var timeoutId;
    options.crossDomain = isCrossDomain(options.url);
    var needScriptEvaluation = "jsonp" === dataType || "script" === dataType;
    if (void 0 === options.cache) {
        options.cache = !needScriptEvaluation
    }
    var callbackName = getJsonpOptions(options);
    var headers = getRequestHeaders(options);
    var requestOptions = getRequestOptions(options, headers);
    var url = requestOptions.url;
    var parameters = requestOptions.parameters;
    if (callbackName) {
        window[callbackName] = function(data) {
            d.resolve(data, SUCCESS, xhr)
        }
    }
    if (options.crossDomain && needScriptEvaluation) {
        evalCrossDomainScript(url).then((function() {
            if ("jsonp" === dataType) {
                return
            }
            d.resolve(null, SUCCESS, xhr)
        }), (function() {
            d.reject(xhr, ERROR)
        }));
        return result
    }
    if (options.crossDomain && !("withCredentials" in xhr)) {
        d.reject(xhr, ERROR);
        return result
    }
    xhr.open(getMethod(options), url, async, options.username, options.password);
    if (async) {
        xhr.timeout = timeout;
        timeoutId = setHttpTimeout(timeout, xhr, d)
    }
    xhr.onreadystatechange = function(e) {
        if (4 === xhr.readyState) {
            clearTimeout(timeoutId);
            if (isStatusSuccess(xhr.status)) {
                if (hasContent(xhr.status)) {
                    postProcess(d, xhr, dataType)
                } else {
                    d.resolve(null, NO_CONTENT, xhr)
                }
            } else {
                d.reject(xhr, xhr.customStatus || ERROR)
            }
        }
    };
    if (options.upload) {
        xhr.upload.onprogress = options.upload.onprogress;
        xhr.upload.onloadstart = options.upload.onloadstart;
        xhr.upload.onabort = options.upload.onabort
    }
    if (options.xhrFields) {
        for (var field in options.xhrFields) {
            xhr[field] = options.xhrFields[field]
        }
    }
    if ("arraybuffer" === options.responseType) {
        xhr.responseType = options.responseType
    }
    for (var name in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, name) && Object(_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(headers[name])) {
            xhr.setRequestHeader(name, headers[name])
        }
    }
    if (options.beforeSend) {
        options.beforeSend(xhr)
    }
    xhr.send(parameters);
    result.abort = function() {
        xhr.abort()
    };
    return result
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_dependency_injector__WEBPACK_IMPORTED_MODULE_7__["default"])({
    sendRequest: sendRequest
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/array_compare.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/array_compare.js ***!
  \*****************************************************************/
/*! exports provided: isKeysEqual, findChanges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKeysEqual", function() { return isKeysEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findChanges", function() { return findChanges; });
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/core/utils/array_compare.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var getKeyWrapper = function(item, getKey) {
    var key = getKey(item);
    if (Object(_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(key)) {
        try {
            return JSON.stringify(key)
        } catch (e) {
            return key
        }
    }
    return key
};
var getSameNewByOld = function(oldItem, newItems, newIndexByKey, getKey) {
    var key = getKeyWrapper(oldItem, getKey);
    return newItems[newIndexByKey[key]]
};
var isKeysEqual = function(oldKeys, newKeys) {
    if (oldKeys.length !== newKeys.length) {
        return false
    }
    for (var i = 0; i < newKeys.length; i++) {
        if (oldKeys[i] !== newKeys[i]) {
            return false
        }
    }
    return true
};
var findChanges = function(oldItems, newItems, getKey, isItemEquals) {
    var oldIndexByKey = {};
    var newIndexByKey = {};
    var addedCount = 0;
    var removeCount = 0;
    var result = [];
    oldItems.forEach((function(item, index) {
        var key = getKeyWrapper(item, getKey);
        oldIndexByKey[key] = index
    }));
    newItems.forEach((function(item, index) {
        var key = getKeyWrapper(item, getKey);
        newIndexByKey[key] = index
    }));
    var itemCount = Math.max(oldItems.length, newItems.length);
    for (var index = 0; index < itemCount + addedCount; index++) {
        var newItem = newItems[index];
        var oldNextIndex = index - addedCount + removeCount;
        var nextOldItem = oldItems[oldNextIndex];
        var isRemoved = !newItem || nextOldItem && !getSameNewByOld(nextOldItem, newItems, newIndexByKey, getKey);
        if (isRemoved) {
            if (nextOldItem) {
                result.push({
                    type: "remove",
                    key: getKey(nextOldItem),
                    index: index,
                    oldItem: nextOldItem
                });
                removeCount++;
                index--
            }
        } else {
            var key = getKeyWrapper(newItem, getKey);
            var oldIndex = oldIndexByKey[key];
            var oldItem = oldItems[oldIndex];
            if (!oldItem) {
                addedCount++;
                result.push({
                    type: "insert",
                    data: newItem,
                    index: index
                })
            } else if (oldIndex === oldNextIndex) {
                if (!isItemEquals(oldItem, newItem)) {
                    result.push({
                        type: "update",
                        data: newItem,
                        key: getKey(newItem),
                        index: index,
                        oldItem: oldItem
                    })
                }
            } else {
                return
            }
        }
    }
    return result
};


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/queue.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/queue.js ***!
  \*********************************************************/
/*! exports provided: create, enqueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return createQueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enqueue", function() { return enqueue; });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors */ "./node_modules/devextreme/esm/core/errors.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/core/utils/queue.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



function createQueue(discardPendingTasks) {
    var _tasks = [];
    var _busy = false;

    function exec() {
        while (_tasks.length) {
            _busy = true;
            var task = _tasks.shift();
            var result = task();
            if (void 0 === result) {
                continue
            }
            if (result.then) {
                Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_1__["when"])(result).always(exec);
                return
            }
            throw _errors__WEBPACK_IMPORTED_MODULE_0__["default"].Error("E0015")
        }
        _busy = false
    }
    return {
        add: function(task, removeTaskCallback) {
            if (!discardPendingTasks) {
                _tasks.push(task)
            } else {
                if (_tasks[0] && removeTaskCallback) {
                    removeTaskCallback(_tasks[0])
                }
                _tasks = [task]
            }
            if (!_busy) {
                exec()
            }
        },
        busy: function() {
            return _busy
        }
    }
}

var enqueue = createQueue().add;


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/selection_filter.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/selection_filter.js ***!
  \********************************************************************/
/*! exports provided: SelectionFilterCreator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionFilterCreator", function() { return SelectionFilterCreator; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/core/utils/selection_filter.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var SelectionFilterCreator = function(selectedItemKeys, isSelectAll) {
    this.getLocalFilter = function(keyGetter, equalKeys, equalByReference, keyExpr) {
        equalKeys = void 0 === equalKeys ? _common__WEBPACK_IMPORTED_MODULE_0__["equalByValue"] : equalKeys;
        return functionFilter.bind(this, equalKeys, keyGetter, equalByReference, keyExpr)
    };
    this.getExpr = function(keyExpr) {
        if (!keyExpr) {
            return
        }
        var filterExpr;
        selectedItemKeys.forEach((function(key, index) {
            filterExpr = filterExpr || [];
            var filterExprPart;
            if (index > 0) {
                filterExpr.push(isSelectAll ? "and" : "or")
            }
            if (Object(_type__WEBPACK_IMPORTED_MODULE_1__["isString"])(keyExpr)) {
                filterExprPart = getFilterForPlainKey(keyExpr, key)
            } else {
                filterExprPart = function(keyExpr, itemKeyValue) {
                    var filterExpr = [];
                    for (var i = 0, length = keyExpr.length; i < length; i++) {
                        var currentKeyExpr = keyExpr[i];
                        var currentKeyValue = itemKeyValue && itemKeyValue[currentKeyExpr];
                        var filterExprPart = getFilterForPlainKey(currentKeyExpr, currentKeyValue);
                        if (!filterExprPart) {
                            break
                        }
                        if (i > 0) {
                            filterExpr.push(isSelectAll ? "or" : "and")
                        }
                        filterExpr.push(filterExprPart)
                    }
                    return filterExpr
                }(keyExpr, key)
            }
            filterExpr.push(filterExprPart)
        }));
        if (filterExpr && 1 === filterExpr.length) {
            filterExpr = filterExpr[0]
        }
        return filterExpr
    };
    this.getCombinedFilter = function(keyExpr, dataSourceFilter) {
        var filterExpr = this.getExpr(keyExpr);
        var combinedFilter = filterExpr;
        if (isSelectAll && dataSourceFilter) {
            if (filterExpr) {
                combinedFilter = [];
                combinedFilter.push(filterExpr);
                combinedFilter.push(dataSourceFilter)
            } else {
                combinedFilter = dataSourceFilter
            }
        }
        return combinedFilter
    };
    var selectedItemKeyHashesMap;
    var normalizeKeys = function(keys, keyOf, keyExpr) {
        return Array.isArray(keyExpr) ? keys.map(key => keyOf(key)) : keys
    };

    function functionFilter(equalKeys, keyOf, equalByReference, keyExpr, item) {
        var key = keyOf(item);
        var keyHash;
        var i;
        if (!equalByReference) {
            keyHash = Object(_common__WEBPACK_IMPORTED_MODULE_0__["getKeyHash"])(key);
            if (!Object(_type__WEBPACK_IMPORTED_MODULE_1__["isObject"])(keyHash)) {
                var selectedKeyHashesMap = function(keyOf, keyExpr) {
                    if (!selectedItemKeyHashesMap) {
                        selectedItemKeyHashesMap = {};
                        var normalizedKeys = normalizeKeys(selectedItemKeys, keyOf, keyExpr);
                        for (var i = 0; i < normalizedKeys.length; i++) {
                            selectedItemKeyHashesMap[Object(_common__WEBPACK_IMPORTED_MODULE_0__["getKeyHash"])(normalizedKeys[i])] = true
                        }
                    }
                    return selectedItemKeyHashesMap
                }(keyOf, keyExpr);
                if (selectedKeyHashesMap[keyHash]) {
                    return !isSelectAll
                }
                return !!isSelectAll
            }
        }
        for (i = 0; i < selectedItemKeys.length; i++) {
            if (equalKeys(selectedItemKeys[i], key)) {
                return !isSelectAll
            }
        }
        return !!isSelectAll
    }

    function getFilterForPlainKey(keyExpr, keyValue) {
        if (void 0 === keyValue) {
            return
        }
        return [keyExpr, isSelectAll ? "<>" : "=", keyValue]
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/data/abstract_store.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/data/abstract_store.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_events_strategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/events_strategy */ "./node_modules/devextreme/esm/core/events_strategy.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors */ "./node_modules/devextreme/esm/data/errors.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/data/utils.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _store_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./store_helper */ "./node_modules/devextreme/esm/data/store_helper.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/data/abstract_store.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var abstract = _core_class__WEBPACK_IMPORTED_MODULE_0__["default"].abstract;






var queryByOptions = _store_helper__WEBPACK_IMPORTED_MODULE_6__["default"].queryByOptions;


var storeImpl = {};
var Store = _core_class__WEBPACK_IMPORTED_MODULE_0__["default"].inherit({
    ctor: function(options) {
        var that = this;
        options = options || {};
        this._eventsStrategy = new _core_events_strategy__WEBPACK_IMPORTED_MODULE_1__["EventsStrategy"](this);
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(["onLoaded", "onLoading", "onInserted", "onInserting", "onUpdated", "onUpdating", "onPush", "onRemoved", "onRemoving", "onModified", "onModifying"], (function(_, optionName) {
            if (optionName in options) {
                that.on(optionName.slice(2).toLowerCase(), options[optionName])
            }
        }));
        this._key = options.key;
        this._errorHandler = options.errorHandler;
        this._useDefaultSearch = true
    },
    _customLoadOptions: function() {
        return null
    },
    key: function() {
        return this._key
    },
    keyOf: function(obj) {
        if (!this._keyGetter) {
            this._keyGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_5__["compileGetter"])(this.key())
        }
        return this._keyGetter(obj)
    },
    _requireKey: function() {
        if (!this.key()) {
            throw _errors__WEBPACK_IMPORTED_MODULE_3__["errors"].Error("E4005")
        }
    },
    load: function(options) {
        var that = this;
        options = options || {};
        this._eventsStrategy.fireEvent("loading", [options]);
        return this._withLock(this._loadImpl(options)).done((function(result) {
            that._eventsStrategy.fireEvent("loaded", [result, options])
        }))
    },
    _loadImpl: function(options) {
        return queryByOptions(this.createQuery(options), options).enumerate()
    },
    _withLock: function(task) {
        var result = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_7__["Deferred"];
        task.done((function() {
            var that = this;
            var args = arguments;
            _utils__WEBPACK_IMPORTED_MODULE_4__["processRequestResultLock"].promise().done((function() {
                result.resolveWith(that, args)
            }))
        })).fail((function() {
            result.rejectWith(this, arguments)
        }));
        return result
    },
    createQuery: abstract,
    totalCount: function(options) {
        return this._totalCountImpl(options)
    },
    _totalCountImpl: function(options) {
        return queryByOptions(this.createQuery(options), options, true).count()
    },
    byKey: function(key, extraOptions) {
        return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)))
    },
    _byKeyImpl: abstract,
    insert: function(values) {
        var that = this;
        that._eventsStrategy.fireEvent("modifying");
        that._eventsStrategy.fireEvent("inserting", [values]);
        return that._addFailHandlers(that._insertImpl(values).done((function(callbackValues, callbackKey) {
            that._eventsStrategy.fireEvent("inserted", [callbackValues, callbackKey]);
            that._eventsStrategy.fireEvent("modified")
        })))
    },
    _insertImpl: abstract,
    update: function(key, values) {
        var that = this;
        that._eventsStrategy.fireEvent("modifying");
        that._eventsStrategy.fireEvent("updating", [key, values]);
        return that._addFailHandlers(that._updateImpl(key, values).done((function() {
            that._eventsStrategy.fireEvent("updated", [key, values]);
            that._eventsStrategy.fireEvent("modified")
        })))
    },
    _updateImpl: abstract,
    push: function(changes) {
        var beforePushArgs = {
            changes: changes,
            waitFor: []
        };
        this._eventsStrategy.fireEvent("beforePush", [beforePushArgs]);
        Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_7__["when"])(...beforePushArgs.waitFor).done(() => {
            this._pushImpl(changes);
            this._eventsStrategy.fireEvent("push", [changes])
        })
    },
    _pushImpl: _core_utils_common__WEBPACK_IMPORTED_MODULE_8__["noop"],
    remove: function(key) {
        var that = this;
        that._eventsStrategy.fireEvent("modifying");
        that._eventsStrategy.fireEvent("removing", [key]);
        return that._addFailHandlers(that._removeImpl(key).done((function(callbackKey) {
            that._eventsStrategy.fireEvent("removed", [callbackKey]);
            that._eventsStrategy.fireEvent("modified")
        })))
    },
    _removeImpl: abstract,
    _addFailHandlers: function(deferred) {
        return deferred.fail(this._errorHandler).fail(_errors__WEBPACK_IMPORTED_MODULE_3__["handleError"])
    },
    on(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this
    },
    off(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this
    }
});
Store.create = function(alias, options) {
    if (!(alias in storeImpl)) {
        throw _errors__WEBPACK_IMPORTED_MODULE_3__["errors"].Error("E4020", alias)
    }
    return new storeImpl[alias](options)
};
Store.registerClass = function(type, alias) {
    if (alias) {
        storeImpl[alias] = type
    }
    return type
};
Store.inherit = function(inheritor) {
    return function(members, alias) {
        var type = inheritor.apply(this, [members]);
        Store.registerClass(type, alias);
        return type
    }
}(Store.inherit);
/* harmony default export */ __webpack_exports__["default"] = (Store);


/***/ }),

/***/ "./node_modules/devextreme/esm/data/array_query.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/data/array_query.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errors */ "./node_modules/devextreme/esm/data/errors.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/data/utils.js");
/**
 * DevExtreme (esm/data/array_query.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var Iterator = _core_class__WEBPACK_IMPORTED_MODULE_0__["default"].inherit({
    toArray: function() {
        var result = [];
        this.reset();
        while (this.next()) {
            result.push(this.current())
        }
        return result
    },
    countable: function() {
        return false
    }
});
var ArrayIterator = Iterator.inherit({
    ctor: function(array) {
        this.array = array;
        this.index = -1
    },
    next: function() {
        if (this.index + 1 < this.array.length) {
            this.index++;
            return true
        }
        return false
    },
    current: function() {
        return this.array[this.index]
    },
    reset: function() {
        this.index = -1
    },
    toArray: function() {
        return this.array.slice(0)
    },
    countable: function() {
        return true
    },
    count: function() {
        return this.array.length
    }
});
var WrappedIterator = Iterator.inherit({
    ctor: function(iter) {
        this.iter = iter
    },
    next: function() {
        return this.iter.next()
    },
    current: function() {
        return this.iter.current()
    },
    reset: function() {
        return this.iter.reset()
    }
});
var MapIterator = WrappedIterator.inherit({
    ctor: function(iter, mapper) {
        this.callBase(iter);
        this.index = -1;
        this.mapper = mapper
    },
    current: function() {
        return this.mapper(this.callBase(), this.index)
    },
    next: function() {
        var hasNext = this.callBase();
        if (hasNext) {
            this.index++
        }
        return hasNext
    }
});
var defaultCompare = function(xValue, yValue) {
    xValue = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(xValue);
    yValue = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(yValue);
    if (null === xValue && null !== yValue) {
        return -1
    }
    if (null !== xValue && null === yValue) {
        return 1
    }
    if (void 0 === xValue && void 0 !== yValue) {
        return 1
    }
    if (void 0 !== xValue && void 0 === yValue) {
        return -1
    }
    if (xValue < yValue) {
        return -1
    }
    if (xValue > yValue) {
        return 1
    }
    return 0
};
var SortIterator = Iterator.inherit({
    ctor: function(iter, getter, desc, compare) {
        if (!(iter instanceof MapIterator)) {
            iter = new MapIterator(iter, this._wrap)
        }
        this.iter = iter;
        this.rules = [{
            getter: getter,
            desc: desc,
            compare: compare
        }]
    },
    thenBy: function(getter, desc, compare) {
        var result = new SortIterator(this.sortedIter || this.iter, getter, desc, compare);
        if (!this.sortedIter) {
            result.rules = this.rules.concat(result.rules)
        }
        return result
    },
    next: function() {
        this._ensureSorted();
        return this.sortedIter.next()
    },
    current: function() {
        this._ensureSorted();
        return this.sortedIter.current()
    },
    reset: function() {
        delete this.sortedIter
    },
    countable: function() {
        return this.sortedIter || this.iter.countable()
    },
    count: function() {
        if (this.sortedIter) {
            return this.sortedIter.count()
        }
        return this.iter.count()
    },
    _ensureSorted: function() {
        var that = this;
        if (that.sortedIter) {
            return
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(that.rules, (function() {
            this.getter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["compileGetter"])(this.getter)
        }));
        that.sortedIter = new MapIterator(new ArrayIterator(this.iter.toArray().sort((function(x, y) {
            return that._compare(x, y)
        }))), that._unwrap)
    },
    _wrap: function(record, index) {
        return {
            index: index,
            value: record
        }
    },
    _unwrap: function(wrappedItem) {
        return wrappedItem.value
    },
    _compare: function(x, y) {
        var xIndex = x.index;
        var yIndex = y.index;
        x = x.value;
        y = y.value;
        if (x === y) {
            return xIndex - yIndex
        }
        for (var i = 0, rulesCount = this.rules.length; i < rulesCount; i++) {
            var rule = this.rules[i];
            var xValue = rule.getter(x);
            var yValue = rule.getter(y);
            var compare = rule.compare || defaultCompare;
            var compareResult = compare(xValue, yValue);
            if (compareResult) {
                return rule.desc ? -compareResult : compareResult
            }
        }
        return xIndex - yIndex
    }
});
var compileCriteria = function() {
    var toString = function(value) {
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(value) ? value.toString() : ""
    };

    function compileEquals(getter, value, negate) {
        return function(obj) {
            obj = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(getter(obj));
            var result = function(value) {
                return "" === value || 0 === value || false === value
            }(value) ? obj === value : obj == value;
            if (negate) {
                result = !result
            }
            return result
        }
    }
    return function(crit) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(crit)) {
            return crit
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_6__["isGroupCriterion"])(crit)) {
            return function(crit) {
                var ops = [];
                var isConjunctiveOperator = false;
                var isConjunctiveNextOperator = false;
                Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(crit, (function() {
                    if (Array.isArray(this) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(this)) {
                        if (ops.length > 1 && isConjunctiveOperator !== isConjunctiveNextOperator) {
                            throw new _errors__WEBPACK_IMPORTED_MODULE_5__["errors"].Error("E4019")
                        }
                        ops.push(compileCriteria(this));
                        isConjunctiveOperator = isConjunctiveNextOperator;
                        isConjunctiveNextOperator = true
                    } else {
                        isConjunctiveNextOperator = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["isConjunctiveOperator"])(this)
                    }
                }));
                return function(d) {
                    var result = isConjunctiveOperator;
                    for (var i = 0; i < ops.length; i++) {
                        if (ops[i](d) !== isConjunctiveOperator) {
                            result = !isConjunctiveOperator;
                            break
                        }
                    }
                    return result
                }
            }(crit)
        }
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_6__["isUnaryOperation"])(crit)) {
            return function(crit) {
                var op = crit[0];
                var criteria = compileCriteria(crit[1]);
                if ("!" === op) {
                    return function(obj) {
                        return !criteria(obj)
                    }
                }
                throw _errors__WEBPACK_IMPORTED_MODULE_5__["errors"].Error("E4003", op)
            }(crit)
        }
        return function(crit) {
            crit = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["normalizeBinaryCriterion"])(crit);
            var getter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["compileGetter"])(crit[0]);
            var op = crit[1];
            var value = crit[2];
            value = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(value);
            switch (op.toLowerCase()) {
                case "=":
                    return compileEquals(getter, value);
                case "<>":
                    return compileEquals(getter, value, true);
                case ">":
                    return function(obj) {
                        return Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(getter(obj)) > value
                    };
                case "<":
                    return function(obj) {
                        return Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(getter(obj)) < value
                    };
                case ">=":
                    return function(obj) {
                        return Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(getter(obj)) >= value
                    };
                case "<=":
                    return function(obj) {
                        return Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(getter(obj)) <= value
                    };
                case "startswith":
                    return function(obj) {
                        return 0 === Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(toString(getter(obj))).indexOf(value)
                    };
                case "endswith":
                    return function(obj) {
                        var getterValue = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(toString(getter(obj)));
                        var searchValue = toString(value);
                        if (getterValue.length < searchValue.length) {
                            return false
                        }
                        var index = getterValue.lastIndexOf(value);
                        return -1 !== index && index === getterValue.length - value.length
                    };
                case "contains":
                    return function(obj) {
                        return Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(toString(getter(obj))).indexOf(value) > -1
                    };
                case "notcontains":
                    return function(obj) {
                        return -1 === Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["toComparable"])(toString(getter(obj))).indexOf(value)
                    }
            }
            throw _errors__WEBPACK_IMPORTED_MODULE_5__["errors"].Error("E4003", op)
        }(crit)
    }
}();
var FilterIterator = WrappedIterator.inherit({
    ctor: function(iter, criteria) {
        this.callBase(iter);
        this.criteria = compileCriteria(criteria)
    },
    next: function() {
        while (this.iter.next()) {
            if (this.criteria(this.current())) {
                return true
            }
        }
        return false
    }
});
var GroupIterator = Iterator.inherit({
    ctor: function(iter, getter) {
        this.iter = iter;
        this.getter = getter
    },
    next: function() {
        this._ensureGrouped();
        return this.groupedIter.next()
    },
    current: function() {
        this._ensureGrouped();
        return this.groupedIter.current()
    },
    reset: function() {
        delete this.groupedIter
    },
    countable: function() {
        return !!this.groupedIter
    },
    count: function() {
        return this.groupedIter.count()
    },
    _ensureGrouped: function() {
        if (this.groupedIter) {
            return
        }
        var hash = {};
        var keys = [];
        var iter = this.iter;
        var getter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["compileGetter"])(this.getter);
        iter.reset();
        while (iter.next()) {
            var current = iter.current();
            var key = getter(current);
            if (key in hash) {
                hash[key].push(current)
            } else {
                hash[key] = [current];
                keys.push(key)
            }
        }
        this.groupedIter = new ArrayIterator(Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["map"])(keys, (function(key) {
            return {
                key: key,
                items: hash[key]
            }
        })))
    }
});
var SelectIterator = WrappedIterator.inherit({
    ctor: function(iter, getter) {
        this.callBase(iter);
        this.getter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["compileGetter"])(getter)
    },
    current: function() {
        return this.getter(this.callBase())
    },
    countable: function() {
        return this.iter.countable()
    },
    count: function() {
        return this.iter.count()
    }
});
var SliceIterator = WrappedIterator.inherit({
    ctor: function(iter, skip, take) {
        this.callBase(iter);
        this.skip = Math.max(0, skip);
        this.take = Math.max(0, take);
        this.pos = 0
    },
    next: function() {
        if (this.pos >= this.skip + this.take) {
            return false
        }
        while (this.pos < this.skip && this.iter.next()) {
            this.pos++
        }
        this.pos++;
        return this.iter.next()
    },
    reset: function() {
        this.callBase();
        this.pos = 0
    },
    countable: function() {
        return this.iter.countable()
    },
    count: function() {
        return Math.min(this.iter.count() - this.skip, this.take)
    }
});
var arrayQueryImpl = function arrayQueryImpl(iter, queryOptions) {
    queryOptions = queryOptions || {};
    if (!(iter instanceof Iterator)) {
        iter = new ArrayIterator(iter)
    }
    var handleError = function(error) {
        var handler = queryOptions.errorHandler;
        if (handler) {
            handler(error)
        }
        Object(_errors__WEBPACK_IMPORTED_MODULE_5__["handleError"])(error)
    };
    var aggregateCore = function(aggregator) {
        var d = (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__["Deferred"]).fail(handleError);
        var seed;
        var step = aggregator.step;
        var finalize = aggregator.finalize;
        try {
            iter.reset();
            if ("seed" in aggregator) {
                seed = aggregator.seed
            } else {
                seed = iter.next() ? iter.current() : NaN
            }
            var accumulator = seed;
            while (iter.next()) {
                accumulator = step(accumulator, iter.current())
            }
            d.resolve(finalize ? finalize(accumulator) : accumulator)
        } catch (x) {
            d.reject(x)
        }
        return d.promise()
    };
    var standardAggregate = function(name) {
        return aggregateCore(_utils__WEBPACK_IMPORTED_MODULE_6__["aggregators"][name])
    };
    var select = function(getter) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(getter) && !Array.isArray(getter)) {
            getter = [].slice.call(arguments)
        }
        return chainQuery(new SelectIterator(iter, getter))
    };
    var selectProp = function(name) {
        return select(Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_3__["compileGetter"])(name))
    };

    function chainQuery(iter) {
        return arrayQueryImpl(iter, queryOptions)
    }
    return {
        toArray: function() {
            return iter.toArray()
        },
        enumerate: function() {
            var d = (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__["Deferred"]).fail(handleError);
            try {
                d.resolve(iter.toArray())
            } catch (x) {
                d.reject(x)
            }
            return d.promise()
        },
        sortBy: function(getter, desc, compare) {
            return chainQuery(new SortIterator(iter, getter, desc, compare))
        },
        thenBy: function(getter, desc, compare) {
            if (iter instanceof SortIterator) {
                return chainQuery(iter.thenBy(getter, desc, compare))
            }
            throw _errors__WEBPACK_IMPORTED_MODULE_5__["errors"].Error("E4004")
        },
        filter: function(criteria) {
            if (!Array.isArray(criteria)) {
                criteria = [].slice.call(arguments)
            }
            return chainQuery(new FilterIterator(iter, criteria))
        },
        slice: function(skip, take) {
            if (void 0 === take) {
                take = Number.MAX_VALUE
            }
            return chainQuery(new SliceIterator(iter, skip, take))
        },
        select: select,
        groupBy: function(getter) {
            return chainQuery(new GroupIterator(iter, getter))
        },
        aggregate: function(seed, step, finalize) {
            if (arguments.length < 2) {
                return aggregateCore({
                    step: arguments[0]
                })
            }
            return aggregateCore({
                seed: seed,
                step: step,
                finalize: finalize
            })
        },
        count: function() {
            if (iter.countable()) {
                var d = (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__["Deferred"]).fail(handleError);
                try {
                    d.resolve(iter.count())
                } catch (x) {
                    d.reject(x)
                }
                return d.promise()
            }
            return standardAggregate("count")
        },
        sum: function(getter) {
            if (getter) {
                return selectProp(getter).sum()
            }
            return standardAggregate("sum")
        },
        min: function(getter) {
            if (getter) {
                return selectProp(getter).min()
            }
            return standardAggregate("min")
        },
        max: function(getter) {
            if (getter) {
                return selectProp(getter).max()
            }
            return standardAggregate("max")
        },
        avg: function(getter) {
            if (getter) {
                return selectProp(getter).avg()
            }
            return standardAggregate("avg")
        }
    }
};
/* harmony default export */ __webpack_exports__["default"] = (arrayQueryImpl);


/***/ }),

/***/ "./node_modules/devextreme/esm/data/array_store.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/data/array_store.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/data/utils.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./node_modules/devextreme/esm/data/query.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors */ "./node_modules/devextreme/esm/data/errors.js");
/* harmony import */ var _abstract_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./abstract_store */ "./node_modules/devextreme/esm/data/abstract_store.js");
/* harmony import */ var _array_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./array_utils */ "./node_modules/devextreme/esm/data/array_utils.js");
/**
 * DevExtreme (esm/data/array_store.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var ArrayStore = _abstract_store__WEBPACK_IMPORTED_MODULE_3__["default"].inherit({
    ctor: function(options) {
        if (Array.isArray(options)) {
            options = {
                data: options
            }
        } else {
            options = options || {}
        }
        this.callBase(options);
        var initialArray = options.data;
        if (initialArray && !Array.isArray(initialArray)) {
            throw _errors__WEBPACK_IMPORTED_MODULE_2__["errors"].Error("E4006")
        }
        this._array = initialArray || []
    },
    createQuery: function() {
        return Object(_query__WEBPACK_IMPORTED_MODULE_1__["default"])(this._array, {
            errorHandler: this._errorHandler
        })
    },
    _byKeyImpl: function(key) {
        var index = Object(_array_utils__WEBPACK_IMPORTED_MODULE_4__["indexByKey"])(this, this._array, key);
        if (-1 === index) {
            return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["rejectedPromise"])(_errors__WEBPACK_IMPORTED_MODULE_2__["errors"].Error("E4009"))
        }
        return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["trivialPromise"])(this._array[index])
    },
    _insertImpl: function(values) {
        return Object(_array_utils__WEBPACK_IMPORTED_MODULE_4__["insert"])(this, this._array, values)
    },
    _pushImpl: function(changes) {
        Object(_array_utils__WEBPACK_IMPORTED_MODULE_4__["applyBatch"])({
            keyInfo: this,
            data: this._array,
            changes: changes
        })
    },
    _updateImpl: function(key, values) {
        return Object(_array_utils__WEBPACK_IMPORTED_MODULE_4__["update"])(this, this._array, key, values)
    },
    _removeImpl: function(key) {
        return Object(_array_utils__WEBPACK_IMPORTED_MODULE_4__["remove"])(this, this._array, key)
    },
    clear: function() {
        this._eventsStrategy.fireEvent("modifying");
        this._array = [];
        this._eventsStrategy.fireEvent("modified")
    }
}, "array");
/* harmony default export */ __webpack_exports__["default"] = (ArrayStore);


/***/ }),

/***/ "./node_modules/devextreme/esm/data/array_utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/data/array_utils.js ***!
  \*********************************************************/
/*! exports provided: applyBatch, createObjectWithChanges, update, insert, remove, indexByKey, applyChanges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyBatch", function() { return applyBatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createObjectWithChanges", function() { return createObjectWithChanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return insert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexByKey", function() { return indexByKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyChanges", function() { return applyChanges; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/config */ "./node_modules/devextreme/esm/core/config.js");
/* harmony import */ var _core_guid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/guid */ "./node_modules/devextreme/esm/core/guid.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./errors */ "./node_modules/devextreme/esm/data/errors.js");
/* harmony import */ var _core_utils_object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/object */ "./node_modules/devextreme/esm/core/utils/object.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/data/utils.js");
/**
 * DevExtreme (esm/data/array_utils.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









function hasKey(target, keyOrKeys) {
    var key;
    var keys = "string" === typeof keyOrKeys ? keyOrKeys.split() : keyOrKeys.slice();
    while (keys.length) {
        key = keys.shift();
        if (key in target) {
            return true
        }
    }
    return false
}

function findItems(keyInfo, items, key, groupCount) {
    var childItems;
    var result;
    if (groupCount) {
        for (var i = 0; i < items.length; i++) {
            childItems = items[i].items || items[i].collapsedItems || [];
            result = findItems(keyInfo, childItems || [], key, groupCount - 1);
            if (result) {
                return result
            }
        }
    } else if (indexByKey(keyInfo, items, key) >= 0) {
        return items
    }
}

function getItems(keyInfo, items, key, groupCount) {
    if (groupCount) {
        return findItems(keyInfo, items, key, groupCount) || []
    }
    return items
}

function generateDataByKeyMap(keyInfo, array) {
    if (keyInfo.key() && (!array._dataByKeyMap || array._dataByKeyMapLength !== array.length)) {
        var dataByKeyMap = {};
        var arrayLength = array.length;
        for (var i = 0; i < arrayLength; i++) {
            dataByKeyMap[JSON.stringify(keyInfo.keyOf(array[i]))] = array[i]
        }
        array._dataByKeyMap = dataByKeyMap;
        array._dataByKeyMapLength = arrayLength
    }
}

function getCacheValue(array, key) {
    if (array._dataByKeyMap) {
        return array._dataByKeyMap[JSON.stringify(key)]
    }
}

function getHasKeyCacheValue(array, key) {
    if (array._dataByKeyMap) {
        return array._dataByKeyMap[JSON.stringify(key)]
    }
    return true
}

function setDataByKeyMapValue(array, key, data) {
    if (array._dataByKeyMap) {
        array._dataByKeyMap[JSON.stringify(key)] = data;
        array._dataByKeyMapLength += data ? 1 : -1
    }
}

function cloneInstance(instance, clonedInstances) {
    clonedInstances = clonedInstances || new WeakMap;
    var result = instance ? Object.create(Object.getPrototypeOf(instance)) : {};
    if (instance) {
        clonedInstances.set(instance, result)
    }
    var instanceWithoutPrototype = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extendFromObject"])({}, instance);
    for (var name in instanceWithoutPrototype) {
        var prop = instanceWithoutPrototype[name];
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(prop) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(prop) && !clonedInstances.has(prop)) {
            instanceWithoutPrototype[name] = cloneInstance(prop, clonedInstances)
        }
    }
    Object(_core_utils_object__WEBPACK_IMPORTED_MODULE_5__["deepExtendArraySafe"])(result, instanceWithoutPrototype, true, true);
    for (var _name in result) {
        var _prop = result[_name];
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(_prop) && clonedInstances.has(_prop)) {
            result[_name] = clonedInstances.get(_prop)
        }
    }
    return result
}

function createObjectWithChanges(target, changes) {
    var result = cloneInstance(target);
    return Object(_core_utils_object__WEBPACK_IMPORTED_MODULE_5__["deepExtendArraySafe"])(result, changes, true, true)
}

function applyBatch(_ref) {
    var {
        keyInfo: keyInfo,
        data: data,
        changes: changes,
        groupCount: groupCount,
        useInsertIndex: useInsertIndex,
        immutable: immutable,
        disableCache: disableCache,
        logError: logError
    } = _ref;
    var resultItems = true === immutable ? [...data] : data;
    changes.forEach(item => {
        var items = "insert" === item.type ? resultItems : getItems(keyInfo, resultItems, item.key, groupCount);
        !disableCache && generateDataByKeyMap(keyInfo, items);
        switch (item.type) {
            case "update":
                update(keyInfo, items, item.key, item.data, true, immutable, logError);
                break;
            case "insert":
                insert(keyInfo, items, item.data, useInsertIndex && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(item.index) ? item.index : -1, true, logError);
                break;
            case "remove":
                remove(keyInfo, items, item.key, true, logError)
        }
    });
    return resultItems
}

function getErrorResult(isBatch, logError, errorCode) {
    return !isBatch ? Object(_utils__WEBPACK_IMPORTED_MODULE_7__["rejectedPromise"])(_errors__WEBPACK_IMPORTED_MODULE_4__["errors"].Error(errorCode)) : logError && _errors__WEBPACK_IMPORTED_MODULE_4__["errors"].log(errorCode)
}

function applyChanges(data, changes) {
    var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var {
        keyExpr: keyExpr = "id",
        immutable: immutable = true
    } = options;
    var keyGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_6__["compileGetter"])(keyExpr);
    var keyInfo = {
        key: () => keyExpr,
        keyOf: obj => keyGetter(obj)
    };
    return applyBatch({
        keyInfo: keyInfo,
        data: data,
        changes: changes,
        immutable: immutable,
        disableCache: true,
        logError: true
    })
}

function update(keyInfo, array, key, data, isBatch, immutable, logError) {
    var target;
    var keyExpr = keyInfo.key();
    if (keyExpr) {
        if (hasKey(data, keyExpr) && !Object(_utils__WEBPACK_IMPORTED_MODULE_7__["keysEqual"])(keyExpr, key, keyInfo.keyOf(data))) {
            return getErrorResult(isBatch, logError, "E4017")
        }
        target = getCacheValue(array, key);
        if (!target) {
            var index = indexByKey(keyInfo, array, key);
            if (index < 0) {
                return getErrorResult(isBatch, logError, "E4009")
            }
            target = array[index];
            if (true === immutable && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(target)) {
                var newTarget = createObjectWithChanges(target, data);
                array[index] = newTarget;
                return !isBatch && Object(_utils__WEBPACK_IMPORTED_MODULE_7__["trivialPromise"])(newTarget, key)
            }
        }
    } else {
        target = key
    }
    Object(_core_utils_object__WEBPACK_IMPORTED_MODULE_5__["deepExtendArraySafe"])(target, data, true);
    if (!isBatch) {
        if (Object(_core_config__WEBPACK_IMPORTED_MODULE_1__["default"])().useLegacyStoreResult) {
            return Object(_utils__WEBPACK_IMPORTED_MODULE_7__["trivialPromise"])(key, data)
        } else {
            return Object(_utils__WEBPACK_IMPORTED_MODULE_7__["trivialPromise"])(target, key)
        }
    }
}

function insert(keyInfo, array, data, index, isBatch, logError) {
    var keyValue;
    var keyExpr = keyInfo.key();
    var obj = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(data) ? Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({}, data) : data;
    if (keyExpr) {
        keyValue = keyInfo.keyOf(obj);
        if (void 0 === keyValue || "object" === typeof keyValue && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isEmptyObject"])(keyValue)) {
            if (Array.isArray(keyExpr)) {
                throw _errors__WEBPACK_IMPORTED_MODULE_4__["errors"].Error("E4007")
            }
            keyValue = obj[keyExpr] = String(new _core_guid__WEBPACK_IMPORTED_MODULE_2__["default"])
        } else if (void 0 !== array[indexByKey(keyInfo, array, keyValue)]) {
            return getErrorResult(isBatch, logError, "E4008")
        }
    } else {
        keyValue = obj
    }
    if (index >= 0) {
        array.splice(index, 0, obj)
    } else {
        array.push(obj)
    }
    setDataByKeyMapValue(array, keyValue, obj);
    if (!isBatch) {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_7__["trivialPromise"])(Object(_core_config__WEBPACK_IMPORTED_MODULE_1__["default"])().useLegacyStoreResult ? data : obj, keyValue)
    }
}

function remove(keyInfo, array, key, isBatch, logError) {
    var index = indexByKey(keyInfo, array, key);
    if (index > -1) {
        array.splice(index, 1);
        setDataByKeyMapValue(array, key, null)
    }
    if (!isBatch) {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_7__["trivialPromise"])(key)
    } else if (index < 0) {
        return getErrorResult(isBatch, logError, "E4009")
    }
}

function indexByKey(keyInfo, array, key) {
    var keyExpr = keyInfo.key();
    if (!getHasKeyCacheValue(array, key)) {
        return -1
    }
    for (var i = 0, arrayLength = array.length; i < arrayLength; i++) {
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_7__["keysEqual"])(keyExpr, keyInfo.keyOf(array[i]), key)) {
            return i
        }
    }
    return -1
}



/***/ }),

/***/ "./node_modules/devextreme/esm/data/custom_store.js":
/*!**********************************************************!*\
  !*** ./node_modules/devextreme/esm/data/custom_store.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/data/utils.js");
/* harmony import */ var _array_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array_utils */ "./node_modules/devextreme/esm/data/array_utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/config */ "./node_modules/devextreme/esm/core/config.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errors */ "./node_modules/devextreme/esm/data/errors.js");
/* harmony import */ var _abstract_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./abstract_store */ "./node_modules/devextreme/esm/data/abstract_store.js");
/* harmony import */ var _array_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./array_query */ "./node_modules/devextreme/esm/data/array_query.js");
/* harmony import */ var _store_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store_helper */ "./node_modules/devextreme/esm/data/store_helper.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/data/custom_store.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */










var TOTAL_COUNT = "totalCount";
var LOAD = "load";
var BY_KEY = "byKey";
var INSERT = "insert";
var UPDATE = "update";
var REMOVE = "remove";

function isPromise(obj) {
    return obj && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(obj.then)
}

function trivialPromise(value) {
    return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"]).resolve(value).promise()
}

function ensureRequiredFuncOption(name, obj) {
    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(obj)) {
        throw _errors__WEBPACK_IMPORTED_MODULE_5__["errors"].Error("E4011", name)
    }
}

function throwInvalidUserFuncResult(name) {
    throw _errors__WEBPACK_IMPORTED_MODULE_5__["errors"].Error("E4012", name)
}

function createUserFuncFailureHandler(pendingDeferred) {
    function errorMessageFromXhr(promiseArguments) {
        var xhr = promiseArguments[0];
        var textStatus = promiseArguments[1];
        if (!xhr || !xhr.getResponseHeader) {
            return null
        }
        return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["errorMessageFromXhr"])(xhr, textStatus)
    }
    return function(arg) {
        var error;
        if (arg instanceof Error) {
            error = arg
        } else {
            error = new Error(errorMessageFromXhr(arguments) || arg && String(arg) || "Unknown error")
        }
        if (error.message !== _utils__WEBPACK_IMPORTED_MODULE_1__["XHR_ERROR_UNLOAD"]) {
            pendingDeferred.reject(error)
        }
    }
}

function invokeUserLoad(store, options) {
    var userFunc = store._loadFunc;
    var userResult;
    ensureRequiredFuncOption(LOAD, userFunc);
    userResult = userFunc.apply(store, [options]);
    if (Array.isArray(userResult)) {
        userResult = trivialPromise(userResult)
    } else if (null === userResult || void 0 === userResult) {
        userResult = trivialPromise([])
    } else if (!isPromise(userResult)) {
        throwInvalidUserFuncResult(LOAD)
    }
    return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["fromPromise"])(userResult)
}

function invokeUserTotalCountFunc(store, options) {
    var userFunc = store._totalCountFunc;
    var userResult;
    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(userFunc)) {
        throw _errors__WEBPACK_IMPORTED_MODULE_5__["errors"].Error("E4021")
    }
    userResult = userFunc.apply(store, [options]);
    if (!isPromise(userResult)) {
        userResult = Number(userResult);
        if (!isFinite(userResult)) {
            throwInvalidUserFuncResult(TOTAL_COUNT)
        }
        userResult = trivialPromise(userResult)
    }
    return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["fromPromise"])(userResult)
}

function invokeUserByKeyFunc(store, key, extraOptions) {
    var userFunc = store._byKeyFunc;
    var userResult;
    ensureRequiredFuncOption(BY_KEY, userFunc);
    userResult = userFunc.apply(store, [key, extraOptions]);
    if (!isPromise(userResult)) {
        userResult = trivialPromise(userResult)
    }
    return Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["fromPromise"])(userResult)
}

function runRawLoad(pendingDeferred, store, userFuncOptions, continuation) {
    if (store.__rawData) {
        continuation(store.__rawData)
    } else {
        var loadPromise = store.__rawDataPromise || invokeUserLoad(store, userFuncOptions);
        if (store._cacheRawData) {
            store.__rawDataPromise = loadPromise
        }
        loadPromise.always((function() {
            delete store.__rawDataPromise
        })).done((function(rawData) {
            if (store._cacheRawData) {
                store.__rawData = rawData
            }
            continuation(rawData)
        })).fail(createUserFuncFailureHandler(pendingDeferred))
    }
}

function runRawLoadWithQuery(pendingDeferred, store, options, countOnly) {
    options = options || {};
    var userFuncOptions = {};
    if ("userData" in options) {
        userFuncOptions.userData = options.userData
    }
    runRawLoad(pendingDeferred, store, userFuncOptions, (function(rawData) {
        var rawDataQuery = Object(_array_query__WEBPACK_IMPORTED_MODULE_7__["default"])(rawData, {
            errorHandler: store._errorHandler
        });
        var itemsQuery;
        var totalCountQuery;
        var waitList = [];
        var items;
        var totalCount;
        if (!countOnly) {
            itemsQuery = _store_helper__WEBPACK_IMPORTED_MODULE_8__["default"].queryByOptions(rawDataQuery, options);
            if (itemsQuery === rawDataQuery) {
                items = rawData.slice(0)
            } else {
                waitList.push(itemsQuery.enumerate().done((function(asyncResult) {
                    items = asyncResult
                })))
            }
        }
        if (options.requireTotalCount || countOnly) {
            totalCountQuery = _store_helper__WEBPACK_IMPORTED_MODULE_8__["default"].queryByOptions(rawDataQuery, options, true);
            if (totalCountQuery === rawDataQuery) {
                totalCount = rawData.length
            } else {
                waitList.push(totalCountQuery.count().done((function(asyncResult) {
                    totalCount = asyncResult
                })))
            }
        }
        _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["when"].apply(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"], waitList).done((function() {
            if (countOnly) {
                pendingDeferred.resolve(totalCount)
            } else if (options.requireTotalCount) {
                pendingDeferred.resolve(items, {
                    totalCount: totalCount
                })
            } else {
                pendingDeferred.resolve(items)
            }
        })).fail((function(x) {
            pendingDeferred.reject(x)
        }))
    }))
}

function runRawLoadWithKey(pendingDeferred, store, key) {
    runRawLoad(pendingDeferred, store, {}, (function(rawData) {
        var keyExpr = store.key();
        var item;
        for (var i = 0, len = rawData.length; i < len; i++) {
            item = rawData[i];
            if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["keysEqual"])(keyExpr, store.keyOf(rawData[i]), key)) {
                pendingDeferred.resolve(item);
                return
            }
        }
        pendingDeferred.reject(_errors__WEBPACK_IMPORTED_MODULE_5__["errors"].Error("E4009"))
    }))
}
var CustomStore = _abstract_store__WEBPACK_IMPORTED_MODULE_6__["default"].inherit({
    ctor: function(options) {
        options = options || {};
        this.callBase(options);
        this._useDefaultSearch = !!options.useDefaultSearch || "raw" === options.loadMode;
        this._loadMode = options.loadMode;
        this._cacheRawData = false !== options.cacheRawData;
        this._loadFunc = options[LOAD];
        this._totalCountFunc = options[TOTAL_COUNT];
        this._byKeyFunc = options[BY_KEY];
        this._insertFunc = options[INSERT];
        this._updateFunc = options[UPDATE];
        this._removeFunc = options[REMOVE]
    },
    createQuery: function() {
        throw _errors__WEBPACK_IMPORTED_MODULE_5__["errors"].Error("E4010")
    },
    clearRawDataCache: function() {
        delete this.__rawData
    },
    _totalCountImpl: function(options) {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"];
        if ("raw" === this._loadMode && !this._totalCountFunc) {
            runRawLoadWithQuery(d, this, options, true)
        } else {
            invokeUserTotalCountFunc(this, options).done((function(count) {
                d.resolve(Number(count))
            })).fail(createUserFuncFailureHandler(d));
            d = this._addFailHandlers(d)
        }
        return d.promise()
    },
    _pushImpl: function(changes) {
        if (this.__rawData) {
            Object(_array_utils__WEBPACK_IMPORTED_MODULE_2__["applyBatch"])({
                keyInfo: this,
                data: this.__rawData,
                changes: changes
            })
        }
    },
    _loadImpl: function(options) {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"];
        if ("raw" === this._loadMode) {
            runRawLoadWithQuery(d, this, options, false)
        } else {
            invokeUserLoad(this, options).done((function(data, extra) {
                d.resolve(data, extra)
            })).fail(createUserFuncFailureHandler(d));
            d = this._addFailHandlers(d)
        }
        return d.promise()
    },
    _byKeyImpl: function(key, extraOptions) {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"];
        if (this._byKeyViaLoad()) {
            this._requireKey();
            runRawLoadWithKey(d, this, key)
        } else {
            invokeUserByKeyFunc(this, key, extraOptions).done((function(obj) {
                d.resolve(obj)
            })).fail(createUserFuncFailureHandler(d))
        }
        return d.promise()
    },
    _byKeyViaLoad: function() {
        return "raw" === this._loadMode && !this._byKeyFunc
    },
    _insertImpl: function(values) {
        var that = this;
        var userFunc = that._insertFunc;
        var userResult;
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"];
        ensureRequiredFuncOption(INSERT, userFunc);
        userResult = userFunc.apply(that, [values]);
        if (!isPromise(userResult)) {
            userResult = trivialPromise(userResult)
        }
        Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["fromPromise"])(userResult).done((function(serverResponse) {
            if (Object(_core_config__WEBPACK_IMPORTED_MODULE_4__["default"])().useLegacyStoreResult) {
                d.resolve(values, serverResponse)
            } else {
                d.resolve(serverResponse || values, that.keyOf(serverResponse))
            }
        })).fail(createUserFuncFailureHandler(d));
        return d.promise()
    },
    _updateImpl: function(key, values) {
        var userFunc = this._updateFunc;
        var userResult;
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"];
        ensureRequiredFuncOption(UPDATE, userFunc);
        userResult = userFunc.apply(this, [key, values]);
        if (!isPromise(userResult)) {
            userResult = trivialPromise(userResult)
        }
        Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["fromPromise"])(userResult).done((function(serverResponse) {
            if (Object(_core_config__WEBPACK_IMPORTED_MODULE_4__["default"])().useLegacyStoreResult) {
                d.resolve(key, values)
            } else {
                d.resolve(serverResponse || values, key)
            }
        })).fail(createUserFuncFailureHandler(d));
        return d.promise()
    },
    _removeImpl: function(key) {
        var userFunc = this._removeFunc;
        var userResult;
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["Deferred"];
        ensureRequiredFuncOption(REMOVE, userFunc);
        userResult = userFunc.apply(this, [key]);
        if (!isPromise(userResult)) {
            userResult = trivialPromise()
        }
        Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_9__["fromPromise"])(userResult).done((function() {
            d.resolve(key)
        })).fail(createUserFuncFailureHandler(d));
        return d.promise()
    }
});
/* harmony default export */ __webpack_exports__["default"] = (CustomStore);


/***/ }),

/***/ "./node_modules/devextreme/esm/data/data_source/data_source.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/data/data_source/data_source.js ***!
  \*********************************************************************/
/*! exports provided: DataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSource", function() { return DataSource; });
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils */ "./node_modules/devextreme/esm/data/utils.js");
/* harmony import */ var _array_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../array_utils */ "./node_modules/devextreme/esm/data/array_utils.js");
/* harmony import */ var _custom_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../custom_store */ "./node_modules/devextreme/esm/data/custom_store.js");
/* harmony import */ var _core_events_strategy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/events_strategy */ "./node_modules/devextreme/esm/core/events_strategy.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../errors */ "./node_modules/devextreme/esm/data/errors.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_queue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/utils/queue */ "./node_modules/devextreme/esm/core/utils/queue.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _operation_manager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./operation_manager */ "./node_modules/devextreme/esm/data/data_source/operation_manager.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/data/data_source/utils.js");
/**
 * DevExtreme (esm/data/data_source/data_source.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */















var DataSource = _core_class__WEBPACK_IMPORTED_MODULE_0__["default"].inherit({
    ctor(options) {
        var _options$reshapeOnPus;
        options = Object(_utils__WEBPACK_IMPORTED_MODULE_14__["normalizeDataSourceOptions"])(options);
        this._eventsStrategy = new _core_events_strategy__WEBPACK_IMPORTED_MODULE_8__["EventsStrategy"](this, {
            syncStrategy: true
        });
        this._store = options.store;
        this._changedTime = 0;
        var needThrottling = 0 !== options.pushAggregationTimeout;
        if (needThrottling) {
            var throttlingTimeout = void 0 === options.pushAggregationTimeout ? () => 5 * this._changedTime : options.pushAggregationTimeout;
            var pushDeferred;
            var lastPushWaiters;
            var throttlingPushHandler = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["throttleChanges"])(changes => {
                pushDeferred.resolve();
                var storePushPending = Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_12__["when"])(...lastPushWaiters);
                storePushPending.done(() => this._onPush(changes));
                lastPushWaiters = void 0;
                pushDeferred = void 0
            }, throttlingTimeout);
            this._onPushHandler = args => {
                this._aggregationTimeoutId = throttlingPushHandler(args.changes);
                if (!pushDeferred) {
                    pushDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_12__["Deferred"]
                }
                lastPushWaiters = args.waitFor;
                args.waitFor.push(pushDeferred.promise())
            };
            this._store.on("beforePush", this._onPushHandler)
        } else {
            this._onPushHandler = changes => this._onPush(changes);
            this._store.on("push", this._onPushHandler)
        }
        this._storeLoadOptions = this._extractLoadOptions(options);
        this._mapFunc = options.map;
        this._postProcessFunc = options.postProcess;
        this._pageIndex = void 0 !== options.pageIndex ? options.pageIndex : 0;
        this._pageSize = void 0 !== options.pageSize ? options.pageSize : 20;
        this._loadingCount = 0;
        this._loadQueue = this._createLoadQueue();
        this._searchValue = "searchValue" in options ? options.searchValue : null;
        this._searchOperation = options.searchOperation || "contains";
        this._searchExpr = options.searchExpr;
        this._paginate = options.paginate;
        this._reshapeOnPush = null !== (_options$reshapeOnPus = options.reshapeOnPush) && void 0 !== _options$reshapeOnPus ? _options$reshapeOnPus : false;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(["onChanged", "onLoadError", "onLoadingChanged", "onCustomizeLoadResult", "onCustomizeStoreLoadOptions"], (_, optionName) => {
            if (optionName in options) {
                this.on(optionName.substr(2, 1).toLowerCase() + optionName.substr(3), options[optionName])
            }
        });
        this._operationManager = new _operation_manager__WEBPACK_IMPORTED_MODULE_13__["default"];
        this._init()
    },
    _init() {
        this._items = [];
        this._userData = {};
        this._totalCount = -1;
        this._isLoaded = false;
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(this._paginate)) {
            this._paginate = !this.group()
        }
        this._isLastPage = !this._paginate
    },
    dispose() {
        var _this$_delayedLoadTas;
        this._store.off("beforePush", this._onPushHandler);
        this._store.off("push", this._onPushHandler);
        this._eventsStrategy.dispose();
        clearTimeout(this._aggregationTimeoutId);
        null === (_this$_delayedLoadTas = this._delayedLoadTask) || void 0 === _this$_delayedLoadTas ? void 0 : _this$_delayedLoadTas.abort();
        this._operationManager.cancelAll();
        delete this._store;
        delete this._items;
        delete this._delayedLoadTask;
        this._disposed = true
    },
    _extractLoadOptions(options) {
        var result = {};
        var names = ["sort", "filter", "select", "group", "requireTotalCount"];
        var customNames = this._store._customLoadOptions();
        if (customNames) {
            names = names.concat(customNames)
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(names, (function() {
            result[this] = options[this]
        }));
        return result
    },
    loadOptions() {
        return this._storeLoadOptions
    },
    items() {
        return this._items
    },
    pageIndex(newIndex) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isNumeric"])(newIndex)) {
            return this._pageIndex
        }
        this._pageIndex = newIndex;
        this._isLastPage = !this._paginate
    },
    paginate(value) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isBoolean"])(value)) {
            return this._paginate
        }
        if (this._paginate !== value) {
            this._paginate = value;
            this.pageIndex(0)
        }
    },
    pageSize(value) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isNumeric"])(value)) {
            return this._pageSize
        }
        this._pageSize = value
    },
    isLastPage() {
        return this._isLastPage
    },
    generateStoreLoadOptionAccessor(optionName) {
        return args => {
            var normalizedArgs = Object(_utils__WEBPACK_IMPORTED_MODULE_14__["normalizeStoreLoadOptionAccessorArguments"])(args);
            if (void 0 === normalizedArgs) {
                return this._storeLoadOptions[optionName]
            }
            this._storeLoadOptions[optionName] = normalizedArgs
        }
    },
    sort() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        return this.generateStoreLoadOptionAccessor("sort")(args)
    },
    filter() {
        var newFilter = Object(_utils__WEBPACK_IMPORTED_MODULE_14__["normalizeStoreLoadOptionAccessorArguments"])(arguments);
        if (void 0 === newFilter) {
            return this._storeLoadOptions.filter
        }
        this._storeLoadOptions.filter = newFilter;
        this.pageIndex(0)
    },
    group() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2]
        }
        return this.generateStoreLoadOptionAccessor("group")(args)
    },
    select() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3]
        }
        return this.generateStoreLoadOptionAccessor("select")(args)
    },
    requireTotalCount(value) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isBoolean"])(value)) {
            return this._storeLoadOptions.requireTotalCount
        }
        this._storeLoadOptions.requireTotalCount = value
    },
    searchValue(value) {
        if (arguments.length < 1) {
            return this._searchValue
        }
        this._searchValue = value;
        this.pageIndex(0)
    },
    searchOperation(op) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isString"])(op)) {
            return this._searchOperation
        }
        this._searchOperation = op;
        this.pageIndex(0)
    },
    searchExpr(expr) {
        var argc = arguments.length;
        if (0 === argc) {
            return this._searchExpr
        }
        if (argc > 1) {
            expr = [].slice.call(arguments)
        }
        this._searchExpr = expr;
        this.pageIndex(0)
    },
    store() {
        return this._store
    },
    key() {
        var _this$_store;
        return null === (_this$_store = this._store) || void 0 === _this$_store ? void 0 : _this$_store.key()
    },
    totalCount() {
        return this._totalCount
    },
    isLoaded() {
        return this._isLoaded
    },
    isLoading() {
        return this._loadingCount > 0
    },
    beginLoading() {
        this._changeLoadingCount(1)
    },
    endLoading() {
        this._changeLoadingCount(-1)
    },
    _createLoadQueue: () => Object(_core_utils_queue__WEBPACK_IMPORTED_MODULE_11__["create"])(),
    _changeLoadingCount(increment) {
        var oldLoading = this.isLoading();
        this._loadingCount += increment;
        var newLoading = this.isLoading();
        if (oldLoading ^ newLoading) {
            this._eventsStrategy.fireEvent("loadingChanged", [newLoading])
        }
    },
    _scheduleLoadCallbacks(deferred) {
        this.beginLoading();
        deferred.always(() => {
            this.endLoading()
        })
    },
    _scheduleFailCallbacks(deferred) {
        var _this = this;
        deferred.fail((function() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4]
            }
            if (args[0] === _utils__WEBPACK_IMPORTED_MODULE_14__["CANCELED_TOKEN"]) {
                return
            }
            _this._eventsStrategy.fireEvent("loadError", args)
        }))
    },
    _fireChanged(args) {
        var date = new Date;
        this._eventsStrategy.fireEvent("changed", args);
        this._changedTime = new Date - date
    },
    _scheduleChangedCallbacks(deferred) {
        deferred.done(() => this._fireChanged())
    },
    loadSingle(propName, propValue) {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_12__["Deferred"];
        var key = this.key();
        var store = this._store;
        var options = this._createStoreLoadOptions();
        this._scheduleFailCallbacks(d);
        if (arguments.length < 2) {
            propValue = propName;
            propName = key
        }
        delete options.skip;
        delete options.group;
        delete options.refresh;
        delete options.pageIndex;
        delete options.searchString;
        (() => {
            if (propName === key || store instanceof _custom_store__WEBPACK_IMPORTED_MODULE_7__["default"] && !store._byKeyViaLoad()) {
                return store.byKey(propValue, options)
            }
            options.take = 1;
            options.filter = options.filter ? [options.filter, [propName, propValue]] : [propName, propValue];
            return store.load(options)
        })().fail(d.reject).done(data => {
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(data) || Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_10__["isEmpty"])(data)) {
                d.reject(new _errors__WEBPACK_IMPORTED_MODULE_9__["errors"].Error("E4009"))
            } else {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                d.resolve(this._applyMapFunction(data)[0])
            }
        });
        return d.promise()
    },
    load() {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_12__["Deferred"];
        var loadTask = () => {
            if (this._disposed) {
                return
            }
            if (!Object(_utils__WEBPACK_IMPORTED_MODULE_14__["isPending"])(d)) {
                return
            }
            return this._loadFromStore(loadOperation, d)
        };
        this._scheduleLoadCallbacks(d);
        this._scheduleFailCallbacks(d);
        this._scheduleChangedCallbacks(d);
        var loadOperation = this._createLoadOperation(d);
        this._eventsStrategy.fireEvent("customizeStoreLoadOptions", [loadOperation]);
        this._loadQueue.add(() => {
            if ("number" === typeof loadOperation.delay) {
                this._delayedLoadTask = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_2__["executeAsync"])(loadTask, loadOperation.delay)
            } else {
                loadTask()
            }
            return d.promise()
        });
        return d.promise({
            operationId: loadOperation.operationId
        })
    },
    _onPush(changes) {
        if (this._reshapeOnPush) {
            this.load()
        } else {
            this._eventsStrategy.fireEvent("changing", [{
                changes: changes
            }]);
            var group = this.group();
            var items = this.items();
            var groupLevel = 0;
            var dataSourceChanges = this.paginate() || group ? changes.filter(item => "update" === item.type) : changes;
            if (group) {
                groupLevel = Array.isArray(group) ? group.length : 1
            }
            if (this._mapFunc) {
                dataSourceChanges.forEach(item => {
                    if ("insert" === item.type) {
                        item.data = this._mapFunc(item.data)
                    }
                })
            }
            Object(_array_utils__WEBPACK_IMPORTED_MODULE_6__["applyBatch"])({
                keyInfo: this.store(),
                data: items,
                changes: dataSourceChanges,
                groupCount: groupLevel,
                useInsertIndex: true
            });
            this._fireChanged([{
                changes: changes
            }])
        }
    },
    _createLoadOperation(deferred) {
        var operationId = this._operationManager.add(deferred);
        var storeLoadOptions = this._createStoreLoadOptions();
        deferred.always(() => this._operationManager.remove(operationId));
        return {
            operationId: operationId,
            storeLoadOptions: storeLoadOptions
        }
    },
    reload() {
        var store = this.store();
        if (store instanceof _custom_store__WEBPACK_IMPORTED_MODULE_7__["default"]) {
            store.clearRawDataCache()
        }
        this._init();
        return this.load()
    },
    cancel(operationId) {
        return this._operationManager.cancel(operationId)
    },
    cancelAll() {
        return this._operationManager.cancelAll()
    },
    _addSearchOptions(storeLoadOptions) {
        if (this._disposed) {
            return
        }
        if (this.store()._useDefaultSearch) {
            this._addSearchFilter(storeLoadOptions)
        } else {
            storeLoadOptions.searchOperation = this._searchOperation;
            storeLoadOptions.searchValue = this._searchValue;
            storeLoadOptions.searchExpr = this._searchExpr
        }
    },
    _createStoreLoadOptions() {
        var result = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, this._storeLoadOptions);
        this._addSearchOptions(result);
        if (this._paginate) {
            if (this._pageSize) {
                result.skip = this._pageIndex * this._pageSize;
                result.take = this._pageSize
            }
        }
        result.userData = this._userData;
        return result
    },
    _addSearchFilter(storeLoadOptions) {
        var value = this._searchValue;
        var op = this._searchOperation;
        var selector = this._searchExpr;
        var searchFilter = [];
        if (!value) {
            return
        }
        if (!selector) {
            selector = "this"
        }
        if (!Array.isArray(selector)) {
            selector = [selector]
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(selector, (function(i, item) {
            if (searchFilter.length) {
                searchFilter.push("or")
            }
            searchFilter.push([item, op, value])
        }));
        if (storeLoadOptions.filter) {
            storeLoadOptions.filter = [searchFilter, storeLoadOptions.filter]
        } else {
            storeLoadOptions.filter = searchFilter
        }
    },
    _loadFromStore(loadOptions, pendingDeferred) {
        var handleSuccess = (data, extra) => {
            if (this._disposed) {
                return
            }
            if (!Object(_utils__WEBPACK_IMPORTED_MODULE_14__["isPending"])(pendingDeferred)) {
                return
            }
            var loadResult = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(Object(_utils__WEBPACK_IMPORTED_MODULE_14__["normalizeLoadResult"])(data, extra), loadOptions);
            this._eventsStrategy.fireEvent("customizeLoadResult", [loadResult]);
            Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_12__["when"])(loadResult.data).done(data => {
                loadResult.data = data;
                this._processStoreLoadResult(loadResult, pendingDeferred)
            }).fail(pendingDeferred.reject)
        };
        if (loadOptions.data) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_12__["Deferred"]).resolve(loadOptions.data).done(handleSuccess)
        }
        return this.store().load(loadOptions.storeLoadOptions).done(handleSuccess).fail(pendingDeferred.reject)
    },
    _processStoreLoadResult(loadResult, pendingDeferred) {
        var data = loadResult.data;
        var extra = loadResult.extra;
        var storeLoadOptions = loadResult.storeLoadOptions;
        var resolvePendingDeferred = () => {
            this._isLoaded = true;
            this._totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
            return pendingDeferred.resolve(data, extra)
        };
        if (this._disposed) {
            return
        }
        data = this._applyPostProcessFunction(this._applyMapFunction(data));
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isPlainObject"])(extra)) {
            extra = {}
        }
        this._items = data;
        if (!data.length || !this._paginate || this._pageSize && data.length < this._pageSize) {
            this._isLastPage = true
        }
        if (storeLoadOptions.requireTotalCount && !isFinite(extra.totalCount)) {
            (() => {
                this.store().totalCount(storeLoadOptions).done((function(count) {
                    extra.totalCount = count;
                    resolvePendingDeferred()
                })).fail(pendingDeferred.reject)
            })()
        } else {
            resolvePendingDeferred()
        }
    },
    _applyMapFunction(data) {
        if (this._mapFunc) {
            return Object(_utils__WEBPACK_IMPORTED_MODULE_14__["mapDataRespectingGrouping"])(data, this._mapFunc, this.group())
        }
        return data
    },
    _applyPostProcessFunction(data) {
        if (this._postProcessFunc) {
            return this._postProcessFunc(data)
        }
        return data
    },
    on(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this
    },
    off(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/data/data_source/operation_manager.js":
/*!***************************************************************************!*\
  !*** ./node_modules/devextreme/esm/data/data_source/operation_manager.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OperationManager; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/data/data_source/utils.js");
/**
 * DevExtreme (esm/data/data_source/operation_manager.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

class OperationManager {
    constructor() {
        this._counter = -1;
        this._deferreds = {}
    }
    add(deferred) {
        this._counter++;
        this._deferreds[this._counter] = deferred;
        return this._counter
    }
    remove(operationId) {
        return delete this._deferreds[operationId]
    }
    cancel(operationId) {
        if (operationId in this._deferreds) {
            this._deferreds[operationId].reject(_utils__WEBPACK_IMPORTED_MODULE_0__["CANCELED_TOKEN"]);
            return true
        }
        return false
    }
    cancelAll() {
        while (this._counter > -1) {
            this.cancel(this._counter);
            this._counter--
        }
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/data/data_source/utils.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/data/data_source/utils.js ***!
  \***************************************************************/
/*! exports provided: CANCELED_TOKEN, isPending, normalizeStoreLoadOptionAccessorArguments, mapDataRespectingGrouping, normalizeLoadResult, normalizeDataSourceOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CANCELED_TOKEN", function() { return CANCELED_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPending", function() { return isPending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeStoreLoadOptionAccessorArguments", function() { return normalizeStoreLoadOptionAccessorArguments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapDataRespectingGrouping", function() { return mapDataRespectingGrouping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeLoadResult", function() { return normalizeLoadResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeDataSourceOptions", function() { return normalizeDataSourceOptions; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _core_utils_ajax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/ajax */ "./node_modules/devextreme/esm/core/utils/ajax.js");
/* harmony import */ var _abstract_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../abstract_store */ "./node_modules/devextreme/esm/data/abstract_store.js");
/* harmony import */ var _array_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../array_store */ "./node_modules/devextreme/esm/data/array_store.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _custom_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../custom_store */ "./node_modules/devextreme/esm/data/custom_store.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils */ "./node_modules/devextreme/esm/data/utils.js");
/**
 * DevExtreme (esm/data/data_source/utils.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["items"];








var CANCELED_TOKEN = "canceled";
var isPending = deferred => "pending" === deferred.state();
var normalizeStoreLoadOptionAccessorArguments = originalArguments => {
    switch (originalArguments.length) {
        case 0:
            return;
        case 1:
            return originalArguments[0]
    }
    return [].slice.call(originalArguments)
};
var mapGroup = (group, level, mapper) => Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["map"])(group, item => {
    var restItem = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(item, _excluded);
    return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, restItem, {
        items: mapRecursive(item.items, level - 1, mapper)
    })
});
var mapRecursive = (items, level, mapper) => {
    if (!Array.isArray(items)) {
        return items
    }
    return level ? mapGroup(items, level, mapper) : Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["map"])(items, mapper)
};
var mapDataRespectingGrouping = (items, mapper, groupInfo) => {
    var level = groupInfo ? Object(_utils__WEBPACK_IMPORTED_MODULE_9__["normalizeSortingInfo"])(groupInfo).length : 0;
    return mapRecursive(items, level, mapper)
};
var normalizeLoadResult = (data, extra) => {
    var _data;
    if (null !== (_data = data) && void 0 !== _data && _data.data) {
        extra = data;
        data = data.data
    }
    if (!Array.isArray(data)) {
        data = [data]
    }
    return {
        data: data,
        extra: extra
    }
};
var createCustomStoreFromLoadFunc = options => {
    var storeConfig = {};
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(["useDefaultSearch", "key", "load", "loadMode", "cacheRawData", "byKey", "lookup", "totalCount", "insert", "update", "remove"], (function() {
        storeConfig[this] = options[this];
        delete options[this]
    }));
    return new _custom_store__WEBPACK_IMPORTED_MODULE_6__["default"](storeConfig)
};
var createStoreFromConfig = storeConfig => {
    var alias = storeConfig.type;
    delete storeConfig.type;
    return _abstract_store__WEBPACK_IMPORTED_MODULE_3__["default"].create(alias, storeConfig)
};
var createCustomStoreFromUrl = (url, normalizationOptions) => new _custom_store__WEBPACK_IMPORTED_MODULE_6__["default"]({
    load: () => _core_utils_ajax__WEBPACK_IMPORTED_MODULE_2__["default"].sendRequest({
        url: url,
        dataType: "json"
    }),
    loadMode: null === normalizationOptions || void 0 === normalizationOptions ? void 0 : normalizationOptions.fromUrlLoadMode
});
var normalizeDataSourceOptions = (options, normalizationOptions) => {
    var store;
    if ("string" === typeof options) {
        options = {
            paginate: false,
            store: createCustomStoreFromUrl(options, normalizationOptions)
        }
    }
    if (void 0 === options) {
        options = []
    }
    if (Array.isArray(options) || options instanceof _abstract_store__WEBPACK_IMPORTED_MODULE_3__["default"]) {
        options = {
            store: options
        }
    } else {
        options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])({}, options)
    }
    if (void 0 === options.store) {
        options.store = []
    }
    store = options.store;
    if ("load" in options) {
        store = createCustomStoreFromLoadFunc(options)
    } else if (Array.isArray(store)) {
        store = new _array_store__WEBPACK_IMPORTED_MODULE_4__["default"](store)
    } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_8__["isPlainObject"])(store)) {
        store = createStoreFromConfig(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])({}, store))
    }
    options.store = store;
    return options
};


/***/ }),

/***/ "./node_modules/devextreme/esm/data/errors.js":
/*!****************************************************!*\
  !*** ./node_modules/devextreme/esm/data/errors.js ***!
  \****************************************************/
/*! exports provided: errors, errorHandler, handleError, setErrorHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errors", function() { return errors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorHandler", function() { return errorHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleError", function() { return handleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setErrorHandler", function() { return setErrorHandler; });
/* harmony import */ var _core_utils_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/error */ "./node_modules/devextreme/esm/core/utils/error.js");
/* harmony import */ var _core_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/errors */ "./node_modules/devextreme/esm/core/errors.js");
/**
 * DevExtreme (esm/data/errors.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var errors = Object(_core_utils_error__WEBPACK_IMPORTED_MODULE_0__["default"])(_core_errors__WEBPACK_IMPORTED_MODULE_1__["default"].ERROR_MESSAGES, {
    E4000: "[DevExpress.data]: {0}",
    E4001: "Unknown aggregating function is detected: '{0}'",
    E4002: "Unsupported OData protocol version is used",
    E4003: "Unknown filter operation is used: {0}",
    E4004: "The thenby() method is called before the sortby() method",
    E4005: "Store requires a key expression for this operation",
    E4006: "ArrayStore 'data' option must be an array",
    E4007: "Compound keys cannot be auto-generated",
    E4008: "Attempt to insert an item with a duplicated key",
    E4009: "Data item cannot be found",
    E4010: "CustomStore does not support creating queries",
    E4011: "Custom Store method is not implemented or is not a function: {0}",
    E4012: "Custom Store method returns an invalid value: {0}",
    E4013: "Local Store requires the 'name' configuration option is specified",
    E4014: "Unknown data type is specified for ODataStore: {0}",
    E4015: "Unknown entity name or alias is used: {0}",
    E4016: "The compileSetter(expr) method is called with 'self' passed as a parameter",
    E4017: "Keys cannot be modified",
    E4018: "The server has returned a non-numeric value in a response to an item count request",
    E4019: "Mixing of group operators inside a single group of filter expression is not allowed",
    E4020: "Unknown store type is detected: {0}",
    E4021: "The server response does not provide the totalCount value",
    E4022: "The server response does not provide the groupCount value",
    E4023: "Could not parse the following XML: {0}",
    E4024: "String function {0} cannot be used with the data field {1} of type {2}.",
    W4000: "Data returned from the server has an incorrect structure",
    W4001: 'The {0} field is listed in both "keyType" and "fieldTypes". The value of "fieldTypes" is used.',
    W4002: "Data loading has failed for some cells due to the following error: {0}"
});
var errorHandler = null;
var handleError = function(error) {
    var _errorHandler;
    null === (_errorHandler = errorHandler) || void 0 === _errorHandler ? void 0 : _errorHandler(error)
};
var setErrorHandler = handler => errorHandler = handler;


/***/ }),

/***/ "./node_modules/devextreme/esm/data/query.js":
/*!***************************************************!*\
  !*** ./node_modules/devextreme/esm/data/query.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _query_implementation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query_implementation */ "./node_modules/devextreme/esm/data/query_implementation.js");
/**
 * DevExtreme (esm/data/query.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var query = function() {
    var impl = Array.isArray(arguments[0]) ? "array" : "remote";
    return _query_implementation__WEBPACK_IMPORTED_MODULE_0__["queryImpl"][impl].apply(this, arguments)
};
/* harmony default export */ __webpack_exports__["default"] = (query);


/***/ }),

/***/ "./node_modules/devextreme/esm/data/query_adapters.js":
/*!************************************************************!*\
  !*** ./node_modules/devextreme/esm/data/query_adapters.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/data/query_adapters.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
/* harmony default export */ __webpack_exports__["default"] = ({});


/***/ }),

/***/ "./node_modules/devextreme/esm/data/query_implementation.js":
/*!******************************************************************!*\
  !*** ./node_modules/devextreme/esm/data/query_implementation.js ***!
  \******************************************************************/
/*! exports provided: queryImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryImpl", function() { return queryImpl; });
/* harmony import */ var _array_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array_query */ "./node_modules/devextreme/esm/data/array_query.js");
/* harmony import */ var _remote_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./remote_query */ "./node_modules/devextreme/esm/data/remote_query.js");
/**
 * DevExtreme (esm/data/query_implementation.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var queryImpl = {
    array: _array_query__WEBPACK_IMPORTED_MODULE_0__["default"],
    remote: _remote_query__WEBPACK_IMPORTED_MODULE_1__["default"]
};


/***/ }),

/***/ "./node_modules/devextreme/esm/data/remote_query.js":
/*!**********************************************************!*\
  !*** ./node_modules/devextreme/esm/data/remote_query.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _query_adapters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query_adapters */ "./node_modules/devextreme/esm/data/query_adapters.js");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors */ "./node_modules/devextreme/esm/data/errors.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _array_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./array_query */ "./node_modules/devextreme/esm/data/array_query.js");
/**
 * DevExtreme (esm/data/remote_query.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var remoteQueryImpl = function remoteQueryImpl(url, queryOptions, tasks) {
    tasks = tasks || [];
    queryOptions = queryOptions || {};
    var createTask = function(name, args) {
        return {
            name: name,
            args: args
        }
    };
    var exec = function(executorTask) {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__["Deferred"];
        var _adapterFactory;
        var _adapter;
        var _taskQueue;
        var _currentTask;
        var _mergedSortArgs;
        var rejectWithNotify = function(error) {
            var handler = queryOptions.errorHandler;
            if (handler) {
                handler(error)
            }
            Object(_errors__WEBPACK_IMPORTED_MODULE_1__["handleError"])(error);
            d.reject(error)
        };

        function mergeSortTask(task) {
            switch (task.name) {
                case "sortBy":
                    _mergedSortArgs = [task.args];
                    return true;
                case "thenBy":
                    if (!_mergedSortArgs) {
                        throw _errors__WEBPACK_IMPORTED_MODULE_1__["errors"].Error("E4004")
                    }
                    _mergedSortArgs.push(task.args);
                    return true
            }
            return false
        }
        try {
            _adapterFactory = queryOptions.adapter;
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"])(_adapterFactory)) {
                _adapterFactory = _query_adapters__WEBPACK_IMPORTED_MODULE_0__["default"][_adapterFactory]
            }
            _adapter = _adapterFactory(queryOptions);
            _taskQueue = [].concat(tasks).concat(executorTask);
            var optimize = _adapter.optimize;
            if (optimize) {
                optimize(_taskQueue)
            }
            while (_taskQueue.length) {
                _currentTask = _taskQueue[0];
                if (!mergeSortTask(_currentTask)) {
                    if (_mergedSortArgs) {
                        _taskQueue.unshift(createTask("multiSort", [_mergedSortArgs]));
                        _mergedSortArgs = null;
                        continue
                    }
                    if ("enumerate" !== String(_currentTask.name)) {
                        if (!_adapter[_currentTask.name] || false === _adapter[_currentTask.name].apply(_adapter, _currentTask.args)) {
                            break
                        }
                    }
                }
                _taskQueue.shift()
            }! function() {
                var head = _taskQueue[0];
                var unmergedTasks = [];
                if (head && "multiSort" === head.name) {
                    _taskQueue.shift();
                    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(head.args[0], (function() {
                        unmergedTasks.push(createTask(unmergedTasks.length ? "thenBy" : "sortBy", this))
                    }))
                }
                _taskQueue = unmergedTasks.concat(_taskQueue)
            }();
            _adapter.exec(url).done((function(result, extra) {
                if (!_taskQueue.length) {
                    d.resolve(result, extra)
                } else {
                    var clientChain = Object(_array_query__WEBPACK_IMPORTED_MODULE_5__["default"])(result, {
                        errorHandler: queryOptions.errorHandler
                    });
                    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(_taskQueue, (function() {
                        clientChain = clientChain[this.name].apply(clientChain, this.args)
                    }));
                    clientChain.done(d.resolve).fail(d.reject)
                }
            })).fail(rejectWithNotify)
        } catch (x) {
            rejectWithNotify(x)
        }
        return d.promise()
    };
    var query = {};
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], (function() {
        var name = String(this);
        query[name] = function() {
            return remoteQueryImpl(url, queryOptions, tasks.concat(createTask(name, arguments)))
        }
    }));
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], (function() {
        var name = String(this);
        query[name] = function() {
            return exec.call(this, createTask(name, arguments))
        }
    }));
    return query
};
/* harmony default export */ __webpack_exports__["default"] = (remoteQueryImpl);


/***/ }),

/***/ "./node_modules/devextreme/esm/data/store_helper.js":
/*!**********************************************************!*\
  !*** ./node_modules/devextreme/esm/data/store_helper.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _array_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./array_query */ "./node_modules/devextreme/esm/data/array_query.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/data/utils.js");
/**
 * DevExtreme (esm/data/store_helper.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






function multiLevelGroup(query, groupInfo) {
    query = query.groupBy(groupInfo[0].selector);
    if (groupInfo.length > 1) {
        query = query.select((function(g) {
            return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, g, {
                items: multiLevelGroup(Object(_array_query__WEBPACK_IMPORTED_MODULE_3__["default"])(g.items), groupInfo.slice(1)).toArray()
            })
        }))
    }
    return query
}

function arrangeSortingInfo(groupInfo, sortInfo) {
    var filteredGroup = [];
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(groupInfo, (function(_, group) {
        var collision = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_0__["grep"])(sortInfo, (function(sort) {
            return group.selector === sort.selector
        }));
        if (collision.length < 1) {
            filteredGroup.push(group)
        }
    }));
    return filteredGroup.concat(sortInfo)
}

function queryByOptions(query, options, isCountQuery) {
    options = options || {};
    var filter = options.filter;
    if (filter) {
        query = query.filter(filter)
    }
    if (isCountQuery) {
        return query
    }
    var sort = options.sort;
    var select = options.select;
    var group = options.group;
    var skip = options.skip;
    var take = options.take;
    if (group) {
        group = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeSortingInfo"])(group);
        group.keepInitialKeyOrder = !!options.group.keepInitialKeyOrder
    }
    if (sort || group) {
        sort = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeSortingInfo"])(sort || []);
        if (group && !group.keepInitialKeyOrder) {
            sort = arrangeSortingInfo(group, sort)
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(sort, (function(index) {
            query = query[index ? "thenBy" : "sortBy"](this.selector, this.desc, this.compare)
        }))
    }
    if (select) {
        query = query.select(select)
    }
    if (group) {
        query = multiLevelGroup(query, group)
    }
    if (take || skip) {
        query = query.slice(skip || 0, take)
    }
    return query
}
/* harmony default export */ __webpack_exports__["default"] = ({
    multiLevelGroup: multiLevelGroup,
    arrangeSortingInfo: arrangeSortingInfo,
    queryByOptions: queryByOptions
});


/***/ }),

/***/ "./node_modules/devextreme/esm/data/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/devextreme/esm/data/utils.js ***!
  \***************************************************/
/*! exports provided: XHR_ERROR_UNLOAD, normalizeBinaryCriterion, normalizeSortingInfo, errorMessageFromXhr, aggregators, processRequestResultLock, isDisjunctiveOperator, isConjunctiveOperator, keysEqual, base64_encode, isUnaryOperation, isGroupCriterion, trivialPromise, rejectedPromise, throttleChanges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XHR_ERROR_UNLOAD", function() { return XHR_ERROR_UNLOAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeBinaryCriterion", function() { return normalizeBinaryCriterion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeSortingInfo", function() { return normalizeSortingInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorMessageFromXhr", function() { return errorMessageFromXhr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aggregators", function() { return aggregators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processRequestResultLock", function() { return processRequestResultLock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDisjunctiveOperator", function() { return isDisjunctiveOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConjunctiveOperator", function() { return isConjunctiveOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keysEqual", function() { return keysEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64_encode", function() { return base64_encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUnaryOperation", function() { return isUnaryOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGroupCriterion", function() { return isGroupCriterion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trivialPromise", function() { return trivialPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rejectedPromise", function() { return rejectedPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttleChanges", function() { return throttleChanges; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/ready_callbacks */ "./node_modules/devextreme/esm/core/utils/ready_callbacks.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/data/utils.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var ready = _core_utils_ready_callbacks__WEBPACK_IMPORTED_MODULE_2__["default"].add;
var XHR_ERROR_UNLOAD = "DEVEXTREME_XHR_ERROR_UNLOAD";
var normalizeBinaryCriterion = function(crit) {
    return [crit[0], crit.length < 3 ? "=" : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]]
};
var normalizeSortingInfo = function(info) {
    if (!Array.isArray(info)) {
        info = [info]
    }
    return Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["map"])(info, (function(i) {
        var result = {
            selector: Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(i) || "string" === typeof i ? i : i.getter || i.field || i.selector,
            desc: !!(i.desc || "d" === String(i.dir).charAt(0).toLowerCase())
        };
        if (i.compare) {
            result.compare = i.compare
        }
        return result
    }))
};
var errorMessageFromXhr = function() {
    var textStatusMessages = {
        timeout: "Network connection timeout",
        error: "Unspecified network error",
        parsererror: "Unexpected server response"
    };
    var unloading;
    ready((function() {
        var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_3__["getWindow"])();
        _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].listen(window, "beforeunload", (function() {
            unloading = true
        }))
    }));
    return function(xhr, textStatus) {
        if (unloading) {
            return XHR_ERROR_UNLOAD
        }
        if (xhr.status < 400) {
            return function(textStatus) {
                var result = textStatusMessages[textStatus];
                if (!result) {
                    return textStatus
                }
                return result
            }(textStatus)
        }
        return xhr.statusText
    }
}();
var aggregators = {
    count: {
        seed: 0,
        step: function(count) {
            return 1 + count
        }
    },
    sum: {
        seed: 0,
        step: function(sum, item) {
            return sum + item
        }
    },
    min: {
        step: function(min, item) {
            return item < min ? item : min
        }
    },
    max: {
        step: function(max, item) {
            return item > max ? item : max
        }
    },
    avg: {
        seed: [0, 0],
        step: function(pair, value) {
            return [pair[0] + value, pair[1] + 1]
        },
        finalize: function(pair) {
            return pair[1] ? pair[0] / pair[1] : NaN
        }
    }
};
var processRequestResultLock = function() {
    var lockCount = 0;
    var lockDeferred;
    return {
        obtain: function() {
            if (0 === lockCount) {
                lockDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"]
            }
            lockCount++
        },
        release: function() {
            lockCount--;
            if (lockCount < 1) {
                lockDeferred.resolve()
            }
        },
        promise: function() {
            var deferred = 0 === lockCount ? (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"]).resolve() : lockDeferred;
            return deferred.promise()
        },
        reset: function() {
            lockCount = 0;
            if (lockDeferred) {
                lockDeferred.resolve()
            }
        }
    }
}();
function isDisjunctiveOperator(condition) {
    return /^(or|\|\||\|)$/i.test(condition)
}
function isConjunctiveOperator(condition) {
    return /^(and|&&|&)$/i.test(condition)
}
var keysEqual = function(keyExpr, key1, key2) {
    if (Array.isArray(keyExpr)) {
        var names = Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["map"])(key1, (function(v, k) {
            return k
        }));
        var name;
        for (var i = 0; i < names.length; i++) {
            name = names[i];
            if (!Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_6__["equalByValue"])(key1[name], key2[name], 0, false)) {
                return false
            }
        }
        return true
    }
    return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_6__["equalByValue"])(key1, key2, 0, false)
};
var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var base64_encode = function(input) {
    if (!Array.isArray(input)) {
        input = stringToByteArray(String(input))
    }
    var result = "";

    function getBase64Char(index) {
        return BASE64_CHARS.charAt(index)
    }
    for (var i = 0; i < input.length; i += 3) {
        var octet1 = input[i];
        var octet2 = input[i + 1];
        var octet3 = input[i + 2];
        result += Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["map"])([octet1 >> 2, (3 & octet1) << 4 | octet2 >> 4, isNaN(octet2) ? 64 : (15 & octet2) << 2 | octet3 >> 6, isNaN(octet3) ? 64 : 63 & octet3], getBase64Char).join("")
    }
    return result
};

function stringToByteArray(str) {
    var bytes = [];
    var code;
    var i;
    for (i = 0; i < str.length; i++) {
        code = str.charCodeAt(i);
        if (code < 128) {
            bytes.push(code)
        } else if (code < 2048) {
            bytes.push(192 + (code >> 6), 128 + (63 & code))
        } else if (code < 65536) {
            bytes.push(224 + (code >> 12), 128 + (code >> 6 & 63), 128 + (63 & code))
        } else if (code < 2097152) {
            bytes.push(240 + (code >> 18), 128 + (code >> 12 & 63), 128 + (code >> 6 & 63), 128 + (63 & code))
        }
    }
    return bytes
}
var isUnaryOperation = function(crit) {
    return "!" === crit[0] && Array.isArray(crit[1])
};
var isGroupOperator = function(value) {
    return "and" === value || "or" === value
};
var isGroupCriterion = function(crit) {
    var first = crit[0];
    var second = crit[1];
    if (Array.isArray(first)) {
        return true
    }
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(first)) {
        if (Array.isArray(second) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(second) || isGroupOperator(second)) {
            return true
        }
    }
    return false
};
var trivialPromise = function() {
    var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"];
    return d.resolve.apply(d, arguments).promise()
};
var rejectedPromise = function() {
    var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"];
    return d.reject.apply(d, arguments).promise()
};

function throttle(func, timeout) {
    var timeoutId;
    var lastArgs;
    return function() {
        lastArgs = arguments;
        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                timeoutId = void 0;
                if (lastArgs) {
                    func.call(this, lastArgs)
                }
            }, Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(timeout) ? timeout() : timeout)
        }
        return timeoutId
    }
}
function throttleChanges(func, timeout) {
    var cache = [];
    var throttled = throttle((function() {
        func.call(this, cache);
        cache = []
    }), timeout);
    return function(changes) {
        if (Array.isArray(changes)) {
            cache.push(...changes)
        }
        return throttled.call(this, cache)
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/data_helper.js":
/*!****************************************************!*\
  !*** ./node_modules/devextreme/esm/data_helper.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_data_source_data_source__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/data_source/data_source */ "./node_modules/devextreme/esm/data/data_source/data_source.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _data_data_source_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/data_source/utils */ "./node_modules/devextreme/esm/data/data_source/utils.js");
/**
 * DevExtreme (esm/data_helper.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var DATA_SOURCE_OPTIONS_METHOD = "_dataSourceOptions";
var DATA_SOURCE_CHANGED_METHOD = "_dataSourceChangedHandler";
var DATA_SOURCE_LOAD_ERROR_METHOD = "_dataSourceLoadErrorHandler";
var DATA_SOURCE_LOADING_CHANGED_METHOD = "_dataSourceLoadingChangedHandler";
var DATA_SOURCE_FROM_URL_LOAD_MODE_METHOD = "_dataSourceFromUrlLoadMode";
var SPECIFIC_DATA_SOURCE_OPTION = "_getSpecificDataSourceOption";
var NORMALIZE_DATA_SOURCE = "_normalizeDataSource";
var DataHelperMixin = {
    postCtor: function() {
        this.on("disposing", function() {
            this._disposeDataSource()
        }.bind(this))
    },
    _refreshDataSource: function() {
        this._initDataSource();
        this._loadDataSource()
    },
    _initDataSource: function() {
        var dataSourceOptions = SPECIFIC_DATA_SOURCE_OPTION in this ? this[SPECIFIC_DATA_SOURCE_OPTION]() : this.option("dataSource");
        var widgetDataSourceOptions;
        var dataSourceType;
        this._disposeDataSource();
        if (dataSourceOptions) {
            if (dataSourceOptions instanceof _data_data_source_data_source__WEBPACK_IMPORTED_MODULE_0__["DataSource"]) {
                this._isSharedDataSource = true;
                this._dataSource = dataSourceOptions
            } else {
                widgetDataSourceOptions = DATA_SOURCE_OPTIONS_METHOD in this ? this[DATA_SOURCE_OPTIONS_METHOD]() : {};
                dataSourceType = this._dataSourceType ? this._dataSourceType() : _data_data_source_data_source__WEBPACK_IMPORTED_MODULE_0__["DataSource"];
                dataSourceOptions = Object(_data_data_source_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeDataSourceOptions"])(dataSourceOptions, {
                    fromUrlLoadMode: DATA_SOURCE_FROM_URL_LOAD_MODE_METHOD in this && this[DATA_SOURCE_FROM_URL_LOAD_MODE_METHOD]()
                });
                this._dataSource = new dataSourceType(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, widgetDataSourceOptions, dataSourceOptions))
            }
            if (NORMALIZE_DATA_SOURCE in this) {
                this._dataSource = this[NORMALIZE_DATA_SOURCE](this._dataSource)
            }
            this._addDataSourceHandlers()
        }
    },
    _addDataSourceHandlers: function() {
        if (DATA_SOURCE_CHANGED_METHOD in this) {
            this._addDataSourceChangeHandler()
        }
        if (DATA_SOURCE_LOAD_ERROR_METHOD in this) {
            this._addDataSourceLoadErrorHandler()
        }
        if (DATA_SOURCE_LOADING_CHANGED_METHOD in this) {
            this._addDataSourceLoadingChangedHandler()
        }
        this._addReadyWatcher()
    },
    _addReadyWatcher: function() {
        this._dataSource.on("loadingChanged", function(isLoading) {
            this._ready && this._ready(!isLoading)
        }.bind(this))
    },
    _addDataSourceChangeHandler: function() {
        var dataSource = this._dataSource;
        this._proxiedDataSourceChangedHandler = function(e) {
            this[DATA_SOURCE_CHANGED_METHOD](dataSource.items(), e)
        }.bind(this);
        dataSource.on("changed", this._proxiedDataSourceChangedHandler)
    },
    _addDataSourceLoadErrorHandler: function() {
        this._proxiedDataSourceLoadErrorHandler = this[DATA_SOURCE_LOAD_ERROR_METHOD].bind(this);
        this._dataSource.on("loadError", this._proxiedDataSourceLoadErrorHandler)
    },
    _addDataSourceLoadingChangedHandler: function() {
        this._proxiedDataSourceLoadingChangedHandler = this[DATA_SOURCE_LOADING_CHANGED_METHOD].bind(this);
        this._dataSource.on("loadingChanged", this._proxiedDataSourceLoadingChangedHandler)
    },
    _loadDataSource: function() {
        if (this._dataSource) {
            var dataSource = this._dataSource;
            if (dataSource.isLoaded()) {
                this._proxiedDataSourceChangedHandler && this._proxiedDataSourceChangedHandler()
            } else {
                dataSource.load()
            }
        }
    },
    _loadSingle: function(key, value) {
        key = "this" === key ? this._dataSource.key() || "this" : key;
        return this._dataSource.loadSingle(key, value)
    },
    _isLastPage: function() {
        return !this._dataSource || this._dataSource.isLastPage() || !this._dataSource._pageSize
    },
    _isDataSourceLoading: function() {
        return this._dataSource && this._dataSource.isLoading()
    },
    _disposeDataSource: function() {
        if (this._dataSource) {
            if (this._isSharedDataSource) {
                delete this._isSharedDataSource;
                this._proxiedDataSourceChangedHandler && this._dataSource.off("changed", this._proxiedDataSourceChangedHandler);
                this._proxiedDataSourceLoadErrorHandler && this._dataSource.off("loadError", this._proxiedDataSourceLoadErrorHandler);
                this._proxiedDataSourceLoadingChangedHandler && this._dataSource.off("loadingChanged", this._proxiedDataSourceLoadingChangedHandler)
            } else {
                this._dataSource.dispose()
            }
            delete this._dataSource;
            delete this._proxiedDataSourceChangedHandler;
            delete this._proxiedDataSourceLoadErrorHandler;
            delete this._proxiedDataSourceLoadingChangedHandler
        }
    },
    getDataSource: function() {
        return this._dataSource || null
    }
};
/* harmony default export */ __webpack_exports__["default"] = (DataHelperMixin);


/***/ }),

/***/ "./node_modules/devextreme/esm/events/contextmenu.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/events/contextmenu.js ***!
  \***********************************************************/
/*! exports provided: name */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "name", function() { return name; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_support__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils/support */ "./node_modules/devextreme/esm/core/utils/support.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_event_registrator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/event_registrator */ "./node_modules/devextreme/esm/events/core/event_registrator.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _hold__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hold */ "./node_modules/devextreme/esm/events/hold.js");
/**
 * DevExtreme (esm/events/contextmenu.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */








var CONTEXTMENU_NAMESPACE = "dxContexMenu";
var CONTEXTMENU_NAMESPACED_EVENT_NAME = Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["addNamespace"])("contextmenu", CONTEXTMENU_NAMESPACE);
var HOLD_NAMESPACED_EVENT_NAME = Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["addNamespace"])(_hold__WEBPACK_IMPORTED_MODULE_7__["default"].name, CONTEXTMENU_NAMESPACE);
var CONTEXTMENU_EVENT_NAME = "dxcontextmenu";
var ContextMenu = _core_class__WEBPACK_IMPORTED_MODULE_4__["default"].inherit({
    setup: function(element) {
        var $element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].on($element, CONTEXTMENU_NAMESPACED_EVENT_NAME, this._contextMenuHandler.bind(this));
        if (_core_utils_support__WEBPACK_IMPORTED_MODULE_2__["touch"] || _core_devices__WEBPACK_IMPORTED_MODULE_3__["default"].isSimulator()) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].on($element, HOLD_NAMESPACED_EVENT_NAME, this._holdHandler.bind(this))
        }
    },
    _holdHandler: function(e) {
        if (Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["isMouseEvent"])(e) && !_core_devices__WEBPACK_IMPORTED_MODULE_3__["default"].isSimulator()) {
            return
        }
        this._fireContextMenu(e)
    },
    _contextMenuHandler: function(e) {
        this._fireContextMenu(e)
    },
    _fireContextMenu: function(e) {
        return Object(_utils_index__WEBPACK_IMPORTED_MODULE_6__["fireEvent"])({
            type: CONTEXTMENU_EVENT_NAME,
            originalEvent: e
        })
    },
    teardown: function(element) {
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].off(element, "." + CONTEXTMENU_NAMESPACE)
    }
});
Object(_core_event_registrator__WEBPACK_IMPORTED_MODULE_5__["default"])(CONTEXTMENU_EVENT_NAME, new ContextMenu);
var name = CONTEXTMENU_EVENT_NAME;


/***/ }),

/***/ "./node_modules/devextreme/esm/events/hold.js":
/*!****************************************************!*\
  !*** ./node_modules/devextreme/esm/events/hold.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/emitter */ "./node_modules/devextreme/esm/events/core/emitter.js");
/* harmony import */ var _core_emitter_registrator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/emitter_registrator */ "./node_modules/devextreme/esm/events/core/emitter_registrator.js");
/**
 * DevExtreme (esm/events/hold.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var abs = Math.abs;
var HOLD_EVENT_NAME = "dxhold";
var HOLD_TIMEOUT = 750;
var TOUCH_BOUNDARY = 5;
var HoldEmitter = _core_emitter__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    start: function(e) {
        this._startEventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_0__["eventData"])(e);
        this._startTimer(e)
    },
    _startTimer: function(e) {
        var holdTimeout = "timeout" in this ? this.timeout : HOLD_TIMEOUT;
        this._holdTimer = setTimeout(function() {
            this._requestAccept(e);
            this._fireEvent(HOLD_EVENT_NAME, e, {
                target: e.target
            });
            this._forgetAccept()
        }.bind(this), holdTimeout)
    },
    move: function(e) {
        if (this._touchWasMoved(e)) {
            this._cancel(e)
        }
    },
    _touchWasMoved: function(e) {
        var delta = Object(_utils_index__WEBPACK_IMPORTED_MODULE_0__["eventDelta"])(this._startEventData, Object(_utils_index__WEBPACK_IMPORTED_MODULE_0__["eventData"])(e));
        return abs(delta.x) > TOUCH_BOUNDARY || abs(delta.y) > TOUCH_BOUNDARY
    },
    end: function() {
        this._stopTimer()
    },
    _stopTimer: function() {
        clearTimeout(this._holdTimer)
    },
    cancel: function() {
        this._stopTimer()
    },
    dispose: function() {
        this._stopTimer()
    }
});
Object(_core_emitter_registrator__WEBPACK_IMPORTED_MODULE_2__["default"])({
    emitter: HoldEmitter,
    bubble: true,
    events: [HOLD_EVENT_NAME]
});
/* harmony default export */ __webpack_exports__["default"] = ({
    name: HOLD_EVENT_NAME
});


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/collection/item.js":
/*!***********************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/collection/item.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_public_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/public_component */ "./node_modules/devextreme/esm/core/utils/public_component.js");
/**
 * DevExtreme (esm/ui/collection/item.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var INVISIBLE_STATE_CLASS = "dx-state-invisible";
var DISABLED_STATE_CLASS = "dx-state-disabled";
var ITEM_CONTENT_PLACEHOLDER_CLASS = "dx-item-content-placeholder";
var forcibleWatcher = function(watchMethod, fn, callback) {
    var filteredCallback = function(value) {
        if (oldValue !== value) {
            callback(value, oldValue);
            oldValue = value
        }
    };
    var oldValue;
    return {
        dispose: watchMethod(fn, filteredCallback),
        force: function() {
            filteredCallback(fn())
        }
    }
};
var CollectionItem = _core_class__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    ctor: function($element, options, rawData) {
        this._$element = $element;
        this._options = options;
        this._rawData = rawData;
        Object(_core_utils_public_component__WEBPACK_IMPORTED_MODULE_3__["attachInstanceToElement"])($element, this, this._dispose);
        this._render()
    },
    _render: function() {
        var $placeholder = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(ITEM_CONTENT_PLACEHOLDER_CLASS);
        this._$element.append($placeholder);
        this._watchers = [];
        this._renderWatchers()
    },
    _renderWatchers: function() {
        this._startWatcher("disabled", this._renderDisabled.bind(this));
        this._startWatcher("visible", this._renderVisible.bind(this))
    },
    _startWatcher: function(field, render) {
        var rawData = this._rawData;
        var exprGetter = this._options.fieldGetter(field);
        var watcher = forcibleWatcher(this._options.watchMethod(), (function() {
            return exprGetter(rawData)
        }), function(value, oldValue) {
            this._dirty = true;
            render(value, oldValue)
        }.bind(this));
        this._watchers.push(watcher)
    },
    setDataField: function() {
        this._dirty = false;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(this._watchers, (function(_, watcher) {
            watcher.force()
        }));
        if (this._dirty) {
            return true
        }
    },
    _renderDisabled: function(value, oldValue) {
        this._$element.toggleClass(DISABLED_STATE_CLASS, !!value);
        this._updateOwnerFocus(value)
    },
    _updateOwnerFocus: function(isDisabled) {
        var ownerComponent = this._options.owner;
        if (ownerComponent && isDisabled) {
            ownerComponent._resetItemFocus(this._$element)
        }
    },
    _renderVisible: function(value, oldValue) {
        this._$element.toggleClass(INVISIBLE_STATE_CLASS, void 0 !== value && !value)
    },
    _dispose: function() {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(this._watchers, (function(_, watcher) {
            watcher.dispose()
        }))
    }
});
CollectionItem.getInstance = function($element) {
    return Object(_core_utils_public_component__WEBPACK_IMPORTED_MODULE_3__["getInstanceByElement"])($element, this)
};
/* harmony default export */ __webpack_exports__["default"] = (CollectionItem);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.async.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/collection/ui.collection_widget.async.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_collection_widget_edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.collection_widget.edit */ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/ui/collection/ui.collection_widget.async.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var AsyncCollectionWidget = _ui_collection_widget_edit__WEBPACK_IMPORTED_MODULE_0__["default"].inherit({
    _initMarkup() {
        this._deferredItems = [];
        this.callBase()
    },
    _renderItemContent(args) {
        var renderContentDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_1__["Deferred"];
        var itemDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_1__["Deferred"];
        this._deferredItems[args.index] = itemDeferred;
        var $itemContent = this.callBase.call(this, args);
        itemDeferred.done(() => {
            renderContentDeferred.resolve($itemContent)
        });
        return renderContentDeferred.promise()
    },
    _createItemByTemplate(itemTemplate, renderArgs) {
        return itemTemplate.render({
            model: renderArgs.itemData,
            container: renderArgs.container,
            index: renderArgs.index,
            onRendered: () => {
                this._deferredItems[renderArgs.index].resolve()
            }
        })
    },
    _postProcessRenderItems: _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"],
    _renderItemsAsync() {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_1__["Deferred"];
        _core_utils_deferred__WEBPACK_IMPORTED_MODULE_1__["when"].apply(this, this._deferredItems).done(() => {
            this._postProcessRenderItems();
            d.resolve()
        });
        return d.promise()
    },
    _clean() {
        this.callBase();
        this._deferredItems = []
    }
});
/* harmony default export */ __webpack_exports__["default"] = (AsyncCollectionWidget);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.base.js":
/*!********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/collection/ui.collection_widget.base.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_template_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/template_manager */ "./node_modules/devextreme/esm/core/utils/template_manager.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_action__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/action */ "./node_modules/devextreme/esm/core/action.js");
/* harmony import */ var _core_guid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/guid */ "./node_modules/devextreme/esm/core/guid.js");
/* harmony import */ var _widget_ui_widget__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../widget/ui.widget */ "./node_modules/devextreme/esm/ui/widget/ui.widget.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../events/pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/* harmony import */ var _data_helper__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../data_helper */ "./node_modules/devextreme/esm/data_helper.js");
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./item */ "./node_modules/devextreme/esm/ui/collection/item.js");
/* harmony import */ var _widget_selectors__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../widget/selectors */ "./node_modules/devextreme/esm/ui/widget/selectors.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _events_hold__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../events/hold */ "./node_modules/devextreme/esm/events/hold.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _events_click__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../events/click */ "./node_modules/devextreme/esm/events/click.js");
/* harmony import */ var _events_contextmenu__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../events/contextmenu */ "./node_modules/devextreme/esm/events/contextmenu.js");
/* harmony import */ var _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../core/templates/bindable_template */ "./node_modules/devextreme/esm/core/templates/bindable_template.js");
/**
 * DevExtreme (esm/ui/collection/ui.collection_widget.base.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


























var COLLECTION_CLASS = "dx-collection";
var ITEM_CLASS = "dx-item";
var CONTENT_CLASS_POSTFIX = "-content";
var ITEM_CONTENT_PLACEHOLDER_CLASS = "dx-item-content-placeholder";
var ITEM_DATA_KEY = "dxItemData";
var ITEM_INDEX_KEY = "dxItemIndex";
var ITEM_TEMPLATE_ID_PREFIX = "tmpl-";
var ITEMS_OPTIONS_NAME = "dxItem";
var SELECTED_ITEM_CLASS = "dx-item-selected";
var ITEM_RESPONSE_WAIT_CLASS = "dx-item-response-wait";
var EMPTY_COLLECTION = "dx-empty-collection";
var TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
var ITEM_PATH_REGEX = /^([^.]+\[\d+\]\.)+([\w.]+)$/;
var ANONYMOUS_TEMPLATE_NAME = "item";
var FOCUS_UP = "up";
var FOCUS_DOWN = "down";
var FOCUS_LEFT = "left";
var FOCUS_RIGHT = "right";
var FOCUS_PAGE_UP = "pageup";
var FOCUS_PAGE_DOWN = "pagedown";
var FOCUS_LAST = "last";
var FOCUS_FIRST = "first";
var CollectionWidget = _widget_ui_widget__WEBPACK_IMPORTED_MODULE_14__["default"].inherit({
    _activeStateUnit: "." + ITEM_CLASS,
    _supportedKeys: function() {
        var enter = function(e) {
            var $itemElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this.option("focusedElement"));
            if (!$itemElement.length) {
                return
            }
            this._itemClickHandler(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])({}, e, {
                target: $itemElement.get(0),
                currentTarget: $itemElement.get(0)
            }))
        };
        var move = function(location, e) {
            if (!Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_15__["isCommandKeyPressed"])(e)) {
                e.preventDefault();
                e.stopPropagation();
                this._moveFocus(location, e)
            }
        };
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this.callBase(), {
            space: function(e) {
                e.preventDefault();
                enter.call(this, e)
            },
            enter: enter,
            leftArrow: move.bind(this, FOCUS_LEFT),
            rightArrow: move.bind(this, FOCUS_RIGHT),
            upArrow: move.bind(this, FOCUS_UP),
            downArrow: move.bind(this, FOCUS_DOWN),
            pageUp: move.bind(this, FOCUS_UP),
            pageDown: move.bind(this, FOCUS_DOWN),
            home: move.bind(this, FOCUS_FIRST),
            end: move.bind(this, FOCUS_LAST)
        })
    },
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this.callBase(), {
            selectOnFocus: false,
            loopItemFocus: true,
            items: [],
            itemTemplate: "item",
            onItemRendered: null,
            onItemClick: null,
            onItemHold: null,
            itemHoldTimeout: 750,
            onItemContextMenu: null,
            onFocusedItemChanged: null,
            noDataText: _localization_message__WEBPACK_IMPORTED_MODULE_20__["default"].format("dxCollectionWidget-noDataText"),
            dataSource: null,
            _itemAttributes: {},
            itemTemplateProperty: "template",
            focusOnSelectedItem: true,
            focusedElement: null,
            displayExpr: void 0,
            disabledExpr: function(data) {
                return data ? data.disabled : void 0
            },
            visibleExpr: function(data) {
                return data ? data.visible : void 0
            }
        })
    },
    _init: function() {
        this._compileDisplayGetter();
        this.callBase();
        this._cleanRenderedItems();
        this._refreshDataSource()
    },
    _compileDisplayGetter: function() {
        var displayExpr = this.option("displayExpr");
        this._displayGetter = displayExpr ? Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_22__["compileGetter"])(this.option("displayExpr")) : void 0
    },
    _initTemplates: function() {
        this._initItemsFromMarkup();
        this._initDefaultItemTemplate();
        this.callBase()
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _initDefaultItemTemplate: function() {
        var fieldsMap = this._getFieldsMap();
        this._templateManager.addDefaultTemplates({
            item: new _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_25__["BindableTemplate"](function($container, data) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isPlainObject"])(data)) {
                    this._prepareDefaultItemTemplate(data, $container)
                } else {
                    if (fieldsMap && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(fieldsMap.text)) {
                        data = fieldsMap.text(data)
                    }
                    $container.text(String(Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_3__["ensureDefined"])(data, "")))
                }
            }.bind(this), this._getBindableFields(), this.option("integrationOptions.watchMethod"), fieldsMap)
        })
    },
    _getBindableFields: function() {
        return ["text", "html"]
    },
    _getFieldsMap: function() {
        if (this._displayGetter) {
            return {
                text: this._displayGetter
            }
        }
    },
    _prepareDefaultItemTemplate: function(data, $container) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(data.text)) {
            $container.text(data.text)
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(data.html)) {
            $container.html(data.html)
        }
    },
    _initItemsFromMarkup: function() {
        var rawItems = Object(_core_utils_template_manager__WEBPACK_IMPORTED_MODULE_4__["findTemplates"])(this.$element(), ITEMS_OPTIONS_NAME);
        if (!rawItems.length || this.option("items").length) {
            return
        }
        var items = rawItems.map(_ref => {
            var {
                element: element,
                options: options
            } = _ref;
            var isTemplateRequired = /\S/.test(element.innerHTML) && !options.template;
            if (isTemplateRequired) {
                options.template = this._prepareItemTemplate(element)
            } else {
                Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(element).remove()
            }
            return options
        });
        this.option("items", items)
    },
    _prepareItemTemplate: function(item) {
        var templateId = ITEM_TEMPLATE_ID_PREFIX + new _core_guid__WEBPACK_IMPORTED_MODULE_13__["default"];
        var $template = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(item).detach().clone().removeAttr("data-options").addClass(TEMPLATE_WRAPPER_CLASS);
        this._saveTemplate(templateId, $template);
        return templateId
    },
    _dataSourceOptions: function() {
        return {
            paginate: false
        }
    },
    _cleanRenderedItems: function() {
        this._renderedItemsCount = 0
    },
    _focusTarget: function() {
        return this.$element()
    },
    _focusInHandler: function(e) {
        this.callBase.apply(this, arguments);
        if (-1 === Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_10__["inArray"])(e.target, this._focusTarget())) {
            return
        }
        var $focusedElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this.option("focusedElement"));
        if ($focusedElement.length) {
            this._setFocusedItem($focusedElement)
        } else {
            var $activeItem = this._getActiveItem();
            if ($activeItem.length) {
                this.option("focusedElement", Object(_core_element__WEBPACK_IMPORTED_MODULE_5__["getPublicElement"])($activeItem))
            }
        }
    },
    _focusOutHandler: function() {
        this.callBase.apply(this, arguments);
        var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this.option("focusedElement"));
        this._updateFocusedItemState($target, false)
    },
    _getActiveItem: function(last) {
        var $focusedElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this.option("focusedElement"));
        if ($focusedElement.length) {
            return $focusedElement
        }
        var index = this.option("focusOnSelectedItem") ? this.option("selectedIndex") : 0;
        var activeElements = this._getActiveElement();
        var lastIndex = activeElements.length - 1;
        if (index < 0) {
            index = last ? lastIndex : 0
        }
        return activeElements.eq(index)
    },
    _moveFocus: function(location) {
        var $items = this._getAvailableItems();
        var $newTarget;
        switch (location) {
            case FOCUS_PAGE_UP:
            case FOCUS_UP:
                $newTarget = this._prevItem($items);
                break;
            case FOCUS_PAGE_DOWN:
            case FOCUS_DOWN:
                $newTarget = this._nextItem($items);
                break;
            case FOCUS_RIGHT:
                $newTarget = this.option("rtlEnabled") ? this._prevItem($items) : this._nextItem($items);
                break;
            case FOCUS_LEFT:
                $newTarget = this.option("rtlEnabled") ? this._nextItem($items) : this._prevItem($items);
                break;
            case FOCUS_FIRST:
                $newTarget = $items.first();
                break;
            case FOCUS_LAST:
                $newTarget = $items.last();
                break;
            default:
                return false
        }
        if (0 !== $newTarget.length) {
            this.option("focusedElement", Object(_core_element__WEBPACK_IMPORTED_MODULE_5__["getPublicElement"])($newTarget))
        }
    },
    _getVisibleItems: function($itemElements) {
        $itemElements = $itemElements || this._itemElements();
        return $itemElements.filter(":visible")
    },
    _getAvailableItems: function($itemElements) {
        return this._getVisibleItems($itemElements).not(".dx-state-disabled")
    },
    _prevItem: function($items) {
        var $target = this._getActiveItem();
        var targetIndex = $items.index($target);
        var $last = $items.last();
        var $item = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])($items[targetIndex - 1]);
        var loop = this.option("loopItemFocus");
        if (0 === $item.length && loop) {
            $item = $last
        }
        return $item
    },
    _nextItem: function($items) {
        var $target = this._getActiveItem(true);
        var targetIndex = $items.index($target);
        var $first = $items.first();
        var $item = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])($items[targetIndex + 1]);
        var loop = this.option("loopItemFocus");
        if (0 === $item.length && loop) {
            $item = $first
        }
        return $item
    },
    _selectFocusedItem: function($target) {
        this.selectItem($target)
    },
    _updateFocusedItemState: function(target, isFocused, needCleanItemId) {
        var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(target);
        if ($target.length) {
            this._refreshActiveDescendant();
            this._refreshItemId($target, needCleanItemId);
            this._toggleFocusClass(isFocused, $target)
        }
        this._updateParentActiveDescendant()
    },
    _refreshActiveDescendant: function($target) {
        this.setAria("activedescendant", Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(this.option("focusedElement")) ? this.getFocusedItemId() : null, $target)
    },
    _refreshItemId: function($target, needCleanItemId) {
        if (!needCleanItemId && this.option("focusedElement")) {
            this.setAria("id", this.getFocusedItemId(), $target)
        } else {
            this.setAria("id", null, $target)
        }
    },
    _setFocusedItem: function($target) {
        if (!$target || !$target.length) {
            return
        }
        this._updateFocusedItemState($target, true);
        this.onFocusedItemChanged(this.getFocusedItemId());
        if (this.option("selectOnFocus")) {
            this._selectFocusedItem($target)
        }
    },
    _findItemElementByItem: function(item) {
        var result = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])();
        var that = this;
        this.itemElements().each((function() {
            var $item = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this);
            if ($item.data(that._itemDataKey()) === item) {
                result = $item;
                return false
            }
        }));
        return result
    },
    _getIndexByItem: function(item) {
        return this.option("items").indexOf(item)
    },
    _itemOptionChanged: function(item, property, value, oldValue) {
        var $item = this._findItemElementByItem(item);
        if (!$item.length) {
            return
        }
        if (!this.constructor.ItemClass.getInstance($item).setDataField(property, value)) {
            this._refreshItem($item, item)
        }
        var isDisabling = "disabled" === property && value;
        if (isDisabling) {
            this._resetItemFocus($item)
        }
    },
    _resetItemFocus($item) {
        if ($item.is(this.option("focusedElement"))) {
            this.option("focusedElement", null)
        }
    },
    _refreshItem: function($item) {
        var itemData = this._getItemData($item);
        var index = $item.data(this._itemIndexKey());
        this._renderItem(this._renderedItemsCount + index, itemData, null, $item)
    },
    _updateParentActiveDescendant: _core_utils_common__WEBPACK_IMPORTED_MODULE_3__["noop"],
    _optionChanged: function(args) {
        if ("items" === args.name) {
            var matches = args.fullName.match(ITEM_PATH_REGEX);
            if (matches && matches.length) {
                var property = matches[matches.length - 1];
                var itemPath = args.fullName.replace("." + property, "");
                var item = this.option(itemPath);
                this._itemOptionChanged(item, property, args.value, args.previousValue);
                return
            }
        }
        switch (args.name) {
            case "items":
            case "_itemAttributes":
            case "itemTemplateProperty":
            case "useItemTextAsTitle":
                this._cleanRenderedItems();
                this._invalidate();
                break;
            case "dataSource":
                this._refreshDataSource();
                this._renderEmptyMessage();
                break;
            case "noDataText":
                this._renderEmptyMessage();
                break;
            case "itemTemplate":
                this._invalidate();
                break;
            case "onItemRendered":
                this._createItemRenderAction();
                break;
            case "onItemClick":
                break;
            case "onItemHold":
            case "itemHoldTimeout":
                this._attachHoldEvent();
                break;
            case "onItemContextMenu":
                this._attachContextMenuEvent();
                break;
            case "onFocusedItemChanged":
                this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
                break;
            case "selectOnFocus":
            case "loopItemFocus":
            case "focusOnSelectedItem":
                break;
            case "focusedElement":
                this._updateFocusedItemState(args.previousValue, false, true);
                this._setFocusedItem(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(args.value));
                break;
            case "displayExpr":
                this._compileDisplayGetter();
                this._initDefaultItemTemplate();
                this._invalidate();
                break;
            case "visibleExpr":
            case "disabledExpr":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    _invalidate: function() {
        this.option("focusedElement", null);
        return this.callBase.apply(this, arguments)
    },
    _loadNextPage: function() {
        var dataSource = this._dataSource;
        this._expectNextPageLoading();
        dataSource.pageIndex(1 + dataSource.pageIndex());
        return dataSource.load()
    },
    _expectNextPageLoading: function() {
        this._startIndexForAppendedItems = 0
    },
    _expectLastItemLoading: function() {
        this._startIndexForAppendedItems = -1
    },
    _forgetNextPageLoading: function() {
        this._startIndexForAppendedItems = null
    },
    _dataSourceChangedHandler: function(newItems) {
        var items = this.option("items");
        if (this._initialized && items && this._shouldAppendItems()) {
            this._renderedItemsCount = items.length;
            if (!this._isLastPage() || -1 !== this._startIndexForAppendedItems) {
                this.option().items = items.concat(newItems.slice(this._startIndexForAppendedItems))
            }
            this._forgetNextPageLoading();
            this._refreshContent()
        } else {
            this.option("items", newItems.slice())
        }
    },
    _refreshContent: function() {
        this._prepareContent();
        this._renderContent()
    },
    _dataSourceLoadErrorHandler: function() {
        this._forgetNextPageLoading();
        this.option("items", this.option("items"))
    },
    _shouldAppendItems: function() {
        return null != this._startIndexForAppendedItems && this._allowDynamicItemsAppend()
    },
    _allowDynamicItemsAppend: function() {
        return false
    },
    _clean: function() {
        this._cleanFocusState();
        this._cleanItemContainer()
    },
    _cleanItemContainer: function() {
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._itemContainer()).empty()
    },
    _dispose: function() {
        this.callBase();
        clearTimeout(this._itemFocusTimeout)
    },
    _refresh: function() {
        this._cleanRenderedItems();
        this.callBase.apply(this, arguments)
    },
    _itemContainer: function() {
        return this.$element()
    },
    _itemClass: function() {
        return ITEM_CLASS
    },
    _itemContentClass: function() {
        return this._itemClass() + CONTENT_CLASS_POSTFIX
    },
    _selectedItemClass: function() {
        return SELECTED_ITEM_CLASS
    },
    _itemResponseWaitClass: function() {
        return ITEM_RESPONSE_WAIT_CLASS
    },
    _itemSelector: function() {
        return "." + this._itemClass()
    },
    _itemDataKey: function() {
        return ITEM_DATA_KEY
    },
    _itemIndexKey: function() {
        return ITEM_INDEX_KEY
    },
    _itemElements: function() {
        return this._itemContainer().find(this._itemSelector())
    },
    _initMarkup: function() {
        this.callBase();
        this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
        this.$element().addClass(COLLECTION_CLASS);
        this._prepareContent()
    },
    _prepareContent: Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_3__["deferRenderer"])((function() {
        this._renderContentImpl()
    })),
    _renderContent: function() {
        this._fireContentReadyAction()
    },
    _render: function() {
        this.callBase();
        this._attachClickEvent();
        this._attachHoldEvent();
        this._attachContextMenuEvent()
    },
    _attachClickEvent: function() {
        var itemSelector = this._itemSelector();
        var clickEventNamespace = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_15__["addNamespace"])(_events_click__WEBPACK_IMPORTED_MODULE_23__["name"], this.NAME);
        var pointerDownEventNamespace = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_15__["addNamespace"])(_events_pointer__WEBPACK_IMPORTED_MODULE_16__["default"].down, this.NAME);
        var that = this;
        var pointerDownAction = new _core_action__WEBPACK_IMPORTED_MODULE_12__["default"]((function(args) {
            var event = args.event;
            that._itemPointerDownHandler(event)
        }));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(this._itemContainer(), clickEventNamespace, itemSelector);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(this._itemContainer(), pointerDownEventNamespace, itemSelector);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(this._itemContainer(), clickEventNamespace, itemSelector, function(e) {
            this._itemClickHandler(e)
        }.bind(this));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(this._itemContainer(), pointerDownEventNamespace, itemSelector, (function(e) {
            pointerDownAction.execute({
                element: Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target),
                event: e
            })
        }))
    },
    _itemClickHandler: function(e, args, config) {
        this._itemDXEventHandler(e, "onItemClick", args, config)
    },
    _itemPointerDownHandler: function(e) {
        if (!this.option("focusStateEnabled")) {
            return
        }
        this._itemFocusHandler = function() {
            clearTimeout(this._itemFocusTimeout);
            this._itemFocusHandler = null;
            if (e.isDefaultPrevented()) {
                return
            }
            var $target = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target);
            var $closestItem = $target.closest(this._itemElements());
            var $closestFocusable = this._closestFocusable($target);
            if ($closestItem.length && $closestFocusable && -1 !== Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_10__["inArray"])($closestFocusable.get(0), this._focusTarget())) {
                this.option("focusedElement", Object(_core_element__WEBPACK_IMPORTED_MODULE_5__["getPublicElement"])($closestItem))
            }
        }.bind(this);
        this._itemFocusTimeout = setTimeout(this._forcePointerDownFocus.bind(this))
    },
    _closestFocusable: function($target) {
        if ($target.is(_widget_selectors__WEBPACK_IMPORTED_MODULE_19__["focusable"])) {
            return $target
        } else {
            $target = $target.parent();
            while ($target.length && !_core_dom_adapter__WEBPACK_IMPORTED_MODULE_6__["default"].isDocument($target.get(0))) {
                if ($target.is(_widget_selectors__WEBPACK_IMPORTED_MODULE_19__["focusable"])) {
                    return $target
                }
                $target = $target.parent()
            }
        }
    },
    _forcePointerDownFocus: function() {
        this._itemFocusHandler && this._itemFocusHandler()
    },
    _updateFocusState: function() {
        this.callBase.apply(this, arguments);
        this._forcePointerDownFocus()
    },
    _attachHoldEvent: function() {
        var $itemContainer = this._itemContainer();
        var itemSelector = this._itemSelector();
        var eventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_15__["addNamespace"])(_events_hold__WEBPACK_IMPORTED_MODULE_21__["default"].name, this.NAME);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off($itemContainer, eventName, itemSelector);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on($itemContainer, eventName, itemSelector, {
            timeout: this._getHoldTimeout()
        }, this._itemHoldHandler.bind(this))
    },
    _getHoldTimeout: function() {
        return this.option("itemHoldTimeout")
    },
    _shouldFireHoldEvent: function() {
        return this.hasActionSubscription("onItemHold")
    },
    _itemHoldHandler: function(e) {
        if (this._shouldFireHoldEvent()) {
            this._itemDXEventHandler(e, "onItemHold")
        } else {
            e.cancel = true
        }
    },
    _attachContextMenuEvent: function() {
        var $itemContainer = this._itemContainer();
        var itemSelector = this._itemSelector();
        var eventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_15__["addNamespace"])(_events_contextmenu__WEBPACK_IMPORTED_MODULE_24__["name"], this.NAME);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off($itemContainer, eventName, itemSelector);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on($itemContainer, eventName, itemSelector, this._itemContextMenuHandler.bind(this))
    },
    _shouldFireContextMenuEvent: function() {
        return this.hasActionSubscription("onItemContextMenu")
    },
    _itemContextMenuHandler: function(e) {
        if (this._shouldFireContextMenuEvent()) {
            this._itemDXEventHandler(e, "onItemContextMenu")
        } else {
            e.cancel = true
        }
    },
    _renderContentImpl: function() {
        var items = this.option("items") || [];
        if (this._renderedItemsCount) {
            this._renderItems(items.slice(this._renderedItemsCount))
        } else {
            this._renderItems(items)
        }
    },
    _renderItems: function(items) {
        if (items.length) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_11__["each"])(items, function(index, itemData) {
                this._renderItem(this._renderedItemsCount + index, itemData)
            }.bind(this))
        }
        this._renderEmptyMessage()
    },
    _renderItem: function(index, itemData, $container, $itemToReplace) {
        var _index$item;
        var itemIndex = null !== (_index$item = null === index || void 0 === index ? void 0 : index.item) && void 0 !== _index$item ? _index$item : index;
        $container = $container || this._itemContainer();
        var $itemFrame = this._renderItemFrame(itemIndex, itemData, $container, $itemToReplace);
        this._setElementData($itemFrame, itemData, itemIndex);
        $itemFrame.attr(this.option("_itemAttributes"));
        this._attachItemClickEvent(itemData, $itemFrame);
        var $itemContent = this._getItemContent($itemFrame);
        var renderContentPromise = this._renderItemContent({
            index: itemIndex,
            itemData: itemData,
            container: Object(_core_element__WEBPACK_IMPORTED_MODULE_5__["getPublicElement"])($itemContent),
            contentClass: this._itemContentClass(),
            defaultTemplateName: this.option("itemTemplate")
        });
        var that = this;
        Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["when"])(renderContentPromise).done((function($itemContent) {
            that._postprocessRenderItem({
                itemElement: $itemFrame,
                itemContent: $itemContent,
                itemData: itemData,
                itemIndex: itemIndex
            });
            that._executeItemRenderAction(index, itemData, Object(_core_element__WEBPACK_IMPORTED_MODULE_5__["getPublicElement"])($itemFrame))
        }));
        return $itemFrame
    },
    _getItemContent: function($itemFrame) {
        var $itemContent = $itemFrame.find("." + ITEM_CONTENT_PLACEHOLDER_CLASS);
        $itemContent.removeClass(ITEM_CONTENT_PLACEHOLDER_CLASS);
        return $itemContent
    },
    _attachItemClickEvent: function(itemData, $itemElement) {
        if (!itemData || !itemData.onClick) {
            return
        }
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on($itemElement, _events_click__WEBPACK_IMPORTED_MODULE_23__["name"], function(e) {
            this._itemEventHandlerByHandler($itemElement, itemData.onClick, {
                event: e
            })
        }.bind(this))
    },
    _renderItemContent: function(args) {
        var itemTemplateName = this._getItemTemplateName(args);
        var itemTemplate = this._getTemplate(itemTemplateName);
        this._addItemContentClasses(args);
        var $templateResult = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._createItemByTemplate(itemTemplate, args));
        if (!$templateResult.hasClass(TEMPLATE_WRAPPER_CLASS)) {
            return args.container
        }
        return this._renderItemContentByNode(args, $templateResult)
    },
    _renderItemContentByNode: function(args, $node) {
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(args.container).replaceWith($node);
        args.container = Object(_core_element__WEBPACK_IMPORTED_MODULE_5__["getPublicElement"])($node);
        this._addItemContentClasses(args);
        return $node
    },
    _addItemContentClasses: function(args) {
        var classes = [ITEM_CLASS + CONTENT_CLASS_POSTFIX, args.contentClass];
        Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(args.container).addClass(classes.join(" "))
    },
    _appendItemToContainer: function($container, $itemFrame, index) {
        $itemFrame.appendTo($container)
    },
    _renderItemFrame: function(index, itemData, $container, $itemToReplace) {
        var $itemFrame = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>");
        new this.constructor.ItemClass($itemFrame, this._itemOptions(), itemData || {});
        if ($itemToReplace && $itemToReplace.length) {
            $itemToReplace.replaceWith($itemFrame)
        } else {
            this._appendItemToContainer.call(this, $container, $itemFrame, index)
        }
        if (this.option("useItemTextAsTitle")) {
            var displayValue = this._displayGetter ? this._displayGetter(itemData) : itemData;
            $itemFrame.attr("title", displayValue)
        }
        return $itemFrame
    },
    _itemOptions: function() {
        var that = this;
        return {
            watchMethod: function() {
                return that.option("integrationOptions.watchMethod")
            },
            owner: that,
            fieldGetter: function(field) {
                var expr = that.option(field + "Expr");
                var getter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_22__["compileGetter"])(expr);
                return getter
            }
        }
    },
    _postprocessRenderItem: _core_utils_common__WEBPACK_IMPORTED_MODULE_3__["noop"],
    _executeItemRenderAction: function(index, itemData, itemElement) {
        this._getItemRenderAction()({
            itemElement: itemElement,
            itemIndex: index,
            itemData: itemData
        })
    },
    _setElementData: function(element, data, index) {
        element.addClass([ITEM_CLASS, this._itemClass()].join(" ")).data(this._itemDataKey(), data).data(this._itemIndexKey(), index)
    },
    _createItemRenderAction: function() {
        return this._itemRenderAction = this._createActionByOption("onItemRendered", {
            element: this.element(),
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering"
        })
    },
    _getItemRenderAction: function() {
        return this._itemRenderAction || this._createItemRenderAction()
    },
    _getItemTemplateName: function(args) {
        var data = args.itemData;
        var templateProperty = args.templateProperty || this.option("itemTemplateProperty");
        var template = data && data[templateProperty];
        return template || args.defaultTemplateName
    },
    _createItemByTemplate: function(itemTemplate, renderArgs) {
        return itemTemplate.render({
            model: renderArgs.itemData,
            container: renderArgs.container,
            index: renderArgs.index
        })
    },
    _emptyMessageContainer: function() {
        return this._itemContainer()
    },
    _renderEmptyMessage: function(items) {
        items = items || this.option("items");
        var noDataText = this.option("noDataText");
        var hideNoData = !noDataText || items && items.length || this._isDataSourceLoading();
        if (hideNoData && this._$noData) {
            this._$noData.remove();
            this._$noData = null;
            this.setAria("label", void 0)
        }
        if (!hideNoData) {
            this._$noData = this._$noData || Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass("dx-empty-message");
            this._$noData.appendTo(this._emptyMessageContainer()).html(noDataText);
            this.setAria("label", noDataText)
        }
        this.$element().toggleClass(EMPTY_COLLECTION, !hideNoData)
    },
    _itemDXEventHandler: function(dxEvent, handlerOptionName, actionArgs, actionConfig) {
        this._itemEventHandler(dxEvent.target, handlerOptionName, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(actionArgs, {
            event: dxEvent
        }), actionConfig)
    },
    _itemEventHandler: function(initiator, handlerOptionName, actionArgs, actionConfig) {
        var action = this._createActionByOption(handlerOptionName, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])({
            validatingTargetName: "itemElement"
        }, actionConfig));
        return this._itemEventHandlerImpl(initiator, action, actionArgs)
    },
    _itemEventHandlerByHandler: function(initiator, handler, actionArgs, actionConfig) {
        var action = this._createAction(handler, Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])({
            validatingTargetName: "itemElement"
        }, actionConfig));
        return this._itemEventHandlerImpl(initiator, action, actionArgs)
    },
    _itemEventHandlerImpl: function(initiator, action, actionArgs) {
        var $itemElement = this._closestItemElement(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(initiator));
        var args = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])({}, actionArgs);
        return action(Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(actionArgs, this._extendActionArgs($itemElement), args))
    },
    _extendActionArgs: function($itemElement) {
        return {
            itemElement: Object(_core_element__WEBPACK_IMPORTED_MODULE_5__["getPublicElement"])($itemElement),
            itemIndex: this._itemElements().index($itemElement),
            itemData: this._getItemData($itemElement)
        }
    },
    _closestItemElement: function($element) {
        return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])($element).closest(this._itemSelector())
    },
    _getItemData: function(itemElement) {
        return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(itemElement).data(this._itemDataKey())
    },
    _getSummaryItemsWidth: function(items, includeMargin) {
        var result = 0;
        if (items) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_11__["each"])(items, (function(_, item) {
                result += Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(item, includeMargin || false)
            }))
        }
        return result
    },
    getFocusedItemId: function() {
        if (!this._focusedItemId) {
            this._focusedItemId = "dx-" + new _core_guid__WEBPACK_IMPORTED_MODULE_13__["default"]
        }
        return this._focusedItemId
    },
    itemElements: function() {
        return this._itemElements()
    },
    itemsContainer: function() {
        return this._itemContainer()
    }
}).include(_data_helper__WEBPACK_IMPORTED_MODULE_17__["default"]);
CollectionWidget.ItemClass = _item__WEBPACK_IMPORTED_MODULE_18__["default"];
/* harmony default export */ __webpack_exports__["default"] = (CollectionWidget);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.js":
/*!********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _ui_collection_widget_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui.collection_widget.base */ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.base.js");
/* harmony import */ var _widget_ui_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _ui_collection_widget_edit_strategy_plain__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui.collection_widget.edit.strategy.plain */ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.strategy.plain.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _data_data_source_data_source__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../data/data_source/data_source */ "./node_modules/devextreme/esm/data/data_source/data_source.js");
/* harmony import */ var _data_data_source_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../data/data_source/utils */ "./node_modules/devextreme/esm/data/data_source/utils.js");
/* harmony import */ var _selection_selection__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../selection/selection */ "./node_modules/devextreme/esm/ui/selection/selection.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/ui/collection/ui.collection_widget.edit.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */














var ITEM_DELETING_DATA_KEY = "dxItemDeleting";
var NOT_EXISTING_INDEX = -1;
var indexExists = function(index) {
    return index !== NOT_EXISTING_INDEX
};
var CollectionWidget = _ui_collection_widget_base__WEBPACK_IMPORTED_MODULE_2__["default"].inherit({
    _setOptionsByReference: function() {
        this.callBase();
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])(this._optionsByReference, {
            selectedItem: true
        })
    },
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])(this.callBase(), {
            selectionMode: "none",
            selectionRequired: false,
            selectionByClick: true,
            selectedItems: [],
            selectedItemKeys: [],
            maxFilterLengthInRequest: 1500,
            keyExpr: null,
            selectedIndex: NOT_EXISTING_INDEX,
            selectedItem: null,
            onSelectionChanged: null,
            onItemReordered: null,
            onItemDeleting: null,
            onItemDeleted: null
        })
    },
    ctor: function(element, options) {
        this._userOptions = options || {};
        this.callBase(element, options)
    },
    _init: function() {
        this._initEditStrategy();
        this.callBase();
        this._initKeyGetter();
        this._initSelectionModule()
    },
    _initKeyGetter: function() {
        this._keyGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_9__["compileGetter"])(this.option("keyExpr"))
    },
    _getKeysByItems: function(selectedItems) {
        return this._editStrategy.getKeysByItems(selectedItems)
    },
    _getItemsByKeys: function(selectedItemKeys, selectedItems) {
        return this._editStrategy.getItemsByKeys(selectedItemKeys, selectedItems)
    },
    _getKeyByIndex: function(index) {
        return this._editStrategy.getKeyByIndex(index)
    },
    _getIndexByKey: function(key) {
        return this._editStrategy.getIndexByKey(key)
    },
    _getIndexByItemData: function(itemData) {
        return this._editStrategy.getIndexByItemData(itemData)
    },
    _isKeySpecified: function() {
        return !!(this._dataSource && this._dataSource.key())
    },
    _getCombinedFilter: function() {
        return this._dataSource && this._dataSource.filter()
    },
    key: function() {
        if (this.option("keyExpr")) {
            return this.option("keyExpr")
        }
        return this._dataSource && this._dataSource.key()
    },
    keyOf: function(item) {
        var key = item;
        var store = this._dataSource && this._dataSource.store();
        if (this.option("keyExpr")) {
            key = this._keyGetter(item)
        } else if (store) {
            key = store.keyOf(item)
        }
        return key
    },
    _nullValueSelectionSupported: function() {
        return false
    },
    _initSelectionModule: function() {
        var that = this;
        var itemsGetter = that._editStrategy.itemsGetter;
        this._selection = new _selection_selection__WEBPACK_IMPORTED_MODULE_12__["default"]({
            allowNullValue: this._nullValueSelectionSupported(),
            mode: this.option("selectionMode"),
            maxFilterLengthInRequest: this.option("maxFilterLengthInRequest"),
            equalByReference: !this._isKeySpecified(),
            onSelectionChanged: function(args) {
                if (args.addedItemKeys.length || args.removedItemKeys.length) {
                    that.option("selectedItems", that._getItemsByKeys(args.selectedItemKeys, args.selectedItems));
                    that._updateSelectedItems(args)
                }
            },
            filter: that._getCombinedFilter.bind(that),
            totalCount: function() {
                var items = that.option("items");
                var dataSource = that._dataSource;
                return dataSource && dataSource.totalCount() >= 0 ? dataSource.totalCount() : that._getItemsCount(items)
            },
            key: that.key.bind(that),
            keyOf: that.keyOf.bind(that),
            load: function(options) {
                if (that._dataSource) {
                    var loadOptions = that._dataSource.loadOptions();
                    options.customQueryParams = loadOptions.customQueryParams;
                    options.userData = that._dataSource._userData
                }
                var store = that._dataSource && that._dataSource.store();
                if (store) {
                    return store.load(options).done((function(loadResult) {
                        if (that._disposed) {
                            return
                        }
                        var items = Object(_data_data_source_utils__WEBPACK_IMPORTED_MODULE_11__["normalizeLoadResult"])(loadResult).data;
                        that._dataSource._applyMapFunction(items)
                    }))
                } else {
                    return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"]).resolve(this.plainItems())
                }
            },
            dataFields: function() {
                return that._dataSource && that._dataSource.select()
            },
            plainItems: itemsGetter.bind(that._editStrategy)
        })
    },
    _getItemsCount: function(items) {
        return items.reduce((itemsCount, item) => itemsCount + (item.items ? this._getItemsCount(item.items) : 1), 0)
    },
    _initEditStrategy: function() {
        var Strategy = _ui_collection_widget_edit_strategy_plain__WEBPACK_IMPORTED_MODULE_8__["default"];
        this._editStrategy = new Strategy(this)
    },
    _getSelectedItemIndices: function(keys) {
        var that = this;
        var indices = [];
        keys = keys || this._selection.getSelectedItemKeys();
        that._editStrategy.beginCache();
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(keys, (function(_, key) {
            var selectedIndex = that._getIndexByKey(key);
            if (indexExists(selectedIndex)) {
                indices.push(selectedIndex)
            }
        }));
        that._editStrategy.endCache();
        return indices
    },
    _initMarkup: function() {
        this._rendering = true;
        if (!this._dataSource || !this._dataSource.isLoading()) {
            this._syncSelectionOptions().done(() => this._normalizeSelectedItems())
        }
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this._rendering = false
    },
    _fireContentReadyAction: function() {
        this._rendering = false;
        this._rendered = true;
        this.callBase.apply(this, arguments)
    },
    _syncSelectionOptions: function(byOption) {
        byOption = byOption || this._chooseSelectOption();
        var selectedItem;
        var selectedIndex;
        var selectedItemKeys;
        var selectedItems;
        switch (byOption) {
            case "selectedIndex":
                selectedItem = this._editStrategy.getItemDataByIndex(this.option("selectedIndex"));
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(selectedItem)) {
                    this._setOptionWithoutOptionChange("selectedItems", [selectedItem]);
                    this._setOptionWithoutOptionChange("selectedItem", selectedItem);
                    this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems([selectedItem]))
                } else {
                    this._setOptionWithoutOptionChange("selectedItems", []);
                    this._setOptionWithoutOptionChange("selectedItemKeys", []);
                    this._setOptionWithoutOptionChange("selectedItem", null)
                }
                break;
            case "selectedItems":
                selectedItems = this.option("selectedItems") || [];
                selectedIndex = selectedItems.length ? this._editStrategy.getIndexByItemData(selectedItems[0]) : NOT_EXISTING_INDEX;
                if (this.option("selectionRequired") && !indexExists(selectedIndex)) {
                    return this._syncSelectionOptions("selectedIndex")
                }
                this._setOptionWithoutOptionChange("selectedItem", selectedItems[0]);
                this._setOptionWithoutOptionChange("selectedIndex", selectedIndex);
                this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems(selectedItems));
                break;
            case "selectedItem":
                selectedItem = this.option("selectedItem");
                selectedIndex = this._editStrategy.getIndexByItemData(selectedItem);
                if (this.option("selectionRequired") && !indexExists(selectedIndex)) {
                    return this._syncSelectionOptions("selectedIndex")
                }
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(selectedItem)) {
                    this._setOptionWithoutOptionChange("selectedItems", [selectedItem]);
                    this._setOptionWithoutOptionChange("selectedIndex", selectedIndex);
                    this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems([selectedItem]))
                } else {
                    this._setOptionWithoutOptionChange("selectedItems", []);
                    this._setOptionWithoutOptionChange("selectedItemKeys", []);
                    this._setOptionWithoutOptionChange("selectedIndex", NOT_EXISTING_INDEX)
                }
                break;
            case "selectedItemKeys":
                selectedItemKeys = this.option("selectedItemKeys");
                if (this.option("selectionRequired")) {
                    var selectedItemIndex = this._getIndexByKey(selectedItemKeys[0]);
                    if (!indexExists(selectedItemIndex)) {
                        return this._syncSelectionOptions("selectedIndex")
                    }
                }
                return this._selection.setSelection(selectedItemKeys)
        }
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"]).resolve().promise()
    },
    _chooseSelectOption: function() {
        var optionName = "selectedIndex";
        var isOptionDefined = function(optionName) {
            var optionValue = this.option(optionName);
            var length = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(optionValue) && optionValue.length;
            return length || optionName in this._userOptions
        }.bind(this);
        if (isOptionDefined("selectedItems")) {
            optionName = "selectedItems"
        } else if (isOptionDefined("selectedItem")) {
            optionName = "selectedItem"
        } else if (isOptionDefined("selectedItemKeys")) {
            optionName = "selectedItemKeys"
        }
        return optionName
    },
    _compareKeys: function(oldKeys, newKeys) {
        if (oldKeys.length !== newKeys.length) {
            return false
        }
        for (var i = 0; i < newKeys.length; i++) {
            if (oldKeys[i] !== newKeys[i]) {
                return false
            }
        }
        return true
    },
    _normalizeSelectedItems: function() {
        if ("none" === this.option("selectionMode")) {
            this._setOptionWithoutOptionChange("selectedItems", []);
            this._syncSelectionOptions("selectedItems")
        } else if ("single" === this.option("selectionMode")) {
            var newSelection = this.option("selectedItems");
            if (newSelection.length > 1 || !newSelection.length && this.option("selectionRequired") && this.option("items") && this.option("items").length) {
                var currentSelection = this._selection.getSelectedItems();
                var normalizedSelection = void 0 === newSelection[0] ? currentSelection[0] : newSelection[0];
                if (void 0 === normalizedSelection) {
                    normalizedSelection = this._editStrategy.itemsGetter()[0]
                }
                if (this.option("grouped") && normalizedSelection && normalizedSelection.items) {
                    normalizedSelection.items = [normalizedSelection.items[0]]
                }
                this._selection.setSelection(this._getKeysByItems([normalizedSelection]));
                this._setOptionWithoutOptionChange("selectedItems", [normalizedSelection]);
                return this._syncSelectionOptions("selectedItems")
            } else {
                this._selection.setSelection(this._getKeysByItems(newSelection))
            }
        } else {
            var newKeys = this._getKeysByItems(this.option("selectedItems"));
            var oldKeys = this._selection.getSelectedItemKeys();
            if (!this._compareKeys(oldKeys, newKeys)) {
                this._selection.setSelection(newKeys)
            }
        }
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"]).resolve().promise()
    },
    _itemClickHandler: function(e) {
        var itemSelectPromise = (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"]).resolve();
        var callBase = this.callBase;
        this._createAction(function(e) {
            var _this$_itemSelectHand;
            itemSelectPromise = null !== (_this$_itemSelectHand = this._itemSelectHandler(e.event)) && void 0 !== _this$_itemSelectHand ? _this$_itemSelectHand : itemSelectPromise
        }.bind(this), {
            validatingTargetName: "itemElement"
        })({
            itemElement: Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.currentTarget),
            event: e
        });
        itemSelectPromise.always(() => {
            callBase.apply(this, arguments)
        })
    },
    _itemSelectHandler: function(e) {
        var _itemSelectPromise;
        var itemSelectPromise;
        if (!this.option("selectionByClick")) {
            return
        }
        var $itemElement = e.currentTarget;
        if (this.isItemSelected($itemElement)) {
            this.unselectItem(e.currentTarget)
        } else {
            itemSelectPromise = this.selectItem(e.currentTarget)
        }
        return null === (_itemSelectPromise = itemSelectPromise) || void 0 === _itemSelectPromise ? void 0 : _itemSelectPromise.promise()
    },
    _selectedItemElement: function(index) {
        return this._itemElements().eq(index)
    },
    _postprocessRenderItem: function(args) {
        if ("none" !== this.option("selectionMode")) {
            var $itemElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(args.itemElement);
            var normalizedItemIndex = this._editStrategy.getNormalizedIndex($itemElement);
            var isItemSelected = this._isItemSelected(normalizedItemIndex);
            this._processSelectableItem($itemElement, isItemSelected)
        }
    },
    _processSelectableItem: function($itemElement, isSelected) {
        $itemElement.toggleClass(this._selectedItemClass(), isSelected);
        this._setAriaSelected($itemElement, String(isSelected))
    },
    _updateSelectedItems: function(args) {
        var that = this;
        var addedItemKeys = args.addedItemKeys;
        var removedItemKeys = args.removedItemKeys;
        if (that._rendered && (addedItemKeys.length || removedItemKeys.length)) {
            var selectionChangePromise = that._selectionChangePromise;
            if (!that._rendering) {
                var addedSelection = [];
                var normalizedIndex;
                var removedSelection = [];
                that._editStrategy.beginCache();
                for (var i = 0; i < addedItemKeys.length; i++) {
                    normalizedIndex = that._getIndexByKey(addedItemKeys[i]);
                    addedSelection.push(normalizedIndex);
                    that._addSelection(normalizedIndex)
                }
                for (var _i = 0; _i < removedItemKeys.length; _i++) {
                    normalizedIndex = that._getIndexByKey(removedItemKeys[_i]);
                    removedSelection.push(normalizedIndex);
                    that._removeSelection(normalizedIndex)
                }
                that._editStrategy.endCache();
                that._updateSelection(addedSelection, removedSelection)
            }
            Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["when"])(selectionChangePromise).done((function() {
                that._fireSelectionChangeEvent(args.addedItems, args.removedItems)
            }))
        }
    },
    _fireSelectionChangeEvent: function(addedItems, removedItems) {
        this._createActionByOption("onSelectionChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })({
            addedItems: addedItems,
            removedItems: removedItems
        })
    },
    _updateSelection: _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"],
    _setAriaSelected: function($target, value) {
        this.setAria("selected", value, $target)
    },
    _removeSelection: function(normalizedIndex) {
        var $itemElement = this._editStrategy.getItemElement(normalizedIndex);
        if (indexExists(normalizedIndex)) {
            this._processSelectableItem($itemElement, false);
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].triggerHandler($itemElement, "stateChanged", false)
        }
    },
    _addSelection: function(normalizedIndex) {
        var $itemElement = this._editStrategy.getItemElement(normalizedIndex);
        if (indexExists(normalizedIndex)) {
            this._processSelectableItem($itemElement, true);
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].triggerHandler($itemElement, "stateChanged", true)
        }
    },
    _isItemSelected: function(index) {
        var key = this._getKeyByIndex(index);
        return this._selection.isItemSelected(key, {
            checkPending: true
        })
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "selectionMode":
                this._invalidate();
                break;
            case "dataSource":
                if (!args.value || Array.isArray(args.value) && !args.value.length) {
                    this.option("selectedItemKeys", [])
                }
                this.callBase(args);
                break;
            case "selectedIndex":
            case "selectedItem":
            case "selectedItems":
            case "selectedItemKeys":
                this._syncSelectionOptions(args.name).done(() => this._normalizeSelectedItems());
                break;
            case "keyExpr":
                this._initKeyGetter();
                break;
            case "selectionRequired":
                this._normalizeSelectedItems();
                break;
            case "selectionByClick":
            case "onSelectionChanged":
            case "onItemDeleting":
            case "onItemDeleted":
            case "onItemReordered":
            case "maxFilterLengthInRequest":
                break;
            default:
                this.callBase(args)
        }
    },
    _clearSelectedItems: function() {
        this._setOptionWithoutOptionChange("selectedItems", []);
        this._syncSelectionOptions("selectedItems")
    },
    _waitDeletingPrepare: function($itemElement) {
        if ($itemElement.data(ITEM_DELETING_DATA_KEY)) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"]).resolve().promise()
        }
        $itemElement.data(ITEM_DELETING_DATA_KEY, true);
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"];
        var deletingActionArgs = {
            cancel: false
        };
        var deletePromise = this._itemEventHandler($itemElement, "onItemDeleting", deletingActionArgs, {
            excludeValidators: ["disabled", "readOnly"]
        });
        Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["when"])(deletePromise).always(function(value) {
            var deletePromiseExists = !deletePromise;
            var deletePromiseResolved = !deletePromiseExists && "resolved" === deletePromise.state();
            var argumentsSpecified = !!arguments.length;
            var shouldDelete = deletePromiseExists || deletePromiseResolved && !argumentsSpecified || deletePromiseResolved && value;
            Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["when"])(Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["fromPromise"])(deletingActionArgs.cancel)).always((function() {
                $itemElement.data(ITEM_DELETING_DATA_KEY, false)
            })).done((function(cancel) {
                shouldDelete && !cancel ? deferred.resolve() : deferred.reject()
            })).fail(deferred.reject)
        }.bind(this));
        return deferred.promise()
    },
    _deleteItemFromDS: function($item) {
        if (!this._dataSource) {
            return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"]).resolve().promise()
        }
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"];
        var disabledState = this.option("disabled");
        var dataStore = this._dataSource.store();
        this.option("disabled", true);
        if (!dataStore.remove) {
            throw _widget_ui_errors__WEBPACK_IMPORTED_MODULE_3__["default"].Error("E1011")
        }
        dataStore.remove(dataStore.keyOf(this._getItemData($item))).done((function(key) {
            if (void 0 !== key) {
                deferred.resolve()
            } else {
                deferred.reject()
            }
        })).fail((function() {
            deferred.reject()
        }));
        deferred.always(function() {
            this.option("disabled", disabledState)
        }.bind(this));
        return deferred
    },
    _tryRefreshLastPage: function() {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"];
        if (this._isLastPage() || this.option("grouped")) {
            deferred.resolve()
        } else {
            this._refreshLastPage().done((function() {
                deferred.resolve()
            }))
        }
        return deferred.promise()
    },
    _refreshLastPage: function() {
        this._expectLastItemLoading();
        return this._dataSource.load()
    },
    _updateSelectionAfterDelete: function(index) {
        var key = this._getKeyByIndex(index);
        this._selection.deselect([key])
    },
    _updateIndicesAfterIndex: function(index) {
        var itemElements = this._itemElements();
        for (var i = index + 1; i < itemElements.length; i++) {
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(itemElements[i]).data(this._itemIndexKey(), i - 1)
        }
    },
    _simulateOptionChange: function(optionName) {
        var optionValue = this.option(optionName);
        if (optionValue instanceof _data_data_source_data_source__WEBPACK_IMPORTED_MODULE_10__["DataSource"]) {
            return
        }
        this._optionChangedAction({
            name: optionName,
            fullName: optionName,
            value: optionValue
        })
    },
    isItemSelected: function(itemElement) {
        return this._isItemSelected(this._editStrategy.getNormalizedIndex(itemElement))
    },
    selectItem: function(itemElement) {
        if ("none" === this.option("selectionMode")) {
            return
        }
        var itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
        if (!indexExists(itemIndex)) {
            return
        }
        var key = this._getKeyByIndex(itemIndex);
        if (this._selection.isItemSelected(key)) {
            return
        }
        if ("single" === this.option("selectionMode")) {
            return this._selection.setSelection([key])
        } else {
            var selectedItemKeys = this.option("selectedItemKeys") || [];
            return this._selection.setSelection([...selectedItemKeys, key], [key])
        }
    },
    unselectItem: function(itemElement) {
        var itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
        if (!indexExists(itemIndex)) {
            return
        }
        var selectedItemKeys = this._selection.getSelectedItemKeys();
        if (this.option("selectionRequired") && selectedItemKeys.length <= 1) {
            return
        }
        var key = this._getKeyByIndex(itemIndex);
        if (!this._selection.isItemSelected(key, {
                checkPending: true
            })) {
            return
        }
        this._selection.deselect([key])
    },
    _deleteItemElementByIndex: function(index) {
        this._updateSelectionAfterDelete(index);
        this._updateIndicesAfterIndex(index);
        this._editStrategy.deleteItemAtIndex(index)
    },
    _afterItemElementDeleted: function($item, deletedActionArgs) {
        var changingOption = this._dataSource ? "dataSource" : "items";
        this._simulateOptionChange(changingOption);
        this._itemEventHandler($item, "onItemDeleted", deletedActionArgs, {
            beforeExecute: function() {
                $item.remove()
            },
            excludeValidators: ["disabled", "readOnly"]
        });
        this._renderEmptyMessage()
    },
    deleteItem: function(itemElement) {
        var that = this;
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"];
        var $item = this._editStrategy.getItemElement(itemElement);
        var index = this._editStrategy.getNormalizedIndex(itemElement);
        var itemResponseWaitClass = this._itemResponseWaitClass();
        if (indexExists(index)) {
            this._waitDeletingPrepare($item).done((function() {
                $item.addClass(itemResponseWaitClass);
                var deletedActionArgs = that._extendActionArgs($item);
                that._deleteItemFromDS($item).done((function() {
                    that._deleteItemElementByIndex(index);
                    that._afterItemElementDeleted($item, deletedActionArgs);
                    that._tryRefreshLastPage().done((function() {
                        deferred.resolveWith(that)
                    }))
                })).fail((function() {
                    $item.removeClass(itemResponseWaitClass);
                    deferred.rejectWith(that)
                }))
            })).fail((function() {
                deferred.rejectWith(that)
            }))
        } else {
            deferred.rejectWith(that)
        }
        return deferred.promise()
    },
    reorderItem: function(itemElement, toItemElement) {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_13__["Deferred"];
        var that = this;
        var strategy = this._editStrategy;
        var $movingItem = strategy.getItemElement(itemElement);
        var $destinationItem = strategy.getItemElement(toItemElement);
        var movingIndex = strategy.getNormalizedIndex(itemElement);
        var destinationIndex = strategy.getNormalizedIndex(toItemElement);
        var changingOption = this._dataSource ? "dataSource" : "items";
        var canMoveItems = indexExists(movingIndex) && indexExists(destinationIndex) && movingIndex !== destinationIndex;
        if (canMoveItems) {
            deferred.resolveWith(this)
        } else {
            deferred.rejectWith(this)
        }
        return deferred.promise().done((function() {
            $destinationItem[strategy.itemPlacementFunc(movingIndex, destinationIndex)]($movingItem);
            strategy.moveItemAtIndexToIndex(movingIndex, destinationIndex);
            this._updateIndicesAfterIndex(movingIndex);
            that.option("selectedItems", that._getItemsByKeys(that._selection.getSelectedItemKeys(), that._selection.getSelectedItems()));
            if ("items" === changingOption) {
                that._simulateOptionChange(changingOption)
            }
            that._itemEventHandler($movingItem, "onItemReordered", {
                fromIndex: strategy.getIndex(movingIndex),
                toIndex: strategy.getIndex(destinationIndex)
            }, {
                excludeValidators: ["disabled", "readOnly"]
            })
        }))
    }
});
/* harmony default export */ __webpack_exports__["default"] = (CollectionWidget);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.strategy.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.strategy.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/ui/collection/ui.collection_widget.edit.strategy.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var abstract = _core_class__WEBPACK_IMPORTED_MODULE_1__["default"].abstract;
var EditStrategy = _core_class__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    ctor: function(collectionWidget) {
        this._collectionWidget = collectionWidget
    },
    getIndexByItemData: abstract,
    getItemDataByIndex: abstract,
    getKeysByItems: abstract,
    getItemsByKeys: abstract,
    itemsGetter: abstract,
    getKeyByIndex: function(index) {
        var resultIndex = this._denormalizeItemIndex(index);
        return this.getKeysByItems([this.getItemDataByIndex(resultIndex)])[0]
    },
    _equalKeys: function(key1, key2) {
        if (this._collectionWidget._isKeySpecified()) {
            return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_2__["equalByValue"])(key1, key2)
        } else {
            return key1 === key2
        }
    },
    beginCache: function() {
        this._cache = {}
    },
    endCache: function() {
        this._cache = null
    },
    getIndexByKey: abstract,
    getNormalizedIndex: function(value) {
        if (this._isNormalizedItemIndex(value)) {
            return value
        }
        if (this._isItemIndex(value)) {
            return this._normalizeItemIndex(value)
        }
        if (this._isNode(value)) {
            return this._getNormalizedItemIndex(value)
        }
        return this._normalizeItemIndex(this.getIndexByItemData(value))
    },
    getIndex: function(value) {
        if (this._isNormalizedItemIndex(value)) {
            return this._denormalizeItemIndex(value)
        }
        if (this._isItemIndex(value)) {
            return value
        }
        if (this._isNode(value)) {
            return this._denormalizeItemIndex(this._getNormalizedItemIndex(value))
        }
        return this.getIndexByItemData(value)
    },
    getItemElement: function(value) {
        if (this._isNormalizedItemIndex(value)) {
            return this._getItemByNormalizedIndex(value)
        }
        if (this._isItemIndex(value)) {
            return this._getItemByNormalizedIndex(this._normalizeItemIndex(value))
        }
        if (this._isNode(value)) {
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(value)
        }
        var normalizedItemIndex = this._normalizeItemIndex(this.getIndexByItemData(value));
        return this._getItemByNormalizedIndex(normalizedItemIndex)
    },
    _isNode: el => _core_dom_adapter__WEBPACK_IMPORTED_MODULE_3__["default"].isNode(el && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isRenderer"])(el) ? el.get(0) : el),
    deleteItemAtIndex: abstract,
    itemPlacementFunc: function(movingIndex, destinationIndex) {
        return this._itemsFromSameParent(movingIndex, destinationIndex) && movingIndex < destinationIndex ? "after" : "before"
    },
    moveItemAtIndexToIndex: abstract,
    _isNormalizedItemIndex: function(index) {
        return "number" === typeof index && Math.round(index) === index
    },
    _isItemIndex: abstract,
    _getNormalizedItemIndex: abstract,
    _normalizeItemIndex: abstract,
    _denormalizeItemIndex: abstract,
    _getItemByNormalizedIndex: abstract,
    _itemsFromSameParent: abstract
});
/* harmony default export */ __webpack_exports__["default"] = (EditStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.strategy.plain.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.strategy.plain.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _ui_collection_widget_edit_strategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.collection_widget.edit.strategy */ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.strategy.js");
/**
 * DevExtreme (esm/ui/collection/ui.collection_widget.edit.strategy.plain.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var PlainEditStrategy = _ui_collection_widget_edit_strategy__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    _getPlainItems: function() {
        return this._collectionWidget.option("items") || []
    },
    getIndexByItemData: function(itemData) {
        var keyOf = this._collectionWidget.keyOf.bind(this._collectionWidget);
        if (keyOf) {
            return this.getIndexByKey(keyOf(itemData))
        } else {
            return Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_0__["inArray"])(itemData, this._getPlainItems())
        }
    },
    getItemDataByIndex: function(index) {
        return this._getPlainItems()[index]
    },
    deleteItemAtIndex: function(index) {
        this._getPlainItems().splice(index, 1)
    },
    itemsGetter: function() {
        return this._getPlainItems()
    },
    getKeysByItems: function(items) {
        var keyOf = this._collectionWidget.keyOf.bind(this._collectionWidget);
        var result = items;
        if (keyOf) {
            result = [];
            for (var i = 0; i < items.length; i++) {
                result.push(keyOf(items[i]))
            }
        }
        return result
    },
    getIndexByKey: function(key) {
        var cache = this._cache;
        var keys = cache && cache.keys || this.getKeysByItems(this._getPlainItems());
        if (cache && !cache.keys) {
            cache.keys = keys
        }
        if ("object" === typeof key) {
            for (var i = 0, length = keys.length; i < length; i++) {
                if (this._equalKeys(key, keys[i])) {
                    return i
                }
            }
        } else {
            return keys.indexOf(key)
        }
        return -1
    },
    getItemsByKeys: function(keys, items) {
        return (items || keys).slice()
    },
    moveItemAtIndexToIndex: function(movingIndex, destinationIndex) {
        var items = this._getPlainItems();
        var movedItemData = items[movingIndex];
        items.splice(movingIndex, 1);
        items.splice(destinationIndex, 0, movedItemData)
    },
    _isItemIndex: function(index) {
        return "number" === typeof index && Math.round(index) === index
    },
    _getNormalizedItemIndex: function(itemElement) {
        return this._collectionWidget._itemElements().index(itemElement)
    },
    _normalizeItemIndex: function(index) {
        return index
    },
    _denormalizeItemIndex: function(index) {
        return index
    },
    _getItemByNormalizedIndex: function(index) {
        return index > -1 ? this._collectionWidget._itemElements().eq(index) : null
    },
    _itemsFromSameParent: function() {
        return true
    }
});
/* harmony default export */ __webpack_exports__["default"] = (PlainEditStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/popup.js":
/*!*************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/popup.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popup_ui_popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup/ui.popup */ "./node_modules/devextreme/esm/ui/popup/ui.popup.js");
/**
 * DevExtreme (esm/ui/popup.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

/* harmony default export */ __webpack_exports__["default"] = (_popup_ui_popup__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/popup/popup_position_controller.js":
/*!***************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/popup/popup_position_controller.js ***!
  \***************************************************************************/
/*! exports provided: PopupPositionController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupPositionController", function() { return PopupPositionController; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _animation_translator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../animation/translator */ "./node_modules/devextreme/esm/animation/translator.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _overlay_overlay_position_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../overlay/overlay_position_controller */ "./node_modules/devextreme/esm/ui/overlay/overlay_position_controller.js");
/**
 * DevExtreme (esm/ui/popup/popup_position_controller.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["fullScreen", "forceApplyBindings"];




var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_4__["getWindow"])();
class PopupPositionController extends _overlay_overlay_position_controller__WEBPACK_IMPORTED_MODULE_5__["OverlayPositionController"] {
    constructor(_ref) {
        var {
            fullScreen: fullScreen,
            forceApplyBindings: forceApplyBindings
        } = _ref, args = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
        super(args);
        this._props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this._props, {
            fullScreen: fullScreen,
            forceApplyBindings: forceApplyBindings
        });
        this._lastPositionBeforeFullScreen = void 0
    }
    set fullScreen(fullScreen) {
        this._props.fullScreen = fullScreen;
        if (fullScreen) {
            this._fullScreenEnabled()
        } else {
            this._fullScreenDisabled()
        }
    }
    positionContent() {
        if (this._props.fullScreen) {
            Object(_animation_translator__WEBPACK_IMPORTED_MODULE_3__["move"])(this._$content, {
                top: 0,
                left: 0
            });
            this.detectVisualPositionChange()
        } else {
            var _this$_props$forceApp, _this$_props;
            null === (_this$_props$forceApp = (_this$_props = this._props).forceApplyBindings) || void 0 === _this$_props$forceApp ? void 0 : _this$_props$forceApp.call(_this$_props);
            if (!this._shouldRenderContentInitialPosition && this._lastPositionBeforeFullScreen) {
                Object(_animation_translator__WEBPACK_IMPORTED_MODULE_3__["move"])(this._$content, this._lastPositionBeforeFullScreen);
                this._lastPositionBeforeFullScreen = void 0;
                this.detectVisualPositionChange()
            } else {
                super.positionContent()
            }
        }
    }
    _getWrapperCoveredElement() {
        if (this._props.fullScreen) {
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_2__["default"])(window)
        }
        return super._getWrapperCoveredElement()
    }
    _fullScreenEnabled() {
        this.restorePositionOnNextRender(false);
        this._lastPositionBeforeFullScreen = this._visualPosition
    }
    _fullScreenDisabled() {
        this.restorePositionOnNextRender(false)
    }
}



/***/ }),

/***/ "./node_modules/devextreme/esm/ui/popup/ui.popup.js":
/*!**********************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/popup/ui.popup.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_templates_empty_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/templates/empty_template */ "./node_modules/devextreme/esm/core/templates/empty_template.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/browser */ "./node_modules/devextreme/esm/core/utils/browser.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_inflector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/inflector */ "./node_modules/devextreme/esm/core/utils/inflector.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_utils_position__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/utils/position */ "./node_modules/devextreme/esm/core/utils/position.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_version__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../core/utils/version */ "./node_modules/devextreme/esm/core/utils/version.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _events_visibility_change__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../events/visibility_change */ "./node_modules/devextreme/esm/events/visibility_change.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../button */ "./node_modules/devextreme/esm/ui/button.js");
/* harmony import */ var _overlay_ui_overlay__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../overlay/ui.overlay */ "./node_modules/devextreme/esm/ui/overlay/ui.overlay.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../themes */ "./node_modules/devextreme/esm/ui/themes.js");
/* harmony import */ var _toolbar_ui_toolbar_base__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../toolbar/ui.toolbar.base */ "./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.base.js");
/* harmony import */ var _popup_position_controller__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./popup_position_controller */ "./node_modules/devextreme/esm/ui/popup/popup_position_controller.js");
/**
 * DevExtreme (esm/ui/popup/ui.popup.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */























var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_15__["getWindow"])();
var POPUP_CLASS = "dx-popup";
var POPUP_WRAPPER_CLASS = "dx-popup-wrapper";
var POPUP_FULL_SCREEN_CLASS = "dx-popup-fullscreen";
var POPUP_FULL_SCREEN_WIDTH_CLASS = "dx-popup-fullscreen-width";
var POPUP_NORMAL_CLASS = "dx-popup-normal";
var POPUP_CONTENT_CLASS = "dx-popup-content";
var DISABLED_STATE_CLASS = "dx-state-disabled";
var POPUP_DRAGGABLE_CLASS = "dx-popup-draggable";
var POPUP_TITLE_CLASS = "dx-popup-title";
var POPUP_TITLE_CLOSEBUTTON_CLASS = "dx-closebutton";
var POPUP_BOTTOM_CLASS = "dx-popup-bottom";
var POPUP_HAS_CLOSE_BUTTON_CLASS = "dx-has-close-button";
var TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
var POPUP_CONTENT_FLEX_HEIGHT_CLASS = "dx-popup-flex-height";
var POPUP_CONTENT_INHERIT_HEIGHT_CLASS = "dx-popup-inherit-height";
var ALLOWED_TOOLBAR_ITEM_ALIASES = ["cancel", "clear", "done"];
var BUTTON_DEFAULT_TYPE = "default";
var BUTTON_NORMAL_TYPE = "normal";
var BUTTON_TEXT_MODE = "text";
var BUTTON_CONTAINED_MODE = "contained";
var IS_OLD_SAFARI = _core_utils_browser__WEBPACK_IMPORTED_MODULE_6__["default"].safari && Object(_core_utils_version__WEBPACK_IMPORTED_MODULE_14__["compare"])(_core_utils_browser__WEBPACK_IMPORTED_MODULE_6__["default"].version, [11]) < 0;
var HEIGHT_STRATEGIES = {
    static: "",
    inherit: POPUP_CONTENT_INHERIT_HEIGHT_CLASS,
    flex: POPUP_CONTENT_FLEX_HEIGHT_CLASS
};
var getButtonPlace = name => {
    var device = _core_devices__WEBPACK_IMPORTED_MODULE_1__["default"].current();
    var platform = device.platform;
    var toolbar = "bottom";
    var location = "before";
    if ("ios" === platform) {
        switch (name) {
            case "cancel":
                toolbar = "top";
                break;
            case "clear":
                toolbar = "top";
                location = "after";
                break;
            case "done":
                location = "after"
        }
    } else if ("android" === platform && device.version && parseInt(device.version[0]) > 4) {
        switch (name) {
            case "cancel":
            case "done":
                location = "after"
        }
    }
    return {
        toolbar: toolbar,
        location: location
    }
};
var Popup = _overlay_ui_overlay__WEBPACK_IMPORTED_MODULE_19__["default"].inherit({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_8__["extend"])(this.callBase(), {
            fullScreen: false,
            title: "",
            showTitle: true,
            titleTemplate: "title",
            onTitleRendered: null,
            dragEnabled: false,
            toolbarItems: [],
            showCloseButton: false,
            bottomTemplate: "bottom",
            useDefaultToolbarButtons: false,
            useFlatToolbarButtons: false,
            autoResizeEnabled: true
        })
    },
    _defaultOptionsRules: function() {
        var themeName = Object(_themes__WEBPACK_IMPORTED_MODULE_20__["current"])();
        return this.callBase().concat([{
            device: {
                platform: "ios"
            },
            options: {
                animation: this._iosAnimation
            }
        }, {
            device: {
                platform: "android"
            },
            options: {
                animation: this._androidAnimation
            }
        }, {
            device: {
                platform: "generic"
            },
            options: {
                showCloseButton: true
            }
        }, {
            device: function(_device) {
                return "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_1__["default"].real().deviceType && "generic" === _device.platform
            },
            options: {
                dragEnabled: true
            }
        }, {
            device: function() {
                return "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_1__["default"].real().deviceType && !_core_devices__WEBPACK_IMPORTED_MODULE_1__["default"].isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return Object(_themes__WEBPACK_IMPORTED_MODULE_20__["isMaterial"])(themeName)
            },
            options: {
                useDefaultToolbarButtons: true,
                useFlatToolbarButtons: true,
                showCloseButton: false
            }
        }])
    },
    _iosAnimation: {
        show: {
            type: "slide",
            duration: 400,
            from: {
                position: {
                    my: "top",
                    at: "bottom"
                }
            },
            to: {
                position: {
                    my: "center",
                    at: "center"
                }
            }
        },
        hide: {
            type: "slide",
            duration: 400,
            from: {
                opacity: 1,
                position: {
                    my: "center",
                    at: "center"
                }
            },
            to: {
                opacity: 1,
                position: {
                    my: "top",
                    at: "bottom"
                }
            }
        }
    },
    _androidAnimation: function() {
        return this.option("fullScreen") ? {
            show: {
                type: "slide",
                duration: 300,
                from: {
                    top: "30%",
                    opacity: 0
                },
                to: {
                    top: 0,
                    opacity: 1
                }
            },
            hide: {
                type: "slide",
                duration: 300,
                from: {
                    top: 0,
                    opacity: 1
                },
                to: {
                    top: "30%",
                    opacity: 0
                }
            }
        } : {
            show: {
                type: "fade",
                duration: 400,
                from: 0,
                to: 1
            },
            hide: {
                type: "fade",
                duration: 400,
                from: 1,
                to: 0
            }
        }
    },
    _init: function() {
        this.callBase();
        this.$element().addClass(POPUP_CLASS);
        this.$wrapper().addClass(POPUP_WRAPPER_CLASS);
        this._$popupContent = this._$content.wrapInner(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])("<div>").addClass(POPUP_CONTENT_CLASS)).children().eq(0)
    },
    _render: function() {
        var isFullscreen = this.option("fullScreen");
        this._toggleFullScreenClass(isFullscreen);
        this.callBase()
    },
    _toggleFullScreenClass: function(value) {
        this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_CLASS, value).toggleClass(POPUP_NORMAL_CLASS, !value)
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            title: new _core_templates_empty_template__WEBPACK_IMPORTED_MODULE_4__["EmptyTemplate"],
            bottom: new _core_templates_empty_template__WEBPACK_IMPORTED_MODULE_4__["EmptyTemplate"]
        })
    },
    _renderContentImpl: function() {
        this._renderTitle();
        this.callBase();
        this._renderBottom()
    },
    _renderTitle: function() {
        var items = this._getToolbarItems("top");
        var titleText = this.option("title");
        var showTitle = this.option("showTitle");
        if (showTitle && !!titleText) {
            items.unshift({
                location: _core_devices__WEBPACK_IMPORTED_MODULE_1__["default"].current().ios ? "center" : "before",
                text: titleText
            })
        }
        if (showTitle || items.length > 0) {
            this._$title && this._$title.remove();
            var $title = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])("<div>").addClass(POPUP_TITLE_CLASS).insertBefore(this.$content());
            this._$title = this._renderTemplateByType("titleTemplate", items, $title).addClass(POPUP_TITLE_CLASS);
            this._renderDrag();
            this._executeTitleRenderAction(this._$title);
            this._$title.toggleClass(POPUP_HAS_CLOSE_BUTTON_CLASS, this._hasCloseButton())
        } else if (this._$title) {
            this._$title.detach()
        }
    },
    _renderTemplateByType: function(optionName, data, $container, additionalToolbarOptions) {
        var {
            rtlEnabled: rtlEnabled,
            useDefaultToolbarButtons: useDefaultToolbarButtons,
            useFlatToolbarButtons: useFlatToolbarButtons,
            disabled: disabled
        } = this.option();
        var template = this._getTemplateByOption(optionName);
        var toolbarTemplate = template instanceof _core_templates_empty_template__WEBPACK_IMPORTED_MODULE_4__["EmptyTemplate"];
        if (toolbarTemplate) {
            var integrationOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_8__["extend"])({}, this.option("integrationOptions"), {
                skipTemplates: ["content", "title"]
            });
            var toolbarOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_8__["extend"])(additionalToolbarOptions, {
                items: data,
                rtlEnabled: rtlEnabled,
                useDefaultButtons: useDefaultToolbarButtons,
                useFlatButtons: useFlatToolbarButtons,
                disabled: disabled,
                integrationOptions: integrationOptions
            });
            this._getTemplate("dx-polymorph-widget").render({
                container: $container,
                model: {
                    widget: "dxToolbarBase",
                    options: toolbarOptions
                }
            });
            var $toolbar = $container.children("div");
            $container.replaceWith($toolbar);
            return $toolbar
        } else {
            var $result = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])(template.render({
                container: Object(_core_element__WEBPACK_IMPORTED_MODULE_2__["getPublicElement"])($container)
            }));
            if ($result.hasClass(TEMPLATE_WRAPPER_CLASS)) {
                $container.replaceWith($result);
                $container = $result
            }
            return $container
        }
    },
    _executeTitleRenderAction: function($titleElement) {
        this._getTitleRenderAction()({
            titleElement: Object(_core_element__WEBPACK_IMPORTED_MODULE_2__["getPublicElement"])($titleElement)
        })
    },
    _getTitleRenderAction: function() {
        return this._titleRenderAction || this._createTitleRenderAction()
    },
    _createTitleRenderAction: function() {
        return this._titleRenderAction = this._createActionByOption("onTitleRendered", {
            element: this.element(),
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _getCloseButton: function() {
        return {
            toolbar: "top",
            location: "after",
            template: this._getCloseButtonRenderer()
        }
    },
    _getCloseButtonRenderer: function() {
        return (_, __, container) => {
            var $button = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])("<div>").addClass(POPUP_TITLE_CLOSEBUTTON_CLASS);
            this._createComponent($button, _button__WEBPACK_IMPORTED_MODULE_18__["default"], {
                icon: "close",
                onClick: this._createToolbarItemAction(void 0),
                stylingMode: "text",
                integrationOptions: {}
            });
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])(container).append($button)
        }
    },
    _getToolbarItems: function(toolbar) {
        var toolbarItems = this.option("toolbarItems");
        var toolbarsItems = [];
        this._toolbarItemClasses = [];
        var currentPlatform = _core_devices__WEBPACK_IMPORTED_MODULE_1__["default"].current().platform;
        var index = 0;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_10__["each"])(toolbarItems, (_, data) => {
            var isShortcut = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_13__["isDefined"])(data.shortcut);
            var item = isShortcut ? getButtonPlace(data.shortcut) : data;
            if (isShortcut && "ios" === currentPlatform && index < 2) {
                item.toolbar = "top";
                index++
            }
            item.toolbar = data.toolbar || item.toolbar || "top";
            if (item && item.toolbar === toolbar) {
                if (isShortcut) {
                    Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_8__["extend"])(item, {
                        location: data.location
                    }, this._getToolbarItemByAlias(data))
                }
                var isLTROrder = "generic" === currentPlatform;
                if ("done" === data.shortcut && isLTROrder || "cancel" === data.shortcut && !isLTROrder) {
                    toolbarsItems.unshift(item)
                } else {
                    toolbarsItems.push(item)
                }
            }
        });
        if ("top" === toolbar && this._hasCloseButton()) {
            toolbarsItems.push(this._getCloseButton())
        }
        return toolbarsItems
    },
    _hasCloseButton() {
        return this.option("showCloseButton") && this.option("showTitle")
    },
    _getLocalizationKey: itemType => "done" === itemType.toLowerCase() ? "OK" : Object(_core_utils_inflector__WEBPACK_IMPORTED_MODULE_9__["camelize"])(itemType, true),
    _getToolbarItemByAlias: function(data) {
        var that = this;
        var itemType = data.shortcut;
        if (Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_5__["inArray"])(itemType, ALLOWED_TOOLBAR_ITEM_ALIASES) < 0) {
            return false
        }
        var itemConfig = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_8__["extend"])({
            text: _localization_message__WEBPACK_IMPORTED_MODULE_17__["default"].format(this._getLocalizationKey(itemType)),
            onClick: this._createToolbarItemAction(data.onClick),
            integrationOptions: {},
            type: that.option("useDefaultToolbarButtons") ? BUTTON_DEFAULT_TYPE : BUTTON_NORMAL_TYPE,
            stylingMode: that.option("useFlatToolbarButtons") ? BUTTON_TEXT_MODE : BUTTON_CONTAINED_MODE
        }, data.options || {});
        var itemClass = POPUP_CLASS + "-" + itemType;
        this._toolbarItemClasses.push(itemClass);
        return {
            template: function(_, __, container) {
                var $toolbarItem = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])("<div>").addClass(itemClass).appendTo(container);
                that._createComponent($toolbarItem, _button__WEBPACK_IMPORTED_MODULE_18__["default"], itemConfig)
            }
        }
    },
    _createToolbarItemAction: function(clickAction) {
        return this._createAction(clickAction, {
            afterExecute: function(e) {
                e.component.hide()
            }
        })
    },
    _renderBottom: function() {
        var items = this._getToolbarItems("bottom");
        if (items.length) {
            this._$bottom && this._$bottom.remove();
            var $bottom = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])("<div>").addClass(POPUP_BOTTOM_CLASS).insertAfter(this.$content());
            this._$bottom = this._renderTemplateByType("bottomTemplate", items, $bottom, {
                compactMode: true
            }).addClass(POPUP_BOTTOM_CLASS);
            this._toggleClasses()
        } else {
            this._$bottom && this._$bottom.detach()
        }
    },
    _toggleDisabledState: function(value) {
        this.callBase(...arguments);
        this.$content().toggleClass(DISABLED_STATE_CLASS, Boolean(value))
    },
    _toggleClasses: function() {
        var aliases = ALLOWED_TOOLBAR_ITEM_ALIASES;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_10__["each"])(aliases, (_, alias) => {
            var className = POPUP_CLASS + "-" + alias;
            if (Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_5__["inArray"])(className, this._toolbarItemClasses) >= 0) {
                this.$wrapper().addClass(className + "-visible");
                this._$bottom.addClass(className)
            } else {
                this.$wrapper().removeClass(className + "-visible");
                this._$bottom.removeClass(className)
            }
        })
    },
    _getPositionControllerConfig() {
        var {
            fullScreen: fullScreen,
            forceApplyBindings: forceApplyBindings
        } = this.option();
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_8__["extend"])({}, this.callBase(), {
            fullScreen: fullScreen,
            forceApplyBindings: forceApplyBindings
        })
    },
    _initPositionController() {
        this._positionController = new _popup_position_controller__WEBPACK_IMPORTED_MODULE_22__["PopupPositionController"](this._getPositionControllerConfig())
    },
    _getDragTarget: function() {
        return this.topToolbar()
    },
    _renderGeometryImpl: function() {
        this._resetContentHeight();
        this.callBase();
        this._setContentHeight()
    },
    _resetContentHeight: function() {
        var height = this._getOptionValue("height");
        if ("auto" === height) {
            this.$content().css({
                height: "auto",
                maxHeight: "none"
            })
        }
    },
    _renderDrag: function() {
        this.callBase();
        this.$overlayContent().toggleClass(POPUP_DRAGGABLE_CLASS, this.option("dragEnabled"))
    },
    _renderResize: function() {
        this.callBase();
        this._resizable.option("onResize", e => {
            this._setContentHeight();
            this._actions.onResize(e)
        })
    },
    _setContentHeight: function() {
        (this.option("forceApplyBindings") || _core_utils_common__WEBPACK_IMPORTED_MODULE_7__["noop"])();
        var overlayContent = this.$overlayContent().get(0);
        var currentHeightStrategyClass = this._chooseHeightStrategy(overlayContent);
        this.$content().css(this._getHeightCssStyles(currentHeightStrategyClass, overlayContent));
        this._setHeightClasses(this.$overlayContent(), currentHeightStrategyClass)
    },
    _heightStrategyChangeOffset: function(currentHeightStrategyClass, popupVerticalPaddings) {
        return currentHeightStrategyClass === HEIGHT_STRATEGIES.flex ? -popupVerticalPaddings : 0
    },
    _chooseHeightStrategy: function(overlayContent) {
        var isAutoWidth = "auto" === overlayContent.style.width || "" === overlayContent.style.width;
        var currentHeightStrategyClass = HEIGHT_STRATEGIES.static;
        if (this._isAutoHeight() && this.option("autoResizeEnabled")) {
            if (isAutoWidth || IS_OLD_SAFARI) {
                currentHeightStrategyClass = HEIGHT_STRATEGIES.inherit
            } else {
                currentHeightStrategyClass = HEIGHT_STRATEGIES.flex
            }
        }
        return currentHeightStrategyClass
    },
    _getHeightCssStyles: function(currentHeightStrategyClass, overlayContent) {
        var cssStyles = {};
        var contentMaxHeight = this._getOptionValue("maxHeight", overlayContent);
        var contentMinHeight = this._getOptionValue("minHeight", overlayContent);
        var popupHeightParts = this._splitPopupHeight();
        var toolbarsAndVerticalOffsetsHeight = popupHeightParts.header + popupHeightParts.footer + popupHeightParts.contentVerticalOffsets + popupHeightParts.popupVerticalOffsets + this._heightStrategyChangeOffset(currentHeightStrategyClass, popupHeightParts.popupVerticalPaddings);
        if (currentHeightStrategyClass === HEIGHT_STRATEGIES.static) {
            if (!this._isAutoHeight() || contentMaxHeight || contentMinHeight) {
                var overlayHeight = this.option("fullScreen") ? Math.min(Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_12__["getBoundingRect"])(overlayContent).height, Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_15__["getWindow"])().innerHeight) : Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_12__["getBoundingRect"])(overlayContent).height;
                var contentHeight = overlayHeight - toolbarsAndVerticalOffsetsHeight;
                cssStyles = {
                    height: Math.max(0, contentHeight),
                    minHeight: "auto",
                    maxHeight: "auto"
                }
            }
        } else {
            var container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_3__["default"])(this._positionController._$wrapperCoveredElement).get(0);
            var maxHeightValue = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_11__["addOffsetToMaxHeight"])(contentMaxHeight, -toolbarsAndVerticalOffsetsHeight, container);
            var minHeightValue = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_11__["addOffsetToMinHeight"])(contentMinHeight, -toolbarsAndVerticalOffsetsHeight, container);
            cssStyles = {
                height: "auto",
                minHeight: minHeightValue,
                maxHeight: maxHeightValue
            }
        }
        return cssStyles
    },
    _setHeightClasses: function($container, currentClass) {
        var excessClasses = "";
        for (var name in HEIGHT_STRATEGIES) {
            if (HEIGHT_STRATEGIES[name] !== currentClass) {
                excessClasses += " " + HEIGHT_STRATEGIES[name]
            }
        }
        $container.removeClass(excessClasses).addClass(currentClass)
    },
    _isAutoHeight: function() {
        return "auto" === this.$overlayContent().get(0).style.height
    },
    _splitPopupHeight: function() {
        var topToolbar = this.topToolbar();
        var bottomToolbar = this.bottomToolbar();
        return {
            header: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_11__["getVisibleHeight"])(topToolbar && topToolbar.get(0)),
            footer: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_11__["getVisibleHeight"])(bottomToolbar && bottomToolbar.get(0)),
            contentVerticalOffsets: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_11__["getVerticalOffsets"])(this.$overlayContent().get(0), true),
            popupVerticalOffsets: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_11__["getVerticalOffsets"])(this.$content().get(0), true),
            popupVerticalPaddings: Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_11__["getVerticalOffsets"])(this.$content().get(0), false)
        }
    },
    _isAllWindowCovered: function() {
        return this.callBase() || this.option("fullScreen")
    },
    _renderDimensions: function() {
        if (this.option("fullScreen")) {
            this.$overlayContent().css({
                width: "100%",
                height: "100%",
                minWidth: "",
                maxWidth: "",
                minHeight: "",
                maxHeight: ""
            })
        } else {
            this.callBase()
        }
        if (Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_15__["hasWindow"])()) {
            this._renderFullscreenWidthClass()
        }
    },
    _renderFullscreenWidthClass: function() {
        this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_WIDTH_CLASS, Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_11__["getOuterWidth"])(this.$overlayContent()) === Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_11__["getWidth"])(window))
    },
    refreshPosition: function() {
        this._renderPosition()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "disabled":
                this.callBase(args);
                this._renderTitle();
                this._renderBottom();
                break;
            case "showTitle":
            case "title":
            case "titleTemplate":
                this._renderTitle();
                this._renderGeometry();
                Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_16__["triggerResizeEvent"])(this.$overlayContent());
                break;
            case "bottomTemplate":
                this._renderBottom();
                this._renderGeometry();
                Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_16__["triggerResizeEvent"])(this.$overlayContent());
                break;
            case "onTitleRendered":
                this._createTitleRenderAction(args.value);
                break;
            case "toolbarItems":
            case "useDefaultToolbarButtons":
            case "useFlatToolbarButtons":
                var shouldRenderGeometry = !args.fullName.match(/^toolbarItems((\[\d+\])(\.(options|visible).*)?)?$/);
                this._renderTitle();
                this._renderBottom();
                if (shouldRenderGeometry) {
                    this._renderGeometry();
                    Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_16__["triggerResizeEvent"])(this.$overlayContent())
                }
                break;
            case "dragEnabled":
                this._renderDrag();
                break;
            case "autoResizeEnabled":
                this._renderGeometry();
                Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_16__["triggerResizeEvent"])(this.$overlayContent());
                break;
            case "fullScreen":
                this._positionController.fullScreen = args.value;
                this._toggleFullScreenClass(args.value);
                this._toggleSafariScrolling();
                this._renderGeometry();
                Object(_events_visibility_change__WEBPACK_IMPORTED_MODULE_16__["triggerResizeEvent"])(this.$overlayContent());
                break;
            case "showCloseButton":
                this._renderTitle();
                break;
            default:
                this.callBase(args)
        }
    },
    bottomToolbar: function() {
        return this._$bottom
    },
    topToolbar: function() {
        return this._$title
    },
    $content: function() {
        return this._$popupContent
    },
    content: function() {
        return Object(_core_element__WEBPACK_IMPORTED_MODULE_2__["getPublicElement"])(this.$content())
    },
    $overlayContent: function() {
        return this._$content
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_0__["default"])("dxPopup", Popup);
/* harmony default export */ __webpack_exports__["default"] = (Popup);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/selection/selection.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/selection/selection.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _selection_strategy_deferred__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selection.strategy.deferred */ "./node_modules/devextreme/esm/ui/selection/selection.strategy.deferred.js");
/* harmony import */ var _selection_strategy_standard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selection.strategy.standard */ "./node_modules/devextreme/esm/ui/selection/selection.strategy.standard.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/ui/selection/selection.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







/* harmony default export */ __webpack_exports__["default"] = (_core_class__WEBPACK_IMPORTED_MODULE_0__["default"].inherit({
    ctor: function(options) {
        this.options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(this._getDefaultOptions(), options, {
            selectedItemKeys: options.selectedKeys || []
        });
        this._selectionStrategy = this.options.deferred ? new _selection_strategy_deferred__WEBPACK_IMPORTED_MODULE_1__["default"](this.options) : new _selection_strategy_standard__WEBPACK_IMPORTED_MODULE_2__["default"](this.options);
        this._focusedItemIndex = -1;
        if (!this.options.equalByReference) {
            this._selectionStrategy.updateSelectedItemKeyHash(this.options.selectedItemKeys)
        }
    },
    _getDefaultOptions: function() {
        return {
            allowNullValue: false,
            deferred: false,
            equalByReference: false,
            mode: "multiple",
            selectedItems: [],
            selectionFilter: [],
            maxFilterLengthInRequest: 0,
            onSelectionChanged: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
            key: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
            keyOf: function(item) {
                return item
            },
            load: function() {
                return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["Deferred"]).resolve([])
            },
            totalCount: function() {
                return -1
            },
            isSelectableItem: function() {
                return true
            },
            isItemSelected: function() {
                return false
            },
            getItemData: function(item) {
                return item
            },
            dataFields: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"],
            filter: _core_utils_common__WEBPACK_IMPORTED_MODULE_4__["noop"]
        }
    },
    validate: function() {
        this._selectionStrategy.validate()
    },
    getSelectedItemKeys: function() {
        return this._selectionStrategy.getSelectedItemKeys()
    },
    getSelectedItems: function() {
        return this._selectionStrategy.getSelectedItems()
    },
    selectionFilter: function(value) {
        if (void 0 === value) {
            return this.options.selectionFilter
        }
        var filterIsChanged = this.options.selectionFilter !== value && JSON.stringify(this.options.selectionFilter) !== JSON.stringify(value);
        this.options.selectionFilter = value;
        filterIsChanged && this.onSelectionChanged()
    },
    setSelection: function(keys, updatedKeys) {
        return this.selectedItemKeys(keys, false, false, false, updatedKeys)
    },
    select: function(keys) {
        return this.selectedItemKeys(keys, true)
    },
    deselect: function(keys) {
        return this.selectedItemKeys(keys, true, true)
    },
    selectedItemKeys: function(keys, preserve, isDeselect, isSelectAll, updatedKeys) {
        var _keys;
        keys = null !== (_keys = keys) && void 0 !== _keys ? _keys : [];
        keys = Array.isArray(keys) ? keys : [keys];
        this.validate();
        return this._selectionStrategy.selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys)
    },
    clearSelection: function() {
        return this.selectedItemKeys([])
    },
    _addSelectedItem: function(itemData, key) {
        this._selectionStrategy.addSelectedItem(key, itemData)
    },
    _removeSelectedItem: function(key) {
        this._selectionStrategy.removeSelectedItem(key)
    },
    _setSelectedItems: function(keys, items) {
        this._selectionStrategy.setSelectedItems(keys, items)
    },
    onSelectionChanged: function() {
        this._selectionStrategy.onSelectionChanged()
    },
    changeItemSelection: function(itemIndex, keys, setFocusOnly) {
        var _this$options$allowLo, _this$options;
        var isSelectedItemsChanged;
        var items = this.options.plainItems();
        var item = items[itemIndex];
        var deferred;
        var allowLoadByRange = null === (_this$options$allowLo = (_this$options = this.options).allowLoadByRange) || void 0 === _this$options$allowLo ? void 0 : _this$options$allowLo.call(_this$options);
        var indexOffset;
        var focusedItemNotInLoadedRange = false;
        if (allowLoadByRange) {
            indexOffset = item.loadIndex - itemIndex;
            itemIndex = item.loadIndex;
            focusedItemNotInLoadedRange = this._focusedItemIndex >= 0 && !items.filter(it => it.loadIndex === this._focusedItemIndex).length
        }
        if (!this.isSelectable() || !this.isDataItem(item)) {
            return false
        }
        var itemData = this.options.getItemData(item);
        var itemKey = this.options.keyOf(itemData);
        keys = keys || {};
        if (keys.shift && "multiple" === this.options.mode && this._focusedItemIndex >= 0) {
            if (focusedItemNotInLoadedRange) {
                isSelectedItemsChanged = itemIndex !== this._shiftFocusedItemIndex || this._focusedItemIndex !== this._shiftFocusedItemIndex;
                if (isSelectedItemsChanged) {
                    deferred = this.changeItemSelectionWhenShiftKeyInVirtualPaging(itemIndex)
                }
            } else {
                isSelectedItemsChanged = this.changeItemSelectionWhenShiftKeyPressed(itemIndex, items, indexOffset)
            }
        } else if (keys.control) {
            this._resetItemSelectionWhenShiftKeyPressed();
            if (!setFocusOnly) {
                var isSelected = this._selectionStrategy.isItemDataSelected(itemData);
                if ("single" === this.options.mode) {
                    this.clearSelectedItems()
                }
                if (isSelected) {
                    this._removeSelectedItem(itemKey)
                } else {
                    this._addSelectedItem(itemData, itemKey)
                }
            }
            isSelectedItemsChanged = true
        } else {
            this._resetItemSelectionWhenShiftKeyPressed();
            var isKeysEqual = this._selectionStrategy.equalKeys(this.options.selectedItemKeys[0], itemKey);
            if (1 !== this.options.selectedItemKeys.length || !isKeysEqual) {
                this._setSelectedItems([itemKey], [itemData]);
                isSelectedItemsChanged = true
            }
        }
        if (isSelectedItemsChanged) {
            Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["when"])(deferred).done(() => {
                this._focusedItemIndex = itemIndex;
                !setFocusOnly && this.onSelectionChanged()
            });
            return true
        }
    },
    isDataItem: function(item) {
        return this.options.isSelectableItem(item)
    },
    isSelectable: function() {
        return "single" === this.options.mode || "multiple" === this.options.mode
    },
    isItemDataSelected: function(data) {
        return this._selectionStrategy.isItemDataSelected(data, {
            checkPending: true
        })
    },
    isItemSelected: function(arg, options) {
        return this._selectionStrategy.isItemKeySelected(arg, options)
    },
    _resetItemSelectionWhenShiftKeyPressed: function() {
        delete this._shiftFocusedItemIndex
    },
    _resetFocusedItemIndex: function() {
        this._focusedItemIndex = -1
    },
    changeItemSelectionWhenShiftKeyInVirtualPaging: function(loadIndex) {
        var loadOptions = this.options.getLoadOptions(loadIndex, this._focusedItemIndex, this._shiftFocusedItemIndex);
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["Deferred"];
        var indexOffset = loadOptions.skip;
        this.options.load(loadOptions).done(items => {
            this.changeItemSelectionWhenShiftKeyPressed(loadIndex, items, indexOffset);
            deferred.resolve()
        });
        return deferred.promise()
    },
    changeItemSelectionWhenShiftKeyPressed: function(itemIndex, items, indexOffset) {
        var isSelectedItemsChanged = false;
        var itemIndexStep;
        var indexOffsetDefined = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(indexOffset);
        var index = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
        var keyOf = this.options.keyOf;
        var focusedItem = items[index];
        var focusedData = this.options.getItemData(focusedItem);
        var focusedKey = keyOf(focusedData);
        var isFocusedItemSelected = focusedItem && this.isItemDataSelected(focusedData);
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(this._shiftFocusedItemIndex)) {
            this._shiftFocusedItemIndex = this._focusedItemIndex
        }
        var data;
        var itemKey;
        var startIndex;
        var endIndex;
        if (this._shiftFocusedItemIndex !== this._focusedItemIndex) {
            itemIndexStep = this._focusedItemIndex < this._shiftFocusedItemIndex ? 1 : -1;
            startIndex = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
            endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
            for (index = startIndex; index !== endIndex; index += itemIndexStep) {
                if (indexOffsetDefined || this.isDataItem(items[index])) {
                    itemKey = keyOf(this.options.getItemData(items[index]));
                    this._removeSelectedItem(itemKey);
                    isSelectedItemsChanged = true
                }
            }
        }
        if (itemIndex !== this._shiftFocusedItemIndex) {
            itemIndexStep = itemIndex < this._shiftFocusedItemIndex ? 1 : -1;
            startIndex = indexOffsetDefined ? itemIndex - indexOffset : itemIndex;
            endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
            for (index = startIndex; index !== endIndex; index += itemIndexStep) {
                if (indexOffsetDefined || this.isDataItem(items[index])) {
                    data = this.options.getItemData(items[index]);
                    itemKey = keyOf(data);
                    this._addSelectedItem(data, itemKey);
                    isSelectedItemsChanged = true
                }
            }
        }
        if ((indexOffsetDefined || this.isDataItem(focusedItem)) && !isFocusedItemSelected) {
            this._addSelectedItem(focusedData, focusedKey);
            isSelectedItemsChanged = true
        }
        return isSelectedItemsChanged
    },
    clearSelectedItems: function() {
        this._setSelectedItems([], [])
    },
    selectAll: function(isOnePage) {
        this._resetFocusedItemIndex();
        if (isOnePage) {
            return this._onePageSelectAll(false)
        } else {
            return this.selectedItemKeys([], true, false, true)
        }
    },
    deselectAll: function(isOnePage) {
        this._resetFocusedItemIndex();
        if (isOnePage) {
            return this._onePageSelectAll(true)
        } else {
            return this.selectedItemKeys([], true, true, true)
        }
    },
    _onePageSelectAll: function(isDeselect) {
        var items = this._selectionStrategy.getSelectableItems(this.options.plainItems());
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (this.isDataItem(item)) {
                var itemData = this.options.getItemData(item);
                var itemKey = this.options.keyOf(itemData);
                var isSelected = this.isItemSelected(itemKey);
                if (!isSelected && !isDeselect) {
                    this._addSelectedItem(itemData, itemKey)
                }
                if (isSelected && isDeselect) {
                    this._removeSelectedItem(itemKey)
                }
            }
        }
        this.onSelectionChanged();
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["Deferred"]).resolve()
    },
    getSelectAllState: function(visibleOnly) {
        return this._selectionStrategy.getSelectAllState(visibleOnly)
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/selection/selection.strategy.deferred.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/selection/selection.strategy.deferred.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _selection_strategy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selection.strategy */ "./node_modules/devextreme/esm/ui/selection/selection.strategy.js");
/* harmony import */ var _widget_ui_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/* harmony import */ var _data_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../data/query */ "./node_modules/devextreme/esm/data/query.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/ui/selection/selection.strategy.deferred.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





/* harmony default export */ __webpack_exports__["default"] = (_selection_strategy__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    getSelectedItems: function() {
        return this._loadFilteredData(this.options.selectionFilter)
    },
    getSelectedItemKeys: function() {
        var d = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__["Deferred"];
        var that = this;
        var key = this.options.key();
        var select = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(key) ? [key] : key;
        this._loadFilteredData(this.options.selectionFilter, null, select).done((function(items) {
            var keys = items.map((function(item) {
                return that.options.keyOf(item)
            }));
            d.resolve(keys)
        })).fail(d.reject);
        return d.promise()
    },
    selectedItemKeys: function(keys, preserve, isDeselect, isSelectAll) {
        if (isSelectAll) {
            var filter = this.options.filter();
            var needResetSelectionFilter = !filter || JSON.stringify(filter) === JSON.stringify(this.options.selectionFilter) && isDeselect;
            if (needResetSelectionFilter) {
                this._setOption("selectionFilter", isDeselect ? [] : null)
            } else {
                this._addSelectionFilter(isDeselect, filter, isSelectAll)
            }
        } else {
            if (!preserve) {
                this._setOption("selectionFilter", [])
            }
            for (var i = 0; i < keys.length; i++) {
                if (isDeselect) {
                    this.removeSelectedItem(keys[i])
                } else {
                    this.addSelectedItem(keys[i])
                }
            }
        }
        this.onSelectionChanged();
        return (new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__["Deferred"]).resolve()
    },
    setSelectedItems: function(keys) {
        this._setOption("selectionFilter", null);
        for (var i = 0; i < keys.length; i++) {
            this.addSelectedItem(keys[i])
        }
    },
    isItemDataSelected: function(itemData) {
        return this.isItemKeySelected(itemData)
    },
    isItemKeySelected: function(itemData) {
        var selectionFilter = this.options.selectionFilter;
        if (!selectionFilter) {
            return true
        }
        return !!Object(_data_query__WEBPACK_IMPORTED_MODULE_3__["default"])([itemData]).filter(selectionFilter).toArray().length
    },
    _getKeyExpr: function() {
        var keyField = this.options.key();
        if (Array.isArray(keyField) && 1 === keyField.length) {
            return keyField[0]
        }
        return keyField
    },
    _normalizeKey: function(key) {
        var keyExpr = this.options.key();
        if (Array.isArray(keyExpr) && 1 === keyExpr.length) {
            return key[keyExpr[0]]
        }
        return key
    },
    _getFilterByKey: function(key) {
        var keyField = this._getKeyExpr();
        var filter = [keyField, "=", this._normalizeKey(key)];
        if (Array.isArray(keyField)) {
            filter = [];
            for (var i = 0; i < keyField.length; i++) {
                filter.push([keyField[i], "=", key[keyField[i]]]);
                if (i !== keyField.length - 1) {
                    filter.push("and")
                }
            }
        }
        return filter
    },
    addSelectedItem: function(key) {
        var filter = this._getFilterByKey(key);
        this._addSelectionFilter(false, filter)
    },
    removeSelectedItem: function(key) {
        var filter = this._getFilterByKey(key);
        this._addSelectionFilter(true, filter)
    },
    validate: function() {
        var key = this.options.key;
        if (key && void 0 === key()) {
            throw _widget_ui_errors__WEBPACK_IMPORTED_MODULE_2__["default"].Error("E1042", "Deferred selection")
        }
    },
    _findSubFilter: function(selectionFilter, filter) {
        if (!selectionFilter) {
            return -1
        }
        var filterString = JSON.stringify(filter);
        for (var index = 0; index < selectionFilter.length; index++) {
            var subFilter = selectionFilter[index];
            if (subFilter && JSON.stringify(subFilter) === filterString) {
                return index
            }
        }
        return -1
    },
    _isLastSubFilter: function(selectionFilter, filter) {
        if (selectionFilter && filter) {
            return this._findSubFilter(selectionFilter, filter) === selectionFilter.length - 1 || 0 === this._findSubFilter([selectionFilter], filter)
        }
        return false
    },
    _addFilterOperator: function(selectionFilter, filterOperator) {
        if (selectionFilter.length > 1 && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(selectionFilter[1]) && selectionFilter[1] !== filterOperator) {
            selectionFilter = [selectionFilter]
        }
        if (selectionFilter.length) {
            selectionFilter.push(filterOperator)
        }
        return selectionFilter
    },
    _denormalizeFilter: function(filter) {
        if (filter && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(filter[0])) {
            filter = [filter]
        }
        return filter
    },
    _isOnlyNegativeFiltersLeft: function(filters) {
        return filters.every((filterItem, i) => {
            if (i % 2 === 0) {
                return Array.isArray(filterItem) && "!" === filterItem[0]
            } else {
                return "and" === filterItem
            }
        })
    },
    _addSelectionFilter: function(isDeselect, filter, isSelectAll) {
        var currentFilter = isDeselect ? ["!", filter] : filter;
        var currentOperation = isDeselect ? "and" : "or";
        var needAddFilter = true;
        var selectionFilter = this.options.selectionFilter || [];
        selectionFilter = this._denormalizeFilter(selectionFilter);
        if (selectionFilter && selectionFilter.length) {
            var removedIndex = this._removeSameFilter(selectionFilter, filter, isDeselect, isSelectAll);
            var filterIndex = this._removeSameFilter(selectionFilter, filter, !isDeselect);
            var shouldCleanFilter = isDeselect && (-1 !== removedIndex || -1 !== filterIndex) && this._isOnlyNegativeFiltersLeft(selectionFilter);
            if (shouldCleanFilter) {
                selectionFilter = []
            }
            var isKeyOperatorsAfterRemoved = this._isKeyFilter(filter) && this._hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex);
            needAddFilter = filter.length && !isKeyOperatorsAfterRemoved;
            if (needAddFilter) {
                selectionFilter = this._addFilterOperator(selectionFilter, currentOperation)
            }
        }
        if (needAddFilter) {
            selectionFilter.push(currentFilter)
        }
        selectionFilter = this._normalizeFilter(selectionFilter);
        this._setOption("selectionFilter", !isDeselect && !selectionFilter.length ? null : selectionFilter)
    },
    _normalizeFilter: function(filter) {
        if (filter && 1 === filter.length) {
            filter = filter[0]
        }
        return filter
    },
    _removeFilterByIndex: function(filter, filterIndex, isSelectAll) {
        var operation = filter[1];
        if (filterIndex > 0) {
            filter.splice(filterIndex - 1, 2)
        } else {
            filter.splice(filterIndex, 2)
        }
        if (isSelectAll && "and" === operation) {
            filter.splice(0, filter.length)
        }
    },
    _isSimpleKeyFilter: function(filter, key) {
        return 3 === filter.length && filter[0] === key && "=" === filter[1]
    },
    _isKeyFilter: function(filter) {
        if (2 === filter.length && "!" === filter[0]) {
            return this._isKeyFilter(filter[1])
        }
        var keyField = this._getKeyExpr();
        if (Array.isArray(keyField)) {
            if (filter.length !== 2 * keyField.length - 1) {
                return false
            }
            for (var i = 0; i < keyField.length; i++) {
                if (i > 0 && "and" !== filter[2 * i - 1]) {
                    return false
                }
                if (!this._isSimpleKeyFilter(filter[2 * i], keyField[i])) {
                    return false
                }
            }
            return true
        }
        return this._isSimpleKeyFilter(filter, keyField)
    },
    _hasKeyFiltersOnlyStartingFromIndex: function(selectionFilter, filterIndex) {
        if (filterIndex >= 0) {
            for (var i = filterIndex; i < selectionFilter.length; i++) {
                if ("string" !== typeof selectionFilter[i] && !this._isKeyFilter(selectionFilter[i])) {
                    return false
                }
            }
            return true
        }
        return false
    },
    _removeSameFilter: function(selectionFilter, filter, inverted, isSelectAll) {
        filter = inverted ? ["!", filter] : filter;
        if (JSON.stringify(filter) === JSON.stringify(selectionFilter)) {
            selectionFilter.splice(0, selectionFilter.length);
            return 0
        }
        var filterIndex = this._findSubFilter(selectionFilter, filter);
        if (filterIndex >= 0) {
            this._removeFilterByIndex(selectionFilter, filterIndex, isSelectAll);
            return filterIndex
        } else {
            for (var i = 0; i < selectionFilter.length; i++) {
                if (Array.isArray(selectionFilter[i]) && selectionFilter[i].length > 2) {
                    var _filterIndex = this._removeSameFilter(selectionFilter[i], filter, false, isSelectAll);
                    if (_filterIndex >= 0) {
                        if (!selectionFilter[i].length) {
                            this._removeFilterByIndex(selectionFilter, i, isSelectAll)
                        } else if (1 === selectionFilter[i].length) {
                            selectionFilter[i] = selectionFilter[i][0]
                        }
                        return _filterIndex
                    }
                }
            }
            return -1
        }
    },
    getSelectAllState: function() {
        var filter = this.options.filter();
        var selectionFilter = this.options.selectionFilter;
        if (!selectionFilter) {
            return true
        }
        if (!selectionFilter.length) {
            return false
        }
        if (!filter || !filter.length) {
            return
        }
        selectionFilter = this._denormalizeFilter(selectionFilter);
        if (this._isLastSubFilter(selectionFilter, filter)) {
            return true
        }
        if (this._isLastSubFilter(selectionFilter, ["!", filter])) {
            return false
        }
        return
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/selection/selection.strategy.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/selection/selection.strategy.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/query */ "./node_modules/devextreme/esm/data/query.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/ui/selection/selection.strategy.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





/* harmony default export */ __webpack_exports__["default"] = (_core_class__WEBPACK_IMPORTED_MODULE_3__["default"].inherit({
    ctor: function(options) {
        this.options = options;
        this._setOption("disabledItemKeys", []);
        this._clearItemKeys()
    },
    _clearItemKeys: function() {
        this._setOption("addedItemKeys", []);
        this._setOption("removedItemKeys", []);
        this._setOption("removedItems", []);
        this._setOption("addedItems", [])
    },
    validate: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    _setOption: function(name, value) {
        this.options[name] = value
    },
    onSelectionChanged: function() {
        var addedItemKeys = this.options.addedItemKeys;
        var removedItemKeys = this.options.removedItemKeys;
        var addedItems = this.options.addedItems;
        var removedItems = this.options.removedItems;
        var selectedItems = this.options.selectedItems;
        var selectedItemKeys = this.options.selectedItemKeys;
        var onSelectionChanged = this.options.onSelectionChanged || _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"];
        this._clearItemKeys();
        onSelectionChanged({
            selectedItems: selectedItems,
            selectedItemKeys: selectedItemKeys,
            addedItemKeys: addedItemKeys,
            removedItemKeys: removedItemKeys,
            addedItems: addedItems,
            removedItems: removedItems
        })
    },
    equalKeys: function(key1, key2) {
        if (this.options.equalByReference) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isObject"])(key1) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isObject"])(key2)) {
                return key1 === key2
            }
        }
        return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_1__["equalByValue"])(key1, key2)
    },
    getSelectableItems: function(items) {
        return items.filter((function(item) {
            return !(null !== item && void 0 !== item && item.disabled)
        }))
    },
    _clearSelection: function(keys, preserve, isDeselect, isSelectAll) {
        keys = keys || [];
        keys = Array.isArray(keys) ? keys : [keys];
        this.validate();
        return this.selectedItemKeys(keys, preserve, isDeselect, isSelectAll)
    },
    _removeTemplateProperty: function(remoteFilter) {
        if (Array.isArray(remoteFilter)) {
            return remoteFilter.map(f => this._removeTemplateProperty(f))
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isObject"])(remoteFilter)) {
            delete remoteFilter.template
        }
        return remoteFilter
    },
    _loadFilteredData: function(remoteFilter, localFilter, select, isSelectAll) {
        var filterLength = encodeURI(JSON.stringify(this._removeTemplateProperty(remoteFilter))).length;
        var needLoadAllData = this.options.maxFilterLengthInRequest && filterLength > this.options.maxFilterLengthInRequest;
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__["Deferred"];
        var loadOptions = {
            filter: needLoadAllData ? void 0 : remoteFilter,
            select: needLoadAllData ? this.options.dataFields() : select || this.options.dataFields()
        };
        if (remoteFilter && 0 === remoteFilter.length) {
            deferred.resolve([])
        } else {
            this.options.load(loadOptions).done((function(items) {
                var filteredItems = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isPlainObject"])(items) ? items.data : items;
                if (localFilter && !isSelectAll) {
                    filteredItems = filteredItems.filter(localFilter)
                } else if (needLoadAllData) {
                    filteredItems = Object(_data_query__WEBPACK_IMPORTED_MODULE_0__["default"])(filteredItems).filter(remoteFilter).toArray()
                }
                deferred.resolve(filteredItems)
            })).fail(deferred.reject.bind(deferred))
        }
        return deferred
    },
    updateSelectedItemKeyHash: function(keys) {
        for (var i = 0; i < keys.length; i++) {
            var keyHash = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_1__["getKeyHash"])(keys[i]);
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isObject"])(keyHash)) {
                this.options.keyHashIndices[keyHash] = this.options.keyHashIndices[keyHash] || [];
                var keyIndices = this.options.keyHashIndices[keyHash];
                keyIndices.push(i)
            }
        }
    },
    _isAnyItemSelected: function(items) {
        for (var i = 0; i < items.length; i++) {
            if (this.options.isItemSelected(items[i])) {
                return
            }
        }
        return false
    },
    _getFullSelectAllState: function() {
        var items = this.options.plainItems();
        var dataFilter = this.options.filter();
        var selectedItems = this.options.ignoreDisabledItems ? this.options.selectedItems : this.options.selectedItems.filter(item => !(null !== item && void 0 !== item && item.disabled));
        if (dataFilter) {
            selectedItems = Object(_data_query__WEBPACK_IMPORTED_MODULE_0__["default"])(selectedItems).filter(dataFilter).toArray()
        }
        var selectedItemsLength = selectedItems.length;
        var disabledItemsLength = items.length - this.getSelectableItems(items).length;
        if (!selectedItemsLength) {
            return this._isAnyItemSelected(items)
        }
        if (selectedItemsLength >= this.options.totalCount() - disabledItemsLength) {
            return true
        }
        return
    },
    _getVisibleSelectAllState: function() {
        var items = this.getSelectableItems(this.options.plainItems());
        var hasSelectedItems = false;
        var hasUnselectedItems = false;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemData = this.options.getItemData(item);
            var key = this.options.keyOf(itemData);
            if (this.options.isSelectableItem(item)) {
                if (this.isItemKeySelected(key)) {
                    hasSelectedItems = true
                } else {
                    hasUnselectedItems = true
                }
            }
        }
        if (hasSelectedItems) {
            return !hasUnselectedItems ? true : void 0
        } else {
            return false
        }
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/selection/selection.strategy.standard.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/selection/selection.strategy.standard.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_array_compare__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/array_compare */ "./node_modules/devextreme/esm/core/utils/array_compare.js");
/* harmony import */ var _data_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/query */ "./node_modules/devextreme/esm/data/query.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_selection_filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/selection_filter */ "./node_modules/devextreme/esm/core/utils/selection_filter.js");
/* harmony import */ var _widget_ui_errors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/* harmony import */ var _selection_strategy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./selection.strategy */ "./node_modules/devextreme/esm/ui/selection/selection.strategy.js");
/**
 * DevExtreme (esm/ui/selection/selection.strategy.standard.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









/* harmony default export */ __webpack_exports__["default"] = (_selection_strategy__WEBPACK_IMPORTED_MODULE_8__["default"].inherit({
    ctor: function(options) {
        this.callBase(options);
        this._initSelectedItemKeyHash()
    },
    _initSelectedItemKeyHash: function() {
        this._setOption("keyHashIndices", this.options.equalByReference ? null : {})
    },
    getSelectedItemKeys: function() {
        return this.options.selectedItemKeys.slice(0)
    },
    getSelectedItems: function() {
        return this.options.selectedItems.slice(0)
    },
    _preserveSelectionUpdate: function(items, isDeselect) {
        var keyOf = this.options.keyOf;
        var keyIndicesToRemoveMap;
        var keyIndex;
        var i;
        if (!keyOf) {
            return
        }
        var isBatchDeselect = isDeselect && items.length > 1 && !this.options.equalByReference;
        if (isBatchDeselect) {
            keyIndicesToRemoveMap = {}
        }
        for (i = 0; i < items.length; i++) {
            var item = items[i];
            var key = keyOf(item);
            if (isDeselect) {
                keyIndex = this.removeSelectedItem(key, keyIndicesToRemoveMap, null === item || void 0 === item ? void 0 : item.disabled);
                if (keyIndicesToRemoveMap && keyIndex >= 0) {
                    keyIndicesToRemoveMap[keyIndex] = true
                }
            } else {
                this.addSelectedItem(key, item)
            }
        }
        if (isBatchDeselect) {
            this._batchRemoveSelectedItems(keyIndicesToRemoveMap)
        }
    },
    _batchRemoveSelectedItems: function(keyIndicesToRemoveMap) {
        var selectedItemKeys = this.options.selectedItemKeys.slice(0);
        var selectedItems = this.options.selectedItems.slice(0);
        this.options.selectedItemKeys.length = 0;
        this.options.selectedItems.length = 0;
        for (var i = 0; i < selectedItemKeys.length; i++) {
            if (!keyIndicesToRemoveMap[i]) {
                this.options.selectedItemKeys.push(selectedItemKeys[i]);
                this.options.selectedItems.push(selectedItems[i])
            }
        }
        this._initSelectedItemKeyHash();
        this.updateSelectedItemKeyHash(this.options.selectedItemKeys)
    },
    _loadSelectedItemsCore: function(keys, isDeselect, isSelectAll, filter) {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"];
        var key = this.options.key();
        if (!keys.length && !isSelectAll) {
            deferred.resolve([]);
            return deferred
        }
        if (isSelectAll && isDeselect && !filter) {
            deferred.resolve(this.getSelectedItems());
            return deferred
        }
        var selectionFilterCreator = new _core_utils_selection_filter__WEBPACK_IMPORTED_MODULE_6__["SelectionFilterCreator"](keys, isSelectAll);
        var combinedFilter = selectionFilterCreator.getCombinedFilter(key, filter);
        var deselectedItems = [];
        if (isDeselect) {
            var selectedItems = this.options.selectedItems;
            deselectedItems = combinedFilter && keys.length !== selectedItems.length ? Object(_data_query__WEBPACK_IMPORTED_MODULE_4__["default"])(selectedItems).filter(combinedFilter).toArray() : selectedItems.slice(0)
        }
        var filteredItems = deselectedItems.length ? deselectedItems : this.options.plainItems(true).filter(this.options.isSelectableItem).map(this.options.getItemData);
        var localFilter = selectionFilterCreator.getLocalFilter(this.options.keyOf, this.equalKeys.bind(this), this.options.equalByReference, key);
        filteredItems = filteredItems.filter(localFilter);
        if (deselectedItems.length || !isSelectAll && filteredItems.length === keys.length) {
            deferred.resolve(filteredItems)
        } else {
            deferred = this._loadFilteredData(combinedFilter, localFilter, null, isSelectAll)
        }
        return deferred
    },
    _replaceSelectionUpdate: function(items) {
        var internalKeys = [];
        var keyOf = this.options.keyOf;
        if (!keyOf) {
            return
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var key = keyOf(item);
            internalKeys.push(key)
        }
        this.setSelectedItems(internalKeys, items)
    },
    _warnOnIncorrectKeys: function(keys) {
        var allowNullValue = this.options.allowNullValue;
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if ((!allowNullValue || null !== key) && !this.isItemKeySelected(key)) {
                _widget_ui_errors__WEBPACK_IMPORTED_MODULE_7__["default"].log("W1002", key)
            }
        }
    },
    _isMultiSelectEnabled: function() {
        var mode = this.options.mode;
        return "all" === mode || "multiple" === mode
    },
    _requestInProgress: function() {
        var _this$_lastLoadDeferr;
        return "pending" === (null === (_this$_lastLoadDeferr = this._lastLoadDeferred) || void 0 === _this$_lastLoadDeferr ? void 0 : _this$_lastLoadDeferr.state())
    },
    _concatRequestsItems: function(keys, isDeselect, oldRequestItems, updatedKeys) {
        var selectedItems;
        var deselectedItems = isDeselect ? keys : [];
        if (updatedKeys) {
            selectedItems = updatedKeys
        } else {
            selectedItems = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["removeDuplicates"])(keys, this.options.selectedItemKeys)
        }
        return {
            addedItems: oldRequestItems.added.concat(selectedItems),
            removedItems: oldRequestItems.removed.concat(deselectedItems),
            keys: keys
        }
    },
    _collectLastRequestData: function(keys, isDeselect, isSelectAll, updatedKeys) {
        var isDeselectAll = isDeselect && isSelectAll;
        var oldRequestItems = {
            added: [],
            removed: []
        };
        var multiSelectEnabled = this._isMultiSelectEnabled();
        var lastRequestData = multiSelectEnabled ? this._lastRequestData : {};
        if (multiSelectEnabled) {
            if (this._shouldMergeWithLastRequest) {
                if (isDeselectAll) {
                    this._lastLoadDeferred.reject();
                    lastRequestData = {}
                } else if (!Object(_core_utils_array_compare__WEBPACK_IMPORTED_MODULE_3__["isKeysEqual"])(keys, this.options.selectedItemKeys)) {
                    oldRequestItems.added = lastRequestData.addedItems;
                    oldRequestItems.removed = lastRequestData.removedItems;
                    if (!isDeselect) {
                        this._lastLoadDeferred.reject()
                    }
                }
            }
            lastRequestData = this._concatRequestsItems(keys, isDeselect, oldRequestItems, this._shouldMergeWithLastRequest ? void 0 : updatedKeys)
        }
        return lastRequestData
    },
    _updateKeysByLastRequestData: function(keys, isDeselect, isSelectAll) {
        var currentKeys = keys;
        if (this._isMultiSelectEnabled() && this._shouldMergeWithLastRequest && !isDeselect && !isSelectAll) {
            var _this$_lastRequestDat, _this$_lastRequestDat2;
            currentKeys = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["removeDuplicates"])(keys.concat(null === (_this$_lastRequestDat = this._lastRequestData) || void 0 === _this$_lastRequestDat ? void 0 : _this$_lastRequestDat.addedItems), null === (_this$_lastRequestDat2 = this._lastRequestData) || void 0 === _this$_lastRequestDat2 ? void 0 : _this$_lastRequestDat2.removedItems);
            currentKeys = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_2__["uniqueValues"])(currentKeys)
        }
        return currentKeys
    },
    _loadSelectedItems: function(keys, isDeselect, isSelectAll, updatedKeys) {
        var that = this;
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["Deferred"];
        var filter = that.options.filter();
        this._shouldMergeWithLastRequest = this._requestInProgress();
        this._lastRequestData = this._collectLastRequestData(keys, isDeselect, isSelectAll, updatedKeys);
        Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_5__["when"])(that._lastLoadDeferred).always((function() {
            var currentKeys = that._updateKeysByLastRequestData(keys, isDeselect, isSelectAll);
            that._shouldMergeWithLastRequest = false;
            that._loadSelectedItemsCore(currentKeys, isDeselect, isSelectAll, filter).done(deferred.resolve).fail(deferred.reject)
        }));
        that._lastLoadDeferred = deferred;
        return deferred
    },
    selectedItemKeys: function(keys, preserve, isDeselect, isSelectAll, updatedKeys) {
        var that = this;
        var deferred = that._loadSelectedItems(keys, isDeselect, isSelectAll, updatedKeys);
        deferred.done((function(items) {
            if (preserve) {
                that._preserveSelectionUpdate(items, isDeselect)
            } else {
                that._replaceSelectionUpdate(items)
            }
            that.onSelectionChanged()
        }));
        return deferred
    },
    addSelectedItem: function(key, itemData) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(itemData) && !this.options.ignoreDisabledItems && itemData.disabled) {
            if (-1 === this.options.disabledItemKeys.indexOf(key)) {
                this.options.disabledItemKeys.push(key)
            }
            return
        }
        var keyHash = this._getKeyHash(key);
        if (-1 === this._indexOfSelectedItemKey(keyHash)) {
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isObject"])(keyHash) && this.options.keyHashIndices) {
                this.options.keyHashIndices[keyHash] = [this.options.selectedItemKeys.length]
            }
            this.options.selectedItemKeys.push(key);
            this.options.addedItemKeys.push(key);
            this.options.addedItems.push(itemData);
            this.options.selectedItems.push(itemData)
        }
    },
    _getSelectedIndexByKey: function(key, ignoreIndicesMap) {
        var selectedItemKeys = this.options.selectedItemKeys;
        for (var index = 0; index < selectedItemKeys.length; index++) {
            if ((!ignoreIndicesMap || !ignoreIndicesMap[index]) && this.equalKeys(selectedItemKeys[index], key)) {
                return index
            }
        }
        return -1
    },
    _getSelectedIndexByHash: function(key, ignoreIndicesMap) {
        var indices = this.options.keyHashIndices[key];
        if (indices && indices.length > 1 && ignoreIndicesMap) {
            indices = indices.filter((function(index) {
                return !ignoreIndicesMap[index]
            }))
        }
        return indices && indices[0] >= 0 ? indices[0] : -1
    },
    _indexOfSelectedItemKey: function(key, ignoreIndicesMap) {
        var selectedIndex;
        if (this.options.equalByReference) {
            selectedIndex = this.options.selectedItemKeys.indexOf(key)
        } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isObject"])(key)) {
            selectedIndex = this._getSelectedIndexByKey(key, ignoreIndicesMap)
        } else {
            selectedIndex = this._getSelectedIndexByHash(key, ignoreIndicesMap)
        }
        return selectedIndex
    },
    _shiftSelectedKeyIndices: function(keyIndex) {
        for (var currentKeyIndex = keyIndex; currentKeyIndex < this.options.selectedItemKeys.length; currentKeyIndex++) {
            var currentKey = this.options.selectedItemKeys[currentKeyIndex];
            var currentKeyHash = Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_0__["getKeyHash"])(currentKey);
            var currentKeyIndices = this.options.keyHashIndices[currentKeyHash];
            if (!currentKeyIndices) {
                continue
            }
            for (var i = 0; i < currentKeyIndices.length; i++) {
                if (currentKeyIndices[i] > keyIndex) {
                    currentKeyIndices[i]--
                }
            }
        }
    },
    removeSelectedItem: function(key, keyIndicesToRemoveMap, isDisabled) {
        if (!this.options.ignoreDisabledItems && isDisabled) {
            return
        }
        var keyHash = this._getKeyHash(key);
        var isBatchDeselect = !!keyIndicesToRemoveMap;
        var keyIndex = this._indexOfSelectedItemKey(keyHash, keyIndicesToRemoveMap);
        if (keyIndex < 0) {
            return keyIndex
        }
        this.options.removedItemKeys.push(key);
        this.options.removedItems.push(this.options.selectedItems[keyIndex]);
        if (isBatchDeselect) {
            return keyIndex
        }
        this.options.selectedItemKeys.splice(keyIndex, 1);
        this.options.selectedItems.splice(keyIndex, 1);
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isObject"])(keyHash) || !this.options.keyHashIndices) {
            return keyIndex
        }
        var keyIndices = this.options.keyHashIndices[keyHash];
        if (!keyIndices) {
            return keyIndex
        }
        keyIndices.shift();
        if (!keyIndices.length) {
            delete this.options.keyHashIndices[keyHash]
        }
        this._shiftSelectedKeyIndices(keyIndex);
        return keyIndex
    },
    _updateAddedItemKeys: function(keys, items) {
        for (var i = 0; i < keys.length; i++) {
            if (!this.isItemKeySelected(keys[i])) {
                this.options.addedItemKeys.push(keys[i]);
                this.options.addedItems.push(items[i])
            }
        }
    },
    _updateRemovedItemKeys: function(keys, oldSelectedKeys, oldSelectedItems) {
        for (var i = 0; i < oldSelectedKeys.length; i++) {
            if (!this.isItemKeySelected(oldSelectedKeys[i])) {
                this.options.removedItemKeys.push(oldSelectedKeys[i]);
                this.options.removedItems.push(oldSelectedItems[i])
            }
        }
    },
    _isItemSelectionInProgress: function(key, checkPending) {
        var shouldCheckPending = checkPending && this._lastRequestData && this._requestInProgress();
        if (shouldCheckPending) {
            var _this$_lastRequestDat3;
            var addedItems = null !== (_this$_lastRequestDat3 = this._lastRequestData.addedItems) && void 0 !== _this$_lastRequestDat3 ? _this$_lastRequestDat3 : [];
            return addedItems.includes(key)
        } else {
            return false
        }
    },
    _getKeyHash: function(key) {
        return this.options.equalByReference ? key : Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_0__["getKeyHash"])(key)
    },
    setSelectedItems: function(keys, items) {
        this._updateAddedItemKeys(keys, items);
        var oldSelectedKeys = this.options.selectedItemKeys;
        var oldSelectedItems = this.options.selectedItems;
        if (!this.options.equalByReference) {
            this._initSelectedItemKeyHash();
            this.updateSelectedItemKeyHash(keys)
        }
        this._setOption("selectedItemKeys", keys);
        this._setOption("selectedItems", items);
        this._updateRemovedItemKeys(keys, oldSelectedKeys, oldSelectedItems)
    },
    isItemDataSelected: function(itemData) {
        var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        var key = this.options.keyOf(itemData);
        return this.isItemKeySelected(key, options)
    },
    isItemKeySelected: function(key) {
        var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        var result = this._isItemSelectionInProgress(key, options.checkPending);
        if (!result) {
            var keyHash = this._getKeyHash(key);
            var index = this._indexOfSelectedItemKey(keyHash);
            result = -1 !== index
        }
        return result
    },
    getSelectAllState: function(visibleOnly) {
        if (visibleOnly) {
            return this._getVisibleSelectAllState()
        } else {
            return this._getFullSelectAllState()
        }
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/toolbar/constants.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/toolbar/constants.js ***!
  \*************************************************************/
/*! exports provided: TOOLBAR_CLASS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOOLBAR_CLASS", function() { return TOOLBAR_CLASS; });
/**
 * DevExtreme (esm/ui/toolbar/constants.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var TOOLBAR_CLASS = "dx-toolbar";


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.base.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/toolbar/ui.toolbar.base.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../themes */ "./node_modules/devextreme/esm/ui/themes.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_position__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/position */ "./node_modules/devextreme/esm/core/utils/position.js");
/* harmony import */ var _collection_ui_collection_widget_async__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../collection/ui.collection_widget.async */ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.async.js");
/* harmony import */ var _core_polyfills_promise__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/polyfills/promise */ "./node_modules/devextreme/esm/core/polyfills/promise.js");
/* harmony import */ var _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/templates/bindable_template */ "./node_modules/devextreme/esm/core/templates/bindable_template.js");
/* harmony import */ var _core_errors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/errors */ "./node_modules/devextreme/esm/core/errors.js");
/* harmony import */ var _animation_fx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../animation/fx */ "./node_modules/devextreme/esm/animation/fx.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./constants */ "./node_modules/devextreme/esm/ui/toolbar/constants.js");
/**
 * DevExtreme (esm/ui/toolbar/ui.toolbar.base.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
















var TOOLBAR_BEFORE_CLASS = "dx-toolbar-before";
var TOOLBAR_CENTER_CLASS = "dx-toolbar-center";
var TOOLBAR_AFTER_CLASS = "dx-toolbar-after";
var TOOLBAR_MINI_CLASS = "dx-toolbar-mini";
var TOOLBAR_ITEM_CLASS = "dx-toolbar-item";
var TOOLBAR_LABEL_CLASS = "dx-toolbar-label";
var TOOLBAR_BUTTON_CLASS = "dx-toolbar-button";
var TOOLBAR_ITEMS_CONTAINER_CLASS = "dx-toolbar-items-container";
var TOOLBAR_GROUP_CLASS = "dx-toolbar-group";
var TOOLBAR_COMPACT_CLASS = "dx-toolbar-compact";
var TOOLBAR_LABEL_SELECTOR = "." + TOOLBAR_LABEL_CLASS;
var TOOLBAR_MULTILINE_CLASS = "dx-toolbar-multiline";
var TEXT_BUTTON_MODE = "text";
var DEFAULT_BUTTON_TYPE = "default";
var DEFAULT_DROPDOWNBUTTON_STYLING_MODE = "contained";
var TOOLBAR_ITEM_DATA_KEY = "dxToolbarItemDataKey";
var ToolbarBase = _collection_ui_collection_widget_async__WEBPACK_IMPORTED_MODULE_10__["default"].inherit({
    compactMode: false,
    ctor: function(element, options) {
        this._userOptions = options || {};
        this.callBase(element, options);
        if ("height" in this._userOptions) {
            _core_errors__WEBPACK_IMPORTED_MODULE_13__["default"].log("W0001", this.NAME, "height", "20.1", "Functionality associated with this option is not intended for the Toolbar widget.")
        }
    },
    _getSynchronizableOptionsForCreateComponent: function() {
        return this.callBase().filter(item => "disabled" !== item)
    },
    _initTemplates: function() {
        this.callBase();
        var template = new _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_12__["BindableTemplate"](function($container, data, rawModel) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isPlainObject"])(data)) {
                if (data.text) {
                    $container.text(data.text).wrapInner("<div>")
                }
                if (data.html) {
                    $container.html(data.html)
                }
                if ("dxDropDownButton" === data.widget) {
                    data.options = data.options || {};
                    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(data.options.stylingMode)) {
                        data.options.stylingMode = this.option("useFlatButtons") ? TEXT_BUTTON_MODE : DEFAULT_DROPDOWNBUTTON_STYLING_MODE
                    }
                }
                if ("dxButton" === data.widget) {
                    if (this.option("useFlatButtons")) {
                        data.options = data.options || {};
                        data.options.stylingMode = data.options.stylingMode || TEXT_BUTTON_MODE
                    }
                    if (this.option("useDefaultButtons")) {
                        data.options = data.options || {};
                        data.options.type = data.options.type || DEFAULT_BUTTON_TYPE
                    }
                }
            } else {
                $container.text(String(data))
            }
            this._getTemplate("dx-polymorph-widget").render({
                container: $container,
                model: rawModel,
                parent: this
            })
        }.bind(this), ["text", "html", "widget", "options"], this.option("integrationOptions.watchMethod"));
        this._templateManager.addDefaultTemplates({
            item: template,
            menuItem: template
        })
    },
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(this.callBase(), {
            renderAs: "topToolbar",
            grouped: false,
            useFlatButtons: false,
            useDefaultButtons: false,
            multiline: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return Object(_themes__WEBPACK_IMPORTED_MODULE_2__["isMaterial"])()
            },
            options: {
                useFlatButtons: true
            }
        }])
    },
    _itemContainer: function() {
        return this._$toolbarItemsContainer.find(["." + TOOLBAR_BEFORE_CLASS, "." + TOOLBAR_CENTER_CLASS, "." + TOOLBAR_AFTER_CLASS].join(","))
    },
    _itemClass: function() {
        return TOOLBAR_ITEM_CLASS
    },
    _itemDataKey: function() {
        return TOOLBAR_ITEM_DATA_KEY
    },
    _buttonClass: function() {
        return TOOLBAR_BUTTON_CLASS
    },
    _dimensionChanged: function() {
        this._arrangeItems();
        this._applyCompactMode()
    },
    _initMarkup: function() {
        this._renderToolbar();
        this._renderSections();
        this.callBase();
        this.setAria("role", "toolbar")
    },
    _waitParentAnimationFinished: function() {
        var $element = this.$element();
        return new _core_polyfills_promise__WEBPACK_IMPORTED_MODULE_11__["default"](resolve => {
            var runCheck = () => {
                clearTimeout(this._waitParentAnimationTimeout);
                this._waitParentAnimationTimeout = setTimeout(() => (() => {
                    var readyToResolve = true;
                    $element.parents().each((_, parent) => {
                        if (_animation_fx__WEBPACK_IMPORTED_MODULE_14__["default"].isAnimating(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(parent))) {
                            readyToResolve = false;
                            return false
                        }
                    });
                    if (readyToResolve) {
                        resolve()
                    }
                    return readyToResolve
                })() || runCheck(), 15)
            };
            runCheck()
        })
    },
    _render: function() {
        this.callBase();
        this._renderItemsAsync();
        if (Object(_themes__WEBPACK_IMPORTED_MODULE_2__["isMaterial"])()) {
            _core_polyfills_promise__WEBPACK_IMPORTED_MODULE_11__["default"].all([this._waitParentAnimationFinished(), this._checkWebFontForLabelsLoaded()]).then(this._dimensionChanged.bind(this))
        }
    },
    _postProcessRenderItems: function() {
        this._arrangeItems()
    },
    _renderToolbar: function() {
        this.$element().addClass(_constants__WEBPACK_IMPORTED_MODULE_15__["TOOLBAR_CLASS"]).toggleClass(TOOLBAR_MULTILINE_CLASS, this.option("multiline"));
        this._$toolbarItemsContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(TOOLBAR_ITEMS_CONTAINER_CLASS).appendTo(this.$element())
    },
    _renderSections: function() {
        var $container = this._$toolbarItemsContainer;
        var that = this;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(["before", "center", "after"], (function() {
            var sectionClass = "dx-toolbar-" + this;
            var $section = $container.find("." + sectionClass);
            if (!$section.length) {
                that["_$" + this + "Section"] = $section = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(sectionClass).appendTo($container)
            }
        }))
    },
    _checkWebFontForLabelsLoaded: function() {
        var $labels = this.$element().find(TOOLBAR_LABEL_SELECTOR);
        var promises = [];
        $labels.each((_, label) => {
            var text = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(label).text();
            var fontWeight = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(label).css("fontWeight");
            promises.push(Object(_themes__WEBPACK_IMPORTED_MODULE_2__["waitWebFont"])(text, fontWeight))
        });
        return _core_polyfills_promise__WEBPACK_IMPORTED_MODULE_11__["default"].all(promises)
    },
    _arrangeItems: function(elementWidth) {
        elementWidth = elementWidth || Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this.$element());
        this._$centerSection.css({
            margin: "0 auto",
            float: "none"
        });
        var beforeRect = Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_9__["getBoundingRect"])(this._$beforeSection.get(0));
        var afterRect = Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_9__["getBoundingRect"])(this._$afterSection.get(0));
        this._alignCenterSection(beforeRect, afterRect, elementWidth);
        var $label = this._$toolbarItemsContainer.find(TOOLBAR_LABEL_SELECTOR).eq(0);
        var $section = $label.parent();
        if (!$label.length) {
            return
        }
        var labelOffset = beforeRect.width ? beforeRect.width : $label.position().left;
        var widthBeforeSection = $section.hasClass(TOOLBAR_BEFORE_CLASS) ? 0 : labelOffset;
        var widthAfterSection = $section.hasClass(TOOLBAR_AFTER_CLASS) ? 0 : afterRect.width;
        var elemsAtSectionWidth = 0;
        $section.children().not(TOOLBAR_LABEL_SELECTOR).each((function() {
            elemsAtSectionWidth += Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(this)
        }));
        var freeSpace = elementWidth - elemsAtSectionWidth;
        var sectionMaxWidth = Math.max(freeSpace - widthBeforeSection - widthAfterSection, 0);
        if ($section.hasClass(TOOLBAR_BEFORE_CLASS)) {
            this._alignSection(this._$beforeSection, sectionMaxWidth)
        } else {
            var labelPaddings = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])($label) - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])($label);
            $label.css("maxWidth", sectionMaxWidth - labelPaddings)
        }
    },
    _alignCenterSection: function(beforeRect, afterRect, elementWidth) {
        this._alignSection(this._$centerSection, elementWidth - beforeRect.width - afterRect.width);
        var isRTL = this.option("rtlEnabled");
        var leftRect = isRTL ? afterRect : beforeRect;
        var rightRect = isRTL ? beforeRect : afterRect;
        var centerRect = Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_9__["getBoundingRect"])(this._$centerSection.get(0));
        if (leftRect.right > centerRect.left || centerRect.right > rightRect.left) {
            this._$centerSection.css({
                marginLeft: leftRect.width,
                marginRight: rightRect.width,
                float: leftRect.width > rightRect.width ? "none" : "right"
            })
        }
    },
    _alignSection: function($section, maxWidth) {
        var $labels = $section.find(TOOLBAR_LABEL_SELECTOR);
        var labels = $labels.toArray();
        maxWidth -= this._getCurrentLabelsPaddings(labels);
        var currentWidth = this._getCurrentLabelsWidth(labels);
        var difference = Math.abs(currentWidth - maxWidth);
        if (maxWidth < currentWidth) {
            labels = labels.reverse();
            this._alignSectionLabels(labels, difference, false)
        } else {
            this._alignSectionLabels(labels, difference, true)
        }
    },
    _alignSectionLabels: function(labels, difference, expanding) {
        var getRealLabelWidth = function(label) {
            return Object(_core_utils_position__WEBPACK_IMPORTED_MODULE_9__["getBoundingRect"])(label).width
        };
        for (var i = 0; i < labels.length; i++) {
            var $label = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(labels[i]);
            var currentLabelWidth = Math.ceil(getRealLabelWidth(labels[i]));
            var labelMaxWidth = void 0;
            if (expanding) {
                $label.css("maxWidth", "inherit")
            }
            var possibleLabelWidth = Math.ceil(expanding ? getRealLabelWidth(labels[i]) : currentLabelWidth);
            if (possibleLabelWidth < difference) {
                labelMaxWidth = expanding ? possibleLabelWidth : 0;
                difference -= possibleLabelWidth
            } else {
                labelMaxWidth = expanding ? currentLabelWidth + difference : currentLabelWidth - difference;
                $label.css("maxWidth", labelMaxWidth);
                break
            }
            $label.css("maxWidth", labelMaxWidth)
        }
    },
    _applyCompactMode: function() {
        var $element = this.$element();
        $element.removeClass(TOOLBAR_COMPACT_CLASS);
        if (this.option("compactMode") && this._getSummaryItemsWidth(this.itemElements(), true) > Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])($element)) {
            $element.addClass(TOOLBAR_COMPACT_CLASS)
        }
    },
    _getCurrentLabelsWidth: function(labels) {
        var width = 0;
        labels.forEach((function(label, index) {
            width += Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(label)
        }));
        return width
    },
    _getCurrentLabelsPaddings: function(labels) {
        var padding = 0;
        labels.forEach((function(label, index) {
            padding += Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterWidth"])(label) - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(label)
        }));
        return padding
    },
    _renderItem: function(index, item, itemContainer, $after) {
        var location = item.location || "center";
        var container = itemContainer || this["_$" + location + "Section"];
        var itemHasText = !!(item.text || item.html);
        var itemElement = this.callBase(index, item, container, $after);
        itemElement.toggleClass(this._buttonClass(), !itemHasText).toggleClass(TOOLBAR_LABEL_CLASS, itemHasText).addClass(item.cssClass);
        return itemElement
    },
    _renderGroupedItems: function() {
        var that = this;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(this.option("items"), (function(groupIndex, group) {
            var groupItems = group.items;
            var $container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(TOOLBAR_GROUP_CLASS);
            var location = group.location || "center";
            if (!groupItems || !groupItems.length) {
                return
            }
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_8__["each"])(groupItems, (function(itemIndex, item) {
                that._renderItem(itemIndex, item, $container, null)
            }));
            that._$toolbarItemsContainer.find(".dx-toolbar-" + location).append($container)
        }))
    },
    _renderItems: function(items) {
        var grouped = this.option("grouped") && items.length && items[0].items;
        grouped ? this._renderGroupedItems() : this.callBase(items)
    },
    _getToolbarItems: function() {
        return this.option("items") || []
    },
    _renderContentImpl: function() {
        var items = this._getToolbarItems();
        this.$element().toggleClass(TOOLBAR_MINI_CLASS, 0 === items.length);
        if (this._renderedItemsCount) {
            this._renderItems(items.slice(this._renderedItemsCount))
        } else {
            this._renderItems(items)
        }
        this._applyCompactMode()
    },
    _renderEmptyMessage: _core_utils_common__WEBPACK_IMPORTED_MODULE_3__["noop"],
    _clean: function() {
        this._$toolbarItemsContainer.children().empty();
        this.$element().empty()
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._arrangeItems()
        }
    },
    _isVisible: function() {
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this.$element()) > 0 && Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this.$element()) > 0
    },
    _getIndexByItem: function(item) {
        return Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_6__["inArray"])(item, this._getToolbarItems())
    },
    _itemOptionChanged: function(item, property, value) {
        this.callBase.apply(this, [item, property, value]);
        this._arrangeItems()
    },
    _optionChanged: function(args) {
        var name = args.name;
        switch (name) {
            case "width":
                this.callBase.apply(this, arguments);
                this._dimensionChanged();
                break;
            case "multiline":
                this.$element().toggleClass(TOOLBAR_MULTILINE_CLASS, args.value);
                break;
            case "renderAs":
            case "useFlatButtons":
            case "useDefaultButtons":
                this._invalidate();
                break;
            case "compactMode":
                this._applyCompactMode();
                break;
            case "grouped":
                break;
            default:
                this.callBase.apply(this, arguments)
        }
    },
    _dispose: function() {
        this.callBase();
        clearTimeout(this._waitParentAnimationTimeout)
    }
});
Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_5__["default"])("dxToolbarBase", ToolbarBase);
/* harmony default export */ __webpack_exports__["default"] = (ToolbarBase);


/***/ })

}]);