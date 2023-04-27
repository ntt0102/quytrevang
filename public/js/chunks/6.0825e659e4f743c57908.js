(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/devextreme/esm/viz/chart_components/base_chart.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/chart_components/base_chart.js ***!
  \************************************************************************/
/*! exports provided: overlapping, BaseChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "overlapping", function() { return overlapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseChart", function() { return BaseChart; });
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_base_widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/base_widget */ "./node_modules/devextreme/esm/viz/core/base_widget.js");
/* harmony import */ var _components_legend__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/legend */ "./node_modules/devextreme/esm/viz/components/legend.js");
/* harmony import */ var _components_data_validator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/data_validator */ "./node_modules/devextreme/esm/viz/components/data_validator.js");
/* harmony import */ var _series_base_series__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../series/base_series */ "./node_modules/devextreme/esm/viz/series/base_series.js");
/* harmony import */ var _components_chart_theme_manager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/chart_theme_manager */ "./node_modules/devextreme/esm/viz/components/chart_theme_manager.js");
/* harmony import */ var _layout_manager__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./layout_manager */ "./node_modules/devextreme/esm/viz/chart_components/layout_manager.js");
/* harmony import */ var _tracker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tracker */ "./node_modules/devextreme/esm/viz/chart_components/tracker.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_export__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../core/export */ "./node_modules/devextreme/esm/viz/core/export.js");
/* harmony import */ var _core_title__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../core/title */ "./node_modules/devextreme/esm/viz/core/title.js");
/* harmony import */ var _core_data_source__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../core/data_source */ "./node_modules/devextreme/esm/viz/core/data_source.js");
/* harmony import */ var _core_tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../core/tooltip */ "./node_modules/devextreme/esm/viz/core/tooltip.js");
/* harmony import */ var _core_loading_indicator__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../core/loading_indicator */ "./node_modules/devextreme/esm/viz/core/loading_indicator.js");
/**
 * DevExtreme (esm/viz/chart_components/base_chart.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */















var _isArray = Array.isArray;
var REINIT_REFRESH_ACTION = "_reinit";
var REINIT_DATA_SOURCE_REFRESH_ACTION = "_updateDataSource";
var DATA_INIT_REFRESH_ACTION = "_dataInit";
var FORCE_RENDER_REFRESH_ACTION = "_forceRender";
var RESIZE_REFRESH_ACTION = "_resize";
var ACTIONS_BY_PRIORITY = [REINIT_REFRESH_ACTION, REINIT_DATA_SOURCE_REFRESH_ACTION, DATA_INIT_REFRESH_ACTION, FORCE_RENDER_REFRESH_ACTION, RESIZE_REFRESH_ACTION];
var DEFAULT_OPACITY = .3;
var REFRESH_SERIES_DATA_INIT_ACTION_OPTIONS = ["series", "commonSeriesSettings", "dataPrepareSettings", "seriesSelectionMode", "pointSelectionMode", "synchronizeMultiAxes", "resolveLabelsOverlapping"];
var REFRESH_SERIES_FAMILIES_ACTION_OPTIONS = ["minBubbleSize", "maxBubbleSize", "barGroupPadding", "barGroupWidth", "negativesAsZeroes", "negativesAsZeros"];
var FORCE_RENDER_REFRESH_ACTION_OPTIONS = ["adaptiveLayout", "crosshair", "resolveLabelOverlapping", "adjustOnZoom", "stickyHovering"];
var FONT = "font";

function checkHeightRollingStock(rollingStocks, stubCanvas) {
    var canvasSize = stubCanvas.end - stubCanvas.start;
    var size = 0;
    rollingStocks.forEach((function(rollingStock) {
        size += rollingStock.getBoundingRect().width
    }));
    while (canvasSize < size) {
        size -= findAndKillSmallValue(rollingStocks)
    }
}

function findAndKillSmallValue(rollingStocks) {
    var smallestObject = rollingStocks.reduce((function(prev, rollingStock, index) {
        if (!rollingStock) {
            return prev
        }
        var value = rollingStock.value();
        return value < prev.value ? {
            value: value,
            rollingStock: rollingStock,
            index: index
        } : prev
    }), {
        rollingStock: void 0,
        value: 1 / 0,
        index: void 0
    });
    smallestObject.rollingStock.getLabels()[0].draw(false);
    var width = smallestObject.rollingStock.getBoundingRect().width;
    rollingStocks[smallestObject.index] = null;
    return width
}

function checkStackOverlap(rollingStocks) {
    var i;
    var j;
    var iLength;
    var jLength;
    var overlap = false;
    for (i = 0, iLength = rollingStocks.length - 1; i < iLength; i++) {
        for (j = i + 1, jLength = rollingStocks.length; j < jLength; j++) {
            if (i !== j && checkStacksOverlapping(rollingStocks[i], rollingStocks[j], true)) {
                overlap = true;
                break
            }
        }
        if (overlap) {
            break
        }
    }
    return overlap
}

function resolveLabelOverlappingInOneDirection(points, canvas, isRotated, isInverted, shiftFunction) {
    var customSorting = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : () => 0;
    var rollingStocks = [];
    var stubCanvas = {
        start: isRotated ? canvas.left : canvas.top,
        end: isRotated ? canvas.width - canvas.right : canvas.height - canvas.bottom
    };
    var hasStackedSeries = false;
    var sortRollingStocks;
    points.forEach((function(p) {
        if (!p) {
            return
        }
        hasStackedSeries = hasStackedSeries || p.series.isStackedSeries() || p.series.isFullStackedSeries();
        p.getLabels().forEach((function(l) {
            l.isVisible() && rollingStocks.push(new RollingStock(l, isRotated, shiftFunction))
        }))
    }));
    if (hasStackedSeries) {
        !isRotated ^ isInverted && rollingStocks.reverse();
        sortRollingStocks = !isInverted ? sortRollingStocksByValue(rollingStocks) : rollingStocks
    } else {
        var rollingStocksTmp = rollingStocks.slice();
        sortRollingStocks = rollingStocks.sort((function(a, b) {
            return customSorting(a, b) || a.getInitialPosition() - b.getInitialPosition() || rollingStocksTmp.indexOf(a) - rollingStocksTmp.indexOf(b)
        }))
    }
    if (!checkStackOverlap(sortRollingStocks)) {
        return false
    }
    checkHeightRollingStock(sortRollingStocks, stubCanvas);
    prepareOverlapStacks(sortRollingStocks);
    sortRollingStocks.reverse();
    moveRollingStock(sortRollingStocks, stubCanvas);
    return true
}

function checkStacksOverlapping(firstRolling, secondRolling, inTwoSides) {
    if (!firstRolling || !secondRolling) {
        return
    }
    var firstRect = firstRolling.getBoundingRect();
    var secondRect = secondRolling.getBoundingRect();
    var oppositeOverlapping = inTwoSides ? firstRect.oppositeStart <= secondRect.oppositeStart && firstRect.oppositeEnd > secondRect.oppositeStart || secondRect.oppositeStart <= firstRect.oppositeStart && secondRect.oppositeEnd > firstRect.oppositeStart : true;
    return firstRect.end > secondRect.start && oppositeOverlapping
}

function sortRollingStocksByValue(rollingStocks) {
    var positiveRollingStocks = [];
    var negativeRollingStocks = [];
    rollingStocks.forEach(stock => {
        if (stock.value() > 0) {
            positiveRollingStocks.push(stock)
        } else {
            negativeRollingStocks.unshift(stock)
        }
    });
    return positiveRollingStocks.concat(negativeRollingStocks)
}

function prepareOverlapStacks(rollingStocks) {
    var i;
    var currentRollingStock;
    var root;
    for (i = 0; i < rollingStocks.length - 1; i++) {
        currentRollingStock = root || rollingStocks[i];
        if (checkStacksOverlapping(currentRollingStock, rollingStocks[i + 1])) {
            currentRollingStock.toChain(rollingStocks[i + 1]);
            rollingStocks[i + 1] = null;
            root = currentRollingStock
        } else {
            root = rollingStocks[i + 1] || currentRollingStock
        }
    }
}

function moveRollingStock(rollingStocks, canvas) {
    var i;
    var j;
    var currentRollingStock;
    var nextRollingStock;
    var currentBBox;
    var nextBBox;
    for (i = 0; i < rollingStocks.length; i++) {
        currentRollingStock = rollingStocks[i];
        if (rollingStocksIsOut(currentRollingStock, canvas)) {
            currentBBox = currentRollingStock.getBoundingRect();
            for (j = i + 1; j < rollingStocks.length; j++) {
                nextRollingStock = rollingStocks[j];
                if (!nextRollingStock) {
                    continue
                }
                nextBBox = nextRollingStock.getBoundingRect();
                if (nextBBox.end > currentBBox.start - (currentBBox.end - canvas.end)) {
                    nextRollingStock.toChain(currentRollingStock);
                    rollingStocks[i] = currentRollingStock = null;
                    break
                }
            }
        }
        currentRollingStock && currentRollingStock.setRollingStockInCanvas(canvas)
    }
}

function rollingStocksIsOut(rollingStock, canvas) {
    return rollingStock && rollingStock.getBoundingRect().end > canvas.end
}

function RollingStock(label, isRotated, shiftFunction) {
    var bBox = label.getBoundingRect();
    var x = bBox.x;
    var y = bBox.y;
    var endX = bBox.x + bBox.width;
    var endY = bBox.y + bBox.height;
    this.labels = [label];
    this.shiftFunction = shiftFunction;
    this._bBox = {
        start: isRotated ? x : y,
        width: isRotated ? bBox.width : bBox.height,
        end: isRotated ? endX : endY,
        oppositeStart: isRotated ? y : x,
        oppositeEnd: isRotated ? endY : endX
    };
    this._initialPosition = isRotated ? bBox.x : bBox.y;
    return this
}
RollingStock.prototype = {
    toChain: function(nextRollingStock) {
        var nextRollingStockBBox = nextRollingStock.getBoundingRect();
        nextRollingStock.shift(nextRollingStockBBox.start - this._bBox.end);
        this._changeBoxWidth(nextRollingStockBBox.width);
        this.labels = this.labels.concat(nextRollingStock.labels)
    },
    getBoundingRect: function() {
        return this._bBox
    },
    shift: function(shiftLength) {
        var shiftFunction = this.shiftFunction;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this.labels, (function(index, label) {
            var bBox = label.getBoundingRect();
            var coords = shiftFunction(bBox, shiftLength);
            if (!label.hideInsideLabel(coords)) {
                label.shift(coords.x, coords.y)
            }
        }));
        this._bBox.end -= shiftLength;
        this._bBox.start -= shiftLength
    },
    setRollingStockInCanvas: function(canvas) {
        if (this._bBox.end > canvas.end) {
            this.shift(this._bBox.end - canvas.end)
        }
    },
    getLabels: function() {
        return this.labels
    },
    value() {
        return this.labels[0].getData().value
    },
    getInitialPosition: function() {
        return this._initialPosition
    },
    _changeBoxWidth: function(width) {
        this._bBox.end += width;
        this._bBox.width += width
    }
};

function getLegendFields(name) {
    return {
        nameField: name + "Name",
        colorField: name + "Color",
        indexField: name + "Index"
    }
}

function getLegendSettings(legendDataField) {
    var formatObjectFields = getLegendFields(legendDataField);
    return {
        getFormatObject: function(data) {
            var res = {};
            res[formatObjectFields.indexField] = data.id;
            res[formatObjectFields.colorField] = data.states.normal.fill;
            res[formatObjectFields.nameField] = data.text;
            return res
        },
        textField: formatObjectFields.nameField
    }
}

function checkOverlapping(firstRect, secondRect) {
    return (firstRect.x <= secondRect.x && secondRect.x <= firstRect.x + firstRect.width || firstRect.x >= secondRect.x && firstRect.x <= secondRect.x + secondRect.width) && (firstRect.y <= secondRect.y && secondRect.y <= firstRect.y + firstRect.height || firstRect.y >= secondRect.y && firstRect.y <= secondRect.y + secondRect.height)
}
var overlapping = {
    resolveLabelOverlappingInOneDirection: resolveLabelOverlappingInOneDirection
};
var BaseChart = _core_base_widget__WEBPACK_IMPORTED_MODULE_7__["default"].inherit({
    _eventsMap: {
        onSeriesClick: {
            name: "seriesClick"
        },
        onPointClick: {
            name: "pointClick"
        },
        onArgumentAxisClick: {
            name: "argumentAxisClick"
        },
        onLegendClick: {
            name: "legendClick"
        },
        onSeriesSelectionChanged: {
            name: "seriesSelectionChanged"
        },
        onPointSelectionChanged: {
            name: "pointSelectionChanged"
        },
        onSeriesHoverChanged: {
            name: "seriesHoverChanged"
        },
        onPointHoverChanged: {
            name: "pointHoverChanged"
        },
        onDone: {
            name: "done",
            actionSettings: {
                excludeValidators: ["disabled"]
            }
        },
        onZoomStart: {
            name: "zoomStart"
        },
        onZoomEnd: {
            name: "zoomEnd"
        }
    },
    _fontFields: ["legend." + FONT, "legend.title." + FONT, "legend.title.subtitle." + FONT, "commonSeriesSettings.label." + FONT],
    _rootClassPrefix: "dxc",
    _rootClass: "dxc-chart",
    _initialChanges: ["INIT"],
    _themeDependentChanges: ["REFRESH_SERIES_REINIT"],
    _getThemeManagerOptions() {
        var themeOptions = this.callBase.apply(this, arguments);
        themeOptions.options = this.option();
        return themeOptions
    },
    _createThemeManager: function() {
        var chartOption = this.option();
        var themeManager = new _components_chart_theme_manager__WEBPACK_IMPORTED_MODULE_11__["ThemeManager"](this._getThemeManagerOptions());
        themeManager.setTheme(chartOption.theme, chartOption.rtlEnabled);
        return themeManager
    },
    _initCore: function() {
        this._canvasClipRect = this._renderer.clipRect();
        this._createHtmlStructure();
        this._createLegend();
        this._createTracker();
        this._needHandleRenderComplete = true;
        this.layoutManager = new _layout_manager__WEBPACK_IMPORTED_MODULE_12__["LayoutManager"];
        this._createScrollBar();
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._$element, "contextmenu", (function(event) {
            if (Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_6__["isTouchEvent"])(event) || Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_6__["isPointerEvent"])(event)) {
                event.preventDefault()
            }
        }));
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].on(this._$element, "MSHoldVisual", (function(event) {
            event.preventDefault()
        }))
    },
    _getLayoutItems: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    _layoutManagerOptions: function() {
        return this._themeManager.getOptions("adaptiveLayout")
    },
    _reinit() {
        Object(_core_utils__WEBPACK_IMPORTED_MODULE_14__["setCanvasValues"])(this._canvas);
        this._reinitAxes();
        this._requestChange(["DATA_SOURCE", "DATA_INIT", "CORRECT_AXIS", "FULL_RENDER"])
    },
    _correctAxes: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    _createHtmlStructure: function() {
        var that = this;
        var renderer = that._renderer;
        var root = renderer.root;
        var createConstantLinesGroup = function() {
            return renderer.g().attr({
                class: "dxc-constant-lines-group"
            }).linkOn(root, "constant-lines")
        };
        that._constantLinesGroup = {
            dispose: function() {
                this.under.dispose();
                this.above.dispose()
            },
            linkOff: function() {
                this.under.linkOff();
                this.above.linkOff()
            },
            clear: function() {
                this.under.linkRemove().clear();
                this.above.linkRemove().clear()
            },
            linkAppend: function() {
                this.under.linkAppend();
                this.above.linkAppend()
            }
        };
        that._labelsAxesGroup = renderer.g().attr({
            class: "dxc-elements-axes-group"
        });
        var appendLabelsAxesGroup = () => {
            that._labelsAxesGroup.linkOn(root, "elements")
        };
        that._backgroundRect = renderer.rect().attr({
            fill: "gray",
            opacity: 1e-4
        }).append(root);
        that._panesBackgroundGroup = renderer.g().attr({
            class: "dxc-background"
        }).append(root);
        that._stripsGroup = renderer.g().attr({
            class: "dxc-strips-group"
        }).linkOn(root, "strips");
        that._gridGroup = renderer.g().attr({
            class: "dxc-grids-group"
        }).linkOn(root, "grids");
        that._panesBorderGroup = renderer.g().attr({
            class: "dxc-border"
        }).linkOn(root, "border");
        that._axesGroup = renderer.g().attr({
            class: "dxc-axes-group"
        }).linkOn(root, "axes");
        that._executeAppendBeforeSeries(appendLabelsAxesGroup);
        that._stripLabelAxesGroup = renderer.g().attr({
            class: "dxc-strips-labels-group"
        }).linkOn(root, "strips-labels");
        that._constantLinesGroup.under = createConstantLinesGroup();
        that._seriesGroup = renderer.g().attr({
            class: "dxc-series-group"
        }).linkOn(root, "series");
        that._executeAppendAfterSeries(appendLabelsAxesGroup);
        that._constantLinesGroup.above = createConstantLinesGroup();
        that._scaleBreaksGroup = renderer.g().attr({
            class: "dxc-scale-breaks"
        }).linkOn(root, "scale-breaks");
        that._labelsGroup = renderer.g().attr({
            class: "dxc-labels-group"
        }).linkOn(root, "labels");
        that._crosshairCursorGroup = renderer.g().attr({
            class: "dxc-crosshair-cursor"
        }).linkOn(root, "crosshair");
        that._legendGroup = renderer.g().attr({
            class: "dxc-legend",
            "clip-path": that._getCanvasClipRectID()
        }).linkOn(root, "legend").linkAppend(root).enableLinks();
        that._scrollBarGroup = renderer.g().attr({
            class: "dxc-scroll-bar"
        }).linkOn(root, "scroll-bar")
    },
    _executeAppendBeforeSeries() {},
    _executeAppendAfterSeries() {},
    _disposeObjectsInArray: function(propName, fieldNames) {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this[propName] || [], (function(_, item) {
            if (fieldNames && item) {
                Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(fieldNames, (function(_, field) {
                    item[field] && item[field].dispose()
                }))
            } else {
                item && item.dispose()
            }
        }));
        this[propName] = null
    },
    _disposeCore: function() {
        var that = this;
        var disposeObject = function(propName) {
            if (that[propName]) {
                that[propName].dispose();
                that[propName] = null
            }
        };
        var unlinkGroup = function(name) {
            that[name].linkOff()
        };
        var disposeObjectsInArray = this._disposeObjectsInArray;
        that._renderer.stopAllAnimations();
        disposeObjectsInArray.call(that, "series");
        disposeObject("_tracker");
        disposeObject("_crosshair");
        that.layoutManager = that._userOptions = that._canvas = that._groupsData = null;
        unlinkGroup("_stripsGroup");
        unlinkGroup("_gridGroup");
        unlinkGroup("_axesGroup");
        unlinkGroup("_constantLinesGroup");
        unlinkGroup("_stripLabelAxesGroup");
        unlinkGroup("_panesBorderGroup");
        unlinkGroup("_seriesGroup");
        unlinkGroup("_labelsGroup");
        unlinkGroup("_crosshairCursorGroup");
        unlinkGroup("_legendGroup");
        unlinkGroup("_scrollBarGroup");
        unlinkGroup("_scaleBreaksGroup");
        disposeObject("_canvasClipRect");
        disposeObject("_panesBackgroundGroup");
        disposeObject("_backgroundRect");
        disposeObject("_stripsGroup");
        disposeObject("_gridGroup");
        disposeObject("_axesGroup");
        disposeObject("_constantLinesGroup");
        disposeObject("_stripLabelAxesGroup");
        disposeObject("_panesBorderGroup");
        disposeObject("_seriesGroup");
        disposeObject("_labelsGroup");
        disposeObject("_crosshairCursorGroup");
        disposeObject("_legendGroup");
        disposeObject("_scrollBarGroup");
        disposeObject("_scaleBreaksGroup")
    },
    _getAnimationOptions: function() {
        return this._themeManager.getOptions("animation")
    },
    _getDefaultSize: function() {
        return {
            width: 400,
            height: 400
        }
    },
    _getOption: function(name) {
        return this._themeManager.getOptions(name)
    },
    _applySize: function(rect) {
        this._rect = rect.slice();
        if (!this._changes.has("FULL_RENDER")) {
            this._processRefreshData(RESIZE_REFRESH_ACTION)
        }
    },
    _resize: function() {
        this._doRender(this.__renderOptions || {
            animate: false,
            isResize: true
        })
    },
    _trackerType: "ChartTracker",
    _createTracker: function() {
        this._tracker = new _tracker__WEBPACK_IMPORTED_MODULE_13__[this._trackerType]({
            seriesGroup: this._seriesGroup,
            renderer: this._renderer,
            tooltip: this._tooltip,
            legend: this._legend,
            eventTrigger: this._eventTrigger
        })
    },
    _getTrackerSettings: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({
            chart: this
        }, this._getSelectionModes())
    },
    _getSelectionModes: function() {
        var themeManager = this._themeManager;
        return {
            seriesSelectionMode: themeManager.getOptions("seriesSelectionMode"),
            pointSelectionMode: themeManager.getOptions("pointSelectionMode")
        }
    },
    _updateTracker: function(trackerCanvases) {
        this._tracker.update(this._getTrackerSettings());
        this._tracker.setCanvases({
            left: 0,
            right: this._canvas.width,
            top: 0,
            bottom: this._canvas.height
        }, trackerCanvases)
    },
    _createCanvasFromRect(rect) {
        var currentCanvas = this._canvas;
        return Object(_core_utils__WEBPACK_IMPORTED_MODULE_14__["setCanvasValues"])({
            left: rect[0],
            top: rect[1],
            right: currentCanvas.width - rect[2],
            bottom: currentCanvas.height - rect[3],
            width: currentCanvas.width,
            height: currentCanvas.height
        })
    },
    _doRender: function(_options) {
        if (0 === this._canvas.width && 0 === this._canvas.height) {
            return
        }
        this._resetIsReady();
        var drawOptions = this._prepareDrawOptions(_options);
        var recreateCanvas = drawOptions.recreateCanvas;
        this._preserveOriginalCanvas();
        if (recreateCanvas) {
            this.__currentCanvas = this._canvas
        } else {
            this._canvas = this.__currentCanvas
        }
        recreateCanvas && this._updateCanvasClipRect(this._canvas);
        this._canvas = this._createCanvasFromRect(this._rect);
        this._renderer.stopAllAnimations(true);
        this._cleanGroups();
        var startTime = new Date;
        this._renderElements(drawOptions);
        this._lastRenderingTime = new Date - startTime
    },
    _preserveOriginalCanvas() {
        this.__originalCanvas = this._canvas;
        this._canvas = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, this._canvas)
    },
    _layoutAxes: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    _renderElements: function(drawOptions) {
        var that = this;
        var preparedOptions = that._prepareToRender(drawOptions);
        var isRotated = that._isRotated();
        var isLegendInside = that._isLegendInside();
        var trackerCanvases = [];
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, that._canvas);
        var argBusinessRange;
        var zoomMinArg;
        var zoomMaxArg;
        that._renderer.lock();
        if (drawOptions.drawLegend && that._legend) {
            that._legendGroup.linkAppend()
        }
        that.layoutManager.setOptions(that._layoutManagerOptions());
        var layoutTargets = that._getLayoutTargets();
        this._layoutAxes(needSpace => {
            var axisDrawOptions = needSpace ? Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, drawOptions, {
                animate: false,
                recreateCanvas: true
            }) : drawOptions;
            var canvas = that._renderAxes(axisDrawOptions, preparedOptions);
            that._shrinkAxes(needSpace, canvas)
        });
        that._applyClipRects(preparedOptions);
        that._appendSeriesGroups();
        that._createCrosshairCursor();
        layoutTargets.forEach(_ref => {
            var {
                canvas: canvas
            } = _ref;
            trackerCanvases.push({
                left: canvas.left,
                right: canvas.width - canvas.right,
                top: canvas.top,
                bottom: canvas.height - canvas.bottom
            })
        });
        if (that._scrollBar) {
            argBusinessRange = that._argumentAxes[0].getTranslator().getBusinessRange();
            if ("discrete" === argBusinessRange.axisType && argBusinessRange.categories && argBusinessRange.categories.length <= 1 || "discrete" !== argBusinessRange.axisType && argBusinessRange.min === argBusinessRange.max) {
                zoomMinArg = zoomMaxArg = void 0
            } else {
                zoomMinArg = argBusinessRange.minVisible;
                zoomMaxArg = argBusinessRange.maxVisible
            }
            that._scrollBar.init(argBusinessRange, !that._argumentAxes[0].getOptions().valueMarginsEnabled).setPosition(zoomMinArg, zoomMaxArg)
        }
        that._updateTracker(trackerCanvases);
        that._updateLegendPosition(drawOptions, isLegendInside);
        that._applyPointMarkersAutoHiding();
        that._renderSeries(drawOptions, isRotated, isLegendInside);
        that._renderer.unlock()
    },
    _updateLegendPosition: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    _createCrosshairCursor: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    _appendSeriesGroups: function() {
        this._seriesGroup.linkAppend();
        this._labelsGroup.linkAppend();
        this._appendAdditionalSeriesGroups()
    },
    _renderSeries: function(drawOptions, isRotated, isLegendInside) {
        this._calculateSeriesLayout(drawOptions, isRotated);
        this._renderSeriesElements(drawOptions, isLegendInside)
    },
    _calculateSeriesLayout: function(drawOptions, isRotated) {
        drawOptions.hideLayoutLabels = this.layoutManager.needMoreSpaceForPanesCanvas(this._getLayoutTargets(), isRotated) && !this._themeManager.getOptions("adaptiveLayout").keepLabels;
        this._updateSeriesDimensions(drawOptions)
    },
    _getArgFilter: () => () => true,
    _getValFilter: series => () => true,
    _getPointsToAnimation(series) {
        var argViewPortFilter = this._getArgFilter();
        return series.map(s => {
            var valViewPortFilter = this._getValFilter(s);
            return s.getPoints().filter(p => p.getOptions().visible && argViewPortFilter(p.argument) && (valViewPortFilter(p.getMinValue(true)) || valViewPortFilter(p.getMaxValue(true)))).length
        })
    },
    _renderSeriesElements: function(drawOptions, isLegendInside) {
        var i;
        var series = this.series;
        var singleSeries;
        var seriesLength = series.length;
        var resolveLabelOverlapping = this._themeManager.getOptions("resolveLabelOverlapping");
        var pointsToAnimation = this._getPointsToAnimation(series);
        for (i = 0; i < seriesLength; i++) {
            singleSeries = series[i];
            this._applyExtraSettings(singleSeries, drawOptions);
            singleSeries.draw(drawOptions.animate && pointsToAnimation[i] <= drawOptions.animationPointsLimit && this._renderer.animationEnabled(), drawOptions.hideLayoutLabels, this._getLegendCallBack(singleSeries))
        }
        if ("none" === resolveLabelOverlapping) {
            this._adjustSeriesLabels(false)
        } else {
            this._locateLabels(resolveLabelOverlapping)
        }
        this._renderTrackers(isLegendInside);
        this._tracker.repairTooltip();
        this._renderExtraElements();
        this._clearCanvas();
        this._seriesElementsDrawn = true
    },
    _changesApplied() {
        if (this._seriesElementsDrawn) {
            this._seriesElementsDrawn = false;
            this._drawn();
            this._renderCompleteHandler()
        }
    },
    _locateLabels(resolveLabelOverlapping) {
        this._resolveLabelOverlapping(resolveLabelOverlapping)
    },
    _renderExtraElements() {},
    _clearCanvas: function() {
        this._canvas = this.__originalCanvas
    },
    _resolveLabelOverlapping: function(resolveLabelOverlapping) {
        var func;
        switch (resolveLabelOverlapping) {
            case "stack":
                func = this._resolveLabelOverlappingStack;
                break;
            case "hide":
                func = this._resolveLabelOverlappingHide;
                break;
            case "shift":
                func = this._resolveLabelOverlappingShift
        }
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(func) && func.call(this)
    },
    _getVisibleSeries: function() {
        return Object(_core_utils_common__WEBPACK_IMPORTED_MODULE_0__["grep"])(this.getAllSeries(), (function(series) {
            return series.isVisible()
        }))
    },
    _resolveLabelOverlappingHide: function() {
        var labels = [];
        var currentLabel;
        var nextLabel;
        var currentLabelRect;
        var nextLabelRect;
        var i;
        var j;
        var points;
        var series = this._getVisibleSeries();
        for (i = 0; i < series.length; i++) {
            points = series[i].getVisiblePoints();
            for (j = 0; j < points.length; j++) {
                labels.push.apply(labels, points[j].getLabels())
            }
        }
        for (i = 0; i < labels.length; i++) {
            currentLabel = labels[i];
            if (!currentLabel.isVisible()) {
                continue
            }
            currentLabelRect = currentLabel.getBoundingRect();
            for (j = i + 1; j < labels.length; j++) {
                nextLabel = labels[j];
                nextLabelRect = nextLabel.getBoundingRect();
                if (checkOverlapping(currentLabelRect, nextLabelRect)) {
                    nextLabel.draw(false)
                }
            }
        }
    },
    _cleanGroups: function() {
        this._stripsGroup.linkRemove().clear();
        this._gridGroup.linkRemove().clear();
        this._axesGroup.linkRemove().clear();
        this._constantLinesGroup.above.clear();
        this._stripLabelAxesGroup.linkRemove().clear();
        this._labelsGroup.linkRemove().clear();
        this._crosshairCursorGroup.linkRemove().clear();
        this._scaleBreaksGroup.linkRemove().clear()
    },
    _allowLegendInsidePosition: () => false,
    _createLegend: function() {
        var legendSettings = getLegendSettings(this._legendDataField);
        this._legend = new _components_legend__WEBPACK_IMPORTED_MODULE_8__["Legend"]({
            renderer: this._renderer,
            widget: this,
            group: this._legendGroup,
            backgroundClass: "dxc-border",
            itemGroupClass: "dxc-item",
            titleGroupClass: "dxc-title",
            textField: legendSettings.textField,
            getFormatObject: legendSettings.getFormatObject,
            allowInsidePosition: this._allowLegendInsidePosition()
        });
        this._updateLegend();
        this._layout.add(this._legend)
    },
    _updateLegend: function() {
        var themeManager = this._themeManager;
        var legendOptions = themeManager.getOptions("legend");
        var legendData = this._getLegendData();
        legendOptions.containerBackgroundColor = themeManager.getOptions("containerBackgroundColor");
        legendOptions._incidentOccurred = this._incidentOccurred;
        this._legend.update(legendData, legendOptions, themeManager.theme("legend").title);
        this._change(["LAYOUT"])
    },
    _prepareDrawOptions: function(drawOptions) {
        var animationOptions = this._getAnimationOptions();
        var options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, {
            force: false,
            adjustAxes: true,
            drawLegend: true,
            drawTitle: true,
            animate: animationOptions.enabled,
            animationPointsLimit: animationOptions.maxPointCountSupported
        }, drawOptions, this.__renderOptions);
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(options.recreateCanvas)) {
            options.recreateCanvas = options.adjustAxes && options.drawLegend && options.drawTitle
        }
        return options
    },
    _processRefreshData: function(newRefreshAction) {
        var currentRefreshActionPosition = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_5__["inArray"])(this._currentRefreshData, ACTIONS_BY_PRIORITY);
        var newRefreshActionPosition = Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_5__["inArray"])(newRefreshAction, ACTIONS_BY_PRIORITY);
        if (!this._currentRefreshData || currentRefreshActionPosition >= 0 && newRefreshActionPosition < currentRefreshActionPosition) {
            this._currentRefreshData = newRefreshAction
        }
        this._requestChange(["REFRESH"])
    },
    _getLegendData: function() {
        return Object(_core_utils__WEBPACK_IMPORTED_MODULE_14__["map"])(this._getLegendTargets(), (function(item) {
            var legendData = item.legendData;
            var style = item.getLegendStyles;
            var opacity = style.normal.opacity;
            if (!item.visible) {
                if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(opacity) || opacity > DEFAULT_OPACITY) {
                    opacity = DEFAULT_OPACITY
                }
                legendData.textOpacity = DEFAULT_OPACITY
            }
            var opacityStyle = {
                opacity: opacity
            };
            legendData.states = {
                hover: Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, style.hover, opacityStyle),
                selection: Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, style.selection, opacityStyle),
                normal: Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({}, style.normal, opacityStyle)
            };
            return legendData
        }))
    },
    _getLegendOptions: function(item) {
        return {
            legendData: {
                text: item[this._legendItemTextField],
                id: item.index,
                visible: true
            },
            getLegendStyles: item.getLegendStyles(),
            visible: item.isVisible()
        }
    },
    _disposeSeries(seriesIndex) {
        var _that$series;
        if (this.series) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(seriesIndex)) {
                this.series[seriesIndex].dispose();
                this.series.splice(seriesIndex, 1)
            } else {
                Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this.series, (_, s) => s.dispose());
                this.series.length = 0
            }
        }
        if (!(null !== (_that$series = this.series) && void 0 !== _that$series && _that$series.length)) {
            this.series = []
        }
    },
    _disposeSeriesFamilies() {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this.seriesFamilies || [], (function(_, family) {
            family.dispose()
        }));
        this.seriesFamilies = null;
        this._needHandleRenderComplete = true
    },
    _optionChanged: function(arg) {
        this._themeManager.resetOptions(arg.name);
        this.callBase.apply(this, arguments)
    },
    _applyChanges() {
        this._themeManager.update(this._options.silent());
        this.callBase.apply(this, arguments)
    },
    _optionChangesMap: {
        animation: "ANIMATION",
        dataSource: "DATA_SOURCE",
        palette: "PALETTE",
        paletteExtensionMode: "PALETTE",
        legend: "FORCE_DATA_INIT",
        seriesTemplate: "FORCE_DATA_INIT",
        export: "FORCE_RENDER",
        valueAxis: "AXES_AND_PANES",
        argumentAxis: "AXES_AND_PANES",
        commonAxisSettings: "AXES_AND_PANES",
        panes: "AXES_AND_PANES",
        commonPaneSettings: "AXES_AND_PANES",
        defaultPane: "AXES_AND_PANES",
        containerBackgroundColor: "AXES_AND_PANES",
        rotated: "ROTATED",
        autoHidePointMarkers: "REFRESH_SERIES_REINIT",
        customizePoint: "REFRESH_SERIES_REINIT",
        customizeLabel: "REFRESH_SERIES_REINIT",
        scrollBar: "SCROLL_BAR"
    },
    _optionChangesOrder: ["ROTATED", "PALETTE", "REFRESH_SERIES_REINIT", "USE_SPIDER_WEB", "AXES_AND_PANES", "INIT", "REINIT", "DATA_SOURCE", "REFRESH_SERIES_DATA_INIT", "DATA_INIT", "FORCE_DATA_INIT", "REFRESH_AXES", "CORRECT_AXIS"],
    _customChangesOrder: ["ANIMATION", "REFRESH_SERIES_FAMILIES", "FORCE_FIRST_DRAWING", "FORCE_DRAWING", "FORCE_RENDER", "VISUAL_RANGE", "SCROLL_BAR", "REINIT", "REFRESH", "FULL_RENDER"],
    _change_ANIMATION: function() {
        this._renderer.updateAnimationOptions(this._getAnimationOptions())
    },
    _change_DATA_SOURCE: function() {
        this._needHandleRenderComplete = true;
        this._updateDataSource()
    },
    _change_PALETTE: function() {
        this._themeManager.updatePalette();
        this._refreshSeries("DATA_INIT")
    },
    _change_REFRESH_SERIES_DATA_INIT: function() {
        this._refreshSeries("DATA_INIT")
    },
    _change_DATA_INIT: function() {
        if ((!this.series || this.needToPopulateSeries) && !this._changes.has("FORCE_DATA_INIT")) {
            this._dataInit()
        }
    },
    _change_FORCE_DATA_INIT: function() {
        this._dataInit()
    },
    _change_REFRESH_SERIES_FAMILIES: function() {
        this._processSeriesFamilies();
        this._populateBusinessRange();
        this._processRefreshData(FORCE_RENDER_REFRESH_ACTION)
    },
    _change_FORCE_RENDER: function() {
        this._processRefreshData(FORCE_RENDER_REFRESH_ACTION)
    },
    _change_AXES_AND_PANES: function() {
        this._refreshSeries("INIT")
    },
    _change_ROTATED: function() {
        this._createScrollBar();
        this._refreshSeries("INIT")
    },
    _change_REFRESH_SERIES_REINIT: function() {
        this._refreshSeries("INIT")
    },
    _change_REFRESH_AXES() {
        Object(_core_utils__WEBPACK_IMPORTED_MODULE_14__["setCanvasValues"])(this._canvas);
        this._reinitAxes();
        this._requestChange(["CORRECT_AXIS", "FULL_RENDER"])
    },
    _change_SCROLL_BAR: function() {
        this._createScrollBar();
        this._processRefreshData(FORCE_RENDER_REFRESH_ACTION)
    },
    _change_REINIT: function() {
        this._processRefreshData(REINIT_REFRESH_ACTION)
    },
    _change_FORCE_DRAWING: function() {
        this._resetComponentsAnimation()
    },
    _change_FORCE_FIRST_DRAWING: function() {
        this._resetComponentsAnimation(true)
    },
    _resetComponentsAnimation: function(isFirstDrawing) {
        this.series.forEach(s => {
            s.resetApplyingAnimation(isFirstDrawing)
        });
        this._resetAxesAnimation(isFirstDrawing)
    },
    _resetAxesAnimation: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    _refreshSeries: function(actionName) {
        this.needToPopulateSeries = true;
        this._requestChange([actionName])
    },
    _change_CORRECT_AXIS() {
        this._correctAxes()
    },
    _doRefresh: function() {
        var methodName = this._currentRefreshData;
        if (methodName) {
            this._currentRefreshData = null;
            this._renderer.stopAllAnimations(true);
            this[methodName]()
        }
    },
    _updateCanvasClipRect: function(canvas) {
        var width = Math.max(canvas.width - canvas.left - canvas.right, 0);
        var height = Math.max(canvas.height - canvas.top - canvas.bottom, 0);
        this._canvasClipRect.attr({
            x: canvas.left,
            y: canvas.top,
            width: width,
            height: height
        });
        this._backgroundRect.attr({
            x: canvas.left,
            y: canvas.top,
            width: width,
            height: height
        })
    },
    _getCanvasClipRectID: function() {
        return this._canvasClipRect.id
    },
    _dataSourceChangedHandler: function() {
        if (this._changes.has("INIT")) {
            this._requestChange(["DATA_INIT"])
        } else {
            this._requestChange(["FORCE_DATA_INIT"])
        }
    },
    _dataInit: function() {
        this._dataSpecificInit(true)
    },
    _processSingleSeries: function(singleSeries) {
        singleSeries.createPoints(false)
    },
    _handleSeriesDataUpdated() {
        if (this._getVisibleSeries().some(s => s.useAggregation())) {
            this._populateMarginOptions()
        }
        this.series.forEach(s => this._processSingleSeries(s), this)
    },
    _dataSpecificInit(needRedraw) {
        if (!this.series || this.needToPopulateSeries) {
            this.series = this._populateSeries()
        }
        this._repopulateSeries();
        this._seriesPopulatedHandlerCore();
        this._populateBusinessRange();
        this._tracker.updateSeries(this.series, this._changes.has("INIT"));
        this._updateLegend();
        if (needRedraw) {
            this._requestChange(["FULL_RENDER"])
        }
    },
    _forceRender: function() {
        this._doRender({
            force: true
        })
    },
    _repopulateSeries: function() {
        var themeManager = this._themeManager;
        var data = this._dataSourceItems();
        var dataValidatorOptions = themeManager.getOptions("dataPrepareSettings");
        var seriesTemplate = themeManager.getOptions("seriesTemplate");
        if (seriesTemplate) {
            this._populateSeries(data)
        }
        this._groupSeries();
        var parsedData = Object(_components_data_validator__WEBPACK_IMPORTED_MODULE_9__["validateData"])(data, this._groupsData, this._incidentOccurred, dataValidatorOptions);
        themeManager.resetPalette();
        this.series.forEach((function(singleSeries) {
            singleSeries.updateData(parsedData[singleSeries.getArgumentField()])
        }));
        this._handleSeriesDataUpdated()
    },
    _renderCompleteHandler: function() {
        var allSeriesInited = true;
        if (this._needHandleRenderComplete) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this.series, (function(_, s) {
                allSeriesInited = allSeriesInited && s.canRenderCompleteHandle()
            }));
            if (allSeriesInited) {
                this._needHandleRenderComplete = false;
                this._eventTrigger("done", {
                    target: this
                })
            }
        }
    },
    _dataIsReady: function() {
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(this.option("dataSource")) && this._dataIsLoaded()
    },
    _populateSeriesOptions(data) {
        var that = this;
        var themeManager = that._themeManager;
        var seriesTemplate = themeManager.getOptions("seriesTemplate");
        var seriesOptions = seriesTemplate ? Object(_core_utils__WEBPACK_IMPORTED_MODULE_14__["processSeriesTemplate"])(seriesTemplate, data || []) : that.option("series");
        var allSeriesOptions = _isArray(seriesOptions) ? seriesOptions : seriesOptions ? [seriesOptions] : [];
        var extraOptions = that._getExtraOptions();
        var particularSeriesOptions;
        var seriesTheme;
        var seriesThemes = [];
        var seriesVisibilityChanged = target => {
            that._specialProcessSeries();
            that._populateBusinessRange(target && target.getValueAxis(), true);
            that._renderer.stopAllAnimations(true);
            that._updateLegend();
            that._requestChange(["FULL_RENDER"])
        };
        for (var i = 0; i < allSeriesOptions.length; i++) {
            particularSeriesOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])(true, {}, allSeriesOptions[i], extraOptions);
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(particularSeriesOptions.name) || "" === particularSeriesOptions.name) {
                particularSeriesOptions.name = "Series " + (i + 1).toString()
            }
            particularSeriesOptions.rotated = that._isRotated();
            particularSeriesOptions.customizePoint = themeManager.getOptions("customizePoint");
            particularSeriesOptions.customizeLabel = themeManager.getOptions("customizeLabel");
            particularSeriesOptions.visibilityChanged = seriesVisibilityChanged;
            particularSeriesOptions.incidentOccurred = that._incidentOccurred;
            seriesTheme = themeManager.getOptions("series", particularSeriesOptions, allSeriesOptions.length);
            if (that._checkPaneName(seriesTheme)) {
                seriesThemes.push(seriesTheme)
            }
        }
        return seriesThemes
    },
    _populateSeries(data) {
        var _that$series2;
        var that = this;
        var seriesBasis = [];
        var incidentOccurred = that._incidentOccurred;
        var seriesThemes = that._populateSeriesOptions(data);
        var particularSeries;
        var disposeSeriesFamilies = false;
        that.needToPopulateSeries = false;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(seriesThemes, (_, theme) => {
            var curSeries = that.series && that.series.filter(s => s.name === theme.name && -1 === seriesBasis.map(sb => sb.series).indexOf(s))[0];
            if (curSeries && curSeries.type === theme.type) {
                seriesBasis.push({
                    series: curSeries,
                    options: theme
                })
            } else {
                seriesBasis.push({
                    options: theme
                });
                disposeSeriesFamilies = true
            }
        });
        0 !== (null === (_that$series2 = that.series) || void 0 === _that$series2 ? void 0 : _that$series2.length) && that._tracker.clearHover();
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["reverseEach"])(that.series, (index, series) => {
            if (!seriesBasis.some(s => series === s.series)) {
                that._disposeSeries(index);
                disposeSeriesFamilies = true
            }
        });
        !disposeSeriesFamilies && (disposeSeriesFamilies = seriesBasis.some(sb => sb.series.name !== seriesThemes[sb.series.index].name));
        that.series = [];
        disposeSeriesFamilies && that._disposeSeriesFamilies();
        that._themeManager.resetPalette();
        var eventPipe = function(data) {
            that.series.forEach((function(currentSeries) {
                currentSeries.notify(data)
            }))
        };
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(seriesBasis, (_, basis) => {
            var _that$_argumentAxes$f, _that$_argumentAxes;
            var seriesTheme = basis.options;
            var argumentAxis = null !== (_that$_argumentAxes$f = null === (_that$_argumentAxes = that._argumentAxes) || void 0 === _that$_argumentAxes ? void 0 : _that$_argumentAxes.filter(a => a.pane === seriesTheme.pane)[0]) && void 0 !== _that$_argumentAxes$f ? _that$_argumentAxes$f : that.getArgumentAxis();
            var renderSettings = {
                commonSeriesModes: that._getSelectionModes(),
                argumentAxis: argumentAxis,
                valueAxis: that._getValueAxis(seriesTheme.pane, seriesTheme.axis)
            };
            if (basis.series) {
                particularSeries = basis.series;
                particularSeries.updateOptions(seriesTheme, renderSettings)
            } else {
                particularSeries = new _series_base_series__WEBPACK_IMPORTED_MODULE_10__["Series"](Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"])({
                    renderer: that._renderer,
                    seriesGroup: that._seriesGroup,
                    labelsGroup: that._labelsGroup,
                    eventTrigger: that._eventTrigger,
                    eventPipe: eventPipe,
                    incidentOccurred: incidentOccurred
                }, renderSettings), seriesTheme)
            }
            if (!particularSeries.isUpdated) {
                incidentOccurred("E2101", [seriesTheme.type])
            } else {
                particularSeries.index = that.series.length;
                that.series.push(particularSeries)
            }
        });
        return that.series
    },
    getStackedPoints: function(point) {
        var stackName = point.series.getStackName();
        return this._getVisibleSeries().reduce((stackPoints, series) => {
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(series.getStackName()) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(stackName) || stackName === series.getStackName()) {
                stackPoints = stackPoints.concat(series.getPointsByArg(point.argument))
            }
            return stackPoints
        }, [])
    },
    getAllSeries: function() {
        return (this.series || []).slice()
    },
    getSeriesByName: function(name) {
        var found = null;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this.series, (function(i, singleSeries) {
            if (singleSeries.name === name) {
                found = singleSeries;
                return false
            }
        }));
        return found
    },
    getSeriesByPos: function(pos) {
        return (this.series || [])[pos]
    },
    clearSelection: function() {
        this._tracker.clearSelection()
    },
    hideTooltip: function() {
        this._tracker._hideTooltip()
    },
    clearHover() {
        this._tracker.clearHover()
    },
    render: function(renderOptions) {
        var that = this;
        that.__renderOptions = renderOptions;
        that.__forceRender = renderOptions && renderOptions.force;
        that.callBase.apply(that, arguments);
        that.__renderOptions = that.__forceRender = null;
        return that
    },
    refresh: function() {
        this._disposeSeries();
        this._disposeSeriesFamilies();
        this._requestChange(["CONTAINER_SIZE", "REFRESH_SERIES_REINIT"])
    },
    _getMinSize() {
        var adaptiveLayout = this._layoutManagerOptions();
        return [adaptiveLayout.width, adaptiveLayout.height]
    },
    _change_REFRESH() {
        if (!this._changes.has("INIT")) {
            this._doRefresh()
        } else {
            this._currentRefreshData = null
        }
    },
    _change_FULL_RENDER() {
        this._forceRender()
    },
    _change_INIT() {
        this._reinit()
    },
    _stopCurrentHandling: function() {
        this._tracker.stopCurrentHandling()
    }
});
REFRESH_SERIES_DATA_INIT_ACTION_OPTIONS.forEach((function(name) {
    BaseChart.prototype._optionChangesMap[name] = "REFRESH_SERIES_DATA_INIT"
}));
FORCE_RENDER_REFRESH_ACTION_OPTIONS.forEach((function(name) {
    BaseChart.prototype._optionChangesMap[name] = "FORCE_RENDER"
}));
REFRESH_SERIES_FAMILIES_ACTION_OPTIONS.forEach((function(name) {
    BaseChart.prototype._optionChangesMap[name] = "REFRESH_SERIES_FAMILIES"
}));





BaseChart.addPlugin(_core_export__WEBPACK_IMPORTED_MODULE_15__["plugin"]);
BaseChart.addPlugin(_core_title__WEBPACK_IMPORTED_MODULE_16__["plugin"]);
BaseChart.addPlugin(_core_data_source__WEBPACK_IMPORTED_MODULE_17__["plugin"]);
BaseChart.addPlugin(_core_tooltip__WEBPACK_IMPORTED_MODULE_18__["plugin"]);
BaseChart.addPlugin(_core_loading_indicator__WEBPACK_IMPORTED_MODULE_19__["plugin"]);
var _change_TITLE = BaseChart.prototype._change_TITLE;
BaseChart.prototype._change_TITLE = function() {
    _change_TITLE.apply(this, arguments);
    this._change(["FORCE_RENDER"])
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/chart_components/layout_manager.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/chart_components/layout_manager.js ***!
  \****************************************************************************/
/*! exports provided: LayoutManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutManager", function() { return LayoutManager; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _components_consts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/consts */ "./node_modules/devextreme/esm/viz/components/consts.js");
/* harmony import */ var _core_layout_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/layout_element */ "./node_modules/devextreme/esm/viz/core/layout_element.js");
/**
 * DevExtreme (esm/viz/chart_components/layout_manager.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var {
    floor: floor,
    sqrt: sqrt
} = Math;
var _min = Math.min;
var _max = Math.max;
var DEFAULT_INNER_RADIUS = .5;
var RADIAL_LABEL_INDENT = _components_consts__WEBPACK_IMPORTED_MODULE_1__["default"].radialLabelIndent;

function getNearestCoord(firstCoord, secondCoord, pointCenterCoord) {
    var nearestCoord;
    if (pointCenterCoord < firstCoord) {
        nearestCoord = firstCoord
    } else if (secondCoord < pointCenterCoord) {
        nearestCoord = secondCoord
    } else {
        nearestCoord = pointCenterCoord
    }
    return nearestCoord
}

function getLabelLayout(point) {
    if (point._label.isVisible() && "inside" !== point._label.getLayoutOptions().position) {
        return point._label.getBoundingRect()
    }
}

function getPieRadius(series, paneCenterX, paneCenterY, accessibleRadius, minR) {
    series.some((function(singleSeries) {
        return singleSeries.getVisiblePoints().reduce((function(radiusIsFound, point) {
            var labelBBox = getLabelLayout(point);
            if (labelBBox) {
                var xCoords = getNearestCoord(labelBBox.x, labelBBox.x + labelBBox.width, paneCenterX);
                var yCoords = getNearestCoord(labelBBox.y, labelBBox.y + labelBBox.height, paneCenterY);
                accessibleRadius = _min(_max(getLengthFromCenter(xCoords, yCoords, paneCenterX, paneCenterY) - RADIAL_LABEL_INDENT, minR), accessibleRadius);
                radiusIsFound = true
            }
            return radiusIsFound
        }), false)
    }));
    return accessibleRadius
}

function getSizeLabels(series) {
    return series.reduce((function(res, singleSeries) {
        var maxWidth = singleSeries.getVisiblePoints().reduce((function(width, point) {
            var labelBBox = getLabelLayout(point);
            if (labelBBox && labelBBox.width > width) {
                width = labelBBox.width
            }
            return width
        }), 0);
        var rWidth = maxWidth;
        if (maxWidth) {
            res.outerLabelsCount++;
            if (res.outerLabelsCount > 1) {
                maxWidth += _components_consts__WEBPACK_IMPORTED_MODULE_1__["default"].pieLabelSpacing
            }
            rWidth += _components_consts__WEBPACK_IMPORTED_MODULE_1__["default"].pieLabelSpacing
        }
        res.sizes.push(maxWidth);
        res.rSizes.push(rWidth);
        res.common += maxWidth;
        return res
    }), {
        sizes: [],
        rSizes: [],
        common: 0,
        outerLabelsCount: 0
    })
}

function correctLabelRadius(labelSizes, radius, series, canvas, averageWidthLabels, centerX) {
    var curRadius;
    var i;
    var runningWidth = 0;
    var sizes = labelSizes.sizes;
    var rSizes = labelSizes.rSizes;
    for (i = 0; i < series.length; i++) {
        if (0 === sizes[i]) {
            curRadius && (curRadius += rSizes[i - 1]);
            continue
        }
        curRadius = floor(curRadius ? curRadius + rSizes[i - 1] : radius);
        series[i].correctLabelRadius(curRadius);
        runningWidth += averageWidthLabels || sizes[i];
        rSizes[i] = averageWidthLabels || rSizes[i];
        series[i].setVisibleArea({
            left: floor(centerX - radius - runningWidth),
            right: floor(canvas.width - (centerX + radius + runningWidth)),
            top: canvas.top,
            bottom: canvas.bottom,
            width: canvas.width,
            height: canvas.height
        })
    }
}

function getLengthFromCenter(x, y, paneCenterX, paneCenterY) {
    return sqrt((x - paneCenterX) * (x - paneCenterX) + (y - paneCenterY) * (y - paneCenterY))
}

function getInnerRadius(_ref) {
    var {
        type: type,
        innerRadius: innerRadius
    } = _ref;
    return "pie" === type ? 0 : Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumeric"])(innerRadius) ? Number(innerRadius) : DEFAULT_INNER_RADIUS
}

function LayoutManager() {}

function getAverageLabelWidth(centerX, radius, canvas, sizeLabels) {
    return (centerX - radius - RADIAL_LABEL_INDENT - canvas.left) / sizeLabels.outerLabelsCount
}

function getFullRadiusWithLabels(centerX, canvas, sizeLabels) {
    return centerX - canvas.left - (sizeLabels.outerLabelsCount > 0 ? sizeLabels.common + RADIAL_LABEL_INDENT : 0)
}

function correctAvailableRadius(availableRadius, canvas, series, minR, paneCenterX, paneCenterY) {
    var sizeLabels = getSizeLabels(series);
    var averageWidthLabels;
    var fullRadiusWithLabels = getFullRadiusWithLabels(paneCenterX, canvas, sizeLabels);
    if (fullRadiusWithLabels < minR) {
        availableRadius = minR;
        averageWidthLabels = getAverageLabelWidth(paneCenterX, availableRadius, canvas, sizeLabels)
    } else {
        availableRadius = _min(getPieRadius(series, paneCenterX, paneCenterY, availableRadius, minR), fullRadiusWithLabels)
    }
    correctLabelRadius(sizeLabels, availableRadius + RADIAL_LABEL_INDENT, series, canvas, averageWidthLabels, paneCenterX);
    return availableRadius
}

function toLayoutElementCoords(canvas) {
    return new _core_layout_element__WEBPACK_IMPORTED_MODULE_2__["WrapperLayoutElement"](null, {
        x: canvas.left,
        y: canvas.top,
        width: canvas.width - canvas.left - canvas.right,
        height: canvas.height - canvas.top - canvas.bottom
    })
}
LayoutManager.prototype = {
    constructor: LayoutManager,
    setOptions: function(options) {
        this._options = options
    },
    applyPieChartSeriesLayout: function(canvas, series, hideLayoutLabels) {
        var paneSpaceHeight = canvas.height - canvas.top - canvas.bottom;
        var paneSpaceWidth = canvas.width - canvas.left - canvas.right;
        var paneCenterX = paneSpaceWidth / 2 + canvas.left;
        var paneCenterY = paneSpaceHeight / 2 + canvas.top;
        var piePercentage = this._options.piePercentage;
        var availableRadius;
        var minR;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumeric"])(piePercentage)) {
            availableRadius = minR = piePercentage * _min(canvas.height, canvas.width) / 2
        } else {
            availableRadius = _min(paneSpaceWidth, paneSpaceHeight) / 2;
            minR = this._options.minPiePercentage * availableRadius
        }
        if (!hideLayoutLabels) {
            availableRadius = correctAvailableRadius(availableRadius, canvas, series, minR, paneCenterX, paneCenterY)
        }
        return {
            centerX: floor(paneCenterX),
            centerY: floor(paneCenterY),
            radiusInner: floor(availableRadius * getInnerRadius(series[0])),
            radiusOuter: floor(availableRadius)
        }
    },
    applyEqualPieChartLayout: function(series, layout) {
        var radius = layout.radius;
        return {
            centerX: floor(layout.x),
            centerY: floor(layout.y),
            radiusInner: floor(radius * getInnerRadius(series[0])),
            radiusOuter: floor(radius)
        }
    },
    correctPieLabelRadius: function(series, layout, canvas) {
        var sizeLabels = getSizeLabels(series);
        var averageWidthLabels;
        var radius = layout.radiusOuter + RADIAL_LABEL_INDENT;
        var availableLabelWidth = layout.centerX - canvas.left - radius;
        if (sizeLabels.common + RADIAL_LABEL_INDENT > availableLabelWidth) {
            averageWidthLabels = getAverageLabelWidth(layout.centerX, layout.radiusOuter, canvas, sizeLabels)
        }
        correctLabelRadius(sizeLabels, radius, series, canvas, averageWidthLabels, layout.centerX)
    },
    needMoreSpaceForPanesCanvas(panes, rotated, fixedSizeCallback) {
        var options = this._options;
        var width = options.width;
        var height = options.height;
        var piePercentage = options.piePercentage;
        var percentageIsValid = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumeric"])(piePercentage);
        var needHorizontalSpace = 0;
        var needVerticalSpace = 0;
        panes.forEach(pane => {
            var paneCanvas = pane.canvas;
            var minSize = percentageIsValid ? _min(paneCanvas.width, paneCanvas.height) * piePercentage : void 0;
            var paneSized = fixedSizeCallback ? fixedSizeCallback(pane) : {
                width: false,
                height: false
            };
            var needPaneHorizontalSpace = !paneSized.width ? (percentageIsValid ? minSize : width) - (paneCanvas.width - paneCanvas.left - paneCanvas.right) : 0;
            var needPaneVerticalSpace = !paneSized.height ? (percentageIsValid ? minSize : height) - (paneCanvas.height - paneCanvas.top - paneCanvas.bottom) : 0;
            if (rotated) {
                needHorizontalSpace += needPaneHorizontalSpace > 0 ? needPaneHorizontalSpace : 0;
                needVerticalSpace = _max(needPaneVerticalSpace > 0 ? needPaneVerticalSpace : 0, needVerticalSpace)
            } else {
                needHorizontalSpace = _max(needPaneHorizontalSpace > 0 ? needPaneHorizontalSpace : 0, needHorizontalSpace);
                needVerticalSpace += needPaneVerticalSpace > 0 ? needPaneVerticalSpace : 0
            }
        });
        return needHorizontalSpace > 0 || needVerticalSpace > 0 ? {
            width: needHorizontalSpace,
            height: needVerticalSpace
        } : false
    },
    layoutInsideLegend: function(legend, canvas) {
        var layoutOptions = legend.getLayoutOptions();
        if (!layoutOptions) {
            return
        }
        var position = layoutOptions.position;
        var cutSide = layoutOptions.cutSide;
        var my = {
            horizontal: position.horizontal,
            vertical: position.vertical
        };
        canvas[layoutOptions.cutLayoutSide] += "horizontal" === layoutOptions.cutSide ? layoutOptions.width : layoutOptions.height;
        my[cutSide] = {
            left: "right",
            right: "left",
            top: "bottom",
            bottom: "top",
            center: "center"
        } [my[cutSide]];
        legend.position({
            of: toLayoutElementCoords(canvas),
            my: my,
            at: position
        })
    }
};



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/chart_components/tracker.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/chart_components/tracker.js ***!
  \*********************************************************************/
/*! exports provided: ChartTracker, PieTracker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartTracker", function() { return ChartTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieTracker", function() { return PieTracker; });
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _events_click__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../events/click */ "./node_modules/devextreme/esm/events/click.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _components_consts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/consts */ "./node_modules/devextreme/esm/viz/components/consts.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../events/pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/viz/chart_components/tracker.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */











var _floor = Math.floor;
var eventsConsts = _components_consts__WEBPACK_IMPORTED_MODULE_5__["default"].events;
var statesConsts = _components_consts__WEBPACK_IMPORTED_MODULE_5__["default"].states;
var HOVER_STATE = statesConsts.hoverMark;
var NORMAL_STATE = statesConsts.normalMark;
var EVENT_NS = "dxChartTracker";
var DOT_EVENT_NS = "." + EVENT_NS;
var POINTER_ACTION = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_8__["addNamespace"])([_events_pointer__WEBPACK_IMPORTED_MODULE_7__["default"].down, _events_pointer__WEBPACK_IMPORTED_MODULE_7__["default"].move], EVENT_NS);
var LEGEND_CLICK = "legendClick";
var SERIES_CLICK = "seriesClick";
var POINT_CLICK = "pointClick";
var POINT_DATA = "chart-data-point";
var SERIES_DATA = "chart-data-series";
var ARG_DATA = "chart-data-argument";
var DELAY = 100;
var HOLD_TIMEOUT = 300;
var NONE_MODE = "none";
var ALL_ARGUMENT_POINTS_MODE = "allargumentpoints";
var INCLUDE_POINTS_MODE = "includepoints";
var EXLUDE_POINTS_MODE = "excludepoints";
var LEGEND_HOVER_MODES = [INCLUDE_POINTS_MODE, EXLUDE_POINTS_MODE, NONE_MODE];

function getData(event, dataKey, tryCheckParent) {
    var target = event.target;
    if ("tspan" === target.tagName) {
        return target.parentNode[dataKey]
    }
    var data = target[dataKey];
    if (tryCheckParent && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(data)) {
        return function getParentData(node) {
            if (node.parentNode) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(node.parentNode[dataKey])) {
                    return node.parentNode[dataKey]
                } else {
                    return getParentData(node.parentNode)
                }
            }
            return
        }(target)
    }
    return data
}

function eventCanceled(event, target) {
    return event.cancel || !target.getOptions()
}

function correctLegendHoverMode(mode) {
    if (LEGEND_HOVER_MODES.indexOf(mode) > -1) {
        return mode
    } else {
        return INCLUDE_POINTS_MODE
    }
}

function correctHoverMode(target) {
    var mode = target.getOptions().hoverMode;
    return mode === NONE_MODE ? mode : ALL_ARGUMENT_POINTS_MODE
}
var baseTrackerPrototype = {
    ctor: function(options) {
        var that = this;
        var data = {
            tracker: that
        };
        that._renderer = options.renderer;
        that._legend = options.legend;
        that._tooltip = options.tooltip;
        that._eventTrigger = options.eventTrigger;
        that._seriesGroup = options.seriesGroup;
        options.seriesGroup.off(DOT_EVENT_NS).on(Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_8__["addNamespace"])(eventsConsts.showPointTooltip, EVENT_NS), data, that._showPointTooltip).on(Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_8__["addNamespace"])(eventsConsts.hidePointTooltip, EVENT_NS), data, that._hidePointTooltip);
        that._renderer.root.off(DOT_EVENT_NS).on(POINTER_ACTION, data, that._pointerHandler).on(Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_8__["addNamespace"])(_events_pointer__WEBPACK_IMPORTED_MODULE_7__["default"].up, EVENT_NS), () => clearTimeout(that._holdTimer)).on(Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_8__["addNamespace"])(_events_click__WEBPACK_IMPORTED_MODULE_2__["name"], EVENT_NS), data, that._clickHandler)
    },
    update: function(options) {
        this._chart = options.chart
    },
    updateSeries(series, resetDecorations) {
        var that = this;
        var noHoveredSeries = !(null !== series && void 0 !== series && series.some(s => s === that.hoveredSeries) || that._hoveredPoint && that._hoveredPoint.series);
        if (that._storedSeries !== series) {
            that._storedSeries = series || []
        }
        if (noHoveredSeries) {
            that._clean();
            that._renderer.initHatching()
        }
        if (resetDecorations) {
            that.clearSelection();
            if (!noHoveredSeries) {
                that._hideTooltip(that.pointAtShownTooltip);
                that.clearHover()
            }
        }
    },
    setCanvases: function(mainCanvas, paneCanvases) {
        this._mainCanvas = mainCanvas;
        this._canvases = paneCanvases
    },
    repairTooltip: function() {
        var point = this.pointAtShownTooltip;
        if (!point || !point.series || !point.isVisible()) {
            this._hideTooltip(point, true)
        } else {
            this._showTooltip(point)
        }
    },
    _setHoveredPoint: function(point) {
        if (point === this._hoveredPoint) {
            return
        }
        this._releaseHoveredPoint();
        point.hover();
        this._hoveredPoint = point
    },
    _releaseHoveredPoint: function(isPointerOut) {
        if (this._hoveredPoint && this._hoveredPoint.getOptions()) {
            this._hoveredPoint.clearHover();
            this._hoveredPoint = null;
            if (this._tooltip.isEnabled()) {
                this._hideTooltip(this._hoveredPoint, false, isPointerOut)
            }
        }
    },
    _setHoveredSeries: function(series, mode) {
        this._releaseHoveredSeries();
        this._releaseHoveredPoint();
        series.hover(mode);
        this.hoveredSeries = series
    },
    _releaseHoveredSeries() {
        if (this.hoveredSeries) {
            this.hoveredSeries.clearHover();
            this.hoveredSeries = null
        }
    },
    clearSelection() {
        this._storedSeries.forEach(series => {
            if (series) {
                series.clearSelection();
                series.getPoints().forEach(point => point.clearSelection())
            }
        })
    },
    _clean: function() {
        this.hoveredPoint = this.hoveredSeries = this._hoveredArgumentPoints = null;
        this._hideTooltip(this.pointAtShownTooltip)
    },
    clearHover: function(isPointerOut) {
        this._resetHoveredArgument();
        this._releaseHoveredSeries();
        this._releaseHoveredPoint(isPointerOut)
    },
    _hideTooltip: function(point, silent, isPointerOut) {
        if (!this._tooltip || point && this.pointAtShownTooltip !== point) {
            return
        }
        if (!silent && this.pointAtShownTooltip) {
            this.pointAtShownTooltip = null
        }
        this._tooltip.hide(!!isPointerOut)
    },
    _showTooltip: function(point) {
        var that = this;
        var tooltipFormatObject;
        var eventData = {
            target: point
        };
        if (null !== point && void 0 !== point && point.getOptions()) {
            tooltipFormatObject = point.getTooltipFormatObject(that._tooltip, that._tooltip.isShared() && that._chart.getStackedPoints(point));
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(tooltipFormatObject.valueText) && !tooltipFormatObject.points || !point.isVisible()) {
                return
            }
            var coords = point.getTooltipParams(that._tooltip.getLocation());
            var rootOffset = that._renderer.getRootOffset();
            coords.x += rootOffset.left;
            coords.y += rootOffset.top;
            var callback = result => {
                result && (that.pointAtShownTooltip = point)
            };
            callback(that._tooltip.show(tooltipFormatObject, coords, eventData, void 0, callback))
        }
    },
    _showPointTooltip: function(event, point) {
        var that = event.data.tracker;
        var pointWithTooltip = that.pointAtShownTooltip;
        if (pointWithTooltip && pointWithTooltip !== point) {
            that._hideTooltip(pointWithTooltip)
        }
        that._showTooltip(point)
    },
    _hidePointTooltip: function(event, point) {
        event.data.tracker._hideTooltip(point, false, true)
    },
    _enableOutHandler: function() {
        if (this._outHandler) {
            return
        }
        var that = this;
        var handler = function(e) {
            var rootOffset = that._renderer.getRootOffset();
            var x = _floor(e.pageX - rootOffset.left);
            var y = _floor(e.pageY - rootOffset.top);
            if (!Object(_core_utils__WEBPACK_IMPORTED_MODULE_6__["pointInCanvas"])(that._mainCanvas, x, y) && !that._isCursorOnTooltip(e)) {
                that._pointerOut();
                that._disableOutHandler()
            }
        };
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].on(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].getDocument(), POINTER_ACTION, handler);
        this._outHandler = handler
    },
    _isCursorOnTooltip: function(e) {
        return this._tooltip.isEnabled() && this._tooltip.isCursorOnTooltip(e.pageX, e.pageY)
    },
    _disableOutHandler: function() {
        this._outHandler && _events_core_events_engine__WEBPACK_IMPORTED_MODULE_1__["default"].off(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].getDocument(), POINTER_ACTION, this._outHandler);
        this._outHandler = null
    },
    stopCurrentHandling: function() {
        this._pointerOut(true)
    },
    _pointerOut: function(force) {
        this.clearHover(true);
        (force || this._tooltip.isEnabled()) && this._hideTooltip(this.pointAtShownTooltip, false, true)
    },
    _triggerLegendClick: function(eventArgs, elementClick) {
        var eventTrigger = this._eventTrigger;
        eventTrigger(LEGEND_CLICK, eventArgs, (function() {
            !eventCanceled(eventArgs.event, eventArgs.target) && eventTrigger(elementClick, eventArgs)
        }))
    },
    _hoverLegendItem: function(x, y) {
        var item = this._legend.getItemByCoord(x, y);
        var series;
        var legendHoverMode = correctLegendHoverMode(this._legend.getOptions().hoverMode);
        if (item) {
            series = this._storedSeries[item.id];
            if (!series.isHovered() || series.lastHoverMode !== legendHoverMode) {
                this._setHoveredSeries(series, legendHoverMode)
            }
            this._tooltip.isEnabled() && this._hideTooltip(this.pointAtShownTooltip)
        } else {
            this.clearHover()
        }
    },
    _hoverArgument: function(argument, argumentIndex) {
        var hoverMode = this._getArgumentHoverMode();
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(argument)) {
            this._releaseHoveredPoint();
            this._hoveredArgument = argument;
            this._argumentIndex = argumentIndex;
            this._notifySeries({
                action: "pointHover",
                notifyLegend: this._notifyLegendOnHoverArgument,
                target: {
                    argument: argument,
                    fullState: HOVER_STATE,
                    argumentIndex: argumentIndex,
                    getOptions: function() {
                        return {
                            hoverMode: hoverMode
                        }
                    }
                }
            })
        }
    },
    _resetHoveredArgument: function() {
        var hoverMode;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(this._hoveredArgument)) {
            hoverMode = this._getArgumentHoverMode();
            this._notifySeries({
                action: "clearPointHover",
                notifyLegend: this._notifyLegendOnHoverArgument,
                target: {
                    fullState: NORMAL_STATE,
                    argumentIndex: this._argumentIndex,
                    argument: this._hoveredArgument,
                    getOptions: function() {
                        return {
                            hoverMode: hoverMode
                        }
                    }
                }
            });
            this._hoveredArgument = null
        }
    },
    _notifySeries: function(data) {
        this._storedSeries.forEach((function(series) {
            series.notify(data)
        }))
    },
    _pointerHandler: function(e) {
        var _series;
        var that = e.data.tracker;
        var rootOffset = that._renderer.getRootOffset();
        var x = _floor(e.pageX - rootOffset.left);
        var y = _floor(e.pageY - rootOffset.top);
        var canvas = that._getCanvas(x, y);
        var series = getData(e, SERIES_DATA);
        var point = getData(e, POINT_DATA) || (null === (_series = series) || void 0 === _series ? void 0 : _series.getPointByCoord(x, y));
        that._isHolding = false;
        clearTimeout(that._holdTimer);
        if (e.type === _events_pointer__WEBPACK_IMPORTED_MODULE_7__["default"].down) {
            that._holdTimer = setTimeout(() => that._isHolding = true, HOLD_TIMEOUT)
        }
        if (point && !point.getMarkerVisibility()) {
            point = void 0
        }
        that._enableOutHandler();
        if (that._legend.coordsIn(x, y)) {
            that._hoverLegendItem(x, y);
            return
        }
        if (that.hoveredSeries && that.hoveredSeries !== that._stuckSeries) {
            that._releaseHoveredSeries()
        }
        if (that._hoverArgumentAxis(x, y, e)) {
            return
        }
        if (that._isPointerOut(canvas, point)) {
            that._pointerOut()
        }
        if (!canvas && !point) {
            return
        }
        if (series && !point) {
            point = series.getNeighborPoint(x, y);
            if (!that._stickyHovering && point && !point.coordsIn(x, y)) {
                point = null
            }
            if (series !== that.hoveredSeries) {
                that._setTimeout((function() {
                    that._setHoveredSeries(series);
                    that._setStuckSeries(e, series, x, y);
                    that._pointerComplete(point, x, y)
                }), series);
                return
            }
        } else if (point) {
            if (e.type !== _events_pointer__WEBPACK_IMPORTED_MODULE_7__["default"].move && "touch" !== e.pointerType) {
                return
            }
            if (that.hoveredSeries) {
                that._setTimeout(() => that._pointerOnPoint(point, x, y, e), point)
            } else {
                that._pointerOnPoint(point, x, y, e)
            }
            return
        } else if (that._setStuckSeries(e, void 0, x, y) && that._stickyHovering) {
            var _point;
            series = that._stuckSeries;
            point = series.getNeighborPoint(x, y);
            that._releaseHoveredSeries();
            (null === (_point = point) || void 0 === _point ? void 0 : _point.getMarkerVisibility()) && that._setHoveredPoint(point)
        } else if (!that._stickyHovering) {
            that._pointerOut()
        }
        that._pointerComplete(point, x, y)
    },
    _pointerOnPoint: function(point, x, y) {
        this._resetHoveredArgument();
        this._setHoveredPoint(point);
        this._pointerComplete(point, x, y)
    },
    _pointerComplete: function(point) {
        this.pointAtShownTooltip !== point && this._tooltip.isEnabled() && this._showTooltip(point)
    },
    _clickHandler: function(e) {
        var _point2;
        var that = e.data.tracker;
        if (that._isHolding) {
            return
        }
        var rootOffset = that._renderer.getRootOffset();
        var x = _floor(e.pageX - rootOffset.left);
        var y = _floor(e.pageY - rootOffset.top);
        var point = getData(e, POINT_DATA);
        var series = that._stuckSeries || getData(e, SERIES_DATA) || (null === (_point2 = point) || void 0 === _point2 ? void 0 : _point2.series);
        var axis = that._argumentAxis;
        if (that._legend.coordsIn(x, y)) {
            var item = that._legend.getItemByCoord(x, y);
            if (item) {
                that._legendClick(item, e)
            }
        } else if (null !== axis && void 0 !== axis && axis.coordsIn(x, y)) {
            var argument = getData(e, ARG_DATA, true);
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(argument)) {
                that._eventTrigger("argumentAxisClick", {
                    argument: argument,
                    event: e
                })
            }
        } else if (series) {
            var _point3;
            point = point || series.getPointByCoord(x, y);
            if (null !== (_point3 = point) && void 0 !== _point3 && _point3.getMarkerVisibility()) {
                that._pointClick(point, e)
            } else {
                getData(e, SERIES_DATA) && that._eventTrigger(SERIES_CLICK, {
                    target: series,
                    event: e
                })
            }
        }
    },
    dispose: function() {
        this._disableOutHandler();
        this._renderer.root.off(DOT_EVENT_NS);
        this._seriesGroup.off(DOT_EVENT_NS)
    }
};
var ChartTracker = function(options) {
    this.ctor(options)
};
Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(ChartTracker.prototype, baseTrackerPrototype, {
    _pointClick: function(point, event) {
        var eventTrigger = this._eventTrigger;
        var series = point.series;
        eventTrigger(POINT_CLICK, {
            target: point,
            event: event
        }, (function() {
            !eventCanceled(event, series) && eventTrigger(SERIES_CLICK, {
                target: series,
                event: event
            })
        }))
    },
    update: function(options) {
        baseTrackerPrototype.update.call(this, options);
        this._argumentAxis = options.argumentAxis || {};
        this._axisHoverEnabled = this._argumentAxis && Object(_core_utils__WEBPACK_IMPORTED_MODULE_6__["normalizeEnum"])(this._argumentAxis.getOptions().hoverMode) === ALL_ARGUMENT_POINTS_MODE;
        this._rotated = options.rotated;
        this._crosshair = options.crosshair;
        this._stickyHovering = options.stickyHovering
    },
    _getCanvas: function(x, y) {
        var canvases = this._canvases || [];
        for (var i = 0; i < canvases.length; i++) {
            var c = canvases[i];
            if (Object(_core_utils__WEBPACK_IMPORTED_MODULE_6__["pointInCanvas"])(c, x, y)) {
                return c
            }
        }
        return null
    },
    _isPointerOut: function(canvas) {
        return !canvas && this._stuckSeries
    },
    _hideCrosshair: function() {
        var _this$_crosshair;
        null === (_this$_crosshair = this._crosshair) || void 0 === _this$_crosshair ? void 0 : _this$_crosshair.hide()
    },
    _moveCrosshair: function(point, x, y) {
        if (this._crosshair && null !== point && void 0 !== point && point.isVisible()) {
            this._crosshair.show({
                point: point,
                x: x,
                y: y
            })
        }
    },
    _clean: function() {
        baseTrackerPrototype._clean.call(this);
        this._resetTimer();
        this._stuckSeries = null
    },
    _getSeriesForShared: function(x, y) {
        var _point4;
        var points = [];
        var point = null;
        var distance = 1 / 0;
        if (this._tooltip.isShared() && !this.hoveredSeries) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(this._storedSeries, (function(_, series) {
                var point = series.getNeighborPoint(x, y);
                point && points.push(point)
            }));
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_4__["each"])(points, (function(_, p) {
                var coords = p.getCrosshairData(x, y);
                var d = Object(_core_utils__WEBPACK_IMPORTED_MODULE_6__["getDistance"])(x, y, coords.x, coords.y);
                if (d < distance) {
                    point = p;
                    distance = d
                }
            }))
        }
        return null === (_point4 = point) || void 0 === _point4 ? void 0 : _point4.series
    },
    _setTimeout: function(callback, keeper) {
        var that = this;
        if (that._timeoutKeeper !== keeper) {
            that._resetTimer();
            that._hoverTimeout = setTimeout((function() {
                callback();
                that._timeoutKeeper = null
            }), DELAY);
            that._timeoutKeeper = keeper
        }
    },
    _resetTimer: function() {
        clearTimeout(this._hoverTimeout);
        this._timeoutKeeper = this._hoverTimeout = null
    },
    _stopEvent: function(e) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(e.cancelable) || e.cancelable) {
            e.preventDefault();
            e.stopPropagation()
        }
    },
    _setStuckSeries: function(e, series, x, y) {
        if ("mouse" !== e.pointerType) {
            this._stuckSeries = null
        } else {
            this._stuckSeries = series || this._stuckSeries || this._getSeriesForShared(x, y)
        }
        return !!this._stuckSeries
    },
    _pointerOut: function() {
        var that = this;
        that._stuckSeries = null;
        that._hideCrosshair();
        that._resetTimer();
        baseTrackerPrototype._pointerOut.apply(that, arguments)
    },
    _hoverArgumentAxis: function(x, y, e) {
        this._resetHoveredArgument();
        if (this._axisHoverEnabled && this._argumentAxis.coordsIn(x, y)) {
            this._hoverArgument(getData(e, ARG_DATA, true));
            return true
        }
    },
    _pointerComplete: function(point, x, y) {
        this.hoveredSeries && this.hoveredSeries.updateHover(x, y);
        this._resetTimer();
        this._moveCrosshair(point, x, y);
        baseTrackerPrototype._pointerComplete.call(this, point)
    },
    _legendClick: function(item, e) {
        var series = this._storedSeries[item.id];
        this._triggerLegendClick({
            target: series,
            event: e
        }, SERIES_CLICK)
    },
    _hoverLegendItem: function(x, y) {
        this._stuckSeries = null;
        this._hideCrosshair();
        baseTrackerPrototype._hoverLegendItem.call(this, x, y)
    },
    _pointerOnPoint: function(point, x, y, e) {
        this._setStuckSeries(e, point.series, x, y);
        this._releaseHoveredSeries();
        baseTrackerPrototype._pointerOnPoint.call(this, point, x, y, e)
    },
    _notifyLegendOnHoverArgument: false,
    _getArgumentHoverMode: function() {
        return correctHoverMode(this._argumentAxis)
    },
    dispose: function() {
        this._resetTimer();
        baseTrackerPrototype.dispose.call(this)
    }
});
var PieTracker = function(options) {
    this.ctor(options)
};
Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(PieTracker.prototype, baseTrackerPrototype, {
    _isPointerOut: function(_, point) {
        return !point
    },
    _legendClick: function(item, e) {
        var points = [];
        this._storedSeries.forEach(s => points.push.apply(points, s.getPointsByKeys(item.argument, item.argumentIndex)));
        this._eventTrigger(LEGEND_CLICK, {
            target: item.argument,
            points: points,
            event: e
        })
    },
    _pointClick: function(point, e) {
        this._eventTrigger(POINT_CLICK, {
            target: point,
            event: e
        })
    },
    _hoverLegendItem: function(x, y) {
        var item = this._legend.getItemByCoord(x, y);
        if (item && this._hoveredArgument !== item.argument) {
            this._resetHoveredArgument();
            this._hoverArgument(item.argument, item.argumentIndex)
        } else if (!item) {
            this.clearHover()
        }
    },
    _getArgumentHoverMode: function() {
        return correctHoverMode(this._legend)
    },
    _hoverArgumentAxis: _core_utils_common__WEBPACK_IMPORTED_MODULE_10__["noop"],
    _setStuckSeries: _core_utils_common__WEBPACK_IMPORTED_MODULE_10__["noop"],
    _getCanvas: _core_utils_common__WEBPACK_IMPORTED_MODULE_10__["noop"],
    _notifyLegendOnHoverArgument: true
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/components/chart_theme_manager.js":
/*!***************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/components/chart_theme_manager.js ***!
  \***************************************************************************/
/*! exports provided: ThemeManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeManager", function() { return ThemeManager; });
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_base_theme_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/base_theme_manager */ "./node_modules/devextreme/esm/viz/core/base_theme_manager.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/**
 * DevExtreme (esm/viz/components/chart_theme_manager.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var ThemeManager = _core_base_theme_manager__WEBPACK_IMPORTED_MODULE_3__["BaseThemeManager"].inherit(function() {
    var processAxisOptions = function(axisOptions) {
        if (!axisOptions) {
            return {}
        }
        axisOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, axisOptions);
        axisOptions.title = (options = axisOptions.title, Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isString"])(options) ? {
            text: options
        } : options);
        var options;
        if ("logarithmic" === axisOptions.type && axisOptions.logarithmBase <= 0 || axisOptions.logarithmBase && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(axisOptions.logarithmBase)) {
            axisOptions.logarithmBase = void 0;
            axisOptions.logarithmBaseError = true
        }
        if (axisOptions.label) {
            if (axisOptions.label.alignment) {
                axisOptions.label.userAlignment = true
            }
        }
        return axisOptions
    };
    var applyParticularAxisOptions = function(name, userOptions, rotated) {
        var theme = this._theme;
        var position = !(rotated ^ "valueAxis" === name) ? "horizontalAxis" : "verticalAxis";
        var processedUserOptions = processAxisOptions(userOptions);
        var commonAxisSettings = processAxisOptions(this._userOptions.commonAxisSettings);
        var mergeOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, theme.commonAxisSettings, theme[position], theme[name], commonAxisSettings, processedUserOptions);
        mergeOptions.workWeek = processedUserOptions.workWeek || theme[name].workWeek;
        mergeOptions.forceUserTickInterval |= Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(processedUserOptions.tickInterval) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(processedUserOptions.axisDivisionFactor);
        return mergeOptions
    };
    var mergeOptions = function(name, userOptions) {
        userOptions = userOptions || this._userOptions[name];
        var theme = this._theme[name];
        var result = this._mergedSettings[name];
        if (result) {
            return result
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(theme) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(userOptions)) {
            result = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, theme, userOptions)
        } else {
            result = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(userOptions) ? userOptions : theme
        }
        this._mergedSettings[name] = result;
        return result
    };
    var applyParticularTheme = {
        base: mergeOptions,
        argumentAxis: applyParticularAxisOptions,
        valueAxisRangeSelector: function() {
            return mergeOptions.call(this, "valueAxis")
        },
        valueAxis: applyParticularAxisOptions,
        series: function(name, userOptions, seriesCount) {
            var that = this;
            var theme = that._theme;
            var userCommonSettings = that._userOptions.commonSeriesSettings || {};
            var themeCommonSettings = theme.commonSeriesSettings;
            var widgetType = that._themeSection.split(".").slice(-1)[0];
            var type = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(userOptions.type || userCommonSettings.type || themeCommonSettings.type || "pie" === widgetType && theme.type);
            var palette = that.palette;
            var isBar = ~type.indexOf("bar");
            var isLine = ~type.indexOf("line");
            var isArea = ~type.indexOf("area");
            var isBubble = "bubble" === type;
            var mainSeriesColor;
            var resolveLabelsOverlapping = that.getOptions("resolveLabelsOverlapping");
            var containerBackgroundColor = that.getOptions("containerBackgroundColor");
            var seriesTemplate = applyParticularTheme.seriesTemplate.call(this);
            var seriesVisibility;
            if (isBar || isBubble) {
                userOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, userCommonSettings, userCommonSettings[type], userOptions);
                seriesVisibility = userOptions.visible;
                userCommonSettings = {
                    type: {}
                };
                Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, userOptions, userOptions.point);
                userOptions.visible = seriesVisibility
            }
            var settings = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {
                aggregation: {}
            }, themeCommonSettings, themeCommonSettings[type], userCommonSettings, userCommonSettings[type], userOptions);
            settings.aggregation.enabled = "chart" === widgetType && !!settings.aggregation.enabled;
            settings.type = type;
            settings.widgetType = widgetType;
            settings.containerBackgroundColor = containerBackgroundColor;
            if ("pie" !== widgetType) {
                mainSeriesColor = settings.color || palette.getNextColor(seriesCount)
            } else {
                mainSeriesColor = function(argument, index, count) {
                    var cat = "".concat(argument, "-").concat(index);
                    if (!that._multiPieColors[cat]) {
                        that._multiPieColors[cat] = palette.getNextColor(count)
                    }
                    return that._multiPieColors[cat]
                }
            }
            settings.mainSeriesColor = mainSeriesColor;
            settings.resolveLabelsOverlapping = resolveLabelsOverlapping;
            if (settings.label && (isLine || isArea && "rangearea" !== type || "scatter" === type)) {
                settings.label.position = "outside"
            }
            if (seriesTemplate) {
                settings.nameField = seriesTemplate.nameField
            }
            return settings
        },
        animation: function(name) {
            var userOptions = this._userOptions[name];
            userOptions = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(userOptions) ? userOptions : Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(userOptions) ? {
                enabled: !!userOptions
            } : {};
            return mergeOptions.call(this, name, userOptions)
        },
        seriesTemplate() {
            var value = mergeOptions.call(this, "seriesTemplate");
            if (value) {
                value.nameField = value.nameField || "series"
            }
            return value
        },
        zoomAndPan() {
            function parseOption(option) {
                option = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(option);
                var pan = "pan" === option || "both" === option;
                var zoom = "zoom" === option || "both" === option;
                return {
                    pan: pan,
                    zoom: zoom,
                    none: !pan && !zoom
                }
            }
            var options = mergeOptions.call(this, "zoomAndPan");
            return {
                valueAxis: parseOption(options.valueAxis),
                argumentAxis: parseOption(options.argumentAxis),
                dragToZoom: !!options.dragToZoom,
                dragBoxStyle: {
                    class: "dxc-shutter",
                    fill: options.dragBoxStyle.color,
                    opacity: options.dragBoxStyle.opacity
                },
                panKey: options.panKey,
                allowMouseWheel: !!options.allowMouseWheel,
                allowTouchGestures: !!options.allowTouchGestures
            }
        }
    };
    return {
        _themeSection: "chart",
        ctor: function(params) {
            var that = this;
            that.callBase.apply(that, arguments);
            var options = params.options || {};
            that._userOptions = options;
            that._mergeAxisTitleOptions = [];
            that._multiPieColors = {};
            that._callback = _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"]
        },
        dispose: function() {
            var that = this;
            that.palette && that.palette.dispose();
            that.palette = that._userOptions = that._mergedSettings = that._multiPieColors = null;
            return that.callBase.apply(that, arguments)
        },
        resetPalette: function() {
            this.palette.reset();
            this._multiPieColors = {}
        },
        getOptions: function(name) {
            return (applyParticularTheme[name] || applyParticularTheme.base).apply(this, arguments)
        },
        refresh: function() {
            this._mergedSettings = {};
            return this.callBase.apply(this, arguments)
        },
        _initializeTheme: function() {
            var that = this;
            that.callBase.apply(that, arguments);
            that.updatePalette()
        },
        resetOptions: function(name) {
            this._mergedSettings[name] = null
        },
        update: function(options) {
            this._userOptions = options
        },
        updatePalette: function() {
            this.palette = this.createPalette(this.getOptions("palette"), {
                useHighlight: true,
                extensionMode: this.getOptions("paletteExtensionMode")
            })
        }
    }
}());


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/components/consts.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/components/consts.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/viz/components/consts.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
/* harmony default export */ __webpack_exports__["default"] = ({
    events: {
        mouseover: "mouseover",
        mouseout: "mouseout",
        mousemove: "mousemove",
        touchstart: "touchstart",
        touchmove: "touchmove",
        touchend: "touchend",
        mousedown: "mousedown",
        mouseup: "mouseup",
        click: "click",
        selectSeries: "selectseries",
        deselectSeries: "deselectseries",
        selectPoint: "selectpoint",
        deselectPoint: "deselectpoint",
        showPointTooltip: "showpointtooltip",
        hidePointTooltip: "hidepointtooltip"
    },
    states: {
        hover: "hover",
        normal: "normal",
        selection: "selection",
        normalMark: 0,
        hoverMark: 1,
        selectedMark: 2,
        applyHover: "applyHover",
        applySelected: "applySelected",
        resetItem: "resetItem"
    },
    radialLabelIndent: 30,
    pieLabelSpacing: 10,
    pieSeriesSpacing: 4
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/components/data_validator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/components/data_validator.js ***!
  \**********************************************************************/
/*! exports provided: validateData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateData", function() { return validateData; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _parse_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parse_utils */ "./node_modules/devextreme/esm/viz/components/parse_utils.js");
/**
 * DevExtreme (esm/viz/components/data_validator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var STRING = "string";
var NUMERIC = "numeric";
var DATETIME = "datetime";
var DISCRETE = "discrete";
var SEMIDISCRETE = "semidiscrete";
var CONTINUOUS = "continuous";
var LOGARITHMIC = "logarithmic";
var VALUE_TYPE = "valueType";
var ARGUMENT_TYPE = "argumentType";


var axisTypeParser = Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["enumParser"])([STRING, NUMERIC, DATETIME]);

var _isArray = Array.isArray;

function groupingValues(data, others, valueField, index) {
    if (index >= 0) {
        data.slice(index).forEach((function(cell) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(cell[valueField])) {
                others[valueField] += cell[valueField];
                cell[valueField] = void 0
            }
        }))
    }
}

function processGroups(groups) {
    groups.forEach((function(group) {
        group.valueType = group.valueAxisType = null;
        group.series.forEach((function(series) {
            series.updateDataType({})
        }));
        group.valueAxis && group.valueAxis.resetTypes(VALUE_TYPE)
    }))
}

function sortValues(data, asc, selector) {
    var func = asc ? function(a, b) {
        return a - b
    } : function(a, b) {
        return b - a
    };
    data.sort((function(a, b) {
        var valA = selector(a);
        var valB = selector(b);
        var aa = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(valA) ? 1 : 0;
        var bb = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(valB) ? 1 : 0;
        return aa && bb ? func(valA, valB) : func(aa, bb)
    }));
    return data
}

function resetArgumentAxes(axes) {
    axes && axes.forEach((function(axis) {
        axis.resetTypes(ARGUMENT_TYPE)
    }))
}

function parseCategories(categories, parser) {
    var newArray = [];
    categories.forEach((function(category) {
        var parsedCategory = parser(category);
        void 0 !== parsedCategory && newArray.push(parsedCategory)
    }));
    return newArray
}

function parseAxisCategories(groupsData, parsers) {
    var argumentCategories = groupsData.argumentOptions && groupsData.argumentOptions.categories;
    groupsData.groups.forEach((function(valueGroup, i) {
        var categories = valueGroup.valueOptions && valueGroup.valueOptions.categories;
        if (categories) {
            valueGroup.valueOptions.categories = parseCategories(categories, parsers[i + 1])
        }
    }));
    if (argumentCategories) {
        groupsData.argumentOptions.categories = parseCategories(argumentCategories, parsers[0])
    }
}

function eigen(x) {
    return x
}

function getType(unit, type) {
    var result = type;
    if (type === STRING || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(unit)) {
        result = STRING
    } else if (type === DATETIME || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDate"])(unit)) {
        result = DATETIME
    } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumeric"])(unit)) {
        result = NUMERIC
    }
    return result
}

function correctAxisType(type, axisType, hasCategories, incidentOccurred) {
    if (type === STRING && (axisType === CONTINUOUS || axisType === LOGARITHMIC || axisType === SEMIDISCRETE)) {
        incidentOccurred("E2002")
    }
    return axisType === LOGARITHMIC ? LOGARITHMIC : hasCategories || axisType === DISCRETE || type === STRING ? DISCRETE : axisType === SEMIDISCRETE ? SEMIDISCRETE : CONTINUOUS
}

function validUnit(unit, field, incidentOccurred) {
    if (unit) {
        incidentOccurred(!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isNumeric"])(unit) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDate"])(unit) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(unit) ? "E2003" : "E2004", [field])
    }
}

function createParserUnit(type, axisType, incidentOccurred) {
    var parser = type ? Object(_parse_utils__WEBPACK_IMPORTED_MODULE_3__["getParser"])(type) : eigen;
    var filterInfinity = axisType !== DISCRETE ? function(x) {
        return isFinite(x) || void 0 === x ? x : null
    } : eigen;
    return function(unit, field) {
        var parseUnit = filterInfinity(parser(unit));
        if (void 0 === parseUnit) {
            validUnit(unit, field, incidentOccurred)
        }
        return parseUnit
    }
}

function prepareParsers(groupsData, incidentOccurred) {
    var argumentParser = createParserUnit(groupsData.argumentType, groupsData.argumentAxisType, incidentOccurred);
    var sizeParser;
    var valueParser;
    var categoryParsers = [argumentParser];
    var cache = {};
    var list = [];
    groupsData.groups.forEach((function(group, groupIndex) {
        group.series.forEach((function(series) {
            valueParser = createParserUnit(group.valueType, group.valueAxisType, incidentOccurred);
            sizeParser = createParserUnit(NUMERIC, CONTINUOUS, incidentOccurred);
            cache[series.getArgumentField()] = argumentParser;
            series.getValueFields().forEach((function(field) {
                categoryParsers[groupIndex + 1] = valueParser;
                cache[field] = valueParser
            }));
            if (series.getSizeField()) {
                cache[series.getSizeField()] = sizeParser
            }
        }))
    }));
    for (var field in cache) {
        list.push([field, cache[field]])
    }
    list.length && parseAxisCategories(groupsData, categoryParsers);
    return list
}

function getParsedCell(cell, parsers) {
    var i;
    var ii = parsers.length;
    var obj = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, cell);
    var field;
    var value;
    for (i = 0; i < ii; ++i) {
        field = parsers[i][0];
        value = cell[field];
        obj[field] = parsers[i][1](value, field)
    }
    return obj
}

function parse(data, parsers) {
    var parsedData = [];
    var i;
    var ii = data.length;
    parsedData.length = ii;
    for (i = 0; i < ii; ++i) {
        parsedData[i] = getParsedCell(data[i], parsers)
    }
    return parsedData
}

function findIndexByThreshold(data, valueField, threshold) {
    var i;
    var ii = data.length;
    var value;
    for (i = 0; i < ii; ++i) {
        value = data[i][valueField];
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(value) && threshold > value) {
            break
        }
    }
    return i
}

function groupMinSlices(originalData, argumentField, valueField, smallValuesGrouping) {
    smallValuesGrouping = smallValuesGrouping || {};
    var mode = smallValuesGrouping.mode;
    var others = {};
    if (!mode || "none" === mode) {
        return
    }
    others[argumentField] = String(smallValuesGrouping.groupName || "others");
    others[valueField] = 0;
    var data = sortValues(originalData.slice(), false, (function(a) {
        return a[valueField]
    }));
    groupingValues(data, others, valueField, "smallValueThreshold" === mode ? findIndexByThreshold(data, valueField, smallValuesGrouping.threshold) : smallValuesGrouping.topCount);
    others[valueField] && originalData.push(others)
}

function groupPieData(data, groupsData) {
    var firstSeries = groupsData.groups[0] && groupsData.groups[0].series[0];
    var isPie = firstSeries && ("pie" === firstSeries.type || "doughnut" === firstSeries.type || "donut" === firstSeries.type);
    if (!isPie) {
        return
    }
    groupsData.groups.forEach((function(group) {
        group.series.forEach((function(series) {
            groupMinSlices(data, series.getArgumentField(), series.getValueFields()[0], series.getOptions().smallValuesGrouping)
        }))
    }))
}

function addUniqueItemToCollection(item, collection, itemsHash) {
    if (!itemsHash[item]) {
        collection.push(item);
        itemsHash[item] = true
    }
}

function getUniqueArgumentFields(groupsData) {
    var uniqueArgumentFields = [];
    var hash = {};
    groupsData.groups.forEach((function(group) {
        group.series.forEach((function(series) {
            addUniqueItemToCollection(series.getArgumentField(), uniqueArgumentFields, hash)
        }))
    }));
    return uniqueArgumentFields
}

function sort(a, b) {
    var result = a - b;
    if (isNaN(result)) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(a)) {
            return 1
        }
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(b)) {
            return -1
        }
        return 0
    }
    return result
}

function sortByArgument(data, argumentField) {
    return data.slice().sort((function(a, b) {
        return sort(a[argumentField], b[argumentField])
    }))
}

function sortByCallback(data, callback) {
    return data.slice().sort(callback)
}

function checkValueTypeOfGroup(group, cell) {
    group.series.forEach((function(series) {
        series.getValueFields().forEach((function(field) {
            group.valueType = getType(cell[field], group.valueType)
        }))
    }));
    return group.valueType
}

function getSortByCategories(categories) {
    var hash = {};
    categories.forEach((function(value, i) {
        hash[value] = i
    }));
    return function(data, argumentField) {
        return sortValues(data.slice(), true, (function(a) {
            return hash[a[argumentField]]
        }))
    }
}

function sortData(data, groupsData, options, uniqueArgumentFields) {
    var dataByArguments = {};
    var isDiscrete = groupsData.argumentAxisType === DISCRETE;
    var userCategories = isDiscrete && groupsData.argumentOptions && groupsData.argumentOptions.categories;
    var sortFunction = function(data) {
        return data
    };
    var sortingMethodOption = options.sortingMethod;
    var reSortCategories;
    if (!userCategories && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(sortingMethodOption)) {
        data = sortByCallback(data, sortingMethodOption)
    }
    if (isDiscrete) {
        groupsData.categories = getCategories(data, uniqueArgumentFields, userCategories)
    }
    if (userCategories || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(sortingMethodOption) && groupsData.argumentType === STRING && !options._skipArgumentSorting) {
        sortFunction = getSortByCategories(groupsData.categories)
    } else if (true === sortingMethodOption && groupsData.argumentType !== STRING) {
        sortFunction = sortByArgument;
        reSortCategories = isDiscrete
    }
    uniqueArgumentFields.forEach((function(field) {
        dataByArguments[field] = sortFunction(data, field)
    }));
    if (reSortCategories) {
        groupsData.categories = groupsData.categories.sort(sort)
    }
    return dataByArguments
}

function checkItemExistence(collection, item) {
    return -1 === collection.map((function(collectionItem) {
        return collectionItem.valueOf()
    })).indexOf(item.valueOf())
}

function getCategories(data, uniqueArgumentFields, userCategories) {
    var categories = userCategories ? userCategories.slice() : [];
    uniqueArgumentFields.forEach((function(field) {
        data.forEach((function(item) {
            var dataItem = item[field];
            Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(dataItem) && checkItemExistence(categories, dataItem) && categories.push(dataItem)
        }))
    }));
    return categories
}

function checkArgumentTypeOfGroup(series, cell, groupsData) {
    series.forEach((function(currentSeries) {
        groupsData.argumentType = getType(cell[currentSeries.getArgumentField()], groupsData.argumentType)
    }));
    return groupsData.argumentType
}

function checkType(data, groupsData, checkTypeForAllData) {
    var groupsWithUndefinedValueType = [];
    var groupsWithUndefinedArgumentType = [];
    var argumentTypeGroup = groupsData.argumentOptions && axisTypeParser(groupsData.argumentOptions.argumentType);
    var groupsIndexes;
    groupsData.groups.forEach((function(group) {
        if (!group.series.length) {
            return
        }
        var valueTypeGroup = group.valueOptions && axisTypeParser(group.valueOptions.valueType);
        group.valueType = valueTypeGroup;
        groupsData.argumentType = argumentTypeGroup;
        !valueTypeGroup && groupsWithUndefinedValueType.push(group);
        !argumentTypeGroup && groupsWithUndefinedArgumentType.push(group)
    }));
    if (groupsWithUndefinedValueType.length || groupsWithUndefinedArgumentType.length) {
        groupsIndexes = groupsWithUndefinedValueType.map((function(_, index) {
            return index
        }));
        data.some((function(cell) {
            var defineArg;
            groupsWithUndefinedValueType.forEach((function(group, groupIndex) {
                if (checkValueTypeOfGroup(group, cell) && groupsIndexes.indexOf(groupIndex) >= 0) {
                    groupsIndexes.splice(groupIndex, 1)
                }
            }));
            if (!defineArg) {
                groupsWithUndefinedArgumentType.forEach((function(group) {
                    defineArg = checkArgumentTypeOfGroup(group.series, cell, groupsData)
                }))
            }
            if (!checkTypeForAllData && defineArg && 0 === groupsIndexes.length) {
                return true
            }
        }))
    }
}

function checkAxisType(groupsData, incidentOccurred) {
    var argumentOptions = groupsData.argumentOptions || {};
    var userArgumentCategories = argumentOptions && argumentOptions.categories || [];
    var argumentAxisType = correctAxisType(groupsData.argumentType, argumentOptions.type, !!userArgumentCategories.length, incidentOccurred);
    groupsData.groups.forEach((function(group) {
        var valueOptions = group.valueOptions || {};
        var valueCategories = valueOptions.categories || [];
        var valueAxisType = correctAxisType(group.valueType, valueOptions.type, !!valueCategories.length, incidentOccurred);
        group.series.forEach((function(series) {
            var optionsSeries = {};
            optionsSeries.argumentAxisType = argumentAxisType;
            optionsSeries.valueAxisType = valueAxisType;
            groupsData.argumentAxisType = groupsData.argumentAxisType || optionsSeries.argumentAxisType;
            group.valueAxisType = group.valueAxisType || optionsSeries.valueAxisType;
            optionsSeries.argumentType = groupsData.argumentType;
            optionsSeries.valueType = group.valueType;
            optionsSeries.showZero = valueOptions.showZero;
            series.updateDataType(optionsSeries)
        }));
        group.valueAxisType = group.valueAxisType || valueAxisType;
        if (group.valueAxis) {
            group.valueAxis.setTypes(group.valueAxisType, group.valueType, VALUE_TYPE);
            group.valueAxis.validate()
        }
    }));
    groupsData.argumentAxisType = groupsData.argumentAxisType || argumentAxisType;
    if (groupsData.argumentAxes) {
        groupsData.argumentAxes.forEach((function(axis) {
            axis.setTypes(groupsData.argumentAxisType, groupsData.argumentType, ARGUMENT_TYPE);
            axis.validate()
        }))
    }
}

function verifyData(source, incidentOccurred) {
    var data = [];
    var sourceIsDefined = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(source);
    var hasError = sourceIsDefined && !_isArray(source);
    var i;
    var ii;
    var k;
    var item;
    if (sourceIsDefined && !hasError) {
        for (i = 0, ii = source.length, k = 0; i < ii; ++i) {
            item = source[i];
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isObject"])(item)) {
                data[k++] = item
            } else if (item) {
                hasError = true
            }
        }
    }
    if (hasError) {
        incidentOccurred("E2001")
    }
    return data
}
function validateData(data, groupsData, incidentOccurred, options) {
    data = verifyData(data, incidentOccurred);
    groupsData.argumentType = groupsData.argumentAxisType = null;
    processGroups(groupsData.groups);
    resetArgumentAxes(groupsData.argumentAxes);
    checkType(data, groupsData, options.checkTypeForAllData);
    checkAxisType(groupsData, incidentOccurred);
    if (options.convertToAxisDataType) {
        data = parse(data, prepareParsers(groupsData, incidentOccurred))
    }
    groupPieData(data, groupsData);
    var dataByArgumentFields = sortData(data, groupsData, options, getUniqueArgumentFields(groupsData));
    return dataByArgumentFields
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/components/legend.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/components/legend.js ***!
  \**************************************************************/
/*! exports provided: Legend, plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Legend", function() { return Legend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_layout_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/layout_element */ "./node_modules/devextreme/esm/viz/core/layout_element.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_title__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/title */ "./node_modules/devextreme/esm/viz/core/title.js");
/* harmony import */ var _core_utils_object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/object */ "./node_modules/devextreme/esm/core/utils/object.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_renderers_renderer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/renderers/renderer */ "./node_modules/devextreme/esm/viz/core/renderers/renderer.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/**
 * DevExtreme (esm/viz/components/legend.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */









var _Number = Number;
var _math = Math;
var _round = _math.round;
var _max = _math.max;
var _min = _math.min;
var _ceil = _math.ceil;
var _isDefined = _core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"];
var _isFunction = _core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isFunction"];
var _enumParser = _core_utils__WEBPACK_IMPORTED_MODULE_0__["enumParser"];
var _normalizeEnum = _core_utils__WEBPACK_IMPORTED_MODULE_0__["normalizeEnum"];
var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"];
var DEFAULT_MARGIN = 10;
var DEFAULT_MARKER_HATCHING_WIDTH = 2;
var DEFAULT_MARKER_HATCHING_STEP = 5;
var CENTER = "center";
var RIGHT = "right";
var LEFT = "left";
var TOP = "top";
var BOTTOM = "bottom";
var HORIZONTAL = "horizontal";
var VERTICAL = "vertical";
var INSIDE = "inside";
var OUTSIDE = "outside";
var NONE = "none";
var HEIGHT = "height";
var WIDTH = "width";
var parseHorizontalAlignment = _enumParser([LEFT, CENTER, RIGHT]);
var parseVerticalAlignment = _enumParser([TOP, BOTTOM]);
var parseOrientation = _enumParser([VERTICAL, HORIZONTAL]);
var parseItemTextPosition = _enumParser([LEFT, RIGHT, TOP, BOTTOM]);
var parsePosition = _enumParser([OUTSIDE, INSIDE]);
var parseItemsAlignment = _enumParser([LEFT, CENTER, RIGHT]);

function getState(state, color, stateName) {
    if (!state) {
        return
    }
    var colorFromAction = state.fill;
    return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, {
        state: stateName,
        fill: colorFromAction === NONE ? color : colorFromAction,
        opacity: state.opacity,
        hatching: _extend({}, state.hatching, {
            step: DEFAULT_MARKER_HATCHING_STEP,
            width: DEFAULT_MARKER_HATCHING_WIDTH
        })
    })
}

function getAttributes(item, state, size) {
    var attrs = Object(_core_renderers_renderer__WEBPACK_IMPORTED_MODULE_7__["processHatchingAttrs"])(item, state);
    if (attrs.fill && 0 === attrs.fill.indexOf("DevExpress")) {
        attrs.fill = Object(_core_renderers_renderer__WEBPACK_IMPORTED_MODULE_7__["getFuncIri"])(attrs.fill)
    }
    attrs.opacity = attrs.opacity >= 0 ? attrs.opacity : 1;
    return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, attrs, {
        size: size
    })
}

function parseMargins(options) {
    var margin = options.margin;
    if (margin >= 0) {
        margin = _Number(options.margin);
        margin = {
            top: margin,
            bottom: margin,
            left: margin,
            right: margin
        }
    } else {
        margin = {
            top: margin.top >= 0 ? _Number(margin.top) : DEFAULT_MARGIN,
            bottom: margin.bottom >= 0 ? _Number(margin.bottom) : DEFAULT_MARGIN,
            left: margin.left >= 0 ? _Number(margin.left) : DEFAULT_MARGIN,
            right: margin.right >= 0 ? _Number(margin.right) : DEFAULT_MARGIN
        }
    }
    options.margin = margin
}

function getSizeItem(options, markerBBox, labelBBox) {
    var width;
    var height;
    switch (options.itemTextPosition) {
        case LEFT:
        case RIGHT:
            width = markerBBox.width + 7 + labelBBox.width;
            height = _max(markerBBox.height, labelBBox.height);
            break;
        case TOP:
        case BOTTOM:
            width = _max(markerBBox.width, labelBBox.width);
            height = markerBBox.height + 4 + labelBBox.height
    }
    return {
        width: width,
        height: height
    }
}

function calculateBBoxLabelAndMarker(markerBBox, labelBBox) {
    var bBox = {};
    bBox.left = _min(markerBBox.x, labelBBox.x);
    bBox.top = _min(markerBBox.y, labelBBox.y);
    bBox.right = _max(markerBBox.x + markerBBox.width, labelBBox.x + labelBBox.width);
    bBox.bottom = _max(markerBBox.y + markerBBox.height, labelBBox.y + labelBBox.height);
    return bBox
}

function applyMarkerState(id, idToIndexMap, items, stateName) {
    var item = idToIndexMap && items[idToIndexMap[id]];
    if (item) {
        item.renderMarker(item.states[stateName])
    }
}

function parseOptions(options, textField, allowInsidePosition) {
    if (!options) {
        return null
    }
    parseMargins(options);
    options.horizontalAlignment = parseHorizontalAlignment(options.horizontalAlignment, RIGHT);
    options.verticalAlignment = parseVerticalAlignment(options.verticalAlignment, options.horizontalAlignment === CENTER ? BOTTOM : TOP);
    options.orientation = parseOrientation(options.orientation, options.horizontalAlignment === CENTER ? HORIZONTAL : VERTICAL);
    options.itemTextPosition = parseItemTextPosition(options.itemTextPosition, options.orientation === HORIZONTAL ? BOTTOM : RIGHT);
    options.position = allowInsidePosition ? parsePosition(options.position, OUTSIDE) : OUTSIDE;
    options.itemsAlignment = parseItemsAlignment(options.itemsAlignment, null);
    options.hoverMode = _normalizeEnum(options.hoverMode);
    options.customizeText = _isFunction(options.customizeText) ? options.customizeText : function() {
        return this[textField]
    };
    options.customizeHint = _isFunction(options.customizeHint) ? options.customizeHint : _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"];
    options._incidentOccurred = options._incidentOccurred || _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"];
    return options
}

function createSquareMarker(renderer, size) {
    return renderer.rect(0, 0, size, size)
}

function createCircleMarker(renderer, size) {
    return renderer.circle(size / 2, size / 2, size / 2)
}

function isCircle(type) {
    return "circle" === _normalizeEnum(type)
}

function inRect(rect, x, y) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

function checkLinesSize(lines, layoutOptions, countItems, margins) {
    var position = {
        x: 0,
        y: 0
    };
    var maxMeasureLength = 0;
    var maxAltMeasureLength = 0;
    var margin = 0;
    if ("y" === layoutOptions.direction) {
        margin = margins.top + margins.bottom
    } else {
        margin = margins.left + margins.right
    }
    lines.forEach((function(line, i) {
        var firstItem = line[0];
        var lineLength = line.length;
        line.forEach((function(item, index) {
            var offset = item.offset || layoutOptions.spacing;
            position[layoutOptions.direction] += item[layoutOptions.measure] + (index !== lineLength - 1 ? offset : 0);
            maxMeasureLength = _max(maxMeasureLength, position[layoutOptions.direction])
        }));
        position[layoutOptions.direction] = 0;
        position[layoutOptions.altDirection] += firstItem[layoutOptions.altMeasure] + firstItem.altOffset || layoutOptions.altSpacing;
        maxAltMeasureLength = _max(maxAltMeasureLength, position[layoutOptions.altDirection])
    }));
    if (maxMeasureLength + margin > layoutOptions.length) {
        layoutOptions.countItem = decreaseItemCount(layoutOptions, countItems);
        return true
    }
}

function decreaseItemCount(layoutOptions, countItems) {
    layoutOptions.altCountItem++;
    return _ceil(countItems / layoutOptions.altCountItem)
}

function getLineLength(line, layoutOptions) {
    return line.reduce((lineLength, item) => {
        var offset = item.offset || layoutOptions.spacing;
        return lineLength + item[layoutOptions.measure] + offset
    }, 0)
}

function getMaxLineLength(lines, layoutOptions) {
    return lines.reduce((maxLineLength, line) => _max(maxLineLength, getLineLength(line, layoutOptions)), 0)
}

function getInitPositionForDirection(line, layoutOptions, maxLineLength) {
    var lineLength = getLineLength(line, layoutOptions);
    var initPosition;
    switch (layoutOptions.itemsAlignment) {
        case RIGHT:
            initPosition = maxLineLength - lineLength;
            break;
        case CENTER:
            initPosition = (maxLineLength - lineLength) / 2;
            break;
        default:
            initPosition = 0
    }
    return initPosition
}

function getPos(layoutOptions) {
    switch (layoutOptions.itemTextPosition) {
        case BOTTOM:
            return {
                horizontal: CENTER, vertical: TOP
            };
        case TOP:
            return {
                horizontal: CENTER, vertical: BOTTOM
            };
        case LEFT:
            return {
                horizontal: RIGHT, vertical: CENTER
            };
        case RIGHT:
            return {
                horizontal: LEFT, vertical: CENTER
            }
    }
}

function getLines(lines, layoutOptions, itemIndex) {
    var tableLine = {};
    if (itemIndex % layoutOptions.countItem === 0) {
        if (layoutOptions.markerOffset) {
            lines.push([], [])
        } else {
            lines.push([])
        }
    }
    if (layoutOptions.markerOffset) {
        tableLine.firstLine = lines[lines.length - 1];
        tableLine.secondLine = lines[lines.length - 2]
    } else {
        tableLine.firstLine = tableLine.secondLine = lines[lines.length - 1]
    }
    return tableLine
}

function setMaxInLine(line, measure) {
    var maxLineSize = line.reduce((maxLineSize, item) => {
        var itemMeasure = item ? item[measure] : maxLineSize;
        return _max(maxLineSize, itemMeasure)
    }, 0);
    line.forEach(item => {
        if (item) {
            item[measure] = maxLineSize
        }
    })
}

function transpose(array) {
    var width = array.length;
    var height = array[0].length;
    var i;
    var j;
    var transposeArray = [];
    for (i = 0; i < height; i++) {
        transposeArray[i] = [];
        for (j = 0; j < width; j++) {
            transposeArray[i][j] = array[j][i]
        }
    }
    return transposeArray
}

function getAlign(position) {
    switch (position) {
        case TOP:
        case BOTTOM:
            return CENTER;
        case LEFT:
            return RIGHT;
        case RIGHT:
            return LEFT
    }
}
var getMarkerCreator = function(type) {
    return isCircle(type) ? createCircleMarker : createSquareMarker
};

function getTitleHorizontalAlignment(options) {
    if (options.horizontalAlignment === CENTER) {
        return CENTER
    } else if (options.itemTextPosition === RIGHT) {
        return LEFT
    } else if (options.itemTextPosition === LEFT) {
        return RIGHT
    } else {
        return CENTER
    }
}
var Legend = function(settings) {
    this._renderer = settings.renderer;
    this._legendGroup = settings.group;
    this._backgroundClass = settings.backgroundClass;
    this._itemGroupClass = settings.itemGroupClass;
    this._textField = settings.textField;
    this._getCustomizeObject = settings.getFormatObject;
    this._titleGroupClass = settings.titleGroupClass;
    this._allowInsidePosition = settings.allowInsidePosition;
    this._widget = settings.widget;
    this._updated = false
};
var _Legend = Legend;
var legendPrototype = _Legend.prototype = Object(_core_utils_object__WEBPACK_IMPORTED_MODULE_5__["clone"])(_core_layout_element__WEBPACK_IMPORTED_MODULE_2__["LayoutElement"].prototype);
Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(legendPrototype, {
    constructor: _Legend,
    getOptions: function() {
        return this._options
    },
    update: function() {
        var data = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        var options = arguments.length > 1 ? arguments[1] : void 0;
        var themeManagerTitleOptions = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        var that = this;
        options = that._options = parseOptions(options, that._textField, that._allowInsidePosition) || {};
        var initMarkerSize = options.markerSize;
        this._updated = true;
        this._data = data.map(dataItem => {
            dataItem.size = _Number(dataItem.size > 0 ? dataItem.size : initMarkerSize);
            dataItem.marker = getAttributes(dataItem, dataItem.states.normal);
            Object.defineProperty(dataItem.marker, "size", {
                get: () => dataItem.size,
                set(value) {
                    dataItem.size = value
                }
            });
            Object.defineProperty(dataItem.marker, "opacity", {
                get: () => dataItem.states.normal.opacity,
                set(value) {
                    dataItem.states.normal.opacity = dataItem.states.hover.opacity = dataItem.states.selection.opacity = value
                }
            });
            return dataItem
        });
        if (options.customizeItems) {
            that._data = options.customizeItems(data.slice()) || data
        }
        that._boundingRect = {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
        if (that.isVisible() && !that._title) {
            that._title = new _core_title__WEBPACK_IMPORTED_MODULE_4__["Title"]({
                renderer: that._renderer,
                cssClass: that._titleGroupClass,
                root: that._legendGroup
            })
        }
        if (that._title) {
            var titleOptions = options.title;
            themeManagerTitleOptions.horizontalAlignment = getTitleHorizontalAlignment(options);
            that._title.update(themeManagerTitleOptions, titleOptions)
        }
        this.erase();
        return that
    },
    isVisible: function() {
        return this._options && this._options.visible
    },
    draw: function(width, height) {
        var items = this._getItemData();
        this.erase();
        if (!(this.isVisible() && items && items.length)) {
            return this
        }
        this._insideLegendGroup = this._renderer.g().enableLinks().append(this._legendGroup);
        this._title.changeLink(this._insideLegendGroup);
        this._createBackground();
        if (this._title.hasText()) {
            var horizontalPadding = this._background ? 2 * this._options.paddingLeftRight : 0;
            this._title.draw(width - horizontalPadding, height)
        }
        this._markersGroup = this._renderer.g().attr({
            class: this._itemGroupClass
        }).append(this._insideLegendGroup);
        this._createItems(items);
        this._updateElementsPosition(width, height);
        return this
    },
    _measureElements: function() {
        var options = this._options;
        var maxBBoxHeight = 0;
        this._items.forEach(item => {
            var labelBBox = item.label.getBBox();
            var markerBBox = item.marker.getBBox();
            item.markerBBox = markerBBox;
            item.markerSize = Math.max(markerBBox.width, markerBBox.height);
            var bBox = getSizeItem(options, markerBBox, labelBBox);
            item.labelBBox = labelBBox;
            item.bBox = bBox;
            maxBBoxHeight = _max(maxBBoxHeight, bBox.height)
        });
        if (options.equalRowHeight) {
            this._items.forEach(item => item.bBox.height = maxBBoxHeight)
        }
    },
    _updateElementsPosition: function(width, height) {
        var options = this._options;
        this._size = {
            width: width,
            height: height
        };
        this._measureElements();
        this._locateElements(options);
        this._finalUpdate(options);
        var size = this.getLayoutOptions();
        if (size.width > width || size.height > height) {
            this.freeSpace()
        }
    },
    _createItems: function(items) {
        var that = this;
        var options = that._options;
        var renderer = that._renderer;
        var createMarker = getMarkerCreator(options.markerShape);
        that._markersId = {};
        var templateFunction = !options.markerTemplate ? (dataItem, group) => {
            var attrs = dataItem.marker;
            createMarker(renderer, attrs.size).attr({
                fill: attrs.fill,
                opacity: attrs.opacity
            }).append({
                element: group
            })
        } : options.markerTemplate;
        var template = that._widget._getTemplate(templateFunction);
        var markersGroup = that._markersGroup;
        markersGroup.css(Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["patchFontOptions"])(options.font));
        that._deferredItems = [];
        that._templatesGroups = [];
        that._items = (items || []).map((dataItem, i) => {
            var stateOfDataItem = dataItem.states;
            var normalState = stateOfDataItem.normal;
            var normalStateFill = normalState.fill;
            dataItem.size = dataItem.marker.size;
            var states = {
                normal: Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(normalState, {
                    fill: normalStateFill || options.markerColor || options.defaultColor,
                    state: "normal"
                }),
                hover: getState(stateOfDataItem.hover, normalStateFill, "hovered"),
                selection: getState(stateOfDataItem.selection, normalStateFill, "selected")
            };
            dataItem.states = states;
            var itemGroup = renderer.g().append(markersGroup);
            var markerGroup = renderer.g().attr({
                class: "dxl-marker"
            }).append(itemGroup);
            that._deferredItems[i] = new _core_utils_deferred__WEBPACK_IMPORTED_MODULE_8__["Deferred"];
            that._templatesGroups.push(markerGroup);
            var item = {
                label: that._createLabel(dataItem, itemGroup),
                marker: markerGroup,
                renderer: renderer,
                group: itemGroup,
                tracker: {
                    id: dataItem.id,
                    argument: dataItem.argument,
                    argumentIndex: dataItem.argumentIndex
                },
                states: states,
                itemTextPosition: options.itemTextPosition,
                markerOffset: 0,
                bBoxes: [],
                renderMarker(state) {
                    dataItem.marker = getAttributes(item, state, dataItem.size);
                    markerGroup.clear();
                    template.render({
                        model: dataItem,
                        container: markerGroup.element,
                        onRendered: that._deferredItems[i].resolve
                    })
                }
            };
            item.renderMarker(states.normal);
            that._createHint(dataItem, itemGroup);
            if (void 0 !== dataItem.id) {
                that._markersId[dataItem.id] = i
            }
            return item
        })
    },
    getTemplatesGroups: function() {
        return this._templatesGroups || []
    },
    getTemplatesDef: function() {
        return this._deferredItems || []
    },
    _getItemData: function() {
        var items = this._data || [];
        var options = this._options || {};
        if (options.inverted) {
            items = items.slice().reverse()
        }
        return items.filter(i => i.visible)
    },
    _finalUpdate: function(options) {
        this._adjustBackgroundSettings(options);
        this._setBoundingRect(options.margin)
    },
    erase: function() {
        var insideLegendGroup = this._insideLegendGroup;
        insideLegendGroup && insideLegendGroup.dispose();
        this._insideLegendGroup = this._markersGroup = this._x1 = this._x2 = this._y2 = this._y2 = null;
        return this
    },
    _locateElements: function(locationOptions) {
        this._moveInInitialValues();
        this._locateRowsColumns(locationOptions)
    },
    _moveInInitialValues: function() {
        this._title.hasText() && this._title.move([0, 0]);
        this._legendGroup && this._legendGroup.move(0, 0);
        this._background && this._background.attr({
            x: 0,
            y: 0,
            width: 0,
            height: 0
        })
    },
    applySelected: function(id) {
        applyMarkerState(id, this._markersId, this._items, "selection");
        return this
    },
    applyHover: function(id) {
        applyMarkerState(id, this._markersId, this._items, "hover");
        return this
    },
    resetItem: function(id) {
        applyMarkerState(id, this._markersId, this._items, "normal");
        return this
    },
    _createLabel: function(data, group) {
        var labelFormatObject = this._getCustomizeObject(data);
        var options = this._options;
        var align = getAlign(options.itemTextPosition);
        var text = options.customizeText.call(labelFormatObject, labelFormatObject);
        var fontStyle = _isDefined(data.textOpacity) ? {
            color: options.font.color,
            opacity: data.textOpacity
        } : {};
        return this._renderer.text(text, 0, 0).css(Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["patchFontOptions"])(fontStyle)).attr({
            align: align,
            class: options.cssClass
        }).append(group)
    },
    _createHint: function(data, group) {
        var labelFormatObject = this._getCustomizeObject(data);
        var text = this._options.customizeHint.call(labelFormatObject, labelFormatObject);
        if (_isDefined(text) && "" !== text) {
            group.setTitle(text)
        }
    },
    _createBackground: function() {
        var isInside = this._options.position === INSIDE;
        var color = this._options.backgroundColor;
        var fill = color || (isInside ? this._options.containerBackgroundColor : NONE);
        if (this._options.border.visible || (isInside || color) && color !== NONE) {
            this._background = this._renderer.rect(0, 0, 0, 0).attr({
                fill: fill,
                class: this._backgroundClass
            }).append(this._insideLegendGroup)
        }
    },
    _locateRowsColumns: function(options) {
        var iteration = 0;
        var layoutOptions = this._getItemsLayoutOptions();
        var countItems = this._items.length;
        var lines;
        do {
            lines = [];
            this._createLines(lines, layoutOptions);
            this._alignLines(lines, layoutOptions);
            iteration++
        } while (checkLinesSize(lines, layoutOptions, countItems, options.margin) && iteration < countItems);
        this._applyItemPosition(lines, layoutOptions)
    },
    _createLines: function(lines, layoutOptions) {
        this._items.forEach((item, i) => {
            var tableLine = getLines(lines, layoutOptions, i);
            var labelBox = {
                width: item.labelBBox.width,
                height: item.labelBBox.height,
                element: item.label,
                bBox: item.labelBBox,
                pos: getPos(layoutOptions),
                itemIndex: i
            };
            var markerBox = {
                width: item.markerBBox.width,
                height: item.markerBBox.height,
                element: item.marker,
                pos: {
                    horizontal: CENTER,
                    vertical: CENTER
                },
                bBox: {
                    width: item.markerBBox.width,
                    height: item.markerBBox.height,
                    x: item.markerBBox.x,
                    y: item.markerBBox.y
                },
                itemIndex: i
            };
            var firstItem;
            var secondItem;
            var offsetDirection = layoutOptions.markerOffset ? "altOffset" : "offset";
            if (layoutOptions.inverseLabelPosition) {
                firstItem = labelBox;
                secondItem = markerBox
            } else {
                firstItem = markerBox;
                secondItem = labelBox
            }
            firstItem[offsetDirection] = layoutOptions.labelOffset;
            tableLine.secondLine.push(firstItem);
            tableLine.firstLine.push(secondItem)
        })
    },
    _alignLines: function(lines, layoutOptions) {
        var i;
        var measure = layoutOptions.altMeasure;
        lines.forEach(line => setMaxInLine(line, measure));
        measure = layoutOptions.measure;
        if (layoutOptions.itemsAlignment) {
            if (layoutOptions.markerOffset) {
                for (i = 0; i < lines.length;) {
                    transpose([lines[i++], lines[i++]]).forEach(processLine)
                }
            }
        } else {
            transpose(lines).forEach(processLine)
        }

        function processLine(line) {
            setMaxInLine(line, measure)
        }
    },
    _applyItemPosition: function(lines, layoutOptions) {
        var that = this;
        var position = {
            x: 0,
            y: 0
        };
        var maxLineLength = getMaxLineLength(lines, layoutOptions);
        lines.forEach(line => {
            var firstItem = line[0];
            var altOffset = firstItem.altOffset || layoutOptions.altSpacing;
            position[layoutOptions.direction] = getInitPositionForDirection(line, layoutOptions, maxLineLength);
            line.forEach(item => {
                var offset = item.offset || layoutOptions.spacing;
                var wrap = new _core_layout_element__WEBPACK_IMPORTED_MODULE_2__["WrapperLayoutElement"](item.element, item.bBox);
                var itemBBoxOptions = {
                    x: position.x,
                    y: position.y,
                    width: item.width,
                    height: item.height
                };
                var itemBBox = new _core_layout_element__WEBPACK_IMPORTED_MODULE_2__["WrapperLayoutElement"](null, itemBBoxOptions);
                var itemLegend = that._items[item.itemIndex];
                wrap.position({
                    of: itemBBox,
                    my: item.pos,
                    at: item.pos
                });
                itemLegend.bBoxes.push(itemBBox);
                position[layoutOptions.direction] += item[layoutOptions.measure] + offset
            });
            position[layoutOptions.altDirection] += firstItem[layoutOptions.altMeasure] + altOffset
        });
        this._items.forEach(item => {
            var itemBBox = calculateBBoxLabelAndMarker(item.bBoxes[0].getLayoutOptions(), item.bBoxes[1].getLayoutOptions());
            var horizontal = that._options.columnItemSpacing / 2;
            var vertical = that._options.rowItemSpacing / 2;
            item.tracker.left = itemBBox.left - horizontal;
            item.tracker.right = itemBBox.right + horizontal;
            item.tracker.top = itemBBox.top - vertical;
            item.tracker.bottom = itemBBox.bottom + vertical
        })
    },
    _getItemsLayoutOptions: function() {
        var options = this._options;
        var orientation = options.orientation;
        var layoutOptions = {
            itemsAlignment: options.itemsAlignment,
            orientation: options.orientation
        };
        var width = this._size.width - (this._background ? 2 * options.paddingLeftRight : 0);
        var height = this._size.height - (this._background ? 2 * options.paddingTopBottom : 0);
        if (orientation === HORIZONTAL) {
            layoutOptions.length = width;
            layoutOptions.spacing = options.columnItemSpacing;
            layoutOptions.direction = "x";
            layoutOptions.measure = WIDTH;
            layoutOptions.altMeasure = HEIGHT;
            layoutOptions.altDirection = "y";
            layoutOptions.altSpacing = options.rowItemSpacing;
            layoutOptions.countItem = options.columnCount;
            layoutOptions.altCountItem = options.rowCount;
            layoutOptions.marginTextLabel = 4;
            layoutOptions.labelOffset = 7;
            if (options.itemTextPosition === BOTTOM || options.itemTextPosition === TOP) {
                layoutOptions.labelOffset = 4;
                layoutOptions.markerOffset = true
            }
        } else {
            layoutOptions.length = height;
            layoutOptions.spacing = options.rowItemSpacing;
            layoutOptions.direction = "y";
            layoutOptions.measure = HEIGHT;
            layoutOptions.altMeasure = WIDTH;
            layoutOptions.altDirection = "x";
            layoutOptions.altSpacing = options.columnItemSpacing;
            layoutOptions.countItem = options.rowCount;
            layoutOptions.altCountItem = options.columnCount;
            layoutOptions.marginTextLabel = 7;
            layoutOptions.labelOffset = 4;
            if (options.itemTextPosition === RIGHT || options.itemTextPosition === LEFT) {
                layoutOptions.labelOffset = 7;
                layoutOptions.markerOffset = true
            }
        }
        if (!layoutOptions.countItem) {
            if (layoutOptions.altCountItem) {
                layoutOptions.countItem = _ceil(this._items.length / layoutOptions.altCountItem)
            } else {
                layoutOptions.countItem = this._items.length
            }
        }
        if (options.itemTextPosition === TOP || options.itemTextPosition === LEFT) {
            layoutOptions.inverseLabelPosition = true
        }
        layoutOptions.itemTextPosition = options.itemTextPosition;
        layoutOptions.altCountItem = layoutOptions.altCountItem || _ceil(this._items.length / layoutOptions.countItem);
        return layoutOptions
    },
    _adjustBackgroundSettings: function(locationOptions) {
        if (!this._background) {
            return
        }
        var border = locationOptions.border;
        var legendBox = this._calculateTotalBox();
        var backgroundSettings = {
            x: _round(legendBox.x - locationOptions.paddingLeftRight),
            y: _round(legendBox.y - locationOptions.paddingTopBottom),
            width: _round(legendBox.width) + 2 * locationOptions.paddingLeftRight,
            height: _round(legendBox.height),
            opacity: locationOptions.backgroundOpacity
        };
        if (border.visible && border.width && border.color && border.color !== NONE) {
            backgroundSettings["stroke-width"] = border.width;
            backgroundSettings.stroke = border.color;
            backgroundSettings["stroke-opacity"] = border.opacity;
            backgroundSettings.dashStyle = border.dashStyle;
            backgroundSettings.rx = border.cornerRadius || 0;
            backgroundSettings.ry = border.cornerRadius || 0
        }
        this._background.attr(backgroundSettings)
    },
    _setBoundingRect: function(margin) {
        if (!this._insideLegendGroup) {
            return
        }
        var box = this._calculateTotalBox();
        box.height += margin.top + margin.bottom;
        box.widthWithoutMargins = box.width;
        box.width += margin.left + margin.right;
        box.x -= margin.left;
        box.y -= margin.top;
        this._boundingRect = box
    },
    _calculateTotalBox: function() {
        var markerBox = this._markersGroup.getBBox();
        var titleBox = this._title.getCorrectedLayoutOptions();
        var box = this._insideLegendGroup.getBBox();
        var verticalPadding = this._background ? 2 * this._options.paddingTopBottom : 0;
        box.height = markerBox.height + titleBox.height + verticalPadding;
        titleBox.width > box.width && (box.width = titleBox.width);
        return box
    },
    getActionCallback: function(point) {
        var that = this;
        if (that._options.visible) {
            return function(act) {
                that[act](point.index)
            }
        } else {
            return _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"]
        }
    },
    getLayoutOptions: function() {
        var options = this._options;
        var boundingRect = this._insideLegendGroup ? this._boundingRect : {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
        if (options) {
            boundingRect.verticalAlignment = options.verticalAlignment;
            boundingRect.horizontalAlignment = options.horizontalAlignment;
            if (options.orientation === HORIZONTAL) {
                boundingRect.cutLayoutSide = options.verticalAlignment;
                boundingRect.cutSide = "vertical"
            } else if (options.horizontalAlignment === CENTER) {
                boundingRect.cutLayoutSide = options.verticalAlignment;
                boundingRect.cutSide = "vertical"
            } else {
                boundingRect.cutLayoutSide = options.horizontalAlignment;
                boundingRect.cutSide = "horizontal"
            }
            boundingRect.position = {
                horizontal: options.horizontalAlignment,
                vertical: options.verticalAlignment
            };
            return boundingRect
        }
        return null
    },
    shift: function(x, y) {
        var box = {};
        if (this._insideLegendGroup) {
            this._insideLegendGroup.attr({
                translateX: x - this._boundingRect.x,
                translateY: y - this._boundingRect.y
            })
        }
        this._title && this._shiftTitle(this._boundingRect.widthWithoutMargins);
        this._markersGroup && this._shiftMarkers();
        if (this._insideLegendGroup) {
            box = this._legendGroup.getBBox()
        }
        this._x1 = box.x;
        this._y1 = box.y;
        this._x2 = box.x + box.width;
        this._y2 = box.y + box.height;
        return this
    },
    _shiftTitle: function(boxWidth) {
        var title = this._title;
        var titleBox = title.getCorrectedLayoutOptions();
        if (!titleBox || !title.hasText()) {
            return
        }
        var width = boxWidth - (this._background ? 2 * this._options.paddingLeftRight : 0);
        var titleOptions = title.getOptions();
        var titleY = titleBox.y + titleOptions.margin.top;
        var titleX = 0;
        if (titleOptions.verticalAlignment === BOTTOM && this._markersGroup) {
            titleY += this._markersGroup.getBBox().height
        }
        if (titleOptions.horizontalAlignment === RIGHT) {
            titleX = width - titleBox.width
        } else if (titleOptions.horizontalAlignment === CENTER) {
            titleX = (width - titleBox.width) / 2
        }
        title.shift(titleX, titleY)
    },
    _shiftMarkers: function() {
        var titleBox = this._title.getLayoutOptions();
        var markerBox = this._markersGroup.getBBox();
        var titleOptions = this._title.getOptions() || {};
        var center = 0;
        var y = 0;
        if (titleBox.width > markerBox.width && this._options.horizontalAlignment === CENTER) {
            center = titleBox.width / 2 - markerBox.width / 2
        }
        if (titleOptions.verticalAlignment === TOP) {
            y = titleBox.height
        }
        if (0 !== center || 0 !== y) {
            this._markersGroup.attr({
                translateX: center,
                translateY: y
            });
            this._items.forEach(item => {
                item.tracker.left += center;
                item.tracker.right += center;
                item.tracker.top += y;
                item.tracker.bottom += y
            })
        }
    },
    getPosition: function() {
        return this._options.position
    },
    coordsIn: function(x, y) {
        return x >= this._x1 && x <= this._x2 && y >= this._y1 && y <= this._y2
    },
    getItemByCoord: function(x, y) {
        var items = this._items;
        var legendGroup = this._insideLegendGroup;
        x -= legendGroup.attr("translateX");
        y -= legendGroup.attr("translateY");
        for (var i = 0; i < items.length; i++) {
            if (inRect(items[i].tracker, x, y)) {
                return items[i].tracker
            }
        }
        return null
    },
    dispose: function() {
        this._title && this._title.dispose();
        this._legendGroup = this._insideLegendGroup = this._title = this._renderer = this._options = this._data = this._items = null;
        return this
    },
    layoutOptions: function() {
        if (!this.isVisible()) {
            return null
        }
        var pos = this.getLayoutOptions();
        return {
            horizontalAlignment: this._options.horizontalAlignment,
            verticalAlignment: this._options.verticalAlignment,
            side: pos.cutSide,
            priority: 1,
            position: this.getPosition()
        }
    },
    measure: function(size) {
        if (this._updated || !this._insideLegendGroup) {
            this.draw(size[0], size[1]);
            this._updated = false
        } else {
            this._items.forEach(item => {
                item.bBoxes = []
            });
            this._updateElementsPosition(size[0], size[1])
        }
        var rect = this.getLayoutOptions();
        return [rect.width, rect.height]
    },
    move: function(rect) {
        this.shift(rect[0], rect[1])
    },
    freeSpace: function() {
        this._options._incidentOccurred("W2104");
        this.erase()
    }
});
var plugin = {
    name: "legend",
    init: function() {
        var group = this._renderer.g().attr({
            class: this._rootClassPrefix + "-legend"
        }).enableLinks().append(this._renderer.root);
        this._legend = new Legend({
            renderer: this._renderer,
            group: group,
            widget: this,
            itemGroupClass: this._rootClassPrefix + "-item",
            titleGroupClass: this._rootClassPrefix + "-title",
            textField: "text",
            getFormatObject: function(data) {
                return {
                    item: data.item,
                    text: data.text
                }
            }
        });
        this._layout.add(this._legend)
    },
    extenders: {
        _applyTilesAppearance: function() {
            var that = this;
            this._items.forEach((function(item) {
                that._applyLegendItemStyle(item.id, item.getState())
            }))
        },
        _buildNodes: function() {
            this._createLegendItems()
        }
    },
    members: {
        _applyLegendItemStyle: function(id, state) {
            var legend = this._legend;
            switch (state) {
                case "hover":
                    legend.applyHover(id);
                    break;
                case "selection":
                    legend.applySelected(id);
                    break;
                default:
                    legend.resetItem(id)
            }
        },
        _createLegendItems: function() {
            if (this._legend.update(this._getLegendData(), this._getOption("legend"), this._themeManager.theme("legend").title)) {
                this._requestChange(["LAYOUT"])
            }
        }
    },
    dispose: function() {
        this._legend.dispose()
    },
    customize: function(constructor) {
        constructor.prototype._proxyData.push((function(x, y) {
            if (this._legend.coordsIn(x, y)) {
                var item = this._legend.getItemByCoord(x, y);
                if (item) {
                    return {
                        id: item.id,
                        type: "legend"
                    }
                }
            }
        }));
        constructor.addChange({
            code: "LEGEND",
            handler: function() {
                this._createLegendItems()
            },
            isThemeDependent: true,
            option: "legend",
            isOptionChange: true
        })
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/components/parse_utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/components/parse_utils.js ***!
  \*******************************************************************/
/*! exports provided: correctValueType, getParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "correctValueType", function() { return correctValueType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParser", function() { return getParser; });
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_date_serialization__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/date_serialization */ "./node_modules/devextreme/esm/core/utils/date_serialization.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/viz/components/parse_utils.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var parsers = {
    string: function(val) {
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(val) ? "" + val : val
    },
    numeric: function(val) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(val)) {
            return val
        }
        var parsedVal = Number(val);
        if (isNaN(parsedVal)) {
            parsedVal = void 0
        }
        return parsedVal
    },
    datetime: function(val) {
        if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(val)) {
            return val
        }
        var parsedVal;
        var numVal = Number(val);
        if (!isNaN(numVal)) {
            parsedVal = new Date(numVal)
        } else {
            parsedVal = _core_utils_date_serialization__WEBPACK_IMPORTED_MODULE_1__["default"].deserializeDate(val)
        }
        if (isNaN(Number(parsedVal))) {
            parsedVal = void 0
        }
        return parsedVal
    }
};
function correctValueType(type) {
    return "numeric" === type || "datetime" === type || "string" === type ? type : ""
}
var getParser = function(valueType) {
    return parsers[correctValueType(valueType)] || _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"]
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/annotations.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/annotations.js ***!
  \*************************************************************/
/*! exports provided: createAnnotations, plugins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAnnotations", function() { return createAnnotations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugins", function() { return plugins; });
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/tooltip */ "./node_modules/devextreme/esm/viz/core/tooltip.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _plaque__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plaque */ "./node_modules/devextreme/esm/viz/core/plaque.js");
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../events/pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/* harmony import */ var _events_drag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../events/drag */ "./node_modules/devextreme/esm/events/drag.js");
/* harmony import */ var _events_utils_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../events/utils/index */ "./node_modules/devextreme/esm/events/utils/index.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/**
 * DevExtreme (esm/viz/core/annotations.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */










var getDocument = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_0__["default"].getDocument;
var EVENT_NS = "annotations";
var DOT_EVENT_NS = "." + EVENT_NS;
var POINTER_ACTION = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_8__["addNamespace"])([_events_pointer__WEBPACK_IMPORTED_MODULE_6__["default"].down, _events_pointer__WEBPACK_IMPORTED_MODULE_6__["default"].move], EVENT_NS);
var POINTER_UP_EVENT_NAME = Object(_events_utils_index__WEBPACK_IMPORTED_MODULE_8__["addNamespace"])(_events_pointer__WEBPACK_IMPORTED_MODULE_6__["default"].up, EVENT_NS);
var DRAG_START_EVENT_NAME = _events_drag__WEBPACK_IMPORTED_MODULE_7__["start"] + DOT_EVENT_NS;
var DRAG_EVENT_NAME = _events_drag__WEBPACK_IMPORTED_MODULE_7__["move"] + DOT_EVENT_NS;
var DRAG_END_EVENT_NAME = _events_drag__WEBPACK_IMPORTED_MODULE_7__["end"] + DOT_EVENT_NS;

function coreAnnotation(options, contentTemplate) {
    return {
        draw: function(widget, group) {
            var annotationGroup = widget._renderer.g().append(group).css(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["patchFontOptions"])(options.font));
            if (this.plaque) {
                this.plaque.clear()
            }
            this.plaque = new _plaque__WEBPACK_IMPORTED_MODULE_5__["Plaque"](Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(true, {}, options, {
                cornerRadius: (options.border || {}).cornerRadius
            }), widget, annotationGroup, contentTemplate, widget._isAnnotationBounded(options));
            this.plaque.draw(widget._getAnnotationCoords(this));
            if (options.allowDragging) {
                annotationGroup.on(DRAG_START_EVENT_NAME, {
                    immediate: true
                }, e => {
                    this._dragOffsetX = this.plaque.x - e.pageX;
                    this._dragOffsetY = this.plaque.y - e.pageY
                }).on(DRAG_EVENT_NAME, e => {
                    this.plaque.move(e.pageX + this._dragOffsetX, e.pageY + this._dragOffsetY)
                }).on(DRAG_END_EVENT_NAME, e => {
                    this.offsetX = (this.offsetX || 0) + e.offset.x;
                    this.offsetY = (this.offsetY || 0) + e.offset.y
                })
            }
        },
        hitTest(x, y) {
            return this.plaque.hitTest(x, y)
        },
        showTooltip(tooltip, _ref) {
            var {
                x: x,
                y: y
            } = _ref;
            var that = this;
            var options = that.options;
            if (tooltip.annotation !== that) {
                tooltip.setTemplate(options.tooltipTemplate);
                var callback = result => {
                    result && (tooltip.annotation = that)
                };
                callback(tooltip.show(options, {
                    x: x,
                    y: y
                }, {
                    target: options
                }, options.customizeTooltip, callback))
            } else if (!tooltip.isCursorOnTooltip(x, y)) {
                tooltip.move(x, y)
            }
        }
    }
}

function getTemplateFunction(options, widget) {
    var template;
    if ("text" === options.type) {
        template = function(item, groupElement) {
            var text = widget._renderer.text(item.text).attr({
                class: item.cssClass
            }).append({
                element: groupElement
            });
            if (item.width > 0 || item.height > 0) {
                text.setMaxSize(item.width, item.height, {
                    wordWrap: item.wordWrap,
                    textOverflow: item.textOverflow
                })
            }
        }
    } else if ("image" === options.type) {
        template = function(item, groupElement) {
            var {
                width: width,
                height: height,
                url: url,
                location: location
            } = item.image || {};
            var {
                width: outerWidth,
                height: outerHeight
            } = item;
            var imageWidth = outerWidth > 0 ? Math.min(width, outerWidth) : width;
            var imageHeight = outerHeight > 0 ? Math.min(height, outerHeight) : height;
            widget._renderer.image(0, 0, imageWidth, imageHeight, url, location || "center").append({
                element: groupElement
            })
        }
    } else if ("custom" === options.type) {
        template = options.template
    }
    return template
}

function getImageObject(image) {
    return "string" === typeof image ? {
        url: image
    } : image
}
var createAnnotations = function(widget, items) {
    var commonAnnotationSettings = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var customizeAnnotation = arguments.length > 3 ? arguments[3] : void 0;
    var pullOptions = arguments.length > 4 ? arguments[4] : void 0;
    var commonImageOptions = getImageObject(commonAnnotationSettings.image);
    return items.reduce((arr, item) => {
        var currentImageOptions = getImageObject(item.image);
        var customizedItem = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(customizeAnnotation) ? customizeAnnotation(item) : {};
        if (customizedItem) {
            customizedItem.image = getImageObject(customizedItem.image)
        }
        var options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(true, {}, commonAnnotationSettings, item, {
            image: commonImageOptions
        }, {
            image: currentImageOptions
        }, customizedItem);
        var templateFunction = getTemplateFunction(options, widget);
        var annotation = templateFunction && Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(true, pullOptions(options), coreAnnotation(options, widget._getTemplate(templateFunction)));
        annotation && arr.push(annotation);
        return arr
    }, [])
};
var chartPlugin = {
    name: "annotations_chart",
    init() {},
    dispose() {},
    members: {
        _getAnnotationCoords(annotation) {
            var _axis, _axis2;
            var coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY
            };
            var argCoordName = this._options.silent("rotated") ? "y" : "x";
            var valCoordName = this._options.silent("rotated") ? "x" : "y";
            var argAxis = this.getArgumentAxis();
            var argument = argAxis.validateUnit(annotation.argument);
            var axis = this.getValueAxis(annotation.axis);
            var series;
            var pane = null === (_axis = axis) || void 0 === _axis ? void 0 : _axis.pane;
            if (annotation.series) {
                var _series;
                series = this.series.filter(s => s.name === annotation.series)[0];
                axis = null === (_series = series) || void 0 === _series ? void 0 : _series.getValueAxis();
                Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(axis) && (pane = axis.pane)
            }
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(argument)) {
                if (series) {
                    var center = series.getPointCenterByArg(argument);
                    center && (coords[argCoordName] = center[argCoordName])
                } else {
                    coords[argCoordName] = argAxis.getTranslator().translate(argument)
                }!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(pane) && (pane = argAxis.pane)
            }
            var value = null === (_axis2 = axis) || void 0 === _axis2 ? void 0 : _axis2.validateUnit(annotation.value);
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(value)) {
                var _axis3;
                coords[valCoordName] = null === (_axis3 = axis) || void 0 === _axis3 ? void 0 : _axis3.getTranslator().translate(value);
                !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(pane) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(axis) && (pane = axis.pane)
            }
            coords.canvas = this._getCanvasForPane(pane);
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(coords[argCoordName]) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(value)) {
                var _series2;
                if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(axis) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(series)) {
                    coords[valCoordName] = argAxis.getAxisPosition()
                } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(axis) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(series)) {
                    coords[valCoordName] = this._argumentAxes.filter(a => a.pane === axis.pane)[0].getAxisPosition()
                } else if (null !== (_series2 = series) && void 0 !== _series2 && _series2.checkSeriesViewportCoord(argAxis, coords[argCoordName])) {
                    coords[valCoordName] = series.getSeriesPairCoord(coords[argCoordName], true)
                }
            }
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(argument) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(coords[valCoordName])) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(axis) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(series)) {
                    coords[argCoordName] = axis.getAxisPosition()
                } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(series)) {
                    if (series.checkSeriesViewportCoord(axis, coords[valCoordName])) {
                        coords[argCoordName] = series.getSeriesPairCoord(coords[valCoordName], false)
                    }
                }
            }
            return coords
        },
        _annotationsPointerEventHandler(event) {
            if (this._disposed) {
                return
            }
            var originalEvent = event.originalEvent || {};
            var touch = originalEvent.touches && originalEvent.touches[0] || {};
            var rootOffset = this._renderer.getRootOffset();
            var coords = {
                x: touch.pageX || originalEvent.pageX || event.pageX,
                y: touch.pageY || originalEvent.pageY || event.pageY
            };
            var annotation = this._annotations.items.filter(a => a.hitTest(coords.x - rootOffset.left, coords.y - rootOffset.top))[0];
            if (!annotation || !annotation.options.tooltipEnabled) {
                this._annotations.hideTooltip();
                return
            }
            this._clear();
            if (annotation.options.allowDragging && event.type === _events_pointer__WEBPACK_IMPORTED_MODULE_6__["default"].down) {
                this._annotations._hideToolTipForDrag = true
            }
            if (!this._annotations._hideToolTipForDrag) {
                annotation.showTooltip(this._annotations.tooltip, coords);
                event.stopPropagation()
            }
        },
        _isAnnotationBounded: options => Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.value) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.argument),
        _pullOptions: options => ({
            type: options.type,
            name: options.name,
            x: options.x,
            y: options.y,
            value: options.value,
            argument: options.argument,
            axis: options.axis,
            series: options.series,
            options: options,
            offsetX: options.offsetX,
            offsetY: options.offsetY
        }),
        _forceAnnotationRender() {
            this._change(["FORCE_RENDER"])
        },
        _clear() {
            this.hideTooltip();
            this.clearHover()
        }
    }
};
var polarChartPlugin = {
    name: "annotations_polar_chart",
    init() {},
    dispose() {},
    members: {
        _getAnnotationCoords(annotation) {
            var coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY,
                canvas: this._calcCanvas()
            };
            var argAxis = this.getArgumentAxis();
            var argument = argAxis.validateUnit(annotation.argument);
            var value = this.getValueAxis().validateUnit(annotation.value);
            var radius = annotation.radius;
            var angle = annotation.angle;
            var pointCoords;
            var series;
            if (annotation.series) {
                series = this.series.filter(s => s.name === annotation.series)[0]
            }
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])(true, coords, this.getXYFromPolar(angle, radius, argument, value));
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(series)) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(coords.angle) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(value) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(radius)) {
                    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(argument)) {
                        argument = argAxis.getTranslator().from(isFinite(angle) ? this.getActualAngle(angle) : coords.angle)
                    }
                    pointCoords = series.getSeriesPairCoord({
                        argument: argument,
                        angle: -coords.angle
                    }, true)
                } else if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(coords.radius) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(argument) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(angle)) {
                    pointCoords = series.getSeriesPairCoord({
                        radius: coords.radius
                    }, false)
                }
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(pointCoords)) {
                    coords.x = pointCoords.x;
                    coords.y = pointCoords.y
                }
            }
            if (annotation.series && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(pointCoords)) {
                coords.x = coords.y = void 0
            }
            return coords
        },
        _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
        _isAnnotationBounded: chartPlugin.members._isAnnotationBounded,
        _pullOptions(options) {
            var polarOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({}, {
                radius: options.radius,
                angle: options.angle
            }, chartPlugin.members._pullOptions(options));
            delete polarOptions.axis;
            return polarOptions
        },
        _forceAnnotationRender: chartPlugin.members._forceAnnotationRender,
        _clear: chartPlugin.members._clear
    }
};
var vectorMapPlugin = {
    name: "annotations_vector_map",
    init() {},
    dispose() {
        this._annotations._offTracker();
        this._annotations._offTracker = null
    },
    members: {
        _getAnnotationCoords(annotation) {
            var coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY
            };
            coords.canvas = this._projection.getCanvas();
            if (annotation.coordinates) {
                var data = this._projection.toScreenPoint(annotation.coordinates);
                coords.x = data[0];
                coords.y = data[1]
            }
            return coords
        },
        _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
        _isAnnotationBounded: options => Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(options.coordinates),
        _pullOptions(options) {
            var vectorMapOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({}, {
                coordinates: options.coordinates
            }, chartPlugin.members._pullOptions(options));
            delete vectorMapOptions.axis;
            delete vectorMapOptions.series;
            delete vectorMapOptions.argument;
            delete vectorMapOptions.value;
            return vectorMapOptions
        },
        _forceAnnotationRender() {
            this._change(["EXTRA_ELEMENTS"])
        },
        _getAnnotationStyles: () => ({
            "text-anchor": "start"
        }),
        _clear() {}
    },
    extenders: {
        _prepareExtraElements() {
            var that = this;
            var renderElements = () => {
                that._renderExtraElements()
            };
            that._annotations._offTracker = that._tracker.on({
                move: renderElements,
                zoom: renderElements,
                end: renderElements
            })
        }
    }
};
var pieChartPlugin = {
    name: "annotations_pie_chart",
    init() {},
    dispose() {},
    members: {
        _getAnnotationCoords(annotation) {
            var series;
            var coords = {
                offsetX: annotation.offsetX,
                offsetY: annotation.offsetY,
                canvas: this._canvas
            };
            if (annotation.argument) {
                if (annotation.series) {
                    series = this.getSeriesByName(annotation.series)
                } else {
                    series = this.series[0]
                }
                var argument = series.getPointsByArg(annotation.argument)[0];
                var {
                    x: x,
                    y: y
                } = argument.getAnnotationCoords(annotation.location);
                coords.x = x;
                coords.y = y
            }
            return coords
        },
        _isAnnotationBounded: options => options.argument,
        _annotationsPointerEventHandler: chartPlugin.members._annotationsPointerEventHandler,
        _pullOptions(options) {
            var pieChartOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({}, {
                location: options.location
            }, chartPlugin.members._pullOptions(options));
            delete pieChartOptions.axis;
            return pieChartOptions
        },
        _clear: chartPlugin.members._clear,
        _forceAnnotationRender: chartPlugin.members._forceAnnotationRender
    }
};
var corePlugin = {
    name: "annotations_core",
    init() {
        this._annotations = {
            items: [],
            _hideToolTipForDrag: false,
            tooltip: new _core_tooltip__WEBPACK_IMPORTED_MODULE_2__["Tooltip"]({
                cssClass: "".concat(this._rootClassPrefix, "-annotation-tooltip"),
                eventTrigger: this._eventTrigger,
                widgetRoot: this.element(),
                widget: this
            }),
            hideTooltip() {
                this.tooltip.annotation = null;
                this.tooltip.hide()
            },
            clearItems() {
                this.items.forEach(i => i.plaque.clear());
                this.items = []
            }
        };
        this._annotations.tooltip.setRendererOptions(this._getRendererOptions())
    },
    dispose() {
        this._annotationsGroup.linkRemove().linkOff();
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_9__["default"].off(getDocument(), DOT_EVENT_NS);
        this._annotationsGroup.off(DOT_EVENT_NS);
        this._annotations.tooltip && this._annotations.tooltip.dispose()
    },
    extenders: {
        _createHtmlStructure() {
            this._annotationsGroup = this._renderer.g().attr({
                class: "".concat(this._rootClassPrefix, "-annotations")
            }).css(this._getAnnotationStyles()).linkOn(this._renderer.root, "annotations").linkAppend();
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_9__["default"].on(getDocument(), POINTER_ACTION, e => {
                if (this._disposed) {
                    return
                }
                if (!this._annotations.tooltip.isCursorOnTooltip(e.pageX, e.pageY)) {
                    this._annotations.hideTooltip()
                }
            });
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_9__["default"].on(getDocument(), POINTER_UP_EVENT_NAME, event => {
                this._annotations._hideToolTipForDrag = false;
                this._annotationsPointerEventHandler(event)
            });
            this._annotationsGroup.on(POINTER_ACTION, this._annotationsPointerEventHandler.bind(this))
        },
        _renderExtraElements() {
            this._annotationsGroup.clear();
            this._annotations.items.forEach(item => item.draw(this, this._annotationsGroup))
        },
        _stopCurrentHandling() {
            this._annotations.hideTooltip()
        }
    },
    members: {
        _buildAnnotations() {
            this._annotations.clearItems();
            var items = this._getOption("annotations", true);
            if (!(null !== items && void 0 !== items && items.length)) {
                return
            }
            this._annotations.items = createAnnotations(this, items, this._getOption("commonAnnotationSettings"), this._getOption("customizeAnnotation", true), this._pullOptions)
        },
        _setAnnotationTooltipOptions() {
            var tooltipOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({}, this._getOption("tooltip"));
            tooltipOptions.contentTemplate = tooltipOptions.customizeTooltip = void 0;
            this._annotations.tooltip.update(tooltipOptions)
        },
        _getAnnotationCoords: () => ({}),
        _pullOptions: () => ({}),
        _getAnnotationStyles: () => ({})
    },
    customize(constructor) {
        constructor.addChange({
            code: "ANNOTATIONITEMS",
            handler() {
                this._requestChange(["ANNOTATIONS"])
            },
            isOptionChange: true,
            option: "annotations"
        });
        constructor.addChange({
            code: "ANNOTATIONSSETTINGS",
            handler() {
                this._requestChange(["ANNOTATIONS"])
            },
            isOptionChange: true,
            option: "commonAnnotationSettings"
        });
        constructor.addChange({
            code: "ANNOTATIONS",
            handler() {
                this._buildAnnotations();
                this._setAnnotationTooltipOptions();
                this._forceAnnotationRender()
            },
            isThemeDependent: true,
            isOptionChange: true
        })
    },
    fontFields: ["commonAnnotationSettings.font"]
};
var plugins = {
    core: corePlugin,
    chart: chartPlugin,
    polarChart: polarChartPlugin,
    vectorMap: vectorMapPlugin,
    pieChart: pieChartPlugin
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/base_theme_manager.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/base_theme_manager.js ***!
  \********************************************************************/
/*! exports provided: BaseThemeManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseThemeManager", function() { return BaseThemeManager; });
/* harmony import */ var _core_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/class */ "./node_modules/devextreme/esm/core/class.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../palette */ "./node_modules/devextreme/esm/viz/palette.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../themes */ "./node_modules/devextreme/esm/viz/themes.js");
/**
 * DevExtreme (esm/viz/core/base_theme_manager.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var _getTheme = _themes__WEBPACK_IMPORTED_MODULE_6__["getTheme"];
var _addCacheItem = _themes__WEBPACK_IMPORTED_MODULE_6__["addCacheItem"];
var _removeCacheItem = _themes__WEBPACK_IMPORTED_MODULE_6__["removeCacheItem"];
var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"];
var _each = _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"];

function getThemePart(theme, path) {
    var _theme = theme;
    path && _each(path.split("."), (function(_, pathItem) {
        return _theme = _theme[pathItem]
    }));
    return _theme
}
var BaseThemeManager = _core_class__WEBPACK_IMPORTED_MODULE_0__["default"].inherit({
    ctor: function(options) {
        this._themeSection = options.themeSection;
        this._fontFields = options.fontFields || [];
        _addCacheItem(this)
    },
    dispose: function() {
        _removeCacheItem(this);
        this._callback = this._theme = this._font = null;
        return this
    },
    setCallback: function(callback) {
        this._callback = callback;
        return this
    },
    setTheme: function(theme, rtl) {
        this._current = theme;
        this._rtl = rtl;
        return this.refresh()
    },
    refresh: function() {
        var current = this._current || {};
        var theme = _getTheme(current.name || current);
        this._themeName = theme.name;
        this._defaultPalette = theme.defaultPalette;
        this._font = _extend({}, theme.font, current.font);
        this._themeSection && _each(this._themeSection.split("."), (function(_, path) {
            theme = _extend(true, {}, theme[path])
        }));
        this._theme = _extend(true, {}, theme, Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_2__["isString"])(current) ? {} : current);
        this._initializeTheme();
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_5__["parseScalar"])(this._rtl, this._theme.rtlEnabled)) {
            _extend(true, this._theme, this._theme._rtl)
        }
        this._callback();
        return this
    },
    theme: function(path) {
        return getThemePart(this._theme, path)
    },
    themeName: function() {
        return this._themeName
    },
    createPalette: function(palette, options) {
        return Object(_palette__WEBPACK_IMPORTED_MODULE_4__["createPalette"])(palette, options, this._defaultPalette)
    },
    createDiscretePalette: function(palette, count) {
        return Object(_palette__WEBPACK_IMPORTED_MODULE_4__["getDiscretePalette"])(palette, count, this._defaultPalette)
    },
    createGradientPalette: function(palette) {
        return Object(_palette__WEBPACK_IMPORTED_MODULE_4__["getGradientPalette"])(palette, this._defaultPalette)
    },
    getAccentColor: function(palette) {
        return Object(_palette__WEBPACK_IMPORTED_MODULE_4__["getAccentColor"])(palette, this._defaultPalette)
    },
    _initializeTheme: function() {
        var that = this;
        _each(that._fontFields || [], (function(_, path) {
            that._initializeFont(getThemePart(that._theme, path))
        }))
    },
    _initializeFont: function(font) {
        _extend(font, this._font, _extend({}, font))
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/base_widget.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/base_widget.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_resize_callbacks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/resize_callbacks */ "./node_modules/devextreme/esm/core/utils/resize_callbacks.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_base_theme_manager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/base_theme_manager */ "./node_modules/devextreme/esm/viz/core/base_theme_manager.js");
/* harmony import */ var _core_dom_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../core/dom_component */ "./node_modules/devextreme/esm/core/dom_component.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers */ "./node_modules/devextreme/esm/viz/core/helpers.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _errors_warnings__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./errors_warnings */ "./node_modules/devextreme/esm/viz/core/errors_warnings.js");
/* harmony import */ var _renderers_renderer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./renderers/renderer */ "./node_modules/devextreme/esm/viz/core/renderers/renderer.js");
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./layout */ "./node_modules/devextreme/esm/viz/core/layout.js");
/* harmony import */ var _core_devices__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../core/devices */ "./node_modules/devextreme/esm/core/devices.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_deferred__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../core/utils/deferred */ "./node_modules/devextreme/esm/core/utils/deferred.js");
/* harmony import */ var _base_widget_utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./base_widget.utils */ "./node_modules/devextreme/esm/viz/core/base_widget.utils.js");
/**
 * DevExtreme (esm/viz/core/base_widget.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




















var _floor = Math.floor;
var _log = _errors_warnings__WEBPACK_IMPORTED_MODULE_12__["default"].log;
var OPTION_RTL_ENABLED = "rtlEnabled";
var SIZED_ELEMENT_CLASS = "dx-sized-element";
var _option = _core_dom_component__WEBPACK_IMPORTED_MODULE_9__["default"].prototype.option;

function getTrue() {
    return true
}

function getFalse() {
    return false
}

function areCanvasesDifferent(canvas1, canvas2) {
    return !(canvas1.width === canvas2.width && canvas1.height === canvas2.height && canvas1.left === canvas2.left && canvas1.top === canvas2.top && canvas1.right === canvas2.right && canvas1.bottom === canvas2.bottom)
}

function defaultOnIncidentOccurred(e) {
    if (!e.component._eventsStrategy.hasEvent("incidentOccurred")) {
        _log.apply(null, [e.target.id].concat(e.target.args || []))
    }
}

function pickPositiveValue(values) {
    return values.reduce((function(result, value) {
        return value > 0 && !result ? value : result
    }), 0)
}
var getEmptyComponent = function() {
    var emptyComponentConfig = {
        _initTemplates() {},
        ctor(element, options) {
            this.callBase(element, options);
            var sizedElement = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div");
            var width = options && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isNumeric"])(options.width) ? options.width + "px" : "100%";
            var height = options && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isNumeric"])(options.height) ? options.height + "px" : this._getDefaultSize().height + "px";
            _core_dom_adapter__WEBPACK_IMPORTED_MODULE_3__["default"].setStyle(sizedElement, "width", width);
            _core_dom_adapter__WEBPACK_IMPORTED_MODULE_3__["default"].setStyle(sizedElement, "height", height);
            _core_dom_adapter__WEBPACK_IMPORTED_MODULE_3__["default"].setClass(sizedElement, SIZED_ELEMENT_CLASS);
            _core_dom_adapter__WEBPACK_IMPORTED_MODULE_3__["default"].insertElement(element, sizedElement)
        }
    };
    var EmptyComponent = _core_dom_component__WEBPACK_IMPORTED_MODULE_9__["default"].inherit(emptyComponentConfig);
    var originalInherit = EmptyComponent.inherit;
    EmptyComponent.inherit = function(config) {
        for (var field in config) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(config[field]) && "_" !== field.substr(0, 1) && "option" !== field || "_dispose" === field || "_optionChanged" === field) {
                config[field] = _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"]
            }
        }
        return originalInherit.call(this, config)
    };
    return EmptyComponent
};

function callForEach(functions) {
    functions.forEach(c => c())
}
var isServerSide = !Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["hasWindow"])();

function sizeIsValid(value) {
    return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(value) && value > 0
}
var baseWidget = isServerSide ? getEmptyComponent() : _core_dom_component__WEBPACK_IMPORTED_MODULE_9__["default"].inherit({
    _eventsMap: {
        onIncidentOccurred: {
            name: "incidentOccurred",
            actionSettings: {
                excludeValidators: ["disabled"]
            }
        },
        onDrawn: {
            name: "drawn",
            actionSettings: {
                excludeValidators: ["disabled"]
            }
        }
    },
    _getDefaultOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(this.callBase(), {
            onIncidentOccurred: defaultOnIncidentOccurred
        })
    },
    _useLinks: true,
    _init: function() {
        var that = this;
        that._$element.children("." + SIZED_ELEMENT_CLASS).remove();
        that.callBase.apply(that, arguments);
        that._changesLocker = 0;
        that._optionChangedLocker = 0;
        that._asyncFirstDrawing = true;
        that._changes = Object(_helpers__WEBPACK_IMPORTED_MODULE_10__["changes"])();
        that._suspendChanges();
        that._themeManager = that._createThemeManager();
        that._themeManager.setCallback((function() {
            that._requestChange(that._themeDependentChanges)
        }));
        that._renderElementAttributes();
        that._initRenderer();
        var linkTarget = that._useLinks && that._renderer.root;
        linkTarget && linkTarget.enableLinks().virtualLink("core").virtualLink("peripheral");
        that._renderVisibilityChange();
        that._attachVisibilityChangeHandlers();
        that._toggleParentsScrollSubscription(this._isVisible());
        that._initEventTrigger();
        that._incidentOccurred = Object(_base_widget_utils__WEBPACK_IMPORTED_MODULE_19__["createIncidentOccurred"])(that.NAME, that._eventTrigger);
        that._layout = new _layout__WEBPACK_IMPORTED_MODULE_15__["default"];
        linkTarget && linkTarget.linkAfter("core");
        that._initPlugins();
        that._initCore();
        linkTarget && linkTarget.linkAfter();
        that._change(that._initialChanges)
    },
    _createThemeManager() {
        return new _core_base_theme_manager__WEBPACK_IMPORTED_MODULE_8__["BaseThemeManager"](this._getThemeManagerOptions())
    },
    _getThemeManagerOptions() {
        return {
            themeSection: this._themeSection,
            fontFields: this._fontFields
        }
    },
    _initialChanges: ["LAYOUT", "RESIZE_HANDLER", "THEME", "DISABLED"],
    _initPlugins: function() {
        var that = this;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(that._plugins, (function(_, plugin) {
            plugin.init.call(that)
        }))
    },
    _disposePlugins: function() {
        var that = this;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(that._plugins.slice().reverse(), (function(_, plugin) {
            plugin.dispose.call(that)
        }))
    },
    _change: function(codes) {
        this._changes.add(codes)
    },
    _suspendChanges: function() {
        ++this._changesLocker
    },
    _resumeChanges: function() {
        if (0 === --this._changesLocker && this._changes.count() > 0 && !this._applyingChanges) {
            this._renderer.lock();
            this._applyingChanges = true;
            this._applyChanges();
            this._changes.reset();
            this._applyingChanges = false;
            this._changesApplied();
            this._renderer.unlock();
            if (this._optionsQueue) {
                this._applyQueuedOptions()
            }
            this.resolveItemsDeferred(this._legend ? [this._legend] : []);
            this._optionChangedLocker++;
            this._notify();
            this._optionChangedLocker--
        }
    },
    resolveItemsDeferred(items) {
        this._resolveDeferred(this._getTemplatesItems(items))
    },
    _collectTemplatesFromItems: items => items.reduce((prev, i) => ({
        items: prev.items.concat(i.getTemplatesDef()),
        groups: prev.groups.concat(i.getTemplatesGroups())
    }), {
        items: [],
        groups: []
    }),
    _getTemplatesItems(items) {
        var elements = this._collectTemplatesFromItems(items);
        var extraItems = this._getExtraTemplatesItems();
        return {
            items: extraItems.items.concat(elements.items),
            groups: extraItems.groups.concat(elements.groups),
            launchRequest: [extraItems.launchRequest],
            doneRequest: [extraItems.doneRequest]
        }
    },
    _getExtraTemplatesItems: () => ({
        items: [],
        groups: [],
        launchRequest: () => {},
        doneRequest: () => {}
    }),
    _resolveDeferred(_ref) {
        var {
            items: items,
            launchRequest: launchRequest,
            doneRequest: doneRequest,
            groups: groups
        } = _ref;
        var that = this;
        that._setGroupsVisibility(groups, "hidden");
        if (that._changesApplying) {
            that._changesApplying = false;
            callForEach(doneRequest);
            return
        }
        var syncRendering = true;
        _core_utils_deferred__WEBPACK_IMPORTED_MODULE_18__["when"].apply(that, items).done(() => {
            if (syncRendering) {
                that._setGroupsVisibility(groups, "visible");
                return
            }
            callForEach(launchRequest);
            that._changesApplying = true;
            var changes = ["LAYOUT", "FULL_RENDER"];
            if (that._asyncFirstDrawing) {
                changes.push("FORCE_FIRST_DRAWING");
                that._asyncFirstDrawing = false
            } else {
                changes.push("FORCE_DRAWING")
            }
            that._requestChange(changes);
            that._setGroupsVisibility(groups, "visible")
        });
        syncRendering = false
    },
    _setGroupsVisibility(groups, visibility) {
        groups.forEach(g => g.attr({
            visibility: visibility
        }))
    },
    _applyQueuedOptions: function() {
        var queue = this._optionsQueue;
        this._optionsQueue = null;
        this.beginUpdate();
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"])(queue, (function(_, action) {
            action()
        }));
        this.endUpdate()
    },
    _requestChange: function(codes) {
        this._suspendChanges();
        this._change(codes);
        this._resumeChanges()
    },
    _applyChanges: function() {
        var changes = this._changes;
        var order = this._totalChangesOrder;
        var i;
        var ii = order.length;
        for (i = 0; i < ii; ++i) {
            if (changes.has(order[i])) {
                this["_change_" + order[i]]()
            }
        }
    },
    _optionChangesOrder: ["EVENTS", "THEME", "RENDERER", "RESIZE_HANDLER"],
    _layoutChangesOrder: ["ELEMENT_ATTR", "CONTAINER_SIZE", "LAYOUT"],
    _customChangesOrder: ["DISABLED"],
    _change_EVENTS: function() {
        this._eventTrigger.applyChanges()
    },
    _change_THEME: function() {
        this._setThemeAndRtl()
    },
    _change_RENDERER: function() {
        this._setRendererOptions()
    },
    _change_RESIZE_HANDLER: function() {
        this._setupResizeHandler()
    },
    _change_ELEMENT_ATTR: function() {
        this._renderElementAttributes();
        this._change(["CONTAINER_SIZE"])
    },
    _change_CONTAINER_SIZE: function() {
        this._updateSize()
    },
    _change_LAYOUT: function() {
        this._setContentSize()
    },
    _change_DISABLED: function() {
        var renderer = this._renderer;
        var root = renderer.root;
        if (this.option("disabled")) {
            this._initDisabledState = root.attr("pointer-events");
            root.attr({
                "pointer-events": "none",
                filter: renderer.getGrayScaleFilter().id
            })
        } else if ("none" === root.attr("pointer-events")) {
            root.attr({
                "pointer-events": Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(this._initDisabledState) ? this._initDisabledState : null,
                filter: null
            })
        }
    },
    _themeDependentChanges: ["RENDERER"],
    _initRenderer: function() {
        this._canvas = this._calculateCanvas();
        this._renderer = new _renderers_renderer__WEBPACK_IMPORTED_MODULE_13__["Renderer"]({
            cssClass: this._rootClassPrefix + " " + this._rootClass,
            pathModified: this.option("pathModified"),
            container: this._$element[0]
        });
        this._renderer.resize(this._canvas.width, this._canvas.height)
    },
    _disposeRenderer: function() {
        this._renderer.dispose()
    },
    _getAnimationOptions: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    render: function() {
        this._requestChange(["CONTAINER_SIZE"]);
        var visible = this._isVisible();
        this._toggleParentsScrollSubscription(visible);
        !visible && this._stopCurrentHandling()
    },
    _toggleParentsScrollSubscription: function(subscribe) {
        var $parents = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(this._renderer.root.element).parents();
        if ("generic" === _core_devices__WEBPACK_IMPORTED_MODULE_16__["default"].real().platform) {
            $parents = $parents.add(Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["getWindow"])())
        }
        this._proxiedTargetParentsScrollHandler = this._proxiedTargetParentsScrollHandler || function() {
            this._stopCurrentHandling()
        }.bind(this);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_17__["default"].off(Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])().add(this._$prevRootParents), "scroll.viz_widgets", this._proxiedTargetParentsScrollHandler);
        if (subscribe) {
            _events_core_events_engine__WEBPACK_IMPORTED_MODULE_17__["default"].on($parents, "scroll.viz_widgets", this._proxiedTargetParentsScrollHandler);
            this._$prevRootParents = $parents
        }
    },
    _stopCurrentHandling: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    _dispose: function() {
        var that = this;
        if (this._disposed) {
            return
        }
        that.callBase.apply(that, arguments);
        that._toggleParentsScrollSubscription(false);
        that._removeResizeHandler();
        that._layout.dispose();
        that._eventTrigger.dispose();
        that._disposeCore();
        that._disposePlugins();
        that._disposeRenderer();
        that._themeManager.dispose();
        that._themeManager = that._renderer = that._eventTrigger = null
    },
    _initEventTrigger: function() {
        var that = this;
        that._eventTrigger = Object(_base_widget_utils__WEBPACK_IMPORTED_MODULE_19__["createEventTrigger"])(that._eventsMap, (function(name, actionSettings) {
            return that._createActionByOption(name, actionSettings)
        }))
    },
    _calculateCanvas: function() {
        var that = this;
        var size = that.option("size") || {};
        var margin = that.option("margin") || {};
        var defaultCanvas = that._getDefaultSize() || {};
        var getSizeOfSide = (size, side, getter) => {
            if (sizeIsValid(size[side]) || !Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["hasWindow"])()) {
                return 0
            }
            var elementSize = getter(that._$element);
            return elementSize <= 1 ? 0 : elementSize
        };
        var elementWidth = getSizeOfSide(size, "width", x => Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_14__["getWidth"])(x));
        var elementHeight = getSizeOfSide(size, "height", x => Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_14__["getHeight"])(x));
        var canvas = {
            width: size.width <= 0 ? 0 : _floor(pickPositiveValue([size.width, elementWidth, defaultCanvas.width])),
            height: size.height <= 0 ? 0 : _floor(pickPositiveValue([size.height, elementHeight, defaultCanvas.height])),
            left: pickPositiveValue([margin.left, defaultCanvas.left]),
            top: pickPositiveValue([margin.top, defaultCanvas.top]),
            right: pickPositiveValue([margin.right, defaultCanvas.right]),
            bottom: pickPositiveValue([margin.bottom, defaultCanvas.bottom])
        };
        if (canvas.width - canvas.left - canvas.right <= 0 || canvas.height - canvas.top - canvas.bottom <= 0) {
            canvas = {
                width: 0,
                height: 0
            }
        }
        return canvas
    },
    _updateSize: function() {
        var canvas = this._calculateCanvas();
        this._renderer.fixPlacement();
        if (areCanvasesDifferent(this._canvas, canvas) || this.__forceRender) {
            this._canvas = canvas;
            this._recreateSizeDependentObjects(true);
            this._renderer.resize(canvas.width, canvas.height);
            this._change(["LAYOUT"])
        }
    },
    _recreateSizeDependentObjects: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    _getMinSize: function() {
        return [0, 0]
    },
    _getAlignmentRect: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    _setContentSize: function() {
        var canvas = this._canvas;
        var layout = this._layout;
        var rect = canvas.width > 0 && canvas.height > 0 ? [canvas.left, canvas.top, canvas.width - canvas.right, canvas.height - canvas.bottom] : [0, 0, 0, 0];
        rect = layout.forward(rect, this._getMinSize());
        var nextRect = this._applySize(rect) || rect;
        layout.backward(nextRect, this._getAlignmentRect() || nextRect)
    },
    _getOption: function(name, isScalar) {
        var theme = this._themeManager.theme(name);
        var option = this.option(name);
        return isScalar ? void 0 !== option ? option : theme : Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_7__["extend"])(true, {}, theme, option)
    },
    _setupResizeHandler: function() {
        var that = this;
        var redrawOnResize = Object(_utils__WEBPACK_IMPORTED_MODULE_11__["parseScalar"])(this._getOption("redrawOnResize", true), true);
        if (that._resizeHandler) {
            that._removeResizeHandler()
        }
        that._resizeHandler = Object(_base_widget_utils__WEBPACK_IMPORTED_MODULE_19__["createResizeHandler"])((function() {
            if (redrawOnResize) {
                that._requestChange(["CONTAINER_SIZE"])
            } else {
                that._renderer.fixPlacement()
            }
        }));
        _core_utils_resize_callbacks__WEBPACK_IMPORTED_MODULE_6__["default"].add(that._resizeHandler)
    },
    _removeResizeHandler: function() {
        if (this._resizeHandler) {
            _core_utils_resize_callbacks__WEBPACK_IMPORTED_MODULE_6__["default"].remove(this._resizeHandler);
            this._resizeHandler.dispose();
            this._resizeHandler = null
        }
    },
    _onBeginUpdate: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    beginUpdate: function() {
        var that = this;
        if (that._initialized && that._isUpdateAllowed()) {
            that._onBeginUpdate();
            that._suspendChanges()
        }
        that.callBase.apply(that, arguments);
        return that
    },
    endUpdate: function() {
        this.callBase();
        this._isUpdateAllowed() && this._resumeChanges();
        return this
    },
    option: function(name) {
        var that = this;
        if (that._initialized && that._applyingChanges && (arguments.length > 1 || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isObject"])(name))) {
            that._optionsQueue = that._optionsQueue || [];
            that._optionsQueue.push(that._getActionForUpdating(arguments))
        } else {
            return _option.apply(that, arguments)
        }
    },
    _getActionForUpdating: function(args) {
        var that = this;
        return function() {
            _option.apply(that, args)
        }
    },
    _clean: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    _render: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    _optionChanged: function(arg) {
        var that = this;
        if (that._optionChangedLocker) {
            return
        }
        var partialChanges = that.getPartialChangeOptionsName(arg);
        var changes = [];
        if (partialChanges.length > 0) {
            partialChanges.forEach(pc => changes.push(that._partialOptionChangesMap[pc]))
        } else {
            changes.push(that._optionChangesMap[arg.name])
        }
        changes = changes.filter(c => !!c);
        if (that._eventTrigger.change(arg.name)) {
            that._change(["EVENTS"])
        } else if (changes.length > 0) {
            that._change(changes)
        } else {
            that.callBase.apply(that, arguments)
        }
    },
    _notify: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    _changesApplied: _core_utils_common__WEBPACK_IMPORTED_MODULE_1__["noop"],
    _optionChangesMap: {
        size: "CONTAINER_SIZE",
        margin: "CONTAINER_SIZE",
        redrawOnResize: "RESIZE_HANDLER",
        theme: "THEME",
        rtlEnabled: "THEME",
        encodeHtml: "THEME",
        elementAttr: "ELEMENT_ATTR",
        disabled: "DISABLED"
    },
    _partialOptionChangesMap: {},
    _partialOptionChangesPath: {},
    getPartialChangeOptionsName: function(changedOption) {
        var that = this;
        var fullName = changedOption.fullName;
        var sections = fullName.split(/[.]/);
        var name = changedOption.name;
        var value = changedOption.value;
        var options = this._partialOptionChangesPath[name];
        var partialChangeOptionsName = [];
        if (options) {
            if (true === options) {
                partialChangeOptionsName.push(name)
            } else {
                options.forEach(op => {
                    fullName.indexOf(op) >= 0 && partialChangeOptionsName.push(op)
                });
                if (1 === sections.length) {
                    if ("object" === Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["type"])(value)) {
                        that._addOptionsNameForPartialUpdate(value, options, partialChangeOptionsName)
                    } else if ("array" === Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["type"])(value)) {
                        if (value.length > 0 && value.every(item => that._checkOptionsForPartialUpdate(item, options))) {
                            value.forEach(item => that._addOptionsNameForPartialUpdate(item, options, partialChangeOptionsName))
                        }
                    }
                }
            }
        }
        return partialChangeOptionsName.filter((value, index, self) => self.indexOf(value) === index)
    },
    _checkOptionsForPartialUpdate: function(optionObject, options) {
        return !Object.keys(optionObject).some(key => -1 === options.indexOf(key))
    },
    _addOptionsNameForPartialUpdate: function(optionObject, options, partialChangeOptionsName) {
        var optionKeys = Object.keys(optionObject);
        if (this._checkOptionsForPartialUpdate(optionObject, options)) {
            optionKeys.forEach(key => options.indexOf(key) > -1 && partialChangeOptionsName.push(key))
        }
    },
    _visibilityChanged: function() {
        this.render()
    },
    _setThemeAndRtl: function() {
        this._themeManager.setTheme(this.option("theme"), this.option(OPTION_RTL_ENABLED))
    },
    _getRendererOptions: function() {
        return {
            rtl: this.option(OPTION_RTL_ENABLED),
            encodeHtml: this.option("encodeHtml"),
            animation: this._getAnimationOptions()
        }
    },
    _setRendererOptions: function() {
        this._renderer.setOptions(this._getRendererOptions())
    },
    svg: function() {
        return this._renderer.svg()
    },
    getSize: function() {
        var canvas = this._canvas || {};
        return {
            width: canvas.width,
            height: canvas.height
        }
    },
    isReady: getFalse,
    _dataIsReady: getTrue,
    _resetIsReady: function() {
        this.isReady = getFalse
    },
    _drawn: function() {
        var that = this;
        that.isReady = getFalse;
        if (that._dataIsReady()) {
            that._renderer.onEndAnimation((function() {
                that.isReady = getTrue
            }))
        }
        that._eventTrigger("drawn", {})
    }
});
/* harmony default export */ __webpack_exports__["default"] = (baseWidget);
Object(_helpers__WEBPACK_IMPORTED_MODULE_10__["replaceInherit"])(baseWidget);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/base_widget.utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/base_widget.utils.js ***!
  \*******************************************************************/
/*! exports provided: createEventTrigger, createIncidentOccurred, createResizeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventTrigger", function() { return createEventTrigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIncidentOccurred", function() { return createIncidentOccurred; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createResizeHandler", function() { return createResizeHandler; });
/* harmony import */ var _core_version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/version */ "./node_modules/devextreme/esm/core/version.js");
/* harmony import */ var _core_utils_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/string */ "./node_modules/devextreme/esm/core/utils/string.js");
/* harmony import */ var _errors_warnings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors_warnings */ "./node_modules/devextreme/esm/viz/core/errors_warnings.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/**
 * DevExtreme (esm/viz/core/base_widget.utils.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var ERROR_MESSAGES = _errors_warnings__WEBPACK_IMPORTED_MODULE_2__["default"].ERROR_MESSAGES;
function createEventTrigger(eventsMap, callbackGetter) {
    var triggers = {};
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(eventsMap, (function(name, info) {
        if (info.name) {
            createEvent(name)
        }
    }));
    var changes;
    triggerEvent.change = function(name) {
        var eventInfo = eventsMap[name];
        if (eventInfo) {
            (changes = changes || {})[name] = eventInfo
        }
        return !!eventInfo
    };
    triggerEvent.applyChanges = function() {
        if (changes) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(changes, (function(name, eventInfo) {
                createEvent(eventInfo.newName || name)
            }));
            changes = null
        }
    };
    triggerEvent.dispose = function() {
        eventsMap = callbackGetter = triggers = null
    };
    return triggerEvent;

    function createEvent(name) {
        var eventInfo = eventsMap[name];
        triggers[eventInfo.name] = callbackGetter(name, eventInfo.actionSettings)
    }

    function triggerEvent(name, arg, complete) {
        triggers[name](arg);
        complete && complete()
    }
}
var createIncidentOccurred = function(widgetName, eventTrigger) {
    return function(id, args) {
        eventTrigger("incidentOccurred", {
            target: {
                id: id,
                type: "E" === id[0] ? "error" : "warning",
                args: args,
                text: _core_utils_string__WEBPACK_IMPORTED_MODULE_1__["format"].apply(null, [ERROR_MESSAGES[id]].concat(args || [])),
                widget: widgetName,
                version: _core_version__WEBPACK_IMPORTED_MODULE_0__["version"]
            }
        })
    }
};
function createResizeHandler(callback) {
    var timeout;
    var handler = function() {
        clearTimeout(timeout);
        timeout = setTimeout(callback, 100)
    };
    handler.dispose = function() {
        clearTimeout(timeout);
        return this
    };
    return handler
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/data_source.js":
/*!*************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/data_source.js ***!
  \*************************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _data_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data_helper */ "./node_modules/devextreme/esm/data_helper.js");
/**
 * DevExtreme (esm/viz/core/data_source.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var postCtor = _data_helper__WEBPACK_IMPORTED_MODULE_1__["default"].postCtor;
var name;
var members = {
    _dataSourceLoadErrorHandler: function() {
        this._dataSourceChangedHandler()
    },
    _dataSourceOptions: function() {
        return {
            paginate: false
        }
    },
    _updateDataSource: function() {
        this._refreshDataSource();
        if (!this.option("dataSource")) {
            this._dataSourceChangedHandler()
        }
    },
    _dataIsLoaded: function() {
        return !this._dataSource || this._dataSource.isLoaded()
    },
    _dataSourceItems: function() {
        return this._dataSource && this._dataSource.items()
    }
};
for (name in _data_helper__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    if ("postCtor" === name) {
        continue
    }
    members[name] = _data_helper__WEBPACK_IMPORTED_MODULE_1__["default"][name]
}
var plugin = {
    name: "data_source",
    init: function() {
        postCtor.call(this)
    },
    dispose: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    members: members
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/errors_warnings.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/errors_warnings.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/error */ "./node_modules/devextreme/esm/core/utils/error.js");
/* harmony import */ var _core_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/errors */ "./node_modules/devextreme/esm/core/errors.js");
/**
 * DevExtreme (esm/viz/core/errors_warnings.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


/* harmony default export */ __webpack_exports__["default"] = (Object(_core_utils_error__WEBPACK_IMPORTED_MODULE_0__["default"])(_core_errors__WEBPACK_IMPORTED_MODULE_1__["default"].ERROR_MESSAGES, {
    E2001: "Invalid data source",
    E2002: "Axis type and data type are incompatible",
    E2003: 'The "{0}" data source field contains data of unsupported type',
    E2004: 'The "{0}" data source field is inconsistent',
    E2005: 'The value field "{0}" is absent in the data source or all its values are negative',
    E2006: "A cycle is detected in provided data",
    E2007: 'The value field "{0}" is absent in the data source',
    E2008: 'The value field "{0}" must be a string',
    E2009: 'The value field "{0}" must be a positive numeric value',
    E2101: "Unknown series type: {0}",
    E2102: "Ambiguity occurred between two value axes with the same name",
    E2103: 'The "{0}" option is given an invalid value. Assign a function instead',
    E2104: "Invalid logarithm base",
    E2105: 'Invalid value of a "{0}"',
    E2202: "Invalid {0} scale value",
    E2203: "The range you are trying to set is invalid",
    W2002: "The {0} series cannot be drawn because the {1} data field is missing",
    W2003: "Tick interval is too small",
    W2101: 'The "{0}" pane does not exist; the last pane is used by default',
    W2102: 'A value axis with the "{0}" name was created automatically',
    W2103: "The chart title was hidden due to the container size",
    W2104: "The legend was hidden due to the container size",
    W2105: 'The title of the "{0}" axis was hidden due to the container size',
    W2106: 'The labels of the "{0}" axis were hidden due to the container size',
    W2107: "The export menu was hidden due to the container size",
    W2108: "The browser does not support exporting images to {0} format.",
    W2301: "Invalid value range"
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/export.js":
/*!********************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/export.js ***!
  \********************************************************/
/*! exports provided: exportFromMarkup, getMarkup, exportWidgets, combineMarkups, ExportMenu, plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportFromMarkup", function() { return exportFromMarkup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMarkup", function() { return getMarkup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportWidgets", function() { return exportWidgets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineMarkups", function() { return combineMarkups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportMenu", function() { return ExportMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/svg */ "./node_modules/devextreme/esm/core/utils/svg.js");
/* harmony import */ var _exporter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../exporter */ "./node_modules/devextreme/esm/exporter.js");
/* harmony import */ var _localization_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../localization/message */ "./node_modules/devextreme/esm/localization/message.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../themes */ "./node_modules/devextreme/esm/viz/themes.js");
/* harmony import */ var _events_hover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../events/hover */ "./node_modules/devextreme/esm/events/hover.js");
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../events/pointer */ "./node_modules/devextreme/esm/events/pointer.js");
/* harmony import */ var _core_utils_console__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils/console */ "./node_modules/devextreme/esm/core/utils/console.js");
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/**
 * DevExtreme (esm/viz/core/export.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */












var pointerActions = [_events_pointer__WEBPACK_IMPORTED_MODULE_9__["default"].down, _events_pointer__WEBPACK_IMPORTED_MODULE_9__["default"].move].join(" ");
var BUTTON_SIZE = 35;
var ICON_COORDS = [
    [9, 12, 26, 12, 26, 14, 9, 14],
    [9, 17, 26, 17, 26, 19, 9, 19],
    [9, 22, 26, 22, 26, 24, 9, 24]
];
var LIST_PADDING_TOP = 4;
var LIST_WIDTH = 120;
var VERTICAL_TEXT_MARGIN = 8;
var HORIZONTAL_TEXT_MARGIN = 15;
var MENU_ITEM_HEIGHT = 30;
var LIST_STROKE_WIDTH = 1;
var MARGIN = 10;
var SHADOW_OFFSET = 2;
var SHADOW_BLUR = 3;
var DEFAULT_EXPORT_FORMAT = "PNG";
var ALLOWED_IMAGE_FORMATS = [DEFAULT_EXPORT_FORMAT, "JPEG", "GIF"];
var ALLOWED_EXTRA_FORMATS = ["PDF", "SVG"];
var EXPORT_CSS_CLASS = "dx-export-menu";
var A4WidthCm = "21cm";
var EXPORT_DATA_KEY = "export-element-type";
var FORMAT_DATA_KEY = "export-element-format";
var GET_COLOR_REGEX = /data-backgroundcolor="([^"]*)"/;

function getValidFormats() {
    var imageFormats = _exporter__WEBPACK_IMPORTED_MODULE_4__["image"].testFormats(ALLOWED_IMAGE_FORMATS);
    return {
        unsupported: imageFormats.unsupported,
        supported: imageFormats.supported.concat(ALLOWED_EXTRA_FORMATS)
    }
}

function validateFormat(format, incidentOccurred, validFormats) {
    validFormats = validFormats || getValidFormats();
    format = String(format).toUpperCase();
    if (-1 !== validFormats.supported.indexOf(format)) {
        return format
    }
    if (-1 !== validFormats.unsupported.indexOf(format)) {
        incidentOccurred && incidentOccurred("W2108", [format])
    }
}

function getCreatorFunc(format) {
    if ("SVG" === format) {
        return _exporter__WEBPACK_IMPORTED_MODULE_4__["svg"].getData
    } else if ("PDF" === format) {
        return _exporter__WEBPACK_IMPORTED_MODULE_4__["pdf"].getData
    } else {
        return _exporter__WEBPACK_IMPORTED_MODULE_4__["image"].getData
    }
}

function print(imageSrc, options) {
    var document = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_1__["getWindow"])().document;
    var iFrame = document.createElement("iframe");
    iFrame.onload = setPrint(imageSrc, options);
    iFrame.style.position = "fixed";
    iFrame.style.width = "0";
    iFrame.style.height = "0";
    iFrame.style.right = "0";
    iFrame.style.bottom = "0";
    document.body.appendChild(iFrame)
}

function calculatePrintPageWidth(iFrameBody) {
    iFrameBody.style.width = A4WidthCm;
    var width = Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_11__["getWidth"])(iFrameBody);
    iFrameBody.style.width = "";
    return width
}

function setPrint(imageSrc, options) {
    return function() {
        var window = this.contentWindow;
        var img = window.document.createElement("img");
        window.document.body.appendChild(img);
        var widthRatio = calculatePrintPageWidth(window.document.body) / options.width;
        if (widthRatio < 1) {
            window.document.body.style.transform = "scale(".concat(widthRatio, ")");
            window.document.body.style["transform-origin"] = "0 0"
        }
        var removeFrame = () => {
            this.parentElement.removeChild(this)
        };
        img.addEventListener("load", () => {
            window.focus();
            window.print()
        });
        img.addEventListener("error", removeFrame);
        window.addEventListener("afterprint", () => {
            setTimeout(removeFrame, 0)
        });
        img.src = imageSrc
    }
}

function getItemAttributes(options, type, itemIndex) {
    var x = BUTTON_SIZE - LIST_WIDTH;
    var y = BUTTON_SIZE + LIST_PADDING_TOP + LIST_STROKE_WIDTH + itemIndex * MENU_ITEM_HEIGHT;
    var attr = {
        rect: {
            width: LIST_WIDTH - 2 * LIST_STROKE_WIDTH,
            height: MENU_ITEM_HEIGHT,
            x: x + LIST_STROKE_WIDTH,
            y: y
        },
        text: {
            x: x + (options.rtl ? LIST_WIDTH - HORIZONTAL_TEXT_MARGIN : HORIZONTAL_TEXT_MARGIN),
            y: y + MENU_ITEM_HEIGHT - VERTICAL_TEXT_MARGIN
        }
    };
    if ("printing" === type) {
        attr.separator = {
            stroke: options.button.default.borderColor,
            "stroke-width": LIST_STROKE_WIDTH,
            cursor: "pointer",
            sharp: "v",
            d: "M " + x + " " + (y + MENU_ITEM_HEIGHT - LIST_STROKE_WIDTH) + " L " + (x + LIST_WIDTH) + " " + (y + MENU_ITEM_HEIGHT - LIST_STROKE_WIDTH)
        }
    }
    return attr
}

function createMenuItem(renderer, options, settings) {
    var itemData = {};
    var type = settings.type;
    var format = settings.format;
    var attr = getItemAttributes(options, type, settings.itemIndex);
    var fontStyle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["patchFontOptions"])(options.font);
    fontStyle["pointer-events"] = "none";
    var menuItem = renderer.g().attr({
        class: EXPORT_CSS_CLASS + "-list-item"
    });
    itemData[EXPORT_DATA_KEY] = type;
    if (format) {
        itemData[FORMAT_DATA_KEY] = format
    }
    var rect = renderer.rect();
    rect.attr(attr.rect).css({
        cursor: "pointer",
        "pointer-events": "all"
    }).data(itemData);
    rect.on(_events_hover__WEBPACK_IMPORTED_MODULE_8__["start"] + ".export", () => rect.attr({
        fill: options.button.hover.backgroundColor
    })).on(_events_hover__WEBPACK_IMPORTED_MODULE_8__["end"] + ".export", () => rect.attr({
        fill: null
    }));
    rect.append(menuItem);
    var text = renderer.text(settings.text).css(fontStyle).attr(attr.text).append(menuItem);
    if ("printing" === type) {
        renderer.path(null, "line").attr(attr.separator).append(menuItem)
    }
    return {
        g: menuItem,
        rect: rect,
        resetState: () => rect.attr({
            fill: null
        }),
        fixPosition: () => {
            var textBBox = text.getBBox();
            text.move(attr.text.x - textBBox.x - (options.rtl ? textBBox.width : 0))
        }
    }
}

function createMenuItems(renderer, options) {
    var items = [];
    if (options.printingEnabled) {
        items.push(createMenuItem(renderer, options, {
            type: "printing",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("vizExport-printingButtonText"),
            itemIndex: items.length
        }))
    }
    items = options.formats.reduce((r, format) => {
        r.push(createMenuItem(renderer, options, {
            type: "exporting",
            text: _localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].getFormatter("vizExport-exportButtonText")(format),
            format: format,
            itemIndex: r.length
        }));
        return r
    }, items);
    return items
}

function getBackgroundColorFromMarkup(markup) {
    var parsedMarkup = GET_COLOR_REGEX.exec(markup);
    return null === parsedMarkup || void 0 === parsedMarkup ? void 0 : parsedMarkup[1]
}
var exportFromMarkup = function(markup, options) {
    options.format = validateFormat(options.format) || DEFAULT_EXPORT_FORMAT;
    options.fileName = options.fileName || "file";
    options.exportingAction = options.onExporting;
    options.exportedAction = options.onExported;
    options.fileSavingAction = options.onFileSaving;
    options.margin = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isDefined"])(options.margin) ? options.margin : MARGIN;
    options.backgroundColor = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_6__["isDefined"])(options.backgroundColor) ? options.backgroundColor : getBackgroundColorFromMarkup(markup) || Object(_themes__WEBPACK_IMPORTED_MODULE_7__["getTheme"])().backgroundColor;
    Object(_exporter__WEBPACK_IMPORTED_MODULE_4__["export"])(markup, options, getCreatorFunc(options.format))
};
var getMarkup = widgets => combineMarkups(widgets).markup;
var exportWidgets = function(widgets, options) {
    options = options || {};
    var markupInfo = combineMarkups(widgets, {
        gridLayout: options.gridLayout,
        verticalAlignment: options.verticalAlignment,
        horizontalAlignment: options.horizontalAlignment
    });
    options.width = markupInfo.width;
    options.height = markupInfo.height;
    exportFromMarkup(markupInfo.markup, options)
};
var combineMarkups = function(widgets) {
    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (!Array.isArray(widgets)) {
        widgets = [
            [widgets]
        ]
    } else if (!Array.isArray(widgets[0])) {
        widgets = widgets.map(item => [item])
    }
    var compactView = !options.gridLayout;
    var exportItems = widgets.reduce((r, row, rowIndex) => {
        var rowInfo = row.reduce((r, item, colIndex) => {
            var size = item.getSize();
            var backgroundColor = item.option("backgroundColor") || Object(_themes__WEBPACK_IMPORTED_MODULE_7__["getTheme"])(item.option("theme")).backgroundColor;
            backgroundColor && -1 === r.backgroundColors.indexOf(backgroundColor) && r.backgroundColors.push(backgroundColor);
            r.hOffset = r.width;
            r.width += size.width;
            r.height = Math.max(r.height, size.height);
            r.itemWidth = Math.max(r.itemWidth, size.width);
            r.items.push({
                markup: item.svg(),
                width: size.width,
                height: size.height,
                c: colIndex,
                r: rowIndex,
                hOffset: r.hOffset
            });
            return r
        }, {
            items: [],
            height: 0,
            itemWidth: 0,
            hOffset: 0,
            width: 0,
            backgroundColors: r.backgroundColors
        });
        r.rowOffsets.push(r.totalHeight);
        r.rowHeights.push(rowInfo.height);
        r.totalHeight += rowInfo.height;
        r.items = r.items.concat(rowInfo.items);
        r.itemWidth = Math.max(r.itemWidth, rowInfo.itemWidth);
        r.maxItemLen = Math.max(r.maxItemLen, rowInfo.items.length);
        r.totalWidth = compactView ? Math.max(r.totalWidth, rowInfo.width) : r.maxItemLen * r.itemWidth;
        return r
    }, {
        items: [],
        rowOffsets: [],
        rowHeights: [],
        itemWidth: 0,
        totalHeight: 0,
        maxItemLen: 0,
        totalWidth: 0,
        backgroundColors: []
    });
    var backgroundColor = 'data-backgroundcolor="'.concat(1 === exportItems.backgroundColors.length ? exportItems.backgroundColors[0] : "", '" ');
    var getVOffset = item => {
        var align = options.verticalAlignment;
        var dy = exportItems.rowHeights[item.r] - item.height;
        return exportItems.rowOffsets[item.r] + ("bottom" === align ? dy : "center" === align ? dy / 2 : 0)
    };
    var getHOffset = item => {
        if (compactView) {
            return item.hOffset
        }
        var align = options.horizontalAlignment;
        var colWidth = exportItems.itemWidth;
        var dx = colWidth - item.width;
        return item.c * colWidth + ("right" === align ? dx : "center" === align ? dx / 2 : 0)
    };
    var totalHeight = exportItems.totalHeight;
    var totalWidth = exportItems.totalWidth;
    return {
        markup: "<svg " + backgroundColor + 'height="' + totalHeight + '" width="' + totalWidth + '" version="1.1" xmlns="http://www.w3.org/2000/svg">' + exportItems.items.map(item => '<g transform="translate('.concat(getHOffset(item), ",").concat(getVOffset(item), ')">').concat(item.markup, "</g>")).join("") + "</svg>",
        width: totalWidth,
        height: totalHeight
    }
};
var ExportMenu = function(params) {
    var renderer = this._renderer = params.renderer;
    this._incidentOccurred = params.incidentOccurred;
    this._exportTo = params.exportTo;
    this._print = params.print;
    this._shadow = renderer.shadowFilter("-50%", "-50%", "200%", "200%", SHADOW_OFFSET, 6, SHADOW_BLUR);
    this._shadow.attr({
        opacity: .8
    });
    this._group = renderer.g().attr({
        class: EXPORT_CSS_CLASS,
        [_core_utils_svg__WEBPACK_IMPORTED_MODULE_3__["HIDDEN_FOR_EXPORT"]]: true
    }).linkOn(renderer.root, {
        name: "export-menu",
        after: "peripheral"
    });
    this._buttonGroup = renderer.g().attr({
        class: EXPORT_CSS_CLASS + "-button"
    }).append(this._group);
    this._listGroup = renderer.g().attr({
        class: EXPORT_CSS_CLASS + "-list"
    }).append(this._group);
    this._overlay = renderer.rect(-LIST_WIDTH + BUTTON_SIZE, BUTTON_SIZE + LIST_PADDING_TOP, LIST_WIDTH, 0);
    this._overlay.attr({
        "stroke-width": LIST_STROKE_WIDTH,
        cursor: "pointer",
        rx: 4,
        ry: 4,
        filter: this._shadow.id
    });
    this._overlay.data({
        "export-element-type": "list"
    });
    this.validFormats = getValidFormats();
    this._subscribeEvents()
};
Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(ExportMenu.prototype, {
    getLayoutOptions() {
        if (this._hiddenDueToLayout) {
            return {
                width: 0,
                height: 0,
                cutSide: "vertical",
                cutLayoutSide: "top"
            }
        }
        var bBox = this._buttonGroup.getBBox();
        bBox.cutSide = "vertical";
        bBox.cutLayoutSide = "top";
        bBox.height += MARGIN;
        bBox.position = {
            vertical: "top",
            horizontal: "right"
        };
        bBox.verticalAlignment = "top";
        bBox.horizontalAlignment = "right";
        return bBox
    },
    shift(_, y) {
        this._group.attr({
            translateY: this._group.attr("translateY") + y
        })
    },
    draw(width, height, canvas) {
        this._group.move(width - BUTTON_SIZE - SHADOW_OFFSET - SHADOW_BLUR + canvas.left, Math.floor(height / 2 - BUTTON_SIZE / 2));
        var layoutOptions = this.getLayoutOptions();
        if (layoutOptions.width > width || layoutOptions.height > height) {
            this.freeSpace()
        }
        return this
    },
    show() {
        this._group.linkAppend()
    },
    hide() {
        this._group.linkRemove()
    },
    setOptions(options) {
        this._options = options;
        if (options.formats) {
            options.formats = options.formats.reduce((r, format) => {
                format = validateFormat(format, this._incidentOccurred, this.validFormats);
                format && r.push(format);
                return r
            }, [])
        } else {
            options.formats = this.validFormats.supported.slice()
        }
        options.printingEnabled = void 0 === options.printingEnabled ? true : options.printingEnabled;
        if (options.enabled && (options.formats.length || options.printingEnabled)) {
            this.show();
            this._updateButton();
            this._updateList();
            this._hideList()
        } else {
            this.hide()
        }
    },
    dispose() {
        this._unsubscribeEvents();
        this._group.linkRemove().linkOff();
        this._group.dispose();
        this._shadow.dispose()
    },
    layoutOptions() {
        return this._options.enabled && {
            horizontalAlignment: "right",
            verticalAlignment: "top",
            weak: true
        }
    },
    measure() {
        this._fillSpace();
        var margin = this._options.button.margin;
        return [BUTTON_SIZE + margin.left + margin.right, BUTTON_SIZE + margin.top + margin.bottom]
    },
    move(rect) {
        var margin = this._options.button.margin;
        this._group.attr({
            translateX: Math.round(rect[0]) + margin.left,
            translateY: Math.round(rect[1]) + margin.top
        })
    },
    _fillSpace() {
        this._hiddenDueToLayout = false;
        this.show()
    },
    freeSpace() {
        this._incidentOccurred("W2107");
        this._hiddenDueToLayout = true;
        this.hide()
    },
    _hideList() {
        this._listGroup.remove();
        this._listShown = false;
        this._setButtonState("default");
        this._menuItems.forEach(item => item.resetState())
    },
    _showList() {
        this._listGroup.append(this._group);
        this._listShown = true;
        this._menuItems.forEach(item => item.fixPosition())
    },
    _setButtonState(state) {
        var style = this._options.button[state];
        this._button.attr({
            stroke: style.borderColor,
            fill: style.backgroundColor
        });
        this._icon.attr({
            fill: style.color
        })
    },
    _subscribeEvents() {
        this._renderer.root.on(_events_pointer__WEBPACK_IMPORTED_MODULE_9__["default"].up + ".export", e => {
            var elementType = e.target[EXPORT_DATA_KEY];
            if (!elementType) {
                if (this._button) {
                    this._hideList()
                }
                return
            }
            if ("button" === elementType) {
                if (this._listShown) {
                    this._setButtonState("default");
                    this._hideList()
                } else {
                    this._setButtonState("focus");
                    this._showList()
                }
            } else if ("printing" === elementType) {
                this._print();
                this._hideList()
            } else if ("exporting" === elementType) {
                this._exportTo(e.target[FORMAT_DATA_KEY]);
                this._hideList()
            }
        });
        this._listGroup.on(pointerActions, e => e.stopPropagation());
        this._buttonGroup.on(_events_pointer__WEBPACK_IMPORTED_MODULE_9__["default"].enter, () => this._setButtonState("hover"));
        this._buttonGroup.on(_events_pointer__WEBPACK_IMPORTED_MODULE_9__["default"].leave, () => this._setButtonState(this._listShown ? "focus" : "default"));
        this._buttonGroup.on(_events_pointer__WEBPACK_IMPORTED_MODULE_9__["default"].down + ".export", () => this._setButtonState("active"))
    },
    _unsubscribeEvents() {
        this._renderer.root.off(".export");
        this._listGroup.off();
        this._buttonGroup.off()
    },
    _updateButton() {
        var renderer = this._renderer;
        var options = this._options;
        var exportData = {
            "export-element-type": "button"
        };
        if (!this._button) {
            this._button = renderer.rect(0, 0, BUTTON_SIZE, BUTTON_SIZE).append(this._buttonGroup);
            this._button.attr({
                rx: 4,
                ry: 4,
                fill: options.button.default.backgroundColor,
                stroke: options.button.default.borderColor,
                "stroke-width": 1,
                cursor: "pointer"
            });
            this._button.data(exportData);
            this._icon = renderer.path(ICON_COORDS).append(this._buttonGroup);
            this._icon.attr({
                fill: options.button.default.color,
                cursor: "pointer"
            });
            this._icon.data(exportData);
            this._buttonGroup.setTitle(_localization_message__WEBPACK_IMPORTED_MODULE_5__["default"].format("vizExport-titleMenuText"))
        }
    },
    _updateList() {
        var options = this._options;
        var buttonDefault = options.button.default;
        var listGroup = this._listGroup;
        var items = createMenuItems(this._renderer, options);
        this._shadow.attr({
            color: options.shadowColor
        });
        this._overlay.attr({
            height: items.length * MENU_ITEM_HEIGHT + 2 * LIST_STROKE_WIDTH,
            fill: buttonDefault.backgroundColor,
            stroke: buttonDefault.borderColor
        });
        listGroup.clear();
        this._overlay.append(listGroup);
        items.forEach(item => item.g.append(listGroup));
        this._menuItems = items
    }
});

function getExportOptions(widget, exportOptions, fileName, format) {
    if (format || exportOptions.format) {
        format = validateFormat(format || exportOptions.format, widget._incidentOccurred)
    }
    var {
        width: width,
        height: height
    } = widget.getSize();
    return {
        format: format || DEFAULT_EXPORT_FORMAT,
        fileName: fileName || exportOptions.fileName || "file",
        proxyUrl: exportOptions.proxyUrl,
        backgroundColor: exportOptions.backgroundColor,
        width: width,
        height: height,
        margin: exportOptions.margin,
        svgToCanvas: exportOptions.svgToCanvas,
        forceProxy: exportOptions.forceProxy,
        exportingAction: widget._createActionByOption("onExporting", {
            excludeValidators: ["disabled"]
        }),
        exportedAction: widget._createActionByOption("onExported", {
            excludeValidators: ["disabled"]
        }),
        fileSavingAction: widget._createActionByOption("onFileSaving", {
            excludeValidators: ["disabled"]
        })
    }
}
var plugin = {
    name: "export",
    init() {
        this._exportMenu = new ExportMenu({
            renderer: this._renderer,
            incidentOccurred: this._incidentOccurred,
            print: () => this.print(),
            exportTo: format => this.exportTo(void 0, format)
        });
        this._layout.add(this._exportMenu)
    },
    dispose() {
        this._exportMenu.dispose()
    },
    members: {
        _getExportMenuOptions() {
            return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({}, this._getOption("export"), {
                rtl: this._getOption("rtlEnabled", true)
            })
        },
        _disablePointerEvents() {
            var pointerEventsValue = this._renderer.root.attr("pointer-events");
            this._renderer.root.attr({
                "pointer-events": "none"
            });
            return pointerEventsValue
        },
        exportTo(fileName, format) {
            var menu = this._exportMenu;
            var options = getExportOptions(this, this._getOption("export") || {}, fileName, format);
            menu && menu.hide();
            var pointerEventsValue = this._disablePointerEvents();
            var promise = Object(_exporter__WEBPACK_IMPORTED_MODULE_4__["export"])(this._renderer.root.element, options, getCreatorFunc(options.format)).fail(_core_utils_console__WEBPACK_IMPORTED_MODULE_10__["logger"].error).always(() => {
                this._renderer.root.attr({
                    "pointer-events": pointerEventsValue
                })
            });
            menu && menu.show();
            return promise
        },
        print() {
            var menu = this._exportMenu;
            var options = getExportOptions(this, this._getOption("export") || {});
            options.exportingAction = null;
            options.exportedAction = null;
            options.margin = 0;
            options.format = "PNG";
            options.forceProxy = true;
            options.fileSavingAction = eventArgs => {
                print("data:image/png;base64,".concat(eventArgs.data), {
                    width: options.width,
                    __test: options.__test
                });
                eventArgs.cancel = true
            };
            var pointerEventsValue = this._disablePointerEvents();
            menu && menu.hide();
            var promise = Object(_exporter__WEBPACK_IMPORTED_MODULE_4__["export"])(this._renderer.root.element, options, getCreatorFunc(options.format)).fail(_core_utils_console__WEBPACK_IMPORTED_MODULE_10__["logger"].error).always(() => {
                this._renderer.root.attr({
                    "pointer-events": pointerEventsValue
                })
            });
            menu && menu.show();
            return promise
        }
    },
    customize(constructor) {
        var proto = constructor.prototype;
        constructor.addChange({
            code: "EXPORT",
            handler() {
                this._exportMenu.setOptions(this._getExportMenuOptions());
                this._change(["LAYOUT"])
            },
            isThemeDependent: true,
            isOptionChange: true,
            option: "export"
        });
        proto._optionChangesMap.onExporting = "EXPORT";
        proto._optionChangesMap.onExported = "EXPORT";
        proto._optionChangesMap.onFileSaving = "EXPORT"
    },
    fontFields: ["export.font"]
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/helpers.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/helpers.js ***!
  \*********************************************************/
/*! exports provided: expand, replaceInherit, changes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expand", function() { return expand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceInherit", function() { return replaceInherit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changes", function() { return changes; });
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/viz/core/helpers.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var isServerSide = !Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_1__["hasWindow"])();

function Flags() {
    this.reset()
}
Flags.prototype = {
    constructor: Flags,
    add: function(codes) {
        var i;
        var ii = codes.length;
        var flags = this._flags;
        for (i = 0; i < ii; ++i) {
            flags[codes[i]] = 1
        }
    },
    has: function(code) {
        return this._flags[code] > 0
    },
    count: function() {
        return Object.keys(this._flags).length
    },
    reset: function() {
        this._flags = {}
    }
};

function combineMaps(baseMap, thisMap) {
    return baseMap !== thisMap ? Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({}, baseMap, thisMap) : Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({}, baseMap)
}

function combineLists(baseList, thisList) {
    return baseList !== thisList ? baseList.concat(thisList) : baseList.slice()
}

function buildTotalChanges(proto) {
    proto._totalChangesOrder = proto._optionChangesOrder.concat(proto._layoutChangesOrder, proto._customChangesOrder)
}

function addChange(settings) {
    var proto = this.prototype;
    var code = settings.code;
    proto["_change_" + code] = settings.handler;
    if (settings.isThemeDependent) {
        proto._themeDependentChanges.push(code)
    }
    if (settings.option) {
        proto._optionChangesMap[settings.option] = code
    }(settings.isOptionChange ? proto._optionChangesOrder : proto._customChangesOrder).push(code);
    buildTotalChanges(proto)
}

function createChainExecutor() {
    var executeChain = function executeChain() {
        var i;
        var ii = executeChain._chain.length;
        var result;
        for (i = 0; i < ii; ++i) {
            result = executeChain._chain[i].apply(this, arguments)
        }
        return result
    };
    executeChain._chain = [];
    executeChain.add = function(item) {
        executeChain._chain.push(item)
    };
    executeChain.copy = function(executor) {
        executeChain._chain = executor._chain.slice()
    };
    return executeChain
}
function expand(target, name, expander) {
    var current = target[name];
    if (!current) {
        current = expander
    } else if (!current.add) {
        current = createChainExecutor();
        current.add(target[name]);
        current.add(expander)
    } else {
        if (false === Object.prototype.hasOwnProperty.call(target, name)) {
            current = createChainExecutor();
            current.copy(target[name])
        }
        current.add(expander)
    }
    target[name] = current
}

function addPlugin(plugin) {
    var proto = this.prototype;
    proto._plugins.push(plugin);
    plugin.fontFields && proto._fontFields.push.apply(proto._fontFields, plugin.fontFields);
    if (plugin.members) {
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(this.prototype, plugin.members)
    }
    if (plugin.customize) {
        plugin.customize(this)
    }
    if (plugin.extenders) {
        Object.keys(plugin.extenders).forEach((function(key) {
            var func = plugin.extenders[key];
            expand(proto, key, func)
        }), this)
    }
}
var replaceInherit = isServerSide ? function(widget) {
    var _inherit = widget.inherit;
    widget.inherit = function() {
        var result = _inherit.apply(this, arguments);
        var proto = result.prototype;
        ["_plugins", "_eventsMap", "_initialChanges", "_themeDependentChanges", "_optionChangesMap", "_optionChangesOrder", "_layoutChangesOrder", "_customChangesOrder", "_totalChangesOrder"].forEach((function(key) {
            proto[key] = {}
        }));
        result.addPlugin = _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"];
        return result
    };
    widget.addChange = _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"];
    widget.addPlugin = _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"]
} : function(widget) {
    var _inherit = widget.inherit;
    widget.inherit = function() {
        var proto = this.prototype;
        var plugins = proto._plugins;
        var fontFields = proto._fontFields;
        var eventsMap = proto._eventsMap;
        var initialChanges = proto._initialChanges;
        var themeDependentChanges = proto._themeDependentChanges;
        var optionChangesMap = proto._optionChangesMap;
        var partialOptionChangesMap = proto._partialOptionChangesMap;
        var partialOptionChangesPath = proto._partialOptionChangesPath;
        var optionChangesOrder = proto._optionChangesOrder;
        var layoutChangesOrder = proto._layoutChangesOrder;
        var customChangesOrder = proto._customChangesOrder;
        var result = _inherit.apply(this, arguments);
        proto = result.prototype;
        proto._plugins = combineLists(plugins, proto._plugins);
        proto._fontFields = combineLists(fontFields, proto._fontFields);
        proto._eventsMap = combineMaps(eventsMap, proto._eventsMap);
        proto._initialChanges = combineLists(initialChanges, proto._initialChanges);
        proto._themeDependentChanges = combineLists(themeDependentChanges, proto._themeDependentChanges);
        proto._optionChangesMap = combineMaps(optionChangesMap, proto._optionChangesMap);
        proto._partialOptionChangesMap = combineMaps(partialOptionChangesMap, proto._partialOptionChangesMap);
        proto._partialOptionChangesPath = combineMaps(partialOptionChangesPath, proto._partialOptionChangesPath);
        proto._optionChangesOrder = combineLists(optionChangesOrder, proto._optionChangesOrder);
        proto._layoutChangesOrder = combineLists(layoutChangesOrder, proto._layoutChangesOrder);
        proto._customChangesOrder = combineLists(customChangesOrder, proto._customChangesOrder);
        buildTotalChanges(proto);
        result.addPlugin = addPlugin;
        return result
    };
    widget.prototype._plugins = [];
    widget.prototype._fontFields = [];
    widget.addChange = addChange;
    widget.addPlugin = addPlugin
};
function changes() {
    return new Flags
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/layout.js":
/*!********************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/layout.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/**
 * DevExtreme (esm/viz/core/layout.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var _min = Math.min;
var _max = Math.max;
var _round = Math.round;
var ALIGN_START = 0;
var ALIGN_MIDDLE = 1;
var ALIGN_END = 2;
var horizontalAlignmentMap = {
    left: ALIGN_START,
    center: ALIGN_MIDDLE,
    right: ALIGN_END
};
var verticalAlignmentMap = {
    top: ALIGN_START,
    center: ALIGN_MIDDLE,
    bottom: ALIGN_END
};
var sideMap = {
    horizontal: 0,
    vertical: 1
};
var slicersMap = {};
var BBOX_CEIL_CORRECTION = 2;
slicersMap[ALIGN_START] = function(a, b, size) {
    return [a, _min(b, a + size)]
};
slicersMap[ALIGN_MIDDLE] = function(a, b, size) {
    return [_max(a, (a + b - size) / 2), _min(b, (a + b + size) / 2)]
};
slicersMap[ALIGN_END] = function(a, b, size) {
    return [_max(a, b - size), b]
};

function pickValue(value, map, defaultValue) {
    var val = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["normalizeEnum"])(value);
    return val in map ? map[val] : defaultValue
}

function normalizeLayoutOptions(options) {
    var side = pickValue(options.side, sideMap, 1);
    var alignment = [pickValue(options.horizontalAlignment, horizontalAlignmentMap, ALIGN_MIDDLE), pickValue(options.verticalAlignment, verticalAlignmentMap, ALIGN_START)];
    return {
        side: side,
        primary: bringToEdge(alignment[side]),
        secondary: alignment[1 - side],
        weak: options.weak,
        priority: options.priority || 0,
        header: options.header,
        position: options.position
    }
}

function bringToEdge(primary) {
    return primary < 2 ? 0 : 2
}

function getConjugateSide(side) {
    return 1 - side
}

function getSlice(alignment, a, b, size) {
    return slicersMap[alignment](a, b, size)
}

function getShrink(alignment, size) {
    return (alignment > 0 ? -1 : 1) * size
}

function processForward(item, rect, minSize) {
    var side = item.side;
    var size = item.element.measure([rect[2] - rect[0], rect[3] - rect[1]]);
    var minSide = "indside" === item.position ? 0 : minSize[side];
    var isValid = size[side] < rect[2 + side] - rect[side] - minSide;
    if (isValid) {
        if ("inside" !== item.position) {
            rect[item.primary + side] += getShrink(item.primary, size[side])
        }
        item.size = size
    }
    return isValid
}

function processRectBackward(item, rect, alignmentRect) {
    var primarySide = item.side;
    var secondarySide = getConjugateSide(primarySide);
    var itemRect = [];
    var secondary = getSlice(item.secondary, alignmentRect[secondarySide], alignmentRect[2 + secondarySide], item.size[secondarySide]);
    itemRect[primarySide] = _round(itemRect[2 + primarySide] = rect[item.primary + primarySide] + ("inside" === item.position ? getShrink(item.primary, item.size[primarySide]) : 0));
    itemRect[item.primary + primarySide] = _round(rect[item.primary + primarySide] - getShrink(item.primary, item.size[primarySide]));
    if ("inside" !== item.position) {
        rect[item.primary + primarySide] = itemRect[item.primary + primarySide]
    }
    itemRect[secondarySide] = _round(secondary[0]);
    itemRect[2 + secondarySide] = _round(secondary[1]);
    return itemRect
}

function processBackward(item, rect, alignmentRect, fitRect, size, targetRect) {
    var itemRect = processRectBackward(item, rect, alignmentRect);
    var itemFitRect = processRectBackward(item, fitRect, fitRect);
    if (size[item.side] > 0) {
        size[item.side] -= item.size[item.side];
        targetRect[item.primary + item.side] = itemRect[item.primary + item.side];
        item.element.freeSpace()
    } else {
        item.element.move(itemRect, itemFitRect)
    }
}

function Layout() {
    this._targets = []
}
Layout.prototype = {
    constructor: Layout,
    dispose: function() {
        this._targets = null
    },
    add: function(target) {
        this._targets.push(target)
    },
    forward: function(targetRect, minSize) {
        var rect = targetRect.slice();
        var targets = createTargets(this._targets);
        var i;
        var ii = targets.length;
        var cache = [];
        for (i = 0; i < ii; ++i) {
            if (processForward(targets[i], rect, minSize)) {
                cache.push(targets[i])
            } else {
                targets[i].element.freeSpace()
            }
        }
        this._cache = cache.reverse();
        return rect
    },
    backward: function(targetRect, alignmentRect) {
        var size = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [0, 0];
        var backwardRect = targetRect.slice();
        var fitRect = targetRect.slice();
        var targets = this._cache;
        var targetSide = 0;
        var target;
        var i;
        var ii = targets.length;
        for (i = 0; i < ii; ++i) {
            target = targets[i];
            if (target.side !== targetSide) {
                backwardRect = targetRect.slice()
            }
            processBackward(target, backwardRect, alignmentRect, fitRect, size, targetRect);
            targetSide = target.side
        }
        return size
    }
};

function createTargets(targets) {
    var i;
    var ii = targets.length;
    var collection = [];
    var layout;
    for (i = 0; i < ii; ++i) {
        layout = targets[i].layoutOptions();
        if (layout) {
            layout = normalizeLayoutOptions(layout);
            layout.element = targets[i];
            collection.push(layout)
        }
    }
    collection.sort((function(a, b) {
        return b.side - a.side || a.priority - b.priority
    }));
    collection = processWeakItems(collection);
    return collection
}

function processWeakItems(collection) {
    var weakItem = collection.filter((function(item) {
        return true === item.weak
    }))[0];
    var headerItem;
    if (weakItem) {
        headerItem = collection.filter((function(item) {
            return weakItem.primary === item.primary && item.side === weakItem.side && item !== weakItem
        }))[0]
    }
    if (weakItem && headerItem) {
        return [makeHeader(headerItem, weakItem)].concat(collection.filter((function(item) {
            return !(item === headerItem || item === weakItem)
        })))
    }
    return collection
}

function processBackwardHeaderRect(element, rect) {
    var rectCopy = rect.slice();
    var itemRect = processRectBackward(element, rectCopy, rectCopy);
    itemRect[element.side] = rect[element.side];
    itemRect[2 + element.side] = rect[2 + element.side];
    return itemRect
}

function makeHeader(header, weakElement) {
    var side = header.side;
    var primary = header.primary;
    var secondary = header.secondary;
    return {
        side: side,
        primary: primary,
        secondary: secondary,
        priority: 0,
        element: {
            measure: function(targetSize) {
                var result = targetSize.slice();
                var weakSize = weakElement.element.measure(targetSize.slice());
                targetSize[primary] -= weakSize[primary];
                var headerSize = header.element.measure(targetSize.slice());
                result[side] = weakSize[side] = headerSize[side] = Math.max(headerSize[side], weakSize[side]);
                weakElement.size = weakSize;
                header.size = headerSize;
                return result
            },
            move: function(rect, fitRect) {
                if (fitRect[2] - fitRect[0] < header.size[0] + weakElement.size[0] - BBOX_CEIL_CORRECTION) {
                    this.freeSpace();
                    return
                }
                var weakRect = processBackwardHeaderRect(weakElement, fitRect);
                fitRect[2 + weakElement.primary] = weakRect[weakElement.primary];
                var headerFitReact = processBackwardHeaderRect(header, fitRect);
                if (fitRect[2 + weakElement.primary] < rect[2 + weakElement.primary] && header.size[header.primary] > rect[2 + header.primary] - rect[header.primary]) {
                    rect[2 + weakElement.primary] = fitRect[2 + weakElement.primary]
                }
                var headerRect = processBackwardHeaderRect(header, rect);
                if (headerRect[2 + weakElement.primary] > fitRect[2 + weakElement.primary]) {
                    rect[2 + weakElement.primary] = fitRect[2 + weakElement.primary];
                    headerRect = processBackwardHeaderRect(header, rect)
                }
                weakElement.element.move(weakRect);
                header.element.move(headerRect, headerFitReact)
            },
            freeSpace: function() {
                header.element.freeSpace();
                weakElement.element.freeSpace()
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Layout);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/layout_element.js":
/*!****************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/layout_element.js ***!
  \****************************************************************/
/*! exports provided: LayoutElement, WrapperLayoutElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutElement", function() { return LayoutElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WrapperLayoutElement", function() { return WrapperLayoutElement; });
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/object */ "./node_modules/devextreme/esm/core/utils/object.js");
/**
 * DevExtreme (esm/viz/core/layout_element.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var _round = Math.round;

var defaultOffset = {
    horizontal: 0,
    vertical: 0
};
var alignFactors = {
    center: .5,
    right: 1,
    bottom: 1,
    left: 0,
    top: 0
};

function LayoutElement(options) {
    this._options = options
}
LayoutElement.prototype = {
    constructor: LayoutElement,
    position: function(options) {
        var ofBBox = options.of.getLayoutOptions();
        var myBBox = this.getLayoutOptions();
        var at = options.at;
        var my = options.my;
        var offset = options.offset || defaultOffset;
        var shiftX = -alignFactors[my.horizontal] * myBBox.width + ofBBox.x + alignFactors[at.horizontal] * ofBBox.width + parseInt(offset.horizontal);
        var shiftY = -alignFactors[my.vertical] * myBBox.height + ofBBox.y + alignFactors[at.vertical] * ofBBox.height + parseInt(offset.vertical);
        this.shift(_round(shiftX), _round(shiftY))
    },
    getLayoutOptions: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"]
};

function WrapperLayoutElement(renderElement, bBox) {
    this._renderElement = renderElement;
    this._cacheBBox = bBox
}
var wrapperLayoutElementPrototype = WrapperLayoutElement.prototype = Object(_core_utils_object__WEBPACK_IMPORTED_MODULE_1__["clone"])(LayoutElement.prototype);
wrapperLayoutElementPrototype.constructor = WrapperLayoutElement;
wrapperLayoutElementPrototype.getLayoutOptions = function() {
    return this._cacheBBox || this._renderElement.getBBox()
};
wrapperLayoutElementPrototype.shift = function(shiftX, shiftY) {
    var bBox = this.getLayoutOptions();
    this._renderElement.move(_round(shiftX - bBox.x), _round(shiftY - bBox.y))
};



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/loading_indicator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/loading_indicator.js ***!
  \*******************************************************************/
/*! exports provided: LoadingIndicator, plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingIndicator", function() { return LoadingIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/**
 * DevExtreme (esm/viz/core/loading_indicator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var STATE_HIDDEN = 0;
var STATE_SHOWN = 1;
var ANIMATION_EASING = "linear";
var ANIMATION_DURATION = 400;
var LOADING_INDICATOR_READY = "loadingIndicatorReady";
var LoadingIndicator = function(parameters) {
    var renderer = parameters.renderer;
    this._group = renderer.g().attr({
        class: "dx-loading-indicator"
    }).linkOn(renderer.root, {
        name: "loading-indicator",
        after: "peripheral"
    });
    this._rect = renderer.rect().attr({
        opacity: 0
    }).append(this._group);
    this._text = renderer.text().attr({
        align: "center"
    }).append(this._group);
    this._createStates(parameters.eventTrigger, this._group, renderer.root, parameters.notify)
};
LoadingIndicator.prototype = {
    constructor: LoadingIndicator,
    _createStates: function(eventTrigger, group, root, notify) {
        this._states = [{
            opacity: 0,
            start: function() {
                notify(false)
            },
            complete: function() {
                group.linkRemove();
                root.css({
                    "pointer-events": ""
                });
                eventTrigger(LOADING_INDICATOR_READY)
            }
        }, {
            opacity: .85,
            start: function() {
                group.linkAppend();
                root.css({
                    "pointer-events": "none"
                });
                notify(true)
            },
            complete: function() {
                eventTrigger(LOADING_INDICATOR_READY)
            }
        }];
        this._state = STATE_HIDDEN
    },
    setSize: function(size) {
        var width = size.width;
        var height = size.height;
        this._rect.attr({
            width: width,
            height: height
        });
        this._text.attr({
            x: width / 2,
            y: height / 2
        })
    },
    setOptions: function(options) {
        this._rect.attr({
            fill: options.backgroundColor
        });
        this._text.css(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["patchFontOptions"])(options.font)).attr({
            text: options.text,
            class: options.cssClass
        });
        this[options.show ? "show" : "hide"]()
    },
    dispose: function() {
        this._group.linkRemove().linkOff();
        this._group = this._rect = this._text = this._states = null
    },
    _transit: function(stateId) {
        var state;
        if (this._state !== stateId) {
            this._state = stateId;
            this._isHiding = false;
            state = this._states[stateId];
            this._rect.stopAnimation().animate({
                opacity: state.opacity
            }, {
                complete: state.complete,
                easing: ANIMATION_EASING,
                duration: ANIMATION_DURATION,
                unstoppable: true
            });
            this._noHiding = true;
            state.start();
            this._noHiding = false
        }
    },
    show: function() {
        this._transit(STATE_SHOWN)
    },
    hide: function() {
        this._transit(STATE_HIDDEN)
    },
    scheduleHiding: function() {
        if (!this._noHiding) {
            this._isHiding = true
        }
    },
    fulfillHiding: function() {
        if (this._isHiding) {
            this.hide()
        }
    }
};
var plugin = {
    name: "loading_indicator",
    init: function() {
        var that = this;
        that._loadingIndicator = new LoadingIndicator({
            eventTrigger: that._eventTrigger,
            renderer: that._renderer,
            notify: function(state) {
                that._skipLoadingIndicatorOptions = true;
                that.option("loadingIndicator", {
                    show: state
                });
                that._skipLoadingIndicatorOptions = false;
                if (state) {
                    that._stopCurrentHandling()
                }
            }
        });
        that._scheduleLoadingIndicatorHiding()
    },
    dispose: function() {
        this._loadingIndicator.dispose();
        this._loadingIndicator = null
    },
    members: {
        _scheduleLoadingIndicatorHiding: function() {
            this._loadingIndicator.scheduleHiding()
        },
        _fulfillLoadingIndicatorHiding: function() {
            this._loadingIndicator.fulfillHiding()
        },
        showLoadingIndicator: function() {
            this._loadingIndicator.show()
        },
        hideLoadingIndicator: function() {
            this._loadingIndicator.hide()
        },
        _onBeginUpdate: function() {
            if (!this._optionChangedLocker) {
                this._scheduleLoadingIndicatorHiding()
            }
        }
    },
    extenders: {
        _dataSourceLoadingChangedHandler(isLoading) {
            if (isLoading && (this._options.silent("loadingIndicator") || {}).enabled) {
                this._loadingIndicator.show()
            }
        },
        _setContentSize() {
            this._loadingIndicator.setSize(this._canvas)
        },
        endUpdate() {
            if (this._initialized && this._dataIsReady()) {
                this._fulfillLoadingIndicatorHiding()
            }
        }
    },
    customize: function(constructor) {
        var proto = constructor.prototype;
        if (proto._dataSourceChangedHandler) {
            var _dataSourceChangedHandler = proto._dataSourceChangedHandler;
            proto._dataSourceChangedHandler = function() {
                this._scheduleLoadingIndicatorHiding();
                _dataSourceChangedHandler.apply(this, arguments)
            }
        }
        constructor.addChange({
            code: "LOADING_INDICATOR",
            handler: function() {
                if (!this._skipLoadingIndicatorOptions) {
                    this._loadingIndicator.setOptions(this._getOption("loadingIndicator"))
                }
                this._scheduleLoadingIndicatorHiding()
            },
            isThemeDependent: true,
            option: "loadingIndicator",
            isOptionChange: true
        });
        proto._eventsMap.onLoadingIndicatorReady = {
            name: "loadingIndicatorReady"
        };
        var _drawn = proto._drawn;
        proto._drawn = function() {
            _drawn.apply(this, arguments);
            if (this._dataIsReady()) {
                this._fulfillLoadingIndicatorHiding()
            }
        }
    },
    fontFields: ["loadingIndicator.font"]
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/plaque.js":
/*!********************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/plaque.js ***!
  \********************************************************/
/*! exports provided: Plaque */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plaque", function() { return Plaque; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/viz/core/plaque.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _excluded = ["x", "y", "canvas", "offsetX", "offsetY", "offset"];


var math = Math;
var round = math.round;
var max = math.max;
var min = math.min;
var sin = math.sin;
var cos = math.cos;
var asin = math.asin;
var PI = math.PI;
var buildPath = function() {
    for (var _len = arguments.length, points = new Array(_len), _key = 0; _key < _len; _key++) {
        points[_key] = arguments[_key]
    }
    return points.join("")
};

function getArc(cornerRadius, xDirection, yDirection) {
    return "a ".concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(xDirection * cornerRadius, " ").concat(yDirection * cornerRadius)
}

function getAbsoluteArc(cornerRadius, x, y) {
    return "A ".concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(x, " ").concat(y)
}

function rotateX(x, y, angle, x0, y0) {
    return (x - x0) * round(cos(angle)) + (y - y0) * round(sin(angle)) + x0
}

function rotateY(x, y, angle, x0, y0) {
    return -(x - x0) * round(sin(angle)) + (y - y0) * round(cos(angle)) + y0
}

function rotateSize(options, angle) {
    if (angle % 90 === 0 && angle % 180 !== 0) {
        return {
            width: options.height,
            height: options.width
        }
    }
    return options
}

function getCloudAngle(_ref, x, y, anchorX, anchorY) {
    var {
        width: width,
        height: height
    } = _ref;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var xr = Math.ceil(x + halfWidth);
    var xl = Math.floor(x - halfWidth);
    var yt = Math.floor(y - halfHeight);
    var yb = Math.ceil(y + halfHeight);
    if (anchorX < xl && anchorY < yt || anchorX >= xl && anchorX <= xr && anchorY < yt) {
        return 270
    }
    if (anchorX > xr && anchorY > yb || anchorX >= xl && anchorX <= xr && anchorY > yb) {
        return 90
    } else if (anchorX < xl && anchorY > yb || anchorX < xl && anchorY >= yt && anchorY <= yb) {
        return 180
    }
    return 0
}

function getCloudPoints(_ref2, x, y, anchorX, anchorY, _ref3, bounded) {
    var {
        width: width,
        height: height
    } = _ref2;
    var {
        arrowWidth: arrowWidth,
        cornerRadius: cornerRadius = 0
    } = _ref3;
    var halfArrowWidth = arrowWidth / 2;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var xr = Math.ceil(x + halfWidth);
    var xl = Math.floor(x - halfWidth);
    var yt = Math.floor(y - halfHeight);
    var yb = Math.ceil(y + halfHeight);
    var leftTopCorner = [xl, yt];
    var rightTopCorner = [xr, yt];
    var rightBottomCorner = [xr, yb];
    var leftBottomCorner = [xl, yb];
    var arrowX = anchorX <= xl ? xl : xr <= anchorX ? xr : anchorX;
    var arrowY = anchorY <= yt ? yt : yb <= anchorY ? yb : anchorY;
    var arrowBaseBottom = min(arrowY + halfArrowWidth, yb);
    var arrowBaseTop = max(arrowY - halfArrowWidth, yt);
    var arrowBaseLeft = max(arrowX - halfArrowWidth, xl);
    cornerRadius = Math.min(width / 2, height / 2, cornerRadius);
    var points;
    leftTopCorner[1] += cornerRadius;
    rightTopCorner[0] -= cornerRadius;
    rightBottomCorner[1] -= cornerRadius;
    leftBottomCorner[0] += cornerRadius;
    if (!bounded || xl <= anchorX && anchorX <= xr && yt <= anchorY && anchorY <= yb) {
        points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), "L", rightTopCorner, getArc(cornerRadius, 1, 1), "L", rightBottomCorner, getArc(cornerRadius, -1, 1), "L", leftBottomCorner, getArc(cornerRadius, -1, -1))
    } else if (anchorX > xr && anchorY < yt) {
        var arrowAngle = arrowWidth / cornerRadius || 0;
        var angle = PI / 4 + arrowAngle / 2;
        var endAngle = PI / 4 - arrowAngle / 2;
        var arrowEndPointX = rightTopCorner[0] + cos(endAngle) * cornerRadius;
        var arrowEndPointY = rightTopCorner[1] + (1 - sin(endAngle)) * cornerRadius;
        var arrowArc = buildPath("L", rightTopCorner, getArc(cornerRadius, cos(angle), 1 - sin(angle)), "L", [anchorX, anchorY, arrowEndPointX, arrowEndPointY], getAbsoluteArc(cornerRadius, rightTopCorner[0] + cornerRadius, rightTopCorner[1] + cornerRadius));
        if (Math.abs(angle) > PI / 2) {
            arrowArc = buildPath("L", [arrowBaseLeft, yt, anchorX, anchorY, xr, arrowBaseBottom])
        }
        points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), arrowArc, "L", rightBottomCorner, getArc(cornerRadius, -1, 1), "L", leftBottomCorner, getArc(cornerRadius, -1, -1))
    } else if (anchorX > xr && anchorY >= yt && anchorY <= yb) {
        var _arrowArc;
        if (arrowBaseTop >= rightTopCorner[1] + cornerRadius && arrowBaseBottom <= rightBottomCorner[1]) {
            _arrowArc = buildPath(getArc(cornerRadius, 1, 1), "L", [xr, arrowBaseTop, anchorX, anchorY, xr, arrowBaseBottom], "L", rightBottomCorner, getArc(cornerRadius, -1, 1))
        } else if (arrowBaseTop < rightTopCorner[1] + cornerRadius && arrowBaseBottom >= rightTopCorner[1] + cornerRadius && arrowBaseBottom <= rightBottomCorner[1]) {
            var arrowWidthRest = rightTopCorner[1] + cornerRadius - arrowBaseTop;
            var _angle = arrowWidthRest / cornerRadius;
            var arrowBaseTopX = rightTopCorner[0] + cos(_angle) * cornerRadius;
            var arrowBaseTopY = rightTopCorner[1] + (1 - sin(_angle)) * cornerRadius;
            _arrowArc = buildPath(getArc(cornerRadius, cos(_angle), 1 - sin(_angle)), "L", [arrowBaseTopX, arrowBaseTopY, anchorX, anchorY, xr, arrowBaseBottom], "L", rightBottomCorner, getArc(cornerRadius, -1, 1))
        } else if (arrowBaseTop < rightTopCorner[1] + cornerRadius && arrowBaseBottom < rightTopCorner[1] + cornerRadius) {
            var _arrowWidthRest = rightTopCorner[1] + cornerRadius - arrowBaseTop;
            var _arrowAngle = _arrowWidthRest / cornerRadius;
            var _angle2 = _arrowAngle;
            var _arrowBaseTopX = rightTopCorner[0] + cos(_angle2) * cornerRadius;
            var _arrowBaseTopY = rightTopCorner[1] + (1 - sin(_angle2)) * cornerRadius;
            var bottomAngle = Math.sin((rightTopCorner[1] + cornerRadius - arrowBaseBottom) / cornerRadius);
            var arrowBaseBottomX = rightTopCorner[0] + cornerRadius * cos(bottomAngle);
            var arrowBaseBottomY = rightTopCorner[1] + cornerRadius * (1 - sin(bottomAngle));
            _arrowArc = buildPath(getArc(cornerRadius, cos(_angle2), 1 - sin(_angle2)), "L", [_arrowBaseTopX, _arrowBaseTopY, anchorX, anchorY, arrowBaseBottomX, arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightTopCorner[0] + cornerRadius, rightTopCorner[1] + cornerRadius), "L", rightBottomCorner, getArc(cornerRadius, -1, 1))
        } else if (arrowBaseTop <= rightTopCorner[1] + cornerRadius && arrowBaseBottom >= rightBottomCorner[1]) {
            var topAngle = asin((rightTopCorner[1] + cornerRadius - arrowBaseTop) / cornerRadius);
            var _arrowBaseTopX2 = rightTopCorner[0] + cornerRadius * cos(topAngle);
            var _arrowBaseTopY2 = rightTopCorner[1] + cornerRadius * (1 - sin(topAngle));
            var _bottomAngle = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
            var _arrowBaseBottomX = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle) - 1);
            var _arrowBaseBottomY = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle);
            _arrowArc = buildPath(getArc(cornerRadius, cos(topAngle), 1 - sin(topAngle)), "L", [_arrowBaseTopX2, _arrowBaseTopY2, anchorX, anchorY, _arrowBaseBottomX, _arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius))
        } else if (arrowBaseTop > rightTopCorner[1] + cornerRadius && arrowBaseTop <= rightBottomCorner[1] && arrowBaseBottom > rightBottomCorner[1]) {
            var _bottomAngle2 = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
            var _arrowBaseBottomX2 = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle2) - 1);
            var _arrowBaseBottomY2 = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle2);
            _arrowArc = buildPath(getArc(cornerRadius, 1, 1), "L", [xr, arrowBaseTop, anchorX, anchorY, _arrowBaseBottomX2, _arrowBaseBottomY2], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius))
        } else if (arrowBaseTop > rightTopCorner[1] + cornerRadius && arrowBaseBottom > rightBottomCorner[1]) {
            var _bottomAngle3 = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
            var _arrowBaseBottomX3 = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle3) - 1);
            var _arrowBaseBottomY3 = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle3);
            var _topAngle = asin((arrowBaseTop - rightBottomCorner[1]) / cornerRadius);
            var _arrowBaseTopX3 = rightBottomCorner[0] + cornerRadius * (cos(_topAngle) - 1);
            var _arrowBaseTopY3 = rightBottomCorner[1] + cornerRadius * sin(_topAngle);
            _arrowArc = buildPath(getArc(cornerRadius, 1, 1), "L", rightBottomCorner, getArc(cornerRadius, cos(_topAngle) - 1, sin(_topAngle)), "L", [_arrowBaseTopX3, _arrowBaseTopY3, anchorX, anchorY, _arrowBaseBottomX3, _arrowBaseBottomY3], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius))
        }
        points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), "L", rightTopCorner, _arrowArc, "L", leftBottomCorner, getArc(cornerRadius, -1, -1))
    }
    return buildPath("M", points, "Z")
}
class Plaque {
    constructor(options, widget, root, contentTemplate) {
        var bounded = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : true;
        var measureContent = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : (_, g) => g.getBBox();
        var moveContentGroup = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : (_, g, x, y) => g.move(x, y);
        this.widget = widget;
        this.options = options;
        this.root = root;
        this.contentTemplate = contentTemplate;
        this.bonded = bounded;
        this.measureContent = measureContent;
        this.moveContentGroup = moveContentGroup
    }
    draw(_ref4) {
        var {
            x: anchorX,
            y: anchorY,
            canvas: canvas = {},
            offsetX: offsetX,
            offsetY: offsetY,
            offset: offset = 0
        } = _ref4, restProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref4, _excluded);
        var options = this.options;
        var {
            x: x,
            y: y
        } = options;
        var bounds_xl = canvas.left,
            bounds_xr = canvas.width - canvas.right,
            bounds_width = canvas.width - canvas.right - canvas.left,
            bounds_yt = canvas.top,
            bounds_yb = canvas.height - canvas.bottom,
            bounds_height = canvas.height - canvas.bottom - canvas.top;
        if (!(Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(anchorX) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(anchorY)) && !(Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(x) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(y))) {
            return false
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(anchorX) && (anchorX < bounds_xl || bounds_xr < anchorX || anchorY < bounds_yt || bounds_yb < anchorY)) {
            return false
        }
        if (!this._root) {
            this._draw()
        }
        var shadowSettings = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
        }, options.shadow);
        var contentWidth = options.width > 0 ? options.width : null;
        var contentHeight = options.height > 0 ? options.height : null;
        var onRender = () => {
            var _this$_root;
            var bBox = this._contentBBox = this.measureContent(this.widget, this._contentGroup);
            var size = this._size = {
                width: max(contentWidth, bBox.width) + 2 * options.paddingLeftRight,
                height: max(contentHeight, bBox.height) + 2 * options.paddingTopBottom,
                offset: offset
            };
            var xOff = shadowSettings.offsetX;
            var yOff = shadowSettings.offsetY;
            var blur = 2 * shadowSettings.blur + 1;
            var lm = max(blur - xOff, 0);
            var rm = max(blur + xOff, 0);
            var tm = max(blur - yOff, 0);
            var bm = max(blur + yOff, 0);
            this.margins = {
                lm: lm,
                rm: rm,
                tm: tm,
                bm: bm
            };
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(x)) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(offsetX)) {
                    x = anchorX + offsetX
                } else if (bounds_width < size.width) {
                    x = round(bounds_xl + bounds_width / 2)
                } else {
                    x = min(max(anchorX, Math.ceil(bounds_xl + size.width / 2 + lm)), Math.floor(bounds_xr - size.width / 2 - rm))
                }
            } else {
                x += offsetX || 0;
                if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(anchorX)) {
                    anchorX = x
                }
            }
            if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(y)) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(offsetY)) {
                    y = anchorY + offsetY
                } else {
                    var y_top = anchorY - options.arrowLength - size.height / 2 - offset;
                    var y_bottom = anchorY + options.arrowLength + size.height / 2 + offset;
                    if (bounds_height < size.height + options.arrowLength) {
                        y = round(bounds_yt + size.height / 2)
                    } else if (y_top - size.height / 2 - tm < bounds_yt) {
                        if (y_bottom + size.height / 2 + bm < bounds_yb) {
                            y = y_bottom;
                            anchorY += offset
                        } else {
                            y = round(bounds_yt + size.height / 2)
                        }
                    } else {
                        y = y_top;
                        anchorY -= offset
                    }
                }
            } else {
                y += offsetY || 0;
                if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(anchorY)) {
                    anchorY = y + size.height / 2
                }
            }
            this.anchorX = anchorX;
            this.anchorY = anchorY;
            this.move(x, y);
            null === (_this$_root = this._root) || void 0 === _this$_root ? void 0 : _this$_root.append(this.root)
        };
        if (this.contentTemplate.render) {
            this.contentTemplate.render({
                model: options,
                container: this._contentGroup.element,
                onRendered: onRender
            })
        } else {
            return this.contentTemplate(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
                group: this._contentGroup,
                onRender: onRender
            }, restProps))
        }
        return true
    }
    _draw() {
        var renderer = this.widget._renderer;
        var options = this.options;
        var shadowSettings = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
        }, options.shadow);
        var shadow = this._shadow = renderer.shadowFilter().attr(shadowSettings);
        var cloudSettings = {
            opacity: options.opacity,
            "stroke-width": 0,
            fill: options.color
        };
        var borderOptions = options.border || {};
        if (borderOptions.visible) {
            Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(cloudSettings, {
                "stroke-width": borderOptions.width,
                stroke: borderOptions.color,
                "stroke-opacity": borderOptions.opacity,
                dashStyle: borderOptions.dashStyle
            })
        }
        var group = this._root = renderer.g().append(this.root);
        if (options.type) {
            group.attr({
                class: "dxc-".concat(options.type, "-annotation")
            })
        }
        var cloudGroup = renderer.g().attr({
            filter: shadow.id
        }).append(group);
        this._cloud = renderer.path([], "area").attr(cloudSettings).sharp().append(cloudGroup);
        this._contentGroup = renderer.g().append(group)
    }
    getBBox() {
        var size = this._size || {};
        var margins = this.margins || {};
        var rotationAngle = getCloudAngle(size, this.x, this.y, this.anchorX, this.anchorY);
        return {
            x: Math.floor(this.x - size.width / 2 - margins.lm),
            y: Math.floor(this.y - size.height / 2 - margins.tm - (270 === rotationAngle ? this.options.arrowLength : 0)),
            width: size.width + margins.lm + margins.rm,
            height: size.height + margins.tm + margins.bm + (90 === rotationAngle || 270 === rotationAngle ? this.options.arrowLength : 0)
        }
    }
    clear() {
        if (this._root) {
            this._root.remove();
            this._shadow.remove();
            this._root = null
        }
        return this
    }
    customizeCloud(attr) {
        if (this._cloud) {
            this._cloud.attr(attr)
        }
    }
    moveRoot(x, y) {
        if (this._root) {
            this._root.move(x, y)
        }
    }
    move(x, y) {
        x = round(x);
        y = round(y);
        this.x = x;
        this.y = y;
        var rotationAngle = getCloudAngle(this._size, x, y, this.anchorX, this.anchorY);
        var radRotationAngle = rotationAngle * PI / 180;
        this._cloud.attr({
            d: getCloudPoints(rotateSize(this._size, rotationAngle), x, y, rotateX(this.anchorX, this.anchorY, radRotationAngle, x, y), rotateY(this.anchorX, this.anchorY, radRotationAngle, x, y), this.options, this.bonded)
        }).rotate(rotationAngle, x, y);
        this.moveContentGroup(this.widget, this._contentGroup, x - this._contentBBox.x - this._contentBBox.width / 2, y - this._contentBBox.y - this._contentBBox.height / 2)
    }
    hitTest(x, y) {
        var {
            width: width,
            height: height
        } = this._size || {};
        return Math.abs(x - this.x) <= width / 2 && Math.abs(y - this.y) <= height / 2
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/renderers/animation.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/renderers/animation.js ***!
  \*********************************************************************/
/*! exports provided: easingFunctions, animationSvgStep, AnimationController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easingFunctions", function() { return easingFunctions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationSvgStep", function() { return animationSvgStep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationController", function() { return AnimationController; });
/* harmony import */ var _animation_frame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../animation/frame */ "./node_modules/devextreme/esm/animation/frame.js");
/**
 * DevExtreme (esm/viz/core/renderers/animation.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var noop = function() {};
var easingFunctions = {
    easeOutCubic: function(pos, start, end) {
        return 1 === pos ? end : (1 - Math.pow(1 - pos, 3)) * (end - start) + +start
    },
    linear: function(pos, start, end) {
        return 1 === pos ? end : pos * (end - start) + +start
    }
};
var animationSvgStep = {
    segments: function(elem, params, progress, easing, currentParams) {
        var from = params.from;
        var to = params.to;
        var curSeg;
        var seg;
        var i;
        var j;
        var segments = [];
        for (i = 0; i < from.length; i++) {
            curSeg = from[i];
            seg = [curSeg[0]];
            if (curSeg.length > 1) {
                for (j = 1; j < curSeg.length; j++) {
                    seg.push(easing(progress, curSeg[j], to[i][j]))
                }
            }
            segments.push(seg)
        }
        currentParams.segments = params.end && 1 === progress ? params.end : segments;
        elem.attr({
            segments: segments
        })
    },
    arc: function(elem, params, progress, easing) {
        var from = params.from;
        var to = params.to;
        var current = {};
        for (var i in from) {
            current[i] = easing(progress, from[i], to[i])
        }
        elem.attr(current)
    },
    transform: function(elem, params, progress, easing, currentParams) {
        var from = params.from;
        var to = params.to;
        var current = {};
        for (var i in from) {
            current[i] = currentParams[i] = easing(progress, from[i], to[i])
        }
        elem.attr(current)
    },
    base: function(elem, params, progress, easing, currentParams, attributeName) {
        var obj = {};
        obj[attributeName] = currentParams[attributeName] = easing(progress, params.from, params.to);
        elem.attr(obj)
    },
    _: noop,
    complete: function(element, currentSettings) {
        element.attr(currentSettings)
    }
};

function step(now) {
    var animateStep = this._animateStep;
    var attrName;
    this._progress = this._calcProgress(now);
    for (attrName in this.params) {
        var anim = animateStep[attrName] || animateStep.base;
        anim(this.element, this.params[attrName], this._progress, this._easing, this._currentParams, attrName)
    }
    this.options.step && this.options.step(this._easing(this._progress, 0, 1), this._progress);
    if (1 === this._progress) {
        return this.stop()
    }
    return true
}

function delayTick(now) {
    if (now - this._startTime >= this.delay) {
        this.tick = step
    }
    return true
}

function start(now) {
    this._startTime = now;
    this.tick = this.delay ? delayTick : step;
    return true
}

function Animation(element, params, options) {
    this._progress = 0;
    this.element = element;
    this.params = params;
    this.options = options;
    this.duration = options.partitionDuration ? options.duration * options.partitionDuration : options.duration;
    this.delay = options.delay && options.duration * options.delay || 0;
    this._animateStep = options.animateStep || animationSvgStep;
    this._easing = easingFunctions[options.easing] || easingFunctions.easeOutCubic;
    this._currentParams = {};
    this.tick = start
}
Animation.prototype = {
    _calcProgress: function(now) {
        return Math.min(1, (now - this.delay - this._startTime) / this.duration)
    },
    stop: function(disableComplete) {
        var options = this.options;
        var animateStep = this._animateStep;
        this.stop = this.tick = noop;
        animateStep.complete && animateStep.complete(this.element, this._currentParams);
        options.complete && !disableComplete && options.complete()
    }
};
function AnimationController(element) {
    this._animationCount = 0;
    this._timerId = null;
    this._animations = {};
    this.element = element
}
AnimationController.prototype = {
    _loop: function() {
        var that = this;
        var animations = that._animations;
        var activeAnimation = 0;
        var now = (new Date).getTime();
        var an;
        var endAnimation = that._endAnimation;
        for (an in animations) {
            if (!animations[an].tick(now)) {
                delete animations[an]
            }
            activeAnimation++
        }
        if (0 === activeAnimation) {
            that.stop();
            that._endAnimationTimer = endAnimation && setTimeout((function() {
                if (0 === that._animationCount) {
                    endAnimation();
                    that._endAnimation = null
                }
            }));
            return
        }
        that._timerId = _animation_frame__WEBPACK_IMPORTED_MODULE_0__["requestAnimationFrame"].call(null, (function() {
            that._loop()
        }), that.element)
    },
    addAnimation: function(animation) {
        var that = this;
        that._animations[that._animationCount++] = animation;
        clearTimeout(that._endAnimationTimer);
        if (!that._timerId) {
            clearTimeout(that._startDelay);
            that._startDelay = setTimeout((function() {
                that._timerId = 1;
                that._loop()
            }), 0)
        }
    },
    animateElement: function(elem, params, options) {
        if (elem && params && options) {
            elem.animation && elem.animation.stop();
            this.addAnimation(elem.animation = new Animation(elem, params, options))
        }
    },
    onEndAnimation: function(endAnimation) {
        this._animationCount ? this._endAnimation = endAnimation : endAnimation()
    },
    dispose: function() {
        this.stop();
        this.element = null
    },
    stop: function() {
        this._animations = {};
        this._animationCount = 0;
        Object(_animation_frame__WEBPACK_IMPORTED_MODULE_0__["cancelAnimationFrame"])(this._timerId);
        clearTimeout(this._startDelay);
        clearTimeout(this._endAnimationTimer);
        this._timerId = null
    },
    lock: function() {
        var an;
        var animations = this._animations;
        var unstoppable;
        var hasUnstoppableInAnimations;
        for (an in animations) {
            unstoppable = animations[an].options.unstoppable;
            hasUnstoppableInAnimations = hasUnstoppableInAnimations || unstoppable;
            if (!unstoppable) {
                animations[an].stop(true);
                delete animations[an]
            }
        }!hasUnstoppableInAnimations && this.stop()
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/renderers/renderer.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/renderers/renderer.js ***!
  \********************************************************************/
/*! exports provided: getFuncIri, processHatchingAttrs, SvgElement, PathSvgElement, ArcSvgElement, RectSvgElement, TextSvgElement, Renderer, refreshPaths */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFuncIri", function() { return getFuncIri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processHatchingAttrs", function() { return processHatchingAttrs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SvgElement", function() { return SvgElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PathSvgElement", function() { return PathSvgElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcSvgElement", function() { return ArcSvgElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RectSvgElement", function() { return RectSvgElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextSvgElement", function() { return TextSvgElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshPaths", function() { return refreshPaths; });
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_call_once__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/utils/call_once */ "./node_modules/devextreme/esm/core/utils/call_once.js");
/* harmony import */ var _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../events/core/events_engine */ "./node_modules/devextreme/esm/events/core/events_engine.js");
/* harmony import */ var _core_utils_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/utils/browser */ "./node_modules/devextreme/esm/core/utils/browser.js");
/* harmony import */ var _core_utils_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core/utils/svg */ "./node_modules/devextreme/esm/core/utils/svg.js");
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./animation */ "./node_modules/devextreme/esm/viz/core/renderers/animation.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/viz/core/renderers/renderer.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */










var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["getWindow"])();
var {
    max: max,
    min: min,
    floor: floor,
    round: round,
    sin: sin,
    cos: cos,
    abs: abs,
    PI: PI
} = Math;
var PI_DIV_180 = PI / 180;
var SHARPING_CORRECTION = .5;
var ARC_COORD_PREC = 5;
var pxAddingExceptions = {
    "column-count": true,
    "fill-opacity": true,
    "flex-grow": true,
    "flex-shrink": true,
    "font-weight": true,
    "line-height": true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    "z-index": true,
    zoom: true
};
var KEY_TEXT = "text";
var KEY_STROKE = "stroke";
var KEY_STROKE_WIDTH = "stroke-width";
var KEY_STROKE_OPACITY = "stroke-opacity";
var KEY_FONT_SIZE = "font-size";
var KEY_FONT_STYLE = "font-style";
var KEY_FONT_WEIGHT = "font-weight";
var KEY_TEXT_DECORATION = "text-decoration";
var KEY_TEXTS_ALIGNMENT = "textsAlignment";
var NONE = "none";
var DEFAULT_FONT_SIZE = 12;
var ELLIPSIS = "...";
var objectCreate = function() {
    if (!Object.create) {
        return function(proto) {
            var F = function() {};
            F.prototype = proto;
            return new F
        }
    } else {
        return function(proto) {
            return Object.create(proto)
        }
    }
}();
var DEFAULTS = {
    scaleX: 1,
    scaleY: 1,
    "pointer-events": null
};
var getBackup = Object(_core_utils_call_once__WEBPACK_IMPORTED_MODULE_3__["default"])((function() {
    var backupContainer = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div");
    backupContainer.style.left = "-9999px";
    backupContainer.style.position = "absolute";
    return {
        backupContainer: backupContainer,
        backupCounter: 0
    }
}));

function backupRoot(root) {
    if (0 === getBackup().backupCounter) {
        _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getBody().appendChild(getBackup().backupContainer)
    }++getBackup().backupCounter;
    root.append({
        element: getBackup().backupContainer
    })
}

function restoreRoot(root, container) {
    root.append({
        element: container
    });
    --getBackup().backupCounter;
    if (0 === getBackup().backupCounter) {
        _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getBody().removeChild(getBackup().backupContainer)
    }
}
var getNextDefsSvgId = function() {
    var numDefsSvgElements = 1;
    return function() {
        return "DevExpress_" + numDefsSvgElements++
    }
}();

function isObjectArgument(value) {
    return value && "string" !== typeof value
}

function createElement(tagName) {
    return _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElementNS("http://www.w3.org/2000/svg", tagName)
}
function getFuncIri(id, pathModified) {
    return null !== id ? "url(" + (pathModified ? window.location.href.split("#")[0] : "") + "#" + id + ")" : id
}

function extend(target, source) {
    var key;
    for (key in source) {
        target[key] = source[key]
    }
    return target
}

function roundValue(value, exp) {
    value = value.toString().split("e");
    value = round(+(value[0] + "e" + (value[1] ? +value[1] + exp : exp)));
    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? +value[1] - exp : -exp))
}

function getBoundingClientRect(element) {
    var box;
    try {
        box = element.getBoundingClientRect()
    } catch (e) {}
    return box || {
        left: 0,
        top: 0
    }
}
var preserveAspectRatioMap = {
    full: NONE,
    lefttop: "xMinYMin",
    leftcenter: "xMinYMid",
    leftbottom: "xMinYMax",
    centertop: "xMidYMin",
    center: "xMidYMid",
    centerbottom: "xMidYMax",
    righttop: "xMaxYMin",
    rightcenter: "xMaxYMid",
    rightbottom: "xMaxYMax"
};
function processHatchingAttrs(element, attrs) {
    if (attrs.hatching && "none" !== Object(_utils__WEBPACK_IMPORTED_MODULE_8__["normalizeEnum"])(attrs.hatching.direction)) {
        attrs = extend({}, attrs);
        attrs.fill = element._hatching = element.renderer.lockHatching(attrs.fill, attrs.hatching, element._hatching);
        delete attrs.hatching
    } else if (element._hatching) {
        element.renderer.releaseHatching(element._hatching);
        element._hatching = null
    }
    return attrs
}

function normalizeArcParams(x, y, innerR, outerR, startAngle, endAngle) {
    var isCircle;
    var noArc = true;
    var angleDiff = roundValue(endAngle, 3) - roundValue(startAngle, 3);
    if (angleDiff) {
        if (abs(angleDiff) % 360 === 0) {
            startAngle = 0;
            endAngle = 360;
            isCircle = true;
            endAngle -= .01
        }
        if (startAngle > 360) {
            startAngle %= 360
        }
        if (endAngle > 360) {
            endAngle %= 360
        }
        if (startAngle > endAngle) {
            startAngle -= 360
        }
        noArc = false
    }
    startAngle *= PI_DIV_180;
    endAngle *= PI_DIV_180;
    return [x, y, min(outerR, innerR), max(outerR, innerR), cos(startAngle), sin(startAngle), cos(endAngle), sin(endAngle), isCircle, floor(abs(endAngle - startAngle) / PI) % 2 ? "1" : "0", noArc]
}
var buildArcPath = function(x, y, innerR, outerR, startAngleCos, startAngleSin, endAngleCos, endAngleSin, isCircle, longFlag) {
    return ["M", (x + outerR * startAngleCos).toFixed(ARC_COORD_PREC), (y - outerR * startAngleSin).toFixed(ARC_COORD_PREC), "A", outerR.toFixed(ARC_COORD_PREC), outerR.toFixed(ARC_COORD_PREC), 0, longFlag, 0, (x + outerR * endAngleCos).toFixed(ARC_COORD_PREC), (y - outerR * endAngleSin).toFixed(ARC_COORD_PREC), isCircle ? "M" : "L", (x + innerR * endAngleCos).toFixed(5), (y - innerR * endAngleSin).toFixed(ARC_COORD_PREC), "A", innerR.toFixed(ARC_COORD_PREC), innerR.toFixed(ARC_COORD_PREC), 0, longFlag, 1, (x + innerR * startAngleCos).toFixed(ARC_COORD_PREC), (y - innerR * startAngleSin).toFixed(ARC_COORD_PREC), "Z"].join(" ")
};

function buildPathSegments(points, type) {
    var list = [
        ["M", 0, 0]
    ];
    switch (type) {
        case "line":
            list = buildLineSegments(points);
            break;
        case "area":
            list = buildLineSegments(points, true);
            break;
        case "bezier":
            list = buildCurveSegments(points);
            break;
        case "bezierarea":
            list = buildCurveSegments(points, true)
    }
    return list
}

function buildLineSegments(points, close) {
    return buildSegments(points, buildSimpleLineSegment, close)
}

function buildCurveSegments(points, close) {
    return buildSegments(points, buildSimpleCurveSegment, close)
}

function buildSegments(points, buildSimpleSegment, close) {
    var _points$;
    var i;
    var ii;
    var list = [];
    if (null !== (_points$ = points[0]) && void 0 !== _points$ && _points$.length) {
        for (i = 0, ii = points.length; i < ii; ++i) {
            buildSimpleSegment(points[i], close, list)
        }
    } else {
        buildSimpleSegment(points, close, list)
    }
    return list
}

function buildSimpleLineSegment(points, close, list) {
    var i = 0;
    var k0 = list.length;
    var k = k0;
    var ii = (points || []).length;
    if (ii) {
        if (void 0 !== points[0].x) {
            for (; i < ii;) {
                list[k++] = ["L", points[i].x, points[i++].y]
            }
        } else {
            for (; i < ii;) {
                list[k++] = ["L", points[i++], points[i++]]
            }
        }
        list[k0][0] = "M"
    } else {
        list[k] = ["M", 0, 0]
    }
    close && list.push(["Z"]);
    return list
}

function buildSimpleCurveSegment(points, close, list) {
    var i;
    var k = list.length;
    var ii = (points || []).length;
    if (ii) {
        if (void 0 !== points[0].x) {
            list[k++] = ["M", points[0].x, points[0].y];
            for (i = 1; i < ii;) {
                list[k++] = ["C", points[i].x, points[i++].y, points[i].x, points[i++].y, points[i].x, points[i++].y]
            }
        } else {
            list[k++] = ["M", points[0], points[1]];
            for (i = 2; i < ii;) {
                list[k++] = ["C", points[i++], points[i++], points[i++], points[i++], points[i++], points[i++]]
            }
        }
    } else {
        list[k] = ["M", 0, 0]
    }
    close && list.push(["Z"]);
    return list
}

function combinePathParam(segments) {
    var d = [];
    var k = 0;
    var i;
    var ii = segments.length;
    var segment;
    var j;
    var jj;
    for (i = 0; i < ii; ++i) {
        segment = segments[i];
        for (j = 0, jj = segment.length; j < jj; ++j) {
            d[k++] = segment[j]
        }
    }
    return d.join(" ")
}

function compensateSegments(oldSegments, newSegments, type) {
    var oldLength = oldSegments.length;
    var newLength = newSegments.length;
    var i;
    var originalNewSegments;
    var makeEqualSegments = -1 !== type.indexOf("area") ? makeEqualAreaSegments : makeEqualLineSegments;
    if (0 === oldLength) {
        for (i = 0; i < newLength; i++) {
            oldSegments.push(newSegments[i].slice(0))
        }
    } else if (oldLength < newLength) {
        makeEqualSegments(oldSegments, newSegments, type)
    } else if (oldLength > newLength) {
        originalNewSegments = newSegments.slice(0);
        makeEqualSegments(newSegments, oldSegments, type)
    }
    return originalNewSegments
}

function prepareConstSegment(constSeg, type) {
    var x = constSeg[constSeg.length - 2];
    var y = constSeg[constSeg.length - 1];
    switch (type) {
        case "line":
        case "area":
            constSeg[0] = "L";
            break;
        case "bezier":
        case "bezierarea":
            constSeg[0] = "C";
            constSeg[1] = constSeg[3] = constSeg[5] = x;
            constSeg[2] = constSeg[4] = constSeg[6] = y
    }
}

function makeEqualLineSegments(short, long, type) {
    var constSeg = short[short.length - 1].slice();
    var i = short.length;
    prepareConstSegment(constSeg, type);
    for (; i < long.length; i++) {
        short[i] = constSeg.slice(0)
    }
}

function makeEqualAreaSegments(short, long, type) {
    var i;
    var head;
    var shortLength = short.length;
    var longLength = long.length;
    var constsSeg1;
    var constsSeg2;
    if ((shortLength - 1) % 2 === 0 && (longLength - 1) % 2 === 0) {
        i = (shortLength - 1) / 2 - 1;
        head = short.slice(0, i + 1);
        constsSeg1 = head[head.length - 1].slice(0);
        constsSeg2 = short.slice(i + 1)[0].slice(0);
        prepareConstSegment(constsSeg1, type);
        prepareConstSegment(constsSeg2, type);
        for (var j = i; j < (longLength - 1) / 2 - 1; j++) {
            short.splice(j + 1, 0, constsSeg1);
            short.splice(j + 3, 0, constsSeg2)
        }
    }
}

function baseCss(that, styles) {
    var elemStyles = that._styles;
    var key;
    var value;
    styles = styles || {};
    for (key in styles) {
        value = styles[key];
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(value)) {
            value += "number" === typeof value && !pxAddingExceptions[key] ? "px" : "";
            elemStyles[key] = "" !== value ? value : null
        }
    }
    for (key in elemStyles) {
        value = elemStyles[key];
        if (value) {
            that.element.style[key] = value
        } else if (null === value) {
            that.element.style[key] = ""
        }
    }
    return that
}

function fixFuncIri(wrapper, attribute) {
    var element = wrapper.element;
    var id = wrapper.attr(attribute);
    if (id && -1 !== id.indexOf("DevExpress")) {
        element.removeAttribute(attribute);
        element.setAttribute(attribute, getFuncIri(id, wrapper.renderer.pathModified))
    }
}

function baseAttr(that, attrs) {
    attrs = attrs || {};
    var settings = that._settings;
    var attributes = {};
    var key;
    var value;
    var elem = that.element;
    var renderer = that.renderer;
    var rtl = renderer.rtl;
    var hasTransformations;
    var recalculateDashStyle;
    var sw;
    var i;
    if (!isObjectArgument(attrs)) {
        if (attrs in settings) {
            return settings[attrs]
        }
        if (attrs in DEFAULTS) {
            return DEFAULTS[attrs]
        }
        return 0
    }
    extend(attributes, attrs);
    for (key in attributes) {
        value = attributes[key];
        if (void 0 === value) {
            continue
        }
        settings[key] = value;
        if ("align" === key) {
            key = "text-anchor";
            value = {
                left: rtl ? "end" : "start",
                center: "middle",
                right: rtl ? "start" : "end"
            } [value] || null
        } else if ("dashStyle" === key) {
            recalculateDashStyle = true;
            continue
        } else if (key === KEY_STROKE_WIDTH) {
            recalculateDashStyle = true
        } else if (value && ("fill" === key || "clip-path" === key || "filter" === key) && 0 === value.indexOf("DevExpress")) {
            that._addFixIRICallback();
            value = getFuncIri(value, renderer.pathModified)
        } else if (/^(translate(X|Y)|rotate[XY]?|scale(X|Y)|sharp|sharpDirection)$/i.test(key)) {
            hasTransformations = true;
            continue
        } else if (/^(x|y|d)$/i.test(key)) {
            hasTransformations = true
        }
        if (null === value) {
            elem.removeAttribute(key)
        } else {
            elem.setAttribute(key, value)
        }
    }
    if (recalculateDashStyle && "dashStyle" in settings) {
        value = settings.dashStyle;
        sw = ("_originalSW" in that ? that._originalSW : settings[KEY_STROKE_WIDTH]) || 1;
        key = "stroke-dasharray";
        value = null === value ? "" : Object(_utils__WEBPACK_IMPORTED_MODULE_8__["normalizeEnum"])(value);
        if ("" === value || "solid" === value || value === NONE) {
            that.element.removeAttribute(key)
        } else {
            value = value.replace(/longdash/g, "8,3,").replace(/dash/g, "4,3,").replace(/dot/g, "1,3,").replace(/,$/, "").split(",");
            i = value.length;
            while (i--) {
                value[i] = parseInt(value[i]) * sw
            }
            that.element.setAttribute(key, value.join(","))
        }
    }
    if (hasTransformations) {
        that._applyTransformation()
    }
    return that
}

function pathAttr(attrs) {
    var segments;
    if (isObjectArgument(attrs)) {
        attrs = extend({}, attrs);
        segments = attrs.segments;
        if ("points" in attrs) {
            segments = buildPathSegments(attrs.points, this.type);
            delete attrs.points
        }
        if (segments) {
            attrs.d = combinePathParam(segments);
            this.segments = segments;
            delete attrs.segments
        }
    }
    return baseAttr(this, attrs)
}

function arcAttr(attrs) {
    var settings = this._settings;
    var x;
    var y;
    var innerRadius;
    var outerRadius;
    var startAngle;
    var endAngle;
    if (isObjectArgument(attrs)) {
        attrs = extend({}, attrs);
        if ("x" in attrs || "y" in attrs || "innerRadius" in attrs || "outerRadius" in attrs || "startAngle" in attrs || "endAngle" in attrs) {
            settings.x = x = "x" in attrs ? attrs.x : settings.x;
            delete attrs.x;
            settings.y = y = "y" in attrs ? attrs.y : settings.y;
            delete attrs.y;
            settings.innerRadius = innerRadius = "innerRadius" in attrs ? attrs.innerRadius : settings.innerRadius;
            delete attrs.innerRadius;
            settings.outerRadius = outerRadius = "outerRadius" in attrs ? attrs.outerRadius : settings.outerRadius;
            delete attrs.outerRadius;
            settings.startAngle = startAngle = "startAngle" in attrs ? attrs.startAngle : settings.startAngle;
            delete attrs.startAngle;
            settings.endAngle = endAngle = "endAngle" in attrs ? attrs.endAngle : settings.endAngle;
            delete attrs.endAngle;
            attrs.d = buildArcPath.apply(null, normalizeArcParams(x, y, innerRadius, outerRadius, startAngle, endAngle))
        }
    }
    return baseAttr(this, attrs)
}

function rectAttr(attrs) {
    var x;
    var y;
    var width;
    var height;
    var sw;
    var maxSW;
    var newSW;
    if (isObjectArgument(attrs)) {
        attrs = extend({}, attrs);
        if (void 0 !== attrs.x || void 0 !== attrs.y || void 0 !== attrs.width || void 0 !== attrs.height || void 0 !== attrs[KEY_STROKE_WIDTH]) {
            void 0 !== attrs.x ? x = this._originalX = attrs.x : x = this._originalX || 0;
            void 0 !== attrs.y ? y = this._originalY = attrs.y : y = this._originalY || 0;
            void 0 !== attrs.width ? width = this._originalWidth = attrs.width : width = this._originalWidth || 0;
            void 0 !== attrs.height ? height = this._originalHeight = attrs.height : height = this._originalHeight || 0;
            void 0 !== attrs[KEY_STROKE_WIDTH] ? sw = this._originalSW = attrs[KEY_STROKE_WIDTH] : sw = this._originalSW;
            maxSW = ~~((width < height ? width : height) / 2);
            newSW = (sw || 0) < maxSW ? sw || 0 : maxSW;
            attrs.x = x + newSW / 2;
            attrs.y = y + newSW / 2;
            attrs.width = width - newSW;
            attrs.height = height - newSW;
            ((sw || 0) !== newSW || !(0 === newSW && void 0 === sw)) && (attrs[KEY_STROKE_WIDTH] = newSW)
        }
        if ("sharp" in attrs) {
            delete attrs.sharp
        }
    }
    return baseAttr(this, attrs)
}

function textAttr(attrs) {
    var isResetRequired;
    if (!isObjectArgument(attrs)) {
        return baseAttr(this, attrs)
    }
    attrs = extend({}, attrs);
    var settings = this._settings;
    var wasStroked = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(settings[KEY_STROKE]) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(settings[KEY_STROKE_WIDTH]);
    if (void 0 !== attrs[KEY_TEXT]) {
        settings[KEY_TEXT] = attrs[KEY_TEXT];
        delete attrs[KEY_TEXT];
        isResetRequired = true
    }
    if (void 0 !== attrs[KEY_STROKE]) {
        settings[KEY_STROKE] = attrs[KEY_STROKE];
        delete attrs[KEY_STROKE]
    }
    if (void 0 !== attrs[KEY_STROKE_WIDTH]) {
        settings[KEY_STROKE_WIDTH] = attrs[KEY_STROKE_WIDTH];
        delete attrs[KEY_STROKE_WIDTH]
    }
    if (void 0 !== attrs[KEY_STROKE_OPACITY]) {
        settings[KEY_STROKE_OPACITY] = attrs[KEY_STROKE_OPACITY];
        delete attrs[KEY_STROKE_OPACITY]
    }
    if (void 0 !== attrs[KEY_TEXTS_ALIGNMENT]) {
        alignTextNodes(this, attrs[KEY_TEXTS_ALIGNMENT]);
        delete attrs[KEY_TEXTS_ALIGNMENT]
    }
    var isStroked = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(settings[KEY_STROKE]) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(settings[KEY_STROKE_WIDTH]);
    baseAttr(this, attrs);
    isResetRequired = isResetRequired || isStroked !== wasStroked && settings[KEY_TEXT];
    if (isResetRequired) {
        createTextNodes(this, settings.text, isStroked);
        this._hasEllipsis = false
    }
    if (isResetRequired || void 0 !== attrs.x || void 0 !== attrs.y) {
        locateTextNodes(this)
    }
    if (isStroked) {
        strokeTextNodes(this)
    }
    return this
}

function textCss(styles) {
    styles = styles || {};
    baseCss(this, styles);
    if (KEY_FONT_SIZE in styles) {
        locateTextNodes(this)
    }
    return this
}

function orderHtmlTree(list, line, node, parentStyle, parentClassName) {
    var style;
    var realStyle;
    var i;
    var ii;
    var nodes;
    if (void 0 !== node.wholeText) {
        list.push({
            value: node.wholeText,
            style: parentStyle,
            className: parentClassName,
            line: line,
            height: parentStyle[KEY_FONT_SIZE] || 0
        })
    } else if ("BR" === node.tagName) {
        ++line
    } else if (_core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].isElementNode(node)) {
        extend(style = {}, parentStyle);
        switch (node.tagName) {
            case "B":
            case "STRONG":
                style[KEY_FONT_WEIGHT] = "bold";
                break;
            case "I":
            case "EM":
                style[KEY_FONT_STYLE] = "italic";
                break;
            case "U":
                style[KEY_TEXT_DECORATION] = "underline"
        }
        realStyle = node.style;
        realStyle.color && (style.fill = realStyle.color);
        realStyle.fontSize && (style[KEY_FONT_SIZE] = realStyle.fontSize);
        realStyle.fontStyle && (style[KEY_FONT_STYLE] = realStyle.fontStyle);
        realStyle.fontWeight && (style[KEY_FONT_WEIGHT] = realStyle.fontWeight);
        realStyle.textDecoration && (style[KEY_TEXT_DECORATION] = realStyle.textDecoration);
        for (i = 0, nodes = node.childNodes, ii = nodes.length; i < ii; ++i) {
            line = orderHtmlTree(list, line, nodes[i], style, node.className || parentClassName)
        }
    }
    return line
}

function adjustLineHeights(items) {
    var i;
    var ii;
    var currentItem = items[0];
    var item;
    for (i = 1, ii = items.length; i < ii; ++i) {
        item = items[i];
        if (item.line === currentItem.line) {
            currentItem.height = maxLengthFontSize(currentItem.height, item.height);
            currentItem.inherits = currentItem.inherits || 0 === parseFloat(item.height);
            item.height = NaN
        } else {
            currentItem = item
        }
    }
}

function removeExtraAttrs(html) {
    var findStyleAndClassAttrs = /(style|class)\s*=\s*(["'])(?:(?!\2).)*\2\s?/gi;
    return html.replace(/(?:(<[a-z0-9]+\s*))([\s\S]*?)(>|\/>)/gi, (function(allTagAttrs, p1, p2, p3) {
        p2 = (p2 && p2.match(findStyleAndClassAttrs) || []).map((function(str) {
            return str
        })).join(" ");
        return p1 + p2 + p3
    }))
}

function parseHTML(text) {
    var items = [];
    var div = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div");
    div.innerHTML = text.replace(/\r/g, "").replace(/\n/g, "<br/>");
    orderHtmlTree(items, 0, div, {}, "");
    adjustLineHeights(items);
    return items
}

function parseMultiline(text) {
    var texts = text.replace(/\r/g, "").split(/\n/g);
    var i = 0;
    var items = [];
    for (; i < texts.length; i++) {
        items.push({
            value: texts[i].trim(),
            height: 0,
            line: i
        })
    }
    return items
}

function createTspans(items, element, fieldName) {
    var i;
    var ii;
    var item;
    for (i = 0, ii = items.length; i < ii; ++i) {
        item = items[i];
        item[fieldName] = createElement("tspan");
        item[fieldName].appendChild(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createTextNode(item.value));
        item.style && baseCss({
            element: item[fieldName],
            _styles: {}
        }, item.style);
        item.className && item[fieldName].setAttribute("class", item.className);
        element.appendChild(item[fieldName])
    }
}

function restoreText() {
    if (this._hasEllipsis) {
        this.attr({
            text: this._settings.text
        })
    }
}

function applyEllipsis(maxWidth) {
    var lines;
    var hasEllipsis = false;
    var i;
    var ii;
    var lineParts;
    var j;
    var jj;
    var text;
    restoreText.call(this);
    var ellipsis = this.renderer.text(ELLIPSIS).attr(this._styles).append(this.renderer.root);
    var ellipsisWidth = ellipsis.getBBox().width;
    if (this._getElementBBox().width > maxWidth) {
        if (maxWidth - ellipsisWidth < 0) {
            maxWidth = 0
        } else {
            maxWidth -= ellipsisWidth
        }
        lines = prepareLines(this.element, this._texts, maxWidth);
        for (i = 0, ii = lines.length; i < ii; ++i) {
            lineParts = lines[i].parts;
            if (1 === lines[i].commonLength) {
                continue
            }
            for (j = 0, jj = lineParts.length; j < jj; ++j) {
                text = lineParts[j];
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(text.endIndex)) {
                    setNewText(text, text.endIndex);
                    hasEllipsis = true
                } else if (text.startBox > maxWidth) {
                    removeTextSpan(text)
                }
            }
        }
    }
    ellipsis.remove();
    this._hasEllipsis = hasEllipsis;
    return hasEllipsis
}

function cloneAndRemoveAttrs(node) {
    var clone;
    if (node) {
        clone = node.cloneNode();
        clone.removeAttribute("y");
        clone.removeAttribute("x")
    }
    return clone || node
}

function detachTitleElements(element) {
    var titleElements = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].querySelectorAll(element, "title");
    for (var i = 0; i < titleElements.length; i++) {
        element.removeChild(titleElements[i])
    }
    return titleElements
}

function detachAndStoreTitleElements(element) {
    var titleElements = detachTitleElements(element);
    return () => {
        for (var i = 0; i < titleElements.length; i++) {
            element.appendChild(titleElements[i])
        }
    }
}

function setMaxSize(maxWidth, maxHeight) {
    var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var that = this;
    var lines = [];
    var textChanged = false;
    var textIsEmpty = false;
    var ellipsisMaxWidth = maxWidth;
    restoreText.call(that);
    var restoreTitleElement = detachAndStoreTitleElements(this.element);
    var ellipsis = that.renderer.text(ELLIPSIS).attr(that._styles).append(that.renderer.root);
    var ellipsisWidth = ellipsis.getBBox().width;
    var {
        width: width,
        height: height
    } = that._getElementBBox();
    if ((width || height) && (width > maxWidth || maxHeight && height > maxHeight)) {
        if (maxWidth - ellipsisWidth < 0) {
            ellipsisMaxWidth = 0
        } else {
            ellipsisMaxWidth -= ellipsisWidth
        }
        lines = applyOverflowRules(that.element, that._texts, maxWidth, ellipsisMaxWidth, options);
        lines = setMaxHeight(lines, ellipsisMaxWidth, options, maxHeight, parseFloat(this._getLineHeight()));
        this._texts = lines.reduce((texts, line) => texts.concat(line.parts), []).filter(t => "" !== t.value).map(t => {
            t.stroke && t.tspan.parentNode.appendChild(t.stroke);
            return t
        }).map(t => {
            t.tspan.parentNode.appendChild(t.tspan);
            return t
        });
        !this._texts.length && (this._texts = null);
        textChanged = true;
        if (this._texts) {
            locateTextNodes(this)
        } else {
            this.element.textContent = "";
            textIsEmpty = true
        }
    }
    ellipsis.remove();
    that._hasEllipsis = textChanged;
    restoreTitleElement();
    return {
        rowCount: lines.length,
        textChanged: textChanged,
        textIsEmpty: textIsEmpty
    }
}

function getIndexForEllipsis(text, maxWidth, startBox, endBox) {
    var k;
    var kk;
    if (startBox <= maxWidth && endBox > maxWidth) {
        for (k = 1, kk = text.value.length; k <= kk; ++k) {
            if (startBox + text.tspan.getSubStringLength(0, k) > maxWidth) {
                return k - 1
            }
        }
    }
}

function getTextWidth(text) {
    return text.value.length ? text.tspan.getSubStringLength(0, text.value.length) : 0
}

function prepareLines(element, texts, maxWidth) {
    var lines = [];
    var i;
    var ii;
    var text;
    var startBox;
    var endBox;
    if (texts) {
        for (i = 0, ii = texts.length; i < ii; ++i) {
            text = texts[i];
            if (!lines[text.line]) {
                text.startBox = startBox = 0;
                lines.push({
                    commonLength: text.value.length,
                    parts: [text]
                })
            } else {
                text.startBox = startBox;
                lines[text.line].parts.push(text);
                lines[text.line].commonLength += text.value.length
            }
            endBox = startBox + text.tspan.getSubStringLength(0, text.value.length);
            text.endIndex = getIndexForEllipsis(text, maxWidth, startBox, endBox);
            startBox = endBox
        }
    } else {
        text = {
            value: element.textContent,
            tspan: element
        };
        text.startBox = startBox = 0;
        endBox = startBox + getTextWidth(text);
        text.endIndex = getIndexForEllipsis(text, maxWidth, startBox, endBox);
        lines = [{
            commonLength: element.textContent.length,
            parts: [text]
        }]
    }
    return lines
}

function getSpaceBreakIndex(text, maxWidth) {
    var initialIndices = text.startBox > 0 ? [0] : [];
    var spaceIndices = text.value.split("").reduce((indices, char, index) => {
        if (" " === char) {
            indices.push(index)
        }
        return indices
    }, initialIndices);
    var spaceIndex = 0;
    while (void 0 !== spaceIndices[spaceIndex + 1] && text.startBox + text.tspan.getSubStringLength(0, spaceIndices[spaceIndex + 1]) < maxWidth) {
        spaceIndex++
    }
    return spaceIndices[spaceIndex]
}

function getWordBreakIndex(text, maxWidth) {
    for (var i = 0; i < text.value.length - 1; i++) {
        if (text.startBox + text.tspan.getSubStringLength(0, i + 1) > maxWidth) {
            return i
        }
    }
}

function getEllipsisString(ellipsisMaxWidth, _ref) {
    var {
        hideOverflowEllipsis: hideOverflowEllipsis
    } = _ref;
    return hideOverflowEllipsis && 0 === ellipsisMaxWidth ? "" : ELLIPSIS
}

function setEllipsis(text, ellipsisMaxWidth, options) {
    var ellipsis = getEllipsisString(ellipsisMaxWidth, options);
    if (text.value.length && text.tspan.parentNode) {
        for (var i = text.value.length - 1; i >= 1; i--) {
            if (text.startBox + text.tspan.getSubStringLength(0, i) < ellipsisMaxWidth) {
                setNewText(text, i, ellipsis);
                break
            } else if (1 === i) {
                setNewText(text, 0, ellipsis)
            }
        }
    }
}

function wordWrap(text, maxWidth, ellipsisMaxWidth, options, lastStepBreakIndex) {
    var wholeText = text.value;
    var breakIndex;
    if ("none" !== options.wordWrap) {
        breakIndex = "normal" === options.wordWrap ? getSpaceBreakIndex(text, maxWidth) : getWordBreakIndex(text, maxWidth)
    }
    var restLines = [];
    var restText;
    if (isFinite(breakIndex) && !(0 === lastStepBreakIndex && 0 === breakIndex)) {
        setNewText(text, breakIndex, "");
        var newTextOffset = " " === wholeText[breakIndex] ? 1 : 0;
        var restString = wholeText.slice(breakIndex + newTextOffset);
        if (restString.length) {
            var restTspan = cloneAndRemoveAttrs(text.tspan);
            restTspan.textContent = restString;
            text.tspan.parentNode.appendChild(restTspan);
            restText = extend(extend({}, text), {
                value: restString,
                startBox: 0,
                height: 0,
                tspan: restTspan,
                stroke: cloneAndRemoveAttrs(text.stroke),
                endBox: restTspan.getSubStringLength(0, restString.length)
            });
            restText.stroke && (restText.stroke.textContent = restString);
            if (restText.endBox > maxWidth) {
                restLines = wordWrap(restText, maxWidth, ellipsisMaxWidth, options, breakIndex);
                if (!restLines.length) {
                    return []
                }
            }
        }
    }
    if (text.value.length) {
        if ("ellipsis" === options.textOverflow && text.tspan.getSubStringLength(0, text.value.length) > maxWidth) {
            setEllipsis(text, ellipsisMaxWidth, options)
        }
        if ("hide" === options.textOverflow && text.tspan.getSubStringLength(0, text.value.length) > maxWidth) {
            return []
        }
    } else {
        text.tspan.parentNode.removeChild(text.tspan)
    }
    var parts = [];
    if (restText) {
        parts.push(restText)
    }
    return [{
        commonLength: wholeText.length,
        parts: parts
    }].concat(restLines)
}

function calculateLineHeight(line, lineHeight) {
    return line.parts.reduce((height, text) => max(height, getItemLineHeight(text, lineHeight)), 0)
}

function setMaxHeight(lines, ellipsisMaxWidth, options, maxHeight, lineHeight) {
    var textOverflow = options.textOverflow;
    if (!isFinite(maxHeight) || 0 === Number(maxHeight) || "none" === textOverflow) {
        return lines
    }
    var result = lines.reduce((_ref2, l, index, arr) => {
        var [lines, commonHeight] = _ref2;
        var height = calculateLineHeight(l, lineHeight);
        commonHeight += height;
        if (commonHeight < maxHeight) {
            lines.push(l)
        } else {
            l.parts.forEach(item => {
                removeTextSpan(item)
            });
            if ("ellipsis" === textOverflow) {
                var prevLine = arr[index - 1];
                if (prevLine) {
                    var text = prevLine.parts[prevLine.parts.length - 1];
                    if (!text.hasEllipsis) {
                        if (0 === ellipsisMaxWidth || text.endBox < ellipsisMaxWidth) {
                            setNewText(text, text.value.length, getEllipsisString(ellipsisMaxWidth, options))
                        } else {
                            setEllipsis(text, ellipsisMaxWidth, options)
                        }
                    }
                }
            }
        }
        return [lines, commonHeight]
    }, [
        [], 0
    ]);
    if ("hide" === textOverflow && result[1] > maxHeight) {
        result[0].forEach(l => {
            l.parts.forEach(item => {
                removeTextSpan(item)
            })
        });
        return []
    }
    return result[0]
}

function applyOverflowRules(element, texts, maxWidth, ellipsisMaxWidth, options) {
    if (!texts) {
        var textValue = element.textContent;
        var text = {
            value: textValue,
            height: 0,
            line: 0
        };
        element.textContent = "";
        createTspans([text], element, "tspan");
        texts = [text]
    }
    return texts.reduce((_ref3, text) => {
        var [lines, startBox, endBox, stop, lineNumber] = _ref3;
        var line = lines[lines.length - 1];
        if (stop) {
            return [lines, startBox, endBox, stop]
        }
        if (!line || text.line !== lineNumber) {
            text.startBox = startBox = 0;
            lines.push({
                commonLength: text.value.length,
                parts: [text]
            })
        } else {
            text.startBox = startBox;
            if (startBox > ellipsisMaxWidth && "none" === options.wordWrap && "ellipsis" === options.textOverflow) {
                removeTextSpan(text);
                return [lines, startBox, endBox, stop, lineNumber]
            }
            line.parts.push(text);
            line.commonLength += text.value.length
        }
        text.endBox = endBox = startBox + getTextWidth(text);
        startBox = endBox;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(maxWidth) && endBox > maxWidth) {
            var wordWrapLines = wordWrap(text, maxWidth, ellipsisMaxWidth, options);
            if (!wordWrapLines.length) {
                lines = [];
                stop = true
            } else {
                lines = lines.concat(wordWrapLines.filter(l => l.parts.length > 0))
            }
        }
        return [lines, startBox, endBox, stop, text.line]
    }, [
        [], 0, 0, false, 0
    ])[0]
}

function setNewText(text, index) {
    var insertString = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ELLIPSIS;
    var newText = text.value.substr(0, index) + insertString;
    text.value = text.tspan.textContent = newText;
    text.stroke && (text.stroke.textContent = newText);
    if (insertString === ELLIPSIS) {
        text.hasEllipsis = true
    }
}

function removeTextSpan(text) {
    text.tspan.parentNode && text.tspan.parentNode.removeChild(text.tspan);
    text.stroke && text.stroke.parentNode && text.stroke.parentNode.removeChild(text.stroke)
}

function createTextNodes(wrapper, text, isStroked) {
    var items;
    var parsedHtml;
    wrapper._texts = null;
    wrapper.clear();
    if (null === text) {
        return
    }
    text = "" + text;
    if (!wrapper.renderer.encodeHtml && (/<[a-z][\s\S]*>/i.test(text) || -1 !== text.indexOf("&"))) {
        parsedHtml = removeExtraAttrs(text);
        items = parseHTML(parsedHtml)
    } else if (/\n/g.test(text)) {
        items = parseMultiline(text)
    } else if (isStroked) {
        items = [{
            value: text.trim(),
            height: 0
        }]
    }
    if (items) {
        if (items.length) {
            wrapper._texts = items;
            if (isStroked) {
                createTspans(items, wrapper.element, KEY_STROKE)
            }
            createTspans(items, wrapper.element, "tspan")
        }
    } else {
        wrapper.element.appendChild(_core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].createTextNode(text))
    }
}

function setTextNodeAttribute(item, name, value) {
    item.tspan.setAttribute(name, value);
    item.stroke && item.stroke.setAttribute(name, value)
}

function getItemLineHeight(item, defaultValue) {
    return item.inherits ? maxLengthFontSize(item.height, defaultValue) : item.height || defaultValue
}

function locateTextNodes(wrapper) {
    if (!wrapper._texts) {
        return
    }
    var items = wrapper._texts;
    var x = wrapper._settings.x;
    var lineHeight = wrapper._getLineHeight();
    var i;
    var ii;
    var item = items[0];
    setTextNodeAttribute(item, "x", x);
    setTextNodeAttribute(item, "y", wrapper._settings.y);
    for (i = 1, ii = items.length; i < ii; ++i) {
        item = items[i];
        if (parseFloat(item.height) >= 0) {
            setTextNodeAttribute(item, "x", x);
            var height = getItemLineHeight(item, lineHeight);
            setTextNodeAttribute(item, "dy", height)
        }
    }
}

function alignTextNodes(wrapper, alignment) {
    if (!wrapper._texts || "center" === alignment) {
        return
    }
    var items = wrapper._texts;
    var direction = "left" === alignment ? -1 : 1;
    var maxTextWidth = Math.max.apply(Math, items.map(t => getTextWidth(t)));
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var textWidth = getTextWidth(item);
        if (0 !== maxTextWidth && maxTextWidth !== textWidth) {
            setTextNodeAttribute(item, "dx", direction * round((maxTextWidth - textWidth) / 2 * 10) / 10)
        }
    }
}

function maxLengthFontSize(fontSize1, fontSize2) {
    var parsedHeight1 = parseFloat(fontSize1);
    var parsedHeight2 = parseFloat(fontSize2);
    var height1 = parsedHeight1 || DEFAULT_FONT_SIZE;
    var height2 = parsedHeight2 || DEFAULT_FONT_SIZE;
    return height1 > height2 ? !isNaN(parsedHeight1) ? fontSize1 : height1 : !isNaN(parsedHeight2) ? fontSize2 : height2
}

function strokeTextNodes(wrapper) {
    if (!wrapper._texts) {
        return
    }
    var items = wrapper._texts;
    var stroke = wrapper._settings[KEY_STROKE];
    var strokeWidth = wrapper._settings[KEY_STROKE_WIDTH];
    var strokeOpacity = wrapper._settings[KEY_STROKE_OPACITY] || 1;
    var tspan;
    var i;
    var ii;
    for (i = 0, ii = items.length; i < ii; ++i) {
        tspan = items[i].stroke;
        tspan.setAttribute(KEY_STROKE, stroke);
        tspan.setAttribute(KEY_STROKE_WIDTH, strokeWidth);
        tspan.setAttribute(KEY_STROKE_OPACITY, strokeOpacity);
        tspan.setAttribute("stroke-linejoin", "round")
    }
}

function baseAnimate(that, params, options, complete) {
    options = options || {};
    var key;
    var value;
    var renderer = that.renderer;
    var settings = that._settings;
    var animationParams = {};
    var defaults = {
        translateX: 0,
        translateY: 0,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        rotateX: 0,
        rotateY: 0
    };
    if (complete) {
        options.complete = complete
    }
    if (renderer.animationEnabled()) {
        for (key in params) {
            value = params[key];
            if (/^(translate(X|Y)|rotate[XY]?|scale(X|Y))$/i.test(key)) {
                animationParams.transform = animationParams.transform || {
                    from: {},
                    to: {}
                };
                animationParams.transform.from[key] = key in settings ? Number(settings[key].toFixed(3)) : defaults[key];
                animationParams.transform.to[key] = value
            } else if ("arc" === key || "segments" === key) {
                animationParams[key] = value
            } else {
                animationParams[key] = {
                    from: key in settings ? settings[key] : parseFloat(that.element.getAttribute(key) || 0),
                    to: value
                }
            }
        }
        renderer.animateElement(that, animationParams, extend(extend({}, renderer._animation), options))
    } else {
        options.step && options.step.call(that, 1, 1);
        options.complete && options.complete.call(that);
        that.attr(params)
    }
    return that
}

function pathAnimate(params, options, complete) {
    var curSegments = this.segments || [];
    var newSegments;
    var endSegments;
    if (this.renderer.animationEnabled() && "points" in params) {
        newSegments = buildPathSegments(params.points, this.type);
        endSegments = compensateSegments(curSegments, newSegments, this.type);
        params.segments = {
            from: curSegments,
            to: newSegments,
            end: endSegments
        };
        delete params.points
    }
    return baseAnimate(this, params, options, complete)
}

function arcAnimate(params, options, complete) {
    var settings = this._settings;
    var arcParams = {
        from: {},
        to: {}
    };
    if (this.renderer.animationEnabled() && ("x" in params || "y" in params || "innerRadius" in params || "outerRadius" in params || "startAngle" in params || "endAngle" in params)) {
        arcParams.from.x = settings.x || 0;
        arcParams.from.y = settings.y || 0;
        arcParams.from.innerRadius = settings.innerRadius || 0;
        arcParams.from.outerRadius = settings.outerRadius || 0;
        arcParams.from.startAngle = settings.startAngle || 0;
        arcParams.from.endAngle = settings.endAngle || 0;
        arcParams.to.x = "x" in params ? params.x : settings.x;
        delete params.x;
        arcParams.to.y = "y" in params ? params.y : settings.y;
        delete params.y;
        arcParams.to.innerRadius = "innerRadius" in params ? params.innerRadius : settings.innerRadius;
        delete params.innerRadius;
        arcParams.to.outerRadius = "outerRadius" in params ? params.outerRadius : settings.outerRadius;
        delete params.outerRadius;
        arcParams.to.startAngle = "startAngle" in params ? params.startAngle : settings.startAngle;
        delete params.startAngle;
        arcParams.to.endAngle = "endAngle" in params ? params.endAngle : settings.endAngle;
        delete params.endAngle;
        params.arc = arcParams
    }
    return baseAnimate(this, params, options, complete)
}

function buildLink(target, parameters) {
    var obj = {
        is: false,
        name: parameters.name || parameters,
        after: parameters.after
    };
    if (target) {
        obj.to = target
    } else {
        obj.virtual = true
    }
    return obj
}
var SvgElement = function(renderer, tagName, type) {
    this.renderer = renderer;
    this.element = createElement(tagName);
    this._settings = {};
    this._styles = {};
    if ("path" === tagName) {
        this.type = type || "line"
    }
};

function removeFuncIriCallback(callback) {
    fixFuncIriCallbacks.remove(callback)
}
SvgElement.prototype = {
    constructor: SvgElement,
    _getJQElement: function() {
        return this._$element || (this._$element = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(this.element))
    },
    _addFixIRICallback: function() {
        var that = this;
        var fn = function() {
            fixFuncIri(that, "fill");
            fixFuncIri(that, "clip-path");
            fixFuncIri(that, "filter")
        };
        that.element._fixFuncIri = fn;
        fn.renderer = that.renderer;
        fixFuncIriCallbacks.add(fn);
        that._addFixIRICallback = function() {}
    },
    _clearChildrenFuncIri: function() {
        ! function clearChildren(element) {
            var i;
            for (i = 0; i < element.childNodes.length; i++) {
                removeFuncIriCallback(element.childNodes[i]._fixFuncIri);
                clearChildren(element.childNodes[i])
            }
        }(this.element)
    },
    dispose: function() {
        removeFuncIriCallback(this.element._fixFuncIri);
        this._clearChildrenFuncIri();
        this._getJQElement().remove();
        return this
    },
    append: function(parent) {
        (parent || this.renderer.root).element.appendChild(this.element);
        return this
    },
    remove: function() {
        var element = this.element;
        element.parentNode && element.parentNode.removeChild(element);
        return this
    },
    enableLinks: function() {
        this._links = [];
        return this
    },
    virtualLink: function(parameters) {
        linkItem({
            _link: buildLink(null, parameters)
        }, this);
        return this
    },
    linkAfter: function(name) {
        this._linkAfter = name;
        return this
    },
    linkOn: function(target, parameters) {
        this._link = buildLink(target, parameters);
        linkItem(this, target);
        return this
    },
    linkOff: function() {
        unlinkItem(this);
        this._link = null;
        return this
    },
    linkAppend: function() {
        var link = this._link;
        var items = link.to._links;
        var i;
        var next;
        for (i = link.i + 1;
            (next = items[i]) && !next._link.is; ++i) {}
        this._insert(link.to, next);
        link.is = true;
        return this
    },
    _insert: function(parent, next) {
        parent.element.insertBefore(this.element, next ? next.element : null)
    },
    linkRemove: function() {
        this.remove();
        this._link.is = false;
        return this
    },
    clear: function() {
        this._clearChildrenFuncIri();
        this._getJQElement().empty();
        return this
    },
    toBackground: function() {
        var elem = this.element;
        var parent = elem.parentNode;
        parent && parent.insertBefore(elem, parent.firstChild);
        return this
    },
    toForeground: function() {
        var elem = this.element;
        var parent = elem.parentNode;
        parent && parent.appendChild(elem);
        return this
    },
    attr: function(attrs) {
        return baseAttr(this, attrs)
    },
    smartAttr: function(attrs) {
        return this.attr(processHatchingAttrs(this, attrs))
    },
    css: function(styles) {
        return baseCss(this, styles)
    },
    animate: function(params, options, complete) {
        return baseAnimate(this, params, options, complete)
    },
    sharp(pos, sharpDirection) {
        return this.attr({
            sharp: pos || true,
            sharpDirection: sharpDirection
        })
    },
    _applyTransformation() {
        var tr = this._settings;
        var rotateX;
        var rotateY;
        var transformations = [];
        var sharpMode = tr.sharp;
        var trDirection = tr.sharpDirection || 1;
        var strokeOdd = tr[KEY_STROKE_WIDTH] % 2;
        var correctionX = strokeOdd && ("h" === sharpMode || true === sharpMode) ? SHARPING_CORRECTION * trDirection : 0;
        var correctionY = strokeOdd && ("v" === sharpMode || true === sharpMode) ? SHARPING_CORRECTION * trDirection : 0;
        transformations.push("translate(" + ((tr.translateX || 0) + correctionX) + "," + ((tr.translateY || 0) + correctionY) + ")");
        if (tr.rotate) {
            if ("rotateX" in tr) {
                rotateX = tr.rotateX
            } else {
                rotateX = tr.x
            }
            if ("rotateY" in tr) {
                rotateY = tr.rotateY
            } else {
                rotateY = tr.y
            }
            transformations.push("rotate(" + tr.rotate + "," + (rotateX || 0) + "," + (rotateY || 0) + ")")
        }
        var scaleXDefined = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(tr.scaleX);
        var scaleYDefined = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(tr.scaleY);
        if (scaleXDefined || scaleYDefined) {
            transformations.push("scale(" + (scaleXDefined ? tr.scaleX : 1) + "," + (scaleYDefined ? tr.scaleY : 1) + ")")
        }
        if (transformations.length) {
            this.element.setAttribute("transform", transformations.join(" "))
        }
    },
    move: function(x, y, animate, animOptions) {
        var obj = {};
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(x) && (obj.translateX = x);
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(y) && (obj.translateY = y);
        if (!animate) {
            this.attr(obj)
        } else {
            this.animate(obj, animOptions)
        }
        return this
    },
    rotate: function(angle, x, y, animate, animOptions) {
        var obj = {
            rotate: angle || 0
        };
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(x) && (obj.rotateX = x);
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_9__["isDefined"])(y) && (obj.rotateY = y);
        if (!animate) {
            this.attr(obj)
        } else {
            this.animate(obj, animOptions)
        }
        return this
    },
    _getElementBBox: function() {
        var elem = this.element;
        var bBox;
        try {
            bBox = elem.getBBox && elem.getBBox()
        } catch (e) {}
        return bBox || {
            x: 0,
            y: 0,
            width: elem.offsetWidth || 0,
            height: elem.offsetHeight || 0
        }
    },
    getBBox: function() {
        var transformation = this._settings;
        var bBox = this._getElementBBox();
        if (transformation.rotate) {
            bBox = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["rotateBBox"])(bBox, [("rotateX" in transformation ? transformation.rotateX : transformation.x) || 0, ("rotateY" in transformation ? transformation.rotateY : transformation.y) || 0], -transformation.rotate)
        } else {
            bBox = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["normalizeBBox"])(bBox)
        }
        return bBox
    },
    markup: function() {
        return Object(_core_utils_svg__WEBPACK_IMPORTED_MODULE_6__["getSvgMarkup"])(this.element)
    },
    getOffset: function() {
        return this._getJQElement().offset()
    },
    stopAnimation: function(disableComplete) {
        var animation = this.animation;
        animation && animation.stop(disableComplete);
        return this
    },
    setTitle: function(text) {
        var titleElem = createElement("title");
        titleElem.textContent = text || "";
        this.element.appendChild(titleElem)
    },
    removeTitle() {
        detachTitleElements(this.element)
    },
    data: function(obj, val) {
        var elem = this.element;
        var key;
        if (void 0 !== val) {
            elem[obj] = val
        } else {
            for (key in obj) {
                elem[key] = obj[key]
            }
        }
        return this
    },
    on: function() {
        var args = [this._getJQElement()];
        args.push.apply(args, arguments);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].on.apply(_events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"], args);
        return this
    },
    off: function() {
        var args = [this._getJQElement()];
        args.push.apply(args, arguments);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].off.apply(_events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"], args);
        return this
    },
    trigger: function() {
        var args = [this._getJQElement()];
        args.push.apply(args, arguments);
        _events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"].trigger.apply(_events_core_events_engine__WEBPACK_IMPORTED_MODULE_4__["default"], args);
        return this
    }
};
var PathSvgElement = function(renderer, type) {
    SvgElement.call(this, renderer, "path", type)
};
PathSvgElement.prototype = objectCreate(SvgElement.prototype);
extend(PathSvgElement.prototype, {
    constructor: PathSvgElement,
    attr: pathAttr,
    animate: pathAnimate
});
var ArcSvgElement = function(renderer) {
    SvgElement.call(this, renderer, "path", "arc")
};
ArcSvgElement.prototype = objectCreate(SvgElement.prototype);
extend(ArcSvgElement.prototype, {
    constructor: ArcSvgElement,
    attr: arcAttr,
    animate: arcAnimate
});
var RectSvgElement = function(renderer) {
    SvgElement.call(this, renderer, "rect")
};
RectSvgElement.prototype = objectCreate(SvgElement.prototype);
extend(RectSvgElement.prototype, {
    constructor: RectSvgElement,
    attr: rectAttr
});
var TextSvgElement = function(renderer) {
    SvgElement.call(this, renderer, "text");
    this.css({
        "white-space": "pre"
    })
};
TextSvgElement.prototype = objectCreate(SvgElement.prototype);
extend(TextSvgElement.prototype, {
    constructor: TextSvgElement,
    attr: textAttr,
    css: textCss,
    applyEllipsis: applyEllipsis,
    setMaxSize: setMaxSize,
    restoreText: restoreText,
    _getLineHeight() {
        return !isNaN(parseFloat(this._styles[KEY_FONT_SIZE])) ? this._styles[KEY_FONT_SIZE] : DEFAULT_FONT_SIZE
    }
});

function updateIndexes(items, k) {
    var i;
    var item;
    for (i = k; item = items[i]; ++i) {
        item._link.i = i
    }
}

function linkItem(target, container) {
    var items = container._links;
    var key = target._link.after = target._link.after || container._linkAfter;
    var i;
    var item;
    if (key) {
        for (i = 0;
            (item = items[i]) && item._link.name !== key; ++i) {}
        if (item) {
            for (++i;
                (item = items[i]) && item._link.after === key; ++i) {}
        }
    } else {
        i = items.length
    }
    items.splice(i, 0, target);
    updateIndexes(items, i)
}

function unlinkItem(target) {
    var i;
    var items = target._link.to._links;
    for (i = 0; items[i] !== target; ++i) {}
    items.splice(i, 1);
    updateIndexes(items, i)
}
function Renderer(options) {
    this.root = this._createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        version: "1.1",
        fill: NONE,
        stroke: NONE,
        "stroke-width": 0
    }).attr({
        class: options.cssClass
    }).css({
        "line-height": "normal",
        "-ms-user-select": NONE,
        "-moz-user-select": NONE,
        "-webkit-user-select": NONE,
        "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        display: "block",
        overflow: "hidden"
    });
    this._init();
    this.pathModified = !!options.pathModified;
    this._$container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_0__["default"])(options.container);
    this.root.append({
        element: options.container
    });
    this.fixPlacement();
    this._locker = 0;
    this._backed = false
}
Renderer.prototype = {
    constructor: Renderer,
    _init: function() {
        this._defs = this._createElement("defs").append(this.root);
        this._animationController = new _animation__WEBPACK_IMPORTED_MODULE_7__["AnimationController"](this.root.element);
        this._animation = {
            enabled: true,
            duration: 1e3,
            easing: "easeOutCubic"
        }
    },
    fixPlacement: function() {
        if (!_core_utils_browser__WEBPACK_IMPORTED_MODULE_5__["default"].mozilla) {
            return
        }
        var box = getBoundingClientRect(this._$container.get(0));
        var dx = roundValue(box.left % 1, 2);
        var dy = roundValue(box.top % 1, 2);
        if (_core_utils_browser__WEBPACK_IMPORTED_MODULE_5__["default"].mozilla) {
            this.root.move(-dx, -dy)
        }
    },
    removePlacementFix: function() {
        if (!_core_utils_browser__WEBPACK_IMPORTED_MODULE_5__["default"].mozilla) {
            return
        }
        if (_core_utils_browser__WEBPACK_IMPORTED_MODULE_5__["default"].mozilla) {
            this.root.attr({
                transform: null
            })
        }
    },
    setOptions: function(options) {
        this.rtl = !!options.rtl;
        this.encodeHtml = !!options.encodeHtml;
        this.updateAnimationOptions(options.animation || {});
        this.root.attr({
            direction: this.rtl ? "rtl" : "ltr"
        });
        return this
    },
    _createElement: function(tagName, attr, type) {
        var elem = new SvgElement(this, tagName, type);
        attr && elem.attr(attr);
        return elem
    },
    lock: function() {
        if (0 === this._locker) {
            this._backed = !this._$container.is(":visible");
            if (this._backed) {
                backupRoot(this.root)
            }
        }++this._locker;
        return this
    },
    unlock: function() {
        --this._locker;
        if (0 === this._locker) {
            if (this._backed) {
                restoreRoot(this.root, this._$container[0]);
                this.fixPlacement()
            }
            this._backed = false
        }
        return this
    },
    resize: function(width, height) {
        if (width >= 0 && height >= 0) {
            this.root.attr({
                width: width,
                height: height
            })
        }
        return this
    },
    dispose: function() {
        var key;
        this.root.dispose();
        this._defs.dispose();
        this._animationController.dispose();
        fixFuncIriCallbacks.removeByRenderer(this);
        for (key in this) {
            this[key] = null
        }
        return this
    },
    animationEnabled: function() {
        return !!this._animation.enabled
    },
    updateAnimationOptions: function(newOptions) {
        extend(this._animation, newOptions);
        return this
    },
    stopAllAnimations: function(lock) {
        this._animationController[lock ? "lock" : "stop"]();
        return this
    },
    animateElement: function(element, params, options) {
        this._animationController.animateElement(element, params, options);
        return this
    },
    svg: function() {
        this.removePlacementFix();
        var markup = this.root.markup();
        this.fixPlacement();
        return markup
    },
    getRootOffset: function() {
        return this.root.getOffset()
    },
    onEndAnimation: function(endAnimation) {
        this._animationController.onEndAnimation(endAnimation)
    },
    rect: function(x, y, width, height) {
        var elem = new RectSvgElement(this);
        return elem.attr({
            x: x || 0,
            y: y || 0,
            width: width || 0,
            height: height || 0
        })
    },
    simpleRect: function() {
        return this._createElement("rect")
    },
    circle: function(x, y, r) {
        return this._createElement("circle", {
            cx: x || 0,
            cy: y || 0,
            r: r || 0
        })
    },
    g: function() {
        return this._createElement("g")
    },
    image: function(x, y, w, h, href, location) {
        var image = this._createElement("image", {
            x: x || 0,
            y: y || 0,
            width: w || 0,
            height: h || 0,
            preserveAspectRatio: preserveAspectRatioMap[Object(_utils__WEBPACK_IMPORTED_MODULE_8__["normalizeEnum"])(location)] || NONE
        });
        image.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", href || "");
        return image
    },
    path: function(points, type) {
        var elem = new PathSvgElement(this, type);
        return elem.attr({
            points: points || []
        })
    },
    arc: function(x, y, innerRadius, outerRadius, startAngle, endAngle) {
        var elem = new ArcSvgElement(this);
        return elem.attr({
            x: x || 0,
            y: y || 0,
            innerRadius: innerRadius || 0,
            outerRadius: outerRadius || 0,
            startAngle: startAngle || 0,
            endAngle: endAngle || 0
        })
    },
    text: function(_text, x, y) {
        var elem = new TextSvgElement(this);
        return elem.attr({
            text: _text,
            x: x || 0,
            y: y || 0
        })
    },
    linearGradient: function(stops) {
        var id = getNextDefsSvgId();
        var that = this;
        var gradient = that._createElement("linearGradient", {
            id: id
        }).append(that._defs);
        gradient.id = id;
        stops.forEach(stop => {
            that._createElement("stop", {
                offset: stop.offset,
                "stop-color": stop["stop-color"]
            }).append(gradient)
        });
        return gradient
    },
    pattern: function(color, hatching, _id) {
        hatching = hatching || {};
        var step = hatching.step || 6;
        var stepTo2 = step / 2;
        var stepBy15 = 1.5 * step;
        var id = _id || getNextDefsSvgId();
        var d = "right" === Object(_utils__WEBPACK_IMPORTED_MODULE_8__["normalizeEnum"])(hatching.direction) ? "M " + stepTo2 + " " + -stepTo2 + " L " + -stepTo2 + " " + stepTo2 + " M 0 " + step + " L " + step + " 0 M " + stepBy15 + " " + stepTo2 + " L " + stepTo2 + " " + stepBy15 : "M 0 0 L " + step + " " + step + " M " + -stepTo2 + " " + stepTo2 + " L " + stepTo2 + " " + stepBy15 + " M " + stepTo2 + " " + -stepTo2 + " L " + stepBy15 + " " + stepTo2;
        var pattern = this._createElement("pattern", {
            id: id,
            width: step,
            height: step,
            patternUnits: "userSpaceOnUse"
        }).append(this._defs);
        pattern.id = id;
        this.rect(0, 0, step, step).attr({
            fill: color,
            opacity: hatching.opacity
        }).append(pattern);
        new PathSvgElement(this).attr({
            d: d,
            "stroke-width": hatching.width || 1,
            stroke: color
        }).append(pattern);
        return pattern
    },
    _getPointsWithYOffset: function(points, offset) {
        return points.map((function(point, index) {
            if (index % 2 !== 0) {
                return point + offset
            }
            return point
        }))
    },
    clipShape: function(method, methodArgs) {
        var id = getNextDefsSvgId();
        var clipPath = this._createElement("clipPath", {
            id: id
        }).append(this._defs);
        var shape = method.apply(this, methodArgs).append(clipPath);
        shape.id = id;
        shape.remove = function() {
            throw "Not implemented"
        };
        shape.dispose = function() {
            clipPath.dispose();
            clipPath = null;
            return this
        };
        return shape
    },
    clipRect(x, y, width, height) {
        return this.clipShape(this.rect, arguments)
    },
    clipCircle(x, y, radius) {
        return this.clipShape(this.circle, arguments)
    },
    shadowFilter: function(x, y, width, height, offsetX, offsetY, blur, color, opacity) {
        var id = getNextDefsSvgId();
        var filter = this._createElement("filter", {
            id: id,
            x: x || 0,
            y: y || 0,
            width: width || 0,
            height: height || 0
        }).append(this._defs);
        var gaussianBlur = this._createElement("feGaussianBlur", {
            in: "SourceGraphic",
            result: "gaussianBlurResult",
            stdDeviation: blur || 0
        }).append(filter);
        var offset = this._createElement("feOffset", {
            in: "gaussianBlurResult",
            result: "offsetResult",
            dx: offsetX || 0,
            dy: offsetY || 0
        }).append(filter);
        var flood = this._createElement("feFlood", {
            result: "floodResult",
            "flood-color": color || "",
            "flood-opacity": opacity
        }).append(filter);
        var composite = this._createElement("feComposite", {
            in: "floodResult",
            in2: "offsetResult",
            operator: "in",
            result: "compositeResult"
        }).append(filter);
        var finalComposite = this._createElement("feComposite", {
            in: "SourceGraphic",
            in2: "compositeResult",
            operator: "over"
        }).append(filter);
        filter.id = id;
        filter.gaussianBlur = gaussianBlur;
        filter.offset = offset;
        filter.flood = flood;
        filter.composite = composite;
        filter.finalComposite = finalComposite;
        filter.attr = function(attrs) {
            var filterAttrs = {};
            var offsetAttrs = {};
            var floodAttrs = {};
            "x" in attrs && (filterAttrs.x = attrs.x);
            "y" in attrs && (filterAttrs.y = attrs.y);
            "width" in attrs && (filterAttrs.width = attrs.width);
            "height" in attrs && (filterAttrs.height = attrs.height);
            baseAttr(this, filterAttrs);
            "blur" in attrs && this.gaussianBlur.attr({
                stdDeviation: attrs.blur
            });
            "offsetX" in attrs && (offsetAttrs.dx = attrs.offsetX);
            "offsetY" in attrs && (offsetAttrs.dy = attrs.offsetY);
            this.offset.attr(offsetAttrs);
            "color" in attrs && (floodAttrs["flood-color"] = attrs.color);
            "opacity" in attrs && (floodAttrs["flood-opacity"] = attrs.opacity);
            this.flood.attr(floodAttrs);
            return this
        };
        return filter
    },
    brightFilter: function(type, slope) {
        var id = getNextDefsSvgId();
        var filter = this._createElement("filter", {
            id: id
        }).append(this._defs);
        var componentTransferElement = this._createElement("feComponentTransfer").append(filter);
        var attrs = {
            type: type,
            slope: slope
        };
        filter.id = id;
        this._createElement("feFuncR", attrs).append(componentTransferElement);
        this._createElement("feFuncG", attrs).append(componentTransferElement);
        this._createElement("feFuncB", attrs).append(componentTransferElement);
        return filter
    },
    getGrayScaleFilter: function() {
        if (this._grayScaleFilter) {
            return this._grayScaleFilter
        }
        var id = getNextDefsSvgId();
        var filter = this._createElement("filter", {
            id: id
        }).append(this._defs);
        this._createElement("feColorMatrix").attr({
            type: "matrix",
            values: "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 0.6 0"
        }).append(filter);
        filter.id = id;
        this._grayScaleFilter = filter;
        return filter
    },
    initHatching: function() {
        var storage = this._hatchingStorage = this._hatchingStorage || {
            byHash: {},
            baseId: getNextDefsSvgId()
        };
        var byHash = storage.byHash;
        var name;
        for (name in byHash) {
            byHash[name].pattern.dispose()
        }
        storage.byHash = {};
        storage.refToHash = {};
        storage.nextId = 0
    },
    lockHatching: function(color, hatching, ref) {
        var storage = this._hatchingStorage;
        var hash = getHatchingHash(color, hatching);
        var storageItem;
        var pattern;
        if (storage.refToHash[ref] !== hash) {
            if (ref) {
                this.releaseHatching(ref)
            }
            storageItem = storage.byHash[hash];
            if (!storageItem) {
                pattern = this.pattern(color, hatching, storage.baseId + "-hatching-" + storage.nextId++);
                storageItem = storage.byHash[hash] = {
                    pattern: pattern,
                    count: 0
                };
                storage.refToHash[pattern.id] = hash
            }++storageItem.count;
            ref = storageItem.pattern.id
        }
        return ref
    },
    releaseHatching: function(ref) {
        var storage = this._hatchingStorage;
        var hash = storage.refToHash[ref];
        var storageItem = storage.byHash[hash];
        if (storageItem && 0 === --storageItem.count) {
            storageItem.pattern.dispose();
            delete storage.byHash[hash];
            delete storage.refToHash[ref]
        }
    }
};

function getHatchingHash(color, hatching) {
    return "@" + color + "::" + hatching.step + ":" + hatching.width + ":" + hatching.opacity + ":" + hatching.direction
}
var fixFuncIriCallbacks = function() {
    var callbacks = [];
    return {
        add: function(fn) {
            callbacks.push(fn)
        },
        remove: function(fn) {
            callbacks = callbacks.filter((function(el) {
                return el !== fn
            }))
        },
        removeByRenderer: function(renderer) {
            callbacks = callbacks.filter((function(el) {
                return el.renderer !== renderer
            }))
        },
        fire: function() {
            callbacks.forEach((function(fn) {
                fn()
            }))
        }
    }
}();
var refreshPaths = function() {
    fixFuncIriCallbacks.fire()
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/themes/generic.carmine.js":
/*!************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/themes/generic.carmine.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/viz/core/themes/generic.carmine.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var ACCENT_COLOR = "#f05b41";
var BACKGROUND_COLOR = "#fff";
var TITLE_COLOR = "#333";
var SUBTITLE_COLOR = "#8899a8";
var TEXT_COLOR = "#707070";
var BORDER_COLOR = "#dee1e3";
/* harmony default export */ __webpack_exports__["default"] = ([{
    theme: {
        name: "generic.carmine",
        defaultPalette: "Carmine",
        backgroundColor: BACKGROUND_COLOR,
        primaryTitleColor: TITLE_COLOR,
        secondaryTitleColor: SUBTITLE_COLOR,
        gridColor: BORDER_COLOR,
        axisColor: TEXT_COLOR,
        export: {
            backgroundColor: BACKGROUND_COLOR,
            font: {
                color: TITLE_COLOR
            },
            button: {
                default: {
                    color: TITLE_COLOR,
                    borderColor: "#b1b7bd",
                    backgroundColor: BACKGROUND_COLOR
                },
                hover: {
                    color: TITLE_COLOR,
                    borderColor: "#b1b7bd",
                    backgroundColor: "#faf2f0"
                },
                focus: {
                    color: TITLE_COLOR,
                    borderColor: "#6d7781",
                    backgroundColor: "#faf2f0"
                },
                active: {
                    color: TITLE_COLOR,
                    borderColor: "#6d7781",
                    backgroundColor: "#f5e7e4"
                }
            }
        },
        legend: {
            font: {
                color: TEXT_COLOR
            }
        },
        tooltip: {
            color: BACKGROUND_COLOR,
            border: {
                color: BORDER_COLOR
            },
            font: {
                color: TITLE_COLOR
            }
        },
        "chart:common": {
            commonSeriesSettings: {
                label: {
                    border: {
                        color: BORDER_COLOR
                    }
                }
            }
        },
        "chart:common:annotation": {
            font: {
                color: TITLE_COLOR
            },
            border: {
                color: BORDER_COLOR
            },
            color: BACKGROUND_COLOR
        },
        chart: {
            commonPaneSettings: {
                border: {
                    color: BORDER_COLOR
                }
            },
            commonAxisSettings: {
                breakStyle: {
                    color: "#c1c5c7"
                }
            }
        },
        rangeSelector: {
            scale: {
                breakStyle: {
                    color: "#c1c5c7"
                },
                tick: {
                    opacity: .12
                }
            },
            selectedRangeColor: ACCENT_COLOR,
            sliderMarker: {
                color: ACCENT_COLOR
            },
            sliderHandle: {
                color: ACCENT_COLOR,
                opacity: .5
            }
        },
        sparkline: {
            pointColor: BACKGROUND_COLOR,
            minColor: "#f0ad4e",
            maxColor: "#f74d61"
        },
        treeMap: {
            group: {
                color: BORDER_COLOR,
                label: {
                    font: {
                        color: SUBTITLE_COLOR
                    }
                }
            }
        },
        bullet: {
            color: ACCENT_COLOR
        },
        gauge: {
            valueIndicators: {
                rangebar: {
                    color: ACCENT_COLOR
                },
                textcloud: {
                    color: ACCENT_COLOR
                }
            }
        }
    },
    baseThemeName: "generic.light"
}, {
    theme: {
        name: "generic.carmine.compact"
    },
    baseThemeName: "generic.carmine"
}]);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/themes/generic.contrast.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/themes/generic.contrast.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/viz/core/themes/generic.contrast.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var WHITE = "#ffffff";
var BLACK = "#000000";
var CONTRAST_ACTIVE = "#cf00da";
var MARKER_COLOR = "#f8ca00";
var AREA_LAYER_COLOR = "#686868";
/* harmony default export */ __webpack_exports__["default"] = ([{
    theme: {
        name: "generic.contrast",
        defaultPalette: "Bright",
        font: {
            color: WHITE
        },
        backgroundColor: BLACK,
        primaryTitleColor: WHITE,
        secondaryTitleColor: WHITE,
        gridColor: WHITE,
        axisColor: WHITE,
        export: {
            backgroundColor: BLACK,
            font: {
                color: WHITE
            },
            button: {
                default: {
                    color: WHITE,
                    borderColor: WHITE,
                    backgroundColor: BLACK
                },
                hover: {
                    color: WHITE,
                    borderColor: WHITE,
                    backgroundColor: "#cf00d7"
                },
                focus: {
                    color: WHITE,
                    borderColor: "#cf00d7",
                    backgroundColor: BLACK
                },
                active: {
                    color: BLACK,
                    borderColor: WHITE,
                    backgroundColor: WHITE
                }
            },
            borderColor: WHITE,
            menuButtonColor: BLACK,
            activeBackgroundColor: WHITE,
            activeColor: BLACK,
            selectedBorderColor: CONTRAST_ACTIVE,
            selectedColor: CONTRAST_ACTIVE,
            shadowColor: "none"
        },
        tooltip: {
            border: {
                color: WHITE
            },
            font: {
                color: WHITE
            },
            color: BLACK
        },
        "chart:common": {
            commonSeriesSettings: {
                valueErrorBar: {
                    color: WHITE
                },
                hoverStyle: {
                    hatching: {
                        opacity: .5
                    }
                },
                selectionStyle: {
                    hatching: {
                        opacity: .35
                    }
                },
                label: {
                    font: {
                        color: WHITE
                    },
                    border: {
                        color: WHITE
                    }
                }
            }
        },
        "chart:common:axis": {
            constantLineStyle: {
                color: WHITE
            }
        },
        "chart:common:annotation": {
            font: {
                color: WHITE
            },
            border: {
                color: WHITE
            },
            color: BLACK
        },
        chart: {
            commonSeriesSettings: {},
            crosshair: {
                color: "#cf00d7"
            },
            commonPaneSettings: {
                backgroundColor: BLACK,
                border: {
                    color: WHITE
                }
            },
            scrollBar: {
                color: WHITE
            },
            commonAxisSettings: {
                breakStyle: {
                    color: "#cf00d7"
                }
            },
            zoomAndPan: {
                dragBoxStyle: {
                    color: WHITE,
                    opacity: .7
                }
            }
        },
        pie: {
            commonSeriesSettings: {
                pie: {
                    hoverStyle: {
                        hatching: {
                            opacity: .5
                        }
                    },
                    selectionStyle: {
                        hatching: {
                            opacity: .35
                        }
                    }
                },
                doughnut: {
                    hoverStyle: {
                        hatching: {
                            opacity: .5
                        }
                    },
                    selectionStyle: {
                        hatching: {
                            opacity: .35
                        }
                    }
                },
                donut: {
                    hoverStyle: {
                        hatching: {
                            opacity: .5
                        }
                    },
                    selectionStyle: {
                        hatching: {
                            opacity: .35
                        }
                    }
                }
            }
        },
        gauge: {
            rangeContainer: {
                backgroundColor: WHITE
            },
            valueIndicators: {
                _default: {
                    color: WHITE
                },
                rangebar: {
                    color: WHITE,
                    backgroundColor: BLACK
                },
                twocolorneedle: {
                    secondColor: WHITE
                },
                trianglemarker: {
                    color: WHITE
                },
                textcloud: {
                    color: WHITE,
                    text: {
                        font: {
                            color: BLACK
                        }
                    }
                }
            }
        },
        barGauge: {
            backgroundColor: "#3c3c3c"
        },
        rangeSelector: {
            scale: {
                tick: {
                    color: WHITE,
                    opacity: .4
                },
                minorTick: {
                    color: WHITE,
                    opacity: .12
                },
                breakStyle: {
                    color: "#cf00d7"
                }
            },
            selectedRangeColor: CONTRAST_ACTIVE,
            sliderMarker: {
                color: CONTRAST_ACTIVE
            },
            sliderHandle: {
                color: CONTRAST_ACTIVE,
                opacity: 1
            },
            shutter: {
                opacity: .75
            },
            background: {
                color: BLACK
            }
        },
        map: {
            background: {
                borderColor: WHITE
            },
            layer: {
                label: {
                    stroke: BLACK,
                    font: {
                        color: WHITE
                    }
                }
            },
            "layer:area": {
                borderColor: BLACK,
                color: AREA_LAYER_COLOR,
                hoveredBorderColor: WHITE,
                selectedBorderColor: WHITE,
                label: {
                    font: {
                        opacity: 1
                    }
                }
            },
            "layer:line": {
                color: "#267cff",
                hoveredColor: "#f613ff",
                selectedColor: WHITE
            },
            "layer:marker:dot": {
                borderColor: BLACK,
                color: MARKER_COLOR,
                backColor: BLACK,
                backOpacity: .32
            },
            "layer:marker:bubble": {
                color: MARKER_COLOR,
                hoveredBorderColor: WHITE,
                selectedBorderColor: WHITE
            },
            "layer:marker:pie": {
                hoveredBorderColor: WHITE,
                selectedBorderColor: WHITE
            },
            controlBar: {
                borderColor: WHITE,
                color: BLACK,
                opacity: .3
            }
        },
        treeMap: {
            tile: {
                color: "#70c92f"
            },
            group: {
                color: "#797979",
                label: {
                    font: {
                        color: WHITE
                    }
                }
            }
        },
        sparkline: {
            pointColor: BLACK
        },
        bullet: {},
        polar: {
            commonSeriesSettings: {}
        },
        funnel: {
            label: {
                connector: {
                    opacity: 1
                }
            }
        },
        sankey: {
            label: {
                font: {
                    color: WHITE
                },
                shadow: {
                    opacity: 0
                }
            },
            node: {
                border: {
                    visible: true,
                    width: 1,
                    color: WHITE
                }
            },
            link: {
                opacity: .5,
                border: {
                    visible: true,
                    width: 1,
                    color: WHITE
                },
                hoverStyle: {
                    opacity: .9
                }
            }
        }
    },
    baseThemeName: "generic.light"
}, {
    theme: {
        name: "generic.contrast.compact"
    },
    baseThemeName: "generic.contrast"
}]);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/themes/generic.dark.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/themes/generic.dark.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/viz/core/themes/generic.dark.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var WHITE = "#ffffff";
var BLACK = "#000000";
var SOME_GREY = "#2b2b2b";
var RANGE_COLOR = "#b5b5b5";
var GREY_GREEN = "#303030";
var AREA_LAYER_COLOR = "#686868";
var LINE_COLOR = "#c7c7c7";
var TARGET_COLOR = "#8e8e8e";
var POSITIVE_COLOR = "#b8b8b8";
var BORDER_COLOR = "#494949";
/* harmony default export */ __webpack_exports__["default"] = ([{
    theme: {
        name: "generic.dark",
        font: {
            color: "#808080"
        },
        backgroundColor: "#2a2a2a",
        primaryTitleColor: "#dedede",
        secondaryTitleColor: "#a3a3a3",
        gridColor: "#555555",
        axisColor: "#a3a3a3",
        export: {
            backgroundColor: "#2a2a2a",
            font: {
                color: "#dbdbdb"
            },
            button: {
                default: {
                    color: "#dedede",
                    borderColor: "#4d4d4d",
                    backgroundColor: "#2e2e2e"
                },
                hover: {
                    color: "#dedede",
                    borderColor: "#6c6c6c",
                    backgroundColor: "#444"
                },
                focus: {
                    color: "#dedede",
                    borderColor: "#8d8d8d",
                    backgroundColor: "#444444"
                },
                active: {
                    color: "#dedede",
                    borderColor: "#8d8d8d",
                    backgroundColor: "#555555"
                }
            },
            shadowColor: "#292929"
        },
        tooltip: {
            color: SOME_GREY,
            border: {
                color: BORDER_COLOR
            },
            font: {
                color: "#929292"
            }
        },
        "chart:common": {
            commonSeriesSettings: {
                label: {
                    border: {
                        color: BORDER_COLOR
                    }
                },
                valueErrorBar: {
                    color: WHITE
                }
            }
        },
        "chart:common:axis": {
            constantLineStyle: {
                color: WHITE
            }
        },
        "chart:common:annotation": {
            font: {
                color: "#929292"
            },
            border: {
                color: BORDER_COLOR
            },
            color: SOME_GREY,
            shadow: {
                opacity: .008,
                offsetY: 4,
                blur: 8
            }
        },
        chart: {
            commonPaneSettings: {
                border: {
                    color: BORDER_COLOR
                }
            },
            commonAxisSettings: {
                breakStyle: {
                    color: "#818181"
                }
            },
            zoomAndPan: {
                dragBoxStyle: {
                    color: WHITE
                }
            }
        },
        gauge: {
            rangeContainer: {
                backgroundColor: RANGE_COLOR
            },
            valueIndicators: {
                _default: {
                    color: RANGE_COLOR
                },
                rangebar: {
                    color: "#84788b"
                },
                twocolorneedle: {
                    secondColor: "#ba544d"
                },
                trianglemarker: {
                    color: "#b7918f"
                },
                textcloud: {
                    color: "#ba544d"
                }
            }
        },
        barGauge: {
            backgroundColor: "#3c3c3c"
        },
        rangeSelector: {
            scale: {
                tick: {
                    color: WHITE,
                    opacity: .32
                },
                minorTick: {
                    color: WHITE,
                    opacity: .1
                },
                breakStyle: {
                    color: "#818181"
                }
            },
            selectedRangeColor: RANGE_COLOR,
            sliderMarker: {
                color: RANGE_COLOR,
                font: {
                    color: GREY_GREEN
                }
            },
            sliderHandle: {
                color: WHITE,
                opacity: .2
            },
            shutter: {
                color: SOME_GREY,
                opacity: .9
            }
        },
        map: {
            background: {
                borderColor: "#3f3f3f"
            },
            layer: {
                label: {
                    stroke: BLACK,
                    font: {
                        color: WHITE
                    }
                }
            },
            "layer:area": {
                borderColor: GREY_GREEN,
                color: AREA_LAYER_COLOR,
                hoveredBorderColor: WHITE,
                selectedBorderColor: WHITE
            },
            "layer:line": {
                color: "#c77244",
                hoveredColor: "#ff5d04",
                selectedColor: "#ff784f"
            },
            "layer:marker:bubble": {
                hoveredBorderColor: WHITE,
                selectedBorderColor: WHITE
            },
            "layer:marker:pie": {
                hoveredBorderColor: WHITE,
                selectedBorderColor: WHITE
            },
            legend: {
                border: {
                    color: "#3f3f3f"
                },
                font: {
                    color: WHITE
                }
            },
            controlBar: {
                borderColor: LINE_COLOR,
                color: GREY_GREEN
            }
        },
        treeMap: {
            group: {
                color: "#4c4c4c",
                label: {
                    font: {
                        color: "#a3a3a3"
                    }
                }
            }
        },
        sparkline: {
            lineColor: LINE_COLOR,
            firstLastColor: LINE_COLOR,
            barPositiveColor: POSITIVE_COLOR,
            barNegativeColor: TARGET_COLOR,
            winColor: POSITIVE_COLOR,
            lossColor: TARGET_COLOR,
            pointColor: GREY_GREEN
        },
        bullet: {
            targetColor: TARGET_COLOR
        },
        funnel: {
            item: {
                border: {
                    color: "#2a2a2a"
                }
            }
        },
        sankey: {
            label: {
                font: {
                    color: WHITE
                },
                shadow: {
                    opacity: 0
                }
            },
            node: {
                border: {
                    color: "#2a2a2a"
                }
            },
            link: {
                color: "#888888",
                border: {
                    color: "#2a2a2a"
                },
                hoverStyle: {
                    color: "#bbbbbb"
                }
            }
        }
    },
    baseThemeName: "generic.light"
}, {
    theme: {
        name: "generic.dark.compact"
    },
    baseThemeName: "generic.dark"
}]);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/themes/generic.darkmoon.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/themes/generic.darkmoon.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/viz/core/themes/generic.darkmoon.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var ACCENT_COLOR = "#3debd3";
var BACKGROUND_COLOR = "#465672";
var TITLE_COLOR = "#fff";
var SUBTITLE_COLOR = "#919bac";
var TEXT_COLOR = "#c7ccd4";
var BORDER_COLOR = "#596980";
/* harmony default export */ __webpack_exports__["default"] = ([{
    theme: {
        name: "generic.darkmoon",
        defaultPalette: "Dark Moon",
        backgroundColor: BACKGROUND_COLOR,
        primaryTitleColor: TITLE_COLOR,
        secondaryTitleColor: SUBTITLE_COLOR,
        gridColor: BORDER_COLOR,
        axisColor: TEXT_COLOR,
        export: {
            backgroundColor: BACKGROUND_COLOR,
            font: {
                color: TITLE_COLOR
            },
            button: {
                default: {
                    color: TITLE_COLOR,
                    borderColor: "#7a889e",
                    backgroundColor: BACKGROUND_COLOR
                },
                hover: {
                    color: TITLE_COLOR,
                    borderColor: "#9da8b8",
                    backgroundColor: "#596e92"
                },
                focus: {
                    color: TITLE_COLOR,
                    borderColor: "#c4cad4",
                    backgroundColor: "#596e92"
                },
                active: {
                    color: TITLE_COLOR,
                    borderColor: "#c4cad4",
                    backgroundColor: "#6b80a4"
                }
            }
        },
        legend: {
            font: {
                color: TEXT_COLOR
            }
        },
        tooltip: {
            color: "#62789e",
            border: {
                color: BORDER_COLOR
            },
            font: {
                color: TITLE_COLOR
            }
        },
        "chart:common": {
            commonSeriesSettings: {
                label: {
                    border: {
                        color: BORDER_COLOR
                    }
                }
            }
        },
        "chart:common:annotation": {
            font: {
                color: TITLE_COLOR
            },
            border: {
                color: BORDER_COLOR
            },
            color: "#62789e"
        },
        chart: {
            commonPaneSettings: {
                border: {
                    color: BORDER_COLOR
                }
            },
            commonAxisSettings: {
                breakStyle: {
                    color: "#73869e"
                }
            }
        },
        gauge: {
            valueIndicators: {
                rangebar: {
                    color: ACCENT_COLOR
                },
                textcloud: {
                    color: ACCENT_COLOR,
                    text: {
                        font: {
                            color: BACKGROUND_COLOR
                        }
                    }
                }
            }
        },
        barGauge: {
            backgroundColor: "#526280"
        },
        funnel: {
            item: {
                border: {
                    color: BACKGROUND_COLOR
                }
            }
        },
        sparkline: {
            pointColor: BACKGROUND_COLOR,
            minColor: "#f0ad4e",
            maxColor: "#f9517e"
        },
        treeMap: {
            group: {
                color: BORDER_COLOR,
                label: {
                    font: {
                        color: TITLE_COLOR
                    }
                }
            }
        },
        map: {
            background: {
                borderColor: BORDER_COLOR
            },
            "layer:area": {
                color: "#97a3b6",
                borderColor: BACKGROUND_COLOR
            }
        },
        rangeSelector: {
            shutter: {
                color: BACKGROUND_COLOR
            },
            scale: {
                breakStyle: {
                    color: "#73869e"
                },
                tick: {
                    opacity: .2
                }
            },
            selectedRangeColor: ACCENT_COLOR,
            sliderMarker: {
                color: ACCENT_COLOR,
                font: {
                    color: "#000"
                }
            },
            sliderHandle: {
                color: ACCENT_COLOR,
                opacity: .5
            }
        },
        bullet: {
            color: ACCENT_COLOR
        },
        sankey: {
            link: {
                border: {
                    color: BACKGROUND_COLOR
                }
            },
            node: {
                border: {
                    color: BACKGROUND_COLOR
                }
            }
        }
    },
    baseThemeName: "generic.dark"
}, {
    theme: {
        name: "generic.darkmoon.compact"
    },
    baseThemeName: "generic.darkmoon"
}]);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/themes/generic.darkviolet.js":
/*!***************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/themes/generic.darkviolet.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/viz/core/themes/generic.darkviolet.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var ACCENT_COLOR = "#9c63ff";
var BACKGROUND_COLOR = "#17171f";
var TITLE_COLOR = "#f5f6f7";
var SUBTITLE_COLOR = "#fff";
var TEXT_COLOR = "#b2b2b6";
var BORDER_COLOR = "#343840";
/* harmony default export */ __webpack_exports__["default"] = ([{
    theme: {
        name: "generic.darkviolet",
        defaultPalette: "Dark Violet",
        backgroundColor: BACKGROUND_COLOR,
        primaryTitleColor: TITLE_COLOR,
        secondaryTitleColor: SUBTITLE_COLOR,
        gridColor: BORDER_COLOR,
        axisColor: TEXT_COLOR,
        export: {
            backgroundColor: BACKGROUND_COLOR,
            font: {
                color: TITLE_COLOR
            },
            button: {
                default: {
                    color: TITLE_COLOR,
                    borderColor: "#414152",
                    backgroundColor: BACKGROUND_COLOR
                },
                hover: {
                    color: TITLE_COLOR,
                    borderColor: "#5c5c74",
                    backgroundColor: "#2d2d3c"
                },
                focus: {
                    color: TITLE_COLOR,
                    borderColor: "#7c7c97",
                    backgroundColor: "#2d2d3c"
                },
                active: {
                    color: TITLE_COLOR,
                    borderColor: "#7c7c97",
                    backgroundColor: "#3c3c51"
                }
            }
        },
        legend: {
            font: {
                color: TEXT_COLOR
            }
        },
        tooltip: {
            color: BACKGROUND_COLOR,
            border: {
                color: "#414152"
            },
            font: {
                color: TITLE_COLOR
            }
        },
        "chart:common": {
            commonSeriesSettings: {
                label: {
                    border: {
                        color: BORDER_COLOR
                    }
                }
            }
        },
        "chart:common:annotation": {
            font: {
                color: TITLE_COLOR
            },
            border: {
                color: "#414152"
            },
            color: BACKGROUND_COLOR
        },
        chart: {
            commonPaneSettings: {
                border: {
                    color: BORDER_COLOR
                }
            },
            commonAxisSettings: {
                breakStyle: {
                    color: "#575e6b"
                }
            }
        },
        funnel: {
            item: {
                border: {
                    color: BACKGROUND_COLOR
                }
            }
        },
        sparkline: {
            pointColor: BACKGROUND_COLOR,
            minColor: "#f0ad4e",
            maxColor: "#d9534f"
        },
        treeMap: {
            group: {
                color: BORDER_COLOR,
                label: {
                    font: {
                        color: SUBTITLE_COLOR
                    }
                }
            }
        },
        rangeSelector: {
            shutter: {
                color: BACKGROUND_COLOR
            },
            scale: {
                breakStyle: {
                    color: "#575e6b"
                },
                tick: {
                    opacity: .2
                }
            },
            selectedRangeColor: ACCENT_COLOR,
            sliderMarker: {
                color: ACCENT_COLOR,
                font: {
                    color: "#fff"
                }
            },
            sliderHandle: {
                color: ACCENT_COLOR,
                opacity: .5
            }
        },
        bullet: {
            color: ACCENT_COLOR
        },
        gauge: {
            valueIndicators: {
                rangebar: {
                    color: ACCENT_COLOR
                },
                textcloud: {
                    color: ACCENT_COLOR
                }
            }
        },
        sankey: {
            link: {
                border: {
                    color: BACKGROUND_COLOR
                }
            },
            node: {
                border: {
                    color: BACKGROUND_COLOR
                }
            }
        }
    },
    baseThemeName: "generic.dark"
}, {
    theme: {
        name: "generic.darkviolet.compact"
    },
    baseThemeName: "generic.darkviolet"
}]);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/themes/generic.greenmist.js":
/*!**************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/themes/generic.greenmist.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/viz/core/themes/generic.greenmist.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var ACCENT_COLOR = "#3cbab2";
var BACKGROUND_COLOR = "#f5f5f5";
var TITLE_COLOR = "#28484f";
var SUBTITLE_COLOR = "#7eb2be";
var TEXT_COLOR = "#657c80";
var BORDER_COLOR = "#dedede";
/* harmony default export */ __webpack_exports__["default"] = ([{
    theme: {
        name: "generic.greenmist",
        defaultPalette: "Green Mist",
        backgroundColor: BACKGROUND_COLOR,
        primaryTitleColor: TITLE_COLOR,
        secondaryTitleColor: SUBTITLE_COLOR,
        gridColor: BORDER_COLOR,
        axisColor: TEXT_COLOR,
        export: {
            backgroundColor: BACKGROUND_COLOR,
            font: {
                color: TITLE_COLOR
            },
            button: {
                default: {
                    color: TITLE_COLOR,
                    borderColor: "#a2b4b8",
                    backgroundColor: BACKGROUND_COLOR
                },
                hover: {
                    color: TITLE_COLOR,
                    borderColor: "#7f989e",
                    backgroundColor: "rgba(222, 222, 222, 0.4)"
                },
                focus: {
                    color: TITLE_COLOR,
                    borderColor: "#5f777c",
                    backgroundColor: "rgba(222, 222, 222, 0.4)"
                },
                active: {
                    color: TITLE_COLOR,
                    borderColor: "#5f777c",
                    backgroundColor: "rgba(222, 222, 222, 0.8)"
                }
            }
        },
        legend: {
            font: {
                color: TEXT_COLOR
            }
        },
        tooltip: {
            color: "#fff",
            border: {
                color: BORDER_COLOR
            },
            font: {
                color: TITLE_COLOR
            }
        },
        "chart:common": {
            commonSeriesSettings: {
                label: {
                    border: {
                        color: BORDER_COLOR
                    }
                }
            }
        },
        "chart:common:annotation": {
            color: "#fff",
            border: {
                color: BORDER_COLOR
            },
            font: {
                color: TITLE_COLOR
            }
        },
        chart: {
            commonPaneSettings: {
                border: {
                    color: BORDER_COLOR
                }
            },
            commonAxisSettings: {
                breakStyle: {
                    color: "#c1c1c1"
                }
            }
        },
        funnel: {
            item: {
                border: {
                    color: BACKGROUND_COLOR
                }
            }
        },
        sparkline: {
            pointColor: BACKGROUND_COLOR,
            minColor: "#ffc852",
            maxColor: "#f74a5e"
        },
        treeMap: {
            group: {
                color: BORDER_COLOR,
                label: {
                    font: {
                        color: SUBTITLE_COLOR
                    }
                }
            }
        },
        rangeSelector: {
            shutter: {
                color: BACKGROUND_COLOR
            },
            scale: {
                breakStyle: {
                    color: "#c1c1c1"
                },
                tick: {
                    opacity: .12
                }
            },
            selectedRangeColor: ACCENT_COLOR,
            sliderMarker: {
                color: ACCENT_COLOR
            },
            sliderHandle: {
                color: ACCENT_COLOR,
                opacity: .5
            }
        },
        bullet: {
            color: ACCENT_COLOR
        },
        gauge: {
            valueIndicators: {
                rangebar: {
                    color: ACCENT_COLOR
                },
                textcloud: {
                    color: ACCENT_COLOR
                }
            }
        }
    },
    baseThemeName: "generic.light"
}, {
    theme: {
        name: "generic.greenmist.compact"
    },
    baseThemeName: "generic.greenmist"
}]);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/themes/generic.light.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/themes/generic.light.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/viz/core/themes/generic.light.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var WHITE = "#ffffff";
var BLACK = "#000000";
var LIGHT_GREY = "#d3d3d3";
var GREY_GREEN = "#303030";
var SOME_GREY = "#2b2b2b";
var RED = "#ff0000";
var PRIMARY_TITLE_COLOR = "#232323";
var SECONDARY_TITLE_COLOR = "#767676";
var NONE = "none";
var SOLID = "solid";
var TOP = "top";
var RIGHT = "right";
var BOTTOM = "bottom";
var LEFT = "left";
var CENTER = "center";
var INSIDE = "inside";
var OUTSIDE = "outside";
/* harmony default export */ __webpack_exports__["default"] = ([{
    theme: {
        name: "generic.light",
        isDefault: true,
        font: {
            color: SECONDARY_TITLE_COLOR,
            family: "'Segoe UI', 'Helvetica Neue', 'Trebuchet MS', Verdana, sans-serif",
            weight: 400,
            size: 12,
            cursor: "default"
        },
        redrawOnResize: true,
        backgroundColor: WHITE,
        primaryTitleColor: PRIMARY_TITLE_COLOR,
        secondaryTitleColor: SECONDARY_TITLE_COLOR,
        gridColor: LIGHT_GREY,
        axisColor: SECONDARY_TITLE_COLOR,
        title: {
            backgroundColor: WHITE,
            font: {
                size: 28,
                family: "'Segoe UI Light', 'Helvetica Neue Light', 'Segoe UI', 'Helvetica Neue', 'Trebuchet MS', Verdana, sans-serif",
                weight: 200
            },
            subtitle: {
                font: {
                    size: 16
                },
                offset: 0,
                wordWrap: "normal",
                textOverflow: "ellipsis"
            },
            wordWrap: "normal",
            textOverflow: "ellipsis"
        },
        loadingIndicator: {
            text: "Loading..."
        },
        export: {
            backgroundColor: WHITE,
            margin: 10,
            font: {
                size: 14,
                color: PRIMARY_TITLE_COLOR,
                weight: 400
            },
            button: {
                margin: {
                    top: 8,
                    left: 10,
                    right: 10,
                    bottom: 8
                },
                default: {
                    color: "#333",
                    borderColor: "#ddd",
                    backgroundColor: WHITE
                },
                hover: {
                    color: "#333",
                    borderColor: "#bebebe",
                    backgroundColor: "#e6e6e6"
                },
                focus: {
                    color: BLACK,
                    borderColor: "#9d9d9d",
                    backgroundColor: "#e6e6e6"
                },
                active: {
                    color: "#333",
                    borderColor: "#9d9d9d",
                    backgroundColor: "#d4d4d4"
                }
            },
            shadowColor: LIGHT_GREY
        },
        tooltip: {
            enabled: false,
            border: {
                width: 1,
                color: LIGHT_GREY,
                dashStyle: SOLID,
                visible: true
            },
            font: {
                color: PRIMARY_TITLE_COLOR
            },
            color: WHITE,
            arrowLength: 10,
            paddingLeftRight: 18,
            paddingTopBottom: 15,
            textAlignment: "center",
            shared: false,
            location: CENTER,
            shadow: {
                opacity: .4,
                offsetX: 0,
                offsetY: 4,
                blur: 2,
                color: BLACK
            },
            interactive: false
        },
        legend: {
            hoverMode: "includePoints",
            verticalAlignment: TOP,
            horizontalAlignment: RIGHT,
            position: OUTSIDE,
            visible: true,
            margin: 10,
            markerSize: 12,
            border: {
                visible: false,
                width: 1,
                cornerRadius: 0,
                dashStyle: SOLID
            },
            paddingLeftRight: 20,
            paddingTopBottom: 15,
            columnCount: 0,
            rowCount: 0,
            columnItemSpacing: 20,
            rowItemSpacing: 8,
            title: {
                backgroundColor: WHITE,
                margin: {
                    left: 0,
                    bottom: 9,
                    right: 0,
                    top: 0
                },
                font: {
                    size: 18,
                    weight: 200
                },
                subtitle: {
                    offset: 0,
                    font: {
                        size: 14
                    },
                    wordWrap: "none",
                    textOverflow: "ellipsis"
                },
                wordWrap: "none",
                textOverflow: "ellipsis"
            }
        },
        "chart:common": {
            animation: {
                enabled: true,
                duration: 1e3,
                easing: "easeOutCubic",
                maxPointCountSupported: 300
            },
            commonSeriesSettings: {
                border: {
                    visible: false,
                    width: 2
                },
                showInLegend: true,
                visible: true,
                hoverMode: "nearestPoint",
                selectionMode: "includePoints",
                hoverStyle: {
                    hatching: {
                        direction: RIGHT,
                        width: 2,
                        step: 6,
                        opacity: .75
                    },
                    border: {
                        visible: false,
                        width: 3
                    }
                },
                selectionStyle: {
                    hatching: {
                        direction: RIGHT,
                        width: 2,
                        step: 6,
                        opacity: .5
                    },
                    border: {
                        visible: false,
                        width: 3
                    }
                },
                valueErrorBar: {
                    displayMode: "auto",
                    value: 1,
                    color: BLACK,
                    lineWidth: 2,
                    edgeLength: 8
                },
                label: {
                    visible: false,
                    alignment: CENTER,
                    rotationAngle: 0,
                    horizontalOffset: 0,
                    verticalOffset: 0,
                    radialOffset: 0,
                    showForZeroValues: true,
                    customizeText: void 0,
                    maxLabelCount: void 0,
                    position: OUTSIDE,
                    font: {
                        color: WHITE
                    },
                    border: {
                        visible: false,
                        width: 1,
                        color: LIGHT_GREY,
                        dashStyle: SOLID
                    },
                    connector: {
                        visible: false,
                        width: 1
                    }
                }
            },
            seriesSelectionMode: "single",
            pointSelectionMode: "single",
            equalRowHeight: true,
            dataPrepareSettings: {
                checkTypeForAllData: false,
                convertToAxisDataType: true,
                sortingMethod: true
            },
            title: {
                margin: 10
            },
            adaptiveLayout: {
                width: 80,
                height: 80,
                keepLabels: true
            },
            _rtl: {
                legend: {
                    itemTextPosition: LEFT
                }
            },
            resolveLabelOverlapping: NONE
        },
        "chart:common:axis": {
            visible: true,
            valueMarginsEnabled: true,
            placeholderSize: null,
            logarithmBase: 10,
            discreteAxisDivisionMode: "betweenLabels",
            aggregatedPointsPosition: "betweenTicks",
            width: 1,
            label: {
                visible: true
            },
            grid: {
                visible: false,
                width: 1
            },
            minorGrid: {
                visible: false,
                width: 1,
                opacity: .3
            },
            tick: {
                visible: true,
                width: 1,
                length: 7,
                shift: 3
            },
            minorTick: {
                visible: false,
                width: 1,
                opacity: .3,
                length: 7,
                shift: 3
            },
            stripStyle: {
                paddingLeftRight: 10,
                paddingTopBottom: 5
            },
            constantLineStyle: {
                width: 1,
                color: BLACK,
                dashStyle: SOLID,
                label: {
                    visible: true,
                    position: INSIDE
                }
            },
            marker: {
                label: {}
            }
        },
        "chart:common:annotation": {
            font: {
                color: "#333333"
            },
            tooltipEnabled: true,
            border: {
                width: 1,
                color: "#dddddd",
                dashStyle: SOLID,
                visible: true
            },
            color: WHITE,
            opacity: .9,
            arrowLength: 14,
            arrowWidth: 14,
            paddingLeftRight: 10,
            paddingTopBottom: 10,
            shadow: {
                opacity: .15,
                offsetX: 0,
                offsetY: 1,
                blur: 4,
                color: BLACK
            },
            image: {
                width: 30,
                height: 30
            },
            wordWrap: "normal",
            textOverflow: "ellipsis",
            allowDragging: false
        },
        chart: {
            commonSeriesSettings: {
                type: "line",
                stack: "default",
                aggregation: {
                    enabled: void 0
                },
                point: {
                    visible: true,
                    symbol: "circle",
                    size: 12,
                    border: {
                        visible: false,
                        width: 1
                    },
                    hoverMode: "onlyPoint",
                    selectionMode: "onlyPoint",
                    hoverStyle: {
                        border: {
                            visible: true,
                            width: 4
                        }
                    },
                    selectionStyle: {
                        border: {
                            visible: true,
                            width: 4
                        }
                    }
                },
                scatter: {},
                line: {
                    width: 2,
                    dashStyle: SOLID,
                    hoverStyle: {
                        width: 3,
                        hatching: {
                            direction: NONE
                        }
                    },
                    selectionStyle: {
                        width: 3
                    }
                },
                stackedline: {
                    width: 2,
                    dashStyle: SOLID,
                    hoverStyle: {
                        width: 3,
                        hatching: {
                            direction: NONE
                        }
                    },
                    selectionStyle: {
                        width: 3
                    }
                },
                stackedspline: {
                    width: 2,
                    dashStyle: SOLID,
                    hoverStyle: {
                        width: 3,
                        hatching: {
                            direction: NONE
                        }
                    },
                    selectionStyle: {
                        width: 3
                    }
                },
                fullstackedline: {
                    width: 2,
                    dashStyle: SOLID,
                    hoverStyle: {
                        width: 3,
                        hatching: {
                            direction: NONE
                        }
                    },
                    selectionStyle: {
                        width: 3
                    }
                },
                fullstackedspline: {
                    width: 2,
                    dashStyle: SOLID,
                    hoverStyle: {
                        width: 3,
                        hatching: {
                            direction: NONE
                        }
                    },
                    selectionStyle: {
                        width: 3
                    }
                },
                stepline: {
                    width: 2,
                    dashStyle: SOLID,
                    hoverStyle: {
                        width: 3,
                        hatching: {
                            direction: NONE
                        }
                    },
                    selectionStyle: {
                        width: 3
                    }
                },
                area: {
                    point: {
                        visible: false
                    },
                    opacity: .5
                },
                stackedarea: {
                    point: {
                        visible: false
                    },
                    opacity: .5
                },
                fullstackedarea: {
                    point: {
                        visible: false
                    },
                    opacity: .5
                },
                fullstackedsplinearea: {
                    point: {
                        visible: false
                    },
                    opacity: .5
                },
                steparea: {
                    border: {
                        visible: true,
                        width: 2
                    },
                    point: {
                        visible: false
                    },
                    hoverStyle: {
                        border: {
                            visible: true,
                            width: 3
                        }
                    },
                    selectionStyle: {
                        border: {
                            visible: true,
                            width: 3
                        }
                    },
                    opacity: .5
                },
                spline: {
                    width: 2,
                    hoverStyle: {
                        width: 3,
                        hatching: {
                            direction: NONE
                        }
                    },
                    selectionStyle: {
                        width: 3
                    }
                },
                splinearea: {
                    point: {
                        visible: false
                    },
                    opacity: .5
                },
                stackedsplinearea: {
                    point: {
                        visible: false
                    },
                    opacity: .5
                },
                bar: {
                    cornerRadius: 0,
                    point: {
                        hoverStyle: {
                            border: {
                                visible: false
                            }
                        },
                        selectionStyle: {
                            border: {
                                visible: false
                            }
                        }
                    }
                },
                stackedbar: {
                    cornerRadius: 0,
                    point: {
                        hoverStyle: {
                            border: {
                                visible: false
                            }
                        },
                        selectionStyle: {
                            border: {
                                visible: false
                            }
                        }
                    },
                    label: {
                        position: INSIDE
                    }
                },
                fullstackedbar: {
                    cornerRadius: 0,
                    point: {
                        hoverStyle: {
                            border: {
                                visible: false
                            }
                        },
                        selectionStyle: {
                            border: {
                                visible: false
                            }
                        }
                    },
                    label: {
                        position: INSIDE
                    }
                },
                rangebar: {
                    cornerRadius: 0,
                    point: {
                        hoverStyle: {
                            border: {
                                visible: false
                            }
                        },
                        selectionStyle: {
                            border: {
                                visible: false
                            }
                        }
                    }
                },
                rangearea: {
                    point: {
                        visible: false
                    },
                    opacity: .5
                },
                rangesplinearea: {
                    point: {
                        visible: false
                    },
                    opacity: .5
                },
                bubble: {
                    opacity: .5,
                    point: {
                        hoverStyle: {
                            border: {
                                visible: false
                            }
                        },
                        selectionStyle: {
                            border: {
                                visible: false
                            }
                        }
                    }
                },
                candlestick: {
                    width: 1,
                    reduction: {
                        color: RED
                    },
                    hoverStyle: {
                        width: 3,
                        hatching: {
                            direction: NONE
                        }
                    },
                    selectionStyle: {
                        width: 3
                    },
                    point: {
                        border: {
                            visible: true
                        }
                    }
                },
                stock: {
                    width: 1,
                    reduction: {
                        color: RED
                    },
                    hoverStyle: {
                        width: 3,
                        hatching: {
                            direction: NONE
                        }
                    },
                    selectionStyle: {
                        width: 3
                    },
                    point: {
                        border: {
                            visible: true
                        }
                    }
                }
            },
            crosshair: {
                enabled: false,
                color: "#f05b41",
                width: 1,
                dashStyle: SOLID,
                label: {
                    visible: false,
                    font: {
                        color: WHITE,
                        size: 12
                    }
                },
                verticalLine: {
                    visible: true
                },
                horizontalLine: {
                    visible: true
                }
            },
            commonAxisSettings: {
                multipleAxesSpacing: 5,
                forceUserTickInterval: false,
                breakStyle: {
                    width: 5,
                    color: "#ababab",
                    line: "waved"
                },
                label: {
                    displayMode: "standard",
                    overlappingBehavior: "hide",
                    indentFromAxis: 10,
                    wordWrap: "normal",
                    textOverflow: "none"
                },
                title: {
                    font: {
                        size: 16
                    },
                    margin: 6,
                    alignment: CENTER
                },
                constantLineStyle: {
                    paddingLeftRight: 10,
                    paddingTopBottom: 10
                }
            },
            horizontalAxis: {
                position: BOTTOM,
                axisDivisionFactor: 70,
                label: {
                    rotationAngle: 90,
                    staggeringSpacing: 5,
                    alignment: CENTER
                },
                stripStyle: {
                    label: {
                        horizontalAlignment: CENTER,
                        verticalAlignment: TOP
                    }
                },
                constantLineStyle: {
                    label: {
                        horizontalAlignment: RIGHT,
                        verticalAlignment: TOP
                    }
                },
                constantLines: []
            },
            verticalAxis: {
                position: LEFT,
                axisDivisionFactor: 40,
                label: {
                    alignment: RIGHT
                },
                stripStyle: {
                    label: {
                        horizontalAlignment: LEFT,
                        verticalAlignment: CENTER
                    }
                },
                constantLineStyle: {
                    label: {
                        horizontalAlignment: LEFT,
                        verticalAlignment: TOP
                    }
                },
                constantLines: []
            },
            argumentAxis: {
                endOnTick: false,
                workWeek: [1, 2, 3, 4, 5]
            },
            valueAxis: {
                grid: {
                    visible: true
                },
                autoBreaksEnabled: false,
                maxAutoBreakCount: 4
            },
            commonPaneSettings: {
                backgroundColor: NONE,
                border: {
                    color: LIGHT_GREY,
                    width: 1,
                    visible: false,
                    top: true,
                    bottom: true,
                    left: true,
                    right: true,
                    dashStyle: SOLID
                }
            },
            scrollBar: {
                visible: false,
                offset: 5,
                color: "gray",
                width: 10
            },
            adjustOnZoom: true,
            autoHidePointMarkers: true,
            rotated: false,
            synchronizeMultiAxes: true,
            stickyHovering: true,
            barGroupPadding: .3,
            minBubbleSize: 12,
            maxBubbleSize: .2,
            zoomAndPan: {
                dragBoxStyle: {
                    color: "#2a2a2a",
                    opacity: .2
                },
                panKey: "shift",
                allowMouseWheel: true,
                allowTouchGestures: true
            }
        },
        pie: {
            innerRadius: .5,
            minDiameter: .5,
            type: "pie",
            dataPrepareSettings: {
                _skipArgumentSorting: true
            },
            commonSeriesSettings: {
                pie: {
                    border: {
                        visible: false,
                        width: 2,
                        color: WHITE
                    },
                    hoverStyle: {
                        hatching: {
                            direction: RIGHT,
                            width: 4,
                            step: 10,
                            opacity: .75
                        },
                        border: {
                            visible: false,
                            width: 2
                        }
                    },
                    selectionStyle: {
                        hatching: {
                            direction: RIGHT,
                            width: 4,
                            step: 10,
                            opacity: .5
                        },
                        border: {
                            visible: false,
                            width: 2
                        }
                    }
                },
                doughnut: {
                    border: {
                        visible: false,
                        width: 2,
                        color: WHITE
                    },
                    hoverStyle: {
                        hatching: {
                            direction: RIGHT,
                            width: 4,
                            step: 10,
                            opacity: .75
                        },
                        border: {
                            visible: false,
                            width: 2
                        }
                    },
                    selectionStyle: {
                        hatching: {
                            direction: RIGHT,
                            width: 4,
                            step: 10,
                            opacity: .5
                        },
                        border: {
                            visible: false,
                            width: 2
                        }
                    }
                },
                donut: {
                    border: {
                        visible: false,
                        width: 2,
                        color: WHITE
                    },
                    hoverStyle: {
                        hatching: {
                            direction: RIGHT,
                            width: 4,
                            step: 10,
                            opacity: .75
                        },
                        border: {
                            visible: false,
                            width: 2
                        }
                    },
                    selectionStyle: {
                        hatching: {
                            direction: RIGHT,
                            width: 4,
                            step: 10,
                            opacity: .5
                        },
                        border: {
                            visible: false,
                            width: 2
                        }
                    }
                },
                label: {
                    textOverflow: "ellipsis",
                    wordWrap: "normal"
                }
            },
            legend: {
                hoverMode: "allArgumentPoints",
                backgroundColor: NONE
            },
            adaptiveLayout: {
                keepLabels: false
            }
        },
        gauge: {
            scale: {
                tick: {
                    visible: true,
                    length: 5,
                    width: 2,
                    opacity: 1
                },
                minorTick: {
                    visible: false,
                    length: 3,
                    width: 1,
                    opacity: 1
                },
                label: {
                    visible: true,
                    alignment: CENTER,
                    hideFirstOrLast: "last",
                    overlappingBehavior: "hide"
                },
                position: TOP,
                endOnTick: false
            },
            rangeContainer: {
                offset: 0,
                width: 5,
                backgroundColor: "#808080"
            },
            valueIndicators: {
                _default: {
                    color: "#c2c2c2"
                },
                rangebar: {
                    space: 2,
                    size: 10,
                    color: "#cbc5cf",
                    backgroundColor: NONE,
                    text: {
                        indent: 0,
                        font: {
                            size: 14,
                            color: null
                        }
                    }
                },
                twocolorneedle: {
                    secondColor: "#e18e92"
                },
                trianglemarker: {
                    space: 2,
                    length: 14,
                    width: 13,
                    color: "#8798a5"
                },
                textcloud: {
                    arrowLength: 5,
                    horizontalOffset: 6,
                    verticalOffset: 3,
                    color: "#679ec5",
                    text: {
                        font: {
                            color: WHITE,
                            size: 18
                        }
                    }
                }
            },
            indicator: {
                hasPositiveMeaning: true,
                layout: {
                    horizontalAlignment: CENTER,
                    verticalAlignment: BOTTOM
                },
                text: {
                    font: {
                        size: 18
                    }
                }
            },
            _circular: {
                scale: {
                    scaleDivisionFactor: 17,
                    orientation: OUTSIDE,
                    label: {
                        indentFromTick: 10
                    }
                },
                rangeContainer: {
                    orientation: OUTSIDE
                },
                valueIndicatorType: "rectangleneedle",
                subvalueIndicatorType: "trianglemarker",
                valueIndicators: {
                    _type: "rectangleneedle",
                    _default: {
                        offset: 20,
                        indentFromCenter: 0,
                        width: 2,
                        spindleSize: 14,
                        spindleGapSize: 10,
                        beginAdaptingAtRadius: 50
                    },
                    triangleneedle: {
                        width: 4
                    },
                    twocolorneedle: {
                        space: 2,
                        secondFraction: .4
                    },
                    rangebar: {
                        offset: 30
                    },
                    trianglemarker: {
                        offset: 6
                    },
                    textcloud: {
                        offset: -6
                    }
                }
            },
            _linear: {
                scale: {
                    scaleDivisionFactor: 25,
                    horizontalOrientation: RIGHT,
                    verticalOrientation: BOTTOM,
                    label: {
                        indentFromTick: -10
                    }
                },
                rangeContainer: {
                    horizontalOrientation: RIGHT,
                    verticalOrientation: BOTTOM
                },
                valueIndicatorType: "rangebar",
                subvalueIndicatorType: "trianglemarker",
                valueIndicators: {
                    _type: "rectangle",
                    _default: {
                        offset: 2.5,
                        length: 15,
                        width: 15
                    },
                    rectangle: {
                        width: 10
                    },
                    rangebar: {
                        offset: 10,
                        horizontalOrientation: RIGHT,
                        verticalOrientation: BOTTOM
                    },
                    trianglemarker: {
                        offset: 10,
                        horizontalOrientation: LEFT,
                        verticalOrientation: TOP
                    },
                    textcloud: {
                        offset: -1,
                        horizontalOrientation: LEFT,
                        verticalOrientation: TOP
                    }
                }
            }
        },
        barGauge: {
            backgroundColor: "#e0e0e0",
            relativeInnerRadius: .3,
            barSpacing: 4,
            resolveLabelOverlapping: "hide",
            label: {
                indent: 20,
                connectorWidth: 2,
                font: {
                    size: 16
                }
            },
            legend: {
                visible: false
            },
            indicator: {
                hasPositiveMeaning: true,
                layout: {
                    horizontalAlignment: CENTER,
                    verticalAlignment: BOTTOM
                },
                text: {
                    font: {
                        size: 18
                    }
                }
            }
        },
        rangeSelector: {
            scale: {
                valueMarginsEnabled: true,
                width: 1,
                color: BLACK,
                opacity: .1,
                showCustomBoundaryTicks: true,
                label: {
                    overlappingBehavior: "hide",
                    alignment: CENTER,
                    visible: true,
                    topIndent: 7,
                    font: {
                        size: 11
                    }
                },
                tick: {
                    width: 1,
                    color: BLACK,
                    opacity: .17,
                    visible: true,
                    length: 12
                },
                minorTick: {
                    width: 1,
                    color: BLACK,
                    opacity: .05,
                    visible: true,
                    length: 12
                },
                marker: {
                    width: 1,
                    color: "#000000",
                    opacity: .1,
                    visible: true,
                    separatorHeight: 33,
                    topIndent: 10,
                    textLeftIndent: 7,
                    textTopIndent: 11,
                    label: {}
                },
                logarithmBase: 10,
                workWeek: [1, 2, 3, 4, 5],
                breakStyle: {
                    width: 5,
                    color: "#ababab",
                    line: "waved"
                },
                endOnTick: false
            },
            selectedRangeColor: "#606060",
            sliderMarker: {
                visible: true,
                paddingTopBottom: 2,
                paddingLeftRight: 4,
                color: "#606060",
                invalidRangeColor: RED,
                font: {
                    color: WHITE,
                    size: 11
                }
            },
            sliderHandle: {
                width: 1,
                color: BLACK,
                opacity: .2
            },
            shutter: {
                opacity: .75
            },
            background: {
                color: "#c0bae1",
                visible: true,
                image: {
                    location: "full"
                }
            },
            behavior: {
                snapToTicks: true,
                animationEnabled: true,
                moveSelectedRangeByClick: true,
                manualRangeSelectionEnabled: true,
                allowSlidersSwap: true,
                callValueChanged: "onMovingComplete"
            },
            redrawOnResize: true,
            chart: {
                barGroupPadding: .3,
                minBubbleSize: 12,
                maxBubbleSize: .2,
                topIndent: .1,
                bottomIndent: 0,
                valueAxis: {
                    inverted: false,
                    logarithmBase: 10
                },
                commonSeriesSettings: {
                    type: "area",
                    aggregation: {
                        enabled: void 0
                    },
                    point: {
                        visible: false
                    },
                    scatter: {
                        point: {
                            visible: true
                        }
                    }
                }
            }
        },
        map: {
            title: {
                margin: 10
            },
            background: {
                borderWidth: 1,
                borderColor: "#cacaca"
            },
            layer: {
                label: {
                    enabled: false,
                    stroke: WHITE,
                    "stroke-width": 1,
                    "stroke-opacity": .7,
                    font: {
                        color: SOME_GREY,
                        size: 12
                    }
                }
            },
            "layer:area": {
                borderWidth: 1,
                borderColor: WHITE,
                color: "#d2d2d2",
                hoveredBorderColor: GREY_GREEN,
                selectedBorderWidth: 2,
                selectedBorderColor: GREY_GREEN,
                label: {
                    "stroke-width": 2,
                    font: {
                        size: 16
                    }
                }
            },
            "layer:line": {
                borderWidth: 2,
                color: "#ba8365",
                hoveredColor: "#a94813",
                selectedBorderWidth: 3,
                selectedColor: "#e55100",
                label: {
                    "stroke-width": 2,
                    font: {
                        size: 16
                    }
                }
            },
            "layer:marker": {
                label: {
                    enabled: true,
                    "stroke-width": 1,
                    font: {
                        size: 12
                    }
                }
            },
            "layer:marker:dot": {
                borderWidth: 2,
                borderColor: WHITE,
                size: 8,
                selectedStep: 2,
                backStep: 18,
                backColor: WHITE,
                backOpacity: .32,
                shadow: true
            },
            "layer:marker:bubble": {
                minSize: 20,
                maxSize: 50,
                hoveredBorderWidth: 1,
                hoveredBorderColor: GREY_GREEN,
                selectedBorderWidth: 2,
                selectedBorderColor: GREY_GREEN
            },
            "layer:marker:pie": {
                size: 50,
                hoveredBorderWidth: 1,
                hoveredBorderColor: GREY_GREEN,
                selectedBorderWidth: 2,
                selectedBorderColor: GREY_GREEN
            },
            "layer:marker:image": {
                size: 20
            },
            legend: {
                verticalAlignment: BOTTOM,
                horizontalAlignment: RIGHT,
                position: INSIDE,
                backgroundOpacity: .65,
                border: {
                    visible: true
                },
                paddingLeftRight: 16,
                paddingTopBottom: 12
            },
            controlBar: {
                borderColor: "#5d5d5d",
                borderWidth: 3,
                color: WHITE,
                margin: 20,
                opacity: .3
            },
            _rtl: {
                legend: {
                    itemTextPosition: LEFT
                }
            }
        },
        treeMap: {
            tile: {
                border: {
                    width: 1,
                    opacity: .2,
                    color: "#000000"
                },
                color: "#5f8b95",
                hoverStyle: {
                    hatching: {
                        opacity: .75,
                        step: 6,
                        width: 2,
                        direction: "right"
                    },
                    border: {}
                },
                selectionStyle: {
                    hatching: {
                        opacity: .5,
                        step: 6,
                        width: 2,
                        direction: "right"
                    },
                    border: {
                        opacity: 1
                    }
                },
                label: {
                    visible: true,
                    paddingLeftRight: 5,
                    paddingTopBottom: 4,
                    font: {
                        color: "#ffffff",
                        weight: 600
                    },
                    shadow: {
                        opacity: .6,
                        offsetX: 0,
                        offsetY: 1,
                        blur: 2,
                        color: "#000000"
                    },
                    wordWrap: "normal",
                    textOverflow: "ellipsis"
                }
            },
            group: {
                padding: 4,
                border: {
                    width: 1
                },
                color: "#eeeeee",
                hoverStyle: {
                    hatching: {
                        opacity: 0,
                        step: 6,
                        width: 2,
                        direction: "right"
                    },
                    border: {}
                },
                selectionStyle: {
                    hatching: {
                        opacity: 0,
                        step: 6,
                        width: 2,
                        direction: "right"
                    },
                    border: {}
                },
                label: {
                    visible: true,
                    paddingLeftRight: 5,
                    paddingTopBottom: 4,
                    font: {
                        color: SECONDARY_TITLE_COLOR,
                        weight: 600
                    },
                    textOverflow: "ellipsis"
                }
            },
            title: {
                subtitle: {}
            },
            tooltip: {},
            loadingIndicator: {}
        },
        sparkline: {
            lineColor: "#666666",
            lineWidth: 2,
            areaOpacity: .2,
            minColor: "#e8c267",
            maxColor: "#e55253",
            barPositiveColor: "#a9a9a9",
            barNegativeColor: "#d7d7d7",
            winColor: "#a9a9a9",
            lossColor: "#d7d7d7",
            firstLastColor: "#666666",
            pointSymbol: "circle",
            pointColor: WHITE,
            pointSize: 4,
            type: "line",
            argumentField: "arg",
            valueField: "val",
            winlossThreshold: 0,
            showFirstLast: true,
            showMinMax: false,
            tooltip: {
                enabled: true
            }
        },
        bullet: {
            color: "#e8c267",
            targetColor: "#666666",
            targetWidth: 4,
            showTarget: true,
            showZeroLevel: true,
            tooltip: {
                enabled: true
            }
        },
        polar: {
            commonSeriesSettings: {
                type: "scatter",
                closed: true,
                point: {
                    visible: true,
                    symbol: "circle",
                    size: 12,
                    border: {
                        visible: false,
                        width: 1
                    },
                    hoverMode: "onlyPoint",
                    selectionMode: "onlyPoint",
                    hoverStyle: {
                        border: {
                            visible: true,
                            width: 4
                        },
                        size: 12
                    },
                    selectionStyle: {
                        border: {
                            visible: true,
                            width: 4
                        },
                        size: 12
                    }
                },
                scatter: {},
                line: {
                    width: 2,
                    dashStyle: SOLID,
                    hoverStyle: {
                        width: 3,
                        hatching: {
                            direction: NONE
                        }
                    },
                    selectionStyle: {
                        width: 3
                    }
                },
                area: {
                    point: {
                        visible: false
                    },
                    opacity: .5
                },
                stackedline: {
                    width: 2
                },
                bar: {
                    opacity: .8
                },
                stackedbar: {
                    opacity: .8
                }
            },
            adaptiveLayout: {
                width: 80,
                height: 80,
                keepLabels: true
            },
            barGroupPadding: .3,
            commonAxisSettings: {
                visible: true,
                forceUserTickInterval: false,
                label: {
                    overlappingBehavior: "hide",
                    indentFromAxis: 5
                },
                grid: {
                    visible: true
                },
                minorGrid: {
                    visible: true
                },
                tick: {
                    visible: true
                },
                title: {
                    font: {
                        size: 16
                    },
                    margin: 10
                }
            },
            argumentAxis: {
                startAngle: 0,
                firstPointOnStartAngle: false,
                period: void 0
            },
            valueAxis: {
                endOnTick: false,
                tick: {
                    visible: false
                }
            },
            horizontalAxis: {
                position: TOP,
                axisDivisionFactor: 50,
                label: {
                    alignment: CENTER
                }
            },
            verticalAxis: {
                position: TOP,
                axisDivisionFactor: 30,
                label: {
                    alignment: RIGHT
                }
            }
        },
        funnel: {
            sortData: true,
            valueField: "val",
            colorField: "color",
            argumentField: "arg",
            hoverEnabled: true,
            selectionMode: "single",
            item: {
                border: {
                    visible: false,
                    width: 2,
                    color: WHITE
                },
                hoverStyle: {
                    hatching: {
                        opacity: .75,
                        step: 6,
                        width: 2,
                        direction: RIGHT
                    },
                    border: {}
                },
                selectionStyle: {
                    hatching: {
                        opacity: .5,
                        step: 6,
                        width: 2,
                        direction: RIGHT
                    },
                    border: {}
                }
            },
            title: {
                margin: 10
            },
            adaptiveLayout: {
                width: 80,
                height: 80,
                keepLabels: true
            },
            legend: {
                visible: false
            },
            _rtl: {
                legend: {
                    itemTextPosition: LEFT
                }
            },
            tooltip: {
                customizeTooltip: function(info) {
                    return {
                        text: info.item.argument + " " + info.valueText
                    }
                }
            },
            inverted: false,
            algorithm: "dynamicSlope",
            neckWidth: 0,
            neckHeight: 0,
            resolveLabelOverlapping: "shift",
            label: {
                textOverflow: "ellipsis",
                wordWrap: "normal",
                visible: true,
                horizontalAlignment: RIGHT,
                horizontalOffset: 0,
                verticalOffset: 0,
                showForZeroValues: false,
                customizeText: function(info) {
                    return info.item.argument + " " + info.valueText
                },
                position: "columns",
                font: {
                    color: WHITE
                },
                border: {
                    visible: false,
                    width: 1,
                    color: LIGHT_GREY,
                    dashStyle: SOLID
                },
                connector: {
                    visible: true,
                    width: 1,
                    opacity: .5
                }
            }
        },
        sankey: {
            sourceField: "source",
            targetField: "target",
            weightField: "weight",
            hoverEnabled: true,
            alignment: CENTER,
            adaptiveLayout: {
                width: 80,
                height: 80,
                keepLabels: true
            },
            label: {
                visible: true,
                horizontalOffset: 8,
                verticalOffset: 0,
                overlappingBehavior: "ellipsis",
                useNodeColors: false,
                font: {
                    color: BLACK,
                    weight: 500
                },
                border: {
                    visible: false,
                    width: 2,
                    color: WHITE
                },
                customizeText: function(info) {
                    return info.title
                },
                shadow: {
                    opacity: .2,
                    offsetX: 0,
                    offsetY: 1,
                    blur: 1,
                    color: WHITE
                }
            },
            title: {
                margin: 10,
                font: {
                    size: 28,
                    weight: 200
                },
                subtitle: {
                    font: {
                        size: 16
                    }
                }
            },
            tooltip: {
                enabled: true
            },
            node: {
                padding: 30,
                width: 8,
                opacity: 1,
                border: {
                    color: WHITE,
                    width: 1,
                    visible: false
                },
                hoverStyle: {
                    hatching: {
                        opacity: .75,
                        step: 6,
                        width: 2,
                        direction: RIGHT
                    },
                    border: {}
                }
            },
            link: {
                color: "#888888",
                colorMode: "none",
                opacity: .3,
                border: {
                    color: WHITE,
                    width: 1,
                    visible: false
                },
                hoverStyle: {
                    opacity: .5,
                    hatching: {
                        opacity: .75,
                        step: 6,
                        width: 2,
                        direction: RIGHT
                    },
                    border: {}
                }
            }
        }
    },
    baseThemeName: void 0
}, {
    theme: {
        name: "generic.light.compact"
    },
    baseThemeName: "generic.light"
}]);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/themes/generic.softblue.js":
/*!*************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/themes/generic.softblue.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/viz/core/themes/generic.softblue.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var ACCENT_COLOR = "#7ab8eb";
var BACKGROUND_COLOR = "#fff";
var TITLE_COLOR = "#333";
var SUBTITLE_COLOR = "#99a1a8";
var TEXT_COLOR = "#707070";
var BORDER_COLOR = "#e8eaeb";
/* harmony default export */ __webpack_exports__["default"] = ([{
    theme: {
        name: "generic.softblue",
        defaultPalette: "Soft Blue",
        backgroundColor: BACKGROUND_COLOR,
        primaryTitleColor: TITLE_COLOR,
        secondaryTitleColor: SUBTITLE_COLOR,
        gridColor: BORDER_COLOR,
        axisColor: TEXT_COLOR,
        export: {
            backgroundColor: BACKGROUND_COLOR,
            font: {
                color: TITLE_COLOR
            },
            button: {
                default: {
                    color: TITLE_COLOR,
                    borderColor: "#c9d0d4",
                    backgroundColor: BACKGROUND_COLOR
                },
                hover: {
                    color: TITLE_COLOR,
                    borderColor: "#a7b2b9",
                    backgroundColor: "#e6e6e6"
                },
                focus: {
                    color: TITLE_COLOR,
                    borderColor: "#82929b",
                    backgroundColor: "#e6e6e6"
                },
                active: {
                    color: TITLE_COLOR,
                    borderColor: "#82929b",
                    backgroundColor: "#d4d4d4"
                }
            }
        },
        legend: {
            font: {
                color: TEXT_COLOR
            }
        },
        tooltip: {
            color: BACKGROUND_COLOR,
            border: {
                color: BORDER_COLOR
            },
            font: {
                color: TITLE_COLOR
            }
        },
        "chart:common": {
            commonSeriesSettings: {
                label: {
                    border: {
                        color: BORDER_COLOR
                    }
                }
            }
        },
        "chart:common:annotation": {
            color: BACKGROUND_COLOR,
            border: {
                color: BORDER_COLOR
            },
            font: {
                color: TITLE_COLOR
            }
        },
        chart: {
            commonPaneSettings: {
                border: {
                    color: BORDER_COLOR
                }
            },
            commonAxisSettings: {
                breakStyle: {
                    color: "#cfd2d3"
                }
            }
        },
        rangeSelector: {
            scale: {
                breakStyle: {
                    color: "#cfd2d3"
                },
                tick: {
                    opacity: .12
                }
            },
            selectedRangeColor: ACCENT_COLOR,
            sliderMarker: {
                color: ACCENT_COLOR
            },
            sliderHandle: {
                color: ACCENT_COLOR,
                opacity: .5
            }
        },
        sparkline: {
            pointColor: BACKGROUND_COLOR,
            minColor: "#f0ad4e",
            maxColor: "#d9534f"
        },
        treeMap: {
            group: {
                color: BORDER_COLOR,
                label: {
                    font: {
                        color: SUBTITLE_COLOR
                    }
                }
            }
        },
        bullet: {
            color: ACCENT_COLOR
        },
        gauge: {
            valueIndicators: {
                rangebar: {
                    color: ACCENT_COLOR
                },
                textcloud: {
                    color: ACCENT_COLOR
                }
            }
        }
    },
    baseThemeName: "generic.light"
}, {
    theme: {
        name: "generic.softblue.compact"
    },
    baseThemeName: "generic.softblue"
}]);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/themes/material.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/themes/material.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * DevExtreme (esm/viz/core/themes/material.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var FONT_FAMILY = "'Roboto', 'RobotoFallback', 'Helvetica', 'Arial', sans-serif";
var LIGHT_TITLE_COLOR = "rgba(0,0,0,0.87)";
var LIGHT_LABEL_COLOR = "rgba(0,0,0,0.54)";
var DARK_TITLE_COLOR = "rgba(255,255,255,0.87)";
var DARK_LABEL_COLOR = "rgba(255,255,255,0.54)";
var DARK_BACKGROUND_COLOR = "#363640";
var WHITE = "#ffffff";
var BLACK = "#000000";
var RANGE_COLOR = "#b5b5b5";
var AREA_LAYER_COLOR = "#686868";
var LINE_COLOR = "#c7c7c7";
var TARGET_COLOR = "#8e8e8e";
var POSITIVE_COLOR = "#b8b8b8";
var LABEL_BORDER_COLOR = "#494949";
var BREAK_STYLE_COLOR = "#818181";
var themes = [{
    theme: {
        name: "material",
        defaultPalette: "Material",
        font: {
            family: FONT_FAMILY
        },
        title: {
            margin: {
                top: 20,
                bottom: 20,
                left: 0,
                right: 0
            },
            font: {
                size: 20,
                family: FONT_FAMILY,
                weight: 500
            },
            horizontalAlignment: "left",
            subtitle: {
                font: {
                    size: 14
                },
                horizontalAlignment: "left"
            }
        },
        tooltip: {
            shadow: {
                opacity: 0
            },
            border: {
                visible: false
            },
            paddingLeftRight: 8,
            paddingTopBottom: 6,
            arrowLength: 0,
            location: "edge",
            color: "#616161",
            font: {
                color: WHITE
            },
            cornerRadius: 4
        },
        chart: {
            commonAxisSettings: {
                minorTick: {
                    opacity: .5
                },
                label: {
                    font: {
                        size: 11
                    }
                }
            },
            commonAnnotationSettings: {
                font: {
                    color: WHITE
                },
                border: {
                    color: "#616161"
                },
                color: "#616161",
                arrowLength: 14,
                arrowWidth: 0,
                shadow: {
                    opacity: .08,
                    offsetY: 4,
                    blur: 8
                },
                cornerRadius: 4
            }
        },
        pie: {
            title: {
                horizontalAlignment: "center",
                subtitle: {
                    horizontalAlignment: "center"
                }
            }
        },
        polar: {
            commonAxisSettings: {
                minorTick: {
                    opacity: .5
                }
            },
            title: {
                horizontalAlignment: "center",
                subtitle: {
                    horizontalAlignment: "center"
                }
            }
        },
        funnel: {
            title: {
                horizontalAlignment: "center",
                subtitle: {
                    horizontalAlignment: "center"
                }
            }
        },
        gauge: {
            title: {
                horizontalAlignment: "center",
                subtitle: {
                    horizontalAlignment: "center"
                }
            }
        },
        barGauge: {
            title: {
                horizontalAlignment: "center",
                subtitle: {
                    horizontalAlignment: "center"
                }
            }
        },
        rangeSelector: {
            sliderHandle: {
                opacity: .5
            }
        },
        treeMap: {
            group: {
                label: {
                    font: {
                        weight: 500
                    }
                }
            }
        }
    },
    baseThemeName: "generic.light"
}, {
    theme: {
        name: "material.light",
        gridColor: "#e0e0e0",
        axisColor: LIGHT_LABEL_COLOR,
        primaryTitleColor: LIGHT_TITLE_COLOR,
        legend: {
            font: {
                color: LIGHT_LABEL_COLOR
            }
        },
        chart: {
            scrollBar: {
                color: "#bfbfbf",
                opacity: .7
            }
        },
        gauge: {
            rangeContainer: {
                backgroundColor: "rgba(0,0,0,0.2)"
            }
        },
        barGauge: {
            backgroundColor: "#efefef"
        }
    },
    baseThemeName: "material"
}, {
    theme: {
        name: "material.dark",
        gridColor: "#515159",
        backgroundColor: DARK_BACKGROUND_COLOR,
        axisColor: DARK_LABEL_COLOR,
        font: {
            color: DARK_LABEL_COLOR
        },
        primaryTitleColor: DARK_TITLE_COLOR,
        secondaryTitleColor: DARK_TITLE_COLOR,
        tooltip: {
            color: "#000"
        },
        export: {
            backgroundColor: DARK_BACKGROUND_COLOR,
            font: {
                color: "#dbdbdb"
            },
            button: {
                default: {
                    color: "#dedede",
                    borderColor: "#4d4d4d",
                    backgroundColor: DARK_BACKGROUND_COLOR
                },
                hover: {
                    color: "#dedede",
                    borderColor: "#6c6c6c",
                    backgroundColor: "#3f3f4b"
                },
                focus: {
                    color: "#dedede",
                    borderColor: "#8d8d8d",
                    backgroundColor: "#494956"
                },
                active: {
                    color: "#dedede",
                    borderColor: "#8d8d8d",
                    backgroundColor: "#494956"
                }
            },
            shadowColor: "#292929"
        },
        "chart:common": {
            commonSeriesSettings: {
                label: {
                    border: {
                        color: LABEL_BORDER_COLOR
                    }
                },
                valueErrorBar: {
                    color: WHITE
                }
            }
        },
        "chart:common:axis": {
            constantLineStyle: {
                color: WHITE
            }
        },
        "chart:common:annotation": {
            border: {
                color: "#000"
            },
            color: "#000"
        },
        chart: {
            commonPaneSettings: {
                border: {
                    color: LABEL_BORDER_COLOR
                }
            },
            commonAxisSettings: {
                breakStyle: {
                    color: BREAK_STYLE_COLOR
                }
            },
            zoomAndPan: {
                dragBoxStyle: {
                    color: WHITE
                }
            }
        },
        gauge: {
            rangeContainer: {
                backgroundColor: RANGE_COLOR
            },
            valueIndicators: {
                _default: {
                    color: RANGE_COLOR
                },
                rangebar: {
                    color: "#84788b"
                },
                twocolorneedle: {
                    secondColor: "#ba544d"
                },
                trianglemarker: {
                    color: "#b7918f"
                },
                textcloud: {
                    color: "#ba544d"
                }
            }
        },
        barGauge: {
            backgroundColor: "#3c3c3c"
        },
        rangeSelector: {
            scale: {
                tick: {
                    color: WHITE,
                    opacity: .32
                },
                minorTick: {
                    color: WHITE,
                    opacity: .1
                },
                breakStyle: {
                    color: BREAK_STYLE_COLOR
                }
            },
            selectedRangeColor: RANGE_COLOR,
            sliderMarker: {
                color: RANGE_COLOR,
                font: {
                    color: DARK_BACKGROUND_COLOR
                }
            },
            sliderHandle: {
                color: WHITE,
                opacity: .2
            },
            shutter: {
                color: WHITE,
                opacity: .1
            }
        },
        map: {
            background: {
                borderColor: "#3f3f3f"
            },
            layer: {
                label: {
                    stroke: BLACK,
                    font: {
                        color: WHITE
                    }
                }
            },
            "layer:area": {
                borderColor: DARK_BACKGROUND_COLOR,
                color: AREA_LAYER_COLOR,
                hoveredBorderColor: WHITE,
                selectedBorderColor: WHITE
            },
            "layer:line": {
                color: "#c77244",
                hoveredColor: "#ff5d04",
                selectedColor: "#ff784f"
            },
            "layer:marker:bubble": {
                hoveredBorderColor: WHITE,
                selectedBorderColor: WHITE
            },
            "layer:marker:pie": {
                hoveredBorderColor: WHITE,
                selectedBorderColor: WHITE
            },
            legend: {
                border: {
                    color: "#3f3f3f"
                },
                font: {
                    color: WHITE
                }
            },
            controlBar: {
                borderColor: LINE_COLOR,
                color: DARK_BACKGROUND_COLOR
            }
        },
        treeMap: {
            group: {
                color: "#4c4c4c",
                label: {
                    font: {
                        color: "#a3a3a3"
                    }
                }
            }
        },
        sparkline: {
            lineColor: LINE_COLOR,
            firstLastColor: LINE_COLOR,
            barPositiveColor: POSITIVE_COLOR,
            barNegativeColor: TARGET_COLOR,
            winColor: POSITIVE_COLOR,
            lossColor: TARGET_COLOR,
            pointColor: DARK_BACKGROUND_COLOR
        },
        bullet: {
            targetColor: TARGET_COLOR
        },
        funnel: {
            item: {
                border: {
                    color: DARK_BACKGROUND_COLOR
                }
            }
        },
        sankey: {
            label: {
                font: {
                    color: WHITE
                }
            }
        }
    },
    baseThemeName: "material"
}];

function getMaterialColorScheme(accentName, themeName, accentColor) {
    return {
        theme: {
            name: "material." + accentName + "." + themeName,
            rangeSelector: {
                selectedRangeColor: accentColor,
                sliderMarker: {
                    color: accentColor
                },
                sliderHandle: {
                    color: accentColor
                }
            },
            map: {
                "layer:marker:dot": {
                    color: accentColor
                },
                "layer:marker:bubble": {
                    color: accentColor
                },
                legend: {
                    markerColor: accentColor
                }
            },
            bullet: {
                color: accentColor
            },
            gauge: {
                valueIndicators: {
                    rangebar: {
                        color: accentColor
                    },
                    textcloud: {
                        color: accentColor
                    }
                }
            }
        },
        baseThemeName: "material." + themeName
    }
}
var materialAccents = {
    blue: "#03a9f4",
    lime: "#cddc39",
    orange: "#ff5722",
    purple: "#9c27b0",
    teal: "#009688"
};
for (var accent in materialAccents) {
    if (Object.prototype.hasOwnProperty.call(materialAccents, accent)) {
        var color = materialAccents[accent];
        themes.push(getMaterialColorScheme(accent, "light", color), getMaterialColorScheme(accent, "dark", color), {
            theme: {
                name: "material.".concat(accent, ".light.compact")
            },
            baseThemeName: "material.".concat(accent, ".light")
        }, {
            theme: {
                name: "material.".concat(accent, ".dark.compact")
            },
            baseThemeName: "material.".concat(accent, ".dark")
        })
    }
}
/* harmony default export */ __webpack_exports__["default"] = (themes);


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/title.js":
/*!*******************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/title.js ***!
  \*******************************************************/
/*! exports provided: Title, plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return Title; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _layout_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout_element */ "./node_modules/devextreme/esm/viz/core/layout_element.js");
/**
 * DevExtreme (esm/viz/core/title.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var _Number = Number;
var parseHorizontalAlignment = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["enumParser"])(["left", "center", "right"]);
var parseVerticalAlignment = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["enumParser"])(["top", "bottom"]);
var DEFAULT_MARGIN = 10;

function hasText(text) {
    return !!(text && String(text).length > 0)
}

function processTitleLength(elem, text, width, options, placeholderSize) {
    if (elem.attr({
            text: text
        }).setMaxSize(width, placeholderSize, options).textChanged) {
        elem.setTitle(text)
    }
}

function pickMarginValue(value) {
    return value >= 0 ? _Number(value) : DEFAULT_MARGIN
}

function validateMargin(margin) {
    var result;
    if (margin >= 0) {
        result = {
            left: _Number(margin),
            top: _Number(margin),
            right: _Number(margin),
            bottom: _Number(margin)
        }
    } else {
        margin = margin || {};
        result = {
            left: pickMarginValue(margin.left),
            top: pickMarginValue(margin.top),
            right: pickMarginValue(margin.right),
            bottom: pickMarginValue(margin.bottom)
        }
    }
    return result
}

function checkRect(rect, boundingRect) {
    return rect[2] - rect[0] < boundingRect.width || rect[3] - rect[1] < boundingRect.height
}
var Title = function(params) {
    this._params = params;
    this._group = params.renderer.g().attr({
        class: params.cssClass
    }).linkOn(params.root || params.renderer.root, "title");
    this._hasText = false
};
Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(Title.prototype, _layout_element__WEBPACK_IMPORTED_MODULE_3__["LayoutElement"].prototype, {
    dispose: function() {
        this._group.linkRemove();
        this._group.linkOff();
        if (this._titleElement) {
            this._clipRect.dispose();
            this._titleElement = this._subtitleElement = this._clipRect = null
        }
        this._params = this._group = this._options = null
    },
    _updateOptions: function(options) {
        this._options = options;
        this._options.horizontalAlignment = parseHorizontalAlignment(options.horizontalAlignment, "center");
        this._options.verticalAlignment = parseVerticalAlignment(options.verticalAlignment, "top");
        this._options.margin = validateMargin(options.margin)
    },
    _updateStructure: function() {
        var renderer = this._params.renderer;
        var group = this._group;
        var options = this._options;
        var align = options.horizontalAlignment;
        if (!this._titleElement) {
            this._titleElement = renderer.text().append(group);
            this._subtitleElement = renderer.text();
            this._clipRect = renderer.clipRect();
            group.attr({
                "clip-path": this._clipRect.id
            })
        }
        this._titleElement.attr({
            align: align,
            class: options.cssClass
        });
        this._subtitleElement.attr({
            align: align,
            class: options.subtitle.cssClass
        });
        group.linkAppend();
        hasText(options.subtitle.text) ? this._subtitleElement.append(group) : this._subtitleElement.remove()
    },
    _updateTexts: function() {
        var options = this._options;
        var subtitleOptions = options.subtitle;
        var titleElement = this._titleElement;
        var subtitleElement = this._subtitleElement;
        var titleBox;
        titleElement.attr({
            text: "A",
            y: 0
        }).css(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["patchFontOptions"])(options.font));
        titleBox = titleElement.getBBox();
        this._baseLineCorrection = titleBox.height + titleBox.y;
        titleElement.attr({
            text: options.text
        });
        titleBox = titleElement.getBBox();
        var y = -titleBox.y;
        titleElement.attr({
            y: y
        });
        if (hasText(subtitleOptions.text)) {
            subtitleElement.attr({
                text: subtitleOptions.text,
                y: 0
            }).css(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["patchFontOptions"])(subtitleOptions.font))
        }
    },
    _shiftSubtitle() {
        var titleBox = this._titleElement.getBBox();
        var element = this._subtitleElement;
        var offset = this._options.subtitle.offset;
        element.move(0, titleBox.y + titleBox.height - element.getBBox().y - offset)
    },
    _updateBoundingRectAlignment: function() {
        var boundingRect = this._boundingRect;
        var options = this._options;
        boundingRect.verticalAlignment = options.verticalAlignment;
        boundingRect.horizontalAlignment = options.horizontalAlignment;
        boundingRect.cutLayoutSide = options.verticalAlignment;
        boundingRect.cutSide = "vertical";
        boundingRect.position = {
            horizontal: options.horizontalAlignment,
            vertical: options.verticalAlignment
        }
    },
    hasText: function() {
        return this._hasText
    },
    update: function(themeOptions, userOptions) {
        var options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, themeOptions, processTitleOptions(userOptions));
        var _hasText = hasText(options.text);
        var isLayoutChanged = _hasText || _hasText !== this._hasText;
        this._baseLineCorrection = 0;
        this._updateOptions(options);
        this._boundingRect = {};
        if (_hasText) {
            this._updateStructure();
            this._updateTexts()
        } else {
            this._group.linkRemove()
        }
        this._updateBoundingRect();
        this._updateBoundingRectAlignment();
        this._hasText = _hasText;
        return isLayoutChanged
    },
    draw: function(width, height) {
        if (this._hasText) {
            this._group.linkAppend();
            this._correctTitleLength(width);
            if (this._group.getBBox().height > height) {
                this.freeSpace()
            }
        }
        return this
    },
    _correctTitleLength: function(width) {
        var options = this._options;
        var margin = options.margin;
        var maxWidth = width - margin.left - margin.right;
        var placeholderSize = options.placeholderSize;
        processTitleLength(this._titleElement, options.text, maxWidth, options, placeholderSize);
        if (this._subtitleElement) {
            if (_Number(placeholderSize) > 0) {
                placeholderSize -= this._titleElement.getBBox().height
            }
            processTitleLength(this._subtitleElement, options.subtitle.text, maxWidth, options.subtitle, placeholderSize);
            this._shiftSubtitle()
        }
        this._updateBoundingRect();
        var {
            x: x,
            y: y,
            height: height
        } = this.getCorrectedLayoutOptions();
        this._clipRect.attr({
            x: x,
            y: y,
            width: width,
            height: height
        })
    },
    getLayoutOptions: function() {
        return this._boundingRect || null
    },
    shift: function(x, y) {
        var box = this.getLayoutOptions();
        this._group.move(x - box.x, y - box.y);
        return this
    },
    _updateBoundingRect: function() {
        var options = this._options;
        var margin = options.margin;
        var boundingRect = this._boundingRect;
        var box = this._hasText ? this._group.getBBox() : {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            isEmpty: true
        };
        if (!box.isEmpty) {
            box.height += margin.top + margin.bottom - this._baseLineCorrection;
            box.width += margin.left + margin.right;
            box.x -= margin.left;
            box.y += this._baseLineCorrection - margin.top
        }
        if (options.placeholderSize > 0) {
            box.height = options.placeholderSize
        }
        boundingRect.height = box.height;
        boundingRect.width = box.width;
        boundingRect.x = box.x;
        boundingRect.y = box.y
    },
    getCorrectedLayoutOptions() {
        var srcBox = this.getLayoutOptions();
        var correction = this._baseLineCorrection;
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, srcBox, {
            y: srcBox.y - correction,
            height: srcBox.height + correction
        })
    },
    layoutOptions: function() {
        if (!this._hasText) {
            return null
        }
        return {
            horizontalAlignment: this._boundingRect.horizontalAlignment,
            verticalAlignment: this._boundingRect.verticalAlignment,
            priority: 0
        }
    },
    measure: function(size) {
        this.draw(size[0], size[1]);
        return [this._boundingRect.width, this._boundingRect.height]
    },
    move: function(rect, fitRect) {
        var boundingRect = this._boundingRect;
        if (checkRect(rect, boundingRect)) {
            this.shift(fitRect[0], fitRect[1])
        } else {
            this.shift(Math.round(rect[0]), Math.round(rect[1]))
        }
    },
    freeSpace: function() {
        this._params.incidentOccurred("W2103");
        this._group.linkRemove();
        this._boundingRect.width = this._boundingRect.height = 0
    },
    getOptions: function() {
        return this._options
    },
    changeLink: function(root) {
        this._group.linkRemove();
        this._group.linkOn(root, "title")
    }
});

function processTitleOptions(options) {
    var newOptions = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(options) ? {
        text: options
    } : options || {};
    newOptions.subtitle = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isString"])(newOptions.subtitle) ? {
        text: newOptions.subtitle
    } : newOptions.subtitle || {};
    return newOptions
}
var plugin = {
    name: "title",
    init: function() {
        this._title = new Title({
            renderer: this._renderer,
            cssClass: this._rootClassPrefix + "-title",
            incidentOccurred: this._incidentOccurred
        });
        this._layout.add(this._title)
    },
    dispose: function() {
        this._title.dispose();
        this._title = null
    },
    customize: function(constructor) {
        constructor.addChange({
            code: "TITLE",
            handler: function() {
                if (this._title.update(this._themeManager.theme("title"), this.option("title"))) {
                    this._change(["LAYOUT"])
                }
            },
            isThemeDependent: true,
            option: "title",
            isOptionChange: true
        })
    },
    fontFields: ["title.font", "title.subtitle.font"]
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/tooltip.js":
/*!*********************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/tooltip.js ***!
  \*********************************************************/
/*! exports provided: Tooltip, plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _core_utils_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/size */ "./node_modules/devextreme/esm/core/utils/size.js");
/* harmony import */ var _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/dom_adapter */ "./node_modules/devextreme/esm/core/dom_adapter.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _core_utils_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/dom */ "./node_modules/devextreme/esm/core/utils/dom.js");
/* harmony import */ var _core_utils_inflector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/inflector */ "./node_modules/devextreme/esm/core/utils/inflector.js");
/* harmony import */ var _core_renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/renderer */ "./node_modules/devextreme/esm/core/renderer.js");
/* harmony import */ var _renderers_renderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./renderers/renderer */ "./node_modules/devextreme/esm/viz/core/renderers/renderer.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _format_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../format_helper */ "./node_modules/devextreme/esm/format_helper.js");
/* harmony import */ var _plaque__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./plaque */ "./node_modules/devextreme/esm/viz/core/plaque.js");
/**
 * DevExtreme (esm/viz/core/tooltip.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */












var format = _format_helper__WEBPACK_IMPORTED_MODULE_10__["default"].format;
var mathCeil = Math.ceil;
var mathMax = Math.max;
var mathMin = Math.min;
var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_2__["getWindow"])();
var DEFAULT_HTML_GROUP_WIDTH = 3e3;

function hideElement($element) {
    $element.css({
        left: "-9999px"
    }).detach()
}

function getSpecialFormatOptions(options, specialFormat) {
    var result = options;
    switch (specialFormat) {
        case "argument":
            result = {
                format: options.argumentFormat
            };
            break;
        case "percent":
            result = {
                format: {
                    type: "percent",
                    precision: options.format && options.format.percentPrecision
                }
            }
    }
    return result
}

function createTextHtml() {
    return Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])("<div>").css({
        position: "relative",
        display: "inline-block",
        padding: 0,
        margin: 0,
        border: "0px solid transparent"
    })
}

function removeElements(elements) {
    elements.forEach(el => el.remove())
}
var Tooltip = function(params) {
    this._eventTrigger = params.eventTrigger;
    this._widgetRoot = params.widgetRoot;
    this._widget = params.widget;
    this._textHtmlContainers = [];
    this._wrapper = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])("<div>").css({
        position: "absolute",
        overflow: "hidden",
        pointerEvents: "none"
    }).addClass(params.cssClass);
    var renderer = this._renderer = new _renderers_renderer__WEBPACK_IMPORTED_MODULE_6__["Renderer"]({
        pathModified: params.pathModified,
        container: this._wrapper[0]
    });
    var root = renderer.root;
    root.attr({
        "pointer-events": "none"
    });
    this._text = renderer.text(void 0, 0, 0);
    this._textGroupHtml = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])("<div>").css({
        position: "absolute",
        padding: 0,
        margin: 0,
        border: "0px solid transparent"
    }).appendTo(this._wrapper);
    this._textHtml = createTextHtml().appendTo(this._textGroupHtml)
};
Tooltip.prototype = {
    constructor: Tooltip,
    dispose: function() {
        this._wrapper.remove();
        this._renderer.dispose();
        this._options = this._widgetRoot = null
    },
    _getContainer: function() {
        var options = this._options;
        var container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])(this._widgetRoot).closest(options.container);
        if (0 === container.length) {
            container = Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])(options.container)
        }
        return (container.length ? container : Object(_core_renderer__WEBPACK_IMPORTED_MODULE_5__["default"])("body")).get(0)
    },
    setTemplate(contentTemplate) {
        this._template = contentTemplate ? this._widget._getTemplate(contentTemplate) : null
    },
    setOptions: function(options) {
        options = options || {};
        var that = this;
        that._options = options;
        that._textFontStyles = Object(_utils__WEBPACK_IMPORTED_MODULE_9__["patchFontOptions"])(options.font);
        that._textFontStyles.color = that._textFontStyles.fill;
        that._wrapper.css({
            zIndex: options.zIndex
        });
        that._customizeTooltip = options.customizeTooltip;
        var textGroupHtml = that._textGroupHtml;
        if (this.plaque) {
            this.plaque.clear()
        }
        this.setTemplate(options.contentTemplate);
        var pointerEvents = options.interactive ? "auto" : "none";
        if (options.interactive) {
            this._renderer.root.css({
                "-ms-user-select": "auto",
                "-moz-user-select": "auto",
                "-webkit-user-select": "auto"
            })
        }
        this.plaque = new _plaque__WEBPACK_IMPORTED_MODULE_11__["Plaque"]({
            opacity: that._options.opacity,
            color: that._options.color,
            border: that._options.border,
            paddingLeftRight: that._options.paddingLeftRight,
            paddingTopBottom: that._options.paddingTopBottom,
            arrowLength: that._options.arrowLength,
            arrowWidth: 20,
            shadow: that._options.shadow,
            cornerRadius: that._options.cornerRadius
        }, that, that._renderer.root, _ref => {
            var {
                group: group,
                onRender: onRender,
                eventData: eventData,
                isMoving: isMoving,
                templateCallback: templateCallback = (() => {})
            } = _ref;
            var state = that._state;
            if (!isMoving) {
                var template = that._template;
                var useTemplate = template && !state.formatObject.skipTemplate;
                if (state.html || useTemplate) {
                    textGroupHtml.css({
                        color: state.textColor,
                        width: DEFAULT_HTML_GROUP_WIDTH,
                        pointerEvents: pointerEvents
                    });
                    if (useTemplate) {
                        var htmlContainers = that._textHtmlContainers;
                        var containerToTemplateRender = createTextHtml().appendTo(that._textGroupHtml);
                        htmlContainers.push(containerToTemplateRender);
                        template.render({
                            model: state.formatObject,
                            container: containerToTemplateRender,
                            onRendered: () => {
                                removeElements(htmlContainers.splice(0, htmlContainers.length - 1));
                                that._textHtml = Object(_core_utils_dom__WEBPACK_IMPORTED_MODULE_3__["replaceWith"])(that._textHtml, containerToTemplateRender);
                                state.html = that._textHtml.html();
                                if (0 === Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(that._textHtml) && 0 === Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getHeight"])(that._textHtml)) {
                                    this.plaque.clear();
                                    templateCallback(false);
                                    return
                                }
                                onRender();
                                that._riseEvents(eventData);
                                that._moveWrapper();
                                that.plaque.customizeCloud({
                                    fill: state.color,
                                    stroke: state.borderColor,
                                    "pointer-events": pointerEvents
                                });
                                templateCallback(true);
                                that._textHtmlContainers = []
                            }
                        });
                        return
                    } else {
                        that._text.attr({
                            text: ""
                        });
                        that._textHtml.html(state.html)
                    }
                } else {
                    that._text.css({
                        fill: state.textColor
                    }).attr({
                        text: state.text,
                        class: options.cssClass,
                        "pointer-events": pointerEvents
                    }).append(group.attr({
                        align: options.textAlignment
                    }))
                }
                that._riseEvents(eventData);
                that.plaque.customizeCloud({
                    fill: state.color,
                    stroke: state.borderColor,
                    "pointer-events": pointerEvents
                })
            }
            onRender();
            that._moveWrapper();
            return true
        }, true, (tooltip, g) => {
            var state = tooltip._state;
            if (state.html) {
                var bBox;
                var getComputedStyle = window.getComputedStyle;
                if (getComputedStyle) {
                    bBox = getComputedStyle(that._textHtml.get(0));
                    bBox = {
                        x: 0,
                        y: 0,
                        width: mathCeil(parseFloat(bBox.width)),
                        height: mathCeil(parseFloat(bBox.height))
                    }
                } else {
                    bBox = that._textHtml.get(0).getBoundingClientRect();
                    bBox = {
                        x: 0,
                        y: 0,
                        width: mathCeil(bBox.width ? bBox.width : bBox.right - bBox.left),
                        height: mathCeil(bBox.height ? bBox.height : bBox.bottom - bBox.top)
                    }
                }
                return bBox
            }
            return g.getBBox()
        }, (tooltip, g, x, y) => {
            var state = tooltip._state;
            if (state.html) {
                that._textGroupHtml.css({
                    left: x,
                    top: y
                })
            } else {
                g.move(x, y)
            }
        });
        return that
    },
    _riseEvents: function(eventData) {
        this._eventData && this._eventTrigger("tooltipHidden", this._eventData);
        this._eventData = eventData;
        this._eventTrigger("tooltipShown", this._eventData)
    },
    setRendererOptions: function(options) {
        this._renderer.setOptions(options);
        this._textGroupHtml.css({
            direction: options.rtl ? "rtl" : "ltr"
        });
        return this
    },
    update: function(options) {
        this.setOptions(options);
        hideElement(this._wrapper);
        var normalizedCSS = {};
        for (var name in this._textFontStyles) {
            normalizedCSS[Object(_core_utils_inflector__WEBPACK_IMPORTED_MODULE_4__["camelize"])(name)] = this._textFontStyles[name]
        }
        this._textGroupHtml.css(normalizedCSS);
        this._text.css(this._textFontStyles);
        this._eventData = null;
        return this
    },
    _prepare: function(formatObject, state) {
        var customizeTooltip = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this._customizeTooltip;
        var options = this._options;
        var customize = {};
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isFunction"])(customizeTooltip)) {
            customize = customizeTooltip.call(formatObject, formatObject);
            customize = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isPlainObject"])(customize) ? customize : {};
            if ("text" in customize) {
                state.text = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(customize.text) ? String(customize.text) : ""
            }
            if ("html" in customize) {
                state.html = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_7__["isDefined"])(customize.html) ? String(customize.html) : ""
            }
        }
        if (!("text" in state) && !("html" in state)) {
            state.text = formatObject.valueText || formatObject.description || ""
        }
        state.color = customize.color || options.color;
        state.borderColor = customize.borderColor || (options.border || {}).color;
        state.textColor = customize.fontColor || (this._textFontStyles || {}).color;
        return !!state.text || !!state.html || !!this._template
    },
    show: function(formatObject, params, eventData, customizeTooltip, templateCallback) {
        if (this._options.forceEvents) {
            eventData.x = params.x;
            eventData.y = params.y - params.offset;
            this._riseEvents(eventData);
            return true
        }
        var state = {
            formatObject: formatObject,
            eventData: eventData,
            templateCallback: templateCallback
        };
        if (!this._prepare(formatObject, state, customizeTooltip)) {
            return false
        }
        this._state = state;
        this._wrapper.appendTo(this._getContainer());
        this._clear();
        var parameters = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_8__["extend"])({}, this._options, {
            canvas: this._getCanvas()
        }, state, {
            x: params.x,
            y: params.y,
            offset: params.offset
        });
        return this.plaque.clear().draw(parameters)
    },
    isCursorOnTooltip: function(x, y) {
        if (this._options.interactive) {
            var box = this.plaque.getBBox();
            return x > box.x && x < box.x + box.width && y > box.y && y < box.y + box.height
        }
        return false
    },
    hide: function(isPointerOut) {
        hideElement(this._wrapper);
        if (this._eventData) {
            this._eventTrigger("tooltipHidden", this._options.forceEvents ? Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_8__["extend"])({
                isPointerOut: isPointerOut
            }, this._eventData) : this._eventData);
            this._clear();
            this._eventData = null
        }
    },
    _clear() {
        this._textHtml.empty()
    },
    move: function(x, y, offset) {
        this.plaque.draw({
            x: x,
            y: y,
            offset: offset,
            canvas: this._getCanvas(),
            isMoving: true
        })
    },
    _moveWrapper: function() {
        var plaqueBBox = this.plaque.getBBox();
        this._renderer.resize(plaqueBBox.width, plaqueBBox.height);
        var offset = this._wrapper.css({
            left: 0,
            top: 0
        }).offset();
        var left = plaqueBBox.x;
        var top = plaqueBBox.y;
        this._wrapper.css({
            left: left - offset.left,
            top: top - offset.top
        });
        this.plaque.moveRoot(-left, -top);
        if (this._state.html) {
            this._textHtml.css({
                left: -left,
                top: -top
            });
            this._textGroupHtml.css({
                width: mathCeil(Object(_core_utils_size__WEBPACK_IMPORTED_MODULE_0__["getWidth"])(this._textHtml))
            })
        }
    },
    formatValue: function(value, _specialFormat) {
        var options = _specialFormat ? getSpecialFormatOptions(this._options, _specialFormat) : this._options;
        return format(value, options.format)
    },
    getOptions() {
        return this._options
    },
    getLocation: function() {
        return Object(_utils__WEBPACK_IMPORTED_MODULE_9__["normalizeEnum"])(this._options.location)
    },
    isEnabled: function() {
        return !!this._options.enabled || !!this._options.forceEvents
    },
    isShared: function() {
        return !!this._options.shared
    },
    _getCanvas: function() {
        var container = this._getContainer();
        var containerBox = container.getBoundingClientRect();
        var html = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getDocumentElement();
        var document = _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getDocument();
        var left = window.pageXOffset || html.scrollLeft || 0;
        var top = window.pageYOffset || html.scrollTop || 0;
        var box = {
            left: left,
            top: top,
            width: mathMax(html.clientWidth, document.body.clientWidth) + left,
            height: mathMax(document.body.scrollHeight, html.scrollHeight, document.body.offsetHeight, html.offsetHeight, document.body.clientHeight, html.clientHeight),
            right: 0,
            bottom: 0
        };
        if (container !== _core_dom_adapter__WEBPACK_IMPORTED_MODULE_1__["default"].getBody()) {
            left = mathMax(box.left, box.left + containerBox.left);
            top = mathMax(box.top, box.top + containerBox.top);
            box.width = mathMin(containerBox.width, box.width) + left + box.left;
            box.height = mathMin(containerBox.height, box.height) + top + box.top;
            box.left = left;
            box.top = top
        }
        return box
    }
};
var plugin = {
    name: "tooltip",
    init: function() {
        this._initTooltip()
    },
    dispose: function() {
        this._disposeTooltip()
    },
    members: {
        _initTooltip: function() {
            this._tooltip = new Tooltip({
                cssClass: this._rootClassPrefix + "-tooltip",
                eventTrigger: this._eventTrigger,
                pathModified: this.option("pathModified"),
                widgetRoot: this.element(),
                widget: this
            })
        },
        _disposeTooltip: function() {
            this._tooltip.dispose();
            this._tooltip = null
        },
        _setTooltipRendererOptions: function() {
            this._tooltip.setRendererOptions(this._getRendererOptions())
        },
        _setTooltipOptions: function() {
            this._tooltip.update(this._getOption("tooltip"))
        }
    },
    extenders: {
        _stopCurrentHandling() {
            this._tooltip && this._tooltip.hide()
        }
    },
    customize: function(constructor) {
        var proto = constructor.prototype;
        proto._eventsMap.onTooltipShown = {
            name: "tooltipShown"
        };
        proto._eventsMap.onTooltipHidden = {
            name: "tooltipHidden"
        };
        constructor.addChange({
            code: "TOOLTIP_RENDERER",
            handler: function() {
                this._setTooltipRendererOptions()
            },
            isThemeDependent: true,
            isOptionChange: true
        });
        constructor.addChange({
            code: "TOOLTIP",
            handler: function() {
                this._setTooltipOptions()
            },
            isThemeDependent: true,
            isOptionChange: true,
            option: "tooltip"
        })
    },
    fontFields: ["tooltip.font"]
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/core/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/core/utils.js ***!
  \*******************************************************/
/*! exports provided: PANE_PADDING, getLog, getAdjustedLog10, raiseTo, normalizeAngle, convertAngleToRendererSpace, degreesToRadians, getCosAndSin, getDistance, getDecimalOrder, getAppropriateFormat, roundValue, getPower, map, normalizeEnum, setCanvasValues, normalizeBBox, rotateBBox, decreaseGaps, parseScalar, enumParser, patchFontOptions, convertPolarToXY, convertXYToPolar, processSeriesTemplate, getCategoriesInfo, isRelativeHeightPane, normalizePanesHeight, updatePanesCanvases, unique, getVerticallyShiftedAngularCoords, mergeMarginOptions, getVizRangeObject, convertVisualRangeObject, getAddFunction, adjustVisualRange, getLogExt, raiseToExt, rangesAreEqual, valueOf, pointInCanvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PANE_PADDING", function() { return PANE_PADDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLog", function() { return getLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAdjustedLog10", function() { return getAdjustedLog10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raiseTo", function() { return raiseTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeAngle", function() { return normalizeAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertAngleToRendererSpace", function() { return convertAngleToRendererSpace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degreesToRadians", function() { return degreesToRadians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCosAndSin", function() { return getCosAndSin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistance", function() { return getDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDecimalOrder", function() { return getDecimalOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppropriateFormat", function() { return getAppropriateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundValue", function() { return roundValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPower", function() { return getPower; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeEnum", function() { return normalizeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCanvasValues", function() { return setCanvasValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeBBox", function() { return normalizeBBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateBBox", function() { return rotateBBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decreaseGaps", function() { return decreaseGaps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseScalar", function() { return parseScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enumParser", function() { return enumParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patchFontOptions", function() { return patchFontOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertPolarToXY", function() { return convertPolarToXY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertXYToPolar", function() { return convertXYToPolar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processSeriesTemplate", function() { return processSeriesTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCategoriesInfo", function() { return getCategoriesInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRelativeHeightPane", function() { return isRelativeHeightPane; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizePanesHeight", function() { return normalizePanesHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePanesCanvases", function() { return updatePanesCanvases; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unique", function() { return unique; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVerticallyShiftedAngularCoords", function() { return getVerticallyShiftedAngularCoords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeMarginOptions", function() { return mergeMarginOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVizRangeObject", function() { return getVizRangeObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertVisualRangeObject", function() { return convertVisualRangeObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAddFunction", function() { return getAddFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjustVisualRange", function() { return adjustVisualRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLogExt", function() { return getLogExt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raiseToExt", function() { return raiseToExt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangesAreEqual", function() { return rangesAreEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valueOf", function() { return valueOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointInCanvas", function() { return pointInCanvas; });
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/* harmony import */ var _core_utils_date__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/date */ "./node_modules/devextreme/esm/core/utils/date.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../color */ "./node_modules/devextreme/esm/color.js");
/**
 * DevExtreme (esm/viz/core/utils.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var {
    PI: PI,
    LN10: LN10,
    abs: abs,
    log: log,
    floor: floor,
    ceil: ceil,
    pow: pow,
    sqrt: sqrt,
    atan2: atan2
} = Math;
var _min = Math.min;
var _max = Math.max;
var _cos = Math.cos;
var _sin = Math.sin;
var _round = Math.round;
var dateToMilliseconds = _core_utils_date__WEBPACK_IMPORTED_MODULE_5__["default"].dateToMilliseconds;
var MAX_PIXEL_COUNT = 1e10;
var PI_DIV_180 = PI / 180;
var _isNaN = isNaN;
var _Number = Number;
var _NaN = NaN;
var PANE_PADDING = 10;
var getLog = function(value, base) {
    if (!value) {
        return _NaN
    }
    return log(value) / log(base)
};
var getAdjustedLog10 = function(value) {
    return Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(getLog(value, 10))
};
var raiseTo = function(power, base) {
    return pow(base, power)
};
var normalizeAngle = function(angle) {
    return (angle % 360 + 360) % 360
};
var convertAngleToRendererSpace = function(angle) {
    return 90 - angle
};
var degreesToRadians = function(value) {
    return PI * value / 180
};
var getCosAndSin = function(angle) {
    var angleInRadians = degreesToRadians(angle);
    return {
        cos: _cos(angleInRadians),
        sin: _sin(angleInRadians)
    }
};
var DECIMAL_ORDER_THRESHOLD = 1e-14;
var getDistance = function(x1, y1, x2, y2) {
    var diffX = x2 - x1;
    var diffY = y2 - y1;
    return sqrt(diffY * diffY + diffX * diffX)
};
var getDecimalOrder = function(number) {
    var n = abs(number);
    var cn;
    if (!_isNaN(n)) {
        if (n > 0) {
            n = log(n) / LN10;
            cn = ceil(n);
            return cn - n < DECIMAL_ORDER_THRESHOLD ? cn : floor(n)
        }
        return 0
    }
    return _NaN
};
var getAppropriateFormat = function(start, end, count) {
    var order = _max(getDecimalOrder(start), getDecimalOrder(end));
    var precision = -getDecimalOrder(abs(end - start) / count);
    var format;
    if (!_isNaN(order) && !_isNaN(precision)) {
        if (abs(order) <= 4) {
            format = "fixedPoint";
            precision < 0 && (precision = 0);
            precision > 4 && (precision = 4)
        } else {
            format = "exponential";
            precision += order - 1;
            precision > 3 && (precision = 3)
        }
        return {
            type: format,
            precision: precision
        }
    }
    return null
};
var roundValue = function(value, precision) {
    if (precision > 20) {
        precision = 20
    }
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(value)) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isExponential"])(value)) {
            return _Number(value.toExponential(precision))
        } else {
            return _Number(value.toFixed(precision))
        }
    }
};
var getPower = function(value) {
    return value.toExponential().split("e")[1]
};
function map(array, callback) {
    var i = 0;
    var len = array.length;
    var result = [];
    var value;
    while (i < len) {
        value = callback(array[i], i);
        if (null !== value) {
            result.push(value)
        }
        i++
    }
    return result
}

function selectByKeys(object, keys) {
    return map(keys, key => object[key] ? object[key] : null)
}

function decreaseFields(object, keys, eachDecrease, decrease) {
    var dec = decrease;
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(keys, (_, key) => {
        if (object[key]) {
            object[key] -= eachDecrease;
            dec -= eachDecrease
        }
    });
    return dec
}
function normalizeEnum(value) {
    return String(value).toLowerCase()
}
function setCanvasValues(canvas) {
    if (canvas) {
        canvas.originalTop = canvas.top;
        canvas.originalBottom = canvas.bottom;
        canvas.originalLeft = canvas.left;
        canvas.originalRight = canvas.right
    }
    return canvas
}

function normalizeBBoxField(value) {
    return -MAX_PIXEL_COUNT < value && value < +MAX_PIXEL_COUNT ? value : 0
}
function normalizeBBox(bBox) {
    var xl = normalizeBBoxField(floor(bBox.x));
    var yt = normalizeBBoxField(floor(bBox.y));
    var xr = normalizeBBoxField(ceil(bBox.width + bBox.x));
    var yb = normalizeBBoxField(ceil(bBox.height + bBox.y));
    var result = {
        x: xl,
        y: yt,
        width: xr - xl,
        height: yb - yt
    };
    result.isEmpty = !result.x && !result.y && !result.width && !result.height;
    return result
}
function rotateBBox(bBox, center, angle) {
    var cos = _Number(_cos(angle * PI_DIV_180).toFixed(3));
    var sin = _Number(_sin(angle * PI_DIV_180).toFixed(3));
    var w2 = bBox.width / 2;
    var h2 = bBox.height / 2;
    var centerX = bBox.x + w2;
    var centerY = bBox.y + h2;
    var w2_ = abs(w2 * cos) + abs(h2 * sin);
    var h2_ = abs(w2 * sin) + abs(h2 * cos);
    var centerX_ = center[0] + (centerX - center[0]) * cos + (centerY - center[1]) * sin;
    var centerY_ = center[1] - (centerX - center[0]) * sin + (centerY - center[1]) * cos;
    return normalizeBBox({
        x: centerX_ - w2_,
        y: centerY_ - h2_,
        width: 2 * w2_,
        height: 2 * h2_
    })
}
var decreaseGaps = function(object, keys, decrease) {
    var arrayGaps;
    do {
        arrayGaps = selectByKeys(object, keys);
        arrayGaps.push(ceil(decrease / arrayGaps.length));
        decrease = decreaseFields(object, keys, _min.apply(null, arrayGaps), decrease)
    } while (decrease > 0 && arrayGaps.length > 1);
    return decrease
};
var parseScalar = function(value, defaultValue) {
    return void 0 !== value ? value : defaultValue
};
var enumParser = function(values) {
    var stored = {};
    var i;
    var ii;
    for (i = 0, ii = values.length; i < ii; ++i) {
        stored[normalizeEnum(values[i])] = 1
    }
    return function(value, defaultValue) {
        var _value = normalizeEnum(value);
        return stored[_value] ? _value : defaultValue
    }
};
var patchFontOptions = function(options) {
    var fontOptions = {};
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(options || {}, (function(key, value) {
        if (/^(cursor)$/i.test(key)) {} else if ("opacity" === key) {
            value = null
        } else if ("color" === key) {
            key = "fill";
            if ("opacity" in options) {
                var color = new _color__WEBPACK_IMPORTED_MODULE_6__["default"](value);
                value = "rgba(".concat(color.r, ",").concat(color.g, ",").concat(color.b, ",").concat(options.opacity, ")")
            }
        } else {
            key = "font-" + key
        }
        fontOptions[key] = value
    }));
    return fontOptions
};
function convertPolarToXY(centerCoords, startAngle, angle, radius) {
    var normalizedRadius = radius > 0 ? radius : 0;
    angle = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(angle) ? angle + startAngle - 90 : 0;
    var cosSin = getCosAndSin(angle);
    return {
        x: _round(centerCoords.x + normalizedRadius * cosSin.cos),
        y: _round(centerCoords.y + normalizedRadius * cosSin.sin)
    }
}
var convertXYToPolar = function(centerCoords, x, y) {
    var radius = getDistance(centerCoords.x, centerCoords.y, x, y);
    var angle = atan2(y - centerCoords.y, x - centerCoords.x);
    return {
        phi: _round(normalizeAngle(180 * angle / PI)),
        r: _round(radius)
    }
};
var processSeriesTemplate = function(seriesTemplate, items) {
    var customizeSeries = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFunction"])(seriesTemplate.customizeSeries) ? seriesTemplate.customizeSeries : _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"];
    var nameField = seriesTemplate.nameField;
    var generatedSeries = {};
    var seriesOrder = [];
    var series;
    var i = 0;
    var length;
    var data;
    items = items || [];
    for (length = items.length; i < length; i++) {
        data = items[i];
        if (nameField in data) {
            series = generatedSeries[data[nameField]];
            if (!series) {
                series = generatedSeries[data[nameField]] = {
                    name: data[nameField],
                    nameFieldValue: data[nameField]
                };
                seriesOrder.push(series.name)
            }
        }
    }
    return map(seriesOrder, (function(orderedName) {
        var group = generatedSeries[orderedName];
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(group, customizeSeries.call(null, group.name))
    }))
};
var getCategoriesInfo = function(categories, startValue, endValue) {
    if (0 === categories.length) {
        return {
            categories: []
        }
    }
    startValue = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(startValue) ? startValue : categories[0];
    endValue = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(endValue) ? endValue : categories[categories.length - 1];
    var categoriesValue = map(categories, category => null === category || void 0 === category ? void 0 : category.valueOf());
    var indexStartValue = categoriesValue.indexOf(startValue.valueOf());
    var indexEndValue = categoriesValue.indexOf(endValue.valueOf());
    var swapBuf;
    var inverted = false;
    indexStartValue < 0 && (indexStartValue = 0);
    indexEndValue < 0 && (indexEndValue = categories.length - 1);
    if (indexEndValue < indexStartValue) {
        swapBuf = indexEndValue;
        indexEndValue = indexStartValue;
        indexStartValue = swapBuf;
        inverted = true
    }
    var visibleCategories = categories.slice(indexStartValue, indexEndValue + 1);
    var lastIdx = visibleCategories.length - 1;
    return {
        categories: visibleCategories,
        start: visibleCategories[inverted ? lastIdx : 0],
        end: visibleCategories[inverted ? 0 : lastIdx],
        inverted: inverted
    }
};
function isRelativeHeightPane(pane) {
    return !(pane.unit % 2)
}
function normalizePanesHeight(panes) {
    panes.forEach(pane => {
        var height = pane.height;
        var unit = 0;
        var parsedHeight = parseFloat(height) || void 0;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isString"])(height) && height.indexOf("px") > -1 || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(height) && height > 1) {
            parsedHeight = _round(parsedHeight);
            unit = 1
        }
        if (!unit && parsedHeight) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isString"])(height) && height.indexOf("%") > -1) {
                parsedHeight /= 100;
                unit = 2
            } else if (parsedHeight < 0) {
                parsedHeight = parsedHeight < -1 ? 1 : abs(parsedHeight)
            }
        }
        pane.height = parsedHeight;
        pane.unit = unit
    });
    var relativeHeightPanes = panes.filter(isRelativeHeightPane);
    var weightSum = relativeHeightPanes.reduce((prev, next) => prev + (next.height || 0), 0);
    var weightHeightCount = relativeHeightPanes.length;
    var emptyHeightPanes = relativeHeightPanes.filter(pane => !pane.height);
    var emptyHeightCount = emptyHeightPanes.length;
    if (weightSum < 1 && emptyHeightCount) {
        emptyHeightPanes.forEach(pane => pane.height = (1 - weightSum) / emptyHeightCount)
    } else if (weightSum > 1 || weightSum < 1 && !emptyHeightCount || 1 === weightSum && emptyHeightCount) {
        if (emptyHeightCount) {
            var weightForEmpty = weightSum / weightHeightCount;
            var emptyWeightSum = emptyHeightCount * weightForEmpty;
            relativeHeightPanes.filter(pane => pane.height).forEach(pane => pane.height *= (weightSum - emptyWeightSum) / weightSum);
            emptyHeightPanes.forEach(pane => pane.height = weightForEmpty)
        }
        relativeHeightPanes.forEach(pane => pane.height *= 1 / weightSum)
    }
}
function updatePanesCanvases(panes, canvas, rotated) {
    var distributedSpace = 0;
    var padding = PANE_PADDING;
    var paneSpace = rotated ? canvas.width - canvas.left - canvas.right : canvas.height - canvas.top - canvas.bottom;
    var totalCustomSpace = panes.reduce((prev, cur) => prev + (!isRelativeHeightPane(cur) ? cur.height : 0), 0);
    var usefulSpace = paneSpace - padding * (panes.length - 1) - totalCustomSpace;
    var startName = rotated ? "left" : "top";
    var endName = rotated ? "right" : "bottom";
    panes.forEach(pane => {
        var calcLength = !isRelativeHeightPane(pane) ? pane.height : _round(pane.height * usefulSpace);
        pane.canvas = pane.canvas || {};
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(pane.canvas, canvas);
        pane.canvas[startName] = canvas[startName] + distributedSpace;
        pane.canvas[endName] = canvas[endName] + (paneSpace - calcLength - distributedSpace);
        distributedSpace = distributedSpace + calcLength + padding;
        setCanvasValues(pane.canvas)
    })
}
var unique = function(array) {
    var values = {};
    return map(array, (function(item) {
        var result = !values[item] ? item : null;
        values[item] = true;
        return result
    }))
};
var getVerticallyShiftedAngularCoords = function(bBox, dy, center) {
    var isPositive = bBox.x + bBox.width / 2 >= center.x;
    var horizontalOffset1 = (isPositive ? bBox.x : bBox.x + bBox.width) - center.x;
    var verticalOffset1 = bBox.y - center.y;
    var verticalOffset2 = verticalOffset1 + dy;
    var horizontalOffset2 = _round(sqrt(horizontalOffset1 * horizontalOffset1 + verticalOffset1 * verticalOffset1 - verticalOffset2 * verticalOffset2));
    var dx = (isPositive ? +horizontalOffset2 : -horizontalOffset2) || horizontalOffset1;
    return {
        x: center.x + (isPositive ? dx : dx - bBox.width),
        y: bBox.y + dy
    }
};
function mergeMarginOptions(opt1, opt2) {
    return {
        checkInterval: opt1.checkInterval || opt2.checkInterval,
        size: _max(opt1.size || 0, opt2.size || 0),
        percentStick: opt1.percentStick || opt2.percentStick,
        sizePointNormalState: _max(opt1.sizePointNormalState || 0, opt2.sizePointNormalState || 0)
    }
}
function getVizRangeObject(value) {
    if (Array.isArray(value)) {
        return {
            startValue: value[0],
            endValue: value[1]
        }
    } else {
        return value || {}
    }
}
function convertVisualRangeObject(visualRange, convertToVisualRange) {
    if (convertToVisualRange) {
        return visualRange
    }
    return [visualRange.startValue, visualRange.endValue]
}
function getAddFunction(range, correctZeroLevel) {
    if ("datetime" === range.dataType) {
        return function(rangeValue, marginValue) {
            var sign = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            return new Date(rangeValue.getTime() + sign * marginValue)
        }
    }
    if ("logarithmic" === range.axisType) {
        return function(rangeValue, marginValue) {
            var sign = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
            var log = getLogExt(rangeValue, range.base) + sign * marginValue;
            return raiseToExt(log, range.base)
        }
    }
    return function(rangeValue, marginValue) {
        var sign = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
        var newValue = rangeValue + sign * marginValue;
        return correctZeroLevel && newValue * rangeValue <= 0 ? 0 : newValue
    }
}
function adjustVisualRange(options, visualRange, wholeRange, dataRange) {
    var minDefined = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(visualRange.startValue);
    var maxDefined = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(visualRange.endValue);
    var nonDiscrete = "discrete" !== options.axisType;
    dataRange = dataRange || wholeRange;
    var add = getAddFunction(options, false);
    var min = minDefined ? visualRange.startValue : dataRange.min;
    var max = maxDefined ? visualRange.endValue : dataRange.max;
    var rangeLength = visualRange.length;
    var categories = dataRange.categories;
    if (nonDiscrete && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(min) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(max)) {
        return {
            startValue: min,
            endValue: max
        }
    }
    if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(rangeLength)) {
        if (nonDiscrete) {
            if ("datetime" === options.dataType && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(rangeLength)) {
                rangeLength = dateToMilliseconds(rangeLength)
            }
            if (maxDefined && !minDefined || !maxDefined && !minDefined) {
                Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(wholeRange.max) && (max = max > wholeRange.max ? wholeRange.max : max);
                min = add(max, rangeLength, -1)
            } else if (minDefined && !maxDefined) {
                Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(wholeRange.min) && (min = min < wholeRange.min ? wholeRange.min : min);
                max = add(min, rangeLength)
            }
        } else {
            rangeLength = parseInt(rangeLength);
            if (!isNaN(rangeLength) && isFinite(rangeLength)) {
                rangeLength--;
                if (!maxDefined && !minDefined) {
                    max = categories[categories.length - 1];
                    min = categories[categories.length - 1 - rangeLength]
                } else if (minDefined && !maxDefined) {
                    var categoriesInfo = getCategoriesInfo(categories, min, void 0);
                    max = categoriesInfo.categories[rangeLength]
                } else if (!minDefined && maxDefined) {
                    var _categoriesInfo = getCategoriesInfo(categories, void 0, max);
                    min = _categoriesInfo.categories[_categoriesInfo.categories.length - 1 - rangeLength]
                }
            }
        }
    }
    if (nonDiscrete) {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(wholeRange.max) && max > wholeRange.max) {
            max = wholeRange.max
        }
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(wholeRange.min) && min < wholeRange.min) {
            min = wholeRange.min
        }
    }
    return {
        startValue: min,
        endValue: max
    }
}
function getLogExt(value, base) {
    var allowNegatives = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
    var linearThreshold = arguments.length > 3 ? arguments[3] : void 0;
    if (!allowNegatives) {
        return getLog(value, base)
    }
    if (0 === value) {
        return 0
    }
    var transformValue = getLog(abs(value), base) - (linearThreshold - 1);
    if (transformValue < 0) {
        return 0
    }
    return Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["sign"])(value) * transformValue, Number(pow(base, linearThreshold - 1).toFixed(abs(linearThreshold))))
}
function raiseToExt(value, base) {
    var allowNegatives = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
    var linearThreshold = arguments.length > 3 ? arguments[3] : void 0;
    if (!allowNegatives) {
        return raiseTo(value, base)
    }
    if (0 === value) {
        return 0
    }
    var transformValue = raiseTo(abs(value) + (linearThreshold - 1), base);
    if (transformValue < 0) {
        return 0
    }
    return Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["adjust"])(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_4__["sign"])(value) * transformValue, Number(pow(base, linearThreshold).toFixed(abs(linearThreshold))))
}
function rangesAreEqual(range, rangeFromOptions) {
    if (Array.isArray(rangeFromOptions)) {
        return range.length === rangeFromOptions.length && range.every((item, i) => valueOf(item) === valueOf(rangeFromOptions[i]))
    } else {
        return valueOf(range.startValue) === valueOf(rangeFromOptions.startValue) && valueOf(range.endValue) === valueOf(rangeFromOptions.endValue)
    }
}
function valueOf(value) {
    return value && value.valueOf()
}
function pointInCanvas(canvas, x, y) {
    return x >= canvas.left && x <= canvas.right && y >= canvas.top && y <= canvas.bottom
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/palette.js":
/*!****************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/palette.js ***!
  \****************************************************/
/*! exports provided: currentPalette, generateColors, getPalette, registerPalette, getAccentColor, createPalette, getDiscretePalette, getGradientPalette */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentPalette", function() { return currentPalette; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateColors", function() { return generateColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPalette", function() { return getPalette; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerPalette", function() { return registerPalette; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAccentColor", function() { return getAccentColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPalette", function() { return createPalette; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDiscretePalette", function() { return getDiscretePalette; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGradientPalette", function() { return getGradientPalette; });
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../color */ "./node_modules/devextreme/esm/color.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/viz/palette.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _floor = Math.floor;
var _ceil = Math.ceil;

var _isArray = Array.isArray;

var HIGHLIGHTING_STEP = 50;
var DEFAULT_PALETTE = "material";
var officePalette = {
    simpleSet: ["#5f8b95", "#ba4d51", "#af8a53", "#955f71", "#859666", "#7e688c"],
    indicatingSet: ["#a3b97c", "#e1b676", "#ec7f83"],
    gradientSet: ["#5f8b95", "#ba4d51"],
    accentColor: "#ba4d51"
};
var palettes = {
    [DEFAULT_PALETTE]: {
        simpleSet: ["#1db2f5", "#f5564a", "#97c95c", "#ffc720", "#eb3573", "#a63db8"],
        indicatingSet: ["#97c95c", "#ffc720", "#f5564a"],
        gradientSet: ["#1db2f5", "#97c95c"],
        accentColor: "#1db2f5"
    },
    office: officePalette,
    "harmony light": {
        simpleSet: ["#fcb65e", "#679ec5", "#ad79ce", "#7abd5c", "#e18e92", "#b6d623", "#b7abea", "#85dbd5"],
        indicatingSet: ["#b6d623", "#fcb65e", "#e18e92"],
        gradientSet: ["#7abd5c", "#fcb65e"],
        accentColor: "#679ec5"
    },
    "soft pastel": {
        simpleSet: ["#60a69f", "#78b6d9", "#6682bb", "#a37182", "#eeba69", "#90ba58", "#456c68", "#7565a4"],
        indicatingSet: ["#90ba58", "#eeba69", "#a37182"],
        gradientSet: ["#78b6d9", "#eeba69"],
        accentColor: "#60a69f"
    },
    pastel: {
        simpleSet: ["#bb7862", "#70b3a1", "#bb626a", "#057d85", "#ab394b", "#dac599", "#153459", "#b1d2c6"],
        indicatingSet: ["#70b3a1", "#dac599", "#bb626a"],
        gradientSet: ["#bb7862", "#70b3a1"],
        accentColor: "#bb7862"
    },
    bright: {
        simpleSet: ["#70c92f", "#f8ca00", "#bd1550", "#e97f02", "#9d419c", "#7e4452", "#9ab57e", "#36a3a6"],
        indicatingSet: ["#70c92f", "#f8ca00", "#bd1550"],
        gradientSet: ["#e97f02", "#f8ca00"],
        accentColor: "#e97f02"
    },
    soft: {
        simpleSet: ["#cbc87b", "#9ab57e", "#e55253", "#7e4452", "#e8c267", "#565077", "#6babac", "#ad6082"],
        indicatingSet: ["#9ab57e", "#e8c267", "#e55253"],
        gradientSet: ["#9ab57e", "#e8c267"],
        accentColor: "#565077"
    },
    ocean: {
        simpleSet: ["#75c099", "#acc371", "#378a8a", "#5fa26a", "#064970", "#38c5d2", "#00a7c6", "#6f84bb"],
        indicatingSet: ["#c8e394", "#7bc59d", "#397c8b"],
        gradientSet: ["#acc371", "#38c5d2"],
        accentColor: "#378a8a"
    },
    vintage: {
        simpleSet: ["#dea484", "#efc59c", "#cb715e", "#eb9692", "#a85c4c", "#f2c0b5", "#c96374", "#dd956c"],
        indicatingSet: ["#ffe5c6", "#f4bb9d", "#e57660"],
        gradientSet: ["#efc59c", "#cb715e"],
        accentColor: "#cb715e"
    },
    violet: {
        simpleSet: ["#d1a1d1", "#eeacc5", "#7b5685", "#7e7cad", "#a13d73", "#5b41ab", "#e287e2", "#689cc1"],
        indicatingSet: ["#d8e2f6", "#d0b2da", "#d56a8a"],
        gradientSet: ["#eeacc5", "#7b5685"],
        accentColor: "#7b5685"
    },
    carmine: {
        simpleSet: ["#fb7764", "#73d47f", "#fed85e", "#d47683", "#dde392", "#757ab2"],
        indicatingSet: ["#5cb85c", "#f0ad4e", "#d9534f"],
        gradientSet: ["#fb7764", "#73d47f"],
        accentColor: "#f05b41"
    },
    "dark moon": {
        simpleSet: ["#4ddac1", "#f4c99a", "#80dd9b", "#f998b3", "#4aaaa0", "#a5aef1"],
        indicatingSet: ["#59d8a4", "#f0ad4e", "#f9517e"],
        gradientSet: ["#4ddac1", "#f4c99a"],
        accentColor: "#3debd3"
    },
    "soft blue": {
        simpleSet: ["#7ab8eb", "#97da97", "#facb86", "#e78683", "#839bda", "#4db7be"],
        indicatingSet: ["#5cb85c", "#f0ad4e", "#d9534f"],
        gradientSet: ["#7ab8eb", "#97da97"],
        accentColor: "#7ab8eb"
    },
    "dark violet": {
        simpleSet: ["#9c63ff", "#64c064", "#eead51", "#d2504b", "#4b6bbf", "#2da7b0"],
        indicatingSet: ["#5cb85c", "#f0ad4e", "#d9534f"],
        gradientSet: ["#9c63ff", "#64c064"],
        accentColor: "#9c63ff"
    },
    "green mist": {
        simpleSet: ["#3cbab2", "#8ed962", "#5b9d95", "#efcc7c", "#f1929f", "#4d8dab"],
        indicatingSet: ["#72d63c", "#ffc852", "#f74a5e"],
        gradientSet: ["#3cbab2", "#8ed962"],
        accentColor: "#3cbab2"
    }
};
var currentPaletteName;
function currentPalette(name) {
    if (void 0 === name) {
        return currentPaletteName || DEFAULT_PALETTE
    } else {
        name = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["normalizeEnum"])(name);
        currentPaletteName = name in palettes ? name : void 0
    }
}
function generateColors(palette, count) {
    var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
        keepLastColorInEnd: false
    };
    options.type = options.baseColorSet;
    options.extensionMode = options.paletteExtensionMode;
    return createPalette(palette, options).generateColors(count)
}
function getPalette(palette, parameters) {
    parameters = parameters || {};
    palette = palette || (void 0 === currentPaletteName ? parameters.themeDefault : currentPalette());
    var result;
    var type = parameters.type;
    if (_isArray(palette)) {
        return palette.slice(0)
    } else {
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isString"])(palette)) {
            result = palettes[Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["normalizeEnum"])(palette)]
        }
        if (!result) {
            result = palettes[currentPalette()]
        }
    }
    return type ? result[type].slice(0) : result
}
function registerPalette(name, palette) {
    var item = {};
    var paletteName;
    if (_isArray(palette)) {
        item.simpleSet = palette.slice(0)
    } else if (palette) {
        item.simpleSet = _isArray(palette.simpleSet) ? palette.simpleSet.slice(0) : void 0;
        item.indicatingSet = _isArray(palette.indicatingSet) ? palette.indicatingSet.slice(0) : void 0;
        item.gradientSet = _isArray(palette.gradientSet) ? palette.gradientSet.slice(0) : void 0;
        item.accentColor = palette.accentColor
    }
    if (!item.accentColor) {
        item.accentColor = item.simpleSet && item.simpleSet[0]
    }
    if (item.simpleSet || item.indicatingSet || item.gradientSet) {
        paletteName = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["normalizeEnum"])(name);
        Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(palettes[paletteName] = palettes[paletteName] || {}, item)
    }
}
function getAccentColor(palette, themeDefault) {
    palette = getPalette(palette, {
        themeDefault: themeDefault
    });
    return palette.accentColor || palette[0]
}

function RingBuf(buf) {
    var ind = 0;
    this.next = function() {
        var res = buf[ind++];
        if (ind === buf.length) {
            this.reset()
        }
        return res
    };
    this.reset = function() {
        ind = 0
    }
}

function getAlternateColorsStrategy(palette, parameters) {
    var stepHighlight = parameters.useHighlight ? HIGHLIGHTING_STEP : 0;
    var paletteSteps = new RingBuf([0, stepHighlight, -stepHighlight]);
    var currentPalette = [];

    function _reset() {
        var step = paletteSteps.next();
        currentPalette = step ? getAlteredPalette(palette, step) : palette.slice(0)
    }
    return {
        getColor: function(index) {
            var color = currentPalette[index % palette.length];
            if (index % palette.length === palette.length - 1) {
                _reset()
            }
            return color
        },
        generateColors: function(count) {
            var colors = [];
            count = count || parameters.count;
            for (var i = 0; i < count; i++) {
                colors.push(this.getColor(i))
            }
            return colors
        },
        reset: function() {
            paletteSteps.reset();
            _reset()
        }
    }
}

function getExtrapolateColorsStrategy(palette, parameters) {
    return {
        getColor: function(index, count) {
            var paletteCount = palette.length;
            var cycles = _floor((count - 1) / paletteCount + 1);
            var color = palette[index % paletteCount];
            if (cycles > 1) {
                return function(color, cycleIndex, cycleCount) {
                    var hsl = new _color__WEBPACK_IMPORTED_MODULE_2__["default"](color).hsl;
                    var l = hsl.l / 100;
                    var diapason = cycleCount - 1 / cycleCount;
                    var minL = l - .5 * diapason;
                    var maxL = l + .5 * diapason;
                    var cycleMiddle = (cycleCount - 1) / 2;
                    var cycleDiff = cycleIndex - cycleMiddle;
                    if (minL < Math.min(.5, .9 * l)) {
                        minL = Math.min(.5, .9 * l)
                    }
                    if (maxL > Math.max(.8, l + .15 * (1 - l))) {
                        maxL = Math.max(.8, l + .15 * (1 - l))
                    }
                    if (cycleDiff < 0) {
                        l -= (minL - l) * cycleDiff / cycleMiddle
                    } else {
                        l += cycleDiff / cycleMiddle * (maxL - l)
                    }
                    hsl.l = 100 * l;
                    return _color__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.fromHSL(hsl).toHex()
                }(color, _floor(index / paletteCount), cycles)
            }
            return color
        },
        generateColors: function(count) {
            var colors = [];
            count = count || parameters.count;
            for (var i = 0; i < count; i++) {
                colors.push(this.getColor(i, count))
            }
            return colors
        },
        reset: function() {}
    }
}

function getColorMixer(palette, parameters) {
    var paletteCount = palette.length;
    var extendedPalette = [];

    function distributeColors(count, colorsCount, startIndex, distribution) {
        var groupSize = Math.floor(count / colorsCount);
        var extraItems = count - colorsCount * groupSize;
        var i = startIndex;
        var middleIndex;
        var size;
        while (i < startIndex + count) {
            size = groupSize;
            if (extraItems > 0) {
                size += 1;
                extraItems--
            }
            middleIndex = size > 2 ? Math.floor(size / 2) : 0;
            distribution.push(i + middleIndex);
            i += size
        }
        return distribution.sort((function(a, b) {
            return a - b
        }))
    }

    function getColorAndDistance(arr, startIndex, count) {
        startIndex = (count + startIndex) % count;
        var distance = 0;
        for (var i = startIndex; i < 2 * count; i += 1) {
            var index = (count + i) % count;
            if (arr[index]) {
                return [arr[index], distance]
            }
            distance++
        }
    }

    function extendPalette(count) {
        if (count <= paletteCount) {
            return palette
        }
        var result = [];
        var colorInGroups = paletteCount - 2;
        var currentColorIndex = 0;
        var cleanColorIndices = [];
        if (parameters.keepLastColorInEnd) {
            cleanColorIndices = distributeColors(count - 2, colorInGroups, 1, [0, count - 1])
        } else {
            cleanColorIndices = distributeColors(count - 1, paletteCount - 1, 1, [0])
        }
        for (var i = 0; i < count; i++) {
            if (cleanColorIndices.indexOf(i) > -1) {
                result[i] = palette[currentColorIndex++]
            }
        }
        result = function(paletteWithEmptyColors, paletteLength) {
            for (var i = 0; i < paletteLength; i++) {
                var color = paletteWithEmptyColors[i];
                if (!color) {
                    var color1 = paletteWithEmptyColors[i - 1];
                    if (!color1) {
                        continue
                    } else {
                        var c2 = getColorAndDistance(paletteWithEmptyColors, i, paletteLength);
                        var color2 = new _color__WEBPACK_IMPORTED_MODULE_2__["default"](c2[0]);
                        color1 = new _color__WEBPACK_IMPORTED_MODULE_2__["default"](color1);
                        for (var j = 0; j < c2[1]; j++, i++) {
                            paletteWithEmptyColors[i] = color1.blend(color2, (j + 1) / (c2[1] + 1)).toHex()
                        }
                    }
                }
            }
            return paletteWithEmptyColors
        }(result, count);
        return result
    }
    return {
        getColor: function(index, count) {
            count = count || parameters.count || paletteCount;
            if (extendedPalette.length !== count) {
                extendedPalette = extendPalette(count)
            }
            return extendedPalette[index % count]
        },
        generateColors: function(count, repeat) {
            count = count || parameters.count || paletteCount;
            if (repeat && count > paletteCount) {
                var colors = extendPalette(paletteCount);
                for (var i = 0; i < count - paletteCount; i++) {
                    colors.push(colors[i])
                }
                return colors
            } else {
                return paletteCount > 0 ? extendPalette(count).slice(0, count) : []
            }
        },
        reset: function() {}
    }
}
function createPalette(palette, parameters, themeDefaultPalette) {
    var paletteObj = {
        dispose() {
            this._extensionStrategy = null
        },
        getNextColor(count) {
            return this._extensionStrategy.getColor(this._currentColor++, count)
        },
        generateColors(count, parameters) {
            return this._extensionStrategy.generateColors(count, (parameters || {}).repeat)
        },
        reset() {
            this._currentColor = 0;
            this._extensionStrategy.reset();
            return this
        }
    };
    parameters = parameters || {};
    var extensionMode = (parameters.extensionMode || "").toLowerCase();
    var colors = getPalette(palette, {
        type: parameters.type || "simpleSet",
        themeDefault: themeDefaultPalette
    });
    if ("alternate" === extensionMode) {
        paletteObj._extensionStrategy = getAlternateColorsStrategy(colors, parameters)
    } else if ("extrapolate" === extensionMode) {
        paletteObj._extensionStrategy = getExtrapolateColorsStrategy(colors, parameters)
    } else {
        paletteObj._extensionStrategy = getColorMixer(colors, parameters)
    }
    paletteObj.reset();
    return paletteObj
}

function getAlteredPalette(originalPalette, step) {
    var palette = [];
    var i;
    var ii = originalPalette.length;
    for (i = 0; i < ii; ++i) {
        palette.push(getNewColor(originalPalette[i], step))
    }
    return palette
}

function getNewColor(currentColor, step) {
    var newColor = new _color__WEBPACK_IMPORTED_MODULE_2__["default"](currentColor).alter(step);
    var lightness = getLightness(newColor);
    if (lightness > 200 || lightness < 55) {
        newColor = new _color__WEBPACK_IMPORTED_MODULE_2__["default"](currentColor).alter(-step / 2)
    }
    return newColor.toHex()
}

function getLightness(color) {
    return .3 * color.r + .59 * color.g + .11 * color.b
}
function getDiscretePalette(source, size, themeDefaultPalette) {
    var palette = size > 0 ? createDiscreteColors(getPalette(source, {
        type: "gradientSet",
        themeDefault: themeDefaultPalette
    }), size) : [];
    return {
        getColor: function(index) {
            return palette[index] || null
        }
    }
}

function createDiscreteColors(source, count) {
    var colorCount = count - 1;
    var sourceCount = source.length - 1;
    var colors = [];
    var gradient = [];
    var i;

    function addColor(pos) {
        var k = sourceCount * pos;
        var kl = _floor(k);
        var kr = _ceil(k);
        gradient.push(colors[kl].blend(colors[kr], k - kl).toHex())
    }
    for (i = 0; i <= sourceCount; ++i) {
        colors.push(new _color__WEBPACK_IMPORTED_MODULE_2__["default"](source[i]))
    }
    if (colorCount > 0) {
        for (i = 0; i <= colorCount; ++i) {
            addColor(i / colorCount)
        }
    } else {
        addColor(.5)
    }
    return gradient
}
function getGradientPalette(source, themeDefaultPalette) {
    var palette = getPalette(source, {
        type: "gradientSet",
        themeDefault: themeDefaultPalette
    });
    var color1 = new _color__WEBPACK_IMPORTED_MODULE_2__["default"](palette[0]);
    var color2 = new _color__WEBPACK_IMPORTED_MODULE_2__["default"](palette[1]);
    return {
        getColor: function(ratio) {
            return 0 <= ratio && ratio <= 1 ? color1.blend(color2, ratio).toHex() : null
        }
    }
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/area_series.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/area_series.js ***!
  \***************************************************************/
/*! exports provided: chart, polar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chart", function() { return chart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polar", function() { return polar; });
/* harmony import */ var _core_utils_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/object */ "./node_modules/devextreme/esm/core/utils/object.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _scatter_series__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scatter_series */ "./node_modules/devextreme/esm/viz/series/scatter_series.js");
/* harmony import */ var _line_series__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./line_series */ "./node_modules/devextreme/esm/viz/series/line_series.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/**
 * DevExtreme (esm/viz/series/area_series.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var chartLineSeries = _line_series__WEBPACK_IMPORTED_MODULE_3__["chart"].line;
var polarLineSeries = _line_series__WEBPACK_IMPORTED_MODULE_3__["polar"].line;

var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"];
var calculateBezierPoints = _line_series__WEBPACK_IMPORTED_MODULE_3__["chart"].spline._calculateBezierPoints;
var chart = {};
var polar = {};
var baseAreaMethods = {
    _createBorderElement: chartLineSeries._createMainElement,
    _createLegendState: function(styleOptions, defaultColor) {
        return {
            fill: styleOptions.color || defaultColor,
            opacity: styleOptions.opacity,
            hatching: styleOptions.hatching
        }
    },
    getValueRangeInitialValue: function() {
        if ("logarithmic" !== this.valueAxisType && "datetime" !== this.valueType && false !== this.showZero) {
            return 0
        } else {
            return _scatter_series__WEBPACK_IMPORTED_MODULE_2__["chart"].getValueRangeInitialValue.call(this)
        }
    },
    _getDefaultSegment: function(segment) {
        var defaultSegment = chartLineSeries._getDefaultSegment(segment);
        defaultSegment.area = defaultSegment.line.concat(defaultSegment.line.slice().reverse());
        return defaultSegment
    },
    _updateElement: function(element, segment, animate, complete) {
        var lineParams = {
            points: segment.line
        };
        var areaParams = {
            points: segment.area
        };
        var borderElement = element.line;
        if (animate) {
            borderElement && borderElement.animate(lineParams);
            element.area.animate(areaParams, {}, complete)
        } else {
            borderElement && borderElement.attr(lineParams);
            element.area.attr(areaParams)
        }
    },
    _removeElement: function(element) {
        element.line && element.line.remove();
        element.area.remove()
    },
    _drawElement: function(segment) {
        return {
            line: this._bordersGroup && this._createBorderElement(segment.line, {
                "stroke-width": this._styles.normal.border["stroke-width"]
            }).append(this._bordersGroup),
            area: this._createMainElement(segment.area).append(this._elementsGroup)
        }
    },
    _applyStyle: function(style) {
        this._elementsGroup && this._elementsGroup.smartAttr(style.elements);
        this._bordersGroup && this._bordersGroup.attr(style.border);
        (this._graphics || []).forEach((function(graphic) {
            graphic.line && graphic.line.attr({
                "stroke-width": style.border["stroke-width"]
            }).sharp()
        }))
    },
    _parseStyle: function(options, defaultColor, defaultBorderColor) {
        var borderOptions = options.border || {};
        var borderStyle = chartLineSeries._parseLineOptions(borderOptions, defaultBorderColor);
        borderStyle.stroke = borderOptions.visible && borderStyle["stroke-width"] ? borderStyle.stroke : "none";
        borderStyle["stroke-width"] = borderStyle["stroke-width"] || 1;
        return {
            border: borderStyle,
            elements: {
                stroke: "none",
                fill: options.color || defaultColor,
                hatching: options.hatching,
                opacity: options.opacity
            }
        }
    },
    _areBordersVisible: function() {
        var options = this._options;
        return options.border.visible || options.hoverStyle.border.visible || options.selectionStyle.border.visible
    },
    _createMainElement: function(points, settings) {
        return this._renderer.path(points, "area").attr(settings)
    },
    _getTrackerSettings: function(segment) {
        return {
            "stroke-width": segment.singlePointSegment ? this._defaultTrackerWidth : 0
        }
    },
    _getMainPointsFromSegment: function(segment) {
        return segment.area
    }
};

function createAreaPoints(points) {
    return Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["map"])(points, (function(pt) {
        return pt.getCoords()
    })).concat(Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["map"])(points.slice().reverse(), (function(pt) {
        return pt.getCoords(true)
    })))
}
var areaSeries = chart.area = _extend({}, chartLineSeries, baseAreaMethods, {
    _prepareSegment(points, rotated) {
        var processedPoints = this._processSinglePointsAreaSegment(points, rotated);
        var areaPoints = createAreaPoints(processedPoints);
        var argAxis = this.getArgumentAxis();
        if (argAxis.getAxisPosition) {
            var argAxisPosition = argAxis.getAxisPosition();
            var axisOptions = argAxis.getOptions();
            var edgeOffset = (!rotated ? -1 : 1) * Math.round(axisOptions.width / 2);
            if (axisOptions.visible) {
                areaPoints.forEach((p, i) => {
                    if (p) {
                        var index = 1 === points.length ? 0 : i < points.length ? i : areaPoints.length - 1 - i;
                        rotated && p.x === points[index].defaultX && p.x === argAxisPosition - argAxis.getAxisShift() && (p.x += edgeOffset);
                        !rotated && p.y === points[index].defaultY && p.y === argAxisPosition - argAxis.getAxisShift() && (p.y += edgeOffset)
                    }
                })
            }
        }
        return {
            line: processedPoints,
            area: areaPoints,
            singlePointSegment: processedPoints !== points
        }
    },
    _processSinglePointsAreaSegment: function(points, rotated) {
        if (points && 1 === points.length) {
            var p = points[0];
            var p1 = Object(_core_utils_object__WEBPACK_IMPORTED_MODULE_0__["clone"])(p);
            p1[rotated ? "y" : "x"] += 1;
            p1.argument = null;
            return [p, p1]
        }
        return points
    }
});
polar.area = _extend({}, polarLineSeries, baseAreaMethods, {
    _prepareSegment: function(points, rotated, lastSegment) {
        lastSegment && polarLineSeries._closeSegment.call(this, points);
        return areaSeries._prepareSegment.call(this, points)
    },
    _processSinglePointsAreaSegment: function(points) {
        return _line_series__WEBPACK_IMPORTED_MODULE_3__["polar"].line._prepareSegment.call(this, points).line
    }
});
chart.steparea = _extend({}, areaSeries, {
    _prepareSegment: function(points, rotated) {
        var stepLineSeries = _line_series__WEBPACK_IMPORTED_MODULE_3__["chart"].stepline;
        points = areaSeries._processSinglePointsAreaSegment(points, rotated);
        return areaSeries._prepareSegment.call(this, stepLineSeries._calculateStepLinePoints.call(this, points), rotated)
    },
    getSeriesPairCoord: _line_series__WEBPACK_IMPORTED_MODULE_3__["chart"].stepline.getSeriesPairCoord
});
chart.splinearea = _extend({}, areaSeries, {
    _areaPointsToSplineAreaPoints: function(areaPoints) {
        var previousMiddlePoint = areaPoints[areaPoints.length / 2 - 1];
        var middlePoint = areaPoints[areaPoints.length / 2];
        areaPoints.splice(areaPoints.length / 2, 0, {
            x: previousMiddlePoint.x,
            y: previousMiddlePoint.y
        }, {
            x: middlePoint.x,
            y: middlePoint.y
        })
    },
    _prepareSegment: function(points, rotated) {
        var processedPoints = areaSeries._processSinglePointsAreaSegment(points, rotated);
        var areaSegment = areaSeries._prepareSegment.call(this, calculateBezierPoints(processedPoints, rotated));
        this._areaPointsToSplineAreaPoints(areaSegment.area);
        areaSegment.singlePointSegment = processedPoints !== points;
        return areaSegment
    },
    _getDefaultSegment: function(segment) {
        var areaDefaultSegment = areaSeries._getDefaultSegment(segment);
        this._areaPointsToSplineAreaPoints(areaDefaultSegment.area);
        return areaDefaultSegment
    },
    _createMainElement: function(points, settings) {
        return this._renderer.path(points, "bezierarea").attr(settings)
    },
    _createBorderElement: _line_series__WEBPACK_IMPORTED_MODULE_3__["chart"].spline._createMainElement,
    getSeriesPairCoord: _line_series__WEBPACK_IMPORTED_MODULE_3__["chart"].spline.getSeriesPairCoord,
    _getNearestPoints: _line_series__WEBPACK_IMPORTED_MODULE_3__["chart"].spline._getNearestPoints,
    _getBezierPoints: _line_series__WEBPACK_IMPORTED_MODULE_3__["chart"].spline._getBezierPoints,
    obtainCubicBezierTCoef: _line_series__WEBPACK_IMPORTED_MODULE_3__["chart"].spline.obtainCubicBezierTCoef
});



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/bar_series.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/bar_series.js ***!
  \**************************************************************/
/*! exports provided: chart, polar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chart", function() { return chart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polar", function() { return polar; });
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _scatter_series__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scatter_series */ "./node_modules/devextreme/esm/viz/series/scatter_series.js");
/* harmony import */ var _area_series__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./area_series */ "./node_modules/devextreme/esm/viz/series/area_series.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/viz/series/bar_series.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var areaSeries = _area_series__WEBPACK_IMPORTED_MODULE_3__["chart"].area;

var chartSeries = _scatter_series__WEBPACK_IMPORTED_MODULE_2__["chart"];
var polarSeries = _scatter_series__WEBPACK_IMPORTED_MODULE_2__["polar"];

var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"];
var _each = _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"];
var chart = {};
var polar = {};
var baseBarSeriesMethods = {
    _createLegendState: function(styleOptions, defaultColor) {
        return {
            fill: styleOptions.color || defaultColor,
            hatching: styleOptions.hatching
        }
    },
    _parsePointStyle: function(style, defaultColor, defaultBorderColor) {
        var color = style.color || defaultColor;
        var base = chartSeries._parsePointStyle.call(this, style, color, defaultBorderColor);
        base.fill = color;
        base.hatching = style.hatching;
        base.dashStyle = style.border && style.border.dashStyle || "solid";
        delete base.r;
        return base
    },
    _applyMarkerClipRect: function(settings) {
        settings["clip-path"] = null
    },
    _setGroupsSettings: function(animationEnabled, firstDrawing) {
        var that = this;
        var settings = {};
        chartSeries._setGroupsSettings.apply(that, arguments);
        if (animationEnabled && firstDrawing) {
            settings = this._getAffineCoordOptions()
        } else if (!animationEnabled) {
            settings = {
                scaleX: 1,
                scaleY: 1,
                translateX: 0,
                translateY: 0
            }
        }
        that._markersGroup.attr(settings)
    },
    _drawPoint: function(options) {
        options.hasAnimation = options.hasAnimation && !options.firstDrawing;
        options.firstDrawing = false;
        chartSeries._drawPoint.call(this, options)
    },
    _getMainColor: function() {
        return this._options.mainSeriesColor
    },
    _createPointStyles: function(pointOptions) {
        var mainColor = pointOptions.color || this._getMainColor();
        return {
            normal: this._parsePointStyle(pointOptions, mainColor, mainColor),
            hover: this._parsePointStyle(pointOptions.hoverStyle || {}, mainColor, mainColor),
            selection: this._parsePointStyle(pointOptions.selectionStyle || {}, mainColor, mainColor)
        }
    },
    _updatePointsVisibility: function() {
        var visibility = this._options.visible;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"])(this._points, (function(_, point) {
            point._options.visible = visibility
        }))
    },
    _getOptionsForPoint: function() {
        return this._options
    },
    _animate: function(firstDrawing) {
        var that = this;
        that._animatePoints(firstDrawing, (function() {
            that._animateComplete()
        }), (function(drawnPoints, complete) {
            var lastPointIndex = drawnPoints.length - 1;
            _each(drawnPoints || [], (function(i, point) {
                point.animate(i === lastPointIndex ? complete : void 0, point.getMarkerCoords())
            }))
        }))
    },
    getValueRangeInitialValue: areaSeries.getValueRangeInitialValue,
    _patchMarginOptions: function(options) {
        var _this$getArgumentAxis;
        options.checkInterval = !this.useAggregation() || (null === (_this$getArgumentAxis = this.getArgumentAxis()) || void 0 === _this$getArgumentAxis ? void 0 : _this$getArgumentAxis.aggregatedPointBetweenTicks());
        return options
    },
    _defaultAggregator: "sum",
    _defineDrawingState() {},
    usePointsToDefineAutoHiding: () => false
};
chart.bar = _extend({}, chartSeries, baseBarSeriesMethods, {
    _getAffineCoordOptions: function() {
        var rotated = this._options.rotated;
        var direction = rotated ? "X" : "Y";
        var settings = {
            scaleX: rotated ? .001 : 1,
            scaleY: rotated ? 1 : .001
        };
        settings["translate" + direction] = this.getValueAxis().getTranslator().translate("canvas_position_default");
        return settings
    },
    _animatePoints: function(firstDrawing, complete, animateFunc) {
        this._markersGroup.animate({
            scaleX: 1,
            scaleY: 1,
            translateY: 0,
            translateX: 0
        }, void 0, complete);
        if (!firstDrawing) {
            animateFunc(this._drawnPoints, complete)
        }
    },
    checkSeriesViewportCoord(axis, coord) {
        if (!chartSeries.checkSeriesViewportCoord.call(this)) {
            return false
        }
        if (axis.isArgumentAxis) {
            return true
        }
        var translator = axis.getTranslator();
        var range = this.getViewport();
        var min = translator.translate(range.categories ? range.categories[0] : range.min);
        var max = translator.translate(range.categories ? range.categories[range.categories.length - 1] : range.max);
        var rotated = this.getOptions().rotated;
        var inverted = axis.getOptions().inverted;
        return rotated && !inverted || !rotated && inverted ? coord >= min && coord <= max : coord >= max && coord <= min
    },
    getSeriesPairCoord(coord, isArgument) {
        var oppositeCoord = null;
        var {
            rotated: rotated
        } = this._options;
        var isOpposite = !isArgument && !rotated || isArgument && rotated;
        var coordName = isOpposite ? "vy" : "vx";
        var oppositeCoordName = isOpposite ? "vx" : "vy";
        var points = this.getPoints();
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var tmpCoord = void 0;
            if (isArgument) {
                tmpCoord = p.getCenterCoord()[coordName[1]] === coord ? p[oppositeCoordName] : void 0
            } else {
                tmpCoord = p[coordName] === coord ? p[oppositeCoordName] : void 0
            }
            if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
                oppositeCoord = tmpCoord;
                break
            }
        }
        return oppositeCoord
    }
});
polar.bar = _extend({}, polarSeries, baseBarSeriesMethods, {
    _animatePoints: function(firstDrawing, complete, animateFunc) {
        animateFunc(this._drawnPoints, complete)
    },
    _setGroupsSettings: chartSeries._setGroupsSettings,
    _drawPoint: function(point, groups, animationEnabled) {
        chartSeries._drawPoint.call(this, point, groups, animationEnabled)
    },
    _parsePointStyle: function(style) {
        var base = baseBarSeriesMethods._parsePointStyle.apply(this, arguments);
        base.opacity = style.opacity;
        return base
    },
    _createGroups: chartSeries._createGroups,
    _setMarkerGroupSettings: function() {
        var markersSettings = this._createPointStyles(this._getMarkerGroupOptions()).normal;
        markersSettings.class = "dxc-markers";
        this._applyMarkerClipRect(markersSettings);
        var groupSettings = _extend({}, markersSettings);
        delete groupSettings.opacity;
        this._markersGroup.attr(groupSettings)
    },
    getSeriesPairCoord(params, isArgument) {
        var coords = null;
        var paramName = isArgument ? "argument" : "radius";
        var points = this.getVisiblePoints();
        var argAxis = this.getArgumentAxis();
        var startAngle = argAxis.getAngles()[0];
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var tmpPoint = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(p[paramName]) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(params[paramName]) && p[paramName].valueOf() === params[paramName].valueOf() ? Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["convertPolarToXY"])(argAxis.getCenter(), startAngle, -argAxis.getTranslatedAngle(p.angle), p.radius) : void 0;
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(tmpPoint)) {
                coords = tmpPoint;
                break
            }
        }
        return coords
    },
    _createLegendState: areaSeries._createLegendState
});



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/base_series.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/base_series.js ***!
  \***************************************************************/
/*! exports provided: Series, mixins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Series", function() { return Series; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mixins", function() { return mixins; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _points_base_point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./points/base_point */ "./node_modules/devextreme/esm/viz/series/points/base_point.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _components_consts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/consts */ "./node_modules/devextreme/esm/viz/components/consts.js");
/* harmony import */ var _helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/range_data_calculator */ "./node_modules/devextreme/esm/viz/series/helpers/range_data_calculator.js");
/* harmony import */ var _scatter_series__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scatter_series */ "./node_modules/devextreme/esm/viz/series/scatter_series.js");
/* harmony import */ var _line_series__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./line_series */ "./node_modules/devextreme/esm/viz/series/line_series.js");
/* harmony import */ var _area_series__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./area_series */ "./node_modules/devextreme/esm/viz/series/area_series.js");
/* harmony import */ var _bar_series__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bar_series */ "./node_modules/devextreme/esm/viz/series/bar_series.js");
/* harmony import */ var _range_series__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./range_series */ "./node_modules/devextreme/esm/viz/series/range_series.js");
/* harmony import */ var _bubble_series__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./bubble_series */ "./node_modules/devextreme/esm/viz/series/bubble_series.js");
/* harmony import */ var _pie_series__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pie_series */ "./node_modules/devextreme/esm/viz/series/pie_series.js");
/* harmony import */ var _financial_series__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./financial_series */ "./node_modules/devextreme/esm/viz/series/financial_series.js");
/* harmony import */ var _stacked_series__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./stacked_series */ "./node_modules/devextreme/esm/viz/series/stacked_series.js");
/**
 * DevExtreme (esm/viz/series/base_series.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var seriesNS = {};







var states = _components_consts__WEBPACK_IMPORTED_MODULE_6__["default"].states;










var DISCRETE = "discrete";
var SELECTED_STATE = states.selectedMark;
var HOVER_STATE = states.hoverMark;
var HOVER = states.hover;
var NORMAL = states.normal;
var SELECTION = states.selection;
var APPLY_SELECTED = states.applySelected;
var APPLY_HOVER = states.applyHover;
var RESET_ITEM = states.resetItem;
var NONE_MODE = "none";
var INCLUDE_POINTS = "includepoints";
var NEAREST_POINT = "nearestpoint";
var SERIES_SELECTION_CHANGED = "seriesSelectionChanged";
var POINT_SELECTION_CHANGED = "pointSelectionChanged";
var SERIES_HOVER_CHANGED = "seriesHoverChanged";
var POINT_HOVER_CHANGED = "pointHoverChanged";
var ALL_SERIES_POINTS = "allseriespoints";
var ALL_ARGUMENT_POINTS = "allargumentpoints";
var POINT_HOVER = "pointHover";
var CLEAR_POINT_HOVER = "clearPointHover";
var SERIES_SELECT = "seriesSelect";
var POINT_SELECT = "pointSelect";
var POINT_DESELECT = "pointDeselect";
var getEmptyBusinessRange = function() {
    return {
        arg: {},
        val: {}
    }
};

function triggerEvent(element, event, point) {
    element && element.trigger(event, point)
}
seriesNS.mixins = {
    chart: {},
    pie: {},
    polar: {}
};
seriesNS.mixins.chart.scatter = _scatter_series__WEBPACK_IMPORTED_MODULE_8__["chart"];
seriesNS.mixins.polar.scatter = _scatter_series__WEBPACK_IMPORTED_MODULE_8__["polar"];
Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(seriesNS.mixins.pie, _pie_series__WEBPACK_IMPORTED_MODULE_14__);
Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(seriesNS.mixins.chart, _line_series__WEBPACK_IMPORTED_MODULE_9__["chart"], _area_series__WEBPACK_IMPORTED_MODULE_10__["chart"], _bar_series__WEBPACK_IMPORTED_MODULE_11__["chart"], _range_series__WEBPACK_IMPORTED_MODULE_12__["chart"], _bubble_series__WEBPACK_IMPORTED_MODULE_13__["chart"], _financial_series__WEBPACK_IMPORTED_MODULE_15__, _stacked_series__WEBPACK_IMPORTED_MODULE_16__["chart"]);
Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(seriesNS.mixins.polar, _line_series__WEBPACK_IMPORTED_MODULE_9__["polar"], _area_series__WEBPACK_IMPORTED_MODULE_10__["polar"], _bar_series__WEBPACK_IMPORTED_MODULE_11__["polar"], _stacked_series__WEBPACK_IMPORTED_MODULE_16__["polar"]);

function includePointsMode(mode) {
    mode = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(mode);
    return mode === INCLUDE_POINTS || mode === ALL_SERIES_POINTS
}

function getLabelOptions(labelOptions, defaultColor) {
    var opt = labelOptions || {};
    var labelFont = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, opt.font) || {};
    var labelBorder = opt.border || {};
    var labelConnector = opt.connector || {};
    var backgroundAttr = {
        fill: opt.backgroundColor || defaultColor,
        "stroke-width": labelBorder.visible ? labelBorder.width || 0 : 0,
        stroke: labelBorder.visible && labelBorder.width ? labelBorder.color : "none",
        dashStyle: labelBorder.dashStyle
    };
    var connectorAttr = {
        stroke: labelConnector.visible && labelConnector.width ? labelConnector.color || defaultColor : "none",
        "stroke-width": labelConnector.visible ? labelConnector.width || 0 : 0
    };
    labelFont.color = "none" === opt.backgroundColor && "#ffffff" === Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(labelFont.color) && "inside" !== opt.position ? defaultColor : labelFont.color;
    return {
        alignment: opt.alignment,
        format: opt.format,
        argumentFormat: opt.argumentFormat,
        customizeText: Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(opt.customizeText) ? opt.customizeText : void 0,
        attributes: {
            font: labelFont
        },
        visible: 0 !== labelFont.size ? opt.visible : false,
        showForZeroValues: opt.showForZeroValues,
        horizontalOffset: opt.horizontalOffset,
        verticalOffset: opt.verticalOffset,
        radialOffset: opt.radialOffset,
        background: backgroundAttr,
        position: opt.position,
        connector: connectorAttr,
        rotationAngle: opt.rotationAngle,
        wordWrap: opt.wordWrap,
        textOverflow: opt.textOverflow,
        cssClass: opt.cssClass
    }
}

function setPointHoverState(point, legendCallback) {
    point.fullState |= HOVER_STATE;
    point.applyView(legendCallback)
}

function releasePointHoverState(point, legendCallback) {
    point.fullState &= ~HOVER_STATE;
    point.applyView(legendCallback);
    point.releaseHoverState()
}

function setPointSelectedState(point, legendCallback) {
    point.fullState |= SELECTED_STATE;
    point.applyView(legendCallback)
}

function releasePointSelectedState(point, legendCallback) {
    point.fullState &= ~SELECTED_STATE;
    point.applyView(legendCallback)
}

function mergePointOptionsCore(base, extra) {
    var options = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, base, extra);
    options.border = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, base && base.border, extra && extra.border);
    return options
}

function mergePointOptions(base, extra) {
    var options = mergePointOptionsCore(base, extra);
    options.image = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, base.image, extra.image);
    options.selectionStyle = mergePointOptionsCore(base.selectionStyle, extra.selectionStyle);
    options.hoverStyle = mergePointOptionsCore(base.hoverStyle, extra.hoverStyle);
    return options
}
function Series(settings, options) {
    this.fullState = 0;
    this._extGroups = settings;
    this._renderer = settings.renderer;
    this._group = settings.renderer.g().attr({
        class: "dxc-series"
    });
    this._eventTrigger = settings.eventTrigger;
    this._eventPipe = settings.eventPipe;
    this._incidentOccurred = settings.incidentOccurred;
    this._legendCallback = _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"];
    this.updateOptions(options, settings)
}

function getData(pointData) {
    return pointData.data
}

function getValueChecker(axisType, axis) {
    if (!axis || "logarithmic" !== axisType || false !== axis.getOptions().allowNegatives) {
        return () => true
    } else {
        return value => value > 0
    }
}
Series.prototype = {
    constructor: Series,
    _createLegendState: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    getLegendStyles: function() {
        return this._styles.legendStyles
    },
    _createStyles: function(options) {
        var mainSeriesColor = options.mainSeriesColor;
        this._styles = {
            normal: this._parseStyle(options, mainSeriesColor, mainSeriesColor),
            hover: this._parseStyle(options.hoverStyle || {}, mainSeriesColor, mainSeriesColor),
            selection: this._parseStyle(options.selectionStyle || {}, mainSeriesColor, mainSeriesColor),
            legendStyles: {
                normal: this._createLegendState(options, mainSeriesColor),
                hover: this._createLegendState(options.hoverStyle || {}, mainSeriesColor),
                selection: this._createLegendState(options.selectionStyle || {}, mainSeriesColor)
            }
        }
    },
    setClippingParams(baseId, wideId, forceClipping) {
        var clipLabels = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : true;
        this._paneClipRectID = baseId;
        this._widePaneClipRectID = wideId;
        this._forceClipping = forceClipping;
        this._clipLabels = clipLabels
    },
    applyClip: function() {
        this._group.attr({
            "clip-path": this._paneClipRectID
        })
    },
    resetClip: function() {
        this._group.attr({
            "clip-path": null
        })
    },
    getTagField: function() {
        return this._options.tagField || "tag"
    },
    getValueFields: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    getSizeField: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    getArgumentField: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    getPoints: function() {
        return this._points
    },
    getPointsInViewPort: function() {
        return _helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_7__["default"].getPointsInViewPort(this)
    },
    _createPoint: function(data, index, oldPoint) {
        data.index = index;
        var pointsByArgument = this.pointsByArgument;
        var options = this._getCreatingPointOptions(data);
        var arg = data.argument.valueOf();
        var point = oldPoint;
        if (point) {
            point.update(data, options)
        } else {
            point = new _points_base_point__WEBPACK_IMPORTED_MODULE_3__["Point"](this, data, options);
            if (this.isSelected() && includePointsMode(this.lastSelectionMode)) {
                point.setView(SELECTION)
            }
        }
        var pointByArgument = pointsByArgument[arg];
        if (pointByArgument) {
            pointByArgument.push(point)
        } else {
            pointsByArgument[arg] = [point]
        }
        if (point.hasValue()) {
            this.customizePoint(point, data)
        }
        return point
    },
    getRangeData: function() {
        return this._visible ? this._getRangeData() : getEmptyBusinessRange()
    },
    getArgumentRange: function() {
        return this._visible ? _helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_7__["default"].getArgumentRange(this) : getEmptyBusinessRange()
    },
    getViewport: function() {
        return _helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_7__["default"].getViewport(this)
    },
    _deleteGroup: function(groupName) {
        var group = this[groupName];
        if (group) {
            group.dispose();
            this[groupName] = null
        }
    },
    updateOptions(newOptions, settings) {
        var widgetType = newOptions.widgetType;
        var oldType = this.type;
        var newType = newOptions.type;
        this.type = newType && Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(newType.toString());
        if (!this._checkType(widgetType) || this._checkPolarBarType(widgetType, newOptions)) {
            this.dispose();
            this.isUpdated = false;
            return
        }
        if (oldType !== this.type) {
            this._firstDrawing = true;
            this._resetType(oldType, widgetType);
            this._setType(this.type, widgetType)
        } else {
            this._defineDrawingState()
        }
        this._options = newOptions;
        this._pointOptions = null;
        this.name = newOptions.name;
        this.pane = newOptions.pane;
        this.tag = newOptions.tag;
        if (settings) {
            this._seriesModes = settings.commonSeriesModes || this._seriesModes;
            this._valueAxis = settings.valueAxis || this._valueAxis;
            this.axis = this._valueAxis && this._valueAxis.name;
            this._argumentAxis = settings.argumentAxis || this._argumentAxis
        }
        this._createStyles(newOptions);
        this._stackName = null;
        this._updateOptions(newOptions);
        this._visible = newOptions.visible;
        this.isUpdated = true;
        this.stack = newOptions.stack;
        this.barOverlapGroup = newOptions.barOverlapGroup;
        this._createGroups();
        this._processEmptyValue = newOptions.ignoreEmptyPoints ? x => null === x ? void 0 : x : x => x
    },
    _defineDrawingState() {
        this._firstDrawing = true
    },
    _disposePoints: function(points) {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(points || [], (function(_, p) {
            p.dispose()
        }))
    },
    updateDataType: function(settings) {
        this.argumentType = settings.argumentType;
        this.valueType = settings.valueType;
        this.argumentAxisType = settings.argumentAxisType;
        this.valueAxisType = settings.valueAxisType;
        this.showZero = settings.showZero;
        this._argumentChecker = getValueChecker(settings.argumentAxisType, this.getArgumentAxis());
        this._valueChecker = getValueChecker(settings.valueAxisType, this.getValueAxis());
        return this
    },
    _argumentChecker: function() {
        return true
    },
    _valueChecker: function() {
        return true
    },
    getOptions: function() {
        return this._options
    },
    _getOldPoint: function(data, oldPointsByArgument, index) {
        var arg = data.argument && data.argument.valueOf();
        var point = (oldPointsByArgument[arg] || [])[0];
        if (point) {
            oldPointsByArgument[arg].splice(0, 1)
        }
        return point
    },
    updateData: function(data) {
        var options = this._options;
        var nameField = options.nameField;
        data = data || [];
        if (data.length) {
            this._canRenderCompleteHandle = true
        }
        var dataSelector = this._getPointDataSelector();
        var itemsWithoutArgument = 0;
        this._data = data.reduce((data, dataItem, index) => {
            var pointDataItem = dataSelector(dataItem);
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(pointDataItem.argument)) {
                if (!nameField || dataItem[nameField] === options.nameFieldValue) {
                    pointDataItem.index = index;
                    data.push(pointDataItem)
                }
            } else {
                itemsWithoutArgument++
            }
            return data
        }, []);
        if (itemsWithoutArgument && itemsWithoutArgument === data.length) {
            this._incidentOccurred("W2002", [this.name, this.getArgumentField()])
        }
        this._endUpdateData()
    },
    _getData() {
        var data = this._data || [];
        if (this.useAggregation()) {
            data = this._resample(this.getArgumentAxis().getAggregationInfo(this._useAllAggregatedPoints, this.argumentAxisType !== DISCRETE ? this.getArgumentRange() : {}), data)
        }
        return data
    },
    useAggregation: function() {
        var aggregation = this.getOptions().aggregation;
        return aggregation && aggregation.enabled
    },
    autoHidePointMarkersEnabled: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    usePointsToDefineAutoHiding: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    createPoints(useAllAggregatedPoints) {
        this._normalizeUsingAllAggregatedPoints(useAllAggregatedPoints);
        this._createPoints()
    },
    _normalizeUsingAllAggregatedPoints: function(useAllAggregatedPoints) {
        this._useAllAggregatedPoints = this.useAggregation() && (this.argumentAxisType === DISCRETE || (this._data || []).length > 1 && !!useAllAggregatedPoints)
    },
    _createPoints: function() {
        var that = this;
        var oldPointsByArgument = that.pointsByArgument || {};
        var data = that._getData();
        that.pointsByArgument = {};
        that._calculateErrorBars(data);
        var skippedFields = {};
        var points = data.reduce((points, pointDataItem) => {
            if (that._checkData(pointDataItem, skippedFields)) {
                var pointIndex = points.length;
                var oldPoint = that._getOldPoint(pointDataItem, oldPointsByArgument, pointIndex);
                var point = that._createPoint(pointDataItem, pointIndex, oldPoint);
                points.push(point)
            }
            return points
        }, []);
        for (var field in skippedFields) {
            if (skippedFields[field] === data.length) {
                that._incidentOccurred("W2002", [that.name, field])
            }
        }
        Object.keys(oldPointsByArgument).forEach(key => that._disposePoints(oldPointsByArgument[key]));
        that._points = points
    },
    _removeOldSegments: function() {
        var that = this;
        var startIndex = that._segments.length;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(that._graphics.splice(startIndex, that._graphics.length) || [], (function(_, elem) {
            that._removeElement(elem)
        }));
        if (that._trackers) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(that._trackers.splice(startIndex, that._trackers.length) || [], (function(_, elem) {
                elem.remove()
            }))
        }
    },
    _drawElements: function(animationEnabled, firstDrawing, translateAllPoints) {
        var that = this;
        var points = that._points || [];
        var closeSegment = points[0] && points[0].hasValue() && that._options.closed;
        var groupForPoint = {
            markers: that._markersGroup,
            errorBars: that._errorBarGroup
        };
        that._drawnPoints = [];
        that._graphics = that._graphics || [];
        that._segments = [];
        var segments = points.reduce((function(segments, p) {
            var segment = segments[segments.length - 1];
            if (!p.translated || translateAllPoints) {
                p.translate();
                !translateAllPoints && p.setDefaultCoords()
            }
            if (p.hasValue() && p.hasCoords()) {
                translateAllPoints && that._drawPoint({
                    point: p,
                    groups: groupForPoint,
                    hasAnimation: animationEnabled,
                    firstDrawing: firstDrawing
                });
                segment.push(p)
            } else if (!p.hasValue()) {
                segment.length && segments.push([])
            } else {
                p.setInvisibility()
            }
            return segments
        }), [
            []
        ]);
        segments.forEach((function(segment, index) {
            if (segment.length) {
                that._drawSegment(segment, animationEnabled, index, closeSegment && index === this.length - 1)
            }
        }), segments);
        that._firstDrawing = !points.length;
        that._removeOldSegments();
        animationEnabled && that._animate(firstDrawing)
    },
    draw: function(animationEnabled, hideLayoutLabels, legendCallback) {
        var firstDrawing = this._firstDrawing;
        this._legendCallback = legendCallback || this._legendCallback;
        if (!this._visible) {
            this._group.remove();
            return
        }
        this._appendInGroup();
        this._applyVisibleArea();
        this._setGroupsSettings(animationEnabled, firstDrawing);
        !firstDrawing && !this._resetApplyingAnimation && this._drawElements(false, firstDrawing, false);
        this._drawElements(animationEnabled, firstDrawing, true);
        hideLayoutLabels && this.hideLabels();
        if (this.isSelected()) {
            this._changeStyle(this.lastSelectionMode, void 0, true)
        } else if (this.isHovered()) {
            this._changeStyle(this.lastHoverMode, void 0, true)
        } else {
            this._applyStyle(this._styles.normal)
        }
        this._resetApplyingAnimation = false
    },
    _setLabelGroupSettings: function(animationEnabled) {
        var settings = {
            class: "dxc-labels",
            "pointer-events": "none"
        };
        this._clipLabels && this._applyElementsClipRect(settings);
        this._applyClearingSettings(settings);
        animationEnabled && (settings.opacity = .001);
        this._labelsGroup.attr(settings).append(this._extGroups.labelsGroup)
    },
    _checkType: function(widgetType) {
        return !!seriesNS.mixins[widgetType][this.type]
    },
    _checkPolarBarType: function(widgetType, options) {
        return "polar" === widgetType && options.spiderWidget && -1 !== this.type.indexOf("bar")
    },
    _resetType: function(seriesType, widgetType) {
        var methodName;
        var methods;
        if (seriesType) {
            methods = seriesNS.mixins[widgetType][seriesType];
            for (methodName in methods) {
                delete this[methodName]
            }
        }
    },
    _setType: function(seriesType, widgetType) {
        var methodName;
        var methods = seriesNS.mixins[widgetType][seriesType];
        for (methodName in methods) {
            this[methodName] = methods[methodName]
        }
    },
    _setPointsView: function(view, target) {
        this.getPoints().forEach((function(point) {
            if (target !== point) {
                point.setView(view)
            }
        }))
    },
    _resetPointsView: function(view, target) {
        this.getPoints().forEach((function(point) {
            if (target !== point) {
                point.resetView(view)
            }
        }))
    },
    _resetNearestPoint: function() {
        this._nearestPoint && null !== this._nearestPoint.series && this._nearestPoint.resetView(HOVER);
        this._nearestPoint = null
    },
    _setSelectedState: function(mode) {
        this.lastSelectionMode = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(mode || this._options.selectionMode);
        this.fullState = this.fullState | SELECTED_STATE;
        this._resetNearestPoint();
        this._changeStyle(this.lastSelectionMode);
        if (this.lastSelectionMode !== NONE_MODE && this.isHovered() && includePointsMode(this.lastHoverMode)) {
            this._resetPointsView(HOVER)
        }
    },
    _releaseSelectedState: function() {
        this.fullState = this.fullState & ~SELECTED_STATE;
        this._changeStyle(this.lastSelectionMode, SELECTION);
        if (this.lastSelectionMode !== NONE_MODE && this.isHovered() && includePointsMode(this.lastHoverMode)) {
            this._setPointsView(HOVER)
        }
    },
    isFullStackedSeries: function() {
        return 0 === this.type.indexOf("fullstacked")
    },
    isStackedSeries: function() {
        return 0 === this.type.indexOf("stacked")
    },
    resetApplyingAnimation: function(isFirstDrawing) {
        this._resetApplyingAnimation = true;
        if (isFirstDrawing) {
            this._firstDrawing = true
        }
    },
    isFinancialSeries: function() {
        return "stock" === this.type || "candlestick" === this.type
    },
    _canChangeView: function() {
        return !this.isSelected() && Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(this._options.hoverMode) !== NONE_MODE
    },
    _changeStyle: function(mode, resetView, skipPoints) {
        var state = this.fullState;
        var styles = [NORMAL, HOVER, SELECTION, SELECTION];
        if ("none" === this.lastHoverMode) {
            state &= ~HOVER_STATE
        }
        if ("none" === this.lastSelectionMode) {
            state &= ~SELECTED_STATE
        }
        if (includePointsMode(mode) && !skipPoints) {
            if (!resetView) {
                this._setPointsView(styles[state])
            } else {
                this._resetPointsView(resetView)
            }
        }
        this._legendCallback([RESET_ITEM, APPLY_HOVER, APPLY_SELECTED, APPLY_SELECTED][state]);
        this._applyStyle(this._styles[styles[state]])
    },
    updateHover: function(x, y) {
        var currentNearestPoint = this._nearestPoint;
        var point = this.isHovered() && this.lastHoverMode === NEAREST_POINT && this.getNeighborPoint(x, y);
        if (point !== currentNearestPoint && !(this.isSelected() && this.lastSelectionMode !== NONE_MODE)) {
            this._resetNearestPoint();
            if (point) {
                point.setView(HOVER);
                this._nearestPoint = point
            }
        }
    },
    _getMainAxisName: function() {
        return this._options.rotated ? "X" : "Y"
    },
    areLabelsVisible: function() {
        return !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(this._options.maxLabelCount) || this._points.length <= this._options.maxLabelCount
    },
    getLabelVisibility: function() {
        return this.areLabelsVisible() && this._options.label && this._options.label.visible
    },
    customizePoint: function(point, pointData) {
        var options = this._options;
        var customizePoint = options.customizePoint;
        var customizeObject;
        var pointOptions;
        var customLabelOptions;
        var customOptions;
        var customizeLabel = options.customizeLabel;
        var useLabelCustomOptions;
        var usePointCustomOptions;
        if (customizeLabel && customizeLabel.call) {
            customizeObject = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({
                seriesName: this.name
            }, pointData);
            customizeObject.series = this;
            customLabelOptions = customizeLabel.call(customizeObject, customizeObject);
            useLabelCustomOptions = customLabelOptions && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isEmptyObject"])(customLabelOptions);
            customLabelOptions = useLabelCustomOptions ? Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(true, {}, options.label, customLabelOptions) : null
        }
        if (customizePoint && customizePoint.call) {
            customizeObject = customizeObject || Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({
                seriesName: this.name
            }, pointData);
            customizeObject.series = this;
            customOptions = customizePoint.call(customizeObject, customizeObject);
            usePointCustomOptions = customOptions && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isEmptyObject"])(customOptions)
        }
        if (useLabelCustomOptions || usePointCustomOptions) {
            pointOptions = this._parsePointOptions(this._preparePointOptions(customOptions), customLabelOptions || options.label, pointData, point);
            pointOptions.styles.useLabelCustomOptions = useLabelCustomOptions;
            pointOptions.styles.usePointCustomOptions = usePointCustomOptions;
            point.updateOptions(pointOptions)
        }
    },
    show: function() {
        if (!this._visible) {
            this._changeVisibility(true)
        }
    },
    hide: function() {
        if (this._visible) {
            this._changeVisibility(false)
        }
    },
    _changeVisibility: function(visibility) {
        this._visible = this._options.visible = visibility;
        this._updatePointsVisibility();
        this.hidePointTooltip();
        this._options.visibilityChanged(this)
    },
    _updatePointsVisibility: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    hideLabels: function() {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(this._points, (function(_, point) {
            point._label.draw(false)
        }))
    },
    _parsePointOptions: function(pointOptions, labelOptions, data, point) {
        var options = this._options;
        var styles = this._createPointStyles(pointOptions, data, point);
        var parsedOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, pointOptions, {
            type: options.type,
            rotated: options.rotated,
            styles: styles,
            widgetType: options.widgetType,
            visibilityChanged: options.visibilityChanged
        });
        parsedOptions.label = getLabelOptions(labelOptions, styles.normal.fill);
        if (this.areErrorBarsVisible()) {
            parsedOptions.errorBars = options.valueErrorBar
        }
        return parsedOptions
    },
    _preparePointOptions: function(customOptions) {
        var pointOptions = this._getOptionsForPoint();
        return customOptions ? mergePointOptions(pointOptions, customOptions) : pointOptions
    },
    _getMarkerGroupOptions: function() {
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(false, {}, this._getOptionsForPoint(), {
            hoverStyle: {},
            selectionStyle: {}
        })
    },
    _getAggregationMethod: function(isDiscrete, aggregateByCategory) {
        var options = this.getOptions().aggregation;
        var method = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(options.method);
        var customAggregator = "custom" === method && options.calculate;
        var aggregator;
        if (isDiscrete && !aggregateByCategory) {
            aggregator = _ref => {
                var {
                    data: data
                } = _ref;
                return data[0]
            }
        } else {
            aggregator = this._aggregators[method] || this._aggregators[this._defaultAggregator]
        }
        return customAggregator || aggregator
    },
    _resample(_ref2, data) {
        var {
            interval: interval,
            ticks: ticks,
            aggregateByCategory: aggregateByCategory
        } = _ref2;
        var that = this;
        var isDiscrete = that.argumentAxisType === DISCRETE || that.valueAxisType === DISCRETE;
        var dataIndex = 0;
        var dataSelector = this._getPointDataSelector();
        var options = that.getOptions();
        var addAggregatedData = (target, data, aggregationInfo) => {
            if (!data) {
                return
            }
            var processData = d => {
                var pointData = d && dataSelector(d, options);
                if (pointData && that._checkData(pointData)) {
                    pointData.aggregationInfo = aggregationInfo;
                    target.push(pointData)
                }
            };
            if (Array.isArray(data)) {
                data.forEach(processData)
            } else {
                processData(data)
            }
        };
        var aggregationMethod = this._getAggregationMethod(isDiscrete, aggregateByCategory);
        if (isDiscrete) {
            if (aggregateByCategory) {
                var categories = this.getArgumentAxis().getTranslator().getBusinessRange().categories;
                var groups = categories.reduce((g, category) => {
                    g[category.valueOf()] = [];
                    return g
                }, {});
                data.forEach(dataItem => {
                    groups[dataItem.argument.valueOf()].push(dataItem)
                });
                return categories.reduce((result, c) => {
                    addAggregatedData(result, aggregationMethod({
                        aggregationInterval: null,
                        intervalStart: c,
                        intervalEnd: c,
                        data: groups[c.valueOf()].map(getData)
                    }, that));
                    return result
                }, [])
            } else {
                return data.reduce((result, dataItem, index, data) => {
                    result[1].push(dataItem);
                    if (index === data.length - 1 || (index + 1) % interval === 0) {
                        var dataInInterval = result[1];
                        var aggregationInfo = {
                            aggregationInterval: interval,
                            data: dataInInterval.map(getData)
                        };
                        addAggregatedData(result[0], aggregationMethod(aggregationInfo, that));
                        result[1] = []
                    }
                    return result
                }, [
                    [],
                    []
                ])[0]
            }
        }
        var aggregatedData = [];
        if (1 === ticks.length) {
            var aggregationInfo = {
                intervalStart: ticks[0],
                intervalEnd: ticks[0],
                aggregationInterval: null,
                data: data.map(getData)
            };
            addAggregatedData(aggregatedData, aggregationMethod(aggregationInfo, that), aggregationInfo)
        } else {
            for (var i = 1; i < ticks.length; i++) {
                var intervalEnd = ticks[i];
                var intervalStart = ticks[i - 1];
                var dataInInterval = [];
                while (data[dataIndex] && data[dataIndex].argument < intervalEnd) {
                    if (data[dataIndex].argument >= intervalStart) {
                        dataInInterval.push(data[dataIndex])
                    }
                    dataIndex++
                }
                var _aggregationInfo = {
                    intervalStart: intervalStart,
                    intervalEnd: intervalEnd,
                    aggregationInterval: interval,
                    data: dataInInterval.map(getData)
                };
                addAggregatedData(aggregatedData, aggregationMethod(_aggregationInfo, that), _aggregationInfo)
            }
        }
        that._endUpdateData();
        return aggregatedData
    },
    canRenderCompleteHandle: function() {
        var result = this._canRenderCompleteHandle;
        delete this._canRenderCompleteHandle;
        return !!result
    },
    isHovered: function() {
        return !!(1 & this.fullState)
    },
    isSelected: function() {
        return !!(2 & this.fullState)
    },
    isVisible: function() {
        return this._visible
    },
    getAllPoints: function() {
        this._createAllAggregatedPoints();
        return (this._points || []).slice()
    },
    getPointByPos: function(pos) {
        this._createAllAggregatedPoints();
        return (this._points || [])[pos]
    },
    getVisiblePoints: function() {
        return (this._drawnPoints || []).slice()
    },
    selectPoint: function(point) {
        if (!point.isSelected()) {
            setPointSelectedState(point, this._legendCallback);
            this._eventPipe({
                action: POINT_SELECT,
                target: point
            });
            this._eventTrigger(POINT_SELECTION_CHANGED, {
                target: point
            })
        }
    },
    deselectPoint: function(point) {
        if (point.isSelected()) {
            releasePointSelectedState(point, this._legendCallback);
            this._eventPipe({
                action: POINT_DESELECT,
                target: point
            });
            this._eventTrigger(POINT_SELECTION_CHANGED, {
                target: point
            })
        }
    },
    hover: function(mode) {
        var eventTrigger = this._eventTrigger;
        if (this.isHovered()) {
            return
        }
        this.lastHoverMode = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(mode || this._options.hoverMode);
        this.fullState = this.fullState | HOVER_STATE;
        this._changeStyle(this.lastHoverMode, void 0, this.isSelected() && this.lastSelectionMode !== NONE_MODE);
        eventTrigger(SERIES_HOVER_CHANGED, {
            target: this
        })
    },
    clearHover: function() {
        var eventTrigger = this._eventTrigger;
        if (!this.isHovered()) {
            return
        }
        this._resetNearestPoint();
        this.fullState = this.fullState & ~HOVER_STATE;
        this._changeStyle(this.lastHoverMode, HOVER, this.isSelected() && this.lastSelectionMode !== NONE_MODE);
        eventTrigger(SERIES_HOVER_CHANGED, {
            target: this
        })
    },
    hoverPoint: function(point) {
        if (!point.isHovered()) {
            point.clearHover();
            setPointHoverState(point, this._legendCallback);
            this._canChangeView() && this._applyStyle(this._styles.hover);
            this._eventPipe({
                action: POINT_HOVER,
                target: point
            });
            this._eventTrigger(POINT_HOVER_CHANGED, {
                target: point
            })
        }
    },
    clearPointHover: function() {
        var that = this;
        that.getPoints().some((function(currentPoint) {
            if (currentPoint.isHovered()) {
                releasePointHoverState(currentPoint, that._legendCallback);
                that._canChangeView() && that._applyStyle(that._styles.normal);
                that._eventPipe({
                    action: CLEAR_POINT_HOVER,
                    target: currentPoint
                });
                that._eventTrigger(POINT_HOVER_CHANGED, {
                    target: currentPoint
                });
                return true
            }
            return false
        }))
    },
    showPointTooltip: function(point) {
        triggerEvent(this._extGroups.seriesGroup, "showpointtooltip", point)
    },
    hidePointTooltip: function(point) {
        triggerEvent(this._extGroups.seriesGroup, "hidepointtooltip", point)
    },
    select: function() {
        if (!this.isSelected()) {
            this._setSelectedState(this._options.selectionMode);
            this._eventPipe({
                action: SERIES_SELECT,
                target: this
            });
            this._group.toForeground();
            this._eventTrigger(SERIES_SELECTION_CHANGED, {
                target: this
            })
        }
    },
    clearSelection: function() {
        if (this.isSelected()) {
            this._releaseSelectedState();
            this._eventTrigger(SERIES_SELECTION_CHANGED, {
                target: this
            })
        }
    },
    getPointsByArg: function(arg, skipPointsCreation) {
        var argValue = arg.valueOf();
        var points = this.pointsByArgument[argValue];
        if (!points && !skipPointsCreation && this._createAllAggregatedPoints()) {
            points = this.pointsByArgument[argValue]
        }
        return points || []
    },
    _createAllAggregatedPoints: function() {
        if (this.useAggregation() && !this._useAllAggregatedPoints) {
            this.createPoints(true);
            return true
        }
        return false
    },
    getPointsByKeys: function(arg) {
        return this.getPointsByArg(arg)
    },
    notify: function(data) {
        var that = this;
        var action = data.action;
        var seriesModes = that._seriesModes;
        var target = data.target;
        var targetOptions = target.getOptions();
        var pointHoverMode = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(targetOptions.hoverMode);
        var selectionModeOfPoint = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(targetOptions.selectionMode);
        if (action === POINT_HOVER) {
            that._hoverPointHandler(target, pointHoverMode, data.notifyLegend)
        } else if (action === CLEAR_POINT_HOVER) {
            that._clearPointHoverHandler(target, pointHoverMode, data.notifyLegend)
        } else if (action === SERIES_SELECT) {
            target !== that && "single" === seriesModes.seriesSelectionMode && that.clearSelection()
        } else if (action === POINT_SELECT) {
            if ("single" === seriesModes.pointSelectionMode) {
                that.getPoints().some((function(currentPoint) {
                    if (currentPoint !== target && currentPoint.isSelected()) {
                        that.deselectPoint(currentPoint);
                        return true
                    }
                    return false
                }))
            }
            that._selectPointHandler(target, selectionModeOfPoint)
        } else if (action === POINT_DESELECT) {
            that._deselectPointHandler(target, selectionModeOfPoint)
        }
    },
    _selectPointHandler: function(target, mode) {
        if (mode === ALL_SERIES_POINTS) {
            target.series === this && this._setPointsView(SELECTION, target)
        } else if (mode === ALL_ARGUMENT_POINTS) {
            this.getPointsByKeys(target.argument, target.argumentIndex).forEach((function(currentPoint) {
                currentPoint !== target && currentPoint.setView(SELECTION)
            }))
        }
    },
    _deselectPointHandler: function(target, mode) {
        if (mode === ALL_SERIES_POINTS) {
            target.series === this && this._resetPointsView(SELECTION, target)
        } else if (mode === ALL_ARGUMENT_POINTS) {
            this.getPointsByKeys(target.argument, target.argumentIndex).forEach((function(currentPoint) {
                currentPoint !== target && currentPoint.resetView(SELECTION)
            }))
        }
    },
    _hoverPointHandler: function(target, mode, notifyLegend) {
        if (target.series !== this && mode === ALL_ARGUMENT_POINTS) {
            this.getPointsByKeys(target.argument, target.argumentIndex).forEach((function(currentPoint) {
                currentPoint.setView(HOVER)
            }));
            notifyLegend && this._legendCallback(target)
        } else if (mode === ALL_SERIES_POINTS && target.series === this) {
            this._setPointsView(HOVER, target)
        }
    },
    _clearPointHoverHandler: function(target, mode, notifyLegend) {
        if (mode === ALL_ARGUMENT_POINTS) {
            target.series !== this && this.getPointsByKeys(target.argument, target.argumentIndex).forEach((function(currentPoint) {
                currentPoint.resetView(HOVER)
            }));
            notifyLegend && this._legendCallback(target)
        } else if (mode === ALL_SERIES_POINTS && target.series === this) {
            this._resetPointsView(HOVER, target)
        }
    },
    _deletePoints: function() {
        this._disposePoints(this._points);
        this._points = this._drawnPoints = null
    },
    _deleteTrackers: function() {
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(this._trackers || [], (function(_, tracker) {
            tracker.remove()
        }));
        this._trackersGroup && this._trackersGroup.dispose();
        this._trackers = this._trackersGroup = null
    },
    dispose: function() {
        this._deletePoints();
        this._group.dispose();
        this._labelsGroup && this._labelsGroup.dispose();
        this._errorBarGroup && this._errorBarGroup.dispose();
        this._deleteTrackers();
        this._group = this._extGroups = this._markersGroup = this._elementsGroup = this._bordersGroup = this._labelsGroup = this._errorBarGroup = this._graphics = this._rangeData = this._renderer = this._styles = this._options = this._pointOptions = this._drawnPoints = this.pointsByArgument = this._segments = this._prevSeries = null
    },
    correctPosition: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    drawTrackers: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    getNeighborPoint: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    areErrorBarsVisible: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    getMarginOptions: function() {
        return this._patchMarginOptions({
            percentStick: this.isFullStackedSeries()
        })
    },
    getColor: function() {
        return this.getLegendStyles().normal.fill
    },
    getOpacity: function() {
        return this._options.opacity
    },
    getStackName: function() {
        return this._stackName
    },
    getBarOverlapGroup: function() {
        return this._options.barOverlapGroup
    },
    getPointByCoord: function(x, y) {
        var point = this.getNeighborPoint(x, y);
        return null !== point && void 0 !== point && point.coordsIn(x, y) ? point : null
    },
    getValueAxis: function() {
        return this._valueAxis
    },
    getArgumentAxis: function() {
        return this._argumentAxis
    },
    getMarkersGroup() {
        return this._markersGroup
    },
    getRenderer() {
        return this._renderer
    },
    removePointElements() {
        if (this._markersGroup) {
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(this._points, (_, p) => p.deleteMarker());
            this._markersGroup.dispose();
            this._markersGroup = null
        }
    },
    removeGraphicElements() {
        var that = this;
        if (that._elementsGroup) {
            that._elementsGroup.dispose();
            that._elementsGroup = null
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(that._graphics || [], (_, elem) => {
            that._removeElement(elem)
        });
        that._graphics = null
    },
    removeBordersGroup() {
        if (this._bordersGroup) {
            this._bordersGroup.dispose();
            this._bordersGroup = null
        }
    }
};
var mixins = seriesNS.mixins;


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/bubble_series.js":
/*!*****************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/bubble_series.js ***!
  \*****************************************************************/
/*! exports provided: chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chart", function() { return chart; });
/* harmony import */ var _line_series__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./line_series */ "./node_modules/devextreme/esm/viz/series/line_series.js");
/* harmony import */ var _scatter_series__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scatter_series */ "./node_modules/devextreme/esm/viz/series/scatter_series.js");
/* harmony import */ var _area_series__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./area_series */ "./node_modules/devextreme/esm/viz/series/area_series.js");
/* harmony import */ var _bar_series__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bar_series */ "./node_modules/devextreme/esm/viz/series/bar_series.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/viz/series/bubble_series.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var lineSeries = _line_series__WEBPACK_IMPORTED_MODULE_0__["chart"].line;
var areaSeries = _area_series__WEBPACK_IMPORTED_MODULE_2__["chart"].area;
var chartBarSeries = _bar_series__WEBPACK_IMPORTED_MODULE_3__["chart"].bar;
var polarBarSeries = _bar_series__WEBPACK_IMPORTED_MODULE_3__["polar"].bar;
var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"];
var _each = _core_utils_iterator__WEBPACK_IMPORTED_MODULE_5__["each"];
var _noop = _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"];
var chart = {};
chart.bubble = _extend({}, _scatter_series__WEBPACK_IMPORTED_MODULE_1__["chart"], {
    _calculateErrorBars: _noop,
    _getMainColor: chartBarSeries._getMainColor,
    _createPointStyles: chartBarSeries._createPointStyles,
    _updatePointsVisibility: chartBarSeries._updatePointsVisibility,
    _getOptionsForPoint: chartBarSeries._getOptionsForPoint,
    _applyMarkerClipRect: lineSeries._applyElementsClipRect,
    _parsePointStyle: polarBarSeries._parsePointStyle,
    _createLegendState: areaSeries._createLegendState,
    _setMarkerGroupSettings: polarBarSeries._setMarkerGroupSettings,
    areErrorBarsVisible: _noop,
    _createErrorBarGroup: _noop,
    _checkData: function(data, skippedFields) {
        return _scatter_series__WEBPACK_IMPORTED_MODULE_1__["chart"]._checkData.call(this, data, skippedFields, {
            value: this.getValueFields()[0],
            size: this.getSizeField()
        })
    },
    _getPointDataSelector: function(data, options) {
        var sizeField = this.getSizeField();
        var baseGetter = _scatter_series__WEBPACK_IMPORTED_MODULE_1__["chart"]._getPointDataSelector.call(this);
        return data => {
            var pointData = baseGetter(data);
            pointData.size = data[sizeField];
            return pointData
        }
    },
    _aggregators: {
        avg(_ref, series) {
            var {
                data: data,
                intervalStart: intervalStart,
                intervalEnd: intervalEnd
            } = _ref;
            if (!data.length) {
                return
            }
            var valueField = series.getValueFields()[0];
            var sizeField = series.getSizeField();
            var aggregate = data.reduce((result, item) => {
                result[0] += item[valueField];
                result[1] += item[sizeField];
                result[2]++;
                return result
            }, [0, 0, 0]);
            return {
                [valueField]: aggregate[0] / aggregate[2],
                [sizeField]: aggregate[1] / aggregate[2],
                [series.getArgumentField()]: series._getIntervalCenter(intervalStart, intervalEnd)
            }
        }
    },
    getValueFields: function() {
        return [this._options.valueField || "val"]
    },
    getSizeField: function() {
        return this._options.sizeField || "size"
    },
    _animate: function() {
        var that = this;
        var lastPointIndex = that._drawnPoints.length - 1;
        var labelsGroup = that._labelsGroup;
        var labelAnimFunc = function() {
            labelsGroup && labelsGroup.animate({
                opacity: 1
            }, {
                duration: that._defaultDuration
            })
        };
        _each(that._drawnPoints || [], (function(i, p) {
            p.animate(i === lastPointIndex ? labelAnimFunc : void 0, {
                r: p.bubbleSize,
                translateX: p.x,
                translateY: p.y
            })
        }))
    },
    _patchMarginOptions: function(options) {
        options.processBubbleSize = true;
        return options
    }
});



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/financial_series.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/financial_series.js ***!
  \********************************************************************/
/*! exports provided: stock, candlestick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stock", function() { return stock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "candlestick", function() { return candlestick; });
/* harmony import */ var _scatter_series__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scatter_series */ "./node_modules/devextreme/esm/viz/series/scatter_series.js");
/* harmony import */ var _bar_series__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bar_series */ "./node_modules/devextreme/esm/viz/series/bar_series.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/viz/series/financial_series.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var barSeries = _bar_series__WEBPACK_IMPORTED_MODULE_1__["chart"].bar;
var DEFAULT_FINANCIAL_POINT_SIZE = 10;
var stock = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, _scatter_series__WEBPACK_IMPORTED_MODULE_0__["chart"], {
    _animate: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    _applyMarkerClipRect: function(settings) {
        settings["clip-path"] = this._forceClipping ? this._paneClipRectID : this._widePaneClipRectID
    },
    _updatePointsVisibility: barSeries._updatePointsVisibility,
    _getOptionsForPoint: barSeries._getOptionsForPoint,
    _createErrorBarGroup: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    areErrorBarsVisible: _core_utils_common__WEBPACK_IMPORTED_MODULE_5__["noop"],
    _createGroups: _scatter_series__WEBPACK_IMPORTED_MODULE_0__["chart"]._createGroups,
    _setMarkerGroupSettings: function() {
        var markersGroup = this._markersGroup;
        var styles = this._createPointStyles(this._getMarkerGroupOptions());
        var defaultStyle = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(styles.normal, {
            class: "default-markers"
        });
        var defaultPositiveStyle = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(styles.positive.normal, {
            class: "default-positive-markers"
        });
        var reductionStyle = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(styles.reduction.normal, {
            class: "reduction-markers"
        });
        var reductionPositiveStyle = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(styles.reductionPositive.normal, {
            class: "reduction-positive-markers"
        });
        var markerSettings = {
            class: "dxc-markers"
        };
        this._applyMarkerClipRect(markerSettings);
        markersGroup.attr(markerSettings);
        this._createGroup("defaultMarkersGroup", markersGroup, markersGroup, defaultStyle);
        this._createGroup("reductionMarkersGroup", markersGroup, markersGroup, reductionStyle);
        this._createGroup("defaultPositiveMarkersGroup", markersGroup, markersGroup, defaultPositiveStyle);
        this._createGroup("reductionPositiveMarkersGroup", markersGroup, markersGroup, reductionPositiveStyle)
    },
    _setGroupsSettings: function() {
        _scatter_series__WEBPACK_IMPORTED_MODULE_0__["chart"]._setGroupsSettings.call(this, false)
    },
    _getCreatingPointOptions: function() {
        var defaultPointOptions;
        var creatingPointOptions = this._predefinedPointOptions;
        if (!creatingPointOptions) {
            defaultPointOptions = this._getPointOptions();
            this._predefinedPointOptions = creatingPointOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {
                styles: {}
            }, defaultPointOptions);
            creatingPointOptions.styles.normal = creatingPointOptions.styles.positive.normal = creatingPointOptions.styles.reduction.normal = creatingPointOptions.styles.reductionPositive.normal = {
                "stroke-width": defaultPointOptions.styles && defaultPointOptions.styles.normal && defaultPointOptions.styles.normal["stroke-width"]
            }
        }
        return creatingPointOptions
    },
    _checkData: function(data, skippedFields) {
        var valueFields = this.getValueFields();
        return _scatter_series__WEBPACK_IMPORTED_MODULE_0__["chart"]._checkData.call(this, data, skippedFields, {
            openValue: valueFields[0],
            highValue: valueFields[1],
            lowValue: valueFields[2],
            closeValue: valueFields[3]
        }) && data.highValue === data.highValue && data.lowValue === data.lowValue
    },
    _getPointDataSelector: function(data, options) {
        var that = this;
        var level;
        var valueFields = that.getValueFields();
        var argumentField = that.getArgumentField();
        var openValueField = valueFields[0];
        var highValueField = valueFields[1];
        var lowValueField = valueFields[2];
        var closeValueField = valueFields[3];
        that.level = that._options.reduction.level;
        switch (Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeEnum"])(that.level)) {
            case "open":
                level = openValueField;
                break;
            case "high":
                level = highValueField;
                break;
            case "low":
                level = lowValueField;
                break;
            default:
                level = closeValueField;
                that.level = "close"
        }
        var prevLevelValue;
        return data => {
            var reductionValue = data[level];
            var isReduction = false;
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(reductionValue)) {
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(prevLevelValue)) {
                    isReduction = reductionValue < prevLevelValue
                }
                prevLevelValue = reductionValue
            }
            return {
                argument: data[argumentField],
                highValue: this._processEmptyValue(data[highValueField]),
                lowValue: this._processEmptyValue(data[lowValueField]),
                closeValue: this._processEmptyValue(data[closeValueField]),
                openValue: this._processEmptyValue(data[openValueField]),
                reductionValue: reductionValue,
                tag: data[that.getTagField()],
                isReduction: isReduction,
                data: data
            }
        }
    },
    _parsePointStyle: function(style, defaultColor, innerColor) {
        return {
            stroke: style.color || defaultColor,
            "stroke-width": style.width,
            fill: style.color || innerColor
        }
    },
    _getDefaultStyle: function(options) {
        var mainPointColor = options.color || this._options.mainSeriesColor;
        return {
            normal: this._parsePointStyle(options, mainPointColor, mainPointColor),
            hover: this._parsePointStyle(options.hoverStyle, mainPointColor, mainPointColor),
            selection: this._parsePointStyle(options.selectionStyle, mainPointColor, mainPointColor)
        }
    },
    _getReductionStyle: function(options) {
        var reductionColor = options.reduction.color;
        return {
            normal: this._parsePointStyle({
                color: reductionColor,
                width: options.width,
                hatching: options.hatching
            }, reductionColor, reductionColor),
            hover: this._parsePointStyle(options.hoverStyle, reductionColor, reductionColor),
            selection: this._parsePointStyle(options.selectionStyle, reductionColor, reductionColor)
        }
    },
    _createPointStyles: function(pointOptions) {
        var innerColor = this._options.innerColor;
        var styles = this._getDefaultStyle(pointOptions);
        var positiveStyle = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, styles);
        var reductionStyle = this._getReductionStyle(pointOptions);
        var reductionPositiveStyle = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, {}, reductionStyle);
        positiveStyle.normal.fill = positiveStyle.hover.fill = positiveStyle.selection.fill = innerColor;
        reductionPositiveStyle.normal.fill = reductionPositiveStyle.hover.fill = reductionPositiveStyle.selection.fill = innerColor;
        styles.positive = positiveStyle;
        styles.reduction = reductionStyle;
        styles.reductionPositive = reductionPositiveStyle;
        return styles
    },
    _endUpdateData: function() {
        delete this._predefinedPointOptions
    },
    _defaultAggregator: "ohlc",
    _aggregators: {
        ohlc: (_ref, series) => {
            var {
                intervalStart: intervalStart,
                intervalEnd: intervalEnd,
                data: data
            } = _ref;
            if (!data.length) {
                return
            }
            var result = {};
            var valueFields = series.getValueFields();
            var highValueField = valueFields[1];
            var lowValueField = valueFields[2];
            result[highValueField] = -1 / 0;
            result[lowValueField] = 1 / 0;
            result = data.reduce((function(result, item) {
                if (null !== item[highValueField]) {
                    result[highValueField] = Math.max(result[highValueField], item[highValueField])
                }
                if (null !== item[lowValueField]) {
                    result[lowValueField] = Math.min(result[lowValueField], item[lowValueField])
                }
                return result
            }), result);
            result[valueFields[0]] = data[0][valueFields[0]];
            result[valueFields[3]] = data[data.length - 1][valueFields[3]];
            if (!isFinite(result[highValueField])) {
                result[highValueField] = null
            }
            if (!isFinite(result[lowValueField])) {
                result[lowValueField] = null
            }
            result[series.getArgumentField()] = series._getIntervalCenter(intervalStart, intervalEnd);
            return result
        }
    },
    getValueFields: function() {
        var options = this._options;
        return [options.openValueField || "open", options.highValueField || "high", options.lowValueField || "low", options.closeValueField || "close"]
    },
    getArgumentField: function() {
        return this._options.argumentField || "date"
    },
    _patchMarginOptions: function(options) {
        var pointOptions = this._getCreatingPointOptions();
        var styles = pointOptions.styles;
        var border = [styles.normal, styles.hover, styles.selection].reduce((function(max, style) {
            return Math.max(max, style["stroke-width"])
        }), 0);
        options.size = DEFAULT_FINANCIAL_POINT_SIZE + border;
        options.sizePointNormalState = DEFAULT_FINANCIAL_POINT_SIZE;
        return options
    },
    getSeriesPairCoord(coord, isArgument) {
        var oppositeCoord = null;
        var points = this.getVisiblePoints();
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var tmpCoord = void 0;
            if (isArgument) {
                tmpCoord = p.vx === coord ? (p.openY + p.closeY) / 2 : void 0
            } else {
                var coords = [Math.min(p.lowY, p.highY), Math.max(p.lowY, p.highY)];
                tmpCoord = coord >= coords[0] && coord <= coords[1] ? p.vx : void 0
            }
            if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
                oppositeCoord = tmpCoord;
                break
            }
        }
        return oppositeCoord
    },
    usePointsToDefineAutoHiding: () => false
});
var candlestick = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, stock, {
    _parsePointStyle: function(style, defaultColor, innerColor) {
        var color = style.color || innerColor;
        var base = stock._parsePointStyle.call(this, style, defaultColor, color);
        base.fill = color;
        base.hatching = style.hatching;
        return base
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/helpers/range_data_calculator.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/helpers/range_data_calculator.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/viz/series/helpers/range_data_calculator.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var DISCRETE = "discrete";
var {
    abs: abs,
    floor: floor,
    ceil: ceil,
    min: min
} = Math;

function continuousRangeCalculator(range, minValue, maxValue) {
    range.min = range.min < minValue ? range.min : minValue;
    range.max = range.max > maxValue ? range.max : maxValue
}

function createGetLogFunction(axisType, axis) {
    if ("logarithmic" !== axisType) {
        return null
    }
    var base = axis.getOptions().logarithmBase;
    return value => {
        var log = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getLog"])(abs(value), base);
        var round = log < 0 ? floor : ceil;
        return round(log)
    }
}

function getRangeCalculator(axisType, axis, getLog) {
    var rangeCalculator = continuousRangeCalculator;
    if (axisType === DISCRETE) {
        rangeCalculator = function(range, minValue, maxValue) {
            if (minValue !== maxValue) {
                range.categories.push(maxValue)
            }
            range.categories.push(minValue)
        }
    } else if (axis) {
        rangeCalculator = function(range, value) {
            var interval = axis.calculateInterval(value, range.prevValue);
            var minInterval = range.interval;
            range.interval = (minInterval < interval ? minInterval : interval) || minInterval;
            range.prevValue = value;
            continuousRangeCalculator(range, value, value)
        }
    }
    if (getLog) {
        return (range, minValue, maxValue) => {
            var minArgs = [];
            rangeCalculator(range, minValue, maxValue);
            0 !== minValue && minArgs.push(getLog(minValue));
            0 !== maxValue && minArgs.push(getLog(maxValue));
            var linearThreshold = min.apply(null, minArgs);
            range.linearThreshold = range.linearThreshold < linearThreshold ? range.linearThreshold : linearThreshold
        }
    }
    return rangeCalculator
}

function getInitialRange(axisType, dataType, firstValue) {
    var range = {
        axisType: axisType,
        dataType: dataType
    };
    if (axisType === DISCRETE) {
        range.categories = []
    } else {
        range.min = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isObject"])(firstValue) ? firstValue.min : firstValue;
        range.max = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isObject"])(firstValue) ? firstValue.max : firstValue
    }
    return range
}

function processCategories(range) {
    if (range.categories) {
        range.categories = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["unique"])(range.categories)
    }
    return range
}

function getValueForArgument(point, extraPoint, x, range) {
    if (extraPoint && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(extraPoint.value)) {
        var y1 = point.value;
        var y2 = extraPoint.value;
        var x1 = point.argument;
        var x2 = extraPoint.argument;
        var r = (x - x1) * (y2 - y1) / (x2 - x1) + y1.valueOf();
        return "datetime" === range.dataType ? new Date(r) : r
    } else {
        return point.value
    }
}

function calculateRangeBetweenPoints(rangeCalculator, range, point, prevPoint, bound) {
    var value = getValueForArgument(point, prevPoint, bound, range);
    rangeCalculator(range, value, value)
}

function isLineSeries(series) {
    return series.type.toLowerCase().indexOf("line") >= 0 || series.type.toLowerCase().indexOf("area") >= 0
}

function getViewportReducer(series) {
    var rangeCalculator = getRangeCalculator(series.valueAxisType);
    var argumentAxis = series.getArgumentAxis();
    var viewport = argumentAxis && series.getArgumentAxis().visualRange() || {};
    var calculatePointBetweenPoints = isLineSeries(series) ? calculateRangeBetweenPoints : _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"];
    if (argumentAxis && argumentAxis.getMarginOptions().checkInterval) {
        var range = series.getArgumentAxis().getTranslator().getBusinessRange();
        var add = Object(_core_utils__WEBPACK_IMPORTED_MODULE_0__["getAddFunction"])(range, false);
        var interval = range.interval;
        if (isFinite(interval) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.startValue) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.endValue)) {
            viewport.startValue = add(viewport.startValue, interval, -1);
            viewport.endValue = add(viewport.endValue, interval)
        }
    }
    var viewportFilter = getViewPortFilter(viewport);
    return function(range, point, index, points) {
        var argument = point.argument;
        if (!point.hasValue()) {
            return range
        }
        if (viewportFilter(argument)) {
            if (!range.startCalc) {
                range.startCalc = true;
                calculatePointBetweenPoints(rangeCalculator, range, point, points[index - 1], viewport.startValue)
            }
            rangeCalculator(range, point.getMinValue(), point.getMaxValue())
        } else if (!viewport.categories && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.startValue) && argument > viewport.startValue) {
            if (!range.startCalc) {
                calculatePointBetweenPoints(rangeCalculator, range, point, points[index - 1], viewport.startValue)
            }
            range.endCalc = true;
            calculatePointBetweenPoints(rangeCalculator, range, point, points[index - 1], viewport.endValue)
        }
        return range
    }
}

function getViewPortFilter(viewport) {
    if (viewport.categories) {
        var dictionary = viewport.categories.reduce((result, category) => {
            result[category.valueOf()] = true;
            return result
        }, {});
        return argument => Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(argument) && dictionary[argument.valueOf()]
    }
    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.startValue) && !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.endValue)) {
        return () => true
    }
    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.endValue)) {
        return argument => argument >= viewport.startValue
    }
    if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.startValue)) {
        return argument => argument <= viewport.endValue
    }
    return argument => argument >= viewport.startValue && argument <= viewport.endValue
}
/* harmony default export */ __webpack_exports__["default"] = ({
    getViewPortFilter: getViewPortFilter,
    getArgumentRange: function(series) {
        var data = series._data || [];
        var range = {};
        if (data.length) {
            if (series.argumentAxisType === DISCRETE) {
                range = {
                    categories: data.map(item => item.argument)
                }
            } else {
                var interval;
                if (data.length > 1) {
                    var i1 = series.getArgumentAxis().calculateInterval(data[0].argument, data[1].argument);
                    var i2 = series.getArgumentAxis().calculateInterval(data[data.length - 1].argument, data[data.length - 2].argument);
                    interval = min(i1, i2)
                }
                range = {
                    min: data[0].argument,
                    max: data[data.length - 1].argument,
                    interval: interval
                }
            }
        }
        return processCategories(range)
    },
    getRangeData: function(series) {
        var points = series.getPoints();
        var useAggregation = series.useAggregation();
        var argumentAxis = series.getArgumentAxis();
        var argumentCalculator = getRangeCalculator(series.argumentAxisType, points.length > 1 && argumentAxis, createGetLogFunction(series.argumentAxisType, argumentAxis));
        var valueRangeCalculator = getRangeCalculator(series.valueAxisType, null, createGetLogFunction(series.valueAxisType, series.getValueAxis()));
        var viewportReducer = getViewportReducer(series);
        var range = points.reduce((function(range, point, index, points) {
            var argument = point.argument;
            if (!point.isArgumentCorrect()) {
                return range
            }
            argumentCalculator(range.arg, argument, argument);
            if (point.hasValue()) {
                valueRangeCalculator(range.val, point.getMinValue(), point.getMaxValue());
                viewportReducer(range.viewport, point, index, points)
            }
            return range
        }), {
            arg: getInitialRange(series.argumentAxisType, series.argumentType, null !== argumentAxis && void 0 !== argumentAxis && argumentAxis.aggregatedPointBetweenTicks() ? void 0 : series.getArgumentRangeInitialValue()),
            val: getInitialRange(series.valueAxisType, series.valueType, points.length ? series.getValueRangeInitialValue() : void 0),
            viewport: getInitialRange(series.valueAxisType, series.valueType, points.length ? series.getValueRangeInitialValue() : void 0)
        });
        if (useAggregation) {
            var argumentRange = this.getArgumentRange(series);
            if (series.argumentAxisType === DISCRETE) {
                range.arg = argumentRange
            } else {
                var viewport = argumentAxis.getViewport();
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.startValue) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.length)) {
                    argumentCalculator(range.arg, argumentRange.min, argumentRange.min)
                }
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.endValue) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.length) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(viewport.startValue)) {
                    argumentCalculator(range.arg, argumentRange.max, argumentRange.max)
                }
            }
        }
        processCategories(range.arg);
        processCategories(range.val);
        return range
    },
    getViewport: function(series) {
        var points = series.getPoints();
        var range;
        var reducer = getViewportReducer(series);
        range = getInitialRange(series.valueAxisType, series.valueType, points.length ? series.getValueRangeInitialValue() : void 0);
        points.some((function(point, index) {
            reducer(range, point, index, points);
            return range.endCalc
        }));
        return range
    },
    getPointsInViewPort: function(series) {
        var argumentViewPortFilter = getViewPortFilter(series.getArgumentAxis().visualRange() || {});
        var valueViewPort = series.getValueAxis().visualRange() || {};
        var valueViewPortFilter = getViewPortFilter(valueViewPort);
        var points = series.getPoints();
        var addValue = function(values, point, isEdge) {
            var minValue = point.getMinValue();
            var maxValue = point.getMaxValue();
            var isMinValueInViewPort = valueViewPortFilter(minValue);
            var isMaxValueInViewPort = valueViewPortFilter(maxValue);
            if (isMinValueInViewPort) {
                values.push(minValue)
            }
            if (maxValue !== minValue && isMaxValueInViewPort) {
                values.push(maxValue)
            }
            if (isEdge && !isMinValueInViewPort && !isMaxValueInViewPort) {
                if (!values.length) {
                    values.push(valueViewPort.startValue)
                } else {
                    values.push(valueViewPort.endValue)
                }
            }
        };
        var addEdgePoints = isLineSeries(series) ? function(result, points, index) {
            var point = points[index];
            var prevPoint = points[index - 1];
            var nextPoint = points[index + 1];
            if (nextPoint && argumentViewPortFilter(nextPoint.argument)) {
                addValue(result[1], point, true)
            }
            if (prevPoint && argumentViewPortFilter(prevPoint.argument)) {
                addValue(result[1], point, true)
            }
        } : _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"];
        return points.reduce((function(result, point, index) {
            if (argumentViewPortFilter(point.argument)) {
                addValue(result[0], point)
            } else {
                addEdgePoints(result, points, index)
            }
            return result
        }), [
            [],
            []
        ])
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/line_series.js":
/*!***************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/line_series.js ***!
  \***************************************************************/
/*! exports provided: chart, polar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chart", function() { return chart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polar", function() { return polar; });
/* harmony import */ var _scatter_series__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scatter_series */ "./node_modules/devextreme/esm/viz/series/scatter_series.js");
/* harmony import */ var _core_utils_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/object */ "./node_modules/devextreme/esm/core/utils/object.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_math__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils/math */ "./node_modules/devextreme/esm/core/utils/math.js");
/**
 * DevExtreme (esm/viz/series/line_series.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var DISCRETE = "discrete";
var {
    round: round,
    sqrt: sqrt,
    pow: pow,
    min: min,
    max: max,
    abs: abs
} = Math;
var chart = {};
var polar = {};

function clonePoint(point, newX, newY, newAngle) {
    var p = Object(_core_utils_object__WEBPACK_IMPORTED_MODULE_1__["clone"])(point);
    p.x = newX;
    p.y = newY;
    p.angle = newAngle;
    return p
}

function getTangentPoint(point, prevPoint, centerPoint, tan, nextStepAngle) {
    var correctAngle = point.angle + nextStepAngle;
    var cosSin = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["getCosAndSin"])(correctAngle);
    var x = centerPoint.x + (point.radius + tan * nextStepAngle) * cosSin.cos;
    var y = centerPoint.y - (point.radius + tan * nextStepAngle) * cosSin.sin;
    return clonePoint(prevPoint, x, y, correctAngle)
}

function obtainCubicBezierTCoef(p, p0, p1, p2, p3) {
    var d = p0 - p;
    var c = 3 * p1 - 3 * p0;
    var b = 3 * p2 - 6 * p1 + 3 * p0;
    var a = p3 - 3 * p2 + 3 * p1 - p0;
    return Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_5__["solveCubicEquation"])(a, b, c, d)
}
var lineMethods = {
    autoHidePointMarkersEnabled: () => true,
    _applyGroupSettings: function(style, settings, group) {
        settings = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(settings, style);
        this._applyElementsClipRect(settings);
        group.attr(settings)
    },
    _setGroupsSettings: function(animationEnabled) {
        var style = this._styles.normal;
        this._applyGroupSettings(style.elements, {
            class: "dxc-elements"
        }, this._elementsGroup);
        this._bordersGroup && this._applyGroupSettings(style.border, {
            class: "dxc-borders"
        }, this._bordersGroup);
        _scatter_series__WEBPACK_IMPORTED_MODULE_0__["chart"]._setGroupsSettings.call(this, animationEnabled);
        animationEnabled && this._markersGroup && this._markersGroup.attr({
            opacity: .001
        })
    },
    _createGroups: function() {
        this._createGroup("_elementsGroup", this, this._group);
        this._areBordersVisible() && this._createGroup("_bordersGroup", this, this._group);
        _scatter_series__WEBPACK_IMPORTED_MODULE_0__["chart"]._createGroups.call(this)
    },
    _areBordersVisible: function() {
        return false
    },
    _getDefaultSegment: function(segment) {
        return {
            line: Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["map"])(segment.line || [], (function(pt) {
                return pt.getDefaultCoords()
            }))
        }
    },
    _prepareSegment: function(points) {
        return {
            line: points
        }
    },
    _parseLineOptions: function(options, defaultColor) {
        return {
            stroke: options.color || defaultColor,
            "stroke-width": options.width,
            dashStyle: options.dashStyle || "solid"
        }
    },
    _parseStyle: function(options, defaultColor) {
        return {
            elements: this._parseLineOptions(options, defaultColor)
        }
    },
    _applyStyle: function(style) {
        this._elementsGroup && this._elementsGroup.attr(style.elements);
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(this._graphics || [], (function(_, graphic) {
            graphic.line && graphic.line.attr({
                "stroke-width": style.elements["stroke-width"]
            }).sharp()
        }))
    },
    _drawElement: function(segment, group) {
        return {
            line: this._createMainElement(segment.line, {
                "stroke-width": this._styles.normal.elements["stroke-width"]
            }).append(group)
        }
    },
    _removeElement: function(element) {
        element.line.remove()
    },
    _updateElement: function(element, segment, animate, animationComplete) {
        var params = {
            points: segment.line
        };
        var lineElement = element.line;
        animate ? lineElement.animate(params, {}, animationComplete) : lineElement.attr(params)
    },
    _animateComplete: function() {
        _scatter_series__WEBPACK_IMPORTED_MODULE_0__["chart"]._animateComplete.call(this);
        this._markersGroup && this._markersGroup.animate({
            opacity: 1
        }, {
            duration: this._defaultDuration
        })
    },
    _animate: function() {
        var that = this;
        var lastIndex = that._graphics.length - 1;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(that._graphics || [], (function(i, elem) {
            var complete;
            if (i === lastIndex) {
                complete = function() {
                    that._animateComplete()
                }
            }
            that._updateElement(elem, that._segments[i], true, complete)
        }))
    },
    _drawPoint: function(options) {
        _scatter_series__WEBPACK_IMPORTED_MODULE_0__["chart"]._drawPoint.call(this, {
            point: options.point,
            groups: options.groups
        })
    },
    _createMainElement: function(points, settings) {
        return this._renderer.path(points, "line").attr(settings)
    },
    _sortPoints: function(points, rotated) {
        return rotated ? points.sort((function(p1, p2) {
            return p2.y - p1.y
        })) : points.sort((function(p1, p2) {
            return p1.x - p2.x
        }))
    },
    _drawSegment: function(points, animationEnabled, segmentCount, lastSegment) {
        var rotated = this._options.rotated;
        var segment = this._prepareSegment(points, rotated, lastSegment);
        this._segments.push(segment);
        if (!this._graphics[segmentCount]) {
            this._graphics[segmentCount] = this._drawElement(animationEnabled ? this._getDefaultSegment(segment) : segment, this._elementsGroup)
        } else if (!animationEnabled) {
            this._updateElement(this._graphics[segmentCount], segment)
        }
    },
    _getTrackerSettings: function() {
        var defaultTrackerWidth = this._defaultTrackerWidth;
        var strokeWidthFromElements = this._styles.normal.elements["stroke-width"];
        return {
            "stroke-width": strokeWidthFromElements > defaultTrackerWidth ? strokeWidthFromElements : defaultTrackerWidth,
            fill: "none"
        }
    },
    _getMainPointsFromSegment: function(segment) {
        return segment.line
    },
    _drawTrackerElement: function(segment) {
        return this._createMainElement(this._getMainPointsFromSegment(segment), this._getTrackerSettings(segment))
    },
    _updateTrackerElement: function(segment, element) {
        var settings = this._getTrackerSettings(segment);
        settings.points = this._getMainPointsFromSegment(segment);
        element.attr(settings)
    },
    checkSeriesViewportCoord(axis, coord) {
        if (!_scatter_series__WEBPACK_IMPORTED_MODULE_0__["chart"].checkSeriesViewportCoord.call(this)) {
            return false
        }
        var range = axis.isArgumentAxis ? this.getArgumentRange() : this.getViewport();
        var min = axis.getTranslator().translate(range.categories ? range.categories[0] : range.min);
        var max = axis.getTranslator().translate(range.categories ? range.categories[range.categories.length - 1] : range.max);
        var rotated = this.getOptions().rotated;
        var inverted = axis.getOptions().inverted;
        return axis.isArgumentAxis && (!rotated && !inverted || rotated && inverted) || !axis.isArgumentAxis && (rotated && !inverted || !rotated && inverted) ? coord >= min && coord <= max : coord >= max && coord <= min
    }
};
var lineSeries = chart.line = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, _scatter_series__WEBPACK_IMPORTED_MODULE_0__["chart"], lineMethods, {
    getPointCenterByArg(arg) {
        var value = this.getArgumentAxis().getTranslator().translate(arg);
        return {
            x: value,
            y: value
        }
    },
    getSeriesPairCoord(coord, isArgument) {
        var oppositeCoord = null;
        var nearestPoints = this._getNearestPointsByCoord(coord, isArgument);
        var needValueCoord = isArgument && !this._options.rotated || !isArgument && this._options.rotated;
        for (var i = 0; i < nearestPoints.length; i++) {
            var p = nearestPoints[i];
            var k = (p[1].vy - p[0].vy) / (p[1].vx - p[0].vx);
            var b = p[0].vy - p[0].vx * k;
            var tmpCoord = void 0;
            if (p[1].vx - p[0].vx === 0) {
                tmpCoord = needValueCoord ? p[0].vy : p[0].vx
            } else {
                tmpCoord = needValueCoord ? k * coord + b : (coord - b) / k
            }
            if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
                oppositeCoord = tmpCoord;
                break
            }
        }
        return oppositeCoord
    }
});
chart.stepline = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, lineSeries, {
    _calculateStepLinePoints(points) {
        var segment = [];
        var coordName = this._options.rotated ? "x" : "y";
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_3__["each"])(points, (function(i, pt) {
            var point;
            if (!i) {
                segment.push(pt);
                return
            }
            var step = segment[segment.length - 1][coordName];
            if (step !== pt[coordName]) {
                point = Object(_core_utils_object__WEBPACK_IMPORTED_MODULE_1__["clone"])(pt);
                point[coordName] = step;
                segment.push(point)
            }
            segment.push(pt)
        }));
        return segment
    },
    _prepareSegment: function(points) {
        return lineSeries._prepareSegment(this._calculateStepLinePoints(points))
    },
    getSeriesPairCoord(coord, isArgument) {
        var oppositeCoord;
        var rotated = this._options.rotated;
        var isOpposite = !isArgument && !rotated || isArgument && rotated;
        var coordName = !isOpposite ? "vx" : "vy";
        var oppositeCoordName = !isOpposite ? "vy" : "vx";
        var nearestPoints = this._getNearestPointsByCoord(coord, isArgument);
        for (var i = 0; i < nearestPoints.length; i++) {
            var p = nearestPoints[i];
            var tmpCoord = void 0;
            if (isArgument) {
                tmpCoord = coord !== p[1][coordName] ? p[0][oppositeCoordName] : p[1][oppositeCoordName]
            } else {
                tmpCoord = coord === p[0][coordName] ? p[0][oppositeCoordName] : p[1][oppositeCoordName]
            }
            if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
                oppositeCoord = tmpCoord;
                break
            }
        }
        return oppositeCoord
    }
});
chart.spline = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, lineSeries, {
    _calculateBezierPoints: function(src, rotated) {
        var bezierPoints = [];
        var pointsCopy = src;
        var checkExtremum = function(otherPointCoord, pointCoord, controlCoord) {
            return otherPointCoord > pointCoord && controlCoord > otherPointCoord || otherPointCoord < pointCoord && controlCoord < otherPointCoord ? otherPointCoord : controlCoord
        };
        if (1 !== pointsCopy.length) {
            pointsCopy.forEach((function(curPoint, i) {
                var leftControlX;
                var leftControlY;
                var rightControlX;
                var rightControlY;
                var prevPoint = pointsCopy[i - 1];
                var nextPoint = pointsCopy[i + 1];
                var x1;
                var x2;
                var y1;
                var y2;
                var a;
                var b;
                var c;
                var xc;
                var yc;
                var shift;
                if (!i || i === pointsCopy.length - 1) {
                    bezierPoints.push(curPoint, curPoint);
                    return
                }
                var xCur = curPoint.x;
                var yCur = curPoint.y;
                x1 = prevPoint.x;
                x2 = nextPoint.x;
                y1 = prevPoint.y;
                y2 = nextPoint.y;
                var curIsExtremum = !!(!rotated && (yCur <= prevPoint.y && yCur <= nextPoint.y || yCur >= prevPoint.y && yCur >= nextPoint.y) || rotated && (xCur <= prevPoint.x && xCur <= nextPoint.x || xCur >= prevPoint.x && xCur >= nextPoint.x));
                if (curIsExtremum) {
                    if (!rotated) {
                        rightControlY = leftControlY = yCur;
                        rightControlX = (xCur + nextPoint.x) / 2;
                        leftControlX = (xCur + prevPoint.x) / 2
                    } else {
                        rightControlX = leftControlX = xCur;
                        rightControlY = (yCur + nextPoint.y) / 2;
                        leftControlY = (yCur + prevPoint.y) / 2
                    }
                } else {
                    a = y2 - y1;
                    b = x1 - x2;
                    c = y1 * x2 - x1 * y2;
                    if (!rotated) {
                        if (!b) {
                            bezierPoints.push(curPoint, curPoint, curPoint);
                            return
                        }
                        xc = xCur;
                        yc = -1 * (a * xc + c) / b;
                        shift = yc - yCur;
                        y1 -= shift;
                        y2 -= shift
                    } else {
                        if (!a) {
                            bezierPoints.push(curPoint, curPoint, curPoint);
                            return
                        }
                        yc = yCur;
                        xc = -1 * (b * yc + c) / a;
                        shift = xc - xCur;
                        x1 -= shift;
                        x2 -= shift
                    }
                    rightControlX = (xCur + .5 * x2) / 1.5;
                    rightControlY = (yCur + .5 * y2) / 1.5;
                    leftControlX = (xCur + .5 * x1) / 1.5;
                    leftControlY = (yCur + .5 * y1) / 1.5
                }
                if (!rotated) {
                    leftControlY = checkExtremum(prevPoint.y, yCur, leftControlY);
                    rightControlY = checkExtremum(nextPoint.y, yCur, rightControlY)
                } else {
                    leftControlX = checkExtremum(prevPoint.x, xCur, leftControlX);
                    rightControlX = checkExtremum(nextPoint.x, xCur, rightControlX)
                }
                var leftPoint = clonePoint(curPoint, leftControlX, leftControlY);
                var rightPoint = clonePoint(curPoint, rightControlX, rightControlY);
                bezierPoints.push(leftPoint, curPoint, rightPoint)
            }))
        } else {
            bezierPoints.push(pointsCopy[0])
        }
        return bezierPoints
    },
    _prepareSegment: function(points, rotated) {
        return lineSeries._prepareSegment(this._calculateBezierPoints(points, rotated))
    },
    _createMainElement: function(points, settings) {
        return this._renderer.path(points, "bezier").attr(settings)
    },
    getSeriesPairCoord(coord, isArgument) {
        var oppositeCoord = null;
        var isOpposite = !isArgument && !this._options.rotated || isArgument && this._options.rotated;
        var coordName = !isOpposite ? "vx" : "vy";
        var bezierCoordName = !isOpposite ? "x" : "y";
        var oppositeCoordName = !isOpposite ? "vy" : "vx";
        var bezierOppositeCoordName = !isOpposite ? "y" : "x";
        var axis = !isArgument ? this.getArgumentAxis() : this.getValueAxis();
        var visibleArea = axis.getVisibleArea();
        var nearestPoints = this._getNearestPointsByCoord(coord, isArgument);
        var _loop = function(i) {
            var p = nearestPoints[i];
            if (1 === p.length) {
                visibleArea[0] <= p[0][oppositeCoordName] && visibleArea[1] >= p[0][oppositeCoordName] && (oppositeCoord = p[0][oppositeCoordName])
            } else {
                var ts = obtainCubicBezierTCoef(coord, p[0][coordName], p[1][bezierCoordName], p[2][bezierCoordName], p[3][coordName]);
                ts.forEach(t => {
                    if (t >= 0 && t <= 1) {
                        var tmpCoord = Math.pow(1 - t, 3) * p[0][oppositeCoordName] + 3 * Math.pow(1 - t, 2) * t * p[1][bezierOppositeCoordName] + 3 * (1 - t) * t * t * p[2][bezierOppositeCoordName] + t * t * t * p[3][oppositeCoordName];
                        if (visibleArea[0] <= tmpCoord && visibleArea[1] >= tmpCoord) {
                            oppositeCoord = tmpCoord
                        }
                    }
                })
            }
            if (null !== oppositeCoord) {
                return "break"
            }
        };
        for (var i = 0; i < nearestPoints.length; i++) {
            var _ret = _loop(i);
            if ("break" === _ret) {
                break
            }
        }
        return oppositeCoord
    },
    _getNearestPoints(point, nextPoint, bezierPoints) {
        var index = bezierPoints.indexOf(point);
        return [point, bezierPoints[index + 1], bezierPoints[index + 2], nextPoint]
    },
    _getBezierPoints() {
        return this._segments.length > 0 ? this._segments.reduce((a, seg) => a.concat(seg.line), []) : []
    }
});
polar.line = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, _scatter_series__WEBPACK_IMPORTED_MODULE_0__["polar"], lineMethods, {
    _sortPoints: function(points) {
        return points
    },
    _prepareSegment: function(points, rotated, lastSegment) {
        var preparedPoints = [];
        var centerPoint = this.getValueAxis().getCenter();
        var i;
        lastSegment && this._closeSegment(points);
        if (this.argumentAxisType !== DISCRETE && this.valueAxisType !== DISCRETE) {
            for (i = 1; i < points.length; i++) {
                preparedPoints = preparedPoints.concat(this._getTangentPoints(points[i], points[i - 1], centerPoint, i === points.length - 1))
            }
            if (!preparedPoints.length) {
                preparedPoints = points
            }
        } else {
            return lineSeries._prepareSegment.call(this, points)
        }
        return {
            line: preparedPoints
        }
    },
    _getRemainingAngle: function(angle) {
        var normAngle = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeAngle"])(angle);
        return angle >= 0 ? 360 - normAngle : -normAngle
    },
    _closeSegment(points) {
        var point;
        if (this._segments.length) {
            point = this._segments[0].line[0]
        } else {
            point = clonePoint(points[0], points[0].x, points[0].y, points[0].angle)
        }
        point = this._modifyReflectedPoint(point, points[points.length - 1]);
        if (point) {
            points.push(point)
        }
    },
    _modifyReflectedPoint(point, lastPoint) {
        if (lastPoint.angle === point.angle) {
            return
        }
        if (Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeAngle"])(round(lastPoint.angle)) === Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["normalizeAngle"])(round(point.angle))) {
            point.angle = lastPoint.angle
        } else {
            var differenceAngle = lastPoint.angle - point.angle;
            point.angle = lastPoint.angle + this._getRemainingAngle(differenceAngle)
        }
        return point
    },
    _getTangentPoints: function(point, prevPoint, centerPoint, isLastSegment) {
        var tangentPoints = [];
        var betweenAngle = Math.round(prevPoint.angle - point.angle);
        var tan = (prevPoint.radius - point.radius) / betweenAngle;
        var i;
        if (0 === betweenAngle) {
            tangentPoints = [prevPoint, point]
        } else if (betweenAngle > 0) {
            var angle = isLastSegment ? betweenAngle : betweenAngle - 1;
            for (i = angle; i >= 0; i--) {
                tangentPoints.push(getTangentPoint(point, prevPoint, centerPoint, tan, i))
            }
        } else {
            var _angle = isLastSegment ? betweenAngle : betweenAngle + 1;
            for (i = 0; i >= _angle; i--) {
                tangentPoints.push(getTangentPoint(point, prevPoint, centerPoint, tan, betweenAngle - i))
            }
        }
        return tangentPoints
    },
    getSeriesPairCoord(params, isArgument) {
        var argAxis = this.getArgumentAxis();
        var paramName = isArgument ? "angle" : "radius";
        var coordParam = params[paramName];
        var centerPoint = argAxis.getCenter();
        var isInsideInterval = (prevPoint, point, _ref) => {
            var {
                x: x,
                y: y
            } = _ref;
            return (p1 = {
                x: x,
                y: y
            }, p2 = centerPoint, sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2))) <= argAxis.getRadius() && min(prevPoint.x, point.x) <= x && max(prevPoint.x, point.x) >= x && min(prevPoint.y, point.y) <= y && max(prevPoint.y, point.y) >= y;
            var p1, p2
        };
        var coords;
        var neighborPoints = this.getNeighborPoints(coordParam, paramName);
        if (1 === neighborPoints.length) {
            coords = neighborPoints[0]
        } else if (neighborPoints.length > 1) {
            var prevPoint = neighborPoints[0];
            var point = neighborPoints[1];
            if (this.argumentAxisType !== DISCRETE && this.valueAxisType !== DISCRETE) {
                var tan;
                var stepAngle;
                if (isArgument) {
                    tan = (prevPoint.radius - point.radius) / (prevPoint.angle - point.angle);
                    stepAngle = coordParam - point.angle
                } else {
                    tan = (prevPoint.radius - point.radius) / (prevPoint.angle - point.angle);
                    stepAngle = (coordParam - point.radius) / tan
                }
                coords = getTangentPoint(point, prevPoint, centerPoint, tan, stepAngle)
            } else if (isArgument) {
                var cosSin = Object(_core_utils__WEBPACK_IMPORTED_MODULE_4__["getCosAndSin"])(-coordParam);
                var k1 = (point.y - prevPoint.y) / (point.x - prevPoint.x);
                var b1 = prevPoint.y - prevPoint.x * k1;
                var k2 = cosSin.sin / cosSin.cos;
                var b2 = centerPoint.y - k2 * centerPoint.x;
                var x = (b2 - b1) / (k1 - k2);
                var y = k1 * x + b1;
                if (isInsideInterval(prevPoint, point, {
                        x: x,
                        y: y
                    })) {
                    var quarter = abs(Object(_core_utils_math__WEBPACK_IMPORTED_MODULE_5__["trunc"])((360 + coordParam) / 90) % 4);
                    if (0 === quarter && x >= centerPoint.x && y <= centerPoint.y || 1 === quarter && x <= centerPoint.x && y <= centerPoint.y || 2 === quarter && x <= centerPoint.x && y >= centerPoint.y || 3 === quarter && x >= centerPoint.x && y >= centerPoint.y) {
                        coords = {
                            x: x,
                            y: y
                        }
                    }
                }
            } else {
                var k = (point.y - prevPoint.y) / (point.x - prevPoint.x);
                var y0 = prevPoint.y - prevPoint.x * k;
                var a = 1 + k * k;
                var b = -2 * centerPoint.x + 2 * k * y0 - 2 * k * centerPoint.y;
                var c = -pow(coordParam, 2) + pow(y0 - centerPoint.y, 2) + pow(centerPoint.x, 2);
                var d = b * b - 4 * a * c;
                if (d >= 0) {
                    var x1 = (-b - sqrt(d)) / (2 * a);
                    var x2 = (-b + sqrt(d)) / (2 * a);
                    var y1 = k * x1 + y0;
                    var y2 = k * x2 + y0;
                    coords = isInsideInterval(prevPoint, point, {
                        x: x1,
                        y: y1
                    }) ? {
                        x: x1,
                        y: y1
                    } : isInsideInterval(prevPoint, point, {
                        x: x2,
                        y: y2
                    }) ? {
                        x: x2,
                        y: y2
                    } : void 0
                }
            }
        }
        return coords
    },
    getNeighborPoints(param, paramName) {
        var points = this.getPoints();
        var neighborPoints = [];
        if (this.getOptions().closed) {
            points = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_2__["extend"])(true, [], points);
            var lastPoint = points[points.length - 1];
            var firstPointCopy = clonePoint(points[0], points[0].x, points[0].y, points[0].angle);
            var lastPointCopy = clonePoint(lastPoint, lastPoint.x, lastPoint.y, lastPoint.angle);
            var rearwardRefPoint = this._modifyReflectedPoint(firstPointCopy, lastPoint);
            var forwardRefPoint = this._modifyReflectedPoint(lastPointCopy, points[0]);
            if (forwardRefPoint) {
                points.unshift(forwardRefPoint)
            }
            if (rearwardRefPoint) {
                points.push(rearwardRefPoint)
            }
        }
        for (var i = 1; i < points.length; i++) {
            if (points[i - 1][paramName] === param) {
                neighborPoints.push(points[i - 1])
            } else if (points[i][paramName] === param) {
                neighborPoints.push(points[i])
            } else if (points[i][paramName] > param && points[i - 1][paramName] < param || points[i - 1][paramName] > param && points[i][paramName] < param) {
                neighborPoints.push(points[i - 1]);
                neighborPoints.push(points[i])
            }
            if (neighborPoints.length > 0) {
                break
            }
        }
        return neighborPoints
    }
});



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/pie_series.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/pie_series.js ***!
  \**************************************************************/
/*! exports provided: pie, doughnut, donut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pie", function() { return pie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doughnut", function() { return doughnut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "donut", function() { return donut; });
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _scatter_series__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scatter_series */ "./node_modules/devextreme/esm/viz/series/scatter_series.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _bar_series__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bar_series */ "./node_modules/devextreme/esm/viz/series/bar_series.js");
/**
 * DevExtreme (esm/viz/series/pie_series.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */






var chartScatterSeries = _scatter_series__WEBPACK_IMPORTED_MODULE_2__["chart"];
var barSeries = _bar_series__WEBPACK_IMPORTED_MODULE_5__["chart"].bar;
var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_4__["extend"];
var _each = _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"];
var _noop = _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"];
var _map = _core_utils__WEBPACK_IMPORTED_MODULE_3__["map"];
var _isFinite = isFinite;
var _max = Math.max;
var ANIMATION_DURATION = .7;
var INSIDE = "inside";
var pie = _extend({}, barSeries, {
    _setGroupsSettings: function() {
        chartScatterSeries._setGroupsSettings.apply(this, arguments);
        this._labelsGroup.attr({
            "pointer-events": null
        })
    },
    _createErrorBarGroup: _noop,
    _drawPoint: function(options) {
        var point = options.point;
        var legendCallback = this._legendCallback;
        chartScatterSeries._drawPoint.call(this, options);
        !point.isVisible() && point.setInvisibility();
        point.isSelected() && legendCallback()
    },
    _getOldPoint: function(data, oldPointsByArgument, index) {
        var point = (this._points || [])[index];
        if (point) {
            oldPointsByArgument[point.argument.valueOf()] = oldPointsByArgument[point.argument.valueOf()].filter(p => p !== point)
        }
        return point
    },
    adjustLabels: function(moveLabelsFromCenter) {
        return (this._points || []).reduce((r, p) => {
            if (p._label.isVisible()) {
                p.setLabelTrackerData();
                r = p.applyWordWrap(moveLabelsFromCenter) || r;
                p.updateLabelCoord(moveLabelsFromCenter);
                return r
            }
        }, false)
    },
    _applyElementsClipRect: _noop,
    getColor: _noop,
    areErrorBarsVisible: _noop,
    drawLabelsWOPoints: function() {
        if (this._options.label.position === INSIDE) {
            return false
        }
        this._labelsGroup.append(this._extGroups.labelsGroup);
        (this._points || []).forEach((function(point) {
            point.drawLabel()
        }));
        return true
    },
    getPointsCount: function() {
        return this._data.filter(d => this._checkData(d)).length
    },
    setMaxPointsCount: function(count) {
        this._pointsCount = count
    },
    _getCreatingPointOptions: function(data, dataIndex) {
        return this._getPointOptions(data, dataIndex)
    },
    _updateOptions: function(options) {
        this.labelSpace = 0;
        this.innerRadius = "pie" === this.type ? 0 : options.innerRadius
    },
    _checkData: function(data, skippedFields) {
        var base = barSeries._checkData.call(this, data, skippedFields, {
            value: this.getValueFields()[0]
        });
        return this._options.paintNullPoints ? base : base && null !== data.value
    },
    _createGroups: chartScatterSeries._createGroups,
    _setMarkerGroupSettings: function() {
        this._markersGroup.attr({
            class: "dxc-markers"
        })
    },
    _getMainColor(data, point) {
        var pointsByArg = this.getPointsByArg(data.argument);
        var argumentIndex = point ? pointsByArg.indexOf(point) : pointsByArg.length;
        return this._options.mainSeriesColor(data.argument, argumentIndex, this._pointsCount)
    },
    _getPointOptions: function(data) {
        return this._parsePointOptions(this._preparePointOptions(), this._options.label, data)
    },
    _getRangeData: function() {
        return this._rangeData
    },
    _createPointStyles: function(pointOptions, data, point) {
        var mainColor = pointOptions.color || this._getMainColor(data, point);
        return {
            normal: this._parsePointStyle(pointOptions, mainColor, mainColor),
            hover: this._parsePointStyle(pointOptions.hoverStyle, mainColor, mainColor),
            selection: this._parsePointStyle(pointOptions.selectionStyle, mainColor, mainColor),
            legendStyles: {
                normal: this._createLegendState(pointOptions, mainColor),
                hover: this._createLegendState(pointOptions.hoverStyle, mainColor),
                selection: this._createLegendState(pointOptions.selectionStyle, mainColor)
            }
        }
    },
    _getArrangeMinShownValue: function(points, total) {
        var minSegmentSize = this._options.minSegmentSize;
        var totalMinSegmentSize = 0;
        var totalNotMinValues = 0;
        total = total || points.length;
        _each(points, (function(_, point) {
            if (point.isVisible()) {
                if (point.normalInitialValue < minSegmentSize * total / 360) {
                    totalMinSegmentSize += minSegmentSize
                } else {
                    totalNotMinValues += point.normalInitialValue
                }
            }
        }));
        return totalMinSegmentSize < 360 ? minSegmentSize * totalNotMinValues / (360 - totalMinSegmentSize) : 0
    },
    _applyArrangeCorrection: function(points, minShownValue, total) {
        var options = this._options;
        var isClockWise = "anticlockwise" !== options.segmentsDirection;
        var shiftedAngle = _isFinite(options.startAngle) ? Object(_core_utils__WEBPACK_IMPORTED_MODULE_3__["normalizeAngle"])(options.startAngle) : 0;
        var minSegmentSize = options.minSegmentSize;
        var percent;
        var correction = 0;
        var zeroTotalCorrection = 0;
        if (0 === total) {
            total = points.filter((function(el) {
                return el.isVisible()
            })).length;
            zeroTotalCorrection = 1
        }
        _each(isClockWise ? points : points.concat([]).reverse(), (function(_, point) {
            var val = point.isVisible() ? zeroTotalCorrection || point.normalInitialValue : 0;
            var updatedZeroValue;
            if (minSegmentSize && point.isVisible() && val < minShownValue) {
                updatedZeroValue = minShownValue
            }
            percent = val / total;
            point.correctValue(correction, percent, zeroTotalCorrection + (updatedZeroValue || 0));
            point.shiftedAngle = shiftedAngle;
            correction += updatedZeroValue || val
        }));
        this._rangeData = {
            val: {
                min: 0,
                max: correction
            }
        }
    },
    _removePoint: function(point) {
        var points = this.getPointsByArg(point.argument);
        points.splice(points.indexOf(point), 1);
        point.dispose()
    },
    arrangePoints: function() {
        var that = this;
        var originalPoints = that._points || [];
        var minSegmentSize = that._options.minSegmentSize;
        var minShownValue;
        var isAllPointsNegative = true;
        var i = 0;
        var len = originalPoints.length;
        while (i < len && isAllPointsNegative) {
            isAllPointsNegative = originalPoints[i].value <= 0;
            i++
        }
        var points = that._points = _map(originalPoints, (function(point) {
            if (null === point.value || !isAllPointsNegative && point.value < 0) {
                that._removePoint(point);
                return null
            } else {
                return point
            }
        }));
        var maxValue = points.reduce((function(max, p) {
            return _max(max, Math.abs(p.initialValue))
        }), 0);
        points.forEach((function(p) {
            p.normalInitialValue = p.initialValue / (0 !== maxValue ? maxValue : 1)
        }));
        var total = points.reduce((function(total, point) {
            return total + (point.isVisible() ? point.normalInitialValue : 0)
        }), 0);
        if (minSegmentSize) {
            minShownValue = this._getArrangeMinShownValue(points, total)
        }
        that._applyArrangeCorrection(points, minShownValue, total)
    },
    correctPosition: function(correction, canvas) {
        _each(this._points, (function(_, point) {
            point.correctPosition(correction)
        }));
        this.setVisibleArea(canvas)
    },
    correctRadius: function(correction) {
        this._points.forEach((function(point) {
            point.correctRadius(correction)
        }))
    },
    correctLabelRadius: function(labelRadius) {
        this._points.forEach((function(point) {
            point.correctLabelRadius(labelRadius)
        }))
    },
    setVisibleArea: function(canvas) {
        this._visibleArea = {
            minX: canvas.left,
            maxX: canvas.width - canvas.right,
            minY: canvas.top,
            maxY: canvas.height - canvas.bottom
        }
    },
    _applyVisibleArea: _noop,
    _animate: function(firstDrawing) {
        var that = this;
        var points = that._points;
        var pointsCount = points && points.length;
        var completeFunc = function() {
            that._animateComplete()
        };
        var animatePoint;
        if (firstDrawing) {
            animatePoint = function(p, i) {
                p.animate(i === pointsCount - 1 ? completeFunc : void 0, ANIMATION_DURATION, (1 - ANIMATION_DURATION) * i / (pointsCount - 1))
            }
        } else {
            animatePoint = function(p, i) {
                p.animate(i === pointsCount - 1 ? completeFunc : void 0)
            }
        }
        points.forEach(animatePoint)
    },
    getVisiblePoints: function() {
        return _map(this._points, (function(p) {
            return p.isVisible() ? p : null
        }))
    },
    getPointsByKeys: function(arg, argumentIndex) {
        var pointsByArg = this.getPointsByArg(arg);
        return pointsByArg[argumentIndex] && [pointsByArg[argumentIndex]] || []
    }
});
var doughnut = pie;
var donut = pie;


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/bar_point.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/bar_point.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _symbol_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol_point */ "./node_modules/devextreme/esm/viz/series/points/symbol_point.js");
/**
 * DevExtreme (esm/viz/series/points/bar_point.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"];
var _math = Math;
var _floor = _math.floor;
var _abs = _math.abs;

var CANVAS_POSITION_DEFAULT = "canvas_position_default";
var DEFAULT_BAR_TRACKER_SIZE = 9;
var CORRECTING_BAR_TRACKER_VALUE = 4;
var RIGHT = "right";
var LEFT = "left";
var TOP = "top";
var BOTTOM = "bottom";

function getLabelOrientation(point) {
    var initialValue = point.initialValue;
    var invert = point._getValTranslator().getBusinessRange().invert;
    var isDiscreteValue = "discrete" === point.series.valueAxisType;
    var isFullStacked = point.series.isFullStackedSeries();
    var notAxisInverted = !isDiscreteValue && (initialValue >= 0 && !invert || initialValue < 0 && invert) || isDiscreteValue && !invert || isFullStacked;
    return notAxisInverted ? TOP : BOTTOM
}
/* harmony default export */ __webpack_exports__["default"] = (_extend({}, _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"], {
    correctCoordinates(correctOptions) {
        var correction = _floor(correctOptions.offset - correctOptions.width / 2);
        if (this._options.rotated) {
            this.height = correctOptions.width;
            this.yCorrection = correction;
            this.xCorrection = null
        } else {
            this.width = correctOptions.width;
            this.xCorrection = correction;
            this.yCorrection = null
        }
    },
    _getGraphicBBox: function(location) {
        var bBox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
        if (location) {
            var isTop = "top" === location;
            if (!this._options.rotated) {
                bBox.y = isTop ? bBox.y : bBox.y + bBox.height;
                bBox.height = 0
            } else {
                bBox.x = isTop ? bBox.x + bBox.width : bBox.x;
                bBox.width = 0
            }
        }
        return bBox
    },
    _getLabelConnector: function(location) {
        return this._getGraphicBBox(location)
    },
    _getLabelPosition: function() {
        var position = getLabelOrientation(this);
        if (this._options.rotated) {
            position = position === TOP ? RIGHT : LEFT
        }
        return position
    },
    _getLabelCoords: function(label) {
        var coords;
        if (0 === this.initialValue && this.series.isFullStackedSeries()) {
            if (!this._options.rotated) {
                coords = this._getLabelCoordOfPosition(label, TOP)
            } else {
                coords = this._getLabelCoordOfPosition(label, RIGHT)
            }
        } else if ("inside" === label.getLayoutOptions().position) {
            coords = this._getLabelCoordOfPosition(label, "inside")
        } else {
            coords = _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"]._getLabelCoords.call(this, label)
        }
        return coords
    },
    _drawLabel: function() {
        this._label.pointPosition = "inside" !== this._label.getLayoutOptions().position && getLabelOrientation(this);
        _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"]._drawLabel.call(this)
    },
    hideInsideLabel: function(label, coord) {
        var graphicBBox = this._getGraphicBBox();
        var labelBBox = label.getBoundingRect();
        if (this._options.resolveLabelsOverlapping) {
            if ((coord.y <= graphicBBox.y && coord.y + labelBBox.height >= graphicBBox.y + graphicBBox.height || coord.x <= graphicBBox.x && coord.x + labelBBox.width >= graphicBBox.x + graphicBBox.width) && !(coord.y > graphicBBox.y + graphicBBox.height || coord.y + labelBBox.height < graphicBBox.y || coord.x > graphicBBox.x + graphicBBox.width || coord.x + labelBBox.width < graphicBBox.x)) {
                label.draw(false);
                return true
            }
        }
        return false
    },
    _showForZeroValues: function() {
        return this._options.label.showForZeroValues || this.initialValue
    },
    _drawMarker(renderer, group, animationEnabled) {
        var style = this._getStyle();
        var r = this._options.cornerRadius;
        var rotated = this._options.rotated;
        var {
            x: x,
            y: y,
            width: width,
            height: height
        } = this.getMarkerCoords();
        if (animationEnabled) {
            if (rotated) {
                width = 0;
                x = this.defaultX
            } else {
                height = 0;
                y = this.defaultY
            }
        }
        this.graphic = renderer.rect(x, y, width, height).attr({
            rx: r,
            ry: r
        }).smartAttr(style).data({
            "chart-data-point": this
        }).append(group)
    },
    _getSettingsForTracker: function() {
        var y = this.y;
        var height = this.height;
        var x = this.x;
        var width = this.width;
        if (this._options.rotated) {
            if (1 === width) {
                width = DEFAULT_BAR_TRACKER_SIZE;
                x -= CORRECTING_BAR_TRACKER_VALUE
            }
        } else if (1 === height) {
            height = DEFAULT_BAR_TRACKER_SIZE;
            y -= CORRECTING_BAR_TRACKER_VALUE
        }
        return {
            x: x,
            y: y,
            width: width,
            height: height
        }
    },
    getGraphicSettings: function() {
        var graphic = this.graphic;
        return {
            x: graphic.attr("x"),
            y: graphic.attr("y"),
            height: graphic.attr("height"),
            width: graphic.attr("width")
        }
    },
    _getEdgeTooltipParams() {
        var isPositive = this.value >= 0;
        var xCoord;
        var yCoord;
        var invertedBusinessRange = this._getValTranslator().getBusinessRange().invert;
        var {
            x: x,
            y: y,
            width: width,
            height: height
        } = this;
        if (this._options.rotated) {
            yCoord = y + height / 2;
            if (invertedBusinessRange) {
                xCoord = isPositive ? x : x + width
            } else {
                xCoord = isPositive ? x + width : x
            }
        } else {
            xCoord = x + width / 2;
            if (invertedBusinessRange) {
                yCoord = isPositive ? y + height : y
            } else {
                yCoord = isPositive ? y : y + height
            }
        }
        return {
            x: xCoord,
            y: yCoord,
            offset: 0
        }
    },
    getTooltipParams: function(location) {
        if ("edge" === location) {
            return this._getEdgeTooltipParams()
        }
        var center = this.getCenterCoord();
        center.offset = 0;
        return center
    },
    getCenterCoord() {
        var {
            width: width,
            height: height,
            x: x,
            y: y
        } = this;
        return {
            x: x + width / 2,
            y: y + height / 2
        }
    },
    _truncateCoord: function(coord, bounds) {
        if (null === coord) {
            return coord
        }
        if (coord < bounds[0]) {
            return bounds[0]
        }
        if (coord > bounds[1]) {
            return bounds[1]
        }
        return coord
    },
    _getErrorBarBaseEdgeLength() {
        return this._options.rotated ? this.height : this.width
    },
    _translateErrorBars: function(argVisibleArea) {
        _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"]._translateErrorBars.call(this);
        if (this._errorBarPos < argVisibleArea[0] || this._errorBarPos > argVisibleArea[1]) {
            this._errorBarPos = void 0
        }
    },
    _translate: function() {
        var rotated = this._options.rotated;
        var valAxis = rotated ? "x" : "y";
        var argAxis = rotated ? "y" : "x";
        var valIntervalName = rotated ? "width" : "height";
        var argIntervalName = rotated ? "height" : "width";
        var argTranslator = this._getArgTranslator();
        var valTranslator = this._getValTranslator();
        var argVisibleArea = this.series.getArgumentAxis().getVisibleArea();
        var valVisibleArea = this.series.getValueAxis().getVisibleArea();
        var arg = argTranslator.translate(this.argument);
        var val = valTranslator.translate(this.value, 1);
        var minVal = valTranslator.translate(this.minValue);
        this[argAxis] = arg = null === arg ? arg : arg + (this[argAxis + "Correction"] || 0);
        this["v" + valAxis] = val;
        this["v" + argAxis] = arg + this[argIntervalName] / 2;
        val = this._truncateCoord(val, valVisibleArea);
        minVal = this._truncateCoord(minVal, valVisibleArea);
        this[valIntervalName] = _abs(val - minVal);
        val = val < minVal ? val : minVal;
        this._calculateVisibility(rotated ? val : arg, rotated ? arg : val, this.width, this.height);
        this[valAxis] = null === val ? val : val + (this[valAxis + "Correction"] || 0);
        this["min" + valAxis.toUpperCase()] = null === minVal ? minVal : minVal + (this[valAxis + "Correction"] || 0);
        this["default" + valAxis.toUpperCase()] = valTranslator.translate(CANVAS_POSITION_DEFAULT);
        this._translateErrorBars(argVisibleArea);
        if (this.inVisibleArea && null !== this[argAxis]) {
            if (this[argAxis] < argVisibleArea[0]) {
                this[argIntervalName] = this[argIntervalName] - (argVisibleArea[0] - this[argAxis]);
                this[argAxis] = argVisibleArea[0]
            }
            if (this[argAxis] + this[argIntervalName] > argVisibleArea[1]) {
                this[argIntervalName] = argVisibleArea[1] - this[argAxis]
            }
        }
    },
    _updateMarker: function(animationEnabled, style) {
        this.graphic.smartAttr(_extend({}, style, !animationEnabled ? this.getMarkerCoords() : {}))
    },
    getMarkerCoords: function() {
        var x = this.x;
        var y = this.y;
        var width = this.width;
        var height = this.height;
        var argAxis = this.series.getArgumentAxis();
        var rotated = this._options.rotated;
        if (argAxis.getAxisPosition) {
            var axisOptions = argAxis.getOptions();
            var edgeOffset = Math.round(axisOptions.width / 2);
            var argAxisPosition = argAxis.getAxisPosition();
            if (axisOptions.visible) {
                if (!rotated) {
                    height -= this.minY === this.defaultY && this.minY === argAxisPosition - argAxis.getAxisShift() ? edgeOffset : 0;
                    height < 0 && (height = 0)
                } else {
                    var isStartFromAxis = this.minX === this.defaultX && this.minX === argAxisPosition - argAxis.getAxisShift();
                    x += isStartFromAxis ? edgeOffset : 0;
                    width -= isStartFromAxis ? edgeOffset : 0;
                    width < 0 && (width = 0)
                }
            }
        }
        return {
            x: x,
            y: y,
            width: width,
            height: height
        }
    },
    coordsIn: function(x, y) {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/base_point.js":
/*!*********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/base_point.js ***!
  \*********************************************************************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
/* harmony import */ var _components_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/consts */ "./node_modules/devextreme/esm/viz/components/consts.js");
/* harmony import */ var _symbol_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol_point */ "./node_modules/devextreme/esm/viz/series/points/symbol_point.js");
/* harmony import */ var _bar_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bar_point */ "./node_modules/devextreme/esm/viz/series/points/bar_point.js");
/* harmony import */ var _bubble_point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bubble_point */ "./node_modules/devextreme/esm/viz/series/points/bubble_point.js");
/* harmony import */ var _pie_point__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pie_point */ "./node_modules/devextreme/esm/viz/series/points/pie_point.js");
/* harmony import */ var _range_symbol_point__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./range_symbol_point */ "./node_modules/devextreme/esm/viz/series/points/range_symbol_point.js");
/* harmony import */ var _range_bar_point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./range_bar_point */ "./node_modules/devextreme/esm/viz/series/points/range_bar_point.js");
/* harmony import */ var _candlestick_point__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./candlestick_point */ "./node_modules/devextreme/esm/viz/series/points/candlestick_point.js");
/* harmony import */ var _stock_point__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./stock_point */ "./node_modules/devextreme/esm/viz/series/points/stock_point.js");
/* harmony import */ var _polar_point__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./polar_point */ "./node_modules/devextreme/esm/viz/series/points/polar_point.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/viz/series/points/base_point.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var mixins = {};












var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_11__["extend"];


var statesConsts = _components_consts__WEBPACK_IMPORTED_MODULE_0__["default"].states;
var SYMBOL_POINT = "symbolPoint";
var POLAR_SYMBOL_POINT = "polarSymbolPoint";
var BAR_POINT = "barPoint";
var POLAR_BAR_POINT = "polarBarPoint";
var PIE_POINT = "piePoint";
var SELECTED_STATE = statesConsts.selectedMark;
var HOVER_STATE = statesConsts.hoverMark;
var NORMAL_STATE = statesConsts.normalMark;
var HOVER = statesConsts.hover;
var NORMAL = statesConsts.normal;
var SELECTION = statesConsts.selection;
var pointTypes = {
    chart: {
        scatter: SYMBOL_POINT,
        line: SYMBOL_POINT,
        spline: SYMBOL_POINT,
        stepline: SYMBOL_POINT,
        stackedline: SYMBOL_POINT,
        fullstackedline: SYMBOL_POINT,
        stackedspline: SYMBOL_POINT,
        fullstackedspline: SYMBOL_POINT,
        stackedsplinearea: SYMBOL_POINT,
        fullstackedsplinearea: SYMBOL_POINT,
        area: SYMBOL_POINT,
        splinearea: SYMBOL_POINT,
        steparea: SYMBOL_POINT,
        stackedarea: SYMBOL_POINT,
        fullstackedarea: SYMBOL_POINT,
        rangearea: "rangeSymbolPoint",
        bar: BAR_POINT,
        stackedbar: BAR_POINT,
        fullstackedbar: BAR_POINT,
        rangebar: "rangeBarPoint",
        bubble: "bubblePoint",
        stock: "stockPoint",
        candlestick: "candlestickPoint"
    },
    pie: {
        pie: PIE_POINT,
        doughnut: PIE_POINT,
        donut: PIE_POINT
    },
    polar: {
        scatter: POLAR_SYMBOL_POINT,
        line: POLAR_SYMBOL_POINT,
        area: POLAR_SYMBOL_POINT,
        bar: POLAR_BAR_POINT,
        stackedbar: POLAR_BAR_POINT
    }
};

function isNoneMode(mode) {
    return "none" === Object(_core_utils__WEBPACK_IMPORTED_MODULE_10__["normalizeEnum"])(mode)
}
function Point(series, dataItem, options) {
    this.fullState = NORMAL_STATE;
    this.series = series;
    this.update(dataItem, options);
    this._viewCounters = {
        hover: 0,
        selection: 0
    };
    this._emptySettings = {
        fill: null,
        stroke: null,
        dashStyle: null
    }
}
mixins.symbolPoint = _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"];
mixins.barPoint = _bar_point__WEBPACK_IMPORTED_MODULE_2__["default"];
mixins.bubblePoint = _bubble_point__WEBPACK_IMPORTED_MODULE_3__["default"];
mixins.piePoint = _pie_point__WEBPACK_IMPORTED_MODULE_4__["default"];
mixins.rangeSymbolPoint = _range_symbol_point__WEBPACK_IMPORTED_MODULE_5__["default"];
mixins.rangeBarPoint = _range_bar_point__WEBPACK_IMPORTED_MODULE_6__["default"];
mixins.candlestickPoint = _candlestick_point__WEBPACK_IMPORTED_MODULE_7__["default"];
mixins.stockPoint = _stock_point__WEBPACK_IMPORTED_MODULE_8__["default"];
mixins.polarSymbolPoint = _polar_point__WEBPACK_IMPORTED_MODULE_9__["polarSymbolPoint"];
mixins.polarBarPoint = _polar_point__WEBPACK_IMPORTED_MODULE_9__["polarBarPoint"];
Point.prototype = {
    constructor: Point,
    getColor: function() {
        if (!this.hasValue() && !this._styles.usePointCustomOptions) {
            this.series.customizePoint(this, this._dataItem)
        }
        return this._styles.normal.fill || this.series.getColor()
    },
    _getStyle: function() {
        return this._styles[this._currentStyle || "normal"]
    },
    update: function(dataItem, options) {
        this.updateOptions(options);
        this.updateData(dataItem)
    },
    updateData: function(dataItem) {
        var argumentWasChanged = this.argument !== dataItem.argument;
        this.argument = this.initialArgument = this.originalArgument = dataItem.argument;
        this.tag = dataItem.tag;
        this.index = dataItem.index;
        this._dataItem = dataItem;
        this.data = dataItem.data;
        this.lowError = dataItem.lowError;
        this.highError = dataItem.highError;
        this.aggregationInfo = dataItem.aggregationInfo;
        this._updateData(dataItem, argumentWasChanged);
        !this.hasValue() && this.setInvisibility();
        this._fillStyle();
        this._updateLabelData()
    },
    deleteMarker: function() {
        if (this.graphic) {
            this.graphic.dispose()
        }
        this.graphic = null
    },
    draw: function(renderer, groups, animationEnabled, firstDrawing) {
        if (this._needDeletingOnDraw || this.series.autoHidePointMarkers && !this.isSelected()) {
            this.deleteMarker();
            this._needDeletingOnDraw = false
        }
        if (this._needClearingOnDraw) {
            this.clearMarker();
            this._needClearingOnDraw = false
        }
        if (!this._hasGraphic()) {
            this.getMarkerVisibility() && !this.series.autoHidePointMarkers && this._drawMarker(renderer, groups.markers, animationEnabled, firstDrawing)
        } else {
            this._updateMarker(animationEnabled, this._getStyle(), groups.markers)
        }
        this._drawLabel();
        this._drawErrorBar(renderer, groups.errorBars, animationEnabled);
        return this
    },
    _getViewStyle: function() {
        var state = NORMAL_STATE;
        var fullState = this.fullState;
        var styles = [NORMAL, HOVER, SELECTION, SELECTION];
        if (this._viewCounters.hover) {
            state |= HOVER_STATE
        }
        if (this._viewCounters.selection) {
            state |= SELECTED_STATE
        }
        if (isNoneMode(this.getOptions().selectionMode)) {
            fullState &= ~SELECTED_STATE
        }
        if (isNoneMode(this.getOptions().hoverMode)) {
            fullState &= ~HOVER_STATE
        }
        state |= fullState;
        return styles[state]
    },
    applyView: function(legendCallback) {
        var style = this._getViewStyle();
        this._currentStyle = style;
        if (!this.graphic && this.getMarkerVisibility() && this.series.autoHidePointMarkers && (style === SELECTION || style === HOVER)) {
            this._drawMarker(this.series.getRenderer(), this.series.getMarkersGroup())
        }
        if (this.graphic) {
            if (this.series.autoHidePointMarkers && style !== SELECTION && style !== HOVER) {
                this.deleteMarker()
            } else {
                if ("normal" === style) {
                    this.clearMarker()
                } else {
                    this.graphic.toForeground()
                }
                this._updateMarker(true, this._styles[style], void 0, legendCallback)
            }
        }
    },
    setView: function(style) {
        this._viewCounters[style]++;
        this.applyView()
    },
    resetView: function(style) {
        var viewCounters = this._viewCounters;
        --viewCounters[style];
        if (viewCounters[style] < 0) {
            viewCounters[style] = 0
        }
        this.applyView()
    },
    releaseHoverState: function() {
        if (this.graphic && !this.isSelected()) {
            this.graphic.toBackground()
        }
    },
    select: function() {
        this.series.selectPoint(this)
    },
    clearSelection: function() {
        this.series.deselectPoint(this)
    },
    hover: function() {
        this.series.hoverPoint(this)
    },
    clearHover: function() {
        this.series.clearPointHover()
    },
    showTooltip: function() {
        this.series.showPointTooltip(this)
    },
    hideTooltip: function() {
        this.series.hidePointTooltip(this)
    },
    _checkLabelsChanging: function(oldType, newType) {
        var isNewRange = ~newType.indexOf("range");
        var isOldRange = ~oldType.indexOf("range");
        return isOldRange && !isNewRange || !isOldRange && isNewRange
    },
    updateOptions: function(newOptions) {
        if (!newOptions) {
            return
        }
        var oldOptions = this._options;
        var widgetType = newOptions.widgetType;
        var oldType = oldOptions && oldOptions.type;
        var newType = newOptions.type;
        var newPointTypeMixin = pointTypes[widgetType][newType];
        if (oldType !== newType) {
            this._needDeletingOnDraw = true;
            this._needClearingOnDraw = false;
            if (oldType) {
                this._checkLabelsChanging(oldType, newType) && this.deleteLabel();
                this._resetType(mixins[pointTypes[oldType]])
            }
            this._setType(mixins[newPointTypeMixin])
        } else {
            this._needDeletingOnDraw = this._checkSymbol(oldOptions, newOptions);
            this._needClearingOnDraw = this._checkCustomize(oldOptions, newOptions)
        }
        this._options = newOptions;
        this._fillStyle();
        this._updateLabelOptions(newPointTypeMixin)
    },
    translate: function() {
        if (this.hasValue()) {
            this._translate();
            this.translated = true
        }
    },
    _checkCustomize: function(oldOptions, newOptions) {
        return oldOptions.styles.usePointCustomOptions && !newOptions.styles.usePointCustomOptions
    },
    _getCustomLabelVisibility: function() {
        return this._styles.useLabelCustomOptions ? !!this._options.label.visible : null
    },
    getBoundingRect: function() {
        return this._getGraphicBBox()
    },
    _resetType: function(methods) {
        for (var methodName in methods) {
            delete this[methodName]
        }
    },
    _setType: function(methods) {
        for (var methodName in methods) {
            this[methodName] = methods[methodName]
        }
    },
    isInVisibleArea: function() {
        return this.inVisibleArea
    },
    isSelected: function() {
        return !!(this.fullState & SELECTED_STATE)
    },
    isHovered: function() {
        return !!(this.fullState & HOVER_STATE)
    },
    getOptions: function() {
        return this._options
    },
    animate: function(complete, settings, partitionDuration) {
        if (!this.graphic) {
            complete && complete();
            return
        }
        this.graphic.animate(settings, {
            partitionDuration: partitionDuration
        }, complete)
    },
    getCoords: function(min) {
        if (!min) {
            return {
                x: this.x,
                y: this.y
            }
        }
        if (!this._options.rotated) {
            return {
                x: this.x,
                y: this.minY + (this.y - this.minY ? 0 : 1)
            }
        }
        return {
            x: this.minX - (this.x - this.minX ? 0 : 1),
            y: this.y
        }
    },
    getDefaultCoords: function() {
        return !this._options.rotated ? {
            x: this.x,
            y: this.defaultY
        } : {
            x: this.defaultX,
            y: this.y
        }
    },
    setDefaultCoords() {
        var coords = this.getDefaultCoords();
        this.x = coords.x;
        this.y = coords.y
    },
    _getVisibleArea: function() {
        return this.series.getVisibleArea()
    },
    _getArgTranslator: function() {
        return this.series.getArgumentAxis().getTranslator()
    },
    _getValTranslator: function() {
        return this.series.getValueAxis().getTranslator()
    },
    _calculateVisibility: function(x, y, width, height) {
        var visibleArea = this._getVisibleArea();
        var rotated = this._options.rotated;
        if (visibleArea.minX > x + (width || 0) || visibleArea.maxX < x || visibleArea.minY > y + (height || 0) || visibleArea.maxY < y || rotated && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_12__["isDefined"])(width) && 0 !== width && (visibleArea.minX === x + width || visibleArea.maxX === x) || !rotated && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_12__["isDefined"])(height) && 0 !== height && (visibleArea.minY === y + height || visibleArea.maxY === y)) {
            this.inVisibleArea = false
        } else {
            this.inVisibleArea = true
        }
    },
    isArgumentCorrect() {
        return this.series._argumentChecker(this.argument)
    },
    isValueCorrect() {
        var valueChecker = this.series._valueChecker;
        return valueChecker(this.getMinValue()) && valueChecker(this.getMaxValue())
    },
    hasValue: function() {
        return null !== this.value && null !== this.minValue && this.isArgumentCorrect() && this.isValueCorrect()
    },
    hasCoords: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    correctPosition: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    correctRadius: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    correctLabelRadius: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    getCrosshairData: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    getPointRadius: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    _populatePointShape: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    _checkSymbol: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    getMarkerCoords: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    hide: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    show: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    hideMarker: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    setInvisibility: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    clearVisibility: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    isVisible: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    resetCorrection: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    correctValue: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    resetValue: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    setPercentValue: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    correctCoordinates: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    coordsIn: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    getTooltipParams: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    applyWordWrap: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    setLabelTrackerData: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    updateLabelCoord: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    drawLabel: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    correctLabelPosition: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    getMinValue: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    getMaxValue: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    _drawErrorBar: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    getMarkerVisibility: _core_utils_common__WEBPACK_IMPORTED_MODULE_13__["noop"],
    dispose: function() {
        this.deleteMarker();
        this.deleteLabel();
        this._errorBar && this._errorBar.dispose();
        this._options = this._styles = this.series = this._errorBar = null
    },
    getTooltipFormatObject: function(tooltip, stackPoints) {
        var tooltipFormatObject = this._getFormatObject(tooltip);
        var sharedTooltipValuesArray = [];
        var tooltipStackPointsFormatObject = [];
        if (stackPoints) {
            stackPoints.forEach(point => {
                if (!point.isVisible()) {
                    return
                }
                var formatObject = point._getFormatObject(tooltip);
                tooltipStackPointsFormatObject.push(formatObject);
                sharedTooltipValuesArray.push(formatObject.seriesName + ": " + formatObject.valueText)
            });
            _extend(tooltipFormatObject, {
                points: tooltipStackPointsFormatObject,
                valueText: sharedTooltipValuesArray.join("\n"),
                stackName: this.series.getStackName() || null
            })
        }
        var aggregationInfo = this.aggregationInfo;
        if (aggregationInfo) {
            var axis = this.series.getArgumentAxis();
            var rangeText = axis.formatRange(aggregationInfo.intervalStart, aggregationInfo.intervalEnd, aggregationInfo.aggregationInterval, tooltip.getOptions().argumentFormat);
            if (rangeText) {
                tooltipFormatObject.valueText += "\n".concat(rangeText)
            }
        }
        return tooltipFormatObject
    },
    setHole: function(holeValue, position) {
        var minValue = isFinite(this.minValue) ? this.minValue : 0;
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_12__["isDefined"])(holeValue)) {
            if ("left" === position) {
                this.leftHole = this.value - holeValue;
                this.minLeftHole = minValue - holeValue
            } else {
                this.rightHole = this.value - holeValue;
                this.minRightHole = minValue - holeValue
            }
        }
    },
    resetHoles: function() {
        this.leftHole = null;
        this.minLeftHole = null;
        this.rightHole = null;
        this.minRightHole = null
    },
    getLabel: function() {
        return this._label
    },
    getLabels: function() {
        return [this._label]
    },
    getCenterCoord() {
        return {
            x: this.x,
            y: this.y
        }
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/bubble_point.js":
/*!***********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/bubble_point.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _symbol_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol_point */ "./node_modules/devextreme/esm/viz/series/points/symbol_point.js");
/**
 * DevExtreme (esm/viz/series/points/bubble_point.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"];
var MIN_BUBBLE_HEIGHT = 20;
/* harmony default export */ __webpack_exports__["default"] = (_extend({}, _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"], {
    correctCoordinates: function(diameter) {
        this.bubbleSize = diameter / 2
    },
    _drawMarker: function(renderer, group, animationEnabled) {
        var attr = _extend({
            translateX: this.x,
            translateY: this.y
        }, this._getStyle());
        this.graphic = renderer.circle(0, 0, animationEnabled ? 0 : this.bubbleSize).smartAttr(attr).data({
            "chart-data-point": this
        }).append(group)
    },
    getTooltipParams: function(location) {
        var graphic = this.graphic;
        if (!graphic) {
            return
        }
        var height = graphic.getBBox().height;
        return {
            x: this.x,
            y: this.y,
            offset: height < MIN_BUBBLE_HEIGHT || "edge" === location ? height / 2 : 0
        }
    },
    _getLabelFormatObject: function() {
        var formatObject = _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"]._getLabelFormatObject.call(this);
        formatObject.size = this.initialSize;
        return formatObject
    },
    _updateData: function(data) {
        _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"]._updateData.call(this, data);
        this.size = this.initialSize = data.size
    },
    _getGraphicBBox: function() {
        return this._getSymbolBBox(this.x, this.y, this.bubbleSize)
    },
    _updateMarker: function(animationEnabled, style) {
        if (!animationEnabled) {
            style = _extend({
                r: this.bubbleSize,
                translateX: this.x,
                translateY: this.y
            }, style)
        }
        this.graphic.smartAttr(style)
    },
    _getFormatObject: function(tooltip) {
        var formatObject = _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"]._getFormatObject.call(this, tooltip);
        formatObject.sizeText = tooltip.formatValue(this.initialSize);
        return formatObject
    },
    _storeTrackerR: function() {
        return this.bubbleSize
    },
    _getLabelCoords: function(label) {
        var coords;
        if ("inside" === label.getLayoutOptions().position) {
            coords = this._getLabelCoordOfPosition(label, "inside")
        } else {
            coords = _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"]._getLabelCoords.call(this, label)
        }
        return coords
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/candlestick_point.js":
/*!****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/candlestick_point.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _symbol_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol_point */ "./node_modules/devextreme/esm/viz/series/points/symbol_point.js");
/* harmony import */ var _bar_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bar_point */ "./node_modules/devextreme/esm/viz/series/points/bar_point.js");
/**
 * DevExtreme (esm/viz/series/points/candlestick_point.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var _math = Math;
var _abs = _math.abs;
var _min = _math.min;
var _max = _math.max;
var _round = _math.round;
var DEFAULT_FINANCIAL_TRACKER_MARGIN = 2;
/* harmony default export */ __webpack_exports__["default"] = (Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({}, _bar_point__WEBPACK_IMPORTED_MODULE_2__["default"], {
    _getContinuousPoints: function(openCoord, closeCoord) {
        var x = this.x;
        var createPoint = this._options.rotated ? function(x, y) {
            return [y, x]
        } : function(x, y) {
            return [x, y]
        };
        var width = this.width;
        var highCoord = this.highY;
        var max = _abs(highCoord - openCoord) < _abs(highCoord - closeCoord) ? openCoord : closeCoord;
        var min = max === closeCoord ? openCoord : closeCoord;
        var points;
        if (min === max) {
            points = [].concat(createPoint(x, this.highY)).concat(createPoint(x, this.lowY)).concat(createPoint(x, this.closeY)).concat(createPoint(x - width / 2, this.closeY)).concat(createPoint(x + width / 2, this.closeY)).concat(createPoint(x, this.closeY))
        } else {
            points = [].concat(createPoint(x, this.highY)).concat(createPoint(x, max)).concat(createPoint(x + width / 2, max)).concat(createPoint(x + width / 2, min)).concat(createPoint(x, min)).concat(createPoint(x, this.lowY)).concat(createPoint(x, min)).concat(createPoint(x - width / 2, min)).concat(createPoint(x - width / 2, max)).concat(createPoint(x, max))
        }
        return points
    },
    _getCrockPoints: function(y) {
        var x = this.x;
        var createPoint = this._options.rotated ? function(x, y) {
            return [y, x]
        } : function(x, y) {
            return [x, y]
        };
        return [].concat(createPoint(x, this.highY)).concat(createPoint(x, this.lowY)).concat(createPoint(x, y)).concat(createPoint(x - this.width / 2, y)).concat(createPoint(x + this.width / 2, y)).concat(createPoint(x, y))
    },
    _getPoints: function() {
        var points;
        var closeCoord = this.closeY;
        var openCoord = this.openY;
        if (null !== closeCoord && null !== openCoord) {
            points = this._getContinuousPoints(openCoord, closeCoord)
        } else if (openCoord === closeCoord) {
            points = [this.x, this.highY, this.x, this.lowY]
        } else {
            points = this._getCrockPoints(null !== openCoord ? openCoord : closeCoord)
        }
        return points
    },
    getColor: function() {
        return this._isReduction ? this._options.reduction.color : this._styles.normal.stroke || this.series.getColor()
    },
    _drawMarkerInGroup: function(group, attributes, renderer) {
        this.graphic = renderer.path(this._getPoints(), "area").attr({
            "stroke-linecap": "square"
        }).attr(attributes).data({
            "chart-data-point": this
        }).sharp().append(group)
    },
    _fillStyle: function() {
        var styles = this._options.styles;
        if (this._isReduction && this._isPositive) {
            this._styles = styles.reductionPositive
        } else if (this._isReduction) {
            this._styles = styles.reduction
        } else if (this._isPositive) {
            this._styles = styles.positive
        } else {
            this._styles = styles
        }
    },
    _getMinTrackerWidth: function() {
        return 2 + 2 * this._styles.normal["stroke-width"]
    },
    correctCoordinates: function(correctOptions) {
        var minWidth = this._getMinTrackerWidth();
        var width = correctOptions.width;
        width = width < minWidth ? minWidth : width > 10 ? 10 : width;
        this.width = width + width % 2;
        this.xCorrection = correctOptions.offset
    },
    _getMarkerGroup: function(group) {
        var markerGroup;
        if (this._isReduction && this._isPositive) {
            markerGroup = group.reductionPositiveMarkersGroup
        } else if (this._isReduction) {
            markerGroup = group.reductionMarkersGroup
        } else if (this._isPositive) {
            markerGroup = group.defaultPositiveMarkersGroup
        } else {
            markerGroup = group.defaultMarkersGroup
        }
        return markerGroup
    },
    _drawMarker: function(renderer, group) {
        this._drawMarkerInGroup(this._getMarkerGroup(group), this._getStyle(), renderer)
    },
    _getSettingsForTracker: function() {
        var highY = this.highY;
        var lowY = this.lowY;
        var rotated = this._options.rotated;
        var x;
        var y;
        var width;
        var height;
        if (highY === lowY) {
            highY = rotated ? highY + DEFAULT_FINANCIAL_TRACKER_MARGIN : highY - DEFAULT_FINANCIAL_TRACKER_MARGIN;
            lowY = rotated ? lowY - DEFAULT_FINANCIAL_TRACKER_MARGIN : lowY + DEFAULT_FINANCIAL_TRACKER_MARGIN
        }
        if (rotated) {
            x = _min(lowY, highY);
            y = this.x - this.width / 2;
            width = _abs(lowY - highY);
            height = this.width
        } else {
            x = this.x - this.width / 2;
            y = _min(lowY, highY);
            width = this.width;
            height = _abs(lowY - highY)
        }
        return {
            x: x,
            y: y,
            width: width,
            height: height
        }
    },
    _getGraphicBBox: function(location) {
        var rotated = this._options.rotated;
        var x = this.x;
        var width = this.width;
        var lowY = this.lowY;
        var highY = this.highY;
        if (location) {
            var valVisibleArea = this.series.getValueAxis().getVisibleArea();
            highY = this._truncateCoord(highY, valVisibleArea);
            lowY = this._truncateCoord(lowY, valVisibleArea)
        }
        var bBox = {
            x: !rotated ? x - _round(width / 2) : lowY,
            y: !rotated ? highY : x - _round(width / 2),
            width: !rotated ? width : highY - lowY,
            height: !rotated ? lowY - highY : width
        };
        if (location) {
            var isTop = "top" === location;
            if (!this._options.rotated) {
                bBox.y = isTop ? bBox.y : bBox.y + bBox.height;
                bBox.height = 0
            } else {
                bBox.x = isTop ? bBox.x + bBox.width : bBox.x;
                bBox.width = 0
            }
        }
        return bBox
    },
    getTooltipParams: function(location) {
        if (this.graphic) {
            var minValue = _min(this.lowY, this.highY);
            var maxValue = _max(this.lowY, this.highY);
            var visibleArea = this._getVisibleArea();
            var rotated = this._options.rotated;
            var minVisible = rotated ? visibleArea.minX : visibleArea.minY;
            var maxVisible = rotated ? visibleArea.maxX : visibleArea.maxY;
            var min = _max(minVisible, minValue);
            var max = _min(maxVisible, maxValue);
            var centerCoord = this.getCenterCoord();
            if ("edge" === location) {
                centerCoord[rotated ? "x" : "y"] = rotated ? max : min
            }
            centerCoord.offset = 0;
            return centerCoord
        }
    },
    getCenterCoord() {
        if (this.graphic) {
            var x;
            var y;
            var minValue = _min(this.lowY, this.highY);
            var maxValue = _max(this.lowY, this.highY);
            var visibleArea = this._getVisibleArea();
            var rotated = this._options.rotated;
            var minVisible = rotated ? visibleArea.minX : visibleArea.minY;
            var maxVisible = rotated ? visibleArea.maxX : visibleArea.maxY;
            var min = _max(minVisible, minValue);
            var max = _min(maxVisible, maxValue);
            var center = min + (max - min) / 2;
            if (rotated) {
                y = this.x;
                x = center
            } else {
                x = this.x;
                y = center
            }
            return {
                x: x,
                y: y
            }
        }
    },
    hasValue: function() {
        return null !== this.highValue && null !== this.lowValue
    },
    hasCoords: function() {
        return null !== this.x && null !== this.lowY && null !== this.highY
    },
    _translate: function() {
        var rotated = this._options.rotated;
        var valTranslator = this._getValTranslator();
        var x = this._getArgTranslator().translate(this.argument);
        this.vx = this.vy = this.x = null === x ? x : x + (this.xCorrection || 0);
        this.openY = null !== this.openValue ? valTranslator.translate(this.openValue) : null;
        this.highY = valTranslator.translate(this.highValue);
        this.lowY = valTranslator.translate(this.lowValue);
        this.closeY = null !== this.closeValue ? valTranslator.translate(this.closeValue) : null;
        var centerValue = _min(this.lowY, this.highY) + _abs(this.lowY - this.highY) / 2;
        this._calculateVisibility(!rotated ? this.x : centerValue, !rotated ? centerValue : this.x)
    },
    getCrosshairData: function(x, y) {
        var rotated = this._options.rotated;
        var origY = rotated ? x : y;
        var yValue;
        var argument = this.argument;
        var coords;
        var coord = "low";
        if (_abs(this.lowY - origY) < _abs(this.closeY - origY)) {
            yValue = this.lowY
        } else {
            yValue = this.closeY;
            coord = "close"
        }
        if (_abs(yValue - origY) >= _abs(this.openY - origY)) {
            yValue = this.openY;
            coord = "open"
        }
        if (_abs(yValue - origY) >= _abs(this.highY - origY)) {
            yValue = this.highY;
            coord = "high"
        }
        if (rotated) {
            coords = {
                y: this.vy,
                x: yValue,
                xValue: this[coord + "Value"],
                yValue: argument
            }
        } else {
            coords = {
                x: this.vx,
                y: yValue,
                xValue: argument,
                yValue: this[coord + "Value"]
            }
        }
        coords.axis = this.series.axis;
        return coords
    },
    _updateData: function(data) {
        var label = this._label;
        var reductionColor = this._options.reduction.color;
        this.value = this.initialValue = data.reductionValue;
        this.originalValue = data.value;
        this.lowValue = this.originalLowValue = data.lowValue;
        this.highValue = this.originalHighValue = data.highValue;
        this.openValue = this.originalOpenValue = data.openValue;
        this.closeValue = this.originalCloseValue = data.closeValue;
        this._isPositive = data.openValue < data.closeValue;
        this._isReduction = data.isReduction;
        if (this._isReduction) {
            label.setColor(reductionColor)
        }
    },
    _updateMarker: function(animationEnabled, style, group) {
        var graphic = this.graphic;
        graphic.attr({
            points: this._getPoints()
        }).smartAttr(style).sharp();
        group && graphic.append(this._getMarkerGroup(group))
    },
    _getLabelFormatObject: function() {
        return {
            openValue: this.openValue,
            highValue: this.highValue,
            lowValue: this.lowValue,
            closeValue: this.closeValue,
            reductionValue: this.initialValue,
            argument: this.initialArgument,
            value: this.initialValue,
            seriesName: this.series.name,
            originalOpenValue: this.originalOpenValue,
            originalCloseValue: this.originalCloseValue,
            originalLowValue: this.originalLowValue,
            originalHighValue: this.originalHighValue,
            originalArgument: this.originalArgument,
            point: this
        }
    },
    _getFormatObject: function(tooltip) {
        var highValue = tooltip.formatValue(this.highValue);
        var openValue = tooltip.formatValue(this.openValue);
        var closeValue = tooltip.formatValue(this.closeValue);
        var lowValue = tooltip.formatValue(this.lowValue);
        var symbolMethods = _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"];
        var formatObject = symbolMethods._getFormatObject.call(this, tooltip);
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({}, formatObject, {
            valueText: "h: " + highValue + ("" !== openValue ? " o: " + openValue : "") + ("" !== closeValue ? " c: " + closeValue : "") + " l: " + lowValue,
            highValueText: highValue,
            openValueText: openValue,
            closeValueText: closeValue,
            lowValueText: lowValue
        })
    },
    getMaxValue: function() {
        return this.highValue
    },
    getMinValue: function() {
        return this.lowValue
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/label.js":
/*!****************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/label.js ***!
  \****************************************************************/
/*! exports provided: Label */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Label", function() { return Label; });
/* harmony import */ var _format_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../format_helper */ "./node_modules/devextreme/esm/format_helper.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/**
 * DevExtreme (esm/viz/series/points/label.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var _format = _format_helper__WEBPACK_IMPORTED_MODULE_0__["default"].format;
var _math = Math;
var _round = _math.round;
var _floor = _math.floor;
var _abs = _math.abs;
var CONNECTOR_LENGTH = 12;
var LABEL_BACKGROUND_PADDING_X = 8;
var LABEL_BACKGROUND_PADDING_Y = 4;

function getClosestCoord(point, coords) {
    var closestDistance = 1 / 0;
    var closestCoord;
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(coords, (function(_, coord) {
        var x = point[0] - coord[0];
        var y = point[1] - coord[1];
        var distance = x * x + y * y;
        if (distance < closestDistance) {
            closestDistance = distance;
            closestCoord = coord
        }
    }));
    return [_floor(closestCoord[0]), _floor(closestCoord[1])]
}

function getCrossCoord(rect, coord, indexOffset) {
    return (coord - rect[0 + indexOffset]) / (rect[2 + indexOffset] - rect[0 + indexOffset]) * (rect[3 - indexOffset] - rect[1 - indexOffset]) + rect[1 - indexOffset]
}
var barPointStrategy = {
    isLabelInside: function(labelPoint, figure) {
        var xc = labelPoint.x + labelPoint.width / 2;
        var yc = labelPoint.y + labelPoint.height / 2;
        return figure.x <= xc && xc <= figure.x + figure.width && figure.y <= yc && yc <= figure.y + figure.height
    },
    prepareLabelPoints: function(bBox, rotatedBBox, isHorizontal, angle, figureCenter) {
        var x1 = rotatedBBox.x;
        var xc = x1 + rotatedBBox.width / 2;
        var x2 = x1 + rotatedBBox.width - 1;
        var y1 = rotatedBBox.y;
        var yc = y1 + rotatedBBox.height / 2;
        var y2 = y1 + rotatedBBox.height - 1;
        var labelPoints;
        var isRectangular = _abs(angle) % 90 === 0;
        if (figureCenter[0] > x1 && figureCenter[0] < x2) {
            if (isRectangular) {
                labelPoints = [
                    [figureCenter[0], _abs(figureCenter[1] - y1) < _abs(figureCenter[1] - y2) ? y1 : y2]
                ]
            } else {
                labelPoints = [
                    [figureCenter[0], getCrossCoord([x1, y1, x2, y2], figureCenter[0], 0)]
                ]
            }
        } else if (figureCenter[1] > y1 && figureCenter[1] < y2) {
            if (isRectangular) {
                labelPoints = [
                    [_abs(figureCenter[0] - x1) < _abs(figureCenter[0] - x2) ? x1 : x2, figureCenter[1]]
                ]
            } else {
                labelPoints = [
                    [getCrossCoord([x1, y1, x2, y2], figureCenter[1], 1), figureCenter[1]]
                ]
            }
        } else if (isRectangular) {
            labelPoints = [
                [x1, y1],
                [isHorizontal ? x1 : xc, isHorizontal ? yc : y1],
                [x2, y1],
                [x1, y2],
                [isHorizontal ? x2 : xc, isHorizontal ? yc : y2],
                [x2, y2]
            ]
        } else {
            labelPoints = [
                [xc, yc]
            ]
        }
        return labelPoints
    },
    isHorizontal: function(bBox, figure) {
        return bBox.x > figure.x + figure.width || bBox.x + bBox.width < figure.x
    },
    getFigureCenter: function(figure) {
        return [_floor(figure.x + figure.width / 2), _floor(figure.y + figure.height / 2)]
    },
    findFigurePoint: function(figure, labelPoint) {
        var figureCenter = barPointStrategy.getFigureCenter(figure);
        var point = getClosestCoord(labelPoint, [
            [figure.x, figureCenter[1]],
            [figureCenter[0], figure.y + figure.height],
            [figure.x + figure.width, figureCenter[1]],
            [figureCenter[0], figure.y]
        ]);
        return point
    },
    adjustPoints: function(points) {
        var lineIsVertical = _abs(points[1] - points[3]) <= 1;
        var lineIsHorizontal = _abs(points[0] - points[2]) <= 1;
        if (lineIsHorizontal) {
            points[0] = points[2]
        }
        if (lineIsVertical) {
            points[1] = points[3]
        }
        return points
    }
};
var symbolPointStrategy = {
    isLabelInside: function() {
        return false
    },
    prepareLabelPoints: barPointStrategy.prepareLabelPoints,
    isHorizontal: function(bBox, figure) {
        return bBox.x > figure.x + figure.r || bBox.x + bBox.width < figure.x - figure.r
    },
    getFigureCenter: function(figure) {
        return [figure.x, figure.y]
    },
    findFigurePoint: function(figure, labelPoint) {
        var angle = Math.atan2(figure.y - labelPoint[1], labelPoint[0] - figure.x);
        return [_round(figure.x + figure.r * Math.cos(angle)), _round(figure.y - figure.r * Math.sin(angle))]
    },
    adjustPoints: barPointStrategy.adjustPoints
};
var piePointStrategy = {
    isLabelInside: function(_0, _1, isOutside) {
        return !isOutside
    },
    prepareLabelPoints: function(bBox, rotatedBBox, isHorizontal, angle) {
        var xl = bBox.x;
        var xr = xl + bBox.width;
        var xc = xl + _round(bBox.width / 2);
        var yt = bBox.y;
        var yb = yt + bBox.height;
        var yc = yt + _round(bBox.height / 2);
        var points = [
            [
                [xl, yt],
                [xr, yt]
            ],
            [
                [xr, yt],
                [xr, yb]
            ],
            [
                [xr, yb],
                [xl, yb]
            ],
            [
                [xl, yb],
                [xl, yt]
            ]
        ];
        var cosSin = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["getCosAndSin"])(angle);
        if (0 === angle) {
            points = isHorizontal ? [
                [xl, yc],
                [xr, yc]
            ] : [
                [xc, yt],
                [xc, yb]
            ]
        } else {
            points = points.map((function(pair) {
                return pair.map((function(point) {
                    return [_round((point[0] - xc) * cosSin.cos + (point[1] - yc) * cosSin.sin + xc), _round(-(point[0] - xc) * cosSin.sin + (point[1] - yc) * cosSin.cos + yc)]
                }))
            })).reduce((function(r, pair) {
                var point1x = pair[0][0];
                var point1y = pair[0][1];
                var point2x = pair[1][0];
                var point2y = pair[1][1];
                if (isHorizontal) {
                    if (point1y >= yc && yc >= point2y || point1y <= yc && yc <= point2y) {
                        r.push([(yc - point1y) * (point2x - point1x) / (point2y - point1y) + point1x, yc])
                    }
                } else if (point1x >= xc && xc >= point2x || point1x <= xc && xc <= point2x) {
                    r.push([xc, (xc - point1x) * (point2y - point1y) / (point2x - point1x) + point1y])
                }
                return r
            }), [])
        }
        return points
    },
    isHorizontal: function(bBox, figure) {
        return bBox.x > figure.x || figure.x > bBox.x + bBox.width
    },
    getFigureCenter: symbolPointStrategy.getFigureCenter,
    findFigurePoint: function(figure, labelPoint, isHorizontal) {
        if (!isHorizontal) {
            return [figure.x, figure.y]
        }
        var labelX = labelPoint[0];
        var x = _round(figure.x + (figure.y - labelPoint[1]) / Math.tan(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["degreesToRadians"])(figure.angle)));
        var points = [figure.x, figure.y, x, labelPoint[1]];
        if (!(figure.x <= x && x <= labelX) && !(labelX <= x && x <= figure.x)) {
            if (_abs(figure.x - labelX) < CONNECTOR_LENGTH) {
                points = [figure.x, figure.y]
            } else if (figure.x <= labelX) {
                points[2] = figure.x + CONNECTOR_LENGTH
            } else {
                points[2] = figure.x - CONNECTOR_LENGTH
            }
        }
        return points
    },
    adjustPoints: function(points) {
        return points
    }
};

function selectStrategy(figure) {
    return void 0 !== figure.angle && piePointStrategy || void 0 !== figure.r && symbolPointStrategy || barPointStrategy
}

function disposeItem(obj, field) {
    obj[field] && obj[field].dispose();
    obj[field] = null
}

function checkBackground(background) {
    return background && (background.fill && "none" !== background.fill || background["stroke-width"] > 0 && background.stroke && "none" !== background.stroke)
}

function checkConnector(connector) {
    return connector && connector["stroke-width"] > 0 && connector.stroke && "none" !== connector.stroke
}

function formatText(data, options) {
    var format = options.format;
    data.valueText = _format(data.value, format);
    data.argumentText = _format(data.argument, options.argumentFormat);
    if (void 0 !== data.percent) {
        data.percentText = _format(data.percent, {
            type: "percent",
            precision: format && format.percentPrecision
        })
    }
    if (void 0 !== data.total) {
        data.totalText = _format(data.total, format)
    }
    if (void 0 !== data.openValue) {
        data.openValueText = _format(data.openValue, format)
    }
    if (void 0 !== data.closeValue) {
        data.closeValueText = _format(data.closeValue, format)
    }
    if (void 0 !== data.lowValue) {
        data.lowValueText = _format(data.lowValue, format)
    }
    if (void 0 !== data.highValue) {
        data.highValueText = _format(data.highValue, format)
    }
    if (void 0 !== data.reductionValue) {
        data.reductionValueText = _format(data.reductionValue, format)
    }
    return options.customizeText ? options.customizeText.call(data, data) : data.valueText
}
function Label(renderSettings) {
    this._renderer = renderSettings.renderer;
    this._container = renderSettings.labelsGroup;
    this._point = renderSettings.point;
    this._strategy = renderSettings.strategy;
    this._rowCount = 1
}
Label.prototype = {
    constructor: Label,
    setColor: function(color) {
        this._color = color
    },
    setOptions: function(options) {
        this._options = options
    },
    setData: function(data) {
        this._data = data
    },
    setDataField: function(fieldName, fieldValue) {
        this._data = this._data || {};
        this._data[fieldName] = fieldValue
    },
    getData: function() {
        return this._data
    },
    setFigureToDrawConnector: function(figure) {
        this._figure = figure
    },
    dispose: function() {
        disposeItem(this, "_group");
        this._data = this._options = this._textContent = this._visible = this._insideGroup = this._text = this._background = this._connector = this._figure = null
    },
    _setVisibility: function(value, state) {
        this._group && this._group.attr({
            visibility: value
        });
        this._visible = state
    },
    isVisible: function() {
        return this._visible
    },
    hide: function(holdInvisible) {
        this._holdVisibility = !!holdInvisible;
        this._hide()
    },
    _hide: function() {
        this._setVisibility("hidden", false)
    },
    show: function(holdVisible) {
        var correctPosition = !this._drawn;
        if (this._point.hasValue()) {
            this._holdVisibility = !!holdVisible;
            this._show();
            correctPosition && this._point.correctLabelPosition(this)
        }
    },
    _show: function() {
        var renderer = this._renderer;
        var container = this._container;
        var options = this._options || {};
        var text = this._textContent = formatText(this._data, this._options) || null;
        if (text) {
            if (!this._group) {
                this._group = renderer.g().append(container);
                this._insideGroup = renderer.g().append(this._group);
                this._text = renderer.text("", 0, 0).append(this._insideGroup)
            }
            this._text.css(options.attributes ? Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["patchFontOptions"])(options.attributes.font) : {});
            if (checkBackground(options.background)) {
                this._background = this._background || renderer.rect().append(this._insideGroup).toBackground();
                this._background.attr(options.background);
                this._color && this._background.attr({
                    fill: this._color
                })
            } else {
                disposeItem(this, "_background")
            }
            if (checkConnector(options.connector)) {
                this._connector = this._connector || renderer.path([], "line").sharp().append(this._group).toBackground();
                this._connector.attr(options.connector);
                this._color && this._connector.attr({
                    stroke: this._color
                })
            } else {
                disposeItem(this, "_connector")
            }
            this._text.attr({
                text: text,
                align: options.textAlignment,
                class: options.cssClass
            });
            this._updateBackground(this._text.getBBox());
            this._setVisibility("visible", true);
            this._drawn = true
        } else {
            this._hide()
        }
    },
    _getLabelVisibility: function(isVisible) {
        return this._holdVisibility ? this.isVisible() : isVisible
    },
    draw: function(isVisible) {
        if (this._getLabelVisibility(isVisible)) {
            this._show();
            this._point && this._point.correctLabelPosition(this)
        } else {
            this._drawn = false;
            this._hide()
        }
        return this
    },
    _updateBackground: function(bBox) {
        if (this._background) {
            bBox.x -= LABEL_BACKGROUND_PADDING_X;
            bBox.y -= LABEL_BACKGROUND_PADDING_Y;
            bBox.width += 2 * LABEL_BACKGROUND_PADDING_X;
            bBox.height += 2 * LABEL_BACKGROUND_PADDING_Y;
            this._background.attr(bBox)
        }
        this._bBoxWithoutRotation = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_3__["extend"])({}, bBox);
        var rotationAngle = this._options.rotationAngle || 0;
        this._insideGroup.rotate(rotationAngle, bBox.x + bBox.width / 2, bBox.y + bBox.height / 2);
        bBox = Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["rotateBBox"])(bBox, [bBox.x + bBox.width / 2, bBox.y + bBox.height / 2], -rotationAngle);
        this._bBox = bBox
    },
    getFigureCenter() {
        var figure = this._figure;
        var strategy = this._strategy || selectStrategy(figure);
        return strategy.getFigureCenter(figure)
    },
    _getConnectorPoints: function() {
        var figure = this._figure;
        var options = this._options;
        var strategy = this._strategy || selectStrategy(figure);
        var bBox = this._shiftBBox(this._bBoxWithoutRotation);
        var rotatedBBox = this.getBoundingRect();
        var labelPoint;
        var points = [];
        var isHorizontal;
        if (!strategy.isLabelInside(bBox, figure, "inside" !== options.position)) {
            isHorizontal = strategy.isHorizontal(bBox, figure);
            var figureCenter = this.getFigureCenter();
            points = strategy.prepareLabelPoints(bBox, rotatedBBox, isHorizontal, -options.rotationAngle || 0, figureCenter);
            labelPoint = getClosestCoord(figureCenter, points);
            points = strategy.findFigurePoint(figure, labelPoint, isHorizontal);
            points = points.concat(labelPoint)
        }
        return strategy.adjustPoints(points)
    },
    fit: function(maxWidth) {
        var padding = this._background ? 2 * LABEL_BACKGROUND_PADDING_X : 0;
        var rowCountChanged = false;
        if (this._text) {
            var result = this._text.setMaxSize(maxWidth - padding, void 0, this._options);
            var rowCount = result.rowCount;
            if (0 === rowCount) {
                rowCount = 1
            }
            if (rowCount !== this._rowCount) {
                rowCountChanged = true;
                this._rowCount = rowCount
            }
            result.textIsEmpty && disposeItem(this, "_background")
        }
        this._updateBackground(this._text.getBBox());
        return rowCountChanged
    },
    resetEllipsis: function() {
        this._text && this._text.restoreText();
        this._updateBackground(this._text.getBBox())
    },
    setTrackerData: function(point) {
        this._text.data({
            "chart-data-point": point
        });
        this._background && this._background.data({
            "chart-data-point": point
        })
    },
    hideInsideLabel: function(coords) {
        return this._point.hideInsideLabel(this, coords)
    },
    getPoint() {
        return this._point
    },
    shift: function(x, y) {
        if (this._textContent) {
            this._insideGroup.attr({
                translateX: this._x = _round(x - this._bBox.x),
                translateY: this._y = _round(y - this._bBox.y)
            });
            if (this._connector) {
                this._connector.attr({
                    points: this._getConnectorPoints()
                })
            }
        }
        return this
    },
    getBoundingRect: function() {
        return this._shiftBBox(this._bBox)
    },
    _shiftBBox: function(bBox) {
        return this._textContent ? {
            x: bBox.x + this._x,
            y: bBox.y + this._y,
            width: bBox.width,
            height: bBox.height
        } : {}
    },
    getLayoutOptions: function() {
        var options = this._options;
        return {
            alignment: options.alignment,
            background: checkBackground(options.background),
            horizontalOffset: options.horizontalOffset,
            verticalOffset: options.verticalOffset,
            radialOffset: options.radialOffset,
            position: options.position,
            connectorOffset: (checkConnector(options.connector) ? CONNECTOR_LENGTH : 0) + (checkBackground(options.background) ? LABEL_BACKGROUND_PADDING_X : 0)
        }
    }
};


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/pie_point.js":
/*!********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/pie_point.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _symbol_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol_point */ "./node_modules/devextreme/esm/viz/series/points/symbol_point.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _components_consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/consts */ "./node_modules/devextreme/esm/viz/components/consts.js");
/**
 * DevExtreme (esm/viz/series/points/pie_point.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"];
var _round = Math.round;
var _sqrt = Math.sqrt;
var _acos = Math.acos;
var DEG = 180 / Math.PI;
var _abs = Math.abs;



var RADIAL_LABEL_INDENT = _components_consts__WEBPACK_IMPORTED_MODULE_4__["default"].radialLabelIndent;
/* harmony default export */ __webpack_exports__["default"] = (_extend({}, _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"], {
    _updateData: function(data, argumentChanged) {
        _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"]._updateData.call(this, data);
        if (argumentChanged || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(this._visible)) {
            this._visible = true
        }
        this.minValue = this.initialMinValue = this.originalMinValue = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_3__["isDefined"])(data.minValue) ? data.minValue : 0
    },
    animate: function(complete, duration, delay) {
        this.graphic.animate({
            x: this.centerX,
            y: this.centerY,
            outerRadius: this.radiusOuter,
            innerRadius: this.radiusInner,
            startAngle: this.toAngle,
            endAngle: this.fromAngle
        }, {
            delay: delay,
            partitionDuration: duration
        }, complete)
    },
    correctPosition: function(correction) {
        this.correctRadius(correction);
        this.correctLabelRadius(correction.radiusOuter + RADIAL_LABEL_INDENT);
        this.centerX = correction.centerX;
        this.centerY = correction.centerY
    },
    correctRadius: function(correction) {
        this.radiusInner = correction.radiusInner;
        this.radiusOuter = correction.radiusOuter
    },
    correctLabelRadius: function(radiusLabels) {
        this.radiusLabels = radiusLabels
    },
    correctValue: function(correction, percent, base) {
        this.value = (base || this.normalInitialValue) + correction;
        this.minValue = correction;
        this.percent = percent;
        this._label.setDataField("percent", percent)
    },
    _updateLabelData: function() {
        this._label.setData(this._getLabelFormatObject())
    },
    _getShiftLabelCoords: function() {
        var bBox = this._label.getBoundingRect();
        var coord = this._getLabelCoords(this._label);
        var visibleArea = this._getVisibleArea();
        if (this._isLabelDrawingWithoutPoints) {
            return this._checkLabelPosition(coord, bBox, visibleArea)
        } else {
            return this._getLabelExtraCoord(coord, this._checkVerticalLabelPosition(coord, bBox, visibleArea), bBox)
        }
    },
    _getLabelPosition: function(options) {
        return options.position
    },
    getAnnotationCoords: function(location) {
        return this._getElementCoords("edge" !== location ? "inside" : "outside", this.radiusOuter, 0)
    },
    _getElementCoords: function(position, elementRadius, radialOffset) {
        var bBox = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        var that = this;
        var angleFunctions = Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["getCosAndSin"])(that.middleAngle);
        var radiusInner = that.radiusInner;
        var radiusOuter = that.radiusOuter;
        var columnsPosition = "columns" === position;
        var rad;
        var x;
        if ("inside" === position) {
            rad = radiusInner + (radiusOuter - radiusInner) / 2 + radialOffset;
            x = that.centerX + rad * angleFunctions.cos - bBox.width / 2
        } else {
            rad = elementRadius + radialOffset;
            if (angleFunctions.cos > .1 || columnsPosition && angleFunctions.cos >= 0) {
                x = that.centerX + rad * angleFunctions.cos
            } else if (angleFunctions.cos < -.1 || columnsPosition && angleFunctions.cos < 0) {
                x = that.centerX + rad * angleFunctions.cos - bBox.width
            } else {
                x = that.centerX + rad * angleFunctions.cos - bBox.width / 2
            }
        }
        return {
            x: x,
            y: _round(that.centerY - rad * angleFunctions.sin - bBox.height / 2)
        }
    },
    _getLabelCoords: function(label) {
        var bBox = label.getBoundingRect();
        var options = label.getLayoutOptions();
        var position = this._getLabelPosition(options);
        return this._getElementCoords(position, this.radiusLabels, options.radialOffset, bBox)
    },
    _correctLabelCoord: function(coord, moveLabelsFromCenter) {
        var label = this._label;
        var bBox = label.getBoundingRect();
        var labelWidth = bBox.width;
        var options = label.getLayoutOptions();
        var visibleArea = this._getVisibleArea();
        var rightBorderX = visibleArea.maxX - labelWidth;
        var leftBorderX = visibleArea.minX;
        var angleOfPoint = Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeAngle"])(this.middleAngle);
        var centerX = this.centerX;
        var connectorOffset = options.connectorOffset;
        var x = coord.x;
        if ("columns" === options.position) {
            if (angleOfPoint <= 90 || angleOfPoint >= 270) {
                x = rightBorderX
            } else {
                x = leftBorderX
            }
            coord.x = x
        } else if ("inside" !== options.position && moveLabelsFromCenter) {
            if (angleOfPoint <= 90 || angleOfPoint >= 270) {
                if (x - connectorOffset < centerX) {
                    x = centerX + connectorOffset
                }
            } else if (x + labelWidth + connectorOffset > centerX) {
                x = centerX - labelWidth - connectorOffset
            }
            coord.x = x
        }
        return coord
    },
    drawLabel: function() {
        this.translate();
        this._isLabelDrawingWithoutPoints = true;
        this._drawLabel();
        this._isLabelDrawingWithoutPoints = false
    },
    updateLabelCoord: function(moveLabelsFromCenter) {
        var bBox = this._label.getBoundingRect();
        var coord = this._correctLabelCoord(bBox, moveLabelsFromCenter);
        coord = this._checkHorizontalLabelPosition(coord, bBox, this._getVisibleArea());
        this._label.shift(_round(coord.x), _round(bBox.y))
    },
    _checkVerticalLabelPosition: function(coord, box, visibleArea) {
        var x = coord.x;
        var y = coord.y;
        if (coord.y + box.height > visibleArea.maxY) {
            y = visibleArea.maxY - box.height
        } else if (coord.y < visibleArea.minY) {
            y = visibleArea.minY
        }
        return {
            x: x,
            y: y
        }
    },
    _getLabelExtraCoord: function(coord, shiftCoord, box) {
        return coord.y !== shiftCoord.y ? Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["getVerticallyShiftedAngularCoords"])({
            x: coord.x,
            y: coord.y,
            width: box.width,
            height: box.height
        }, shiftCoord.y - coord.y, {
            x: this.centerX,
            y: this.centerY
        }) : coord
    },
    _checkHorizontalLabelPosition: function(coord, box, visibleArea) {
        var x = coord.x;
        var y = coord.y;
        if (coord.x + box.width > visibleArea.maxX) {
            x = visibleArea.maxX - box.width
        } else if (coord.x < visibleArea.minX) {
            x = visibleArea.minX
        }
        return {
            x: x,
            y: y
        }
    },
    applyWordWrap: function(moveLabelsFromCenter) {
        var label = this._label;
        var box = label.getBoundingRect();
        var visibleArea = this._getVisibleArea();
        var position = label.getLayoutOptions().position;
        var width = box.width;
        var rowCountChanged = false;
        if ("columns" === position && this.series.index > 0) {
            width = visibleArea.maxX - this.centerX - this.radiusLabels
        } else if ("inside" === position) {
            if (width > visibleArea.maxX - visibleArea.minX) {
                width = visibleArea.maxX - visibleArea.minX
            }
        } else if (moveLabelsFromCenter && box.x < this.centerX && box.width + box.x > this.centerX) {
            width = Math.floor((visibleArea.maxX - visibleArea.minX) / 2)
        } else if (box.x + width > visibleArea.maxX) {
            width = visibleArea.maxX - box.x
        } else if (box.x < visibleArea.minX) {
            width = box.x + width - visibleArea.minX
        }
        if (width < box.width) {
            rowCountChanged = label.fit(width)
        }
        return rowCountChanged
    },
    setLabelTrackerData: function() {
        this._label.setTrackerData(this)
    },
    _checkLabelPosition: function(coord, bBox, visibleArea) {
        coord = this._checkHorizontalLabelPosition(coord, bBox, visibleArea);
        return this._checkVerticalLabelPosition(coord, bBox, visibleArea)
    },
    _getLabelConnector: function() {
        var rad = this.radiusOuter;
        var seriesStyle = this._options.styles.normal;
        var strokeWidthBy2 = seriesStyle["stroke-width"] / 2;
        var borderWidth = this.series.getOptions().containerBackgroundColor === seriesStyle.stroke ? _round(strokeWidthBy2) : _round(-strokeWidthBy2);
        var angleFunctions = Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["getCosAndSin"])(_round(this.middleAngle));
        return {
            x: _round(this.centerX + (rad - borderWidth) * angleFunctions.cos),
            y: _round(this.centerY - (rad - borderWidth) * angleFunctions.sin),
            angle: this.middleAngle
        }
    },
    _drawMarker: function(renderer, group, animationEnabled, firstDrawing) {
        var radiusOuter = this.radiusOuter;
        var radiusInner = this.radiusInner;
        var fromAngle = this.fromAngle;
        var toAngle = this.toAngle;
        if (animationEnabled) {
            radiusInner = radiusOuter = 0;
            if (!firstDrawing) {
                fromAngle = toAngle = this.shiftedAngle
            }
        }
        this.graphic = renderer.arc(this.centerX, this.centerY, radiusInner, radiusOuter, toAngle, fromAngle).attr({
            "stroke-linejoin": "round"
        }).smartAttr(this._getStyle()).data({
            "chart-data-point": this
        }).sharp().append(group)
    },
    getTooltipParams: function() {
        var angleFunctions = Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["getCosAndSin"])(this.middleAngle);
        var radiusInner = this.radiusInner;
        var radiusOuter = this.radiusOuter;
        return {
            x: this.centerX + (radiusInner + (radiusOuter - radiusInner) / 2) * angleFunctions.cos,
            y: this.centerY - (radiusInner + (radiusOuter - radiusInner) / 2) * angleFunctions.sin,
            offset: 0
        }
    },
    _translate: function() {
        var angle = this.shiftedAngle || 0;
        var value = this.value;
        var minValue = this.minValue;
        var translator = this._getValTranslator();
        this.fromAngle = translator.translate(minValue) + angle;
        this.toAngle = translator.translate(value) + angle;
        this.middleAngle = translator.translate((value - minValue) / 2 + minValue) + angle;
        if (!this.isVisible()) {
            this.middleAngle = this.toAngle = this.fromAngle = this.fromAngle || angle
        }
    },
    getMarkerVisibility: function() {
        return true
    },
    _updateMarker: function(animationEnabled, style, _, callback) {
        if (!animationEnabled) {
            style = _extend({
                x: this.centerX,
                y: this.centerY,
                outerRadius: this.radiusOuter,
                innerRadius: this.radiusInner,
                startAngle: this.toAngle,
                endAngle: this.fromAngle
            }, style)
        }
        this.graphic.smartAttr(style).sharp();
        callback && callback()
    },
    getLegendStyles: function() {
        return this._styles.legendStyles
    },
    isInVisibleArea: function() {
        return true
    },
    hide: function() {
        if (this._visible) {
            this._visible = false;
            this.hideTooltip();
            this._options.visibilityChanged()
        }
    },
    show: function() {
        if (!this._visible) {
            this._visible = true;
            this._options.visibilityChanged()
        }
    },
    setInvisibility: function() {
        this._label.draw(false)
    },
    isVisible: function() {
        return this._visible
    },
    _getFormatObject: function(tooltip) {
        var formatObject = _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"]._getFormatObject.call(this, tooltip);
        var percent = this.percent;
        formatObject.percent = percent;
        formatObject.percentText = tooltip.formatValue(percent, "percent");
        return formatObject
    },
    getColor: function() {
        return this._styles.normal.fill
    },
    coordsIn: function(x, y) {
        var lx = x - this.centerX;
        var ly = y - this.centerY;
        var r = _sqrt(lx * lx + ly * ly);
        var fromAngle = this.fromAngle % 360;
        var toAngle = this.toAngle % 360;
        var angle;
        if (r < this.radiusInner || r > this.radiusOuter || 0 === r) {
            return false
        }
        angle = _acos(lx / r) * DEG * (ly > 0 ? -1 : 1);
        if (angle < 0) {
            angle += 360
        }
        if (fromAngle === toAngle && _abs(this.toAngle - this.fromAngle) > 1e-4) {
            return true
        } else {
            return fromAngle >= toAngle ? angle <= fromAngle && angle >= toAngle : !(angle >= fromAngle && angle <= toAngle)
        }
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/polar_point.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/polar_point.js ***!
  \**********************************************************************/
/*! exports provided: polarSymbolPoint, polarBarPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polarSymbolPoint", function() { return polarSymbolPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polarBarPoint", function() { return polarBarPoint; });
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _symbol_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol_point */ "./node_modules/devextreme/esm/viz/series/points/symbol_point.js");
/* harmony import */ var _bar_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bar_point */ "./node_modules/devextreme/esm/viz/series/points/bar_point.js");
/* harmony import */ var _pie_point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pie_point */ "./node_modules/devextreme/esm/viz/series/points/pie_point.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _components_consts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/consts */ "./node_modules/devextreme/esm/viz/components/consts.js");
/**
 * DevExtreme (esm/viz/series/points/polar_point.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"];





var _math = Math;
var _max = _math.max;

var RADIAL_LABEL_INDENT = _components_consts__WEBPACK_IMPORTED_MODULE_6__["default"].radialLabelIndent;
var ERROR_BARS_ANGLE_OFFSET = 90;
var CANVAS_POSITION_START = "canvas_position_start";
var CANVAS_POSITION_END = "canvas_position_end";
var CANVAS_POSITION_DEFAULT = "canvas_position_default";
var polarSymbolPoint = _extend({}, _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"], {
    _getLabelCoords: _pie_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getLabelCoords,
    _getElementCoords: _pie_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getElementCoords,
    _moveLabelOnCanvas: function(coord, visibleArea, labelBBox) {
        var x = coord.x;
        var y = coord.y;
        if (visibleArea.minX > x) {
            x = visibleArea.minX
        }
        if (visibleArea.maxX < x + labelBBox.width) {
            x = visibleArea.maxX - labelBBox.width
        }
        if (visibleArea.minY > y) {
            y = visibleArea.minY
        }
        if (visibleArea.maxY < y + labelBBox.height) {
            y = visibleArea.maxY - labelBBox.height
        }
        return {
            x: x,
            y: y
        }
    },
    _getLabelPosition: function() {
        return "outside"
    },
    _getCoords: function(argument, value) {
        var axis = this.series.getValueAxis();
        var startAngle = axis.getAngles()[0];
        var angle = this._getArgTranslator().translate(argument);
        var radius = this._getValTranslator().translate(value);
        var coords = Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["convertPolarToXY"])(axis.getCenter(), axis.getAngles()[0], angle, radius);
        coords.angle = angle + startAngle - 90, coords.radius = radius;
        return coords
    },
    _translate() {
        var center = this.series.getValueAxis().getCenter();
        var coord = this._getCoords(this.argument, this.value);
        var translator = this._getValTranslator();
        var maxRadius = translator.isInverted() ? translator.translate(CANVAS_POSITION_START) : translator.translate(CANVAS_POSITION_END);
        var normalizedRadius = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(coord.radius) && coord.radius >= 0 ? coord.radius : null;
        this.vx = Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["normalizeAngle"])(coord.angle);
        this.vy = this.radiusOuter = this.radiusLabels = normalizedRadius;
        this.radiusLabels += RADIAL_LABEL_INDENT;
        this.radius = normalizedRadius;
        this.middleAngle = -coord.angle;
        this.angle = -coord.angle;
        this.x = coord.x;
        this.y = coord.y;
        this.defaultX = this.centerX = center.x;
        this.defaultY = this.centerY = center.y;
        this._translateErrorBars();
        this.inVisibleArea = this._checkRadiusForVisibleArea(normalizedRadius, maxRadius)
    },
    _checkRadiusForVisibleArea: (radius, maxRadius) => Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(radius) && radius <= maxRadius,
    _translateErrorBars: function() {
        var errorBars = this._options.errorBars;
        var translator = this._getValTranslator();
        if (!errorBars) {
            return
        }
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(this.lowError) && (this._lowErrorCoord = this.centerY - translator.translate(this.lowError));
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(this.highError) && (this._highErrorCoord = this.centerY - translator.translate(this.highError));
        this._errorBarPos = this.centerX;
        this._baseErrorBarPos = "stdDeviation" === errorBars.type ? this._lowErrorCoord + (this._highErrorCoord - this._lowErrorCoord) / 2 : this.centerY - this.radius
    },
    _getTranslates: function(animationEnabled) {
        return animationEnabled ? this.getDefaultCoords() : {
            x: this.x,
            y: this.y
        }
    },
    getDefaultCoords: function() {
        var cosSin = Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["getCosAndSin"])(-this.angle);
        var radius = this._getValTranslator().translate(CANVAS_POSITION_DEFAULT);
        var x = this.defaultX + radius * cosSin.cos;
        var y = this.defaultY + radius * cosSin.sin;
        return {
            x: x,
            y: y
        }
    },
    _addLabelAlignmentAndOffset: function(label, coord) {
        return coord
    },
    _checkLabelPosition: function(label, coord) {
        var visibleArea = this._getVisibleArea();
        var graphicBBox = this._getGraphicBBox();
        if (this._isPointInVisibleArea(visibleArea, graphicBBox)) {
            coord = this._moveLabelOnCanvas(coord, visibleArea, label.getBoundingRect())
        }
        return coord
    },
    _getErrorBarSettings: function(errorBarOptions, animationEnabled) {
        var settings = _symbol_point__WEBPACK_IMPORTED_MODULE_1__["default"]._getErrorBarSettings.call(this, errorBarOptions, animationEnabled);
        settings.rotate = ERROR_BARS_ANGLE_OFFSET - this.angle;
        settings.rotateX = this.centerX;
        settings.rotateY = this.centerY;
        return settings
    },
    getCoords: function(min) {
        return min ? this.getDefaultCoords() : {
            x: this.x,
            y: this.y
        }
    }
});
var polarBarPoint = _extend({}, _bar_point__WEBPACK_IMPORTED_MODULE_2__["default"], {
    _translateErrorBars: polarSymbolPoint._translateErrorBars,
    _getErrorBarSettings: polarSymbolPoint._getErrorBarSettings,
    _moveLabelOnCanvas: polarSymbolPoint._moveLabelOnCanvas,
    _getLabelCoords: _pie_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getLabelCoords,
    _getElementCoords: _pie_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getElementCoords,
    _getLabelConnector: _pie_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getLabelConnector,
    getTooltipParams: _pie_point__WEBPACK_IMPORTED_MODULE_3__["default"].getTooltipParams,
    _getLabelPosition: _pie_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getLabelPosition,
    _getCoords: polarSymbolPoint._getCoords,
    _translate() {
        var translator = this._getValTranslator();
        var businessRange = translator.getBusinessRange();
        var maxRadius = translator.isInverted() ? translator.translate(CANVAS_POSITION_START) : translator.translate(CANVAS_POSITION_END);
        this.radiusInner = translator.translate(this.minValue);
        polarSymbolPoint._translate.call(this);
        if (null === this.radiusInner) {
            this.radiusInner = this.radius = maxRadius
        } else if (null === this.radius) {
            this.radius = this.value >= businessRange.minVisible ? maxRadius : 0
        } else if (this.radius > maxRadius) {
            this.radius = maxRadius
        }
        this.radiusOuter = this.radiusLabels = _max(this.radiusInner, this.radius);
        this.radiusLabels += RADIAL_LABEL_INDENT;
        this.radiusInner = this.defaultRadius = _math.min(this.radiusInner, this.radius);
        this.middleAngle = this.angle = -Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["normalizeAngle"])(this.middleAngleCorrection - this.angle)
    },
    _checkRadiusForVisibleArea(radius) {
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(radius) || this._getValTranslator().translate(this.minValue) > 0
    },
    _getErrorBarBaseEdgeLength() {
        var coord = this.getMarkerCoords();
        return _math.PI * coord.outerRadius * _math.abs(coord.startAngle - coord.endAngle) / 180
    },
    getMarkerCoords: function() {
        return {
            x: this.centerX,
            y: this.centerY,
            outerRadius: this.radiusOuter,
            innerRadius: this.defaultRadius,
            startAngle: this.middleAngle - this.interval / 2,
            endAngle: this.middleAngle + this.interval / 2
        }
    },
    _drawMarker: function(renderer, group, animationEnabled) {
        var styles = this._getStyle();
        var coords = this.getMarkerCoords();
        var innerRadius = coords.innerRadius;
        var outerRadius = coords.outerRadius;
        var start = this._getCoords(this.argument, CANVAS_POSITION_DEFAULT);
        var x = coords.x;
        var y = coords.y;
        if (animationEnabled) {
            innerRadius = 0;
            outerRadius = 0;
            x = start.x;
            y = start.y
        }
        this.graphic = renderer.arc(x, y, innerRadius, outerRadius, coords.startAngle, coords.endAngle).attr(styles).data({
            "chart-data-point": this
        }).append(group)
    },
    _checkLabelPosition: function(label, coord) {
        var visibleArea = this._getVisibleArea();
        var angleFunctions = Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["getCosAndSin"])(this.middleAngle);
        var x = this.centerX + this.defaultRadius * angleFunctions.cos;
        var y = this.centerY - this.defaultRadius * angleFunctions.sin;
        if (x > visibleArea.minX && x < visibleArea.maxX && y > visibleArea.minY && y < visibleArea.maxY) {
            coord = this._moveLabelOnCanvas(coord, visibleArea, label.getBoundingRect())
        }
        return coord
    },
    _addLabelAlignmentAndOffset: function(label, coord) {
        return coord
    },
    correctCoordinates: function(correctOptions) {
        this.middleAngleCorrection = correctOptions.offset;
        this.interval = correctOptions.width
    },
    coordsIn: function(x, y) {
        var val = Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["convertXYToPolar"])(this.series.getValueAxis().getCenter(), x, y);
        var coords = this.getMarkerCoords();
        var isBetweenAngles = coords.startAngle < coords.endAngle ? -val.phi >= coords.startAngle && -val.phi <= coords.endAngle : -val.phi <= coords.startAngle && -val.phi >= coords.endAngle;
        return val.r >= coords.innerRadius && val.r <= coords.outerRadius && isBetweenAngles
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/range_bar_point.js":
/*!**************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/range_bar_point.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _bar_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bar_point */ "./node_modules/devextreme/esm/viz/series/points/bar_point.js");
/* harmony import */ var _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./range_symbol_point */ "./node_modules/devextreme/esm/viz/series/points/range_symbol_point.js");
/**
 * DevExtreme (esm/viz/series/points/range_bar_point.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"];
/* harmony default export */ __webpack_exports__["default"] = (_extend({}, _bar_point__WEBPACK_IMPORTED_MODULE_2__["default"], {
    deleteLabel: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"].deleteLabel,
    _getFormatObject: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getFormatObject,
    clearVisibility: function() {
        var graphic = this.graphic;
        if (graphic && graphic.attr("visibility")) {
            graphic.attr({
                visibility: null
            })
        }
    },
    setInvisibility: function() {
        var graphic = this.graphic;
        if (graphic && "hidden" !== graphic.attr("visibility")) {
            graphic.attr({
                visibility: "hidden"
            })
        }
        this._topLabel.draw(false);
        this._bottomLabel.draw(false)
    },
    getTooltipParams: function(location) {
        var edgeLocation = "edge" === location;
        var x;
        var y;
        if (this._options.rotated) {
            x = edgeLocation ? this.x + this.width : this.x + this.width / 2;
            y = this.y + this.height / 2
        } else {
            x = this.x + this.width / 2;
            y = edgeLocation ? this.y : this.y + this.height / 2
        }
        return {
            x: x,
            y: y,
            offset: 0
        }
    },
    _translate: function() {
        var barMethods = _bar_point__WEBPACK_IMPORTED_MODULE_2__["default"];
        barMethods._translate.call(this);
        if (this._options.rotated) {
            this.width = this.width || 1
        } else {
            this.height = this.height || 1
        }
    },
    hasCoords: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"].hasCoords,
    _updateData: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._updateData,
    _getLabelPosition: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getLabelPosition,
    _getLabelMinFormatObject: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getLabelMinFormatObject,
    _updateLabelData: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._updateLabelData,
    _updateLabelOptions: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._updateLabelOptions,
    getCrosshairData: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"].getCrosshairData,
    _createLabel: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._createLabel,
    _checkOverlay: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._checkOverlay,
    _checkLabelsOverlay: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._checkLabelsOverlay,
    _getOverlayCorrections: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getOverlayCorrections,
    _drawLabel: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._drawLabel,
    _getLabelCoords: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"]._getLabelCoords,
    getLabel: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"].getLabel,
    getLabels: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"].getLabels,
    getBoundingRect: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    getMinValue: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"].getMinValue,
    getMaxValue: _range_symbol_point__WEBPACK_IMPORTED_MODULE_3__["default"].getMaxValue
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/range_symbol_point.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/range_symbol_point.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./label */ "./node_modules/devextreme/esm/viz/series/points/label.js");
/* harmony import */ var _symbol_point__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./symbol_point */ "./node_modules/devextreme/esm/viz/series/points/symbol_point.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/**
 * DevExtreme (esm/viz/series/points/range_symbol_point.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */





var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"];

var _math = Math;
var _abs = _math.abs;
var _min = _math.min;
var _max = _math.max;
var _round = _math.round;
var DEFAULT_IMAGE_WIDTH = 20;
var DEFAULT_IMAGE_HEIGHT = 20;
/* harmony default export */ __webpack_exports__["default"] = (_extend({}, _symbol_point__WEBPACK_IMPORTED_MODULE_4__["default"], {
    deleteLabel: function() {
        this._topLabel.dispose();
        this._topLabel = null;
        this._bottomLabel.dispose();
        this._bottomLabel = null
    },
    hideMarker: function(type) {
        var graphic = this.graphic;
        var marker = graphic && graphic[type + "Marker"];
        var label = this["_" + type + "Label"];
        if (marker && "hidden" !== marker.attr("visibility")) {
            marker.attr({
                visibility: "hidden"
            })
        }
        label.draw(false)
    },
    setInvisibility: function() {
        this.hideMarker("top");
        this.hideMarker("bottom")
    },
    clearVisibility: function() {
        var graphic = this.graphic;
        var topMarker = graphic && graphic.topMarker;
        var bottomMarker = graphic && graphic.bottomMarker;
        if (topMarker && topMarker.attr("visibility")) {
            topMarker.attr({
                visibility: null
            })
        }
        if (bottomMarker && bottomMarker.attr("visibility")) {
            bottomMarker.attr({
                visibility: null
            })
        }
    },
    clearMarker: function() {
        var graphic = this.graphic;
        var topMarker = graphic && graphic.topMarker;
        var bottomMarker = graphic && graphic.bottomMarker;
        var emptySettings = this._emptySettings;
        topMarker && topMarker.attr(emptySettings);
        bottomMarker && bottomMarker.attr(emptySettings)
    },
    _getLabelPosition: function(markerType) {
        var position;
        var labelsInside = "inside" === this._options.label.position;
        if (!this._options.rotated) {
            position = "top" === markerType ^ labelsInside ? "top" : "bottom"
        } else {
            position = "top" === markerType ^ labelsInside ? "right" : "left"
        }
        return position
    },
    _getLabelMinFormatObject: function() {
        return {
            index: 0,
            argument: this.initialArgument,
            value: this.initialMinValue,
            seriesName: this.series.name,
            originalValue: this.originalMinValue,
            originalArgument: this.originalArgument,
            point: this
        }
    },
    _updateLabelData: function() {
        var maxFormatObject = this._getLabelFormatObject();
        maxFormatObject.index = 1;
        this._topLabel.setData(maxFormatObject);
        this._bottomLabel.setData(this._getLabelMinFormatObject())
    },
    _updateLabelOptions: function() {
        var options = this._options.label;
        (!this._topLabel || !this._bottomLabel) && this._createLabel();
        this._topLabel.setOptions(options);
        this._bottomLabel.setOptions(options)
    },
    _createLabel: function() {
        var options = {
            renderer: this.series._renderer,
            labelsGroup: this.series._labelsGroup,
            point: this
        };
        this._topLabel = new _label__WEBPACK_IMPORTED_MODULE_3__["Label"](options);
        this._bottomLabel = new _label__WEBPACK_IMPORTED_MODULE_3__["Label"](options)
    },
    _getGraphicBBox: function(location) {
        var options = this._options;
        var images = this._getImage(options.image);
        var image = "top" === location ? this._checkImage(images.top) : this._checkImage(images.bottom);
        var bBox;
        var coord = this._getPositionFromLocation(location);
        if (options.visible) {
            bBox = image ? this._getImageBBox(coord.x, coord.y) : this._getSymbolBBox(coord.x, coord.y, options.styles.normal.r)
        } else {
            bBox = {
                x: coord.x,
                y: coord.y,
                width: 0,
                height: 0
            }
        }
        return bBox
    },
    _getPositionFromLocation: function(location) {
        var x;
        var y;
        var isTop = "top" === location;
        if (!this._options.rotated) {
            x = this.x;
            y = isTop ? _min(this.y, this.minY) : _max(this.y, this.minY)
        } else {
            x = isTop ? _max(this.x, this.minX) : _min(this.x, this.minX);
            y = this.y
        }
        return {
            x: x,
            y: y
        }
    },
    _checkOverlay: function(bottomCoord, topCoord, topValue) {
        return bottomCoord < topCoord + topValue
    },
    _getOverlayCorrections: function(topCoords, bottomCoords) {
        var rotated = this._options.rotated;
        var coordSelector = !rotated ? "y" : "x";
        var valueSelector = !rotated ? "height" : "width";
        var visibleArea = this.series.getValueAxis().getVisibleArea();
        var minBound = visibleArea[0];
        var maxBound = visibleArea[1];
        var delta = _round((topCoords[coordSelector] + topCoords[valueSelector] - bottomCoords[coordSelector]) / 2);
        var coord1 = topCoords[coordSelector] - delta;
        var coord2 = bottomCoords[coordSelector] + delta;
        if (coord1 < minBound) {
            delta = minBound - coord1;
            coord1 += delta;
            coord2 += delta
        } else if (coord2 + bottomCoords[valueSelector] > maxBound) {
            delta = maxBound - coord2 - bottomCoords[valueSelector];
            coord1 += delta;
            coord2 += delta
        }
        return {
            coord1: coord1,
            coord2: coord2
        }
    },
    _checkLabelsOverlay: function(topLocation) {
        var topCoords = this._topLabel.getBoundingRect();
        var bottomCoords = this._bottomLabel.getBoundingRect();
        var corrections = {};
        if (!this._options.rotated) {
            if ("top" === topLocation) {
                if (this._checkOverlay(bottomCoords.y, topCoords.y, topCoords.height)) {
                    corrections = this._getOverlayCorrections(topCoords, bottomCoords);
                    this._topLabel.shift(topCoords.x, corrections.coord1);
                    this._bottomLabel.shift(bottomCoords.x, corrections.coord2)
                }
            } else if (this._checkOverlay(topCoords.y, bottomCoords.y, bottomCoords.height)) {
                corrections = this._getOverlayCorrections(bottomCoords, topCoords);
                this._topLabel.shift(topCoords.x, corrections.coord2);
                this._bottomLabel.shift(bottomCoords.x, corrections.coord1)
            }
        } else if ("top" === topLocation) {
            if (this._checkOverlay(topCoords.x, bottomCoords.x, bottomCoords.width)) {
                corrections = this._getOverlayCorrections(bottomCoords, topCoords);
                this._topLabel.shift(corrections.coord2, topCoords.y);
                this._bottomLabel.shift(corrections.coord1, bottomCoords.y)
            }
        } else if (this._checkOverlay(bottomCoords.x, topCoords.x, topCoords.width)) {
            corrections = this._getOverlayCorrections(topCoords, bottomCoords);
            this._topLabel.shift(corrections.coord1, topCoords.y);
            this._bottomLabel.shift(corrections.coord2, bottomCoords.y)
        }
    },
    _drawLabel: function() {
        var labels = [];
        var notInverted = this._options.rotated ? this.x >= this.minX : this.y < this.minY;
        var customVisibility = this._getCustomLabelVisibility();
        var topLabel = this._topLabel;
        var bottomLabel = this._bottomLabel;
        topLabel.pointPosition = notInverted ? "top" : "bottom";
        bottomLabel.pointPosition = notInverted ? "bottom" : "top";
        if ((this.series.getLabelVisibility() || customVisibility) && this.hasValue() && false !== customVisibility) {
            false !== this.visibleTopMarker && labels.push(topLabel);
            false !== this.visibleBottomMarker && labels.push(bottomLabel);
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_0__["each"])(labels, (function(_, label) {
                label.draw(true)
            }));
            this._checkLabelsOverlay(this._topLabel.pointPosition)
        } else {
            topLabel.draw(false);
            bottomLabel.draw(false)
        }
    },
    _getImage: function(imageOption) {
        var image = {};
        if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(imageOption)) {
            if ("string" === typeof imageOption) {
                image.top = image.bottom = imageOption
            } else {
                image.top = {
                    url: "string" === typeof imageOption.url ? imageOption.url : imageOption.url && imageOption.url.rangeMaxPoint,
                    width: "number" === typeof imageOption.width ? imageOption.width : imageOption.width && imageOption.width.rangeMaxPoint,
                    height: "number" === typeof imageOption.height ? imageOption.height : imageOption.height && imageOption.height.rangeMaxPoint
                };
                image.bottom = {
                    url: "string" === typeof imageOption.url ? imageOption.url : imageOption.url && imageOption.url.rangeMinPoint,
                    width: "number" === typeof imageOption.width ? imageOption.width : imageOption.width && imageOption.width.rangeMinPoint,
                    height: "number" === typeof imageOption.height ? imageOption.height : imageOption.height && imageOption.height.rangeMinPoint
                }
            }
        }
        return image
    },
    _checkSymbol: function(oldOptions, newOptions) {
        var oldSymbol = oldOptions.symbol;
        var newSymbol = newOptions.symbol;
        var symbolChanged = "circle" === oldSymbol && "circle" !== newSymbol || "circle" !== oldSymbol && "circle" === newSymbol;
        var oldImages = this._getImage(oldOptions.image);
        var newImages = this._getImage(newOptions.image);
        var topImageChanged = this._checkImage(oldImages.top) !== this._checkImage(newImages.top);
        var bottomImageChanged = this._checkImage(oldImages.bottom) !== this._checkImage(newImages.bottom);
        return symbolChanged || topImageChanged || bottomImageChanged
    },
    _getSettingsForTwoMarkers: function(style) {
        var options = this._options;
        var settings = {};
        var x = options.rotated ? _min(this.x, this.minX) : this.x;
        var y = options.rotated ? this.y : _min(this.y, this.minY);
        var radius = style.r;
        var points = this._populatePointShape(options.symbol, radius);
        settings.top = _extend({
            translateX: x + this.width,
            translateY: y,
            r: radius
        }, style);
        settings.bottom = _extend({
            translateX: x,
            translateY: y + this.height,
            r: radius
        }, style);
        if (points) {
            settings.top.points = settings.bottom.points = points
        }
        return settings
    },
    _hasGraphic: function() {
        return this.graphic && this.graphic.topMarker && this.graphic.bottomMarker
    },
    _drawOneMarker: function(renderer, markerType, imageSettings, settings) {
        var graphic = this.graphic;
        if (graphic[markerType]) {
            this._updateOneMarker(markerType, settings)
        } else {
            graphic[markerType] = this._createMarker(renderer, graphic, imageSettings, settings)
        }
    },
    _drawMarker: function(renderer, group, animationEnabled, firstDrawing, style) {
        var settings = this._getSettingsForTwoMarkers(style || this._getStyle());
        var image = this._getImage(this._options.image);
        if (this._checkImage(image.top)) {
            settings.top = this._getImageSettings(settings.top, image.top)
        }
        if (this._checkImage(image.bottom)) {
            settings.bottom = this._getImageSettings(settings.bottom, image.bottom)
        }
        this.graphic = this.graphic || renderer.g().append(group);
        this.visibleTopMarker && this._drawOneMarker(renderer, "topMarker", image.top, settings.top);
        this.visibleBottomMarker && this._drawOneMarker(renderer, "bottomMarker", image.bottom, settings.bottom)
    },
    _getSettingsForTracker: function(radius) {
        var rotated = this._options.rotated;
        return {
            translateX: rotated ? _min(this.x, this.minX) - radius : this.x - radius,
            translateY: rotated ? this.y - radius : _min(this.y, this.minY) - radius,
            width: this.width + 2 * radius,
            height: this.height + 2 * radius
        }
    },
    isInVisibleArea: function() {
        var rotated = this._options.rotated;
        var argument = !rotated ? this.x : this.y;
        var maxValue = !rotated ? _max(this.minY, this.y) : _max(this.minX, this.x);
        var minValue = !rotated ? _min(this.minY, this.y) : _min(this.minX, this.x);
        var tmp;
        var visibleTopMarker;
        var visibleBottomMarker;
        var visibleRangeArea = true;
        var visibleArgArea = this.series.getArgumentAxis().getVisibleArea();
        var visibleValArea = this.series.getValueAxis().getVisibleArea();
        var notVisibleByArg = visibleArgArea[1] < argument || visibleArgArea[0] > argument;
        var notVisibleByVal = visibleValArea[0] > minValue && visibleValArea[0] > maxValue || visibleValArea[1] < minValue && visibleValArea[1] < maxValue;
        if (notVisibleByArg || notVisibleByVal) {
            visibleTopMarker = visibleBottomMarker = visibleRangeArea = false
        } else {
            visibleTopMarker = visibleValArea[0] <= minValue && visibleValArea[1] > minValue;
            visibleBottomMarker = visibleValArea[0] < maxValue && visibleValArea[1] >= maxValue;
            if (rotated) {
                tmp = visibleTopMarker;
                visibleTopMarker = visibleBottomMarker;
                visibleBottomMarker = tmp
            }
        }
        this.visibleTopMarker = visibleTopMarker;
        this.visibleBottomMarker = visibleBottomMarker;
        return visibleRangeArea
    },
    getTooltipParams: function() {
        var x;
        var y;
        var rotated = this._options.rotated;
        var minValue = !rotated ? _min(this.y, this.minY) : _min(this.x, this.minX);
        var side = !rotated ? "height" : "width";
        var visibleArea = this._getVisibleArea();
        var minVisible = rotated ? visibleArea.minX : visibleArea.minY;
        var maxVisible = rotated ? visibleArea.maxX : visibleArea.maxY;
        var min = _max(minVisible, minValue);
        var max = _min(maxVisible, minValue + this[side]);
        if (!rotated) {
            x = this.x;
            y = min + (max - min) / 2
        } else {
            y = this.y;
            x = min + (max - min) / 2
        }
        return {
            x: x,
            y: y,
            offset: 0
        }
    },
    _translate: function() {
        var rotated = this._options.rotated;
        _symbol_point__WEBPACK_IMPORTED_MODULE_4__["default"]._translate.call(this);
        this.height = rotated ? 0 : _abs(this.minY - this.y);
        this.width = rotated ? _abs(this.x - this.minX) : 0
    },
    hasCoords: function() {
        return _symbol_point__WEBPACK_IMPORTED_MODULE_4__["default"].hasCoords.call(this) && !(null === this.minX || null === this.minY)
    },
    _updateData: function(data) {
        _symbol_point__WEBPACK_IMPORTED_MODULE_4__["default"]._updateData.call(this, data);
        this.minValue = this.initialMinValue = this.originalMinValue = data.minValue
    },
    _getImageSettings: function(settings, image) {
        return {
            href: image.url || image.toString(),
            width: image.width || DEFAULT_IMAGE_WIDTH,
            height: image.height || DEFAULT_IMAGE_HEIGHT,
            translateX: settings.translateX,
            translateY: settings.translateY
        }
    },
    getCrosshairData: function(x, y) {
        var rotated = this._options.rotated;
        var minX = this.minX;
        var minY = this.minY;
        var vx = this.vx;
        var vy = this.vy;
        var value = this.value;
        var minValue = this.minValue;
        var argument = this.argument;
        var coords = {
            axis: this.series.axis,
            x: vx,
            y: vy,
            yValue: value,
            xValue: argument
        };
        if (rotated) {
            coords.yValue = argument;
            if (_abs(vx - x) < _abs(minX - x)) {
                coords.xValue = value
            } else {
                coords.x = minX;
                coords.xValue = minValue
            }
        } else if (_abs(vy - y) >= _abs(minY - y)) {
            coords.y = minY;
            coords.yValue = minValue
        }
        return coords
    },
    _updateOneMarker: function(markerType, settings) {
        this.graphic && this.graphic[markerType] && this.graphic[markerType].attr(settings)
    },
    _updateMarker: function(animationEnabled, style) {
        this._drawMarker(void 0, void 0, false, false, style)
    },
    _getFormatObject: function(tooltip) {
        var initialMinValue = this.initialMinValue;
        var initialValue = this.initialValue;
        var initialArgument = this.initialArgument;
        var minValue = tooltip.formatValue(initialMinValue);
        var value = tooltip.formatValue(initialValue);
        return {
            argument: initialArgument,
            argumentText: tooltip.formatValue(initialArgument, "argument"),
            valueText: minValue + " - " + value,
            rangeValue1Text: minValue,
            rangeValue2Text: value,
            rangeValue1: initialMinValue,
            rangeValue2: initialValue,
            seriesName: this.series.name,
            point: this,
            originalMinValue: this.originalMinValue,
            originalValue: this.originalValue,
            originalArgument: this.originalArgument
        }
    },
    getLabel: function() {
        return [this._topLabel, this._bottomLabel]
    },
    getLabels: function() {
        return [this._topLabel, this._bottomLabel]
    },
    getBoundingRect: _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"],
    coordsIn: function(x, y) {
        var trackerRadius = this._storeTrackerR();
        var xCond = x >= this.x - trackerRadius && x <= this.x + trackerRadius;
        var yCond = y >= this.y - trackerRadius && y <= this.y + trackerRadius;
        if (this._options.rotated) {
            return yCond && (xCond || x >= this.minX - trackerRadius && x <= this.minX + trackerRadius)
        } else {
            return xCond && (yCond || y >= this.minY - trackerRadius && y <= this.minY + trackerRadius)
        }
    },
    getMaxValue: function() {
        if ("discrete" !== this.series.valueAxisType) {
            return this.minValue > this.value ? this.minValue : this.value
        }
        return this.value
    },
    getMinValue: function() {
        if ("discrete" !== this.series.valueAxisType) {
            return this.minValue < this.value ? this.minValue : this.value
        }
        return this.minValue
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/stock_point.js":
/*!**********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/stock_point.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _candlestick_point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./candlestick_point */ "./node_modules/devextreme/esm/viz/series/points/candlestick_point.js");
/**
 * DevExtreme (esm/viz/series/points/stock_point.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */



var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"];
var _isNumeric = _core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isNumeric"];
/* harmony default export */ __webpack_exports__["default"] = (_extend({}, _candlestick_point__WEBPACK_IMPORTED_MODULE_2__["default"], {
    _getPoints: function() {
        var createPoint = this._options.rotated ? function(x, y) {
            return [y, x]
        } : function(x, y) {
            return [x, y]
        };
        var openYExist = _isNumeric(this.openY);
        var closeYExist = _isNumeric(this.closeY);
        var x = this.x;
        var width = this.width;
        var points = [].concat(createPoint(x, this.highY));
        openYExist && (points = points.concat(createPoint(x, this.openY)));
        openYExist && (points = points.concat(createPoint(x - width / 2, this.openY)));
        openYExist && (points = points.concat(createPoint(x, this.openY)));
        closeYExist && (points = points.concat(createPoint(x, this.closeY)));
        closeYExist && (points = points.concat(createPoint(x + width / 2, this.closeY)));
        closeYExist && (points = points.concat(createPoint(x, this.closeY)));
        points = points.concat(createPoint(x, this.lowY));
        return points
    },
    _drawMarkerInGroup: function(group, attributes, renderer) {
        this.graphic = renderer.path(this._getPoints(), "line").attr({
            "stroke-linecap": "square"
        }).attr(attributes).data({
            "chart-data-point": this
        }).sharp().append(group)
    },
    _getMinTrackerWidth: function() {
        var width = 2 + this._styles.normal["stroke-width"];
        return width + width % 2
    }
}));


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/points/symbol_point.js":
/*!***********************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/points/symbol_point.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/utils/window */ "./node_modules/devextreme/esm/core/utils/window.js");
/* harmony import */ var _label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./label */ "./node_modules/devextreme/esm/viz/series/points/label.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/**
 * DevExtreme (esm/viz/series/points/symbol_point.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var window = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_3__["getWindow"])();

var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"];


var _math = Math;
var _round = _math.round;
var _floor = _math.floor;
var _ceil = _math.ceil;
var DEFAULT_IMAGE_WIDTH = 20;
var DEFAULT_IMAGE_HEIGHT = 20;
var LABEL_OFFSET = 10;
var CANVAS_POSITION_DEFAULT = "canvas_position_default";

function getSquareMarkerCoords(radius) {
    return [-radius, -radius, radius, -radius, radius, radius, -radius, radius, -radius, -radius]
}

function getPolygonMarkerCoords(radius) {
    var r = _ceil(radius);
    return [-r, 0, 0, -r, r, 0, 0, r, -r, 0]
}

function getCrossMarkerCoords(radius) {
    var r = _ceil(radius);
    var floorHalfRadius = _floor(r / 2);
    var ceilHalfRadius = _ceil(r / 2);
    return [-r, -floorHalfRadius, -floorHalfRadius, -r, 0, -ceilHalfRadius, floorHalfRadius, -r, r, -floorHalfRadius, ceilHalfRadius, 0, r, floorHalfRadius, floorHalfRadius, r, 0, ceilHalfRadius, -floorHalfRadius, r, -r, floorHalfRadius, -ceilHalfRadius, 0]
}

function getTriangleDownMarkerCoords(radius) {
    return [-radius, -radius, radius, -radius, 0, radius, -radius, -radius]
}

function getTriangleUpMarkerCoords(radius) {
    return [-radius, radius, radius, radius, 0, -radius, -radius, radius]
}
/* harmony default export */ __webpack_exports__["default"] = ({
    deleteLabel: function() {
        this._label.dispose();
        this._label = null
    },
    _hasGraphic: function() {
        return this.graphic
    },
    clearVisibility: function() {
        var graphic = this.graphic;
        if (graphic && graphic.attr("visibility")) {
            graphic.attr({
                visibility: null
            })
        }
    },
    isVisible: function() {
        return this.inVisibleArea && this.series.isVisible()
    },
    setInvisibility: function() {
        var graphic = this.graphic;
        if (graphic && "hidden" !== graphic.attr("visibility")) {
            graphic.attr({
                visibility: "hidden"
            })
        }
        this._errorBar && this._errorBar.attr({
            visibility: "hidden"
        });
        this._label.draw(false)
    },
    clearMarker: function() {
        var graphic = this.graphic;
        graphic && graphic.attr(this._emptySettings)
    },
    _createLabel: function() {
        this._label = new _label__WEBPACK_IMPORTED_MODULE_4__["Label"]({
            renderer: this.series._renderer,
            labelsGroup: this.series._labelsGroup,
            point: this
        })
    },
    _updateLabelData: function() {
        this._label.setData(this._getLabelFormatObject())
    },
    _updateLabelOptions: function() {
        !this._label && this._createLabel();
        this._label.setOptions(this._options.label)
    },
    _checkImage: function(image) {
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(image) && ("string" === typeof image || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(image.url))
    },
    _fillStyle: function() {
        this._styles = this._options.styles
    },
    _checkSymbol: function(oldOptions, newOptions) {
        var oldSymbol = oldOptions.symbol;
        var newSymbol = newOptions.symbol;
        var symbolChanged = "circle" === oldSymbol && "circle" !== newSymbol || "circle" !== oldSymbol && "circle" === newSymbol;
        var imageChanged = this._checkImage(oldOptions.image) !== this._checkImage(newOptions.image);
        return !!(symbolChanged || imageChanged)
    },
    _populatePointShape: function(symbol, radius) {
        switch (symbol) {
            case "square":
                return getSquareMarkerCoords(radius);
            case "polygon":
                return getPolygonMarkerCoords(radius);
            case "triangle":
            case "triangleDown":
                return getTriangleDownMarkerCoords(radius);
            case "triangleUp":
                return getTriangleUpMarkerCoords(radius);
            case "cross":
                return getCrossMarkerCoords(radius)
        }
    },
    hasCoords: function() {
        return null !== this.x && null !== this.y
    },
    correctValue: function(correction) {
        var axis = this.series.getValueAxis();
        if (this.hasValue()) {
            this.value = this.properValue = axis.validateUnit(this.initialValue.valueOf() + correction.valueOf());
            this.minValue = axis.validateUnit(correction)
        }
    },
    resetCorrection: function() {
        this.value = this.properValue = this.initialValue;
        this.minValue = CANVAS_POSITION_DEFAULT
    },
    resetValue: function() {
        if (this.hasValue()) {
            this.value = this.properValue = this.initialValue = 0;
            this.minValue = 0;
            this._label.setDataField("value", this.value)
        }
    },
    _getTranslates: function(animationEnabled) {
        var translateX = this.x;
        var translateY = this.y;
        if (animationEnabled) {
            if (this._options.rotated) {
                translateX = this.defaultX
            } else {
                translateY = this.defaultY
            }
        }
        return {
            x: translateX,
            y: translateY
        }
    },
    _createImageMarker: function(renderer, settings, options) {
        var width = options.width || DEFAULT_IMAGE_WIDTH;
        var height = options.height || DEFAULT_IMAGE_HEIGHT;
        return renderer.image(-_round(.5 * width), -_round(.5 * height), width, height, options.url ? options.url.toString() : options.toString(), "center").attr({
            translateX: settings.translateX,
            translateY: settings.translateY,
            visibility: settings.visibility
        })
    },
    _createSymbolMarker: function(renderer, pointSettings) {
        var marker;
        var symbol = this._options.symbol;
        if ("circle" === symbol) {
            delete pointSettings.points;
            marker = renderer.circle().attr(pointSettings)
        } else if ("square" === symbol || "polygon" === symbol || "triangle" === symbol || "triangleDown" === symbol || "triangleUp" === symbol || "cross" === symbol) {
            marker = renderer.path([], "area").attr(pointSettings).sharp()
        }
        return marker
    },
    _createMarker: function(renderer, group, image, settings) {
        var marker = this._checkImage(image) ? this._createImageMarker(renderer, settings, image) : this._createSymbolMarker(renderer, settings);
        if (marker) {
            marker.data({
                "chart-data-point": this
            }).append(group)
        }
        return marker
    },
    _getSymbolBBox: function(x, y, r) {
        return {
            x: x - r,
            y: y - r,
            width: 2 * r,
            height: 2 * r
        }
    },
    _getImageBBox: function(x, y) {
        var image = this._options.image;
        var width = image.width || DEFAULT_IMAGE_WIDTH;
        var height = image.height || DEFAULT_IMAGE_HEIGHT;
        return {
            x: x - _round(width / 2),
            y: y - _round(height / 2),
            width: width,
            height: height
        }
    },
    _getGraphicBBox: function() {
        var options = this._options;
        var x = this.x;
        var y = this.y;
        var bBox;
        if (options.visible) {
            bBox = this._checkImage(options.image) ? this._getImageBBox(x, y) : this._getSymbolBBox(x, y, options.styles.normal.r)
        } else {
            bBox = {
                x: x,
                y: y,
                width: 0,
                height: 0
            }
        }
        return bBox
    },
    hideInsideLabel: _core_utils_common__WEBPACK_IMPORTED_MODULE_2__["noop"],
    _getShiftLabelCoords: function(label) {
        var coord = this._addLabelAlignmentAndOffset(label, this._getLabelCoords(label));
        return this._checkLabelPosition(label, coord)
    },
    _drawLabel: function() {
        var customVisibility = this._getCustomLabelVisibility();
        var label = this._label;
        var isVisible = this._showForZeroValues() && this.hasValue() && false !== customVisibility && (this.series.getLabelVisibility() || customVisibility);
        label.draw(!!isVisible)
    },
    correctLabelPosition: function(label) {
        var coord = this._getShiftLabelCoords(label);
        if (!this.hideInsideLabel(label, coord)) {
            label.setFigureToDrawConnector(this._getLabelConnector(label.pointPosition));
            label.shift(_round(coord.x), _round(coord.y))
        }
    },
    _showForZeroValues: function() {
        return true
    },
    _getLabelConnector: function(pointPosition) {
        var bBox = this._getGraphicBBox(pointPosition);
        var w2 = bBox.width / 2;
        var h2 = bBox.height / 2;
        return {
            x: bBox.x + w2,
            y: bBox.y + h2,
            r: this._options.visible ? Math.max(w2, h2) : 0
        }
    },
    _getPositionFromLocation: function() {
        return {
            x: this.x,
            y: this.y
        }
    },
    _isPointInVisibleArea: function(visibleArea, graphicBBox) {
        return visibleArea.minX <= graphicBBox.x + graphicBBox.width && visibleArea.maxX >= graphicBBox.x && visibleArea.minY <= graphicBBox.y + graphicBBox.height && visibleArea.maxY >= graphicBBox.y
    },
    _checkLabelPosition: function(label, coord) {
        var visibleArea = this._getVisibleArea();
        var labelBBox = label.getBoundingRect();
        var graphicBBox = this._getGraphicBBox(label.pointPosition);
        var fullGraphicBBox = this._getGraphicBBox();
        var isInside = "inside" === label.getLayoutOptions().position;
        var offset = LABEL_OFFSET;
        if (this._isPointInVisibleArea(visibleArea, fullGraphicBBox)) {
            if (!this._options.rotated) {
                if (visibleArea.minX > coord.x) {
                    coord.x = visibleArea.minX
                }
                if (visibleArea.maxX < coord.x + labelBBox.width) {
                    coord.x = visibleArea.maxX - labelBBox.width
                }
                if (visibleArea.minY > coord.y) {
                    coord.y = isInside ? visibleArea.minY : graphicBBox.y + graphicBBox.height + offset
                }
                if (visibleArea.maxY < coord.y + labelBBox.height) {
                    coord.y = isInside ? visibleArea.maxY - labelBBox.height : graphicBBox.y - labelBBox.height - offset
                }
            } else {
                if (visibleArea.minX > coord.x) {
                    coord.x = isInside ? visibleArea.minX : graphicBBox.x + graphicBBox.width + offset
                }
                if (visibleArea.maxX < coord.x + labelBBox.width) {
                    coord.x = isInside ? visibleArea.maxX - labelBBox.width : graphicBBox.x - offset - labelBBox.width
                }
                if (visibleArea.minY > coord.y) {
                    coord.y = visibleArea.minY
                }
                if (visibleArea.maxY < coord.y + labelBBox.height) {
                    coord.y = visibleArea.maxY - labelBBox.height
                }
            }
        }
        return coord
    },
    _addLabelAlignmentAndOffset: function(label, coord) {
        var labelBBox = label.getBoundingRect();
        var labelOptions = label.getLayoutOptions();
        if (!this._options.rotated) {
            if ("left" === labelOptions.alignment) {
                coord.x += labelBBox.width / 2
            } else if ("right" === labelOptions.alignment) {
                coord.x -= labelBBox.width / 2
            }
        }
        coord.x += labelOptions.horizontalOffset;
        coord.y += labelOptions.verticalOffset;
        return coord
    },
    _getLabelCoords: function(label) {
        return this._getLabelCoordOfPosition(label, this._getLabelPosition(label.pointPosition))
    },
    _getLabelCoordOfPosition: function(label, position) {
        var labelBBox = label.getBoundingRect();
        var graphicBBox = this._getGraphicBBox(label.pointPosition);
        var offset = LABEL_OFFSET;
        var centerY = graphicBBox.height / 2 - labelBBox.height / 2;
        var centerX = graphicBBox.width / 2 - labelBBox.width / 2;
        var x = graphicBBox.x;
        var y = graphicBBox.y;
        switch (position) {
            case "left":
                x -= labelBBox.width + offset;
                y += centerY;
                break;
            case "right":
                x += graphicBBox.width + offset;
                y += centerY;
                break;
            case "top":
                x += centerX;
                y -= labelBBox.height + offset;
                break;
            case "bottom":
                x += centerX;
                y += graphicBBox.height + offset;
                break;
            case "inside":
                x += centerX;
                y += centerY
        }
        return {
            x: x,
            y: y
        }
    },
    _drawMarker: function(renderer, group, animationEnabled) {
        var options = this._options;
        var translates = this._getTranslates(animationEnabled);
        var style = this._getStyle();
        this.graphic = this._createMarker(renderer, group, options.image, _extend({
            translateX: translates.x,
            translateY: translates.y,
            points: this._populatePointShape(options.symbol, style.r)
        }, style))
    },
    _getErrorBarSettings: function() {
        return {
            visibility: "visible"
        }
    },
    _getErrorBarBaseEdgeLength() {
        return 2 * this.getPointRadius()
    },
    _drawErrorBar: function(renderer, group) {
        if (!this._options.errorBars) {
            return
        }
        var options = this._options;
        var errorBarOptions = options.errorBars;
        var points = [];
        var settings;
        var pos = this._errorBarPos;
        var high = this._highErrorCoord;
        var low = this._lowErrorCoord;
        var displayMode = Object(_core_utils__WEBPACK_IMPORTED_MODULE_6__["normalizeEnum"])(errorBarOptions.displayMode);
        var isHighDisplayMode = "high" === displayMode;
        var isLowDisplayMode = "low" === displayMode;
        var highErrorOnly = (isHighDisplayMode || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(low)) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(high) && !isLowDisplayMode;
        var lowErrorOnly = (isLowDisplayMode || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(high)) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(low) && !isHighDisplayMode;
        var edgeLength = errorBarOptions.edgeLength;
        if (edgeLength <= 1 && edgeLength > 0) {
            edgeLength = this._getErrorBarBaseEdgeLength() * errorBarOptions.edgeLength
        }
        edgeLength = _floor(parseInt(edgeLength) / 2);
        highErrorOnly && (low = this._baseErrorBarPos);
        lowErrorOnly && (high = this._baseErrorBarPos);
        if ("none" !== displayMode && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(high) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(low) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(pos)) {
            !lowErrorOnly && points.push([pos - edgeLength, high, pos + edgeLength, high]);
            points.push([pos, high, pos, low]);
            !highErrorOnly && points.push([pos + edgeLength, low, pos - edgeLength, low]);
            options.rotated && Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"])(points, (function(_, p) {
                p.reverse()
            }));
            settings = this._getErrorBarSettings(errorBarOptions);
            if (!this._errorBar) {
                this._errorBar = renderer.path(points, "line").attr(settings).append(group)
            } else {
                settings.points = points;
                this._errorBar.attr(settings)
            }
        } else {
            this._errorBar && this._errorBar.attr({
                visibility: "hidden"
            })
        }
    },
    getTooltipParams: function() {
        var graphic = this.graphic;
        return {
            x: this.x,
            y: this.y,
            offset: graphic ? graphic.getBBox().height / 2 : 0
        }
    },
    setPercentValue: function(absTotal, total, leftHoleTotal, rightHoleTotal) {
        var valuePercent = this.value / absTotal || 0;
        var minValuePercent = this.minValue / absTotal || 0;
        var percent = valuePercent - minValuePercent;
        this._label.setDataField("percent", percent);
        this._label.setDataField("total", total);
        if (this.series.isFullStackedSeries() && this.hasValue()) {
            if (this.leftHole) {
                this.leftHole /= absTotal - leftHoleTotal;
                this.minLeftHole /= absTotal - leftHoleTotal
            }
            if (this.rightHole) {
                this.rightHole /= absTotal - rightHoleTotal;
                this.minRightHole /= absTotal - rightHoleTotal
            }
            this.value = this.properValue = valuePercent;
            this.minValue = !minValuePercent ? this.minValue : minValuePercent
        }
    },
    _storeTrackerR: function() {
        var navigator = window.navigator;
        var r = this._options.styles.normal.r;
        var minTrackerSize = Object(_core_utils_window__WEBPACK_IMPORTED_MODULE_3__["hasProperty"])("ontouchstart") || navigator.msPointerEnabled && navigator.msMaxTouchPoints || navigator.pointerEnabled && navigator.maxTouchPoints ? 20 : 6;
        this._options.trackerR = r < minTrackerSize ? minTrackerSize : r;
        return this._options.trackerR
    },
    _translateErrorBars: function() {
        var options = this._options;
        var rotated = options.rotated;
        var errorBars = options.errorBars;
        var translator = this._getValTranslator();
        if (!errorBars) {
            return
        }
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(this.lowError) && (this._lowErrorCoord = translator.translate(this.lowError));
        Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(this.highError) && (this._highErrorCoord = translator.translate(this.highError));
        this._errorBarPos = _floor(rotated ? this.vy : this.vx);
        this._baseErrorBarPos = "stdDeviation" === errorBars.type ? this._lowErrorCoord + (this._highErrorCoord - this._lowErrorCoord) / 2 : rotated ? this.vx : this.vy
    },
    _translate: function() {
        var valTranslator = this._getValTranslator();
        var argTranslator = this._getArgTranslator();
        if (this._options.rotated) {
            this.vx = this.x = valTranslator.translate(this.value);
            this.vy = this.y = argTranslator.translate(this.argument);
            this.minX = valTranslator.translate(this.minValue);
            this.defaultX = valTranslator.translate(CANVAS_POSITION_DEFAULT)
        } else {
            this.vy = this.y = valTranslator.translate(this.value);
            this.vx = this.x = argTranslator.translate(this.argument);
            this.minY = valTranslator.translate(this.minValue);
            this.defaultY = valTranslator.translate(CANVAS_POSITION_DEFAULT)
        }
        this._translateErrorBars();
        this._calculateVisibility(this.x, this.y)
    },
    _updateData: function(data) {
        this.value = this.properValue = this.initialValue = this.originalValue = data.value;
        this.minValue = this.initialMinValue = this.originalMinValue = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(data.minValue) ? data.minValue : CANVAS_POSITION_DEFAULT
    },
    _getImageSettings: function(image) {
        return {
            href: image.url || image.toString(),
            width: image.width || DEFAULT_IMAGE_WIDTH,
            height: image.height || DEFAULT_IMAGE_HEIGHT
        }
    },
    getCrosshairData: function() {
        var r = this._options.rotated;
        var value = this.properValue;
        var argument = this.argument;
        return {
            x: this.vx,
            y: this.vy,
            xValue: r ? value : argument,
            yValue: r ? argument : value,
            axis: this.series.axis
        }
    },
    getPointRadius: function() {
        var style = this._getStyle();
        var options = this._options;
        var r = style.r;
        var extraSpace;
        var symbol = options.symbol;
        var isSquare = "square" === symbol;
        var isTriangle = "triangle" === symbol || "triangleDown" === symbol || "triangleUp" === symbol;
        if (options.visible && !options.image && r) {
            extraSpace = style["stroke-width"] / 2;
            return (isSquare || isTriangle ? 1.4 * r : r) + extraSpace
        }
        return 0
    },
    _updateMarker: function(animationEnabled, style) {
        var options = this._options;
        var settings;
        var image = options.image;
        var visibility = !this.isVisible() ? {
            visibility: "hidden"
        } : {};
        if (this._checkImage(image)) {
            settings = _extend({}, {
                visibility: style.visibility
            }, visibility, this._getImageSettings(image))
        } else {
            settings = _extend({}, style, visibility, {
                points: this._populatePointShape(options.symbol, style.r)
            })
        }
        if (!animationEnabled) {
            settings.translateX = this.x;
            settings.translateY = this.y
        }
        this.graphic.attr(settings).sharp()
    },
    _getLabelFormatObject: function() {
        return {
            argument: this.initialArgument,
            value: this.initialValue,
            originalArgument: this.originalArgument,
            originalValue: this.originalValue,
            seriesName: this.series.name,
            lowErrorValue: this.lowError,
            highErrorValue: this.highError,
            point: this
        }
    },
    _getLabelPosition: function() {
        var rotated = this._options.rotated;
        if (this.initialValue > 0) {
            return rotated ? "right" : "top"
        } else {
            return rotated ? "left" : "bottom"
        }
    },
    _getFormatObject: function(tooltip) {
        var labelFormatObject = this._label.getData();
        return _extend({}, labelFormatObject, {
            argumentText: tooltip.formatValue(this.initialArgument, "argument"),
            valueText: tooltip.formatValue(this.initialValue)
        }, Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(labelFormatObject.percent) ? {
            percentText: tooltip.formatValue(labelFormatObject.percent, "percent")
        } : {}, Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(labelFormatObject.total) ? {
            totalText: tooltip.formatValue(labelFormatObject.total)
        } : {})
    },
    getMarkerVisibility: function() {
        return this._options.visible
    },
    coordsIn: function(x, y) {
        var trackerRadius = this._storeTrackerR();
        return x >= this.x - trackerRadius && x <= this.x + trackerRadius && y >= this.y - trackerRadius && y <= this.y + trackerRadius
    },
    getMinValue: function(noErrorBar) {
        var errorBarOptions = this._options.errorBars;
        if (errorBarOptions && !noErrorBar) {
            var displayMode = errorBarOptions.displayMode;
            var lowValue = "high" !== displayMode && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(this.lowError) ? this.lowError : this.value;
            var highValue = "low" !== displayMode && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(this.highError) ? this.highError : this.value;
            return lowValue < highValue ? lowValue : highValue
        } else {
            return this.value
        }
    },
    getMaxValue: function(noErrorBar) {
        var errorBarOptions = this._options.errorBars;
        if (errorBarOptions && !noErrorBar) {
            var displayMode = errorBarOptions.displayMode;
            var lowValue = "high" !== displayMode && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(this.lowError) ? this.lowError : this.value;
            var highValue = "low" !== displayMode && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_5__["isDefined"])(this.highError) ? this.highError : this.value;
            return lowValue > highValue ? lowValue : highValue
        } else {
            return this.value
        }
    }
});


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/range_series.js":
/*!****************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/range_series.js ***!
  \****************************************************************/
/*! exports provided: chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chart", function() { return chart; });
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _scatter_series__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scatter_series */ "./node_modules/devextreme/esm/viz/series/scatter_series.js");
/* harmony import */ var _bar_series__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bar_series */ "./node_modules/devextreme/esm/viz/series/bar_series.js");
/* harmony import */ var _area_series__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./area_series */ "./node_modules/devextreme/esm/viz/series/area_series.js");
/**
 * DevExtreme (esm/viz/series/range_series.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"];






var barSeries = _bar_series__WEBPACK_IMPORTED_MODULE_5__["chart"].bar;
var areaSeries = _area_series__WEBPACK_IMPORTED_MODULE_6__["chart"].area;
var chart = {};
var baseRangeSeries = {
    areErrorBarsVisible: _core_utils_common__WEBPACK_IMPORTED_MODULE_3__["noop"],
    _createErrorBarGroup: _core_utils_common__WEBPACK_IMPORTED_MODULE_3__["noop"],
    _checkData: function(data, skippedFields) {
        var valueFields = this.getValueFields();
        return _scatter_series__WEBPACK_IMPORTED_MODULE_4__["chart"]._checkData.call(this, data, skippedFields, {
            minValue: valueFields[0],
            value: valueFields[1]
        }) && data.minValue === data.minValue
    },
    getValueRangeInitialValue: _scatter_series__WEBPACK_IMPORTED_MODULE_4__["chart"].getValueRangeInitialValue,
    _getPointDataSelector: function(data) {
        var valueFields = this.getValueFields();
        var val1Field = valueFields[0];
        var val2Field = valueFields[1];
        var tagField = this.getTagField();
        var argumentField = this.getArgumentField();
        return data => ({
            tag: data[tagField],
            minValue: this._processEmptyValue(data[val1Field]),
            value: this._processEmptyValue(data[val2Field]),
            argument: data[argumentField],
            data: data
        })
    },
    _defaultAggregator: "range",
    _aggregators: {
        range(_ref, series) {
            var {
                intervalStart: intervalStart,
                intervalEnd: intervalEnd,
                data: data
            } = _ref;
            if (!data.length) {
                return
            }
            var valueFields = series.getValueFields();
            var val1Field = valueFields[0];
            var val2Field = valueFields[1];
            var result = data.reduce((result, item) => {
                var val1 = item[val1Field];
                var val2 = item[val2Field];
                if (!Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(val1) || !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(val2)) {
                    return result
                }
                result[val1Field] = Math.min(result[val1Field], Math.min(val1, val2));
                result[val2Field] = Math.max(result[val2Field], Math.max(val1, val2));
                return result
            }, {
                [val1Field]: 1 / 0,
                [val2Field]: -1 / 0,
                [series.getArgumentField()]: series._getIntervalCenter(intervalStart, intervalEnd)
            });
            if (!isFinite(result[val1Field]) || !isFinite(result[val2Field])) {
                if (data.filter(i => null === i[val1Field] && null === i[val2Field]).length === data.length) {
                    result[val1Field] = result[val2Field] = null
                } else {
                    return
                }
            }
            return result
        }
    },
    getValueFields: function() {
        return [this._options.rangeValue1Field || "val1", this._options.rangeValue2Field || "val2"]
    },
    getSeriesPairCoord(coord, isArgument) {
        var oppositeCoord = null;
        var {
            rotated: rotated
        } = this._options;
        var isOpposite = !isArgument && !rotated || isArgument && rotated;
        var coordName = isOpposite ? "vy" : "vx";
        var minCoordName = rotated ? "minX" : "minY";
        var oppositeCoordName = isOpposite ? "vx" : "vy";
        var points = this.getPoints();
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var tmpCoord = void 0;
            if (isArgument) {
                tmpCoord = p.getCenterCoord()[coordName[1]] === coord ? p[oppositeCoordName] : void 0
            } else {
                var coords = [Math.min(p[coordName], p[minCoordName]), Math.max(p[coordName], p[minCoordName])];
                tmpCoord = coord >= coords[0] && coord <= coords[1] ? p[oppositeCoordName] : void 0
            }
            if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
                oppositeCoord = tmpCoord;
                break
            }
        }
        return oppositeCoord
    }
};
chart.rangebar = _extend({}, barSeries, baseRangeSeries);
chart.rangearea = _extend({}, areaSeries, {
    _drawPoint: function(options) {
        var point = options.point;
        if (point.isInVisibleArea()) {
            point.clearVisibility();
            point.draw(this._renderer, options.groups);
            this._drawnPoints.push(point);
            if (!point.visibleTopMarker) {
                point.hideMarker("top")
            }
            if (!point.visibleBottomMarker) {
                point.hideMarker("bottom")
            }
        } else {
            point.setInvisibility()
        }
    },
    _prepareSegment: function(points, rotated) {
        var processedPoints = this._processSinglePointsAreaSegment(points, rotated);
        var processedMinPointsCoords = Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["map"])(processedPoints, (function(pt) {
            return pt.getCoords(true)
        }));
        return {
            line: processedPoints,
            bottomLine: processedMinPointsCoords,
            area: Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["map"])(processedPoints, (function(pt) {
                return pt.getCoords()
            })).concat(processedMinPointsCoords.slice().reverse()),
            singlePointSegment: processedPoints !== points
        }
    },
    _getDefaultSegment: function(segment) {
        var defaultSegment = areaSeries._getDefaultSegment.call(this, segment);
        defaultSegment.bottomLine = defaultSegment.line;
        return defaultSegment
    },
    _removeElement: function(element) {
        areaSeries._removeElement.call(this, element);
        element.bottomLine && element.bottomLine.remove()
    },
    _drawElement: function(segment, group) {
        var drawnElement = areaSeries._drawElement.call(this, segment, group);
        drawnElement.bottomLine = this._bordersGroup && this._createBorderElement(segment.bottomLine, {
            "stroke-width": this._styles.normal.border["stroke-width"]
        }).append(this._bordersGroup);
        return drawnElement
    },
    _applyStyle: function(style) {
        var elementsGroup = this._elementsGroup;
        var bordersGroup = this._bordersGroup;
        elementsGroup && elementsGroup.smartAttr(style.elements);
        bordersGroup && bordersGroup.attr(style.border);
        (this._graphics || []).forEach((function(graphic) {
            graphic.line && graphic.line.attr({
                "stroke-width": style.border["stroke-width"]
            });
            graphic.bottomLine && graphic.bottomLine.attr({
                "stroke-width": style.border["stroke-width"]
            })
        }))
    },
    _updateElement: function(element, segment, animate, complete) {
        var bottomLineParams = {
            points: segment.bottomLine
        };
        var bottomBorderElement = element.bottomLine;
        areaSeries._updateElement.apply(this, arguments);
        if (bottomBorderElement) {
            animate ? bottomBorderElement.animate(bottomLineParams) : bottomBorderElement.attr(bottomLineParams)
        }
    }
}, baseRangeSeries);



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/scatter_series.js":
/*!******************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/scatter_series.js ***!
  \******************************************************************/
/*! exports provided: chart, polar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chart", function() { return chart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polar", function() { return polar; });
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/array */ "./node_modules/devextreme/esm/core/utils/array.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/range_data_calculator */ "./node_modules/devextreme/esm/viz/series/helpers/range_data_calculator.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/**
 * DevExtreme (esm/viz/series/scatter_series.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */







var math = Math;
var _abs = math.abs;
var _sqrt = math.sqrt;
var _max = math.max;
var DEFAULT_TRACKER_WIDTH = 12;
var DEFAULT_DURATION = 400;
var HIGH_ERROR = "highError";
var LOW_ERROR = "lowError";
var VARIANCE = "variance";
var STANDARD_DEVIATION = "stddeviation";
var STANDARD_ERROR = "stderror";
var PERCENT = "percent";
var FIXED = "fixed";
var UNDEFINED = "undefined";
var DISCRETE = "discrete";
var LOGARITHMIC = "logarithmic";
var DATETIME = "datetime";
var chart = {};
var polar = {};

function sum(array) {
    var result = 0;
    Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(array, (function(_, value) {
        result += value
    }));
    return result
}

function isErrorBarTypeCorrect(type) {
    return -1 !== Object(_core_utils_array__WEBPACK_IMPORTED_MODULE_1__["inArray"])(type, [FIXED, PERCENT, VARIANCE, STANDARD_DEVIATION, STANDARD_ERROR])
}

function variance(array, expectedValue) {
    return sum(Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["map"])(array, (function(value) {
        return (value - expectedValue) * (value - expectedValue)
    }))) / array.length
}

function calculateAvgErrorBars(result, data, series) {
    var errorBarsOptions = series.getOptions().valueErrorBar;
    var valueField = series.getValueFields()[0];
    var lowValueField = errorBarsOptions.lowValueField || LOW_ERROR;
    var highValueField = errorBarsOptions.highValueField || HIGH_ERROR;
    if (series.areErrorBarsVisible() && void 0 === errorBarsOptions.type) {
        var fusionData = data.reduce((function(result, item) {
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(item[lowValueField])) {
                result[0] += item[valueField] - item[lowValueField];
                result[1]++
            }
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(item[highValueField])) {
                result[2] += item[highValueField] - item[valueField];
                result[3]++
            }
            return result
        }), [0, 0, 0, 0]);
        if (fusionData[1]) {
            result[lowValueField] = result[valueField] - fusionData[0] / fusionData[1]
        }
        if (fusionData[2]) {
            result[highValueField] = result[valueField] + fusionData[2] / fusionData[3]
        }
    }
    return result
}

function calculateSumErrorBars(result, data, series) {
    var errorBarsOptions = series.getOptions().valueErrorBar;
    var lowValueField = errorBarsOptions.lowValueField || LOW_ERROR;
    var highValueField = errorBarsOptions.highValueField || HIGH_ERROR;
    if (series.areErrorBarsVisible() && void 0 === errorBarsOptions.type) {
        result[lowValueField] = 0;
        result[highValueField] = 0;
        result = data.reduce((function(result, item) {
            result[lowValueField] += item[lowValueField];
            result[highValueField] += item[highValueField];
            return result
        }), result)
    }
    return result
}

function getMinMaxAggregator(compare) {
    return (_ref, series) => {
        var {
            intervalStart: intervalStart,
            intervalEnd: intervalEnd,
            data: data
        } = _ref;
        var valueField = series.getValueFields()[0];
        var targetData = data[0];
        targetData = data.reduce((result, item) => {
            var value = item[valueField];
            if (null === result[valueField]) {
                result = item
            }
            if (null !== value && compare(value, result[valueField])) {
                return item
            }
            return result
        }, targetData);
        return Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({}, targetData, {
            [series.getArgumentField()]: series._getIntervalCenter(intervalStart, intervalEnd)
        })
    }
}

function checkFields(data, fieldsToCheck, skippedFields) {
    var allFieldsIsValid = true;
    for (var field in fieldsToCheck) {
        var isArgument = "argument" === field;
        if (isArgument || "size" === field ? !Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(data[field]) : void 0 === data[field]) {
            var selector = fieldsToCheck[field];
            if (!isArgument) {
                skippedFields[selector] = (skippedFields[selector] || 0) + 1
            }
            allFieldsIsValid = false
        }
    }
    return allFieldsIsValid
}
var baseScatterMethods = {
    _defaultDuration: DEFAULT_DURATION,
    _defaultTrackerWidth: DEFAULT_TRACKER_WIDTH,
    _applyStyle: _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"],
    _updateOptions: _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"],
    _parseStyle: _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"],
    _prepareSegment: _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"],
    _drawSegment: _core_utils_common__WEBPACK_IMPORTED_MODULE_6__["noop"],
    _appendInGroup: function() {
        this._group.append(this._extGroups.seriesGroup)
    },
    _createLegendState: function(styleOptions, defaultColor) {
        return {
            fill: styleOptions.color || defaultColor,
            hatching: styleOptions.hatching ? Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({}, styleOptions.hatching, {
                direction: "right"
            }) : void 0
        }
    },
    _applyElementsClipRect: function(settings) {
        settings["clip-path"] = this._paneClipRectID
    },
    _applyMarkerClipRect: function(settings) {
        settings["clip-path"] = this._forceClipping ? this._paneClipRectID : null
    },
    _createGroup: function(groupName, parent, target, settings) {
        var group = parent[groupName] = parent[groupName] || this._renderer.g();
        target && group.append(target);
        settings && group.attr(settings)
    },
    _applyClearingSettings: function(settings) {
        settings.opacity = null;
        settings.scale = null;
        if (this._options.rotated) {
            settings.translateX = null
        } else {
            settings.translateY = null
        }
    },
    _createGroups: function() {
        this._createGroup("_markersGroup", this, this._group);
        this._createGroup("_labelsGroup", this)
    },
    _setMarkerGroupSettings: function() {
        var settings = this._createPointStyles(this._getMarkerGroupOptions()).normal;
        settings.class = "dxc-markers";
        settings.opacity = 1;
        this._applyMarkerClipRect(settings);
        this._markersGroup.attr(settings)
    },
    getVisibleArea: function() {
        return this._visibleArea
    },
    areErrorBarsVisible: function() {
        var errorBarOptions = this._options.valueErrorBar;
        return errorBarOptions && this._errorBarsEnabled() && "none" !== errorBarOptions.displayMode && (isErrorBarTypeCorrect(Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["normalizeEnum"])(errorBarOptions.type)) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(errorBarOptions.lowValueField) || Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(errorBarOptions.highValueField))
    },
    groupPointsByCoords(rotated) {
        var cat = [];
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(this.getVisiblePoints(), (function(_, p) {
            var pointCoord = parseInt(rotated ? p.vy : p.vx);
            if (!cat[pointCoord]) {
                cat[pointCoord] = p
            } else {
                Array.isArray(cat[pointCoord]) ? cat[pointCoord].push(p) : cat[pointCoord] = [cat[pointCoord], p]
            }
        }));
        return cat
    },
    _createErrorBarGroup: function(animationEnabled) {
        var errorBarOptions = this._options.valueErrorBar;
        var settings;
        if (this.areErrorBarsVisible()) {
            settings = {
                class: "dxc-error-bars",
                stroke: errorBarOptions.color,
                "stroke-width": errorBarOptions.lineWidth,
                opacity: animationEnabled ? .001 : errorBarOptions.opacity || 1,
                "stroke-linecap": "square",
                sharp: true,
                "clip-path": this._forceClipping ? this._paneClipRectID : this._widePaneClipRectID
            };
            this._createGroup("_errorBarGroup", this, this._group, settings)
        }
    },
    _setGroupsSettings: function(animationEnabled) {
        this._setMarkerGroupSettings();
        this._setLabelGroupSettings(animationEnabled);
        this._createErrorBarGroup(animationEnabled)
    },
    _getCreatingPointOptions: function() {
        var defaultPointOptions;
        var creatingPointOptions = this._predefinedPointOptions;
        var normalStyle;
        if (!creatingPointOptions) {
            defaultPointOptions = this._getPointOptions();
            this._predefinedPointOptions = creatingPointOptions = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(true, {
                styles: {}
            }, defaultPointOptions);
            normalStyle = defaultPointOptions.styles && defaultPointOptions.styles.normal || {};
            creatingPointOptions.styles = creatingPointOptions.styles || {};
            creatingPointOptions.styles.normal = {
                "stroke-width": normalStyle["stroke-width"],
                r: normalStyle.r,
                opacity: normalStyle.opacity
            }
        }
        return creatingPointOptions
    },
    _getPointOptions: function() {
        return this._parsePointOptions(this._preparePointOptions(), this._options.label)
    },
    _getOptionsForPoint: function() {
        return this._options.point
    },
    _parsePointStyle: function(style, defaultColor, defaultBorderColor, defaultSize) {
        var border = style.border || {};
        var sizeValue = void 0 !== style.size ? style.size : defaultSize;
        return {
            fill: style.color || defaultColor,
            stroke: border.color || defaultBorderColor,
            "stroke-width": border.visible ? border.width : 0,
            r: sizeValue / 2 + (border.visible && 0 !== sizeValue ? ~~(border.width / 2) || 0 : 0)
        }
    },
    _createPointStyles: function(pointOptions) {
        var mainPointColor = pointOptions.color || this._options.mainSeriesColor;
        var containerColor = this._options.containerBackgroundColor;
        var normalStyle = this._parsePointStyle(pointOptions, mainPointColor, mainPointColor);
        normalStyle.visibility = pointOptions.visible ? "visible" : "hidden";
        return {
            normal: normalStyle,
            hover: this._parsePointStyle(pointOptions.hoverStyle, containerColor, mainPointColor, pointOptions.size),
            selection: this._parsePointStyle(pointOptions.selectionStyle, containerColor, mainPointColor, pointOptions.size)
        }
    },
    _checkData: function(data, skippedFields, fieldsToCheck) {
        fieldsToCheck = fieldsToCheck || {
            value: this.getValueFields()[0]
        };
        fieldsToCheck.argument = this.getArgumentField();
        return checkFields(data, fieldsToCheck, skippedFields || {}) && data.value === data.value
    },
    getArgumentRangeInitialValue() {
        var points = this.getPoints();
        if (this.useAggregation() && points.length) {
            var _points$0$aggregation, _points$aggregationIn;
            return {
                min: null === (_points$0$aggregation = points[0].aggregationInfo) || void 0 === _points$0$aggregation ? void 0 : _points$0$aggregation.intervalStart,
                max: null === (_points$aggregationIn = points[points.length - 1].aggregationInfo) || void 0 === _points$aggregationIn ? void 0 : _points$aggregationIn.intervalEnd
            }
        }
        return
    },
    getValueRangeInitialValue: function() {
        return
    },
    _getRangeData: function() {
        return _helpers_range_data_calculator__WEBPACK_IMPORTED_MODULE_3__["default"].getRangeData(this)
    },
    _getPointDataSelector: function() {
        var valueField = this.getValueFields()[0];
        var argumentField = this.getArgumentField();
        var tagField = this.getTagField();
        var areErrorBarsVisible = this.areErrorBarsVisible();
        var lowValueField;
        var highValueField;
        if (areErrorBarsVisible) {
            var errorBarOptions = this._options.valueErrorBar;
            lowValueField = errorBarOptions.lowValueField || LOW_ERROR;
            highValueField = errorBarOptions.highValueField || HIGH_ERROR
        }
        return data => {
            var pointData = {
                value: this._processEmptyValue(data[valueField]),
                argument: data[argumentField],
                tag: data[tagField],
                data: data
            };
            if (areErrorBarsVisible) {
                pointData.lowError = data[lowValueField];
                pointData.highError = data[highValueField]
            }
            return pointData
        }
    },
    _errorBarsEnabled: function() {
        return this.valueAxisType !== DISCRETE && this.valueAxisType !== LOGARITHMIC && this.valueType !== DATETIME
    },
    _drawPoint: function(options) {
        var point = options.point;
        if (point.isInVisibleArea()) {
            point.clearVisibility();
            point.draw(this._renderer, options.groups, options.hasAnimation, options.firstDrawing);
            this._drawnPoints.push(point)
        } else {
            point.setInvisibility()
        }
    },
    _animateComplete: function() {
        var animationSettings = {
            duration: this._defaultDuration
        };
        this._labelsGroup && this._labelsGroup.animate({
            opacity: 1
        }, animationSettings);
        this._errorBarGroup && this._errorBarGroup.animate({
            opacity: this._options.valueErrorBar.opacity || 1
        }, animationSettings)
    },
    _animate: function() {
        var that = this;
        var lastPointIndex = that._drawnPoints.length - 1;
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(that._drawnPoints || [], (function(i, p) {
            p.animate(i === lastPointIndex ? function() {
                that._animateComplete()
            } : void 0, {
                translateX: p.x,
                translateY: p.y
            })
        }))
    },
    _getIntervalCenter(intervalStart, intervalEnd) {
        var argAxis = this.getArgumentAxis();
        var axisOptions = argAxis.getOptions();
        if (argAxis.aggregatedPointBetweenTicks()) {
            return intervalStart
        }
        return "discrete" !== axisOptions.type ? argAxis.getVisualRangeCenter({
            minVisible: intervalStart,
            maxVisible: intervalEnd
        }, true) : intervalStart
    },
    _defaultAggregator: "avg",
    _aggregators: {
        avg(_ref2, series) {
            var {
                data: data,
                intervalStart: intervalStart,
                intervalEnd: intervalEnd
            } = _ref2;
            if (!data.length) {
                return
            }
            var valueField = series.getValueFields()[0];
            var aggregationResult = data.reduce((result, item) => {
                var value = item[valueField];
                if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(value)) {
                    result[0] += value;
                    result[1]++
                } else if (null === value) {
                    result[2]++
                }
                return result
            }, [0, 0, 0]);
            return calculateAvgErrorBars({
                [valueField]: aggregationResult[2] === data.length ? null : aggregationResult[0] / aggregationResult[1],
                [series.getArgumentField()]: series._getIntervalCenter(intervalStart, intervalEnd)
            }, data, series)
        },
        sum(_ref3, series) {
            var {
                intervalStart: intervalStart,
                intervalEnd: intervalEnd,
                data: data
            } = _ref3;
            if (!data.length) {
                return
            }
            var valueField = series.getValueFields()[0];
            var aggregationResult = data.reduce((result, item) => {
                var value = item[valueField];
                if (void 0 !== value) {
                    result[0] += value
                }
                if (null === value) {
                    result[1]++
                } else if (void 0 === value) {
                    result[2]++
                }
                return result
            }, [0, 0, 0]);
            var value = aggregationResult[0];
            if (aggregationResult[1] === data.length) {
                value = null
            }
            if (aggregationResult[2] === data.length) {
                return
            }
            return calculateSumErrorBars({
                [valueField]: value,
                [series.getArgumentField()]: series._getIntervalCenter(intervalStart, intervalEnd)
            }, data, series)
        },
        count(_ref4, series) {
            var {
                data: data,
                intervalStart: intervalStart,
                intervalEnd: intervalEnd
            } = _ref4;
            var valueField = series.getValueFields()[0];
            return {
                [series.getArgumentField()]: series._getIntervalCenter(intervalStart, intervalEnd),
                [valueField]: data.filter(i => void 0 !== i[valueField]).length
            }
        },
        min: getMinMaxAggregator((a, b) => a < b),
        max: getMinMaxAggregator((a, b) => a > b)
    },
    _endUpdateData: function() {
        delete this._predefinedPointOptions
    },
    getArgumentField: function() {
        return this._options.argumentField || "arg"
    },
    getValueFields: function() {
        var options = this._options;
        var errorBarsOptions = options.valueErrorBar;
        var valueFields = [options.valueField || "val"];
        var lowValueField;
        var highValueField;
        if (errorBarsOptions) {
            lowValueField = errorBarsOptions.lowValueField;
            highValueField = errorBarsOptions.highValueField;
            Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isString"])(lowValueField) && valueFields.push(lowValueField);
            Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isString"])(highValueField) && valueFields.push(highValueField)
        }
        return valueFields
    },
    _calculateErrorBars: function(data) {
        if (!this.areErrorBarsVisible()) {
            return
        }
        var options = this._options;
        var errorBarsOptions = options.valueErrorBar;
        var errorBarType = Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["normalizeEnum"])(errorBarsOptions.type);
        var floatErrorValue = parseFloat(errorBarsOptions.value);
        var valueField = this.getValueFields()[0];
        var value;
        var lowValueField = errorBarsOptions.lowValueField || LOW_ERROR;
        var highValueField = errorBarsOptions.highValueField || HIGH_ERROR;
        var valueArray;
        var valueArrayLength;
        var meanValue;
        var processDataItem;
        var addSubError = function(_i, item) {
            value = item.value;
            item.lowError = value - floatErrorValue;
            item.highError = value + floatErrorValue
        };
        switch (errorBarType) {
            case FIXED:
                processDataItem = addSubError;
                break;
            case PERCENT:
                processDataItem = function(_, item) {
                    value = item.value;
                    var error = value * floatErrorValue / 100;
                    item.lowError = value - error;
                    item.highError = value + error
                };
                break;
            case UNDEFINED:
                processDataItem = function(_, item) {
                    item.lowError = item.data[lowValueField];
                    item.highError = item.data[highValueField]
                };
                break;
            default:
                valueArray = Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["map"])(data, (function(item) {
                    return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(item.data[valueField]) ? item.data[valueField] : null
                }));
                valueArrayLength = valueArray.length;
                floatErrorValue = floatErrorValue || 1;
                switch (errorBarType) {
                    case VARIANCE:
                        floatErrorValue = variance(valueArray, sum(valueArray) / valueArrayLength) * floatErrorValue;
                        processDataItem = addSubError;
                        break;
                    case STANDARD_DEVIATION:
                        meanValue = sum(valueArray) / valueArrayLength;
                        floatErrorValue = _sqrt(variance(valueArray, meanValue)) * floatErrorValue;
                        processDataItem = function(_, item) {
                            item.lowError = meanValue - floatErrorValue;
                            item.highError = meanValue + floatErrorValue
                        };
                        break;
                    case STANDARD_ERROR:
                        floatErrorValue = _sqrt(variance(valueArray, sum(valueArray) / valueArrayLength) / valueArrayLength) * floatErrorValue;
                        processDataItem = addSubError
                }
        }
        processDataItem && Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(data, processDataItem)
    },
    _patchMarginOptions: function(options) {
        var pointOptions = this._getCreatingPointOptions();
        var styles = pointOptions.styles;
        var maxSize = [styles.normal, styles.hover, styles.selection].reduce((function(max, style) {
            return _max(max, 2 * style.r + style["stroke-width"])
        }), 0);
        options.size = pointOptions.visible ? maxSize : 0;
        options.sizePointNormalState = pointOptions.visible ? 2 * styles.normal.r + styles.normal["stroke-width"] : 2;
        return options
    },
    usePointsToDefineAutoHiding: () => true
};
chart = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({}, baseScatterMethods, {
    drawTrackers: function() {
        var that = this;
        var trackers;
        var trackersGroup;
        var segments = that._segments || [];
        var rotated = that._options.rotated;
        if (!that.isVisible()) {
            return
        }
        if (segments.length) {
            trackers = that._trackers = that._trackers || [];
            trackersGroup = that._trackersGroup = (that._trackersGroup || that._renderer.g().attr({
                fill: "gray",
                opacity: .001,
                stroke: "gray",
                class: "dxc-trackers"
            })).attr({
                "clip-path": this._paneClipRectID || null
            }).append(that._group);
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(segments, (function(i, segment) {
                if (!trackers[i]) {
                    trackers[i] = that._drawTrackerElement(segment).data({
                        "chart-data-series": that
                    }).append(trackersGroup)
                } else {
                    that._updateTrackerElement(segment, trackers[i])
                }
            }))
        }
        that._trackersTranslator = that.groupPointsByCoords(rotated)
    },
    _checkAxisVisibleAreaCoord(isArgument, coord) {
        var axis = isArgument ? this.getArgumentAxis() : this.getValueAxis();
        var visibleArea = axis.getVisibleArea();
        return Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(coord) && visibleArea[0] <= coord && visibleArea[1] >= coord
    },
    checkSeriesViewportCoord(axis, coord) {
        return this.getPoints().length && this.isVisible()
    },
    getSeriesPairCoord(coord, isArgument) {
        var oppositeCoord = null;
        var isOpposite = !isArgument && !this._options.rotated || isArgument && this._options.rotated;
        var coordName = !isOpposite ? "vx" : "vy";
        var oppositeCoordName = !isOpposite ? "vy" : "vx";
        var points = this.getVisiblePoints();
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var tmpCoord = p[coordName] === coord ? p[oppositeCoordName] : void 0;
            if (this._checkAxisVisibleAreaCoord(!isArgument, tmpCoord)) {
                oppositeCoord = tmpCoord;
                break
            }
        }
        return oppositeCoord
    },
    _getNearestPoints: (point, nextPoint) => [point, nextPoint],
    _getBezierPoints: () => [],
    _getNearestPointsByCoord(coord, isArgument) {
        var that = this;
        var rotated = that.getOptions().rotated;
        var isOpposite = !isArgument && !rotated || isArgument && rotated;
        var coordName = isOpposite ? "vy" : "vx";
        var allPoints = that.getPoints();
        var bezierPoints = that._getBezierPoints();
        var nearestPoints = [];
        if (allPoints.length > 1) {
            allPoints.forEach((point, i) => {
                var nextPoint = allPoints[i + 1];
                if (nextPoint && (point[coordName] <= coord && nextPoint[coordName] >= coord || point[coordName] >= coord && nextPoint[coordName] <= coord)) {
                    nearestPoints.push(that._getNearestPoints(point, nextPoint, bezierPoints))
                }
            })
        } else {
            nearestPoints.push([allPoints[0], allPoints[0]])
        }
        return nearestPoints
    },
    getNeighborPoint: function(x, y) {
        var pCoord = this._options.rotated ? y : x;
        var nCoord = pCoord;
        var cat = this._trackersTranslator;
        var point = null;
        var minDistance;
        var oppositeCoord = this._options.rotated ? x : y;
        var oppositeCoordName = this._options.rotated ? "vx" : "vy";
        if (this.isVisible() && cat) {
            point = cat[pCoord];
            do {
                point = cat[nCoord] || cat[pCoord];
                pCoord--;
                nCoord++
            } while ((pCoord >= 0 || nCoord < cat.length) && !point);
            if (Array.isArray(point)) {
                minDistance = _abs(point[0][oppositeCoordName] - oppositeCoord);
                Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(point, (function(i, p) {
                    var distance = _abs(p[oppositeCoordName] - oppositeCoord);
                    if (minDistance >= distance) {
                        minDistance = distance;
                        point = p
                    }
                }))
            }
        }
        return point
    },
    _applyVisibleArea: function() {
        var rotated = this._options.rotated;
        var visibleX = (rotated ? this.getValueAxis() : this.getArgumentAxis()).getVisibleArea();
        var visibleY = (rotated ? this.getArgumentAxis() : this.getValueAxis()).getVisibleArea();
        this._visibleArea = {
            minX: visibleX[0],
            maxX: visibleX[1],
            minY: visibleY[0],
            maxY: visibleY[1]
        }
    },
    getPointCenterByArg(arg) {
        var point = this.getPointsByArg(arg)[0];
        return point ? point.getCenterCoord() : void 0
    }
});
polar = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])({}, baseScatterMethods, {
    drawTrackers: function() {
        chart.drawTrackers.call(this);
        var cat = this._trackersTranslator;
        var index;
        if (!this.isVisible()) {
            return
        }
        Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(cat, (function(i, category) {
            if (category) {
                index = i;
                return false
            }
        }));
        cat[index + 360] = cat[index]
    },
    getNeighborPoint: function(x, y) {
        var pos = Object(_core_utils__WEBPACK_IMPORTED_MODULE_5__["convertXYToPolar"])(this.getValueAxis().getCenter(), x, y);
        return chart.getNeighborPoint.call(this, pos.phi, pos.r)
    },
    _applyVisibleArea: function() {
        var canvas = this.getValueAxis().getCanvas();
        this._visibleArea = {
            minX: canvas.left,
            maxX: canvas.width - canvas.right,
            minY: canvas.top,
            maxY: canvas.height - canvas.bottom
        }
    },
    getSeriesPairCoord(params, isArgument) {
        var coords = null;
        var paramName = isArgument ? "argument" : "radius";
        var points = this.getVisiblePoints();
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var tmpPoint = Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(p[paramName]) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(params[paramName]) && p[paramName].valueOf() === params[paramName].valueOf() ? {
                x: p.x,
                y: p.y
            } : void 0;
            if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(tmpPoint)) {
                coords = tmpPoint;
                break
            }
        }
        return coords
    }
});



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/series/stacked_series.js":
/*!******************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/series/stacked_series.js ***!
  \******************************************************************/
/*! exports provided: chart, polar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chart", function() { return chart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polar", function() { return polar; });
/* harmony import */ var _core_utils_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/common */ "./node_modules/devextreme/esm/core/utils/common.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _area_series__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./area_series */ "./node_modules/devextreme/esm/viz/series/area_series.js");
/* harmony import */ var _bar_series__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bar_series */ "./node_modules/devextreme/esm/viz/series/bar_series.js");
/* harmony import */ var _line_series__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./line_series */ "./node_modules/devextreme/esm/viz/series/line_series.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _core_utils_object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/utils/object */ "./node_modules/devextreme/esm/core/utils/object.js");
/**
 * DevExtreme (esm/viz/series/stacked_series.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */




var chartAreaSeries = _area_series__WEBPACK_IMPORTED_MODULE_3__["chart"].area;

var chartBarSeries = _bar_series__WEBPACK_IMPORTED_MODULE_4__["chart"].bar;



var baseStackedSeries = {
    _calculateErrorBars: _core_utils_common__WEBPACK_IMPORTED_MODULE_0__["noop"],
    _updateOptions: function(options) {
        this._stackName = "axis_" + (options.axis || "default")
    }
};
var chart = {};
var polar = {};
chart.stackedline = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, _line_series__WEBPACK_IMPORTED_MODULE_5__["chart"].line, baseStackedSeries, {});
chart.stackedspline = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, _line_series__WEBPACK_IMPORTED_MODULE_5__["chart"].spline, baseStackedSeries, {});
chart.fullstackedline = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, _line_series__WEBPACK_IMPORTED_MODULE_5__["chart"].line, baseStackedSeries, {
    getValueRangeInitialValue: _area_series__WEBPACK_IMPORTED_MODULE_3__["chart"].area.getValueRangeInitialValue
});
chart.fullstackedspline = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, _line_series__WEBPACK_IMPORTED_MODULE_5__["chart"].spline, baseStackedSeries, {
    getValueRangeInitialValue: _area_series__WEBPACK_IMPORTED_MODULE_3__["chart"].area.getValueRangeInitialValue
});
var stackedBar = chart.stackedbar = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, chartBarSeries, baseStackedSeries, {
    _updateOptions: function(options) {
        baseStackedSeries._updateOptions.call(this, options);
        this._stackName = this._stackName + "_stack_" + (options.stack || "default")
    }
});
chart.fullstackedbar = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, chartBarSeries, baseStackedSeries, {
    _updateOptions: stackedBar._updateOptions
});

function clonePoint(point, value, minValue, position) {
    point = Object(_core_utils_object__WEBPACK_IMPORTED_MODULE_7__["clone"])(point);
    point.value = value;
    point.minValue = minValue;
    point.translate();
    point.argument = point.argument + position;
    return point
}

function preparePointsForStackedAreaSegment(points) {
    var i = 0;
    var p;
    var result = [];
    var array;
    var len = points.length;
    while (i < len) {
        p = points[i];
        array = [p];
        if (p.leftHole) {
            array = [clonePoint(p, p.leftHole, p.minLeftHole, "left"), p]
        }
        if (p.rightHole) {
            array.push(clonePoint(p, p.rightHole, p.minRightHole, "right"))
        }
        result.push(array);
        i++
    }
    return [].concat.apply([], result)
}
chart.stackedarea = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, chartAreaSeries, baseStackedSeries, {
    _prepareSegment: function(points, rotated) {
        return chartAreaSeries._prepareSegment.call(this, preparePointsForStackedAreaSegment(points), rotated)
    },
    _appendInGroup: function() {
        this._group.append(this._extGroups.seriesGroup).toBackground()
    }
});

function getPointsByArgFromPrevSeries(prevSeries, argument) {
    var result;
    while (!result && prevSeries) {
        result = prevSeries._segmentByArg && prevSeries._segmentByArg[argument];
        prevSeries = prevSeries._prevSeries
    }
    return result
}
chart.stackedsplinearea = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, _area_series__WEBPACK_IMPORTED_MODULE_3__["chart"].splinearea, baseStackedSeries, {
    _prepareSegment: function(points, rotated) {
        var that = this;
        var areaSegment;
        points = preparePointsForStackedAreaSegment(points);
        if (!this._prevSeries || 1 === points.length) {
            areaSegment = _area_series__WEBPACK_IMPORTED_MODULE_3__["chart"].splinearea._prepareSegment.call(this, points, rotated)
        } else {
            var forwardPoints = _line_series__WEBPACK_IMPORTED_MODULE_5__["chart"].spline._calculateBezierPoints(points, rotated);
            var backwardPoints = Object(_core_utils__WEBPACK_IMPORTED_MODULE_6__["map"])(points, (function(p) {
                var point = p.getCoords(true);
                point.argument = p.argument;
                return point
            }));
            var prevSeriesForwardPoints = [];
            var pointByArg = {};
            var i = 0;
            var len = that._prevSeries._segments.length;
            while (i < len) {
                prevSeriesForwardPoints = prevSeriesForwardPoints.concat(that._prevSeries._segments[i].line);
                i++
            }
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(prevSeriesForwardPoints, (function(_, p) {
                if (null !== p.argument) {
                    var argument = p.argument.valueOf();
                    if (!pointByArg[argument]) {
                        pointByArg[argument] = [p]
                    } else {
                        pointByArg[argument].push(p)
                    }
                }
            }));
            that._prevSeries._segmentByArg = pointByArg;
            backwardPoints = _line_series__WEBPACK_IMPORTED_MODULE_5__["chart"].spline._calculateBezierPoints(backwardPoints, rotated);
            Object(_core_utils_iterator__WEBPACK_IMPORTED_MODULE_2__["each"])(backwardPoints, (function(i, p) {
                var argument = p.argument.valueOf();
                var prevSeriesPoints;
                if (i % 3 === 0) {
                    prevSeriesPoints = pointByArg[argument] || getPointsByArgFromPrevSeries(that._prevSeries, argument);
                    if (prevSeriesPoints) {
                        backwardPoints[i - 1] && prevSeriesPoints[0] && (backwardPoints[i - 1] = prevSeriesPoints[0]);
                        backwardPoints[i + 1] && (backwardPoints[i + 1] = prevSeriesPoints[2] || p)
                    }
                }
            }));
            areaSegment = {
                line: forwardPoints,
                area: forwardPoints.concat(backwardPoints.reverse())
            };
            that._areaPointsToSplineAreaPoints(areaSegment.area)
        }
        return areaSegment
    },
    _appendInGroup: chart.stackedarea._appendInGroup
});
chart.fullstackedarea = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, chartAreaSeries, baseStackedSeries, {
    _prepareSegment: chart.stackedarea._prepareSegment,
    _appendInGroup: chart.stackedarea._appendInGroup
});
chart.fullstackedsplinearea = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, _area_series__WEBPACK_IMPORTED_MODULE_3__["chart"].splinearea, baseStackedSeries, {
    _prepareSegment: chart.stackedsplinearea._prepareSegment,
    _appendInGroup: chart.stackedarea._appendInGroup
});
polar.stackedbar = Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])({}, _bar_series__WEBPACK_IMPORTED_MODULE_4__["polar"].bar, baseStackedSeries, {});



/***/ }),

/***/ "./node_modules/devextreme/esm/viz/themes.js":
/*!***************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/themes.js ***!
  \***************************************************/
/*! exports provided: getTheme, currentTheme, registerTheme, registerThemeSchemeAlias, addCacheItem, removeCacheItem, refreshTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTheme", function() { return getTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentTheme", function() { return currentTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerTheme", function() { return registerTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerThemeSchemeAlias", function() { return registerThemeSchemeAlias; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCacheItem", function() { return addCacheItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCacheItem", function() { return removeCacheItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshTheme", function() { return refreshTheme; });
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils/iterator */ "./node_modules/devextreme/esm/core/utils/iterator.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/* harmony import */ var _ui_themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/themes */ "./node_modules/devextreme/esm/ui/themes.js");
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_themes_generic_light__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/themes/generic.light */ "./node_modules/devextreme/esm/viz/core/themes/generic.light.js");
/* harmony import */ var _core_themes_generic_carmine__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/themes/generic.carmine */ "./node_modules/devextreme/esm/viz/core/themes/generic.carmine.js");
/* harmony import */ var _core_themes_generic_dark__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/themes/generic.dark */ "./node_modules/devextreme/esm/viz/core/themes/generic.dark.js");
/* harmony import */ var _core_themes_generic_contrast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/themes/generic.contrast */ "./node_modules/devextreme/esm/viz/core/themes/generic.contrast.js");
/* harmony import */ var _core_themes_generic_darkmoon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/themes/generic.darkmoon */ "./node_modules/devextreme/esm/viz/core/themes/generic.darkmoon.js");
/* harmony import */ var _core_themes_generic_darkviolet__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/themes/generic.darkviolet */ "./node_modules/devextreme/esm/viz/core/themes/generic.darkviolet.js");
/* harmony import */ var _core_themes_generic_greenmist__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/themes/generic.greenmist */ "./node_modules/devextreme/esm/viz/core/themes/generic.greenmist.js");
/* harmony import */ var _core_themes_generic_softblue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core/themes/generic.softblue */ "./node_modules/devextreme/esm/viz/core/themes/generic.softblue.js");
/* harmony import */ var _core_themes_material__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/themes/material */ "./node_modules/devextreme/esm/viz/core/themes/material.js");
/**
 * DevExtreme (esm/viz/themes.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */














var themes = {};
var themesMapping = {};
var themesSchemeMapping = {};
var _extend = _core_utils_extend__WEBPACK_IMPORTED_MODULE_0__["extend"];
var _each = _core_utils_iterator__WEBPACK_IMPORTED_MODULE_1__["each"];
var currentThemeName = null;
var defaultTheme;
var nextCacheUid = 0;
var widgetsCache = {};
function getTheme(themeName) {
    var name = Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeEnum"])(themeName);
    return themes[name] || themes[themesMapping[name] || currentTheme()]
}

function findThemeNameByName(name, scheme) {
    return themesMapping[name + "." + scheme] || themesSchemeMapping[name + "." + scheme] || themesMapping[name]
}

function findThemeNameByPlatform(platform, version, scheme) {
    return findThemeNameByName(platform + version, scheme) || findThemeNameByName(platform, scheme)
}
function currentTheme(themeName, colorScheme) {
    if (!arguments.length) {
        return currentThemeName || findThemeNameByName(Object(_ui_themes__WEBPACK_IMPORTED_MODULE_3__["current"])()) || defaultTheme
    }
    var scheme = Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeEnum"])(colorScheme);
    currentThemeName = (themeName && themeName.platform ? findThemeNameByPlatform(Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeEnum"])(themeName.platform), themeName.version, scheme) : findThemeNameByName(Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeEnum"])(themeName), scheme)) || currentThemeName;
    return this
}

function getThemeInfo(themeName, splitter) {
    var k = themeName.indexOf(splitter);
    return k > 0 ? {
        name: themeName.substring(0, k),
        scheme: themeName.substring(k + 1)
    } : null
}

function registerThemeName(themeName, targetThemeName) {
    var themeInfo = getThemeInfo(themeName, ".") || {
        name: themeName
    };
    var name = themeInfo.name;
    var scheme = themeInfo.scheme;
    if (scheme) {
        themesMapping[name] = themesMapping[name] || targetThemeName;
        themesMapping[name + "." + scheme] = targetThemeName
    } else {
        themesMapping[name] = targetThemeName
    }
}
function registerTheme(theme, baseThemeName) {
    var themeName = Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["normalizeEnum"])(theme && theme.name);
    if (themeName) {
        theme.isDefault && (defaultTheme = themeName);
        registerThemeName(themeName, themeName);
        themes[themeName] = _extend(true, {}, getTheme(baseThemeName), patchTheme(theme))
    }
}
function registerThemeSchemeAlias(from, to) {
    themesSchemeMapping[from] = to
}

function mergeScalar(target, field, source, sourceValue) {
    var _value = source ? source[field] : sourceValue;
    if (void 0 !== _value && void 0 === target[field]) {
        target[field] = _value
    }
}

function mergeObject(target, field, source, sourceValue) {
    var _value = source ? source[field] : sourceValue;
    if (void 0 !== _value) {
        target[field] = _extend(true, {}, _value, target[field])
    }
}

function patchTheme(theme) {
    theme = _extend(true, {
        loadingIndicator: {
            font: {}
        },
        export: {
            font: {}
        },
        legend: {
            font: {},
            border: {}
        },
        title: {
            font: {}
        },
        tooltip: {
            font: {}
        },
        "chart:common": {},
        "chart:common:axis": {
            grid: {},
            minorGrid: {},
            tick: {},
            minorTick: {},
            title: {
                font: {}
            },
            label: {
                font: {}
            }
        },
        "chart:common:annotation": {
            font: {},
            border: {}
        },
        chart: {
            commonSeriesSettings: {
                candlestick: {}
            }
        },
        pie: {},
        polar: {},
        gauge: {
            scale: {
                tick: {},
                minorTick: {},
                label: {
                    font: {}
                }
            }
        },
        barGauge: {},
        funnel: {},
        sankey: {},
        map: {
            background: {}
        },
        treeMap: {
            tile: {
                selectionStyle: {
                    border: {}
                }
            },
            group: {
                border: {},
                selectionStyle: {
                    border: {}
                },
                label: {
                    font: {}
                }
            }
        },
        rangeSelector: {
            scale: {
                tick: {},
                minorTick: {},
                label: {
                    font: {}
                }
            },
            chart: {}
        },
        sparkline: {},
        bullet: {}
    }, theme);
    mergeScalar(theme.loadingIndicator, "backgroundColor", theme);
    mergeScalar(theme.chart.commonSeriesSettings.candlestick, "innerColor", null, theme.backgroundColor);
    mergeScalar(theme.map.background, "color", null, theme.backgroundColor);
    mergeScalar(theme.title.font, "color", null, theme.primaryTitleColor);
    mergeObject(theme.title, "subtitle", null, theme.title);
    mergeScalar(theme.legend.font, "color", null, theme.secondaryTitleColor);
    mergeScalar(theme.legend.border, "color", null, theme.gridColor);
    patchAxes(theme);
    _each(["chart", "pie", "polar", "gauge", "barGauge", "map", "treeMap", "funnel", "rangeSelector", "sparkline", "bullet", "sankey"], (function(_, section) {
        mergeScalar(theme[section], "redrawOnResize", theme);
        mergeScalar(theme[section], "containerBackgroundColor", null, theme.backgroundColor);
        mergeObject(theme[section], "tooltip", theme);
        mergeObject(theme[section], "export", theme)
    }));
    _each(["chart", "pie", "polar", "gauge", "barGauge", "map", "treeMap", "funnel", "rangeSelector", "sankey"], (function(_, section) {
        mergeObject(theme[section], "loadingIndicator", theme);
        mergeObject(theme[section], "legend", theme);
        mergeObject(theme[section], "title", theme)
    }));
    _each(["chart", "pie", "polar"], (function(_, section) {
        mergeObject(theme, section, null, theme["chart:common"])
    }));
    _each(["chart", "polar"], (function(_, section) {
        theme[section] = theme[section] || {};
        mergeObject(theme[section], "commonAxisSettings", null, theme["chart:common:axis"])
    }));
    _each(["chart", "polar", "map", "pie"], (function(_, section) {
        theme[section] = theme[section] || {};
        mergeObject(theme[section], "commonAnnotationSettings", null, theme["chart:common:annotation"])
    }));
    mergeObject(theme.rangeSelector.chart, "commonSeriesSettings", theme.chart);
    mergeObject(theme.rangeSelector.chart, "dataPrepareSettings", theme.chart);
    mergeScalar(theme.treeMap.group.border, "color", null, theme.gridColor);
    mergeScalar(theme.treeMap.tile.selectionStyle.border, "color", null, theme.primaryTitleColor);
    mergeScalar(theme.treeMap.group.selectionStyle.border, "color", null, theme.primaryTitleColor);
    mergeScalar(theme.map.legend, "backgroundColor", theme);
    patchMapLayers(theme);
    return theme
}

function patchAxes(theme) {
    var commonAxisSettings = theme["chart:common:axis"];
    _each([commonAxisSettings.grid, commonAxisSettings.minorGrid], (function(_, obj) {
        mergeScalar(obj, "color", null, theme.gridColor)
    }));
    _each([commonAxisSettings, commonAxisSettings.tick, commonAxisSettings.minorTick, commonAxisSettings.label.font], (function(_, obj) {
        mergeScalar(obj, "color", null, theme.axisColor)
    }));
    mergeScalar(commonAxisSettings.title.font, "color", null, theme.secondaryTitleColor);
    mergeScalar(theme.gauge.scale.label.font, "color", null, theme.axisColor);
    mergeScalar(theme.gauge.scale.tick, "color", null, theme.backgroundColor);
    mergeScalar(theme.gauge.scale.minorTick, "color", null, theme.backgroundColor);
    mergeScalar(theme.rangeSelector.scale.label.font, "color", null, theme.axisColor)
}

function patchMapLayers(theme) {
    var map = theme.map;
    _each(["area", "line", "marker"], (function(_, section) {
        mergeObject(map, "layer:" + section, null, map.layer)
    }));
    _each(["dot", "bubble", "pie", "image"], (function(_, section) {
        mergeObject(map, "layer:marker:" + section, null, map["layer:marker"])
    }))
}
function addCacheItem(target) {
    var cacheUid = ++nextCacheUid;
    target._cache = cacheUid;
    widgetsCache[cacheUid] = target
}
function removeCacheItem(target) {
    delete widgetsCache[target._cache]
}
function refreshTheme() {
    _each(widgetsCache, (function() {
        this.refresh()
    }));
    return this
}
if (Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isEmptyObject"])(themes) && Object(_core_utils_type__WEBPACK_IMPORTED_MODULE_4__["isEmptyObject"])(themesMapping) && !defaultTheme) {
    [].concat(_core_themes_generic_light__WEBPACK_IMPORTED_MODULE_5__["default"], _core_themes_generic_carmine__WEBPACK_IMPORTED_MODULE_6__["default"], _core_themes_generic_dark__WEBPACK_IMPORTED_MODULE_7__["default"], _core_themes_generic_contrast__WEBPACK_IMPORTED_MODULE_8__["default"], _core_themes_generic_darkmoon__WEBPACK_IMPORTED_MODULE_9__["default"], _core_themes_generic_darkviolet__WEBPACK_IMPORTED_MODULE_10__["default"], _core_themes_generic_greenmist__WEBPACK_IMPORTED_MODULE_11__["default"], _core_themes_generic_softblue__WEBPACK_IMPORTED_MODULE_12__["default"], _core_themes_material__WEBPACK_IMPORTED_MODULE_13__["default"]).forEach(t => {
        registerTheme(t.theme, t.baseThemeName)
    })
}


/***/ }),

/***/ "./node_modules/devextreme/esm/viz/translators/range.js":
/*!**************************************************************!*\
  !*** ./node_modules/devextreme/esm/viz/translators/range.js ***!
  \**************************************************************/
/*! exports provided: Range */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony import */ var _core_utils_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/utils/type */ "./node_modules/devextreme/esm/core/utils/type.js");
/* harmony import */ var _core_utils_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/extend */ "./node_modules/devextreme/esm/core/utils/extend.js");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils */ "./node_modules/devextreme/esm/viz/core/utils.js");
/**
 * DevExtreme (esm/viz/translators/range.js)
 * Version: 21.2.13
 * Build date: Fri Apr 07 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */


var _isDefined = _core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDefined"];
var _isDate = _core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isDate"];
var _isFunction = _core_utils_type__WEBPACK_IMPORTED_MODULE_0__["isFunction"];

var minSelector = "min";
var maxSelector = "max";
var minVisibleSelector = "minVisible";
var maxVisibleSelector = "maxVisible";
var baseSelector = "base";
var axisTypeSelector = "axisType";

function otherLessThan(thisValue, otherValue) {
    return otherValue < thisValue
}

function otherGreaterThan(thisValue, otherValue) {
    return otherValue > thisValue
}

function compareAndReplace(thisValue, otherValue, setValue, compare) {
    var otherValueDefined = _isDefined(otherValue);
    if (_isDefined(thisValue)) {
        if (otherValueDefined && compare(thisValue, otherValue)) {
            setValue(otherValue)
        }
    } else if (otherValueDefined) {
        setValue(otherValue)
    }
}
var Range = function(range) {
    range && Object(_core_utils_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(this, range)
};
var _Range = Range;
_Range.prototype = {
    constructor: _Range,
    addRange: function(otherRange) {
        var that = this;
        var categories = that.categories;
        var otherCategories = otherRange.categories;
        var isDiscrete = "discrete" === that[axisTypeSelector];
        var compareAndReplaceByField = function(field, compare) {
            compareAndReplace(that[field], otherRange[field], (function(value) {
                that[field] = value
            }), compare)
        };
        var controlValuesByVisibleBounds = function(valueField, visibleValueField, compare) {
            compareAndReplace(that[valueField], that[visibleValueField], (function(value) {
                _isDefined(that[valueField]) && (that[valueField] = value)
            }), compare)
        };
        var checkField = function(field) {
            that[field] = that[field] || otherRange[field]
        };
        checkField("invert");
        checkField("containsConstantLine");
        checkField(axisTypeSelector);
        checkField("dataType");
        checkField("isSpacedMargin");
        if ("logarithmic" === that[axisTypeSelector]) {
            checkField(baseSelector)
        } else {
            that[baseSelector] = void 0
        }
        compareAndReplaceByField(minSelector, otherLessThan);
        compareAndReplaceByField(maxSelector, otherGreaterThan);
        if (isDiscrete) {
            checkField(minVisibleSelector);
            checkField(maxVisibleSelector)
        } else {
            compareAndReplaceByField(minVisibleSelector, otherLessThan);
            compareAndReplaceByField(maxVisibleSelector, otherGreaterThan)
        }
        compareAndReplaceByField("interval", otherLessThan);
        if (!isDiscrete) {
            controlValuesByVisibleBounds(minSelector, minVisibleSelector, otherLessThan);
            controlValuesByVisibleBounds(minSelector, maxVisibleSelector, otherLessThan);
            controlValuesByVisibleBounds(maxSelector, maxVisibleSelector, otherGreaterThan);
            controlValuesByVisibleBounds(maxSelector, minVisibleSelector, otherGreaterThan)
        }
        if (void 0 === categories) {
            that.categories = otherCategories
        } else {
            that.categories = otherCategories ? Object(_core_utils__WEBPACK_IMPORTED_MODULE_2__["unique"])(categories.concat(otherCategories)) : categories
        }
        if ("logarithmic" === that[axisTypeSelector]) {
            checkField("allowNegatives");
            compareAndReplaceByField("linearThreshold", otherLessThan)
        }
        return that
    },
    isEmpty: function() {
        return (!_isDefined(this[minSelector]) || !_isDefined(this[maxSelector])) && (!this.categories || 0 === this.categories.length)
    },
    correctValueZeroLevel: function() {
        var that = this;
        if (_isDate(that[maxSelector]) || _isDate(that[minSelector])) {
            return that
        }

        function setZeroLevel(min, max) {
            that[min] < 0 && that[max] < 0 && (that[max] = 0);
            that[min] > 0 && that[max] > 0 && (that[min] = 0)
        }
        setZeroLevel(minSelector, maxSelector);
        setZeroLevel(minVisibleSelector, maxVisibleSelector);
        return that
    },
    sortCategories(sort) {
        if (false === sort || !this.categories) {
            return
        }
        if (Array.isArray(sort)) {
            var sortValues = sort.map(item => item.valueOf());
            var filteredSeriesCategories = this.categories.filter(item => -1 === sortValues.indexOf(item.valueOf()));
            this.categories = sort.concat(filteredSeriesCategories)
        } else {
            var notAFunction = !_isFunction(sort);
            if (notAFunction && "string" !== this.dataType) {
                sort = (a, b) => a.valueOf() - b.valueOf()
            } else if (notAFunction) {
                sort = false
            }
            sort && this.categories.sort(sort)
        }
    }
};


/***/ })

}]);