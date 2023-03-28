(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[68],{

/***/ "./node_modules/devextreme-vue/toolbar.js":
/*!************************************************!*\
  !*** ./node_modules/devextreme-vue/toolbar.js ***!
  \************************************************/
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
exports.DxItem = exports.DxToolbar = void 0;
var toolbar_1 = __importDefault(__webpack_require__(/*! devextreme/ui/toolbar */ "./node_modules/devextreme/esm/ui/toolbar.js"));
var index_1 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var index_2 = __webpack_require__(/*! ./core/index */ "./node_modules/devextreme-vue/core/index.js");
var DxToolbar = index_1.createComponent({
    props: {
        dataSource: [Array, Object, String],
        disabled: Boolean,
        elementAttr: Object,
        height: [Function, Number, String],
        hint: String,
        hoverStateEnabled: Boolean,
        itemHoldTimeout: Number,
        items: Array,
        itemTemplate: {},
        menuItemTemplate: {},
        noDataText: String,
        onContentReady: Function,
        onDisposing: Function,
        onInitialized: Function,
        onItemClick: Function,
        onItemContextMenu: Function,
        onItemHold: Function,
        onItemRendered: Function,
        onOptionChanged: Function,
        rtlEnabled: Boolean,
        visible: Boolean,
        width: [Function, Number, String]
    },
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:dataSource": null,
        "update:disabled": null,
        "update:elementAttr": null,
        "update:height": null,
        "update:hint": null,
        "update:hoverStateEnabled": null,
        "update:itemHoldTimeout": null,
        "update:items": null,
        "update:itemTemplate": null,
        "update:menuItemTemplate": null,
        "update:noDataText": null,
        "update:onContentReady": null,
        "update:onDisposing": null,
        "update:onInitialized": null,
        "update:onItemClick": null,
        "update:onItemContextMenu": null,
        "update:onItemHold": null,
        "update:onItemRendered": null,
        "update:onOptionChanged": null,
        "update:rtlEnabled": null,
        "update:visible": null,
        "update:width": null,
    },
    computed: {
        instance: function () {
            return this.$_instance;
        }
    },
    beforeCreate: function () {
        this.$_WidgetClass = toolbar_1.default;
        this.$_hasAsyncTemplate = true;
        this.$_expectedChildren = {
            item: { isCollectionItem: true, optionName: "items" }
        };
    }
});
exports.DxToolbar = DxToolbar;
var DxItem = index_2.createConfigurationComponent({
    emits: {
        "update:isActive": null,
        "update:hoveredElement": null,
        "update:cssClass": null,
        "update:disabled": null,
        "update:html": null,
        "update:locateInMenu": null,
        "update:location": null,
        "update:menuItemTemplate": null,
        "update:options": null,
        "update:showText": null,
        "update:template": null,
        "update:text": null,
        "update:visible": null,
        "update:widget": null,
    },
    props: {
        cssClass: String,
        disabled: Boolean,
        html: String,
        locateInMenu: String,
        location: String,
        menuItemTemplate: {},
        options: {},
        showText: String,
        template: {},
        text: String,
        visible: Boolean,
        widget: String
    }
});
exports.DxItem = DxItem;
DxItem.$_optionName = "items";
DxItem.$_isCollectionItem = true;
exports.default = DxToolbar;


/***/ }),

/***/ "./node_modules/devextreme/esm/core/utils/stubs.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/core/utils/stubs.js ***!
  \*********************************************************/
/*! exports provided: stubComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stubComponent", function() { return stubComponent; });
/**
 * DevExtreme (esm/core/utils/stubs.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
function stubComponent(componentName) {
    return class {
        constructor() {
            throw new Error("Module '".concat(componentName, "' not found"))
        }
        static getInstance() {}
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/events/swipe.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/events/swipe.js ***!
  \*****************************************************/
/*! exports provided: swipe, start, end */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "swipe", function() { return SWIPE_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return SWIPE_START_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "end", function() { return SWIPE_END_EVENT; });
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _gesture_emitter_gesture__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gesture/emitter.gesture */ "./node_modules/devextreme/esm/events/gesture/emitter.gesture.js");
/* harmony import */ var _core_emitter_registrator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/emitter_registrator */ "./node_modules/devextreme/esm/events/core/emitter_registrator.js");
/**
 * DevExtreme (esm/events/swipe.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var SWIPE_START_EVENT = "dxswipestart";
var SWIPE_EVENT = "dxswipe";
var SWIPE_END_EVENT = "dxswipeend";
var HorizontalStrategy = {
    defaultItemSizeFunc: function() {
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this.getElement())
    },
    getBounds: function() {
        return [this._maxLeftOffset, this._maxRightOffset]
    },
    calcOffsetRatio: function(e) {
        var endEventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["eventData"])(e);
        return (endEventData.x - (this._savedEventData && this._savedEventData.x || 0)) / this._itemSizeFunc().call(this, e)
    },
    isFastSwipe: function(e) {
        var endEventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["eventData"])(e);
        return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.x - this._tickData.x) >= endEventData.time - this._tickData.time
    }
};
var VerticalStrategy = {
    defaultItemSizeFunc: function() {
        return Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(this.getElement())
    },
    getBounds: function() {
        return [this._maxTopOffset, this._maxBottomOffset]
    },
    calcOffsetRatio: function(e) {
        var endEventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["eventData"])(e);
        return (endEventData.y - (this._savedEventData && this._savedEventData.y || 0)) / this._itemSizeFunc().call(this, e)
    },
    isFastSwipe: function(e) {
        var endEventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["eventData"])(e);
        return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.y - this._tickData.y) >= endEventData.time - this._tickData.time
    }
};
var STRATEGIES = {
    horizontal: HorizontalStrategy,
    vertical: VerticalStrategy
};
var SwipeEmitter = _gesture_emitter_gesture__WEBPACK_IMPORTED_MODULE_2__["default"].inherit({
    TICK_INTERVAL: 300,
    FAST_SWIPE_SPEED_LIMIT: 10,
    ctor: function(element) {
        this.callBase(element);
        this.direction = "horizontal";
        this.elastic = true
    },
    _getStrategy: function() {
        return STRATEGIES[this.direction]
    },
    _defaultItemSizeFunc: function() {
        return this._getStrategy().defaultItemSizeFunc.call(this)
    },
    _itemSizeFunc: function() {
        return this.itemSizeFunc || this._defaultItemSizeFunc
    },
    _init: function(e) {
        this._tickData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["eventData"])(e)
    },
    _start: function(e) {
        this._savedEventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["eventData"])(e);
        e = this._fireEvent(SWIPE_START_EVENT, e);
        if (!e.cancel) {
            this._maxLeftOffset = e.maxLeftOffset;
            this._maxRightOffset = e.maxRightOffset;
            this._maxTopOffset = e.maxTopOffset;
            this._maxBottomOffset = e.maxBottomOffset
        }
    },
    _move: function(e) {
        var strategy = this._getStrategy();
        var moveEventData = Object(_utils_index__WEBPACK_IMPORTED_MODULE_1__["eventData"])(e);
        var offset = strategy.calcOffsetRatio.call(this, e);
        offset = this._fitOffset(offset, this.elastic);
        if (moveEventData.time - this._tickData.time > this.TICK_INTERVAL) {
            this._tickData = moveEventData
        }
        this._fireEvent(SWIPE_EVENT, e, {
            offset: offset
        });
        e.preventDefault()
    },
    _end: function(e) {
        var strategy = this._getStrategy();
        var offsetRatio = strategy.calcOffsetRatio.call(this, e);
        var isFast = strategy.isFastSwipe.call(this, e);
        var startOffset = offsetRatio;
        var targetOffset = this._calcTargetOffset(offsetRatio, isFast);
        startOffset = this._fitOffset(startOffset, this.elastic);
        targetOffset = this._fitOffset(targetOffset, false);
        this._fireEvent(SWIPE_END_EVENT, e, {
            offset: startOffset,
            targetOffset: targetOffset
        })
    },
    _fitOffset: function(offset, elastic) {
        var strategy = this._getStrategy();
        var bounds = strategy.getBounds.call(this);
        if (offset < -bounds[0]) {
            return elastic ? (-2 * bounds[0] + offset) / 3 : -bounds[0]
        }
        if (offset > bounds[1]) {
            return elastic ? (2 * bounds[1] + offset) / 3 : bounds[1]
        }
        return offset
    },
    _calcTargetOffset: function(offsetRatio, isFast) {
        var result;
        if (isFast) {
            result = Math.ceil(Math.abs(offsetRatio));
            if (offsetRatio < 0) {
                result = -result
            }
        } else {
            result = Math.round(offsetRatio)
        }
        return result
    }
});
Object(_core_emitter_registrator__WEBPACK_IMPORTED_MODULE_3__["default"])({
    emitter: SwipeEmitter,
    events: [SWIPE_START_EVENT, SWIPE_EVENT, SWIPE_END_EVENT]
});



/***/ }),

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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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

/***/ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.live_update.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/collection/ui.collection_widget.live_update.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _ui_collection_widget_edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.collection_widget.edit */ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _data_array_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/array_utils */ "./node_modules/devextreme/esm/data/array_utils.js");
/* harmony import */ var _data_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data/utils */ "./node_modules/devextreme/esm/data/utils.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_array_compare__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/array_compare */ "./node_modules/devextreme/esm/core/utils/array_compare.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/ui/collection/ui.collection_widget.live_update.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */










var PRIVATE_KEY_FIELD = "__dx_key__";
/* harmony default export */ __webpack_exports__["default"] = (_ui_collection_widget_edit__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(this.callBase(), {
            repaintChangesOnly: false
        })
    },
    ctor: function() {
        this.callBase.apply(this, arguments);
        this._customizeStoreLoadOptions = e => {
            var dataSource = this._dataSource;
            if (dataSource && !dataSource.isLoaded()) {
                this._correctionIndex = 0
            }
            if (this._correctionIndex && e.storeLoadOptions) {
                e.storeLoadOptions.skip += this._correctionIndex
            }
        }, this._dataSource && this._dataSource.on("customizeStoreLoadOptions", this._customizeStoreLoadOptions)
    },
    reload: function() {
        this._correctionIndex = 0
    },
    _init: function() {
        this.callBase();
        this._refreshItemsCache();
        this._correctionIndex = 0
    },
    _findItemElementByKey: function(key) {
        var result = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])();
        var keyExpr = this.key();
        this.itemElements().each((_, item) => {
            var $item = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(item);
            var itemData = this._getItemData($item);
            if (keyExpr ? Object(_data_utils__WEBPACK_IMPORTED_MODULE_5__["keysEqual"])(keyExpr, this.keyOf(itemData), key) : this._isItemEquals(itemData, key)) {
                result = $item;
                return false
            }
        });
        return result
    },
    _dataSourceChangedHandler: function(newItems, e) {
        if (null !== e && void 0 !== e && e.changes) {
            this._modifyByChanges(e.changes)
        } else {
            this.callBase(newItems, e);
            this._refreshItemsCache()
        }
    },
    _isItemEquals: function(item1, item2) {
        if (item1 && item1[PRIVATE_KEY_FIELD]) {
            item1 = item1.data
        }
        try {
            return JSON.stringify(item1) === JSON.stringify(item2)
        } catch (e) {
            return item1 === item2
        }
    },
    _isItemStrictEquals: function(item1, item2) {
        return this._isItemEquals(item1, item2)
    },
    _shouldAddNewGroup: function(changes, items) {
        var result = false;
        if (this.option("grouped")) {
            if (!changes.length) {
                result = true
            }
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(changes, (i, change) => {
                if ("insert" === change.type) {
                    result = true;
                    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(items, (_, item) => {
                        if (void 0 !== change.data.key && change.data.key === item.key) {
                            result = false;
                            return false
                        }
                    })
                }
            })
        }
        return result
    },
    _partialRefresh: function() {
        if (this.option("repaintChangesOnly")) {
            var result = Object(_core_utils_array_compare__WEBPACK_IMPORTED_MODULE_7__["findChanges"])(this._itemsCache, this._editStrategy.itemsGetter(), data => {
                if (data && void 0 !== data[PRIVATE_KEY_FIELD]) {
                    return data[PRIVATE_KEY_FIELD]
                }
                return this.keyOf(data)
            }, this._isItemStrictEquals.bind(this));
            if (result && this._itemsCache.length && !this._shouldAddNewGroup(result, this._itemsCache)) {
                this._modifyByChanges(result, true);
                this._renderEmptyMessage();
                return true
            } else {
                this._refreshItemsCache()
            }
        }
        return false
    },
    _refreshItemsCache: function() {
        if (this.option("repaintChangesOnly")) {
            var items = this._editStrategy.itemsGetter();
            try {
                this._itemsCache = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, [], items);
                if (!this.key()) {
                    this._itemsCache = this._itemsCache.map((itemCache, index) => ({
                        [PRIVATE_KEY_FIELD]: items[index],
                        data: itemCache
                    }))
                }
            } catch (e) {
                this._itemsCache = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])([], items)
            }
        }
    },
    _dispose: function() {
        this._dataSource && this._dataSource.off("customizeStoreLoadOptions", this._customizeStoreLoadOptions);
        this.callBase()
    },
    _updateByChange: function(keyInfo, items, change, isPartialRefresh) {
        if (isPartialRefresh) {
            this._renderItem(change.index, change.data, null, this._findItemElementByKey(change.key))
        } else {
            var changedItem = items[Object(_data_array_utils__WEBPACK_IMPORTED_MODULE_4__["indexByKey"])(keyInfo, items, change.key)];
            if (changedItem) {
                Object(_data_array_utils__WEBPACK_IMPORTED_MODULE_4__["update"])(keyInfo, items, change.key, change.data).done(() => {
                    this._renderItem(items.indexOf(changedItem), changedItem, null, this._findItemElementByKey(change.key))
                })
            }
        }
    },
    _insertByChange: function(keyInfo, items, change, isPartialRefresh) {
        Object(_core_utils_deferred__WEBPACK_IMPORTED_MODULE_6__["when"])(isPartialRefresh || Object(_data_array_utils__WEBPACK_IMPORTED_MODULE_4__["insert"])(keyInfo, items, change.data, change.index)).done(() => {
            var _change$index;
            this._beforeItemElementInserted(change);
            var $itemContainer = this._getItemContainer(change.data);
            this._renderItem(null !== (_change$index = change.index) && void 0 !== _change$index ? _change$index : items.length, change.data, $itemContainer);
            this._afterItemElementInserted();
            this._correctionIndex++
        })
    },
    _getItemContainer: function(changeData) {
        return this._itemContainer()
    },
    _updateSelectionAfterRemoveByChange: function(removeIndex) {
        var selectedIndex = this.option("selectedIndex");
        if (selectedIndex > removeIndex) {
            this.option("selectedIndex", selectedIndex - 1)
        } else if (selectedIndex === removeIndex && 1 === this.option("selectedItems").length) {
            this.option("selectedItems", [])
        } else {
            this._normalizeSelectedItems()
        }
    },
    _beforeItemElementInserted: function(change) {
        var selectedIndex = this.option("selectedIndex");
        if (change.index <= selectedIndex) {
            this.option("selectedIndex", selectedIndex + 1)
        }
    },
    _afterItemElementInserted: _core_utils_common__WEBPACK_IMPORTED_MODULE_9__["noop"],
    _removeByChange: function(keyInfo, items, change, isPartialRefresh) {
        var index = isPartialRefresh ? change.index : Object(_data_array_utils__WEBPACK_IMPORTED_MODULE_4__["indexByKey"])(keyInfo, items, change.key);
        var removedItem = isPartialRefresh ? change.oldItem : items[index];
        if (removedItem) {
            var $removedItemElement = this._findItemElementByKey(change.key);
            var deletedActionArgs = this._extendActionArgs($removedItemElement);
            this._waitDeletingPrepare($removedItemElement).done(() => {
                if (isPartialRefresh) {
                    this._updateIndicesAfterIndex(index - 1);
                    this._afterItemElementDeleted($removedItemElement, deletedActionArgs);
                    this._updateSelectionAfterRemoveByChange(index)
                } else {
                    this._deleteItemElementByIndex(index);
                    this._afterItemElementDeleted($removedItemElement, deletedActionArgs)
                }
            });
            this._correctionIndex--
        }
    },
    _modifyByChanges: function(changes, isPartialRefresh) {
        var items = this._editStrategy.itemsGetter();
        var keyInfo = {
            key: this.key.bind(this),
            keyOf: this.keyOf.bind(this)
        };
        var dataSource = this._dataSource;
        var paginate = dataSource && dataSource.paginate();
        var group = dataSource && dataSource.group();
        if (paginate || group) {
            changes = changes.filter(item => "insert" !== item.type || void 0 !== item.index)
        }
        changes.forEach(change => this["_".concat(change.type, "ByChange")](keyInfo, items, change, isPartialRefresh));
        this._renderedItemsCount = items.length;
        this._refreshItemsCache();
        this._fireContentReadyAction()
    },
    _appendItemToContainer: function($container, $itemFrame, index) {
        var nextSiblingElement = $container.children(this._itemSelector()).get(index);
        _core_dom_adapter__WEBPACK_IMPORTED_MODULE_8__["default"].insertElement($container.get(0), $itemFrame.get(0), nextSiblingElement)
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "items":
                var isItemsUpdated = this._partialRefresh(args.value);
                if (!isItemsUpdated) {
                    this.callBase(args)
                }
                break;
            case "dataSource":
                if (!this.option("repaintChangesOnly") || !args.value) {
                    this.option("items", [])
                }
                this.callBase(args);
                break;
            case "repaintChangesOnly":
                break;
            default:
                this.callBase(args)
        }
    }
}));


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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
            visible: this.option("opened"),
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

/***/ "./node_modules/devextreme/esm/ui/list/item.js":
/*!*****************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/list/item.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _collection_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../collection/item */ "./node_modules/devextreme/esm/ui/collection/item.js");
/**
 * DevExtreme (esm/ui/list/item.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var LIST_ITEM_BADGE_CONTAINER_CLASS = "dx-list-item-badge-container";
var LIST_ITEM_BADGE_CLASS = "dx-list-item-badge";
var BADGE_CLASS = "dx-badge";
var LIST_ITEM_CHEVRON_CONTAINER_CLASS = "dx-list-item-chevron-container";
var LIST_ITEM_CHEVRON_CLASS = "dx-list-item-chevron";
var ListItem = _collection_item__WEBPACK_IMPORTED_MODULE_1__["default"].inherit({
    _renderWatchers: function() {
        this.callBase();
        this._startWatcher("badge", this._renderBadge.bind(this));
        this._startWatcher("showChevron", this._renderShowChevron.bind(this))
    },
    _renderBadge: function(badge) {
        this._$element.children("." + LIST_ITEM_BADGE_CONTAINER_CLASS).remove();
        if (!badge) {
            return
        }
        var $badge = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(LIST_ITEM_BADGE_CONTAINER_CLASS).append(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(LIST_ITEM_BADGE_CLASS).addClass(BADGE_CLASS).text(badge));
        var $chevron = this._$element.children("." + LIST_ITEM_CHEVRON_CONTAINER_CLASS).first();
        $chevron.length > 0 ? $badge.insertBefore($chevron) : $badge.appendTo(this._$element)
    },
    _renderShowChevron: function(showChevron) {
        this._$element.children("." + LIST_ITEM_CHEVRON_CONTAINER_CLASS).remove();
        if (!showChevron) {
            return
        }
        var $chevronContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(LIST_ITEM_CHEVRON_CONTAINER_CLASS);
        var $chevron = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(LIST_ITEM_CHEVRON_CLASS);
        $chevronContainer.append($chevron).appendTo(this._$element)
    }
});
/* harmony default export */ __webpack_exports__["default"] = (ListItem);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/list/ui.list.base.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/list/ui.list.base.js ***!
  \*************************************************************/
/*! exports provided: ListBase, setScrollView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListBase", function() { return ListBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScrollView", function() { return setScrollView; });
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/icon */ "./node_modules/devextreme/esm/core/utils/icon.js");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/element */ "./node_modules/devextreme/esm/core/element.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/data */ "./node_modules/devextreme/esm/core/utils/data.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _animation_fx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../animation/fx */ "./node_modules/devextreme/esm/animation/fx.js");
/* harmony import */ var _events_click__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../events/click */ "./node_modules/devextreme/esm/events/click.js");
/* harmony import */ var _events_swipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../events/swipe */ "./node_modules/devextreme/esm/events/swipe.js");
/* harmony import */ var _core_utils_support__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/utils/support */ "./node_modules/devextreme/esm/core/utils/support.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _widget_utils_ink_ripple__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../widget/utils.ink_ripple */ "./node_modules/devextreme/esm/ui/widget/utils.ink_ripple.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./item */ "./node_modules/devextreme/esm/ui/list/item.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../button */ "./node_modules/devextreme/esm/ui/button.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../themes */ "./node_modules/devextreme/esm/ui/themes.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _scroll_view__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../scroll_view */ "./node_modules/devextreme/esm/ui/scroll_view.js");
/* harmony import */ var _scroll_view_ui_scrollable_device__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../scroll_view/ui.scrollable.device */ "./node_modules/devextreme/esm/ui/scroll_view/ui.scrollable.device.js");
/* harmony import */ var _collection_ui_collection_widget_live_update__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../collection/ui.collection_widget.live_update */ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.live_update.js");
/* harmony import */ var _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../core/templates/bindable_template */ "./node_modules/devextreme/esm/core/templates/bindable_template.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _shared_grouped_data_converter_mixin__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../shared/grouped_data_converter_mixin */ "./node_modules/devextreme/esm/ui/shared/grouped_data_converter_mixin.js");
/**
 * DevExtreme (esm/ui/list/ui.list.base.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




























var LIST_CLASS = "dx-list";
var LIST_ITEM_CLASS = "dx-list-item";
var LIST_ITEM_SELECTOR = "." + LIST_ITEM_CLASS;
var LIST_ITEM_ICON_CONTAINER_CLASS = "dx-list-item-icon-container";
var LIST_ITEM_ICON_CLASS = "dx-list-item-icon";
var LIST_GROUP_CLASS = "dx-list-group";
var LIST_GROUP_HEADER_CLASS = "dx-list-group-header";
var LIST_GROUP_BODY_CLASS = "dx-list-group-body";
var LIST_COLLAPSIBLE_GROUPS_CLASS = "dx-list-collapsible-groups";
var LIST_GROUP_COLLAPSED_CLASS = "dx-list-group-collapsed";
var LIST_GROUP_HEADER_INDICATOR_CLASS = "dx-list-group-header-indicator";
var LIST_HAS_NEXT_CLASS = "dx-has-next";
var LIST_NEXT_BUTTON_CLASS = "dx-list-next-button";
var WRAP_ITEM_TEXT_CLASS = "dx-wrap-item-text";
var SELECT_ALL_ITEM_SELECTOR = ".dx-list-select-all";
var LIST_ITEM_DATA_KEY = "dxListItemData";
var LIST_FEEDBACK_SHOW_TIMEOUT = 70;
var groupItemsGetter = Object(_core_utils_data__WEBPACK_IMPORTED_MODULE_8__["compileGetter"])("items");
var _scrollView;
var ListBase = _collection_ui_collection_widget_live_update__WEBPACK_IMPORTED_MODULE_24__["default"].inherit({
    _activeStateUnit: [LIST_ITEM_SELECTOR, SELECT_ALL_ITEM_SELECTOR].join(","),
    _supportedKeys: function() {
        var that = this;
        var moveFocusPerPage = function(direction) {
            var $item = getEdgeVisibleItem(direction);
            var isFocusedItem = $item.is(that.option("focusedElement"));
            if (isFocusedItem) {
                ! function($item, direction) {
                    var resultPosition = $item.position().top;
                    if ("prev" === direction) {
                        resultPosition = $item.position().top - Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(that.$element()) + Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($item)
                    }
                    that.scrollTo(resultPosition)
                }($item, direction);
                $item = getEdgeVisibleItem(direction)
            }
            that.option("focusedElement", Object(_core_element__WEBPACK_IMPORTED_MODULE_6__["getPublicElement"])($item));
            that.scrollToItem($item)
        };

        function getEdgeVisibleItem(direction) {
            var scrollTop = that.scrollTop();
            var containerHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(that.$element());
            var $item = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(that.option("focusedElement"));
            var isItemVisible = true;
            if (!$item.length) {
                return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])()
            }
            while (isItemVisible) {
                var $nextItem = $item[direction]();
                if (!$nextItem.length) {
                    break
                }
                var nextItemLocation = $nextItem.position().top + Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($nextItem) / 2;
                isItemVisible = nextItemLocation < containerHeight + scrollTop && nextItemLocation > scrollTop;
                if (isItemVisible) {
                    $item = $nextItem
                }
            }
            return $item
        }
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this.callBase(), {
            leftArrow: _core_utils_common__WEBPACK_IMPORTED_MODULE_3__["noop"],
            rightArrow: _core_utils_common__WEBPACK_IMPORTED_MODULE_3__["noop"],
            pageUp: function() {
                moveFocusPerPage("prev");
                return false
            },
            pageDown: function() {
                moveFocusPerPage("next");
                return false
            }
        })
    },
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this.callBase(), {
            hoverStateEnabled: true,
            pullRefreshEnabled: false,
            scrollingEnabled: true,
            showScrollbar: "onScroll",
            useNativeScrolling: true,
            bounceEnabled: true,
            scrollByContent: true,
            scrollByThumb: false,
            pullingDownText: _localization_message__WEBPACK_IMPORTED_MODULE_14__["default"].format("dxList-pullingDownText"),
            pulledDownText: _localization_message__WEBPACK_IMPORTED_MODULE_14__["default"].format("dxList-pulledDownText"),
            refreshingText: _localization_message__WEBPACK_IMPORTED_MODULE_14__["default"].format("dxList-refreshingText"),
            pageLoadingText: _localization_message__WEBPACK_IMPORTED_MODULE_14__["default"].format("dxList-pageLoadingText"),
            onScroll: null,
            onPullRefresh: null,
            onPageLoading: null,
            pageLoadMode: "scrollBottom",
            nextButtonText: _localization_message__WEBPACK_IMPORTED_MODULE_14__["default"].format("dxList-nextButtonText"),
            onItemSwipe: null,
            grouped: false,
            onGroupRendered: null,
            collapsibleGroups: false,
            groupTemplate: "group",
            indicateLoading: true,
            activeStateEnabled: true,
            _itemAttributes: {
                role: "option"
            },
            _listAttributes: {
                role: "listbox"
            },
            useInkRipple: false,
            wrapItemText: false,
            _swipeEnabled: true,
            _revertPageOnEmptyLoad: false,
            showChevronExpr: function(data) {
                return data ? data.showChevron : void 0
            },
            badgeExpr: function(data) {
                return data ? data.badge : void 0
            }
        })
    },
    _defaultOptionsRules: function() {
        var themeName = Object(_themes__WEBPACK_IMPORTED_MODULE_20__["current"])();
        return this.callBase().concat(Object(_scroll_view_ui_scrollable_device__WEBPACK_IMPORTED_MODULE_23__["deviceDependentOptions"])(), [{
            device: function() {
                return !_core_utils_support__WEBPACK_IMPORTED_MODULE_13__["nativeScrolling"]
            },
            options: {
                useNativeScrolling: false
            }
        }, {
            device: function(_device) {
                return !_core_utils_support__WEBPACK_IMPORTED_MODULE_13__["nativeScrolling"] && !_core_devices__WEBPACK_IMPORTED_MODULE_16__["default"].isSimulator() && "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_16__["default"].real().deviceType && "generic" === _device.platform
            },
            options: {
                showScrollbar: "onHover",
                pageLoadMode: "nextButton"
            }
        }, {
            device: function() {
                return "desktop" === _core_devices__WEBPACK_IMPORTED_MODULE_16__["default"].real().deviceType && !_core_devices__WEBPACK_IMPORTED_MODULE_16__["default"].isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return Object(_themes__WEBPACK_IMPORTED_MODULE_20__["isMaterial"])(themeName)
            },
            options: {
                pullingDownText: "",
                pulledDownText: "",
                refreshingText: "",
                pageLoadingText: "",
                useInkRipple: true
            }
        }])
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._updateLoadingState(true)
        }
    },
    _itemClass: function() {
        return LIST_ITEM_CLASS
    },
    _itemDataKey: function() {
        return LIST_ITEM_DATA_KEY
    },
    _itemContainer: function() {
        return this._$container
    },
    _saveSelectionChangeEvent: function(e) {
        this._selectionChangeEventInstance = e
    },
    _getSelectionChangeEvent: function() {
        return this._selectionChangeEventInstance
    },
    _refreshItemElements: function() {
        if (!this.option("grouped")) {
            this._itemElementsCache = this._itemContainer().children(this._itemSelector())
        } else {
            this._itemElementsCache = this._itemContainer().children("." + LIST_GROUP_CLASS).children("." + LIST_GROUP_BODY_CLASS).children(this._itemSelector())
        }
    },
    _modifyByChanges: function() {
        this.callBase.apply(this, arguments);
        this._refreshItemElements();
        this._updateLoadingState(true)
    },
    reorderItem: function(itemElement, toItemElement) {
        var promise = this.callBase(itemElement, toItemElement);
        return promise.done((function() {
            this._refreshItemElements()
        }))
    },
    deleteItem: function(itemElement) {
        var promise = this.callBase(itemElement);
        return promise.done((function() {
            this._refreshItemElements()
        }))
    },
    _itemElements: function() {
        return this._itemElementsCache
    },
    _itemSelectHandler: function(e) {
        if ("single" === this.option("selectionMode") && this.isItemSelected(e.currentTarget)) {
            return
        }
        return this.callBase(e)
    },
    _allowDynamicItemsAppend: function() {
        return true
    },
    _resetDataSourcePageIndex: function() {
        var currentDataSource = this.getDataSource();
        if (currentDataSource && 0 !== currentDataSource.pageIndex()) {
            currentDataSource.pageIndex(0);
            currentDataSource.load()
        }
    },
    _init: function() {
        this.callBase();
        this._resetDataSourcePageIndex();
        this._$container = this.$element();
        this._initScrollView();
        this._feedbackShowTimeout = LIST_FEEDBACK_SHOW_TIMEOUT;
        this._createGroupRenderAction()
    },
    _scrollBottomMode: function() {
        return "scrollBottom" === this.option("pageLoadMode")
    },
    _nextButtonMode: function() {
        return "nextButton" === this.option("pageLoadMode")
    },
    _dataSourceOptions: function() {
        var scrollBottom = this._scrollBottomMode();
        var nextButton = this._nextButtonMode();
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this.callBase(), {
            paginate: Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_3__["ensureDefined"])(scrollBottom || nextButton, true)
        })
    },
    _getGroupedOption: function() {
        return this.option("grouped")
    },
    _getGroupContainerByIndex: function(groupIndex) {
        return this._itemContainer().find(".".concat(LIST_GROUP_CLASS)).eq(groupIndex).find(".".concat(LIST_GROUP_BODY_CLASS))
    },
    _dataSourceFromUrlLoadMode: function() {
        return "raw"
    },
    _initScrollView: function() {
        var scrollingEnabled = this.option("scrollingEnabled");
        var pullRefreshEnabled = scrollingEnabled && this.option("pullRefreshEnabled");
        var autoPagingEnabled = scrollingEnabled && this._scrollBottomMode() && !!this._dataSource;
        this._scrollView = this._createComponent(this.$element(), getScrollView(), {
            disabled: this.option("disabled") || !scrollingEnabled,
            onScroll: this._scrollHandler.bind(this),
            onPullDown: pullRefreshEnabled ? this._pullDownHandler.bind(this) : null,
            onReachBottom: autoPagingEnabled ? this._scrollBottomHandler.bind(this) : null,
            showScrollbar: this.option("showScrollbar"),
            useNative: this.option("useNativeScrolling"),
            bounceEnabled: this.option("bounceEnabled"),
            scrollByContent: this.option("scrollByContent"),
            scrollByThumb: this.option("scrollByThumb"),
            pullingDownText: this.option("pullingDownText"),
            pulledDownText: this.option("pulledDownText"),
            refreshingText: this.option("refreshingText"),
            reachBottomText: this.option("pageLoadingText"),
            useKeyboard: false
        });
        this._$container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(this._scrollView.content());
        if (this.option("wrapItemText")) {
            this._$container.addClass(WRAP_ITEM_TEXT_CLASS)
        }
        this._createScrollViewActions()
    },
    _createScrollViewActions: function() {
        this._scrollAction = this._createActionByOption("onScroll");
        this._pullRefreshAction = this._createActionByOption("onPullRefresh");
        this._pageLoadingAction = this._createActionByOption("onPageLoading")
    },
    _scrollHandler: function(e) {
        this._scrollAction && this._scrollAction(e)
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates({
            group: new _core_templates_bindable_template__WEBPACK_IMPORTED_MODULE_25__["BindableTemplate"]((function($container, data) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isPlainObject"])(data)) {
                    if (data.key) {
                        $container.text(data.key)
                    }
                } else {
                    $container.text(String(data))
                }
            }), ["key"], this.option("integrationOptions.watchMethod"))
        });
        this.callBase()
    },
    _prepareDefaultItemTemplate: function(data, $container) {
        this.callBase(data, $container);
        if (data.icon) {
            var $icon = Object(_core_utils_icon__WEBPACK_IMPORTED_MODULE_5__["getImageContainer"])(data.icon).addClass(LIST_ITEM_ICON_CLASS);
            var $iconContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(LIST_ITEM_ICON_CONTAINER_CLASS);
            $iconContainer.append($icon);
            $container.prepend($iconContainer)
        }
    },
    _getBindableFields: function() {
        return ["text", "html", "icon"]
    },
    _updateLoadingState: function(tryLoadMore) {
        var isDataLoaded = !tryLoadMore || this._isLastPage();
        var scrollBottomMode = this._scrollBottomMode();
        var stopLoading = isDataLoaded || !scrollBottomMode;
        var hideLoadIndicator = stopLoading && !this._isDataSourceLoading();
        if (stopLoading || this._scrollViewIsFull()) {
            this._scrollView.release(hideLoadIndicator);
            this._toggleNextButton(this._shouldRenderNextButton() && !this._isLastPage());
            this._loadIndicationSuppressed(false)
        } else {
            this._infiniteDataLoading()
        }
    },
    _shouldRenderNextButton: function() {
        return this._nextButtonMode() && this._dataSource && this._dataSource.isLoaded()
    },
    _isDataSourceFirstLoadCompleted: function(newValue) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(newValue)) {
            this._isFirstLoadCompleted = newValue
        }
        return this._isFirstLoadCompleted
    },
    _dataSourceLoadingChangedHandler: function(isLoading) {
        if (this._loadIndicationSuppressed()) {
            return
        }
        if (isLoading && this.option("indicateLoading")) {
            this._showLoadingIndicatorTimer = setTimeout(function() {
                var isEmpty = !this._itemElements().length;
                var shouldIndicateLoading = !isEmpty || this._isDataSourceFirstLoadCompleted();
                if (shouldIndicateLoading) {
                    var _this$_scrollView;
                    null === (_this$_scrollView = this._scrollView) || void 0 === _this$_scrollView ? void 0 : _this$_scrollView.startLoading()
                }
            }.bind(this))
        } else {
            clearTimeout(this._showLoadingIndicatorTimer);
            this._scrollView && this._scrollView.finishLoading()
        }
        if (!isLoading) {
            this._isDataSourceFirstLoadCompleted(false)
        }
    },
    _dataSourceChangedHandler: function() {
        if (!this._shouldAppendItems() && Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_21__["hasWindow"])()) {
            this._scrollView && this._scrollView.scrollTo(0)
        }
        this.callBase.apply(this, arguments);
        this._isDataSourceFirstLoadCompleted(true)
    },
    _refreshContent: function() {
        this._prepareContent();
        this._fireContentReadyAction()
    },
    _hideLoadingIfLoadIndicationOff: function() {
        if (!this.option("indicateLoading")) {
            this._dataSourceLoadingChangedHandler(false)
        }
    },
    _loadIndicationSuppressed: function(value) {
        if (!arguments.length) {
            return this._isLoadIndicationSuppressed
        }
        this._isLoadIndicationSuppressed = value
    },
    _scrollViewIsFull: function() {
        var scrollView = this._scrollView;
        return !scrollView || Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(scrollView.content()) > Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(scrollView.container())
    },
    _pullDownHandler: function(e) {
        this._pullRefreshAction(e);
        if (this._dataSource && !this._isDataSourceLoading()) {
            this._clearSelectedItems();
            this._dataSource.pageIndex(0);
            this._dataSource.reload()
        } else {
            this._updateLoadingState()
        }
    },
    _infiniteDataLoading: function() {
        var isElementVisible = this.$element().is(":visible");
        if (isElementVisible && !this._scrollViewIsFull() && !this._isDataSourceLoading() && !this._isLastPage()) {
            clearTimeout(this._loadNextPageTimer);
            this._loadNextPageTimer = setTimeout(() => {
                this._loadNextPage().done(this._setPreviousPageIfNewIsEmpty.bind(this))
            })
        }
    },
    _setPreviousPageIfNewIsEmpty: function(result) {
        if (this.option("_revertPageOnEmptyLoad")) {
            var dataSource = this.getDataSource();
            var pageIndex = null === dataSource || void 0 === dataSource ? void 0 : dataSource.pageIndex();
            if (0 === (null === result || void 0 === result ? void 0 : result.length) && pageIndex > 0) {
                this._fireContentReadyAction();
                dataSource.pageIndex(pageIndex - 1)
            }
        }
    },
    _scrollBottomHandler: function(e) {
        this._pageLoadingAction(e);
        if (!this._isDataSourceLoading() && !this._isLastPage()) {
            this._loadNextPage()
        } else {
            this._updateLoadingState()
        }
    },
    _renderItems: function(items) {
        if (this.option("grouped")) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(items, this._renderGroup.bind(this));
            this._attachGroupCollapseEvent();
            this._renderEmptyMessage();
            if (Object(_themes__WEBPACK_IMPORTED_MODULE_20__["isMaterial"])()) {
                this.attachGroupHeaderInkRippleEvents()
            }
        } else {
            this.callBase.apply(this, arguments)
        }
        this._refreshItemElements();
        this._updateLoadingState(true)
    },
    _attachGroupCollapseEvent: function() {
        var eventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_19__["addNamespace"])(_events_click__WEBPACK_IMPORTED_MODULE_11__["name"], this.NAME);
        var selector = "." + LIST_GROUP_HEADER_CLASS;
        var $element = this.$element();
        var collapsibleGroups = this.option("collapsibleGroups");
        $element.toggleClass(LIST_COLLAPSIBLE_GROUPS_CLASS, collapsibleGroups);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off($element, eventName, selector);
        if (collapsibleGroups) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on($element, eventName, selector, function(e) {
                this._createAction(function(e) {
                    var $group = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.event.currentTarget).parent();
                    this._collapseGroupHandler($group);
                    if (this.option("focusStateEnabled")) {
                        this.option("focusedElement", Object(_core_element__WEBPACK_IMPORTED_MODULE_6__["getPublicElement"])($group.find("." + LIST_ITEM_CLASS).eq(0)))
                    }
                }.bind(this), {
                    validatingTargetName: "element"
                })({
                    event: e
                })
            }.bind(this))
        }
    },
    _collapseGroupHandler: function($group, toggle) {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_26__["Deferred"];
        if ($group.hasClass(LIST_GROUP_COLLAPSED_CLASS) === toggle) {
            return deferred.resolve()
        }
        var $groupBody = $group.children("." + LIST_GROUP_BODY_CLASS);
        var startHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($groupBody);
        var endHeight = 0;
        if (0 === startHeight) {
            Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["setHeight"])($groupBody, "auto");
            endHeight = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getOuterHeight"])($groupBody)
        }
        $group.toggleClass(LIST_GROUP_COLLAPSED_CLASS, toggle);
        _animation_fx__WEBPACK_IMPORTED_MODULE_10__["default"].animate($groupBody, {
            type: "custom",
            from: {
                height: startHeight
            },
            to: {
                height: endHeight
            },
            duration: 200,
            complete: function() {
                this.updateDimensions();
                this._updateLoadingState();
                deferred.resolve()
            }.bind(this)
        });
        return deferred.promise()
    },
    _dataSourceLoadErrorHandler: function() {
        this._forgetNextPageLoading();
        if (this._initialized) {
            this._renderEmptyMessage();
            this._updateLoadingState()
        }
    },
    _initMarkup: function() {
        this._itemElementsCache = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])();
        this.$element().addClass(LIST_CLASS);
        this.callBase();
        this.option("useInkRipple") && this._renderInkRipple();
        this.setAria("role", this.option("_listAttributes").role)
    },
    _renderInkRipple: function() {
        this._inkRipple = Object(_widget_utils_ink_ripple__WEBPACK_IMPORTED_MODULE_15__["render"])()
    },
    _toggleActiveState: function($element, value, e) {
        this.callBase.apply(this, arguments);
        var that = this;
        if (!this._inkRipple) {
            return
        }
        var config = {
            element: $element,
            event: e
        };
        if (value) {
            if (Object(_themes__WEBPACK_IMPORTED_MODULE_20__["isMaterial"])()) {
                this._inkRippleTimer = setTimeout((function() {
                    that._inkRipple.showWave(config)
                }), LIST_FEEDBACK_SHOW_TIMEOUT / 2)
            } else {
                that._inkRipple.showWave(config)
            }
        } else {
            clearTimeout(this._inkRippleTimer);
            this._inkRipple.hideWave(config)
        }
    },
    _postprocessRenderItem: function(args) {
        this._refreshItemElements();
        this.callBase.apply(this, arguments);
        if (this.option("_swipeEnabled")) {
            this._attachSwipeEvent(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(args.itemElement))
        }
    },
    _attachSwipeEvent: function($itemElement) {
        var endEventName = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_19__["addNamespace"])(_events_swipe__WEBPACK_IMPORTED_MODULE_12__["end"], this.NAME);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on($itemElement, endEventName, this._itemSwipeEndHandler.bind(this))
    },
    _itemSwipeEndHandler: function(e) {
        this._itemDXEventHandler(e, "onItemSwipe", {
            direction: e.offset < 0 ? "left" : "right"
        })
    },
    _nextButtonHandler: function(e) {
        this._pageLoadingAction(e);
        var source = this._dataSource;
        if (source && !source.isLoading()) {
            this._scrollView.toggleLoading(true);
            this._$nextButton.detach();
            this._loadIndicationSuppressed(true);
            this._loadNextPage()
        }
    },
    _renderGroup: function(index, group) {
        var $groupElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(LIST_GROUP_CLASS).appendTo(this._itemContainer());
        var $groupHeaderElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(LIST_GROUP_HEADER_CLASS).appendTo($groupElement);
        var groupTemplateName = this.option("groupTemplate");
        var groupTemplate = this._getTemplate(group.template || groupTemplateName, group, index, $groupHeaderElement);
        var renderArgs = {
            index: index,
            itemData: group,
            container: Object(_core_element__WEBPACK_IMPORTED_MODULE_6__["getPublicElement"])($groupHeaderElement)
        };
        this._createItemByTemplate(groupTemplate, renderArgs);
        if (Object(_themes__WEBPACK_IMPORTED_MODULE_20__["isMaterial"])()) {
            Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(LIST_GROUP_HEADER_INDICATOR_CLASS).prependTo($groupHeaderElement)
        }
        this._renderingGroupIndex = index;
        var $groupBody = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(LIST_GROUP_BODY_CLASS).appendTo($groupElement);
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_7__["each"])(groupItemsGetter(group) || [], function(itemIndex, item) {
            this._renderItem({
                group: index,
                item: itemIndex
            }, item, $groupBody)
        }.bind(this));
        this._groupRenderAction({
            groupElement: Object(_core_element__WEBPACK_IMPORTED_MODULE_6__["getPublicElement"])($groupElement),
            groupIndex: index,
            groupData: group
        })
    },
    downInkRippleHandler: function(e) {
        this._toggleActiveState(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.currentTarget), true, e)
    },
    upInkRippleHandler: function(e) {
        this._toggleActiveState(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(e.currentTarget), false)
    },
    attachGroupHeaderInkRippleEvents: function() {
        var selector = "." + LIST_GROUP_HEADER_CLASS;
        var $element = this.$element();
        this._downInkRippleHandler = this._downInkRippleHandler || this.downInkRippleHandler.bind(this);
        this._upInkRippleHandler = this._upInkRippleHandler || this.upInkRippleHandler.bind(this);
        var downArguments = [$element, "dxpointerdown", selector, this._downInkRippleHandler];
        var upArguments = [$element, "dxpointerup dxpointerout", selector, this._upInkRippleHandler];
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(...downArguments);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(...downArguments);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].off(...upArguments);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_2__["default"].on(...upArguments)
    },
    _createGroupRenderAction: function() {
        this._groupRenderAction = this._createActionByOption("onGroupRendered")
    },
    _clean: function() {
        clearTimeout(this._inkRippleTimer);
        if (this._$nextButton) {
            this._$nextButton.remove();
            this._$nextButton = null
        }
        delete this._inkRipple;
        this.callBase.apply(this, arguments)
    },
    _dispose: function() {
        this._isDataSourceFirstLoadCompleted(false);
        clearTimeout(this._holdTimer);
        clearTimeout(this._loadNextPageTimer);
        clearTimeout(this._showLoadingIndicatorTimer);
        this.callBase()
    },
    _toggleDisabledState: function(value) {
        this.callBase(value);
        this._scrollView.option("disabled", value || !this.option("scrollingEnabled"))
    },
    _toggleNextButton: function(value) {
        var dataSource = this._dataSource;
        var $nextButton = this._getNextButton();
        this.$element().toggleClass(LIST_HAS_NEXT_CLASS, value);
        if (value && dataSource && dataSource.isLoaded()) {
            $nextButton.appendTo(this._itemContainer())
        }
        if (!value) {
            $nextButton.detach()
        }
    },
    _getNextButton: function() {
        if (!this._$nextButton) {
            this._$nextButton = this._createNextButton()
        }
        return this._$nextButton
    },
    _createNextButton: function() {
        var $result = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").addClass(LIST_NEXT_BUTTON_CLASS);
        var $button = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])("<div>").appendTo($result);
        this._createComponent($button, _button__WEBPACK_IMPORTED_MODULE_18__["default"], {
            text: this.option("nextButtonText"),
            onClick: this._nextButtonHandler.bind(this),
            type: Object(_themes__WEBPACK_IMPORTED_MODULE_20__["isMaterial"])() ? "default" : void 0,
            integrationOptions: {}
        });
        return $result
    },
    _moveFocus: function() {
        this.callBase.apply(this, arguments);
        this.scrollToItem(this.option("focusedElement"))
    },
    _refresh: function() {
        if (!Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_21__["hasWindow"])()) {
            this.callBase()
        } else {
            var scrollTop = this._scrollView.scrollTop();
            this.callBase();
            scrollTop && this._scrollView.scrollTo(scrollTop)
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "pageLoadMode":
                this._toggleNextButton(args.value);
                this._initScrollView();
                break;
            case "dataSource":
                this.callBase(args);
                this._initScrollView();
                this._isDataSourceFirstLoadCompleted(false);
                break;
            case "items":
                this.callBase(args);
                this._isDataSourceFirstLoadCompleted(false);
                break;
            case "pullingDownText":
            case "pulledDownText":
            case "refreshingText":
            case "pageLoadingText":
            case "showScrollbar":
            case "bounceEnabled":
            case "scrollByContent":
            case "scrollByThumb":
            case "useNativeScrolling":
            case "scrollingEnabled":
            case "pullRefreshEnabled":
                this._initScrollView();
                this._updateLoadingState();
                break;
            case "nextButtonText":
            case "onItemSwipe":
            case "useInkRipple":
                this._invalidate();
                break;
            case "onScroll":
            case "onPullRefresh":
            case "onPageLoading":
                this._createScrollViewActions();
                break;
            case "grouped":
            case "collapsibleGroups":
            case "groupTemplate":
                this._invalidate();
                break;
            case "wrapItemText":
                this._$container.toggleClass(WRAP_ITEM_TEXT_CLASS, args.value);
                break;
            case "onGroupRendered":
                this._createGroupRenderAction();
                break;
            case "width":
            case "height":
                this.callBase(args);
                this._scrollView.update();
                break;
            case "indicateLoading":
                this._hideLoadingIfLoadIndicationOff();
                break;
            case "visible":
                this.callBase(args);
                this._scrollView.update();
                break;
            case "rtlEnabled":
                this._initScrollView();
                this.callBase(args);
                break;
            case "showChevronExpr":
            case "badgeExpr":
                this._invalidate();
                break;
            case "_swipeEnabled":
            case "_revertPageOnEmptyLoad":
            case "_listAttributes":
                break;
            default:
                this.callBase(args)
        }
    },
    _extendActionArgs: function($itemElement) {
        if (!this.option("grouped")) {
            return this.callBase($itemElement)
        }
        var $group = $itemElement.closest("." + LIST_GROUP_CLASS);
        var $item = $group.find("." + LIST_ITEM_CLASS);
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_9__["extend"])(this.callBase($itemElement), {
            itemIndex: {
                group: $group.index(),
                item: $item.index($itemElement)
            }
        })
    },
    expandGroup: function(groupIndex) {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_26__["Deferred"];
        var $group = this._itemContainer().find("." + LIST_GROUP_CLASS).eq(groupIndex);
        this._collapseGroupHandler($group, false).done(function() {
            deferred.resolveWith(this)
        }.bind(this));
        return deferred.promise()
    },
    collapseGroup: function(groupIndex) {
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_26__["Deferred"];
        var $group = this._itemContainer().find("." + LIST_GROUP_CLASS).eq(groupIndex);
        this._collapseGroupHandler($group, true).done(function() {
            deferred.resolveWith(this)
        }.bind(this));
        return deferred
    },
    updateDimensions: function() {
        var that = this;
        var deferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_26__["Deferred"];
        if (that._scrollView) {
            that._scrollView.update().done((function() {
                !that._scrollViewIsFull() && that._updateLoadingState(true);
                deferred.resolveWith(that)
            }))
        } else {
            deferred.resolveWith(that)
        }
        return deferred.promise()
    },
    reload: function() {
        this.callBase();
        this.scrollTo(0);
        this._pullDownHandler()
    },
    repaint: function() {
        this.scrollTo(0);
        this.callBase()
    },
    scrollTop: function() {
        return this._scrollView.scrollOffset().top
    },
    clientHeight: function() {
        return this._scrollView.clientHeight()
    },
    scrollHeight: function() {
        return this._scrollView.scrollHeight()
    },
    scrollBy: function(distance) {
        this._scrollView.scrollBy(distance)
    },
    scrollTo: function(location) {
        this._scrollView.scrollTo(location)
    },
    scrollToItem: function(itemElement) {
        var $item = this._editStrategy.getItemElement(itemElement);
        this._scrollView.scrollToElement(null === $item || void 0 === $item ? void 0 : $item.get(0))
    },
    _dimensionChanged: function() {
        this.updateDimensions()
    }
}).include(_shared_grouped_data_converter_mixin__WEBPACK_IMPORTED_MODULE_27__["default"]);
ListBase.ItemClass = _item__WEBPACK_IMPORTED_MODULE_17__["default"];

function getScrollView() {
    return _scrollView || _scroll_view__WEBPACK_IMPORTED_MODULE_22__["default"]
}
function setScrollView(value) {
    _scrollView = value
}


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/list/ui.list.edit.decorator_registry.js":
/*!********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/list/ui.list.edit.decorator_registry.js ***!
  \********************************************************************************/
/*! exports provided: registry, register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registry", function() { return registry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/**
 * DevExtreme (esm/ui/list/ui.list.edit.decorator_registry.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var registry = {};
function register(option, type, decoratorClass) {
    var decoratorsRegistry = registry;
    var decoratorConfig = {};
    decoratorConfig[option] = decoratorsRegistry[option] ? decoratorsRegistry[option] : {};
    decoratorConfig[option][type] = decoratorClass;
    Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(decoratorsRegistry, decoratorConfig)
}


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/list/ui.list.edit.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/list/ui.list.edit.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _ui_list_edit_strategy_grouped__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui.list.edit.strategy.grouped */ "./node_modules/devextreme/esm/ui/list/ui.list.edit.strategy.grouped.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _ui_list_edit_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui.list.edit.provider */ "./node_modules/devextreme/esm/ui/list/ui.list.edit.provider.js");
/* harmony import */ var _ui_list_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui.list.base */ "./node_modules/devextreme/esm/ui/list/ui.list.base.js");
/**
 * DevExtreme (esm/ui/list/ui.list.edit.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var LIST_ITEM_SELECTED_CLASS = "dx-list-item-selected";
var LIST_ITEM_RESPONSE_WAIT_CLASS = "dx-list-item-response-wait";
var ListEdit = _ui_list_base__WEBPACK_IMPORTED_MODULE_6__["ListBase"].inherit({
    _supportedKeys() {
        var that = this;
        var parent = this.callBase();
        var moveFocusedItem = (e, moveUp) => {
            var editStrategy = this._editStrategy;
            var focusedElement = this.option("focusedElement");
            var focusedItemIndex = editStrategy.getNormalizedIndex(focusedElement);
            var isLastIndexFocused = focusedItemIndex === this._getLastItemIndex();
            if (isLastIndexFocused && this._isDataSourceLoading()) {
                return
            }
            if (e.shiftKey && that.option("itemDragging.allowReordering")) {
                var nextItemIndex = focusedItemIndex + (moveUp ? -1 : 1);
                var $nextItem = editStrategy.getItemElement(nextItemIndex);
                this.reorderItem(focusedElement, $nextItem);
                this.scrollToItem(focusedElement);
                e.preventDefault()
            } else {
                var editProvider = this._editProvider;
                var isInternalMoving = editProvider.handleKeyboardEvents(focusedItemIndex, moveUp);
                if (!isInternalMoving) {
                    moveUp ? parent.upArrow(e) : parent.downArrow(e)
                }
            }
        };
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, parent, {
            del: e => {
                if (that.option("allowItemDeleting")) {
                    e.preventDefault();
                    that.deleteItem(that.option("focusedElement"))
                }
            },
            upArrow: e => moveFocusedItem(e, true),
            downArrow: e => moveFocusedItem(e),
            enter: function(e) {
                if (!this._editProvider.handleEnterPressing(e)) {
                    parent.enter.apply(this, arguments)
                }
            },
            space: function(e) {
                if (!this._editProvider.handleEnterPressing(e)) {
                    parent.space.apply(this, arguments)
                }
            }
        })
    },
    _updateSelection() {
        this._editProvider.afterItemsRendered();
        this.callBase()
    },
    _getLastItemIndex() {
        return this._itemElements().length - 1
    },
    _refreshItemElements() {
        this.callBase();
        var excludedSelectors = this._editProvider.getExcludedItemSelectors();
        if (excludedSelectors.length) {
            this._itemElementsCache = this._itemElementsCache.not(excludedSelectors)
        }
    },
    _isItemStrictEquals: function(item1, item2) {
        var privateKey = item1 && item1.__dx_key__;
        if (privateKey && !this.key() && this._selection.isItemSelected(privateKey)) {
            return false
        }
        return this.callBase(item1, item2)
    },
    _getDefaultOptions() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(this.callBase(), {
            showSelectionControls: false,
            selectionMode: "none",
            selectAllMode: "page",
            onSelectAllValueChanged: null,
            selectAllText: _localization_message__WEBPACK_IMPORTED_MODULE_4__["default"].format("dxList-selectAll"),
            menuItems: [],
            menuMode: "context",
            allowItemDeleting: false,
            itemDeleteMode: "static",
            itemDragging: {}
        })
    },
    _defaultOptionsRules() {
        return this.callBase().concat([{
            device: _device => "ios" === _device.platform,
            options: {
                menuMode: "slide",
                itemDeleteMode: "slideItem"
            }
        }, {
            device: {
                platform: "android"
            },
            options: {
                itemDeleteMode: "swipe"
            }
        }])
    },
    _init() {
        this.callBase();
        this._initEditProvider()
    },
    _initDataSource() {
        this.callBase();
        if (!this._isPageSelectAll()) {
            this._dataSource && this._dataSource.requireTotalCount(true)
        }
    },
    _isPageSelectAll() {
        return "page" === this.option("selectAllMode")
    },
    _initEditProvider() {
        this._editProvider = new _ui_list_edit_provider__WEBPACK_IMPORTED_MODULE_5__["default"](this)
    },
    _disposeEditProvider() {
        if (this._editProvider) {
            this._editProvider.dispose()
        }
    },
    _refreshEditProvider() {
        this._disposeEditProvider();
        this._initEditProvider()
    },
    _initEditStrategy() {
        if (this.option("grouped")) {
            this._editStrategy = new _ui_list_edit_strategy_grouped__WEBPACK_IMPORTED_MODULE_3__["default"](this)
        } else {
            this.callBase()
        }
    },
    _initMarkup() {
        this._refreshEditProvider();
        this.callBase()
    },
    _renderItems() {
        this.callBase(...arguments);
        this._editProvider.afterItemsRendered()
    },
    _selectedItemClass: () => LIST_ITEM_SELECTED_CLASS,
    _itemResponseWaitClass: () => LIST_ITEM_RESPONSE_WAIT_CLASS,
    _itemClickHandler(e) {
        var $itemElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.currentTarget);
        if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
            return
        }
        var handledByEditProvider = this._editProvider.handleClick($itemElement, e);
        if (handledByEditProvider) {
            return
        }
        this._saveSelectionChangeEvent(e);
        this.callBase(...arguments)
    },
    _shouldFireContextMenuEvent() {
        return this.callBase(...arguments) || this._editProvider.contextMenuHandlerExists()
    },
    _itemHoldHandler(e) {
        var $itemElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.currentTarget);
        if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
            return
        }
        var handledByEditProvider = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_1__["isTouchEvent"])(e) && this._editProvider.handleContextMenu($itemElement, e);
        if (handledByEditProvider) {
            e.handledByEditProvider = true;
            return
        }
        this.callBase(...arguments)
    },
    _getItemContainer: function(changeData) {
        if (this.option("grouped")) {
            var _this$_editStrategy$g;
            var groupIndex = null === (_this$_editStrategy$g = this._editStrategy.getIndexByItemData(changeData)) || void 0 === _this$_editStrategy$g ? void 0 : _this$_editStrategy$g.group;
            return this._getGroupContainerByIndex(groupIndex)
        } else {
            return this.callBase(changeData)
        }
    },
    _itemContextMenuHandler(e) {
        var $itemElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(e.currentTarget);
        if ($itemElement.is(".dx-state-disabled, .dx-state-disabled *")) {
            return
        }
        var handledByEditProvider = !e.handledByEditProvider && this._editProvider.handleContextMenu($itemElement, e);
        if (handledByEditProvider) {
            e.preventDefault();
            return
        }
        this.callBase(...arguments)
    },
    _postprocessRenderItem(args) {
        this.callBase(...arguments);
        this._editProvider.modifyItemElement(args)
    },
    _clean() {
        this._disposeEditProvider();
        this.callBase()
    },
    focusListItem(index) {
        var $item = this._editStrategy.getItemElement(index);
        this.option("focusedElement", $item);
        this.focus();
        this.scrollToItem(this.option("focusedElement"))
    },
    _optionChanged(args) {
        switch (args.name) {
            case "selectAllMode":
                this._initDataSource();
                this._dataSource.pageIndex(0);
                this._dataSource.load();
                break;
            case "grouped":
                this._clearSelectedItems();
                delete this._renderingGroupIndex;
                this._initEditStrategy();
                this.callBase(args);
                break;
            case "showSelectionControls":
            case "menuItems":
            case "menuMode":
            case "allowItemDeleting":
            case "itemDeleteMode":
            case "itemDragging":
            case "selectAllText":
                this._invalidate();
                break;
            case "onSelectAllValueChanged":
                break;
            default:
                this.callBase(args)
        }
    },
    selectAll() {
        return this._selection.selectAll(this._isPageSelectAll())
    },
    unselectAll() {
        return this._selection.deselectAll(this._isPageSelectAll())
    },
    isSelectAll() {
        return this._selection.getSelectAllState(this._isPageSelectAll())
    },
    getFlatIndexByItemElement(itemElement) {
        return this._itemElements().index(itemElement)
    },
    getItemElementByFlatIndex(flatIndex) {
        var $itemElements = this._itemElements();
        if (flatIndex < 0 || flatIndex >= $itemElements.length) {
            return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])()
        }
        return $itemElements.eq(flatIndex)
    },
    getItemByIndex(index) {
        return this._editStrategy.getItemDataByIndex(index)
    }
});
/* harmony default export */ __webpack_exports__["default"] = (ListEdit);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/list/ui.list.edit.provider.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/list/ui.list.edit.provider.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _widget_ui_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/* harmony import */ var _ui_list_edit_decorator_registry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui.list.edit.decorator_registry */ "./node_modules/devextreme/esm/ui/list/ui.list.edit.decorator_registry.js");
/**
 * DevExtreme (esm/ui/list/ui.list.edit.provider.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var editOptionsRegistry = [];
var registerOption = function(enabledFunc, decoratorTypeFunc, decoratorSubTypeFunc) {
    editOptionsRegistry.push({
        enabled: enabledFunc,
        decoratorType: decoratorTypeFunc,
        decoratorSubType: decoratorSubTypeFunc
    })
};
registerOption((function() {
    return this.option("menuItems").length
}), (function() {
    return "menu"
}), (function() {
    return this.option("menuMode")
}));
registerOption((function() {
    return !this.option("menuItems").length && this.option("allowItemDeleting")
}), (function() {
    var mode = this.option("itemDeleteMode");
    return "toggle" === mode || "slideButton" === mode || "swipe" === mode || "static" === mode ? "delete" : "menu"
}), (function() {
    var mode = this.option("itemDeleteMode");
    if ("slideItem" === mode) {
        mode = "slide"
    }
    return mode
}));
registerOption((function() {
    return "none" !== this.option("selectionMode") && this.option("showSelectionControls")
}), (function() {
    return "selection"
}), (function() {
    return "default"
}));
registerOption((function() {
    return this.option("itemDragging.allowReordering") || this.option("itemDragging.allowDropInsideItem") || this.option("itemDragging.group")
}), (function() {
    return "reorder"
}), (function() {
    return "default"
}));
var LIST_ITEM_BEFORE_BAG_CLASS = "dx-list-item-before-bag";
var LIST_ITEM_AFTER_BAG_CLASS = "dx-list-item-after-bag";
var DECORATOR_BEFORE_BAG_CREATE_METHOD = "beforeBag";
var DECORATOR_AFTER_BAG_CREATE_METHOD = "afterBag";
var DECORATOR_MODIFY_ELEMENT_METHOD = "modifyElement";
var DECORATOR_AFTER_RENDER_METHOD = "afterRender";
var DECORATOR_GET_EXCLUDED_SELECTORS_METHOD = "getExcludedSelectors";
var EditProvider = _core_class__WEBPACK_IMPORTED_MODULE_2__["default"].inherit({
    ctor: function(list) {
        this._list = list;
        this._fetchRequiredDecorators()
    },
    dispose: function() {
        if (this._decorators && this._decorators.length) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(this._decorators, (function(_, decorator) {
                decorator.dispose()
            }))
        }
    },
    _fetchRequiredDecorators: function() {
        this._decorators = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(editOptionsRegistry, function(_, option) {
            var optionEnabled = option.enabled.call(this._list);
            if (optionEnabled) {
                var decoratorType = option.decoratorType.call(this._list);
                var decoratorSubType = option.decoratorSubType.call(this._list);
                var decorator = this._createDecorator(decoratorType, decoratorSubType);
                this._decorators.push(decorator)
            }
        }.bind(this))
    },
    _createDecorator: function(type, subType) {
        var decoratorClass = this._findDecorator(type, subType);
        return new decoratorClass(this._list)
    },
    _findDecorator: function(type, subType) {
        var _registry$type;
        var foundDecorator = null === (_registry$type = _ui_list_edit_decorator_registry__WEBPACK_IMPORTED_MODULE_6__["registry"][type]) || void 0 === _registry$type ? void 0 : _registry$type[subType];
        if (!foundDecorator) {
            throw _widget_ui_errors__WEBPACK_IMPORTED_MODULE_5__["default"].Error("E1012", type, subType)
        }
        return foundDecorator
    },
    modifyItemElement: function(args) {
        var $itemElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(args.itemElement);
        var config = {
            $itemElement: $itemElement
        };
        this._prependBeforeBags($itemElement, config);
        this._appendAfterBags($itemElement, config);
        this._applyDecorators(DECORATOR_MODIFY_ELEMENT_METHOD, config)
    },
    afterItemsRendered: function() {
        this._applyDecorators(DECORATOR_AFTER_RENDER_METHOD)
    },
    _prependBeforeBags: function($itemElement, config) {
        var $beforeBags = this._collectDecoratorsMarkup(DECORATOR_BEFORE_BAG_CREATE_METHOD, config, LIST_ITEM_BEFORE_BAG_CLASS);
        $itemElement.prepend($beforeBags)
    },
    _appendAfterBags: function($itemElement, config) {
        var $afterBags = this._collectDecoratorsMarkup(DECORATOR_AFTER_BAG_CREATE_METHOD, config, LIST_ITEM_AFTER_BAG_CLASS);
        $itemElement.append($afterBags)
    },
    _collectDecoratorsMarkup: function(method, config, containerClass) {
        var $collector = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>");
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(this._decorators, (function() {
            var $container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(containerClass);
            this[method](Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({
                $container: $container
            }, config));
            if ($container.children().length) {
                $collector.append($container)
            }
        }));
        return $collector.children()
    },
    _applyDecorators: function(method, config) {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(this._decorators, (function() {
            this[method](config)
        }))
    },
    _handlerExists: function(name) {
        if (!this._decorators) {
            return false
        }
        var decorators = this._decorators;
        var length = decorators.length;
        for (var i = 0; i < length; i++) {
            if (decorators[i][name] !== _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"]) {
                return true
            }
        }
        return false
    },
    _eventHandler: function(name, $itemElement, e) {
        if (!this._decorators) {
            return false
        }
        var response = false;
        var decorators = this._decorators;
        var length = decorators.length;
        for (var i = 0; i < length; i++) {
            response = decorators[i][name]($itemElement, e);
            if (response) {
                break
            }
        }
        return response
    },
    handleClick: function($itemElement, e) {
        return this._eventHandler("handleClick", $itemElement, e)
    },
    handleKeyboardEvents: function(currentFocusedIndex, moveFocusUp) {
        return this._eventHandler("handleKeyboardEvents", currentFocusedIndex, moveFocusUp)
    },
    handleEnterPressing: function(e) {
        return this._eventHandler("handleEnterPressing", e)
    },
    contextMenuHandlerExists: function() {
        return this._handlerExists("handleContextMenu")
    },
    handleContextMenu: function($itemElement, e) {
        return this._eventHandler("handleContextMenu", $itemElement, e)
    },
    getExcludedItemSelectors: function() {
        var excludedSelectors = [];
        this._applyDecorators(DECORATOR_GET_EXCLUDED_SELECTORS_METHOD, excludedSelectors);
        return excludedSelectors.join(",")
    }
});
/* harmony default export */ __webpack_exports__["default"] = (EditProvider);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/list/ui.list.edit.search.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/list/ui.list.edit.search.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_list_edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.list.edit */ "./node_modules/devextreme/esm/ui/list/ui.list.edit.js");
/* harmony import */ var _widget_ui_search_box_mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../widget/ui.search_box_mixin */ "./node_modules/devextreme/esm/ui/widget/ui.search_box_mixin.js");
/**
 * DevExtreme (esm/ui/list/ui.list.edit.search.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var ListSearch = _ui_list_edit__WEBPACK_IMPORTED_MODULE_0__["default"].inherit(_widget_ui_search_box_mixin__WEBPACK_IMPORTED_MODULE_1__["default"]).inherit({
    _addWidgetPrefix: function(className) {
        return "dx-list-" + className
    },
    _getCombinedFilter: function() {
        var filter;
        var storeLoadOptions;
        var dataSource = this._dataSource;
        if (dataSource) {
            storeLoadOptions = {
                filter: dataSource.filter()
            };
            dataSource._addSearchFilter(storeLoadOptions);
            filter = storeLoadOptions.filter
        }
        return filter
    },
    _initDataSource: function() {
        var value = this.option("searchValue");
        var expr = this.option("searchExpr");
        var mode = this.option("searchMode");
        this.callBase();
        if (this._dataSource) {
            value && value.length && this._dataSource.searchValue(value);
            mode.length && this._dataSource.searchOperation(_widget_ui_search_box_mixin__WEBPACK_IMPORTED_MODULE_1__["default"].getOperationBySearchMode(mode));
            expr && this._dataSource.searchExpr(expr)
        }
    }
});
/* harmony default export */ __webpack_exports__["default"] = (ListSearch);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/list/ui.list.edit.strategy.grouped.js":
/*!******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/list/ui.list.edit.strategy.grouped.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _data_store_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../data/store_helper */ "./node_modules/devextreme/esm/data/store_helper.js");
/* harmony import */ var _data_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/query */ "./node_modules/devextreme/esm/data/query.js");
/* harmony import */ var _collection_ui_collection_widget_edit_strategy_plain__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../collection/ui.collection_widget.edit.strategy.plain */ "./node_modules/devextreme/esm/ui/collection/ui.collection_widget.edit.strategy.plain.js");
/**
 * DevExtreme (esm/ui/list/ui.list.edit.strategy.grouped.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var LIST_ITEM_CLASS = "dx-list-item";
var LIST_GROUP_CLASS = "dx-list-group";
var SELECTION_SHIFT = 20;
var SELECTION_MASK = (1 << SELECTION_SHIFT) - 1;
var combineIndex = function(indices) {
    return (indices.group << SELECTION_SHIFT) + indices.item
};
var splitIndex = function(combinedIndex) {
    return {
        group: combinedIndex >> SELECTION_SHIFT,
        item: combinedIndex & SELECTION_MASK
    }
};
var GroupedEditStrategy = _collection_ui_collection_widget_edit_strategy_plain__WEBPACK_IMPORTED_MODULE_5__["default"].inherit({
    _groupElements: function() {
        return this._collectionWidget._itemContainer().find("." + LIST_GROUP_CLASS)
    },
    _groupItemElements: function($group) {
        return $group.find("." + LIST_ITEM_CLASS)
    },
    getIndexByItemData: function(itemData) {
        var groups = this._collectionWidget.option("items");
        var index = false;
        if (!itemData) {
            return false
        }
        if (itemData.items && itemData.items.length) {
            itemData = itemData.items[0]
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(groups, (function(groupIndex, group) {
            if (!group.items) {
                return false
            }
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(group.items, (function(itemIndex, item) {
                if (item !== itemData) {
                    return true
                }
                index = {
                    group: groupIndex,
                    item: itemIndex
                };
                return false
            }));
            if (index) {
                return false
            }
        }));
        return index
    },
    getItemDataByIndex: function(index) {
        var items = this._collectionWidget.option("items");
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(index)) {
            return this.itemsGetter()[index]
        }
        return index && items[index.group] && items[index.group].items[index.item] || null
    },
    itemsGetter: function() {
        var resultItems = [];
        var items = this._collectionWidget.option("items");
        for (var i = 0; i < items.length; i++) {
            if (items[i] && items[i].items) {
                resultItems = resultItems.concat(items[i].items)
            } else {
                resultItems.push(items[i])
            }
        }
        return resultItems
    },
    deleteItemAtIndex: function(index) {
        var indices = splitIndex(index);
        var itemGroup = this._collectionWidget.option("items")[indices.group].items;
        itemGroup.splice(indices.item, 1)
    },
    getKeysByItems: function(items) {
        var plainItems = [];
        var i;
        for (i = 0; i < items.length; i++) {
            if (items[i] && items[i].items) {
                plainItems = plainItems.concat(items[i].items)
            } else {
                plainItems.push(items[i])
            }
        }
        var result = [];
        for (i = 0; i < plainItems.length; i++) {
            result.push(this._collectionWidget.keyOf(plainItems[i]))
        }
        return result
    },
    getIndexByKey: function(key, items) {
        var groups = items || this._collectionWidget.option("items");
        var index = -1;
        var that = this;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(groups, (function(groupIndex, group) {
            if (!group.items) {
                return
            }
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(group.items, (function(itemIndex, item) {
                var itemKey = that._collectionWidget.keyOf(item);
                if (that._equalKeys(itemKey, key)) {
                    index = {
                        group: groupIndex,
                        item: itemIndex
                    };
                    return false
                }
            }));
            if (-1 !== index) {
                return false
            }
        }));
        return index
    },
    _getGroups: function(items) {
        var dataSource = this._collectionWidget.getDataSource();
        var group = dataSource && dataSource.group();
        if (group) {
            return _data_store_helper__WEBPACK_IMPORTED_MODULE_3__["default"].queryByOptions(Object(_data_query__WEBPACK_IMPORTED_MODULE_4__["default"])(items), {
                group: group
            }).toArray()
        }
        return this._collectionWidget.option("items")
    },
    getItemsByKeys: function(keys, items) {
        var result = [];
        var groups = this._getGroups(items);
        var groupItemByKeyMap = {};
        var getItemMeta = key => {
            var index = this.getIndexByKey(key, groups);
            var group = index && groups[index.group];
            if (!group) {
                return
            }
            return {
                groupKey: group.key,
                item: group.items[index.item]
            }
        };
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(keys, (function(_, key) {
            var itemMeta = getItemMeta(key);
            if (!itemMeta) {
                return
            }
            var groupKey = itemMeta.groupKey;
            var item = itemMeta.item;
            var selectedGroup = groupItemByKeyMap[groupKey];
            if (!selectedGroup) {
                selectedGroup = {
                    key: groupKey,
                    items: []
                };
                groupItemByKeyMap[groupKey] = selectedGroup;
                result.push(selectedGroup)
            }
            selectedGroup.items.push(item)
        }));
        return result
    },
    moveItemAtIndexToIndex: function(movingIndex, destinationIndex) {
        var items = this._collectionWidget.option("items");
        var movingIndices = splitIndex(movingIndex);
        var destinationIndices = splitIndex(destinationIndex);
        var movingItemGroup = items[movingIndices.group].items;
        var destinationItemGroup = items[destinationIndices.group].items;
        var movedItemData = movingItemGroup[movingIndices.item];
        movingItemGroup.splice(movingIndices.item, 1);
        destinationItemGroup.splice(destinationIndices.item, 0, movedItemData)
    },
    _isItemIndex: function(index) {
        return index && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(index.group) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(index.item)
    },
    _getNormalizedItemIndex: function(itemElement) {
        var $item = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(itemElement);
        var $group = $item.closest("." + LIST_GROUP_CLASS);
        if (!$group.length) {
            return -1
        }
        return combineIndex({
            group: this._groupElements().index($group),
            item: this._groupItemElements($group).index($item)
        })
    },
    _normalizeItemIndex: function(index) {
        return combineIndex(index)
    },
    _denormalizeItemIndex: function(index) {
        return splitIndex(index)
    },
    _getItemByNormalizedIndex: function(index) {
        var indices = splitIndex(index);
        var $group = this._groupElements().eq(indices.group);
        return this._groupItemElements($group).eq(indices.item)
    },
    _itemsFromSameParent: function(firstIndex, secondIndex) {
        return splitIndex(firstIndex).group === splitIndex(secondIndex).group
    }
});
/* harmony default export */ __webpack_exports__["default"] = (GroupedEditStrategy);


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/list_light.js":
/*!******************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/list_light.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_ui_list_edit_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list/ui.list.edit.search */ "./node_modules/devextreme/esm/ui/list/ui.list.edit.search.js");
/* harmony import */ var _core_component_registrator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/esm/core/component_registrator.js");
/**
 * DevExtreme (esm/ui/list_light.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


Object(_core_component_registrator__WEBPACK_IMPORTED_MODULE_1__["default"])("dxList", _list_ui_list_edit_search__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (_list_ui_list_edit_search__WEBPACK_IMPORTED_MODULE_0__["default"]);


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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
        this.callBase();
        this._renderOverlayPosition();
        this._actions.onPositioned()
    },
    _renderOverlayPosition: function() {
        this._resetOverlayPosition();
        this._updateContentSize();
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
    _resetOverlayPosition: function() {
        this._setContentHeight(true);
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
    _updateContentSize: function() {
        if (!this.$content()) {
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

/***/ "./node_modules/devextreme/esm/ui/shared/grouped_data_converter_mixin.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/shared/grouped_data_converter_mixin.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/ui/shared/grouped_data_converter_mixin.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var isCorrectStructure = data => Array.isArray(data) && data.every(item => {
    var hasTwoFields = 2 === Object.keys(item).length;
    var hasCorrectFields = "key" in item && "items" in item;
    return hasTwoFields && hasCorrectFields && Array.isArray(item.items)
});
/* harmony default export */ __webpack_exports__["default"] = ({
    _getSpecificDataSourceOption: function() {
        var dataSource = this.option("dataSource");
        var hasSimpleItems = false;
        var data = {};
        if (this._getGroupedOption() && isCorrectStructure(dataSource)) {
            data = dataSource.reduce((accumulator, item) => {
                var items = item.items.map(innerItem => {
                    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(innerItem)) {
                        innerItem = {
                            text: innerItem
                        };
                        hasSimpleItems = true
                    }
                    if (!("key" in innerItem)) {
                        innerItem.key = item.key
                    }
                    return innerItem
                });
                return accumulator.concat(items)
            }, []);
            dataSource = {
                store: {
                    type: "array",
                    data: data
                },
                group: {
                    selector: "key",
                    keepInitialKeyOrder: true
                }
            };
            if (hasSimpleItems) {
                dataSource.searchExpr = "text"
            }
        }
        return dataSource
    }
});


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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
            var $itemContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_1__["default"])(item).children();
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
            this._menu.itemOption(item, property, value)
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var MENU_INVISIBLE_CLASS = "dx-state-invisible";
var TOOLBAR_dropDownMenu_CONTAINER_CLASS = "dx-toolbar-menu-container";
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
        this._$menuButtonContainer = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").appendTo($afterSection).addClass(this._toolbar._buttonClass()).addClass(TOOLBAR_dropDownMenu_CONTAINER_CLASS)
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
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


/***/ }),

/***/ "./node_modules/devextreme/esm/ui/widget/ui.search_box_mixin.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/ui/widget/ui.search_box_mixin.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _widget_ui_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../widget/ui.errors */ "./node_modules/devextreme/esm/ui/widget/ui.errors.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _core_utils_stubs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/stubs */ "./node_modules/devextreme/esm/core/utils/stubs.js");
/**
 * DevExtreme (esm/ui/widget/ui.search_box_mixin.js)
 * Version: 21.2.7
 * Build date: Mon Apr 11 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var EditorClass = Object(_core_utils_stubs__WEBPACK_IMPORTED_MODULE_5__["stubComponent"])("TextBox");
/* harmony default export */ __webpack_exports__["default"] = ({
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(this.callBase(), {
            searchMode: "",
            searchExpr: null,
            searchValue: "",
            searchEnabled: false,
            searchEditorOptions: {}
        })
    },
    _initMarkup: function() {
        this._renderSearch();
        this.callBase()
    },
    _renderSearch: function() {
        var $element = this.$element();
        var searchEnabled = this.option("searchEnabled");
        var searchBoxClassName = this._addWidgetPrefix("search");
        var rootElementClassName = this._addWidgetPrefix("with-search");
        if (!searchEnabled) {
            $element.removeClass(rootElementClassName);
            this._removeSearchBox();
            return
        }
        var editorOptions = this._getSearchEditorOptions();
        if (this._searchEditor) {
            this._searchEditor.option(editorOptions)
        } else {
            $element.addClass(rootElementClassName);
            this._$searchEditorElement = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])("<div>").addClass(searchBoxClassName).prependTo($element);
            this._searchEditor = this._createComponent(this._$searchEditorElement, EditorClass, editorOptions)
        }
    },
    _removeSearchBox: function() {
        this._$searchEditorElement && this._$searchEditorElement.remove();
        delete this._$searchEditorElement;
        delete this._searchEditor
    },
    _getSearchEditorOptions: function() {
        var that = this;
        var userEditorOptions = that.option("searchEditorOptions");
        var searchText = _localization_message__WEBPACK_IMPORTED_MODULE_2__["default"].format("Search");
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({
            mode: "search",
            placeholder: searchText,
            tabIndex: that.option("tabIndex"),
            value: that.option("searchValue"),
            valueChangeEvent: "input",
            inputAttr: {
                "aria-label": searchText
            },
            onValueChanged: function(e) {
                var searchTimeout = that.option("searchTimeout");
                that._valueChangeDeferred = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_4__["Deferred"];
                clearTimeout(that._valueChangeTimeout);
                that._valueChangeDeferred.done(function() {
                    this.option("searchValue", e.value)
                }.bind(that));
                if (e.event && "input" === e.event.type && searchTimeout) {
                    that._valueChangeTimeout = setTimeout((function() {
                        that._valueChangeDeferred.resolve()
                    }), searchTimeout)
                } else {
                    that._valueChangeDeferred.resolve()
                }
            }
        }, userEditorOptions)
    },
    _getAriaTarget: function() {
        if (this.option("searchEnabled")) {
            return this._itemContainer(true)
        }
        return this.$element()
    },
    _focusTarget: function() {
        if (this.option("searchEnabled")) {
            return this._itemContainer(true)
        }
        return this.callBase()
    },
    _updateFocusState: function(e, isFocused) {
        if (this.option("searchEnabled")) {
            this._toggleFocusClass(isFocused, this.$element())
        }
        this.callBase(e, isFocused)
    },
    getOperationBySearchMode: function(searchMode) {
        return "equals" === searchMode ? "=" : searchMode
    },
    _cleanAria: function($target) {
        this.setAria({
            role: null,
            activedescendant: null
        }, $target);
        $target.attr("tabIndex", null)
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "searchEnabled":
            case "searchEditorOptions":
                this._cleanAria(this.option("searchEnabled") ? this.$element() : this._itemContainer());
                this._invalidate();
                break;
            case "searchExpr":
            case "searchMode":
            case "searchValue":
                if (!this._dataSource) {
                    _widget_ui_errors__WEBPACK_IMPORTED_MODULE_3__["default"].log("W1009");
                    return
                }
                if ("searchMode" === args.name) {
                    this._dataSource.searchOperation(this.getOperationBySearchMode(args.value))
                } else {
                    this._dataSource[args.name](args.value)
                }
                this._dataSource.load();
                break;
            case "searchTimeout":
                break;
            default:
                this.callBase(args)
        }
    },
    focus: function() {
        if (!this.option("focusedElement") && this.option("searchEnabled")) {
            this._searchEditor && this._searchEditor.focus();
            return
        }
        this.callBase()
    },
    _refresh: function() {
        if (this._valueChangeDeferred) {
            this._valueChangeDeferred.resolve()
        }
        this.callBase()
    },
    setEditorClass: function(value) {
        EditorClass = value
    }
});


/***/ })

}]);